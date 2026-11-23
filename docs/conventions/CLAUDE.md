# docs/conventions/

Index of conventions. Where a source doc already defines one, this index **points to it**; files here exist only for conventions with no other home.

## Defined elsewhere — read the source

UX docs live in `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/`. PRD docs live in `_bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/`.

| Topic | Source |
|---|---|
| Design principles, voice, accessibility floor, target/text sizes | `PRODUCT.md` *Design Principles*, *Accessibility & Inclusion* |
| Design tokens (colours, type, spacing, radius) | `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md` frontmatter + *Colors*, *Typography*, *Layout & Spacing* |
| Component rules per surface | `.../ux-WMS-2026-11-19/DESIGN.md` *Components*; `.../ux-WMS-2026-11-19/EXPERIENCE.md` *Component Patterns* |
| UI do's and don'ts | `.../ux-WMS-2026-11-19/DESIGN.md` *Do's and Don'ts* |
| Loading, empty, error, scan states | `.../ux-WMS-2026-11-19/EXPERIENCE.md` *State Patterns*, *Scan & Hardware Feedback* |
| UI copy voice and tone | `.../ux-WMS-2026-11-19/EXPERIENCE.md` *Voice and Tone* |
| Domain vocabulary (names in code, DB, UI) | `.../prd-WMS-2026-11-19/prd.md` §3 Glossary |
| Ledger, settings precedence, peak integration pattern | `.../prd-WMS-2026-11-19/addendum.md` §D |
| Code layout, API, events, IDs, migrations, i18n (WMS) | `_bmad-output/planning-artifacts/architecture/architecture-WMS-2026-11-23/ARCHITECTURE.md` *Consistency Conventions* |
| Story status lifecycle | `_bmad-output/implementation-artifacts/sprint-status.yaml` header |

(`...` = the folder named above the table.)

## Defined here

| File | Covers |
|---|---|
| `docs/conventions/docs.md` | Translations, source-of-truth order, file naming |
| `docs/conventions/git.md` | Branches, commit messages |
| `docs/conventions/git-flow.md` | Release flow: `dev` / `sit` / `uat` branches, freeze, defects, hotfix (copied from ACE, not yet adapted) |

## To add when the stack is chosen (Story 1.1 / architecture spine)

One file per topic, listed above: language & framework versions, app folder layout, naming, lint/format, testing, DB migrations, API style. If the architecture spine defines a topic, add a row to *Defined elsewhere* instead.
