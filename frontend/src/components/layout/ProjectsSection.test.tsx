import { render, screen } from '@testing-library/react';
import { ProjectsSection } from './ProjectsSection';
import { describe, it, expect } from 'vitest';

describe('ProjectsSection Component', () => {
  it('renders correctly', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('Featured Projects')).toBeDefined();
    expect(screen.getByText('Portfolio Website')).toBeDefined();
  });
});
