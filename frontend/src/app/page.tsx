import { HeroSection } from '@/components/layout/HeroSection';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/layout/Footer';

const AboutSection = dynamic(() => import('@/components/layout/AboutSection').then((mod) => mod.AboutSection));
const SkillsSection = dynamic(() => import('@/components/layout/SkillsSection').then((mod) => mod.SkillsSection));
const ProjectsSection = dynamic(() => import('@/components/layout/ProjectsSection').then((mod) => mod.ProjectsSection));
const ExperienceSection = dynamic(() => import('@/components/layout/ExperienceSection').then((mod) => mod.ExperienceSection));
const EducationSection = dynamic(() => import('@/components/layout/EducationSection').then((mod) => mod.EducationSection));
const BlogSection = dynamic(() => import('@/components/layout/BlogSection').then((mod) => ({ default: mod.BlogSection })));
const ResumeSection = dynamic(() => import('@/components/layout/ResumeSection').then((mod) => mod.ResumeSection));
const ContactSection = dynamic(() => import('@/components/layout/ContactSection').then((mod) => mod.ContactSection));

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        'name': 'Mithu Kumar Das | Portfolio',
        'url': 'https://mithukumardas.com',
      },
      {
        '@type': 'Person',
        'name': 'Mithu Kumar Das',
        'jobTitle': 'Finance & Technology Professional',
        'description': 'Multidisciplinary professional bridging corporate finance operations and full-stack development with expertise in L/C management, VAT compliance, and modern web technologies.',
        'url': 'https://mithukumardas.com',
        'sameAs': [
          'https://linkedin.com/in/mithukumardas',
          'https://github.com/Code-Mithu',
        ],
        'knowsAbout': [
          'L/C Management',
          'VAT Compliance',
          'Financial Operations',
          'React',
          'Next.js',
          'Python',
          'Django',
          'Full-Stack Development',
          'Tax Automation'
        ]
      },
    ],
  };

  return (
    <main className="min-h-screen" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-16"> {/* Add padding top to account for fixed Navbar */}
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <BlogSection />
        <ResumeSection />
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}
