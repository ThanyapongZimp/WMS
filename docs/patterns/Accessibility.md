# Accessible Copy

**Status:** `Trial`

The UX writer owns the text screen readers announce (VoiceOver, TalkBack, JAWS, NVDA) as well as visible text. Every component spec lists this text under an Accessibility (a11y) heading.

## Rules

| Element | Write | Avoid |
| :--- | :--- | :--- |
| Informative image | `alt` up to 125 characters that says what the image means in context | Starting with รูปภาพของ or "Image of"; age, gender or ethnicity unless it matters |
| Decorative or empty-state image | `alt=""`, plus `accessibilityRole="presentation"` where the platform supports it | Leaving `alt` out, so the reader announces the file name |
| Icon-only control | `aria-label` that names the purpose: ค้นหาออเดอร์, พิมพ์ใบปะหน้า | Describing the icon (แว่นขยาย); the word ปุ่ม or "button", which the reader already announces |
| Icon next to text | `aria-hidden="true"` on the icon | Announcing the same meaning twice |
| Status shown by colour | A word or icon as well: `สินค้าขาด` badge, not a red dot alone | Colour as the only signal |

## Plain language

Write at a lower-secondary reading level (WCAG 2.2 SC 3.1.5). When content must be complex, add a short plain summary next to it.

## Checks

- Text contrast at least 4.5:1, UI parts at least 3:1.
- Vale rule `WMS.MissingAltText` flags Markdown images with empty alt text in docs.
