# Application Layout Foundation Guide

This document defines the foundation for the application layout, ensuring consistency, responsiveness, and accessibility across all pages.

## 1. Global Structure
- **Root Layout (`frontend/src/app/layout.tsx`)**: The single entry point for all pages. It initializes the `Inter` font, wraps the application in a semantic `body` tag with `suppressHydrationWarning`, and includes SEO metadata.
- **Global Styles (`frontend/src/app/globals.css`)**: Contains global Tailwind base directives, typography resets, and base heading styles.

## 2. Design Consistency
- **Theme Configuration (`frontend/tailwind.config.js`)**: Maps to the defined `DESIGN_SYSTEM.md`.
    - **Colors**: Uses `primary` (#2563EB), `secondary` (#64748B), and `accent` (#F59E0B).
    - **Fonts**: Uses 'Inter' as the default font family.

## 3. Best Practices
- **Semantic HTML**: All sections should use appropriate landmark tags (`<nav>`, `<main>`, `<footer>`, `<section>`).
- **Responsive Design**: All layout components must be responsive, following the 12-column grid system outlined in the design system.
- **Accessibility**: Ensure all interactive elements have proper `aria` labels and logical tab orders.
