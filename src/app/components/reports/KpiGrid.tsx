export type KpiItem = {
  num: string;
  label: string;
  color: 'blue' | 'teal' | 'amber' | 'coral';
};

const colorMap: Record<KpiItem['color'], string> = {
  blue: '#185FA5',
  teal: '#0F6E56',
  amber: '#B45309',
  coral: '#E24B4A',
};

type KpiGridProps = {
  items: KpiItem[];
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}
        >
          <div className="text-3xl sm:text-4xl font-bold tabular-nums mb-2" style={{ color: colorMap[item.color] }}>
            {item.num}
          </div>
          <p className="text-xs sm:text-sm leading-snug font-medium" style={{ color: 'var(--navy-700)' }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
