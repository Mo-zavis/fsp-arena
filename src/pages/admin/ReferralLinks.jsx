import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminArenas } from '../../data/mockData'
import './ReferralLinks.css'

const initialLinks = [
  { id: 1, code: 'nelk-vip', label: 'VIP Launch', url: 'fsp.app/join/nelk?ref=nelk-vip', clicks: 1240, signups: 312, conversions: 89, revenue: 35511, created: '2026-02-15', active: true },
  { id: 2, code: 'nelk-ig', label: 'Instagram Bio', url: 'fsp.app/join/nelk?ref=nelk-ig', clicks: 3890, signups: 845, conversions: 234, revenue: 93366, created: '2026-02-20', active: true },
  { id: 3, code: 'nelk-yt', label: 'YouTube Description', url: 'fsp.app/join/nelk?ref=nelk-yt', clicks: 6200, signups: 1520, conversions: 410, revenue: 163590, created: '2026-03-01', active: true },
  { id: 4, code: 'nelk-pod', label: 'Podcast Promo', url: 'fsp.app/join/nelk?ref=nelk-pod', clicks: 890, signups: 210, conversions: 58, revenue: 23142, created: '2026-03-10', active: false },
]

export default function ReferralLinks() {
  const { id } = useParams()
  const arena = adminArenas.find(a => a.id === id) || adminArenas[0]
  const [links, setLinks] = useState(initialLinks)
  const [showCreate, setShowCreate] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newCode, setNewCode] = useState('')
  const [copied, setCopied] = useState(null)

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0)
  const totalSignups = links.reduce((s, l) => s + l.signups, 0)
  const totalConversions = links.reduce((s, l) => s + l.conversions, 0)
  const totalRevenue = links.reduce((s, l) => s + l.revenue, 0)

  const handleCreate = () => {
    if (!newLabel.trim() || !newCode.trim()) return
    const code = newCode.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setLinks([...links, {
      id: Date.now(),
      code,
      label: newLabel,
      url: `fsp.app/join/${arena.id}?ref=${code}`,
      clicks: 0,
      signups: 0,
      conversions: 0,
      revenue: 0,
      created: new Date().toISOString().slice(0, 10),
      active: true,
    }])
    setNewLabel('')
    setNewCode('')
    setShowCreate(false)
  }

  const toggleActive = (linkId) => {
    setLinks(links.map(l => l.id === linkId ? { ...l, active: !l.active } : l))
  }

  const copyLink = (url, linkId) => {
    navigator.clipboard.writeText(`https://${url}`).catch(() => {})
    setCopied(linkId)
    setTimeout(() => setCopied(null), 2000)
  }

  const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString()
  const fmtMoney = (n) => `$${n.toLocaleString()}`

  return (
    <div className="rl-page">
      <div className="rl-header">
        <div>
          <Link to={`/admin/arenas/${arena.id}`} className="rl-back">&larr; Back to {arena.name}</Link>
          <h1 className="rl-title">Referral Links</h1>
          <p className="rl-subtitle">Create and track referral links for {arena.name}</p>
        </div>
        <button className="rl-create-btn" onClick={() => setShowCreate(true)}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          New Link
        </button>
      </div>

      <div className="rl-kpis">
        <div className="rl-kpi">
          <div className="rl-kpi-val">{fmt(totalClicks)}</div>
          <div className="rl-kpi-label">Total Clicks</div>
        </div>
        <div className="rl-kpi">
          <div className="rl-kpi-val">{fmt(totalSignups)}</div>
          <div className="rl-kpi-label">Signups</div>
        </div>
        <div className="rl-kpi">
          <div className="rl-kpi-val">{fmt(totalConversions)}</div>
          <div className="rl-kpi-label">Paid Joins</div>
        </div>
        <div className="rl-kpi">
          <div className="rl-kpi-val rl-kpi-blue">{fmtMoney(totalRevenue)}</div>
          <div className="rl-kpi-label">Revenue Generated</div>
        </div>
      </div>

      {showCreate && (
        <div className="rl-create-card">
          <h3 className="rl-create-title">Create Referral Link</h3>
          <div className="rl-create-fields">
            <div className="rl-field">
              <label>Label</label>
              <input
                type="text"
                placeholder="e.g. Instagram Bio"
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
              />
            </div>
            <div className="rl-field">
              <label>Code</label>
              <div className="rl-code-input">
                <span className="rl-code-prefix">fsp.app/join/{arena.id}?ref=</span>
                <input
                  type="text"
                  placeholder="my-code"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="rl-create-actions">
            <button className="rl-btn-cancel" onClick={() => setShowCreate(false)}>Cancel</button>
            <button className="rl-btn-save" onClick={handleCreate}>Create Link</button>
          </div>
        </div>
      )}

      <div className="rl-section-title">Active Links ({links.filter(l => l.active).length})</div>

      <div className="rl-links">
        {links.filter(l => l.active).map(link => (
          <div key={link.id} className="rl-link-card">
            <div className="rl-link-top">
              <div>
                <div className="rl-link-label">{link.label}</div>
                <div className="rl-link-url">{link.url}</div>
              </div>
              <div className="rl-link-actions">
                <button
                  className={`rl-copy-btn ${copied === link.id ? 'copied' : ''}`}
                  onClick={() => copyLink(link.url, link.id)}
                >
                  {copied === link.id ? 'Copied' : 'Copy'}
                </button>
                <button className="rl-toggle-btn" onClick={() => toggleActive(link.id)}>Disable</button>
              </div>
            </div>
            <div className="rl-link-stats">
              <div className="rl-link-stat">
                <span className="rl-stat-val">{fmt(link.clicks)}</span>
                <span className="rl-stat-label">Clicks</span>
              </div>
              <div className="rl-link-stat">
                <span className="rl-stat-val">{fmt(link.signups)}</span>
                <span className="rl-stat-label">Signups</span>
              </div>
              <div className="rl-link-stat">
                <span className="rl-stat-val">{fmt(link.conversions)}</span>
                <span className="rl-stat-label">Paid</span>
              </div>
              <div className="rl-link-stat">
                <span className="rl-stat-val">{fmtMoney(link.revenue)}</span>
                <span className="rl-stat-label">Revenue</span>
              </div>
              <div className="rl-link-stat">
                <span className="rl-stat-val">{link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0}%</span>
                <span className="rl-stat-label">Conv. Rate</span>
              </div>
            </div>
            <div className="rl-link-meta">Created {link.created}</div>
          </div>
        ))}
      </div>

      {links.some(l => !l.active) && (
        <>
          <div className="rl-section-title rl-section-inactive">Inactive Links ({links.filter(l => !l.active).length})</div>
          <div className="rl-links">
            {links.filter(l => !l.active).map(link => (
              <div key={link.id} className="rl-link-card rl-link-inactive">
                <div className="rl-link-top">
                  <div>
                    <div className="rl-link-label">{link.label}</div>
                    <div className="rl-link-url">{link.url}</div>
                  </div>
                  <button className="rl-toggle-btn rl-enable-btn" onClick={() => toggleActive(link.id)}>Enable</button>
                </div>
                <div className="rl-link-stats">
                  <div className="rl-link-stat"><span className="rl-stat-val">{fmt(link.clicks)}</span><span className="rl-stat-label">Clicks</span></div>
                  <div className="rl-link-stat"><span className="rl-stat-val">{fmt(link.conversions)}</span><span className="rl-stat-label">Paid</span></div>
                  <div className="rl-link-stat"><span className="rl-stat-val">{fmtMoney(link.revenue)}</span><span className="rl-stat-label">Revenue</span></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
