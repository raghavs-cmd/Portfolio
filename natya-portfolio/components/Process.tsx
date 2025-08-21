import React, { useRef } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { PROCESS_STEPS } from '../constants';
import { useOnScreen } from '../hooks/useOnScreen';
import { DiscoverIcon, DefineIcon, IdeateIcon, DesignIcon, ValidateIcon } from './icons/ProcessIcons';

const iconMap: { [key: string]: React.ReactNode } = {
  Discover: <DiscoverIcon />,
  Define: <DefineIcon />,
  Ideate: <IdeateIcon />,
  Design: <DesignIcon />,
  Validate: <ValidateIcon />,
};

const Process: React.FC = () => {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.5 });

  return (
    <Section id="process">
      <SectionHeading title="My Design Process" subtitle="How I Work" />
      <div ref={ref} className="relative">
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-surface-light dark:bg-surface-dark">
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-out"
            style={{ width: isVisible ? '100%' : '0%' }}
          ></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {PROCESS_STEPS.map((step, index) => (
            <div 
              key={step.name} 
              className={`text-center p-4 transition-all duration-500 ease-out group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center text-accent border-2 border-transparent group-hover:border-accent transition-all duration-300 group-hover:scale-110">
                {iconMap[step.name]}
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-text-light dark:text-text-dark">{step.name}</h3>
              <p className="text-sm text-muted-light dark:text-muted-dark">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Process;
