import React, { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Link2, ChevronRight, Folder, FolderOpen, FileCode } from 'lucide-react';
import './Projects.css';

const GITHUB_USERNAME = 'your-github-username'; // replace with actual username

const FALLBACK_PROJECTS = [
  {
    id: 1, name: 'Safe Desktop', description: 'Multi-signer desktop application for secure on-chain cryptocurrency transactions.',
    language: 'TypeScript',
    topics: ['react', 'vite', 'framer-motion', 'css'],
    html_url: 'https://github.com/sachin9058/safe-desktop',
    readme: `Multi-signer desktop application for secure on-chain cryptocurrency transactions. Technologies: Electron.js, Envio, Solidity`,
  },
  {
    id: 2, name: 'Fest Architects', description: 'Event management platform designed for college clubs and fests, supporting authentication and data persistence.',
    language: 'TypeScript',
    topics: ['react', 'vite', 'framer-motion', 'css'],
    html_url: 'https://fest-architects.vercel.app/#',
    readme: `Event management platform designed for college clubs and fests, supporting authentication and data persistence. Technologies: React, Vite, Framer Motion, CSS`,
  },
  {
    id: 3, name: 'SCS-Website', description: 'A college council specially made for students to have a good experience in college',
    language: 'TypeScript',
    topics: ['react', 'vite', 'framer-motion', 'css'],
    html_url: 'https://github.com/convenorsakha-web/SCS-Website',
    readme: `# SCS-Website\n\nA college council specially made for students to have a good experience in college.\n\n## Features\n- Bootloader (GRUB)\n- Protected mode, GDT, IDT\n- Keyboard & VGA driver\n- Basic memory management\n\n## Tech Stack\nC, x86 Assembly, NASM, QEMU`,
  }
];

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5',
  C: '#555555', 'C++': '#f34b7d', Go: '#00add8',
  Rust: '#dea584', Java: '#b07219', default: '#8b949e'
};

function parseMarkdown(text) {
  return text
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [selected, setSelected] = useState(FALLBACK_PROJECTS[0]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (GITHUB_USERNAME === 'your-github-username') return;
    setLoading(true);
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=8`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(r => ({
            id: r.id, name: r.name, description: r.description || 'No description.',
            language: r.language || 'Markdown',
            topics: r.topics || [],
            html_url: r.html_url,
            readme: `# ${r.name}\n\n${r.description || ''}\n\n## Repository\n- Language: ${r.language}`,
          }));
          setProjects(mapped);
          setSelected(mapped[0]);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const langColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

  return (
    <div className="projects-container">
      {/* Left: File tree */}
      <div className="proj-filetree">
        <div className="filetree-header">
          <span className="mono">EXPLORER</span>
        </div>
        <div className="filetree-section">
          <button className="filetree-folder" onClick={() => setExpanded(e => !e)}>
            {expanded ? <FolderOpen size={13} /> : <Folder size={13} />}
            <span>projects</span>
            <ChevronRight size={11} className={`chevron ${expanded ? 'open' : ''}`} />
          </button>
          {expanded && (
            <div className="filetree-files">
              {projects.map(p => (
                <button
                  key={p.id}
                  className={`filetree-file ${selected?.id === p.id ? 'active' : ''}`}
                  onClick={() => setSelected(p)}
                >
                  <FileCode size={13} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Code editor / README */}
      {selected && (
        <div className="proj-editor">
          <div className="editor-tabs">
            <div className="editor-tab active mono">{selected.name} / README.md</div>
          </div>
          <div className="editor-content">
            <div className="proj-meta">
              <div className="proj-meta-top">
                <div>
                  <div className="proj-name">{selected.name}</div>
                  <div className="proj-desc">{selected.description}</div>
                </div>
                <a href={selected.html_url} target="_blank" rel="noopener noreferrer" className="btn">
                  <Link2 size={13} /> View on GitHub <ExternalLink size={11} />
                </a>
              </div>
              <div className="proj-stats">
                <span className="proj-stat">
                  <span className="lang-dot" style={{ background: langColor(selected.language) }} />
                  <span className="mono">{selected.language}</span>
                </span>
              </div>
              <div className="proj-topics">
                {(selected.topics || []).map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="proj-readme">
              <div className="readme-header mono">
                <span className="text-muted">// README.md</span>
              </div>
              <div
                className="readme-body"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(selected.readme || '') }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
