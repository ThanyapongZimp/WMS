# Design tokens and components: design

- **Date:** 2026-11-23
- **Status:** draft, waiting for approval
- **Source spec:** `_bmad-output/planning-artifacts/ux-designs/ux-WMS-2026-11-19/DESIGN.md` (final) and `EXPERIENCE.md`

## Intent

DESIGN.md already fixes the visual system for Zimple WMS / Zimple Fulfillment as prose and YAML frontmatter. Nobody can use it directly yet. Two groups need it:

- **Developers** build the product UI in React + shadcn/ui and need tokens as code plus ready components.
- **Designers** need to see every token and component in one place and adjust them. They use a published Artifact (a claude.ai page), not Figma.

The goal is one source of truth that feeds both, so code and the Artifact never drift (PRODUCT.md principle 2, "One meaning, one look").

## Goals

1. Turn the DESIGN.md frontmatter into DTCG token files in the repo.
2. Build CSS variables and a Tailwind `@theme` from them, mapped onto the shadcn variable names DESIGN.md lists.
3. Publish a component Artifact built from the same generated CSS: token swatches, type scale, and every component in all its states, with a register switch (office / station / PDA) and a tenant-colour preview.
4. Build the shared components in React + shadcn in `design-system/` (Vite + React + Tailwind v4 + shadcn + Storybook), then mirror them in the Artifact.
5. Fill the gaps `reconcile-zimple-screens.md` found: inline Alert (info / warning), detail-page KV block + timeline, required-field marker.

## Non-goals

- Dark mode. DESIGN.md is light only in Phase 1.
- Client Portal components. Client Portal is Phase 2.
- Re-deriving style from the old prototype in `artifact/Zimple Fulfillment Screens (Copy)/`. Its palette and radii are retired. Only its behaviour ideas count, and those are already reconciled.
- Full product screens. This work delivers the parts, not the pages.

## Anti-goals (failure even if it works)

- The Artifact and code show different values for the same token.
- Any component uses a raw hex or px value.
- A tenant theme exposes more than logo + primary colour.
- Status shown by colour alone (must be icon + label + tone).
- Emoji anywhere.

## Constraints

- Values come from DESIGN.md frontmatter. Changing a value means changing DESIGN.md first.
- WCAG 2.2 AA. The contrast pairs DESIGN.md computes must still pass after the build, measured by a gate, not asserted.
- Targets: office 24px or more, station 48px or more, PDA 56px or more (primary 64px).
- Thai type rules from `CLAUDE.md`: IBM Plex Sans Thai stack, Thai line-height 1.45 or more, `word-break: normal` + `overflow-wrap: break-word`.
- Icons: Lucide, stroke 2 (DESIGN.md).
- Every interactive component ships the 8 states (default, hover, focus, active, disabled, loading, error, selected where they apply).

## Approaches

| | Approach | Trade-off | Decision |
|---|---|---|---|
| A | Tokens in the repo are the source. Build to CSS/Tailwind for code; designers see and adjust through an Artifact fed by the same build | Code and Artifact stay identical and CI can gate it. Designer edits flow back through DESIGN.md | **Picked** by the user, 2026-11-23 (Artifact instead of Figma, also the user's call) |
| B | Figma is the source, export to code | Designers start fast, but redoes a final spec and is hard to gate in CI | Rejected |
| C | Separate sets for code and Figma | Drift is certain; breaks "one meaning, one look" | Rejected |

## Design

### Token layers

```
tokens/
  primitive/color.json     raw palette (from the hex values in DESIGN.md)
  primitive/type.json      families, sizes, weights, line-heights
  primitive/space.json     4px scale + radius + shadow
  semantic/color.json      background, foreground, primary, success-soft, scan-*, pda-bar ...
  semantic/type.json       h1, body, label, pda-body, pda-location ...
  component/*.json         button, badge, scan-feedback, table, sheet ...
  mode/office.json         register deltas (density, sizes)
  mode/station.json
  mode/pda.json
```

- Format: DTCG (`$type` / `$value`). Semantic tokens reference primitives; components reference semantics only.
- Names follow DESIGN.md frontmatter keys so the mapping table in DESIGN.md Components stays valid.

### Build outputs

- `build/css/tokens.css`: `:root` CSS variables with the shadcn names (`--background`, `--primary`, ...) plus the extended set (`--success-soft`, `--scan-accept`, `--pda-bar`, ...). Register modes with `[data-register="station"]` and `[data-register="pda"]`.
- `build/tailwind/theme.css`: Tailwind v4 `@theme` so utilities such as `bg-success-soft` exist.
- Tool: Style Dictionary.

### Components, in order

1. **Shared, wave 1:** StatusBadge (5 tones, icon + label), Button (brand layer + sizes per register), Alert (info / warning, new), KV block + Timeline (new), required-field marker on FormField, Table row states, Sheet 560px with sticky footer.
2. **Station + PDA, wave 2:** ScanField, ScanFeedback (accept / reject / blocked / notice, full-screen), PDA top bar, PDA tile, PDA location display.
3. **Office, wave 3:** remaining items in DESIGN.md "Office web" table (hub KPI row, queue card, pipeline, header approval count, warehouse switcher).

Each component: React + shadcn + `cva` in code with Storybook stories for every state, then a section in the Artifact rendering the same variants from the same CSS.

### Verification

- Token gate: values in `tokens/` equal DESIGN.md frontmatter (script diff).
- Contrast gate on the built CSS for every pair DESIGN.md lists.
- Per component: render harness, state check (8 states), target size, keyboard, no hardcoded values, no emoji.
- Artifact: its embedded CSS is the built `tokens.css`, byte for byte (CI check).
- `impeccable` reviews the visual result per wave. Code is written directly, not generated by impeccable (user decision, 2026-11-23).

## User decisions, 2026-11-23

- Code lives in `design-system/` in this repo: Vite + React + Tailwind v4 + shadcn + Storybook.
- Designers work in an Artifact, not Figma. No Figma Variables, no Code Connect.
- Tenant primary colour: when it has under 4.5:1 contrast on white, the system darkens it in OKLCH until it passes and tells the tenant it was adjusted. Hover, ring, accent and sidebar-accent derive from the adjusted colour at runtime. The gate tests the default plus a sample range of tenant hues.
- Components are hand-written; `impeccable` reviews visuals only.

## Calls made during review (proposals, open to correction)

- **Source of truth:** DESIGN.md frontmatter stays the single source. A generator script turns it into `tokens/*.json` (DTCG). Nobody hand-edits the JSON, so no diff gate is needed; CI checks that the generated files are up to date.
- **Registers:** keep the DESIGN.md per-register token names (`pda-body`, `control-station` ...) as semantic tokens. Modes appear only at the component layer (for example `button.height` resolves to office / station / PDA values), in CSS via `[data-register]` and as a register switch in the Artifact.
- **New components (Alert, KV block, Timeline, required marker):** wave 1 starts by adding their tokens and specs to DESIGN.md, which the user approves before code.
- **States:** the 8 states apply to interactive parts. Display parts (StatusBadge, KV, Timeline, location display) need default plus long-text, empty and overflow cases. ScanFeedback needs its focus state.
- **Cadence:** per wave, code first, then the Artifact mirrors it.
- **Designer edits in the Artifact:** the page saves designers' changes as new versions. Claude reads those versions, writes the changed values back into DESIGN.md, regenerates tokens and republishes. A designer edit never lands in code without passing the contrast gate.

## Left to the builder

- Exact folder for component code (package inside this repo or a separate app repo).
- Style Dictionary config details and naming transforms.
- Artifact layout and navigation within the rules above.
