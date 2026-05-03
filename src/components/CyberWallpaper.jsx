import React, { useEffect, useRef } from 'react';

const CODE_SNIPPETS = [
  'fn main()', 'int* ptr', 'git commit', 'fork()', 'malloc()',
  '0xDEAD', 'SIGKILL', 'O(log n)', 'gRPC', 'retry()', 'ctx.Done()',
  'pgvector', 'RAG', 'LLM', 'goroutine', 'chan<-', 'SELECT *',
  'docker run', 'kubectl', 'raft', 'consensus', '[]byte', 'unsafe',
  'POSIX', 'pipe()', 'execve()', 'mmap()', 'epoll', 'async fn',
  'rollback', 'commit', 'shard', 'partition', 'merkle', 'txn',
];

const CHARS = '01アウカキBFEDC#@%&';

export default function CyberWallpaper() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Size from window (most reliable on mount) ──────────────────────
    const setSize = () => {
      // Use the parent's actual rendered size, falling back to window
      const p = canvas.parentElement;
      const w = (p && p.clientWidth > 0) ? p.clientWidth : window.innerWidth;
      const h = (p && p.clientHeight > 0) ? p.clientHeight : window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      return { w, h };
    };

    let { w: W, h: H } = setSize();

    const onResize = () => {
      ({ w: W, h: H } = setSize());
    };
    window.addEventListener('resize', onResize);

    const NODE_COUNT = 60;
    const CONNECT_DIST = 160;
    const MOUSE_DIST = 200;

    // Init nodes / particles / drops from current W, H
    let nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1.2, pulse: Math.random() * Math.PI * 2,
    }));

    const PARTICLE_COUNT = 24;
    let particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * W, y: Math.random() * H,
      vy: -(Math.random() * 0.4 + 0.15),
      opacity: Math.random() * 0.22 + 0.07,
      size: Math.floor(Math.random() * 3) + 9,
    }));

    const COL_W = 20;
    let drops = Array.from({ length: Math.floor(W / COL_W) }, () => ({
      y: Math.random() * -H, speed: Math.random() * 14 + 6,
    }));

    // ── Mouse tracking ────────────────────────────────────────────────
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    // ── Draw ──────────────────────────────────────────────────────────
    const draw = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.fillStyle = 'rgba(13,17,23,0.2)';
      ctx.fillRect(0, 0, W, H);

      // Matrix rain
      ctx.font = `11px "JetBrains Mono", monospace`;
      drops.forEach((d, i) => {
        ctx.fillStyle = `rgba(88,166,255,${0.03 + Math.random() * 0.025})`;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * COL_W, d.y);
        d.y += d.speed;
        if (d.y > H + 20) { d.y = Math.random() * -200; d.speed = Math.random() * 14 + 6; }
      });

      // Floating code text
      particles.forEach(p => {
        ctx.font = `${p.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(88,166,255,${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
        p.y += p.vy;
        if (p.y < -20) {
          p.y = H + 20;
          p.x = Math.random() * W;
          p.text = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        }
      });

      // Update + connect nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.022;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(88,166,255,${(1 - dist / CONNECT_DIST) * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        // Mouse lines
        const mdx = nodes[i].x - mx;
        const mdy = nodes[i].y - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(88,166,255,${(1 - md / MOUSE_DIST) * 0.65})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
        const mdx = n.x - mx, mdy = n.y - my;
        const near = Math.sqrt(mdx * mdx + mdy * mdy) < MOUSE_DIST;

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
        grad.addColorStop(0, `rgba(88,166,255,${near ? 0.3 : 0.12})`);
        grad.addColorStop(1, 'rgba(88,166,255,0)');
        ctx.beginPath(); ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();

        // Dot
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (near ? 1.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = near
          ? `rgba(88,166,255,${0.75 + pulse * 0.25})`
          : `rgba(88,166,255,${0.35 + pulse * 0.25})`;
        ctx.fill();
      });

      // Mouse cursor ring
      if (mx > 0 && mx < W && my > 0 && my < H) {
        ctx.beginPath(); ctx.arc(mx, my, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(88,166,255,0.55)'; ctx.fill();
        ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(88,166,255,0.2)'; ctx.lineWidth = 1; ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Initial clear
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    // Start on next frame so layout is settled
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  );
}
