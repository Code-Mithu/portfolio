import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/layout/HeroSection';
import { AboutSection } from '@/components/layout/AboutSection';
import { SkillsSection } from '@/components/layout/SkillsSection';
import { ProjectsSection } from '@/components/layout/ProjectsSection';
import { ExperienceSection } from '@/components/layout/ExperienceSection';
import { EducationSection } from '@/components/layout/EducationSection';
import { ResumeSection } from '@/components/layout/ResumeSection';
import { ContactSection } from '@/components/layout/ContactSection';
import { Footer } from '@/components/layout/Footer';

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
