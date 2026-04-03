export type EmotionSummaryRow = {
  label: string;
  count: number;
  pct: number;
  color: string;
};

type EmotionSummaryProps = {
  emotionData: EmotionSummaryRow[];
};

export function EmotionSummary({ emotionData }: EmotionSummaryProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {emotionData.map((e) => (
        <div
          key={e.label}
          className="rounded-xl border border-gray-100 bg-white p-4 shadow-none"
        >
          <div className="text-2xl font-bold tabular-nums text-gray-900 mb-1">{e.pct}%</div>
          <div className="text-xs font-medium text-gray-600 leading-snug mb-3">{e.label}</div>
          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width]"
              style={{ width: `${e.pct}%`, backgroundColor: e.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
