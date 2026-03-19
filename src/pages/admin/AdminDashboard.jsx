import { Link } from 'react-router-dom';
import { adminArenas, adminStats } from '../../data/mockData';
import './AdminDashboard.css';

function fmt(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(0) + 'K';
  return '$' + n;
}

function num(n) { return n.toLocaleString('en-US'); }

function statusLabel(s) {
  return { active: 'Active', review: 'In Review', draft: 'Draft', ended: 'Ended' }[s] || s;
}

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="admin-dash__header">
        <div>
          <div className="admin-dash__title">Dashboard</div>
          <div className="admin-dash__subtitle">Welcome back, NELK Boys</div>
        </div>
        <Link to="/admin/create" className="btn-primary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Create Arena
        </Link>
      </div>

      {/* KPI Row */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-label">Players</div>
          <div className="kpi-value">{num(adminStats.totalParticipants)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Captains</div>
          <div className="kpi-value">{num(adminStats.totalCaptains)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Revenue</div>
          <div className="kpi-value blue">{fmt(adminStats.totalRevenue)}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Arenas</div>
          <div className="kpi-value">{adminStats.activeArenas}</div>
        </div>
      </div>

      {/* Arena List */}
      <div className="section-title">My Arenas</div>
      <div className="card admin-dash__arenas">
        <table className="admin-dash__arena-table">
          <thead>
            <tr>
              <th>Arena</th>
              <th>Sport</th>
              <th>Status</th>
              <th>Players</th>
              <th>Revenue</th>
              <th>Days Left</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {adminArenas.map(a => (
              <tr key={a.id} onClick={() => window.location.href = `/admin/arenas/${a.id}`}>
                <td>
                  <div className="arena-row__name">
                    <div className="arena-row__color" style={{ background: a.coverGradient }} />
                    {a.name}
                  </div>
                </td>
                <td><span className="arena-row__sport">{a.sport}</span></td>
                <td><span className={`status-pill ${a.status}`}>{statusLabel(a.status)}</span></td>
                <td className="arena-row__mono">{num(a.totalParticipants)}</td>
                <td className="arena-row__mono">{fmt(a.totalRevenue)}</td>
                <td>{a.daysLeft}d</td>
                <td>
                  <Link to={`/admin/arenas/${a.id}`} className="arena-row__manage" onClick={e => e.stopPropagation()}>
                    Manage →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="section-title">Quick Actions</div>
      <div className="admin-dash__actions">
        <Link to="/admin/create" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="admin-dash__action-label">Create New Arena</span>
        </Link>
        <Link to="/admin/arenas/nelk/referrals" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 8.5L9 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M7 9.5L5.5 11C4.7 11.8 3.3 11.8 2.5 11C1.7 10.2 1.7 8.8 2.5 8L4 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M7 4.5L8.5 3C9.3 2.2 10.7 2.2 11.5 3C12.3 3.8 12.3 5.2 11.5 6L10 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="admin-dash__action-label">Affiliate Manager</span>
        </Link>
        <Link to="/admin/ops" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M5 1V2.5M9 1V2.5M4.5 5.5H9.5M4.5 8H7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
          <span className="admin-dash__action-label">Ops Review</span>
        </Link>
      </div>
    </>
  );
}
