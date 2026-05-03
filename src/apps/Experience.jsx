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
    details: [
      'Relevant courses: Data Structures, Algorithms, OS, DBMS, Computer Networks',
      'CGPA: 8.7 / 10',
      'Technical Secretary, Programming Club',
      'Associate Web Developer — SCS, IIT BHU',
    ],
    icon: GraduationCap,
  },

  {
    type: 'work',
    date: '2025',
    commit: 'e9b1c55',
    title: 'Open Source Contributor — Fabric-X & OpenSSF Minder',
    org: 'github.com/hyperledger-labs/fabric-x · github.com/mindersec/minder',
    details: [
      'Implemented retry mechanisms and improved failure handling in transaction submission workflows',
      'Contributed to engine and CLI improvements: commit-level evaluation, metadata extraction, and config enhancements',
      'Worked on refactoring efforts to reduce coupling and improve modularity in core system components',
      'Added test coverage and benchmarks to validate system behavior and performance',
      'Collaborated with maintainers through iterative reviews to refine implementation quality',
    ],
    icon: Briefcase,
  },

  {
    type: 'project',
    date: '2026-04',
    commit: 'd7e4f22',
    title: 'TrustMesh Auditor (LLM Response Validation)',
    org: 'github.com/sachin9058/ai-agent',
    details: [
      'Designed a multi-model validation system to improve reliability of LLM outputs using cross-model aggregation',
      'Engineered an agent-based pipeline for response aggregation and validation',
      'Reduced hallucination rate by 30%+ using cross-model consistency checks',
      'Technologies: Python, Docker, LLM APIs, A2A Architecture',
    ],
    icon: Code2,
  },

  {
    type: 'project',
    date: '2026-03 → 2026-04',
    commit: 'b9c3f11',
    title: 'Local AI Document Intelligence System',
    org: 'github.com/sachin9058/ai-agent-new',
    details: [
      'Built a privacy-focused document querying system using a custom RAG pipeline with local LLMs',
      'Developed end-to-end pipeline: ingestion, chunking, retrieval, and generation',
      'Improved retrieval accuracy by 35% and enabled context-aware responses',
      'Technologies: Next.js, TypeScript, Node.js, Ollama (Llama 3), RAG Pipeline',
    ],
    icon: Code2,
  },

  {
    type: 'project',
    date: '2026-04',
    commit: 'f3a1d09',
    title: 'Custom Unix Shell (C)',
    org: 'github.com/sachin9058/shell',
    details: [
      'Built a fully functional Unix shell from scratch in C',
      'Supports pipes, I/O redirection, background processes (&), signal handling',
      'Implements built-in commands: cd, exit, history via POSIX APIs',
    ],
    icon: Code2,
  },

  {
    type: 'work',
    date: '2025',
    commit: '7c2a9d0',
    title: 'Coordinator — Annual Cultural Fest',
    org: 'IIT BHU',
    details: [
      'Managed logistics and coordinated across 2+ teams for the annual cultural fest',
    ],
    icon: Briefcase,
  },

  {
    type: 'award',
    date: '2025',
    commit: 'a1f4e88',
    title: '🥈 2nd Place — IIT BHU SHILP Hackathon',
    org: 'IIT BHU',
    details: [
      'Secured 2nd place at the SHILP Hackathon held at IIT BHU',
    ],
    icon: Award,
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
