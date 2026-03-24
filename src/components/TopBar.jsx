import React, { useState, useEffect } from 'react';
import { Sun, Moon, Wifi, Battery, Circle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './TopBar.css';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const fmtDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  return (
    <div className="topbar-clock">
      <span className="clock-time mono">{fmt(time)}</span>
      <span className="clock-date">{fmtDate(time)}</span>
    </div>
  );
}

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <span className="topbar-logo-icon">⬡</span>
          <span className="topbar-logo-name mono">DevOS</span>
        </div>
        <div className="topbar-sep" />
        <span className="topbar-status">
          <Circle size={7} fill="var(--green)" stroke="none" />
          <span className="topbar-status-text">System nominal</span>
        </span>
      </div>

      <div className="topbar-center">
        <LiveClock />
      </div>

      <div className="topbar-right">
        <div className="topbar-sys-icons">
          <Wifi size={14} color="var(--text-secondary)" />
          <Battery size={14} color="var(--text-secondary)" />
        </div>
        <div className="topbar-sep" />
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme" aria-label="Toggle theme">
          {theme === 'dark'
            ? <Sun size={14} />
            : <Moon size={14} />
          }
        </button>
      </div>
    </div>
  );
}
