# Color

**Status:** `Trial`

## Overview

Semantic colour tokens for every WMS surface. Values come from DESIGN.md. Source: [tokens/semantic/color.tokens.json](../../tokens/semantic/color.tokens.json). Light theme only in this phase.

## Semantic tokens

| Token | Value | Use |
| :--- | :--- | :--- |
| `--color-background` | `#f6f7f9` | Page background behind cards. |
| `--color-foreground` | `#161a23` | Default text on background and card. |
| `--color-card` | `#ffffff` | Card, table and panel surface. |
| `--color-card-foreground` | `#161a23` | Text on card. |
| `--color-popover` | `#ffffff` | Menus and popovers. |
| `--color-popover-foreground` | `#161a23` | Text in menus and popovers. |
| `--color-primary` | `#4a3fd6` | The one main action per view, links, selected state. Tenant brand colour overrides this only. |
| `--color-primary-hover` | `#3b31b8` | Hover and pressed state of primary. |
| `--color-primary-foreground` | `#ffffff` | Text and icons on primary. |
| `--color-secondary` | `#eef0f4` | Neutral button fill. Never a coloured fill. |
| `--color-secondary-foreground` | `#161a23` | Text on secondary. |
| `--color-muted` | `#eef0f4` | Subtle surface: table header, skeleton. |
| `--color-muted-foreground` | `#596072` | Secondary text and meta lines. Not for disabled. |
| `--color-accent` | `#eeedfc` | Hover and selected row or nav item background. |
| `--color-accent-foreground` | `#2f2894` | Text on accent. |
| `--color-destructive` | `#c4281c` | Destructive actions only (delete, cancel order). Same variant in trigger and confirm dialog. |
| `--color-destructive-foreground` | `#ffffff` | Text on destructive. |
| `--color-border` | `#e1e4ea` | Decorative dividers and card edges only (below 3:1). Not for control borders. |
| `--color-input` | `#8c93a3` | Control borders: inputs, checkboxes, selects (3:1 on card). |
| `--color-ring` | `#4a3fd6` | Focus ring, 2px, never removed. |
| `--color-disabled-foreground` | `#9aa0ae` | Disabled text. Exempt from contrast; never use for readable content. |
| `--color-success` | `#13794a` | Success tone fill. Always pair with icon and label. |
| `--color-success-foreground` | `#ffffff` | Text on success. |
| `--color-success-soft` | `#e5f5ec` | Success pill and banner background. |
| `--color-success-soft-foreground` | `#106a40` | Text on success-soft. |
| `--color-warning` | `#f2a516` | Fill only, under dark text. Never text or thin icons on white (2.07:1). |
| `--color-warning-foreground` | `#2b1d00` | Text on warning fill. |
| `--color-warning-strong` | `#b86e00` | Amber icons, dots and borders on white (3.99:1). Not for body text. |
| `--color-warning-soft` | `#fef3dc` | Warning pill and banner background. |
| `--color-warning-soft-foreground` | `#8a5000` | Text on warning-soft. |
| `--color-danger-soft` | `#fdecea` | Danger pill and banner background. |
| `--color-danger-soft-foreground` | `#b0261b` | Text on danger-soft. |
| `--color-info` | `#1f66c1` | Info tone fill. |
| `--color-info-foreground` | `#ffffff` | Text on info. |
| `--color-info-soft` | `#e7f0fb` | Info pill and banner background. |
| `--color-info-soft-foreground` | `#195aab` | Text on info-soft. |
| `--color-neutral` | `#5f6678` | Neutral status tone fill. |
| `--color-neutral-foreground` | `#ffffff` | Text on neutral. |
| `--color-neutral-soft` | `#edeff3` | Neutral pill background. |
| `--color-neutral-soft-foreground` | `#4a5163` | Text on neutral-soft. |
| `--color-scan-accept` | `#13794a` | Full-screen scan accepted. Pair with icon, headline and sound. |
| `--color-scan-reject` | `#c4281c` | Full-screen scan rejected. Pair with icon, headline and sound. |
| `--color-scan-blocked` | `#f2a516` | Full-screen scan blocked. Dark text only. |
| `--color-scan-blocked-foreground` | `#2b1d00` | Text on scan-blocked. |
| `--color-scan-notice` | `#fef3dc` | Inline non-blocking scan notice under the scan field. |
| `--color-scan-notice-foreground` | `#8a5000` | Text on scan-notice. |
| `--color-scan-notice-border` | `#b86e00` | Border of scan-notice. |
| `--color-feedback-focus-outline` | `#ffffff` | Focus outline on full-screen tone surfaces. |
| `--color-pda-bar` | `#1b2030` | PDA top bar. |
| `--color-pda-bar-foreground` | `#ffffff` | Text on pda-bar. |
| `--color-chart-1` | `#4a3fd6` | Chart series 1. |
| `--color-chart-2` | `#1f66c1` | Chart series 2. |
| `--color-chart-3` | `#0e8a86` | Chart series 3. |
| `--color-chart-4` | `#b86e00` | Chart series 4. |
| `--color-chart-5` | `#8a4fbf` | Chart series 5. |

## Usage Guidelines

### Do

- Use the semantic variable (`var(--color-primary)`), never a primitive (`--color-indigo-600`) or a hex value.
- Show every status with icon, label and tone together.
- Use `--color-warning` only as a fill under `--color-warning-foreground`.

### Don't

- Use `--color-border` for control borders. It is below 3:1; use `--color-input`.
- Colour a destructive action with `--color-primary`.
- Add a new hue in a component. Add it to the tokens and run `npm run tokens:build`.
