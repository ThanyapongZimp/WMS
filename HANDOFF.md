# Handoff: WMS Design System

เอกสารส่งต่องานสำหรับ UX/UI ที่รับงานต่อ สถานะ ณ วันที่ 24/11/2026

## สถานะตอนนี้

- งานทั้งหมดอยู่บน branch `phase1-guardrails` และเปิดเป็น [PR #3](https://github.com/ThanyapongZimp/WMS/pull/3) เข้า `main`
- CI ผ่านครบ 5 job: `vale`, `markdown`, `links`, `tokens`, `storybook`
- ในเครื่อง: `npm test` ผ่าน 162/162, `npm run test:ui` ผ่าน 10/10, lint ไม่มีปัญหา
- PR ยังไม่ merge รอรีวิวและรอ designer ยืนยันสีหนึ่งค่า (ดูหัวข้อ "เรื่องที่ต้องตัดสินใจ")

## สิ่งที่มีแล้ว

| ส่วน | อยู่ที่ไหน | สรุป |
| :--- | :--- | :--- |
| กฎสำหรับ AI agent | `CLAUDE.md`, `AGENTS.md`, `.claude/rules/` | วิธีทำงาน กฎ UI ภาษาไทย คำสั่งที่ต้องรัน |
| สารบัญเอกสาร | `docs/discovery.md`, `docs/Guidelines.md` | ทุกเอกสารพร้อมสถานะ `Trial` / `Active` และลำดับการอ่าน |
| UX writing | `docs/foundation/`, `docs/patterns/` | Voice and tone, Glossary, Grammar, Error, Empty state, Accessible copy, Localization keys |
| ตรวจคำอัตโนมัติ | `styles/WMS/`, `.vale.ini` | กฎ Vale ตรวจคำทับศัพท์ คำศัพท์ WMS ปุ่ม "ตกลง/ใช่" จุดท้ายประโยค รหัส error |
| Subagents | `.claude/agents/` | `ux-writer` และอีก 7 ตัว ใช้ impeccable เป็นเครื่องมือออกแบบหลัก |
| Design tokens | `tokens/` | DTCG 3 ชั้น primitive, semantic, component ค่ามาจาก DESIGN.md |
| Token ที่ build แล้ว | `build/css/variables.css`, `build/agent/tokens.json` | CSS variables สำหรับ UI และรายการ token พร้อม `usageRule` สำหรับ AI |
| Register และสี tenant | `src/foundations/registers.css`, `src/theme/tenant-primary.mjs` | โหมด office / station / pda และสีหลักของ tenant ที่บังคับ contrast 4.5:1 |
| ฟอนต์ | `src/foundations/fonts.css` | IBM Plex Sans Thai และ Plex Mono แบบ self-host |
| Component | `src/components/ScannerButton/`, `docs/components/mobile-scanner/ScannerButton.md` | ปุ่มสำหรับ PDA ครบทุก state |
| หน้า token สำหรับ designer | `artifact/tokens/index.html` | สร้างใหม่ด้วย `npm run artifact:build` |
| แผนที่ใช้ทำงาน | `docs/superpowers/plans/` | แผน Phase 1, Phase 2 และแผน token เพิ่มเติม |

## เริ่มงาน

1. ติดตั้ง `node` 22 ขึ้นไป, `vale` และ `lychee` (บน macOS ใช้ `brew install vale lychee`)
2. รัน `npm ci` แล้ว `npx playwright install chromium`
3. อ่าน `CLAUDE.md` แล้วตามด้วย `docs/discovery.md` และ `docs/Guidelines.md`
4. เปิด Storybook ด้วย `npm run storybook` แล้วเข้า `http://localhost:6006`

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ใช้เมื่อ |
| :--- | :--- |
| `npm run lint` | ตรวจคำภาษาไทย/อังกฤษ, Markdown และลิงก์ |
| `npm test` | ตรวจกฎ token, contrast, line-height, ขนาดเป้ากด และกฎ Vale |
| `npm run test:ui` | รันเทสต์ Storybook พร้อมตรวจ a11y (พบปัญหาแล้ว fail ทันที) |
| `npm run tokens:build` | สร้าง `build/` ใหม่หลังแก้ไฟล์ใน `tokens/` แล้ว commit ผลลัพธ์ด้วย |
| `npm run tokens:check` | ตรวจว่า `build/` ตรงกับ `tokens/` |
| `npm run artifact:build` | สร้างหน้า token สำหรับ designer ใหม่ |

ก่อนส่งงานทุกครั้งให้รัน `npm run lint`, `npm test` และ `npm run test:ui` ให้ผ่าน Stop hook ของ Claude จะรัน lint ให้อัตโนมัติก่อนจบงาน

## การตัดสินใจที่ทำไปแล้ว

- **line-height ภาษาไทยไม่ต่ำกว่า 1.45** ค่าใน DESIGN.md ที่ต่ำกว่า 1.45 ถูกปรับขึ้นเป็น 1.45 ทั้ง 8 ค่า (display-kpi, h1, pda-title, pda-button, scan-input, station-next, station-counter, feedback-headline) ข้อความยาวใช้ `--typography-prose` ที่ 1.8
- **ฟอนต์ mono ใช้กับรหัสเท่านั้น** เช่น A-03-12 จึงไม่อยู่ใต้กฎ 1.45 ถ้าจะใส่ภาษาไทยในสไตล์ mono ต้องเพิ่ม line-height ก่อน
- **ขนาดเป้ากด** office 24px, station 48px, PDA 56px, ปุ่มหลักบน PDA 64px ตาม PRODUCT.md
- **Light theme อย่างเดียว** dark และ high-contrast อยู่ในแผนภายหลังตาม DESIGN.md
- **ค่า token เก็บเป็น string** เช่น `"#4A3FD6"`, `"56px"` เพื่อให้ Style Dictionary ใช้ได้ตรงๆ
- **สี primitive โทนเทาชื่อ `gray`** ไม่ใช่ `neutral` เพราะชนกับ `color.neutral` ฝั่ง semantic
- **CODEOWNERS** ทุก path เป็นของ `@ThanyapongZimp` เพราะ repo อยู่ใต้บัญชีส่วนตัวจึงสร้างทีมไม่ได้

## เรื่องที่ต้องตัดสินใจ

- **สี `color.red.800` `#8F1F16`** ใช้เป็นสีตอนกดปุ่ม danger ค่านี้ไม่มีใน DESIGN.md ต้องให้ designer ยืนยันหรือเปลี่ยนก่อน merge
- **Repo เป็น public** ทุกไฟล์รวมถึง PRODUCT.md, DESIGN.md และ mockup ใน `artifact/` กับ `_bmad-output/` เปิดให้คนทั่วไปเห็น ถ้าไม่ตั้งใจ เจ้าของ repo ต้องเปลี่ยนเป็น private

## ข้อจำกัดที่รู้แล้ว

- เทสต์ป้ายภาษาไทยของ ScannerButton ตรวจว่ามี padding กันสระวรรณยุกต์โดนตัด แต่ยังวัดขอบตัวอักษรจริงไม่ได้ ถ้าเปลี่ยนฟอนต์ให้เปิดดูด้วยตาอีกครั้ง
- ปุ่ม secondary ตอน hover เปลี่ยนสีน้อย (gray.100 ไป gray.200) ตอนกดเห็นชัดกว่า
- หน้า `artifact/tokens/` แสดงป้าย contrast ของสี background โดยไม่บอกว่าเป็นพื้นผิว และที่ความกว้าง 280px คำว่า "คอนทราสต์" ถูกตัดกลางคำ
- ลิงก์ `link:` ในกฎ Vale ชี้ไปที่ branch `main` จะเปิดได้หลัง merge PR #3
- Mockup เดิมใน `artifact/` และ `_bmad-output/` มีปัญหา contrast ที่ impeccable แจ้งไว้ 66 จุด ยังไม่ได้แก้

## งานถัดไป

1. **Merge PR #3** หลัง designer ยืนยันสี `red.800`
2. **Component สำหรับพนักงาน PDA** แตก branch ใหม่จาก `main`
   - `BinLocationCard` แสดง Zone > Aisle > Bin ตัวใหญ่ อ่านได้จากระยะแขน
   - `PickQtyStepper` ใส่จำนวนที่หยิบได้จริง ใช้ตอนสินค้าขาด (Short Pick)
   - ทำแบบเดียวกับ ScannerButton: เขียนแผน เขียน story และเทสต์ให้ fail ก่อน แล้วค่อยสร้าง component และเปิดดูด้วยตาที่ 360px
3. **Workflow docs** `docs/workflows/ReceivingAndPutaway.md` และ `docs/workflows/WavePicking.md` ตาม Workflow A และ B ในเอกสาร context รวมกรณี "ช่องเก็บเต็ม" และ "สินค้าขาด"
4. **Phase 3** รอให้มี component มากพอก่อน: Figma sync และ Code Connect, changesets, Docs Portal

## ข้อควรระวัง

- ห้ามใส่ค่า hex, px หรือ ms ลงใน component ให้ใช้ token เท่านั้น สคริปต์ `scripts/hygiene.mjs` จะตรวจให้
- แก้ token ที่ `tokens/` เท่านั้น ห้ามแก้ `build/` โดยตรง
- ถ้าเปิดหลายเซสชันของ Claude ใน `WMS/` พร้อมกัน ไฟล์จะชนกัน ให้แยก worktree หรือทำทีละเซสชัน
- คำใหม่ที่ไม่มีใน `docs/foundation/Glossary.md` ให้เพิ่มเข้า Glossary ก่อน ห้ามคิดคำพ้องเอง
