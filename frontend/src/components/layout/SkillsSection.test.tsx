import { render, screen } from '@testing-library/react';
import { SkillsSection } from './SkillsSection';
import { describe, it, expect } from 'vitest';

describe('SkillsSection Component', () => {
  it('renders correctly', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Skills & Technologies')).toBeDefined();
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('React')).toBeDefined();
  });

  it('renders category descriptions', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Modern frontend technologies and frameworks for building responsive user interfaces')).toBeDefined();
    expect(screen.getByText('Development tools, deployment platforms, and collaboration software')).toBeDefined();
    expect(screen.getByText('Server-side technologies, databases, and API development')).toBeDefined();
  });

  it('renders all skill categories', () => {
    render(<SkillsSection />);
    expect(screen.getByText('Frontend')).toBeDefined();
    expect(screen.getByText('Tools')).toBeDefined();
    expect(screen.getByText('Backend/Other')).toBeDefined();
  });
});
