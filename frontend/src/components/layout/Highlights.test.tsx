import { render, screen } from '@testing-library/react';
import { Highlights } from './Highlights';
import { describe, it, expect } from 'vitest';

describe('Highlights Component', () => {
  it('renders correctly', () => {
    render(<Highlights />);
    expect(screen.getByText('Key Achievements')).toBeDefined();
    expect(screen.getByText('Career Milestones')).toBeDefined();
  });

  it('renders all achievements', () => {
    render(<Highlights />);
    expect(screen.getByText('3+ years of experience in web development.')).toBeDefined();
    expect(screen.getByText('Successfully delivered 10+ high-impact projects.')).toBeDefined();
    expect(screen.getByText('Advocate for inclusive design and accessibility.')).toBeDefined();
  });

  it('renders all milestones', () => {
    render(<Highlights />);
    expect(screen.getByText('2021')).toBeDefined();
    expect(screen.getByText('Started Professional Journey')).toBeDefined();
    expect(screen.getByText('2023')).toBeDefined();
    expect(screen.getByText('Senior Developer Role')).toBeDefined();
    expect(screen.getByText('2024')).toBeDefined();
    expect(screen.getByText('Full-Stack Expansion')).toBeDefined();
  });

  it('renders all statistics', () => {
    render(<Highlights />);
    expect(screen.getByText('10+')).toBeDefined();
    expect(screen.getByText('Projects Delivered')).toBeDefined();
    expect(screen.getByText('3+')).toBeDefined();
    expect(screen.getByText('Years Experience')).toBeDefined();
    expect(screen.getByText('15+')).toBeDefined();
    expect(screen.getByText('Happy Clients')).toBeDefined();
    expect(screen.getByText('5+')).toBeDefined();
    expect(screen.getByText('Technologies Mastered')).toBeDefined();
  });
});
