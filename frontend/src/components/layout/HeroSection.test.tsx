import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { describe, it, expect } from 'vitest';

describe('HeroSection Component', () => {
  it('renders correctly', () => {
    render(<HeroSection />);
    expect(screen.getByText('Building Digital Experiences with Precision.')).toBeDefined();
    expect(screen.getByText('View Projects')).toBeDefined();
    expect(screen.getByText('Contact Me')).toBeDefined();
  });
});
