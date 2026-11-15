# Website Audit — Initial Repository Review

**Project:** HELIO HERITAGE FOODS  
**Repository:** https://github.com/helioheritagefoods/helio-heritage-foods  
**Reviewed branch:** main  
**Reviewed commit:** eda1555d972e673851f72874973920fecff165e4  
**Review date:** 2026-11-15  
**Status:** Initial source inspection and static checks complete; browser/device, Lighthouse and security runtime checks remain pending.

## 1. Architecture and inventory

- Static, single-page website built with HTML, CSS and vanilla JavaScript.
- Entry point: `index.html`.
- Stylesheets: `styles.css` and `polish.css`.
- Interaction code: `script.js`.
- Assets: local logo and seven editorial/product photographs, plus image-credit documentation.
- Deployment workflow: `.github/workflows/pages.yml`, publishing the repository root with GitHub Pages Actions.
- No package manifest, build tool, framework, router, unit-test runner or browser-test suite is present.
- The repository tree contains 18 entries and is not truncated.

## 2. Existing functionality

- Single-page sections: hero, products, about, values, quality process, audiences served, contact and footer.
- Five product cards: turmeric, red chilli, coriander, cumin and Kolhapuri spice blends.
- English/Marathi text switching using `data-en` and `data-mr` attributes.
- Responsive navigation menu with `aria-expanded` state.
- In-page navigation anchors, email links, telephone links, Google Maps search link and WhatsApp link.
- Dynamic footer year.
- Local image assets and lazy loading on below-the-fold images.

## 3. Findings

### Critical / high priority

1. **Contact details require owner confirmation.** The source contains the email `helioheritagefoods@gmail.com` and phone/WhatsApp number `+91 94051 18424`. The master brief says not to invent phone numbers. Confirm the number is owned by the business and approved for public display before retaining it.
2. **Universal typography override.** The final rule in `polish.css` applies `font-size:16px!important` and `line-height:1.5!important` to every element. It overrides the carefully defined heading, caption, navigation and body type scale and can enlarge small labels/icons unexpectedly. Remove this blanket rule and use semantic component-specific sizes.
3. **Language preference is not persisted.** `script.js` resets to English on each page load; no localStorage, cookie or other preference persistence exists.
4. **Marathi coverage is incomplete.** Most text has paired translation attributes, but product headings and some fixed labels are not switched consistently. Add translation coverage and verify every visible string in both languages.
5. **No enquiry form or form backend exists.** Contact is currently via email, phone and WhatsApp links only. Do not present a form as working unless a secure backend/service is configured and tested.

### SEO / discoverability

- A title and meta description exist.
- No canonical URL, Open Graph metadata, sitemap.xml, robots.txt or favicon was found in the repository tree.
- No LocalBusiness/Organization structured data was found in the inspected HTML.
- Add these using verified business details only. Do not add ratings, opening hours, phone numbers or registration identifiers without owner confirmation.

### Accessibility and interaction

- Skip link, semantic header/nav/main/footer, image alt text and basic mobile-menu ARIA state are present.
- Mobile menu currently closes after a navigation link is selected.
- Further checks needed: keyboard-only operation, focus visibility/order, escape-to-close, screen-reader announcement, Marathi reading and contrast.
- Product card titles are not fully translated by the language toggle.

### Performance

- Product and editorial images are stored locally, avoiding runtime image-provider dependencies.
- The logo and some editorial images are relatively large; image dimensions and modern-format variants should be assessed before optimisation.
- Google Fonts are loaded from fonts.googleapis.com; confirm graceful fallback and measure their impact.
- No Lighthouse or Core Web Vitals measurement has been run. Performance scores are therefore **not measured**.

### Security / privacy

- Static source inspection found no contact form or frontend API credentials.
- No backend or server-side validation exists in this repository.
- Google Maps and WhatsApp links open external services; external links use `noopener noreferrer` where a new tab is requested.
- A complete dependency/security scan is not applicable yet because no package manifest or dependency lockfile exists. Hosting headers, TLS configuration and GitHub settings were not changed or independently audited.

## 4. Static checks executed

| Check | Result |
|---|---|
| Repository tree retrieved without truncation | PASS |
| Required HTML/CSS/JS/README/Pages workflow files exist | PASS |
| 13 in-page anchor references resolve to existing IDs | PASS |
| 10 local image/script references exist in repository tree | PASS |
| Five product cards found | PASS |
| English/Marathi data attributes and language toggle found | PASS |
| Language persistence | FAIL — not implemented |
| Contact form/backend | NOT IMPLEMENTED |
| Canonical and Open Graph metadata | FAIL — not found |
| sitemap.xml and robots.txt | FAIL — not found |
| Global forced typography override | FAIL — found |
| Basic mobile menu ARIA state | PASS |

These are source-level checks only. They are not substitutes for browser tests.

## 5. Recommended implementation order

1. Confirm public phone/WhatsApp number.
2. Remove universal typography override and restore hierarchy.
3. Complete Marathi translation coverage and persist selected language.
4. Add canonical, Open Graph, favicon, sitemap, robots and verified structured data.
5. Improve accessibility and menu keyboard behaviour.
6. Optimise images after measuring actual dimensions and quality.
7. Add browser tests and run viewport checks at the widths specified in the project brief.
8. Run Lighthouse, security checks and a production build/deployment dry run.
9. Review changes in a non-production branch/preview before any production deployment.

## 6. Scope and safety

This initial audit does not modify the production branch, DNS, hosting settings or deployed website. The repository's current Pages workflow deploys on pushes to `main`; changes should remain on a separate branch until explicitly approved.
