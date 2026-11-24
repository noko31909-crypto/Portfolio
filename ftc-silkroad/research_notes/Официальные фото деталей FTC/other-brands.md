# Official product photos: Studica, AndyMark, Axon, TETRIX and "Other" parts (49 parts)

Machine-readable mapping: `other-brands-images.json` (same folder). It has 49 keys: 34 with a verified image URL and 15 Studica parts set to `null`. Source catalog: `site/data/parts-catalog.json` (read-only, not modified). All checks were run on 2026-11-24 with curl from this machine, with no Referer header.

## What is the direct, vendor-hosted URL of the main product image for each part?

### Takeaway
AndyMark (12), TETRIX (14), Axon via goBILDA (4) and all 4 "Other" parts have a verified vendor-hosted image. All 15 Studica parts are `null`. Every studica.com / studica.co URL, including image paths, sits behind a Cloudflare managed challenge (HTTP 403), and no reachable Studica image host was found.

### Cited Findings

**Method**
- AndyMark and Pitsco (TETRIX) run on Shopify. Each product's `<handle>.js` JSON gives the product `featured_image` (the same as og:image / the first gallery image) and a `featured_image` for each SKU variant. When the catalog SKU matched a variant that has its own image, I used that variant image, because several catalog parts share one product page (for example am-2964a/am-2964b, am-3637b/am-3461b, and the TETRIX channels 39066–39069). Otherwise I used the product main image. Each JSON note records the page og:image as well. — [AndyMark NeveRest Classic 40](https://andymark.com/products/neverest-classic-40-gearmotor), [Pitsco TETRIX channels](https://www.pitsco.com/products/tetrix-channels)
- Each Shopify file resolves both at `cdn.shopify.com/s/files/1/<store>/files/<name>` and under the brand's own domain at `/cdn/shop/files/<name>`. Pitsco's own og:image uses the `www.pitsco.com/cdn/shop/files/...` form. The mapping uses the brand-domain form (`andymark.com/cdn/shop/files/…`, `www.pitsco.com/cdn/shop/files/…`), and I checked that both forms return the same bytes (e.g. am-2964a: 128,525 bytes from andymark.com, www.andymark.com and cdn.shopify.com). — [AndyMark](https://andymark.com/products/neverest-classic-40-gearmotor), [Pitsco](https://www.pitsco.com/products/tetrix-max-torquenado-motor-with-encoder)

**AndyMark (12/12 found, all andymark.com/cdn/shop/files/…)**
- am-2964a → `am-2964a_4d14bdab-….jpg`, am-2964b → `am-2964b_6e242470-….jpg`. These are distinct variant images on the same page. — [NeveRest Classic 40](https://andymark.com/products/neverest-classic-40-gearmotor)
- am-3103 → `am-3103_e2e377ae-….jpg` (variant image; the page og:image is `am-3103_1_f5bab635-….jpg`). — [NeveRest Classic 60](https://andymark.com/products/neverest-classic-60-gearmotor)
- am-3637b → `am-3637b_500cde5d-….jpg`, am-3461b → `am-3461b_68781be3-….jpg`. — [NeveRest Orbital](https://andymark.com/products/neverest-orbital-gearmotors)
- am-4044_blue → `am-4044_blue_acae0934-….jpg`. — [2 in. Dualie omni](https://andymark.com/products/2-in-dualie-omni-wheel)
- am-5502 (Full Set variant) has no variant image. I used the product main image `am-5502R_3ddc5b03-….jpg`, which shows a single right-hand wheel and is shared by all variants. It is flagged `shared_variant_image: true`. — [3 in. BB mecanum](https://andymark.com/products/3-in-bb-mecanum-wheels)
- am-3067 → `am-3067_8ac5b41a-….jpg` ([4 in. HD mecanum](https://andymark.com/products/4-in-hd-mecanum-wheels)); am-2626 → `am-2626_af4e8e76-….jpg` ([4 in. SD mecanum](https://andymark.com/products/4-in-sd-mecanum-wheel)); am-3047 → `am-3047_3_5c50bc93-….jpg` ([DuraOmni](https://andymark.com/products/duraomni-wheel)); am-5198-1200 → `am-5198-1200_2d797c44-….jpg` ([JST-VH cables](https://andymark.com/products/jst-vh-2-pin-neverest-motor-power-cables)); am-3926a → `am-3926a_88e9e9e0-….jpg` ([encoder cable](https://andymark.com/products/neverest-motor-rev-expansion-hub-encoder-cable))

**TETRIX / Pitsco (14/14 found, all www.pitsco.com/cdn/shop/files/…)**
- Single-SKU pages use the og:image: 44260_featured, 39197_featured, 39057_featured, 39376_featured, 39073_featured, 41352_featured. — [TorqueNADO](https://www.pitsco.com/products/tetrix-max-torquenado-motor-with-encoder), [servo](https://www.pitsco.com/products/tetrix-max-standard-scale-servo-motor), [battery](https://www.pitsco.com/products/tetrix-12-volt-rechargeable-nimh-battery-pack), [motor mount](https://www.pitsco.com/products/tetrix-dc-motor-mount), [flat plate](https://www.pitsco.com/products/tetrix-flat-building-plates), [Powerpole cable](https://www.pitsco.com/products/tetrix-max-powerpole-motor-cable)
- Multi-variant pages have per-SKU variant images: 45423_featured, 45424_featured ([gearboxes](https://www.pitsco.com/products/tetrix-max-torquenado-motor-gearboxes)); 39066/39067/39068/39069_featured ([channels](https://www.pitsco.com/products/tetrix-channels)); 45320_featured, the "Wheel Set" variant ([mecanum](https://www.pitsco.com/products/tetrix-max-mecanum-wheels)).
- 36466 (omni wheel pack): the og:image / first gallery image is `v2234_featured.jpg`. The gallery also holds a SKU-named `36466_featured.jpg`. The mapping uses the og:image. — [omni wheel packs](https://www.pitsco.com/products/tetrix-omni-wheel-packs)

**Axon (4/4 found, goBILDA BigCommerce CDN)**
- goBILDA's og:image is a 386×513 rendition. The mapping uses the same gallery asset (first gallery image, "Ang1") at the `images/stencil/1280x1280/` size on `cdn11.bigcommerce.com/s-x56mtydx1w/`, goBILDA's store. Overdrive kit: image id 17153; MAX MK2: 16945; MINI MK2: 16931; Programmer MK2: 16919. — [overdrive kit](https://www.gobilda.com/axon-max-1-3-2-overdrive-kit/), [MAX MK2](https://www.gobilda.com/axon-max-servo-mk2/), [MINI MK2](https://www.gobilda.com/axon-mini-servo-mk2/), [programmer MK2](https://www.gobilda.com/axon-servo-programmer-mk2/)
- axon-robotics.com (a Shopify store) has its own product images. MAX MK2 og:image: `cdn.shopify.com/s/files/1/0657/9182/0008/files/Perspective.png?v=1755499769`; MINI MK2: `…/Perspective_1b9841ad-db95-4986-9501-7c6478750401.png?v=1755500172`; Programmer MK2: `…/Isometric.png?v=1755496617`. All three return 200 image/png. They are recorded in the JSON notes as alternatives. — [axon MAX](https://axon-robotics.com/products/max), [axon MINI](https://axon-robotics.com/products/mini), [axon programmer](https://axon-robotics.com/products/programmer)
- The axon-robotics.com homepage links only /products/max, /products/mini and /products/programmer. I found no overdrive-kit page there. The `axon-robotics.com/cdn/shop/files/...` brand-domain form returned 404, so only the cdn.shopify.com form works for that store. — [axon-robotics.com](https://axon-robotics.com/)

**Other (4/4 found)**
- Limelight 3A: `https://limelightvision.io/cdn/shop/files/3A_RENDER_ISO_1.png?v=1725724978&width=2048`. This is the page's og:image:secure_url and the product's only image. — [Limelight 3A](https://limelightvision.io/products/limelight-3a)
- Logitech C270: the page og:image is a generic Logitech brand image (`logitech-global-og-image.png`), so I used the first gallery image instead: `https://resource.logitech.com/content/dam/products/logitech/webcams/c270-hd-webcam/gallery/c270-hd-webcam-1-0224.png`. The page itself serves it with a Cloudinary transform prefix (`c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/`); the mapping uses the untransformed asset. — [C270](https://www.logitech.com/en-us/shop/p/c270-hd-webcam.960-000694)
- Logitech F310: the og:image is likewise generic (`logitechg-global-og-image.png`). First gallery image: `https://resource.logitechg.com/content/dam/gaming/en/products/f310/f310-gallery-1.png`. — [F310](https://www.logitechg.com/en-us/shop/p/f310-gamepad.940-000110)
- Sony DualShock 4 (the catalog has no URL for it): the og:image of the official PlayStation accessories page is `https://gmedia.playstation.com/is/image/SIEPDC/dualshock-controller-product-thumbnail-01-en-14sep21?$facebook$` (PNG, 448,700 bytes). The same asset without the `$facebook$` preset returns only a small default JPEG (8,025 bytes). direct.playstation.com's DS4 URL returned 404. — [PlayStation DS4](https://www.playstation.com/en-us/accessories/dualshock-4-wireless-controller/)

**Studica (0/15 found)**
- Every Studica URL tried returned HTTP 403 with `server: cloudflare` and `cf-mitigated: challenge` ("Just a moment..." page). That covers all 15 catalog product URLs on studica.com and studica.co, the root of studica.com and www.studica.com, www.studica.ca, docs.studica.com, and the image/static paths `www.studica.com/images/thumbs/default-image_550.png` and `/favicon.ico`. — [studica.com 75001 page](https://www.studica.com/maverick-12v-dc-gear-motor-with-encoder)
- WebFetch of the same product page also returned 403. — [studica.com 75001 page](https://www.studica.com/maverick-12v-dc-gear-motor-with-encoder)
- Search results confirm the Studica pages exist (e.g. 75001 Maverick, the planetary variants), but none exposed image URLs or a separate image CDN host. — [Studica search result](https://www.studica.com/75001)
- The Wayback Machine's availability API reported no snapshot for the 75001 page, and web.archive.org CDX/page fetches failed through this machine's proxy (connection closed), so no cached page source was available. — [archive.org availability API](https://archive.org/wayback/available?url=studica.com/maverick-12v-dc-gear-motor-with-encoder)

### Inferences
- Studica appears to serve product images from its own origin (`/images/thumbs/…`, the nopCommerce-style path), behind the same Cloudflare challenge, rather than from a separate CDN host. That would explain why no fetchable Studica image URL exists from this machine. This is inferred from the 403 on the `/images/thumbs/` path, not confirmed from page source.
- Shopify files keep their URL when a product is edited, but the `?v=` query changes when an image is replaced. The images look stable but should be checked again before a rebuild.

### Gaps
- All 15 Studica parts: no image. Fetching from a browser that can pass the Cloudflare challenge, or asking Studica for media, would be needed. I did not use reseller images.
- I did not check whether the AndyMark am-5502 "Full Set" image exists elsewhere on andymark.com. The product page offers only the per-side images am-5502R / am-5503R.

## Does each image URL return HTTP 200 with an image content type (curl, no Referer)?

### Takeaway
Yes, for all 34 non-null URLs: each returned HTTP 200 with an `image/*` content type (jpeg or png). The 15 Studica entries have `status: null`.

### Cited Findings
- AndyMark: 12 × 200 image/jpeg. TETRIX: 14 × 200 image/jpeg. Axon (goBILDA 1280x1280 stencil): 4 × 200 image/jpeg. Limelight, Logitech C270, Logitech F310 and PlayStation DS4: 4 × 200 image/png. Statuses are recorded per part in `other-brands-images.json`. — [AndyMark](https://andymark.com/products/duraomni-wheel), [Pitsco](https://www.pitsco.com/products/tetrix-channels), [goBILDA](https://www.gobilda.com/axon-max-servo-mk2/)
- goBILDA's BigCommerce CDN content-negotiates. The `stencil/2400x2400/` and `stencil/original/` renditions of some Axon images came back as `image/webp` even though the file ends in `.jpg`, while `stencil/1280x1280/` came back as `image/jpeg` for every Axon image tested. That is why the mapping uses 1280x1280. — [goBILDA MAX MK2](https://www.gobilda.com/axon-max-servo-mk2/)

### Inferences
- Because of that negotiation, the goBILDA content type may vary by request headers. A consumer should sniff the content type rather than trust the extension.

### Gaps
- Hotlink behavior with a browser Referer from another site was not tested. Only no-Referer curl was tested, as specified.

## Which hosts serve the images?

### Takeaway
There are seven image hosts. All belong to the brand or, for Axon, to goBILDA.

### Cited Findings
- `andymark.com` (AndyMark Shopify store files via `/cdn/shop/files/`; mirror `cdn.shopify.com/s/files/1/0644/2303/5052/`) — [AndyMark](https://andymark.com/products/neverest-orbital-gearmotors)
- `www.pitsco.com` (Pitsco Shopify files; mirror `cdn.shopify.com/s/files/1/0869/9363/3572/`) — [Pitsco](https://www.pitsco.com/products/tetrix-channels)
- `cdn11.bigcommerce.com/s-x56mtydx1w/` (goBILDA's BigCommerce store CDN), used for Axon — [goBILDA](https://www.gobilda.com/axon-mini-servo-mk2/)
- `limelightvision.io` (Shopify files; mirror `cdn.shopify.com/s/files/1/2478/0822/`) — [Limelight](https://limelightvision.io/products/limelight-3a)
- `resource.logitech.com` and `resource.logitechg.com` (Logitech's Cloudinary-fronted asset hosts) — [C270](https://www.logitech.com/en-us/shop/p/c270-hd-webcam.960-000694), [F310](https://www.logitechg.com/en-us/shop/p/f310-gamepad.940-000110)
- `gmedia.playstation.com` (Sony's Scene7 image server) — [PlayStation](https://www.playstation.com/en-us/accessories/dualshock-4-wireless-controller/)
- Alternative, not used as primary: `cdn.shopify.com/s/files/1/0657/9182/0008/` (the axon-robotics.com store) — [axon-robotics.com](https://axon-robotics.com/products/max)
- Blocked: `www.studica.com`, `studica.com`, `www.studica.co`, `www.studica.ca` and `docs.studica.com` all return 403 behind a Cloudflare challenge. — [Studica](https://www.studica.com/Multi-Mode-Smart-Servo)

### Inferences
- If the site needs to self-host these images, Studica is the only brand whose images cannot be fetched by a script from this environment.

### Gaps
- None beyond Studica.
