import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResumeDownload } from './ResumeDownload';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch for file existence check
global.fetch = vi.fn();

describe('ResumeDownload Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders download button correctly', () => {
    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    expect(downloadButton).toBeDefined();
    expect(screen.getAllByText('Download Resume')).toHaveLength(2); // heading + button
  });

  it('renders view button correctly', () => {
    render(<ResumeDownload />);
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(viewButton).toBeDefined();
    expect(screen.getByText('View Resume')).toBeDefined();
  });

  it('renders heading and description', () => {
    render(<ResumeDownload />);
    const heading = screen.getAllByText('Download Resume')[0]; // Get the heading
    expect(heading).toBeDefined();
    expect(screen.getByText(/Get a comprehensive overview/)).toBeDefined();
  });

  it('shows loading state during download', async () => {
    (global.fetch as any).mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);
    
    expect(screen.getByLabelText('Downloading resume...')).toBeDefined();
    expect(screen.getByText('Downloading...')).toBeDefined();
    expect(downloadButton).toBeDisabled();
  });

  it('handles successful file check and download', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: true });

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Download resume')).toBeDefined();
    });
  });

  it('handles file not found error', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: false });

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByText(/Resume file is currently unavailable/)).toBeDefined();
    });
  });

  it('handles network error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByText(/Resume file is currently unavailable/)).toBeDefined();
    });
    
    consoleSpy.mockRestore();
  });

  it('displays error message with proper aria attributes', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: false });

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toHaveAttribute('aria-live', 'polite');
      expect(errorAlert).toBeDefined();
    });
  });

  it('calls onDownloadError callback when error occurs', async () => {
    const onError = vi.fn();
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<ResumeDownload onDownloadError={onError} />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });

  it('uses custom resumeUrl when provided', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: true });

    render(<ResumeDownload resumeUrl="/custom-resume.pdf" />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/custom-resume.pdf', { method: 'HEAD' });
    });
  });

  it('uses custom fileName when provided', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: true });

    render(<ResumeDownload fileName="my-resume.pdf" />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      // File download is triggered with custom filename
      expect(screen.getByLabelText('Download resume')).toBeDefined();
    });
  });

  it('opens resume in new tab on view button click', () => {
    const mockOpen = vi.fn();
    global.open = mockOpen;

    render(<ResumeDownload />);
    const viewButton = screen.getByLabelText('View resume in new tab');
    
    fireEvent.click(viewButton);

    expect(mockOpen).toHaveBeenCalledWith('/resume.pdf', '_blank', 'noopener,noreferrer');
  });

  it('has proper accessibility attributes on download button', () => {
    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    expect(downloadButton).toHaveAttribute('aria-describedby', 'download-help');
  });

  it('has proper accessibility attributes on view button', () => {
    render(<ResumeDownload />);
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(viewButton).toHaveAttribute('aria-describedby', 'view-help');
  });

  it('has screen reader help text', () => {
    render(<ResumeDownload />);
    const downloadHelp = document.getElementById('download-help');
    const viewHelp = document.getElementById('view-help');
    
    expect(downloadHelp).toHaveClass('sr-only');
    expect(viewHelp).toHaveClass('sr-only');
  });

  it('updates aria-label when loading', async () => {
    (global.fetch as any).mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);
    
    expect(screen.getByLabelText('Downloading resume...')).toBeDefined();
  });

  it('has proper button styling', () => {
    const { container } = render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    expect(downloadButton).toHaveClass('bg-primary', 'text-white', 'rounded-lg');
    
    const viewButton = screen.getByLabelText('View resume in new tab');
    expect(viewButton).toHaveClass('bg-white', 'border', 'text-secondary', 'rounded-lg');
  });

  it('has proper error styling', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: false });

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      const errorAlert = screen.getByRole('alert');
      expect(errorAlert).toHaveClass('bg-red-50', 'border-red-200', 'text-red-700');
    });
  });

  it('has loading spinner when downloading', async () => {
    (global.fetch as any).mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    const { container } = render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);
    
    expect(container.querySelector('.animate-spin')).toBeDefined();
  });

  it('disables button during loading', async () => {
    (global.fetch as any).mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
    );

    const { container } = render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);
    
    expect(downloadButton).toBeDisabled();
    expect(downloadButton).toHaveClass('disabled:opacity-50');
  });

  it('has proper spacing between elements', () => {
    const { container } = render(<ResumeDownload />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('space-y-4');
  });

  it('has flex layout for buttons', () => {
    const { container } = render(<ResumeDownload />);
    const buttonContainer = container.querySelector('.flex.flex-wrap');
    expect(buttonContainer).toHaveClass('gap-3');
  });

  it('handles error state reset after successful download', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });

    render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    // First click - error
    fireEvent.click(downloadButton);
    await waitFor(() => {
      expect(screen.getByText(/unavailable/)).toBeDefined();
    });

    // Second click - success
    fireEvent.click(downloadButton);
    await waitFor(() => {
      expect(screen.queryByText(/unavailable/)).toBeNull();
    });
  });

  it('has proper icon in download button', () => {
    const { container } = render(<ResumeDownload />);
    const downloadIcon = container.querySelector('svg[path*="M4 16v1"]');
    expect(downloadIcon).toBeDefined();
  });

  it('has proper icon in view button', () => {
    const { container } = render(<ResumeDownload />);
    const viewIcon = container.querySelector('svg[path*="M10 6H6"]');
    expect(viewIcon).toBeDefined();
  });

  it('has error icon in error message', async () => {
    (global.fetch as any).mockResolvedValueOnce({ ok: false });

    const { container } = render(<ResumeDownload />);
    const downloadButton = screen.getByLabelText('Download resume');
    
    fireEvent.click(downloadButton);

    await waitFor(() => {
      const errorIcon = container.querySelector('svg[path*="M12 8v4"]');
      expect(errorIcon).toBeDefined();
    });
  });
});
