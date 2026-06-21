import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
}

/**
 * Reusable Button component for CTAs.
 * Supports both standard button and link (using Next.js Link) behavior.
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  href, 
  className, 
  children, 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-white border border-primary text-primary hover:bg-slate-50",
  };

  if (href) {
    return (
      <Link href={href} className={clsx(baseStyles, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={clsx(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
