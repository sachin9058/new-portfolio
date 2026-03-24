import React, { useState, useRef, useEffect } from 'react';
import { Send, Link2, AtSign, Mail } from 'lucide-react';
import './Contact.css';

const STEPS = [
  { field: 'name', prompt: '$ Enter your name:', type: 'text', placeholder: 'Your name' },
  { field: 'email', prompt: '$ Enter your email:', type: 'email', placeholder: 'you@example.com' },
  { field: 'subject', prompt: '$ Enter subject:', type: 'text', placeholder: 'What is this about?' },
  { field: 'message', prompt: '$ Type your message:', type: 'textarea', placeholder: 'Write your message...' },
];

const socials = [
  { icon: Link2, label: 'GitHub', url: 'https://github.com/sachin9058', handle: '@sachin9058' },
  { icon: Link2, label: 'LinkedIn', url: 'https://www.linkedin.com/in/sachin-kumar-iitv24/', handle: '/in/sachin-kumar-iitv24' },
  { icon: Mail, label: 'Email', url: 'mailto:sachinkumar905846@gmail.com', handle: 'sachinkumar905846@gmail.com' },
];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [current, setCurrent] = useState('');
  const [sent, setSent] = useState(false);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, [step]);

  const handleSubmitStep = (e) => {
    e?.preventDefault();
    if (!current.trim()) return;
    const field = STEPS[step].field;
    const newValues = { ...values, [field]: current };
    setValues(newValues);
    setHistory(h => [...h, { prompt: STEPS[step].prompt, value: current }]);
    setCurrent('');
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setSent(true);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && STEPS[step].type !== 'textarea') handleSubmitStep();
  };

  return (
    <div className="contact-container">
      <div className="contact-terminal">
        <div className="ct-header mono">
          <span className="text-muted">contact.sh</span>
          <span className="badge green">connected</span>
        </div>

        <div className="ct-body">
          <div className="ct-intro mono text-muted">
            <div>#!/bin/bash</div>
            <div># Contact script — fill in the prompts below</div>
            <div>&nbsp;</div>
          </div>

          {/* History */}
          {history.map((h, i) => (
            <div key={i} className="ct-history-item">
              <div className="ct-prompt mono text-muted">{h.prompt}</div>
              <div className="ct-answer mono text-accent">{'> '}{h.value}</div>
            </div>
          ))}

          {/* Current step */}
          {!sent ? (
            <div className="ct-current">
              <div className="ct-prompt mono">{STEPS[step].prompt}</div>
              {STEPS[step].type === 'textarea' ? (
                <div className="ct-input-row">
                  <span className="mono text-muted">{'> '}</span>
                  <textarea
                    ref={inputRef}
                    className="ct-input ct-textarea mono"
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    placeholder={STEPS[step].placeholder}
                    rows={3}
                  />
                  <button className="ct-send-btn" onClick={handleSubmitStep}><Send size={14} /></button>
                </div>
              ) : (
                <div className="ct-input-row">
                  <span className="mono text-muted">{'> '}</span>
                  <input
                    ref={inputRef}
                    className="ct-input mono"
                    type={STEPS[step].type}
                    value={current}
                    onChange={e => setCurrent(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={STEPS[step].placeholder}
                  />
                  <button className="ct-send-btn" onClick={handleSubmitStep}><Send size={14} /></button>
                </div>
              )}
              <div className="ct-progress">
                {STEPS.map((_, i) => (
                  <div key={i} className={`ct-progress-dot ${i < step ? 'done' : i === step ? 'active' : ''}`} />
                ))}
              </div>
            </div>
          ) : (
            <div className="ct-success mono">
              <div className="text-green">[  OK  ] Message queued for delivery</div>
              <div className="text-green">[  OK  ] Mail sent to:sachinkumar905846@gmail.com</div>
              <div className="text-muted" style={{ marginTop: 8 }}># Thank you, {values.name}! I'll get back to you soon.</div>
              <button className="btn" style={{ marginTop: 16 }} onClick={() => { setSent(false); setStep(0); setValues({}); setHistory([]); setCurrent(''); }}>
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="contact-socials">
        <div className="socials-header mono text-muted">// find me elsewhere</div>
        {socials.map(s => {
          const Icon = s.icon;
          return (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-item">
              <div className="social-icon"><Icon size={16} /></div>
              <div>
                <div className="social-label">{s.label}</div>
                <div className="social-handle mono text-muted">{s.handle}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
