import { Compass } from 'lucide-react';
import { Card } from './Card';

export function EmptyState({ title = 'No location selected', description = 'Search for a city or use your current location.' }) {
  return (
    <Card>
      <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
        <Compass size={40} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
        <h3 style={{ margin: '0 0 0.4rem' }}>{title}</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </Card>
  );
}