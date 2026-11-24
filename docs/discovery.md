# Discovery

Central index of the WMS design system. Every document and component is listed here with its path and lifecycle status.

## Lifecycle status

- `Trial` — in trial use, structure may change
- `Active` — production ready, passed accessibility and UX writing review
- `Deprecated` — no longer supported; the row names the replacement and the removal date
- `Retired` — removed from the system

## Index

| หมวดหมู่ (Category) | ชื่อรายการ (Name) | ที่อยู่ไฟล์ (File Path) | สถานะ (Status) | คำอธิบายย่อ (Description) |
| :--- | :--- | :--- | :--- | :--- |
| Guide | Guidelines | [Guidelines.md](Guidelines.md) | Trial | ลำดับการอ่านเอกสาร |
| Foundation | Voice and Tone | [foundation/VoiceAndTone.md](foundation/VoiceAndTone.md) | Trial | บุคลิกแบรนด์และการปรับระดับภาษาตามสถานการณ์ |
| Foundation | Glossary | [foundation/Glossary.md](foundation/Glossary.md) | Trial | คลังคำศัพท์บังคับใช้ทั้งทั่วไปและเฉพาะทาง WMS |
| Foundation | Grammar and Spelling | [foundation/GrammarAndSpelling.md](foundation/GrammarAndSpelling.md) | Trial | กฎการทับศัพท์ เว้นวรรค ตัวเลข วันที่ และวรรคตอน |
| Foundation | Color | [foundation/Color.md](foundation/Color.md) | Trial | semantic colour tokens และกฎการใช้สีสถานะ |
| Foundation | Typography | [foundation/Typography.md](foundation/Typography.md) | Trial | type ramp และกฎตัวอักษรไทย line-height ไม่ต่ำกว่า 1.45 |
| Foundation | Spacing | [foundation/Spacing.md](foundation/Spacing.md) | Trial | spacing, radius และขนาดเป้ากดขั้นต่ำ (PDA 56px) |
| Tokens | Token source | `tokens/` | Trial | ไฟล์ DTCG 2025.10 สามชั้น primitive, semantic, component |
| Tokens | Agent tokens | `build/agent/tokens.json` | Trial | รายการ token พร้อม cssVar, aliasOf และ usageRule สำหรับ AI agent |
| Tokens | CSS variables | `build/css/variables.css` | Trial | CSS custom properties สำหรับ UI import ครั้งเดียวที่ root |
| Tokens | Register modes | `src/foundations/registers.css` | Trial | ค่า --control-height และ --target-min ตามอุปกรณ์ office, station, pda |
| Tokens | Tenant primary | `src/theme/tenant-primary.mjs` | Trial | สร้างชุดสีหลักจากสีของลูกค้า ปรับให้ได้คอนทราสต์อย่างน้อย 4.5:1 |
| Tokens | Token artifact | `artifact/tokens/index.html` | Trial | หน้าอ้างอิง token สำหรับนักออกแบบ build ด้วย `npm run artifact:build` |
| Components (Scanner) | Scanner Button | [components/mobile-scanner/ScannerButton.md](components/mobile-scanner/ScannerButton.md) | Trial | ปุ่มขนาดใหญ่คอนทราสต์สูงสำหรับพนักงานหน้างาน |
| Patterns | Error Messages | [patterns/ErrorMessages.md](patterns/ErrorMessages.md) | Trial | โครงสร้างข้อความแจ้งข้อผิดพลาดและทางแก้ไข |
| Patterns | Empty States | [patterns/EmptyStates.md](patterns/EmptyStates.md) | Trial | หน้าจอว่าง แยกกรณียังไม่มีข้อมูลกับกรองแล้วไม่พบ |
| Patterns | Accessible Copy | [patterns/Accessibility.md](patterns/Accessibility.md) | Trial | alt, aria-label และ aria-hidden สำหรับโปรแกรมอ่านหน้าจอ |
| Patterns | Localization Keys | [patterns/LocalizationKeys.md](patterns/LocalizationKeys.md) | Trial | การตั้งชื่อ key, ICU MessageFormat และ Figma workflow |
| Agent | UX Writer | `.claude/agents/ux-writer.md` | Trial | subagent ที่เขียนและรีวิว UI copy ของ WMS |
| Agent | UX Researcher | `.claude/agents/ux-researcher.md` | Trial | วางแผนวิจัยและสังเคราะห์ข้อมูลผู้ใช้จริง อ่านอย่างเดียว |
| Agent | UX Designer | `.claude/agents/ux-designer.md` | Trial | ออกแบบ user flow, state และ edge case แล้วส่ง UX brief ให้ impeccable |
| Agent | UI Designer | `.claude/agents/ui-designer.md` | Trial | ตัวสำรองเมื่อใช้ impeccable ไม่ได้ |
| Agent | Design Bridge | `.claude/agents/design-bridge.md` | Trial | อ่าน Figma อย่างเดียว ยังไม่ทำ Code Connect |
| Agent | Accessibility Tester | `.claude/agents/accessibility-tester.md` | Trial | ตรวจ WCAG 2.2 AA งานของ impeccable อ่านอย่างเดียว |
| Agent | QA Evaluator | `.claude/agents/qa-evaluator.md` | Trial | ทดสอบ prototype ด้วย Playwright ที่ 360, 412, 1366, 1920 px |
| Agent | Context Manager | `.claude/agents/context-manager.md` | Trial | จ่ายบริบทก่อนเริ่มงานและอัปเดต index หลังจบงาน |
| Skill | UX Writing Review | `.claude/skills/ux-writing-review/SKILL.md` | Trial | checklist รีวิว copy เรียกด้วย `/ux-writing-review` |
| Skill | shadcn | `.claude/skills/shadcn/SKILL.md` | Trial | skill ทางการจาก shadcn/ui (`npx skills add shadcn/ui`) ทำงานเมื่อโปรเจกต์มี `components.json` อัปเดตด้วย `npx skills update shadcn` |
| Rule | UI Copy | `.claude/rules/ux-copy.md` | Trial | โหลดอัตโนมัติเมื่อแก้ docs หรือไฟล์ที่มี UI string |
| Governance | Changelog | [../CHANGELOG.md](../CHANGELOG.md) | Active | บันทึกการเปลี่ยนแปลงตาม Keep a Changelog |
| Governance | Contributing | [../CONTRIBUTING.md](../CONTRIBUTING.md) | Active | Definition of Done สำหรับ PR ที่แก้ UI copy |
