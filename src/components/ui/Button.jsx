import './Button.css';

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    fullWidth ? 'btn--full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
