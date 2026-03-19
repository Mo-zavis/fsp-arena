import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useArenas } from '../../ArenaContext';
import './ExplorePage.css';

const FILTERS = ['All', 'Trending', 'Beer Pong', 'Squash', 'Bowling'];

export default function ExplorePage() {
  const { arenas } = useArenas();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = arenas;
    if (activeFilter === 'Trending') list = list.filter(a => a.trending);
    else if (activeFilter !== 'All') list = list.filter(a => a.sport === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q) || a.sport.toLowerCase().includes(q));
    }
    return list;
  }, [search, activeFilter]);

  return (
    <div className="player-page">
      <div className="explore">
        <div className="explore__header">
          <div className="explore__title">Explore Arenas</div>
          <div className="explore__search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input className="explore__search-input" type="text" placeholder="Search arenas..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="explore__filters">
          {FILTERS.map(f => (
            <button key={f} className={`explore__chip${activeFilter === f ? ' explore__chip--active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 && <p className="explore__empty">No arenas match your search.</p>}

        <div className="explore__grid">
          {filtered.map(arena => (
            <Link to={`/arenas/${arena.id}`} key={arena.id} style={{ textDecoration: 'none' }}>
              <div className="arena-card">
                <div className="arena-card__cover" style={{ background: arena.coverGradient }}>
                  {arena.badge && <span className="arena-card__badge">{arena.badge}</span>}
                </div>
                <div className="arena-card__body">
                  <div className="arena-card__name">{arena.name}</div>
                  <div className="arena-card__sport">{arena.sport}</div>
                  <div className="arena-card__meta">
                    <span>{arena.joined} joined</span>
                    <span className="arena-card__dot" />
                    <span>{arena.daysLeft} days left</span>
                  </div>
                  <div className="arena-card__footer">
                    <span className="arena-card__fee">${arena.entryFee}</span>
                    <span className="arena-card__btn">VIEW</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
