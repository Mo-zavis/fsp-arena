import { useState } from 'react';
import {
  captainLeaderboard,
  squadMembers,
  payoutHistory,
  tierHistory,
  referralTree,
} from '../../data/mockData';
import './CaptainDashboard.css';

const TABS = ['Leaderboard', 'My Squad', 'Payouts'];
const DIVISIONS = ['Premier', 'Challenger'];

const DEPTH_COLORS = {
  1: 'cd-tree-dot--d1',
  2: 'cd-tree-dot--d2',
  3: 'cd-tree-dot--d3',
};

function LeaderboardTab() {
  const [division, setDivision] = useState('Premier');
  const rows = captainLeaderboard.filter((r) => r.division === division);

  return (
    <div>
      <div className="cd-chips">
        {DIVISIONS.map((d) => (
          <button
            key={d}
            className={`cd-chip${division === d ? ' cd-chip--active' : ''}`}
            onClick={() => setDivision(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <table className="cd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Captain</th>
            <th>NCS</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.rank} className={r.isYou ? 'cd-row--you' : ''}>
              <td>{r.rank}</td>
              <td className="cd-captain-cell">{r.handle}</td>
              <td>{r.ncs.toLocaleString()}</td>
              <td>
                <span
                  className={`cd-tier-badge cd-tier-badge--${r.tier.toLowerCase()}`}
                >
                  {r.tier}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MySquadTab() {
  const [copied, setCopied] = useState(false);
  const link = 'https://fsp.gg/ref/mookie_butts';
  const activeCount = squadMembers.filter((m) => m.active).length;
  const activePct = Math.round((activeCount / squadMembers.length) * 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div className="cd-squad-status">
        <div className="cd-squad-status__name">Team Mook</div>
        <div className="cd-squad-status__meta">
          48 members &mdash; {activePct}% active
        </div>
      </div>

      <div className="cd-referral-section">
        <div className="cd-referral-section__title">Referral Link</div>
        <div className="cd-referral-link-row">
          <div className="cd-referral-link-text">{link}</div>
          <button className="cd-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="cd-tree">
        <div className="cd-tree__title">Referral Tree</div>
        {referralTree.map((row) => (
          <div key={row.depth} className="cd-tree-row">
            <span className={`cd-tree-dot ${DEPTH_COLORS[row.depth]}`} />
            <span className="cd-tree-row__label">D{row.depth}</span>
            <span className="cd-tree-row__stat">
              {row.paid} paid &middot; {row.avgSessions} avg sessions
            </span>
          </div>
        ))}
      </div>

      <div>
        <div className="cd-members__title">Members</div>
        {squadMembers.map((m) => (
          <div key={m.handle} className="cd-member-row">
            <span className="cd-depth-tag">D{m.depth}</span>
            <span className="cd-member-row__handle">{m.handle}</span>
            <span className="cd-member-row__sessions">
              {m.sessions} sessions
            </span>
            <span className={m.active ? 'cd-status-active' : 'cd-status-inactive'}>
              {m.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PayoutsTab() {
  const total = payoutHistory.reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <div className="cd-total-card">
        <div className="cd-total-card__amount">
          ${total.toLocaleString()}
        </div>
        <div className="cd-total-card__sub">
          {payoutHistory.length} months active
        </div>
      </div>

      <div className="cd-section-title">Payout History</div>
      {payoutHistory.map((p) => (
        <div key={p.month} className="cd-payout-row">
          <span className="cd-payout-row__month">{p.month}</span>
          <span className="cd-payout-row__tier">{p.tier}</span>
          <span className="cd-payout-row__amount">
            ${p.amount.toLocaleString()}
          </span>
          <span className="cd-paid-badge">{p.status}</span>
        </div>
      ))}

      <div className="cd-pool-card">
        <div className="cd-pool-card__label">This Month's Pool</div>
        <div className="cd-pool-card__amount">$143,640</div>
        <div className="cd-pool-card__share">Your est. share: ~$4,280</div>
      </div>

      <div className="cd-section-title">Tier History</div>
      {tierHistory.map((t) => (
        <div key={t.month} className="cd-tier-row">
          <span className="cd-tier-row__month">{t.month}</span>
          <span className="cd-tier-row__transition">
            {t.from} &rarr; {t.to}
          </span>
          <span
            className={`cd-tier-row__direction cd-tier-row__direction--${t.direction}`}
          >
            {t.direction === 'up' && '\u2191 '}
            {t.direction === 'hold' && '= '}
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CaptainDashboard() {
  const [tab, setTab] = useState('Leaderboard');

  return (
    <div className="captain-dashboard">
      <div className="cd-context">
        NELK Boys Arena &mdash; Beer Pong &mdash; Season 1
      </div>

      <div className="cd-status-card">
        <div className="cd-status-card__label">Your Status</div>
        <div className="cd-status-card__headline">
          <span className="cd-status-card__tier">Premier Gold</span>
          <span className="cd-status-card__rank">Rank #3</span>
        </div>
        <div className="cd-status-grid">
          <div>
            <div className="cd-status-grid__item-label">NCS</div>
            <div className="cd-status-grid__item-value">4,820</div>
          </div>
          <div>
            <div className="cd-status-grid__item-label">Squad</div>
            <div className="cd-status-grid__item-value">48</div>
          </div>
          <div>
            <div className="cd-status-grid__item-label">This Month</div>
            <div className="cd-status-grid__item-value">$4,280</div>
          </div>
          <div>
            <div className="cd-status-grid__item-label">Remaining</div>
            <div className="cd-status-grid__item-value">45d</div>
          </div>
        </div>
      </div>

      <div className="cd-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`cd-tab${tab === t ? ' cd-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Leaderboard' && <LeaderboardTab />}
      {tab === 'My Squad' && <MySquadTab />}
      {tab === 'Payouts' && <PayoutsTab />}
    </div>
  );
}
