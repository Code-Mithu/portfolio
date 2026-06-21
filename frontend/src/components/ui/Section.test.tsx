import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import { describe, it, expect } from 'vitest';

describe('Section Component', () => {
  it('renders children correctly', () => {
    render(<Section>Test Content</Section>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders with custom id', () => {
    const { container } = render(<Section id="test-id">Content</Section>);
    expect(container.firstChild).toHaveAttribute('id', 'test-id');
  });

  it('has default vertical spacing', () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.firstChild).toHaveClass('py-16');
  });
});
