# WMS — project rules for Claude

Zimple WMS / Zimple Fulfillment: warehouse management SaaS for Thai e-commerce.
Product context lives in `PRODUCT.md`. Planning artifacts (BMAD) live in `_bmad-output/`.

## Where to look first

@docs/discovery.md

Find every path through `docs/discovery.md`. Do not guess paths and do not scan the whole repo.
Read only the files the current task needs. Reading order: `docs/Guidelines.md`.

## How to work

1. Explore, then plan, then implement, then verify. Propose the plan and wait for approval before writing files.
2. Before finishing, review the result against the persona limits, the Thai copy rules and the semantic tokens.
3. When a batch touches many files, track progress in a JSON file (`"passes": false` per item), not a Markdown checklist.

## UI rules the code cannot tell you

- Use semantic tokens only. No hex colours, no raw px values in components.
- Pick tokens from `build/agent/tokens.json` by `usageRule`. Never invent a token; add it under `tokens/` and run `npm run tokens:build`.
- Thai line-height never below 1.45 (UI registers per `docs/foundation/Typography.md`); long-form text uses `--typography-prose` (1.8). Leave enough vertical padding so marks are not clipped.
- Thai wrapping: `word-break: normal` with `overflow-wrap: break-word`. Never `word-break: break-all`.
- Font stack: `'IBM Plex Sans Thai', 'Sarabun', Tahoma, sans-serif`.
- Dates: Gregorian (ค.ศ.), `DD/MM/YYYY`. Pin the calendar with `-u-ca-gregory` in every date formatter.
- Count or cut Thai words with `Intl.Segmenter('th', { granularity: 'word' })`.
- PDA / handheld touch targets: at least 56px (PRODUCT.md is stricter than the 48px design-system floor).
- No emoji anywhere: UI, docs, commits. Use icons or plain words.

## Copy rules (full rules in docs/foundation/)

- Buttons start with a verb that names the result, for example "ยืนยันการหยิบ". Never "ตกลง" or "ใช่".
- Errors: what happened, then what to do. Two sentences at most. No technical codes.
- No full stop after Thai text, buttons, labels or headings. English uses sentence case.
- Use glossary terms: หยิบสินค้า (Pick), จัดเก็บเข้าพื้นที่ (Putaway), รอบการหยิบ (Wave), สินค้าขาด (Short Pick), ช่องเก็บสินค้า (Bin Location).

## UX Writer

- Delegate UI copy work to the `ux-writer` agent. Check copy with `/ux-writing-review` before you finish.

## UX/UI subagents

Flow: `context-manager` (load context) -> `ux-researcher` -> `ux-designer` -> `ui-designer` with `ux-writer` and `design-bridge` -> `qa-evaluator` writes the contract -> build -> `accessibility-tester` and `qa-evaluator` in parallel -> fixes -> `context-manager` (update `docs/discovery.md`).

## Commands

- `npm run lint` — Vale (Thai/English terms), markdownlint and lychee (offline link check)
- `npm run lint:links` — lychee only
- `npm run lint:vale` — Vale only
- `npm run lint:md` — markdownlint only
- `npm test` — rule fixtures, token rules and repo checks
- `npm run tokens:build` — rebuild `build/` from `tokens/` (commit the result)
- `npm run tokens:check` — fail if `build/` is stale

Run `npm run lint` and `npm test` before you finish a task.
