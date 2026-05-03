export interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({
  label,
  className = '',
}: DividerProps): React.JSX.Element {
  if (label) {
    return (
      <div
        className={`flex items-center gap-4 py-4 font-body text-xs uppercase tracking-label text-ink-tertiary ${className}`}
      >
        <div className="h-px flex-1 bg-sand" />
        {label}
        <div className="h-px flex-1 bg-sand" />
      </div>
    );
  }
  return <div className={`h-px w-full bg-sand ${className}`} />;
}
