# Error Messages

**Status:** `Trial`

## Structure

`[what happened] + [what to do next]`, two sentences at most. Never show technical codes or internal names (Vale rule: `WMS.TechErrorCodes`). Never blame the user.

## Examples

| Situation | Do | Don't |
| :--- | :--- | :--- |
| Scanned the wrong bin during putaway | ช่องเก็บสินค้านี้ไม่ตรงกับงาน สแกนช่อง A-03-12 แทน | `Invalid bin token` |
| Bin is full | ช่องเก็บสินค้าเต็ม กด "ช่องเก็บเต็ม" เพื่อรับช่องสำรอง | `Error 500` |
| Short pick | สินค้าในช่องมีไม่พอ ระบุจำนวนที่หยิบได้จริงแล้วกด "ยืนยันสินค้าขาด" | คุณหยิบผิด |
