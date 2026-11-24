# Official REV Robotics product photos for the FTC Silkroad catalog (74 parts)

Machine-readable output: `rev-images.json` (same folder), 74 keys, parsed OK with `python3 -c "import json; json.load(open(...))"`. Research date: 2026-11-24. All pages and images were fetched with plain curl from this machine (no Referer header).

## What is the direct, vendor-hosted URL of the main product image for each part?

### Takeaway
All 74 REV parts have a REV-hosted image that returned HTTP 200: 73 come from REV's revrobotics.com store (BigCommerce CDN), and the discontinued V1 Smart Robot Servo (rev-41-1097) comes from REV's own docs site. None are null.

### Cited Findings
- Method: all 59 unique catalog `url`s on revrobotics.com returned HTTP 200 (one redirect: `/Smart-servo-v2/` to `/smart-servo-v2`). On every page the `og:image` meta tag and the first (`slick-current`) item of the `productView-imageCarousel-main` gallery are the same file, e.g. Core Hex Motor og:image `.../products/195/images/2675/REV-41-1300_Core_Hex5_not_lm__05075.1661790332.500.500.png` and gallery `data-original-img` `.../stencil/608x608/products/195/2675/REV-41-1300_Core_Hex5_not_lm__05075...png` — [Core Hex Motor](https://www.revrobotics.com/rev-41-1300/)
- For single-product pages, the URL recorded is the page's own `640w` srcset entry for that first gallery image (copied verbatim from the HTML, not constructed) — [example: Control Hub](https://www.revrobotics.com/rev-31-1595/)
- For parts sold as an option on a grouped page, the URL recorded is the variant image REV's store returns for that SKU (see the grouped-pages question below).
- Per-part results (src = `main` for the page's main gallery image, `variant` for a SKU-specific store image, `docs` for the docs site):

| part id | REV page | src | shared group image? | fetch result | image URL |
|---|---|---|---|---|---|
| rev-41-1300 | [page](https://www.revrobotics.com/rev-41-1300/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/195/2675/REV-41-1300_Core_Hex5_not_lm__05075.1661790332.png?c=2 |
| rev-41-1291 | [page](https://www.revrobotics.com/REV-41-1291/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/597/3613/HD_Hex_HERO_FINAL__95404.1761255494.png?c=2 |
| rev-41-1301 | [page](https://www.revrobotics.com/rev-41-1301/) | main | no | 200 image/webp 640x652 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/594/2931/Lone_HDHex-New_Sticker-noflag__98232.1659470612.png?c=2 |
| rev-41-1601 | [page](https://www.revrobotics.com/rev-41-1601/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/480/1339/UltraPlanetary_Cartridge_Laying_Down__37922.1618525009.png?c=2 |
| rev-41-1602 | [page](https://www.revrobotics.com/rev-41-1602/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/481/1342/UltraPlanetary_Cartridge_Laying_Down__58665.1565907803.png?c=2 |
| rev-41-1603 | [page](https://www.revrobotics.com/rev-41-1603/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/482/1345/UltraPlanetary_Cartridge_Laying_Down__17448.1613072762.png?c=2 |
| rev-41-1600 | [page](https://www.revrobotics.com/rev-41-1600/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/479/2739/Ultraplanetary-noflag-FINAL__33728.1650563601.png?c=2 |
| rev-41-1097 | [page](https://docs.revrobotics.com/duo-build/motion/servos/smart-robot-servo) | docs | no | 200 image/png 685x382 | (GitBook proxy URL, see JSON) |
| rev-41-3334 | [page](https://www.revrobotics.com/Smart-servo-v2/) | variant | no | 200 image/jpeg 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2408_source_1752704514.jpg |
| rev-41-3336 | [page](https://www.revrobotics.com/Smart-servo-v2/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2409_source_1752680026.jpg |
| rev-31-1595 | [page](https://www.revrobotics.com/rev-31-1595/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/391/2736/IMG_20170502_154043_not_lm__25913.1650563042.png?c=2 |
| rev-31-1596 | [page](https://www.revrobotics.com/rev-31-1596/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/598/2741/REV-31-1596-Driver_Hub-Iso_View-FINAL__03867.1650564025.png?c=2 |
| rev-31-1153 | [page](https://www.revrobotics.com/rev-31-1153/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/216/2784/Expansion_Hub_One-noflag__63205.1650572103.png?c=2 |
| rev-11-1855 | [page](https://www.revrobotics.com/rev-11-1855/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/834/3472/REV-11-1855-Servo_Hub-FINAL__22851.1736875921.png?c=2 |
| rev-11-1144 | [page](https://www.revrobotics.com/rev-11-1144/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/209/2764/ServoPowerModuleAngled-800-Web__59220.1650570152.png?c=2 |
| rev-31-1108 | [page](https://www.revrobotics.com/rev-31-1108/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/116/634/REV-31-1108-1__84485.1603470088.JPG?c=2 |
| rev-31-1387 | [page](https://www.revrobotics.com/rev-31-1387/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/256/2679/REV-31-1387-Switch-Cable-and-Bracket-1-NoFlag-FINAL__58356.1650554802.png?c=2 |
| rev-31-1293 | [page](https://www.revrobotics.com/rev-31-1293/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/341/2695/XT30_Power_Distribution_Block_Hero_noflag__79425.1650555542.png?c=2 |
| rev-31-1505 | [page](https://www.revrobotics.com/rev-31-1505/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/340/2734/2M_Distance_Sensor__87798.1650562207.png?c=2 |
| rev-31-3332 | [page](https://www.revrobotics.com/rev-31-3332/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/848/3367/REV-31-3332-9AxisIMU-HERO-FINAL__79949.1731351709.png?c=2 |
| rev-31-1557 | [page](https://www.revrobotics.com/rev-31-1557/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/507/2717/Color_Sensor_V2__58545.1650559332.png?c=2 |
| rev-31-1462 | [page](https://www.revrobotics.com/rev-31-1462/) | main | no | 200 image/webp 640x643 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/285/2690/Lone_Hall_Sensor__00715.1650555551.png?c=2 |
| rev-11-1271 | [page](https://www.revrobotics.com/rev-11-1271/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/404/1487/Through_Bore_Encoder_Both_Shots_Sml__30025.1574098624.png?c=2 |
| rev-11-3174 | [page](https://www.revrobotics.com/rev-11-3174/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/910/3574/REV-11-3174-ThroughBoreEncoderV2_HERO_FINAL__64112.1763159842.png?c=2 |
| rev-31-1425 | [page](https://www.revrobotics.com/rev-31-1425/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/242/2785/Button_Sensor_REV-31-1425_2_not_lm__15755.1650572167.png?c=2 |
| rev-31-1302 | [page](https://www.revrobotics.com/rev-31-1302/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/193/2367/REV-31-1302-12VSlimBattery-New-FINAL__87390.1636579008.png?c=2 |
| rev-31-1299 | [page](https://www.revrobotics.com/12V-Slim-Battery-Accessories/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2542_source_1778527744.jpg |
| rev-31-1876 | [page](https://www.revrobotics.com/rev-31-1876/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/609/2179/REV-31-1876---Driver-Hub-Battery-FINAL__71069.1631043369.png?c=2 |
| rev-41-1431-pk2 | [page](https://www.revrobotics.com/15mm-extrusions/) | variant | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2475_source_1757624016.jpg |
| rev-41-1432-pk4 | [page](https://www.revrobotics.com/15mm-extrusions/) | variant | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2476_source_1757624016.jpg |
| rev-41-1480-pk8 | [page](https://www.revrobotics.com/15mm-Metal-Brackets/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1181_source_1689565457.png |
| rev-41-1433-pk4 | [page](https://www.revrobotics.com/15mm-Metal-Motion-Brackets/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1438_source_1689565524.png |
| rev-41-1487-pk4 | [page](https://www.revrobotics.com/15mm-Metal-Motion-Brackets/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1478_source_1689565534.png |
| rev-41-1479-pk8 | [page](https://www.revrobotics.com/15mm-corner-brackets/) | variant | no | 200 image/webp 640x641 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2434_source_1756844719.png |
| rev-41-1305-pk8 | [page](https://www.revrobotics.com/15mm-Plastic-Brackets/) | variant | no | 200 image/jpeg 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1081_source_1689565431.jpg |
| rev-41-1747 | [page](https://www.revrobotics.com/45mm-u-channels/) | variant | yes | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2461_source_1757365882.png |
| rev-41-1742 | [page](https://www.revrobotics.com/45mm-u-channels/) | variant | yes | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2463_source_1757365882.png |
| rev-41-1366-pk5 | [page](https://www.revrobotics.com/rev-41-1366-pk5/) | main | no | 200 image/jpeg 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/202/748/REV-41-1366-1__24852.1615482297.JPG?c=2 |
| rev-41-1365 | [page](https://www.revrobotics.com/rev-41-1365/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/203/749/REV-41-1365-1__17582.1472785904.JPG?c=2 |
| rev-41-1349-pk4 | [page](https://www.revrobotics.com/5mm-Hex-Shafts/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/723/2895/REV-41-0000-5mm-Hex-Shafts-Hero-FINAL__26864.1654542780.png?c=2 |
| rev-41-1362-pk4 | [page](https://www.revrobotics.com/5mm-Hex-Shafts/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/723/2895/REV-41-0000-5mm-Hex-Shafts-Hero-FINAL__26864.1654542780.png?c=2 |
| rev-41-1347-pk4 | [page](https://www.revrobotics.com/5mm-Hex-Shafts/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/723/2895/REV-41-0000-5mm-Hex-Shafts-Hero-FINAL__26864.1654542780.png?c=2 |
| rev-41-1147-pk2 | [page](https://www.revrobotics.com/rev-41-1147-pk2/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/217/802/REV-41-1147_High_Strength_Hex_Adapter2__41896.1615482340.png?c=2 |
| rev-41-1717 | [page](https://www.revrobotics.com/DUO-25-metal-sprockets/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2466_source_1757615648.png |
| rev-41-1720 | [page](https://www.revrobotics.com/DUO-25-metal-sprockets/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2467_source_1757615648.png |
| rev-41-1331-pk8 | [page](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1482_source_1757613917.png |
| rev-41-1332-pk4 | [page](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1483_source_1757613917.png |
| rev-41-1334-pk4 | [page](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1484_source_1757613917.png |
| rev-41-1335-pk4 | [page](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1485_source_1757613917.png |
| rev-41-1337-pk2 | [page](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1487_source_1757613917.png |
| rev-41-1329-pk12 | [page](https://www.revrobotics.com/Through-Bore-Bearings/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1228_source_1689565471.png |
| rev-41-1326-pk12 | [page](https://www.revrobotics.com/Through-Bore-Bearings/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1224_source_1689565470.png |
| rev-45-1655 | [page](https://www.revrobotics.com/rev-45-1655/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/453/1399/75mm_Mecanum_Wheel_Set_4_Wheels__36318.1788291024.png?c=2 |
| rev-41-1267 | [page](https://www.revrobotics.com/rev-41-1267/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/344/1192/90mm_Grip_Wheel__30858.1533945208.png?c=2 |
| rev-41-1160-pk2 | [page](https://www.revrobotics.com/DUO-Omni-Wheels/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1118_source_1689565439.png |
| rev-41-1190-pk2 | [page](https://www.revrobotics.com/DUO-Omni-Wheels/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1124_source_1689565440.png |
| rev-41-1354-pk2 | [page](https://www.revrobotics.com/DUO-Traction-Wheels/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1410_source_1689565517.png |
| rev-45-1900 | [page](https://www.revrobotics.com/rev-45-1900/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/542/2963/REV-45-1900-15mm-Extrusion-Lift-Kit-FINAL-09-27-2022__82718.1664292467.png?c=2 |
| rev-45-1507 | [page](https://www.revrobotics.com/rev-45-1507/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/347/1199/Linear_Motion__71955.1533944999.png?c=2 |
| rev-41-1323-pk12 | [page](https://www.revrobotics.com/5mm-Hex-Spacers/) | variant | no | 200 image/png 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/1138_source_1689565444.png |
| rev-45-1905 | [page](https://www.revrobotics.com/rev-45-1905/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/552/1704/M3_Hardware_Bundle_V3__29076.1603470270.png?c=2 |
| rev-41-1361-pk100 | [page](https://www.revrobotics.com/M3-Nuts/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2546_source_1778681905.jpg |
| rev-41-1490-pk4 | [page](https://www.revrobotics.com/M3-Standoffs/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/707/2862/REV-41-1489-M3_Standoff-Hero-FINAL__97606.1653061938.png?c=2 |
| rev-41-1360-pk100 | [page](https://www.revrobotics.com/M3-Hex-Cap-Screws/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/722/2894/M3x10mm_Hex_Cap_Screws_Pack_Photo_From_Bundle_Shot__18790.1614451259.1280.1280__98672.1654289750.png?c=2 |
| rev-41-1359-pk100 | [page](https://www.revrobotics.com/M3-Hex-Cap-Screws/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/722/2894/M3x10mm_Hex_Cap_Screws_Pack_Photo_From_Bundle_Shot__18790.1614451259.1280.1280__98672.1654289750.png?c=2 |
| rev-41-1907-pk25 | [page](https://www.revrobotics.com/rev-41-1907-pk25/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/536/1624/REV-41-1907_M3_X_8mm_T-Slot_Screw-2__07783.1595265762.png?c=2 |
| rev-31-1815 | [page](https://www.revrobotics.com/rev-31-1815/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/513/1542/JST_PH_6-Pin_to_JST_PH_4-Pin_Cable_50cm__22889.1578591885.png?c=2 |
| rev-31-1417-pk2 | [page](https://www.revrobotics.com/JST-PH-3-Pin-Communication-Cables/) | main | yes | 200 image/webp 640x613 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/363/1223/JST_PH_3-Pin_Comm__91198.1618525045.jpg?c=2 |
| rev-31-1407-pk4 | [page](https://www.revrobotics.com/JST-PH-4-pin-Sensor-Cables/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/263/876/JST_PH_4pin_30cm_REV-31-1407__92491.1613072598.png?c=2 |
| rev-31-1412-pk4 | [page](https://www.revrobotics.com/JST-VH-2-pin-Motor-Cables/) | main | yes | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/265/2345/REV-31-1413-JSTVH-Hero-FINAL__66749.1636397287.png?c=2 |
| rev-11-1130-pk4 | [page](https://www.revrobotics.com/PWM-Cables/) | variant | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/attribute_rule_images/2536_source_1778258226.jpg |
| rev-31-1392-pk2 | [page](https://www.revrobotics.com/XT30-Extension-Cables/) | main | yes | 200 image/jpeg 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/267/905/XT30_extension__07089.1603473877.jpg?c=2 |
| rev-45-1882 | [page](https://www.revrobotics.com/rev-45-1882/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/593/1869/REV-45-1882-Allen-Wrench-Pack-FINAL__44020.1614353715.png?c=2 |
| rev-31-2983 | [page](https://www.revrobotics.com/rev-31-2983/) | main | no | 200 image/webp 640x640 | https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/640w/products/829/3518/REV-31-2983-REVUSBPS4CompatibleGamepad-Hero-FINAL-new__77925.1753717119.png?c=2 |

### Inferences
- For parts with their own product page, og:image and the first gallery image are the same photo, so either method gives the same "main" photo; the JSON uses the larger stencil rendition, not the 500x500 og:image rendition.

### Gaps
- I did not look at each of the 73 store images by eye. Identification relies on REV's page structure and on SKU-matched variant data. The one image I did view is the V1 servo from the docs.

## Does each image URL return HTTP 200 with an image content type (curl, no Referer)?

### Takeaway
Yes, all 74 return HTTP 200 with an `image/*` content type and no Referer. The BigCommerce CDN often serves WebP even when the URL ends in `.png` or `.jpg`.

### Cited Findings
- 74/74 final URLs returned 200. Content types: mostly `image/webp`; some `image/png` and `image/jpeg` (e.g. rev-41-1366-pk5, rev-31-1392-pk2, rev-41-3334 jpeg; bracket/sprocket/U-channel variant images png). The CDN returned WebP for a `.jpg` URL even with `Accept: image/png`, so the format is chosen server-side. — [BigCommerce CDN, REV store](https://www.revrobotics.com/15mm-extrusions/)
- Measured pixel sizes of the 640w renditions: all 640 px wide; heights 613 to 652 (mostly 640x640). The docs image for rev-41-1097 is 685x382 PNG. — [REV docs SRS page](https://docs.revrobotics.com/duo-build/motion/servos/smart-robot-servo)
- The og:image (legacy `...500.500.png`) rendition also returned 200 `image/png`, 500x500 (checked on rev-41-1300 and rev-41-1431-pk2). — [Core Hex Motor](https://www.revrobotics.com/rev-41-1300/)

### Inferences
- Consumers should not infer the format from the file extension. Hotlinking works without a Referer header, but self-hosting copies would remove the dependency on the CDN.

### Gaps
- Status was checked once (2026-11-24). Long-term URL stability was not tested. BigCommerce URLs embed a timestamp/version (e.g. `__05075.1661790332`, `?c=2`), so a re-uploaded photo gets a new URL.

## Which CDN host(s) serve the images, and is there a size parameter giving ~600–800 px wide images?

### Takeaway
Every store image comes from one host, `cdn11.bigcommerce.com` (store hash `s-t3eo8vwp22`), and the stencil path segment sets the size. `640w` gives 640 px wide images, and 608x608 and 960w are also on the pages. The docs image comes from `docs.revrobotics.com/~gitbook/image`, which takes a `width=` parameter.

### Cited Findings
- Across all 59 product pages, every image reference uses `https://cdn11.bigcommerce.com/s-t3eo8vwp22` (8,770 occurrences, no other image host). — [REV store pages, e.g. 15mm Extrusions](https://www.revrobotics.com/15mm-extrusions/)
- URL pattern: `https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/<SIZE>/products/<productId>/<imageId>/<file>?c=2`. Size tokens found in page HTML: `80w, 160w, 320w, 430w, 640w, 960w, 1280w, 1920w, 2560w` (srcset), plus fixed boxes `608x608` (main gallery `data-original-img`), `590x590`, `1500x1500` (zoom), `80x80`, `215x72`. — [Core Hex Motor](https://www.revrobotics.com/rev-41-1300/)
- `640w` produced 640 px wide output for all 73 store images; `608x608` is what the gallery shows by default; `960w` is the next size up. — measured from [REV CDN](https://www.revrobotics.com/rev-41-1300/)
- The og:image uses the legacy BigCommerce path `/products/<id>/images/<imageId>/<file>.500.500.png` (500x500). — [Core Hex Motor](https://www.revrobotics.com/rev-41-1300/)
- Variant images use `https://cdn11.bigcommerce.com/s-t3eo8vwp22/images/stencil/{:size}/attribute_rule_images/<ruleId>_source_<ts>.<ext>`. The store's variant endpoint returns the `{:size}` placeholder and the theme substitutes a size; I substituted `640w`. — [REV store variant data, e.g. 15mm Extrusions](https://www.revrobotics.com/15mm-extrusions/)
- The docs image is served via `https://docs.revrobotics.com/~gitbook/image?url=...&width=768&dpr=1&quality=100&sign=...`. Its srcset offers width=400/768 with dpr 1–3. The source is 685 px wide, so width=768 returns 685x382. — [REV docs SRS page](https://docs.revrobotics.com/duo-build/motion/servos/smart-robot-servo)

### Inferences
- Swapping `640w` for `960w` in a recorded URL should give a larger rendition, since both tokens appear on every page. I only fetched 640w for this mapping.

### Gaps
- The GitBook docs URL carries a `sign=` signature. I did not test whether it survives a docs republish.

## Grouped product pages: variant-specific image or only a shared group image?

### Takeaway
Of the 37 catalog parts that are options on a grouped page (SKU found in an option label), 27 have a SKU-specific variant image in REV's store data. Ten have only the shared group photo: 5mm hex shafts ×3, M3 standoff, M3 hex cap screws ×2 and the JST/XT30 cables ×4. Some "variant" images are byte-identical across variants (extrusions, U channels), and the three UltraPlanetary cartridges share one photo across separate pages. In total 17 parts are flagged `shared_variant_image: true`.

### Cited Findings
- How variant images were found: each grouped page lists options with the SKU in the label, e.g. `15mm Extrusion - 225mm - 90° Ends - 2 Pack (REV-41-1431-PK2)`. The page's own JS POSTs the selection to the store endpoint `https://www.revrobotics.com/remote/v1/product-attributes/<product_id>`. For product 908 with option 2512 it returned `sku: REV-41-1431-PK2` and `image.data: .../attribute_rule_images/2475_source_1757624016.jpg`. Every part's returned `sku` matched the catalog SKU. — [15mm Extrusions](https://www.revrobotics.com/15mm-extrusions/)
- SKU-specific variant images were found for: Smart Robot Servo V2 Balanced/UltraSpeed, 12V Slim Battery charger, 15mm extrusions (225/420), 15mm metal 90° bracket, Core Hex and HD Hex bent motor brackets, inside corner bracket, plastic 90° bracket, 45mm U channels (248/408), #25 metal sprockets 15T/20T, plastic gears 15/30/45/60/90T, through bore bearings long/short, omni wheels 60/90mm, traction wheel 90mm, 5mm hex spacer 15mm, M3 nyloc nuts, PWM cable 36in — [e.g. Plastic Hex Bore Gears](https://www.revrobotics.com/5mm-Plastic-Hex-Bore-Gears/), [DUO Omni Wheels](https://www.revrobotics.com/DUO-Omni-Wheels/), [Smart Robot Servos V2](https://www.revrobotics.com/Smart-servo-v2/)
- No variant image (endpoint returned `image: null`), so only the group image is available: 5mm hex shafts 75/135/400mm (group hero `REV-41-0000-5mm-Hex-Shafts-Hero-FINAL`), M3 standoff 25mm (hero filename `REV-41-1489-M3_Standoff`), M3 x8/x16 hex cap screws (photo filename `M3x10mm_Hex_Cap_Screws...`), JST PH 3-pin, JST PH 4-pin, JST VH 2-pin and XT30 cables — [5mm Hex Shafts](https://www.revrobotics.com/5mm-Hex-Shafts/), [M3 Standoffs](https://www.revrobotics.com/M3-Standoffs/), [M3 Hex Cap Screws](https://www.revrobotics.com/M3-Hex-Cap-Screws/), [JST VH](https://www.revrobotics.com/JST-VH-2-pin-Motor-Cables/)
- Byte-identical images despite different URLs (SHA-1 of the downloaded files): 15mm extrusion 225mm and 420mm variant images (rules 2475 and 2476); 45mm U channel 248mm and 408mm (rules 2461 and 2463); UltraPlanetary cartridges 3:1, 4:1 and 5:1 (three separate product pages, same `UltraPlanetary_Cartridge_Laying_Down` photo). I flagged these as shared too. — [15mm Extrusions](https://www.revrobotics.com/15mm-extrusions/), [45mm U Channels](https://www.revrobotics.com/45mm-u-channels/), [Cartridge 3:1](https://www.revrobotics.com/rev-41-1601/)
- Filename hints for shared images: the JST PH 4-pin group photo is named `JST_PH_4pin_30cm_REV-31-1407`, matching the catalog's 30cm variant. The JST VH hero is named `REV-31-1413` and the M3 standoff hero `REV-41-1489`, which are different SKUs from the catalog parts (REV-31-1412, REV-41-1490). — [JST PH 4-pin](https://www.revrobotics.com/JST-PH-4-pin-Sensor-Cables/), [M3 Standoffs](https://www.revrobotics.com/M3-Standoffs/)
- Some single-SKU pages also have option fields (rev-41-1600, rev-31-1596, rev-31-1557, rev-11-1271, rev-41-1365, rev-45-1507), but the catalog SKU is not among the option labels. These look like add-on or kit options, so the main image is used and these are not flagged shared. — [UltraPlanetary Kit](https://www.revrobotics.com/rev-41-1600/)

### Inferences
- If the site needs visually distinct photos, the 17 shared parts will look the same as their siblings. That includes the three UltraPlanetary cartridges, which REV sells on separate pages but shows with one photo.

### Gaps
- Smart Robot Servos V2 has two option sets. I sent only the SKU option; the endpoint still returned the correct SKU and an image.

## rev-41-1097 (Smart Robot Servo V1, discontinued, url null)

### Takeaway
There is no store page, but REV's own docs site has a REV photo of the V1 Smart Robot Servo on a page that names it as REV-41-1097. The image returned HTTP 200 `image/png`, 685x382.

### Cited Findings
- `https://www.revrobotics.com/rev-41-1097/` and `/REV-41-1097/` both return 404 ("REV Robotics - Not Found"), so no archived product page exists on REV's store. — [revrobotics.com](https://www.revrobotics.com/rev-41-1097/)
- The REV DUO docs page "Smart Robot Servo" says: "The REV Robotics Smart Robot Servo (SRS) (REV-41-1097) is a configurable metal-geared servo…". Its only content image is `uploads/fwp3XUN2kdEREt4RvYfq/image.png`. I viewed it: a black servo labelled "REV ROBOTICS SMART ROBOT SERVO" with a white/black lead and a brass output spline. — [REV Docs: Smart Robot Servo](https://docs.revrobotics.com/duo-build/motion/servos/smart-robot-servo)
- Recorded URL (width=768, dpr=1 srcset entry, copied from the page): `https://docs.revrobotics.com/~gitbook/image?url=https%3A%2F%2F756878072-files.gitbook.io%2F...%2Ffwp3XUN2kdEREt4RvYfq%252Fimage.png...&width=768&dpr=1&quality=100&sign=e1e2a0fc91017fab3ccfea88f5f65a0b&sv=3` (full URL in JSON). It returned 200 `image/png` without a Referer. — [REV Docs](https://docs.revrobotics.com/duo-build/motion/servos/smart-robot-servo)

### Inferences
- The image is served through REV's docs domain, but the underlying file lives in GitBook storage (`gitbook-x-prod.appspot.com`). It is REV-published content, not a reseller's.

### Gaps
- This is a docs illustration, not a store gallery photo: it is landscape (685x382) and has a lower resolution than the store images.
