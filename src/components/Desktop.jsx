import React, { useState, useCallback, useEffect, useRef } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import WindowManager from './WindowManager';
import './Desktop.css';

// ─── Inline Cyber Wallpaper ────────────────────────────────────────────────
const CODE_SNIPPETS = [
  'fn main()', 'int* ptr', 'git commit', 'fork()', 'malloc()', '0xDEAD',
  'SIGKILL', 'O(log n)', 'gRPC', 'retry()', 'ctx.Done()', 'pgvector',
  'RAG', 'LLM', 'goroutine', 'chan<-', 'SELECT *', 'docker run',
  'kubectl', 'raft', 'consensus', '[]byte', 'unsafe', 'POSIX',
  'pipe()', 'execve()', 'mmap()', 'epoll', 'async fn', 'merkle', 'txn',
];
const CHARS = '01アウカBFEDC#@%';

function CyberWallpaper() {
  const ref = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Sizing: always use window dimensions, guaranteed non-zero ──────
    // The sidebar is 52px, topbar is 42px — canvas covers desktop-main area
    const getW = () => window.innerWidth  - 52;
    const getH = () => window.innerHeight - 42;

    canvas.width  = getW();
    canvas.height = getH();

    const onResize = () => {
      canvas.width  = getW();
      canvas.height = getH();
    };
    window.addEventListener('resize', onResize);

    // ── Scene objects ──────────────────────────────────────────────────
    const N = 60;
    let W = canvas.width, H = canvas.height;

    const mkNode = () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.55, vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 3 + 2.5, pulse: Math.random() * Math.PI * 2,
    });
    let nodes = Array.from({ length: N }, mkNode);

    const PCNT = 24;
    let parts = Array.from({ length: PCNT }, () => ({
      txt: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * W, y: Math.random() * H,
      vy: -(Math.random() * 0.5 + 0.2),
      op: Math.random() * 0.35 + 0.25,
      sz: Math.floor(Math.random() * 4) + 11,
    }));

    const CW = 20;
    let drops = Array.from(
      { length: Math.ceil(W / CW) },
      () => ({ y: Math.random() * -H, sp: Math.random() * 16 + 5 })
    );

    // ── Mouse ──────────────────────────────────────────────────────────
    const onMove = (e) => {
      mouse.current = { x: e.clientX - 52, y: e.clientY - 42 };
    };
    window.addEventListener('mousemove', onMove);

    // ── Draw ──────────────────────────────────────────────────────────
    const CONN = 170, MDIST = 210;

    const draw = () => {
      W = canvas.width; H = canvas.height;
      const mx = mouse.current.x, my = mouse.current.y;

      // Dark fade (slow — lets content build up)
      ctx.fillStyle = 'rgba(13,17,23,0.12)';
      ctx.fillRect(0, 0, W, H);

      // Matrix rain
      ctx.font = '13px "JetBrains Mono",monospace';
      drops.forEach((d, i) => {
        ctx.fillStyle = `rgba(88,166,255,${0.1 + Math.random() * 0.08})`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * CW, d.y);
        d.y += d.sp;
        if (d.y > H + 20) { d.y = Math.random() * -H * 0.5; d.sp = Math.random() * 16 + 5; }
      });

      // Floating code text
      parts.forEach(p => {
        ctx.font = `${p.sz}px "JetBrains Mono",monospace`;
        ctx.fillStyle = `rgba(88,166,255,${p.op})`;
        ctx.fillText(p.txt, p.x, p.y);
        p.y += p.vy;
        if (p.y < -30) {
          p.y = H + 30; p.x = Math.random() * W;
          p.txt = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          p.op = Math.random() * 0.35 + 0.25;
        }
      });

      // Move + bounce nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.025;
      });

      // Node connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < CONN) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(88,166,255,${(1 - d / CONN) * 0.6})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        // Mouse repel lines
        const md = Math.hypot(nodes[i].x - mx, nodes[i].y - my);
        if (md < MDIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(88,166,255,${(1 - md / MDIST) * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      // Draw nodes with glow
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        const near  = Math.hypot(n.x - mx, n.y - my) < MDIST;
        // Glow halo
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 22);
        g.addColorStop(0, `rgba(88,166,255,${near ? 0.6 : 0.3})`);
        g.addColorStop(1,  'rgba(88,166,255,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        // Core dot
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (near ? 2.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(88,166,255,${0.95 + pulse * 0.05})`
          : `rgba(88,166,255,${0.65 + pulse * 0.35})`;
        ctx.fill();
      });

      // Cursor ring
      if (mx > 52 && mx < W && my > 0 && my < H) {
        ctx.beginPath(); ctx.arc(mx, my, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(88,166,255,0.7)'; ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(88,166,255,0.25)'; ctx.lineWidth = 1.5; ctx.stroke();
      }

      raf.current = requestAnimationFrame(draw);
    };

    // Initial solid fill, then start
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowIndex, setWindowIndex] = useState(0);

  const openApp = useCallback((id) => {
    setOpenWindows(prev => {
      if (prev.find(w => w.id === id)) return prev;
      return [...prev, { id, index: windowIndex }];
    });
    setWindowIndex(i => i + 1);
  }, [windowIndex]);

  const closeApp = useCallback((id) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeApp = useCallback((_id) => {
    // minimize handled inside WindowManager
  }, []);

  const openIds = openWindows.map(w => w.id);

  return (
    <div className="desktop">
      <TopBar />
      <div className="desktop-body">
        <Sidebar openWindows={openIds} onOpen={openApp} />
        <div className="desktop-main">
          <CyberWallpaper />
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
