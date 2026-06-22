import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from './ContactForm';
import { describe, it, expect, vi } from 'vitest';

describe('ContactForm Component', () => {
  const mockSubmit = vi.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders name field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Name/)).toBeDefined();
    expect(screen.getByPlaceholderText('Your name')).toBeDefined();
  });

  it('renders email field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Email/)).toBeDefined();
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeDefined();
  });

  it('renders subject field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Subject/)).toBeDefined();
    expect(screen.getByPlaceholderText('What is this regarding?')).toBeDefined();
  });

  it('renders message field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    expect(screen.getByLabelText(/Message/)).toBeDefined();
    expect(screen.getByPlaceholderText('Your message...')).toBeDefined();
  });

  it('renders submit button', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    expect(screen.getByText('Send Message')).toBeDefined();
  });

  it('shows error for empty name on submit', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Name is required')).toBeDefined();
  });

  it('shows error for empty email on submit', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Email is required')).toBeDefined();
  });

  it('shows error for invalid email on submit', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'A valid message text' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Please enter a valid email address')).toBeDefined();
  });

  it('shows error for empty subject on submit', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Subject is required')).toBeDefined();
  });

  it('shows error for empty message on submit', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Message is required')).toBeDefined();
  });

  it('shows error for name too short', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'J' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Name must be at least 2 characters')).toBeDefined();
  });

  it('shows error for subject too short', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Hi' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'A valid message text' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Subject must be at least 3 characters')).toBeDefined();
  });

  it('shows error for message too short', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'Short' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Message must be at least 10 characters')).toBeDefined();
  });

  it('clears error when user starts typing', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    
    // Trigger error
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText('Name is required')).toBeDefined();
    
    // Start typing
    fireEvent.change(nameInput, { target: { value: 'J' } });
    expect(screen.queryByText('Name is required')).toBeNull();
  });

  it('validates on field blur', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    
    fireEvent.blur(nameInput);
    expect(screen.getByText('Name is required')).toBeDefined();
  });

  it('does not submit if form has errors', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form data', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Subject/), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'A valid message for testing' } });
    
    fireEvent.click(screen.getByText('Send Message'));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'A valid message for testing',
    });
  });

  it('shows error styling for invalid field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveClass('border-rose-500');
  });

  it('shows red focus ring for invalid field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveClass('focus:ring-rose-500');
  });

  it('removes error styling when field is valid', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveClass('border-slate-300');
    expect(nameInput).not.toHaveClass('border-rose-500');
  });

  it('sets aria-invalid for field with error', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error message with role alert', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText('Send Message'));
    
    const errorMessage = screen.getByText('Name is required');
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('shows required asterisk for name', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const asterisk = container.querySelector('span.text-rose-500');
    expect(asterisk).toBeDefined();
  });

  it('has proper field styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('px-4', 'py-3', 'border', 'rounded-lg');
    });
  });

  it('has proper submit button styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toHaveClass('bg-primary', 'text-white', 'py-3', 'rounded-lg');
  });

  it('has focus ring on inputs', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('focus:ring-2', 'focus:ring-primary');
    });
  });

  it('has proper spacing between fields', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const form = container.querySelector('form');
    expect(form).toHaveClass('space-y-6');
  });

  it('has submit button icon', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const icon = container.querySelector('svg[path*="M12 19l9 2"]');
    expect(icon).toBeDefined();
  });

  it('updates name field value', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
  });

  it('updates email field value', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const emailInput = screen.getByLabelText(/Email/);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('updates subject field value', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const subjectInput = screen.getByLabelText(/Subject/);
    fireEvent.change(subjectInput, { target: { value: 'Project Inquiry' } });
    expect(subjectInput).toHaveValue('Project Inquiry');
  });

  it('updates message field value', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const messageInput = screen.getByLabelText(/Message/);
    fireEvent.change(messageInput, { target: { value: 'Hello, I would like to discuss...' } });
    expect(messageInput).toHaveValue('Hello, I would like to discuss...');
  });

  it('disables submit button when isLoading', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} isLoading={true} />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toBeDisabled();
  });

  it('shows loading spinner when isLoading', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} isLoading={true} />);
    expect(screen.getByText('Sending...')).toBeDefined();
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeDefined();
  });

  it('disables all fields when isLoading', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} isLoading={true} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toBeDisabled();
    });
  });

  it('uses initialData for name field', () => {
    render(<ContactForm onSubmit={mockSubmit} initialData={{ name: 'Jane' }} />);
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveValue('Jane');
  });

  it('uses initialData for email field', () => {
    render(<ContactForm onSubmit={mockSubmit} initialData={{ email: 'jane@example.com' }} />);
    const emailInput = screen.getByLabelText(/Email/);
    expect(emailInput).toHaveValue('jane@example.com');
  });

  it('uses initialData for subject field', () => {
    render(<ContactForm onSubmit={mockSubmit} initialData={{ subject: 'Follow-up' }} />);
    const subjectInput = screen.getByLabelText(/Subject/);
    expect(subjectInput).toHaveValue('Follow-up');
  });

  it('uses initialData for message field', () => {
    render(<ContactForm onSubmit={mockSubmit} initialData={{ message: 'Initial message' }} />);
    const messageInput = screen.getByLabelText(/Message/);
    expect(messageInput).toHaveValue('Initial message');
  });

  it('has proper input type for email field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const emailInput = screen.getByLabelText(/Email/);
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('has proper input type for name field', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveAttribute('type', 'text');
  });

  it('has proper textarea for message field', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const messageInput = container.querySelector('textarea');
    expect(messageInput).toBeDefined();
  });

  it('message field has correct number of rows', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const messageInput = container.querySelector('textarea');
    expect(messageInput).toHaveAttribute('rows', '5');
  });

  it('has proper placeholder text styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('placeholder:text-slate-400');
    });
  });

  it('has proper label styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const labels = container.querySelectorAll('label');
    labels.forEach(label => {
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-secondary');
    });
  });

  it('has proper responsive flex layout on button', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('has disabled state styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} isLoading={true} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  it('has proper border styling on inputs', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('border-slate-300');
    });
  });

  it('has proper outline-none styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('outline-none');
    });
  });

  it('has proper transition styling', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      expect(input).toHaveClass('transition-all');
    });
  });

  it('has proper button gap', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toHaveClass('gap-2');
  });

  it('has proper hover state on button', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const button = container.querySelector('button[type="submit"]');
    expect(button).toHaveClass('hover:bg-blue-700', 'transition-colors');
  });

  it('message field has resize-none', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const messageInput = container.querySelector('textarea');
    expect(messageInput).toHaveClass('resize-none');
  });

  it('has proper screen reader help text', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const helpTexts = container.querySelectorAll('.sr-only');
    expect(helpTexts.length).toBe(5); // 4 fields + submit button
  });

  it('has proper ARIA descriptions', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const nameInput = screen.getByLabelText(/Name/);
    expect(nameInput).toHaveAttribute('aria-describedby', 'contact-name-help');
  });

  it('submit button has ARIA description', () => {
    render(<ContactForm onSubmit={mockSubmit} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', 'submit-help');
  });

  it('has noValidate on form element', () => {
    const { container } = render(<ContactForm onSubmit={mockSubmit} />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('noValidate');
  });
});
