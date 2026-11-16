
import React from 'react';

function StudentCard({ fullName, idNumber, department, academicYear, grade }) {
  return (
    <article className="student-info-card">

      <header className="student-card-header">
        <div>
          <p className="card-label">STUDENT INFORMATION</p>
          <h2 className="student-heading">{fullName}</h2>
        </div>

        <span className="id-badge">
          #{idNumber}
        </span>
      </header>

      <div className="student-details">

        <div className="detail-item">
          <strong>Department</strong>
          <p>{department}</p>
        </div>

        <div className="detail-item">
          <strong>Academic Level</strong>
          <p>{academicYear}</p>
        </div>

        <div className="detail-item">
          <strong>Current GPA</strong>
          <p className="gpa-value">{grade}</p>
        </div>

      </div>
    </article>
  );
}

export default StudentCard;
