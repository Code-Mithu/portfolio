import React from 'react';
import { ProfessionalSummary } from './ProfessionalSummary';
import { Highlights } from './Highlights';

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <ProfessionalSummary />
          <Highlights />
        </div>
      </div>
    </section>
  );
};
