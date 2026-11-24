# Typography

**Status:** `Trial`

## Overview

One family, IBM Plex Sans Thai, with IBM Plex Mono for codes. Each style is a CSS `font` shorthand: `font: var(--typography-body)`. Source: [tokens/semantic/typography.tokens.json](../../tokens/semantic/typography.tokens.json).

## Styles

| Token | Size | Weight | Line height | Use |
| :--- | :--- | :--- | :--- | :--- |
| `--typography-display-kpi` | 28px | 700 | 1.45 | KPI values on dashboards. |
| `--typography-h1` | 24px | 600 | 1.45 | Page title, once per page. |
| `--typography-h2` | 18px | 600 | 1.45 | Section title. |
| `--typography-h3` | 16px | 600 | 1.5 | Subsection and card title. |
| `--typography-body` | 14px | 400 | 1.6 | Office body text and table cells. |
| `--typography-body-strong` | 14px | 600 | 1.6 | Emphasis inside body. |
| `--typography-label` | 13px | 500 | 1.45 | Form labels and pills. |
| `--typography-caption` | 12px | 400 | 1.5 | Timestamps and meta only. Never actionable text. |
| `--typography-code` | 14px | 500 | 1.5 | Location codes, document numbers, lots. |
| `--typography-prose` | 16px | 400 | 1.8 | Long-form Thai text: help, docs, empty-state body. |
| `--typography-pda-body` | 16px | 400 | 1.55 | PDA body text. Every PDA text is 16px or larger except the top bar. |
| `--typography-pda-caption` | 14px | 500 | 1.5 | PDA top bar only. |
| `--typography-pda-title` | 20px | 600 | 1.45 | PDA screen title. |
| `--typography-pda-button` | 18px | 600 | 1.45 | PDA button label. |
| `--typography-pda-location` | 36px | 700 | 1.15 | Current location code on PDA. |
| `--typography-scan-input` | 24px | 600 | 1.45 | Station scan field. |
| `--typography-station-next` | 22px | 600 | 1.45 | Station next-step value. |
| `--typography-station-counter` | 48px | 700 | 1.45 | Station counters. |
| `--typography-feedback-headline` | 32px | 700 | 1.45 | Full-screen scan feedback headline. |
| `--typography-station-code` | 18px | 700 | 1.3 | Station code. |

## Thai text rules

- Line height never below 1.45 for Thai text. Stacked vowels and tone marks clip below that. A test enforces it.
- Long-form text (help, docs, empty-state body) uses `--typography-prose` with line height 1.8.
- Wrap with `word-break: normal` and `overflow-wrap: break-word`. Never `word-break: break-all`.
- Count or cut Thai words in JavaScript with `Intl.Segmenter('th', { granularity: 'word' })`.
- No letter-spacing and no all caps on Thai text.
- Numbers in tables and counters use `font-variant-numeric: tabular-nums`.

## Usage Guidelines

### Do

- Keep PDA text at 16px or larger, except the PDA top bar.

### Don't

- Set `font-size` or `line-height` by hand in a component.
