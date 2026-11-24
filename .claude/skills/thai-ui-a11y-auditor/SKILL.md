---
name: thai-ui-a11y-auditor
description: Audit Zimple WMS UI for Thai text rendering and accessibility - Thai word breaking, line-height and clipped vowels or tone marks, letter-spacing, lang attribute, calendar in date formatters, font stack, contrast, ARIA, keyboard and PDA target size. Use when the user asks to audit, check or fix Thai text, Thai typography, a11y, WCAG, contrast or keyboard access on a component, story, CSS file, HTML page or impeccable output, or before a UI change is handed off.
when_to_use: A component, story, CSS or HTML file changed; impeccable produced a screen; a screenshot shows cut-off Thai marks or odd line breaks; a PR touches src/, .storybook/ or artifact/.
argument-hint: "[path to file or folder, or a story id]"
allowed-tools: Read, Grep, Glob, Bash(node scripts/thai-a11y-check.mjs*), Bash(npm run test:ui*), Bash(npm test*)
---

# Thai UI and accessibility audit - Zimple WMS

Audit: $ARGUMENTS

Reply in Thai. Keep CSS properties, token names, code and file paths in English.

## What this skill covers and what it does not

- Covers the rules that axe and the token tests cannot see: how Thai text breaks, wraps, stacks and is announced, plus the WMS-specific a11y floors.
- Does not redo what other gates already prove. Report their result, do not re-derive it:
  - Contrast of token pairs: `npm test` (`tests/tokens-rules.test.mjs`).
  - axe WCAG 2.2 on every story: `npm run test:ui` (`a11y: { test: 'error' }`).
  - Copy wording (glossary, spelling, button verbs): the `ux-writing-review` skill.
- Never state a ratio, size or pass that you did not get from a command or a measurement. Write "not verified" instead.

## Steps

1. **Run the static checker** on the target:

   ```bash
   node scripts/thai-a11y-check.mjs <path>
   ```

   With no path it checks `src`, `.storybook` and `artifact/tokens/template.html`. Each line is `file:line rule: problem. Fix: ...`. Exit 1 means findings.

2. **Run the existing gates** when the target has stories or tokens: `npm test` and `npm run test:ui`. Quote the summary line (for example `Tests 10 passed (10)`).

3. **Read the code** for the checks below that no script covers. Cite `file:line` for every finding.

4. **Render and look** when a story or page exists: open it at 360px (PDA) and 1366px (office). Look at the longest Thai string. Check that marks above and below the line are not cut, that no word splits mid-syllable, and that nothing scrolls sideways. A gate that passes is not proof the pixels are right.

5. **Report** in the format at the end.

## Checklist

### Thai word breaking

| Check | Pass | Fail |
| :--- | :--- | :--- |
| Wrapping | `word-break: normal` with `overflow-wrap: break-word` | `word-break: break-all` (checker: `word-break-all`) |
| Long codes and URLs | `overflow-wrap: anywhere` on that element only | `break-all` on the whole container |
| Counting or cutting words in JS | `new Intl.Segmenter('th', { granularity: 'word' })` | `.split(' ')`, `.length` on a Thai string for word count, `substring` that can cut a vowel from its consonant |
| Truncation | `text-overflow: ellipsis` on a single line, or `-webkit-line-clamp` with block padding | Fixed `height` + `overflow: hidden` on multi-line Thai |

### Line height and clipping

| Check | Pass | Fail |
| :--- | :--- | :--- |
| Thai line-height | 1.45 or more; UI text uses `font: var(--typography-*)` | Unitless value below 1.45 (checker: `line-height-floor`) |
| Long text (help, docs, empty-state body) | `--typography-prose` (1.8) | Body token for paragraphs of Thai |
| Text inside `overflow: hidden` | Block padding of `var(--inset-glyph)` on the text element | Text box exactly one line-height tall |
| Mono codes (A-03-12) | `--typography-code` and Latin characters only | Thai words inside a mono token (its line-height is below 1.45) |

### Type and language

| Check | Pass | Fail |
| :--- | :--- | :--- |
| `lang` | `<html lang="th">`, `lang="en"` on English parts | Missing `lang` (checker: `html-lang`) |
| Letter-spacing | None on Thai text | Any non-zero value (checker: `letter-spacing`) |
| Case | Sentence case in the source string | `text-transform: uppercase` (checker: `text-transform-upper`) |
| Font | `var(--font-family-sans)` / typography tokens; fonts loaded from `src/foundations/fonts.css` | A hard-coded family, or relying on a font installed on the device |
| Dates | `'th-TH-u-ca-gregory'`, `DD/MM/YYYY` | `'th'` or `'th-TH'` with no calendar (checker: `calendar-not-pinned`) |
| Numbers in tables | `font-variant-numeric: tabular-nums`, right-aligned | Proportional digits in a numeric column |

### Accessibility floors for WMS

| Check | Pass | Fail |
| :--- | :--- | :--- |
| Target size | Office 24px, station 48px, PDA 56px, PDA primary 64px (`--target-*`) | Smaller control on that register |
| Focus | 2px `--color-ring`, never removed | `outline: none` with no replacement |
| Status | Icon + label + tone | Colour alone |
| Loading | Full strength, `aria-busy="true"`, clicks ignored | Disabled dimming used for loading |
| Icon-only control | `aria-label` in Thai | No accessible name |
| Keyboard | `Tab` reaches it, `Enter`/`Space` operates it | Click handler on a `div` |
| Motion | `prefers-reduced-motion` stops spinners and flashes | Animation with no reduced-motion rule |

## Examples

### Example 1 - break-all in a table cell

Input:

```css
.order-cell { word-break: break-all; }
```

Output:

```text
| # | Severity | File | Finding | Fix |
| 1 | Major | src/order/OrderTable.css:12 | word-break-all: `break-all` ตัดคำไทยกลางพยางค์ เช่น "ช่องเก็บสิน|ค้า" | เปลี่ยนเป็น `word-break: normal; overflow-wrap: break-word;` ถ้ามีเลขเอกสารยาวให้ใส่ `overflow-wrap: anywhere` เฉพาะ cell นั้น |
```

### Example 2 - clipped tone marks in a two-line button

Input: screenshot of a PDA button whose label "บันทึกตำแหน่งจัดเก็บเข้าพื้นที่สำรอง" wraps to two lines, and the top of ้ and ี on line 1 is cut off. CSS: `.btn { height: 52px; overflow: hidden; line-height: 1.3; }`

Output:

```text
| # | Severity | File | Finding | Fix |
| 1 | Critical | src/pda/Button.css:4 | line-height-floor: 1.3 ต่ำกว่า 1.45 สระบนและวรรณยุกต์โดนตัด | ใช้ `font: var(--typography-pda-button)` |
| 2 | Major | src/pda/Button.css:3 | `height` ตายตัวคู่กับ `overflow: hidden` ข้อความสองบรรทัดไม่มีที่พอ | เปลี่ยนเป็น `min-block-size: var(--target-pda-primary)` และใส่ `padding-block: var(--inset-glyph)` ที่ label |
Render check: ดูที่ 360px แล้ว บรรทัดแรกยังโดนตัดก่อนแก้ ยังไม่ได้ดูหลังแก้ (not verified)
```

### Example 3 - date formatter

Input:

```ts
const label = new Date(order.createdAt).toLocaleDateString('th-TH');
```

Output:

```text
| # | Severity | File | Finding | Fix |
| 1 | Major | src/order/format.ts:8 | calendar-not-pinned: บางเครื่องแสดงปี พ.ศ. บางเครื่องแสดง ค.ศ. | `toLocaleDateString('th-TH-u-ca-gregory', { day: '2-digit', month: '2-digit', year: 'numeric' })` ให้ได้ DD/MM/YYYY |
```

### Example 4 - clean component

Input: `src/components/ScannerButton/`

Output:

```text
node scripts/thai-a11y-check.mjs src/components/ScannerButton -> Thai UI check: no findings
npm run test:ui -> Tests 10 passed (10), axe ไม่พบปัญหา
Render check: 360px ป้ายยาวขึ้นสองบรรทัด สระและวรรณยุกต์ครบ ไม่มี scroll แนวนอน
ไม่พบปัญหา ข้อจำกัด: เทสต์ตรวจ padding ของ label แต่ไม่ได้วัดขอบตัวอักษรจริง ถ้าเปลี่ยนฟอนต์ให้ดูด้วยตาอีกครั้ง
```

## Output format

1. One line: what was audited and which commands ran.
2. Findings table, most severe first:

   | # | Severity | File | Finding | Fix |
   | :--- | :--- | :--- | :--- | :--- |

   Severity: **Critical** (text unreadable or control unusable), **Major** (wrong on a real device or for a screen reader), **Minor** (inconsistent, low impact).

3. What was not verified (no story, no render, no device).
4. Next agent: `ux-writer` for wording problems, `accessibility-tester` for a full WCAG pass.

No emoji. Use plain words such as "ผ่าน" and "ไม่ผ่าน".
