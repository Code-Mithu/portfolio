import { render, screen } from '@testing-library/react';
import { ProjectActions } from './ProjectActions';
import { Project } from './ProjectCard';
import { describe, it, expect } from 'vitest';

describe('ProjectActions Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'Test description',
    tech: ['React'],
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
  };

  it('renders both GitHub and Live Demo links when both URLs are provided', () => {
    render(<ProjectActions project={mockProject} />);
    expect(screen.getByLabelText('View Test Project on GitHub')).toBeDefined();
    expect(screen.getByLabelText('View live demo of Test Project')).toBeDefined();
  });

  it('renders only GitHub link when only githubUrl is provided', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectActions project={projectWithoutDemo} />);
    expect(screen.getByLabelText('View Test Project on GitHub')).toBeDefined();
    expect(screen.queryByLabelText('View live demo of Test Project')).toBeNull();
  });

  it('renders only Live Demo link when only demoUrl is provided', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(<ProjectActions project={projectWithoutGithub} />);
    expect(screen.getByLabelText('View live demo of Test Project')).toBeDefined();
    expect(screen.queryByLabelText('View Test Project on GitHub')).toBeNull();
  });

  it('renders no links when neither URL is provided', () => {
    const projectWithoutLinks = { 
      ...mockProject, 
      githubUrl: undefined, 
      demoUrl: undefined 
    };
    const { container } = render(<ProjectActions project={projectWithoutLinks} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('applies card variant styling by default', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveClass('flex-1', 'px-4', 'py-2');
  });

  it('applies modal variant styling when specified', () => {
    const { container } = render(
      <ProjectActions project={mockProject} variant="modal" />
    );
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveClass('px-6', 'py-3', 'border', 'gap-2');
  });

  it('applies hero variant styling when specified', () => {
    const { container } = render(
      <ProjectActions project={mockProject} variant="hero" />
    );
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveClass('px-8', 'py-3');
  });

  it('hides labels when showLabels is false', () => {
    render(<ProjectActions project={mockProject} showLabels={false} />);
    expect(screen.queryByText('GitHub')).toBeNull();
    expect(screen.queryByText('Live Demo')).toBeNull();
  });

  it('shows labels when showLabels is true (default)', () => {
    render(<ProjectActions project={mockProject} showLabels={true} />);
    expect(screen.getByText('GitHub')).toBeDefined();
    expect(screen.getByText('Live Demo')).toBeDefined();
  });

  it('includes icons in modal variant', () => {
    const { container } = render(<ProjectActions project={mockProject} variant="modal" />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has proper external link security attributes', () => {
    render(<ProjectActions project={mockProject} />);
    
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has proper accessibility labels', () => {
    render(<ProjectActions project={mockProject} />);
    
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveAttribute('aria-label', 'View Test Project on GitHub');
    
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveAttribute('aria-label', 'View live demo of Test Project');
  });

  it('renders links in correct order (Demo first, then GitHub)', () => {
    render(<ProjectActions project={mockProject} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('aria-label', 'View live demo of Test Project');
    expect(links[1]).toHaveAttribute('aria-label', 'View Test Project on GitHub');
  });

  it('has proper hover effects', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link.className).toContain('hover:');
      expect(link).toHaveClass('transition-colors');
    });
  });

  it('has proper spacing between links', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('flex', 'gap-3');
  });

  it('maintains consistent flex layout', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('flex', 'flex-wrap');
  });

  it('renders GitHub link with proper styling', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveClass('bg-white', 'border', 'text-primary');
  });

  it('renders Live Demo link with proper styling', () => {
    const { container } = render(<ProjectActions project={mockProject} />);
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveClass('bg-primary', 'text-white');
  });

  it('has security validation - prevents tabnabbing with noopener', () => {
    render(<ProjectActions project={mockProject} />);
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has security validation - prevents referrer leakage with noreferrer', () => {
    render(<ProjectActions project={mockProject} />);
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has security validation - opens in new tab', () => {
    render(<ProjectActions project={mockProject} />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('has proper link hrefs pointing to correct URLs', () => {
    render(<ProjectActions project={mockProject} />);
    
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveAttribute('href', 'https://demo.test.com');
  });

  it('handles empty project object gracefully', () => {
    const emptyProject = {
      title: '',
      description: '',
      tech: [],
      githubUrl: undefined,
      demoUrl: undefined,
    };
    const { container } = render(<ProjectActions project={emptyProject} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('handles project with only GitHub URL', () => {
    const githubOnlyProject = {
      ...mockProject,
      demoUrl: undefined,
    };
    render(<ProjectActions project={githubOnlyProject} />);
    expect(screen.getByText('GitHub')).toBeDefined();
    expect(screen.queryByText('Live Demo')).toBeNull();
  });

  it('handles project with only Demo URL', () => {
    const demoOnlyProject = {
      ...mockProject,
      githubUrl: undefined,
    };
    render(<ProjectActions project={demoOnlyProject} />);
    expect(screen.getByText('Live Demo')).toBeDefined();
    expect(screen.queryByText('GitHub')).toBeNull();
  });

  it('has responsive button sizing in card variant', () => {
    const { container } = render(<ProjectActions project={mockProject} variant="card" />);
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveClass('text-sm');
    });
  });

  it('has larger button sizing in modal variant', () => {
    const { container } = render(<ProjectActions project={mockProject} variant="modal" />);
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveClass('font-semibold');
    });
  });

  it('has proper flex layout for link distribution', () => {
    const { container } = render(<ProjectActions project={mockProject} variant="card" />);
    const links = container.querySelectorAll('a');
    links.forEach(link => {
      expect(link).toHaveClass('flex-1');
    });
  });
});
