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
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-none"
      style={{ borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: line }}
    >
      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: line }}>
        {type}
      </div>
      <h4 className="text-base font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
}
