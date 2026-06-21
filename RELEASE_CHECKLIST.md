# Release Checklist

## 1. Production Build Validation
- [ ] Run `npm run build` locally and ensure it succeeds.
- [ ] Verify no critical lint errors.

## 2. Environment Configuration
- [ ] All required environment variables are defined in the production dashboard.

## 3. Security Readiness
- [ ] `robots.txt` is configured correctly.
- [ ] Ensure no sensitive information is logged.
- [ ] Dependencies audited (`npm audit`).

## 4. SEO Readiness
- [ ] Sitemap is accessible (`/sitemap.xml`).
- [ ] All pages have unique metadata and canonical URLs.
- [ ] Structured data (JSON-LD) is valid (test via Google Structured Data Tool).

## 5. Post-Deployment
- [ ] Verify custom domain and SSL certificate.
- [ ] Check Google Analytics tracking.
- [ ] Perform a final smoke test on the live site.
