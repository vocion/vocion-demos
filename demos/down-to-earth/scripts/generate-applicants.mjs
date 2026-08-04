#!/usr/bin/env node
/**
 * generate-applicants.mjs — synthetic applicant fixtures for the Down to
 * Earth Hiring Workforce demo.
 *
 * Writes two JSONL files under context/down-to-earth/data/ (file-import
 * resolves paths relative to CONTEXT_PATH):
 *   - applicants-indeed.jsonl   (~40 rows — fuller resumes)
 *   - applicants-website.jsonl  (~20 rows — shorter "Join our Team" form)
 *
 * Deterministic (seeded PRNG) so re-running produces identical files.
 * Every name, employer, and history is invented. Volume matches the
 * discovery call: ~60 applicants/month, mostly entry-level, management
 * "a dozen or so periodically."
 *
 * Row shape maps onto the file-import connector's smart defaults:
 *   id → externalId, name → title, body → content, received_at →
 *   lastModifiedAt; everything else lands in metadata.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'context', 'down-to-earth', 'data');

// Mulberry32 — tiny seeded PRNG, deterministic across runs.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(19770101); // company founding year as seed
const pick = arr => arr[Math.floor(rand() * arr.length)];
const chance = p => rand() < p;

const FIRST = ['Keanu', 'Leilani', 'Marcus', 'Noelani', 'Tyler', 'Malia', 'Jordan', 'Kai', 'Ashley', 'Ikaika', 'Brandon', 'Pua', 'Chelsea', 'Makoa', 'Renee', 'Dustin', 'Hoku', 'Samantha', 'Elijah', 'Nalani', 'Chris', 'Momi', 'Devin', 'Lani', 'Aaron', 'Kiana', 'Micah', 'Tehani', 'Ryan', 'Alika'];
const LAST = ['Silva', 'Kahale', 'Tanaka', 'Reyes', 'Wong', 'Kealoha', 'Nguyen', 'Fuentes', 'Akana', 'Cho', 'Delacruz', 'Mahoe', 'Okada', 'Pele', 'Ramos', 'Kim', 'Baclayon', 'Higa', 'Santos', 'Naeole'];
const STORES = ['Kahului', 'Honolulu', 'Kakaako', 'Kailua', 'Pearlridge', 'Kapolei'];

const L2_ROLES = ['Sales Associate', 'Cashier', 'Deli Clerk', 'Sales Clerk'];
const L3_ROLES = ['Department Supervisor', 'Assistant Manager', 'Manager on Duty', 'Relief Manager'];
const L4_ROLES = ['Store Manager', 'Deli Manager'];

const L2_HISTORY = [
  { blurb: '2 years cashier at a local drugstore — register, returns, closing counts', tags: 'register + cash handling' },
  { blurb: '18 months barista at a Kailua coffee shop — espresso bar, grab-and-go case, opening shifts', tags: 'food service + customer-facing' },
  { blurb: '3 years deli counter at a supermarket — slicing, case display, food-handler card (current)', tags: 'deli + food-handler card' },
  { blurb: '1 year stocking + carts at a big-box store, moved to register after 6 months', tags: 'retail + register' },
  { blurb: '2 years fast food — drive-through, register, food-handler card', tags: 'food service + register' },
  { blurb: '4 years behind the counter at a butcher shop and seafood counter — scales, labeling, customer service, food-handler card', tags: 'meat/seafood counter (history-not-conduct case)' },
  { blurb: 'first job — school volunteering at a community garden, farmers-market booth on weekends', tags: 'no formal experience' },
  { blurb: '3 years rideshare driving, excellent ratings; some catering gig work', tags: 'adjacent only' },
  { blurb: '2 years hotel housekeeping, 1 year hotel gift shop register', tags: 'hospitality + register' },
  { blurb: '5 years produce clerk at a grocery co-op — receiving, rotation, customer questions', tags: 'grocery + produce' },
];
const L3_HISTORY = [
  { blurb: '2 years shift lead at a smoothie chain (team of 5), 3 years crew before that; scheduling + till reconciliation', tags: 'shift lead' },
  { blurb: '4 years assistant manager at a convenience store — ordering, cash office, opening/closing, 8 direct reports', tags: 'assistant manager' },
  { blurb: '3 years front-end supervisor at a supermarket — 12 cashiers, breaks, escalations', tags: 'front-end supervisor' },
  { blurb: '6 years server then 2 years floor supervisor at a resort restaurant', tags: 'restaurant supervisor' },
  { blurb: '5 years retail keyholder — no formal supervisory title, trained new hires', tags: 'borderline supervisory' },
];
const L4_HISTORY = [
  { blurb: '6 years managing a 12-person restaurant kitchen — scheduling, inventory, vendor orders, food cost; manager food-safety cert', tags: 'strong management' },
  { blurb: '8 years grocery store manager on the mainland — P&L, 30 staff, shrink reduction program', tags: 'grocery management' },
  { blurb: '4 years managing a mall apparel store — 15 staff, scheduling, inventory counts', tags: 'adjacent retail management' },
  { blurb: '10 years chef-owner of a small plate-lunch spot (closed 2025) — everything from ordering to payroll', tags: 'owner-operator' },
];

const AVAIL = ['weekends + evenings', 'weekends only', 'weekdays only', 'full-time, any shift', 'evenings + weekends', 'weekdays + weekends'];
const WHY = [
  'I shop at Down to Earth and love what the store stands for.',
  'Looking for steady work close to home.',
  'I want to work somewhere that cares about healthy food.',
  'A friend who works for you recommended I apply.',
  'I am plant-based myself and would be proud to work here.',
  'Ready for a change from my current industry.',
];

function makeApplicant(i, source) {
  const name = `${pick(FIRST)} ${pick(LAST)}`;
  // Role mix per the call: mostly entry-level; management periodically.
  const r = rand();
  const [role, level, history] = r < 0.72
    ? [pick(L2_ROLES), 2, pick(L2_HISTORY)]
    : r < 0.9
      ? [pick(L3_ROLES), 3, pick(L3_HISTORY)]
      : [pick(L4_ROLES), 4, pick(L4_HISTORY)];

  const store = chance(0.8) ? pick(STORES) : null; // some don't state one
  const availability = chance(0.85) ? pick(AVAIL) : null; // some omit it
  const smokes = chance(0.12) ? 'yes' : chance(0.06) ? '' : 'no'; // a few flags + a few blanks
  const ack = chance(0.9) ? 'acknowledged' : 'not answered';
  const day = 1 + Math.floor(rand() * 28);
  const received = `2026-07-${String(day).padStart(2, '0')}T${String(8 + Math.floor(rand() * 9)).padStart(2, '0')}:${String(Math.floor(rand() * 60)).padStart(2, '0')}:00-10:00`;
  const email = `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`;

  const bodyLines = source === 'indeed'
    ? [
        `Application via Indeed for ${role}${store ? ` — ${store} store` : ''}.`,
        '',
        `RESUME`,
        `${name} · ${email} · Oahu, HI`,
        `Experience: ${history.blurb}.`,
        chance(0.5) ? `References available on request.` : `Two references listed.`,
        '',
        `APPLICATION ANSWERS`,
        `Store preference: ${store ?? '(not stated)'}`,
        `Availability: ${availability ?? '(not stated)'}`,
        `Plant-based policy (no meat, eggs, or fish on property): ${ack}`,
        `Do you vape or smoke?: ${smokes === '' ? '(blank)' : smokes}`,
        `Why Down to Earth: ${pick(WHY)}`,
      ]
    : [
        `"Join our Team" application via downtoearth.org for ${role}${store ? ` — ${store} store` : ''}.`,
        '',
        `${name} · ${email}`,
        `About me: ${history.blurb}.`,
        `Store preference: ${store ?? '(not stated)'}`,
        `Availability: ${availability ?? '(not stated)'}`,
        `Plant-based policy acknowledged: ${ack}`,
        `Do you vape or smoke?: ${smokes === '' ? '(blank)' : smokes}`,
      ];

  return {
    id: `APP-${source === 'indeed' ? 'IN' : 'WEB'}-${String(i + 1).padStart(3, '0')}`,
    name: `${name} — ${role}${store ? ` (${store})` : ''}`,
    body: bodyLines.join('\n'),
    received_at: received,
    role_applied: role,
    level: `level-${level}`,
    store_preference: store ? store.toLowerCase() : 'not-stated',
    source,
    availability: availability ?? '',
    plant_based_ack: ack === 'acknowledged' ? 'acknowledged' : 'not-acknowledged',
    smokes_or_vapes: smokes === 'yes' ? 'yes-flagged' : smokes === '' ? 'blank' : 'no',
    applicant_email: email,
    fixture: true,
  };
}

mkdirSync(OUT_DIR, { recursive: true });
const indeed = Array.from({ length: 40 }, (_, i) => makeApplicant(i, 'indeed'));
const website = Array.from({ length: 20 }, (_, i) => makeApplicant(i, 'website'));
writeFileSync(join(OUT_DIR, 'applicants-indeed.jsonl'), `${indeed.map(r => JSON.stringify(r)).join('\n')}\n`);
writeFileSync(join(OUT_DIR, 'applicants-website.jsonl'), `${website.map(r => JSON.stringify(r)).join('\n')}\n`);

const all = [...indeed, ...website];
const count = (f) => all.reduce((acc, row) => { const k = f(row); acc[k] = (acc[k] ?? 0) + 1; return acc; }, {});
console.log(`wrote ${indeed.length} indeed + ${website.length} website rows to ${OUT_DIR}`);
console.log('levels: ', count(r => r.level));
console.log('stores: ', count(r => r.store_preference));
console.log('smoking:', count(r => r.smokes_or_vapes));
console.log('ack:    ', count(r => r.plant_based_ack));
