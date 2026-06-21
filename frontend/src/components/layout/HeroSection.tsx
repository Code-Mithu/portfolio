import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';

export const HeroSection = () => {
  return (
    <Section id="home" className="bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Building Digital Experiences with Precision.
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            I am a dedicated frontend engineer specializing in building responsive, accessible, and high-performance web applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/#projects" variant="primary">
              View Projects
            </Button>
            <Button href="/#contact" variant="secondary">
              Contact Me
            </Button>
          </div>
          <SocialLinks />
        </div>
        <div className="bg-slate-200 rounded-lg aspect-square flex items-center justify-center text-slate-500">
          {/* Placeholder for Profile Image */}
          <span className="text-lg">Profile Image</span>
        </div>
      </div>
    </Section>
  );
};
