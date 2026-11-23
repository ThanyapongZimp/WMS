---
title: "Sprint Change Proposal: ผังคลัง (Warehouse Layout Map)"
date: 2026-11-23
status: approved
approved_by: Thanyapong
approved_on: 2026-11-23
mode: batch
scope: Moderate
requested_by: Thanyapong
---

# Sprint Change Proposal: ผังคลัง (Warehouse Layout Map)

## 1. สรุปประเด็น

**สิ่งที่เปลี่ยน:** เพิ่ม "ผังคลัง" เข้าไปใน Phase 1 เป็นตัววาดผังแบบเต็มรูปแบบ และใช้ผังที่วาดนี้คำนวณเส้นทางหยิบตอนหยิบสินค้า นอกจากนี้ให้ตัววาดผังเข้า Pilot Wave 1 ด้วย

**ประเภท:** New requirement emerged from stakeholders (ผู้ใช้ตัดสินใจเมื่อ 2026-11-23)

**ที่มา:**
- Feature inventory ต้นฉบับมีผังคลัง 2 feature:
  - "ผังคลัง" (ดูสต็อก): แผนที่คลังแบบภาพ เห็นความหนาแน่นแต่ละโซนและชั้นวาง (`inventory-layout`)
  - "ออกแบบผังคลัง": วาดชั้นวางและทางเดิน ผูก location แล้วใช้ทั้งแสดงผังและเรียงเส้นทางหยิบ (`settings-storage-layout`) [extract-feature-inventory.md:141, 293]
- ตอนเขียน PRD ทั้งสองถูกย้ายไป Later ด้วยกฎ JST-parity โดยติด `[ASSUMPTION]` ไว้ (prd.md §9.2, §12) และ "layout map editor" ถูกเขียนลงใน Non-Goals (prd.md §8)
- UX spec ตัด tab "④ ผังคลัง" ออกจาก settings ตามไปด้วย (reconcile-zimple-screens.md แถว 18)
- ผู้ใช้ทบทวนแล้วตัดสินใจว่า assumption ข้อนี้ไม่ถูก และต้องการผังคลังแบบเต็มใน Phase 1

**ผู้ใช้ตัดสินใจไว้แล้ว:**
1. ทำตัววาดผังแบบเต็ม ไม่ใช่ผังที่ระบบสร้างให้อัตโนมัติ
2. ใส่ใน Pilot Wave 1
3. ระบบหาเส้นทางหยิบจากผังทุกครั้งที่หยิบ ไม่ใช้วิธีให้ผังเขียนเลขลำดับเดินลง location
4. ผังแบบดูความหนาแน่นสต็อก (FR-126) ทำหลัง Epic 4 เพราะต้องมีข้อมูลสต็อกจาก ledger ก่อน

## 2. การวิเคราะห์ผลกระทบ

### 2.1 Checklist

| # | รายการ | สถานะ | ข้อสังเกต |
|---|---|---|---|
| 1.1 | Story ที่เป็นต้นเรื่อง | [x] | ไม่ได้มาจาก story ใด แต่เป็นการทบทวน scope ระหว่างวางแผน pilot (ยังไม่มี story ไหนเริ่มทำ) |
| 1.2 | ระบุปัญหา | [x] | การตัด layout map ด้วยกฎ JST-parity เป็น assumption ที่ผู้ใช้ไม่เห็นด้วย |
| 1.3 | หลักฐาน | [x] | feature inventory:141, 293 · prd.md:1365, 1393, 1493 · reconcile-zimple-screens.md:35 |
| 2.1 | Epic 2 ยังทำตามแผนเดิมได้ไหม | [!] | ได้ แต่ต้องเพิ่ม Story 2.13 และ 2.14 |
| 2.2 | การเปลี่ยนระดับ epic | [x] | ไม่ต้องสร้าง epic ใหม่ เพิ่ม story เข้า Epic 2, 4 และแก้ Epic 8 |
| 2.3 | ผลต่อ epic อื่น | [!] | Epic 8 ต้องเปลี่ยนวิธีเรียงจุดหยิบ (8.2, 8.6, 8.9, 8.12) · Epic 4 เพิ่ม 4.8 · Epic 5/6 ไม่กระทบ (putaway และนับสต็อกยังไม่ใช้เส้นทาง) |
| 2.4 | มี epic ที่ไม่จำเป็นแล้ว หรือต้องเพิ่ม epic ไหม | [N/A] | ไม่มี |
| 2.5 | ลำดับ epic | [x] | ไม่เปลี่ยน แต่ route engine (2.14) ต้องเสร็จก่อน Epic 8 |
| 3.1 | PRD | [!] | เพิ่ม FR-125 และ FR-126 · แก้ FR-8, FR-64, FR-67 · แก้ §8, §9.1, §9.2, §9.3, §12 |
| 3.2 | Architecture | [!] | ยังไม่มีเอกสาร · มี 3 เรื่องที่ต้องตัดสินใจและติดป้าย `[ARCH-PENDING]` (ดู 2.3) |
| 3.3 | UX | [!] | EXPERIENCE.md: nav tree และ component pattern · DESIGN.md: เพิ่ม layout canvas · pilot UI prototype |
| 3.4 | Artifact อื่น | [!] | pilot-wave-1-th.md · sprint-status.yaml |
| 4.1 | Option 1: Direct Adjustment | Viable | Effort: High · Risk: Medium |
| 4.2 | Option 2: Rollback | Not viable | ยังไม่มีงานที่ทำเสร็จให้ rollback |
| 4.3 | Option 3: MVP Review | Not viable | เป็นการเพิ่ม scope ไม่ใช่ลด scope |

### 2.2 ผลต่อ epic และ story

| Epic | การเปลี่ยน | เหตุผล |
|---|---|---|
| Epic 2 | **เพิ่ม Story 2.13** วาดผังคลังและผูก location · **เพิ่ม Story 2.14** route engine และ preview เส้นทาง | ใช้ข้อมูลคลัง โซน และ location จาก 2.1–2.2 จึงอยู่ใน epic เดียวกัน |
| Epic 4 | **เพิ่ม Story 4.8** ผังคลังแสดงความหนาแน่นสต็อก | ต้องใช้ข้อมูลสต็อกจาก 4.1–4.3 |
| Epic 8 | **แก้ Story 8.2, 8.6, 8.9, 8.12** | เรียงจุดหยิบด้วยระยะเดินจริงบนผัง แทนการใช้เลขลำดับเดิน |
| Epic 5, 6 | ไม่แก้ | putaway (5.10) และการนับ (6.5) ไม่ได้ใช้เส้นทาง จะใช้ route engine ในอนาคตได้แต่ไม่อยู่ใน scope นี้ |

**Dependency ใหม่:** Story 8.2 และ 8.6 ต้องรอ Story 2.14 เสร็จก่อน ถ้าคลังไม่มีผังที่ publish แล้ว หรือมี location ที่ยังไม่ได้ผูกกับผัง ระบบจะ **fallback ไปใช้เลขลำดับเดิน (walk sequence) เดิม** แบบนี้ Epic 8 จะไม่ถูก block ถ้าผังยังไม่พร้อม

### 2.3 ผลต่อ technical และ architecture

ยังไม่มี architecture doc ทั้ง 3 เรื่องนี้ต้องตัดสินใจใน `bmad-architecture`:

1. `[ARCH-PENDING]` **วิธี render ผัง:** ใช้ SVG ที่เขียนเอง หรือใช้ library canvas (เช่น Konva หรือ Fabric) ถ้าใช้ library จะเป็นการเพิ่ม dependency ใหม่ ซึ่งต้องขออนุมัติตามกติกาของ project
2. `[ARCH-PENDING]` **Data model ของผัง:** ผัง 1 อันต่อคลัง มี version แบบ draft และ published · geometry ของแต่ละ element · การผูก slot กับ location · กราฟของทางเดิน · การเปลี่ยน schema นี้ต้องขออนุมัติตามกติกาของ project
3. `[ARCH-PENDING]` **ประสิทธิภาพของ route engine:** ต้องเรียงจุดหยิบตอนสร้างใบหยิบได้ทันในช่วง peak (30,000 orders/วัน ×3, NFR-1) · แนวทางที่เสนอคือ precompute ระยะทางระหว่างทุกคู่ slot ไว้ตอน publish ผัง แล้วตอนหยิบใช้ heuristic (nearest neighbour + 2-opt) กับตารางระยะทางนั้น

### 2.4 ผลต่อ timeline และความเสี่ยง

- PRD §9.2 เตือนไว้แล้วว่า scope ใหญ่สำหรับทีมเล็กใน 2 เดือน งานนี้เพิ่มอีก 2 FR และ 3 story ใหม่ และต้องแก้อีก 4 story
- Pilot Wave 1 เพิ่มจาก 9 เป็น 11 story และ 2 story ที่เพิ่มเป็นงานที่ยากที่สุดในชุด (canvas editor และ graph algorithm)
- **ความเสี่ยงที่ต้องจัดการ:** ถ้าเส้นทางที่ระบบคำนวณไม่ตรงกับการเดินจริงในคลัง จะกระทบความเร็วในการหยิบโดยตรง · ทางลดความเสี่ยง: มี preview เส้นทางก่อน publish (2.14) และมี fallback ไปใช้ walk sequence
- **ความเสี่ยงที่ลดลง:** route engine อยู่ใน pilot จึงได้ทดสอบกับผังของคลังจริงก่อน Epic 8

## 3. แนวทางที่เสนอ

**Option 1: Direct Adjustment** เพิ่ม story เข้า Epic 2 และ 4 แก้ Epic 8 โดยไม่สร้าง epic ใหม่

**เหตุผล:**
- ผังเป็นส่วนหนึ่งของ "Warehouse Setup" (§4.2) อยู่แล้ว จึงไม่ต้องสร้าง epic ใหม่
- แยก route engine (2.14) ออกจากตัววาดผัง (2.13) เพื่อให้ทดสอบ algorithm ได้ก่อน Epic 8 และให้ dev แบ่งงานกันได้
- fallback ไปใช้ walk sequence ทำให้ Epic 8 ส่งมอบได้แม้ผังยังไม่เสร็จหรือยังวาดไม่ครบ
- ยังเก็บ field walk sequence ไว้ใน FR-8 ทั้งเพื่อเป็น fallback และให้คลังที่ไม่อยากวาดผังใช้งานต่อได้

**ทางเลือกอื่นที่พิจารณาแล้ว:** ให้ผังเขียนเลขลำดับเดินลง location (Epic 8 ไม่ต้องแก้) ผู้ใช้ไม่เลือก เพราะต้องการให้ระบบคำนวณเส้นทางจากผังจริงทุกครั้ง

**ประมาณการ:** Effort High · Risk Medium · Pilot ยาวขึ้นราว 2 story ที่ยาก

## 4. รายละเอียดการแก้ไข

### 4.1 PRD (`prds/prd-WMS-2026-11-19/prd.md`)

**[P-1] §4.2: เพิ่ม FR-125 ต่อจาก FR-10**

```
NEW:
#### FR-125: Warehouse layout map editor
Admin can draw a warehouse layout to scale (zone areas, racks, aisles, walls and obstacles, doors and docks, pick start and end points, text labels), bind locations to rack slots, and publish it.

**Consequences:**
- One layout per warehouse, with a draft and a published version. Editing the draft never affects live work. Publishing applies to pick lists created afterwards; lists already created keep their stop order.
- Racks are drawn as rows of bays × levels. Locations bind to slots automatically by code pattern (for example aisle A, rows 01–12, levels 01–04) or one at a time. A location binds to at most one slot.
- Aisles form the walkable network. Every rack face must touch an aisle and every aisle must connect to a pick start point before publish.
- Publish validation blocks unreachable racks and a missing start point, and warns on pick and storage locations that are not bound (they fall back to walk sequence).
- Location status (disabled, locked for counting) shows on the layout.
- Every layout change and publish is recorded in the activity log (FR-107).
- Drawing doors does not turn on door assignment (FR-9 stays Defer).
```

**[P-2] §4.2: เพิ่ม FR-126 (หรือย้ายไปไว้ §4.6 Inventory Control)**

```
NEW:
#### FR-126: Layout map view
Warehouse Manager can view the published layout coloured by space used (m³ and kg against capacity) per location, rack and zone, and drill down from a slot to its stock.

**Consequences:**
- Filters include zone, location type and status.
- The map uses the same five status tones only for status; occupancy uses a single sequential scale with a legend.
```

**[P-3] FR-8: แก้ Consequence ข้อแรก**

```
OLD:
- A location has one of 8 types, a zone, a walk sequence, a sellable flag, a capacity (m³ and kg) and a mixing policy.
NEW:
- A location has one of 8 types, a zone, a walk sequence, a sellable flag, a capacity (m³ and kg) and a mixing policy.
- The walk sequence is the fallback stop order for locations not bound to a published layout (FR-125).
```

**[P-4] FR-64: แก้ลำดับการเลือก**

```
OLD:
System can allocate lot and location when the list is created: FEFO → pick location before storage → fewest stops → slots emptied exactly.
NEW:
System can allocate lot and location when the list is created: FEFO → pick location before storage → fewest stops → shortest walking distance on the published layout → slots emptied exactly.
```

**[P-5] FR-67: แก้ข้อความหลัก และเพิ่ม Consequence**

```
OLD:
Picker can execute a pick list on a PDA along a snake route, scanning the cart or tote, the location and the items.
NEW:
Picker can execute a pick list on a PDA along a route computed from the published layout (FR-125), scanning the cart or tote, the location and the items.

ADD Consequence:
- The route starts at the list's pick start point and orders stops by shortest walking distance. Stops on locations not bound to the layout follow walk sequence after the routed stops. With no published layout, all stops follow walk sequence.
```

**[P-6] §4.8 Description: แก้คำว่า "snake route"**

```
OLD: Pickers work on PDAs along a snake route, scanning as they go.
NEW: Pickers work on PDAs along a route computed from the warehouse layout, scanning as they go.
```
(UJ-2 บรรทัด 80 "follows a snake route" → "follows the route on her PDA")

**[P-7] §8 Non-Goals**

```
OLD: - **Not a customization platform.** No theme tool, document template designer, layout map editor or TV mode.
NEW: - **Not a customization platform.** No theme tool, document template designer or TV mode.
```

**[P-8] §9.1 In Scope: เพิ่มในข้อ Setup**

```
OLD: - **Setup:** warehouse, zones, locations, containers, devices and stations, rules and precedence, pickup rounds, numbering, calendar.
NEW: - **Setup:** warehouse, zones, locations, layout map and pick routing, containers, devices and stations, rules and precedence, pickup rounds, numbering, calendar.
```

**[P-9] §9.2 Out of Scope**

```
OLD: - **Unassigned features, resolved to Later by the JST-parity rule** `[ASSUMPTION]`: layout map, temperature log, inter-warehouse transfer.
NEW: - **Unassigned features, resolved to Later by the JST-parity rule** `[ASSUMPTION]`: temperature log, inter-warehouse transfer. (Layout map moved into Phase 1 by decision on 2026-11-23, see FR-125/126.)
```
และแก้ `[NOTE FOR PM]` จาก "124 FRs" เป็น "126 FRs"

**[P-10] §9.3 Priority tiers**
- เพิ่ม **FR-125** ใน **Must** (อยู่ใน Pilot Wave 1)
- เพิ่ม **FR-126** ใน **Should**

**[P-11] §12 Assumptions Index:** แก้ "§9.2 — Layout map, temperature log and inter-warehouse transfers move to Later by the JST-parity rule." เป็น "§9.2 — Temperature log and inter-warehouse transfers move to Later by the JST-parity rule."

**[P-12] §7.1 Risks:** แก้แถว "Scope (124 FRs)" เป็น "Scope (126 FRs)" และเพิ่มหมายเหตุในหัว PRD ว่า "Updated 2026-11-23: FR-125/126 added per sprint-change-proposal-2026-11-23" (PRD ไม่มี change log จึงใส่ไว้ที่หัวเอกสาร)

### 4.2 Epics (`epics.md`)

**[E-1] Requirements Inventory:** เพิ่ม FR-125 `[Must]` และ FR-126 `[Should]` ต่อจาก FR-10 · แก้ FR-8, FR-64, FR-67 ให้ตรงกับ P-3 ถึง P-5

**[E-2] Additional Requirements:** เพิ่ม 3 รายการ `[ARCH-PENDING]` ตามข้อ 2.3

**[E-3] FR Coverage Map:** เพิ่มแถว `| FR-125 | Epic 2 | Layout editor, binding, route engine |` และ `| FR-126 | Epic 4 | Layout map view with occupancy |`

**[E-4] Epic List:** Epic 2 "FRs covered" เพิ่ม FR-125 · Epic 4 เพิ่ม FR-126 · คำอธิบาย Epic 2 เพิ่ม "draw the warehouse layout that drives pick routes"

**[E-5] เพิ่ม Story 2.13** (ต่อจาก 2.12)

```
### Story 2.13: Warehouse Layout Editor and Location Binding

As an admin,
I want to draw my warehouse to scale and bind every location to its place on the drawing,
So that the system knows where each location physically is.

**Acceptance Criteria:**

**Given** ตั้งค่าคลัง › คลังและตำแหน่ง › ผังคลัง
**When** an admin opens the editor for a warehouse
**Then** a scaled canvas (metres, grid snap) shows the draft layout with tools for zone area, rack, aisle, wall/obstacle, door/dock, pick start/end point and text label, plus select, move, rotate, resize, duplicate, delete, undo/redo, zoom and pan (FR-125)

**Given** the rack tool
**When** the admin draws a rack and sets bays × levels and its facing side
**Then** the rack shows its slots and can be bound automatically by code pattern (prefix, row range, level range) or slot by slot; a location binds to at most one slot and the binding is shown on both the slot and the location record (FR-125, FR-8)

**Given** locations in the warehouse
**When** the admin opens the binding panel
**Then** it lists unbound pick and storage locations with a count, filters by zone and type, and binding from the list highlights the slot on the canvas (FR-125)

**Given** a disabled or locked-for-counting location
**When** it is bound
**Then** its slot shows the status tone and icon (FR-8, UX-DR10)

**Given** the draft
**When** the admin publishes it
**Then** validation blocks racks whose face does not touch an aisle, aisles not connected to a pick start point and a missing start point; it warns with the count of unbound pick/storage locations that will fall back to walk sequence; on success the version number increases and the publish is logged (FR-125, FR-107)

**Given** a published layout and pick lists already created
**When** a new version is published
**Then** existing lists keep their stop order and only lists created afterwards use the new layout (FR-125)

**Given** the editor on a screen narrower than 1280px or a user without edit permission
**When** the page opens
**Then** the layout is read-only with zoom and pan, and the binding panel stays available as a keyboard-accessible list alternative to the canvas (UX-DR46, UX-DR42)
```

**[E-6] เพิ่ม Story 2.14**

```
### Story 2.14: Layout Route Engine and Route Preview

As an admin,
I want the system to compute walking routes on the published layout and let me preview them,
So that I can trust the pick order before pickers follow it.

**Acceptance Criteria:**

**Given** a layout is published
**When** publish completes
**Then** the walkable network (aisles, start/end points, rack faces) is built and walking distances between all bound slots and start/end points are precomputed for that version `[ARCH-PENDING: precompute approach]` (FR-125)

**Given** a set of locations and a start point
**When** the route service is called
**Then** it returns the stops in shortest-walk order using the precomputed distances, with total distance in metres; unbound locations are appended in walk-sequence order; with no published layout all stops follow walk sequence (FR-67, FR-8)

**Given** peak load
**When** pick lists are created
**Then** route ordering adds no more than an agreed latency per list `[ARCH-PENDING: target]` (NFR-1)

**Given** ผังคลัง › ทดสอบเส้นทาง
**When** the admin picks sample locations (or a sample of real pending order lines once Epic 7 exists)
**Then** the canvas draws the route with numbered stops, total distance and the comparison to walk-sequence order (FR-125)
```

**[E-7] เพิ่ม Story 4.8**

```
### Story 4.8: Layout Map with Occupancy

As a Warehouse Manager,
I want to see the published layout coloured by space used,
So that I can plan space and putaway at a glance.

**Acceptance Criteria:**

**Given** สินค้าคงคลัง › ผังคลัง and a published layout
**When** the map renders
**Then** each bound slot is coloured on one sequential scale by m³ or kg used against capacity, with a legend and values on hover/focus; racks and zones show their totals (FR-126)

**Given** a slot
**When** the user selects it
**Then** a panel shows the location's stock by SKU and lot with a link to the stock-by-location view (FR-126, FR-40)

**Given** filters for zone, location type and status
**When** applied
**Then** non-matching slots dim, and status (disabled, locked for counting) uses the status map with icon + label (FR-126, UX-DR10)
```

**[E-8] แก้ Story 8.2: AC ข้อแรก**

```
OLD: **Then** the earliest-expiry lot is chosen first, then pick location before storage, then fewest stops, then slots emptied exactly (FR-52, FR-64)
NEW: **Then** the earliest-expiry lot is chosen first, then pick location before storage, then fewest stops, then shortest walking distance on the published layout (Story 2.14), then slots emptied exactly (FR-52, FR-64)
```

**[E-9] แก้ Story 8.6**

```
OLD title: Story 8.6: Pick on a PDA along a snake route
NEW title: Story 8.6: Pick on a PDA along the layout route
(sprint-status key: 8-6-pick-on-a-pda-along-the-layout-route)

OLD: I want to execute a pick list on my PDA by scanning cart, location and items along a snake route,
NEW: I want to execute a pick list on my PDA by scanning cart, location and items along the route computed from the warehouse layout,

OLD: **Then** the location callout shows the location and "จุดที่ n/N · x/y ชิ้น"; stops follow walk sequence (FR-67, UX-DR37)
NEW: **Then** the location callout shows the location and "จุดที่ n/N · x/y ชิ้น"; stops follow the layout route from the list's start point, with unbound locations after them in walk sequence (FR-67, Story 2.14, UX-DR37)
```

**[E-10] แก้ Story 8.9: เพิ่ม AC**

```
ADD:
**Given** a line deferred with "ทำต่อภายหลัง" or flipped back to "หยิบได้" after replenishment
**When** the picker continues
**Then** the remaining stops are re-ordered from the picker's current location on the layout route (FR-70, Story 2.14)
```

**[E-11] แก้ Story 8.12: เพิ่ม AC**

```
ADD:
**Given** a printed pick sheet
**When** it prints
**Then** lines appear in the same layout-route order as on the PDA (FR-122, FR-67)
```

### 4.3 UX

**[U-1] EXPERIENCE.md › Office web navigation tree**

```
OLD:
สินค้าคงคลัง   ภาพรวม · ยอดคงคลัง · ความเคลื่อนไหว · ตรวจนับ · ...
                · ตั้งค่าคลัง › (คลังและตำแหน่ง · อุปกรณ์และสถานี · ...)
NEW:
สินค้าคงคลัง   ภาพรวม · ยอดคงคลัง · ผังคลัง · ความเคลื่อนไหว · ตรวจนับ · ...
                · ตั้งค่าคลัง › (คลังและตำแหน่ง [คลังและโซน | ตำแหน่ง | ภาชนะ | ผังคลัง] · อุปกรณ์และสถานี · ...)
```

**[U-2] EXPERIENCE.md › Component Patterns (Office web):** เพิ่ม "Layout editor" ดังนี้
- **Interaction:** เลือก tool ด้วยปุ่มหรือคีย์ลัด (V เลือก · R ชั้นวาง · A ทางเดิน · Z โซน · W ผนัง · D ประตู · S จุดเริ่ม) · undo/redo ด้วย Ctrl+Z / Ctrl+Shift+Z · Delete ลบ · ลูกศรขยับทีละ grid · Shift+ลูกศรขยับทีละ 1 เมตร
- **Draft/publish:** แถบสถานะบอก "แบบร่าง · แก้ล่าสุด HH:MM" กับ "ใช้งานอยู่ v{n}" · ปุ่ม publish เปิดผลตรวจก่อนเผยแพร่ (ปิดกั้น / เตือน)
- **Accessibility:** canvas มี binding list ที่ใช้งานด้วย keyboard ได้ครบเป็นทางเลือก · ทุก element เลือกได้จาก list · route preview มีลำดับจุดเป็นข้อความ

**[U-3] DESIGN.md › Components (Office web):** เพิ่ม "Layout canvas" ดังนี้
- canvas สี `background` มี grid 1 เมตรเป็นเส้น `border` · rack สี `card` ขอบ `input` และ slot ที่ผูกแล้วใช้ `accent` · โซนเป็นพื้นที่โปร่ง โดยแต่ละโซนใช้สี `chart-1…5` ที่ความทึบ 8% และขอบ 1px · ทางเดินสี `muted` · เส้นทาง preview สี `primary` หนา 3px พร้อมเลขจุดแบบ `rounded.full`
- occupancy (FR-126) ใช้ sequential scale สีเดียวจาก `accent` ไปถึง `primary` และไม่ใช้ status tone

**[U-4] reconcile-zimple-screens.md แถว 18:** เพิ่มหมายเหตุ "④ ผังคลัง restored 2026-11-23 as a section of คลังและตำแหน่ง"

### 4.4 Pilot และ tracking

**[T-1] `pilot/pilot-wave-1-th.md`:**
- ตาราง scope เพิ่มลำดับ 10 = Story 2.13 และลำดับ 11 = Story 2.14 ("9 story" → "11 story")
- เพิ่ม AC ภาษาไทยของ 2.13 และ 2.14 ตาม E-5 และ E-6
- เพิ่มการตัดสินใจ D-4 ว่าด้วย render library และ D-5 ว่าด้วย data model และ route precompute ทั้งสองข้อเป็น `[ARCH-PENDING]`
- แก้ demo flow ใน Definition of Done ให้รวม "วาดผัง → ผูก location → publish → ทดสอบเส้นทาง"
- ย้ายข้อ "Story 2.4 เป็นต้นไป" ใน "ไม่อยู่ใน pilot" ให้เป็น "2.4–2.12"

**[T-2] `implementation-artifacts/sprint-status.yaml`:**
```
ADD under epic-2:  2-13-warehouse-layout-editor-and-location-binding: backlog
                   2-14-layout-route-engine-and-route-preview: backlog
ADD under epic-4:  4-8-layout-map-with-occupancy: backlog
RENAME:            8-6-pick-on-a-pda-along-a-snake-route → 8-6-pick-on-a-pda-along-the-layout-route
```

**[T-3] UI prototype (`pilot/ui/`):** เพิ่มหน้า `layout.html` ซึ่งเป็นตัววาดผัง มี binding panel, publish พร้อมผลตรวจ และ route preview · เพิ่มส่วน "ผังคลัง" ใน segmented control ของ settings · อัปเดต index.html

## 5. การส่งต่อ (Implementation Handoff)

**ระดับการเปลี่ยน: Moderate** เป็นการเพิ่ม scope และจัด backlog ใหม่ แต่ไม่ต้องวางแผนใหม่ทั้งหมด

| บทบาท | งาน |
|---|---|
| PM (John) / ผู้ใช้ | ยืนยันว่าเพิ่ม scope นี้ได้แม้มีความเสี่ยงเรื่อง timeline และยืนยัน tier ของ FR-125 (Must) และ FR-126 (Should) |
| Architect (Winston) | ตัดสินใจ 3 เรื่องที่เป็น `[ARCH-PENDING]` ใน `bmad-architecture` ก่อน Story 2.13 และ 2.14 ขึ้น ready-for-dev |
| Developer (ตาม proposal นี้) | แก้ PRD, epics, UX, pilot, sprint-status ตามข้อ 4 แล้วสร้าง UI prototype ผังคลัง |
| ทีม pilot | ใช้ผังของคลังบางเขนจริงทดสอบ route preview (2.14) ก่อนเริ่ม Epic 8 |

**เกณฑ์ความสำเร็จ:**
- FR-125 และ FR-126 อยู่ใน PRD และอ้างถึงได้จาก epics (coverage map ครบ)
- sprint-status มี key ใหม่ครบ และ key ของ 8.6 เปลี่ยนชื่อแล้ว
- Pilot Wave 1 มี 11 story และ demo ได้ตั้งแต่วาดผัง → ผูก location → publish → preview เส้นทาง
- Epic 8 ยังส่งมอบได้เมื่อไม่มีผัง (fallback ไปใช้ walk sequence)

## 6. บันทึกการอนุมัติและการดำเนินการ

- 2026-11-23 · Thanyapong อนุมัติ (yes)
- แก้แล้ว: prd.md (P-1–P-12), epics.md (E-1–E-11), EXPERIENCE.md, DESIGN.md, reconcile-zimple-screens.md (U-1–U-4), pilot-wave-1-th.md (T-1), sprint-status.yaml (T-2)
- UI prototype (T-3): เสร็จแล้ว · `pilot/ui/layout.html` และอัปเดต index.html กับ assets/zwms.js (เพิ่มเมนู ผังคลัง)
- ค้าง: 3 รายการ `[ARCH-PENDING]` รอ `bmad-architecture` ก่อน Story 2.13/2.14 ขึ้น ready-for-dev
