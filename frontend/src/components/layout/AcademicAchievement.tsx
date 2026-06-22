import React from 'react';

export type AchievementType = 'certification' | 'award' | 'highlight' | 'publication';

export interface AcademicAchievement {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
  type: AchievementType;
  icon?: React.ReactNode;
  credentialUrl?: string;
  badge?: string;
}

interface AcademicAchievementCardProps {
  achievement: AcademicAchievement;
}

/**
 * AcademicAchievementCard component for displaying individual academic achievements.
 * Features certification, award, and highlight types with a reusable card structure.
 */
export const AcademicAchievementCard = ({ achievement }: AcademicAchievementCardProps) => {
  const getTypeColor = (type: AchievementType) => {
    switch (type) {
      case 'certification':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700',
        };
      case 'award':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'text-amber-600',
          badge: 'bg-amber-100 text-amber-700',
        };
      case 'highlight':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-700',
        };
      case 'publication':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-700',
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          icon: 'text-slate-600',
          badge: 'bg-slate-100 text-slate-700',
        };
    }
  };

  const getIconByType = (type: AchievementType) => {
    switch (type) {
      case 'certification':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'award':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'highlight':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'publication':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
    }
  };

  const colors = getTypeColor(achievement.type);
  const defaultIcon = getIconByType(achievement.type);

  const Content = (
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className={`flex-shrink-0 w-12 h-12 ${colors.bg} ${colors.border} border rounded-lg flex items-center justify-center ${colors.icon}`}>
        {achievement.icon || defaultIcon}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-primary">{achievement.title}</h3>
          {achievement.issuer && (
            <p className="text-secondary font-medium">{achievement.issuer}</p>
          )}
          {(achievement.date || achievement.badge) && (
            <div className="flex flex-wrap items-center gap-2">
              {achievement.date && (
                <time className="text-sm text-slate-500" dateTime={achievement.date}>
                  {achievement.date}
                </time>
              )}
              {achievement.badge && (
                <span className={`px-2 py-0.5 ${colors.badge} rounded text-xs font-medium`}>
                  {achievement.badge}
                </span>
              )}
            </div>
          )}
        </div>
        {achievement.description && (
          <p className="text-secondary text-sm leading-relaxed">{achievement.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={`bg-white border ${colors.border} rounded-xl p-5 hover:shadow-md transition-shadow duration-200`}>
      {achievement.credentialUrl ? (
        <a
          href={achievement.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`View credential for ${achievement.title}`}
        >
          {Content}
        </a>
      ) : (
        Content
      )}
    </div>
  );
};

interface AcademicAchievementsProps {
  achievements: AcademicAchievement[];
  title?: string;
  className?: string;
}

/**
 * AcademicAchievements component for displaying a grid of academic achievements.
 * Features certifications, awards, highlights, and publications with a responsive grid layout.
 */
export const AcademicAchievements = ({ 
  achievements, 
  title = 'Academic Achievements',
  className = ''
}: AcademicAchievementsProps) => {
  if (achievements.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-xl font-semibold text-primary mb-6">{title}</h3>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((achievement) => (
          <AcademicAchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};
