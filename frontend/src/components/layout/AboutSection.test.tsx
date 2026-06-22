import { render, screen } from '@testing-library/react';
import { AboutSection } from './AboutSection';
import { describe, it, expect } from 'vitest';

describe('AboutSection Component', () => {
  it('renders correctly', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeDefined();
    expect(screen.getByText('Professional Summary')).toBeDefined();
    expect(screen.getByText('Key Achievements')).toBeDefined();
  });
});
