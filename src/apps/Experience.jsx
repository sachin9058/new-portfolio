import React from 'react';
import { GraduationCap, Briefcase, Code2, Award } from 'lucide-react';
import './Experience.css';

const entries = [
  {
    type: 'education',
    date: '2024-07 → Present',
    commit: 'a8f2c41',
    title: 'B.Tech Metallurgical Engineering',
    org: 'IIT BHU (Varanasi)',
    details: ['Relevant courses: Data Structures, Algorithms, OS, DBMS, Computer Networks', 'CGPA: 8.7 / 10', 'Technical Secretary, Programming Club'],
    icon: GraduationCap,
  },

  {
    type: 'education',
    date: '2022 → 2024',
    commit: 'c9f0e12',
    title: 'Higher Secondary (12th)',
    org: 'Police Modern School Mathura (UP)',
    details: ['PCM + Computer Science'],
    icon: GraduationCap,
  },
];

const TYPE_COLORS = { education: 'accent', work: 'green', project: 'purple', award: 'yellow' };

export default function Experience() {
  return (
    <div className="exp-container">
      <div className="exp-log-header mono">
        <span className="text-muted">$ git log --all --decorate --format="%h %ai %s"</span>
      </div>
      <div className="exp-timeline">
        {entries.map((e, i) => {
          const Icon = e.icon;
          const colorKey = TYPE_COLORS[e.type];
          return (
            <div key={i} className="exp-entry">
              <div className="exp-left">
                <div className={`exp-icon ${colorKey}`}>
                  <Icon size={14} />
                </div>
                {i < entries.length - 1 && <div className="exp-line" />}
              </div>
              <div className="exp-body">
                <div className="exp-meta mono">
                  <span className="exp-commit text-muted">{e.commit}</span>
                  <span className="exp-date text-secondary">{e.date}</span>
                  <span className={`badge ${colorKey === 'accent' ? '' : colorKey}`}>{e.type}</span>
                </div>
                <div className="exp-title">{e.title}</div>
                <div className="exp-org text-muted mono">@ {e.org}</div>
                <ul className="exp-details">
                  {e.details.map((d, j) => (
                    <li key={j} className="exp-detail">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
