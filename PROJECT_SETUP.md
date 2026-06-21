# Project Setup (PROJECT_SETUP.md)

## 1. Repository Structure
*   **Root:** Standard Next.js structure.
*   **Main Branch:** `main` (Production-ready).
*   **Feature Branches:** `feature/<task-name>` or `fix/<bug-name>`.

## 2. Folder Structure
```text
/src
  /app (Next.js App Router)
  /components
    /ui (Atomic components)
    /layout (Navbar, Footer)
    /sections (Page sections)
  /lib (Utilities, Zod schemas)
  /hooks (Custom React hooks)
  /types (TypeScript interfaces)
  /public (Static assets)
```

## 3. Environment Strategy
*   **Development:** `.env.local` (Git ignored).
*   **CI/CD:** Secrets managed in Vercel project settings (not in repository).
*   **Validation:** Use `zod` to validate critical environment variables at startup (`lib/env.ts`).

## 4. CI/CD Strategy
*   **Platform:** Vercel.
*   **Workflow:** Automatic deployment on push to `main` (Production) and Pull Requests (Preview).
*   **Checks:** PRs require passing lint, type-check, and build steps.

## 5. Dependency Strategy
*   **Manager:** `pnpm` (Fast, strict, efficient workspace).
*   **Core:** Next.js, React, Tailwind CSS, TypeScript.
*   **Validation:** Zod (Form validation & environment variables).
*   **Iconography:** Lucide React.
