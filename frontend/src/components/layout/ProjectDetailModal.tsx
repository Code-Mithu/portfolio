import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Project } from './ProjectCard';
import { ProjectActions } from './ProjectActions';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProjectDetailModal component for displaying detailed project information in an accessible modal.
 * Features responsive design, keyboard navigation, focus management, and ARIA attributes.
 */
export const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-start justify-between rounded-t-2xl">
          <div className="flex-1 pr-4">
            <h2 id="modal-title" className="text-2xl font-bold text-primary">{project.title}</h2>
            <p className="text-secondary mt-2">{project.description}</p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8">
          {/* Thumbnail */}
          {project.thumbnail && (
            <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
              <Image
                src={project.thumbnail}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          )}
          {/* Detailed Description */}
          {project.detailedDescription && (
            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">About This Project</h3>
              <p className="text-secondary leading-relaxed whitespace-pre-line">{project.detailedDescription}</p>
            </section>
          )}

          {/* Features List */}
          {project.features && project.features.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-primary mb-3">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-secondary">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Technology Stack */}
          <section>
            <h3 className="text-lg font-semibold text-primary mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <section className="pt-4 border-t border-slate-200">
            <ProjectActions project={project} variant="modal" />
          </section>
        </div>
      </div>
    </div>
  );
};
