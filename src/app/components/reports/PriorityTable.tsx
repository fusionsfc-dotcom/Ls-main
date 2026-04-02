export type PriorityRow = {
  part: string;
  service: string;
  demand: string;
  difficulty: string;
  priority: string;
  priorityColor: string;
};

type PriorityTableProps = {
  rows: PriorityRow[];
};

export function PriorityTable({ rows }: PriorityTableProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-bold text-gray-700">부서</th>
              <th className="px-4 py-3 font-bold text-gray-700">서비스</th>
              <th className="px-4 py-3 font-bold text-gray-700">수요</th>
              <th className="px-4 py-3 font-bold text-gray-700">난이도</th>
              <th className="px-4 py-3 font-bold text-gray-700">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.part}-${row.service}`} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{row.part}</td>
                <td className="px-4 py-3 text-gray-700">{row.service}</td>
                <td className="px-4 py-3 text-gray-600">{row.demand}</td>
                <td className="px-4 py-3 text-gray-600">{row.difficulty}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: row.priorityColor }}
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
