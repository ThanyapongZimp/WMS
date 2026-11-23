---
title: "Product Brief: Zimple Fulfillment"
status: final
created: 2026-11-19
updated: 2026-11-19
---

# Product Brief: Zimple Fulfillment

## Executive Summary

Zimple Fulfillment is a warehouse management system (WMS) for Thai e-commerce fulfillment. It is sold to two kinds of warehouse operators: brands that run their own warehouse, and 3PL providers that store and ship goods for many owners. Today these operators run on JST [ASSUMPTION: JST ERP, the Thai-market order/inventory/warehouse system]. JST costs a license fee, locks operators in, and stops short of the full fulfillment cycle. For example, it sorts parcels by carrier and stops there, with no pre-handover sort status and no way to hold cancelled orders for return.

Zimple Fulfillment's bet is that a modern, easier-to-use system covering the whole fulfillment cycle will pull customers away from JST. Delivery is phased:
- **Phase 1** brings the WMS core to JST parity, so the company's own warehouse can leave JST.
- **Phase 2** adds multi-owner features for 3PLs: the Client Portal, per-owner billing and claims.
- **Later**, capabilities beyond the WMS.

The goal is to win 50% of the warehouses running JST. The product exists today as roughly 170 design mockups, and nothing is built yet. This brief is the input to the PRD that the build team will work from.

## The Problem

Warehouse operators serving Shopee, Lazada, and TikTok Shop sellers run high-volume, spiky operations: about 30,000 orders/day per warehouse, peaking on campaign days like 11.11. JST is the system they run on today, and it hurts them in three ways:

- **Cost and lock-in.** Operators pay a JST license and cannot easily leave or extend the system. *[Open: license cost and concrete lock-in incidents not yet quantified.]*
- **Gaps in the flow.** Handover ends at "scan and split by carrier", with no sorting status before handover. Cancelled orders cannot be held for return. Work that falls outside the system moves to manual workarounds [ASSUMPTION: Excel, LINE, paper].
- **Dated, hard-to-use UX.** Floor staff and office users work in an interface that is slow to learn and unpleasant to use [ASSUMPTION: no specific UX failure cases collected yet].

## The Solution

One modern system covers the full fulfillment cycle. Phase 1 delivers the warehouse core on three surfaces:

- **Warehouse web** for supervisors, CS, accounting, purchasing, and admins.
- **PDA screens** for every floor task: receive, putaway, pick, sort, pack, handover, count, return.
- **Packing and handover stations** bound to printers and scales.

The core flow has six stages:
1. **Inbound:** ASN → receive → VAS → suggested putaway.
2. **Orders:** marketplace auto-import.
3. **Picking:** FIFO/FEFO, waves and batches.
4. **Packing:** scan check, box suggestion, weigh, label.
5. **Handover:** sort to carrier, signed manifest.
6. **Returns:** inspect with photos → restock or report.

Around the core sit inventory, products, and packing materials. The mockups also cover a Client Portal, a driver app with proof of delivery, a TV-mode floor dashboard, and modules for claims, purchasing, planning, transport, and per-owner billing. These arrive in Phase 2 or later (see Scope).

## What Makes This Different

- **Modern, easy UX.** This is the headline promise against JST. Users should find it more modern, more attractive, and simpler to use than JST.
- **End-to-end (Phase 2 and later).** One system covers the WMS, a basic transport management system (TMS), purchasing, workforce planning, claims, and 3PL billing. JST and typical WMSs stop earlier.
- **Built for multi-owner 3PL (Phase 2).** Each owner has its own rules and rates. Every activity creates a charge line, and charge lines roll up into one bill per owner. Compensation for warehouse-fault claims is deducted from that bill. Owners and the warehouse exchange requests in the system instead of in chat.
- **Fills JST's known gaps** (see The Problem), from Phase 1.

There is no technical moat. The advantage is UX and breadth, and it holds only if delivery is fast and the product is reliable at 30,000 orders/day per warehouse. Pricing is planned to mirror JST's structure (license plus other fees), so cost is not the reason to switch. UX and end-to-end coverage have to win the deal on their own. In Phase 1, that means UX and the JST-gap fixes alone.

## Who This Serves

- **Buyers (two segments):**
  1. Brand owners running their own warehouse.
  2. 3PL warehouse service providers with many owners.
- **Daily users:**
  - Warehouse supervisors, floor staff on PDAs, packing and handover station operators, CS, accounting, and admins.
  - On the 3PL side: owners' staff using the Client Portal.
  - Drivers.

**Segment 1 (brand owners with their own warehouse) comes first; 3PLs come second.** The pilot runs at the company's own warehouse. Multi-owner features such as the Client Portal, per-owner rates, and 3PL billing matter mainly to segment 2, so they are deferred to Phase 2 (see Scope).

## Success Criteria

- **Primary business goal:** win 50% of the warehouses currently running JST. *[Open: the baseline count of JST warehouses and the deadline.]*
- **Pilot:** the company's own warehouse runs fully on Zimple Fulfillment and stops using JST.
- **Migration:** customers move off JST one warehouse at a time without disrupting operations.
- **Operational** [ASSUMPTION]:
  - Sustains 30,000 orders/day per warehouse and 11.11 peaks.
  - Stock and order accuracy at or above JST levels.
  - Training time for new floor staff is lower than on JST.
  - Owner requests handled in-system instead of in chat (Phase 2).

## Scope

Delivery is phased. **Phase 1 has one hard bar: the company's own warehouse can switch off JST completely.**

**Phase 1 (2 months, small team), WMS core at JST parity:**
- **Core flow:** inbound → orders → picking → packing → handover → returns, on warehouse web, PDA screens, and packing and handover stations.
- **Inventory and products:** locations, lots/expiry, counts, moves.
- **Integrations:** marketplace order import (Shopee, Lazada, and TikTok Shop) and carriers (Flash, Kerry, and J&T).
- **Fixes for JST's known gaps:** a pre-handover sort status, and holding cancelled orders for return.
- **Migration tooling** to move one warehouse off JST.
- Everything JST does today that the pilot warehouse relies on. *[Open: no JST feature checklist exists yet. Without one, the parity bar cannot be verified.]*

**Phase 2, multi-owner for 3PLs:** the Client Portal, per-owner rules and rate cards, billing, and the claims cycle.

**Later, beyond the WMS:**
- TMS and the driver app.
- Purchasing and workforce planning.
- TV mode.
- Customization tools from the mockups: the brand theme tool and the drag-and-drop document template designer.

## Key Risk: Phase 1 Timeline

Phase 1 is a tight fit for a small team in 2 months. On top of everything in the Phase 1 scope, the system must be load-ready for 30,000 orders/day per warehouse.

Two things protect the date. First, build a **JST parity checklist** early. It defines "done" and stops anything outside parity from creeping in. Second, build **stations and integrations** first, since they carry the most technical risk.

## Open Questions

- Confirm JST = JST ERP, and quantify its license cost and lock-in pain.
- How many warehouses run JST today (the baseline for the 50% target), and by when must the target be reached?
- Build a JST feature parity checklist from the pilot warehouse's actual use of JST.
- Final pricing. The current intent is to mirror JST's license-plus-fees structure.

## Vision

Zimple Fulfillment becomes the default fulfillment platform for Thai e-commerce warehouses. Operators would run their whole operation (warehouse, transport, staff, and billing) and their relationship with owners in one modern system, instead of JST plus side tools.
