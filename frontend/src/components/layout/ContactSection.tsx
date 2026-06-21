"use client";

import React, { useState } from 'react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message || formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
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
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
            <div className="space-y-4">
              {['name', 'email', 'subject'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-secondary capitalize">{field}</label>
                  <input
                    id={field}
                    type={field === 'email' ? 'email' : 'text'}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full p-2 border rounded mt-1"
                    aria-invalid={!!errors[field]}
                    aria-describedby={`${field}-error`}
                  />
                  {errors[field] && <p id={`${field}-error`} className="text-rose-600 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2 border rounded mt-1"
                  rows={4}
                  aria-invalid={!!errors.message}
                  aria-describedby="message-error"
                />
                {errors.message && <p id="message-error" className="text-rose-600 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p className="text-emerald-600 text-center">Message sent successfully!</p>}
              {status === 'error' && <p className="text-rose-600 text-center">Failed to send message. Please try again.</p>}
            </div>
          </form>

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
