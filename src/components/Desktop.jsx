import React, { useState, useCallback } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import WindowManager from './WindowManager';
import './Desktop.css';

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowIndex, setWindowIndex] = useState(0);

  const openApp = useCallback((id) => {
    setOpenWindows(prev => {
      if (prev.find(w => w.id === id)) return prev; // already open
      return [...prev, { id, index: windowIndex }];
    });
    setWindowIndex(i => i + 1);
  }, [windowIndex]);

  const closeApp = useCallback((id) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeApp = useCallback((id) => {
    // minimize handled inside WindowManager
  }, []);

  const openIds = openWindows.map(w => w.id);

  return (
    <div className="desktop">
      <TopBar />
      <div className="desktop-body">
        <Sidebar openWindows={openIds} onOpen={openApp} />
        <div className="desktop-main">
          {openWindows.length === 0 && (
            <div className="desktop-hint">
              <div className="hint-inner">
                <div className="hint-logo">⬡</div>
                <div className="hint-title mono">DevOS</div>
                <div className="hint-sub">Click an icon in the sidebar to open an app</div>
                <div className="hint-tips">
                  <span className="badge">1 → About.exe</span>
                  <span className="badge">2 → Projects.exe</span>
                  <span className="badge">3 → Skills.json</span>
                  <span className="badge">4 → Experience.log</span>
                  <span className="badge">5 → Contact.sh</span>
                  <span className="badge">6 → Terminal</span>
                </div>
              </div>
            </div>
          )}
          <WindowManager
            windows={openWindows}
            onClose={closeApp}
            onMinimize={minimizeApp}
          />
        </div>
      </div>
    </div>
  );
}
