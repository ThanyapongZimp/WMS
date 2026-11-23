# _bmad-output/implementation-artifacts/

Build tracking. Skills: `bmad-sprint-planning`, `bmad-build`, `bmad-code-review`, `bmad-retrospective`.

| Path | What |
|---|---|
| `sprint-status.yaml` | Status of every epic/story. Status definitions and workflow notes are in its header |
| `<story-key>.md` | Story files, created when a story moves to `ready-for-dev` — **none yet**. Until then, ACs are only in `_bmad-output/planning-artifacts/epics.md` |

- Story keys must match `_bmad-output/planning-artifacts/epics.md`.
- Update statuses through BMAD skills, not by hand, unless repairing (`bmad-sprint-planning` → "fix sprint status").
- A story blocked by `[ARCH-PENDING]` must not be `ready-for-dev`.
