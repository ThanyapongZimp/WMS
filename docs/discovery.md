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
| Patterns | Error Messages | [patterns/ErrorMessages.md](patterns/ErrorMessages.md) | Trial | โครงสร้างข้อความแจ้งข้อผิดพลาดและทางแก้ไข |
| Patterns | Empty States | [patterns/EmptyStates.md](patterns/EmptyStates.md) | Trial | หน้าจอว่าง แยกกรณียังไม่มีข้อมูลกับกรองแล้วไม่พบ |
| Patterns | Accessible Copy | [patterns/Accessibility.md](patterns/Accessibility.md) | Trial | alt, aria-label และ aria-hidden สำหรับโปรแกรมอ่านหน้าจอ |
| Patterns | Localization Keys | [patterns/LocalizationKeys.md](patterns/LocalizationKeys.md) | Trial | การตั้งชื่อ key, ICU MessageFormat และ Figma workflow |
| Agent | UX Writer | `.claude/agents/ux-writer.md` | Trial | subagent ที่เขียนและรีวิว UI copy ของ WMS |
| Agent | UX Researcher | `.claude/agents/ux-researcher.md` | Trial | วางแผนวิจัยและสังเคราะห์ข้อมูลผู้ใช้จริง อ่านอย่างเดียว |
| Agent | UX Designer | `.claude/agents/ux-designer.md` | Trial | ออกแบบ user flow, state และ edge case แล้วส่ง UX brief |
| Agent | UI Designer | `.claude/agents/ui-designer.md` | Trial | ออกแบบ UI และ component ด้วย semantic tokens |
| Agent | Design Bridge | `.claude/agents/design-bridge.md` | Trial | เชื่อม Figma กับโค้ด, Code Connect และ token sync |
| Agent | Accessibility Tester | `.claude/agents/accessibility-tester.md` | Trial | ตรวจ WCAG 2.2 AA อ่านอย่างเดียว |
| Agent | QA Evaluator | `.claude/agents/qa-evaluator.md` | Trial | ทดสอบ user journey ด้วย Playwright หลาย viewport |
| Agent | Context Manager | `.claude/agents/context-manager.md` | Trial | จ่ายบริบทก่อนเริ่มงานและอัปเดต index หลังจบงาน |
| Skill | UX Writing Review | `.claude/skills/ux-writing-review/SKILL.md` | Trial | checklist รีวิว copy เรียกด้วย `/ux-writing-review` |
| Rule | UI Copy | `.claude/rules/ux-copy.md` | Trial | โหลดอัตโนมัติเมื่อแก้ docs หรือไฟล์ที่มี UI string |
| Governance | Changelog | [../CHANGELOG.md](../CHANGELOG.md) | Active | บันทึกการเปลี่ยนแปลงตาม Keep a Changelog |
| Governance | Contributing | [../CONTRIBUTING.md](../CONTRIBUTING.md) | Active | Definition of Done สำหรับ PR ที่แก้ UI copy |
