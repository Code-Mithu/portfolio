"use client";

import React, { useState, useRef } from 'react';
import { ContactForm } from './ContactForm';
import { ContactFormData } from '../../utils/validation';
import { submitContactForm } from '../../services/contactSubmission';

const RATE_LIMIT_MS = 10_000;

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactSection = () => {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [key, setKey] = useState(0);
  const lastSubmitRef = useRef<number>(0);

  const handleFormSubmit = async (data: ContactFormData) => {
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) {
      setStatus('error');
      setStatusMessage('Please wait a few seconds before submitting again.');
      return;
    }
    lastSubmitRef.current = now;

    setStatus('submitting');
    setStatusMessage('');

    try {
      const result = await submitContactForm(data);
      
      if (result.success) {
        setStatus('success');
        setStatusMessage(result.message);
        // Reset form by incrementing key to force re-render
        setKey(prev => prev + 1);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setStatusMessage('');
  };

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            {status === 'idle' || status === 'submitting' ? (
              <ContactForm 
                key={key} 
                onSubmit={handleFormSubmit} 
                isLoading={status === 'submitting'} 
              />
            ) : status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">Message Sent!</h3>
                <p className="text-secondary mb-6">{statusMessage}</p>
                <button
                  onClick={handleRetry}
                  className="text-primary font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Submission Failed</h3>
                <p className="text-secondary mb-6">{statusMessage}</p>
                <button
                  onClick={handleRetry}
                  className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
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
