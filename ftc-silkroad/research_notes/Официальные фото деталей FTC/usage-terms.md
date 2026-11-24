# Can FTC Silkroad show official vendor product photos? Terms, hotlinking vs self-hosting, risks

Scope: goBILDA, REV Robotics, Studica, AndyMark, Pitsco (TETRIX), Logitech, Limelight. Research done 2026-11-24. This is not legal advice. It reports what the sources say and flags where they are unclear. Option A is hotlinking from the vendor CDN. Option B is copying the images into the site's public GitHub repo.

## 1. What each vendor's Terms of Use / legal pages say about copying or displaying site content and images

### Takeaway
None of the seven vendors gives explicit permission for a third-party site to reproduce or display their product photos. Four have terms that forbid copying or reproduction without written permission: AndyMark, Logitech, Pitsco and Limelight (the last two use the same Shopify template). goBILDA publishes no website terms of use at all. REV's Terms & Conditions say nothing about content, but its IP Policy gives a broad non-commercial / educational permission under CC BY-NC-SA 4.0. That permission is written mainly about product IP, so it is unclear whether it covers website photos. Studica's terms could not be read directly because Cloudflare blocked access. None of the vendors offers a dealer, reseller, educator or team image licence that I could find.

### Cited Findings

**AndyMark** (Shopify store). Terms of service — [andymark.com/policies/terms-of-service](https://www.andymark.com/policies/terms-of-service):
- "The entire content included in this site, including but not limited to text, graphics or code is copyrighted as a collective work under the United States and other copyright laws, and is the property of AndyMark Inc." — [AndyMark ToS](https://www.andymark.com/policies/terms-of-service)
- "You may display and, subject to any expressly stated restrictions or limitations relating to specific material, download or print portions of the material from the different areas of the site solely for your own non-commercial use, or to place an order with AndyMark Inc or to purchase AndyMark Inc products. Any other use, including but not limited to the reproduction, distribution, display or transmission of the content of this site is strictly prohibited, unless authorized by AndyMark Inc." — [AndyMark ToS](https://www.andymark.com/policies/terms-of-service)
- Note: "solely for your own non-commercial use" reads as personal use by the visitor. Republishing to the public on another website is "display or transmission" and needs AndyMark's authorization. — [AndyMark ToS](https://www.andymark.com/policies/terms-of-service)

**Logitech.** Terms of Use, "Last updated: January 2022" — [logitech.com/en-us/tos/terms.html](https://www.logitech.com/en-us/tos/terms.html):
- "All text, graphics, user or visual interfaces, trademarks, logos, music, sounds, artwork, photographs, and computer code ('Content') … contained on this Website is owned, controlled, or licensed by Logitech." — [Logitech ToU](https://www.logitech.com/en-us/tos/terms.html)
- "Logitech hereby grants you limited permission to use the Content subject to these Terms, as long as the use of such Content is solely for your personal, non-commercial informational use. Unless expressly permitted in an applicable agreement or on the Content itself, none of the Content may be copied, reproduced, distributed, republished, downloaded, displayed, posted, or transmitted in any form or by any means … without the prior express written permission of Logitech and/or the appropriate owner. Also, you may not 'mirror' any Content contained on this Website or any other server without Logitech's express prior written consent." — [Logitech ToU](https://www.logitech.com/en-us/tos/terms.html)
- The terms are governed by California law, with Santa Clara County courts. — [Logitech ToU](https://www.logitech.com/en-us/tos/terms.html)
- Regional versions of the terms exist (en-ie, en-my, en-ca and others), and a summary of search results said some wording differs between them. — [Logitech en-ie terms](https://www.logitech.com/en-ie/tos/terms)

**Pitsco (TETRIX)** (Shopify store). Terms of Service — [pitsco.com/policies/terms-of-service](https://www.pitsco.com/policies/terms-of-service):
- Section 2: "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the Service is provided, without express written permission by us." — [Pitsco ToS](https://www.pitsco.com/policies/terms-of-service)
- Prohibited uses include using the site or its content "(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others". — [Pitsco ToS](https://www.pitsco.com/policies/terms-of-service)
- This is Shopify's stock ToS template. It still contains an unfilled placeholder: "according to our Refund Policy: [LINK TO REFUND POLICY]". — [Pitsco ToS](https://www.pitsco.com/policies/terms-of-service)

**Limelight** (Shopify store). Terms of Service — [limelightvision.io/policies/terms-of-service](https://limelightvision.io/policies/terms-of-service):
- Same template clause as Pitsco: "You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service … without express written permission by us." — [Limelight ToS](https://limelightvision.io/policies/terms-of-service)
- Same "(d) to infringe upon or violate our intellectual property rights" prohibition. — [Limelight ToS](https://limelightvision.io/policies/terms-of-service)

**REV Robotics** (BigCommerce store).
- The Terms and Conditions page covers ordering, pricing and termination, and says the terms are "governed by … the laws of the State of Texas". It has no clause about copying site content or images. — [REV Terms & Conditions](https://www.revrobotics.com/terms-conditions/)
- IP Policy (last updated 11/30/2023): "individuals, schools, and education related programs, have permission to use our protected IP for non-commercial purposes. This means you are free to use our IP for personal projects, educational purposes, or non-commercial research without any additional licensing fees or royalties … Please follow the guidelines as outlined by the license terms of Creative Commons CC BY-NC-SA 4.0." — [REV IP Policy](https://www.revrobotics.com/ip-policy/)
- The same policy frames "IP" as patents, trademarks, design patents and trade secrets, and introduces the permission under "When you purchase products from REV Robotics®, you are granted a limited license to use that product." It does not mention website photos. It gives legal@revrobotics.com for IP questions. — [REV IP Policy](https://www.revrobotics.com/ip-policy/)

**goBILDA** (BigCommerce store).
- The "Policies" page links only to Order Information, Shipping Policy, Returns Policy and Privacy Policy. There is no Terms of Use. — [goBILDA Policies](https://www.gobilda.com/policies)
- goBILDA's XML sitemap of pages lists returns-warranty-policy, policies and privacy-policy, with no terms or legal page. `/terms-of-service/` and `/terms/` return 404 (checked 2026-11-24). — [goBILDA sitemap](https://www.gobilda.com/xmlsitemap.php?type=pages&page=1)
- The footer reads "© 2026 Base 10 Assets, LLC". — [goBILDA Policies](https://www.gobilda.com/policies)
- The distributor page lists only commercial requirements ("Minimum initial order: $2,500.00"). It mentions no image or marketing-asset licence. — [goBILDA Become a Distributor](https://www.gobilda.com/become-a-distributor/)

**Studica.**
- Every request to www.studica.com, including product pages and /media/ paths, returned HTTP 403 with `cf-mitigated: challenge` (a Cloudflare bot challenge). The site's terms could not be read. — direct test, 2026-11-24, [studica.com](https://www.studica.com/)
- According to a search-result summary of Studica's documentation licence page, content on learn.studica.com (text, graphics, documentation) belongs to Studica Limited and may not be reproduced or distributed without prior written permission. The page itself returned 403 to direct fetches, so this is **not verified verbatim**. — [learn.studica.com/docs/license](https://learn.studica.com/docs/license)

### Inferences
- With no terms (goBILDA) or silent terms (REV T&C), default copyright law still applies. Product photos are copyrighted works, and having no ToS clause is not a licence.
- REV's CC BY-NC-SA 4.0 statement is the closest thing to a permission for a free, educational, non-commercial site. Read broadly, it could cover reusing product photos with attribution ("BY"), a non-commercial use ("NC") and share-alike ("SA"). Its context is product and design IP, though, so relying on it for photos is uncertain. One email to legal@revrobotics.com would settle it.
- The Shopify-template clauses (Pitsco, Limelight) are aimed at the "Service". They do not single out images, but "any portion of the Service" is broad enough to include them.
- AndyMark and Logitech prohibit "display" and "transmission", not only copying. On their contractual wording, that covers hotlinking as well as self-hosting. Whether those terms bind a site operator who never agreed to them (browsewrap) is a separate legal question that was not researched.

### Gaps
- The full text of Studica's www.studica.com terms of use (blocked by Cloudflare).
- Whether REV considers product photos part of the "IP" covered by its CC BY-NC-SA statement.
- Whether Logitech's regional terms for Kazakhstan or Russia (e.g. ru-ru) differ in substance. A ru-ru URL exists ([Logitech ru-ru terms](https://www.logitech.com/ru-ru/footer/terms-of-use)) but was not read.

## 2. Official media/brand kits or press images with usage terms

### Takeaway
I found no public media kit, press-image library or brand-asset page with stated usage terms for any of the seven vendors. Probes of likely URLs returned 404 or were blocked.

### Cited Findings
- `revrobotics.com/media-kit/` → 404; `andymark.com/pages/media` → 404 (checked 2026-11-24). — [REV](https://www.revrobotics.com/media-kit/), [AndyMark](https://www.andymark.com/pages/media)
- A web search for goBILDA media kit, brand assets or logo guidelines returned no goBILDA results. — search 2026-11-24
- The footer link scans of the homepages of gobilda.com, revrobotics.com, andymark.com and pitsco.com found no press, media, brand or dealer-asset links. They found only policy, terms and IP links. — [goBILDA](https://www.gobilda.com/), [REV](https://www.revrobotics.com/), [AndyMark](https://www.andymark.com/), [Pitsco](https://www.pitsco.com/)
- Logitech's newsroom (news.logitech.com) returned 403 to automated fetches, so any press-image terms there could not be checked. — [news.logitech.com](https://news.logitech.com/)
- REV says IP questions go to legal@revrobotics.com. — [REV IP Policy](https://www.revrobotics.com/ip-policy/)

### Inferences
- With no published kit, the realistic route to explicit permission is a short email to each vendor (sales, marketing or legal). Most of these vendors sponsor FIRST teams, and REV, goBILDA and AndyMark all run FTC team discount programs, so a request from a non-commercial FTC community site has a plausible chance of a yes. That is not verified.

### Gaps
- Logitech's press/newsroom image terms (blocked).
- Limelight press assets: docs.limelightvision.io is reachable (200) but was not searched for brand assets.
- Studica press/media pages (blocked).

## 3. Do the image CDNs block hotlinking? (curl test)

### Takeaway
All six reachable vendors served product images with HTTP 200 and identical bytes, whether the request had no Referer or a foreign Referer (`https://example.com/`, `https://ftc-silkroad.github.io/`). Every one returned `access-control-allow-origin: *`. None blocks hotlinking today. Studica could not be tested: Cloudflare challenged every request from the test machine (403).

### Cited Findings
Test run 2026-11-24 from a US datacenter IP with curl and a desktop Chrome User-Agent. Results for no Referer, example.com and github.io Referers:

| Vendor | Image host / CDN | Sample image | Result (all 3 Referers) | Notable headers |
|---|---|---|---|---|
| goBILDA | BigCommerce `cdn11.bigcommerce.com/s-x56mtydx1w` (Cloudflare) | [5203-2402-0019 jpg](https://cdn11.bigcommerce.com/s-x56mtydx1w/images/stencil/100w/products/1488/14802/5203-2402-0019__61087.1746574716.jpg?c=1) | 200 image/jpeg, 4,273 B | `cache-control: max-age=31556926, public`, `access-control-allow-origin: *`, `cf-polished` |
| REV | BigCommerce `cdn11.bigcommerce.com/s-t3eo8vwp22` (Cloudflare) | [UltraPlanetary png](https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/1280w/products/479/2739/Ultraplanetary-noflag-FINAL__33728.1650563601.png?c=2) | 200 image/webp, 46,464 B | same as goBILDA |
| AndyMark | Shopify (`andymark.com/cdn/shop/...` via Cloudflare and `cdn.shopify.com`) | [NeveRest Orbital jpg](https://andymark.com/cdn/shop/files/am-NeveRest-Orbital_1_9cc6d370-56e0-4669-b0b3-2a5d7c10d637_1200x1200.jpg?v=1772134656) | 200 image/jpeg, 141,379 B (cdn.shopify.com copy: 188,389 B) | `cache-control: public, max-age=31557600`, `access-control-allow-origin: *` |
| Pitsco | Shopify (`pitsco.com/cdn/shop/...`, Cloudflare) | [44260 TorqueNADO jpg](https://www.pitsco.com/cdn/shop/files/44260_featured.jpg?v=1718133569) | 200 image/jpeg, 91,566 B | same as AndyMark |
| Limelight | Shopify (`limelightvision.io/cdn/shop/...`, Cloudflare) | [3A render png](https://limelightvision.io/cdn/shop/files/3A_RENDER_ISO_1.png?v=1725724978&width=2048) | 200 image/png, **2,119,133 B** at width=2048 | same as AndyMark |
| Logitech | Cloudinary behind Amazon CloudFront (`resource.logitech.com`) | [F310 gallery png](https://resource.logitech.com/c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/f310/f310-gallery-1.png) | 200 image/png, 147,143 B | `server: Cloudinary`, `via: CloudFront`, `cache-control: private, no-transform, max-age=31536000`, `access-control-allow-origin: *` |
| Studica | Cloudflare in front of www.studica.com | (no image URL obtainable) | 403 text/html (Cloudflare challenge) for HTML and `/media/...` paths | `cf-mitigated: challenge`, `cross-origin-resource-policy: same-origin` |

- Image URLs came from each vendor's own product page HTML: [goBILDA 5203 motor page](https://www.gobilda.com/5203-series-yellow-jacket-planetary-gear-motor-19-2-1-ratio-24mm-length-8mm-rex-shaft-312-rpm-3-3-5v-encoder/), [REV-41-1600](https://www.revrobotics.com/rev-41-1600/), [AndyMark NeveRest Orbital](https://www.andymark.com/products/neverest-orbital-20-gearmotor), [Pitsco TorqueNADO](https://www.pitsco.com/products/tetrix-max-torquenado-motor-with-encoder), [Limelight 3A](https://www.limelightvision.io/products/limelight-3a), [Logitech F310](https://www.logitech.com/en-us/products/gaming-controllers/f310-gamepad.940-000110.html).

### Inferences
- **CDN terms:** the BigCommerce, Shopify, Cloudinary and CloudFront terms bind the merchant (the vendor), not visitors or third-party sites. What matters for FTC Silkroad is the copyright owner's position, which is the vendor's. The CDN operator's terms are not.
- **Studica:** the Cloudflare challenge fires for this datacenter IP. Real browsers in Kazakhstan may or may not be challenged. If they are, an `<img>` hotlink would fail, because the challenge response carries `cross-origin-resource-policy: same-origin`. Treat Studica hotlinks as unreliable until tested from a real browser.
- Open hotlinking today does not mean the vendor permits it. Any vendor could later enable Cloudflare hotlink protection or Referer filtering. curl also cannot reproduce browser-only signals such as `Sec-Fetch-Site`, so a browser test is still worthwhile.
- **Resizing:** Shopify URLs accept `width=`/`height=` parameters and BigCommerce exposes `stencil/{N}w/` sizes. A hotlinking site can request small thumbnails, such as 100w at roughly 4 KB, instead of multi-megabyte originals.

### Gaps
- Studica image CDN behavior, since no image URL could be obtained.
- Behavior from a Kazakhstan residential IP and from a real browser (not tested).

## 4. Practical risks: copyright (self-host vs hotlink), privacy, breakage, performance

### Takeaway
Self-hosting in a public GitHub repo (B) makes and distributes a copy. That falls under the reproduction right in both US and Kazakh law, and it is the more clearly infringing option without permission. It is also exposed to a GitHub DMCA takedown. Hotlinking (A) avoids storing copies. Under the US "server test" it is not a "display" by the linking site, but that doctrine is Ninth-Circuit-specific, contested, and has no known Kazakh equivalent. Hotlinking also leaks visitor IPs to US CDNs and breaks when vendors change URLs.

### Cited Findings

**US copyright, hotlinking/embedding:**
- In Perfect 10 v. Amazon/Google (9th Cir. 2007), the "server test" held that Google did not infringe by embedding images it did not store. Only the site that stores and serves the image "displays" it. — [Hunley v. Instagram, 9th Cir. opinion](https://law.justia.com/cases/federal/appellate-courts/ca9/22-15293/22-15293-2023-07-17.html)
- Hunley v. Instagram, 73 F.4th 1060 (9th Cir., 17 July 2023), reaffirmed that the server test is binding in the Ninth Circuit and rejected arguments based on *Aereo*. — [Justia opinion](https://law.justia.com/cases/federal/appellate-courts/ca9/22-15293/22-15293-2023-07-17.html); [Davis Wright Tremaine analysis](https://dwt.com/insights/2023/08/server-test-instagram-case-ninth-circuit)
- Commentators note that the test survives "for now". Other circuits have not uniformly adopted it, and en banc review was sought. — [Frankfurt Kurnit](https://advertisinglaw.fkks.com/post/102ille/the-server-test-survives-in-the-ninth-circuit-at-least-for-now); [Finnegan](https://www.finnegan.com/en/insights/blogs/incontestable/embedding-and-the-server-test-survive-in-the-ninth-circuitfor-now.html); [Hunley en banc petition](https://www.wiley.law/assets/htmldocuments/Hunley%20Petition%20for%20En%20Banc.pdf)
- A 2024 Ninth Circuit memorandum applied the server test again and rejected limiting it to search engines. — [9th Cir. memo 2024](https://cdn.ca9.uscourts.gov/datastore/memoranda/2024/06/28/22-16195.pdf)

**Kazakhstan copyright** (Law No. 6-I of 10 June 1996 "On Copyright and Related Rights", English consolidated text):
- Protected works expressly include "photographic works and the works produced by the means, analogous to photography" (Art. 7). — [zakon.uchet.kz English text](https://zakon.uchet.kz/eng/docs/Z960000006_)
- Art. 16(2) gives the author the exclusive right "to reproduce the work (the right of reproduction)" and "to distribute the original or copies of the work in any way … including in an open telecommunications network", plus public display and a "right to publicize". — [zakon.uchet.kz English text](https://zakon.uchet.kz/eng/docs/Z960000006_)
- Art. 19 permits use without consent, provided the author and source are named, for "quotation … for scientific, research, debate, criticism and informational purposes … in the volume needed" and for "use of legally published works … as illustrations in publications … of educational nature without receiving income to the extent justified by the purpose". — [zakon.uchet.kz English text](https://zakon.uchet.kz/eng/docs/Z960000006_)
- Art. 18 permits only "one copy … by an individual for personal purposes and without income". — [zakon.uchet.kz English text](https://zakon.uchet.kz/eng/docs/Z960000006_)
- The consolidated text shows amendments up to a law dated 24.11.2025. — [zakon.uchet.kz English text](https://zakon.uchet.kz/eng/docs/Z960000006_); WIPO Lex lists the law at [wipo.int/wipolex/en/legislation/details/16010](https://www.wipo.int/wipolex/en/legislation/details/16010)

**GitHub (self-hosting in a public repo):**
- GitHub processes DMCA takedown notices against repositories and publishes the notices publicly. — [GitHub DMCA Takedown Policy](https://docs.github.com/en/site-policy/content-removal-policies/dmca-takedown-policy); [github/dmca repo](https://github.com/github/dmca)

**Privacy (hotlinking sends visitor IPs to third parties):**
- LG München I (3 O 17493/20, 20 Jan 2022) held that a site loading Google Fonts from Google's servers sent visitors' IP addresses (personal data) to Google without a legal basis. It awarded €100 damages and said self-hosting was the alternative. — [The Register](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/); [court text (rewis mirror)](https://gwern.net/doc/www/rewis.io/349d376d95f9b44a7e8119b1408f382e6f19938b.html)
- That is a single German regional court decision under the GDPR, not binding precedent. — [jsDelivr blog](https://jsdelivr.com/blog/how-the-german-courts-ruling-on-google-fonts-affects-jsdelivr-and-why-it-is-safe-to-use)

**Breakage and performance (observed):**
- Vendor image URLs carry version or cache stamps that change when an image is re-uploaded: BigCommerce `__61087.1746574716`, Shopify `?v=1772134656`, and the Shopify file UUID suffix `_9cc6d370-...`. — sample URLs in section 3
- AndyMark's page fetched at `/products/neverest-orbital-20-gearmotor` contained share and review links pointing to `/products/neverest-orbital-gearmotors`, which suggests product pages are consolidated or renamed over time. — [AndyMark product page](https://www.andymark.com/products/neverest-orbital-20-gearmotor)
- Limelight's default product image is 2.1 MB at width=2048. BigCommerce offers 100w thumbnails of about 4 KB. All CDNs send roughly one-year `max-age` caching. — section 3 test

### Inferences
- **Copyright, B (self-host in a public repo):** the site makes a copy (reproduction) and distributes it, both through the site and through anyone cloning the repo. That is squarely within Art. 16 of the Kazakh law and §106 of US law. It also conflicts directly with Logitech's "mirror … on any other server" ban and with AndyMark's "reproduction, distribution" ban. A public repo makes the copies easy to find, and a DMCA notice to GitHub could take down the whole repository, not just the images. **This is the higher-risk option without permission.**
- **Copyright, A (hotlink):** no copy is stored. US law in the Ninth Circuit treats this as not a "display" by FTC Silkroad. In Kazakhstan, whether embedding counts as "publicizing" or "public display" is untested in the sources found. The EU approach (CJEU Svensson/BestWater, which treats embedding of freely available content as not a new public) was not researched here. AndyMark's and Logitech's ToS wording ("display", "transmission") arguably covers hotlinking contractually. The practical risk is lower, but a takedown or cease request is still possible.
- **Art. 19 (quotation / educational illustration):** a free, non-income educational community site that names the author and source might arguably fit the "informational" quotation or "educational illustration" exceptions. A full product photo used as a catalog thumbnail is a weak fit for "quotation … in the volume needed", and no case law was found. Always attributing "Photo: © goBILDA" etc. with a link costs little and is required for Art. 19 anyway.
- **Privacy:** hotlinking sends every visitor's IP, User-Agent and Referer (which reveals the Silkroad page they are on) to Cloudflare, Shopify, BigCommerce and Cloudinary/AWS in the US. The visitors are high-school students in Kazakhstan, mostly minors. Mitigations: `referrerpolicy="no-referrer"` on `<img>`, `loading="lazy"`, and a privacy-notice line. Kazakhstan's Personal Data Law was not researched (see gaps).
- **Breakage:** expect hotlinked URLs to 404 when vendors re-upload images, discontinue SKUs, or switch platforms. Self-hosted copies never break. Mitigations for A: an `onerror` fallback to a placeholder, a periodic link checker (e.g. a GitHub Action that sends HEAD to every URL), and storing the vendor product-page URL as well as the image URL.
- **Performance:** hotlinked images come from global CDNs with long cache lifetimes, so they are fast. The site must request small sizes (BigCommerce `stencil/320w`, Shopify `&width=400`, Cloudinary transformations), because originals reach 2 MB. Self-hosting lets the site pre-resize to small WebP thumbnails but adds repo weight.
- **Middle path:** (1) ask each vendor by email for permission and record the replies. (2) Until permission arrives, hotlink small thumbnails with attribution, a link to the vendor page, `no-referrer` and a fallback placeholder. (3) Self-host only the images of vendors who grant permission, or REV images if REV confirms CC BY-NC-SA covers photos. Otherwise team-taken photos are the safest.

### Gaps
- Kazakhstan case law on hyperlinking or embedding, and whether embedding counts as "publicizing" (Art. 16(2)(10-1)), was not found.
- Kazakhstan's Law on Personal Data and Their Protection (2013) and whether IP addresses count as personal data were not researched. Neither was any cross-border transfer rule.
- Kazakhstan's Berne Convention membership and how it applies to US-authored works was not verified in this session.
- The EU CJEU embedding case law was not fetched.

## 5. Precedent in the FIRST community

### Takeaway
I found no FIRST-community marketplace or part-lookup tool that shows vendor product photos, and no reports of vendors objecting. The only used-parts channel found is informal: a "#black-market" channel on the FTC Discord.

### Cited Findings
- A Game Manual 0 page on starting a team points teams to the FTC Discord's #black-market channel for used parts. — [Game Manual 0 – Starting a Team](https://game-manual-zero.readthedocs.io/en/latest/docs/being-a-team/starting-a-team.html) (summarized from search results; wording not checked verbatim)
- Game Manual 0's vendor list links to vendors but was not confirmed to embed their product images. — [GM0 Vendor List](https://game-manual-zero.readthedocs.io/en/latest/docs/appendix/vendor-list.html)
- A Chief Delphi-targeted search for discussions of using vendor product images returned nothing relevant. — search 2026-11-24

### Inferences
- With no precedent, FTC Silkroad would effectively be setting one. A courteous permission request to the vendors is low-cost and also builds goodwill.
- Authorized resellers in the region would normally show vendor images under their distributor relationships. Examples are Core Electronics, which sells FTC starter kits ([Core Electronics FTC kit](https://core-electronics.com.au/ftc-first-tech-challenge-starter-kit-2026-2027-season.html.plain.md)), and Studica's FIRST-legal parts store ([studica.com FTC parts](https://www.studica.com/first-legal-ftc-robot-parts)). That shows vendors do license images to sellers, but FTC Silkroad is not a distributor.

### Gaps
- No evidence was found either way on whether goBILDA, REV, AndyMark etc. have ever objected to teams or community sites using their photos. A deeper search of Chief Delphi, Reddit r/FTC and the FTC Discord was not done.
