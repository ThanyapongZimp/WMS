# Product

## Register

product

## Users

- **Office users** (admins, warehouse supervisors, CS, accounting) on Windows PCs with Chrome/Edge at 1366×768 to 1920×1080. They set up the warehouse, watch queues and answer "where is this order?" during a shift.
- **Floor staff** on rugged Android PDAs and on full-screen stations bound to scanners, printers, scales and cameras. They scan, get a clear yes or no and move on.
- The pilot is the company's own warehouse (Business edition, a single owner). 3PL owners' staff on the Client Portal arrive in Phase 2.

## Product Purpose

Zimple WMS (Business edition) / Zimple Fulfillment (3PL edition) is a multi-tenant warehouse management SaaS for Thai e-commerce fulfillment: about 30,000 orders a day per warehouse, with 11.11-style peaks. It replaces JST. Success in Phase 1 means the pilot warehouse switches JST off completely. The headline promise is that the product is more modern, more attractive and simpler to use than JST, and that it covers the gaps JST leaves (a pre-handover sort status, holding cancelled orders for return).

## Brand Personality

Calm, clear, operational. "Modern" means quiet and unambiguous, not decorative. The voice is short, imperative everyday Thai: what happened, then what to do next. No exclamation marks, no blame, no jargon where a Thai glossary term exists.

## Anti-references

- JST: "ใช้ยากมาก" (very hard to use), forced-update loops, data that cannot be exported.
- The old Zimple prototype: navy-and-blue palette, 10–11px type, mixed brand names, mixed ค.ศ./พ.ศ., design notes inside UI copy, inconsistent status colours and the lightning-bolt urgent marker, unprioritised 13-column tables, PDA buttons under 56px, desktop chrome around PDA screens.
- A theme tool with ~60 knobs. Tenants change only the logo and the primary colour.
- Generic SaaS dashboard decoration: gradients, glass, hero metrics.

## Design Principles

1. **Nothing on screen that is not the work.** Every element serves the task in front of the user, and explanations live in docs, not in the UI.
2. **One meaning, one look.** There are five status tones on every surface, and each status is shown with an icon, a label and a tone.
3. **The next action is obvious.** Every message says what happened and what to do next. Blocked items are reachable within 2 clicks.
4. **Never trap the user or the data.** Work is never lost to a timeout, an update or a closed drawer, every list exports, and every PDA task has a web fallback.
5. **Built for a full shift.** The design favours dense but airy layouts, large unambiguous status and fast keyboard and scanner paths over novelty.

## Accessibility & Inclusion

- WCAG 2.2 AA on office web, stations and PDA. Contrast pairs are computed in DESIGN.md.
- Nothing is conveyed by colour alone. Status uses icon + label + tone. Scan feedback uses colour + icon + headline + sound (+ vibration).
- Keyboard-first on office and station, with a skip link and a visible 2px focus ring that is never removed.
- Targets: office ≥24px, station ≥48px, PDA ≥56px (primary 64px).
- Text: office body ≥14px, PDA ≥16px. Office content reflows at 200% zoom.
- `prefers-reduced-motion` replaces flashes with a static tint. Nothing flashes more than 3 times per second.
- Thai first with an English switch, and `lang` set accordingly. Thai line-height is never below 1.45.
