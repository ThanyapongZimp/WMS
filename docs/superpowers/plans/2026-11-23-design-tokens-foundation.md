# Design Tokens Foundation (extend phase 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the gaps between the merged phase 2 token system and the spec: DESIGN.md parity, missing tokens, register modes, tenant primary colour, and a token Artifact for designers.

**Architecture:** Build on what phase 2 merged (`tokens/` DTCG three tiers, `sd.config.mjs`, `build/css/variables.css`, `build/agent/tokens.json`, `scripts/contrast.mjs`, root Storybook, `node --test` in `tests/`). Add a parity test against DESIGN.md frontmatter, the missing tokens, a register CSS file, a runtime tenant-colour module, and a static Artifact page that embeds the built CSS.

**Tech Stack:** Node, Style Dictionary 5, `yaml`, `culori`, `node --test`, Storybook 10, React 19.

**Spec:** `docs/superpowers/specs/2026-11-23-design-tokens-components-design.md`

## Global Constraints

- `tokens/` stays the editable source for code (CLAUDE.md, merged phase 2). DESIGN.md frontmatter is the reference values; a test keeps the two equal.
- Never hand-edit `build/`. Run `npm run tokens:build` and commit the result. `npm run tokens:check` must pass.
- Light only. No hex or raw px in component code.
- WCAG 2.2 AA: text 4.5:1, UI 3:1.
- Targets: office 24px, station 48px, PDA 56px (primary 64px).
- Tenant primary under 4.5:1 on white: darken in OKLCH until it passes and tell the tenant.
- No emoji. Run `npm run lint` and `npm test` before each commit.

## Review Focus

1. A very light tenant colour (`#FFFF00`, `#FAFAFF`) must still reach 4.5:1 and keep its hue.
2. An invalid tenant colour (`abc`, empty) falls back to the default primary without throwing.
3. A DESIGN.md colour or spacing key with no matching token fails the parity test.
4. The Artifact page embeds the current `build/css/variables.css`; a stale copy fails `npm test`.
5. Switching register on `<html>` changes control height without touching component CSS.

---

### Task 1: DESIGN.md parity test + missing tokens

**Files:**
- Create: `tests/design-parity.test.mjs`, `tests/fixtures/design-token-map.json`
- Modify: `tokens/semantic/color.tokens.json` (add `sidebar`, `sidebar-foreground`, `sidebar-muted-foreground`, `sidebar-accent`, `sidebar-accent-foreground`, `sidebar-border`, `support-banner`, `support-banner-foreground`, `chart-1`..`chart-5`)
- Create: `tokens/semantic/layout.tokens.json` (`page-x-desktop` 24px, `page-y-desktop` 20px, `page-x-pda` 12px, `sidebar-width` 240px, `sidebar-rail` 64px, `sheet-width` 560px, `control-desktop` 36px, `control-station` 48px, `table-row` 44px, `table-row-dense` 36px, `scan-field-station` 64px, `scan-field-pda` 56px)
- Regenerate: `build/`

**Interfaces:**
- `design-token-map.json` maps each DESIGN.md frontmatter key to a token path, for example `{"colors.primary": "color.primary", "spacing.sheet-width": "layout.sheet-width"}`. Keys with no token are listed under `"unmapped"` with a reason.
- Produces CSS vars `--color-sidebar*`, `--color-support-banner*`, `--color-chart-1..5`, `--layout-*`.

- [ ] **Step 1:** Write `design parity` tests: every `colors.*` and `spacing.*` key in DESIGN.md frontmatter is either mapped or listed as unmapped; every mapped token's resolved value from `build/agent/tokens.json` equals the frontmatter value (case-insensitive hex, px string).
- [ ] **Step 2:** Run `node --test tests/design-parity.test.mjs`. Expected: FAIL listing sidebar, support-banner, chart and layout keys.
- [ ] **Step 3:** Add the tokens (semantic colours alias existing primitives; add primitives only for chart hues `#0E8A86`, `#8A4FBF`, `#1F66C1` if absent). Every token gets a `usageRule` description like its neighbours.
- [ ] **Step 4:** Run `npm run tokens:build && npm test && npm run tokens:check`. Expected: PASS.
- [ ] **Step 5:** Commit `feat(tokens): add sidebar, chart, layout tokens and DESIGN.md parity test`.

### Task 2: Register modes

**Files:**
- Create: `src/foundations/registers.css`
- Modify: `.storybook/preview.ts` (import it; toolbar global `register`: office / station / pda sets `data-register` on `document.documentElement`)
- Test: `tests/registers.test.mjs`

**Interfaces:**
- `registers.css` defines `:root { --control-height: var(--layout-control-desktop); --target-min: var(--target-office); }`, `[data-register="station"] { --control-height: var(--layout-control-station); --target-min: var(--target-station); }`, `[data-register="pda"] { --control-height: var(--target-pda); --target-min: var(--target-pda); }`. Only `var()` references, no raw values.

- [ ] **Step 1:** Test: file contains the three selectors, every value is a `var(--...)` that exists in `build/css/variables.css`.
- [ ] **Step 2:** Run, expect FAIL (file missing).
- [ ] **Step 3:** Write the file and the Storybook toolbar.
- [ ] **Step 4:** Run `npm test`, expect PASS. Run `npm run storybook`, switch register in the browser pane, confirm a control's computed height changes 36 / 48 / 56.
- [ ] **Step 5:** Commit `feat(tokens): add office, station and PDA register modes`.

### Task 3: Tenant primary adjuster

**Files:**
- Create: `src/theme/tenant-primary.mjs` (+ `.d.ts`)
- Test: `tests/tenant-primary.test.mjs`

**Interfaces:**
- `deriveTenantPrimary(input: string) -> { primary, primaryHover, primaryActive, ring, accent, accentForeground, adjusted: boolean }` (hex strings).
- `applyTenantPrimary(el: HTMLElement, input: string) -> boolean` sets `--color-primary`, `--color-primary-hover`, `--color-primary-active`, `--color-ring`, `--color-accent`, `--color-accent-foreground`, `--color-sidebar-accent`, `--color-sidebar-accent-foreground`, `--color-chart-1`; returns `adjusted`.
- Rules: lower OKLCH L by 0.01 until `contrastRatio(primary, '#FFFFFF') >= 4.5` (reuse `scripts/contrast.mjs`); clamp chroma to sRGB. Hover L-0.08, active L-0.14, accent L 0.95 C 0.03, accentForeground L 0.35. Default and invalid input return the existing `#4A3FD6` family unchanged, `adjusted: false`.

- [ ] **Step 1:** Tests: default unchanged; `#FFFF00` adjusted and passes 4.5; `#FAFAFF` passes and hue within 5 degrees; `abc` and `''` fall back; 12 hues at `oklch(0.8 0.15 h)` all pass; `accentForeground` on `accent` passes 4.5.
- [ ] **Step 2:** Run, expect FAIL.
- [ ] **Step 3:** Implement with `culori`.
- [ ] **Step 4:** Run `npm test`, expect PASS.
- [ ] **Step 5:** Commit `feat(theme): derive tenant primary with contrast floor`.

### Task 4: Token Artifact for designers

**Files:**
- Create: `artifact/tokens/template.html`, `scripts/build-artifact.mjs`
- Create (generated): `artifact/tokens/index.html`
- Modify: `package.json` (script `artifact:build`), `docs/discovery.md` (row: Token artifact, Trial)
- Test: `tests/artifact.test.mjs`

**Interfaces:**
- Consumes: `build/css/variables.css`, `build/agent/tokens.json` (for names, values, `usageRule`), `src/foundations/registers.css`, `src/theme/tenant-primary.mjs` (inlined).
- Page: swatches grouped core / status / scan / PDA / sidebar / chart with name, value, usage rule and contrast against its pair; type ramp with Thai sample; spacing, radius, targets; register switch; tenant colour input showing result and the notice when adjusted. Copy goes through the `ux-writer` agent.
- Built CSS sits between `/* tokens:start */` and `/* tokens:end */`.

- [ ] **Step 1:** Tests: embedded CSS equals `build/css/variables.css`; every colour token in `tokens.json` appears in the page; no emoji.
- [ ] **Step 2:** Run, expect FAIL.
- [ ] **Step 3:** Implement template and build script.
- [ ] **Step 4:** Run `npm run artifact:build && npm test`, expect PASS. Open in the browser pane at 360px and 1366px: no horizontal overflow; register switch and tenant input work.
- [ ] **Step 5:** Run `accessibility-tester` agent; fix findings. Run `npm run lint`.
- [ ] **Step 6:** Commit `feat: token artifact for designers`.
- [ ] **Step 7:** Publish `artifact/tokens/index.html` as an Artifact; give the user the link.
