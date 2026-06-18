export type StrategyAccent = 'coral' | 'teal' | 'blue' | 'amber' | 'purple' | 'green';

const accentMap: Record<StrategyAccent, string> = {
  coral: '#E24B4A',
  teal: '#0F6E56',
  blue: '#185FA5',
  amber: '#B45309',
  purple: '#6B21A8',
  green: '#166534',
};

type StrategyBlockProps = {
  type: string;
  title: string;
  body: string;
  color: StrategyAccent;
};

export function StrategyBlock({ type, title, body, color }: StrategyBlockProps) {
  const line = accentMap[color];
  return (
    <div
      className="rounded-2xl bg-white p-6 transition-all hover:shadow-md"
      style={{ borderLeftWidth: 4, borderLeftStyle: 'solid', borderLeftColor: line, boxShadow: '0 1px 3px rgba(10,22,40,0.06)' }}
    >
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide mb-2" style={{ color: line }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: line }} />
        {type}
      </div>
      <h4 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
    </div>
  );
}
