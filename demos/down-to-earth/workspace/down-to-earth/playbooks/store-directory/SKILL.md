---
slug: store-directory
name: Store directory
description: The six Down to Earth locations and how to talk about them. Hours, addresses, and phone numbers are unfilled placeholders — never answer those from memory.
tags:
  - storefront
  - hiring
version: 1
---

# The six stores

Confirmed from the site footer. Everything past the name is unsourced.

| Store | Island | Address | Hours | Phone |
|---|---|---|---|---|
| **Kahului** | Maui | `TODO` | `TODO` | `TODO` |
| **Honolulu** | Oahu | `TODO` | `TODO` | `TODO` |
| **Kakaako** | Oahu | `TODO` | `TODO` | `TODO` |
| **Kailua** | Oahu | `TODO` | `TODO` | `TODO` |
| **Pearlridge** | Oahu | `TODO` | `TODO` | `TODO` |
| **Kapolei** | Oahu | `TODO` | `TODO` | `TODO` |

`TODO` — fill from downtoearth.org/our-stores, or let the `downtoearth-web` source sync and answer from retrieval instead. Also needed per store: departments carried, deli availability, curbside and delivery coverage, parking notes, and holiday hours.

# The rule about hours

**Never state hours, an address, or a phone number that isn't filled in above or quoted from a synced source.** Not an approximation, not "typically," not "most locations open around."

Someone drives across the island on that answer. When you don't have it:

> "I don't want to give you the wrong hours — the current ones for Kailua are at downtoearth.org/our-stores, or the store can tell you directly."

Holiday and seasonal hours are the most common way a cached answer goes stale. Even once this table is filled in, prefer a live synced source over it for anything time-sensitive.

# Which store does a guest mean

Five of the six are on Oahu, so "the Down to Earth in town" is ambiguous between Honolulu and Kakaako. Ask rather than assume — and when triaging written feedback where you can't ask, mark the store `unknown` rather than picking the likely one. A complaint routed to the wrong store team is worse than one routed to a human to sort.

Kahului is the only Maui location, so an unqualified Maui reference is unambiguous.

# Cross-store questions

- **Item availability differs by store.** Never confirm that something is in stock anywhere — there's no inventory feed wired into this instance.
- **Deli ordering** — online with in-store pickup, curbside pickup, and delivery. `TODO` — confirm which stores offer which of the three; do not assume all six offer all of them.
- **Departments vary.** `TODO` — per-store department list.
- **Perks and the Super Saver Flyer** are company-wide as far as the site shows. `TODO` — confirm whether any offers are store-specific.

# Hiring routing (DEMO FIXTURES)

Where the Hiring Workforce routes shortlists. **Every manager name below is a synthetic demo fixture** — Down to Earth has not named its store managers to us (the data room explicitly says verify names before using them). Never present these as real people; replace this table with the real routing during deployment week 1.

| Store | Shortlists route to | Email (fixture) |
|---|---|---|
| Kahului | P. Kealoha (fixture) | kahului-hiring@downtoearth.example |
| Honolulu | R. Santos (fixture) | honolulu-hiring@downtoearth.example |
| Kakaako | M. Ikaika (fixture) | kakaako-hiring@downtoearth.example |
| Kailua | L. Fonoti (fixture) | kailua-hiring@downtoearth.example |
| Pearlridge | D. Choy (fixture) | pearlridge-hiring@downtoearth.example |
| Kapolei | T. Agbayani (fixture) | kapolei-hiring@downtoearth.example |
| Corporate (Level 3–4 cc) | Amy Leong + HR manager (⚠ unnamed) | hiring@downtoearth.example |

Level 2 shortlists go to the store manager; Level 3–4 also cc corporate. See `hiring-standards` for the full policy.

# Related surfaces

Shop Online, the Super Saver Flyer, DTE Perks, the Lifestyle Hub and "Let's Talk Story" blog, Recipes, Videos, the store Calendar, and Careers ("Join our Team") are all live site sections. Point guests at the site section by name rather than describing what's on it from memory.
