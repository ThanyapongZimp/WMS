# _bmad/

BMAD Method v6.12.4 install. Mostly installer-managed — **don't edit** except where noted.

| Path | What | Editable |
|---|---|---|
| `config.toml` | Base config: project name, output folders, languages, agent roster | no (regenerated) |
| `config.user.toml` | Personal install answers | no — and it is personal; should be gitignored |
| `custom/config.toml` | Team overrides, deep-merged over base | **yes** |
| `custom/config.user.toml` | Personal overrides (gitignored) (optional) | yes |
| `bmm/config.yaml`, `core/config.yaml` | Module configs | no |
| `_config/skill-manifest.csv`, `bmad-help.csv` | Skill catalogue and help routing | no |
| `_config/manifest.yaml`, `files-manifest.csv` | Install manifest | no |
| `scripts/*.py` | Helpers used by skills (config resolve, memlog, render) | no |

Resolve effective config: `uv run _bmad/scripts/resolve_config.py --project-root .`

`uv` may not be installed. BMAD skills call `uv run …`; if it fails, run the same script with `python3` (standard library only), e.g. `python3 _bmad/scripts/resolve_config.py --project-root .`. Installing `uv` is the durable fix.

Known config state: `custom/config.toml` sets `document_output_language = "Thai"`, so BMAD skills currently write Thai docs.

## Agents (invoke as skills)

Roster and personas: `config.toml` `[agents.*]`. Analyst `bmad-agent-analyst` · PM `bmad-agent-pm` · UX `bmad-agent-ux-designer` · Architect `bmad-agent-architect` · Dev `bmad-agent-dev`. Skills live in `.claude/skills/bmad-*` (installer-managed).

## Workflow

Per story: `bmad-build` → `bmad-code-review` → `bmad-walkthrough`. Per wave/epic: `bmad-retrospective`. Scope change: `bmad-correct-course`. Lost: `bmad-help`.
