#!/usr/bin/env node
/**
 * Additive embedder for ../data/tickets.jsonl.
 *
 * For each row:
 *   - If `embedding` is already present → write line back unchanged.
 *   - If missing → buffer for batch embedding via OpenAI
 *     `text-embedding-3-small` (1536-d), then write back with the
 *     `embedding` field populated.
 *
 * Atomic write: writes to `tickets.jsonl.tmp` then `rename`. Never
 * leaves the file half-written.
 *
 * Embedding input = `subject + "\n\n" + body` (same composition
 * IngestionService would use for an unchunked doc).
 *
 * After this runs, committing the JSONL means any contributor who
 * clones the repo runs the demo end-to-end without an OPENAI_API_KEY
 * (the connector reads embeddings from the file and skips OpenAI).
 *
 * Run with: `node scripts/embed-tickets.mjs`
 * Requires: OPENAI_API_KEY in env (umbrella .env is fine — see dev.sh).
 */

import { createReadStream } from 'node:fs';
import { rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(__dirname, '..', 'data', 'tickets.jsonl');
const TMP = `${FILE}.tmp`;
const BATCH_SIZE = 100;
const MODEL = 'text-embedding-3-small';
const DIM = 1536;

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('ERROR: OPENAI_API_KEY not set. Put it in /private/var/www/vocion/.env (the umbrella root) — that\'s the single source of truth for LLM provider keys.');
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Read all rows                                                        */
/* ------------------------------------------------------------------ */

try {
  await stat(FILE);
} catch {
  console.error(`ERROR: ${FILE} does not exist. Run generate-tickets.mjs first.`);
  process.exit(1);
}

const lines = [];
const rl = createInterface({ input: createReadStream(FILE, { encoding: 'utf8' }), crlfDelay: Infinity });
let lineNo = 0;
for await (const line of rl) {
  lineNo += 1;
  const trimmed = line.trim();
  if (!trimmed) {
    continue;
  }
  let row;
  try {
    row = JSON.parse(trimmed);
  } catch (err) {
    console.error(`line ${lineNo}: JSON parse error: ${err.message}`);
    process.exit(1);
  }
  lines.push(row);
}

/* ------------------------------------------------------------------ */
/* Find rows missing `embedding`                                        */
/* ------------------------------------------------------------------ */

const todo = [];
for (let i = 0; i < lines.length; i++) {
  const r = lines[i];
  if (r._meta) {
    continue;
  }
  if (Array.isArray(r.embedding) && r.embedding.length === DIM) {
    continue;
  }
  todo.push(i);
}

if (todo.length === 0) {
  console.log(`✓ all ${lines.length - 1} rows already embedded (nothing to do)`);
  process.exit(0);
}

console.log(`→ embedding ${todo.length} rows (${lines.length - 1 - todo.length} already done)`);
const start = Date.now();

/* ------------------------------------------------------------------ */
/* Batch embed                                                          */
/* ------------------------------------------------------------------ */

async function embedBatch(texts) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: MODEL, input: texts }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI embeddings API ${res.status}: ${body}`);
  }
  const json = await res.json();
  return json.data.map(d => d.embedding);
}

let done = 0;
for (let batchStart = 0; batchStart < todo.length; batchStart += BATCH_SIZE) {
  const batchIdxs = todo.slice(batchStart, batchStart + BATCH_SIZE);
  const texts = batchIdxs.map((idx) => {
    const r = lines[idx];
    return `${r.subject ?? ''}\n\n${r.body ?? ''}`.trim();
  });
  const vectors = await embedBatch(texts);
  if (vectors.length !== batchIdxs.length) {
    throw new Error(`OpenAI returned ${vectors.length} vectors for ${batchIdxs.length} inputs`);
  }
  for (let i = 0; i < batchIdxs.length; i++) {
    lines[batchIdxs[i]].embedding = vectors[i];
  }
  done += batchIdxs.length;
  process.stdout.write(`  ${done} / ${todo.length} embedded\r`);
}

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n✓ embedded ${todo.length} rows in ${elapsed}s`);

/* ------------------------------------------------------------------ */
/* Atomic write                                                         */
/* ------------------------------------------------------------------ */

await writeFile(TMP, lines.map(l => JSON.stringify(l)).join('\n') + '\n', 'utf8');
await rename(TMP, FILE);
const finalStat = await stat(FILE);
const sizeMb = (finalStat.size / 1024 / 1024).toFixed(2);
console.log(`✓ wrote ${FILE} (${sizeMb} MB)`);
