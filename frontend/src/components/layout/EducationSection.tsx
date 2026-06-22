import React from 'react';
import { Section } from '../ui/Section';
import { Timeline, TimelineItem } from './Timeline';
import { EducationEntry, EducationEntry as EducationEntryType } from './EducationEntry';
import { AcademicAchievements } from './AcademicAchievement';
import { sharedCertifications, sharedAwards } from '../../data/certifications';

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

const educationOnlyAchievements = [
  {
    id: 'award-dean',
    title: 'Dean\'s Research Fellowship',
    issuer: 'University of Technology',
    date: '2021',
    type: 'award' as const,
    description: 'Competitive fellowship for outstanding research in distributed systems.',
  },
  {
    id: 'highlight1',
    title: 'Best Paper Award',
    issuer: 'ACM Symposium',
    date: '2021',
    type: 'highlight' as const,
    description: 'Recognized for excellence in research on microservices architecture.',
  },
];

const academicAchievements = [
  ...sharedCertifications,
  ...sharedAwards,
  ...educationOnlyAchievements,
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
    <Section id="education" title="Education" background="slate">
      <Timeline items={timelineItems} />
      
      <div className="mt-16">
        <AcademicAchievements achievements={academicAchievements} />
      </div>
    </Section>
  );
};
