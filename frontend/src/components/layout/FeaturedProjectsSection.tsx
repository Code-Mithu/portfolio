import React from 'react';
import Image from 'next/image';
import { ProjectCard, Project } from './ProjectCard';
import { ProjectActions } from './ProjectActions';

interface FeaturedProjectsSectionProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  featuredCount?: number;
}

/**
 * FeaturedProjectsSection component for highlighting top projects with a prominent layout.
 * Features a hero-style featured project followed by a grid of additional projects.
 * Provides responsive layout and reusable structure.
 */
export const FeaturedProjectsSection = ({
  projects,
  title = 'Featured Projects',
  subtitle = 'A selection of my best work and recent projects',
  featuredCount = 1
}: FeaturedProjectsSectionProps) => {
  if (projects.length === 0) {
    return null;
  }

  const featuredProject = projects[0];
  const additionalProjects = projects.slice(1, featuredCount + 1);

  return (
    <section id="featured-projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">{title}</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Featured Project Hero */}
        {featuredProject && (
          <div className="mb-16">
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {featuredProject.thumbnail && (
                <div className="relative h-80 lg:h-96 overflow-hidden">

                  <Image
                    src={featuredProject.thumbnail}
                    alt={`${featuredProject.title} thumbnail`}
                    className="w-full h-full object-cover"
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 80vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
              )}
              <div className="relative p-8 lg:p-12 -mt-20 lg:-mt-32">
                <div className="max-w-3xl">
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">{featuredProject.title}</h3>
                  <p className="text-lg text-gray-200 mb-6 leading-relaxed">{featuredProject.description}</p>
                  
                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {featuredProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <ProjectActions project={featuredProject} variant="hero" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Projects Grid */}
        {additionalProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-8">More Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
