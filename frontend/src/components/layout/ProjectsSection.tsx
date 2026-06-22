import React from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'TaxMate - VAT Compliance System',
    description: 'Automated VAT calculation and Mushak register management system for small businesses, featuring real-time tax calculations, PDF generation, and NBR compliance.',
    tech: ['Next.js', 'React', 'Django', 'PostgreSQL', 'Python', 'TypeScript'],
    githubUrl: '#',
    demoUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
  },
  {
    title: 'LCManager - Digital L/C Operations',
    description: 'Comprehensive Letter of Credit management system with banking integration, automated documentation, and compliance tracking for international trade.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs'],
    githubUrl: '#',
    demoUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    title: 'Financial Dashboard Pro',
    description: 'Real-time financial analytics dashboard with data visualization, automated reporting, and integration with multiple banking APIs.',
    tech: ['Next.js', 'Python', 'Django', 'Chart.js', 'PostgreSQL'],
    githubUrl: '#',
    demoUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2 uppercase tracking-wider">
          Technical Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
