import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { StageRow } from '../../lib/weeklyCareVisuals';

type WeeklyCareDonutChartProps = {
  title: string;
  data: StageRow[];
};

export function WeeklyCareDonutChart({ title, data }: WeeklyCareDonutChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-none">
      <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="h-[240px] w-full max-w-[240px] shrink-0 mx-auto lg:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={92}
                paddingAngle={1}
                stroke="#fff"
                strokeWidth={2}
                isAnimationActive={false}
              >
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}건`, name]}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full min-w-0">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="pb-2 pr-4 font-bold text-gray-600 w-[58%]">구분</th>
                <th className="pb-2 font-bold text-gray-600 text-right w-[22%] whitespace-nowrap">건수</th>
                <th className="pb-2 font-bold text-gray-600 text-right w-[20%] whitespace-nowrap">비율</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.label} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 pr-4 align-top">
                    <div className="flex items-start gap-2">
                      <span
                        className="h-2 w-2 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="font-semibold text-gray-800 leading-snug break-keep">{row.label}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-gray-900 align-top whitespace-nowrap">
                    {row.count}건
                  </td>
                  <td className="py-2.5 text-right tabular-nums text-gray-500 align-top whitespace-nowrap">
                    {row.pct}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="pt-3 font-bold text-gray-700">합계</td>
                <td className="pt-3 text-right font-bold tabular-nums text-gray-900">{total}건</td>
                <td className="pt-3 text-right text-gray-400">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
