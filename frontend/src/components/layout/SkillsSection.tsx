import React from 'react';
import { SkillsGrid } from './SkillsGrid';

const skills = [
  {
    category: 'Frontend',
    description: 'Modern frontend technologies and frameworks for building responsive user interfaces',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    category: 'Tools',
    description: 'Development tools, deployment platforms, and collaboration software',
    items: ['Git', 'Vercel', 'Docker', 'Figma', 'Jest/Vitest']
  },
  {
    category: 'Backend/Other',
    description: 'Server-side technologies, databases, and API development',
    items: ['Node.js', 'Python', 'SQL', 'REST APIs']
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Skills & Technologies</h2>
        <SkillsGrid skills={skills} />
      </div>
    </section>
  );
};
