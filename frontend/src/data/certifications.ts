import { AcademicAchievement } from '../components/layout/AcademicAchievement';

export const sharedCertifications: AcademicAchievement[] = [
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
];

export const sharedAwards: AcademicAchievement[] = [
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
    title: 'Hackathon Winner',
    issuer: 'TechCrunch Disrupt',
    date: '2020',
    type: 'award',
    description: 'First place in national hackathon for building innovative AI solutions.',
  },
];
