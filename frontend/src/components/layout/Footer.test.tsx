import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo for smooth scroll
    window.scrollTo = vi.fn();
  });

  it('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText('Portfolio')).toBeDefined();
  });

  it('displays copyright with current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeDefined();
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
  });

  it('renders all navigation links', () => {
    render(<Footer />);
    const nav = screen.getByRole('navigation');
    const navigationLinks = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];
    
    navigationLinks.forEach(link => {
      expect(nav).toHaveTextContent(link);
    });
  });

  it('has proper navigation links with hrefs', () => {
    render(<Footer />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#about');
  });

  it('renders contact info with email link', () => {
    render(<Footer />);
    const emailLink = screen.getByText('email@example.com');
    expect(emailLink).toBeDefined();
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:email@example.com');
  });

  it('renders social media links', () => {
    render(<Footer />);
    const socialLinks = ['GitHub', 'LinkedIn', 'Twitter'];
    
    socialLinks.forEach(link => {
      expect(screen.getByText(link)).toBeDefined();
    });
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('aria-label', 'Site Footer');
  });

  it('has navigation with ARIA label', () => {
    render(<Footer />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Footer navigation');
  });

  it('renders back to top button', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Back to top')).toBeDefined();
  });

  it('back to top button has proper ARIA label', () => {
    render(<Footer />);
    const backButton = screen.getByLabelText('Back to top');
    expect(backButton).toBeDefined();
  });

  it('social links have proper ARIA labels', () => {
    render(<Footer />);
    const githubLink = screen.getByText('GitHub');
    expect(githubLink.closest('a')).toHaveAttribute('aria-label', 'GitHub Profile');
  });

  it('displays brand description', () => {
    render(<Footer />);
    expect(screen.getByText(/Building digital experiences that matter/)).toBeDefined();
  });

  it('displays tech stack mention', () => {
    render(<Footer />);
    expect(screen.getByText(/Made with ❤️ using Next.js/)).toBeDefined();
  });

  it('has proper footer styling', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-primary', 'text-white', 'py-12');
  });

  it('has proper container styling', () => {
    const { container } = render(<Footer />);
    const containerDiv = container.querySelector('.max-w-7xl');
    expect(containerDiv).toHaveClass('max-w-7xl', 'mx-auto', 'px-4');
  });

  it('has responsive grid layout', () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('has proper spacing in grid', () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('gap-8');
  });

  it('has back to top section with border', () => {
    const { container } = render(<Footer />);
    const topSection = container.querySelector('.border-t');
    expect(topSection).toHaveClass('border-t', 'border-slate-700');
  });

  it('back to top section has responsive layout', () => {
    const { container } = render(<Footer />);
    const topSection = container.querySelector('.flex');
    expect(topSection).toHaveClass('flex-col', 'sm:flex-row');
  });

  it('back to top section has proper spacing', () => {
    const { container } = render(<Footer />);
    const topSection = container.querySelector('.flex');
    expect(topSection).toHaveClass('justify-between', 'items-center', 'gap-4');
  });

  it('has proper hover states on navigation links', () => {
    const { container } = render(<Footer />);
    const navLinks = container.querySelectorAll('nav a');
    navLinks.forEach(link => {
      expect(link).toHaveClass('hover:text-white', 'transition-colors');
    });
  });

  it('has proper hover states on social links', () => {
    const { container } = render(<Footer />);
    const socialLinksContainer = container.querySelector('.space-y-4:last-child');
    const socialLinks = socialLinksContainer?.querySelectorAll('a');
    socialLinks?.forEach(link => {
      expect(link).toHaveClass('hover:text-white', 'transition-colors');
    });
  });

  it('has proper hover state on back to top button', () => {
    const { container } = render(<Footer />);
    const backButton = container.querySelector('button');
    expect(backButton).toHaveClass('hover:text-white', 'transition-colors');
  });

  it('back to top button has focus ring', () => {
    const { container } = render(<Footer />);
    const backButton = container.querySelector('button');
    expect(backButton).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('has proper text sizes for small screens', () => {
    const { container } = render(<Footer />);
    const texts = container.querySelectorAll('p.text-sm, a.text-sm');
    texts.forEach(text => {
      expect(text).toHaveClass('text-sm');
    });
  });

  it('has section headers with proper styling', () => {
    const { container } = render(<Footer />);
    const headers = container.querySelectorAll('h3, h4');
    headers.forEach(header => {
      if (header.tagName === 'H3') {
        expect(header).toHaveClass('font-bold', 'text-xl');
      } else {
        expect(header).toHaveClass('font-semibold');
      }
    });
  });

  it('has proper spacing between sections', () => {
    const { container } = render(<Footer />);
    const sections = container.querySelectorAll('.space-y-4');
    sections.forEach(section => {
      expect(section).toHaveClass('space-y-4');
    });
  });

  it('has unordered lists with proper spacing', () => {
    const { container } = render(<Footer />);
    const lists = container.querySelectorAll('ul');
    lists.forEach(list => {
      expect(list).toHaveClass('space-y-2');
    });
  });

  it('back to top button has icon', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('button svg');
    expect(icon).toBeDefined();
  });

  it('back to top button icon has correct path', () => {
    const { container } = render(<Footer />);
    const icon = container.querySelector('button svg');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('has email as clickable mailto link', () => {
    render(<Footer />);
    const emailLink = screen.getByText('email@example.com');
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:email@example.com');
  });

  it('has proper color scheme for text', () => {
    const { container } = render(<Footer />);
    const slateTexts = container.querySelectorAll('.text-slate-300');
    slateTexts.forEach(text => {
      expect(text).toHaveClass('text-slate-300');
    });
  });

  it('has lighter color for copyright', () => {
    const { container } = render(<Footer />);
    const copyright = container.querySelector('.text-slate-400');
    expect(copyright).toHaveClass('text-slate-400');
  });
});
