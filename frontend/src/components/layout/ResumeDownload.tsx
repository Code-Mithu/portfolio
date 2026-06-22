'use client';

import React, { useState, useCallback } from 'react';

interface ResumeDownloadProps {
  resumeUrl?: string;
  fileName?: string;
  onDownloadError?: (error: Error) => void;
}

interface DownloadState {
  isLoading: boolean;
  error: string | null;
  fileExists: boolean | null;
}

/**
 * ResumeDownload component with file validation and error handling.
 * Features download button, file existence check, missing file handling, and accessibility compliance.
 */
export const ResumeDownload = ({
  resumeUrl = '/resume.pdf',
  fileName = 'resume.pdf',
  onDownloadError,
}: ResumeDownloadProps) => {
  const [state, setState] = useState<DownloadState>({
    isLoading: false,
    error: null,
    fileExists: null,
  });

  const checkFileExists = useCallback(async (): Promise<boolean> => {
    const response = await fetch(resumeUrl, { method: 'HEAD' });
    return response.ok;
  }, [resumeUrl]);

  const handleDownload = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const fileExists = await checkFileExists();

      if (!fileExists) {
        const error = new Error('Resume file is currently unavailable. Please try again later.');
        setState(prev => ({ ...prev, isLoading: false, error: error.message, fileExists: false }));
        onDownloadError?.(error);
        return;
      }

      setState(prev => ({ ...prev, fileExists: true }));

      // Trigger download
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = fileName;
      link.setAttribute('aria-label', `Download ${fileName}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setState(prev => ({ ...prev, isLoading: false, fileExists: true }));
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Resume file is currently unavailable. Please try again later.';
      const reportedError = error instanceof Error ? error : new Error(errorMessage);
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage, fileExists: false }));
      onDownloadError?.(reportedError);
    }
  }, [resumeUrl, fileName, checkFileExists, onDownloadError]);

  const handleView = useCallback(() => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  }, [resumeUrl]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-primary">Download Resume</h3>
      <p className="text-secondary text-sm">
        Get a comprehensive overview of my professional background, experience, and technical skills.
      </p>
      
      {state.error && (
        <div 
          role="alert"
          aria-live="polite"
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
        >
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{state.error}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleDownload}
          disabled={state.isLoading}
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={state.isLoading ? 'Downloading resume...' : 'Download resume'}
          aria-describedby="download-help"
        >
          {state.isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume</span>
            </>
          )}
        </button>

        <button
          onClick={handleView}
          className="bg-white border border-slate-300 text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
          aria-label="View resume in new tab"
          aria-describedby="view-help"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>View Resume</span>
        </button>
      </div>

      <span id="download-help" className="sr-only">
        {state.isLoading 
          ? 'Resume is being downloaded. Please wait.' 
          : 'Click to download the resume PDF file.'}
      </span>
      <span id="view-help" className="sr-only">
        Click to open the resume in a new browser tab.
      </span>
    </div>
  );
};
