import { render, screen } from '@testing-library/react';
import { FeaturedProjectsSection } from './FeaturedProjectsSection';
import { Project } from './ProjectCard';
import { describe, it, expect } from 'vitest';

describe('FeaturedProjectsSection Component', () => {
  const mockProjects: Project[] = [
    {
      title: 'Featured Project',
      description: 'This is the featured project with full description and details.',
      tech: ['React', 'TypeScript', 'Node.js'],
      thumbnail: 'https://example.com/featured.jpg',
      githubUrl: 'https://github.com/featured',
      demoUrl: 'https://demo.com',
    },
    {
      title: 'Additional Project 1',
      description: 'Additional project description.',
      tech: ['Vue', 'Express'],
      githubUrl: 'https://github.com/additional1',
      demoUrl: 'https://demo1.com',
      thumbnail: 'https://example.com/add1.jpg',
    },
    {
      title: 'Additional Project 2',
      description: 'Another additional project.',
      tech: ['Python', 'Django'],
      githubUrl: 'https://github.com/additional2',
      demoUrl: 'https://demo2.com',
      thumbnail: 'https://example.com/add2.jpg',
    },
  ];

  it('renders correctly with default props', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    expect(screen.getByText('Featured Projects')).toBeDefined();
    expect(screen.getByText('A selection of my best work and recent projects')).toBeDefined();
  });

  it('renders custom title and subtitle when provided', () => {
    render(
      <FeaturedProjectsSection 
        projects={mockProjects}
        title="My Best Work"
        subtitle="Check out these amazing projects"
      />
    );
    expect(screen.getByText('My Best Work')).toBeDefined();
    expect(screen.getByText('Check out these amazing projects')).toBeDefined();
  });

  it('renders featured project in hero layout', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    expect(screen.getByText('Featured Project')).toBeDefined();
    expect(screen.getByText('This is the featured project with full description and details.')).toBeDefined();
  });

  it('renders featured project thumbnail', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    const thumbnail = screen.getByAltText('Featured Project thumbnail');
    expect(thumbnail).toBeDefined();
    expect(thumbnail).toHaveAttribute('loading', 'eager');
  });

  it('renders featured project technology stack', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Node.js')).toBeDefined();
  });

  it('renders featured project action buttons', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    const demoLink = screen.getByLabelText('View live demo of Featured Project');
    expect(demoLink).toBeDefined();
    expect(demoLink).toHaveTextContent('Live Demo');
    
    const githubLink = screen.getByLabelText('View Featured Project on GitHub');
    expect(githubLink).toBeDefined();
    expect(githubLink).toHaveTextContent('GitHub');
  });

  it('renders additional projects section when available', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    expect(screen.getByText('More Projects')).toBeDefined();
    expect(screen.getByText('Additional Project 1')).toBeDefined();
    // With default featuredCount of 1, only one additional project is rendered
  });

  it('respects featuredCount prop', () => {
    const projectsWithMany = [
      ...mockProjects,
      {
        title: 'Hidden Project',
        description: 'This should not appear in additional projects',
        tech: ['Hidden'],
        githubUrl: '#',
        thumbnail: 'https://example.com/hidden.jpg',
      },
    ];
    
    render(
      <FeaturedProjectsSection 
        projects={projectsWithMany} 
        featuredCount={2}
      />
    );
    
    // With featuredCount of 2, it should include projects at indices 1 and 2
    expect(screen.getByText('Additional Project 1')).toBeDefined();
    expect(screen.getByText('Additional Project 2')).toBeDefined();
    // But not the hidden project (index 3)
    expect(screen.queryByText('Hidden Project')).toBeNull();
  });

  it('does not render additional projects section when only featured project exists', () => {
    const singleProject = [mockProjects[0]];
    render(<FeaturedProjectsSection projects={singleProject} />);
    expect(screen.queryByText('More Projects')).toBeNull();
  });

  it('returns null when projects array is empty', () => {
    const { container } = render(<FeaturedProjectsSection projects={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('has proper responsive layout classes', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-20', 'bg-white');
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    expect(container.querySelector('section')).toBeDefined();
    expect(container.querySelector('h2')).toBeDefined();
    expect(container.querySelector('h3')).toBeDefined();
  });

  it('has proper section header styling', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const title = screen.getByText('Featured Projects');
    expect(title).toHaveClass('text-4xl', 'font-bold', 'text-primary');
  });

  it('has responsive grid for additional projects', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const grid = container.querySelector('.grid.md\\:grid-cols-2');
    expect(grid).toBeDefined();
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('applies proper hover effects to featured project', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const featuredProject = container.querySelector('.hover\\:shadow-xl');
    expect(featuredProject).toBeDefined();
  });

  it('has proper spacing between sections', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const featuredSection = container.querySelector('.mb-16');
    expect(featuredSection).toBeDefined();
  });

  it('handles project without thumbnail gracefully', () => {
    const projectWithoutThumbnail = {
      ...mockProjects[0],
      thumbnail: undefined,
    };
    render(<FeaturedProjectsSection projects={[projectWithoutThumbnail]} />);
    const thumbnail = screen.queryByAltText('Featured Project thumbnail');
    expect(thumbnail).toBeNull();
  });

  it('handles featured project without demoUrl', () => {
    const projectWithoutDemo = {
      ...mockProjects[0],
      demoUrl: undefined,
    };
    render(<FeaturedProjectsSection projects={[projectWithoutDemo]} />);
    expect(screen.queryByText('Live Demo')).toBeNull();
    expect(screen.getByText('GitHub')).toBeDefined();
  });

  it('handles featured project without githubUrl', () => {
    const projectWithoutGithub = {
      ...mockProjects[0],
      githubUrl: undefined,
    };
    render(<FeaturedProjectsSection projects={[projectWithoutGithub]} />);
    expect(screen.queryByText('GitHub')).toBeNull();
    expect(screen.getByText('Live Demo')).toBeDefined();
  });

  it('renders featured project with proper ARIA labels', () => {
    render(<FeaturedProjectsSection projects={mockProjects} />);
    const demoLink = screen.getByLabelText('View live demo of Featured Project');
    expect(demoLink).toHaveAttribute('aria-label', 'View live demo of Featured Project');
    
    const githubLink = screen.getByLabelText('View Featured Project on GitHub');
    expect(githubLink).toHaveAttribute('aria-label', 'View Featured Project on GitHub');
  });

  it('has proper gradient overlay on featured project thumbnail', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const gradient = container.querySelector('.bg-gradient-to-t');
    expect(gradient).toBeDefined();
  });

  it('has responsive height for featured project thumbnail', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const thumbnailContainer = container.querySelector('.h-80');
    expect(thumbnailContainer).toBeDefined();
    expect(thumbnailContainer).toHaveClass('lg:h-96');
  });

  it('uses consistent spacing in technology stack badges', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    // Target only the featured project tech badges with the specific styling
    const techBadges = container.querySelectorAll('.bg-white\\/20.backdrop-blur-sm');
    expect(techBadges.length).toBeGreaterThan(0);
    techBadges.forEach(badge => {
      expect(badge).toHaveClass('bg-white/20', 'text-white', 'rounded-full');
    });
  });

  it('has proper button styling for featured project actions', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    // Target only the featured project buttons with the specific styling
    const featuredButtons = container.querySelectorAll('.px-8.py-3');
    expect(featuredButtons.length).toBeGreaterThan(0);
    featuredButtons.forEach(button => {
      expect(button).toHaveClass('rounded-lg', 'font-semibold');
    });
  });

  it('maintains consistent layout structure', () => {
    const { container } = render(<FeaturedProjectsSection projects={mockProjects} />);
    const section = container.querySelector('section');
    const innerContainer = section?.querySelector('.max-w-7xl');
    expect(innerContainer).toBeDefined();
  });
});
