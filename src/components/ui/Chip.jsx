import './Chip.css';

export default function Chip({ active = false, children, onClick }) {
  return (
    <button
      className={`chip${active ? ' chip--active' : ''}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
