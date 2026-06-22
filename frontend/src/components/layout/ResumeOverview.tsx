import React from 'react';
import { ResumeDownload } from './ResumeDownload';

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

      {/* Resume Preview Area with Download Feature */}
      {showPreview && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <ResumeDownload resumeUrl={resumeUrl} fileName="resume.pdf" />
        </div>
      )}
    </div>
  );
};
