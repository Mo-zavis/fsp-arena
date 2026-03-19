import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminArenas } from '../../data/mockData'
import './ReferralLinks.css'

const initialAffiliates = [
  { id: 1, name: 'SteveWillDoIt', code: 'steve', commission: 8, clicks: 6200, signups: 1520, paid: 410, revenue: 163590, created: '2026-02-20' },
  { id: 2, name: 'Bradley Martyn', code: 'brad', commission: 6, clicks: 3890, signups: 845, paid: 234, revenue: 93366, created: '2026-03-01' },
  { id: 3, name: 'Danny Duncan', code: 'danny', commission: 5, clicks: 890, signups: 210, paid: 58, revenue: 23142, created: '2026-03-10' },
  { id: 4, name: 'Bob Menery', code: 'bob', commission: 5, clicks: 1450, signups: 320, paid: 78, revenue: 31122, created: '2026-03-05' },
]

export default function AffiliateManager() {
  const { id } = useParams()
  const arena = adminArenas.find(a => a.id === id) || adminArenas[0]
  const [affiliates, setAffiliates] = useState(initialAffiliates)
  const [newName, setNewName] = useState('')
  const [newCommission, setNewCommission] = useState(5)
  const [selectedId, setSelectedId] = useState(null)
  const [copied, setCopied] = useState(null)

  const selected = affiliates.find(a => a.id === selectedId)
  const genCode = n => n.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const handleAdd = () => {
    if (!newName.trim()) return
    setAffiliates([...affiliates, { id: Date.now(), name: newName.trim(), code: genCode(newName), commission: newCommission, clicks: 0, signups: 0, paid: 0, revenue: 0, created: new Date().toISOString().slice(0, 10) }])
    setNewName(''); setNewCommission(5)
  }

  const copyLink = (code, affId) => {
    navigator.clipboard.writeText(`https://fsp.app/join/${arena.id}?ref=${code}`).catch(() => {})
    setCopied(affId); setTimeout(() => setCopied(null), 2000)
  }

  const fmt = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : n.toString()
  const fmtM = n => `$${n.toLocaleString()}`

  // ── Detail view ──
  if (selected) {
    const signupRate = selected.clicks > 0 ? ((selected.signups / selected.clicks) * 100).toFixed(1) : 0
    const paidRate = selected.signups > 0 ? ((selected.paid / selected.signups) * 100).toFixed(1) : 0
    const convRate = selected.clicks > 0 ? ((selected.paid / selected.clicks) * 100).toFixed(1) : 0
    const earned = Math.round(selected.revenue * selected.commission / 100)

    return (
      <>
        <button className="aff-back" onClick={() => setSelectedId(null)}>← All Affiliates</button>

        <div className="aff-profile">
          <div className="aff-profile-avatar">{selected.name.charAt(0)}</div>
          <div>
            <div className="aff-profile-name">{selected.name}</div>
            <div className="aff-profile-link">
              fsp.app/join/{arena.id}?ref={selected.code}
              <button className={`aff-copy${copied === selected.id ? ' copied' : ''}`} onClick={() => copyLink(selected.code, selected.id)}>
                {copied === selected.id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="aff-profile-meta">
              <span className="aff-profile-badge">{selected.commission}% commission</span>
              <span>Added {selected.created}</span>
            </div>
          </div>
        </div>

        {/* Funnel */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="card-header"><div className="card-title">Conversion Funnel</div></div>
          <div className="aff-funnel">
            <div className="aff-funnel-step"><div className="aff-funnel-val">{fmt(selected.clicks)}</div><div className="aff-funnel-label">Clicks</div></div>
            <div className="aff-funnel-arrow"><svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M0 6h16M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span className="aff-funnel-rate">{signupRate}%</span></div>
            <div className="aff-funnel-step"><div className="aff-funnel-val">{fmt(selected.signups)}</div><div className="aff-funnel-label">Signups</div></div>
            <div className="aff-funnel-arrow"><svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M0 6h16M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg><span className="aff-funnel-rate">{paidRate}%</span></div>
            <div className="aff-funnel-step aff-funnel-highlight"><div className="aff-funnel-val">{fmt(selected.paid)}</div><div className="aff-funnel-label">Paid Joins</div></div>
          </div>
        </div>

        {/* KPIs */}
        <div className="kpi-row">
          <div className="kpi-card"><div className="kpi-label">Revenue Generated</div><div className="kpi-value blue">{fmtM(selected.revenue)}</div></div>
          <div className="kpi-card"><div className="kpi-label">Click → Purchase</div><div className="kpi-value">{convRate}%</div></div>
          <div className="kpi-card"><div className="kpi-label">Revenue / Join</div><div className="kpi-value">{selected.paid > 0 ? fmtM(Math.round(selected.revenue / selected.paid)) : '--'}</div></div>
          <div className="kpi-card"><div className="kpi-label">{selected.commission}% Earned</div><div className="kpi-value" style={{ color: 'var(--green)' }}>{fmtM(earned)}</div></div>
        </div>
      </>
    )
  }

  // ── List view ──
  return (
    <>
      <Link to={`/admin/arenas/${arena.id}`} className="aff-back">← {arena.name}</Link>
      <div className="aff-title">Affiliate Manager</div>
      <div className="aff-subtitle">Generate referral links for collaborators and track performance.</div>

      {/* Add */}
      <div className="aff-add">
        <input className="aff-add-input" type="text" placeholder="Enter name..." value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <div className="aff-add-pct">
          <input className="aff-add-pct-input" type="number" min="0" max="100" value={newCommission} onChange={e => setNewCommission(Math.min(100, Math.max(0, Number(e.target.value))))} />
          <span className="aff-add-pct-sign">%</span>
        </div>
        <button className="btn-primary aff-add-btn" onClick={handleAdd} disabled={!newName.trim()}>Generate Link</button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header"><div className="card-title">Active Affiliates</div></div>
        {affiliates.map(aff => (
          <div key={aff.id} className="aff-row" onClick={() => setSelectedId(aff.id)}>
            <div className="aff-row-avatar">{aff.name.charAt(0)}</div>
            <div className="aff-row-info">
              <div className="aff-row-name">{aff.name}</div>
              <div className="aff-row-link">fsp.app/join/{arena.id}?ref={aff.code}</div>
            </div>
            <div className="aff-row-stats">
              <div className="aff-row-stat"><span className="aff-row-stat-val">{aff.commission}%</span><span className="aff-row-stat-label">Comm.</span></div>
              <div className="aff-row-stat"><span className="aff-row-stat-val">{fmt(aff.clicks)}</span><span className="aff-row-stat-label">Clicks</span></div>
              <div className="aff-row-stat"><span className="aff-row-stat-val">{fmt(aff.paid)}</span><span className="aff-row-stat-label">Paid</span></div>
              <div className="aff-row-stat aff-row-revenue"><span className="aff-row-stat-val">{fmtM(aff.revenue)}</span><span className="aff-row-stat-label">Revenue</span></div>
            </div>
            <button className={`aff-copy${copied === aff.id ? ' copied' : ''}`} onClick={e => { e.stopPropagation(); copyLink(aff.code, aff.id) }}>
              {copied === aff.id ? 'Copied' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
