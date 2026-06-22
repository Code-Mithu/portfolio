import { render, screen } from '@testing-library/react';
import { ResumeSection } from './ResumeSection';
import { describe, it, expect } from 'vitest';

describe('ResumeSection Component', () => {
  it('renders correctly', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Resume & Certifications')).toBeDefined();
  });

  it('renders professional summary', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Professional Summary')).toBeDefined();
    expect(screen.getByText(/Experienced full-stack developer/)).toBeDefined();
  });

  it('renders experience summary', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Experience Summary')).toBeDefined();
    expect(screen.getByText(/Worked with leading technology companies/)).toBeDefined();
  });

  it('renders skills summary', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Skills Summary')).toBeDefined();
    expect(screen.getByText(/Proficient in JavaScript/)).toBeDefined();
  });

  it('renders years of experience stat', () => {
    render(<ResumeSection />);
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('Years Experience')).toBeDefined();
  });

  it('renders total projects stat', () => {
    render(<ResumeSection />);
    expect(screen.getByText('25')).toBeDefined();
    expect(screen.getByText('Projects Completed')).toBeDefined();
  });

  it('renders languages count', () => {
    render(<ResumeSection />);
    expect(screen.getByText('4')).toBeDefined();
    expect(screen.getByText('Languages')).toBeDefined();
  });

  it('renders technologies stat', () => {
    render(<ResumeSection />);
    expect(screen.getByText('50+')).toBeDefined();
    expect(screen.getByText('Technologies')).toBeDefined();
  });

  it('renders download resume button', () => {
    render(<ResumeSection />);
    expect(screen.getByLabelText('Download resume')).toBeDefined();
  });

  it('renders view resume button', () => {
    render(<ResumeSection />);
    expect(screen.getByLabelText('View resume in new tab')).toBeDefined();
  });

  it('uses ResumeOverview component', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Professional Summary')).toBeDefined();
    expect(screen.getByText('Experience Summary')).toBeDefined();
    expect(screen.getByText('Skills Summary')).toBeDefined();
  });

  it('uses AcademicAchievements component for certifications', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Certifications')).toBeDefined();
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
  });

  it('has proper grid layout', () => {
    const { container } = render(<ResumeSection />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('lg:grid-cols-3', 'gap-12');
  });
});
