
import React from 'react';
import ExerciseLayout from './ExerciseLayout.jsx';

const courseList = [
  {
    id: 101,
    title: 'Introduction to Python',
    instructor: 'Computer Science Department',
    credits: 3,
    required: true,
  },
  {
    id: 102,
    title: 'Machine Learning',
    instructor: 'AI Research Department',
    credits: 3,
    required: true,
  },
  {
    id: 103,
    title: 'Computer Networks',
    instructor: 'IT Education Team',
    credits: 2,
    required: false,
  },
  {
    id: 104,
    title: 'Data Structures',
    instructor: 'Software Engineering Team',
    credits: 3,
    required: true,
  },
  {
    id: 105,
    title: 'Statistics for Computing',
    instructor: 'Mathematics Department',
    credits: 2,
    required: false,
  },
  {
    id: 106,
    title: 'Computer Architecture',
    instructor: 'Computer Systems Team',
    credits: 3,
    required: true,
  },
  {
    id: 107,
    title: 'Technical Communication',
    instructor: 'Language Education Team',
    credits: 1,
    required: false,
  },
];

export function CourseCard({ title, instructor, credits, required }) {
  return (
    <article className="catalog-card course-card">
      <p className="eyebrow">ACADEMIC PROGRAM</p>

      <span className={`badge ${required ? 'required' : 'elective'}`}>
        {required ? 'Core Subject' : 'Optional Subject'}
      </span>

      <h2>{title}</h2>

      <p className="instructor">
        Instructor: {instructor}
      </p>

      <p className="credits">
        <strong>{credits}</strong>
        {credits === 1 ? ' Credit Hour' : ' Credit Hours'}
      </p>
    </article>
  );
}

export default function CourseCatalog() {
  return (
    <ExerciseLayout
      title="MY ACADEMIC PROGRAM"
      description="Discover different subjects, their instructors, credit hours, and course categories."
    >
      <section className="catalog-grid" aria-label="Academic subjects">
        {courseList.map((item) => (
          <CourseCard
            key={item.id}
            title={item.title}
            instructor={item.instructor}
            credits={item.credits}
            required={item.required}
          />
        ))}
      </section>

      <p className="data-note">
        This is a demonstration of reusable React components.
        Course information is sample data for practice.
      </p>
    </ExerciseLayout>
  );
}
