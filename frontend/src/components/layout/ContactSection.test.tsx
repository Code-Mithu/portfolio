import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from './ContactSection';
import { describe, it, expect } from 'vitest';

describe('ContactSection Component', () => {
  it('renders correctly', () => {
    render(<ContactSection />);
    expect(screen.getByText('Contact Me')).toBeDefined();
    expect(screen.getByLabelText(/name/i)).toBeDefined();
  });

  it('validates required fields', async () => {
    render(<ContactSection />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(await screen.findByText('Name is required')).toBeDefined();
  });
});
