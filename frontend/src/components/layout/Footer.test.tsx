import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { describe, it, expect } from 'vitest';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
    expect(screen.getByText('Back to Top ↑')).toBeDefined();
  });
});
