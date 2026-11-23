# WMS Design System — Phase 2 (DTCG Tokens, Style Dictionary, Storybook a11y) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the WMS DESIGN.md palette and type ramp into W3C DTCG token files, build them with Style Dictionary into `build/css/variables.css` and `build/agent/tokens.json`, and gate a first Storybook with `@storybook/addon-a11y` (`test: 'error'`) and `@storybook/addon-vitest`.

**Architecture:** `tokens/{primitive,semantic,component}/*.tokens.json` are the only source of values. One Style Dictionary config (`sd.config.mjs`) emits two targets: CSS custom properties with `outputReferences: true`, and an agent JSON that carries name, CSS variable, resolved value, `aliasOf` and `usageRule` (from `$description`). Node tests guard the token rules (alias tiers, contrast, Thai line-height floor, PDA target size). Storybook renders a token foundation page and one reference component (`ScannerButton`) to prove the CSS is consumable and accessible.

**Tech Stack:** Style Dictionary 5.x (5.8.0 current; spec floor 5.7.1), Node 22, `node --test`, Storybook 10.x with `@storybook/react-vite`, `@storybook/addon-a11y`, `@storybook/addon-vitest`, Vitest browser mode (Playwright Chromium), React 19, TypeScript.

**Spec:** `/Users/artgraphicdesigner/Downloads/wms_design_system_master_context.md` §4.1, §4.2, §5, §6.1, §8 "ระยะที่ 2". Value source: `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md` (frontmatter `colors`, `typography`; sections Colors, Typography, Layout & Spacing, Shapes). Product rules: `PRODUCT.md` "Accessibility & Inclusion".

**Repo:** `/Users/artgraphicdesigner/Claude/Project WMS/WMS`, new branch `phase2-tokens` cut from `phase1-guardrails`.

## Global Constraints

- DTCG format version `2025.10`: every token has `$type`, `$value`, `$description`. Aliases use `{group.token}` syntax.
- Three tiers: primitive → semantic → component. Semantic tokens alias primitives only; component tokens alias semantic only; no component or semantic token holds a raw value.
- Colour values come from DESIGN.md frontmatter verbatim (e.g. `primary` `#4A3FD6`, `warning` `#F2A516`, `warning-strong` `#B86E00`). No new hues.
- Font stack: `'IBM Plex Sans Thai', 'Sarabun', Tahoma, sans-serif`; mono `'IBM Plex Mono', ui-monospace, monospace`.
- Thai line-height never below `1.45` (DESIGN.md). Body line-height: see Open Question 1.
- Targets: office ≥ 24px, station ≥ 48px, PDA ≥ 56px, PDA primary 64px (PRODUCT.md).
- Contrast: text ≥ 4.5:1, UI ≥ 3:1; `warning` `#F2A516` is fill-only under dark text.
- Phase 2 ships light theme only (DESIGN.md: dark and high-contrast are "Later"). The CSS keeps `outputReferences: true` so a theme file can override semantic tokens later.
- Style Dictionary `>= 5.7.1`. Storybook a11y parameter `a11y: { test: 'error' }` set globally in `.storybook/preview.ts`.
- No emoji in any file. No hardcoded hex or px in components or stories; use `var(--...)` from `build/css/variables.css`.

## Open Questions (answer before Task 2)

1. **Body line-height.** Spec says Thai body `1.8` (range 1.7–2.0). DESIGN.md sets `body` 1.6, `pda-body` 1.55 for dense tables and the PDA. Default in this plan: keep DESIGN.md values for UI registers and add `typography.line-height.prose` = `1.8` for long-form text (docs, help, empty-state body). Change if you want 1.8 everywhere.
2. **Mono font.** DESIGN.md marks IBM Plex Mono as an assumption. Default: keep it.

## Review Focus

1. An alias that points at a missing token (typo in `{color.indigo.600}`) — build must fail, not emit `undefined`. Test in Task 2.
2. A semantic text/surface pair that drops below 4.5:1 after someone edits a primitive — contrast test fails. Task 3.
3. A new typography token with Thai line-height `1.4` — floor test fails. Task 3.
4. Stale build output committed after a token edit — CI `tokens:check` compares a fresh build to the committed `build/`. Task 2.
5. Thai label in `ScannerButton` clipped (tone marks cut off) inside `overflow: hidden` — story play test asserts `scrollHeight <= clientHeight`. Task 5.

---

## File Structure

```text
tokens/
  primitive/color.tokens.json        Task 1  raw hex from DESIGN.md (indigo, neutral, red, green, amber, blue, teal, violet)
  primitive/dimension.tokens.json    Task 1  space 4..40, radius 4..12/9999, size 24/36/44/48/56/64
  primitive/typography.tokens.json   Task 1  families, weights, sizes 12..48, line-heights 1.2..1.8
  semantic/color.tokens.json         Task 1  DESIGN.md names: background, foreground, primary, ... chart-1..5
  semantic/typography.tokens.json    Task 1  composite styles: display-kpi, h1..h3, body, label, caption, code, pda-*
  semantic/target.tokens.json        Task 1  target.office 24, target.station 48, target.pda 56, target.pda-primary 64
  component/scanner-button.tokens.json  Task 1
sd.config.mjs                        Task 2
build/css/variables.css              Task 2 (generated, committed)
build/agent/tokens.json              Task 2 (generated, committed)
scripts/agent-format.mjs             Task 2
tests/tokens-structure.test.mjs      Task 1
tests/tokens-build.test.mjs          Task 2
tests/tokens-rules.test.mjs          Task 3
scripts/contrast.mjs                 Task 3
docs/foundation/Color.md, Typography.md, Spacing.md   Task 4
.storybook/main.ts, preview.ts, vitest.setup.ts       Task 5
vitest.config.ts                     Task 5
src/components/ScannerButton/ScannerButton.tsx, .css, .stories.tsx   Task 5
src/foundations/Tokens.stories.tsx   Task 5
.github/workflows/docs-and-ui-ci.yml Task 6 (modify)
```

---

### Task 1: DTCG token source files

**Files:** Create the `tokens/**` files above. Test: `tests/tokens-structure.test.mjs`.

**Interfaces:**
- Produces: token paths later tasks use — `color.primary`, `color.primary-foreground`, `color.primary-hover`, `color.foreground`, `color.background`, `color.card`, `color.ring`, `color.{success,warning,danger,info,neutral}[-soft][-foreground]`, `color.warning-strong`, `typography.body`, `typography.pda-button`, `typography.line-height.prose`, `target.pda`, `target.pda-primary`, `component.scanner-button.{bg,fg,bg-hover,min-height,radius,font}`.
- Helper used by Tasks 2–3: `loadTokens(): Promise<Record<string, Token>>` in `tests/helpers/tokens.mjs` — flattens all `tokens/**/*.tokens.json` into dot paths, each `{ $type, $value, $description, tier }`.

- [ ] **Step 1: Branch** `git checkout -b phase2-tokens`
- [ ] **Step 2: Write failing test** `tests/tokens-structure.test.mjs`:
  - every token has non-empty `$type`, `$value`, `$description`
  - every `semantic` token `$value` is an alias string matching `/^\{[a-z0-9.-]+\}$/` that resolves to a `primitive` token (composite typography: each field alias resolves to primitive)
  - every `component` token aliases a `semantic` token
  - `color.primary` resolves to `#4A3FD6`, `color.warning` to `#F2A516`, `color.warning-strong` to `#B86E00`, `target.pda` to `56px`, `target.pda-primary` to `64px`
  - root files carry `"$schema": "https://www.designtokens.org/schemas/2025.10/format.json"`
- [ ] **Step 3: Run** `npm test` → FAIL (no tokens dir)
- [ ] **Step 4: Write token files.** Map every DESIGN.md frontmatter colour and the pilot `zwms.css` variables (`_bmad-output/planning-artifacts/pilot/ui/assets/zwms.css`) to a primitive by hue/step, then alias. Typography composite values copied from DESIGN.md frontmatter; `fontFamily` aliases `font.family.sans` = the Global Constraints stack. Every `$description` states usage in one sentence (it becomes `usageRule` for agents), e.g. `warning`: "Fill only, under dark text; never text or thin icons on white (2.07:1)".
- [ ] **Step 5: Run** `npm test` → PASS
- [ ] **Step 6: Commit** `feat(tokens): add DTCG primitive, semantic and component tokens`

### Task 2: Style Dictionary dual output

**Files:** Create `sd.config.mjs`, `scripts/agent-format.mjs`, `build/**`. Modify `package.json`. Test: `tests/tokens-build.test.mjs`.

**Interfaces:**
- Consumes: `tokens/**`, `loadTokens()`.
- Produces: npm scripts `tokens:build` = `node sd.config.mjs`, `tokens:check` = build into a temp dir and `diff -r` against `build/` (exit 1 on drift). CSS variable naming `--{path-with-dashes}` (e.g. `--color-primary`, `--target-pda`). Agent JSON shape:
  ```ts
  type AgentToken = { name: string; cssVar: string; value: string | object; type: string; aliasOf: string | null; usageRule: string; tier: 'primitive'|'semantic'|'component' };
  // build/agent/tokens.json = { version: string; tokens: AgentToken[] }
  ```

- [ ] **Step 1: Write failing test** `tests/tokens-build.test.mjs` (runs `npm run tokens:build` into a temp dir via env `SD_OUT`):
  - CSS contains `--color-primary: var(--color-indigo-600);` style reference (proves `outputReferences: true`) and `:root {`
  - agent JSON entry `color.primary` has `cssVar: '--color-primary'`, `value: '#4A3FD6'` (resolved), non-null `aliasOf`, `usageRule` equal to its `$description`
  - every agent token has a non-empty `usageRule`
  - Review Focus 1: a temp token set with `{color.nope}` makes the build exit non-zero (Style Dictionary `log.errors.brokenReferences: 'throw'`)
- [ ] **Step 2: Run** → FAIL
- [ ] **Step 3: Implement.** `sd.config.mjs` uses `new StyleDictionary({ source: ['tokens/**/*.tokens.json'], usesDtcg: true, log: { errors: { brokenReferences: 'throw' } }, platforms: { css: { transformGroup: 'css', buildPath: out + '/css/', files: [{ destination: 'variables.css', format: 'css/variables', options: { outputReferences: true } }] }, agent: { transformGroup: 'js', buildPath: out + '/agent/', files: [{ destination: 'tokens.json', format: 'wms/agent-json' }] } } })`, `out = process.env.SD_OUT ?? 'build'`. `scripts/agent-format.mjs` registers `wms/agent-json`; `aliasOf` = `token.original.$value` when it is an alias string, else `null`.
- [ ] **Step 4: Run** `npm run tokens:build && npm test` → PASS; `npm run tokens:check` → exit 0
- [ ] **Step 5: Commit** `feat(tokens): build CSS variables and agent tokens with Style Dictionary`

### Task 3: Token rule gates (contrast, Thai line-height, targets)

**Files:** Create `scripts/contrast.mjs`, `tests/tokens-rules.test.mjs`.

**Interfaces:**
- Produces: `contrastRatio(fg: string, bg: string): number` (WCAG 2.2 relative luminance; hex or `rgb()` input) in `scripts/contrast.mjs`.

- [ ] **Step 1: Write failing test** `tests/tokens-rules.test.mjs`:
  - `contrastRatio('#FFFFFF', '#000000')` ≈ 21; `contrastRatio('#F2A516', '#FFFFFF')` ≈ 2.07 (±0.01) — matches DESIGN.md
  - text pairs ≥ 4.5: `foreground/background`, `foreground/card`, `muted-foreground/card`, `primary-foreground/primary`, each `{tone}-soft-foreground/{tone}-soft`, `warning-foreground/warning`, `destructive-foreground/destructive`
  - UI pairs ≥ 3: `warning-strong/card`, `ring/card`, `input/card`, `chart-1..5/card`
  - every typography token whose family is the Thai sans has `lineHeight >= 1.45` (Review Focus 3)
  - `target.pda >= 56`, `target.pda-primary >= 64`, `target.station >= 48`, `target.office >= 24`
  - `component.scanner-button.min-height` resolves to `target.pda-primary`
- [ ] **Step 2: Run** → FAIL (no `contrast.mjs`)
- [ ] **Step 3: Implement `contrastRatio`.** If a token pair fails, fix the primitive only when DESIGN.md already lists the corrected value; otherwise stop and ledger it as a finding for the user.
- [ ] **Step 4: Run** `npm test` → PASS
- [ ] **Step 5: Commit** `test(tokens): gate contrast, Thai line-height and target sizes`

### Task 4: Foundation docs for tokens

**Files:** Create `docs/foundation/Color.md`, `Typography.md`, `Spacing.md`. Modify `docs/discovery.md`, `docs/Guidelines.md`, `CLAUDE.md` (Commands: `npm run tokens:build`, `npm run tokens:check`; rule: "read `build/agent/tokens.json` to pick a token; never invent one").

- [ ] **Step 1: Write docs** using the component template headings from spec §5 where they apply (Overview, Usage Guidelines Do/Don't). Each doc lists semantic tokens with their `usageRule` and links the source JSON. Typography.md restates the Thai rules (line-height floor, `word-break: normal` + `overflow-wrap: break-word`, `Intl.Segmenter`, no letter-spacing on Thai).
- [ ] **Step 2: Add rows** to `discovery.md` (status `Trial`) and reading order to `Guidelines.md`.
- [ ] **Step 3: Verify** `npm run lint && npm test` → 0 issues, all pass. `CLAUDE.md` still ≤ 200 lines (existing test).
- [ ] **Step 4: Commit** `docs: add color, typography and spacing foundations`

### Task 5: Storybook with a11y and vitest gates

**Files:** Create `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/vitest.setup.ts`, `vitest.config.ts`, `tsconfig.json`, `src/foundations/Tokens.stories.tsx`, `src/components/ScannerButton/{ScannerButton.tsx,ScannerButton.css,ScannerButton.stories.tsx}`, `docs/components/mobile-scanner/ScannerButton.md`. Modify `package.json`.

**Interfaces:**
- Consumes: `build/css/variables.css` (imported once in `preview.ts`), component tokens `--component-scanner-button-*`.
- Produces: `ScannerButton` props `{ variant?: 'primary' | 'secondary' | 'danger'; size?: 'lg' | 'scanner'; isLoading?: boolean; isDisabled?: boolean; children: React.ReactNode } & ButtonHTMLAttributes`, `forwardRef<HTMLButtonElement>`. npm scripts `storybook` = `storybook dev -p 6006`, `test:ui` = `vitest run --project=storybook`.

- [ ] **Step 1: Install** `npx storybook@10 init --type react --builder vite --yes`, then `npx storybook add @storybook/addon-a11y` and `npx storybook add @storybook/addon-vitest`. Remove generated example stories.
- [ ] **Step 2: Set** `parameters.a11y = { test: 'error' }` in `.storybook/preview.ts`; import `../build/css/variables.css` and a base CSS with `html { lang }` via decorator setting `document.documentElement.lang = 'th'`, body font `var(--font-family-sans)`, `word-break: normal; overflow-wrap: break-word`.
- [ ] **Step 3: Write failing stories** `ScannerButton.stories.tsx`: `Primary` (label `ยืนยันการหยิบ`), `Danger` (`แจ้งสินค้าขาด`), `Disabled`, `Loading`, `LongThaiLabel` (`บันทึกตำแหน่งจัดเก็บเข้าพื้นที่สำรอง`). Play functions assert:
  - `getBoundingClientRect().height >= 64` for `size="scanner"` and width ≥ 56
  - Loading sets `aria-busy="true"` and keeps full opacity (not the disabled dimming)
  - Disabled sets `aria-disabled="true"` and `disabled`
  - `LongThaiLabel`: label element `scrollHeight <= clientHeight` (Review Focus 5) and no horizontal overflow at 360px viewport (`parameters.viewport`)
  - keyboard: `userEvent.tab()` focuses the button; `{Enter}` calls `onClick` once
- [ ] **Step 4: Run** `npm run test:ui` → FAIL (component missing)
- [ ] **Step 5: Implement `ScannerButton`** with CSS that uses only `var(--component-scanner-button-*)` and semantic vars; focus ring 2px `var(--color-ring)`; Thai `line-height` from `typography.pda-button`.
- [ ] **Step 6: Run** `npm run test:ui` → PASS with zero a11y violations. Then temporarily set the label colour to `var(--color-warning)` on white → expect a11y FAIL (proves `test: 'error'` blocks); revert.
- [ ] **Step 7: Tokens.stories.tsx** renders swatches and type specimens from `build/agent/tokens.json` (name, value, usageRule); passes a11y.
- [ ] **Step 8: Write** `docs/components/mobile-scanner/ScannerButton.md` with the spec §5 template; add discovery row (`Trial`).
- [ ] **Step 9: Run** `npm run lint && npm test && npm run test:ui` → all pass
- [ ] **Step 10: Commit** `feat(ui): add Storybook with a11y error gate and ScannerButton`

### Task 6: CI for tokens and Storybook

**Files:** Modify `.github/workflows/docs-and-ui-ci.yml`.

- [ ] **Step 1: Add job `tokens`**: checkout, node 22, `npm ci`, `npm run tokens:check`, `npm test`.
- [ ] **Step 2: Add job `storybook`**: checkout, node 22, `npm ci`, `npx playwright install --with-deps chromium`, `npm run test:ui`.
- [ ] **Step 3: Verify** `npx --yes @action-validator/cli .github/workflows/docs-and-ui-ci.yml` → valid. Locally: edit one primitive without rebuilding, `npm run tokens:check` → exit 1 (Review Focus 4); revert.
- [ ] **Step 4: Commit** `ci: gate token drift and Storybook a11y`

---

## Out of scope

- Dark and high-contrast themes (DESIGN.md: Later). Token structure allows a `tokens/themes/dark.tokens.json` override later.
- Figma Tokens Studio / Variables sync, Code Connect, Figma MCP (Phase 3).
- Visual regression testing (spec §6.1 mentions it; add after more components exist).
- Components other than `ScannerButton`.
