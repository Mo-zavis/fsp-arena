import './Tabs.css';

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          className={`tabs-tab${active === value ? ' tabs-tab--active' : ''}`}
          onClick={() => onChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
