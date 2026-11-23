---
title: "FR candidates — Outbound (Orders · Picking · Packing · Handover · Cancellations · Returns)"
status: draft-input-for-prd
created: 2026-11-19
sources: extract-screens.md (§C Picking/Packing/Handover, §D Orders/Returns, §B.6 Cancel-returns, §F.2.2–F.2.7, F.3, F.5, products material/box rules), extract-feature-inventory.md (§1.2–1.5, §2.2), extract-brief.md, .memlog.md decisions
---

# FR candidates — Outbound

**Scope guard.** Phase 1 only. Orders, SKUs and ASNs are owned by the OMS (pilot: Zimple OMS; prospects: JST/Zort/etc. connectors or generic API). WMS never creates, edits or cancels orders; it can hold them and must react to OMS cancellations. Marketplace orders use marketplace-issued carrier + label obtained via OMS; direct carrier API only for non-marketplace orders. All records are owner-scoped even though P1 targets one brand-owner pilot. Billing, claims, Client Portal, Transport add-on, TV mode are out of scope; where P1 must *capture* data for them it is listed in §7 (no FRs).

**Conventions.** Actors: Supervisor (หัวหน้า), Planner/CS (office staff), Picker, Packer, Handover staff, Returns staff, Admin, System. ID format `XX-YYMMDD-NNNN` (Gregorian YY, not Buddhist era). "Configurable" = warehouse rule in กฎงานคลัง with 5-level precedence (system → company → warehouse → owner → SKU; most specific wins). [ASSUMPTION] = inferred, not stated in sources.

---

## 1. Orders

**1.1 Order intake & lifecycle.** Orders arrive from the connected OMS with stock already reserved and are tracked through a fixed stepper until delivered. The warehouse sees one unified order record regardless of channel; it cannot modify order content. Carrier data (tracking no. + label) must be present before an order can enter picking.

- **FR-ORD-01** System can ingest orders from the connected OMS (Zimple OMS in pilot; partner OMS connector or API for others) and reserve stock on receipt.
  - Each order gets an `SO-YYMMDD-NNNNN` number and retains channel, channel order no(s), external ref, source ref, owner, carrier, cut-off, recipient, lines.
  - Duplicate submissions are de-duplicated by source reference.
  - No email-file or warehouse-side import path exists for orders.
  - Merged shipments show all channel order numbers ("รวมส่ง N คำสั่งซื้อ").
- **FR-ORD-02** System can track each order through the stepper รับคำสั่งซื้อ → ข้อมูลขนส่งครบ → หยิบ → แพ็ค → รอส่งมอบ → ส่งมอบขนส่ง → ส่งถึงผู้รับ.
  - List buckets: รอข้อมูลขนส่ง, รอสร้างใบหยิบ, รอหยิบ, กำลังหยิบ, รอแพ็ค, แพ็คแล้วรอส่งมอบ, กำลังนำส่งศูนย์, ส่งมอบแล้ว, จัดส่งสำเร็จ, ผิดปกติ, ยกเลิก (by stage).
  - Post-handover milestones (carrier scanned, delivered) come from OMS/carrier events.
  - Status changes are pushed back to the OMS (status, tracking, stock).
- **FR-ORD-03** System can hold orders lacking carrier data in `รอข้อมูลขนส่ง` and exclude them from pick-list creation.
  - System re-pulls carrier data every 5 min.
  - After 2 h without data, the owner is notified.
  - Marketplace orders obtain carrier + label via OMS; non-marketplace orders request tracking + label from the carrier (Logistics Gateway) on order entry.
  - Unmapped carrier names hold the order + alert; the system never guesses a carrier ("ระบบไม่เดาชื่อขนส่ง"); orders requeue once mapped.
- **FR-ORD-04** CS can search and filter orders by status, channel, owner, carrier, tag, and by order no./channel no./external ref/tracking/recipient.
  - Owner column is shown on every row.
  - Tags supported: ส่งด่วน, B2B, COD, มูลค่าสูง, มีเอกสารใส่กล่อง, หลุดรอบ, ใกล้หมดอายุ, etc.
  - Price/discount columns are visible only with permission `ดูราคาและส่วนลดคำสั่งซื้อ`; COD and total value are visible to all.
- **FR-ORD-05** CS can view an order detail with lines (SKU, lot·expiry, pick location, qty / picked / packed), its pick lists, packing record and a timestamped timeline.
  - Packing record shows packer, station, duration, check method, box, actual vs expected weight, materials, inserts, pack-video link.
  - Timeline records each stage event with actor and time, incl. container placement and stock deduction.
  - An order with multiple pick lists (child lists, zone splits) shows the consolidation point (e.g. tote TT-0218).

**1.2 Hold & owner change requests.** The only warehouse-side intervention on an order is a hold; content changes happen in the OMS.

- **FR-ORD-06** Supervisor/CS can hold one or many orders ("พักคำสั่งซื้อ") with a reason, and release them.
  - Held orders cannot be added to pick lists; held orders already in progress stop at the next scan (see FR-CXL-02).
  - No edit/cancel controls exist on orders in WMS.
  - Hold reason appears under `ผิดปกติ · พักไว้ · รอคลัง`.
- **FR-ORD-07** System can stop work on an order when the OMS signals an owner change request, and Supervisor can approve or reject the request once picking has started.
  - Before pick: order is excluded from pick-list drafts.
  - During pick/pack/handover: PDA shows stop + put to hold location; box cannot be closed; loading scan shows "ห้ามส่ง · เจ้าของสินค้าขอแก้ไข".
  - Outcomes recorded: ส่งกลับแล้ว / ปฏิเสธ + reason / ถอนคำขอ / ดึงไม่ทันรอบ.
  - Recalled orders are held until end of day, extendable once ("สิ้นวัน · 1 ครั้ง").

**1.3 Cut-off board (web).** Supervisors need one view of today's risk by carrier wave; the wall-TV rendering is out of scope.

- **FR-ORD-08** Supervisor can view today's orders by stage, channel and carrier wave with a cut-off risk status per wave.
  - Wave pills: `HH:MM · ทัน`, `HH:MM · เสี่ยง`, `ช้า N นาที`.
  - Slack = pack-complete deadline − (remaining work ÷ team's actual speed today); negative slack suggests extra headcount or deferring N orders to the next wave.
  - Alerts fire 60 and 15 min before pack cut-off.
  - Urgent list includes ส่งทันที orders near platform auto-cancel, waves expected to miss, and exceptions near deadline.
- **FR-ORD-09** Admin can configure carrier pickup rounds per warehouse (round times, pack cut-off, days, handover mode, door, effective date).
  - A carrier with no pickup round cannot ship jobs.
  - Edits are date-effective with history; campaign days can add rounds.
  - Handover modes: ภาชนะตามรอบ, ทีละคำสั่งซื้อ (rider), ตามขนาดงาน (>5 boxes or pallet → door), ตามเที่ยวรถ.
  - Pack-complete deadline = carrier pickup − X min (setting); Instant = pack within 30 min; Same Day = 60 min before truck.

---

## 2. Picking

**2.1 Pick rules & list creation.** Planners group eligible orders into pick lists via a draft wave, either from system recommendation or manually. Rules decide method, splitting and lot/location allocation; allocation happens at list creation, not in the draft.

- **FR-PCK-01** Supervisor can define pick rules (conditions, product scope, method, split limits) at global or owner level, versioned and approved before activation.
  - Precedence (first match wins): mandatory global → owner-specific → general global → warehouse default; owners can be exempted from general global rules.
  - Owner rules cannot override owner/lot/expiry/product-status restrictions.
  - Editing creates a new version; existing lists keep their version reference.
  - Split limits e.g. max 300 orders / 2,000 pcs per list.
- **FR-PCK-02** Planner can create pick lists in recommended or manual mode through a draft wave `WV-YYMMDD-NNN`, then split, merge, move or remove lists before confirming.
  - Owner is the only mandatory filter; shop selectable only when exactly one owner is selected.
  - Draft orders are reserved to that user with a countdown (e.g. 10 min), extendable or discardable; removing a list returns its orders to the pool.
  - Excluded from drafts: orders awaiting carrier data, awaiting secondary-warehouse transfer, held, or under owner change request.
  - Split algorithm: by pick method → by carrier wave → max N orders by paid time → container capacity (slots, volume, weight, pieces).
- **FR-PCK-03** System can assign a pick method per list from six methods: ตามคำสั่งซื้อ, คำสั่งซื้อสินค้าชิ้นเดียว, รหัสสินค้าเดียวจำนวนมาก, คำสั่งซื้อรูปแบบเดียวกันเป็นชุด, หลายคำสั่งซื้อพร้อมคัดแยก, รวมหลายคำสั่งซื้อ.
  - Pick list number `PK-YYMMDD-NNNN`; re-pick child `PK-…-1`.
  - The pack method is stored on the list (default from rule "วิธีแพ็คเริ่มต้นตามวิธีหยิบ").
  - Slotted carts only for sort-while-pick; put walls only for batch; others use tote/flat cart/pallet; oversized orders get a whole flat cart or pallet.
- **FR-PCK-04** System can allocate lot and location at list creation using FEFO → pick locations before storage → fewest slots → slots emptied exactly.
  - Pick-face shortage with storage stock is not a blocker: an urgent replenishment `MV-` is created and the line moves to list end.
  - Only warehouse-wide stock absence blocks the order.
  - Min remaining shelf life to ship is enforced (SKU-overridable).
  - A SKU across several locations becomes several stops (1/2, 2/2).
- **FR-PCK-05** [Add-on per screens; P1 per brief — see OQ-3] System can auto-generate pick lists per owner × service level when a threshold or time trigger is met.
  - Triggers: tote full (40), full carton, cart slots full, or time ("ครบ หรือ 13:30", "60 นาทีก่อน SPX 16:00").
  - Cap on open lists (e.g. 4/4 → not released).
  - Mode: create automatically or wait for warehouse confirmation.
  - A cancelled system list's order set is not regenerated immediately.

**2.2 Queue, assignment & printing.**

- **FR-PCK-06** System can order the pick queue by supervisor priority override (reason required) → nearest carrier wave → oldest order queue time.
  - Service priority: ส่งทันที → รอบด่วน → รอบปกติ; ส่งทันที = 1 order per list, auto-created, auto-printed, top of queue.
  - Queue time = paid time (platform) / created time (off-platform), configurable.
  - Unassigned lists appear in every picker's `งานรอรับ`; claiming locks the list to that picker.
- **FR-PCK-07** Supervisor can assign lists and print/reprint them; System tracks print status per list.
  - Status: ยังไม่พิมพ์ / พิมพ์แล้ว (time · user · printer) / พิมพ์ซ้ำ ครั้งที่ n (reprint marked "สำเนา").
  - System lists auto-print at the zone printer; a failed print reverts to unprinted and alerts.
  - Paper format configurable: thermal 80 mm or A4, with QR.

**2.3 PDA picking & verification.**

- **FR-PCK-08** Picker can execute a pick list on PDA following a snake route in location order, scanning cart/tote, location and items per the verification matrix.
  - Cart/tote scan at start is always required; wrong type warns.
  - Location scan mandatory for lot-controlled items; every-piece scan may be disabled only for single-SKU bulk and identical-set lists (scan location + first piece + qty); always on for sort-while-pick, serial and high-value items.
  - Entering less than required prompts "short or later?"; entering more is blocked.
  - Only Supervisor can change verification settings; changes are audited.
  - Offline scans queue and sync when signal returns.
- **FR-PCK-09** Picker can pick by unit of measure, with sealed-carton QRs counting a full carton.
  - Use order: sealed cartons → opened-carton remainder → open a new carton.
  - A carton QR already shipped is rejected.
  - Mixed lots in one slot allowed only for GS1 barcodes; otherwise location scan confirms the lot.
- **FR-PCK-10** System can ask the picker to confirm an emptied location after the last piece; "No" creates an urgent count `CC-`.
- **FR-PCK-11** Picker can drop picked goods at a staging spot by scan; System tracks container custody.
  - Picked stock moves location → cart/tote; container and carrier are traceable.
  - Wrong staging spot warns.
  - Pick list `เสร็จสิ้น` means handed to packing, not shipped.

**2.4 Short picks.**

- **FR-PCK-12** Picker can report a short ("ของไม่พอ") and System can resolve it through a 5-step flow without auto-adjusting stock.
  - Steps: record actual qty → alternative pick location with usable unallocated lot → urgent replenishment MV → location count CC (order `รอตรวจสต๊อก`) → if nothing found, owner-side `สินค้าไม่พอ` and variance awaits approval.
  - Short statuses: รอตรวจนับ, รอเติม, หยิบได้แล้ว, ปิดแล้ว, รออนุมัติปรับยอด.
  - Re-pick produces child list `PK-…-1`; the pack station waits for all parts.
  - System analyses shorts per location over 7 days to suggest pick-face min/max.

**2.5 Sorting & equipment.**

- **FR-PCK-13** Sorter can sort batch-picked goods into put-wall slots by scanning items; System shows the target slot.
  - Slots follow order-queue order; slot status ครบ / บางส่วน / ยังไม่เริ่ม / ผิดปกติ · รอของขาด.
  - A complete slot can be released to packing immediately; re-release does not duplicate pack jobs.
  - Wrong slot = undo last scan; over-picked items return to shelf.
  - Sort-while-pick has no slot scan; wrong slot is caught at packing.
- **FR-PCK-14** Admin can register carts (C20/C30/C40), put walls (PW, e.g. 144 slots), totes (TT), flat carts (FC), pallets (PL) with capacity, one permanent QR each, and print labels.
  - Cart status: ว่าง / รอเคลียร์ของ (residue from a cancelled list) / ซ่อม.
  - Live usage shows which list holds each container.
- **FR-PCK-15** System can roll orders still open when a wave's truck leaves into the next wave, tagged `หลุดรอบ` and counted in KPIs.
  - If no wave meets the due date, the order becomes at-risk.
  - Customer pickup uses appointment time, not fixed waves.
- **FR-PCK-16** Supervisor can view picking overview: remaining orders by carrier cut-off, ETA vs cut-off, blockers, picker status, pcs/hour per picker (standard 120–400 by method), hourly output vs plan.
  - Pickers cannot see or close pack jobs (separation of duties).

---

## 3. Packing

**3.1 Pack jobs & methods.** A pack job is created with the pick list and shares its number; it becomes ready once pick/sort finishes. The pack method is resolved from any scan via the pick list.

- **FR-PAK-01** System can create one pack job per pick list (same `PK-` number; single urgent orders use the SO number) at status `รอเตรียมงาน`.
  - Flow: รอเตรียมงาน → กำลังเตรียม → พร้อมแพ็ค → กำลังแพ็ค → แพ็คสำเร็จ; side tags ผิดปกติ / ยกเลิก / พัก with reason and wait time.
  - `พร้อมแพ็ค` once pick/sort complete (and prep dispatched, if prep is used).
  - No new paper: pick-list QR, cart or label opens the job.
  - An order cannot close until all its parts arrive (e.g. waits for child `PK-…-1`).
- **FR-PAK-02** Packer can pack using four methods: แพ็คตามคำสั่งซื้อ, แพ็คตามใบหยิบ, แพ็คแบบไลน์ผลิต, แพ็คหลายกล่อง.
  - By order: opened by scanning the pre-printed label; every piece and the packaging scanned.
  - By pick list: scan list + first piece → system picks an unpacked matching order; label prints at box close.
  - Production line: one box type for the line; per-box label scan + random full scan (e.g. every 20th); serials always scanned; reconcile picked = output + waste + leftover.
  - Multi-box: "เปิดกล่องใหม่" per box; each box gets content list and label n/total; invoice goes in the last box.
- **FR-PAK-03** Supervisor can change a job's pack method (reason required); Packer can only switch to multi-box via "ต้องใช้หลายกล่อง".
  - Default pack method comes from rule; unused methods can be disabled per owner.
  - Scanning a production-line label before the line is opened redirects the packer.

**3.2 Station scan-pack, weight, documents.**

- **FR-PAK-04** Packer can scan-verify every item at a pack station; System blocks wrong SKU and over-scan with audible/red-screen alerts.
  - Non-disableable steps: scan start, scan close, every piece or UoM barcode, serial/valuables every piece, cancellation check before label print.
  - Kits show components and are packed together.
  - Actions: ลบชิ้นล่าสุด, พักงาน, ผิดปกติ.
- **FR-PAK-05** System can check box weight against expected weight within tolerance.
  - Tolerance = larger of ±5% or 20 g.
  - Weight from connected scale or manual entry (logged "พิมพ์เอง"); weighing on/off per warehouse rule.
  - Out of tolerance → box held (พักกล่อง); Supervisor opens and inspects.
- **FR-PAK-06** System can print the shipping label and in-box documents when all items are scanned correctly, status → `แพ็คแล้ว`.
  - Cancellation status is re-checked immediately before label print; order shows "ไม่ถูกยกเลิก · HH:MM:SS".
  - Documents: receipt/tax invoice 80 mm, warranty card, owner PO / B2B invoice, Shipping Mark, per-box content list.
  - Batch printing prints only never-printed labels; reprint requires Supervisor approval and the count is logged.
  - Platform labels are never edited.
  - Printer failure: reprint, choose another printer, or print at a desk.

**3.3 Box suggestion & materials consumption.**

- **FR-PAK-07** System can recommend a box and backup ranks per order; Packer can scan any other box without a reason.
  - Default by product size; warehouse box rules (whole-warehouse or per-owner; per-owner wins) apply to warehouse boxes.
  - Owner box rules precedence set → promotion → group; owner box mode: owner's first / warehouse by size / owner's only.
  - Owner box not yet configured (usable size, storage size, paired materials) is not recommended; scanning it needs Supervisor confirmation.
  - "ใช้กล่องเดิม": no stock deduction, no packaging charge, no reason.
- **FR-PAK-08** System can consume packaging and paired materials from stock when a box closes.
  - Exactly one packaging scan per box (box/bag/envelope) is mandatory; others count as inner material.
  - Material precedence: SKU/box direct setting → rule (lower priority number first) → owner all-jobs → warehouse default.
  - Extra usage via "บับเบิ้ลเพิ่ม"/"วัสดุเพิ่ม" scan; skipping a rule needs a reason.
  - Deduction units ใบ/แผ่น/เมตร/ม้วน (bubble/tape base unit = metre).
- **FR-PAK-09** System can prompt inserts (freebies, flyers, cards) per owner insert rules, scanned or prompted-only per setting.
  - All matching rules are inserted (conditions e.g. order value ≥ ฿999, first-100 cap, channel, date window).
  - Insert stock is deducted at handover; no material charge.
  - Missing material: if owner rule allows continuing, the shortage is logged for review.

**3.4 Pack video.**

- **FR-PAK-10** System can record video per order at stations with a camera, linked to the order and its exceptions.
  - Video must continue through label print and show that order's label; it stops on the close-video QR or next-job scan.
  - PDA camera priority: bound IP camera → PDA built-in → none = single "ไม่มีวิดีโอ" warning and work continues (recorded as no video); USB cameras not usable with PDA.
  - Production-line packing: per-order clip cut from line video by label-scan time (−30 s / +30 s).
  - Retention default 60 days (owner-overridable); claim-linked clips locked until case closed; manual delete admin-only with reason; every view/lock/delete logged.
- **FR-PAK-11** CS/Supervisor can open an order's pack video from the order, exception or cancel-return job.

**3.5 Stations & routing.**

- **FR-PAK-12** Admin can register pack stations (`PS-NN`) bound to PC, scanner, label/receipt/A4 printer, scale and camera, and test each device.
  - Stations not bound and tested cannot receive work ("ส่งงานเข้าโต๊ะไม่ได้จนกว่าจะผูกและทดสอบผ่าน").
  - Stations with faulty camera/scale/printer receive no work; faults auto-detected.
  - Work-point restriction: devices at a work point open only that department's work.
- **FR-PAK-13** System can route jobs to stations/zones and Supervisor can reassign stations or change station mode.
  - Two stations can never pack the same order.
  - Urgent jobs go to the first free station; queue sorted by required pack-complete time.
  - Unassigned job binds to station + packer at first scan.
  - Identical-list jobs may be split across stations.
- **FR-PAK-14** Packer can raise a packing exception; Supervisor can resolve it from an exceptions queue.
  - Types: ของขาด, ผิดรหัสสินค้า, น้ำหนักผิดปกติ, วัสดุไม่พร้อม, เอกสารพิมพ์ไม่ได้, ถูกยกเลิกระหว่างแพ็ค, หลักฐานไม่ครบ, กล่องไม่พอ.
  - Case states: รอแก้ / พักกล่อง / ส่งหัวหน้า / ปิดแล้ว; every case links to the order's video.
  - KPIs: exception rate, mean time to resolve per type (7 days), orders/hour per packer, boxes/hour per station.
- **FR-PAK-15** [Add-on per screens; P1 per brief — OQ-2] Prep staff can prepare boxes/materials per prep sheet (same number as pick list) and dispatch to a conveyor/desk.
  - Materials reserved at sheet creation; material pick is an MV; stock deducted at box close; leftovers return via putaway.
  - Dispatch requires materials picked + sort complete + box assembly (if chosen); wrong conveyor scan = red screen.
  - Desk-side top-up task when a box type falls below its minimum (e.g. 12 < 20 → +50).

---

## 4. Handover

**4.1 Sort-to-container (pre-handover sorting status).** Closes the JST gap: parcels get an explicit sorted state before loading. Containers are permanent, carrier-agnostic until first use.

- **FR-HND-01** Handover staff can sort packed parcels into handover containers in container-first or parcel-first mode, switching modes without closing the container.
  - Each scan checks: packed ✓, carrier matches container ✓, not cancelled ✓, showing cancellation-data timestamp.
  - Wrong carrier → red screen; cancelled → red screen, place at `CXL`, scan its QR, return job auto-created (`แพ็คแล้วรอคืน`).
  - No open container for carrier/wave: scan any empty container to bind it; none left → scan `OUT-S0` and alert.
  - Sorted parcel → order status `รอส่งมอบ` with container + wave recorded.
  - Container use configurable: all carriers / per carrier / none (then tracking scanned at handover); change effective next day.
- **FR-HND-02** Handover staff can close a container, recording a seal number.
  - Container status: เปิดอยู่ → ปิดแล้ว → กำลังส่งมอบ → ส่งมอบแล้ว.
  - Containers with cancelled boxes go to list top and cannot be handed over until pulled; pulling from a closed container requires breaking the seal and scanning a new seal.
  - Capacities from register (bag `BG-` 40, cage `CG-` 120, pallet `PL-`).
  - All accounts of one carrier (e.g. Flash) share containers; the manifest splits by account.

**4.2 Carrier handover & manifest.**

- **FR-HND-03** Handover staff can register the arriving vehicle (plate, driver, photo) and scan containers (not boxes) onto it.
  - Seal mismatch → "ค้นหาในภาชนะ": scan each box, reseal.
  - Optional weighing (off by default) flags container variance.
  - Unscanned containers at confirm can be split off as pending; manifest recounts.
- **FR-HND-04** Handover staff can confirm handover, which is the stock-deduction point (SHIPPED).
  - Before confirm, stock stays on hand; truck no-show moves goods to next wave with no return transaction.
  - Drop-off-booked parcel collected by carrier is allowed on the manifest.
  - Non-scanned inserts are deducted here.
- **FR-HND-05** System can produce a manifest `MF-YYMMDD-NNN` per handover, with child manifests `MF-…-n` per shop/carrier account.
  - Every handover type gets an MF; parent = sum of children; a multi-box order counts as 1.
  - Proof: PDA/tablet signature (default) or signed paper + photo; without signature/photo a second person approves (`รออนุมัติ · ไม่มีหลักฐานส่งมอบ`).
  - Carrier receipt via API is reconciled per parcel; shortage (`ขนส่งรับไม่ครบ N`) opens a case; never confirm a total and fix later.
  - Without API, Supervisor certifies receipt.
- **FR-HND-06** Handover staff can hand over to a customer pickup by appointment, verifying the collector.
  - Order becomes `พร้อมให้รับ` when packed; one appointment can cover several orders of one owner; 1 MF per appointment; confirm only when every box is scanned.
  - ID card check; ID photos retained 90 days.
  - No-show 30 min after appointment → back to front pickup point; waiting > 3 days → remind owner.
- **FR-HND-07** [ASSUMPTION — Transport add-on excluded] Handover staff can hand over own-fleet (คลังจัดส่ง) loads with plate/driver typed in; departure = stock deduction.

**4.3 Day close & cut-off.**

- **FR-HND-08** Supervisor can view handover overview: parcels not handed over by wave, truck status (รถมาถึงแล้ว / ช้า N นาที), cancellations to pull, carry-over, daily reconciliation per carrier.
  - Daily equation: packed today = handed over + cancelled before handover + pending (no overlap); carry-over not added to today's packed.
  - Instant delivery rider no-show: "เรียกรถใหม่" sends a request to OMS before platform auto-cancel.
  - Doors/staging are system-assigned; every move requires scanning item then new spot, logged with reason.
- **FR-HND-09** Supervisor (special permission) can close the day only after the checklist passes.
  - Checklist: all waves closed; all cancellations pulled; leftovers physically counted by scan; every not-found parcel has a case owner (`MP-YYMMDD-NNN`); every carrier-refused parcel inspected.
  - Status `ยังปิดไม่ได้ · เหลือ N ข้อ` until complete.
  - Closing snapshots the summary; not editable afterwards.
  - Carry-over creates no new order, parcel, stock or fee and keeps the original pack date.

---

## 5. Cancellations across stages

**5.1 Stage-aware reaction.** OMS/platform cancellations can arrive at any stage; WMS enforces them at each scan point and routes goods back to stock. Cancelled-but-never-shipped goods are handled here; goods that left and came back are Returns.

- **FR-CXL-01** System can ingest OMS cancellations and classify each by stage reached: ก่อนหยิบ, หลังหยิบ, หลังแพ็ค, หลังส่งมอบ, recording the cancel actor (buyer / platform / owner-care).
  - ก่อนหยิบ → order removed, reservation released.
  - หลังหยิบ / หลังแพ็ค → cancel-return job `KB-YYMMDD-NNN` [prefix INFERRED in source].
  - หลังส่งมอบ → expected return created (FR-RET-01).
  - Cancellation data older than 15 min triggers a re-pull warning at sort/handover.
- **FR-CXL-02** System can enforce the cancellation at every scan point.
  - Pick: unstarted list cancellable whole (reason required); after start, per order only and picked goods go to return staging; whole-list cancel after start is a setting, default off; cancelled list's QR shows "cancelled".
  - Pack: label print locked immediately, goods to return location, exception `ถูกยกเลิกระหว่างแพ็ค`.
  - Sort/container: red screen; container blocked until pulled.
  - Handover: pull-out at handover (default) or immediately on cancel (setting).
- **FR-CXL-03** Handover staff can reconcile carrier-rejected labels by scanning each returned label then `CXL`.
  - `ตรงกัน` → packed, awaiting return.
  - `ขนส่งรู้ก่อน` → removed from manifest, awaits verification; if not truly cancelled → next wave.
  - System-cancelled but not carrier-rejected → must be pulled.
  - Label from another wave → red screen, not deducted.
- **FR-CXL-04** [Business edition: confirm — OQ-6] Supervisor can approve a cancel-after-pick request for self-pickup / own-fleet orders with a cost notice; before pick is always allowed.

**5.2 Cancel-return to shelf.**

- **FR-CXL-05** Staff can process a cancel-return job: scan label or tote → scan items → scan return container.
  - Packed → must unbox at `CXL` first; unpacked → straight to return container.
  - Packaging used is recorded as consumed; original label is void and must never be reused.
  - Damaged piece: scan "ชำรุดเสียหาย" QR → item → damaged tote (`DMG-T`).
  - Missing items → search case + urgent count on the container.
  - Unbox station without camera allowed; recorded as "no video".
  - Job states: รอเปิดกล่อง, กำลังเปิดกล่อง, กำลังดึงจากตะกร้า, รอเก็บคืนชั้น, เก็บคืนชั้นแล้ว, ค้างเกินกำหนด.
- **FR-CXL-06** System can auto-close return-to-shelf containers and create the restock move.
  - Close when any: 30 pcs, every 2 h, 1 h before last truck, an order waits for that SKU; a new container opens automatically.
  - If another order waits for the SKU, the container is marked urgent and diverted to it/pack station.
  - Put-back slip auto-prints at zone printer.
- **FR-CXL-07** Staff can restock cancel-return goods by scanning item/container then location.
  - Stock counts as `สินค้าปกติ` from cancellation; becomes pickable ("ขายได้") only on location scan.
  - Wrong location scan warns, no move.
  - Must clear before last truck; overdue flagged.

---

## 6. Returns

**6.1 Expect & receive.** Returns of goods that left the warehouse are expected from system events, received per carrier drop-off, matched to the original order, and quarantined until inspected.

- **FR-RET-01** System can create expected returns from: cancel after handover, carrier failed delivery, platform return request (via OMS), owner notification (via OMS), claim recall.
  - Each shows original parcel/return no., SO, owner, source, booker (warehouse vs marketplace), wait window.
  - Overdue window: warehouse-booked per carrier (Flash 7 · J&T 7 · SPX 10 days); marketplace-booked follows platform SLA; overdue → track carrier, then close or escalate.
  - Pills: ระหว่างทาง, เกินกำหนด N วัน, รับแล้ว, ขนส่งแจ้งถึงแล้ว (check at dock).
- **FR-RET-02** Returns staff can open a return receipt `RT-YYMMDD-NNNN` per carrier drop-off, scan every label, and close it with on-screen driver signature.
  - Carrier lock: other carriers' labels rejected (configurable to warn only).
  - A parcel can be received only once (`พัสดุนี้รับคืนแล้ว`); never-handed-over tracking is rejected.
  - New buyer-return label → `รอสแกนเลขเดิม`; "ไม่มีเลขเดิม" QR → quarantine.
  - Receipt states: กำลังรับ → รอเซ็นรับ → เซ็นรับแล้ว.
- **FR-RET-03** System can quarantine unmatched parcels at `Q-RET-01` and open a problem report automatically.
  - Staff cannot assign the owner; owner confirmation required.
  - Not stocked, not auto-discarded; alert after 30 days, repeat every 7.
  - Order look-back window for suggested match configurable; staff can search all.

**6.2 Inspect, restock, report.**

- **FR-RET-04** Returns staff can inspect each unit at a camera-equipped station and grade it: สภาพดี, ชำรุดเสียหาย, รหัสสินค้าผิด, หมดอายุ, บรรจุภัณฑ์เสีย, ไม่ใช่ของเจ้าของสินค้า.
  - Non-good grades require ≥ 1 photo; video recorded automatically.
  - Stock is added at inspection save, only for physically scanned units; unscanned shipped units → `ไม่ครบสูญหาย` + RP auto-opened.
  - Kit missing a component → `เซตไม่ครบ` → quarantine + RP; serial mismatch → not sellable, segregated, alert.
  - Damaged and expired go to damaged stock immediately; return-to-owner items → `RET-HOLD-02`.
  - Pending inspection alert after 2 days.
- **FR-RET-05** Staff can restock inspected good items by scanning item/container then location.
  - All returns start as `สินค้าคืน (รอตรวจ)`; sellable only after inspection and location scan.
  - Wrong location → warning, no move.
  - Claim-recall returns are received without increasing stock (never deducted).
  - Owner rule may require VAS before restock; VAS done ≠ sellable (re-inspect).
- **FR-RET-06** System/Returns staff can raise a problem report `RP-YYMMDD-NNNN` with photo/video evidence, problem type, source and claim-against party.
  - Types include กล่องบุบ, กล่องเปียก, ซีลถูกเปิด, ไม่มีใบปะหน้า, น้ำหนักต่าง, Serial/ล็อตไม่ตรง, ได้คืนเกิน, ไม่พบคำสั่งซื้อ (15 total).
  - Status รอดำเนินการ → ดำเนินการแล้ว; handling หน้างานจัดการแล้ว / รอเจ้าของสินค้าอนุมัติ.
  - Handling follows the return rule matrix (16 problems; who decides is owner-overridable).
  - Owner decision deadline 7 days; after that, keep stored.
- **FR-RET-07** Supervisor can view a unified return-job board per parcel: รอรับคืน → รับเข้า → ตรวจสภาพ → รอเจ้าของสินค้า / งานเพิ่มเติม → เก็บคืนชั้น → เสร็จ, with overdue, throughput and restock-rate KPIs.
  - Refund/compensation decisions are made in OMS after-sales, not in WMS.

---

## 7. Data P1 must capture for later phases (no FRs)

- Fee signals per order/event: packing performed (or not, on cancel-during-pack), cancellation stage + order type (platform: fee on handover; off-platform/pickup/own-fleet: fee after pick), packaging vs owner-box use, paired/extra materials, insert rule applied, drop-off reason + payer, after-hours handover per owner, rush acceptance + wave met, return receipt date for unmatched parcels (back-dated billing).
- Evidence chain for Claims: pick scan logs → pack video → weight → manifest + seal → carrier API events; carrier-short reconciliation cases.
- Owner-visible fields for Portal: video availability ("no video"), RP evidence, owner decisions pending.

## 8. Glossary candidates

- **Pick list (ใบหยิบ, PK-)** — unit of picking work; also the pack-job and prep-sheet number. Child `-1` = re-pick.
- **Wave / draft wave (รอบหยิบ, WV-)** — editable draft grouping orders into pick lists before confirmation.
- **Carrier wave / pickup round (รอบรับพัสดุ)** — a carrier's scheduled pickup time with its pack cut-off.
- **Pack cut-off** — latest pack-complete time for a wave = pickup time − X min.
- **หลุดรอบ (missed wave)** — order rolled to the next wave after its truck left.
- **Sort-while-pick** — multi-order picking directly into cart slots.
- **Put wall (PW)** — slotted shelf where batch-picked goods are sorted per order.
- **Short pick (ของขาดตอนหยิบ)** — required qty not found at the allocated location.
- **Pack job (ใบงานแพ็ค)** — packing work for one pick list.
- **Pack video** — per-order station recording that must show the order's label.
- **Paired material (วัสดุคู่)** — material auto-consumed with a box or SKU at box close.
- **Insert** — owner-rule freebie/flyer/card added at pack; stock deducted at handover.
- **Handover container (BG/CG/PL)** — permanent QR-labelled bag/cage/pallet bound to a carrier + wave on first use.
- **Seal no.** — number recorded on container close; mismatch triggers in-container search.
- **Manifest (ใบส่งมอบ, MF-)** — signed handover record per wave/appointment; child per account.
- **Handover confirm** — stock-deduction point (SHIPPED) for carrier handover.
- **Day close (ปิดวัน)** — checklist-gated snapshot of the day's handover.
- **Carry-over (ยกไป)** — unhanded parcels moved to the next day without new records or fees.
- **CXL** — cancelled-goods hold location / unbox table.
- **Cancel-return job (ยกเลิกรอคืน, KB-)** — work to return goods of an order cancelled before leaving.
- **Return receipt (RT-)** — one carrier's return drop-off session.
- **Expected return (รอรับคืน)** — system-created record anticipating a returning parcel.
- **Problem report (RP-)** — evidence-backed issue on a return for owner decision.
- **Q-RET-01 / RET-HOLD-02 / DMG-T** — return quarantine / return-to-owner hold / damaged tote.
- **Owner change request (เจ้าของสินค้าขอแก้ไข)** — OMS-originated request that halts warehouse work on an order.

## 9. Open questions (source conflicts & gaps)

- **OQ-1 Owner change request & hold protocol with OMS.** Screens assume an edit-request round-trip (approve/reject after pick start, deadlines) and owner-care acting on behalf — via Portal. Does Zimple OMS expose this, and what is the P1 channel for owner decisions (RP, change requests, quarantine) with Portal in P2?
- **OQ-2 Pre-pack prep & VAS at pack.** Brief lists both as P1; screens flag them add-on (โมดูลเสริม). In or out for pilot?
- **OQ-3 Auto pick lists.** Brief: "manual or automatic" in P1; screens: add-on. Confirm.
- **OQ-4 Production-line packing.** Core per screens but tagged Phase-2 candidate [INFERRED] by extraction. Pilot volume justify it?
- **OQ-5 Video storage.** Primary NAS + on-demand cloud copy is implied architecture; P1 needs only local retention (60 d) + in-WMS playback? Cloud copy mainly serves Portal/Claims (P2).
- **OQ-6 Cancel-after-pick approval (F.2.7.1).** For Business edition (brand-owner pilot) is approval + cost notice meaningful, or is cancel always immediate?
- **OQ-7 Rush requests (คำขอจัดด่วน).** Marked 3PL-only and billable; any P1 equivalent for brand-owner?
- **OQ-8 Own-fleet & customer pickup.** Own-fleet trips depend on the excluded Transport add-on; customer-pickup verification depends on Portal. Keep minimal P1 versions (FR-HND-06/07) or defer?
- **OQ-9 Stock deduction point.** Orders screen says "รถออก · ตัดสต๊อก" generally; handover says confirm handover. Confirm: carrier = confirm, own-fleet = departure.
- **OQ-10 Carrier API scope.** Post-handover receipt reconciliation and delivered events — from OMS for marketplace orders and from Logistics Gateway for non-marketplace? Who owns tracking events in P1?
- **OQ-11 KB- prefix** is inferred; confirm numbering for cancel-return jobs.
- **OQ-12 Handover weighing, door re-assignment, late-truck decision** — extraction marks Phase-2 candidates [INFERRED]; confirm.
- **OQ-13 Returns VAS** is add-on; owner-rule "re-bag before restock" depends on it — P1 behaviour when off?
