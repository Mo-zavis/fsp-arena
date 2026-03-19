import { useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

const links = [
  { label: 'Explore', to: '/arenas' },
  { label: 'Create', to: '/create' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className="player-nav">
      <div className="player-nav__inner">
        <Link to="/" className="player-nav__logo">
          FSP<span className="player-nav__logo-dot">.</span>
        </Link>

        <ul className={`player-nav__links${open ? ' open' : ''}`}>
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `player-nav__link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="player-nav__spacer" />

        <Link to="/admin" className="player-nav__admin">Host Panel</Link>

        {open && <div className="player-nav__overlay open" onClick={close} />}

        <button
          className="player-nav__hamburger"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="15" y1="5" x2="5" y2="15" /><line x1="5" y1="5" x2="15" y2="15" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="17" y2="6" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="14" x2="17" y2="14" /></svg>
          )}
        </button>
      </div>
    </nav>
  );
}
