import React from 'react';
import { Section } from '../ui/Section';
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
    <Section id="skills" title="Skills & Technologies" background="white">
      <SkillsGrid skills={skills} />
    </Section>
  );
};
