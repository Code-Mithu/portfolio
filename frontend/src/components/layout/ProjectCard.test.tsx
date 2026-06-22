import { render, screen } from '@testing-library/react';
import { ProjectCard, Project } from './ProjectCard';
import { describe, it, expect } from 'vitest';

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'This is a test project description for testing purposes.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    thumbnail: 'https://example.com/thumbnail.jpg',
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
  };

  it('renders correctly with all props', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeDefined();
    expect(screen.getByText('This is a test project description for testing purposes.')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Tailwind CSS')).toBeDefined();
  });

  it('renders project title', () => {
    render(<ProjectCard project={mockProject} />);
    const title = screen.getByText('Test Project');
    expect(title).toBeDefined();
    expect(title.tagName).toBe('H3');
  });

  it('renders project description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('This is a test project description for testing purposes.')).toBeDefined();
  });

  it('renders all technology stack items', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Tailwind CSS')).toBeDefined();
  });

  it('renders thumbnail when provided', () => {
    render(<ProjectCard project={mockProject} />);
    const thumbnail = screen.getByAltText('Test Project thumbnail');
    expect(thumbnail).toBeDefined();
    expect(thumbnail).toHaveAttribute('src', 'https://example.com/thumbnail.jpg');
  });

  it('does not render thumbnail when not provided', () => {
    const projectWithoutThumbnail = { ...mockProject, thumbnail: undefined };
    render(<ProjectCard project={projectWithoutThumbnail} />);
    const thumbnail = screen.queryByAltText('Test Project thumbnail');
    expect(thumbnail).toBeNull();
  });

  it('renders GitHub link when githubUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toBeDefined();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Live Demo link when demoUrl is provided', () => {
    render(<ProjectCard project={mockProject} />);
    const demoLink = screen.getByText('Live Demo');
    expect(demoLink).toBeDefined();
    expect(demoLink).toHaveAttribute('href', 'https://demo.test.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render GitHub link when githubUrl is not provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectCard project={projectWithoutGithub} />);
    expect(screen.queryByText('GitHub')).toBeNull();
  });

  it('does not render Live Demo link when demoUrl is not provided', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectCard project={projectWithoutDemo} />);
    expect(screen.queryByText('Live Demo')).toBeNull();
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<ProjectCard project={mockProject} />);
    const githubLink = screen.getByText('GitHub');
    expect(githubLink).toHaveAttribute('aria-label', 'View Test Project on GitHub');
    
    const demoLink = screen.getByText('Live Demo');
    expect(demoLink).toHaveAttribute('aria-label', 'View live demo of Test Project');
  });

  it('uses semantic article element', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const article = container.querySelector('article');
    expect(article).toBeDefined();
  });

  it('has responsive design classes', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const article = container.querySelector('article');
    expect(article).toHaveClass('bg-white', 'rounded-lg', 'border', 'shadow-sm', 'hover:shadow-lg');
  });

  it('applies proper styling to technology tags', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const techTags = container.querySelectorAll('.bg-blue-50');
    expect(techTags.length).toBe(3);
    techTags.forEach(tag => {
      expect(tag).toHaveClass('rounded-full', 'text-xs', 'font-medium', 'border');
    });
  });

  it('has action area with proper spacing and border', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const actionArea = container.querySelector('.pt-4.border-t');
    expect(actionArea).toBeDefined();
    expect(actionArea).toHaveClass('border-slate-100');
  });

  it('has flex layout for action buttons', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const actionButtons = container.querySelector('.flex.gap-3');
    expect(actionButtons).toBeDefined();
  });

  it('handles empty tech array gracefully', () => {
    const projectWithEmptyTech = { ...mockProject, tech: [] };
    const { container } = render(<ProjectCard project={projectWithEmptyTech} />);
    const techContainer = container.querySelector('.flex.flex-wrap');
    expect(techContainer).toBeEmptyDOMElement();
  });

  it('handles missing both action links gracefully', () => {
    const projectWithoutLinks = { 
      ...mockProject, 
      githubUrl: undefined, 
      demoUrl: undefined 
    };
    const { container } = render(<ProjectCard project={projectWithoutLinks} />);
    const actionButtons = container.querySelector('.flex.gap-3');
    expect(actionButtons).toBeEmptyDOMElement();
  });

  it('renders card with consistent height using flex-col', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const article = container.querySelector('article');
    expect(article).toHaveClass('flex', 'flex-col', 'h-full');
  });

  it('has proper hover effects for interactivity', () => {
    const { container } = render(<ProjectCard project={mockProject} />);
    const article = container.querySelector('article');
    expect(article).toHaveClass('hover:shadow-lg', 'transition-all', 'duration-300');
  });

  it('renders thumbnail with lazy loading', () => {
    render(<ProjectCard project={mockProject} />);
    const thumbnail = screen.getByAltText('Test Project thumbnail');
    expect(thumbnail).toHaveAttribute('loading', 'lazy');
  });

  it('renders thumbnail with proper object-fit', () => {
    render(<ProjectCard project={mockProject} />);
    const thumbnail = screen.getByAltText('Test Project thumbnail');
    expect(thumbnail).toHaveClass('object-cover');
  });
});
