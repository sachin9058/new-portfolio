import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BootScreen.css';

const bootLines = [
  { text: 'DevOS v2.4.1 (2026) BIOS boot sequence...', delay: 0 },
  { text: 'Initializing hardware detection...', delay: 300 },
  { text: '[  OK  ] Detected CPU: Intel Core i7-13700H @ 2.40GHz', delay: 600 },
  { text: '[  OK  ] Detected RAM: 16 GB DDR5', delay: 850 },
  { text: '[  OK  ] Detected GPU: NVIDIA RTX 4060', delay: 1050 },
  { text: 'Loading kernel modules...', delay: 1300 },
  { text: '[  OK  ] devos-core.ko loaded', delay: 1500 },
  { text: '[  OK  ] portfolio-daemon started', delay: 1700 },
  { text: '[  OK  ] projects-service.service started', delay: 1900 },
  { text: '[  OK  ] skills-indexer.service started', delay: 2050 },
  { text: '[  OK  ] terminal-session.service started', delay: 2200 },
  { text: 'Mounting filesystems...', delay: 2400 },
  { text: '[  OK  ] /home/dev mounted', delay: 2550 },
  { text: '[  OK  ] /projects mounted (12 entries)', delay: 2700 },
  { text: 'Starting display manager...', delay: 2900 },
  { text: '[  OK  ] DevOS Desktop Environment loaded', delay: 3100 },
  { text: 'Welcome back, Developer. System ready.', delay: 3350, highlight: true },
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay)
    );
    const doneTimer = setTimeout(() => setDone(true), 3800);
    const completeTimer = setTimeout(() => onComplete(), 4400);
    return () => { timers.forEach(clearTimeout); clearTimeout(doneTimer); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="boot-content">
            <div className="boot-logo">
              <span className="boot-logo-bracket">[</span>
              <span className="boot-logo-text">DevOS</span>
              <span className="boot-logo-bracket">]</span>
            </div>
            <div className="boot-lines">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`boot-line ${line.highlight ? 'highlight' : ''}`}
                >
                  {line.text}
                </motion.div>
              ))}
              <span className="cursor-blink" />
            </div>
            <div className="boot-progress">
              <div
                className="boot-progress-bar"
                style={{
                  width: `${Math.min(100, (visibleLines.length / bootLines.length) * 100)}%`,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
