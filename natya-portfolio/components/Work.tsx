
import React, { useState, useMemo } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';
import type { Project } from '../types';

const Work: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const allTags = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.tags))], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }
    return projects.filter(p => p.tags.includes(activeFilter));
  }, [activeFilter]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <Section id="work">
      <SectionHeading title="Selected Work" subtitle="Some of my" />
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              activeFilter === tag 
                ? 'bg-accent text-white' 
                : 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:bg-accent/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="perspective-[1000px] motion-safe:animate-cardIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProjectCard project={project} onClick={() => openModal(project)} />
          </div>
        ))}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </Section>
  );
};

export default Work;
