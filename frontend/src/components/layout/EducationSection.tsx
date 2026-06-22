import React from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { EducationEntry, EducationEntry as EducationEntryType } from './EducationEntry';

const education: EducationEntryType[] = [
  {
    id: '1',
    institution: 'University of Technology',
    degree: 'Master of Science in Software Engineering',
    duration: '2020 - 2022',
    location: 'San Francisco, CA',
    gpa: '3.9/4.0',
    description: 'Advanced study in software engineering principles, distributed systems, and machine learning.',
    honors: [
      'Dean\'s List - All Semesters',
      'Outstanding Graduate Award',
      'Published Research Paper on Distributed Systems',
    ],
  },
  {
    id: '2',
    institution: 'State University',
    degree: 'Bachelor of Science in Computer Science',
    duration: '2016 - 2020',
    location: 'New York, NY',
    gpa: '3.8/4.0',
    description: 'Comprehensive curriculum covering algorithms, data structures, software engineering, and computer systems.',
    honors: [
      'Cum Laude',
      'Computer Science Department Award',
      'Led Student Programming Contest Team',
    ],
  },
];

// Convert EducationEntry to TimelineItem for compatibility with Timeline component
const timelineItems: TimelineItem[] = education.map((edu) => ({
  id: edu.id,
  title: edu.degree,
  subtitle: edu.institution,
  date: edu.duration,
  content: <EducationEntry entry={{ ...edu, degree: '', institution: '', duration: '' }} />,
  icon: null,
}));

export const EducationSection = () => {
  return (
    <section id="education" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Education</h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
};
