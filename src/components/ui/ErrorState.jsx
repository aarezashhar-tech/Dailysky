import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Card } from './Card';

export function ErrorState({ message, onRetry }) {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <AlertTriangle size={36} style={{ color: '#f59e0b', marginBottom: '0.75rem' }} />
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>Something went wrong</h3>
        <p style={{ margin: '0 0 1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            <RotateCcw size={16} />
            Try Again
          </button>
        )}
      </div>
    </Card>
  );
}