export type LungPriorityRow = {
  dept: string;
  service: string;
  demand: string;
  difficulty: string;
  priority: string;
  dot: string;
};

type PriorityTableProps = {
  rows: LungPriorityRow[];
};

function demandClass(d: string): string {
  if (d.includes('매우')) return 'text-red-600 font-semibold';
  if (d === '높음') return 'text-amber-600 font-semibold';
  if (d === '중간') return 'text-green-700 font-semibold';
  return 'text-gray-700';
}

function difficultyClass(d: string): string {
  if (d === '낮음') return 'text-green-700 font-semibold';
  if (d === '중간') return 'text-amber-600 font-semibold';
  if (d === '높음') return 'text-red-600 font-semibold';
  return 'text-gray-700';
}

export function PriorityTable({ rows }: PriorityTableProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap">부서</th>
              <th className="px-4 py-3 font-bold text-gray-700">서비스</th>
              <th className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap">수요</th>
              <th className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap">난이도</th>
              <th className="px-4 py-3 font-bold text-gray-700 whitespace-nowrap">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.dept}-${row.service}`} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{row.dept}</td>
                <td className="px-4 py-3 text-gray-700">{row.service}</td>
                <td className={`px-4 py-3 whitespace-nowrap ${demandClass(row.demand)}`}>{row.demand}</td>
                <td className={`px-4 py-3 whitespace-nowrap ${difficultyClass(row.difficulty)}`}>
                  {row.difficulty}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="shrink-0 rounded-full"
                      style={{ width: 8, height: 8, backgroundColor: row.dot }}
                      aria-hidden
                    />
                    <span className="font-semibold text-gray-800">{row.priority}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
