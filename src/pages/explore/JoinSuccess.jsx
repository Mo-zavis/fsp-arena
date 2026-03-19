import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { arenas } from '../../data/mockData';
import './JoinSuccess.css';

export default function JoinSuccess() {
  const { id } = useParams();
  const arena = arenas.find((a) => a.id === id);
  const [copied, setCopied] = useState(false);

  const referralLink = `https://fsp.arena/join/${id}?ref=you`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${arena?.name || 'this arena'} on FSP Arena`,
          text: `I just joined ${arena?.name || 'an arena'} on FSP Arena. Join my squad!`,
          url: referralLink,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  };

  if (!arena) {
    return (
      <div className="js-page">
        <p style={{ textAlign: 'center', color: 'var(--fsp-text-dim)', padding: '100px 16px' }}>
          Arena not found.
        </p>
      </div>
    );
  }

  return (
    <div className="js-page">
      <div className="js-container">
        {/* Checkmark */}
        <div className="js-check">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="js-title">You're In</h1>
        <p className="js-subtitle">
          {arena.name} &middot; {arena.sport}
        </p>

        <hr className="js-divider" />

        {/* Build Your Squad */}
        <section className="js-section">
          <h2 className="js-section__title">Build Your Squad</h2>
          <p className="js-section__text">
            Share your referral link to recruit squad members. The deeper your squad, the higher your NCS score and captain payouts.
          </p>
        </section>

        {/* Referral link */}
        <div className="js-referral">
          <span className="js-referral__link">{referralLink}</span>
          <button className="js-referral__copy" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Actions */}
        <button className="js-btn js-btn--primary" onClick={handleShare}>
          SHARE WITH FRIENDS
        </button>

        <Link to={`/arenas/${arena.id}`} className="js-btn js-btn--outline">
          GO TO ARENA HOME
        </Link>
      </div>
    </div>
  );
}
