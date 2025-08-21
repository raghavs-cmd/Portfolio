
import React, { useEffect, useState, useCallback } from 'react';
import type { Project } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from './icons/UtilIcons';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.detail.gallery.length);
  }, [project.detail.gallery.length]);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.detail.gallery.length) % project.detail.gallery.length);
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === 'ArrowLeft') prevImage();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, nextImage]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 motion-safe:animate-fadeInUp animation-duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-bg-light dark:bg-bg-dark w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col motion-safe:animate-scaleIn animation-duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="bg-bg-light dark:bg-bg-dark p-4 sm:p-6 flex justify-between items-center border-b border-text-light/10 dark:border-text-dark/10 z-10 flex-shrink-0">
          <div>
            <h2 className="font-display text-2xl font-bold text-text-light dark:text-text-dark">{project.title}</h2>
            <p className="text-sm text-muted-light dark:text-muted-dark">{project.impact}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark" aria-label="Close project details">
            <XIcon />
          </button>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-4 sm:p-6">
            {/* Gallery */}
            <div className="relative mb-6">
              <img 
                src={project.detail.gallery[currentImageIndex]} 
                alt={`Project screenshot ${currentImageIndex + 1}`}
                className="w-full rounded-md shadow-md object-cover aspect-video"
              />
              {project.detail.gallery.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-accent" aria-label="Previous image"><ChevronLeftIcon /></button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-accent" aria-label="Next image"><ChevronRightIcon /></button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.detail.gallery.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImageIndex(index)} 
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`} 
                        aria-label={`Go to image ${index + 1}`}></button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 text-sm">
              <div><strong className="block text-text-light dark:text-text-dark">Role</strong> <span className="text-muted-light dark:text-muted-dark">{project.detail.role}</span></div>
              <div><strong className="block text-text-light dark:text-text-dark">Timeline</strong> <span className="text-muted-light dark:text-muted-dark">{project.detail.timeline}</span></div>
              <div><strong className="block text-text-light dark:text-text-dark">Team</strong> <span className="text-muted-light dark:text-muted-dark">{project.detail.team}</span></div>
              <div><strong className="block text-text-light dark:text-text-dark">Tools</strong> <span className="text-muted-light dark:text-muted-dark">{project.detail.tools.join(', ')}</span></div>
            </div>

            {/* Project Link */}
            {project.detail.link && (
              <div className="mb-6 border-t border-b border-text-light/10 dark:border-text-dark/10 py-4">
                <p className="text-muted-light dark:text-muted-dark flex items-center justify-between flex-wrap gap-2">
                  <span>Explore the final design and prototype:</span>
                  <a 
                    href={project.detail.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-semibold text-accent hover:text-accent-2 transition-colors py-1 px-3 rounded-md bg-accent/10 hover:bg-accent/20"
                  >
                    View on Figma
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </p>
              </div>
            )}


            {/* Problem & Outcome */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-2 text-text-light dark:text-text-dark">The Problem</h3>
                <p className="text-muted-light dark:text-muted-dark">{project.detail.problem}</p>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-2 text-text-light dark:text-text-dark">The Outcome</h3>
                <p className="text-muted-light dark:text-muted-dark">{project.detail.outcome}</p>
              </div>
            </div>
            
            {/* Process */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-text-light dark:text-text-dark">Process Highlights</h3>
              <div className="space-y-4">
                {project.detail.process.map(p => (
                  <div key={p.step} className="p-3 bg-surface-light dark:bg-surface-dark rounded-md">
                    <strong className="text-accent">{p.step}:</strong> <span className="text-muted-light dark:text-muted-dark">{p.note}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectModal;