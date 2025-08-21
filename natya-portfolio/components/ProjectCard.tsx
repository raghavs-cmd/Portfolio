
import React, { useState, useRef } from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x:0, y:0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    setRotate({
      x: yPct * -15, // Max rotation in degrees
      y: xPct * 15,
    });
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="relative bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu cursor-pointer group"
      style={{
        transformStyle: 'preserve-3d',
        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: `transform ${isHovering ? '0.1s' : '0.6s cubic-bezier(0.23, 1, 0.32, 1)'}`,
      }}
    >
      <div 
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 50%)`,
          pointerEvents: 'none',
          transform: 'translateZ(10px)',
        }}
      />
      <div className="relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <img 
          src={project.cover} 
          alt={project.title} 
          width="800"
          height="600"
          loading="lazy"
          decoding="async"
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
      </div>
      <div className="p-6">
        <div 
          className="flex flex-wrap gap-2 mb-3"
          style={{ transform: 'translateZ(30px)' }}
        >
          {project.tags.map(tag => (
            <span key={tag} className="text-xs bg-accent/10 text-accent font-semibold px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <h3 
          className="font-display text-xl font-bold text-text-light dark:text-text-dark mb-2"
          style={{ transform: 'translateZ(50px)' }}
        >
          {project.title}
        </h3>
        <p 
          className="text-sm text-accent-2 font-medium"
          style={{ transform: 'translateZ(20px)' }}
        >
          {project.impact}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
