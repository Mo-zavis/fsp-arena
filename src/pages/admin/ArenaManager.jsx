import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  adminArenas, captainLeaderboard, captainTierSummary,
  payoutHistory, seasonEvents, revenueTimeline,
} from '../../data/mockData';
import './ArenaManager.css';

const TABS = ['Overview', 'Captains', 'Revenue', 'Season', 'Settings'];

const ACTIVITY_FEED = [
  { text: '@new_player joined Beer Pong', time: '2 min ago', type: 'join' },
  { text: '@squad_leader reached 30 members - Captain!', time: '1 hour ago', type: 'captain' },
  { text: 'Monthly payout cycle completed', time: '1 day ago', type: 'payout' },
  { text: '@player_x referred 5 new members', time: '2 days ago', type: 'join' },
  { text: 'Arena approved by ops team', time: '5 days ago', type: 'captain' },
];

const ACTIVITY_DOT = { join: 'am-activity-dot--blue', captain: 'am-activity-dot--green', payout: 'am-activity-dot--gold' };

function fmt(n) { return '$' + n.toLocaleString(); }

/* ─── Overview ─── */
function OverviewTab({ arena }) {
  const fillPct = Math.round((arena.premierFilled / arena.premierCap) * 100);

  return (
    <>
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-label">Total Players</div><div className="kpi-value">{arena.totalParticipants.toLocaleString()}</div></div>
        <div className="kpi-card"><div className="kpi-label">Captains</div><div className="kpi-value">{arena.totalCaptains}</div></div>
        <div className="kpi-card"><div className="kpi-label">Monthly Revenue</div><div className="kpi-value blue">{fmt(arena.monthlyRevenue)}</div></div>
        <div className="kpi-card">
          <div className="kpi-label">Premier Fill Rate</div>
          <div className="kpi-value">{arena.premierFilled}/{arena.premierCap}</div>
          <div className="progress-track" style={{ marginTop: 6 }}><div className="progress-fill" style={{ width: `${fillPct}%` }} /></div>
        </div>
      </div>

      <div className="am-two-col">
        <div className="card">
          <div className="card-header"><div className="card-title">Division Breakdown</div></div>
          <div className="card-body">
            <div className="am-division-row">
              <div className="am-division-label">Premier</div>
              <div style={{ flex: 1 }}>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${fillPct}%` }} /></div>
                <div className="am-division-sub" style={{ marginTop: 4 }}>{arena.premierFilled}/{arena.premierCap} ({fillPct}%)</div>
              </div>
            </div>
            <div className="am-division-row">
              <div className="am-division-label">Challenger</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{arena.challengerCount.toLocaleString()}</div>
                <div className="am-division-sub">Open capacity</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Recent Activity</div></div>
          <div className="card-body">
            {ACTIVITY_FEED.map((item, i) => (
              <div key={i} className="am-activity-row">
                <span className={`am-activity-dot ${ACTIVITY_DOT[item.type]}`} />
                <span className="am-activity-text">{item.text}</span>
                <span className="am-activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Captains ─── */
function CaptainsTab() {
  const [divFilter, setDivFilter] = useState('All');
  const filtered = divFilter === 'All' ? captainLeaderboard : captainLeaderboard.filter(r => r.division === divFilter);

  return (
    <>
      <div className="am-tier-grid">
        {captainTierSummary.map(t => (
          <div key={t.tier} className={`am-tier-card ${t.tier.startsWith('Premier') ? 'am-tier-card--premier' : 'am-tier-card--challenger'}`}>
            <div className="am-tier-card-name">{t.tier}</div>
            <div className="am-tier-card-row"><span className="am-tier-card-label">Captains</span><span className="am-tier-card-val">{t.count}</span></div>
            <div className="am-tier-card-row"><span className="am-tier-card-label">Pool Share</span><span className="am-tier-card-val">{fmt(t.poolShare)}</span></div>
            <div className="am-tier-card-row"><span className="am-tier-card-label">Avg Payout</span><span className="am-tier-card-val">{fmt(t.avgPayout)}</span></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Captain Leaderboard</div></div>
        <div className="am-filter-row">
          <label className="am-filter-label">Division</label>
          <select className="am-select" value={divFilter} onChange={e => setDivFilter(e.target.value)}>
            <option>All</option><option>Premier</option><option>Challenger</option>
          </select>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Rank</th><th>Captain</th><th>Squad</th><th>NCS</th><th>Tier</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.rank}>
                <td className="mono">{r.rank}</td>
                <td className="primary">{r.handle}</td>
                <td>{r.squad}</td>
                <td className="mono">{r.ncs.toLocaleString()}</td>
                <td><span className={`am-tier-badge am-tier-badge--${r.tier.toLowerCase()}`}>{r.tier}</span></td>
                <td><span className="am-view-link">View</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="am-note">Tier positions update automatically each monthly cycle based on NCS rankings.</div>
      </div>
    </>
  );
}

/* ─── Revenue ─── */
function RevenueTab({ arena }) {
  const maxRev = Math.max(...revenueTimeline.map(r => r.revenue));

  return (
    <>
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-label">Total Revenue</div><div className="kpi-value blue">{fmt(arena.totalRevenue)}</div></div>
        <div className="kpi-card"><div className="kpi-label">Host Share</div><div className="kpi-value">{fmt(arena.hostShare)}</div></div>
        <div className="kpi-card"><div className="kpi-label">Captain Pool</div><div className="kpi-value">{fmt(arena.captainPool)}</div></div>
        <div className="kpi-card"><div className="kpi-label">Platform Fee</div><div className="kpi-value">{fmt(arena.platformFee)}</div></div>
      </div>

      <div className="am-two-col">
        <div className="card">
          <div className="card-header"><div className="card-title">Revenue Timeline</div></div>
          <div className="card-body">
            <div className="am-chart">
              {revenueTimeline.map(r => {
                const h = maxRev > 0 ? (r.revenue / maxRev) * 100 : 0;
                return (
                  <div key={r.month} className="am-chart-col">
                    <div className="am-chart-val">{r.revenue > 0 ? fmt(r.revenue) : '$0'}</div>
                    <div className="am-chart-bar-wrap"><div className="am-chart-bar" style={{ height: `${h}%` }} /></div>
                    <div className="am-chart-label">{r.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Revenue Split</div></div>
          <div className="card-body">
            <div className="am-split-bar">
              <div className="am-split-segment am-split-segment--host" style={{ width: `${arena.splits.host}%` }}>
                <span className="am-split-label">Host {arena.splits.host}%</span>
                <span className="am-split-amount">{fmt(arena.hostShare)}</span>
              </div>
              <div className="am-split-segment am-split-segment--captain" style={{ width: `${arena.splits.captainPool}%` }}>
                <span className="am-split-label">{arena.splits.captainPool}%</span>
              </div>
              <div className="am-split-segment am-split-segment--platform" style={{ width: `${arena.splits.platform}%` }}>
                <span className="am-split-label">Platform {arena.splits.platform}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Payout History</div></div>
        <table className="data-table">
          <thead><tr><th>Month</th><th>Tier</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {payoutHistory.map(p => (
              <tr key={p.month}>
                <td className="primary">{p.month}</td>
                <td>{p.tier}</td>
                <td className="mono">{fmt(p.amount)}</td>
                <td><span className="am-status-paid">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ─── Season ─── */
function SeasonTab({ arena }) {
  const today = new Date('2026-03-19');
  const [confirmFlush, setConfirmFlush] = useState(false);
  const getStatus = (d) => { const dt = new Date(d); if (dt < today) return 'past'; if (dt.toDateString() === today.toDateString()) return 'current'; return 'future'; };

  return (
    <>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="am-season-grid">
          <div><div className="am-season-label">Current Phase</div><div className="am-season-val">Active</div></div>
          <div><div className="am-season-label">Days Remaining</div><div className="am-season-val">{arena.daysLeft}</div></div>
          <div><div className="am-season-label">Next Event</div><div className="am-season-val">{seasonEvents.find(e => new Date(e.date) >= today)?.event || 'None'}</div></div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-header"><div className="card-title">Season Timeline</div></div>
        <div className="card-body">
          {seasonEvents.map((evt, i) => (
            <div key={i} className="am-timeline-item">
              <div className="am-timeline-date">{new Date(evt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              <div className="am-timeline-track">
                <span className={`am-timeline-dot am-timeline-dot--${getStatus(evt.date)}`} />
                {i < seasonEvents.length - 1 && <span className="am-timeline-line" />}
              </div>
              <div className="am-timeline-content">
                <span className="am-timeline-event">{evt.event}</span>
                <span className={`am-timeline-type am-timeline-type--${evt.type}`}>{evt.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-title">Season Controls</div>
      <div className="am-controls-grid">
        <div className="am-control-card">
          <div className="am-control-title">Start Payout Cycle</div>
          <div className="am-control-desc">Triggers monthly NCS calculation and distributes payouts to all captains.</div>
          <button className="am-btn am-btn--primary">Start Payout Cycle</button>
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Preview Flush</div>
          <div className="am-control-desc">Shows pre-flush standings without executing the reset.</div>
          <button className="am-btn am-btn--outline">Preview Flush</button>
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Execute Flush</div>
          <div className="am-control-desc">Season reset, final rankings, Golden Ticket draw. Irreversible.</div>
          {!confirmFlush ? (
            <button className="am-btn am-btn--danger" onClick={() => setConfirmFlush(true)}>Execute Flush</button>
          ) : (
            <div className="am-confirm-row">
              <button className="am-btn am-btn--danger" onClick={() => setConfirmFlush(false)}>Confirm</button>
              <button className="am-btn am-btn--outline" onClick={() => setConfirmFlush(false)}>Cancel</button>
            </div>
          )}
        </div>
        <div className="am-control-card">
          <div className="am-control-title">Archive Season</div>
          <div className="am-control-desc">Archives current season and prepares for a new cycle.</div>
          <button className="am-btn am-btn--gray">Archive Season</button>
        </div>
      </div>
    </>
  );
}

/* ─── Settings ─── */
function SettingsTab({ arena }) {
  return (
    <>
      <div className="am-two-col">
        <div className="card">
          <div className="card-header"><div className="card-title">Arena Details</div></div>
          <div className="card-body">
            <div className="am-field">
              <label className="am-field-label">Arena Name</label>
              <div className="am-field-row"><input className="am-input" value={arena.name} disabled /><span className="am-edit-link">Edit</span></div>
            </div>
            <div className="am-field">
              <label className="am-field-label">Description</label>
              <div className="am-field-row"><input className="am-input" value="The ultimate competitive experience." disabled /><span className="am-edit-link">Edit</span></div>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 10 }}>
            <div className="card-header"><div className="card-title">Entry Fee</div></div>
            <div className="card-body"><div className="am-setting-value">${arena.entryFee}/month</div></div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">Division Config</div></div>
            <div className="card-body">
              <div className="am-setting-row"><span className="am-setting-label">Premier Cap</span><span className="am-setting-value">{arena.premierCap}</span></div>
              <div className="am-setting-row"><span className="am-setting-label">Challenger</span><span className="am-setting-value">Open</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-header"><div className="card-title">Revenue Splits</div></div>
        <div className="card-body">
          <div className="am-split-bar">
            <div className="am-split-segment am-split-segment--host" style={{ width: `${arena.splits.host}%` }}><span className="am-split-label">Host {arena.splits.host}%</span></div>
            <div className="am-split-segment am-split-segment--captain" style={{ width: `${arena.splits.captainPool}%` }}><span className="am-split-label">{arena.splits.captainPool}%</span></div>
            <div className="am-split-segment am-split-segment--platform" style={{ width: `${arena.splits.platform}%` }}><span className="am-split-label">Platform {arena.splits.platform}%</span></div>
          </div>
          <div className="am-note">Contact support to change revenue splits.</div>
        </div>
      </div>

      <div className="card am-danger-card">
        <div className="card-header"><div className="card-title am-danger-title">Danger Zone</div></div>
        <div className="card-body">
          <div className="am-danger-item">
            <div><div className="am-danger-action-title">Pause Arena</div><div className="am-danger-action-desc">Temporarily suspends the arena.</div></div>
            <button className="am-btn am-btn--danger-outline">Pause</button>
          </div>
          <div className="am-danger-item">
            <div><div className="am-danger-action-title">End Season Early</div><div className="am-danger-action-desc">Permanently ends the current season. Cannot be undone.</div></div>
            <button className="am-btn am-btn--danger">End Season</button>
          </div>
          <div className="am-danger-warning">These actions are irreversible. Proceed with caution.</div>
        </div>
      </div>
    </>
  );
}

/* ─── Main ─── */
export default function ArenaManager() {
  const { id } = useParams();
  const arena = adminArenas.find(a => a.id === id);
  const [tab, setTab] = useState('Overview');

  if (!arena) {
    return <><Link to="/admin" className="am-back">← Back</Link><div className="am-not-found">Arena not found.</div></>;
  }

  return (
    <>
      <Link to="/admin" className="am-back">← Back to Dashboard</Link>

      <div className="am-header">
        <div className="am-header-top">
          <h1 className="am-header-name">{arena.name}</h1>
          <span className="am-header-sport">{arena.sport}</span>
          <span className={`status-pill ${arena.status}`}>{arena.status.charAt(0).toUpperCase() + arena.status.slice(1)}</span>
        </div>
        <div className="am-header-meta">
          Season {arena.season} · {new Date(arena.seasonStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(arena.seasonEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {arena.daysLeft}d remaining
        </div>
      </div>

      <div className="sub-tabs">
        {TABS.map(t => (
          <button key={t} className={`sub-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'Overview' && <OverviewTab arena={arena} />}
      {tab === 'Captains' && <CaptainsTab arena={arena} />}
      {tab === 'Revenue' && <RevenueTab arena={arena} />}
      {tab === 'Season' && <SeasonTab arena={arena} />}
      {tab === 'Settings' && <SettingsTab arena={arena} />}
    </>
  );
}
