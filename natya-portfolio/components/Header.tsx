import React, { useState, useEffect } from 'react';
import { YOUR_NAME, NAV_LINKS, RESUME_PDF_URL } from '../constants';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Header height is 80px (h-20)
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      const sections = NAV_LINKS.map(link => document.getElementById(link.href.substring(1)));
      let currentSection = '';
      
      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-lg shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-display text-xl font-bold text-text-light dark:text-text-dark group relative">
            {YOUR_NAME}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-2 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium transition-colors relative ${activeSection === link.href.substring(1) ? 'text-accent' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent rounded-full motion-safe:animate-scaleIn" />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a 
              href={RESUME_PDF_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm font-medium px-4 py-2 rounded-md border border-text-light/20 dark:border-text-dark/20 text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:border-text-light/40 dark:hover:border-text-dark/40 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;