import React from 'react';
import { Section } from '../ui/Section';
import { ResumeOverview, ResumeOverviewData } from './ResumeOverview';
import { AcademicAchievements } from './AcademicAchievement';
import { sharedCertifications, sharedAwards } from '../../data/certifications';

const resumeOverviewData: ResumeOverviewData = {
  professionalSummary: 'Experienced full-stack developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, performance optimization, and creating exceptional user experiences. Strong background in leading development teams and delivering high-impact projects for Fortune 500 companies and innovative startups.',
  experienceSummary: 'Worked with leading technology companies to deliver enterprise-grade solutions. Specialized in React ecosystem, cloud-native architecture, and agile development methodologies. Led teams of up to 10 developers and mentored junior engineers. Consistently delivered projects on time while maintaining code quality and performance standards.',
  skillsSummary: 'Proficient in JavaScript, TypeScript, React, Next.js, Node.js, Python, AWS, and modern web development frameworks. Strong background in database design, API development, microservices architecture, and CI/CD pipelines. Expert in performance optimization, accessibility compliance, and responsive design principles.',
  yearsOfExperience: 5,
  totalProjects: 25,
  languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
};

const resumeOnlyCertifications = [
  {
    id: 'cert3',
    title: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: '2021',
    type: 'certification' as const,
    description: 'Scrum framework certification for agile project management.',
    badge: 'Agile',
  },
];

const certifications = [
  ...sharedCertifications,
  ...resumeOnlyCertifications,
  ...sharedAwards,
];

export const ResumeSection = () => {
  return (
    <Section id="resume" title="Resume & Certifications" background="white">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <ResumeOverview data={resumeOverviewData} />
        </div>
        <div className="lg:col-span-1">
          <AcademicAchievements achievements={certifications} title="Certifications" />
        </div>
      </div>
    </Section>
  );
};
