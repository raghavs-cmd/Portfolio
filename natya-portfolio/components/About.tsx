import React, { useState } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { SHORT_BIO, SKILLS } from '../constants';

const SkillChip: React.FC<{ skill: string }> = ({ skill }) => (
  <div className="bg-surface-light dark:bg-surface-dark py-2 px-4 rounded-full text-sm text-muted-light dark:text-muted-dark">
    {skill}
  </div>
);

const About: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const [scrollStyles, setScrollStyles] = React.useState({
    img: {},
    spring: {},
    dots: {},
  });

  const bioToShow = isExpanded ? SHORT_BIO : `${SHORT_BIO.substring(0, 220)}...`;

  React.useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollPercent = (viewportCenter - (rect.top)) / (rect.height);

          setScrollStyles({
            img: { transform: `translateY(${scrollPercent * -20}px)` },
            spring: { transform: `translateY(${scrollPercent * 40}px) rotate(${scrollPercent * 20}deg)` },
            dots: { transform: `translateY(${scrollPercent * -50}px) rotate(${scrollPercent * -15}deg)` },
          });
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="about" className="relative overflow-hidden" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {/* Spring */}
        <svg
          style={scrollStyles.spring}
          className="absolute top-[10%] left-[5%] w-24 h-24 text-accent-2/30 dark:text-accent-2/20 transition-transform duration-300 ease-out"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 10 10 C 20 80, 80 20, 90 90" stroke="currentColor" fill="none" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Dots grid */}
        <div 
          style={scrollStyles.dots}
          className="absolute bottom-[15%] right-[10%] w-32 h-32 transition-transform duration-300 ease-out"
        >
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-accent/20 dark:bg-accent/10 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
      
      <SectionHeading title="About Me" subtitle="A Little Background" />
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative inline-block mb-6">
            {/* INSTRUCTION: Replace the src below with the path to your own portrait image */}
            <img
            style={scrollStyles.img}
            src="/public/images/Natya.jpg"
            alt="Natya"
            className="relative z-10 w-32 h-32 rounded-full mx-auto shadow-lg transition-transform duration-300 ease-out object-cover"
            width="200"
            height="200"
            />
            <div className="absolute inset-0 bg-accent-2/20 rounded-full transform scale-110 blur-xl -z-0 opacity-70"></div>
        </div>
        <p className="text-lg text-muted-light dark:text-muted-dark leading-relaxed mb-4">{bioToShow}</p>
        <button onClick={() => setIsExpanded(p => !p)} className="font-semibold text-accent hover:underline mb-10">
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>

        <h3 className="font-display font-bold text-xl mb-6 text-text-light dark:text-text-dark">My Skillset</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {SKILLS.map(skill => <SkillChip key={skill} skill={skill} />)}
        </div>
      </div>
    </Section>
  );
};

export default About;