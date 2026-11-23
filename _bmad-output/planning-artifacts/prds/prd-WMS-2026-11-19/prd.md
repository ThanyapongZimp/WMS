---
title: "PRD: Zimple Fulfillment — Phase 1 (WMS Core)"
status: draft
created: 2026-11-19
updated: 2026-11-23
change-note: "2026-11-23 — FR-125/126 added; layout map moved from Later to Phase 1 (sprint-change-proposal-2026-11-23.md)"
inputs:
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/brief.md
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/addendum.md
  - artifact/Zimple Fulfillment Screens (Copy)/ (161 HTML mockups)
  - artifact/Zimple_Fulfillment_Feature_Inventory (1).docx
---

# PRD: Zimple Fulfillment — Phase 1 (WMS Core)

## 0. Document Purpose

This PRD defines **Phase 1** of Zimple Fulfillment. Phase 1 is the warehouse core that lets the company's own warehouse (the **pilot warehouse**) stop using JST entirely. The build team, UX (`bmad-ux`), architecture (`bmad-architecture`) and epic/story breakdown (`bmad-create-epics-and-stories`) should all work from it.

It builds on three existing inputs and does not duplicate them:
- the product brief, which covers the why, the segments and the phasing;
- 161 HTML mockups (141 warehouse-side, 20 owner-portal), which are the visual and interaction reference;
- the Feature Inventory, which maps each page to its user journey.

**How to read it:**
- Vocabulary is fixed in the §3 Glossary. Use those terms exactly.
- Features are grouped in §4, each with globally numbered FRs (FR-1 … FR-124) and testable consequences. FR-115 to FR-124 were added after review and sit inside their feature groups, so numbers are not sequential within a section.
- Provisional priority tiers (Must / Should / Defer) are in §9.3.
- Inferences are tagged `[ASSUMPTION]` inline and indexed in §12.
- The full rule-level detail behind each FR (thresholds, status labels, Thai UI wording, sample values from the mockups) lives in `addendum.md` and the two FR-candidate catalogues it references. Where the PRD and a catalogue disagree, the PRD wins.

Phase 2 (multi-owner 3PL: Client Portal, billing, claims, Owners) and Later items are **out of scope** here (§8). Phase 1 must still capture the data they will need (§4.16).

## 1. Vision

Zimple Fulfillment is a warehouse management system for Thai e-commerce fulfillment warehouses that ship Shopee, Lazada and TikTok Shop orders at about 30,000 orders a day, with campaign spikes such as 11.11. Warehouses today run on JST. JST costs a license fee, locks operators in, has a dated interface, and stops short of the full fulfillment cycle. For example, it splits parcels by carrier at handover with no sorted state before loading, and it cannot hold a cancelled order's goods for return to stock.

Phase 1 delivers the WMS core at JST parity, plus the two JST gaps above, across three surfaces: the warehouse web app, PDA screens for floor work, and packing/handover stations bound to printers, scales and cameras. Every unit of stock is traceable through an immutable ledger, and every packed order has evidence: scans, weight and video. Orders, SKUs and ASNs come from an OMS. For the pilot that OMS is **Zimple OMS**, so the pilot leaves JST for both order management and warehouse work.

Pricing will mirror JST and there is no technical moat, so Phase 1 must win on two things alone: a modern UX that floor staff learn faster, and closing the gaps JST leaves to Excel, LINE and paper. Phase 1 is also the foundation for the larger bet: the default fulfillment platform for Thai e-commerce warehouses, with a goal of taking 50% of warehouses that run JST today.

## 2. Target User

### 2.1 Jobs To Be Done

- **Warehouse manager:** "Run the day's volume so every order makes its carrier wave. Know before a wave is missed, not after."
- **Supervisor:** "See where work is stuck: receiving, picking, packing, handover. Unblock it with the authority I have, and leave an audit trail."
- **Floor staff** (receiver, putaway, picker, sorter, packer, handover, returns, stock): "Scan, get a clear yes or no, move on. Make mistakes impossible to commit, not something to catch later."
- **New or day-labour floor staff:** "Be productive on my first shift without learning a complicated system."
- **CS / office:** "Answer 'where is this order?' and 'what happened to this parcel?' with evidence (timeline, video, manifest) in under a minute."
- **Admin:** "Set the warehouse up once (locations, devices, rules, roles) and change rules safely, with effective dates and history."
- **Company (as goods owner):** "Trust that stock in the WMS equals stock on the shelf and in the OMS, so marketplaces never oversell."

### 2.2 Non-Users (Phase 1)

- **Owners' staff at 3PL clients.** The Client Portal is Phase 2. The pilot is a brand-owned warehouse whose only owner is the company itself.
- **Drivers of own-fleet vehicles.** The driver app and TMS are Later.
- **Purchasing, HR/workforce planners.** Purchasing and workforce planning are Later add-ons.
- **Accounting users for warehouse billing.** 3PL billing is Phase 2. Accounting may read reports.

### 2.3 Key User Journeys

The protagonists are illustrative `[ASSUMPTION]`. They stand for the roles in the brief, not interviewed users.

- **UJ-1. Somchai receives a truck that doesn't match its notice.**
  - **Persona + context:** Somchai is an inbound receiver at the pilot warehouse, working a desktop receiving station with a camera.
  - **Entry state:** A truck arrives at 10:20. The ASN from Zimple OMS says 30 cartons.
  - **Path:**
    1. He opens a temporary receipt for the vehicle, counts 28 outer cartons, photographs the shortfall and takes the sender's on-screen signature.
    2. He scans the ASN to open receiving and scans one item to select the SKU.
    3. He counts by carton pattern and enters the lot and expiry. The system computes remaining shelf life.
    4. One lot is below the minimum shelf life, so the screen asks for a supervisor confirmation.
    5. He prints carton QR labels and closes the pallet. Closing the pallet creates a putaway task.
  - **Climax:** Putaway staff scan the suggested location on a PDA. Stock moves from awaiting putaway to sellable, and orders waiting for that SKU are reserved immediately.
  - **Resolution:** The receipt closes with a short/damaged summary that goes back to Zimple OMS.
  - **Edge case:** A carton of another owner's SKU is scanned. The red screen rejects it and it is set aside.
- **UJ-2. Nok picks a batch on 11.11 when a location comes up short.**
  - **Persona + context:** Nok is a picker on her second week, using a PDA.
  - **Path:**
    1. She claims a pick list from the shared queue.
    2. She scans her cart, then follows the route on her PDA, scanning location and items.
  - **Climax:** At stop 14 the location holds 2 units, not 5. She taps "short". The system offers an alternative location with an unallocated lot. When none fits, it raises an urgent replenishment and moves the line to the end of her list.
  - **Resolution:** The replenishment completes and the line flips to "pickable". She finishes and drops the cart at staging. No stock was auto-adjusted.
  - **Edge case:** Nothing is found anywhere. An urgent blind count is queued and the order shows "insufficient stock" until a supervisor approves the variance.
- **UJ-3. Ploy packs an order that was cancelled while she worked.**
  - **Persona + context:** Ploy is a packer at station PS-04, with a scanner, scale, label printer and camera.
  - **Path:**
    1. She scans the pick list QR. The job opens and video starts.
    2. The system suggests a box and she scans it.
    3. She scans every piece. The weight is checked against tolerance.
  - **Climax:** Right before the label prints, the system re-checks cancellation and finds the buyer cancelled 40 seconds ago. Label printing is locked. A "cancelled during packing" exception is raised and the goods go to the cancelled-goods location.
  - **Resolution:** A cancel-return job exists. The video, linked to the order, shows exactly what happened.
  - **Edge case:** The scale reads 6% over expected. The box is held for supervisor inspection.
- **UJ-4. Ann closes the day at handover.**
  - **Persona + context:** Ann is the handover lead for Flash, J&T and SPX waves.
  - **Path:**
    1. Her team sorts packed parcels into carrier containers. Each scan checks packed, correct carrier and not cancelled. This is the **sorted** state JST lacks.
    2. A cancelled parcel turns the screen red and is pulled to the cancelled-goods location.
    3. When the Flash truck arrives she registers the vehicle and scans containers (not parcels) onto it.
    4. The rider signs on the PDA, and the manifest splits by shop account.
  - **Climax:** Confirming handover deducts stock, and the carrier's receipt is reconciled per parcel.
  - **Resolution:** At 22:00 the day-close checklist shows "2 items left": one unclaimed not-found parcel and one carrier-refused parcel not inspected. She resolves both and closes the day. Leftover parcels carry over with no new records.
- **UJ-5. Dao processes a carrier's return drop-off.**
  - **Persona + context:** Dao is a returns clerk at a camera station.
  - **Path:**
    1. J&T drops 40 parcels. She opens one return receipt for J&T and scans every label. A Flash label is rejected.
    2. One parcel matches no handed-over order and goes to return quarantine with an automatic problem report.
    3. She inspects each unit: good, damaged or wrong SKU. Photos are required for anything not good.
  - **Climax:** Good units become sellable when she scans them into a location.
  - **Resolution:** Damaged units are in damaged stock. A problem report has gone to OMS after-sales as a decision case.
- **UJ-6. Krit cuts the pilot warehouse over from JST.**
  - **Persona + context:** Krit is the admin and warehouse manager.
  - **Path:**
    1. He bulk-imports zones and locations.
    2. He registers PDAs, stations and printers, and tests each.
    3. He creates users and prints badge QRs.
    4. SKUs sync from Zimple OMS. He imports opening balances by owner × SKU × lot × location, which needs approval.
    5. He runs a full blind count and compares the ledger total with the import.
  - **Climax:** Stock is pushed to Zimple OMS, and the first live wave runs on Zimple while JST is switched off.
  - **Resolution:** The daily 06:00 reconciliation shows WMS = OMS.

## 3. Glossary

Downstream documents must use these terms exactly. Thai UI labels are given in parentheses where floor staff will see them.

**Parties and systems**
- **OMS** — The order management system that owns orders, SKU master, kits and ASNs. In the pilot this is Zimple OMS. The WMS consumes OMS data and never creates, edits or cancels orders.
- **Owner** — The legal owner of goods (เจ้าของสินค้า). Every stock record, document and SKU belongs to one owner. In the pilot there is one owner, the company.
- **Decision case** — A request for an owner-side decision (disposition of damaged or held goods, over-receipt or off-list goods, problem reports, unmatched returns). The WMS sends it with evidence to OMS after-sales, where the decision is made, and executes the decision that comes back. The WMS never makes owner-side decisions itself.

**Warehouse structure and equipment**
- **Warehouse → Zone → Location** — The physical hierarchy. A location has a type: pick, storage, receiving, staging, handover, returns, awaiting-restock or damaged/quarantine.
- **Container** — A reusable carrier with one permanent QR: pallet PL, tote TT, bag BG, cage CG, cart C20/30/40, flat cart FC, put wall PW, damaged tote DMG-T. A container always sits in a location.
- **Station** — A packing, receiving, returns or handover desk with its bound devices (PC, scanner, printers, scale, camera). A station receives no work until its devices are bound and tested.

**Stock**
- **Stock section** — One of three: normal, returns, damaged/quarantine. Only normal stock can be reserved.
- **Held lot** — A lot blocked from allocation by a hold or recall (FR-115).
- **ATP (available to promise)** — Normal stock minus reserved, minus held lots, minus lots below the effective minimum remaining shelf life. This is also the *available-to-sell* figure pushed to the OMS.
- **Ledger line (SL)** — An immutable record of any stock quantity or location change. It is corrected only by an approved reversal or a new move, never edited.
- **Move (MV)** — A task that relocates stock: putaway, replenishment, ad-hoc move or material issue.
- **Replenishment** — A move from reserve to a pick location driven by min/max. It is *urgent* when triggered by a short pick.
- **Count round (CC)** — A planned count, blind by default. An **urgent count** is a system-generated count of one location.
- **Misplacement pair** — A shortage at one location plus a surplus of the same SKU and lot elsewhere. It is resolved by a move, not an adjustment.
- **FEFO** — First-expired, first-out allocation.
- **Minimum remaining shelf life** — The threshold below which a lot is not received or shipped without an exception. The strictest level wins.
- **Settings precedence** — System → company → warehouse → owner → SKU. The most specific value wins.

**Inbound**
- **ASN** — Advance notice of an inbound delivery (`AS-YYMMDD-NNN`). It arrives from the OMS and links one or more owner item lists.
- **Temporary receipt (TM)** — An arrival record for one vehicle round: outer count, condition, signature. It does not create stock.
- **Receipt** — The closed result of receiving against an ASN, with a short/over/damaged summary.
- **Putaway** — Placing received goods into a location. It is the moment stock becomes sellable.
- **Quarantine** — Stock held from sale pending a decision (over-receipt, off-list goods, unmatched returns).

**Outbound**
- **Pick list (PK)** — The unit of picking work. Its number is shared by its pack job and prep sheet. A re-pick creates a child `PK-…-1`.
- **Draft wave (WV)** — An editable grouping of orders into pick lists before confirmation.
- **Carrier wave** — A carrier's scheduled pickup round with its **pack cut-off**, the latest pack-complete time.
- **Missed wave** — An order rolled to the next carrier wave after its truck left.
- **Short pick** — The required quantity is not found at the allocated location.
- **Pack job** — The packing work for one pick list.
- **Pack video** — A per-order station recording that must show the order's label.
- **Paired material** — Packaging material consumed automatically with a box or SKU when the box closes.
- **Sorted** — The pre-handover state of a parcel placed in a carrier/wave container after the packed, carrier and cancellation checks.
- **Handover confirm** — The point at which stock is deducted (shipped).
- **Manifest (MF)** — The signed handover record per carrier wave or pickup appointment. It has a child manifest per carrier account.
- **Day close** — The checklist-gated end-of-day snapshot of handover. Unhanded parcels **carry over** with no new records.

**Cancellations and returns**
- **Cancellation stage** — Before pick, after pick, after pack or after handover. The stage decides the follow-up work.
- **Cancelled-goods location (CXL)** — The hold location and unbox table for cancelled goods.
- **Cancel-return job** — The work of returning goods of an order cancelled before it left the warehouse.
- **Expected return** — A system-created record anticipating a returning parcel.
- **Return receipt (RT)** — One carrier's return drop-off session.
- **Problem report (RP)** — An evidence-backed issue on a received return or parcel. When the return rule matrix requires an owner decision, it becomes a decision case.

**Control engines**
- **Approval** — A configurable one- or two-step sign-off. Money-related approvals can never be self-approved.
- **Special permission** — A sensitive right outside the page × action matrix, such as viewing buyer PII or ad-hoc moves.

## 4. Features

Actors: Admin (including the customer admin), Warehouse Manager, Supervisor, Planner, CS, Office user (any web user), Receiver, Putaway staff, Picker, Sorter, Prep staff, Packer, Handover staff, Returns staff, Stock staff (including counters), System. Document numbers use `PREFIX-YYMMDD-seq` with a Gregorian year.

### 4.1 OMS & Carrier Integration

**Description:** The WMS is downstream of an OMS. Zimple OMS is the pilot's OMS and the critical Phase 1 integration. The WMS also offers a generic API so another OMS can connect. Ready-made connectors to JST, Zort and similar OMSs are post-pilot `[ASSUMPTION]`.

Marketplace orders arrive with the carrier and label the marketplace issued, obtained through the OMS. Only non-marketplace orders (LINE, web, B2B) call carriers (Flash, KEX, J&T) directly for tracking numbers and labels. The WMS pushes status, tracking, stock and inbound results back to the OMS. Realizes UJ-1, UJ-3, UJ-6.

#### FR-1: Order intake from OMS
System can ingest orders from the connected OMS and reserve stock on receipt.

**Consequences:**
- Each order gets an `SO-YYMMDD-NNNNN` number and keeps channel, channel order numbers, external reference, owner, carrier, cut-off, recipient and lines.
- A duplicate submission with the same source reference creates no second order.
- No warehouse-side order creation or file import path exists.
- A merged shipment shows every channel order number it contains.

#### FR-2: Carrier data readiness
System can hold an order in *awaiting carrier data* until it has a tracking number and label, and exclude it from pick-list creation.

**Consequences:**
- Carrier data is re-pulled every 5 minutes. After 2 hours without data, the owner is notified through the OMS.
- For a non-marketplace order, the system requests the tracking number and label from the carrier API on order entry.
- An unmapped carrier name holds the order and raises an alert. The system never guesses a carrier. The order re-queues once the carrier is mapped.

#### FR-3: SKU, kit and ASN sync
System can sync SKU master data, kit BOMs and ASNs from the OMS and show OMS-owned fields as read-only.

**Consequences:**
- Changing an OMS-owned field (code, name, cost, BOM, ASN lines) in the WMS is not possible.
- A SKU retired in the OMS becomes "use up before retire", not deleted.
- Cost syncs with effective-date history and is visible only with the special permission *view product cost*.

#### FR-4: Outbound sync to OMS
System can push order status, tracking numbers, available-to-sell stock and inbound receipt results to the OMS.

**Consequences:**
- Available-to-sell pushed to the OMS equals ATP (FR-41).
- A failed send is retried automatically. After the retries are exhausted it appears in a failed-sends queue with the error.
- An admin can force-push WMS stock to the OMS. This is logged and needs no approval.

#### FR-5: Cancellation and change-request intake
System can ingest OMS cancellations and owner change requests at any stage and stop affected work (see §4.11).

**Consequences:**
- Each cancellation records its stage and the actor who cancelled (buyer, platform or owner).
- A change request removes the order from pick-list drafts before picking starts. After picking starts, it stops the order at the next scan.

#### FR-6: Post-handover tracking events
System can record post-handover milestones (carrier received, delivered, failed delivery).

**Consequences:**
- Marketplace orders get these events from the OMS. Non-marketplace orders get them from the carrier API `[ASSUMPTION]`.
- A failed-delivery event creates an expected return (FR-98).

#### FR-7: Daily reconciliation
System can produce a daily reconciliation at 06:00 comparing ledger balance with the sum of ledger lines, and WMS stock with OMS stock.

**Consequences:**
- Any difference raises a notification that cannot be turned off.
- The report lists each SKU × owner with a difference.

**Notes:** Rate limits and peak behaviour of the Zimple OMS API are an architecture dependency (§7).

#### FR-119: Connection settings
Admin can configure the OMS connection, carrier accounts and credentials, the carrier-name mapping table, and API keys and webhooks for the generic API.

**Consequences:**
- A connection can be tested before it is enabled, and its last-sync status is visible.
- An unmapped carrier name from the OMS appears in the mapping table until mapped (FR-2).
- Creating or revoking an API key, and changing credentials, needs customer-admin approval when Zimple support is acting (FR-23), and is always logged.

#### FR-121: Decision cases to OMS after-sales
System can send decision cases (with photos, video and quantities) to OMS after-sales, receive the decision, and turn it into warehouse work.

**Consequences:**
- Case sources: over-receipt and off-list goods (FR-36), damaged or held stock (FR-54), unmatched returns (FR-100) and problem reports needing an owner decision (FR-103).
- A returned decision creates the matching task: dispose, return to owner, restock, or add to stock.
- A case waiting more than its configured time raises an alert. Goods stay held, never disposed automatically.
- Depends on Zimple OMS after-sales support (Q-3).

### 4.2 Warehouse Setup

**Description:** Admins model the physical warehouse and its equipment once, then change it safely. Rules are configurable per warehouse, with effective dates and history. Unset rules fall back to system defaults, so a warehouse can start working immediately. Realizes UJ-6.

#### FR-8: Warehouses, zones and locations
Admin can create warehouses (3-letter code), zones (room type, capacity, walk-order pattern) and locations, individually or in bulk.

**Consequences:**
- A location has one of 8 types, a zone, a walk sequence, a sellable flag, a capacity (m³ and kg) and a mixing policy.
- The walk sequence is the fallback stop order for locations not bound to a published layout (FR-125).
- A *disabled* location blocks putaway and moves. A location *locked for counting* is set only by a count.
- Location QR labels print in bulk. One SKU may occupy many locations.
- A warehouse can be disabled only when it holds zero stock, and only with approval.

#### FR-9: Doors and staging points
Admin can turn on doors and staging points bound to doors. This is off by default.

**Consequences:**
- Doors hold no stock. Staging points are stock locations.
- With the feature off, handover and inbound flows work without door assignment.

#### FR-10: Containers
Admin can register container types with code prefix, count, stages used and capacity, and print their labels.

**Consequences:**
- Each container has one permanent QR, unique within the warehouse.
- Live usage shows which pick list or carrier wave holds each container.
- A cart left with residue from a cancelled list shows *needs clearing* and cannot be reused until cleared.

#### FR-125: Warehouse layout map editor
Admin can draw a warehouse layout to scale (zone areas, racks, aisles, walls and obstacles, doors and docks, pick start and end points, text labels), bind locations to rack slots, and publish it.

**Consequences:**
- One layout per warehouse, with a draft and a published version. Editing the draft never affects live work. Publishing applies to pick lists created afterwards; lists already created keep their stop order.
- Racks are drawn as rows of bays × levels. Locations bind to slots automatically by code pattern (for example aisle A, rows 01–12, levels 01–04) or one at a time. A location binds to at most one slot.
- Aisles form the walkable network. Every rack face must touch an aisle and every aisle must connect to a pick start point before publish.
- Publish validation blocks unreachable racks and a missing start point, and warns on pick and storage locations that are not bound (they fall back to walk sequence).
- Location status (disabled, locked for counting) shows on the layout.
- Every layout change and publish is recorded in the activity log (FR-107).
- Drawing doors does not turn on door assignment (FR-9 stays Defer).

#### FR-126: Layout map view
Warehouse Manager can view the published layout coloured by space used (m³ and kg against capacity) per location, rack and zone, and drill down from a slot to its stock.

**Consequences:**
- Filters include zone, location type and status.
- Status uses the five status tones only; occupancy uses a single sequential scale with a legend.

#### FR-11: Devices and stations
Admin can register devices (PC, USB scanner, PDA, printer, scale, camera), bind them to stations or work points, and test them.

**Consequences:**
- A PC binds to a station with a 6-digit code and flags missing peripherals on boot.
- A station whose devices are unbound, untested or faulted receives no work.
- Device status shows online, offline for N minutes, ready, out of paper, needs fixing, or untested.
- With *restrict work by work point* on, a device at a work point opens only that department's work.

#### FR-12: Warehouse rules
Admin or Warehouse Manager can configure rules per warehouse, grouped by stage: inbound, picking, packing, inventory, handover, returns and cancel-to-restock.

**Consequences:**
- Every change has an effective date and history, and shows the level the value comes from.
- The settings hub lists *must set before use* blockers and *still on system default* rules.
- A filter shows only rules that differ from the default.
- Rules that only serve billing, 3PL or excluded add-ons are hidden in Phase 1.

#### FR-13: Settings precedence
System can resolve every setting by precedence (system → company → warehouse → owner → SKU).

**Consequences:**
- The most specific value wins, except shelf-life thresholds, where the strictest wins.
- Rules marked *warehouse-wide* cannot be overridden below warehouse level.
- The owner level exists in the data model with no Phase 1 UI. Owner-level values default to "use warehouse value" `[ASSUMPTION]`.

#### FR-14: Carrier pickup rounds
Admin can configure carrier pickup rounds per warehouse: times, pack cut-off, days, handover mode, door and effective date.

**Consequences:**
- A carrier with no pickup round cannot ship.
- Pack cut-off = pickup time − X minutes (a setting).
- Campaign days can add extra rounds.
- Handover modes: container per wave, per order (rider), by job size, by vehicle trip.

#### FR-15: Document numbering
Admin can set document prefixes (2–4 letters, unique) and digit counts.

**Consequences:**
- A change affects new records only.
- The digit count can increase but never decrease.
- A warning appears when the digit count is too small for peak volume.

#### FR-16: Warehouse calendar
Admin can set each warehouse's working calendar and holidays. Stage SLAs and *overdue* alerts use it.

**Out of Scope:** shift planning and workforce calculation (Later).

#### FR-122: Web fallback without PDAs
Office or floor staff can run every floor flow on the web for a warehouse that has no PDAs: receiving, putaway, moves, counting, picking, sorting, handover and returns.

**Consequences:**
- With the rule *confirm by paper task* on, the system prints task sheets with QR codes (pick lists, move sheets, count sheets), and staff confirm the results on the web.
- Every control that applies on a PDA (location confirm, cancellation check, quantity limits, approvals) also applies to web confirmation.
- Ledger lines record the device as web, and the confirming user as the actor.

### 4.3 Users, Access & Sign-in

**Description:** Office staff sign in on the web. Floor staff sign in on PDAs by scanning a badge. Access is a role-based page × action matrix plus special permissions, scoped by warehouse and work point. Day-labour cards let temporary workers start on day one. Realizes UJ-2, UJ-6.

#### FR-17: Users
Admin can create users with roles (optionally temporary, with expiry), warehouse scope and sign-in methods (QR badge, username + password, optional OTP).

**Consequences:**
- A suspended user cannot sign in.
- The user count is capped by the license package.

#### FR-18: Roles
Admin can create, copy, edit and delete roles using a page × action matrix (view, do, use on PDA, create/edit, cancel/delete, approve, print, export), with zone, work-point and data scope.

**Consequences:**
- Dependent permissions are ticked automatically. For example, picking requires viewing orders and viewing inventory.
- A role that can both count and approve adjustments is flagged as a segregation-of-duties risk.
- Changes apply at the user's next sign-in and are logged.
- Default roles ship with the product and include Warehouse Head and Handover Lead, because approvals reference them `[ASSUMPTION]`. *System Administrator* is locked with all rights.

#### FR-19: Special permissions
Admin can grant special permissions outside the matrix: view product cost, act on behalf of owner, view or share video, approve an OMS cancellation after work started, day close, ad-hoc move, supervisor override when a scan fails, grant a temporary role (no more than the granter's own rights), and view buyer PII.

**Consequences:**
- Without *view buyer PII*, recipient phone and address are masked on every screen and export.

#### FR-20: Web sign-in
Office user can sign in on the web with email and password, plus optional OTP when the company enables MFA, and pick a warehouse.

**Consequences:**
- 3 failed attempts lock the account for about 15 minutes.
- A reset link is valid for 30 minutes. The reset response is identical whether or not the email exists.
- An idle session times out. A password change signs out other sessions.
- Zimple support staff always need MFA.

#### FR-21: PDA sign-in
Floor staff can sign in on a PDA by scanning a badge QR, with an optional 4-digit PIN.

**Consequences:**
- One active PDA session per user.
- An unknown badge shows a red screen, sounds a beep and sends a notification.
- A role with no PDA page cannot sign in.
- An idle PDA locks and unlocks when the user rescans their own badge.
- The PDA home shows only permitted task tiles, with live counters.

#### FR-22: Day-labour cards
Supervisor can issue reusable day-labour cards with name, phone, agency, shift, allowed functions and an optional PIN.

**Consequences:**
- A card is auto-returned at shift end. Card status: in use, not returned, free, lost.
- The phone number is kept 90 days and is visible only with a special permission.

#### FR-23: Support access
Customer admin can grant Zimple support time-boxed, scoped access.

**Consequences:**
- Critical changes need customer-admin approval: stock, roles, numbering, connections or API keys, disabling a SKU.
- A banner shows while access is active, and every support action is logged.

### 4.4 Products & Packaging Materials

**Description:** SKU master data comes from the OMS. The warehouse owns only what it measures and controls: dimensions and weight, warehouse photos and tags, units and barcodes the warehouse accepts, and lot, expiry and serial tracking. Packaging and materials are real stock items. They are received, counted and deducted on use. Realizes UJ-1, UJ-3.

#### FR-24: Warehouse-measured attributes
Warehouse staff can record measured dimensions and weight, warehouse photos and internal tags on a SKU.

**Consequences:**
- The SKU shows the owner-entered, warehouse-measured and used values. The warehouse-measured value wins from its measurement date.
- Every change is logged.
- The SKU list shows a count of data issues: missing dimensions, missing barcode, or a unit the warehouse does not accept.

#### FR-25: Units and barcodes
System can resolve units of measure and barcodes per SKU.

**Consequences:**
- Scanning a unit's barcode counts that unit's quantity in the base unit.
- A unit's quantity cannot change after first use. A new unit must be added instead.
- A barcode is unique within an owner. Extra barcodes are allowed only when the multi-barcode rule is on.
- A unit can be marked *sell by carton only* (do not open).
- A SKU with no barcode gets a printable system QR derived from its code.

#### FR-26: Lot, expiry and serial tracking
Authorized user can set per-SKU tracking: lot control, expiry basis (manufacture date + shelf life), minimum remaining shelf life, and serial control (none, scan at pack, scan from receiving).

**Consequences:**
- *Scan from receiving* also enforces serial scans at move and count, so every serial's location is known.
- A SKU the OMS flags as warrantied by serial must be serial-controlled.
- A user can trace a serial to its current location or order and see its movement history.

#### FR-27: Kits
System can show kit BOMs from the OMS with buildable quantity, and execute assemble or unbundle orders from the OMS.

**Consequences:**
- Each run posts one SKU-conversion movement (−components / +kit, or the reverse).
- A warehouse-initiated assembly requires approval.

#### FR-28: Packaging and material items
Authorized user can register packaging and material items with usable dimensions, weight, maximum load, deduction unit, storage bundle and paired materials. Each warehouse sets a reorder point.

**Consequences:**
- Packaging items are received, put away, counted and ledgered like products.
- An owner box is not suggested at packing until its usable size, storage size and paired materials are set.
- Consumables used inside the warehouse (film, gloves) are deducted when issued (FR-45).

### 4.5 Inbound

**Description:** ASNs arrive from the OMS. Each vehicle arrival opens a temporary receipt, whether or not an ASN exists. Receivers count by carton pattern at a camera station or on a PDA, capturing lot, expiry and serials. Exceptions do not stop the job: excess, off-list and questionable goods go to quarantine and a decision case is sent to the OMS. Stock becomes sellable only when putaway is confirmed by scanning the location. Realizes UJ-1.

#### FR-29: Expected-arrival queue
Receiver or Supervisor can see ASNs in a queue ordered overdue first, then by scheduled date and slot.

**Consequences:**
- Owner item-list lines are read-only.
- Item lists can still be attached up to the moment of receiving.

#### FR-30: Warehouse-created ASN
Office user can create an ASN on the owner's behalf, or for the warehouse's own goods, when the OMS sent none.

**Consequences:**
- The ASN is marked *warehouse-created* in the audit log.
- A full time slot stays selectable but raises an alert.

#### FR-31: Temporary receipt
Receiver can open a temporary receipt for each vehicle arrival.

**Consequences:**
- It records declared vs counted outer packages, photos, weight (if a scale exists), vehicle data and the sender's on-screen signature.
- An arrival with no ASN, or before its ASN's date, requires a reason and is tagged *unannounced*.
- An outer-count shortfall is recorded and the owner is notified through the OMS.
- A new temporary receipt on the same ASN cannot open until the previous round is confirmed.
- A temporary receipt left open more than 2 hours raises an alert.

#### FR-32: Unmatched parcels
Receiver can log a parcel whose tracking number matches no ASN, and hold it at parcel staging until it is matched.

**Consequences:**
- A held parcel is not stock until it is matched and received.

#### FR-33: Counting and capture
Receiver can open receiving by scanning an ASN or item list, and count each SKU by carton pattern (cartons × pieces + loose + damaged).

**Consequences:**
- Scanning one item selects the SKU but does not add to the count.
- The count method follows a rule: all cartons, or N random cartons per SKU-lot with a full count on any mismatch.
- Lot and expiry are required before putaway for lot-controlled SKUs. Expiry is computed from manufacture date + shelf life.
- Serial-controlled SKUs require every serial to be scanned. A duplicate serial is rejected.
- A carton whose dimensions ÷ pieces mismatch the unit dimensions is flagged for re-measuring.
- The first carton of a new SKU is measured before putaway. Scale values fill in automatically, and typed values are logged as manual.

#### FR-34: Labels and containers
Receiver can print carton QR labels and load cartons onto containers.

**Consequences:**
- Closing a container creates a putaway task immediately.
- A reprint keeps the carton number and requires a reason.
- All open pallets must be closed before the receipt closes.

#### FR-35: Receiving evidence
System can record evidence for every receipt.

**Consequences:**
- A desktop station with a camera records video. PDA receiving attaches photos.
- A photo is required for any short, over, damaged or wrong-SKU line.
- A warehouse without PDAs can run the whole flow on the web.

#### FR-36: Receiving exceptions
System can route exceptions without stopping the receiving job.

**Consequences:**
- **Over-receipt** beyond the tolerance (default 0%): the excess is received into quarantine, awaiting confirmation, and is not sellable.
- **Another owner's SKU:** red screen and rejection.
- **Off-list SKU of the same owner:** held for a decision.
- **Unknown barcode:** rejected, or bound as an extra barcode after approval when the multi-barcode rule is on.
- **Remaining shelf life below the minimum:** accepted only with supervisor confirmation.
- **Damaged units:** posted to the damaged section with cause and photos.

#### FR-37: Suggested putaway
System can suggest a putaway location for each container or carton, using room type, the SKU's existing locations and free capacity.

**Consequences:**
- The putaway queue runs urgent first (orders waiting for the stock), then temperature-controlled, then oldest.

#### FR-38: Putaway confirm
Putaway staff can confirm putaway by scanning the location on a PDA.

**Consequences:**
- A location other than the suggested one requires a reason.
- Wrong room type, overweight, a disabled location or a location locked for counting is blocked.
- On confirm, stock becomes sellable immediately. Waiting orders are reserved in their original order, and orders held as out of stock are released.
- Stock awaiting putaway for more than 2 hours raises an alert.

#### FR-39: Receipt close
Supervisor can close a receipt after reviewing actual vs ASN.

**Consequences:**
- Multi-round receiving is allowed.
- On completion, a short/over/damaged summary is produced.
- A receipt with no response auto-closes after 3 days.
- Early close of an ASN requires approval.
- The result is sent to the OMS (FR-4).
- Closed receipts can be searched and exported in summary or SKU × lot detail.

### 4.6 Inventory Control

**Description:** Stock is held per owner × SKU × lot × location, split into normal, returns and damaged sections. Every change is an immutable ledger line, and there is no manual stock-adjust function anywhere. Quantities change only through operational scans, approved count adjustments, moves, or approved reversals. Counts are blind by default, and a short pick triggers an urgent count. This is how the system makes "WMS = shelf" credible. Realizes UJ-2, UJ-6.

#### FR-40: Stock views
User can view stock by SKU (with lot and location drill-down and in-process rows), by location (with capacity used, last scan and lock state), and by lot/expiry (with remaining days and receipt trace).

**Consequences:**
- Filters include normal, awaiting putaway, returns, damaged, below reorder point, near expiry and out of stock.
- Exports respect the active filters.
- The lot/expiry view appears only when at least one lot-controlled SKU exists.

#### FR-41: Stock buckets
System can compute on-hand, ATP and available-to-sell per SKU, lot and location.

**Consequences:**
- On-hand = normal + returns + damaged/quarantine. It excludes stock that is received but not put away.
- ATP = normal − reserved − held lots − lots below the effective minimum remaining shelf life. Available-to-sell = ATP.
- Reserved includes every order not yet handed over, wherever its goods are (pick location, cart, staging, packing, handover).
- Reservation draws only from normal stock.
- Stock stays on-hand until handover confirm.

#### FR-42: Immutable stock ledger
System can record every quantity or location change as an immutable ledger line.

**Consequences:**
- Each line records timestamp, type, document reference, from → to location, lot, ± quantity, running balance, actor and device.
- An internal move writes two lines and leaves the total unchanged. A line is written only after the destination is scanned.
- Lines cannot be edited or deleted.

#### FR-43: Ledger reversal
Authorized user can request reversal of a receive, handover or return-receipt ledger line.

**Consequences:**
- Reversal creates an opposite line referencing the original, with quantity ≤ the original.
- A reason is mandatory and approval is always required.
- A wrong move is corrected by a new move, not by reversal.

#### FR-44: Moves
Stock staff can move stock on a PDA or the web with a 3-scan sequence: source → product and quantity → destination.

**Consequences:**
- Scanning a pallet QR moves the whole pallet.
- Space, weight, room type, lot mixing and *no mixed SKUs* are checked.
- A user with the *ad-hoc move* permission can move stock without a task, but must give a reason.
- A warehouse without PDAs can print move sheets and confirm the moves on the web.

#### FR-45: Material issue
User with the *issue for use* permission can issue warehouse-owned materials or equipment.

**Consequences:**
- The quantity is deducted immediately.
- Issuing more than 10 units at once requires approval. The threshold is configurable.

#### FR-46: Replenishment
System can generate replenishment tasks from pick-location min/max per SKU on a schedule, every N minutes (default 60).

**Consequences:**
- Reserve lots are chosen FEFO.
- An urgent replenishment (waiting orders exceed the shelf quantity, or a short pick occurred) goes to the top of the PDA queue with a sound and prints at the zone printer. On completion the picker is notified.
- A stuck move task raises an alert after 30 minutes.

#### FR-47: Count rounds
Supervisor can create a count round covering the whole warehouse, a zone or row, a SKU list or a velocity class.

**Consequences:**
- Options: counters, batch size, blind (default) or visible, include empty locations, freeze inbound/outbound.
- A whole-warehouse round must be created at least 3 days ahead.
- Locations with pending picks are counted after picking.

#### FR-48: PDA counting
Counter can count on a PDA by scanning location, product and serials.

**Consequences:**
- Counting is blind by default. There is never a "confirm system quantity" button.
- Counting locks only the location being counted.
- Results scanned offline are queued and sent when the signal returns.

#### FR-49: Count resolution
System can resolve count results before any adjustment.

**Consequences:**
- A match auto-closes the line.
- A mismatch gets one recount by the same counter, then goes to approval as a variance.
- A misplacement pair is fixed by a move and is not counted as loss.
- Approval tiers follow the approvals engine (FR-105). The counter can never approve their own variance.
- An approved variance posts a ledger adjustment naming both the counter and the approver.

#### FR-50: Urgent count
System can create an urgent single-location blind count when a picker reports a short with no alternative, or answers "not empty" after picking the last unit.

**Consequences:**
- The count goes to the top of the stock PDA queue, auto-assigned with a deadline.
- If the stock is found, the location is corrected. If not, the variance goes to approval and the order shows *insufficient stock*.

#### FR-51: Inventory accuracy
System can compute inventory accuracy (matching locations ÷ blind-counted locations over 30 days) and variance value at cost.

#### FR-52: FEFO allocation
System can allocate FEFO: the earliest-expiry lot first, then pick location before reserve.

**Consequences:**
- A lot below the effective minimum remaining shelf life is not allocated unless the order names that lot.
- Expired stock moves to the damaged section and is excluded from ATP.

#### FR-53: Damaged and held stock
Staff can move a unit into damaged/quarantine by scanning the *damaged* QR, then the item, then a damaged tote or location.

**Consequences:**
- The cause, the origin (receiving, storage, returns, cancel-return) and photos are recorded.
- Damaged locations are never picked and are excluded from ATP.

#### FR-54: Disposition
System can send a decision case for each damaged or held item to OMS after-sales, and staff can execute the decision that comes back: dispose (with photo evidence), return to the owner or supplier, use again, or add excess to stock.

**Consequences:**
- The WMS page for damaged and held stock is read-only for the decision itself. Staff only execute it.
- Executing a disposal still requires warehouse approval.
- An item older than 30 days without a decision raises an alert that repeats every 7 days. Nothing is disposed automatically.

#### FR-55: Inventory dashboard
Warehouse Manager can view an inventory dashboard: accuracy vs target, replenishment needs, variances awaiting approval, near-expiry lots, space usage and overdue backlog.

#### FR-115: Lot hold and recall
Supervisor can put a lot on hold or recall (all locations, or chosen ones) with a reason, and release it with approval.

**Consequences:**
- A held lot is excluded from ATP and allocation immediately. Pick lists already allocated to it are flagged for re-allocation.
- Released lots return to ATP only after approval (FR-105).
- The lot/expiry view shows held lots and the reason.

#### FR-120: Kit explosion
System can explode a kit order line into its component SKUs at reservation and allocation, using the OMS BOM version current at order intake.

**Consequences:**
- Reservation and allocation work on components. Stock is deducted on components at handover.
- A kit's available-to-sell pushed to the OMS = the minimum over its components of (component ATP ÷ quantity per kit).
- At packing, components are shown and packed together (FR-76).

### 4.7 Orders & Cut-off

**Description:** The warehouse sees one order record regardless of channel and can intervene only by holding an order. A cut-off board shows today's risk per carrier wave, so a missed wave is predicted rather than discovered. Realizes UJ-2, UJ-4.

#### FR-56: Order lifecycle
System can track each order through received → carrier data ready → picking → packing → awaiting handover → handed over → delivered.

**Consequences:**
- The order list has buckets per stage, plus *exception* and *cancelled* (by stage).
- CS can search by order number, channel number, external reference, tracking number or recipient.
- Order prices are visible only with permission. COD and total value are visible to all.

#### FR-57: Order detail
CS can open an order and see its lines (SKU, lot and expiry, pick location, quantities), its pick lists, its packing record (packer, station, box, weight, materials, video link) and a timestamped timeline of every stage event.

#### FR-58: Hold
Supervisor or CS can hold one or many orders with a reason, and release them.

**Consequences:**
- A held order cannot enter a pick list.
- A held order already in progress stops at its next scan.
- No edit or cancel control exists on orders.

#### FR-59: Owner change requests
Supervisor can approve or reject an owner change request once picking has started.

**Consequences:**
- During pick, pack or handover, the PDA shows *stop* and directs the goods to a hold location. The box cannot be closed, and the loading scan shows *do not ship*.
- The outcome (returned, rejected with reason, withdrawn, too late for the wave) is sent to the OMS.

#### FR-60: Cut-off board
Supervisor can view today's orders by stage, channel and carrier wave, with a risk status per wave (on time, at risk, late by N minutes).

**Consequences:**
- Slack = pack cut-off − (remaining work ÷ the team's actual speed today).
- Negative slack suggests adding headcount or deferring N orders to the next wave.
- Alerts fire 60 and 15 minutes before pack cut-off.

**Out of Scope:** wall-TV rendering (Later).

#### FR-116: Ship-by due date
System can compute each order's ship-by due date from channel SLA rules (Shopee, Lazada, TikTok Shop, off-platform), the warehouse calendar, and campaign extensions.

**Consequences:**
- The due date drives carrier-wave assignment (FR-60), queue order (FR-66) and missed-wave handling (FR-73).
- A due date that differs from the platform date received via the OMS raises an alert.
- Admin can configure SLA rules per channel with effective dates.

#### FR-117: Instant and express rider orders
System can run instant and express orders on a pack-within limit, and tell the OMS when a rider must be called or re-called.

**Consequences:**
- Pack-within limits: instant within 30 minutes, same-day 60 minutes before the truck (configurable).
- When the box is packed, the WMS sends *pack complete — call rider* to the OMS.
- A rider no-show is a handover state. *Re-call rider* sends a request to the OMS before the platform auto-cancels.
- Rider no-shows appear on the handover overview and the day-close checklist.

### 4.8 Picking

**Description:** Planners group eligible orders into pick lists through a draft wave, either recommended by the system or built manually. Pick rules decide the method, the splits and the allocation. Pickers work on PDAs along a route computed from the warehouse layout, scanning as they go. A short pick never adjusts stock automatically; it walks a fixed resolution flow. Realizes UJ-2.

#### FR-61: Pick rules
Supervisor can define versioned pick rules (conditions, scope, method, split limits) that must be approved before they take effect.

**Consequences:**
- The first matching rule wins: mandatory global → owner-specific → general global → warehouse default.
- Editing a rule creates a new version. Existing lists keep the version they were built with.
- Split limits are configurable, for example 300 orders or 2,000 pieces per list.

#### FR-62: Draft wave
Planner can build pick lists in recommended or manual mode through a draft wave, then split, merge, move or remove lists before confirming.

**Consequences:**
- Orders in a draft are reserved to that planner for a countdown (e.g. 10 minutes).
- Orders awaiting carrier data, held, or under a change request are excluded.
- Lists are split by method, then carrier wave, then N orders by paid time, then container capacity.

#### FR-63: Pick methods
System can assign one of six pick methods:
- by order;
- single-item orders;
- single SKU in bulk;
- identical-order sets;
- multi-order with sorting;
- consolidated multi-order.

**Consequences:**
- Pick lists are numbered `PK-YYMMDD-NNNN`. A re-pick creates a child `PK-…-1`.
- The default pack method is stored on the list.

#### FR-64: Lot and location allocation
System can allocate lot and location when the list is created: FEFO → pick location before storage → fewest stops → shortest walking distance on the published layout → slots emptied exactly.

**Consequences:**
- A pick-location shortage with stock in storage creates an urgent replenishment and moves the line to the end of the list. It does not block the order.
- Only a warehouse-wide stock-out blocks the order.

#### FR-65: Automatic pick lists
System can generate pick lists automatically per owner × service level when a threshold or time trigger fires. The mockups show this as an add-on module. It is in Phase 1 per the brief `[ASSUMPTION]`.

**Consequences:**
- Triggers include a tote full, a cart's slots full, a clock time, or N minutes before a carrier wave.
- There is a cap on open system lists.
- The mode is either create automatically or wait for warehouse confirmation.

#### FR-66: Pick queue
System can order the pick queue: supervisor priority (with reason) → nearest carrier wave → oldest.

**Consequences:**
- *Ship immediately* orders get their own single-order list, are printed automatically and go to the top of the queue.
- Unassigned lists appear to every eligible picker. Claiming a list locks it to that picker.
- Print status (unprinted, printed, reprint #n marked "copy") is tracked per list.

#### FR-67: PDA picking
Picker can execute a pick list on a PDA along a route computed from the published layout (FR-125), scanning the cart or tote, the location and the items.

**Consequences:**
- The route starts at the list's pick start point and orders stops by shortest walking distance. Stops on locations not bound to the layout follow walk sequence after the routed stops. With no published layout, all stops follow walk sequence.
- The cart or tote scan at the start is always required.
- A location scan is mandatory for lot-controlled items.
- Scanning every piece can be turned off only for single-SKU bulk and identical-set lists. It is always on for sort-while-pick, serial and high-value items.
- Entering more than required is blocked. Entering less prompts "short or later?".
- Only a Supervisor can change verification settings, and changes are audited.
- Scans made offline are queued and synced.

#### FR-68: Units and cartons in picking
Picker can pick by unit of measure.

**Consequences:**
- Sealed cartons are used first, then opened-carton remainders, then a new carton is opened.
- A sealed-carton QR counts as a full carton. A carton QR that has already shipped is rejected.

#### FR-69: Empty-location confirm
System can ask the picker to confirm a location is empty after its last piece. Answering "not empty" creates an urgent count (FR-50).

#### FR-70: Short-pick flow
Picker can report a short, and System can resolve it through a fixed flow:
1. record the actual quantity;
2. offer an alternative location;
3. create an urgent replenishment;
4. create an urgent count;
5. mark *insufficient stock*, with the variance going to approval.

**Consequences:**
- Stock is never adjusted automatically.
- A re-pick creates a child list, and packing waits for all parts.

#### FR-71: Staging
Picker can drop picked goods at a staging spot by scanning.

**Consequences:**
- Container custody and carrier stay traceable.
- A wrong spot raises a warning.
- A *completed* pick list means handed to packing, not shipped.

#### FR-72: Put-wall sorting
Sorter can sort batch-picked goods into put-wall slots by scanning items while the system shows the target slot.

**Consequences:**
- A complete slot can be released to packing at once. Releasing it again does not duplicate the pack job.

#### FR-73: Missed wave
System can roll orders still open when a wave's truck leaves into the next wave, tagged *missed wave* and counted in KPIs.

#### FR-74: Picking overview
Supervisor can view remaining orders by cut-off, ETA vs cut-off, blockers, picker status and pieces per hour per picker.

**Consequences:**
- Pickers cannot see or close pack jobs.

### 4.9 Packing

**Description:** A pack job shares its pick list's number and becomes ready when picking and sorting finish. Packing happens at stations bound to a scanner, printer, scale and camera. Every piece is scanned and the weight is checked. Cancellation is re-checked immediately before the label prints. Video runs through label printing. Packaging and paired materials are deducted when the box closes. Realizes UJ-3.

#### FR-75: Pack jobs and methods
System can create one pack job per pick list, and Packer can pack by four methods:
- by order;
- by pick list (the system picks a matching unpacked order);
- production line (one box type, per-box label scan plus random full scans);
- multi-box.

**Consequences:**
- Pack job status: awaiting prep → preparing → ready to pack → packing → packed. Side states are exception, cancelled and paused.
- An order cannot close until all its parts arrive.
- Only a Supervisor can change the pack method (with a reason). A Packer can only switch to multi-box.
- Production line reconciles picked = output + waste + leftover.

#### FR-76: Scan-verified packing
Packer can scan-verify every item, and System blocks wrong SKUs and over-scans with a red screen and sound.

**Consequences:**
- These steps cannot be turned off: scan start, scan close, every piece or unit barcode, every serial or high-value piece, and the cancellation check before printing.
- Kit components are shown and packed together.

#### FR-77: Weight check
System can check box weight against expected weight within a tolerance of ±5% or 20 g, whichever is larger.

**Consequences:**
- The weight comes from the scale. A typed weight is logged as manual.
- A box out of tolerance is held for supervisor inspection.

#### FR-78: Labels and documents
System can print the shipping label and in-box documents (receipt or tax invoice, warranty card, B2B documents, content list) once every item is verified.

**Consequences:**
- Cancellation is re-checked immediately before the label prints.
- Batch printing prints only labels that have never been printed.
- A reprint needs supervisor approval and is counted.
- Platform labels are never edited.

#### FR-79: Box suggestion and materials
System can suggest a box (with backup ranks) and deduct packaging and paired materials when the box closes.

**Consequences:**
- Owner box mode: owner box first, warehouse box by size, or owner box only.
- A Packer may scan any other box without a reason.
- Exactly one packaging scan per box is mandatory.
- Extra material is a separate scan.
- *Reuse original box* deducts no stock.
- Inserts (freebies, flyers) follow owner insert rules and are deducted at handover.

#### FR-80: Pack video
System can record video per order at camera-equipped stations, linked to the order and its exceptions.

**Consequences:**
- Video must continue through label printing and show that order's label.
- On a PDA the camera priority is a bound IP camera, then the built-in camera. If neither exists, a single *no video* warning is shown and work continues.
- Retention defaults to 60 days. Clips linked to an exception are locked until it closes.
- Deletion happens only through the system: a 7-day soft delete, and a second admin for bulk deletion. Every view or delete is logged.
- CS and Supervisors can open the video from the order, the exception or the cancel-return job.
- Storage above 90% raises an alert.

#### FR-81: Station routing
System can route pack jobs to stations, and Supervisor can reassign them.

**Consequences:**
- Two stations can never pack the same order.
- Urgent jobs go to the first free station, and the queue is sorted by required pack-complete time.
- A station with a faulted device gets no work.

#### FR-82: Packing exceptions
Packer can raise an exception, and Supervisor can resolve it from a queue.

**Consequences:**
- Types: missing item, wrong SKU, abnormal weight, materials not ready, print failure, cancelled during packing, incomplete evidence, out of boxes.
- Every case links to the order's video.

#### FR-83: Pre-pack prep
Prep staff can prepare boxes and materials per prep sheet (same number as the pick list) and dispatch them to a desk or conveyor. The mockups show this as an add-on. It is in Phase 1 per the brief `[ASSUMPTION]`.

**Consequences:**
- Materials are reserved when the sheet is created and deducted when the box closes.

#### FR-84: Value-added service tasks
Supervisor can attach a VAS instruction (labelling, re-bagging, gift wrap) to an inbound line, an order or a return, and staff confirm completion by scan. Minimal VAS is in Phase 1 per the brief; the standalone VAS work module stays an add-on `[ASSUMPTION]`.

**Consequences:**
- An inbound line with an open VAS task cannot be put away.
- An order with an open VAS task cannot close its box.
- A return item with an open VAS task cannot be restocked.

#### FR-118: In-box tax documents
System can issue the in-box receipt or tax invoice when packing completes, numbered from the company's document series, and send it to the OMS.

**Consequences:**
- The number is assigned at pack-complete, not at print, so a reprint keeps the number.
- Voiding an issued document requires approval and is sent to the OMS.
- The document format and numbering series are set in document settings.

#### FR-123: Packing rules per owner
Admin can configure, per owner, the box mode (owner box first, warehouse box by size, owner box only), insert rules, and material matching (paired materials per box or SKU) `[ASSUMPTION: configured inside WMS packaging settings in Phase 1, since the owner settings page is Phase 2]`.

**Consequences:**
- Box suggestion (FR-79) uses these rules.
- With a single owner, the owner is preselected.

#### FR-124: Reopen a packed box
Supervisor can reopen a packed box before it is sorted, with a reason.

**Consequences:**
- The label is voided if it was not yet handed over, and materials consumed stay consumed.
- The order returns to *packing*, and the pack video records the reopen.

### 4.10 Handover

**Description:** This closes JST's biggest gap. Packed parcels pass through an explicit **sorted** state, placed in carrier and wave containers after three checks. Trucks are loaded by container, not by parcel. Handover confirm is the single stock-deduction point. The manifest is reconciled per parcel against the carrier's receipt. The day closes only when a checklist passes. Realizes UJ-4.

#### FR-85: Sort to container
Handover staff can sort packed parcels into handover containers, container-first or parcel-first, and switch mode without closing the container.

**Consequences:**
- Each scan checks three things: packed, carrier matches the container, and not cancelled. The timestamp of the cancellation data is shown.
- A wrong carrier shows a red screen.
- A cancelled parcel shows a red screen, goes to the cancelled-goods location and creates a cancel-return job automatically.
- If no open container exists, scanning any empty container binds it to the carrier and wave.
- A sorted parcel moves to *awaiting handover*, with its container and wave recorded.
- Container use is configurable (all carriers, per carrier, none). A change takes effect the next day.

#### FR-86: Container close and seal
Handover staff can close a container and record a seal number.

**Consequences:**
- Container status: open → closed → handing over → handed over.
- A container holding a cancelled parcel cannot be handed over until the parcel is pulled. Pulling it from a sealed container needs a new seal.
- All accounts of one carrier share containers, and the manifest splits by account.

#### FR-87: Vehicle loading and confirm
Handover staff can register the arriving vehicle (plate, driver, photo), scan containers onto it, and confirm handover.

**Consequences:**
- A seal mismatch forces a search: every parcel in the container is scanned and the container is resealed.
- Handover confirm deducts stock (shipped). Before confirm, stock stays on hand.
- A truck no-show moves the goods to the next wave with no return transaction.
- Containers not scanned at confirm can be split off as pending.

#### FR-88: Manifest
System can produce a manifest per handover, with child manifests per shop or carrier account.

**Consequences:**
- The parent total equals the sum of its children. A multi-box order counts as 1.
- Proof is a signature on the PDA or tablet, or signed paper plus a photo. Without proof, a second person must approve.
- Where a carrier API exists, the carrier's receipt is reconciled per parcel, and a shortage opens a case. Without an API, a Supervisor certifies receipt.

#### FR-89: Customer pickup
Handover staff can hand over to a customer pickup by appointment, after verifying the collector's ID.

**Consequences:**
- One appointment can cover several orders and gets one manifest.
- Confirm is possible only when every box is scanned.
- ID photos are kept 90 days.
- A no-show 30 minutes after the appointment returns the goods to the pickup point.

#### FR-90: Handover overview
Supervisor can view parcels not handed over by wave, truck status, cancellations to pull, carry-over, and a daily balance per carrier.

**Consequences:**
- Packed today = handed over + cancelled before handover + pending, with no overlap.
- Carry-over is not added to today's packed count.

#### FR-91: Day close
Supervisor with the *day close* permission can close the day only after a checklist passes:
- all waves closed;
- all cancellations pulled;
- leftovers counted by scan;
- every not-found parcel has a case owner;
- every carrier-refused parcel inspected.

**Consequences:**
- Until then the status shows *cannot close — N items left*.
- Closing takes a snapshot that cannot be edited.
- Carry-over creates no new order, parcel or stock record, and keeps the original pack date.

**Out of Scope:** own-fleet trips and the driver app (Later). Weighing at handover, door reassignment and late-truck decisions are deferred `[ASSUMPTION]`.

### 4.11 Cancellations

**Description:** This closes JST's second gap. A cancellation can arrive at any stage, and the WMS enforces it at every scan point. Goods that never left the warehouse return to stock through a cancel-return job. Goods that left become an expected return (§4.12). Realizes UJ-3, UJ-4.

#### FR-92: Stage classification
System can classify each cancellation by stage and route it.

**Consequences:**
- **Before pick:** the order is removed and its reservation released.
- **After pick or after pack:** a cancel-return job is created.
- **After handover:** an expected return is created.
- Cancellation data older than 15 minutes triggers a re-pull warning at sort and handover.

#### FR-93: Enforcement at every scan point
System can enforce a cancellation at every scan point.

**Consequences:**
- **Pick:** an unstarted list can be cancelled whole. After the list starts, cancellation is per order, and picked goods go to return staging.
- **Pack:** label printing locks immediately.
- **Sort:** red screen, and the container is blocked until the parcel is pulled.
- **Handover:** the parcel is pulled at handover (default) or immediately (setting).

#### FR-94: Carrier-rejected labels
Handover staff can reconcile labels the carrier rejected by scanning each label and then the cancelled-goods location.

**Consequences:**
- *Matched*: the parcel waits for return.
- *Carrier knew first*: the parcel is removed from the manifest pending verification.
- A label from another wave shows a red screen.

#### FR-95: Cancel after pick
Supervisor can approve or reject an OMS cancellation request that arrives after picking started on a self-pickup order. A cancellation before pick is always accepted. The 3PL cost notice is omitted in Phase 1 `[ASSUMPTION]`.

#### FR-96: Cancel-return job
Staff can process a cancel-return job: scan the label or tote → scan items → scan the return container.

**Consequences:**
- A packed parcel must be unboxed at the cancelled-goods location first.
- The original label is void and can never be reused.
- Packaging used is recorded as consumed.
- Damaged pieces go to a damaged tote.
- Missing items open a search case and an urgent count.

#### FR-97: Restock of cancelled goods
System can auto-close return-to-shelf containers and create the restock move.

**Consequences:**
- A container closes at 30 pieces, every 2 hours, 1 hour before the last truck, or when an order is waiting for that SKU. In the last case the container is marked urgent.
- Goods become pickable only when the location is scanned.
- Restock must finish before the last truck. Late restock is flagged.

### 4.12 Returns

**Description:** Parcels that left the warehouse come back as expected returns. They are received in one session per carrier drop-off, matched to the original order, inspected per unit with photos and video, and restocked only when a location is scanned. Problem reports carry the evidence for the owner's decision, which is made in OMS after-sales. Refund and compensation decisions also belong to the OMS. Realizes UJ-5.

#### FR-98: Expected returns
System can create expected returns from: cancellation after handover, failed delivery, platform return requests (via the OMS) and owner notifications.

**Consequences:**
- Each expected return shows the original parcel, SO, owner, source and wait window.
- Overdue windows are per carrier (defaults: Flash 7, J&T 7, SPX 10 days).

#### FR-99: Return receipt
Returns staff can open one return receipt per carrier drop-off, scan every label, and close it with the driver's on-screen signature.

**Consequences:**
- Another carrier's label is rejected. This is configurable to warn only.
- A parcel can be received only once.
- A tracking number that was never handed over is rejected, unless it is a buyer-return label with a new tracking number. That parcel waits for its original tracking number to be scanned, or goes to return quarantine if none can be found.

#### FR-100: Return quarantine
System can quarantine an unmatched parcel in return quarantine and open a problem report automatically.

**Consequences:**
- The parcel is not stocked and never discarded automatically.
- An alert fires after 30 days and repeats every 7 days.

#### FR-101: Inspection
Returns staff can inspect and grade each unit at a camera station: good, damaged, wrong SKU, expired, packaging damaged, not this owner's.

**Consequences:**
- Any grade other than good requires at least one photo. Video is recorded automatically.
- Stock is added only for units physically scanned. A shipped unit that was not scanned is recorded as *missing* and opens a problem report.
- A kit missing a component, or a serial mismatch, blocks restock.
- Damaged and expired units go to damaged stock immediately.
- A pending inspection older than 2 days raises an alert.

#### FR-102: Restock of returns
Returns staff can restock good units by scanning the item or container, then the location.

**Consequences:**
- Returns are held as *returns, awaiting inspection* until inspected and put away.
- A wrong location raises a warning and nothing moves.

#### FR-103: Problem reports
System or Returns staff can raise a problem report with photo and video evidence, problem type (15 types), source and the party to claim against.

**Consequences:**
- A return rule matrix decides whether the floor resolves the report or it goes to the OMS as a decision case.
- If no decision comes back within 7 days, the item stays stored.

#### FR-104: Return job board
Supervisor can view a return job board per parcel: awaiting → received → inspected → awaiting decision or extra work → restocked → done. The board shows overdue counts, throughput and restock rate.

### 4.13 Approvals, Notifications & Audit

**Description:** These are shared engines every feature uses. Approvals put sensitive actions behind one or two steps. Notifications reach the right role in-app, on LINE or by email. A single immutable activity log records who did what, on which device, and why.

#### FR-105: Approvals engine
Admin can configure each approval type with a step-1 approver role, a step-2 condition and an escalation time.

**Consequences:**
- Phase 1 types include:
  - **Stock and ledger:** stock adjustment (tiered by pieces, % and value), reversal (always), opening balance.
  - **Stock release and disposal:** release stale reservation, release held lot, material issue over limit, disposal.
  - **Inbound:** early ASN close, short-shelf-life receipt.
  - **Labels and data:** label reprint, extra barcode.
  - **Admin:** disabling a warehouse, bulk video deletion, support critical change.
- Money-related approvals cannot be self-approved.
- An unanswered approval escalates to step 2, then to admin.
- The pending-approval count shows in the header.

#### FR-106: Notifications engine
Admin can configure each notification type's channels (in-app, LINE, email) and recipients (role, involved people, selected users).

**Consequences:**
- Some types cannot be turned off (WMS ≠ OMS stock, video storage above 90%).
- Users may mute LINE or email, but never in-app notifications.
- Notifications meant for the owner are delivered through the OMS.

#### FR-107: Activity log
System can keep an immutable activity log of time, actor (user, automation, OMS API, Zimple support), device, action, old → new value and reason.

**Consequences:**
- The log covers:
  - sign-in and sign-out, including failed attempts;
  - create, edit, cancel, approve and reject;
  - adjust and reverse;
  - rule changes, users and permissions;
  - print and reprint;
  - every export.
- The log can be filtered and exported. Retention is at least 1 year `[ASSUMPTION]`.

#### FR-108: Overdue alerts
System can raise an *overdue* alert for every stage SLA (temporary receipt open, awaiting putaway, stuck move, pending inspection and similar), with a configurable threshold per warehouse.

### 4.14 Overview & Reports

#### FR-109: Overview dashboard
Warehouse Manager can view a real-time overview, refreshed every minute, with:
- handed over vs total;
- awaiting handover near cut-off;
- pack accuracy;
- on-time %;
- inventory accuracy;
- space used;
- productivity vs target per stage;
- pending approvals.

**Consequences:**
- The order pipeline segments are clickable and drill into filtered lists.

#### FR-110: Reports
Warehouse Manager can open Phase 1 reports:
- inbound analysis;
- stock movement summary;
- inventory accuracy;
- daily outbound and variance;
- packaging usage;
- handover and on-time;
- returns analysis;
- staff performance.

Each report shows its data-as-of time and filters, and offers Excel export.

**Consequences:**
- Downloads are permission-gated and logged.
- Buyer PII is masked unless the user has the PII permission.
- A report can be scheduled to send automatically by email or LINE.
- A user can save a report view and drill into the operational list behind it.

### 4.15 Migration & Cutover from JST

**Description:** Phase 1 succeeds only if a warehouse can move off JST without stopping operations. SKUs reach the WMS through Zimple OMS. The WMS supplies the rest: structure, devices, people and opening stock. A cutover check then proves stock is right before the first live wave. Most of this section is inferred, because the sources specify only the opening-balance import. Realizes UJ-6.

#### FR-111: Opening balance import
Admin can import opening balances from Excel per owner × SKU × lot × location.

**Consequences:**
- The import creates an opening-balance document awaiting approval, and always requires approval.
- On approval, ledger lines of type *opening balance* are posted.
- Rows with an unknown SKU, location or lot format are rejected with a row-level error report `[ASSUMPTION]`.

#### FR-112: Structure import
Admin can bulk-import zones and locations from a template `[ASSUMPTION]`.

**Consequences:**
- A dry-run preview shows first.
- Validation is all-or-nothing per file.

#### FR-113: Warehouse-local attribute import
Admin can bulk-import warehouse-local SKU attributes (measured dimensions and weight, tracking flags not sourced from the OMS) `[ASSUMPTION]`.

#### FR-114: Cutover check
Admin can run a cutover check `[ASSUMPTION]`:
1. a whole-warehouse blind count after the opening-balance import;
2. a comparison of ledger total vs imported total;
3. a WMS → OMS stock push.

**Consequences:**
- The first live wave is blocked until the check passes or a Warehouse Manager overrides it with a reason.

**Notes:** `[NOTE FOR PM]` How in-flight orders and ASNs at cutover are handled, and whether Zimple OMS imports SKUs from JST, are open (Q-4).

### 4.16 Data Phase 1 Must Capture for Later Phases

No UI is required for these. They are captured now so Phase 2 (billing, claims, Client Portal) does not need back-filling:
- An owner on every stock record, document and SKU, even with a single owner. The owner picker is hidden when there is only one owner `[ASSUMPTION]`.
- Billable-event signals:
  - receiving rounds, cartons and CBM, after-hours and unannounced arrivals;
  - pack performed or not, cancellation stage and order type;
  - packaging vs owner box, paired and extra materials, inserts;
  - storage CBM per SKU and location.
- The evidence chain for claims: pick scans → pack video → weight → manifest and seal → carrier events. Also carrier-shortage cases and problem-report evidence.
- Variance value at cost, and the party responsible for damage.
- The owner-level slot in settings precedence.

## 5. Cross-Cutting NFRs

- **NFR-1 Throughput:**
  - Sustain 30,000 orders a day per warehouse.
  - Absorb campaign peaks (11.11) of 3× normal daily volume `[ASSUMPTION: peak multiple unconfirmed]` without missed carrier waves caused by the system.
- **NFR-2 Scan latency:**
  - A PDA or station scan gives its accept/reject feedback within 500 ms at p95 under peak load `[ASSUMPTION]`.
  - The label prints within 2 s of the last verification scan `[ASSUMPTION]`.
- **NFR-3 Offline tolerance:**
  - PDA picking, counting and moves queue scans offline and sync on reconnect without duplicates.
  - Any scan that needs live data (cancellation checks at pack and sort) fails closed with a clear message.
- **NFR-4 Availability:**
  - 99.9% during each warehouse's configured operating hours `[ASSUMPTION]`.
  - No planned downtime within 3 days before a configured campaign day.
- **NFR-5 Integration resilience:**
  - Every OMS and carrier call is idempotent and retried with backoff.
  - Failed sends surface in a queue (FR-4).
  - Available-to-sell reaches the OMS within 5 minutes of a stock change `[ASSUMPTION]`.
- **NFR-6 Data integrity:**
  - The ledger is append-only.
  - The daily reconciliation (FR-7) must show zero unexplained difference.
  - No feature may write stock outside the ledger.
- **NFR-7 Security:**
  - Role-based access is enforced server-side for every page and action, and data is scoped by warehouse.
  - MFA is available to the company and mandatory for Zimple support.
  - All sensitive actions are logged (FR-107).
- **NFR-8 Localization:**
  - Thai is the primary UI language, and English is available.
  - Document numbers use a Gregorian YY.
  - Dates show in the user's locale.
- **NFR-9 Floor usability:**
  - Every floor task can be completed by scanning plus minimal numeric entry.
  - Rejections use a full red screen plus sound.
  - A new floor staffer can complete a pick list, a pack job and a putaway unaided after one supervised shift `[ASSUMPTION]`.
- **NFR-10 Device support:**
  - Rugged Android PDAs with built-in scanners `[ASSUMPTION]`, USB/HID scanners, 80 mm thermal and label printers, A4 printers, USB/serial scales, and IP cameras.
  - Web fallback for warehouses without PDAs is a functional requirement (FR-122).
- **NFR-11 Multi-warehouse readiness:**
  - The data model and permissions support more than one warehouse per company, and a user can switch warehouse.
  - The pilot runs one site `[ASSUMPTION]`.

- **NFR-12 UX quality (the headline promise):**
  - Office and floor users rate Zimple Fulfillment easier to use than JST (SM-10).
  - The warehouse web app and PDA screens share one design system: consistent components, status colours and scan feedback across every module.
  - A CS user can answer "where is this order and what happened to it?" from the order screen alone in under 1 minute `[ASSUMPTION]`.

## 6. Constraints & Guardrails

### 6.1 Privacy (PDPA)

Buyer name, address and phone number are personal data. The pilot company is the data controller. For future 3PL customers, Zimple Fulfillment's operator acts as a processor.
- Buyer PII is masked by default on screens, exports and reports. Only the *view buyer PII* permission unmasks it (FR-19).
- Media containing PII have default retention limits:
  - pack and receiving video: 60 days;
  - collector ID photos: 90 days;
  - day-labour phone numbers: 90 days.
  - After its limit, an item is purged by the system. Clips locked to an open case are kept until the case closes.
- Every PII view and export is logged (FR-107).
- Hosting region and buyer-PII retention beyond video are open (Q-9).

### 6.2 Operational guardrails

- No manual stock adjustment exists anywhere. This is deliberate, not a missing feature.
- No automatic disposal of goods, ever.
- Platform-issued labels are never edited.
- No order is created, edited or cancelled in the WMS. Cancellations always originate in the OMS.

## 7. Integration & Dependencies

| Dependency | Phase 1 role | Risk |
|---|---|---|
| **Zimple OMS** | Source of orders, SKUs, kits, ASNs, cancellations and change requests. Receives status, stock and inbound results. The pilot cannot cut over without it. | **Critical.** Its readiness, API contract and peak behaviour gate Phase 1. `[ASSUMPTION: Zimple OMS exists or is delivered in parallel]` |
| Marketplaces (Shopee, Lazada, TikTok Shop) | Indirect, through the OMS: labels, carriers, cancellations, return requests. | Platform rate limits on 11.11 pass through the OMS. |
| Carriers: Flash, KEX (formerly Kerry), J&T | Direct API for non-marketplace orders: tracking, label, receipt events. | Research found no public API docs. Access goes through business accounts. KEX is restructuring. |
| Generic WMS API | Lets a non-Zimple OMS connect. | The contract must be stable before any prospect onboarding. |
| Hardware (PDAs, printers, scales, cameras, NAS for video) | Required for stations and floor work. | The brief says to build stations and integrations first, because they carry the most technical risk. |

### 7.1 Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Zimple OMS not ready, including after-sales decision cases | Phase 1 cutover cannot happen. **Decision: Phase 1 cutover slips with Zimple OMS; there is no JST-OMS fallback.** | Track Zimple OMS readiness as a Phase 1 milestone. Agree the WMS ↔ OMS contract first. |
| Scope (126 FRs) vs a small team in 2 months | The pilot misses its cutover date, or ships with gaps | Provisional tiers (§9.3). Confirm them with the JST parity checklist (Q-1). |
| Not load-ready for 30,000 orders a day and 11.11 | Missed waves, platform penalties, lost trust | A load test at peak volume (NFR-1) before cutover is a release gate. |
| Stations and integrations (printers, scales, cameras, carrier APIs) | Highest technical risk, per the brief | Build stations and integrations first. |
| Cutover disrupts operations | Missed waves during the cutover week | Run the cutover check (FR-114). Keep a written rollback runbook to JST for the first 2 weeks `[ASSUMPTION]`. SM-11 measures it. |
| UX promise not met | No reason to switch, since price mirrors JST | One design system (NFR-12). Measure SM-10 with pilot users. |

## 8. Non-Goals (Explicit)

- **Not an OMS.** No order creation, editing or cancellation, no marketplace connections of its own, no refund, compensation or owner-side decisions. Every cancellation originates in the OMS. The WMS only enforces it, and can approve whether a cancellation *after work started* is accepted physically (FR-95).
- **Not multi-owner 3PL in Phase 1:**
  - **Out:** Client Portal, the Owners module (profiles, contracts, two-way requests), per-owner rule UI, rate cards and billing, claims, and rush requests.
  - **Phase 1 still keeps:** owner-scoped data (§4.16).
- **Not a TMS.** No own-fleet trips, driver app or proof of delivery.
- **Not a purchasing or workforce tool.** No suppliers or POs, no shift planning, check-in or staff tests, no peak forecasting.
- **Not a customization platform.** No theme tool, document template designer or TV mode.
- **Out of Phase 1:** temperature log and inter-warehouse transfers.
- **No e-Tax invoice or withholding-tax handling.** These belong to Phase 2 billing (see addendum).

## 9. Phase 1 Scope

### 9.1 In Scope
- **Integration:** Zimple OMS plus a generic API; direct carrier APIs for non-marketplace orders.
- **Setup:** warehouse, zones, locations, layout map and pick routing, containers, devices and stations, rules and precedence, pickup rounds, numbering, calendar.
- **Access:** users, roles, special permissions, web and PDA sign-in, day-labour cards, support access.
- **Products and materials:** warehouse-local SKU attributes, units and barcodes, lot, expiry and serial, kits, packaging as stock.
- **Inbound:** temporary receipts, receiving with evidence, exceptions and quarantine, putaway, receipt close.
- **Inventory:** ledger, moves, replenishment, counts, FEFO, damaged and disposition.
- **Orders and picking:** orders, hold, change requests, cut-off board; picking with six methods, automatic lists, short-pick flow, put wall.
- **Packing:** four methods, verification, weight, labels, box and materials, video, stations, exceptions, prep, minimal VAS.
- **Handover:** the sorted state, containers and seals, vehicle loading, manifest, customer pickup, day close.
- **Cancellations and returns:** cancellations at every stage, returns end to end.
- **Shared engines:** approvals, notifications, audit, overview, Phase 1 reports.
- **Cutover:** migration and the cutover check.
- **Web fallback:** every floor flow runs on the web for warehouses without PDAs (FR-122).
- **Connections and decision cases:** OMS, carrier and API settings (FR-119); decision cases to OMS after-sales (FR-121).

### 9.2 Out of Scope for Phase 1
- **Phase 2:** Client Portal, Owners module, billing and rate cards, claims, per-owner settings UI, rush requests. These are the multi-owner 3PL value. Owner-scoped data now keeps them cheap later.
- **Later:**
  - Transport, TMS and the driver app; own-fleet handover.
  - Purchasing; planning and workforce; peak forecast.
  - TV mode, theme tool, template designer.
- **Unassigned features, resolved to Later by the JST-parity rule** `[ASSUMPTION]`: temperature log, inter-warehouse transfer. (Layout map moved into Phase 1 on 2026-11-23, see FR-125/126.)
- **Deferred handover extras** `[ASSUMPTION]`: weighing at handover, door reassignment, late-truck decision.
- **Post-pilot:** ready-made JST, Zort and other OMS connectors `[ASSUMPTION]`.
- `[NOTE FOR PM]` **The scope is large for a small team in 2 months.** This PRD carries 126 FRs. §9.3 gives provisional tiers. The JST parity checklist (Q-1) confirms them.

### 9.3 Provisional Priority Tiers `[ASSUMPTION]`

The tiers follow the thesis: the core flow, the two JST gaps, stock correctness, and what the pilot needs on cutover day. Confirm them with the JST parity checklist (Q-1) before stories are sequenced.

- **Must (cutover day):** FR-1–5, 7, 8, 10–15, 17–21, 24–26, 28, 29, 31, 33, 34, 36–44, 46–50, 52–54, 56–58, 61–64, 66–68, 70, 71, 73, 75 (by order, by pick list, multi-box), 76–82, 85–88, 90–94, 96–103, 105–107, 111, 114, 116, 118–122, 125.
- **Should (within 4 weeks after cutover):** FR-6, 16, 22, 23, 27, 30, 32, 35, 45, 51, 55, 59, 60, 69, 72, 74, 84, 89, 95, 104, 108–110, 112, 113, 115, 117, 123, 124, 126.
- **Defer (after the pilot is stable):** FR-9, 65, 75 (production line), 83.


## 10. Success Metrics

**Primary**
- **SM-1 Pilot cutover.**
  - **Measure:** the pilot warehouse runs 100% of its orders and stock on Zimple Fulfillment with JST switched off.
  - **Target:** within 4 weeks of the Phase 1 release `[ASSUMPTION]`.
  - **Validates:** FR-1–7, FR-111–114.
- **SM-2 Throughput at volume.**
  - **Measure:** the warehouse sustains 30,000 orders a day, with zero carrier waves missed for system causes (downtime, latency, sync failure) over the first full campaign day.
  - **Validates:** NFR-1–5, FR-60, FR-73.
- **SM-3 Inventory accuracy.**
  - **Measure:** blind-count location accuracy over 30 days.
  - **Target:** ≥ 99.5%.
  - **Validates:** FR-42–51.

**Secondary**
- **SM-4 Order accuracy.**
  - **Measure:** shipped orders with a wrong item or quantity, found through returns or problem reports.
  - **Target:** at or below the pilot's JST-era rate `[ASSUMPTION: JST baseline to be measured before cutover]`.
  - **Validates:** FR-67, FR-76, FR-77.
- **SM-5 On-time handover.**
  - **Measure:** orders handed over in their assigned carrier wave.
  - **Target:** ≥ 98% `[ASSUMPTION]`.
  - **Validates:** FR-60, FR-66, FR-85–88.
- **SM-6 Daily balance.**
  - **Measure:** days where packed = handed over + cancelled + pending, and WMS = OMS at 06:00.
  - **Target:** 100% of days.
  - **Validates:** FR-7, FR-90.
- **SM-7 Time to productive.**
  - **Measure:** shifts until a new floor staffer completes tasks unaided.
  - **Target:** ≤ 1 `[ASSUMPTION]`, and below JST.
  - **Validates:** NFR-9.
- **SM-8 Cancellations caught.**
  - **Measure:** orders cancelled before handover that still shipped.
  - **Target:** 0.
  - **Validates:** FR-92–94.

- **SM-10 Ease of use vs JST.**
  - **Measure:** pilot office and floor users who rate Zimple Fulfillment easier to use than JST, in a survey 4 weeks after cutover.
  - **Target:** ≥ 80% `[ASSUMPTION]`.
  - **Validates:** NFR-9, NFR-12.
- **SM-11 Cutover without disruption.**
  - **Measure:** carrier waves missed for cutover-related causes during the first 2 weeks after cutover.
  - **Target:** 0 `[ASSUMPTION]`.
  - **Validates:** FR-111–114.

**North star (beyond Phase 1)**
- **SM-9 Market share.** Take 50% of warehouses running JST. The baseline count and deadline are open (Q-2).

**Counter-metrics (do not optimize)**
- **SM-C1 Picking speed** (pieces per hour). Do not raise it by relaxing scan verification. It counterbalances SM-5.
- **SM-C2 Approval volume.** Do not reduce it by loosening approval rules or allowing self-approval. It counterbalances SM-3 and SM-6.
- **SM-C3 Feature or screen count delivered.** Parity is measured against the pilot's real JST usage, not the number of mockups built. It counterbalances SM-1.

## 11. Open Questions

1. **Q-1 JST parity checklist** (phase-blocker for sequencing). Does the pilot's real JST usage confirm the provisional tiers in §9.3?
2. **Q-2 Market baseline.** How many warehouses run JST today, and by when should 50% be reached?
3. **Q-3 Zimple OMS readiness** (phase-blocker; Phase 1 cutover slips with it). Does Zimple OMS exist today? Does it support after-sales decision cases (FR-121), the rider call (FR-117) and tax-document sync (FR-118)?
   - Does it expose orders, SKUs, kits, ASNs, cancellations, change requests and its after-sales decisions on the timeline Phase 1 needs?
   - What are its API limits at peak?
4. **Q-4 Cutover mechanics.** How are in-flight orders and ASNs handled at cutover? Does Zimple OMS import SKUs from JST? Is any JST history carried over?
5. **Q-5 Add-on modules vs Phase 1.** The mockups mark automatic pick lists, prep, VAS and kit assembly as add-ons, but the brief puts them in Phase 1. This PRD includes them (FR-65, FR-83, FR-84, FR-27). Confirm, and confirm how add-on licensing applies to the pilot.
6. **Q-6 Default roles.** The approvals in the mockups reference roles missing from the default role list. Confirm the default role set (FR-18).
7. **Q-7 Warehouse rules design and defaults.** Two designs exist, and system defaults differ from the sample values:
   - receiving count: all cartons vs 2 random;
   - replenishment interval: 60 vs 30 minutes;
   - cancellation-data freshness: 30 vs 15 minutes.
   Which design and which defaults? This is a UX decision, not a blocker.
8. **Q-8 Count approval thresholds.** The approval matrix says > 5 pieces, 2% or ฿2,000. The count screen says > ฿1,000. Which applies?
9. **Q-9 Hosting and data residency.** Where are buyer PII and video stored? What retention applies to order PII?
10. **Q-10 Peak multiple.** What is the real 11.11 peak vs a normal day (NFR-1)?
11. **Q-11 PDA designs.** PDA designs are missing for putaway and sorting, and every PDA mockup is reference-only. UX must design them (`bmad-ux`).
12. **Q-12 Production-line packing.** Does the pilot's volume justify it in Phase 1 (FR-75)? Provisionally deferred.
13. **Q-13 JST facts.** Confirm that JST means JST ERP, and quantify its license cost and lock-in pain (carried from the brief).
14. **Q-14 Pricing and packaging.** What is the final pricing, and how do add-on modules map to editions (carried from the brief)?
15. **Q-15 JST UX failure cases.** Collect concrete JST UX failures from pilot users, as a baseline for SM-10 and NFR-12 (carried from the brief).

## 12. Assumptions Index

**Scope and phasing**
- §0/§2.3 — The user-journey protagonists are illustrative, not interviewed users.
- §4.1 — JST, Zort and other ready-made OMS connectors are post-pilot. Phase 1 builds the Zimple OMS connector plus a generic API.
- §4.8 FR-65, §4.9 FR-83, FR-84 — Automatic pick lists, prep and minimal VAS are Phase 1 per the brief, despite the add-on label in the mockups.
- §4.10 — Weighing at handover, door reassignment and late-truck decisions are deferred.
- §4.11 FR-95 — Cancel-after-pick approval keeps the approval but drops the 3PL cost notice.
- §9.2 — Temperature log and inter-warehouse transfers move to Later by the JST-parity rule.
- §9.3 — All provisional priority tiers.
- §4.9 FR-123 — Owner packing rules are configured in WMS packaging settings.
- §7.1 — A 2-week rollback runbook to JST.

**Owner role in Phase 1**
- §4.2 FR-13 — Owner-level settings default to the warehouse value, with no Phase 1 UI.
- §4.16 — Owner-scoped data everywhere; the owner picker is hidden when there is a single owner.

**Product behaviour**
- §4.1 FR-6 — Post-handover events come from the OMS (marketplace) or the carrier API (non-marketplace).
- §4.3 FR-18 — Warehouse Head and Handover Lead are default roles.
- §4.13 FR-107 — The activity log is retained at least 1 year.
- §4.15 FR-111–114 — The row-level import errors, structure import, attribute import and cutover check are inferred.

**Quality targets (§5)**
- NFR-1 — 3× peak multiple.
- NFR-2 — 500 ms scan feedback, 2 s label print.
- NFR-4 — 99.9% availability.
- NFR-5 — 5-minute stock push.
- NFR-9 — One-shift onboarding.
- NFR-10 — Android PDAs.
- NFR-11 — The pilot runs one site.
- NFR-12 — The 1-minute CS answer target.

**Dependencies and metrics**
- §7 — Zimple OMS exists or is delivered in parallel.
- §10 — The SM-1 4-week window, the SM-4 JST baseline, the SM-5 98% target, the SM-7 one-shift target, the SM-10 80% target and the SM-11 zero target.
