# Scanner Button

**Status:** `Trial` | **Links:** Figma: not linked yet | Storybook: `Mobile scanner/ScannerButton` (`npm run storybook`) | [Source code](../../../src/components/ScannerButton/ScannerButton.tsx)

## Overview

A large, high-contrast button for floor staff on PDAs and stations, often wearing gloves in low light. Use it for the one main action on a scan screen and for exception actions such as reporting a short pick.

## Anatomy

1. **Container:** full-width, at least 64px tall (`size="scanner"`) or 56px (`size="lg"`).
2. **Label:** the verb and its result, 18px, line height 1.45, with block padding so Thai marks are not clipped.
3. **Spinner (loading only):** decorative, hidden from screen readers.

## Properties (Props / API)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Intent. `danger` for destructive and exception actions |
| `size` | `'lg' \| 'scanner'` | `'scanner'` | `scanner` = `--target-pda-primary` (64px), `lg` = `--target-pda` (56px) |
| `isLoading` | `boolean` | `false` | In-flight action: full strength, `aria-busy="true"`, clicks ignored |
| `isDisabled` | `boolean` | `false` | Sets `disabled` and `aria-disabled="true"` |

## Variants & States

- **Primary:** `--component-scanner-button-bg` on `--component-scanner-button-fg`.
- **Secondary:** neutral fill with a 3:1 border (`--color-input`). Never a coloured fill.
- **Danger:** `--color-destructive`. Use the same variant in the confirm step.
- **Hover / Active:** darker fill (`-bg-hover`).
- **Focus:** 2px ring in `--color-ring` with 2px offset, never removed.
- **Disabled:** `--state-disabled-opacity`, `not-allowed` cursor.
- **Loading:** spinner and busy state at full strength. Loading is not disabled.

## UX Writing & Microcopy

- **Length:** 2 to 5 Thai words. Long labels wrap to two lines.
- **Format:** `[verb] + [object]`, for example ยืนยันการหยิบ, แจ้งสินค้าขาด.
- **Punctuation:** no full stop. English uses sentence case.
- **Avoid:** ตกลง, ใช่ or any label that does not name the result.

## Accessibility (a11y)

- **Keyboard:** reachable with `Tab`, activated with `Enter` or `Space` (native button).
- **ARIA:** `aria-busy` while loading, `aria-disabled` with `disabled`. Icon-only use needs `aria-label`.
- **Contrast and target:** text at least 4.5:1, focus ring 3:1, height at least 56px on PDA. Storybook fails on any axe violation (`a11y: { test: 'error' }`).

## Usage Guidelines

### Do

- Put one primary ScannerButton per scan screen, at the bottom within thumb reach.

### Don't

- Use it on office web pages. Use the office button instead.
- Shrink it to fit two buttons side by side on a 360px PDA.

## Example Usage

```tsx
import { ScannerButton } from '@/components/ScannerButton/ScannerButton';

export default function Example() {
  return (
    <ScannerButton size="scanner" variant="primary">
      ยืนยันการหยิบสินค้า
    </ScannerButton>
  );
}
```
