import { useState, useRef, useEffect } from 'react';
import { Search, LocateFixed, Clock, MapPin, Loader2 } from 'lucide-react';
import { useCitySearch } from '../../hooks/useCitySearch';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useSettings } from '../../context/SettingsContext';
import './SearchBar.css';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const { selectCity, recentCities } = useSettings();
  const { data: results = [], isFetching } = useCitySearch(query);
  const { locate, locating, geoError, clearGeoError } = useGeolocation();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        clearGeoError();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [clearGeoError]);

  const handleSelect = (city) => {
    selectCity(city);
    setQuery('');
    setOpen(false);
  };

  return (
    <div className="ds-search-wrap" ref={wrapRef}>
      <div className="ds-search-box">
        <Search size={17} style={{ color: 'var(--text-muted)' }} />
        <input
          className="ds-search-input"
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search city (e.g., Tokyo, New York)..."
          aria-label="Search city"
        />
        <button
          type="button"
          className="ds-locate-btn"
          title="Use current location"
          onClick={() => locate((city) => handleSelect(city))}
          disabled={locating}
        >
          {locating ? <Loader2 size={16} className="spin" /> : <LocateFixed size={16} />}
        </button>
      </div>

      {geoError && <div className="ds-geo-error">{geoError}</div>}

      {open && (
        <div className="ds-dropdown">
          {query.trim().length >= 2 ? (
            <>
              <div className="ds-dropdown-section">
                {isFetching ? 'Searching...' : 'Search Results'}
              </div>
              {!isFetching && results.length === 0 && (
                <div style={{ padding: '0.75rem 0.85rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                  No matching cities found.
                </div>
              )}
              {results.map((item, idx) => (
                <button
                  key={`${item.lat}-${item.lon}-${idx}`}
                  type="button"
                  className="ds-dropdown-item"
                  onClick={() =>
                    handleSelect({
                      name: item.name,
                      state: item.state,
                      country: item.country,
                      lat: item.lat,
                      lon: item.lon,
                    })
                  }
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <MapPin size={14} style={{ color: 'var(--accent)' }} />
                    {item.name}
                    {item.state ? `, ${item.state}` : ''}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.country}</span>
                </button>
              ))}
            </>
          ) : (
            recentCities.length > 0 && (
              <>
                <div className="ds-dropdown-section">Recent Locations</div>
                {recentCities.map((city, idx) => (
                  <button
                    key={`${city.lat}-${city.lon}-${idx}`}
                    type="button"
                    className="ds-dropdown-item"
                    onClick={() => handleSelect(city)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                      {city.name}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{city.country}</span>
                  </button>
                ))}
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}