---
name: ux-writing-review
description: Review Thai or English UI copy for Zimple WMS against the glossary, voice, Thai spelling, error, empty-state, accessibility and localization-key rules. Use when the user asks to review, check, fix or rewrite microcopy, button labels, error messages, empty states, toasts, tooltips, alt text or aria-label.
when_to_use: Copy pasted for review, a screen or component with UI strings, a PR that changes UI text, or a docs file under docs/patterns or docs/components.
argument-hint: "[copy to review or path to file]"
allowed-tools: Read, Grep, Glob
---

# UX writing review - Zimple WMS

Review this copy or file: $ARGUMENTS

If nothing was passed, review the UI strings in the files the user is working on.

## Sources

Rules live in these files. This checklist only points to them.

- `docs/foundation/VoiceAndTone.md`
- `docs/foundation/Glossary.md`
- `docs/foundation/GrammarAndSpelling.md`
- `docs/patterns/ErrorMessages.md`
- `docs/patterns/EmptyStates.md`
- `docs/patterns/Accessibility.md`
- `docs/patterns/LocalizationKeys.md`

## Checklist

Mark each item pass or fail for every string.

### Clarity and voice

- [ ] The string helps the user finish a task. No marketing, no decoration
- [ ] No pun, metaphor, joke or exclamation mark
- [ ] Tone fits the state: neutral for information, warm for success, serious and calm for errors
- [ ] No blame: never "คุณหยิบผิด", say what happened instead
- [ ] No ครับ or ค่ะ. เรา for the system, คุณ for the user, only when a subject is needed

### Words

- [ ] Glossary terms only (หยิบสินค้า, จัดเก็บเข้าพื้นที่, รอบการหยิบ, สินค้าขาด, ช่องเก็บสินค้า, เข้าสู่ระบบ)
- [ ] Royal Society transliteration (แอปพลิเคชัน, อีเมล, อัปเดต, ฟังก์ชัน, ดิจิทัล)
- [ ] One space around English words and numbers inside Thai text
- [ ] No full stop after Thai text, buttons, labels or headings
- [ ] English in sentence case
- [ ] Dates Gregorian `DD/MM/YYYY`, numbers with thousands separators

### By component

- [ ] Button: verb plus result. Never ตกลง, ใช่ or "OK"
- [ ] Error: what happened, then what to do, two sentences at most, no codes, fix stays on screen
- [ ] Empty state: says why it is empty, one primary action, separates "no data yet" from "no results for this filter"
- [ ] Tooltip: never the only place for information needed to finish the task
- [ ] Confirm dialog: the confirm button repeats the action ("ลบรอบการหยิบ"), not "ยืนยัน" alone
- [ ] PDA: fits one glance, one action, button label fits a 56px target at 16px

### Length (count with `Intl.Segmenter`)

- [ ] PDA: button 3 words, heading or label 5 words, error 2 sentences and 60 characters, empty-state line 1 sentence
- [ ] Office: button 4 words, heading or label 8 words, error 2 sentences, empty-state line 2 sentences

### Accessibility

- [ ] Icon-only control has an `aria-label` that names the purpose, without ปุ่ม or "button"
- [ ] Decorative image `alt=""`, informative image `alt` up to 125 characters, no "รูปภาพของ"
- [ ] Icon next to text has `aria-hidden="true"`

### Localization

- [ ] Every string has a semantic key, 2 to 3 dot levels, named by feature, not by file path
- [ ] No reused key across meanings, no string concatenation
- [ ] Plurals use ICU with `=0` and `other`

### Rule changes

- [ ] Edits to `docs/foundation/` or `styles/WMS/` have a `CHANGELOG.md` entry under `Changed`, with `**Breaking:**` when an in-use term changes
- [ ] A new glossary term has a Vale `substitution` rule with `nonword: true` and bad and good fixtures
- [ ] Thai is the source; English is translated by meaning

## Before and after

| Before | After | Why |
| :--- | :--- | :--- |
| `Invalid bin token` | ช่องเก็บสินค้านี้ไม่ตรงกับงาน สแกนช่อง A-03-12 แทน | No codes; what happened plus the fix |
| คุณหยิบผิด | สินค้าในช่องมีไม่พอ ระบุจำนวนที่หยิบได้จริงแล้วกด "ยืนยันสินค้าขาด" | No blame; glossary term สินค้าขาด |
| ไม่มีข้อมูล | ยังไม่มีรอบการหยิบวันนี้ สร้างรอบการหยิบเพื่อเริ่มงาน | Says why and gives the first action |
| ไม่พบข้อมูล | ไม่พบออเดอร์ที่ตรงกับตัวกรอง ลองล้างตัวกรองหรือเปลี่ยนช่วงวันที่ | Filter case gets its own copy and a way out |
| ปุ่มแว่นขยาย (aria-label) | ค้นหาออเดอร์ | Purpose, not appearance; no ปุ่ม |
| อัพเดทสถานะสำเร็จ! | อัปเดตสถานะแล้ว | Spelling; no exclamation mark |

## Report

Return one table: string, verdict (pass or fail), rule broken, rewrite. Then list glossary gaps. Do not rewrite strings that pass.
