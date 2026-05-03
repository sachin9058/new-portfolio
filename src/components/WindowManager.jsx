import React, { useState, useRef, useCallback, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import About from '../apps/About';
import Projects from '../apps/Projects';
import Skills from '../apps/Skills';
import Experience from '../apps/Experience';
import Contact from '../apps/Contact';
import Terminal from './Terminal';
import './WindowManager.css';

const APP_META = {
  about:      { title: 'About.exe',      component: About },
  projects:   { title: 'Projects.exe',   component: Projects },
  skills:     { title: 'Skills.json',    component: Skills },
  experience: { title: 'Experience.log', component: Experience },
  contact:    { title: 'Contact.sh',     component: Contact },
  terminal:   { title: 'Terminal',       component: Terminal },
};

const DEFAULT_SIZES = {
  about:      { w: 680, h: 520 },
  projects:   { w: 820, h: 580 },
  skills:     { w: 620, h: 480 },
  experience: { w: 680, h: 540 },
  contact:    { w: 600, h: 480 },
  terminal:   { w: 720, h: 480 },
};

function getInitialPos(id, index) {
  const cascadeX = 80 + (index % 6) * 28;
  const cascadeY = 70 + (index % 4) * 28;
  return { x: cascadeX, y: cascadeY };
}

export default function WindowManager({ windows, onClose, onMinimize }) {
  // windows: array of { id, index }
  const [positions, setPositions] = useState({});
  const [zOrders, setZOrders] = useState({});
  const [minimized, setMinimized] = useState({});
  const zCounter = useRef(100);
  const containerRef = useRef(null);
  const dragging = useRef(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    windows.forEach(w => {
      if (!positions[w.id]) {
        setPositions(p => ({ ...p, [w.id]: getInitialPos(w.id, w.index) }));
      }
      if (!zOrders[w.id]) {
        setZOrders(z => ({ ...z, [w.id]: 100 }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windows]);

  const bringToFront = useCallback((id) => {
    const next = zCounter.current + 1;
    zCounter.current = next;
    setZOrders(z => ({ ...z, [id]: next }));
  }, []);

  const handleMouseDown = useCallback((e, id) => {
    if (e.target.closest('.window-btn')) return;
    bringToFront(id);
    const pos = positions[id] || { x: 60, y: 60 };
    dragging.current = {
      id,
      startX: e.clientX - pos.x,
      startY: e.clientY - pos.y,
    };
    e.preventDefault();
  }, [positions, bringToFront]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const { id, startX, startY } = dragging.current;
      const el = containerRef.current;
      const cW = el ? el.clientWidth : window.innerWidth;
      const cH = el ? el.clientHeight : window.innerHeight;
      const size = DEFAULT_SIZES[id] || { w: 600, h: 400 };
      const x = Math.max(0, Math.min(e.clientX - startX, cW - size.w));
      const y = Math.max(0, Math.min(e.clientY - startY, cH - size.h));
      setPositions(p => ({ ...p, [id]: { x, y } }));
    };
    const onUp = () => { dragging.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const toggleMinimize = (id) => {
    setMinimized(m => ({ ...m, [id]: !m[id] }));
    onMinimize(id);
  };

  return (
    <div className="window-manager" ref={containerRef}>
      <AnimatePresence>
        {windows.map(w => {
          const meta = APP_META[w.id];
          if (!meta) return null;
          const Comp = meta.component;
          const pos = positions[w.id] || { x: 60, y: 60 };
          const size = DEFAULT_SIZES[w.id] || { w: 600, h: 400 };
          const isMin = minimized[w.id];

          if (isMobile) {
            return (
              <motion.div
                key={w.id}
                className="window mobile-window"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <div className="window-titlebar">
                  <div className="window-controls">
                    <button className="window-btn close" onClick={() => onClose(w.id)} />
                  </div>
                  <div className="window-title">{meta.title}</div>
                </div>
                <div className="window-content">
                  <Comp />
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={w.id}
              className="window"
              style={{
                left: pos.x,
                top: pos.y,
                width: size.w,
                height: isMin ? 36 : size.h,
                zIndex: zOrders[w.id] || 100,
              }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onMouseDown={() => bringToFront(w.id)}
            >
              <div
                className="window-titlebar"
                onMouseDown={(e) => handleMouseDown(e, w.id)}
              >
                <div className="window-controls">
                  <button className="window-btn close" onClick={() => onClose(w.id)} title="Close" />
                  <button className="window-btn minimize" onClick={() => toggleMinimize(w.id)} title="Minimize" />
                  <button className="window-btn maximize" title="Maximize" />
                </div>
                <div className="window-title">{meta.title}</div>
                <div style={{ width: 52 }} />
              </div>
              {!isMin && (
                <div className="window-content">
                  <Comp />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
