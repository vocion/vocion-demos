---
slug: store-directory
name: Store directory
description: The six Retail Hiring Workforce locations and how to talk about them. Hours, addresses, and phone numbers are unfilled placeholders — never answer those from memory.
tags:
  - storefront
  - hiring
version: 1
---

# The six stores

Confirmed from the site footer. Everything past the name is unsourced.

| Store | Island | Address | Hours | Phone |
|---|---|---|---|---|
| **Riverside** | North Region | `TODO` | `TODO` | `TODO` |
| **Lakeside** | South Region | `TODO` | `TODO` | `TODO` |
| **Midtown** | South Region | `TODO` | `TODO` | `TODO` |
| **Harborview** | South Region | `TODO` | `TODO` | `TODO` |
| **Eastgate** | South Region | `TODO` | `TODO` | `TODO` |
| **Westfield** | South Region | `TODO` | `TODO` | `TODO` |

`TODO` — fill from retailhiring.example.com/our-stores, or let the `retail-web` source sync and answer from retrieval instead. Also needed per store: departments carried, deli availability, curbside and delivery coverage, parking notes, and holiday hours.

# The rule about hours

**Never state hours, an address, or a phone number that isn't filled in above or quoted from a synced source.** Not an approximation, not "typically," not "most locations open around."

Someone drives across the island on that answer. When you don't have it:

> "I don't want to give you the wrong hours — the current ones for Harborview are at retailhiring.example.com/our-stores, or the store can tell you directly."

Holiday and seasonal hours are the most common way a cached answer goes stale. Even once this table is filled in, prefer a live synced source over it for anything time-sensitive.

# Which store does a guest mean

Five of the six are on South Region, so "the Retail Hiring Workforce in town" is ambiguous between Lakeside and Midtown. Ask rather than assume — and when triaging written feedback where you can't ask, mark the store `unknown` rather than picking the likely one. A complaint routed to the wrong store team is worse than one routed to a human to sort.

Riverside is the only North Region location, so an unqualified North Region reference is unambiguous.

# Cross-store questions

- **Item availability differs by store.** Never confirm that something is in stock anywhere — there's no inventory feed wired into this instance.
- **Deli ordering** — online with in-store pickup, curbside pickup, and delivery. `TODO` — confirm which stores offer which of the three; do not assume all six offer all of them.
- **Departments vary.** `TODO` — per-store department list.
- **Perks and the Super Saver Flyer** are company-wide as far as the site shows. `TODO` — confirm whether any offers are store-specific.

# Hiring routing (DEMO FIXTURES)

Where the Hiring Workforce routes shortlists. **Every manager name below is a synthetic demo fixture** — Retail Hiring Workforce has not named its store managers to us (the data room explicitly says verify names before using them). Never present these as real people; replace this table with the real routing during deployment week 1.

| Store | Shortlists route to | Email (fixture) |
|---|---|---|
| Riverside | P. Kealoha (fixture) | riverside-hiring@retailhiring.example |
| Lakeside | R. Santos (fixture) | lakeside-hiring@retailhiring.example |
| Midtown | M. Ikaika (fixture) | midtown-hiring@retailhiring.example |
| Harborview | L. Fonoti (fixture) | harborview-hiring@retailhiring.example |
| Eastgate | D. Choy (fixture) | eastgate-hiring@retailhiring.example |
| Westfield | T. Agbayani (fixture) | westfield-hiring@retailhiring.example |
| Corporate (Level 3–4 cc) | the HR lead + HR manager (⚠ unnamed) | hiring@retailhiring.example |

Level 2 shortlists go to the store manager; Level 3–4 also cc corporate. See `hiring-standards` for the full policy.

# Related surfaces

Shop Online, the Super Saver Flyer, Rewards Program, the Lifestyle Hub and "Let's Talk Story" blog, Recipes, Videos, the store Calendar, and Careers ("Join our Team") are all live site sections. Point guests at the site section by name rather than describing what's on it from memory.
