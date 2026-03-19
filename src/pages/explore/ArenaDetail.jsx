import { useParams, useNavigate, Link } from 'react-router-dom';
import { arenas } from '../../data/mockData';
import './ArenaDetail.css';

export default function ArenaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const arena = arenas.find((a) => a.id === id);

  if (!arena) {
    return (
      <div className="ad-page">
        <div className="ad-container">
          <p className="ad-not-found">Arena not found.</p>
          <Link to="/arenas" className="ad-back-link">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const premierFill = arena.divisions.premierCap;

  return (
    <div className="ad-page">
      {/* Cover */}
      <div
        className="ad-cover"
        style={{ background: arena.coverGradient }}
      >
        <button className="ad-back" onClick={() => navigate('/arenas')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="ad-content">
        {/* Host */}
        <div className="ad-host">
          <div className="ad-host__avatar">
            {arena.hostInitial}
          </div>
          <div className="ad-host__info">
            <span className="ad-host__name">{arena.hostName}</span>
            <span className="ad-host__label">HOST</span>
          </div>
        </div>

        <h1 className="ad-title">{arena.title}</h1>
        <p className="ad-desc">{arena.description}</p>

        {/* KPI row */}
        <div className="ad-kpis">
          <div className="ad-kpi">
            <span className="ad-kpi__value">{arena.joined}</span>
            <span className="ad-kpi__label">Joined</span>
          </div>
          <div className="ad-kpi">
            <span className="ad-kpi__value">{arena.sportCount}</span>
            <span className="ad-kpi__label">Sports</span>
          </div>
          <div className="ad-kpi">
            <span className="ad-kpi__value">{arena.daysLeft}</span>
            <span className="ad-kpi__label">Days Left</span>
          </div>
        </div>

        <hr className="ad-divider" />

        {/* Reward */}
        <section className="ad-section">
          <h2 className="ad-section__heading">REWARD</h2>
          <div className="ad-reward">
            <div className="ad-reward__img" style={{ background: arena.coverGradient }} />
            <div className="ad-reward__text">
              <h3 className="ad-reward__title">{arena.reward.title}</h3>
              <p className="ad-reward__desc">{arena.reward.description}</p>
            </div>
          </div>
        </section>

        <hr className="ad-divider" />

        {/* Divisions */}
        <section className="ad-section">
          <h2 className="ad-section__heading">DIVISIONS</h2>

          <div className="ad-division">
            <div className="ad-division__row">
              <span className="ad-division__name">Premier</span>
              <span className="ad-division__cap">{premierFill}% full</span>
            </div>
            <div className="ad-division__bar">
              <div
                className="ad-division__fill"
                style={{ width: `${premierFill}%` }}
              />
            </div>
          </div>

          <div className="ad-division">
            <div className="ad-division__row">
              <span className="ad-division__name">Challenger</span>
              <span className="ad-division__cap">Open</span>
            </div>
          </div>
        </section>

        <hr className="ad-divider" />

        {/* Entry */}
        <section className="ad-section">
          <h2 className="ad-section__heading">ENTRY</h2>
          <p className="ad-entry-price">
            ${arena.entryFee.toLocaleString()} or {arena.spBurn.toLocaleString()} SP
          </p>
        </section>

        {/* Spacer for sticky CTA */}
        <div className="ad-spacer" />
      </div>

      {/* Sticky CTA */}
      <div className="ad-sticky">
        <Link to={`/arenas/${arena.id}/join`} className="ad-sticky__btn">
          JOIN THIS ARENA
        </Link>
      </div>
    </div>
  );
}
