import { render, screen, fireEvent, act } from '@testing-library/react';
import { Navbar } from './Navbar';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar Component', () => {
  let observeCallbacks: ((entries: any[]) => void)[] = [];
  let observedElements: Element[] = [];

  beforeEach(() => {
    observeCallbacks = [];
    observedElements = [];

    global.IntersectionObserver = class MockIntersectionObserver {
      constructor(callback: any, options?: any) {
        observeCallbacks.push(callback);
      }
      observe(el: Element) { observedElements.push(el); }
      unobserve() {}
      disconnect() {}
    } as any;
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Portfolio')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
  });

  it('renders all nav links', () => {
    render(<Navbar />);
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Skills')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
    expect(screen.getByText('Experience')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();
  });

  it('renders Resume button', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Resume').length).toBeGreaterThan(0);
  });

  it('toggles mobile menu open', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Close menu')).toBeDefined();
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
  });

  it('closes mobile menu when Escape key is pressed', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Close menu')).toBeDefined();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByLabelText('Open menu')).toBeDefined();
  });

  it('locks body scroll when mobile menu is open', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when mobile menu is closed', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(document.body.style.overflow).toBe('');
  });

  it('closes mobile menu when backdrop is clicked', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(screen.getByLabelText('Close menu')).toBeDefined();

    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(screen.getByLabelText('Open menu')).toBeDefined();
  });

  it('closes mobile menu when a nav link is clicked', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).not.toBeNull();
    const mobileLinks = mobileMenu!.querySelectorAll('a[href]');
    fireEvent.click(mobileLinks[0]);

    expect(screen.getByLabelText('Open menu')).toBeDefined();
  });

  it('renders Resume link in mobile menu when open', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);

    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).not.toBeNull();
    const resumeLink = mobileMenu!.querySelector('a[href="/resume"]');
    expect(resumeLink).not.toBeNull();
    expect(resumeLink!.textContent).toContain('Resume');
  });

  it('applies active section styling based on IntersectionObserver', () => {
    const section = document.createElement('section');
    section.id = 'projects';
    document.body.appendChild(section);

    document.querySelectorAll = vi.fn(() => [section] as any);

    render(<Navbar />);

    const lastCallback = observeCallbacks[observeCallbacks.length - 1];
    act(() => {
      lastCallback([
        { isIntersecting: true, target: section },
      ]);
    });

    const projectLinks = screen.getAllByText('Projects');
    const activeLink = projectLinks.find(el => el.className.includes('font-semibold'));
    expect(activeLink).toBeDefined();

    document.body.removeChild(section);
  });

  it('does not apply active class when section is not intersecting', () => {
    const section = document.createElement('section');
    section.id = 'about';
    document.body.appendChild(section);

    document.querySelectorAll = vi.fn(() => [section] as any);

    render(<Navbar />);

    const lastCallback = observeCallbacks[observeCallbacks.length - 1];
    act(() => {
      lastCallback([
        { isIntersecting: false, target: section },
      ]);
    });

    const aboutLinks = screen.getAllByText('About');
    const activeLink = aboutLinks.find(el => el.className.includes('font-semibold'));
    expect(activeLink).toBeUndefined();

    document.body.removeChild(section);
  });

  it('has proper aria attributes on mobile toggle', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'mobile-menu');

    fireEvent.click(toggleButton);
    const closeButton = screen.getByLabelText('Close menu');
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('has proper nav landmark', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    const { unmount } = render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('restores body overflow on unmount while menu is open', () => {
    const { unmount } = render(<Navbar />);
    const toggleButton = screen.getByLabelText('Open menu');
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
