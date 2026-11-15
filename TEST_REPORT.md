# Test Report — Initial Static Checks

**Date:** 2026-11-15  
**Branch inspected:** main  
**Commit inspected:** eda1555d972e673851f72874973920fecff165e4  
**Test type:** Automated source/tree inspection only

## Executed checks

| Test | Expected result | Actual result | Status | Fix applied |
|---|---|---|---|---|
| Fetch recursive repository tree | Complete tree | 18 entries; not truncated | PASS | None |
| Required project files | HTML, CSS, JS, README and Pages workflow exist | All found | PASS | None |
| Internal anchor references | Every #target has matching ID | 13 references resolve | PASS | None |
| Local asset references | Every local src path exists | 10 references resolve | PASS | None |
| Product inventory | Five product cards | Five found | PASS | None |
| Language switch source | English/Marathi attributes and toggle exist | Found; 78 data-en attributes | PASS | None |
| Language persistence | Selected language survives refresh | No persistence mechanism | FAIL | Pending |
| Contact form | Working form and verified backend | No form markup/backend | NOT IMPLEMENTED | No false success shown |
| Canonical / Open Graph | Metadata present | Not found | FAIL | Pending |
| Sitemap / robots | Both files present | Neither found | FAIL | Pending |
| Typography hierarchy | No blanket forced font override | Universal 16px !important rule found | FAIL | Pending |
| Basic mobile-menu ARIA | Expanded state is exposed and updated | aria-expanded and aria-controls present | PASS | None |

## Not yet executed

The following require a real browser/device or a dedicated test environment. No pass is claimed:

- Playwright end-to-end interaction tests.
- 320, 375, 390, 430, 768, 1024, 1366 and 1920 pixel viewport tests.
- Mobile menu click, keyboard, Escape and focus tests.
- English/Marathi visual and translation review.
- Contact links opened on actual mobile devices.
- Browser console/network errors and 404 checks.
- Image decoding and visual crop checks.
- Lighthouse performance, accessibility, best-practices and SEO scores.
- TLS/certificate chain and security-header inspection.
- Production build (the project is static and has no build command).
- HIOX hosting tests or deployment/rollback tests.

## Overall

**Static source checks:** 7 PASS, 4 FAIL, 1 NOT IMPLEMENTED.  
**Browser/runtime test coverage:** Pending.  
**Production readiness:** Not yet certified. Do not interpret the successful GitHub Pages workflow as proof that every user interaction or viewport has passed.
