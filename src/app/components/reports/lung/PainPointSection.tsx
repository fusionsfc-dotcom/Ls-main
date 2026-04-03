import { HorizontalBarChart, type HorizontalBarRow } from './HorizontalBarChart';

export type PainIssueRow = { issue: string; count: number };

type PainPointSectionProps = {
  surgeryIssues: PainIssueRow[];
  chemoIssues: PainIssueRow[];
};

const surgeryColor = '#185FA5';
const chemoColor = '#A32D2D';

function toBarData(rows: PainIssueRow[], color: string): HorizontalBarRow[] {
  return rows.map((r) => ({ label: r.issue, count: r.count, color }));
}

export function PainPointSection({ surgeryIssues, chemoIssues }: PainPointSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <HorizontalBarChart
        title="수술 전후 주요 이슈"
        data={toBarData(surgeryIssues, surgeryColor)}
      />
      <HorizontalBarChart
        title="항암 부작용 주요 이슈"
        data={toBarData(chemoIssues, chemoColor)}
      />
    </div>
  );
}
