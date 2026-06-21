import { render, screen } from '@testing-library/react';
import { EducationSection } from './EducationSection';
import { describe, it, expect } from 'vitest';

describe('EducationSection Component', () => {
  it('renders correctly', () => {
    render(<EducationSection />);
    expect(screen.getByText('Education')).toBeDefined();
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
    expect(screen.getByText('University of Technology')).toBeDefined();
  });
});
