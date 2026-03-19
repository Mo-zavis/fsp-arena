import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { arenas } from '../../data/mockData';
import './JoinFlow.css';

const PAYMENT_OPTIONS = [
  { id: 'apple', label: 'Apple Pay', icon: '' },
  { id: 'card', label: 'Card', icon: '' },
  { id: 'affirm', label: 'Affirm', icon: '' },
];

export default function JoinFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const arena = arenas.find((a) => a.id === id);

  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState(arena?.sport || '');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [useSP, setUseSP] = useState(false);

  if (!arena) {
    return (
      <div className="jf-page">
        <div className="jf-container">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '100px 16px' }}>
            Arena not found.
          </p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(`/arenas/${id}`);
    }
  };

  const handleConfirm = () => {
    navigate(`/arenas/${id}/joined`);
  };

  const sports = [arena.sport];

  return (
    <div className="jf-page">
      {/* Top bar */}
      <div className="jf-topbar">
        <button className="jf-topbar__back" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="jf-topbar__title">Join {arena.name}</span>
      </div>

      <div className="jf-container">
        {/* Stepper */}
        <div className="jf-stepper">
          {[1, 2, 3].map((s) => (
            <div key={s} className="jf-stepper__item">
              <div
                className={`jf-stepper__circle ${
                  s < step
                    ? 'jf-stepper__circle--done'
                    : s === step
                      ? 'jf-stepper__circle--active'
                      : ''
                }`}
              >
                {s < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div className={`jf-stepper__line ${s < step ? 'jf-stepper__line--done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Sport */}
        {step === 1 && (
          <div className="jf-step">
            <h2 className="jf-step__title">Select Sport</h2>

            <div className="jf-sports">
              {sports.map((sport) => (
                <button
                  key={sport}
                  className={`jf-sport-card ${selectedSport === sport ? 'jf-sport-card--selected' : ''}`}
                  onClick={() => setSelectedSport(sport)}
                >
                  <span className="jf-sport-card__name">{sport}</span>
                  {selectedSport === sport && (
                    <svg className="jf-sport-card__check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fsp-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {arena.subsidy > 0 && (
              <div className="jf-subsidy">
                This arena offers a {arena.subsidy}% entry subsidy for early joiners.
              </div>
            )}

            <button
              className="jf-btn jf-btn--primary"
              disabled={!selectedSport}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="jf-step">
            <h2 className="jf-step__title">Review</h2>

            <div className="jf-summary">
              <div className="jf-summary__row">
                <span className="jf-summary__label">Arena</span>
                <span className="jf-summary__value">{arena.name}</span>
              </div>
              <div className="jf-summary__row">
                <span className="jf-summary__label">Sport</span>
                <span className="jf-summary__value">{selectedSport}</span>
              </div>
              <div className="jf-summary__row">
                <span className="jf-summary__label">Entry Fee</span>
                <span className="jf-summary__value">${arena.entryFee}</span>
              </div>
            </div>

            {/* Reward preview */}
            <div className="jf-reward-preview">
              <h3 className="jf-reward-preview__heading">REWARD</h3>
              <div className="jf-reward-preview__body">
                <div className="jf-reward-preview__img" style={{ background: arena.coverGradient }} />
                <div className="jf-reward-preview__text">
                  <h4 className="jf-reward-preview__title">{arena.reward.title}</h4>
                  <p className="jf-reward-preview__desc">{arena.reward.description}</p>
                </div>
              </div>
            </div>

            {/* Captain Path */}
            <div className="jf-captain-info">
              <h4 className="jf-captain-info__title">Captain Path</h4>
              <p className="jf-captain-info__text">
                As a Captain, you build a squad through referrals, climb tiers, and earn a share of the Captain Pool. Grow deeper squads for higher NCS scores and bigger payouts.
              </p>
            </div>

            <button
              className="jf-btn jf-btn--primary"
              onClick={() => setStep(3)}
            >
              Continue to Pay
            </button>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="jf-step">
            <h2 className="jf-step__title">Payment</h2>

            <div className="jf-payment-options">
              {PAYMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  className={`jf-pay-row ${selectedPayment === opt.id ? 'jf-pay-row--selected' : ''}`}
                  onClick={() => { setSelectedPayment(opt.id); setUseSP(false); }}
                >
                  <div className="jf-pay-row__icon">
                    {opt.id === 'apple' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C4.24 16.7 4.89 10.37 8.7 10.14c1.28.07 2.17.74 2.92.79.99-.2 1.95-.9 3.01-.81 1.27.1 2.22.63 2.85 1.6-2.62 1.57-2 4.99.38 5.95-.47 1.22-.89 2.4-1.81 3.61ZM12.05 10.07c-.14-2.24 1.68-4.13 3.79-4.32.3 2.56-2.33 4.46-3.79 4.32Z"/>
                      </svg>
                    )}
                    {opt.id === 'card' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                        <line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    )}
                    {opt.id === 'affirm' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="16"/>
                        <line x1="8" y1="12" x2="16" y2="12"/>
                      </svg>
                    )}
                  </div>
                  <span className="jf-pay-row__label">{opt.label}</span>
                  {selectedPayment === opt.id && !useSP && (
                    <svg className="jf-pay-row__check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fsp-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <hr className="jf-divider" />

            {/* SP Burn option */}
            <button
              className={`jf-sp-burn ${useSP ? 'jf-sp-burn--selected' : ''}`}
              onClick={() => { setUseSP(!useSP); if (!useSP) setSelectedPayment(''); }}
            >
              <div className="jf-sp-burn__left">
                <span className="jf-sp-burn__label">Burn {arena.spBurn.toLocaleString()} SP instead</span>
                <span className="jf-sp-burn__sub">Use Social Points to cover entry</span>
              </div>
              {useSP && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fsp-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>

            {/* Total */}
            <div className="jf-total">
              <span className="jf-total__label">Total</span>
              <span className="jf-total__value">
                {useSP
                  ? `${arena.spBurn.toLocaleString()} SP`
                  : `$${arena.entryFee}`}
              </span>
            </div>

            <button
              className="jf-btn jf-btn--primary"
              disabled={!selectedPayment && !useSP}
              onClick={handleConfirm}
            >
              CONFIRM & JOIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
