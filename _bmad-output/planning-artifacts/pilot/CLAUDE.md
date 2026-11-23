# pilot/

Pilot Wave 1: Epic 1 (partial) + Epic 2 Stories 2.1–2.3, 2.13–2.14 — warehouse, locations, containers, layout map.

| Path | What |
|---|---|
| `pilot-wave-1-th.md` | Thai view of the selected stories. **Not a source** — ACs live in `_bmad-output/planning-artifacts/epics.md`; change there first |
| `ui/` | Clickable HTML prototype of the pilot screens |

## Before editing anything in ui/

- **UI copy or states** (labels, messages, empty/error/scan states): read `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/EXPERIENCE.md` *Voice and Tone* and *State Patterns*, and use terms from `_bmad-output/planning-artifacts/prds/prd-WMS-2026-11-19/prd.md` §3 Glossary.
- **Look** (colours, spacing, components): `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md`.
- **What the screen must do**: the story's ACs in `epics.md`.

## ui/ prototype facts

- Plain HTML + `ui/assets/zwms.css` + `ui/assets/zwms.js`. No build step, no dependencies; open `ui/index.html` in a browser.
- Sample data in `sessionStorage`, shared across pages.
- Pages: `login`, `index`, `warehouses`, `locations`, `containers`, `layout`, `denied`.
- Rules (from the file headers): tokens come from `DESIGN.md` frontmatter; **no raw hex outside the `:root` block** of `zwms.css`; light theme only; icons are Lucide (stroke 2) inlined in `zwms.js`.
- Throwaway reference for look and behaviour — not the production codebase. Don't port code from it without review.
- Design-lint ignores for these files: `.impeccable/config.json`.
