---
title: "UX extraction — product facts (Zimple Fulfillment, Phase 1)"
created: 2026-11-19
sources:
  B   = briefs/brief-WMS-2026-11-19/brief.md
  BA  = briefs/brief-WMS-2026-11-19/addendum.md
  P   = prds/prd-WMS-2026-11-19/prd.md
  PA  = prds/prd-WMS-2026-11-19/addendum.md
  RB  = prds/prd-WMS-2026-11-19/reconcile-brief.md
  FI  = prds/prd-WMS-2026-11-19/fr-candidates-inbound-stock-setup.md
  FO  = prds/prd-WMS-2026-11-19/fr-candidates-outbound.md
  XS  = prds/prd-WMS-2026-11-19/extract-screens.md (consulted only for visual/theme/device facts the PRD points to)
  R   = research/competitive-jst-erp-2026-11-19/research.md
  M   = artifact/Zimple Fulfillment Screens (Copy)/ (mockup HTML, checked only for <script>/<link> tags and zwms-theme.js)
rule: every fact cited as [source §section]. Nothing invented. "[ASSUMPTION]" = the source's own tag.
---

# 1. Product summary, stakes, market/language

**Summary.**
- Zimple Fulfillment = WMS for Thai e-commerce fulfillment (Shopee, Lazada, TikTok Shop sellers), ~30,000 orders/day per warehouse, peaks on 11.11 [B §Exec Summary, §The Problem; P §1].
- Displacement target = JST (JST ERP, Thai arm of Jushuitan) [B §Exec Summary; R §Executive summary].
- Phase 1 = WMS core at JST parity + 2 JST gaps (pre-handover **sorted** state; hold cancelled orders for return) so the company's own warehouse (pilot) leaves JST entirely [P §0, §1; PA §B.2].
- Nothing built; exists as ~161 HTML mockups (141 warehouse + 20 owner-portal) [P §0; XS header]. Mockups are "visual and interaction reference" [P §0]; every PDA mockup is "reference-only" [PA §G; P Q-11].
- WMS is downstream of an OMS (pilot: **Zimple OMS**); WMS never creates/edits/cancels orders, can only hold [P §4.1, §6.2; PA §B.1].

**Stakes / business model.**
- Sold product, not internal tool: "a WMS product sold to warehouses (not internal tool)" [B .memlog (change)]. Buyers: (1) brand owners running own warehouse, (2) 3PL providers [B §Who This Serves].
- Segment 1 first; pilot = company's own warehouse (Business edition) [B §Who This Serves; PA §C].
- Two editions on one codebase: **Zimple Fulfillment (3PL)** multi-owner vs **Zimple WMS (Business)** [PA §C; XS §0].
- Multi-tenant SaaS implied: vendor Zimple Solution serving tenant (mock tenant "Fullfeel Fulfillment"); Zimple support access needs MFA [XS §5.6 "Multi-tenant SaaS (vendor Zimple serving tenant Fullfeel) is a platform concern separate from multi-owner"; P FR-23].
- Who pays: warehouse operator; pricing planned to mirror JST (license + other fees), so cost is not the switch reason [B §What Makes This Different]. User cap by license package [P FR-17]. Add-on modules switched on per company/warehouse [PA §C].
- PRD memlog: "Stakes assumed launch-grade" [P .memlog (decision)]. Brief memlog: "internal build stakes, not investor pitch" (re: brief purpose) [B .memlog].
- Headline differentiator is UX: "Modern, easy UX. This is the headline promise against JST… more modern, more attractive, and simpler to use than JST." [B §What Makes This Different]. "No technical moat" [B; P §1].
- Timeline: Phase 1 = 2 months, small team [B §Scope, §Key Risk]; 114 FRs flagged as large [P §9.2 NOTE FOR PM].

**Market / language.**
- Thai market [B; P §1].
- "Thai is the primary UI language, and English is available." Gregorian YY in doc numbers; dates in user's locale [P NFR-8].
- Glossary gives Thai UI labels in parentheses "where floor staff will see them" [P §3].
- Web sign-in has TH/EN switch [FI AC-1]. System default language TH/EN with per-user override; timezone Asia/Bangkok; currency THB; date format ค.ศ./พ.ศ. selectable; units kg·cm [XS §F.12].
- EN and TH overview mockups show different content (open) [PA §G; FI OQ-9].
- Mockup source doc (feature inventory) is in Thai [B .memlog (event)].

# 2. Personas / roles

## 2.1 Role names (exact)
- **PRD §4 actor list:** Admin, Warehouse Manager, Supervisor, CS, Owner Care, Receiver, Putaway staff, Picker, Sorter, Packer, Handover staff, Returns staff, Stock staff, System [P §4 intro]. Also: Planner [P FR-62], Prep staff [P FR-83], Counter [P FR-48].
- **JTBD personas:** Warehouse manager; Supervisor; Floor staff (receiver, putaway, picker, sorter, packer, handover, returns, stock); New or day-labour floor staff; CS / office; Admin; Company (as goods owner) [P §2.1].
- **Default roles named:** Warehouse Head, Handover Lead [ASSUMPTION]; System Administrator (locked, all rights) [P FR-18]. Mockups: 11 roles; approval matrix names หัวหน้าคลัง, หัวหน้าส่งมอบ not in role list [XS §0.1 #8; FI OQ-1; P Q-6].
- **Special roles:** day-labour card holders (บัตรรายวัน) [P FR-22]; Zimple support staff (ทีมดูแลลูกค้า Zimple), always MFA [P FR-20, FR-23; XS §5.5]; carrier pickup staff / rider sign manifest [BA §Actors; P UJ-4].
- **Brief actor list (broader):** office — admin, supervisor, CS, executives, accounting, purchasing, HR, QC, transport supervisor; floor — receiving, putaway, picking, sorting, packing, VAS, handover, returns, stock; Client Portal (P2) — owner admin, owner team users, owner accounting; drivers (Later) [BA §Actors].
- **Non-users Phase 1:** owners' staff at 3PL clients; drivers; purchasing/HR planners; accounting for billing ("may read reports") [P §2.2].
- Executives & QC absent from PRD without rationale [RB G8]; accounting role unclear [RB G2].

## 2.2 Goals (JTBD quotes, P §2.1)
- Warehouse manager: "Run the day's volume so every order makes its carrier wave. Know before a wave is missed, not after."
- Supervisor: "See where work is stuck… Unblock it with the authority I have, and leave an audit trail."
- Floor staff: "Scan, get a clear yes or no, move on. Make mistakes impossible to commit, not something to catch later."
- New/day-labour: "Be productive on my first shift without learning a complicated system."
- CS/office: "Answer 'where is this order?'… with evidence (timeline, video, manifest) in under a minute."
- Admin: "Set the warehouse up once… change rules safely, with effective dates and history."
- Company as owner: "Trust that stock in the WMS equals stock on the shelf and in the OMS."

## 2.3 Devices / surfaces per role
- Three Phase 1 surfaces: **Warehouse web** (supervisors, CS, accounting, purchasing, admins); **PDA screens** for every floor task (receive, putaway, pick, sort, pack, handover, count, return); **Packing and handover stations** bound to printers and scales [B §The Solution]; stations also bound to cameras [P §1].
- Office users "ใช้คอม" (desktop); floor = PDA handheld with scanner (PDA-NNN), QR badges; wall TV; pack-station camera [XS §5.5].
- PDA: rugged Android with built-in scanners [ASSUMPTION]; USB/HID scanners; 80 mm thermal & label printers; A4 printers; USB/serial scales; IP cameras [P NFR-10]. PCs are Windows, bound to a table by 6-digit code [XS §F (IT devices); P FR-11].
- "A warehouse with no PDAs can run every flow on the web" [P NFR-10, FR-35, FR-44].
- Receiving: desktop receiving station with camera, "full-screen mode like pack station" OR PDA (photos only, no video) [XS §A inbound-receive; P FR-35; FI §1.3]. UJ-1 Somchai works "a desktop receiving station with a camera" [P UJ-1].
- Packing: station PS-NN with PC, scanner, label/receipt/A4 printer, scale, camera [FO FR-PAK-12; P UJ-3]. PDA packing also exists (camera priority IP→built-in→none) [P FR-80].
- Handover: PDA (scanner-first, "ใช้เครื่องสแกนอย่างเดียว"), signature on PDA or tablet (tablet = default in mockup) [XS §C handover devices, §F "default tablet"; P FR-88].
- Returns: camera station (full-screen), driver signs on screen [P UJ-5, FR-101; XS returns-receive].
- Supervisor: toggles full-screen on station screens [XS §A, §D returns].
- VAS work screen device unsettled — "may be a desk tablet" [BA §Design Gaps; PA §G].
- Wall TV (TV mode) = Later [B §Scope; P §8]. Cut-off board is web; wall-TV rendering out of scope [P FR-60].
- Driver app = Later; Client Portal = Phase 2 [B §Scope].

## 2.4 Environment
- Sources state: high volume, spiky (30k/day, 11.11) [B §The Problem]; temperature-controlled rooms exist (putaway priority; 30 min alert) [P FR-37; FI IN-18]; day-labour/temporary workers [P FR-22]; sound alerts + red screens [P NFR-9].
- **Not stated anywhere:** gloves, noise level, lighting, sunlight/cold-room glare, one-handed use, PDA screen size. (Gloves appear only as a consumable item [P FR-28].) → gap §8.

# 3. Named journeys (P §2.3 — protagonists "illustrative [ASSUMPTION]", not interviewed users)

**UJ-1. Somchai receives a truck that doesn't match its notice.** Inbound receiver, desktop receiving station with camera. Entry: truck 10:20, ASN says 30 cartons.
1. Opens temporary receipt for vehicle, counts 28 outer cartons, photographs shortfall, takes sender's on-screen signature.
2. Scans ASN to open receiving; scans one item to select SKU.
3. Counts by carton pattern; enters lot + expiry; system computes remaining shelf life.
4. Lot below min shelf life → screen asks supervisor confirmation.
5. Prints carton QR labels, closes pallet → creates putaway task.
- **Climax:** putaway staff scan suggested location on PDA; stock → sellable; waiting orders reserved immediately.
- **Resolution:** receipt closes with short/damaged summary to Zimple OMS. **Edge:** another owner's SKU → red screen rejects.

**UJ-2. Nok picks a batch on 11.11 when a location comes up short.** Picker, second week, PDA.
1. Claims pick list from shared queue. 2. Scans cart; snake route, scanning location + items.
- **Climax:** stop 14 holds 2 not 5 → taps "short" → system offers alternative location; else urgent replenishment, line moved to end of list.
- **Resolution:** replenishment completes, line flips to "pickable"; drops cart at staging; no auto-adjust. **Edge:** nothing found → urgent blind count; order "insufficient stock" until supervisor approves variance.

**UJ-3. Ploy packs an order that was cancelled while she worked.** Packer at station PS-04 (scanner, scale, label printer, camera).
1. Scans pick list QR; job opens, video starts. 2. System suggests box; she scans it. 3. Scans every piece; weight vs tolerance.
- **Climax:** right before label prints, re-check finds buyer cancelled 40 s ago → label printing locked, "cancelled during packing" exception, goods to cancelled-goods location.
- **Resolution:** cancel-return job exists; video shows what happened. **Edge:** scale 6% over → held for supervisor inspection.

**UJ-4. Ann closes the day at handover.** Handover lead for Flash, J&T, SPX waves.
1. Team sorts packed parcels into carrier containers; each scan checks packed / correct carrier / not cancelled (the **sorted** state JST lacks).
2. Cancelled parcel → red screen, pulled to cancelled-goods location.
3. Flash truck arrives: registers vehicle, scans containers (not parcels).
4. Rider signs on PDA; manifest splits by shop account.
- **Climax:** handover confirm deducts stock; carrier receipt reconciled per parcel.
- **Resolution:** 22:00 day-close checklist "2 items left" → resolves both, closes day; leftovers carry over.

**UJ-5. Dao processes a carrier's return drop-off.** Returns clerk at a camera station.
1. J&T drops 40 parcels; one return receipt; scans every label; Flash label rejected.
2. One parcel matches no order → return quarantine + automatic problem report.
3. Inspects each unit (good/damaged/wrong SKU); photos required for anything not good.
- **Climax:** good units sellable when scanned into location. **Resolution:** damaged units in damaged stock; problem report awaits Owner Care.

**UJ-6. Krit cuts the pilot warehouse over from JST.** Admin + warehouse manager.
1. Bulk-imports zones/locations. 2. Registers PDAs, stations, printers; tests each. 3. Creates users, prints badge QRs. 4. SKUs sync from Zimple OMS; imports opening balances (needs approval). 5. Full blind count; compares ledger vs import.
- **Climax:** stock pushed to Zimple OMS; first live wave on Zimple while JST switched off. **Resolution:** 06:00 reconciliation shows WMS = OMS.

Other sample names in mockups (not PRD protagonists): returns staff สมพร, นิด, มณี; putaway บอย [XS §D returns roles]. Sample warehouses คลังบางเขน, คลังสายไหม; sample owners BeautyNara, HealthyMe, Mommy Care, Siam Herb, Pet Lover, NatureBox [XS §A].

# 4. Modules / capabilities → implied surfaces

Phase tags: P1 / P2 / Later / P? per [BA §How to read the phase tags]; PRD resolves P? via JST-parity rule [PA §B.5; P §9]. Mockup page counts from [BA §Module Inventory].

| Module | Phase | Implied surfaces (source) |
|---|---|---|
| OMS & carrier integration | P1 | Failed-sends queue; force-push stock; daily 06:00 reconciliation report; carrier mapping alerts [P FR-1–7] |
| Warehouse setup | P1 | Warehouse/zone/location CRUD + bulk + QR print; doors/staging (off by default); containers registry + live usage; devices & stations (bind, test, status); warehouse rules hub (by stage, effective date, history, level badge, "must set before use", diff-from-default filter); pickup rounds; doc numbering; calendar [P FR-8–16] |
| Users, access, sign-in | P1 | Users, roles (page × action matrix), special permissions, web login (+OTP), PDA badge login (+PIN), PDA home tiles with live counters, day-labour cards, support-access banner [P FR-17–23; FI AC-1–4] |
| Products & materials | P1 | SKU (OMS fields read-only; owner vs measured vs used values; data-issue counts), units/barcodes, lot/expiry/serial config, serial trace, kits, packaging items [P FR-24–28] |
| Inbound (9 pages) | P1 | Expected-arrival queue; warehouse-created ASN; temporary receipt (signature, photos, 2-part slip print); unmatched parcels; receiving station (full-screen, video) + PDA receiving; carton QR labels; exceptions; putaway queue + PDA putaway confirm; receipt close & search [P FR-29–39; FI §1] |
| Inventory (21) | P1 (layout map, temp log, transfers → Later) | Stock by SKU/location/lot; ledger; reversal request; moves (PDA/web 3-scan; print move sheets); material issue; replenishment queue; count rounds + PDA counting + resolution/approval; damaged/disposition; inventory dashboard [P FR-40–55; P §9.2] |
| Orders (5) | P1 | Order list w/ stage buckets + search; order detail (lines, pick lists, pack record, video link, timeline); hold/release; owner change requests; **cut-off board** [P FR-56–60] |
| Picking (10) | P1 | Pick rules (versioned, approval); draft wave builder (recommended/manual, split/merge, countdown lock); auto pick lists (add-on per mockups, P1 per brief); pick queue; PDA picking (snake route, short flow, empty-location confirm); staging; put-wall sorting; picking overview [P FR-61–74] |
| Packing (8) | P1 | Pack station (scan-verify, box suggestion, weight, label, video); 4 pack methods; exceptions queue; station routing/reassign; pre-pack prep (add-on/P1); minimal VAS [P FR-75–84] |
| Handover (7) | P1 | Sort to container (PDA); container close/seal; vehicle loading + confirm; manifest + signature; customer pickup; handover overview; day close checklist [P FR-85–91] |
| Cancellations | P1 | Red screens at every scan point; carrier-rejected labels; cancel-return job (PDA); restock containers [P FR-92–97] |
| Returns (8) | P1 | Expected returns; return receipt station (driver signature); quarantine; inspection station (grade, photos, video); restock; problem reports; return job board [P FR-98–104] |
| Approvals / notifications / audit | P1 | Approval inbox + header pending count; notification settings (in-app/LINE/email); activity log (filter/export); overdue alerts [P FR-105–108] |
| Overview & reports (3) | P1 (TV mode Later) | Real-time overview (1-min refresh, clickable pipeline); 8 Phase 1 reports w/ data-as-of, filters, Excel export, schedule, saved views, drill-down [P FR-109–110] |
| Migration & cutover | P1 | Opening-balance import (Excel, approval, row errors); structure import (dry-run); attribute import; cutover check gate [P FR-111–114] |
| Claims (5) | P2 | — [BA; P §8] |
| Owners (4), Billing (6), Client Portal (20 files) | P2 | — [BA; P §8] |
| Purchase (7), Planning (7), Transport (6) + driver app | Later | — [BA; P §8] |
| TV mode, theme tool, doc template designer | Later | — [B §Scope; P §8] |
| Company & brand settings | P? | Name/logo on printed docs not covered by any FR [reconcile-feature-inventory per XS F.12; PA] |

Add-ons (toggle per company/warehouse): workforce planning, pre-pack prep & materials, automatic pick lists, transport, VAS, temperature [PA §C]. Mockups mark add-on pages with banner "หน้านี้เป็นโมดูลเสริม · บริษัทที่ไม่ได้เปิดโมดูลนี้จะไม่เห็นเมนูนี้" (hidden menu if not enabled) [XS §0]. Business edition hides owner/billing/claims menus [XS §0.1].

PDA home tile groups: Receive–Putaway; Inventory (move/replenish, issue materials, count, cancel-restock); Pick–Pack–Ship; Supervisor. Header shows user, shift, warehouse [FI AC-3].
Universal scan on PDA: scanning any code opens the correct task (parcel = sort, container = handover); urgent tasks on top with sound [XS §C handover].

# 5. NFRs touching UX

**Performance / latency**
- Scan accept/reject feedback ≤ 500 ms p95 at peak [ASSUMPTION]; label prints within 2 s of last verification scan [ASSUMPTION] [P NFR-2].
- 30k orders/day; 11.11 = 3× [ASSUMPTION] [P NFR-1]. Overview refresh every 1 min [P FR-109].
- Draft-wave orders reserved to planner for a countdown (e.g. 10 min) [P FR-62].

**Offline**
- PDA picking, counting, moves queue scans offline, sync without duplicates; scans needing live data (cancellation checks at pack/sort) fail closed with clear message [P NFR-3; FR-48, FR-67].

**Floor usability**
- Every floor task by scanning + minimal numeric entry; rejections = full red screen + sound; new staffer completes pick list, pack job, putaway unaided after one supervised shift [ASSUMPTION] [P NFR-9; SM-7].
- Blind counting: never a "confirm system quantity" button [P FR-48].
- Entering more than required blocked; less prompts "short or later?" [P FR-67].
- Mandatory scan steps cannot be turned off (scan start/close, every piece, serial, cancellation check) [P FR-76].
- Idle PDA locks; unlock by rescanning own badge [P FR-21].

**i18n** — Thai primary, English available; Gregorian YY; locale dates [P NFR-8]. Thai UI labels/status wording in catalogues [PA §A].

**Accessibility** — No WCAG/a11y requirement anywhere in sources. Only related facts: font size normal/large, "PDA auto-large"; theme contrast check blocks unreadable themes [XS §F.12].

**Multi-tenant / branding**
- Company theme: system theme (not editable) + up to 5 company themes; status colours fixed; applies to web, PDA, station screens; logos (horizontal, 512 icon for PDA/tab, doc logo); "by Zimple Solution" always shown [XS §F.12]. But theme tool is Later / non-goal [P §8]; company & brand is P? [BA Settings table].
- Owner picker hidden when only one owner [ASSUMPTION] [P §4.16].
- Owner-portal white-label (custom domain) = 3PL/P2 [XS §F.12].

**Permissions / RBAC**
- Page × action matrix (view, do, use on PDA, create/edit, cancel/delete, approve, print, export) + zone/work-point/data scope; dependent permissions auto-ticked; SoD risk flag [P FR-18].
- Special permissions incl. view buyer PII — without it phone/address masked on every screen and export [P FR-19; §6.1].
- Order prices visible only with permission [P FR-56]. Product cost only with *view product cost* [P FR-3].
- PDA shows only permitted tiles; role with no PDA page cannot sign in [P FR-21].
- "Restrict work by work point": device opens only that department's work [P FR-11].
- Server-side enforcement; warehouse-scoped data [P NFR-7]. Warehouse switcher top-left [FI AC-1]; multi-warehouse switch [P NFR-11].
- Support access: banner while active [P FR-23].

**Notifications** — in-app, LINE, email; some types can't be turned off; users can mute LINE/email but never in-app [P FR-106]. Pending-approval count in header [P FR-105]. Cut-off alerts 60 and 15 min before pack cut-off [P FR-60]. Overdue alerts per stage SLA [P FR-108]. Urgent replenishment: top of PDA queue with sound + zone printer [P FR-46]. Mockups: 77 notification types, 47 approval types [XS §0.1 #7].

**Audit** — immutable activity log (actor incl. automation/OMS API/Zimple support, device, old→new, reason), filter + export, ≥1 yr [P FR-107]. Every setting shows level + effective date + history [P FR-12]. Every PII view/export logged [P §6.1].

**Dark mode** — not mentioned in any source.

**Scanner / input modalities** — QR badge login; barcode/QR for location, container (permanent QR), carton QR, pallet QR, unit barcodes, serials; signature on screen (PDA/tablet/station); photos (PDA camera); video (station IP camera); scale auto-fill (typed = logged manual) [P FR-11, FR-21, FR-25, FR-33, FR-77, FR-80, FR-88]. Container-first or parcel-first sort, switchable [P FR-85]. "Damaged" QR scan-sequence [P FR-53].

**Printing** — location QR labels bulk [FR-8]; container labels [FR-10]; carton QR + reprint with reason [FR-34]; TM 2-part slip on desk or mobile printer [FI IN-4]; badge QRs [UJ-6]; system SKU QR [FR-25]; move sheets [FR-44]; shipping label + in-box docs (receipt/tax invoice, warranty, B2B docs, content list), batch print unprinted only, reprint needs supervisor approval [FR-78]; pick-list print status (unprinted/printed/reprint #n "copy") [FR-66]; manifest [FR-88]; urgent replenishment prints at zone printer [FR-46].

**Privacy (PDPA)** — PII masked by default; retention: video 60 d, collector ID photos 90 d, day-labour phone 90 d [P §6.1]. TV never shows prices/amounts/recipient data; no individual ranking [XS §4.4] (TV = Later).

**Evidence** — video must continue through label printing and show that order's label; "no video" warning shown once and work continues [P FR-80].

# 6. Explicit UI / visual / brand statements

- **Frontend stack / UI library: NOT stated in any planning doc.** No React/Next/Tailwind/shadcn/Flutter mention in B, BA, P, PA, RB, FI, FO, R (grep confirmed).
- Mockups (M) are static HTML: they load only `zwms-theme.js` (generated by `_design_scripts/build_theme_runtime.py`) and Google Fonts **IBM Plex Sans Thai** (400/500/600/700); no framework scripts found [M packing-station.html, pda-login-menu.html].
- Fonts offered in company settings: IBM Plex Sans Thai (default), Noto Sans Thai, Sarabun, Prompt, Kanit; size normal/large; PDA auto-large [XS §F.12].
- Status colours fixed across themes: **green** normal/done, **yellow** wait/warn, **red** urgent/abnormal, **grey** closed [XS §F.12].
- Mockup theme presets (zwms-theme.js names): "Zimple Fulfillment เมนูเข้ม" (dark menu), "สะอาดตา พื้นขาว", "น้ำเงินสด", "คราม", "เขียวหัวเป็ด", "อุ่น", "เทาเข้ม", "คอนทราสต์สูง" (high contrast). Most frequent non-white hexes: #12305e, #2e5fac, #e8f0fb, #c8d6ec, #5fcbf5 (navy/blue family) [M zwms-theme.js — raw token counts, not a stated palette].
- Theme-tool viewport presets: 1280×800, 1366×768, 1440×900, 1920×1080, mobile 390×844 [XS §F.12].
- Red full-screen + sound for rejects [P NFR-9]; "red screen" used throughout (FR-21, 36, 76, 85, 94).
- Station screens have full-screen mode (receiving like pack station; returns) [XS §A, §D].
- Brand naming: product "Zimple Fulfillment" by **Zimple Solution**; mock tenant "Fullfeel Fulfillment"; family Zimple OMS / Purchasing / WMS / Accounting [XS §A, §5].
- RB G1 proposed (not adopted) NFR-12: "modern and attractive visual design; one design system shared across web, PDA and stations; few clicks for common office tasks; consistent states and empty states; Thai-first typography" + SM-10 SUS/CSAT vs JST [RB G1]. G2 proposed: CS answers "where is this order?" < 60 s; supervisor overview → blocked item ≤ 2 clicks [ASSUMPTION] [RB G2].

# 7. Inspiration & anti-patterns (JST research)

- **Ease of use is JST's gap; WMS depth is its moat.** "A newcomer competing on 'modern UX' attacks a weakness" [R §Cross-dimension insights].
- Only first-hand Thai voice: Jster app 3.0★/32 ratings; 4 reviews = forced-update loop (single bad release); 1 review ~17 Nov 2026 "ใช้ยากมาก" (very hard to use) [R §4].
- Competitor/affiliate claims: JST harder to use than BigSeller [R §4 ref 14]; WMS "basic" below top tier [R ref 21].
- JST does: FEFO pick priority, PDA zone picking with start-location scan, stock count, multi-owner orders (confirmed); claims bin mgmt, pick-then-sort, pack video QC, returns QC, marketplace + 7 carriers [R §1] → table stakes [R Rec 2].
- JST not found: putaway, wave picking by name, weight check, handover scan-out / sort status, cancelled-order interception, 3PL billing/portal, public API [R §1 table]. Absence of evidence, verify hands-on [R Rec 3].
- Lock-in anti-pattern: no export procedure, irreversible deletion, "manual" use only [R §2]. → Migration + data portability as first-class feature, documented export [R Rec 4].
- Forced-update loop is an observed mobile anti-pattern [R §4] (inference: avoid forced-update blocking floor apps — inference by extractor, not source).
- "Do primary user research before relying on UX or pain claims. Interview 5–8 JST-running warehouse operators" [R Rec 5]. Brief: "[ASSUMPTION: no specific UX failure cases collected yet]" [B §The Problem].
- Alternatives: BigSeller (easier per competitor claim), ZORT, Page365 (OMS), Flash Fulfillment (own WMS) [R §3].

# 8. Open questions / gaps relevant to UX

1. **Frontend stack & component library** — unstated everywhere. Web, PDA (native Android vs web/PWA?), station app technology unknown.
2. **PDA form factor** — "rugged Android PDAs with built-in scanners" is [ASSUMPTION] [P NFR-10]; screen size, hardware scan key, camera quality unspecified.
3. **Missing PDA designs** for putaway and sorting; all PDA mockups reference-only — "UX must design them" [P Q-11; PA §G; FI OQ-7].
4. **Warehouse rules screen**: two competing designs + differing defaults [P Q-7 "This is a UX decision"; PA §G].
5. **EN vs TH overview** content differs; which is canonical [PA §G; FI OQ-9].
6. **VAS work screen device** (desk tablet?) [PA §G].
7. **Default role set** inconsistent with approval matrix [P Q-6] → affects navigation/menus per role.
8. **Environment conditions** — gloves, noise, lighting, cold rooms, one-hand use not documented; sound alerts assumed audible.
9. **Accessibility target** (WCAG level, colour-blind safety of red/green status) — none stated.
10. **Dark mode** — none stated (theme presets include dark menu & high contrast only in mockups).
11. **Theming scope Phase 1** — company theme/brand settings P?; theme tool Later. Is per-tenant theming in Phase 1 UI at all?
12. **Office UX targets** — no NFR/SM for office web UX, visual quality or attractiveness despite being headline promise [RB G1, G2]; no JST UX baseline (SUS/CSAT) [RB G1, G4].
13. **No real user research** — protagonists illustrative; no JST UX failure cases [P §2.3; B §The Problem; R Rec 5].
14. **Owner notifications/decisions channel in P1** (Owner Care internal role assumed) [FI OQ-13; FO OQ-1; P §3].
15. **Add-on visibility** — prep, auto pick lists, VAS, production-line packing P1 status [P Q-5, Q-12] → affects menus.
16. **Multi-warehouse in pilot** — switcher needed day one? [P NFR-11 ASSUMPTION; FI OQ-8].
17. **Count approval thresholds conflict** (copy on screens) [P Q-8].
18. **Executives/accounting read-only roles** [RB G2, G8].
19. **Migration rollback UX** — no fallback-to-JST plan [RB G5].
20. **Wall TV** Later, but cut-off board is web — how it renders on large screens unspecified [P FR-60].
