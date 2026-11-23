---
title: "Addendum: Zimple Fulfillment Brief"
created: 2026-11-19
updated: 2026-11-19
---

# Addendum: Zimple Fulfillment Brief

This addendum holds depth for the PRD and architecture that does not fit in the brief. Its sources:
- `artifact/Zimple_Fulfillment_Feature_Inventory (1).docx` (Nov 17, 2026)
- the mockups in `artifact/Zimple Fulfillment Screens (Copy)/`: about 150 warehouse-side files, plus 20 in `owner-portal/`

## How to read the phase tags

The tags follow the brief's Scope section:

| Tag | Meaning |
|---|---|
| **P1** | WMS core at JST parity |
| **P2** | Multi-owner features for 3PLs: Client Portal, rates, billing, claims |
| **Later** | Beyond the WMS |
| **P?** | Not yet assigned by the brief. The JST parity checklist should settle these. |

A tag in parentheses on a single item overrides the tag on its module.

## Module Inventory

Page counts come from the source document.

### Core flow

- **Owner setup (count not given in source) · P1**
  - Register SKUs and boxes, and connect shops.
  - The warehouse sets each owner's rates (P2).
- **Inbound (9) · P1**
  - An ASN comes from the warehouse, the Client Portal (P2) or a PO (Later).
  - Then: scan receive → temporary receipt when there is no ASN or a mismatch → VAS → suggested putaway → closed receipts.
- **Orders (5) · P1**
  - Marketplace auto-import, stock reservation and an order timeline.
  - Raise a claim (P2) or resend from an order.
- **Picking (10) · P1**
  - FIFO/FEFO rules and manual or automatic wave/batch lists.
  - Carts and totes, PDA picking, short picks and sorting.
- **Packing (8) · P1**
  - Prep, plus a pack station that does scan check, box suggestion, weighing and labels.
  - VAS at pack, and an exceptions queue.
- **Handover (7) · P1:** sort to carrier containers, loading scan, signed manifest, and day-close pending items.
- **Returns (8) · P1:** receive → inspect with photos → VAS → restock, or report the problem to the owner.

### Supporting modules

- **Inventory (21) · P1**
  - Stock by status and location, and across all warehouses.
  - Lot/expiry tracking and a stock ledger.
  - Moves, plus full, cycle and spot counts.
  - Damaged and on-hold stock, cancel-restock, and standalone VAS.
  - Layout map (P?), temperature log (P?) and inter-warehouse transfers (P?).
- **Claims (5) · P2:** review evidence, carrier claims, and cost and prevention analytics.
- **Products (8) · P1:** SKUs per owner, bundles, owner-supplied boxes, warehouse packing materials and material matching.
- **Purchase (7) · Later:** suppliers, reorder suggestions, POs, and PO → inbound notice. The source notes that reorder suggestions are probably for packing materials.
- **Planning (7) · Later**
  - Forecast for campaign peaks such as 11.11 (P?).
  - Workforce shifts, check-in, spot checks and staff tests.
- **Transport (6) · Later:** owner booking requests (pickup, B2B), trip planning, fleet, and a driver app with proof of delivery.
- **Owners (4) · P2:** profiles and contracts, and requests in both directions between owners and the warehouse.
- **Billing (6) · P2:** rate cards, charges, compensation and bill summary.
- **Reports (3):** report hub (P?) and TV mode (Later).
- **Client Portal (20 files) · P2:** owner-side screens in `owner-portal/`. Not broken down here.
- **Settings (count not given in source):**

  | Setting | Phase |
  |---|---|
  | Carriers | P1 |
  | External connections (see Integrations) | P1 |
  | Per-owner rules | P2 |
  | Theme tool | Later |
  | Drag-and-drop document template designer | Later |
  | Company and brand | P? |
  | Warehouse → zone → location, plus a layout designer | P? |
  | Users and roles | P? |
  | Time tracking | P? |
  | Devices and stations | P? |
  | Warehouse rules (two competing designs; see Design Gaps) | P? |
  | Admin bulk import/export | P? |

## Actors

- **Warehouse office:** admin, supervisor, CS, executives, accounting, purchasing, HR, QC and the transport supervisor.
- **Floor staff:** receiving, putaway, picking, sorting, packing, VAS, handover, returns and stock.
- **Client Portal (P2):** owner admin, owner team users and owner accounting.
- **Others:**
  - Carrier pickup staff, who sign the manifest.
  - Drivers (Later).

## Integrations Named in Source

- **Marketplaces:** Shopee, Lazada and TikTok Shop.
- **Carriers:** Flash, Kerry and J&T.
- **Other:** a generic API connection to external systems. The source names no ERP.

## Billing Model (from source, P2)

- Every warehouse activity creates a charge line.
- Charge lines roll up into one bill per owner per billing cycle.
- The standard rate card covers four charge types: storage/space, receiving, pick-pack per order, and VAS. Customer-specific rates override the standard card.
- Compensation for warehouse-fault claims is deducted from the bill.

## Design Gaps Noted in Source

- **Sorting and putaway have no dedicated PDA mockup.** The `inbound-pda-sample` mockup may cover them.
- **The target device for the VAS work screen is unsettled.** It may run on a desk tablet.
- **The warehouse rules screen has two competing designs:** `settings-warehouse-rules` and `new-sample-settings-warehouse-rules`.

## Market Note

A [WorldFirst partner page](https://www.global-voyage.worldfirst.com/partner-resources/jst-erp-technology) describes "JST ERP" as a Thai-market system that manages orders, inventory and warehouses for online stores, with Thai-language support. It is unconfirmed whether this is related to Jushuitan (聚水潭), a Chinese SaaS ERP. This bears on the brief's open question about confirming that JST = JST ERP.
