import './Input.css';

export default function Input({
  label,
  type = 'text',
  textarea = false,
  maxLength,
  ...rest
}) {
  const Tag = textarea ? 'textarea' : 'input';

  return (
    <label className="input-group">
      {label && <span className="input-label">{label}</span>}
      <Tag
        className="input-field"
        type={textarea ? undefined : type}
        maxLength={maxLength}
        {...rest}
      />
    </label>
  );
}
