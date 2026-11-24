# Empty States

**Status:** `Trial`

## Structure

1. Heading: why the area is empty
2. Supporting line: what the user gains or what to do next
3. Illustration, only when it helps, with `alt=""` (see [Accessibility](Accessibility.md))
4. One primary action, at most one secondary action

The empty state owns its area. Centre it in the space it replaces, do not pin a small block under the header.

## Two different cases

Never reuse one message for both cases.

| Case | Cause | Copy must | Example |
| :--- | :--- | :--- | :--- |
| No data yet | Nothing has been created | Say what will appear here and give the first action | ยังไม่มีรอบการหยิบวันนี้ สร้างรอบการหยิบเพื่อเริ่มงาน |
| No results | Search or filter hides everything | Name the filter and offer a way out | ไม่พบออเดอร์ที่ตรงกับตัวกรอง ลองล้างตัวกรองหรือเปลี่ยนช่วงวันที่ |
| Work finished | The queue is cleared | Confirm calmly and point to the next task | หยิบสินค้าครบทุกรายการในรอบนี้แล้ว สแกนรอบการหยิบถัดไปได้เลย |

## Rules

- Never a bare label such as ไม่มีสินค้า with no way forward.
- No words that make a new user feel they failed.
- The primary button names the result: สร้างรอบการหยิบ, ล้างตัวกรอง.
- Use ICU `=0` for zero-count copy. See [Localization Keys](LocalizationKeys.md).
