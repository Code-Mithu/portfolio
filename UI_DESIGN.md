# UI Design Specification (UI_DESIGN.md)

This document provides screen-level specifications for the portfolio, applying the defined **Design System** to the established **Wireframes**.

---

## 1. Global Responsive Strategy
*   **Desktop (>= 1024px):** 12-column grid, max-width 1280px.
*   **Tablet (768px - 1023px):** 8-column grid, adjusted margins/padding.
*   **Mobile (< 768px):** 4-column grid, stacked layouts, hamburger navigation.

---

## 2. Page Specifications

### Home
*   **Visual Layout:** Hero (left text/right image), Projects Preview (3-col grid), Contact (centered).
*   **Sections:** Hero, Featured Projects, Quick Bio, Contact.
*   **Components:** Button (Primary), Project Card, Footer.
*   **Responsive:** Hero text stacks above image on mobile.
*   **CTA Strategy:** Primary CTA in Hero (View Projects), Secondary in Footer.

### About
*   **Visual Layout:** Two-column (Desktop) / Stacked (Mobile).
*   **Sections:** Bio, Values, Professional Approach.
*   **Components:** Text, Image, Badge (for values).
*   **Responsive:** Image scales down, text flows naturally.
*   **Content Placement:** Hero section with portrait, followed by narrative blocks.

### Skills
*   **Visual Layout:** Categorized grid.
*   **Sections:** Technical Skills, Soft Skills.
*   **Components:** Card, Badge.
*   **Responsive:** Grid adjusts from 4-col (Desktop) to 2-col (Mobile).
*   **Content Placement:** Skills grouped by category for readability.

### Projects
*   **Visual Layout:** Filter bar followed by card-based grid.
*   **Sections:** Filter/Sort, Project List.
*   **Components:** Filter (Badge/Button), Project Card.
*   **Responsive:** Grid adjusts from 3-col (Desktop) to 1-col (Mobile).
*   **CTA Strategy:** Link to full case study/repo inside each card.

### Experience
*   **Visual Layout:** Vertical timeline.
*   **Sections:** Role list.
*   **Components:** Timeline, Card.
*   **Responsive:** Timeline aligns to left on desktop, centered/left on mobile.
*   **Content Placement:** Chronological descending.

### Education
*   **Visual Layout:** List view.
*   **Sections:** Institutions/Degrees.
*   **Components:** Card.
*   **Responsive:** Consistent across devices.

### Resume
*   **Visual Layout:** Centered content container.
*   **Sections:** Download CTA, Embedded Viewer.
*   **Components:** Button (Primary), Card (container).
*   **Responsive:** Viewer responsive width (100% on mobile).

### Contact
*   **Visual Layout:** Two-column (Desktop) / Stacked (Mobile).
*   **Sections:** Contact Form, Social Links.
*   **Components:** Input, Textarea, Button (Primary).
*   **Responsive:** Form fields span full width on mobile.
*   **CTA Strategy:** Form submission button.

---

## 3. Component Usage Matrix

| Component | Home | About | Skills | Projects | Experience | Education | Resume | Contact |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Navbar | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Footer | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Button | Yes | | | Yes | | | Yes | Yes |
| Project Card | Yes | | | Yes | | | | |
| Input/Textarea| | | | | | | | Yes |
| Badge | | Yes | Yes | Yes | | | | |
| Timeline | | | | | Yes | | | |

---

*This specification serves as the design source of truth. All implementations must adhere to these structural and component guidelines.*
