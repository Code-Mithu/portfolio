import React from 'react';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable section component to standardize vertical spacing and layout.
 * Wraps content in the Container component.
 */
export const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
};
