import React from 'react';
import { Timeline, TimelineItem } from './Timeline';

const experiences: TimelineItem[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    subtitle: 'Tech Solutions Inc.',
    date: '2022 - Present',
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>Led the development of a complex dashboard application.</li>
        <li>Optimized performance by 30% through code splitting and image optimization.</li>
        <li>Mentored junior developers and conducted code reviews.</li>
      </ul>
    ),
  },
  {
    id: '2',
    title: 'Frontend Developer',
    subtitle: 'Creative Agency',
    date: '2020 - 2022',
    content: (
      <ul className="list-disc ml-5 space-y-1">
        <li>Built responsive websites for diverse clients using React and Tailwind CSS.</li>
        <li>Collaborated with designers to implement pixel-perfect UIs.</li>
        <li>Integrated RESTful APIs for dynamic content rendering.</li>
      </ul>
    ),
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Work Experience</h2>
        <Timeline items={experiences} />
      </div>
    </section>
  );
};
