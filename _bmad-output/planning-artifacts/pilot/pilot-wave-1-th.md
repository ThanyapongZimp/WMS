---
status: draft
created: 2026-11-23
sourceOfTruth: _bmad-output/planning-artifacts/epics.md
language: th
scope: Pilot Wave 1 — Epic 1 (บางส่วน) + Epic 2 Story 2.1–2.3, 2.13–2.14
updated: 2026-11-23 (เพิ่มผังคลังตาม sprint-change-proposal-2026-11-23 · ขยาย AC ทั้ง 11 story)
---

# Pilot Wave 1 — ตั้งค่าคลัง ตำแหน่ง และผังคลัง

> **ไฟล์นี้คือฉบับภาษาไทยของ story ที่เลือกมาทำ pilot** คัดจาก [epics.md](../epics.md) · AC ที่ขยายรายละเอียดมาจาก PRD, UX spec และ mockup ใน `pilot/ui/` ไม่ใช่ requirement ที่คิดขึ้นใหม่ ส่วนที่ผู้เขียนเลือกเองแยกไว้ในข้อ 3.1
> Source of truth ยังเป็น `epics.md` ถ้าแก้ AC ต้องแก้ที่ `epics.md` ก่อน แล้วค่อยแก้ไฟล์นี้ตาม
> Story ID ตรงกับ `epics.md` และ `sprint-status.yaml` ทุกตัว
> ไฟล์นี้จงใจไม่ตั้งชื่อให้มีคำว่า "epic" เพื่อไม่ให้ `bmad-sprint-planning` และ `bmad-build` อ่านซ้ำกับ `epics.md`

## 1. เป้าหมายของ pilot

1. **ได้ module ที่ใช้งานได้จริง 1 ตัว**: "ตั้งค่าคลัง › คลังและตำแหน่ง" ตั้งแต่ login จนพิมพ์ QR label และวาดผังคลังที่ใช้คำนวณเส้นทางหยิบ
2. **ทีมได้ลองวงจร BMAD ครบหลายรอบ**: `bmad-build` → `bmad-code-review` → `bmad-walkthrough` ต่อ story แล้วปิดด้วย `bmad-retrospective`
3. **ได้ pattern กลางที่ทีมอื่นใช้ต่อได้**: tenant/warehouse scoping, activity log, shell, list/sheet components, bulk action, label printing

### ผลลัพธ์ที่ต้อง demo ได้ตอนจบ pilot

```
Login → Shell/เมนู → สร้างคลัง → สร้างโซน → สร้าง location (เดี่ยว/bulk) → พิมพ์ QR label
                                                      → สร้าง container type → พิมพ์ QR container
วาดผังคลัง → ผูก location กับชั้นวาง → publish (ผ่านการตรวจ) → ทดสอบเส้นทางหยิบ
ทุก action ข้างบนมีบันทึกใน activity log
```

### ทำไมเลือกชุดนี้

- พึ่งแค่ Epic 1 ไม่ต้องรอ OMS contract (Q-3), hardware integration หรือ stock ledger
- zone / location / container เป็นข้อมูลตั้งต้นที่ Inbound, Picking และ Handover ต้องใช้ต่อ งาน pilot จึงไม่เสียเปล่า

## 2. Scope

### อยู่ใน pilot (11 story)

| ลำดับ | Story | ชื่อ | ได้อะไร |
|---|---|---|---|
| 1 | 1.1 | Project Foundation and Design-System Shell | scaffold, design tokens, i18n, tenant scoping |
| 2 | 1.2 | Immutable Activity Log Recording | activity log ที่ 2.1–2.3 ต้องเรียกใช้ |
| 3 | 1.3 | Office Web Sign-in and Session Management | login |
| 4 | 1.4 | Office Shell, Navigation and Visibility Rules | sidebar, header, เมนู |
| 5 | 1.5 | Shared List Components | ตาราง, filter, bulk action, state ต่างๆ |
| 6 | 1.6 | Shared Hub, Sheet and Confirmation Components | hub, sheet สร้าง/แก้ไข, confirm dialog |
| 7 | 2.1 | Warehouses and Zones | คลังและโซน |
| 8 | 2.2 | Locations and Location Labels | location + QR label |
| 9 | 2.3 | Container Types and Container Labels | container + QR label |
| 10 | 2.13 | Warehouse Layout Editor and Location Binding | ตัววาดผังคลัง + ผูก location + publish |
| 11 | 2.14 | Layout Route Engine and Route Preview | คำนวณเส้นทางจากผัง + ทดสอบเส้นทาง |

ทำตามลำดับในตาราง story ทุกตัวพึ่งแค่ story ที่อยู่ก่อนหน้า

### ไม่อยู่ใน pilot

- Story 1.7 (User Management) และ 1.8 (Roles & Permission Matrix) — ใน pilot ใช้ System Administrator ที่ seed ไว้ใน 1.1
- Story 1.11 (Approvals) — ดู D-2
- Story 1.12 (Notifications), 1.13 (Global Search), 1.14 (PDA Shell)
- Story 2.4–2.12 (device, station, rules, numbering, calendar, import) — ส่วนใหญ่ติด hardware integration ที่ยังเป็น `[ARCH-PENDING]`
- Story 4.8 ผังคลังแสดงความหนาแน่นสต็อก — ต้องรอ stock ledger (Epic 4)
- Epic 3 เป็นต้นไป

## 3. สิ่งที่ต้องตัดสินใจก่อนเริ่ม

| ID | เรื่อง | กระทบ story | ข้อเสนอ | สถานะ |
|---|---|---|---|---|
| D-1 | Starter template, stack, DB, PDA เป็น PWA หรือ native | 1.1 (ยัง ready-for-dev ไม่ได้) | รัน `bmad-architecture` แบบ lite ก่อน ตัดสินใจเฉพาะ stack / starter / DB / multi-tenant scoping / PDA build ส่วน OMS, hardware และ hosting เลื่อนไปก่อนได้ | **รอตัดสินใจ** |
| D-2 | การ disable คลังต้องผ่าน approval (FR-105) ซึ่งเป็นงานของ Story 1.11 | 2.1 | **ทางเลือก A:** เลื่อน AC ข้อนี้ออกไป ใน pilot ระบบจะปฏิเสธการ disable คลังที่มีสต็อก แต่ disable คลังที่ไม่มีสต็อกได้โดยไม่ต้องขอ approval **ทางเลือก B:** ดึง Story 1.11 เข้ามาใน pilot (กลายเป็น 10 story) | **รอตัดสินใจ** |
| D-4 | วิธี render ผัง: SVG ที่เขียนเอง หรือ library canvas (เช่น Konva, Fabric) | 2.13 | ถ้าใช้ library เป็นการเพิ่ม dependency ต้องขออนุมัติ · ตัดสินใจใน `bmad-architecture` | **รอตัดสินใจ** `[ARCH-PENDING]` |
| D-5 | Data model ของผัง (draft/published version, geometry, การผูก slot กับ location, กราฟทางเดิน) และวิธี precompute ระยะทาง | 2.13, 2.14 | เป็นการเปลี่ยน schema ต้องขออนุมัติ · ตกลง latency เป้าหมายต่อใบหยิบ | **รอตัดสินใจ** `[ARCH-PENDING]` |
| D-3 | การพิมพ์ label | 2.2, 2.3 | ใน pilot ใช้ browser print ไปก่อน เพราะ silent printing ยังเป็น `[ARCH-PENDING]` (UX Open Q-12) | เสนอ |
| D-6 | ข้อความ "ลองได้อีก n ครั้ง" และหน้าล็อกบอกได้ว่าอีเมลนี้มีบัญชีจริง (account enumeration) ซึ่งขัดกับหลัก "ตอบเหมือนกันทุกกรณี" ของ reset | 1.3 | อีเมลที่ไม่มีในระบบก็แสดง counter และหน้าล็อกเหมือนบัญชีจริง | **รอตัดสินใจ** |
| D-7 | Password policy, ฟอร์มเปลี่ยนรหัส, หน้าที่เปิดจากลิงก์ reset และหลังเปลี่ยนรหัส session ปัจจุบันอยู่ต่อหรือไม่ (mockup ทำให้หลุดด้วย แต่ AC บอกแค่ "session อื่น") | 1.3 | ใช้ policy ขั้นต่ำ (ยาว ≥ 8) ไปก่อน และให้ session ปัจจุบันอยู่ต่อ · ต้องออกแบบหน้าจอเพิ่ม 2 หน้า | **รอตัดสินใจ** |
| D-8 | ระยะเวลา idle timeout เริ่มต้น และจะเตือนก่อนหมดเวลาไหม | 1.3 | ตั้งราย tenant โดย default 30 นาที เตือนก่อน 2 นาที | **รอตัดสินใจ** |
| D-9 | อายุ OTP, กรอก OTP ผิดได้กี่ครั้ง, ส่งใหม่ได้กี่ครั้ง | 1.3 | OTP ใช้ได้ 5 นาที ผิด 5 ครั้งต้องเริ่มใหม่ ส่งใหม่ได้ 3 ครั้งต่อรอบ | **รอตัดสินใจ** |
| D-10 | Hub component ใน 1.6 ไม่มีหน้าไหนใน pilot ใช้ และไม่มี mockup | 1.6 | ย้าย AC ส่วน hub ไปทำพร้อม hub แรกที่มีจริง (story ภาพรวมของ module แรก) · 1.6 เหลือ Sheet และ confirmation | **รอตัดสินใจ** |
| D-11 | Enum ประเภทห้องของโซน: mockup ใช้ ทั่วไป/ควบคุมอุณหภูมิ/ของมีค่า ส่วน extract-screens ใช้ ปกติ/2–8 °C/15–25 °C และ temperature เป็น add-on Later | 2.1 | ใช้ enum ของ mockup โดยเป็นแค่ป้ายกำกับ ยังไม่มี logic อุณหภูมิ | **รอตัดสินใจ** |
| D-12 | รูปแบบลำดับการเดินของโซน (งูเลื้อย/ทางเดียว/ตามรหัส) มีผลอะไรจริง ตอนนี้ mockup ไม่ได้ใช้เลย ทั้งตอนสร้าง bulk และตอน fallback ของเส้นทาง | 2.1, 2.2, 2.14 | ใช้ตอนสร้าง bulk เพื่อเรียงลำดับเดิน: งูเลื้อย = แถวคู่เดินย้อนกลับ, ทางเดียว = เรียงตามแถวทุกแถว, ตามรหัส = เรียงตามรหัส · fallback ใช้ลำดับเดินที่ได้ | **รอตัดสินใจ** |
| D-13 | Enum การผสมสินค้า: mockup มี 3 ค่า (SKU เดียว / ห้ามผสมล็อต / ผสมได้) แต่ FR candidates มี 2 ค่า (อนุญาต / ห้ามคละ) | 2.2 | ใช้ 3 ค่าของ mockup เพราะ FEFO และ lot control (Epic 5–8) ต้องใช้ | **รอตัดสินใจ** |
| D-14 | ภาชนะ: enum ขั้นตอนที่ใช้ยังไม่มีใน PRD (mockup ใช้ รับเข้า·จัดเก็บ·หยิบ·คัดแยก·แพ็ค·ส่งมอบ·ตีกลับ) · ไม่มีหน้าแก้หรือ retire ประเภท/ภาชนะ · "สร้างเพิ่ม" เขียนทับค่าของประเภท | 2.3 | ใช้ enum ของ mockup · การแก้ไขและ retire ไปทำใน wave ถัดไป | **รอตัดสินใจ** |
| D-15 | ขนาด canvas ใน mockup fix ไว้ที่ 48 × 33 ม. แต่ DoD ต้องวาดคลังบางเขนจริง | 2.13 | ให้ admin ตั้งกว้าง × ยาวของอาคารได้ (เพิ่มช่องใน panel ตอนไม่ได้เลือกอะไร) · **ต้องวัดขนาดคลังบางเขนจริง** | **รอตัดสินใจ** |
| D-16 | ชั้นวางวางทับผนังหรือทับชั้นวางอื่นได้ไหม ตอนนี้ไม่มีการตรวจเลย | 2.13 | ปิดกั้นตอน publish เหมือนกรณีเดินไม่ถึง | **รอตัดสินใจ** |
| D-17 | รหัสคลังต้องไม่ซ้ำภายใน tenant หรือทั้งระบบ (QR ของ location/ภาชนะมีรหัสคลังอยู่ข้างใน) | 2.1 | ภายใน tenant เพราะทุก query ถูก scope ตาม tenant อยู่แล้ว | **รอตัดสินใจ** |

### 3.1 ค่าที่ผู้เขียน AC เลือกไว้ให้ (ช่วย review)

ข้อเหล่านี้ไม่มีใน PRD หรือ UX spec ผู้เขียนเลือกจาก mockup หรือจากหลักทั่วไป ถ้าไม่เห็นด้วยให้แก้ที่ `epics.md`

- **1.2** log entry เขียนใน transaction เดียวกับการเปลี่ยนข้อมูล · old → new เก็บเฉพาะ field ที่เปลี่ยน (mockup ของโซนเก็บ snapshot ทั้งก้อน) · มี API อ่าน log แบบ read-only ไว้ตรวจตอน demo
- **1.3** ตัวนับรหัสผิดเก็บฝั่ง server ราย account และ reset เมื่อ sign in สำเร็จ · ลิงก์ reset ใช้ได้ครั้งเดียว
- **1.4** สถานะ rail เก็บเป็น preference ของ user ฝั่ง server (mockup เก็บใน browser) · สลับคลังตอนมี Sheet ค้างจะถาม "ทิ้งการแก้ไข?" ก่อน
- **1.5** การเลือกแถวคงอยู่เมื่อเปลี่ยนหน้า แต่ล้างเมื่อเปลี่ยนตัวกรอง · export ใช้ label ภาษาไทยแทนค่า enum ดิบ · toast ที่มีปุ่มจะไม่ปิดเองระหว่าง hover/focus
- **2.1** ระบบตรวจสต็อกซ้ำตอนอนุมัติปิดใช้คลัง · System Administrator เข้าถึงคลังใหม่ได้ทันที
- **2.2** bulk สร้างใน transaction เดียว (ได้ทั้งหมดหรือไม่ได้เลย) · รหัสที่มีอยู่แล้วถูกข้าม · ระหว่างล็อกนับยังแก้ field อื่นได้ · QR payload `LOC:{คลัง}:{รหัส}`
- **2.3** ความจุ (ถ้ากรอก) ต้อง > 0 · รหัสชนแม้ตัวเดียวทั้ง batch ถูก block (ต่างจาก location ที่ข้าม เพราะเป็นช่วงเลขต่อเนื่อง) · ตัวกรอง "พิมพ์แล้ว" นับรวมสำเนาด้วย · QR payload `CON:{คลัง}:{รหัส}`
- **2.13** จุดจบที่ไม่อยู่บนทางเดินต้องปิดกั้นการ publish (mockup ไม่ได้ตรวจ) · ลดจำนวนช่องหรือชั้นจนการผูกหายต้องถามยืนยันก่อน (mockup ลบเงียบๆ) · log การเลื่อนด้วยลูกศรติดกันรวมเป็น entry เดียวได้ · server ตรวจซ้ำตอน publish
- **2.14** ตำแหน่งที่ผูกแล้วแต่เดินไม่ถึงไปต่อท้ายพร้อมตำแหน่งที่ยังไม่ผูกโดยเรียงตามลำดับเดิน (mockup วางไว้ก่อนและไม่เรียง) · ผลต้องเหมือนเดิมทุกครั้งที่ input เหมือนเดิม · มี benchmark ใน CI

### 3.2 จุดที่ mockup ต้องแก้ให้ตรงกับ spec

ตาม precedence ของเอกสาร (spine ชนะ mockup) ข้อเหล่านี้ AC ยึด PRD/UX spec และ mockup ใน `pilot/ui/` ควรแก้ตาม

| หน้า | Mockup ตอนนี้ | AC ยึดตาม |
|---|---|---|
| ทุกหน้า | Banner offline "ออฟไลน์ · ดูข้อมูลล่าสุดได้ แต่บันทึกไม่ได้จนกว่าจะเชื่อมต่อใหม่" | "ขาดการเชื่อมต่อ · ข้อมูลอาจไม่ล่าสุด" (EXPERIENCE.md, UX-DR20) · หรือแก้ spine ให้ใช้ข้อความของ mockup |
| login | Picker แสดงทุกคลังของ tenant | แสดงเฉพาะคลังที่ user มีสิทธิ์ (NFR-7) |
| shell | Off-canvas menu ปิดด้วย Esc ไม่ได้และไม่มี focus trap | ต้องมีทั้งสองอย่าง (UX-DR42) |
| layout | Panel ผูกตำแหน่งไม่มีตัวกรองประเภท | กรองตามโซนและประเภท (AC ของ 2.13) |
| layout | ไม่มีรายการสิ่งของบนผังให้เลือกด้วย keyboard | ต้องเลือกทุก element จาก list ได้ (EXPERIENCE.md, UX-DR42) |
| layout | Read-only เฉพาะจอแคบหรือ offline | ต้องรวมกรณี user ไม่มีสิทธิ์แก้ด้วย |
| layout | Note จอแคบมี 2 อัน (1024px กับ 1280px) ขัดกัน | หน้าผังคลังแสดงเฉพาะ note 1280px |
| containers | Export เป็นค่า enum ดิบ · ตัวกรอง "พิมพ์แล้ว" ไม่นับสำเนา | ใช้ label ภาษาไทย · นับรวมสำเนา |

## 4. Stories และ Acceptance Criteria

> แปลจาก `epics.md` โดยคงความหมายเดิมไว้ AC ขยายรายละเอียดเมื่อ 2026-11-23 จาก PRD, UX spec และ mockup ใน `pilot/ui/` (ดูข้อ 3.1 และ 3.2)
> `[PILOT]` = พฤติกรรมเฉพาะรอบ pilot · `[OPEN D-x]` = รอตัดสินใจตามตารางข้อ 3 · `[ARCH-PENDING]` = รอ architecture
> เลขอ้างอิง (FR-x, NFR-x, UX-DR-x) ชี้กลับไปที่ PRD และ UX spec

---

### Story 1.1: Project Foundation and Design-System Shell

**ในฐานะ** developer ของทีม Zimple WMS
**ฉันต้องการ** web application แบบ multi-tenant ที่ scaffold ไว้แล้ว พร้อม design tokens ของ shadcn/ui, i18n ไทย/อังกฤษ และ data scoping ตาม tenant/warehouse
**เพื่อให้** story ต่อจากนี้ทุกตัวต่อยอดบน design system เดียวและ data-scoping model เดียว

**Acceptance Criteria:**

**การ scaffold project**

1. **Given** ยังไม่มี application code
   **When** scaffold project
   **Then** ใช้ starter template ตามที่ architecture document เลือก `[ARCH-PENDING: D-1]` story นี้ตั้งเป็น ready-for-dev ไม่ได้จนกว่าจะเลือกแล้ว
   **And** repository เป็น codebase เดียวที่ให้บริการทั้ง office web, station และ PDA (NFR-12) `[ARCH-PENDING: PDA native vs web/PWA]`
   **And** รันคำสั่งเดียวแล้ว app ขึ้นบนเครื่อง local พร้อม tenant ที่ seed ไว้ และ CI รัน lint, type-check และ tests ทุกครั้งที่ push

**Color token**

2. **Given** app กำลังทำงาน
   **When** render หน้าใดก็ตาม
   **Then** color token ทุกตัวใน frontmatter ของ DESIGN.md (shadcn variables หลัก รวมถึง `success*`, `warning*` ที่รวม `warning-strong`, `danger-soft*`, `info*`, `neutral*`, `scan-accept/reject/blocked*`, `pda-bar*`, `support-banner*`, `chart-1…5`) ถูกประกาศเป็น CSS variable บน `:root` และลงทะเบียนใน Tailwind theme เพื่อให้ใช้ utility อย่าง `bg-success-soft` ได้ (UX-DR1)
   **And** ค่าตรงกับ DESIGN.md ทุกตัว (เช่น `primary` #4A3FD6, `destructive` #C4281C, `success` #13794A, `warning` #F2A516, `warning-strong` #B86E00, `info` #1F66C1, `input` #8C93A3) (UX-DR1)
   **And** มี lint/check ที่ทำให้ build fail ถ้า component ใช้ค่าสี hex/rgb ตรงๆ นอกไฟล์ token (UX-DR1)
   **And** มีแค่ light theme ไม่มี variable หรือปุ่มสลับ dark mode และไม่ใช้ gradient (UX-DR48)

**ตัวอักษร รูปทรง และระยะห่าง**

3. **Given** typography และ shape tokens
   **When** render ข้อความและ control
   **Then** โหลด IBM Plex Sans Thai (400/500/600/700) และ IBM Plex Mono (500/700) และมี named style ครบทุกตัว (display-kpi, h1–h3, body, body-strong, label, caption, code, pda-body, pda-caption, pda-title, pda-button, pda-location, scan-input, station-next, station-counter, feedback-headline) โดย line-height ภาษาไทย ≥ 1.45 ไม่มี letter-spacing และไม่ใช้ตัวพิมพ์ใหญ่ทั้งคำ (all-caps) (UX-DR2)
   **And** ขนาดตัวอักษรฝั่งออฟฟิศเป็นไปตาม ramp body 14/1.6, label 13, caption 12, h1 24, h2 18, h3 16, display-kpi 28/700 และไม่มี text style ที่เล็กกว่า 12px (UX-DR2, UX-DR48)
   **And** ตัวเลขในตารางใช้ tabular numerals (UX-DR2)
   **And** map radius tokens `sm 4 / md 6 / lg 8 / xl 12 / full` โดยตั้ง shadcn `--radius` = 8px และประกาศ spacing tokens ครบ ได้แก่ page padding 24×20, control height 36/48/56/64, table row 44/36, scan field 64/56, sidebar 240/64, sheet 560, gap 8/16/24 (UX-DR3)
   **And** focus ring token เป็น `ring` หนา 2px มี offset 2px และห้าม component ใดเอาออก (UX-DR42)

**ภาษาและรูปแบบการแสดงผล**

4. **Given** ภาษาที่ผู้ใช้ตั้งไว้
   **When** render UI
   **Then** ข้อความ UI ทุกตัวมาจาก message catalogue ไทยและอังกฤษ ค่า default เป็นภาษาไทย และตั้ง `lang` เป็น `th` หรือ `en` ตามภาษาที่ใช้ (NFR-8, UX-DR44)
   **And** มี check ที่ทำให้ build fail ถ้าพบข้อความ UI ภาษาไทยหรืออังกฤษที่ hard-code ไว้นอก catalogue
   **And** วันที่แสดงเป็น `10 ต.ค. 2026` เวลาแสดงแบบ 24 ชั่วโมงเป็น `14:05` ใช้ timezone Asia/Bangkok และใช้เลขอารบิกเท่านั้น (ไม่ใช้เลขไทย) (UX-DR44)
   **And** รหัสต่างๆ (คลัง, โซน, location, container, เลขเอกสาร) แสดงด้วยฟอนต์ mono พร้อม `translate="no"` และไม่ถูกแปลเด็ดขาด (UX-DR44, UX-DR42)

**การ scope ข้อมูล**

5. **Given** data layer
   **When** สร้าง business record ใดก็ตาม
   **Then** record มี company (tenant) id และมี warehouse id ด้วยถ้าเป็นข้อมูลของคลังใดคลังหนึ่ง และทุก query ถูก scope ฝั่ง server ตาม tenant และคลังที่ผู้เรียกมีสิทธิ์ (NFR-7, NFR-11)
   **And** request ที่ขอ record ของ tenant อื่น หรือของคลังที่อยู่นอก scope ของผู้เรียก ได้ผลเป็น "not found" และไม่เปิดเผยอะไรเลยว่า record นั้นมีอยู่หรือไม่ (NFR-7)
   **And** มี automated test suite ที่พิสูจน์ scoping ของทุก endpoint ที่ story ถัดไปเพิ่มเข้ามา (endpoint ใหม่ทุกตัวต้องเพิ่ม scoping test ของตัวเอง)
   **And** tenant มี edition flag ระดับบริษัท (Business / 3PL) และ add-on toggle ที่เก็บแยกต่อบริษัทและต่อคลัง เพื่อให้ visibility rules ใน story ถัดไปอ่านได้ (UX-DR7)

**ข้อมูล seed**

6. **Given** environment ใหม่
   **When** รัน seed
   **Then** สร้าง tenant 1 ตัว คลัง 1 คลังใน tenant นั้น และบัญชี *System Administrator* ที่ล็อกไว้ 1 บัญชี (ลบ ระงับ หรือถอด role ไม่ได้) ซึ่งมีทุก permission ในคลังนั้น เพื่อให้ story ถัดไป sign in ได้
   **And** seed เป็นแบบ idempotent รัน 2 ครั้งก็ไม่สร้างข้อมูลซ้ำ

---

### Story 1.2: Immutable Activity Log Recording

**ในฐานะ** ผู้จัดการคลัง
**ฉันต้องการ** ให้ทุก action ที่สำคัญถูกบันทึกลง activity log แบบ append-only
**เพื่อให้** ดูได้ตลอดว่าใครทำอะไร ทำบนอุปกรณ์ไหน และทำเพราะอะไร

**Acceptance Criteria:**

**เนื้อหาของ entry**

1. **Given** feature ใดก็ตามเรียก activity-log service
   **When** บันทึก action
   **Then** entry ที่เก็บมีข้อมูลเวลา, ประเภทผู้กระทำ (user, automation, OMS API, Zimple support), id ของผู้กระทำ, อุปกรณ์, action type, record เป้าหมาย (type + id + รหัสที่คนอ่านได้), ค่าเก่า → ค่าใหม่ และเหตุผล (FR-107)
   **And** service ดึงผู้กระทำ, ประเภทผู้กระทำ, อุปกรณ์ และเวลา จาก request context เอง ไม่ได้รับค่าจากผู้เรียก feature จึงบันทึกผู้กระทำเป็นคนอื่นไม่ได้
   **And** ค่าเก่า → ค่าใหม่ เก็บเฉพาะ field ที่เปลี่ยน (เช่น `name: "คลังบางเขน" → "คลังบางเขน 1"`) ไม่ใช่ snapshot ของทั้ง record
   **And** entry ถูก scope ตาม tenant และคลังเหมือน record อื่นทุกตัว (NFR-7)

**การบันทึกแบบ atomic**

2. **Given** การเปลี่ยนแปลงทางธุรกิจที่ต้องบันทึก log
   **When** save การเปลี่ยนแปลงนั้น
   **Then** การเปลี่ยนแปลงและ log entry ถูกเขียนใน transaction เดียวกัน ถ้าเขียน log ไม่สำเร็จการเปลี่ยนแปลงจะถูก rollback และการเปลี่ยนแปลงที่ล้มเหลวจะไม่มี entry

**แก้ไขไม่ได้**

3. **Given** entry ที่บันทึกไปแล้ว
   **When** user หรือ API พยายามแก้ไขหรือลบ entry นั้น
   **Then** ระบบปฏิเสธ และไม่มีอะไรเปลี่ยน (FR-107, NFR-6)
   **And** ไม่มี path สำหรับแก้ไขหรือลบเลยทั้งใน service และ API และ storage layer ก็ปฏิเสธการแก้ไข/ลบด้วย (เช่น ผ่าน permission หรือ trigger) ทำให้ application code ที่เขียนตรงลง storage ก็ทำไม่สำเร็จ

**ประเภท action**

4. **Given** service นี้เปิดให้ทุก module ใช้
   **When** เกิด sign-in/out (รวมถึงครั้งที่ล้มเหลว), create, edit, cancel, approve, reject, adjust, reverse, การเปลี่ยน rule/user/permission, print/reprint หรือ export ใน story ถัดๆ ไป
   **Then** แต่ละ action เรียก service นี้ด้วย action type ที่ตรงกัน (FR-107, NFR-7)
   **And** catalogue ของ action type เป็นรายการปิด action type ที่ไม่รู้จักถูกปฏิเสธที่จุดเรียกใน tests
   **And** สำหรับ pilot catalogue มีอย่างน้อย: `sign-in`, `sign-in-failed`, `sign-out`, `account-locked`, `password-reset-requested`, `password-changed`, `warehouse.create`, `warehouse.edit`, `warehouse.request-disable`, `warehouse.cancel-disable`, `warehouse.disable`, `zone.create`, `zone.edit`, `location.create`, `location.bulk-create`, `location.edit`, `location.disable`, `location.enable`, `container.generate`, `container.clear`, `label.print`, `label.reprint`, `export`, `layout.edit`, `layout.bind`, `layout.unbind`, `layout.publish`

**การอ่าน log ใน pilot**

5. **Given** หน้าดู log (Story 1.10) ยังไม่ได้ทำ
   **When** tester ต้องตรวจ entry
   **Then** มี API แบบอ่านอย่างเดียวที่ป้องกันด้วย permission คืน entry ที่กรองตาม record เป้าหมาย, ผู้กระทำ, action type และช่วงเวลา เรียงใหม่สุดก่อน และแบ่งหน้า

**การเก็บรักษา log**

6. **Given** การเก็บรักษา log
   **When** entry มีอายุเกิน 1 ปี
   **Then** ยังเก็บไว้อยู่ `[ASSUMPTION: อย่างน้อย 1 ปี, PRD §12]` (FR-107)

---

### Story 1.3: Office Web Sign-in and Session Management

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** sign in บนเว็บด้วยอีเมลและรหัสผ่าน (และ OTP เมื่อบริษัทเปิด MFA) แล้วเลือกคลังที่จะทำงาน
**เพื่อให้** เข้าถึงได้เฉพาะคลังที่ตัวเองมีสิทธิ์

**Acceptance Criteria:**

**หน้า sign in**

1. **Given** หน้า sign in
   **When** render
   **Then** แสดงโลโก้ tenant, "Zimple WMS", หัวข้อ "เข้าสู่ระบบ" พร้อม "ใช้บัญชีที่ผู้ดูแลระบบของบริษัทสร้างให้", field อีเมล และ รหัสผ่าน, ปุ่มแสดง/ซ่อนรหัสผ่าน (aria-label "แสดงรหัสผ่าน"/"ซ่อนรหัสผ่าน"), ลิงก์ "ลืมรหัสผ่าน?", ปุ่ม "เข้าสู่ระบบ", คำแนะนำ "พนักงานหน้างานไม่ต้องใช้หน้านี้ · สแกนบัตรพนักงานที่ PDA เพื่อเข้าสู่ระบบ" และตัวสลับ ไทย / English (UX-DR44)
   **And** title ของ browser เป็น "{view heading} · Zimple WMS"
   **And** ทุกครั้งที่เปลี่ยน view, focus ย้ายไปที่ input แรก (sign in, ลืมรหัสผ่าน, OTP) หรือไปที่หัวข้อ (view อื่นทั้งหมด) (UX-DR42)

2. **Given** ฟอร์ม sign in
   **When** user กดส่งโดยอีเมลไม่ถูกรูปแบบหรือไม่ได้กรอกรหัสผ่าน
   **Then** แสดง error ใต้ field "กรอกอีเมลให้ถูกรูปแบบ เช่น name@company.co" หรือ "กรอกรหัสผ่าน", field ถูก mark เป็น `aria-invalid`, focus ไปที่ field แรกที่ผิด และไม่ส่ง request

**sign in สำเร็จ**

3. **Given** user ที่ active และเปิดสิทธิ์ sign in บนเว็บไว้
   **When** กรอกอีเมลและรหัสผ่านถูกต้อง
   **Then** sign in สำเร็จ ระหว่างส่ง request ปุ่มแสดง spinner และถูก disable (UX-DR16) (FR-20)
   **And** การ sign in ถูกบันทึกใน activity log พร้อมอุปกรณ์และวิธีที่ใช้ (`password` หรือ `password + OTP`) (FR-107)

**เลือกคลัง**

4. **Given** user ที่ sign in แล้ว
   **When** คลังที่มีสิทธิ์และไม่ถูกปิดใช้มีมากกว่า 1 คลัง
   **Then** view "เลือกคลังที่จะทำงาน" / "สลับคลังภายหลังได้จากแถบด้านบน" แสดงเฉพาะคลังเหล่านั้นเป็น radio card (ชื่อ + รหัส) โดยเลือกและ focus คลังที่ใช้ล่าสุดไว้ก่อน และ "เข้าใช้งาน" พาเข้าแอป (FR-20, NFR-7, NFR-11)
   **And** ถ้ามีสิทธิ์แค่ 1 คลังพอดี ข้ามหน้าเลือกคลังไป
   **And** คลังที่ user ไม่มีสิทธิ์ต้องไม่ปรากฏเลย แม้จะมีอยู่ใน tenant

**MFA**

5. **Given** บริษัทเปิด MFA
   **When** user ผ่านขั้นรหัสผ่านแล้ว
   **Then** view "ยืนยันตัวตน" / "กรอกรหัส 6 หลักที่ส่งไปที่ {email}" ขอ OTP 6 หลักที่ส่งทางอีเมล (FR-20)
   **And** ช่องกรอก 6 ช่องรับเฉพาะตัวเลข เลื่อนไปช่องถัดไปเอง กด Backspace ในช่องว่างแล้วถอยกลับช่องก่อนหน้า วางรหัสที่ copy มาลงครบทุกช่องได้ และส่งอัตโนมัติเมื่อกรอกครบ 6 หลัก ช่องแรกมี `autocomplete="one-time-code"` และแต่ละช่องมี label "หลักที่ {i}" (UX-DR42)
   **And** รหัสผิดแสดง "รหัสไม่ถูกต้อง · ตรวจรหัสในอีเมลล่าสุดแล้วกรอกใหม่" ล้างทุกช่อง และ focus ช่องแรก
   **And** "ส่งรหัสใหม่" ถูก disable พร้อม "ส่งรหัสใหม่ได้ในอีก {s} วินาที" นับถอยหลังจาก 45 แล้วจึงกดได้พร้อมข้อความ "ไม่ได้รับรหัส?" การส่งใหม่ทำให้รหัสเดิมใช้ไม่ได้ และแสดง toast "ส่งรหัสใหม่แล้ว" / "รหัสเดิมใช้ไม่ได้แล้ว" (FR-20)
   **And** "← ใช้บัญชีอื่น" กลับไปที่ view sign in
   **And** อายุของ OTP, จำนวนครั้งที่กรอก OTP ผิดได้สูงสุด และจำนวนครั้งที่ส่งใหม่ได้ เป็นไปตามการตัดสินใจ `[OPEN D-9]`
   **And** บัญชี Zimple support ต้องใช้ OTP ทุกครั้ง ไม่ว่าบริษัทจะตั้งค่าไว้อย่างไร (FR-20, NFR-7)

**ล็อกบัญชี**

6. **Given** user กรอกรหัสผ่านผิด
   **When** รหัสผ่านไม่ถูกต้อง
   **Then** alert แสดง "อีเมลหรือรหัสผ่านไม่ถูกต้อง · ลองได้อีก {n} ครั้งก่อนบัญชีถูกล็อกชั่วคราว" ล้างช่องรหัสผ่านและ focus ช่องนั้น และบันทึกครั้งที่ผิดเป็น `sign-in-failed` (FR-20, FR-107)
   **And** ตัวนับครั้งที่ผิดเก็บฝั่ง server แยกต่อบัญชี และ reset หลัง sign in สำเร็จ

7. **Given** user กรอกรหัสผ่านผิด
   **When** ผิดติดกัน 3 ครั้ง
   **Then** บัญชีถูกล็อก 15 นาที และ view "บัญชีถูกล็อกชั่วคราว" / "ใส่รหัสผ่านผิด 3 ครั้งติดกัน · ลองใหม่ได้เมื่อครบเวลา หรือขอตั้งรหัสผ่านใหม่" แสดงการนับถอยหลัง MM:SS ด้วยฟอนต์ mono, ปุ่ม "ตั้งรหัสผ่านใหม่" และปุ่ม "กลับไปเข้าสู่ระบบ" ที่ถูก disable ซึ่งจะเปลี่ยนเป็น "เข้าสู่ระบบอีกครั้ง" เมื่อนับถอยหลังจบ (FR-20)
   **And** ระหว่างถูกล็อก กรอกรหัสผ่านถูกก็ยังถูกปฏิเสธ
   **And** การล็อกถูกบันทึกเป็น `account-locked` (FR-107)
   **And** อีเมลที่ไม่มีในระบบจะได้ตัวนับและหน้าล็อกแบบเดียวกันหรือไม่ (เพื่อกัน account enumeration) เป็นไปตามการตัดสินใจ `[OPEN D-6]`

**reset รหัสผ่าน**

8. **Given** user ขอ reset รหัสผ่าน
   **When** กรอกอีเมลใดก็ตามในหน้า "ตั้งรหัสผ่านใหม่" แล้วส่ง
   **Then** response เป็น view เดียวกันเสมอ "ตรวจอีเมลของคุณ" / "ถ้า {email} เป็นอีเมลของบัญชีในระบบ จะได้รับลิงก์ตั้งรหัสผ่านใหม่ภายในไม่กี่นาที · ลิงก์ใช้ได้ 30 นาที" ไม่ว่าอีเมลนั้นจะมีในระบบหรือไม่ และใช้เวลาตอบเท่ากัน (FR-20)
   **And** ลิงก์ reset (ถ้าส่ง) ใช้ได้ครั้งเดียวและมีอายุ 30 นาที ลิงก์ที่หมดอายุหรือใช้ไปแล้วแสดงข้อความที่ชัดเจน และมีทางขอลิงก์ใหม่
   **And** ฟอร์มตั้งรหัสผ่านใหม่และ password policy เป็นไปตามการตัดสินใจ `[OPEN D-7]`

**Session**

9. **Given** user ที่ sign in อยู่
   **When** session ไม่มีการใช้งานนานเกิน timeout ที่ tenant ตั้งไว้
   **Then** session สิ้นสุด และ action ถัดไปแสดง "หมดเวลาใช้งาน" / "ไม่มีการใช้งานนานเกินเวลาที่บริษัทกำหนด · เข้าสู่ระบบอีกครั้งเพื่อทำงานต่อ" พร้อม "เข้าสู่ระบบอีกครั้ง" (FR-20)
   **And** ค่า default ของ timeout และการเตือนก่อนหมดเวลา (ถ้ามี) เป็นไปตามการตัดสินใจ `[OPEN D-8]`

10. **Given** user ที่ sign in อยู่
   **When** เปลี่ยนรหัสผ่าน
   **Then** session อื่นทั้งหมดของ user คนนั้นถูก sign out และหน้า sign in แสดง "เปลี่ยนรหัสผ่านแล้ว · ออกจากระบบทุกอุปกรณ์อื่นแล้ว เข้าสู่ระบบด้วยรหัสผ่านใหม่" ในกรณีที่เกี่ยวข้อง (FR-20)
   **And** session ปัจจุบันยัง sign in อยู่หรือไม่ เป็นไปตามการตัดสินใจ `[OPEN D-7]`

11. **Given** user ที่ sign in อยู่
   **When** เลือก "ออกจากระบบ"
   **Then** session สิ้นสุดทันที (ไม่มี confirm) หน้า sign in แสดง "ออกจากระบบแล้ว" และบันทึก `sign-out` (FR-107)

**การปฏิเสธการเข้าใช้**

12. **Given** user ที่ถูกระงับ
   **When** พยายาม sign in ด้วยรหัสผ่านที่ถูกต้อง
   **Then** แสดง view "บัญชีนี้ถูกพักใช้" / "เข้าสู่ระบบไม่ได้ระหว่างพักใช้ · ติดต่อผู้ดูแลระบบของบริษัทเพื่อเปิดใช้บัญชี" พร้อม "ใช้บัญชีอื่น" (FR-17, FR-20)

13. **Given** user ที่ role ไม่ให้สิทธิ์เข้าหน้าเว็บใดเลย
   **When** พยายาม sign in ด้วยรหัสผ่านที่ถูกต้อง
   **Then** แสดง view "บัญชีนี้ยังไม่มีสิทธิ์ใช้งานบนเว็บ" / "บทบาทของคุณยังไม่ได้เปิดหน้าใดบนเว็บ · ติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์ แล้วเข้าสู่ระบบใหม่" พร้อม "ใช้บัญชีอื่น" (FR-17, FR-20)
   **And** ใน pilot user ที่ถูกระงับและ user ที่ไม่มีสิทธิ์มีเฉพาะในข้อมูลทดสอบที่ seed ไว้ เพราะยังไม่ได้ทำ Story 1.7/1.8 `[PILOT]`

**ไม่อยู่ใน scope ของ story นี้**

- "Remember me", SSO และการ sign in ด้วยบัตรพนักงานบน PDA (Story 1.14)

---

### Story 1.4: Office Shell, Navigation and Visibility Rules

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** shell ที่หน้าตาเหมือนกันทุกหน้า มี sidebar, header และ module tabs ที่แสดงเฉพาะสิ่งที่เกี่ยวกับฉัน
**เพื่อให้** ไปมาในระบบได้เร็ว และไม่เห็น feature ที่ตัวเองใช้ไม่ได้

**Acceptance Criteria:**

**โครง shell**

1. **Given** ผู้ใช้ฝั่งออฟฟิศที่ sign in แล้ว
   **When** โหลดหน้าออฟฟิศหน้าใดก็ตาม
   **Then** shell แสดง sidebar กว้าง 240px ที่ยุบเหลือ rail 64px ได้ มีโลโก้ tenant (สูงไม่เกิน 32px) อยู่ด้านบน "by Zimple Solution" อยู่ด้านล่าง และมี header แบบ sticky สูง 56px (UX-DR5)
   **And** รายการใน sidebar สูง 40px ใช้ icon 20px รายการที่ active ใช้ `sidebar-accent` พร้อมแถบ primary แบบ inset กว้าง 3px มี `aria-current="page"` และ active ตาม deep link ด้วย (UX-DR5)
   **And** skip link "ข้ามไปที่เนื้อหาหลัก" เป็น element แรกที่ focus ได้ (UX-DR42)
   **And** title ของ browser เป็น "{page} · {warehouse name} · Zimple WMS" (หรือ Zimple Fulfillment ถ้าเป็น edition 3PL) และเมื่อเปลี่ยน route มีการประกาศชื่อหน้า (UX-DR5, UX-DR42)

**Rail**

2. **Given** ปุ่มสลับ rail ที่ด้านล่าง sidebar
   **When** user กดสลับ
   **Then** sidebar ยุบเหลือแค่ icon พร้อมเส้นแบ่งกลุ่ม aria-label ของปุ่มสลับเปลี่ยนเป็น "ย่อเมนู" ↔ "ขยายเมนู" และ icon แต่ละตัวบน rail แสดง label เป็น tooltip เมื่อ hover และเมื่อ focus ด้วย keyboard (UX-DR5)
   **And** สถานะยุบ/ขยายถูกเก็บเป็น user preference ฝั่ง server จึงตามไปด้วยเมื่อ user เปิดจาก browser อื่น (UX-DR5)

**Header**

3. **Given** header
   **When** render
   **Then** มีองค์ประกอบเรียงจากซ้ายไปขวา: warehouse switcher (ชื่อคลัง + รหัสแบบ mono + chevron, `aria-haspopup="dialog"`), ช่อง search (placeholder "ค้นหาหรือสแกนรหัส" + "Ctrl K"), ช่องว่าง, ปุ่ม approvals, ปุ่ม notifications และ user menu (avatar, ชื่อ, role) (UX-DR5)
   **And** approvals และ notifications แสดง count chip เฉพาะเมื่อจำนวน > 0 และแสดง "99+" เมื่อเกิน 99 โดย aria-label รวมจำนวนไว้ด้วย (เช่น "อนุมัติ · 3 รายการรอ") (UX-DR5, UX-DR6)
   **And** ใน pilot ยังไม่มี engine ของ search, approvals และ notifications (Story 1.11–1.13) ปุ่มจึง render โดยไม่มีจำนวน และเปิด panel ว่าง "ไม่มีงานรออนุมัติ" / "ยังไม่มีการแจ้งเตือน" `[PILOT]`

**เมนูผู้ใช้**

4. **Given** user menu
   **When** เปิดเมนู
   **Then** แสดงอีเมลของ user และคลังที่มีสิทธิ์, "ภาษา: ไทย/English", "เปลี่ยนรหัสผ่าน" และ "ออกจากระบบ" ปุ่มลูกศรเลื่อนระหว่างรายการ Esc ปิดเมนูและคืน focus ไปที่ปุ่มที่เปิด และ Tab หรือคลิกข้างนอกปิดเมนู (UX-DR42, UX-DR44)
   **And** การเปลี่ยนภาษามีผลทันทีและถูกเก็บแยกต่อ user (UX-DR44)

**โครงเมนู**

5. **Given** navigation tree ของ Phase 1 ใน EXPERIENCE.md
   **When** render sidebar
   **Then** มีเมนู Phase 1 ตรงตามนี้ทุกรายการ แบ่งเป็นกลุ่ม (ไม่มีหัวกลุ่ม) ภาพรวมคลัง · คำสั่งซื้อ · สินค้า, กลุ่ม "งานคลัง" รับสินค้าเข้า · สินค้าคงคลัง · หยิบสินค้า · แพ็คสินค้า · ส่งมอบขนส่ง · สินค้าตีกลับ และกลุ่ม "รายงาน & ตั้งค่า" รายงาน · ตั้งค่า & ข้อมูลหลัก ส่วนเมนู Phase 2/Later ไม่ render เลย (UX-DR6)
   **And** แต่ละ module เปิดที่หน้า hub ภาพรวม, tab ระดับ L2 เป็น URL route มี count chip เฉพาะงานที่ต้องทำ (ซ่อนเมื่อเป็น 0, แสดง "99+" เมื่อเกิน 99 และประกาศพร้อม label เช่น "ใบหยิบ 14 รายการ") และจำ tab ล่าสุดของแต่ละ module แยกต่อ user (UX-DR6)
   **And** หน้าย่อยของ settings ใช้ Tabs แถวที่สอง ห้ามทำ sidebar ระดับที่สาม เช่น ตั้งค่า & ข้อมูลหลัก › ตั้งค่าคลัง › คลังและตำแหน่ง แสดง segment tabs คลังและโซน | ตำแหน่ง | ภาชนะ | ผังคลัง (UX-DR6)
   **And** ใน pilot module Phase 1 ที่ยังไม่ได้ทำยัง render ใน sidebar และเปิดหน้า placeholder "{module} ยังไม่เปิดใช้ในรอบนี้" / "รอบ pilot เปิดเฉพาะการตั้งค่าคลัง โซน ตำแหน่ง และภาชนะ · โมดูลนี้จะเปิดในรอบถัดไป" พร้อม "กลับหน้าแรก" และเอา placeholder นี้ออกเมื่อ module นั้น ship `[PILOT]`

**Visibility rules**

6. **Given** visibility rules
   **When** ประเมินเมนูแต่ละรายการ
   **Then** ใช้ rule ตามลำดับ phase → edition → จำนวน owner → add-on → permission → device binding โดย rule แรกที่สั่งซ่อนเป็นตัวตัดสิน (UX-DR7)
   **And** ตัวประเมินเป็น function กลางตัวเดียวที่ใช้ร่วมกันทั้ง nav, settings tabs, search และ PDA tiles (ในภายหลัง) มี unit test สำหรับแต่ละ rule และสำหรับลำดับ
   **And** รายการที่ถูกซ่อนต้องไม่โผล่ทั้งใน nav, global search, PDA tiles และ deep link (ซ่อนเท่านั้น ห้ามทำเป็นสีเทา) (UX-DR7)
   **And** deep link ไปยังหน้าที่ถูกซ่อน render ภายใน shell พร้อม "ไม่มีสิทธิ์เข้าหน้านี้ · ติดต่อผู้ดูแลระบบ" / "บทบาทของคุณยังไม่ได้รับสิทธิ์ดู{name}" (กรณี permission) หรือ "ฟีเจอร์นี้ไม่ได้เปิดใช้ในบริษัทของคุณ" / "{name}ไม่ได้อยู่ในแพ็กเกจหรือโมดูลเสริมที่บริษัทเปิดใช้" (กรณี edition/add-on) แต่ละกรณีมี "กลับหน้าแรก" (UX-DR7)
   **And** server ปฏิเสธข้อมูลและ action ของหน้านั้นด้วย การซ่อนจึงไม่ใช่ด่านป้องกันเพียงด่านเดียว (NFR-7)
   **And** ถ้าคลังมี owner รายเดียว ให้ซ่อน owner picker และคอลัมน์ owner (FR-DATA-1, UX-DR7)
   **And** ใน pilot rule ระดับ permission ยังไม่มีข้อมูล role จนกว่าจะทำ Story 1.8 แต่ยังถูกประเมินตามลำดับ และคืนค่า "visible" สำหรับ System Administrator ที่ seed ไว้ `[PILOT]`

**ตัวสลับคลัง**

7. **Given** user ที่มีมากกว่า 1 คลัง
   **When** เปิด warehouse switcher
   **Then** Dialog กว้าง 480px "เลือกคลัง" / "สลับคลังแล้วข้อมูลทุกหน้าจะเปลี่ยนเป็นของคลังที่เลือก" แสดงเฉพาะคลังที่มีสิทธิ์และไม่ถูกปิดใช้ (ชื่อ, รหัส, "ตำแหน่ง {n} · โซน {n}") ทำเครื่องหมายคลังปัจจุบันว่า "ใช้อยู่" และ focus ที่คลังนั้น (UX-DR9, NFR-11)
   **And** เลือกคลังอื่นแล้วโหลด data scope ใหม่ทุกหน้า ถ้าเลือกคลังปัจจุบันแค่ปิด dialog (UX-DR9)
   **And** ถ้ามี Sheet ที่มีการแก้ไขยังไม่ save การสลับคลังจะถาม "ทิ้งการแก้ไข?" ก่อน งานจึงไม่หายไปเงียบๆ (UX-DR9, UX-DR15)

**อัปเดตเวอร์ชันและออฟไลน์**

8. **Given** มีการ deploy frontend เวอร์ชันใหม่
   **When** user กำลังทำงานค้างอยู่
   **Then** แสดง info banner "มีเวอร์ชันใหม่ · รีเฟรชเมื่อจบงานนี้ งานที่ทำอยู่จะไม่หาย" พร้อม "ภายหลัง" และ "รีเฟรชตอนนี้" การอัปเดตมีผลเฉพาะเมื่อ user เลือก เมื่อจบงาน หรือเมื่อ sign in ครั้งถัดไป และห้าม block งาน (UX-DR47)

9. **Given** browser ขาดการเชื่อมต่อ
   **When** เปิดหน้าออฟฟิศหน้าใดอยู่
   **Then** แสดง warning banner "ขาดการเชื่อมต่อ · ข้อมูลอาจไม่ล่าสุด" ปุ่มเขียนข้อมูลทุกปุ่มถูก disable พร้อม tooltip "ออฟไลน์ · บันทึกไม่ได้จนกว่าจะเชื่อมต่อใหม่" และทั้งสองอย่างหายไปเมื่อเชื่อมต่อกลับมา (UX-DR20)

**Responsive**

10. **Given** ความกว้างหน้าจอออฟฟิศ
   **When** กว้าง ≥1440 / 1280–1439 / 1024–1279 / <1024px
   **Then** layout เป็นไปตามตาราง responsive ใน EXPERIENCE.md ได้แก่ sidebar เต็ม; ซ่อนคอลัมน์ P3 และ KPI เรียงแถวละ 3 ใบ; บังคับใช้ rail (ซ่อนปุ่มสลับ) และซ่อน P2–P3 ไว้หลัง "คอลัมน์"; sidebar เป็น Sheet แบบ off-canvas เปิดด้วยปุ่ม hamburger ("เปิดเมนู") มี focus trap และกด Esc เพื่อปิด ทำได้แค่อ่านกับ approve (UX-DR46, UX-DR42)
   **And** ที่ <1024px action สร้าง/แก้ไขทุกตัวถูกซ่อน และหน้า settings แสดง "หน้าจอแคบ · ดูข้อมูลได้ แก้ไขการตั้งค่าบนจอกว้าง 1024px ขึ้นไป" (UX-DR46)
   **And** desktop ขั้นต่ำที่รองรับคือ 1366×768 บน Chrome และ Edge สำหรับ Windows

---

### Story 1.5: Shared List Components — Status Badge, Data Table, Filter Bar, Bulk Actions and States

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** ให้ทุก list ในระบบทำงานเหมือนกัน
**เพื่อให้** เรียนรู้ pattern เดียวแล้วค้นหา กรอง export และสั่งงาน record ได้เร็ว

**Acceptance Criteria:**

**Status badge**

1. **Given** status ที่แสดงที่ใดก็ตาม
   **When** render status badge
   **Then** ใช้เฉพาะ map 5 tone (success / warning / destructive / neutral / info) แต่ละ badge มี icon + label ภาษาไทย + tone เป็น pill แบบ full-radius (label 13px, padding 2px 10px, icon 14px) และเมื่อ hover/focus มี tooltip บอกเวลาที่เปลี่ยน status และผู้ที่เปลี่ยน (UX-DR10)
   **And** icon เป็นไปตาม tone: success ใช้ check-circle, warning ใช้ clock/alert-triangle, destructive ใช้ x-octagon, neutral ใช้ circle-slash/lock, info ใช้ loader/info (UX-DR10)
   **And** สถานะเร่งด่วน (ด่วน/เร่งด่วน) เป็น destructive เสมอ และสถานะรออนุมัติเป็น warning เสมอ (UX-DR10)
   **And** ห้ามแสดง status ด้วยสีอย่างเดียว และห้ามใส่สีทั้งแถวตาม status (UX-DR42, UX-DR48)

**ตารางข้อมูล (data table)**

2. **Given** data table
   **When** render list
   **Then** แบ่งหน้าฝั่ง server (default 50 แถว ห้าม infinite scroll) เก็บ filter, sort และ page ไว้ใน URL (ใส่ `page` เฉพาะเมื่อ > 1 และใส่ `dir` เฉพาะเมื่อเรียงจากมากไปน้อย) มี header แบบ sticky สูง 40px แถวสูง 44px และคอลัมน์แรกแบบ sticky (รหัส/เลขเอกสารใช้ฟอนต์ mono สี primary) และตัวเลขชิดขวาแบบ tabular (UX-DR11)
   **And** pager แสดงปุ่มก่อนหน้า/ถัดไป ("หน้าก่อนหน้า"/"หน้าถัดไป"), หน้าแรก, หน้าสุดท้าย, หน้าปัจจุบัน ±1 และ "…" ซ่อนเมื่อมีหน้าเดียว และเลื่อนตารางขึ้นบนสุดเมื่อเปลี่ยนหน้า (UX-DR11)
   **And** บรรทัดจำนวน (aria-live polite) แสดง "{from}–{to} จาก {n} รายการ" และต่อท้าย " (กรองจาก {total})" เมื่อมีการกรอง (UX-DR11, UX-DR42)
   **And** คลิก header ที่ sort ได้เพื่อสลับเรียงน้อยไปมาก/มากไปน้อย พร้อม `aria-sort` ข้อความเรียงตามลำดับ locale ภาษาไทย และตัวเลขเรียงตามค่าตัวเลข (UX-DR11)
   **And** คอลัมน์กำหนด priority เป็น P1–P3 โดยซ่อน P3 เมื่อจอแคบกว่า 1440px และซ่อน P2 เมื่อแคบกว่า 1280px และมีเมนู "คอลัมน์" ("แสดงคอลัมน์เพิ่ม") ให้ user เปิดกลุ่มที่ซ่อนกลับมาได้ (UX-DR11, UX-DR46)
   **And** คลิกแถวหรือกด Enter บนแถวที่ focus อยู่เพื่อเปิดหน้า detail แต่การคลิก checkbox หรือเมนูของแถว ("…", aria-label "การทำงานของ{object} {code}") ไม่เปิด (UX-DR11, UX-DR42)
   **And** user บันทึก view พร้อมตั้งชื่อได้ (filter + sort + คอลัมน์) แยกต่อ user (UX-DR11)

**การ export**

3. **Given** list ที่มี Excel export
   **When** user export
   **Then** ไฟล์มีเฉพาะแถวที่ตรงกับ filter และ status tab ที่ใช้อยู่ (ครบทุกหน้า) โดย mask ข้อมูลแล้ว ใช้หัวคอลัมน์ภาษาไทย และใช้ label ภาษาไทยสำหรับค่า enum (ไม่ใช่ code ดิบ) และแสดง toast "ส่งออก {n} {object}แล้ว" (ต่อท้าย "ตามตัวกรองที่ใช้อยู่" เมื่อมีการกรอง) (UX-DR11)
   **And** ทุกการ export ถูกบันทึกเป็น `export` พร้อม filter ที่ใช้ (FR-107)

**Filter bar**

4. **Given** filter bar
   **When** user พิมพ์หรือสแกนในช่องค้นหา (กว้างอย่างน้อย 260px)
   **Then** ค้นหาแบบ debounce 300 ms และกด Enter แล้วค้นหาทันที เพื่อให้ Enter ที่ scanner ส่งต่อท้ายใช้ได้ (UX-DR12)
   **And** status tab แสดงจำนวนที่คิดตาม filter อื่นทุกตัวที่ใช้อยู่ tab ที่จำนวนเป็นงานที่ต้องทำแสดง chip สี destructive ได้ (UX-DR12)
   **And** มี select filter ได้ไม่เกิน 3 ตัว แต่ละตัวมี label สำหรับ accessibility (ซ่อนจากสายตา) (UX-DR12, UX-DR42)
   **And** "ล้างตัวกรอง" แสดงเฉพาะเมื่อมี filter หรือ status tab ที่ไม่ใช่ค่า default ใช้อยู่ และปุ่ม Export อยู่ขวาสุด (UX-DR12)

**Bulk action**

5. **Given** ตารางที่มีคอลัมน์ checkbox
   **When** มีการเลือกแถว
   **Then** bar ด้านล่างบนพื้น `foreground` แสดง "เลือก {n} รายการ", ปุ่ม action และ "ยกเลิกเลือก" ส่วน "เลือกทั้งหมดในหน้านี้" เลือกเฉพาะหน้าปัจจุบัน และแสดงสถานะ indeterminate เมื่อเลือกบางส่วน (UX-DR13)
   **And** การเลือกคงอยู่ข้ามหน้า และถูกล้างเมื่อ filter, คำค้นหา หรือ status tab เปลี่ยน
   **And** ปุ่ม action ถูก disable เมื่อไม่มีแถวที่เลือกแถวใดเข้าเงื่อนไขของ action นั้น
   **And** bar ถูกซ่อนขณะตารางกำลังโหลด ว่าง หรือ error

6. **Given** มีแถวที่ถูกเลือก
   **When** user สั่ง bulk action
   **Then** action มีผลกับทุกแถวที่เข้าเงื่อนไขและข้ามแถวที่เหลือ ผลลัพธ์บอกจำนวนที่ทำได้กับที่ข้ามพร้อมเหตุผล เช่น "ทำได้ 18 · ข้าม 2 (ล็อกนับอยู่)" ห้ามทำแบบทั้งหมดหรือไม่ทำเลยโดยไม่บอก (UX-DR13)
   **And** record ที่เปลี่ยนแต่ละตัวมี activity-log entry ของตัวเอง โดย mark ว่าเป็นส่วนหนึ่งของ bulk action (FR-107)

**สถานะของ list (states)**

7. **Given** list หรือ hub ที่กำลังโหลด, ว่าง, ว่างหลังกรอง, error, offline หรือ save ชนกัน
   **When** render
   **Then** ขณะโหลดแสดง skeleton rows และหลัง 10 วินาทีแสดง "ยังโหลดไม่เสร็จ" พร้อม "ลองใหม่" (UX-DR20)
   **And** empty state ครั้งแรกแสดง icon สี muted ขนาด 48px, บรรทัดหัวข้อระดับ h3, บรรทัดอธิบาย 1 บรรทัด และ setup action ไม่เกิน 1 ปุ่ม (UX-DR20)
   **And** ว่างหลังกรองแสดง "ไม่พบรายการตามตัวกรอง" / "ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง" พร้อม "ล้างตัวกรอง" และบรรทัดจำนวนแสดง "ไม่พบรายการ" (UX-DR20)
   **And** server error แสดงในตาราง "โหลดรายการไม่สำเร็จ" / "ระบบขัดข้องชั่วคราว · ลองโหลดใหม่ ถ้ายังไม่ได้ให้แจ้งผู้ดูแลระบบพร้อมรหัสอ้างอิง" พร้อม "โหลดใหม่" และมี toast สี destructive ที่ค้างไว้ ซึ่งต่อท้ายด้วย " · รหัสอ้างอิง {ref}" ด้วยฟอนต์ mono (UX-DR20, UX-DR21)
   **And** offline ปิดการเขียนข้อมูลเหมือนใน Story 1.4 (UX-DR20)
   **And** save ที่ชนกับการแก้ไขของคนอื่นแสดง "ข้อมูลเปลี่ยนแล้ว · มีผู้ใช้อื่นแก้{object}นี้ระหว่างที่คุณแก้ไข" พร้อม "โหลดใหม่" และ save ไม่ได้จนกว่าจะโหลดใหม่ (UX-DR20)
   **And** record ที่ปิดแล้วหรือปิดใช้แสดง badge neutral (เช่น "ปิดแล้ว", "ปิดใช้") แถวเป็นสี muted และซ่อน action แก้ไข (UX-DR20)
   **And** แถวที่ user เพิ่งเปลี่ยนกระพริบสั้นๆ (ไม่เกิน 300 ms ต่อครั้ง ไม่เกิน 3 ครั้งต่อวินาที และเป็นสีพื้นนิ่งเมื่อเปิด reduced motion) (UX-DR42)

**Toast**

8. **Given** toast ใดก็ตาม
   **When** แสดง toast
   **Then** toast ขึ้นที่มุมขวาล่าง กว้าง 400px ซ้อนกันได้ อยู่ใน region aria-live polite toast สำเร็จและ info หายเองหลัง 4 วินาที toast error ค้างจนกว่าจะปิดและใช้ `role="alert"` และทุก toast มีปุ่มปิด "ปิด" (UX-DR21)
   **And** toast ที่มีปุ่ม action (เช่น "พิมพ์ label {n} ใบ") ไม่หายเองขณะ focus หรือ hover อยู่ และ action เดียวกันต้องเข้าถึงได้จาก list ด้วย (UX-DR42, UX-DR48)

---

### Story 1.6: Shared Hub, Sheet and Confirmation Components

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** ให้ hub, drawer สร้าง/แก้ไข และ confirmation ทำงานแบบคาดเดาได้
**เพื่อให้** งานไม่หาย และไม่เผลอสั่ง action ที่ย้อนกลับไม่ได้

**Acceptance Criteria:**

**Hub**

1. **Given** hub ของ module
   **When** render KPI cards, queue cards และ pipeline bar
   **Then** ทั้ง card หรือทั้ง segment เป็นลิงก์ไปยัง queue ที่กรองแล้ว จำนวนที่เลยกำหนดใช้ chip สี danger-soft, segment ของ pipeline ใช้สี chart-1…5 เรียงตามลำดับขั้น และ hub แสดง "ข้อมูล ณ HH:MM" (UX-DR14)
   **And** แถว KPI มี card ได้สูงสุด 5 ใบ (แถวละ 3 ใบที่ 1366px) (UX-DR14, UX-DR46)
   **And** รายการที่ติด block ทุกตัวต้องเข้าถึงได้ภายใน 2 คลิกจาก hub (UX-DR14)
   **And** hub จะ ship ใน pilot หรือไม่ในเมื่อยังไม่มีหน้าที่ใช้งาน เป็นไปตามการตัดสินใจ `[OPEN D-10]`

**Sheet**

2. **Given** Sheet สร้าง/แก้ไขขนาด 560px
   **When** เปิดจากด้านขวา
   **Then** focus ถูก trap ไว้ใน Sheet, field แรกที่ใช้งานได้ได้ focus ส่วนหัวแสดง title, subtitle และปุ่มปิด "ปิด" ส่วน body scroll ได้ และ footer แบบ sticky มี "ยกเลิก" และปุ่ม primary อยู่ทางขวา (UX-DR15)
   **And** ฟอร์มใช้ 2 คอลัมน์ที่ ≥1280px และ 1 คอลัมน์เมื่อแคบกว่านั้น (UX-DR3, UX-DR46)
   **And** กด Ctrl+Enter เพื่อ save (UX-DR15)
   **And** คลิก backdrop ไม่ปิด Sheet
   **And** เมื่อปิด focus กลับไปที่ element ที่เปิด Sheet (UX-DR42)

3. **Given** Sheet ที่มีการแก้ไขยังไม่ save
   **When** user กด Esc, ปุ่มปิด หรือ "ยกเลิก"
   **Then** AlertDialog "ทิ้งการแก้ไข?" / "ข้อมูลที่กรอกไว้ในฟอร์มนี้จะหายไป" มีปุ่ม "กลับไปแก้ไขต่อ" (ได้ focus) และ "ทิ้งการแก้ไข" (destructive) (UX-DR15)
   **And** ถ้าไม่มีการแก้ไขที่ยังไม่ save Sheet ปิดทันที

4. **Given** ฟอร์มใน Sheet
   **When** user save โดยมี validation error
   **Then** Sheet ยังเปิดอยู่ field ที่ผิดแต่ละตัวแสดง icon x-octagon และข้อความใต้ field พร้อม `aria-invalid` field ที่บังคับกรอกมี "*" สีแดง สรุปด้านบนแสดง "แก้ไข {n} ช่องก่อนบันทึก · {label1}, {label2}" พร้อมลิงก์ไปที่ field และ scroll ไปและ focus ที่ error แรก (UX-DR15)
   **And** validation error จากฝั่ง server แสดงแบบเดียวกับฝั่ง client

5. **Given** หน้าใดก็ตาม
   **When** มี Sheet เปิดอยู่
   **Then** เปิด Sheet ที่สองไม่ได้ และห้ามเปิด Dialog ซ้อนบน Sheet ยกเว้น AlertDialog (UX-DR15, UX-DR48)

**Confirmation และปุ่ม**

6. **Given** action ที่ทำลายข้อมูล
   **When** user สั่ง action นั้น
   **Then** AlertDialog กว้าง 480px (`role="alertdialog"`) มี icon ตาม tone (danger x-octagon / warning alert-triangle / info) ระบุชื่อสิ่งที่จะถูกกระทำและผลที่จะเกิดใน title และ body และ focus เริ่มที่ "ยกเลิก" กด Esc เพื่อยกเลิก (UX-DR16)
   **And** dialog มี field "เหตุผล*" แบบบังคับได้ ถ้ายืนยันโดยไม่กรอกจะแสดง "ระบุเหตุผลก่อนยืนยัน" action ที่กระทบสต็อกแบบย้อนกลับไม่ได้ต้องมี field นี้เสมอ (UX-DR16)
   **And** dialog เป็นแบบแจ้งข้อมูลอย่างเดียวได้ (ปุ่มเดียว เช่น "เข้าใจแล้ว") เมื่อ action ถูกปฏิเสธ
   **And** action ที่ทำลายข้อมูลอยู่ในเมนูของแถวหรือ overflow menu ห้ามเป็นปุ่ม primary ที่ header ของหน้า และ header ของหน้ามีปุ่มได้ไม่เกิน primary 1 ปุ่ม + secondary 2 ปุ่ม + overflow (UX-DR16)

7. **Given** ปุ่มใดก็ตามที่เรียก server action
   **When** กดปุ่ม
   **Then** ปุ่มแสดง spinner ถูก disable และเป็น `aria-busy` จนได้ response จึงกดส่งซ้ำไม่ได้ (UX-DR16)
   **And** ปุ่มยืนยันใช้คำว่า กริยา + สิ่งที่ถูกกระทำ (เช่น "ปิดใช้ A-01-01", "ส่งคำขอปิดใช้") ห้ามใช้ "ตกลง"/"OK" (UX-DR16)

---

### Story 2.1: Warehouses and Zones

**ในฐานะ** admin
**ฉันต้องการ** สร้างคลังและโซน
**เพื่อให้** ระบบตรงกับพื้นที่จริง

**Acceptance Criteria:**

**หน้าจอ**

1. **Given** หน้า ตั้งค่า & ข้อมูลหลัก › ตั้งค่าคลัง › คลังและตำแหน่ง › คลังและโซน
   **When** admin เปิดหน้านี้
   **Then** หน้าแสดง 2 panel: "คลัง" ("{n} คลัง · ใช้งาน {active}", ปุ่ม "เพิ่มคลัง") และ "โซนใน{warehouse name}" ("{n} โซน", ปุ่ม primary "เพิ่มโซน" และ select คลังที่แสดงคลังที่ไม่ถูกปิดใช้ในรูป "{name} ({code})" ซึ่ง sync กับ URL เป็น `wh`) (FR-8, UX-DR16)
   **And** ทั้งสองตารางเป็นไปตาม Story 1.5 (sort อยู่ใน URL, 50 แถวต่อหน้า) และไม่มี search, status tab, bulk action หรือ export

**รายการคลัง**

2. **Given** ตารางคลัง
   **When** render
   **Then** คอลัมน์คือ รหัส (sticky, mono) · ชื่อคลัง (มี tag "ใช้อยู่" ที่คลังปัจจุบัน) · โซน · ตำแหน่ง (P2) · สต็อก (ชิ้น) · สถานะ · เมนูของแถว (FR-8)
   **And** สถานะเป็น 1 ใน "ใช้งาน" (success), "รออนุมัติปิดใช้" (warning, icon นาฬิกา, tooltip "ส่งคำขอโดย {name}") หรือ "ปิดใช้" (neutral, แถวสี muted) (UX-DR10)
   **And** เมนูของแถวมี "แก้ไขคลัง", "ดูโซนของคลังนี้" (ตั้ง panel โซนเป็นคลังนั้นและ scroll ไปที่ panel) และ "ปิดใช้คลัง" (danger) หรือ "ยกเลิกคำขอปิดใช้" เมื่อมีคำขอค้างอยู่
   **And** คลังที่ปิดใช้แล้วเปิดแก้ไขไม่ได้ และไม่มี action ปิดใช้

**สร้าง / แก้ไขคลัง**

3. **Given** Sheet "เพิ่มคลัง" ("คลังใหม่จะเลือกได้ในตัวเลือกคลังของผู้ใช้ที่มีสิทธิ์")
   **When** admin save
   **Then** รหัสคลัง* ต้องเป็นตัวอักษร A–Z 3 ตัวพอดี (input ถูกแปลงเป็นตัวพิมพ์ใหญ่และตัดอักขระอื่นทิ้งขณะพิมพ์; hint "ภาษาอังกฤษ 3 ตัว ไม่ซ้ำกับคลังอื่น เช่น BKN") และ ชื่อคลัง* ยาว 1–60 ตัวอักษรหลัง trim (FR-8)
   **And** ข้อความ error คือ "กรอกรหัสคลัง", "รหัสคลังต้องมี 3 ตัว", "รหัส {CODE} ถูกใช้แล้ว · เลือกรหัสอื่น", "กรอกชื่อคลัง"
   **And** รหัสต้องไม่ซ้ำภายใน tenant รวมถึงคลังที่ปิดใช้แล้ว `[OPEN D-17: tenant vs global uniqueness]` ส่วนชื่อซ้ำกันได้
   **And** เมื่อสำเร็จ toast แสดง "เพิ่มคลัง {CODE} แล้ว" / "เลือกคลังนี้ในตัวเลือกคลังได้ทันที · ต่อไปเพิ่มโซน" System Administrator ได้สิทธิ์เข้าคลังนี้ และคลังนี้เลือกได้ใน warehouse switcher ของ user ที่มีสิทธิ์ในคลังนั้น (FR-8, NFR-11)
   **And** บันทึก `warehouse.create` (FR-107)

4. **Given** คลังที่มีอยู่แล้ว
   **When** admin เปิด "แก้ไขคลัง {CODE}"
   **Then** แก้ได้เฉพาะชื่อ field รหัสถูก disable พร้อมหมายเหตุ "รหัสคลังแก้ไม่ได้หลังสร้าง เพราะใช้อ้างอิงในเอกสารและ label"
   **And** save แล้วแสดง "บันทึกคลัง {CODE} แล้ว" และบันทึก `warehouse.edit` พร้อมชื่อเก่า → ชื่อใหม่ (FR-107)

**โซน**

5. **Given** คลังที่เลือกไว้ใน panel โซน
   **When** admin save Sheet "เพิ่มโซน" (subtitle "{warehouse name} ({code})")
   **Then** สร้างโซนในคลังนั้นด้วย รหัสโซน* (1–3 ตัว A–Z/0–9 แปลงเป็นตัวพิมพ์ใหญ่ ไม่ซ้ำภายในคลัง; hint "1–3 ตัว ใช้เป็นตัวหน้าของรหัสตำแหน่ง เช่น A → A-01-01"), ชื่อโซน* (1–60), ประเภทห้อง* (default ทั่วไป), ความจุ* เป็น m³ (ทศนิยม > 0) และ รูปแบบลำดับการเดิน* (radio card พร้อมแผนภาพ; default งูเลื้อย) (FR-8)
   **And** ประเภทห้องคือ ทั่วไป / ควบคุมอุณหภูมิ / ของมีค่า `[OPEN D-11]` และรูปแบบลำดับการเดินคือ งูเลื้อย (snake) / ทางเดียว (one-way) / ตามรหัสตำแหน่ง (by code) พร้อมคำอธิบาย "ระบบใช้ลำดับนี้เรียงตำแหน่งตอนหยิบและจัดเก็บในโซนนี้" `[OPEN D-12: exact effect]`
   **And** ข้อความ error คือ "กรอกรหัสโซน", "โซน {CODE} มีอยู่แล้วในคลังนี้", "กรอกชื่อโซน", "กรอกความจุ", "ความจุต้องเป็นตัวเลขมากกว่า 0"
   **And** toast แสดง "เพิ่มโซน {CODE} แล้ว" / "ต่อไปสร้างตำแหน่งในโซนนี้" และบันทึก `zone.create` (FR-107)

6. **Given** ตารางโซน
   **When** render
   **Then** คอลัมน์คือ รหัสโซน (sticky, mono) · ชื่อโซน · ประเภทห้อง · ความจุ (m³) · ลำดับการเดิน (P2) · ตำแหน่ง (จำนวน เป็นลิงก์ไป tab ตำแหน่งที่กรองตามโซนนั้นเมื่อ > 0) · เมนูของแถว ("แก้ไขโซน", "ดูตำแหน่งในโซนนี้", "สร้างตำแหน่งในโซนนี้" → Sheet สร้างแบบ bulk ที่เลือกโซนไว้แล้ว)
   **And** ลิงก์จากโซนไปตำแหน่งถูก disable พร้อม tooltip "สลับคลังก่อนดูตำแหน่ง" เมื่อโซนนั้นอยู่ในคลังอื่นที่ไม่ใช่คลังปัจจุบัน
   **And** การแก้ไขโซน ("แก้ไขโซน {CODE}") แก้ได้ทุกอย่างยกเว้นรหัส แสดง "บันทึกโซน {CODE} แล้ว" และบันทึก `zone.edit` เฉพาะ field ที่เปลี่ยน ค่าเก่า → ค่าใหม่ (FR-107)

**ปิดใช้คลัง**

7. **Given** คลังที่มีสต็อกอยู่
   **When** admin เลือก "ปิดใช้คลัง"
   **Then** dialog แจ้งข้อมูล "ปิดใช้{name} ({CODE}) ไม่ได้" / "ยังมีสต็อก {n} ชิ้นในคลังนี้ · ย้ายหรือตัดสต็อกออกให้เหลือ 0 ก่อน แล้วค่อยขอปิดใช้" มีแค่ปุ่ม "เข้าใจแล้ว" และไม่มีอะไรเปลี่ยน (FR-8)
   **And** อ่านสต็อกผ่าน stock-check interface จนกว่าจะมี stock ledger (Epic 4) interface นี้คืนค่า 0 `[PILOT]`

8. **Given** คลังที่ไม่มีสต็อกเลย
   **When** admin เลือก "ปิดใช้คลัง"
   **Then** warning dialog "ขออนุมัติปิดใช้{name} ({CODE})?" / "คลังนี้ไม่มีสต็อกแล้ว · การปิดใช้ต้องผ่านผู้อนุมัติ เมื่ออนุมัติแล้วคลังนี้จะไม่แสดงในตัวเลือกคลัง" บังคับกรอก "เหตุผลที่ปิดใช้*" และยืนยันด้วย "ส่งคำขอปิดใช้" (FR-8, FR-105, UX-DR16)
   **And** คลังเปลี่ยนเป็น "รออนุมัติปิดใช้" และยังใช้งานได้ตามปกติ (ยังอยู่ใน switcher) จนกว่าคำขอจะถูกตัดสิน toast แสดง "ส่งคำขอปิดใช้ {CODE} แล้ว" / "รออนุมัติ · สถานะจะเปลี่ยนเมื่อมีผลอนุมัติ" และบันทึก `warehouse.request-disable` พร้อมเหตุผล (FR-107)
   **And** "ยกเลิกคำขอปิดใช้" ถอนคำขอทันที แสดง "ยกเลิกคำขอปิดใช้ {CODE} แล้ว" และบันทึก `warehouse.cancel-disable` (FR-107)
   **And** คำขอถูกตัดสินผ่าน approvals engine (Story 1.11) ตอนอนุมัติระบบเช็คสต็อกอีกครั้ง ถ้าตอนนั้นคลังมีสต็อกจะถูกปฏิเสธ เมื่ออนุมัติแล้วคลังเป็น "ปิดใช้" หายไปจากทุก switcher และ picker และบันทึก `warehouse.disable` (FR-105, FR-107)
   **And** pilot จะทำให้คำขอเสร็จสิ้นอย่างไรเมื่อไม่มี Story 1.11 เป็นไปตามการตัดสินใจ `[OPEN D-2]` (A: ไม่ต้องอนุมัติ ยืนยันพร้อมเหตุผลแล้วปิดใช้ทันที; B: ทำ Story 1.11 ใน pilot)

**ไม่อยู่ใน scope ของ story นี้**

- การเปิดใช้คลังที่ปิดใช้แล้วกลับมา, การลบคลัง และการปิดใช้หรือลบโซน
- ที่อยู่คลังและปฏิทินการทำงาน (Story 2.10/FR-16)

---

### Story 2.2: Locations and Location Labels

**ในฐานะ** admin
**ฉันต้องการ** สร้าง location ทีละตัวหรือแบบ bulk และพิมพ์ QR label ได้
**เพื่อให้** ทุกที่ที่วางสต็อกได้สแกนได้

**Acceptance Criteria:**

**รายการ**

1. **Given** หน้า ตั้งค่าคลัง › คลังและตำแหน่ง › ตำแหน่ง
   **When** เปิดหน้า
   **Then** header แสดง "ตำแหน่ง" / "{n} ตำแหน่งใน {z} โซน · label ยังไม่พิมพ์ {k}" พร้อม "สร้างทีละตำแหน่ง" (outline) และ "สร้างหลายตำแหน่ง" (primary) (FR-8)
   **And** ตารางเป็นไปตาม Story 1.5 มีคอลัมน์ รหัสตำแหน่ง (sticky, mono) · โซน · ประเภท · ขายได้ (P2, "✓ ขายได้" หรือ "ไม่นับ" สี muted) · ลำดับเดิน (P2) · ความจุ (P3, "{m³ 1 dp} m³" และ "{kg} kg" ด้านล่าง) · การผสม (P3) · Label (P2) · สถานะ · เมนูของแถว และ sort default คือลำดับเดินจากน้อยไปมาก
   **And** status tab คือ ทั้งหมด · ใช้งาน · ปิดใช้ · ล็อกนับ พร้อมจำนวน filter คือ search (placeholder "ค้นหาหรือสแกนรหัสตำแหน่ง", match รหัสแบบไม่สนตัวพิมพ์เล็ก/ใหญ่), โซน, ประเภท และ label (ยังไม่พิมพ์ / พิมพ์แล้ว / สำเนา) filter ทั้งหมดอยู่ใน URL เพื่อให้ deep link อย่าง `?zone=A` ใช้ได้
   **And** empty state ครั้งแรกแสดง "ยังไม่มีตำแหน่งในคลังนี้" / "สร้างทีละหลายตำแหน่งจากรูปแบบช่วง เช่น ทางเดิน A แถว 01–10 ชั้น 01–04" พร้อม "สร้างหลายตำแหน่ง"
   **And** Excel export (Story 1.5) มีคอลัมน์ รหัสตำแหน่ง, โซน, ประเภท, ขายได้, ลำดับเดิน, m³, kg, การผสม, label, สถานะ

**ข้อมูลของ location**

2. **Given** โซน 1 โซน
   **When** admin สร้าง location ด้วย "สร้างทีละตำแหน่ง"
   **Then** Sheet "สร้างตำแหน่ง" ให้กรอก: รหัสตำแหน่ง* (1–20 ตัว A–Z, 0–9, "." และ "-" แปลงเป็นตัวพิมพ์ใหญ่; hint "ไม่ซ้ำภายในคลัง เช่น A-01-01"), โซน* (default: โซนที่กรองอยู่ ถ้าไม่มีใช้โซนแรก), ประเภทตำแหน่ง* (default เก็บ), ลำดับการเดิน* (จำนวนเต็ม ≥ 0, default ค่าสูงสุดในคลัง + 1), ความจุปริมาตร* (m³ > 0), รับน้ำหนักได้* (kg > 0), การผสมสินค้า* (default หลาย SKU · ห้ามผสมล็อต), switch "ขายได้" ("สต็อกในตำแหน่งนี้นับเป็นยอดพร้อมขาย") และ switch "เปิดใช้" ("ปิดใช้แล้วจัดเก็บและย้ายของเข้าตำแหน่งนี้ไม่ได้") (FR-8)
   **And** ประเภทเป็น 1 ใน 8 แบบ: หยิบ pick, เก็บ storage, รับเข้า receiving, พักสินค้า staging, ส่งมอบ handover, คืน returns, รอคืนชั้น awaiting-restock, ชำรุด/กักกัน damaged/quarantine (FR-8)
   **And** "ขายได้" default เปิดสำหรับ หยิบ/เก็บ และปิดสำหรับประเภทอื่นทั้งหมด เปลี่ยนตามเมื่อเปลี่ยนประเภท และยัง override เองได้
   **And** นโยบายการผสมเป็น 1 ใน SKU เดียว / หลาย SKU · ห้ามผสมล็อต / ผสมได้ `[OPEN D-13]`
   **And** ข้อความ error คือ "กรอกรหัสตำแหน่ง", "{code} มีอยู่แล้วในคลังนี้", "ลำดับการเดินต้องเป็นตัวเลข", "กรอกความจุเป็นตัวเลขมากกว่า 0", "กรอกน้ำหนักเป็นตัวเลขมากกว่า 0"
   **And** รหัสไม่จำเป็นต้องขึ้นต้นด้วยรหัสโซน และลำดับเดินไม่จำเป็นต้องไม่ซ้ำ
   **And** เมื่อสำเร็จ toast แสดง "สร้าง {code} แล้ว" / "label ยังไม่พิมพ์ · เลือกแล้วกดพิมพ์ label ได้จากรายการ" สถานะ label เป็น ยังไม่พิมพ์ และบันทึก `location.create` (FR-107)

3. **Given** location ที่มีอยู่แล้ว
   **When** admin เปิด location นั้น (คลิกแถว หรือ "แก้ไขตำแหน่ง")
   **Then** Sheet "ตำแหน่ง {code}" แก้ได้ทุก field ยกเว้นรหัส save ด้วย "บันทึกตำแหน่ง" แสดง "บันทึก {code} แล้ว" และบันทึก `location.edit` พร้อม field ที่เปลี่ยน ค่าเก่า → ค่าใหม่ (FR-107)

**สร้างแบบ bulk**

4. **Given** รูปแบบช่วง (เช่น aisle A, row 01–10, level 01–04)
   **When** admin ใช้ "สร้างหลายตำแหน่ง" ("กำหนดรูปแบบรหัสเป็นช่วง ระบบสร้างทุกรหัสในครั้งเดียว")
   **Then** กำหนด โซน*, ประเภทตำแหน่ง*, ตัวหน้า* (1–6 ตัว A–Z/0–9 เติมรหัสโซนให้ก่อน และเติมใหม่เมื่อเปลี่ยนโซน), ตัวคั่น (ขีด "-" default / จุด "." / ไม่มี) และช่วงตัวเลข 1–4 ช่วง "ช่วงที่ N" (ตั้งแต่ / ถึง; default 01–10 และ 01–04) (FR-8)
   **And** สร้างรหัสเป็น PREFIX{sep}N1{sep}N2… ครบทุก combination แต่ละช่วงเติม 0 ด้านหน้าให้ยาวเท่ากับค่าที่ยาวกว่าระหว่าง ตั้งแต่/ถึง ("01" → 2 หลัก, "1" → ไม่เติม)
   **And** "เพิ่มช่วง" เพิ่มช่วงได้ถึง 4 ช่วง ("เพิ่มได้สูงสุด 4 ช่วง") และลบช่วงสุดท้ายที่เหลืออยู่ไม่ได้
   **And** ค่า default ของทุก location ที่สร้างกำหนดครั้งเดียว: ลำดับการเดินเริ่มที่* (default ค่าสูงสุด + 1), การผสมสินค้า*, m³* (default 1.5), kg* (default 800), "ขายได้" (default ตามประเภท)
   **And** preview แบบ live (aria-live) แสดง "{n} ตำแหน่งใหม่", รหัสทั้งหมดเมื่อ ≤ 10 หรือ 6 ตัวแรก + "…" + 2 ตัวสุดท้าย, "ข้าม {d} รหัสที่มีอยู่แล้ว" พร้อมขีดฆ่ารหัสที่มีอยู่แล้ว และ "ลำดับเดิน {start}–{end}" ปุ่มแสดง "สร้าง {n} ตำแหน่ง"
   **And** รหัสที่มีอยู่แล้วถูกข้าม ไม่ถูกเขียนทับ ระบบปฏิเสธเฉพาะเมื่อทุกรหัสมีอยู่แล้ว ("ทุกรหัสในช่วงนี้มีอยู่แล้ว · เปลี่ยนช่วงหรือตัวหน้า")
   **And** ข้อความ error คือ "กรอกตัวหน้าของรหัส", "ช่วงต้องเป็นตัวเลข และ “ถึง” ต้องไม่น้อยกว่า “ตั้งแต่”", "สร้างได้ครั้งละไม่เกิน 2,000 ตำแหน่ง · แบ่งเป็นหลายรอบ", "ลำดับเริ่มต้องเป็นตัวเลข"
   **And** location ทั้งหมดในรอบเดียวถูกสร้างใน transaction เดียว (สร้างทั้งหมดหรือไม่สร้างเลย) โดยรหัสไม่ซ้ำภายในคลัง (FR-8)
   **And** ลำดับเดินถูกกำหนดต่อเนื่องจากค่าเริ่มต้น ตามลำดับที่ได้จากรูปแบบลำดับการเดินของโซน `[OPEN D-12]`
   **And** เมื่อสำเร็จ list กรองไปที่โซนนั้น แถวใหม่กระพริบ และ toast "สร้าง {n} ตำแหน่งแล้ว" / "{first} – {last} · ข้าม {d} (มีอยู่แล้ว)" มีปุ่ม "พิมพ์ label {n} ใบ" และบันทึก `location.bulk-create` 1 entry พร้อมรหัสแรก รหัสสุดท้าย และจำนวน (FR-107)
   **And** `?new=bulk&zone={code}` เปิด Sheet แบบ bulk โดยเลือกโซนไว้แล้ว

**ปิดใช้ / เปิดใช้**

5. **Given** location ที่ใช้งานอยู่
   **When** admin เลือก "ปิดใช้" (จากเมนูของแถว หรือ switch "เปิดใช้")
   **Then** confirm "ปิดใช้ตำแหน่ง {code}?" / "ตำแหน่งนี้จะรับของเข้าไม่ได้ ทั้งการจัดเก็บและการย้ายเข้า · เปิดใช้กลับได้ภายหลัง" พร้อมปุ่ม "ปิดใช้ {code}" ตั้งสถานะเป็น ปิดใช้ (badge neutral, แถวสี muted) ซึ่ง flow ถัดๆ ไปถือว่าห้าม putaway และห้ามย้ายของเข้า (FR-8)
   **And** "เปิดใช้" บน location ที่ปิดใช้อยู่มีผลทันทีโดยไม่ต้อง confirm
   **And** การเปลี่ยนแต่ละครั้งแสดง "ปิดใช้ {code} แล้ว" / "เปิดใช้ {code} แล้ว" และบันทึก `location.disable` / `location.enable` (FR-107)

6. **Given** location ที่เลือกไว้
   **When** admin ใช้ "ปิดใช้" หรือ "เปิดใช้" แบบ bulk
   **Then** confirm "ปิดใช้ {n} ตำแหน่ง?" (เฉพาะ bulk ปิดใช้) มีผลกับแถวที่เข้าเงื่อนไข และรายงาน "ทำได้ {ok} · ข้าม {s} ({reasons})" โดยเหตุผลคือ ล็อกนับอยู่ / ปิดใช้อยู่แล้ว / เปิดใช้อยู่แล้ว (UX-DR13)

7. **Given** location ที่ล็อกนับอยู่ (ล็อกนับ, badge info พร้อม icon แม่กุญแจ, tooltip "ตั้งโดยระบบระหว่างรอบนับ")
   **When** admin เปิดหรือสั่ง action กับ location นั้น
   **Then** ตั้งหรือปลด ล็อกนับ เองไม่ได้จากทุกที่ Sheet แสดง "ตำแหน่งนี้ล็อกนับอยู่ · ระบบปลดล็อกเองเมื่อรอบนับเสร็จ ระหว่างนี้แก้สถานะไม่ได้" โดย switch "เปิดใช้" ถูก disable และเมนูของแถวแสดง "ปิดใช้ไม่ได้ · ล็อกนับอยู่" (FR-8)
   **And** field อื่นยังแก้ได้ระหว่างล็อก
   **And** ใน pilot สถานะนี้มีเฉพาะในข้อมูลที่ seed ไว้ เพราะการนับสต็อกอยู่ใน Epic 6 `[PILOT]`

**Label**

8. **Given** location ที่เลือกไว้ (เมนูของแถว "พิมพ์ label"/"พิมพ์ label ซ้ำ" หรือ bulk bar)
   **When** admin พิมพ์ label
   **Then** dialog "พิมพ์ label ตำแหน่ง" ("{n} ใบ · พิมพ์ซ้ำ {r} · ข้าม {k} ที่พิมพ์แล้ว") ให้เลือกขนาด 50 × 30 มม. (default) หรือ 100 × 50 มม. และ "พิมพ์เฉพาะที่ยังไม่พิมพ์" (เลือกไว้เป็น default และแสดงเฉพาะเมื่อที่เลือกมีทั้งที่พิมพ์แล้วและยังไม่พิมพ์) (FR-8)
   **And** label แต่ละใบแสดง QR ที่ encode `LOC:{warehouse code}:{location code}`, รหัสด้วยฟอนต์ mono ตัวหนา, "{warehouse code} · โซน {zone code} {zone name}" และประเภท
   **And** การพิมพ์ซ้ำต้องกรอก "เหตุผลที่พิมพ์ซ้ำ*" ("ระบุเหตุผลก่อนพิมพ์ซ้ำ") และ label ที่พิมพ์ซ้ำมีคำว่า "สำเนา"
   **And** preview แสดงได้สูงสุด 60 ใบ ("แสดงตัวอย่าง 60 ใบแรกจาก {n}") และ "พิมพ์ {n} label" ส่งไปที่ browser print `[PILOT: D-3]`
   **And** สถานะ label เป็น พิมพ์แล้ว หรือ สำเนา #{n} สำหรับการพิมพ์ซ้ำ toast แสดง "ส่งพิมพ์ {n} label แล้ว" และบันทึก `label.print` / `label.reprint` พร้อมเหตุผล (FR-107)

**Data model**

9. **Given** SKU 1 ตัว
   **When** มีการวางสต็อกในภายหลัง
   **Then** data model รองรับให้ SKU เดียวอยู่ได้หลาย location และหลาย SKU อยู่ใน location เดียวได้ (ภายใต้นโยบายการผสมของ location นั้น) (FR-8)
   **And** ใน pilot ตรวจที่ระดับ schema เพราะ SKU มาใน Epic 3 `[PILOT]`

**ไม่อยู่ใน scope ของ story นี้**

- การลบ location; การ import location จาก Excel (FR-112); คอลัมน์สต็อก

---

### Story 2.3: Container Types and Container Labels

**ในฐานะ** admin
**ฉันต้องการ** ลงทะเบียนประเภท container และพิมพ์ QR label ถาวร
**เพื่อให้** ติดตาม pallet, tote, cart และกระสอบได้ทุกขั้นตอน

**Acceptance Criteria:**

**หน้าจอ**

1. **Given** หน้า ตั้งค่าคลัง › คลังและตำแหน่ง › ภาชนะ
   **When** เปิดหน้า
   **Then** แสดง 2 panel ของคลังปัจจุบัน: "ประเภทภาชนะ" ("{n} ประเภท · {n} ใบ", ปุ่ม primary "ลงทะเบียนภาชนะ") และ "ภาชนะทั้งหมด" (FR-10)
   **And** ตารางประเภทมีคอลัมน์ ตัวหน้า (sticky) · ประเภท · จำนวน · ขั้นตอนที่ใช้ (tag) · ความจุ ("{kg} kg · {qty} ชิ้น" หรือ "—") · การใช้งานตอนนี้ ("ใช้อยู่ {n} · ว่าง {n}" และ "ต้องเคลียร์ {n}" สี warning เมื่อ > 0) · เมนูของแถว ("สร้างเพิ่ม", "พิมพ์ label ที่ยังไม่พิมพ์", "ดูภาชนะประเภทนี้")
   **And** คลิกแถวประเภทแล้วตาราง container กรองตามประเภทนั้นและ scroll ไปที่ตาราง
   **And** empty state แสดง "ยังไม่มีภาชนะ" / "ลงทะเบียนพาเลท ตะกร้า รถเข็น หรือถุงส่งมอบ แล้วพิมพ์ QR ติดภาชนะ" พร้อม "ลงทะเบียนภาชนะ"

**ลงทะเบียน container**

2. **Given** Sheet "ลงทะเบียนภาชนะ" ("ระบบสร้างภาชนะตามจำนวน ทุกใบมี QR ถาวรของตัวเอง")
   **When** admin กรอกข้อมูล
   **Then** ประเภทภาชนะ* เป็น 1 ใน PL พาเลท, TT ตะกร้า, BG ถุงส่งมอบ, CG กรง, C20/C30/C40 รถเข็น 20/30/40 ช่อง, FC รถเข็นพื้นเรียบ, PW Put wall, DMG-T ตะกร้าของชำรุด พร้อม hint "มีอยู่แล้ว {n} ใบ · ใบใหม่ต่อจากรหัสล่าสุด" หรือ "ประเภทใหม่ในคลังนี้" (FR-10)
   **And** รหัสแรก* default เป็นเลขว่างถัดจากรหัสสูงสุดที่มีอยู่ของ prefix นั้น ({PREFIX}-{number} เลข 3 หลัก หรือ 4 หลักเมื่อประเภทนั้นมีอยู่แล้ว ≥ 100 ใบ), จำนวน* default เป็น 10 สำหรับประเภทใหม่, ขั้นตอนที่ใช้* เลือกได้ 1 อย่างขึ้นไปจาก รับเข้า · จัดเก็บ · หยิบ · คัดแยก · แพ็ค · ส่งมอบ · ตีกลับ `[OPEN D-14]` ส่วน รับน้ำหนักได้ (kg) และ จุได้ (ชิ้น) ไม่บังคับกรอก
   **And** ตำแหน่งที่วางตอนสร้าง* รับรหัส location ของคลังนี้ที่พิมพ์หรือสแกน ("ภาชนะทุกใบต้องอยู่ในตำแหน่งเสมอ · สแกน QR ตำแหน่งใส่ช่องนี้ได้") โดยเติม location ที่ใช้ล่าสุดของประเภทนั้นไว้ก่อน (FR-10)
   **And** สำหรับประเภทที่มีอยู่แล้ว ขั้นตอนที่ใช้ ความจุ และ location default ถูกเติมจากประเภทนั้น
   **And** preview แบบ live แสดง "{n} ใบ" และ "{first} ถึง {last}" หรือ "ชนกับรหัสที่มี {n} ใบ" สี destructive ปุ่มแสดง "สร้าง {n} ภาชนะ"

3. **Given** ฟอร์มลงทะเบียน
   **When** admin save โดย input ไม่ถูกต้อง
   **Then** ข้อความ error คือ "รหัสแรกต้องขึ้นต้นด้วย {P}- แล้วตามด้วยตัวเลข เช่น {P}-001", "รหัส {code} มีอยู่แล้ว · เริ่มที่รหัสถัดไป", "กรอกจำนวนเป็นตัวเลขมากกว่า 0", "สร้างได้ครั้งละไม่เกิน 1,000 ใบ", "เลือกอย่างน้อย 1 ขั้นตอน", "เลือกตำแหน่งที่วางภาชนะ", "ไม่พบตำแหน่ง {code} ที่เปิดใช้ในคลังนี้"
   **And** ความจุ ถ้ากรอก ต้องเป็นตัวเลข > 0 ("ความจุต้องเป็นตัวเลขมากกว่า 0")
   **And** รหัสในช่วงที่ชนกับรหัสที่มีอยู่แม้แต่ตัวเดียวจะ block ทั้ง batch (ไม่สร้างบางส่วน)

4. **Given** ฟอร์มที่ถูกต้อง
   **When** admin save
   **Then** ระบบสร้าง container ตามจำนวนที่กำหนดพอดี เลขต่อเนื่องจากรหัสแรก (เติม 0 ด้านหน้าให้เท่ากับจำนวนหลักของรหัสแรก เลขที่ยาวเกินจำนวนหลักก็ยาวขึ้นตามจริง) ทุกใบว่าง อยู่ใน location ที่เลือก สถานะ label เป็น ยังไม่พิมพ์ และสร้างใน transaction เดียว (FR-10)
   **And** ขั้นตอนที่ใช้ ความจุ และ location default ของประเภทถูกอัปเดตเป็นค่าที่เพิ่งกรอก
   **And** ตาราง container กรองไปที่ container ใหม่ที่ยังไม่พิมพ์ แถวเหล่านั้นกระพริบ และ toast "สร้าง {n} ภาชนะแล้ว" / "{first} – {last} · วางที่ {loc}" มีปุ่ม "พิมพ์ QR {n} ใบ"
   **And** บันทึก `container.generate` 1 entry พร้อมช่วงรหัส จำนวน และ location (FR-107)

**รายการ container**

5. **Given** ตาราง container
   **When** render
   **Then** คอลัมน์คือ checkbox · รหัสภาชนะ (sticky, mono) · ประเภท · ตำแหน่ง · การใช้งาน · Label · สถานะ · action และ sort default คือรหัส (เรียงแบบ natural order) (FR-10)
   **And** การใช้งาน แสดง "ว่าง", "ถือใบหยิบ {ref}", "รอบขนส่ง {ref}" หรือ "ของค้างจากใบหยิบที่ยกเลิก {ref}" ส่วน สถานะ เป็น "ว่าง · พร้อมใช้" (success), "กำลังใช้" (info) หรือ "ต้องเคลียร์" (warning, tooltip "ใช้ซ้ำไม่ได้จนกว่าจะเคลียร์") (FR-10, UX-DR10)
   **And** status tab คือ ทั้งหมด · ว่าง · กำลังใช้ · ต้องเคลียร์ (count chip สี destructive เมื่อ > 0) filter คือ search ("ค้นหาหรือสแกนรหัสภาชนะ ตำแหน่ง หรือใบหยิบ", match รหัส, location หรือ ref ของการใช้งาน), ประเภท และ label (ยังไม่พิมพ์ / พิมพ์แล้ว รวมสำเนา)
   **And** panel แสดง "อัปเดตอัตโนมัติ · ข้อมูล ณ {HH:MM}" และ refresh การใช้งานและ location ทุก 30 วินาที โดยไม่ทำให้ filter หรือการเลือกหาย แถวที่เปลี่ยนกระพริบ (FR-10)
   **And** Excel export มีคอลัมน์ รหัสภาชนะ, ประเภท, ตำแหน่ง, การใช้งาน, label, สถานะ พร้อม label ภาษาไทย
   **And** container อยู่ใน location เดียวเสมอ ไม่มีทาง save container ที่ไม่มี location (FR-10)

**ต้องเคลียร์**

6. **Given** container ที่อยู่ในสถานะ ต้องเคลียร์
   **When** admin เลือก "เคลียร์" (ปุ่มในแถว หรือ bulk "เคลียร์ {n}")
   **Then** warning confirm "เคลียร์ภาชนะ {code}?" / "มีของค้างจากใบหยิบที่ยกเลิก {ref} · นำของออกจากภาชนะให้หมดก่อน แล้วเคลียร์เพื่อให้ใช้ซ้ำได้" พร้อม "เคลียร์ {code}" ตั้งสถานะเป็น ว่าง · พร้อมใช้ คง location เดิมไว้ แสดง "เคลียร์ {code} แล้ว" / "ภาชนะว่างและพร้อมใช้" และบันทึก `container.clear` พร้อม ref (FR-10, FR-107)
   **And** bulk clear confirm ด้วย "เคลียร์ {n} ภาชนะ?" และรายงาน "ทำได้ {n} · ข้าม {n} (ไม่ต้องเคลียร์)" (UX-DR13)
   **And** container ที่อยู่ใน ต้องเคลียร์ ถูกมอบหมายงานใหม่ไม่ได้จนกว่าจะเคลียร์ epic ถัดๆ ไปเป็นผู้ตั้งสถานะกำลังใช้และต้องเคลียร์ และใน pilot สถานะเหล่านี้มีเฉพาะในข้อมูลที่ seed ไว้ `[PILOT]`

**Label**

7. **Given** container ที่เลือกไว้ (เมนูของแถว, เมนูของประเภท "พิมพ์ label ที่ยังไม่พิมพ์", bulk bar หรือ toast)
   **When** พิมพ์ label
   **Then** dialog "พิมพ์ label ภาชนะ" ทำงานเหมือน Story 2.2 (2 ขนาด, ตัวเลือกพิมพ์เฉพาะที่ยังไม่พิมพ์, เหตุผลการพิมพ์ซ้ำ, เครื่องหมาย "สำเนา", preview 60 ใบ, browser print) (FR-10)
   **And** label แต่ละใบแสดง QR ที่ encode `CON:{warehouse code}:{container code}`, รหัสด้วยฟอนต์ mono ขนาดใหญ่, "{warehouse code} · {type name}" และ "QR ถาวร · ใช้ซ้ำได้"
   **And** QR เป็นแบบถาวร: สร้างจากรหัส ไม่มีการ generate ใหม่ และรหัสไม่ซ้ำภายในคลัง (FR-10)
   **And** บันทึก `label.print` / `label.reprint` (FR-107)

**ไม่อยู่ใน scope ของ story นี้**

- การแก้ไขหรือลบ container ทีละใบ, การเลิกใช้ประเภท, การย้าย container ระหว่าง location ด้วยมือ `[OPEN D-14]`

---

### Story 2.13: Warehouse Layout Editor and Location Binding

**ในฐานะ** admin
**ฉันต้องการ** วาดผังคลังตามสัดส่วนจริง และผูกทุก location เข้ากับตำแหน่งบนผัง
**เพื่อให้** ระบบรู้ว่าแต่ละ location อยู่ตรงไหนในคลังจริง

**Acceptance Criteria:**

**โครงหน้าตัววาดผัง**

1. **Given** หน้า ตั้งค่าคลัง › คลังและตำแหน่ง › ผังคลัง
   **When** admin เปิดตัววาดผังของคลัง
   **Then** หน้าแสดง tool rail (ซ้าย), canvas ตามสัดส่วนหน่วยเมตร (กลาง) และ side panel กว้าง 340px (ขวา) มีแถบด้านบนที่มีสถานะ version, ตัวสลับโหมด "แก้ผัง" | "ทดสอบเส้นทาง", undo "ย้อนกลับ (Ctrl+Z)", redo "ทำซ้ำ (Ctrl+Shift+Z)", ซูมออก/เข้า, ตัวเลข % ของการซูม, "พอดีจอ" และปุ่ม primary "ตรวจและเผยแพร่" (FR-125)
   **And** canvas แสดง grid 1 m, snap geometry ทุกอย่างทีละ 0.5 m และแสดงตำแหน่ง pointer เป็น "x.x, y.y ม." (FR-125)
   **And** ขนาด canvas default คือ 48 × 33 m และ admin ตั้งความกว้างและความยาวเป็นเมตรให้ตรงกับอาคารได้ `[OPEN D-15]`
   **And** ซูมได้ด้วย wheel และปุ่ม ตั้งแต่ขนาดพอดีจอ ÷ 3 จนถึงมุมมองกว้าง 6 m, "พอดีจอ" แสดง canvas ทั้งหมดโดยเว้นขอบ 2 m และเลื่อนผังได้ด้วยการลากพื้นที่ว่าง, ปุ่มกลางของเมาส์ หรือการลากใดๆ ในโหมดดูอย่างเดียวและโหมดเส้นทาง
   **And** ถ้ายังไม่มีผัง empty state "ยังไม่มีผังของ{warehouse name}" / "วาดชั้นวาง ทางเดิน และจุดเริ่มหยิบ แล้วผูกตำแหน่ง ระบบจะใช้ผังนี้หาเส้นทางหยิบที่สั้นที่สุด" มีปุ่ม "เริ่มวาดผัง" ซึ่งเลือกเครื่องมือทางเดินและแสดง "เริ่มจากวาดทางเดิน" / "แล้วตามด้วยชั้นวางและจุดเริ่มหยิบ"

**เครื่องมือวาด**

2. **Given** tool rail
   **When** admin เลือกเครื่องมือ (ปุ่มหรือคีย์)
   **Then** เครื่องมือคือ เลือกและย้าย (V), ชั้นวาง (R), ทางเดิน (A), พื้นที่โซน (Z), ผนังและสิ่งกีดขวาง (W), ประตูและท่าโหลด (D), จุดเริ่มหยิบหรือจุดจบการหยิบ (S) และ ป้ายข้อความ (T) แต่ละตัวแสดงคีย์และบรรทัดคำแนะนำ (เช่น "ลากตามแนวยาวของชั้นวาง · ระบบแบ่งช่องละ 1.2 ม.", "ลากเพื่อวาดทางเดิน · ทางเดินคือที่ที่ระบบใช้หาเส้นทาง", "ลากเพื่อวาดผนังหรือเสา · เดินผ่านไม่ได้") (FR-125)
   **And** พื้นที่โซน, ทางเดิน, ผนัง/สิ่งกีดขวาง และประตู/ท่าโหลด วาดด้วยการลากเป็นสี่เหลี่ยม (ด้านละอย่างน้อย 0.5 m ถ้าลากเล็กกว่านั้นจะถูกทิ้ง) element ใหม่ถูกเลือกไว้ และเครื่องมือกลับเป็นเลือก
   **And** ชั้นวางวาดด้วยการลากตามความยาว: แนวของชั้นวางตามทิศที่ลาก (แนวนอน 0°, แนวตั้ง 90°) ความยาวปัดเป็นจำนวนช่องเต็มช่องละ 1.2 m ความลึก 1.2 m จำนวนชั้น default 4 ด้านที่หันเข้าทางเดิน default เป็นด้านหน้า และโซนได้จากพื้นที่โซนที่อยู่ข้างใต้
   **And** คลิกด้วยเครื่องมือจุดเริ่มเพื่อวางจุดเริ่ม (จุดแรก) หรือจุดจบ (จุดถัดๆ ไป; "จุดจบการหยิบ (วางรถเข็น)") และคลิกด้วยเครื่องมือป้ายเพื่อวาง "ป้ายข้อความ"
   **And** วางหรือย้าย element ออกนอกขอบ canvas ไม่ได้
   **And** ประตูที่วาดไม่มีผลต่อการหาเส้นทางหรือการมอบหมายประตู (FR-9 ยังเป็น Defer) (FR-125)

**การแก้ไข**

3. **Given** element ที่เลือกอยู่
   **When** admin แก้ไข
   **Then** ย้ายได้ด้วยการลาก (snap) หรือปุ่มลูกศร (0.5 m; Shift + ลูกศร 1 m) ทำซ้ำด้วย Ctrl+D (เลื่อน +1 m; ชั้นวางที่ทำซ้ำไม่มีการผูก และตั้งชื่อเป็น "{name}-สำเนา") และลบด้วย Delete/Backspace กด Esc เพื่อยกเลิกการเลือก (FR-125)
   **And** สี่เหลี่ยม (โซน, ทางเดิน, ผนัง, ประตู) ปรับขนาดด้วย handle ที่มุมหรือ field กว้าง/ยาว ชั้นวางเปลี่ยนขนาดผ่าน จำนวนช่อง, จำนวนชั้น, กว้างต่อช่อง และ ลึก และหมุนด้วย "หมุน 90°"
   **And** panel คุณสมบัติ ("{type} · {name}") แสดง ชื่อ (หรือ ข้อความ สำหรับป้าย), โซน (พื้นที่โซนและชั้นวาง), ประเภทจุด (จุด), ตำแหน่ง X/Y และขนาดเป็นเมตร และสำหรับชั้นวางมี "ด้านหน้า (ฝั่งที่หยิบ)" (ชื่อด้านหน้า/หลังตามแนวของชั้นวาง หรือ ทั้งสองด้าน) ตัวเลขที่ไม่ถูกต้องแสดง error ใต้ field และไม่ถูกนำไปใช้
   **And** การลบชั้นวางที่มีการผูก หรือการลดจำนวนช่องหรือชั้นจนการผูกจะหาย ถามก่อนว่า "ลบชั้นวาง {name}?" / "ตำแหน่ง {n} ตำแหน่งที่ผูกไว้จะกลับเป็นยังไม่ผูก · ย้อนกลับได้ด้วย Ctrl+Z" (หรือข้อความเทียบเท่าสำหรับการปรับขนาด)
   **And** undo/redo ครอบคลุมทุกการเปลี่ยนแปลง (สูงสุด 100 ขั้นใน session) และการเปลี่ยนแปลงใหม่ใดๆ จะล้าง redo
   **And** เมื่อไม่ได้เลือกอะไร panel แสดงสรุปผัง (ชั้นวาง, ช่อง, ตำแหน่งที่ผูก, ทางเดิน) ขนาด canvas และรายการ shortcut
   **And** keyboard shortcut ไม่ทำงานขณะพิมพ์ใน field หรือเมื่อมี dialog เปิดอยู่

**ฉบับร่างและ version**

4. **Given** ผังมีฉบับร่าง และอาจมี version ที่ publish แล้ว
   **When** admin แก้ไข
   **Then** ทุกการเปลี่ยนแปลงถูก save ลง draft บน server ทันที และ draft ไม่มีผลกับงานจริงเลย (FR-125)
   **And** สถานะแสดง "ใช้งานอยู่ v{n}" (success, tooltip "เผยแพร่ {d MMM} {HH:mm} โดย {name}") หรือ "ยังไม่เคยเผยแพร่" (neutral) พร้อม "แบบร่าง · แก้ล่าสุด {HH:mm} · ยังไม่เผยแพร่" (warning) หรือ "แบบร่างตรงกับที่ใช้งานอยู่"
   **And** "ตรวจและเผยแพร่" ถูก disable เมื่อ draft เหมือนกับ version ที่ publish แล้ว หรือเมื่อ offline
   **And** ถ้ามี user อื่นแก้ draft ไประหว่างนั้น การ save แสดง "ข้อมูลเปลี่ยนแล้ว · โหลดใหม่" และไม่มีอะไรถูกเขียนทับ (UX-DR20)
   **And** การเปลี่ยนผังถูกบันทึกเป็น `layout.edit` พร้อม element และ geometry เก่า → ใหม่ การขยับ element เดียวกันติดๆ กันอาจรวมเป็น entry เดียว (FR-125, FR-107)

**ช่องของชั้นวางและสถานะช่อง**

5. **Given** ชั้นวางที่มี ช่อง × ชั้น
   **When** render
   **Then** แต่ละช่องวาดเป็น cell ที่มี label เป็น prefix ของรหัสที่ผูก (เช่น "A-01") หรือเลขช่อง ช่องที่ผูกครบเติมสี `accent` ช่องที่ยังไม่ผูกหรือผูกบางส่วนมีขอบเส้นประสี `warning-strong` ด้านที่หันเข้าทางเดินมีเส้นสี primary และ caption แสดง "{name} · {bays}×{levels}" (FR-125)
   **And** ช่องที่มีชั้นใดผูกกับ location ที่ ล็อกนับ แสดง tone info พร้อม icon แม่กุญแจ ถ้าไม่ใช่ ช่องที่มี location ปิดใช้ แสดง tone neutral พร้อม icon circle-slash (สถานะแสดงบนผัง) (FR-8, UX-DR10)

**ผูกตามรูปแบบรหัส**

6. **Given** ชั้นวางที่เลือกอยู่
   **When** admin ใช้ "ผูกตำแหน่งตามรูปแบบรหัส"
   **Then** กำหนด ตัวหน้า (default: รหัสโซนของชั้นวาง), ช่องแรกเป็นแถว (เลขแถวของช่องที่ 1 โดยแถวไล่ไปจนถึงช่อง 1 + จำนวนช่อง − 1), ชั้นตั้งแต่ และ ถึงชั้น (อยู่ในจำนวนชั้นของชั้นวาง) และ match รหัสในรูป {prefix}-{row 2 digits}-{level 2 digits} (FR-125)
   **And** preview แบบ live แสดง "{n} ตำแหน่งจะผูก", "{first} ถึง {last}" และ "ข้าม: ไม่พบรหัส {n} · ผูกกับชั้นวางอื่นแล้ว {n} · ไม่ใช่ประเภทหยิบ/เก็บ {n}" หรือ "กรอกตัวหน้า ช่องเริ่ม และช่วงชั้น" เมื่อค่าไม่ถูกต้อง
   **And** "ผูกตามรูปแบบ" (disable เมื่อผูกได้ 0 ตัว) แทนที่การผูกเดิมของชั้นวางนี้ แสดง "ผูก {n} ตำแหน่งกับ {rack} แล้ว" และบันทึก `layout.bind` (FR-107)
   **And** "ล้างการผูก" ถาม "ล้างการผูกของ {rack}?" / "{n} ตำแหน่งจะกลับเป็นยังไม่ผูก · ย้อนกลับได้ด้วย Ctrl+Z" และบันทึก `layout.unbind`
   **And** รูปแบบรหัสของการผูกตามรูปแบบเป็นแบบตายตัวใน pilot location ที่ใช้รูปแบบอื่นให้ผูกทีละช่อง

**ผูกทีละช่อง**

7. **Given** ชั้นวางที่เลือกอยู่
   **When** admin เปิด "ช่องในชั้นวาง" แล้วเลือกช่อง ("ช่อง NN", "{bound}/{levels} ชั้น")
   **Then** แต่ละชั้นจากบนลงล่างแสดงรหัสที่ผูกพร้อม status badge และ "เลิกผูก {code}" หรือ select "ยังไม่ผูก · เลือกตำแหน่ง" ที่แสดง location ประเภทหยิบ/เก็บที่ยังไม่ผูกในโซนของชั้นวาง (ทุกโซนถ้าชั้นวางไม่มีโซน) (FR-125)

**panel การผูก**

8. **Given** tab "ผูกตำแหน่ง" ใน side panel (มี chip แสดงจำนวนที่ยังไม่ผูก)
   **When** admin เปิด tab นี้
   **Then** แสดง "ตำแหน่งที่ยังไม่ผูก" / "ผูกแล้ว {x} จาก {total} ตำแหน่งหยิบและเก็บ · ที่ยังไม่ผูกจะใช้ลำดับเดินแทนตอนหยิบ" มี filter โซน, ประเภท (หยิบ / เก็บ) และ search (debounce, ตามรหัส) และแสดง location ที่ยังไม่ผูกแต่ละตัวพร้อมโซน ประเภท และสถานะ มี select "เลือกช่องว่าง" ของช่องที่ว่าง ("{rack} · ช่อง NN · ชั้น NN") และปุ่ม "ผูก" (FR-125)
   **And** เมื่อไม่มีช่องว่าง แถวแสดง "ไม่มีช่องว่างในโซนนี้ · วาดชั้นวางก่อน"
   **And** การผูกจะเลือกและไฮไลต์ช่องบน canvas โดย panel ยังเปิดอยู่ แสดง "ผูก {code} กับ {rack} ช่อง NN ชั้น NN แล้ว" และบันทึก `layout.bind` (FR-107)
   **And** empty state แสดง "ผูกครบทุกตำแหน่งแล้ว" หรือ "ไม่มีตำแหน่งที่ยังไม่ผูกตามตัวกรอง"
   **And** เฉพาะ location ประเภทหยิบและเก็บที่ต้องผูก ประเภทอื่นไม่ผูกได้โดยไม่มีคำเตือน

**1 location ต่อ 1 ช่อง**

9. **Given** การผูกทุกช่องทาง
   **When** ผูก location
   **Then** location ผูกได้ไม่เกิน 1 ช่องใน draft ทั้งหมด และ 1 ช่องมี location ได้ไม่เกิน 1 ตัว ช่องทางใดที่จะทำให้ผิดกฎนี้ถูกปฏิเสธ (FR-125)
   **And** ข้อมูล location แสดงการผูก: list ตำแหน่ง (Story 2.2) มีคอลัมน์ P3 "ผัง" แสดง "{rack} · ช่อง NN · ชั้น NN" หรือ "ยังไม่ผูก" ตามผังที่ publish แล้ว และ Sheet ของ location แสดงแบบเดียวกัน (FR-125)

**Publish**

10. **Given** draft
   **When** admin กด "ตรวจและเผยแพร่"
   **Then** dialog "ตรวจผังก่อนเผยแพร่" แสดงรายการที่ปิดกั้นและคำเตือน แต่ละรายการมี "ไปที่" ที่เลือก element นั้น (element ที่ติดปัญหามีขอบเส้นประสีแดง) หรือเปิด panel การผูก (FR-125)
   **And** รายการที่ปิดกั้นคือ "ยังไม่มีจุดเริ่มหยิบ · วางจุดเริ่มบนทางเดินอย่างน้อย 1 จุด"; "{start} ไม่ได้อยู่บนทางเดิน"; "{end} ไม่ได้อยู่บนทางเดิน"; "{aisle} ไม่เชื่อมกับจุดเริ่มหยิบ"; "ชั้นวาง {rack} ด้านหน้าไม่ติดทางเดิน · หมุนด้านหน้าหรือเลื่อนให้ชิดทางเดิน"; "ชั้นวาง {rack} ช่อง {NN, NN} เดินไปไม่ถึง"
   **And** กรณีชั้นวางซ้อนทับผนังหรือชั้นวางอื่น เป็นไปตามการตัดสินใจ `[OPEN D-16]`
   **And** คำเตือนคือ "ตำแหน่งหยิบและเก็บที่ยังไม่ผูก {n} ตำแหน่ง (โซน A: x · โซน C: y) · ใบหยิบจะใช้ลำดับเดินแทนสำหรับตำแหน่งเหล่านี้" และคำเตือนไม่ปิดกั้นการ publish
   **And** subtitle แสดง "แก้ {n} รายการก่อนจึงเผยแพร่ได้", "เผยแพร่ได้ · มีรายการที่ควรรู้" หรือ "ผ่านการตรวจทั้งหมด" ("ชั้นวางทุกตัวเดินถึงได้ ทางเดินเชื่อมกับจุดเริ่มหยิบ และผูกตำแหน่งครบ")
   **And** หมายเหตุใน footer แสดง "จะเป็น v{n+1} · ใบหยิบที่สร้างไว้แล้วยังใช้ลำดับเดิม" ปุ่ม "เผยแพร่" ถูก disable ขณะยังมีรายการที่ปิดกั้นหรือเมื่อ offline
   **And** server ตรวจแบบเดียวกันอีกครั้งตอน publish ดังนั้น dialog ที่ข้อมูลเก่าจะ publish draft ที่ไม่ผ่านไม่ได้

11. **Given** draft ที่ผ่านการตรวจ
   **When** admin ยืนยัน "เผยแพร่"
   **Then** draft ถูก copy เป็น version ใหม่ที่ publish แล้ว v{n+1} (snapshot ของ geometry และการผูกที่แก้ไขไม่ได้) toast แสดง "เผยแพร่ผัง v{n} แล้ว" / "ใบหยิบที่สร้างหลังจากนี้ใช้เส้นทางตามผังนี้" และบันทึก `layout.publish` พร้อม version (FR-125, FR-107)
   **And** version ที่ publish ก่อนหน้าถูกเก็บไว้ เพื่อให้ใบหยิบอ้างอิง version ที่ใช้ตอนสร้างได้

12. **Given** มีผังที่ publish แล้วและมีใบหยิบที่สร้างไว้แล้ว
   **When** publish version ใหม่
   **Then** ใบหยิบเดิมยังใช้ลำดับจุดเดิม เฉพาะใบหยิบที่สร้างหลังจากนี้ใช้ผังใหม่ (FR-125)
   **And** ใน pilot ยังไม่มีใบหยิบ จึงตรวจโดย preview ตัวอย่างชุดเดียวกันบน version เดิมและ version ใหม่ `[PILOT]`

**ดูอย่างเดียวและ accessibility**

13. **Given** ตัววาดผังบนจอที่แคบกว่า 1280px, ขณะ offline หรือผู้ใช้ไม่มีสิทธิ์แก้
   **When** หน้าเปิดขึ้น
   **Then** ผังเป็นแบบดูอย่างเดียว ซูม เลื่อน และเลือกได้ tool rail, control การแก้ไข และ publish ถูกซ่อน field คุณสมบัติแสดงแบบ disable และ route preview ยังใช้ได้ (UX-DR46, UX-DR42)
   **And** หมายเหตุแสดง "ดูผังอย่างเดียว · แก้ผังได้บนจอกว้าง 1280px ขึ้นไป" หรือ "ออฟไลน์ · ดูผังได้ แต่แก้และเผยแพร่ไม่ได้จนกว่าจะเชื่อมต่อใหม่"
   **And** ใน pilot การเช็ค permission ต่อสายไว้แล้ว แต่มีเฉพาะ System Administrator ที่ seed ไว้ `[PILOT]`

14. **Given** ผู้ใช้ keyboard หรือ screen reader
   **When** ใช้ตัววาดผัง
   **Then** รายการ "สิ่งของบนผัง" ใน side panel ให้เลือกทุก element ด้วย keyboard ได้ แล้วแก้ผ่าน panel คุณสมบัติ panel การผูกใช้ด้วย keyboard ได้ครบ และการลากไม่ใช่วิธีเดียวในการทำสิ่งใดก็ตาม (UX-DR42, UX-DR48)
   **And** canvas มี `role="application"` พร้อม label "ผังคลัง ใช้ปุ่มลูกศรเลื่อนสิ่งที่เลือก"

**ไม่อยู่ใน scope ของ story นี้**

- มุมมอง occupancy (Story 4.8, FR-126), การมอบหมายประตู (FR-9), การสร้างผังอัตโนมัติ, การเขียนลำดับเดินกลับไปที่ location

---

### Story 2.14: Layout Route Engine and Route Preview

**ในฐานะ** admin
**ฉันต้องการ** ให้ระบบคำนวณเส้นทางเดินบนผังที่ publish แล้ว และให้ฉันดูตัวอย่างเส้นทางได้
**เพื่อให้** มั่นใจในลำดับการหยิบก่อนพนักงานเดินตามจริง

**Acceptance Criteria:**

**เครือข่ายทางเดิน**

1. **Given** ผังถูก publish
   **When** publish เสร็จ
   **Then** ระบบสร้างเครือข่ายทางเดินของ version นั้น: ทางเดินเดินได้ ผนัง/สิ่งกีดขวางและชั้นวางเดินผ่านไม่ได้ พื้นที่โซนและประตูไม่มีผล และการเคลื่อนที่อยู่บน grid 0.5 m ใน 4 ทิศ (FR-125)
   **And** แต่ละช่องมีจุดเข้าถึง (access point) ห่างจากด้านที่หันเข้าทางเดิน 0.3 m (ทั้งสองฝั่งสำหรับชั้นวางแบบ ทั้งสองด้าน) ทุกชั้นของช่องใช้จุดเข้าถึงเดียวกัน
   **And** คำนวณระยะเดินระหว่างจุดเข้าถึงที่ผูกแล้วทุกจุดกับจุดเริ่ม/จบไว้ล่วงหน้าสำหรับ version นั้น `[ARCH-PENDING: วิธี precompute]` (FR-125)

**Route service**

2. **Given** ชุดรหัส location, คลัง และจุดเริ่ม (ถ้ามี)
   **When** เรียก route service
   **Then** ได้ version ของผังที่ใช้ ลำดับจุดตามระยะเดินสั้นที่สุด (nearest neighbour แล้วปรับด้วย 2-opt) พร้อมระยะสะสมของแต่ละจุด และระยะรวมเป็นเมตร ซึ่งรวมระยะจากจุดสุดท้ายไปจุดจบเมื่อมีจุดจบ (FR-67, FR-125)
   **And** จุดเริ่มคือจุดที่ส่งมา ถ้าไม่ส่งใช้จุดเริ่มแรกของผัง
   **And** location ที่ยังไม่ผูก และ location ที่ผูกแล้วแต่เดินไปไม่ถึง ต่อท้ายหลังจุดที่จัดเส้นทางแล้วตามลำดับเดิน แต่ละตัว mark ว่า "ตามลำดับเดิน" (FR-67, FR-8)
   **And** ถ้ายังไม่มีผังที่ publish หรือไม่มีจุดเริ่มบนทางเดิน ทุกจุดใช้ลำดับเดิน และผลลัพธ์ระบุเหตุผล (เช่น "ยังไม่มีจุดเริ่มหยิบบนทางเดิน") (FR-67)
   **And** input เดิมให้ output เดิมเสมอ (กรณีเท่ากันตัดสินด้วยลำดับเดิน แล้วจึงรหัส) เพื่อให้ tests และการรันซ้ำได้ผลคงที่
   **And** ใบหยิบ (Epic 8) เรียก service ด้วย version ที่ publish แล้วเท่านั้น draft ไม่ถูกใช้กับงานจริงเลย
   **And** รูปแบบลำดับการเดินของโซนมีผลกับ fallback ตามลำดับเดินอย่างไร เป็นไปตามการตัดสินใจ `[OPEN D-12]`

**Performance**

3. **Given** ช่วง peak
   **When** สร้างใบหยิบ
   **Then** การเรียงเส้นทางเพิ่มเวลาไม่เกิน latency ที่ตกลงกันต่อใบ `[ARCH-PENDING: เป้าหมาย]` (NFR-1)
   **And** benchmark test ด้วยผังบางเขนและขนาดใบหยิบที่สมจริงรันใน CI และรายงานเวลา

**ทดสอบเส้นทาง (route preview)**

4. **Given** ผังคลัง › "ทดสอบเส้นทาง"
   **When** admin เปิดโหมดนี้
   **Then** tool rail และการเลือกถูกล้าง และ panel มี "ใช้ผัง" (แบบร่าง หรือ v{n} ที่ใช้งานอยู่), "เริ่มที่" (จุดเริ่มของผัง) และ "ตำแหน่งตัวอย่าง ({n})" ซึ่ง default เป็น location ที่ผูกแล้วแบบสุ่ม 10 ตัว มี "สุ่มใหม่" และ checkbox ของ location หยิบ/เก็บทุกตัว (ตัวที่ยังไม่ผูกต่อท้ายด้วย "· ไม่ผูก") (FR-125)
   **And** canvas วาดเส้นทางเป็นเส้นสี primary หนา 3px พร้อม marker เลขลำดับจุด และ panel แสดง "{total} ม. ตามผัง", "{seqTotal} ม. ถ้าเดินตามลำดับเดิน · สั้นลง {n}%" (แสดงเปอร์เซ็นต์เฉพาะเมื่อเป็นบวก) และ "ลำดับจุดหยิบ" ที่แสดงแต่ละจุดเป็นข้อความพร้อมเลขลำดับ รหัส และระยะสะสมเป็นเมตร จุด fallback แสดง "–" และ "ตามลำดับเดิน" (FR-125, UX-DR42)
   **And** ถ้าคำนวณเส้นทางไม่ได้ panel แสดง "{reason} · ทุกจุดจะใช้ลำดับเดินแทน" (alert สี destructive)
   **And** preview draft ได้เพื่อตรวจก่อน publish โดยมี label แบบร่าง ชัดเจน
   **And** เมื่อมี Epic 7 แล้ว เลือกตัวอย่างจาก order line จริงที่รออยู่ได้ (FR-125)

**การรับงาน pilot**

5. **Given** คลังบางเขนจริงที่วาดและ publish แล้ว
   **When** หัวหน้าคลังเดินตามเส้นทางที่ preview ไว้ 3 เส้นทาง
   **Then** หัวหน้าคลังยืนยันว่าลำดับและระยะตรงกับการเดินจริง หรือแก้ส่วนที่ไม่ตรงก่อนเริ่ม Epic 8 `[PILOT]`

## 5. Definition of Done ของ pilot

- [ ] Story ทั้ง 11 ตัวมีสถานะ `done` ใน `sprint-status.yaml`
- [ ] ทุก story ผ่าน `bmad-code-review` และมีคน review ผ่าน `bmad-walkthrough`
- [ ] Demo flow ในข้อ 1 ได้ครบตั้งแต่ต้นจนจบบน environment เดียวกัน
- [ ] ทุก action ของ 2.1–2.3 และ 2.13 มีบันทึกใน activity log
- [ ] วาดผังคลังบางเขนจริงได้ครบ publish ผ่าน และ route preview ตรงกับการเดินจริงตามที่หัวหน้าคลังยืนยัน
- [ ] รัน `bmad-retrospective` แล้ว และได้ข้อสรุปเรื่องต่อไปนี้
  - ขนาดของ story เหมาะไหม
  - AC ละเอียดพอไหม
  - ควรแบ่งทีมแบบ stream (Platform / Inventory Core / Inbound / Outbound) หรือแบบอื่น
  - เวลาที่ใช้ต่อ story เพื่อเอาไปประมาณการ wave ถัดไป

## 6. Wave ถัดไป (ร่าง)

หลังจบ pilot ถ้า D-1 และ OMS contract (Q-3) สรุปแล้ว ให้ทำต่อดังนี้

1. Story 1.7, 1.8 — user และ role จริง แทน admin ที่ seed ไว้
2. Story 1.11 — approvals (ถ้าไม่ได้ดึงเข้ามาใน pilot ตาม D-2)
3. Story 2.7, 2.10 — settings precedence และ document numbering ซึ่งเป็น engine กลาง
4. Epic 3 → Epic 4 — SKU จาก OMS และ stock ledger เพื่อเตรียมเปิด Inbound
5. Story 4.8 — ผังคลังแสดงความหนาแน่นสต็อก (ใช้ผังจาก pilot + ข้อมูลจาก ledger)
