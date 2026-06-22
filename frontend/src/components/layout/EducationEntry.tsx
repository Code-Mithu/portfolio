import React from 'react';

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
  location?: string;
  description?: string;
  honors?: string[];
}

interface EducationEntryProps {
  entry: EducationEntry;
}

/**
 * EducationEntry component for displaying individual education details.
 * Features institution name, degree, study period, optional GPA, and achievements.
 */
export const EducationEntry = ({ entry }: EducationEntryProps) => {
  return (
    <div className="space-y-3">
      {/* Header with Degree, Institution, and Duration */}
      {(entry.degree || entry.institution || entry.duration || entry.location) && (
        <div className="space-y-1">
          {entry.degree && <h3 className="text-xl font-semibold text-primary">{entry.degree}</h3>}
          {(entry.institution || entry.duration || entry.location) && (
            <div className="flex flex-wrap items-center gap-3 text-secondary">
              {entry.institution && <span className="font-medium">{entry.institution}</span>}
              {(entry.institution && entry.location) && <span className="text-slate-300">•</span>}
              {entry.location && <span className="text-slate-500">{entry.location}</span>}
              {((entry.institution || entry.location) && entry.duration) && <span className="text-slate-300">•</span>}
              {entry.duration && (
                <time className="text-slate-500" dateTime={entry.duration}>
                  {entry.duration}
                </time>
              )}
            </div>
          )}
        </div>
      )}

      {/* GPA if provided */}
      {entry.gpa && (
        <div className="inline-block">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
            GPA: {entry.gpa}
          </span>
        </div>
      )}

      {/* Description if provided */}
      {entry.description && (
        <p className="text-secondary leading-relaxed">{entry.description}</p>
      )}

      {/* Honors/Achievements if provided */}
      {entry.honors && entry.honors.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-secondary mb-2">Honors & Achievements:</h4>
          <ul className="space-y-2">
            {entry.honors.map((honor, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  ⭐
                </span>
                <span className="leading-relaxed">{honor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
