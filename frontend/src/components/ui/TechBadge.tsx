import React from 'react';

export type TechBadgeSize = 'sm' | 'md';

interface TechBadgeProps {
  name: string;
  size?: TechBadgeSize;
}

const sizeClasses: Record<TechBadgeSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
};

export const TechBadge: React.FC<TechBadgeProps> = ({ name, size = 'sm' }) => {
  return (
    <span
      className={`${sizeClasses[size]} bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100`}
    >
      {name}
    </span>
  );
};
