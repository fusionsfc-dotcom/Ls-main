export const PUBLIC_SAMPLE_REPORT_LINKS = [
  '/report/breast-cancer-stage-care-strategy',
  '/reports/liver-cancer-2026-03',
  '/insights/report/202602',
  '/research/pvm-hospital-switch',
  '/research/patient-persona-execution',
] as const;

export function isPublicSampleReportLink(link: string): boolean {
  return (PUBLIC_SAMPLE_REPORT_LINKS as readonly string[]).includes(link);
}
