# Design System (DESIGN_SYSTEM.md)

## 1. Design Principles
*   **Professional Clarity:** Prioritize readable typography and ample whitespace to convey competence and focus.
*   **Trust Through Consistency:** Uniform interaction patterns and visual style build brand reliability.
*   **Accessibility First:** Inclusive design is not an afterthought; contrast, keyboard navigation, and semantic structure are foundational.
*   **Responsive Adaptability:** Design for the context of use, ensuring an optimal experience on mobile and desktop alike.

## 2. Color System
*   **Primary:** Deep Indigo (`#2563EB`) - Professional, trustworthy.
*   **Secondary:** Slate (`#64748B`) - Subtle, supportive.
*   **Accent:** Amber (`#F59E0B`) - Used for highlights/CTAs to draw attention.
*   **Success:** Emerald (`#10B981`)
*   **Warning:** Amber (`#F59E0B`)
*   **Error:** Rose (`#E11D48`)
*   **Neutrals:** Slate scale from 50 (lightest) to 900 (darkest).

## 3. Typography System
*   **Font Family:** Inter (or similar clean sans-serif).
*   **Body Base:** 16px/1.5 line height.
*   **Hierarchy:**
    *   H1 (Heading): 48px, Bold
    *   H2 (Section Heading): 32px, Semibold
    *   H3 (Sub-heading): 24px, Semibold
    *   Body: 16px, Regular
    *   Small: 14px, Regular
    *   Caption: 12px, Regular

## 4. Spacing System
Based on 8px base unit:
*   XXS: 4px
*   XS: 8px
*   S: 16px
*   M: 24px
*   L: 32px
*   XL: 48px
*   XXL: 64px

## 5. Grid System
*   **Column Count:** 12 columns.
*   **Gutter Width:** 16px (Mobile), 24px (Tablet/Desktop).
*   **Container Width:** Max-width 1280px.

## 6. Breakpoints
*   **Mobile:** < 768px
*   **Tablet:** >= 768px
*   **Desktop:** >= 1024px
*   **Wide Desktop:** >= 1280px

## 7. Icon Guidelines
*   **Style:** Clean, medium line-weight (1.5px - 2px), rounded corners.
*   **Size:** Standard 24px box; 20px for inline icons.
*   **Consistency:** Avoid mixing styles; use a single icon library (e.g., Lucide).

## 8. Component Standards
*   **Button:** Rounded corners (4px), clear state definition (Default, Hover, Focus, Disabled).
*   **Input/Textarea:** Distinct border, clear focus state, error state feedback.
*   **Card/Project Card:** Subtle drop shadow, consistent padding (S to M), distinct header/body/footer structure.
*   **Badge:** Pill shape, small font-size, muted background with dark text.
*   **Navbar/Footer:** Fixed height (Navbar), flexible height (Footer), responsive collapsing menu.
*   **Modal:** Centered, semi-transparent backdrop, clear close mechanism.
*   **Timeline:** Vertical line indicator, distinct date markers.

## 9. Accessibility Rules
*   **Contrast:** Minimum 4.5:1 ratio for all text.
*   **Focus States:** Explicit, high-visibility focus rings on all interactive elements.
*   **Semantic HTML:** Strict adherence to semantic tags (button, nav, main, etc.).
*   **Screen Readers:** Descriptive alt text and ARIA labels.
*   **Touch:** Minimum 44px target area for mobile interactions.
