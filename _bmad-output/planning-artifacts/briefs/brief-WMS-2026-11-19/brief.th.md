---
title: "Product Brief: Zimple Fulfillment"
status: final
created: 2026-11-19
updated: 2026-11-19
---

# Product Brief: Zimple Fulfillment

## บทสรุปผู้บริหาร (Executive Summary)

Zimple Fulfillment คือระบบบริหารคลังสินค้า (WMS) สำหรับงาน e-commerce fulfillment ในไทย ขายให้ผู้ให้บริการคลังสินค้า 2 กลุ่ม คือ แบรนด์ที่บริหารคลังสินค้าของตัวเอง และผู้ให้บริการ 3PL ที่รับเก็บและจัดส่งสินค้าให้ owner หลายราย ปัจจุบันผู้ประกอบการเหล่านี้ใช้ JST [ASSUMPTION: JST ERP ระบบจัดการ order/inventory/คลังสินค้าในตลาดไทย] ซึ่งมีค่า license, ทำให้เกิด lock-in และไม่ครอบคลุม fulfillment cycle ทั้งหมด ตัวอย่างเช่น JST แยก parcel ตาม carrier แล้วจบแค่นั้น ไม่มีสถานะการ sort ก่อน handover และไม่สามารถ hold order ที่ถูกยกเลิกไว้เพื่อรอ return ได้

เดิมพันของ Zimple Fulfillment คือ ระบบที่ทันสมัย ใช้งานง่ายกว่า และครอบคลุม fulfillment cycle ทั้งหมด จะดึงลูกค้าออกจาก JST ได้ การส่งมอบแบ่งเป็น phase:
- **Phase 1** ทำ WMS core ให้เทียบเท่า JST (JST parity) เพื่อให้คลังสินค้าของบริษัทเองเลิกใช้ JST ได้
- **Phase 2** เพิ่มฟีเจอร์ multi-owner สำหรับ 3PL ได้แก่ Client Portal, billing แยกตาม owner และ claims
- **ภายหลัง** ขยายความสามารถไปนอกเหนือ WMS

เป้าหมายคือครองส่วนแบ่ง 50% ของคลังสินค้าที่ใช้ JST อยู่ ปัจจุบันตัวผลิตภัณฑ์มีแค่ design mockup ประมาณ 170 หน้า ยังไม่มีส่วนไหนถูก build เอกสาร brief นี้เป็น input ของ PRD ที่ทีม build จะใช้ทำงานต่อ

## ปัญหา (The Problem)

ผู้ให้บริการคลังสินค้าที่ดูแลร้านค้าบน Shopee, Lazada และ TikTok Shop ต้องรับมือกับงานปริมาณสูงและผันผวน ประมาณ 30,000 order/วัน ต่อคลัง และพุ่งสูงในวันแคมเปญอย่าง 11.11 ระบบที่ใช้อยู่ทุกวันนี้คือ JST ซึ่งสร้างปัญหา 3 ด้าน:

- **ต้นทุนและ lock-in** ผู้ประกอบการต้องจ่ายค่า license ของ JST และไม่สามารถย้ายออกหรือต่อยอดระบบได้ง่าย *[Open: ยังไม่ได้วัดตัวเลขค่า license และเหตุการณ์ lock-in ที่เป็นรูปธรรม]*
- **ช่องโหว่ใน flow** handover จบแค่ "scan แล้วแยกตาม carrier" ไม่มีสถานะการ sort ก่อน handover, hold order ที่ถูกยกเลิกไว้เพื่อรอ return ไม่ได้ งานที่ระบบไม่รองรับก็ต้องไปทำ manual workaround [ASSUMPTION: Excel, LINE, กระดาษ]
- **UX ล้าสมัยและใช้ยาก** พนักงานหน้างานและผู้ใช้ฝั่งออฟฟิศทำงานบน interface ที่เรียนรู้ช้าและใช้งานไม่สะดวก [ASSUMPTION: ยังไม่ได้รวบรวมกรณี UX failure ที่เฉพาะเจาะจง]

## แนวทางแก้ไข (The Solution)

ระบบเดียวที่ทันสมัยครอบคลุม fulfillment cycle ทั้งหมด Phase 1 ส่งมอบ warehouse core บน 3 surface:

- **Warehouse web** สำหรับ supervisor, CS, ฝ่ายบัญชี, ฝ่ายจัดซื้อ และ admin
- **หน้าจอ PDA** สำหรับงานหน้างานทุกงาน: receive, putaway, pick, sort, pack, handover, count, return
- **Packing station และ handover station** ที่ผูกกับเครื่องพิมพ์และเครื่องชั่ง

Core flow มี 6 ขั้นตอน:
1. **Inbound:** ASN → receive → VAS → suggested putaway
2. **Orders:** auto-import จาก marketplace
3. **Picking:** FIFO/FEFO, wave และ batch
4. **Packing:** scan check, แนะนำขนาดกล่อง, ชั่งน้ำหนัก, พิมพ์ label
5. **Handover:** sort ตาม carrier, manifest ที่มีลายเซ็น
6. **Returns:** ตรวจสอบพร้อมถ่ายรูป → restock หรือรายงาน

รอบ ๆ core มี inventory, products และ packing materials นอกจากนี้ mockup ยังครอบคลุม Client Portal, driver app พร้อม proof of delivery, floor dashboard แบบ TV mode และ module สำหรับ claims, purchasing, planning, transport และ billing แยกตาม owner ซึ่งจะมาใน Phase 2 หรือภายหลัง (ดู Scope)

## จุดที่แตกต่าง (What Makes This Different)

- **UX ทันสมัยและใช้ง่าย** นี่คือคำมั่นหลักที่ใช้สู้กับ JST ผู้ใช้ควรรู้สึกว่าทันสมัยกว่า สวยกว่า และใช้ง่ายกว่า JST
- **End-to-end (Phase 2 เป็นต้นไป)** ระบบเดียวครอบคลุม WMS, transport management system (TMS) พื้นฐาน, purchasing, workforce planning, claims และ 3PL billing ขณะที่ JST และ WMS ทั่วไปหยุดก่อนหน้านั้น
- **ออกแบบมาเพื่อ 3PL แบบ multi-owner (Phase 2)** owner แต่ละรายมี rule และ rate ของตัวเอง ทุก activity สร้าง charge line และ charge line ทั้งหมดรวมเป็นบิลเดียวต่อ owner ค่าชดเชยจาก claim ที่เป็นความผิดของคลังจะถูกหักจากบิลนั้น owner กับคลังส่ง request หากันในระบบแทนการคุยผ่านแชท
- **อุดช่องโหว่ที่รู้อยู่แล้วของ JST** (ดู The Problem) ตั้งแต่ Phase 1

ไม่มี technical moat ความได้เปรียบมาจาก UX และความครอบคลุม ซึ่งจะเกิดขึ้นได้ก็ต่อเมื่อส่งมอบได้เร็วและผลิตภัณฑ์เชื่อถือได้ที่ 30,000 order/วัน ต่อคลัง ราคาวางแผนให้ใช้โครงสร้างเดียวกับ JST (license บวกค่าธรรมเนียมอื่น) ดังนั้นต้นทุนไม่ใช่เหตุผลที่ลูกค้าจะย้าย UX และ end-to-end coverage ต้องปิดดีลได้ด้วยตัวเอง ใน Phase 1 หมายถึงต้องพึ่ง UX และการแก้ JST gap เท่านั้น

## กลุ่มเป้าหมาย (Who This Serves)

- **ผู้ซื้อ (2 segment):**
  1. Brand owner ที่บริหารคลังสินค้าของตัวเอง
  2. ผู้ให้บริการคลังสินค้า 3PL ที่มี owner หลายราย
- **ผู้ใช้ประจำวัน:**
  - Warehouse supervisor, พนักงานหน้างานที่ใช้ PDA, operator ประจำ packing station และ handover station, CS, ฝ่ายบัญชี และ admin
  - ฝั่ง 3PL: พนักงานของ owner ที่ใช้ Client Portal
  - คนขับรถ (driver)

**Segment 1 (brand owner ที่มีคลังของตัวเอง) มาก่อน 3PL มาทีหลัง** pilot รันที่คลังสินค้าของบริษัทเอง ฟีเจอร์ multi-owner อย่าง Client Portal, rate แยกตาม owner และ 3PL billing สำคัญกับ segment 2 เป็นหลัก จึงเลื่อนไป Phase 2 (ดู Scope)

## เกณฑ์ความสำเร็จ (Success Criteria)

- **เป้าหมายธุรกิจหลัก:** ครอง 50% ของคลังสินค้าที่ใช้ JST อยู่ในปัจจุบัน *[Open: จำนวน baseline ของคลังที่ใช้ JST และ deadline]*
- **Pilot:** คลังสินค้าของบริษัทเองรันบน Zimple Fulfillment เต็มรูปแบบและเลิกใช้ JST
- **Migration:** ลูกค้าย้ายออกจาก JST ทีละคลังโดยไม่กระทบการดำเนินงาน
- **Operational** [ASSUMPTION]:
  - รองรับ 30,000 order/วัน ต่อคลัง และ peak ช่วง 11.11 ได้
  - ความแม่นยำของ stock และ order เท่ากับหรือดีกว่า JST
  - เวลาฝึกพนักงานหน้างานใหม่น้อยกว่าบน JST
  - Request จาก owner จัดการในระบบแทนการคุยผ่านแชท (Phase 2)

## ขอบเขต (Scope)

ส่งมอบเป็น phase **Phase 1 มีเกณฑ์ตายตัวข้อเดียว: คลังสินค้าของบริษัทเองต้องเลิกใช้ JST ได้อย่างสมบูรณ์**

**Phase 1 (2 เดือน, ทีมเล็ก), WMS core ที่เทียบเท่า JST:**
- **Core flow:** inbound → orders → picking → packing → handover → returns บน warehouse web, หน้าจอ PDA, packing station และ handover station
- **Inventory และ products:** location, lot/expiry, count, move
- **Integration:** import order จาก marketplace (Shopee, Lazada และ TikTok Shop) และ carrier (Flash, Kerry และ J&T)
- **แก้ JST gap ที่รู้อยู่แล้ว:** สถานะ sort ก่อน handover และการ hold order ที่ถูกยกเลิกไว้เพื่อรอ return
- **Migration tooling** สำหรับย้ายคลังหนึ่งแห่งออกจาก JST
- ทุกอย่างที่ JST ทำอยู่ทุกวันนี้และคลัง pilot พึ่งพาอยู่ *[Open: ยังไม่มี JST feature checklist ถ้าไม่มี checklist นี้ จะ verify เกณฑ์ parity ไม่ได้]*

**Phase 2, multi-owner สำหรับ 3PL:** Client Portal, rule และ rate card แยกตาม owner, billing และ claims cycle

**ภายหลัง, นอกเหนือ WMS:**
- TMS และ driver app
- Purchasing และ workforce planning
- TV mode
- เครื่องมือ customization จาก mockup: brand theme tool และ drag-and-drop document template designer

## ความเสี่ยงหลัก: Timeline ของ Phase 1

Phase 1 ค่อนข้างตึงสำหรับทีมเล็กใน 2 เดือน นอกเหนือจากทุกอย่างใน Phase 1 scope แล้ว ระบบยังต้องพร้อมรับ load 30,000 order/วัน ต่อคลัง

มี 2 อย่างที่ช่วยปกป้องกำหนดการ อย่างแรก ทำ **JST parity checklist** ตั้งแต่เนิ่น ๆ เพื่อนิยามว่าอะไรคือ "done" และกันไม่ให้งานนอก parity เล็ดลอดเข้ามา อย่างที่สอง build **station และ integration** ก่อน เพราะเป็นส่วนที่มีความเสี่ยงทางเทคนิคสูงที่สุด

## คำถามที่ยังเปิดอยู่ (Open Questions)

- ยืนยันว่า JST = JST ERP และวัดตัวเลขค่า license กับความเจ็บปวดจาก lock-in
- ปัจจุบันมีกี่คลังที่ใช้ JST (baseline ของเป้า 50%) และต้องบรรลุเป้าภายในเมื่อไร
- ทำ JST feature parity checklist จากการใช้งาน JST จริงของคลัง pilot
- ราคาสุดท้าย ปัจจุบันตั้งใจใช้โครงสร้าง license บวกค่าธรรมเนียมแบบเดียวกับ JST

## วิสัยทัศน์ (Vision)

Zimple Fulfillment จะกลายเป็น fulfillment platform มาตรฐานของคลังสินค้า e-commerce ในไทย ผู้ประกอบการจะบริหารงานทั้งหมด (คลังสินค้า, ขนส่ง, พนักงาน และ billing) รวมถึงความสัมพันธ์กับ owner ได้ในระบบเดียวที่ทันสมัย แทนที่จะใช้ JST ควบคู่กับเครื่องมือเสริมอื่น ๆ
