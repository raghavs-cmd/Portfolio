import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">{subtitle}</p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">{title}</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-2 mx-auto mt-4 rounded-full"></div>
    </div>
  );
};

export default SectionHeading;
