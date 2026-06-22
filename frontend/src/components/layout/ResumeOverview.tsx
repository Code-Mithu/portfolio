import React from 'react';

export interface ResumeOverviewData {
  professionalSummary: string;
  experienceSummary: string;
  skillsSummary: string;
  yearsOfExperience?: number;
  totalProjects?: number;
  languages?: string[];
}

interface ResumeOverviewProps {
  data: ResumeOverviewData;
  resumeUrl?: string;
  showPreview?: boolean;
}

/**
 * ResumeOverview component for displaying professional resume summary information.
 * Features professional summary, experience summary, skills summary, and resume preview area.
 */
export const ResumeOverview = ({ data, resumeUrl = '/resume.pdf', showPreview = true }: ResumeOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Professional Summary */}
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-4">Professional Summary</h3>
        <p className="text-secondary leading-relaxed">{data.professionalSummary}</p>
      </div>

      {/* Experience Summary */}
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-4">Experience Summary</h3>
        <p className="text-secondary leading-relaxed mb-4">{data.experienceSummary}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {data.yearsOfExperience && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-3xl font-bold text-primary">{data.yearsOfExperience}</div>
              <div className="text-sm text-secondary mt-1">Years Experience</div>
            </div>
          )}
          {data.totalProjects && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-3xl font-bold text-primary">{data.totalProjects}</div>
              <div className="text-sm text-secondary mt-1">Projects Completed</div>
            </div>
          )}
          {data.languages && data.languages.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="text-3xl font-bold text-primary">{data.languages.length}</div>
              <div className="text-sm text-secondary mt-1">Languages</div>
            </div>
          )}
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-secondary mt-1">Technologies</div>
          </div>
        </div>
      </div>

      {/* Skills Summary */}
      <div>
        <h3 className="text-2xl font-semibold text-primary mb-4">Skills Summary</h3>
        <p className="text-secondary leading-relaxed">{data.skillsSummary}</p>
      </div>

      {/* Resume Preview Area */}
      {showPreview && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">Download Resume</h3>
          <p className="text-secondary mb-6">
            Get a comprehensive overview of my professional background, experience, and technical skills.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={resumeUrl}
              download
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
              aria-label="Download resume PDF"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-300 text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
              aria-label="View resume in new tab"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Resume
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
