import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import './Skills.css';

const skillsData = {
  languages: ['C++', 'Python', 'JavaScript', 'TypeScript', 'C', 'Go'],
  frameworks: ['React', 'Node.js', 'Express', 'FastAPI', 'Next.js'],
  tools: ['Git', 'Docker', 'Linux', 'VS Code', 'Vim', 'GDB'],
  databases: ['MongoDB', 'PostgreSQL', 'Redis', 'SQLite'],
  cloud: ['AWS (EC2, S3)', 'Vercel', 'GitHub Actions'],
  paradigms: ['OOP', 'Functional', 'Systems Programming', 'REST APIs', 'WebSockets'],
};

const proficiency = {
  'C++': 90, 'Python': 85, 'JavaScript': 88, 'TypeScript': 78,
  'C': 82, 'Go': 65, 'React': 87, 'Node.js': 80
};

function JsonLine({ keyStr, value, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!visible) return null;
  return (
    <div className="json-line" style={{ animation: 'fadeIn 0.2s ease' }}>
      <span className="json-key">"{keyStr}"</span>
      <span className="json-colon">: </span>
      <span className="json-bracket">[</span>
      {value.map((v, i) => (
        <span key={v}>
          <span className="json-string">"{v}"</span>
          {i < value.length - 1 && <span className="json-comma">, </span>}
        </span>
      ))}
      <span className="json-bracket">]</span>
    </div>
  );
}

export default function Skills() {
  const [collapsed, setCollapsed] = useState({});
  const toggle = (key) => setCollapsed(c => ({ ...c, [key]: !c[key] }));

  const topLangs = Object.entries(proficiency);
  let delay = 0;

  return (
    <div className="skills-container">
      <div className="skills-left">
        <div className="skills-header">
          <span className="mono text-muted">// skills.json</span>
          <span className="badge green">loaded</span>
        </div>
        <div className="json-viewer">
          <div className="json-line"><span className="json-brace">{'{'}</span></div>
          {Object.entries(skillsData).map(([key, vals]) => {
            const d = delay;
            delay += 120;
            const isCollapsed = collapsed[key];
            return (
              <div key={key} className="json-group">
                <button className="json-expand-btn" onClick={() => toggle(key)}>
                  {isCollapsed ? <ChevronRight size={11} /> : <ChevronDown size={11} />}
                </button>
                <JsonLine keyStr={key} value={isCollapsed ? ['...'] : vals} delay={d} />
              </div>
            );
          })}
          <div className="json-line"><span className="json-brace">{'}'}</span></div>
        </div>
      </div>

      <div className="skills-right">
        <div className="skills-header">
          <span className="mono text-muted">// proficiency</span>
        </div>
        <div className="skills-bars">
          {topLangs.map(([lang, pct], i) => (
            <div key={lang} className="skill-bar-row" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="skill-bar-label">
                <span className="mono">{lang}</span>
                <span className="skill-pct text-muted">{pct}%</span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: `${pct}%`,
                    transitionDelay: `${300 + i * 80}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="skills-grid-header mono text-muted">// tools & technologies</div>
        <div className="skills-grid">
          {[...skillsData.tools, ...skillsData.frameworks].map(t => (
            <div key={t} className="skill-chip mono">{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
