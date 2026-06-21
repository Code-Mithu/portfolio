# UX Design Specification (UX_SPECIFICATION.md)

## 1. User Journey
*   **Recruiter Journey:** Home -> Projects (scanning for expertise) -> Resume (evaluating candidate) -> Contact (reaching out).
*   **Client Journey:** Home -> About (trust building) -> Projects (deep dive) -> Contact (inquiry).
*   **General Visitor Journey:** Home -> Projects -> Experience -> Contact.

## 2. User Flows
*   **Homepage Flow:** Landing -> Hero CTA -> Projects OR Resume Download.
*   **Project Exploration Flow:** Projects List -> Click Project -> Project Detail -> Back to Projects OR Contact.
*   **Resume Download Flow:** Header/Footer CTA -> Trigger PDF Download.
*   **Contact Flow:** Any Page -> Contact Page/Section -> Form Entry -> Submission Confirmation.

## 3. Mobile UX Strategy
*   **Responsive Priority:** Content-first approach, stacking elements vertically.
*   **Touch Targets:** Minimum 44x44px for buttons and interactive elements.
*   **Navigation:** Hamburger menu for global navigation, ensuring one-handed usability.
*   **Optimization:** Lazy loading for images, streamlined form fields.

## 4. Accessibility Requirements (WCAG 2.1 AA)
*   **Text/Color:** Minimum contrast ratio 4.5:1.
*   **Interaction:** Full keyboard navigation support (logical tab order).
*   **Screen Readers:** Semantic HTML (nav, main, footer, section), descriptive ARIA labels for buttons/icons, alt text for all images.
*   **Form Inputs:** Explicit labels associated with inputs.
