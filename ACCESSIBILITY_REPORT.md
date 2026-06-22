# Accessibility Audit Report

## 1. Overview
This report details the accessibility audit of the personal portfolio website. The audit focused on keyboard navigation, semantic HTML structure, ARIA compliance, and color contrast.

## 2. Methodology
- Automated testing via Vitest using `jest-dom` for semantic checks.
- Manual inspection of keyboard navigation paths.
- Contrast verification against WCAG 2.1 AA standards.

## 3. Findings

| Aspect | Status | Observations |
| :--- | :--- | :--- |
| **Semantic HTML** | Pass | Good use of `<main>`, `<nav>`, `<footer>`, and heading levels. |
| **Keyboard Navigation**| Pass | All interactive elements are reachable via `Tab` key. |
| **ARIA Compliance** | Pass | Main interactive components feature correct ARIA labels. |
| **Color Contrast** | Pass | Primary brand colors and text maintain readable contrast ratios. |

## 4. Recommendations
- Regularly run automated accessibility tests (e.g., `axe-core`) in the CI/CD pipeline.
- Conduct periodic user testing with assistive technologies (e.g., screen readers).
