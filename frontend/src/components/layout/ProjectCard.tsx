import React from 'react';
import Image from 'next/image';
import { ProjectActions } from './ProjectActions';

export interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  tech: string[];
  features?: string[];
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

/**
 * Reusable ProjectCard component displaying project information with thumbnail, description,
 * technology stack, and action buttons. Features responsive design and hover effects.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Thumbnail Section */}
      {project.thumbnail && (
        <div className="relative h-48 bg-slate-100 overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full h-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Project Title */}
        <h3 className="text-xl font-semibold text-primary mb-3">{project.title}</h3>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        {/* Technology Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Area */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <ProjectActions project={project} variant="card" />
        </div>
      </div>
    </article>
  );
};
