import { Link } from 'react-router-dom';
import { adminArenas, adminStats } from '../../data/mockData';
import './AdminDashboard.css';

function formatCurrency(value) {
  if (value >= 1_000_000) {
    return '$' + (value / 1_000_000).toFixed(2) + 'M';
  }
  if (value >= 1_000) {
    return '$' + (value / 1_000).toFixed(0) + 'K';
  }
  return '$' + value;
}

function formatNumber(value) {
  return value.toLocaleString('en-US');
}

function statusLabel(status) {
  switch (status) {
    case 'active':
      return 'Active';
    case 'review':
      return 'In Review';
    case 'draft':
      return 'Draft';
    case 'ended':
      return 'Ended';
    default:
      return status;
  }
}

function AdminDashboard() {
  const kpis = [
    {
      value: formatNumber(adminStats.totalParticipants),
      label: 'Players',
    },
    {
      value: formatNumber(adminStats.totalCaptains),
      label: 'Captains',
    },
    {
      value: formatCurrency(adminStats.totalRevenue),
      label: 'Revenue',
      blue: true,
    },
    {
      value: adminStats.activeArenas,
      label: 'Active Arenas',
    },
  ];

  return (
    <div className="admin-dash">
      {/* Header */}
      <div className="admin-dash__header">
        <div>
          <h1 className="admin-dash__title">Dashboard</h1>
          <p className="admin-dash__subtitle">Welcome back, NELK Boys</p>
        </div>
        <Link to="/admin/create" className="admin-dash__create-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Create Arena
        </Link>
      </div>

      {/* KPI cards */}
      <div className="admin-dash__kpis">
        {kpis.map((kpi) => (
          <div className="admin-dash__kpi" key={kpi.label}>
            <span
              className={
                'admin-dash__kpi-value' +
                (kpi.blue ? ' admin-dash__kpi-value--blue' : '')
              }
            >
              {kpi.value}
            </span>
            <span className="admin-dash__kpi-label">{kpi.label}</span>
          </div>
        ))}
      </div>

      {/* My Arenas */}
      <h2 className="admin-dash__kicker">My Arenas</h2>
      <div className="admin-dash__arenas">
        {adminArenas.map((arena) => (
          <div className="admin-dash__arena" key={arena.id}>
            <div
              className="admin-dash__arena-gradient"
              style={{ background: arena.coverGradient }}
            />
            <div className="admin-dash__arena-body">
              <div className="admin-dash__arena-top">
                <span className="admin-dash__arena-name">{arena.name}</span>
                <span className="admin-dash__arena-sport">{arena.sport}</span>
                <span
                  className={
                    'admin-dash__status admin-dash__status--' + arena.status
                  }
                >
                  {statusLabel(arena.status)}
                </span>
              </div>

              <div className="admin-dash__arena-stats">
                <span>
                  {formatNumber(arena.totalParticipants)} players
                </span>
                <span className="sep">|</span>
                <span>{formatNumber(arena.totalCaptains)} captains</span>
                <span className="sep">|</span>
                <span>{arena.daysLeft}d left</span>
              </div>

              <div className="admin-dash__arena-revenue">
                Revenue: {formatCurrency(arena.totalRevenue)}
              </div>

              <div className="admin-dash__arena-footer">
                <Link
                  to={'/admin/arenas/' + arena.id}
                  className="admin-dash__manage-link"
                >
                  Manage
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4.5 2.5L8 6l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="admin-dash__kicker">Quick Actions</h2>
      <div className="admin-dash__actions">
        <Link to="/admin/create" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="admin-dash__action-label">Create New Arena</span>
        </Link>

        <Link to="/admin/payouts" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 8h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="admin-dash__action-label">View Payouts</span>
        </Link>

        <Link to="/admin/seasons" className="admin-dash__action">
          <span className="admin-dash__action-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 5.5V9l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="admin-dash__action-label">Season Settings</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
