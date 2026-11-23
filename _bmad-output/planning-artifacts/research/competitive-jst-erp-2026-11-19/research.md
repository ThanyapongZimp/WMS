---
title: 'competitive research: JST ERP (Thailand)'
type: 'competitive'
topic: 'JST ERP (Thailand)'
decision: 'Is JST the right displacement target, and what must Phase 1 "JST parity" cover?'
source: 'native run'
status: complete
preset: 'standard'
validation: 'normal'
created: '2026-11-19'
updated: '2026-11-19'
claims_verified: 5
claims_unverified: 7
claims_disputed: 1
---

# competitive research: JST ERP (Thailand)

**Decision this research serves:** Is JST the right displacement target, and what must Phase 1 "JST parity" cover?

## Executive summary

**Short answer: JST is a real target, but a bigger, better-funded one than a local Thai ERP.** The recommendation:
- rebase the 50% goal on a named target list;
- make migration and data portability the wedge;
- verify JST's handover and cancelled-order gaps hands-on before marketing them.

**Phase 1 parity, in short:** JST's changelog confirms FEFO, PDA zone picking, stock count and multi-owner orders. Its marketing pages also claim location management, pick-then-sort, pack video QC, returns QC, and marketplace plus carrier integrations. Treat both groups as table stakes (Recommendation 2).

**JST is not a small local ERP.** Thai JST ERP is the Thai arm of Jushuitan (聚水潭, JST Group, HKEX 6687) [4][5][6][20]. Jushuitan:
- listed in October 2025, raising roughly HK$2bn [11];
- reports about 92,600 SaaS customers, with no overseas breakout disclosed [11];
- began as a warehouse-management product [6];
- still ships date-stamped monthly changes to the Thai WMS, such as FEFO, PDA zone picking, stock-count work and a multi-owner order module [8][9][10].

Plan against a funded, WMS-native incumbent that is investing in Thailand, not a stagnant one.

**JST's Thai installed base is small or unknown.** The only count found is JST's own SEA-wide "<1k clients" bucket on a partner directory, with no Thai figure broken out [7]. No Thai 3PL appears among JST's client logos [1], and two rounds of searches found no 3PL that says it runs JST. Neither of the two group-level disclosures found breaks out overseas revenue or customers [11][12].
- "50% of warehouses running JST" therefore has no measurable denominator from public data. The pool of JST-running warehouses may be small.
- The broader Thai seller-tool market is far larger. It is led by OMS-style tools with vendor-claimed six-figure seller counts [14][15], and by fulfillment providers running their own WMS [18].

**Three findings drive the recommendation:**
1. **The lock-in is real and documented in JST's own terms.** The terms make fees non-refundable, describe no export procedure, make cancellation delete data irreversibly, give JST a perpetual content license, and send disputes to Hong Kong arbitration [4]. Migration tooling and data portability are a credible wedge.
2. **The gaps the brief cites are absent from public JST material:** no pre-handover sort status, no hold for cancelled orders. Neither marketing pages nor the Aug, Sep and Nov 2026 changelog posts show these flows (see the "Not found" rows in §1) [2][8][9][10]. **This is absence of evidence, not proof.** JST's help center could not be read.
3. **A fixed-date cost trigger is coming.** From 1 Jan 2027, PEAK will raise its per-transaction price for JST-connected users from 0.36 to 0.50 THB [22].

**Biggest caveat:** first-hand Thai user voice about JST is close to zero in public sources. The only verifiable user content is one App Store app with 32 ratings [20]. Do not treat any claim about JST users' pain as validated by this research.

## 1. Identity and offer teardown

**Identity.** Thai JST ERP is operated by JST ERP Technology (Thailand) Co., Ltd. at jsterp.io [1]. Its user agreement names JUSHUITAN TECH CO., LTD. (Hong Kong) as the contracting party [4]. The Thai site states its parent is JST Group, which listed on HKEX (6687) on 21 Oct 2025 [5]. Jushuitan's CEO confirmed in mid-2025 that a Thai subsidiary exists and that Indonesia, Vietnam and Malaysia are next [6]. The Thai "Jster" app is published by Hong Kong Jushuitan Technology [20]. These identity sources come from three publishers, and only one (TMTPost [6]) is independent of JST. Identity is still **verified**, because the ToS [4] is a primary contractual document.

When the Thai entity started is not cleanly established:
- A partner directory says "founded 2021" [7].
- The earliest dated Thai activity found is October 2023 [27].
- No local distributor was found; JST appears to sell directly.

**WMS capability, Thai product.** Sources are JST's own marketing pages [1][2] and its date-stamped changelog posts [8][9][10].

| Capability | Status | Evidence |
|---|---|---|
| Bin/location management, fast/slow-location analysis | Claimed | [2] |
| FEFO / expiry-based pick priority | **Confirmed** (changelog, Sep 2026) | [8] |
| PDA picking, zone picking with start-location scan | **Confirmed** (changelog) | [8] |
| Bulk pick lists, pick-then-sort or pick-while-sorting | Claimed | [1][2] |
| Pack-station photo/video recording for disputes | Claimed | [1] |
| Returns tied to original order, QC before restock | Claimed | [1] |
| Stock count / cycle count | **Confirmed**, actively developed (Aug, Nov 2026) | [9][10] |
| Multi-owner ("product owner management") orders | **Confirmed** module | [8]; claimed rental accounts [2] |
| Inbound receipt documents | Partial: "other inbound receipt" documents exist; ASN not named | [8] |
| Putaway, wave picking (by name), weight check at packing | Not found | [2][8][9][10] |
| Carrier handover scan-out / sort status before handover | Not found (only a "shipping list" menu and label reprint) | [8][9] |
| Interception of orders cancelled after pick/pack | Not found | [8][9][10] |
| 3PL billing / client portal | Not found | [2][8] |
| Public API docs | Not found. "Open API" is claimed [1], but the ToS forbids automated access [4]; a 2024 PEAK blog, seen only as a snippet, suggests a partner API with PEAK (low–medium) [32] | [1][4][32] |
| Integrations | Logos only: Shopee, Lazada, TikTok Shop, LINE, Shopify and more; 7 Thai carriers (Flash, J&T, KEX, SPX, Best, DHL, Thailand Post) | [1] |

Most capability rows rest on JST's own pages and are **medium** confidence. Changelog rows are high confidence for FEFO, zone picking, the owner module and stock count. They are medium to medium-high for the inbound-document and shipping-list rows.


## 2. Pricing and lock-in

**Pricing.** JST publishes no THB prices. Its three tiers (JUST SHOP, OMS Pro and WMS) all route to "ask for more info", with a free assessment, training and a trial [3]. A partner review says pricing is quote-based and its promotions are tied to annual plans [21].

At group level, the Chinese press calls JST "typical subscription SaaS". The same press says its early growth came from per-order-volume billing, which gets expensive as merchants scale [11]. A hybrid of subscription plus volume metering is likely but **unverified** for Thailand. More than 90% of group revenue was SaaS as of 2022 [13].

**Lock-in, from JST's own terms of service (rev. 2023-11-09) [4]:**
- Paid fees are non-refundable once activated.
- Account cancellation is irreversible. Data "cannot be recovered or restored", and users are told to back up their own data first.
- No data-export procedure is described.
- JST may delete accounts without notice and restrict accounts inactive for more than 3 months.
- Users grant JST a worldwide, perpetual, irrevocable license to their content.
- Hong Kong law applies, with HKIAC arbitration conducted in English.
- Use must be "manual". Automated access is prohibited, which conflicts with the "Open API" marketing claim [1].

These are primary-source facts, rated **high**. No user complaint about lock-in was found [20][21], so whether the lock-in hurts in practice is not evidenced.

**Ecosystem cost.** PEAK (Thai accounting) is the only partner with its own public page for a JST integration. From 1 Jan 2027 it moves JST-connected users to prepaid credits at 0.50 THB per transaction, up from 0.36 THB. Free quotas are 2,000 per month on PRO Plus and 10,000 per month on Premium, and data stops flowing when credits run out. PEAK says the change is its own decision, not JST's. PEAK announced it on 1 Jul 2026 [22][31].

## 3. Traction and alternatives

**JST in Thailand:**
- **Customers and staff.** The only customer figure is JST's self-reported "<1k clients" on WorldFirst's partner directory. It covers the whole SEA business (TH, ID, MY, PH, VN), and no Thai figure is broken out. The same page lists 51–200 staff [7]. Jobsdb lists 11–50 [25]. Both figures are **low** confidence, and they contradict each other.
- **Client logos.** About 24 brand logos appear on jsterp.io, including DJI, Hello Polo and KO Rich. None is a 3PL [1].
- **Visibility.** JST has run an annual Thai ecosystem conference in 2024 and 2025, confirmed by two independent publishers [23][24]. Neither report gives a Thai customer count. JST also announced Meta Premier Partner status and a CMKL University AI collaboration in 2026 [27].
- **3PL usage.** Two rounds of searches for Thai 3PL or fulfillment providers that say they run JST found none. That is absence of evidence, not proof.

**JST Group (parent):**
- **IPO.** Listed 21 Oct 2025 at HK$30.60, with a planned raise of about HK$2.09bn gross [11]. A broker news snippet gives net proceeds of about HK$1.94bn and stated use of proceeds as 55% R&D and 25% sales and marketing [30] (medium confidence, snippet).
- **Customers.** About 92,600 SaaS customers at 30 Jun 2025 [11]. Earlier counts were 33.1k in 2021 and 66.1k in H1 2024 [12][28]. A further figure of 88,400 for 2024 with 115% net revenue retention was seen only in search snippets, so it is **unverified**.
- **Revenue.** RMB 523M (2022) and RMB 697M (2023) [12]. 2024 revenue of RMB 910M and a first net profit of about RMB 10.6M come from a prospectus summary seen as a search snippet [29], so they are medium-low confidence.
- **Overseas business.** Neither of the two group-level disclosures found breaks out overseas, SEA or Thailand figures [11][12]. This suggests, but does not prove, that Thailand is immaterial to the group today. Overseas is described as one of two growth "wings" [6].
- **Revenue discrepancy.** The Thai site cites 2024 revenue of about RMB 1,098M [5], while the press figure is RMB 910M [29]. This is **disputed**, probably a difference of metric or consolidation scope.

**Alternatives competing for the same budget:**

| Player | Warehouse execution? | Segment | Scale claim | Price | Refs |
|---|---|---|---|---|---|
| BigSeller | Not evidenced (OMS, multichannel) | Online sellers, all sizes | "110,000+ Thai sellers" (vendor, unsourced) | Not published | [14] |
| Page365 | No (OMS, invoicing, own delivery) | Social/chat sellers | "350,000+ shops" (vendor) | Not found | [15] |
| ZORT | No (order and stock sync) | Thai online SMEs; up to Series A | — | From 99 THB/month | [16][17] |
| Flash Fulfillment | **Yes**, own WMS/SCM plus OpenAPI | Sellers who outsource fulfillment | 5 Thai warehouses, 5,000+ sellers, up to 700k orders/day peak group-wide (vendor) | Not published | [18] |

The seller-count claims are vendor-reported and count shops, not warehouses, so they are **not comparable** to JST's "<1k clients". On the evidence, JST is not the dominant Thai seller tool by count. Its position is the WMS-heavy niche. Outsourced fulfillment providers with their own WMS shrink the pool of independent warehouses that might buy any WMS.

**Pool size.** No count of Thai e-commerce fulfillment warehouses or 3PLs was found. Thai parcel volume was about 7–8M per day in 2024, according to ShipHub as reported by VNA [19]. ShipHub is an interested party, so this figure is **medium** confidence.

## 4. Customer voice

**Evidence volume is close to nil, and that is the finding.** Two rounds of searching found:
- no Pantip thread;
- no indexable posts in public Facebook groups;
- no switching stories;
- no complaints about peak-day (11.11) performance;
- no reports of broken integrations.

The only first-hand Thai user voice is the "Jster" app on the Thai App Store, rated 3.0 from 32 ratings with 5 visible reviews [20]:
- Four reviews, all dated 9 July, describe the same forced-update loop. That pattern points to a single bad release, not a lasting problem.
- One review from about 17 Nov 2026 says "ใช้ยากมาก" ("very hard to use").

Weaker signals:
- Competitor and affiliate pages (non-users) say JST is harder to use than BigSeller [14] and that its WMS is basic below the top tier [21].
- One Chinese complaint from 2021 alleges poor after-sales support and disputes a prepaid order-volume refund [26]. It concerns the China product, is outside the freshness window, and is **low** confidence.

Public sources can neither confirm nor refute the brief's claims about JST users' pain: cost, lock-in, fulfillment-flow gaps and outdated UX.

## Cross-dimension insights

- **WMS depth is JST's moat, and ease of use is its gap.** Competitor positioning [14], affiliate review [21] and the one user complaint [20] point the same way. A newcomer competing on "modern UX" attacks a weakness. A newcomer competing on "full WMS" attacks JST's strongest ground, and JST is still adding WMS features monthly [8][9][10].
- **Small Thai base, deep pockets.** JST appears to have a modest SEA footprint [7] but access to IPO capital [11], which a broker snippet says is earmarked mainly for R&D and sales [30]. Expect JST to respond to competition, not stand still.
- **Lock-in cuts both ways.** Hard exit terms [4] make switching painful for customers. A challenger must therefore *carry the migration*: import master data, stock and history. Without that, lock-in protects JST instead of creating an opening.
- **PEAK's price change [22] is a fixed-date trigger.** It may prompt JST + PEAK users to re-evaluate their stack in Q1 2027. It is a GTM timing hook, not proof of churn.

## Recommendations

1. **Rebase the 50% goal on a countable denominator.** Public data cannot size "warehouses running JST" [7][11][12]. Replace the goal with a named target list built from sales discovery: warehouses and 3PLs known to run JST, or brands shown among JST's client logos [1].
   - Confidence: high that the public denominator is unknown; unknown whether the real pool is large.
   - Feeds: brief (success metric), PRD (goals).
2. **Treat these as Phase 1 table stakes**, because JST ships or claims them.
   - **Confirmed in JST's changelog (high):** FEFO pick priority, PDA zone picking, stock count and multi-owner orders [8][9][10].
   - **Claimed on marketing pages only (medium):** bin/location management, bulk pick lists with pick-then-sort, pack photo/video QC, returns with QC restock, and marketplace integrations (Shopee, Lazada, TikTok Shop) plus the 7 Thai carriers [1][2].
   - **Partner-confirmed:** an accounting connector (PEAK) [22].
   - Feeds: PRD (Phase 1 parity checklist).
3. **Keep the differentiators the brief names: pre-handover sort status and a cancelled-order hold. Verify JST's actual behaviour hands-on before marketing them as gaps.** Public evidence is only absence [8][9][10], so the confidence is low. The fastest check is a JST instance or trial, since JST offers trials [3]. This research did not have access to one.
   - Feeds: PRD (differentiation), GTM battlecard.
4. **Make migration and data portability a first-class feature.** Include import from JST exports, and a documented export of your own as the contrast with JST's terms [4].
   - Confidence: high on JST's terms; unverified whether customers feel the pain.
   - Feeds: PRD (Phase 1 onboarding), architecture (import pipeline).
5. **Do primary user research before relying on UX or pain claims.** Interview 5–8 JST-running warehouse operators. Public user voice is too thin to support any claim [20].
   - Feeds: brief (problem section), UX.

## Open questions

| Question | Why open | Route to answer |
|---|---|---|
| How does JST actually handle the handover sort status and cancelled-order hold? | The help center is JS-rendered and unindexed; the changelog is silent | Hands-on JST trial or an existing JST account; screen-record the flows |
| How many Thai warehouses/3PLs run JST? | Only a self-reported "<1k clients" figure exists | Sales discovery; ask carriers or marketplace partner managers; a follow-up recon run (Deepen mode) on 3PL websites |
| What is JST Group's overseas or Thai revenue? | The 2025 annual report PDF could not be parsed; the prospectus link returned 404 | Download the HKEX 6687 annual report and read MD&A and segment notes (a recon Process run on the PDF) |
| What does JST cost in THB, and on what contract? | Not published; quote-based | Sales enquiry, or interviews with operators |
| What do JST users actually complain about? | Near-zero public user voice | Primary interviews; manual search of Thai seller/3PL Facebook groups |
| Thai headcount (11–50 vs 51–200)? | The two sources conflict | LinkedIn employee count; Thai DBD company filing |

## Source appendix

| # | Supports | Publisher | Pub date | Accessed | Confidence |
|---|---|---|---|---|---|
| [1] | Thai entity, capability claims, integration and client logos, "Open API" | [JST ERP (official site)](https://jsterp.io/) | undated (© 2024; news to 2026-09) | 2026-11-19 | medium |
| [2] | WMS features, rental-owner accounts | [JST ERP — WMS page](https://jsterp.io/products/wms) | undated | 2026-11-19 | medium |
| [3] | Package tiers, no published THB prices, trial | [JST ERP — Products](https://jsterp.io/products) | undated | 2026-11-19 | high |
| [4] | Contracting party Jushuitan; refund, export, license, arbitration and manual-use terms | [JST ERP — Terms of Service](https://jsterp.io/terms-of-service) | 2023-11-09 (rev.) | 2026-11-19 | high |
| [5] | Parent JST Group, HKEX 6687 listing; 2024 revenue self-claim | [JST ERP — HKEX news post](https://jsterp.io/article/news/JSTERP_HKEX) | 2025-10-29 | 2026-11-19 | high (identity) / medium (figures) |
| [6] | Thai subsidiary, SEA expansion, warehouse-management origin | [TMTPost (钛媒体)](https://www.tmtpost.com/7598805.html) | 2025-06-17 | 2026-11-19 | high |
| [7] | SEA-wide "<1k clients", 51–200 staff, founded 2021 | [WorldFirst partner directory](https://www.global-voyage.worldfirst.com/partner-resources/jst-erp-technology) | 2026-11-05 | 2026-11-19 | low |
| [8] | FEFO, zone picking, inbound documents, owner module, label reprint | [JST ERP changelog Sep 2026](https://jsterp.io/th/article/blogs/Weekly-update-September-1) | 2026-09-14 | 2026-11-19 | high |
| [9] | Stock recount, bundle label order sequence, outbound inspector | [JST ERP changelog Aug 2026](https://jsterp.io/th/article/blogs/Weekly-update-August-3) | 2026-08-26 | 2026-11-19 | high |
| [10] | Multi-location stock count; after-sales gate | [JST ERP changelog Nov 2026](https://jsterp.io/th/article/blogs/Weekly-update-November-1) | 2026-11-13 | 2026-11-19 | high |
| [11] | IPO date, price and planned raise; 92.6k customers; pricing model; no overseas breakout | [投资界 / pedaily](https://news.pedaily.cn/202510/556119.shtml) | 2025-10-21 | 2026-11-19 | medium–high |
| [12] | Customer counts 2021–H1 2024, revenue, no SEA breakout | [Gelonghui (格隆汇)](https://m.gelonghui.com/p/1364239) | ~2024-11 | 2026-11-19 | medium |
| [13] | SaaS >90% of revenue, ARR 2022 | [界面新闻 via 36Kr](https://www.36kr.com/p/2316493714140424) | 2023-06-25 | 2026-11-19 | high (dated) |
| [14] | JST WMS-heavy vs BigSeller easier; BigSeller "110k+ Thai sellers" | [BigSeller blog (competitor)](https://www.bigseller.com/blog/articleDetails/bigseller-vs-jst.4484.htm?source=app) | 2026-04-17 | 2026-11-19 | low–medium |
| [15] | Page365 "350,000+ shops", feature set | [Page365](https://www.page365.net/home-en) | undated | 2026-11-19 | low |
| [16] | ZORT Series A, à-la-carte pricing | [Brand Inside](https://brandinside.asia/?p=155904) | 2023-09-18 | 2026-11-19 | medium (stale) |
| [17] | ZORT from 99 THB/month | [ZORT packages](https://zortout.com/en/package-ecommerce) | undated | 2026-11-19 | medium |
| [18] | Flash Fulfillment in-house WMS, warehouses, volumes | [Flash Fulfillment](https://www.flashfulfillment.co.th/llms.txt) | undated | 2026-11-19 | low–medium |
| [19] | Thai parcel volume 7–8M/day (2024) | [VietnamPlus (VNA), citing ShipHub](https://en.vietnamplus.vn/thailand-e-commerce-to-fuel-rise-of-express-deliveries-post320799.vnp) | 2025-06-12 | 2026-11-19 | medium |
| [20] | Jster app publisher, 3.0★/32 ratings, reviews | [Apple App Store TH — Jster](https://apps.apple.com/th/app/id1564620482) | reviews 9 Jul / ~2026-11-17 | 2026-11-19 | medium |
| [21] | WMS "basic", top-tier gating, quote-based pricing, on-site setup | [ASAP Project blog (affiliate)](https://www.asapproject.co/Blog/Blog/jst-erp-oms-review) | undated | 2026-11-19 | low |
| [22] | PEAK price change 0.36→0.50 THB from 2027-01-01, quotas | [PEAK manual — JST ERP pricing](https://www.peakaccount.com/peak-manual/api-integration/integration-credit/pricing-jsterp) | undated (©2026) | 2026-11-19 | high |
| [23] | 2024 JST ERP Ecosystem Conference | [Marketing Oops](https://www.marketingoops.com/news/biz-news/2024-e-commerce-thailand-jst-erp-ecosystem-conference/) | 2024-11-29 | 2026-11-19 | medium |
| [24] | 2025 JST ERP Ecosystem Conference | [Marketeer](https://marketeeronline.co/archives/445162) | 2025-11-25 | 2026-11-19 | high (event) |
| [25] | Jobsdb 11–50 employees | [Jobsdb Thailand](https://th.jobsdb.com/th/companies/jst-erp-171090215762736) | undated | 2026-11-19 | low |
| [26] | 2021 China support complaint | [Sina Heimao (黑猫投诉)](https://tousu.sina.com.cn/complaint/view/17356506413/) | 2021-12-14 | 2026-11-19 | low (secondary, stale) |
| [27] | Thai news index: first post Oct 2023, Meta Premier Partner, CMKL | [JST ERP — news](https://jsterp.io/article/news) | 2023-10 to 2026-10 | 2026-11-19 | medium |
| [28] | Historical SaaS customer counts (2021–H1 2024) | [每日经济新闻](https://www.nbd.com.cn/articles/2024-11-25/3659478.html) | 2024-11-25 | 2026-11-19 | medium |
| [29] | 2024 revenue RMB 910M, 2024 net profit (prospectus summary, via snippet) | [TMTPost (钛媒体)](https://www.tmtpost.com/6588112.html) | 2025 | 2026-11-19 | medium–low |
| [30] | IPO net proceeds ~HK$1.94bn; use of proceeds 55% R&D / 25% S&M | [Tiger Brokers news](https://www.itiger.com/news/2577802891) | 2025-10 | 2026-11-19 | medium (snippet) |
| [31] | PEAK credit-package announcement for JST-connected users | [PEAK help center announcement](https://intercom.help/peak/en/articles/15644805-การปรับการใช-งานมาสู-ระบบ-peak-credit-package-สำหรับผู-ใช-งาน-peak-ที-เชื-อมต-อ-jst-erp) | 2026-07-01 | 2026-11-19 | high |
| [32] | PEAK–JSTERP API connection announced | [PEAK blog update](https://www.peakaccount.com/blog/program-usage/update-peak-function-en/update-function-28082024-en) | 2024-08-28 | 2026-11-19 | low–medium (snippet) |

## Claim register

The claim counts in the frontmatter come from the memlog ledger, tallied by `recon_kit.py tally`:

- **Verified (5).**
  - Identity is Jushuitan [4].
  - The ToS lock-in terms [4].
  - The FEFO, zone-picking and owner-module changelog items [8].
  - The PEAK price change [22].
  - The JST Group IPO and the 92.6k customer count [11].
- **Disputed (1).** JST Group's 2024 revenue [5][29].
- **Unverified (7).**
  - The SEA "<1k clients" figure [7].
  - No 3PL found running JST [1].
  - The absent handover and cancel-hold features [8].
  - No overseas revenue breakout [11].
  - The BigSeller and Page365 seller counts [14].
  - The "WMS-strong, harder to use" framing [14].
  - App Store sentiment [20].

## Staleness map

Computed with `recon_kit.py staleness` using the competitive pack's freshness windows: features and pricing 3 months, traction 6 months, sentiment 12 months. Lock-in is treated like pricing.

| Claim | Class | Published | Re-check by | Stale now? |
|---|---|---|---|---|
| JST ToS lock-in terms [4] | lock-in | 2023-11-09 | 2024-02-09 | yes (the document is old but is the current revision as accessed 2026-11-19; re-read before quoting) |
| JST Group 92.6k customers / IPO [11] | traction | 2025-10-21 | 2026-04-21 | yes (replace with figures from the 2025 annual report) |
| PEAK 0.50 THB from 2027-01-01 [22][31] | pricing | 2026-07-01 | 2026-10-01 | yes (still in force as accessed; confirm after 2027-01-01) |
| BigSeller 110k+ Thai sellers [14] | traction | 2026-04-17 | 2026-10-17 | yes |
| FEFO / zone picking / owner module [8] | capability | 2026-09-14 | 2026-12-14 | no |
| Stock count and other changelog items [10] | capability | 2026-11-13 | 2027-02-13 | no |
| Absence of handover/cancel-hold features [8][9][10] | capability | 2026-11-13 | 2027-02-13 | no |
| No published THB pricing [3] | pricing | 2026-11-19 | 2027-02-19 | no |
| JST "<1k clients" [7] | traction | 2026-11-05 | 2027-05-05 | no |
| Jster App Store sentiment [20] | sentiment | 2026-11-17 | 2027-11-17 | no |

Marketing-only capability claims [1][2] are undated. Re-check them with the features class (3 months) alongside the changelog. ZORT pricing [17] and Flash Fulfillment's scale [18] are context, not recommendation inputs, so they are left out of the map.

The earliest re-check date, 2024-02-09 for the ToS lock-in terms, has already passed. The earliest one still ahead is **2026-12-14**, for JST's changelog capabilities. A follow-up recon run (Refresh mode) should start with JST's December changelog and the 2025 annual report.
