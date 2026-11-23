# docs/decisions/

Index of every project decision: one line + a link to where it is recorded. Reasoning lives in the source, not here.

## How to use

- User asks "should we use X instead?" → find the row, state the decision and source, then ask whether they want to **reopen** it. Reopening = sprint change proposal (`bmad-correct-course`) or architecture update — never a silent switch.
- Decision already recorded in a source doc → add a row linking there. No ADR.
- Decision with **no** source doc (conversation, team call) → write `ADR-NNNN-<slug>.md` here (template below), then add a row.
- When the architecture spine finalizes, add a row per AD and remove resolved rows from *Open*.

## Decided

| ID | Decision | Source |
|---|---|---|
| D-UI-1 | shadcn/ui (Radix + Tailwind) on every surface | `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md` frontmatter + *Components* |
| D-UI-2 | Light theme only; tenants change logo + primary colour only | `PRODUCT.md` *Anti-references*; `_bmad-output/planning-artifacts/epics.md` Story 1.15 |
| D-UI-3 | Thai first with English switch | `PRODUCT.md` *Accessibility & Inclusion* |
| D-SYS-1 | One codebase for office web, station, PDA | `_bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/prd.md` NFR-12; `epics.md` Story 1.1 |
| D-SYS-2 | Pilot OMS = Zimple OMS; marketplace calls go through it | `prd.md` §1 |
| D-DOM-1 | Append-only stock ledger with daily reconciliation | `_bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/addendum.md` §D *Ledger design* |
| D-DOM-2 | 5-level settings precedence engine | `addendum.md` §D; FR-13 |
| D-HW-1 | PC↔station 6-digit binding; PDA camera fallback order | `addendum.md` §D *Hardware* |
| D-HW-2 | ~~Video: local NAS in Phase 1~~ superseded by AD-10 (S3) — source not yet updated | `addendum.md` §D *Video storage* |
| AD-1 | Modular monolith on Zimple team Clean Architecture standard | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-1 |
| AD-2 | Only `core/ledger` writes stock; ledger append-only enforced in DB | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-2 |
| AD-3 | Shared DB, row-scoped `company_id` / `warehouse_id` / `owner_id` | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-3 |
| AD-4 | WMS owns the OMS integration contract; outbox + asynq webhooks | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-4 |
| AD-5 | Identity: Clerk for office/support; WMS badge, labour-card and device sessions | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-5 |
| AD-6 | Authorization and PII masking enforced server-side from WMS tables | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-6 |
| AD-7 | One Next.js app; PDA is a PWA with keystroke-wedge scanning | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-7 |
| AD-8 | Offline floor commands with client `command_id`; live-data scans fail closed | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-8 |
| AD-9 | Fully cloud: no on-site software; USB station devices driven by the browser (Web Serial, getUserMedia); server print queue | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-9 |
| AD-10 | Video recorded in browser, chunked upload to S3; metadata in WMS | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-10 |
| AD-11 | UUIDv7 PKs; numbering service for document numbers | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-11 |
| AD-12 | Idempotency key on writes; activity log in same transaction | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-12 |
| AD-13 | Settings only through one resolver | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-13 |
| AD-14 | Layout = React + SVG (resolves D-4); precomputed distances + NN/2-opt (resolves D-5 route part) | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-14 |
| AD-15 | Requests do only the DB transaction; all other work on asynq priority queues (critical/default/low); worker autoscales | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-15 |
| AD-16 | Postgres owns queued work (inbox, outbox, print_jobs); Redis only delivers it | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` AD-16 |
| D-SCOPE-1 | Full warehouse layout editor in Phase 1 + Pilot Wave 1; drives pick routing | `_bmad-output/planning-artifacts/sprint-change-proposal-2026-11-23.md` |

Architecture ADs are **draft** until the architecture reviewer gate runs and status is `final`.

## Open — do not pick silently

Most `[ARCH-PENDING]` items in `epics.md` are now answered by draft ADs above. Remaining open: see *Open Questions* and *Deferred* in `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md`.

| Question | Source |
|---|---|
| Who owns Zimple OMS; will it accept the WMS-owned contract? | ARCHITECTURE.md *Open Questions* |
| Thai data residency required (region ap-southeast-1 vs ap-southeast-7)? | ARCHITECTURE.md *Open Questions* |
| Pilot PDA model supports keystroke wedge? | ARCHITECTURE.md *Open Questions* |
| Pilot printers support virtual COM? JST print plugin? Uplink + backup line? | ARCHITECTURE.md *Open Questions* |
| PRD addendum §D says NAS-first video; conflicts with AD-10 — update source | ARCHITECTURE.md *Open Questions* |
| Layout data model detail (schema) | decided per Story 2.13 within AD-3/AD-14 |

### Open product questions (for PM / UX, not architecture)

| Question | Source |
|---|---|
| Thai glossary label for "Location" (ตำแหน่ง?) missing from PRD §3 | `prd.md:132` |
| Locations empty-state action: Excel import (UX spec) vs range bulk-create (pilot prototype) — which is pilot scope? | `EXPERIENCE.md:240` vs `_bmad-output/planning-artifacts/pilot/ui/locations.html:247` |
| Which docs require a Thai translation? | `docs/conventions/docs.md` *Translations* |

## ADR template

```markdown
# ADR-NNNN: <title>
- Status: proposed | accepted | superseded by ADR-XXXX
- Date: YYYY-MM-DD
- Decided by: <role/name>

## Context
## Decision
## Consequences
```
