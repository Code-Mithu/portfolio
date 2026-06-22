import {
  validateRequired,
  validateEmail,
  validateMinLength,
  validateMaxLength,
  validateExactLength,
  validatePattern,
  validateContactForm,
  ContactFormData,
  ContactFormValidationRules,
  defaultContactFormRules,
} from '../utils/validation';
import { describe, it, expect } from 'vitest';

describe('Validation Utilities', () => {
  describe('validateRequired', () => {
    it('returns error for empty string', () => {
      const result = validateRequired('', 'Name');
      expect(result).toEqual({ field: 'Name', message: 'Name is required' });
    });

    it('returns error for whitespace only', () => {
      const result = validateRequired('   ', 'Name');
      expect(result).toEqual({ field: 'Name', message: 'Name is required' });
    });

    it('returns null for valid string', () => {
      const result = validateRequired('John Doe', 'Name');
      expect(result).toBeNull();
    });

    it('returns null for string with content', () => {
      const result = validateRequired('Test', 'Field');
      expect(result).toBeNull();
    });
  });

  describe('validateEmail', () => {
    it('returns error for empty email', () => {
      const result = validateEmail('', 'Email');
      expect(result).toEqual({ field: 'Email', message: 'Email is required' });
    });

    it('returns error for invalid email format', () => {
      const result = validateEmail('invalid-email', 'Email');
      expect(result).toEqual({ field: 'Email', message: 'Please enter a valid email address' });
    });

    it('returns error for email without @', () => {
      const result = validateEmail('test.com', 'Email');
      expect(result).toEqual({ field: 'Email', message: 'Please enter a valid email address' });
    });

    it('returns error for email without domain', () => {
      const result = validateEmail('test@', 'Email');
      expect(result).toEqual({ field: 'Email', message: 'Please enter a valid email address' });
    });

    it('returns null for valid email', () => {
      const result = validateEmail('test@example.com', 'Email');
      expect(result).toBeNull();
    });

    it('returns null for email with subdomain', () => {
      const result = validateEmail('test@subdomain.example.com', 'Email');
      expect(result).toBeNull();
    });

    it('returns null for email with numbers', () => {
      const result = validateEmail('user123@example.com', 'Email');
      expect(result).toBeNull();
    });
  });

  describe('validateMinLength', () => {
    it('returns error for string shorter than minimum', () => {
      const result = validateMinLength('ab', 5, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field must be at least 5 characters' });
    });

    it('returns null for empty string', () => {
      const result = validateMinLength('', 3, 'Field');
      expect(result).toBeNull();
    });

    it('returns null for string at minimum length', () => {
      const result = validateMinLength('abc', 3, 'Field');
      expect(result).toBeNull();
    });

    it('returns null for string longer than minimum', () => {
      const result = validateMinLength('abcd', 3, 'Field');
      expect(result).toBeNull();
    });
  });

  describe('validateMaxLength', () => {
    it('returns error for string longer than maximum', () => {
      const result = validateMaxLength('abcdefghij', 5, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field must not exceed 5 characters' });
    });

    it('returns null for string at maximum length', () => {
      const result = validateMaxLength('abcde', 5, 'Field');
      expect(result).toBeNull();
    });

    it('returns null for string shorter than maximum', () => {
      const result = validateMaxLength('abc', 5, 'Field');
      expect(result).toBeNull();
    });

    it('returns null for empty string', () => {
      const result = validateMaxLength('', 5, 'Field');
      expect(result).toBeNull();
    });

    it('uses correct pluralization for single character', () => {
      const result = validateMaxLength('ab', 1, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field must not exceed 1 character' });
    });
  });

  describe('validateExactLength', () => {
    it('returns error for string not exact length', () => {
      const result = validateExactLength('ab', 5, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field must be exactly 5 characters' });
    });

    it('returns error for longer string', () => {
      const result = validateExactLength('abcdef', 5, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field must be exactly 5 characters' });
    });

    it('returns null for exact length string', () => {
      const result = validateExactLength('abcde', 5, 'Field');
      expect(result).toBeNull();
    });

    it('returns null for empty string', () => {
      const result = validateExactLength('', 5, 'Field');
      expect(result).toBeNull();
    });
  });

  describe('validatePattern', () => {
    it('returns error for pattern mismatch', () => {
      const pattern = /^[A-Z]+$/;
      const result = validatePattern('abc', pattern, 'Field');
      expect(result).toEqual({ field: 'Field', message: 'Field is invalid' });
    });

    it('returns null for pattern match', () => {
      const pattern = /^[A-Z]+$/;
      const result = validatePattern('ABC', pattern, 'Field');
      expect(result).toBeNull();
    });

    it('uses custom error message when provided', () => {
      const pattern = /^[A-Z]+$/;
      const result = validatePattern('abc', pattern, 'Field', 'Must be uppercase letters only');
      expect(result).toEqual({ field: 'Field', message: 'Must be uppercase letters only' });
    });

    it('returns null for empty string', () => {
      const pattern = /^[A-Z]+$/;
      const result = validatePattern('', pattern, 'Field');
      expect(result).toBeNull();
    });
  });
});

describe('validateContactForm', () => {
  const validData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Hello, I would like to discuss a project opportunity.',
  };

  describe('with default rules', () => {
    it('validates all required fields', () => {
      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('returns error for missing name', () => {
      const data = { ...validData, name: '' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Name', message: 'Name is required' });
    });

    it('returns error for missing email', () => {
      const data = { ...validData, email: '' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Email', message: 'Email is required' });
    });

    it('returns error for invalid email', () => {
      const data = { ...validData, email: 'invalid-email' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Email', message: 'Please enter a valid email address' });
    });

    it('returns error for missing subject', () => {
      const data = { ...validData, subject: '' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Subject', message: 'Subject is required' });
    });

    it('returns error for missing message', () => {
      const data = { ...validData, message: '' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Message', message: 'Message is required' });
    });

    it('returns multiple errors for multiple invalid fields', () => {
      const data = { name: '', email: 'invalid', subject: '', message: 'Short' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('with custom rules', () => {
    it('respects custom required flag set to false', () => {
      const rules: ContactFormValidationRules = {
        name: { required: false },
      };
      const data = { ...validData, name: '' };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(true);
    });

    it('respects custom minLength', () => {
      const rules: ContactFormValidationRules = {
        name: { required: true, minLength: 5 },
      };
      const data = { ...validData, name: 'John' };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Name', message: 'Name must be at least 5 characters' });
    });

    it('respects custom maxLength', () => {
      const rules: ContactFormValidationRules = {
        name: { required: true, maxLength: 5 },
      };
      const data = { ...validData, name: 'Jonathan' };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Name', message: 'Name must not exceed 5 characters' });
    });

    it('allows all fields to be optional', () => {
      const rules: ContactFormValidationRules = {
        name: { required: false },
        email: { required: false },
        subject: { required: false },
        message: { required: false },
      };
      const data: ContactFormData = { name: '', email: '', subject: '', message: '' };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('validates only specified rules', () => {
      const rules: ContactFormValidationRules = {
        name: { required: true, minLength: 5 },
      };
      const data = { name: 'Jo', email: '', subject: '', message: '' };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(false);
      // Should have errors for name (required + minLength) and missing other required fields
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('edge cases', () => {
    it('handles null values gracefully', () => {
      const data: ContactFormData = { name: '', email: '', subject: '', message: '' };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBe(4);
    });

    it('handles whitespace in required fields', () => {
      const data: ContactFormData = {
        name: '   ',
        email: 'john@example.com',
        subject: 'Subject',
        message: 'A valid message',
      };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Name', message: 'Name is required' });
    });

    it('handles special characters in fields', () => {
      const data: ContactFormData = {
        name: 'John O\'Connor',
        email: 'john@example.com',
        subject: 'Inquiry: Project!',
        message: 'Message with special chars: @#$%^&*()',
      };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(true);
    });

    it('handles unicode characters', () => {
      const data: ContactFormData = {
        name: 'José García',
        email: 'jose@example.com',
        subject: 'Inquiry',
        message: 'Message with émojis 🎉',
      };
      const result = validateContactForm(data);
      expect(result.isValid).toBe(true);
    });

    it('handles extremely long strings', () => {
      const longString = 'A'.repeat(10000);
      const rules: ContactFormValidationRules = {
        message: { required: true, maxLength: 1000 },
      };
      const data: ContactFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Subject',
        message: longString,
      };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Message', message: 'Message must not exceed 1000 characters' });
    });

    it('handles empty string when minLength check', () => {
      const rules: ContactFormValidationRules = {
        name: { required: true, minLength: 5 },
      };
      const data: ContactFormData = {
        name: '',
        email: 'john@example.com',
        subject: 'Subject',
        message: 'Valid message',
      };
      const result = validateContactForm(data, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContainEqual({ field: 'Name', message: 'Name is required' });
    });
  });
});

describe('defaultContactFormRules', () => {
  it('has name rules with required, min and max length', () => {
    expect(defaultContactFormRules.name).toEqual({
      required: true,
      minLength: 2,
      maxLength: 100,
    });
  });

  it('has email rule with required', () => {
    expect(defaultContactFormRules.email).toEqual({
      required: true,
    });
  });

  it('has subject rules with required, min and max length', () => {
    expect(defaultContactFormRules.subject).toEqual({
      required: true,
      minLength: 3,
      maxLength: 100,
    });
  });

  it('has message rules with required, min and max length', () => {
    expect(defaultContactFormRules.message).toEqual({
      required: true,
      minLength: 10,
      maxLength: 1000,
    });
  });
});
