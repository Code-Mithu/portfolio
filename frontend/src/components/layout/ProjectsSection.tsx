import React from 'react';
import { Section } from '../ui/Section';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js, Tailwind CSS, and TypeScript.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    githubUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop',
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce application with secure checkout and user management.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: '#',
    demoUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  },
  {
    title: 'Task Manager App',
    description: 'Productivity tool for managing daily tasks with priority tracking.',
    tech: ['React', 'Firebase'],
    githubUrl: '#',
    demoUrl: '#',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
  },
];

export const ProjectsSection = () => {
  return (
    <Section id="projects" title="Featured Projects" background="slate">
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};
