import { Wind } from 'lucide-react';
import { Card } from '../ui/Card';
import { useAirQuality } from '../../hooks/useAirQuality';

export function AirQuality({ airData }) {
  const aq = useAirQuality(airData);
  if (!aq) return null;

  return (
    <Card title="Air Quality Index" icon={Wind}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: aq.color,
              boxShadow: `0 0 10px ${aq.color}`,
            }}
          />
          <strong style={{ fontSize: '1.15rem' }}>{aq.label}</strong>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(Level {aq.aqi}/5)</span>
        </div>
      </div>

      <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
        {aq.advice}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
        {[
          { label: 'PM2.5', val: aq.pm2_5 },
          { label: 'PM10', val: aq.pm10 },
          { label: 'O₃', val: aq.o3 },
          { label: 'NO₂', val: aq.no2 },
        ].map((p) => (
          <div
            key={p.label}
            className="wd-item"
            style={{ padding: '0.55rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.label}</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.15rem' }}>{p.val}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}