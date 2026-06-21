import { render, screen } from '@testing-library/react';
import { ResumeSection } from './ResumeSection';
import { describe, it, expect } from 'vitest';

describe('ResumeSection Component', () => {
  it('renders correctly', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Resume & Certifications')).toBeDefined();
    expect(screen.getByText('Download Resume')).toBeDefined();
    expect(screen.getByText('View Resume')).toBeDefined();
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
  });
});
