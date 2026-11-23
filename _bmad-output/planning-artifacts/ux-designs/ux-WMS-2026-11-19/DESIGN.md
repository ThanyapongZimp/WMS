---
name: Zimple WMS / Zimple Fulfillment
description: Visual system for Zimple's multi-tenant warehouse management SaaS (Business edition "Zimple WMS", 3PL edition "Zimple Fulfillment"). shadcn/ui (Radix + Tailwind); this file sets the brand layer, the extended semantic tokens, and the floor-device deltas.
status: final
created: 2026-11-19
updated: 2026-11-19
sources:
  - ../../prds/prd-WMS-2026-11-19/prd.md
  - ../../prds/prd-WMS-2026-11-19/addendum.md
  - ../../briefs/brief-WMS-2026-11-19/brief.md
  - ../../research/competitive-jst-erp-2026-11-19/research.md
  - ./.working/extract-product.md
  - ./.working/extract-zimple-screens.md
  - ./.memlog.md
colors:
  # shadcn core variables (light only in Phase 1). Ratios in the Colors section.
  background: '#F6F7F9'
  foreground: '#161A23'
  card: '#FFFFFF'
  card-foreground: '#161A23'
  popover: '#FFFFFF'
  popover-foreground: '#161A23'
  primary: '#4A3FD6'
  primary-hover: '#3B31B8'
  primary-foreground: '#FFFFFF'
  secondary: '#EEF0F4'
  secondary-foreground: '#161A23'
  muted: '#EEF0F4'
  muted-foreground: '#596072'
  accent: '#EEEDFC'
  accent-foreground: '#2F2894'
  destructive: '#C4281C'
  destructive-foreground: '#FFFFFF'
  border: '#E1E4EA'
  input: '#8C93A3'
  ring: '#4A3FD6'
  disabled-foreground: '#9AA0AE'
  # Extended semantic status tones: one map, fixed across tenants.
  success: '#13794A'
  success-foreground: '#FFFFFF'
  success-soft: '#E5F5EC'
  success-soft-foreground: '#106A40'
  warning: '#F2A516'
  warning-foreground: '#2B1D00'
  warning-strong: '#B86E00'
  warning-soft: '#FEF3DC'
  warning-soft-foreground: '#8A5000'
  danger-soft: '#FDECEA'
  danger-soft-foreground: '#B0261B'
  info: '#1F66C1'
  info-foreground: '#FFFFFF'
  info-soft: '#E7F0FB'
  info-soft-foreground: '#195AAB'
  neutral: '#5F6678'
  neutral-foreground: '#FFFFFF'
  neutral-soft: '#EDEFF3'
  neutral-soft-foreground: '#4A5163'
  # Full-screen scan feedback (station + PDA)
  scan-accept: '#13794A'
  scan-reject: '#C4281C'
  scan-blocked: '#F2A516'
  scan-blocked-foreground: '#2B1D00'
  # Inline (non-blocking) scan notice under the scan field
  scan-notice: '#FEF3DC'
  scan-notice-foreground: '#8A5000'
  scan-notice-border: '#B86E00'
  # Focus indicator on full-screen tone surfaces (white outline + ring)
  feedback-focus-outline: '#FFFFFF'
  # Chrome
  sidebar: '#FFFFFF'
  sidebar-foreground: '#161A23'
  sidebar-muted-foreground: '#596072'
  sidebar-accent: '#EEEDFC'
  sidebar-accent-foreground: '#2F2894'
  sidebar-border: '#E1E4EA'
  pda-bar: '#1B2030'
  pda-bar-foreground: '#FFFFFF'
  support-banner: '#FEF3DC'
  support-banner-foreground: '#8A5000'
  # Charts (overview pipeline, reports). All ≥3:1 on card.
  chart-1: '#4A3FD6'
  chart-2: '#1F66C1'
  chart-3: '#0E8A86'
  chart-4: '#B86E00'
  chart-5: '#8A4FBF'
typography:
  # One family everywhere. Thai needs taller line-height than Latin defaults.
  display-kpi:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
  h1:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.35'
  h2:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.45'
  h3:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.5'
  body:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  body-strong:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.6'
  label:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.45'
  caption:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
  code:
    fontFamily: 'IBM Plex Mono'
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  pda-body:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.55'
  pda-caption:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  pda-title:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  pda-button:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.3'
  pda-location:
    fontFamily: 'IBM Plex Mono'
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.15'
  scan-input:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  station-next:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.35'
  station-counter:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  feedback-headline:
    fontFamily: 'IBM Plex Sans Thai'
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  station-code:
    fontFamily: 'IBM Plex Mono'
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.3'
rounded:
  sm: 4px
  md: 6px
  DEFAULT: 8px
  lg: 8px
  xl: 12px
  full: 9999px
spacing:
  # Tailwind 4px scale inherited; named tokens below are the WMS deltas.
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  page-x-desktop: 24px
  page-y-desktop: 20px
  page-x-pda: 12px
  sidebar-width: 240px
  sidebar-rail: 64px
  sheet-width: 560px
  control-desktop: 36px
  control-station: 48px
  table-row: 44px
  table-row-dense: 36px
  scan-field-station: 64px
  scan-field-pda: 56px
  touch-min-pda: 56px
  touch-primary-pda: 64px
components:
  button-primary:
    background: '{colors.primary}'
    foreground: '{colors.primary-foreground}'
    hover: '{colors.primary-hover}'
    radius: '{rounded.md}'
    height: '{spacing.control-desktop}'
  button-destructive:
    background: '{colors.destructive}'
    foreground: '{colors.destructive-foreground}'
    radius: '{rounded.md}'
  status-badge:
    radius: '{rounded.full}'
    typography: '{typography.label}'
    padding: '2px 10px'
  scan-input-station:
    height: '{spacing.scan-field-station}'
    border: '2px solid {colors.primary}'
    radius: '{rounded.xl}'
    typography: '{typography.scan-input}'
  scan-input-pda:
    height: '{spacing.scan-field-pda}'
    border: '2px solid {colors.primary}'
    radius: '{rounded.lg}'
    typography: '{typography.pda-body}'
  next-scan-banner:
    background: '{colors.primary}'
    foreground: '{colors.primary-foreground}'
    radius: '{rounded.xl}'
    typography: '{typography.station-next}'
  feedback-screen-accept:
    background: '{colors.scan-accept}'
    foreground: '#FFFFFF'
    typography: '{typography.feedback-headline}'
  feedback-screen-reject:
    background: '{colors.scan-reject}'
    foreground: '#FFFFFF'
    typography: '{typography.feedback-headline}'
  feedback-screen-blocked:
    background: '{colors.scan-blocked}'
    foreground: '{colors.scan-blocked-foreground}'
    typography: '{typography.feedback-headline}'
  feedback-focus:
    outline: '2px solid {colors.feedback-focus-outline}'
    ring: '0 0 0 6px {colors.ring}'
  scan-notice:
    background: '{colors.scan-notice}'
    foreground: '{colors.scan-notice-foreground}'
    border-left: '4px solid {colors.scan-notice-border}'
    radius: '{rounded.lg}'
    typography: '{typography.body-strong}'
  station-top-bar:
    height: 56px
    background: '{colors.card}'
    border-bottom: '1px solid {colors.border}'
    code: '{typography.station-code}'
  command-chip:
    height: '{spacing.control-station}'
    background: '{colors.card}'
    border: '1px solid {colors.input}'
    radius: '{rounded.md}'
    primary-background: '{colors.primary}'
    primary-foreground: '{colors.primary-foreground}'
  alert-inline:
    radius: '{rounded.lg}'
    typography: '{typography.body}'
  pda-button:
    height: '{spacing.touch-primary-pda}'
    min-height: '{spacing.touch-min-pda}'
    radius: '{rounded.xl}'
    typography: '{typography.pda-button}'
  pda-top-bar:
    background: '{colors.pda-bar}'
    foreground: '{colors.pda-bar-foreground}'
    typography: '{typography.pda-caption}'
  pda-tile:
    background: '{colors.card}'
    radius: '{rounded.xl}'
    min-height: 96px
  sidebar-item-active:
    background: '{colors.sidebar-accent}'
    foreground: '{colors.sidebar-accent-foreground}'
    indicator: '3px inset {colors.primary}'
  data-table:
    header-background: '{colors.muted}'
    row-height: '{spacing.table-row}'
    typography: '{typography.body}'
  kpi-card:
    background: '{colors.card}'
    radius: '{rounded.lg}'
    value: '{typography.display-kpi}'
  support-access-banner:
    background: '{colors.support-banner}'
    foreground: '{colors.support-banner-foreground}'
---

> **Spines win on conflict with any mock.** This file and [EXPERIENCE.md](EXPERIENCE.md) are canonical. The HTML mocks are illustrations of them.
>
> **Visual references.** Four surfaces are mocked: [office overview](mockups/key-office-overview.html) (ภาพรวมคลัง), [PDA pick](mockups/key-pda-pick.html) (UJ-2), [pack station, cancelled-lock](mockups/key-station-pack.html) (UJ-3) and [handover + day close](mockups/key-handover-day-close.html) (UJ-4). Every other surface is spine-only.

## Brand & Style

Zimple is a working tool for people who stand in a warehouse for a full shift, and for the office staff who keep that shift on time. The brand promise against JST is "more modern, more attractive, simpler to use" (brief; NFR-12). In practice that means calm surfaces, one confident brand colour, large unambiguous status, and nothing on screen that is not the work. Modern here means quiet and clear, not decorative.

Three registers share one system (NFR-12: "one design system shared across web, PDA and stations"):

- **Office web** is dense but airy: Windows desktops, tables, hubs, drawers. It inherits shadcn/ui defaults and changes only the brand layer.
- **Stations** (receive, pack PS-NN, returns, handover) are full-screen and scan-driven. The type is larger, there is one dominant scan field, and blocking feedback fills the whole screen.
- **PDA** is scan-first and thumb-sized: dark top bar, big tiles, 56px+ targets, 16px+ text.

Brand naming is fixed. The product mark is **Zimple WMS** (Business edition) or **Zimple Fulfillment** (3PL edition), always with "by Zimple Solution". The tenant logo sits in the sidebar header and on printed documents. A tenant name (such as the sample tenant "Fullfeel") is never a product brand and never replaces the Zimple mark in titles or chrome.

The palette, radius scale and density below are a fresh direction that replaces the old prototype's navy-and-blue look [ASSUMPTION — user delegated; the four key-screen mocks apply it].

## Colors

The direction is **cool neutral canvas + indigo brand + five fixed status tones** [ASSUMPTION]. Indigo reads modern and trustworthy, and its hue is far from every status hue (green, amber, red, grey) and from the info blue, so brand colour can never be mistaken for a status. The old navy `#12305e` and blue `#2e5fac` are retired.

All ratios below are computed WCAG 2.x contrast ratios. Text must reach 4.5:1. UI boundaries and icons must reach 3:1.

**Core (shadcn variables)**

| Token | Hex | Pairing | Ratio | Use |
|---|---|---|---|---|
| `background` | `#F6F7F9` | `foreground` on it | 16.24 | App canvas behind cards. Slightly cool, so long shifts are easier on the eyes than pure white |
| `card` / `popover` | `#FFFFFF` | `foreground` on it | 17.41 | Cards, tables, sheets, dialogs, PDA body |
| `foreground` | `#161A23` | — | — | All primary text |
| `muted-foreground` | `#596072` | on card / bg / muted | 6.29 / 5.86 / 5.51 | Secondary text, table headers, descriptions, icons |
| `primary` | `#4A3FD6` | white text on it; it on card; on bg | 7.06 / 7.06 / 6.59 | Primary buttons, links, document-number links, active tab underline, next-scan banner, scan-field border |
| `primary-hover` | `#3B31B8` | white text | 9.06 | Hover and pressed state of primary |
| `accent` | `#EEEDFC` | `accent-foreground` `#2F2894` on it; `primary` on it | 9.80 / 6.11 | shadcn hover/selected surface: active nav item, selected row, highlighted command item |
| `secondary` / `muted` | `#EEF0F4` | `foreground` / `muted-foreground` | 15.26 / 5.51 | Secondary buttons, table header, filter chips |
| `destructive` | `#C4281C` | white text; on card | 5.73 / 5.73 | Destructive buttons, field error text, reject screen |
| `border` | `#E1E4EA` | decorative | 1.27 | Card edges and dividers only. Never the only boundary of a control |
| `input` | `#8C93A3` | vs card | 3.08 | Input, select, checkbox and command-chip boundaries (meets the WCAG 1.4.11 3:1 rule) |
| `ring` | `#4A3FD6` | vs card / bg | 7.06 / 6.59 | Focus ring, 2px with 2px offset |
| `disabled-foreground` | `#9AA0AE` | on card | 2.62 | Disabled text only (exempt from contrast rules). Never used for content that matters |

**Status tones: one map for every surface.** Status meaning is fixed and tenants can never change it (theme setting from the PRD). Every status renders as **icon + Thai label + tone**, never tone alone.

| Tone | Meaning | Solid (fg on it) | Soft bg / text | Ratios | Icon |
|---|---|---|---|---|---|
| `success` | Done, passed, complete, online, sellable (ครบ · ผ่าน · เสร็จ · พร้อม) | `#13794A` / white | `#E5F5EC` / `#106A40` | 5.44 / 5.89 | check-circle |
| `warning` | Waiting, needs a look, pending approval, held (รอ… · รออนุมัติ · พักไว้) | `#F2A516` / `#2B1D00` | `#FEF3DC` / `#8A5000` | 7.95 / 5.91 | clock / alert-triangle |
| `destructive` (danger) | Urgent, error, rejected, overdue, cancelled-in-flight (ด่วน · ผิดปกติ · เกินกำหนด) | `#C4281C` / white | `#FDECEA` / `#B0261B` | 5.73 / 5.85 | x-octagon |
| `neutral` | Closed, not started, read-only, edition tag (ปิด · ยังไม่เริ่ม · ดูอย่างเดียว) | `#5F6678` / white | `#EDEFF3` / `#4A5163` | 5.74 / 6.89 | circle-slash / lock |
| `info` | In progress, system-generated, add-on tag (กำลังทำ · ระบบ · เสริม) | `#1F66C1` / white | `#E7F0FB` / `#195AAB` | 5.63 / 5.90 | loader / info |

- `warning` amber `#F2A516` reaches only 2.07:1 against white. It may only be a **fill behind dark text**. Amber icons, dots and borders on white use `warning-strong` `#B86E00` (3.99:1).
- "Urgent" is always `destructive` with the **x-octagon** icon, on every surface, whether the label says ด่วน or เร่งด่วน. The old zap / ⚡ marker is retired. "Waiting for approval" is always `warning`. This fixes the old prototype's split semantics.
- Only five tones exist. There are no extra blue, sky or navy variants.

**Scan feedback** has two full-screen tiers and one inline tier. They reuse the status hues.

| Tier | Tokens | Ratio | Where |
|---|---|---|---|
| Reject (full screen) | `scan-reject` `#C4281C` / white | 5.73 | Replaces the view |
| Blocked (full screen) | `scan-blocked` `#F2A516` / `scan-blocked-foreground` `#2B1D00` | 7.95 | Replaces the view |
| Notice (inline, non-blocking) | `scan-notice` `#FEF3DC` / `scan-notice-foreground` `#8A5000`, with a 4px `scan-notice-border` `#B86E00` left bar | 5.91 text; 3.62 bar | Box directly under the scan field |

Accept has no screen of its own: the field or row flashes `success-soft` for 300ms. Colour is always paired with an icon, a headline, sound and optional vibration (see EXPERIENCE.md).

**Focus on tone surfaces.** On full-screen reject and blocked, the focused control gets a 2px `feedback-focus-outline` (white) outline plus a 6px `ring` (`{components.feedback-focus}`). On red, the white outline carries the contrast (5.73). On amber, the indigo ring does (3.42).

**Chrome.** The sidebar is white (`sidebar`). The active item uses `sidebar-accent` / `sidebar-accent-foreground` (9.80) plus a 3px `primary` inset bar. The PDA top bar uses `pda-bar` `#1B2030` with white. The station top bar is `card` with a 1px `border` bottom line. The support-access banner uses `support-banner` / `support-banner-foreground` (5.91).

**Charts.** `chart-1`…`chart-5` (indigo, blue, teal `#0E8A86`, amber-strong, violet `#8A4FBF`) all reach ≥3:1 on card (7.06 / 5.63 / 4.20 / 3.99 / 5.31). Charts always carry direct labels or a legend with values. The overview pipeline uses chart tones in stage order, not status tones, so that "stage" is not confused with "status".

**Tenant primary override.** A tenant may replace `primary` (and with it `ring`, `primary-hover`, `accent`) and the logo, and nothing else. On save, a contrast guard checks two things: white on the candidate must be ≥4.5:1, and the candidate on `background` must be ≥3:1. If either check fails, the system keeps the default `#4A3FD6` and tells the admin why. The guard also refuses a candidate whose hue sits within ±20° of the `success`, `destructive` or `warning-strong` hue, so that brand cannot imitate status [ASSUMPTION: ±20° threshold]. Status, scan-feedback, destructive and chart tokens are never tenant-editable.

**Avoid:** gradients on surfaces, a second brand colour, colouring whole table rows by status, and any status shown without its icon and label.

## Typography

**IBM Plex Sans Thai** (400/500/600/700) is the one UI family. It pairs a clean Thai design with matching Latin and has good digits. **IBM Plex Mono** (500/700) is used only for codes that people read aloud or match by eye: location codes, document numbers, station codes, lots and serials. It makes `0/O` and `1/l` easy to tell apart [ASSUMPTION: second family; drop it if tabular numerals in Plex Sans Thai prove enough].

The old 10–11px text is banned. Size floors by register:

| Register | Body | Smallest allowed | Notes |
|---|---|---|---|
| Office web | `{typography.body}` 14px | `{typography.caption}` 12px, only for timestamps and meta lines, never for actionable text | Tables use `body` 14px. Pills use `label` 13px |
| Station | `{typography.body}` with key values in `h2`/`station-next` | 14px | Scan field `{typography.scan-input}` 24px. Counters `{typography.station-counter}` 48px. Station code `{typography.station-code}` 18px mono. Feedback headline `{typography.feedback-headline}` 32px [ASSUMPTION: may be too small at viewing distance on 1920px stations; validate in pilot] |
| PDA | `{typography.pda-body}` 16px | `{typography.pda-caption}` 14px, **in the PDA top bar only**. Every other PDA text is ≥16px | Current location `{typography.pda-location}` 36px mono. Buttons `{typography.pda-button}` 18px |

Rules:

- Thai line-height never drops below 1.45. Stacked vowels and tone marks clip below that.
- No letter-spacing on Thai text, and no all-caps (English nav-group labels are sentence case too).
- Use weight 600 for emphasis and 700 only for KPI values, counters, station codes and feedback headlines. The old UI's "everything semibold" made hierarchy flat.
- Numbers in tables and counters use tabular figures (`font-variant-numeric: tabular-nums`) and are right-aligned.
- The user setting "large text" (from company settings) scales the whole ramp by 1.125. The PDA ignores it because it is already large.

## Layout & Spacing

The Tailwind 4px scale is inherited. Density defaults are [ASSUMPTION], to be tuned with pilot users:

| Register | Page padding | Control height | Table row | Gap rhythm |
|---|---|---|---|---|
| Office web | `{spacing.page-x-desktop}` × `{spacing.page-y-desktop}` | `{spacing.control-desktop}` 36px | `{spacing.table-row}` 44px (dense option `{spacing.table-row-dense}` 36px, per user) | 8 within a group, 16 between groups, 24 between sections |
| Station | 24px | `{spacing.control-station}` 48px | 52px | 16 / 24 |
| PDA | `{spacing.page-x-pda}` 12px | `{spacing.touch-min-pda}` 56px minimum; primary `{spacing.touch-primary-pda}` 64px | Task cards ≥ 72px | 8 / 12; at least 8px between adjacent targets |

**Office shell.** A 240px sidebar (`{spacing.sidebar-width}`) collapses to a 64px icon rail (`{spacing.sidebar-rail}`). Above the content is a 56px header with the warehouse switcher, global search, approvals, notifications and user menu. The content starts with an H1, a one-line muted scope subtitle and an L2 module tab strip. It is fluid to 1920px with no max-width, because tables need room. The reference viewports are 1366×768 (the floor minimum for office PCs) and 1920×1080.

**Hubs** (ภาพรวม…) use a 12-column grid: a KPI row of up to 5 cards, then a "needs action" list, then queue cards. At 1366px the KPI row drops to 3 per row. The warehouse overview adds a pipeline bar and an urgent-orders table ([mock](mockups/key-office-overview.html)).

**Stations** are full-screen under a 56px station top bar. A 3-zone layout runs left to right: job context (job header, timer, requirement tiles, per-job checks) 30%, the scan column (step strip, next-scan banner, scan field, scan notice, scanned-vs-expected table, command chips) 45%, and evidence (camera preview, weight, print status) 25%. Under 1366px the evidence column stacks under the job context ([mock](mockups/key-station-pack.html)).

**PDA** is a single column: top bar, sticky scan field, then content. The primary action is pinned to the bottom within thumb reach. There is never a horizontal scroll ([mock](mockups/key-pda-pick.html)).

**Sheet** (create/edit drawer) is 560px wide (`{spacing.sheet-width}`), with forms in 2 columns. Below 1280px wide it becomes a single column.

## Elevation & Depth

The system is flat by default, and hierarchy comes from layout and borders. Cards have a 1px `border` and no shadow on `background`. Only overlays lift:

- Popover, DropdownMenu, Tooltip: shadcn `shadow-md`.
- Sheet and Dialog: shadcn `shadow-lg` plus a scrim of `#161A23` at 40%.
- Toast: `shadow-lg`.
- Sticky table header and sticky first column: a 1px `border` line, no shadow.
- Full-screen feedback screens have no elevation. They replace the view and do not float over it.
- The inline scan notice and inline Alert sit in the flow with no shadow.

## Shapes

The radius scale is [ASSUMPTION]:

- `{rounded.sm}` 4px: checkboxes and tags inside tables.
- `{rounded.md}` 6px: buttons, inputs and selects on desktop; station command chips.
- `{rounded.lg}` 8px: cards, sheets, dialogs, KPI cards, inline Alerts and the scan notice.
- `{rounded.xl}` 12px: station scan fields, the next-scan banner, PDA buttons and PDA tiles.
- `{rounded.full}`: status badges, count chips and avatars only.

The logic: the office reads as a crisp tool with small radii, and floor devices get softer, bigger shapes that read as "touch this". Map the shadcn `--radius` variable to `{rounded.lg}` (8px). shadcn derives `sm`/`md` from it, which matches the scale above.

## Components

**shadcn components used as-is**, inheriting the colours above via CSS variables: `Button` (secondary/outline/ghost/link), `Input`, `Textarea`, `Select`, `Combobox` (Command + Popover), `Checkbox`, `RadioGroup`, `Switch`, `Tabs`, `Card`, `Table`, `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `DropdownMenu`, `Tooltip`, `Command`, `Calendar`/`DatePicker`, `Skeleton`, `Separator`, `Avatar`, `Pagination`, `Sonner` (toast), `Sidebar`, `Breadcrumb`, `Alert` (restyled below).

**shadcn CSS-variable mapping** (`:root`, light only; values are in the frontmatter):

| shadcn variable | Token | | shadcn variable | Token |
|---|---|---|---|---|
| `--background` | `{colors.background}` | | `--destructive` | `{colors.destructive}` |
| `--foreground` | `{colors.foreground}` | | `--destructive-foreground` | `{colors.destructive-foreground}` |
| `--card` / `--card-foreground` | `{colors.card}` / `{colors.card-foreground}` | | `--border` | `{colors.border}` |
| `--popover` / `--popover-foreground` | `{colors.popover}` / `{colors.popover-foreground}` | | `--input` | `{colors.input}` |
| `--primary` / `--primary-foreground` | `{colors.primary}` / `{colors.primary-foreground}` | | `--ring` | `{colors.ring}` |
| `--secondary` / `--secondary-foreground` | `{colors.secondary}` / `{colors.secondary-foreground}` | | `--radius` | `{rounded.lg}` |
| `--muted` / `--muted-foreground` | `{colors.muted}` / `{colors.muted-foreground}` | | `--chart-1…5` | `{colors.chart-1}`…`{colors.chart-5}` |
| `--accent` / `--accent-foreground` | `{colors.accent}` / `{colors.accent-foreground}` | | `--sidebar`, `--sidebar-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring` | `{colors.sidebar}`… / `{colors.ring}` |
| **Extended (new)** `--success`, `--success-foreground`, `--success-soft`, `--success-soft-foreground` | `{colors.success}`… | | **Extended (new)** `--warning*`, `--info*`, `--neutral*`, `--danger-soft*`, `--scan-accept`, `--scan-reject`, `--scan-blocked*`, `--scan-notice*`, `--feedback-focus-outline`, `--pda-bar*` | matching `{colors.*}` |

Register the extended variables in the Tailwind theme so that utilities such as `bg-success-soft text-success-soft-foreground` exist. No component uses a raw hex.

**Icons.** Lucide (shadcn default) at stroke 2: 16px inline, 20px nav, 24px PDA, 96px feedback screens. Icons always come with a text label, except well-known icon buttons (close, search, more), which carry an `aria-label` and a tooltip. Urgent is always x-octagon.

The brand-layer and WMS-specific components follow, grouped by where they appear. Behaviour for each is in EXPERIENCE.md Component Patterns.

### Shared (all surfaces)

| Component | Anatomy & visual spec |
|---|---|
| **Button (primary)** | `{components.button-primary}`. 36px desktop, 48px station, 56–64px PDA (`pda-button`). Only one primary button per view region |
| **Button (destructive)** | `{components.button-destructive}`. Always opens an `AlertDialog` that states the consequence |
| **Status badge** | `{components.status-badge}`: soft tone background, tone text, 14px leading icon and Thai label. Tones come only from the status map |
| **Count chip** | `full` radius, `muted` / `foreground`, `label` type, on nav items and tabs. The danger variant (`danger-soft`) is used only for overdue counts |
| **Inline Alert** | `{components.alert-inline}`: shadcn `Alert` in `info` or `warning` soft tone only, with a 16px tone icon (`info` / alert-triangle in `warning-strong`) and one or two sentences of `body`. For real operational consequences only, never design notes |
| **Owner-decision chip** | `warning` soft status badge naming who must decide (for example "รอ Owner Care"), followed by the answer-by date in `caption` and the default action in `body-strong` (for example "ปิดเอง"). Overdue switches the badge to `destructive` soft |
| **Empty state** | Centred in its container: a 48px `muted-foreground` Lucide icon, an `h3` line, one `body` explanatory line and at most one action. No illustrations [ASSUMPTION] |
| **Masked value** | PII shown as `08x-xxx-1234` in `muted-foreground` with a lock icon. With permission, an eye icon button reveals the value |
| **Signature pad** | White canvas with a 1px `input` border, `rounded.lg`, at least 320×160px on tablet and station, with a "ล้าง" (clear) ghost button and the signer name field above |
| **Camera / recording indicator** | Pill over the camera preview: `destructive` dot + "กำลังบันทึก" + elapsed time. If there is no camera, a `warning-soft` pill reads "ไม่มีวิดีโอ" |
| **Print status chip** | Printer icon plus a status badge: ยังไม่พิมพ์ (neutral), พิมพ์แล้ว (success), สำเนา #n (info), เครื่องพิมพ์ออฟไลน์ (destructive) |
| **Support-access banner** | `{components.support-access-banner}`. Full width above the header, 40px, with a lock icon, the ticket code in `code`, the expiry time, and a "ยกเลิกสิทธิ์" link |

### Office web

| Component | Anatomy & visual spec |
|---|---|
| **Sidebar nav** | `{components.sidebar-item-active}`. Items are 40px high, `body` 14/500, `muted-foreground` with a 20px Lucide icon. Group labels use `label` in `muted-foreground`. Tenant logo (max 32px high) is at the top and "by Zimple Solution" in `caption` at the bottom |
| **Module tabs (L2)** | shadcn `Tabs` line variant: active tab in `foreground` with a 2px `primary` underline, inactive in `muted-foreground`, count chip after the label. The first tab is always the ภาพรวม hub |
| **Page header** | `h1`, then a one-line `muted-foreground` scope subtitle, then right-aligned actions (max 1 primary + 2 secondary + overflow menu) |
| **Edition / add-on tag** | A `neutral` soft badge reading "เฉพาะ 3PL" and an `info` soft badge reading "เสริม". They appear only in ตั้งค่า screens, never on operational screens |
| **Data table** | `{components.data-table}`. Sticky header, sticky first column (the document number in `code` and `primary`), right-aligned tabular numbers, a `caption` second line for sub-values. Row hover `muted` at 50%, selected row `accent`. Each table declares column priority P1–P3 so it can drop columns at narrower widths |
| **Filter bar** | Search (flex 1, min 260px), status filter tabs with counts, date preset `ToggleGroup`, then up to 3 selects, with "ล้างตัวกรอง" and Excel export at the far right |
| **Bulk action bar** | Appears at the bottom of the table when rows are checked. `foreground` background with white text and ghost-inverse buttons. Shows the count |
| **KPI card** | `{components.kpi-card}`: `label` title, value in `display-kpi`, delta badge (success/destructive soft) with an arrow icon, and a click target over the whole card |
| **Queue card** (hub) | Card with `h3` title, a `display-kpi` count and up to 3 preview rows. An overdue count uses a `danger-soft` chip |
| **Pipeline bar** | Stacked horizontal bar in `chart-1…5` order, 32px high, `rounded.md`, with labels and counts beneath each segment. Each segment is a link |
| **Sheet** (create/edit) | 560px right sheet: header (`h2` + close), scrollable body, sticky footer with right-aligned Cancel and Primary |
| **Detail page** | Page header with the document number in `code` and a status badge. Body in two columns: a key-value block (`label` `muted-foreground` key over a `body` value, 2-up grid) and a vertical timeline (status icon per event, `body` event line, `caption` actor · device · time). An evidence card holds video, photos, signature and manifest links |
| **Notification & approval panel** | 400px right sheet with tabs "รอดำเนินการ" / "การแจ้งเตือน". A sub-filter `ToggleGroup` reads "ทั้งหมด · รออนุมัติ · เร่งด่วน". A card has a tone tag, `caption` time, `body` detail, an 8px `primary` unread dot, and inline actions: "อนุมัติ" (primary) and "ไม่อนุมัติ" (outline-destructive) for approvals, or one outline deep-action button for tasks. The footer holds "อ่านทั้งหมดแล้ว" and "ดูประวัติ" links |
| **Day-close checklist** | Card with an `h2` title "ปิดวัน {date}" and a `warning` badge "เหลือ n รายการ". Rows are ≥56px: a status icon (success check / `warning-strong` alert), a `body` line with a `caption` sub-line, and a right-aligned `primary` fix link. The footer holds the disabled close button with its reason in `body` beside it ([mock](mockups/key-handover-day-close.html)) |
| **Layout canvas** (added 2026-11-23, FR-125/126) | `background` canvas with a 1 m grid in `border`. Racks are `card` with an `input` border, slots divided by `border`, bound slots in `accent`, unbound pick/storage slots dashed `warning-strong`. Zone areas use `chart-1…5` at 8% fill with a 1px border of the same tone and a `label` name. Aisles are `muted`. Walls/obstacles are `neutral` solid. Pick start/end points are 24px `primary` circles with an icon. Selection is a 2px `ring` with handles. Route preview is a 3px `primary` line with numbered `rounded.full` stop markers. Occupancy (FR-126) uses one sequential scale from `accent` to `primary`, never status tones; status on slots uses the status map with icon |

### Stations

| Component | Anatomy & visual spec |
|---|---|
| **Station top bar** | `{components.station-top-bar}`: 56px, `card` with a bottom `border`. Left: station code in `station-code` (for example PS-04), station type, then user · clock in `muted-foreground`. Right: one status badge per bound device (สแกนเนอร์, ตาชั่ง, เครื่องพิมพ์, กล้อง, แท็บเล็ต) and an F11 key hint |
| **Station job header** | Document number in `code`, a status badge and the job timer, then key-value lines (order, channel, carrier · wave, masked recipient). A cancellation-check chip sits here: `success` soft "ไม่ถูกยกเลิก · ตรวจเมื่อ 11:24:05", turning `destructive` when the order is cancelled |
| **Requirement tile** | `muted` background, `rounded.lg`, `label` caption over an `h2` value (for example box size, weight range, gifts, in-box documents) with a status icon |
| **Per-job checks panel** | Titled "การตรวจของงานนี้". A `muted` card listing which checks are on for this job (scan every piece, gifts, documents, weight tolerance, close rule), each as icon + `body` line |
| **Step strip** | Numbered 28px circles in `neutral-soft` (waiting), `primary` (current), and `success` + check (done), with `label` text, joined by 2px lines |
| **Next-scan banner** | `{components.next-scan-banner}`: "สแกนต่อไป: …" with an icon. It is the largest text on a station after the counter |
| **Scan input (station)** | `{components.scan-input-station}`: 64px, 2px `primary` border, 4px `accent` halo while focused, scan icon left, last-scanned value echoed right in `muted-foreground` |
| **Scan notice** | `{components.scan-notice}`: full width directly under the scan field, alert-triangle or info icon in `scan-notice-border`, one `body-strong` line (fact · action). PDA uses `pda-body` |
| **Scanned-vs-expected row** | Item name, then "2 / 2" in `h2`, then a status badge (ครบ success / ขาด warning / เกิน destructive) |
| **Recent-scans list** | For batch-scan stations (returns, handover, sort). Newest first, 48px rows: time in `caption`, code in `code`, result status badge (for example รับแล้ว success, "รับคืนแล้ว · ไม่เพิ่มยอด" warning, "ไม่ได้บันทึก" destructive). Breakdown counters sit above it as count chips |
| **Box progress strip** | Multi-box packing: one chip per box "กล่อง 1/3" with box status (neutral / primary current / success done) and its weight in `caption` |
| **Command chip row** | `{components.command-chip}`: 48px chips with a Lucide icon, `body-strong` label and an optional F-key `kbd` hint. The main command uses the primary variant. Row title "สแกนแทนการกด" in `label`. Each chip mirrors one barcode on the printed command sheet |
| **Full-screen feedback** | `{components.feedback-screen-accept}` / `-reject` / `-blocked` fill the viewport. A 96px icon (check / x-octagon / pause-octagon) sits over the `feedback-headline`, then one `h2` line saying what to do next, then on reject and blocked a 64px acknowledgement button in white with tone text, labelled "รับทราบ · สแกนต่อ". The focused control uses `{components.feedback-focus}` |
| **Locked: cancelled screen** | A `scan-reject` full screen with no acknowledgement button. Under the headline: order number in `code`, cancel time, a white "พิมพ์ฉลากถูกล็อก" pill with a lock icon, and a scan target "สแกนตำแหน่ง CXL-01" with the CXL code in `code`. The recording pill stays visible ([mock](mockups/key-station-pack.html)) |

### PDA

| Component | Anatomy & visual spec |
|---|---|
| **PDA top bar** | `{components.pda-top-bar}`: 56px. Back chevron (56px target), task name, document code, worker and clock, an offline-queue indicator, and an overflow menu. It is the only PDA element allowed `pda-caption` 14px |
| **Scan input (PDA)** | `{components.scan-input-pda}`: 56px, sticky under the top bar, with a camera-scan icon button (56px) on the right |
| **PDA home tile** | `{components.pda-tile}`: 2-column grid, 32px icon, `pda-body` 600 label and up to two live counts in `pda-body` (for example "รถมาถึง 2 · รอจัดเก็บ 4"). Urgent counts use a `destructive` solid chip with x-octagon |
| **PDA task card** | ≥72px, a code line (`code`), a `pda-body` description, a `pda-body` `muted-foreground` progress line ("จุดที่ 3/12 · 25/71 ชิ้น") and an urgent marker (x-octagon + "ด่วน" label) |
| **Location callout** | `pda-location` 36px mono on `accent`, `rounded.xl`, full width. Shows the location the worker must go to next |
| **Short-pick card** | Inline card in the task body, not a dialog: the found quantity in `station-counter` style, the question "ขาด n ชิ้น หรือ ทำต่อภายหลัง?" in `pda-title`, one `pda-body` line on what happens next, and two 64px buttons ("ขาด n ชิ้น" primary, "ทำต่อภายหลัง" outline) ([mock](mockups/key-pda-pick.html)) |
| **Offline queue strip** | `warning-soft` bar under the PDA top bar: cloud-off icon plus "รอส่ง 2 รายการ" |
| **Login and lock screens** | Tenant logo, `pda-title` prompt, a full-width scan target, and login errors as an inline Alert (an unknown badge uses full-screen reject, FR-21). The lock screen shows the signed-in name and a 56px outline "ไม่ใช่ {ชื่อ}? ออกจากระบบ" button |

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use one status map (success / warning / destructive / neutral / info) on every surface and module | Invent per-module colours, or use the same word in two tones (ด่วน red vs เร่งด่วน amber) |
| Mark urgent with x-octagon + "ด่วน" in `destructive` everywhere | Use zap / ⚡ or any second urgent icon |
| Pair every status with icon + label, and every scan result with colour + icon + sound (+ vibration) | Convey anything by colour alone |
| Use the inline scan notice for non-blocking events; keep full screen for reject and blocked | Fill the screen for a duplicate or an already-printed skip |
| Keep desktop body ≥14px, PDA text ≥16px (14px only in the PDA top bar), the station scan field 24px | Use 10–11px text anywhere, or 12px for actionable text |
| Make PDA targets ≥56px, primary ≥64px, with ≥8px gaps | Ship the old 44px PDA buttons |
| Use the Zimple product mark plus the tenant logo slot; "by Zimple Solution" stays | Use a tenant name (such as Fullfeel) as the product brand, or mix brand names across pages |
| Let tenants change logo + primary only, behind the contrast guard | Recreate the ~60-knob theme tool; let tenants recolour status, scan or destructive tokens |
| Use an inline Alert for real operational context, and keep design notes in the spec docs | Put design-annotation prose into production UI copy |
| Give every table a column priority, a sticky first column and an empty state | Show 13-column nowrap tables that rely on horizontal scroll alone |
| Map every colour to a shadcn or extended CSS variable | Write raw hex in components, or keep patch-on-patch overrides with `!important` |
| Show one calendar era per screen, following the user setting | Mix ค.ศ. and พ.ศ. on the same screen |
| Use amber `#F2A516` only as a fill under dark text | Put amber text or thin amber icons on white (2.07:1) |
| Light theme only in Phase 1 | Ship a half-done dark mode or high-contrast theme (both Later) |
