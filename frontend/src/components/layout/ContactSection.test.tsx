import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactSection } from './ContactSection';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContactForm } from '../../services/contactSubmission';
import { ContactFormData } from '../../utils/validation';

// Mock the submission service
vi.mock('../../services/contactSubmission');

describe('ContactSection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ContactSection />);
    expect(screen.getByText('Contact Me')).toBeDefined();
    expect(screen.getByText("Let's Connect")).toBeDefined();
  });

  it('renders ContactForm component in idle state', () => {
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

  it('shows loading state during submission', async () => {
    vi.mocked(submitContactForm).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Success!' }), 1500))
    );

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    expect(screen.getByText('Sending...')).toBeDefined();
  });

  it('shows success state after successful submission', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeDefined();
      expect(screen.getByText('Message sent successfully!')).toBeDefined();
    });
  });

  it('shows error state after failed submission', async () => {
    vi.mocked(submitContactForm).mockRejectedValue(new Error('Network error'));

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Submission Failed')).toBeDefined();
      expect(screen.getByText('Network error')).toBeDefined();
    });
  });

  it('resets to idle state when retrying after success', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    // First submission
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeDefined();
    });

    // Click retry
    fireEvent.click(screen.getByText('Send another message'));
    
    expect(screen.getByLabelText(/Name/)).toBeDefined();
    expect(screen.getByText('Send Message')).toBeDefined();
  });

  it('resets to idle state when retrying after error', async () => {
    vi.mocked(submitContactForm).mockRejectedValue(new Error('Network error'));

    render(<ContactSection />);
    
    // First submission
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Submission Failed')).toBeDefined();
    });

    // Click retry
    fireEvent.click(screen.getByText('Try Again'));
    
    expect(screen.getByLabelText(/Name/)).toBeDefined();
    expect(screen.getByText('Send Message')).toBeDefined();
  });

  it('disables form during submission', async () => {
    vi.mocked(submitContactForm).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Success!' }), 1500))
    );

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    expect(screen.getByText('Sending...')).toBeDefined();
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

  it('hides form when in success state', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.queryByLabelText(/Name/)).toBeNull();
      expect(screen.getByText('Message Sent!')).toBeDefined();
    });
  });

  it('hides form when in error state', async () => {
    vi.mocked(submitContactForm).mockRejectedValue(new Error('Network error'));

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.queryByLabelText(/Name/)).toBeNull();
      expect(screen.getByText('Submission Failed')).toBeDefined();
    });
  });

  it('shows success icon with proper styling', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      const iconContainer = screen.getByText('Message Sent!').previousElementSibling;
      expect(iconContainer).toHaveClass('bg-emerald-100', 'rounded-full');
    });
  });

  it('shows error icon with proper styling', async () => {
    vi.mocked(submitContactForm).mockRejectedValue(new Error('Network error'));

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      const iconContainer = screen.getByText('Submission Failed').previousElementSibling;
      expect(iconContainer).toHaveClass('bg-red-100', 'rounded-full');
    });
  });

  it('resets form fields on success', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Test message content' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeDefined();
    });

    // Retry
    fireEvent.click(screen.getByText('Send another message'));
    
    expect(screen.getByLabelText(/Name/)).toHaveValue('');
  });

  it('calls submitContactForm with form data', async () => {
    vi.mocked(submitContactForm).mockResolvedValue({
      success: true,
      message: 'Message sent successfully!',
    });

    render(<ContactSection />);
    
    const formData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message content',
    };
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: formData.name } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: formData.email } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: formData.subject } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: formData.message } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    await waitFor(() => {
      expect(submitContactForm).toHaveBeenCalledWith(formData);
    });
  });
});
