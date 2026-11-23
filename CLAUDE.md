# CLAUDE.md — WMS (Zimple WMS / Zimple Fulfillment)

Root index. **References only; never restates source docs.** This file is always loaded; folder `CLAUDE.md` files load only when Claude opens a file in that folder — so anything Claude must know *before* acting lives here.

## What this is

Multi-tenant warehouse management SaaS for Thai e-commerce fulfillment (Shopee, Lazada, TikTok Shop; ~30k orders/day per warehouse). Business edition = Zimple WMS, 3PL edition = Zimple Fulfillment. Phase 1 goal: the pilot warehouse switches off JST. Details: [`PRODUCT.md`](PRODUCT.md), then PRD §0–§2.

Status: planning → Pilot Wave 1. No application code yet. Architecture: draft (`_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md`).

## Repo structure

Each folder with a `CLAUDE.md` indexes its own contents — open it before working in that folder.

```
WMS/
├── CLAUDE.md
├── PRODUCT.md                         # purpose, users, voice, design principles, accessibility
├── docs/                              # → docs/CLAUDE.md
│   ├── decisions/                     # → docs/decisions/CLAUDE.md   decided / open / ADRs
│   └── conventions/                   # → docs/conventions/CLAUDE.md code, UI, docs, git
├── scripts/                           # → scripts/CLAUDE.md          repo tooling (doc link check)
├── _bmad/                             # → _bmad/CLAUDE.md            BMAD install, agents, workflow
├── _bmad-output/
│   ├── planning-artifacts/            # → _bmad-output/planning-artifacts/CLAUDE.md
│   │   ├── briefs/ prds/ research/    #   each has its own CLAUDE.md
│   │   ├── ux-designs/ architecture/ pilot/
│   │   ├── epics.md                   #   epics + stories + ACs
│   │   └── sprint-change-proposal-*.md
│   └── implementation-artifacts/      # → _bmad-output/implementation-artifacts/CLAUDE.md
├── artifact/                          # → artifact/CLAUDE.md         legacy Zimple mockups (anti-reference for style)
├── .claude/skills/                    # BMAD skills (installer-managed)
└── .impeccable/config.json            # UI design-lint ignore rules
```

## Where to go for a task

| Task | Go to |
|---|---|
| Acceptance criteria for a story | `_bmad-output/planning-artifacts/epics.md` (search `### Story <n.m>`) — **source of truth**; story files don't exist yet |
| "Should we use X?" / is this decided? | `docs/decisions/CLAUDE.md` |
| Writing UI copy, empty/error/scan states | `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/EXPERIENCE.md` *Voice and Tone*, *State Patterns* + PRD §3 Glossary |
| UI look (tokens, components) | `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md` |
| Two docs disagree | `docs/conventions/docs.md` *Source-of-truth order* |
| Architecture, stack, technical rules | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` |
| Any other convention | `docs/conventions/CLAUDE.md` |

## Working rules

**Ask the user first:**
- Anything ambiguous or not covered by PRD / epics / architecture. Tag unavoidable inferences `[ASSUMPTION]`.
- Resolving an `[ARCH-PENDING]` item or deviating from a logged decision.
- Adding a dependency, changing a schema/data model or an API contract.
- Changing acceptance criteria, scope or priority (route via `bmad-correct-course`).
- Deleting, renaming or moving files/folders.
- Committing, pushing, opening PRs, or sending anything to an external service.
- Editing installer-managed files (listed in `_bmad/CLAUDE.md`).

**OK without asking:** reading; typo/format fixes in docs; syncing a `.th.md` to an already-changed English source; updating `CLAUDE.md` files to match a change you just made.

**Always:**
- Reference, don't copy. Cite as full `path:line` or FR / Story / ADR IDs. No path shorthands.
- A decision made in conversation → record it in `docs/decisions/` before relying on it.
- Adding/moving/removing a folder or key doc → update that folder's `CLAUDE.md` and the tree above, then run `python3 scripts/check_doc_links.py`.
- Report test/lint results truthfully; say when a step was skipped.
