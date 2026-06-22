import React from 'react';
import { Button } from '../ui/Button';
import { SocialLinks } from '../ui/SocialLinks';

export const HeroSection = () => {
  return (
    <section id="home" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Multidisciplinary Professional & Full-Stack Developer
          </h1>
          <p className="text-xl text-secondary leading-relaxed mb-8">
            Bridging the gap between corporate finance operations and advanced software engineering. 
            Specializing in financial systems, tax compliance automation, and modern web development 
            with expertise in both administrative processes and cutting-edge technology.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-primary font-semibold">2.9+ years</span>
              <span className="text-secondary text-sm">Professional Experience</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-primary font-semibold">Finance + Tech</span>
              <span className="text-secondary text-sm">Dual Expertise</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="#contact" variant="primary">
              Get In Touch
            </Button>
            <Button href="#projects" variant="secondary">
              View Projects
            </Button>
          </div>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
};
