import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { describe, it, expect, vi } from 'vitest';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Portfolio')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Close menu')).toBeDefined();
    // Use getAllByText and check if at least one is visible or check for mobile menu container
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
  });
});
