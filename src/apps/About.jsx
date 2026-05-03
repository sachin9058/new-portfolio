import React from 'react';
import { MapPin, GraduationCap, Code2, Coffee, Link2, ExternalLink } from 'lucide-react';
import './About.css';

const stats = [
  { label: 'Year', value: '2nd Year', icon: GraduationCap },
  { label: 'Branch', value: 'Metallurgical Engineering', icon: Code2 },
  { label: 'Location', value: 'India', icon: MapPin },
  { label: 'Coffee', value: '∞ cups', icon: Coffee },
];

export default function About() {
  return (
    <div className="about-container">
      <div className="about-left">
        <div className="about-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span className="avatar-emoji">👨‍💻</span>
            </div>
          </div>
          <div className="avatar-status">
            <span className="status-dot" />
            <span>Open to opportunities</span>
          </div>
        </div>

        <div className="about-links">
          <a href="https://github.com/sachin9058" target="_blank" rel="noopener noreferrer" className="about-link">
            <Link2 size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sachin-kumar-iitv24/" target="_blank" rel="noopener noreferrer" className="about-link">
            <Link2 size={14} /> LinkedIn
          </a>
          <a href="mailto:sachinkumar905846@gmail.com" className="about-link">
            <ExternalLink size={14} /> Email
          </a>
        </div>
      </div>

      <div className="about-right">
        <div className="about-header">
          <h1 className="about-name">Sachin Kumar</h1>
          <div className="about-tagline mono">
            <span className="text-accent">$</span> Backend Developer · Open Source · IIT BHU
          </div>
        </div>

        <p className="about-bio">
          Hey! I'm a <span className="text-accent">Backend-focused Software Developer</span> with hands-on
          experience contributing to distributed systems in open source — including
          <span className="text-accent"> Hyperledger Fabric-X</span> and the <span className="text-accent">OpenSSF Minder</span> project.
          I've worked on transaction reliability, retry mechanisms, context propagation, and system
          decoupling in production-like environments.
        </p>
        <p className="about-bio">
          I'm passionate about building <span className="text-accent">resilient and scalable backend systems</span>,
          exploring LLM agents and RAG pipelines, and contributing to meaningful open source projects.
          When I'm not shipping code, I'm grinding competitive programming or reading about distributed systems.
        </p>

        <div className="about-stats">
          {stats.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="about-stat">
                <Icon size={14} color="var(--accent)" />
                <span className="stat-label">{s.label}</span>
                <span className="stat-value mono">{s.value}</span>
              </div>
            );
          })}
        </div>

        <div className="about-tags">
          {['Systems Programming', 'Web Dev', 'Open Source', 'Competitive Programming', 'ML/AI'].map(t => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>

        <a href="https://sachin-resume-e7f7e7.tiiny.site" className="btn primary about-resume-btn">
          <ExternalLink size={13} />
          View Resume
        </a>
      </div>
    </div>
  );
}
