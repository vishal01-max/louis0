
import React from 'react';
import ExerciseLayout from './ExerciseLayout.jsx';
import { Card } from './practice.jsx';

// EXERCISE 1: GREETING COMPONENT

export function WelcomeMessage({ username }) {
  return <p>Welcome to our learning platform, {username}!</p>;
}


// EXERCISE 2: MESSAGE COMPONENT

export function StatusMessage({ category, text }) {
  if (!text) return null;

  return (
    <p className={`notification notification-${category}`}>
      {category === 'warning' ? 'Attention: ' : 'Notice: '}
      {text}
    </p>
  );
}


// EXERCISE 3: STUDENT RESULT CARD

export function ResultCard({ learner }) {
  const isSuccessful = learner.marks >= 60;

  return (
    <article className="content-card">
      <h3>{learner.fullName}</h3>

      <p>Student Code: {learner.code}</p>
      <p>Final Marks: {learner.marks}</p>

      <span className={`badge ${isSuccessful ? 'available' : 'unavailable'}`}>
        {isSuccessful ? 'Passed' : 'Needs Improvement'}
      </span>
    </article>
  );
}


// SAMPLE STUDENT RESULTS

export const learners = [
  { code: 'ST-101', fullName: 'Alex Kim', marks: 92 },
  { code: 'ST-102', fullName: 'Daniel Lee', marks: 48 },
  { code: 'ST-103', fullName: 'Chris Park', marks: 76 },
];


// EXERCISE 4: RESULT BOARD

export function ResultBoard() {
  return (
    <div className="wrapper-grid">
      {learners.map((learner) => (
        <ResultCard key={learner.code} learner={learner} />
      ))}
    </div>
  );
}


// EXERCISE 5: STUDENT DIRECTORY

export function LearnerDirectory() {
  const classMembers = [
    { code: 'ST-201', fullName: 'Alex Kim' },
    { code: 'ST-202', fullName: 'Daniel Lee' },
    { code: 'ST-203', fullName: 'Chris Park' },
    { code: 'ST-204', fullName: 'Michael Choi' },
  ];

  return (
    <ul>
      {classMembers.map((member) => (
        <li key={member.code}>
          {member.fullName} — {member.code}
        </li>
      ))}
    </ul>
  );
}


// MAIN EXAMPLES PAGE

export default function Examples() {
  return (
    <ExerciseLayout
      title="REACT COMPONENT SHOWCASE"
      description="Explore reusable components, dynamic lists, conditional messages, and component composition through practical examples."
    >

      <div className="practice-grid">

        {/* EXAMPLE 1: PROPS */}

        <section className="exercise">
          <div className="exercise-number">
            01 / REUSABLE COMPONENTS
          </div>

          <h2>Personalized Welcome Messages.</h2>

          <WelcomeMessage username="Alex" />
          <WelcomeMessage username="Daniel" />
          <WelcomeMessage username="Michael" />
        </section>


        {/* EXAMPLE 2: LIST RENDERING */}

        <section className="exercise">
          <div className="exercise-number">
            02 / DYNAMIC LISTS
          </div>

          <h2>Class Member Directory.</h2>

          <Card title="Registered Students">
            <LearnerDirectory />
          </Card>
        </section>


        {/* EXAMPLE 3: CONDITIONAL RENDERING */}

        <section className="exercise">
          <div className="exercise-number">
            03 / CONDITIONAL OUTPUT
          </div>

          <h2>System Notifications.</h2>

          <StatusMessage
            category="info"
            text="Your profile has been updated successfully."
          />

          <StatusMessage
            category="warning"
            text="Please complete your pending assignment."
          />

          <StatusMessage
            category="info"
            text=""
          />

          <p>
            Empty messages are not displayed because the component
            returns null when no text is provided.
          </p>
        </section>


        {/* EXAMPLE 4: ARRAY AND CONDITIONAL LOGIC */}

        <section className="exercise">
          <div className="exercise-number">
            04 / STUDENT RESULT SYSTEM
          </div>

          <h2>Academic Performance Board.</h2>

          <p>
            Student results are displayed using reusable cards.
            A score of 60 or higher is considered a pass.
          </p>

          <ResultBoard />
        </section>

      </div>
    </ExerciseLayout>
  );
}
