import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

/**
 * Reusable component for displaying professional social media links.
 * Includes GitHub, LinkedIn, and Email with accessibility support.
 */
export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '' }) => {
  const links = [
    { name: 'GitHub', href: 'https://github.com/yourusername', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile', icon: Linkedin },
    { name: 'Email', href: 'mailto:email@example.com', icon: Mail },
  ];

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label={link.name}
        >
          <link.icon size={24} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};
