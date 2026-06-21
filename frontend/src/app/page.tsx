import { Navbar } from '@/components/layout/Navbar';
import { AboutSection } from '@/components/layout/AboutSection';
import { SkillsSection } from '@/components/layout/SkillsSection';
import { ProjectsSection } from '@/components/layout/ProjectsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16"> {/* Add padding top to account for fixed Navbar */}
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </div>
    </main>
  );
}
