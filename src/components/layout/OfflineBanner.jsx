import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        background: '#b45309',
        color: '#fff',
        padding: '0.5rem 1rem',
        fontSize: '0.85rem',
        fontWeight: 500,
      }}
    >
      <WifiOff size={15} />
      <span>You are offline. Displaying cached weather data.</span>
    </div>
  );
}