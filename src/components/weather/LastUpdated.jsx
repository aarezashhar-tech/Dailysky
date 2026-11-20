import { RefreshCw } from 'lucide-react';

export function LastUpdated({ dataUpdatedAt, onRefresh, isFetching }) {
  if (!dataUpdatedAt) return null;

  const timeString = new Date(dataUpdatedAt).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
      }}
    >
      <span>Updated {timeString}</span>
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={isFetching}
          title="Refresh weather"
          style={{
            border: 'none',
            background: 'transparent',
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            padding: '2px',
          }}
        >
          <RefreshCw size={14} />
        </button>
      )}
    </div>
  );
}