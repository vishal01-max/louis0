
import React, { useRef, useState } from 'react';

// EXERCISE 1: STUDENT PROFILE

export function ProfileCard({
  name,
  role,
  email,
  avatarUrl = './avatar.svg'
}) {
  return (
    <div className="practice-profile">
      <img
        src={avatarUrl}
        alt={`${name} profile`}
        width="64"
        height="64"
      />

      <h3>{name}</h3>
      <p>{role}</p>
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  );
}

const defaultProfile = {
  name: 'Alex Kim',
  role: 'Software Development Student',
  email: 'alex@example.com',
};

function ProfilePlayground() {
  const [profile, setProfile] = useState(defaultProfile);
  const [showInitials, setShowInitials] = useState(false);

  const updateProfile = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="profile-playground">
      <fieldset className="profile-editor">
        <legend>Edit Student Information</legend>

        {Object.keys(defaultProfile).map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}

            <input
              type={field === 'email' ? 'email' : 'text'}
              value={profile[field]}
              onChange={(event) =>
                updateProfile(field, event.target.value)
              }
            />
          </label>
        ))}

        <label className="check-row">
          <input
            type="checkbox"
            checked={showInitials}
            onChange={(event) =>
              setShowInitials(event.target.checked)
            }
          />
          Display initials avatar
        </label>

        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setProfile(defaultProfile);
            setShowInitials(false);
          }}
        >
          Restore Default
        </button>
      </fieldset>

      <div>
        <p className="lab-caption">STUDENT PROFILE PREVIEW</p>

        <ProfileCard
          {...profile}
          avatarUrl={
            showInitials ? './initials-avatar.svg' : undefined
          }
        />

        <p className="lab-note">
          Changes made in the editor will immediately appear
          in the profile preview.
        </p>
      </div>
    </div>
  );
}


// EXERCISE 2: NOTIFICATION CENTER

const sampleNotifications = [
  {
    id: 'assignment',
    type: 'success',
    message: 'Your assignment has been added successfully.',
    read: false,
  },
  {
    id: 'deadline',
    type: 'warning',
    message: 'Reminder: Review your upcoming project deadline.',
    read: false,
  },
  {
    id: 'update',
    type: 'info',
    message: 'Your learning dashboard has been updated.',
    read: true,
  },
];

export function NotificationItem({
  type,
  message,
  read,
  onToggle,
  onDismiss,
}) {
  const icons = {
    success: '✅',
    warning: '⚠️',
    info: '📌',
  };

  return (
    <li className={`notification notification-${type}${read ? ' is-read' : ''}`}>
      <span aria-hidden="true">{icons[type]}</span>

      <div className="notification-copy">
        <span className="notification-type">
          {type.toUpperCase()} · {read ? 'Read' : 'New'}
        </span>

        <p>{message}</p>

        <div className="notification-actions">
          <button
            type="button"
            className="lab-button"
            onClick={onToggle}
            aria-label={`${read ? 'Mark unread' : 'Mark read'}: ${message}`}
          >
            {read ? 'Mark as Unread' : 'Mark as Read'}
          </button>

          <button
            type="button"
            className="lab-button"
            onClick={onDismiss}
            aria-label={`Remove notification: ${message}`}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

export function NotificationList({
  items = sampleNotifications,
  onToggle,
  onDismiss,
}) {
  if (items.length === 0) {
    return (
      <p className="inbox-empty">
        Your notification center is currently empty.
      </p>
    );
  }

  return (
    <ul className="notifications">
      {items.map((item) => (
        <NotificationItem
          key={item.id}
          {...item}
          onToggle={() => onToggle(item.id)}
          onDismiss={() => onDismiss(item.id)}
        />
      ))}
    </ul>
  );
}

function DemoInbox() {
  const [items, setItems] = useState(sampleNotifications);
  const [filter, setFilter] = useState('All');

  const counter = useRef(0);
  const allButton = useRef(null);

  const unreadCount = items.filter(
    (item) => !item.read
  ).length;

  const filteredItems =
    filter === 'Unread'
      ? items.filter((item) => !item.read)
      : items;

  const toggleNotification = (id) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, read: !item.read }
          : item
      )
    );
  };

  const markAllRead = () => {
    setItems((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
    allButton.current?.focus();
  };

  const addNotification = () => {
    counter.current += 1;

    const newItem = {
      id: `new-${counter.current}`,
      type: 'info',
      message: `New notification ${counter.current}: Keep learning and improving your React skills.`,
      read: false,
    };

    setItems((previous) => [...previous, newItem]);
  };

  return (
    <div className="demo-inbox">
      <p className="inbox-status" role="status">
        {unreadCount} unread out of {items.length} notifications
      </p>

      <div className="lab-toolbar">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter notifications"
        >
          {['All', 'Unread'].map((option) => (
            <button
              key={option}
              ref={option === 'All' ? allButton : null}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="lab-button"
          disabled={unreadCount === 0}
          onClick={markAllRead}
        >
          Mark Everything Read
        </button>
      </div>

      <NotificationList
        items={filteredItems}
        onToggle={toggleNotification}
        onDismiss={(id) => {
          setItems((previous) =>
            previous.filter((item) => item.id !== id)
          );
          allButton.current?.focus();
        }}
      />

      <div className="lab-toolbar inbox-bottom">
        <button
          type="button"
          className="lab-button"
          onClick={addNotification}
        >
          + Add Notification
        </button>

        <button
          type="button"
          className="lab-button"
          disabled={items.length === 0}
          onClick={() => {
            setItems([]);
            allButton.current?.focus();
          }}
        >
          Clear Notifications
        </button>

        <button
          type="button"
          className="lab-button"
          onClick={() => {
            setItems(sampleNotifications);
            setFilter('All');
          }}
        >
          Restore Inbox
        </button>
      </div>
    </div>
  );
}


// EXERCISE 3: REUSABLE CONTENT CARDS

export function Card({ title, children }) {
  return (
    <div className="content-card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const learningTopics = [
  'Understand React props',
  'Practice useState and state updates',
  'Learn conditional rendering',
  'Create reusable components',
];

function PracticeChecklist() {
  const [completed, setCompleted] = useState([]);

  const completedCount = completed.length;

  const handleCheck = (topic, isChecked) => {
    setCompleted((previous) =>
      isChecked
        ? [...previous, topic]
        : previous.filter((item) => item !== topic)
    );
  };

  return (
    <div className="wrapper-grid">
      <Card title="React Learning Checklist">
        <p>Select the concepts you have successfully learned.</p>

        <div className="concept-checks">
          {learningTopics.map((topic) => (
            <label className="check-row" key={topic}>
              <input
                type="checkbox"
                checked={completed.includes(topic)}
                onChange={(event) =>
                  handleCheck(topic, event.target.checked)
                }
              />
              {topic}
            </label>
          ))}
        </div>
      </Card>

      <Card
        title={
          completedCount === learningTopics.length
            ? 'All Topics Completed!'
            : 'Your Learning Progress'
        }
      >
        <label className="progress-label" htmlFor="learning-progress">
          {completedCount} / {learningTopics.length} Completed
        </label>

        <progress
          id="learning-progress"
          value={completedCount}
          max={learningTopics.length}
        />

        <p role="status">
          {completedCount === learningTopics.length
            ? 'Excellent work! You have completed all learning topics.'
            : 'Continue checking the topics as you learn them.'}
        </p>

        <a className="lab-link" href="./index.html">
          Visit Student Directory ↗
        </a>

        <button
          type="button"
          className="lab-button"
          disabled={completedCount === 0}
          onClick={() => setCompleted([])}
        >
          Reset Progress
        </button>

        <p className="lab-note">
          Progress is temporary and will reset when the page is refreshed.
        </p>
      </Card>
    </div>
  );
}


// EXPLANATION COMPONENT

function Explanation({ children, code }) {
  return (
    <details className="lab-explanation">
      <summary>Explore the React Code</summary>
      <p>{children}</p>

      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
    </details>
  );
}


// MAIN PRACTICE PAGE

export default function Practice() {
  return (
    <main className="page">

      <header className="site-header">
        <a className="brand" href="../#coursework">
          REACT<span> / WORKSHOP</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="./tasks.html">Exercises</a>
          <a href="../#coursework">My Coursework</a>
          <a href="../week10/portfolio/">Portfolio</a>
          <a className="nav-link" href="./">
            Home ↗
          </a>
        </nav>
      </header>

      <section className="intro practice-intro">
        <p className="eyebrow">WEB DEVELOPMENT · REACT PRACTICE</p>

        <h1>
          LEARN REACT.
          <br />
          <span className="outline">BUILD SOMETHING NEW</span>
          <span className="title-dot">.</span>
        </h1>

        <p className="intro-copy">
          Explore components, manage state, and build interactive interfaces.
        </p>

        <nav className="lab-toolbar lab-jumps" aria-label="Exercise navigation">
          <a href="#exercise-one">01 / Profile</a>
          <a href="#exercise-two">02 / Notifications</a>
          <a href="#exercise-three">03 / Checklist</a>
        </nav>
      </section>

      <div className="practice-grid interactive-practice">

        <section
          className="exercise"
          id="exercise-one"
          aria-labelledby="profile-title"
        >
          <div className="exercise-number">
            EXERCISE 01 / COMPONENT PROPS
          </div>

          <h2 id="profile-title">Create Your Profile.</h2>

          <p>
            Change your personal information and see how React
            updates the profile component instantly.
          </p>

          <ProfilePlayground />

          <Explanation
            code={
              'const [profile, setProfile] = useState(defaultProfile);\n<ProfileCard {...profile} />'
            }
          >
            The useState hook stores profile information.
            The ProfileCard component receives the information
            through props and displays the updated values.
          </Explanation>
        </section>


        <section
          className="exercise"
          id="exercise-two"
          aria-labelledby="inbox-title"
        >
          <div className="exercise-number">
            EXERCISE 02 / STATE MANAGEMENT
          </div>

          <h2 id="inbox-title">Manage Your Notifications.</h2>

          <p>
            Practice filtering, updating, adding, and removing
            notifications using React state.
          </p>

          <DemoInbox />

          <Explanation
            code={
              "const [items, setItems] = useState(sampleNotifications);\nconst unread = items.filter(item => !item.read);"
            }
          >
            The notification center uses useState to manage its
            information. The filter displays unread notifications,
            while event handlers update or remove individual items.
          </Explanation>
        </section>


        <section
          className="exercise"
          id="exercise-three"
          aria-labelledby="cards-title"
        >
          <div className="exercise-number">
            EXERCISE 03 / COMPONENT COMPOSITION
          </div>

          <h2 id="cards-title">Track Your Learning.</h2>

          <p>
            Use reusable cards and checkboxes to monitor your
            understanding of important React concepts.
          </p>

          <PracticeChecklist />

          <Explanation
            code={
              'function Card({ title, children }) {\n  return <div className="content-card">\n    <h3>{title}</h3>\n    {children}\n  </div>;\n}'
            }
          >
            The Card component accepts a title and children.
            This allows different content to share the same layout.
            The checklist also calculates progress dynamically.
          </Explanation>
        </section>

      </div>

      <footer className="site-footer">
        <span>React Learning Workshop</span>

        <a href="./tasks.html">
          Back to Exercises
        </a>

        <a href="./">
          Explore Directory ↗
        </a>
      </footer>

    </main>
  );
}
