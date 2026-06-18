import type { BusinessReportData, BusinessAnalysisReportData } from './types';
import { report as realty_undersold_turnaround_2026_06 } from './realty-undersold-turnaround-2026-06';
import { report as enterprise_ax_state_2026 } from './enterprise-ax-state-2026';

/** 구조형(요약·신호·실행안) 기업 리포트 */
export const businessReports: Record<string, BusinessReportData> = {
  'realty-undersold-turnaround-2026-06': realty_undersold_turnaround_2026_06,
};

/** 블록 기반(차트·통계) 분석 리포트 */
export const businessAnalysisReports: Record<string, BusinessAnalysisReportData> = {
  'enterprise-ax-state-2026': enterprise_ax_state_2026,
};

export const businessReportSlugs = [
  'realty-undersold-turnaround-2026-06',
  'enterprise-ax-state-2026',
] as const;
