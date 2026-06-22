/**
 * Validation utilities for form validation
 * Provides functions for validating common form field types
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validates if a string is not empty or whitespace
 */
export const validateRequired = (value: string, fieldName: string): ValidationError | null => {
  if (!value || value.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} is required`,
    };
  }
  return null;
};

/**
 * Validates email format
 */
export const validateEmail = (email: string, fieldName = 'Email'): ValidationError | null => {
  if (!email || email.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} is required`,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      field: fieldName,
      message: 'Please enter a valid email address',
    };
  }

  return null;
};

/**
 * Validates minimum length
 */
export const validateMinLength = (value: string, minLength: number, fieldName: string): ValidationError | null => {
  if (value && value.length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be at least ${minLength} character${minLength !== 1 ? 's' : ''}`,
    };
  }
  return null;
};

/**
 * Validates maximum length
 */
export const validateMaxLength = (value: string, maxLength: number, fieldName: string): ValidationError | null => {
  if (value && value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName} must not exceed ${maxLength} character${maxLength !== 1 ? 's' : ''}`,
    };
  }
  return null;
};

/**
 * Validates exact length
 */
export const validateExactLength = (value: string, exactLength: number, fieldName: string): ValidationError | null => {
  if (value && value.length !== exactLength) {
    return {
      field: fieldName,
      message: `${fieldName} must be exactly ${exactLength} character${exactLength !== 1 ? 's' : ''}`,
    };
  }
  return null;
};

/**
 * Validates a value against a custom regex pattern
 */
export const validatePattern = (value: string, pattern: RegExp, fieldName: string, errorMessage?: string): ValidationError | null => {
  if (value && !pattern.test(value)) {
    return {
      field: fieldName,
      message: errorMessage || `${fieldName} is invalid`,
    };
  }
  return null;
};

/**
 * Validates contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormValidationRules {
  name?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  email?: {
    required?: boolean;
  };
  subject?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
  message?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

/**
 * Validates contact form data according to provided rules
 */
export const validateContactForm = (
  data: ContactFormData,
  rules?: ContactFormValidationRules
): ValidationResult => {
  const errors: ValidationError[] = [];
  const {
    name: nameRules = {},
    email: emailRules = {},
    subject: subjectRules = {},
    message: messageRules = {},
  } = rules || {};

  // Validate name
  if (nameRules.required !== false) {
    const nameError = validateRequired(data.name, 'Name');
    if (nameError) errors.push(nameError);
  }
  if (nameRules.minLength && data.name && data.name.trim().length > 0) {
    const minError = validateMinLength(data.name, nameRules.minLength, 'Name');
    if (minError) errors.push(minError);
  }
  if (nameRules.maxLength && data.name) {
    const maxError = validateMaxLength(data.name, nameRules.maxLength, 'Name');
    if (maxError) errors.push(maxError);
  }

  // Validate email
  if (emailRules.required !== false) {
    const emailError = validateEmail(data.email, 'Email');
    if (emailError) errors.push(emailError);
  }

  // Validate subject
  if (subjectRules.required !== false) {
    const subjectError = validateRequired(data.subject, 'Subject');
    if (subjectError) errors.push(subjectError);
  }
  if (subjectRules.minLength && data.subject && data.subject.trim().length > 0) {
    const minError = validateMinLength(data.subject, subjectRules.minLength, 'Subject');
    if (minError) errors.push(minError);
  }
  if (subjectRules.maxLength && data.subject) {
    const maxError = validateMaxLength(data.subject, subjectRules.maxLength, 'Subject');
    if (maxError) errors.push(maxError);
  }

  // Validate message
  if (messageRules.required !== false) {
    const messageError = validateRequired(data.message, 'Message');
    if (messageError) errors.push(messageError);
  }
  if (messageRules.minLength && data.message && data.message.trim().length > 0) {
    const minError = validateMinLength(data.message, messageRules.minLength, 'Message');
    if (minError) errors.push(minError);
  }
  if (messageRules.maxLength && data.message) {
    const maxError = validateMaxLength(data.message, messageRules.maxLength, 'Message');
    if (maxError) errors.push(maxError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Default validation rules for contact form
 */
export const defaultContactFormRules: ContactFormValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
  },
  subject: {
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};
