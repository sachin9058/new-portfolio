import React, { useState } from 'react';
import { Star, GitFork, ExternalLink, Link2, ChevronRight, Folder, FolderOpen, FileCode } from 'lucide-react';
import './Projects.css';

const GITHUB_USERNAME = 'sachin9058';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    name: 'shell',
    description: 'A custom Unix shell implementation in C with support for pipes, redirections, background processes, and built-in commands.',
    language: 'C',
    topics: ['systems', 'c', 'unix', 'os', 'shell'],
    html_url: 'https://github.com/sachin9058/shell',
    readme: `# shell\n\nA fully functional Unix shell implementation built from scratch in C.\n\n## Features\n- Command execution with fork/exec\n- Pipes and I/O redirection\n- Background process support (&)\n- Built-in commands: cd, exit, history\n- Signal handling (SIGINT, SIGCHLD)\n\n## Tech Stack\nC, POSIX APIs, Unix System Calls`,
  },
  {
    id: 2,
    name: 'RISC-V Terminal Algorithms Demo',
    description: 'Terminal-based demo of classic algorithms implemented in RISC-V assembly, showcasing low-level computation and ISA fundamentals.',
    language: 'Shell',
    topics: ['risc-v', 'assembly', 'algorithms', 'systems', 'low-level'],
    html_url: 'https://github.com/sachin9058/RISK_V_Terminal_algorithms_demo',
    readme: `# RISC-V Terminal Algorithms Demo\n\nA terminal-based demonstration of classic computer science algorithms written in RISC-V assembly.\n\n## Algorithms Implemented\n- Sorting (Bubble, Selection)\n- Fibonacci sequence\n- Factorial computation\n- Binary search\n\n## Tech Stack\nRISC-V Assembly, Shell scripting, QEMU/RARS simulator`,
  },
  {
    id: 3,
    name: 'TrustMesh Auditor',
    description: 'Multi-model LLM validation system that reduces hallucinations using cross-model aggregation and an agent-based pipeline.',
    language: 'Python',
    topics: ['ai', 'llm', 'validation', 'python', 'a2a', 'docker'],
    html_url: 'https://github.com/sachin9058/ai-agent',
    readme: `# TrustMesh Auditor\n\nA multi-model validation system designed to improve reliability of LLM outputs through cross-model aggregation.\n\n## Features\n- Agent-based pipeline for response aggregation and validation\n- Reduced hallucination rate by 30%+ using cross-model consistency checks\n- A2A (Agent-to-Agent) architecture for modular validation stages\n\n## Tech Stack\nPython, Docker, LLM APIs, A2A Architecture`,
  },
  {
    id: 4,
    name: 'Local AI Document Intelligence',
    description: 'Privacy-focused document querying system with a custom RAG pipeline, local LLM inference, and 35% improved retrieval accuracy.',
    language: 'TypeScript',
    topics: ['ai', 'rag', 'typescript', 'llm', 'ollama', 'nextjs'],
    html_url: 'https://github.com/sachin9058/ai-agent-new',
    readme: `# Local AI Document Intelligence System\n\nA privacy-focused document querying system using a custom RAG pipeline with local LLMs — no external AI APIs.\n\n## Features\n- End-to-end pipeline: ingestion, chunking, retrieval, and generation\n- Improved retrieval accuracy by 35% via semantic chunking\n- Context-aware, streaming chat responses\n- Fully local — powered by Ollama + Llama 3\n\n## Tech Stack\nNext.js, TypeScript, Node.js, Ollama (Llama 3), RAG Pipeline, pgvector, Docker`,
  },
  {
    id: 5,
    name: 'pg_ai_query',
    description: 'PostgreSQL extension that converts natural language queries to SQL using AI — open source contribution.',
    language: 'C',
    topics: ['postgresql', 'ai', 'nlp', 'sql', 'open-source', 'c'],
    html_url: 'https://github.com/sachin9058/pg_ai_query',
    readme: `# pg_ai_query\n\nA PostgreSQL extension that allows users to query databases using natural language, which is automatically converted to SQL by an AI model.\n\n## Features\n- Natural language → SQL translation\n- Integrates directly into PostgreSQL as an extension\n- Supports local and remote AI backends\n\n## Open Source Contribution\nForked and contributed to this project as part of open source involvement.\n\n## Tech Stack\nC, PostgreSQL Extension API, Python (AI backend)`,
  },
  {
    id: 6,
    name: 'minder',
    description: 'Software Supply Chain Security Platform — open source contribution to a Go-based security policy engine.',
    language: 'Go',
    topics: ['security', 'open-source', 'go', 'supply-chain', 'devops'],
    html_url: 'https://github.com/sachin9058/minder',
    readme: `# Minder\n\nMinder is an open source Software Supply Chain Security Platform that helps enforce security policies across repositories and CI/CD pipelines.\n\n## Open Source Contribution\nContributed to the mindersec/minder upstream project. Explored policy engine internals and Go-based microservice architecture.\n\n## Tech Stack\nGo, gRPC, PostgreSQL, Kubernetes, GitHub Actions`,
  },
  {
    id: 7,
    name: 'scorecard',
    description: 'OpenSSF Scorecard — security health metrics for Open Source projects. Contributed to this widely-used Go security tool.',
    language: 'Go',
    topics: ['security', 'open-source', 'go', 'ossf', 'devops'],
    html_url: 'https://github.com/sachin9058/scorecard',
    readme: `# OpenSSF Scorecard\n\nScorecard is an automated security tool that analyzes open source projects and assigns security scores based on best practices.\n\n## Open Source Contribution\nForked and studied the codebase as part of open source security tooling exploration. Contributed fixes and explored check implementations.\n\n## Tech Stack\nGo, GitHub API, SLSA, Sigstore`,
  },
  {
    id: 8,
    name: 'fabric-x',
    description: 'Open source contribution to Hyperledger Fabric-X — enterprise blockchain infrastructure written in Go.',
    language: 'Go',
    topics: ['blockchain', 'open-source', 'go', 'hyperledger', 'distributed-systems'],
    html_url: 'https://github.com/sachin9058/fabric-x',
    readme: `# Fabric-X (Hyperledger)\n\nFabric-X is a next-generation enterprise blockchain platform based on Hyperledger Fabric, focused on performance and modularity.\n\n## Open Source Contribution\nForked and contributed to this Apache 2.0 licensed Go project. Explored distributed ledger internals, consensus mechanisms, and smart contract execution.\n\n## Tech Stack\nGo, gRPC, Docker, Kubernetes, Apache Kafka`,
  },
  {
    id: 9,
    name: 'Safe Desktop',
    description: 'Multi-signer desktop application for secure on-chain cryptocurrency transactions using Electron.js and Solidity smart contracts.',
    language: 'JavaScript',
    topics: ['electron', 'web3', 'solidity', 'blockchain', 'desktop'],
    html_url: 'https://github.com/sachin9058/safe-desktop',
    readme: `# Safe Desktop\n\nA multi-signer desktop application for secure on-chain cryptocurrency transactions.\n\n## Features\n- Multi-signature wallet support\n- On-chain transaction signing via Solidity smart contracts\n- Real-time blockchain event indexing via Envio\n- Desktop-native UI with Electron.js\n\n## Tech Stack\nElectron.js, Envio, Solidity, Web3.js`,
  },
  {
    id: 10,
    name: 'Fest Architects',
    description: 'Event management platform for college clubs and fests — supports authentication, team registration, and data persistence.',
    language: 'TypeScript',
    topics: ['event-management', 'react', 'vite', 'college', 'typescript'],
    html_url: 'https://fest-architects.vercel.app/#',
    readme: `# Fest Architects\n\nA full-featured event management platform designed for college clubs and fests.\n\n## Features\n- Authentication and user management\n- Event creation and team registration\n- Real-time data persistence\n- Mobile-responsive UI\n\n## Tech Stack\nReact, Vite, Framer Motion, TypeScript, CSS`,
  },
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
  const [projects] = useState(FALLBACK_PROJECTS);
  const [selected, setSelected] = useState(FALLBACK_PROJECTS[0]);
  const [expanded, setExpanded] = useState(true);

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
