import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable container component to maintain consistent layout widths and spacing.
 * Adheres to Design System grid container width (Max-width 1280px).
 */
export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};
