import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminArenas } from '../../data/mockData'
import './ReferralLinks.css'

/* ── mock data: collaborators are influencers / partners promoting this arena ── */
const collaborators = [
  {
    id: 'steve', name: 'SteveWillDoIt', handle: '@stevewilldoit', avatar: 'S', role: 'Co-Promoter',
    platform: 'YouTube + Instagram', commission: 8,
    impressions: 285000, clicks: 6200, signups: 1520, paid: 410, revenue: 163590,
    earned: 13087, spend: 0, trend: [80, 290, 620, 1100, 1520],
    links: [
      { id: 'sw-1', code: 'steve-yt', label: 'YouTube Description', clicks: 4800, signups: 1180, paid: 320, revenue: 127680, active: true, created: '2026-03-01' },
      { id: 'sw-2', code: 'steve-ig', label: 'Instagram Story', clicks: 1400, signups: 340, paid: 90, revenue: 35910, active: true, created: '2026-03-05' },
    ]
  },
  {
    id: 'brad', name: 'Bradley Martyn', handle: '@bradleymartyn', avatar: 'B', role: 'Brand Ambassador',
    platform: 'Instagram + Podcast', commission: 6,
    impressions: 142000, clicks: 3890, signups: 845, paid: 234, revenue: 93366,
    earned: 5602, spend: 4200, trend: [120, 340, 580, 720, 845],
    links: [
      { id: 'bm-1', code: 'brad-ig', label: 'Instagram Bio', clicks: 2100, signups: 480, paid: 134, revenue: 53466, active: true, created: '2026-02-20' },
      { id: 'bm-2', code: 'brad-story', label: 'IG Story Swipe', clicks: 1200, signups: 260, paid: 72, revenue: 28728, active: true, created: '2026-03-01' },
      { id: 'bm-3', code: 'brad-reel', label: 'Reel CTA', clicks: 590, signups: 105, paid: 28, revenue: 11172, active: true, created: '2026-03-10' },
    ]
  },
  {
    id: 'nelk', name: 'NELK Boys (You)', handle: '@nelkboys', avatar: 'N', role: 'Host',
    platform: 'All Channels', commission: 0,
    impressions: 98000, clicks: 3340, signups: 992, paid: 284, revenue: 113316,
    earned: 0, spend: 0, trend: [60, 170, 400, 720, 992],
    links: [
      { id: 'nk-1', code: 'nelk-vip', label: 'VIP Launch Invite', clicks: 890, signups: 220, paid: 64, revenue: 25536, active: true, created: '2026-02-15' },
      { id: 'nk-2', code: 'nelk-x', label: 'Twitter Pinned', clicks: 920, signups: 205, paid: 52, revenue: 20748, active: true, created: '2026-03-02' },
      { id: 'nk-3', code: 'nelk-email', label: 'Email Blast', clicks: 1400, signups: 460, paid: 135, revenue: 53865, active: true, created: '2026-02-25' },
      { id: 'nk-4', code: 'nelk-friends', label: 'Friends & Family', clicks: 130, signups: 107, paid: 33, revenue: 13167, active: true, created: '2026-02-18' },
    ]
  },
  {
    id: 'danny', name: 'Danny Duncan', handle: '@dannyduncan', avatar: 'D', role: 'Affiliate',
    platform: 'YouTube', commission: 5,
    impressions: 52000, clicks: 890, signups: 210, paid: 58, revenue: 23142,
    earned: 1157, spend: 1500, trend: [10, 45, 110, 170, 210],
    links: [
      { id: 'dd-1', code: 'danny-yt', label: 'Video Mention', clicks: 560, signups: 135, paid: 38, revenue: 15162, active: false, created: '2026-03-10' },
      { id: 'dd-2', code: 'danny-pod', label: 'Podcast Shoutout', clicks: 330, signups: 75, paid: 20, revenue: 7980, active: true, created: '2026-03-14' },
    ]
  },
  {
    id: 'bob', name: 'Bob Menery', handle: '@bobmenery', avatar: 'M', role: 'Affiliate',
    platform: 'Instagram + Twitter', commission: 5,
    impressions: 53000, clicks: 1450, signups: 320, paid: 78, revenue: 31122,
    earned: 1556, spend: 800, trend: [20, 80, 150, 240, 320],
    links: [
      { id: 'bo-1', code: 'bob-ig', label: 'IG Post', clicks: 920, signups: 205, paid: 52, revenue: 20748, active: true, created: '2026-03-02' },
      { id: 'bo-2', code: 'bob-x', label: 'X Thread', clicks: 530, signups: 115, paid: 26, revenue: 10374, active: true, created: '2026-03-08' },
    ]
  },
]

const weeklyFunnel = [
  { week: 'W1 (Feb 15)', impressions: 85000, clicks: 2400, signups: 580, paid: 142 },
  { week: 'W2 (Feb 22)', impressions: 112000, clicks: 3100, signups: 760, paid: 198 },
  { week: 'W3 (Mar 1)', impressions: 148000, clicks: 4200, signups: 1020, paid: 278 },
  { week: 'W4 (Mar 8)', impressions: 165000, clicks: 4800, signups: 1180, paid: 340 },
  { week: 'W5 (Mar 15)', impressions: 182000, clicks: 5270, signups: 1347, paid: 406 },
]

/* ── component ── */
export default function ReferralManager() {
  const { id } = useParams()
  const arena = adminArenas.find(a => a.id === id) || adminArenas[0]
  const [tab, setTab] = useState('overview')
  const [showCreate, setShowCreate] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newCollab, setNewCollab] = useState('nelk')
  const [copied, setCopied] = useState(null)
  const [expandedCollab, setExpandedCollab] = useState(null)

  // aggregates
  const totals = collaborators.reduce((acc, c) => ({
    impressions: acc.impressions + c.impressions,
    clicks: acc.clicks + c.clicks,
    signups: acc.signups + c.signups,
    paid: acc.paid + c.paid,
    revenue: acc.revenue + c.revenue,
    spend: acc.spend + c.spend,
    earned: acc.earned + c.earned,
  }), { impressions: 0, clicks: 0, signups: 0, paid: 0, revenue: 0, spend: 0, earned: 0 })

  const ctr = totals.impressions > 0 ? ((totals.clicks / totals.impressions) * 100).toFixed(1) : 0
  const signupRate = totals.clicks > 0 ? ((totals.signups / totals.clicks) * 100).toFixed(1) : 0
  const convRate = totals.signups > 0 ? ((totals.paid / totals.signups) * 100).toFixed(1) : 0
  const cac = totals.paid > 0 ? (totals.spend / totals.paid).toFixed(0) : 0
  const arpu = totals.paid > 0 ? (totals.revenue / totals.paid).toFixed(0) : 0
  const roas = totals.spend > 0 ? (totals.revenue / totals.spend).toFixed(1) : 'Organic'

  const fmt = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }
  const fmtMoney = (n) => `$${n.toLocaleString()}`

  const copyLink = (url, linkId) => {
    navigator.clipboard.writeText(`https://${url}`).catch(() => {})
    setCopied(linkId)
    setTimeout(() => setCopied(null), 2000)
  }

  const funnelStages = [
    { label: 'Impressions', value: totals.impressions, color: '#e0e7ff' },
    { label: 'Clicks', value: totals.clicks, rate: ctr, color: '#c7d2fe' },
    { label: 'Signups', value: totals.signups, rate: signupRate, color: '#818cf8' },
    { label: 'Paid Joins', value: totals.paid, rate: convRate, color: 'var(--fsp-blue)' },
  ]

  const allLinks = collaborators.flatMap(c => c.links.map(l => ({ ...l, collaborator: c.name, handle: c.handle })))

  return (
    <div className="rm-page">
      {/* Header */}
      <div className="rm-header">
        <div>
          <Link to={`/admin/arenas/${arena.id}`} className="rm-back">&larr; {arena.name}</Link>
          <h1 className="rm-title">Affiliate Manager</h1>
          <p className="rm-subtitle">Track performance across all collaborators and affiliates</p>
        </div>
        <button className="rm-create-btn" onClick={() => setShowCreate(true)}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          Add Collaborator Link
        </button>
      </div>

      {/* Tabs */}
      <div className="rm-tabs">
        {['overview', 'collaborators', 'links'].map(t => (
          <button key={t} className={`rm-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' ? 'Overview' : t === 'collaborators' ? 'Collaborators' : 'All Links'}
          </button>
        ))}
      </div>

      {/* ═══ TAB: OVERVIEW ═══ */}
      {tab === 'overview' && (
        <>
          {/* Funnel */}
          <div className="rm-card rm-funnel-card">
            <div className="rm-card-title">Acquisition Funnel</div>
            <div className="rm-funnel">
              {funnelStages.map((stage, i) => {
                const widthPct = (stage.value / funnelStages[0].value) * 100
                return (
                  <div key={stage.label} className="rm-funnel-stage">
                    <div className="rm-funnel-bar-wrap">
                      <div
                        className="rm-funnel-bar"
                        style={{ width: `${Math.max(widthPct, 8)}%`, background: stage.color }}
                      >
                        <span className="rm-funnel-bar-label">{fmt(stage.value)}</span>
                      </div>
                    </div>
                    <div className="rm-funnel-info">
                      <span className="rm-funnel-name">{stage.label}</span>
                      {stage.rate && <span className="rm-funnel-rate">{stage.rate}% conv.</span>}
                    </div>
                    {i < funnelStages.length - 1 && (
                      <div className="rm-funnel-arrow">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M3 7l3 3 3-3" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="rm-funnel-summary">
              <span>Overall: {fmt(totals.impressions)} impressions &rarr; {fmt(totals.paid)} paid joins</span>
              <span className="rm-funnel-pct">{((totals.paid / totals.impressions) * 100).toFixed(2)}% end-to-end</span>
            </div>
          </div>

          {/* Business KPIs */}
          <div className="rm-kpi-grid rm-kpi-6">
            <div className="rm-kpi">
              <div className="rm-kpi-val rm-blue">{fmtMoney(totals.revenue)}</div>
              <div className="rm-kpi-label">Total Revenue</div>
            </div>
            <div className="rm-kpi">
              <div className="rm-kpi-val">{fmt(totals.paid)}</div>
              <div className="rm-kpi-label">Paid Joins</div>
            </div>
            <div className="rm-kpi">
              <div className="rm-kpi-val">{fmtMoney(Number(arpu))}</div>
              <div className="rm-kpi-label">ARPU</div>
            </div>
            <div className="rm-kpi">
              <div className="rm-kpi-val">{typeof roas === 'string' ? roas : `${roas}x`}</div>
              <div className="rm-kpi-label">ROAS</div>
            </div>
            <div className="rm-kpi">
              <div className="rm-kpi-val">{cac > 0 ? fmtMoney(Number(cac)) : 'N/A'}</div>
              <div className="rm-kpi-label">CAC (Paid Only)</div>
            </div>
            <div className="rm-kpi">
              <div className="rm-kpi-val">{fmtMoney(totals.spend)}</div>
              <div className="rm-kpi-label">Ad Spend</div>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="rm-card">
            <div className="rm-card-title">Weekly Trend</div>
            <div className="rm-trend-table">
              <div className="rm-trend-header">
                <span>Week</span><span>Impressions</span><span>Clicks</span><span>Signups</span><span>Paid</span><span>Conv.</span>
              </div>
              {weeklyFunnel.map((w, i) => (
                <div key={i} className="rm-trend-row">
                  <span className="rm-trend-week">{w.week}</span>
                  <span>{fmt(w.impressions)}</span>
                  <span>{fmt(w.clicks)}</span>
                  <span>{fmt(w.signups)}</span>
                  <span className="rm-trend-bold">{fmt(w.paid)}</span>
                  <span className="rm-trend-rate">{(w.paid / w.clicks * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Collaborators */}
          <div className="rm-card">
            <div className="rm-card-title">Collaborator Leaderboard</div>
            <div className="rm-channel-bars">
              {[...collaborators].sort((a, b) => b.revenue - a.revenue).map(c => {
                const pct = (c.revenue / collaborators.reduce((s, x) => Math.max(s, x.revenue), 0)) * 100
                return (
                  <div key={c.id} className="rm-channel-bar-row">
                    <div className="rm-collab-info">
                      <div className="rm-collab-avatar" style={{ background: c.id === 'nelk' ? 'var(--fsp-blue)' : '#6366f1' }}>{c.avatar}</div>
                      <div>
                        <span className="rm-channel-bar-name">{c.name}</span>
                        <span className="rm-collab-handle">{c.handle}</span>
                      </div>
                    </div>
                    <div className="rm-channel-bar-track">
                      <div className="rm-channel-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="rm-channel-bar-val">{fmtMoney(c.revenue)}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Commission Summary */}
          <div className="rm-card">
            <div className="rm-card-title">Commission Payouts</div>
            <div className="rm-commission-table">
              <div className="rm-commission-header">
                <span>Collaborator</span><span>Role</span><span>Commission</span><span>Paid Joins</span><span>Earned</span>
              </div>
              {collaborators.filter(c => c.commission > 0).sort((a, b) => b.earned - a.earned).map(c => (
                <div key={c.id} className="rm-commission-row">
                  <div className="rm-commission-name">
                    <div className="rm-collab-avatar-sm" style={{ background: '#6366f1' }}>{c.avatar}</div>
                    <div>
                      <div>{c.name}</div>
                      <div className="rm-collab-handle">{c.handle}</div>
                    </div>
                  </div>
                  <span className="rm-commission-role">{c.role}</span>
                  <span>{c.commission}%</span>
                  <span>{c.paid}</span>
                  <span className="rm-commission-earned">{fmtMoney(c.earned)}</span>
                </div>
              ))}
              <div className="rm-commission-total">
                <span>Total Commission Owed</span>
                <span className="rm-commission-earned">{fmtMoney(totals.earned)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ TAB: COLLABORATORS ═══ */}
      {tab === 'collaborators' && (
        <>
          <div className="rm-channel-grid">
            {collaborators.map(c => {
              const cCtr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : 0
              const cConv = c.signups > 0 ? ((c.paid / c.signups) * 100).toFixed(1) : 0
              const cCac = c.spend > 0 && c.paid > 0 ? `$${(c.spend / c.paid).toFixed(0)}` : 'Organic'
              const isExpanded = expandedCollab === c.id
              return (
                <div key={c.id} className={`rm-channel-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="rm-channel-top" onClick={() => setExpandedCollab(isExpanded ? null : c.id)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="rm-collab-avatar" style={{ background: c.id === 'nelk' ? 'var(--fsp-blue)' : '#6366f1' }}>{c.avatar}</div>
                      <div>
                        <div className="rm-channel-name">{c.name}</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span className="rm-channel-type">{c.role}</span>
                          <span style={{ fontSize: 11, color: 'var(--fsp-text-dim)' }}>{c.platform}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="rm-channel-revenue">{fmtMoney(c.revenue)}</div>
                      {c.commission > 0 && <div style={{ fontSize: 11, color: 'var(--fsp-text-sec)' }}>{c.commission}% commission</div>}
                    </div>
                  </div>

                  {/* Mini funnel */}
                  <div className="rm-channel-funnel">
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(c.impressions)}</div>
                      <div className="rm-cf-label">Impressions</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(c.clicks)}</div>
                      <div className="rm-cf-label">Clicks</div>
                      <div className="rm-cf-rate">{cCtr}%</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(c.signups)}</div>
                      <div className="rm-cf-label">Signups</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val rm-cf-bold">{fmt(c.paid)}</div>
                      <div className="rm-cf-label">Paid</div>
                      <div className="rm-cf-rate">{cConv}%</div>
                    </div>
                  </div>

                  <div className="rm-channel-meta">
                    <span>CAC: {cCac}</span>
                    <span>ARPU: ${c.paid > 0 ? (c.revenue / c.paid).toFixed(0) : 0}</span>
                    {c.commission > 0 && <span>Earned: {fmtMoney(c.earned)}</span>}
                    <span>{c.links.length} links</span>
                  </div>

                  {/* Sparkline */}
                  <div className="rm-sparkline">
                    {c.trend.map((v, i) => (
                      <div key={i} className="rm-spark-bar" style={{ height: `${(v / Math.max(...c.trend)) * 40}px` }}></div>
                    ))}
                  </div>

                  {/* Expanded: link details */}
                  {isExpanded && (
                    <div className="rm-channel-links">
                      <div className="rm-cl-header">
                        <span>Link</span><span>Clicks</span><span>Signups</span><span>Paid</span><span>Revenue</span><span>Status</span>
                      </div>
                      {c.links.map(link => (
                        <div key={link.id} className="rm-cl-row">
                          <div className="rm-cl-name">
                            <div>{link.label}</div>
                            <div className="rm-cl-code">{link.code}</div>
                          </div>
                          <span>{fmt(link.clicks)}</span>
                          <span>{fmt(link.signups)}</span>
                          <span className="rm-cl-bold">{fmt(link.paid)}</span>
                          <span className="rm-cl-bold">{fmtMoney(link.revenue)}</span>
                          <span>
                            <span className={`rm-status-dot ${link.active ? 'active' : 'inactive'}`}></span>
                            {link.active ? 'Active' : 'Off'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Collaborator comparison table */}
          <div className="rm-card" style={{ marginTop: 24 }}>
            <div className="rm-card-title">Collaborator Comparison</div>
            <div className="rm-compare-table">
              <div className="rm-compare-header">
                <span>Collaborator</span><span>CTR</span><span>Signup Rate</span><span>Conv. Rate</span><span>CAC</span><span>Revenue</span>
              </div>
              {[...collaborators].sort((a, b) => b.revenue - a.revenue).map(c => (
                <div key={c.id} className="rm-compare-row">
                  <span className="rm-compare-name">{c.name}</span>
                  <span>{c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : 0}%</span>
                  <span>{c.clicks > 0 ? ((c.signups / c.clicks) * 100).toFixed(1) : 0}%</span>
                  <span className="rm-compare-bold">{c.signups > 0 ? ((c.paid / c.signups) * 100).toFixed(1) : 0}%</span>
                  <span>{c.spend > 0 ? `$${(c.spend / c.paid).toFixed(0)}` : '--'}</span>
                  <span className="rm-compare-bold">{fmtMoney(c.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══ TAB: ALL LINKS ═══ */}
      {tab === 'links' && (
        <>
          {showCreate && (
            <div className="rm-create-card">
              <h3 className="rm-create-title">Create Referral Link</h3>
              <div className="rm-create-fields">
                <div className="rm-field">
                  <label>Collaborator</label>
                  <select value={newCollab} onChange={e => setNewCollab(e.target.value)}>
                    {collaborators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="rm-field">
                  <label>Label</label>
                  <input type="text" placeholder="e.g. Instagram Bio" value={newLabel} onChange={e => setNewLabel(e.target.value)} />
                </div>
                <div className="rm-field">
                  <label>Code</label>
                  <div className="rm-code-input">
                    <span className="rm-code-prefix">fsp.app/join/{arena.id}?ref=</span>
                    <input type="text" placeholder="my-code" value={newCode} onChange={e => setNewCode(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="rm-create-actions">
                <button className="rm-btn-cancel" onClick={() => { setShowCreate(false); setNewLabel(''); setNewCode('') }}>Cancel</button>
                <button className="rm-btn-save" onClick={() => { setShowCreate(false); setNewLabel(''); setNewCode('') }}>Create Link</button>
              </div>
            </div>
          )}

          <div className="rm-links-table">
            <div className="rm-lt-header">
              <span>Link</span><span>Collaborator</span><span>Clicks</span><span>Signups</span><span>Paid</span><span>Revenue</span><span>Conv.</span><span>Status</span>
            </div>
            {allLinks
              .sort((a, b) => b.revenue - a.revenue)
              .map(link => (
              <div key={link.id} className="rm-lt-row">
                <div className="rm-lt-name">
                  <div className="rm-lt-label">{link.label}</div>
                  <div className="rm-lt-url">
                    fsp.app/join/{arena.id}?ref={link.code}
                    <button
                      className={`rm-lt-copy ${copied === link.id ? 'copied' : ''}`}
                      onClick={() => copyLink(`fsp.app/join/${arena.id}?ref=${link.code}`, link.id)}
                    >
                      {copied === link.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <span className="rm-lt-channel">{link.collaborator}</span>
                <span>{fmt(link.clicks)}</span>
                <span>{fmt(link.signups)}</span>
                <span className="rm-lt-bold">{fmt(link.paid)}</span>
                <span className="rm-lt-bold">{fmtMoney(link.revenue)}</span>
                <span className="rm-lt-rate">{link.clicks > 0 ? ((link.paid / link.clicks) * 100).toFixed(1) : 0}%</span>
                <span>
                  <span className={`rm-status-dot ${link.active ? 'active' : 'inactive'}`}></span>
                  {link.active ? 'Active' : 'Off'}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
