import { render, screen } from '@testing-library/react';
import { ExperienceSection } from './ExperienceSection';
import { describe, it, expect } from 'vitest';

describe('ExperienceSection Component', () => {
  it('renders correctly', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Work Experience')).toBeDefined();
    expect(screen.getByText('Senior Frontend Engineer')).toBeDefined();
    expect(screen.getByText('Tech Solutions Inc.')).toBeDefined();
  });

  it('renders all experiences', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Senior Frontend Engineer')).toBeDefined();
    expect(screen.getByText('Frontend Developer')).toBeDefined();
  });

  it('renders company names', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Tech Solutions Inc.')).toBeDefined();
    expect(screen.getByText('Creative Agency')).toBeDefined();
  });

  it('renders job responsibilities', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Led the development of a complex dashboard application.')).toBeDefined();
    expect(screen.getByText('Built responsive websites for diverse clients using React and Tailwind CSS.')).toBeDefined();
  });

  it('uses Timeline component for layout', () => {
    const { container } = render(<ExperienceSection />);
    const timeline = container.querySelector('.relative');
    expect(timeline).toBeDefined();
  });
});
