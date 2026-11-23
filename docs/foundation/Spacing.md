# Spacing, Radius and Targets

**Status:** `Trial`

## Overview

A 4px spacing scale, a small radius set and the minimum touch targets per register. Source: [tokens/semantic/target.tokens.json](../../tokens/semantic/target.tokens.json) and [tokens/primitive/dimension.tokens.json](../../tokens/primitive/dimension.tokens.json).

## Semantic tokens

| Token | Value | Use |
| :--- | :--- | :--- |
| `--radius-control` | `8px` | Buttons and inputs. |
| `--radius-card` | `12px` | Cards and sheets. |
| `--target-office` | `24px` | Minimum target on office web (WCAG 2.5.8). |
| `--target-station` | `48px` | Minimum target on stations. |
| `--target-pda` | `56px` | Minimum target on PDA. |
| `--target-pda-primary` | `64px` | Primary action on PDA. |
| `--inset-control` | `16px` | Horizontal padding inside buttons. |
| `--inset-gap` | `8px` | Gap between icon and label. |

## Spacing scale

Primitive `--space-1` to `--space-10` are 4px to 40px in 4px steps. Components use semantic aliases; add one when a component needs a new spacing role.

## Usage Guidelines

### Do

- Size every PDA control from `--target-pda` (56px) and the primary PDA action from `--target-pda-primary` (64px).

### Don't

- Shrink a station or PDA control below its target to fit a layout.
