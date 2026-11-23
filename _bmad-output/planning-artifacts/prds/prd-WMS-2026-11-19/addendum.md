---
title: "Addendum: Zimple Fulfillment PRD — Phase 1"
prd: prd.md
created: 2026-11-19
updated: 2026-11-19
---

# Addendum: Zimple Fulfillment PRD — Phase 1

This addendum is for downstream readers: UX, architecture, and epic/story authors. It holds material that is too detailed or too "how" for the PRD.

## A. Detail catalogues (rule-level behaviour)

The PRD's FRs are condensed from two catalogues. The catalogues add the full status labels (Thai UI wording), sample thresholds, numbering formats, and per-screen behaviour taken from the 161 mockups. Use them when writing stories and UX specs. Where a catalogue conflicts with the PRD, the PRD wins.

| Catalogue | Covers | PRD sections |
|---|---|---|
| `fr-candidates-inbound-stock-setup.md` | Inbound, products, inventory, settings, account, overview, reports, migration (87 candidate FRs, 27 glossary terms, 15 open questions) | §4.2–4.6, §4.13–4.15 |
| `fr-candidates-outbound.md` | Orders, picking, packing, handover, cancellations, returns (63 candidate FRs, 25 glossary terms, 13 open questions) | §4.7–4.12 |
| `extract-screens.md` | A per-module inventory of all 161 mockups: entities, fields, status values, roles and devices | all |
| `extract-feature-inventory.md` | The Feature Inventory docx: user journey per page, and the system overview diagram | all |
| `extract-brief.md` | The brief and its addendum, with every assumption and open item quoted verbatim | §1, §2, §10 |
| `research-landscape.md` | JST, competitors, marketplace and carrier realities, PDPA, e-Tax and WHT, all cited | §1, §6, §7 |

## B. Decisions made during PRD discovery, and what they superseded

1. **Order source: the OMS, not direct marketplace connections.** The brief listed "marketplace order import (Shopee, Lazada, TikTok Shop)" as a Phase 1 integration. The mockups make the OMS the system of record: the WMS cannot create, edit or cancel orders. The user confirmed the mockup model. Marketplace integration moves out of the WMS and into the OMS.
2. **The pilot leaves JST entirely.** At first the user answered that the pilot would keep JST as its OMS. They then changed this to: the pilot connects to **Zimple OMS** and leaves JST for both OMS and WMS. That makes Zimple OMS the gating dependency. It also means "leave JST" in SM-1 covers both systems.
3. **Carrier APIs are only for non-marketplace orders.** Marketplace orders carry platform-issued labels and carriers (research: Shopee `ship_order`/`get_shipping_document`, Lazada RTS → getDocument, TikTok ship package). Flash, KEX and J&T are called directly only for LINE, web and B2B orders.
4. **The PRD covers Phase 1 only.** Phase 2 and Later appear only as non-goals, plus the data Phase 1 must capture (PRD §4.16).
5. **Unassigned features follow the JST-parity rule.** The user delegated phase assignment. Daily-operations features go to Phase 1. Layout map, temperature log, inter-warehouse transfer, peak forecast, Purchasing, Transport and Planning go to Later.
6. **Owner-side decisions are made in OMS after-sales** (reviewer gate). The first draft gave them to an internal Owner Care role inside the WMS. The user chose the mockup model instead: the WMS sends decision cases with evidence and executes the decisions that come back (FR-121).
7. **There is no fallback if Zimple OMS slips.** Phase 1 cutover moves with it. A JST-OMS connector as a fallback was considered and rejected.
8. **The web fallback without PDAs is Phase 1 scope** (FR-122), even though it roughly doubles floor-flow UI work.
9. **Provisional priority tiers** (PRD §9.3) were set by the PM agent from the thesis. They wait for confirmation from the JST parity checklist.

## C. Product editions and add-ons (from the mockups)

Each mockup has a `var pg=` flag that implies two editions on one codebase:
- **Zimple Fulfillment (3PL):** multi-owner, Client Portal, billing, claims, Owners.
- **Zimple WMS (Business):** a brand running its own warehouse. Claims are handled in the OMS.

Add-on modules are switched on per company or warehouse: workforce planning, pre-pack prep and materials, automatic pick lists, transport, VAS, temperature. The PRD treats the pilot as the Business edition, and includes prep, automatic pick lists and minimal VAS per the brief (PRD Q-5). Packaging and licensing of add-ons is a commercial decision outside the PRD.

## D. Architecture-relevant notes (not requirements)

- **Peak integration pattern** (research, unverified): API throttling on 11.11 means queues with backoff, AWB prefetch before the pick wave, and idempotent ready-to-ship calls. Since marketplace calls go through Zimple OMS, the WMS ↔ OMS contract needs the same properties.
- **TikTok Shop labels cannot be voided through the API.** This matters for a cancellation after the label is printed (FR-93).
- **Video storage model in the mockups:** primary storage on a local NAS, with a cloud copy uploaded only when someone views a clip. Phase 1 needs only local retention and in-WMS playback. The cloud copy mainly serves Portal and Claims (Phase 2).
- **Ledger design:** append-only lines (`SL-`) with running balance and an m³ delta per line. A move writes 2 lines. The daily reconciliation compares the balance with the sum of lines.
- **Settings precedence engine:** 5 levels, with effective-dated values and history. Shelf life uses a strictest-wins exception. A `[warehouse-wide]` lock flag prevents overrides below warehouse level.
- **Hardware:** a PC binds to a station by a 6-digit code. The PDA camera fallback order is IP camera, then built-in camera, then none. USB cameras cannot be used with a PDA.

## E. Phase 2 regulatory notes (for later billing work)

- **e-Tax Invoice & e-Receipt** is voluntary in 2026–27. There are two routes: full e-Tax with a CA signature, or e-Tax by Email for revenue ≤ ฿30M. Recommendation: integrate with a Thai e-Tax or accounting provider rather than sign documents in-house.
- **Withholding tax on 3PL invoices:** 3% services, 5% rent, 1% transport, all calculated before VAT. Whether storage counts as rent or service depends on contract wording. Invoice lines should carry a WHT category, and the system should track 50 ทวิ certificates. Confirm with a tax advisor.
- **PDPA:** for 3PL customers, Zimple's operator is the data processor, so a controller-processor agreement is needed. Data minimization is the PDPC's top complaint category.

## F. Market context (for positioning, not requirements)

- **JST's parent, Jushuitan,** is listed on HKEX (6687, October 2025) and well funded. JST Thailand publishes no pricing, and no public complaint data was found, so pain points need customer interviews.
- **The market splits into three groups:**
  - OMS-first tools with shallow WMS (ZORT, BigSeller, Ginee);
  - 3PLs whose WMS is proprietary and not for sale (Flash Fulfillment, Locad, MyCloud);
  - enterprise SaaS (Anchanto, JST).

  A Thai-native, marketplace-deep WMS that can also do 3PL billing sits in a thin space.
- **Thai e-commerce GMV** was about US$35.5B in 2025. The 2024 split was Shopee 49%, Lazada 30%, TikTok 21%.

## G. Reviewer and reconciliation outputs

The full findings are in `review-rubric.md`, `reconcile-brief.md`, `reconcile-screens.md` and `reconcile-feature-inventory.md`. Critical and high findings were fixed in the PRD. The medium and low findings that remain are listed there for the UX and story authors.

## H. Design gaps for UX

- PDA screens for putaway and sorting are missing, and every PDA mockup is reference-only.
- The warehouse rules screen has two designs: `settings-warehouse-rules` and `new-sample-settings-warehouse-rules` (paused).
- The EN and TH overview pages show different content.
- The approval matrix names roles that are not in the default role list.
- The device for the VAS work screen is undecided; it may be a desk tablet.
