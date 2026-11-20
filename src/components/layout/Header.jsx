import { CloudSun } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { UnitToggle } from './UnitToggle';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export function Header() {
  return (
    <header className="ds-header">
      <div className="ds-brand">
        <div className="ds-brand-badge">
          <CloudSun size={22} />
        </div>
        <span>DailySky</span>
      </div>

      <SearchBar />

      <div className="ds-controls">
        <UnitToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}