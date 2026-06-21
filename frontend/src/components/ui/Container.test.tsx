import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import { describe, it, expect } from 'vitest';

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(<Container>Test Content</Container>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('applies custom class names', () => {
    const { container } = render(<Container className="custom-class">Content</Container>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct layout classes for responsiveness', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstChild).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
  });
});
