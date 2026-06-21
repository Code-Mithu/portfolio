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
});
