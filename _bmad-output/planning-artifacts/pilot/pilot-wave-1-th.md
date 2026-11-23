---
status: draft
created: 2026-11-23
sourceOfTruth: _bmad-output/planning-artifacts/epics.md
language: th
scope: Pilot Wave 1 — Epic 1 (บางส่วน) + Epic 2 Story 2.1–2.3, 2.13–2.14
updated: 2026-11-23 (เพิ่มผังคลังตาม sprint-change-proposal-2026-11-23)
---

# Pilot Wave 1 — ตั้งค่าคลัง ตำแหน่ง และผังคลัง

> **ไฟล์นี้คือฉบับภาษาไทยของ story ที่เลือกมาทำ pilot** คัดจาก [epics.md](../epics.md) โดยไม่เพิ่ม requirement ใหม่
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

## 4. Stories และ Acceptance Criteria

> แปลจาก `epics.md` โดยคงความหมายเดิมไว้ ส่วนที่ขึ้นต้นด้วย **หมายเหตุ pilot** เป็นข้อสังเกตที่เพิ่มในไฟล์นี้ ไม่ได้เป็น AC ใหม่
> เลขอ้างอิง (FR-x, NFR-x, UX-DR-x) ชี้กลับไปที่ PRD และ UX spec

---

### Story 1.1: Project Foundation and Design-System Shell

**ในฐานะ** developer ของทีม Zimple WMS
**ฉันต้องการ** web application แบบ multi-tenant ที่ scaffold ไว้แล้ว พร้อม design tokens ของ shadcn/ui, i18n ไทย/อังกฤษ และ data scoping ตาม tenant/warehouse
**เพื่อให้** story ต่อจากนี้ทุกตัวต่อยอดบน design system เดียวและ data-scoping model เดียว

**Acceptance Criteria:**

1. **Given** ยังไม่มี code
   **When** scaffold project
   **Then** ใช้ starter template ตามที่ architecture document เลือก `[ARCH-PENDING]` (ตอนนี้ยังไม่ได้เลือก story นี้จึงยัง ready-for-dev ไม่ได้)
   **And** repository เป็น codebase เดียวที่ให้บริการทั้ง office web, station และ PDA (NFR-12) `[ARCH-PENDING: PDA native vs web/PWA]`

2. **Given** app กำลังทำงาน
   **When** render หน้าใดก็ตาม
   **Then** color token ทุกตัวใน frontmatter ของ DESIGN.md (shadcn variables หลัก รวมถึง `success*`, `warning*` ที่รวม `warning-strong`, `danger-soft*`, `info*`, `neutral*`, `scan-accept/reject/blocked*`, `pda-bar*`, `support-banner*`, `chart-1…5`) ถูกประกาศเป็น CSS variable บน `:root` และลงทะเบียนใน Tailwind theme เพื่อให้ใช้ utility อย่าง `bg-success-soft` ได้ (UX-DR1)
   **And** มี lint/check ที่ทำให้ build fail ถ้า component ใช้ค่าสี hex ตรงๆ (UX-DR1)
   **And** มีแค่ light theme (UX-DR48)

3. **Given** typography และ shape tokens
   **When** render ข้อความและ control
   **Then** โหลด IBM Plex Sans Thai (400/500/600/700) และ IBM Plex Mono (500/700) และมี named style ครบทุกตัว (display-kpi, h1–h3, body, body-strong, label, caption, code, pda-body, pda-caption, pda-title, pda-button, pda-location, scan-input, station-next, station-counter, feedback-headline) โดย line-height ภาษาไทย ≥ 1.45 และไม่มี letter-spacing (UX-DR2)
   **And** map radius tokens `sm 4 / md 6 / lg 8 / xl 12 / full` โดยตั้ง shadcn `--radius` = 8px และประกาศ spacing tokens ครบ ได้แก่ page padding, control height 36/48/56/64, table row 44/36, scan field 64/56, sidebar 240/64, sheet 560 (UX-DR3)

4. **Given** ภาษาที่ผู้ใช้ตั้งไว้
   **When** render UI
   **Then** ข้อความ UI ทุกตัวมาจาก message catalogue ไทยและอังกฤษ ค่า default เป็นภาษาไทย และตั้ง `lang` เป็น `th` หรือ `en` ตามภาษาที่ใช้ (NFR-8, UX-DR44)

5. **Given** data layer
   **When** สร้าง business record ใดก็ตาม
   **Then** record มี company (tenant) id และมี warehouse id ด้วยถ้าเป็นข้อมูลของคลังใดคลังหนึ่ง และทุก query ถูก scope ฝั่ง server ตาม tenant และคลังที่ผู้เรียกมีสิทธิ์ (NFR-7, NFR-11)
   **And** tenant มี edition flag ระดับบริษัท (Business / 3PL) และ add-on toggle ที่เก็บแยกต่อบริษัทและต่อคลัง เพื่อให้ visibility rules ใน story ถัดไปอ่านได้ (UX-DR7)
   **And** seed tenant แรกไว้ 1 ตัว มีคลัง 1 คลัง และบัญชี *System Administrator* ที่ล็อกไว้ 1 บัญชี เพื่อให้ story ถัดไป sign in ได้

---

### Story 1.2: Immutable Activity Log Recording

**ในฐานะ** ผู้จัดการคลัง
**ฉันต้องการ** ให้ทุก action ที่สำคัญถูกบันทึกลง activity log แบบ append-only
**เพื่อให้** ดูได้ตลอดว่าใครทำอะไร ทำบนอุปกรณ์ไหน และทำเพราะอะไร

**Acceptance Criteria:**

1. **Given** feature ใดก็ตามเรียก activity-log service
   **When** บันทึก action
   **Then** entry ที่เก็บมีข้อมูลเวลา, ประเภทผู้กระทำ (user, automation, OMS API, Zimple support), id ของผู้กระทำ, อุปกรณ์, action, record เป้าหมาย, ค่าเก่า → ค่าใหม่ และเหตุผล (FR-107)

2. **Given** entry ที่บันทึกไปแล้ว
   **When** user หรือ API พยายามแก้ไขหรือลบ entry นั้น
   **Then** ระบบปฏิเสธ และไม่มีอะไรเปลี่ยน (FR-107, NFR-6)

3. **Given** service นี้เปิดให้ทุก module ใช้
   **When** เกิด sign-in/out (รวมถึงครั้งที่ล้มเหลว), create, edit, cancel, approve, reject, adjust, reverse, การเปลี่ยน rule/user/permission, print/reprint หรือ export ใน story ถัดๆ ไป
   **Then** แต่ละ action เรียก service นี้ด้วย action type ที่ตรงกัน (FR-107, NFR-7)

4. **Given** การเก็บรักษา log
   **When** entry มีอายุเกิน 1 ปี
   **Then** ยังเก็บไว้อยู่ `[ASSUMPTION: อย่างน้อย 1 ปี, PRD §12]` (FR-107)

> **หมายเหตุ pilot:** หน้าดู log (Story 1.10) ไม่อยู่ใน pilot ตอน demo ให้ตรวจจาก DB หรือ API ไปก่อน

---

### Story 1.3: Office Web Sign-in and Session Management

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** sign in บนเว็บด้วยอีเมลและรหัสผ่าน (และ OTP เมื่อบริษัทเปิด MFA) แล้วเลือกคลังที่จะทำงาน
**เพื่อให้** เข้าถึงได้เฉพาะคลังที่ตัวเองมีสิทธิ์

**Acceptance Criteria:**

1. **Given** user ที่ active และเปิดสิทธิ์ sign in บนเว็บไว้
   **When** กรอกอีเมลและรหัสผ่านถูกต้อง
   **Then** sign in สำเร็จ ถ้ามีสิทธิ์มากกว่า 1 คลังต้องเลือกคลังก่อนเข้าแอป (FR-20)
   **And** การ sign in ถูกบันทึกใน activity log (FR-107)

2. **Given** บริษัทเปิด MFA
   **When** user ผ่านขั้นรหัสผ่านแล้ว
   **Then** ต้องกรอก OTP 6 หลัก และกดส่งใหม่ได้หลังผ่านไป 45 วินาที (FR-20)
   **And** บัญชี Zimple support ต้องใช้ OTP ทุกครั้ง ไม่ว่าบริษัทจะตั้งค่าไว้อย่างไร (FR-20, NFR-7)

3. **Given** user กรอกรหัสผ่านผิด
   **When** ผิดติดกัน 3 ครั้ง
   **Then** บัญชีถูกล็อกประมาณ 15 นาที และหน้าจอแสดงสถานะว่าถูกล็อก (FR-20)
   **And** ทุกครั้งที่กรอกผิดถูกบันทึก log (FR-107)

4. **Given** user ขอ reset รหัสผ่าน
   **When** กรอกอีเมลใดก็ตาม
   **Then** response เหมือนกันทุกกรณีไม่ว่าอีเมลนั้นจะมีในระบบหรือไม่ และลิงก์ reset (ถ้าส่ง) ใช้ได้ 30 นาที (FR-20)

5. **Given** user ที่ sign in อยู่
   **When** session ไม่มีการใช้งานนานเกิน timeout ที่ตั้งไว้ หรือ user เปลี่ยนรหัสผ่าน
   **Then** session ที่ idle สิ้นสุดลง และการเปลี่ยนรหัสผ่านทำให้ session อื่นทั้งหมดของ user คนนั้นถูก sign out (FR-20)

6. **Given** user ที่ถูกระงับ หรือ user ที่ role ไม่ให้สิทธิ์เข้าหน้าเว็บใดเลย
   **When** พยายาม sign in
   **Then** ระบบปฏิเสธพร้อมข้อความที่ตรงกับกรณี (ถูกระงับ / ไม่มีสิทธิ์) (FR-17, FR-20)

> **หมายเหตุ pilot:** การระงับ user และ role มาจาก Story 1.7 และ 1.8 ซึ่งไม่อยู่ใน pilot ให้ทดสอบ AC ข้อ 6 ด้วยข้อมูลที่ seed ไว้ หรือคุยกันก่อนว่าจะเลื่อน AC ข้อนี้ไหม

---

### Story 1.4: Office Shell, Navigation and Visibility Rules

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** shell ที่หน้าตาเหมือนกันทุกหน้า มี sidebar, header และ module tabs ที่แสดงเฉพาะสิ่งที่เกี่ยวกับฉัน
**เพื่อให้** ไปมาในระบบได้เร็ว และไม่เห็น feature ที่ตัวเองใช้ไม่ได้

**Acceptance Criteria:**

1. **Given** ผู้ใช้ฝั่งออฟฟิศที่ sign in แล้ว
   **When** โหลดหน้าออฟฟิศหน้าใดก็ตาม
   **Then** shell แสดง sidebar กว้าง 240px ที่ยุบเหลือ rail 64px ได้ (จำสถานะแยกต่อ user และ rail มี tooltip เมื่อ hover/focus) มีโลโก้ tenant อยู่ด้านบน "by Zimple Solution" อยู่ด้านล่าง และมี header สูง 56px ที่มี warehouse switcher, ช่องสำหรับ global search, จำนวน approvals และ notifications และ user menu (UX-DR5)
   **And** title ของ browser เป็น "{page} · {warehouse} · Zimple WMS" (หรือ Zimple Fulfillment ถ้าเป็น edition 3PL) (UX-DR5)

2. **Given** navigation tree ของ Phase 1 ใน EXPERIENCE.md
   **When** render sidebar
   **Then** มีเฉพาะเมนู Phase 1 ส่วนเมนู Phase 2/Later ไม่ render เลย แต่ละ module เปิดที่หน้า hub ภาพรวม, tab ระดับ L2 เป็น URL route มี count chip เฉพาะงานที่ต้องทำ (ซ่อนเมื่อเป็น 0 และแสดง "99+" เมื่อเกิน 99) และจำ tab ล่าสุดของแต่ละ module แยกต่อ user (UX-DR6)
   **And** หน้าย่อยของ settings ใช้ Tabs แถวที่สอง ห้ามทำ sidebar ระดับที่สาม (UX-DR6)

3. **Given** visibility rules
   **When** ประเมินเมนูแต่ละรายการ
   **Then** ใช้ rule ตามลำดับ phase → edition → จำนวน owner → add-on → permission → device binding โดย rule แรกที่สั่งซ่อนเป็นตัวตัดสิน (UX-DR7)
   **And** เมนูที่ถูกซ่อนต้องไม่โผล่ทั้งใน nav, global search, PDA tiles และ deep link ถ้าเข้าผ่าน deep link ให้แสดง "ไม่มีสิทธิ์เข้าหน้านี้ · ติดต่อผู้ดูแลระบบ" หรือ "ฟีเจอร์นี้ไม่ได้เปิดใช้ในบริษัทของคุณ" พร้อมลิงก์กลับหน้าแรก (UX-DR7)
   **And** ถ้าคลังมี owner รายเดียว ให้ซ่อน owner picker และคอลัมน์ owner (FR-DATA-1, UX-DR7)

4. **Given** user ที่มีมากกว่า 1 คลัง
   **When** เปิด warehouse switcher
   **Then** Dialog แสดงรายการคลังของ user การสลับคลังไม่ทำให้งานที่เปิดอยู่หาย และโหลด data scope ใหม่ทั้งหมด (UX-DR9, NFR-11)

5. **Given** มีการ deploy frontend เวอร์ชันใหม่
   **When** user กำลังทำงานค้างอยู่
   **Then** แอปขึ้นข้อความ "รีเฟรชเมื่อจบงานนี้" และอัปเดตเฉพาะตอนจบงานหรือตอน sign in ครั้งถัดไป ห้าม block งาน (UX-DR47)

6. **Given** ความกว้างหน้าจอออฟฟิศ
   **When** กว้าง ≥1440 / 1280–1439 / 1024–1279 / <1024px
   **Then** layout เป็นไปตามตาราง responsive ใน EXPERIENCE.md ได้แก่ sidebar เต็ม; ซ่อน P3 และ KPI เรียง 3 ใบ; ใช้ rail และซ่อน P2–P3; sidebar เป็น Sheet และทำได้แค่อ่านกับ approve (UX-DR46)

> **หมายเหตุ pilot:** จำนวน approvals, notifications และ global search ใน header ทำเป็น slot ไว้ก่อน เพราะ engine มาจาก Story 1.11–1.13 rule ระดับ permission ยังไม่มีข้อมูลจนกว่าจะทำ Story 1.8 แต่ต้องวางลำดับการประเมิน rule ไว้ครบแล้ว

---

### Story 1.5: Shared List Components — Status Badge, Data Table, Filter Bar, Bulk Actions and States

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** ให้ทุก list ในระบบทำงานเหมือนกัน
**เพื่อให้** เรียนรู้ pattern เดียวแล้วค้นหา กรอง export และสั่งงาน record ได้เร็ว

**Acceptance Criteria:**

1. **Given** status ที่แสดงที่ใดก็ตาม
   **When** render status badge
   **Then** ใช้แค่ 5 tone (success / warning / destructive / neutral / info) แต่ละ badge มี icon + label ภาษาไทย + tone และเมื่อ hover/focus มี tooltip บอกเวลาที่เปลี่ยน status และผู้ที่เปลี่ยน (UX-DR10)
   **And** "ด่วน/เร่งด่วน" เป็น destructive เสมอ และ "รออนุมัติ" เป็น warning เสมอ (UX-DR10)

2. **Given** data table
   **When** render list
   **Then** แบ่งหน้าฝั่ง server (default 50 แถว ห้าม infinite scroll) เก็บ filter, sort และ page ไว้ใน URL มี header และคอลัมน์แรกแบบ sticky (เลขเอกสารใช้ฟอนต์ mono สี primary) ตัวเลขชิดขวาแบบ tabular และกำหนด priority ของคอลัมน์เป็น P1–P3 โดยมีเมนู "คอลัมน์" เมื่อจอแคบ (UX-DR11)
   **And** คลิกแถวแล้วเปิดหน้า detail, คอลัมน์ checkbox เปิด bulk action bar และ export Excel ตาม filter และการ mask ข้อมูลที่ใช้อยู่ (UX-DR11)
   **And** user บันทึก view พร้อมตั้งชื่อได้ (UX-DR11)

3. **Given** filter bar
   **When** user พิมพ์หรือสแกนในช่องค้นหา
   **Then** ค้นหาแบบ debounce 300 ms และรับ input จาก scanner ได้ status tab แสดงจำนวน และปุ่ม "ล้างตัวกรอง" แสดงเฉพาะเมื่อมี filter ใช้อยู่ (UX-DR12)

4. **Given** มีแถวที่ถูกเลือก
   **When** user สั่ง bulk action
   **Then** bar แสดง "เลือก n รายการ" และผลลัพธ์บอกจำนวนที่ทำได้กับที่ข้ามพร้อมเหตุผล เช่น "ทำได้ 18 · ข้าม 2 (เหตุผล)" (UX-DR13)

5. **Given** list หรือ hub ที่กำลังโหลด, ว่าง, ว่างหลังกรอง, error หรือ offline
   **When** render
   **Then** แสดง skeleton rows (ขึ้น "ยังโหลดไม่เสร็จ · ลองใหม่" หลัง 10 วินาที), empty state ครั้งแรกที่มี setup action ไม่เกิน 1 ปุ่ม, "ไม่พบรายการตามตัวกรอง" พร้อมปุ่มล้างตัวกรอง, toast สี destructive ที่ค้างไว้พร้อม reference code เมื่อ server error, banner offline ของออฟฟิศที่ปิดการเขียนข้อมูล และ "ข้อมูลเปลี่ยนแล้ว · โหลดใหม่" เมื่อ save ชนกัน (UX-DR20)
   **And** record ที่ปิดแล้วแสดง badge neutral "ปิดแล้ว" และซ่อนปุ่มแก้ไข (UX-DR20)
   **And** toast สำเร็จหายเองใน 4 วินาที ส่วน toast error ค้างจนกว่าจะปิด (UX-DR21)

---

### Story 1.6: Shared Hub, Sheet and Confirmation Components

**ในฐานะ** ผู้ใช้ฝั่งออฟฟิศ
**ฉันต้องการ** ให้ hub, drawer สร้าง/แก้ไข และ confirmation ทำงานแบบคาดเดาได้
**เพื่อให้** งานไม่หาย และไม่เผลอสั่ง action ที่ย้อนกลับไม่ได้

**Acceptance Criteria:**

1. **Given** hub ของ module
   **When** render KPI cards, queue cards และ pipeline bar
   **Then** ทุก card และทุก segment เป็นลิงก์ไปยัง queue ที่กรองแล้ว จำนวนที่เลยกำหนดใช้ chip สี danger-soft, segment ของ pipeline ใช้สี chart เรียงตามลำดับขั้น และ hub แสดง "ข้อมูล ณ HH:MM" (UX-DR14)
   **And** รายการที่ติด block ทุกตัวต้องเข้าถึงได้ภายใน 2 คลิกจาก hub (UX-DR14)

2. **Given** Sheet สร้าง/แก้ไขขนาด 560px
   **When** เปิด Sheet
   **Then** focus ถูก trap ไว้ใน Sheet, field แรกได้ focus และถ้ากด Esc/ปิดขณะมีการแก้ไขที่ยังไม่ save จะเปิด AlertDialog "ทิ้งการแก้ไข?" (UX-DR15)
   **And** ถ้า save แล้ว validation ไม่ผ่าน Sheet ยังเปิดอยู่ แสดง error ใต้ field และสรุป error แล้ว scroll ไปที่ error แรก (UX-DR15)
   **And** เปิด Sheet ได้ทีละ 1 อัน และห้ามเปิด Dialog ซ้อนบน Sheet ยกเว้น AlertDialog (UX-DR15)

3. **Given** action ที่ทำลายข้อมูล
   **When** user สั่ง action นั้น
   **Then** AlertDialog ระบุชื่อสิ่งที่จะถูกกระทำและผลที่จะเกิด โดย focus อยู่ที่ปุ่มยกเลิก และ action ที่กระทบสต็อกแบบย้อนกลับไม่ได้ต้องกรอกเหตุผล (UX-DR16)
   **And** ปุ่มที่เรียก server action แสดง spinner และ disable ไว้จนได้ response (กันกดซ้ำ) ปุ่มยืนยันใช้คำว่า กริยา + สิ่งที่ถูกกระทำ ห้ามใช้ "ตกลง"/"OK" (UX-DR16)

---

### Story 2.1: Warehouses and Zones

**ในฐานะ** admin
**ฉันต้องการ** สร้างคลังและโซน
**เพื่อให้** ระบบตรงกับพื้นที่จริง

**Acceptance Criteria:**

1. **Given** หน้า ตั้งค่าคลัง › คลังและตำแหน่ง
   **When** admin สร้างคลัง
   **Then** ต้องกรอกรหัส 3 ตัวอักษรที่ไม่ซ้ำ และชื่อคลัง คลังที่สร้างแล้วเลือกได้ใน warehouse switcher ของ user ที่มีสิทธิ์ในคลังนั้น (FR-8, NFR-11)

2. **Given** คลัง 1 คลัง
   **When** admin สร้างโซน
   **Then** กำหนดประเภทห้อง, capacity และรูปแบบลำดับการเดิน (walk-order pattern) (FR-8)

3. **Given** คลังที่มีสต็อกอยู่
   **When** admin พยายาม disable คลังนั้น
   **Then** ระบบปฏิเสธ ส่วนคลังที่ไม่มีสต็อกเลย disable ได้หลังผ่าน approval (การ disable ประเภทคลัง) (FR-8, FR-105)
   **And** การเปลี่ยนแปลงถูกบันทึก log (FR-107)

> **หมายเหตุ pilot:** เรื่อง approval ใน AC ข้อ 3 ขึ้นกับการตัดสินใจ **D-2** ส่วนการเช็คว่า "มีสต็อก" ใน pilot ยังไม่มี stock ledger (Epic 4) ให้ทำ interface สำหรับเช็คสต็อกไว้ แล้วตอนนี้ให้คืนค่า 0 ไปก่อน

---

### Story 2.2: Locations and Location Labels

**ในฐานะ** admin
**ฉันต้องการ** สร้าง location ทีละตัวหรือแบบ bulk และพิมพ์ QR label ได้
**เพื่อให้** ทุกที่ที่วางสต็อกได้สแกนได้

**Acceptance Criteria:**

1. **Given** โซน 1 โซน
   **When** admin สร้าง location
   **Then** location มีประเภทเป็น 1 ใน 8 แบบ (หยิบ pick, เก็บ storage, รับเข้า receiving, พักสินค้า staging, ส่งมอบ handover, คืน returns, รอคืนชั้น awaiting-restock, ชำรุด/กักกัน damaged/quarantine) และมีโซน, ลำดับการเดิน, flag ว่าขายได้หรือไม่ (sellable), capacity เป็น m³ และ kg และนโยบายการผสมสินค้า (mixing policy) (FR-8)

2. **Given** รูปแบบช่วง (เช่น aisle A, row 01–10, level 01–04)
   **When** admin สร้าง location แบบ bulk
   **Then** location ทั้งหมดที่ตรงรูปแบบถูกสร้างในครั้งเดียว โดยรหัสไม่ซ้ำกันภายในคลัง (FR-8)

3. **Given** location 1 ตัว
   **When** admin ตั้งเป็น ปิดใช้ (disabled)
   **Then** location ถูก flag ว่าห้าม putaway และห้ามย้ายของเข้า ใน flow ถัดๆ ไป ส่วนสถานะ ล็อกนับ (locked for counting) ตั้งเองที่หน้านี้ไม่ได้ (FR-8)

4. **Given** location ที่เลือกไว้
   **When** admin สั่งพิมพ์ label
   **Then** พิมพ์ QR label แบบ bulk โดยรหัส location ใช้ฟอนต์ mono (FR-8)

5. **Given** SKU 1 ตัว
   **When** มีการวางสต็อกในภายหลัง
   **Then** data model รองรับให้ SKU เดียวอยู่ได้หลาย location (FR-8)

> **หมายเหตุ pilot:** การพิมพ์ใช้ browser print ตาม **D-3** ส่วน AC ข้อ 5 ทดสอบที่ระดับ schema เพราะ SKU ยังไม่มีจนกว่าจะทำ Epic 3

---

### Story 2.3: Container Types and Container Labels

**ในฐานะ** admin
**ฉันต้องการ** ลงทะเบียนประเภท container และพิมพ์ QR label ถาวร
**เพื่อให้** ติดตาม pallet, tote, cart และกระสอบได้ทุกขั้นตอน

**Acceptance Criteria:**

1. **Given** หน้า containers
   **When** admin ลงทะเบียนประเภท container
   **Then** กำหนด code prefix (PL, TT, BG, CG, C20/30/40, FC, PW, DMG-T), รหัสแรก, จำนวน, ขั้นตอนที่ใช้ และ capacity แล้วระบบสร้าง container ตามจำนวนที่กำหนด (FR-10)

2. **Given** container ที่สร้างแล้ว
   **When** พิมพ์ label
   **Then** container แต่ละตัวมี QR ถาวร 1 อัน ที่ไม่ซ้ำกันภายในคลัง (FR-10)

3. **Given** container 1 ตัว
   **When** สร้าง container
   **Then** container ต้องอยู่ใน location ใด location หนึ่งเสมอ (default คือ location ที่เลือกตอนสร้าง) (FR-10)

4. **Given** รายการ containers
   **When** render รายการ
   **Then** แสดงการใช้งานแบบ live (กำลังถือ pick list หรือ carrier wave อยู่ หรือว่างถ้าไม่ได้ใช้) และมีสถานะ *ต้องเคลียร์* ที่ห้ามนำกลับมาใช้ซ้ำจนกว่า user จะเคลียร์ (FR-10)
   **And** epic ถัดๆ ไปเป็นผู้ตั้งและเคลียร์สถานะเหล่านี้

> **หมายเหตุ pilot:** ใน pilot ยังไม่มีใครตั้งสถานะ "ถือ pick list / carrier wave / ต้องเคลียร์" จริง ให้ทดสอบ UI ด้วย seed data

---

### Story 2.13: Warehouse Layout Editor and Location Binding

**ในฐานะ** admin
**ฉันต้องการ** วาดผังคลังตามสัดส่วนจริง และผูกทุก location เข้ากับตำแหน่งบนผัง
**เพื่อให้** ระบบรู้ว่าแต่ละ location อยู่ตรงไหนในคลังจริง

**Acceptance Criteria:**

1. **Given** หน้า ตั้งค่าคลัง › คลังและตำแหน่ง › ผังคลัง
   **When** admin เปิดตัววาดผังของคลัง
   **Then** เห็นผังฉบับร่างบน canvas ตามสัดส่วน (หน่วยเมตร, snap ตาม grid) มีเครื่องมือ พื้นที่โซน, ชั้นวาง, ทางเดิน, ผนัง/สิ่งกีดขวาง, ประตู/ท่าโหลด, จุดเริ่ม/จบการหยิบ และป้ายข้อความ รวมถึงเลือก, ย้าย, หมุน, ปรับขนาด, ทำซ้ำ, ลบ, undo/redo, ซูม และเลื่อนผัง (FR-125)

2. **Given** เครื่องมือชั้นวาง
   **When** admin วาดชั้นวางแล้วกำหนดจำนวนช่อง × จำนวนชั้น และด้านที่หันเข้าทางเดิน
   **Then** ชั้นวางแสดงช่อง (slot) และผูก location ได้อัตโนมัติตามรูปแบบรหัส (ตัวหน้า, ช่วงแถว, ช่วงชั้น) หรือผูกทีละช่อง โดย 1 location ผูกได้แค่ 1 ช่อง และเห็นการผูกทั้งที่ช่องและที่ข้อมูล location (FR-125, FR-8)

3. **Given** location ในคลัง
   **When** admin เปิด panel การผูก
   **Then** panel แสดง location ประเภทหยิบและเก็บที่ยังไม่ผูกพร้อมจำนวน กรองตามโซนและประเภทได้ และเมื่อผูกจากรายการ ช่องบน canvas จะถูกไฮไลต์ (FR-125)

4. **Given** location ที่ปิดใช้หรือล็อกนับอยู่
   **When** ผูกเข้ากับช่อง
   **Then** ช่องนั้นแสดง tone และ icon ของสถานะ (FR-8, UX-DR10)

5. **Given** ผังฉบับร่าง
   **When** admin กด publish
   **Then** ระบบตรวจก่อน โดยปิดกั้นกรณี ชั้นวางที่ด้านหน้าไม่ติดทางเดิน, ทางเดินที่ไม่เชื่อมกับจุดเริ่มการหยิบ และไม่มีจุดเริ่มการหยิบ ส่วน location หยิบ/เก็บที่ยังไม่ผูกจะเตือนพร้อมจำนวนว่าจะใช้ลำดับเดินแทน เมื่อ publish สำเร็จเลข version เพิ่มขึ้นและถูกบันทึก log (FR-125, FR-107)

6. **Given** มีผังที่ publish แล้วและมีใบหยิบที่สร้างไว้แล้ว
   **When** publish version ใหม่
   **Then** ใบหยิบเดิมยังใช้ลำดับจุดเดิม เฉพาะใบหยิบที่สร้างหลังจากนี้ใช้ผังใหม่ (FR-125)

7. **Given** เปิดตัววาดผังบนจอที่แคบกว่า 1280px หรือผู้ใช้ไม่มีสิทธิ์แก้
   **When** หน้าเปิดขึ้น
   **Then** ผังเป็นแบบดูอย่างเดียว ซูมและเลื่อนได้ และ panel การผูกยังใช้ได้เป็นรายการที่ใช้ keyboard ได้ครบ แทนการใช้ canvas (UX-DR46, UX-DR42)

> **หมายเหตุ pilot:** การวาดประตูไม่ได้เปิดฟีเจอร์ประตู (FR-9 ยังเป็น Defer) · ใน pilot ยังไม่มีใบหยิบจริง AC ข้อ 6 ทดสอบด้วย route preview ของ version เดิมกับใหม่

---

### Story 2.14: Layout Route Engine and Route Preview

**ในฐานะ** admin
**ฉันต้องการ** ให้ระบบคำนวณเส้นทางเดินบนผังที่ publish แล้ว และให้ฉันดูตัวอย่างเส้นทางได้
**เพื่อให้** มั่นใจในลำดับการหยิบก่อนพนักงานเดินตามจริง

**Acceptance Criteria:**

1. **Given** ผังที่ publish
   **When** publish เสร็จ
   **Then** ระบบสร้างเครือข่ายทางเดิน (ทางเดิน, จุดเริ่ม/จบ, ด้านหน้าชั้นวาง) และคำนวณระยะเดินระหว่างทุกช่องที่ผูกแล้วกับจุดเริ่ม/จบไว้ล่วงหน้าสำหรับ version นั้น `[ARCH-PENDING: วิธี precompute]` (FR-125)

2. **Given** ชุด location และจุดเริ่ม
   **When** เรียก route service
   **Then** ได้ลำดับจุดตามระยะเดินสั้นที่สุดจากระยะที่คำนวณไว้ พร้อมระยะรวมเป็นเมตร · location ที่ยังไม่ผูกต่อท้ายตามลำดับเดิน · ถ้ายังไม่มีผังที่ publish ทุกจุดใช้ลำดับเดิน (FR-67, FR-8)

3. **Given** ช่วง peak
   **When** สร้างใบหยิบ
   **Then** การเรียงเส้นทางเพิ่มเวลาไม่เกินเป้าที่ตกลงกันต่อใบ `[ARCH-PENDING: เป้า latency]` (NFR-1)

4. **Given** หน้า ผังคลัง › ทดสอบเส้นทาง
   **When** admin เลือก location ตัวอย่าง (หรือ order line จริงที่รออยู่ เมื่อมี Epic 7 แล้ว)
   **Then** canvas วาดเส้นทางพร้อมเลขลำดับจุด ระยะรวม และเทียบกับการเดินตามลำดับเดิน (FR-125)

> **หมายเหตุ pilot:** ใช้ผังของคลังบางเขนจริงทดสอบ ถ้าเส้นทางไม่ตรงกับการเดินจริงต้องแก้ก่อนเริ่ม Epic 8 · Epic 8 (Story 8.2, 8.6, 8.9, 8.12) จะใช้ route service นี้

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
