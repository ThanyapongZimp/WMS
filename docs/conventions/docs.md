# Documentation conventions

## Translations

- Thai translations live beside the source as `<name>.th.md`.
- Existing translations (`brief.th.md`, `prd.th.md`) must be synced in the same change as their English source.
- Which *new* docs require a translation is **not decided yet** (open question in `docs/decisions/CLAUDE.md`). Until decided: optional — ask the user.

## Source-of-truth order (when docs conflict)

1. Approved sprint change proposals (`_bmad-output/planning-artifacts/sprint-change-proposal-*.md`, newest first; listed in `_bmad-output/planning-artifacts/CLAUDE.md`)
2. `_bmad-output/planning-artifacts/epics.md` for acceptance criteria; the architecture spine for technical decisions
3. `prd.md`, then its `addendum.md`, then the FR candidate catalogues
4. `DESIGN.md` / `EXPERIENCE.md`
5. Translations (`*.th.md`, `pilot-wave-1-th.md`) — never the source; fix English first

## Reference, don't copy

Link to the source doc and section (full path + heading, or FR / Story / ADR ID) instead of restating it. Duplicated content drifts. Don't invent path shorthands.

## File and folder naming

- BMAD run folders: `<type>-WMS-YYYY-MM-DD/` (created by BMAD skills; don't rename).
- `.memlog.md` and `.working/` inside run folders are BMAD run logs/scratch — don't hand-edit.
- Don't put "epic" in any filename other than `epics.md` — `bmad-sprint-planning` and `bmad-build` would read it.
- Every folder with docs has a `CLAUDE.md` index. After changing one, run `python3 scripts/check_doc_links.py`.
