# SEO Improvement Plan

## 1. Short-Term (Immediate)
- [ ] **Content Metadata**: Review and populate specific `title` and `description` fields for every new page added to the site.
- [ ] **Validation**: Periodically run the live site through Google's Rich Results Test and Open Graph Debugger to ensure structured data and social metadata are rendering correctly.
- [ ] **Monitoring**: Set up Google Search Console to monitor crawl errors, performance, and keyword indexing.

## 2. Mid-Term (Content Strategy)
- [ ] **Blog/Case Studies**: Implement a `/blog` or `/case-studies` section. This provides fresh, long-tail content, which is significantly better for SEO than a static portfolio.
- [ ] **Keywords**: Research industry-relevant keywords (e.g., "React Portfolio", "Frontend Engineer Case Studies") and naturally integrate them into project descriptions.

## 3. Long-Term (Advanced)
- [ ] **Granular Schema**: Enhance `Person` schema with more details, such as `knowsAbout` (skills), `alumniOf`, and `award` if applicable.
- [ ] **Page-Level SEO**: For high-traffic project pages, create individual `page.tsx` files instead of relying on modals, to allow for unique metadata, canonical URLs, and structured data per project.
- [ ] **Web Vitals**: Monitor Core Web Vitals in Google Search Console and refine image sizes or lazy loading if LCP/CLS metrics degrade.
