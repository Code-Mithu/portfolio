import { render, screen } from '@testing-library/react';
import { ProjectsSection } from './ProjectsSection';
import { describe, it, expect } from 'vitest';

describe('ProjectsSection Component', () => {
  it('renders correctly', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('Featured Projects')).toBeDefined();
    expect(screen.getByText('Portfolio Website')).toBeDefined();
  });

  it('renders all projects', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('Portfolio Website')).toBeDefined();
    expect(screen.getByText('E-commerce Platform')).toBeDefined();
    expect(screen.getByText('Task Manager App')).toBeDefined();
  });

  it('renders project thumbnails', () => {
    render(<ProjectsSection />);
    expect(screen.getByAltText('Portfolio Website thumbnail')).toBeDefined();
    expect(screen.getByAltText('E-commerce Platform thumbnail')).toBeDefined();
    expect(screen.getByAltText('Task Manager App thumbnail')).toBeDefined();
  });

  it('renders project descriptions', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Personal portfolio built with Next.js/)).toBeDefined();
    expect(screen.getByText(/full-stack e-commerce application/)).toBeDefined();
    expect(screen.getByText(/Productivity tool for managing daily tasks/)).toBeDefined();
  });

  it('renders technology stacks', () => {
    render(<ProjectsSection />);
    expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Firebase').length).toBeGreaterThan(0);
  });

  it('renders action buttons for projects with links', () => {
    render(<ProjectsSection />);
    const githubLinks = screen.getAllByText('GitHub');
    expect(githubLinks.length).toBeGreaterThan(0);
    
    const demoLinks = screen.getAllByText('Live Demo');
    expect(demoLinks.length).toBeGreaterThan(0);
  });

  it('uses responsive grid layout', () => {
    const { container } = render(<ProjectsSection />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('md:grid-cols-3');
  });
});
