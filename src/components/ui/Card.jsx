import { useRef } from 'react';
import './Card.css';

export function Card({ title, icon: Icon, action, className = '', children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`ds-card ${className}`}
    >
      <div className="ds-card-glow" aria-hidden="true" />
      <div className="ds-card-content">
        {(title || action) && (
          <div className="ds-card-header">
            {title && (
              <h2 className="ds-card-title">
                {Icon && <Icon size={16} />}
                <span>{title}</span>
              </h2>
            )}
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}