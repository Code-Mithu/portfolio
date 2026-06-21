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
});
