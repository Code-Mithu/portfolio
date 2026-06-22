# SEO Optimization Guide

This project utilizes Next.js App Router for robust SEO management.

## 1. Global Metadata
Global metadata (Title, Description, Open Graph, Twitter Cards, Canonical URLs) is configured in `frontend/src/app/layout.tsx` using the `metadata` object. Ensure `metadataBase` is set to the production URL.

## 2. Structured Data (JSON-LD)
Schema.org structured data (JSON-LD) is injected into page components using a `@graph` structure in `frontend/src/app/page.tsx`. This includes `Person` and `WebSite` schemas to improve search engine understanding of the entity and site structure.

## 3. SEO-Critical Files
- `frontend/src/app/robots.ts`: Defines search engine crawler rules. Update this file to modify allowed/disallowed paths.
- `frontend/src/app/sitemap.ts`: Provides search engines with a map of the site. To add new pages, update the `routes` array within the `sitemap()` function.

## 4. Best Practices & Validation
- **Canonical URLs**: Automatically handled via `alternates` in `layout.tsx` or per-page metadata.
- **Image Alt Text**: Always provide meaningful `alt` text for images (via components).
- **Semantic HTML**: Maintain logical heading structure (H1-H6) and use semantic tags (`nav`, `main`, `footer`, `section`).
- **Validation**: 
  - Use [Google's Rich Results Test](https://search.google.com/test/rich-results) for structured data.
  - Use [Open Graph Debugger](https://developers.facebook.com/tools/debug/) for OG tags.
  - Run Lighthouse audit in Chrome DevTools to validate SEO and accessibility scores.
  - Validate the `sitemap.xml` by visiting `/sitemap.xml` in your browser.
  - Validate the `robots.txt` by visiting `/robots.txt` in your browser.
