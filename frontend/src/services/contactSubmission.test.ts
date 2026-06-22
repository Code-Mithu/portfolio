import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContactForm, submitContactFormAPI, SubmissionConfig } from '../services/contactSubmission';
import { ContactFormData } from '../utils/validation';

describe('Contact Submission Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('submitContactForm (simulated)', () => {
    it('returns success result with message', async () => {
      const mockData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      // Mock Math.random to always return success ( > 0.1)
      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const result = await submitContactForm(mockData);
      
      expect(result.success).toBe(true);
      expect(result.message).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.timestamp).toBeDefined();
    });

    it('throws error on simulated failure', async () => {
      const mockData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      // Mock Math.random to always return failure ( <= 0.1)
      vi.spyOn(Math, 'random').mockReturnValue(0.05);

      await expect(submitContactForm(mockData)).rejects.toThrow('Failed to send message');
    });

    it('uses custom endpoint from config', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };
      const config: SubmissionConfig = { endpoint: '/api/custom-contact' };

      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const result = await submitContactForm(mockData, config);
      
      expect(result.success).toBe(true);
    });

    it('uses custom timeout from config', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };
      const config: SubmissionConfig = { endpoint: '/api/contact', timeout: 5000 };

      vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const result = await submitContactForm(mockData, config);
      
      expect(result.success).toBe(true);
    });
  });

  describe('submitContactFormAPI (actual API)', () => {
    it('calls fetch with correct parameters', async () => {
      const mockData: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success!', data: { id: 123 } }),
      }) as any;

      const result = await submitContactFormAPI(mockData);

      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
        signal: expect.any(AbortSignal),
      });

      expect(result.success).toBe(true);
      expect(result.message).toBe('Success!');
      expect(result.data).toEqual({ id: 123 });
    });

    it('uses custom method from config', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };
      const config: SubmissionConfig = { endpoint: '/api/contact', method: 'PUT' };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success!' }),
      }) as any;

      await submitContactFormAPI(mockData, config);

      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'PUT',
      }));
    });

    it('uses custom headers from config', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };
      const config: SubmissionConfig = {
        endpoint: '/api/contact',
        headers: { 'Authorization': 'Bearer token' },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Success!' }),
      }) as any;

      await submitContactFormAPI(mockData, config);

      expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token',
        }),
      }));
    });

    it('throws error on non-ok response', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ message: 'Invalid data' }),
      }) as any;

      await expect(submitContactFormAPI(mockData)).rejects.toThrow('Invalid data');
    });

    it('throws generic error when server returns no message', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }) as any;

      await expect(submitContactFormAPI(mockData)).rejects.toThrow('Server error: 500');
    });

    it('handles JSON parsing error gracefully', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      }) as any;

      await expect(submitContactFormAPI(mockData)).rejects.toThrow('Server error');
    });

    it('handles network error', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockRejectedValue(new Error('Network error')) as any;

      await expect(submitContactFormAPI(mockData)).rejects.toThrow('Network error');
    });

    it('uses default message when response has none', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: { id: 123 } }),
      }) as any;

      const result = await submitContactFormAPI(mockData);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Message sent successfully!');
      expect(result.data).toEqual({ id: 123 });
    });

    it('handles unexpected error type', async () => {
      const mockData: ContactFormData = {
        name: 'Test',
        email: 'test@test.com',
        subject: 'Test',
        message: 'Test',
      };

      global.fetch = vi.fn().mockRejectedValue('string error') as any;

      await expect(submitContactFormAPI(mockData)).rejects.toThrow('An unexpected error occurred');
    });
  });
});
