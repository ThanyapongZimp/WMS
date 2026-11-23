---
name: Zimple WMS / Zimple Fulfillment
status: final
created: 2026-11-19
updated: 2026-11-23
change-note: "2026-11-23 — G1 review for pilot wave 1: web sign-in states (FR-20) and warehouse-setup states (FR-8, FR-10, FR-125) added to match the PRD."
design: ./DESIGN.md
sources:
  - ../../prds/prd-WMS-2026-11-19/prd.md
  - ../../prds/prd-WMS-2026-11-19/addendum.md
  - ../../prds/prd-WMS-2026-11-19/fr-candidates-inbound-stock-setup.md
  - ../../prds/prd-WMS-2026-11-19/fr-candidates-outbound.md
  - ../../briefs/brief-WMS-2026-11-19/brief.md
  - ../../research/competitive-jst-erp-2026-11-19/research.md
  - ./.working/extract-product.md
  - ./.working/extract-zimple-screens.md
  - ./reconcile-zimple-screens.md
  - ./.memlog.md
---

# Zimple WMS — Experience Spine

> **Spines win on conflict with any mock.** This file and [DESIGN.md](DESIGN.md) are canonical. The HTML mocks illustrate them.
>
> **Visual references.** Mocked: [office overview](mockups/key-office-overview.html) (ภาพรวมคลัง), [PDA pick](mockups/key-pda-pick.html) (UJ-2), [pack station, cancelled-lock](mockups/key-station-pack.html) (UJ-3), [handover + day close](mockups/key-handover-day-close.html) (UJ-4). Spine-only: every other surface, including receiving (UJ-1), returns (UJ-5), setup and cutover (UJ-6), module hubs, lists, detail pages, settings, PDA login and home.

## Foundation

- **Product.** Zimple is a multi-tenant B2B SaaS WMS for Thai e-commerce warehouses. The Business edition is "Zimple WMS" and the 3PL edition is "Zimple Fulfillment". Both run on one codebase, and editions and add-ons are visibility rules (see Multi-tenant & Editions). Phase 1 scope, FRs and glossary come from the PRD, and this spine uses the PRD glossary terms exactly.
- **Multi-surface.** Four Phase 1 surfaces share one design system (NFR-12):
  1. **Office web**: Windows PCs, Chrome/Edge, 1366×768 minimum.
  2. **Stations**: full-screen desktop web bound to scanner, printer, scale and camera. Covers receive, pack PS-NN, returns and handover.
  3. **PDA**: rugged Android handheld with a built-in scanner (NFR-10 [ASSUMPTION]). Scan-first, with an offline queue and badge-QR login.
  4. **Tablet**: signature capture at handover and receiving.

  Client Portal is Phase 2. Wall TV and the driver app are Later.
- **Web fallback is a hard rule.** A warehouse with no PDAs can run every flow on web (FR-122, NFR-10). Every PDA task therefore has a web equivalent that takes a USB/HID scanner.
- **UI system.** shadcn/ui (Radix + Tailwind) on every surface, PDA included [ASSUMPTION: the PDA is a web/PWA build; native vs PWA is open, see Open Questions]. `DESIGN.md` is the visual identity reference. This spine specifies only the behavioural delta over shadcn/Radix defaults. Where this spine is silent, Radix behaviour (focus management, Esc, ARIA) is the contract.
- **Language.** Thai first, with English via a per-user switch (NFR-8). Light theme only in Phase 1.
- **Design posture.** For the floor: "scan, get a clear yes or no, move on" (PRD §2.1). For the office: "where is this order?" is answered in under 1 minute (NFR-12), and a blocked item is ≤2 clicks from the overview [ASSUMPTION, from reconcile-brief G2].

## Information Architecture

### Office web: navigation tree (Phase 1, as rendered)

The baseline is the prototype's `overview.html`. Items that are Phase 2 or Later are **not rendered** (not greyed out).

```
[Tenant logo]  · Warehouse switcher (คลังบางเขน ▾)          Header: ค้นหา (Ctrl+K) · อนุมัติ [n] · แจ้งเตือน [n] · ผู้ใช้ ▾
ภาพรวมคลัง                      overview hub (FR-109)
คำสั่งซื้อ [n]                   ภาพรวมคำสั่งซื้อ (cut-off board, FR-60) · คำสั่งซื้อ · คำขอเปลี่ยนแปลง
สินค้า                          ของเจ้าของสินค้า · ของคลัง [เฉพาะ 3PL] · วัสดุแพ็ค · ชุดสินค้า
── งานคลัง
รับสินค้าเข้า                     ภาพรวมรับเข้า · รายการรอเข้าคลัง · ใบรับเข้าชั่วคราว · รับเข้าสินค้า ▣ · ใบรับเข้าสินค้า · จัดเก็บเข้าตำแหน่ง · งานเพิ่มเติม [เสริม]
สินค้าคงคลัง                     ภาพรวม · ยอดคงคลัง · ผังคลัง (FR-126) · ความเคลื่อนไหว · ตรวจนับ · ย้ายตำแหน่ง & เติมของ · ยกเลิกรอคืน · ชำรุด & กักกัน · งานเพิ่มเติม [เสริม]
หยิบสินค้า                       ภาพรวมงานหยิบ · สร้างใบหยิบ · ใบหยิบ · คัดแยก · ของขาดตอนหยิบ · รถเข็น & ตะกร้า · กฎการหยิบ
แพ็คสินค้า                       ภาพรวมงานแพ็ค · เตรียมงานก่อนแพ็ค [เสริม] · ใบงานแพ็ค · แพ็คสินค้า ▣ · ผิดปกติตอนแพ็ค · งานเพิ่มเติม [เสริม]
ส่งมอบขนส่ง                      ภาพรวมส่งมอบ · คัดแยกลงภาชนะ · ภาชนะ · ส่งมอบ ▣ · ใบส่งมอบ · ค้างส่งมอบ & ปิดวัน
สินค้าตีกลับ                      ภาพรวมตีกลับ · รับพัสดุตีกลับ ▣ · ใบงานตีกลับ · ตรวจสภาพ ▣ · เก็บคืนชั้น · รายงานปัญหา · งานเพิ่มเติม [เสริม]
── รายงาน & ตั้งค่า  [ASSUMPTION: renamed from "บัญชี & รายงาน" because billing is Phase 2]
รายงาน                          วิเคราะห์ข้อมูล · รายงานทั้งหมด
ตั้งค่า & ข้อมูลหลัก               ภาพรวมตั้งค่า · ตั้งค่าบริษัท › (ข้อมูลบริษัทและโลโก้ · ผู้ใช้และสิทธิ์ · เอกสาร · เครื่องมือผู้ดูแลระบบ)
                                · ตั้งค่าคลัง › (คลังและตำแหน่ง [คลังและโซน | ตำแหน่ง | ภาชนะ | ผังคลัง (FR-125)] · อุปกรณ์และสถานี · การเชื่อมต่อ · ขนส่ง · เวลาและรอบรับ · กฎงานคลัง)
                                · ตั้งค่าเจ้าของสินค้า [เฉพาะ 3PL]
                                · โมดูลเสริม (edition and add-on toggles)
▣ = station screen (opens full-screen, see below)
```

- Every module opens on its **ภาพรวม hub**: KPIs, a "ต้องจัดการ" (needs action) list and queue cards. Every L2 tab after the hub is a work queue named after a document or task, with a count chip.
- Count chips show **actionable** items only (waiting on this warehouse), not totals.
- **Where admin-only surfaces live** [ASSUMPTION]:
  - Migration and cutover (FR-111–114: import, dry-run, opening balance, cutover check) and the activity log (FR-107): ตั้งค่าบริษัท › เครื่องมือผู้ดูแลระบบ.
  - OMS failed-sends queue and force-push (FR-4): ตั้งค่าคลัง › การเชื่อมต่อ.
  - Daily reconciliation (FR-7): รายงาน.
  - Edition and add-on toggles: ตั้งค่า › โมดูลเสริม.
- **Header items.**
  - The approvals and notification buttons open one Sheet with two tabs, "รอดำเนินการ" (approvals plus actionable tasks) and "การแจ้งเตือน" (FR-105, FR-106). The approvals button opens it on the first tab filtered to รออนุมัติ.
  - Global search accepts typed or scanned order, pick-list, ASN, parcel and SKU codes and jumps to the record.
  - The warehouse switcher lists the user's warehouses. On pages that support aggregation (all-warehouse stock, reports) it adds a **"ทุกคลัง (n)"** option covering only the warehouses the role can access. Other pages do not show the option.
- The **level-3 settings row** (ตั้งค่าบริษัท / ตั้งค่าคลัง sub-pages) is a secondary `Tabs` row, never a third sidebar level.

### Overview hub (ภาพรวมคลัง, FR-109)

See the [office overview mock](mockups/key-office-overview.html). Top to bottom:

1. **Page header.** H1, then the scope line "คลังบางเขน · {date} · ข้อมูล ณ 10:41 · อัปเดตทุก 1 นาที" and a "เปิดรายงาน" secondary action. Data refreshes every 60s.
2. **KPI row** (5 cards, each with a delta vs yesterday): ส่งมอบแล้ววันนี้ (handed over today), รอส่งมอบ (awaiting handover), ความแม่นยำการแพ็ค (pack accuracy), ส่งตรงเวลา (on-time %, with the target), ความแม่นยำสินค้าคงคลัง (inventory accuracy).
3. **Pipeline bar** "คำสั่งซื้อวันนี้ตามขั้นตอน" (today's orders by stage): รอสร้างใบหยิบ › รอหยิบ › กำลังหยิบ › รอแพ็ค › แพ็คแล้วรอส่งมอบ. Each segment opens the filtered list.
4. **ต้องจัดการ list**, one row per actionable bucket with a count, for example: past a carrier cut-off and not packed, cancelled during packing awaiting put-back, failed OMS sends, count variances awaiting approval, lines waiting for replenishment.
5. **Urgent-orders table** "คำสั่งซื้อที่ต้องเร่ง", 10 rows with pagination and filter tabs ทั้งหมด · เกินกำหนด · ด่วน · รออนุมัติ · รอเติมของ. The fixed sort is **เกินกำหนด › ยกเลิกกลางงาน › ด่วน › รอ › กำลังทำ › เสร็จ**. Columns: order number, channel · shop, carrier · wave, stage, status, lines / pieces, last update, worker.
6. **Below the fold** (FR-109 items not in the mock; placement [ASSUMPTION]): space used, productivity vs target per stage, and the "ความเคลื่อนไหววันนี้" (today's activity) feed from the prototype (trucks arriving, backorders, next carrier rounds).

Pending approvals (FR-109) show as the header count and as a ต้องจัดการ row.

### Visibility rules (edition · add-on · permission · phase)

Rules apply in this order, and the first rule that hides an item wins. A hidden item is gone from the nav, global search, PDA tiles and deep links (a deep link shows the not-available state).

| Rule | Hidden when | Items |
|---|---|---|
| Phase | Not Phase 1 | จัดซื้อ, วางแผนงาน, จัดการรถขนส่ง, โอนย้ายคลัง, อุณหภูมิ, โหมดทีวี (Later); เจ้าของสินค้า module, ค่าบริการ, จัดการเคลม, Client Portal (Phase 2); the PDA "หัวหน้า" tile group (no Phase 1 tasks) |
| Edition | Edition = Business | สินค้า › ของคลัง, ตั้งค่าเจ้าของสินค้า, owner columns, filters and pickers |
| Owner count | The warehouse has exactly one owner | Owner picker and owner column (PRD §4.16 [ASSUMPTION]) |
| Add-on | Add-on off for the company or warehouse (addendum §C), set in ตั้งค่า › โมดูลเสริม | งานเพิ่มเติม (VAS) tabs, เตรียมงานก่อนแพ็ค, automatic pick-list options in สร้างใบหยิบ. Whether these are add-ons in Phase 1 is open (Q-5) |
| Permission | No *view* on that page (FR-18) | Any page, tab, action button or PDA tile |
| Device binding | The station or PDA is bound to a work point (FR-11) | Everything outside that work point's tasks |

- The "เฉพาะ 3PL" and "เสริม" tags appear **only in ตั้งค่า** (on the โมดูลเสริม toggles and in the role editor), so admins know why an item exists. Operational screens never show them.

### Surface inventory by device

| Device | Surfaces |
|---|---|
| Office web (PC) | All nav items above; the รอดำเนินการ / การแจ้งเตือน Sheet; global search; user menu (language, calendar era, "เปิดระบบบน PDA (QR)", password, help, sign out); warehouse switcher Dialog |
| Station (PC full-screen) | Receiving station (รับเข้าสินค้า; UJ-1). Pack station PS-NN with by-order, by-pick-list and multi-box methods (UJ-3). Handover station with carrier, carrier-refused and customer-pickup modes (ส่งมอบ; UJ-4). Return receipt station (UJ-5). Return inspection station (ตรวจสภาพ; UJ-5). Each is launched from its tab, goes full-screen, and is bound to a station code (FR-11) |
| PDA | Login (badge QR, optional PIN, day-labour card) → home tiles grouped รับ-เก็บ / สินค้าคงคลัง / หยิบ-แพ็ค-ส่ง (the หัวหน้า group is hidden in Phase 1). Tasks: receiving (photos only, no video), putaway (Q-11), moves & replenishment, material issue, counting, cancel-return job, picking, prep [เสริม], packing, sort to container (Q-11), handover + signature, return receipt. A universal scan field on home opens the matching task |
| Tablet | Signature capture for handover manifests (default device) and temporary receipts, via a "sign on tablet" handoff from the station or web [ASSUMPTION: pairing mechanism] |

### Surface closure

| Need (source) | Surface | Journey |
|---|---|---|
| Record a vehicle arrival with shortfall evidence (FR-31) | Web › ใบรับเข้าชั่วคราว (Sheet) + tablet signature | UJ-1 |
| Receive against an ASN with lot/expiry and shelf-life check (FR-33, FR-36) | Receiving station | UJ-1 |
| Reject wrong-owner goods (FR-36) | Full-screen reject on the station | UJ-1 edge |
| Put received goods away (FR-37, FR-38) | PDA putaway / web จัดเก็บเข้าตำแหน่ง | UJ-1 climax |
| Sign in on a shared PDA, including day labour (FR-21, FR-22) | PDA login and lock screens | UJ-2 entry |
| Pick a batch, handle short picks, undo a scan (FR-66–68, FR-46) | PDA picking / web pick confirmation | UJ-2 |
| Approve a count variance (FR-49, FR-105) | รอดำเนินการ Sheet | UJ-2 edge |
| Pack with scan-verify, weight, label, video (FR-75–80) | Pack station PS-NN | UJ-3 |
| Pack by pick list or in several boxes (FR-75) | Pack station method variants | UJ-3 variants |
| Catch a cancellation mid-pack (FR-92–94) | Locked-cancelled screen → ผิดปกติตอนแพ็ค queue | UJ-3 climax |
| Sort parcels to carrier containers (the "sorted" state, FR-85) | PDA sort / web คัดแยกลงภาชนะ | UJ-4 |
| Load a vehicle with seal check, sign the manifest, close the day (FR-86–88, FR-90, FR-91) | Handover station + tablet; ค้างส่งมอบ & ปิดวัน | UJ-4 |
| Reconcile carrier-refused labels (FR-94) | Handover station, carrier-refused mode | UJ-4 variant |
| Hand over to a customer pickup (FR-89) | Handover station, customer-pickup mode | UJ-4 variant |
| Receive carrier returns, match buyer-return labels, quarantine unmatched parcels (FR-98–100) | Return receipt station | UJ-5 |
| Inspect, grade and restock returns (FR-101, FR-102) | Inspection station; PDA or web restock | UJ-5 |
| Track decisions waiting on the owner, with deadline and default action (FR-103) | Problem reports and other queues (owner-decision chip) | UJ-5 resolution |
| Set up structure, devices, users and opening stock; cut over (FR-8, FR-11, FR-17, FR-111–114) | ตั้งค่า pages; เครื่องมือผู้ดูแลระบบ › นำเข้าข้อมูล; count rounds | UJ-6 |
| See the warehouse's day at a glance (FR-109) | ภาพรวมคลัง | **No UJ** (see Open Questions) |
| Answer "where is this order?" with evidence (NFR-12) | คำสั่งซื้อ › order detail (detail-page pattern) | **No UJ** (see Open Questions) |
| See the day's risk per carrier wave (FR-60) | คำสั่งซื้อ › ภาพรวม (cut-off board) | **No UJ** (see Open Questions) |
| Build draft waves (FR-62) | หยิบสินค้า › สร้างใบหยิบ | **No UJ** (see Open Questions) |

## Voice and Tone

Microcopy only. Brand posture lives in `DESIGN.md` Brand & Style.

The voice is operational, short and imperative, in everyday Thai. Every message states **what happened → what to do next**. Floor copy fits in two lines on a PDA. The English UI mirrors the meaning, not the word order.

| Do | Don't |
|---|---|
| "สแกนผิดรหัส · วางคืนแล้วสแกนชิ้นถัดไป" (Wrong code · put it back and scan the next piece) | "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" (An error occurred, please try again) |
| "คำสั่งซื้อนี้ถูกยกเลิก · ห้ามพิมพ์ฉลาก · วางที่ CXL-01" (This order was cancelled · don't print the label · put it at CXL-01) | "ไม่สามารถดำเนินการได้" (Cannot proceed) |
| "รอส่ง 2 รายการ · สัญญาณหลุด ส่งให้เองเมื่อกลับมา" (2 waiting to send · signal lost, they'll send when it's back) | "Offline mode activated" |
| "ยังไม่มีใบหยิบที่รอรับ · งานใหม่จะขึ้นที่นี่ทันที" (No pick lists waiting · new work appears here instantly) | An empty table with no text |
| "ไม่มีสิทธิ์ใช้ PDA · แจ้งผู้ดูแลระบบเพื่อขอสิทธิ์ แล้วสแกนใหม่" (No PDA permission · ask your admin, then scan again) | "403 Forbidden" |
| Use glossary terms: ใบหยิบ, ใบรับเข้าชั่วคราว, ภาชนะ, เจ้าของสินค้า, แพ็ค, สต๊อก, รหัสสินค้า | Mixed spellings (แพ็ก/แพ็ค), "SKU" in Thai floor copy, English jargon where a Thai term exists |
| Use "·" to separate fact from action. Numbers are digits | Exclamation marks, emoji, blame ("คุณทำผิด" / "you did it wrong") |
| Confirm buttons say the verb and object: "ปิดกล่อง", "ยืนยันส่งมอบ 14 ภาชนะ" (Close box; Confirm handover of 14 containers). The reject acknowledgement reads "รับทราบ · สแกนต่อ" (Got it · keep scanning) | "ตกลง" / "OK" on consequential confirmations |

- **No design notes in UI.** Rule explanations belong in this spine or in help. On screen, at most one muted sentence of scope sits under the H1. Real operational consequences use the inline Alert (Component Patterns).

## Component Patterns

Behavioural rules only. Visual specs are in `DESIGN.md` Components, grouped the same way. Unlisted shadcn components keep their Radix behaviour.

### Shared (all surfaces)

| Component | Use | Behavioural rules |
|---|---|---|
| Button (primary / destructive) | Everywhere | One primary per region. `Enter` in a single-field form fires primary. Destructive always routes through `AlertDialog`. Buttons that start a server action show an inline spinner and are disabled until the response arrives (no double submit) |
| Status badge | Everywhere | Read-only. Hover/focus tooltip gives the status time and actor |
| Count chip | Sidebar, tabs, PDA tiles | Actionable-only counts. Hidden at 0. Shows "99+" above 99. Announced with the label ("ใบหยิบ 14 รายการ", pick lists, 14 items) |
| Inline Alert | Any surface | `info` or `warning` only, one or two sentences of real operational consequence (for example, why a scan will not block). Never a design note, never dismissible when it describes a live condition |
| Owner-decision chip | Queues and records waiting on the owner (for example problem reports "รอ Owner Care", PO close) | Shows the answer-by date and the default action that runs if nobody answers. When the deadline passes, the default action runs, the record logs it, and the chip clears. Deadline and default action come from the rule for that decision type |
| Toast (Sonner) | Non-blocking results | Success auto-dismisses after 4s. Errors persist until dismissed. Never used for scan results on floor surfaces (those use the feedback tiers) |
| Support-access banner | All surfaces while active (FR-23) | Cannot be dismissed. "ยกเลิกสิทธิ์" (revoke access) needs admin permission and confirms |
| Empty state | Every list, queue, hub card | One line of what's empty, one line of why or what to do next, at most one action (for example "สร้างใบรับเข้า"). A filtered-empty state offers "ล้างตัวกรอง" |
| Masked value | PII fields (FR-19) | Masked by default. The reveal button exists only with *view buyer PII*. Each reveal is logged (PRD §6.1) and re-masks after navigation |
| Signature pad | Tablet, station, PDA | Requires the signer name. "ล้าง" (clear) resets it. Submit is disabled until there is at least one stroke. The signature is shown on the manifest preview before final confirm |
| Camera / recording indicator | Pack, receiving, returns stations | Recording starts on job open and continues through label print (FR-80). If there is no camera, a one-time warning appears and work continues |
| Print status chip | Pick lists, labels, documents | See Printing |

### Office web

| Component | Use | Behavioural rules |
|---|---|---|
| Sidebar nav | Office web | Collapse state persists per user. The rail shows a tooltip on hover/focus. The active item follows the current module, including on deep links. Count chips refresh every 60s (FR-109 cadence) |
| Module tabs (L2) | Every module | Tab = URL route (shareable, back button works). Remembers the last tab per module per user. The hub is always first |
| Page header | All office pages | At most 1 primary action. Destructive actions live in the overflow menu, never as a header primary |
| Edition / add-on tag | ตั้งค่า only | Explains why an item exists. Never interactive and never rendered on operational screens |
| Data table | All lists | Server-side paginated (50 rows default), no infinite scroll. Filters, sort and page are kept in the URL. Saved views per user (FR-110). Row click opens the detail page. The checkbox column enables the bulk action bar. At <1440px, P3 columns hide behind a "คอลัมน์" (columns) menu. Excel export respects filters and masking |
| Filter bar | All lists | Search is debounced 300ms and also accepts scanner input. Status tabs show counts. "ล้างตัวกรอง" (clear filters) appears only when a filter is active |
| Bulk action bar | Lists with batch actions | Shows "เลือก n รายการ" (n selected). Actions apply only to eligible rows and report "ทำได้ 18 · ข้าม 2 (เหตุผล)" (18 done · 2 skipped, with reason). It is never all-or-nothing silent |
| KPI card / Queue card / Pipeline bar | Hubs, overview | The whole card or segment is a link to the filtered queue (≤2 clicks to a blocked item). Data shows "ข้อมูล ณ 10:41" (data as of 10:41) |
| Sheet (create/edit) | Create/edit forms over lists | Radix focus trap. The first field is focused on open. Esc or Close with unsaved changes → `AlertDialog` "ทิ้งการแก้ไข?" (Discard changes?). Save keeps the Sheet open on validation errors and scrolls to the first error. Only one Sheet at a time, and never a Dialog on top of a Sheet except AlertDialog confirmations |
| Dialog / AlertDialog | Confirmations, warehouse switch, PDA QR | Destructive confirmations name the object and consequence and put focus on **Cancel**. Irreversible stock-affecting actions require a reason field |
| Detail page | Every document and order (NFR-12 "where is this order?") | Read-first. The key-value block answers what and where. The timeline lists every status event with actor, device and time, newest first. Evidence (pack video, photos, signature, manifest) opens in place. Actions sit in the page header and follow the Page header rule. Closed records follow the read-only state |
| รอดำเนินการ / การแจ้งเตือน panel | Header | "รอดำเนินการ" holds approvals and actionable tasks, each with a deep-action button (for example "สร้างรอบ", "ตรวจวิดีโอ"). The sub-filter is "ทั้งหมด · รออนุมัติ · เร่งด่วน". The panel opens on รอดำเนินการ when its count is >0. Unread items carry a dot until opened. "อ่านทั้งหมดแล้ว" marks all read. "ดูประวัติ" opens resolved and read items. Approve is one click and reject requires a reason. Money-related approvals are never self-approvable: the button is hidden for the requester (PRD Approval). Items update live, and removed items fade with an `aria-live` announcement |
| Warehouse switcher | Header | Dialog listing the user's warehouses. Switching keeps open work (copy from the prototype) and reloads all data scope. "ทุกคลัง (n)" appears only on pages that support aggregation and covers only warehouses the role can access. |
| Day-close checklist | ค้างส่งมอบ & ปิดวัน (FR-91) | One row per failing check, each with a link to its fix. The close button stays disabled with the reason "แก้ให้ครบ n รายการก่อน จึงปิดวันได้" (fix the n items before closing the day) until every check passes. Only users with the *day close* permission see the button |
| Layout editor (added 2026-11-23) | ตั้งค่าคลัง › คลังและตำแหน่ง › ผังคลัง (FR-125) | Tools by button or shortcut: V select · R rack · A aisle · Z zone area · W wall/obstacle · D door/dock · S pick start/end point · T label. Ctrl+Z / Ctrl+Shift+Z undo/redo, Delete removes, arrows nudge one grid step, Shift+arrows nudge 1 m. A status bar shows "แบบร่าง · แก้ล่าสุด HH:MM" and "ใช้งานอยู่ v{n}". Publish opens a validation result first (blocking items and warnings, each linked to the element). A keyboard-operable binding list mirrors the canvas, and every element is selectable from a list. Route preview lists its stops as text as well as drawing them. Below 1280px the editor is read-only |
| Layout map (added 2026-11-23) | สินค้าคงคลัง › ผังคลัง (FR-126) | Read-only published layout. Selecting a slot opens a side panel with its stock. Filters dim non-matching slots rather than hiding them |
| Layout draft held by someone else (added 2026-11-23) | ผังคลัง (FR-125) | The editor opens read-only with a banner "{name} กำลังแก้ผังนี้ ตั้งแต่ HH:MM" ({name} is editing since HH:MM). Admins also see "แก้แทน" (take over), which confirms in an AlertDialog that names the holder; the holder's unsaved work is saved as a separate draft copy and they see "ผังถูกแก้แทนโดย {name}" |
| Layout versions (added 2026-11-23) | ผังคลัง (FR-125) | A "ประวัติเวอร์ชัน" list shows each published version with date, user and counts of racks and bound slots. "เผยแพร่เวอร์ชันนี้อีกครั้ง" on an old version runs the same publish validation and creates a new version number |
| Pick start/end per zone (added 2026-11-23) | ผังคลัง (FR-125) | Placing a start or end point asks which pick zone it serves; each pick zone shows one start and one end. Publish validation names any pick zone with bound locations but no start point |
| Bulk location create (added 2026-11-23) | ตั้งค่าคลัง › ตำแหน่ง (FR-8) | The Sheet builds codes from the zone's code format and ranges. Before creating, a preview shows the first and last codes, the total ("จะสร้าง 480 ตำแหน่ง") and the codes that already exist ("ข้าม 12 รหัสที่มีอยู่แล้ว", expandable). More than 5,000 blocks the create button with "สร้างได้ครั้งละไม่เกิน 5,000 ตำแหน่ง" |
| Disable vs delete (added 2026-11-23) | Warehouses, zones, locations, containers (FR-8, FR-10) | Delete appears only for records that never held stock and are not bound to the layout. Otherwise only "ปิดใช้" (disable) or, for containers, "เลิกใช้" (retire) is offered, and both require a reason. A bound location's delete is replaced by "ยกเลิกการผูกก่อนลบ" (unbind before deleting) with a link to the slot |
| Fixed codes (added 2026-11-23) | Warehouse, location and container forms (FR-8, FR-10) | The code field is editable only on create. On edit it shows as read-only mono text with the helper "รหัสแก้ไม่ได้ เพราะอยู่ในเลขเอกสารและ QR" |

### Stations

| Component | Use | Behavioural rules |
|---|---|---|
| Station top bar | Every station | Station code, station type, user and clock. Device chips go live (พร้อม / ออฟไลน์ / กำลังบันทึก) and turn destructive on a fault (see Device states). F11 toggles full-screen |
| Station job header | Pack, handover | Shows the document and its live status. The cancellation-check chip shows the time of the last check ("ไม่ถูกยกเลิก · ตรวจเมื่อ 11:24:05") and updates on every re-check. It makes fail-closed legible: when the check cannot run, the chip says so before the blocked screen appears |
| Requirement tile / Per-job checks panel | Pack, receiving | Tiles update live on each scan. The "การตรวจของงานนี้" panel lists which checks are on for this job and why the station asks for each scan. It is read-only for the worker |
| Next-scan banner / Step strip | Stations, PDA tasks | Always shows the single next expected scan. Steps advance only on a valid scan, never on a tap, except for steps marked tappable |
| Scan input | Stations, PDA, global search | See Scan & Hardware Feedback. Always holds focus on station and PDA task screens. A typed entry is allowed but logged as manual where the rule requires scan (FR-76) |
| Scan notice | Stations, PDA | The non-blocking feedback tier. Appears under the scan field for the event, stays until the next scan, and never takes focus |
| Scanned-vs-expected row | Stations | Live update on each scan. Rows sort incomplete-first. A completed row collapses on PDA |
| Recent-scans list | Returns, handover, sort | Newest first. Every scan gets a row with its result, including notices, so a worker can see a duplicate or a wrong-carrier row without leaving the scanner. Breakdown counters above the list update with it |
| Command chip row | Stations | Every chip equals a barcode on the printed command sheet: tap, F-key or scan does the same thing. Only commands valid for the current step are enabled. See Interaction Primitives for the set |
| Full-screen feedback | Stations, PDA | See State Patterns and Scan & Hardware Feedback |

### PDA

| Component | Use | Behavioural rules |
|---|---|---|
| PDA top bar | Every PDA screen | Back returns to the task list and never discards scans (a running task is parked, not cancelled). The overflow menu holds lock screen, switch warehouse, language and sign out. The offline indicator mirrors the queue strip |
| PDA home tile | PDA home | Shows only permitted tasks (FR-21). Up to two live counts refresh on focus and every 60s. Urgent tasks reorder to the top with a chime (FR-46) |
| PDA task card | PDA queues | Tabs "ของฉัน / รอรับ" (mine / waiting). Tapping or scanning the card's QR claims it. A claimed card shows the claimer to others and is not claimable |
| Location callout | PDA pick, putaway, move, count | Advances to the next location after the location scan, then waits for item scans |
| Short-pick card | PDA pick | Appears inline when the entered quantity is below the requirement. It is not a dialog, and the scan field stays live. "ขาด n ชิ้น" records the short (FR-67). "ทำต่อภายหลัง" defers the line so the worker returns to it later in the route |
| Offline queue strip | PDA | Appears with the first queued scan and disappears when synced. Tapping it lists queued items (read-only). There is no resend button |

## State Patterns

### Loading, empty and errors

| State | Surface | Treatment |
|---|---|---|
| Cold load | Office lists, hubs | shadcn `Skeleton` rows matching the layout (5 rows, KPI blocks). After 10s: inline "ยังโหลดไม่เสร็จ · ลองใหม่" (still loading · retry) |
| Cold load | Station, PDA task | A blocking spinner only for ≤1s. Beyond that, "กำลังเปิดงาน…" (opening job…). The scan field stays disabled until the job loads, so no scan is lost or misapplied |
| Empty (first use) | Any list | Empty state with a setup action when the user has permission (for example in an empty locations list, "นำเข้าตำแหน่งจาก Excel" (import locations from Excel)) |
| Empty (no work) | Queues, PDA tiles | Calm empty state, for example "ไม่มีงานค้าง" (no pending work). A count of 0 hides the count chip |
| Empty (filtered) | Lists | "ไม่พบรายการตามตัวกรอง" (nothing matches the filters) + "ล้างตัวกรอง" (clear filters) |
| Validation error | Forms (Sheet) | Inline under the field in `destructive` + icon. An error summary at the top of the Sheet links to the fields. Errors are kept on save |
| Server error | Office | A persistent Toast (destructive) with a plain cause, a retry, and a reference code for support |
| Integration error | Office (FR-4, NFR-5) | A hub "ต้องจัดการ" row "ส่งข้อมูลไม่สำเร็จ n รายการ" (n sends failed) → failed-sends queue |
| Stale / concurrent edit | Any record | "ข้อมูลเปลี่ยนแล้ว · โหลดใหม่" (data changed · reload) on save conflict. PDA: "ยอดเปลี่ยนแล้ว สแกนใหม่" (quantity changed, scan again) |

### Scan results and job states

| State | Surface | Treatment |
|---|---|---|
| Scan accept | Station, PDA | Green flash of the row or field (300ms) + short high beep + the counter updates. **No full screen.** The worker keeps scanning (NFR-2 ≤500ms) |
| Scan notice | Station, PDA | Inline `{colors.scan-notice}` box under the scan field + a single low beep. **No full screen**, and scanning continues. Used for events that need awareness, not action: a duplicate scan, a wrong-carrier or already-received return, an unmatched return sent to quarantine, a batch print that skipped already-printed items |
| Scan reject | Station, PDA | **Full-screen `scan-reject`** + x-octagon + long double low tone + vibration (PDA). The headline gives the reason and the second line gives the action. Stays until the worker scans the next valid code or taps the 64px "รับทราบ · สแกนต่อ" button. Minimum display 1.5s [ASSUMPTION] |
| Blocked / needs supervisor | Station, PDA | **Full-screen `scan-blocked`** (amber) + pause-octagon + a two-tone chime. Used for shelf life below minimum (UJ-1), weight out of tolerance (UJ-3) and variance pending approval. Offers "เรียกหัวหน้า" (call supervisor; supervisor badge scan at the device [ASSUMPTION]) or "พักงานไว้" (park the job) |
| Waiting for goods (parked) | Pack station | Entered by the "รอของ" command or when a split pick has not arrived. The station shows "ของยังไม่ครบ · วางคืนที่ {tote} แล้วสแกนงานถัดไปได้เลย" (goods incomplete · put them back in {tote}, then scan the next job). The job parks and the station is free. When the missing goods arrive, the system notifies this station |
| Locked: cancelled during work | Pack station, sort, handover (FR-92–94) | Full-screen `scan-reject`, headline "คำสั่งซื้อถูกยกเลิก" (order cancelled), second line "ห้ามพิมพ์ฉลาก · วางที่ CXL-01". The screen shows the order number, the cancel time, a "พิมพ์ฉลากถูกล็อก" (label locked) chip, a scan target for the CXL location and the recording pill. It has **no acknowledgement button**: the only exit is scanning the CXL location, which creates the "ยกเลิกระหว่างแพ็ค" exception and returns the station to step ① |
| Read-only / closed record | Documents | A neutral "ปิดแล้ว" (closed) badge. Edit actions are hidden. Corrections are made through a reversal request (FR-43) |
| Waiting on owner | Queues, detail pages | Owner-decision chip with the answer-by date and default action. When the deadline passes, the default action runs and is logged |
| Day cannot close | ค้างส่งมอบ & ปิดวัน (FR-91) | Status "ปิดวันไม่ได้ · เหลือ n รายการ" (cannot close · n left) with the checklist. Closing takes a snapshot that cannot be edited |

### Connectivity

| State | Surface | Treatment |
|---|---|---|
| Offline (queueable task) | PDA pick, count, move (NFR-3) | Offline queue strip. Scans continue with local accept/reject on cached data. Queued items sync without duplicates. A queued scan later rejected by the server raises a PDA notification and a supervisor queue item |
| Offline (live check required) | Pack/sort cancellation checks (NFR-3) | **Fail closed.** The job-header chip shows the check cannot run, then full-screen `scan-blocked` "ต้องต่อสัญญาณเพื่อตรวจคำสั่งยกเลิก" (needs connection to check cancellations). The job pauses and resumes automatically on reconnect |
| Offline | Office web | A top banner "ขาดการเชื่อมต่อ · ข้อมูลอาจไม่ล่าสุด" (disconnected · data may be stale). Write actions are disabled with a tooltip |

### Access, sign-in and devices

| State | Surface | Treatment |
|---|---|---|
| Web sign-in: wrong password | Web login (FR-20) | Inline alert "อีเมลหรือรหัสผ่านไม่ถูกต้อง · ลองได้อีก n ครั้งก่อนบัญชีถูกล็อกชั่วคราว". The message never says which of the two was wrong |
| Web sign-in: locked | Web login | "บัญชีถูกล็อกชั่วคราว" with a 15:00 countdown, a "ตั้งรหัสผ่านใหม่" action, and "เข้าสู่ระบบอีกครั้ง" enabled when the countdown ends |
| Web sign-in: OTP | Web login | Six digit boxes, paste and one-time-code autofill supported, auto-submit on the sixth digit. The masked email shows where the code went (`t**@fullfeel.co`). Resend unlocks after 45 s, up to 5 times; the countdown is announced to screen readers only when resend becomes available |
| Web sign-in: OTP wrong / expired / too many | Web login | Wrong: "รหัสไม่ถูกต้อง · ลองได้อีก n ครั้ง" and the boxes clear. Expired after 5 minutes: "รหัสหมดอายุ" with the resend action. Fifth wrong code or resend limit reached: back to the password step with "ยืนยันตัวตนไม่สำเร็จ · เข้าสู่ระบบใหม่" |
| Web sign-in: suspended / no web page | Web login | Shown only after a correct password, with no OTP sent: "บัญชีนี้ถูกพักใช้" or "บัญชีนี้ยังไม่มีสิทธิ์ใช้งานบนเว็บ", each with "ติดต่อผู้ดูแลระบบ" and "ใช้บัญชีอื่น" |
| Web sign-in: no active warehouse | Web login | "ยังไม่มีคลังที่เปิดใช้งานในสิทธิ์ของคุณ · ติดต่อผู้ดูแลระบบ". No way into the app |
| Web sign-in: warehouse picker | Web login | One card per active warehouse in scope, each showing the user's role there; the last used is preselected. Users with one warehouse skip it |
| Idle warning | Office web (FR-20) | Two minutes before the idle timeout, a Dialog "จะออกจากระบบใน 2:00 เพราะไม่มีการใช้งาน" with "อยู่ต่อ" focused. On timeout the user lands on "หมดเวลาใช้งาน"; an open Sheet's unsaved input is kept as a draft and offered back after sign-in |
| Password reset | Web login | The same "ตรวจอีเมลของคุณ" screen for every email. The link works once within 30 minutes; an expired or used link shows "ลิงก์นี้ใช้ไม่ได้แล้ว · ขอลิงก์ใหม่" |
| Permission denied | Any | The item is hidden (see Visibility rules). A deep link to a hidden page shows "ไม่มีสิทธิ์เข้าหน้านี้ · ติดต่อผู้ดูแลระบบ" (no access to this page · contact your admin) with a link home |
| Feature not in edition / add-on off | Deep link | "ฟีเจอร์นี้ไม่ได้เปิดใช้ในบริษัทของคุณ" (this feature isn't enabled for your company). No upsell on floor devices |
| PDA login: no PDA permission | PDA login | "ไม่มีสิทธิ์ใช้ PDA · แจ้งผู้ดูแลระบบเพื่อขอสิทธิ์ แล้วสแกนใหม่" |
| PDA login: unknown badge | PDA login | Full-screen `scan-reject` + beep, and a notification is sent (FR-21) |
| PDA login: day-labour card (FR-22) | PDA login | A valid day-labour card signs in with only its allowed functions. A card that was not returned at shift end shows "บัตรรายวันค้างคืน" (day card held overnight); because FR-22 auto-returns cards at shift end, the worker needs a supervisor to re-issue it [ASSUMPTION]. A worker with no card sees "ไม่มีบัตร? ลงทะเบียนบัตรรายวันกับหัวหน้า" (no card? register a day card with your supervisor) |
| PDA login: signed in elsewhere | PDA login | One active PDA session per user (FR-21). The message names the other device and its sign-in time |
| PDA login: fallback | PDA login | Username and password, with no OTP on the PDA |
| PDA login: several warehouses | PDA login | A warehouse picker after sign-in |
| Idle lock | PDA (FR-21) | Lock screen: "ล็อกจอ · สแกนบัตรของ {name} เพื่อปลดล็อก" (screen locked · scan {name}'s badge to unlock). The task in progress resumes exactly. "ไม่ใช่ {name}? ออกจากระบบ" signs the user out so another worker can take the shared device; the running task is parked, not lost |
| Device not ready | Station (glossary: Station) | A station with unbound or untested devices shows a setup state listing each device's status. It cannot open jobs |
| Printer / scale / camera fault | Station | The device chip in the station top bar turns destructive. The job continues where the rule allows (camera: one-time warning, FR-80) and blocks where it doesn't (label printer at close) |
| Support access active | All | Support-access banner |

## Interaction Primitives

**Scan is the primary input on floor surfaces. Keyboard is primary on office and station surfaces. The mouse is a fallback.**

- **Universal scan.** On the PDA home and in office global search, scanning any known code opens the right task or record: parcel → sort, container → handover, pick-list QR → picking, location → stock at location, ASN → receiving.
- **Scan-as-command.** Each station prints a command sheet, and the on-screen command chip row mirrors it. Scanning a command equals pressing its chip, so a worker never leaves the scanner. The pack station set, from the prototype:
  - main flow: "ปิดกล่อง" (close box), "ของขาด" (short, F2), "พักงาน" (park, F4), "พิมพ์ซ้ำ" (reprint, F8), "ลบชิ้นล่าสุด" (undo last scan);
  - job state: "รอของ" (waiting for goods), "แจ้งปัญหาอุปกรณ์" (report a device problem), "ต้องใช้หลายกล่อง" (needs several boxes);
  - packing detail: "ห่อของขวัญแล้ว" (gift-wrapped), "ใช้กล่องเดิม" (reuse box), "บับเบิ้ลเพิ่ม" (extra bubble wrap), "พิมพ์สติกเกอร์หมายเลข" (print number sticker).

  Other stations carry "พักงาน", "พิมพ์ซ้ำ" and "ลบชิ้นล่าสุด" plus their mode commands (Key Flows UJ-4, UJ-5).
- **Undo last scan ("ลบชิ้นล่าสุด").** On every station and PDA scan task. It removes the most recent accepted scan and steps the counter back. Every undo is audited (actor, device, time, item). Where the supervisor setting requires it, the worker confirms the piece was physically put back before the undo applies.
- **Numeric entry.** Only where counting requires it (blind count, carton pattern). Entering more than required is blocked. Entering less opens the inline short-pick card "ขาด หรือ ทำต่อภายหลัง?" (short, or finish later?) (FR-67). Counting never offers "confirm system quantity" (FR-48).

**Keyboard shortcuts** [ASSUMPTION: set to validate with pilot users]

| Scope | Keys | Action |
|---|---|---|
| Office global | `Ctrl+K` or `/` | Global search / command (shadcn `Command`). Scanner input works here |
| Office global | `g` then `o` / `i` / `p` / `k` / `h` / `r` | Go to orders / inbound / picking / packing (แพ็ค) / handover / returns |
| Office global | `a` | Open the รอดำเนินการ panel on รออนุมัติ |
| Lists | `j` / `k`, `Enter`, `x` | Move row focus, open, select row |
| Sheet / Dialog | `Ctrl+Enter`, `Esc` | Save / close (with unsaved-changes guard) |
| Station | `F2` | Report short / exception |
| Station | `F4` | Park job |
| Station | `F8` | Reprint (asks for a reason, then approval, FR-78) |
| Station | `F11` | Toggle full-screen |
| Station | `Esc` | Never closes a job. It only dismisses non-blocking popovers |

- Shortcuts are listed in the user menu → "คีย์ลัด" (shortcuts) and shown in tooltips.
- Single-key shortcuts are off while a text field is focused, except on station scan fields, where F-keys always work.

**Approvals.**
- Two routes (FR-105):
  1. **Remote**: the รอดำเนินการ panel, one- or two-step.
  2. **On-the-spot at a station or PDA**: the supervisor scans their own badge on the blocked screen, then confirms with a reason [ASSUMPTION].
- Self-approval of money-related items is impossible.
- Every approval records the actor, device, reason and old→new values (FR-107).

**Banned everywhere:** infinite scroll, drag-and-drop as the only way to do something, hover-only affordances, modal-on-modal (except AlertDialog over Sheet), auto-advancing carousels, forced app updates that block a shift.

## Scan & Hardware Feedback

One feedback grammar on every station and PDA (NFR-9, NFR-12). Feedback must arrive within 500ms at p95 (NFR-2). Full screen is reserved for reject and blocked.

| Result | Visual | Icon | Sound | Vibration (PDA) | Dismiss |
|---|---|---|---|---|---|
| Accept | Field/row flash `{colors.success-soft}` 300ms; counter animates | check | Short high beep | One short pulse | Automatic |
| Accept + step complete | Step strip advances; next-scan banner text changes | check-circle | Rising two-note | One short pulse | Automatic |
| Notice | Inline box under the scan field `{colors.scan-notice}`; recent-scans row marked where the station has one | alert-triangle / info | Single low beep | One pulse | Next scan |
| Reject | Full screen `{colors.scan-reject}` | x-octagon 96px | Long double low tone | Three long pulses | Next valid scan or the 64px "รับทราบ · สแกนต่อ" button |
| Blocked / needs supervisor | Full screen `{colors.scan-blocked}` | pause-octagon | Two-tone chime, repeats every 10s | Two pulses | Supervisor action or "พักงานไว้" (park) |
| Urgent task arrives | PDA tile reorders to the top + x-octagon "ด่วน" label | x-octagon | Chime | One pulse | Automatic |

- Sounds are distinct by **rhythm and pitch**, not just volume, so they are usable by people with colour-blindness or partial hearing. Volume is set per device in อุปกรณ์และสถานี (devices and stations). The mute switch is available to supervisors only.
- Scale input is auto-filled from the bound scale. A typed weight is logged as manual (FR-77).
- Camera: priority is IP → built-in → none (FR-80).

## Printing

- **Silent print** to the station's bound printer with no browser print dialog. A4 previews only for documents the user explicitly opens [ASSUMPTION: needs a local print agent; architecture decides].
- **Print status** on every printable document follows FR-66: ยังไม่พิมพ์ (not printed) → พิมพ์แล้ว (printed) → สำเนา #n (copy #n). Batch print sends **unprinted only** by default, and a skipped item raises a scan notice on stations.
- **Reprint** requires a reason. Shipping labels and in-box documents also require supervisor approval (FR-78). The reprinted output carries "สำเนา" (copy).
- **Locked print.** The label cannot print while a cancellation check is pending or failed (UJ-3).
- **Printer offline** → the device chip turns destructive, and the job holds at the print step with "เครื่องพิมพ์ PS-04 ออฟไลน์ · ตรวจสาย/กระดาษ แล้วกดพิมพ์ใหม่" (printer PS-04 offline · check cable/paper, then press print again).
- **Zone printers.** Urgent replenishment prints at the zone printer (FR-46).
- Printed documents carry the tenant document logo plus "by Zimple Solution" and use the **user's calendar era**. Document numbers stay Gregorian (see Localization & Dates).

## Accessibility Floor

Behavioural rules. Visual contrast lives in `DESIGN.md` (all pairs computed, AA).

- **WCAG 2.2 AA** on office web, stations and PDA.
- **Never colour-only.** Status = icon + label + tone. Scan feedback = colour + icon + headline + sound (+ vibration).
- **Targets.** PDA ≥56px (primary 64px) with ≥8px spacing. Stations ≥48px. Office ≥24px per WCAG 2.5.8 (shadcn controls are 36px).
- **Text.** PDA ≥16px (the top bar alone may use 14px), office body ≥14px. The user setting "large text" scales the office ramp. Content reflows at 200% zoom on office web with no loss.
- **Keyboard-first.** Every office and station action is reachable by keyboard. Tab order follows reading order. Skip link to the main content.
- **Visible focus.** A `{colors.ring}` 2px ring with 2px offset on every focusable element. It is never removed. On full-screen reject and blocked screens, focus uses a 2px `{colors.feedback-focus-outline}` outline plus a 6px `{colors.ring}` ring.
- **Focus management.**
  - Sheet and Dialog trap focus (Radix), return focus to the trigger on close, and close on Esc (with the unsaved-changes guard).
  - Full-screen feedback screens take focus and announce via `role="alert"`, then return focus to the scan field.
  - The scan notice and the short-pick card never take focus. Notices announce via `aria-live="polite"`.
- **Screen reader.**
  - Route changes announce the page title.
  - Table counts and the result of a filter are announced via `aria-live="polite"`.
  - Scan results are announced via `aria-live="assertive"` on stations.
  - Icons have `aria-label`s, and masked values announce "ซ่อนข้อมูล" (hidden).
- **Timing.** Draft-wave reservation countdowns (FR-62) warn at 2 minutes and allow an extension. The PDA idle lock preserves work. No action has a time limit without warning. Owner-decision deadlines are shown before the default action runs.
- **Motion.** Flashes are ≤300ms with no strobing, and `prefers-reduced-motion` replaces them with a static tint. Nothing flashes more than 3 times per second.
- **Language.** `lang="th"` or `lang="en"` is set per the user setting. Codes are marked `translate="no"`.

## Key Flows

Protagonists, entry states and edges mirror PRD §2.3 verbatim. The steps below add the surface and device for each step and the UX treatment.

### UJ-1. Somchai receives a truck that doesn't match its notice

*Somchai, inbound receiver, desktop receiving station with camera. A truck arrives at 10:20 and the ASN says 30 cartons.* Spine-only (no mock).

1. **Web › ใบรับเข้าชั่วคราว → Sheet (PC).** He opens a temporary receipt for the vehicle and enters 28 outer cartons. The difference vs the ASN shows inline as a `warning` "ขาด 2 กล่อง" (2 cartons short). He photographs the shortfall (camera capture) and taps "ให้ผู้ส่งเซ็น" (have the sender sign). The **tablet** shows the signature pad and the sender signs. The 2-part slip prints.
2. **Receiving station (full-screen, PC + scanner + camera).** He scans the ASN, which opens receiving, and recording starts. He scans one unit and the SKU is selected. The next-scan banner reads "นับตามแพทเทิร์นกล่อง" (count by carton pattern).
3. **Same station.** He enters the carton pattern and the lot. For expiry, the date picker uses his calendar era. The system shows remaining shelf life.
4. **Blocked.** The lot is below the minimum shelf life → full-screen `scan-blocked` "อายุคงเหลือต่ำกว่าเกณฑ์ · ต้องให้หัวหน้ายืนยัน" (shelf life below threshold · supervisor must confirm). The supervisor scans their badge at the station and enters a reason, and receiving resumes.
5. **Same station.** Carton QR labels print silently (print status chip). He closes the pallet, which creates the putaway task.
6. **Climax: PDA putaway.** Putaway staff scan the pallet QR. The location callout shows the suggested location. They scan it, and a green accept plus a beep confirms that the stock is sellable. On the office web, waiting orders flip to reserved within the next refresh.
7. **Resolution.** The receipt closes. Its summary (short 2, damaged 0) shows in ใบรับเข้าสินค้า and is sent to Zimple OMS.

**Failure.** He scans another owner's SKU → full-screen `scan-reject` "สินค้านี้เป็นของเจ้าของสินค้าอื่น · แยกวางไว้ แล้วสแกนชิ้นถัดไป" (this item belongs to another owner · set it aside and scan the next piece). He scans the same PO line twice → scan notice, no full screen. Camera down → one-time "ไม่มีวิดีโอ" (no video) warning, and receiving continues.

### UJ-2. Nok picks a batch on 11.11 when a location comes up short

*Nok, picker in her second week, on a PDA.* See the [PDA pick mock](mockups/key-pda-pick.html) (ready, accept, reject, short pick).

1. **PDA home → หยิบสินค้า tile (count 14).** "รอรับ" (waiting) tab. She scans the pick-list QR to claim it.
2. **PDA picking.** She scans the cart, which binds slots. The location callout shows `A-03-02` with "จุดที่ 1/18 · 0/71 ชิ้น" (stop 1/18 · 0/71 pieces). She scans location then items, with a green accept on each. The snake route advances.
3. **Signal drops in aisle C.** The offline queue strip shows "รอส่ง 3 รายการ" (3 waiting to send). She keeps scanning without interruption.
4. **Wrong item.** She scans the 50ml serum instead of the 30ml → full-screen `scan-reject` "สแกนผิดรหัส · วางคืนแล้วสแกนชิ้นถัดไป", showing what she scanned vs what is required. She puts it back and scans the right item, or taps "รับทราบ · สแกนต่อ". If she had already accepted a wrong piece, "ลบชิ้นล่าสุด" undoes it (audited).
5. **Climax: stop 14.** The location holds 2, not 5. She enters 2, and the inline short-pick card asks "ขาด 3 ชิ้น หรือ ทำต่อภายหลัง?" (3 short, or finish later?). She taps **"ขาด 3 ชิ้น"** (64px). The system offers an alternative location B-11-04. If none exists, it creates urgent replenishment (a zone printer prints it and the replenisher's PDA chimes). The line moves to the end of her list and is marked `warning` "รอเติมของ" (waiting for replenishment).
6. **Resolution.** Replenishment completes and the line flips to "หยิบได้" (pickable). She finishes, scans the staging location and drops the cart. Nothing is auto-adjusted.

**Failure.** Nothing is found at any location → an urgent blind count is created. The order shows `warning` "สต๊อกไม่พอ" (insufficient stock) until the supervisor approves the variance in the **รอดำเนินการ panel** (office web).

### UJ-3. Ploy packs an order that was cancelled while she worked

*Ploy, packer at station PS-04 (scanner, scale, label printer, camera).* See the [pack station mock](mockups/key-station-pack.html) (cancelled-lock and the screen before it).

1. **Pack station PS-04 (full-screen).** The station top bar shows PS-04, Ploy and four device chips. She scans the pick-list QR, the job opens and recording starts. The step strip reads ① สแกนเปิดงาน (scan to open the job). The job header shows the cancellation-check chip. The requirement tiles show the suggested box, weight range, gifts and in-box documents, and the "การตรวจของงานนี้" panel lists the checks that are on.
2. She scans the suggested box (accept). The next-scan banner reads "สแกนสินค้า · กล่อง · ของแถม ลำดับไหนก็ได้" (scan items · box · free gifts, in any order).
3. She scans every piece, and each row counts up to "ครบ" (complete). The weight auto-fills from the scale against tolerance. The command chip row shows ปิดกล่อง as the primary chip.
4. **Climax.** She scans the "ปิดกล่อง" (close box) command. The pre-print re-check finds the buyer cancelled 40s ago → the **locked-cancelled screen**: "คำสั่งซื้อถูกยกเลิก · ห้ามพิมพ์ฉลาก · วางที่ CXL-01" (order cancelled · don't print the label · put it at CXL-01), with the order number, cancel time and label-locked chip. There is no acknowledgement button. She scans CXL-01, which creates the "ยกเลิกระหว่างแพ็ค" (cancelled during packing) exception. Recording stops after this scan.
5. **Resolution.** The station returns to ① for the next job. The cancel-return job appears in ยกเลิกรอคืน (cancelled, awaiting return). The video is linked from the order detail.

**Failure.** The scale reads 6% over tolerance → full-screen `scan-blocked` "น้ำหนักเกินเกณฑ์ · รอหัวหน้าตรวจ" (weight over tolerance · waiting for supervisor check). The job is held in ผิดปกติตอนแพ็ค (pack exceptions). Part of a split pick has not arrived → she scans "รอของ" and the job parks (waiting for goods, State Patterns). Offline at close → fail closed (State Patterns).

**Pack-method variants (FR-75).** The same station runs every method. Only a Supervisor can change the method (with a reason). A Packer can only switch to multi-box, with the "ต้องใช้หลายกล่อง" command.

- **By pick list.** The first item scanned picks a matching unpacked order from the list. The job header then shows that order and the flow continues as above.
- **Multi-box.** The box progress strip shows "กล่อง n/N". "เปิดกล่องใหม่" (open a new box) closes the current box with its own weight. In-box documents go in the last box. The order cannot close until every part has arrived.
- **Production line** is deferred (PRD Q-12).

### UJ-4. Ann closes the day at handover

*Ann, handover lead for the Flash, J&T and SPX waves.* See the [handover + day close mock](mockups/key-handover-day-close.html).

1. **PDA sort (คัดแยกลงภาชนะ; design open per Q-11).** The team scans each packed parcel, then the carrier container. Each scan checks three things: packed, correct carrier, not cancelled. A passing parcel is accepted as **sorted**.
2. A cancelled parcel → full-screen `scan-reject` "ยกเลิกแล้ว · นำไปวางที่ CXL" (already cancelled · take it to CXL). It is pulled to the cancelled-goods location.
3. **Handover station (HO-NN) / PDA.** The first scan sets the handover type: a container QR means carrier handover, an order or label means customer pickup. The header shows "ยังไม่ตัดสต๊อก" (stock not yet deducted) until confirm. The Flash truck arrives. Ann registers the vehicle (plate, driver, photo) and scans **containers, not parcels**. Each container's seal is checked ("ซีล 3/3 ตรง", seals 3/3 match). The counter shows "ภาชนะ 14/14 · พัสดุ 612". A wave panel lists today's carrier waves and their load state.
4. **Tablet (default) or PDA.** The rider signs on the signature pad. A manifest preview shows the split by shop account.
5. **Climax.** "ยืนยันส่งมอบ 14 ภาชนะ" (confirm handover of 14 containers) → stock is deducted (shipped) and the manifest prints. The carrier receipt reconciles per parcel, and the hub shows Flash = success.
6. **Resolution (22:00).** ค้างส่งมอบ & ปิดวัน (pending handover & day close) shows the day-close checklist with "เหลือ 2 รายการ" (2 items left). The FR-91 checks are: all waves closed, all cancellations pulled, leftovers counted by scan, every not-found parcel has a case owner, every carrier-refused parcel inspected. Each failing row links to its fix, and the close button stays disabled with its reason. She resolves both and closes the day, which takes a snapshot. Leftovers carry over (neutral "ยกไปวันถัดไป", carried to next day) with their original pack date.

**Failure.**
- A parcel goes into the wrong carrier container → `scan-reject` "ผิดขนส่ง · ใส่ภาชนะ SPX" (wrong carrier · put it in the SPX container).
- **Seal mismatch** → full-screen `scan-reject`, then the station enters "ค้นหาในภาชนะ" (search the container) mode: every parcel in the container is scanned, and the container is resealed (FR-87).
- **Cancelled parcel in a loaded container.** The pull-out panel lists parcels to pull, split into system-cancelled and carrier-scan-failed, with "ดึงแล้ว n/m" (pulled n/m). The container cannot be handed over until they are pulled, and pulling from a sealed container needs a new seal (FR-86).
- **No proof of handover** (no signature or photo) → the manifest is tagged `warning` "รออนุมัติ · ไม่มีหลักฐานส่งมอบ" (pending approval · no handover proof) and goes to a second person for approval. The requester cannot approve it (FR-88).
- **Containers not scanned at confirm** → confirm covers the loaded containers only, and the rest split off to ค้างส่งมอบ (FR-87).
- Offline during sort → fail closed (the cancellation check needs live data).

**Handover modes.**
- **Carrier-refused ("ขนส่งไม่รับ").** Ann scans each refused label, then the CXL location (FR-94). A matched parcel waits for return. A parcel the carrier knew about first is removed from the manifest pending verification. A label from another wave → full-screen `scan-reject`.
- **Customer pickup (FR-89).** Ann verifies the collector's ID (photo kept 90 days). One appointment covers several orders and gets one manifest. Confirm is enabled only when every box is scanned. A no-show 30 minutes after the appointment returns the goods to the pickup point.

### UJ-5. Dao processes a carrier's return drop-off

*Dao, returns clerk at a camera station.* Spine-only (no mock).

1. **Return receipt station (full-screen).** J&T drops 40 parcels. She opens one return receipt (RT) for the drop-off and scans every label. The counter shows "38/40", with breakdown counters (failed delivery · buyer return · not found) over the recent-scans list.
2. **Notices, not interruptions** (FR-99). Each of these marks its row in the recent-scans list, sounds a low beep and shows a scan notice. She keeps scanning.
   - A Flash label → row "ไม่ได้บันทึก" (not recorded), notice "ไม่ใช่ของ J&T รอบนี้" (not part of this J&T drop). A setting can make this warn-only (FR-99).
   - A label scanned twice → row "รับคืนแล้ว · ไม่เพิ่มยอด" (already received · count unchanged).
3. **Buyer-return label with a new tracking number.** The station asks for the match step "จับคู่": she scans the original label or order, or the "ไม่มีเลขเดิม" (no original number) command.
4. **Unmatched parcel.** One parcel matches no order, or has no original number → it is **accepted into return quarantine** (FR-100), the problem report (RP) is created automatically, and a notice "ไม่พบคำสั่งซื้อ · ส่งเข้ากักกันตีกลับ" (no matching order · sent to return quarantine) shows. She keeps scanning. The parcel is never stocked and never discarded automatically.
5. **Close.** The driver signs on screen, and the return receipt closes (FR-99).
6. **Inspection station (ตรวจสภาพ).** For each unit she picks one of six grades (FR-101) by tapping a large toggle or scanning the grade QR: สภาพดี (good) / ชำรุดเสียหาย (damaged) / รหัสสินค้าผิด (wrong SKU) / หมดอายุ (expired) / บรรจุภัณฑ์เสีย (packaging damaged) / ไม่ใช่ของเจ้าของสินค้า (not this owner's). Any grade other than good **requires at least one photo** (it can be taken from the recorded video) before "บันทึก" (save) is enabled. "ดูวิดีโอแพ็ค" opens the original pack video for the order. A kit missing a component or a serial mismatch blocks restock. A shipped unit that was not scanned is recorded as missing and opens a problem report.
7. **Climax.** Good units are scanned into a location (PDA or web), the accept beep sounds and they become sellable. A wrong location shows a scan notice and nothing moves (FR-102).
8. **Resolution.** Damaged and expired units go to damaged stock immediately. The problem report shows `warning` "รอ Owner Care" (waiting for Owner Care) in รายงานปัญหา (problem reports), with the owner-decision chip (answer-by date and default action).

### UJ-6. Krit cuts the pilot warehouse over from JST

*Krit, admin and warehouse manager.* Spine-only (no mock).

1. **ตั้งค่าคลัง › คลังและตำแหน่ง.** He bulk-imports zones and locations from Excel. A dry run shows row errors inline, and he fixes and re-uploads. Then he bulk-prints location QR labels.
2. **อุปกรณ์และสถานี.** He registers PDAs and stations (6-digit bind code) and runs the test buttons (beep, print, weigh, camera). Each device turns success "พร้อม" (ready).
3. **ผู้ใช้และสิทธิ์.** He creates users and roles (page × action matrix) and prints badge QRs.
4. **เครื่องมือผู้ดูแลระบบ › นำเข้าข้อมูล.** SKUs sync from Zimple OMS. He imports opening balances, which shows `warning` "รออนุมัติ" (pending approval). The manager approves in the รอดำเนินการ panel (two-step).
5. **ตรวจนับ.** A full blind count runs on PDAs. The comparison report shows ledger vs import differences.
6. **Climax: cutover check.** The gate lists every check as pass/fail. When all pass, "ส่งยอดเข้า Zimple OMS" (push stock to Zimple OMS) runs. The first live wave starts on Zimple and JST is switched off.
7. **Resolution (06:00).** The reconciliation report shows WMS = OMS (success).

**Failure.** The cutover check fails → the gate lists the failing items with links to fix them. "ส่งยอด" (push stock) stays disabled. There is no partial cutover. Rollback-to-JST UX is open (Open Questions).

## Multi-tenant & Editions

- **Brand rule.** Chrome shows the tenant logo (sidebar, PDA login, printed docs) and the Zimple product mark for the edition with "by Zimple Solution". The browser title is "{หน้า} · {คลัง} · Zimple WMS" (or Zimple Fulfillment for 3PL).
- **Tenant theming (Phase 1).** Logo (horizontal, 512px icon for PDA, document logo) and primary colour only, behind the contrast guard (DESIGN.md Colors). If the guard fails, the system falls back to the default and explains why inline. Everything else is fixed.
- **Editions.** Business vs 3PL is a company-level flag. It drives the Visibility rules and is never shown to floor users. Edition and add-on toggles live in ตั้งค่า › โมดูลเสริม.
- **Owner context (3PL).** With more than one owner, every stock and document screen shows an owner filter and column. Operational scans reject cross-owner mismatches (UJ-1 edge).
- **Support access** (FR-23). A visible banner whenever Zimple staff are in the tenant. Their actions are logged with the Zimple-support actor type.

## Permissions & Masking

- **Hide, don't disable.** Pages and actions the user cannot use are hidden. The exception is a state-based restriction (for example "approval pending" or the day-close checklist), where the control shows disabled with the reason.
- **PII** (FR-19, PRD §6.1). Buyer name, phone and address are masked on every screen, export and print preview without *view buyer PII*. Reveal is per field and logged.
- **Prices and cost.** Without the permission (FR-56, FR-3), the column or field is **absent**, not masked.
- **PDA.** Shows only permitted tiles. A role with no PDA page cannot sign in, and the PDA shows the "ไม่มีสิทธิ์ใช้ PDA" (no PDA permission) state. A day-labour card signs in with its allowed functions only (FR-22).
- **Work-point binding.** A device restricted to a work point opens only that department's tasks (FR-11).
- **Role editor** (FR-18). The page × action matrix auto-ticks dependent permissions with a visible note and shows the SoD risk flag inline.

## Localization & Dates

- **Language.** Thai by default. A per-user switch to English lives in the user menu and on the web/PDA login screens. The whole UI switches. Codes, carrier names and brand names are not translated.
- **One calendar era per user.** The user picks ค.ศ. or พ.ศ. in profile settings, and every date on every screen, export and print for that user follows it. A screen never mixes eras. Date pickers display and accept input in the user's era.
- **Document numbers** are identifiers, not dates, so they never follow the era setting (NFR-8). The format is **PREFIX + YYMM + "-" + sequence**, with Gregorian YYMM: `PL2611-0142` (pick list), `PK2611-00931` (pack job), `HO2611-0087` (handover), `OR2611-048213` (order). They render in mono.
- **Formats.** Timezone Asia/Bangkok. Short date `10 ต.ค. 2026` / `10 ต.ค. 2569`. Time 24h `14:05`. Currency `฿1,250.00`. Units kg·cm. Thai digits are never used.
- **Relative time** ("5 นาทีที่แล้ว", 5 minutes ago) appears only in feeds. Tables show absolute times.
- **Text expansion.** Labels must tolerate EN/TH length differences. No truncation on buttons. Table headers wrap to 2 lines.
- **Canonical content.** The Thai and English overviews show the same content. The prototype's divergence is not carried over.

## Responsive & Platform

| Surface | Width | Behaviour |
|---|---|---|
| Office web | ≥1440px | Full sidebar, all table columns, 5-up KPI row |
| Office web | 1280–1439px | Full sidebar, P3 columns hidden, 3-up KPI row, Sheet forms in 1 column under 1280px |
| Office web | 1024–1279px | Sidebar becomes a rail, P2–P3 columns hidden behind the "คอลัมน์" (columns) menu |
| Office web | <1024px | Supported for reading and approvals only. Sidebar becomes a `Sheet`. Not a target for heavy work [ASSUMPTION] |
| Station | ≥1366×768 | Full-screen 3-zone layout. Below 1366 the evidence column stacks |
| PDA | ~360–480px wide [ASSUMPTION; hardware open] | Single column, portrait locked, bottom-pinned primary action |
| Tablet | 768px+ | Signature pad and manifest preview only |

- **Browser.** Chrome and Edge on Windows for office and stations. Chrome-based WebView on Android PDAs.
- **Updates never block a shift.** A new version prompts "รีเฟรชเมื่อจบงานนี้" (refresh when this job ends). It applies at the end of a task or on the next login, never mid-scan (JST lesson).

## Inspiration & Anti-patterns

- **Kept from the Zimple prototype** (see `reconcile-zimple-screens.md`):
  - hub + document queues with counts per module;
  - the station layout (step strip, next-scan banner, requirement tiles, per-job checks, scanned-vs-expected, the full command chip set);
  - pack-method variants, handover modes, the waiting-for-goods park, the returns match step and recent-scans list;
  - the inline event notice under the scan field, and undo last scan;
  - PDA login edge states, lock-screen sign-out, offline/concurrency copy;
  - the notification centre as a to-do list (tasks + approvals), the ทุกคลัง switcher mode, the owner-decision deadline pattern;
  - edition/add-on tagging, now moved into ตั้งค่า only.
- **Lifted from shadcn/Radix:** the whole component vocabulary and its accessibility behaviour. Zimple adds the floor layer (scan input, feedback tiers, PDA tiles), not a custom design system.
- **Lifted from keyboard-first SaaS (Linear-style):** `Ctrl+K` command search that also takes scanner input, and URL-addressable tabs and filters.
- **Rejected (Zimple prototype audit, memlog):**
  - mixed brand names;
  - mixed ค.ศ./พ.ศ.;
  - design notes inside UI copy;
  - inconsistent status colours, and the zap / ⚡ urgent marker;
  - 10–11px type;
  - PDA buttons under 56px;
  - no empty or loading states;
  - unprioritised 13-column tables;
  - CSS-checkbox overlays without focus trap or Esc;
  - ~60-knob theming;
  - desktop chrome wrapped around PDA screens;
  - a PDA "หัวหน้า" tile group with no Phase 1 tasks.
- **Rejected (JST lessons):**
  - "ใช้ยากมาก" (very hard to use): the headline gap, answered by NFR-12 and SM-10.
  - The forced-update loop on the mobile app: answered by non-blocking updates (Responsive & Platform).
  - No data export, which creates lock-in: every list exports to Excel (FR-110), and migration import/export is first-class (FR-111–114). Data is never trapped.

## Open Questions

Not invented here. Each needs an owner decision. Working defaults are tagged [ASSUMPTION] above.

1. **PDA build: native Android vs web/PWA.** This affects offline queue design, scanner integration, vibration/sound APIs and silent printing. The working default is web/PWA on Chrome WebView [ASSUMPTION].
2. **PDA hardware.** Screen size, hardware scan trigger, camera quality (NFR-10 is [ASSUMPTION]). The width range in Responsive is a placeholder.
3. **Floor conditions.** Gloves, cold rooms (fogging and glare), noise level (whether scan sounds are audible), lighting, one-handed use. None are documented. These decide whether 56px targets, the sound grammar and the 32px station feedback headline are enough.
4. **Q-7 Warehouse rules screen.** Which of the two designs, and which defaults (2 random cartons vs all; 60 vs 30 min; 30 vs 15 min). The PRD calls this a UX decision. Not decided here.
5. **Q-11 Missing PDA designs** for putaway and sorting. UJ-1 and UJ-4 use the generic PDA task pattern (location callout → scan → feedback) as a working default [ASSUMPTION]. Dedicated designs are still owed.
6. **Q-5 Add-on status** of auto pick lists, prep and VAS in Phase 1. This affects visibility rules and the โมดูลเสริม page.
7. **Q-6 Default role set.** It drives PDA tiles and nav per role.
8. **Q-8 Count approval threshold** copy (>5 pcs / 2% / ฿2,000 vs >฿1,000).
9. **VAS work screen device** (desk tablet?).
10. **Supervisor on-the-spot approval mechanism** (badge scan at the device vs remote only) [ASSUMPTION used in UJ-1/UJ-3].
11. **Tablet pairing** for signatures from a station or web session [ASSUMPTION].
12. **Silent printing** needs a local print agent or kiosk mode. Confirm with architecture.
13. **Journeys missing** for the overview (FR-109), CS order lookup (NFR-12), the cut-off board (FR-60), draft-wave building (FR-62), count rounds (FR-47–49) and reports. These surfaces have no protagonist flow yet, so surface closure is incomplete.
14. **Multi-warehouse switcher** on day one for the pilot (NFR-11 [ASSUMPTION]). The ทุกคลัง mode is specified, but whether the pilot needs any switching is open.
15. **Cutover rollback UX** if the pilot must fall back to JST.
16. **Tenant theming** is Phase 1 per the memlog, but company & brand settings are P? in the PRD. Confirm scope.
17. **Q-15 JST UX failure cases.** No baseline yet. The palette, density and shortcut choices should be checked against pilot users before freezing.
18. **Day close sign-off.** FR-91 gates day close on a permission and the checklist. Does closing also need a second-person approval or a signature?
