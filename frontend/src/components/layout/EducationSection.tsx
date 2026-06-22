import React from 'react';
import { Timeline, TimelineItem } from './Timeline';
import { EducationEntry, EducationEntry as EducationEntryType } from './EducationEntry';
import { AcademicAchievements, AcademicAchievement as AcademicAchievementType } from './AcademicAchievement';

const education: EducationEntryType[] = [
  {
    id: '1',
    institution: 'University of Dhaka',
    degree: 'Master of Science in Computer Science',
    duration: '2020 - 2022',
    location: 'Dhaka, Bangladesh',
    gpa: '3.8/4.0',
    description: 'Advanced study in software engineering, distributed systems, and database management with focus on financial technology applications.',
    honors: [
      'Dean\'s List - All Semesters',
      'Outstanding Graduate Award',
      'Research Assistant in FinTech Lab',
    ],
  },
  {
    id: '2',
    institution: 'Bangladesh University of Engineering and Technology',
    degree: 'Bachelor of Science in Computer Science & Engineering',
    duration: '2016 - 2020',
    location: 'Dhaka, Bangladesh',
    gpa: '3.7/4.0',
    description: 'Comprehensive curriculum covering algorithms, data structures, software engineering, and financial systems.',
    honors: [
      'Merit Scholarship',
      'Computer Science Department Award',
      'Led Programming Contest Team',
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
    id: 'cert3',
    title: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: '2021',
    type: 'certification',
    description: 'Scrum framework certification for agile project management.',
    credentialUrl: 'https://www.scrum.org/professional-scrum-master',
    badge: 'Agile',
  },
  {
    id: 'award1',
    title: 'Outstanding Graduate Award',
    issuer: 'University of Technology',
    date: '2020',
    type: 'award',
    description: 'Awarded for exceptional academic performance and leadership.',
  },
  {
    id: 'highlight1',
    title: 'Hackathon Winner',
    issuer: 'TechCrunch Disrupt',
    date: '2019',
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
    <section id="education" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2 uppercase tracking-wider">
          Education & Certifications
        </h2>
        <Timeline items={timelineItems} />
        
        <div className="mt-16">
          <AcademicAchievements achievements={academicAchievements} />
        </div>
      </div>
    </section>
  );
};
