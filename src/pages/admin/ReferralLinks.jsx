import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { adminArenas } from '../../data/mockData'
import './ReferralLinks.css'

const initialAffiliates = [
  {
    id: 1, name: 'SteveWillDoIt', code: 'steve', commission: 8,
    clicks: 6200, signups: 1520, paid: 410, revenue: 163590,
    created: '2026-02-20',
  },
  {
    id: 2, name: 'Bradley Martyn', code: 'brad', commission: 6,
    clicks: 3890, signups: 845, paid: 234, revenue: 93366,
    created: '2026-03-01',
  },
  {
    id: 3, name: 'Danny Duncan', code: 'danny', commission: 5,
    clicks: 890, signups: 210, paid: 58, revenue: 23142,
    created: '2026-03-10',
  },
  {
    id: 4, name: 'Bob Menery', code: 'bob', commission: 5,
    clicks: 1450, signups: 320, paid: 78, revenue: 31122,
    created: '2026-03-05',
  },
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

  const generateCode = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const handleAdd = () => {
    if (!newName.trim()) return
    const code = generateCode(newName)
    setAffiliates([...affiliates, {
      id: Date.now(),
      name: newName.trim(),
      code,
      commission: newCommission,
      clicks: 0, signups: 0, paid: 0, revenue: 0,
      created: new Date().toISOString().slice(0, 10),
    }])
    setNewName('')
    setNewCommission(5)
  }

  const copyLink = (code, affId) => {
    navigator.clipboard.writeText(`https://fsp.app/join/${arena.id}?ref=${code}`).catch(() => {})
    setCopied(affId)
    setTimeout(() => setCopied(null), 2000)
  }

  const fmt = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toString()
  }
  const fmtMoney = (n) => `$${n.toLocaleString()}`

  // Detail view for a selected affiliate
  if (selected) {
    const convRate = selected.clicks > 0 ? ((selected.paid / selected.clicks) * 100).toFixed(1) : 0
    const signupRate = selected.clicks > 0 ? ((selected.signups / selected.clicks) * 100).toFixed(1) : 0
    const paidRate = selected.signups > 0 ? ((selected.paid / selected.signups) * 100).toFixed(1) : 0
    const earned = Math.round(selected.revenue * selected.commission / 100)

    return (
      <div className="am-page">
        <button className="am-back" onClick={() => setSelectedId(null)}>&larr; All Affiliates</button>

        <div className="am-profile">
          <div className="am-profile-avatar">{selected.name.charAt(0)}</div>
          <div>
            <h1 className="am-profile-name">{selected.name}</h1>
            <div className="am-profile-link">
              fsp.app/join/{arena.id}?ref={selected.code}
              <button
                className={`am-copy ${copied === selected.id ? 'copied' : ''}`}
                onClick={() => copyLink(selected.code, selected.id)}
              >
                {copied === selected.id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="am-profile-commission">{selected.commission}% commission</div>
            <div className="am-profile-date">Added {selected.created}</div>
          </div>
        </div>

        {/* Funnel */}
        <div className="am-funnel">
          <div className="am-funnel-step">
            <div className="am-funnel-val">{fmt(selected.clicks)}</div>
            <div className="am-funnel-label">Clicks</div>
          </div>
          <div className="am-funnel-arrow">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M0 6h16M13 1l5 5-5 5" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="am-funnel-rate">{signupRate}%</span>
          </div>
          <div className="am-funnel-step">
            <div className="am-funnel-val">{fmt(selected.signups)}</div>
            <div className="am-funnel-label">Signups</div>
          </div>
          <div className="am-funnel-arrow">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M0 6h16M13 1l5 5-5 5" stroke="#B1B1B1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="am-funnel-rate">{paidRate}%</span>
          </div>
          <div className="am-funnel-step am-funnel-highlight">
            <div className="am-funnel-val">{fmt(selected.paid)}</div>
            <div className="am-funnel-label">Paid Joins</div>
          </div>
        </div>

        {/* KPIs */}
        <div className="am-kpis">
          <div className="am-kpi">
            <div className="am-kpi-val am-blue">{fmtMoney(selected.revenue)}</div>
            <div className="am-kpi-label">Revenue Generated</div>
          </div>
          <div className="am-kpi">
            <div className="am-kpi-val">{convRate}%</div>
            <div className="am-kpi-label">Click to Purchase</div>
          </div>
          <div className="am-kpi">
            <div className="am-kpi-val">{selected.paid > 0 ? fmtMoney(Math.round(selected.revenue / selected.paid)) : '--'}</div>
            <div className="am-kpi-label">Revenue per Join</div>
          </div>
          <div className="am-kpi">
            <div className="am-kpi-val am-green">{fmtMoney(earned)}</div>
            <div className="am-kpi-label">{selected.commission}% Commission Earned</div>
          </div>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div className="am-page">
      <Link to={`/admin/arenas/${arena.id}`} className="am-back">&larr; {arena.name}</Link>
      <h1 className="am-title">Affiliate Manager</h1>
      <p className="am-subtitle">Generate referral links for collaborators and track their performance.</p>

      {/* Add person */}
      <div className="am-add">
        <input
          className="am-add-input"
          type="text"
          placeholder="Enter name..."
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <div className="am-add-pct">
          <input
            className="am-add-pct-input"
            type="number"
            min="0"
            max="100"
            value={newCommission}
            onChange={e => setNewCommission(Math.min(100, Math.max(0, Number(e.target.value))))}
          />
          <span className="am-add-pct-sign">%</span>
        </div>
        <button className="am-add-btn" onClick={handleAdd} disabled={!newName.trim()}>Generate Link</button>
      </div>

      {/* List */}
      <div className="am-list">
        {affiliates.map(aff => (
          <div key={aff.id} className="am-item" onClick={() => setSelectedId(aff.id)}>
            <div className="am-item-left">
              <div className="am-item-avatar">{aff.name.charAt(0)}</div>
              <div>
                <div className="am-item-name">{aff.name}</div>
                <div className="am-item-link">fsp.app/join/{arena.id}?ref={aff.code}</div>
              </div>
            </div>
            <div className="am-item-right">
              <div className="am-item-stats">
                <span>{aff.commission}%</span>
                <span>{fmt(aff.clicks)} clicks</span>
                <span>{fmt(aff.paid)} paid</span>
                <span className="am-item-revenue">{fmtMoney(aff.revenue)}</span>
              </div>
              <button
                className={`am-copy ${copied === aff.id ? 'copied' : ''}`}
                onClick={e => { e.stopPropagation(); copyLink(aff.code, aff.id) }}
              >
                {copied === aff.id ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
