import React, { useState, useEffect } from 'react';
import Button from './Button';

const AIWiresBackground = () => (
  <svg className="absolute inset-0 w-full h-full text-accent/10 dark:text-accent/20 ai-wires" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g stroke="currentColor" strokeWidth="0.5" filter="url(#glow)">
      {/* Nodes */}
      <circle cx="10%" cy="20%" r="3" className="motion-safe:animate-pulse" style={{animationDelay: '0s'}} />
      <circle cx="80%" cy="15%" r="4" className="motion-safe:animate-pulse" style={{animationDelay: '1s'}} />
      <circle cx="50%" cy="50%" r="5" className="motion-safe:animate-pulse" style={{animationDelay: '0.5s'}} />
      <circle cx="20%" cy="85%" r="4" className="motion-safe:animate-pulse" style={{animationDelay: '1.5s'}} />
      <circle cx="90%" cy="80%" r="3" className="motion-safe:animate-pulse" style={{animationDelay: '0.2s'}} />
      <circle cx="30%" cy="40%" r="2" className="motion-safe:animate-pulse" style={{animationDelay: '2s'}}/>

      {/* Wires */}
      <path d="M 10,20 Q 30,50 50,50 T 80,15" fill="none" style={{animationDelay: '0.1s'}} />
      <path d="M 20,85 Q 35,60 50,50 T 90,80" fill="none" style={{animationDelay: '0.3s'}}/>
      <path d="M 10,20 Q 20,30 30,40 T 20,85" fill="none" style={{animationDelay: '0.5s'}}/>
      <path d="M 80,15 Q 60,30 50,50 T 90,80" fill="none" style={{animationDelay: '0.7s'}}/>
      <path d="M 30,40 Q 40,65 20,85" fill="none" style={{animationDelay: '0.9s'}}/>
    </g>
  </svg>
);


const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80; // Corresponds to h-20 in Header.tsx
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const parallax = (speed: number) => {
    if (typeof window === 'undefined') return {};
    const x = (window.innerWidth / 2 - mousePosition.x) * speed / 50;
    const y = (window.innerHeight / 2 - mousePosition.y) * speed / 50;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden py-20">
      {/* Decorative Elements */}
      <div style={{ transform: `translateY(${offsetY * 0.3}px)` }} className="absolute inset-0 -z-10">
        <div style={parallax(5)} className="absolute inset-[-10px]">
          <AIWiresBackground />
        </div>
      </div>

      <div className="relative z-10" style={{ transform: `translateY(${offsetY * 0.5}px)` }}>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-text-light dark:text-text-dark leading-tight max-w-4xl mx-auto">
          <span className="block overflow-hidden py-1">
            <span
              className="inline-block motion-safe:animate-heroText"
              style={{ animationDelay: '100ms' }}
            >
              UI/UX Designer
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              className="inline-block motion-safe:animate-heroText"
              style={{ animationDelay: '300ms' }}
            >
              crafting interfaces that
            </span>
          </span>
          <span className="block overflow-hidden py-1">
            <span
              className="inline-block motion-safe:animate-heroText"
              style={{ animationDelay: '500ms' }}
            >
              feel effortless
            </span>
          </span>
        </h1>
        <p 
          className="mt-6 text-lg md:text-xl text-muted-light dark:text-muted-dark max-w-2xl mx-auto motion-safe:animate-fadeInUp"
          style={{ animationDelay: '700ms' }}
        >
          I design and build beautiful, accessible, and user-centered digital products.
        </p>
        <div 
          className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 motion-safe:animate-fadeInUp"
          style={{ animationDelay: '900ms' }}
        >
          <Button href="#work" variant="primary" onClick={(e) => handleSmoothScroll(e as any, '#work')}>View Selected Work</Button>
          <Button href="#contact" variant="secondary" onClick={(e) => handleSmoothScroll(e as any, '#contact')}>Contact Me</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;