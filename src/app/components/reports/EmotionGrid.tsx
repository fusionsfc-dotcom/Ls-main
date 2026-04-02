export type EmotionGridItem = {
  pct: string;
  title: string;
  keywords: string;
  colorBg: string;
  colorText: string;
  colorSub: string;
};

type EmotionGridProps = {
  items: EmotionGridItem[];
};

export function EmotionGrid({ items }: EmotionGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-xl border border-gray-100 p-5 shadow-none"
          style={{ backgroundColor: item.colorBg }}
        >
          <div className="text-2xl font-bold tabular-nums mb-2" style={{ color: item.colorText }}>
            {item.pct}
          </div>
          <div className="text-sm font-bold mb-1" style={{ color: item.colorText }}>
            {item.title}
          </div>
          <p className="text-xs font-medium leading-relaxed" style={{ color: item.colorSub }}>
            {item.keywords}
          </p>
        </div>
      ))}
    </div>
  );
}
