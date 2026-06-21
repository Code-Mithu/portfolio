# Development Guide (DEVELOPMENT_GUIDE.md)

## 6. Naming Conventions
*   **Components:** `PascalCase` (e.g., `ProjectCard.tsx`).
*   **Functions/Variables:** `camelCase` (e.g., `fetchProjects.ts`).
*   **Directories:** `kebab-case` (e.g., `project-details/`).

## 7. Coding Standards
*   **Typescript:** Strict mode enabled. No `any`. Explicit interfaces for props.
*   **Components:** Prefer React Server Components (RSC) by default. Add `'use client'` only where necessary.
*   **Styling:** Utility-first Tailwind. Extract components before extracting styles.

## 8. Linting Standards
*   **Tool:** ESLint.
*   **Config:** Next.js recommended config + strict type-checking rules.

## 9. Formatting Standards
*   **Tool:** Prettier.
*   **Rules:** Standard settings (2 spaces, semi-colons, trailing commas).
*   **Integration:** Git pre-commit hooks (Husky) to run prettier/lint before committing.

## 10. Initial Development Roadmap
1.  **Phase 1: Project Init:** Setup Next.js, Tailwind, ESLint/Prettier, Folder Structure.
2.  **Phase 2: Design System:** Implement components (Atoms) based on `DESIGN_SYSTEM.md`.
3.  **Phase 3: Core Layouts:** Navbar, Footer, Base Pages.
4.  **Phase 4: Content/Pages:** Implement specific pages from `UI_DESIGN.md`.
5.  **Phase 5: Refinement:** SEO implementation, analytics, performance optimization.
6.  **Phase 6: Launch:** Final QA and deployment.
