export type LungKpiColor = 'blue' | 'teal' | 'amber' | 'coral';

export type LungKpiItem = {
  num: string;
  label: string;
  color: LungKpiColor;
};

const colorMap: Record<LungKpiColor, string> = {
  blue: '#185FA5',
  teal: '#0F6E56',
  amber: '#B45309',
  coral: '#E24B4A',
};

type KpiGridProps = {
  items: LungKpiItem[];
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl bg-gray-50 p-4 border border-gray-100 shadow-none"
        >
          <div
            className="text-2xl sm:text-3xl font-bold tabular-nums mb-2"
            style={{ color: colorMap[item.color] }}
          >
            {item.num}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-snug font-medium">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
