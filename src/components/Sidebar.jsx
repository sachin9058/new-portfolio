import React from 'react';
import { User, FolderOpen, Code2, ScrollText, Mail, Terminal, Link2 } from 'lucide-react';
import './Sidebar.css';

const apps = [
  { id: 'about',      icon: User,       label: 'About.exe',      shortcut: '1' },
  { id: 'projects',   icon: FolderOpen,  label: 'Projects.exe',   shortcut: '2' },
  { id: 'skills',     icon: Code2,       label: 'Skills.json',    shortcut: '3' },
  { id: 'experience', icon: ScrollText,  label: 'Experience.log', shortcut: '4' },
  { id: 'contact',    icon: Mail,        label: 'Contact.sh',     shortcut: '5' },
  { id: 'terminal',   icon: Terminal,    label: 'Terminal',       shortcut: '6' },
];

export default function Sidebar({ openWindows, onOpen }) {
  return (
    <div className="sidebar">
      <div className="sidebar-apps">
        {apps.map(app => {
          const Icon = app.icon;
          const isOpen = openWindows.includes(app.id);
          return (
            <div key={app.id} className="sidebar-item-wrapper" data-tooltip={app.label}>
              <button
                className={`sidebar-item ${isOpen ? 'active' : ''}`}
                onClick={() => onOpen(app.id)}
                aria-label={app.label}
                title={app.label}
              >
                <Icon size={20} strokeWidth={1.5} />
                {isOpen && <span className="sidebar-dot" />}
              </button>
            </div>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-item-wrapper" data-tooltip="GitHub">
          <a
            className="sidebar-item"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Link2 size={20} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}
