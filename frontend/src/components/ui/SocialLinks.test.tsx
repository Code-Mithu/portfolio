import { render, screen } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';
import { describe, it, expect } from 'vitest';

describe('SocialLinks Component', () => {
  it('renders all links correctly', () => {
    render(<SocialLinks />);
    expect(screen.getByLabelText('GitHub')).toBeDefined();
    expect(screen.getByLabelText('LinkedIn')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
  });
});
