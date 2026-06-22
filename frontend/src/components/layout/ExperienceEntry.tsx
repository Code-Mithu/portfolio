import React from 'react';

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities?: string[];
  achievements?: string[];
  location?: string;
  description?: string;
}

interface ExperienceEntryProps {
  entry: ExperienceEntry;
  showAchievements?: boolean;
}

/**
 * ExperienceEntry component for displaying individual work experience details.
 * Features company name, role, duration, responsibilities, and achievements.
 */
export const ExperienceEntry = ({ entry, showAchievements = true }: ExperienceEntryProps) => {
  return (
    <div className="space-y-4">
      {/* Header with Role, Company, and Duration */}
      {(entry.role || entry.company || entry.duration || entry.location) && (
        <div className="space-y-1">
          {entry.role && <h3 className="text-xl font-semibold text-primary">{entry.role}</h3>}
          {(entry.company || entry.duration || entry.location) && (
            <div className="flex flex-wrap items-center gap-3 text-secondary">
              {entry.company && <span className="font-medium">{entry.company}</span>}
              {(entry.company && entry.location) && <span className="text-slate-300">•</span>}
              {entry.location && <span className="text-slate-500">{entry.location}</span>}
              {((entry.company || entry.location) && entry.duration) && <span className="text-slate-300">•</span>}
              {entry.duration && (
                <time className="text-slate-500" dateTime={entry.duration}>
                  {entry.duration}
                </time>
              )}
            </div>
          )}
        </div>
      )}

      {/* Description if provided */}
      {entry.description && (
        <p className="text-secondary leading-relaxed">{entry.description}</p>
      )}

      {/* Responsibilities */}
      {entry.responsibilities && entry.responsibilities.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-secondary mb-2">Key Responsibilities:</h4>
          <ul className="list-disc ml-5 space-y-1 text-secondary">
            {entry.responsibilities.map((responsibility, index) => (
              <li key={index} className="leading-relaxed">{responsibility}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {showAchievements && entry.achievements && entry.achievements.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-secondary mb-2">Key Achievements:</h4>
          <ul className="space-y-2">
            {entry.achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-2 text-secondary">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  🏆
                </span>
                <span className="leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
