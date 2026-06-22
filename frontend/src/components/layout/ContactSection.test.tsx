import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from './ContactSection';
import { describe, it, expect } from 'vitest';

describe('ContactSection Component', () => {
  it('renders correctly', () => {
    render(<ContactSection />);
    expect(screen.getByText('Contact Me')).toBeDefined();
    expect(screen.getByText("Let's Connect")).toBeDefined();
  });

  it('renders ContactForm component', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/Name/)).toBeDefined();
    expect(screen.getByLabelText(/Email/)).toBeDefined();
    expect(screen.getByLabelText(/Subject/)).toBeDefined();
    expect(screen.getByLabelText(/Message/)).toBeDefined();
  });

  it('renders submit button', () => {
    render(<ContactSection />);
    expect(screen.getByText('Send Message')).toBeDefined();
  });

  it('shows success message after successful submission', async () => {
    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Message sent successfully!')).toBeDefined();
    });
  });

  it('has proper grid layout', () => {
    const { container } = render(<ContactSection />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('md:grid-cols-2', 'gap-12');
  });

  it('renders contact info', () => {
    render(<ContactSection />);
    expect(screen.getByText('Feel free to reach out for collaborations or inquiries.')).toBeDefined();
    expect(screen.getByText('email@example.com')).toBeDefined();
  });

  it('renders social links', () => {
    render(<ContactSection />);
    expect(screen.getByText('LinkedIn')).toBeDefined();
    expect(screen.getByText('GitHub')).toBeDefined();
  });

  it('has proper form container styling', () => {
    const { container } = render(<ContactSection />);
    const formContainer = container.querySelector('.bg-white');
    expect(formContainer).toHaveClass('p-8', 'rounded-lg', 'shadow-sm', 'border');
  });

  it('has proper section styling', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('py-16', 'bg-slate-50');
  });

  it('disables form during submission', async () => {
    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    expect(screen.getByText('Sending...')).toBeDefined();
  });
});
