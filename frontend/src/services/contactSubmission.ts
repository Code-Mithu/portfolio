/**
 * Form submission service for contact form
 * Handles submission logic with loading, success, and error states
 */

import { ContactFormData } from '../utils/validation';

export interface SubmissionResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface SubmissionConfig {
  endpoint: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Simulates an API submission (replace with actual API call in production)
 */
export async function submitContactForm(
  data: ContactFormData,
  config: SubmissionConfig = { endpoint: '/api/contact' }
): Promise<SubmissionResult> {
  const { endpoint, method = 'POST', headers = {}, timeout = 10000 } = config;

  try {
    // Simulate API call with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Replace this with actual API call in production
    // const response = await fetch(endpoint, {
    //   method,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     ...headers,
    //   },
    //   body: JSON.stringify(data),
    //   signal: controller.signal,
    // });

    // Simulated API response
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearTimeout(timeoutId);

    // Simulate 90% success rate for demo purposes
    // In production, this would check the actual response status
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      return {
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
        data: { timestamp: new Date().toISOString() },
      };
    } else {
      throw new Error('Failed to send message. Please try again.');
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}

/**
 * Actual API submission for production use
 */
export async function submitContactFormAPI(
  data: ContactFormData,
  config: SubmissionConfig = { endpoint: '/api/contact' }
): Promise<SubmissionResult> {
  const { endpoint, method = 'POST', headers = {}, timeout = 10000 } = config;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Server error' }));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || 'Message sent successfully!',
      data: result.data,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred. Please try again.');
  }
}
