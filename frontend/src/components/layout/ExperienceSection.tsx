import React from 'react';
import { Section } from '../ui/Section';
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
    <Section id="experience" title="Work Experience" background="white">
      <Timeline items={timelineItems} />
    </Section>
  );
};
