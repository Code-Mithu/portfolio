import React from 'react';
import { Section } from '../ui/Section';
import { ProfessionalSummary } from './ProfessionalSummary';
import { Highlights } from './Highlights';

export const AboutSection = () => {
  return (
    <Section id="about" title="About Me" background="slate">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <ProfessionalSummary />
        <Highlights />
      </div>
    </Section>
  );
};
