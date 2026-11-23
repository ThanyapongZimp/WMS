# Reconcile: Zimple prototype screens vs. UX spines

- **Scope:** qualitative ideas and behaviours in `artifact/Zimple Fulfillment Screens (Copy)/` checked against `DESIGN.md` + `EXPERIENCE.md` (draft, 2026-11-19).
- **Method:** read `.working/extract-zimple-screens.md`, then spot-read text-only dumps (style/script/base64 stripped, nothing executed) of `overview.html`, `pda-login-menu.html`, `packing-station.html`, `handover-station.html`, `inbound-receive.html`, `returns-receive.html`, `returns-inspection.html`, `picking-pda-picking.html` and `owner-portal/overview.html`. Cross-checked against `prd.md` and `fr-candidates-outbound.md` where the prototype idea also has an FR.
- **Out of scope / not drops:** the old palette, radius and theme knobs (memlog decision), and items hidden by the Phase rule (billing, claims, owner module, planning, transport, TV mode, Client Portal).
- **Status key:**
  - **kept**: the spine carries the idea.
  - **adapted**: the spine carries it in changed form, and the change is reasonable or explained.
  - **dropped**: the idea is absent from the spines and no decision records it.
  - **contradicted**: the spine prescribes a different behaviour and no decision records it.

## Reconciliation table

### Shell, navigation, header

| # | Idea | Source file | Status | Recommendation |
|---|---|---|---|---|
| 1 | Count badges on nav items and L2 tabs | `overview.html`, every `.secnav` | **kept**, adapted to actionable-only, hidden at 0, 99+ | None |
| 2 | Hub-first module ("ภาพรวม…" tab, then document queues with counts) | all module hubs | **kept** | None |
| 3 | Warehouse switcher (Dialog, "งานที่เปิดค้างไว้ไม่หาย") | `overview.html` | **kept**. Moved from the sidebar to the header | None |
| 4 | **"ทุกคลัง (n)" aggregate mode in the switcher.** Only on pages that support it (all-warehouse stock, reports), and only warehouses the role can access | `overview.html`, every switcher modal; `inventory-all-warehouses.html` | **dropped** | Decide in Q-14. If kept, add an "ทุกคลัง" option to the switcher spec and define which pages support it |
| 5 | Sidebar KPI card ("ส่งตรงเวลาวันนี้ 97.6% · ผ่านเป้า 95%") | `overview.html` sidebar `.slacard` | **dropped**. The spine's sidebar has only logo, nav and "by Zimple Solution" | Likely a fine drop (noise). Record it as a decision, or move the metric to the overview hub only |
| 6 | Header approvals bubble "3 รออนุมัติ" + notifications bubble "5" | `overview.html` `.hbtns` | **kept** (FR-105 header count) | None |
| 7 | **Notification centre as "รอดำเนินการ"** (to-dos, not just approvals). Includes non-approval actionable items with deep-action buttons ("สร้างรอบ", "ไปที่เครื่องมือผู้ดูแลระบบ", "ตรวจวิดีโอ", "เปิดงานวัดขนาด"), a sub-filter "ทั้งหมด · รออนุมัติ · เร่งด่วน", unread dots, "อ่านทั้งหมดแล้ว" and "ดูคำขอทั้งหมด / ประวัติ" | `overview.html` / every page `#pNoti` panel | **adapted**, narrowed. The spine has tabs "รออนุมัติ / การแจ้งเตือน" only. Non-approval to-dos, the urgent filter, read state and history are missing | Decide whether the first tab is "รออนุมัติ" (approvals only) or "รอดำเนินการ" (approvals + tasks). Add unread / mark-all-read and a history link to the panel spec |
| 8 | User menu (language, PDA QR, help, password, sign out) | `overview.html` | **kept**, plus a calendar-era setting | None |
| 9 | Support-access banner shows **scope** ("สิทธิ์ ตั้งค่าคลัง › กฎงานคลัง · แก้ได้ · ส่วนอื่นดูอย่างเดียว"), helper name and task. Revoke explains the consequence | every page support dialog | **adapted**. The spine shows ticket, expiry and revoke only | Add helper name and scope to the banner or its popover (FR-23 transparency) |
| 10 | Overview content: hourly handover chart, hourly quality chart, **space-used donut**, **per-stage productivity vs target**, "ความเคลื่อนไหววันนี้" (trucks arriving, backorders, next carrier rounds), owner filter chips, date selector | `overview.html` | **dropped** (unspecified). The spine gives only the generic hub pattern (KPI row, needs-action list, queue cards, pipeline). FR-109 explicitly lists *space used* and *productivity vs target per stage* | Specify the overview hub composition in EXPERIENCE IA or Key Flows. At minimum cover the FR-109 items and the "today's activity" feed |
| 11 | "ข้อมูลเรียลไทม์ · อัปเดตทุก 1 นาที" | `overview.html` | **adapted** to "ข้อมูล ณ 10:41" + 60s refresh | None |
| 12 | Pipeline segments clickable ("กดแต่ละช่วงเพื่อเปิดรายการ") | `overview.html` | **kept** | None |
| 13 | Edition / add-on tags ("เฉพาะ 3PL", "เสริม") on nav items, tabs and H1s | `overview.html`, `claims.html`, many | **adapted**: settings-only, never on operational screens. This is a spine-internal decision with no memlog entry, and the extract §8 recommended carrying the tags into the IA | Log it to memlog as a decision (it is defensible: floor users don't need edition semantics) |
| 14 | 560px right drawer for create/edit, 2-column form, sticky footer | `inbound-create-expected.html` and 1,578 drawer uses | **kept** as a 560px Sheet | None |
| 15 | Inline `.note` callouts (icon + text on a soft fill) for operational consequences (for example "จอง Drop-off · ขนส่งเข้ารับ: สแกนเข้าใบส่งมอบรอบนี้ได้ ไม่บล็อก…") | 308 uses, e.g. `handover-station.html` | **dropped**. The spine bans design notes (correct) but defines no legitimate inline info/callout component; shadcn `Alert` is not in the used list | Add an inline Alert (info / warning) for real operational context, with a length cap. Keep the design-note ban |
| 16 | Toast as a bottom-centre dark pill, role=status | 159 files | **adapted** to Sonner (default position not stated) | State the toast position. Bottom-centre suits stations too |
| 17 | Required-field "*" marker, chip/segmented choice groups, key-value read-only blocks (`.kv`) for detail pages | `settings-company-brand.html`, `orders-detail.html` | **dropped** (no detail-page pattern; no required marker rule) | Add a short detail-page pattern (KV block + timeline + evidence) and a required-field rule. "Where is this order?" (NFR-12) depends on it |
| 18 | Settings stepped tabs "① คลังสินค้า ② โซน ③ ตำแหน่ง ④ ผังคลัง" (dependency order) | `settings-storage-warehouses.html` | **dropped**. The spine has a plain L3 Tabs row. **2026-11-23: ④ ผังคลัง restored** as a section of คลังและตำแหน่ง (FR-125, sprint-change-proposal-2026-11-23) | Consider numbered setup order for structure pages (it helps UJ-6 cutover) |
| 19 | Settings "ระบบที่ใช้" page under ตั้งค่าบริษัท (edition/add-on switches) | `settings.html` nav | **dropped**, but the spine says tags appear "on the add-on toggles". The toggles have no home in the IA | Restore a home for the add-on toggles (ระบบที่ใช้ or similar) in the ตั้งค่าบริษัท tree |

### Stations (receive, pack, handover, returns)

| # | Idea | Source file | Status | Recommendation |
|---|---|---|---|---|
| 20 | Step strip "① สแกนเปิดงาน › ② … › ③ …" | `packing-station.html`, `inbound-receive.html`, `returns-inspection.html` | **kept** | None |
| 21 | "สแกนต่อไป: …" next-scan banner | all stations | **kept** | None |
| 22 | **On-screen scan-command chips** ("สแกนแทนการกดปุ่ม · แผ่นคำสั่งวางที่โต๊ะ"), a visible list of available commands per job | `packing-station.html` `.pkcmd` | **adapted**. Scan-as-command is in Interaction Primitives and listed as "kept" in Inspiration, but DESIGN Components has no command-chip component and the list has only 4 commands | Add a "command chip row" component (chip = tappable + scannable, mirrors the printed sheet) |
| 23 | **"ลบชิ้นล่าสุด" (undo last scan)** on pack, and "ยกเลิกสแกน" on PDA pick ("ต้องเอาของคืนจริง", supervisor-configurable, logged) | `packing-station.html`, `picking-pda-picking.html`; fr-candidates-outbound FR-PAK actions | **dropped**. There is no undo-scan anywhere in the spines | Add undo-last-scan as a primitive: command QR + button, logged, and an optional physical-return confirm |
| 24 | Other pack commands: "รอของ", "แจ้งปัญหาอุปกรณ์", "ต้องใช้หลายกล่อง", "ห่อของขวัญแล้ว", "ใช้กล่องเดิม", "บับเบิ้ลเพิ่ม", "พิมพ์สติกเกอร์หมายเลข" | `packing-station.html` | **dropped**. The spine lists ปิดกล่อง / ของขาด / พักงาน / พิมพ์ซ้ำ only | Enumerate the station command set per station type (or point to the FR list) |
| 25 | **Pack-method variants on one station:** by order, by pick list (first item picks the order), multi-box (box n/N strip, "เปิดกล่องใหม่"), production line (per-label scan + random full check every n boxes) | `packing-station.html` (4 layouts) | **dropped**. UJ-3 and the station spec model one by-order flow. FR-75 *Must* includes by-pick-list and multi-box; production line is deferred | Add station variants for by-pick-list and multi-box (box progress strip, per-box weight, docs in last box). Production line can wait (deferred in the PRD) |
| 26 | **Per-job "การตรวจของงานนี้" panel** (which checks are on: scan every piece, gifts required yes/no, docs required, weight tolerance, close rule) | `packing-station.html` | **dropped** | Add to the requirement-tile zone. It explains *why* the station asks for a scan, which reduces confusion for new staff (PRD persona: day-labour) |
| 27 | **Cancellation-check freshness in the job header** ("ไม่ถูกยกเลิก · ตรวจเมื่อ 11:24:05"; handover "ข้อมูลการยกเลิกอัปเดตล่าสุด 14:21 · 1 นาทีที่แล้ว") | `packing-station.html`, `handover-station.html` | **dropped**. The spine has the pre-print re-check and fail-closed offline, but no visible freshness | Add a cancellation-status chip with a timestamp to the station job header. It pairs naturally with fail-closed |
| 28 | Yellow screen for "waiting for goods / split pick" ("ของยังไม่ครบ · วางคืนที่ TT-0218 แล้วสแกนงานถัดไปได้เลย · ของครบแล้วระบบแจ้งโต๊ะนี้") | `packing-station.html` | **adapted** into `scan-blocked`. The spine uses blocked only for supervisor-needed, and its actions are "เรียกหัวหน้า / พักงานไว้". The "put back at tote, system will notify this desk" flow is lost | Add a "waiting for goods" blocked variant: park-to-tote + auto-notify the station when complete |
| 29 | **Inline event notice under the scan field** ("ขึ้นในกล่องแจ้งใต้ช่องสแกนเฉพาะตอนเกิด": duplicate PO scan, batch print skipped already-printed) | `packing-station.html`, `inbound-receive.html` | **dropped**. The spine has 3 tiers only: accept (flash), reject (full-screen), blocked (full-screen). There is no non-blocking notice tier | Add a 4th feedback tier, "notice": an inline box under the scan field plus a low beep, no full screen |
| 30 | Park job dialog: reason list (พักเบรก / รอของ / อุปกรณ์มีปัญหา / ย้ายงาน), "ทำต่อที่จุดนี้หรือเครื่องอื่นได้", video pauses | `inbound-receive.html`, `returns-inspection.html` | **adapted**. The spine has "พักงานไว้" / F4 with no reason, no cross-device resume, no video rule | Add reason + resume-anywhere + video-pause to the park primitive |
| 31 | Station two-state: normal page until a job opens → full-screen automatically; park/close → back to normal; supervisor toggles full-screen any time | `inbound-receive.html`, `returns-receive.html` | **kept** (F11, "launched from its tab, goes full-screen") | Optionally state the auto-return to normal on park/close |
| 32 | Receiving pallet panel (open/closed pallets, "ย้ายของไปพาเลทอื่น", carton-QR print dialog with printer + template choice, add-lot dialog, "ขนาดในระบบ ✓ / แก้ = ใช้กับรอบนี้") | `inbound-receive.html` | **dropped** (UJ-1 mentions carton QR and close pallet only) | Low priority for the spine. Note it as station detail for receiving story specs |
| 33 | **Returns: live recent-scans log** (newest first; per-row result: received / duplicate "รับคืนแล้ว · ไม่เพิ่มยอด" / not handed over / wrong carrier "ไม่ได้บันทึก") + breakdown counters (failed-delivery vs buyer-return vs not-found) | `returns-receive.html` | **dropped**. The spine has the counter "38/40" only | Add a "recent scans" list component for batch-scan stations (returns, handover, sort) |
| 34 | **Returns: unmatched parcel is accepted into quarantine and scanning continues** ("ไม่พบคำสั่งซื้อยังรับได้ เข้ากักตรวจ"); low beep for duplicate / wrong carrier, row marked "ไม่ได้บันทึก" | `returns-receive.html`; PRD FR-100 | **contradicted**. UJ-5 shows full-screen `scan-blocked` for not-found and full-screen `scan-reject` for a wrong carrier | Re-align UJ-5: not-found = accept-to-quarantine (notice tier). Wrong carrier / duplicate: decide between full-screen reject and the prototype's inline row + low beep, and log the decision |
| 35 | Buyer-return new tracking number → "จับคู่" step (scan the original label/order, or the "ไม่มีเลขเดิม" QR) | `returns-receive.html`; PRD FR-99 (line 1110) | **dropped** | Add the match-original step to UJ-5 / the returns station |
| 36 | **Inspection grades: 6** (สภาพดี / ชำรุดเสียหาย / รหัสสินค้าผิด / หมดอายุ / บรรจุภัณฑ์เสีย / ไม่ใช่ของเจ้าของสินค้า), grade by QR scan or tap, photo from video, per-piece edit, link "ดูวิดีโอแพ็ค" of the original order | `returns-inspection.html`; PRD FR-101 | **contradicted**. UJ-5 step 3 lists 3 grades (ดี / ชำรุด / ผิดรหัส) | Fix UJ-5 to the 6 PRD grades. Add grade-by-scan and the pack-video cross-link (evidence chain) |
| 37 | **Handover: seal check** ("ซีล 3/3 ตรง"; mismatch → full-screen + "ค้นหาในภาชนะ" search mode, then reseal) | `handover-station.html`; PRD FR-86 | **dropped** | Add seal verification and the seal-mismatch search mode to UJ-4 / the handover station |
| 38 | **Handover: "ขนส่งไม่รับ" mode** (scan returned labels → scan the CXL location) and the cancelled pull-out panel (system-cancelled vs carrier-scan-failed, pulled n/m) | `handover-station.html`; PRD carrier-refused FR (line 1065) | **dropped** | Add a carrier-refused mode and the pull-out panel to the handover station |
| 39 | **Handover without evidence → approval** (no signature/photo = money risk; requester cannot self-approve; manifest tagged "รออนุมัติ · ไม่มีหลักฐานส่งมอบ") | `handover-station.html` | **dropped** | Add it to UJ-4 failure paths and the approvals list |
| 40 | Confirm with unscanned containers → confirm only loaded ones, split the rest to ค้างส่งมอบ | `handover-station.html` | **dropped** | Add it to the handover confirm rule |
| 41 | Handover type by first scan (container QR = carrier; label/order = customer pickup; pallet/trip = own delivery). The header shows "ยังไม่ตัดสต๊อก" until confirm | `handover-station.html` | **dropped** (customer pickup is in the PRD §9 handover scope) | Add a customer-pickup variant to the handover station |

### PDA

| # | Idea | Source file | Status | Recommendation |
|---|---|---|---|---|
| 42 | Universal scan "สแกนเลขอะไรก็ได้ ระบบเปิดงานที่ถูกต้องให้เอง" | `inbound-pda-sample.html` | **kept** | None |
| 43 | Job list filters "ทั้งหมด · ของฉัน · รอรับ" | `picking-pda-picking.html` | **adapted** to "ของฉัน / รอรับ" ("ทั้งหมด" dropped) | Minor. Keep "ทั้งหมด" for supervisors, or record the drop |
| 44 | Urgent jobs pinned on top with ⚡ + sound | `picking-pda-picking.html`, `pda-login-menu.html` | **kept** | None |
| 45 | Progress "จุดที่ 3/12 · 25/71 ชิ้น" and large current location | `picking-pda-picking.html` | **kept** (location callout 36px mono) | None |
| 46 | Pick-line actions "ของไม่พอ / ข้ามไปก่อน / ยกเลิกสแกน" | `picking-pda-picking.html` | **adapted**. Short / finish-later is kept. Undo is dropped (see #23) | See #23 |
| 47 | Offline strip "รอส่ง n รายการ · สัญญาณหลุด ส่งให้เองเมื่อกลับมา", no resend button | `picking-pda-picking.html` | **kept** | None |
| 48 | Concurrency "ยอดเปลี่ยนแล้ว สแกนใหม่" | `picking-pda-picking.html` | **kept** | None |
| 49 | Success `.okline` text confirming *what* matched ("ล็อต L2407 ตรงกับที่จัดสรร") | PDA samples | **adapted**. Accept is flash + beep + counter with no confirming text | Allow an optional one-line confirmation on accept where the match is non-obvious (lot, serial) |
| 50 | PDA home tiles with **two live counts** ("รถมาถึง 2 · รอจัดเก็บ 4") | `pda-login-menu.html` | **adapted** to a single live count | Allow up to 2 sub-counts per tile |
| 51 | "Selected tile = department I'm working in now" (labour attribution); home header shows shift and clock-in time ("กะเช้า · เข้างาน 08:02") | `pda-login-menu.html` | **dropped** | Confirm whether work-point attribution (FR-11) needs this. Otherwise record the drop |
| 52 | "หัวหน้า" tile group = สแกนเข้าจุดงาน, สุ่มตรวจ · สุ่มสังเกต | `pda-login-menu.html` | **contradicted**, internally. The spine keeps the "หัวหน้า" group, but its prototype contents are planning/QC items that PRD §9 puts out of Phase 1, and the spine lists no Phase 1 tasks for it | Define Phase 1 supervisor tiles (for example on-the-spot approvals) or drop the group |
| 53 | PDA login states: unknown badge, **overnight day badge** ("บัตรรายวันค้างคืน"), **already signed in on another PDA** (names the device and time), username/password fallback ("ไม่ถาม OTP บน PDA"), "ไม่มีบัตร? ลงทะเบียนบัตรรายวันกับหัวหน้า", warehouse picker for multi-warehouse accounts | `pda-login-menu.html`; PRD FR-22 | **adapted**, partial. The spine has badge QR + optional PIN and "ไม่มีสิทธิ์ใช้ PDA" only | Add the login error-state set and the day-labour badge path (FR-22 is Must) |
| 54 | Lock screen "ไม่ใช่นิด? ออกจากระบบ" (hand-over of a shared device) | `pda-login-menu.html` | **dropped** (the spine lock is badge-rescan only) | Add a "not you? sign out" escape on the lock screen |
| 55 | PDA footer "ล็อกจอ / ออกจากระบบ" | `pda-login-menu.html` | **adapted** into the top-bar overflow | None |
| 56 | "PDA ไม่มีกล้อง · ถ่ายรูปด้วย PDA ได้" | `inbound-pda-sample.html` | **kept** | None |

### Owner portal, billing, claims (Phase 2; checked for patterns only)

| # | Idea | Source file | Status | Recommendation |
|---|---|---|---|---|
| 57 | Owner-portal IA (ภาพรวม · คำสั่งซื้อ · สินค้า · งานคลัง: คำขอจากคลัง, … · บัญชี & ตั้งค่า), same shell | `owner-portal/overview.html` | Deferred by the Phase rule. The spine is silent on its structure | Record the prototype IA as the Phase 2 baseline in Open Questions, so it isn't lost |
| 58 | **"รอตัดสินใจ" decision list with an answer-by deadline and a default action** ("05/11 · ปิดเอง"). Owner decisions on damaged goods, PO close, return verdicts, VAS approval | `owner-portal/overview.html` | **dropped**. Phase 1 has warehouse→owner decisions (UJ-5 "รอ Owner Care", PO close) with no deadline/default pattern on the warehouse side | Add a "waiting on owner · deadline · default action" status pattern for Phase 1 queues |
| 59 | Account-suspended banner (owner side) and "ระบบนี้มีเฉพาะงานที่ OMS ของคุณทำไม่ได้" scope line | `owner-portal/overview.html` | Deferred (Phase 2) | None now |
| 60 | Claims bucket cards ("ยังไม่มีผู้รับผิดชอบเคส", "ค้างเกิน 2 วัน") and case age red after 2 days | `claims-jobs.html` | **adapted** generically (queue card + danger overdue chip, FR-108) | None |
| 61 | Billing in B.E., 13-column table | `billing-summary.html` | Rejected as an anti-pattern (memlog) | None |

## Dropped qualitative ideas worth surfacing

Ordered by impact on Phase 1 Must scope.

1. **Pack-method station variants** (#25). By pick list and multi-box are FR-75 *Must*, but the spine models only by-order packing.
2. **Handover station depth** (#37–41): seal check and mismatch search mode, carrier-refused mode, pull-out panel, no-evidence approval, partial confirm splitting to ค้างส่งมอบ, customer-pickup variant. Several of these are explicit PRD FRs.
3. **Returns contradictions** (#34, #36): unmatched parcels should be *accepted into quarantine* (not blocked), and inspection has 6 grades, not 3. Also the buyer-return match step (#35) and the recent-scans log (#33).
4. **Undo last scan** (#23, #46), on stations and PDA. It is absent everywhere.
5. **A non-blocking "notice" feedback tier** (#29, #34) between accept-flash and full-screen reject/blocked. Without it, the spine over-uses full-screen interrupts.
6. **Cancellation-check freshness chip** in the station header (#27). It makes fail-closed legible.
7. **Per-job rules panel "การตรวจของงานนี้"** (#26) and the full **on-screen command chip set** (#22, #24).
8. **PDA login edge states + day-labour badge path** (#53, #54). FR-22 is Must.
9. **Overview hub composition** (#10). FR-109 space-used and productivity-vs-target are unspecified, as is the today's-activity feed.
10. **Notification centre scope** (#7): "รอดำเนินการ" (tasks + approvals) vs approvals only; unread state; history.
11. **"ทุกคลัง" aggregate mode** in the warehouse switcher (#4). Fold it into Q-14.
12. **Waiting-on-owner deadline/default-action pattern** (#58), plus a legitimate **inline Alert** (#15) and a **detail-page pattern** (#17).
13. **Housekeeping:** log the tags-in-settings-only decision to memlog (#13). Give the add-on toggles an IA home (#19). Resolve the empty "หัวหน้า" PDA group (#52).
