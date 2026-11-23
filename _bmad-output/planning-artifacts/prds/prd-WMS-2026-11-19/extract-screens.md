# Screen Capability Inventory — Zimple Fulfillment WMS mockups

- **Source:** `artifact/Zimple Fulfillment Screens (Copy)/` (141 root HTML + 20 `owner-portal/` HTML = 161 HTML files — the "~144" figure was the directory entry count; plus `zwms-theme.js`, `warehouse/zwms-theme.js`)
- **Extracted:** 2026-11-19. Method: visible text was pulled from each HTML (headings, table headers, buttons, status badges, labels, select options, notes) with CSS/JS stripped, and truncated notes were re-checked against the raw HTML.
- **Faithfulness:** everything below comes from mockup text. Anything inferred is marked **[INFERRED]**. Mock brand shown in titles: "Fullfeel Fulfillment"; product names: Zimple Fulfillment (3PL) / Zimple WMS (Business).

## 0. Module index & edition flags (direct evidence)

Every warehouse-side page carries a design toggle **"Zimple Fulfillment (3PL)" vs "Zimple WMS (Business)"** plus an **"โมดูลเสริม" (add-on module)** checkbox. A per-page JS flag `var pg=` drives the following banners:

| `pg` flag | Banner shown | Meaning |
|---|---|---|
| `""` (empty) | none | Page exists in both editions → **core WMS** |
| `"3pl"` | "หน้านี้มีเฉพาะ Zimple Fulfillment (3PL) · Zimple WMS (Business) ไม่มีเมนูนี้" | **3PL-only** |
| `"cl"` | "Zimple WMS (Business) ไม่มีเมนูเคลม · เคสและเคลมขนส่งอยู่ใน OMS › บริการหลังการขาย" | Claims: 3PL edition only; Business edition handles claims in OMS |
| `"po"` | "Zimple WMS (Business) ใช้หน้าจัดซื้อของ Zimple Purchasing … ใบสั่งซื้อมาถึงคลังที่ รับสินค้าเข้า" | Purchasing is a shared Zimple Purchasing product; the WMS touchpoint is receiving |
| `"ad"` | "หน้านี้เป็นโมดูลเสริม · บริษัทที่ไม่ได้เปิดโมดูลนี้จะไม่เห็นเมนูนี้" | **Add-on module** |
| (no flag) | — | Owner Portal, login/account, PDA login menu, TV mode, index, theme-tool |

| Module (prefix) | # screens | Edition flag | Classification |
|---|---|---|---|
| inbound | 9 | core | Core WMS (owner-approval loops = 3PL layer) |
| putaway | (inside inbound) | core | Core |
| purchase | 7 | `po` | Separate product (Zimple Purchasing), not WMS core |
| products | 8 | core; `products-box-detail`, `products-warehouse-items` = `3pl` | Core SKU master; warehouse-owned items/boxes = 3PL |
| planning | 7 | `ad` | Add-on (workforce/QC/labour) → Phase 2 |
| inventory | 21 (incl. 3 PDA) | core | Core; VAS, temperature, layout (ระยะ 2), transfers billing = add-on/3PL |
| picking | 10 | core | Core; auto pick-list = add-on |
| packing | 8 | core | Core; prep/box assembly and packing VAS = add-on |
| handover | 7 | core | Core |
| transport | 6 | `ad` | Add-on → Phase 2 |
| orders | 5 | core | Core (orders originate in OMS; WMS cannot create/cancel) |
| returns | 8 | core | Core; returns VAS = add-on |
| claims | 5 | `cl` | 3PL-only |
| billing | 6 | `3pl` | 3PL-only → Phase 2 |
| owners (warehouse side) | 4 | `3pl` | 3PL-only → Phase 2 |
| owner-portal/ | 20 | n/a (client portal) | 3PL client portal → Phase 2 |
| settings | 18 (+ `new-sample-settings-warehouse-rules`) | core; `settings-owners` = `3pl` | Core config; per-owner override layer = 3PL |
| overview / reports | 2 + 3 | core | Core |
| account / login / pda-login-menu / index | 2 + 1 + 1 + 1 | none | Core shell; index = design sitemap |
| theme-tool | 1 | none | Design utility, not product |

Counts above cover all 161 HTML files. The inventory count includes `inventory-vas-work-screen-sample` and the 3 `inventory-pda-*` files.

## 0.1 Cross-cutting findings (summary)

1. **Two editions in one codebase:** 3PL (multi-owner) vs Business (single company owns the goods). Owner settings, billing, claims and owner pricing are hidden in Business mode.
2. **Add-on modules toggled per company or warehouse:** workforce planning, pre-pack prep and materials, auto pick lists, truck/transport, VAS, temperature control. Phase-2 labels seen: the floor-plan/layout editor ("ผังคลังเป็นงานระยะ 2"); temperature-sensor integration listed as future work.
3. **OMS is the system of record** for orders, SKUs and ASNs: Zimple OMS, partner OMS (JST, Zort, Page365, BigSeller) or API. The WMS never creates, edits or cancels orders; it can only hold them ("พักคำสั่งซื้อ").
4. **Settings precedence:** system default → company → warehouse → owner → SKU, most specific wins. Changes are date-effective with history.
5. **Immutable stock ledger:** no manual adjust. Changes come only through count adjustments (approval required), MV- moves, or approved reversals (SL-).
6. **Shared evidence chain:** pick scan logs → pack video (must show that order's label) → weight check → handover manifest and seal → carrier API events. This chain feeds orders, returns and claims.
7. **Approval engine:** 47 approval types with 2 steps, escalation, and no self-approval on money items. **Notification engine:** 77 types over in-app, LINE and email; some cannot be turned off.
8. **Roles:** 11 roles with per-page and per-action permissions (view / do / PDA / create / cancel / approve / print / Excel) plus 12 special permissions. Inconsistency: the approval matrix names roles that are not in the role list (หัวหน้าคลัง, หัวหน้าส่งมอบ).
9. **Devices:** PDA/handheld (QR badge login, optional PIN, 1 active device per user) for receive, putaway, move/replenish, count, pick, prep, pack, handover, restock and QC spot checks. Desktop stations with fixed IP camera and NAS for receiving video and pack video. Label/document printers, scale, TV board (cut-off status), driver app (transport add-on).

---

# Section A — Inbound · Purchase · Products · Planning

Source: 31 mockups (`inbound*`, `purchase*`, `products*`, `planning*`) of "Fullfeel Fulfillment" (Zimple Fulfillment screens). Sample warehouse: คลังบางเขน (main), คลังสายไหม. Sample owners (เจ้าของสินค้า): BeautyNara, HealthyMe, Mommy Care, Siam Herb, Pet Lover, NatureBox.
Product family names seen: Zimple OMS, Zimple Purchasing, Zimple WMS, Zimple Fulfillment, Zimple Accounting, "ระบบสำหรับเจ้าของสินค้า" (owner portal).

### Cross-module ID formats observed
| Prefix | Meaning | Example |
|---|---|---|
| AS- | ใบแจ้งเข้า (Advance Shipping notice / expected inbound) — shared numbering between Purchasing and WMS | AS-261013-004 (YYMMDD-seq) |
| TM- | ใบรับเข้าชั่วคราว (temporary receipt, 1 per vehicle arrival) | TM-261010-002 |
| PO- | ใบรายการสินค้า from owner (owner-side PO, owner-prefixed) | PO-BN-5521, PO-HM-0912 |
| PO- | Warehouse's own purchase order (Zimple Purchasing) | PO-261028-006 (YYMMDD-seq) |
| TF- | Transfer between warehouses (inbound side) | TF-261013-003 |
| TR- | Transport/vehicle trip | TR-261013-005 |
| PL- | Pallet / container (ภาชนะ) with permanent QR | PL-0041 |
| CT | Carton QR (QR ลัง) | (prefix only) |
| VA- | งานเพิ่มเติม (VAS job), also kit assembly | VA-261013-031 |
| RQ- | Accepted off-list inbound item line | "RQ-…" |
| CV- | Kit assemble/unbundle movement "เปลี่ยนรหัสสินค้า" | "CV-" |
| WP- | Workforce plan, WP-YYMM-seq, revisions suffix -1, -2 | WP-2610-022-1 |
| CC- | Cycle count round | CC-261020-002 |
| PK- / SO- / RT- | Pick list / sales order / return (seen in QC spot-check) | PK-261030-0044, SO-261030-02110, RT-261030-0021 |
| T-0xx | Daily worker badge (บัตรรายวัน) | T-046 |
| Locations | A-03-02 (zone-rack-level), C-01-01 (cold), DMG-H (quarantine), BOX-07, IN-S (parcel receiving point), IN-D1/IN-D2 (inbound doors), OUT-D1, PS-01..10 (pack stations), LINE-01, PREP-01, QC-01, RET-IN, INV-01, VAS-01, OTH-01, P-02 (staging) | |
| Serial | SN-884231 / BN-SRM-0001042 | |

---

## inbound (รับสินค้าเข้า) — 9 screens

### Screens
| File | Purpose |
|---|---|
| inbound.html | ภาพรวมรับเข้า — inbound dashboard: vehicles today, doors, staff, backlog by stage, hourly output vs plan, urgent-receipt requests, per-owner performance |
| inbound-expected.html | รายการรอเข้าคลัง — expected-arrival queue (AS list), plus "พัสดุเข้าที่ไม่มีใบแจ้งเข้า" (unmatched parcels held at IN-S) |
| inbound-create-expected.html | สร้างสินค้ารอเข้าคลัง — create AS on behalf of owner (คลังสร้างแทน) or for warehouse-own goods; 5-step form |
| inbound-temp-receipts.html | ใบรับเข้าชั่วคราว (TM) — receipts issued on vehicle arrival before/without owner item list; driver signs |
| inbound-receive.html | รับเข้าสินค้า — desktop receiving station (full-screen mode like pack station), scan PO → count → lot/expiry → print carton QR → load pallet; video recorded |
| inbound-pda-sample.html | PDA sample (reference only, not a menu) for receiving + putaway flows, 8 receive steps + 6 putaway steps |
| inbound-putaway.html | จัดเก็บเข้าตำแหน่ง — putaway queue with suggested locations, space shortfall, assign putaway staff |
| inbound-receipts.html | ใบรับเข้าสินค้า — all receipts all statuses, video/photo evidence, KPIs per owner/receiver, Excel export |
| inbound-vas.html | งานเพิ่มเติม (optional module · โมดูลเสริม) — inbound VAS jobs (barcode labelling, Thai label, bubble wrap, zip bag, repack) |

### Key entities & fields
- **ใบแจ้งเข้า (AS)**: owner (incl. "คลัง · สินค้าของคลัง"), receive-at warehouse (คลังหลัก / พื้นที่สำรอง), notified via (LINE/โทรศัพท์/อีเมล), notifier name+phone, reference no. (delivery note / production order), arrival date, time slot (shows remaining doors, e.g. "10:00–11:00 · เหลือ 1 ประตู", "เต็ม"), room type (ปกติ / ห้องคุมอุณหภูมิ, with ranges 2–8 °C, 15–25 °C), delivery method (เจ้าของสินค้าส่งเอง vs ให้คลังไปรับ), carrier, vehicle type (4 ล้อ/4 ล้อใหญ่/6 ล้อ/กระบะ/รถตู้), plate, driver, pickup point, contact, ready-for-pickup time, transport charging (เรียกเก็บเจ้าของสินค้า / ต้นทุนคลัง), estimated pallets/cartons/weight/CBM, rough description, flags (new SKU without dimensions, lot/expiry controlled, fragile, liquid, needs barcode/QR before storage), linked owner item lists (ใบรายการสินค้า, 1 AS : many lists), attachments.
- Queue columns: คิว · เลขใบแจ้งเข้า·ใบรายการสินค้า · เจ้าของ · กำหนด·จำนวนที่แจ้ง · การขนส่ง · ดำเนินการ.
- **Unmatched parcel**: tracking no.·carrier, sender (from label), held at (IN-S), received at.
- **ใบรับเข้าชั่วคราว (TM)**: no.·datetime, sender·carrier (plate, driver, km), received qty (cartons/pallets), progress (received x/y, remaining), linked PO(s), photos, outer-package count (declared vs counted), weight on scale, condition photo, sender e-signature.
- **Receiving line**: SKU, lot (from PO ✓ or entered), MFG date, expiry (computed from shelf life), unit dims/weight (edit applies to this batch only), carton pattern (แบบกล่อง: pcs/carton, dims, weight; pick from history or new; or warehouse packaging "Fullfeel-Box-C" which is charged), cartons × pcs + loose (เศษ) + damaged (ชำรุด), carton QR count, container/pallet.
- **Pallet / container (ภาชนะ)**: PL-xxxx, cartons, pcs, mixed SKUs, weight, CBM, suggested location; QR carton statuses.
- **Putaway row**: pallet·qty, lot·expiry, CBM·kg, suggested location; per-PO totals.
- **Receipt (list)**: PO · TM · datetime, cartons · SKUs · pcs, CBM, duration · receiver, video/photo count.
- **VAS job**: VA no. · mode (ตามเอกสาร / ตามช่วงเวลา), PO · owner, job type · qty, status · worker, source (กฎเจ้าของสินค้า / เจ้าของสินค้าสั่ง·OMS / คลังสร้าง / งานแก้ไขของคลัง), due time; form inputs include rate (0.80), date range, capacity "40 / วัน".

### Workflow states / badges
- Overall flow: "เจ้าของสินค้าแจ้ง → ของมาถึง (ใบรับเข้าชั่วคราว) → รับเข้าสินค้า พร้อมวิดีโอ" → จัดเก็บ → พร้อมขาย.
- Backlog stages (inbound.html): 1 รอเข้า → 2 มาถึงแล้ว (TM: รอใบรายการสินค้า / รับบางส่วน) → 3 กำลังรับ → 4 รอจัดเก็บ → 5 พร้อมขายวันนี้; each with "ค้างเกินเวลา" (over stage SLA, configurable).
- AS / queue pills: รอพิจารณา (pending review), ขอรับด่วน (urgent request), เลยกำหนด N วัน (overdue), มาถึงแล้ว (arrived), รับบางส่วน (partially received), ระหว่างโอน (in transfer), รอเข้า (awaiting), รอจัดรถ / ยังไม่ได้ขอรถ / ได้รถแล้ว (vehicle status), เลื่อน 1 ครั้ง (rescheduled once), คุมอุณหภูมิ, พื้นที่สำรอง (overflow site), จากคู่ค้า (from linked partner), ขนส่งพัสดุ, รถของคลัง, ผู้จำหน่ายส่งเอง, คลัง.
- TM pills: นอกเวลาทำการ (after hours), ไม่มีใบแจ้งเข้า, ต้องตัดสินใจ, รอใบรายการสินค้า (awaiting owner item list), ค้างไม่ยืนยัน (unconfirmed >2h), ไม่ได้แจ้งล่วงหน้า (not pre-notified), ไม่มีข้อมูลรถเข้า (no vehicle data), รับบางส่วน, ครบแล้ว, ปิดใบแล้ว (closed with reason).
- Receiving line pills: ครบ, ขาด N (short), ชำรุด (damaged), กำลังนับ, ยังไม่นับ, ต้องวัดขนาด (needs measuring), QR ลัง 4/6, "สั่ง 0 · รับ 24 · เกิน 24 รอยืนยัน" (over, awaiting owner confirmation), "นอกใบรายการ · ยอมรับ".
- Pallet: กำลังวางของ / เปิดอยู่ / ปิดแล้ว. QR carton: ปิดผนึก (sealed) / เปิดแล้ว (opened) / ส่งออกแล้ว (shipped).
- Receipt pills: กำลังรับ, รอจัดเก็บ, กำลังจัดเก็บ, จัดเก็บแล้ว, ไม่ได้แจ้งล่วงหน้า, ขาด 10 กล่อง, กล่องแตก 1.
- Putaway pills: รอจัดเก็บ, กำลังจัดเก็บ, จัดเก็บแล้ว, ด่วน · คำสั่งซื้อรอ 46 ชิ้น, ของฉัน · ทำต่อ, ต้องแยกวาง · 2 ตำแหน่ง.
- VAS pills: รอเจ้าของสินค้าอนุมัติ, กำลังทำ, เกินกำหนด, เสร็จแล้ว, รอทำ, เจ้าของสินค้าไม่อนุมัติ.
- Door/staff table: เสร็จแล้ว, กำลังรับ, คนรับไม่พอ · ขาด 1, พอ, เข้าโดยไม่แจ้ง.
- Urgent-check result: ทัน (feasible), ระบุเพิ่ม.

### User actions (buttons)
+ สินค้ารอเข้าคลัง, Excel, พิจารณา, สินค้ามาถึง, รับเข้าสินค้า, ขอรถไปรับ, จับคู่ใบแจ้งเข้า, นำเข้า Serial (import serials from template), บันทึก / บันทึก + แจ้งอีกรายการ / ยกเลิก, แนบใบส่งของ / แนบรูป, ออกใบรับเข้าชั่วคราว, พิมพ์ใบรับที่เลือก, กักไว้ที่จุดรับ, ถ่ายรูปสภาพ, ให้ผู้ส่งเซ็นบนจอ, ออกใบรับ + พิมพ์, จบการรับ, + เพิ่มแบบลัง, + เพิ่มล็อต, บันทึก แล้วพิมพ์ QR ลัง, พิมพ์ QR ลัง N ใบ, ปิดภาชนะ / ปิดพาเลท, ย้ายของไปพาเลทอื่น, พิมพ์ QR ลังซ้ำ (ใส่เหตุผล), พักงาน, ปิดใบรับ · ตรวจยอด, แจ้งปัญหา, ผูกเป็นบาร์โค้ดเพิ่มของรหัสนี้, เตรียมพื้นที่, พิมพ์ป้ายที่เลือก, มอบหมายผู้จัดเก็บ, เริ่มจัดเก็บ, แบ่งพาเลท · ได้ป้ายพาเลทใหม่, พิมพ์ป้ายพาเลทใหม่, ยืนยันวางที่ (with reason), งานถัดไป, จัดเก็บ / ออกใบรับ / รับเข้า (urgent row actions), งานตามช่วงเวลา / งานตามใบรายการสินค้า (VAS), โหมดเต็มจอ.

### Roles implied
- Floor staff: receivers (สมชาย, แอน), putaway staff, VAS workers (นิด) — PDA or desktop station.
- Supervisor/หัวหน้า: approves short-shelf-life receipt, toggles full-screen, decides on urgent requests, assigns putaway, closes receipts with reason.
- Office/admin: creates AS on behalf of owner, requests vehicles, matches unmatched parcels, Excel.
- Owner (client): creates AS & item lists in owner portal/OMS, confirms over/off-list items, approves VAS, receives notifications (short counts, address change).
- Transport module users (จัดการรถขนส่ง) receive vehicle requests.

### Business rules visible
- AS is primarily created at Zimple Purchasing / owner side; "หน้านี้ดูอย่างเดียว" — warehouse can create on behalf (คลังสร้างแทน). Owner "คลัง" = warehouse-own goods without PO (samples, supplier freebies); goods with a PO are notified at จัดซื้อ › แจ้งสินค้าเข้าคลัง.
- Receive-at default = main warehouse; warehouse can switch to overflow area (พื้นที่สำรอง) until goods arrive → system notifies owner with new address; receiving fee unchanged.
- Time slots show free doors; full slots still selectable but raise alert (ตั้งค่าบริษัท › การแจ้งเตือน).
- "ให้คลังไปรับ" auto-creates vehicle request "รับเข้า · ขอรถไปรับ" in transport module; inbound does not book vehicles itself. Without transport module: enter plate/driver/time/cost manually.
- New-SKU flag → system reminds owner to enter dims/weight before arrival. Barcode-labelling need → VAS job requiring owner approval.
- Warehouse cannot create/edit owner item lists; at receiving warehouse records actual lot/MFG/expiry (history kept). Goods arriving before item list → TM with status "รอใบรายการสินค้า". Item lists can be added up to receiving time.
- Overdue jobs always top of queue; "ขอรถไปรับ" only shown for pickup jobs without vehicle. Urgent = order waiting for stock, vehicle arrived with no receiver, cold goods outside room.
- Urgent request: system feasibility check (door free, team, prior jobs); must answer owner by deadline (e.g. 16:00); undecided → alert. After-hours arrival: choose "รับด่วน (เข้าระบบทันที)" vs "ลงของไว้ก่อน (คิวปกติ)" + overtime fee (e.g. 2 คน × 1.5 ชม.) + urgent receiving fee.
- Unmatched parcel (tracking no. not matching any AS) → held at IN-S, matched later.
- TM issued on every arrival (1 vehicle = 1 round; both PO and TF receipts). TM open/unconfirmed >2h → alert (configured in กฎงานคลัง › รับเข้า). Must confirm previous round before opening new on same PO. TM auto-closes when PKG complete; manual close requires reason. Unannounced vehicle requires reason at TM issue. 1 TM can link many item lists.
- Outer count shortfall (declared 30, counted 28) → recorded on TM and owner notified. TM printed 2-part at desk or mobile printer; not yet counted as available.
- Receiving: scan PO opens job; scanning 1 item = select SKU (not count). Carton-received goods must be split per carton to print carton QR (print ≤ number of cartons). Count 100% of cartons (เปิดนับแล้ว 6/6); system checks carton dims ÷ pcs ≈ unit dims. Owner receiving criteria (เกณฑ์รับของเจ้าของสินค้า) produce warnings.
- Shelf life below owner threshold (e.g. 53 days left < 90-day owner minimum) → accept only with supervisor confirmation; owner notified.
- Over-receipt doesn't stop work: "เกิน · รอเจ้าของสินค้ายืนยัน", excess to quarantine (DMG-H). Option to return to sender with driver signature + photo if owner configured. Off-list SKU: hold in inspection area awaiting owner, or delete as mis-scan. Another owner's SKU scanned = red screen, reject.
- Serial: per-SKU setting "รับเข้าและแพ็ค" requires scan every piece at receiving; 1 serial = 1 location; duplicate rejected + alert. "ไม่ใช้"/"แพ็คอย่างเดียว" skip.
- Unknown barcode: if owner rule "รับหลายบาร์โค้ดใน 1 รหัสสินค้า" on → bind as extra barcode (requires approval, owner notified; no duplicate barcodes within owner). Rule off (default) → reject, set aside, alert.
- Containers: permanent QR, only types ticked "รับเข้า" in ตั้งค่าคลัง › อุปกรณ์และภาชนะ; closing a container immediately creates putaway task. No container → carton QR (CT) used, closed on save. Must close open pallets before closing receipt.
- Video recorded for every receipt at desktop station with camera; PDA has no video (photo only). Warehouses without PDA use desktop receive page.
- Putaway: stock not available until putaway confirmed (scan location → available immediately). Suggestion by room type + existing location of SKU + capacity (free %, kg). Sort: urgent (orders waiting) → temperature-controlled → oldest. Non-suggested location → reason required; wrong room type / overweight / location closed or under count → blocked. Mixed pallet → system knows in advance, scan per carton or split pallet (new pallet label). Lot & expiry must be entered before putaway confirm. Alerts: putaway >2 h (cold room 30 min). Putaway completion reserves stock for waiting orders and releases orders from "สินค้าหมด" exception to pick list in owner-defined order; owner portal sees stock instantly.
- KPIs: target arrival → ready-to-sell within 4 h (setting); hourly plan vs actual (alert >15% under plan); lunch break from shift settings; plan derived from expected queue.
- VAS: source rules — owner rule auto-creates; owner-ordered (OMS/portal) do immediately at agreed rate; warehouse-created needs owner approval (unless pre-approved); warehouse correction work not billed; typed notes don't create jobs; 1 document + 1 job type = 1 job; bill only completed qty with evidence; mandatory VAS must finish before putaway.
- Receipts Excel: summary (1 row = 1 receipt) or detail (1 row = SKU × lot with carton pattern, weight, CBM, variance, video/photo links).

### Devices implied
PDA handheld scanner (with camera for photos, no video), desktop receiving station with camera (video recording) in full-screen station mode, receiving-desk printer + portable printer (TM 2-part slip, carton QR, pallet labels), scale (น้ำหนักชั่ง, "ถ้ามีตาชั่ง"), on-screen signature (PDA), forklift (split pallet), audible scan alerts.

### Multi-owner / 3PL indicators & judgement
Owner filter ("ทุกเจ้าของ" + "คลัง · สินค้าของคลัง"), per-owner thresholds (shelf life, barcode rules, return-to-sender), owner approvals (over-receipt, VAS), owner notifications/portal, charging transport to owner, receiving fee, urgent/overtime fees, per-owner KPIs. **Judgement:** receiving, TM, putaway, PDA flows = **core WMS**. Owner approval loops, VAS billing, urgent-request fees, charge-to-owner, owner portal visibility = **3PL layer** (VAS explicitly labelled optional module). Transport-module integration = separate module/Phase-2 [INFERRED].

---

## purchase (จัดซื้อ) — 7 screens

### Screens
| File | Purpose |
|---|---|
| purchase-suggestions.html | คำแนะนำการสั่งซื้อ — replenishment suggestions for warehouse materials; tick → create PO; pre-campaign check; slow POs |
| purchase-suggestions-usage.html | วิเคราะห์การใช้ — historical consumption by week/day/month with campaign columns |
| purchase-orders.html | ใบสั่งซื้อ — PO list with receiving status |
| purchase-order-detail.html | PO detail (PO-261028-006) — progress, lines per delivery round, timeline, supplier, payment, documents |
| purchase-inbound-notices.html | แจ้งสินค้าเข้าคลัง — POs awaiting AS + AS list with warehouse receive results |
| purchase-inbound-notices-form.html | Form: create AS from PO (lines pulled from PO) |
| purchase-suppliers.html | ผู้จำหน่าย — supplier master, lead time, safety stock, MOQ, payment terms, on-time %, per-supplier item price list |

Header notes: "ส่วนเดียวกับจัดซื้อใน OMS", "ชุดเดียวกับ OMS", "สร้างที่ Zimple Purchasing" — this is the Zimple Purchasing module embedded in WMS for **warehouse's own materials** (packaging, tape, bubble, stretch film).

### Key entities & fields
- **Supplier**: name, contact, phone, email, tax ID (เลขผู้เสียภาษี e.g. 0105561234567), category (สินค้าขาย / วัสดุแพ็คและของแถม), items bought, lead time (ระยะเวลาจัดซื้อ) vs actual avg/max, safety stock days (ใช้ค่าแนะนำ / ตั้งเอง), MOQ (฿/order or pcs/SKU), payment (เครดิต 30 วัน / เงินสด 15 วัน), last PO, on-time rounds (11/12), status (ใช้อยู่ / ปิดใช้).
- **Supplier item**: last purchase price + PO, pack qty · MOQ, lead time (ตามผู้จำหน่าย / ตั้งเอง), primary supplier (หลัก / สำรอง), ABC group.
- **PO (warehouse)**: PO-YYMMDD-seq, date, supplier, destination warehouse, amount, lines (SKU, qty, unit price, total), VAT 7% inclusive, delivery rounds, receive status, source (คำแนะนำการสั่งซื้อ), creator, supplier invoice no., payment status.
- **Suggestion row**: SKU · group (A/B/C), available · incoming (with PO/AS), daily usage normal/campaign, days of cover · actual lead time, order-by date, suggested qty (rounded by MOQ & carton), supplier · amount.
- **Usage analysis**: weekly usage columns, campaign column flagged (มี 10.10), total, daily usage normal/campaign, trend.
- **AS (from PO)**: PO, warehouse, supplier contact, supplier delivery note no., date/slot/room type, delivery method, estimated pallets/cartons/weight, lines (ordered / received / outstanding / this round).

### Workflow states / badges
- PO: ร่าง (draft) → ส่งผู้จำหน่ายแล้ว (sent to supplier) → รับบางส่วน (partially received) → รอยืนยันปิด (awaiting close confirmation) → ปิดแล้ว (closed). Receiving column: ยังไม่แจ้ง / AS-… รอบ x/y / รับแล้ว n/N / ค้าง.
- Delivery round: รอแจ้งเข้า, มาถึงแล้ว, กำลังรับ, รอเข้า, รอคลังรับ.
- AS result: รับแล้ว, รับแล้ว · มีส่วนต่าง (with shortage/damage), เกิน (กักไว้) excess quarantined.
- Payment: ยังไม่ถึงกำหนด (not yet due).
- Suggestion pills: หมดแล้ว N วัน (out of stock N days), พอใช้ 180 วัน, เสี่ยงหมดอายุ (expiry risk), ไม่มีคนใช้ 96 วัน, ไม่แนะนำ.
- Supplier: ใช้อยู่ / ปิดใช้; item: หลัก / สำรอง.

### User actions
สร้างใบสั่งซื้อ / สร้างใบสั่งซื้อที่เลือก (3), ส่งผู้จำหน่าย, แจ้งเข้าคลัง / แจ้งสินค้าเข้า, แจ้งรอบถัดไป, แจ้งเข้าโดยไม่มีใบสั่งซื้อ, ยืนยันรับสินค้า (store warehouse), ยืนยันปิดใบ / ยืนยันปิดใบสั่งซื้อ, ตัดสินของเกิน, ตามใบสั่งซื้อ, เปิดใบสั่งซื้อ, ซื้อเลย หรือรวมรอบหน้า, ทำแคมเปญระบาย (clearance), พิมพ์ / พิมพ์ที่เลือก, Excel, แนบไฟล์, ดูผู้จำหน่าย, เพิ่มผู้จำหน่าย, ตั้งสต๊อกสำรอง.

### Roles implied
Purchasing/office staff (มด creates PO/AS), warehouse receivers (ต้น), finance (payment at บัญชีและการเงิน › รายจ่าย / Zimple Accounting), supplier (external, receives PDF by email). Cost visible only to roles with special permission.

### Business rules visible
- Lead time = PO confirmation → warehouse receipt; actual computed from received POs; slow POs auto-adjust supplier lead time (กล่องไทย 8 → 9 วัน).
- Reorder point = usage during actual lead time + safety stock (days). Suggested qty = need (lead time + next cycle) + safety − available − incoming → round to MOQ & carton qty → cap at max days-of-sale (เพดาน, e.g. 60 วัน). New supplier safety stock = half lead time.
- Forecast inputs: actual usage 90 days (excluding stock-out days), campaign days from warehouse calendar, forecast orders, outgoing issues, minus incoming, kits exploded into materials. Campaign multiplier from previous campaign (10.10 ×9). Normal daily usage excludes campaign days.
- Usage = actual stock deduction (box close: box + paired materials · extra materials · ใบเบิก).
- Receiving per destination: store warehouse (คลังสายไหม) = "ยืนยันรับสินค้า" increases stock immediately; คลังบางเขน / Zimple WMS / Zimple Fulfillment = "แจ้งสินค้าเข้าคลัง" — stock increases when warehouse receives; result returned each round.
- Last round received → awaiting close confirmation; no reply 3 days → auto close (another KPI says "ปิดเองใน 2 วันถ้าไม่ตอบ" — countdown).
- AS editable/cancellable until goods arrive; AS numbering shared with WMS; no duplicate AS menu in warehouse ops.
- Partial delivery: enter only this round's qty; remainder notified next round. Warehouse counts actual & records lot/expiry.
- Last purchase price becomes default on new PO; receipt updates last price and moving-average cost.
- Payment due 30 days from receipt of each round; payment recorded in accounting module.
- KPIs: value awaiting receipt, pcs awaiting, arrivals today, variance from warehouse, est. loss/day from stock-outs, campaign shortfall, cash tied in excess/slow stock.

### Devices implied
Desktop only (office). Scan input "+ ค้นหาหรือสแกน รหัสสินค้า" in PO line entry.

### Multi-owner / 3PL indicators & judgement
Mostly single-entity (warehouse buying its own consumables). Destinations include "Zimple Fulfillment" (external 3PL warehouse) — indicates Purchasing serves both own-store warehouses and 3PL. **Judgement:** for a core WMS this is an adjacent module (Zimple Purchasing shared with OMS) — **Phase-2 / separate product**; only the AS hand-off and receipt-result feedback are core integration points.

---

## products (สินค้า) — 8 screens

### Screens
| File | Purpose |
|---|---|
| products-owner-items.html | สินค้าของเจ้าของสินค้า — all owners' SKUs list (1,250) + owner packaging tab (36), data-issue KPIs |
| products-detail.html | SKU detail (BN-SERUM-30): owner data read-only, UoM/barcodes, serials, dims (owner vs warehouse-measured), tracking, packing materials, stock buckets, cost |
| products-set-detail.html | Kit/set detail (BN-SET-01): BOM from OMS, buildable qty, assemble/unbundle history |
| products-owner-box-detail.html | Owner packaging detail (BN-BOX-LOGO-S): how warehouse uses owner's box |
| products-owner-boxes.html | Owner packaging awaiting warehouse setup (BN-BOX-LOGO-XL, รอคลังตั้งค่า) |
| products-warehouse-items.html | สินค้าของคลัง — warehouse-owned packaging/materials (39), "เฉพาะ 3PL" |
| products-box-detail.html | Warehouse packaging detail/create (Fullfeel-Box-00) |
| products-material-matching.html | จับคู่วัสดุและสื่อการตลาด — packing-material rules, box-selection rules (warehouse & owner), freebie/marketing inserts (owner, read-only) |

### Key entities & fields
- **Owner SKU**: code, name, short name (for pick list/label/PDA), note, brand (multi-brand per owner; "ไม่ระบุแบรนด์"), category path (สกินแคร์ › เซรั่ม), variant code (รหัสรูปแบบ = parent + variant; each variant is own SKU), group (1 SKU 1 group), tax code (3304.99.00), warehouse tags (ระวังแตก, ขายดี, เก็บห้องเย็น — hidden from owner), owner tags (โปรโมชั่น 11.11), photos (synced from OMS + warehouse photos), status (ใช้งาน / ใช้ให้หมดก่อนเลิก / เลิกใช้ / รอคลังตั้งค่า).
- **UoM & barcodes**: unit, barcode (primary + additional), qty in base unit, scannable-at steps (ทุกขั้น / รับเข้า·ย้าย·หยิบ·แพ็ค·นับสต๊อก), loose allowed, stackable layers, "ห้ามเปิดลัง" (sell by carton only), reference-only units (no barcode), closed units history.
- **Dimensions**: owner-entered vs warehouse-measured vs used value; CBM/unit.
- **Tracking**: lot control, date on product (MFG) + shelf life 24 months → computed expiry, min remaining shelf life (60 days), serial control (ไม่คุม / สแกนตอนแพ็ค / สแกนตั้งแต่รับเข้า), serial source (ผู้ผลิต / ระบบออกให้), warranty method (from OMS), high-value flag, temperature control + range.
- **Serial list**: serial, status (ในคลัง / ส่งมอบแล้ว), location or SO.
- **Stock buckets**: total, พร้อมขาย (available), จองแล้ว (reserved), ระหว่างงาน (in process), คืน·ชำรุด, ระหว่างโอน (in transit), รอเข้าคลัง (expected); by location / by lot; movement velocity (หยิบ 412 ครั้ง/90 วัน), last count, FEFO pick lot ("ล็อตหยิบก่อน L2407 · หมดอายุ 02/12/2026").
- **Cost**: per-unit cost from OMS with effective-date history, inventory value; fallback "มูลค่ากลาง 100 บาท/ชิ้น" when no cost.
- **Kit**: kit type "③ ประกอบล่วงหน้า" (pre-assembled), sale method (deduct assembled kits first), kit box, BOM version (สูตรเซต v3 · ผ่านตรวจ), components per kit, buildable qty (min component), kit barcode; history (VA-…, ประกอบ +48, แยกเซต −20).
- **Packaging (warehouse)**: code, name, type (บรรจุภัณฑ์ / วัสดุแพ็ค / วัสดุใช้ในคลัง), brand, group, tags, applicable owners (ทุกราย / เลือกราย), usable dims, weight, max load, deduction unit (ใบ/แผ่น/เมตร/ม้วน), storage bundle qty & dims, paired materials (วัสดุคู่บรรจุภัณฑ์ per box), recommend-at-pack toggle, purchasing data (supplier, lead time, reorder point per warehouse, safety stock, order qty), 3 costs (initial, last purchase, average).
- **Owner packaging**: usable size vs storage size (folded bundle), alert threshold, location, warehouse usage settings, billing model.
- **Material rule**: name, priority, applies to (สินค้า / บรรจุภัณฑ์ / ทุกงานของเจ้าของสินค้า), owner, scope (all / brand / category / variant code / group / multi-SKU), materials qty per (ชิ้น / คำสั่งซื้อ / กล่อง), paired-box-material mode (ไม่ใช้ / ใช้ด้วย / ตามกฎกลาง), status (ใช้อยู่ / ร่าง / เลิกใช้).
- **Box-selection rule**: applies to (whole warehouse / per owner), scope/group, qty range → box, date range.
- **Freebie/marketing insert rule** (owner): item, product scope, channel conditions (Shopee/Lazada/TikTok Shop, except wholesale), order value ≥ ฿999, first-100-orders cap, date window, remaining stock; status ตั้งเวลา / ของหมดแล้ว / หมดอายุ.

### Workflow states / badges
SKU status: ใช้งาน (active), ใช้ให้หมดก่อนเลิก (use up then retire; default when owner retires in OMS), เลิกใช้ (retired, stop immediately), รอคลังตั้งค่า / รอตั้งค่า (awaiting warehouse setup), ยังไม่รับเข้า / ยังไม่เคยรับเข้า (never received). Value source: คลังวัด (warehouse measured), เจ้าของใส่ (owner entered), คำนวณ (computed from pack box), ยังไม่มี. Serial: ในคลัง, ส่งมอบแล้ว. Unit: ปิด / ปิดแล้ว. Cost: ยังไม่มีต้นทุน, เฉพาะผู้มีสิทธิ์ดูต้นทุน. Material source: จากกลุ่ม, ตั้งเอง, ยังไม่ตั้ง. Owner box mode pills: บรรจุภัณฑ์ของเจ้าของสินค้าก่อน / บรรจุภัณฑ์ของคลังตามขนาด / บรรจุภัณฑ์ของเจ้าของสินค้าเท่านั้น. Owner rules: รอเริ่ม, ไม่ใช้ที่คลังนี้, ตั้งโดยเจ้าของสินค้า. Rule: ใช้อยู่ / ร่าง / เลิกใช้. Tags: ใช้บ่อย, สั่งรวมทุกเดือน, ของแถม 11.11. Warning: "หน่วยไม่ตรงกฎคลัง · รับเข้าไม่ได้".

### User actions
พิมพ์ป้ายสินค้า / พิมพ์ป้ายที่เลือก, วัด / ชั่งใหม่, ถ่ายรูปเพิ่ม, รูปทั้งหมด, มีปัญหาข้อมูล (3), กลุ่มสินค้า (4), ตั้งค่า (owner box), บันทึกวิธีใช้, + เพิ่มวัสดุ, + เพิ่มหน่วยนับ, เพิ่มบรรจุภัณฑ์ / วัสดุแพ็คของคลัง, Excel, แก้ที่ จัดซื้อ ↗, แก้กฎการจับคู่, ดูงานประกอบ, เพิ่มกฎวัสดุ, ดูผลก่อนบันทึก (preview), บันทึกกฎ, เพิ่มกฎเลือกบรรจุภัณฑ์, แม่แบบ Excel, inline edit (name, tags: Enter/Esc/Tab).

### Roles implied
Warehouse office/master-data staff (measure, photos, tags, packaging setup, rules); supervisor (confirms use of not-set-up owner box); owner (edits product data in OMS/portal, requests re-measure, sets freebies & owner box rules); account manager (ฝ่ายดูแลเจ้าของสินค้า) with temporary access to owner's OMS; role with special permissions "ดูต้นทุนสินค้าของเจ้าของสินค้า" / "ดูต้นทุนสินค้าของคลัง" (set in ตั้งค่า › ผู้ใช้และสิทธิ์).

### Business rules visible
- Owner SKU data synced from OMS / owner portal; warehouse cannot edit (read-only), only records warehouse measurements, photos, warehouse tags, and how it uses owner packaging.
- Warehouse-measured value always wins; owner can "ขอวัดใหม่" → creates 1 measuring task; new value effective from measure date; all changes logged. System checks carton dims ÷ pcs/carton vs unit dims; mismatch → re-measure. CBM/unit drives daily storage fee.
- Scanning a UoM barcode once = that unit's qty; units expressed in base unit; unit qty immutable after use (add new unit and close old). Barcodes unique within an owner; additional barcodes allowed only if owner rule "รับหลายบาร์โค้ดใน 1 รหัสสินค้า" enabled. Warehouse items: barcodes unique among warehouse items; base unit = smallest deduction unit; tape/bubble roll base = metre, roll unit = 100 m for receiving.
- Min remaining shelf life blank → fall back to other levels (store · owner · warehouse). Serial control can be enabled on any SKU; warranty-by-serial SKUs (from OMS) must be controlled; "scan from receiving" also scans at move and count (location per serial always known). System-issued serials → WMS prints QR stickers from label template. High-value flag set by owner only when warehouse enables rule "จัดการสินค้ามูลค่าสูง".
- Cost from OMS only, date-effective; used for count-variance approval thresholds, inventory value, and compensation (capped per-unit in contract); not sales price.
- Material precedence: most specific wins — SKU/box direct setting → rule (lower priority number first) → all-jobs-of-owner → warehouse default. Per-SKU materials only if "ตั้งวัสดุคู่สินค้าเป็นรายสินค้า" enabled in กฎงานคลัง › แพ็ค. Scan box only → system deducts box + all paired materials at box close; extra usage → scan "วัสดุเพิ่ม"; can "ไม่ใช้กฎนี้" with reason. Bubble computed from piece count, auto-billed.
- Box selection: optional; default system picks by product size. Warehouse rules (whole-warehouse or per owner, per-owner wins) only for warehouse boxes; owner box rules (set in OMS) precedence set → promotion → group, apply when all order items in that set/promo/group; owner box out → compute from remaining + notify owner. Per-owner box mode set in ตั้งค่าลูกค้า › รายลูกค้า › กฎการทำงาน; owner sees only mode name.
- Freebies/marketing (owner-set): all matching rules inserted; inserted at box close, stock deducted at handover, no material charge.
- Owner packaging: billed as "ค่าหยิบบรรจุภัณฑ์" flat per box + paired materials as used (no packaging charge); warehouse packaging price includes materials. New owner box → not recommended at pack until warehouse sets usable size, storage size, paired materials; if staff scans it, warning + supervisor confirmation. Usable size → packaging recommendation & parcel calc; storage size → storage fee.
- Warehouse "วัสดุใช้ในคลัง" (stretch film, gloves) not shipped, not billed; deducted as "ใช้ไป" on issue. Warehouse packaging stock received/stored/counted like products. Purchasing data (supplier, lead time, reorder point per warehouse, cost) owned by Zimple Purchasing — read-only here.
- Kit: BOM synced from OMS (read-only); assemble/unbundle orders from owner in OMS (KIT_ASSEMBLE / KIT_UNBUNDLE); warehouse may create but needs owner approval; movements show as single "เปลี่ยนรหัสสินค้า" (CV-); assembly auto-issues kit materials; OMS doesn't explode kit into components (sale method).
- Brand-bound boxes: pack station uses brand's box first; if out/not fitting → warehouse packaging and charge packaging fee.

### Devices implied
Desktop for master data; label printer (product labels, serial QR stickers); camera/photo (warehouse photos); PDA uses short names; scale/measuring at receiving.

### Multi-owner / 3PL indicators & judgement
Strong: "สินค้าของเจ้าของสินค้าทุกราย", owner filter/badges, owner vs warehouse ownership split, per-owner box modes, per-owner rules, owner-permission split for cost, "สินค้าของคลัง · เฉพาะ 3PL", "Zimple WMS: บริษัทเป็นเจ้าของสินค้าเอง (ขายคู่ Zimple Solution)". **Judgement:** SKU master, UoM/barcodes, lot/expiry/serial, dims, stock buckets = **core WMS**. Owner-vs-warehouse packaging billing, owner box modes, owner freebie rules, OMS sync of owner data, cost-for-compensation = **3PL layer**. Material-matching engine and kit assembly = core-ish but complex; could be Phase-2 [INFERRED].

---

## planning (วางแผนงาน) — 7 screens

### Screens
| File | Purpose |
|---|---|
| planning.html | ภาพรวมวางแผนงาน — today's orders vs plan, staff planned/actual/working, urgent staffing issues, per-department table, people per work station |
| planning-forecast.html | ยอดประมาณการ — campaign/live forecasts (owner-reported vs system estimate vs used), accuracy |
| planning-workforce.html | แผนกำลังคน — daily workforce plans WP per department, workload sources, plan-vs-actual history |
| planning-check-in.html | สแกนเข้าจุดงาน — check-in of badge holders to work stations (desktop zone PC) |
| planning-pda-check-in.html | PDA sample (reference only) of station check-in for supervisor |
| planning-testing.html | ทดสอบและประเมิน — speed-test rounds (set productivity standards), QC spot-check rules, work sampling (สุ่มสังเกต) |
| planning-pda-spot-checks.html | PDA sample (reference only) of QC spot-check and work-sampling |

### Key entities & fields
- **Forecast**: owner (3PL only), campaign name (11.11, ไลฟ์คอลลาเจน), date, live date/time, reported volume, reported date · by, system estimate, used volume, variance (actual vs used).
- **Workforce plan (WP)**: WP-YYMM-seq (monthly reset, 1 plan per day, revisions -1/-2), day, shift (เช้า 08:00–17:00 / บ่าย 13:00–22:00), workload (orders + other work), headcount per department (รับเข้า, หยิบ, เตรียมงาน [if module on], แพ็ค, ส่งมอบ, ตีกลับ, สินค้าคงคลัง, งานเพิ่มเติม, อื่นๆ), total, status, creator/date. History: orders plan/actual/variance, people plan/actual/short-over, orders per person, plan no. used.
- **Workload feeds**: inbound pallets from AS dates, VAS jobs by due date, pending cycle counts (CC-…), returns awaiting QC + expected daily returns, warehouse calendar closures (holidays).
- **Work station**: department, station (IN-D1, PICK-A/B/C, PREP-01, LINE-01, PS-01…PS-10, OUT-D1/D2, QC-01, RET-IN, INV-01, VAS-01, OTH-01) with QR, present/plan, logged-in users (device: PDA/คอม/โต๊ะ), badge check-ins, changes today, team (แก้ทีม), supervisor.
- **Badge**: T-0xx daily badge (บัตรรายวัน) with agency (บ.แรงงานดี, บ.สยามแมนพาวเวอร์), permanent badge for no-account staff (บัตรประจำ), role at station (แพ็คในไลน์, ยกของ, ติดเทป, สแกนตรวจ), check-in time; man-hours.
- **Speed test round**: start, step·method (แพ็คตามใบหยิบ, หยิบตามคำสั่งซื้อ, รหัสสินค้าเดียวจำนวนมาก, เตรียมตามช่อง, รับคืนและตรวจ QC), testers, docs done/target, result vs old standard (122 · เดิม 120), creator.
- **QC spot-check rule**: step, sample source, rate (หยิบ 3%, แพ็ค 2%, ตีกลับ 5%), checker; extra rules by owner (HealthyMe 10%), product type (high-value 100%), employee (<30 days); results: date, step·doc, employee, pass/fail, cause.
- **Work sampling config**: 6 times/day, 3 people each, no repeat within 2 h, departments, observer.

### Workflow states / badges
- WP: ยังไม่มีแผน (no plan) → ร่าง (draft) → ยืนยันแล้ว (confirmed) → กำลังแก้ (revising; uses last confirmed version) → ยืนยันแล้ว (re-confirmed, suffix -1). Past days read-only.
- Forecast "ยอดที่ใช้" source pills: ยอดที่แจ้ง (reported), ระบบประเมิน (system estimate), "ระบบ · แจ้งต่ำกว่าเกิน 30%"; รอถึงวัน (pending date).
- Speed test: กำลังทดสอบ, รอยืนยัน, ใช้ค่านี้แล้ว, ไม่ใช้ค่านี้, ยกเลิก (fewer than 3 testers).
- QC: รอตรวจ (pending), ผ่าน (pass), ไม่ผ่าน (fail); causes หยิบผิดรหัส / จำนวนไม่ตรง / วัสดุไม่ครบ / อื่นๆ. Step setting: ไม่สุ่ม.
- Work sampling answers: กำลังทำงาน (working), ว่าง (idle), ไม่อยู่ที่จุด (not at station), พัก (break, not counted).
- Station: ครบ, ขาด N, ล่าสุด; scan modes สแกนบัตรเข้า / สแกนบัตร · ย้ายจุด / บัตรมีปัญหา / เลิกงาน.

### User actions
เพิ่มยอดประมาณการ, สร้างแผน / สร้าง, ยืนยันแผนที่เลือก (3), ขอแก้แผนที่เลือก, จัดการ, ย้ายคน, ส่งไปจุดงาน, ขอคนเพิ่ม, ลงทะเบียนบัตร / ลงทะเบียนบัตรรายวัน, พิมพ์ QR จุดงาน, สแกนเข้าจุดงาน, แก้ทีม, ใส่จำนวนแทน (ไม่มีบัตร), จบ · กลับหน้าเริ่ม, จบจุดนี้, จบโหมดเลิกงาน, + สร้างรอบทดสอบ, ตั้งค่า, + เพิ่มกฎสุ่มตรวจ, แก้ไข, ผ่าน / ไม่ผ่าน / บันทึกไม่ผ่าน, ถ่ายรูป, กลับหน้าหลัก.

### Roles implied
Warehouse manager/head (หัวหน้าคลัง, ผู้จัดการคลัง) creates/confirms plans and speed tests; HR / staffing agency (ต้นสังกัด) receives confirmed plan & deltas; department supervisors (หัวหน้างานหยิบ/แพ็ค/ตีกลับ) do check-in, QC, work sampling; QC staff (พนักงานตรวจสอบคุณภาพ); floor staff with accounts (log in PDA/PC/pack desk) and daily/no-account workers (badges); owner (3PL) submits forecasts in owner portal; employees view own results in "ผลงานของฉัน".

### Business rules visible
- Forecast: 3PL → owners report in owner portal (campaign, live, promo); system reminds non-reporting owners 7 days before campaign. Zimple WMS → internal team reports, no owner column. Used volume priority: supervisor override > reported > system estimate. Reported vs system differs >30% → supervisor chooses. Variance = (actual − used) ÷ used, feeds future estimates.
- Workload = forecast orders + system-pulled work (AS arrivals, VAS due, pending counts, returns QC + expected); unfinished work carries to next working day; closed days per warehouse calendar need no plan.
- Plan: create range of dates; duplicate day not allowed (edit existing); draft = enter volume → system computes headcount per department instantly; confirm → can send to HR/agency; confirmed can't be edited directly — "ขอแก้แผน" with reason; during revision last confirmed used; re-confirm appends -1/-2 and sends delta to HR.
- Actual attendance = users logged in today (PDA/PC/pack desk) + no-account people scanning badge at station; counted automatically; dept change counted at latest dept. Fallback "นับคนจาก: ใส่จำนวน" manual; "HR / เครื่องลงเวลา (ยังไม่เชื่อม)" not yet integrated.
- Logged-in user scanning a station → warning, not counted (log out first to help); person in station who logs in → auto-removed from station. Unregistered/overnight daily badge (not returned) → blocked until re-registered. No scan-out → auto closed at shift end (17:00). Station in/out times usable for overtime.
- Urgent: dept short so work misses carrier cutoff (รอบ Flash 16:00), people present but not at any station (excluding break scans), overnight badges; system recommends fix (move 1 from inbound → pack, request 1 more or OT 2 h).
- Orders per person = actual orders ÷ actual people (all depts), used to tune productivity in plan; accuracy feeds estimate adjustment.
- Speed test: cancelled if fewer than 3 testers; accepted results stored as history (old value, new value, approver, time).
- QC spot-check: per-step rules (receiving/prep/handover default ไม่สุ่ม); multiple matching rules → highest rate, single roll per doc, not additive; pick check holds pick list until checked before pack; pack check after handoff without stopping work; fail requires cause; no automatic penalty — supervisor decides; wrong-SKU fix is physical, not recorded in system; production line samples every 20 boxes by line rule; results per person in รายงาน › วิเคราะห์ข้อมูล › พนักงาน.
- Work sampling: random pop-up on supervisor PDA/PC, no advance notice; measures time invisible to scans (waiting, searching); not a replacement for scan-based measures; result in "ใช้เวลากับงาน" column.

### Devices implied
Supervisor PDA and zone PC for station check-in; printed station QR codes, team QR, break QR, "จบ" QR; staff badges (daily/permanent) with barcode/QR; pack-station desks; audible + red-screen scan errors; PDA pop-ups for work sampling.

### Multi-owner / 3PL indicators & judgement
Owner column in forecast "เฉพาะ 3PL", owner-reported forecasts and reminders, QC extra rule per owner ("เจ้าของสินค้าเคลมบ่อย"), per-owner throughput. **Judgement:** labour planning, station check-in, QC sampling are warehouse-internal — not 3PL-specific but advanced. Basic attendance + QC spot-check could be core; forecast-driven workforce planning, speed-test standards, work sampling, HR/agency integration = **Phase-2** [INFERRED]. Owner forecast submission = 3PL layer.


---

# B. Inventory (สินค้าคงคลัง) — Capability Inventory

Source: 21 mockups `inventory*.html` (excluding owner-portal). Product branding in titles: "Fullfeel Fulfillment"; notes reference "Zimple WMS", "Zimple OMS", "Portal" (owner/client system), and editions "Zimple WMS (Business)" vs "3PL".
Sample warehouses: คลังบางเขน (Bang Khen, main), คลังสายไหม (Sai Mai, secondary). Sample owners: BeautyNara, HealthyMe, Mommy Care, Siam Herb, Pet Lover, NatureBox.
Staff names in samples: สมชาย, แอน, นิด, บอย, สมพร, มณี (floor); มด (หัวหน้า / supervisor); ต้น (ผู้จัดการคลัง · คลังบางเขน, the "you" user).

## 0. Cross-cutting ID formats & concepts (seen in inventory screens)

| Prefix / format | Meaning | Example |
|---|---|---|
| `CC-YYMMDD-NNN` | Count job/round (ตรวจนับ) | CC-261010-003; batch sub-id CC-261010-001-02 |
| `MV-YYMMDD-NNNN` | Internal move task (ย้ายตำแหน่ง) — also used for damage moves, consumption, restock | MV-261010-0006 |
| `TF-YYMMDD-NNN` | Inter-warehouse transfer (โอนย้ายคลัง) | TF-261013-004 |
| `TR-YYMMDD-NNN` | Vehicle trip (เที่ยวรถ) from transport module | TR-261013-005 |
| `SL-NNNNNNNNN` | Stock ledger line (เลขบันทึก) | SL-000412415 |
| `RQ-YYMMDD-NNN` | Owner disposition request (คำขอจัดการ) | RQ-261012-031 |
| `VA-YYMMDD-NNN` | VAS job (งานเพิ่มเติม) | VA-261013-022 |
| `CV-YYMMDD-NNN` | SKU conversion doc (เปลี่ยนรหัสสินค้า) | CV-261013-004 |
| `KB-YYMMDD-NNN` | Cancel-return job (งานยกเลิกรอคืน) | KB-261013-004 |
| `EX-…` | One-off/ad-hoc VAS service doc (ค่าบริการเฉพาะครั้ง) | referenced only |
| `OB-…` | Opening balance import (นำเข้ายอดเริ่มต้น) | referenced only |
| `PK-YYMMDD-NNNN` | Pick list (ใบหยิบ) | PK-261013-0032 |
| `SO-YYMMDD-NNNNN` | Sales order | SO-261010-04790 |
| `PO-<OWNER>-NNNN` | Purchase order (owner prefix) | PO-BN-5521 |
| `AS-YYMMDD-NNN` | Advance shipment notice (แจ้งเข้าคลัง) | AS-261102-001 |
| `TM-YYMMDD-NNN` | Temporary receiving doc (ใบรับเข้าชั่วคราว) | TM-261009-005 |
| `RT-YYMMDD-NNNN` | Return parcel (ตีกลับ) | RT-261013-0002 |
| `MF-YYMMDD-NNN` / `CL-YYMMDD-NNN` | Manifest / claim shipment (ส่งเคลม) | MF-261014-012, CL-261013-004 |
| `SN-NNNNNNN` | Serial number | SN-0004118 |
| Lot `L2407`, `L0926`, `L2409A` | Lot codes (free format) | — |
| SKU `<OWNER>-<NAME>-<SIZE>` | Owner-prefixed SKU | BN-SERUM-30, HM-VITC-60, SH-BALM-15 |
| Owner QR fallback | "ไม่มีบาร์โค้ด ใช้ QR จากรหัสสินค้า SH:SH-BALM-15" | — |

Location codes: `A-03-02` (zone-row-slot), special locations `IN-S1` (receiving staging), `PK-S1/PK-S2` (pack staging), `OUT-S3` (handover), `RTS-01/02` (รอคืนชั้น), `RT-01` (returns), `DMG-01…05` (damaged), `DMG-H` (quarantine/hold), `DMG-T-01/T02/T03` (damage totes at workstations), `CXL-01/02` (cancel unbox), `VAS-01-STG` (VAS staging), `B-PK-01-04` (packaging-material shelf), `R-02` (return receiving point), `PS-01..03` (pack stations), `QC-01`, `UNB-02`, `PH-01` (photo corner), `M-01-03` (material).
Containers: `TT-xxxx` (tote/ตะกร้า), `C30-03` (sorting cart slot), `BG-xxxx` (bag), `PL-xxxx` (pallet), `CG-xxxx` (cage). "รหัสภาชนะไม่ซ้ำภายในคลัง ต่างคลังซ้ำได้".

**Stock buckets** (rule, inventory-stock): stock is split into 3 parts — สินค้าปกติ (normal: pick face, reserve, pick containers, staging, handover, restock-pending; reserved qty still included), สินค้าคืน (returns awaiting inspection), สินค้าชำรุด (damaged / expired / quarantined awaiting decision). "ระบบจองให้คำสั่งซื้อเฉพาะสินค้าปกติ". รอจัดเก็บ (received, not yet put away) shown separately and merged on putaway.
Formulas: ยอดคงคลัง = ปกติ + คืน + ชำรุด (excl. in-transfer, awaiting ASN); พร้อมขาย (ATP) = ปกติ − จองแล้ว − ล็อตระงับ / ต่ำกว่าเกณฑ์อายุ. ลบ.ม. คงเหลือ = qty × CBM/unit, "ใช้คิดค่าเช่าพื้นที่รายวัน" (daily storage billing by volume → 3PL).

---

## 1. Stock views (overview, by SKU, by location, all warehouses, movements ledger)

### Screens
| File | Purpose |
|---|---|
| inventory.html | Inventory dashboard: accuracy KPI, replenishment needs, variances awaiting approval, near-expiry lots, space usage, urgent work, backlog by type, per-owner stock health |
| inventory-stock.html | Stock by SKU (ยอดคงคลังตามรหัสสินค้า) with lot/location drill-down, in-transit, serial search |
| inventory-by-location.html | Stock by location: zone capacity/weight, rack heatmap, per-location contents, label print |
| inventory-all-warehouses.html | Multi-warehouse aggregate view ("ทุกคลัง") per SKU, columns per warehouse |
| inventory-movements.html | Stock ledger (ความเคลื่อนไหว) per SKU: every qty/location change, who/when/doc; reversal |

### Key entities & fields
- **SKU stock row**: รหัสสินค้า / ชื่อสินค้า · เจ้าของสินค้า, barcode (unit EAN `8851234567890`, case `18851234567897`), สินค้าปกติ, จองแล้ว, พร้อมขาย, ระหว่างโอน · รอเข้าคลัง (with TF-/AS- refs), คืน · ชำรุด, ลบ.ม. (ปกติ) + CBM/ชิ้น, ล็อตหยิบก่อน · ตำแหน่ง. Flags: "คุม Serial", "ไม่คุมล็อต", "ไม่มีบาร์โค้ด".
- **Lot/location drill-down**: ล็อต, วันหมดอายุ · อายุคงเหลือ, ตำแหน่ง + type pill, ปกติ/จอง/พร้อมขาย; in-process rows (ภาชนะหยิบ with picker/time, พักสินค้า with PK + tote, ส่งมอบ with carrier wave).
- **Location row**: ตำแหน่ง + room type (ปกติ / คุมอุณหภูมิ) + location type, #SKU/#lot, qty, พื้นที่ (ลบ.ม.) used/capacity %, น้ำหนัก (กก.) used/max %, อัปเดตล่าสุด (last scan + user). Lock pill "ล็อกนับ · CC-…".
- Location types (filter): ตำแหน่งหยิบ, ตำแหน่งเก็บ, ตำแหน่งรับเข้า, ตำแหน่งพักสินค้า, ตำแหน่งส่งมอบ, ตำแหน่งคืน, ตำแหน่งรอคืนชั้น, ตำแหน่งชำรุด / กักกัน, ภาชนะหยิบ (รถเข็น / ตะกร้า); plus ว่าง / ใกล้เต็ม. Status "ตำแหน่งปิดใช้ / ซ่อม" (e.g. ชั้นหักรอซ่อม, ปิดใช้).
- **Ledger line**: วันเวลา, type pill + sub-type, doc no. + refs, คลัง · ตำแหน่ง (from → to), ล็อต, เพิ่ม / ลด, ยอดคงคลัง (running), ผู้ทำ + device (PDA-05, IN-01, PS-03), ลบ.ม. delta. Opening "ยอดยกมา".
- **Ledger movement types** (filter options): รับสินค้า, รับคืน, กลับรายการ, นำเข้ายอดเริ่มต้น, ส่งมอบ, เบิกออก, ส่งคืนเจ้าของสินค้า, ทิ้ง / ทำลาย, เบิกใช้, ตรวจนับ, สูญหาย, เปลี่ยนรหัสสินค้า, หยิบ, จัดเก็บ, ย้ายตำแหน่ง, เก็บคืนชั้น, เบิกงานเพิ่มเติม, ย้ายเข้าส่วนชำรุด, แก้วางผิดช่อง, คืนยอดเคลม, ส่งมอบ · ไม่ตัดยอด, โอนออก, โอนเข้า.
- Ledger group pills: รับเข้า, จ่ายออก, ใช้ไป, ปรับยอด, ย้าย.
- **All-warehouses**: SKU, รวมทุกคลัง, per-warehouse qty + CBM, "อยู่ใน" pill (N คลัง); display toggle คงเหลือ / พร้อมขาย / ลบ.ม.
- **Dashboard per-owner health**: เจ้าของสินค้า, #SKU, พร้อมขาย (ชิ้น), คืน · ชำรุด, ใกล้หมดอายุ, ไม่เคลื่อนไหว 90 วัน.
- KPI: ความแม่นยำสินค้าคงคลัง 99.4% vs เป้า 99.5% (by zone); พื้นที่ใช้ไป 76% (by zone; โซน C คุมอุณหภูมิ 92%); ตำแหน่งว่าง; ใช้เกิน 80%; น้ำหนักใกล้เต็ม (>85%).

### Status / badges
- Stock filters: สินค้าปกติ, มีของระหว่างงาน (ภาชนะ · พักสินค้า · ส่งมอบ), มีรอคืนชั้น, สินค้าคืน, สินค้าชำรุด, มีรอจัดเก็บ, ต่ำกว่าจุดสั่งซื้อ (below reorder point), ล็อตใกล้หมดอายุ, หมด (out of stock). Velocity: เร็ว / ปานกลาง / ช้า.
- Location pills: ชั้นหยิบ (pick face), ชั้นเก็บ (reserve), ภาชนะหยิบ, พักสินค้า, ส่งมอบ, รอคืนชั้น, ตำแหน่งคืน, ชำรุด / กักกัน.
- Lot pills: ล็อตใกล้หมดอายุ, ต่ำกว่าเกณฑ์เจ้าของสินค้า · หยิบก่อน.
- In-transit sub-states: เข้า (inbound to this WH), ออก (shipped, not yet received), รอส่ง (reserved on TF, still at source); รอเข้าคลัง (AS- notified, not received).
- Backlog tiles (dashboard): ตรวจนับสินค้า, ผลต่างรออนุมัติ, ย้ายตำแหน่ง (เติมด่วน / ย้ายตามแผน), ยกเลิกรอคืน (แพ็คแล้ว / ยังไม่แพ็ค), สินค้าชำรุด & กักกัน (รอคำขอจัดการ / รอตรวจ), งานเพิ่มเติม (รอเจ้าของสินค้าอนุมัติ) — each with "ค้างเกินเวลา" (overdue vs configurable SLA).

### User actions
เติมชั้นหยิบ, ตรวจนับ, ยกเลิกรอคืน, ดูตำแหน่ง, เตรียมพื้นที่ (dashboard urgent list); ค้นหา Serial (serial trace modal: where it is + history); search/scan barcode; พิมพ์ป้ายที่เลือก (location labels); Excel export; กลับไปสินค้าคงคลัง; from SKU header: ตรวจนับ, โอนย้ายคลัง; ledger row menu: กลับรายการ (reverse).

### Business rules
- Dashboard "urgent" definition: pick face insufficient for waiting orders · space insufficient for inbound · count blocking a pick list · cancelled goods to restock before last truck.
- Pick sequence: "ล็อตหมดอายุก่อน → ในล็อตเดียวกันชั้นหยิบก่อนชั้นเก็บ" (FEFO, then pick-face first). Non-lot SKUs listed by location, pick face first.
- Stock remains visible on the page until handover is confirmed ("ออกจากหน้านี้เมื่อยืนยันส่งมอบเท่านั้น").
- Multi-SKU / multi-lot per location allowed; picking requires barcode scan to confirm SKU & lot; configurable "ห้ามเก็บคละรหัส" per location.
- Reorder point (จุดสั่งซื้อ) set per warehouse.
- Ledger: records only qty-affecting events; internal move = 2 lines (−old / +new, total unchanged). 5 total-changing groups: รับเข้า (incl. return), จ่ายออก (handover, return-to-owner, destroy, freebies in box), ใช้ไป (packing material at box close, VAS), ปรับยอด (count, loss), กลับรายการ; plus เปลี่ยนรหัสสินค้า (kit: −components +set). Recorded only after destination location scanned. Every line has SL no.
- Ledger is immutable: "ลบหรือแก้รายการไม่ได้"; reversal only for 3 groups — รับเข้า, จ่ายออก (ส่งมอบ), รับคืน — creates opposite SL referencing original, qty ≤ original, mandatory reason (รับเข้าซ้ำ / ตัดสต๊อกซ้ำ / รับคืนซ้ำ / บันทึกผิดล็อต / อื่น ๆ), "รออนุมัติทุกครั้ง". Wrong moves → new MV back. "ไม่มีปุ่มปรับยอดเอง" (no manual adjustment button).
- Adjustment rows (yellow) require reason + approver.
- Claim-shipment case (ส่งเคลมที่คลังผิด): goods physically move but total unchanged; handover "ไม่ตัดยอด", system returns qty to original shelf and creates a verification count.
- Excess over manifest (เกินใบรายการ) moved IN-S1 → กักกัน DMG-H, "รอเจ้าของสินค้ายืนยัน".
- All-warehouses mode: select "ทุกคลัง" in left-nav warehouse picker; every inventory page aggregates with per-warehouse columns; only warehouses user has permission for. Same SKU across WHs counted once.
- Per-owner "ไม่เคลื่อนไหว 90 วัน" used to discuss space/storage fees with owner.

### Devices
Desktop (office). Scan input on web (barcode scanner wedge [INFERRED]). Ledger shows device IDs (PDA-03, PDA-11, IN-01, PS-03) → handheld PDAs + fixed stations. Label printer for location labels. Receiving video ("วิดีโอการรับ") referenced.

### Roles
Warehouse manager/office (dashboard, approvals); supervisor (หัวหน้า · มด performs misplacement fixes); floor staff appear as actors. Owner visibility is via separate Portal.

### Multi-owner / 3PL judgement
Strong: every KPI split by เจ้าของสินค้า; owner-prefixed SKUs; per-owner expiry thresholds; CBM for daily rent billing; owner notification flags. Multi-warehouse aggregate view. **Judgement:** stock-by-SKU/location/ledger = **core WMS**; owner dimension is core data model (multi-owner from day 1); CBM-based rent & all-warehouses view lean **3PL / multi-site** (could be Phase 2 if MVP is single-site).

---

## 2. Counting (ตรวจนับ / Cycle Count)

### Screens
| File | Purpose |
|---|---|
| inventory-counting.html | Count hub: KPIs, urgent short-pick counts, count rounds list, approval queue for variances |
| inventory-count-detail.html | Single count job CC-261010-003 detail: result, approval tier, history |
| inventory-count-round-types.html | Design comparison of the "create count round" dialog for 5 round types |
| inventory-pda-counting.html | PDA sample screens (queue, blind count, visible count, paired batch, result, ad-hoc count, serial count) — reference only, "ไม่มีเมนูนี้ในระบบ" |

### Key entities & fields
- **Count round**: เลขรอบ (CC-), แบบการนับ, ขอบเขต (zone/row, SKU list + optional lot, owner + optional product group, velocity group + #SKU, whole warehouse + date), ผู้นับ (named / pairs / "ใครก็ได้ในแผนกสินค้าคงคลัง"), สร้างโดย (user or ระบบ), ความคืบหน้า (n / N ตำแหน่ง, %), ผลต่าง (ชิ้น), ชุดงาน (batches; default 40 locations/batch from rule, overridable per round e.g. 60), การแบ่งงาน (แบ่งเท่า ๆ กัน / แบ่งโซนให้ผู้นับ), เริ่ม (ทันที / ตั้งเวลา 18:00 หลังตัดรอบ / พรุ่งนี้ 08:00), การแสดงยอดระบบ (ไม่เห็นยอด default / เห็นยอด), รวมตำแหน่งว่าง, หยุดรับเข้าและส่งออกระหว่างนับ (freeze toggle), source request (RQ-261014-025 from owner).
- Scope preview: ตำแหน่งในขอบเขต, รหัสสินค้าในขอบเขต, ตำแหน่งที่มีงานหยิบค้าง ("นับหลังหยิบเสร็จ"), นับล่าสุดในขอบเขตนี้ (days ago).
- **Urgent count job**: เลขงาน, ตำแหน่ง · สินค้า · lot, มาจาก (PK + SO + "หยิบได้ 2 / 3"), ผู้นับ (มอบหมายอัตโนมัติ), deadline.
- **Variance line**: ระบบ → นับได้ (ชิ้น), diff, ผู้นับ · เหตุผล, count chain ("นับ → คนเดิมนับซ้ำ → คนอื่นนับ (นิด)").
- **Count detail**: ระบบ / นับได้ / ต่าง; approval: ผู้อนุมัติ หัวหน้าคลัง · 2 ระดับ (เกิน ฿1,000), มูลค่าส่วนต่าง (cost); history.
- KPIs: ความแม่นยำ (locations matching ÷ blind-counted locations, 30 days; visible counts excluded), นับครบตามกำหนด 98.6% (เลยกำหนด 12), ตำแหน่งที่นับแล้วเดือนนี้ by type, มูลค่าผลต่างเดือนนี้ (ขาด / เกิน, by owner, at cost price).
- Reason codes: สูญหาย, ของเกิน, บันทึกผิด, อื่น ๆ (ระบุ · ต้องใส่หมายเหตุ).

### Status / badges
- Round: กำลังนับ (counting), รอเริ่ม (not started), รออนุมัติ (awaiting approval), ปิดแล้ว (closed); tags ตรวจสอบยอดคงคลัง (stock reconciliation round), เห็นยอด (visible count).
- Urgent: ด่วน · รอนับ, ไม่พบ −5 · รออนุมัติ, คืนยอดเคลม · รอนับตรวจ; PDA: ด่วน · ของขาด, รอบตรวจนับ, รอเริ่ม.
- Variance: ไม่มีคนนับซ้ำ (no independent recount within 4 hrs), อาจวางผิดช่อง · คู่กับ <loc> (possible misplacement pair), รออนุมัติขั้น 2.
- Detail: รออนุมัติ; "รอผู้อื่นอนุมัติ" (self-counted can't self-approve [INFERRED from label]).

### User actions
สร้างรอบตรวจนับ, ตรวจนับ, พิมพ์ใบนับที่เลือก, เริ่มนับ, ตรวจ / อนุมัติ, อนุมัติที่เลือก, สั่งนับซ้ำที่เลือก, จับคู่วางผิดช่องที่เลือก, อนุมัติปรับยอด / ไม่อนุมัติ, จับคู่ (pair counters), เปลี่ยน (batch size), สแกนเพิ่ม / นำเข้า Excel (SKU list). PDA: รับงานด่วนนี้, ช่องว่าง (empty slot), พบของอื่น (found other item), บันทึก, สแกนบัตรคู่นับ, เปลี่ยนคน, ส่งอนุมัติ, งานถัดไป.

### Business rules
- Header: "นับโดยไม่เห็นยอดระบบ · ผลต่างต้องผ่านการอนุมัติก่อนปรับยอด" (blind count default; approval before adjustment).
- 5 round types: ทั้งคลัง (quarterly), ตามโซน / แถว, ตามเจ้าของสินค้า, ตามรหัสสินค้า, นับตามการเคลื่อนไหว (velocity-based; system regroups monthly; picks SKUs counted longest ago first). Plus 2 non-round types: นับเอง (ad-hoc on PDA/web, auto-creates job → รออนุมัติ) and ตรวจนับด่วน (system-generated).
- Urgent count trigger: picker presses "ของไม่พอ" and no alternative location → system creates count of that single location, blind, top of inventory dept PDA queue, auto-assigned with deadline. Found → location corrected, picker gets task back. Not found → variance to approval; order shows "สินค้าไม่พอ" visible to owner in owner system; pick list closes short portion. Also generated for claim restock ("คืนยอดเคลม").
- Flow: match → close location; mismatch → recount once by same counter; still mismatched → variance awaiting approval (large rounds don't wait for completion); matching lines auto-close; independent second counter ("คนอื่นนับ") shown; approve → "ปรับยอด" ledger entry with job, counter, approver.
- Approval tiers per ตั้งค่าบริษัท › การอนุมัติ; tier 2 above threshold (detail: 2 levels when > ฿1,000); tier-2 lines selectable only by tier-2 approver; others view only; approver notified.
- Misplacement matching: shortage at A + surplus at B, same SKU & lot → confirm creates MV "แก้วางผิดช่อง" (done immediately), no adjustment, not counted as loss/gain.
- Visible count: counter must still enter quantity, "ไม่มีปุ่มกดยืนยันยอดระบบ"; locks only the location being counted. Urgent counts always blind.
- Whole-warehouse round: notify all owners, create ≥3 days in advance (sample created 7 days ahead), optional freeze of inbound/outbound.
- Locations with pending picks counted after picking finishes.
- Case/pack barcode scanning adds units per pack (display "1 ลัง + 4 ชิ้น").
- Serial-controlled high-value items: scan each serial, full count before confirm; "รู้ตำแหน่งราย Serial เสมอ".
- Pair counting: batch pre-assigned pair → scan partner's badge before start; result records both names.
- Offline: "รอส่ง 2 รายการ · สัญญาณหลุด ส่งให้เองเมื่อกลับมา" (PDA offline queue).
- Variance valued at cost from product master; posts "ลงบัญชีส่วนต่างจากการนับ".
- "ใช้เป็นรอบตรวจสอบยอดคงคลัง (ชดเชยค่าสินค้า · เฉพาะ 3PL)" — reconciliation round aggregates all approved variances since last reconciliation for owner compensation; only for ทั้งคลัง / ตามเจ้าของสินค้า.

### Devices
PDA handheld (QR location scan, barcode scan, badge scan), desktop web for approval & ad-hoc counts, printer for count sheets (ใบนับ).

### Roles
Inventory department floor counters (แผนกสินค้าคงคลัง), supervisor/หัวหน้า (creates rounds), หัวหน้าคลัง / tier-1 & tier-2 approvers, owner (requests counts via RQ, notified of whole-WH counts and shortages), system (auto-jobs).

### Multi-owner / 3PL
Owner-scoped rounds, variance value split by owner, owner-requested counts, compensation reconciliation (explicitly "เฉพาะ 3PL"). **Judgement:** blind cycle count + approval + urgent short-pick count = **core WMS**; owner-scoped round and reconciliation/compensation = **3PL (Phase 2 candidate)**; velocity-based auto-grouping maybe Phase 2 [INFERRED].

---

## 3. Moves, replenishment & inter-warehouse transfers

### Screens
| File | Purpose |
|---|---|
| inventory-moves.html | Internal moves (ย้ายตำแหน่ง): replenishment needs, today's move tasks, scan sequence |
| inventory-pda-moves.html | PDA samples: move queue, urgent replenishment 3-step scan, picker notification, ad-hoc move, consumption (เบิกใช้), serial move — reference only |
| inventory-transfers.html | Inter-warehouse transfers (โอนย้ายคลัง): TF list, orders waiting on transfer, foreign containers to return, transfer waves |

### Key entities & fields
- **Move task (MV)**: เลขงาน, ชนิด, สินค้า · จำนวน (pcs + cases, e.g. "96 ชิ้น (2 ลัง)"), จาก → ไป, สถานะ · ผู้ย้าย, หมายเหตุ/reason, linked doc (PK, VA, KB, RT).
- Move types: เติมด่วน, เติมชั้นหยิบ, ย้ายทั้งภาชนะ, จัดพื้นที่ใหม่, ย้ายเอง (PDA), เบิกงานเพิ่มเติม, เก็บคืนชั้น, ย้ายเข้าชำรุด / กักกัน, คืนขึ้นชั้นจากชำรุด / กักกัน, ย้ายของ, แก้วางผิดช่อง, เบิกอุปกรณ์, ขึ้นรูปกล่อง, เบิกใช้.
- **Replenishment line**: ชั้นหยิบ, สินค้า · ล็อต, คงเหลือ / ขั้นต่ำ, เติมจาก (reserve loc + avail qty), เติม (qty in cases), ความเร่งด่วน.
- Ad-hoc move reasons: ชั้นหยิบเต็ม, จัดพื้นที่ใหม่, ของวางผิดที่.
- **Consumption (เบิกใช้)**: location, material (Fullfeel-Box-A), qty, activity (งานเพิ่มเติม / แพ็คใหม่ / งานตีกลับ / ใช้ภายใน / ชำรุด), ref doc (EX-/PK-/RT-), note, photo.
- **Transfer (TF)**: เลขใบโอน, owner, billing tag (คิดค่าโอน / พื้นที่สำรอง · ไม่มีค่าบริการ / ไม่มีค่าบริการ · คลังรับเอง), จาก → ไป, reason (ตามคำสั่งซื้อ / เติมสต๊อกคลังรอง / ย้ายไปพื้นที่สำรอง · พื้นที่คลังหลักไม่พอ), trigger (รอบ 11:00 / สั่งเอง · ต้องอนุมัติ), lines SKU × qty + lot + cases, pick list PK + progress, เที่ยวรถ TR + vehicle plate + depart/ETA, ส่ง / รับ / ส่วนต่าง; cost note "ค่ารถ = ต้นทุนคลัง".
- **Orders waiting for transfer**: SO + marketplace order no., รอสินค้า, ใบโอน + state.
- **Foreign containers**: ภาชนะ (PL- pallet, CG- cage), ของคลัง, มากับใบโอน, ส่งคืนไปกับ (next TF).
- **Transfer wave config**: fixed waves 09:00 / 11:00 / 14:00 per warehouse pair, cut-off 30 min before.

### Status / badges
- MV: รอเริ่ม, กำลังย้าย, รอเหตุผล (ad-hoc missing reason), เสร็จ, ด่วน · รอเริ่ม; replenishment: ด่วน · รอหยิบ N ชิ้น, ต่ำกว่าขั้นต่ำ, กำลังเติม; PDA: ด่วน · ของขาด, ด่วน, ปกติ. Overdue: "งานย้ายค้างเกินเวลา" (> 30 นาที, set in กฎงานคลัง › สินค้าคงคลัง).
- TF lifecycle: รอจัดรถ / รอหยิบที่ต้นทาง → กำลังหยิบที่ต้นทาง → ระหว่างโอน → รับแล้วบางส่วน / มีส่วนต่าง → รับครบ; also รอเริ่ม, พื้นที่สำรอง tag; SO tag "รอโอนจากคลังรอง" with order state "รอสร้างใบหยิบ"; container "รอส่งคืน". Loss outcome "สูญหายระหว่างโอน" report.

### User actions
สร้างงานเติมทั้งหมด, สร้างงานเติม, ย้ายตำแหน่ง, พิมพ์ที่เลือก (move sheets with QR), เริ่มย้าย, ใส่เหตุผล, (PDA) รับงานด่วนนี้, ต้นทางไม่พอ, ข้ามไปก่อน, งานถัดไป, บันทึกการย้าย, บันทึกเบิกใช้; สร้างใบโอน, ดูทั้งหมด, เปิดเคลมกับขนส่ง, ส่งอนุมัติ.

### Business rules
- Min/max of pick face set per SKU; system picks earliest-expiry lot from reserve (FEFO); urgent when waiting orders exceed shelf qty.
- Urgent replenishment from short pick always top of queue, pops as first PDA task with sound; on completion system notifies picker, short line → "หยิบได้แล้ว"; if picker moved on, shortfall becomes an extra pick task for an available picker.
- Scan sequence: (1) source location QR or container/pallet QR (pallet = whole pallet move) (2) product barcode + qty or case barcode; no qty = move all (3) destination QR = save; system checks space, weight, room type (temperature), lot mixing; deviation from suggested location requires reason.
- Ad-hoc PDA move auto-creates MV with status "เสร็จ", immediately in ledger.
- Damage moves: scan item into workstation damage tote = MV done immediately; full tote/shift end: scan tote → DMG shelf = one MV for whole tote. Cause in MV note (system pre-fills step, editable).
- เบิกใช้: only warehouse-owned items (materials, boxes, equipment); auto MV type เบิกใช้, deducts stock immediately; > 10 per time needs approval; photo mandatory when activity = ชำรุด; requires permission "เบิกใช้".
- Transfers: MV (in-warehouse) changes location only; TF deducts at source → in transit → receives at destination by actual received qty. In-transit excluded from on-hand and ATP at both ends.
- Same tenant: TF substitutes for SO at source (PK references TF) and for ASN at destination: TF appears in expected receipts → TM (count boxes, seal, driver signature) → scan-verify vs TF instead of PO → putaway; no AS/PO needed. Different tenant: owner's OMS creates B2B outbound at source + AS at destination.
- Order at main WH waiting on stock from secondary: "สร้างใบหยิบไม่ได้จนของเข้า"; once received, pick list can be created immediately.
- Waves consolidate waiting orders into one TF per wave (no duplicates); off-wave manual transfer by supervisor with reason.
- Vehicle trips from add-on module "จัดการรถขนส่ง"; without module, enter plate/driver/cost manually on TF.
- Variance on receipt: loss options — สูญหาย (no stock re-add; shown in "สูญหายระหว่างโอน"), คลังรับผิด (3PL) → included in compensation at reconciliation, ขนส่งรับผิด → open carrier claim (Zimple WMS: via OMS › บริการหลังการขาย).
- Billing (3PL): per-owner setting "ใช้หลายคลังเพราะ"; customer-requested split = charge transfer (pick-out · receive · transport); main ↔ owner's overflow area = "พื้นที่สำรอง", no charge line, owner does not see this TF.
- Foreign containers: destination receives normally, container tagged "ภาชนะของคลัง… · รอส่งคืน", returns with next TF; scanning shows owning warehouse.

### Devices
PDA (QR/barcode, sound alerts), desktop (supervisor assigns), printer (move sheets with QR), vehicle/driver signature at handover [signature capture device INFERRED].

### Roles
Move team / inventory dept floor staff; หัวหน้า (assigns, approves off-wave TF & >10 consumption); pickers (notified); transport (driver); owner (sees charged transfers only).

### Multi-owner / 3PL
TF is per owner; billing tags; tenant concept (same vs different tenant); 3PL liability for loss. **Judgement:** internal moves + replenishment (incl. urgent short-pick) = **core WMS**; inter-warehouse TF = **multi-site, Phase 2 candidate** unless MVP has 2 sites; transfer billing/liability/overflow tagging = **3PL**; transport module = add-on.

---

## 4. Lots & expiry (ล็อต / วันหมดอายุ)

### Screens
| File | Purpose |
|---|---|
| inventory-lots-expiry.html | Stock by lot / expiry with near-expiry alerts, owner thresholds, owner notification |

### Key entities & fields
รหัสสินค้า · เจ้าของสินค้า, ล็อต, วันหมดอายุ (DD/MM/YYYY), อายุคงเหลือ (days, or "หมดอายุแล้ว N วัน"), เกณฑ์เจ้าของสินค้า (owner min remaining shelf life: 60/90/120/180 วัน), ยอดคงคลัง, ตำแหน่ง(s). Sort "หมดอายุก่อน".

### Status / badges
หมดอายุ (expired — located in ของชำรุด / กักกัน), ต่ำกว่าเกณฑ์เจ้าของสินค้า (below owner threshold). Dashboard groups: แจ้งเจ้าของสินค้าแล้ว / ยังไม่แจ้ง.

### User actions
ตรวจย้อน (trace back), แจ้งเจ้าของสินค้า (notify owner), search.

### Business rules
- "หยิบตามหลัก หมดอายุก่อน ออกก่อน" (FEFO), automatic.
- Lots below threshold are not allocated to orders whose shop threshold rejects them, except orders specifying a lot.
- Effective threshold = strictest of คลัง · เจ้าของสินค้า · ร้านค้า · รหัสสินค้า.
- View appears only when warehouse has ≥1 lot-controlled SKU; owners can be non-lot-controlled ("เจ้าของสินค้านี้ไม่คุมล็อต").
- Expired stock goes to damaged/hold section (ไม่นับพร้อมขาย).

### Devices / Roles
Desktop; office/inventory controller; owner notified (owner portal).

### Multi-owner / 3PL
Per-owner and per-shop thresholds. **Judgement:** lot/expiry + FEFO = **core WMS** (cosmetics/supplements/food clients); multi-level threshold (shop-level) core-ish; owner notification workflow ties to portal.

---

## 5. Damaged / quarantine (สินค้าชำรุด & กักกัน) and owner disposition (RQ)

### Screens
| File | Purpose |
|---|---|
| inventory-damaged-hold.html | Workstation damage totes, damaged/expired/quarantined stock list, owner disposition requests (RQ) |

### Key entities & fields
- **Damage tote at workstation**: ภาชนะ (DMG-T-01…), จุดงาน (โต๊ะตรวจตีกลับ QC-01, จุดเปิดกล่อง UNB-02, โต๊ะแพ็ค PS-03), ของในภาชนะ (pcs, SKUs, MV refs), สแกนล่าสุด.
- **Damaged/hold item**: งานย้าย (MV) · ส่วน, สินค้า · เจ้าของสินค้า, จำนวน, ตำแหน่ง (DMG-01…05, DMG-H), สาเหตุ · ที่มา, ผู้รับผิดชอบ (คลัง / เจ้าของสินค้า / ผู้ส่ง / ขนส่ง; e.g. "คลัง เคลม · ค่าเสียหาย"), สถานะ, photos.
- Origins (ที่มา): ตีกลับ (ตรวจแล้วชำรุด), ยกเลิกรอคืน, ระหว่างเก็บ, รับเข้า, เจ้าของสินค้าแจ้ง (e.g. lot recall).
- **Disposition request (RQ)**: เลขคำขอ · เจ้าของสินค้า, type (ชำรุด / เกินใบรายการ / ตีกลับ / เซตไม่ครบ), รายการ, split qty ทิ้ง · ส่งคืน · ใช้ต่อ · เพิ่มเข้าสต๊อก, ยื่นเมื่อ · โดย (Portal · user / คลังสร้างแทน / ระบบสร้างร่าง), ค้างมา (age). Return destination: ผู้จำหน่ายของ PO (default for excess), เจ้าของสินค้า (default for damaged), มารับเองที่คลัง (signature + photo).

### Status / badges
Item: สินค้าชำรุด, กักกัน · ห้ามขาย, หมดอายุ (tab), รอคำขอจัดการ, ในคำขอ RQ-…, ปิดแล้ว; tote: กำลังย้ายเข้า DMG-01. Tabs: ทั้งหมด / สินค้าชำรุด / หมดอายุ / กักกัน / ปิดแล้ว / คำขอจัดการ (RQ).
RQ: รอเจ้าของสินค้าเลือก, รอคลังทำ, ค้างนาน N วัน, ทำแล้ว <date>; type pills เซตไม่ครบ, เกินใบรายการ.

### User actions
ย้ายเข้าชั้น DMG, ย้ายเข้าสินค้าชำรุด / กักกัน, สร้างคำขอแทนเจ้าของสินค้า, ทำตามคำขอ, เริ่มทำ, ปลดล็อกล็อต (release recalled lot — only for recall-origin quarantine), Excel.

### Business rules
- "แยกจากสินค้าปกติ ไม่นับเป็นสินค้าพร้อมขาย"; DMG locations have no suggested slot and cannot be picked for orders.
- Floor flow: scan QR "ชำรุดเสียหาย" → scan item → scan workstation damage tote = MV ย้ายเข้าชำรุด / กักกัน (instant). No separate damage document; cause/responsible party/photos recorded on the item row.
- Warehouse does not decide on discovery; owner creates RQ via Portal splitting qty into ทิ้ง / ทำลาย (photo evidence), ส่งคืน (creates outbound job), ใช้ต่อได้ (MV back to shelf); warehouse may create on owner's behalf (logged as such).
- Auto-RQ when matching owner's pre-set answer in Zimple OMS; otherwise owner chooses in Portal.
- Warehouse executes whole RQ in batches; destruction/return fee per request (เฉพาะ 3PL).
- Damaged stock still incurs normal storage fee; items damaged by warehouse go to claim (เคลม).
- RQ older than 30 days → "ค้างนาน" tag, notify per settings and owner, repeat every 7 days; never auto-dispose (rule in กฎงานคลัง › สินค้าคงคลัง).
- Excess-over-manifest can be "เพิ่มเข้าสต๊อก" (only excess).
- Incomplete set (from returns) held in Q-RET-01 (not damage) → split set / top up & reassemble (= kit assembly VAS).
- Edition difference: "Zimple WMS (Business): ตัดสินที่ คำสั่งซื้อ › บริการหลังการขาย ใครทำได้ตามสิทธิ์ · หน้านี้ดูอย่างเดียว" → in Business (non-3PL) edition, disposition decided internally in after-sales.
- 3PL: re-pick/re-pack fee charged to owner (from re-stock modal).

### Devices
PDA / scanner at workstations, camera for photos, desktop for RQ.

### Roles
Floor staff (QC, unboxing, packing), inventory supervisor, owner (Portal user, e.g. "คุณมิ้น", "คุณบี"), after-sales team (บริการหลังการขาย).

### Multi-owner / 3PL
Owner-driven disposition is the core 3PL pattern. **Judgement:** damage/quarantine segregation + MV into DMG = **core WMS**; RQ owner-decision workflow, fees, responsibility attribution = **3PL** (Business edition uses internal after-sales instead).

---

## 6. Cancel-returns & restock (ยกเลิกรอคืน / เก็บคืนชั้น)

### Screens
| File | Purpose |
|---|---|
| inventory-cancel-returns.html | Cancelled-order goods still in warehouse: unbox at CXL, pull from tote, return containers, job list |
| inventory-cancel-returns-restock.html | Restock queue (เก็บคืนชั้น): scan item/container → scan location |
| inventory-pda-cancel-returns.html | PDA samples: cancel-return queue, unbox, pull from tote, restock — reference only |

### Key entities & fields
- **Cancel-return job (KB-)**: คำสั่งซื้อ · owner, ยกเลิกตอน (stage), tracking no. (FLTH…, SPXTH…), สินค้า · จำนวน, อยู่ที่ → คืนที่ (CXL-01, tote TT-0118, RTS-01), age (ค้าง N), สถานะ · ผู้เก็บ, pack video link & duration, MV count.
- Unbox screen: box type used (Fullfeel-Box-C consumed; bubble/bag discarded), ภาชนะรอคืนชั้น (TT-0202 · zone), scanned n/N, damaged count, unbox station camera flag, per line: SKU · lot → container · suggested location, สแกน / ในกล่อง.
- Open return containers: TT-0202 @ RTS-01, TT-0205 @ โต๊ะแพ็ค 3, TT-0206 @ RTS-02 (urgent); auto-close rules.
- **Restock line**: รหัสสินค้า · ล็อต, MV + KB refs, ภาชนะ, ตำแหน่งแนะนำ (pick face, or reserve "ชั้นหยิบเต็ม"), เข้าส่วน (สินค้าปกติ), status.
- Daily staff productivity ("คนคืนชั้นวันนี้": boxes opened, pcs restocked).

### Status / badges
Cancel stages (filter): ยกเลิกระหว่างหยิบ (ตะกร้า), ยกเลิกระหว่างแพ็ค, ยกเลิกหลังแพ็ค, ดึงออกตอนส่งมอบ, ขนส่งไม่รับ. Physical state: แพ็คแล้วรอคืน / ยังไม่แพ็ครอคืน, ยังไม่เปิดกล่อง / เปิดกล่องแล้ว.
Job: รอเปิดกล่อง, กำลังเปิดกล่อง, กำลังดึงจากตะกร้า, รอเก็บคืนชั้น, เก็บคืนชั้นแล้ว, ค้างเกินกำหนด. Line: ครบ, กำลังสแกน, รอ. Restock: รอเริ่ม, กำลังย้าย · <name>, เสร็จ <time>.

### User actions
Scan label/tote/order; แจ้งปัญหา (→ missing items opens search case + urgent count CC on container), พักงาน, ครบแล้ว · สแกนภาชนะรอคืน เพื่อจบ, เก็บคืนชั้น, ปิดภาชนะตอนนี้, มอบหมายผู้เก็บ, เริ่มย้าย, ดูวิดีโอแพ็ค, (PDA) ถ่ายรูป, สแกนภาชนะรอคืนเพื่อจบ.

### Business rules
- Scope: cancelled orders whose goods never left the warehouse; "ของที่ออกไปแล้วกลับมา = เมนู สินค้าตีกลับ" (returns are a separate module).
- Packed → must unbox at CXL location first; not packed (tote/pack table) → scan straight into return container, no unbox.
- Steps: ① scan label or tote ② scan items one by one ③ scan return container = done. Damaged piece: QR "ชำรุดเสียหาย" → item → DMG-T02.
- Stock counts as สินค้าปกติ from moment of cancellation; scanning location only records where (ledger "เก็บคืนชั้น"); "ขายได้เมื่อสแกนตำแหน่ง"; wrong location scan warns, no move.
- Original shipping label is void, must not be reused.
- System checks if another order is waiting for the same SKU → divert to it / send to pack station; container marked urgent and task created immediately.
- Container auto-close: full 30 pcs / every 2 hrs / 1 hr before last truck; open new one automatically.
- Must clear before last truck (รถรอบสุดท้าย 17:00/18:00); overdue flagged.
- Sorting cart: scan slot QR → pull whole slot; other orders in the same tote untouched.
- Unbox station without camera: allowed, recorded in job, owner sees "no video".
- Billing: actual packing fee incurred + cancellation handling fee (separate rate from return fee, not double-charged).
- Unbox can be done on desktop or PDA; restock uses PDA.

### Devices
PDA, desktop at CXL table, camera at unbox station (video recording), photo capture.

### Roles
Floor staff (unbox, restock), supervisor (assigns), owner (sees video/no-video, billed).

### Multi-owner / 3PL
Owner visibility of video; fees. **Judgement:** cancel-restock flow = **core WMS** (e-commerce high cancel rate); video evidence + fees = 3PL-oriented.

---

## 7. VAS (งานเพิ่มเติม — add-on module "โมดูลเสริม")

### Screens
| File | Purpose |
|---|---|
| inventory-vas.html | VAS job list (not tied to orders): kitting, de-kitting, lot repack, stickering, product photos, special projects |
| inventory-vas-work-screen-sample.html | Work-screen samples for 6 VAS patterns (view only) |

### Key entities & fields
- **VAS job (VA-)**: เลขงาน · แบบ (ตามเอกสาร / ตามช่วงเวลา), สินค้า · lot · location · owner, งาน · จำนวน (+ reason e.g. "ถุงเดิมเปื้อน"), source (คลังสร้าง / เจ้าของสินค้าสั่ง · OMS / กฎเจ้าของสินค้า), approval state, deadline/campaign, ผู้ทำ, workstation (VAS-01, QC-01, PH-01).
- Job types: รีแพ็คทั้งล็อต, ประกอบเซต, แยกเซต, ติดสติกเกอร์, ถ่ายรูปสินค้า, ติดบาร์โค้ด, เปลี่ยนถุง, คัดสินค้าชำรุด, งานเฉพาะครั้ง (ad-hoc with name, qty, unit ชิ้น/กล่อง/ชั่วโมง/ครั้ง, unit price — 3PL).
- Period jobs: date range, daily target (e.g. 40 / วัน), daily tally.
- Material/issue sheet: ของ, เบิก, ใช้, เสีย, คืน; issue MV → VAS-01-STG; issue-sheet states รอสร้าง → รอเริ่ม → กำลังย้าย … [truncated].
- Kit recipe: components × qty + paired material (Box-A); set barcode with lot & expiry; conversion doc CV- (ก่อน / เปลี่ยน / หลัง per SKU).
- Inspection outcomes defined by owner (e.g. ขายแบบมีตำหนิ → convert to BN-SERUM-30-B; ขายไม่ได้ → ทำลาย) with criteria text.
- Label printing: template LBL-02 (40×30), batches of 200, label stock ST-4030 with remaining qty, random check 1 in 20.

### Status / badges
รอเจ้าของสินค้าอนุมัติ, กำลังทำ, ยังไม่บันทึกยอดวันนี้, เสร็จแล้ว, รอทำ, เจ้าของสินค้าไม่อนุมัติ. Work-screen pills: เจ้าของสินค้าสั่ง · OMS, คลังสร้าง · อนุมัติล่วงหน้า, กฎเจ้าของสินค้า, ต้องเสร็จก่อนเก็บขึ้นชั้น, ต้องเสร็จก่อนคืนชั้น, รหัสใหม่ผูกร้านแล้ว, ติดครบ, กำลังติด, ยังไม่พิมพ์, คิดตามฉบับ PM, ส่งเจ้าของสินค้าแล้ว, รอถ่าย, อัปโหลดแล้ว.

### User actions
ตัวอย่างหน้าจอทำงาน, งานตามช่วงเวลา, งานตามรหัสสินค้า, บันทึกยอด, เปิดหน้าจอทำงาน; work screen: พิมพ์, พิมพ์ซ้ำ, scan QR "จบชุด", "เปลี่ยนแล้ว", outcome buttons, upload photos.

### Business rules
- Sources: owner rule → auto-created; owner order (OMS or owner portal) → execute immediately at agreed rate; free-text notes don't create jobs; warehouse-created → needs owner approval (unless pre-approved); warehouse corrective work not billed; 1 doc + 1 job type = 1 job (no duplicates); billed only for completed qty with evidence; owner sees price in portal when approving; ad-hoc jobs always sent with price for approval.
- Kitting/de-kitting: on close, system deducts components and adds set (or reverse) via ledger; components issued to staging are not deducted until close; new set SKU bound to shop; stock sufficiency checked at start.
- Repack pending approval: "ระหว่างนี้หยิบได้ตามปกติ". During stickering "ขายไม่ได้ระหว่างทำ" (ledger note).
- 6 work patterns: (1) system print → apply → random scan check (mismatch = red screen, reprint) (2) issue owner goods/stock → work → return remainder → deduct actual (incl. spoilage w/ photo); no material charge; insufficient → stop & notify owner (3) warehouse material (เฉพาะ 3PL) charged per price list PM (4) SKU change/kitting (5) inspect/sort with owner-defined outcomes, destroy outcome requires photo first (6) photo/video: borrow item → shoot → upload → owner downloads → return to location.
- Some VAS gates downstream: "ต้องเสร็จก่อนเก็บขึ้นชั้น" (before putaway), "ต้องเสร็จก่อนคืนชั้น" (before restock, per VAS rule).
- Leftover VAS materials return via MV "เก็บคืนชั้น".

### Devices
Desktop/workstation with scanner, label printer (templates, label rolls), camera (photo corner), PDA for issue moves.

### Roles
VAS floor staff, warehouse (creator), owner (orders/approves via OMS/portal), billing.

### Multi-owner / 3PL
Heavily owner-centric with pricing and approval. Explicitly labelled "โมดูลเสริม". **Judgement:** **Phase 2 / 3PL add-on**; minimal kitting (CV conversion) and labeling could be core if clients need sets for campaigns [INFERRED].

---

## 8. Temperature control (คลังควบคุมอุณหภูมิ — add-on)

### Screens
| File | Purpose |
|---|---|
| inventory-temperature-log.html | Temperature/humidity log for controlled rooms, out-of-range and corrective actions |

### Key entities & fields
เวลา, ห้อง (โซน C · บางเขน / สายไหม; range e.g. 2–8 °C), °C, ความชื้น %, ผู้บันทึก, ผล; corrective-action record.

### Status / badges
เกินเกณฑ์ (out of range); others implied normal.

### User actions
บันทึกอุณหภูมิ, นำเข้าไฟล์จากเครื่องบันทึก (data-logger import), บันทึกการแก้ไข.

### Business rules
- Threshold per zone room type; log every 3 hrs (configurable); missed log → alert per ตั้งค่าบริษัท › การแจ้งเตือน.
- "เฟสแรกบันทึกเองหรือนำเข้าไฟล์ ... ระบบเชื่อมเซนเซอร์อัตโนมัติเป็นงานต่อยอด" (sensor integration = future).
- Moves check room type at destination (from moves screen) — temperature zones are location attributes.

### Devices
Desktop/PDA manual entry, data-logger file import; IoT sensors future.

### Roles
Floor staff record; manager monitors.

### Judgement
Add-on module; **Phase 2** except the room-type attribute on locations (core).

---

## 9. Warehouse layout (ผังคลัง)

### Screens
| File | Purpose |
|---|---|
| inventory-layout.html | Read-only visual warehouse map with fill density / zone colouring |

### Key entities & fields
Warehouse dimensions (60 × 38 ม.), snapshot time, layout last edited (date, user), search by SKU/location, owner filter, colour modes สีตามความแน่น / สีตามโซน, zoom. Also shares capacity KPIs with by-location (closed/repair locations, space %, empty, >80%, weight).
By-location page shows rack-face heatmap per zone/row (ชั้น 1–4 × ช่อง 1–8, % used; legend ว่าง / <40% / 40–79% / 80–94% / เต็ม).

### User actions
พิมพ์ผัง, แก้ไขผังในตั้งค่า, click rack/zone/table for detail.

### Business rules
"ผังคลังเป็นงานระยะ 2" — layout drawn in ตั้งค่า › คลังและตำแหน่ง › ผังคลัง; density = used volume ÷ location volume in row; page is view-only to prevent accidental changes.

### Judgement
Explicitly **Phase 2**. The simpler per-row heatmap on by-location may be core.

---

## 10. Cross-section observations

- **Roles implied overall**: ผู้จัดการคลัง (warehouse manager, user "ต้น"), หัวหน้า / หัวหน้าคลัง (supervisor, approver tier 1/2), แผนกสินค้าคงคลัง floor staff (counters, movers), pickers, packers, VAS staff, receiving (สมชาย · IN-01), owner/client (Portal, Zimple OMS), after-sales (บริการหลังการขาย), system automation. Permission-gated actions: เบิกใช้, approvals, tier-2 lines, warehouse visibility. Support banner "ทีม Zimple กำลังช่วยตั้งค่า ... หมดเวลา 17:00 · ยกเลิกสิทธิ์" (vendor support access with expiry) seen on VAS/temperature pages.
- **Configurable rules referenced**: กฎงานคลัง › สินค้าคงคลัง (overdue thresholds, RQ aging), ตั้งค่าบริษัท › การอนุมัติ (count approval tiers), ตั้งค่าบริษัท › การแจ้งเตือน, ตั้งค่าเจ้าของสินค้า (multi-warehouse reason, thresholds), ตั้งค่า › คลังและตำแหน่ง › ผังคลัง; batch size default 40.
- **Devices overall**: PDA handhelds dominant for floor (QR location labels, barcode/case barcode, badge scan, serial scan, offline queue, sound alerts); desktop for office/approvals; label printers (location labels, count sheets, move sheets, product/set barcodes); cameras (pack/unbox video, damage photos, product photography); data loggers (temperature).
- **Edition split hints**: "เฉพาะ 3PL" (reconciliation compensation, destruction fees, warehouse materials billing, ad-hoc VAS price, transfer fees) vs "Zimple WMS (Business)" (in-house brand warehouse; after-sales decides dispositions). Suggests one codebase with 3PL billing/owner-workflow features toggled.
- **Explicit phase markers**: layout = ระยะ 2; temperature sensors = งานต่อยอด; VAS, temperature, transport = โมดูลเสริม (add-on).
- PDA sample pages state "ไม่มีเมนูนี้ในระบบ" — they are illustrations of PDA flows, not separate web menus.


---

# Section C — Picking, Packing, Handover, Transport

Source: 31 mockups (`picking*` 10, `packing*` 8, `handover*` 7, `transport*` 6). Brand in titles: "Fullfeel Fulfillment". Unless marked [INFERRED], everything below appears in the mockup text. Several screens say they are "ตัวอย่าง PDA … ใช้ดูประกอบเท่านั้น ไม่เป็นเมนูในระบบ" (PDA sample, for illustration only, not a web menu item). They show the handheld flow; supervisors manage the same work in the web screens.

Optional add-on modules seen in this section (marked "โมดูลเสริม"):
- **ใบหยิบอัตโนมัติ** (Auto pick-list generation): picking-auto
- **เตรียมงานและวัสดุแพ็ค** (Pre-pack prep & packing materials): packing-prep, packing-pda-prep
- **งานเพิ่มเติม** (VAS at packing): packing-vas
- **จัดการรถขนส่ง** (Transport / fleet management): all `transport*`

---

## 1. Picking (หยิบสินค้า)

### Screens
| File | Purpose |
|---|---|
| picking.html | Picking control center (ภาพรวมงานหยิบ). Shows remaining orders by carrier cut-off, ETA vs cut-off, blockers, picker status, urgent services (ส่งทันที / ส่งด่วนเป็นรอบ), per-carrier-wave progress, recommended pick methods, pick-face stock check before list creation, and hourly output vs plan. |
| picking-create.html | Create pick lists (สร้างใบหยิบ) in two modes, system-recommended (ระบบแนะนำ) or manual (สร้างเอง). Orders go into a draft wave (WV), which can be split, merged or moved before confirming. |
| picking-auto.html | Add-on, auto pick lists. Orders accumulate in a pool (คำสั่งซื้อรอรวบรวม); once a threshold is met they become lists waiting to be created (ใบหยิบรอสร้าง), which are created automatically or by a button. Also shows a history log. |
| picking-lists.html | Pick-list queue (ใบหยิบ): queue order, assignment, print status, short-pick status, cancellation. |
| picking-list-detail.html | Detail of one pick list (PK-261102-0019): progress, lines in aisle sequence, orders mapped to cart slots, history, cancel dialog. |
| picking-pda-picking.html | PDA sample of the picker flow: job list, sort-while-pick, qty entry, case/carton picking, "is location empty?" check, snake route, and the scan-verification policy matrix. |
| picking-pick-rules.html | Pick rules (กฎการหยิบ): global (กฎกลาง) vs owner-specific rules, priority order, versioning, approval. |
| picking-short-picks.html | Short-pick log (ของขาดตอนหยิบ), the 5-step resolution flow, and frequently-short locations with min/max hints. |
| picking-sorting.html | Put-wall sorting (คัดแยก) station for batch picks: slot grid with per-slot status. |
| picking-carts-totes.html | Register of carts, put walls and totes: capacities, live usage, label printing. |

### Key entities & fields
- **Pick list / ใบหยิบ** `PK-YYMMDD-NNNN` (e.g. PK-261013-0034). A child list for re-picking a shortage is `PK-261013-0034-1` (pill "เลขลูก · หยิบเพิ่ม"). Fields:
  - queue no., carrier wave, oldest order time
  - pick method, order/SKU/piece counts
  - picker, cart/tote
  - pick %, sort %
  - status, print status (time · who · printer PRN-40), created-by (system / person / "ระบบแนะนำ (แก้ 2 จุด)")
  - provenance via ⋯ menu: rule + version, supervisor edits before→after with reason
  - pack method recorded on the list
- **Wave / รอบหยิบ** `WV-YYMMDD-NNN` (e.g. WV-261013-007 (ร่าง)). This is the draft container. While a user edits a draft, its orders are reserved for that user with a countdown ("กันคำสั่งซื้อไว้ในร่างให้คุณถึง 10:52 (เหลือ 9 นาที)"); actions are ต่อเวลา (extend) and ทิ้งร่าง (discard).
- **Order** `SO-YYMMDD-NNNNN`. Fields: channel/shop (Shopee · BeautyNara Official, TikTok Shop, Lazada, LINE B2B), SKU × qty, paid time, carrier.
- **Pick line**: location (`A-01-02-1`, `A-03-02`), SKU + short name (ชื่อย่อ, set in OMS; the full name is used if none), lot (`L2611A`, `L2407`), expiry, qty to pick / qty picked.
- **Cart / รถเข็น** `C20-01`, `C30-07`, `C40-01`; slot label `C30-03-07`. **Put wall / ชั้นคัดแยก** `PW-01` (144 slots). **Tote / ตะกร้า** `TT-0007`. **Flat cart** `FC`. **Pallet** `PL`.
  - Type table columns: ช่อง (slots), ขนาดช่อง (slot dimensions), รับน้ำหนัก (max kg), เหมาะกับ (suited pick methods), ทั้งหมด/ว่าง (total / free).
  - Each physical cart carries one permanent QR.
- **Replenishment move** `MV-YYMMDD-NNNN` (เติมด่วน, urgent replenishment). **Cycle count** `CC-YYMMDD-NNN`. **Transfer** `TF-YYMMDD-NNN` (inter-warehouse; also creates pick lists, pill "โอนย้ายคลัง"). **Temp receipt / putaway** `TM-261010-0002` (รอจัดเก็บ). **Carton** `CT-261010-0194` (sealed carton QR).
- **Pick rule**: order, name · conditions (shop, carrier, due date, channel, qty ≥ 24), product scope (product group "โปรฯ 10.10", SKU family BN-SET), method · split (cart type, split by carrier wave, max 300 orders / 2,000 pcs per list), version (v1/v2/v3), status.
- **Short-pick record**: time · reporter, pick list · order, qty to pick, qty picked, location, system action, status.
- Printers `PRN-02`, `PRN-40`, `PRN-41`. Zones: โซน A, โซน B, โซน C · ห้องเย็น (cold room).

### Pick methods (วิธีหยิบ) — exact labels
1. ตามคำสั่งซื้อ: discrete, one order at a time
2. คำสั่งซื้อสินค้าชิ้นเดียว: single-item orders (1 piece per order, SKUs may differ)
3. รหัสสินค้าเดียวจำนวนมาก: single SKU, high volume (1 piece per order; pieces = orders)
4. คำสั่งซื้อรูปแบบเดียวกันเป็นชุด: identical multi-item orders (every bill the same, more than 1 piece)
5. หลายคำสั่งซื้อพร้อมคัดแยก: multi-order sort-while-pick into cart slots
6. รวมหลายคำสั่งซื้อ: batch pick, then sort at a put wall

### Status values
- Pick list:
  - รอหยิบ (waiting to pick)
  - กำลังหยิบ (picking)
  - รอคัดแยก (waiting to be sorted)
  - พร้อมแพ็ค (ready to pack)
  - เสร็จสิ้น (completed). Per the notes, this means "handed to packing", not shipped.
  - ผิดปกติ · รอของขาด (exception: waiting on short items)
- Pick-list tags: เหมือนกันทั้งใบ (every order identical), เลขลูก · หยิบเพิ่ม (child list, re-pick), โอนย้ายคลัง (transfer), ใหม่ (new in draft), ระบบเลือก (system-chosen).
- Cut-off pills: `13:35 · ทัน` (on time), `14:20 · เสี่ยง` (at risk), `ช้า 22 นาที` (late 22 min).
- PDA job pills: รอรับ (unclaimed), ของฉัน (mine).
- Cart: ว่าง (free), รอเคลียร์ของ (items left from a cancelled list must be cleared first), ซ่อม (repair).
- Short pick: รอตรวจนับ (awaiting count), รอเติม (awaiting replenishment), หยิบได้แล้ว (picked from an alternative location), ปิดแล้ว (closed), รออนุมัติปรับยอด (awaiting approval of the stock adjustment).
- Put-wall slot: ครบ (complete), บางส่วน (partial), ยังไม่เริ่ม (not started), ผิดปกติ · รอของขาด (short).
- Pick-face check: กำลังเติม (replenishing), รอเติม (awaiting replenishment), รอจัดเก็บ (stock received, not yet put away).
- Rule: ใช้งาน (active), รออนุมัติ (pending approval), ค่าเริ่มต้น (default); scope pills กฎกลาง · ทุกเจ้าของสินค้า 15 ราย, กฎเจ้าของสินค้า · BeautyNara, กฎกลาง · 19 ราย · ยกเว้น Kids Joy.
- Urgent services: ส่งทันที (instant delivery), ส่งด่วนเป็นรอบ (express in batches), เปิดรับ (batch open). Order flag "หลุดรอบ" (missed wave).
- Picking verification settings: เปิด / ปิด / ปิดไม่ได้ / ตอนเริ่มหยิบ (on / off / cannot disable / at pick start).

### User actions (buttons)
- **Overview**: สร้างใบหยิบงานด่วน, สร้างใบหยิบ (per urgent row), ≡ per carrier wave (opens create screen pre-filtered).
- **Create**:
  - ระบบแนะนำ / สร้างเอง, แนะนำเพิ่มลงร่าง
  - ใช้เงื่อนไขจากกฎ (prefill filters from a rule)
  - เลือกรายการ (จากสินค้า / จากคำสั่งซื้อ), เลือกทั้งหมดที่ตรงตัวกรอง
  - เพิ่มลงร่าง N ใบ, รวมใบที่เลือก, เอาออกจากร่าง, ย้ายไปใบ…, แยกเป็นใบใหม่
  - edit cart/container (pencil), บันทึกร่าง, สร้าง N ใบ
  - ต่อเวลา, ทิ้งร่าง, ร่างของวิทยา (open another user's draft), ดูใบหยิบรอสร้าง
- **Auto**: หยุดชั่วคราว (pause), สร้างรอบตอนนี้ (run now), สร้าง / สร้าง 3 ใบ / สร้างที่เลือก / สร้างทั้งหมด, เปิดเป็นร่าง (open as draft to edit).
- **Lists**: พิมพ์ใบหยิบที่เลือก, พิมพ์ที่ยังไม่พิมพ์, มอบหมาย (assign), จัดการของขาด, ยกเลิกใบหยิบ (reason required: wrong method/cart, owner asked to postpone, merged with another list, other).
- **Detail**: พิมพ์ใบหยิบ, มอบงานให้ผู้หยิบ.
- **PDA**:
  - สแกน QR ใบหยิบ, รับใบถัดไป (ส่งทันที)
  - ของไม่พอ (short), ข้ามไปก่อน (skip), ยกเลิกสแกน (undo scan)
  - −/+ qty, ยืนยันหยิบ N ชิ้น
  - เปิดลังตรวจ, สแกน QR ลังที่เปิด
  - ใช่ ว่างแล้ว / ไม่ใช่ ยังมีของ
- **Rules**: สร้างกฎการหยิบ; view "effective order for owner X".
- **Carts**: พิมพ์ป้ายที่เลือก (cart QR ×2 for both sides + slot labels; paper sticker 100×150 XPrinter / A4 30 per sheet), เคลียร์รถเข็น. Adding or retiring carts is done in ตั้งค่า › อุปกรณ์และภาชนะ.
- **Sorting**: ส่งต่อแพ็ค (ช่องที่ครบ N), ใส่ผิดช่อง.

### Roles implied
- **Picker (ผู้หยิบ)** on a PDA. Named staff: สมชาย, บอย, นิด, ต้อม, เอ, สมหญิง.
- **Supervisor (หัวหน้า)**:
  - can raise a list's priority, with a reason
  - changes verification settings (logged)
  - assigns pick lists
  - approves rules
  - "หัวหน้าปรับ: เจ้าของสินค้าขอส่งก่อน" (priority raised because the owner asked to ship first)
- **Office / planner** creates lists (ฝน, สมพร, วิทยา).
- **Inventory department (แผนกสินค้าคงคลัง)** receives urgent replenishment and count tasks.
- Owner is indirect: owner-specific rules; the owner can request an order change ("เจ้าของสินค้าขอแก้ไข"), which halts picking.

### Business rules visible
- **Queue order**:
  1. supervisor priority override (reason required)
  2. nearest carrier wave / due time
  3. oldest order's queue time in the list (platform = paid time; off-platform = created time, configurable)
  - Urgent order overall: ส่งทันที → รอบด่วน → รอบปกติ. ส่งทันที = 1 order per list, auto-created and printed immediately, inserted at the top.
  - "รับใบเอง" (self-claim) gives the picker the first list in the queue.
- **List splitting algorithm**: split by pick method → split by carrier/wave → at most N orders per list, sorted by paid time → check container capacity.
- **Capacity check** covers slot count, volume, weight and piece count. One order can use several slots. Oversized orders get a whole flat cart or pallet. Slotted carts are only for sort-while-pick; put walls are for batch picks; the other methods use tote, flat cart or pallet.
- **Rule precedence** (first match wins): mandatory global rules → owner-specific rules → general global rules → warehouse default.
  - Owners can be exempted from general global rules ("ยกเว้น Kids Joy").
  - Owner rules cannot override restrictions on owner, lot, expiry or product status.
  - Editing a rule creates a new version; existing lists keep referencing the version used. Rules are trialled ("ทดลองก่อนใช้") and approved before activation.
- **Auto pick lists**:
  - Thresholds: tote full (40), full carton (e.g. 1 ลัง = 24, or 12 bills × 2 = 1 carton), cart slots full, or a time trigger ("สร้างเมื่อ ครบ หรือ 13:30", "60 นาทีก่อน SPX 16:00").
  - Cap on open lists: "ไม่ปล่อย · ใบค้างเต็ม 4 / 4" (not released, 4 of 4 open lists in use).
  - Can run fully automatically or wait for warehouse confirmation ("ระบบสร้างหรือรอคลังกดตามตั้งค่า").
  - Orders already in a draft or in auto-pending lists are not suggested again.
  - After a system-generated list is cancelled, the same order set is not regenerated immediately.
- **Draft exclusions**:
  - Orders waiting on carrier data (no tracking number or label) are hidden until data arrives.
  - Orders in "รอโอนจากคลังรอง" (waiting on a transfer from a secondary warehouse, TF) cannot be selected.
  - Orders the owner asked to change are excluded.
  - Removing a list from the draft returns its orders to the pool and releases the reservation.
- **Pick-face shortage at creation is not a blocker**:
  - If storage has stock, an urgent replenishment (MV) is created and that line moves to the end of the list.
  - Only stock missing from the whole warehouse blocks the order.
  - The draft has not allocated lot or location yet.
- **Location allocation** happens at list creation:
  1. lot/expiry FEFO (หมดอายุก่อนออกก่อน)
  2. pick locations before storage locations
  3. fewest slots
  4. slots that will be emptied exactly come first
  - A SKU spread over several locations becomes several stops (จุด 1/2, 2/2).
- **Route**: snake path in location order, not paid-time order. Lot, shelf-life and temperature-room rules take precedence over shortest walk. Cart slot 1 = earliest order.
- **Lots**: by default 1 pick slot = 1 lot, so scanning the location confirms the lot. Mixed lots in a slot are allowed only for GS1 barcodes.
- **Pick units**: orders by case are shown as "1 ลัง + 2 ชิ้น". A sealed-carton QR counts the whole carton. Order of use: sealed cartons first → remainder of opened cartons → open a new carton. A carton QR that was already shipped is rejected.
- **Scan verification matrix** (warehouse settings, the same for all owners):
  - Location scan: configurable; mandatory for lot-controlled items.
  - Every-piece scan:
    - can be turned off only for รหัสสินค้าเดียวจำนวนมาก and รูปแบบเดียวกันเป็นชุด (then scan location + first piece + enter qty)
    - always on for sort-while-pick
    - Serial items: every piece, and the serial is captured at pick only if the item is set to "รับเข้า + แพ็ค"
    - High-value items: every piece
  - Cart/tote: scanned at start, with a warning if the type is wrong.
  - Sort-while-pick: no slot scan; the screen shows the slot, and a wrong slot is caught at packing.
  - Entering less than required asks "short or later?"; entering more is blocked.
  - Only a supervisor can change these settings, and changes are audited.
- **Empty-location confirmation** after the last piece: "No" creates an urgent count task.
- **Short-pick flow** (no automatic stock adjustment):
  1. Picker presses "ของไม่พอ"; the system records the qty actually picked.
  2. Look for another pick location with a usable lot, using only unallocated stock.
  3. Otherwise create an urgent replenishment (MV) from storage.
  4. Otherwise create a location count (CC); the order becomes "รอตรวจสต๊อก".
  5. If the count finds nothing, the order becomes "สินค้าไม่พอ" on the owner side and the variance waits for approval before it is posted.
  - Shortages are analysed per location over 7 days to tune pick-face min/max (e.g. "แนะนำปรับ min 6 → 12").
- **Cancellation**:
  - A list not yet started can be cancelled whole.
  - After picking starts, cancellation is per order (when the platform cancels) and picked goods go to the return-to-shelf staging location (งานยกเลิกรอคืน).
  - Cancelling a whole list after start is a warehouse setting, off by default.
  - A cancelled list's printed paper becomes invalid: scanning its QR shows it as cancelled.
- **Owner change request mid-pick**: PDA shows "หยุดหยิบ วางที่ตำแหน่งพักสินค้า" (stop picking, put the items in the hold location) and the picker scans the hold location.
- **Printing**: every list tracks ยังไม่พิมพ์ / พิมพ์แล้ว (time · user · printer) / พิมพ์ซ้ำ ครั้งที่ n (reprints say "สำเนา"). System lists auto-print at the zone printer; a failed print reverts to unprinted and raises an alert. Unassigned lists appear in every scanner's "งานรอรับ"; claiming one locks it to that picker.
- **Separation of duties**: picking and packing jobs are separate, and pickers cannot see or close pack jobs.
- **After picking**: the PDA directs the picker to a staging spot, and scanning it confirms the drop (a wrong spot warns). Picked stock moves from location to cart/tote, so the system tracks which container holds it and who carries it.
- **Put wall**: slots are in order-queue order. A complete slot can be released to packing immediately; releasing again does not duplicate pack jobs. A wrong slot means undo the last scan; over-picked items go back to the shelf. Put-to-light is mentioned as future.
- **Missed carrier waves**: when the truck leaves with orders still open, they move to the next wave automatically, tagged "หลุดรอบ" and counted in KPIs. If no wave meets the due date, they become at-risk. Customer pickup and own-fleet delivery use appointment or departure time instead of fixed waves.
- **OMS rider call** for ส่งทันที / ส่งด่วน is configurable per service:
  - ① at order pull: the owner presses ship to get the label before the order enters the warehouse.
  - ② at pack complete: the warehouse notifies OMS, which calls a rider per order. Unpacked orders have no rider and risk automatic platform cancellation ("เสี่ยงถูกยกเลิก 4 คำสั่งซื้อ … เหลือ 25 นาที").
  - The warehouse has no recall button on the same day.
- **KPIs**:
  - pieces/hour per picker (standard 120–400 depending on method)
  - zone ETA and "เพิ่ม 1 คนที่โซน B" (add one person to zone B) suggestions
  - lists overdue ("เกิน 18 นาที")
  - hourly output vs plan, with lunch break taken from shift settings
- **Packing config at pick**: the pack method is stored on the pick list ("แพ็คตามคำสั่งซื้อ" on the detail).

### Devices implied
- PDA/handheld scanner for picking (offline queue: "สัญญาณหลุด ส่งให้เองเมื่อกลับมา", sent automatically when the signal returns).
- Zone printers (PRN-xx), XPrinter label printer, waterproof QR stickers.
- Desktop for planners.
- Put-wall station with a big slot-number display ("จอบอกเลขช่องตัวใหญ่").
- Carts, totes, flat carts, pallets.
- Future: put-to-light.

### Multi-owner / 3PL indicators
- "เจ้าของสินค้า *" (owner) is the **only mandatory field** when creating a pick list. Multiple owners can be selected, or "+ ทุกเจ้าของสินค้าที่มีงานรอ" (all owners with pending work). A shop can be chosen only when exactly one owner is selected.
- Auto lists are grouped per owner (5 owners). Global rules apply to "ทุกเจ้าของสินค้า 15 ราย" (all 15 owners) with exemptions; owner-specific rules exist; the effective rule order is shown per owner.
- Owner can request changes or postponement. Owner-side status "สินค้าไม่พอ". Owner short names come from OMS.
- One list per owner [INFERRED: every example list carries a single owner; lists appear to be split per owner].
- **Judgement**:
  - Pick methods, short-pick handling, verification, lists and queue are **core WMS**.
  - Owner-specific rule layering, multi-owner selection, owner-postpone and change-request handling are **3PL-specific but intrinsic**: needed from day 1 if the business is a 3PL.
  - The auto pick-list add-on and put-to-light are **Phase-2 candidates** (explicitly marked as an add-on / future).

---

## 2. Packing (แพ็คสินค้า)

### Screens
| File | Purpose |
|---|---|
| packing.html | Packing control center (ภาพรวมงานแพ็ค). Queue by carrier wave, ETA vs cut-off, blockers, stations board with assign/mode change, per-zone conveyor queue, urgent services, hourly output vs plan. |
| packing-jobs.html | Pack-job list (ใบงานแพ็ค). Status from prep to done, station assignment, hold/release, split/merge, change pack method. |
| packing-station.html | Desktop pack-station screen (PS-03) for four pack methods, with weight check, documents, video, inserts and gift wrap. |
| packing-pda-packing.html | PDA sample of packing: queue, scan-pack, box assembly, close/weigh/print, printer failure, no printer bound, no camera. |
| packing-prep.html | Add-on, pre-pack prep (เตรียมงานก่อนแพ็ค). Prep sheets for boxes, materials, inserts and labels, then dispatch to a conveyor or line. |
| packing-pda-prep.html | PDA sample of prep: material picking (เบิกอุปกรณ์), box assembly (ขึ้นรูปกล่อง), dispatch to pack, packaging substitution, leftover boxes. |
| packing-exceptions.html | Packing exceptions (ผิดปกติตอนแพ็ค): KPIs, cause breakdown, case list. |
| packing-vas.html | Add-on, value-added services (งานเพิ่มเติม) at packing and outbound, with an owner approval flow. |

### Key entities & fields
- **Pack job / ใบงานแพ็ค**: uses the **same number as the pick list** (1 pick list = 1 pack job; PK-261013-0034). Single urgent orders use the SO number.
  - Fields: queue · carrier wave, job · owner, size (orders / SKUs / pieces)
  - pattern pill: "ปนกัน · 9 แบบ" (mixed, 9 distinct order patterns), "เหมือนกันทั้งใบ" (all identical), "คำสั่งซื้อเดียว · 6 กล่อง" (single order, 6 boxes)
  - pack method, progress %, station · zone · packer
  - status, plus pick and prep sub-status
- **Prep sheet / ใบเตรียมงาน**: 1 per pick list, per order or per production line, **using the same number** (no separate numbering). Fields:
  - prep type (เตรียมตามช่อง per slot / เตรียมเป็นชุด as a batch / เตรียมหลายกล่อง multi-box)
  - materials: box codes, e.g. Fullfeel-Box-00, Box-0+4, Box-A/B/C/G
  - bubble wrap, cards, flyers, samples, gift bag, ribbon, pallet + stretch film (PKG-FLM-01)
  - pick-from location (B-PK-01-02), destination (โซน A · สายพาน 1, ไลน์ผลิต A, โซน B · ราง 2)
  - labels printed n/N, status, preparer, due time
- **Pack station** `PS-01…PS-09`, prep table "โต๊ะเตรียมงาน 2", production line "ไลน์ผลิต A/1". Zones with conveyors/rails: "ราง 1 · สีฟ้า กล่องเล็ก · งานด่วน" (rail 1, blue, small boxes, urgent work), "ราง 2 · สีส้ม กล่องใหญ่ · แตกง่าย · แพ็คหลายกล่อง" (rail 2, orange, large boxes, fragile, multi-box).
- **Packing scan line**: SKU, lot, serial (`SN-884221`), handling pills (ห่อบับเบิ้ล 2 ชั้น = wrap in 2 layers of bubble), scanned n/N. Kits: "เซต BN-SET-01 × 1 = BN-SERUM-30 × 1 · BN-CREAM-50 × 1 [แพ็ครวมตอนส่ง]" (the kit's components are packed together at shipping).
- **Weight**: actual vs expected ± tolerance ("0.78 กก. คาด 0.80 ± 5%", "± 5% หรือ 20 กรัม").
- **Documents**:
  - receipt / tax invoice 80 mm (ใบเสร็จรับเงิน/ใบกำกับภาษี)
  - warranty card A4 ×2 (outside the box)
  - owner PO A4, invoice / tax invoice for B2B
  - Shipping Mark, per-box content list
- **Video**: per order, "● REC 00:42 · กล้อง IP PS-01" (recording, IP camera at PS-01); viewable on the order.
- **Exception case**: time, order · job · station, type, detail, required action, status, owner (responsible).
- **VAS job** `VA-YYMMDD-NNN` (VA-261013-142). Fields: mode (ตามเอกสาร per document / ตามช่วงเวลา per period), order or pallet + owner, task + qty, source (กฎเจ้าของสินค้า owner rule / เจ้าของสินค้าสั่ง · OMS owner order / คลังสร้าง warehouse-created / งานแก้ไขของคลัง warehouse rework), status, doer.
- **Material moves** `MV-261013-0031` (box assembly), `MV-261013-0033` (desk-side top-up).

### Pack methods (วิธีแพ็ค)
1. **แพ็คตามคำสั่งซื้อ** (pack by order). Used for discrete, batch and sort-while-pick picks. The job is opened by scanning the label, which must already be printed. Every piece is scanned and the actual packaging is scanned.
2. **แพ็คตามใบหยิบ** (pack by pick list). Used for single-SKU, single-item and identical-set picks. Scan the pick list, then the first piece; the system selects a matching order that is not yet packed. Every piece is scanned per order, and the label prints when that order's box closes.
3. **แพ็คแบบไลน์ผลิต** (production-line pack). Used for single-SKU and identical-set picks when the whole list is identical.
   - Scanning the pick list opens the line; one box type is confirmed for the whole line.
   - Labels are pre-printed for the whole list; packers scan the label per box, plus random checks (e.g. every 20th box gets a full scan). Serial items are always scanned.
   - Reconcile: picked = output + waste + leftover. A "Recipe" must truly match (SKU, qty, lot, pack rules).
4. **แพ็คหลายกล่อง** (multi-box). One order, many boxes.
   - Scan "เปิดกล่องใหม่" (open new box) for each box; boxes are numbered 1, 2…
   - Unit-of-measure barcodes (pack / case) count by units per pack; loose pieces are scanned one by one; an original carton can ship whole.
   - Each box gets a content list and a label marked n/total. The invoice and attachments go into the last box.

### Status values
- **Pack job flow**: รอเตรียมงาน → กำลังเตรียม → พร้อมแพ็ค → กำลังแพ็ค → แพ็คสำเร็จ (awaiting prep → preparing → ready to pack → packing → packed).
  - Side tags (with reason and wait time): ผิดปกติ (exception), ยกเลิก (cancelled), พัก (on hold, e.g. "รอเจ้าของสินค้ายืนยันของแถม", waiting for the owner to confirm a freebie).
  - Order-level: แพ็คแล้ว (packed), ไม่ถูกยกเลิก · 11:24:05 (not cancelled, checked at that timestamp), สุ่มตรวจ (random-checked), รอสแกน (awaiting scan), ครบ (complete).
- **Prep**: รอเตรียม, กำลังเตรียม, ส่งต่อแล้ว HH:MM (dispatched), เลยกำหนด N นาที (overdue). Item status: ครบ / กำลังทำ / รอ.
- **PDA prep**:
  - ของฉัน, รอรับ, รอเบิก (awaiting material pick)
  - ขึ้นรูปกล่อง (box assembly), เติมหน้าโต๊ะ (desk-side top-up)
  - พร้อมส่งต่อ (ready to dispatch), รอคัดแยก (awaiting sort), รอขึ้นรูปกล่อง (awaiting box assembly)
  - Box types: กล่องแบน (flat), กล่องเปิดแล้ว (pre-assembled)
- **Station**:
  - กำลังแพ็ค (packing), งานด่วน (urgent job)
  - รอเตรียมงาน (waiting on prep), ว่าง · ไม่มีคน (no one logged in)
  - อุปกรณ์มีปัญหา (equipment problem)
  - ยืมมาแพ็ค · ถึง 17:00 (prep table borrowed for packing until 17:00)
  - Zone: งานล้น · ขาดคน 1 (overloaded, one person short)
- **Exception types**:
  - ของขาด (short), ผิดรหัสสินค้า (wrong SKU), น้ำหนักผิดปกติ (abnormal weight)
  - วัสดุไม่พร้อม (materials not ready), เอกสารพิมพ์ไม่ได้ (document cannot print), ถูกยกเลิกระหว่างแพ็ค (cancelled while packing)
  - หลักฐานไม่ครบ (incomplete evidence), กล่องไม่พอ (not enough boxes)
  - Case states: รอแก้ (to fix), พักกล่อง (box on hold), ส่งหัวหน้า (escalated to supervisor), ปิดแล้ว (closed).
- **VAS**: รอทำ (to do), กำลังทำ (in progress), เสร็จแล้ว (done), รอเจ้าของสินค้าอนุมัติ (awaiting owner approval), เจ้าของสินค้าไม่อนุมัติ (rejected by owner).
- **PDA print**: พิมพ์แล้ว ✓, ไม่ตอบ (printer not responding), พิมพ์ที่โต๊ะ (print at the desk). Video: ปิดแล้ว (stopped).

### User actions (buttons)
- **Overview**: เปลี่ยนโหมดโต๊ะ (change station mode), มอบหมายโต๊ะ (assign station), เปลี่ยนโซนปลายทาง (change destination zone). Suggested move: an identical list goes to an idle desk as by-pick-list packing, via "ใบงานแพ็ค › เปลี่ยนวิธีแพ็ค".
- **Jobs**: จัดการปัญหา (handle exception); ⋯ split a job over several stations (identical-list jobs only); change pack method (supervisor, reason required).
- **Station / PDA**:
  - สแกนเปิดงาน (scan to open job)
  - ผิดปกติ (report exception), ลบชิ้นล่าสุด (remove last item), พักงาน (pause job)
  - ยืนยันขึ้นรูป N กล่อง (confirm N boxes assembled), สแกนงานถัดไป (scan next job)
  - พิมพ์ซ้ำ (reprint), เลือกเครื่องพิมพ์อื่น (choose another printer), ไปพิมพ์ที่โต๊ะ PS-03 (go print at desk PS-03)
  - เปิดดูผูกเครื่องพิมพ์ (ผู้ดูแล) (view printer binding, admin)
  - รับทราบ · ทำต่อ (acknowledge and continue)
  - Special QR codes: "ใช้กล่องเดิม" (reuse original box), "บับเบิ้ลเพิ่ม" (extra bubble), "ห่อของขวัญแล้ว" (gift-wrapped), close-video QR, "ต้องใช้หลายกล่อง" (needs multiple boxes; the only method change a packer can make).
- **Prep (desktop)**: พิมพ์แผ่นสแกนบรรจุภัณฑ์ (print packaging scan sheet), กำหนดวิธีเบิกกล่องที่เลือก (set box-picking method for selected sheets), พิมพ์รายการเบิกที่เลือก (print pick lists for selected sheets), พักงาน (pause), แก้คนในจุดงาน (edit crew at the work point).
- **Prep (PDA)**:
  - ยืนยันเบิก N ชิ้น (confirm N picked), ไม่พอ (not enough), ข้ามไปก่อน (skip), ดูทั้งหมด (view all)
  - ขึ้นรูปกล่องเลย (assemble boxes now), รับใบถัดไป (ขึ้นรูปทีหลัง) (take next sheet, assemble later)
  - ส่งต่อไปแพ็คเลย (dispatch to packing now), + สร้างงานขึ้นรูปกล่องรอไว้ (create a box-assembly task in advance)
  - เปลี่ยนวิธีเบิก (ใส่เหตุผล) (change picking method, reason required), เปลี่ยนเป็นอันดับถัดไป (switch to next-ranked box; reasons: หมดชั้น out on shelf, กล่องชำรุด damaged box, อื่น ๆ other)
  - เก็บไว้ที่โต๊ะ (keep leftovers at the desk) / คืนชั้น (return to shelf)
- **VAS**: งานตามช่วงเวลา (period-based task), งานตามคำสั่งซื้อ (order-based task); create form fields include order, free-text task ("ติดสติกเกอร์โปรโมชัน 11.11", apply 11.11 promo sticker), qty, rate, date range, daily capacity.

### Roles implied
- **Packer (ผู้แพ็ค)** at a desk station or on a PDA.
- **Prep staff (แผนกเตรียมงาน)**: a leader on a PC plus PDA staff and helpers ("ทีม: แอน (หัวหน้า · คอม) · บอย (PDA) · คนช่วย 3", team: Ann (leader, PC), Boy (PDA), 3 helpers). Material picking and dispatch are separate PDA permissions ("ใช้บน PDA").
- **Supervisor (หัวหน้า)**:
  - opens boxes held for abnormal weight
  - approves reprinting labels ("พิมพ์ใบปะหน้าซ้ำ (หัวหน้าอนุมัติ)")
  - approves packaging that is not yet configured
  - changes pack method, assigns stations
  - sees reasons for box substitutions
- **Admin (ผู้ดูแล)**: printer binding. A responsible person (ผู้มีสิทธิ์) reviews material shortages.
- **Owner (เจ้าของสินค้า)**: approves warehouse-created VAS jobs, confirms freebies, orders VAS via OMS or the owner portal.

### Business rules visible
- **How the pack method is known**: any scan (label, order or pick list) resolves to order → pick list (PK) → the pack method stored on the pick list.
  - The default comes from the rule "วิธีแพ็คเริ่มต้นตามวิธีหยิบ" (default pack method by pick method, in กฎงานคลัง › แพ็ค).
  - A supervisor can change it at list creation or on the job (reason required); the packer cannot.
  - Scanning a production-line label without first opening the line redirects the packer to the correct line.
- **Readiness**: a pack job is created together with the pick list (status รอเตรียมงาน), so prep can start during picking. It becomes "พร้อมแพ็ค" once pick/sort is complete and prep is dispatched (or no prep is needed). No new paper: the original pick-list QR, cart or label can be scanned.
- **Order cannot be closed until all items arrive**. Example: "จอเหลือง" (yellow screen) waits for child pick list PK-…-1; the first part is staged in tote TT-0218; the station is notified when complete.
- **Owner change request** during packing: the box cannot be closed and goods go to the hold location.
- **Cancelled during packing**: the label print is locked immediately, goods go to the return-to-shelf location, and **no packing fee is charged**.
- **Label and document printing trigger**: all items scanned correctly means status "แพ็คแล้ว" (packed), the tracking number is issued, and the label plus receipt/tax invoice print together **while video continues recording**.
  - Video stops on the close-video QR or on scanning the next item.
  - "ห้ามปิดวิดีโอพร้อมพิมพ์ใบปะหน้า · วิดีโอต้องเห็นใบปะหน้าของคำสั่งซื้อนั้น": video must not stop at label print and must show that order's label.
  - Every exception case is linked to the order's video.
- **Batch label printing** prints only labels never printed before. A reprint needs supervisor approval and the print count is logged.
- **Camera priority (PDA)**: ① IP camera of the work point bound to the PDA → ② PDA built-in camera → ③ none = a single "ไม่มีวิดีโอ" warning and work continues (recorded as no video). USB cameras cannot be used with a PDA.
- **Weight check**: from the connected scale or entered manually. Outside tolerance → box held (พักกล่อง) and the supervisor opens and inspects it.
- **Packaging and materials**:
  - Packaging scan is mandatory, 1 per box. Auto-consumed materials when the box closes, e.g. bubble roll paired with the box is included in the packaging fee, while bubble sheets per SKU are charged.
  - Extra material via the "บับเบิ้ลเพิ่ม" scan. Packaging not yet configured triggers a warning and needs supervisor confirmation.
  - The recommended box and backup ranks are shown; the packer can scan another box without giving a reason.
  - "ใช้กล่องเดิม" (reuse original box): no stock deduction, no packaging fee, no reason needed. For multi-parcel shipments, dimensions L×W×H are asked when the carton is not full.
- **Inserts and marketing material**: per owner rule (card, flyer, sample when spend ≥ 500, gift wrap). Some must be scanned, others are "ไม่ต้องสแกน · หยิบใส่ตามที่เตือน" (no scan, insert as prompted), with stock deducted at handover. If material is missing and the owner rule allows packing to continue, the shortage is logged for review.
- **Prep (add-on)**:
  - Materials are reserved when the prep sheet is created. Material picking is a location move (MV) to the conveyor or desk; stock is deducted when the box closes; leftovers return to shelf via a putaway task.
  - Prep time is measured separately from pack time.
  - Dispatch requires materials picked + sort complete (if applicable) + box assembly done (if "assemble before dispatch" was chosen).
  - Labels are printed in cart-slot order 1 → N. Optional stricter checks: scan label per slot, or label + box.
  - Platform labels cannot be edited; a small slot number in the margin is allowed if the platform permits.
  - Pick-list paper format is configurable: thermal 80 mm or A4, with QR.
  - Box assembly is a sub-function that can be disabled separately in กฎงานคลัง. Disabling the whole module removes prep and box assembly.
  - Box-assembly time is not charged separately (included in the packing fee).
  - Dispatch on PDA: scan cart → scan transfer container (tote/flat cart) → scan conveyor QR (a wrong conveyor gives a red screen). After the conveyor scan the cart is released automatically.
  - Desk-side top-up: when a box type falls below its minimum (e.g. 12 < 20), a top-up task (+50) is generated.
- **Zone routing** when creating a prep sheet:
  1. job type (instant → express zone; multi-box → zone B)
  2. jobs with A4 documents → a desk with an A4 printer
  3. box size and special handling
  4. owner's dedicated zone
  5. shortest queue
  - When a zone overflows, move staff or re-route jobs not yet placed on the rail.
- **Stations**:
  - Two stations can never pack the same order.
  - Stations with faulty equipment (camera, scale, printer) receive no work; the fault is auto-detected via อุปกรณ์และสถานี (Equipment & Stations).
  - Urgent jobs always go to the first free station.
  - Queue is sorted by required pack-complete time (= carrier pickup − X minutes, from settings).
- **VAS (add-on)**:
  - Inserts, brochures and freebies from owner rules use matching rules, not VAS.
  - VAS examples: gift wrap, greeting card, box labels (Shipping Mark), per-box content list, pallet wrap.
  - Billing by source:
    - owner rule → auto-created
    - owner-ordered (OMS or owner portal) → do it, bill at the agreed rate
    - warehouse-created → owner approval required (except pre-approved work)
    - warehouse rework → not billed
    - free-text notes do not create jobs
  - 1 document + 1 task type = 1 job (no duplicates). Only completed work with evidence is billed.
  - Adding VAS after packing requires opening the box, which always needs owner approval.
- **KPIs**: exception rate (6/524 = 1.1%), mean time to resolve per type over 7 days, orders/hour per packer (production lines excluded), boxes/hour per station, hourly output vs plan.

### Devices implied
- **Desk station (primary)** with PC, label printer, A4 printer (some desks), receipt printer 80 mm, scale, IP camera, barcode scanner. Audible and red-screen alerts on wrong scans.
- **PDA (secondary)** for warehouses without desk PCs or for packing bulky items. Prints over Wi-Fi to a bound printer and can use the built-in camera.
- Conveyors / rails with QR, production lines, tablet or PDA for signatures.
- "Equipment & Stations" settings register cameras, scales, scanners and printers.

### Multi-owner / 3PL indicators
- Owner shown on every job. Owner-branded packaging (BN-GIFTBOX), owner-specific inserts and flyers, owner fragile rules, owner dedicated zones.
- Owner approval for VAS, owner confirmation of freebies, per-owner billing (packaging fee, bubble fee, VAS rates, "ไม่คิดค่าแพ็ค", no packing fee on cancel).
- B2B flows: owner PO, Shipping Mark, retail branch delivery.
- **Judgement**:
  - Core packing (4 methods, scan verification, weight, label/doc print, video evidence, exceptions) is **core WMS**. Video evidence is a strong Thai e-commerce norm and appears mandatory-by-default here.
  - Billing hooks (packaging fees, VAS charging, owner approval) are **3PL**; they are needed if the warehouse bills multiple owners.
  - The prep / box-assembly module and the VAS module are explicitly add-ons, making them **Phase-2 candidates**.
  - Production-line packing [INFERRED] can also be deferred if volume is low.

---

## 3. Handover to carriers (ส่งมอบขนส่ง)

### Screens
| File | Purpose |
|---|---|
| handover.html | Handover overview (ภาพรวมส่งมอบ). Unhanded parcels by wave, waves handed over, late trucks, cancellations to pull, carry-over, decisions pending, today's waves table, customer pickup & own delivery, door/staging adjustments, daily reconciliation by carrier. |
| handover-sort-to-containers.html | Sort parcels into handover containers in two modes: container-first (เติมภาชนะ) or parcel-first (คัดแยกพัสดุ). |
| handover-containers.html | Container register: bags, cages and pallets with carrier/wave, fill level, seal, location and status. |
| handover-station.html | Handover execution for three types: carrier (ขนส่ง), customer pickup (ลูกค้าเข้ารับ), own-fleet delivery (คลังจัดส่ง). Includes the carrier-reject / cancel pull-out mode. |
| handover-manifests.html | Manifests (ใบส่งมอบ) per wave: parent/child, driver, proof, carrier-received reconciliation. |
| handover-pending-day-close.html | Pending handover & day close (ค้างส่งมอบ & ปิดวัน): checklist, physical count of leftovers, carry-over, missing-parcel cases. |
| handover-pda-sample.html | PDA sample: home, task queue, both sorting modes, red screens, search inside container, vehicle registration, handover, carrier reject, driver signature, customer pickup, day-close count. |

### Key entities & fields
- **Container / ภาชนะ**: handover bag `BG-0311` (capacity 40), cage `CG-0012` (120), pallet `PL-0040`.
  - Fields: type, carrier · wave (or drop-off trip, or own-delivery trip TR), box count n/capacity, seal no. `S-88213`, staging location (`OUT-S1`, `OUT-S10`, `ลานส่งมอบ` dock yard), status, closed-by.
  - Containers are **permanent with a reusable QR** and are not carrier-specific until opened; carrier and wave are bound on first use.
- **Parcel / tracking no.**: `SPXTH0331184`, `JT8812004471`, `FLTH22019985`, `KRTH0098812`, `LZDTH0031827`, `KEX0012339120`. Customer-pickup boxes are labelled order no. + box no. (`SO-261013-05001-5`).
- **Manifest / ใบส่งมอบ** `MF-YYMMDD-NNN`; child manifest `MF-261013-012-1` (per shop account, e.g. "บัญชีร้านเจ้าของสินค้า (Shopee)" owner's shop account vs "บัญชีคลัง" warehouse account).
  - Fields: carrier · wave, vehicle plate · driver (`3ฒข-1234 · สมศักดิ์`), trip TR, containers / parcels / orders, handed-over at · by, carrier-received count (`64 / 64 API`), proof (signature, photo).
  - Handover types: ขนส่งเข้ารับ (carrier pickup), คลังนำส่งเอง (Drop-off) (warehouse drops at the carrier), ลูกค้าเข้ารับเอง (customer pickup), คลังจัดส่ง (own-fleet delivery), โอนย้ายคลัง (inter-warehouse transfer).
- **Vehicle registration**: plate, driver, vehicle type (4 ล้อใหญ่ large 4-wheeler), visit history ("มาแล้ว 23 ครั้ง", 23 visits), plate photo, arrival time.
- **Missing-parcel case** `MP-YYMMDD-NNN` (MP-261013-001).
- **Locations**:
  - `CXL` (cancelled hold)
  - `OUT-S0` (waiting for containers)
  - `EMPTY-1` (empty containers)
  - `OUT-S9` (large jobs), `PICKUP-1`, `RIDER-2` (rider pickup point)
  - doors `OUT-D3`
- **Daily reconciliation per carrier**: orders packed today, handed over successfully, cancelled before handover (returned / waiting), pending (found / not found), carried over from yesterday.

### Status values
- **Container**:
  - เปิดอยู่ → ปิดแล้ว → กำลังส่งมอบ → ส่งมอบแล้ว (open → closed → handing over → handed over)
  - plus กำลังใส่ (filling), มีกล่องยกเลิก N (has N cancelled boxes), ปิดแล้ว · มีกล่องยกเลิก (closed, has cancelled box), ปิดแล้ว · รอขึ้นรถ (closed, awaiting loading), ส่งมอบแล้ว 12:08 (handed over at 12:08)
- **Wave**:
  - รอแพ็ค (awaiting packing), กำลังคัดแยก (sorting), กำลังส่งมอบ (handing over)
  - ส่งมอบแล้ว HH:MM (handed over at time), มีกล่องยกเลิก N (N cancelled boxes)
  - กำลังนำส่งศูนย์ (being dropped at carrier hub)
  - รถมาถึงแล้ว (truck arrived), ด่วน (urgent), รอ (waiting), ช้า 20 นาที (truck 20 min late)
- **Manifest**:
  - รอส่งมอบ (awaiting handover), กำลังส่งมอบ (handing over), ส่งมอบแล้ว (handed over), กำลังขึ้นรถ (loading)
  - มีงานยกเลิก 2 (2 cancelled jobs), ภาชนะยังไม่ขึ้นรถ 1 (1 container not loaded)
  - รออนุมัติ · ไม่มีหลักฐานส่งมอบ (awaiting approval, no proof of handover)
  - ขนส่งรับไม่ครบ 1 (carrier received 1 short)
  - "หลักฐานส่งถึง รอปลายทาง" (proof of delivery pending at destination)
- **Handover screen**:
  - ยังไม่ตัดสต๊อก (stock not yet deducted)
  - ขึ้นรถแล้ว (loaded) / ยังไม่สแกน (not yet scanned)
  - Drop off N
  - จอง Drop-off · ขนส่งเข้ารับ (booked as drop-off, but the carrier came to pick it up)
  - Pickup
  - Cancel-reconcile results: ตรงกัน (matches), ขนส่งรู้ก่อน (carrier knew first), ระบบยกเลิก (system-cancelled), ล่าสุด (latest)
  - Customer: เจ้าของสินค้ามาถึงแล้ว (owner's pickup arrived), สแกนส่งมอบแล้ว N (N boxes scanned out)
  - Own fleet: ยังไม่ขึ้น (ขึ้นท้ายสุด) (not yet loaded, load last), ขึ้นแล้ว (loaded)
- **Sorting result**: ใส่แล้ว (placed), ยกเลิก → แพ็คแล้วรอคืน (cancelled → packed, awaiting return), ผิดขนส่ง (Flash) (wrong carrier), ใส่ภาชนะได้ (can be placed in container).
- **Pending / day close**:
  - พบของ (found), ไม่พบ · เปิดเคส (not found, case opened), ไม่พบ · ยังไม่เปิดเคส (not found, no case yet)
  - ขนส่งไม่รับ · รอตรวจ (carrier refused, awaiting check)
  - ส่งทันที · ไรเดอร์ไม่มา (instant delivery, rider did not come)
  - Day close: ยังปิดไม่ได้ · เหลือ 3 ข้อ (cannot close yet, 3 items left)
- **Customer pickup**: ลูกค้าเข้ารับ (customer pickup), มาถึงแล้ว (arrived), พร้อมให้รับ (ready for pickup), ส่งมอบแล้ว (handed over). Own delivery: คลังจัดส่ง, กำลังขึ้นรถ 2 / 3 (loading 2 of 3), รอคัดแยก (awaiting sort).
- **PDA**: ของฉัน (mine), รถมาแล้ว (truck here), หลัง 18:00 (after 18:00), ด่วน (urgent).

### User actions (buttons)
- **Overview**:
  - พิจารณา (decide on a late truck after hours)
  - ดูใบส่งมอบ (view manifest)
  - เรียกรถใหม่ (re-call rider via OMS)
  - ส่งมอบ (hand over)
  - ย้ายจุดวาง (move staging spot)
  - ย้ายไปประตู (move to door)
  - เปลี่ยนประตูรอบนี้ (change door for this wave)
  - ปิดประตู (close door)
- **Containers**: พิมพ์ป้ายภาชนะที่เลือก (print labels for selected containers); search by container, parcel or seal no.
- **Sorting PDA**:
  - ปิดภาชนะ (close container, records the seal no.)
  - ยกเลิกล่าสุด (undo last)
  - toggle between the two sort modes without closing the container
  - ดึงออกครบแล้ว (pull-out complete)
- **Handover**:
  - รถใหม่ (new vehicle), ถ่ายป้ายทะเบียน (photograph plate), ยืนยันรถ · มาถึง (confirm vehicle arrived)
  - ยืนยันส่งมอบ (เมื่อครบ) (confirm handover when complete)
  - ล้าง (clear signature), ถ่ายรูปภาชนะบนรถ (photograph containers on truck), บันทึก → ยืนยันส่งมอบ (save → confirm handover)
  - รูปบัตร (photograph ID), ให้ผู้รับเซ็น (get recipient signature)
- **Manifests**: พิมพ์ที่เลือก (print selected).
- **Day close**:
  - ปิดวัน · ยกไป 37 (close day, carry over 37)
  - เรียกรถใหม่ (re-call rider)
  - เปิดเคส (open case)
  - ตรวจ (inspect)
  - ส่งผลนับให้หัวหน้า (send count result to supervisor)

### Roles implied
- **Handover staff (แผนกส่งมอบ)** on PDA (มณี, บอย). Can move staging spots (packing staff can too).
- **Floor supervisor (หัวหน้างาน)**: move to a door; approves manifests without proof ("ให้อีกคนอนุมัติ", a second person approves); certifies receipt when there is no API.
- **Warehouse manager (หัวหน้าคลัง)**: close or swap doors.
- **Claims owner (ผู้ดูแลงานเคลม)**: notified when the carrier receives fewer parcels than handed over.
- **Carrier driver**: signs on PDA or paper; plate photo.
- **Customer / owner's staff** collecting goods (ID photo, signature).
- **Owner (เจ้าของสินค้า)**: registers pickup person, vehicle type (mandatory) and plate in the owner portal; confirms mismatched pickup people; chooses a pickup slot or books one day ahead.

### Business rules visible
- **Sorting checks** (parcel → container): packed ✓, carrier matches the container ✓, not cancelled ✓. The cancellation timestamp is shown ("ข้อมูลการยกเลิกอัปเดตล่าสุด 14:21", last updated 14:21).
  - Wrong carrier → red screen; place the parcel at that carrier's spot.
  - Cancelled → red screen; place at `CXL` and scan its QR. The return job is created automatically: "แพ็คแล้วรอคืน" (packed, awaiting return).
  - Scanning a container bound to another carrier → red screen. Scanner-only.
- **No open container for a carrier/wave**: scan any empty container to bind it (handover bag recommended) and optionally print a wave label. If no empty containers remain, scan the `OUT-S0` holding spot and an alert fires.
- **"Flash ทุกบัญชีคัดแยกลงภาชนะชุดเดียวกัน"**: all Flash accounts share containers; the manifest later splits into child manifests by account.
- **Drop-off parcels** (where the warehouse must deliver to the carrier itself) go into a drop-off container per carrier/trip. If a drop-off-booked parcel is picked up by the carrier at the warehouse instead, it is allowed onto the manifest: no block, stock is deducted at handover, and **no drop-off fee is charged**.
- **Container close** records the seal number. Containers with cancelled boxes go to the top of the list and **cannot be handed over until pulled out**. Pulling from a closed container means breaking the seal and scanning a new seal number.
- **Handover flow (carrier)**:
  1. register the vehicle
  2. scan **containers only**, not individual boxes (the box list comes from sorting)
  3. seal check (mismatch → "ค้นหาในภาชนะ", scan each box in that container, then reseal)
  4. driver scans and receives; cancelled jobs are pulled out once, at this point
  5. optional weighing (off by default, enabled when there is a yard scale; a variance means inspecting that container)
  6. print manifest / driver signs + photo
  7. confirm handover. This is **the stock-deduction point** (SHIPPED).
  - Unscanned containers at confirm can be split off as pending; the manifest recounts automatically.
- **Carrier-reject reconciliation**: scan each label the driver returns, then scan `CXL`. The system compares against our cancellation list:
  - ตรงกัน (match): cancelled → packed, awaiting return
  - ขนส่งรู้ก่อน (carrier knew first): removed from the manifest and waits for verification; if the cancellation is not real, it goes to the next wave
  - ระบบยกเลิกแต่ขนส่งยังไม่ปฏิเสธ (we cancelled but the carrier has not rejected it): must always be pulled out
  - A label from another wave gives a red screen and is not deducted.
- **Owner change request**: pull the parcel immediately. If it is in a closed container, pull it at handover and lock the container. A loading scan shows red "ห้ามส่ง · เจ้าของสินค้าขอแก้ไข" (do not ship, owner requested a change).
- **Proof**:
  - The system produces a PDF manifest with signature. On paper, print, have it signed, and photograph it.
  - Without signature or photo, a second person must approve.
  - Carrier receipt via API is reconciled per parcel after handover; shortages open a case from the manifest. "ห้ามยืนยันยอดรวมแล้วค่อยแก้ทีหลัง": never confirm a total and fix it later.
  - Without an API, supervisor-certified proof is used.
  - A multi-box order counts as 1. Parent manifest = sum of its children. Every handover type gets an MF.
  - The truck/trip column shows a TR when the transport module is on; otherwise plate and driver are typed in.
- **Truck no-show**: goods stay in stock and move to the next wave; no return transaction is created.
- **Late truck after hours**: a decision is required by a deadline (e.g. 19:30; no answer = don't wait, move to the morning wave). Shows staffing need ("ต้องอยู่ 2 คน ประมาณ 1.5 ชม.", 2 people for about 1.5 hours).
- **Customer pickup**:
  - No fixed waves. The owner contract defines a service level, e.g. orders in before 12:00 → pickup by 18:00 the same day; after 12:00 → by 12:00 the next business day. Packing must finish 2 hours before the slot.
  - When packed, the order is "พร้อมให้รับ" and the owner is notified with a QR. One appointment can hold several orders of one owner; 1 manifest per appointment. Confirm only when every box of every order is scanned.
  - Pickup person verified against the owner's notice (name, vehicle type, plate, staff ID photo). A mismatch needs owner confirmation in the portal or approval.
  - Vehicle type mismatch → warning and a suggestion to move between front of warehouse and a door.
  - No-show → reschedule and notify the owner.
- **Own-fleet delivery (คลังจัดส่ง)**:
  - Scan pallets or containers or the trip number. Load in reverse stop order ("ขึ้นรถจากจุดส่งสุดท้ายก่อน", last stop loaded first); the order is validated.
  - Driver signs in the driver app plus a tail photo. Departure = stock deduction; proof of delivery is captured in the driver app.
  - If the truck does not leave, stock remains and the trip is changed.
- **Doors and staging**: system-assigned but changeable. Every move requires scanning the box or container, then the new spot. Who, when, from → to and the reason are logged on the order; no extra fee. Default doors, large-job thresholds and door-bound spots are edited only in settings.
- **Day close checklist** (cannot close until all are done):
  1. all of today's waves closed (7/7)
  2. cancellations all pulled
  3. physical count of leftovers, each scanned with its container or location
  4. every not-found parcel has a case owner
  5. every carrier-refused parcel inspected
  - Closing snapshots the summary and cannot be edited back.
  - Carry-over creates **no new order, parcel, stock or packing fee** and keeps the original pack date.
  - Not-found parcels stay in the pending count.
  - Carrier-refused: truly cancelled → awaiting return; not cancelled → next wave.
- **Daily equation**: packed today = handed over + cancelled before handover + pending (no overlap). Orders and parcels are counted separately; carry-over from yesterday is not added to today's packed count.
- **Instant delivery** where the rider did not come: re-call the rider via OMS ("เรียกรถใหม่ = ส่งคำขอไป OMS"), with a deadline before the platform cancels.
- **Universal scan on PDA**: scanning any code opens the correct task (parcel = sort, container = handover). Urgent tasks are on top with a sound alert.

### Devices implied
- PDA/handheld scanner, scanner-first ("ใช้เครื่องสแกนอย่างเดียว", scanner only); signature capture on PDA or tablet; camera for plate, container and ID photos.
- Optional yard scale. Label printer for container labels.
- Seals (physical). Carrier API integration for receipt confirmation and cancellation status.

### Multi-owner / 3PL indicators
- Child manifests split by account: "บัญชีร้านเจ้าของสินค้า (Shopee)" (owner's own platform account) vs "บัญชีคลัง" (warehouse's carrier account). This is a strong 3PL signal: carriers are contracted either by the owner or by the warehouse.
- Containers mix owners within a carrier wave. The late-truck decision lists parcels per owner (BeautyNara 120 · HealthyMe 80).
- Customer pickup is configured by owner contract and verified via the owner portal. Fee signals: "ไม่คิดค่าคลังนำส่งเอง" (no drop-off fee), "ไม่คิดค่าบริการเพิ่ม" (no extra charge), no new packing fee on carry-over.
- **Judgement**:
  - Sort-to-container, container-scan handover, cancellation pull-out, manifest with signature, day close and carry-over are **core WMS** for Thai e-commerce: the platforms' cancellation dynamics make them essential.
  - Parent/child manifests by account, owner-portal pickup verification and fee nuances are **3PL**.
  - Weighing at handover, the door re-assignment tooling, and the late-truck decision workflow are **Phase-2** candidates [INFERRED].

---

## 4. Transport management (จัดการรถขนส่ง) — entire module is an add-on

### Screens
| File | Purpose |
|---|---|
| transport.html | Transport overview: requests waiting for a vehicle, near-deadline bookings without vehicle data, today's trips, POD pending, own fleet utilisation, urgent table, today's vehicle board. |
| transport-booking-requests.html | Vehicle booking requests (คำขอจองรถ) from all sources, with urgency and status. Includes a "create new job" form. |
| transport-trip-planning.html | Trip planning (จัดเที่ยวรถ): combine jobs into a trip, order stops, book a vehicle (own / subcontractor / Lalamove), cost vs sell price, overweight warnings. |
| transport-trips.html | Trip sheets (ใบงานเที่ยวรถ): all trips and statuses, driver work order print, cost / sell / profit per trip, POD gaps. |
| transport-fleet.html | Vehicles, drivers and subcontractors (รถ & คนขับ): document expiry, maintenance intervals, availability blocks. |
| transport-driver-app-sample.html | Driver app sample: today's trips, depart, deliver with POD (photo, signature), delivery failure reasons. |

### Key entities & fields
- **Transport job / request** `TJ-YYMMDD-NNN`.
  - Sources: รับเข้า · ขอรถไปรับ (inbound pickup, linked to ASN `AS-261014-003`), ส่งมอบ · คลังจัดส่ง (own delivery, MF-261013-011), เคลม · รับของคืน (claim return pickup, `CL-261013-004`), โอนย้ายคลัง (TF-261013-001), ฟอร์มขอใช้รถ (request form, e.g. ฝ่ายขาย sales), งานภายใน (internal).
  - Fields: urgency (ปกติ normal / ด่วน urgent / ด่วนมาก very urgent), date/time window, route from → to, goods (boxes / pallets / kg), contact, status, trip.
  - Form inputs: name, date, time, origin, address / map link, quantity (e.g. 2 pallets).
- **Trip / เที่ยวรถ** `TR-YYMMDD-NNN`. Fields:
  - vehicle source (รถของคลัง own fleet / Lalamove / รถร่วม / เหมา subcontract or day-hire)
  - vehicle type, plate, driver
  - job types, stops (ordered ▲▼), load kg / capacity
  - cost (ต้นทุน) and sell price (ราคาขาย), billed to owner or not ("ไม่เรียกเก็บ (ต้นทุนคลัง)", absorbed as warehouse cost)
  - Lalamove booking no. `LLM-88213045`, "รอจากแอป" (waiting for app data)
- **Vehicle**: plate, type (4 ล้อทึบ 4-wheel box, 1.5 t; กระบะ pickup, 1 t; 6 ล้อ 6-wheel, 2 t), ownership, default driver, daily status, tax and compulsory insurance (ภาษี / พ.ร.บ.) expiry, service interval in km. Inputs: payload 1,500, odometer, etc.
- **Driver**: name, phone, licence class (ท.1 / ท.2) and expiry, status.
- **Subcontractor (รถร่วม / ผู้ให้บริการ)**: contact, hire model (เหมาวัน day rate / ต่อเที่ยว per trip), vehicles, contract period, rate (3,500 / วัน; ค่ารถจริง + 10% actual cost +10%; "300 + 12 บาท/กม. · ค่ายก 150" base + per-km + loading fee), drivers seen before.
- **Vehicle block** `TB-261013-001` (ปิดรถ, vehicle unavailable) with a start–end range.

### Status values
- **Request**:
  - จองแล้ว · รอข้อมูลรถ (booked, awaiting vehicle data)
  - รอจัดรถ (awaiting vehicle assignment)
  - จัดเข้าเที่ยวแล้ว (assigned to trip)
  - ยืนยันรถแล้ว (vehicle confirmed)
  - ยกเลิก (cancelled)
  - เสร็จสิ้น (completed)
- **Trip**:
  - ร่าง (draft)
  - จองแล้ว · รอข้อมูลรถ (booked, awaiting vehicle data)
  - กำลังขึ้นรถ (loading)
  - ออกรถแล้ว / กำลังวิ่ง (departed / on the road)
  - กำลังนำส่งศูนย์ (delivering to carrier hub)
  - เสร็จ (done; may carry "จุดที่ 2 ส่งไม่สำเร็จ", stop 2 failed)
  - ยกเลิก (cancelled; "ต้นทางยกเลิก", cancelled at source)
  - POD: หลักฐานส่งถึง n/N (proof of delivery), รอเซ็นรับ (awaiting signature)
- **Vehicle**:
  - ว่าง · จองได้ (free, bookable)
  - มีเที่ยว · ว่างหลัง 19:00 (has a trip, free after 19:00)
  - ปิดรถ · ซ่อมเบรก ถึง 15/10 (blocked, brake repair until 15/10)
  - ไม่ได้จอง (not booked)
- **Driver**: มีเที่ยว (on a trip), ว่าง (available), ลา (on leave).
- **Warnings**:
  - ⚠ ใกล้เวลา ยังไม่มีข้อมูลรถ (near time, no vehicle data yet)
  - ⚠ ต้นทางแก้จำนวน 4 → 6 พาเลท (source changed quantity from 4 to 6 pallets)
  - ⚠ น้ำหนักรวมในเที่ยวเกิน (2,300 / 2,000 กก.) (trip weight over capacity)
  - ภาษีหมดอายุใน 25 วัน (tax expires in 25 days), ใบขับขี่หมดอายุใน 30 วัน (licence expires in 30 days)
- **Delivery failure reasons**: ไม่มีคนรับ (no one to receive), ที่อยู่ผิด / หาไม่เจอ (wrong address / not found), ผู้รับปฏิเสธ (recipient refused), อื่น ๆ (other).

### User actions (buttons)
- **Overview / requests**:
  - ตัวอย่างแอปคนขับ (driver app sample)
  - ติดตามรถ (track vehicle)
  - จัดรถ (assign vehicle)
  - ดูคำขอ (view request)
  - จัดเที่ยวรถ (N) (plan N into a trip)
  - สร้างงานใหม่ (create new job)
  - ใส่ข้อมูลรถ (enter vehicle data)
- **Planning**: tick jobs → จัดเที่ยวรถ; reorder stops ▲▼; เปิดใบงาน (open trip sheet); แผนที่ (map); ใบงานคนขับ (driver work order).
- **Trips**: พิมพ์ใบงานที่เลือก (print selected), ยืนยันเที่ยว (confirm trip), ใส่ข้อมูลรถ (enter vehicle data).
- **Fleet**: เพิ่มรถ (add vehicle), ปิดรถ / คนขับไม่ว่าง (block vehicle / driver unavailable), ปิดรถ (block vehicle), แจ้งไม่ว่าง (report unavailable), เพิ่มคนขับ (add driver), เพิ่มผู้ให้บริการ (add subcontractor).
- **Driver app**:
  - ออกรถ (depart), แผนที่ (map), โทร (call)
  - ถ่ายรูปของที่ส่ง (photograph delivered goods), ให้ผู้รับเซ็น (get signature), ส่งสำเร็จ (delivered)
  - ถ่ายรูปหน้างาน (photograph on site), บันทึก · กลับไปจัดรถใหม่ (save, back to re-assign)

### Roles implied
- **Transport / dispatch coordinator** (office).
- **Requesters**: inbound, outbound, claims and transfer staff, plus non-warehouse departments (ฝ่ายขาย sales). They see plate, driver, phone and appointment time as soon as the vehicle is confirmed.
- **Own-fleet driver and subcontract driver**: both use the driver app via a link from the work order.
- **Lalamove**: status comes from the provider's app.
- **Owner**: approves charges ("ขาย 600 · เจ้าของสินค้าอนุมัติ", sell 600, owner approved).

### Business rules visible
- **Scope**: inbound and outbound cannot book vehicles themselves; they must request through this menu. Parcel carrier waves (Flash, J&T…) are **not** here; they are handled in handover.
- **Requests from other menus**: arrive automatically with pickup/drop points, contact, qty and weight. A source edit or cancellation raises a review warning. A cancelled source → cancel the vehicle with the provider and close the job.
- **Sort order**: ด่วนมาก (very urgent) on top. Today's view also shows jobs left over from previous days.
- **Trip building**:
  - Several jobs can share one trip, and a large job can split across trips. Stops are ordered.
  - The system blocks trips for blocked vehicles, drivers on leave or vehicles with expired documents. Overweight produces a warning plus a suggestion (move a job or use a 10-wheeler).
  - Booking deadline alerts ("ต้องจองก่อน 16:00 วันนี้", must book before 16:00 today).
- **Subcontractor registration** is done once per provider; vehicles and drivers are entered at booking and remembered. Lalamove needs no registration: enter the booking number and wait for vehicle data.
- **Document expiry** warnings 30 days ahead. Service interval tracked by km.
- **Costing**:
  - Each trip has a cost and a sell price; profit = charged − cost.
  - Profit per owner per month (e.g. HealthyMe 3,120 บาท). Charged transport fees **flow automatically into the owner's bill**; detailed reports live in the Reports menu.
  - Some trips are a warehouse cost, not billed.
- **Fallback for a carrier no-show**: own vehicle drops parcels at the carrier hub ("Flash Home บางเขน แทน Flash รอบ 18:00 · รถขนส่งไม่มา", Flash Home Bang Khen instead of the 18:00 Flash wave because the carrier truck did not come). Charged to the owner with approval.
- **Driver app flow**: depart → arrive → deliver with photo and signature (box scan optional) → success.
  - Failure: choose a reason + photo, and the job returns to the request queue for re-dispatch. Goods returning to the warehouse go to **inbound returns (สินค้าตีกลับ, ส่งไม่สำเร็จ)**.
  - The POD-incomplete KPI lists trips missing a photo or signature.
- **Module data**: hidden when the module is disabled. Handover still works and drivers are typed in manually.

### Devices implied
- Desktop for dispatch. **Driver mobile app** (web link for subcontractors) with camera, signature, map, phone.
- Lalamove app/API integration [INFERRED from "สถานะจากแอปของผู้ให้บริการ" (status from the provider's app) and "ต้นทุน 420 (จริงจากแอป)" (actual cost from the app)].

### Multi-owner / 3PL indicators
- Per-owner transport charging and profit, owner approval for chargeable trips, and owner-specific inbound pickups (ASN) and B2B deliveries. Cost vs sell margin tracking is a 3PL business feature.
- **Judgement**: the entire module is an explicit add-on (โมดูลเสริม) and is mostly fleet/TMS functionality, not core WMS, so it is **Phase-2 (or later)**. Core WMS only needs the handover-side fallback of free-text plate and driver.

---

## Cross-module observations
- **One number for pick list, pack job and prep sheet** (PK-…). Child suffix `-1` for re-picks; `-1/-2` for child manifests. Date-coded IDs follow `XX-YYMMDD-NNNN` throughout (YY=26 → 2026, Buddhist-era not used).
- **The stock deduction point differs by flow**:
  - carrier handover confirm = SHIPPED / stock cut
  - own-fleet: departure
  - packing materials: when the box closes
  - non-scanned inserts: at handover
  - Before handover, stock stays on hand (no "return" transaction when a truck doesn't come).
- **Cancellation is enforced at every stage**:
  - pick: remove the order, goods go to the return location
  - sort: red screen
  - pack: lock the label, no fee
  - container: blocked until pulled
  - handover: reconciled with the carrier
- **OMS is a separate upstream system**: order source, short names, rider calls, owner change requests. Owner portal ("ระบบสำหรับเจ้าของสินค้า") is referenced for VAS orders and pickup registration.
- **Settings referenced**:
  - ตั้งค่าคลัง › อุปกรณ์และสถานี › อุปกรณ์และภาชนะ (warehouse settings: equipment & stations, equipment & containers)
  - กฎงานคลัง › หยิบ / แพ็ค / สินค้าคงคลัง (warehouse work rules: pick / pack / inventory)
  - ตั้งค่าบริษัท › การแจ้งเตือน (company settings: notifications)
  - shift settings (lunch break in plans)
- **Notable gaps / not seen**: no explicit wave-release approval, no label/rate shopping across carriers (labels come from platforms via OMS), no cartonization algorithm beyond "recommended box + backups" [INFERRED].


---

# D. Orders · Returns · Claims · Billing

Source: 24 mockups (`orders*`, `returns*`, `claims*`, `billing*`) of "Fullfeel Fulfillment" (warehouse: คลังบางเขน). Owners seen in data: Siam Herb, BeautyNara, HealthyMe, Mommy Care, Pet Lover, NatureBox, GreenLeaf, Baby Bloom, Urban Tea, Kids Joy, MOVEFAST, SKJ, XO1.

**Edition flag found in the HTML (important for scoping).** Each mockup has a toggle: "Zimple Fulfillment (3PL)" vs "Zimple WMS (Business)". A per-page JS variable decides what Business mode shows:
- `orders*`, `returns*`: `pg=""` → exist in **both** editions.
- `claims*`: `pg="cl"` → Business mode shows "Zimple WMS (Business) ไม่มีเมนูเคลม" (no claims menu). In Business, claims are handled in OMS › บริการหลังการขาย (after-sales). Sidebar header says `เฉพาะ 3PL`.
- `billing*`: `pg="3pl"` → "หน้านี้มีเฉพาะ Zimple Fulfillment (3PL) · Zimple WMS (Business) ไม่มีเมนูนี้". Billing is **3PL-only**.
- Returns VAS is labelled `โมดูลเสริม · งานเพิ่มเติม` (add-on module).

Cross-cutting ID formats seen in this section:

| Prefix | Meaning | Example |
|---|---|---|
| SO- | Sales order / outbound order (คำสั่งซื้อ), YYMMDD-seq | SO-261010-04801 |
| PK- / PK-…-n | Pick list (ใบหยิบ) / child pick list (เลขลูก) | PK-261010-0118, PK-261010-0118-1 |
| MV- | Stock move (incl. replenishment, return putaway) | MV-261013-0004 |
| TT- | Tote / container (ภาชนะ) | TT-0218, TT-0303 |
| C30-07 | Cart (รถเข็น), with slot (ช่อง) | C30-07 ช่อง 3 |
| PS- | Pack station (โต๊ะแพ็ค) | PS-03 |
| BG- | Handover bag/container (ภาชนะส่งมอบ) | BG-0103 |
| MF- | Handover manifest (ใบส่งมอบ) | MF-261008-014 |
| TF- | Inter-warehouse transfer | TF-261013-003 |
| KB- | Cancel-return-to-shelf job [INFERRED from "รอคืนชั้น KB-…"] | KB-261009-006 |
| TR- | Own-fleet truck trip (เที่ยวรถ) | TR-261014-004 |
| RT- | Return receipt (ใบรับพัสดุตีกลับ) — one per carrier drop-off | RT-261013-0004 |
| RP- | Return problem report (รายงานปัญหา) | RP-261013-0012 |
| VA- | VAS job (งานเพิ่มเติม) | VA-261013-016 |
| DMG-T-01 / Q-RET-01 / RET-HOLD-02 | Damaged container / quarantine zone / return-to-owner hold location | |
| CL- | Claim case (เคลม) | CL-261013-004 |
| CS- | Owner/OMS after-sales case (บริการหลังการขาย) | CS-261013-0042 |
| JT-CLM-…, FL-CLM-… | Carrier's own claim reference | JT-CLM-55210 |
| EV- | Billing event / charge line (รายการค่าบริการ) | EV-261015-088412 |
| AJ- | Billing adjustment (รายการปรับปรุง) | AJ-261012-0004 |
| BC- | Billing cycle per owner (รอบบิล), YYMM-seq | BC-2610-001 |
| IV- / RE- | Invoice / receipt (ใบแจ้งหนี้ / ใบเสร็จ) | IV-260917-0001, RE-260930-0004 |
| SV- / PM- / SH- | Rate-card version: service / packaging / shipping, prefix-YEAR-seq (resets yearly) | SV-2026-03, PM-2026-02, SH-2026-01 |
| RS- | Rate sheet document sent to owner for signature | RS-261020-0003 |
| CC- | Cycle-count / stock reconciliation round | CC-261011-001 |
| RQ- | Owner request (e.g. count request) | RQ-261014-025 |
| AS- / TM- / PO- | Inbound ASN (แจ้งสินค้าเข้า) / temp receipt / owner PO | AS-261014-001, TM-261003-002, PO-BN-5521 |
| EX | VAS job no. for in-warehouse labelling (mentioned) | — |
| Contract no. | 3PL contract | FF-3PL-2026-014, BN-2026 |

---

## Orders (คำสั่งซื้อ)

### Screens
| File | Purpose |
|---|---|
| orders.html | Today's order dashboard: volume by channel, backlog by stage, cut-off risk per carrier wave, urgent decisions, rush-request approvals |
| orders-list.html | Full order table across all owners/channels with stage counters, exception/cancel buckets, filters, bulk print/hold |
| orders-detail.html | Order detail at "packed, awaiting handover" (SO-261010-04801): progress, pick lists, lines w/ lot/expiry/location/price, packing record, timeline |
| orders-detail-delivered.html | Same order type delivered, with an open claim panel (CL-261013-015 / CS-261013-0042) |
| orders-detail-claim-resend.html | Claim re-ship order (ส่งเคลม · คลังออก) SO-261013-05020 created from claim CL-261012-011 |

### Key entities & fields
- **Order header**: SO no.; owner (เจ้าของสินค้า); channel (Shopee, Lazada, TikTok Shop, LINE, เว็บไซต์, B2B, นอกแพลตฟอร์ม); channel order no(s) (e.g. LN-88213 + LN-88214 → `รวมส่ง 2 คำสั่งซื้อ` = merged shipment); external ref (หมายเลขอ้างอิงภายนอก PO-SH-7781); source ref (SH-LN-88213); order time; carrier; cut-off (ตัดรอบวันนี้ 17:00); recipient name + province; items/qty; tracking no. (เลขพัสดุ) incl. reprint count ("พิมพ์ 2 ครั้ง"); booking type (Pickup / Drop off); SLA countdown (เหลือ 25 นาที / วันนี้ 16:00).
- **Order type** (filter options): คำสั่งซื้อปกติ; เบิกออก (outbound issue) with reasons ครีเอเตอร์ / การตลาด / ใช้ภายใน / คืนเจ้าของสินค้า; ส่งเคลม · คลังออก (claim re-ship, warehouse pays); ส่งเคลม · เจ้าของสินค้าออก (claim re-ship, owner pays); ส่งเคลม · รอผล (re-ship before investigation result).
- **Delivery mode**: carrier, ลูกค้าเข้ารับ (customer pickup, appointment "นัด 11:00"), คลังจัดส่ง (own truck, trip time "เที่ยว 16:30"), รถของคลัง.
- **Tags (ป้าย)**: ส่งด่วน, B2B, COD, มูลค่าสูง, เปลี่ยนสินค้าแล้ว, มีงานเพิ่มเติม, มีเอกสารใส่กล่อง, ใบปะหน้าขากลับ, หลุดรอบ, ใกล้หมดอายุ, รอโอนจากคลังรอง; also `ไม่ตัดสต๊อก`, `ไม่คิดค่าบริการ` on claim orders.
- **Order lines**: SKU, name, lot · expiry (L2609-03 · 03/2027), pick-from location (A-03-02-1), qty / picked / packed, price/unit, discount, line total — grouped by channel order no.
- **Value summary**: ราคาสินค้า, ส่วนลดรายการ, ส่วนลดร้านค้า/โค้ด, เงินอุดหนุนจากแพลตฟอร์ม, ค่าส่งที่เก็บจากผู้ซื้อ, ยอดชำระ (COD).
- **Pick lists for the order**: pick list no., part picked, picker, status; consolidation point (จุดรวมของ TT-0218).
- **Packing record**: packer, station, duration (3:10 นาที), check method (สแกนทุกชิ้น), box (Fullfeel-Box-B × 1), weight actual vs expected (1.84 vs 1.80 กก. · ผ่าน), materials (บับเบิ้ล 1 ม., สติ๊กเกอร์ระวังแตก), inserts (การ์ดขอบคุณ), pack video.
- **Timeline events**: received from Zimple OMS + stock reserved, address edited on behalf of owner (with evidence photo), added to pick list, pick done, pack done, label printed, into container, truck departed + stock deducted, carrier scanned (API), delivered (API), claim opened.

### Order lifecycle / statuses (exact labels)
Progress stepper: รับคำสั่งซื้อ (received) → ข้อมูลขนส่งครบ (carrier data complete: tracking no. + label) → หยิบ (pick) → แพ็ค (pack) → รอส่งมอบ (awaiting handover; container + wave) → ส่งมอบขนส่ง (handed to carrier; manifest) → ส่งถึงผู้รับ (delivered).

Status pills / list buckets:
- `รอข้อมูลขนส่ง` — awaiting carrier data (no tracking/label → cannot create pick list; system re-pulls every 5 min; after 2 h owner notified)
- `รอสร้างใบหยิบ` — awaiting pick-list creation
- `รอหยิบ` — awaiting pick
- `กำลังหยิบ` — picking
- `รอแพ็ค` — awaiting pack
- `แพ็คแล้วรอส่งมอบ` — packed, awaiting handover
- `กำลังนำส่งศูนย์` — warehouse driving parcels to carrier hub
- `ส่งมอบแล้ว` — handed over (sub-notes e.g. "ตีกลับ · ตรวจสภาพแล้ว")
- `จัดส่งสำเร็จ` — delivered
- `ผิดปกติ` (exception) with sub-reasons:
  - `คลังแจ้งแก้ไข · รอเจ้าของสินค้า` — warehouse sent back to owner to fix (e.g. สินค้าไม่พอ)
  - `เจ้าของสินค้าขอแก้ไข · รอเจ้าของสินค้า` — owner pulled order back to edit (must answer by deadline)
  - `พักไว้ · รอคลัง` — warehouse hold for inspection (e.g. high value)
  - dashboard reasons: รอเจ้าของสินค้า, ที่อยู่ไม่ครบ, ระงับบริการ (service suspended)
- Cancellation, by stage reached (drives follow-up work and fees):
  - `ยกเลิก · ก่อนหยิบ` (before pick)
  - `ยกเลิก · หลังหยิบ` → รอคืนชั้น (return-to-shelf job KB-…)
  - `ยกเลิก · หลังแพ็ค` → เปิดกล่องคืนชั้น, carrier booking cancelled
  - `ยกเลิก · หลังส่งมอบ` → รอตีกลับ (await RTS)
  - cancel actor recorded: ผู้ซื้อ / แพลตฟอร์ม / ฝ่ายดูแลเจ้าของสินค้าในนามเจ้าของสินค้า
- Claim-related: `เคลม · รอคลังตอบ` (+ `เหลือ 7 วัน`), `ส่งเคลม · คลังออก`, `ส่งเคลม · รอผล`, `รอโอนจากคลังรอง`.
- Edit-request outcomes (owner edit request): ส่งกลับแล้ว / ปฏิเสธ + เหตุผล / ถอนคำขอ / ดึงไม่ทันรอบ.
- Pick-list pills: `ของครบ 2 / 2 · แพ็คแล้ว`, `หยิบแล้ว 08:44`.
- Rush check pills: `ทัน · เสร็จประมาณ 15:40`, `ไม่ทัน · เสนอรอบพรุ่งนี้ 10:00`.

### User actions
พิมพ์ใบปะหน้า, พิมพ์ใบปะหน้าที่เลือก (bulk), พักที่เลือก / พักคำสั่งซื้อ (hold), จัดการ (manage menu), สร้างใบหยิบ, จัดการปัญหา, วิดีโอแพ็ค, เปิดเคส (open claim), อนุมัติ / ปฏิเสธ (owner edit requests after pick start), พิจารณา (rush request), ดูงานแพ็ค, ดูรายการ, ดูคำสั่งซื้อ, ตัวกรองเพิ่ม, search by order/channel/external ref/tracking/recipient.

### Roles implied
- Floor: pickers (นิด, บอย), packers.
- Supervisors (หัวหน้า): approve rush requests, edit requests, split pick by zone.
- ฝ่ายดูแลเจ้าของสินค้า (account/owner-care team) — acts **on behalf of owner** (`ทำแทนเจ้าของสินค้า`) only if owner enabled that permission.
- ผู้ดูแลงานเคลม (claims officer, e.g. แอน) — creates claim re-ship orders.
- Permission `ดูราคาและส่วนลดคำสั่งซื้อ` gates price/discount columns (e.g. หัวหน้า, ผู้ดูแลงานเคลม, ฝ่ายดูแลเจ้าของสินค้า); everyone sees COD and total value.
- Owner/client — creates/edits/cancels orders in owner portal.

### Business rules visible
- **Warehouse never creates, edits or cancels owner orders** ("ไม่มีปุ่มแก้คำสั่งซื้อใน WMS"). Owner does it in owner portal, or owner-care does it on owner's behalf when permission is enabled. Urgent case: warehouse presses "พักคำสั่งซื้อ" then notifies owner-care.
- Orders arrive from Zimple OMS (source system) with stock reserved (จองสต๊อกครบ).
- Order may have multiple pick lists: extra pick / split pickers / supervisor split by zone = child numbers of original; "เปิดหยิบแยกโซน" = new pick list per zone; all goods consolidate at one point; pack only when complete.
- Stock is deducted at truck departure (รถออก · ตัดสต๊อก) for warehouse-delivered handovers.
- Cut-off slack: `เวลาเผื่อ = ต้องแพ็คเสร็จ − (งานค้าง ÷ ความเร็วจริงของทีมวันนี้)`; if negative, system suggests extra headcount or deferring N orders to next wave; alerts 60 and 15 min before pack cut-off.
- "Urgent" defined as: ส่งทันที (instant delivery, e.g. Shopee) with little time left; carrier waves expected to miss; exceptions with owner not answering near deadline.
- **Rush request (คำขอจัดด่วน)**: owner asks to process after channel cut-off; system checks which wave is still feasible; accepted → urgent pick list at head of queue. Distinct from carrier Express. Rush fee charged **only if handed over within the accepted wave**.
- Auto pick-list waves (ใบหยิบอัตโนมัติรอบถัดไป 13:45).
- Owner edit request after picking started → stop pick/pack pending decision.
- Claim re-ship orders: `ไม่ตัดสต๊อก` + `ไม่คิดค่าบริการ` when warehouse at fault; pack video auto-recorded and linked to claim.
- Secondary-warehouse transfer may be required before fulfilling (รอโอนจากคลังรอง, TF-…).

### Devices
Desktop (lists, dashboards). Label printers. Pack-station video camera (pack video tied to order/claim). Weighing scale at pack. Carrier API integrations (pickup scan, delivery).

### Multi-owner / 3PL indicators & judgement
- Subtitle "คำสั่งซื้อทุกช่องทางของทุกเจ้าของสินค้า" — one warehouse, many owners; owner column on every row; owner-care acting-on-behalf; per-owner permissions; service suspension (ระงับบริการ) per owner [INFERRED: billing/credit related].
- **Judgement: core WMS (both editions)**. The order lifecycle, pick/pack/handover tracking, cut-off management and exception handling are core. 3PL-flavoured extras: "acting on behalf of owner", owner edit-request workflow, `ไม่คิดค่าบริการ` flags, rush-request fee, ระงับบริการ — these could be Phase-2 / 3PL layer on top of core.

---

## Returns (สินค้าตีกลับ)

### Screens
| File | Purpose |
|---|---|
| returns.html | Returns overview: boxes received today by carrier, receipts awaiting signature, inspection backlog aging, restock pending by owner, open problem reports, inspection results by owner |
| returns-receive.html | Return receiving station (full-screen): one receipt per carrier drop-off, scan every label, auto-match to original order, driver signs on screen; plus receipt list and system-generated "expected returns" list |
| returns-inspection.html | Per-item inspection station: scan item → condition → photo if not good → scan destination container; kit/set component check |
| returns-restock.html | Putaway of inspected items: scan item/container then location; becomes sellable only on location scan |
| returns-jobs.html | Unified return-job board per parcel across all stages, KPIs (overdue, throughput per inspector, restock rate) |
| returns-problem-reports.html | Problem reports (RP) with photo/video evidence, claim-against party, owner approval, bulk status change |
| returns-vas.html | Add-on module: extra work on returns (inspect, re-bag, sticker, repackage) per parcel or per period, billed |
| returns-pda-sample.html | PDA reference screens (not a real menu): home, queue, receive, item inspection, serial check, duplicate/not-handed-over errors, putaway, report problem |

### Key entities & fields
- **Return receipt (RT)**: RT no., carrier, driver name, plate (2ฒก-8812), start time, boxes scanned, matched / not found, status; carrier-locked scanning.
- **Return parcel**: tracking no.; type `ส่งไม่สำเร็จ` (failed delivery, same tracking no.) vs `ผู้ซื้อคืนสินค้า` (buyer return, new tracking no., e.g. FLRT…); original SO; owner; carrier · RT · date; stage; inspection result.
- **Expected return (รอรับคืน, system-created)**: original parcel · return no.; SO · owner; source (ยกเลิกหลังส่งมอบ / ขนส่งแจ้งส่งไม่สำเร็จ / คำขอคืนจากแพลตฟอร์ม / เจ้าของสินค้าแจ้งในระบบสำหรับเจ้าของสินค้า / เรียกคืนของที่ส่งผิด (เคลม)); booked by (คลังจอง vs จองโดยร้าน (Marketplace)); wait window (รอได้ 7 วัน (Flash)).
- **Inspection**: per item, per unit (ชิ้นที่ 1/2), lot, condition, photos, note, video timestamp, destination container (TT-0303 good / DMG-T-01 damaged), scanned vs shipped (5/6).
- **Kit/set check**: set code (BN-SET-01, warehouse-assembled) with component checklist (อยู่ / ขาด).
- **Serial check**: shipped serials (SN-884221, SN-884222) vs returned serial.
- **Problem report (RP)**: no. · datetime; return parcel (+ original tracking) · SO; problem type + description; source; evidence count (photos · videos); responsible staff; status; handling; claim-against party.
- **Restock line**: SKU · lot; MV no. · RT ref; container; suggested location (A-03-02 · ชั้นหยิบ or RET-HOLD-02 · รอเบิกคืนเจ้าของสินค้า); stock section (สินค้าปกติ / สินค้าคืน); status; assignee.
- **Returns VAS job (VA)**: job no. · mode (ตามเอกสาร per parcel / ตามช่วงเวลา per period); parcel · owner; task · qty; origin (กฎเจ้าของสินค้า / เจ้าของสินค้าสั่ง / คลังสร้าง); approval; status · doer; daily quota (40 / วัน).

### Workflow states
Parcel journey (returns-jobs): รอรับคืน → รับเข้า → ตรวจสภาพ → รอเจ้าของสินค้า / งานเพิ่มเติม → เก็บคืนชั้น → เสร็จ.
- Job pills: `รอรับคืน · เกินกำหนด 2 วัน`, `รอตรวจ` / `รอตรวจ · ค้าง 3 วัน`, `กำลังตรวจ · นิด`, `ไม่พบคำสั่งซื้อ`, `รอเจ้าของสินค้าตัดสิน`, `รองานเพิ่มเติม`, `รอเก็บคืนชั้น`, `เสร็จ`.
- Receive-scan results: `รับเข้าคลังแล้ว`, `รอสแกนเลขเดิม` (new return label, need original no.), `ไม่พบคำสั่งซื้อ · กักตรวจ`, `พัสดุนี้รับคืนแล้ว` (duplicate — no count), `เลขพัสดุนี้ยังไม่ได้ส่งมอบ` (never handed over — not recorded), `สแกนเข้าไม่ได้ · ไม่ใช่ Flash` (wrong carrier for this receipt).
- Receipt pills: `กำลังสแกน` / `กำลังรับ`, `รอเซ็นรับ`, `เซ็นรับแล้ว`.
- Expected-return pills: `เกินกำหนด 2 วัน`, `ระหว่างทาง`, `รับแล้ว 16:05` (+ ไม่รับเข้าสต๊อก), `ขนส่งแจ้งถึงแล้ว` (carrier says delivered but warehouse hasn't received → check at dock).
- **Inspection grades** (condition labels): สภาพดี (good), ชำรุดเสียหาย (damaged), รหัสสินค้าผิด (wrong SKU), หมดอายุ (expired), บรรจุภัณฑ์เสีย (packaging damaged), ไม่ใช่ของเจ้าของสินค้า (not owner's goods), plus system-derived ไม่ครบสูญหาย (missing — from unscanned qty), `ยังไม่บันทึกสภาพ`. Inventory outcomes per subtitle: ขายได้ / รอตรวจ / ชำรุด / ส่งคืนเจ้าของสินค้า / ทำลาย.
- Problem-report types: กล่องบุบ/ชำรุด, กล่องเปียก, ซีลหรือเทปถูกเปิด, ไม่มีใบปะหน้า, น้ำหนักต่างจากตอนส่ง, ชำรุดเสียหาย, หมดอายุ, ไม่ครบสูญหาย, รหัสสินค้าผิด, บรรจุภัณฑ์เสีย, Serial / ล็อตไม่ตรง, ได้คืนเกินที่ส่งออก, เซตไม่ครบ, ไม่ใช่ของเจ้าของสินค้า, ไม่พบคำสั่งซื้อ. PDA short set: สูญหาย / เสียหาย / ไม่ตรงกับระบบ.
- RP status: `รอดำเนินการ` → `ดำเนินการแล้ว`; handling: `หน้างานจัดการแล้ว`, `รอเจ้าของสินค้าอนุมัติ`; claim-against: ขนส่ง / ผู้ซื้อผ่านแพลตฟอร์ม / คลัง / ไม่ต้องเคลม; source: ตรวจสภาพ / รับพัสดุ (ก่อนเปิดกล่อง) / ไม่พบคำสั่งซื้อ (system) / แจ้งเอง.
- Restock: `รอเริ่ม` → `กำลังย้าย · บอย` → `เสร็จ 14:20`.
- Returns VAS: `รอเจ้าของสินค้าอนุมัติ`, `รอทำ`, `กำลังทำ`, `เสร็จแล้ว`, `เจ้าของสินค้าไม่อนุมัติ`, `ยังไม่บันทึกยอดวันนี้`.

### User actions
Receive: ปิดใบรับ · ให้ขนส่งเซ็นรับ, พักใบนี้ไว้, สแกนต่อ, เซ็นรับ, พิมพ์ใบรับที่เลือก, ติดตามขนส่ง, toggle โหมดเต็มจอ. Scan QR "ไม่มีเลขเดิม" → quarantine.
Inspect: สภาพดีทุกชิ้น, condition labels / scan condition QR, ถ่ายรูป (or scan photo QR), แก้, แจ้งปัญหา, พักงาน, บันทึกผลตรวจ, ดูวิดีโอแพ็ค.
Jobs: ตรวจ, ขอยืนยันเจ้าของ (unknown-order parcel), บันทึกงาน, เก็บคืนชั้น, ติดตามขนส่ง, Excel.
Problem reports: แจ้งปัญหา (ไม่มีใบปะหน้า), bulk เปลี่ยนเป็น รอดำเนินการ / ดำเนินการแล้ว, Excel (summary or with photo links), อัดวิดีโอ, บันทึกรายงาน.
Restock: มอบหมายผู้เก็บ, เริ่มย้าย.
VAS: งานตามช่วงเวลา, งานตามเลขพัสดุ, เริ่มทำ, บันทึกยอด.

### Roles implied
Return receivers/inspectors (สมพร, นิด, มณี), putaway staff (บอย), หัวหน้า (supervisor; toggles full-screen, assigns, handles unknown-order RP), carrier driver (signs on screen), owner (decides on quarantined/missing items, approves VAS, sees results & RPs in owner portal), after-sales team (decides refunds under คำสั่งซื้อ › บริการหลังการขาย "ตามสิทธิ์").

### Business rules visible
- 1 receipt (RT) = 1 carrier drop-off round; scanning is **carrier-locked** (only that carrier's labels); beep codes (short = ok, low = duplicate/check/wrong carrier).
- A return parcel can be received **only once**; only parcels already handed to carrier can be received.
- Unknown order still received → quarantine Q-RET-01, owner not assigned by staff; RP auto-opened; owner confirms. Billing for such parcels deferred until owner confirms (then back-dated to receipt date).
- Expected returns auto-created from: cancel after handover, carrier failed-delivery/RTS, platform return request, owner notification in portal. Wait window by booker: warehouse-booked = warehouse carrier rule (e.g. 7 days Flash); marketplace-booked = platform rule. Overdue → track carrier.
- All parcels start as `สินค้าคืน (รอตรวจ)`; **not sellable until inspected and putaway location scanned**. Stock count is added at inspection save — only physically scanned units. Wrong location scan → warning, no stock move.
- Inspection: non-good items require ≥1 photo; good items need no photo (video already recorded at station). Unscanned shipped units → ไม่ครบสูญหาย + RP auto-opened on save.
- Kit check: any missing component → เซตไม่ครบ → quarantine Q-RET-01, RP, owner decides. OMS-managed bundles (warehouse sees components) are inspected per item normally.
- Serial mismatch → not accepted as sellable; segregate; alert per company notification settings.
- Damaged → damaged stock section (สินค้าชำรุด). Return-to-owner items → RET-HOLD-02.
- Owner rule (กฎเจ้าของสินค้า) can auto-require VAS before restock (e.g. "เปลี่ยนถุงก่อนคืนชั้น").
- Claim-recall returns (wrong/excess shipped by warehouse): received **without increasing stock** (never deducted); good → putaway, damaged → move normal → damaged; claim count closes automatically.
- Inspection overdue threshold 2 days.
- **Returns VAS rules**: owner-rule jobs auto-created; owner-ordered (OMS or portal) = do immediately at agreed rate; free-text notes don't create jobs; warehouse-created = await owner approval (unless pre-approved); warehouse's own corrective work not billed; 1 document + 1 work type = 1 job (no duplicates); billed only for completed qty with evidence; VAS done ≠ sellable — must re-inspect before restock.
- Refund/compensation decisions are made in OMS after-sales, not in WMS ("ตัดสินของคืนที่ คำสั่งซื้อ › บริการหลังการขาย").

### Devices
Receiving and inspection desks: **desktop computer + barcode scanner** (explicit). Inspection station has **video recording** and photo capture (camera beside video; or scan QR to take photo). On-screen driver signature. **PDA** used mainly for walking putaway (explicit), sample PDA flows for receive/inspect/serial/report as reference.

### Multi-owner / 3PL indicators & judgement
- Owner per parcel, owner rules, owner approval of VAS, owner decision on quarantined items, owner-visible results/RPs in portal, per-owner restock KPIs, billable return fees.
- **Judgement: core WMS** for receive → match → inspect → restock → problem report (present in both editions). **3PL/Phase-2**: owner-approval loops, billable returns VAS (marked add-on module), "claim against" party bookkeeping.

---

## Claims (จัดการเคลม) — 3PL-only (`เฉพาะ 3PL`)

### Screens
| File | Purpose |
|---|---|
| claims.html | Claims overview: open cases by type, cases > 2 days, awaiting investigation, awaiting approval, awaiting resend/recall |
| claims-jobs.html | Claim work queue across all owners, oldest first; unassigned/no-root-cause/no-cost alerts; avg case age by status |
| claims-review.html | Single-case workbench with 5 steps: preliminary check → fault investigation (auto-pulled evidence) → approval → resend/recall → costs & close; message thread |
| claims-carrier.html | Claims filed with carriers booked under warehouse account: file, track, record payout |
| claims-costs-prevention.html | Per-case cost lines (responsible party, charge to owner?) and prevention actions (CAPA) |

### Key entities & fields
- **Claim case (CL)**: no. · date; SO · owner; type · detail; investigation result; status · case age; case owner (ผู้รับผิดชอบเคส); linked CS case from OMS after-sales; deadline (ต้องสรุปผลภายใน; owner-facing "ตอบภายใน 7 วัน").
- **Claim types**: ส่งขาด (short), ส่งสลับ / ผิดรหัสสินค้า (swapped/wrong SKU), ส่งเกิน (over-ship), สินค้าชำรุด (damaged), ผิดล็อต / วันหมดอายุ / Serial, ของแถม / งานเพิ่มเติมขาด (missing freebie/VAS), สูญหาย (lost), ส่งผิดที่อยู่ (wrong address), อื่น ๆ; also สินค้าไม่ตรง (lot mismatch).
- **Preliminary check table**: SKU, ควรได้ (expected), ผู้รับได้รับ (received), ต่าง (diff: -1/+1/ตรง); recipient photos.
- **Auto evidence timeline**: pick scan log (picker, location scanned, SKU scanned once + qty typed), adjacent-location similarity, pack scan (2/2), weight vs expected (% diff), pack video clip, handover (container, manifest, seal intact), carrier POD (signature).
- **Investigation**: root-cause step (หยิบ, รับเข้า/ตรวจสภาพ, จัดเก็บ/เติมชั้นหยิบ, คัดแยก/เตรียมงาน, แพ็ค, ส่งมอบ, ขนส่ง, ข้อมูลคำสั่งซื้อ/การเชื่อมต่อ); department that should have caught it (รับเข้า, สินค้าคงคลัง, หยิบ, เตรียมงาน, ตีกลับ, ไม่มี); cause (หยิบผิดรหัส · ตำแหน่งติดกัน กล่องคล้าย, หยิบจำนวนผิด, ตำแหน่งผิด, อื่น ๆ); findings with references (บันทึกการหยิบ, วิดีโอแพ็ค, น้ำหนัก, หลักฐานไม่พอ).
- **Carrier claim**: CL no. · type; carrier · tracking; evidence; amount claimed; filing deadline (ยื่นได้ถึง); carrier claim ref.
- **Cost line**: CL no.; item · category (ค่าสินค้าชดเชย, ค่าขนส่งรับคืน, ค่าขนส่งส่งใหม่, วัสดุแพ็ค, ส่วนต่างจากการนับ); estimate/actual amount; responsible party (คลัง / ขนส่ง / เจ้าของสินค้า / ร่วมกัน / รอสรุป); billing treatment (ไม่คิดเจ้าของสินค้า / คิดเจ้าของสินค้า / เครดิตคืนเจ้าของสินค้า).
- **Post-claim count**: location · SKU, system qty, counted, count variance (auto-created after resend).
- **Prevention action**: action, root cause · source case(s), owner (หัวหน้าหยิบ/หัวหน้าแพ็ค), due date, status.

### Workflow states
Case steps: ① ตรวจเบื้องต้น → ② ตรวจสอบความผิด → ③ อนุมัติผล → ④ ส่งใหม่ / รับคืน → ⑤ ค่าใช้จ่าย & ปิดเคส.
- Status pills: `รอตรวจเบื้องต้น`, `ตรวจสอบความผิด` (+ draft label `ร่าง · พักไว้`), `รออนุมัติผล` (+ `เกินกำหนด`), `รอผลเคลมขนส่ง`, `รอรับของคืน`, `รอที่อยู่จากเจ้าของสินค้า`, `รอเจ้าของสินค้าตอบกลับ`, `เสร็จสิ้น`, `ยกเลิก` (e.g. owner withdrew before inspection). Overview groups: รอตรวจ, รออนุมัติผล, รอเจ้าของสินค้าตอบกลับ, รอส่ง / รับคืน.
- Sub-track pills: ผลตัดสิน `กำลังสอบสวน`; ส่งใหม่ `ยังไม่เริ่ม`/`ยังไม่สร้าง`; รับคืน `ยังไม่เริ่ม`/`ยังไม่ขอรถ`; ค่าใช้จ่าย `รอสรุป`; count `รอผลนับ`, `รอผลนับ · รอของคืน`.
- **Verdicts (ผลตัดสิน)**: `คลังผิด` (warehouse at fault), `ไม่พบหลักฐาน · คลังรับผิด` (no evidence → warehouse accepts), `ขนส่งที่จองผ่านบัญชีคลังผิด` (carrier booked on warehouse account at fault), `ขนส่งแพลตฟอร์มผิด` (platform carrier at fault), `ข้อมูลคำสั่งซื้อผิด` (order data wrong), `เจ้าของสินค้ารับผิดชอบเอง` (owner responsible, e.g. manufacturing defect), `คลังไม่ผิด · แจ้งเจ้าของสินค้า`, `หลายสาเหตุ`.
- Carrier claim: `ยังไม่ยื่น` → `ยื่นเคลมแล้ว` → `ได้รับเงิน <amount>` / `ขนส่งปฏิเสธ` (+ reason, e.g. หลักฐานไม่พอ).
- Cost line: `รออนุมัติผล`, `ยืนยันแล้ว`, `รอเงินจากขนส่ง`.
- Prevention: `ยังไม่เริ่ม`, `กำลังทำ`, `เสร็จ` (ผลดีขึ้น).
- Owner-side claim pill on order: `เคลม · รอคลังตอบ`, `รอคลังตอบ · เหลือ 7 วัน`; overdue = เกินเวลา.

### User actions
เปิดเคสแทนเจ้าของสินค้า (open case on owner's behalf), มอบหมาย, ระบุแผนก, บันทึก (cost), ตรวจ, อนุมัติผล, ติดตามเคลมขนส่ง, ความเคลื่อนไหวสินค้า, ดูวิดีโอ, verdict buttons, บันทึกร่าง · พักไว้, เสนอผลเพื่ออนุมัติ, สร้างคำสั่งซื้อส่งเคลม, ขอรถรับของคืน, เพิ่มค่าใช้จ่าย, เพิ่มแนวทางป้องกัน, ส่ง (message; 🔒 internal toggle), ยื่นเคลม (carrier).

### Roles implied
Claims officers/investigators (มณี, สมพร, แอน "ผู้ดูแลงานเคลม"), approver หัวหน้า (cannot approve a case they are named in), floor leads owning prevention actions (หัวหน้าหยิบ/หัวหน้าแพ็ค), owner (opens case via portal/OMS, attaches photos, answers, sees owner-friendly status only), carriers (receive claims).

### Business rules visible
- Investigation must conclude within a deadline (case opened 13/10 09:20 → 14/10 09:20, i.e. ~24h [INFERRED]); owner-facing answer window 7 days; case age turns red after 2 days; approver re-reminded.
- Evidence auto-collected (scan history, stock movements, pack video, weight, manifest, carrier data); staff names "used for reference only, not individual fault conclusions".
- **Four-eyes**: person named in case cannot approve own result; approval opens step ④ per verdict.
- Verdict → next step:
  - คลังผิด / ไม่พบหลักฐาน → warehouse resends & recalls, warehouse bears cost.
  - ขนส่งที่จองผ่านบัญชีคลังผิด → warehouse files carrier claim on owner's behalf; resend if owner wants.
  - ขนส่งแพลตฟอร์มผิด / ข้อมูลคำสั่งซื้อผิด → return to owner with evidence pack (video, weight, manifest); owner claims with platform; warehouse done.
  - เจ้าของสินค้ารับผิดชอบเอง → owner creates resend order in OMS (owner-care may help via OMS/portal); **warehouse does not create order from claim**.
  - คลังไม่ผิด → notify owner with evidence, close.
- Resend = claim order `ส่งเคลม` through normal pick/pack/handover; **does not deduct owner stock** when warehouse at fault. If owner chose "ส่งใหม่ทันที" (resend before result), a normal owner order is linked (`ส่งเคลม · รอผล`), stock deducted normally; if verdict = warehouse at fault, it converts to `ส่งเคลม · คลังออก`, shipped units are credited back to a "รอนับตรวจ" bucket and counted same day; variance = per-case cost; pack fee refunded as AJ next bill.
- Owner policy can allow resend before recall (BeautyNara: ส่งใหม่ได้ทันทีไม่ต้องรอของคืน). Resend and recall tracked separately.
- Recall: book truck via transport menu; received in Returns without adding stock; damaged → normal → damaged; not returned → count variance, warehouse bears.
- Count variance from warehouse-fault claims: warehouse bears; **not charged per case**; settled at stock-reconciliation round (see Billing › ชดเชยค่าสินค้า).
- Cost billing: "คิดเจ้าของสินค้า" lines flow to the owner's bill; "ขนส่ง" tracked in carrier claims and credited to owner when paid; warehouse never bills owner for correcting its own mistakes. Costs section hidden from owner (🔒 เจ้าของสินค้าไม่เห็น).
- Carrier claims: only for carriers booked through warehouse account; file within each carrier's deadline (settings); evidence from manifest, weight, pack video, return RP; every status change pushed into owner's case (OMS after-sales or owner portal) with date, carrier ref, payout or rejection reason.
- Business edition: claim acceptance done in after-sales, self-confirmed, no approval; claim order `ส่งเคลม · คลังออก` created from case.

### Devices
Desktop (case workbench; scan/type CL/SO/tracking to open). Relies on pack-station video and scale data.

### Multi-owner / 3PL indicators & judgement
- Explicit `เฉพาะ 3PL` header; claims "จากเจ้าของสินค้า"; liability split warehouse vs owner vs carrier; chargeback/credit to owner; owner-visible vs internal-only fields; Business edition has no claims menu.
- **Judgement: 3PL / Phase-2.** Core WMS only needs the hooks: pack video, weights, scan logs, claim-resend order type, non-stock-increasing recall receipt.

---

## Billing (ค่าบริการ) — 3PL-only (`pg="3pl"`)

### Screens
| File | Purpose |
|---|---|
| billing.html | Billing overview: month-to-date charges by group, items pending review per owner, adjustments awaiting approval, unsent cycles, unpriced items, expiring special rates, disputes; per-owner table |
| billing-summary.html | Per-cycle summary across owners (BC rows) by charge group; status, invoice/receipt refs; bulk "ตรวจและส่ง"; Excel |
| billing-charges.html | Charge-event ledger (EV lines) grouped by source document; review, free lines, unpriced, adjustments, disputes |
| billing-customer-rates.html | Single-owner billing statement for a cycle (BeautyNara BC-2610-001) with tabs/sheets per charge group, free-value summary, issues to fix before sending |
| billing-rates.html | Rate setup: (1) charge catalogue & calculation methods, (2) versioned rate cards SV/PM/SH, (3) per-owner rate assignment |
| billing-compensation.html | Inventory-loss compensation per stock-reconciliation round (CC) |

### Key entities & fields
- **Charge catalogue item (ค่าบริการ)**: name, origin badge (`ระบบ` system-generated from real work vs `เพิ่มเอง` manual), triggering event (เกิดจากงาน), current unit, allowed methods, options, billable on/off (คิดเงิน).
- **Rate card version**: no. (SV/PM/SH-YYYY-NN), name, owners using, effective date, summary, approved by + date, status. Detail lines: price, unit, conditions (free / minimum / tiers).
- **Owner rate assignment**: owner; SV version; PM version; SH version; status (ใช้อยู่ / ใกล้หมดอายุ / รออนุมัติ); RS document + state (รอเจ้าของสินค้าเซ็น / เจ้าของสินค้ายอมรับแล้ว); conditions (ฟรีรับเข้ารอบแรก, ฟรีหยิบ 3 ชิ้นแรก, ค่าจัดเก็บขั้นต่ำ 50 ลบ.ม./เดือน, ฟรีรับเข้า 70,000 ชิ้นแรก); contract no./end date (สัญญาถึง 31/03/2027).
- **Charge event (EV)**: EV no., timestamp, service + short code (PI pick, PA pack, MT material, PR print, IN inbound, VA VAS/barcode, ST storage, CX cancel, RT return, AJ adjust), reference (source doc), qty + unit, rate-card version applied, amount, status. Grouped under source doc (SO / PO+AS / RT / storage day).
- **Billing cycle (BC)**: owner, period (monthly / 1–15 / 16–end / custom), warehouse, totals by group, status, IV no., payment status, RE no.; due date = cycle close + 3 days (configurable).
- **Adjustment (AJ)**: no., references original EV/job, amount, approval.
- **Compensation round (CC)**: stock value, short, over, accuracy %, non-chargeable portion (ส่วนที่ไม่คิด), compensation amount, status.

### Charge groups / charge types
Groups (columns in summary): รับสินค้าเข้า, จัดเก็บ (incl. คุมอุณหภูมิ), จัดคำสั่งซื้อ, รับสินค้าตีกลับ, งานเพิ่มเติม, ขนส่ง, ค่าบริการอื่นๆ, ค่าสินค้า, ชดเชยค่าสินค้า, ส่วนลดและปรับยอด.

System charges (catalogue, trigger → unit options):
- ค่าจัดเก็บ (storage) — end-of-day inventory → ปริมาตรจริงรายวัน ลบ.ม.-วัน (recommended) / locations-pallets used / monthly peak volume / flat area / remaining volume by inbound period. Options: normal vs temperature room, minimum per cycle, intro price first N months, long-storage fee > 90 days, count/exclude return & damaged locations, owner packaging charged/free.
- ค่าตรวจนับตามคำขอ (on-request count) — per location / SKU / man-hour / flat per round; not for warehouse-initiated counts.
- ค่ารับเข้า (inbound) — per piece/box/pallet/m³/receipt; rush price, freebies not charged, free.
- ค่ารับเข้าด่วน (rush inbound) — rush-tagged receipts or supervisor-chosen (unannounced/after hours); minimum per receipt.
- ค่าล่วงเวลา (overtime) — after-hours receiving (supervisor confirms people & hours) or waiting for handover (actual clock-in/out hours); per man-hour or flat; round up every 30 min; handover OT split by owner's parcel count.
- ค่าหยิบ (pick) — บาท/ชิ้น; free first N per order + per extra; per order incl. N pcs + per extra; per line; full-case vs loose split. Brochures/flyers/bags not charged.
- ค่าหยิบบรรจุภัณฑ์ (owner-packaging pick) — per box, single rate or by size S/M/L.
- ค่าแพ็ค (pack) — per box/bag/order; monthly volume tiers (0–5,000 / 5,001–10,000); platform order = 1 box.
- ค่าบรรจุภัณฑ์ / วัสดุ — per PM version; materials per stock unit (m/sheet/pc); owner packaging not charged.
- ค่าจัดคำสั่งซื้อด่วน (rush order) — created after channel cut-off and shipped same day; Express / instant priced separately.
- ค่าจัดการสินค้ามูลค่าสูง (high-value) — either price columns inside pick/pack, or separate fee at box close; choose one, not stacked; only owners with the rule on, only flagged SKUs.
- ค่าจัดการยกเลิก (cancellation) — after pick / after pack; e.g. per order incl. 3 pcs + per extra; before pick not charged.
- ค่ารับพัสดุตีกลับ (return parcel receipt) — per parcel incl. empty parcels; charged on receipt date.
- ค่าตรวจสภาพสินค้าตีกลับ (return inspection) — per piece, free first N per parcel (per-owner), 0 = bundled in receipt fee; charged at first inspection save incl. damaged units.
- งานเพิ่มเติม / เอกสาร (VAS/docs) — per piece/sheet/set; print+label combined or split.
- ค่าเบิกสินค้ากลับคืน (return-to-owner withdrawal) — per order/box/pc/m³/time or pick+pack style; methods incl. "วิธีที่ 5 แยกเต็มลัง / ลังเศษ · เต็มลัง ฿0 · ลังเศษ ฿0.50/ชิ้น"; no stacking.
- ประกอบเซต / แยกเซต (kitting) `เฉพาะ 3PL` — per set; assembly/disassembly fee always; toggles to avoid double charging component pick / set inbound / formula packaging; "Zimple WMS ไม่คิด".
- ค่าขนส่ง (shipping) — per parcel at handover; own fleet per trip by distance.
Manual charges (`เพิ่มเอง`): ติดสติกเกอร์ราคา, ห่อของขวัญ (owner approves before work), ค่าเช่าพื้นที่พิเศษ (monthly/one-off, needs approver), ค่าบริการเหมารายเดือน (auto per cycle). Other seen: ค่าปรินท์เอกสาร, ค่าใส่โบรชัวร์, ค่าปรินท์บาร์โค้ด, ค่าติดบาร์โค้ด, ค่าส่งด่วน, ค่าส่งทันที · แพ็ค 30 นาที, ขั้นต่ำ · ค่าเหมา, ค่าใช้ระบบ Zimple OMS (when warehouse collects via bill), ค่าถุง, ค่าบับเบิ้ล, ชดเชยค่าสินค้าตอนตรวจนับ, ส่วนลด · ฟรี, ปรับยอด.

Shipping rate card (SH): domestic carriers Flash Express (API), Flash Bulky, ไปรษณีย์ไทย, SPX Express (ผ่านแพลตฟอร์ม), Kerry, J&T, DHL eCommerce, BEST Express, Lalamove (Gateway quote + 20/job), partner truck (25/box), own fleet (300 + 15/km; wait > 30 min 150/h); platform logistics = not charged; international FedEx/DHL (zones A–H, import from file, volumetric ÷5,000). Pricing method "ต้นทุน + x%" from Logistics Gateway cost. Weight rounded up per 1 kg vs girth (W+L+H), higher tier wins; 3 zones กทม./ปริมณฑล/ต่างจังหวัด by destination postcode. Surcharges as separate lines: COD % (cost 2.5% min 10 → sell 3% min 10), insurance 0.5% of value (owner selects per order), remote area (by postcode, at cost), oversize/volumetric adjustment (after handover, notify owner w/ evidence), fuel (intl), duties (not included), ค่าคลังนำส่งเอง (3.00/parcel, min 150/trip; not charged if Drop-off booked but carrier picked up).
Own-fleet trip cost allocation: average by boxes / orders / drop points, or per-trip; one method per warehouse, override per owner contract; never shows other owners in the trip.

Example prices (SV-2026-01): storage 18.00/m³-day (min 500/month; temp room 30.00), on-request count 5.00/location, inbound 0.50/pc, rush inbound 0.80 (min 300/receipt), OT 150/man-hour (min 1 h), pick 0.50 (owner packaging 0.50), pack 8.00 → 8.50 in draft SV-2026-02 (≥5,001 boxes/month 7.00), rush order 15.00 (instant 25.00), cancel after pick incl. 3 pcs + 0.50/extra, after pack 10.00 incl. 3 pcs + 1.00/extra, return parcel 3.00, return inspection 1.00/pc. PM materials priced fixed or cost+% (e.g. +30%, +120%, +150%, +200%).

### Workflow states
- Rate card: `ฉบับร่าง · รอส่งอนุมัติ` → (approved) `ใช้อยู่` (+ `ค่าเริ่มต้นเจ้าของสินค้าใหม่`, `ทุกเจ้าของสินค้า`) → `เลิกใช้`; `ยังไม่มีราคา` (row), `ราคาล็อกตามฉบับ`.
- Owner assignment: `ใช้อยู่`, `ใกล้หมดอายุ`, `รออนุมัติ`; RS: รอเจ้าของสินค้าเซ็น / เจ้าของสินค้ายอมรับแล้ว.
- Charge line (EV): `รอตรวจ`, `ตรวจแล้ว`, `ฟรี`, `ไม่มีราคา`, `รออนุมัติ` (adjustment), `โต้แย้ง` (disputed).
- Billing cycle: **เปิดอยู่ → รอตรวจ → พร้อมส่ง → ส่งแล้ว**; seen as `พร้อมส่ง · เลยกำหนด`, `รอตรวจ 3 · ไม่มีราคา 2 ›`, `ส่งแล้ว 17/09`; payment: ชำระแล้ว (RE-) / รอชำระ.
- Compensation (CC): `ส่งให้เจ้าของสินค้า` → `ลงบิลแล้ว`; `โต้แย้ง`.

### User actions
ตรวจและส่ง (review & send to owner + accounting simultaneously), ตรวจและส่งที่เลือก, ตรวจผ่านที่เลือก, ใส่ราคา, สร้างฉบับถัดไป, ตัดสิน (dispute), สรุปแยกบริการ, รายการค่าบริการ, Excel, กางทั้งหมด/ยุบทั้งหมด, เพิ่มค่าบริการ, เพิ่มจากข้อมูลสินค้า, เพิ่มขนส่ง, สร้างฉบับใหม่ / สร้างฉบับใหม่จากฉบับนี้, เทียบกับฉบับอื่น, ดูรายละเอียด, ดูและแก้ฉบับร่าง, ยกเลิกฉบับร่าง, ส่งอนุมัติ, นำเข้าเรทจากไฟล์ / นำเข้าเรท, สูตรและต้นทุน, ดูตารางเต็ม, จับคู่ฉบับ, ดูราคา (creates RS), ดูในใบสรุป, ติดตาม.

### Roles implied
Billing staff / reviewers (ผู้ดูแลค่าบริการ), approvers (มด, โอ๊ต — rate-card approval), accounting (ฝ่ายบัญชี — receives cycle, issues IV with VAT, WHT split), managers. **Prices visible only to users with "ดูค่าบริการ" permission (บัญชี · ผู้จัดการ); floor screens never show prices.** Owner receives statement, signs RS, can dispute lines. Supervisors feed billable facts (OT hours, rush tag).

### Business rules visible
- Two-step pricing: ① master catalogue (what & how, no price) → ② versioned rate cards → ③ assign per owner.
- **3 independent rate-card sections** (SV service, PM packaging, SH shipping), each versioned separately; new version only for changed section; numbering prefix-year-seq, auto, resets yearly. Each owner maps exactly 1 version per section: use latest standard / lock to contract version / owner-specific special price (stores only deltas from standard).
- Effective versions are immutable; edit via a single draft per section; approve with effective date; owners on "use latest" auto-migrate on effective date; locked owners stay. Multiple versions active concurrently. Unused versions → เลิกใช้. Price changes don't alter past cycles; charged lines remain auditable against version.
- Expiring special rates: warning 30 days ahead; if expired with no successor, keep old price and lines after expiry go to `รอตรวจ`.
- Logistics Gateway cost change doesn't change sell price; system alerts billing admin to create new SH version.
- New packaging material in product master without price → row "ยังไม่มีราคา"; usage recorded and surfaces as review item — "ไม่คิดเงินเงียบ ๆ" (never silently unbilled/charged).
- Free conditions per line: free first N, free first time, free up to cumulative qty, monthly minimum. Billing switch off = free; free lines still recorded and optionally shown as "ฟรี" with quantity/value on statement (owner sees value given — e.g. 15,018 บาท).
- Minimum per month (e.g. 30,000 บาท) top-up in ค่าบริการอื่นๆ; flat monthly fee auto per cycle (set system charges to 0 if replaced).
- **Charge lines are generated from real work**, priced by the rate version effective that day; cannot be edited/deleted — use approved AJ. Auto-pass when normal work + priced + qty within threshold; human review for: unpriced, one-off/manual, manual price override, AJ, abnormal qty, post-cancellation lines, first cycle of new rate version. A cycle can be sent only when nothing is pending review.
- Disputes per line by owner: reviewer confirms or reduces (AJ to next cycle); **disputes do not block** sending the cycle or invoice.
- Billing cycles default monthly; half-month or custom per owner; owner wanting per-warehouse separation = 1 cycle per warehouse; secondary/overflow warehouse rolls into main warehouse cycle at main price ("รวมพื้นที่สำรอง"). Due = close + 3 days. Sent cycles are immutable; corrections next cycle.
- Amounts excl. VAT; VAT computed at invoice (IV-); service vs goods (packaging) totals separated for correct documents and withholding tax.
- Storage = end-of-day balance (carried + in − out) × rate per m³-day per room; monthly rates divided by days in month.
- Cancellation billing: after pack → pick + pack + packaging used + cancel fee; before pick → nothing.
- Platform orders count as 1 box; last box used counts if box changed during packing.
- Unknown-order return parcels not billed until owner confirms (then back-dated).
- Return-to-owner withdrawal billed separately, not as pick/pack.
- Claim interplay: warehouse-fault costs never billed; "คิดเจ้าของสินค้า" claim lines flow to bill; carrier payouts credited to owner.
- **Inventory compensation (ชดเชยค่าสินค้า)**: per reconciliation round; overage offsets shortage, no payout for net overage; value = cost sent by OMS, else standard unit value, capped per-unit by contract; non-chargeable tolerance portion; it is a **refund deducted from grand total, not a discount**; posted to cycle by confirmation date (to next cycle if already sent); booked only after owner agrees; carrier-claim credits follow same rule. Method configured in ตั้งค่าคลัง › กฎงานคลัง › ค่าบริการ.
- "Notify owner, not billed" items: stock over system, over-PO receipts, unknown-order returns, owner-branded packaging (228 orders).
- Kitting fees and some lines explicitly "Zimple WMS ไม่คิด" (not charged in Business edition).

### Devices
Desktop only (office/finance). Excel export. File import for carrier rates.

### Multi-owner / 3PL indicators & judgement
- Every screen is per-owner: BC cycle per owner (per warehouse optional), per-owner rate-card mapping, RS signed by owner, contracts (FF-3PL-…), owner disputes, owner-visible free value, compensation to owner, minimum monthly commitment, overflow-warehouse pricing.
- Page flag `pg="3pl"`: absent in Zimple WMS (Business).
- **Judgement: 3PL-only / Phase-2.** Strongest 3PL signal in the whole mockup set. Core WMS dependency: the **event capture** must exist from day one (every pick/pack/receive/storage-snapshot/return/VAS/cancel-stage/OT/handover generates a timestamped, owner-tagged, document-referenced event with qty+unit), otherwise billing cannot be retrofitted. Rating engine, rate-card versioning, cycles, AJ/dispute, compensation and invoicing hand-off can be Phase-2. Note IV/RE (invoice/receipt) appear as references — invoicing itself may live in accounting [INFERRED].

---

## Cross-module observations
- **OMS is the order master**: WMS receives orders from Zimple OMS; edits/cancels happen in OMS/owner portal; claims/refunds originate in OMS after-sales (CS-…); carrier claims status pushed back to OMS.
- **Evidence chain** (pick scans → pack video → weight → manifest/seal → carrier API) is shared by Orders, Returns (inspection video, "ดูวิดีโอแพ็ค") and Claims (auto-evidence). This is a core capability with 3PL payoff.
- **Owner-care acting on behalf** (`ทำแทนเจ้าของสินค้า`) and owner-approval loops recur across Orders, Returns VAS, Claims, Billing — candidate shared "owner delegation/approval" service.
- **Permission-gated price visibility**: order prices (`ดูราคาและส่วนลดคำสั่งซื้อ`) and billing amounts (`ดูค่าบริการ`) are separate permissions.
- Settings referenced: ตั้งค่าคลัง › กฎงานคลัง › ค่าบริการ; ตั้งค่าบริษัท › การแจ้งเตือน; ตั้งค่าขนส่ง; ตั้งค่าคลัง › ขนส่ง › คลังจัดส่ง; carrier claim deadlines per carrier.


---

# E. Owner Portal · Owners · Overview · Reports · Account/Login/PDA

Source: 34 mockups (20 `owner-portal__*`, 4 `owners*`, overview/overview-en, index, reports/reports-all/reports-tv-mode, account-*, login, pda-login-menu). All data is sample data. Branding: product = "Zimple Fulfillment" by **Zimple Solution** (vendor); warehouse tenant shown = **Fullfeel Fulfillment** (3PL operator) with 2 warehouses **คลังบางเขน (BKN, main)** and **คลังสายไหม (SMI)**; sample owner = **BeautyNara (BN)**, sample portal user = มิ้น (min@beautynara.co).

Key cross-cutting fact: the WMS assumes the owner's **OMS** (Zimple OMS, partner OMS e.g. JST/Zort, or owner API) is the system of record for orders/products/ASNs. The Owner Portal ("ระบบสำหรับเจ้าของสินค้า", labelled "Client Portal" on index) only carries work "the OMS cannot do" ("ระบบนี้มีเฉพาะงานที่ OMS ของคุณ ทำไม่ได้").

---

## 1. Owner Portal (client-facing, `owner-portal__*`)

### 1.1 Screens

| File | Purpose |
|---|---|
| owner-portal__login | Owner login with 9 demo states (login, wrong pwd, temp lock, forgot pwd, link sent, OTP/MFA, session timeout, suspended, no permission) |
| owner-portal__account-change-password | Change password (form / wrong current / done) |
| owner-portal__account-help | Manuals per module + support ticket form sent to the warehouse (SUP-…) |
| owner-portal__overview | Today dashboard: KPIs, work-by-stage, "รอตัดสินใจ" decision queue, inbound in transit, low stock/expiry; overdue-suspension banner |
| owner-portal__orders | Order list (from OMS, read-only) with status chips, type/channel/badge filters |
| owner-portal__orders-detail | Order detail: warehouse problem, recipient/shipping, attachments (docs to insert), pack video, timeline |
| owner-portal__products | SKU master view: only portal-specific fields editable (group/tag, special handling, short name, shelf-life check), re-measure request |
| owner-portal__inventory-stock | Stock by SKU (normal/reserved/available/in-transit/returned-damaged/lots) + stock by lot/expiry; withdrawal request |
| owner-portal__inventory-movements | Stock ledger (all movements by document), SKU drill-down, inter-warehouse transfer request |
| owner-portal__inbound | ASN (AS) + PO list with actual receipt result, variances, PO close confirmation; create "สินค้ารอเข้าคลัง" |
| owner-portal__returns | Returned parcels with inspection result (photo + unboxing video), decisions |
| owner-portal__claims | Claims against warehouse (wrong/short/damaged), KPIs incl. warehouse accuracy |
| owner-portal__claims-detail | Claim case: evidence, warehouse investigation, outcome, re-ship, return request, timeline |
| owner-portal__vas | VAS (งานเพิ่มเติม): order from warehouse's service catalogue, approve warehouse-proposed jobs |
| owner-portal__warehouse-requests | "คำขอจากคลัง" — decisions the warehouse needs from the owner |
| owner-portal__billing | Bill list per warehouse, dispute, inventory-accuracy compensation, rate-sheet acceptance |
| owner-portal__billing-detail | Bill BC-2610-014 line breakdown, VAT, compensation, rate sheets |
| owner-portal__settings-connections | "Where is each task done" matrix (OMS vs portal), connected OMS, API keys (sandbox) |
| owner-portal__settings-rules-notifications | Owner rules (pre-answers), documents issued in owner's name, notifications, freebie rules, packaging rules |
| owner-portal__settings-users-permissions | Owner-side users, roles (default + custom), MFA, invitations |

Portal nav (from HTML sidebar): ภาพรวม · คำสั่งซื้อ · สินค้า · **งานคลัง**: คำขอจากคลัง, รับสินค้าเข้า, สินค้าคงคลัง, สินค้าตีกลับ, จัดการเคลม, งานเพิ่มเติม · **บัญชี & ตั้งค่า**: ค่าบริการ, ตั้งค่า.

### 1.2 Key entities, fields & ID formats

- **Order (คำสั่งซื้อ)** `SO-261102-01488` (SO-YYMMDD-NNNNN, internal no. issued by OMS/WMS). Fields: platform order no. (e.g. Shopee `2611025RT8KQ`), ต้นทาง/source no. `OD2611020931`, หมายเลขอ้างอิงภายนอก `PO-BN-7781`, shop (BeautyNara S/T/L = Shopee/TikTok/Lazada), channel, customer + province, items (SKU × qty, set = n pcs), carrier · Pickup/Drop off, tracking no., ส่งภายใน (ship-by deadline), warehouse, label print count, pack video.
  - Order types: คำสั่งซื้อปกติ · เบิกออก (withdrawal; reasons: คืนเจ้าของสินค้า / ครีเอเตอร์ / การตลาด / ใช้ภายใน) · ส่งเคลม (claim re-ship: รอผล / เจ้าของสินค้าออก / คลังออก). Channels: Shopee, TikTok Shop, Lazada, สร้างที่นี่ (created in portal).
  - Attachments: shipping label (from platform), receipt RE- (warehouse issues in owner's name automatically at แพ็คแล้ว), uploaded file (e.g. warranty PDF) with placement "ใส่กล่อง · n ชุด" / "ติดนอกกล่อง · n ชุด".
- **Pack video (วิดีโอแพ็ค)**: 1-min clip (30 s before/after label scan); full video by request (warehouse reviews first). Retention 60 days default (warehouse-set); clips tied to a case kept until case closed. Evidence bundle download + 7-day external share link.
- **SKU / product** `BN-SERUM-30`; รหัสรูปแบบ (variant/style code) `BN-SERUM`; barcode EAN-13 `8859001234501`; unit (ชิ้น/เซต/ลัง/ใบ), case pack (ลังละ 48), dims/weight (warehouse-measured, "คลังวัด"), group, tags (ขายดี, ระวังแตก, โปร 11.11), special handling (มูลค่าสูง, ขายเป็นลัง, ล็อต · วันหมดอายุ), SKU status, short name for pick list/PDA label, min shelf-life days. Types: สินค้า · สินค้าเซต (ประกอบล่วงหน้า = pre-assembled kit) · ของแถมและสื่อการตลาด · บรรจุภัณฑ์ (owner-branded boxes, e.g. BN-BOX-LOGO-S, "เตือนใกล้หมดที่ 200").
- **Lot** `L2604` (+ expiry date); 1 row = SKU × lot × warehouse; ล็อตระงับ (held lot).
- **Stock buckets**: สินค้าปกติ, จองแล้ว, พร้อมขาย, ระหว่างโอน (TF-), รอเข้าคลัง (AS-), คืน, ชำรุด; days of cover ("พอขาย 24 วัน").
- **ASN** `AS-261102-004` + owner **PO** `PO-BN-5530`; fields: lines, notified qty vs received, variance (ขาด/เกิน/ชำรุด), appointment (นัด), pallets received (3/5), truck rounds, lot + expiry inputs, delivery-note/invoice attachment.
- Stock ledger docs: `TM-` (receipt, TM-261102-007), `TF-` (transfer), `CV-` (conversion/kitting), `PK-` (box closing batch, PK-261102-0031), `CC-` (cycle count), `VA-` (VAS), `SO-`.
- **Return** `RT-261102-011`; platform return request no. (`5781RR2209`); problem report `RP-261030-001`.
- **Warehouse request** `RQ-261102-018`; manifest `MF-261103-007`.
- **Claim** `CL-261102-004`.
- **VAS job** `VA-261101-007`; service codes GW-01 ห่อของขวัญ+การ์ด ฿15/ชิ้น, ST-02 สติกเกอร์แคมเปญ ฿2/ชิ้น, KT-01 จัดเซต ฿8/เซต, LB-03 ฉลากไทย/บาร์โค้ด ฿1.50/ชิ้น, PH-01 ถ่ายรูปก่อนแพ็ค ฿5/คำสั่งซื้อ.
- **Billing**: bill `BC-2610-014` (BC-YYMM-NNN, one per warehouse per month); invoice `IV-261102-0003`; receipt `RE-`; adjustment `AJ`; rate sheet `RS-261020-0003`; price versions `SV-2026-07` (service) · `PM-2026-02` (packaging) · `SH-2026-01` (shipping); contract `FF-3PL-2026-003`.
- **Owner-issued documents** (warehouse prints in owner's name, own number series per owner): ใบรายการสินค้า (no number), ใบส่งสินค้า `DO-YYMMDD-NNNN`, ใบเสร็จ `RE-…`, ใบกำกับภาษีอย่างย่อ `ABB-…`, ใบกำกับภาษีเต็มรูป `IV-{ปีเดือนวัน}-{ลำดับ 4 หลัก}` (editable pattern; must not clash with other doc types).
- Support ticket `SUP-…`. API key `beautynara_test` (Sandbox).

### 1.3 Status values (exact badges)

- **Orders** (chips/pills): รอข้อมูลขนส่ง (awaiting carrier data/tracking) · รอแพ็ค (to pack) · แพ็คแล้วรอส่งมอบ (packed, awaiting handover) · คลังกำลังนำส่งศูนย์ (warehouse dropping at hub) · อยู่ระหว่างนำส่ง (in transit) · จัดส่งสำเร็จ (delivered) · ผิดปกติ (exception) with sub-states: คลังแจ้งแก้ไข รอคุณแก้ (warehouse flagged, owner to fix in OMS) / ขอแก้ไข รอคลังส่งกลับ (owner asked to edit, waiting for warehouse to release) / พักไว้ รอคลัง (on hold by warehouse) · ยกเลิก (cancelled: ก่อนส่งมอบ / หลังส่งมอบ · รอตีกลับ) · กำลังตีกลับ (returning) · ตีกลับสำเร็จ (return completed) · เบิกออก (withdrawal type) · เสี่ยงเกินกำหนด (SLA-risk tag). Line pill: จองแล้ว (reserved). Label: ยังไม่พิมพ์. Full-video request: รอคลังตรวจ → ส่งแล้ว (link 30 days) / คลังไม่ส่ง + เหตุผล.
- **Inbound (ASN)**: กำลังมา (incoming) · กำลังรับ (receiving; "ขายได้แล้ว 240" = sellable per pallet) · รอยืนยันปิด (awaiting owner close confirm; auto-close date) · ปิดแล้ว (closed) · รับครบ (fully received) · พื้นที่สำรอง (overflow/secondary storage site).
- **Stock**: ล็อตใกล้หมดอายุ · ใกล้หมด (low cover). Lot: "ระงับ 20 · รอเจ้าของตัดสิน".
- **Movement types** (pills): รับเข้า · จ่ายออก · ใช้ไป · ปรับยอด · เปลี่ยนรหัสสินค้า · โอนย้ายคลัง (5+1 groups). Sub-types (filter): รับเข้าตามใบแจ้งเข้า, รับคืน, ส่งมอบ, เบิกออก, ส่งคืนเจ้าของสินค้า, ทิ้ง/ทำลาย, บรรจุภัณฑ์ตอนปิดกล่อง, งานเพิ่มเติม, จัดเซต, ตรวจนับ, สูญหาย, โอนออก/โอนเข้า.
- **Returns**: ตีกลับ (type pill) · รอรับคืน (awaiting arrival) · รอตรวจสอบ (received, not inspected) · รอดำเนินการ (pending decision) · ปิดแล้ว. Reasons: ส่งไม่สำเร็จ, ลูกค้าคืน, ยกเลิกหลังส่งมอบ. Inspection tags: สภาพดี, ชำรุด, เซตไม่ครบ, ไม่ตรงกับที่ส่ง.
- **Claims**: เคลมคลัง (type) · รอคลังตอบ · เหลือ N วัน (awaiting warehouse, countdown) · เกินเวลา · รอคลังยืนยัน (overdue — no auto-accept) · ส่งใหม่ (re-shipped) · ปิดแล้ว. Outcomes: ยอมรับผิด (warehouse accepts fault) / ปฏิเสธ (rejects — needs reason + pack-video clip). Claim types: ส่งขาด, ส่งผิดสินค้า, สินค้าเสียหาย.
- **VAS**: รออนุมัติ (warehouse-proposed, owner approval) · รอคลังรับงาน · กำลังทำ (n/total) · เสร็จ · ยกเลิก (only before warehouse accepts).
- **Warehouse requests**: รอตอบ · เร่งด่วน · ตอบแล้ว รอคลังทำ · เสร็จ; also "ตอบอัตโนมัติ" (auto-answered by pre-answer rule).
- **Billing**: รอคลังส่งบิล (period open) · รอชำระ (awaiting payment; disputable window) · ชำระแล้ว. Compensation: รอคุณตอบ · ลงบิลแล้ว. Rate sheet: รอคุณยอมรับ · เซ็นแล้ว.
- **Settings/users**: เชื่อมแล้ว (OMS connected) · ทดสอบ (API key) · รอตอบรับคำเชิญ (invite pending, with expiry) · ตั้งต้น (default role) · ครบทุกสิทธิ์ · ล็อก · ตั้งเอง / ใช้ค่าคลัง (rule source) · ใช้อยู่ / ไม่ใช้ (document) · ร่าง (draft packaging rule) · ที่นี่ (task done in portal).
- **Login**: see §5.

### 1.4 User actions (buttons)

ขอแก้คำสั่งซื้อ · แนบไฟล์ · ประวัติการพิมพ์ · ดูวิดีโอแพ็ค · ขอวิดีโอเต็ม · ดาวน์โหลดชุดหลักฐาน · คัดลอกลิงก์ (7 วัน) · ⋯ ยกเลิก (before pick) · ขอเบิกสินค้า / ขอเบิก · โอนย้ายคลัง · Excel · สินค้ารอเข้าคลัง (create ASN) · ยืนยันปิด · ตอบคำขอ · อนุมัติ · เรียกแล้ว (rider re-booked at Seller Center) · แจ้งเคลม · เพิ่มหลักฐาน · ขอรับของคืน · ส่งใหม่ทันที · สั่งงานเพิ่มเติม · โต้แย้ง / โต้แย้งรายการ · ดาวน์โหลด PDF ที่เลือก · ใบแจ้งหนี้ (PDF) · ดาวน์โหลดบิล PDF · ตอบ (compensation) · ยอมรับ (rate sheet) · ตั้งค่าเพิ่ม · ขอวัดใหม่ · inline edit group/tag (Enter/Esc/Tab) · สร้างกุญแจทดสอบ · เพิ่มผู้ใช้ · ส่งคำเชิญอีกครั้ง · เพิ่มบทบาท · แก้ไขสิทธิ์ · เพิ่มกฎ · ข้อมูลผู้ขาย · ตั้งค่า (document) · เปิดคู่มือ · ส่งเรื่อง · แนบรูปหรือไฟล์ · บันทึกรหัสผ่านใหม่.

### 1.5 Roles & what the client can do vs must request

Owner-side roles (settings-users-permissions): **ผู้ดูแลระบบ** (all rights incl. users/permissions, locked, ≥1 required, cannot be disabled/removed if last), default **ตอบคำขอจากคลัง** (คำขอจากคลัง · รับสินค้าเข้า · ตีกลับและเคลม · อนุมัติงานเพิ่มเติม), default **บัญชี · ดูบิล** (ค่าบริการ · โต้แย้งบิล · ดาวน์โหลด); custom roles allowed (copy/rename/delete), a user can hold multiple roles (union), dependent permissions auto-ticked, segregation-of-duty warning, warning if saving leaves a task with nobody. Warehouse staff can "view as owner" (เข้าดูในนามเจ้าของสินค้า) — logged. Audit history retained per warehouse's package.

"Where each task is done" matrix (settings-connections, maintained by Zimple per OMS connector capability; warehouse can adjust per owner):

| Task | OMS | Portal |
|---|---|---|
| Send/cancel/edit orders | ✓ | view only |
| Edit address flagged by warehouse (non-platform orders, before รอข้อมูลขนส่ง) | — connector unsupported | ที่นี่ |
| In-box attachments (full tax invoice, warranty, external docs) | | ที่นี่ (placement + copies) |
| ASN/PO (AS · PO) | | ที่นี่ (create, results, confirm close) |
| SKUs & sets | (OMS) | |
| Status · tracking · stock | ✓ pushed back immediately | always viewable |
| Answer warehouse requests · approve VAS | | ที่นี่ |
| Order VAS | | ที่นี่ when warehouse enables service |
| Returns · claims; withdrawal (as SO); billing & disputes; own rules & notifications | | ที่นี่ |

If a connector gains a capability, the corresponding portal button is hidden to prevent double entry.

Client **can self-serve**: view orders/stock/ledger/inbound/returns; create ASN; confirm PO close; request withdrawal (creates SO type เบิกออก, ฿0, no tax invoice); request inter-warehouse transfer (charged); attach docs; request edit/hold [order "ขอแก้ไข"]; file claims, add evidence, instant re-ship; order VAS from catalogue; approve warehouse VAS proposals; answer warehouse requests or set pre-answers; dispute bill lines; accept rate sheets; edit group/tags/short name/special handling (special handling via confirm dialog); request re-measure; manage users/roles/notifications; create sandbox API keys; set freebie & packaging rules (own packaging only); set document names/number patterns.

Client **cannot / must go through warehouse**: create/edit/cancel orders (OMS only; cancel via ⋯ only before pick); edit SKU master/stock/lot/cost/SKU code; dims (warehouse measures; request re-measure); new packaging SKU waits "รอคลังตั้งค่า" (paired material, storage size); full pack video (warehouse reviews); VAS catalogue and rates set by warehouse; problem names in requests set by warehouse ("เลือกได้เฉพาะคำตอบ"); which rules are owner-settable is opened by warehouse; cycle count/location moves are warehouse work.

**Warehouse→owner request types** ("คำขอจากคลัง", filter "ที่มา"): สินค้าตีกลับ · รับเข้า (damaged at receipt) · ตรวจนับ · เซตไม่ครบ · ยืนยันปิด PO · งานเพิ่มเติม (warehouse-proposed) · ค่าคลังนำส่งเอง (warehouse self-drop fee when carrier missed pickup) · ค่าล่วงเวลา (overtime) · เปิดลัง (break case for case-only SKU). Answers: ทำลาย · ส่งคืน · ใช้ต่อ · แยกเซต · นำส่งเอง · ทำล่วงเวลา. States: รอตอบ → (เร่งด่วน) → ตอบแล้ว รอคลังทำ → เสร็จ; or ตอบอัตโนมัติ. Overview decision queue pill types: สินค้าชำรุด, ยืนยันปิด PO, สินค้าตีกลับรอตัดสิน, งานเพิ่มเติมรออนุมัติ, เรียกรถใหม่ที่ Seller Center.

### 1.6 Business rules visible

- Available = normal − reserved (excl. held lots / below shelf-life threshold); on-hand = normal + returned + damaged; in-transit (TF) & ASN-pending (AS) excluded from on-hand; returned/damaged not sellable. Available pushed to OMS immediately on change.
- Transfers: source − on send, destination + on receipt; in-transit not counted. Location moves not shown to owner. Adjustments only from approved cycle counts. Ledger lines only from documents the warehouse has closed.
- FEFO: "คลังหยิบล็อตที่หมดอายุก่อน"; held lot not sellable. Overflow storage (พื้นที่สำรอง) counted in that warehouse's stock; secondary site name hidden.
- Receiving: sellable per pallet as received; receiving fee per truck round; damaged at receipt → warehouse request; overage → quarantine (จุดกักกัน) until decision; PO auto-closes (3 days per rule; "ปิดเอง 05/11") → closes at actual received.
- Order cancel: before pick = free; after pack = fee (฿12.50 sample); before handover = stock released; after handover = waits for return. Order exceptions: platform address must be fixed by buyer on platform; owner address-edit only for non-platform orders whose connector can't edit, before รอข้อมูลขนส่ง. Order intake polled every 5 min; exceptions excluded from "sent to warehouse" count. Full tax invoice issued only if OMS sends tax-invoice data (not from recipient name/address).
- Claims: warehouse must respond within 7 days; overdue never auto-accepts, system re-reminds warehouse; rejection requires reason + pack-video clip; accepted = warehouse creates claim re-ship order free (not in order list); owner can re-ship immediately (order type ส่งเคลม · รอผล, type switches by result: warehouse fault → warehouse pays, pack fee refunded as AJ next bill); compensation at cost/unit from OMS, deducted on bill. Carrier-damage claims handled in OMS/platform. KPI: warehouse accuracy = orders without warehouse-fault claims (99.94%, 16/26,480).
- Returns: every parcel opened on video; good → sellable immediately; damaged → warehouse request; mismatch → problem report (RP) as platform evidence. Return rules: good = sellable, damaged = ask first; incomplete set → ask, 1 set kept pending (not counted as damaged).
- Pre-answers (owner rules): damaged with cost < ฿200 = destroy with photo; outer box dented = use; < 6 months to expiry = return to owner (uses warehouse default); no reply within 48 h = follow pre-answer, else warehouse keeps item and charges storage. Self-drop fee must be answered before truck leaves (else next carrier round). Overage on ASN = add to stock without asking.
- VAS: order-attached jobs done at pack; ASN-attached done before sellable; cancel only before warehouse accepts; billed in month performed; menu shown only if warehouse enables VAS; not approving a warehouse-proposed job = not done.
- Billing: one bill per warehouse (owner opted to split warehouses by shop) with each warehouse's prices + transfer fee; invoice issued with bill (no confirm step); dispute window 7 days after warehouse sends (warehouse-set); dispute doesn't stop invoice; accepted disputes → AJ lines next cycle; receipt RE- when paid. Bill lines: storage (pallet-days), inbound (per truck round), pick, pack, packaging (owner-branded box: no packaging fee), VAS, inter-warehouse transfer, claim compensation (−), inventory-accuracy compensation (−), VAT 7%.
- Inventory-accuracy compensation: if count accuracy < contract target (99.5%), net (shortage − overage), valued at OMS unit cost capped per unit, minus non-chargeable portion; owner accepts → credit next bill.
- Rate sheet change: warehouse sends via system + email; owner accepts in system (name + time logged) or signs and uploads.
- Overdue: service suspended banner on every page, warehouse stops accepting new orders until paid.
- Freebie rule precedence: SKU → rule (lowest order first) → all owner work → warehouse global rule. Packaging rules optional (system picks by size); targets set/promotion/group; owner packaging only.
- Users: ≥1 admin; disabling a user who leaves tasks orphaned → warning; critical notifications (reply deadline, billing) cannot be turned off — only recipients/channels (Email, LINE). API key shown once; warehouse sees masked and can suspend. OMS re-auth via authorization link (warehouse never knows password).

### 1.7 Devices
Desktop web (tables, inline edit, Excel/PDF download). Scan input in ledger search ("ค้นหาหรือสแกน") [INFERRED: USB scanner/web]. Notifications via Email + LINE.

### 1.8 3PL / multi-owner judgement
Entire Owner Portal is **Phase-2 (multi-owner/3PL)**: it exists only because goods belong to external clients (per-owner billing, disputes, rate sheets, pre-answers, owner-issued documents, owner users/roles, claims against warehouse). Some *underlying* capabilities are core WMS reused by the portal: stock buckets/ledger, lots/FEFO, ASN receiving, returns inspection, pack video, VAS execution, order exception handling. A single-owner WMS would need at most a read-only stock/order view; the decision-request workflow (คำขอจากคลัง) could map to internal approvals in core.

---

## 2. Owners — warehouse side (`owners*.html`)

### 2.1 Screens

| File | Purpose |
|---|---|
| owners.html | Owner overview dashboard: active owners (orders today), onboarding, connection errors, pending requests, expiring contracts; intake channels; intake history; delegated permissions; per-owner deviations; owners today table |
| owners-list.html | Owner list with filters (connection method/status, account manager), add owner |
| owners-detail.html | Owner 360 (BeautyNara) tabs: ข้อมูลเจ้าของสินค้า · ร้านค้าและช่องทาง · คลังที่ใช้ · การเชื่อมต่อ · ขนส่ง · กฎการทำงาน · ค่าบริการ · ผู้ใช้งานระบบสำหรับเจ้าของสินค้า · สิทธิ์ที่ให้คลัง; plus วัสดุแพ็คของเจ้าของสินค้า; "view as owner" + delegated-act session |
| owners-requests.html | Requests from owners (auto-validated): shop activation, set SKU, count request, handle pending-decision goods |

Warehouse nav (overview sidebar): ภาพรวมคลัง · คำสั่งซื้อ · สินค้า · จัดซื้อ · เจ้าของสินค้า · **งานคลัง**: วางแผนงาน (เสริม), รับสินค้าเข้า, สินค้าคงคลัง, หยิบสินค้า, แพ็คสินค้า, ส่งมอบขนส่ง, สินค้าตีกลับ, จัดการรถขนส่ง (เสริม), จัดการเคลม · **บัญชี & รายงาน**: ค่าบริการ, รายงาน · ตั้งค่า & ข้อมูลหลัก.

### 2.2 Entities & fields
- **Owner (เจ้าของสินค้า)**: รหัสย่อ (2–4 letters, e.g. BN, HM, MC, SH, PL, NB, GL, OT), ชื่อเรียก, ชื่อบริษัท, เลขผู้เสียภาษี 13 หลัก, branch (สำนักงานใหญ่), VAT registered, registered address, status (ใช้งาน since date), warehouse-side account manager (ผู้ดูแล: ฝน/มด/โอ๊ต), Zimple OMS org code (`ORG-7F3K21`, `ZO-20417`), #shops, #warehouses, orders 30 days, current price version.
- **Brand** (multiple per owner, same legal entity/tax data; optional): shops sold, brand box & freebies (e.g. Glow by BN → pink box, Glow sticker); "เริ่มขาย 01/11". Unbranded SKUs use owner rules; reports show "ไม่ระบุแบรนด์".
- **Contacts**: name, role (เจ้าของ/บัญชี/ปฏิบัติการ), phone, email, notification topics.
- **Warehouses used**: active, main, "count available for platform", OMS-side warehouse code (BKN-01, SMI-02); available pushed combined or per warehouse.
- **Connection**: method Zimple OMS / OMS พันธมิตร (JST, Zort) / API / ระบบสำหรับเจ้าของสินค้า; contract (annual, BN-2026, to 31/12/2026); accepted invite date; last sync; last error; system fee per warehouse settings; post-contract 30-day read access.
- **Shop**: shop, channel (Shopee/Lazada/TikTok Shop/LINE), shop ID, online order number source (from platform / system-run `LN-ลำดับ`), SLA start (payment time / time entering warehouse), cut-off (14:30…), ship within (1–2 working days; กฎระบบ vs ตามข้อตกลง), SKUs listed, shop connection health (ช้า · 12 นาที), min remaining shelf life (60/90 days).
- **Carriers offered**: Flash/Kerry/J&T — always warehouse API accounts (`FF-FLASH-0001`, `FF-KERRY-0102`, `FF-JT-7781`) and warehouse rates (SH-2026-01); คลังจัดส่ง (own truck, 300 + 15/km, non-platform/B2B, scheduled); ลูกค้าเข้ารับเอง (free; appointment, vehicle type, plate). Own-fleet uses SO + box no. as tracking.
- **Pricing**: sections 1 ค่าบริการ (SV), 2 ค่าบรรจุภัณฑ์ (PM), 3 ค่าขนส่ง (SH); version, effective date, approved by + date; states ใช้อยู่ / ฉบับถัดไป; list labels "ราคาเฉพาะ / มาตรฐาน / ล็อกตามสัญญา · ถึง… / หมดอายุ / รออนุมัติ / ใช้ฉบับล่าสุด".
- **Owner packaging**: box SKU, size, remaining, box pick fee (flat), paired material (bubble sheet/roll), bubble fee; toggle "ใช้บรรจุภัณฑ์ของเจ้าของสินค้า · เปิด"; box priority (own first / warehouse); multi-brand order box policy (①unbranded owner box→warehouse box [default], ②always warehouse, ③selected brand box).
- **Portal users**: name/email, role (ผู้ดูแลฝั่งเจ้าของสินค้า / ผู้ใช้งานฝั่งเจ้าของสินค้า), shop scope, MFA, last used, invite pending.
- **Owner requests** `RQ-261014-025` type, details, submitted at/by, system check (ผ่าน n/n), state.
- **Intake history** row = one uploaded sheet or API batch: time, channel, batch (file name e.g. `orders_1510_a.xlsx`, `asn_po_5530.xlsx`), accepted, rejected, duplicates blocked.

### 2.3 Statuses (exact)
- Owner: ใช้งาน · กำลังเปิดใช้ n/10 · เลิกใช้ dd/mm.
- Connection: ปกติ · ช้า (1/3) · ผิดพลาด (1/3) · ยังไม่เชื่อม · ทดสอบผ่าน 2/2 · ปิดแล้ว · เชิญแล้ว รอตั้งรหัสผ่าน · มีปัญหา (filter). Intake batch: มีแถวผิด · ปฏิเสธทั้งไฟล์ · ตารางล่าสุดมีแถวผิด 3.
- Owner requests: ผ่าน n/n · ไม่ผ่าน 4/5 · รอคลังรับ · รอคลังทำ · รอเจ้าของสินค้าเลือก · ค้างนาน 42 วัน · รอคลังตั้งวิธีแพ็ค · โมดูลเสริม · งานเพิ่มเติม · เปิดใช้แล้ว hh:mm · ใช้ได้แล้ว hh:mm · ส่งกลับเจ้าของสินค้า. Source tags: ชำรุด · เกินใบรายการ · ตีกลับ · เซตไม่ครบ.
- Delegated permission: เปิด · ปิด · เปิด · ต้องให้เจ้าของสินค้ายืนยัน · ต้องให้เจ้าของสินค้ายืนยันเสมอ · กติกาของระบบ.
- Packaging: รอคลังตั้งค่า; "ใกล้หมด".
- Rules tab counters: ตั้งเอง 0 · เจ้าของสินค้าตั้ง 7.
- Session pill: "Zimple OMS · ทำแทน หมดสิทธิ์ 17:00".

### 2.4 Actions
เพิ่มเจ้าของสินค้า (fields: org code or tax-ID lookup, short code, name, company, tax ID, admin name/email for invitation, date) · เข้าดูในนามเจ้าของสินค้า · ขอสิทธิ์ทำแทน (with reason, expiry time) · ทดสอบการเชื่อมต่อ · จัดการ (change account manager/status) · แก้ที่ ตั้งค่าเจ้าของสินค้า · แก้ที่ ค่าบริการ › ราคาค่าบริการ · ส่งคำเชิญซ้ำ · ดูการเชื่อมต่อ · ตรวจคำขอ · ดูค่าบริการ · ตั้งค่า (intake channel) · ดูชุด (batch) · ดูที่เจ้าของสินค้า · รับคำขอ · สร้างรอบ (count) · ตั้งงานประกอบ (kit assembly) · รายชื่อเจ้าของสินค้าทั้งหมด.

### 2.5 Roles implied
Warehouse account manager (ฝ่ายดูแลเจ้าของสินค้า: ฝน, มด, โอ๊ต); pricing approver (มด approves SV/PM/SH); หัวหน้าคลัง (notified on shop activation); "ผู้มีสิทธิ์ดูค่าบริการ" (prices hidden otherwise; operational screens never show prices); owner-side admin (ผู้ดูแลฝั่งเจ้าของสินค้า) controls delegated permissions.

### 2.6 Business rules
- Owner data (company, brands, contacts, shops, shop connections, SKU mapping) is owned/edited by the owner in portal/OMS; warehouse view-only except account manager & status. "คลังไม่แก้คำสั่งซื้อหรือใบสั่งซื้อของเจ้าของสินค้าใน WMS".
- **Onboarding checklist (10)**: 1 company info (warehouse) · 2 warehouses (warehouse) · 3 pricing (warehouse) · 4 connection — OMS invite / partner OMS / portal invite / API key (warehouse sends, owner confirms) · 5 shops (owner · system-checked) · 6 SKUs & sets (owner · system-checked) · 7 carrier accounts · 8 warehouse rules (warehouse) · 9 first inbound (owner sends AS · warehouse receives & measures) · 10 live test order (both) → status becomes "ใช้งาน".
- Intake: all channels become the same warehouse work order; applies to orders, ASNs, withdrawals, new SKUs; de-dup by source reference; failures returned to the originating channel; status push: OMS immediate, API via webhook or pull, portal in-app; portal "งานที่เหลือ" = what the owner's channel can't do; **no files by email**; whole batch can be held.
- Shop activation request auto-checked (API connected · SKU mapping · shop ↔ warehouse · channel carrier has pickup at warehouse · cut-off rule) → activates immediately without approval and notifies; fail → returned to owner with reason (e.g. "Lazada ยังไม่มีรอบรับที่คลังบางเขน").
- Set SKU request auto-checked (components exist & belong to this owner · qty > 0 · unique barcode · nesting limit): "แพ็ครวมตอนส่ง" usable immediately; "ต้องประกอบล่วงหน้า / บรรจุภัณฑ์พิเศษ" needs warehouse to set kit job (VAS add-on module); without module owner may only choose pack-together.
- Warehouse acts only on pre-assembled sets (VAS module); count request → warehouse creates count round.
- Delegated permissions (owner toggles; warehouse view-only): cancel order, edit address, edit item/qty/lot (ปิด), create/import orders (on, needs owner confirmation), withdraw/move out (always needs owner confirmation — system rule), hold order on owner's request. Each act logs actor, reason, notifies owner. Zimple OMS/portal orders edited via OMS as if owner; partner OMS/API → request sent to source, source decides; marketplace → cancel only on platform.
- Shop min shelf-life set by owner in OMS (blank = other level). Platform orders use system SLA rules; non-platform use per-owner agreement. Shop connection slow/down → notify owner and account manager.
- Owner packaging: one scan deducts owner box + paired material and auto-creates box-pick fee and bubble fee, no packaging charge; when owner boxes run out use warehouse box charged at owner price and notify; new box shows รอคลังตั้งค่า until configured. Box selection: system computes smallest fitting box by usable size & weight; packer can override; no fixed SKU-box binding.
- Per-owner deviations (owners.html): monthly count cycle, min shelf life 90 days, scan extra inserts, receive over 2%, LINE cut-off 17:00, keep video 180 days, ship before receiving return, owner decides within 3 days. All rule changes have effective date + history.
- Urgent definition on owner dashboard: connection stopping orders · requests owners are waiting on · contracts/prices expiring (e.g. "หลัง 31/10 คิดค่าบริการไม่ได้", API key 1-year expiry).

### 2.7 Devices
Desktop web.

### 2.8 3PL judgement
**Phase-2 entirely** (owner lifecycle, onboarding, per-owner pricing/contracts, intake channels per owner, delegated permissions, view-as-owner). Core WMS would still need a minimal "owner/company" master [INFERRED] if any SKU/stock is owner-scoped; carrier accounts, SLA/cut-off per shop, box-selection algorithm, kit/set definition are core concepts that here happen to be configured per owner.

---

## 3. Overview / Dashboard + index

### 3.1 Screens

| File | Purpose |
|---|---|
| overview.html | Warehouse manager "ภาพรวมคลัง" today (Thai), real-time, refresh 1 min |
| overview-en.html | English version with date-range presets (Today/Yesterday/7 days/30 days/This month/From–To), customer filter ("All customers"), Approvals 3 / Notifications 3 badges, extra KPI "Avg. order cycle time 5.8 hrs (Paid → handed to carrier)" |
| index.html | **Design sitemap/launcher**, not an app screen: "หน้าจอออกแบบ Zimple Fulfillment · ทุกหน้าเป็นข้อมูลตัวอย่าง", two cards |

**index.html structure:**
- *Zimple Fulfillment · ฝั่งคลัง* ("หน้าจอของพนักงานคลัง 3PL ตั้งแต่รับเข้า หยิบ แพ็ค ส่งมอบ จนถึงค่าบริการ") → overview.html; links: รับสินค้าเข้า (inbound), คำสั่งซื้อ (orders), หยิบสินค้า (picking), แพ็คสินค้า (packing), ส่งมอบขนส่ง (handover), สินค้าตีกลับ (returns), สินค้าคงคลัง (inventory), จัดการเคลม (claims), จัดการรถขนส่ง (transport), เจ้าของสินค้า (owners), ค่าบริการ (billing), รายงาน (reports), ตั้งค่า (settings), PDA (pda-login-menu).
- *Client Portal · ฝั่งเจ้าของสินค้า* → owner-portal/overview.html; links: เข้าสู่ระบบ, สินค้า, ยอดคงคลัง, รับสินค้าเข้า, คำสั่งซื้อ, สินค้าตีกลับ, จัดการเคลม, งานเพิ่มเติม, คำขอจากคลัง, ค่าบริการ, ตั้งค่า.

### 3.2 Content / KPIs (overview)
- ส่งมอบวันนี้ 3,576 of 4,812 orders; รอส่งมอบ 1,236 (ใกล้ตัดรอบ 58); ความแม่นยำการแพ็ค 99.6% (เคลมคลังผิด 4 เคส/7 วัน); ส่งตรงเวลา 97.6% (target 95%, late 9; sidebar note "ไม่นับเวลาที่รอเจ้าของสินค้า (ขอแก้ไข)"); ความแม่นยำสินค้าคงคลัง 99.4% (latest cycle count).
- Order pipeline (clickable segments → list): **รอสร้างใบหยิบ 244 · รอหยิบ 205 · กำลังหยิบ 97 · รอแพ็ค 72 · แพ็คแล้วรอส่งมอบ 618** (EN: Pick List Pending / To Pick / Picking / To Pack / Packed).
- Hourly handover chart; พื้นที่คลัง 72% (1,728/2,400 locations); productivity vs today's target: รับสินค้าเข้า 92%, หยิบ 89%, แพ็ค 96%, ส่งมอบ 78%, รับตีกลับ 94%; hourly quality trend (pack accuracy, pick accuracy, on-time).
- Sidebar badges: คำสั่งซื้อ 12, จัดการเคลม 6.

### 3.3 Rules / roles / devices
Real-time refresh every minute; drill-through from segments. Role: warehouse manager/supervisor [INFERRED]. Desktop. Owner filter ("All customers") appears in EN version.

### 3.4 3PL judgement
**Core WMS** (pipeline, capacity, productivity, accuracy). Only the customer filter and "exclude time waiting for owner" SLA nuance are multi-owner flavoured (Phase-2 hook).

---

## 4. Reports (`reports`, `reports-all`, `reports-tv-mode`)

### 4.1 Screens

| File | Purpose |
|---|---|
| reports.html | "วิเคราะห์ข้อมูล" analytic workspace with tabs: รับเข้า · สินค้าคงคลัง · ส่งออก · ตีกลับและเคลม · จัดซื้อ · พนักงาน · รถขนส่ง (เสริม) · กำลังคน (เสริม) · งานเพิ่มเติม (เสริม) |
| reports-all.html | Catalogue "รายงานทั้งหมด · 13": data-as-of time, auto-send schedule (time, recipients, Email/LINE), owner visibility flag |
| reports-tv-mode.html | Wall-TV live floor dashboard per warehouse (TV-02 · ท่าโหลด), auto-refresh 1 min |

### 4.2 Report catalogue (13, reports-all)
Grouped: **รับเข้า** – วิเคราะห์การรับเข้า [เจ้าของสินค้าเห็น] (short/over vs PO, rounds per PO, receive→sellable time, per owner & supplier; daily 18:00 email). **สินค้าคงคลัง** – สรุปความเคลื่อนไหวตามกลุ่ม (opening → in/out/consumed/adjusted/SKU-change → closing, per SKU & owner, itemised with SL no.; month-end) · ความแม่นยำสินค้าคงคลัง (count variance by period/zone/counter vs target) · พื้นที่คลังตามเจ้าของ (daily m³/pallets per owner & zone; storage-billing basis). **ส่งออก** – ส่งออกรายวันและส่วนต่าง (packed · carried in/out · cancelled · awaiting restock · parcel not found; daily 21:00 LINE) · การแพ็ค บรรจุภัณฑ์ และของแถม (materials used warehouse/owner, freebies issued at handover, box ≠ recommendation) · ส่งมอบและส่งตรงเวลา [เจ้าของสินค้าเห็น] (excl. owner-wait time; per owner & carrier; late/no-show trucks; self-drop reason & payer; 1st of month email). **ตีกลับและเคลม** – วิเคราะห์ตีกลับ · เคลมตามต้นเหตุ (warehouse-fault rate, case type, origin dept / dept that should have caught, cost). **จัดซื้อ** – ผลงานผู้จำหน่าย (PO qty/value, on-time vs set lead time, fill rate; used to tune reorder point). **รถขนส่ง [เสริม]** – ต้นทุน ราคาขาย กำไรรถขนส่ง (per trip/owner, own vs partner trucks). **กำลังคน [เสริม]** – แผนกำลังคนเทียบคนมาจริง (per day/shift/workstation, short/over, daily badges). **งานเพิ่มเติม [เสริม]** – by type & source (owner rule / owner order / warehouse-created; materials; kit/de-kit).
(Note: the analytic page also has a พนักงาน tab "ผลงานพนักงาน" not listed among the 13 [observation].)

### 4.3 Analytic dimensions & filters (reports.html)
- Common: breadcrumb drill (ทั้งหมด › BeautyNara › Shopee), period (เดือนนี้/เดือนก่อน), compare period (none / custom), more filters, clear, **บันทึกมุมมอง** (save view), view by วัน/สัปดาห์/เดือน, "แยกตาม" toggle, Excel (respects filters), "ดูรายการ" opens filtered operational page. No automatic prior-period comparison.
- Inbound: receipt type (แจ้งล่วงหน้า / โอนจากคลังอื่น / ไม่ได้แจ้งล่วงหน้า), supplier (โรงงาน A/B), door (D1/D2), delivery method (owner delivers / warehouse picks up), receiving unit (e.g. ลัง), receiving issue (ไม่มีปัญหา, ขาด, เกิน, ชำรุด, ผิดรหัส, ไม่ได้แจ้ง, ล็อตไม่ตรง), urgency (ด่วน/ปกติ). KPIs: PO docs, rounds, pcs received, short 0.4%/over 0.1%, receive→sellable 3:10 h per pallet.
- Inventory: group (รับเข้า/จ่ายออก/ใช้ไป/ปรับยอด/เปลี่ยนรหัส), zone, **location types** (ตำแหน่งเก็บ, ตำแหน่งหยิบ, ตำแหน่งรับเข้า, ตำแหน่งพักสินค้า, ตำแหน่งส่งมอบ, ตำแหน่งรอคืนชั้น, ตำแหน่งคืน, ตำแหน่งชำรุด / กักกัน), product type (สินค้า, สินค้าเซต, ของแถมและสื่อการตลาด, บรรจุภัณฑ์). Zones incl. "โซน C (เย็น)" (cold). Count variance target 0.5%.
- Outbound: channel (incl. เว็บไซต์), carrier, speed (ส่งทันที / ส่งด่วน), handover type (ขนส่งเข้ารับ, คลังนำส่งเอง (Drop-off), ลูกค้าเข้ารับเอง, คลังจัดส่ง, โอนย้ายคลัง), handover round (12:00/14:30/16:00/18:00), platform vs non-platform, **pick methods** (ตามคำสั่งซื้อ, รหัสสินค้าเดียวจำนวนมาก, คำสั่งซื้อสินค้าชิ้นเดียว, คำสั่งซื้อรูปแบบเดียวกันเป็นชุด, รวมหลายคำสั่งซื้อ, หลายคำสั่งซื้อพร้อมคัดแยก), **pack methods** (แพ็คตามคำสั่งซื้อ, แพ็คตามใบหยิบ, แพ็คแบบไลน์ผลิต, แพ็คหลายกล่อง), slow stage.
- Returns: type (ส่งไม่สำเร็จ / ผู้ซื้อคืนสินค้า), inspection result (สภาพดี, ชำรุดเสียหาย, ไม่ครบสูญหาย, เซตไม่ครบ, รหัสสินค้าผิด, หมดอายุ, ไม่ใช่ของเจ้าของสินค้า), reason (ผู้ซื้อปฏิเสธรับ, ส่งไม่ได้, ที่อยู่ผิด, สินค้าผิด), source (ยกเลิกหลังส่งมอบ, ขนส่งแจ้งส่งไม่สำเร็จ, คำขอคืนจากแพลตฟอร์ม, เจ้าของสินค้าแจ้งในระบบสำหรับเจ้าของสินค้า), matching (พบ/ไม่พบคำสั่งซื้อ). Target return rate ≤ 2.5%.
- Procurement (warehouse's own consumables: กล่อง/เทป/บับเบิ้ล; suppliers บ.กล่องไทย, บ.เทปดี); system suggests lead-time change (5→6 days).
- Staff performance: department (หยิบ/แพ็ค/ส่งมอบ), work method (pick methods, ขึ้นรูปกล่อง · เตรียมงาน / แผนกแพ็ค, handover types); KPIs vs standard 96% (<85% flagged), accuracy 99.7%, actual hours net of breaks/idle; columns "ผ่านสุ่มตรวจ · ใช้เวลากับงาน" require วางแผนงานและกำลังคน module; multi-dept staff in one row with hour split; standards compared per method first.
- Transport: own vs partner trucks, by truck (TRK-03)/driver/vehicle type/owner; cost (fuel 62%), revenue billed to owner, profit.
- Manpower: shift (เช้า/บ่าย), workstation; planned vs actual, daily badges (บัตรรายวัน).
- VAS: service (ติดสติกเกอร์, ประกอบเซต, รีแพ็ค, ถ่ายรูป), source, owner.

### 4.4 TV mode
Header: warehouse, date, last data time, auto-refresh 1 min. Tiles: ส่งมอบแล้ว (74%), รอส่งมอบ (ใกล้ตัดรอบ), ส่งตรงเวลา (excl. owner wait), คาดว่าเสร็จ 17:40 vs last truck 18:00, คนทำงานตอนนี้ 58 (per dept + helpers). Pipeline (same 5 stages). Department progress: รับเข้า (pcs vs target), หยิบ (pcs/hr), แพ็ค (orders/hr), ส่งมอบ (next round), ตีกลับ (awaiting inspection). Alert pills: คำสั่งซื้อผิดปกติ (รอเจ้าของสินค้า 15 · รอคลัง 2), รอข้อมูลขนส่ง (re-fetch every 5 min), หยิบไม่พอ รอเติม (เติมด่วน 2 งาน), รถเข้าส่งของวันนี้ (arrived/waiting), ยกเลิกรอคืนชั้น (before last truck), ตีกลับวันนี้. Carrier board (auto-scroll): carrier, truck time · pack cut-off, time left, not handed over, not packed, status **ไม่ทัน / ต้องเร่ง / ทัน**; carriers: SPX (Shopee), J&T, Flash, Kerry, Same Day, Lazada Logistics, ไปรษณีย์ไทย, Lalamove (pack within 45 min), ส่งทันที Instant (pack within 30 min). Ticker incl. equipment issue ("โต๊ะ PS-07 กล้องไม่ชัด").
Rules: TV never shows prices, amounts or recipient data; dept performance aggregated (daily workers counted in actual dept), **no individual ranking**.

### 4.5 Rules / roles / devices
Reports = historical by date range; today's work is in each function's overview. Downloads permission-based and logged; buyer data masked per permission; owners see only their own reports in portal (not staff performance or other owners); every report shows data time; **no sales-tax report** (tax invoice numbers go back to OMS); report names describe content. Roles: หัวหน้าคลัง · ผู้จัดการ (auto-send recipients). Devices: desktop + wall TV (TV-02).

### 4.6 3PL judgement
Core WMS: inbound analysis, movement summary, inventory accuracy, outbound/on-time, packing materials, returns, claims root cause, procurement of consumables, staff performance, TV mode. **Phase-2 / multi-owner**: พื้นที่คลังตามเจ้าของ (storage billing basis), per-owner dimensions/drill, "เจ้าของสินค้าเห็น" owner-visible reports, transport profit per owner, VAS by owner-rule source. Add-on modules (เสริม): transport, manpower, VAS.

---

## 5. Account / Login / PDA login & menu

### 5.1 Screens

| File | Purpose |
|---|---|
| login.html | Warehouse desktop login, 10 demo states incl. **เลือกคลัง** (warehouse selection) |
| account-change-password.html | Change password (warehouse user ton@company.co) |
| account-help.html | Manuals per warehouse function + ticket to Zimple team (SUP-…) + QR to open PDA login of a warehouse |
| pda-login-menu.html | Interactive PDA (device PDA-014) login by badge QR and role-based main menu, plus login error states |

### 5.2 Login states (exact pills)
Desktop: 1 เข้าสู่ระบบ · 2 รหัสผิด · 3 ถูกล็อกชั่วคราว · 4 ลืมรหัสผ่าน · 5 ส่งลิงก์แล้ว · 6 ยืนยันตัวตน OTP · 7 เลือกคลัง · 8 หมดเวลาใช้งาน · 9 บัญชีถูกพักใช้ · 10 ไม่มีสิทธิ์. Owner portal has the same minus เลือกคลัง (9 states).
Rules: 3 attempts then temporary lock (~15 min countdown "14:32") or reset by email; reset link valid 30 min; same message whether email exists (no account enumeration); OTP 6 digits via email, resend after 45 s; MFA shown when company enables it, **always required for Zimple customer-care staff**; session timeout auto-logout; suspended / role-without-pages messages; TH/EN language switch; password policy "ตามนโยบายของบริษัท"; after password change other sessions are logged out. Warehouse selection: account with 2 warehouses chooses (role shown per warehouse, e.g. ผู้จัดการคลัง; warehouse hours e.g. SMI จันทร์–เสาร์ 08:00–18:00); switch later via top-left selector; single-warehouse accounts skip. Accounts are created by company admin (portal: by owner admin or warehouse). Floor staff don't use desktop login — they scan badge QR on PDA.

### 5.3 PDA login rules
- Login by **employee badge QR**; username/password only for those who have one and if warehouse enables; **no OTP on PDA**; optional **4-digit PIN after badge** (default off, enabled in กฎคลัง).
- States: ไม่รู้จักบัตร (unregistered badge; red screen + beep; notify per company settings), บัตรรายวันค้างคืน (daily badge T-039 not registered today → register with supervisor first), เข้าระบบ PDA เครื่องอื่นอยู่ (single active PDA session per user; log out PDA-009 first), ไม่มีสิทธิ์ใช้ PDA (same message for badge & username), เลือกคลัง (multi-warehouse user picks today's warehouse; role pill per warehouse), ล็อกจอ (idle timeout set by warehouse; rescan own badge to unlock; "ไม่ใช่นิด? ออกจากระบบ").
- Header shows user, shift pill (กะเช้า), clock-in time (เข้างาน 08:02), warehouse. "ไม่มีบัตร? ลงทะเบียนบัตรรายวันกับหัวหน้า" (daily/temporary workers).
- Selected tile = department currently working; switch from main menu. Menu filtered by role (demo roles: ทุกฟังก์ชัน · พนักงานหยิบ · พนักงานรับเข้า); a role with no PDA page cannot log in.

### 5.4 PDA main menu (handheld functions, with sample counters)
- **รับ-เก็บ (Receive–Putaway)**: รับสินค้าเข้า (รถมาถึง 2 · รอจัดเก็บ 4) · สินค้าตีกลับ (รอตรวจ 6 · เก็บคืนชั้น 1)
- **สินค้าคงคลัง (Inventory)**: ย้ายตำแหน่ง · เติมของ (รอทำ 2 งาน) · เบิกใช้ วัสดุของคลัง (consume warehouse materials) · ตรวจนับ (รอบนับ 1 รอบ) · ยกเลิกรอคืน (รอเก็บ 4 ใบ — cancelled orders to restock)
- **หยิบ-แพ็ค-ส่ง (Pick–Pack–Ship)**: หยิบสินค้า (รอหยิบ 3 ใบ) · เตรียมงานก่อนแพ็ค (รอเบิก 5 · พร้อมส่งต่อ 4) · แพ็คสินค้า (รอแพ็ค 38 ใบ) · ส่งมอบขนส่ง (ด่วน 1 · ส่งมอบ 4 เที่ยว)
- **หัวหน้า (Supervisor)**: สแกนเข้าจุดงาน (จุดของฉัน 3 จุด — workstation check-in) · สุ่มตรวจ · สุ่มสังเกต (รอตรวจ 3 ใบ — QA spot check/observation)
- Footer: ล็อกจอ · ออกจากระบบ.

Help manuals (warehouse): รับสินค้าเข้า, หยิบสินค้า, เตรียมงานและแพ็คสินค้า, ส่งมอบขนส่ง, สินค้าตีกลับ, สินค้าคงคลังและตรวจนับ, วางแผนงานและกำลังคน, ตั้งค่าคลัง, การใช้งานบน PDA. Owner manuals: ภาพรวมและคำสั่งซื้อ, คำขอจากคลัง, รับสินค้าเข้า, สินค้าคงคลัง, สินค้าตีกลับ, จัดการเคลม, งานเพิ่มเติม, ค่าบริการ, ตั้งค่าและการเชื่อมต่อ API. Support: warehouse users → ทีม Zimple; owner users → the warehouse they use.

### 5.5 Roles & devices
Roles seen: ผู้จัดการคลัง, หัวหน้า, พนักงานหยิบ, พนักงานรับเข้า, daily/temporary workers (บัตรรายวัน), Zimple customer-care (ทีมดูแลลูกค้า Zimple — must MFA; implies vendor staff can access tenants). Devices: desktop ("คนในสำนักงานใช้คอม"), PDA handheld with scanner (named devices PDA-NNN), employee QR badges, wall TV, pack-station camera.

### 5.6 3PL judgement
Core WMS: desktop auth, MFA, PDA badge login, role-based PDA menu, multi-warehouse selection. Phase-2: owner-portal login/accounts, owner-scoped support routing. Multi-tenant SaaS (vendor Zimple serving tenant Fullfeel) is a platform concern separate from multi-owner.

---

## 6. Notable observations / inconsistencies
- Owner admin differs between mocks: portal settings shows คุณบี as sole admin; warehouse owners-detail shows คุณปวีณา as owner-side admin and คุณมิ้น as ops@beautynara.co (portal uses min@beautynara.co). Treat as mock data drift.
- `IV-` prefix is used both for the warehouse's invoice to the owner (IV-261102-0003) and the default pattern of the owner's full tax invoice issued to buyers — potential collision [observation].
- overview-en has features absent from Thai overview (customer filter, date range, approvals/notifications, cycle-time KPI); Thai has "รอส่งมอบ / ใกล้ตัดรอบ".
- Several portal footnotes describe hypothetical variants ("ตัวอย่าง: แถบนี้ขึ้น…", "ตัวอย่างนี้แสดง…") — mockups show multiple states on one page.


---

# F. Settings & Master Data (ตั้งค่า & ข้อมูลหลัก)

Scope: 18 `settings*.html` mockups + `new-sample-settings-warehouse-rules.html` + `theme-tool.html`. Brand in mockups: "Fullfeel Fulfillment" (tenant) on Zimple platform. Two product modes recur everywhere: **Zimple Fulfillment (3PL)** vs **Zimple WMS (Business · บริษัททำคลังเอง)**. Many items carry the badge `[เฉพาะ 3PL]` (3PL only) and `[โมดูลเสริม · …]` (paid add-on module).

## F.0 Settings overview & cross-cutting model

| File | Purpose |
|---|---|
| settings.html | Settings hub (ภาพรวมตั้งค่า): 11 numbered setup steps in 3 groups, "must set before use" blockers, "still on system default" list |

- 3 setting groups: **ตั้งค่าบริษัท** (company, once for all warehouses: 1 company & logo, 2 users & permissions, 3 documents) · **ตั้งค่าคลัง** (per warehouse, switch warehouse top-right: 4 warehouses & locations, 5 devices & stations, 6 connections, 7 carriers, 8 time & tracking, 9 warehouse rules) · **ตั้งค่าเจ้าของสินค้า (3PL)** (10 owner settings, 11 add owner — "Zimple WMS ไม่มีกลุ่มนี้").
- Numbers = recommended system-start order (ลำดับเริ่มระบบ); everything editable later.
- **Config precedence (verbatim):** "ลำดับการใช้ค่า ค่าเริ่มต้นของระบบ → บริษัท → คลัง → เจ้าของสินค้า → รหัสสินค้า · ค่าที่ตั้งละเอียดกว่าชนะ · ทุกหน้าบอกระดับของแต่ละค่า · ค่าที่ยังไม่ตั้งใช้ค่าเริ่มต้นของระบบ งานเดินได้ทันที" → 5-level override hierarchy: system default → company → warehouse → owner → SKU; most specific wins; every setting shows its level.
- Blocking items ("ต้องตั้งก่อนใช้งาน"): e.g. pack tables PS-11/PS-12 not bound to device → "ส่งงานเข้าโต๊ะไม่ได้จนกว่าจะผูกและทดสอบผ่าน"; owner NatureBox has no intake channel → "เจ้าของสินค้าส่งงานเข้าคลังไม่ได้".
- Counters shown: 41 settings done; company 11, locations 5, devices 4, connections·carriers 9, rules 8, owner 4.
- Level badges used across pages: `[กฎรวมคลัง]` (warehouse-wide rule, not overridable), `[ตั้งรายเจ้าของสินค้าได้]` (owner-overridable per contract), `[เจ้าของสินค้าตั้งเอง]` (owner sets themselves; warehouse cannot edit), `[ตั้งรายคลังได้]`, `[บริษัท]`, `[คลัง]`, `[คลัง · รหัสสินค้าเปลี่ยนได้]` (SKU can override), `[ปิดไม่ได้]` (cannot be disabled), `[บังคับ]`, `[อ่านอย่างเดียว]`.
- Some items configured elsewhere: vehicles & drivers (จัดการรถขนส่ง), pricing (ค่าบริการ › ราคาค่าบริการ).

## F.1 Storage — warehouses / zones / locations / layout (คลังสินค้า & ตำแหน่ง)

| File | Purpose |
|---|---|
| settings-storage-warehouses.html | List/add warehouses (code, address, working calendar, utilisation, video storage) |
| settings-storage-zones.html | Zones per warehouse + location types + doors & staging points (ประตูและจุดวาง) + sell-stock rules per location type |
| settings-storage-locations.html | All bin locations: type, capacity, utilisation, contents, mixing, walk sequence; print labels |
| settings-storage-layout.html | Floor-plan editor (ผังคลัง) — explicitly **Phase 2** |

Sub-tabs: ① คลังสินค้า 2 ② โซน 20 ③ ตำแหน่ง 2,048 ④ ผังคลัง.

**Entities & fields**
- Warehouse: name, 3-letter code (e.g. BKN, SMI — "ใช้ในเลขเอกสาร"), address, working calendar (e.g. "ทุกวัน 08:00–20:00", "จันทร์–เสาร์ 08:00–18:00"), holidays, zones·locations count, % used, temperature rooms, video storage (VID-BKN-01, % used, retention 60 days default), carrier pickup rounds/day, owners using it.
- Zone: code, name, location types in zone, room type (ปกติ / คุมอุณหภูมิ 2–8 °C / 15–25 °C), capacity m³, % used, department·PDA (e.g. "หยิบ · PDA-07, 08", "สินค้าคงคลัง · รถยก"), walk-order pattern (ซิกแซกตามแถว / ตามแถว / ทางเดิน → ตู้ → ชั้น → ช่อง), location code format.
- Example zones: A ชั้นหยิบ, B สำรอง (พาเลท), C ห้องคุมอุณหภูมิ 2–8 °C, D สำรองใหญ่, E แร็คสูง, IN-S จุดพักรับเข้า, QC ตรวจสภาพ, RT สินค้าคืน, RTS รอคืนชั้น, DMG ชำรุด/กักกัน, CXL ยกเลิก (รอเปิดกล่อง), PK จุดพักรอแพ็ค (PK-S1…S6), OUT จุดวางรอส่งมอบ, PICKUP จุดรับของหน้าคลัง (PICKUP-1 · RIDER-1).
- Location: code (2–6 levels configurable per zone, e.g. A-03-02 zone-row-level; E-01-03-02-04 zone-aisle-bay-level-slot), zone, walk sequence no., type, sellable flag, capacity (m³ · kg), % used, contents (SKUs·lots / pallet ID / PO), mixing (อนุญาต / ห้ามคละ / เจ้าของสินค้าเลือก).
- Door (ประตู): IN-D*/OUT-D*/หน้าคลัง, purpose, bound staging points, carriers using it.
- Layout: building size W×L m (1 cell = 1 m), shapes for zone / rack / rack-set 4 rows; coordinates x·y·w·l·rotation for zones, rack rows, doors, tables, work points.

**Location types (ประเภทตำแหน่ง)** — 8: ตำแหน่งหยิบ (pick), ตำแหน่งเก็บ (reserve), ตำแหน่งรับเข้า (inbound staging), ตำแหน่งพักสินค้า (staging before pack / VAS-STG / sort wall), ตำแหน่งส่งมอบ (outbound/handover), ตำแหน่งคืน (returns awaiting QC), ตำแหน่งรอคืนชั้น (cancelled awaiting putback), ตำแหน่งชำรุด / กักกัน (damaged/quarantine, incl. DMG-T totes at stations).

**Status / badges**
- Location type pills: `หยิบ`, `เก็บ`, `รับเข้า`, `คืน`, `รอคืนชั้น`, `ชำรุด / กักกัน`, `พักสินค้า`, `ส่งมอบ`.
- Sellable column (ส่งยอดขาย): `✓ ขายได้` (sellable) / `✗ ไม่ขาย` (not sellable) / `เจ้าของสินค้าเลือก` (owner chooses).
- Location state: `ล็อกนับ · CC-261010-003` (locked for count), `ปิดใช้ · ซ่อมชั้น` (disabled · rack repair).
- Doors: `ประตูรับสินค้า`, `ประตูส่งมอบ`, `จุดรับของหน้าคลัง`.
- Module: `[โมดูลเสริม · คลังควบคุมอุณหภูมิ]`.

**Business rules (verbatim-ish)**
- Available-to-sell sent to OMS = total on-hand − pending orders (reserved, incl. stock in staging & handover locations) − damaged/quarantine − returns locations. Inbound-staging inclusion chosen by owner in OMS "Sync Stock". All types count in on-hand (owner sees all). Item status overrides location type (e.g. sales-blocked / near-expiry in pick location not sent).
- Received stock must be counted & confirmed; pickable only after putaway / put-back; putaway of SKUs with waiting orders becomes urgent task.
- Picked goods live in QR'd containers (cart/tote), container always in a location; after picking scan into staging location. Pack table can only scan items in staging location, else "ยังไม่ได้หยิบผ่านระบบ".
- Stock is deducted at handover location only when handover confirmed.
- Returns-to-shelf location: when an order arrives the system prompts putback before creating pick list.
- 1 SKU may sit in many locations (multiple pick faces + reserve).
- Temperature rooms (add-on): system won't suggest storing temp-controlled goods in non-compliant zone.
- Doors & staging (toggle "ใช้ประตูและจุดวาง", new warehouse default OFF): door = docking point, holds no stock; staging points are locations counted in inventory; each staging point bound to a door; each carrier has default outbound door (set in carriers › pickup rounds), changeable on arrival. Single-door warehouse sets door as both inbound+outbound. OFF → system only tells container/slot by carrier+round, one OUT and one IN-S. Recommended ON for many simultaneous trucks or frequent large/B2B jobs.
- Multi-warehouse: one owner may use many warehouses; one warehouse holds many owners; container/device codes unique within a warehouse (QR embeds warehouse code); primary/backup warehouse set per owner (not on warehouse); containers from another warehouse arriving with TF shown "รอส่งคืน".
- Layout (Phase 2, verbatim): "ผังคลังเป็นงานระยะ 2 · ดูผังแบบอ่านอย่างเดียวที่ สินค้าคงคลัง › ยอดคงคลัง › ผังคลัง" — placing rack rows auto-generates location codes (slot × level) and walk order (zigzag / one-way); aisles not drawn; heat colours by density (สีตามความแน่น), walk order overlay.

**User actions:** add warehouse/zone/location/door, filter by zone/type/room, scan location QR to search, print location labels (bulk), edit capacity & sequence, toggle doors; layout: drag/resize/arrow-nudge 0.5 m, undo, duplicate, print plan, save.
**Roles:** warehouse manager / admin [INFERRED]; zone ↔ department ↔ PDA binding.
**Devices:** PDA per zone, forklift (รถยก) zone E, location QR labels, temperature room.
**3PL/multi-owner:** inbound-location sell-stock & mixing "เจ้าของสินค้าเลือก"; per-owner primary/backup warehouse. **Core:** warehouses, zones, locations, types, sell-stock formula, doors toggle. **Phase 2:** layout editor (explicit); temperature rooms = add-on.

## F.2 Warehouse rules (กฎงานคลัง) — KEY

| File | Purpose |
|---|---|
| settings-warehouse-rules.html | All per-stage operational rules for the current warehouse; tabs by process; level badge per rule |
| new-sample-settings-warehouse-rules.html | Alternate "new sample" variant (see diff at end of section) |

Header: "ตั้งค่าคลัง · กฎของแต่ละขั้นงาน · ตั้งต่อคลัง เจ้าของสินค้าตั้งต่างได้บางข้อ". Tabs: รับเข้า · หยิบ · แพ็ค · สินค้าคงคลัง · ส่งมอบ · ตีกลับ · ยกเลิกรอคืน · เคลม · งานเพิ่มเติม · ค่าบริการ. Table columns: ตั้งค่า (setting) · ระดับ (level). Default rule level: "ตั้งรายเจ้าของสินค้าได้" = warehouse value used by all owners unless set differently per contract at owner settings.

### F.2.1 Inbound (กฎรับเข้า)
*Time & appointments (5 rules)*
1. Inbound days/hours — "จ.–ส. 8:00–16:00" `[กฎรวมคลัง]` (applies to all owners in warehouse).
2. Rush inbound (owner pre-notifies) — owner ticks "ขอรับด่วน" on ASN; warehouse approves; receive before other work (unload → check vs ASN → putaway). Value: notify ≥ 24 h ahead; approver per company › approvals.
3. Unannounced arrival (no ASN or before date) — billable `[เฉพาะ 3PL]`; "ให้หัวหน้าเลือกว่าคิดค่ารับเข้าด่วนหรือไม่" `[ตั้งรายเจ้าของสินค้าได้]`.
4. Arrival outside working hours — compare truck time vs calendar/shifts; "รับได้ · หัวหน้าเลือกคิดค่าล่วงเวลา / ค่ารับเข้าด่วน หรือทั้งคู่".
5. Mandatory vehicle data (plate · driver · time in) — currently `[ปิด]`; off = can receive, TM tagged "ไม่มีข้อมูลรถเข้า".

*Receive & check (6 rules)*
6. Receiving count method — 100% all cartons / random open N cartons per SKU-lot; mismatch → full count. Value: "สุ่มเปิดนับ 2 กล่อง · ไม่ตรง = นับทั้งหมด".
7. Max N cartons per round without container — ≤ N → system chooses "ไม่ลงภาชนะ · จัดเก็บทีละลัง"; above → use container; staff can change. Value: 3.
8. Over-receipt vs ASN — "0% · ส่วนเกินแยกไว้ รอเจ้าของสินค้ายืนยัน".
9. Photo on mismatch (short · over · damaged · wrong SKU) via station camera or PDA camera — `บังคับ`.
10. Stuck receiving round alert — "เกิน 2 ชม." (per company › notifications).
11. PO/ASN closing — multi-round receiving allowed; inbound fee charged per completed round; on completion summary of short/over/damaged sent for owner to confirm close; "ไม่ตอบ 3 วัน ปิดเอง".

*Product data (3 rules)*
12. Measure first carton of new SKU before putaway (for m³ billing).
13. Measure/weigh unit when missing — PDA warns on first receipt.
14. Weigh new SKUs without weight (scale auto-fills; manual entry logged "พิมพ์เอง"); off = no weighing.

*Labels & storage (5 rules)*
15. Carton QR on every box — created at PO check-in; print ≤ carton count; reprint keeps number; old label invalid only for unreceived cartons; piece-unit goods go into warehouse containers. Value "เปิด · ทุกกล่อง".
16. Mixed-SKU carton — "แยกเป็นกล่องละรหัส · คิดค่าคัดแยก + ค่าบรรจุภัณฑ์ถ้าใช้บรรจุภัณฑ์ของคลัง".
17. Pre-receipt VAS — no barcode → label; mixed SKU/lot → sort; billed at owner price. Value "เปิดงานให้เองตอนเปิดใบ PO".
18. Dock-to-stock target (ของถึงจนพร้อมขาย) — "1–3 วัน" `[ตั้งรายเจ้าของสินค้าได้]`.
19. Awaiting-putaway alert — "ห้องปกติ 2 ชม. · ห้องคุมอุณหภูมิ 30 นาที".

*Other (1)*
20. Lot & date capture — per product settings (lot control · MFG/EXP · shelf life); warehouse records at receipt; lot in owner's PO not mandatory.

Owner-overridable extras listed in owners page: acceptance criteria (เกณฑ์รับสินค้า: min remaining shelf life · seal · dented boxes), over-receipt aging "ของเกินค้างเกิน N วัน" (7 days, `[กฎรวมคลัง]`, owner view-only).

### F.2.2 Picking (กฎหยิบ)
1. Accept rush requests after cutoff — billable `[เฉพาะ 3PL]`; differs from carrier Express; "เปิด · ปิดรับคำขอก่อนรอบรถสุดท้าย 60 นาที"; approver per approvals.
2. Auto pick lists `[โมดูลเสริม · ใบหยิบอัตโนมัติ]` — per owner × (ส่งทันที / ส่งด่วน / ปกติ) · wait ≤ 20 min; value "รอคลังกดสร้าง · เปิดเฉพาะส่งทันที" (4 owners set their own); options: create immediately by time / wait for warehouse; max open lists (e.g. 6); batch size (audit log shows "รอบละ 50 → 30 คำสั่งซื้อ").
3. Print pick list on creation → zone printer.
4. Scan cart/tote at pick start — system states type & size; picker scans free cart; wrong type warns. `บังคับเสมอ`.
5. Scan location — always mandatory for lot-controlled items.
6. Scan every piece — can be disabled only for single-SKU bulk / same-pattern batch lists (scan 1 + qty) `[คลัง · รหัสสินค้าเปลี่ยนได้]`.
7. Cancel pick list already started — off = cancel per order only.
8. Confirm empty slot — after last unit, PDA asks "ว่างแล้วใช่ไหม"; No → creates urgent count. `เปิด`.

### F.2.3 Packing (กฎแพ็ค)
*Job setup (5)*
1. Default pack method — follows pick method (skip methods owner doesn't use). "ตามกฎ".
2. Unused pack methods per owner — "ใช้ได้ทุกวิธี".
3. Auto-assign to table — unassigned job binds to table + packer at first scan.
4. Pack zones & conveyor routing — job type → box size → owner zone → shortest queue. "3 โซน".
5. Tote arrives at wrong zone — "แพ็คต่อ + บันทึก" or send back.

*Scan & check (4)*
6. Scan inserts (freebies/marketing · in-box documents) — toggled separately; contents set at สินค้า › จับคู่วัสดุและสื่อการตลาด. Value "ของแถมฯ ไม่สแกน · เอกสาร ไม่สแกน".
7. Multi-box requires approver.
8. Weighing — on = every job needs weight (scale fills; manual logged "พิมพ์เอง"); off = none.
9. Weight tolerance — larger of ±5% or 20 g; exceed → warn.

*Packaging & materials (5)*
10. Box source — warehouse packaging / owner packaging; value "บรรจุภัณฑ์ของคลังตามขนาด".
11. One packaging scan per box `[บังคับ]` (box, bag or envelope; else counted as inner material).
12. Inner materials when product has paired material — packaging-paired vs product-paired; value "ใช้ทั้งสอง".
13. Per-SKU paired material toggle.
14. Packaging stock deduction — on scan; deducted at box close (`อ่านอย่างเดียว`).

*Close & evidence (3)*
15. Video retention — per contract; auto-record where station has camera; "60 วัน".
16. Per-order clip (production-line packing) — cut from line video by label-scan time; "ก่อน 30 · หลัง 30 วินาที".
17. Non-disableable steps: scan start, scan close, scan every piece or UoM barcode, serial/valuables every piece, cancellation check before printing label.

*Pre-pack prep `[โมดูลเสริม · เตรียมงานและวัสดุแพ็ค]` (2)*
18. Pre-pack prep on/off + methods: "เตรียมตามช่อง · เตรียมเป็นชุด · เตรียมหลายกล่อง".
19. Box forming (ขึ้นรูปกล่อง) on/off.

### F.2.4 Inventory — move, replenish, count (กฎสินค้าคงคลัง · ย้าย เติม นับ)
*Stock & reservation (4)*
1. Auto-reserve for back-ordered orders — "เปิด · จองให้คำสั่งซื้อรอของตามลำดับเดิม".
2. Min remaining shelf life to ship — SKU-overridable (owner example 90 d vs warehouse 60 d).
3. High-value item handling — paid service, owner ticks SKUs; `ปิด`.
4. Warehouse-material issue above N per time requires approval — "เกิน 10 ชิ้นต่อครั้ง".

*Replenish & move (6)*
5. Scheduled replenishment — batch print every N min; "ทุก 30 นาที".
6. Urgent replenishment when pick short — print at zone + notify PDA.
7. Confirm by paper task — for warehouses without PDA.
8. Ad-hoc move without task — who: roles › special permission; "ต้องระบุเหตุผลทุกครั้ง".
9. Stuck move task — "30 นาที".
10. Stock idle in staging location (awaiting pack · return · inbound) — "เกิน 24 ชม."; in daily reconciliation report.

*Count & damaged (3)*
11. Cycle counting — full-warehouse quarterly; ABC velocity fast 1 mo / medium 3 mo / slow 6 mo; blind count ("ไม่เห็นยอด"); self count (PDA/web), match → close `[ปิดงานอัตโนมัติเมื่อตรง]`; variance approval per approvals › count variance.
12. Damaged backlog alert — "เกิน 30 วัน · เตือนซ้ำทุก 7 วัน"; never auto-dispose.

*Units & barcodes (3+1)*
13. Accepted base units (multi-select, e.g. ชิ้น) — owner SKUs with other base unit cannot be received; warehouse's own items exempt.
14. Accept fractional-unit products — on/off.
15. Multiple barcodes per SKU — off = unknown barcode stops; on = bind extra barcode (approval); 1 barcode = 1 SKU + 1 UoM within same owner.
16. Notify owner before lot expiry 90/60/30 days `[เฉพาะ 3PL]` — weekly email summary.

*Count reasons table `[ตั้งรายคลังได้]`*: base (non-deletable): สูญหาย, ของเกิน, บันทึกผิด, อื่น ๆ (ระบุ); custom: ของเสื่อมสภาพในชั้น (คลังบางเขน), ฉลากหลุด (ทุกคลัง, `[ปิดใช้]`). Columns: reason · note · photo required. Rules: custom reasons can be disabled not deleted (history keeps name); "อื่น ๆ" requires note; per-reason photo requirement; mis-slot uses "จับคู่วางผิดช่อง" button, not a reason.

### F.2.5 Handover / dispatch (กฎส่งมอบ)
*Sorting & containers (3)*
1. Sort method — both: fill container (scan container first) / sort parcels (system tells container); default fill container.
2. Use containers at handover — all carriers / per carrier (or when parcels in round exceed threshold) / none (hide sort-to-container, scan tracking at handover); "มีผลวันถัดไป". Value "ใช้ทุกขนส่ง".
3. Weighing — per container vs sum of parcel weights; tolerance per carrier; no containers = per parcel.

*Cancellations before handover (2)*
4. Cancellation-data freshness check — warn to re-pull if OMS/platform cancel data older than "15 นาที".
5. Pull cancelled parcels — at handover (one pass) or immediately on cancel; "ตอนส่งมอบ".

*Handover & day close (5)*
6. Signature — tablet/PDA signature and/or printed manifest + photo; default tablet.
7. Customer self-pickup — ID card check; no-show 30 min after appointment → return to front pickup point; waiting > 3 days → remind owner to reschedule.
8. Warehouse drop-off (Drop-off) — billable; reasons & who pays list: "คลังแพ็คไม่ทันรอบ → คลังจ่าย · เจ้าของสินค้าขอส่งด่วนหลังตัดรอบ → คิดเจ้าของสินค้า · รถขนส่งไม่มา → ตกลงรายครั้ง · เพิ่มเหตุผลเองได้"; billed by actual method.
9. Day close (ปิดวัน) — who: special permission; "ต้องผ่านรายการตรวจก่อนปิดวัน".
10. Overtime for after-hours handover `[เฉพาะ 3PL]` — charge OT; split by each owner's parcel count in round; carrier-late can waive.

### F.2.6 Returns (กฎตีกลับ)
1. Carrier lock at return receipt — other carrier's tracking in round: "ไม่รับ" (alt: warn only — carriers page).
2. Order look-back window for suggested match; staff can search all.
3. Pending inspection alert — 2 days.
4. Return handling rule matrix — problem · when found · where goods go · who decides · report · claim against whom; "16 ปัญหา รับพัสดุ 5 · ตรวจสภาพ 10 · จับคู่ 1 · ชำรุดเสียหายและหมดอายุเข้าสินค้าชำรุดทันที" `[กฎรวมคลัง]` + `[ใครตัดสิน · ตั้งรายเจ้าของสินค้าได้]`. Owner pre-answers in Zimple OMS (example: damaged < 200 THB → destroy).
5. Awaiting-return overdue — only warehouse-booked parcels (marketplace-booked use platform SLA); per carrier "Flash 7 · J&T 7 · SPX 10 วัน"; then close or escalate to claim (lost in transit).
6. Unmatched parcel (no owner found) — "30 วัน · เตือนซ้ำทุก 7 วัน"; not stocked, not auto-discarded.
7. Owner decision deadline — "7 วัน · เกินแล้ว: เก็บต่อและคิดค่าจัดเก็บ".
8. Inspection photos — required / if device available / none; PDA fallback; video auto when table has camera. "รูปสภาพ บังคับ".

### F.2.7 Cancel-to-restock (ยกเลิกรอคืน)
1. Cancel after pick (self-pickup / warehouse delivery) — before pick always allowed; after pick needs approval + cost notice, or owner opts for instant cancel accepting cost.
2. Orders recalled for edit held until "สิ้นวัน · 1 ครั้ง" (extendable once).
3. Close return-to-shelf container → MV created when any: "เต็ม 30 ชิ้น · ทุก 2 ชม. · 1 ชม. ก่อนรถคันสุดท้าย · มีคำสั่งซื้อรอรหัสนั้น".
4. Auto-print put-back slip → zone printer.
5. Put-back before last truck (so waiting orders ship today and close-of-day stock is right).
6. Cancellation fees `[เฉพาะ 3PL]` by order type — "แพลตฟอร์ม: คิดเมื่อส่งมอบแล้ว · นอกแพลตฟอร์ม · เข้ารับเอง · คลังจัดส่ง: คิดเมื่อหยิบแล้ว".

### F.2.8 Claims (กฎเคลม) — all `[เฉพาะ 3PL]`; role-edit page tags it `[โมดูลเสริม]`
1. Owner must file claim within 15 days from delivery; after deadline button hidden.
2. Warehouse must answer within 7 days; warn 1 day before; overdue repeats daily; overdue case = "เกินเวลา · รอคลังยืนยัน", never auto-decided.
3. Claim types — 9 types; "ต้องส่ง / ต้องเรียกคืน · เพิ่มรายการที่ไม่ได้สั่งได้".
4. Claim SLA: acknowledge · investigate · resolve = 4 · 24 · 48 h · overdue 2 days.
5. File claim with carrier within — per carrier.
6. Warehouse error target — 0.05% per warehouse / owner.
7. Carrier selection for claim shipments & return labels — manual / locked / by weight band; "ตามช่วงน้ำหนัก รถของบริษัทก่อนใน กทม. และปริมณฑล".

### F.2.9 VAS — extra services (งานเพิ่มเติม · 18) `[โมดูลเสริม · งานเพิ่มเติม]`
Columns: unit · stage allowed · must complete before next step · owner approval `[เฉพาะ 3PL]`. Service "แบบ" types: 1 print, 3 issue warehouse material, 4 change SKU, 5 inspect, 6 photo/video request.
| Code | Name | Stage | Blocking | Owner approval |
|---|---|---|---|---|
| LABEL_BARCODE | ติดบาร์โค้ดสินค้า (แบบ 1) | รับเข้า · คลัง | before shelving | ต้องอนุมัติ |
| BUBBLE_EXTRA | ห่อบับเบิ้ลพิเศษ (แบบ 3) | — | — | อนุมัติล่วงหน้า |
| KIT_ASSEMBLE | จัดเซต / Bundle (แบบ 4) | คลัง | before sale | — |
| RT_REBAG | เปลี่ยนถุงสินค้าตีกลับ (แบบ 3) | ตีกลับ | before put-back | ทำได้เลย · โต้แย้งได้ 7 วัน |
| PRODUCT_PHOTO | ถ่ายรูปสินค้า (แบบ 6) | per SKU | — | — |
| GIFT_WRAP | ห่อของขวัญ (3+2+1, 2 option groups) | แพ็ค | before box close | เจ้าของสินค้าสั่ง · ทำได้เลย |
| INSPECT_SORT | ตรวจ / คัดแยกสินค้า (5, +4 if SKU changes) | คลัง · รับเข้า | — | result set by owner (pass → keep SKU · fail → quarantine) |
Rules: owner orders VAS via OMS (or owner portal) attached to order/ASN or standalone; OMS sends service code → task auto-created at configured stage; unknown code/free text → note only; owner-ordered = do immediately at agreed rate; cancelled order cancels linked VAS, not billed if not done. Warehouse-fault rework not billed, visibility to owner optional. Zimple WMS: no prices/owner approval; warehouse screens never show prices.

### F.2.10 Billing review (ตรวจรายการค่าบริการ) `[เฉพาะ 3PL]` — "Zimple WMS ไม่มีแท็บนี้"
1. Dispute window — 7 days from billing-cycle send (BC-); invoice issued immediately; accepted dispute = AJ next cycle. `[กฎรวมคลัง]`.
2. Auto-pass — normal-work items with price in owner's rate version & qty within range → "ตรวจแล้ว".
3. Abnormally high qty — vs owner's 30-day average per service; "เกิน 200% ของค่าเฉลี่ย" → "รอตรวจ".
4. First cycle of new rate version (SV/PM/SH) — review all.
5. Post-cancellation items (pack fee, cancel fee, work after cancel) — รอตรวจ.
6. No price — cannot send cycle until priced.
7. One-off / manually keyed items — รอตรวจ ทุกรายการ, even if owner approved price.
8. Manual price outside rate version (free/discount).
9. Adjustment AJ — always needs approver; creator cannot self-approve. `ต้องอนุมัติเสมอ`.
10. Auto-suspend service on overdue payment — on = auto-suspend after clearing earlier orders; off = admin request + approval. Value "ปิด".
Cycle can be sent only with no pending review; changes affect new items; edit history kept; mandatory items cannot be disabled.

### F.2.11 Inventory compensation (ชดเชยค่าสินค้าตอนตรวจนับ)
1. Method — aggregate at inventory reconciliation cycle / per case; "ส่วนเกินหักส่วนขาด ไม่จ่ายคืน".
2. Default unit value — compensation uses OMS cost only; missing → "100 บาท / ชิ้น".
3. Inventory accuracy measured by value / piece count by value band.
4. Min inventory accuracy — "99.5% · มูลค่าสูง 99.9%".
5. Compensation cap — per piece & per count cycle (contract, optional; blank = unlimited).
No add-on needed; owner-overridable (use warehouse / custom).

### F.2.12 Diff: new-sample-settings-warehouse-rules vs settings-warehouse-rules
- Title suffix "(ตัวอย่างใหม่)" + banner: "ตัวอย่างใหม่ · พักไว้" — new filter **"เฉพาะที่ต่างจากค่าเริ่มต้น"** (only rules differing from default) with count `4`; tab badges show number of edited rules (รับเข้า 1, สินค้าคงคลัง 1, ส่งมอบ 1, ตีกลับ 1); edited rows show "ค่าเริ่มต้น: …". Note: the 4 edited rules are mock data "รอ product owner กำหนดชุดค่าตั้งต้น" (default set pending PO decision). Empty state "ยังไม่มีกฎที่ต่างจากค่าเริ่มต้น".
- Revealed system defaults: receiving count default "นับทุกกล่อง"; replenishment default "ทุก 60 นาที"; cancel-data freshness default "เตือนเมื่อเก่าเกิน 30 นาที"; returns pending-inspection default "2 วัน".
- Claims: `[เฉพาะ 3PL]` moved from per-row pills to section heading; rows "แจ้งเคลมกับคลังภายใน 15 วัน" and "ตอบเคลมภายใน 7 วัน" removed from this variant; "เป้าความผิดพลาดของคลัง" reordered. Otherwise identical.

**Roles implied (rules):** หัวหน้า (supervisor decides fees), approvers via company › approvals, special-permission holders (ad-hoc move, day close), owner (confirm close, decide returns, approve VAS).
**Devices:** PDA (camera, prompts), station cameras, scales, zone printers, conveyor (รางลำเลียง), carts/totes, tablets (signature), production line video.
**Core vs Phase-2 [INFERRED]:** core = inbound/pick/pack/inventory/handover/returns/cancel rules; add-ons = auto pick lists, pre-pack prep, VAS, temperature; 3PL-only = claims, billing review, cancel fees, OT, lot-expiry notices, compensation — likely core for a 3PL-first product but deferrable for WMS mode.

## F.3 Carriers (ขนส่ง)

| File | Purpose |
|---|---|
| settings-carriers.html | Carrier list (12) by source channel, unmapped carrier names, pickup rounds per warehouse, tracking/receipt rules |

Tabs: ขนส่ง · รอบรับพัสดุ · เลขพัสดุและการรับ.

**Carriers named:** Flash Express, Kerry Express, J&T Express, SPX Express, Lazada Logistics, ไปรษณีย์ไทย, ส่งทันที (Instant) ผ่านแพลตฟอร์ม, ส่งด่วนภายในวัน (Same Day) ผ่านแพลตฟอร์ม, Lalamove, รถร่วม ป.เจริญขนส่ง (custom subcontract, เหมาเที่ยว), คลังจัดส่ง (own fleet, system standard, cannot delete, can disable), ลูกค้าเข้ารับเอง (customer pickup, system standard). Unmapped examples: "Flash Express (Bulky)", "BEST-EXP".
**Type pills:** `ขนส่งพัสดุ` (parcel), `ส่งด่วน` (express/on-demand), `รถร่วม` (subcontract truck), `รถของคลัง` (own fleet), `ลูกค้าเข้ารับเอง`.
**Fields:** source channels (Shopee / TikTok Shop / Lazada / นอกแพลตฟอร์ม), account used (owner's shop vs warehouse account e.g. FF-FLASH-0001), label source (Shopee API / TikTok Shop API / Lazada API / Logistics Gateway API / PDF from carrier / warehouse form), pickup (N rounds/day, rider on demand, per trip, by appointment), drop-off policy per channel ("ขนส่งเข้ารับได้" / "ต้องนำไปส่งเอง") — defaults from Zimple, warehouse editable; aliases "ชื่อจากต้นทาง N ชื่อ"; tracking format (e.g. "FL / TH + 10–12 หลัก").
**Pickup rounds:** per carrier: round times, pack cutoff (e.g. Flash 11:00·16:00 / cutoff 10:30·15:30), days, handover mode, outbound door, effective date. Handover modes: `ภาชนะตามรอบ` (containers per round at door), `ทีละคำสั่งซื้อ` (rider per order at RIDER slot), `ตามขนาดงาน` (small at front PICKUP, large → OUT-D3; large = >5 boxes or pallet or pickup truck+), `ตามเที่ยวรถ`. Own fleet: order cutoff 12:00, before cutoff dispatch by 18:00, after → 12:00 next business day; cost split across owners "เฉลี่ยตามกล่อง". Instant: call rider after pack, pack within 30 min. Same Day: pack 60 min before truck.
**Statuses:** unmapped name `ส่งคำขอแล้ว · 10:20`, `รอส่งคำขอ`, `พักคำสั่งซื้อไว้ 4` (orders on hold).
**Rules:** platform orders always use platform carrier; off-platform: owner picks carrier via OMS rules from warehouse-enabled list with estimated price (owner shipping rate); unspecified → warehouse default carrier (J&T); warehouse orders use warehouse carrier account through Logistics Gateway, tracking & label requested on order entry. All carrier names normalised to Zimple **Carrier Master**; "ระบบไม่เดาชื่อขนส่ง" — unmapped names hold orders + alert; warehouse requests Zimple mapping; orders auto-requeue. New carrier needs a pickup round before jobs can ship. Round edits have effective date & history; campaign days add rounds via calendar; owner-specific rounds per contract. Manifest split by account when carrier requires.
**Tracking & receipt rules (`[กฎรวมคลัง]`):** carrier lock on return receipt "ไม่รับ (เลือก: เตือนอย่างเดียว)"; unknown tracking format → supervisor confirm; vehicle data before receipt → photo of plate.
**Devices:** label printers 100×150, riders, OUT doors. **3PL:** owner shop accounts vs warehouse accounts; per-owner carrier enablement. **Core:** carrier list, rounds, Carrier Master mapping; Lalamove/own-fleet trips tie to "จัดการรถขนส่ง" add-on.

## F.4 Connections (การเชื่อมต่อ) — marketplace / channel integrations

| File | Purpose |
|---|---|
| settings-connections.html | Order intake channels, API keys & webhooks, partner OMS connectors, HR / time clock integration |

**Platforms/systems named:** Zimple OMS (org code ZO-10482), partner OMS **JST** (JST Open API, 6 owners), **Zort** (1 owner), **Page365** (off), **BigSeller**; marketplaces **Shopee, Lazada, TikTok Shop** (via OMS); off-platform channels LINE / LINE OA, website, storefront; **Logistics Gateway** (carrier accounts); **Lalamove**; accounting **PEAK** (documents page), Zimple Accounting; HR / time clocks (fingerprint/face scanner Excel/CSV); owner portal portal.fullfeel.co; Zimple PickPack and POS explicitly out of scope.
**Intake channels:** Zimple OMS (by org code; orders in; status & ATS back) — for owners without own system; Partner OMS (Zimple-built connectors, OAuth-like "อนุญาต", no password); API (orders + ASN in; webhook status back; API docs · Sandbox); Owner portal (ระบบสำหรับเจ้าของสินค้า) `[เฉพาะ 3PL]` — only for tasks partner OMS/API can't do, uses warehouse brand.
**Capability matrix (Zimple OMS / Partner OMS Zort·JST / API):** send all order types incl. cancel/edit, platform, off-platform, B2B, manual · ASN · SKUs & kits · status/tracking/stock back (API via webhook) — all ✓; approve VAS, return decisions & claims, warehouse bills & invoices, owner-set rules & notifications, API keys → done in owner portal when channel lacks it (pill `ระบบสำหรับเจ้าของสินค้า`). Zimple maintains this matrix.
**Rules:** no email files / warehouse-side import; all channels become same warehouse work order; de-dupe by source reference; channel chosen by owner's system, not contract length. Zimple OMS fee `[เฉพาะ 3PL]`: who pays (included in warehouse fee / billed to owner via SV rate item "ค่าใช้ระบบ Zimple OMS" / owner buys from Zimple), post-contract read access 30/60/90 days. Partner connectors built only by Zimple; warehouse can't add; else use API/portal.
**API keys:** list (key name, owner, masked key ●●●●3f9a, created by, last used, suspend); pill `ทดสอบ` (sandbox), `[Zimple WMS]` company-level keys. 3PL: owners create/rotate/revoke keys in portal (shown once); warehouse sees masked, can suspend only; customer-care staff can create "ในนามเจ้าของสินค้า" with audit. Webhooks auto-retry; persistent failure alerts admin.
**HR / time clock** `[โมดูลเสริม · วางแผนงานและกำลังคน]`: currently not connected — headcount from station check-in scans. Options: HR API (poll 15 min or push), Excel/CSV from fingerprint/face scanners daily, or WMS zone scanners as clock. In: clock in/out, leave/absent/late, shift roster, agency temps. Out: actual hours per dept/team/owner (labour cost per owner for 3PL), temp-card hours, OT from owner work. Reconcile: clocked-in but no station scan > 30 min → alert; station scan without clock → alert; clocked-out still in station → auto-close. Excludes salary / national ID (PDPA).
**Core vs Phase-2 [INFERRED]:** Zimple OMS + API core; partner OMS connectors incremental; HR integration add-on.

## F.5 Devices & stations (อุปกรณ์และสถานี)

| File | Purpose |
|---|---|
| settings-devices-stations.html | 7-step device setup: numbering, IT devices, pack/prep tables, work points, equipment & containers, video & photo retention, video library; paper-size registry |

**Work points (จุดงาน · 12):** IN-D1 ประตูรับ 1, PICK-A/B/C (zone pick, PDAs), PREP-01, LINE-01 (production line, PS-07+PS-08), PS-01…04, PS-05…10, OUT-D1, QC-01 (return inspection), VAS-01, OTH-01 ซ่อมบำรุง. Fields: QR, department, zone, bound tables/devices, camera recommended, default duty. Pills: `ควรมีกล้อง · มี ✓`, `ควรมีกล้อง · ยังไม่ครบ`.
**Rule "จำกัดงานตามจุดงาน" `[เปิด]` (กฎรวมคลัง):** devices/cards in a work point only open that department's work even if user has multi-dept rights; unbound devices (supervisor PDA) follow user rights; department inferred from table / zone PDA / scanned QR / login choice; "บทบาทนี้เข้าแผนกแพ็คไม่ได้"; helping another dept needs no temp role.
**Departments (7, fixed, can disable, not rename):** รับเข้า, หยิบ, เตรียมงาน (module), แพ็ค, ส่งมอบ, ตีกลับ, งานเพิ่มเติม [INFERRED from listing], plus duties (หน้าที่) e.g. ยกของ, ช่วยนับ, ติดป้าย, เปิดกล่อง, ใส่ของลงกล่อง, จัดตะกร้า, สแกนตรวจ, แพ็คในไลน์, บับเบิ้ล, ปิดกล่อง, ติดเทป, ยกขึ้นรถ — selectable at station check-in.
**Tables (โต๊ะ · 19):** pack 12 · prep 2 · inbound 1 · handover 1 · inspection 2 · cancel-unbox 1. Capability pills `แพ็คปกติ`, `ไลน์ผลิต`, `เตรียมงาน`, `รับเข้า`, `ส่งมอบ`, `ตรวจสภาพตีกลับ`, `เปิดกล่องยกเลิก`; mode today (e.g. PREP-02 borrowed for packing until 17:00); device test status `ผ่าน`, `ต้องแก้`, `กล้องไม่ชัด`, `ยังไม่ทดสอบ`, `ยังไม่ผูกเครื่อง`. Normal packing = by order / by pick list / multi-box; prep table can pack if devices meet pack rules (label printer always; camera & scale per optional pack steps).
**Numbering (prefix + running no., per warehouse):** PC, SCN, PRN, SCL, camera named by table (PS-01-2), PDA, TV; tables PS, PREP, IN, OUT, QC, UNB, LINE; doors IN-D/OUT-D; containers PL (pallet), TT (tote), BG (handover bag), CG (cage), FC (flat cart), C20/C30/C40 (slotted carts), DMG-T (damaged tote), PW (put wall). Rules: 2–4 letters, unique vs documents/devices, only affects new registrations, digits can increase not decrease, no date/warehouse in code, admin-only with history.
**Equipment & containers (633):** type, first code, count, stages used, capacity (e.g. pallet 120×100 cm 800 kg; PW 144 slots; tote 40×30×25 15 kg; bag 30–50 parcels; cage 150 parcels). 1 item = 1 permanent QR; system binds/unbinds contents by workflow; DMG-T contents count as in damaged location.
**IT devices (127):** PCs (Windows, bound to table by 6-digit code), USB scanners (product, order QR sheet, line label, returns, inbound cartons, handover containers, badge check-in), PDAs (Android, battery, user, bound to work point), printers (label 100×150, receipt 80 mm, A4, carton QR sticker, put-back slip, zone task printers, network), scales (box ≤30 kg, container ≤300 kg), cameras (1080p pack/QC/unbox, 720p doors), TVs (TV mode with alert bar: pack zone, loading dock, inbound). Statuses: `ออนไลน์`, `ออฟไลน์`, `ออฟไลน์ 12 นาที`, `พร้อม`, `กระดาษหมด`, `ต้องแก้`, `ยังไม่ทดสอบ`; actions ทดสอบ, ทดสอบพิมพ์, ทดสอบภาพ, preview TV screen. USB devices follow PC location; network devices bound to table or work point; PC checks attached devices on boot and flags missing.
**Paper-size registry (7):** 100×150 label roll, 80 mm thermal, A4, 60×40 carton QR (`2 ม้วน · ใกล้หมด`), 40×30 product barcode, 50×25 (BeautyNara, HealthyMe), 32×19 (owner-supplied, Kids Joy). Fields: owners using, roll owner (warehouse/owner), stock, loaded in printers. Print dialog prompts roll change; queue grouped by size; warehouse rolls billed as sticker fee [truncated].
**Video storage:** primary NAS `\\VID-BKN-01\video` (6.2/8 TB, alert 90%), auto folders job › date › table/camera; delete/move only via system. Cloud copy (fullfeel-video) uploaded on demand when owner clicks "ดูวิดีโอ" in Portal, warehouse sends temp link, or claim-bound (immediate); only the job segment. Retention `[ตั้งรายเจ้าของสินค้าได้]`: primary 60 d / cloud on view · 30 d; cancel-unbox; claim clips until case closed; ID-card photos (self-pickup) 90 d then auto-delete. External link expiry 7 d (company); claim-clip after close 0 d default (warehouse); pre-delete warning 3 d; storage alert 90%.
**Video library (18,240 clips):** filters job type/owner/date/table/status; statuses `ปกติ`, `ล็อก` ("ไม่ลบจนปลดล็อก"), `ผูกเคลม`, `ใกล้ลบ`, `รอลบ` (7-day soft delete, restorable), `มีสำเนาบน cloud`. Manual delete admin-only with reason; bulk delete needs second admin; every view/lock/delete logged.
**3PL:** per-owner retention, owner-supplied label rolls, owner video portal. **Core:** device registry, tables, work points, containers, label printing, scales; **video NAS/cloud** strong differentiator, likely core for pack-video evidence; TV mode / production line [INFERRED Phase-2].

## F.6 Documents & template designer (เอกสาร)

| File | Purpose |
|---|---|
| settings-documents.html | Document templates (23) and document numbering (33 series); where billing documents are issued |
| settings-documents-template-designer-sample.html | WYSIWYG designer sample for "ใบเสร็จ / ใบกำกับภาษีใส่กล่อง" with versions & owner-submitted template approval |

**Templates (23) by group:** Product & labels 5 (product barcode 40×30 v3, QR+lot+expiry 50×25, barcode+price (price from OMS label request, not stored), shelf label 100×50, inbound carton tag CT 80 mm); Inbound 1 (receipt A4); Inventory 3 (move task, count sheet, put-back slip); Pick & pack 5 (pick list, pack job, material prep sheet, in-box receipt/tax invoice, wave label); Handover 4 (non-API carrier label 100×150, sequence stamp on label "เลขใบหยิบ · ลำดับ / ทั้งหมด", container/round label, Manifest); Returns 1 (RP); Billing 3 `[เฉพาะ 3PL]` (billing summary, rate sheet annex, quotation); Owner-submitted `[เฉพาะ 3PL]` (BeautyNara label `[รออนุมัติ]`). Fields: default paper, printer (by zone / table / sort point / handover point), per-owner variant, version.
**Designer:** template selector (system default — not editable; warehouse v3; draft; owner v2 awaiting approval), copy as new, name, applies to (owner · channel), paper size (from registry), orientation, margins, default printer, font (Sarabun/IBM Plex Sans Thai/Noto Sans Thai), size, B/I/U; 39 data fields (header, order, barcode/QR Code 128, items & totals, footer), free text with variables `{ร้าน} {SO} {วันที่} {ช่องทาง} {ชื่อผู้รับ} {อ้างอิงภายนอก}`, conditional display (all orders / specific channels / date range), images; item table columns, zebra rows, overflow (new page repeat header / shrink). Versions (v1 default, v2, v3 in use; revert). Actions: test print, save draft, use template, approve / return owner submission. Who edits: owner-visible docs (in-box receipt, insert text, product label) — owner copies & edits in OMS/portal, warehouse approves; warehouse-work docs (pick list, task, container label, manifest) — warehouse only; platform labels fixed.
**Document numbers (33):** format PREFIX-YYMMDD-seq, running across all warehouses. Series: PO, RQ (client request), WP (workforce plan, module), AS (ASN), TM (temporary receipt), CT (carton tag), CC (cycle count), MV (move/replenish), KB (cancel-restock), VA (VAS, module; designer sample shows EX), TF (transfer), CV (conversion/kit), OB (opening balance), WV (wave), PK (pick list), IV (invoice/tax invoice), RE (receipt), owner-name docs DO/RE/ABB `[เฉพาะ 3PL]` (set in OMS), MF (manifest), MP (missing parcel), TJ/TR/TB (transport job/trip/truck block, module), RT (return), RP (return problem report), CL (claim, 3PL), EV (billing event), AJ (billing adjustment), BC (billing cycle), RS/SV/PM/SH (rate sheet/service/packaging/shipping rate, 3PL). SO and owner PO are OMS-issued, read-only. Child numbers PK-…-1, -2 and order boxes SO-…-1. Rules: prefix 2–4 letters unique; affect new only; digits increase only; warns when digits insufficient for daily peak; admin only + history.
**Billing docs `[เฉพาะ 3PL]`:** IV issued on BC send (VAT), RE on payment; issued at Zimple (default) or external accounting **PEAK** (connected) — one issuer per doc type.
**Core:** numbering, core templates; designer & owner-submitted templates [INFERRED Phase-2-ish but shown in detail].

## F.7 Owner settings (ตั้งค่าเจ้าของสินค้า · 3PL only)

| File | Purpose |
|---|---|
| settings-owners.html | Defaults for new owners, warehouse vs owner-custom values overview, per-owner config (warehouses, connection, carriers, off-platform SLA, rules) |

**Tabs:** ค่าเริ่มต้นเจ้าของสินค้าใหม่ · ค่าคลังและที่เจ้าของสินค้าตั้งเอง · รายเจ้าของสินค้า.
**New-owner defaults:** warehouses used `[บริษัท]`; SKU code (use owner's code / convert); work rules = warehouse rules `[คลัง]`; VAS needing owner approval; rate table (ตารางมาตรฐาน 2026); video retention 60 d (owner may request longer); first portal user invite auto-sent. Only applies at creation.
**Override principle:** each overridable rule: "ใช้ค่าคลัง" (follows warehouse) or "ตั้งเอง" (frozen); revert anytime; changing warehouse value asks whether custom owners follow; every change has effective date & history; counts "ตั้งเอง N ราย". Overridable rule list (with warehouse defaults): receiving count, lot/date capture, carton QR (billable option), mixed carton, unannounced arrival, acceptance criteria, dock-to-stock, over-receipt, over-receipt aging (`[กฎรวมคลัง]`, owner view-only), count cycle, owner can specify lot in order, auto-reserve, min ship shelf life, multi-barcode, high-value, auto pick list, insert scanning, box source, inner material, video retention, weighing, return photos, off-platform cutoff (16:00 · 1 business day), self-pickup/own-fleet rounds, cancel after pick, return decision owner, owner decision deadline, claim SLA, claim filing window, **add-on services: ประกันสินค้า (insurance), AI Assistance**.
**Per-owner list (8 shown, "15 ราย" header):** warehouses (primary/backup), connection (Zimple OMS / API · portal / OMS partner Zort / portal), carriers enabled, custom rules count; statuses `ใช้งาน`, "เจ้าของสินค้าใหม่", "เลิกใช้ 30/06". Owners named: BeautyNara, HealthyMe, Siam Herb, Pet Lover, NatureBox, GreenLeaf, Organic Tea, Kids Joy.
**Per-owner detail (BeautyNara):** contract (annual BN-2026 to 31/12/2026, account manager), billing cycle (2×/month 1–15·16–end, or monthly); multi-warehouse reason, separate bill per warehouse, transfer fee chargeable. 1 Warehouses: primary/backup, include in ATS, OMS warehouse code mapping (BKN-01, SMI-02), ATS sent combined or per warehouse; owner doesn't see backup as separate. 2 Connection: options "ต้องเชื่อมแพลตฟอร์ม · Zimple OMS" / "มี OMS พันธมิตรอยู่แล้ว" / "มีระบบของตัวเอง · API" / "ไม่มีระบบ · ใช้ Zimple OMS (คีย์เอง / อัปโหลดตาราง)"; status `ปกติ`; per-task "ทำที่" override (channel vs portal). 3 Carriers: enabled carriers, API account (warehouse), rate (SH-2026-01, own fleet "300 + 15 / กม."), allowed shops (LINE OA, portal); own fleet & pickup only for agreed owners. 4 Off-platform SLA: per shop/channel start-from, cutoff, deliver-within, contract reference (e.g. "สัญญา BN-2026 · ข้อ 4.2"); platform orders (Shopee/Lazada/TikTok Shop) use system SLA, not overridable. 5 Rules: badges `ตั้งเอง`, `ใช้ค่าคลัง`, `ดูอย่างเดียว`; edit with reason/CR reference & effective date.
**Core:** yes for 3PL (multi-owner is central). Insurance / AI Assistance [INFERRED Phase-2].

## F.8 Users, permissions & roles (ผู้ใช้และสิทธิ์)

| File | Purpose |
|---|---|
| settings-users-permissions.html | Users (42), reusable day-labour cards, roles (11), Zimple support access requests, approvals matrix (47), notifications matrix (77) |
| settings-role-edit.html | Edit one role: per-function/per-page permission matrix + special permissions |

**Users:** name, email or employee ID, roles (multiple, temporary role with expiry e.g. "พนักงานหยิบ · ถึง 20/10"), warehouse scope (บางเขน / สายไหม / ทุกคลัง), login methods (QR employee card · username+password, optional OTP 2FA), status `พักใช้` (suspended). Floor staff use QR badge on PDA & pack table; owners manage their own users in portal.
**Day-labour cards (บัตรรายวัน, reusable, 100):** status `ใช้อยู่`, `ค้างคืน` (not returned), ว่าง, หาย; register by name/phone/agency (บ.แรงงานดี, บ.สยามแมนพาวเวอร์, จ้างเอง); choose shift & allowed functions (หยิบ · แพ็ค · ตรวจสภาพ · รับเข้า · ส่งมอบ); optional PIN 4 digits; phone retention 90 d (30/180); phone visible only with special permission; card auto-returned at shift end.
**Roles (11):** พนักงานรับเข้า, หัวหน้ารับเข้า, พนักงานหยิบ, หัวหน้าหยิบ, พนักงานแพ็ค, หัวหน้าแพ็ค, พนักงานตรวจสอบคุณภาพ, ผู้จัดการคลัง, ฝ่ายดูแลเจ้าของสินค้า `[เฉพาะ 3PL]`, บัญชี, ผู้ดูแลระบบ (`ครบทุกสิทธิ์ · ล็อก`). Default roles badged `ตั้งต้น`; editable/copyable/deletable. Role fields: zone/work-point scope, data scope (เฉพาะโซนของบทบาท / ทั้งคลังที่ได้รับ). Approvals/notifications also reference **หัวหน้าคลัง**, **หัวหน้าส่งมอบ**, "ผู้อนุมัติของคลัง" — not in role list [INFERRED: custom roles or naming inconsistency].
**Permission matrix (role edit):** actions = ดู · ทำงาน · ใช้บน PDA · สร้าง/แก้ไข · ยกเลิก/ลบ · อนุมัติ · พิมพ์ · Excel. Function groups (pages): ภาพรวมคลัง (1), คำสั่งซื้อ (3), เจ้าของสินค้า (5), รับสินค้าเข้า (6), สินค้าคงคลัง (11, incl. temperature log), หยิบสินค้า (6), แพ็คสินค้า (6), ส่งมอบขนส่ง (5), สินค้าตีกลับ (5), จัดการรถขนส่ง (4), จัดการเคลม (4), ค่าบริการ (4), รายงาน (3), ตั้งค่า & ข้อมูลหลัก (26 pages, per-page/topic), วางแผนงาน (4, add-on: station check-in, speed test, QC sampling). Dependencies auto-ticked (orders·view + inventory·view needed for picking). Segregation-of-duties hint: count + approve adjustment in same role flagged, not enforced, but no self-approval of money matters. Saved changes apply at next login; history logged.
**Special permissions (สิทธิ์พิเศษ):** view order prices/discounts; view owner product cost; view warehouse cost `[เฉพาะ 3PL]`; act on behalf of owner; view video & photos; share video externally; cancel order after work started; day close; ad-hoc move; supervisor override when scan fails; grant temporary role (≤ own rights, expiry); view recipient PII (else masked).
**Zimple support access (คำขอเข้าช่วยจากทีม Zimple):** ticket SUP-…, requester, reason, scope (e.g. warehouse rules editable, rest read-only), time window, statuses `รออนุมัติ`, `หมดเวลา`, `ยกเลิก`; active immediately within scope except critical changes (stock, roles, pricing, doc numbering, connections/API keys, disabling owner/SKU) needing customer-admin approval; banner "ทีม Zimple กำลังช่วยตั้งค่า"; all actions logged.
**Approvals (47, by stage):** columns approver step-1 role · step-2 condition · escalate-after. Inventory 8 (stock adjustment — หัวหน้าคลัง → ผู้จัดการคลัง when > 5 pcs or 2% or 2,000 THB, escalate 1 day; reversal `ทุกครั้ง · ระบบล็อก`; opening balance; release stale reservations; transfer shortage; release held lot; material issue over limit; dispose goods with owner confirmation), Inbound 6 (rush inbound, early PO close, short-shelf-life receipt, extra carton QR, extra barcode, skip weigh/measure), Orders 5 (edit after pick, cancel after pick, open sell-by-case carton (owner then warehouse), suspend service `[เฉพาะ 3PL]`, warehouse-created billable VAS), Pick 2 (conflicting pick rule, push to front), Prep & pack 6 (reprint label, multi-box, incomplete owner packaging, reopen packed box, edit after close, cancel issued tax doc), Handover 6 (handover without proof, reverse handover, owner pickup short, drop-off billing, reopen container, day close), Claims 2 (decide claim — admin if over per-piece cap; split cost), Billing 8 (AJ, new rate version, bind rate to owner, change billing method, edit item price, manual charge, send billing summary — optional/off, send compensation), Settings 4 (disable warehouse with zero stock, owner-submitted template, bulk video delete — second admin, Zimple support critical change — customer admin). Badge `เรื่องเงิน` = no self-approval; non-money matters = approve-by-doing (logged); escalation to step-2 then admin.
**Notifications (77, by stage):** channels ในระบบ · LINE · อีเมล; recipients (role / involved people / owner / selected users). Badges `ปิดไม่ได้` (e.g. near cutoff not handed over, no orders for N min, label fetch failed, WMS≠OMS stock, temperature out of range, video storage > 90%), `เฉพาะ 3PL`, add-on badges. Users can mute LINE/email but not in-app.
**3PL indicators:** ฝ่ายดูแลเจ้าของสินค้า role, act-on-behalf, owner-confirm approvals, owner notifications. **Core:** RBAC with page×action matrix, approvals engine, notifications matrix; day-labour cards tie to workforce add-on partially.

## F.9 Time tracking (เวลาและการติดตามงาน)

| File | Purpose |
|---|---|
| settings-time-tracking.html | Warehouse calendar, shift sets, SLA by channel, campaign extensions, queue ordering, stuck-time alerts, standard speeds, workforce calc |

- **Calendar:** weekly working day (Mon–Sat 08:00–20:00), holidays (e.g. 23/10 ปิยมหาราช, reduced Flash·Kerry round), recurring "วันงานเยอะ" (25th payday), recurring double-date campaigns 1.1–12.12 (06:00–24:00, extra 21:00 round), specific 11.11 (06:00–03:00), 12.12. Campaign days drive extra shifts, rounds, workforce plan.
- **Shift sets (3: normal / busy / campaign):** per department shifts with times & breaks, applies to ทุกคน / พนักงานประจำ / พนักงานรายวัน (pills); e.g. กะเช้า 08:00–17:00, กะบ่าย 13:00–22:00, กะดึก 22:00–03:00, staggered breaks "2 รอบ 11:30 / 12:30".
- **SLA by shop type:** Shopee (start = payment time; COD = order time; cutoff 14:30; 1 business day), Lazada (14:00, 1 bd), TikTok Shop (15:00, 2 bd) — `[ทุกเจ้าของสินค้า]`, platform date stored for comparison & mismatch alert; off-platform LINE/website/storefront & API/portal — default 16:00 · 1 bd `[ตามข้อตกลง]` per owner. Cutoff must leave pick-pack time before carrier round (system warns).
- **Campaign SLA extensions** `[ตามประกาศแพลตฟอร์ม]`: 11.11 (Shopee pay 10–12/11 → 3 bd), Black Friday (warns calendar lacks campaign day), 12.12 `[ร่าง]` awaiting platform.
- **Queue ordering (system, owner can't see/change):** 1 urgent (Instant · Express · approved rush · due) → 2 nearest due date (overdue → today → tomorrow → other) → 3 earliest carrier cutoff → 4 FIFO by start time. Staff don't choose tasks; supervisors expedite via rush request.
- **Stuck-time alerts `[กฎรวมคลัง]`:** unclaimed pick list 15 min; unprinted 10 min; awaiting sort 20 min; awaiting prep; overrun = expected × 1.5; items on device not packed 120 min; awaiting carrier data 30 min or 60 min before cutoff, owner notified 2 h.
- **Standard speed per method (per person/hour) vs 30-day actual vs last test:** inbound count 300 pcs, putaway 25 loc; pick by order 120, single-item orders, single-SKU bulk 400, batch same-pattern 350, multi-order with sort 220, consolidated 260; prep by slot 150, batch 400, multi-box 12, box forming 60; pack by order 40, by pick list 55 (`กำลังทดสอบ 2/4 คน`), production line 90, multi-box 8; handover sort 150 boxes, load containers 40; returns QC 60; count 40 loc; replenish 30 loc; VAS sticker, kitting/gift 60 sets.
- **Workforce calc:** efficiency 85%; new staff 70% for 2 weeks; under-staff alert > 5% shortage 2 days ahead; pack buffer before pickup 30 min. Daily plan itself lives in "วางแผนงาน" menu (add-on).
- **Roles:** supervisors, planners. **Core:** calendar, cutoffs/SLA, queue, stuck alerts; workforce planning = add-on.

## F.10 Systems / subscription (ระบบที่ใช้)

| File | Purpose |
|---|---|
| settings-systems.html | Read-only plan & add-on status; request package change from Zimple |

- Plan "Zimple Fulfillment · คลังรับทำงานให้เจ้าของสินค้าหลายราย"; seat caps: users 42/50 (excludes owner users & Zimple team), day cards concurrent 18/30; at cap invite/issue buttons show "ครบจำนวนตามแพ็กเกจ · ติดต่อเพิ่มจำนวน".
- **Add-ons (7):** วางแผนงานและกำลังคน (workforce planning; station badge scan; HR link) `[เปิดอยู่ · คลังบางเขน · คลังสายไหม]`; เตรียมงานและวัสดุแพ็ค (pre-pack prep, material reservation, box forming) `[เปิดอยู่ · คลังบางเขน]`; ใบหยิบอัตโนมัติ (auto pick lists per owner × carrier type; off = manual or suggested); จัดการรถขนส่ง (truck booking, trips, drivers, POD, cost per trip; off = manual vehicle record on docs); งานเพิ่มเติม (VAS); คลังควบคุมอุณหภูมิ `[ยังไม่เปิด · คลังสายไหม]`; พื้นฐานที่มีในทุกแพ็กเกจ `[รวมอยู่แล้ว]` (who's working, staff performance, standard speeds, cutoff warnings, packaging as stock items, doors & staging toggle, manual vehicle record).
- Add-ons enabled **per warehouse**. Change requests logged.
**Judgement:** defines the core/add-on split explicitly — useful for phase planning.

## F.11 Admin tools & audit log (เครื่องมือผู้ดูแลระบบ)

| File | Purpose |
|---|---|
| settings-admin-tools.html | Rare admin tools + immutable activity log |

- Tools (admin-only, logged, "ไม่มีปุ่มปรับยอดเอง" — no manual stock adjust button): **นำเข้ายอดเริ่มต้น** (opening balance from Excel into locations & lots; always approved; `รออนุมัติ` OB-261111-001); **ปลดยอดจองค้าง** (release stale reservations, doesn't touch on-hand; approved); **ส่งยอดให้ OMS ใหม่** (push WMS stock over OMS; no approval; logged); **รายงานตรวจยอดประจำวัน** (daily 06:00: balance vs sum of SL lines, WMS vs OMS); **ข้อมูลที่ส่งไม่สำเร็จ** (failed sends to OMS / accounting / carriers after auto-retries). Breakage → move to damaged location, not adjustment; AJ = billing adjustment only.
- **Activity log:** who/what/when/where; filters actor (users, ระบบอัตโนมัติ, OMS (API), ทีม Zimple), menu, action (login/out, create, edit, cancel, approve/reject, adjust/reverse, rule change, users & permissions, print/reprint, Excel export); columns time · actor · where (PC/PDA/table) · action · old → new · reason. Immutable; retention per package (this tenant 1 year); Excel export. Failed logins logged (`ไม่สำเร็จ`).
**Core:** audit log & opening balance are core; others core-ish for OMS sync integrity.

## F.12 Company brand (ข้อมูลบริษัทและโลโก้) & theme tool

| File | Purpose |
|---|---|
| settings-company-brand.html | Company legal info, system defaults, theme, logos, fonts, document header, owner-portal branding |
| theme-tool.html | Internal design utility: theme/colour tweaker with viewport presets & side-by-side compare (skimmed; not a product feature [INFERRED]) |

- Company: TH/EN name, tax ID, head office/branch no., registered address, phone, email, primary contact; used on all document headers, billing summaries, owner invites; changes affect new docs only.
- System defaults: language (TH/EN; per-user override), timezone Asia/Bangkok (stored UTC), currency THB, date format ค.ศ./พ.ศ., units kg·cm.
- Theme: system theme (not editable) + up to 5 company themes; status colours fixed (green normal/done, yellow wait/warn, red urgent/abnormal, grey closed); contrast check blocks unreadable themes. Applies to web, PDA, station screens.
- Logos: full horizontal (PNG/SVG ≥600 px), square icon 512×512 (PDA, tab), document logo; display name, tagline; "by Zimple Solution" always shown.
- Fonts: IBM Plex Sans Thai (default), Noto Sans Thai, Sarabun, Prompt, Kanit; size normal/large; PDA auto-large.
- Document header: logo+name+address / logo only / name only; table header colour brand or B/W.
- Owner portal branding `[3PL]`: owners see warehouse brand (default) or Zimple brand; custom domain portal.fullfeel.co (white-label).
- theme-tool: name theme, viewport presets (1280×800, 1366×768, 1440×900, 1920×1080, mobile 390×844), hold-to-see-original, compare 2 themes.
**Core:** company info & defaults; white-label portal domain [INFERRED Phase-2].

## F.13 Cross-cutting observations
- Strong **3PL-first** design with a "Zimple WMS" (single-company) mode that hides owner/billing features — both modes must be supported by one codebase [INFERRED].
- Every setting carries a **level** and **effective date + history**; owner overrides are contract-referenced.
- Approvals and notifications are central, data-driven engines (47 approval types, 77 notification types) referenced from almost every rule.
- Evidence (photos/video/signature) is pervasive: cameras per table/door, video NAS + cloud, claim-locked clips.
- Explicit Phase-2 marker only on the floor-plan layout; add-on modules (7) define a natural phasing boundary.


---

