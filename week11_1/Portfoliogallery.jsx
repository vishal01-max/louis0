
import React, { useState } from 'react';
import ExerciseLayout from './ExerciseLayout.jsx';

// PROJECT DATA
export const projectData = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    description: 'A responsive website showcasing my academic work, skills, and web development activities.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: '01 / PORTFOLIO',
    githubUrl: 'https://github.com/vishal01-max/louis0',
    demoUrl: 'https://vishal01-max.github.io/louis0/',
  },
  {
    id: 'book-search',
    title: 'Book Search Application',
    description: 'A web application that allows users to search for books and retrieve information through an external API.',
    technologies: ['JavaScript', 'API', 'CSS'],
    category: '02 / APPLICATION',
    githubUrl: 'https://github.com/vishal01-max/louis0',
    demoUrl: 'https://vishal01-max.github.io/louis0/',
  },
  {
    id: 'student-profile',
    title: 'Student Profile System',
    description: 'A React-based application displaying student information through reusable components and props.',
    technologies: ['React', 'CSS'],
    category: '03 / REACT PROJECT',
    githubUrl: 'https://github.com/vishal01-max/louis0',
    demoUrl: 'https://vishal01-max.github.io/louis0/',
  },
];

// SINGLE PROJECT COMPONENT
export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  demoUrl,
  category,
}) {
  return (
    <article className="catalog-card gallery-card">

      <div className="project-visual" aria-hidden="true">
        <span>{category}</span>
        <b>{title.charAt(0)}</b>
      </div>

      <div className="gallery-body">
        <h2>{title}</h2>

        <p>{description}</p>

        <ul className="tech-tags" aria-label={`${title} technologies`}>
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-links">
          <a href={githubUrl} target="_blank" rel="noreferrer">
            View Code ↗
          </a>

          <a href={demoUrl} target="_blank" rel="noreferrer">
            Open Project ↗
          </a>
        </div>
      </div>
    </article>
  );
}

// DISPLAY PROJECT COLLECTION
export function ProjectList({ items }) {
  if (items.length === 0) {
    return (
      <p className="empty-gallery">
        No projects available for this category.
      </p>
    );
  }

  return (
    <section className="catalog-grid" aria-label="My projects">
      {items.map((item) => (
        <ProjectCard key={item.id} {...item} />
      ))}
    </section>
  );
}

// TECHNOLOGY FILTER
export function FilterBar({ options, activeFilter, onFilterChange }) {
  return (
    <div
      className="gallery-filters"
      role="group"
      aria-label="Choose a technology"
    >
      {options.map((technology) => (
        <button
          key={technology}
          type="button"
          aria-pressed={activeFilter === technology}
          onClick={() => onFilterChange(technology)}
        >
          {technology}
        </button>
      ))}
    </div>
  );
}

// MAIN PROJECT GALLERY
export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filterOptions = [
    'All',
    ...new Set(
      projectData.flatMap((project) => project.technologies)
    ),
  ];

  const displayedProjects =
    activeFilter === 'All'
      ? projectData
      : projectData.filter((project) =>
          project.technologies.includes(activeFilter)
        );

  return (
    <ExerciseLayout
      title="MY PROJECT SHOWCASE"
      description="Explore my web development projects, discover the technologies used, and access project demonstrations."
    >
      <div className="gallery-toolbar">

        <FilterBar
          options={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <p role="status" aria-live="polite">
          Showing {displayedProjects.length}{' '}
          {displayedProjects.length === 1 ? 'project' : 'projects'}
        </p>

      </div>

      <ProjectList items={displayedProjects} />

      <p className="data-note">
        This gallery demonstrates reusable React components,
        dynamic project rendering, props, and technology-based filtering.
      </p>
    </ExerciseLayout>
  );
}
