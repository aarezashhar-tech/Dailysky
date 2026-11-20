import { Sun, Moon } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export function ThemeToggle() {
  const { themeMode, toggleThemeMode } = useSettings();
  return (
    <button
      type="button"
      className="ds-icon-btn"
      onClick={toggleThemeMode}
      aria-label="Toggle color theme"
      title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}