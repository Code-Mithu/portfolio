import React from 'react';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio built with Next.js, Tailwind CSS, and TypeScript.',
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    githubUrl: '#',
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce application with secure checkout and user management.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: 'Task Manager App',
    description: 'Productivity tool for managing daily tasks with priority tracking.',
    tech: ['React', 'Firebase'],
    githubUrl: '#',
    demoUrl: '#',
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
