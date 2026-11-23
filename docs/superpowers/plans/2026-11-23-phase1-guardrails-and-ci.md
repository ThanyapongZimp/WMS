# WMS UX/UI Design System — Phase 1 (AI Guardrails & CI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the empty `wms-ux-ui-design` repo into a docs-first design-system repo with AI control files, Thai/English Vale terminology rules, markdownlint, lychee, CODEOWNERS and a PR CI gate.

**Architecture:** Markdown docs are the source of truth (`docs/foundation`, `docs/patterns`, `docs/components`, `docs/workflows`), indexed by `docs/discovery.md`. Glossary and grammar rules are mirrored as Vale YAML styles under `styles/WMS/`. Every gate runs the same way locally (`npm run lint`) and in GitHub Actions. Fixture files under `tests/fixtures/` prove each Vale rule fires on bad copy and stays silent on good copy.

**Tech Stack:** Vale 3.x (installed: `/opt/homebrew/bin/vale`), Node 20+ (`node --test`), `markdownlint-cli2`, lychee (CI via `lycheeverse/lychee-action@v2`), GitHub Actions.

**Spec:** `/Users/artgraphicdesigner/Downloads/wms_design_system_master_context.md` (sections 1–3, 8 "ระยะที่ 1"). Product context: `PRODUCT.md`.

**Repo:** `/Users/artgraphicdesigner/Claude/Project WMS/WMS` (existing BMAD repo; user ruled 2026-11-23 to build here). Work on branch `phase1-guardrails`.

## Global Constraints

- `CLAUDE.md` ≤ 200 lines; no `IMPORTANT` / all-caps emphasis; must contain `@docs/discovery.md` and the exact lint commands.
- Every Thai Vale rule sets `nonword: true` and a `link:` to its guideline page.
- `.vale.ini` must not lint `docs/foundation/Glossary.md`, `docs/foundation/GrammarAndSpelling.md` (they list banned words on purpose).
- Thai spelling (ราชบัณฑิตยสถาน): แอปพลิเคชัน not แอพ; อีเมล not อีเมล์; อัปเดต not อัพเดท/อัพเดต; ฟังก์ชัน not ฟังก์ชั่น; ดิจิทัล not ดิจิตอล.
- Glossary Do/Don't pairs exactly as spec §3.3 (เข้าสู่ระบบ, จัดเก็บเข้าพื้นที่, หยิบสินค้า, รอบการหยิบ, สินค้าขาด, ช่องเก็บสินค้า).
- Buttons: no "ตกลง" / "ใช่"; no trailing `.` after Thai text; English Sentence case; ค.ศ. dates `DD/MM/YYYY`.
- Error copy: `[ปัญหา] + [วิธีแก้]`, ≤ 2 sentences, no technical codes (`Error 500`, `Invalid bin token`).
- CODEOWNERS: `/docs/foundation/` and `/docs/patterns/` → `@org/ux-writers`; `/tokens/`, `/docs/components/`, `/.claude/`, `/.github/` → `@org/design-system-core`; `/.github/CODEOWNERS` protects itself. Replace `@org` with real team slugs before merge (open question).
- Zero emoji in any file (user's global rule). Status words in plain text.
- Lifecycle statuses: `Trial` | `Active` | `Deprecated` | `Retired`. New docs start as `Trial` until they pass review.

## Review Focus

1. Thai word inside a longer word (e.g. "อีเมล" inside "อีเมล์" — must flag "อีเมล์" but not "อีเมล"). Test: fixture pair in Task 3.
2. Banned words inside fenced code or inline code — Vale must ignore them (default behaviour; pin with a fixture line in Task 3).
3. "ตกลง" used inside a sentence vs as a button label — rule is scoped to the generic-button list only; expect a warning (not error) so writers can judge. Fixture in Task 3.
4. `discovery.md` linking a file that does not exist yet — lychee must fail. Test in Task 4 by pointing at a missing path once, then fixing.
5. `CLAUDE.md` growing past 200 lines over time — `tests/claude-md.test.mjs` (Task 1) fails CI.

## Open Questions (ask before Task 5/6)

- Real GitHub team slugs for `@org/ux-writers` and `@org/design-system-core`.
- PRODUCT.md says PDA buttons ≥ 56px; spec says ≥ 48x48px. Plan records 56px as the WMS floor in `CLAUDE.md` (stricter wins) — confirm.

---

## File Structure

```text
wms-ux-ui-design/
├── CLAUDE.md                     Task 1
├── AGENTS.md                     Task 1
├── package.json                  Task 1 (scripts: lint, lint:vale, lint:md, test)
├── .gitignore                    Task 1
├── tests/claude-md.test.mjs      Task 1
├── docs/
│   ├── Guidelines.md             Task 1 (reading order)
│   ├── discovery.md              Task 1 (index + status), updated each task
│   ├── foundation/VoiceAndTone.md, Glossary.md, GrammarAndSpelling.md   Task 2
│   └── patterns/ErrorMessages.md                                         Task 2
├── .vale.ini                     Task 3
├── styles/WMS/*.yml              Task 3
├── styles/config/vocabularies/WMS/accept.txt  Task 3
├── tests/fixtures/{bad,good}.md  Task 3
├── tests/vale.test.mjs           Task 3
├── .markdownlint-cli2.jsonc      Task 4
├── lychee.toml                   Task 4
├── .github/CODEOWNERS            Task 5
├── .github/workflows/docs-and-ui-ci.yml   Task 5
└── .claude/settings.json         Task 6
```

---

### Task 1: Repo skeleton and AI control files

**Files:**
- Create: `CLAUDE.md`, `AGENTS.md`, `package.json`, `.gitignore`, `docs/Guidelines.md`, `docs/discovery.md`
- Test: `tests/claude-md.test.mjs`

**Interfaces:**
- Produces: npm scripts `lint:vale` = `vale docs`, `lint:md` = `markdownlint-cli2 "**/*.md" "#node_modules"`, `lint` = both, `test` = `node --test tests/`. Later tasks and CI call these names.
- Produces: `docs/discovery.md` table with columns `Category | Name | File Path | Status | Description` (Thai headers as in spec §2).

- [ ] **Step 1: Branch** — `git checkout -b phase1-guardrails`
- [ ] **Step 2: Write failing test** `tests/claude-md.test.mjs` with `node:test`:
  - `CLAUDE.md` exists and line count ≤ 200
  - contains `@docs/discovery.md`, `npm run lint`, `npm test`
  - does not match `/\bIMPORTANT\b/`
  - `AGENTS.md` exists and contains `docs/discovery.md`
- [ ] **Step 3: Run** `node --test tests/` → FAIL (file missing)
- [ ] **Step 4: Write files.**
  - `CLAUDE.md`: Explore → Plan → Implement → Verify; read `@docs/discovery.md` first, never guess paths; semantic tokens only, no hex/px in components; Thai CSS rules (line-height 1.8, `word-break: normal` + `overflow-wrap: break-word`, never `break-all`); PDA target ≥ 56px; batch work tracked in JSON (`"passes": false`); lint commands; no emoji.
  - `AGENTS.md`: same rules in tool-neutral form, points to `CLAUDE.md` for Claude-specific bits.
  - `docs/Guidelines.md`: reading order — discovery → VoiceAndTone → Glossary → GrammarAndSpelling → patterns → components → workflows.
  - `docs/discovery.md`: lifecycle status definitions + table rows only for files that exist after this plan (Guidelines, VoiceAndTone, Glossary, GrammarAndSpelling, ErrorMessages), all `Trial`.
  - `package.json`: `"private": true`, devDependency `markdownlint-cli2`, scripts above.
  - `.gitignore`: `node_modules/`, `.DS_Store`, `.env*`, `styles/*` except `styles/WMS/` and `styles/config/`.
- [ ] **Step 5: Run** `npm install && node --test tests/` → PASS
- [ ] **Step 6: Commit** `chore: add AI control files and discovery index`

### Task 2: Foundation and pattern docs

**Files:**
- Create: `docs/foundation/VoiceAndTone.md`, `docs/foundation/Glossary.md`, `docs/foundation/GrammarAndSpelling.md`, `docs/patterns/ErrorMessages.md`

**Interfaces:**
- Produces: stable heading anchors that Vale `link:` URLs point to: `Glossary.md#wms-terms`, `Glossary.md#general-terms`, `GrammarAndSpelling.md#transliteration`, `GrammarAndSpelling.md#punctuation`, `GrammarAndSpelling.md#buttons`, `ErrorMessages.md#structure`.

- [ ] **Step 1: Write docs** from spec §3.1–3.3 verbatim values. Glossary table = spec §3.3 split into `## General terms` and `## WMS terms`. GrammarAndSpelling sections: `## Transliteration`, `## Spacing`, `## Numbers and dates`, `## Punctuation`, `## Buttons`. ErrorMessages `## Structure` with 3 Do/Don't examples from WMS (wrong bin scan → name correct bin; bin full → "ช่องเก็บเต็ม" action; short pick).
- [ ] **Step 2: Add rows** to `docs/discovery.md` if missing.
- [ ] **Step 3: Verify** `npx markdownlint-cli2 "docs/**/*.md"` → 0 errors (config arrives in Task 4; default rules for now, fix MD013 by wrapping or defer).
- [ ] **Step 4: Commit** `docs: add voice, glossary, grammar and error message foundations`

### Task 3: Vale styles derived from Glossary and Grammar

**Files:**
- Create: `.vale.ini`, `styles/WMS/ThaiSpelling.yml`, `styles/WMS/WMSTerms.yml`, `styles/WMS/GenericButtons.yml`, `styles/WMS/TechErrorCodes.yml`, `styles/WMS/ThaiTrailingPeriod.yml`, `styles/config/vocabularies/WMS/accept.txt`
- Test: `tests/vale.test.mjs`, `tests/fixtures/bad.md`, `tests/fixtures/good.md`

**Interfaces:**
- Consumes: anchors from Task 2.
- Produces: rule IDs `WMS.ThaiSpelling`, `WMS.WMSTerms`, `WMS.GenericButtons`, `WMS.TechErrorCodes`, `WMS.ThaiTrailingPeriod`.

- [ ] **Step 1: Write fixtures.** `bad.md` has one line per violation: แอพ, อีเมล์, อัพเดท, ฟังก์ชั่น, ดิจิตอล, ล็อกอิน, เอาของไปวาง, ของหาย, ชุดบิล, ล็อกเก็บของ, a line ending `ทำรายการสำเร็จแล้ว.`, `Error 500`, a button list item `ตกลง`. `good.md` uses all Do terms, plus a fenced code block containing `แอพ` and inline `` `อีเมล์` `` (must stay silent).
- [ ] **Step 2: Write failing test** `tests/vale.test.mjs`: runs `vale --output=JSON --config=.vale.ini tests/fixtures/<f>.md` via `execFileSync` (catch non-zero exit, parse stdout).
  - `bad.md`: set of `Check` values equals the 5 rule IDs; `WMS.ThaiSpelling` count = 5; `WMS.WMSTerms` count = 5.
  - `good.md`: zero alerts.
  - every alert from `WMS.*` has a non-empty `Link`.
- [ ] **Step 3: Run** `node --test tests/vale.test.mjs` → FAIL
- [ ] **Step 4: Write `.vale.ini`:** `StylesPath = styles`, `MinAlertLevel = suggestion`, `Vocab = WMS`, `[*.md] BasedOnStyles = WMS`, plus `[docs/foundation/{Glossary,GrammarAndSpelling}.md] BasedOnStyles =` (empty = exempt). Also `[tests/fixtures/*.md] BasedOnStyles = WMS` so fixtures lint even though `lint:vale` targets `docs` only.
- [ ] **Step 5: Write rules.** All `extends: substitution` except `TechErrorCodes`/`ThaiTrailingPeriod` (`extends: existence`, `raw` regex). Every rule: `nonword: true`, `ignorecase: false` for Thai, `link:` to Task 2 anchor, `level: error` except `GenericButtons` = `warning`. `ThaiSpelling` keys must be ordered/anchored so `อีเมล` alone does not match (key `อีเมล์`; `อัพเดท|อัพเดต` → `อัปเดต`). `ThaiTrailingPeriod` regex: `[฀-๿]\.$`.
- [ ] **Step 6: Run** `node --test tests/` → PASS; `npm run lint:vale` → 0 errors on `docs/`.
- [ ] **Step 7: Commit** `feat(vale): add Thai/English terminology rules with fixtures`

### Task 4: markdownlint and lychee config

**Files:**
- Create: `.markdownlint-cli2.jsonc`, `lychee.toml`

- [ ] **Step 1: markdownlint config:** extend default; `MD013: false` (Thai has no spaces, line length meaningless); `MD033: false`; `MD024: { siblings_only: true }`; ignore `node_modules`, `docs/superpowers/**`.
- [ ] **Step 2: Verify** `npm run lint:md` → 0 errors.
- [ ] **Step 3: lychee config:** `include_fragments = true`, `exclude = ["^https://figma.com", "^https://github.com/org/"]`, `exclude_path = ["node_modules"]`.
- [ ] **Step 4: Negative check (Review Focus 4):** temporarily add a row to `discovery.md` linking `foundation/Missing.md`; run `docker run --rm -v "$PWD":/w -w /w lycheeverse/lychee --offline --config lychee.toml docs/` (or `brew install lychee`) → expect 1 error. Revert row; rerun → 0 errors.
- [ ] **Step 5: Commit** `chore: add markdownlint and lychee config`

### Task 5: CODEOWNERS and CI workflow

**Files:**
- Create: `.github/CODEOWNERS`, `.github/workflows/docs-and-ui-ci.yml`

**Interfaces:**
- Consumes: npm scripts from Task 1, `.vale.ini`, `lychee.toml`.

- [ ] **Step 1: CODEOWNERS** with the Global Constraints mapping; last rule `/.github/CODEOWNERS @org/design-system-core`. Default `*` → `@org/design-system-core`.
- [ ] **Step 2: Workflow** on `pull_request` and `push` to `main`. Jobs (all `ubuntu-latest`, `actions/checkout@v4`, `actions/setup-node@v4` node 20, `npm ci`):
  - `vale`: `errata-ai/vale-action@reviewdog` with `files: docs`, `fail_on_error: true`, then `npm test` (needs vale binary: install via the action's output or `vale` release tarball).
  - `markdown`: `npm run lint:md`.
  - `links`: `lycheeverse/lychee-action@v2` with `args: --offline --config lychee.toml docs`, `fail: true`.
- [ ] **Step 3: Verify syntax** `npx --yes @action-validator/cli .github/workflows/docs-and-ui-ci.yml` → valid.
- [ ] **Step 4: Commit** `ci: add docs CI gate and CODEOWNERS`
- [ ] **Step 5: Push and open PR** (only after user approval) → all 3 jobs green.

### Task 6: Claude deny rules and Stop hook

**Files:**
- Create: `.claude/settings.json`

- [ ] **Step 1: Write settings:** `permissions.deny`: `Read(./.env)`, `Read(./.env.*)`, `Read(./**/secrets/**)`. `hooks.Stop`: one command hook `npm run lint --silent || (echo "lint failed" >&2; exit 2)`. Keep to this one hook (spec: minimum rules).
- [ ] **Step 2: Verify** — in a new Claude session in this repo, ask to read `.env` (create a dummy) → denied. Break a Thai word in a doc, end a turn → Stop hook blocks with the Vale output. Revert.
- [ ] **Step 3: Commit** `chore(claude): add deny rules and lint stop hook`

---

## Out of scope (next plans)

- Phase 2: DTCG tokens, Style Dictionary dual output, Storybook a11y/vitest.
- Phase 3: Figma sync / Code Connect, `.claude/skills/*` (4 skills with 3–5 examples), changesets, docs portal + CMS.
- Component docs (`docs/components/**`) and workflow docs (`docs/workflows/**`).
