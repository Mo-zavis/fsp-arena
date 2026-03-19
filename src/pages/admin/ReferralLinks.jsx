import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminArenas } from '../../data/mockData'
import './ReferralLinks.css'

/* ── mock data ── */
const channels = [
  {
    id: 'ig', name: 'Instagram', type: 'Social',
    impressions: 142000, clicks: 3890, signups: 845, paid: 234, revenue: 93366,
    spend: 4200, trend: [120, 340, 580, 720, 845],
    links: [
      { id: 'ig-1', code: 'nelk-ig', label: 'Bio Link', clicks: 2100, signups: 480, paid: 134, revenue: 53466, active: true, created: '2026-02-20' },
      { id: 'ig-2', code: 'nelk-ig-story', label: 'Story Swipe Up', clicks: 1200, signups: 260, paid: 72, revenue: 28728, active: true, created: '2026-03-01' },
      { id: 'ig-3', code: 'nelk-ig-reel', label: 'Reel CTA', clicks: 590, signups: 105, paid: 28, revenue: 11172, active: true, created: '2026-03-10' },
    ]
  },
  {
    id: 'yt', name: 'YouTube', type: 'Content',
    impressions: 285000, clicks: 6200, signups: 1520, paid: 410, revenue: 163590,
    spend: 0, trend: [80, 290, 620, 1100, 1520],
    links: [
      { id: 'yt-1', code: 'nelk-yt', label: 'Video Description', clicks: 4800, signups: 1180, paid: 320, revenue: 127680, active: true, created: '2026-03-01' },
      { id: 'yt-2', code: 'nelk-yt-pin', label: 'Pinned Comment', clicks: 1400, signups: 340, paid: 90, revenue: 35910, active: true, created: '2026-03-05' },
    ]
  },
  {
    id: 'vip', name: 'Direct / VIP', type: 'Organic',
    impressions: 18000, clicks: 1240, signups: 312, paid: 89, revenue: 35511,
    spend: 0, trend: [40, 90, 160, 240, 312],
    links: [
      { id: 'vip-1', code: 'nelk-vip', label: 'VIP Launch Invite', clicks: 890, signups: 220, paid: 64, revenue: 25536, active: true, created: '2026-02-15' },
      { id: 'vip-2', code: 'nelk-friends', label: 'Friends & Family', clicks: 350, signups: 92, paid: 25, revenue: 9975, active: true, created: '2026-02-18' },
    ]
  },
  {
    id: 'pod', name: 'Podcast', type: 'Content',
    impressions: 52000, clicks: 890, signups: 210, paid: 58, revenue: 23142,
    spend: 1500, trend: [10, 45, 110, 170, 210],
    links: [
      { id: 'pod-1', code: 'nelk-pod', label: 'Full Send Pod #142', clicks: 560, signups: 135, paid: 38, revenue: 15162, active: false, created: '2026-03-10' },
      { id: 'pod-2', code: 'nelk-pod2', label: 'Happy Hour Ep', clicks: 330, signups: 75, paid: 20, revenue: 7980, active: true, created: '2026-03-14' },
    ]
  },
  {
    id: 'tw', name: 'Twitter / X', type: 'Social',
    impressions: 98000, clicks: 1450, signups: 320, paid: 78, revenue: 31122,
    spend: 800, trend: [20, 80, 150, 240, 320],
    links: [
      { id: 'tw-1', code: 'nelk-x', label: 'Pinned Tweet', clicks: 920, signups: 205, paid: 52, revenue: 20748, active: true, created: '2026-03-02' },
      { id: 'tw-2', code: 'nelk-x-thread', label: 'Announcement Thread', clicks: 530, signups: 115, paid: 26, revenue: 10374, active: true, created: '2026-03-08' },
    ]
  },
  {
    id: 'email', name: 'Email', type: 'Owned',
    impressions: 35000, clicks: 2100, signups: 680, paid: 195, revenue: 77805,
    spend: 200, trend: [50, 180, 350, 520, 680],
    links: [
      { id: 'em-1', code: 'nelk-launch', label: 'Launch Announcement', clicks: 1400, signups: 460, paid: 135, revenue: 53865, active: true, created: '2026-02-25' },
      { id: 'em-2', code: 'nelk-remind', label: 'Reminder Sequence', clicks: 700, signups: 220, paid: 60, revenue: 23940, active: true, created: '2026-03-05' },
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
  const [newChannel, setNewChannel] = useState('ig')
  const [copied, setCopied] = useState(null)
  const [expandedChannel, setExpandedChannel] = useState(null)

  // aggregates
  const totals = channels.reduce((acc, ch) => ({
    impressions: acc.impressions + ch.impressions,
    clicks: acc.clicks + ch.clicks,
    signups: acc.signups + ch.signups,
    paid: acc.paid + ch.paid,
    revenue: acc.revenue + ch.revenue,
    spend: acc.spend + ch.spend,
  }), { impressions: 0, clicks: 0, signups: 0, paid: 0, revenue: 0, spend: 0 })

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

  const allLinks = channels.flatMap(ch => ch.links.map(l => ({ ...l, channel: ch.name })))

  return (
    <div className="rm-page">
      {/* Header */}
      <div className="rm-header">
        <div>
          <Link to={`/admin/arenas/${arena.id}`} className="rm-back">&larr; {arena.name}</Link>
          <h1 className="rm-title">Referral Manager</h1>
          <p className="rm-subtitle">Track acquisition performance across all channels</p>
        </div>
        <button className="rm-create-btn" onClick={() => setShowCreate(true)}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          New Link
        </button>
      </div>

      {/* Tabs */}
      <div className="rm-tabs">
        {['overview', 'channels', 'links'].map(t => (
          <button key={t} className={`rm-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'overview' ? 'Overview' : t === 'channels' ? 'Channel Performance' : 'All Links'}
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

          {/* Top Channels quick */}
          <div className="rm-card">
            <div className="rm-card-title">Top Channels by Revenue</div>
            <div className="rm-channel-bars">
              {[...channels].sort((a, b) => b.revenue - a.revenue).map(ch => {
                const pct = (ch.revenue / channels.reduce((s, c) => Math.max(s, c.revenue), 0)) * 100
                return (
                  <div key={ch.id} className="rm-channel-bar-row">
                    <span className="rm-channel-bar-name">{ch.name}</span>
                    <div className="rm-channel-bar-track">
                      <div className="rm-channel-bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                    <span className="rm-channel-bar-val">{fmtMoney(ch.revenue)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      {/* ═══ TAB: CHANNELS ═══ */}
      {tab === 'channels' && (
        <>
          <div className="rm-channel-grid">
            {channels.map(ch => {
              const chCtr = ch.impressions > 0 ? ((ch.clicks / ch.impressions) * 100).toFixed(1) : 0
              const chConv = ch.signups > 0 ? ((ch.paid / ch.signups) * 100).toFixed(1) : 0
              const chCac = ch.spend > 0 && ch.paid > 0 ? `$${(ch.spend / ch.paid).toFixed(0)}` : 'Organic'
              const isExpanded = expandedChannel === ch.id
              return (
                <div key={ch.id} className={`rm-channel-card ${isExpanded ? 'expanded' : ''}`}>
                  <div className="rm-channel-top" onClick={() => setExpandedChannel(isExpanded ? null : ch.id)}>
                    <div>
                      <div className="rm-channel-name">{ch.name}</div>
                      <span className="rm-channel-type">{ch.type}</span>
                    </div>
                    <div className="rm-channel-revenue">{fmtMoney(ch.revenue)}</div>
                  </div>

                  {/* Mini funnel */}
                  <div className="rm-channel-funnel">
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(ch.impressions)}</div>
                      <div className="rm-cf-label">Impressions</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(ch.clicks)}</div>
                      <div className="rm-cf-label">Clicks</div>
                      <div className="rm-cf-rate">{chCtr}%</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val">{fmt(ch.signups)}</div>
                      <div className="rm-cf-label">Signups</div>
                    </div>
                    <div className="rm-cf-arrow">&rarr;</div>
                    <div className="rm-cf-step">
                      <div className="rm-cf-val rm-cf-bold">{fmt(ch.paid)}</div>
                      <div className="rm-cf-label">Paid</div>
                      <div className="rm-cf-rate">{chConv}%</div>
                    </div>
                  </div>

                  <div className="rm-channel-meta">
                    <span>CAC: {chCac}</span>
                    <span>ARPU: ${ch.paid > 0 ? (ch.revenue / ch.paid).toFixed(0) : 0}</span>
                    <span>{ch.links.length} links</span>
                  </div>

                  {/* Sparkline */}
                  <div className="rm-sparkline">
                    {ch.trend.map((v, i) => (
                      <div key={i} className="rm-spark-bar" style={{ height: `${(v / Math.max(...ch.trend)) * 40}px` }}></div>
                    ))}
                  </div>

                  {/* Expanded: link details */}
                  {isExpanded && (
                    <div className="rm-channel-links">
                      <div className="rm-cl-header">
                        <span>Link</span><span>Clicks</span><span>Signups</span><span>Paid</span><span>Revenue</span><span>Status</span>
                      </div>
                      {ch.links.map(link => (
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

          {/* Channel comparison table */}
          <div className="rm-card" style={{ marginTop: 24 }}>
            <div className="rm-card-title">Channel Comparison</div>
            <div className="rm-compare-table">
              <div className="rm-compare-header">
                <span>Channel</span><span>CTR</span><span>Signup Rate</span><span>Conv. Rate</span><span>CAC</span><span>Revenue</span>
              </div>
              {[...channels].sort((a, b) => b.revenue - a.revenue).map(ch => (
                <div key={ch.id} className="rm-compare-row">
                  <span className="rm-compare-name">{ch.name}</span>
                  <span>{ch.impressions > 0 ? ((ch.clicks / ch.impressions) * 100).toFixed(1) : 0}%</span>
                  <span>{ch.clicks > 0 ? ((ch.signups / ch.clicks) * 100).toFixed(1) : 0}%</span>
                  <span className="rm-compare-bold">{ch.signups > 0 ? ((ch.paid / ch.signups) * 100).toFixed(1) : 0}%</span>
                  <span>{ch.spend > 0 ? `$${(ch.spend / ch.paid).toFixed(0)}` : '--'}</span>
                  <span className="rm-compare-bold">{fmtMoney(ch.revenue)}</span>
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
                  <label>Channel</label>
                  <select value={newChannel} onChange={e => setNewChannel(e.target.value)}>
                    {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
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
              <span>Link</span><span>Channel</span><span>Clicks</span><span>Signups</span><span>Paid</span><span>Revenue</span><span>Conv.</span><span>Status</span>
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
                <span className="rm-lt-channel">{link.channel}</span>
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
