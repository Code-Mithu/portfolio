# System Architecture (SYSTEM_ARCHITECTURE.md)

## 1. High-Level Architecture
*   **Architecture Pattern:** Decoupled Full-Stack Architecture.
*   **Frontend:** Next.js (App Router, TypeScript, Tailwind CSS).
*   **Backend:** Django (Python), exposing a RESTful API (Django REST Framework recommended).
*   **Database:** SQLite (Development) / PostgreSQL (Production).
*   **Communication:** RESTful API/JSON over HTTPS.
*   **Deployment:** Vercel (Frontend), Dedicated Platform (e.g., Render, Railway, or AWS) for Django.
*   **Analytics:** Google Analytics 4 (via `next/script`).

## 2. Folder Structure
```text
/root
  /frontend (Next.js Application)
    /src
      /app
      /components
      /lib
      ...
  /backend (Django Project)
    /project_name
    /apps
      /portfolio_data
    /manage.py
    /requirements.txt
  /docker-compose.yml (For local development)
```

## 3. Component Architecture
*   **Frontend:** Atomic Design (Atoms, Molecules, Organisms).
*   **Backend:** Django Apps (modular separation of concerns).
*   **API:** Decoupled, served via Django REST Framework (DRF) to be consumed by Next.js.

## 4. State Management Strategy
*   **Frontend (UI State):** `useState`, `useReducer`, URL query parameters.
*   **Frontend (Data State):** TanStack Query (React Query) for fetching, caching, and synchronizing server state from the Django API.
*   **Backend:** Django manages business logic and database state.

## 5. SEO Architecture
*   **Frontend Metadata:** Next.js `generateMetadata` for dynamic SEO tags.
*   **Backend:** Django provides structured JSON data for complex entity lookups.
*   **Server-Side Rendering:** Next.js fetches data from the Django API during Server Side Rendering to ensure crawlers receive fully populated pages.

## 6. Performance Strategy
*   **Frontend:** Image optimization (`next/image`), route-based code splitting.
*   **Backend:** Database indexing, Django cache framework (e.g., Redis for API responses).
*   **Networking:** Efficient API request management using TanStack Query.

## 7. Security Strategy
*   **API Security:** Django REST Framework authentication (Token/JWT), CORS configuration in Django, rate limiting.
*   **Frontend:** Sanitization of inputs, secure cookie management.
*   **General:** Environment variables for sensitive data (API keys, DB credentials) managed by platform environment settings.

## 8. Deployment Strategy
*   **Frontend:** Automatic deployment via Vercel on git push to `main`.
*   **Backend:** Containerized deployment (Docker) to a platform supporting Django (e.g., Render, AWS ECS, DigitalOcean).
*   **Infrastructure as Code:** (Optional but recommended) Maintain configuration files for the backend host in the repo.

## 9. Coding Standards
*   **Frontend:** ESLint + Prettier (TypeScript strict mode).
*   **Backend:** PEP 8 compliance (Flake8/Black).
*   **Naming:** PascalCase/camelCase for JS/TS; snake_case for Python.

## 10. Reusable Component Strategy
*   **Frontend:** Component library mapped to `DESIGN_SYSTEM.md`.
*   **Backend:** Reusable Django apps/mixins for common functionality (e.g., audit logging, custom serializers).
