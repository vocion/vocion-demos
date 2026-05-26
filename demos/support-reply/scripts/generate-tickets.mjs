#!/usr/bin/env node
/**
 * Deterministic 5,000-ticket JSONL generator. Writes
 *   ../data/tickets.jsonl
 * relative to this script.
 *
 * - PRNG seeded with `vocion-tickets-v1` → same seed → identical output.
 * - ~30 hand-written archetypes covering shipping / billing / technical /
 *   account / feature-request / vague / escalation / positive feedback.
 * - Distribution mimics realistic L1 support queues.
 * - 100 first names × 100 last names × deterministic order numbers, dates
 *   spread across the last 90 days.
 *
 * After generating, run `node scripts/embed-tickets.mjs` to populate the
 * `embedding` field on each row (idempotent — only embeds rows missing
 * the field, so re-running after appending new rows is cheap).
 *
 * Output is committed to git so a fresh clone picks up the embedded
 * JSONL and the demo runs end-to-end without an OPENAI_API_KEY.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'data');
const OUT_FILE = path.join(OUT_DIR, 'tickets.jsonl');
const COUNT = 5000;
const SEED = 'vocion-tickets-v1';

/* ------------------------------------------------------------------ */
/* Deterministic PRNG (mulberry32 over xfnv1a-hashed seed)              */
/* ------------------------------------------------------------------ */

function xfnv1a(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return () => {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    return (h += h << 5) >>> 0;
  };
}
function mulberry32(a) {
  return () => {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const seed = xfnv1a(SEED);
const rand = mulberry32(seed());
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const intBetween = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));

/* ------------------------------------------------------------------ */
/* Names + companies                                                    */
/* ------------------------------------------------------------------ */

const FIRST_NAMES = [
  'Maya', 'Jordan', 'Priya', 'Sam', 'Kai', 'Tomás', 'Lena', 'Hannah', 'Aisha', 'Ben',
  'Riley', 'Avery', 'Skyler', 'Quinn', 'Reese', 'Dakota', 'Casey', 'Drew', 'Morgan', 'Sage',
  'Wesley', 'Indira', 'Hiroshi', 'Anya', 'Diego', 'Elena', 'Felix', 'Gabriela', 'Henrik', 'Isla',
  'Julian', 'Keiko', 'Liam', 'Mira', 'Niko', 'Olive', 'Paulo', 'Quincy', 'Rosa', 'Soren',
  'Tariq', 'Uma', 'Viktor', 'Willow', 'Xochitl', 'Yusef', 'Zara', 'Amir', 'Bea', 'Caleb',
  'Devi', 'Esra', 'Finn', 'Greta', 'Han', 'Ife', 'Jakub', 'Kira', 'Lucia', 'Mateo',
  'Nadia', 'Omar', 'Patel', 'Reema', 'Sven', 'Talia', 'Uche', 'Vera', 'Wren', 'Xan',
  'Yara', 'Zane', 'Aria', 'Bren', 'Cora', 'Dax', 'Esme', 'Faye', 'Gus', 'Hugo',
  'Ivo', 'Jade', 'Knox', 'Luna', 'Milo', 'Nora', 'Oscar', 'Pia', 'Rey', 'Sasha',
  'Theo', 'Ula', 'Vance', 'Wyatt', 'Xena', 'Yael', 'Zora', 'Asher', 'Brynn', 'Coen',
];
const LAST_NAMES = [
  'Chen', 'Huang', 'Subramanian', 'Davis', 'Ortiz', 'Reyes', 'Fox', 'Lee', 'Patel', 'Singh',
  'Müller', 'Nguyen', 'Ahmed', 'Ivanov', 'Sato', 'Kim', 'Khan', 'Smith', 'Johnson', 'Williams',
  'Brown', 'Jones', 'García', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Rivera',
  'Torres', 'Ramírez', 'Flores', 'Rivera', 'Cruz', 'Diaz', 'Mendoza', 'Ruiz', 'Castro', 'Vargas',
  'Tanaka', 'Suzuki', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Yoshida', 'Yamada', 'Sasaki', 'Ito', 'Watanabe',
  'O\'Brien', 'Murphy', 'Kelly', 'O\'Connor', 'Walsh', 'McCarthy', 'Sullivan', 'Ryan', 'Doyle', 'Lynch',
  'Anderson', 'Olsen', 'Hansen', 'Larsen', 'Pedersen', 'Eriksson', 'Lindberg', 'Berg', 'Lund', 'Holm',
  'Schmidt', 'Becker', 'Wagner', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Klein', 'Wolf', 'Schröder',
  'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco',
  'Park', 'Choi', 'Jung', 'Yoon', 'Han', 'Cho', 'Lim', 'Oh', 'Seo', 'Yang',
];
const COMPANIES = [
  'example', 'pebblelogistics', 'truenorth', 'flatiron', 'meridiangroup', 'kindredops',
  'northstar', 'overland', 'parallax', 'ridgeway', 'streamline', 'tessera',
  'umbracorp', 'volta', 'westwind', 'xenith', 'yonderlabs', 'zenith',
  'apexparts', 'beaconretail', 'cresent', 'driftwood', 'evergreen', 'fellow',
  'glade', 'haven', 'inkwell', 'juniper', 'kestrel', 'lighthouse',
  'marrow', 'nimbus', 'opal', 'pinewood', 'quill', 'redbridge',
  'savannah', 'tidewater', 'union', 'vellichor', 'wharf', 'yarrow',
  'azimuth', 'bramble', 'compass', 'delta', 'elm', 'fjord',
  'gorge', 'helm',
];
const PRODUCTS = [
  'standing desk converter', 'ergonomic chair', 'wireless headphones', 'mechanical keyboard',
  '4K monitor', 'webcam', 'docking station', 'cable organizer', 'USB-C hub', 'desk lamp',
  'monitor arm', 'desk mat', 'laptop stand', 'noise-canceling earbuds', 'whiteboard',
  'standing mat', 'desk fan', 'air purifier', 'humidifier', 'task chair',
];

/* ------------------------------------------------------------------ */
/* Archetypes                                                           */
/* ------------------------------------------------------------------ */

const ARCHETYPES = [
  /* SHIPPING — 40% */
  { weight: 100, category: 'shipping-delay', priority: 'normal',
    subject: () => `Where's order #SR-${intBetween(40000, 99999)}?`,
    body: ({ name, product, days, orderId }) => `Hi,\n\nI ordered the ${product} (order #${orderId}) ${days} days ago with 5-7 day shipping. The tracking page still shows "preparing to ship" and I haven't gotten any updates. Can someone tell me what's going on?\n\nThanks,\n${name}` },
  { weight: 80, category: 'shipping-delay', priority: 'normal',
    subject: () => `Tracking hasn't updated in ${intBetween(4, 9)} days`,
    body: ({ name, product, orderId }) => `Hey — my ${product} (#${orderId}) has been "in transit" for over a week with no movement. Last scan was way before that. Is the package lost?\n\n— ${name}` },
  { weight: 70, category: 'shipping-lost', priority: 'high',
    subject: () => `Package shows delivered but never arrived`,
    body: ({ name, product, orderId, days }) => `My order #${orderId} (${product}) shows "Delivered" on the carrier site as of ${days} days ago but I never received it. Checked with neighbors and the building manager — no luck. Can you check what address it actually went to?\n\nThanks,\n${name}` },
  { weight: 60, category: 'shipping-damaged', priority: 'normal',
    subject: () => `Item arrived damaged`,
    body: ({ name, product, orderId }) => `The ${product} from order #${orderId} arrived with the box crushed and the unit dented. Pictures attached. Looking for a replacement or refund.\n\n${name}` },
  { weight: 50, category: 'shipping-wrong', priority: 'normal',
    subject: () => `Wrong item shipped`,
    body: ({ name, orderId }) => `I ordered a ${pick(PRODUCTS)} (#${orderId}) and received a ${pick(PRODUCTS)} instead. Both are great products but I need the one I actually ordered. How do we sort this out?\n\n${name}` },

  /* BILLING — 20% */
  { weight: 60, category: 'billing-duplicate', priority: 'high',
    subject: () => `Charged twice for the same order`,
    body: ({ name, orderId, amount }) => `I see two charges for $${amount} on my card from yesterday — both for order #${orderId}. Please refund the duplicate.\n\n${name}` },
  { weight: 50, category: 'billing-refund', priority: 'normal',
    subject: () => `Refund request for #${intBetween(40000, 99999)}`,
    body: ({ name, product, orderId, days }) => `Returned ${product} (#${orderId}) ${days} days ago. Still haven't seen the refund post. Tracking says you received it ${intBetween(2, 5)} days ago. What's the timeline?\n\n${name}` },
  { weight: 40, category: 'billing-subscription', priority: 'normal',
    subject: () => `Charged after I canceled`,
    body: ({ name, amount }) => `I canceled my subscription last month but was just charged $${amount} for another month. The cancellation confirmation is in my email. Please refund + confirm the cancellation stuck this time.\n\n${name}` },
  { weight: 30, category: 'billing-question', priority: 'low',
    subject: () => `Question about my invoice`,
    body: ({ name, amount }) => `My latest invoice shows $${amount} but I expected $${amount - intBetween(10, 30)}. Can you walk me through what changed? Happy to be on the right plan, just want to understand.\n\n${name}` },

  /* TECHNICAL — 15% */
  { weight: 50, category: 'technical-api', priority: 'high',
    subject: () => `API returning 500s on /v1/runs`,
    body: ({ name, errorId, acctId }) => `Our integration with your /v1/runs endpoint started failing this morning.\n\nstack trace:\n  Error: TimeoutError at line ${intBetween(120, 220)}, request_id=${errorId}\n  Account ID: ${acctId}\n\nSeeing this on every ${intBetween(3, 10)}th request. Started after the most recent platform update.\n\n— ${name}` },
  { weight: 40, category: 'technical-export', priority: 'normal',
    subject: () => `CSV export hits 500 on accounts > 10k rows`,
    body: ({ name, acctId }) => `Hey team — the CSV export from the Customers section throws a 500 error when my account has more than ~10,000 rows. Smaller exports work fine.\n\nWorkaround would be a way to filter or paginate the export. Account ${acctId}.\n\n— ${name}` },
  { weight: 30, category: 'technical-mobile', priority: 'normal',
    subject: () => `Mobile app crashes on open`,
    body: ({ name }) => `iOS app crashes immediately on launch since the last update. Already tried reinstalling. iPhone ${intBetween(12, 15)}, iOS ${intBetween(17, 18)}.${intBetween(0, 5)}.\n\n— ${name}` },
  { weight: 20, category: 'technical-integration', priority: 'high',
    subject: () => `Webhook deliveries failing with 403`,
    body: ({ name, acctId }) => `Webhook deliveries to our endpoint started failing with 403 today. Our endpoint hasn't changed; signatures don't match what we expect. Account ${acctId}.\n\n— ${name}` },

  /* ACCOUNT — 10% */
  { weight: 40, category: 'account-password', priority: 'high',
    subject: () => `URGENT — can't log in`,
    body: ({ name, hour }) => `I've tried resetting my password three times and the reset link keeps sending me to a 404. I need to access my account TODAY for a client demo at ${hour}pm.\n\n— ${name}` },
  { weight: 30, category: 'account-mfa', priority: 'normal',
    subject: () => `MFA stuck — can't receive codes`,
    body: ({ name }) => `My phone number changed and now I can't receive MFA codes. Backup codes are on my old laptop which is wiped. How do I get back in?\n\n— ${name}` },
  { weight: 20, category: 'account-billing-email', priority: 'normal',
    subject: () => `Update billing email`,
    body: ({ name }) => `Need to switch the billing email on the account from my old work address to my new one. What's the path here?\n\n${name}` },

  /* FEATURE — 8% */
  { weight: 30, category: 'feature-request', priority: 'low',
    subject: () => `Feature request: bulk edit`,
    body: ({ name }) => `Would love a way to bulk-edit ${pick(['tags', 'priorities', 'owners', 'due dates', 'statuses'])} across multiple items at once. Doing them one by one is rough at our scale (we have ~${intBetween(500, 5000)} items).\n\n— ${name}` },
  { weight: 30, category: 'feature-integration', priority: 'low',
    subject: () => `Will you support ${pick(['Linear', 'Notion', 'Asana', 'ClickUp', 'Monday'])} integration?`,
    body: ({ name, company }) => `${company} is on ${pick(['Linear', 'Notion', 'Asana', 'ClickUp', 'Monday'])} and a native sync would save us a lot of double-entry. Is this on the roadmap?\n\n— ${name}` },

  /* VAGUE — 4% */
  { weight: 20, category: 'vague', priority: 'low',
    subject: () => pick(['help', 'question', 'issue', 'broken', 'not working', 'pls help', 'urgent']),
    body: ({ name }) => `${pick(['it doesnt work', 'something is wrong', 'cant figure out', 'help me', 'this is broken'])}\n\n${pick(['what do i do', 'please respond', 'urgent', ''])}\n\n${name}` },

  /* ESCALATION — 2% */
  { weight: 10, category: 'escalation-chargeback', priority: 'urgent',
    subject: () => `This is unacceptable — I'm calling my bank`,
    body: ({ name, amount, years }) => `I've been a customer for ${years} years and spent over $${amount} with you. This is the THIRD time my refund hasn't shown up. I'm filing a chargeback with my bank today and leaving reviews everywhere. Get your supervisor to call me by EOD.\n\n— ${name}` },

  /* POSITIVE — 1% */
  { weight: 5, category: 'positive', priority: 'low',
    subject: () => `Just wanted to say thanks`,
    body: ({ name }) => `Hey — your team helped me sort out a billing issue last week and the person I worked with (didn't catch her name) was awesome. Pass along my thanks. No reply needed.\n\n— ${name}` },
];

const TOTAL_WEIGHT = ARCHETYPES.reduce((s, a) => s + a.weight, 0);
function pickArchetype() {
  let r = rand() * TOTAL_WEIGHT;
  for (const a of ARCHETYPES) {
    r -= a.weight;
    if (r <= 0) {
      return a;
    }
  }
  return ARCHETYPES[ARCHETYPES.length - 1];
}

/* ------------------------------------------------------------------ */
/* Date spread                                                          */
/* ------------------------------------------------------------------ */

const NOW = new Date('2026-05-26T18:00:00Z').getTime();
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

function pickReceivedAt() {
  // Weighted toward weekday business hours.
  let t;
  do {
    t = NOW - intBetween(0, NINETY_DAYS_MS);
    const d = new Date(t);
    const day = d.getUTCDay();
    // Drop ~30% of weekend timestamps to bias toward business days.
    if ((day === 0 || day === 6) && rand() < 0.3) {
      continue;
    }
    break;
  } while (true);
  return new Date(t).toISOString();
}

function pickChannel() {
  const r = rand();
  if (r < 0.7) {
    return 'email';
  }
  if (r < 0.9) {
    return 'web';
  }
  if (r < 0.98) {
    return 'chat';
  }
  return 'api';
}

/* ------------------------------------------------------------------ */
/* Main                                                                 */
/* ------------------------------------------------------------------ */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const meta = {
    _meta: {
      generator: 'generate-tickets.mjs',
      seed: SEED,
      generated_at: new Date(NOW).toISOString(),
      count: COUNT,
      embed_model: 'text-embedding-3-small',
      dim: 1536,
      note: 'Run scripts/embed-tickets.mjs to populate the `embedding` field on each row.',
    },
  };

  const lines = [JSON.stringify(meta)];

  for (let i = 0; i < COUNT; i++) {
    const id = `T-${10001 + i}`;
    const archetype = pickArchetype();
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    const name = `${first} ${last}`;
    const emailLocal = `${first.toLowerCase().replace(/[^a-z]/g, '')}.${last.toLowerCase().replace(/[^a-z]/g, '')}`;
    const company = pick(COMPANIES);
    const email = `${emailLocal}@${company}.com`;

    const ctx = {
      name,
      product: pick(PRODUCTS),
      days: intBetween(3, 14),
      orderId: `SR-${intBetween(40000, 99999)}`,
      amount: intBetween(29, 499),
      errorId: `req_${Math.floor(rand() * 1e9).toString(36)}`,
      acctId: `acct_${Math.floor(rand() * 1e9).toString(36)}`,
      hour: intBetween(1, 5),
      years: intBetween(2, 6),
      company,
    };

    const row = {
      id,
      customer_name: name,
      customer_email: email,
      subject: archetype.subject(ctx),
      body: archetype.body(ctx),
      received_at: pickReceivedAt(),
      priority: archetype.priority,
      channel: pickChannel(),
      category: archetype.category,
    };

    lines.push(JSON.stringify(row));
  }

  await writeFile(OUT_FILE, lines.join('\n') + '\n', 'utf8');
  const sizeKb = (lines.join('\n').length / 1024).toFixed(1);
  console.log(`✓ wrote ${COUNT} tickets to ${OUT_FILE}`);
  console.log(`  size: ${sizeKb} KB (no embeddings yet)`);
  console.log(`  next: run scripts/embed-tickets.mjs to populate the embedding field`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
