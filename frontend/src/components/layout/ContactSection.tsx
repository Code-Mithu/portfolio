"use client";

import React, { useState } from 'react';
import { ContactForm } from './ContactForm';
import { ContactFormData } from '../../utils/validation';

export const ContactSection = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [key, setKey] = useState(0);

  const handleFormSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      // Reset form by incrementing key to force re-render
      setKey(prev => prev + 1);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            <ContactForm key={key} onSubmit={handleFormSubmit} isLoading={status === 'submitting'} />
            {status === 'success' && (
              <div role="alert" aria-live="polite" className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-center">
                Message sent successfully!
              </div>
            )}
            {status === 'error' && (
              <div role="alert" aria-live="polite" className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                Failed to send message. Please try again.
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-primary mb-6">Let's Connect</h3>
            <p className="text-secondary mb-4">Feel free to reach out for collaborations or inquiries.</p>
            <p className="text-primary font-medium">email@example.com</p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-secondary hover:text-primary">LinkedIn</a>
              <a href="#" className="text-secondary hover:text-primary">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
