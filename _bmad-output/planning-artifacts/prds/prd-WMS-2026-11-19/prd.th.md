---
title: "PRD: Zimple Fulfillment — Phase 1 (WMS Core)"
status: draft
created: 2026-11-19
updated: 2026-11-19
inputs:
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/brief.md
  - _bmad-output/planning-artifacts/briefs/brief-WMS-2026-11-19/addendum.md
  - artifact/Zimple Fulfillment Screens (Copy)/ (161 HTML mockups)
  - artifact/Zimple_Fulfillment_Feature_Inventory (1).docx
---

# PRD: Zimple Fulfillment — Phase 1 (WMS Core)

## 0. วัตถุประสงค์ของเอกสาร

PRD นี้กำหนด **Phase 1** ของ Zimple Fulfillment โดย Phase 1 คือแกนหลักของคลังสินค้า (warehouse core) ที่ทำให้คลังสินค้าของบริษัทเอง (**pilot warehouse**) เลิกใช้ JST ได้ทั้งหมด ทีม build, UX (`bmad-ux`), architecture (`bmad-architecture`) และการแตก epic/story (`bmad-create-epics-and-stories`) ควรทำงานโดยยึดเอกสารนี้เป็นหลัก

เอกสารนี้ต่อยอดจาก input ที่มีอยู่แล้วสามชิ้น และไม่เขียนซ้ำกับสิ่งเหล่านั้น:
- product brief ซึ่งครอบคลุมเรื่อง why, segment และการแบ่ง phase;
- HTML mockup 161 หน้า (ฝั่งคลังสินค้า 141 หน้า, owner-portal 20 หน้า) ซึ่งเป็น reference ด้าน visual และ interaction;
- Feature Inventory ซึ่ง map แต่ละหน้าเข้ากับ user journey

**วิธีอ่านเอกสารนี้:**
- คำศัพท์ถูกกำหนดตายตัวไว้ใน §3 Glossary ให้ใช้คำเหล่านั้นตรงตามที่กำหนด
- Feature ถูกจัดกลุ่มไว้ใน §4 แต่ละกลุ่มมี FR ที่ใช้เลขรันทั้งเอกสาร (FR-1 … FR-124) พร้อม consequence ที่ test ได้ FR-115 ถึง FR-124 ถูกเพิ่มหลังการ review และวางอยู่ในกลุ่ม feature ของตัวเอง ดังนั้นเลขภายใน section จึงไม่เรียงต่อกัน
- ระดับ priority เบื้องต้น (Must / Should / Defer) อยู่ใน §9.3
- สิ่งที่เป็นการอนุมานจะติด tag `[ASSUMPTION]` ไว้ใน inline และรวบรวม index ไว้ใน §12
- รายละเอียดระดับ rule ทั้งหมดเบื้องหลังแต่ละ FR (threshold, status label, ข้อความ Thai UI, ค่าตัวอย่างจาก mockup) อยู่ใน `addendum.md` และ FR-candidate catalogue สองชุดที่ addendum อ้างถึง หาก PRD กับ catalogue ขัดแย้งกัน ให้ยึด PRD เป็นหลัก

Phase 2 (multi-owner 3PL: Client Portal, billing, claims, Owners) และรายการ Later อยู่ **นอก scope** ของเอกสารนี้ (§8) อย่างไรก็ตาม Phase 1 ยังต้องเก็บข้อมูลที่ phase เหล่านั้นจะต้องใช้ (§4.16)

## 1. Vision

Zimple Fulfillment คือระบบบริหารคลังสินค้า (warehouse management system) สำหรับคลัง fulfillment ของ e-commerce ไทยที่ส่ง order ของ Shopee, Lazada และ TikTok Shop ประมาณ 30,000 order ต่อวัน โดยมี campaign spike อย่าง 11.11 ปัจจุบันคลังสินค้าใช้ JST อยู่ JST มีค่า license, lock operator ไว้กับระบบ, interface ล้าสมัย และไม่ครอบคลุม fulfillment cycle ทั้งหมด ตัวอย่างเช่น JST แยกพัสดุตาม carrier ตอน handover โดยไม่มีสถานะ sorted ก่อนขึ้นรถ และไม่สามารถ hold สินค้าของ order ที่ถูกยกเลิกไว้เพื่อคืนเข้า stock ได้

Phase 1 ส่งมอบ WMS core ที่เทียบเท่า JST (JST parity) บวกกับการปิด gap ของ JST สองข้อข้างต้น ผ่านสาม surface ได้แก่ warehouse web app, หน้าจอ PDA สำหรับงานหน้างาน และ packing/handover station ที่ผูกกับ printer, เครื่องชั่ง และกล้อง stock ทุกหน่วยสามารถ trace ได้ผ่าน ledger ที่แก้ไขไม่ได้ (immutable) และทุก order ที่แพ็กแล้วมีหลักฐาน ได้แก่ scan, น้ำหนัก และวิดีโอ Order, SKU และ ASN มาจาก OMS สำหรับ pilot นั้น OMS คือ **Zimple OMS** ดังนั้น pilot จะย้ายออกจาก JST ทั้งในส่วน order management และงานคลังสินค้า

ราคาจะตั้งตาม JST และไม่มี technical moat ดังนั้น Phase 1 ต้องชนะด้วยสองเรื่องเท่านั้น: UX ที่ทันสมัยซึ่งพนักงานหน้างานเรียนรู้ได้เร็วกว่า และการปิด gap ที่ JST ปล่อยให้ไปทำใน Excel, LINE และกระดาษ Phase 1 ยังเป็นรากฐานสำหรับเดิมพันที่ใหญ่กว่า นั่นคือการเป็น fulfillment platform มาตรฐานสำหรับคลังสินค้า e-commerce ไทย โดยมีเป้าหมายดึงคลังสินค้า 50% ที่ใช้ JST อยู่ในปัจจุบัน

## 2. ผู้ใช้เป้าหมาย

### 2.1 Jobs To Be Done

- **Warehouse manager:** "บริหาร volume ของวันให้ทุก order ทัน carrier wave ของตัวเอง รู้ก่อนว่า wave จะพลาด ไม่ใช่มารู้ทีหลัง"
- **Supervisor:** "เห็นว่างานติดอยู่ตรงไหน: receiving, picking, packing, handover ปลดล็อกด้วยอำนาจที่ฉันมี และทิ้ง audit trail ไว้"
- **พนักงานหน้างาน** (receiver, putaway, picker, sorter, packer, handover, returns, stock): "Scan แล้วได้คำตอบชัดเจนว่าใช่หรือไม่ใช่ แล้วไปต่อ ทำให้ความผิดพลาดเกิดขึ้นไม่ได้ตั้งแต่แรก ไม่ใช่มาจับได้ทีหลัง"
- **พนักงานหน้างานใหม่หรือแรงงานรายวัน:** "ทำงานได้ตั้งแต่กะแรกโดยไม่ต้องเรียนรู้ระบบที่ซับซ้อน"
- **CS / office:** "ตอบคำถาม 'order นี้อยู่ไหน?' และ 'เกิดอะไรขึ้นกับพัสดุนี้?' พร้อมหลักฐาน (timeline, วิดีโอ, manifest) ได้ภายในไม่ถึงหนึ่งนาที"
- **Admin:** "ตั้งค่าคลังสินค้าครั้งเดียว (location, device, rule, role) และเปลี่ยน rule ได้อย่างปลอดภัย พร้อม effective date และประวัติ"
- **บริษัท (ในฐานะเจ้าของสินค้า):** "มั่นใจได้ว่า stock ใน WMS ตรงกับ stock บนชั้นวางและใน OMS เพื่อไม่ให้ marketplace oversell"

### 2.2 ผู้ที่ไม่ใช่ผู้ใช้ (Phase 1)

- **พนักงานของ owner ที่เป็นลูกค้า 3PL** Client Portal อยู่ใน Phase 2 pilot คือคลังสินค้าของแบรนด์ที่มี owner เพียงรายเดียวคือบริษัทเอง
- **คนขับรถของ fleet ตัวเอง** Driver app และ TMS อยู่ใน Later
- **ฝ่ายจัดซื้อ, HR/ผู้วางแผนกำลังคน** การจัดซื้อและ workforce planning เป็น add-on ใน Later
- **ผู้ใช้ฝ่ายบัญชีสำหรับ warehouse billing** 3PL billing อยู่ใน Phase 2 ฝ่ายบัญชีอาจอ่าน report ได้

### 2.3 User Journey หลัก

ตัวละครหลักเป็นเพียงตัวอย่าง `[ASSUMPTION]` ใช้แทน role ใน brief ไม่ใช่ผู้ใช้ที่ได้สัมภาษณ์จริง

- **UJ-1. สมชายรับรถบรรทุกที่ไม่ตรงกับ notice**
  - **Persona + บริบท:** สมชายเป็น inbound receiver ที่ pilot warehouse ทำงานที่ desktop receiving station ที่มีกล้อง
  - **สถานะเริ่มต้น:** รถบรรทุกมาถึงเวลา 10:20 ASN จาก Zimple OMS ระบุว่ามี 30 กล่อง
  - **เส้นทาง:**
    1. เขาเปิด temporary receipt สำหรับรถคันนั้น นับกล่องนอกได้ 28 กล่อง ถ่ายรูปส่วนที่ขาด และให้ผู้ส่งเซ็นบนหน้าจอ
    2. เขา scan ASN เพื่อเปิดการ receiving และ scan สินค้าหนึ่งชิ้นเพื่อเลือก SKU
    3. เขานับตาม carton pattern และกรอก lot และวันหมดอายุ ระบบคำนวณ shelf life ที่เหลือให้
    4. มี lot หนึ่งที่ต่ำกว่า minimum shelf life หน้าจอจึงขอการยืนยันจาก supervisor
    5. เขาพิมพ์ carton QR label และปิด pallet การปิด pallet จะสร้าง putaway task
  - **จุดไคลแมกซ์:** พนักงาน putaway scan location ที่ระบบแนะนำบน PDA stock เปลี่ยนจาก awaiting putaway เป็น sellable และ order ที่รอ SKU นั้นถูก reserve ทันที
  - **บทสรุป:** Receipt ปิดพร้อม short/damaged summary ที่ส่งกลับไปยัง Zimple OMS
  - **Edge case:** มีการ scan กล่องที่เป็น SKU ของ owner รายอื่น หน้าจอสีแดงปฏิเสธ และกล่องนั้นถูกแยกออกไป
- **UJ-2. นกหยิบ batch ในวัน 11.11 แล้วเจอ location ที่สินค้าขาด**
  - **Persona + บริบท:** นกเป็น picker ที่ทำงานสัปดาห์ที่สอง ใช้ PDA
  - **เส้นทาง:**
    1. เธอ claim pick list จาก shared queue
    2. เธอ scan รถเข็นของเธอ แล้วเดินตาม snake route โดย scan location และสินค้า
  - **จุดไคลแมกซ์:** ที่จุดที่ 14 location มีอยู่ 2 ชิ้น ไม่ใช่ 5 ชิ้น เธอกด "short" ระบบเสนอ location ทางเลือกที่มี lot ที่ยังไม่ถูก allocate เมื่อไม่มีที่ไหนเหมาะ ระบบจะสร้าง urgent replenishment และย้าย line นั้นไปไว้ท้าย list ของเธอ
  - **บทสรุป:** Replenishment เสร็จ และ line นั้นเปลี่ยนเป็น "pickable" เธอทำงานเสร็จและวางรถเข็นไว้ที่ staging ไม่มี stock ใดถูก auto-adjust
  - **Edge case:** หาไม่เจอที่ไหนเลย ระบบจะ queue urgent blind count และ order แสดง "insufficient stock" จนกว่า supervisor จะ approve variance
- **UJ-3. พลอยแพ็ก order ที่ถูกยกเลิกระหว่างที่เธอกำลังทำงาน**
  - **Persona + บริบท:** พลอยเป็น packer ที่ station PS-04 มี scanner, เครื่องชั่ง, label printer และกล้อง
  - **เส้นทาง:**
    1. เธอ scan QR ของ pick list งานถูกเปิดและวิดีโอเริ่มบันทึก
    2. ระบบแนะนำกล่องและเธอ scan กล่องนั้น
    3. เธอ scan สินค้าทุกชิ้น น้ำหนักถูกตรวจเทียบกับ tolerance
  - **จุดไคลแมกซ์:** ก่อน label จะพิมพ์ ระบบตรวจสอบการยกเลิกซ้ำอีกครั้งและพบว่าผู้ซื้อยกเลิกไปเมื่อ 40 วินาทีที่แล้ว การพิมพ์ label ถูก lock ระบบสร้าง exception "cancelled during packing" และสินค้าถูกนำไปที่ cancelled-goods location
  - **บทสรุป:** มี cancel-return job เกิดขึ้น วิดีโอที่ link กับ order แสดงให้เห็นชัดเจนว่าเกิดอะไรขึ้น
  - **Edge case:** เครื่องชั่งอ่านค่าได้เกินกว่าที่คาดไว้ 6% กล่องถูก hold ไว้ให้ supervisor ตรวจสอบ
- **UJ-4. แอนปิดวันที่ handover**
  - **Persona + บริบท:** แอนเป็นหัวหน้า handover สำหรับ wave ของ Flash, J&T และ SPX
  - **เส้นทาง:**
    1. ทีมของเธอ sort พัสดุที่แพ็กแล้วลงใน carrier container ทุกการ scan ตรวจว่าแพ็กแล้ว, carrier ถูกต้อง และไม่ถูกยกเลิก นี่คือสถานะ **sorted** ที่ JST ไม่มี
    2. พัสดุที่ถูกยกเลิกทำให้หน้าจอเป็นสีแดงและถูกดึงไปที่ cancelled-goods location
    3. เมื่อรถของ Flash มาถึง เธอลงทะเบียนรถและ scan container (ไม่ใช่พัสดุ) ขึ้นรถ
    4. Rider เซ็นบน PDA และ manifest ถูกแยกตาม shop account
  - **จุดไคลแมกซ์:** การยืนยัน handover จะตัด stock และใบรับของ carrier ถูก reconcile รายพัสดุ
  - **บทสรุป:** เวลา 22:00 checklist ปิดวันแสดง "เหลือ 2 รายการ": พัสดุ not-found หนึ่งชิ้นที่ยังไม่มีใคร claim และพัสดุที่ carrier ปฏิเสธหนึ่งชิ้นที่ยังไม่ได้ตรวจสอบ เธอจัดการทั้งสองรายการและปิดวัน พัสดุที่เหลือ carry over โดยไม่สร้าง record ใหม่
- **UJ-5. ดาวดำเนินการรับพัสดุตีกลับที่ carrier นำมาส่ง**
  - **Persona + บริบท:** ดาวเป็นพนักงาน returns ที่ station ที่มีกล้อง
  - **เส้นทาง:**
    1. J&T นำพัสดุมาส่ง 40 ชิ้น เธอเปิด return receipt หนึ่งใบสำหรับ J&T และ scan ทุก label label ของ Flash ถูกปฏิเสธ
    2. มีพัสดุหนึ่งชิ้นที่ไม่ match กับ order ใดที่ handover ไปแล้ว จึงไปที่ return quarantine พร้อม problem report อัตโนมัติ
    3. เธอตรวจสอบสินค้าแต่ละชิ้น: ดี, เสียหาย หรือผิด SKU ทุกชิ้นที่ไม่ดีต้องถ่ายรูป
  - **จุดไคลแมกซ์:** สินค้าที่ดีจะกลายเป็น sellable เมื่อเธอ scan เข้า location
  - **บทสรุป:** สินค้าที่เสียหายอยู่ใน damaged stock problem report ถูกส่งไปยัง OMS after-sales เป็น decision case แล้ว
- **UJ-6. กฤษ cut over pilot warehouse ออกจาก JST**
  - **Persona + บริบท:** กฤษเป็น admin และ warehouse manager
  - **เส้นทาง:**
    1. เขา bulk-import zone และ location
    2. เขาลงทะเบียน PDA, station และ printer แล้ว test แต่ละตัว
    3. เขาสร้าง user และพิมพ์ badge QR
    4. SKU sync มาจาก Zimple OMS เขา import ยอดยกมา (opening balance) ตาม owner × SKU × lot × location ซึ่งต้องผ่านการ approve
    5. เขาทำ full blind count และเปรียบเทียบยอดรวมใน ledger กับข้อมูลที่ import
  - **จุดไคลแมกซ์:** Stock ถูก push ไปยัง Zimple OMS และ live wave แรกทำงานบน Zimple ขณะที่ JST ถูกปิด
  - **บทสรุป:** Reconciliation รายวันเวลา 06:00 แสดงว่า WMS = OMS

## 3. Glossary

เอกสาร downstream ต้องใช้คำเหล่านี้ตรงตามที่กำหนด Thai UI label จะระบุไว้ในวงเล็บสำหรับคำที่พนักงานหน้างานจะเห็น

**คู่สัญญาและระบบ**
- **OMS** — ระบบบริหาร order ที่เป็นเจ้าของ order, SKU master, kit และ ASN ใน pilot คือ Zimple OMS WMS ใช้ข้อมูลจาก OMS และไม่สร้าง แก้ไข หรือยกเลิก order เองเลย
- **Owner** — เจ้าของสินค้าตามกฎหมาย (เจ้าของสินค้า) ทุก stock record, เอกสาร และ SKU เป็นของ owner รายเดียว ใน pilot มี owner รายเดียวคือบริษัท
- **Decision case** — คำขอให้ฝั่ง owner ตัดสินใจ (การจัดการสินค้าเสียหายหรือสินค้าที่ถูก hold, การรับเกินหรือสินค้านอกรายการ, problem report, สินค้าตีกลับที่ไม่ match) WMS ส่ง case พร้อมหลักฐานไปยัง OMS after-sales ซึ่งเป็นที่ตัดสินใจ และดำเนินการตามคำตัดสินที่ส่งกลับมา WMS ไม่ตัดสินใจแทนฝั่ง owner เองเลย

**โครงสร้างคลังสินค้าและอุปกรณ์**
- **Warehouse → Zone → Location** — ลำดับชั้นทางกายภาพ location มีประเภท ได้แก่ pick, storage, receiving, staging, handover, returns, awaiting-restock หรือ damaged/quarantine
- **Container** — ภาชนะบรรจุที่ใช้ซ้ำได้และมี QR ถาวรหนึ่งอัน: pallet PL, tote TT, bag BG, cage CG, cart C20/30/40, flat cart FC, put wall PW, damaged tote DMG-T container อยู่ใน location เสมอ
- **Station** — โต๊ะ packing, receiving, returns หรือ handover พร้อม device ที่ผูกไว้ (PC, scanner, printer, เครื่องชั่ง, กล้อง) station จะไม่ได้รับงานจนกว่า device จะถูกผูกและ test แล้ว

**Stock**
- **Stock section** — หนึ่งในสามประเภท: normal, returns, damaged/quarantine เฉพาะ normal stock เท่านั้นที่ reserve ได้
- **Held lot** — lot ที่ถูกบล็อกไม่ให้ allocate เนื่องจาก hold หรือ recall (FR-115)
- **ATP (available to promise)** — Normal stock ลบด้วยที่ reserve แล้ว ลบด้วย held lot ลบด้วย lot ที่ต่ำกว่า effective minimum remaining shelf life ตัวเลขนี้ยังเป็นตัวเลข *available-to-sell* ที่ push ไปยัง OMS ด้วย
- **Ledger line (SL)** — record ที่แก้ไขไม่ได้ของการเปลี่ยนแปลงจำนวนหรือ location ของ stock ใดๆ แก้ไขได้เฉพาะด้วย reversal ที่ approve แล้วหรือ move ใหม่เท่านั้น ห้าม edit
- **Move (MV)** — task ที่ย้าย stock: putaway, replenishment, ad-hoc move หรือ material issue
- **Replenishment** — move จาก reserve ไปยัง pick location ที่ขับเคลื่อนด้วย min/max จะเป็น *urgent* เมื่อถูก trigger โดย short pick
- **Count round (CC)** — การนับที่วางแผนไว้ เป็น blind count โดย default **urgent count** คือการนับ location เดียวที่ระบบสร้างขึ้นเอง
- **Misplacement pair** — การขาดที่ location หนึ่งคู่กับการเกินของ SKU และ lot เดียวกันในที่อื่น แก้ไขด้วย move ไม่ใช่ adjustment
- **FEFO** — การ allocate แบบ first-expired, first-out
- **Minimum remaining shelf life** — threshold ที่ต่ำกว่านี้ lot จะไม่ถูกรับหรือส่งออกหากไม่มี exception ระดับที่เข้มงวดที่สุดเป็นตัวตัดสิน
- **Settings precedence** — System → company → warehouse → owner → SKU ค่าที่เจาะจงที่สุดเป็นตัวตัดสิน

**Inbound**
- **ASN** — การแจ้งล่วงหน้าของการส่งสินค้าขาเข้า (`AS-YYMMDD-NNN`) มาจาก OMS และ link กับรายการสินค้าของ owner หนึ่งรายการขึ้นไป
- **Temporary receipt (TM)** — record การมาถึงของรถหนึ่งรอบ: จำนวนกล่องนอก, สภาพ, ลายเซ็น ไม่สร้าง stock
- **Receipt** — ผลลัพธ์ที่ปิดแล้วของการ receiving เทียบกับ ASN พร้อม short/over/damaged summary
- **Putaway** — การวางสินค้าที่รับเข้าไว้ใน location เป็นจังหวะที่ stock กลายเป็น sellable
- **Quarantine** — stock ที่ถูก hold ไว้ไม่ให้ขายระหว่างรอการตัดสินใจ (การรับเกิน, สินค้านอกรายการ, สินค้าตีกลับที่ไม่ match)

**Outbound**
- **Pick list (PK)** — หน่วยของงาน picking เลขที่ของมันใช้ร่วมกับ pack job และ prep sheet การ re-pick จะสร้าง child `PK-…-1`
- **Draft wave (WV)** — การจัดกลุ่ม order เป็น pick list ที่ยังแก้ไขได้ก่อนการยืนยัน
- **Carrier wave** — รอบรับสินค้าตามกำหนดของ carrier พร้อม **pack cut-off** ซึ่งเป็นเวลาล่าสุดที่ต้องแพ็กเสร็จ
- **Missed wave** — order ที่ถูกเลื่อนไป carrier wave ถัดไปหลังจากรถออกไปแล้ว
- **Short pick** — ไม่พบจำนวนที่ต้องการที่ location ที่ allocate ไว้
- **Pack job** — งาน packing สำหรับ pick list หนึ่งใบ
- **Pack video** — การบันทึกวิดีโอของ station ต่อ order ซึ่งต้องเห็น label ของ order
- **Paired material** — วัสดุบรรจุภัณฑ์ที่ถูกตัดใช้อัตโนมัติพร้อมกล่องหรือ SKU เมื่อปิดกล่อง
- **Sorted** — สถานะก่อน handover ของพัสดุที่ถูกวางลงใน carrier/wave container หลังผ่านการตรวจ packed, carrier และ cancellation
- **Handover confirm** — จุดที่ stock ถูกตัด (shipped)
- **Manifest (MF)** — record handover ที่เซ็นแล้วต่อ carrier wave หรือ pickup appointment มี child manifest ต่อ carrier account
- **Day close** — snapshot ของ handover ตอนสิ้นวันที่ต้องผ่าน checklist ก่อน พัสดุที่ยังไม่ได้ handover จะ **carry over** โดยไม่สร้าง record ใหม่

**การยกเลิกและสินค้าตีกลับ**
- **Cancellation stage** — ก่อน pick, หลัง pick, หลัง pack หรือหลัง handover stage เป็นตัวกำหนดงาน follow-up
- **Cancelled-goods location (CXL)** — location สำหรับ hold และโต๊ะแกะกล่องสำหรับสินค้าที่ถูกยกเลิก
- **Cancel-return job** — งานคืนสินค้าของ order ที่ถูกยกเลิกก่อนออกจากคลังสินค้า
- **Expected return** — record ที่ระบบสร้างขึ้นเพื่อคาดการณ์พัสดุที่จะตีกลับ
- **Return receipt (RT)** — session การรับพัสดุตีกลับที่ carrier หนึ่งรายนำมาส่ง
- **Problem report (RP)** — ปัญหาที่มีหลักฐานประกอบของสินค้าตีกลับหรือพัสดุที่รับเข้ามา เมื่อ return rule matrix กำหนดให้ต้องให้ owner ตัดสินใจ จะกลายเป็น decision case

**Control engine**
- **Approval** — การอนุมัติแบบหนึ่งหรือสองขั้นที่ตั้งค่าได้ approval ที่เกี่ยวกับเงินไม่สามารถ self-approve ได้เลย
- **Special permission** — สิทธิ์ที่ sensitive ซึ่งอยู่นอก page × action matrix เช่น การดู PII ของผู้ซื้อ หรือ ad-hoc move

## 4. Feature

Actor: Admin (รวมถึง customer admin), Warehouse Manager, Supervisor, Planner, CS, Office user (web user ใดก็ได้), Receiver, Putaway staff, Picker, Sorter, Prep staff, Packer, Handover staff, Returns staff, Stock staff (รวมถึงผู้นับ), System เลขที่เอกสารใช้รูปแบบ `PREFIX-YYMMDD-seq` โดยใช้ปีคริสต์ศักราช

### 4.1 การเชื่อมต่อ OMS & Carrier

**คำอธิบาย:** WMS อยู่ downstream ของ OMS Zimple OMS คือ OMS ของ pilot และเป็น integration ที่สำคัญที่สุดของ Phase 1 WMS ยังมี generic API เพื่อให้ OMS อื่นเชื่อมต่อได้ Connector สำเร็จรูปสำหรับ JST, Zort และ OMS ที่คล้ายกันจะทำหลัง pilot `[ASSUMPTION]`

Marketplace order มาพร้อม carrier และ label ที่ marketplace ออกให้ ซึ่งได้รับผ่าน OMS เฉพาะ order ที่ไม่ใช่ marketplace (LINE, web, B2B) เท่านั้นที่เรียก carrier (Flash, KEX, J&T) โดยตรงเพื่อขอ tracking number และ label WMS push status, tracking, stock และผล inbound กลับไปยัง OMS รองรับ UJ-1, UJ-3, UJ-6

#### FR-1: การรับ Order จาก OMS
System สามารถ ingest order จาก OMS ที่เชื่อมต่อและ reserve stock เมื่อได้รับ order

**Consequences:**
- แต่ละ order ได้เลข `SO-YYMMDD-NNNNN` และเก็บ channel, เลข order ของ channel, external reference, owner, carrier, cut-off, ผู้รับ และ line
- การส่งซ้ำที่มี source reference เดียวกันจะไม่สร้าง order ที่สอง
- ไม่มีช่องทางสร้าง order หรือ import ไฟล์จากฝั่งคลังสินค้า
- Shipment ที่ merge กันจะแสดงเลข order ของ channel ทุกเลขที่อยู่ในนั้น

#### FR-2: ความพร้อมของข้อมูล Carrier
System สามารถ hold order ไว้ในสถานะ *awaiting carrier data* จนกว่าจะมี tracking number และ label และไม่นำ order นั้นไปสร้าง pick list

**Consequences:**
- ข้อมูล carrier ถูกดึงใหม่ทุก 5 นาที หลังจาก 2 ชั่วโมงที่ไม่มีข้อมูล owner จะได้รับแจ้งผ่าน OMS
- สำหรับ order ที่ไม่ใช่ marketplace ระบบจะขอ tracking number และ label จาก carrier API เมื่อ order เข้ามา
- ชื่อ carrier ที่ยังไม่ได้ map จะทำให้ order ถูก hold และเกิด alert ระบบไม่เดา carrier เองเลย order จะ re-queue เมื่อ carrier ถูก map แล้ว

#### FR-3: การ Sync SKU, Kit และ ASN
System สามารถ sync SKU master data, kit BOM และ ASN จาก OMS และแสดง field ที่ OMS เป็นเจ้าของเป็น read-only

**Consequences:**
- ไม่สามารถเปลี่ยน field ที่ OMS เป็นเจ้าของ (code, name, cost, BOM, ASN line) ใน WMS ได้
- SKU ที่ถูก retire ใน OMS จะกลายเป็น "use up before retire" ไม่ถูกลบ
- Cost ถูก sync พร้อมประวัติ effective date และมองเห็นได้เฉพาะผู้ที่มี special permission *view product cost*

#### FR-4: การ Sync ขาออกไปยัง OMS
System สามารถ push order status, tracking number, available-to-sell stock และผล inbound receipt ไปยัง OMS

**Consequences:**
- Available-to-sell ที่ push ไปยัง OMS เท่ากับ ATP (FR-41)
- การส่งที่ล้มเหลวจะถูก retry อัตโนมัติ หลังจาก retry ครบแล้วจะปรากฏใน failed-sends queue พร้อม error
- Admin สามารถ force-push stock ของ WMS ไปยัง OMS ได้ การกระทำนี้ถูก log และไม่ต้อง approve

#### FR-5: การรับ Cancellation และ Change Request
System สามารถ ingest การยกเลิกจาก OMS และ change request ของ owner ได้ในทุก stage และหยุดงานที่ได้รับผลกระทบ (ดู §4.11)

**Consequences:**
- การยกเลิกแต่ละครั้งบันทึก stage และ actor ที่ยกเลิก (buyer, platform หรือ owner)
- Change request จะนำ order ออกจาก pick-list draft ก่อนเริ่ม picking หลังจากเริ่ม picking แล้ว จะหยุด order ที่การ scan ครั้งถัดไป

#### FR-6: Tracking Event หลัง Handover
System สามารถบันทึก milestone หลัง handover (carrier received, delivered, failed delivery)

**Consequences:**
- Marketplace order ได้รับ event เหล่านี้จาก OMS order ที่ไม่ใช่ marketplace ได้รับจาก carrier API `[ASSUMPTION]`
- Event failed-delivery จะสร้าง expected return (FR-98)

#### FR-7: Reconciliation รายวัน
System สามารถสร้าง reconciliation รายวันเวลา 06:00 เปรียบเทียบ ledger balance กับผลรวมของ ledger line และ stock ของ WMS กับ stock ของ OMS

**Consequences:**
- ความต่างใดๆ จะเกิด notification ที่ปิดไม่ได้
- Report แสดงรายการ SKU × owner แต่ละรายการที่มีความต่าง

**Notes:** Rate limit และพฤติกรรมช่วง peak ของ Zimple OMS API เป็น architecture dependency (§7)

#### FR-119: การตั้งค่า Connection
Admin สามารถตั้งค่า OMS connection, carrier account และ credential, ตาราง mapping ชื่อ carrier และ API key และ webhook สำหรับ generic API

**Consequences:**
- Connection สามารถ test ได้ก่อน enable และมองเห็นสถานะ last-sync ได้
- ชื่อ carrier ที่ยังไม่ได้ map จาก OMS จะปรากฏในตาราง mapping จนกว่าจะถูก map (FR-2)
- การสร้างหรือ revoke API key และการเปลี่ยน credential ต้องได้รับ approval จาก customer admin เมื่อ Zimple support เป็นผู้ดำเนินการ (FR-23) และถูก log เสมอ

#### FR-121: Decision Case ไปยัง OMS After-sales
System สามารถส่ง decision case (พร้อมรูป, วิดีโอ และจำนวน) ไปยัง OMS after-sales รับคำตัดสิน และแปลงเป็นงานในคลังสินค้า

**Consequences:**
- แหล่งที่มาของ case: การรับเกินและสินค้านอกรายการ (FR-36), stock ที่เสียหายหรือถูก hold (FR-54), สินค้าตีกลับที่ไม่ match (FR-100) และ problem report ที่ต้องให้ owner ตัดสินใจ (FR-103)
- คำตัดสินที่ส่งกลับมาจะสร้าง task ที่ตรงกัน: dispose, คืนให้ owner, restock หรือเพิ่มเข้า stock
- Case ที่รอนานกว่าเวลาที่ตั้งค่าไว้จะเกิด alert สินค้ายังคงถูก hold ไม่ถูก dispose อัตโนมัติเลย
- ขึ้นกับการรองรับ after-sales ของ Zimple OMS (Q-3)

### 4.2 การตั้งค่าคลังสินค้า (Warehouse Setup)

**คำอธิบาย:** Admin สร้างโมเดลของคลังสินค้าจริงและอุปกรณ์ต่าง ๆ เพียงครั้งเดียว แล้วแก้ไขได้อย่างปลอดภัยในภายหลัง Rule ต่าง ๆ ตั้งค่าได้แยกตามคลัง พร้อม effective date และประวัติการเปลี่ยนแปลง Rule ที่ยังไม่ได้ตั้งค่าจะ fallback ไปใช้ค่า default ของระบบ ทำให้คลังเริ่มใช้งานได้ทันที รองรับ UJ-6

#### FR-8: คลังสินค้า, zone และ location
Admin สามารถสร้างคลังสินค้า (รหัส 3 ตัวอักษร), zone (ประเภทห้อง, capacity, รูปแบบ walk-order) และ location ได้ทั้งทีละรายการหรือแบบ bulk

**ผลที่ตามมา:**
- Location หนึ่งมีประเภทใดประเภทหนึ่งจาก 8 ประเภท, มี zone, walk sequence, sellable flag, capacity (m³ และ kg) และ mixing policy
- Location ที่ *disabled* จะบล็อก putaway และการ move ส่วน location ที่ *locked for counting* จะถูกตั้งได้โดยการนับ (count) เท่านั้น
- QR label ของ location พิมพ์แบบ bulk ได้ SKU หนึ่งตัวอยู่ได้หลาย location
- คลังจะ disable ได้ก็ต่อเมื่อไม่มี stock เหลืออยู่เลย และต้องได้รับการอนุมัติเท่านั้น

#### FR-9: ประตู (door) และจุด staging
Admin สามารถเปิดใช้ door และจุด staging ที่ผูกกับ door ได้ โดยค่า default คือปิดไว้

**ผลที่ตามมา:**
- Door ไม่เก็บ stock ส่วนจุด staging เป็น stock location
- เมื่อปิดฟีเจอร์นี้ flow ของ handover และ inbound ทำงานได้โดยไม่ต้องกำหนด door

#### FR-10: Container
Admin สามารถลงทะเบียนประเภท container พร้อม code prefix, จำนวน, stage ที่ใช้ และ capacity รวมถึงพิมพ์ label ได้

**ผลที่ตามมา:**
- Container แต่ละใบมี QR ถาวรหนึ่งอัน ซึ่ง unique ภายในคลัง
- Live usage แสดงว่า pick list หรือ carrier wave ใดกำลังใช้ container ใบนั้นอยู่
- รถเข็น (cart) ที่มีของค้างจาก list ที่ถูกยกเลิกจะแสดงสถานะ *needs clearing* และนำกลับมาใช้ไม่ได้จนกว่าจะเคลียร์

#### FR-11: อุปกรณ์ (device) และ station
Admin สามารถลงทะเบียน device (PC, USB scanner, PDA, printer, เครื่องชั่ง, กล้อง) ผูกเข้ากับ station หรือ work point และทดสอบได้

**ผลที่ตามมา:**
- PC ผูกกับ station ด้วยรหัส 6 หลัก และแจ้งเตือนอุปกรณ์ต่อพ่วงที่หายไปตอน boot
- Station ที่ device ยังไม่ผูก, ยังไม่ทดสอบ หรือมี fault จะไม่ได้รับงาน
- สถานะ device แสดงเป็น online, offline มา N นาที, ready, กระดาษหมด, ต้องซ่อม หรือ untested
- เมื่อเปิด *restrict work by work point* device ที่ work point หนึ่งจะเปิดได้เฉพาะงานของแผนกนั้น

#### FR-12: Rule ของคลังสินค้า
Admin หรือ Warehouse Manager สามารถตั้งค่า rule แยกตามคลัง โดยจัดกลุ่มตาม stage ได้แก่ inbound, picking, packing, inventory, handover, returns และ cancel-to-restock

**ผลที่ตามมา:**
- ทุกการเปลี่ยนแปลงมี effective date และประวัติ และแสดงระดับ (level) ที่ค่านั้นมาจาก
- Settings hub แสดงรายการ blocker ที่ *must set before use* และ rule ที่ *still on system default*
- มี filter ที่แสดงเฉพาะ rule ที่ต่างจากค่า default
- Rule ที่ใช้เฉพาะกับ billing, 3PL หรือ add-on ที่ไม่อยู่ใน scope จะถูกซ่อนไว้ใน Phase 1

#### FR-13: ลำดับความสำคัญของ setting (Settings precedence)
ระบบสามารถ resolve ทุก setting ตามลำดับความสำคัญ (system → company → warehouse → owner → SKU)

**ผลที่ตามมา:**
- ค่าที่เฉพาะเจาะจงที่สุดชนะ ยกเว้น threshold ของ shelf-life ที่ค่าเข้มงวดที่สุดชนะ
- Rule ที่ถูกระบุเป็น *warehouse-wide* จะ override ในระดับต่ำกว่า warehouse ไม่ได้
- ระดับ owner มีอยู่ใน data model แต่ไม่มี UI ใน Phase 1 ค่าระดับ owner มี default เป็น "use warehouse value" `[ASSUMPTION]`

#### FR-14: รอบรับสินค้าของ carrier (Carrier pickup rounds)
Admin สามารถตั้งค่ารอบ pickup ของ carrier แยกตามคลัง ได้แก่ เวลา, pack cut-off, วัน, handover mode, door และ effective date

**ผลที่ตามมา:**
- Carrier ที่ไม่มีรอบ pickup จะส่งของไม่ได้
- Pack cut-off = เวลา pickup − X นาที (เป็น setting)
- วัน campaign เพิ่มรอบพิเศษได้
- Handover mode: container ต่อ wave, ต่อ order (rider), ตามขนาดงาน, ตามเที่ยวรถ

#### FR-15: การกำหนดเลขที่เอกสาร (Document numbering)
Admin สามารถตั้ง prefix ของเอกสาร (2–4 ตัวอักษร, unique) และจำนวนหลักได้

**ผลที่ตามมา:**
- การเปลี่ยนแปลงมีผลกับ record ใหม่เท่านั้น
- จำนวนหลักเพิ่มได้แต่ลดไม่ได้
- มีคำเตือนเมื่อจำนวนหลักน้อยเกินไปสำหรับ volume ช่วง peak

#### FR-16: ปฏิทินคลังสินค้า (Warehouse calendar)
Admin สามารถตั้งปฏิทินวันทำงานและวันหยุดของแต่ละคลังได้ SLA ของแต่ละ stage และ alert *overdue* ใช้ปฏิทินนี้

**นอก Scope:** การวางแผน shift และการคำนวณกำลังคน (Later)

#### FR-122: Web fallback สำหรับคลังที่ไม่มี PDA
พนักงาน office หรือหน้างานสามารถทำทุก flow หน้างานบน web ได้สำหรับคลังที่ไม่มี PDA ได้แก่ receiving, putaway, move, counting, picking, sorting, handover และ returns

**ผลที่ตามมา:**
- เมื่อเปิด rule *confirm by paper task* ระบบจะพิมพ์ใบงานพร้อม QR code (pick list, ใบ move, ใบนับ) และพนักงาน confirm ผลบน web
- ทุก control ที่ใช้บน PDA (location confirm, cancellation check, quantity limit, approval) ใช้กับการ confirm บน web ด้วย
- Ledger line บันทึก device เป็น web และบันทึก user ที่ confirm เป็น actor

### 4.3 ผู้ใช้, สิทธิ์การเข้าถึง และการ Sign-in

**คำอธิบาย:** พนักงาน office sign in บน web ส่วนพนักงานหน้างาน sign in บน PDA โดยการสแกนบัตร (badge) สิทธิ์การเข้าถึงเป็น matrix แบบ role-based ของ page × action บวกกับ special permission โดยจำกัด scope ตามคลังและ work point บัตรแรงงานรายวัน (day-labour card) ทำให้พนักงานชั่วคราวเริ่มงานได้ตั้งแต่วันแรก รองรับ UJ-2, UJ-6

#### FR-17: ผู้ใช้ (Users)
Admin สามารถสร้าง user พร้อม role (เลือกเป็นแบบชั่วคราวพร้อมวันหมดอายุได้), scope คลัง และวิธี sign-in (QR badge, username + password, OTP แบบ optional)

**ผลที่ตามมา:**
- User ที่ถูก suspend จะ sign in ไม่ได้
- จำนวน user ถูกจำกัดตาม license package

#### FR-18: Role
Admin สามารถสร้าง, copy, แก้ไข และลบ role โดยใช้ matrix ของ page × action (view, do, use on PDA, create/edit, cancel/delete, approve, print, export) พร้อม scope ระดับ zone, work-point และข้อมูล

**ผลที่ตามมา:**
- Permission ที่ขึ้นต่อกันจะถูกติ๊กให้อัตโนมัติ เช่น picking ต้องมีสิทธิ์ดู order และดู inventory
- Role ที่ทั้งนับได้และอนุมัติ adjustment ได้จะถูก flag ว่ามีความเสี่ยงเรื่อง segregation-of-duties
- การเปลี่ยนแปลงมีผลเมื่อ user sign in ครั้งถัดไป และถูกบันทึก log
- Default role มาพร้อมกับ product และรวมถึง Warehouse Head และ Handover Lead เพราะ approval อ้างอิงถึง role เหล่านี้ `[ASSUMPTION]` ส่วน *System Administrator* ถูกล็อกไว้พร้อมสิทธิ์ทั้งหมด

#### FR-19: Special permission
Admin สามารถให้ special permission นอก matrix ได้ ได้แก่ ดูต้นทุนสินค้า, ทำแทน owner, ดูหรือแชร์วิดีโอ, อนุมัติการยกเลิกจาก OMS หลังเริ่มงานแล้ว, day close, ad-hoc move, supervisor override เมื่อสแกนไม่ผ่าน, มอบ role ชั่วคราว (ไม่เกินสิทธิ์ของผู้มอบเอง) และดู PII ของผู้ซื้อ

**ผลที่ตามมา:**
- หากไม่มี *view buyer PII* เบอร์โทรและที่อยู่ของผู้รับจะถูก mask ในทุกหน้าจอและทุก export

#### FR-20: Web sign-in
User office สามารถ sign in บน web ด้วย email และ password บวก OTP แบบ optional เมื่อบริษัทเปิด MFA และเลือกคลังได้

**ผลที่ตามมา:**
- ใส่ผิด 3 ครั้งจะล็อกบัญชีประมาณ 15 นาที
- ลิงก์ reset ใช้ได้ 30 นาที response ของการ reset จะเหมือนกันไม่ว่า email นั้นมีอยู่หรือไม่
- Session ที่ idle จะ timeout การเปลี่ยน password จะ sign out session อื่น ๆ
- พนักงาน support ของ Zimple ต้องใช้ MFA เสมอ

#### FR-21: PDA sign-in
พนักงานหน้างานสามารถ sign in บน PDA โดยสแกน QR ของ badge พร้อม PIN 4 หลักแบบ optional

**ผลที่ตามมา:**
- หนึ่ง user มี PDA session ที่ active ได้หนึ่ง session
- Badge ที่ไม่รู้จักจะแสดงหน้าจอสีแดง, ส่งเสียง beep และส่ง notification
- Role ที่ไม่มี PDA page จะ sign in ไม่ได้
- PDA ที่ idle จะล็อก และปลดล็อกเมื่อ user สแกน badge ของตัวเองอีกครั้ง
- หน้า home ของ PDA แสดงเฉพาะ task tile ที่มีสิทธิ์ พร้อม live counter

#### FR-22: บัตรแรงงานรายวัน (Day-labour cards)
Supervisor สามารถออกบัตรแรงงานรายวันที่ใช้ซ้ำได้ พร้อมชื่อ, เบอร์โทร, agency, shift, function ที่อนุญาต และ PIN แบบ optional

**ผลที่ตามมา:**
- บัตรจะถูกคืนอัตโนมัติเมื่อจบ shift สถานะบัตร: in use, not returned, free, lost
- เบอร์โทรถูกเก็บไว้ 90 วัน และดูได้เฉพาะผู้ที่มี special permission

#### FR-23: Support access
Customer admin สามารถให้สิทธิ์ support ของ Zimple เข้าถึงแบบจำกัดเวลาและจำกัด scope ได้

**ผลที่ตามมา:**
- การเปลี่ยนแปลงสำคัญต้องได้รับการอนุมัติจาก customer admin ได้แก่ stock, role, numbering, connection หรือ API key, การ disable SKU
- มี banner แสดงระหว่างที่ access ยัง active และทุก action ของ support ถูกบันทึก log

### 4.4 สินค้าและวัสดุบรรจุภัณฑ์ (Products & Packaging Materials)

**คำอธิบาย:** Master data ของ SKU มาจาก OMS คลังเป็นเจ้าของเฉพาะสิ่งที่คลังวัดและควบคุมเอง ได้แก่ ขนาดและน้ำหนัก, รูปถ่ายและ tag ของคลัง, หน่วยและ barcode ที่คลังรับ, และการ tracking lot, วันหมดอายุ และ serial บรรจุภัณฑ์และวัสดุเป็น stock item จริง มีการรับเข้า, นับ และตัดเมื่อใช้ รองรับ UJ-1, UJ-3

#### FR-24: Attribute ที่คลังวัดเอง (Warehouse-measured attributes)
พนักงานคลังสามารถบันทึกขนาดและน้ำหนักที่วัดได้, รูปถ่ายของคลัง และ tag ภายในลงใน SKU ได้

**ผลที่ตามมา:**
- SKU แสดงค่าที่ owner กรอก, ค่าที่คลังวัด และค่าที่ใช้งานจริง ค่าที่คลังวัดจะชนะตั้งแต่วันที่วัด
- ทุกการเปลี่ยนแปลงถูกบันทึก log
- SKU list แสดงจำนวนปัญหาของข้อมูล ได้แก่ ไม่มีขนาด, ไม่มี barcode หรือมีหน่วยที่คลังไม่รับ

#### FR-25: หน่วยและ barcode (Units and barcodes)
ระบบสามารถ resolve หน่วยนับ (unit of measure) และ barcode ของแต่ละ SKU ได้

**ผลที่ตามมา:**
- การสแกน barcode ของหน่วยใดจะนับจำนวนของหน่วยนั้นเป็น base unit
- จำนวนของหน่วยเปลี่ยนไม่ได้หลังใช้งานครั้งแรก ต้องเพิ่มหน่วยใหม่แทน
- Barcode ต้อง unique ภายใน owner เดียวกัน barcode เพิ่มเติมอนุญาตเฉพาะเมื่อเปิด multi-barcode rule
- หน่วยสามารถระบุเป็น *sell by carton only* (ห้ามแกะ) ได้
- SKU ที่ไม่มี barcode จะได้ system QR ที่พิมพ์ได้ ซึ่งสร้างจากรหัส SKU

#### FR-26: การ tracking lot, วันหมดอายุ และ serial
User ที่มีสิทธิ์สามารถตั้งค่า tracking ราย SKU ได้ ได้แก่ lot control, เกณฑ์วันหมดอายุ (วันผลิต + shelf life), shelf life คงเหลือขั้นต่ำ และ serial control (none, scan at pack, scan from receiving)

**ผลที่ตามมา:**
- *Scan from receiving* บังคับให้สแกน serial ตอน move และ count ด้วย ทำให้รู้ location ของทุก serial
- SKU ที่ OMS flag ว่ารับประกันตาม serial ต้องเป็น serial-controlled
- User สามารถ trace serial ไปยัง location หรือ order ปัจจุบัน และดูประวัติการเคลื่อนไหวได้

#### FR-27: Kit
ระบบสามารถแสดง kit BOM จาก OMS พร้อมจำนวนที่ประกอบได้ (buildable quantity) และดำเนินการ order ประกอบ (assemble) หรือแยก (unbundle) จาก OMS ได้

**ผลที่ตามมา:**
- แต่ละรอบจะ post movement แบบ SKU-conversion หนึ่งรายการ (−component / +kit หรือกลับกัน)
- การประกอบที่คลังเป็นผู้เริ่มต้องได้รับการอนุมัติ

#### FR-28: บรรจุภัณฑ์และวัสดุ (Packaging and material items)
User ที่มีสิทธิ์สามารถลงทะเบียนบรรจุภัณฑ์และวัสดุ พร้อมขนาดที่ใช้งานได้, น้ำหนัก, น้ำหนักบรรจุสูงสุด, หน่วยตัด, bundle ที่จัดเก็บ และวัสดุที่ใช้คู่กัน แต่ละคลังตั้ง reorder point เอง

**ผลที่ตามมา:**
- บรรจุภัณฑ์ถูกรับเข้า, putaway, นับ และลง ledger เหมือนสินค้า
- กล่องของ owner จะไม่ถูกแนะนำตอน packing จนกว่าจะตั้งขนาดที่ใช้งานได้, ขนาดตอนจัดเก็บ และวัสดุที่ใช้คู่กันครบ
- วัสดุสิ้นเปลืองที่ใช้ภายในคลัง (ฟิล์ม, ถุงมือ) จะถูกตัดเมื่อเบิก (FR-45)

### 4.5 Inbound

**คำอธิบาย:** ASN มาจาก OMS การมาถึงของรถแต่ละคันจะเปิด temporary receipt ไม่ว่าจะมี ASN หรือไม่ ผู้รับสินค้านับตามรูปแบบ carton ที่ camera station หรือบน PDA พร้อมเก็บ lot, วันหมดอายุ และ serial ข้อยกเว้นไม่ทำให้งานหยุด สินค้าเกิน, นอก list และสินค้าที่น่าสงสัยจะเข้า quarantine และส่ง decision case ไปยัง OMS Stock จะ sellable ได้ก็ต่อเมื่อ putaway ถูก confirm ด้วยการสแกน location เท่านั้น รองรับ UJ-1

#### FR-29: คิวสินค้าที่คาดว่าจะเข้า (Expected-arrival queue)
Receiver หรือ Supervisor สามารถดู ASN ในคิวที่เรียงจาก overdue ก่อน แล้วตามวันที่และ slot ที่นัดไว้

**ผลที่ตามมา:**
- รายการใน item list ของ owner เป็นแบบ read-only
- ยังแนบ item list ได้จนถึงตอนที่รับสินค้า

#### FR-30: ASN ที่คลังสร้างเอง (Warehouse-created ASN)
User office สามารถสร้าง ASN แทน owner หรือสำหรับสินค้าของคลังเอง เมื่อ OMS ไม่ได้ส่งมา

**ผลที่ตามมา:**
- ASN ถูกระบุเป็น *warehouse-created* ใน audit log
- Time slot ที่เต็มแล้วยังเลือกได้แต่จะเกิด alert

#### FR-31: Temporary receipt
Receiver สามารถเปิด temporary receipt สำหรับการมาถึงของรถแต่ละคัน

**ผลที่ตามมา:**
- บันทึกจำนวนหีบห่อชั้นนอกที่แจ้ง vs ที่นับได้, รูปถ่าย, น้ำหนัก (ถ้ามีเครื่องชั่ง), ข้อมูลรถ และลายเซ็นของผู้ส่งบนหน้าจอ
- การมาถึงที่ไม่มี ASN หรือมาก่อนวันที่ใน ASN ต้องระบุเหตุผล และถูก tag เป็น *unannounced*
- จำนวนหีบห่อชั้นนอกที่ขาดจะถูกบันทึก และแจ้ง owner ผ่าน OMS
- Temporary receipt ใหม่บน ASN เดิมจะเปิดไม่ได้จนกว่ารอบก่อนหน้าจะถูก confirm
- Temporary receipt ที่เปิดค้างไว้เกิน 2 ชั่วโมงจะเกิด alert

#### FR-32: พัสดุที่จับคู่ไม่ได้ (Unmatched parcels)
Receiver สามารถบันทึกพัสดุที่ tracking number ไม่ตรงกับ ASN ใด และพักไว้ที่ parcel staging จนกว่าจะจับคู่ได้

**ผลที่ตามมา:**
- พัสดุที่พักไว้ยังไม่ถือเป็น stock จนกว่าจะจับคู่และรับเข้า

#### FR-33: การนับและการเก็บข้อมูล (Counting and capture)
Receiver สามารถเปิดการรับสินค้าโดยสแกน ASN หรือ item list และนับแต่ละ SKU ตามรูปแบบ carton (carton × ชิ้น + เศษ + เสียหาย)

**ผลที่ตามมา:**
- การสแกนสินค้าหนึ่งชิ้นเป็นการเลือก SKU แต่ไม่เพิ่มยอดนับ
- วิธีนับเป็นไปตาม rule: นับทุก carton หรือสุ่ม N carton ต่อ SKU-lot และนับทั้งหมดเมื่อพบว่าไม่ตรง
- SKU ที่เป็น lot-controlled ต้องระบุ lot และวันหมดอายุก่อน putaway วันหมดอายุคำนวณจากวันผลิต + shelf life
- SKU ที่เป็น serial-controlled ต้องสแกนทุก serial serial ที่ซ้ำจะถูกปฏิเสธ
- Carton ที่ขนาด ÷ จำนวนชิ้นไม่ตรงกับขนาดของหน่วยจะถูก flag ให้วัดใหม่
- Carton แรกของ SKU ใหม่จะถูกวัดก่อน putaway ค่าจากเครื่องชั่งกรอกให้อัตโนมัติ และค่าที่พิมพ์เองจะถูก log ว่าเป็น manual

#### FR-34: Label และ container
Receiver สามารถพิมพ์ QR label ของ carton และวาง carton ลงบน container ได้

**ผลที่ตามมา:**
- การปิด container จะสร้าง putaway task ทันที
- การพิมพ์ซ้ำจะคงเลข carton เดิมและต้องระบุเหตุผล
- Pallet ที่เปิดอยู่ทั้งหมดต้องปิดก่อนจึงจะปิด receipt ได้

#### FR-35: หลักฐานการรับสินค้า (Receiving evidence)
ระบบสามารถบันทึกหลักฐานของทุก receipt

**ผลที่ตามมา:**
- Desktop station ที่มีกล้องจะบันทึกวิดีโอ ส่วนการรับบน PDA จะแนบรูปถ่าย
- ทุกรายการที่ขาด, เกิน, เสียหาย หรือผิด SKU ต้องมีรูปถ่าย
- คลังที่ไม่มี PDA ทำ flow ทั้งหมดบน web ได้

#### FR-36: ข้อยกเว้นในการรับสินค้า (Receiving exceptions)
ระบบสามารถ route ข้อยกเว้นได้โดยไม่ทำให้งานรับสินค้าหยุด

**ผลที่ตามมา:**
- **Over-receipt** เกิน tolerance (default 0%): ส่วนเกินถูกรับเข้า quarantine รอการ confirm และไม่ sellable
- **SKU ของ owner อื่น:** หน้าจอสีแดงและปฏิเสธ
- **SKU นอก list ของ owner เดียวกัน:** พักไว้รอการตัดสินใจ
- **Barcode ที่ไม่รู้จัก:** ปฏิเสธ หรือผูกเป็น barcode เพิ่มเติมหลังได้รับอนุมัติเมื่อเปิด multi-barcode rule
- **Shelf life คงเหลือต่ำกว่าขั้นต่ำ:** รับได้เฉพาะเมื่อ supervisor confirm
- **สินค้าเสียหาย:** post เข้า damaged section พร้อมสาเหตุและรูปถ่าย

#### FR-37: การแนะนำ putaway (Suggested putaway)
ระบบสามารถแนะนำ putaway location สำหรับแต่ละ container หรือ carton โดยใช้ประเภทห้อง, location ที่ SKU นั้นอยู่แล้ว และ capacity ว่าง

**ผลที่ตามมา:**
- คิว putaway เรียงงานด่วนก่อน (order ที่รอ stock อยู่) จากนั้นสินค้าควบคุมอุณหภูมิ แล้วจึงของที่เก่าที่สุด

#### FR-38: Putaway confirm
พนักงาน putaway สามารถ confirm putaway โดยสแกน location บน PDA

**ผลที่ตามมา:**
- Location ที่ไม่ใช่ตัวที่แนะนำต้องระบุเหตุผล
- ประเภทห้องผิด, น้ำหนักเกิน, location ที่ disabled หรือ location ที่ locked for counting จะถูกบล็อก
- เมื่อ confirm แล้ว stock จะ sellable ทันที order ที่รออยู่จะถูก reserve ตามลำดับเดิม และ order ที่ถูก hold เพราะ out of stock จะถูกปล่อย
- Stock ที่รอ putaway เกิน 2 ชั่วโมงจะเกิด alert

#### FR-39: การปิด receipt (Receipt close)
Supervisor สามารถปิด receipt หลังตรวจสอบยอดจริง vs ASN

**ผลที่ตามมา:**
- รับสินค้าหลายรอบได้
- เมื่อเสร็จสิ้นจะสร้างสรุปยอดขาด/เกิน/เสียหาย
- Receipt ที่ไม่มีการตอบสนองจะปิดอัตโนมัติหลัง 3 วัน
- การปิด ASN ก่อนกำหนดต้องได้รับการอนุมัติ
- ผลลัพธ์ถูกส่งไปยัง OMS (FR-4)
- Receipt ที่ปิดแล้วค้นหาและ export ได้ทั้งแบบสรุปหรือรายละเอียด SKU × lot

### 4.6 การควบคุมสินค้าคงคลัง (Inventory Control)

**คำอธิบาย:** Stock ถูกเก็บแยกตาม owner × SKU × lot × location และแบ่งเป็น section normal, returns และ damaged ทุกการเปลี่ยนแปลงเป็น ledger line ที่แก้ไขไม่ได้ (immutable) และไม่มีฟังก์ชันปรับ stock ด้วยมือที่ไหนเลย จำนวนเปลี่ยนได้ผ่านการสแกนในงานปฏิบัติการ, count adjustment ที่อนุมัติแล้ว, การ move หรือ reversal ที่อนุมัติแล้วเท่านั้น การนับเป็นแบบ blind โดย default และการ pick ขาด (short pick) จะ trigger การนับด่วน นี่คือวิธีที่ระบบทำให้ "WMS = ชั้นวาง" น่าเชื่อถือ รองรับ UJ-2, UJ-6

#### FR-40: มุมมอง stock (Stock views)
User สามารถดู stock ตาม SKU (drill-down ลง lot และ location พร้อมแถว in-process), ตาม location (พร้อม capacity ที่ใช้, การสแกนล่าสุด และสถานะ lock) และตาม lot/วันหมดอายุ (พร้อมจำนวนวันคงเหลือและ trace ไปยัง receipt)

**ผลที่ตามมา:**
- Filter มี normal, awaiting putaway, returns, damaged, below reorder point, near expiry และ out of stock
- Export เป็นไปตาม filter ที่ใช้งานอยู่
- มุมมอง lot/expiry จะแสดงเฉพาะเมื่อมี SKU แบบ lot-controlled อย่างน้อยหนึ่งตัว

#### FR-41: Stock bucket
ระบบสามารถคำนวณ on-hand, ATP และ available-to-sell ราย SKU, lot และ location

**ผลที่ตามมา:**
- On-hand = normal + returns + damaged/quarantine ไม่รวม stock ที่รับเข้าแล้วแต่ยังไม่ putaway
- ATP = normal − reserved − lot ที่ถูก hold − lot ที่ต่ำกว่า shelf life คงเหลือขั้นต่ำที่มีผลบังคับ Available-to-sell = ATP
- Reserved รวมทุก order ที่ยังไม่ handover ไม่ว่าสินค้าจะอยู่ที่ใด (pick location, cart, staging, packing, handover)
- การ reserve ดึงจาก stock normal เท่านั้น
- Stock ยังเป็น on-hand อยู่จนกว่าจะ handover confirm

#### FR-42: Stock ledger ที่แก้ไขไม่ได้ (Immutable stock ledger)
ระบบสามารถบันทึกทุกการเปลี่ยนแปลงจำนวนหรือ location เป็น ledger line ที่แก้ไขไม่ได้

**ผลที่ตามมา:**
- แต่ละ line บันทึก timestamp, type, document reference, location ต้นทาง → ปลายทาง, lot, ± จำนวน, running balance, actor และ device
- การ move ภายในเขียนสอง line และยอดรวมไม่เปลี่ยน line จะถูกเขียนหลังสแกนปลายทางแล้วเท่านั้น
- Line แก้ไขหรือลบไม่ได้

#### FR-43: Ledger reversal
User ที่มีสิทธิ์สามารถขอ reversal ของ ledger line ประเภท receive, handover หรือ return-receipt

**ผลที่ตามมา:**
- Reversal สร้าง line ตรงข้ามที่อ้างอิงถึง line ต้นฉบับ โดยจำนวน ≤ ต้นฉบับ
- ต้องระบุเหตุผลและต้องได้รับการอนุมัติเสมอ
- การ move ที่ผิดแก้ด้วยการ move ใหม่ ไม่ใช่ด้วย reversal

#### FR-44: การ move (Moves)
พนักงาน stock สามารถ move stock บน PDA หรือ web ด้วยลำดับการสแกน 3 ครั้ง: ต้นทาง → สินค้าและจำนวน → ปลายทาง

**ผลที่ตามมา:**
- การสแกน QR ของ pallet จะ move ทั้ง pallet
- ตรวจสอบพื้นที่, น้ำหนัก, ประเภทห้อง, การผสม lot และ *no mixed SKUs*
- User ที่มี permission *ad-hoc move* สามารถ move stock โดยไม่ต้องมี task แต่ต้องระบุเหตุผล
- คลังที่ไม่มี PDA สามารถพิมพ์ใบ move และ confirm การ move บน web ได้

#### FR-45: การเบิกวัสดุ (Material issue)
User ที่มี permission *issue for use* สามารถเบิกวัสดุหรืออุปกรณ์ที่คลังเป็นเจ้าของได้

**ผลที่ตามมา:**
- จำนวนถูกตัดทันที
- การเบิกเกิน 10 หน่วยในครั้งเดียวต้องได้รับการอนุมัติ threshold นี้ตั้งค่าได้

#### FR-46: Replenishment
ระบบสามารถสร้าง replenishment task จาก min/max ของ pick location ราย SKU ตาม schedule ทุก N นาที (default 60)

**ผลที่ตามมา:**
- Lot สำรองถูกเลือกแบบ FEFO
- Replenishment ด่วน (order ที่รออยู่เกินจำนวนบนชั้น หรือเกิด short pick) จะขึ้นไปอยู่บนสุดของคิว PDA พร้อมเสียง และพิมพ์ที่ printer ของ zone เมื่อเสร็จแล้ว picker จะได้รับแจ้ง
- Move task ที่ค้างจะเกิด alert หลัง 30 นาที

#### FR-47: รอบการนับ (Count rounds)
Supervisor สามารถสร้างรอบการนับที่ครอบคลุมทั้งคลัง, zone หรือแถว, SKU list หรือ velocity class

**ผลที่ตามมา:**
- Option: ผู้นับ, batch size, blind (default) หรือ visible, รวม location ว่าง, freeze inbound/outbound
- รอบนับทั้งคลังต้องสร้างล่วงหน้าอย่างน้อย 3 วัน
- Location ที่มี pick ค้างอยู่จะถูกนับหลัง picking

#### FR-48: การนับบน PDA (PDA counting)
ผู้นับสามารถนับบน PDA โดยสแกน location, สินค้า และ serial

**ผลที่ตามมา:**
- การนับเป็นแบบ blind โดย default และไม่มีปุ่ม "confirm system quantity" เด็ดขาด
- การนับล็อกเฉพาะ location ที่กำลังนับเท่านั้น
- ผลที่สแกนขณะ offline จะถูกเข้าคิวไว้และส่งเมื่อสัญญาณกลับมา

#### FR-49: การสรุปผลการนับ (Count resolution)
ระบบสามารถสรุปผลการนับก่อนจะมีการ adjustment ใด ๆ

**ผลที่ตามมา:**
- ถ้าตรงกัน line จะปิดอัตโนมัติ
- ถ้าไม่ตรง ผู้นับคนเดิมจะนับซ้ำหนึ่งครั้ง แล้วส่งไป approval เป็น variance
- คู่ที่วางผิดที่ (misplacement pair) แก้ด้วยการ move และไม่นับเป็นของหาย
- ระดับการอนุมัติเป็นไปตาม approvals engine (FR-105) ผู้นับไม่สามารถอนุมัติ variance ของตัวเองได้เด็ดขาด
- Variance ที่อนุมัติแล้วจะ post ledger adjustment โดยระบุทั้งผู้นับและผู้อนุมัติ

#### FR-50: การนับด่วน (Urgent count)
ระบบสามารถสร้างการนับแบบ blind ด่วนสำหรับ location เดียว เมื่อ picker แจ้งว่าของขาดโดยไม่มีทางเลือกอื่น หรือตอบว่า "not empty" หลัง pick ชิ้นสุดท้าย

**ผลที่ตามมา:**
- การนับจะขึ้นไปอยู่บนสุดของคิว PDA ฝั่ง stock และ assign อัตโนมัติพร้อม deadline
- ถ้าเจอ stock location จะถูกแก้ไข ถ้าไม่เจอ variance จะส่งไป approval และ order แสดง *insufficient stock*

#### FR-51: ความแม่นยำของสินค้าคงคลัง (Inventory accuracy)
ระบบสามารถคำนวณ inventory accuracy (location ที่ตรงกัน ÷ location ที่นับแบบ blind ในช่วง 30 วัน) และมูลค่า variance ตามต้นทุน

#### FR-52: FEFO allocation
ระบบสามารถ allocate แบบ FEFO: lot ที่หมดอายุเร็วที่สุดก่อน จากนั้น pick location ก่อน reserve

**ผลที่ตามมา:**
- Lot ที่ต่ำกว่า shelf life คงเหลือขั้นต่ำที่มีผลบังคับจะไม่ถูก allocate เว้นแต่ order ระบุ lot นั้น
- Stock ที่หมดอายุจะย้ายไป damaged section และไม่รวมใน ATP

#### FR-53: Stock เสียหายและที่ถูก hold (Damaged and held stock)
พนักงานสามารถย้ายสินค้าเข้า damaged/quarantine โดยสแกน QR *damaged* จากนั้นสแกนสินค้า แล้วสแกน tote หรือ location สำหรับของเสียหาย

**ผลที่ตามมา:**
- บันทึกสาเหตุ, ต้นทาง (receiving, storage, returns, cancel-return) และรูปถ่าย
- Location ของเสียหายจะไม่ถูก pick เด็ดขาดและไม่รวมใน ATP

#### FR-54: การจัดการสินค้า (Disposition)
ระบบสามารถส่ง decision case ของสินค้าเสียหายหรือที่ถูก hold แต่ละรายการไปยังฝ่าย after-sales ของ OMS และพนักงานสามารถดำเนินการตามคำตัดสินที่ส่งกลับมา ได้แก่ ทำลาย (พร้อมรูปถ่ายเป็นหลักฐาน), คืน owner หรือ supplier, นำกลับมาใช้ใหม่ หรือเพิ่มส่วนเกินเข้า stock

**ผลที่ตามมา:**
- หน้า WMS สำหรับ stock เสียหายและที่ถูก hold เป็นแบบ read-only สำหรับตัวคำตัดสิน พนักงานทำได้เพียงดำเนินการตามเท่านั้น
- การดำเนินการทำลายยังต้องได้รับการอนุมัติจากคลัง
- สินค้าที่เกิน 30 วันโดยไม่มีคำตัดสินจะเกิด alert ซ้ำทุก 7 วัน ไม่มีการทำลายอัตโนมัติ

#### FR-55: Inventory dashboard
Warehouse Manager สามารถดู inventory dashboard ได้แก่ accuracy เทียบเป้า, ความต้องการ replenishment, variance ที่รอการอนุมัติ, lot ใกล้หมดอายุ, การใช้พื้นที่ และ backlog ที่ overdue

#### FR-115: Lot hold และ recall
Supervisor สามารถ hold หรือ recall lot (ทุก location หรือเฉพาะที่เลือก) พร้อมเหตุผล และ release พร้อมการอนุมัติ

**ผลที่ตามมา:**
- Lot ที่ถูก hold จะถูกตัดออกจาก ATP และ allocation ทันที pick list ที่ allocate lot นั้นไปแล้วจะถูก flag ให้ re-allocate
- Lot ที่ release แล้วจะกลับเข้า ATP หลังได้รับการอนุมัติเท่านั้น (FR-105)
- มุมมอง lot/expiry แสดง lot ที่ถูก hold และเหตุผล

#### FR-120: การแตก kit (Kit explosion)
ระบบสามารถแตกรายการ order ที่เป็น kit ออกเป็น SKU component ตอน reservation และ allocation โดยใช้ BOM version ของ OMS ที่เป็นปัจจุบัน ณ ตอนรับ order

**ผลที่ตามมา:**
- Reservation และ allocation ทำงานบน component stock ถูกตัดที่ component ตอน handover
- Available-to-sell ของ kit ที่ push ไปยัง OMS = ค่าต่ำสุดของ (ATP ของ component ÷ จำนวนต่อ kit) จากทุก component
- ตอน packing จะแสดง component และ pack รวมกัน (FR-76)

### 4.7 Orders และ Cut-off

**คำอธิบาย:** คลังสินค้าเห็น order record เดียวไม่ว่าจะมาจาก channel ไหน และแทรกแซงได้ด้วยการ hold order เท่านั้น Cut-off board แสดงความเสี่ยงของวันนี้แยกตาม carrier wave เพื่อให้ wave ที่จะพลาดถูกคาดการณ์ล่วงหน้าแทนที่จะมารู้ทีหลัง ตอบโจทย์ UJ-2, UJ-4

#### FR-56: Order lifecycle
System สามารถ track แต่ละ order ตลอดเส้นทาง received → carrier data ready → picking → packing → awaiting handover → handed over → delivered

**ผลที่ตามมา:**
- Order list มี bucket แยกตามแต่ละ stage รวมถึง *exception* และ *cancelled* (แยกตาม stage)
- CS ค้นหาได้ด้วยเลข order, เลข channel, external reference, tracking number หรือผู้รับ
- ราคาใน order มองเห็นได้เฉพาะผู้ที่มี permission เท่านั้น ส่วน COD และมูลค่ารวมทุกคนมองเห็นได้

#### FR-57: รายละเอียด Order
CS สามารถเปิด order และดู line ต่างๆ (SKU, lot และวันหมดอายุ, pick location, จำนวน), pick list ของ order นั้น, packing record (packer, station, กล่อง, น้ำหนัก, materials, ลิงก์วิดีโอ) และ timeline พร้อม timestamp ของทุก stage event

#### FR-58: Hold
Supervisor หรือ CS สามารถ hold order หนึ่งหรือหลาย order พร้อมระบุเหตุผล และ release ได้

**ผลที่ตามมา:**
- Order ที่ถูก hold ไม่สามารถเข้า pick list ได้
- Order ที่ถูก hold ขณะกำลังดำเนินการอยู่ จะหยุดที่การ scan ครั้งถัดไป
- ไม่มี control สำหรับแก้ไขหรือยกเลิก order

#### FR-59: Owner change requests
Supervisor สามารถ approve หรือ reject owner change request ได้เมื่อ picking เริ่มแล้ว

**ผลที่ตามมา:**
- ระหว่าง pick, pack หรือ handover, PDA จะแสดง *stop* และสั่งให้นำสินค้าไปไว้ที่ hold location กล่องจะปิดไม่ได้ และ loading scan จะแสดง *do not ship*
- ผลลัพธ์ (returned, rejected พร้อมเหตุผล, withdrawn, too late for the wave) จะถูกส่งไปยัง OMS

#### FR-60: Cut-off board
Supervisor สามารถดู order ของวันนี้แยกตาม stage, channel และ carrier wave พร้อม risk status ต่อ wave (on time, at risk, late by N minutes)

**ผลที่ตามมา:**
- Slack = pack cut-off − (งานที่เหลือ ÷ ความเร็วจริงของทีมในวันนี้)
- Slack ติดลบ จะแนะนำให้เพิ่มคน หรือเลื่อน N order ไป wave ถัดไป
- Alert จะแจ้งเตือนที่ 60 และ 15 นาทีก่อน pack cut-off

**Out of Scope:** การแสดงผลบน wall-TV (Later)

#### FR-116: Ship-by due date
System สามารถคำนวณ ship-by due date ของแต่ละ order จาก SLA rule ของ channel (Shopee, Lazada, TikTok Shop, off-platform), ปฏิทินคลังสินค้า และการขยายเวลาช่วง campaign

**ผลที่ตามมา:**
- Due date เป็นตัวกำหนดการ assign carrier wave (FR-60), ลำดับคิว (FR-66) และการจัดการ missed wave (FR-73)
- Due date ที่ต่างจากวันที่ของ platform ที่ได้รับผ่าน OMS จะ raise alert
- Admin สามารถ configure SLA rule ต่อ channel พร้อม effective date ได้

#### FR-117: Order แบบ instant และ express rider
System สามารถดำเนินการ order แบบ instant และ express ภายใต้ pack-within limit และแจ้ง OMS เมื่อต้องเรียกหรือเรียก rider ซ้ำ

**ผลที่ตามมา:**
- Pack-within limit: instant ภายใน 30 นาที, same-day 60 นาทีก่อนรถออก (configurable)
- เมื่อ pack กล่องเสร็จ WMS จะส่ง *pack complete — call rider* ไปยัง OMS
- Rider no-show เป็น handover state หนึ่ง *Re-call rider* จะส่ง request ไปยัง OMS ก่อนที่ platform จะ auto-cancel
- Rider no-show จะแสดงบน handover overview และ day-close checklist

### 4.8 Picking

**คำอธิบาย:** Planner จัดกลุ่ม order ที่เข้าเงื่อนไขเป็น pick list ผ่าน draft wave ซึ่งอาจเป็นแบบที่ระบบแนะนำหรือสร้างเอง Pick rule เป็นตัวตัดสิน method, การ split และการ allocation Picker ทำงานบน PDA ตาม snake route และ scan ไปตลอดทาง Short pick จะไม่ adjust stock อัตโนมัติ แต่จะเดินตาม resolution flow ที่กำหนดไว้ตายตัว ตอบโจทย์ UJ-2

#### FR-61: Pick rules
Supervisor สามารถกำหนด pick rule แบบมี version (conditions, scope, method, split limits) ซึ่งต้องได้รับ approve ก่อนจึงจะมีผล

**ผลที่ตามมา:**
- Rule แรกที่ match จะชนะ: mandatory global → owner-specific → general global → warehouse default
- การแก้ไข rule จะสร้าง version ใหม่ List ที่มีอยู่แล้วยังคงใช้ version ที่ใช้ตอนสร้าง
- Split limit ปรับตั้งค่าได้ เช่น 300 order หรือ 2,000 ชิ้นต่อ list

#### FR-62: Draft wave
Planner สามารถสร้าง pick list แบบ recommended หรือ manual ผ่าน draft wave จากนั้น split, merge, ย้าย หรือลบ list ได้ก่อน confirm

**ผลที่ตามมา:**
- Order ใน draft จะถูก reserve ไว้ให้ planner คนนั้นตาม countdown (เช่น 10 นาที)
- Order ที่รอ carrier data, ถูก hold หรืออยู่ระหว่าง change request จะถูกตัดออก
- List จะถูก split ตาม method ก่อน แล้วตาม carrier wave แล้วตาม N order เรียงตาม paid time แล้วตาม container capacity

#### FR-63: Pick methods
System สามารถ assign pick method ได้หนึ่งในหก method:
- by order;
- order สินค้าชิ้นเดียว;
- single SKU แบบ bulk;
- ชุด order ที่เหมือนกัน (identical-order sets);
- multi-order พร้อม sorting;
- consolidated multi-order

**ผลที่ตามมา:**
- Pick list มีเลขรูปแบบ `PK-YYMMDD-NNNN` การ re-pick จะสร้าง child `PK-…-1`
- Default pack method จะถูกเก็บไว้บน list

#### FR-64: Lot and location allocation
System สามารถ allocate lot และ location ตอนสร้าง list: FEFO → pick location ก่อน storage → จำนวน stop น้อยที่สุด → slot ที่หยิบแล้วหมดพอดี

**ผลที่ตามมา:**
- Pick location ขาดแต่ยังมี stock ใน storage จะสร้าง urgent replenishment และย้าย line ไปไว้ท้าย list โดยไม่ block order
- มีเพียง stock-out ทั้งคลังเท่านั้นที่จะ block order

#### FR-65: Automatic pick lists
System สามารถ generate pick list อัตโนมัติต่อ owner × service level เมื่อ threshold หรือ time trigger ทำงาน Mockup แสดงส่วนนี้เป็น add-on module แต่อยู่ใน Phase 1 ตาม brief `[ASSUMPTION]`

**ผลที่ตามมา:**
- Trigger ได้แก่ tote เต็ม, slot ของ cart เต็ม, เวลาตามนาฬิกา หรือ N นาทีก่อน carrier wave
- มี cap จำนวน system list ที่เปิดอยู่
- Mode มีสองแบบคือ สร้างอัตโนมัติ หรือรอคลังสินค้า confirm

#### FR-66: Pick queue
System สามารถเรียงลำดับ pick queue: supervisor priority (พร้อมเหตุผล) → carrier wave ที่ใกล้ที่สุด → เก่าที่สุด

**ผลที่ตามมา:**
- Order แบบ *Ship immediately* จะได้ single-order list ของตัวเอง ถูก print อัตโนมัติ และขึ้นไปอยู่บนสุดของคิว
- List ที่ยังไม่ assign จะแสดงให้ picker ทุกคนที่มีสิทธิ์เห็น การ claim list จะ lock list นั้นไว้ให้ picker คนนั้น
- Print status (unprinted, printed, reprint #n ที่มีเครื่องหมาย "copy") จะถูก track ต่อ list

#### FR-67: PDA picking
Picker สามารถดำเนินการ pick list บน PDA ตาม snake route โดย scan cart หรือ tote, location และสินค้า

**ผลที่ตามมา:**
- การ scan cart หรือ tote ตอนเริ่มต้นเป็นสิ่งที่ต้องทำเสมอ
- การ scan location เป็นข้อบังคับสำหรับสินค้าที่ควบคุมด้วย lot
- การ scan ทุกชิ้นปิดได้เฉพาะ list แบบ single-SKU bulk และ identical-set เท่านั้น และเปิดเสมอสำหรับ sort-while-pick, serial และสินค้ามูลค่าสูง
- การกรอกจำนวนมากกว่าที่ต้องการจะถูก block การกรอกน้อยกว่าจะถามว่า "short or later?"
- เฉพาะ Supervisor เท่านั้นที่เปลี่ยน verification settings ได้ และการเปลี่ยนแปลงจะถูก audit
- Scan ที่ทำขณะ offline จะเข้าคิวไว้และ sync ภายหลัง

#### FR-68: Unit และ carton ใน picking
Picker สามารถ pick ตาม unit of measure ได้

**ผลที่ตามมา:**
- ใช้ carton ที่ยังปิดผนึกก่อน ตามด้วยเศษที่เหลือจาก carton ที่เปิดแล้ว จากนั้นจึงเปิด carton ใหม่
- QR ของ carton ที่ยังปิดผนึกนับเป็น carton เต็ม QR ของ carton ที่ ship ไปแล้วจะถูก reject

#### FR-69: Empty-location confirm
System สามารถขอให้ picker confirm ว่า location ว่างแล้วหลังหยิบชิ้นสุดท้าย การตอบว่า "not empty" จะสร้าง urgent count (FR-50)

#### FR-70: Short-pick flow
Picker สามารถแจ้ง short ได้ และ System สามารถ resolve ผ่าน flow ที่กำหนดตายตัว:
1. บันทึกจำนวนจริง;
2. เสนอ location ทางเลือก;
3. สร้าง urgent replenishment;
4. สร้าง urgent count;
5. mark เป็น *insufficient stock* โดยส่วนต่าง (variance) จะไปรอ approval

**ผลที่ตามมา:**
- Stock จะไม่ถูก adjust อัตโนมัติเด็ดขาด
- การ re-pick จะสร้าง child list และ packing จะรอจนครบทุกส่วน

#### FR-71: Staging
Picker สามารถวางสินค้าที่ pick แล้วไว้ที่ staging spot โดยการ scan

**ผลที่ตามมา:**
- Custody ของ container และ carrier ยัง trace ได้
- Spot ผิดจะ raise warning
- Pick list ที่ *completed* หมายถึงส่งต่อให้ packing แล้ว ไม่ใช่ ship แล้ว

#### FR-72: Put-wall sorting
Sorter สามารถ sort สินค้าที่ batch-pick มาลงใน put-wall slot โดยการ scan สินค้าขณะที่ระบบแสดง slot ปลายทาง

**ผลที่ตามมา:**
- Slot ที่ครบแล้วสามารถ release ไปยัง packing ได้ทันที การ release ซ้ำจะไม่สร้าง pack job ซ้ำ

#### FR-73: Missed wave
System สามารถย้าย order ที่ยังเปิดอยู่ตอนที่รถของ wave ออกไปแล้ว ไปยัง wave ถัดไป โดย tag เป็น *missed wave* และนับใน KPI

#### FR-74: Picking overview
Supervisor สามารถดู order ที่เหลือแยกตาม cut-off, ETA เทียบกับ cut-off, blocker, สถานะ picker และจำนวนชิ้นต่อชั่วโมงต่อ picker

**ผลที่ตามมา:**
- Picker ไม่สามารถดูหรือปิด pack job ได้

### 4.9 Packing

**คำอธิบาย:** Pack job ใช้เลขเดียวกับ pick list และจะพร้อมเมื่อ picking และ sorting เสร็จ Packing ทำที่ station ที่ผูกกับ scanner, printer, เครื่องชั่ง และกล้อง ทุกชิ้นถูก scan และน้ำหนักถูกตรวจสอบ การยกเลิกจะถูกตรวจซ้ำทันทีก่อน print label วิดีโอจะบันทึกต่อเนื่องจนถึงการ print label Packaging และ paired materials จะถูกตัดเมื่อปิดกล่อง ตอบโจทย์ UJ-3

#### FR-75: Pack jobs และ methods
System สามารถสร้าง pack job หนึ่ง job ต่อ pick list และ Packer สามารถ pack ได้สี่ method:
- by order;
- by pick list (ระบบเลือก order ที่ match และยังไม่ได้ pack ให้);
- production line (กล่องแบบเดียว, scan label ต่อกล่อง พร้อม full scan แบบสุ่ม);
- multi-box

**ผลที่ตามมา:**
- สถานะ pack job: awaiting prep → preparing → ready to pack → packing → packed ส่วน side state ได้แก่ exception, cancelled และ paused
- Order จะปิดไม่ได้จนกว่าทุกส่วนจะมาถึง
- เฉพาะ Supervisor เท่านั้นที่เปลี่ยน pack method ได้ (พร้อมเหตุผล) Packer เปลี่ยนได้เฉพาะไปเป็น multi-box
- Production line จะ reconcile ว่า picked = output + waste + leftover

#### FR-76: Scan-verified packing
Packer สามารถ scan-verify ทุกชิ้น และ System จะ block SKU ผิดและการ scan เกินด้วยหน้าจอสีแดงและเสียงเตือน

**ผลที่ตามมา:**
- ขั้นตอนเหล่านี้ปิดไม่ได้: scan start, scan close, barcode ทุกชิ้นหรือทุก unit, ทุกชิ้นที่เป็น serial หรือมูลค่าสูง และการตรวจสอบการยกเลิกก่อน print
- Component ของ kit จะถูกแสดงและ pack ไปด้วยกัน

#### FR-77: Weight check
System สามารถตรวจน้ำหนักกล่องเทียบกับน้ำหนักที่คาดไว้ภายใน tolerance ±5% หรือ 20 g แล้วแต่ค่าใดมากกว่า

**ผลที่ตามมา:**
- น้ำหนักมาจากเครื่องชั่ง น้ำหนักที่พิมพ์กรอกเองจะถูก log เป็น manual
- กล่องที่อยู่นอก tolerance จะถูก hold ไว้ให้ supervisor ตรวจสอบ

#### FR-78: Labels และเอกสาร
System สามารถ print shipping label และเอกสารในกล่อง (ใบเสร็จหรือใบกำกับภาษี, บัตรรับประกัน, เอกสาร B2B, content list) เมื่อสินค้าทุกชิ้นได้รับการ verify แล้ว

**ผลที่ตามมา:**
- การยกเลิกจะถูกตรวจซ้ำทันทีก่อน print label
- Batch printing จะ print เฉพาะ label ที่ไม่เคย print มาก่อน
- การ reprint ต้องได้รับ supervisor approval และจะถูกนับ
- Platform label จะไม่ถูกแก้ไขเด็ดขาด

#### FR-79: Box suggestion และ materials
System สามารถแนะนำกล่อง (พร้อมลำดับสำรอง) และตัด packaging และ paired materials เมื่อปิดกล่อง

**ผลที่ตามมา:**
- Owner box mode: owner box ก่อน, warehouse box ตามขนาด หรือ owner box เท่านั้น
- Packer สามารถ scan กล่องอื่นได้โดยไม่ต้องระบุเหตุผล
- ต้องมี packaging scan หนึ่งครั้งพอดีต่อกล่อง (บังคับ)
- Material เพิ่มเติมเป็น scan แยกต่างหาก
- *Reuse original box* จะไม่ตัด stock
- Insert (ของแถม, ใบปลิว) เป็นไปตาม insert rule ของ owner และจะถูกตัดตอน handover

#### FR-80: Pack video
System สามารถบันทึกวิดีโอต่อ order ที่ station ที่มีกล้อง โดย link กับ order และ exception ของ order นั้น

**ผลที่ตามมา:**
- วิดีโอต้องบันทึกต่อเนื่องจนถึงการ print label และต้องเห็น label ของ order นั้น
- บน PDA ลำดับความสำคัญของกล้องคือ IP camera ที่ผูกไว้ ตามด้วยกล้องในตัว ถ้าไม่มีทั้งสองอย่าง จะแสดง warning *no video* หนึ่งครั้งแล้วทำงานต่อได้
- Retention ค่า default คือ 60 วัน คลิปที่ link กับ exception จะถูก lock จนกว่า exception นั้นจะปิด
- การลบทำได้ผ่านระบบเท่านั้น: soft delete 7 วัน และต้องมี admin คนที่สองสำหรับการลบแบบ bulk ทุกการดูหรือลบจะถูก log
- CS และ Supervisor สามารถเปิดวิดีโอได้จาก order, exception หรือ cancel-return job
- Storage ที่เกิน 90% จะ raise alert

#### FR-81: Station routing
System สามารถ route pack job ไปยัง station และ Supervisor สามารถ reassign ได้

**ผลที่ตามมา:**
- สอง station จะไม่มีทาง pack order เดียวกันได้
- งานเร่งด่วนจะไปที่ station แรกที่ว่าง และคิวจะเรียงตาม required pack-complete time
- Station ที่มีอุปกรณ์ fault จะไม่ได้รับงาน

#### FR-82: Packing exceptions
Packer สามารถ raise exception และ Supervisor สามารถ resolve จากคิวได้

**ผลที่ตามมา:**
- ประเภท: missing item, wrong SKU, abnormal weight, materials not ready, print failure, cancelled during packing, incomplete evidence, out of boxes
- ทุกเคสจะ link กับวิดีโอของ order

#### FR-83: Pre-pack prep
Prep staff สามารถเตรียมกล่องและ materials ตาม prep sheet (เลขเดียวกับ pick list) และส่งไปยังโต๊ะหรือ conveyor Mockup แสดงส่วนนี้เป็น add-on แต่อยู่ใน Phase 1 ตาม brief `[ASSUMPTION]`

**ผลที่ตามมา:**
- Materials จะถูก reserve เมื่อสร้าง sheet และถูกตัดเมื่อปิดกล่อง

#### FR-84: Value-added service tasks
Supervisor สามารถแนบ VAS instruction (ติด label, เปลี่ยนถุง, ห่อของขวัญ) กับ inbound line, order หรือ return และ staff confirm ว่าเสร็จแล้วด้วยการ scan VAS ขั้นต่ำอยู่ใน Phase 1 ตาม brief ส่วน VAS work module แบบ standalone ยังคงเป็น add-on `[ASSUMPTION]`

**ผลที่ตามมา:**
- Inbound line ที่มี VAS task ค้างอยู่จะ put away ไม่ได้
- Order ที่มี VAS task ค้างอยู่จะปิดกล่องไม่ได้
- Return item ที่มี VAS task ค้างอยู่จะ restock ไม่ได้

#### FR-118: เอกสารภาษีในกล่อง
System สามารถออกใบเสร็จหรือใบกำกับภาษีในกล่องเมื่อ packing เสร็จ โดยใช้เลขจาก document series ของบริษัท และส่งไปยัง OMS

**ผลที่ตามมา:**
- เลขจะถูก assign ตอน pack-complete ไม่ใช่ตอน print ดังนั้นการ reprint จะใช้เลขเดิม
- การ void เอกสารที่ออกไปแล้วต้องได้รับ approval และจะถูกส่งไปยัง OMS
- รูปแบบเอกสารและ numbering series ตั้งค่าได้ใน document settings

#### FR-123: Packing rules ต่อ owner
Admin สามารถ configure ต่อ owner ได้ ทั้ง box mode (owner box ก่อน, warehouse box ตามขนาด, owner box เท่านั้น), insert rule และ material matching (paired materials ต่อกล่องหรือต่อ SKU) `[ASSUMPTION: configure ภายใน packaging settings ของ WMS ใน Phase 1 เนื่องจากหน้า owner settings อยู่ใน Phase 2]`

**ผลที่ตามมา:**
- Box suggestion (FR-79) ใช้ rule เหล่านี้
- กรณีมี owner เดียว owner จะถูกเลือกไว้ล่วงหน้า

#### FR-124: Reopen กล่องที่ pack แล้ว
Supervisor สามารถ reopen กล่องที่ pack แล้วก่อนที่จะถูก sort ได้ โดยระบุเหตุผล

**ผลที่ตามมา:**
- Label จะถูก void หากยังไม่ได้ handover และ materials ที่ใช้ไปแล้วถือว่าใช้ไปแล้ว
- Order จะกลับไปที่ *packing* และ pack video จะบันทึกการ reopen ไว้

### 4.10 Handover

**คำอธิบาย:** ส่วนนี้ปิดช่องโหว่ที่ใหญ่ที่สุดของ JST พัสดุที่ pack แล้วต้องผ่านสถานะ **sorted** อย่างชัดเจน โดยถูกวางลงใน container ของ carrier และ wave หลังผ่านการตรวจสอบ 3 ข้อ รถบรรทุกถูก load ทีละ container ไม่ใช่ทีละพัสดุ การ confirm handover เป็นจุดตัด stock เพียงจุดเดียว manifest ถูก reconcile รายพัสดุเทียบกับใบรับของ carrier และจะปิดวันได้ก็ต่อเมื่อ checklist ผ่านเท่านั้น ตอบโจทย์ UJ-4

#### FR-85: Sort เข้า container
Handover staff สามารถ sort พัสดุที่ pack แล้วเข้า handover container ได้ ทั้งแบบ container-first หรือ parcel-first และสลับ mode ได้โดยไม่ต้องปิด container

**ผลลัพธ์ที่ตามมา:**
- การ scan แต่ละครั้งตรวจ 3 อย่าง: pack แล้ว, carrier ตรงกับ container และไม่ถูก cancel โดยแสดง timestamp ของข้อมูล cancellation ด้วย
- carrier ไม่ตรงจะแสดงหน้าจอสีแดง
- พัสดุที่ถูก cancel จะแสดงหน้าจอสีแดง ถูกนำไปที่ location ของสินค้าที่ถูก cancel และสร้าง cancel-return job โดยอัตโนมัติ
- ถ้าไม่มี container ที่เปิดอยู่ การ scan container เปล่าใดก็ได้จะผูก container นั้นกับ carrier และ wave
- พัสดุที่ sort แล้วจะเปลี่ยนเป็น *awaiting handover* พร้อมบันทึก container และ wave
- การใช้ container ตั้งค่าได้ (ทุก carrier, ราย carrier, ไม่ใช้) การเปลี่ยนแปลงมีผลในวันถัดไป

#### FR-86: การปิดและ seal container
Handover staff สามารถปิด container และบันทึกหมายเลข seal ได้

**ผลลัพธ์ที่ตามมา:**
- สถานะ container: open → closed → handing over → handed over
- container ที่มีพัสดุถูก cancel อยู่จะ handover ไม่ได้จนกว่าจะดึงพัสดุนั้นออก การดึงออกจาก container ที่ seal แล้วต้องใช้ seal ใหม่
- ทุก account ของ carrier เดียวกันใช้ container ร่วมกัน และ manifest แยกตาม account

#### FR-87: การ load ขึ้นรถและ confirm
Handover staff สามารถลงทะเบียนรถที่มาถึง (ทะเบียนรถ, คนขับ, รูปถ่าย), scan container ขึ้นรถ และ confirm handover ได้

**ผลลัพธ์ที่ตามมา:**
- seal ไม่ตรงกันบังคับให้ต้องค้นหา: scan พัสดุทุกชิ้นใน container และ seal container ใหม่
- การ confirm handover จะตัด stock (shipped) ก่อน confirm stock ยังคงเป็น on hand
- รถไม่มาตามนัดจะย้ายสินค้าไป wave ถัดไปโดยไม่มี return transaction
- container ที่ไม่ได้ scan ตอน confirm สามารถแยกออกเป็น pending ได้

#### FR-88: Manifest
System สามารถสร้าง manifest ต่อ handover พร้อม child manifest ราย shop หรือ carrier account

**ผลลัพธ์ที่ตามมา:**
- ยอดรวมของ parent เท่ากับผลรวมของ children order แบบหลายกล่องนับเป็น 1
- หลักฐานคือลายเซ็นบน PDA หรือ tablet หรือกระดาษที่เซ็นแล้วพร้อมรูปถ่าย ถ้าไม่มีหลักฐาน ต้องมีบุคคลที่สอง approve
- กรณีที่มี carrier API ใบรับของ carrier จะถูก reconcile รายพัสดุ และหากขาดจะเปิด case ถ้าไม่มี API ให้ Supervisor รับรองการรับของ

#### FR-89: Customer pickup
Handover staff สามารถ handover ให้ลูกค้าที่มารับเองตามนัด หลังจากตรวจสอบบัตรประจำตัวของผู้มารับแล้ว

**ผลลัพธ์ที่ตามมา:**
- การนัดหนึ่งครั้งครอบคลุมได้หลาย order และได้ manifest เดียว
- confirm ได้ก็ต่อเมื่อ scan ครบทุกกล่อง
- รูปบัตรประจำตัวเก็บไว้ 90 วัน
- ถ้าไม่มาภายใน 30 นาทีหลังเวลานัด สินค้าจะถูกส่งคืนไปที่จุด pickup

#### FR-90: ภาพรวม Handover
Supervisor สามารถดูพัสดุที่ยังไม่ได้ handover แยกตาม wave, สถานะรถ, cancellation ที่ต้องดึงออก, carry-over และยอด balance รายวันต่อ carrier

**ผลลัพธ์ที่ตามมา:**
- Pack วันนี้ = handed over + cancel ก่อน handover + pending โดยไม่ซ้ำซ้อนกัน
- Carry-over ไม่ถูกนับรวมใน pack count ของวันนี้

#### FR-91: การปิดวัน
Supervisor ที่มี permission *day close* สามารถปิดวันได้ก็ต่อเมื่อ checklist ผ่านแล้วเท่านั้น:
- ทุก wave ปิดแล้ว;
- ดึง cancellation ออกครบแล้ว;
- ของที่เหลือถูกนับด้วยการ scan;
- พัสดุที่หาไม่เจอทุกชิ้นมี case owner;
- พัสดุที่ carrier ปฏิเสธทุกชิ้นได้รับการตรวจสอบแล้ว

**ผลลัพธ์ที่ตามมา:**
- จนกว่าจะผ่าน สถานะจะแสดง *cannot close — N items left*
- การปิดวันจะเก็บ snapshot ที่แก้ไขไม่ได้
- Carry-over ไม่สร้าง order, พัสดุ หรือ stock record ใหม่ และคง pack date เดิมไว้

**Out of Scope:** trip ของรถตัวเอง (own-fleet) และ driver app (Later) การชั่งน้ำหนักตอน handover, การเปลี่ยน door และการตัดสินใจเรื่องรถมาสายถูกเลื่อนออกไป `[ASSUMPTION]`

### 4.11 Cancellations

**คำอธิบาย:** ส่วนนี้ปิดช่องโหว่ที่สองของ JST cancellation เข้ามาได้ทุก stage และ WMS บังคับใช้ที่ทุก scan point สินค้าที่ยังไม่ออกจากคลังจะกลับเข้า stock ผ่าน cancel-return job สินค้าที่ออกไปแล้วจะกลายเป็น expected return (§4.12) ตอบโจทย์ UJ-3, UJ-4

#### FR-92: การจำแนกตาม stage
System สามารถจำแนก cancellation แต่ละรายการตาม stage และ route ต่อได้

**ผลลัพธ์ที่ตามมา:**
- **ก่อน pick:** order ถูกถอดออกและปล่อย reservation
- **หลัง pick หรือหลัง pack:** สร้าง cancel-return job
- **หลัง handover:** สร้าง expected return
- ข้อมูล cancellation ที่เก่ากว่า 15 นาทีจะ trigger คำเตือนให้ re-pull ที่ sort และ handover

#### FR-93: การบังคับใช้ที่ทุก scan point
System สามารถบังคับใช้ cancellation ที่ทุก scan point

**ผลลัพธ์ที่ตามมา:**
- **Pick:** list ที่ยังไม่เริ่มสามารถ cancel ทั้ง list ได้ หลังจาก list เริ่มแล้ว cancellation เป็นราย order และสินค้าที่ pick แล้วไปที่ return staging
- **Pack:** การพิมพ์ label ถูก lock ทันที
- **Sort:** หน้าจอสีแดง และ container ถูก block จนกว่าจะดึงพัสดุออก
- **Handover:** พัสดุถูกดึงออกตอน handover (default) หรือทันที (setting)

#### FR-94: Label ที่ carrier ปฏิเสธ
Handover staff สามารถ reconcile label ที่ carrier ปฏิเสธ โดย scan แต่ละ label แล้วตามด้วย location ของสินค้าที่ถูก cancel

**ผลลัพธ์ที่ตามมา:**
- *Matched*: พัสดุรอ return
- *Carrier knew first*: พัสดุถูกถอดออกจาก manifest ระหว่างรอการตรวจสอบ
- label จาก wave อื่นจะแสดงหน้าจอสีแดง

#### FR-95: Cancel หลัง pick
Supervisor สามารถ approve หรือ reject คำขอ cancellation จาก OMS ที่เข้ามาหลังเริ่ม picking แล้วของ order แบบ self-pickup ได้ cancellation ก่อน pick จะถูกยอมรับเสมอ การแจ้งค่าใช้จ่าย 3PL ถูกตัดออกใน Phase 1 `[ASSUMPTION]`

#### FR-96: Cancel-return job
Staff สามารถดำเนินการ cancel-return job: scan label หรือ tote → scan สินค้า → scan return container

**ผลลัพธ์ที่ตามมา:**
- พัสดุที่ pack แล้วต้องแกะกล่องที่ location ของสินค้าที่ถูก cancel ก่อน
- label เดิมถือเป็น void และนำกลับมาใช้ซ้ำไม่ได้อีก
- packaging ที่ใช้ไปถูกบันทึกเป็น consumed
- ชิ้นที่เสียหายไปที่ damaged tote
- สินค้าที่หายจะเปิด search case และ urgent count

#### FR-97: Restock สินค้าที่ถูก cancel
System สามารถ auto-close container สำหรับคืนขึ้นชั้นและสร้าง restock move ได้

**ผลลัพธ์ที่ตามมา:**
- container ปิดเมื่อครบ 30 ชิ้น, ทุก 2 ชั่วโมง, 1 ชั่วโมงก่อนรถคันสุดท้าย หรือเมื่อมี order รอ SKU นั้นอยู่ กรณีสุดท้าย container จะถูก mark เป็น urgent
- สินค้าจะ pick ได้ก็ต่อเมื่อ scan location แล้วเท่านั้น
- restock ต้องเสร็จก่อนรถคันสุดท้าย restock ที่ล่าช้าจะถูก flag

### 4.12 Returns

**คำอธิบาย:** พัสดุที่ออกจากคลังไปแล้วจะกลับมาเป็น expected return ถูกรับเข้าใน session เดียวต่อการ drop-off ของ carrier หนึ่งครั้ง จับคู่กับ order เดิม ตรวจสอบรายชิ้นพร้อมรูปถ่ายและวิดีโอ และ restock ก็ต่อเมื่อ scan location แล้วเท่านั้น Problem report บรรจุหลักฐานสำหรับการตัดสินใจของ owner ซึ่งทำใน OMS after-sales การตัดสินใจเรื่อง refund และค่าชดเชยก็เป็นของ OMS เช่นกัน ตอบโจทย์ UJ-5

#### FR-98: Expected returns
System สามารถสร้าง expected return จาก: cancellation หลัง handover, การจัดส่งไม่สำเร็จ, คำขอ return จาก platform (ผ่าน OMS) และการแจ้งจาก owner

**ผลลัพธ์ที่ตามมา:**
- expected return แต่ละรายการแสดงพัสดุเดิม, SO, owner, แหล่งที่มา และ wait window
- overdue window กำหนดราย carrier (default: Flash 7, J&T 7, SPX 10 วัน)

#### FR-99: Return receipt
Returns staff สามารถเปิด return receipt หนึ่งใบต่อการ drop-off ของ carrier หนึ่งครั้ง, scan ทุก label และปิดด้วยลายเซ็นของคนขับบนหน้าจอ

**ผลลัพธ์ที่ตามมา:**
- label ของ carrier อื่นจะถูก reject ซึ่งตั้งค่าให้แค่ warn ได้
- พัสดุหนึ่งชิ้นรับเข้าได้เพียงครั้งเดียว
- tracking number ที่ไม่เคยถูก handover จะถูก reject เว้นแต่เป็น buyer-return label ที่มี tracking number ใหม่ พัสดุนั้นจะรอให้ scan tracking number เดิม หรือไปที่ return quarantine ถ้าหาไม่เจอ

#### FR-100: Return quarantine
System สามารถ quarantine พัสดุที่จับคู่ไม่ได้ไว้ใน return quarantine และเปิด problem report โดยอัตโนมัติ

**ผลลัพธ์ที่ตามมา:**
- พัสดุไม่ถูกนำเข้า stock และไม่ถูกทิ้งโดยอัตโนมัติ
- alert จะแจ้งหลัง 30 วัน และแจ้งซ้ำทุก 7 วัน

#### FR-101: Inspection
Returns staff สามารถตรวจสอบและให้ grade แต่ละชิ้นที่ camera station: good, damaged, wrong SKU, expired, packaging damaged, not this owner's

**ผลลัพธ์ที่ตามมา:**
- grade อื่นนอกจาก good ต้องมีรูปถ่ายอย่างน้อย 1 รูป วิดีโอถูกบันทึกอัตโนมัติ
- stock ถูกเพิ่มเฉพาะชิ้นที่ scan จริงเท่านั้น ชิ้นที่ shipped แต่ไม่ได้ scan จะถูกบันทึกเป็น *missing* และเปิด problem report
- kit ที่ขาด component หรือ serial ไม่ตรง จะ block การ restock
- ชิ้นที่ damaged และ expired ไปที่ damaged stock ทันที
- inspection ที่ pending นานกว่า 2 วันจะแจ้ง alert

#### FR-102: Restock ของ returns
Returns staff สามารถ restock ชิ้นที่ good โดย scan สินค้าหรือ container แล้วตามด้วย location

**ผลลัพธ์ที่ตามมา:**
- returns ถูกถือไว้เป็น *returns, awaiting inspection* จนกว่าจะตรวจสอบและ put away แล้ว
- location ผิดจะแจ้งเตือนและไม่มีอะไรถูกย้าย

#### FR-103: Problem reports
System หรือ Returns staff สามารถเปิด problem report พร้อมหลักฐานรูปถ่ายและวิดีโอ, ประเภทปัญหา (15 ประเภท), แหล่งที่มา และฝ่ายที่จะ claim

**ผลลัพธ์ที่ตามมา:**
- return rule matrix ตัดสินว่าหน้างานจะ resolve report เอง หรือส่งไป OMS เป็น decision case
- ถ้าไม่มีการตัดสินใจกลับมาภายใน 7 วัน สินค้าจะยังคงถูกจัดเก็บไว้

#### FR-104: Return job board
Supervisor สามารถดู return job board รายพัสดุ: awaiting → received → inspected → awaiting decision หรือ extra work → restocked → done โดย board แสดงจำนวน overdue, throughput และ restock rate

### 4.13 Approvals, Notifications & Audit

**คำอธิบาย:** นี่คือ engine กลางที่ทุก feature ใช้ร่วมกัน Approvals ทำให้ action ที่ sensitive ต้องผ่านการอนุมัติ 1 หรือ 2 ขั้น Notifications ส่งถึง role ที่ถูกต้องผ่าน in-app, LINE หรือ email และ activity log ที่แก้ไขไม่ได้เพียงชุดเดียวบันทึกว่าใครทำอะไร บน device ไหน และเพราะอะไร

#### FR-105: Approvals engine
Admin สามารถตั้งค่า approval แต่ละประเภทด้วย approver role ของ step 1, เงื่อนไขของ step 2 และเวลา escalation

**ผลลัพธ์ที่ตามมา:**
- ประเภทใน Phase 1 ได้แก่:
  - **Stock และ ledger:** stock adjustment (แบ่ง tier ตามจำนวนชิ้น, % และมูลค่า), reversal (ทุกครั้ง), opening balance
  - **Stock release และ disposal:** release reservation ที่ค้าง, release lot ที่ถูก hold, material issue เกิน limit, disposal
  - **Inbound:** ปิด ASN ก่อนกำหนด, การรับสินค้าอายุสั้น (short-shelf-life)
  - **Label และข้อมูล:** label reprint, barcode เพิ่มเติม
  - **Admin:** การปิดใช้งาน warehouse, การลบวิดีโอแบบ bulk, support critical change
- approval ที่เกี่ยวกับเงินไม่สามารถ approve ด้วยตัวเองได้
- approval ที่ไม่มีคนตอบจะ escalate ไป step 2 แล้วจึงไป admin
- จำนวน approval ที่ pending แสดงใน header

#### FR-106: Notifications engine
Admin สามารถตั้งค่า channel (in-app, LINE, email) และผู้รับ (role, คนที่เกี่ยวข้อง, user ที่เลือก) ของ notification แต่ละประเภท

**ผลลัพธ์ที่ตามมา:**
- บางประเภทปิดไม่ได้ (stock WMS ≠ OMS, พื้นที่เก็บวิดีโอเกิน 90%)
- user สามารถ mute LINE หรือ email ได้ แต่ไม่สามารถ mute in-app notification ได้
- notification ที่มีไว้สำหรับ owner จะส่งผ่าน OMS

#### FR-107: Activity log
System สามารถเก็บ activity log ที่แก้ไขไม่ได้ ประกอบด้วยเวลา, ผู้กระทำ (user, automation, OMS API, Zimple support), device, action, ค่าเดิม → ค่าใหม่ และเหตุผล

**ผลลัพธ์ที่ตามมา:**
- log ครอบคลุม:
  - sign-in และ sign-out รวมถึงครั้งที่ล้มเหลว;
  - create, edit, cancel, approve และ reject;
  - adjust และ reverse;
  - การเปลี่ยน rule, user และ permission;
  - print และ reprint;
  - ทุกการ export
- log สามารถ filter และ export ได้ ระยะเวลาเก็บอย่างน้อย 1 ปี `[ASSUMPTION]`

#### FR-108: Overdue alerts
System สามารถแจ้ง alert *overdue* สำหรับ SLA ของทุก stage (temporary receipt ที่เปิดค้าง, รอ putaway, move ที่ค้าง, inspection ที่ pending และอื่น ๆ ในลักษณะเดียวกัน) โดยตั้งค่า threshold ได้ราย warehouse

### 4.14 Overview & Reports

#### FR-109: Overview dashboard
Warehouse Manager สามารถดูภาพรวมแบบ real-time ที่ refresh ทุก 1 นาที ประกอบด้วย:
- handed over เทียบกับทั้งหมด;
- awaiting handover ที่ใกล้ cut-off;
- pack accuracy;
- on-time %;
- inventory accuracy;
- พื้นที่ที่ใช้ไป;
- productivity เทียบกับ target ต่อ stage;
- approval ที่ pending

**ผลลัพธ์ที่ตามมา:**
- segment ของ order pipeline คลิกได้และ drill ลงไปยัง list ที่ filter แล้ว

#### FR-110: Reports
Warehouse Manager สามารถเปิด report ของ Phase 1:
- inbound analysis;
- stock movement summary;
- inventory accuracy;
- daily outbound และ variance;
- packaging usage;
- handover และ on-time;
- returns analysis;
- staff performance

แต่ละ report แสดงเวลา data-as-of และ filter และรองรับการ export เป็น Excel

**ผลลัพธ์ที่ตามมา:**
- การ download ถูกควบคุมด้วย permission และถูก log ไว้
- Buyer PII ถูก mask เว้นแต่ user มี PII permission
- report สามารถตั้งเวลาให้ส่งอัตโนมัติทาง email หรือ LINE ได้
- user สามารถบันทึก report view และ drill ลงไปยัง operational list เบื้องหลังได้

### 4.15 Migration & Cutover จาก JST

**คำอธิบาย:** Phase 1 จะสำเร็จก็ต่อเมื่อคลังสามารถย้ายออกจาก JST ได้โดยไม่ต้องหยุด operation SKU เข้าสู่ WMS ผ่าน Zimple OMS ส่วนที่เหลือ WMS เป็นผู้จัดเตรียม: โครงสร้าง, device, คน และ opening stock จากนั้น cutover check จะพิสูจน์ว่า stock ถูกต้องก่อน live wave แรก เนื้อหาส่วนใหญ่ใน section นี้เป็นการอนุมาน เพราะแหล่งข้อมูลระบุไว้เพียงการ import opening balance เท่านั้น ตอบโจทย์ UJ-6

#### FR-111: การ import opening balance
Admin สามารถ import opening balance จาก Excel ราย owner × SKU × lot × location

**ผลลัพธ์ที่ตามมา:**
- การ import จะสร้างเอกสาร opening balance ที่รอ approval และต้องผ่าน approval เสมอ
- เมื่อ approve แล้ว ledger line ประเภท *opening balance* จะถูก post
- แถวที่มี SKU, location หรือรูปแบบ lot ที่ไม่รู้จักจะถูก reject พร้อม error report ระดับแถว `[ASSUMPTION]`

#### FR-112: การ import โครงสร้าง
Admin สามารถ bulk-import zone และ location จาก template `[ASSUMPTION]`

**ผลลัพธ์ที่ตามมา:**
- แสดง dry-run preview ก่อน
- validation เป็นแบบ all-or-nothing ต่อไฟล์

#### FR-113: การ import attribute ระดับ warehouse
Admin สามารถ bulk-import SKU attribute ระดับ warehouse (ขนาดและน้ำหนักที่วัดจริง, tracking flag ที่ไม่ได้มาจาก OMS) `[ASSUMPTION]`

#### FR-114: Cutover check
Admin สามารถรัน cutover check `[ASSUMPTION]`:
1. blind count ทั้งคลังหลังการ import opening balance;
2. เปรียบเทียบยอดรวมใน ledger กับยอดรวมที่ import;
3. push stock จาก WMS → OMS

**ผลลัพธ์ที่ตามมา:**
- live wave แรกถูก block จนกว่า check จะผ่าน หรือ Warehouse Manager override พร้อมระบุเหตุผล

**หมายเหตุ:** `[NOTE FOR PM]` วิธีจัดการ order และ ASN ที่ค้างอยู่ระหว่าง cutover และ Zimple OMS จะ import SKU จาก JST หรือไม่ ยังเป็นประเด็นเปิด (Q-4)

### 4.16 ข้อมูลที่ Phase 1 ต้องเก็บไว้สำหรับ Phase ถัดไป

ส่วนนี้ไม่ต้องมี UI ข้อมูลเหล่านี้ถูกเก็บตั้งแต่ตอนนี้เพื่อให้ Phase 2 (billing, claims, Client Portal) ไม่ต้อง back-fill:
- owner บนทุก stock record, เอกสาร และ SKU แม้จะมี owner เพียงรายเดียว owner picker จะถูกซ่อนเมื่อมี owner เพียงรายเดียว `[ASSUMPTION]`
- สัญญาณ billable-event:
  - รอบการรับสินค้า, carton และ CBM, การมาถึงนอกเวลาทำการและแบบไม่แจ้งล่วงหน้า;
  - มีการ pack หรือไม่, stage ของ cancellation และประเภท order;
  - packaging เทียบกับกล่องของ owner, วัสดุที่จับคู่และวัสดุเพิ่มเติม, insert;
  - storage CBM ราย SKU และ location
- evidence chain สำหรับ claim: pick scan → pack video → น้ำหนัก → manifest และ seal → carrier event รวมถึง case carrier-shortage และหลักฐานของ problem report
- มูลค่า variance ที่ราคาทุน และฝ่ายที่รับผิดชอบความเสียหาย
- slot ระดับ owner ใน settings precedence

## 5. NFR ที่ครอบคลุมทั้งระบบ (Cross-Cutting NFRs)

- **NFR-1 Throughput:**
  - รองรับได้ต่อเนื่อง 30,000 order ต่อวันต่อคลัง
  - รับ peak ช่วงแคมเปญ (11.11) ที่ 3× ของ volume รายวันปกติได้ `[ASSUMPTION: ยังไม่ได้ยืนยัน peak multiple]` โดยไม่พลาด carrier wave เพราะสาเหตุจากระบบ
- **NFR-2 Scan latency:**
  - การ scan บน PDA หรือ station ต้องให้ feedback accept/reject ภายใน 500 ms ที่ p95 ภายใต้ peak load `[ASSUMPTION]`
  - Label ต้องพิมพ์ออกภายใน 2 s หลังการ scan verification ครั้งสุดท้าย `[ASSUMPTION]`
- **NFR-3 Offline tolerance:**
  - งาน picking, counting และ moves บน PDA ต้อง queue การ scan ไว้ขณะ offline และ sync เมื่อเชื่อมต่อใหม่โดยไม่เกิดข้อมูลซ้ำ
  - การ scan ใดที่ต้องใช้ข้อมูล live (การตรวจ cancellation ที่ pack และ sort) ต้อง fail closed พร้อมข้อความที่ชัดเจน
- **NFR-4 Availability:**
  - 99.9% ในช่วงเวลาทำการที่ตั้งค่าไว้ของแต่ละคลัง `[ASSUMPTION]`
  - ไม่มี planned downtime ภายใน 3 วันก่อนวันแคมเปญที่ตั้งค่าไว้
- **NFR-5 Integration resilience:**
  - ทุก call ไปยัง OMS และ carrier ต้อง idempotent และ retry แบบ backoff
  - การส่งที่ล้มเหลวต้องแสดงขึ้นใน queue (FR-4)
  - Available-to-sell ต้องถึง OMS ภายใน 5 นาทีหลังจาก stock เปลี่ยน `[ASSUMPTION]`
- **NFR-6 Data integrity:**
  - Ledger เป็นแบบ append-only
  - Daily reconciliation (FR-7) ต้องแสดงผลต่างที่อธิบายไม่ได้เป็นศูนย์
  - ห้ามมี feature ใดเขียน stock นอก ledger
- **NFR-7 Security:**
  - Role-based access ถูกบังคับฝั่ง server สำหรับทุกหน้าและทุก action และข้อมูลถูก scope ตามคลัง
  - MFA เปิดให้บริษัทใช้ได้ และบังคับใช้สำหรับ Zimple support
  - Action ที่ sensitive ทั้งหมดถูก log ไว้ (FR-107)
- **NFR-8 Localization:**
  - ภาษาไทยเป็นภาษาหลักของ UI และมีภาษาอังกฤษให้เลือก
  - เลขที่เอกสารใช้ YY แบบคริสต์ศักราช (Gregorian)
  - วันที่แสดงตาม locale ของผู้ใช้
- **NFR-9 Floor usability:**
  - งานหน้าคลังทุกงานต้องทำให้เสร็จได้ด้วยการ scan บวกกับการกรอกตัวเลขให้น้อยที่สุด
  - การ reject ใช้หน้าจอสีแดงเต็มจอพร้อมเสียง
  - พนักงานหน้าคลังคนใหม่ต้องทำ pick list, pack job และ putaway ได้เองโดยไม่ต้องมีคนช่วย หลังผ่านการทำงานภายใต้การดูแล 1 กะ `[ASSUMPTION]`
- **NFR-10 Device support:**
  - Rugged Android PDA ที่มี scanner ในตัว `[ASSUMPTION]`, scanner แบบ USB/HID, เครื่องพิมพ์ thermal 80 mm และเครื่องพิมพ์ label, เครื่องพิมพ์ A4, ตาชั่งแบบ USB/serial และกล้อง IP
  - Web fallback สำหรับคลังที่ไม่มี PDA เป็น functional requirement (FR-122)
- **NFR-11 Multi-warehouse readiness:**
  - Data model และ permission รองรับมากกว่าหนึ่งคลังต่อบริษัท และผู้ใช้สามารถสลับคลังได้
  - Pilot ใช้งานหนึ่ง site `[ASSUMPTION]`

- **NFR-12 UX quality (คำสัญญาหลัก):**
  - ผู้ใช้ฝั่ง office และหน้าคลังให้คะแนนว่า Zimple Fulfillment ใช้งานง่ายกว่า JST (SM-10)
  - Warehouse web app และหน้าจอ PDA ใช้ design system เดียวกัน: component, สีของ status และ scan feedback สอดคล้องกันในทุก module
  - ผู้ใช้ CS ต้องตอบคำถาม "order นี้อยู่ที่ไหน และเกิดอะไรขึ้นกับมันบ้าง?" ได้จากหน้าจอ order เพียงหน้าเดียวภายในไม่ถึง 1 นาที `[ASSUMPTION]`

## 6. ข้อจำกัดและ Guardrails

### 6.1 ความเป็นส่วนตัว (PDPA)

ชื่อ ที่อยู่ และเบอร์โทรศัพท์ของผู้ซื้อเป็นข้อมูลส่วนบุคคล บริษัท pilot เป็น data controller สำหรับลูกค้า 3PL ในอนาคต ผู้ให้บริการ Zimple Fulfillment จะทำหน้าที่เป็น processor
- Buyer PII ถูก mask เป็นค่า default บนหน้าจอ, export และ report มีเพียง permission *view buyer PII* เท่านั้นที่ unmask ได้ (FR-19)
- Media ที่มี PII มี retention limit แบบ default:
  - วิดีโอการ pack และการรับสินค้า: 60 วัน;
  - รูปบัตรประชาชนของผู้มารับสินค้า (collector): 90 วัน;
  - เบอร์โทรศัพท์ของแรงงานรายวัน: 90 วัน
  - เมื่อครบ limit แล้ว ระบบจะ purge รายการนั้นทิ้ง คลิปที่ถูก lock ไว้กับ case ที่ยังเปิดอยู่จะถูกเก็บไว้จนกว่า case จะปิด
- ทุกการดูและ export PII ถูก log ไว้ (FR-107)
- Hosting region และ retention ของ buyer PII นอกเหนือจากวิดีโอยังเป็นประเด็นเปิด (Q-9)

### 6.2 Guardrails ด้านการปฏิบัติงาน

- ไม่มีการ manual stock adjustment ในที่ใดเลย สิ่งนี้ตั้งใจออกแบบไว้ ไม่ใช่ feature ที่ขาดหายไป
- ไม่มีการทำลายสินค้า (disposal) แบบอัตโนมัติ ไม่ว่ากรณีใด
- Label ที่ platform ออกให้จะไม่ถูกแก้ไขเด็ดขาด
- ไม่มีการสร้าง แก้ไข หรือยกเลิก order ใน WMS Cancellation มีต้นทางจาก OMS เสมอ

## 7. Integration และ Dependencies

| Dependency | บทบาทใน Phase 1 | ความเสี่ยง |
|---|---|---|
| **Zimple OMS** | แหล่งของ order, SKU, kit, ASN, cancellation และ change request รับ status, stock และผลการรับสินค้าขาเข้า Pilot ไม่สามารถ cut over ได้หากไม่มีมัน | **Critical.** ความพร้อม, API contract และพฤติกรรมช่วง peak ของมันเป็นตัว gate ของ Phase 1 `[ASSUMPTION: Zimple OMS มีอยู่แล้วหรือถูกส่งมอบไปพร้อมกัน]` |
| Marketplaces (Shopee, Lazada, TikTok Shop) | ทางอ้อม ผ่าน OMS: label, carrier, cancellation, return request | Platform rate limit ช่วง 11.11 ส่งผ่านมาทาง OMS |
| Carriers: Flash, KEX (เดิมคือ Kerry), J&T | Direct API สำหรับ order ที่ไม่ใช่ marketplace: tracking, label, receipt event | จากการ research ไม่พบเอกสาร API สาธารณะ การเข้าถึงต้องผ่าน business account KEX กำลังปรับโครงสร้าง |
| Generic WMS API | ให้ OMS ที่ไม่ใช่ Zimple เชื่อมต่อได้ | Contract ต้อง stable ก่อน onboard prospect รายใดๆ |
| Hardware (PDA, เครื่องพิมพ์, ตาชั่ง, กล้อง, NAS สำหรับวิดีโอ) | จำเป็นสำหรับ station และงานหน้าคลัง | Brief ระบุให้สร้าง station และ integration ก่อน เพราะมีความเสี่ยงทางเทคนิคสูงที่สุด |

### 7.1 ความเสี่ยงและแนวทางลดความเสี่ยง

| ความเสี่ยง | ผลกระทบ | แนวทางลดความเสี่ยง |
|---|---|---|
| Zimple OMS ยังไม่พร้อม รวมถึง after-sales decision case | Phase 1 cutover ไม่สามารถเกิดขึ้นได้ **Decision: Phase 1 cutover เลื่อนตาม Zimple OMS; ไม่มี JST-OMS fallback** | ติดตามความพร้อมของ Zimple OMS เป็น milestone ของ Phase 1 ตกลง contract WMS ↔ OMS ให้ได้ก่อน |
| Scope (124 FR) เทียบกับทีมเล็กใน 2 เดือน | Pilot พลาดวัน cutover หรือ ship ออกไปโดยมีช่องว่าง | Provisional tier (§9.3) ยืนยันด้วย JST parity checklist (Q-1) |
| ยังไม่พร้อมรับ load 30,000 order ต่อวันและ 11.11 | พลาด wave, โดน platform penalty, เสียความเชื่อมั่น | Load test ที่ peak volume (NFR-1) ก่อน cutover เป็น release gate |
| Station และ integration (เครื่องพิมพ์, ตาชั่ง, กล้อง, carrier API) | ความเสี่ยงทางเทคนิคสูงที่สุด ตามที่ brief ระบุ | สร้าง station และ integration ก่อน |
| Cutover กระทบการปฏิบัติงาน | พลาด wave ในสัปดาห์ cutover | รัน cutover check (FR-114) มี rollback runbook กลับไป JST เป็นลายลักษณ์อักษรสำหรับ 2 สัปดาห์แรก `[ASSUMPTION]` SM-11 เป็นตัววัด |
| ไม่สามารถทำตามคำสัญญาด้าน UX ได้ | ไม่มีเหตุผลให้เปลี่ยน เพราะราคาเท่ากับ JST | Design system เดียว (NFR-12) วัด SM-10 กับผู้ใช้ pilot |

## 8. สิ่งที่ไม่ใช่เป้าหมาย (Non-Goals แบบชัดเจน)

- **ไม่ใช่ OMS** ไม่มีการสร้าง แก้ไข หรือยกเลิก order, ไม่มีการเชื่อมต่อ marketplace ของตัวเอง, ไม่มีการตัดสินใจเรื่อง refund, compensation หรือฝั่ง owner ทุก cancellation มีต้นทางจาก OMS WMS ทำหน้าที่เพียงบังคับใช้ และสามารถอนุมัติได้ว่า cancellation *หลังจากเริ่มงานไปแล้ว* จะยอมรับในทางกายภาพหรือไม่ (FR-95)
- **ไม่ใช่ multi-owner 3PL ใน Phase 1:**
  - **ไม่รวม:** Client Portal, Owners module (profile, contract, request สองทาง), UI สำหรับ rule ราย owner, rate card และ billing, claim และ rush request
  - **Phase 1 ยังคงไว้:** ข้อมูลที่ scope ตาม owner (§4.16)
- **ไม่ใช่ TMS** ไม่มี trip ของกองรถตัวเอง, driver app หรือ proof of delivery
- **ไม่ใช่เครื่องมือจัดซื้อหรือบริหารแรงงาน** ไม่มี supplier หรือ PO, ไม่มีการวางแผนกะ, check-in หรือการทดสอบพนักงาน, ไม่มี peak forecasting
- **ไม่ใช่ customization platform** ไม่มี theme tool, document template designer, layout map editor หรือ TV mode
- **อยู่นอก Phase 1:** temperature log และการโอนย้ายระหว่างคลัง (inter-warehouse transfer)
- **ไม่มีการจัดการ e-Tax invoice หรือภาษีหัก ณ ที่จ่าย** สิ่งเหล่านี้เป็นส่วนของ billing ใน Phase 2 (ดู addendum)

## 9. Scope ของ Phase 1

### 9.1 อยู่ใน Scope
- **Integration:** Zimple OMS บวก generic API; direct carrier API สำหรับ order ที่ไม่ใช่ marketplace
- **Setup:** คลัง, zone, location, container, device และ station, rule และลำดับความสำคัญ (precedence), pickup round, numbering, calendar
- **Access:** user, role, special permission, การ sign-in ทาง web และ PDA, บัตรแรงงานรายวัน, support access
- **สินค้าและวัสดุ:** attribute ของ SKU ระดับคลัง, unit และ barcode, lot, expiry และ serial, kit, packaging ในฐานะ stock
- **Inbound:** temporary receipt, การรับสินค้าพร้อมหลักฐาน, exception และ quarantine, putaway, การปิด receipt
- **Inventory:** ledger, move, replenishment, count, FEFO, สินค้าเสียหายและ disposition
- **Order และ picking:** order, hold, change request, cut-off board; picking ด้วย 6 วิธี, list อัตโนมัติ, short-pick flow, put wall
- **Packing:** 4 วิธี, verification, น้ำหนัก, label, กล่องและวัสดุ, วิดีโอ, station, exception, prep, VAS ขั้นต่ำ
- **Handover:** สถานะ sorted, container และ seal, การโหลดขึ้นรถ, manifest, การรับสินค้าเองโดยลูกค้า, การปิดวัน
- **Cancellation และ return:** cancellation ในทุก stage, return แบบครบวงจร
- **Shared engine:** approval, notification, audit, overview, report ของ Phase 1
- **Cutover:** migration และ cutover check
- **Web fallback:** ทุก floor flow รันบน web ได้สำหรับคลังที่ไม่มี PDA (FR-122)
- **Connection และ decision case:** การตั้งค่า OMS, carrier และ API (FR-119); decision case ไปยัง OMS after-sales (FR-121)

### 9.2 อยู่นอก Scope ของ Phase 1
- **Phase 2:** Client Portal, Owners module, billing และ rate card, claim, UI การตั้งค่าราย owner, rush request สิ่งเหล่านี้คือคุณค่าของ multi-owner 3PL การมีข้อมูลที่ scope ตาม owner ตั้งแต่ตอนนี้ทำให้ต้นทุนการทำในภายหลังต่ำ
- **Later:**
  - Transport, TMS และ driver app; handover ด้วยกองรถตัวเอง
  - Purchasing; planning และ workforce; peak forecast
  - TV mode, theme tool, template designer
- **Feature ที่ยังไม่ได้กำหนด phase ซึ่งถูกจัดเป็น Later ตามกฎ JST-parity** `[ASSUMPTION]`: layout map, temperature log, inter-warehouse transfer
- **ส่วนเสริมของ handover ที่เลื่อนออกไป** `[ASSUMPTION]`: การชั่งน้ำหนักตอน handover, การ reassign ประตู, การตัดสินใจกรณีรถมาสาย
- **หลัง pilot:** connector สำเร็จรูปสำหรับ JST, Zort และ OMS อื่นๆ `[ASSUMPTION]`
- `[NOTE FOR PM]` **Scope ใหญ่มากสำหรับทีมเล็กใน 2 เดือน** PRD นี้มี 124 FR §9.3 ให้ provisional tier ไว้ JST parity checklist (Q-1) จะเป็นตัวยืนยัน

### 9.3 Provisional Priority Tiers `[ASSUMPTION]`

Tier เหล่านี้อิงตาม thesis: core flow, gap สองข้อของ JST, ความถูกต้องของ stock และสิ่งที่ pilot ต้องใช้ในวัน cutover ให้ยืนยันด้วย JST parity checklist (Q-1) ก่อนจัดลำดับ story

- **Must (วัน cutover):** FR-1–5, 7, 8, 10–15, 17–21, 24–26, 28, 29, 31, 33, 34, 36–44, 46–50, 52–54, 56–58, 61–64, 66–68, 70, 71, 73, 75 (by order, by pick list, multi-box), 76–82, 85–88, 90–94, 96–103, 105–107, 111, 114, 116, 118–122.
- **Should (ภายใน 4 สัปดาห์หลัง cutover):** FR-6, 16, 22, 23, 27, 30, 32, 35, 45, 51, 55, 59, 60, 69, 72, 74, 84, 89, 95, 104, 108–110, 112, 113, 115, 117, 123, 124.
- **Defer (หลังจาก pilot stable แล้ว):** FR-9, 65, 75 (production line), 83.


## 10. Success Metrics

**Primary**
- **SM-1 Pilot cutover**
  - **Measure:** คลัง pilot รัน order และ stock 100% บน Zimple Fulfillment โดยปิด JST แล้ว
  - **Target:** ภายใน 4 สัปดาห์หลัง Phase 1 release `[ASSUMPTION]`
  - **Validates:** FR-1–7, FR-111–114.
- **SM-2 Throughput ที่ volume จริง**
  - **Measure:** คลังรองรับได้ต่อเนื่อง 30,000 order ต่อวัน โดยไม่มี carrier wave ที่พลาดเพราะสาเหตุจากระบบ (downtime, latency, sync failure) เลยตลอดวันแคมเปญเต็มวันแรก
  - **Validates:** NFR-1–5, FR-60, FR-73.
- **SM-3 Inventory accuracy**
  - **Measure:** ความแม่นยำของ location จาก blind count ในช่วง 30 วัน
  - **Target:** ≥ 99.5%
  - **Validates:** FR-42–51.

**Secondary**
- **SM-4 Order accuracy**
  - **Measure:** order ที่ ship ออกไปโดยมีสินค้าหรือจำนวนผิด ซึ่งพบผ่าน return หรือ problem report
  - **Target:** เท่ากับหรือต่ำกว่าอัตราของ pilot ในยุค JST `[ASSUMPTION: ต้องวัด JST baseline ก่อน cutover]`
  - **Validates:** FR-67, FR-76, FR-77.
- **SM-5 On-time handover**
  - **Measure:** order ที่ handover ใน carrier wave ที่ได้รับมอบหมาย
  - **Target:** ≥ 98% `[ASSUMPTION]`
  - **Validates:** FR-60, FR-66, FR-85–88.
- **SM-6 Daily balance**
  - **Measure:** จำนวนวันที่ packed = handed over + cancelled + pending และ WMS = OMS ณ เวลา 06:00
  - **Target:** 100% ของวัน
  - **Validates:** FR-7, FR-90.
- **SM-7 Time to productive**
  - **Measure:** จำนวนกะจนกว่าพนักงานหน้าคลังคนใหม่จะทำงานเสร็จได้เองโดยไม่ต้องมีคนช่วย
  - **Target:** ≤ 1 `[ASSUMPTION]` และต่ำกว่า JST
  - **Validates:** NFR-9.
- **SM-8 Cancellations caught**
  - **Measure:** order ที่ถูกยกเลิกก่อน handover แต่ยังถูก ship ออกไป
  - **Target:** 0
  - **Validates:** FR-92–94.

- **SM-10 Ease of use vs JST**
  - **Measure:** ผู้ใช้ฝั่ง office และหน้าคลังของ pilot ที่ให้คะแนนว่า Zimple Fulfillment ใช้งานง่ายกว่า JST ใน survey 4 สัปดาห์หลัง cutover
  - **Target:** ≥ 80% `[ASSUMPTION]`
  - **Validates:** NFR-9, NFR-12.
- **SM-11 Cutover without disruption**
  - **Measure:** carrier wave ที่พลาดเพราะสาเหตุเกี่ยวกับ cutover ในช่วง 2 สัปดาห์แรกหลัง cutover
  - **Target:** 0 `[ASSUMPTION]`
  - **Validates:** FR-111–114.

**North star (หลังจาก Phase 1)**
- **SM-9 Market share** ครองส่วนแบ่ง 50% ของคลังที่ใช้ JST อยู่ จำนวน baseline และ deadline ยังเป็นประเด็นเปิด (Q-2)

**Counter-metrics (ห้าม optimize)**
- **SM-C1 Picking speed** (ชิ้นต่อชั่วโมง) ห้ามเพิ่มด้วยการผ่อนปรน scan verification ใช้ถ่วงดุลกับ SM-5
- **SM-C2 Approval volume** ห้ามลดด้วยการผ่อนปรน approval rule หรืออนุญาตให้ self-approval ใช้ถ่วงดุลกับ SM-3 และ SM-6
- **SM-C3 จำนวน feature หรือหน้าจอที่ส่งมอบ** Parity วัดเทียบกับการใช้งาน JST จริงของ pilot ไม่ใช่จำนวน mockup ที่สร้าง ใช้ถ่วงดุลกับ SM-1

## 11. Open Questions

1. **Q-1 JST parity checklist** (phase-blocker สำหรับการจัดลำดับ) การใช้งาน JST จริงของ pilot ยืนยัน provisional tier ใน §9.3 หรือไม่?
2. **Q-2 Market baseline** ปัจจุบันมีคลังกี่แห่งที่ใช้ JST และควรได้ส่วนแบ่ง 50% ภายในเมื่อไร?
3. **Q-3 Zimple OMS readiness** (phase-blocker; Phase 1 cutover เลื่อนตามนี้) ปัจจุบัน Zimple OMS มีอยู่แล้วหรือไม่? รองรับ after-sales decision case (FR-121), rider call (FR-117) และ tax-document sync (FR-118) หรือไม่?
   - เปิดให้ใช้ order, SKU, kit, ASN, cancellation, change request และ after-sales decision ของมันได้ทันตาม timeline ที่ Phase 1 ต้องการหรือไม่?
   - API limit ของมันช่วง peak เป็นเท่าไร?
4. **Q-4 Cutover mechanics** order และ ASN ที่ยังอยู่ระหว่างดำเนินการจะจัดการอย่างไรตอน cutover? Zimple OMS import SKU จาก JST หรือไม่? มีการย้าย history จาก JST มาด้วยหรือไม่?
5. **Q-5 Add-on modules vs Phase 1** Mockup ระบุ automatic pick list, prep, VAS และ kit assembly เป็น add-on แต่ brief ใส่ไว้ใน Phase 1 PRD นี้รวมไว้ด้วย (FR-65, FR-83, FR-84, FR-27) ขอยืนยัน และยืนยันว่า add-on licensing จะใช้กับ pilot อย่างไร
6. **Q-6 Default roles** Approval ใน mockup อ้างถึง role ที่ไม่มีอยู่ใน default role list ขอยืนยันชุด default role (FR-18)
7. **Q-7 การออกแบบและค่า default ของ Warehouse rules** มีสองแบบดีไซน์ และค่า default ของระบบต่างจากค่าตัวอย่าง:
   - receiving count: ทุก carton vs สุ่ม 2 กล่อง;
   - replenishment interval: 60 vs 30 นาที;
   - cancellation-data freshness: 30 vs 15 นาที
   จะใช้ดีไซน์ไหนและค่า default ไหน? นี่เป็นการตัดสินใจด้าน UX ไม่ใช่ blocker
8. **Q-8 Count approval thresholds** Approval matrix ระบุ > 5 ชิ้น, 2% หรือ ฿2,000 แต่หน้าจอ count ระบุ > ฿1,000 จะใช้ค่าไหน?
9. **Q-9 Hosting และ data residency** Buyer PII และวิดีโอถูกเก็บไว้ที่ไหน? Retention ของ order PII เป็นอย่างไร?
10. **Q-10 Peak multiple** Peak จริงของ 11.11 เทียบกับวันปกติเป็นเท่าไร (NFR-1)?
11. **Q-11 PDA designs** ยังไม่มีดีไซน์ PDA สำหรับ putaway และ sorting และ mockup PDA ทุกอันเป็นเพียง reference-only UX ต้องออกแบบ (`bmad-ux`)
12. **Q-12 Production-line packing** Volume ของ pilot คุ้มที่จะทำใน Phase 1 หรือไม่ (FR-75)? เลื่อนออกไปชั่วคราว
13. **Q-13 JST facts** ยืนยันว่า JST หมายถึง JST ERP และประเมินเป็นตัวเลขของค่า license และความเจ็บปวดจาก lock-in (ยกมาจาก brief)
14. **Q-14 Pricing และ packaging** ราคาสุดท้ายเป็นเท่าไร และ add-on module จับคู่กับ edition อย่างไร (ยกมาจาก brief)?
15. **Q-15 JST UX failure cases** รวบรวมกรณี UX ของ JST ที่ล้มเหลวอย่างเป็นรูปธรรมจากผู้ใช้ pilot เพื่อใช้เป็น baseline สำหรับ SM-10 และ NFR-12 (ยกมาจาก brief)

## 12. ดัชนี Assumptions

**Scope และการแบ่ง phase**
- §0/§2.3 — ตัวละครหลักใน user journey เป็นตัวอย่างประกอบ ไม่ใช่ผู้ใช้ที่ได้สัมภาษณ์จริง
- §4.1 — Connector OMS สำเร็จรูปสำหรับ JST, Zort และอื่นๆ อยู่หลัง pilot Phase 1 สร้าง connector สำหรับ Zimple OMS บวก generic API
- §4.8 FR-65, §4.9 FR-83, FR-84 — Automatic pick list, prep และ VAS ขั้นต่ำอยู่ใน Phase 1 ตาม brief แม้ใน mockup จะติด label ว่า add-on
- §4.10 — การชั่งน้ำหนักตอน handover, การ reassign ประตู และการตัดสินใจกรณีรถมาสายถูกเลื่อนออกไป
- §4.11 FR-95 — Approval สำหรับ cancel-after-pick ยังคงมี approval แต่ตัด 3PL cost notice ออก
- §9.2 — Layout map, temperature log และ inter-warehouse transfer ย้ายไปเป็น Later ตามกฎ JST-parity
- §9.3 — Provisional priority tier ทั้งหมด
- §4.9 FR-123 — Owner packing rule ตั้งค่าใน packaging settings ของ WMS
- §7.1 — Rollback runbook กลับไป JST เป็นเวลา 2 สัปดาห์

**Owner role ใน Phase 1**
- §4.2 FR-13 — การตั้งค่าระดับ owner ใช้ค่าของคลังเป็น default โดยไม่มี UI ใน Phase 1
- §4.16 — ข้อมูลทุกที่ scope ตาม owner; owner picker จะถูกซ่อนเมื่อมี owner เพียงรายเดียว

**พฤติกรรมของ Product**
- §4.1 FR-6 — Event หลัง handover มาจาก OMS (marketplace) หรือ carrier API (ไม่ใช่ marketplace)
- §4.3 FR-18 — Warehouse Head และ Handover Lead เป็น default role
- §4.13 FR-107 — Activity log ถูกเก็บไว้อย่างน้อย 1 ปี
- §4.15 FR-111–114 — Row-level import error, structure import, attribute import และ cutover check เป็นสิ่งที่อนุมานขึ้นมา

**Quality targets (§5)**
- NFR-1 — Peak multiple 3×
- NFR-2 — Scan feedback 500 ms, label print 2 s
- NFR-4 — Availability 99.9%
- NFR-5 — Stock push ภายใน 5 นาที
- NFR-9 — Onboarding ภายในหนึ่งกะ
- NFR-10 — Android PDA
- NFR-11 — Pilot ใช้งานหนึ่ง site
- NFR-12 — เป้าหมายให้ CS ตอบได้ภายใน 1 นาที

**Dependencies และ metrics**
- §7 — Zimple OMS มีอยู่แล้วหรือถูกส่งมอบไปพร้อมกัน
- §10 — กรอบเวลา 4 สัปดาห์ของ SM-1, JST baseline ของ SM-4, target 98% ของ SM-5, target หนึ่งกะของ SM-7, target 80% ของ SM-10 และ target ศูนย์ของ SM-11
