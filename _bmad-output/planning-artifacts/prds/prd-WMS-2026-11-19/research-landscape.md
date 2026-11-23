# Research Landscape: Thai E-commerce Fulfillment WMS (replace JST ERP)

Date: 2026-11-19 · Method: web search + page fetch · Confidence tags: **[V]** verified from a cited source, **[S]** secondary or vendor claim, **[U]** unverified or my inference (needs validation)

> Caveat: most findings come from vendor marketing or third-party blogs. Independent user reviews of JST ERP Thailand (Pantip, FB groups) did **not** surface in search, so complaint data must come from customer interviews.

---

## 1. JST ERP (Jushuitan / 聚水潭) in Thailand

| Item | Finding | Tag |
|---|---|---|
| Parent | Jushuitan Group, HKEX 6687, listed 21 Oct 2025, valuation >HK$16B. It is China's #1 e-com SaaS ERP (24.4% share, 2024), with 92k+ SaaS clients and claims of 400+ platform and 800+ logistics integrations | [V] [pandaily](https://pandaily.com/jushuitan-debuts-on-hkex-with-16-b-hkd-valuation-proving-saa-s-value-after-12-years), [etnet](https://etnet.com.hk/www/eng/stocks/ci_ipo_detail.php?code=06687) |
| Origin | It began as a WMS and later added OMS and live-commerce management | [S] [WorldFirst partner page](https://www.global-voyage.worldfirst.com/partner-resources/jst-erp-technology) |
| TH scope | Covers TH/ID/MY/PH/VN, with Thai-language support and training. It syncs orders and stock across Shopee, Lazada, TikTok and LINE OA. Features include stock alerts, **QC/packing video recording**, packaging-material tracking, staff-performance tracking and a "Lazada Key service provider" badge | [S] same |
| TH entity | One profile says "<1k clients", founded 2021, 51–200 staff. A JobsDB profile says founded 2014 with 11–50 staff, so the two **conflict** | [S] [JobsDB](https://th.jobsdb.com/th/companies/jst-erp-171090215762736) |
| Packaging | jsterp.com shows **3 packages** (from early-stage sellers to "large companies with own warehouses") and a free trial. It publishes **no prices** | [V] [jsterp.com](https://www.jsterp.com) |
| Positioning | A BigSeller-authored comparison frames JST as the pick for "complex back-office, warehouses, supply chain, enterprise" and BigSeller as the pick for ease of use | [S] biased, [BigSeller vs JST](https://www.bigseller.com/blog/articleDetails/4484/BigSeller-vs-Jst.htm) |
| Complaints | **No public complaint data found.** Hypotheses to test in interviews: a China-centric UX and translation, a support/customization roadmap set by HQ, unfit 3PL multi-owner billing, peak (11.11) performance, and a seat/order-based cost at 30k orders/day | [U] |

**Implication:** JST is credible and well funded (IPO capital, "international expansion" stated). A replacement cannot win on "has WMS". It has to win on depth (3PL billing, lot/expiry, peak throughput, handover accuracy), on Thai-native compliance (e-Tax, WHT) and on local responsiveness. [U]

---

## 2. Competitive landscape (Thailand/SEA)

| Player | Type | Positioning / WMS depth | Tag |
|---|---|---|---|
| **ZORT** | Thai OMS/inventory SaaS (BKK, 2015) | "Thailand's first all-in-one order and inventory" platform with POS, chat, carrier labels (Thailand Post, LINEMAN, COD) and a 15-day free trial. Its WMS depth (bins, waves, cycle count) is **not documented** | [S] [zortout.com](https://zortout.com/en/features), [BigSeller vs ZORT](https://www.bigseller.com/blog/articleDetails/4447/BigSeller-vs-Zort.htm) |
| **BigSeller** | Chinese multichannel OMS, freemium | Free core features. A promo source says the full OMS+WMS package is about **2,500 THB/month**. WMS covers multi-location SKUs, pick, pack and labels. SME focus | [S] [bigseller.com/th](https://www.bigseller.com/th/frontend/staticRg.html) |
| **Ginee** | Indonesian OMS | Sources conflict: one says multi-warehouse routing, another says only "basic warehouse tracking, not true WMS". Shopify listing from $297/yr | [S] [BigSeller vs Ginee](https://www.bigseller.pro/blog/articleDetails/4446/bigseller-vs-ginee-malaysia.htm) |
| **Page365** | Thai social/chat commerce | Social sellers, with logistics via Flash and SCG Express. Not a WMS | [S] [CB Insights](https://www.cbinsights.com/company/page365/alternatives-competitors) |
| **SHIPPOP** (iShip not found) | Thai multi-carrier shipping aggregator | Rate comparison across Kerry/KEX, Flash, Thailand Post, J&T, DHL and SCG, plus COD and a basic inventory module. A shipping layer, not a WMS | [S] [cipher.co.th](https://www.cipher.co.th/en/supported-shopify-shipping-apps) |
| **Anchanto** | SG-based OMS+WMS SaaS | Explicitly targets "3PLs, brands, retailers" in TH. Carrier integrations include Kerry and BEST. Its TH presence historically links to SCG Logistics. Closest enterprise SaaS comparable | [S] [anchanto TH WMS](https://anchanto.com/lp-th-en-warehouse-management/), [techsauce](https://techsauce.co/en/pr-news/anchanto-facilitated-successful-ecommerce-growth12563) |
| **Locad** | Tech-enabled 3PL (own FCs) | Bangkok FCs in Samut Sakhon and Samut Prakan (2023 PR), 200+ brands. Competes as a **service**, not as software | [S] [ryt9 PR](https://www.ryt9.com/en/prg/270470) |
| **Boxme** | SEA 3PL + "Merchant Plus" in-house WMS | FCs in VN/TH/PH. Also sells a WMS for in-house fulfillment | [S] [boxme.asia](https://boxme.asia/?p=8382) |
| **Flash Fulfillment (FFM)** | 3PL with self-built OMS+WMS, Flash Express affiliate | Claims to be a certified Shopee/Lazada/TikTok warehouse and offers an open API | [S] [flashfulfillment.co.th](https://flashfulfillment.co.th/en/solutions), [open-docs](https://open-docs.flashfulfillment.co.th/en.html) |
| **MyCloud Fulfillment** | Thai 3PL | API integrations with Lazada, Shopee, TikTok and LINE Shopping | [S] [mycloudfulfillment](https://mycloudfulfillment.com/en?p=14862) |
| **Platform fulfillment** (FBS / FBL / TikTok) | Marketplace-run warehouses | Single-channel. Eligibility is restricted (FBS invite-only per a 2023 source) | [S] [Locad FBS guide](https://golocad.com/blog/sellers-guide-to-fulfilled-by-shopee/) |
| Thai on-prem WMS (Business Plus, OGA WM3, SYSPRO) | Generic/manufacturing WMS | Weak marketplace integration | [S] |
| **SiamOMS** | **Not found** in search. Confirm the name with the requester | [U] |

**Gap observed [U]:** the market splits into (a) OMS-first SaaS with shallow WMS (ZORT, BigSeller, Ginee), (b) 3PLs whose WMS is proprietary and not for sale (FFM, Locad, MyCloud), and (c) enterprise SaaS (Anchanto, JST). A WMS that is **Thai-native, marketplace-deep and 3PL-billing-capable** at about 30k orders/day sits in a thin space.

**Market context:** Thai e-commerce GMV was about US$35.5B in 2025 (+51.8% YoY). Shopee holds more than 50% share and TikTok Shop is closing in. The 2024 split was Shopee 49%, Lazada 30%, TikTok 21% [S] [Thailand Business News / Momentum Works](https://www.thailand-business-news.com/tech/ecommerce/301785-thailands-e-commerce-market-surged-by-51-8-in-2025). **TikTok Shop integration is therefore tier-1, not optional.**

---

## 3. Table-stakes WMS capabilities

### 3a. Marketplace fulfillment (brand-owned or 3PL)
Built from domain knowledge plus vendor material; tag [U] unless noted.
- **Inbound:** ASN/PO receipt, blind vs. expected receiving, barcode/label printing for unlabeled SKUs, QC hold, discrepancy report.
- **Putaway:** system-directed or suggested location, multi-location per SKU (BigSeller already has this [S]), and zone types (pick-face vs. reserve).
- **Lot/expiry:** lot plus MFG/EXP capture, **FEFO** allocation, near-expiry block per channel (marketplaces reject short-dated goods for beauty and FMCG), and recall trace.
- **Allocation and order pooling:** real-time stock sync to Shopee, Lazada and TikTok (overselling is the #1 cited pain [S]), channel reservation/buffer, bundle/kit (virtual SKUs), and gift-with-purchase.
- **Pick:** wave/batch pick by carrier and cut-off, single-item vs. multi-item split, pick-to-cart/tote, and PDA/mobile scanning. Peak mode for 11.11 means prioritizing by SLA deadline.
- **Pack:** scan-to-verify per item, **pack-station video recording tied to the order/tracking number** (JST has this [S]; packing video is strong dispute evidence on Shopee TH [S] [BigSeller evidence guide](https://www.bigseller.com/blog/articleDetails/4929/shipping-proof-evidence-bigseller.htm)), packaging-material consumption, and weight capture.
- **Label/AWB:** fetch the platform AWB in batches, set "ready to ship", reprint, and handle cancel-after-pack interception.
- **Handover/manifest:** sort by carrier (SPX, J&T, Flash, KEX, LEX, Thailand Post), scan-to-manifest per pickup, a handover sheet signed by the rider, and missing-parcel reconciliation. Lazada flow: Pack → Ready to Ship → To Handover [S] [Lazada PH handbook](https://community.lazada.com.ph/article/seller-handbook-1433000-hc).
- **Returns:** receive by tracking number, grade (resellable, damaged, wrong item), restock or quarantine, and evidence photos and video for platform disputes (Shopee TH tightened "not received" handling from June 2024 [S]).
- **Inventory control:** cycle count (ABC, location-based, blind), adjustments with reason codes and approval, and stock-movement audit log.
- **Ops visibility:** SLA dashboard (orders at risk of late-ship penalty), per-staff productivity, and peak capacity planning.

### 3b. 3PL-specific
- **Multi-owner (multi-client) tenancy:** owner-scoped SKUs, stock and locations, plus owner-level channel accounts. [U]
- **Client portal:** live stock, orders, inbound ASN creation, returns status, invoice backup ("storage days, pick counts, return lines, surcharges with references") [S] [Extensiv](https://www.extensiv.com/blog/billing-per-client-in-3pl-wms-complete-guide).
- **Billing engine:** per-client rate cards for receiving (per unit, carton, pallet or hour), storage (per pallet, bin, CBM or pallet-day, accrued daily and billed monthly), pick (per order, first pick plus additional pick, per line), packaging materials, VAS (kitting, labeling, gift wrap), returns, monthly minimums and long-term storage surcharges. Capture events automatically and sync to accounting [S] [Extensiv billing guide](https://www.extensiv.com/blog/warehouse-billing-complete-guide-to-3pl-invoicing-and-cost-management), [Datex](https://datexcorp.com/blog/how-to-manage-3pl-billing/).
- **Claims:** lost or damaged-in-warehouse claims with liability caps, carrier claims (lost in transit), and evidence attachments (pack video). [U]
- **SLA reporting per client:** dock-to-stock time, ship-on-time %, and accuracy. [U]

---

## 4. Integration realities (Thailand)

### Marketplaces
- **Key reality [U, high confidence domain knowledge]:** for Shopee, Lazada and TikTok orders the **platform assigns the logistics provider and issues the AWB**. The WMS calls the marketplace API (ship/arrange pickup or drop-off, then get shipping document), not the carrier. Direct carrier APIs matter mainly for non-marketplace orders (LINE, website, B2B) and for tracking.
- **Shopee Open Platform v2:** `logistics/get_shipping_parameter`, `ship_order`, `get_tracking_number`, `get_shipping_document` (async create, then download), plus push webhooks. Rate limits are **not confirmed**: one third-party source says 100 req/min, so treat as unverified [S] [InlineX guide](https://developer.inlinex.com.sg/blog/shopee-api-integration-guide-sellers), [apis.io](https://apis.io/providers/shopee/). Check open.shopee.com.
- **Lazada Open Platform:** pack → ready-to-ship (RTS) → print AWB/getDocument. Integrators can set RTS at manifest or at pack. Tracking must be RTS within about 48h or the order risks cancellation (forum claim) [S] [Vinculum](https://vinculumhelpdesk.freshdesk.com/support/solutions/articles/9000198513-lazada). Official TH endpoint names were **not verified**.
- **TikTok Shop Partner API:** webhooks `ORDER_STATUS_CHANGE` and `PACKAGE_UPDATE`. Fulfillment endpoints: ship package, batch ship, get shipping document, get tracking, eligible shipping services. **Labels cannot be voided via API** (Logiwa). Event availability varies by market and app scope, so verify for TH [S] [Hookdeck](https://hookdeck.com/webhooks/platforms/guide-to-tiktok-shop-webhooks-features-and-best-practices), [Celigo](https://docs.celigo.com/hc/en-us/articles/18704697472667).
- **Buyer PII:** marketplaces increasingly mask buyer contact data and print it only on the AWB. Confirm current TH masking behavior per platform [U].
- **Peak (11.11) risk:** API throttling plus late-ship penalties means the design needs queue/backoff, pre-fetching AWBs before the pick wave, and idempotent RTS calls. [U]

### Carriers
- **SPX** (Shopee), **LEX TH** (Lazada), **J&T**, **Flash**, **KEX** (formerly Kerry), **Thailand Post**, Ninja Van, BEST, DHL eCommerce, SCG Express. [S] [Apify TH tracker list](https://apify.com/mai_amm/thai-logistics-tracker-maimai)
- **Kerry → KEX:** corporate rename in Aug 2024 and brand switch around Feb 2025, now SF Express-controlled. It has been restructuring (branch cuts), and a delisting offer around 2025 is unverified. Treat it as a volatile carrier [V] [Kerry/KEX PR](https://th.kerryexpress.com/en/news/306216/kerry-express-rebrands-as-kex-unveiling-a-new-era-in-delivery-service-with-enhanced-solutions-global-connections-local-deliveries), [Bangkok Post](https://bangkokpost.com/business/general/2910786/kex-preparing-comprehensive-overhaul).
- **Public carrier APIs:** I found **no official public developer docs** for Flash, J&T TH or Thailand Post. Access is usually through business accounts or aggregators (SHIPPOP, ClickPost, TrackingMore) [S] [ClickPost Thailand Post](https://www.clickpost.ai/carrier-integration/thailand-post).
- **Peak scale:** J&T made 18 capacity upgrades in TH for the 2025 peak, with 300+ extra line-haul trucks per day [S] [thaipr](https://www.thaipr.net/?p=3779011). No TH-specific 11.11 parcel totals were found.

---

## 5. Thai regulatory concerns

### PDPA (B.E. 2562)
- Buyer name, address and phone are personal data. A 3PL is typically a **data processor** for the brand (controller), and a controller-processor agreement is required [S] [Tilleke](https://www.tilleke.com/insights/thailand-operationalising-pdpa-lawful-basis-sensitive-personal-data-and-data-processing-safeguards/20/).
- PDPC recorded 2,672 complaints as of Jan 2026, and **data minimization** failures were the top category [S] [Tilleke Data Privacy Day 2026](https://www.tilleke.com/insights/key-takeaways-from-thailands-data-privacy-day-2026/89/).
- Product implications [U]: PII retention/purge policy, role-based masking (pickers don't need phone numbers), audit logs, PII redaction or retention limits on stored pack videos, and the hosting region for data residency.
- Draft online-marketplace obligations are still under discussion [S] [Tilleke](https://www.tilleke.com/insights/thailand-introduces-new-obligations-for-online-marketplaces/4/).

### e-Tax Invoice & e-Receipt
- **Voluntary.** There is no legislated B2B mandate for 2026–2027 [S] [fiscal-requirements](https://www.fiscal-requirements.com/news/5729-thailands-e-invoicing-remains-voluntary-key-20262027-updates-and-tax-incentives), [Basware, Jul 2026](https://www.basware.com/en/compliance-map/thailand).
- Two routes: (1) full e-Tax Invoice & e-Receipt (XML/PDF-A3 with a CA digital signature, reported to the Revenue Department by the 15th of the following month) and (2) **e-Tax Invoice by Email** for revenue ≤ THB 30M, using an ETDA timestamp [S] [vatcalc](https://www.vatcalc.com/thailand/thailand-e-invoicing-e-tax-and-invoice-receipt/).
- A 200% deduction incentive exists, but **its end date conflicts** across sources (2025 vs. 2027) [U].
- Implication: 3PL billing should produce tax-invoice-ready data and integrate with a Thai e-Tax provider or accounting system (e.g. PEAK, FlowAccount, Express) rather than signing documents in-house [U].

### Withholding tax (3PL billing)
- Corporate payers withhold **3% on services** (fulfillment, pick/pack, VAS), **5% on rent** (pure space rental) and **1% on transportation**. The base is the amount **excluding VAT** [S] [Unionspace](https://unionspace.co.th/doing-business-living-bangkok/taxes-in-thailand-withholding-tax-wht/), [Forvis Mazars](https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/withholding-tax-in-thailand).
- The 1% e-WHT reduced rate ran from 1 Jan 2023 to 31 Dec 2025. **Whether it was extended into 2026 is unknown** [U].
- Splitting **storage between "rent" (5%) and "warehouse service" (3%)** depends on contract wording. Revenue Department rulings distinguish transport from packing, barcoding and warehouse management [S] [Forvis Mazars ruling](https://forvismazars.com/th/en/insights/doing-business-in-thailand/tax/recent-public-tax-ruling-on-vat-implications).
- Product implications: invoice lines carry a **WHT category per charge type**, the system tracks expected vs. received WHT certificates (50 ทวิ), and AR reconciles net receipts. **Confirm with a Thai tax advisor.** [U]

---

## 6. Open questions to validate
1. Real JST pain points: interview 3–5 current JST users (brand and 3PL).
2. JST TH pricing model (per order, per seat, per warehouse?). Not public.
3. Official rate limits and TH-specific endpoints for Shopee, Lazada and TikTok during 11.11.
4. Current marketplace PII masking and pack-video retention norms.
5. Status of the e-WHT 1% rate and the e-Tax double-deduction after 2025.
6. "SiamOMS": confirm what product this refers to.
