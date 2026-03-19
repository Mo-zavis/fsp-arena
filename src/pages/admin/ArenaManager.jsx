import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  adminArenas,
  captainLeaderboard,
  captainTierSummary,
  payoutHistory,
  seasonEvents,
  revenueTimeline,
} from '../../data/mockData';
import './ArenaManager.css';

const TABS = ['Overview', 'Captains', 'Revenue', 'Season', 'Settings'];

const STATUS_COLORS = {
  active: { bg: '#dcfce7', color: '#16a34a' },
  review: { bg: '#fef3c7', color: '#92400e' },
  draft: { bg: '#f1f5f9', color: '#475569' },
  ended: { bg: '#fee2e2', color: '#dc2626' },
};

const ACTIVITY_FEED = [
  { text: '@new_player joined Beer Pong', time: '2 min ago', type: 'join' },
  { text: '@squad_leader reached 30 members - Captain!', time: '1 hour ago', type: 'captain' },
  { text: 'Monthly payout cycle completed', time: '1 day ago', type: 'payout' },
  { text: '@player_x referred 5 new members', time: '2 days ago', type: 'join' },
  { text: 'Arena approved by ops team', time: '5 days ago', type: 'captain' },
];

const ACTIVITY_DOT_CLASS = {
  join: 'am-activity-dot--blue',
  captain: 'am-activity-dot--green',
  payout: 'am-activity-dot--gold',
};

function formatCurrency(n) {
  return '$' + n.toLocaleString();
}

/* ─── Tab: Overview ─── */
function OverviewTab({ arena }) {
  const fillPct = Math.round((arena.premierFilled / arena.premierCap) * 100);

  return (
    <div>
      <div className="am-kpi-grid">
        <div className="am-kpi-card">
          <div className="am-kpi-label">Total Players</div>
          <div className="am-kpi-value">{arena.totalParticipants.toLocaleString()}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Captains</div>
          <div className="am-kpi-value">{arena.totalCaptains}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Monthly Revenue</div>
          <div className="am-kpi-value">{formatCurrency(arena.monthlyRevenue)}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Premier Fill Rate</div>
          <div className="am-kpi-value">{arena.premierFilled}/{arena.premierCap}</div>
          <div className="am-fill-track">
            <div className="am-fill-bar" style={{ width: `${fillPct}%` }} />
          </div>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Division Breakdown</div>
        <div className="am-division-row">
          <div className="am-division-label">Premier</div>
          <div className="am-division-bar-wrap">
            <div className="am-division-bar-track">
              <div
                className="am-division-bar-fill"
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <div className="am-division-bar-text">
              {arena.premierFilled}/{arena.premierCap} ({fillPct}%)
            </div>
          </div>
        </div>
        <div className="am-division-row">
          <div className="am-division-label">Challenger</div>
          <div className="am-division-bar-wrap">
            <div className="am-division-count">{arena.challengerCount.toLocaleString()}</div>
            <div className="am-division-sub">Open capacity</div>
          </div>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Recent Activity</div>
        {ACTIVITY_FEED.map((item, i) => (
          <div key={i} className="am-activity-row">
            <span className={`am-activity-dot ${ACTIVITY_DOT_CLASS[item.type]}`} />
            <span className="am-activity-text">{item.text}</span>
            <span className="am-activity-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab: Captains ─── */
function CaptainsTab({ arena }) {
  const [divFilter, setDivFilter] = useState('All');

  const filtered = divFilter === 'All'
    ? captainLeaderboard
    : captainLeaderboard.filter((r) => r.division === divFilter);

  return (
    <div>
      <div className="am-tier-grid">
        {captainTierSummary.map((t) => {
          const isPremier = t.tier.startsWith('Premier');
          return (
            <div
              key={t.tier}
              className={`am-tier-card ${isPremier ? 'am-tier-card--premier' : 'am-tier-card--challenger'}`}
            >
              <div className="am-tier-card-name">{t.tier}</div>
              <div className="am-tier-card-row">
                <span className="am-tier-card-label">Captains</span>
                <span className="am-tier-card-val">{t.count}</span>
              </div>
              <div className="am-tier-card-row">
                <span className="am-tier-card-label">Pool Share</span>
                <span className="am-tier-card-val">{formatCurrency(t.poolShare)}</span>
              </div>
              <div className="am-tier-card-row">
                <span className="am-tier-card-label">Avg Payout</span>
                <span className="am-tier-card-val">{formatCurrency(t.avgPayout)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="am-card">
        <div className="am-card-title">Captain Leaderboard</div>
        <div className="am-filter-row">
          <label className="am-filter-label">Division</label>
          <select
            className="am-select"
            value={divFilter}
            onChange={(e) => setDivFilter(e.target.value)}
          >
            <option>All</option>
            <option>Premier</option>
            <option>Challenger</option>
          </select>
        </div>
        <div className="am-table-wrap">
          <table className="am-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Captain</th>
                <th>Squad</th>
                <th>NCS</th>
                <th>Tier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.rank} className={r.rank === 1 ? 'am-row--top' : ''}>
                  <td>{r.rank}</td>
                  <td className="am-cell-bold">{r.handle}</td>
                  <td>{r.squad}</td>
                  <td>{r.ncs.toLocaleString()}</td>
                  <td>
                    <span className={`am-tier-badge am-tier-badge--${r.tier.toLowerCase()}`}>
                      {r.tier}
                    </span>
                  </td>
                  <td>
                    <span className="am-view-link">View</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="am-note">
          Tier positions update automatically each monthly cycle based on NCS rankings.
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Revenue ─── */
function RevenueTab({ arena }) {
  const maxRev = Math.max(...revenueTimeline.map((r) => r.revenue));

  return (
    <div>
      <div className="am-kpi-grid">
        <div className="am-kpi-card">
          <div className="am-kpi-label">Total Revenue</div>
          <div className="am-kpi-value">{formatCurrency(arena.totalRevenue)}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Host Share</div>
          <div className="am-kpi-value">{formatCurrency(arena.hostShare)}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Captain Pool</div>
          <div className="am-kpi-value">{formatCurrency(arena.captainPool)}</div>
        </div>
        <div className="am-kpi-card">
          <div className="am-kpi-label">Platform Fee</div>
          <div className="am-kpi-value">{formatCurrency(arena.platformFee)}</div>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Revenue Timeline</div>
        <div className="am-chart">
          {revenueTimeline.map((r) => {
            const heightPct = maxRev > 0 ? (r.revenue / maxRev) * 100 : 0;
            return (
              <div key={r.month} className="am-chart-col">
                <div className="am-chart-val">{r.revenue > 0 ? formatCurrency(r.revenue) : '$0'}</div>
                <div className="am-chart-bar-wrap">
                  <div
                    className="am-chart-bar"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <div className="am-chart-label">{r.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Payout History</div>
        <div className="am-table-wrap">
          <table className="am-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Tier</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((p) => (
                <tr key={p.month}>
                  <td className="am-cell-bold">{p.month}</td>
                  <td>{p.tier}</td>
                  <td>{formatCurrency(p.amount)}</td>
                  <td>
                    <span className="am-status-paid">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Revenue Split</div>
        <div className="am-split-bar">
          <div
            className="am-split-segment am-split-segment--host"
            style={{ width: `${arena.splits.host}%` }}
          >
            <span className="am-split-label">Host {arena.splits.host}%</span>
            <span className="am-split-amount">{formatCurrency(arena.hostShare)}</span>
          </div>
          <div
            className="am-split-segment am-split-segment--captain"
            style={{ width: `${arena.splits.captainPool}%` }}
          >
            <span className="am-split-label">Captain {arena.splits.captainPool}%</span>
            <span className="am-split-amount">{formatCurrency(arena.captainPool)}</span>
          </div>
          <div
            className="am-split-segment am-split-segment--platform"
            style={{ width: `${arena.splits.platform}%` }}
          >
            <span className="am-split-label">Platform {arena.splits.platform}%</span>
            <span className="am-split-amount">{formatCurrency(arena.platformFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Season ─── */
function SeasonTab({ arena }) {
  const today = new Date('2026-03-19');
  const [confirmFlush, setConfirmFlush] = useState(false);

  const getEventStatus = (dateStr) => {
    const d = new Date(dateStr);
    if (d < today) return 'past';
    if (d.toDateString() === today.toDateString()) return 'current';
    return 'future';
  };

  return (
    <div>
      <div className="am-card">
        <div className="am-card-title">Season Status</div>
        <div className="am-season-status-grid">
          <div>
            <div className="am-season-status-label">Current Phase</div>
            <div className="am-season-status-value">Active</div>
          </div>
          <div>
            <div className="am-season-status-label">Days Remaining</div>
            <div className="am-season-status-value">{arena.daysLeft}</div>
          </div>
          <div>
            <div className="am-season-status-label">Next Event</div>
            <div className="am-season-status-value">
              {seasonEvents.find((e) => new Date(e.date) >= today)?.event || 'None'}
            </div>
          </div>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Season Timeline</div>
        <div className="am-timeline">
          {seasonEvents.map((evt, i) => {
            const status = getEventStatus(evt.date);
            return (
              <div key={i} className="am-timeline-item">
                <div className="am-timeline-date">
                  {new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="am-timeline-track">
                  <span className={`am-timeline-dot am-timeline-dot--${status}`} />
                  {i < seasonEvents.length - 1 && <span className="am-timeline-line" />}
                </div>
                <div className="am-timeline-content">
                  <span className="am-timeline-event">{evt.event}</span>
                  <span className={`am-timeline-type am-timeline-type--${evt.type}`}>{evt.type}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="am-card-title">Season Controls</div>
      <div className="am-controls-grid">
        <div className="am-control-card">
          <div className="am-control-title">Start Payout Cycle</div>
          <div className="am-control-desc">Triggers monthly NCS calculation and distributes payouts to all captains based on current standings.</div>
          <button className="am-btn am-btn--primary">Start Payout Cycle</button>
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Preview Flush</div>
          <div className="am-control-desc">Shows pre-flush standings and simulates the season reset without executing it.</div>
          <button className="am-btn am-btn--outline">Preview Flush</button>
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Execute Flush</div>
          <div className="am-control-desc">Performs the season reset, finalizes rankings, and triggers the Golden Ticket draw. This action is irreversible.</div>
          {!confirmFlush ? (
            <button className="am-btn am-btn--danger" onClick={() => setConfirmFlush(true)}>
              Execute Flush
            </button>
          ) : (
            <div className="am-confirm-row">
              <button className="am-btn am-btn--danger" onClick={() => setConfirmFlush(false)}>
                Confirm Flush
              </button>
              <button className="am-btn am-btn--outline" onClick={() => setConfirmFlush(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Archive Season</div>
          <div className="am-control-desc">Archives the current season data and prepares the arena for a new season cycle.</div>
          <button className="am-btn am-btn--gray">Archive Season</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Settings ─── */
function SettingsTab({ arena }) {
  return (
    <div>
      <div className="am-card">
        <div className="am-card-title">Arena Details</div>
        <div className="am-field">
          <label className="am-field-label">Arena Name</label>
          <div className="am-field-row">
            <input className="am-input" value={arena.name} disabled />
            <span className="am-edit-link">Edit</span>
          </div>
        </div>
        <div className="am-field">
          <label className="am-field-label">Description</label>
          <div className="am-field-row">
            <input className="am-input" value="The ultimate competitive experience." disabled />
            <span className="am-edit-link">Edit</span>
          </div>
        </div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Entry Fee</div>
        <div className="am-setting-value">${arena.entryFee}/month</div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Revenue Splits</div>
        <div className="am-split-bar am-split-bar--settings">
          <div
            className="am-split-segment am-split-segment--host"
            style={{ width: `${arena.splits.host}%` }}
          >
            <span className="am-split-label">Host {arena.splits.host}%</span>
          </div>
          <div
            className="am-split-segment am-split-segment--captain"
            style={{ width: `${arena.splits.captainPool}%` }}
          >
            <span className="am-split-label">{arena.splits.captainPool}%</span>
          </div>
          <div
            className="am-split-segment am-split-segment--platform"
            style={{ width: `${arena.splits.platform}%` }}
          >
            <span className="am-split-label">Platform {arena.splits.platform}%</span>
          </div>
        </div>
        <div className="am-note">Contact support to change revenue splits.</div>
      </div>

      <div className="am-card">
        <div className="am-card-title">Division Config</div>
        <div className="am-setting-row">
          <span className="am-setting-label">Premier Cap</span>
          <span className="am-setting-value">{arena.premierCap}</span>
        </div>
        <div className="am-setting-row">
          <span className="am-setting-label">Challenger</span>
          <span className="am-setting-value">Open</span>
        </div>
      </div>

      <div className="am-card am-card--danger">
        <div className="am-card-title am-card-title--danger">Danger Zone</div>
        <div className="am-danger-actions">
          <div className="am-danger-item">
            <div>
              <div className="am-danger-action-title">Pause Arena</div>
              <div className="am-danger-action-desc">Temporarily suspends the arena. Players will not be charged during pause.</div>
            </div>
            <button className="am-btn am-btn--danger-outline">Pause Arena</button>
          </div>
          <div className="am-danger-item">
            <div>
              <div className="am-danger-action-title">End Season Early</div>
              <div className="am-danger-action-desc">Permanently ends the current season. This action cannot be undone.</div>
            </div>
            <button className="am-btn am-btn--danger">End Season Early</button>
          </div>
        </div>
        <div className="am-danger-warning">
          These actions are irreversible. Proceed with caution.
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function ArenaManager() {
  const { id } = useParams();
  const arena = adminArenas.find((a) => a.id === id);
  const [tab, setTab] = useState('Overview');

  if (!arena) {
    return (
      <div className="arena-manager">
        <Link to="/admin" className="am-back-link">&larr; Back to Dashboard</Link>
        <div className="am-not-found">Arena not found.</div>
      </div>
    );
  }

  const statusStyle = STATUS_COLORS[arena.status] || STATUS_COLORS.draft;

  return (
    <div className="arena-manager">
      <Link to="/admin" className="am-back-link">&larr; Back to Dashboard</Link>

      <div className="am-header">
        <div className="am-header-top">
          <h1 className="am-header-name">{arena.name}</h1>
          <span className="am-sport-badge">{arena.sport}</span>
          <span
            className="am-status-badge"
            style={{ background: statusStyle.bg, color: statusStyle.color }}
          >
            {arena.status.charAt(0).toUpperCase() + arena.status.slice(1)}
          </span>
        </div>
        <div className="am-header-meta">
          Season {arena.season} | {new Date(arena.seasonStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(arena.seasonEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} | {arena.daysLeft} days remaining
        </div>
      </div>

      <div className="am-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`am-tab${tab === t ? ' am-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && <OverviewTab arena={arena} />}
      {tab === 'Captains' && <CaptainsTab arena={arena} />}
      {tab === 'Revenue' && <RevenueTab arena={arena} />}
      {tab === 'Season' && <SeasonTab arena={arena} />}
      {tab === 'Settings' && <SettingsTab arena={arena} />}
    </div>
  );
}
