import './Stepper.css';

export default function Stepper({ steps, current }) {
  return (
    <div className="stepper">
      {Array.from({ length: steps }, (_, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <div className="stepper-step" key={i}>
            {i > 0 && (
              <span
                className={`stepper-line${done ? ' stepper-line--done' : ''}`}
              />
            )}
            <span
              className={`stepper-dot${
                done ? ' stepper-dot--done' : active ? ' stepper-dot--active' : ''
              }`}
            >
              {done ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
