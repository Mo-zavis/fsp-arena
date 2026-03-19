import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { availableSports } from '../../data/mockData';
import './CreateArena.css';

const ENTRY_FEE = 399;

export default function CreateArena() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  /* ── Step 1: Basics ── */
  const [arenaName, setArenaName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [seasonStart, setSeasonStart] = useState('');
  const [seasonEnd, setSeasonEnd] = useState('');

  /* ── Step 2: Sports ── */
  const [selectedSport, setSelectedSport] = useState('');
  const [addedSports, setAddedSports] = useState([]);
  const [subsidy, setSubsidy] = useState(50);

  /* ── Step 3: Reward ── */
  const [rewardTitle, setRewardTitle] = useState('');
  const [rewardDesc, setRewardDesc] = useState('');
  const [heroImage, setHeroImage] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);
  const [gallery, setGallery] = useState([null, null, null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState([null, null, null, null, null]);
  const [perfSlots, setPerfSlots] = useState(15);
  const [goldenSlots, setGoldenSlots] = useState(5);

  /* ── Step 4: Divisions ── */
  const [seatCap, setSeatCap] = useState(75);
  const [tierGold, setTierGold] = useState(50);
  const [tierSilver, setTierSilver] = useState(30);
  const [tierBronze, setTierBronze] = useState(20);

  /* ── Step 5: Revenue ── */
  const [splitHost, setSplitHost] = useState(60);
  const [splitCaptains, setSplitCaptains] = useState(15);
  const [splitPlatform, setSplitPlatform] = useState(25);
  const [calcPlayers, setCalcPlayers] = useState(10000);

  /* ── Helpers ── */
  const handleFile = (e, setFile, setPreview) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleGallery = (e, idx) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const newG = [...gallery];
    newG[idx] = f;
    setGallery(newG);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newP = [...galleryPreviews];
      newP[idx] = ev.target.result;
      setGalleryPreviews(newP);
    };
    reader.readAsDataURL(f);
  };

  const addSport = () => {
    if (selectedSport && !addedSports.includes(selectedSport)) {
      setAddedSports([...addedSports, selectedSport]);
      setSelectedSport('');
    }
  };

  const removeSport = (s) => setAddedSports(addedSports.filter((x) => x !== s));

  /* Tier allocation: keep sum at 100 */
  const setTierValue = (tier, val) => {
    val = Math.max(0, Math.min(100, val));
    if (tier === 'gold') {
      const remaining = 100 - val;
      const oldOther = tierSilver + tierBronze;
      if (oldOther === 0) {
        setTierGold(val);
        setTierSilver(Math.round(remaining / 2));
        setTierBronze(remaining - Math.round(remaining / 2));
      } else {
        setTierGold(val);
        const newSilver = Math.round((tierSilver / oldOther) * remaining);
        setTierSilver(newSilver);
        setTierBronze(remaining - newSilver);
      }
    } else if (tier === 'silver') {
      const remaining = 100 - val;
      const oldOther = tierGold + tierBronze;
      if (oldOther === 0) {
        setTierSilver(val);
        setTierGold(Math.round(remaining / 2));
        setTierBronze(remaining - Math.round(remaining / 2));
      } else {
        setTierSilver(val);
        const newGold = Math.round((tierGold / oldOther) * remaining);
        setTierGold(newGold);
        setTierBronze(remaining - newGold);
      }
    } else {
      const remaining = 100 - val;
      const oldOther = tierGold + tierSilver;
      if (oldOther === 0) {
        setTierBronze(val);
        setTierGold(Math.round(remaining / 2));
        setTierSilver(remaining - Math.round(remaining / 2));
      } else {
        setTierBronze(val);
        const newGold = Math.round((tierGold / oldOther) * remaining);
        setTierGold(newGold);
        setTierSilver(remaining - newGold);
      }
    }
  };

  /* Revenue splits: keep sum at 100 */
  const setSplitValue = (which, val) => {
    val = Math.max(0, Math.min(100, val));
    if (which === 'host') {
      const remaining = 100 - val;
      const oldOther = splitCaptains + splitPlatform;
      setSplitHost(val);
      if (oldOther === 0) {
        setSplitCaptains(Math.round(remaining / 2));
        setSplitPlatform(remaining - Math.round(remaining / 2));
      } else {
        const newCap = Math.round((splitCaptains / oldOther) * remaining);
        setSplitCaptains(newCap);
        setSplitPlatform(remaining - newCap);
      }
    } else if (which === 'captains') {
      const remaining = 100 - val;
      const oldOther = splitHost + splitPlatform;
      setSplitCaptains(val);
      if (oldOther === 0) {
        setSplitHost(Math.round(remaining / 2));
        setSplitPlatform(remaining - Math.round(remaining / 2));
      } else {
        const newHost = Math.round((splitHost / oldOther) * remaining);
        setSplitHost(newHost);
        setSplitPlatform(remaining - newHost);
      }
    } else {
      const remaining = 100 - val;
      const oldOther = splitHost + splitCaptains;
      setSplitPlatform(val);
      if (oldOther === 0) {
        setSplitHost(Math.round(remaining / 2));
        setSplitCaptains(remaining - Math.round(remaining / 2));
      } else {
        const newHost = Math.round((splitHost / oldOther) * remaining);
        setSplitHost(newHost);
        setSplitCaptains(remaining - newHost);
      }
    }
  };

  const secondSportPrice = addedSports.length >= 2
    ? Math.round(ENTRY_FEE * (1 - subsidy / 100))
    : null;

  const totalRevenue = calcPlayers * ENTRY_FEE;

  const handleLaunch = () => {
    alert('Arena submitted for review! You will be notified within 24 hours.');
    navigate('/arenas');
  };

  /* ── Slider component ── */
  const Slider = ({ label, value, onChange, min = 0, max = 100, color = 'var(--fsp-blue)' }) => (
    <div className="ca-slider-row">
      <span className="ca-slider-label">{label}</span>
      <div className="ca-slider-track">
        <div className="ca-slider-fill" style={{ width: `${value}%`, background: color }} />
        <input
          type="range"
          className="ca-slider-input"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <span className="ca-slider-value">{value}%</span>
    </div>
  );

  /* ── Step renderers ── */
  const renderStep1 = () => (
    <>
      <h2 className="ca-title">Create Your Arena</h2>
      <p className="ca-subtitle">Set up the basics for your competitive arena.</p>

      <div className="ca-field">
        <label className="ca-label">
          Arena Name <span className="ca-char-count">{arenaName.length}/50</span>
        </label>
        <input
          className="ca-input"
          type="text"
          maxLength={50}
          value={arenaName}
          onChange={(e) => setArenaName(e.target.value)}
          placeholder="e.g. NELK Boys Arena"
        />
      </div>

      <div className="ca-field">
        <label className="ca-label">
          Description <span className="ca-char-count">{description.length}/500</span>
        </label>
        <textarea
          className="ca-textarea"
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what makes your arena unique..."
        />
      </div>

      <div className="ca-field">
        <label className="ca-label">Cover Image</label>
        <div className={`ca-upload-zone ca-upload-cover${coverImage ? ' has-file' : ''}`}>
          {coverPreview
            ? <img src={coverPreview} alt="Cover" className="ca-upload-preview" />
            : 'Click to upload cover image (16:9)'}
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, setCoverImage, setCoverPreview)} />
        </div>
      </div>

      <div className="ca-field">
        <label className="ca-label">Logo</label>
        <div className={`ca-upload-zone ca-upload-logo${logo ? ' has-file' : ''}`}>
          {logoPreview
            ? <img src={logoPreview} alt="Logo" className="ca-upload-preview" />
            : 'Logo'}
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, setLogo, setLogoPreview)} />
        </div>
      </div>

      <div className="ca-date-row">
        <div className="ca-field">
          <label className="ca-label">Season Start</label>
          <input className="ca-input" type="date" value={seasonStart} onChange={(e) => setSeasonStart(e.target.value)} />
        </div>
        <div className="ca-field">
          <label className="ca-label">Season End</label>
          <input className="ca-input" type="date" value={seasonEnd} onChange={(e) => setSeasonEnd(e.target.value)} />
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2 className="ca-title">Add Sports</h2>
      <p className="ca-subtitle">Select which sports will be featured in your arena.</p>

      <div className="ca-select-row">
        <div className="ca-field">
          <label className="ca-label">Select Sport</label>
          <select className="ca-select" value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            <option value="">Choose a sport...</option>
            {availableSports
              .filter((s) => !addedSports.includes(s))
              .map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
          </select>
        </div>
      </div>

      <button className="ca-add-link" type="button" onClick={addSport} disabled={!selectedSport}>
        + Add another sport
      </button>

      {addedSports.length > 0 && (
        <>
          <h3 className="ca-section-title">Added</h3>
          {addedSports.map((s, i) => (
            <div className="ca-sport-item" key={s}>
              <span className="ca-sport-name">{s}</span>
              <span className="ca-sport-price">${ENTRY_FEE}</span>
              <button className="ca-sport-remove" type="button" onClick={() => removeSport(s)}>X</button>
            </div>
          ))}
        </>
      )}

      {addedSports.length >= 2 && (
        <>
          <h3 className="ca-section-title">Multi-Sport Subsidy</h3>
          <Slider label="Discount" value={subsidy} onChange={setSubsidy} />
          <p className="ca-subsidy-calc">
            2nd sport entry: ${secondSportPrice}
          </p>
        </>
      )}
    </>
  );

  const renderStep3 = () => (
    <>
      <h2 className="ca-title">Set the Reward</h2>
      <p className="ca-subtitle">Define what winners take home.</p>

      <div className="ca-field">
        <label className="ca-label">
          Reward Title <span className="ca-char-count">{rewardTitle.length}/60</span>
        </label>
        <input
          className="ca-input"
          type="text"
          maxLength={60}
          value={rewardTitle}
          onChange={(e) => setRewardTitle(e.target.value)}
          placeholder="e.g. Trip to Cancun + $10,000 Cash"
        />
      </div>

      <div className="ca-field">
        <label className="ca-label">
          Description <span className="ca-char-count">{rewardDesc.length}/1000</span>
        </label>
        <textarea
          className="ca-textarea"
          maxLength={1000}
          value={rewardDesc}
          onChange={(e) => setRewardDesc(e.target.value)}
          placeholder="Describe the reward in detail..."
        />
      </div>

      <div className="ca-field">
        <label className="ca-label">Hero Image</label>
        <div className={`ca-upload-zone ca-upload-hero${heroImage ? ' has-file' : ''}`}>
          {heroPreview
            ? <img src={heroPreview} alt="Hero" className="ca-upload-preview" />
            : 'Click to upload hero image'}
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, setHeroImage, setHeroPreview)} />
        </div>
      </div>

      <div className="ca-field">
        <label className="ca-label">Gallery</label>
        <div className="ca-upload-gallery-row">
          {gallery.map((_, i) => (
            <div className={`ca-upload-zone ca-upload-gallery-slot${gallery[i] ? ' has-file' : ''}`} key={i}>
              {galleryPreviews[i]
                ? <img src={galleryPreviews[i]} alt={`Gallery ${i + 1}`} className="ca-upload-preview" />
                : '+'}
              <input type="file" accept="image/*" onChange={(e) => handleGallery(e, i)} />
            </div>
          ))}
        </div>
      </div>

      <h3 className="ca-section-title">Winning Slots</h3>
      <div className="ca-number-row">
        <div className="ca-field">
          <label className="ca-label">Performance</label>
          <input
            className="ca-input-number"
            type="number"
            min={0}
            value={perfSlots}
            onChange={(e) => setPerfSlots(Number(e.target.value))}
          />
        </div>
        <div className="ca-field">
          <label className="ca-label">Golden Ticket</label>
          <input
            className="ca-input-number"
            type="number"
            min={0}
            value={goldenSlots}
            onChange={(e) => setGoldenSlots(Number(e.target.value))}
          />
        </div>
      </div>
    </>
  );

  const renderStep4 = () => {
    const goldSeats = Math.round(seatCap * tierGold / 100);
    const silverSeats = Math.round(seatCap * tierSilver / 100);
    const bronzeSeats = seatCap - goldSeats - silverSeats;

    return (
      <>
        <h2 className="ca-title">Divisions</h2>
        <p className="ca-subtitle">Configure your Premier and Challenger divisions.</p>

        <div className="ca-division-block">
          <div className="ca-division-name">Premier Division</div>
          <div className="ca-field">
            <label className="ca-label">Seat Cap</label>
            <input
              className="ca-input-number"
              type="number"
              min={1}
              value={seatCap}
              onChange={(e) => setSeatCap(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="ca-division-block">
          <div className="ca-division-name">Challenger Division</div>
          <p className="ca-division-note">Open capacity (unlimited)</p>
        </div>

        <h3 className="ca-section-title">Tier Allocation</h3>
        <Slider label="Gold" value={tierGold} onChange={(v) => setTierValue('gold', v)} color="#eab308" />
        <Slider label="Silver" value={tierSilver} onChange={(v) => setTierValue('silver', v)} color="#94a3b8" />
        <Slider label="Bronze" value={tierBronze} onChange={(v) => setTierValue('bronze', v)} color="#b45309" />
        <div className="ca-total-row">Total: {tierGold + tierSilver + tierBronze}%</div>

        <div className="ca-preview-box">
          <h4>Premier Seat Breakdown</h4>
          <div className="ca-preview-item"><span>Gold</span><span>{goldSeats} seats</span></div>
          <div className="ca-preview-item"><span>Silver</span><span>{silverSeats} seats</span></div>
          <div className="ca-preview-item"><span>Bronze</span><span>{bronzeSeats} seats</span></div>
        </div>
      </>
    );
  };

  const renderStep5 = () => (
    <>
      <h2 className="ca-title">Revenue Splits</h2>
      <p className="ca-subtitle">Decide how entry fees are distributed.</p>

      <Slider label="Host" value={splitHost} onChange={(v) => setSplitValue('host', v)} />
      <Slider label="Captains" value={splitCaptains} onChange={(v) => setSplitValue('captains', v)} />
      <Slider label="Platform" value={splitPlatform} onChange={(v) => setSplitValue('platform', v)} />
      <div className="ca-total-row">Total: {splitHost + splitCaptains + splitPlatform}%</div>

      <div className="ca-calc-section">
        <h4>Live Calculator</h4>
        <div className="ca-calc-prompt">
          <span>If</span>
          <input
            className="ca-calc-inline-input"
            type="number"
            min={0}
            value={calcPlayers}
            onChange={(e) => setCalcPlayers(Number(e.target.value))}
          />
          <span>players join at ${ENTRY_FEE}:</span>
        </div>
        <div className="ca-calc-total">${totalRevenue.toLocaleString()}</div>
        <div className="ca-calc-breakdown">Host ({splitHost}%): ${Math.round(totalRevenue * splitHost / 100).toLocaleString()}</div>
        <div className="ca-calc-breakdown">Captains ({splitCaptains}%): ${Math.round(totalRevenue * splitCaptains / 100).toLocaleString()}</div>
        <div className="ca-calc-breakdown">Platform ({splitPlatform}%): ${Math.round(totalRevenue * splitPlatform / 100).toLocaleString()}</div>
      </div>
    </>
  );

  const renderStep6 = () => {
    const goldSeats = Math.round(seatCap * tierGold / 100);
    const silverSeats = Math.round(seatCap * tierSilver / 100);
    const bronzeSeats = seatCap - goldSeats - silverSeats;

    return (
      <>
        <h2 className="ca-title">Review & Launch</h2>
        <p className="ca-subtitle">Confirm everything looks good before going live.</p>

        <div className="ca-summary-card">
          <div
            className="ca-summary-header"
            style={{ background: 'linear-gradient(135deg, #0000FF 0%, #1a1aff 100%)' }}
          >
            <h3 className="ca-summary-arena-name">{arenaName || 'Untitled Arena'}</h3>
            <div className="ca-summary-meta">
              {addedSports.join(', ') || 'No sports'} &middot; {seasonStart || '---'} to {seasonEnd || '---'}
            </div>
          </div>
          <div className="ca-summary-rows">
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Entry Fee</span>
              <span className="ca-summary-row-value">${ENTRY_FEE}</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Multi-Sport Subsidy</span>
              <span className="ca-summary-row-value">{subsidy}%</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Reward</span>
              <span className="ca-summary-row-value">{rewardTitle || '---'}</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Winners</span>
              <span className="ca-summary-row-value">{perfSlots} Performance + {goldenSlots} Golden Ticket</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Premier Seats</span>
              <span className="ca-summary-row-value">{seatCap}</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Tiers</span>
              <span className="ca-summary-row-value">G {goldSeats} / S {silverSeats} / B {bronzeSeats}</span>
            </div>
            <div className="ca-summary-row">
              <span className="ca-summary-row-label">Splits</span>
              <span className="ca-summary-row-value">{splitHost}% / {splitCaptains}% / {splitPlatform}%</span>
            </div>
          </div>
        </div>

        <p className="ca-disclaimer">
          By launching this arena you confirm that all details are accurate. Your arena will undergo a 24-hour review by the FSP team before going live. You will be notified once it is approved.
        </p>
      </>
    );
  };

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6];

  return (
    <div className="ca-shell">
      {/* Top bar */}
      <div className="ca-topbar">
        <Link to="/arenas" className="ca-close">X Close</Link>
        <span className="ca-step-label">Step {step} of 6</span>
      </div>

      {/* Progress bar */}
      <div className="ca-progress-track">
        <div className="ca-progress-fill" style={{ width: `${(step / 6) * 100}%` }} />
      </div>

      {/* Step content */}
      {steps[step - 1]()}

      {/* Bottom bar */}
      <div className="ca-bottom-bar">
        <button
          className={`ca-btn-back${step === 1 ? ' ca-hidden' : ''}`}
          type="button"
          onClick={() => setStep(step - 1)}
        >
          Back
        </button>

        {step < 6 ? (
          <button className="ca-btn-continue" type="button" onClick={() => setStep(step + 1)}>
            Continue
          </button>
        ) : (
          <button className="ca-btn-continue ca-btn-launch" type="button" onClick={handleLaunch}>
            LAUNCH ARENA
          </button>
        )}
      </div>
    </div>
  );
}
