---
title: "PRD-input extract: Zimple Fulfillment brief + addendum"
source:
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/brief.md (status: final, 2026-11-19)
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/addendum.md (2026-11-19)
created: 2026-11-19
---

# PRD-input extract — Zimple Fulfillment

Tags: [B] = brief, [A] = addendum. Addendum phase tags: P1 / P2 / Later / P? (unassigned; JST parity checklist should settle). A tag in parentheses on an item overrides its module tag.

## 1. Vision & bet

- Product: Zimple Fulfillment — WMS for Thai e-commerce fulfillment. [B]
- Vision: become the default fulfillment platform for Thai e-commerce warehouses; operators run whole operation (warehouse, transport, staff, billing) and owner relationship in one modern system instead of JST plus side tools. [B]
- Bet: a modern, easier-to-use system covering the whole fulfillment cycle will pull customers away from JST. [B]
- No technical moat. Advantage = UX + breadth; holds only if delivery is fast and product is reliable at 30,000 orders/day per warehouse. [B]
- Pricing planned to mirror JST's structure (license + other fees) → cost is NOT a reason to switch; UX + end-to-end must win alone. In Phase 1: UX + JST-gap fixes alone. [B]
- Current state: ~170 design mockups (addendum: ~150 warehouse-side files + 20 in `owner-portal/`); nothing built. Brief is the input to the PRD. [B][A]

## 2. Target customers / segments & user roles

Buyers (two segments) [B]:
1. Brand owners running their own warehouse — **comes first**. Pilot = company's own warehouse.
2. 3PL warehouse service providers with many owners — second; multi-owner features (Client Portal, per-owner rates, 3PL billing) deferred to Phase 2.

Daily users [B]: warehouse supervisors, floor staff on PDAs, packing & handover station operators, CS, accounting, admins; 3PL side: owners' staff on Client Portal; drivers.

Actors (detailed) [A]:
- Warehouse office: admin, supervisor, CS, executives, accounting, purchasing, HR, QC, transport supervisor.
- Floor staff: receiving, putaway, picking, sorting, packing, VAS, handover, returns, stock.
- Client Portal (P2): owner admin, owner team users, owner accounting.
- Others: carrier pickup staff (sign the manifest); drivers (Later).

Brief surfaces in Phase 1 [B]: warehouse web (supervisors, CS, accounting, purchasing, admins); PDA screens (receive, putaway, pick, sort, pack, handover, count, return); packing & handover stations bound to printers and scales.

## 3. Problems

Context: operators serving Shopee, Lazada, TikTok Shop sellers; ~30,000 orders/day per warehouse; peaks on campaign days like 11.11. [B]

JST pains [B]:
- **Cost & lock-in** — pay JST license; cannot easily leave or extend. *[Open: license cost and concrete lock-in incidents not yet quantified.]*
- **Gaps in the flow** — handover ends at "scan and split by carrier", no sorting status before handover; cancelled orders cannot be held for return; out-of-system work moves to manual workarounds [ASSUMPTION: Excel, LINE, paper].
- **Dated, hard-to-use UX** — slow to learn, unpleasant for floor staff and office users [ASSUMPTION: no specific UX failure cases collected yet].

Numbers available: 30,000 orders/day/warehouse; 50% target; 2-month Phase 1; ~170 mockups. No license cost, no JST warehouse count, no deadline.

## 4. Phasing & scope per phase

**Phase 1 — WMS core at JST parity (2 months, small team).** Hard bar: company's own warehouse can switch off JST completely. [B]
IN:
- Core flow inbound → orders → picking → packing → handover → returns on warehouse web, PDA screens, packing & handover stations.
- Inventory & products: locations, lots/expiry, counts, moves.
- Integrations: marketplace order import (Shopee, Lazada, TikTok Shop); carriers (Flash, Kerry, J&T).
- JST-gap fixes: pre-handover sort status; holding cancelled orders for return.
- Migration tooling to move one warehouse off JST.
- Everything JST does today that the pilot warehouse relies on. *[Open: no JST feature checklist exists yet. Without one, the parity bar cannot be verified.]*
- Must be load-ready for 30,000 orders/day per warehouse (Key Risk section).
OUT: everything in Phase 2 / Later.

**Phase 2 — multi-owner for 3PLs** [B]: Client Portal, per-owner rules and rate cards, billing, claims cycle. (Addendum P2 also: Owners module — profiles, contracts, two-way requests; owner rates in Owner setup; ASN from Client Portal; raise claim from order.)

**Later — beyond WMS** [B]: TMS + driver app; purchasing + workforce planning; TV mode; customization tools (brand theme tool, drag-and-drop document template designer).

**P? — unassigned** [A]: inventory layout map, temperature log, inter-warehouse transfers; planning forecast for campaign peaks (11.11); report hub; settings: company & brand, warehouse→zone→location + layout designer, users & roles, time tracking, devices & stations, warehouse rules, admin bulk import/export.

Key risk [B]: Phase 1 is tight for a small team in 2 months. Mitigations: (1) build a **JST parity checklist** early — defines "done", blocks creep; (2) build **stations and integrations first** (most technical risk).

## 5. Capabilities / feature areas (with page counts from addendum)

Core flow [B six stages; A detail]:
- **Owner setup · P1** (count n/a): register SKUs and boxes, connect shops; warehouse sets each owner's rates (P2).
- **Inbound (9) · P1**: ASN from warehouse, Client Portal (P2) or PO (Later) → scan receive → temporary receipt when no ASN or mismatch → VAS → suggested putaway → closed receipts.
- **Orders (5) · P1**: marketplace auto-import, stock reservation, order timeline; raise claim (P2) or resend from an order.
- **Picking (10) · P1**: FIFO/FEFO rules; manual or automatic wave/batch lists; carts and totes; PDA picking; short picks; sorting.
- **Packing (8) · P1**: prep; pack station with scan check, box suggestion, weighing, labels; VAS at pack; exceptions queue.
- **Handover (7) · P1**: sort to carrier containers, loading scan, signed manifest, day-close pending items.
- **Returns (8) · P1**: receive → inspect with photos → VAS → restock, or report problem to owner.

Supporting [A]:
- **Inventory (21) · P1**: stock by status & location, across all warehouses; lot/expiry; stock ledger; moves; full/cycle/spot counts; damaged & on-hold stock; cancel-restock; standalone VAS; layout map (P?), temperature log (P?), inter-warehouse transfers (P?).
- **Products (8) · P1**: SKUs per owner, bundles, owner-supplied boxes, warehouse packing materials, material matching.
- **Claims (5) · P2**: review evidence, carrier claims, cost & prevention analytics.
- **Owners (4) · P2**: profiles & contracts; two-way requests owners ↔ warehouse.
- **Billing (6) · P2**: rate cards, charges, compensation, bill summary.
- **Client Portal (20 files) · P2**: owner-side screens, not broken down.
- **Purchase (7) · Later**: suppliers, reorder suggestions (probably for packing materials), POs, PO → inbound notice.
- **Planning (7) · Later**: forecast for campaign peaks (P?); workforce shifts, check-in, spot checks, staff tests.
- **Transport (6) · Later**: owner booking requests (pickup, B2B), trip planning, fleet, driver app with proof of delivery.
- **Reports (3)**: report hub (P?), TV mode (Later).
- **Settings**: Carriers P1; External connections P1; Per-owner rules P2; Theme tool Later; Doc template designer Later; others P? (see §4).

## 6. Success metrics & goals [B]

- Primary business goal: win 50% of warehouses currently running JST. *[Open: the baseline count of JST warehouses and the deadline.]*
- Pilot: company's own warehouse runs fully on Zimple Fulfillment and stops using JST.
- Migration: customers move off JST one warehouse at a time without disrupting operations.
- Operational [ASSUMPTION]:
  - Sustains 30,000 orders/day per warehouse and 11.11 peaks.
  - Stock and order accuracy at or above JST levels.
  - Training time for new floor staff lower than on JST.
  - Owner requests handled in-system instead of in chat (Phase 2).
- UX target (differentiator): users find it more modern, more attractive, simpler than JST (no measure defined).

## 7. Constraints

- **Volume:** ~30,000 orders/day per warehouse; must be load-ready in Phase 1. [B]
- **Peaks:** campaign days, e.g. 11.11. [B]
- **Platforms (marketplaces):** Shopee, Lazada, TikTok Shop. [B][A]
- **Carriers:** Flash, Kerry, J&T. [B][A]
- **Other integrations:** generic API connection to external systems; source names no ERP. [A]
- **Form factors:** warehouse web; PDA screens; packing & handover stations bound to printers and scales; Client Portal (P2); driver app (Later); TV-mode dashboard (Later); VAS work screen device unsettled (maybe desk tablet). [B][A]
- **Multi-warehouse:** stock across all warehouses; per-warehouse migration. [A][B]
- **Team/time:** small team, 2 months for Phase 1. [B]
- **Market/locale:** Thai e-commerce. (Thai-language not stated as a requirement in brief; addendum mentions JST ERP has Thai-language support.)
- **Compliance:** none mentioned in brief or addendum.

## 8. Differentiators vs JST [B]

- **Modern, easy UX** — headline promise.
- **End-to-end (Phase 2+)** — WMS + basic TMS, purchasing, workforce planning, claims, 3PL billing in one system; JST and typical WMSs stop earlier.
- **Built for multi-owner 3PL (Phase 2)** — per-owner rules & rates; every activity creates a charge line; charge lines roll up into one bill per owner; warehouse-fault claim compensation deducted from that bill; owner ↔ warehouse requests in-system instead of chat.
- **Fills JST's known gaps (from Phase 1)** — pre-handover sort status; hold cancelled orders for return.
- Not a differentiator: price (mirrors JST), technology (no moat).

## 9. Every [ASSUMPTION] and Open question (verbatim)

[ASSUMPTION] items:
1. "[ASSUMPTION: JST ERP, the Thai-market order/inventory/warehouse system]" (Executive Summary, defining JST)
2. "[ASSUMPTION: Excel, LINE, paper]" (manual workarounds)
3. "[ASSUMPTION: no specific UX failure cases collected yet]" (dated UX)
4. "**Operational** [ASSUMPTION]:" — covers: "Sustains 30,000 orders/day per warehouse and 11.11 peaks." / "Stock and order accuracy at or above JST levels." / "Training time for new floor staff is lower than on JST." / "Owner requests handled in-system instead of in chat (Phase 2)."

Inline open items:
5. "*[Open: license cost and concrete lock-in incidents not yet quantified.]*"
6. "*[Open: the baseline count of JST warehouses and the deadline.]*"
7. "*[Open: no JST feature checklist exists yet. Without one, the parity bar cannot be verified.]*"

Open Questions section:
8. "Confirm JST = JST ERP, and quantify its license cost and lock-in pain."
9. "How many warehouses run JST today (the baseline for the 50% target), and by when must the target be reached?"
10. "Build a JST feature parity checklist from the pilot warehouse's actual use of JST."
11. "Final pricing. The current intent is to mirror JST's license-plus-fees structure."

Addendum-raised open points:
12. P? items (not yet assigned by the brief; "The JST parity checklist should settle these") — see §4.
13. Market note: "It is unconfirmed whether this is related to Jushuitan (聚水潭), a Chinese SaaS ERP. This bears on the brief's open question about confirming that JST = JST ERP."
14. Design gaps (see §10).

## 10. Addendum-material (technical / how — for PRD detail & architecture, not brief-level)

- **[addendum-material] Sources:** `artifact/Zimple_Fulfillment_Feature_Inventory (1).docx` (Nov 17, 2026); mockups in `artifact/Zimple Fulfillment Screens (Copy)/` (~150 warehouse-side files + 20 in `owner-portal/`).
- **[addendum-material] Billing model (P2):** every warehouse activity → charge line; roll up into one bill per owner per billing cycle; standard rate card has four charge types — storage/space, receiving, pick-pack per order, VAS; customer-specific rates override standard card; warehouse-fault claim compensation deducted from the bill.
- **[addendum-material] Inbound mechanics:** temporary receipt when no ASN or mismatch; ASN sources (warehouse / Client Portal P2 / PO Later); suggested putaway; closed receipts.
- **[addendum-material] Picking mechanics:** FIFO/FEFO rules, manual or automatic wave/batch generation, carts and totes, short-pick handling.
- **[addendum-material] Packing station:** scan check, box suggestion, weighing, labels, VAS at pack, exceptions queue.
- **[addendum-material] Handover:** carrier containers, loading scan, signed manifest (signed by carrier pickup staff), day-close pending items.
- **[addendum-material] Inventory model hints:** stock by status (incl. damaged, on-hold) and location; lot/expiry; stock ledger; cancel-restock; warehouse → zone → location hierarchy (+ layout designer, P?); multi-warehouse view.
- **[addendum-material] Products model hints:** SKUs per owner, bundles, owner-supplied boxes vs warehouse packing materials, material matching.
- **[addendum-material] Settings:** devices & stations, users & roles, time tracking, admin bulk import/export, external connections (generic API) — mostly P?.
- **[addendum-material] Design gaps:**
  - Sorting and putaway have no dedicated PDA mockup; `inbound-pda-sample` may cover them.
  - Target device for VAS work screen unsettled; may run on a desk tablet.
  - Warehouse rules screen has two competing designs: `settings-warehouse-rules` and `new-sample-settings-warehouse-rules`.
- **[addendum-material] Market note:** WorldFirst partner page describes "JST ERP" as Thai-market system managing orders, inventory, warehouses for online stores with Thai-language support; link to Jushuitan unconfirmed.
- **[addendum-material] Brief-level build-order guidance (how):** build JST parity checklist early; build stations and integrations first.
