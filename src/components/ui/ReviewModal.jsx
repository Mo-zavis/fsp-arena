import { useState } from 'react';
import { useArenas } from '../../ArenaContext';
import './ReviewModal.css';

export default function ReviewModal({ onClose }) {
  const { addAiArena, aiArena } = useArenas();
  const [isLive, setIsLive] = useState(false);
  const arena = aiArena.player;
  const admin = aiArena.admin;

  const handleGoLive = () => {
    addAiArena();
    setIsLive(true);
  };

  if (isLive) {
    return (
      <div className="review-modal__backdrop" onClick={onClose}>
        <div className="review-modal" onClick={e => e.stopPropagation()}>
          <div className="review-modal__success">
            <div className="review-modal__success-check">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="review-modal__success-title">Arena is Live!</div>
            <div className="review-modal__success-desc">
              <strong>{arena.name}</strong> has been created and is now visible on the dashboard and to all users.
            </div>
            <button className="review-modal__success-btn" onClick={onClose}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-modal__backdrop" onClick={onClose}>
      <div className="review-modal" onClick={e => e.stopPropagation()}>
        {/* Banner */}
        <div className="review-modal__banner" style={{ background: arena.coverGradient }}>
          <div className="review-modal__badge">AI Generated</div>
          <div className="review-modal__title-bar">
            <div className="review-modal__avatar">{arena.hostInitial}</div>
            <div className="review-modal__title">{arena.title}</div>
          </div>
        </div>

        {/* Content */}
        <div className="review-modal__content">
          <div className="review-modal__desc">{arena.description}</div>

          {/* Basics */}
          <div className="review-modal__section">
            <div className="review-modal__section-title">Arena Basics</div>
            <div className="review-modal__grid">
              <div className="review-modal__field">
                <div className="review-modal__field-label">Arena Name</div>
                <div className="review-modal__field-value">{arena.name}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Host</div>
                <div className="review-modal__field-value">{arena.hostName}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Season Start</div>
                <div className="review-modal__field-value">{new Date(arena.seasonStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Season End</div>
                <div className="review-modal__field-value">{new Date(arena.seasonEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </div>
          </div>

          {/* Sports */}
          <div className="review-modal__section">
            <div className="review-modal__section-title">Sports</div>
            <div className="review-modal__grid">
              <div className="review-modal__field">
                <div className="review-modal__field-label">Primary Sport</div>
                <div className="review-modal__field-value review-modal__field-value--blue">Basketball</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Secondary Sport</div>
                <div className="review-modal__field-value review-modal__field-value--blue">Soccer</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Entry Fee</div>
                <div className="review-modal__field-value review-modal__field-value--mono">${arena.entryFee}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Multi-Sport Subsidy</div>
                <div className="review-modal__field-value">{arena.subsidy}% off 2nd sport</div>
              </div>
            </div>
          </div>

          {/* Reward */}
          <div className="review-modal__section">
            <div className="review-modal__section-title">Reward</div>
            <div className="review-modal__grid">
              <div className="review-modal__field review-modal__field--full">
                <div className="review-modal__field-label">Prize</div>
                <div className="review-modal__field-value">{arena.reward.title}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Performance Slots</div>
                <div className="review-modal__field-value review-modal__field-value--mono">{arena.reward.performanceSlots}</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Golden Tickets</div>
                <div className="review-modal__field-value review-modal__field-value--mono">{arena.reward.goldenTicketSlots}</div>
              </div>
            </div>
          </div>

          {/* Divisions */}
          <div className="review-modal__section">
            <div className="review-modal__section-title">Divisions & Tiers</div>
            <div className="review-modal__grid" style={{ marginBottom: 10 }}>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Premier Division</div>
                <div className="review-modal__field-value review-modal__field-value--mono">{arena.divisions.premierCap} seats</div>
              </div>
              <div className="review-modal__field">
                <div className="review-modal__field-label">Challenger Division</div>
                <div className="review-modal__field-value">Open (unlimited)</div>
              </div>
            </div>
            <div className="review-modal__tier-row">
              <div className="review-modal__tier-pill review-modal__tier-pill--gold">
                <div className="review-modal__tier-pill-pct">{arena.divisions.tiers.gold}%</div>
                <div className="review-modal__tier-pill-label">Gold</div>
              </div>
              <div className="review-modal__tier-pill review-modal__tier-pill--silver">
                <div className="review-modal__tier-pill-pct">{arena.divisions.tiers.silver}%</div>
                <div className="review-modal__tier-pill-label">Silver</div>
              </div>
              <div className="review-modal__tier-pill review-modal__tier-pill--bronze">
                <div className="review-modal__tier-pill-pct">{arena.divisions.tiers.bronze}%</div>
                <div className="review-modal__tier-pill-label">Bronze</div>
              </div>
            </div>
          </div>

          {/* Revenue Splits */}
          <div className="review-modal__section">
            <div className="review-modal__section-title">Revenue Splits</div>
            <div className="review-modal__split-bar">
              <div className="review-modal__split-seg review-modal__split-seg--host" style={{ width: `${arena.splits.host}%` }}>
                Host {arena.splits.host}%
              </div>
              <div className="review-modal__split-seg review-modal__split-seg--captain" style={{ width: `${arena.splits.captainPool}%` }}>
                {arena.splits.captainPool}%
              </div>
              <div className="review-modal__split-seg review-modal__split-seg--platform" style={{ width: `${arena.splits.platform}%` }}>
                Platform {arena.splits.platform}%
              </div>
            </div>
          </div>

          <hr className="review-modal__divider" />

          {/* Footer */}
          <div className="review-modal__footer">
            <div className="review-modal__footer-note">
              Review the details above. Once you go live, the arena will be visible to all users.
            </div>
            <button className="review-modal__go-live" onClick={handleGoLive}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8L6 12L14 4" />
              </svg>
              Go Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
