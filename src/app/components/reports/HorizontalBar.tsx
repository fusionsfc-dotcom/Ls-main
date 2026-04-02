import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export type HorizontalBarRow = {
  label: string;
  count: number;
  color: string;
};

type HorizontalBarProps = {
  title: string;
  data: HorizontalBarRow[];
};

export function HorizontalBar({ title, data }: HorizontalBarProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-none">
      <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
      <div className="h-[320px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 4, right: 56, left: 4, bottom: 4 }}
            barCategoryGap={6}
          >
            <XAxis type="number" domain={[0, Math.ceil(max * 1.15)]} hide />
            <YAxis
              type="category"
              dataKey="label"
              width={118}
              tick={{ fontSize: 11, fill: '#374151' }}
              interval={0}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              <LabelList
                dataKey="count"
                position="right"
                formatter={(v: number) => `${v}건`}
                style={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
              />
              {data.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
