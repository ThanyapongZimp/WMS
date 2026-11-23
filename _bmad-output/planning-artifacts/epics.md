---
status: draft
stepsCompleted: [1, 2, 3]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/prd.md
  - _bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/addendum.md
  - _bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/fr-candidates-inbound-stock-setup.md
  - _bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/fr-candidates-outbound.md
  - _bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/EXPERIENCE.md
architectureDocument: none  # ARCH-PENDING — no architecture document exists yet; user chose to proceed without it (2026-11-19)
---

# WMS (Zimple Fulfillment — Phase 1) - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for WMS (Zimple Fulfillment — Phase 1, WMS Core), decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

> **Note:** No architecture document exists yet. Technical requirements below come from the PRD's integration/NFR sections, the addendum's architecture notes (§D), and UX open questions. Items tagged `[ARCH-PENDING]` need an architecture decision before the affected stories are implementable.

Priority tags `[Must]` / `[Should]` / `[Defer]` follow PRD §9.3 provisional tiers (unconfirmed pending Q-1 JST parity checklist).

## Requirements Inventory

### Functional Requirements

**4.1 OMS & Carrier Integration**

- FR-1 `[Must]`: System ingests orders from the connected OMS and reserves stock on receipt. Each order gets `SO-YYMMDD-NNNNN` and keeps channel, channel order numbers, external ref, owner, carrier, cut-off, recipient, lines. Duplicate source reference creates no second order. No warehouse-side order creation or file import exists. Merged shipments show every channel order number.
- FR-2 `[Must]`: System holds an order in *awaiting carrier data* until tracking number + label exist, excluding it from pick-list creation. Re-pull every 5 min; owner notified via OMS after 2 h. Non-marketplace orders request tracking/label from carrier API on entry. Unmapped carrier name holds the order and alerts (never guesses); re-queues once mapped.
- FR-3 `[Must]`: System syncs SKU master, kit BOMs and ASNs from the OMS; OMS-owned fields (code, name, cost, BOM, ASN lines) are read-only. Retired SKU becomes "use up before retire". Cost syncs with effective-date history, visible only with *view product cost*.
- FR-4 `[Must]`: System pushes order status, tracking, available-to-sell (= ATP) and inbound receipt results to the OMS. Failed sends auto-retry, then land in a failed-sends queue with the error. Admin can force-push stock (logged, no approval).
- FR-5 `[Must]`: System ingests OMS cancellations and owner change requests at any stage, recording stage and cancelling actor (buyer/platform/owner). Change request removes the order from drafts before picking; after picking starts, stops it at next scan.
- FR-6 `[Should]`: System records post-handover milestones (carrier received, delivered, failed delivery) — from OMS for marketplace, carrier API for non-marketplace. Failed delivery creates an expected return (FR-98).
- FR-7 `[Must]`: System produces a daily 06:00 reconciliation: ledger balance vs sum of ledger lines, and WMS vs OMS stock, listing each SKU × owner with a difference. Any difference raises a non-disableable notification.
- FR-119 `[Must]`: Admin configures OMS connection, carrier accounts/credentials, carrier-name mapping table, and generic-API keys/webhooks. Connections testable before enabling; last-sync status visible; unmapped carrier names appear until mapped. API key create/revoke and credential changes need customer-admin approval when Zimple support acts; always logged.
- FR-121 `[Must]`: System sends decision cases (photos, video, quantities) to OMS after-sales and turns the returned decision into a task (dispose, return to owner, restock, add to stock). Sources: over-receipt/off-list (FR-36), damaged/held (FR-54), unmatched returns (FR-100), problem reports (FR-103). Overdue cases alert; goods stay held, never auto-disposed.

**4.2 Warehouse Setup**

- FR-8 `[Must]`: Admin creates warehouses (3-letter code), zones (room type, capacity, walk-order pattern) and locations, individually or in bulk. Location has 1 of 8 types, zone, walk sequence, sellable flag, capacity (m³, kg), mixing policy. Walk sequence is the fallback stop order for locations not bound to a published layout (FR-125). Disabled location blocks putaway/moves; *locked for counting* set only by a count. Bulk QR label print. Warehouse disable only at zero stock + approval.
- FR-9 `[Defer]`: Admin can enable doors and staging points bound to doors (off by default). Doors hold no stock; staging points are stock locations. Flows work without doors when off.
- FR-10 `[Must]`: Admin registers container types (prefix, count, stages used, capacity) and prints labels. One permanent QR per container, unique per warehouse. Live usage shows holding pick list / carrier wave. Cart with cancelled-list residue shows *needs clearing* and is unusable until cleared.
- FR-125 `[Must]`: Admin draws a warehouse layout to scale (zone areas, racks, aisles, walls/obstacles, doors/docks, pick start/end points, labels), binds locations to rack slots (by code pattern or one at a time; one slot per location), and publishes it. One layout per warehouse with draft and published versions; publishing applies to pick lists created afterwards. Publish blocks unreachable racks and a missing start point, and warns on unbound pick/storage locations (they fall back to walk sequence). Location status shows on the layout. Changes and publish are logged. Drawn doors do not enable FR-9.
- FR-126 `[Should]`: Warehouse Manager views the published layout coloured by space used (m³, kg vs capacity) per location, rack and zone, and drills down from a slot to its stock. Filters: zone, location type, status. Occupancy uses one sequential scale with a legend; status uses the status tones.
- FR-11 `[Must]`: Admin registers devices (PC, USB scanner, PDA, printer, scale, camera), binds them to stations/work points, and tests them. PC binds to station via 6-digit code and flags missing peripherals on boot. Station with unbound/untested/faulted devices gets no work. Device status: online, offline N min, ready, out of paper, needs fixing, untested. *Restrict work by work point* limits a device to its department's work.
- FR-12 `[Must]`: Admin/Warehouse Manager configures warehouse rules grouped by stage (inbound, picking, packing, inventory, handover, returns, cancel-to-restock). Every change has effective date, history and source level. Settings hub lists *must set before use* blockers and *still on default* rules; filter for non-default. Billing/3PL/excluded add-on rules hidden.
- FR-13 `[Must]`: System resolves every setting by precedence system → company → warehouse → owner → SKU; most specific wins except shelf-life thresholds (strictest wins). *Warehouse-wide* rules can't be overridden below warehouse. Owner level exists in data model, no Phase 1 UI, defaults to warehouse value.
- FR-14 `[Must]`: Admin configures carrier pickup rounds per warehouse: times, pack cut-off, days, handover mode, door, effective date. No pickup round = carrier cannot ship. Cut-off = pickup − X min. Campaign days add rounds. Handover modes: container per wave, per order (rider), by job size, by vehicle trip.
- FR-15 `[Must]`: Admin sets document prefixes (2–4 letters, unique) and digit counts. Affects new records only; digit count can increase, never decrease; warning when too small for peak volume.
- FR-16 `[Should]`: Admin sets each warehouse's working calendar and holidays; stage SLAs and *overdue* alerts use it.
- FR-122 `[Must]`: Office/floor staff can run every floor flow on the web without PDAs (receiving, putaway, moves, counting, picking, sorting, handover, returns). With *confirm by paper task*, system prints QR task sheets (pick lists, move sheets, count sheets) confirmed on web. All PDA controls apply to web confirmation. Ledger records device = web, actor = confirming user.

**4.3 Users, Access & Sign-in**

- FR-17 `[Must]`: Admin creates users with roles (optionally temporary with expiry), warehouse scope and sign-in methods (QR badge, username+password, optional OTP). Suspended user can't sign in. User count capped by license package.
- FR-18 `[Must]`: Admin creates/copies/edits/deletes roles via page × action matrix (view, do, use on PDA, create/edit, cancel/delete, approve, print, export) with zone, work-point and data scope. Dependent permissions auto-ticked. Count+approve-adjustment combination flagged as SoD risk. Changes apply at next sign-in, logged. Default roles ship (incl. Warehouse Head, Handover Lead); *System Administrator* locked with all rights.
- FR-19 `[Must]`: Admin grants special permissions: view product cost, act on behalf of owner, view/share video, approve OMS cancellation after work started, day close, ad-hoc move, supervisor override on failed scan, grant temporary role (≤ granter's rights), view buyer PII. Without *view buyer PII*, phone/address masked on every screen and export.
- FR-20 `[Must]`: Office user signs in on web with email + password (+ OTP when MFA enabled) and picks a warehouse. 3 failed attempts lock ~15 min. Reset link valid 30 min; identical response whether email exists. Idle timeout; password change signs out other sessions. Zimple support always needs MFA.
- FR-21 `[Must]`: Floor staff sign in on PDA by scanning badge QR (+ optional 4-digit PIN). One active PDA session per user. Unknown badge: red screen + beep + notification. Role without PDA page cannot sign in. Idle PDA locks; unlocks on own badge rescan. PDA home shows only permitted task tiles with live counters.
- FR-22 `[Should]`: Supervisor issues reusable day-labour cards (name, phone, agency, shift, allowed functions, optional PIN). Auto-returned at shift end; status in use / not returned / free / lost. Phone kept 90 days, visible only with special permission.
- FR-23 `[Should]`: Customer admin grants Zimple support time-boxed, scoped access. Critical changes (stock, roles, numbering, connections/API keys, disabling a SKU) need customer-admin approval. Banner shows while active; every support action logged.

**4.4 Products & Packaging Materials**

- FR-24 `[Must]`: Warehouse staff record measured dimensions/weight, warehouse photos and internal tags on a SKU. SKU shows owner-entered, warehouse-measured and used values (measured wins from its date). Changes logged. SKU list shows data-issue count (missing dimensions, missing barcode, unaccepted unit).
- FR-25 `[Must]`: System resolves units of measure and barcodes per SKU. Scanning a unit barcode counts that unit's base quantity. Unit quantity immutable after first use. Barcode unique within owner; extra barcodes only with multi-barcode rule. Unit can be *sell by carton only*. SKU without barcode gets printable system QR from its code.
- FR-26 `[Must]`: Authorized user sets per-SKU tracking: lot control, expiry basis (MFG + shelf life), min remaining shelf life, serial control (none / scan at pack / scan from receiving). *Scan from receiving* also enforces serial scans at move and count. OMS serial-warrantied SKU must be serial-controlled. Serial traceable to current location/order with movement history.
- FR-27 `[Should]`: System shows OMS kit BOMs with buildable quantity and executes OMS assemble/unbundle orders. Each run posts one SKU-conversion movement. Warehouse-initiated assembly requires approval.
- FR-28 `[Must]`: Authorized user registers packaging/material items (usable dimensions, weight, max load, deduction unit, storage bundle, paired materials); each warehouse sets a reorder point. Packaging is received, put away, counted and ledgered like products. Owner box not suggested until usable size, storage size and paired materials set. Consumables deducted when issued (FR-45).

**4.5 Inbound**

- FR-29 `[Must]`: Receiver/Supervisor sees ASNs in a queue ordered overdue first, then scheduled date and slot. Owner item-list lines read-only; item lists attachable until receiving.
- FR-30 `[Should]`: Office user creates an ASN on the owner's behalf or for warehouse goods when OMS sent none; marked *warehouse-created* in audit. Full time slot selectable but alerts.
- FR-31 `[Must]`: Receiver opens a temporary receipt per vehicle arrival: declared vs counted outer packages, photos, weight (if scale), vehicle data, sender on-screen signature. No-ASN or early arrival needs reason, tagged *unannounced*. Outer-count shortfall recorded, owner notified via OMS. New TM on same ASN blocked until previous round confirmed. TM open > 2 h alerts.
- FR-32 `[Should]`: Receiver logs a parcel whose tracking matches no ASN and holds it at parcel staging until matched; not stock until matched and received.
- FR-33 `[Must]`: Receiver opens receiving by scanning ASN/item list and counts each SKU by carton pattern (cartons × pieces + loose + damaged). Single item scan selects SKU without counting. Count method rule: all cartons, or N random per SKU-lot with full count on mismatch. Lot + expiry required before putaway for lot-controlled SKUs (expiry = MFG + shelf life). Serial SKUs require every serial; duplicates rejected. Carton dims ÷ pieces mismatch flags re-measure. First carton of a new SKU measured before putaway; scale auto-fills, typed values logged manual.
- FR-34 `[Must]`: Receiver prints carton QR labels and loads cartons onto containers. Closing a container creates a putaway task immediately. Reprint keeps carton number and needs a reason. All open pallets must close before the receipt closes.
- FR-35 `[Should]`: System records evidence for every receipt: desktop camera station records video; PDA attaches photos. Photo required for any short, over, damaged or wrong-SKU line. No-PDA warehouse runs whole flow on web.
- FR-36 `[Must]`: System routes receiving exceptions without stopping the job: over-receipt beyond tolerance (default 0%) → quarantine, not sellable; another owner's SKU → red screen reject; off-list same-owner SKU → held for decision; unknown barcode → reject, or bind as extra barcode after approval (multi-barcode rule); shelf life below minimum → supervisor confirmation; damaged → damaged section with cause + photos.
- FR-37 `[Must]`: System suggests a putaway location per container/carton using room type, SKU's existing locations and free capacity. Queue order: urgent (orders waiting) → temperature-controlled → oldest.
- FR-38 `[Must]`: Putaway staff confirm putaway by scanning the location on PDA. Non-suggested location needs a reason. Wrong room type, overweight, disabled or count-locked location blocked. On confirm stock becomes sellable immediately; waiting orders reserved in original order; out-of-stock-held orders released. Awaiting putaway > 2 h alerts.
- FR-39 `[Must]`: Supervisor closes a receipt after reviewing actual vs ASN. Multi-round receiving allowed. Produces short/over/damaged summary. Auto-close after 3 days without response. Early ASN close needs approval. Result sent to OMS (FR-4). Closed receipts searchable/exportable (summary or SKU × lot).

**4.6 Inventory Control**

- FR-40 `[Must]`: User views stock by SKU (lot/location drill-down, in-process rows), by location (capacity used, last scan, lock state), by lot/expiry (remaining days, receipt trace). Filters: normal, awaiting putaway, returns, damaged, below reorder point, near expiry, out of stock. Exports respect filters. Lot/expiry view only when a lot-controlled SKU exists.
- FR-41 `[Must]`: System computes on-hand, ATP and available-to-sell per SKU, lot, location. On-hand = normal + returns + damaged/quarantine (excludes received-not-put-away). ATP = normal − reserved − held lots − lots below min shelf life; available-to-sell = ATP. Reserved covers every order not yet handed over wherever its goods are. Reservation only from normal stock. Stock stays on-hand until handover confirm.
- FR-42 `[Must]`: System records every quantity/location change as an immutable ledger line (timestamp, type, doc ref, from → to location, lot, ± qty, running balance, actor, device). Internal move writes two lines, total unchanged; line written only after destination scanned. Lines cannot be edited or deleted.
- FR-43 `[Must]`: Authorized user requests reversal of a receive, handover or return-receipt ledger line. Reversal is an opposite line referencing the original, qty ≤ original. Reason mandatory, approval always required. Wrong moves are corrected by a new move, not reversal.
- FR-44 `[Must]`: Stock staff move stock on PDA or web with 3-scan sequence (source → product + qty → destination). Pallet QR moves whole pallet. Checks space, weight, room type, lot mixing, *no mixed SKUs*. *Ad-hoc move* permission allows task-less moves with reason. No-PDA warehouse prints move sheets, confirms on web.
- FR-45 `[Should]`: User with *issue for use* permission issues warehouse-owned materials/equipment; deducted immediately. Issuing > 10 units (configurable) requires approval.
- FR-46 `[Must]`: System generates replenishment tasks from pick-location min/max per SKU every N min (default 60). Reserve lots chosen FEFO. Urgent replenishment (waiting orders > shelf qty, or short pick) tops PDA queue with sound and prints at zone printer; picker notified on completion. Stuck move task alerts after 30 min.
- FR-47 `[Must]`: Supervisor creates a count round (whole warehouse, zone/row, SKU list, velocity class) with options: counters, batch size, blind (default) or visible, include empty locations, freeze inbound/outbound. Whole-warehouse round ≥ 3 days ahead. Locations with pending picks counted after picking.
- FR-48 `[Must]`: Counter counts on PDA by scanning location, product and serials. Blind by default; never a "confirm system quantity" button. Locks only the location being counted. Offline results queued and sent on reconnect.
- FR-49 `[Must]`: System resolves count results before adjustment: match auto-closes; mismatch gets one recount by same counter then goes to approval as variance; misplacement pair fixed by move, not loss. Approval tiers per FR-105; counter can never approve own variance. Approved variance posts ledger adjustment naming counter and approver.
- FR-50 `[Must]`: System creates an urgent single-location blind count when a picker reports a short with no alternative, or answers "not empty" after last unit. Tops stock PDA queue, auto-assigned with deadline. Found → location corrected; not found → variance to approval and order shows *insufficient stock*.
- FR-51 `[Should]`: System computes inventory accuracy (matching ÷ blind-counted locations over 30 days) and variance value at cost.
- FR-52 `[Must]`: System allocates FEFO: earliest-expiry lot first, then pick location before reserve. Lot below min remaining shelf life not allocated unless the order names it. Expired stock moves to damaged section, excluded from ATP.
- FR-53 `[Must]`: Staff move a unit into damaged/quarantine by scanning *damaged* QR → item → damaged tote/location. Records cause, origin (receiving, storage, returns, cancel-return), photos. Damaged locations never picked, excluded from ATP.
- FR-54 `[Must]`: System sends a decision case per damaged/held item to OMS after-sales; staff execute the returned decision (dispose with photo evidence, return to owner/supplier, use again, add excess to stock). WMS page read-only for the decision. Disposal execution still needs warehouse approval. Item > 30 days without decision alerts, repeating every 7 days; nothing auto-disposed.
- FR-55 `[Should]`: Warehouse Manager views inventory dashboard: accuracy vs target, replenishment needs, variances awaiting approval, near-expiry lots, space usage, overdue backlog.
- FR-115 `[Should]`: Supervisor puts a lot on hold/recall (all or chosen locations) with reason; release needs approval. Held lot excluded from ATP and allocation immediately; already-allocated pick lists flagged for re-allocation. Lot/expiry view shows held lots and reason.
- FR-120 `[Must]`: System explodes a kit order line into component SKUs at reservation and allocation using the OMS BOM version current at intake. Reservation, allocation and handover deduction on components. Kit available-to-sell = min over components of (component ATP ÷ qty per kit). Components shown and packed together at packing.

**4.7 Orders & Cut-off**

- FR-56 `[Must]`: System tracks each order through received → carrier data ready → picking → packing → awaiting handover → handed over → delivered. Order list has stage buckets plus *exception* and *cancelled* (by stage). CS searches by order number, channel number, external ref, tracking number or recipient. Order prices visible only with permission; COD and total value visible to all.
- FR-57 `[Must]`: CS opens an order and sees lines (SKU, lot/expiry, pick location, quantities), pick lists, packing record (packer, station, box, weight, materials, video link) and timestamped timeline of every stage event.
- FR-58 `[Must]`: Supervisor/CS holds one or many orders with reason and releases them. Held order can't enter a pick list; in-progress held order stops at next scan. No edit or cancel control exists on orders.
- FR-59 `[Should]`: Supervisor approves/rejects an owner change request once picking started. During pick/pack/handover the PDA shows *stop* and directs goods to a hold location; box can't close; loading scan shows *do not ship*. Outcome (returned, rejected with reason, withdrawn, too late) sent to OMS.
- FR-60 `[Should]`: Supervisor views cut-off board: today's orders by stage, channel and carrier wave with risk per wave (on time, at risk, late by N min). Slack = pack cut-off − (remaining work ÷ team's actual speed today); negative slack suggests adding headcount or deferring N orders. Alerts 60 and 15 min before pack cut-off.
- FR-116 `[Must]`: System computes each order's ship-by due date from channel SLA rules (Shopee, Lazada, TikTok Shop, off-platform), warehouse calendar and campaign extensions. Drives carrier-wave assignment, queue order and missed-wave handling. Differs from OMS platform date → alert. Admin configures SLA rules per channel with effective dates.
- FR-117 `[Should]`: System runs instant/express orders on a pack-within limit (instant 30 min, same-day 60 min before truck; configurable). On pack, sends *pack complete — call rider* to OMS. Rider no-show is a handover state; *re-call rider* sends request to OMS before platform auto-cancel. No-shows appear on handover overview and day-close checklist.

**4.8 Picking**

- FR-61 `[Must]`: Supervisor defines versioned pick rules (conditions, scope, method, split limits) requiring approval before effect. First match wins: mandatory global → owner-specific → general global → warehouse default. Edit creates new version; existing lists keep theirs. Split limits configurable (e.g. 300 orders / 2,000 pieces per list).
- FR-62 `[Must]`: Planner builds pick lists via draft wave in recommended or manual mode, then splits/merges/moves/removes lists before confirming. Draft orders reserved to the planner for a countdown (e.g. 10 min). Excludes awaiting-carrier-data, held, change-requested orders. Split by method → carrier wave → N orders by paid time → container capacity.
- FR-63 `[Must]`: System assigns one of six pick methods: by order; single-item orders; single SKU in bulk; identical-order sets; multi-order with sorting; consolidated multi-order. Lists numbered `PK-YYMMDD-NNNN`; re-pick creates child `PK-…-1`. Default pack method stored on list.
- FR-64 `[Must]`: System allocates lot and location at list creation: FEFO → pick location before storage → fewest stops → shortest walking distance on the published layout → slots emptied exactly. Pick-location shortage with storage stock creates urgent replenishment and moves line to list end (doesn't block). Only warehouse-wide stock-out blocks the order.
- FR-65 `[Defer]`: System generates pick lists automatically per owner × service level on threshold/time triggers (tote full, cart slots full, clock time, N min before wave). Cap on open system lists. Mode: auto-create or wait for confirmation.
- FR-66 `[Must]`: System orders pick queue: supervisor priority (with reason) → nearest carrier wave → oldest. *Ship immediately* orders get own single-order list, auto-printed, top of queue. Unassigned lists visible to every eligible picker; claiming locks to picker. Print status (unprinted, printed, reprint #n "copy") tracked per list.
- FR-67 `[Must]`: Picker executes a pick list on PDA along a route computed from the published layout (FR-125), scanning cart/tote, location and items. Route starts at the list's pick start point and orders stops by shortest walking distance; unbound locations follow walk sequence after routed stops; with no published layout all stops follow walk sequence. Cart/tote scan at start always required. Location scan mandatory for lot-controlled items. Every-piece scan can be turned off only for single-SKU bulk and identical-set lists; always on for sort-while-pick, serial, high-value. Over-entry blocked; under-entry prompts "short or later?". Only Supervisor changes verification settings (audited). Offline scans queued and synced.
- FR-68 `[Must]`: Picker picks by unit of measure: sealed cartons first, then opened-carton remainders, then open new carton. Sealed-carton QR counts as full carton; already-shipped carton QR rejected.
- FR-69 `[Should]`: System asks picker to confirm a location is empty after its last piece; "not empty" creates an urgent count (FR-50).
- FR-70 `[Must]`: Picker reports a short; System resolves via fixed flow: record actual qty → offer alternative location → urgent replenishment → urgent count → mark *insufficient stock* with variance to approval. Stock never adjusted automatically. Re-pick creates child list; packing waits for all parts.
- FR-71 `[Must]`: Picker drops picked goods at a staging spot by scanning. Container custody and carrier stay traceable; wrong spot warns. *Completed* pick list = handed to packing, not shipped.
- FR-72 `[Should]`: Sorter sorts batch-picked goods into put-wall slots by scanning items while system shows target slot. Complete slot releasable to packing at once; re-release doesn't duplicate the pack job.
- FR-73 `[Must]`: System rolls orders still open when a wave's truck leaves into the next wave, tagged *missed wave* and counted in KPIs.
- FR-74 `[Should]`: Supervisor views picking overview: remaining orders by cut-off, ETA vs cut-off, blockers, picker status, pieces/hour per picker. Pickers can't see or close pack jobs.

**4.9 Packing**

- FR-75 `[Must — by order, by pick list, multi-box]` `[Defer — production line]`: System creates one pack job per pick list; Packer packs by order, by pick list (system picks matching unpacked order), production line (one box type, per-box label scan + random full scans; reconciles picked = output + waste + leftover), or multi-box. Status: awaiting prep → preparing → ready to pack → packing → packed; side states exception, cancelled, paused. Order can't close until all parts arrive. Only Supervisor changes pack method (with reason); Packer may only switch to multi-box.
- FR-76 `[Must]`: Packer scan-verifies every item; wrong SKU and over-scan blocked with red screen + sound. Non-disableable: scan start, scan close, every piece/unit barcode, every serial/high-value piece, cancellation check before print. Kit components shown and packed together.
- FR-77 `[Must]`: System checks box weight vs expected within ±5% or 20 g (whichever larger). Weight from scale; typed weight logged manual. Out-of-tolerance box held for supervisor inspection.
- FR-78 `[Must]`: System prints shipping label and in-box documents (receipt/tax invoice, warranty card, B2B docs, content list) once every item is verified. Cancellation re-checked immediately before label prints. Batch print only prints never-printed labels. Reprint needs supervisor approval and is counted. Platform labels never edited.
- FR-79 `[Must]`: System suggests a box (with backup ranks) and deducts packaging + paired materials on box close. Owner box modes: owner first / warehouse by size / owner only. Packer may scan any other box without reason. Exactly one packaging scan per box mandatory; extra material separate scan. *Reuse original box* deducts nothing. Inserts follow owner insert rules, deducted at handover.
- FR-80 `[Must]`: System records per-order video at camera stations, linked to order and exceptions; continues through label print and shows the label. PDA camera priority: bound IP camera → built-in → single *no video* warning and continue. Retention 60 days default; exception-linked clips locked until closed. Deletion only via system: 7-day soft delete, second admin for bulk; every view/delete logged. CS/Supervisor open video from order, exception or cancel-return job. Storage > 90% alerts.
- FR-81 `[Must]`: System routes pack jobs to stations; Supervisor can reassign. Two stations never pack the same order. Urgent jobs to first free station; queue sorted by required pack-complete time. Faulted-device station gets no work.
- FR-82 `[Must]`: Packer raises an exception; Supervisor resolves from a queue. Types: missing item, wrong SKU, abnormal weight, materials not ready, print failure, cancelled during packing, incomplete evidence, out of boxes. Every case links to the order's video.
- FR-83 `[Defer]`: Prep staff prepare boxes/materials per prep sheet (same number as pick list) and dispatch to desk/conveyor. Materials reserved at sheet creation, deducted at box close.
- FR-84 `[Should]`: Supervisor attaches a VAS instruction (labelling, re-bagging, gift wrap) to an inbound line, order or return; staff confirm by scan. Open VAS blocks putaway (inbound), box close (order), restock (return).
- FR-118 `[Must]`: System issues in-box receipt/tax invoice at pack-complete, numbered from the company's document series, and sends it to the OMS. Number assigned at pack-complete (reprint keeps it). Voiding needs approval, sent to OMS. Format and series set in document settings.
- FR-123 `[Should]`: Admin configures per owner (inside WMS packaging settings) box mode, insert rules and material matching (paired materials per box or SKU). Used by box suggestion (FR-79). Single owner is preselected.
- FR-124 `[Should]`: Supervisor reopens a packed box before it is sorted, with reason. Label voided if not yet handed over; consumed materials stay consumed. Order returns to *packing*; pack video records the reopen.

**4.10 Handover**

- FR-85 `[Must]`: Handover staff sort packed parcels into handover containers, container-first or parcel-first, switching mode without closing the container. Each scan checks packed, carrier matches container, not cancelled (cancellation data timestamp shown). Wrong carrier → red screen. Cancelled → red screen, to cancelled-goods location, auto-creates cancel-return job. No open container → scanning any empty container binds it to carrier + wave. Sorted parcel → *awaiting handover* with container and wave recorded. Container use configurable (all carriers, per carrier, none); change effective next day.
- FR-86 `[Must]`: Handover staff close a container and record a seal number. Status open → closed → handing over → handed over. Container holding a cancelled parcel can't be handed over until pulled; pulling from a sealed container needs a new seal. All accounts of one carrier share containers; manifest splits by account.
- FR-87 `[Must]`: Handover staff register the arriving vehicle (plate, driver, photo), scan containers onto it, and confirm handover. Seal mismatch forces search (scan every parcel, reseal). Handover confirm deducts stock (shipped); before confirm stock stays on hand. Truck no-show moves goods to next wave with no return transaction. Unscanned containers at confirm can be split off as pending.
- FR-88 `[Must]`: System produces a manifest per handover with child manifests per shop/carrier account. Parent total = sum of children; multi-box order counts as 1. Proof: signature on PDA/tablet, or signed paper + photo; without proof a second person must approve. With carrier API, receipt reconciled per parcel and a shortage opens a case; without API, Supervisor certifies receipt.
- FR-89 `[Should]`: Handover staff hand over to a customer pickup by appointment after verifying collector ID. One appointment covers several orders, one manifest. Confirm only when every box scanned. ID photos kept 90 days. No-show 30 min after appointment returns goods to pickup point.
- FR-90 `[Must]`: Supervisor views handover overview: parcels not handed over by wave, truck status, cancellations to pull, carry-over, daily balance per carrier. Packed today = handed over + cancelled before handover + pending, no overlap. Carry-over not added to today's packed count.
- FR-91 `[Must]`: Supervisor with *day close* permission closes the day only after checklist passes: all waves closed; all cancellations pulled; leftovers counted by scan; every not-found parcel has a case owner; every carrier-refused parcel inspected. Until then shows *cannot close — N items left*. Closing takes an uneditable snapshot. Carry-over creates no new order/parcel/stock record and keeps original pack date.

**4.11 Cancellations**

- FR-92 `[Must]`: System classifies each cancellation by stage and routes it: before pick → order removed, reservation released; after pick/pack → cancel-return job; after handover → expected return. Cancellation data older than 15 min triggers re-pull warning at sort and handover.
- FR-93 `[Must]`: System enforces cancellation at every scan point: pick (unstarted list cancellable whole; after start per order, picked goods to return staging); pack (label printing locks immediately); sort (red screen, container blocked until pulled); handover (pulled at handover by default, or immediately by setting).
- FR-94 `[Must]`: Handover staff reconcile carrier-rejected labels by scanning each label then the cancelled-goods location. *Matched* → waits for return. *Carrier knew first* → removed from manifest pending verification. Label from another wave → red screen.
- FR-95 `[Should]`: Supervisor approves/rejects an OMS cancellation request arriving after picking started on a self-pickup order. Cancellation before pick always accepted. No 3PL cost notice in Phase 1.
- FR-96 `[Must]`: Staff process a cancel-return job: scan label/tote → scan items → scan return container. Packed parcel must be unboxed at the cancelled-goods location first. Original label void, never reusable. Packaging recorded as consumed. Damaged pieces to damaged tote. Missing items open a search case and urgent count.
- FR-97 `[Must]`: System auto-closes return-to-shelf containers and creates the restock move: closes at 30 pieces, every 2 h, 1 h before last truck, or when an order waits for that SKU (marked urgent). Goods pickable only when location scanned. Restock must finish before last truck; late restock flagged.

**4.12 Returns**

- FR-98 `[Must]`: System creates expected returns from cancellation after handover, failed delivery, platform return requests (via OMS) and owner notifications. Shows original parcel, SO, owner, source, wait window. Overdue windows per carrier (defaults Flash 7, J&T 7, SPX 10 days).
- FR-99 `[Must]`: Returns staff open one return receipt per carrier drop-off, scan every label, close with driver on-screen signature. Another carrier's label rejected (configurable to warn). Parcel receivable only once. Never-handed-over tracking rejected unless buyer-return label with new tracking (waits for original tracking scan, else return quarantine).
- FR-100 `[Must]`: System quarantines an unmatched parcel in return quarantine and opens a problem report automatically. Not stocked, never auto-discarded. Alert after 30 days, repeating every 7 days.
- FR-101 `[Must]`: Returns staff inspect and grade each unit at a camera station: good, damaged, wrong SKU, expired, packaging damaged, not this owner's. Non-good grade needs ≥ 1 photo; video recorded automatically. Stock added only for physically scanned units; shipped-but-unscanned recorded *missing* and opens problem report. Kit missing component or serial mismatch blocks restock. Damaged/expired go to damaged stock immediately. Pending inspection > 2 days alerts.
- FR-102 `[Must]`: Returns staff restock good units by scanning item/container then location. Returns held as *returns, awaiting inspection* until inspected and put away. Wrong location warns and nothing moves.
- FR-103 `[Must]`: System or Returns staff raise a problem report with photo + video evidence, problem type (15 types), source, party to claim against. Return rule matrix decides floor resolution vs OMS decision case. No decision within 7 days → item stays stored.
- FR-104 `[Should]`: Supervisor views return job board per parcel: awaiting → received → inspected → awaiting decision/extra work → restocked → done, with overdue counts, throughput, restock rate.

**4.13 Approvals, Notifications & Audit**

- FR-105 `[Must]`: Admin configures each approval type with step-1 approver role, step-2 condition and escalation time. Phase 1 types: stock adjustment (tiered by pieces, %, value), reversal (always), opening balance; release stale reservation, release held lot, material issue over limit, disposal; early ASN close, short-shelf-life receipt; label reprint, extra barcode; disabling a warehouse, bulk video deletion, support critical change. Money-related never self-approved. Unanswered escalates to step 2 then admin. Pending count in header.
- FR-106 `[Must]`: Admin configures each notification type's channels (in-app, LINE, email) and recipients (role, involved people, selected users). Some types non-disableable (WMS ≠ OMS stock, video storage > 90%). Users may mute LINE/email, never in-app. Owner-facing notifications delivered via OMS.
- FR-107 `[Must]`: System keeps an immutable activity log: time, actor (user, automation, OMS API, Zimple support), device, action, old → new value, reason. Covers sign-in/out incl. failures; create/edit/cancel/approve/reject; adjust/reverse; rule, user and permission changes; print/reprint; every export. Filterable, exportable; retention ≥ 1 year.
- FR-108 `[Should]`: System raises an *overdue* alert for every stage SLA (TM open, awaiting putaway, stuck move, pending inspection, etc.) with configurable per-warehouse threshold.

**4.14 Overview & Reports**

- FR-109 `[Should]`: Warehouse Manager views real-time overview (refresh every minute): handed over vs total, awaiting handover near cut-off, pack accuracy, on-time %, inventory accuracy, space used, productivity vs target per stage, pending approvals. Pipeline segments clickable into filtered lists.
- FR-110 `[Should]`: Warehouse Manager opens Phase 1 reports: inbound analysis, stock movement summary, inventory accuracy, daily outbound and variance, packaging usage, handover and on-time, returns analysis, staff performance. Each shows data-as-of time and filters, offers Excel export. Downloads permission-gated and logged; PII masked without permission; reports schedulable by email/LINE; saved views and drill-down to operational lists.

**4.15 Migration & Cutover from JST**

- FR-111 `[Must]`: Admin imports opening balances from Excel per owner × SKU × lot × location. Creates an opening-balance document always requiring approval; on approval posts *opening balance* ledger lines. Rows with unknown SKU, location or lot format rejected with row-level error report.
- FR-112 `[Should]`: Admin bulk-imports zones and locations from a template with dry-run preview; validation all-or-nothing per file.
- FR-113 `[Should]`: Admin bulk-imports warehouse-local SKU attributes (measured dimensions/weight, tracking flags not from OMS).
- FR-114 `[Must]`: Admin runs a cutover check: whole-warehouse blind count after opening-balance import → ledger total vs imported total → WMS → OMS stock push. First live wave blocked until the check passes or Warehouse Manager overrides with reason.

**4.16 Data Phase 1 Must Capture for Later Phases** (no UI)

- FR-DATA-1 `[Must]`: Owner on every stock record, document and SKU (even single owner); owner picker hidden when only one owner.
- FR-DATA-2 `[Must]`: Billable-event signals captured: receiving rounds, cartons, CBM, after-hours/unannounced arrivals; pack performed or not, cancellation stage, order type; packaging vs owner box, paired/extra materials, inserts; storage CBM per SKU and location.
- FR-DATA-3 `[Must]`: Claims evidence chain retained: pick scans → pack video → weight → manifest + seal → carrier events; carrier-shortage cases; problem-report evidence.
- FR-DATA-4 `[Must]`: Variance value at cost and party responsible for damage recorded.
- FR-DATA-5 `[Must]`: Owner-level slot exists in settings precedence (see FR-13).

### NonFunctional Requirements

- NFR-1 Throughput: Sustain 30,000 orders/day per warehouse; absorb 11.11 peaks of 3× normal daily volume `[ASSUMPTION]` with no system-caused missed carrier waves. Peak load test is a cutover release gate.
- NFR-2 Scan latency: PDA/station scan accept/reject feedback ≤ 500 ms p95 under peak load; label prints within 2 s of last verification scan `[ASSUMPTION]`.
- NFR-3 Offline tolerance: PDA picking, counting and moves queue scans offline and sync on reconnect without duplicates. Scans needing live data (cancellation checks at pack and sort) fail closed with a clear message.
- NFR-4 Availability: 99.9% during each warehouse's configured operating hours `[ASSUMPTION]`; no planned downtime within 3 days before a configured campaign day.
- NFR-5 Integration resilience: Every OMS and carrier call idempotent and retried with backoff; failed sends surface in a queue (FR-4); available-to-sell reaches OMS within 5 min of a stock change `[ASSUMPTION]`.
- NFR-6 Data integrity: Ledger append-only; daily reconciliation (FR-7) shows zero unexplained difference; no feature writes stock outside the ledger.
- NFR-7 Security: RBAC enforced server-side for every page and action, data scoped by warehouse; MFA available to the company and mandatory for Zimple support; all sensitive actions logged (FR-107).
- NFR-8 Localization: Thai primary, English available; document numbers use Gregorian YY; dates in the user's locale/era.
- NFR-9 Floor usability: Every floor task completable by scanning + minimal numeric entry; rejections use full red screen + sound; new floor staffer completes a pick list, pack job and putaway unaided after one supervised shift `[ASSUMPTION]`.
- NFR-10 Device support: Rugged Android PDAs with built-in scanners `[ASSUMPTION]`, USB/HID scanners, 80 mm thermal and label printers, A4 printers, USB/serial scales, IP cameras. Web fallback without PDAs per FR-122.
- NFR-11 Multi-warehouse readiness: Data model and permissions support > 1 warehouse per company; user can switch warehouse. Pilot runs one site `[ASSUMPTION]`.
- NFR-12 UX quality: Users rate it easier than JST (SM-10 ≥ 80%); web and PDA share one design system (consistent components, status colours, scan feedback); CS answers "where is this order and what happened?" from the order screen alone in < 1 min `[ASSUMPTION]`.
- NFR-13 Privacy (PDPA, PRD §6.1): Buyer PII masked by default on screens, exports and reports (unmasked only with *view buyer PII*). Retention: pack/receiving video 60 days, collector ID photos 90 days, day-labour phones 90 days; auto-purged after limit except clips locked to an open case. Every PII view and export logged.
- NFR-14 Operational guardrails (PRD §6.2): No manual stock adjustment anywhere; no automatic disposal ever; platform-issued labels never edited; no order created, edited or cancelled in the WMS.

### Additional Requirements

> **No architecture document exists.** The items below are drawn from PRD §5/§7, addendum §D and UX open questions. Items tagged `[ARCH-PENDING]` require an architecture decision; stories depending on them should not be marked ready-for-dev until resolved.

**Starter template / project foundation**
- `[ARCH-PENDING]` No starter template is specified. Epic 1 Story 1 cannot name one yet. Known fixed constraints for the scaffold: shadcn/ui (Radix + Tailwind) on every surface (DESIGN.md), Thai/English i18n, light theme only, multi-tenant with company-level edition flag (Business vs 3PL) and per-company/warehouse add-on toggles.
- `[ARCH-PENDING]` PDA build: native Android vs web/PWA on Chrome WebView (UX working default: web/PWA). Drives offline queue, scanner integration, sound/vibration APIs.

**Integration**
- Zimple OMS connector is the critical gating dependency (Q-3). WMS ↔ OMS contract must be agreed first and must be idempotent, queued, retried with backoff (addendum §D peak pattern: queues with backoff, AWB prefetch before pick wave, idempotent ready-to-ship).
- `[ARCH-PENDING]` Zimple OMS API rate limits and peak behaviour (FR-7 note, Q-3).
- Generic WMS API (API keys + webhooks) for non-Zimple OMS; contract must be stable before prospect onboarding.
- Direct carrier APIs (Flash, KEX, J&T) only for non-marketplace orders: tracking, label, receipt events. No public API docs found; access via business accounts.
- TikTok Shop labels cannot be voided via API — affects cancellation after label print (FR-93).
- OMS after-sales decision-case channel (FR-121) — depends on Zimple OMS support.

**Data & engines**
- Append-only stock ledger (`SL-` lines) with running balance and m³ delta per line; a move writes 2 lines; daily reconciliation compares balance vs sum of lines (addendum §D).
- Settings precedence engine: 5 levels, effective-dated values with history, strictest-wins for shelf life, `[warehouse-wide]` lock flag.
- Owner-scoped data model everywhere (§4.16); billable-event signals and claims evidence chain captured from day one.
- Document numbering service: `PREFIX-YYMMDD-seq`, Gregorian YY, configurable prefix/digits, never decreasing.
- Shared approvals, notifications (in-app, LINE, email) and immutable activity log engines used by all features.

**Hardware & devices**
- PC ↔ station binding by 6-digit code; peripheral health checks (scanner, printer, scale, camera); station gets no work unless all devices bound and tested.
- `[ARCH-PENDING]` Silent printing to bound station/zone printers with no browser dialog — needs a local print agent or kiosk mode (UX Open Q-12).
- `[ARCH-PENDING]` Scale integration (USB/serial) and IP camera integration from a web station.
- Video storage: primary on local NAS, in-WMS playback; 60-day retention, 7-day soft delete, case locks, storage > 90% alert. Cloud copy is Phase 2.
- PDA camera fallback: IP camera → built-in → none. USB cameras not usable with a PDA.
- `[ARCH-PENDING]` Tablet pairing for signature capture from a station/web session (UX Open Q-11).

**Infrastructure, security & operations**
- `[ARCH-PENDING]` Hosting region and data residency for buyer PII and video (Q-9).
- Server-side RBAC, warehouse data scoping, MFA (mandatory for Zimple support), session lockout rules.
- Monitoring/alerting to support 99.9% availability in operating hours and the campaign-day change freeze.
- Peak load test (30k/day, 3× peak) as a cutover release gate.
- Non-blocking client updates: new version applies at task end or next login, never mid-scan.
- Scheduled jobs: 06:00 reconciliation, carrier-data re-pull every 5 min, replenishment every N min, retention purges, overdue/escalation timers.

**Warehouse layout and routing (added 2026-11-23, sprint-change-proposal-2026-11-23)**
- `[ARCH-PENDING]` Layout rendering: hand-written SVG vs a canvas library (e.g. Konva, Fabric). A library is a new dependency and needs approval.
- `[ARCH-PENDING]` Layout data model: one layout per warehouse with draft/published versions, element geometry, slot↔location binding, walkable aisle graph. This is a schema change and needs approval.
- `[ARCH-PENDING]` Route engine performance: stop ordering at list creation must hold at peak (NFR-1). Proposed: precompute slot-to-slot walking distances on publish, then order stops with nearest-neighbour + 2-opt at pick time; agree a per-list latency target.

**Cutover**
- Opening-balance and structure imports with dry-run/row-level errors; cutover check gate; written 2-week rollback runbook to JST `[ASSUMPTION]`. In-flight orders/ASNs at cutover are open (Q-4).

### UX Design Requirements

**Design tokens & theming**
- UX-DR1: Implement the full color token set from DESIGN.md frontmatter as shadcn CSS variables on `:root` (light only), including extended semantic tokens (`success*`, `warning*` incl. `warning-strong`, `danger-soft*`, `info*`, `neutral*`, `scan-accept/reject/blocked*`, `pda-bar*`, `support-banner*`, `chart-1…5`), registered in the Tailwind theme so utilities like `bg-success-soft` exist. No raw hex in components.
- UX-DR2: Implement the typography ramp (IBM Plex Sans Thai 400/500/600/700 + IBM Plex Mono 500/700) with all named styles (display-kpi, h1–h3, body, label, caption, code, pda-*, scan-input, station-next, station-counter, feedback-headline). Thai line-height ≥ 1.45, no letter-spacing/all-caps, tabular numerals right-aligned in tables/counters; "large text" user setting scales office ramp ×1.125 (PDA ignores).
- UX-DR3: Implement radius (`sm 4 / md 6 / lg 8 / xl 12 / full`, shadcn `--radius` = 8px) and spacing tokens including register deltas (page padding, control heights 36/48/56/64, table row 44/36 dense, scan fields 64/56, sidebar 240/64, sheet 560).
- UX-DR4: Tenant theming: tenant may override only logo and `primary` (+ derived `ring`, `primary-hover`, `accent`). Contrast guard on save: white on candidate ≥ 4.5:1, candidate on background ≥ 3:1, hue not within ±20° of success/destructive/warning-strong; on failure keep default `#4A3FD6` and explain inline. Status, scan, destructive and chart tokens never tenant-editable.

**Shell & navigation**
- UX-DR5: Office shell: 240px sidebar collapsing to 64px rail (state persisted per user, rail tooltips), 56px header with warehouse switcher, global search (Ctrl+K), approvals and notifications counts, user menu. Tenant logo top, "by Zimple Solution" bottom. Browser title "{page} · {warehouse} · Zimple WMS/Fulfillment".
- UX-DR6: Phase 1 navigation tree exactly as EXPERIENCE.md IA; Phase 2/Later items not rendered. Each module opens on its ภาพรวม hub; L2 tabs are URL routes with count chips (actionable-only, hidden at 0, "99+"), last tab remembered per user. Level-3 settings as a secondary Tabs row.
- UX-DR7: Visibility rules engine applied in order phase → edition → owner count → add-on → permission → device binding; a hidden item disappears from nav, search, PDA tiles and deep links (deep link shows not-available / no-permission state).
- UX-DR8: Global search / command (shadcn Command) accepting typed or scanned order, pick-list, ASN, parcel, SKU codes and jumping to the record.
- UX-DR9: Warehouse switcher dialog that keeps open work and reloads data scope.

**Shared office components**
- UX-DR10: Status badge component: one 5-tone map (success/warning/destructive/neutral/info), always icon + Thai label + tone, tooltip with status time and actor. "Urgent" always destructive; "waiting for approval" always warning.
- UX-DR11: Data table: server-side pagination (50 default, no infinite scroll), filters/sort/page in URL, saved views per user, sticky header + sticky first column (doc number in mono + primary), right-aligned tabular numbers, column priority P1–P3 with "คอลัมน์" menu at narrow widths, row click → detail, checkbox → bulk action bar, Excel export respecting filters and masking, empty state.
- UX-DR12: Filter bar: debounced (300 ms) search also accepting scanner input, status tabs with counts, date preset ToggleGroup, ≤ 3 selects, "ล้างตัวกรอง" only when active, export at far right.
- UX-DR13: Bulk action bar reporting partial results ("ทำได้ 18 · ข้าม 2 (เหตุผล)"), never silent all-or-nothing.
- UX-DR14: Hub components: KPI card, queue card (overdue danger-soft chip), pipeline bar (chart tones in stage order, segments are links), "ข้อมูล ณ HH:MM" data-as-of, every blocked item ≤ 2 clicks from overview.
- UX-DR15: Sheet (560px create/edit): focus trap, first field focused, unsaved-changes AlertDialog on Esc/close, validation errors inline + summary + scroll to first error, sticky footer; only one Sheet at a time, no Dialog over Sheet except AlertDialog.
- UX-DR16: Destructive actions always via AlertDialog naming object and consequence, focus on Cancel; irreversible stock-affecting actions require a reason field. Buttons with server actions show spinner and disable until response (no double submit). Confirm buttons say verb + object.
- UX-DR17: Notifications & approvals panel: 400px right Sheet with tabs รออนุมัติ / การแจ้งเตือน; opens on approvals when count > 0; one-click approve, reject requires reason; approve button hidden for requester on money-related items; live updates with aria-live announcements.
- UX-DR18: Support-access banner: full-width 40px above header, non-dismissible, ticket code, expiry, "ยกเลิกสิทธิ์" (admin permission + confirm).
- UX-DR19: Masked value component for PII (`08x-xxx-1234` + lock icon), eye reveal only with *view buyer PII*, each reveal logged, re-masks after navigation. Price/cost fields absent (not masked) without permission.
- UX-DR20: Empty, loading and error states: skeletons on cold load with 10 s retry message; first-use empty state with setup action; no-work and filtered-empty variants; persistent destructive toast for server errors with reference code; "ส่งข้อมูลไม่สำเร็จ n รายการ" hub row for integration errors; office offline banner disabling writes; save-conflict "ข้อมูลเปลี่ยนแล้ว · โหลดใหม่"; read-only closed records with neutral "ปิดแล้ว" badge.
- UX-DR21: Toasts (Sonner): success auto-dismiss 4 s, errors persist; never used for floor scan results.

**Floor components (stations & PDA)**
- UX-DR22: Station layout: full-screen 3-zone (job context 30% / scan column 45% / evidence 25%), evidence stacks below 1366px; device-not-ready setup state listing each device's status; device status chips (printer/scale/camera fault → destructive).
- UX-DR23: Scan input (station 64px / PDA 56px sticky with camera-scan button), always holds focus on task screens; typed entry allowed but logged as manual where scan is required.
- UX-DR24: Next-scan banner + step strip: always shows the single next expected scan; steps advance only on valid scan (except steps marked tappable).
- UX-DR25: Requirement tile and scanned-vs-expected rows (live update, incomplete-first sort, ครบ/ขาด/เกิน badges, completed rows collapse on PDA).
- UX-DR26: Full-screen feedback screens: reject (scan-reject red, x-octagon 96px, headline reason + action line, long double low tone, 3 long pulses, stays ≥ 1.5 s until next valid scan or 64px ack button) and blocked (scan-blocked amber, pause-octagon, chime repeating every 10 s, "เรียกหัวหน้า" / "พักงานไว้"). Accept is NOT full-screen: 300 ms success-soft flash + short high beep + counter update. Take focus with `role="alert"`, return focus to scan field.
- UX-DR27: Sound/vibration grammar distinct by rhythm and pitch (accept, step complete, reject, blocked, urgent task); volume per device; mute supervisor-only. Feedback within 500 ms p95.
- UX-DR28: Cancelled-during-work lock state: full-screen reject "คำสั่งซื้อถูกยกเลิก", printing locked, names CXL location, cleared only by scanning the cancelled-goods location (creates the exception record).
- UX-DR29: Scan-as-command barcodes at stations ("ปิดกล่อง", "ของขาด", "พักงาน", "พิมพ์ซ้ำ") equivalent to the buttons; station F-keys F2 short/exception, F4 park, F8 reprint (reason → approval), F11 full-screen, Esc never closes a job.
- UX-DR30: Supervisor on-the-spot approval: supervisor scans own badge on the blocked screen then confirms with reason `[ASSUMPTION]`.
- UX-DR31: Camera/recording indicator (destructive dot + "กำลังบันทึก" + elapsed; "ไม่มีวิดีโอ" warning-soft pill when no camera); recording starts on job open and continues through label print.
- UX-DR32: Print status chip (ยังไม่พิมพ์ / พิมพ์แล้ว / สำเนา #n / เครื่องพิมพ์ออฟไลน์); silent print to bound printer; batch print unprinted-only; reprint marked "สำเนา"; printer-offline hold message; printed docs carry tenant logo + "by Zimple Solution" and user's calendar era.
- UX-DR33: Signature pad (≥ 320×160, signer name required, "ล้าง" clear, submit disabled until a stroke, shown on manifest preview before confirm); tablet handoff "sign on tablet".
- UX-DR34: PDA top bar (56px dark, back never discards scans — task parked, worker + clock, offline indicator, overflow: lock, switch warehouse, language, sign out).
- UX-DR35: PDA home tiles (2-column, live count refresh on focus + every 60 s, urgent tasks reorder to top with chime and destructive chip) and universal scan field on home that opens the matching task (parcel → sort, container → handover, pick-list QR → picking, location → stock, ASN → receiving).
- UX-DR36: PDA task card (≥ 72px, code line, description, progress caption, ⚡ ด่วน marker) with tabs ของฉัน / รอรับ; tap or scan to claim; claimed cards show claimer and aren't claimable.
- UX-DR37: Location callout (36px mono on accent) advancing after the location scan.
- UX-DR38: Offline queue strip ("รอส่ง n รายการ", read-only list, no resend button); offline-queueable tasks continue with local accept/reject on cached data; server-rejected queued scan raises PDA notification + supervisor queue item; live-check tasks fail closed with "ต้องต่อสัญญาณเพื่อตรวจคำสั่งยกเลิก" and auto-resume.
- UX-DR39: PDA idle lock screen "สแกนบัตรของ {name} เพื่อปลดล็อก", resuming the task exactly.
- UX-DR40: PDA sizing: targets ≥ 56px (primary 64px) with ≥ 8px gaps, body ≥ 16px, single column, portrait, primary action pinned bottom, no horizontal scroll.
- UX-DR41: Dedicated PDA designs still owed for putaway and sort-to-container (Q-11); interim uses generic PDA task pattern (location callout → scan → feedback).

**Accessibility, localization, platform**
- UX-DR42: WCAG 2.2 AA on all surfaces: never colour-only, visible 2px ring + 2px offset focus, keyboard-first with logical tab order and skip link, 200% zoom reflow on office, route-change title announcements, aria-live polite for table/filter counts and assertive for station scan results, aria-labels on icons, masked values announce "ซ่อนข้อมูล", reduced-motion replaces flashes, ≤ 3 flashes/sec, `lang` per user setting, codes `translate="no"`.
- UX-DR43: Office keyboard shortcuts: Ctrl+K or `/` search, `g`+`o/i/p/k/h/r` module jumps, `a` approvals, `j/k/Enter/x` list navigation, Ctrl+Enter/Esc in Sheets; listed in user menu "คีย์ลัด"; single-key shortcuts off while a text field is focused (except station F-keys).
- UX-DR44: Localization: Thai default, per-user English switch (user menu + login screens); one calendar era (ค.ศ./พ.ศ.) per user across every screen, export and print, date pickers in user's era; doc numbers stay Gregorian YY; Asia/Bangkok; formats `10 ต.ค. 2026`, 24h time, `฿1,250.00`, kg·cm; no Thai digits; relative time only in feeds; no truncated buttons; headers wrap to 2 lines.
- UX-DR45: Microcopy voice: "what happened · what to do next", glossary terms (ใบหยิบ, ใบรับเข้าชั่วคราว, ภาชนะ, เจ้าของสินค้า, แพ็ค, สต๊อก, รหัสสินค้า), no exclamation/emoji/blame, no "OK" on consequential confirmations, no design notes in UI.
- UX-DR46: Responsive breakpoints: office ≥ 1440 full; 1280–1439 P3 hidden, 3-up KPIs; 1024–1279 sidebar rail, P2–P3 hidden; < 1024 read + approvals only; station ≥ 1366×768; PDA ~360–480px; tablet 768+ signature only. Chrome/Edge on Windows, Chrome WebView on Android.
- UX-DR47: Non-blocking updates: new version prompts "รีเฟรชเมื่อจบงานนี้" and applies at task end or next login, never mid-scan.
- UX-DR48: Banned patterns enforced: infinite scroll, drag-and-drop as the only way, hover-only affordances, modal-on-modal (except AlertDialog over Sheet), auto-advancing carousels, forced blocking updates, gradients, second brand colour, whole-row status colouring, 10–11px text, PDA buttons < 56px.
- UX-DR49: Draft-wave reservation countdown (FR-62) warns at 2 minutes and allows extension; no time-limited action without warning.

### FR Coverage Map

| FR | Epic | Note |
|---|---|---|
| FR-1, 2, 5 | Epic 7 | Order intake, carrier data readiness, cancellation/change-request intake |
| FR-3 | Epic 3 | SKU, kit, ASN sync |
| FR-4 | Epic 4 (stock push), Epic 5 (inbound result), Epic 7 (status/tracking) | Split by payload |
| FR-6 | Epic 12 | Post-handover events → expected returns |
| FR-7 | Epic 4 | Daily 06:00 reconciliation |
| FR-8, 10–16 | Epic 2 | Structure, containers, devices, rules, precedence, pickup rounds, numbering, calendar |
| FR-125 | Epic 2 | Layout editor, location binding, route engine |
| FR-9 | Epic 15 | Doors and staging points [Defer] |
| FR-17–23 | Epic 1 | Users, roles, special permissions, web/PDA sign-in, day-labour, support access |
| FR-24–26, 28 | Epic 3 | Warehouse attributes, units/barcodes, lot/expiry/serial, packaging items |
| FR-27 | Epic 6 | Kits (needs the ledger from Epic 4) |
| FR-29–39 | Epic 5 | Inbound: queue, ASN, TM, unmatched parcels, counting, labels, evidence, exceptions, putaway, close |
| FR-40–43 | Epic 4 | Stock views, buckets, ledger, reversal |
| FR-126 | Epic 4 | Layout map view with occupancy |
| FR-44–51, 53–55 | Epic 6 | Moves, material issue, replenishment, counts, accuracy, damaged, disposition, dashboard |
| FR-52 | Epic 8 | FEFO allocation |
| FR-56–60 | Epic 7 | Lifecycle, detail, hold, change requests, cut-off board |
| FR-61–64, 66–72, 74 | Epic 8 | Pick rules, draft wave, methods, allocation, queue, PDA picking, UoM, empty confirm, short pick, staging, put wall, overview |
| FR-65 | Epic 15 | Automatic pick lists [Defer] |
| FR-73 | Epic 10 | Missed wave |
| FR-75 | Epic 9 (by order, by pick list, multi-box), Epic 15 (production line) | |
| FR-76–82, 84 | Epic 9 | Verification, weight, labels, box/materials, video, routing, exceptions, VAS |
| FR-83 | Epic 15 | Pre-pack prep [Defer] |
| FR-85–91 | Epic 10 | Sort, container/seal, loading, manifest, customer pickup, overview, day close |
| FR-92 | Epic 7 | Cancellation stage classification |
| FR-93 | Epic 8 (pick), Epic 9 (pack), Epic 10 (sort/handover) | Enforcement at every scan point |
| FR-94–97 | Epic 11 | Carrier-rejected labels, cancel after pick, cancel-return job, restock |
| FR-98–104 | Epic 12 | Expected returns, return receipt, quarantine, inspection, restock, problem reports, board |
| FR-105–107 | Epic 1 | Approvals, notifications, activity log engines |
| FR-108–110 | Epic 13 | Overdue alerts, overview, reports |
| FR-111 | Epic 4 | Opening balance import |
| FR-112 | Epic 2 | Structure import |
| FR-113 | Epic 3 | Warehouse-local attribute import |
| FR-114 | Epic 14 | Cutover check |
| FR-115 | Epic 6 | Lot hold and recall |
| FR-116, 120 | Epic 7 | Ship-by due date, kit explosion |
| FR-117 | Epic 10 | Instant/express rider orders |
| FR-118, 123, 124 | Epic 9 | In-box tax documents, owner packing rules, reopen box |
| FR-119 | Epic 3 | Connection settings |
| FR-121 | Epic 5 | Decision cases to OMS after-sales (first used by inbound; reused by Epics 6, 12) |
| FR-122 | Epics 5, 6, 8, 10, 12 | Each flow epic has its own web/paper-task fallback story |
| FR-DATA-1, 5 | Epic 2 (owner-scoped model, precedence slot) | Enforced in ACs of every later epic |
| FR-DATA-2, 3, 4 | Epics 5, 6, 9, 10, 12 | Billable signals, evidence chain, variance cost captured in flow-epic ACs |
| UX-DR1–21, 34, 35, 39, 40, 42–49 | Epic 1 | Design system, office shell, shared components, PDA shell |
| UX-DR22–27, 29–33, 36–38, 41 | Epic 5 first, reused by Epics 6, 8–12 | Station and floor components |
| UX-DR28 | Epic 9 first, reused by Epic 10 | Cancelled-during-work lock |

## Epic List

### Epic 1: Secure Access & Governed Actions
Admins set up users, roles and special permissions; office staff sign in on the web and floor staff by badge on a PDA, inside one shared design system. Shared approvals, notifications and activity log engines are available to every later feature.
**FRs covered:** FR-17, FR-18, FR-19, FR-20, FR-21, FR-22, FR-23, FR-105, FR-106, FR-107

### Epic 2: Warehouse, Devices & Rules Setup
Admins model the warehouse (zones, locations, containers) and draw the warehouse layout that drives pick routes, register and test PDAs, stations, printers, scales and cameras, and configure rules with precedence, pickup rounds, numbering and calendar.
**FRs covered:** FR-8, FR-10, FR-11, FR-12, FR-13, FR-14, FR-15, FR-16, FR-112, FR-125

### Epic 3: Product Master & OMS Connection
The warehouse connects to Zimple OMS, receives SKUs, kits and ASNs, and records what it measures and controls: dimensions, barcodes, lot/expiry/serial tracking and packaging materials.
**FRs covered:** FR-3, FR-24, FR-25, FR-26, FR-28, FR-113, FR-119

### Epic 4: Stock Ledger, Opening Balance & Visibility
Admins load approved opening balances; everyone sees trustworthy stock by SKU, location and lot backed by an immutable ledger; ATP is pushed to the OMS and reconciled daily.
**FRs covered:** FR-4 (stock push), FR-7, FR-40, FR-41, FR-42, FR-43, FR-111, FR-126

### Epic 5: Inbound — Receive to Sellable
Receivers record arrivals, count against ASNs at a camera station or PDA, route exceptions to quarantine and OMS decision cases, and put stock away so it becomes sellable.
**FRs covered:** FR-4 (inbound result), FR-29, FR-30, FR-31, FR-32, FR-33, FR-34, FR-35, FR-36, FR-37, FR-38, FR-39, FR-121, FR-122 (inbound)

### Epic 6: Inventory Control & Counting
Stock staff move and replenish stock, run blind counts with approved variances, handle damaged and held goods, and managers track accuracy.
**FRs covered:** FR-44, FR-45, FR-46, FR-47, FR-48, FR-49, FR-50, FR-51, FR-53, FR-54, FR-55, FR-115, FR-27, FR-122 (moves/counts)

### Epic 7: Order Intake, Visibility & Cut-off
Orders flow in from the OMS with carrier data and due dates; CS answers "where is this order?" from one screen; supervisors hold orders, handle change requests and see risk per carrier wave.
**FRs covered:** FR-1, FR-2, FR-4 (status/tracking), FR-5, FR-56, FR-57, FR-58, FR-59, FR-60, FR-92, FR-116, FR-120

### Epic 8: Picking
Planners build pick lists through draft waves with FEFO allocation; pickers execute them on PDAs with a fixed short-pick flow, staging and put-wall sorting; cancellations stop picking.
**FRs covered:** FR-52, FR-61, FR-62, FR-63, FR-64, FR-66, FR-67, FR-68, FR-69, FR-70, FR-71, FR-72, FR-74, FR-93 (pick), FR-122 (picking)

### Epic 9: Packing Station
Packers pack at bound stations with scan verification, weight check, video, box suggestion and material deduction; cancellations lock label printing; supervisors resolve exceptions.
**FRs covered:** FR-75 (by order, by pick list, multi-box), FR-76, FR-77, FR-78, FR-79, FR-80, FR-81, FR-82, FR-84, FR-93 (pack), FR-118, FR-123, FR-124

### Epic 10: Handover & Day Close
Handover staff sort parcels into the sorted state, seal containers, load vehicles by container, sign manifests and close the day against a checklist; stock is deducted at handover confirm.
**FRs covered:** FR-73, FR-85, FR-86, FR-87, FR-88, FR-89, FR-90, FR-91, FR-93 (sort/handover), FR-117, FR-122 (sort/handover)

### Epic 11: Cancellation Recovery
Goods from cancelled orders that never left the warehouse return to stock through cancel-return jobs and restock moves; carrier-rejected labels are reconciled.
**FRs covered:** FR-94, FR-95, FR-96, FR-97

### Epic 12: Returns
Returning parcels are expected, received per carrier drop-off, inspected with evidence, restocked or quarantined, and escalated through problem reports.
**FRs covered:** FR-6, FR-98, FR-99, FR-100, FR-101, FR-102, FR-103, FR-104, FR-122 (returns)

### Epic 13: Overview, Reports & Overdue Alerts
Warehouse managers see a live overview, run Phase 1 reports with export and scheduling, and get SLA overdue alerts.
**FRs covered:** FR-108, FR-109, FR-110

### Epic 14: JST Cutover
Admins run a cutover check that gates the first live wave on Zimple.
**FRs covered:** FR-114

### Epic 15: Post-pilot Extensions [Defer]
Doors and staging points, automatic pick lists, production-line packing and pre-pack prep, after the pilot is stable.
**FRs covered:** FR-9, FR-65, FR-75 (production line), FR-83

## Epic 1: Secure Access & Governed Actions

Admins set up users, roles and special permissions; office staff sign in on the web and floor staff by badge on a PDA, inside one shared design system. Shared approvals, notifications and activity log engines are available to every later feature.

### Story 1.1: Project Foundation and Design-System Shell

As a developer on the Zimple WMS team,
I want a scaffolded multi-tenant web application with the shadcn/ui design tokens, Thai/English i18n and tenant/warehouse data scoping in place,
So that every later story builds on one design system and one data-scoping model.

**Acceptance Criteria:**

**Given** no application code exists
**When** the project is scaffolded
**Then** it uses the starter template chosen by the architecture document `[ARCH-PENDING]` — no starter template is specified yet, and this story cannot be marked ready-for-dev until one is chosen
**And** the repository contains one codebase serving office web, station and PDA surfaces (NFR-12) `[ARCH-PENDING: PDA native vs web/PWA]`

**Given** the app is running
**When** any page renders
**Then** every colour token from DESIGN.md frontmatter (core shadcn variables plus `success*`, `warning*` incl. `warning-strong`, `danger-soft*`, `info*`, `neutral*`, `scan-accept/reject/blocked*`, `pda-bar*`, `support-banner*`, `chart-1…5`) is defined as a CSS variable on `:root` and registered in the Tailwind theme so utilities such as `bg-success-soft` exist (UX-DR1)
**And** a lint/check fails the build if a component uses a raw hex colour (UX-DR1)
**And** only the light theme exists (UX-DR48)

**Given** the typography and shape tokens
**When** text and controls render
**Then** IBM Plex Sans Thai (400/500/600/700) and IBM Plex Mono (500/700) are loaded and every named style (display-kpi, h1–h3, body, body-strong, label, caption, code, pda-body, pda-caption, pda-title, pda-button, pda-location, scan-input, station-next, station-counter, feedback-headline) is available with Thai line-height ≥ 1.45 and no letter-spacing (UX-DR2)
**And** radius tokens `sm 4 / md 6 / lg 8 / xl 12 / full` are mapped with shadcn `--radius` = 8px, and spacing tokens (page padding, control heights 36/48/56/64, table rows 44/36, scan fields 64/56, sidebar 240/64, sheet 560) are defined (UX-DR3)

**Given** a user's language setting
**When** the UI renders
**Then** all UI strings come from Thai and English message catalogues, Thai is the default, and `lang` is set to `th` or `en` accordingly (NFR-8, UX-DR44)

**Given** the data layer
**When** any business record is created
**Then** it carries a company (tenant) id and, where warehouse-specific, a warehouse id, and every query is scoped server-side to the caller's tenant and permitted warehouses (NFR-7, NFR-11)
**And** the tenant has a company-level edition flag (Business / 3PL) and add-on toggles stored per company and warehouse, readable by later visibility rules (UX-DR7)
**And** a first tenant is seeded with one warehouse and a locked *System Administrator* account so later stories can sign in

### Story 1.2: Immutable Activity Log Recording

As a warehouse manager,
I want every significant action recorded in an append-only activity log,
So that I can always see who did what, on which device and why.

**Acceptance Criteria:**

**Given** any feature calls the activity-log service
**When** an action is recorded
**Then** an entry is stored with time, actor type (user, automation, OMS API, Zimple support), actor id, device, action, target record, old → new value and reason (FR-107)

**Given** an existing log entry
**When** any user or API attempts to update or delete it
**Then** the operation is rejected and no change occurs (FR-107, NFR-6)

**Given** the service is available to all modules
**When** sign-in/out (including failed attempts), create, edit, cancel, approve, reject, adjust, reverse, rule/user/permission changes, print/reprint or export occurs in later stories
**Then** each calls this service with the matching action type (FR-107, NFR-7)

**Given** log retention
**When** entries are older than 1 year
**Then** they are still retained `[ASSUMPTION: ≥ 1 year minimum, PRD §12]` (FR-107)

### Story 1.3: Office Web Sign-in and Session Management

As an office user,
I want to sign in on the web with email and password (and OTP when my company enables MFA) and pick my warehouse,
So that I can access only the warehouses I am allowed to work in.

**Acceptance Criteria:**

**Given** an active user with web sign-in enabled
**When** they enter a correct email and password
**Then** they are signed in, and if they have more than one warehouse in scope they choose one before reaching the app (FR-20)
**And** the sign-in is recorded in the activity log (FR-107)

**Given** the company has MFA enabled
**When** the user passes the password step
**Then** a 6-digit OTP is required, with resend allowed after 45 s (FR-20)
**And** a Zimple support account always requires OTP regardless of the company setting (FR-20, NFR-7)

**Given** a user enters a wrong password
**When** this happens 3 times in a row
**Then** the account is locked for about 15 minutes and the screen shows the locked state (FR-20)
**And** each failed attempt is logged (FR-107)

**Given** a user requests a password reset
**When** they submit any email address
**Then** the response is identical whether or not the email exists, and a reset link (if sent) is valid for 30 minutes (FR-20)

**Given** a signed-in user
**When** the session is idle beyond the configured timeout, or the user changes their password
**Then** the idle session ends, and a password change signs out all of the user's other sessions (FR-20)

**Given** a suspended user, or a user whose roles grant no web page
**When** they try to sign in
**Then** sign-in is refused with the matching message (suspended / no permission) (FR-17, FR-20)

### Story 1.4: Office Shell, Navigation and Visibility Rules

As an office user,
I want a consistent shell with sidebar, header and module tabs that shows only what applies to me,
So that I can move around the system quickly without seeing features I cannot use.

**Acceptance Criteria:**

**Given** a signed-in office user
**When** any office page loads
**Then** the shell shows a 240px sidebar collapsible to a 64px rail (state persisted per user, rail tooltips on hover/focus), the tenant logo at the top, "by Zimple Solution" at the bottom, and a 56px header with warehouse switcher, global search slot, approvals and notifications counts and user menu (UX-DR5)
**And** the browser title reads "{page} · {warehouse} · Zimple WMS" (or Zimple Fulfillment for the 3PL edition) (UX-DR5)

**Given** the Phase 1 navigation tree in EXPERIENCE.md
**When** the sidebar renders
**Then** it contains exactly the Phase 1 items, Phase 2/Later items are not rendered at all, each module opens on its ภาพรวม hub, L2 tabs are URL routes with actionable-only count chips (hidden at 0, "99+" above 99), and the last tab per module is remembered per user (UX-DR6)
**And** settings sub-pages use a secondary Tabs row, never a third sidebar level (UX-DR6)

**Given** the visibility rules
**When** an item is evaluated
**Then** rules apply in order phase → edition → owner count → add-on → permission → device binding, and the first hiding rule wins (UX-DR7)
**And** a hidden item is absent from nav, global search, PDA tiles and deep links; a deep link shows "ไม่มีสิทธิ์เข้าหน้านี้ · ติดต่อผู้ดูแลระบบ" or "ฟีเจอร์นี้ไม่ได้เปิดใช้ในบริษัทของคุณ" with a link home (UX-DR7)
**And** with exactly one owner in the warehouse, owner pickers and owner columns are hidden (FR-DATA-1, UX-DR7)

**Given** a user with more than one warehouse
**When** they open the warehouse switcher
**Then** a Dialog lists their warehouses; switching keeps open work and reloads all data scope (UX-DR9, NFR-11)

**Given** a new frontend version is deployed
**When** a user is mid-task
**Then** the app prompts "รีเฟรชเมื่อจบงานนี้" and applies the update only at task end or next sign-in, never blocking work (UX-DR47)

**Given** the office viewport width
**When** it is ≥1440 / 1280–1439 / 1024–1279 / <1024px
**Then** the layout follows the EXPERIENCE.md responsive table (full sidebar; P3 hidden and 3-up KPIs; rail and P2–P3 hidden; sidebar as Sheet with read-and-approve only) (UX-DR46)

### Story 1.5: Shared List Components — Status Badge, Data Table, Filter Bar, Bulk Actions and States

As an office user,
I want every list in the system to behave the same way,
So that I learn one pattern and can find, filter, export and act on records quickly.

**Acceptance Criteria:**

**Given** any status displayed anywhere
**When** the status badge renders
**Then** it uses only the 5-tone map (success / warning / destructive / neutral / info) with icon + Thai label + tone, and a hover/focus tooltip shows the status time and actor (UX-DR10)
**And** "urgent" (ด่วน/เร่งด่วน) is always destructive and "waiting for approval" is always warning (UX-DR10)

**Given** a data table
**When** it renders a list
**Then** it is server-side paginated (50 rows default, no infinite scroll), keeps filters, sort and page in the URL, has a sticky header and sticky first column (document number in mono + primary), right-aligned tabular numbers, and declares column priority P1–P3 with a "คอลัมน์" menu at narrow widths (UX-DR11)
**And** row click opens the detail page, the checkbox column enables the bulk action bar, and Excel export respects active filters and masking (UX-DR11)
**And** users can save named views (UX-DR11)

**Given** a filter bar
**When** a user types or scans in search
**Then** the search is debounced 300 ms and accepts scanner input; status tabs show counts; "ล้างตัวกรอง" appears only when a filter is active (UX-DR12)

**Given** rows are selected
**When** the user runs a bulk action
**Then** the bar shows "เลือก n รายการ" and the result reports done and skipped counts with reasons, e.g. "ทำได้ 18 · ข้าม 2 (เหตุผล)" (UX-DR13)

**Given** a list or hub is loading, empty, filtered-empty, failing or offline
**When** it renders
**Then** it shows skeleton rows (with "ยังโหลดไม่เสร็จ · ลองใหม่" after 10 s), a first-use empty state with at most one setup action, "ไม่พบรายการตามตัวกรอง" + clear filters, a persistent destructive toast with a reference code on server error, an office offline banner that disables writes, and "ข้อมูลเปลี่ยนแล้ว · โหลดใหม่" on a save conflict (UX-DR20)
**And** closed records show a neutral "ปิดแล้ว" badge with edit actions hidden (UX-DR20)
**And** success toasts auto-dismiss after 4 s and error toasts persist until dismissed (UX-DR21)

### Story 1.6: Shared Hub, Sheet and Confirmation Components

As an office user,
I want hubs, create/edit drawers and confirmations to behave predictably,
So that I never lose work or trigger an irreversible action by mistake.

**Acceptance Criteria:**

**Given** a module hub
**When** it renders KPI cards, queue cards and a pipeline bar
**Then** each card or segment is a link to its filtered queue, overdue counts use a danger-soft chip, pipeline segments use chart tones in stage order, and the hub shows "ข้อมูล ณ HH:MM" (UX-DR14)
**And** any blocked item is reachable within 2 clicks from the hub (UX-DR14)

**Given** a 560px create/edit Sheet
**When** it opens
**Then** focus is trapped, the first field is focused, and Esc/Close with unsaved changes opens an AlertDialog "ทิ้งการแก้ไข?" (UX-DR15)
**And** on save with validation errors the Sheet stays open, shows inline errors plus a summary, and scrolls to the first error (UX-DR15)
**And** only one Sheet is open at a time and no Dialog opens over a Sheet except an AlertDialog (UX-DR15)

**Given** a destructive action
**When** the user triggers it
**Then** an AlertDialog names the object and consequence with focus on Cancel, and irreversible stock-affecting actions require a reason field (UX-DR16)
**And** buttons that start a server action show a spinner and are disabled until the response (no double submit), and confirm buttons say verb + object, never "ตกลง"/"OK" (UX-DR16)

### Story 1.7: User Management

As an admin,
I want to create and manage users with roles, warehouse scope and sign-in methods,
So that each person can sign in the way their job needs.

**Acceptance Criteria:**

**Given** the user list (ผู้ใช้และสิทธิ์)
**When** an admin creates a user
**Then** they enter name, email or employee ID, one or more roles (each optionally temporary with an expiry), warehouse scope and sign-in methods (QR badge, username + password, optional OTP) (FR-17)
**And** the creation is logged (FR-107)

**Given** a temporary role with an expiry
**When** the expiry passes
**Then** the role no longer applies at the user's next sign-in (FR-17)

**Given** the company's license package user cap
**When** creating a user would exceed it
**Then** the save is refused with a message stating the cap (FR-17)

**Given** an admin suspends a user
**When** the user tries to sign in on web or PDA
**Then** sign-in is refused (FR-17)

**Given** a user with a QR badge sign-in method
**When** the admin prints badges
**Then** a printable badge QR is produced per user (FR-17)

### Story 1.8: Roles and Page × Action Permission Matrix

As an admin,
I want to define roles with a page × action matrix and scopes, enforced on the server,
So that people can only see and do what their job requires.

**Acceptance Criteria:**

**Given** the role editor
**When** an admin creates, copies, edits or deletes a role
**Then** they set per page the actions view, do, use on PDA, create/edit, cancel/delete, approve, print, export, plus zone, work-point and data scope (FR-18)

**Given** a permission with dependencies
**When** the admin ticks it (e.g. picking)
**Then** the dependent permissions (e.g. view orders, view inventory) are ticked automatically with a visible note (FR-18)

**Given** a role that can both count and approve adjustments
**When** it is saved
**Then** it is flagged inline as a segregation-of-duties risk (FR-18)

**Given** a role change
**When** it is saved
**Then** it applies at each affected user's next sign-in and is logged (FR-18, FR-107)

**Given** the product ships default roles
**When** a tenant is created
**Then** default roles exist (badged ตั้งต้น) including Warehouse Head and Handover Lead `[ASSUMPTION: Q-6 default role set unconfirmed]`, and *System Administrator* is locked with all rights and cannot be edited or deleted (FR-18)

**Given** any API call or page request
**When** the caller lacks the required page × action permission
**Then** the server refuses it regardless of the UI, and the UI hides (not disables) the page, tab, button or PDA tile (NFR-7, UX-DR7)

### Story 1.9: Special Permissions and Buyer PII Masking

As an admin,
I want to grant sensitive rights outside the role matrix, and have buyer PII masked for everyone else,
So that cost, video, PII and override powers go only to the right people.

**Acceptance Criteria:**

**Given** a user's permissions page
**When** an admin grants special permissions
**Then** the available set is: view product cost, act on behalf of owner, view or share video, approve an OMS cancellation after work started, day close, ad-hoc move, supervisor override when a scan fails, grant a temporary role, view buyer PII (FR-19)
**And** each grant/revoke is logged (FR-107)

**Given** a user with *grant a temporary role*
**When** they grant a role to someone
**Then** the granted rights cannot exceed the granter's own rights (FR-19)

**Given** a user without *view buyer PII*
**When** recipient phone, address or name appears on any screen, export or print preview
**Then** it is masked (e.g. `08x-xxx-1234` with a lock icon) and announced as "ซ่อนข้อมูล" (FR-19, NFR-13, UX-DR19)

**Given** a user with *view buyer PII*
**When** they click the eye icon on a masked value
**Then** that field is revealed, the reveal is logged, and it re-masks after navigation (UX-DR19, NFR-13, FR-107)

**Given** a user without the price or cost permission
**When** a price or cost field would show
**Then** the field or column is absent, not masked (UX-DR19)

### Story 1.10: Activity Log Viewer and Export

As a warehouse manager,
I want to filter and export the activity log,
So that I can investigate any change and prove who did it.

**Acceptance Criteria:**

**Given** the activity log page (ตั้งค่าบริษัท › เครื่องมือผู้ดูแลระบบ)
**When** a permitted user opens it
**Then** entries list time, actor and actor type, device, action, target, old → new value and reason, using the shared data table (FR-107, UX-DR11)

**Given** filters for date range, actor, actor type, action and target
**When** the user applies them
**Then** the list narrows accordingly (FR-107)

**Given** the user exports the log
**When** the export completes
**Then** it respects filters and PII masking, and the export itself is logged (FR-107, NFR-13)

### Story 1.11: Approvals Engine and Approvals Panel

As a supervisor,
I want sensitive actions to wait for a configured one- or two-step approval that I can act on from one panel,
So that risky changes are controlled without slowing the floor.

**Acceptance Criteria:**

**Given** the approvals settings
**When** an admin configures an approval type
**Then** they set a step-1 approver role, a step-2 condition and an escalation time (FR-105)
**And** the Phase 1 types are registered: stock adjustment (tiered by pieces, % and value), reversal, opening balance, release stale reservation, release held lot, material issue over limit, disposal, early ASN close, short-shelf-life receipt, label reprint, extra barcode, disabling a warehouse, bulk video deletion, support critical change (FR-105)

**Given** any feature submits an approval request with requester, payload and reason
**When** the request is created
**Then** it appears in the approvers' panel and the header shows the pending count (FR-105, UX-DR17)
**And** later epics can submit requests and receive approved/rejected callbacks through this engine

**Given** the approvals panel (400px Sheet, tabs รออนุมัติ / การแจ้งเตือน)
**When** it opens with pending items
**Then** it opens on รออนุมัติ; approve is one click; reject requires a reason; items update live and removed items fade with an aria-live announcement (UX-DR17)

**Given** a money-related approval type
**When** the requester views their own request
**Then** the approve button is hidden and the server refuses self-approval (FR-105)

**Given** an unanswered request
**When** its escalation time passes
**Then** it escalates to step 2, then to admin (FR-105)

**Given** any approve or reject
**When** it is recorded
**Then** the activity log captures actor, device, reason and old → new values (FR-107)

### Story 1.12: Notifications Engine and Notification Centre

As an admin,
I want to configure who is notified of what, in-app, on LINE or by email,
So that the right role hears about problems without noise.

**Acceptance Criteria:**

**Given** the notification settings
**When** an admin configures a notification type
**Then** they choose channels (in-app, LINE, email) and recipients (role, involved people, selected users) (FR-106)

**Given** a notification type marked mandatory (e.g. WMS ≠ OMS stock, video storage above 90%)
**When** an admin or user tries to turn it off
**Then** it cannot be turned off (FR-106)

**Given** a user's own preferences
**When** they mute LINE or email for a type
**Then** those channels are muted, but in-app delivery cannot be muted (FR-106)

**Given** a notification addressed to the owner
**When** it is raised
**Then** it is queued for delivery through the OMS rather than sent directly (FR-106)
**And** later epics raise notifications through this engine

**Given** the header notification count
**When** the user opens the panel's การแจ้งเตือน tab
**Then** notifications list newest first and mark as read on open (UX-DR17)

### Story 1.13: Global Search, Command Palette and Keyboard Shortcuts

As an office user,
I want to type or scan any code and jump to its record, and drive the app by keyboard,
So that I can answer questions and move between modules fast.

**Acceptance Criteria:**

**Given** the header search
**When** the user presses Ctrl+K or `/`
**Then** a Command palette opens that accepts typed or scanner input (UX-DR8, UX-DR43)

**Given** a known code is entered (order, pick list, ASN, parcel/tracking, SKU)
**When** it matches a record the user may view
**Then** the app navigates to that record; records hidden by visibility rules are not returned (UX-DR8, UX-DR7)
**And** record types not yet built return no result rather than an error

**Given** the office shortcut set
**When** the user presses `g` then `o`/`i`/`p`/`k`/`h`/`r`, `a`, `j`/`k`/`Enter`/`x` in lists, or Ctrl+Enter/Esc in a Sheet
**Then** the matching action runs (go to module, open approvals, list navigation, save/close) (UX-DR43)
**And** single-key shortcuts are disabled while a text field has focus (UX-DR43)
**And** all shortcuts are listed in the user menu under "คีย์ลัด" and shown in tooltips (UX-DR43)

### Story 1.14: PDA Shell and Badge Sign-in

As a floor staffer,
I want to sign in on a PDA by scanning my badge and see only my task tiles,
So that I can start work in seconds without typing.

**Acceptance Criteria:**

**Given** the PDA login screen
**When** a staffer scans a registered badge QR (and the 4-digit PIN if enabled; PIN off by default)
**Then** they are signed in and land on PDA home (FR-21)
**And** username/password is offered only if enabled for that user, with no OTP on PDA (FR-21)

**Given** an unknown badge
**When** it is scanned
**Then** a full red screen and beep appear and a notification is sent (FR-21, FR-106)

**Given** a user already signed in on another PDA
**When** they sign in on a second PDA
**Then** sign-in is refused until they sign out of the first (one active PDA session per user) (FR-21)

**Given** a user whose roles have no PDA page
**When** they scan their badge
**Then** the PDA shows "ไม่มีสิทธิ์ใช้ PDA · แจ้งผู้ดูแลระบบเพื่อขอสิทธิ์ แล้วสแกนใหม่" (FR-21, UX-DR45)

**Given** PDA home
**When** it renders
**Then** it shows a 56px dark top bar (back, task name, worker, clock, offline indicator, overflow with lock, switch warehouse, language, sign out), a sticky universal scan field, and a 2-column grid of permitted task tiles with live counts refreshed on focus and every 60 s (FR-21, UX-DR34, UX-DR35)
**And** urgent tasks reorder to the top with a chime and a destructive chip (UX-DR35)
**And** a scanned code on home routes to its task type when that task exists; unknown codes give a reject screen (UX-DR35)

**Given** PDA layout rules
**When** any PDA screen renders
**Then** targets are ≥56px (primary 64px) with ≥8px gaps, body text ≥16px, single column, portrait, primary action pinned bottom, no horizontal scroll (UX-DR40)

**Given** an idle PDA
**When** the idle timeout passes
**Then** the screen locks with "ล็อกจอ · สแกนบัตรของ {name} เพื่อปลดล็อก" and rescanning the same user's badge resumes the exact task in progress (FR-21, UX-DR39)
**And** the back button never discards scans — a running task is parked, not cancelled (UX-DR34)

### Story 1.15: Tenant Branding with Contrast Guard

As a customer admin,
I want to upload our logo and set our primary colour safely,
So that the system looks like ours without breaking status colours or readability.

**Acceptance Criteria:**

**Given** company settings › ข้อมูลบริษัทและโลโก้
**When** the admin uploads a horizontal logo, a 512px PDA icon and a document logo
**Then** they show in the sidebar header, PDA login and printed documents, alongside the Zimple product mark and "by Zimple Solution" (UX-DR4, UX-DR5)

**Given** the admin enters a candidate primary colour
**When** they save
**Then** the system checks white text on the candidate ≥ 4.5:1, the candidate on `background` ≥ 3:1, and that its hue is not within ±20° of `success`, `destructive` or `warning-strong` `[ASSUMPTION: ±20°]` (UX-DR4)
**And** on pass, `primary`, `primary-hover`, `ring` and `accent` update for the tenant (UX-DR4)

**Given** a candidate that fails any check
**When** the admin saves
**Then** the default `#4A3FD6` is kept and an inline message explains which check failed (UX-DR4)

**Given** any tenant
**When** theming is edited
**Then** status, scan-feedback, destructive and chart tokens are not editable (UX-DR4)

### Story 1.16: Accessibility, Localization and UX Guardrail Conformance

As a pilot user,
I want every screen to meet one accessibility and localization standard,
So that the system is easier to use than JST for everyone on every shift.

**Acceptance Criteria:**

**Given** all office, station and PDA components built so far
**When** audited against WCAG 2.2 AA
**Then** nothing is conveyed by colour alone, every focusable element shows a 2px `ring` with 2px offset, tab order follows reading order, a skip link exists, office pages reflow at 200% zoom, route changes announce the page title, table/filter counts use `aria-live="polite"`, icons have `aria-label`s, `prefers-reduced-motion` replaces flashes with a static tint, nothing flashes more than 3 times per second, and codes carry `translate="no"` (UX-DR42)
**And** an automated accessibility check runs in CI on the shell and shared components

**Given** a user's profile settings
**When** they choose language (also selectable on web and PDA login screens) and calendar era ค.ศ./พ.ศ.
**Then** every screen, export and print follows that one era, date pickers display and accept input in it, document numbers stay Gregorian YY, time zone is Asia/Bangkok, formats follow `10 ต.ค. 2026` / 24h / `฿1,250.00` / kg·cm, Thai digits are never used, and relative time appears only in feeds (UX-DR44, NFR-8)
**And** buttons never truncate and table headers wrap to 2 lines (UX-DR44)
**And** the "large text" user setting scales the office type ramp by 1.125 while the PDA ignores it (UX-DR2)

**Given** UI copy
**When** it is reviewed
**Then** messages follow "what happened · what to do next", use glossary terms (ใบหยิบ, ใบรับเข้าชั่วคราว, ภาชนะ, เจ้าของสินค้า, แพ็ค, สต๊อก, รหัสสินค้า), contain no exclamation marks, emoji, blame or design notes (UX-DR45)

**Given** the shared component library
**When** reviewed against banned patterns
**Then** there is no infinite scroll, drag-and-drop-only action, hover-only affordance, modal-on-modal (except AlertDialog over Sheet), auto-advancing carousel, gradient surface, second brand colour, whole-row status colouring, text below 12px, or PDA button under 56px (UX-DR48)

**Given** any action with a time limit (e.g. a reservation countdown)
**When** a shared countdown component is used
**Then** it warns at 2 minutes remaining and offers an extension; no timed action runs out without warning (UX-DR49)

### Story 1.17: Day-labour Cards

As a supervisor,
I want to issue reusable day-labour cards with limited functions,
So that temporary workers can be productive on their first shift.

**Acceptance Criteria:**

**Given** the day-labour card list
**When** a supervisor issues a card
**Then** they record name, phone, agency, shift, allowed functions and an optional PIN, and the card works as a PDA badge limited to those functions (FR-22, FR-21)

**Given** an issued card
**When** its shift ends
**Then** the card is auto-returned and its status becomes free; statuses are in use, not returned, free, lost (FR-22)

**Given** a card scanned that is not registered for today
**When** a worker scans it on a PDA
**Then** the PDA shows "register with supervisor" and does not sign in (FR-21, FR-22)

**Given** a stored phone number
**When** 90 days pass
**Then** it is purged, and before then it is visible only to users with the special permission (FR-22, NFR-13)

### Story 1.18: Time-boxed Zimple Support Access

As a customer admin,
I want to grant Zimple support scoped, time-limited access and approve their critical changes,
So that support can help us without uncontrolled power over our data.

**Acceptance Criteria:**

**Given** company settings
**When** the customer admin grants support access
**Then** they set a scope, a ticket code and an expiry time, and access ends automatically at expiry (FR-23)

**Given** support access is active
**When** anyone in the tenant uses any surface
**Then** a 40px non-dismissible banner shows above the header with a lock icon, the ticket code, the expiry and a "ยกเลิกสิทธิ์" link that requires admin permission and confirmation (FR-23, UX-DR18)

**Given** a support user attempts a critical change (stock, roles, document numbering, connections or API keys, disabling a SKU)
**When** they submit it
**Then** it waits for customer-admin approval through the approvals engine (support critical change type) and applies only on approval (FR-23, FR-105)

**Given** any support action
**When** it executes
**Then** it is logged with actor type Zimple support (FR-23, FR-107)
**And** support accounts always require MFA (FR-20)

## Epic 2: Warehouse, Devices & Rules Setup

Admins model the warehouse (zones, locations, containers) and draw the warehouse layout that drives pick routes, register and test PDAs, stations, printers, scales and cameras, and configure rules with precedence, pickup rounds, numbering and calendar.

### Story 2.1: Warehouses and Zones

As an admin,
I want to create warehouses and zones,
So that the system mirrors our physical site.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › คลังและตำแหน่ง
**When** an admin creates a warehouse
**Then** it requires a unique 3-letter code and name, and becomes selectable in the warehouse switcher for scoped users (FR-8, NFR-11)

**Given** a warehouse
**When** the admin creates a zone
**Then** they set room type, capacity and walk-order pattern (FR-8)

**Given** a warehouse that holds any stock
**When** an admin tries to disable it
**Then** it is refused; a warehouse with zero stock can be disabled only after approval (disabling a warehouse type) (FR-8, FR-105)
**And** the change is logged (FR-107)

### Story 2.2: Locations and Location Labels

As an admin,
I want to create locations individually or in bulk and print their QR labels,
So that every place stock can sit is scannable.

**Acceptance Criteria:**

**Given** a zone
**When** an admin creates a location
**Then** it has one of 8 types (หยิบ pick, เก็บ storage, รับเข้า receiving, พักสินค้า staging, ส่งมอบ handover, คืน returns, รอคืนชั้น awaiting-restock, ชำรุด/กักกัน damaged/quarantine), a zone, walk sequence, sellable flag, capacity in m³ and kg, and a mixing policy (FR-8)

**Given** a range pattern (e.g. aisle A, rows 01–10, levels 01–04)
**When** the admin creates locations in bulk
**Then** all matching locations are created in one action with unique codes per warehouse (FR-8)

**Given** a location
**When** an admin sets it to ปิดใช้ (disabled)
**Then** it is flagged as blocking putaway and moves for later flows; the ล็อกนับ (locked for counting) state cannot be set manually here (FR-8)

**Given** selected locations
**When** the admin prints labels
**Then** QR labels print in bulk with the location code in mono type (FR-8)

**Given** a SKU
**When** stock is later placed
**Then** the data model allows one SKU in many locations (FR-8)

### Story 2.3: Container Types and Container Labels

As an admin,
I want to register container types and print permanent QR labels,
So that pallets, totes, carts and bags can be tracked through every stage.

**Acceptance Criteria:**

**Given** the containers page
**When** an admin registers a container type
**Then** they set code prefix (PL, TT, BG, CG, C20/30/40, FC, PW, DMG-T), first code, count, stages used and capacity, and the system generates that many containers (FR-10)

**Given** generated containers
**When** labels print
**Then** each container has one permanent QR, unique within the warehouse (FR-10)

**Given** a container
**When** it is created
**Then** it always sits in a location (default: the location chosen at creation) (FR-10)

**Given** the containers list
**When** it renders
**Then** it shows live usage (holding pick list or carrier wave, empty if none) and a *needs clearing* state that blocks reuse until a user clears it (FR-10)
**And** later epics set and clear these states

### Story 2.4: Device Registry and Device Status

As an admin,
I want to register every PC, scanner, PDA, printer, scale and camera with a live status,
So that I know which equipment is ready before a shift.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › อุปกรณ์และสถานี
**When** an admin registers a device
**Then** they choose its type (PC, USB scanner, PDA, printer, scale, camera), code and name (FR-11)
**And** supported classes cover rugged Android PDAs with built-in scanners, USB/HID scanners, 80 mm thermal and label printers, A4 printers, USB/serial scales and IP cameras (NFR-10) `[ARCH-PENDING: PDA native vs PWA, local device agent]`

**Given** a registered device
**When** its status is shown
**Then** it is one of ออนไลน์ online, ออฟไลน์ N นาที offline for N minutes, พร้อม ready, กระดาษหมด out of paper, ต้องแก้ needs fixing, ยังไม่ทดสอบ untested, as a status badge with icon + label (FR-11, UX-DR10)
**And** a new device starts as ยังไม่ทดสอบ (FR-11)

**Given** a PDA or PC that has not reported for N minutes
**When** the list refreshes
**Then** its status changes to offline with the elapsed minutes (FR-11)

**Given** each device
**When** an admin sets volume
**Then** the per-device volume is stored for later scan-feedback sounds; mute is a supervisor-only setting (UX-DR27 groundwork)

### Story 2.5: Stations, Work Points and 6-digit PC Binding

As an admin,
I want to define stations and work points and bind a PC to a station with a 6-digit code,
So that each desk knows its peripherals and its department.

**Acceptance Criteria:**

**Given** the stations page
**When** an admin creates a station
**Then** they set its type (packing, receiving, returns, handover), code (e.g. PS-04) and work point, and bind registered peripherals (scanner, printers, scale, camera) to it (FR-11)

**Given** a PC opening the station URL
**When** the operator enters the station's 6-digit bind code
**Then** the PC is bound to that station and the binding is logged (FR-11, FR-107)
**And** an invalid or expired code is rejected

**Given** a bound PC boots or reloads the station
**When** a bound peripheral is not detected
**Then** the station shows a setup state listing each device and its status, flagging the missing one (FR-11) `[ARCH-PENDING: local agent for printer/scale/camera access]`

**Given** the rule "จำกัดงานตามจุดงาน" (restrict work by work point) is on
**When** a device bound to a work point opens work
**Then** only that department's work is offered, regardless of user rights; unbound devices follow user rights (FR-11, UX-DR7)

### Story 2.6: Device Test and Station Readiness Gate

As an admin,
I want to test each device from the system and block stations that aren't ready,
So that no job starts at a desk whose printer, scale or camera doesn't work.

**Acceptance Criteria:**

**Given** a device in the list
**When** the admin presses its test button
**Then** the system runs the matching test — scanner beep/scan echo, printer test print, scale live weight read, camera live preview — and sets the status to พร้อม on success or ต้องแก้ on failure (FR-11) `[ARCH-PENDING: print agent, scale and IP-camera integration]`

**Given** a station with any bound device unbound, untested or faulted
**When** work would be routed to it
**Then** the station receives no work and shows its not-ready state (FR-11)

**Given** a printer reports out of paper or goes offline during a shift
**When** the status updates
**Then** the device status changes accordingly and the station's readiness is recomputed (FR-11)

**Given** each test run
**When** it completes
**Then** the result, user and time are logged (FR-107)

### Story 2.7: Settings Precedence Engine

As an admin,
I want every setting to resolve through system → company → warehouse → owner → SKU with effective dates,
So that rules can be set once and overridden safely where needed.

**Acceptance Criteria:**

**Given** a setting with values at several levels
**When** the system resolves it for a context (warehouse, owner, SKU)
**Then** the most specific level wins (FR-13)

**Given** a shelf-life threshold setting
**When** it resolves
**Then** the strictest value across levels wins, not the most specific (FR-13)

**Given** a setting marked *warehouse-wide*
**When** a value is set below warehouse level
**Then** it is refused (FR-13)

**Given** the owner level
**When** settings are stored
**Then** an owner-level slot exists in the data model with no Phase 1 UI, and owner-level values default to "use warehouse value" (FR-13, FR-DATA-5)

**Given** a value change with an effective date
**When** it is saved
**Then** the previous value remains in history, the new value applies from the effective date, and the change is logged (FR-12, FR-107)
**And** an unset setting falls back to the system default so a warehouse can start working immediately

### Story 2.8: Warehouse Rules Hub

As a warehouse manager,
I want to see and change warehouse rules grouped by stage, with their source level and history,
So that I know what is still on default and what must be set before go-live.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › กฎงานคลัง
**When** an admin or Warehouse Manager opens it
**Then** rules are grouped by stage (inbound, picking, packing, inventory, handover, returns, cancel-to-restock), each showing its current value and the level it comes from (FR-12)

**Given** the settings hub
**When** it loads
**Then** it lists *must set before use* blockers (e.g. an unbound pack station) and rules *still on system default* (FR-12)

**Given** the filter "differs from default"
**When** it is applied
**Then** only rules whose value differs from the system default show (FR-12)

**Given** a rule change
**When** it is saved with an effective date
**Then** the history shows old → new, actor and effective date (FR-12, FR-107)

**Given** rules that serve only billing, 3PL or excluded add-ons
**When** the edition is Business or the add-on is off
**Then** those rules are hidden (FR-12, UX-DR7)
**And** the rules screen design and defaults follow the Q-7 decision `[ASSUMPTION: Q-7 open — two designs]`

### Story 2.9: Carrier Pickup Rounds

As an admin,
I want to configure each carrier's pickup rounds with pack cut-off and handover mode,
So that orders can be planned against real truck times.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › เวลาและรอบรับ
**When** an admin adds a pickup round for a carrier from the system carrier list
**Then** they set pickup times, days, handover mode (container per wave, per order (rider), by job size, by vehicle trip), optional door and effective date (FR-14)

**Given** the setting "pack cut-off = pickup time − X minutes"
**When** a round is saved
**Then** its pack cut-off is computed from the pickup time and X (FR-14)

**Given** a campaign day
**When** the admin adds extra rounds for that date
**Then** the extra rounds apply only on that date (FR-14)

**Given** a carrier with no pickup round in a warehouse
**When** later flows check whether it can ship
**Then** the system reports it cannot ship (FR-14)

### Story 2.10: Document Numbering

As an admin,
I want to set document prefixes and digit counts,
So that every document number is recognisable and never collides.

**Acceptance Criteria:**

**Given** ตั้งค่าบริษัท › เอกสาร
**When** an admin edits a document type's prefix
**Then** it must be 2–4 letters and unique among document types (FR-15)

**Given** a numbering service used by every later epic
**When** a document is created
**Then** its number is `PREFIX-YYMMDD-seq` with a Gregorian YY and the configured digit count (FR-15, NFR-8)

**Given** a digit-count change
**When** the admin lowers it
**Then** it is refused; increasing it is allowed and affects new records only (FR-15)

**Given** a digit count too small for peak volume
**When** the admin views or saves it
**Then** a warning is shown (FR-15)

**Given** support access is active
**When** a support user changes numbering
**Then** it requires customer-admin approval (FR-23)

### Story 2.11: Warehouse Working Calendar

As an admin,
I want to set each warehouse's working days and holidays,
So that SLAs and overdue alerts count only working time.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › เวลาและรอบรับ
**When** an admin sets working days, hours and holidays for a warehouse
**Then** the calendar is saved per warehouse with an effective date (FR-16)

**Given** a stage SLA in a later epic
**When** elapsed time is computed
**Then** a calendar service returns working time that excludes non-working periods (FR-16)

**Given** a date on a holiday
**When** viewed in the calendar
**Then** it is marked as non-working in the user's calendar era (FR-16, UX-DR44)

### Story 2.12: Bulk Import of Zones and Locations

As an admin cutting over from JST,
I want to import zones and locations from a template with a dry run,
So that I can set up hundreds of locations in minutes without partial errors.

**Acceptance Criteria:**

**Given** a downloadable Excel template
**When** an admin uploads a filled file
**Then** a dry-run preview shows rows to be created and every row-level error inline (FR-112)

**Given** a file with any invalid row
**When** the admin tries to commit
**Then** nothing is imported — validation is all-or-nothing per file (FR-112)

**Given** a fully valid file
**When** the admin commits
**Then** all zones and locations are created and the import is logged (FR-112, FR-107)

**Given** an empty locations list
**When** it renders
**Then** the empty state offers "นำเข้าตำแหน่งจาก Excel" (UX-DR20)

### Story 2.13: Warehouse Layout Editor and Location Binding

As an admin,
I want to draw my warehouse to scale and bind every location to its place on the drawing,
So that the system knows where each location physically is.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › คลังและตำแหน่ง › ผังคลัง
**When** an admin opens the editor for a warehouse
**Then** a scaled canvas (metres, grid snap) shows the draft layout with tools for zone area, rack, aisle, wall/obstacle, door/dock, pick start/end point and text label, plus select, move, rotate, resize, duplicate, delete, undo/redo, zoom and pan (FR-125)

**Given** the rack tool
**When** the admin draws a rack and sets bays × levels and its facing side
**Then** the rack shows its slots and can be bound automatically by code pattern (prefix, row range, level range) or slot by slot; a location binds to at most one slot and the binding is shown on both the slot and the location record (FR-125, FR-8)

**Given** locations in the warehouse
**When** the admin opens the binding panel
**Then** it lists unbound pick and storage locations with a count, filters by zone and type, and binding from the list highlights the slot on the canvas (FR-125)

**Given** a disabled or locked-for-counting location
**When** it is bound
**Then** its slot shows the status tone and icon (FR-8, UX-DR10)

**Given** the draft
**When** the admin publishes it
**Then** validation blocks racks whose face does not touch an aisle, aisles not connected to a pick start point and a missing start point; it warns with the count of unbound pick/storage locations that will fall back to walk sequence; on success the version number increases and the publish is logged (FR-125, FR-107)

**Given** a published layout and pick lists already created
**When** a new version is published
**Then** existing lists keep their stop order and only lists created afterwards use the new layout (FR-125)

**Given** the editor on a screen narrower than 1280px or a user without edit permission
**When** the page opens
**Then** the layout is read-only with zoom and pan, and the binding panel stays available as a keyboard-accessible list alternative to the canvas (UX-DR46, UX-DR42)

### Story 2.14: Layout Route Engine and Route Preview

As an admin,
I want the system to compute walking routes on the published layout and let me preview them,
So that I can trust the pick order before pickers follow it.

**Acceptance Criteria:**

**Given** a layout is published
**When** publish completes
**Then** the walkable network (aisles, start/end points, rack faces) is built and walking distances between all bound slots and start/end points are precomputed for that version `[ARCH-PENDING: precompute approach]` (FR-125)

**Given** a set of locations and a start point
**When** the route service is called
**Then** it returns the stops in shortest-walk order using the precomputed distances, with total distance in metres; unbound locations are appended in walk-sequence order; with no published layout all stops follow walk sequence (FR-67, FR-8)

**Given** peak load
**When** pick lists are created
**Then** route ordering adds no more than an agreed latency per list `[ARCH-PENDING: target]` (NFR-1)

**Given** ผังคลัง › ทดสอบเส้นทาง
**When** the admin picks sample locations (or a sample of real pending order lines once Epic 7 exists)
**Then** the canvas draws the route with numbered stops, total distance and the comparison to walk-sequence order (FR-125)

## Epic 3: Product Master & OMS Connection

The warehouse connects to Zimple OMS, receives SKUs, kits and ASNs, and records what it measures and controls: dimensions, barcodes, lot/expiry/serial tracking and packaging materials.

### Story 3.1: OMS Connection Settings

As an admin,
I want to configure and test the connection to Zimple OMS,
So that master data and orders can flow in safely.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › การเชื่อมต่อ
**When** an admin enters the OMS endpoint and credentials
**Then** they can run a connection test before enabling it, and the result shows success or the error (FR-119) `[ARCH-PENDING: WMS ↔ Zimple OMS API contract]`

**Given** an enabled connection
**When** the page loads
**Then** it shows last-sync time and status per data type (FR-119)

**Given** credentials are changed
**When** the change is saved
**Then** it is logged without exposing the secret, and requires customer-admin approval when Zimple support is acting (FR-119, FR-23, FR-107)

### Story 3.2: Carrier Accounts and Carrier-name Mapping

As an admin,
I want to register carrier accounts and map OMS carrier names to our carriers,
So that every order is routed to the right carrier and none is guessed.

**Acceptance Criteria:**

**Given** the connection settings
**When** an admin adds a carrier account (Flash, KEX, J&T) with credentials
**Then** the account can be tested before it is enabled and shows last-sync status (FR-119) `[ARCH-PENDING: carrier API access via business accounts]`

**Given** the carrier-name mapping table
**When** the OMS sends a carrier name that has no mapping
**Then** it appears in the table as unmapped until an admin maps it (FR-119)

**Given** an admin maps a carrier name
**When** it is saved
**Then** the mapping applies to subsequent data and the change is logged (FR-119, FR-107)

### Story 3.3: Generic API Keys and Webhooks

As an admin,
I want to issue API keys and webhooks for a non-Zimple OMS,
So that another OMS can connect through a stable generic API.

**Acceptance Criteria:**

**Given** the connection settings
**When** an admin creates an API key
**Then** the key is shown once, stored hashed, scoped to the tenant, and the creation is logged (FR-119, FR-107)

**Given** an existing key
**When** an admin revokes it
**Then** calls using it are refused immediately and the revocation is logged (FR-119)

**Given** Zimple support is acting
**When** they create or revoke a key
**Then** customer-admin approval is required (FR-119, FR-23)

**Given** a webhook URL is registered
**When** the admin tests it
**Then** a test event is sent and the response is shown (FR-119)

### Story 3.4: SKU Master Sync from OMS

As a warehouse user,
I want SKUs synced from the OMS with OMS-owned fields read-only,
So that the warehouse and the OMS always agree on what a product is.

**Acceptance Criteria:**

**Given** an enabled OMS connection
**When** the OMS sends a SKU create or update
**Then** the SKU is upserted idempotently with its owner, code, name, cost and units, and the owner is stored on the record (FR-3, FR-DATA-1, NFR-5)

**Given** a SKU in the WMS
**When** any user tries to change an OMS-owned field (code, name, cost)
**Then** the field is read-only and the server refuses the change (FR-3)

**Given** the OMS retires a SKU
**When** the sync runs
**Then** the SKU becomes "use up before retire" and is not deleted (FR-3)

**Given** a cost change from the OMS
**When** it syncs
**Then** cost history is kept with effective dates, and cost is visible only to users with *view product cost* (absent otherwise) (FR-3, FR-19, UX-DR19)

**Given** a sync failure
**When** retries are exhausted
**Then** the failure is visible in the connection status (FR-119, NFR-5)

### Story 3.5: Kit BOM and ASN Sync from OMS

As a warehouse user,
I want kit BOMs and ASNs synced from the OMS read-only,
So that kits can be exploded and inbound deliveries are expected before they arrive.

**Acceptance Criteria:**

**Given** the OMS sends a kit BOM
**When** it syncs
**Then** the kit and its components with quantity per kit are stored as a versioned BOM, read-only in the WMS (FR-3)

**Given** a BOM change in the OMS
**When** it syncs
**Then** a new BOM version is stored and earlier versions are retained for orders already taken in (FR-3)

**Given** the OMS sends an ASN
**When** it syncs
**Then** an ASN `AS-YYMMDD-NNN` with owner, expected date/slot and item-list lines is stored, with lines read-only (FR-3, FR-DATA-1)
**And** a duplicate submission with the same source reference creates no second ASN (NFR-5)

### Story 3.6: Warehouse-measured SKU Attributes

As a warehouse staffer,
I want to record measured dimensions, weight, photos and tags on a SKU,
So that box suggestion, capacity checks and weight checks use real numbers.

**Acceptance Criteria:**

**Given** a SKU detail page
**When** a staffer records measured dimensions and weight, warehouse photos and internal tags
**Then** they are saved with the measurement date and the change is logged (FR-24, FR-107)

**Given** owner-entered and warehouse-measured values
**When** the SKU is shown
**Then** owner-entered, warehouse-measured and used values appear, and the measured value is used from its measurement date (FR-24)

**Given** the SKU list
**When** it renders
**Then** it shows a data-issue count per SKU and a filter for missing dimensions, missing barcode, or a unit the warehouse does not accept (FR-24)

### Story 3.7: Units of Measure and Barcodes

As a warehouse staffer,
I want units and barcodes resolved per SKU,
So that scanning any accepted barcode counts the right quantity.

**Acceptance Criteria:**

**Given** a SKU with units (e.g. piece, inner, carton)
**When** a unit's barcode is resolved
**Then** it returns the SKU and that unit's quantity in the base unit (FR-25)

**Given** a unit already used in any transaction
**When** a user tries to change its quantity
**Then** it is refused, and a new unit must be added and the old one closed (FR-25)

**Given** a barcode
**When** it is added to a SKU
**Then** it must be unique within the owner, and a second barcode on the same SKU is allowed only when the multi-barcode rule is on (FR-25)

**Given** a unit
**When** it is marked *sell by carton only*
**Then** the flag is stored for picking and packing (FR-25)

**Given** a SKU with no barcode
**When** a label is requested
**Then** a printable system QR derived from the SKU code (e.g. `SH:SH-BALM-15`) is produced (FR-25)

### Story 3.8: Lot, Expiry and Serial Tracking Settings

As an authorized user,
I want to set lot, expiry and serial control per SKU and trace any serial,
So that FEFO, shelf-life checks and warranty tracing work.

**Acceptance Criteria:**

**Given** a SKU's tracking settings
**When** an authorized user edits them
**Then** they set lot control, expiry basis (manufacture date + shelf life), minimum remaining shelf life, and serial control ไม่คุม / สแกนตอนแพ็ค / สแกนตั้งแต่รับเข้า (FR-26)
**And** a blank minimum shelf life falls back through settings precedence with strictest-wins (FR-13)

**Given** a SKU flagged warranty-by-serial in the OMS
**When** a user tries to set serial control to ไม่คุม
**Then** it is refused (FR-26)

**Given** serial control สแกนตั้งแต่รับเข้า
**When** it is saved
**Then** the SKU is flagged so receiving, move and count flows require serial scans (FR-26)

**Given** a serial number
**When** a user searches it
**Then** they see its current location or order, status (ในคลัง / ส่งมอบแล้ว) and movement history (FR-26)
**And** before stock exists the trace shows an empty history rather than an error

### Story 3.9: Packaging and Material Items

As an authorized user,
I want to register boxes and packing materials as stock items,
So that packaging is suggested, received, counted and deducted like products.

**Acceptance Criteria:**

**Given** สินค้า › วัสดุแพ็ค
**When** a user registers an item
**Then** they set type (บรรจุภัณฑ์ / วัสดุแพ็ค / วัสดุใช้ในคลัง), owner (warehouse or goods owner), usable dimensions, weight, max load, deduction unit (ใบ/แผ่น/เมตร/ม้วน), storage bundle size and paired materials (FR-28, FR-DATA-1)

**Given** each warehouse
**When** a reorder point is set for the item
**Then** it is stored per warehouse (FR-28)

**Given** an owner box missing usable size, storage size or paired materials
**When** box candidates are listed
**Then** it is marked not suggestible until completed (FR-28)

**Given** packaging items
**When** later inbound, count and ledger flows run
**Then** they are treated as stock items with barcodes unique among warehouse items (FR-28)

### Story 3.10: Bulk Import of Warehouse-local SKU Attributes

As an admin cutting over from JST,
I want to bulk-import measured dimensions, weights and tracking flags,
So that SKUs are ready for receiving without editing each one.

**Acceptance Criteria:**

**Given** a template for warehouse-local attributes
**When** an admin uploads it
**Then** a dry-run preview shows changes and row-level errors (unknown SKU, invalid values) (FR-113)

**Given** the import includes an OMS-owned field
**When** it is previewed
**Then** that column is rejected as read-only (FR-3, FR-113)

**Given** a valid file
**When** the admin commits
**Then** measured dimensions/weight and non-OMS tracking flags are updated and each change is logged (FR-113, FR-107)

## Epic 4: Stock Ledger, Opening Balance & Visibility

Admins load approved opening balances; everyone sees trustworthy stock by SKU, location and lot backed by an immutable ledger; ATP is pushed to the OMS and reconciled daily.

### Story 4.1: Immutable Stock Ledger

As a Warehouse Manager,
I want every stock quantity or location change recorded as an immutable ledger line,
So that stock in the WMS can always be explained line by line and trusted to equal the shelf.

**Acceptance Criteria:**

**Given** any operation that changes a stock quantity or location
**When** the operation is committed
**Then** the system writes a ledger line `SL-NNNNNNNNN` with timestamp, type/sub-type, document reference, warehouse, from → to location, owner, SKU, lot, ± quantity, running balance, m³ delta, actor and device (FR-42, FR-DATA-1)
**And** the ledger line is the only path by which stock quantities change; no service or API writes stock outside the ledger (NFR-6)

**Given** an internal move between two locations
**When** the destination location has been scanned
**Then** exactly two lines are written (−source / +destination) and the total balance for owner × SKU × lot is unchanged (FR-42)
**And** no line is written before the destination scan

**Given** an existing ledger line
**When** any user, role (including System Administrator) or API attempts to edit or delete it
**Then** the request is rejected and the attempt is recorded in the activity log (FR-42, FR-107)

**Given** the full application (web, PDA, API)
**When** a user searches for a manual stock-adjust function
**Then** none exists anywhere; quantities change only through operational scans, approved count adjustments, moves, approved reversals or approved opening balances (NFR-14)

**Given** a user with view permission on inventory
**When** they open สินค้าคงคลัง › ความเคลื่อนไหว
**Then** they see ledger lines filterable by SKU, lot, location, document, type group (รับเข้า, จ่ายออก, ใช้ไป, ปรับยอด, กลับรายการ, ย้าย, เปลี่ยนรหัสสินค้า, ยอดยกมา) and date, with server-side pagination and Excel export that respects filters (UX-DR11)

### Story 4.2: Stock Buckets, Reservation and ATP

As a Warehouse Manager,
I want on-hand, reserved and ATP computed per SKU, lot and location from the ledger,
So that only genuinely sellable stock is promised to the OMS.

**Acceptance Criteria:**

**Given** stock in normal, returns and damaged/quarantine sections
**When** on-hand is computed
**Then** on-hand = normal + returns + damaged/quarantine and excludes stock received but not yet put away (FR-41)

**Given** normal stock, reservations, held lots and lots below the effective minimum remaining shelf life
**When** ATP is computed
**Then** ATP = normal − reserved − held lots − lots below the effective minimum remaining shelf life, and available-to-sell = ATP (FR-41)
**And** the effective minimum remaining shelf life resolves through settings precedence with strictest-wins (FR-13)

**Given** a reservation request
**When** the system reserves stock
**Then** it draws only from the normal section; returns and damaged/quarantine are never reserved (FR-41)

**Given** an order not yet handed over
**When** its goods sit at a pick location, cart, staging, packing or handover location
**Then** the quantity remains counted as reserved and on-hand until handover confirm (FR-41)

**Given** a ledger line is posted
**When** buckets are read immediately afterward
**Then** the buckets reflect the new line (read-after-write consistent) `[ARCH-PENDING: projection/caching strategy]`

### Story 4.3: Stock Views by SKU, Location and Lot

As an office user,
I want to view stock by SKU, by location and by lot/expiry with filters and export,
So that I can answer stock questions without leaving the WMS.

**Acceptance Criteria:**

**Given** a user with inventory view permission
**When** they open ยอดคงคลัง by SKU
**Then** each SKU shows on-hand, reserved, ATP and per-section totals, with drill-down to lots and locations and in-process rows (pick containers, staging, handover) (FR-40)

**Given** the by-location view
**When** the user opens it
**Then** each location shows type, number of SKUs/lots, m³ and kg used vs capacity, last scan time and user, and lock state (e.g. ล็อกนับ · CC-…) (FR-40)

**Given** at least one lot-controlled SKU exists
**When** the user opens the lot/expiry view
**Then** each lot shows expiry, remaining days, locations and a trace to its receipts; if no lot-controlled SKU exists the view is not rendered (FR-40)

**Given** the stock lists
**When** the user applies filters สินค้าปกติ, มีรอจัดเก็บ, สินค้าคืน, สินค้าชำรุด, ต่ำกว่าจุดสั่งซื้อ, ล็อตใกล้หมดอายุ, หมด
**Then** results update with counts announced via aria-live, filters persist in the URL, and Excel export respects the active filters and masking (FR-40, UX-DR11, UX-DR12)

**Given** the warehouse has exactly one owner
**When** stock views render
**Then** the owner column and owner filter are hidden, while owner is still stored on every record (FR-DATA-1, UX-DR7)

### Story 4.4: Opening Balance Import with Approval

As an Admin,
I want to import opening balances from Excel per owner × SKU × lot × location and have them approved,
So that the warehouse starts on Zimple with stock that matches the shelf.

**Acceptance Criteria:**

**Given** an Excel file in the opening-balance template
**When** the Admin uploads it in ตั้งค่าบริษัท › เครื่องมือผู้ดูแลระบบ › นำเข้าข้อมูล
**Then** the system validates every row and shows a dry-run preview with totals per owner × SKU (FR-111)

**Given** rows with an unknown SKU, unknown location or invalid lot/expiry format
**When** validation runs
**Then** those rows are rejected with a row-level error report downloadable as Excel, and no ledger line is posted for the file (FR-111)

**Given** a valid file
**When** the Admin submits it
**Then** an opening-balance document `OB-YYMMDD-NNN` is created with status รออนุมัติ and an approval request of type *opening balance* is raised; it always requires approval (FR-111, FR-105)

**Given** the opening-balance approval is approved
**When** the approval completes
**Then** ledger lines of type *opening balance* (ยอดยกมา) are posted per row into the normal section, and the document shows the approver (FR-111, FR-42)

**Given** the approval is rejected
**When** the rejection completes
**Then** no stock is posted and the document is closed with the rejection reason

### Story 4.5: Available-to-Sell Push to OMS with Failed-Sends Queue

As a goods owner,
I want available-to-sell pushed to the OMS reliably after every stock change,
So that marketplaces never oversell.

**Acceptance Criteria:**

**Given** a ledger line changes ATP for an owner × SKU
**When** the change commits
**Then** the new available-to-sell (= ATP, kit availability per FR-120 once available) is queued for push to the OMS and reaches it within 5 minutes `[ASSUMPTION]` (FR-4, NFR-5)

**Given** a push call
**When** it is sent
**Then** it is idempotent (repeat sends do not double-apply) and retried with backoff on failure (NFR-5) `[ARCH-PENDING: queue technology, OMS contract]`

**Given** retries are exhausted
**When** the send still fails
**Then** it appears in ตั้งค่าคลัง › การเชื่อมต่อ › failed-sends queue with payload summary, error and attempt count, and the hub shows "ส่งข้อมูลไม่สำเร็จ n รายการ" (FR-4, UX-DR20)

**Given** an Admin on the connection page
**When** they force-push WMS stock to the OMS for all or selected SKUs
**Then** the push runs without approval and is logged in the activity log with actor and scope (FR-4, FR-107)

### Story 4.6: Ledger Reversal Request

As an authorized user,
I want to request reversal of a wrong receive, handover or return-receipt ledger line,
So that mistakes are corrected transparently instead of edited away.

**Acceptance Criteria:**

**Given** a ledger line of type receive, handover or return-receipt
**When** an authorized user selects "ขอกลับรายการ"
**Then** a form requires a reason (รับเข้าซ้ำ / ตัดสต๊อกซ้ำ / รับคืนซ้ำ / บันทึกผิดล็อต / อื่น ๆ with note) and a quantity ≤ the original (FR-43)

**Given** a ledger line of any other type (e.g. a move)
**When** the user tries to reverse it
**Then** the action is not offered and the UI states that wrong moves are corrected by a new move (FR-43)

**Given** a reversal request is submitted
**When** it is created
**Then** an approval of type *reversal* is raised, which is always required and system-locked (FR-43, FR-105)

**Given** the reversal is approved
**When** it posts
**Then** an opposite ledger line referencing the original is written, and the requester and approver are recorded; a requester cannot approve their own reversal (FR-43, FR-105)

### Story 4.7: Daily 06:00 Reconciliation

As a Warehouse Manager,
I want a daily reconciliation of ledger integrity and WMS vs OMS stock,
So that any drift is caught the same morning.

**Acceptance Criteria:**

**Given** the scheduled time 06:00 warehouse local time (Asia/Bangkok)
**When** the reconciliation job runs
**Then** it compares, per owner × SKU (× lot × location), the stored balance with the sum of ledger lines, and WMS available-to-sell with OMS stock (FR-7)

**Given** any difference is found
**When** the run completes
**Then** the report under รายงาน lists each SKU × owner with a difference and its values, and a WMS ≠ OMS notification is sent that cannot be turned off (FR-7, FR-106)

**Given** no difference is found
**When** the run completes
**Then** the report shows a success "WMS = OMS" result with the data-as-of time

**Given** the OMS is unreachable at 06:00
**When** the job cannot fetch OMS stock
**Then** the run is marked failed with the reason, retried with backoff, and an alert is raised; it never reports a false match (NFR-5)

### Story 4.8: Layout Map with Occupancy

As a Warehouse Manager,
I want to see the published layout coloured by space used,
So that I can plan space and putaway at a glance.

**Acceptance Criteria:**

**Given** สินค้าคงคลัง › ผังคลัง and a published layout (Story 2.13)
**When** the map renders
**Then** each bound slot is coloured on one sequential scale by m³ or kg used against capacity, with a legend and values on hover/focus; racks and zones show their totals (FR-126)

**Given** a slot
**When** the user selects it
**Then** a panel shows the location's stock by SKU and lot with a link to the stock-by-location view (FR-126, FR-40)

**Given** filters for zone, location type and status
**When** applied
**Then** non-matching slots dim, and status (disabled, locked for counting) uses the status map with icon + label (FR-126, UX-DR10)

## Epic 5: Inbound — Receive to Sellable

Receivers record arrivals, count against ASNs at a camera station or PDA, route exceptions to quarantine and OMS decision cases, and put stock away so it becomes sellable.

### Story 5.1: Expected-Arrival Queue

As a Receiver,
I want to see ASNs from the OMS in a queue ordered by urgency,
So that I know which deliveries to expect and which are overdue.

**Acceptance Criteria:**

**Given** ASNs synced from the OMS (`AS-YYMMDD-NNN`)
**When** a Receiver or Supervisor opens รับสินค้าเข้า › รายการรอเข้าคลัง
**Then** ASNs are listed overdue first, then by scheduled date and time slot, with owner, item-list count and status (FR-29)

**Given** an ASN detail
**When** the user views owner item-list lines
**Then** the lines are read-only, and further item lists synced from the OMS can still attach until receiving starts (FR-29, FR-3)

**Given** the รับสินค้าเข้า module
**When** it opens
**Then** the ภาพรวมรับเข้า hub shows KPI cards and queue cards for arrivals today, awaiting receiving and awaiting putaway, each linking to its filtered queue (UX-DR14)

**Given** an empty queue
**When** no ASN is expected
**Then** an empty state explains there is nothing expected and new ASNs appear automatically (UX-DR20)

### Story 5.2: Station Shell and Floor Feedback Components

As a floor worker at a station,
I want a full-screen station layout with unmistakable scan feedback,
So that I can scan, get a clear yes or no, and move on.

**Acceptance Criteria:**

**Given** a station bound to a PC with scanner, printer, scale and camera (FR-11)
**When** a station screen is launched from its tab
**Then** it opens full-screen in the 3-zone layout (job context 30% / scan column 45% / evidence 25%), with the evidence column stacking below 1366px (UX-DR22, UX-DR46)
**And** if any bound device is unbound, untested or faulted, the station shows the device-not-ready setup state listing each device's status and cannot open jobs (UX-DR22, FR-11)

**Given** the station scan column
**When** a job is open
**Then** the 64px scan input always holds focus, the next-scan banner shows the single next expected scan, and the step strip advances only on a valid scan (UX-DR23, UX-DR24)
**And** a typed entry is accepted but logged as manual where the rule requires a scan (UX-DR23)

**Given** a valid scan
**When** it is accepted
**Then** the row/field flashes success-soft for 300ms with a short high beep and the counter updates, without a full-screen overlay, within 500 ms p95 (UX-DR26, UX-DR27, NFR-2)

**Given** an invalid scan
**When** it is rejected
**Then** a full-screen scan-reject screen shows an x-octagon, the reason headline and the action line, plays the long double low tone, takes focus with role="alert", stays at least 1.5s until the next valid scan or the 64px acknowledgement, then returns focus to the scan field (UX-DR26, UX-DR27, NFR-9)

**Given** a condition needing a supervisor
**When** the station blocks
**Then** a full-screen amber scan-blocked screen with pause-octagon and a chime repeating every 10s offers "เรียกหัวหน้า" and "พักงานไว้" (UX-DR26)
**And** a supervisor can approve on the spot by scanning their own badge and entering a reason, which is recorded with actor, device and reason (UX-DR30, FR-107)

**Given** station keyboard and command barcodes
**When** the worker presses F2/F4/F8/F11 or scans a printed command barcode ("ของขาด", "พักงาน", "พิมพ์ซ้ำ")
**Then** the matching action fires; Esc never closes a job (UX-DR29)

**Given** a device chip in the evidence column
**When** the printer, scale or camera faults
**Then** its chip turns destructive and the job continues or blocks according to the rule for that device (UX-DR22)

### Story 5.3: Temporary Receipt for a Vehicle Arrival

As a Receiver,
I want to open a temporary receipt for each vehicle with outer counts, photos and the sender's signature,
So that arrival discrepancies are evidenced before any goods are counted.

**Acceptance Criteria:**

**Given** a vehicle arrives
**When** the Receiver opens ใบรับเข้าชั่วคราว › new in a Sheet
**Then** a temporary receipt `TM-YYMMDD-NNN` is created for that vehicle round with owner, linked ASNs/item lists (zero or more), declared vs counted outer packages, photos, scale weight if a scale exists and vehicle data (plate, driver, time) (FR-31, FR-DATA-1)
**And** the TM does not create stock

**Given** counted outer packages are fewer than declared
**When** the TM is saved
**Then** an inline warning "ขาด N กล่อง" shows, the shortfall is recorded and the owner is notified through the OMS (FR-31)

**Given** an arrival with no ASN or before its ASN date
**When** the TM is saved
**Then** a reason is required and the TM is tagged *unannounced* (ไม่ได้แจ้งล่วงหน้า) (FR-31)

**Given** the sender must sign
**When** the Receiver taps "ให้ผู้ส่งเซ็น"
**Then** the signature pad (≥320×160, signer name required, "ล้าง" clear, submit disabled until a stroke) captures the signature on the station or a paired tablet, and the 2-part slip prints (UX-DR33) `[ARCH-PENDING: tablet pairing]`

**Given** a previous TM round on the same ASN is not yet confirmed
**When** a new TM is opened for that ASN
**Then** it is blocked with the message naming the open round (FR-31)

**Given** a TM open for more than 2 hours
**When** the threshold passes
**Then** an alert is raised to the configured recipients (FR-31, FR-106)

**Given** the TM is created
**When** it is saved
**Then** receiving billable signals are captured: receipt round, outer cartons, after-hours flag and unannounced flag (FR-DATA-2)

### Story 5.4: Receiving Station — Count by Carton Pattern

As a Receiver,
I want to open receiving by scanning the ASN and count each SKU by carton pattern,
So that received quantities are accurate without counting piece by piece.

**Acceptance Criteria:**

**Given** the receiving station is ready
**When** the Receiver scans an ASN or item-list barcode
**Then** the receiving job opens with expected lines, and the next-scan banner reads the next step (UX-DR24, FR-33)

**Given** an open job
**When** the Receiver scans one unit
**Then** the SKU is selected but no quantity is added (FR-33)
**And** a unit barcode resolves through the SKU's units of measure (FR-25)

**Given** a selected SKU
**When** the Receiver enters cartons × pieces + loose + damaged
**Then** the line total updates and the line pill shows ครบ, ขาด N, ชำรุด, กำลังนับ, ยังไม่นับ or ต้องวัดขนาด (FR-33, UX-DR25)

**Given** the count-method rule is "N random cartons per SKU-lot"
**When** a sampled carton mismatches its pattern
**Then** the system requires a full count of that SKU-lot (FR-33)

**Given** carton dimensions ÷ pieces mismatch the unit dimensions
**When** the carton is measured
**Then** the line is flagged ต้องวัดขนาด for re-measuring (FR-33)

**Given** the first carton of a SKU never received before
**When** it is counted
**Then** measurement is required before putaway; scale values auto-fill and typed values are logged as manual (พิมพ์เอง) (FR-33, FR-24)

**Given** a line where scanned quantity exceeds what is entered or vice versa
**When** the Receiver confirms
**Then** the scanned-vs-expected rows sort incomplete-first and show live status (UX-DR25)

### Story 5.5: Lot, Expiry and Serial Capture with Shelf-Life Check

As a Receiver,
I want to capture lot, expiry and serials during receiving and be stopped when shelf life is too short,
So that FEFO and serial traceability work from the moment goods arrive.

**Acceptance Criteria:**

**Given** a lot-controlled SKU
**When** the Receiver enters lot and manufacture date
**Then** expiry is computed as manufacture date + shelf life and remaining shelf life is shown; lot and expiry are required before putaway (FR-33, FR-26)

**Given** remaining shelf life below the effective minimum (strictest level wins)
**When** the line is confirmed
**Then** a full-screen scan-blocked "อายุคงเหลือต่ำกว่าเกณฑ์ · ต้องให้หัวหน้ายืนยัน" appears and the line is accepted only after supervisor confirmation (badge scan + reason) or a *short-shelf-life receipt* approval (FR-36, FR-105, UX-DR30)

**Given** a SKU with serial control *scan from receiving*
**When** the Receiver receives it
**Then** every serial must be scanned, and a duplicate serial is rejected with a full-screen reject (FR-33, FR-26)

**Given** a SKU with serial control "none" or "scan at pack"
**When** it is received
**Then** serial capture is skipped (FR-26)

**Given** the expiry date picker
**When** the Receiver enters a date
**Then** it displays and accepts the user's calendar era (ค.ศ./พ.ศ.) (UX-DR44)

### Story 5.6: Receiving Exceptions without Stopping the Job

As a Receiver,
I want exceptions routed automatically while I keep receiving,
So that one bad carton never stops the truck.

**Acceptance Criteria:**

**Given** a scanned item belonging to another owner
**When** it is scanned
**Then** a full-screen reject "สินค้านี้เป็นของเจ้าของสินค้าอื่น · แยกวางไว้ แล้วสแกนชิ้นถัดไป" shows and nothing is received (FR-36, UX-DR26)

**Given** an off-list SKU of the same owner
**When** it is scanned
**Then** it can be received into quarantine as *held for decision* or removed as a mis-scan (FR-36)

**Given** a received quantity above expected beyond the tolerance (default 0%)
**When** the line is confirmed
**Then** the excess is received into quarantine with status "เกิน · รอเจ้าของสินค้ายืนยัน" and is not sellable (FR-36)

**Given** an unknown barcode
**When** it is scanned with the multi-barcode rule off
**Then** it is rejected with a full-screen reject and an alert; with the rule on, it can be bound as an extra barcode after an *extra barcode* approval (FR-36, FR-25, FR-105)

**Given** damaged units
**When** the Receiver records them
**Then** they post to the damaged section with cause, origin "receiving" and photos, never to sellable stock (FR-36, FR-53)

**Given** any short, over, damaged or wrong-SKU line
**When** the Receiver tries to confirm the line
**Then** at least one photo is required (FR-35)

### Story 5.7: Decision Cases to OMS After-sales

As a Supervisor,
I want quarantined goods sent to OMS after-sales as decision cases with evidence, and the returned decision turned into a task,
So that owner-side decisions are made by the owner and executed by the warehouse.

**Acceptance Criteria:**

**Given** an over-receipt or off-list item placed in quarantine
**When** it is recorded
**Then** a decision case with photos, video link, quantities, owner and source is sent to OMS after-sales (FR-121, FR-36) `[ARCH-PENDING: OMS after-sales contract, Q-3]`

**Given** the OMS returns a decision (dispose, return to owner, restock, add to stock)
**When** the decision is received
**Then** the matching warehouse task is created and linked to the case; "add to stock" applies only to the excess quantity (FR-121)

**Given** a case waiting longer than its configured time
**When** the threshold passes
**Then** an alert is raised and the goods stay held; nothing is disposed automatically (FR-121, NFR-14)

**Given** the decision-case mechanism
**When** later sources (damaged/held stock, unmatched returns, problem reports) raise cases
**Then** they reuse the same case model, send path and decision-to-task mapping (FR-121)

**Given** a send failure
**When** retries are exhausted
**Then** the case appears in the failed-sends queue (FR-4, NFR-5)

### Story 5.8: Carton Labels and Loading onto Containers

As a Receiver,
I want to print carton QR labels and load cartons onto containers,
So that putaway can start the moment a pallet is closed.

**Acceptance Criteria:**

**Given** counted cartons on a line
**When** the Receiver prints carton labels
**Then** carton QR labels (`CT`) print silently to the station's bound printer, at most one per carton, and the print status chip shows พิมพ์แล้ว (FR-34, UX-DR32) `[ARCH-PENDING: local print agent]`

**Given** a printed carton label
**When** the Receiver reprints it
**Then** a reason is required, the carton number is kept, the output is marked "สำเนา", and the chip shows สำเนา #n (FR-34, UX-DR32)

**Given** an empty container enabled for the receiving stage
**When** the Receiver scans the container then cartons
**Then** the cartons are loaded onto it; a container type not enabled for receiving is rejected (FR-34, FR-10)

**Given** a loaded container
**When** the Receiver scans the close command
**Then** the container closes and a putaway task is created immediately (FR-34)

**Given** the printer is offline
**When** a print is attempted
**Then** the device chip turns destructive and the job holds at the print step with "เครื่องพิมพ์ … ออฟไลน์ · ตรวจสาย/กระดาษ แล้วกดพิมพ์ใหม่" (UX-DR32)

### Story 5.9: Receiving Video Evidence

As a CS or Supervisor,
I want every receipt at a camera station recorded on video and linked to the receipt,
So that disputes about what arrived are settled with evidence.

**Acceptance Criteria:**

**Given** a receiving station with a bound camera
**When** a receiving job opens
**Then** recording starts automatically and the indicator shows a destructive dot, "กำลังบันทึก" and elapsed time (FR-35, UX-DR31) `[ARCH-PENDING: IP camera integration and NAS storage]`

**Given** no camera is available
**When** the job opens
**Then** a single "ไม่มีวิดีโอ" warning pill shows and work continues (UX-DR31)

**Given** receiving on a PDA
**When** evidence is needed
**Then** photos are attached instead of video (FR-35)

**Given** a recorded clip
**When** the job ends
**Then** the clip is linked to the receipt and its exception lines, retained 60 days by default, and every view is logged (FR-35, NFR-13, FR-107)

### Story 5.10: PDA Task Queue and Putaway Suggestion

As Putaway staff,
I want a PDA queue of putaway tasks with a suggested location for each,
So that I always know what to put away next and where.

**Acceptance Criteria:**

**Given** closed containers or cartons awaiting putaway
**When** the system creates putaway tasks
**Then** each has a suggested location based on room type, the SKU's existing locations and free capacity (m³ %, kg) (FR-37)

**Given** the PDA putaway tile
**When** Putaway staff open it
**Then** task cards (≥72px, code line, description, progress caption, ⚡ ด่วน marker) show in tabs ของฉัน / รอรับ, ordered urgent (orders waiting) → temperature-controlled → oldest (FR-37, UX-DR36)

**Given** an unclaimed card
**When** a worker taps it or scans its container QR
**Then** it is claimed by that worker and others see the claimer and cannot claim it (UX-DR36)

**Given** an urgent putaway (orders waiting for the SKU)
**When** it is created
**Then** the tile reorders it to the top with a chime and a destructive ด่วน chip showing "คำสั่งซื้อรอ N ชิ้น" (UX-DR35, FR-37)

**Given** dedicated PDA putaway designs are still owed (Q-11)
**When** this story is implemented
**Then** it uses the generic PDA task pattern (location callout → scan → feedback) and is flagged for redesign once UX delivers (UX-DR41)

### Story 5.11: Putaway Confirm — Stock Becomes Sellable

As Putaway staff,
I want to confirm putaway by scanning the location,
So that stock becomes sellable immediately and waiting orders are served.

**Acceptance Criteria:**

**Given** a claimed putaway task
**When** the PDA shows it
**Then** the location callout shows the suggested location in 36px mono on accent and advances after the location scan (UX-DR37)

**Given** the worker scans the suggested location
**When** the scan is valid
**Then** ledger lines move the stock from awaiting putaway to the normal section, it becomes sellable immediately, and an accept beep confirms (FR-38, FR-42)
**And** waiting orders are reserved in their original sequence and orders held as out of stock (สินค้าหมด) are released (FR-38)

**Given** the worker scans a location other than the suggested one
**When** the location is otherwise valid
**Then** a reason is required before confirm (FR-38)

**Given** a location of the wrong room type, overweight for capacity, disabled or locked for counting
**When** it is scanned
**Then** a full-screen reject blocks the putaway with the reason (FR-38, UX-DR26)

**Given** a lot-controlled SKU without lot and expiry
**When** putaway is attempted
**Then** it is blocked until lot and expiry are recorded (FR-33)

**Given** stock awaiting putaway for more than 2 hours
**When** the threshold passes
**Then** an alert is raised (FR-38)

**Given** the PDA loses signal during putaway
**When** the worker is mid-task
**Then** the offline queue strip "รอส่ง n รายการ" appears, the back button parks the task without discarding scans, and queued scans sync without duplicates on reconnect; a queued scan later rejected by the server raises a PDA notification and a supervisor queue item (UX-DR34, UX-DR38, NFR-3) `[ARCH-PENDING: PDA native vs PWA]`

### Story 5.12: Receipt Close and Inbound Result to OMS

As a Supervisor,
I want to close a receipt after reviewing actual vs ASN and send the result to the OMS,
So that the owner knows exactly what was received short, over or damaged.

**Acceptance Criteria:**

**Given** an ASN received over one or more rounds
**When** the Supervisor reviews it
**Then** actual vs ASN per line and a short/over/damaged summary are shown; status flows กำลังรับ → รอจัดเก็บ → กำลังจัดเก็บ → จัดเก็บแล้ว (FR-39)

**Given** open containers (pallets) on the receipt
**When** close is attempted
**Then** it is blocked until all containers are closed (FR-34)

**Given** the Supervisor closes the ASN before all lines are received
**When** they confirm early close
**Then** an *early ASN close* approval is required (FR-39, FR-105)

**Given** a receipt with no response for 3 days
**When** the period passes
**Then** it auto-closes (FR-39)

**Given** a receipt closes
**When** the close commits
**Then** received quantities, variances and status are sent to the OMS idempotently with retry and failed-sends queue (FR-39, FR-4, NFR-5)
**And** billable signals (cartons, CBM, rounds) are stored on the receipt (FR-DATA-2)

### Story 5.13: Closed Receipt Search and Export

As an office user,
I want to search closed receipts and export them in summary or detail form,
So that inbound history is never trapped in the system.

**Acceptance Criteria:**

**Given** closed receipts
**When** a user opens ใบรับเข้าสินค้า
**Then** receipts are searchable by receipt, ASN, owner, SKU, lot and date, with status badges (icon + Thai label + tone) and a neutral "ปิดแล้ว" badge on closed records (FR-39, UX-DR10, UX-DR20)

**Given** a search result
**When** the user exports Excel
**Then** they choose summary (1 row = 1 receipt) or detail (1 row = SKU × lot with carton pattern, weight, CBM, variance and evidence links), and the export is logged (FR-39, FR-107)

### Story 5.14: Web and Paper Fallback for Receiving and Putaway

As an office user in a warehouse without PDAs,
I want to run receiving and putaway on the web,
So that the warehouse can operate with only PCs and USB scanners.

**Acceptance Criteria:**

**Given** a warehouse with no PDAs
**When** a user opens the desktop receive page
**Then** the whole receiving flow (scan ASN, select SKU, carton pattern, lot/expiry, serials, exceptions, labels, containers) runs with a USB/HID scanner and photos (FR-35, FR-122)

**Given** the rule *confirm by paper task* is on
**When** putaway tasks are created
**Then** putaway sheets print with task and location QR codes, and staff confirm results on web จัดเก็บเข้าตำแหน่ง (FR-122)

**Given** web confirmation of putaway
**When** a user confirms
**Then** every PDA control applies: location confirm, wrong room type/overweight/disabled/count-locked block, reason for non-suggested location (FR-122, FR-38)

**Given** a web-confirmed operation
**When** ledger lines are written
**Then** device = web and actor = the confirming user (FR-122, FR-42)

### Story 5.15: Warehouse-Created ASN

As an office user,
I want to create an ASN on the owner's behalf or for warehouse-owned goods when the OMS sent none,
So that unannounced but legitimate deliveries can still be received properly.

**Acceptance Criteria:**

**Given** no ASN exists for an expected delivery
**When** the user creates an ASN in a Sheet with owner, scheduled date/slot and lines
**Then** an ASN is created and marked *warehouse-created* in the activity log (FR-30, FR-107, FR-DATA-1)

**Given** a time slot that is already full
**When** the user selects it
**Then** it stays selectable but an alert is raised (FR-30)

**Given** a warehouse-created ASN
**When** receiving completes
**Then** the result is still sent to the OMS like any ASN (FR-4)

### Story 5.16: Unmatched Parcels at Parcel Staging

As a Receiver,
I want to log a parcel whose tracking number matches no ASN and hold it until matched,
So that stray parcels are never lost or wrongly stocked.

**Acceptance Criteria:**

**Given** a parcel with a tracking number matching no ASN
**When** the Receiver logs it
**Then** tracking number, carrier, sender from the label and received time are captured and it is held at parcel staging (FR-32)

**Given** a held parcel
**When** stock is queried
**Then** it is not counted as stock until it is matched and received (FR-32)

**Given** a later ASN that matches
**When** the user selects "จับคู่ใบแจ้งเข้า"
**Then** the parcel links to the ASN and can be received normally (FR-32)

## Epic 6: Inventory Control & Counting

Stock staff move and replenish stock, run blind counts with approved variances, handle damaged and held goods, and managers track accuracy.

### Story 6.1: Three-Scan Stock Move

As Stock staff,
I want to move stock with a source → product and quantity → destination scan sequence,
So that every relocation is verified and ledgered.

**Acceptance Criteria:**

**Given** a move task `MV-YYMMDD-NNNN` (status รอเริ่ม → กำลังย้าย → เสร็จ)
**When** the worker scans the source location or container, the product (case barcode or quantity; no quantity = all) and the destination
**Then** two ledger lines are written only after the destination scan, and the total is unchanged (FR-44, FR-42)

**Given** the worker scans a pallet QR as source
**When** the destination is scanned
**Then** the whole pallet moves (FR-44)

**Given** a destination that violates space, weight, room type, lot mixing or *no mixed SKUs*
**When** it is scanned
**Then** a full-screen reject shows the reason and nothing moves (FR-44, UX-DR26)

**Given** a serial-controlled SKU with *scan from receiving*
**When** it is moved
**Then** every serial must be scanned (FR-26)

**Given** the PDA is offline mid-move
**When** scans are made
**Then** they queue offline and sync on reconnect without duplicates (NFR-3, UX-DR38)

### Story 6.2: Ad-hoc Move with Reason

As a user with the *ad-hoc move* permission,
I want to move stock without a task when I give a reason,
So that urgent floor fixes are possible yet fully audited.

**Acceptance Criteria:**

**Given** a user with the *ad-hoc move* special permission
**When** they perform a 3-scan move without a task
**Then** an MV with status เสร็จ is auto-created and posted to the ledger immediately (FR-44, FR-19)

**Given** an ad-hoc move
**When** the user confirms
**Then** a reason (ชั้นหยิบเต็ม, จัดพื้นที่ใหม่, ของวางผิดที่) is required; a missing reason leaves the MV in รอเหตุผล (FR-44)

**Given** a user without the permission
**When** they try a task-less move
**Then** the option is hidden (UX-DR7)

### Story 6.3: Scheduled and Urgent Replenishment

As a Picker,
I want pick locations replenished from reserve before they run out, and urgently when they do,
So that short picks are fixed fast without stock adjustments.

**Acceptance Criteria:**

**Given** min/max per SKU on pick locations
**When** the scheduled job runs every N minutes (default 60, warehouse rule)
**Then** replenishment move tasks are created for locations below min, choosing reserve lots FEFO (FR-46)

**Given** waiting orders exceed the shelf quantity or a short pick is reported
**When** the system creates an urgent replenishment
**Then** it goes to the top of the stock PDA queue with a chime and ⚡ ด่วน chip, and prints at the zone printer (FR-46, UX-DR35) `[ARCH-PENDING: zone printer agent]`

**Given** an urgent replenishment completes
**When** the destination is scanned
**Then** the waiting picker is notified (FR-46)
**And** the interface exposes a "replenishment completed for SKU × location" event for picking to consume

**Given** a move task stuck for 30 minutes
**When** the threshold passes
**Then** an alert is raised (FR-46)

### Story 6.4: Count Round Creation

As a Supervisor,
I want to create count rounds by scope with blind counting by default,
So that counts are planned, fair and comparable.

**Acceptance Criteria:**

**Given** a Supervisor
**When** they create a count round `CC-YYMMDD-NNN`
**Then** they choose scope (whole warehouse, zone/row, SKU list with optional lot, velocity class) and options: counters, batch size (default 40 locations), blind (default) or visible, include empty locations, freeze inbound/outbound (FR-47)

**Given** a whole-warehouse round
**When** the start is less than 3 days ahead
**Then** creation is blocked with the reason (FR-47)

**Given** scope locations with pending picks
**When** the preview shows
**Then** they are flagged and scheduled after picking (FR-47)

**Given** a round
**When** it progresses
**Then** its status flows รอเริ่ม → กำลังนับ → รออนุมัติ → ปิดแล้ว (FR-47)

### Story 6.5: Blind Counting on PDA

As a Counter,
I want to count by scanning location, product and serials without seeing system quantities,
So that counts reflect what is really on the shelf.

**Acceptance Criteria:**

**Given** an assigned count batch
**When** the Counter scans a location
**Then** only that location is locked for counting (ล็อกนับ · CC-…) and the PDA shows the location callout without system quantity (FR-48, UX-DR37)

**Given** the counting screen in blind or visible mode
**When** the Counter records a count
**Then** they must enter or scan a quantity; there is never a "confirm system quantity" button (FR-48)

**Given** a case barcode
**When** scanned
**Then** it adds the case pack quantity (FR-48, FR-25)

**Given** a serial-controlled SKU
**When** counted
**Then** serials are scanned (FR-48, FR-26)

**Given** no signal
**When** the Counter keeps counting
**Then** results queue offline, the offline strip shows, and they send on reconnect without duplicates (FR-48, NFR-3, UX-DR38)

### Story 6.6: Count Resolution, Recount and Variance Approval

As a Supervisor,
I want count results resolved by recount, misplacement pairing and tiered approval,
So that only genuine, approved variances adjust stock.

**Acceptance Criteria:**

**Given** a counted line that matches the ledger
**When** results are processed
**Then** the line auto-closes (FR-49)

**Given** a mismatched line
**When** first detected
**Then** one recount is assigned to the same counter; if still mismatched, a variance goes to approval without waiting for the round to finish (FR-49)

**Given** a shortage at one location and a surplus of the same SKU and lot elsewhere
**When** both are found
**Then** they are paired as a misplacement pair and fixed by a move (แก้วางผิดช่อง), not counted as loss (FR-49)

**Given** a variance
**When** submitted for approval
**Then** it carries a reason code (สูญหาย, ของเกิน, บันทึกผิด, อื่น ๆ with note), its value at cost, and follows the approvals engine tiers `[ASSUMPTION: thresholds pending Q-8]` (FR-49, FR-105, FR-DATA-4)

**Given** the counter is also an approver
**When** they open their own variance
**Then** the approve action is hidden; a counter can never approve their own variance (FR-49)

**Given** an approved variance
**When** it posts
**Then** a ledger line of type ปรับยอด names both counter and approver (FR-49, FR-42)

### Story 6.7: Urgent Single-Location Count

As a Supervisor,
I want an urgent blind count of one location created automatically on demand,
So that suspected shortages are confirmed within minutes.

**Acceptance Criteria:**

**Given** a system trigger (short pick with no alternative, or "not empty" after the last piece) or a manual request
**When** an urgent count is created
**Then** it is a single-location blind count placed at the top of the stock PDA queue, auto-assigned, with a deadline (FR-50)
**And** it is exposed as an internal service so picking can trigger it later

**Given** the urgent count finds the stock
**When** the result is recorded
**Then** the location is corrected through a move and the triggering task can resume (FR-50)

**Given** the urgent count does not find the stock
**When** the result is recorded
**Then** the variance goes to approval and linked orders show *insufficient stock* (สินค้าไม่พอ) until it is resolved (FR-50)

### Story 6.8: Move Damaged Units to Damaged/Quarantine

As Stock staff,
I want to move a unit into damaged/quarantine with cause, origin and photos,
So that damaged goods never get picked or sold.

**Acceptance Criteria:**

**Given** a damaged unit
**When** the worker scans the *damaged* QR (ชำรุดเสียหาย), then the item, then a damaged tote (`DMG-T-NN`) or damaged location
**Then** a move posts it to the damaged section with cause, origin (receiving, storage, returns, cancel-return) and at least one photo (FR-53)

**Given** a damaged tote is full or the shift ends
**When** the worker moves the tote to a damaged shelf
**Then** one move covers the whole tote (FR-53)

**Given** damaged locations
**When** allocation or ATP is computed
**Then** they are never picked and are excluded from ATP (FR-53, FR-41)

**Given** a damaged unit
**When** it is recorded
**Then** the party responsible for damage and its value at cost are captured where known (FR-DATA-4)

### Story 6.9: Disposition via OMS Decision Case

As Stock staff,
I want each damaged or held item sent for an owner decision and to execute the decision that comes back,
So that the warehouse never decides or disposes goods on its own.

**Acceptance Criteria:**

**Given** an item in damaged/quarantine
**When** it is recorded
**Then** a decision case with photos, quantities and origin is sent to OMS after-sales via the decision-case mechanism (FR-54, FR-121)

**Given** the damaged & held page (ชำรุด & กักกัน)
**When** a user opens it
**Then** the decision itself is read-only; staff can only execute the returned decision (FR-54)

**Given** a returned decision of dispose
**When** staff execute it
**Then** photo evidence is required and a warehouse *disposal* approval must be granted before the ledger posts (FR-54, FR-105)

**Given** return to owner/supplier, use again or add excess to stock
**When** executed
**Then** the matching task or move is created and posted through the ledger (FR-54)

**Given** an item older than 30 days without a decision
**When** the threshold passes
**Then** an alert fires and repeats every 7 days; nothing is ever disposed automatically (FR-54, NFR-14)

### Story 6.10: Web and Paper Fallback for Moves and Counts

As an office user in a warehouse without PDAs,
I want to print move and count sheets and confirm them on the web,
So that inventory control works without handhelds.

**Acceptance Criteria:**

**Given** the rule *confirm by paper task* is on
**When** move or count tasks are created
**Then** move sheets and count sheets print with QR codes (FR-122, FR-44)

**Given** a paper count sheet
**When** printed
**Then** it is blind (no system quantity) by default (FR-48)

**Given** web confirmation of a move or count
**When** the user confirms
**Then** all PDA controls apply (location checks, blind counting, recount and approval rules) and the ledger records device = web and the confirming user as actor (FR-122)

### Story 6.11: Material Issue for Use

As a user with the *issue for use* permission,
I want to issue warehouse-owned materials or equipment,
So that consumables are deducted when used.

**Acceptance Criteria:**

**Given** a user with *issue for use* (เบิกใช้)
**When** they issue a quantity of a material item
**Then** an MV of type เบิกใช้ is created and the quantity is deducted immediately (FR-45)

**Given** an issue of more than 10 units (configurable threshold)
**When** submitted
**Then** a *material issue over limit* approval is required before posting (FR-45, FR-105)

**Given** a user without the permission
**When** they look for the action
**Then** it is hidden (UX-DR7)

### Story 6.12: Lot Hold and Recall

As a Supervisor,
I want to put a lot on hold or recall and release it only with approval,
So that suspect goods stop shipping immediately.

**Acceptance Criteria:**

**Given** a lot
**When** the Supervisor places it on hold or recall for all or selected locations with a reason
**Then** it is excluded from ATP and allocation immediately (FR-115, FR-41)

**Given** pick lists already allocated to the held lot
**When** the hold is applied
**Then** those lists are flagged for re-allocation (FR-115)

**Given** a held lot
**When** the Supervisor requests release
**Then** a *release held lot* approval is required, and the lot returns to ATP only after approval (FR-115, FR-105)

**Given** the lot/expiry view
**When** a lot is held
**Then** it shows the held status and reason (FR-115, FR-40)

### Story 6.13: Inventory Accuracy KPI

As a Warehouse Manager,
I want inventory accuracy and variance value computed continuously,
So that I can track the 99.5% accuracy target.

**Acceptance Criteria:**

**Given** blind counts over the last 30 days
**When** accuracy is computed
**Then** accuracy = matching locations ÷ blind-counted locations; visible-mode counts are excluded (FR-51)

**Given** approved variances
**When** the KPI is shown
**Then** total variance value at cost is shown alongside (FR-51, FR-DATA-4)

### Story 6.14: Inventory Dashboard

As a Warehouse Manager,
I want an inventory hub showing accuracy, replenishment, variances, expiry, space and backlog,
So that I can see where inventory needs attention at a glance.

**Acceptance Criteria:**

**Given** the สินค้าคงคลัง › ภาพรวม hub
**When** the Warehouse Manager opens it
**Then** it shows KPI cards for accuracy vs target, replenishment needs, variances awaiting approval, near-expiry lots, space usage and overdue backlog with "ค้างเกินเวลา" counts (FR-55, UX-DR14)

**Given** any KPI or queue card
**When** clicked
**Then** it opens the filtered queue so a blocked item is ≤2 clicks from the hub, with a "ข้อมูล ณ HH:MM" data-as-of label (UX-DR14)

### Story 6.15: Kit Buildable Quantity and Assembly Orders

As a warehouse staffer,
I want to see each kit's buildable quantity and run assemble or unbundle orders from the OMS,
So that kits can be prepared ahead of demand.

**Acceptance Criteria:**

**Given** a kit BOM (Story 3.5)
**When** the kit page opens
**Then** it shows the components and the buildable quantity derived from component stock (FR-27)

**Given** an assemble or unbundle order from the OMS
**When** staff complete it
**Then** one SKU-conversion movement is posted (−components / +kit, or the reverse) through the stock ledger (FR-27)

**Given** a warehouse-initiated assembly
**When** it is submitted
**Then** it requires approval before execution (FR-27, FR-105)

## Epic 7: Order Intake, Visibility & Cut-off

Orders flow in from the OMS with carrier data and due dates; CS answers "where is this order?" from one screen; supervisors hold orders, handle change requests and see risk per carrier wave.

### Story 7.1: Ingest orders from the OMS and reserve stock

As a System,
I want to ingest orders from the connected OMS idempotently and reserve stock on receipt,
So that every channel order exists once in the WMS with its stock held for it.

**Acceptance Criteria:**

**Given** the OMS connection from Epic 3 is enabled
**When** the OMS submits an order
**Then** the system creates an order numbered `SO-YYMMDD-NNNNN` using the numbering service, storing channel, channel order numbers, external reference, source reference, owner, carrier, cut-off, recipient and lines (FR-1)
**And** the order record carries its owner and order type for later billing (FR-DATA-1, FR-DATA-2)

**Given** an order with a source reference that already exists
**When** the OMS submits it again (retry or duplicate)
**Then** no second order is created and the call returns the existing order's reference (FR-1, NFR-5)

**Given** a newly ingested order
**When** it is saved
**Then** reservations are drawn only from normal stock and ATP decreases accordingly (FR-41)
**And** the changed available-to-sell figure is queued for the OMS stock push from Epic 4 (FR-4, NFR-5)

**Given** an order that merges several channel orders
**When** it is shown anywhere
**Then** every channel order number it contains is listed, e.g. "รวมส่ง N คำสั่งซื้อ" (FR-1)

**Given** any office user
**When** they look for a way to create or import an order in the WMS
**Then** no create, edit, cancel or file-import control exists (FR-1, NFR-14)

**Given** an order line for a SKU with insufficient ATP
**When** the order is ingested
**Then** the order is created and the unreserved quantity is marked *insufficient stock* rather than rejected [ASSUMPTION]

### Story 7.2: Hold orders awaiting carrier data

As a Planner,
I want orders without a tracking number and label held in *awaiting carrier data*,
So that no pick list is built for an order that cannot ship.

**Acceptance Criteria:**

**Given** an ingested order without tracking number or label
**When** it is saved
**Then** its status is รอข้อมูลขนส่ง (awaiting carrier data) and it is excluded from pick-list creation (FR-2)

**Given** an order awaiting carrier data
**When** 5 minutes pass
**Then** the system re-pulls carrier data and, once tracking and label exist, moves the order to carrier data ready (FR-2)
**And** after 2 hours without data the owner is notified through the OMS (FR-2, FR-106)

**Given** a non-marketplace order (LINE, web, B2B)
**When** it is ingested
**Then** the system requests the tracking number and label from the configured carrier API (Flash, KEX, J&T) (FR-2) [ARCH-PENDING: carrier API contracts]

**Given** an order whose carrier name has no entry in the carrier-name mapping table (FR-119)
**When** it is ingested
**Then** the order is held, an alert is raised, and the system never guesses a carrier ("ระบบไม่เดาชื่อขนส่ง") (FR-2)
**And** once an admin maps the carrier name, the held order re-queues automatically (FR-2)

### Story 7.3: Explode kit order lines into components

As a System,
I want to explode kit order lines into their component SKUs at reservation,
So that stock is reserved and later deducted on the real items on the shelf.

**Acceptance Criteria:**

**Given** an order line for a kit synced from the OMS (Epic 3)
**When** the order is ingested
**Then** the line is exploded into component SKUs using the BOM version current at order intake, and reservation works on components (FR-120)

**Given** the BOM changes in the OMS after the order was ingested
**When** the order is processed further
**Then** it keeps the BOM version captured at intake (FR-120)

**Given** a kit SKU
**When** available-to-sell is pushed to the OMS
**Then** the kit's figure = the minimum over its components of (component ATP ÷ quantity per kit) (FR-120, FR-4)

**Given** an order containing a kit
**When** CS opens its lines
**Then** the kit line is shown with its components beneath it (FR-120)

### Story 7.4: Compute the ship-by due date

As a Supervisor,
I want every order to carry a ship-by due date from channel SLA rules,
So that carrier waves, queues and missed-wave handling work from one date.

**Acceptance Criteria:**

**Given** an admin on the SLA settings page
**When** they configure SLA rules per channel (Shopee, Lazada, TikTok Shop, off-platform) with an effective date
**Then** the rules are stored with history via the settings engine (FR-116, FR-12)

**Given** an ingested order
**When** the due date is computed
**Then** it uses the channel SLA rule, the warehouse calendar (FR-16) and any campaign extension, and assigns the order to a carrier wave from the pickup rounds (FR-116, FR-14)

**Given** the computed due date differs from the platform date received via the OMS
**When** the order is saved
**Then** an alert is raised showing both dates (FR-116)

**Given** a carrier with no configured pickup round
**When** an order for it is ingested
**Then** the order is flagged as unable to ship and alerted (FR-14) [ASSUMPTION: surfaced as an exception]

### Story 7.5: Push order status and tracking to the OMS

As a System,
I want to push order status changes and tracking numbers back to the OMS,
So that the OMS and marketplaces always show what the warehouse has done.

**Acceptance Criteria:**

**Given** an order changes lifecycle stage
**When** the change is committed
**Then** the new status (and tracking number when known) is sent to the OMS idempotently (FR-4, NFR-5)

**Given** a send fails
**When** retries with backoff are exhausted
**Then** the send appears in the failed-sends queue with its error, and the hub shows "ส่งข้อมูลไม่สำเร็จ n รายการ" (FR-4, UX-DR20)

**Given** several status changes for one order
**When** they are sent
**Then** the OMS receives them in order and a replayed message creates no duplicate effect (NFR-5)

### Story 7.6: Order list with stage buckets and search

As a CS user,
I want one order list with stage buckets and search by any order identifier,
So that I can find any order in seconds.

**Acceptance Criteria:**

**Given** the คำสั่งซื้อ page
**When** it loads
**Then** it shows buckets รอข้อมูลขนส่ง, รอสร้างใบหยิบ, รอหยิบ, กำลังหยิบ, รอแพ็ค, แพ็คแล้วรอส่งมอบ, ส่งมอบแล้ว, จัดส่งสำเร็จ, ผิดปกติ and ยกเลิก (by stage), each with a count (FR-56)
**And** the lifecycle received → carrier data ready → picking → packing → awaiting handover → handed over → delivered is tracked per order (FR-56)

**Given** a search box that accepts typed or scanned input
**When** CS enters an order number, channel number, external reference, tracking number or recipient
**Then** matching orders are shown (FR-56, UX-DR12)

**Given** a user without the order-price permission
**When** they view the list or export it
**Then** price and discount columns are absent while COD and total value are visible (FR-56, UX-DR19)

**Given** a user without *view buyer PII*
**When** they view or export orders
**Then** recipient phone and address are masked (`08x-xxx-1234`) (FR-19, NFR-13, UX-DR19)

**Given** the list
**When** filters, sort or page change
**Then** state is kept in the URL, pagination is server-side (50 rows) and Excel export respects filters and masking (UX-DR11)

**Given** the warehouse has a single owner
**When** the list renders
**Then** the owner column and filter are hidden (FR-DATA-1, UX-DR7)

### Story 7.7: Order detail with timeline

As a CS user,
I want an order detail screen with lines, pick lists, packing record and a full timeline,
So that I can answer "where is this order and what happened to it?" in under a minute.

**Acceptance Criteria:**

**Given** an order
**When** CS opens it
**Then** the screen shows lines (SKU, lot and expiry, pick location, quantity / picked / packed), its pick lists and a stage stepper (FR-57)

**Given** the order has stage events
**When** the timeline renders
**Then** each event shows time, actor and stage, in absolute time per the user's calendar era (FR-57, UX-DR44)

**Given** an order with no packing record yet
**When** the packing record section renders
**Then** it has slots for packer, station, box, weight, materials and video link; sections with no data yet show an empty state (FR-57, UX-DR20)

**Given** an order split across child pick lists
**When** the detail is opened
**Then** every list and the consolidation point are shown (FR-57)

**Given** a CS user starting from global search with a scanned tracking number
**When** they land on the order
**Then** status, current location of goods and latest event are visible without further navigation (NFR-12, UX-DR8)

### Story 7.8: Hold and release orders

As a Supervisor or CS user,
I want to hold one or many orders with a reason and release them,
So that I can stop work on a problem order without editing it.

**Acceptance Criteria:**

**Given** one or more selected orders
**When** the user chooses "พักคำสั่งซื้อ" and enters a reason
**Then** the orders are held, shown under ผิดปกติ · พักไว้ with the reason, and the action is logged (FR-58, FR-107)
**And** the bulk action bar reports "ทำได้ n · ข้าม m (เหตุผล)" for ineligible rows (UX-DR13)

**Given** a held order
**When** a pick list is being built
**Then** it is excluded (FR-58)

**Given** a held order already in progress
**When** any later scan point queries it
**Then** the order exposes a *stop* flag that scan points must honour (enforcement is added in Epics 8–10) (FR-58)

**Given** a held order
**When** the user releases it
**Then** it returns to its previous stage queue and the release is logged (FR-58)

**Given** an order screen
**When** any user looks for edit or cancel
**Then** no such control exists (FR-58, NFR-14)

### Story 7.9: Ingest cancellations and classify them by stage

As a System,
I want to ingest OMS cancellations at any stage and route each by its stage,
So that cancelled goods are stopped and the right follow-up work exists.

**Acceptance Criteria:**

**Given** the OMS sends a cancellation
**When** it is ingested
**Then** the system records the cancelling actor (buyer, platform or owner) and the stage (before pick, after pick, after pack, after handover) (FR-5, FR-92)
**And** a duplicate cancellation message has no second effect (NFR-5)

**Given** a cancellation before pick
**When** it is classified
**Then** the order is removed from queues and drafts and its reservation is released, returning ATP (FR-92, FR-41)

**Given** a cancellation after pick or after pack
**When** it is classified
**Then** a cancel-return job record is created in status รอดำเนินการ, linked to the order, for processing in Epic 11 (FR-92)
**And** the order shows a *stop* flag for scan points (FR-92)

**Given** a cancellation after handover
**When** it is classified
**Then** an expected-return record is created linked to the original parcel, for processing in Epic 12 (FR-92)

**Given** any cancellation
**When** it is recorded
**Then** its stage and order type are stored as billable signals (FR-DATA-2)
**And** each order exposes the timestamp of its latest cancellation data so sort and handover can warn when it is older than 15 minutes (FR-92)

### Story 7.10: Ingest owner change requests

As a System,
I want to ingest owner change requests from the OMS and stop affected work,
So that the warehouse never ships an order the owner is changing.

**Acceptance Criteria:**

**Given** a change request for an order before picking starts
**When** it is ingested
**Then** the order is removed from pick-list drafts and excluded until the OMS resolves it (FR-5, FR-62)

**Given** a change request for an order after picking started
**When** it is ingested
**Then** the order gets a *stop* flag so the next scan shows stop and directs goods to a hold location (FR-5, FR-59)
**And** the request appears in คำขอเปลี่ยนแปลง with status pending supervisor decision

**Given** a withdrawn change request from the OMS
**When** it is ingested
**Then** the order returns to its queue and the outcome "ถอนคำขอ" is recorded (FR-59)

### Story 7.11: Decide owner change requests after picking started

As a Supervisor,
I want to approve or reject a change request once picking has started,
So that the owner gets a clear outcome and goods are handled correctly.

**Acceptance Criteria:**

**Given** a pending change request on an order already in picking, packing or handover
**When** the Supervisor approves it
**Then** goods are directed to a hold location and the outcome "ส่งกลับแล้ว" is sent to the OMS (FR-59, FR-4)

**Given** the Supervisor rejects it
**When** they confirm
**Then** a reason is required and "ปฏิเสธ" with the reason is sent to the OMS; the stop flag is cleared (FR-59)

**Given** the order's carrier wave has already left
**When** the request is decided
**Then** the outcome "ดึงไม่ทันรอบ" (too late for the wave) is sent (FR-59)

**Given** any decision
**When** it is saved
**Then** it is logged with actor, device and reason (FR-107)

### Story 7.12: Cut-off board

As a Supervisor,
I want a cut-off board showing today's orders by stage, channel and carrier wave with a risk status,
So that I see a missed wave coming instead of discovering it.

**Acceptance Criteria:**

**Given** today's orders and pickup rounds
**When** the Supervisor opens คำสั่งซื้อ › ภาพรวม
**Then** orders are grouped by stage, channel and carrier wave, each wave showing a pill `HH:MM · ทัน`, `HH:MM · เสี่ยง` or `ช้า N นาที` (FR-60)

**Given** a wave
**When** risk is computed
**Then** slack = pack cut-off − (remaining work ÷ the team's actual speed today) (FR-60)
**And** negative slack shows a suggestion to add headcount or defer N orders to the next wave (FR-60)

**Given** a wave's pack cut-off approaches
**When** 60 and 15 minutes remain
**Then** an alert fires through the notifications engine (FR-60, FR-106)

**Given** a wave pill or stage cell
**When** clicked
**Then** it opens the filtered order list (≤ 2 clicks to a blocked item) with data-as-of time shown (UX-DR14)

## Epic 8: Picking

Planners build pick lists through draft waves with FEFO allocation; pickers execute them on PDAs with a fixed short-pick flow, staging and put-wall sorting; cancellations stop picking.

### Story 8.1: Versioned pick rules with approval

As a Supervisor,
I want to define versioned pick rules that take effect only after approval,
So that list building follows agreed, auditable logic.

**Acceptance Criteria:**

**Given** หยิบสินค้า › กฎการหยิบ
**When** the Supervisor creates a rule with conditions, scope, method and split limits (e.g. 300 orders or 2,000 pieces per list)
**Then** it is saved as a draft version and sent for approval (FR-61, FR-105)

**Given** an approved rule
**When** the engine resolves rules for an order
**Then** the first match wins in order mandatory global → owner-specific → general global → warehouse default (FR-61)

**Given** an active rule
**When** it is edited
**Then** a new version is created and needs approval; lists already built keep the version they used (FR-61)

**Given** no rule matches
**When** lists are built
**Then** the warehouse default applies (FR-61)

### Story 8.2: FEFO lot and location allocation

As a System,
I want to allocate lot and location FEFO with pick locations first and fewest stops,
So that the oldest valid stock ships first along an efficient route.

**Acceptance Criteria:**

**Given** a set of order lines to allocate
**When** allocation runs at list creation
**Then** the earliest-expiry lot is chosen first, then pick location before storage, then fewest stops, then shortest walking distance on the published layout (Story 2.14), then slots emptied exactly (FR-52, FR-64)

**Given** a lot below the effective minimum remaining shelf life (strictest wins, FR-13)
**When** allocation runs
**Then** it is not allocated unless the order names that lot (FR-52)

**Given** expired stock
**When** detected by allocation or the expiry job
**Then** it is moved to the damaged section and excluded from ATP (FR-52, FR-41)

**Given** the pick location is short but storage holds stock
**When** allocation runs
**Then** an urgent replenishment is created (Epic 6) and the line is placed at the end of the list; the order is not blocked (FR-64, FR-46)

**Given** the SKU is out of stock warehouse-wide
**When** allocation runs
**Then** only then is the order blocked as *insufficient stock* (FR-64)

**Given** a held or recalled lot (FR-115, once present) or a damaged location
**When** allocation runs
**Then** it is never allocated (FR-53)

### Story 8.3: Build a draft wave

As a Planner,
I want to build pick lists through a draft wave in recommended or manual mode,
So that I group today's eligible orders into efficient work.

**Acceptance Criteria:**

**Given** หยิบสินค้า › สร้างใบหยิบ
**When** the Planner starts a draft in recommended mode
**Then** eligible orders are grouped by the active pick rule and split by method → carrier wave → N orders by paid time → container capacity (FR-62)

**Given** manual mode
**When** the Planner selects orders
**Then** a draft is built from exactly those orders under the matching rule (FR-62)

**Given** orders awaiting carrier data, held, or under a change request
**When** a draft is built
**Then** they are excluded (FR-62, FR-2, FR-58, FR-5)

**Given** orders in a draft
**When** another planner builds a draft
**Then** those orders are reserved to the first planner for a countdown (e.g. 10 minutes) and unavailable to others (FR-62)
**And** the countdown warns at 2 minutes and offers an extension; on expiry orders return to the pool (UX-DR49)

### Story 8.4: Edit and confirm a draft wave into pick lists

As a Planner,
I want to split, merge, move or remove lists in a draft and confirm them,
So that the floor gets the right pick lists with methods set.

**Acceptance Criteria:**

**Given** a draft with lists
**When** the Planner splits, merges, moves orders between, or removes lists
**Then** split limits from the rule are enforced and removed orders return to the pool (FR-62)

**Given** the Planner confirms the draft
**When** lists are created
**Then** each is numbered `PK-YYMMDD-NNNN`, assigned one of six methods (by order, single-item orders, single SKU in bulk, identical-order sets, multi-order with sorting, consolidated multi-order) and stores its default pack method (FR-63)
**And** lot and location are allocated per Story 8.2 (FR-64)

**Given** a confirmed list
**When** it is created
**Then** its pick-rule version, owner and carrier wave are recorded (FR-61, FR-DATA-1)

### Story 8.5: Pick queue, claiming and print status

As a Picker,
I want a prioritised queue of pick lists I can claim,
So that the most urgent work is always done first and never twice.

**Acceptance Criteria:**

**Given** confirmed pick lists
**When** the queue is ordered
**Then** supervisor priority (with reason) comes first, then nearest carrier wave, then oldest (FR-66)

**Given** an order flagged *ship immediately*
**When** it is ready to pick
**Then** it gets its own single-order list, is printed automatically and goes to the top of the queue (FR-66)

**Given** unassigned lists
**When** an eligible picker opens the PDA หยิบสินค้า tile
**Then** lists show under รอรับ; tapping or scanning a list QR claims it and locks it to that picker; others see the claimer (FR-66, UX-DR36)

**Given** a list is printed or reprinted
**When** the print status chip renders
**Then** it shows ยังไม่พิมพ์ / พิมพ์แล้ว / สำเนา #n, and reprints are marked "สำเนา" (FR-66, UX-DR32)

**Given** the Supervisor raises a list's priority
**When** they confirm
**Then** a reason is required and logged (FR-66, FR-107)

### Story 8.6: Pick on a PDA along the layout route

As a Picker,
I want to execute a pick list on my PDA by scanning cart, location and items along the route computed from the warehouse layout,
So that I pick the right goods fast with a clear yes or no on every scan.

**Acceptance Criteria:**

**Given** a claimed list
**When** the picker starts
**Then** a cart or tote scan is always required first and binds the container to the list (FR-67, FR-10)

**Given** the list in progress
**When** the next stop shows
**Then** the location callout shows the location and "จุดที่ n/N · x/y ชิ้น"; stops follow the layout route from the list's start point, with unbound locations after them in walk sequence (FR-67, Story 2.14, UX-DR37)

**Given** a lot-controlled item
**When** the picker reaches its stop
**Then** the location scan is mandatory (FR-67)

**Given** every-piece scanning
**When** the list method is single-SKU bulk or identical-set
**Then** a Supervisor may turn it off (audited); it is always on for sort-while-pick, serial and high-value items (FR-67)

**Given** a wrong item or location scan
**When** scanned
**Then** full-screen reject with reason and next action appears within 500 ms p95 (UX-DR26, NFR-2)

**Given** quantity entry
**When** the picker enters more than required
**Then** it is blocked; entering less prompts "ขาด หรือ ทำต่อภายหลัง?" (FR-67)

**Given** each confirmed pick
**When** recorded
**Then** the scan is retained as part of the claims evidence chain (FR-DATA-3)

### Story 8.7: Offline picking queue

As a Picker,
I want to keep scanning when the signal drops,
So that a dead spot in an aisle never stops my work.

**Acceptance Criteria:**

**Given** the PDA loses connection mid-list
**When** the picker keeps scanning
**Then** scans are accepted or rejected locally against cached list data and queued, with the strip "รอส่ง n รายการ" (FR-67, NFR-3, UX-DR38)

**Given** connection returns
**When** the queue syncs
**Then** every queued scan is applied once with no duplicates (NFR-3)

**Given** a queued scan the server later rejects
**When** sync completes
**Then** the picker gets a PDA notification and a supervisor queue item is created (UX-DR38)

### Story 8.8: Pick by unit of measure and cartons

As a Picker,
I want to pick by unit of measure using sealed cartons first,
So that full cartons stay intact and counts stay right.

**Acceptance Criteria:**

**Given** a line that can be filled with cartons
**When** the picker is directed
**Then** sealed cartons are used first, then opened-carton remainders, then a new carton is opened (FR-68)

**Given** a sealed-carton QR
**When** scanned
**Then** it counts as a full carton in base units (FR-68, FR-25)

**Given** a carton QR that has already shipped
**When** scanned
**Then** it is rejected with full-screen reject (FR-68, UX-DR26)

**Given** a unit marked *sell by carton only*
**When** a picker tries to pick loose pieces of it
**Then** the scan is rejected (FR-25)

### Story 8.9: Short-pick resolution flow

As a Picker,
I want to report a short and be guided through a fixed resolution flow,
So that a missing item is resolved without anyone adjusting stock by hand.

**Acceptance Criteria:**

**Given** a location holds fewer units than required
**When** the picker taps "ขาด" and enters the actual quantity
**Then** the actual quantity is recorded (FR-70)

**Given** an alternative location with an unallocated valid lot exists
**When** the short is recorded
**Then** the system offers it and the picker can pick from it (FR-70)

**Given** no alternative exists but storage holds stock
**When** the flow continues
**Then** an urgent replenishment is created (prints at the zone printer, replenisher's PDA chimes) and the line moves to the end of the list marked "รอเติมของ"; when the replenishment completes the line flips to "หยิบได้" and the picker is notified (FR-70, FR-46)

**Given** nothing can be found anywhere
**When** the flow continues
**Then** an urgent count is created (FR-50) and the order shows *insufficient stock* ("สต๊อกไม่พอ") with the variance going to approval (FR-70)

**Given** any step of the flow
**When** it runs
**Then** stock is never adjusted automatically (FR-70, NFR-14)

**Given** part of an order is short and later found
**When** it is re-picked
**Then** a child list `PK-…-1` is created and packing waits for all parts (FR-70, FR-63)

**Given** a line deferred with "ทำต่อภายหลัง" or flipped back to "หยิบได้" after replenishment
**When** the picker continues
**Then** the remaining stops are re-ordered from the picker's current location on the layout route (FR-70, Story 2.14)

### Story 8.10: Drop at staging and complete the pick list

As a Picker,
I want to drop picked goods at a staging spot by scanning it,
So that packing knows where the goods are and custody stays traceable.

**Acceptance Criteria:**

**Given** all lines are picked or resolved
**When** the picker scans a staging location
**Then** container custody, location and carrier are recorded and the list becomes *completed*, meaning handed to packing, not shipped (FR-71)

**Given** the picker scans a staging spot not intended for that carrier or list
**When** scanned
**Then** a warning is shown (FR-71)

**Given** a completed list
**When** viewed
**Then** stock remains on hand and reserved until handover confirm (FR-41)

### Story 8.11: Stop cancelled and held orders at picking

As a Picker,
I want the PDA to stop me when an order on my list is cancelled, held or under change request,
So that I never pick goods that must not ship.

**Acceptance Criteria:**

**Given** a cancellation arrives for an order on an unstarted list
**When** the cancellation is processed
**Then** the whole list can be cancelled if all its orders are cancelled, otherwise the order is removed (FR-93)

**Given** a list already started
**When** an order on it is cancelled
**Then** cancellation applies per order: the next scan for that order shows full-screen reject "คำสั่งซื้อถูกยกเลิก" and directs picked goods to return staging (FR-93, UX-DR28)

**Given** an order with a hold or change-request *stop* flag
**When** the picker scans its item or slot
**Then** the PDA shows *stop* and directs the goods to a hold location (FR-58, FR-59)

**Given** a cart left with residue from a cancelled list
**When** the list closes
**Then** the cart shows *needs clearing* (รอเคลียร์ของ) and cannot be reused until cleared (FR-10)

### Story 8.12: Pick on the web or by paper task sheet

As a Picker in a warehouse without PDAs,
I want to pick from a printed task sheet and confirm the result on the web,
So that the warehouse can pick with the same controls without handhelds.

**Acceptance Criteria:**

**Given** the rule *confirm by paper task* is on
**When** a list is claimed or printed
**Then** a pick sheet with QR codes per list and location prints (FR-122)

**Given** a web pick confirmation with a USB scanner
**When** the user confirms lines
**Then** the same controls apply as on PDA: cart scan, location confirm for lot-controlled items, over-quantity block, short flow, cancellation check (FR-122, FR-67, FR-70, FR-93)

**Given** a confirmed web pick
**When** ledger or custody records are written
**Then** the device is recorded as web and the confirming user as actor (FR-122, FR-42)

**Given** a printed pick sheet
**When** it prints
**Then** lines appear in the same layout-route order as on the PDA (FR-122, FR-67)

### Story 8.13: Confirm empty location after the last piece

As a Picker,
I want to be asked whether a location is empty after I take its last piece,
So that phantom stock is caught at once.

**Acceptance Criteria:**

**Given** a pick takes the last unit the system expects at a location
**When** the pick is confirmed
**Then** the PDA asks "ตำแหน่งว่างแล้วใช่ไหม" with large yes/no buttons (FR-69) [ASSUMPTION: copy]

**Given** the picker answers "not empty"
**When** confirmed
**Then** an urgent single-location blind count is created (FR-69, FR-50)

**Given** the picker answers "empty"
**When** confirmed
**Then** picking continues with no further action (FR-69)

### Story 8.14: Sort batch-picked goods to a put wall

As a Sorter,
I want to scan each item and see which put-wall slot it goes to,
So that batch-picked goods become complete orders ready to pack.

**Acceptance Criteria:**

**Given** a completed multi-order-with-sorting list at a put wall
**When** the sorter scans an item
**Then** the target slot is shown large and the next valid scan is the slot (FR-72)

**Given** slot status
**When** displayed
**Then** each slot shows ครบ / บางส่วน / ยังไม่เริ่ม / ผิดปกติ · รอของขาด (FR-72)

**Given** a slot is complete
**When** it is released to packing
**Then** a pack-ready signal is created for that order once; releasing again creates no duplicate (FR-72)

**Given** a wrong slot scan
**When** scanned
**Then** full-screen reject appears (UX-DR26)

### Story 8.15: Picking overview

As a Supervisor,
I want a picking overview by cut-off with blockers and picker speed,
So that I can move people before a wave is missed.

**Acceptance Criteria:**

**Given** หยิบสินค้า › ภาพรวมงานหยิบ
**When** it loads
**Then** it shows remaining orders by cut-off, ETA vs cut-off, blockers (shorts, waiting replenishment), picker status and pieces per hour per picker (FR-74)

**Given** a picker
**When** they use the PDA or web
**Then** they cannot see or close pack jobs (FR-74)

**Given** a blocker row
**When** clicked
**Then** it opens the filtered list behind it (UX-DR14)

## Epic 9: Packing Station

Packers pack at bound stations with scan verification, weight check, video, box suggestion and material deduction; cancellations lock label printing; supervisors resolve exceptions.

### Story 9.1: Create pack jobs from pick lists

As a System,
I want one pack job per pick list sharing its number,
So that packers open work with the paper and containers they already have.

**Acceptance Criteria:**

**Given** a confirmed pick list
**When** it is created
**Then** a pack job with the same `PK-` number is created at status รอเตรียมงาน (awaiting prep) (FR-75)

**Given** picking and sorting finish for the list
**When** the list is completed at staging or its put-wall slot is released
**Then** the job moves to พร้อมแพ็ค (ready to pack) (FR-75, FR-71, FR-72)

**Given** a pack job
**When** its status changes
**Then** it follows รอเตรียมงาน → กำลังเตรียม → พร้อมแพ็ค → กำลังแพ็ค → แพ็คแล้ว, with side states ผิดปกติ, ยกเลิก and พัก carrying reason and wait time (FR-75)

**Given** an order with parts on child lists
**When** some parts are not yet picked
**Then** the order cannot close until all parts arrive (FR-75, FR-70)

### Story 9.2: Route pack jobs to stations

As a Supervisor,
I want pack jobs routed to ready stations and reassignable,
So that work flows to free desks and no order is packed twice.

**Acceptance Criteria:**

**Given** ready pack jobs
**When** routing runs
**Then** the queue is sorted by required pack-complete time and urgent jobs go to the first free station (FR-81)

**Given** a station with an unbound, untested or faulted device
**When** routing runs
**Then** it receives no work (FR-81, FR-11)

**Given** an order already open at one station
**When** another station tries to open it
**Then** it is rejected; two stations never pack the same order (FR-81)

**Given** a Supervisor
**When** they reassign a job to another station
**Then** the change is logged (FR-81, FR-107)

### Story 9.3: Open a job and scan-verify by order at the pack station

As a Packer,
I want to open a job by scan and verify every piece at my station,
So that wrong or extra items are impossible to pack.

**Acceptance Criteria:**

**Given** the pack station PS-NN is bound and its devices tested
**When** the packer scans the pick-list QR, cart or pre-printed label
**Then** the job opens full-screen in the 3-zone layout with step strip, next-scan banner and requirement tiles (FR-75, UX-DR22, UX-DR24, UX-DR25)

**Given** the by-order method
**When** the packer scans pieces
**Then** each piece or unit barcode is counted toward its line, rows sort incomplete-first and show ครบ / ขาด / เกิน (FR-76, UX-DR25)

**Given** a wrong SKU or an over-scan
**When** scanned
**Then** full-screen reject with sound blocks it (FR-76, UX-DR26)

**Given** a kit line
**When** displayed
**Then** its components are shown and must be packed together (FR-76, FR-120)

**Given** the non-disableable steps
**When** any rule or user tries to switch them off
**Then** scan start, scan close, every piece or unit barcode, every serial or high-value piece remain mandatory (FR-76)

**Given** station actions
**When** the packer scans a command barcode or presses F2 / F4
**Then** "ลบชิ้นล่าสุด", "พักงาน" and "ผิดปกติ" work as buttons do; Esc never closes the job (UX-DR29)

### Story 9.4: Pack by pick list

As a Packer,
I want to scan a pick list and its first piece and have the system choose a matching unpacked order,
So that I can pack a batch quickly without hunting for labels.

**Acceptance Criteria:**

**Given** a ready job with the by-pick-list method
**When** the packer scans the list and the first piece
**Then** the system selects an unpacked order that matches the scanned content (FR-75)

**Given** the selected order
**When** packing continues
**Then** the same scan verification as Story 9.3 applies and the label prints at box close (FR-75, FR-76)

**Given** no unpacked order matches the scanned piece
**When** scanned
**Then** full-screen reject explains why (UX-DR26)

**Given** a Packer
**When** they try to change the pack method
**Then** only a switch to multi-box is allowed; any other change requires a Supervisor with a reason (FR-75)

### Story 9.5: Weight check

As a Packer,
I want the box weight checked automatically against expected weight,
So that a missing or extra item is caught before the label prints.

**Acceptance Criteria:**

**Given** a bound scale
**When** the box is placed
**Then** the weight auto-fills from the scale; a typed weight is logged as manual ("พิมพ์เอง") (FR-77)

**Given** the expected weight
**When** checked
**Then** tolerance is the larger of ±5% or 20 g (FR-77)

**Given** the weight is out of tolerance
**When** checked
**Then** full-screen blocked "น้ำหนักเกินเกณฑ์ · รอหัวหน้าตรวจ" appears and the box is held for supervisor inspection (FR-77, UX-DR26)
**And** a Supervisor can release it on the spot by badge scan with a reason (UX-DR30)

**Given** any weight reading
**When** the box closes
**Then** actual vs expected weight is stored on the packing record as evidence (FR-DATA-3)

### Story 9.6: Box suggestion and material deduction

As a Packer,
I want a suggested box and automatic deduction of packaging and paired materials,
So that packaging stock is right without manual counting.

**Acceptance Criteria:**

**Given** an order's items
**When** the job opens
**Then** a box is suggested with backup ranks, by product size under the warehouse box mode (FR-79)

**Given** the packer scans a different box
**When** scanned
**Then** it is accepted without a reason (FR-79)

**Given** an owner box without usable size, storage size and paired materials set
**When** box suggestion runs
**Then** it is not suggested (FR-28)

**Given** a box being closed
**When** packaging scans are checked
**Then** exactly one packaging scan per box is mandatory; extra material is a separate scan; *reuse original box* ("ใช้กล่องเดิม") deducts nothing (FR-79)

**Given** the box closes
**When** materials are consumed
**Then** packaging and paired materials are deducted through ledger lines (FR-79, FR-42)
**And** packaging vs owner box, paired and extra materials are recorded as billable signals (FR-DATA-2)

### Story 9.7: Pre-print cancellation check and label printing

As a Packer,
I want the system to re-check cancellation right before the label prints and lock printing if the order was cancelled,
So that a cancelled order is never labelled and shipped.

**Acceptance Criteria:**

**Given** every item is verified
**When** the packer scans "ปิดกล่อง"
**Then** cancellation is re-checked live immediately before printing, and the screen shows "ไม่ถูกยกเลิก · HH:MM:SS" on pass (FR-78, FR-93)

**Given** the order was cancelled
**When** the re-check runs
**Then** label printing locks, full-screen reject "คำสั่งซื้อถูกยกเลิก · ห้ามพิมพ์ฉลาก · วางที่ CXL-01" shows, and it clears only when the packer scans the cancelled-goods location, which creates a "cancelled during packing" exception and links the cancel-return job (FR-93, UX-DR28)
**And** pack performed or not is recorded as a billable signal (FR-DATA-2)

**Given** the station is offline at the re-check
**When** the check cannot reach live data
**Then** it fails closed with full-screen blocked "ต้องต่อสัญญาณเพื่อตรวจคำสั่งยกเลิก" and resumes automatically on reconnect (NFR-3, UX-DR38)

**Given** an order with a hold or change-request stop flag
**When** the packer tries to close the box
**Then** the box cannot close (FR-58, FR-59)

**Given** the check passes
**When** the label and in-box documents (receipt or tax invoice, warranty card, B2B documents, content list) print
**Then** printing is silent to the bound printer within 2 s of the last verification scan and the job moves to แพ็คแล้ว (FR-78, NFR-2, UX-DR32) [ARCH-PENDING: print agent]
**And** platform labels are never edited (FR-78, NFR-14)

**Given** a reprint
**When** requested (F8 or "พิมพ์ซ้ำ")
**Then** it needs a reason and supervisor approval, is counted, and prints marked "สำเนา"; batch printing prints only never-printed labels (FR-78, UX-DR29)

**Given** the printer is offline
**When** printing is attempted
**Then** the job holds at the print step with "เครื่องพิมพ์ PS-NN ออฟไลน์ · ตรวจสาย/กระดาษ แล้วกดพิมพ์ใหม่" (UX-DR32)

### Story 9.8: Record pack video per order

As a CS user or Supervisor,
I want a video of every order being packed, showing its label,
So that I have evidence for any dispute about what was shipped.

**Acceptance Criteria:**

**Given** a station with a bound camera
**When** a job opens
**Then** recording starts with the indicator "กำลังบันทึก" and continues through label printing so the order's label is visible (FR-80, UX-DR31)

**Given** no camera (or on a PDA with neither IP nor built-in camera)
**When** a job opens
**Then** a single "ไม่มีวิดีโอ" warning appears and work continues; camera priority is bound IP camera → built-in → none (FR-80)

**Given** a recorded clip
**When** saved
**Then** it is linked to the order and any exception, stored on local storage, retained 60 days by default, and clips linked to an open exception are locked until it closes (FR-80, NFR-13) [ARCH-PENDING: NAS storage]

**Given** a CS user or Supervisor with *view or share video*
**When** they open the order, exception or cancel-return job
**Then** they can play the clip, and every view is logged (FR-80, FR-19, FR-107)

**Given** deletion
**When** requested
**Then** it happens only through the system with a 7-day soft delete, a second admin approves bulk deletion, and every delete is logged (FR-80, FR-105)

**Given** video storage exceeds 90%
**When** detected
**Then** a non-disableable alert fires (FR-80, FR-106)

**Given** a packed order
**When** its record is saved
**Then** pick scans, video, weight and packer form part of the claims evidence chain (FR-DATA-3)

### Story 9.9: Multi-box packing

As a Packer,
I want to split one order across several boxes,
So that large orders ship correctly with each box labelled n of total.

**Acceptance Criteria:**

**Given** an order that will not fit one box
**When** the packer chooses "ต้องใช้หลายกล่อง" or scans "เปิดกล่องใหม่"
**Then** a new box opens within the same order (FR-75)

**Given** multiple boxes
**When** each closes
**Then** each gets its content list and a label n/total, packaging is deducted per box, and the invoice goes in the last box (FR-75, FR-79)

**Given** a multi-box order
**When** counted later in manifests
**Then** it counts as 1 order (FR-88)

### Story 9.10: Packing exceptions queue

As a Supervisor,
I want packer-raised exceptions in one queue with the order's video,
So that I can resolve blocked boxes quickly with evidence.

**Acceptance Criteria:**

**Given** a packer at a station
**When** they raise "ผิดปกติ" (F2)
**Then** they choose a type: missing item, wrong SKU, abnormal weight, materials not ready, print failure, cancelled during packing, incomplete evidence or out of boxes (FR-82)

**Given** exceptions raised by the system (weight hold, cancelled during packing)
**When** created
**Then** they appear in the same queue แพ็คสินค้า › ผิดปกติตอนแพ็ค (FR-82, FR-77, FR-93)

**Given** an exception
**When** the Supervisor opens it
**Then** it links to the order's pack video and the resolution is logged with reason (FR-82, FR-80, FR-107)

**Given** an open exception
**When** the job is viewed
**Then** its status is ผิดปกติ and it cannot close until resolved (FR-75)

### Story 9.11: Issue in-box receipt or tax invoice

As a System,
I want to issue the in-box receipt or tax invoice at pack-complete and send it to the OMS,
So that documents are numbered once and the OMS has the record.

**Acceptance Criteria:**

**Given** document settings with a format and numbering series
**When** an order reaches pack-complete
**Then** a receipt or tax invoice is issued numbered from the company's series and sent to the OMS (FR-118, FR-4)

**Given** the document is reprinted
**When** it prints
**Then** it keeps the number assigned at pack-complete (FR-118)

**Given** an issued document must be voided
**When** voiding is requested
**Then** approval is required and the void is sent to the OMS (FR-118, FR-105)

### Story 9.12: Owner packing rules

As an Admin,
I want to configure each owner's box mode, insert rules and material matching inside packaging settings,
So that box suggestion and inserts follow each owner's requirements.

**Acceptance Criteria:**

**Given** packaging settings
**When** the Admin sets an owner's box mode (owner box first, warehouse box by size, owner box only)
**Then** box suggestion uses it (FR-123, FR-79)

**Given** insert rules (freebies, flyers) with conditions
**When** an order matches
**Then** the packer is prompted for every matching insert and inserts are deducted at handover, not at pack (FR-123, FR-79)

**Given** material matching (paired materials per box or SKU)
**When** a box closes
**Then** those paired materials are deducted (FR-123, FR-79)

**Given** a single owner
**When** the settings open
**Then** the owner is preselected (FR-123)

### Story 9.13: Value-added service tasks

As a Supervisor,
I want to attach a VAS instruction to an inbound line or an order (returns gain VAS in Story 12.6) and have staff confirm it by scan,
So that labelling, re-bagging or gift wrap is never skipped.

**Acceptance Criteria:**

**Given** an inbound line or an order
**When** the Supervisor attaches a VAS instruction (labelling, re-bagging, gift wrap)
**Then** a VAS task is created and shown to staff (FR-84)

**Given** an order with an open VAS task
**When** the packer tries to close the box
**Then** the box cannot close (FR-84)

**Given** an inbound line with an open VAS task
**When** putaway is attempted
**Then** putaway is blocked (FR-84)

**Given** staff complete the task
**When** they scan to confirm
**Then** the task closes and the block lifts (FR-84)

### Story 9.14: Reopen a packed box

As a Supervisor,
I want to reopen a packed box before it is sorted,
So that a packing mistake can be fixed without losing the audit trail.

**Acceptance Criteria:**

**Given** a packed box not yet sorted
**When** the Supervisor reopens it with a reason
**Then** the order returns to *packing* and the pack video records the reopen (FR-124)

**Given** the box's label was not yet handed over
**When** reopened
**Then** the label is voided (FR-124)

**Given** materials consumed by the box
**When** it is reopened
**Then** they stay consumed (FR-124)

**Given** a box already sorted
**When** reopen is attempted
**Then** it is refused (FR-124)

## Epic 10: Handover & Day Close

Handover staff sort parcels into the sorted state, seal containers, load vehicles by container, sign manifests and close the day against a checklist; stock is deducted at handover confirm.

### Story 10.1: Sort Packed Parcels into Carrier Containers

As a Handover staff member,
I want to scan packed parcels into carrier and wave containers with an immediate pass/fail check,
So that every parcel reaches an explicit sorted state before any truck is loaded.

**Acceptance Criteria:**

**Given** a parcel in *packed* state and an open handover container bound to its carrier and carrier wave
**When** I scan the parcel and the container (container-first or parcel-first mode)
**Then** the system checks packed, carrier matches container, and not cancelled, and shows the timestamp of the cancellation data used (FR-85)
**And** on pass the parcel moves to *awaiting handover* (รอส่งมอบ) with its container and carrier wave recorded, with an accept flash and beep (UX-DR26)

**Given** a container is open in container-first mode
**When** I switch to parcel-first mode
**Then** the mode changes without closing the container (FR-85)

**Given** a parcel whose carrier differs from the container's carrier
**When** I scan it into the container
**Then** a full-screen reject "ผิดขนส่ง · ใส่ภาชนะ {carrier}" is shown and the parcel is not sorted (FR-85, UX-DR26)

**Given** a parcel whose order has been cancelled
**When** I scan it at sort
**Then** a full-screen reject "ยกเลิกแล้ว · นำไปวางที่ CXL" is shown, the container is blocked until the parcel is pulled, and scanning the cancelled-goods location moves the parcel there and links it to the cancel-return job created at classification (FR-85, FR-92, FR-93, UX-DR28)

**Given** no open container exists for the parcel's carrier and wave
**When** I scan any empty registered container
**Then** it is bound to that carrier and wave, and if no empty container is left the system raises an alert (FR-85)

**Given** the cancellation data for the parcel is older than 15 minutes
**When** the parcel is scanned
**Then** a re-pull warning is shown and a fresh cancellation check is requested before the parcel is accepted (FR-92)

**Given** the PDA or station is offline
**When** a parcel is scanned at sort
**Then** the scan fails closed with the full-screen blocked state "ต้องต่อสัญญาณเพื่อตรวจคำสั่งยกเลิก" and resumes automatically on reconnect (NFR-3, UX-DR38)

### Story 10.2: Configure Container Use per Carrier

As a Warehouse Manager,
I want to choose whether handover uses containers for all carriers, per carrier, or not at all,
So that sorting matches how each carrier actually collects.

**Acceptance Criteria:**

**Given** the handover rules page (Epic 2 rules framework)
**When** I set container use to *all carriers*, *per carrier* (with a carrier list) or *none*
**Then** the setting is saved with an effective date and history, and takes effect the next day (FR-85, FR-12)

**Given** container use is *none* for a carrier
**When** that carrier's parcels are handed over
**Then** each parcel's tracking number is scanned directly at handover instead of a container (FR-85)

**Given** a change is saved today
**When** staff sort parcels later today
**Then** the previous setting still applies until the next day

### Story 10.3: Close and Seal a Container

As a Handover staff member,
I want to close a container and record its seal number,
So that the container can be loaded as one verified unit.

**Acceptance Criteria:**

**Given** an open container with sorted parcels
**When** I close it and scan or enter the seal number
**Then** the container status changes เปิดอยู่ → ปิดแล้ว and the seal number is stored as part of the evidence chain (FR-86, FR-DATA-3)

**Given** a container holding a parcel whose order was cancelled after sorting
**When** the container list is shown
**Then** that container is listed at the top with a destructive status and cannot move to handing over until the parcel is pulled (FR-86, FR-93)

**Given** a sealed container holding a cancelled parcel
**When** I pull the parcel
**Then** I must record breaking the seal, scan the parcel to the cancelled-goods location, and scan a new seal before the container can be handed over (FR-86)

**Given** a carrier with several shop accounts
**When** parcels from different accounts of that carrier are sorted
**Then** they share the same containers, and each parcel keeps its account for the manifest split (FR-86)

### Story 10.4: Register Vehicle and Load Containers

As a Handover lead,
I want to register the arriving vehicle and scan containers (not parcels) onto it,
So that a full truck is loaded in minutes with a count I can trust.

**Acceptance Criteria:**

**Given** a carrier wave whose truck has arrived
**When** I register the vehicle with plate, driver and a photo on the handover station or PDA
**Then** a handover session opens for that carrier wave and the counter shows "ภาชนะ 0/N · พัสดุ M" (FR-87)

**Given** an open handover session
**When** I scan a closed container
**Then** the container status becomes กำลังส่งมอบ and the counter updates (FR-86, FR-87)

**Given** I scan a container and the seal on it does not match the recorded seal
**When** the mismatch is detected
**Then** the station requires a search: every parcel in the container is scanned, and the container is resealed before it can be loaded (FR-87)

**Given** a container belonging to another carrier or wave
**When** I scan it onto the vehicle
**Then** a full-screen reject is shown and it is not loaded (UX-DR26)

**Given** some containers of the wave are not scanned
**When** I proceed to confirm
**Then** I can split them off as *pending*, and the manifest recounts to the loaded containers only (FR-87)

### Story 10.5: Confirm Handover and Deduct Stock

As a Handover lead,
I want confirming handover to be the single point where stock is deducted,
So that stock stays on hand until the carrier really has the goods.

**Acceptance Criteria:**

**Given** a handover session with loaded containers
**When** I press "ยืนยันส่งมอบ {n} ภาชนะ"
**Then** stock for every order in those containers is deducted through ledger lines of type *shipped* (on components for kits), reservations are consumed, and orders move to *handed over* (FR-87, FR-41, FR-42, FR-120)

**Given** handover is not yet confirmed
**When** stock views are opened
**Then** those goods are still counted as on-hand and reserved (FR-41)

**Given** a cancellation arrives for a parcel in a loaded container before confirm
**When** the pull-out setting is *at handover* (default)
**Then** confirm is blocked until the parcel is pulled to the cancelled-goods location; with the setting *immediately*, staff are alerted to pull it as soon as the cancellation arrives (FR-93)

**Given** owner insert rules added inserts at packing
**When** handover is confirmed
**Then** the inserts are deducted from stock at this point (FR-79)

**Given** the truck does not show up for the wave
**When** the supervisor marks a truck no-show
**Then** the goods move to the next carrier wave with no return transaction and no stock change (FR-87)

**Given** handover is confirmed
**When** the confirmation is saved
**Then** billable-event signals (order type, pack performed, cancellation stage where relevant) are recorded per order and the status is pushed to the OMS (FR-DATA-2, FR-4)

### Story 10.6: Produce and Sign the Manifest

As a Handover lead,
I want a signed manifest per handover split by shop or carrier account,
So that I have proof of exactly what the carrier received.

**Acceptance Criteria:**

**Given** a confirmed handover
**When** the manifest is generated
**Then** it is numbered `MF-YYMMDD-NNN` with child manifests `MF-…-n` per shop or carrier account, and the parent total equals the sum of children, with a multi-box order counted as 1 (FR-88, FR-15)

**Given** the manifest preview
**When** the rider signs on the tablet (default) or PDA signature pad with their name
**Then** the signature is shown on the preview before final confirm, and the manifest prints silently at the bound printer (FR-88, UX-DR33, UX-DR32)

**Given** a signature is not possible
**When** I attach a photo of the signed paper manifest
**Then** that photo is accepted as proof (FR-88)

**Given** neither signature nor photo is captured
**When** I try to finish the handover
**Then** the manifest goes to "รออนุมัติ · ไม่มีหลักฐานส่งมอบ" and a second person must approve via the approvals engine (FR-88, FR-105)

**Given** a completed manifest
**When** it is opened from the order detail
**Then** it shows containers, seals, vehicle, signature and parcels, completing the claims evidence chain (FR-DATA-3, FR-57)

### Story 10.7: Reconcile Carrier Receipt per Parcel

As a Supervisor,
I want the carrier's receipt reconciled against the manifest parcel by parcel,
So that a shortage is caught the same day instead of fixed later.

**Acceptance Criteria:**

**Given** a carrier with an API connection and a confirmed manifest
**When** the carrier's receipt events arrive
**Then** each parcel on the manifest is marked received or not received by the carrier (FR-88)

**Given** the carrier received fewer parcels than the manifest
**When** reconciliation runs
**Then** a case "ขนส่งรับไม่ครบ N" is opened listing the missing parcels, and the manifest total is never edited to match (FR-88)

**Given** a carrier without an API
**When** the manifest is complete
**Then** a Supervisor certifies receipt manually, and the certification is logged with actor and time (FR-88, FR-107)

**Given** the carrier API call fails
**When** retries are exhausted
**Then** the reconciliation appears in the failed-sends queue (NFR-5, FR-4)

### Story 10.8: Roll Missed-Wave Orders to the Next Wave

As a Supervisor,
I want orders still open when their truck leaves to roll into the next wave automatically,
So that nothing is silently stranded and missed waves are measured.

**Acceptance Criteria:**

**Given** a carrier wave whose handover is confirmed or whose truck has departed
**When** orders assigned to that wave are not yet handed over
**Then** they are reassigned to the carrier's next pickup round and tagged *missed wave* (หลุดรอบ) (FR-73, FR-14)

**Given** an order tagged *missed wave*
**When** KPIs, the cut-off board and reports are computed
**Then** it is counted as a missed wave (FR-73, FR-60)

**Given** a carrier has no later pickup round today
**When** orders roll over
**Then** they move to the first round of the next working day per the warehouse calendar (FR-16) `[ASSUMPTION]`

### Story 10.9: Handover Overview and Daily Balance

As a Supervisor,
I want a handover overview with a daily balance per carrier,
So that I see what is left, what must be pulled and whether the day adds up.

**Acceptance Criteria:**

**Given** the ส่งมอบขนส่ง hub
**When** I open it
**Then** I see parcels not handed over by carrier wave, truck status (รถมาถึงแล้ว / ช้า N นาที), cancellations to pull, and carry-over, each linking to the filtered list (FR-90, UX-DR14)

**Given** today's activity
**When** the daily balance per carrier is computed
**Then** packed today = handed over + cancelled before handover + pending, with no overlap, and carry-over is not added to today's packed count (FR-90)

**Given** the balance does not add up for a carrier
**When** the overview is shown
**Then** the difference is flagged in the "ต้องจัดการ" list with a link to the affected parcels

### Story 10.10: Close the Day with a Checklist

As a Supervisor with the *day close* permission,
I want to close the day only when the checklist passes,
So that no parcel is lost between today and tomorrow.

**Acceptance Criteria:**

**Given** the ค้างส่งมอบ & ปิดวัน page
**When** any checklist item is open (waves not closed, cancellations not pulled, leftovers not counted by scan, a not-found parcel without a case owner, a carrier-refused parcel not inspected)
**Then** the status shows "ยังปิดไม่ได้ · เหลือ N ข้อ" and each item links to its fix (FR-91)

**Given** leftover parcels
**When** staff count them by scanning
**Then** the counted leftovers are marked carry-over (ยกไปวันถัดไป) with their original pack date and no new order, parcel or stock record (FR-91)

**Given** a not-found parcel
**When** a case owner is assigned to it
**Then** the checklist item clears (FR-91)

**Given** all items pass and I hold the *day close* permission
**When** I close the day
**Then** an immutable snapshot of the day's handover summary is stored and cannot be edited, and the action is logged (FR-91, FR-19, FR-107)

**Given** a user without the *day close* permission
**When** they open the page
**Then** the close action is hidden (UX permissions rule)

### Story 10.11: Web Fallback for Sorting and Handover

As an office or floor user in a warehouse without PDAs,
I want to sort parcels and run handover on the web with a USB scanner,
So that the warehouse can ship without PDAs.

**Acceptance Criteria:**

**Given** the web คัดแยกลงภาชนะ and ส่งมอบ pages
**When** I scan parcels, containers and vehicles with a USB/HID scanner
**Then** the same checks apply as on the PDA: packed, carrier match, not cancelled, seal match, and fail-closed cancellation checks (FR-122, FR-85, FR-87, NFR-3)

**Given** the rule *confirm by paper task* is on
**When** a handover is prepared
**Then** a container/parcel sheet with QR codes prints, and results are confirmed on the web with the same controls (FR-122)

**Given** a sort or handover confirmed on the web
**When** ledger lines are written
**Then** they record the device as web and the confirming user as the actor (FR-122, FR-42)

### Story 10.12: Instant and Express Rider Orders

As a Packer and Handover staff member,
I want instant and express orders to run on a pack-within limit and tell the OMS when to call a rider,
So that riders arrive when the parcel is ready and the platform does not auto-cancel.

**Acceptance Criteria:**

**Given** an instant or express order
**When** it enters the queue
**Then** its pack-within limit is set (instant within 30 minutes, same-day 60 minutes before the truck; configurable) and it is ordered by that limit (FR-117)

**Given** the box for a rider order is packed
**When** packing completes
**Then** the WMS sends *pack complete — call rider* to the OMS (FR-117, FR-4)

**Given** the rider does not show up
**When** handover staff mark rider no-show
**Then** the order is in the rider no-show handover state, shown on the handover overview and the day-close checklist (FR-117, FR-90, FR-91)

**Given** a rider no-show
**When** I press "เรียกรถใหม่"
**Then** a re-call request is sent to the OMS and logged (FR-117)

**Given** a rider order handed over to the rider
**When** I scan the parcel and the rider signs
**Then** handover is confirmed per order with its own manifest and stock is deducted (FR-14 per-order mode, FR-87, FR-88)

### Story 10.13: Customer Pickup by Appointment

As a Handover staff member,
I want to hand orders to a customer collector after verifying their ID,
So that self-pickup orders have the same proof as carrier handovers.

**Acceptance Criteria:**

**Given** packed orders with a pickup appointment
**When** the collector arrives
**Then** I find the appointment, which can cover several orders, and capture a photo of the collector's ID (FR-89)

**Given** the appointment
**When** I scan the boxes
**Then** confirm is enabled only when every box is scanned, and one manifest is produced for the appointment (FR-89, FR-88)

**Given** confirm
**When** it is saved
**Then** stock is deducted via the ledger as for carrier handover (FR-87, FR-42)

**Given** the collector has not arrived 30 minutes after the appointment
**When** the no-show is triggered
**Then** the goods return to the pickup point (FR-89)

**Given** a stored collector ID photo
**When** it is 90 days old
**Then** the system purges it (FR-89, NFR-13)

## Epic 11: Cancellation Recovery

Goods from cancelled orders that never left the warehouse return to stock through cancel-return jobs and restock moves; carrier-rejected labels are reconciled.

### Story 11.1: Reconcile Carrier-Rejected Labels

As a Handover staff member,
I want to scan each label the carrier refused and then the cancelled-goods location,
So that every refused parcel is accounted for before the day closes.

**Acceptance Criteria:**

**Given** a set of labels the carrier refused at handover
**When** I scan a label and then the cancelled-goods location (CXL)
**Then** if the order is cancelled in the WMS the parcel is marked *matched* (ตรงกัน) and waits for return (FR-94)

**Given** a refused label whose cancellation the WMS has not received yet
**When** I scan it
**Then** it is marked *carrier knew first* (ขนส่งรู้ก่อน), removed from the manifest pending verification, and if verification shows it is not cancelled it moves to the next wave (FR-94)

**Given** a label from another carrier wave
**When** I scan it
**Then** a full-screen reject is shown and nothing is deducted (FR-94, UX-DR26)

**Given** an order cancelled in the system that the carrier did not refuse
**When** reconciliation runs
**Then** the parcel is listed as must-pull and counts as an open item on the day-close checklist (FR-94, FR-91)

### Story 11.2: Process a Cancel-Return Job

As a stock or returns staff member,
I want to process a cancel-return job by scanning the label or tote, the items, and a return container,
So that goods from a cancelled order go back toward stock with nothing lost.

**Acceptance Criteria:**

**Given** a cancel-return job created at classification (Epic 7) for an after-pick or after-pack cancellation
**When** I open the ยกเลิกรอคืน queue
**Then** I see jobs with states รอเปิดกล่อง, กำลังเปิดกล่อง, กำลังดึงจากตะกร้า, รอเก็บคืนชั้น, เก็บคืนชั้นแล้ว, ค้างเกินกำหนด (FR-96)

**Given** a packed parcel
**When** I start the job
**Then** I must unbox it at the cancelled-goods location first; the original label is voided and can never be reused, and packaging used is recorded as consumed (FR-96)

**Given** an unpacked pick
**When** I scan the tote, then each item, then a return container
**Then** the items are moved to the return container through ledger move lines (FR-96, FR-42)

**Given** a damaged piece
**When** I scan the *damaged* QR, the item and a damaged tote (DMG-T)
**Then** the piece goes to the damaged section with cause and origin *cancel-return* (FR-96, FR-53)

**Given** items expected in the job are missing
**When** I finish the job short
**Then** a search case and an urgent count are created (FR-96, FR-50)

**Given** the unbox table has no camera
**When** the job runs
**Then** it continues and is recorded as "no video" (FR-80)

### Story 11.3: Auto-Close Return-to-Shelf Containers

As a Supervisor,
I want return-to-shelf containers to close automatically and create restock moves,
So that cancelled goods get back on the shelf before they are needed.

**Acceptance Criteria:**

**Given** an open return-to-shelf container
**When** it reaches 30 pieces, or 2 hours have passed, or it is 1 hour before the last truck
**Then** it closes, a restock move is created, a put-back slip prints at the zone printer, and a new container opens automatically (FR-97, FR-46)

**Given** an order is waiting for a SKU in the open container
**When** that is detected
**Then** the container closes immediately and its restock move is marked urgent (⚡ ด่วน) at the top of the PDA queue (FR-97, UX-DR35)

**Given** these thresholds
**When** an admin views the cancel-to-restock rules
**Then** they are configurable with effective dates (FR-12)

### Story 11.4: Restock Cancelled Goods

As a stock staff member,
I want to restock cancelled goods by scanning the item or container and then a location,
So that they become pickable again.

**Acceptance Criteria:**

**Given** a restock move from a cancel-return container
**When** I scan the container or item and then the destination location
**Then** the stock is moved by ledger lines and becomes pickable (ขายได้) only at the location scan (FR-97, FR-42)

**Given** I scan a location other than the suggested one that fails the move checks
**When** the scan is evaluated
**Then** a warning is shown and nothing moves (FR-97, FR-44)

**Given** restock is not finished before the last truck
**When** the last truck time passes
**Then** the job is flagged as late (ค้างเกินกำหนด) on the inventory hub (FR-97)

**Given** a warehouse without PDAs
**When** a restock is done
**Then** it can be confirmed on the web with the same checks (FR-122)

### Story 11.5: Approve Cancellation After Picking Started

As a Supervisor,
I want to approve or reject an OMS cancellation that arrives after picking started on a self-pickup order,
So that physical work already done is handled deliberately.

**Acceptance Criteria:**

**Given** an OMS cancellation request for a self-pickup order arriving after picking started
**When** it is received
**Then** it appears as a pending approval for users with the *approve an OMS cancellation after work started* permission (FR-95, FR-19)

**Given** a cancellation request before picking
**When** it is received
**Then** it is always accepted automatically (FR-95)

**Given** the request
**When** I approve it
**Then** the order is cancelled at its current stage and routed per stage classification; when I reject it with a reason, the outcome is sent to the OMS (FR-95, FR-92, FR-4)

**Given** Phase 1
**When** the approval is shown
**Then** no 3PL cost notice is displayed (FR-95)

## Epic 12: Returns

Returning parcels are expected, received per carrier drop-off, inspected with evidence, restocked or quarantined, and escalated through problem reports.

### Story 12.1: Expected Returns Queue

As a Returns staff member,
I want a queue of returns the system expects,
So that I know what is coming back and what is overdue.

**Acceptance Criteria:**

**Given** expected-return records created by cancellation after handover (Epic 7), platform return requests via the OMS, and owner notifications via the OMS
**When** I open รอรับคืน
**Then** each shows original parcel, SO, owner, source and wait window, with pills ระหว่างทาง, เกินกำหนด N วัน, รับแล้ว (FR-98)

**Given** an expected return whose window has passed
**When** the window is checked
**Then** it is marked overdue using per-carrier windows (defaults Flash 7, J&T 7, SPX 10 days), configurable in returns rules (FR-98, FR-12)

**Given** a platform return request arrives from the OMS
**When** it is ingested
**Then** an owner-scoped expected return is created without duplicates for the same source reference (FR-98, FR-DATA-1, NFR-5)

### Story 12.2: Receive a Carrier Return Drop-off

As a Returns clerk,
I want one return receipt per carrier drop-off where I scan every label,
So that each returning parcel is received once and tied to the right carrier.

**Acceptance Criteria:**

**Given** a carrier drops off returns
**When** I open a return receipt at the return receipt station
**Then** it is numbered `RT-YYMMDD-NNNN`, locked to that carrier, and states run กำลังรับ → รอเซ็นรับ → เซ็นรับแล้ว (FR-99, FR-15)

**Given** an open receipt
**When** I scan a label from another carrier
**Then** a full-screen reject "ไม่ใช่ของ {carrier} รอบนี้" is shown, or a warning only if the rule is set to warn (FR-99, UX-DR26)

**Given** a parcel already received
**When** I scan it again
**Then** it is rejected with "พัสดุนี้รับคืนแล้ว" (FR-99)

**Given** a tracking number that was never handed over
**When** I scan it
**Then** it is rejected, unless it is a buyer-return label with a new tracking number, which goes to "รอสแกนเลขเดิม" until the original tracking number is scanned (FR-99)

**Given** a matched parcel
**When** it is scanned
**Then** it is linked to its expected return and original order, and held as *returns, awaiting inspection* (FR-99, FR-102)

**Given** all labels are scanned
**When** the driver signs on screen with their name
**Then** the receipt closes, the counter shows received vs expected, and the receipt-date billable signal is stored (FR-99, UX-DR33, FR-DATA-2)

### Story 12.3: Raise Problem Reports with Evidence

As a Returns staff member,
I want to raise a problem report with photos, video, type, source and the party to claim against,
So that owner decisions are made on evidence.

**Acceptance Criteria:**

**Given** a received return or parcel
**When** I raise a problem report
**Then** it is numbered `RP-YYMMDD-NNNN` and requires a problem type from the 15 types (e.g. กล่องบุบ, กล่องเปียก, ซีลถูกเปิด, ไม่มีใบปะหน้า, น้ำหนักต่าง, Serial/ล็อตไม่ตรง, ได้คืนเกิน, ไม่พบคำสั่งซื้อ), source, claim-against party and at least one photo (FR-103)

**Given** the return rule matrix
**When** the report is saved
**Then** the matrix decides whether the floor resolves it (หน้างานจัดการแล้ว) or it is sent to OMS after-sales as a decision case (รอเจ้าของสินค้าอนุมัติ) with its evidence (FR-103, FR-121)

**Given** a decision case sent from a problem report
**When** no decision returns within 7 days
**Then** the item stays stored, never disposed automatically (FR-103, NFR-14)

**Given** a decision returns from the OMS
**When** it is received
**Then** the matching task is created (dispose, return to owner, restock, add to stock) as in Epic 5 (FR-121)

**Given** a saved report
**When** it is viewed
**Then** its photos and video link are retained as claims evidence (FR-DATA-3)

### Story 12.4: Quarantine Unmatched Returns

As a Returns clerk,
I want a parcel that matches no order to go to return quarantine with a problem report opened automatically,
So that unknown goods are never stocked or discarded.

**Acceptance Criteria:**

**Given** a scanned parcel that matches no handed-over order, or a buyer-return label scanned with "ไม่มีเลขเดิม"
**When** the match fails
**Then** a full-screen blocked "ไม่พบคำสั่งซื้อ · ส่งเข้ากักกันตีกลับ" is shown, the parcel is placed in return quarantine (Q-RET-01), and a problem report of type ไม่พบคำสั่งซื้อ opens automatically (FR-100, FR-103, UX-DR26)

**Given** a quarantined parcel
**When** stock views are computed
**Then** it is not stock and is excluded from ATP (FR-100, FR-41)

**Given** staff search for a possible match
**When** they look up orders
**Then** a configurable look-back window suggests matches and staff can also search all orders; staff cannot assign the owner themselves (FR-100)

**Given** a parcel in quarantine for 30 days
**When** the alert timer runs
**Then** an alert fires and repeats every 7 days, and nothing is discarded automatically (FR-100, NFR-14)

### Story 12.5: Inspect and Grade Returned Units

As a Returns clerk,
I want to grade each returned unit at a camera station with photos for anything not good,
So that only sellable goods go back to stock and every exception has evidence.

**Acceptance Criteria:**

**Given** a received return at the inspection station (ตรวจสภาพ)
**When** I open it
**Then** video recording starts automatically and the expected units are listed (FR-101, UX-DR31)

**Given** a unit
**When** I scan it and pick a grade with large toggle buttons: สภาพดี, ชำรุดเสียหาย, รหัสสินค้าผิด, หมดอายุ, บรรจุภัณฑ์เสีย, ไม่ใช่ของเจ้าของสินค้า
**Then** any grade other than good requires at least one photo before "บันทึก" is enabled (FR-101)

**Given** inspection is saved
**When** stock is posted
**Then** stock is added only for physically scanned units; damaged and expired units go to damaged stock immediately via ledger lines (FR-101, FR-53, FR-42)

**Given** a shipped unit that was not scanned
**When** inspection is saved
**Then** it is recorded as missing (ไม่ครบสูญหาย) and a problem report opens (FR-101, FR-103)

**Given** a kit missing a component, or a serial that does not match the shipped serial
**When** the unit is graded
**Then** restock is blocked, the unit is segregated and a problem report or alert is raised (FR-101)

**Given** an inspection pending more than 2 days after receipt
**When** the timer runs
**Then** an alert is raised (FR-101)

### Story 12.6: Restock Inspected Returns

As a Returns clerk,
I want to put good returned units back by scanning the item or container and then a location,
So that they become sellable again.

**Acceptance Criteria:**

**Given** units graded good
**When** I scan the item or container and then a location
**Then** stock moves from the returns section to normal stock by ledger lines and becomes sellable only at the location scan (FR-102, FR-42)

**Given** a wrong location scan
**When** the move checks fail
**Then** a warning is shown and nothing moves (FR-102)

**Given** an inspected return item
**When** a Supervisor attaches a VAS instruction to it (reusing the VAS task from Story 9.13)
**Then** a VAS task is created for that return item (FR-84)

**Given** a return item with an open VAS task
**When** I try to restock it
**Then** restock is blocked until the VAS task is completed (FR-84)

**Given** the stock becomes sellable
**When** waiting orders exist for that SKU
**Then** they are reserved and ATP is pushed to the OMS (FR-41, FR-4)

### Story 12.7: Web Fallback for Returns

As a returns user in a warehouse without PDAs or a camera station,
I want to receive, inspect and restock returns on the web with a USB scanner,
So that returns work without floor devices.

**Acceptance Criteria:**

**Given** the web รับพัสดุตีกลับ, ตรวจสภาพ and เก็บคืนชั้น pages
**When** I scan with a USB/HID scanner
**Then** the same controls apply as at stations: carrier lock, receive once, mandatory photos, location scan for restock (FR-122)

**Given** no camera is bound
**When** inspection runs
**Then** a one-time "ไม่มีวิดีโอ" warning shows and work continues, with photo uploads still required for non-good grades (FR-80, FR-101)

**Given** a web-confirmed action
**When** ledger lines are written
**Then** they record the device as web and the confirming user as actor (FR-122)

### Story 12.8: Return Job Board

As a Supervisor,
I want one board showing every return parcel's stage,
So that I can see what is stuck and how fast returns flow.

**Acceptance Criteria:**

**Given** the สินค้าตีกลับ hub
**When** I open the return job board
**Then** each parcel shows its stage: รอรับคืน → รับเข้า → ตรวจสภาพ → รอเจ้าของสินค้า / งานเพิ่มเติม → เก็บคืนชั้น → เสร็จ (FR-104)

**Given** the board
**When** KPIs are computed
**Then** it shows overdue counts, throughput and restock rate, each linking to the filtered list (FR-104, UX-DR14)

**Given** the board
**When** a refund or compensation question arises
**Then** no refund or compensation action exists in the WMS (NFR-14)

### Story 12.9: Record Post-Handover Tracking Events

As a CS user,
I want carrier received, delivered and failed-delivery events on the order timeline,
So that I can answer what happened after the parcel left, and failed deliveries are expected back.

**Acceptance Criteria:**

**Given** a marketplace order handed over
**When** the OMS sends tracking events
**Then** carrier received, delivered and failed delivery are recorded on the order timeline and the order reaches *delivered* when delivered (FR-6, FR-56, FR-57)

**Given** a non-marketplace order handed over
**When** the carrier API sends events
**Then** the same events are recorded `[ASSUMPTION]` (FR-6)

**Given** a failed-delivery event
**When** it is recorded
**Then** an expected return is created with source *failed delivery* (FR-6, FR-98)

**Given** a duplicate event
**When** it arrives again
**Then** no duplicate timeline entry or expected return is created (NFR-5)

## Epic 13: Overview, Reports & Overdue Alerts

Warehouse managers see a live overview, run Phase 1 reports with export and scheduling, and get SLA overdue alerts.

### Story 13.1: Warehouse Overview Dashboard

As a Warehouse Manager,
I want a real-time overview of today's warehouse,
So that I know at a glance whether we are on track and where work is blocked.

**Acceptance Criteria:**

**Given** the ภาพรวมคลัง page
**When** I open it
**Then** it shows handed over vs total, awaiting handover near cut-off, pack accuracy, on-time %, inventory accuracy, space used, productivity vs target per stage, and pending approvals, each with "ข้อมูล ณ HH:MM" (FR-109, UX-DR14)

**Given** the page is open
**When** a minute passes
**Then** the data refreshes without a full reload (FR-109)

**Given** the order pipeline bar (รอสร้างใบหยิบ · รอหยิบ · กำลังหยิบ · รอแพ็ค · แพ็คแล้วรอส่งมอบ)
**When** I click a segment
**Then** I land on the filtered operational list, so any blocked item is ≤ 2 clicks from the overview (FR-109, UX-DR14)

**Given** a screen width of 1366px
**When** the KPI row renders
**Then** it shows 3 cards per row (UX-DR46)

### Story 13.2: Report Catalogue with Inbound, Stock and Accuracy Reports

As a Warehouse Manager,
I want a report catalogue starting with inbound analysis, stock movement summary and inventory accuracy,
So that I can review receiving and stock performance and export it.

**Acceptance Criteria:**

**Given** the รายงาน page
**When** I open the catalogue
**Then** I see the Phase 1 reports I have permission for (FR-110)

**Given** the inbound analysis, stock movement summary (opening → in/out/consumed/adjusted/conversion → closing, itemised by ledger line) and inventory accuracy (variance by period, zone, counter vs target) reports
**When** I open one
**Then** it shows its data-as-of time and filters (period, warehouse, zone and others) (FR-110)

**Given** an open report
**When** I export to Excel
**Then** the export respects active filters, masks buyer PII unless I hold *view buyer PII*, requires export permission, and is logged (FR-110, FR-19, FR-107)

### Story 13.3: Outbound, Packaging, Handover, Returns and Staff Reports

As a Warehouse Manager,
I want the remaining Phase 1 reports,
So that I can review outbound, materials, handover, returns and people performance.

**Acceptance Criteria:**

**Given** the catalogue
**When** I open daily outbound and variance, packaging usage, handover and on-time, returns analysis, or staff performance
**Then** each shows data-as-of time, filters and Excel export with the same permission, masking and logging rules as Story 13.2 (FR-110)

**Given** the handover and on-time report
**When** it is computed
**Then** missed-wave orders are counted as not on time (FR-73)

### Story 13.4: Saved Views, Drill-down and Scheduled Reports

As a Warehouse Manager,
I want to save report views, drill into operational lists and schedule reports,
So that the reports I use every day come to me.

**Acceptance Criteria:**

**Given** a report with filters applied
**When** I save the view
**Then** it is stored per user and reopens with the same filters (FR-110, UX-DR11)

**Given** a report row
**When** I click "ดูรายการ"
**Then** I land on the filtered operational list behind it (FR-110)

**Given** a report
**When** I schedule it with time, recipients and channel (email or LINE)
**Then** it is sent automatically at that time with PII masked unless every recipient holds *view buyer PII* `[ASSUMPTION]`, and each send is logged (FR-110, FR-106, FR-107)

### Story 13.5: Overdue Alerts for Every Stage SLA

As a Supervisor,
I want an *overdue* alert whenever work exceeds its stage SLA,
So that stuck work is raised before it becomes a missed wave.

**Acceptance Criteria:**

**Given** stage SLAs (temporary receipt open, awaiting putaway, stuck move, pending inspection and similar)
**When** an item exceeds its threshold
**Then** an *overdue* alert is sent through the notifications engine and the item shows a destructive เกินกำหนด badge and a danger count chip (FR-108, FR-106, UX-DR10)

**Given** the warehouse rules page
**When** an admin changes an SLA threshold
**Then** it is configurable per warehouse with effective date and history (FR-108, FR-12)

**Given** the warehouse calendar
**When** SLA time is computed
**Then** non-working time is excluded (FR-16)

## Epic 14: JST Cutover

Admins run a cutover check that gates the first live wave on Zimple.

### Story 14.1: Run the Cutover Check

As an Admin,
I want a cutover check that compares counted, imported and ledger stock,
So that I know stock is right before going live.

**Acceptance Criteria:**

**Given** an approved opening-balance import (Epic 4)
**When** I open เครื่องมือผู้ดูแลระบบ › cutover check
**Then** the gate lists its checks with pass/fail: whole-warehouse blind count completed after the import, ledger total vs imported total, and WMS → OMS stock push (FR-114)

**Given** a completed whole-warehouse blind count round (Epic 6)
**When** the check runs
**Then** it shows the comparison of counted vs imported quantities per owner × SKU × lot × location, with variances going through normal count resolution (FR-114, FR-49)

**Given** the ledger total differs from the imported total
**When** the check runs
**Then** that check fails and lists the differing SKUs with links to fix them (FR-114)

**Given** every earlier check passes
**When** I press "ส่งยอดเข้า Zimple OMS"
**Then** stock is pushed to the OMS, and the push result is recorded as the last check; the button stays disabled while any earlier check fails (FR-114, FR-4)

### Story 14.2: Gate the First Live Wave

As a Warehouse Manager,
I want the first live wave blocked until the cutover check passes,
So that we never go live on unverified stock.

**Acceptance Criteria:**

**Given** the cutover check has not passed
**When** a planner tries to confirm the first draft wave
**Then** confirmation is blocked with a message linking to the cutover check (FR-114)

**Given** the check has not passed
**When** a Warehouse Manager overrides with a reason
**Then** the first wave can proceed and the override is logged with actor, reason and the failing items (FR-114, FR-107)

**Given** the check passes or is overridden
**When** later waves run
**Then** the gate no longer applies

**Given** in-flight orders and ASNs at cutover and a JST rollback runbook
**When** cutover is planned
**Then** these are handled outside this story: rollback is a written 2-week runbook `[ASSUMPTION]` and in-flight handling is open (Q-4)

### Story 14.3: Peak Load and Availability Release Gate

As a Warehouse Manager,
I want the system proven at peak volume before cutover,
So that a campaign day never misses a carrier wave because of the system.

**Acceptance Criteria:**

**Given** a load test at 30,000 orders a day and a 3× campaign peak `[ASSUMPTION: peak multiple, Q-10]`
**When** the full flow runs (intake → pick → pack → sort → handover confirm, plus ATP push)
**Then** no carrier wave is missed for system causes (NFR-1)
**And** scan accept/reject feedback is ≤ 500 ms at p95 and labels print within 2 s of the last verification scan (NFR-2)
**And** available-to-sell reaches the OMS within 5 minutes of a stock change (NFR-5)

**Given** the load test results
**When** the cutover check (Story 14.1) is evaluated
**Then** a passing load test is listed as a required release-gate item, and a failure blocks the first live wave like any other failing check (FR-114, NFR-1)

**Given** each warehouse's configured operating hours
**When** availability is monitored
**Then** uptime against the 99.9% target is measured and alerted on, and planned downtime is blocked within 3 days before a configured campaign day (NFR-4) `[ARCH-PENDING: hosting and monitoring stack]`

## Epic 15: Post-pilot Extensions [Defer]

Doors and staging points, automatic pick lists, production-line packing and pre-pack prep, after the pilot is stable.

### Story 15.1: Doors and Staging Points

As an Admin,
I want to turn on doors and staging points bound to doors,
So that larger warehouses can direct inbound and handover to specific doors.

**Acceptance Criteria:**

**Given** the doors feature is off (default)
**When** inbound and handover run
**Then** they work without door assignment (FR-9)

**Given** I turn the feature on
**When** I create doors and staging points bound to doors
**Then** doors hold no stock and staging points are stock locations (FR-9)

**Given** pickup rounds and handover modes
**When** doors exist
**Then** a door can be set on a pickup round (FR-14)

**Given** goods moved between staging points
**When** staff move them
**Then** each move needs a scan of the item then the new spot, logged with a reason

### Story 15.2: Automatic Pick Lists

As a Planner,
I want pick lists generated automatically per owner × service level on threshold or time triggers,
So that work is released continuously without manual wave building.

**Acceptance Criteria:**

**Given** automatic pick lists are enabled (add-on, per company or warehouse)
**When** a trigger fires (tote full, cart slots full, clock time, or N minutes before a carrier wave)
**Then** pick lists are created per owner × service level using the active pick rules (FR-65, FR-61)

**Given** a cap on open system lists
**When** the cap is reached
**Then** no more system lists are created until some close (FR-65)

**Given** the mode *wait for warehouse confirmation*
**When** a trigger fires
**Then** the lists are created as drafts that a planner confirms; in *create automatically* mode they enter the pick queue directly (FR-65)

**Given** the add-on is off
**When** a user opens สร้างใบหยิบ
**Then** automatic options are not rendered (UX-DR7)

### Story 15.3: Production-Line Packing

As a Packer on a production line,
I want to pack many identical orders with one box type and per-box label scans,
So that high-volume identical orders pack faster without losing control.

**Acceptance Criteria:**

**Given** a pick list with pack method *production line* set by a Supervisor
**When** the line runs
**Then** one box type is used for the line, each box requires a label scan, and a random full scan is required at a configured interval (e.g. every 20th box) (FR-75)

**Given** serial-controlled or high-value items
**When** they are packed on the line
**Then** every serial is still scanned (FR-76)

**Given** the line finishes
**When** it closes
**Then** the system reconciles picked = output + waste + leftover and raises an exception on mismatch (FR-75, FR-82)

### Story 15.4: Pre-Pack Prep

As a Prep staff member,
I want to prepare boxes and materials per prep sheet and dispatch them to a desk or conveyor,
So that packers have materials ready when the job arrives.

**Acceptance Criteria:**

**Given** pre-pack prep is enabled (add-on)
**When** a pick list is created
**Then** a prep sheet with the same number is created and the materials are reserved (FR-83)

**Given** a prep sheet
**When** I prepare and dispatch it to a desk or conveyor
**Then** the pack job moves awaiting prep → preparing → ready to pack (FR-75, FR-83)

**Given** reserved materials
**When** the box closes at packing
**Then** the materials are deducted, not before (FR-83, FR-79)
