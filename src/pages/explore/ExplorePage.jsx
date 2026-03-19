import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { arenas } from '../../data/mockData';
import './ExplorePage.css';

const FILTERS = ['All', 'Trending', 'Beer Pong', 'Squash', 'Bowling'];

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = arenas;

    if (activeFilter === 'Trending') {
      list = list.filter((a) => a.trending);
    } else if (activeFilter !== 'All') {
      list = list.filter((a) => a.sport === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.sport.toLowerCase().includes(q),
      );
    }

    return list;
  }, [search, activeFilter]);

  return (
    <div className="explore-page">
      <div className="explore-container">
        <h1 className="explore-title">Explore Arenas</h1>

        <div className="explore-search">
          <svg
            className="explore-search__icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="explore-search__input"
            type="text"
            placeholder="Search arenas by name or sport..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="explore-filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`explore-chip ${activeFilter === f ? 'explore-chip--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="explore-empty">No arenas match your search.</p>
        )}

        <div className="explore-grid">
          {filtered.map((arena) => (
            <div className="arena-card" key={arena.id}>
              <div
                className="arena-card__cover"
                style={{ background: arena.coverGradient }}
              >
                {arena.badge && (
                  <span className="arena-card__badge">{arena.badge}</span>
                )}
              </div>

              <div className="arena-card__body">
                <h3 className="arena-card__name">{arena.name}</h3>
                <span className="arena-card__sport">{arena.sport}</span>

                <div className="arena-card__meta">
                  <span className="arena-card__stat">
                    {arena.joined} joined
                  </span>
                  <span className="arena-card__dot" />
                  <span className="arena-card__stat">
                    {arena.daysLeft} days left
                  </span>
                </div>

                <div className="arena-card__footer">
                  <span className="arena-card__fee">
                    ${arena.entryFee}
                  </span>
                  <Link to={`/arenas/${arena.id}`} className="arena-card__btn">
                    VIEW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
