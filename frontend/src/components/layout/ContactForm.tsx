'use client';

import React from 'react';
import { validateContactForm, defaultContactFormRules, ContactFormData } from '../../utils/validation';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void | Promise<void>;
  isLoading?: boolean;
  initialData?: Partial<ContactFormData>;
  onError?: (error: unknown) => void;
}

/**
 * ContactForm component with name, email, subject, message fields and submit button.
 * Features responsive design, accessibility support, validation, and clean UI.
 */
export const ContactForm = ({ onSubmit, isLoading = false, initialData, onError }: ContactFormProps) => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    subject: initialData?.subject || '',
    message: initialData?.message || '',
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateField = (field: keyof ContactFormData, value: string) => {
    const tempData = { ...formData, [field]: value };
    const result = validateContactForm(tempData, defaultContactFormRules);
    const fieldError = result.errors.find((error) => error.field.toLowerCase() === field);
    return fieldError ? fieldError.message : '';
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const result = validateContactForm(formData, defaultContactFormRules);
    const errorsMap: Record<string, string> = {};
    result.errors.forEach((error) => {
      errorsMap[error.field.toLowerCase()] = error.message;
    });

    setErrors(errorsMap);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (result.isValid) {
      try {
        await onSubmit(formData);
      } catch (error) {
        onError?.(error);
      }
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-secondary mb-2">
          Name <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          placeholder="Your name"
          required
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400 ${
            errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
          }`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : 'contact-name-help'}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-rose-500 text-xs mt-1" role="alert">
            {errors.name}
          </p>
        )}
        <span id="contact-name-help" className="sr-only">
          Enter your full name
        </span>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-secondary mb-2">
          Email <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="your.email@example.com"
          required
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400 ${
            errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : 'contact-email-help'}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-rose-500 text-xs mt-1" role="alert">
            {errors.email}
          </p>
        )}
        <span id="contact-email-help" className="sr-only">
          Enter your email address
        </span>
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-secondary mb-2">
          Subject <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          onBlur={() => handleBlur('subject')}
          placeholder="What is this regarding?"
          required
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400 ${
            errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
          }`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'contact-subject-error' : 'contact-subject-help'}
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-rose-500 text-xs mt-1" role="alert">
            {errors.subject}
          </p>
        )}
        <span id="contact-subject-help" className="sr-only">
          Enter the subject of your message
        </span>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-secondary mb-2">
          Message <span className="text-rose-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          placeholder="Your message..."
          required
          rows={5}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400 resize-none ${
            errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300'
          }`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-help'}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-rose-500 text-xs mt-1" role="alert">
            {errors.message}
          </p>
        )}
        <span id="contact-message-help" className="sr-only">
          Enter your message (minimum 10 characters)
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        aria-describedby="submit-help"
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Send Message</span>
          </>
        )}
      </button>
      <span id="submit-help" className="sr-only">
        {isLoading ? 'Message is being sent. Please wait.' : 'Click to send your message.'}
      </span>
    </form>
  );
};
