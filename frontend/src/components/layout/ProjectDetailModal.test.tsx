import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Project } from './ProjectCard';
import { describe, it, expect, vi } from 'vitest';

describe('ProjectDetailModal Component', () => {
  const mockProject: Project = {
    title: 'Test Project',
    description: 'A brief description of the test project.',
    detailedDescription: 'This is a detailed description of the test project that provides more information about what was built and why.',
    tech: ['React', 'TypeScript', 'Node.js'],
    features: ['Feature 1: User authentication', 'Feature 2: Real-time updates', 'Feature 3: Responsive design'],
    thumbnail: 'https://example.com/thumbnail.jpg',
    githubUrl: 'https://github.com/test/project',
    demoUrl: 'https://demo.test.com',
  };

  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('does not render when isOpen is false', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={false} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('Test Project')).toBeNull();
  });

  it('does not render when project is null', () => {
    render(
      <ProjectDetailModal 
        project={null} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('Test Project')).toBeNull();
  });

  it('renders when isOpen is true and project is provided', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByText('Test Project')).toBeDefined();
    expect(screen.getByText('A brief description of the test project.')).toBeDefined();
  });

  it('renders detailed description when provided', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByText('About This Project')).toBeDefined();
    expect(screen.getByText(/This is a detailed description/)).toBeDefined();
  });

  it('renders technology stack', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByText('Technology Stack')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
    expect(screen.getByText('Node.js')).toBeDefined();
  });

  it('renders features list when provided', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.getByText('Key Features')).toBeDefined();
    expect(screen.getByText('Feature 1: User authentication')).toBeDefined();
    expect(screen.getByText('Feature 2: Real-time updates')).toBeDefined();
    expect(screen.getByText('Feature 3: Responsive design')).toBeDefined();
  });

  it('renders thumbnail when provided', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const thumbnail = screen.getByAltText('Test Project screenshot');
    expect(thumbnail).toBeDefined();
    expect(thumbnail).toHaveAttribute('src', 'https://example.com/thumbnail.jpg');
  });

  it('renders action buttons with correct links', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const githubLink = screen.getByLabelText('View Test Project on GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    
    const demoLink = screen.getByLabelText('View live demo of Test Project');
    expect(demoLink).toHaveAttribute('href', 'https://demo.test.com');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('has proper heading structure', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Test Project');
    expect(title).toHaveAttribute('id', 'modal-title');
  });

  it('closes on escape key press', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('prevents body scroll when modal is open', () => {
    const { rerender } = render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={false} 
        onClose={mockOnClose} 
      />
    );
    expect(document.body.style.overflow).toBe('unset');
  });

  it('handles project without detailed description', () => {
    const projectWithoutDetailed = { ...mockProject, detailedDescription: undefined };
    render(
      <ProjectDetailModal 
        project={projectWithoutDetailed} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('About This Project')).toBeNull();
  });

  it('handles project without features', () => {
    const projectWithoutFeatures = { ...mockProject, features: undefined };
    render(
      <ProjectDetailModal 
        project={projectWithoutFeatures} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('Key Features')).toBeNull();
  });

  it('handles project without thumbnail', () => {
    const projectWithoutThumbnail = { ...mockProject, thumbnail: undefined };
    render(
      <ProjectDetailModal 
        project={projectWithoutThumbnail} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const thumbnail = screen.queryByAltText('Test Project screenshot');
    expect(thumbnail).toBeNull();
  });

  it('handles project without demoUrl', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(
      <ProjectDetailModal 
        project={projectWithoutDemo} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('Live Demo')).toBeNull();
    expect(screen.getByLabelText('View Test Project on GitHub')).toBeDefined();
  });

  it('handles project without githubUrl', () => {
    const projectWithoutGithub = { ...mockProject, githubUrl: undefined };
    render(
      <ProjectDetailModal 
        project={projectWithoutGithub} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('GitHub')).toBeNull();
    expect(screen.getByLabelText('View live demo of Test Project')).toBeDefined();
  });

  it('has proper responsive design classes', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const modalContent = screen.getByRole('dialog').querySelector('.bg-white');
    expect(modalContent).toHaveClass('max-w-4xl', 'w-full', 'max-h-[90vh]', 'overflow-y-auto');
  });

  it('has proper modal overlay', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('bg-black/50', 'backdrop-blur-sm');
  });

  it('has sticky header for better UX', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const header = screen.getByRole('dialog').querySelector('.sticky');
    expect(header).toHaveClass('top-0', 'bg-white', 'border-b');
  });

  it('has proper section structure', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const sections = screen.getByRole('dialog').querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('has proper focus management on open', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toEqual(document.activeElement);
  });

  it('has close button with proper accessibility', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  it('renders features with checkmark icons', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const checkmarks = screen.getByRole('dialog').querySelectorAll('.bg-green-100');
    expect(checkmarks.length).toBe(3);
  });

  it('has action buttons section with proper styling', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const actionSection = screen.getByRole('dialog').querySelector('.pt-4.border-t');
    expect(actionSection).toHaveClass('border-slate-200');
  });

  it('handles empty features array gracefully', () => {
    const projectWithEmptyFeatures = { ...mockProject, features: [] };
    render(
      <ProjectDetailModal 
        project={projectWithEmptyFeatures} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    expect(screen.queryByText('Key Features')).toBeNull();
  });

  it('maintains consistent styling for technology badges', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const techBadges = screen.getByRole('dialog').querySelectorAll('.bg-blue-50');
    expect(techBadges.length).toBe(3);
    techBadges.forEach(badge => {
      expect(badge).toHaveClass('rounded-full', 'text-sm', 'font-medium', 'border');
    });
  });

  it('has proper animation classes', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const modalContent = screen.getByRole('dialog').querySelector('.bg-white');
    expect(modalContent).toHaveClass('animate-in', 'fade-in', 'zoom-in', 'duration-200');
  });

  it('has proper modal container positioning', () => {
    render(
      <ProjectDetailModal 
        project={mockProject} 
        isOpen={true} 
        onClose={mockOnClose} 
      />
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveClass('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center');
  });

  describe('Focus Trap', () => {
    it('traps focus forward: wraps from last to first focusable element on Tab', () => {
      render(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );
      const modal = screen.getByRole('dialog');
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      lastElement.focus();
      expect(document.activeElement).toBe(lastElement);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
      document.dispatchEvent(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('traps focus backward: wraps from first to last focusable element on Shift+Tab', () => {
      render(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );
      const modal = screen.getByRole('dialog');
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;

      firstElement.focus();
      expect(document.activeElement).toBe(firstElement);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
      const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
      document.dispatchEvent(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('does not trap focus when non-Tab key is pressed', () => {
      render(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      document.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('does not interfere with Tab when focus is not on boundary elements', () => {
      render(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );
      const modal = screen.getByRole('dialog');
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 2) {
        const middleElement = focusableElements[1] as HTMLElement;
        middleElement.focus();

        const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
        const preventDefaultSpy = vi.spyOn(tabEvent, 'preventDefault');
        document.dispatchEvent(tabEvent);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      }
    });

    it('cleans up focus trap listener when modal closes', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const { rerender } = render(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={true} 
          onClose={mockOnClose} 
        />
      );

      rerender(
        <ProjectDetailModal 
          project={mockProject} 
          isOpen={false} 
          onClose={mockOnClose} 
        />
      );

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });
  });
});
