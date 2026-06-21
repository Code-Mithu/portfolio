import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import Link from 'next/link';

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
            <Link 
              href="/#projects"
              className="bg-primary text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition-colors"
            >
              View Projects
            </Link>
            <Link 
              href="/#contact"
              className="bg-white border border-primary text-primary px-6 py-3 rounded font-medium hover:bg-slate-50 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
        <div className="bg-slate-200 rounded-lg aspect-square flex items-center justify-center text-slate-500">
          {/* Placeholder for Profile Image */}
          <span className="text-lg">Profile Image</span>
        </div>
      </div>
    </Section>
  );
};
