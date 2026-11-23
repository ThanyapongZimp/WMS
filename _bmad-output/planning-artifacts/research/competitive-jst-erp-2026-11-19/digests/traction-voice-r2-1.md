# Digest: traction-voice r2

Scope: JST ERP's Thai installed-base proxies and user voice (round 2). Research used web search and web fetch only. All sources were accessed on 2026-11-19, using 20 tool calls. I read 9 distinct pages; 3 more fetches failed or returned no content: the Jobsdb jobs page (403), the iTunes RSS (empty), and the smart-dee URL (no JST content). The rest came from search snippets.

**Headline:** Public evidence of JST's Thai installed base is still thin. No Thai 3PL, carrier or accounting tool other than PEAK publicly says "integrates with JST", and no Thai 3PL says it runs JST. JST's own homepage gives the only named-customer list: about 24 brand logos, all sellers or brands and none identifiable as a 3PL. Thai user voice is still 5 App Store reviews. Of those, 4 are about the same July update-loop bug and 1 says "very hard to use".

## Claims

1. The jsterp.io homepage shows an "Our Clients" logo wall of about 24 names: DJI, Pure Foods, Lucky Flame, Supermom, Avocado, Atipa, 425, KO Rich, Flat2112, Chewa, Baby Moby, Bigmall, Home Boy, CIG, Saran, Labotte, Deli, FullFeel, Paloy, Famous, Sita, LPT, Hello Polo, Finfin and Love Potion. None is identifiable as a 3PL or fulfillment provider. | https://jsterp.io/ | JST ERP (vendor) | undated (latest news item 14 Sep 2569/2026) | 2026-11-19 | med (as a vendor-listed logo set); low (as proof of current use) | traction
2. The jsterp.io homepage claims service in "6 ประเทศอาเซียน" (6 ASEAN countries) and "ERP อันดับ 1 ในจีน" (No. 1 ERP in China). Its counters for companies and platforms rendered as "0" in the fetched text, so the homepage gives no Thai customer count. | https://jsterp.io/ | JST ERP (vendor) | undated | 2026-11-19 | low | traction
3. The jsterp.io partner logo strip, which is unlabelled, includes carriers (Best Express, J&T, Flash, KEX, DHL, SPX, Thailand Post), payments (2C2P, KBank, SCB, Stripe, Fiuu, among others), marketplaces (Shopee, Lazada, TikTok Shop, LINE Shopping, Shopify, among others), and PEAK and Meta. These are JST-side claims. No counterpart page was found for any partner except PEAK. | https://jsterp.io/ | JST ERP (vendor) | undated | 2026-11-19 | low (one-sided) | traction
4. PEAK has a help article titled "เชื่อมต่อ PEAK x JSTERP". It covers how shipping-fee data from JST flows into PEAK's sales-tax-invoice report, and it is the only partner-side integration page found. I saw it as a search snippet and did not open it. | https://intercom.help/peak/en/articles/9789710-เชื-อมต-อ-peak-x-jsterp | PEAK (Intercom help centre) | undated | 2026-11-19 | med (partner primary, read via snippet) | traction
5. PEAK confirms the JST ERP API price change: "จากเดิม 0.36 บาท/รายการ" → "ปรับเป็น 0.50 บาท/รายการ ตั้งแต่ 1 ม.ค. 2570". The free quota becomes 2,000/month (PRO Plus) or 10,000/month (Premium), pooled across all channels and prepaid. Data stops flowing when credits run out. PEAK says the change was "กำหนดโดย PEAK ไม่ใช่โดย JST ERP" (set by PEAK, not by JST ERP). The announcement is dated 1 Jul 2026, and the manual page states the same terms. Two pages from the same publisher agree, so I have not marked this "high" on independence grounds; as a primary fact it is solid. | https://intercom.help/peak/en/articles/15644805-การปรับการใช-งานมาสู-ระบบ-peak-credit-package-สำหรับผู-ใช-งาน-peak-ที-เชื-อมต-อ-jst-erp ; https://www.peakaccount.com/peak-manual/api-integration/integration-credit/pricing-jsterp | PEAK / PUUN Intelligent | 2026-07-01 (announcement); manual undated | 2026-11-19 | high (primary, verified) | pricing / churn trigger
6. PEAK's notice implies a pre-2027 free tier of "เชื่อมต่อฟรี 2,000 รายการ/เดือน" for JST-connected users. That a dedicated pricing page and a dedicated migration notice exist suggests the JST-connected PEAK user group is large enough to address separately. The group's size is not disclosed; this is an inference. | same as #5 | PEAK | 2026-07-01 | 2026-11-19 | low (inference) | traction
7. JST Thailand held the "2024 E-commerce Thailand JST ERP Ecosystem Conference" on 19 Nov 2024 at True Digital Park, supported by DBD, with Meta/Meta Pay and Shopee presenting. The article gives no Thai customer, shop or warehouse count. Its only volume figure is the parent's China 11.11 figure ("23.8 พันล้านออเดอร์"). | https://www.marketingoops.com/news/biz-news/2024-e-commerce-thailand-jst-erp-ecosystem-conference/ | Marketing Oops | 2024-11-29 (older than 6 months, flagged) | 2026-11-19 | med (event fact); n/a (no Thai traction number) | traction
8. A second conference, "E-Commerce Thailand JST ERP Ecosystem Conference: Next Realway 2025", took place. Marketeer's coverage is about LINE's talk and contains no JST customer numbers. Two independent publishers in two consecutive years confirm that JST runs an annual Thai ecosystem event. | https://marketeeronline.co/archives/445162 | Marketeer | 2025-11-25 (about 12 months old, flagged) | 2026-11-19 | high (event recurrence: two independent publishers) | traction
9. In a fresh fetch, the Jster Thai App Store page shows 3.0/5 from 32 ratings and 5 visible reviews. One review is new since round 1: "Mingapichaya", 9 Jul, title "ปัญหาเยอะมาก", text "อัปเดตแล้วกดอะไรไม่ได้เลยก็เด้งขึ้นให้อัปเดตตลอด ทั้งที่อัปเดตไปแล้วแก้ไขด่วน" (after updating, nothing can be tapped and the update prompt keeps popping up even though it is already updated; fix urgently). | https://apps.apple.com/th/app/jster/id1564620482?see-all=reviews | Apple App Store TH | 9 Jul (year not shown, likely 2026) | 2026-11-19 | med | complaint (stability)
10. Of the 5 visible reviews, 4 are dated 9 Jul and describe the same forced-update loop or app lockout (Jihny25, :(สสส, น้องนายด์, Mingapichaya). They point to one release incident rather than an ongoing pattern. The fifth, "parapimpin" (about 17 Nov 2026), says "ใช้ยากมาก" (very hard to use). | same as #9 | Apple App Store TH | 9 Jul / ~2026-11-17 | 2026-11-19 | med | complaint (stability incident; usability)
11. The iTunes customer-reviews RSS for id1564620482 (TH) returned a feed with zero review entries, so the full review history could not be pulled that way. | https://itunes.apple.com/th/rss/customerreviews/id=1564620482/sortby=mostrecent/json | Apple iTunes RSS | feed updated 2026-11-19 | 2026-11-19 | high (as a fact about the feed) | n/a
12. JST-group hiring visible in search is in Indonesia (PT JST Software Indonesia on Glints). Roles include "Product Business Analyst (ERP/WMS)", "IT Implementor (Mandarin speaker)" and "Operation Product (ERP consulting)", plus presales and sales. The Glints profile text says JST serves "350,000" e-commerce companies across regions, which is a group-wide figure. No Thai postings could be read: the Jobsdb TH jobs page returned 403, and JobThai company 146535 is an unrelated oil-and-gas firm, J.S.T. Services. | https://glints.com/id/en/companies/pt-jst-software-indonesia/f9277ed8-f2c8-4ad8-ac8c-ac979f6f454e | Glints (search snippet) | undated | 2026-11-19 | low (snippet; Indonesia, not Thailand) | traction (regional)
13. A Pantip search for "JST ERP" returned no thread, only an unrelated profile page. This is the second round with zero Pantip results. | (search: "JST ERP" pantip) | n/a | n/a | 2026-11-19 | med (absence across two rounds) | n/a

## Integration/partner list

| name | type | what it says | ref |
|---|---|---|---|
| PEAK (PUUN Intelligent) | Accounting | Partner-side integration ("PEAK x JSTERP") with dedicated JST pricing and a credit-package notice. The only two-sided integration confirmed. | #4, #5 |
| Meta / Meta Pay | Platform / payment | Presented at the 2024 JST conference; appears in the jsterp.io logo strip. JST news says "Meta Premier Partner", but I did not verify this on Meta's side. | #3, #7 |
| Shopee | Marketplace | Presented at the 2024 conference; appears in the logo strip | #3, #7 |
| LINE Thailand | Chat commerce | Speaker at the 2025 conference; JST lists LINE as a sales channel | #8, #2 |
| DBD (Dept. of Business Development) | Government | Supported the 2024 conference | #7 |
| Lazada, TikTok Shop, LINE Shopping, Shopify, Temu, Shein, Amazon, etc. | Marketplaces | JST-side logo claims only | #3 |
| Flash, J&T, KEX, SPX, DHL, Best, Thailand Post | Carriers | JST-side logo claims only. No carrier page naming JST was found. | #3 |
| 2C2P, KBank, SCB, Stripe, Fiuu, etc. | Payments | JST-side logo claims only | #3 |
| FlowAccount | Accounting | No JST integration found | — |
| Any Thai 3PL / fulfillment provider | 3PL | None found that names JST | — |

## Looked for, not found

- **Thai 3PLs or fulfillment providers stating they run JST, or that they "รองรับ JST":** none. Queries tried: "jsterp fulfillment Thailand 3PL", "JST ERP รองรับ คลังสินค้า ฟูลฟิลเมนท์" and "JST ERP เชื่อมต่อ".
- **FlowAccount ↔ JST integration:** not found.
- **Carrier or payment partner pages naming JST:** not found. Only JST's own logo strip exists.
- **Thai customer, shop or warehouse count from JST events or press:** none. Neither the 2024 nor the 2025 conference coverage gives one.
- **JST Thailand job postings:** the Jobsdb TH jobs page returned 403, and JobThai showed a namesake firm. No Thai roles could be read, so the role mix (implementation versus warehouse consultant) is unknown for Thailand.
- **iTunes RSS reviews:** the feed was empty. Only the 5 reviews on the web page were readable.
- **Android/Play Store JST app:** not found for a second round.
- **Competitor "switch from JST" pages:** none. The smart-dee.com/anymind-vs-jst-erp/ URL contains no JST content; it is a generic smart-dee services page. Searches for "AnyMind vs JST ERP" and "ย้ายจาก JST/เปลี่ยนจาก JST" found nothing relevant. Zort and Page365 do not have one in the indexed results. BigSeller's comparison (round 1) remains the only competitor comparison.
- **YouTube/TikTok comments:** not indexable via search and not attempted further within budget.
- **Pantip threads:** none, for the second round.

## Contradictions

- **Group scale versus Thai footprint.** The Glints/Indonesia profile snippet claims 350,000 e-commerce companies group-wide. The round-1 WorldFirst profile says "<1k clients" in SEA. The jsterp.io logo wall shows about 24 Thai brands, and the Thai app has 32 ratings. The 350k figure is almost certainly China-dominated; it does not contradict a small Thai base, but it should not be read as Thai traction.
- **"Integrates with" is one-sided.** JST lists about 7 carriers, more than 10 payment providers and more than 15 marketplaces as partners. Apart from PEAK, no partner was found that reciprocally lists JST.
- **Stability complaints: pattern or incident?** Round 1 counted 3 reviewers reporting the update loop. The fresh read shows 4, all dated 9 Jul. That points to a single release incident, not chronic instability, so the complaint should be weighted down as a persistent theme.
- **Smart-dee lead.** Round 1 listed smart-dee.com/anymind-vs-jst-erp/ as a lead, but the page has no JST content. The URL may have been repurposed, or the lead may have been wrong.
