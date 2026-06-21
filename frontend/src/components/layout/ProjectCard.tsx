import React from 'react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="text-xl font-semibold text-primary mb-2">{project.title}</h4>
      <p className="text-secondary mb-4 text-sm">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        {project.githubUrl && (
          <a href={project.githubUrl} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};
