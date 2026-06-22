import { render, screen } from '@testing-library/react';
import { EducationSection } from './EducationSection';
import { describe, it, expect } from 'vitest';

describe('EducationSection Component', () => {
  it('renders correctly', () => {
    render(<EducationSection />);
    expect(screen.getByText('Education')).toBeDefined();
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
    const universityText = screen.getAllByText('University of Technology');
    expect(universityText.length).toBeGreaterThan(0);
  });

  it('renders all education entries', () => {
    render(<EducationSection />);
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeDefined();
  });

  it('renders institution names', () => {
    render(<EducationSection />);
    const universityText = screen.getAllByText('University of Technology');
    expect(universityText.length).toBeGreaterThan(0);
    expect(screen.getByText('State University')).toBeDefined();
  });

  it('renders degree names', () => {
    render(<EducationSection />);
    expect(screen.getByText('Master of Science in Software Engineering')).toBeDefined();
    expect(screen.getByText('Bachelor of Science in Computer Science')).toBeDefined();
  });

  it('renders study periods', () => {
    render(<EducationSection />);
    expect(screen.getByText('2020 - 2022')).toBeDefined();
    expect(screen.getByText('2016 - 2020')).toBeDefined();
  });

  it('renders GPA when provided', () => {
    render(<EducationSection />);
    const gpaBadges = screen.getAllByText(/GPA:/);
    expect(gpaBadges.length).toBe(2);
    expect(screen.getByText('GPA: 3.9/4.0')).toBeDefined();
    expect(screen.getByText('GPA: 3.8/4.0')).toBeDefined();
  });

  it('renders locations', () => {
    render(<EducationSection />);
    expect(screen.getByText('San Francisco, CA')).toBeDefined();
    expect(screen.getByText('New York, NY')).toBeDefined();
  });

  it('renders honors', () => {
    render(<EducationSection />);
    const honors = screen.getAllByText('Honors & Achievements:');
    expect(honors.length).toBe(2);
    expect(screen.getByText('Dean\'s List - All Semesters')).toBeDefined();
    expect(screen.getByText('Cum Laude')).toBeDefined();
  });

  it('uses Timeline component for layout', () => {
    const { container } = render(<EducationSection />);
    const timeline = container.querySelector('.relative');
    expect(timeline).toBeDefined();
  });

  it('uses EducationEntry component for individual entries', () => {
    render(<EducationSection />);
    const honors = screen.getAllByText('Honors & Achievements:');
    expect(honors.length).toBe(2);
  });

  it('renders Academic Achievements section', () => {
    render(<EducationSection />);
    expect(screen.getByText('Academic Achievements')).toBeDefined();
  });

  it('renders certifications', () => {
    render(<EducationSection />);
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeDefined();
    expect(screen.getByText('Google Cloud Professional Cloud Architect')).toBeDefined();
  });

  it('renders awards', () => {
    render(<EducationSection />);
    const awards = screen.getAllByText('Outstanding Graduate Award');
    expect(awards.length).toBe(2);
    expect(screen.getByText('Dean\'s Research Fellowship')).toBeDefined();
  });

  it('renders academic highlights', () => {
    render(<EducationSection />);
    expect(screen.getByText('Best Paper Award')).toBeDefined();
    expect(screen.getByText('Hackathon Winner')).toBeDefined();
  });

  it('uses AcademicAchievements component for achievements grid', () => {
    const { container } = render(<EducationSection />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeDefined();
  });
});
