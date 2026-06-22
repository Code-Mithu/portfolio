import { render, screen } from '@testing-library/react';
import { ProfessionalSummary } from './ProfessionalSummary';
import { describe, it, expect } from 'vitest';

describe('ProfessionalSummary Component', () => {
  it('renders correctly', () => {
    render(<ProfessionalSummary />);
    expect(screen.getByText('Professional Summary')).toBeDefined();
    expect(screen.getByText(/Dedicated frontend engineer/i)).toBeDefined();
  });
});
