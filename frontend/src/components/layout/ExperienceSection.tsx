import React from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { ExperienceEntry, ExperienceEntry as ExperienceEntryType } from './ExperienceEntry';

const experiences: ExperienceEntryType[] = [
  {
    id: '1',
    company: 'Tech Solutions Inc.',
    role: 'Senior Frontend Engineer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    responsibilities: [
      'Led the development of a complex dashboard application.',
      'Optimized performance by 30% through code splitting and image optimization.',
      'Mentored junior developers and conducted code reviews.',
    ],
    achievements: [
      'Increased page load speed by 40%',
      'Led a team of 5 developers',
      'Shipped 3 major product releases',
    ],
  },
  {
    id: '2',
    company: 'Creative Agency',
    role: 'Frontend Developer',
    duration: '2020 - 2022',
    location: 'New York, NY',
    responsibilities: [
      'Built responsive websites for diverse clients using React and Tailwind CSS.',
      'Collaborated with designers to implement pixel-perfect UIs.',
      'Integrated RESTful APIs for dynamic content rendering.',
    ],
    achievements: [
      'Delivered 15+ client projects on time',
      'Improved development workflow by 25%',
      'Received Client Excellence Award 2021',
    ],
  },
];

// Convert ExperienceEntry to TimelineItem for compatibility with Timeline component
const timelineItems: TimelineItem[] = experiences.map((exp) => ({
  id: exp.id,
  title: exp.role,
  subtitle: exp.company,
  date: exp.duration,
  content: (
    <ExperienceEntry entry={{ ...exp, role: '', company: '', duration: '' }} showAchievements={true} />
  ),
  icon: null,
}));

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Work Experience</h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
};
