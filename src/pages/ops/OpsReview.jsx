import { opsReviews } from '../../data/mockData';
import './OpsReview.css';

export default function OpsReview() {
  return (
    <div className="ops-review">
      <h1 className="ops-review__title">Pending Reviews</h1>
      <p className="ops-review__subtitle">
        Review and approve new arena submissions before they go live.
      </p>

      {opsReviews.map((item, index) => (
        <div
          key={item.id}
          className={`ops-card${index === 1 ? ' ops-card--faded' : ''}`}
        >
          <h4 className="ops-card__name">{item.name}</h4>
          <div className="ops-card__meta">
            Submitted: {item.submitted}
            <br />
            Host: {item.host}
            <br />
            Sport: {item.sport}
            <br />
            Entry Fee: ${item.entryFee}
            <br />
            Splits: {item.splits}
          </div>
          <div className="ops-card__actions">
            <button className="ops-btn ops-btn--review">Review Details</button>
            <button className="ops-btn ops-btn--approve">Approve</button>
            <button className="ops-btn ops-btn--reject">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
