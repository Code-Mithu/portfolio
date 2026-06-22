import React from 'react';
import { Container } from './Container';

export type SectionBackground = 'white' | 'slate';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  background?: SectionBackground;
}

const backgroundClasses: Record<SectionBackground, string> = {
  white: 'bg-white',
  slate: 'bg-slate-50',
};

export const Section: React.FC<SectionProps> = ({ id, children, className = '', title, background }) => {
  const bgClass = background ? backgroundClasses[background] : '';

  return (
    <section id={id} className={`py-16 ${bgClass} ${className}`}>
      <Container>
        {title && (
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">{title}</h2>
        )}
        {children}
      </Container>
    </section>
  );
};
