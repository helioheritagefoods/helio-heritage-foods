# Changelog

## 2026-11-15 — Initial website audit

- Inspected the existing repository tree and source files on `main`.
- Documented architecture, existing functionality, deployment workflow and static source-check results in `WEBSITE_AUDIT.md`.
- Recorded passed, failed and not-implemented checks in `TEST_REPORT.md`.
- Documented the current GitHub Pages workflow, safe branch process and HIOX verification caveat in `DEPLOYMENT_GUIDE.md`.
- No production source files, DNS records, hosting settings or live deployment were changed.


## 2026-11-17 — Product ordering and local SEO improvements

- Added pack-size information and product-specific WhatsApp order actions to all five product cards.
- Added English/Marathi pre-filled messages for product and buyer-type enquiries.
- Highlighted Kolhapuri Spice Blends as the Signature Blend.
- Added direct WhatsApp enquiry actions for grocery stores, restaurants/caterers and households.
- Replaced the Organization JSON-LD with LocalBusiness structured data using the existing published business contact and address details.
- Ensured all images have descriptive alt text and lazy loading, except the priority-loaded hero image.
- Added focused source-level checks to TEST_REPORT.md; live browser and device testing remain pending.


## 2026-11-17 — Kitchen pairings and quick enquiry builder

- Added a five-spice Kitchen Pairings & Usage Guide after The Spice Shelf, with English and Marathi cooking ideas.
- Added a frontend-only Quick Enquiry Builder in the Contact section for buyer type, selected spices, pack sizes and optional delivery location.
- Added a WhatsApp message generator that encodes the enquiry and opens the existing business WhatsApp number.
- Added responsive styles matching the current cream, red, green and turmeric palette; no external libraries or backend services were introduced.
- Recorded source-level checks in TEST_REPORT.md. Browser/device and assistive-technology testing remain pending.
