import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Terminal.css';

const PORTFOLIO = {
  name: 'Sachin Kumar',
  title: 'B.Tech Metallurgical Engineering @ IIT BHU',
  languages: ['C++', 'Python', 'JavaScript', 'TypeScript', 'C', 'Go'],
  frameworks: ['React', 'Node.js', 'Express', 'FastAPI'],
  tools: ['Git', 'Docker', 'Linux', 'VS Code'],
  projects: ['devos-portfolio', 'algo-visualizer', 'mini-os-kernel', 'distributed-kv-store'],
};

function processCommand(cmd) {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0].toLowerCase();

  switch (base) {
    case 'help':
      return [
        { text: 'Available commands:', color: 'accent' },
        { text: '  help          Show this help message' },
        { text: '  about         About me' },
        { text: '  whoami        Short identity' },
        { text: '  skills        Technical skills' },
        { text: '  projects      List projects' },
        { text: '  experience    Work & education history' },
        { text: '  contact       Contact information' },
        { text: '  ls            List files' },
        { text: '  pwd           Print working directory' },
        { text: '  date          Show current date' },
        { text: '  clear         Clear terminal' },
        { text: '  echo <text>   Print text' },
        { text: '  theme         Toggle dark/light mode' },
      ];
    case 'whoami':
    case 'about':
      return [
        { text: `┌─ ${PORTFOLIO.name}`, color: 'accent' },
        { text: `│  ${PORTFOLIO.title}` },
        { text: '│  Passionate developer building efficient systems' },
        { text: '│  and beautiful interfaces.' },
        { text: '│' },
        { text: '│  Location: India 🇮🇳' },
        { text: '│  Status: Open to opportunities ✅' },
        { text: '└─────────────────────────────────────' },
      ];
    case 'skills':
      return [
        { text: '// skills.json', color: 'muted' },
        { text: '{', color: 'secondary' },
        { text: `  "languages":  [${PORTFOLIO.languages.map(l => `"${l}"`).join(', ')}]`, color: 'code' },
        { text: `  "frameworks": [${PORTFOLIO.frameworks.map(f => `"${f}"`).join(', ')}]`, color: 'code' },
        { text: `  "tools":      [${PORTFOLIO.tools.map(t => `"${t}"`).join(', ')}]`, color: 'code' },
        { text: '}', color: 'secondary' },
      ];
    case 'projects':
      return [
        { text: 'drwxr-xr-x  projects/', color: 'accent' },
        ...PORTFOLIO.projects.map(p => ({ text: `  -rw-r--r--  ${p}.git` })),
        { text: `\n${PORTFOLIO.projects.length} repositories found. Open Projects.exe for details.`, color: 'muted' },
      ];
    case 'experience':
      return [
        { text: 'commit a8f2c41 — B.Tech Metallurgical Engineering, IIT BHU (2024–Present)', color: 'accent' },
      ];
    case 'contact':
      return [
        { text: '// contact info', color: 'muted' },
        { text: '  📧 Email:    sachinkumar905846@gmail.com', color: 'accent' },
        { text: '  💼 LinkedIn: /in/sachin-kumar-iitv24' },
        { text: '  🐙 GitHub:   github.com/sachin9058' },
        { text: '' },
        { text: 'Or open Contact.sh for interactive form.', color: 'muted' },
      ];
    case 'ls':
      return [
        { text: 'drwxr-xr-x  About.exe', color: 'accent' },
        { text: 'drwxr-xr-x  Projects.exe', color: 'accent' },
        { text: '-rw-r--r--  Skills.json', color: 'code' },
        { text: '-rw-r--r--  Experience.log', color: 'secondary' },
        { text: '-rwxr-xr-x  Contact.sh', color: 'green' },
        { text: '-rwxr-xr-x  Terminal', color: 'yellow' },
      ];
    case 'pwd':
      return [{ text: '/home/dev/portfolio' }];
    case 'date':
      return [{ text: new Date().toString() }];
    case 'echo':
      return [{ text: parts.slice(1).join(' ') || '' }];
    case 'clear':
      return '__CLEAR__';
    case '':
      return [];
    default:
      return [{ text: `bash: ${base}: command not found. Type 'help' for available commands.`, color: 'red' }];
  }
}

const SUGGESTIONS = ['help', 'about', 'whoami', 'skills', 'projects', 'experience', 'contact', 'ls', 'clear', 'pwd', 'date'];

export default function Terminal() {
  const [history, setHistory] = useState([{
    type: 'output', lines: [
      { text: 'DevOS Terminal v2.4.1', color: 'accent' },
      { text: "Type 'help' for available commands.", color: 'muted' },
      { text: '' },
    ]
  }]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const updateSuggestion = (val) => {
    if (!val) { setSuggestion(''); return; }
    const match = SUGGESTIONS.find(s => s.startsWith(val) && s !== val);
    setSuggestion(match || '');
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    updateSuggestion(e.target.value);
  };

  const handleKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) { setInput(suggestion); setSuggestion(''); }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIndex + 1, cmdHistory.length - 1);
      setHistIndex(idx);
      if (cmdHistory[idx]) setInput(cmdHistory[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIndex - 1, -1);
      setHistIndex(idx);
      setInput(idx === -1 ? '' : cmdHistory[idx] || '');
    }
  };

  const submit = useCallback(() => {
    const cmd = input.trim();
    const result = processCommand(cmd);
    if (result === '__CLEAR__') {
      setHistory([]);
    } else {
      setHistory(h => [...h,
      { type: 'input', text: cmd },
      ...(result.length > 0 ? [{ type: 'output', lines: result }] : [])
      ]);
    }
    if (cmd) setCmdHistory(h => [cmd, ...h]);
    setInput('');
    setSuggestion('');
    setHistIndex(-1);
  }, [input]);

  const colorClass = { accent: 'text-accent', green: 'text-green', muted: 'text-muted', secondary: 'text-secondary', code: 'term-code', red: 'term-red', yellow: 'term-yellow' };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="term-output">
        {history.map((item, i) => (
          <div key={i}>
            {item.type === 'input' && (
              <div className="term-input-line mono">
                <span className="term-prompt">
                  <span className="text-green">dev</span>
                  <span className="text-muted">@devos</span>
                  <span className="text-muted">:</span>
                  <span className="text-accent">~</span>
                  <span className="text-muted">$ </span>
                </span>
                <span>{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div className="term-output-block">
                {item.lines.map((line, j) => (
                  <div key={j} className={`term-line mono ${colorClass[line.color] || ''}`}>
                    {line.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="term-input-area">
        <div className="term-prompt mono">
          <span className="text-green">dev</span>
          <span className="text-muted">@devos</span>
          <span className="text-muted">:</span>
          <span className="text-accent">~</span>
          <span className="text-muted">$ </span>
        </div>
        <div className="term-input-wrap">
          <input
            ref={inputRef}
            className="term-input mono"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKey}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          {suggestion && (
            <span className="term-suggestion mono">{input}<span>{suggestion.slice(input.length)}</span></span>
          )}
        </div>
        <span className="cursor-blink" />
      </div>
    </div>
  );
}
