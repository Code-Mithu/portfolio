import React from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { EducationEntry, EducationEntry as EducationEntryType } from './EducationEntry';
import { AcademicAchievements, AcademicAchievement as AcademicAchievementType } from './AcademicAchievement';

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

const academicAchievements: AcademicAchievementType[] = [
  {
    id: 'cert1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
    type: 'certification',
    description: 'Professional certification in designing distributed systems on AWS.',
    credentialUrl: 'https://aws.amazon.com/certification/',
    badge: 'Professional',
  },
  {
    id: 'cert2',
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud',
    date: '2022',
    type: 'certification',
    description: 'Certification in designing and managing solutions on Google Cloud Platform.',
    badge: 'Professional',
  },
  {
    id: 'award1',
    title: 'Outstanding Graduate Award',
    issuer: 'University of Technology',
    date: '2022',
    type: 'award',
    description: 'Awarded for exceptional academic performance and leadership in graduate studies.',
  },
  {
    id: 'award2',
    title: 'Dean\'s Research Fellowship',
    issuer: 'University of Technology',
    date: '2021',
    type: 'award',
    description: 'Competitive fellowship for outstanding research in distributed systems.',
  },
  {
    id: 'highlight1',
    title: 'Best Paper Award',
    issuer: 'ACM Symposium',
    date: '2021',
    type: 'highlight',
    description: 'Recognized for excellence in research on microservices architecture.',
  },
  {
    id: 'highlight2',
    title: 'Hackathon Winner',
    issuer: 'TechCrunch Disrupt',
    date: '2020',
    type: 'highlight',
    description: 'First place in national hackathon for building innovative AI solutions.',
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
        
        <div className="mt-16">
          <AcademicAchievements achievements={academicAchievements} />
        </div>
      </div>
    </section>
  );
};
