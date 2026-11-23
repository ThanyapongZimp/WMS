---
title: "FR candidates — Inbound, Products, Inventory, Settings, Account, Overview, Reports"
prd: prd-WMS-2026-11-19
scope: Phase 1 only
sources: extract-screens.md (§0, §A inbound/products, §B inventory, §E 3–5, §F), extract-feature-inventory.md (§1.1, 2.1, 3.1, 3.2, 3.8, 4, 6), extract-brief.md (§4–5), .memlog.md decisions
status: draft for PRD consolidation
---

# FR candidates — Inbound · Products · Inventory · Settings · Account · Overview · Reports

**Conventions.** FR IDs are provisional (IN, PR, INV, ST, AC, OV, RP, MG, X). Each FR has testable consequences. `[ASSUMPTION]` = inference not stated in sources. `[3PL→P2]` = behaviour the sources tie to the 3PL edition. P1 must still store the data it needs, but this file writes no FR for it. "Owner" means the goods owner. Every stock record is owner-scoped even in the Business edition, where the pilot company is the only owner.

**Phase-1 boundary used here.** In scope: core receiving/putaway, SKU master consumption, stock, counts, settings and auth. Out of scope (no FRs): Client Portal, billing/fees, claims, Owners UI, settings-owners, Purchasing, Transport, Planning/workforce, TV mode, theme tool, template designer, layout map/editor, temperature log, inter-warehouse transfer (TF), peak forecast. VAS is an add-on module in the screens, but the brief's P1 inbound flow lists it. See OQ-3.

---

## 1. Inbound

### 1.1 Expected inbound (ASN) intake
ASNs (เลขใบแจ้งเข้า `AS-YYMMDD-NNN`) arrive from the OMS (Zimple OMS in the pilot; partner OMS or API for prospects). The warehouse sees them as an expected-arrival queue. The warehouse cannot edit owner item lists. It may create an ASN only "on behalf of" the owner, or for warehouse-own goods that have no PO.

- **IN-1** System can ingest ASNs and their item lists from a connected OMS/API and show them in an expected-arrival queue.
  - One ASN may link many owner item lists (`PO-<OWNER>-NNNN`). Item lists can still be added up to the time of receiving.
  - Duplicates are rejected by source reference (de-dupe rule, Connections).
  - Queue order: overdue first, then by scheduled date/slot. Pills include รอเข้า, มาถึงแล้ว, รับบางส่วน, เลยกำหนด N วัน, ขอรับด่วน.
  - The warehouse cannot edit item-list lines. Inbound views are read-only for OMS-sourced fields.
- **IN-2** Warehouse office user can create an ASN on behalf of an owner, or for warehouse-own goods (samples, freebies), when the OMS has not sent one.
  - Captured fields: owner, receive-at warehouse, arrival date, time slot, delivery method, vehicle data (optional), estimated pallets/cartons/weight/CBM, and flags (new SKU, lot-controlled, fragile, liquid, needs labelling).
  - The record is marked "คลังสร้างแทน" in the audit log.
  - Time slots show free doors. A full slot stays selectable but raises an alert.
  - New-SKU flag → system reminds the owner to supply dims/weight before arrival. `[ASSUMPTION: in P1 the reminder goes to the OMS or by notification, since the Portal is P2]`
- **IN-3** Warehouse lead can view an inbound dashboard of today's arrivals, doors, staff and backlog by stage.
  - Stages: รอเข้า → มาถึงแล้ว → กำลังรับ → รอจัดเก็บ → พร้อมขายวันนี้. Each stage shows a "ค้างเกินเวลา" count against a configurable stage SLA.
  - Shows hourly output vs plan and alerts when output is >15% under plan.
  - Dock-to-stock target is a rule (default "1–3 วัน"). A KPI shows arrival → sellable time.

### 1.2 Arrival & temporary receipt (TM)
Every vehicle arrival creates a temporary receipt (ใบรับเข้าชั่วคราว `TM-YYMMDD-NNN`, 1 vehicle = 1 round), whether or not an ASN exists. It records outer-package count, condition and the sender's signature. A TM does not make stock available.

- **IN-4** Receiver can issue a TM when a vehicle arrives, linking zero or more ASNs/item lists.
  - Records: declared vs counted outer packages, photos, scale weight (if a scale exists), sender e-signature on screen, and vehicle data (plate, driver, time).
  - An arrival without an ASN or before its date requires a reason and is tagged ไม่ได้แจ้งล่วงหน้า.
  - Vehicle data is optional by default (rule 5). When it is missing, the TM is tagged ไม่มีข้อมูลรถเข้า.
  - Outer-count shortfall (e.g. declared 30, counted 28) is recorded on the TM and triggers an owner notification.
  - The TM prints as a 2-part slip on a desk or mobile printer.
- **IN-5** System enforces TM lifecycle rules.
  - The previous round on the same ASN must be confirmed before a new TM opens.
  - A TM open/unconfirmed for >2 h raises an alert (threshold configurable).
  - Auto-close when all lines are complete. Manual close requires a reason (status ปิดใบแล้ว).
  - Goods arriving before any item list → status รอใบรายการสินค้า.
- **IN-6** Receiver can log a parcel whose tracking number matches no ASN and hold it at the parcel staging point (IN-S) until it is matched.
  - Captured: tracking no., carrier, sender from label, received time. Action จับคู่ใบแจ้งเข้า links it to an ASN later.
  - Held parcels are not stock until matched and received.

### 1.3 Receiving (scan, count, capture)
Receiving runs at a desktop receiving station (full-screen, camera video) or on a PDA (photos only). The receiver scans the ASN/PO to open the job and scans an item to select the SKU, then counts by carton pattern. Lot/MFG/expiry and serials are captured per product settings. Carton QR labels are printed, and goods are loaded onto containers.

- **IN-7** Receiver can open a receiving job by scanning the ASN/item-list barcode and count goods per SKU by carton pattern (cartons × pcs + loose + damaged).
  - Scanning one item selects the SKU and does not add to the count.
  - The count method follows a rule: 100% of cartons (system default) or random-open N cartons per SKU-lot, with a full count on any mismatch (sample value: 2).
  - The system checks carton dims ÷ pcs against unit dims and flags a mismatch for re-measure.
  - Line pills: ครบ, ขาด N, ชำรุด, กำลังนับ, ยังไม่นับ, ต้องวัดขนาด.
- **IN-8** Receiver can record lot, MFG date and expiry per line for lot/expiry-controlled SKUs.
  - Expiry is computed from MFG + shelf life when the SKU defines a shelf life.
  - A lot on the owner's item list is not mandatory. The warehouse records the actual lot, and history is kept.
  - Lot and expiry must be entered before putaway can be confirmed.
- **IN-9** Receiver must scan every serial at receiving for SKUs set to serial "สแกนตั้งแต่รับเข้า".
  - 1 serial = 1 location. A duplicate serial is rejected with an alert.
  - Serials can be imported from a template (นำเข้า Serial).
  - SKUs set to "ไม่คุม" or "สแกนตอนแพ็ค" skip serial capture at receiving.
- **IN-10** Receiver can print carton QR labels (`CT`) and load cartons onto permanent-QR containers (`PL-xxxx`).
  - Labels printed ≤ the number of cartons. A reprint keeps the number and requires a reason. Old labels become invalid only for unreceived cartons.
  - Only container types enabled for "รับเข้า" can be used. Closing a container immediately creates a putaway task.
  - ≤ N cartons per round (default 3) → system proposes "no container, put away per carton". Staff can override.
  - All open pallets must be closed before the receipt closes.
- **IN-11** System records receiving evidence.
  - A desktop station with a camera records video for every receipt. PDA receiving attaches photos only.
  - A photo is mandatory on any mismatch (short, over, damaged, wrong SKU) (rule 9, บังคับ).
  - Warehouses without PDAs can complete the full flow on the desktop receive page.
- **IN-12** System prompts measurement/weighing of new SKUs at first receipt.
  - The first carton of a new SKU is measured before putaway (rule 12). A missing unit dim/weight triggers a PDA warning (rule 13).
  - Scale readings auto-fill. A manually typed value is logged as "พิมพ์เอง".
  - The warehouse-measured value wins over the owner-entered value from the effective date.

### 1.4 Receiving exceptions, QC & quarantine
Exceptions do not stop the job. Over-receipt, off-list or questionable goods go to quarantine (DMG-H / inspection area) and wait for an owner decision. In P1 Business edition that decision is made internally `[ASSUMPTION]`.

- **IN-13** System handles over-receipt per rule (default tolerance 0%).
  - The excess is received but moved to quarantine with the status "เกิน · รอเจ้าของสินค้ายืนยัน". It is not sellable.
  - Excess aging alert after N days (default 7, warehouse-wide).
  - Only the excess can later be "เพิ่มเข้าสต๊อก". Other outcomes are return or dispose (see INV-21).
- **IN-14** System rejects or holds wrong goods.
  - Another owner's SKU scanned → red screen and reject.
  - An off-list SKU of the same owner → hold in the inspection area awaiting decision, or delete as a mis-scan.
  - An unknown barcode with the multi-barcode rule OFF (default) → reject, set the item aside, alert. With the rule ON → bind as an extra barcode after approval. No duplicate barcode within one owner.
- **IN-15** System enforces minimum remaining shelf life at receipt.
  - Remaining life < threshold (e.g. 53 d left < 90 d minimum) → accept only with supervisor confirmation (approval "short-shelf-life receipt"). Notification is sent.
  - The threshold resolves through the settings precedence (ST-6).
- **IN-16** Receiver can record damaged units at receipt. They post into the damaged/quarantine section, not to sellable stock, with cause and photos (see INV-20).

### 1.5 Putaway
Stock becomes sellable only when putaway is confirmed by scanning the destination location. The system suggests locations and blocks unsafe placements.

- **IN-17** System suggests a putaway location for each container/carton.
  - Inputs: room type, existing locations of the SKU, capacity (free m³ %, kg). Queue order: urgent (orders waiting) → temperature-controlled → oldest.
  - The supervisor can assign putaway staff. Pills: รอจัดเก็บ, กำลังจัดเก็บ, จัดเก็บแล้ว, ด่วน · คำสั่งซื้อรอ N ชิ้น.
- **IN-18** Putaway staff can confirm putaway by scanning the location on PDA.
  - Any non-suggested location requires a reason. Wrong room type, overweight, a closed location or one locked for counting → blocked.
  - For a mixed pallet the staff scans per carton or splits the pallet. A split prints a new pallet label.
  - On confirm, stock moves from รอจัดเก็บ to sellable immediately. Waiting back-ordered orders are reserved in their original sequence, and orders held as "สินค้าหมด" are released.
  - Alert when awaiting putaway > 2 h (temperature room 30 min).

### 1.6 Receipt closure & history
- **IN-19** Supervisor can close a receipt (ใบรับ) after reviewing actual vs ASN.
  - Multi-round receiving per ASN is allowed. On completion, a short/over/damaged summary is produced for confirmation. Auto-close after 3 days without a response (rule 11).
  - Early close of an ASN requires approval.
  - Receipt status flow: กำลังรับ → รอจัดเก็บ → กำลังจัดเก็บ → จัดเก็บแล้ว.
  - Received quantities and status are sent back to the OMS. `[ASSUMPTION: the inbound result callback is part of the OMS connector contract]`
- **IN-20** User can search closed receipts and export Excel in summary (1 row = 1 receipt) or detail (1 row = SKU × lot with carton pattern, weight, CBM, variance, evidence links) form.

**P1 must capture for later phases:** delivery method, after-hours/unannounced flags, urgent-request decisions, carton/CBM and receipt rounds. Billing (receiving fee, OT, urgent fee) needs these in P2.

---

## 2. Products

### 2.1 SKU master (consumed from OMS)
SKU master data is owned by the OMS: code, name, brand, category, variants, photos, cost, BOM, warranty method. The WMS shows it read-only and keeps only warehouse-local attributes: measured dims/weight, warehouse photos, warehouse tags, short name `[ASSUMPTION: short name is warehouse-editable]`, and the tracking settings the warehouse is permitted to set.

- **PR-1** System can sync SKUs from the OMS and show them read-only per owner.
  - SKU status: ใช้งาน, ใช้ให้หมดก่อนเลิก (default when retired in OMS), เลิกใช้, รอคลังตั้งค่า, ยังไม่เคยรับเข้า.
  - Cost is synced from the OMS with effective-date history. Missing cost → fallback value 100 THB/pc for valuation. Cost is visible only with the special permission "ดูต้นทุนสินค้า".
  - The SKU list shows a data-issue count (missing dims, missing barcode, units not accepted by warehouse rule).
- **PR-2** Warehouse staff can record warehouse-measured dims/weight, warehouse photos and warehouse tags on an SKU.
  - Shows owner-entered vs warehouse-measured vs used value. Warehouse-measured always wins, effective from the measure date, and every change is logged.
  - Warehouse tags (e.g. ระวังแตก, เก็บห้องเย็น) are hidden from the owner.
- **PR-3** System supports units of measure and barcodes per SKU.
  - One scan of a UoM barcode = that unit's quantity in the base unit. A unit's quantity is immutable after first use: add a new unit and close the old one.
  - Barcodes are unique within an owner. Extra barcodes are allowed only when the multi-barcode rule is ON.
  - Per unit: scannable steps, loose allowed, "ห้ามเปิดลัง" (sell by carton only).
  - An SKU whose base unit is not in the warehouse's accepted base units → "หน่วยไม่ตรงกฎคลัง · รับเข้าไม่ได้".
  - An SKU without a barcode can use a system QR derived from the SKU code (e.g. `SH:SH-BALM-15`), printable as a product label.

### 2.2 Lot, expiry & serial control
- **PR-4** Authorized user can set tracking per SKU: lot control, date basis (MFG + shelf life → expiry), minimum remaining shelf life, serial control (ไม่คุม / สแกนตอนแพ็ค / สแกนตั้งแต่รับเข้า) and serial source (manufacturer / system-issued).
  - A blank minimum shelf life falls back through the precedence chain.
  - SKUs flagged warranty-by-serial in the OMS must be serial-controlled.
  - "Scan from receiving" also enforces serial scans at move and count, so every serial's location is always known.
  - System-issued serials print as QR stickers.
- **PR-5** User can trace a serial: current location or order, status (ในคลัง / ส่งมอบแล้ว), and movement history.

### 2.3 Kits / sets
- **PR-6** System can sync kit BOMs from the OMS (read-only) and show buildable quantity (minimum over components).
  - BOM shows a version and component quantities.
  - Order-time explosion of a kit into component picks is owned by the Orders/Picking FRs. `[cross-ref]`
- **PR-7** Warehouse can execute kit assemble/unbundle orders received from the OMS (KIT_ASSEMBLE / KIT_UNBUNDLE).
  - Each run posts one SKU-conversion movement (`CV-YYMMDD-NNN`, ledger type เปลี่ยนรหัสสินค้า): −components / +kit, or the reverse.
  - Warehouse-initiated assembly requires approval. `[ASSUMPTION: internal approver in Business edition; owner approval is 3PL]`
  - Assembly auto-issues configured kit materials.
  - See OQ-3. In the sources, assembly runs as a VAS job (add-on).

### 2.4 Packing materials as stock
Boxes and materials are real stock items: received, stored, counted and deducted at use. The screens have two kinds: owner-supplied packaging (owner stock) and warehouse-owned materials (tagged 3PL-only in screens; listed as base-package "packaging as stock items" in settings-systems). See OQ-5.

- **PR-8** Authorized user can register a packaging/material item with type (บรรจุภัณฑ์ / วัสดุแพ็ค / วัสดุใช้ในคลัง), usable dims, weight, max load, deduction unit (ใบ/แผ่น/เมตร/ม้วน), storage bundle size and paired materials.
  - Base unit = smallest deduction unit (e.g. tape/bubble base = metre, receiving unit = roll of 100 m).
  - Barcodes are unique among warehouse items.
  - A new owner box is not recommended at pack until usable size, storage size and paired materials are set (status รอคลังตั้งค่า). Scanning it before then → warning plus supervisor confirmation.
- **PR-9** System treats packaging items as stock: received, put away, counted, moved and ledgered like products, with a reorder point per warehouse.
  - Deduction happens at box close (box + paired materials). Extra usage is a separate scan.
  - In-warehouse consumables (stretch film, gloves) are deducted on issue as "ใช้ไป" (see INV-12).
  - Supplier, lead time and purchase cost are read-only, owned by Zimple Purchasing (Later).

---

## 3. Inventory

### 3.1 Stock model & views
Stock is held per owner × SKU × lot × location. It is split into normal, returns and damaged sections. "พร้อมขาย" (ATP) is derived, and only normal stock can be reserved. Received-but-not-put-away stock is shown separately.

- **INV-1** System computes stock buckets per SKU, lot and location.
  - On-hand = normal + returns + damaged. It excludes awaiting-ASN stock (and in-transit stock, P2 transfer).
  - ATP = normal − reserved − blocked/below-shelf-life lots. Reservation draws only from normal stock.
  - Available-to-sell sent to the OMS = on-hand − pending orders (incl. staging and handover locations) − damaged/quarantine − returns locations. Item status overrides location type.
  - Stock stays visible until handover is confirmed. Deduction happens only at handover confirmation.
- **INV-2** User can view stock by SKU with lot/location drill-down, in-process rows (pick containers, staging, handover) and FEFO "pick-first lot".
  - Filters: สินค้าปกติ, มีรอจัดเก็บ, สินค้าคืน, สินค้าชำรุด, ต่ำกว่าจุดสั่งซื้อ, ล็อตใกล้หมดอายุ, หมด. Velocity: เร็ว/ปานกลาง/ช้า.
  - Excel export respects filters.
- **INV-3** User can view stock by location with type, #SKU/#lot, m³ and kg used vs capacity, last scan + user, and lock state (ล็อกนับ · CC-…).
  - Can print location labels in bulk.
  - The per-row heatmap is in scope `[ASSUMPTION]`. The visual layout map is P2.
- **INV-4** A user with access to more than one warehouse can view an all-warehouses aggregate per SKU, covering only the warehouses they are permitted to see. `[ASSUMPTION: P1 only if the pilot has >1 site; see OQ-8]`
- **INV-5** Warehouse lead can view an inventory dashboard: accuracy KPI vs target (99.4% vs 99.5% sample), replenishment needs, variances awaiting approval, near-expiry lots, space usage, and backlog tiles with "ค้างเกินเวลา".

### 3.2 Stock ledger, audit & reversal
- **INV-6** System records every quantity- or location-affecting event as an immutable ledger line `SL-NNNNNNNNN`.
  - Fields: timestamp, type/sub-type, doc no. + refs, warehouse · from → to location, lot, +/−, running balance, actor + device ID, m³ delta.
  - An internal move = 2 lines (−old/+new), total unchanged. A line is written only after the destination location is scanned.
  - Groups: รับเข้า, จ่ายออก, ใช้ไป, ปรับยอด, กลับรายการ, ย้าย, plus เปลี่ยนรหัสสินค้า. Opening balance shows as ยอดยกมา / นำเข้ายอดเริ่มต้น.
  - Lines cannot be edited or deleted. There is no manual stock-adjust function anywhere.
- **INV-7** Authorized user can request reversal of a ledger line of type receive, handover or return-receipt.
  - Creates an opposite SL that references the original, with qty ≤ original.
  - A reason is mandatory (รับเข้าซ้ำ / ตัดสต๊อกซ้ำ / รับคืนซ้ำ / บันทึกผิดล็อต / อื่น ๆ). Approval is required every time (system-locked).
  - Wrong moves are corrected by a new MV, never by reversal.

### 3.3 Moves & replenishment
- **INV-8** Staff can move stock between locations on PDA or web using a 3-scan sequence: source location or container → product + qty (or case barcode; no qty = all) → destination.
  - Scanning a pallet QR moves the whole pallet.
  - Checks: space, weight, room type, lot mixing, "ห้ามเก็บคละรหัส". Deviation from the suggested location needs a reason.
  - Move tasks are numbered `MV-YYMMDD-NNNN`. Status: รอเริ่ม → กำลังย้าย → เสร็จ (รอเหตุผล when an ad-hoc reason is missing).
- **INV-9** A user with the special permission "ad-hoc move" can move stock without a task. The system auto-creates an MV with status เสร็จ and posts it to the ledger immediately. A reason is always required (ชั้นหยิบเต็ม, จัดพื้นที่ใหม่, ของวางผิดที่).
- **INV-10** System generates replenishment tasks from pick-face min/max per SKU.
  - Scheduled batch every N min (system default 60; sample 30).
  - The reserve lot is chosen by FEFO.
  - Urgent replenishment (waiting orders exceed shelf qty, or a short pick) goes to the top of the PDA queue with sound and prints at the zone printer. On completion the picker is notified and the short line becomes "หยิบได้แล้ว".
  - A stuck move task alerts after 30 min.
- **INV-11** Warehouses without PDAs can print move sheets with QR codes and confirm the moves on web (rule "confirm by paper task").
- **INV-12** A user with the permission "เบิกใช้" can issue warehouse-owned materials or equipment for use.
  - Auto-creates an MV of type เบิกใช้ and deducts immediately.
  - More than 10 units per issue requires approval (threshold configurable).
  - A photo is mandatory when the activity is ชำรุด.

### 3.4 Counting
- **INV-13** Supervisor can create a count round `CC-YYMMDD-NNN` of type whole warehouse, zone/row, SKU list (optional lot) or velocity-based. An owner-scoped round is also possible `[ASSUMPTION: available in Business edition as a filter]`.
  - Options: counters (named, pairs, or anyone in the inventory dept), batch size (default 40 locations; can be overridden per round), split (equal / by zone), start (now / scheduled), visibility (blind default / visible), include empty locations, freeze inbound/outbound.
  - The scope preview shows locations with pending picks; those locations are counted after picking finishes.
  - A whole-warehouse round must be created ≥3 days in advance.
  - Round status: รอเริ่ม → กำลังนับ → รออนุมัติ → ปิดแล้ว.
- **INV-14** Counter can count on PDA by scanning location, product (case barcode adds pack qty) and serials.
  - Blind by default. In visible mode the counter still enters a qty; there is no "confirm system qty" button.
  - Counting locks only the location being counted.
  - Empty-slot and found-other-item actions are available. Pair counts require scanning the partner's badge.
  - An offline queue resends results when the signal returns.
- **INV-15** System resolves count results before adjustment.
  - Match → line auto-closes.
  - Mismatch → one recount by the same counter. Still mismatched → variance goes to approval without waiting for round completion.
  - Reason codes: สูญหาย, ของเกิน, บันทึกผิด, อื่น ๆ (note required), plus custom per-warehouse reasons, which can be disabled but not deleted. A photo can be required per reason.
  - Misplacement pairing (shortage at A + surplus at B, same SKU and lot) → MV "แก้วางผิดช่อง". No adjustment, not counted as loss.
  - Approval tiers come from the approvals engine (sample: tier 2 when > 5 pcs or 2% or 2,000 THB; the detail screen shows > ฿1,000 — see OQ-6). Self-approval is not allowed. Approve → ledger "ปรับยอด" with counter and approver.
- **INV-16** System creates an urgent single-location blind count when a picker reports a short with no alternative location, or when the last unit picked is answered "not empty".
  - Placed at the top of the inventory PDA queue, auto-assigned, with a deadline.
  - Found → location corrected and the pick task returns to the picker. Not found → variance to approval, and the order shows "สินค้าไม่พอ".
- **INV-17** System computes inventory accuracy = matching locations ÷ blind-counted locations (30 days; visible counts excluded) and the variance value at cost.

### 3.5 Lots, expiry & FEFO
- **INV-18** System allocates and suggests picks FEFO: earliest-expiry lot first, then pick face before reserve within a lot. Non-lot SKUs go by location, pick face first.
  - Effective minimum shelf life = strictest of warehouse · owner · shop · SKU. Lots below it are not allocated to orders whose threshold rejects them, unless the order specifies the lot.
  - Expired stock moves to the damaged/hold section and is excluded from ATP.
- **INV-19** User can view stock by lot/expiry with remaining days, threshold, locations and notified/not-notified grouping, and trace a lot back to its receipts. The view appears only when ≥1 lot-controlled SKU exists.

### 3.6 Damaged & on-hold stock
- **INV-20** Staff can move a unit into damaged/quarantine by scanning the "ชำรุดเสียหาย" QR, then the item, then the workstation damage tote (`DMG-T-NN`) or a DMG location.
  - Each scan is an instant MV. A full tote or shift end → one MV for the whole tote to a DMG shelf.
  - Cause, origin (receiving, putaway/storage, returns, cancel-return, owner recall) and photos are recorded on the item row. There is no separate damage document.
  - DMG locations have no suggested slot, are never picked, and are excluded from ATP.
- **INV-21** Authorized user can decide on a damaged/held item: dispose (photo evidence), return to owner/supplier (creates an outbound job), use again (MV back to shelf), or add excess to stock.
  - Disposal requires approval.
  - Items aged > 30 days alert and repeat every 7 days. No auto-dispose.
  - Release of a recall-held lot (ปลดล็อกล็อต) requires approval.
  - `[ASSUMPTION]` In P1 (Business edition) this is decided internally by permission. In the sources it is an OMS after-sales decision with a read-only WMS page; the owner RQ workflow is 3PL→P2. See OQ-4.

---

## 4. Settings

### 4.1 Warehouse → zone → location
- **ST-1** Admin can create warehouses with a 3-letter code (used in document numbers and QR codes), address, working calendar and holidays.
  - Disabling a warehouse is allowed only with zero stock, after approval.
- **ST-2** Admin can create zones with room type (ปกติ / temperature range), capacity m³, bound department/PDAs, walk-order pattern and location code format (2–6 levels).
- **ST-3** Admin can create locations, individually or in bulk, with type, zone, walk sequence, sellable flag, capacity (m³ · kg) and mixing policy (อนุญาต / ห้ามคละ).
  - 8 location types: หยิบ, เก็บ, รับเข้า, พักสินค้า, ส่งมอบ, คืน, รอคืนชั้น, ชำรุด/กักกัน.
  - States: ปิดใช้ (e.g. repair) blocks putaway and moves. ล็อกนับ is set by a count.
  - Location QR labels can be printed in bulk. Scanning a location QR finds it.
  - One SKU may occupy many locations.
- **ST-4** Admin can toggle "ใช้ประตูและจุดวาง" (default OFF) to define doors (no stock) and staging points (stock locations) bound to doors.

### 4.2 Warehouse rules & settings precedence
- **ST-5** Admin/warehouse lead can configure per-warehouse rules grouped by stage: inbound, picking, packing, inventory, handover, returns, cancel-to-restock. Each rule shows its level badge.
  - Rules in scope for these modules: F.2.1 items 1–2, 4–15, 18–20 and F.2.4 items 1–2, 4–15. Billing-only, 3PL-only and add-on rules are hidden in P1.
  - Unset rules use system defaults, so work can start immediately.
  - Every change has an effective date and history.
  - The settings hub shows "must set before use" blockers (e.g. unbound pack table) and a "still on system default" list.
- **ST-6** System resolves each setting by precedence: system default → company → warehouse → owner → SKU, most specific wins. The only exception is shelf-life thresholds, where the strictest wins (INV-18).
  - `[กฎรวมคลัง]` rules cannot be overridden below warehouse level.
  - Every screen shows the level a value comes from.
  - The owner level exists in the data model, but P1 has no UI to set it (settings-owners is P2). `[ASSUMPTION: owner-level values default to "ใช้ค่าคลัง"]`
- **ST-7** User can filter rules to "only those differing from default" and see the default beside each edited value. This is the new-sample variant; see OQ-2.

### 4.3 Users, roles & permissions
- **ST-8** Admin can create users with name, email or employee ID, one or more roles (optionally temporary, with expiry), warehouse scope and login methods (QR badge, username+password, optional OTP).
  - A suspended user cannot log in. The user count is capped by the package.
- **ST-9** Admin can create, copy, edit and delete roles with a page × action matrix: view · do · use on PDA · create/edit · cancel/delete · approve · print · Excel. Each role has a zone/work-point scope and a data scope.
  - Dependencies are auto-ticked (e.g. picking needs orders·view + inventory·view).
  - Same-role count + approve is flagged as a segregation-of-duties risk.
  - Changes apply at next login and are logged.
  - Default roles are badged ตั้งต้น. ผู้ดูแลระบบ is locked with all rights.
- **ST-10** Admin can grant special permissions: view product cost, act on behalf of owner, view video/photos, share video externally, cancel order after work started, day close, ad-hoc move, supervisor override when a scan fails, grant temporary role (≤ own rights, with expiry), view recipient PII (otherwise masked).
- **ST-11** Supervisor can issue reusable day-labour cards (บัตรรายวัน) with name/phone/agency, shift, allowed functions and optional 4-digit PIN.
  - Card status: ใช้อยู่, ค้างคืน, ว่าง, หาย. The card is auto-returned at shift end.
  - Phone is retained 90 days and visible only with a special permission.
- **ST-12** Customer admin can approve time-boxed, scoped Zimple support access. Critical changes need customer-admin approval: stock, roles, document numbering, connections/API keys, disabling SKU. A banner shows while access is active, and every action is logged.

### 4.4 Approvals engine (cross-cutting)
- **ST-13** Admin can configure each approval type with a step-1 approver role, a step-2 condition and an escalate-after time.
  - P1 types for these modules include: stock adjustment, reversal (always), opening balance, release stale reservation, release held lot, material issue over limit, dispose goods, rush inbound, early ASN close, short-shelf-life receipt, extra carton QR, extra barcode, skip weigh/measure, disable warehouse, bulk video delete (second admin), Zimple support critical change.
  - Money-related items (`เรื่องเงิน`) cannot be self-approved. Non-money items may be approved-by-doing, logged.
  - Unanswered approvals escalate to step 2, then to admin.
  - Pending approvals count is shown in the header/overview. Approvers are notified.

### 4.5 Notifications engine (cross-cutting)
- **ST-14** Admin can configure each notification type's channels (in-app · LINE · email) and recipients (role, involved people, selected users). The owner as a recipient is P2 `[ASSUMPTION]`.
  - Some types are `ปิดไม่ได้` (e.g. WMS≠OMS stock mismatch, video storage > 90%).
  - Users may mute LINE/email but never in-app.

### 4.6 Devices, stations, containers & numbering
- **ST-15** Admin can register IT devices (PC, USB scanner, PDA, printer, scale, camera), bind them to tables or work points, and test them.
  - Device status: ออนไลน์, ออฟไลน์ N นาที, พร้อม, กระดาษหมด, ต้องแก้, ยังไม่ทดสอบ.
  - A PC is bound to a table by a 6-digit code and flags missing attached devices on boot.
  - A table cannot receive work until its devices are bound and tested.
- **ST-16** Admin can define work points and tables. With the rule "จำกัดงานตามจุดงาน" ON, a device at a work point opens only that department's work, regardless of user rights. Unbound devices follow user rights.
- **ST-17** Admin can register container types with first code, count, stages used and capacity: PL, TT, BG, CG, C20/30/40, DMG-T, PW.
  - 1 container = 1 permanent QR. Codes are unique within a warehouse.
- **ST-18** Admin can set document and device numbering prefixes.
  - Documents use `PREFIX-YYMMDD-seq`, running across warehouses. Prefixes are 2–4 letters and unique.
  - A change affects new records only. Digits can increase but never decrease. Warns when the digit count is too small for peak volume.
  - Admin-only, with history.
- **ST-19** Admin can set video/photo retention (default 60 days) and storage location. Alert at 90% storage. Deletion goes through the system only, with a 7-day soft delete. Bulk delete needs a second admin. `[cross-ref packing evidence FRs]`

### 4.7 Admin tools & audit log
- **ST-20** System keeps an immutable activity log.
  - Fields: time · actor (user / ระบบอัตโนมัติ / OMS (API) / ทีม Zimple) · where (PC/PDA/table) · action · old → new · reason.
  - Covers login/out (incl. failed), create, edit, cancel, approve/reject, adjust/reverse, rule change, users & permissions, print/reprint, Excel export.
  - Filterable and exportable. Retention per package (sample: 1 year).
- **ST-21** Admin can release stale reservations (on-hand untouched; requires approval) and force-push WMS stock to the OMS (no approval; logged).
- **ST-22** System produces a daily stock reconciliation at 06:00 (balance vs sum of SL lines; WMS vs OMS) and a queue of failed outbound sends (OMS/carriers) after auto-retries.

---

## 5. Account, login & PDA login
- **AC-1** Warehouse office user can sign in on web with email/password, optional OTP (6 digits, resend after 45 s) when the company enables MFA, and select a warehouse if they have more than one.
  - 3 failed attempts → temporary lock (~15 min).
  - The reset link is valid for 30 min. The message is the same whether or not the email exists.
  - Idle session timeout logs the user out. A password change logs out other sessions.
  - MFA is always required for Zimple customer-care staff.
  - States: wrong password, locked, suspended, no permission (role without pages).
  - TH/EN switch. The current warehouse can be switched from the top-left selector.
- **AC-2** Floor staff can sign in on a PDA by scanning their employee badge QR (username/password only if enabled; no OTP), with an optional 4-digit PIN (default off).
  - One active PDA session per user. The user must log out on the other device first.
  - Unknown badge → red screen, beep and notification. An unregistered day card → "register with supervisor".
  - A role with no PDA page cannot log in.
  - Idle lock: rescan own badge to unlock.
- **AC-3** PDA main menu shows only role-permitted tiles with live counters, grouped as Receive–Putaway, Inventory (move/replenish, issue materials, count, cancel-restock), Pick–Pack–Ship and Supervisor. The header shows user, shift and warehouse.
- **AC-4** User can change their password and open help manuals per function. Help raises a ticket to the Zimple team (`SUP-…`) and shows a QR that opens the PDA login for a warehouse.

## 6. Overview dashboard
- **OV-1** Warehouse manager can view a real-time overview (refresh every 1 min) of today's KPIs.
  - KPIs: handed over vs total orders, awaiting handover (near cutoff), pack accuracy, on-time %, inventory accuracy, space used (locations), productivity vs target per stage, hourly handover/quality trends.
  - The order pipeline (รอสร้างใบหยิบ · รอหยิบ · กำลังหยิบ · รอแพ็ค · แพ็คแล้วรอส่งมอบ) has clickable segments that drill to filtered lists.
  - Date-range presets and the pending-approvals/notifications badges come from the EN variant. See OQ-9.

## 7. Basic reports
- **RP-1** Manager can open a report catalogue in which each report shows data-as-of time, filters (period, warehouse, owner, zone…) and Excel export (respecting filters), and can schedule auto-send (time, recipients, email/LINE).
  - Downloads are permission-gated and logged. Buyer PII is masked without permission.
- **RP-2** P1 report set `[ASSUMPTION: selection from the 13; core-only]`:
  - inbound analysis (short/over vs ASN, rounds, receive→sellable)
  - stock movement summary (opening → in/out/consumed/adjusted/conversion → closing, itemised by SL)
  - inventory accuracy (variance by period/zone/counter vs target 0.5%)
  - daily outbound & variance
  - packing materials usage
  - handover & on-time
  - returns analysis
  - staff performance
- **RP-3** User can save a report view and drill from a report to the filtered operational list ("ดูรายการ").

## 8. Migration from JST (P1 per brief)
Sources give only the opening-balance import (`OB-…`) and "bulk import/export" for admin tools. SKUs come from the OMS, not the WMS. Everything else here is `[ASSUMPTION]`.

- **MG-1** Admin can import opening balances from Excel into owner × SKU × lot × location.
  - Creates a document `OB-YYMMDD-NNN` with status รออนุมัติ. It always requires approval.
  - On approval, ledger lines of type นำเข้ายอดเริ่มต้น are posted.
  - Rows with an unknown SKU, location or lot format are rejected with a row-level error report. `[ASSUMPTION]`
- **MG-2** `[ASSUMPTION]` Admin can bulk import zones and locations (code, type, zone, capacity, walk sequence, sellable, mixing) from a template. Validation is all-or-nothing per file, and a dry-run preview is shown first.
- **MG-3** `[ASSUMPTION]` SKUs, barcodes, UoMs, kits and lot/serial settings reach the WMS through the OMS (Zimple OMS) sync. The WMS supplies a bulk import only for warehouse-local attributes (measured dims/weight, tracking flags if not OMS-sourced, short names).
- **MG-4** `[ASSUMPTION]` System supports a cutover check. After the opening-balance import, a full-warehouse blind count round can be run and the ledger total is compared with the imported total, followed by WMS→OMS stock push (ST-21).

## 9. Cross-cutting
- **X-1** Every stock-affecting or approval action records actor, device and reason in the activity log (ST-20) and the ledger (INV-6).
- **X-2** All stock, documents and SKUs carry owner_id, even in the Business edition. The UI hides owner pickers when the company has a single owner. `[ASSUMPTION]`
- **X-3** Every "ค้างเกินเวลา" threshold is configurable and drives a notification type (ST-14).
- **X-4** P1 captures data later phases need: CBM per SKU and location (P2 storage billing), receipt rounds/fees inputs, variance value at cost (P2 compensation), damage responsibility party, and the owner-level setting slot.

---

## 10. Glossary candidates
| Term | Definition |
|---|---|
| ASN / ใบแจ้งเข้า (AS) | Advance notice of goods to arrive. Sourced from the OMS. Format `AS-YYMMDD-NNN`. |
| Owner item list (ใบรายการสินค้า) | The owner's line list (`PO-<OWNER>-NNNN`) attached to an ASN. Read-only in the WMS. |
| Temporary receipt (TM) | Arrival record per vehicle round. Not stock. |
| Receipt (ใบรับ) | Closed result of receiving vs ASN. |
| Carton QR (CT) | Per-carton label printed at receiving. |
| Container (ภาชนะ) | Permanent-QR pallet/tote/bag/cage/cart. Always in a location. |
| Putaway | Placing received goods into a location. The point at which stock becomes sellable. |
| Quarantine / on hold (กักกัน) | Stock withheld from sale pending decision (DMG-H). |
| Damaged section (สินค้าชำรุด) | Damaged/expired stock. Not ATP, never picked. |
| Normal / returns / damaged sections | The three stock sections. Only normal stock is reservable. |
| ATP (พร้อมขาย) | Normal − reserved − blocked lots. |
| Stock ledger (SL) | Immutable movement log. Reversal only, never edit. |
| MV | Move/replenish/consume task document. |
| Replenishment (เติมชั้นหยิบ) | Reserve → pick face by min/max. Urgent on short pick. |
| Count round (CC) | Planned count. Blind by default. |
| Blind count | Counting without seeing system qty. |
| Urgent count | System-generated single-location count from a short pick. |
| Misplacement pair | Shortage + surplus of the same SKU/lot fixed by a move, not an adjustment. |
| FEFO | First-expired-first-out allocation. |
| Min remaining shelf life | Threshold below which a lot is not received or shipped without an exception. |
| SKU conversion (CV) | Kit assemble/unbundle movement. |
| Opening balance (OB) | Approved initial stock import. |
| Settings precedence | System → company → warehouse → owner → SKU. Most specific wins. |
| Rule level badge | กฎรวมคลัง / ตั้งรายเจ้าของสินค้าได้ / ตั้งรายคลังได้ / ปิดไม่ได้ … |
| Work point (จุดงาน) / table (โต๊ะ) | Physical station that scopes device work by department. |
| Day-labour card (บัตรรายวัน) | Reusable temporary badge for daily workers. |
| Special permission | Sensitive right outside the page × action matrix. |
| `เรื่องเงิน` | Approval class with no self-approval. |

## 11. Open questions / source conflicts
1. **OQ-1 Role list vs approval matrix.** The 11 roles lack หัวหน้าคลัง and หัวหน้าส่งมอบ, yet approvals (e.g. stock adjustment step 1) name them. There is also no inventory-dept role. Which P1 default roles exist?
2. **OQ-2 Two warehouse-rules designs.** settings-warehouse-rules vs new-sample (marked "ตัวอย่างใหม่ · พักไว้", with a diff-from-default filter). The system defaults differ from the sample values: receiving count all cartons vs random 2, replenishment 60 vs 30 min, cancel freshness 30 vs 15 min. The default rule set is "รอ product owner กำหนด". Which design and which default set?
3. **OQ-3 VAS / kit assembly phase.** The brief puts VAS in the P1 inbound flow. The screens make VAS an add-on module, and kit assembly runs as a VAS job. Are inbound labelling VAS and kit assembly in P1?
4. **OQ-4 Disposition of damaged/over-receipt goods in Business edition.** The sources route it to OMS › after-sales with a read-only WMS page. Does the pilot decide in the WMS (INV-21) or in Zimple OMS? Does Zimple OMS have that after-sales feature at pilot time?
5. **OQ-5 Warehouse-owned packaging materials.** products-warehouse-items is tagged `3pl`, but settings-systems lists "packaging as stock items" in every package, and a brand owner also buys boxes. Confirm it is in P1 for the Business edition.
6. **OQ-6 Count approval thresholds.** The approvals matrix says tier 2 at > 5 pcs or 2% or 2,000 THB. The count-detail screen says 2 levels > ฿1,000. Which applies?
7. **OQ-7 Missing putaway PDA screen.** The feature inventory (§6) notes there is no PDA file for putaway (only 6 steps inside inbound-pda-sample). All PDA pages are "reference only". The PDA UX for putaway, receive and count needs design.
8. **OQ-8 Multi-warehouse in P1.** Does the pilot run more than one site (บางเขน/สายไหม samples)? This determines INV-4, warehouse selection at login and per-warehouse migration. TF is excluded.
9. **OQ-9 Overview variants.** The EN overview has a date range, customer filter, approvals/notifications badges and cycle-time KPI that the TH version lacks. Which is canonical?
10. **OQ-10 ASN ownership vs creation.** The confirmed decision says the OMS owns ASNs, but screens allow "คลังสร้างแทน" (IN-2) and warehouse-own goods ASNs. Keep IN-2 in P1?
11. **OQ-11 Migration scope.** The sources do not define a JST export format, open in-flight orders/ASNs at cutover, or historical ledger carry-over. MG-2–MG-4 are assumptions. Also, does Zimple OMS import SKUs from JST, or does the WMS?
12. **OQ-12 Time & calendar settings phase.** Warehouse calendar, shifts and stuck-time alerts (settings-time-tracking) feed inbound hours and SLA alerts but are P? in the brief. Are calendar and alerts in P1 (with workforce calc deferred)?
13. **OQ-13 Owner notifications without Portal.** Many inbound rules "notify owner" (short count, shelf life, new SKU dims). In P1, is the channel the OMS, LINE/email to an owner contact, or suppressed?
14. **OQ-14 Day-labour cards.** These are tied to the workforce add-on partially, but PDA login depends on them. Keep them in P1 (ST-11)?
15. **OQ-15 QC at receiving.** The sources have photo/condition capture and "เกณฑ์รับของเจ้าของสินค้า" (seal, dented boxes) but no dedicated inbound QC step or QC location flow (QC-01 is for returns). Is a separate inbound QC inspection needed?
