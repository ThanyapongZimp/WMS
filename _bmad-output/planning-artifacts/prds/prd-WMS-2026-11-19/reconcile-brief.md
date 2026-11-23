---
title: "Reconcile: Product Brief → PRD (Phase 1)"
input: briefs/brief-WMS-2026-11-19/brief.md + addendum.md
prd: prd.md + addendum.md
created: 2026-11-19
---

# Reconcile: Product Brief → PRD

**Scope of this check:** brief statements that the PRD drops or contradicts *without* a logged decision in `.memlog.md` / PRD addendum §B.

**Excluded as intentionally superseded (logged):**
- direct marketplace integration → orders via OMS;
- the pilot connects to Zimple OMS and leaves JST entirely;
- carrier APIs only for non-marketplace orders;
- PRD covers Phase 1 only;
- unassigned features phased by the JST-parity rule (purchasing, planning and similar go to Later);
- no separate inbound QC step.

Phase 2 and Later items that the PRD lists as non-goals are also ignored.

## Gaps (ordered by importance)

### G1. "Modern, attractive, simple" UX promise is narrowed to floor-staff learnability (High)
- **Brief:** "**Modern, easy UX.** This is the headline promise against JST. Users should find it more modern, more attractive, and simpler to use than JST." Also: "The advantage is UX and breadth… UX and end-to-end coverage have to win the deal on their own. In Phase 1, that means UX and the JST-gap fixes alone."
- **PRD:** §1 Vision cuts this to "a modern UX that floor staff learn faster". NFR-9 (floor usability) covers scan-only tasks and red-screen rejections. SM-7 covers time to productive. Nothing in the PRD covers visual quality, attractiveness, consistency, or simplicity for office or web users. There is no UX-principles section and no UX metric against JST. Since this is the main differentiator, it is under-specified.
- **Fix:**
  - Add a UX quality NFR, say NFR-12, with these principles: modern and attractive visual design; one design system shared across web, PDA and stations; few clicks for common office tasks; consistent states and empty states; Thai-first typography.
  - Add a metric, say SM-10: perceived ease and attractiveness vs JST. For example, a SUS or CSAT survey of pilot users before and after cutover, target "better than JST" `[ASSUMPTION]`.
  - State the principle explicitly in the handoff to `bmad-ux`.

### G2. Office users' UX pain is dropped (High)
- **Brief (Problem):** "**Dated, hard-to-use UX.** Floor staff **and office users** work in an interface that is slow to learn and unpleasant to use." Under Solution, the warehouse web serves "supervisors, CS, accounting, purchasing, and admins."
- **PRD:** NFR-9, SM-7 and the §1 Vision line address floor staff only. The office side has only the CS jobs-to-be-done line in §2.1 ("in under a minute"), which has no NFR or SM behind it. Accounting appears only as a §2.2 non-user who "may read reports", with no role or FR. The decision to keep purchasing out is logged; the treatment of accounting is not.
- **Fix:**
  - Extend NFR-9, or the new UX NFR, to cover office web tasks. For example: CS answers "where is this order?" in under 60 s; a supervisor gets from the overview to the blocked item in 2 clicks or fewer `[ASSUMPTION]`.
  - Turn the CS jobs-to-be-done line into a measurable secondary SM.
  - Confirm whether accounting needs a read-only default role in FR-18.

### G3. Key Risk and its mitigations are not a first-class section (Medium)
- **Brief:** "**Key Risk: Phase 1 Timeline.** A tight fit for a small team in 2 months… must be load-ready for 30,000 orders/day." Mitigations: (1) a JST parity checklist that defines "done" and stops creep; (2) "build **stations and integrations** first." Positioning risk: "it holds only if delivery is fast and the product is reliable at 30,000 orders/day."
- **PRD:** There is no Risks section. The 2-month and small-team constraint appears only in a `[NOTE FOR PM]` at the end of §9.2. The "stations and integrations first" build order appears only as a §7 table cell ("The brief says…"), not as a sequencing requirement. No load-readiness gate before cutover exists: NFR-1 states a target but nothing requires a load test before SM-1. Positioning on fast delivery and reliability is not stated as a risk.
- **Fix:**
  - Add a "Risks & Mitigations" section with these items:
    - timeline and scope (Q-1 parity checklist as the gate);
    - build order: stations, hardware and the Zimple OMS connector first;
    - Zimple OMS readiness (Q-3);
    - load readiness, with a peak load test at 30k/day × peak multiple passed before cutover. Add this as a step in the FR-114 cutover check or as an NFR-1 consequence.
  - State the delivery timeline (2 months) in §0 or §9.

### G4. Brief open questions not carried into the PRD (Medium)
- **Brief:**
  - "Confirm JST = JST ERP, and quantify its license cost and lock-in pain."
  - "Final pricing… mirror JST's license-plus-fees structure."
  - "[ASSUMPTION: no specific UX failure cases collected yet]."
- **PRD:** §11 drops all three. PRD addendum §F notes that JST pain points "need customer interviews", but nothing tracks this as an open question. FR-17 mentions a "license package" user cap without linking it to the open pricing question.
- **Fix:**
  - Add Q-13: JST identity, cost and lock-in evidence, plus collecting concrete JST UX failure cases from pilot users. This feeds G1/G2 baselines and UX research.
  - Add Q-14: pricing and license packaging, which affects the FR-17 user cap and Q-5 add-on licensing.

### G5. "Migration without disrupting operations" has no measure or fallback (Medium)
- **Brief (Success Criteria):** "**Migration:** customers move off JST one warehouse at a time without disrupting operations."
- **PRD:** §4.15 says "without stopping operations", and FR-114 blocks the first live wave until the cutover check passes. However, SM-1 measures only that cutover completes within 4 weeks. No metric covers disruption during cutover, such as missed waves or downtime in the cutover week. No rollback or fallback-to-JST plan exists if the first live days fail. Q-4 covers only in-flight orders and ASNs.
- **Fix:**
  - Add to SM-1: "zero carrier waves missed and no stop of shipping during the cutover week."
  - Add a rollback criterion and owner to FR-114 or Q-4: when to revert, and how stock is pushed back.
  - Note that repeatability for customer warehouses ("one warehouse at a time") depends on the post-pilot OMS connectors.

### G6. Accuracy criterion is benchmarked against a fixed target instead of JST (Low)
- **Brief:** "Stock and order accuracy at or above JST levels."
- **PRD:** SM-3 sets an absolute target of at least 99.5% with no JST baseline. SM-4 is relative to JST. This is not a contradiction, but stock accuracy has lost its "≥ JST" framing.
- **Fix:** Measure the pilot's JST-era count accuracy before cutover, and set SM-3 to max(99.5%, JST baseline).

### G7. Buyer segments and editions are not framed in the PRD body (Low)
- **Brief:** Two buyer segments, "brand owners… first; 3PLs second", plus positioning that pricing mirrors JST so cost is not the reason to switch.
- **PRD:** §1 keeps the pricing and positioning line. The segments appear only implicitly ("pilot is a brand-owned warehouse"), and the Business vs 3PL edition split appears only in addendum §C. No logged decision drops this, but downstream readers of the PRD alone miss that Phase 1 targets segment 1 (the Business edition).
- **Fix:** Add one line to §0 or §2: "Phase 1 targets Segment 1 (brand-owned warehouse, Business edition). The 3PL edition is Phase 2."

### G8. Executive and QC actors are absent without rationale (Low)
- **Brief addendum (Actors):** The warehouse office includes "executives… QC".
- **PRD:** §2 has no executive jobs-to-be-done line. FR-109 is aimed at the Warehouse Manager. QC is partly covered by the logged "no separate inbound QC step", but return inspection and pack QC roles are not named.
- **Fix:** Either list executives as read-only overview/report users in FR-18, or add them to §2.2 Non-Users with a reason.

## Verified as covered (no action)
- JST gaps: the pre-handover sorted state (FR-85, UJ-4) and holding cancelled orders for return (FR-92–97).
- 30k/day throughput and 11.11 peaks (NFR-1); training time below JST (SM-7); the 50% market goal (SM-9, Q-2); the JST parity checklist (Q-1, SM-C3).
- Three surfaces: web, PDA and stations (§1, NFR-10); FIFO/FEFO, waves and batches; box suggestion; signed manifest; returns with photos.
- Inbound VAS (FR-84 covers inbound lines); owner-supplied boxes (FR-28/FR-79); multi-warehouse stock view (NFR-11).
