'use client';
/**
 * Havis — workspace component registry (compiled into core via `@wsx/registry`).
 *
 *   VisionEngines — the Rekognition classifier switch (core component). While
 *                   RUNNING, Analyze runs the hybrid; otherwise Claude Vision alone.
 *   AnalyzeQueue  — the page's rows with a Run button each: calls the core
 *                   analyze route and shows the verdict + both engines inline,
 *                   so a presenter can work through un-analyzed kits without
 *                   leaving the page.
 */
import { useState } from 'react';
import { VisionEngineControl } from '@/features/dashboard/VisionEngineControl';

type Row = { id: string | number; title: string; status: string | null; meta: Record<string, unknown> };
type Result = { verdict?: string; confidence?: number; findings?: Array<{ region?: string; issue?: string }>; classifier?: { status?: string; top_label?: { name: string; confidence: number } | null } | null; error?: string; ms?: number };

export function VisionEngines() {
  return <VisionEngineControl />;
}

export function AnalyzeQueue({ rows = [], limit = 12 }: { rows?: Row[]; limit?: number }) {
  const [results, setResults] = useState<Record<string, Result>>({});
  const [running, setRunning] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);
  const [shown, setShown] = useState(limit);

  async function run(row: Row): Promise<void> {
    const key = String(row.id);
    setRunning(key);
    try {
      const res = await fetch(`/api/v1/objects/${row.id}/analyze?classifier=1`, { method: 'POST' });
      const body = (await res.json()) as { ok?: boolean; ms?: number; reference?: Result; classifier?: Result['classifier']; error?: { message?: string } };
      if (!res.ok || !body.ok) {
        setResults(r => ({ ...r, [key]: { error: body.error?.message ?? `HTTP ${res.status}` } }));
      } else {
        setResults(r => ({ ...r, [key]: { ...(body.reference ?? {}), classifier: body.classifier ?? null, ms: body.ms } }));
      }
    } catch (err) {
      setResults(r => ({ ...r, [key]: { error: (err as Error).message } }));
    } finally {
      setRunning(null);
    }
  }

  async function runAll() {
    setRunningAll(true);
    for (const row of rows.slice(0, shown)) {
      if (!results[String(row.id)]) {
        // eslint-disable-next-line no-await-in-loop -- sequential on purpose: one vision call at a time
        await run(row);
      }
    }
    setRunningAll(false);
  }

  const pending = rows.slice(0, shown).filter(r => !results[String(r.id)]).length;
  return (
    <div className="rounded-lg border border-border">
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <div className="text-sm font-semibold">
          Un-analyzed kits
          <span className="ml-2 font-normal text-muted-foreground">
            {rows.length}
            {' '}
            waiting · showing
            {' '}
            {Math.min(shown, rows.length)}
          </span>
        </div>
        <button type="button" disabled={runningAll || running !== null || pending === 0} onClick={runAll} className="ml-auto inline-flex items-center rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background disabled:opacity-50">
          {runningAll ? 'Running…' : `Run next ${pending}`}
        </button>
        {shown < rows.length && (
          <button type="button" onClick={() => setShown(s => s + limit)} className="rounded-md border border-border px-3 py-1.5 text-xs">Show more</button>
        )}
      </div>
      <ul className="divide-y divide-border">
        {rows.slice(0, shown).map((row) => {
          const key = String(row.id);
          const r = results[key];
          const img = typeof row.meta.image_url === 'string' ? row.meta.image_url : null;
          const isRunning = running === key;
          return (
            <li key={key} className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm">
              {img && <img src={img} alt="" className="h-12 w-20 shrink-0 rounded border border-border object-cover" loading="lazy" />}
              <div className="min-w-0 flex-1">
                <a href={`/dashboard/objects/${row.id}`} className="font-medium hover:underline">{row.title}</a>
                <div className="font-mono text-[11px] text-muted-foreground">
                  {String(row.meta.template_id ?? '')}
                  {row.meta.captured_at ? ` · ${String(row.meta.captured_at)}` : ''}
                </div>
                {r && !r.error && (
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full border px-2 py-0.5 font-medium ${r.verdict === 'pass' ? 'border-emerald-600/40 text-emerald-700' : 'border-amber-600/50 text-amber-700'}`}>
                      Claude Vision
                      {' '}
                      {r.verdict?.toUpperCase()}
                      {typeof r.confidence === 'number' ? ` ${Math.round(r.confidence * 100)}%` : ''}
                    </span>
                    <span className="rounded-full border border-border px-2 py-0.5 text-muted-foreground">
                      Rekognition
                      {' '}
                      {r.classifier?.top_label ? `${r.classifier.top_label.name.endsWith('_bad') ? 'HOLD' : 'PASS'} ${Math.round(r.classifier.top_label.confidence * 100)}%` : (r.classifier?.status ?? 'off')}
                    </span>
                    {r.findings && r.findings.length > 0 && <span className="text-muted-foreground">{r.findings.map(f => `${f.region}: ${f.issue}`).join(' · ')}</span>}
                    {typeof r.ms === 'number' && <span className="font-mono text-[11px] text-muted-foreground">{Math.round(r.ms / 1000)}s</span>}
                  </div>
                )}
                {r?.error && <div className="mt-1 text-xs text-red-600">{r.error}</div>}
              </div>
              <button type="button" disabled={running !== null || runningAll} onClick={() => run(row)} className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium transition hover:bg-muted disabled:opacity-50">
                {isRunning ? 'Analyzing…' : r ? 'Run again' : 'Analyze'}
              </button>
            </li>
          );
        })}
        {rows.length === 0 && <li className="px-4 py-8 text-center text-sm text-muted-foreground">Everything has been analyzed. Reset the demo to get a fresh queue.</li>}
      </ul>
    </div>
  );
}

