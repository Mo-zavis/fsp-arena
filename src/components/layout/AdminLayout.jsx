import { useState, useCallback } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

/* ── Inline SVG icons (14×14) ─────────────────────────── */
const I = {
  grid: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  layers: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 5L8 9L15 5L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M1 8L8 12L15 8" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M1 11L8 15L15 11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5.5V10.5M5.5 8H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  users: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 14C1.5 11.5 3.5 9.5 6 9.5C8.5 9.5 10.5 11.5 10.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="11.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M12 9.5C13.5 9.8 14.5 11.2 14.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  dollar: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11.5 4.5C11.5 3.12 10 2.5 8 2.5C6 2.5 4.5 3.4 4.5 5C4.5 6.6 6 7 8 7.5C10 8 11.5 8.4 11.5 10.5C11.5 12.1 10 13.5 8 13.5C6 13.5 4.5 12.5 4.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  link: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6.5 9.5L9.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M8.5 10.5L7 12C5.9 13.1 4.1 13.1 3 12C1.9 10.9 1.9 9.1 3 8L4.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M7.5 5.5L9 4C10.1 2.9 11.9 2.9 13 4C14.1 5.1 14.1 6.9 13 8L11.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  clipboard: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6 1.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M5.5 6.5H10.5M5.5 9H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  back: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  menu: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  chevron: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const NAV = [
  { to: '/admin',        label: 'Dashboard',         icon: I.grid,   end: true },
  { to: '/admin/arenas',  label: 'My Arenas',         icon: I.layers, end: true },
  { to: '/admin/create',  label: 'Create Arena',      icon: I.plus,   end: false },
];

const NAV_SECONDARY = [
  { to: '/admin/arenas/nelk/referrals', label: 'Affiliate Manager', icon: I.link, end: false },
  { to: '/admin/ops',     label: 'Ops Review',        icon: I.clipboard, end: false },
];

const PAGE_META = {
  '/admin':         { title: 'Dashboard',         sub: 'Overview' },
  '/admin/arenas':  { title: 'My Arenas',         sub: 'All Arenas' },
  '/admin/create':  { title: 'Create Arena',      sub: 'New Arena' },
  '/admin/ops':     { title: 'Ops Review',        sub: 'Pending Approvals' },
};

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggle = useCallback(() => setSidebarOpen(v => !v), []);
  const close = useCallback(() => setSidebarOpen(false), []);

  // Resolve page meta
  const meta = PAGE_META[location.pathname] || { title: 'Arena Manager', sub: '' };
  if (location.pathname.includes('/referrals')) {
    meta.title = 'Affiliate Manager';
    meta.sub = 'Links & Performance';
  } else if (location.pathname.match(/\/admin\/arenas\/\w+$/)) {
    meta.title = 'Arena Manager';
    meta.sub = 'Manage Arena';
  }

  return (
    <div className="admin-shell">
      {/* Mobile hamburger */}
      <button className="admin-hamburger" onClick={toggle} aria-label="Toggle sidebar">
        {I.menu}
      </button>

      {/* Backdrop */}
      <div className={`admin-backdrop${sidebarOpen ? ' visible' : ''}`} onClick={close} />

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`}>
        {/* Brand */}
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__brand-icon">FSP</div>
          <div>
            <div className="admin-sidebar__brand-name">FSP Arena</div>
            <div className="admin-sidebar__brand-sub">Host Platform</div>
          </div>
        </div>

        {/* Arena selector */}
        <div className="admin-sidebar__client">
          <div className="admin-sidebar__client-dot" />
          <div>
            <div className="admin-sidebar__client-name">NELK Boys Arena</div>
            <div className="admin-sidebar__client-sub">Active · Season 1</div>
          </div>
          {I.chevron}
        </div>

        {/* Nav */}
        <nav className="admin-sidebar__nav">
          <div className="admin-sidebar__nav-section">
            <div className="admin-sidebar__nav-label">Main</div>
            {NAV.map(({ to, label, icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `admin-sidebar__link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>

          <div className="admin-sidebar__nav-section">
            <div className="admin-sidebar__nav-label">Tools</div>
            {NAV_SECONDARY.map(({ to, label, icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `admin-sidebar__link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="admin-sidebar__footer">
          <Link to="/arenas" className="admin-sidebar__back-link" onClick={close}>
            {I.back}
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="admin-main-area">
        {/* Top header */}
        <header className="admin-top-header">
          <div className="admin-header-icon">
            {I.grid}
          </div>
          <span className="admin-header-title">
            NELK Boys
            <span className="admin-header-sub"> · {meta.title}</span>
          </span>
          <div className="admin-header-spacer" />
          <div className="admin-header-status">
            <div className="admin-header-status-dot" />
            LIVE
          </div>
        </header>

        {/* Page content */}
        <div className="admin-page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
