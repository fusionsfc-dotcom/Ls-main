export const PUBLIC_SAMPLE_REPORT_LINKS = [
  '/report/breast-cancer-stage-care-strategy',
  '/reports/liver-cancer-2026-03',
  '/insights/report/202602',
  '/research/pvm-hospital-switch',
  '/research/patient-persona-execution',
  '/reports/weekly/liver-care-2026-06-w4',
  '/reports/weekly/colon-care-2026-06-w4',
  '/reports/weekly/stomach-care-2026-06-w4',
  '/reports/weekly/breast-care-2026-06-w4',
  '/reports/weekly/lung-care-2026-06-w4',
  '/reports/weekly/hospital-strategy-2026-06-w4',
] as const;

export function isPublicSampleReportLink(link: string): boolean {
  return (PUBLIC_SAMPLE_REPORT_LINKS as readonly string[]).includes(link);
}
