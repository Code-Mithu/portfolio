import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/layout/HeroSection';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/layout/Footer';

const AboutSection = dynamic(() => import('@/components/layout/AboutSection').then((mod) => mod.AboutSection));
const SkillsSection = dynamic(() => import('@/components/layout/SkillsSection').then((mod) => mod.SkillsSection));
const ProjectsSection = dynamic(() => import('@/components/layout/ProjectsSection').then((mod) => mod.ProjectsSection));
const ExperienceSection = dynamic(() => import('@/components/layout/ExperienceSection').then((mod) => mod.ExperienceSection));
const EducationSection = dynamic(() => import('@/components/layout/EducationSection').then((mod) => mod.EducationSection));
const ResumeSection = dynamic(() => import('@/components/layout/ResumeSection').then((mod) => mod.ResumeSection));
const ContactSection = dynamic(() => import('@/components/layout/ContactSection').then((mod) => mod.ContactSection));

function sanitizeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': 'Your Name | Portfolio',
        'url': 'https://your-portfolio-url.com',
      },
      {
        '@type': 'Person',
        'name': 'Your Name',
        'jobTitle': 'Frontend Engineer',
        'url': 'https://your-portfolio-url.com',
        'sameAs': [
          'https://linkedin.com/in/yourprofile',
          'https://github.com/yourusername',
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(jsonLd) }}
      />
      <Navbar />
      <div className="pt-16"> {/* Add padding top to account for fixed Navbar */}
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ResumeSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
