/**
 * Down to Earth — workspace component registry.
 *
 * Custom React widgets for the tenant's workspace pages. Compiled into the
 * core app via the `@wsx/registry` alias (see vocion-core next.config.ts).
 * Server-component-safe: pure render, no hooks, no browser APIs.
 */
import type { ComponentType } from 'react';

type Row = { meta: Record<string, unknown> };

const BANDS = [
  { label: '85–100 · strong', min: 85, max: 100, cls: 'bg-emerald-500' },
  { label: '70–84 · qualified', min: 70, max: 84, cls: 'bg-teal-500' },
  { label: '60–69 · near-miss (held, second look)', min: 60, max: 69, cls: 'bg-amber-400' },
  { label: 'below 60 · held with reason', min: 0, max: 59, cls: 'bg-zinc-300 dark:bg-zinc-600' },
];

/** Horizontal band distribution over the page's applicant rows. */
function ScoreDistribution({ rows = [] }: { rows?: Row[] }) {
  const scores = rows
    .map(r => Number(r.meta?.score))
    .filter(n => Number.isFinite(n));
  const total = scores.length || 1;
  return (
    <div className="space-y-2 rounded-lg border border-border p-4">
      {BANDS.map((b) => {
        const n = scores.filter(s => s >= b.min && s <= b.max).length;
        const pct = Math.round((n / total) * 100);
        return (
          <div key={b.label} className="flex items-center gap-3">
            <div className="w-64 shrink-0 text-xs text-muted-foreground">{b.label}</div>
            <div className="h-4 flex-1 overflow-hidden rounded-sm bg-muted">
              <div className={`h-full ${b.cls}`} style={{ width: `${pct}%` }} />
            </div>
            <div className="w-16 shrink-0 text-right font-mono text-xs tabular-nums">
              {n}
              {' · '}
              {pct}
              %
            </div>
          </div>
        );
      })}
      <p className="pt-1 text-xs text-muted-foreground">
        Threshold 70 routes to a store manager. Nothing below it is rejected — held, with the reason recorded.
      </p>
    </div>
  );
}

export const components: Record<string, ComponentType<any>> = {
  ScoreDistribution,
};
