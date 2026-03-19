import { useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './AdminLayout.css';

/* ── Inline SVG icons (16x16) ─────────────────────────── */

const icons = {
  grid: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1L1 5L8 9L15 5L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M1 8L8 12L15 8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M1 11L8 15L15 11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  plusCircle: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 5.5V10.5M5.5 8H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 14C1.5 11.5 3.5 9.5 6 9.5C8.5 9.5 10.5 11.5 10.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="11.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 9.5C13.5 9.8 14.5 11.2 14.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  dollar: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 4.5C11.5 3.12 10 2.5 8 2.5C6 2.5 4.5 3.4 4.5 5C4.5 6.6 6 7 8 7.5C10 8 11.5 8.4 11.5 10.5C11.5 12.1 10 13.5 8 13.5C6 13.5 4.5 12.5 4.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  clipboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 1.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5.5 6.5H10.5M5.5 9H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  hamburger: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

/* ── Primary nav items ────────────────────────────────── */

const primaryNav = [
  { to: '/admin',          label: 'Dashboard',    icon: icons.grid,       end: true },
  { to: '/admin/arenas',   label: 'My Arenas',    icon: icons.layers,     end: false },
  { to: '/admin/create',   label: 'Create Arena',  icon: icons.plusCircle, end: false },
  { to: '/admin/captains', label: 'Captains',      icon: icons.users,     end: false },
  { to: '/admin/revenue',  label: 'Revenue',       icon: icons.dollar,    end: false },
];

const secondaryNav = [
  { to: '/admin/ops', label: 'Ops Review', icon: icons.clipboard, end: false },
];

/* ── Component ────────────────────────────────────────── */

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggle = useCallback(() => setSidebarOpen((v) => !v), []);
  const close  = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="admin-layout">
      {/* Mobile hamburger */}
      <button
        className="admin-hamburger"
        onClick={toggle}
        aria-label="Toggle sidebar"
      >
        {icons.hamburger}
      </button>

      {/* Backdrop (mobile) */}
      <div
        className={`admin-backdrop${sidebarOpen ? ' visible' : ''}`}
        onClick={close}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div className="admin-sidebar__logo">
          <div className="admin-sidebar__logo-mark">
            FSP<span>.</span>
          </div>
          <div className="admin-sidebar__logo-sub">Admin</div>
        </div>

        {/* Primary nav */}
        <nav className="admin-sidebar__nav">
          {primaryNav.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' active' : ''}`
              }
              onClick={close}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__divider" />

        {/* Secondary nav */}
        <nav className="admin-sidebar__secondary">
          {secondaryNav.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' active' : ''}`
              }
              onClick={close}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__spacer" />

        {/* User block */}
        <div className="admin-sidebar__user">
          <div className="admin-sidebar__user-row">
            <div className="admin-sidebar__avatar">N</div>
            <div className="admin-sidebar__user-info">
              <span className="admin-sidebar__handle">@nelkboys</span>
              <span className="admin-sidebar__name">NELK Boys</span>
            </div>
          </div>
          <Link to="/arenas" className="admin-sidebar__back" onClick={close}>
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
