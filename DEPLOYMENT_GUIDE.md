# Deployment Guide

## Current repository deployment

The inspected repository contains `.github/workflows/pages.yml`. It deploys the repository root to GitHub Pages when a commit is pushed to `main`, or when manually dispatched. The latest recorded workflow run on 2026-11-14 completed successfully.

The project is static HTML/CSS/JavaScript and has no package install or production build step.

## Safe development workflow

1. Make changes on a feature or audit branch, never directly on `main` during review.
2. Inspect the diff and run source checks plus browser tests.
3. Confirm contact details and all business claims with the owner.
4. Open a pull request and review the preview/test results.
5. Merge to `main` only after explicit production approval. A push to `main` triggers the current Pages workflow.

## GitHub Pages deployment

1. Open repository Settings → Pages.
2. Confirm the publishing source is GitHub Actions.
3. Confirm the configured custom domain is `helioheritagefoods.in` only if that is still the intended production domain.
4. Confirm DNS records at the domain registrar point to the current GitHub Pages configuration. Do not change DNS without approval.
5. Enable Enforce HTTPS only after GitHub reports the certificate is ready.
6. After an approved merge, check Actions → Deploy to GitHub Pages for a successful run.
7. Verify the custom domain over HTTPS, refresh the homepage and test all local links.

## HIOX hosting note

The repository's current deployment workflow is GitHub Pages. This does not establish that the website is hosted on HIOX cPanel. HIOX may be used for domain registration/DNS, but hosting-provider details must be verified from the account before giving cPanel-specific instructions. Do not upload files to HIOX or alter DNS based only on assumptions.

## Rollback

1. Identify the last known-good commit in GitHub.
2. Revert the faulty commit through a reviewed GitHub revert or restore the last known-good version on a separate branch.
3. Obtain owner approval before merging the rollback to `main`.
4. Confirm the Pages workflow succeeds and re-test the production domain.

## Environment and secrets

The current static site has no backend or environment variables. Never put credentials, private keys, mail-service secrets or API keys in frontend JavaScript or public repository files. If a form/backend is added later, keep secrets server-side and use provider-supported secret storage.
