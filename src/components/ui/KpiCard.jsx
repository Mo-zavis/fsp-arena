import './KpiCard.css';

export default function KpiCard({ value, label }) {
  return (
    <div className="kpi-card">
      <span className="kpi-value">{value}</span>
      <span className="kpi-label">{label}</span>
    </div>
  );
}
