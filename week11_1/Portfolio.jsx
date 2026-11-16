
import React, { useEffect, useRef, useState } from 'react';
import ProjectArtwork from './ProjectArtwork.jsx';
import { projects, filterProjects } from './projects.mjs';

// Technology filter
export function TechnologyFilter({ technologies, selected, onSelect }) {
  return (
    <div className="filters" role="group" aria-label="Choose a technology">
      {technologies.map((tech) => (
        <button
          key={tech}
          type="button"
          aria-controls="project-deck"
          aria-pressed={selected === tech}
          onClick={() => onSelect(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}

// Individual project display
export function ProjectCard({
  project,
  active = true,
  slot = 0,
  onSelect,
  onDetails,
}) {
  function handleTilt(event) {
    if (
      !active ||
      document.documentElement.dataset.motion === 'off' ||
      !window.matchMedia('(pointer:fine)').matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();

    const rotateX =
      (-(event.clientY - bounds.top - bounds.height / 2) /
        bounds.height) * 3;

    const rotateY =
      ((event.clientX - bounds.left - bounds.width / 2) /
        bounds.width) * 3;

    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
  }

  function resetTilt(event) {
    event.currentTarget.style.removeProperty('--tilt-x');
    event.currentTarget.style.removeProperty('--tilt-y');
  }

  return (
    <article
      className="project-card"
      data-project={project.id}
      data-slot={slot}
      aria-hidden={!active}
      onPointerMove={handleTilt}
      onPointerLeave={resetTilt}
      onClickCapture={(event) => {
        if (!active) {
          event.preventDefault();
          event.stopPropagation();
          onSelect?.();
        }
      }}
    >
      <ProjectArtwork kind={project.id} />

      <div className="project-copy">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>
            {project.id === 'directory' ? 'DEVELOPMENT' : 'MY PROJECTS'}
          </span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul
          className="project-technologies"
          aria-label={`Technologies used in ${project.title}`}
        >
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="project-links">
          <a href={project.demoUrl} tabIndex={active ? undefined : -1}>
            {project.id === 'editing' ? 'Edit profile' : 'View project'}
            <span aria-hidden="true"> ↗</span>
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              tabIndex={active ? undefined : -1}
              aria-label={`View ${project.title} source code`}
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}

          <button
            type="button"
            tabIndex={active ? undefined : -1}
            onClick={(event) =>
              onDetails?.(project, event.currentTarget)
            }
          >
            More info <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}

// Project carousel
export function ProjectList({
  projects,
  current = 0,
  onSelect,
  onDetails,
  deckRef,
}) {
  if (projects.length === 0) {
    return (
      <p className="empty-projects" role="status">
        No matching projects found.
      </p>
    );
  }

  return (
    <div
      className="project-deck"
      id="project-deck"
      ref={deckRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project collection"
    >
      {projects.map((project, index) => {
        const position =
          (index - current + projects.length) % projects.length;

        const slot =
          position === projects.length - 1 && position !== 0
            ? -1
            : Math.min(position, 2);

        return (
          <ProjectCard
            key={project.id}
            project={project}
            active={index === current}
            slot={slot}
            onSelect={() => onSelect(index)}
            onDetails={onDetails}
          />
        );
      })}
    </div>
  );
}

// Project information popup
function ProjectDetails({ project, triggerRef, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (project && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [project]);

  return (
    <dialog
      id="project-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClose={() => {
        onClose();
        triggerRef.current?.focus();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className="dialog-heading">
        <p className="eyebrow">PROJECT OVERVIEW</p>

        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
        >
          Close ×
        </button>
      </div>

      <p className="eyebrow">{project?.category}</p>

      <h2 id="dialog-title">
        {project?.title || 'Project information'}
      </h2>

      <p>{project?.description}</p>

      <h3>Key features</h3>

      <ul>
        {(project?.features || []).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="actions">
        {project && (
          <a className="button primary" href={project.demoUrl}>
            Visit project ↗
          </a>
        )}

        {project?.githubUrl && (
          <a className="text-link" href={project.githubUrl}>
            GitHub repository ↗
          </a>
        )}
      </div>
    </dialog>
  );
}

// Main portfolio section
export default function PortfolioProjects() {
  const [technology, setTechnology] = useState('All');
  const [current, setCurrent] = useState(0);
  const [details, setDetails] = useState(null);

  const deckRef = useRef(null);
  const triggerRef = useRef(null);
  const swipe = useRef(null);

  const technologies = [
    'All',
    ...new Set(
      projects.flatMap((project) => project.technologies)
    ),
  ];

  const visibleProjects = filterProjects(projects, technology);

  // Change the active project
  function changeProject(index) {
    if (visibleProjects.length === 0) return;

    if (deckRef.current?.contains(document.activeElement)) {
      deckRef.current.focus({ preventScroll: true });
    }

    setCurrent(
      (index + visibleProjects.length) % visibleProjects.length
    );
  }

  // Select a technology filter
  function changeTechnology(value) {
    setTechnology(value);
    setCurrent(0);
  }

  return (
    <div className="portfolio-projects" data-ready="true">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="section-number">01</span> MY CREATIVE WORK
          </p>

          <h2 id="work-title">
            PROJECT SHOWCASE<span className="red">.</span>
          </h2>

          <p>A collection of projects and practical experiments.</p>
        </div>

        <TechnologyFilter
          technologies={technologies}
          selected={technology}
          onSelect={changeTechnology}
        />
      </div>

      <div
        className="project-stage"
        aria-label="Browse portfolio projects"
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;

          if (event.key === 'ArrowRight') {
            event.preventDefault();
            changeProject(current + 1);
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            changeProject(current - 1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') {
            swipe.current = {
              x: event.clientX,
              y: event.clientY,
            };
          }
        }}
        onPointerCancel={() => {
          swipe.current = null;
        }}
        onPointerUp={(event) => {
          if (!swipe.current) return;

          const dx = event.clientX - swipe.current.x;
          const dy = event.clientY - swipe.current.y;

          swipe.current = null;

          if (
            Math.abs(dx) > 45 &&
            Math.abs(dx) > Math.abs(dy) * 1.5
          ) {
            changeProject(current + (dx < 0 ? 1 : -1));
          }
        }}
      >
        <ProjectList
          projects={visibleProjects}
          current={current}
          deckRef={deckRef}
          onSelect={changeProject}
          onDetails={(project, trigger) => {
            triggerRef.current = trigger;
            setDetails(project);
          }}
        />

        <div className="deck-controls">
          <button
            type="button"
            aria-label="Previous project"
            disabled={visibleProjects.length < 2}
            onClick={() => changeProject(current - 1)}
          >
            ←
          </button>

          <p id="project-position" role="status" aria-live="polite">
            {String(visibleProjects.length ? current + 1 : 0).padStart(2, '0')}
            {' / '}
            {String(visibleProjects.length).padStart(2, '0')}
          </p>

          <button
            type="button"
            aria-label="Next project"
            disabled={visibleProjects.length < 2}
            onClick={() => changeProject(current + 1)}
          >
            →
          </button>
        </div>
      </div>

      <div
        className="project-index"
        role="group"
        aria-label="Select a project"
      >
        {visibleProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            aria-controls="project-deck"
            aria-pressed={index === current}
            onClick={() => changeProject(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {project.title}
          </button>
        ))}
      </div>

      <p className="project-results" role="status" aria-live="polite">
        Showing {visibleProjects.length}{' '}
        {visibleProjects.length === 1 ? 'project' : 'projects'}
        {' · '}
        {technology === 'All' ? 'All technologies' : technology}
      </p>

      <ProjectDetails
        project={details}
        triggerRef={triggerRef}
        onClose={() => setDetails(null)}
      />
    </div>
  );
}
