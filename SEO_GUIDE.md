# SEO Optimization Guide

This project utilizes Next.js App Router for robust SEO management.

## 1. Global Metadata
Global metadata (Title, Description, Open Graph, Twitter Cards) is configured in `frontend/src/app/layout.tsx` using the `metadata` object.

## 2. Dynamic Content & JSON-LD
Structured data (JSON-LD) is injected directly into page components, as seen in `frontend/src/app/page.tsx`, to improve search engine understanding of the page content.

## 3. SEO-Critical Files
- `frontend/src/app/robots.ts`: Defines search engine crawler rules.
- `frontend/src/app/sitemap.ts`: Provides search engines with a map of the site.

## 4. Best Practices
- **Canonical URLs**: Ensure canonical tags point to the preferred version of the URL in `layout.tsx`.
- **Image Alt Text**: Always provide meaningful `alt` text for images (via components).
- **Semantic HTML**: Maintain logical heading structure (H1-H6) and use semantic tags (`nav`, `main`, `footer`, `section`).
