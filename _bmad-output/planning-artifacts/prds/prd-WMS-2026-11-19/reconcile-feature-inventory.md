---
title: "Reconcile: Feature Inventory vs PRD (Phase 1)"
input: extract-feature-inventory.md
against: prd.md, addendum.md, .memlog.md
created: 2026-11-19
---

# Reconcile: Feature Inventory vs PRD (Phase 1)

Scope rule applied (from .memlog / PRD §8–9): out of scope are Client Portal, billing, claims, the Owners module, purchasing, transport, planning/workforce, TV mode, the theme tool, the template designer, the layout map, the temperature log, inter-warehouse transfer and peak forecast. Rows in those areas count as covered when the PRD excludes them explicitly. The checks below look only at the Phase 1 rows and at the handoffs *between* stages, i.e. the "→ next" part of each journey.

Legend: **C** = covered · **P** = partial · **X** = explicitly excluded · **A** = absent

## 1. Coverage matrix (Phase-1-relevant rows)

### 1.1 Inbound
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| 0 Inbound overview (trucks/lots due today, done, pending; staff the dock) | **A** | FR-29 is a queue only | Every other stage has an overview FR (FR-55, 74, 90, 104). Inbound has none. See G-7. |
| 1 ASN (owner / warehouse / from PO) | C / X | FR-3, FR-30; PO is excluded in §8 | — |
| 2 Receive → "ส่งต่อไป VAS หรือ Putaway" | P | FR-33, FR-34, FR-84 | The handoff conflicts with the PRD. See G-3. |
| 2a Temp receipt → owner confirms → real receipt | P | FR-31, FR-32, FR-36 | The confirmation loop and the conversion into a receipt are undefined. See G-1, G-5. |
| 3 Inbound VAS (system creates the task from the owner's order) | P | FR-84 (a Supervisor attaches it) | The source of owner VAS orders in P1 (OMS? Owner Care?) is not stated. |
| 4 Putaway | C | FR-37, FR-38 (no PDA design, Q-11) | — |
| 5 Receipts history (basis for the receiving fee) | C | FR-39, §4.16 | — |

### 1.2 Orders
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| 0 Orders overview / cut-off risk | C | FR-56, FR-60 | — |
| 1 Order list, filtered by status / channel / owner | P | FR-56 | The FR lists search fields but not filters by channel or owner. The owner picker is hidden when there is a single owner (§4.16). Minor. |
| 2 Order detail + timeline to delivered | C | FR-57, FR-6 | — |
| 3 Claim / resend from order | **X (partial)** | Claims are excluded in §8 | **Resend is not mentioned.** The WMS cannot create orders (FR-1), so a resend must come from the OMS. State this explicitly in §8. |

### 1.3 Picking
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| 0 Picking overview | C | FR-74 | — |
| 1 Pick rules (FIFO/FEFO, location sequence, consolidation) | P | FR-61, FR-52, FR-64, FR-8 walk sequence | **FIFO is absent.** Only FEFO is specified, so allocation for SKUs with no lot or expiry is undefined. See G-6. |
| 2 Manual pick list → assign to staff | P | FR-62, FR-66 | FR-66 covers claiming from a shared queue. A supervisor *assigning* a list to a named picker is implied ("unassigned lists") but has no FR. |
| 2 Auto pick list | C | FR-65 (Q-5) | — |
| 3 Carts/totes bound to the list → reused at sorting and packing | C | FR-10, FR-67, FR-71 | — |
| 4 Pick list + PDA picking | C | FR-63, FR-66, FR-67 | — |
| 5 Short-pick queue → **supervisor decides**: other location / replenish / split or wait the order | P | FR-70 (a fixed system flow) | The PRD defines no supervisor short-pick queue and no "split the order / ship partial / wait" decision. See G-6. |
| 6 Sorting | C | FR-72 (no PDA design, Q-11) | — |

### 1.4 Packing
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| 0 Packing overview (queue, packed count, per-station and per-person) | **A** | FR-109 and FR-110 are aggregate only | See G-7. |
| 1 Prep (web + PDA) | C | FR-83 | — |
| 2 Pack station → place for handover | C | FR-75–FR-79; the handoff goes to FR-85 | — |
| 3 VAS at pack (as ordered by the owner) | P | FR-84, FR-79 inserts | FR-79 depends on "owner box mode" and "owner insert rules". **Where these are configured in P1 is undefined**, because the per-owner settings UI is excluded (§8, FR-13). See G-4. |
| 4 Pack exceptions → "แก้แล้วส่งกลับไปแพ็คต่อ" | P | FR-82 | The resolution outcomes are not defined: resume the same job, re-pick (child PK), or cancel-return. The path back to packing is dropped. |

### 1.5 Handover
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| 0 Handover overview (per carrier, pickup times) | C | FR-90, FR-14 | — |
| 1 Sort to containers | C | FR-85, FR-86 | Closes the JST gap. |
| 2 Handover station / PDA | C | FR-87 | — |
| 3 Manifest → order = shipped | C | FR-88, FR-56 | — |
| 4 Pending at day close → carry over or chase the carrier | C | FR-91 | — |
| JST note (sorted state, hold cancelled goods for return) | C | FR-85, FR-92–FR-97 | — |

### 1.6 Inventory
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| Stock overview + alerts → click through | C | FR-55 | — |
| Stock balance (available / reserved / held) | C | FR-40, FR-41 | — |
| Stock by location → order a move | C | FR-40, FR-44 | — |
| All warehouses → create a transfer | P / X | NFR-11; transfer is excluded | The cross-warehouse stock view is not explicitly in or out. It is low priority for a single-site pilot, but §9.2 should state it. |
| Layout map | X | §8 | — |
| Lots and expiry → near expiry → **notify the owner or move to hold** | P | FR-40, FR-52, FR-55 | There is no near-expiry notification to Owner Care and no "move to hold" action. FR-52 only handles *expired* stock. |
| Temperature log | X | §8 | — |
| Movement history (ledger browse, trace a discrepancy) | P | FR-42 records the lines; FR-110 has a summary report | There is no FR for a searchable ledger view by SKU, location or document, yet SM-3 investigations depend on one. |
| Moves (web + PDA) | C | FR-44 | — |
| Inter-warehouse transfer | X | §8 | — |
| Count round types (full / cycle / spot) | P | FR-47 | The scopes are covered. **Recurring cycle-count scheduling** is not specified. |
| Counting → variance → approve adjustment | C | FR-47–FR-50, FR-105 | — |
| Damaged / hold → notify owner to decide | P | FR-53, FR-54 | Owner Care decides, but the notification and decision handoff is not formalized. See G-1. |
| Cancel-and-restock | C | FR-96, FR-97 | — |
| Standalone VAS (owner orders → queue → VAS desk → stock changes) | P / X | FR-84 says it "stays an add-on"; FR-27 covers kit assembly | The exclusion appears only in an FR-84 aside. It is missing from §8 and §9.2. |

### 1.7 Returns
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| Returns overview / jobs | C | FR-104 | — |
| Receive return (web + PDA) | C | FR-99, FR-100 | — |
| Inspection | C | FR-101 | — |
| Returns VAS → restock | C | FR-84, FR-102 | — |
| Restock | C | FR-102 | — |
| Problem report → owner responds → may go to Claims | P | FR-103; Claims are excluded | The decision options in FR-103, and how a decision triggers FR-54 disposition or a restock, are not linked. Claims capture is preserved (§4.16). See G-1. |

### 1.8 Products
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| Owner SKUs (added via the Portal or by the warehouse) | C | FR-3 (from the OMS, read-only), FR-24 | The warehouse cannot add SKUs. This is consistent with the OMS decision. |
| **Bundle/Set: order for a set → pick list explodes into components; component stock deducted** | **P** | FR-27 (BOM display, assemble/unbundle), FR-76 (packed together) | **Missing:** kit-order explosion at allocation and pick-list creation, ATP for kits (buildable quantity), and available-to-sell for kits pushed to the OMS (FR-4). See G-2. |
| Owner boxes | C | FR-28, FR-79 | — |
| Warehouse materials → near empty → purchasing | C / X | FR-28 reorder point, FR-40 filter; purchasing is excluded | The replenishment path without purchasing (FR-30 warehouse-created ASN for the warehouse's own goods) works but is not stated as the intended path. |
| Material matching (SKU or order size → box) | P | FR-79 suggests a box; FR-28 covers paired materials | **There is no FR for configuring matching rules.** Box suggestion has no defined input. |

### 1.9 Overview, Reports, Settings, Account, PDA
| Inv row | Status | PRD location | Note |
|---|---|---|---|
| Overview dashboard (TH/EN) | C | FR-109, NFR-8 | — |
| Reports hub | C | FR-110 | — |
| TV mode | X | §8 | — |
| Settings hub | C | FR-12 | — |
| Company and brand (name and logo on labels and documents) | P / X | The theme tool is excluded | Company name and logo on printed documents are not covered by any FR. Minor. |
| Warehouse / zone / location + barcodes | C | FR-8, FR-112 | — |
| Layout designer (also drives the pick route) | X | §8; the route comes from FR-8 walk sequence | — |
| Users and permissions | C | FR-17–FR-19 | — |
| Time tracking | X (implicit) | §8 "no shift planning, check-in" | Fine. |
| Devices and stations | C | FR-11 | — |
| **Carriers: enable, account / API key, pickup times** | **P** | FR-14 covers pickup rounds; FR-2 mentions "unmapped carrier" | **Missing:** carrier account and credential configuration, and the carrier-name **mapping** UI that FR-2 relies on. See G-5. |
| Document templates (designer excluded) | P / X | FR-78 prints documents | Default templates and which document prints where (per station or channel) are not specified. Minor. |
| **Connections: OMS / external / API** | **P** | FR-1, FR-4, §7 generic API | **Missing:** a connection management FR (configure the Zimple OMS endpoint, issue and revoke generic-API keys, show connection health). FR-23 references "connections or API keys" as if the screen exists. See G-5. |
| Warehouse rules | C | FR-12, Q-7 | — |
| Per-owner settings (photo before pack, brand box, alerts) | X with a dependency | §8, FR-13 | The exclusion leaves FR-79 without a configuration home. See G-4. |
| Admin tools (bulk import/export, forced data fix) | P | FR-111–FR-113 | Bulk *export* of master data is absent. "Forced data fix" conflicts with §6.2 (no manual adjust). §8 should state that it is excluded and that reversal or approval paths replace it. |
| Login / change password / help | C | FR-20 (help page trivial) | — |
| PDA login menu | C | FR-21 | — |
| PDA check-in / spot checks | X | §8 | — |
| PDA inbound / pick / pack / handover / stock / returns | C | FR-33, FR-38, FR-67, FR-75, FR-87, FR-44, FR-48, FR-96, FR-99 | Putaway and sorting PDA designs are missing (Q-11). |
| PDA VAS work screen | X (add-on) | FR-84 aside | Same as the standalone VAS row. |

### 1.10 Out-of-scope sections: exclusion check
| Inv section | PRD exclusion | OK? |
|---|---|---|
| 2.3 Claims | §8, §9.2; evidence kept in §4.16 | Yes |
| 3.3 Purchasing | §8 | Yes |
| 3.4 Planning (forecast, workforce, check-in, spot check / testing) | §8 | Mostly. *Staff tests* and *spot checks* are listed. QC spot-check of packed boxes is a quality control with no P1 substitute. Acceptable. |
| 3.5 Transport / driver app | §2.2, §8 | Yes |
| 3.6 Owners (profiles, two-way requests) | §8 | Yes, but the request loop it carried has no P1 replacement. See G-1. |
| 3.7 Billing | §8; signals kept in §4.16 | Yes |
| 5 Client Portal (all 11 rows) | §2.2, §8 | Yes. Each portal action that the warehouse side depends on is re-homed to Owner Care, but only piecemeal. See G-1. |

## 2. Gaps (prioritized)

**G-1. Owner-decision loop dropped (High).**
- **Inventory rows:** 3.6 "คำขอจาก/ถึงเจ้าของ" (owners-requests ↔ warehouse-requests); 1.1-2a "ส่งคำขอยืนยันถึงเจ้าของ → ยืนยันแล้วจึงรับเข้าจริง"; 2.1 damaged/hold "แจ้งเจ้าของตัดสินใจ"; 2.2 problem report "เจ้าของตอบ"; count mismatch.
- **PRD location:** The Owners module is excluded (§8). The decisions are scattered across FR-31 (notify only), FR-36 ("awaiting confirmation" / "held for a decision", decider unnamed), FR-54, FR-103 and FR-106.
- **Problem:** No FR defines the Owner Care decision queue: one list of pending decisions with type, evidence, SLA and allowed outcomes. The PRD also never says what each outcome triggers, i.e. how the "→ คลังดำเนินการตามคำตอบ" step happens.
- **Suggested fix:** Add an FR in §4.13 or §4.6, "Owner Care decision queue", that covers:
  - its sources: unannounced arrival, over-receipt or off-list quarantine, damaged/held, problem report, count variance where the owner is affected;
  - the outcomes per type, each mapped to a system action: create or attach an ASN and receive (FR-30/33), release the quarantine to normal stock, run disposition (FR-54), restock (FR-102), or keep stored;
  - a decision SLA and escalation (FR-108).

  Shape the data so the Phase 2 Portal "warehouse-requests" page can surface the same objects.

**G-2. Kit/bundle sale → component allocation (High).**
- **Inventory row:** 3.2 Bundle/Set: "ออเดอร์เซ็ตเข้า → ใบหยิบแตกเป็นตัวย่อยอัตโนมัติ / ระบบตัดสต็อกตัวย่อยเมื่อขายเซ็ต".
- **PRD location:** Partial. FR-27 covers BOM display, buildable quantity and assemble/unbundle orders. FR-76 says kit components are packed together. FR-1, FR-41, FR-64 and FR-4 are silent on kits.
- **Suggested fix:** Add consequences to FR-64 and FR-41:
  - a kit order line explodes into component lines at reservation and allocation, unless a pre-built kit SKU is in stock (state the priority between the two);
  - component stock is reserved and deducted at handover.

  Add to FR-4 how the available-to-sell for a kit is computed (minimum buildable) and pushed to the OMS. Also add a kit pick-list case to UJ-2 or to the FR-63 consequences.

**G-3. Receive → inbound VAS → putaway handoff conflicts (Medium-High).**
- **Inventory rows:** 1.1-2 "ยืนยันยอด → ส่งต่อไป VAS หรือ Putaway"; 1.1-3 "ทำเสร็จจึงไป Putaway".
- **PRD location:** FR-34 says "closing a container creates a putaway task immediately". FR-84 attaches VAS to inbound lines but gates only box close and return restock.
- **Suggested fix:** Add an FR-84 consequence: an inbound line with an open VAS task routes its container to a VAS staging location, and the putaway task is created only when the VAS task completes. Amend FR-34 to read "...creates a putaway task immediately unless an inbound VAS task is open". Define where the owner's VAS instruction comes from in P1: the OMS ASN line, or Owner Care.

**G-4. Owner-specific packing behaviour has no configuration home (Medium-High).**
- **Inventory row:** 4 "ตั้งค่าต่อเจ้าของ" (photo before pack, use the brand box, special alerts) feeds 1.4 Packing and the FR-79 owner box mode and insert rules.
- **PRD location:** The per-owner settings UI is excluded (§8, §9.2). FR-13 defaults the owner level to "use warehouse value". FR-79 and FR-84 still reference "owner box mode" and "owner insert rules".
- **Suggested fix:** Pick one of two options:
  - (a) state that in P1 the owner box mode and insert rules are set at warehouse or SKU level (FR-12, FR-28), with no owner-level UI; or
  - (b) bring in a minimal per-owner packing-rule screen limited to box mode, inserts and photo-before-pack.

  Also add the owner-to-material matching rule config ("products-material-matching") as an FR under §4.4, because box suggestion (FR-79) has no defined input.

**G-5. Integration and carrier configuration screens absent (Medium).**
- **Inventory rows:** 4 "บริษัทขนส่ง" (enable carrier, account and API key, pickup times) and 4 "การเชื่อมต่อ" (connect the OMS and APIs; orders flow into Orders).
- **PRD location:** FR-14 covers pickup rounds only. FR-2 assumes a carrier-name mapping exists. FR-23 lists "connections or API keys" as critical changes. No FR creates or maintains any of these.
- **Suggested fix:** Add FRs in §4.1 or §4.2 for:
  - carrier accounts: carriers, accounts per shop, credentials, test connection;
  - a carrier-name mapping table (the OMS or marketplace carrier string mapped to a WMS carrier and account), with re-queue on map per FR-2;
  - OMS connection settings and generic-API key issue and revoke, with a connection health view and a link to the FR-4 failed-sends queue.

  UJ-6 (cutover) should include "connect Zimple OMS and carriers" as a step. Today the path jumps from users to "SKUs sync".

**G-6. Picking allocation and short-pick decisions incomplete (Medium).**
- **Inventory rows:** 1.3-1 pick rules "ล็อตไหนก่อน (FIFO/FEFO)"; 1.3-5 short pick "เลือกหาจาก location อื่น เติมสต็อก หรือแยก/รอออเดอร์" (the supervisor decides).
- **PRD location:** FR-52 and FR-64 specify FEFO only. FR-70 is a fully automatic flow that ends at "insufficient stock". There is no supervisor queue and no split or partial-ship option.
- **Suggested fix:**
  - Add FIFO by receipt date as the allocation for non-lot and non-expiry SKUs, and make the choice per SKU or rule in FR-61.
  - Add a supervisor short-pick queue FR listing open shorts and their stage in the FR-70 flow.
  - State explicitly whether *split or partial ship* is allowed. Partial ship probably needs OMS consent, because the WMS does not edit orders, so either exclude it or route it as a change request (FR-59).

**G-7. Stage overviews missing for Inbound and Packing (Medium-Low).**
- **Inventory rows:** 1.1-0 "ภาพรวมรับเข้า" (open at shift start, staff the dock) and 1.4-0 "ภาพรวมการแพ็ค" (queue, per-station and per-person output, move people to long queues).
- **PRD location:** Absent. Picking (FR-74), Handover (FR-90), Inventory (FR-55) and Returns (FR-104) each have one, and FR-109 is aggregate.
- **Suggested fix:**
  - Add an inbound overview FR (today's ASNs and arrivals, received, pending, overdue temporary receipts, awaiting putaway).
  - Add a packing overview FR (queue by station, packed vs pending by cut-off, per-station and per-packer rate, open exceptions).

  These are the "→ กดเข้าไป..." entry points in the inventory's journeys.

**G-8. Smaller dropped steps (Low).**
- **Pack exception → back to packing:** FR-82 has no resolution outcomes. Fix: list the outcomes (resume, re-pick child list, cancel-return, replace item).
- **Near-expiry → notify / hold:** Fix: add an FR-52 or FR-55 consequence for a near-expiry alert to Owner Care and an optional *hold lot* action (FR-105 already has "release held lot").
- **Ledger browse view:** Fix: make FR-42 cover a searchable ledger by SKU, lot, location, document and actor, with export.
- **Recurring cycle counts:** Fix: add a schedule option to FR-47.
- **Resend from order (1.2-3):** Fix: add to §8, "resend orders originate in the OMS".
- **Standalone VAS, all-warehouse stock view, admin forced data fix:** Fix: list these explicitly in §9.2 instead of in FR asides.
- **Company name and logo on printed documents, default document templates:** Fix: add one consequence to FR-78.

## 3. End-to-end flow continuity

The inventory's end-to-end flow is: setup → ASN → receive and putaway → order in and reserve → pick → pack → handover → (own fleet) → after-sales → billing. Mapped onto the PRD:

| Inventory stage | PRD | Continuity |
|---|---|---|
| Owner setup (SKU, box, shop connection, rates) | §4.4 via the OMS (FR-3); the shop connection lives in the OMS; rates are excluded | **Break:** WMS-side connection setup is undefined (G-5). |
| ASN | FR-3, FR-29, FR-30 | OK |
| Receive → VAS → putaway → sellable | FR-31–FR-39 | **Break:** the VAS gate (G-3). The unannounced-arrival → receipt conversion is undefined (G-1). |
| Order in → reserve | FR-1, FR-2, FR-41 | **Break** for kits (G-2). |
| Pick → (sort) → pack | FR-61–FR-83 | OK. The weak points are short-pick decisions (G-6) and the exception return path (G-8). |
| Pack → handover → shipped | FR-85–FR-91 | Strong. This is the most complete chain in the PRD. |
| Own-fleet transport | Excluded | OK |
| Returns / cancellations | FR-92–FR-104 | OK. The owner decision step is weak (G-1). |
| Claims / billing | Excluded; data captured in §4.16 | OK |

**User journeys.** UJ-1 to UJ-6 together trace the whole chain: inbound, pick, pack and cancel, handover, returns, cutover. Three role journeys from the inventory have no UJ:
- **Supervisor shift-start triage:** the overview → drill-in pattern that every inventory "ขั้น 0" row describes.
- **CS order lookup:** the CS JTBD in §2.1, "answer where-is-my-order in under a minute".
- **Owner Care decision handling:** the request loop.

Add short UJs for CS lookup and Owner Care decisions. They exercise FR-57, FR-80 and the G-1 queue.
