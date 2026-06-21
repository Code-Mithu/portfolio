# Improvement Recommendations, Technical Debt, & Roadmap

## 1. Improvement Recommendations
- **Images:** Add optimized images for projects and about section portraits.
- **Content:** Populate project details and experience responsibilities with real content.
- **Form Handling:** Replace simulated contact form submission with a backend service (e.g., EmailJS).

## 2. Technical Debt Report
- **Hardcoded Data:** Components currently contain hardcoded arrays for data (e.g., projects, skills). This should be moved to a CMS or a JSON API.
- **CSS:** While Tailwind is used, consider centralizing common design tokens in `tailwind.config.js` to ensure total design consistency.

## 3. Future Enhancement Roadmap
- **Q3 2026:** Integrate Contentful or Sanity CMS for dynamic content management.
- **Q4 2026:** Implement dark mode support.
- **Q1 2027:** Add automated end-to-end (E2E) testing with Playwright.
