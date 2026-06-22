import React from 'react';
import { ResumeOverview, ResumeOverviewData } from './ResumeOverview';
import { AcademicAchievements, AcademicAchievement as AcademicAchievementType } from './AcademicAchievement';

const resumeOverviewData: ResumeOverviewData = {
  professionalSummary: 'Experienced full-stack developer with 5+ years of expertise in building scalable web applications. Passionate about clean code, performance optimization, and creating exceptional user experiences. Strong background in leading development teams and delivering high-impact projects for Fortune 500 companies and innovative startups.',
  experienceSummary: 'Worked with leading technology companies to deliver enterprise-grade solutions. Specialized in React ecosystem, cloud-native architecture, and agile development methodologies. Led teams of up to 10 developers and mentored junior engineers. Consistently delivered projects on time while maintaining code quality and performance standards.',
  skillsSummary: 'Proficient in JavaScript, TypeScript, React, Next.js, Node.js, Python, AWS, and modern web development frameworks. Strong background in database design, API development, microservices architecture, and CI/CD pipelines. Expert in performance optimization, accessibility compliance, and responsive design principles.',
  yearsOfExperience: 5,
  totalProjects: 25,
  languages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
};

const certifications: AcademicAchievementType[] = [
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
    id: 'award2',
    title: 'Hackathon Winner',
    issuer: 'TechCrunch Disrupt',
    date: '2019',
    type: 'award',
    description: 'First place in national hackathon for building innovative AI solutions.',
  },
];

export const ResumeSection = () => {
  return (
    <section id="resume" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Resume & Certifications</h2>
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Resume Overview */}
          <div className="lg:col-span-2">
            <ResumeOverview data={resumeOverviewData} />
          </div>

          {/* Certifications */}
          <div className="lg:col-span-1">
            <AcademicAchievements achievements={certifications} title="Certifications" />
          </div>
        </div>
      </div>
    </section>
  );
};
