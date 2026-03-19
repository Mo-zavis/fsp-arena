import { useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

const links = [
  { label: 'Explore', to: '/explore' },
  { label: 'Create', to: '/create' },
  { label: 'Dashboard', to: '/dashboard' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          FSP<span className="nav-logo-dot">.</span>
        </Link>

        <ul className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                onClick={close}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {open && <div className="nav-overlay open" onClick={close} />}

        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
