'use client';

import React from 'react';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isLoading?: boolean;
  initialData?: Partial<ContactFormData>;
}

/**
 * ContactForm component with name, email, subject, message fields and submit button.
 * Features responsive design, accessibility support, and clean UI.
 */
export const ContactForm = ({ onSubmit, isLoading = false, initialData }: ContactFormProps) => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    subject: initialData?.subject || '',
    message: initialData?.message || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="Your name"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          aria-describedby="contact-name-help"
        />
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
          placeholder="your.email@example.com"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          aria-describedby="contact-email-help"
        />
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
          placeholder="What is this regarding?"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400"
          aria-describedby="contact-subject-help"
        />
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
          placeholder="Your message..."
          required
          rows={5}
          disabled={isLoading}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-slate-400 resize-none"
          aria-describedby="contact-message-help"
        />
        <span id="contact-message-help" className="sr-only">
          Enter your message
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
