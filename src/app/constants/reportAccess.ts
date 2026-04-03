import { insightsData } from '../data/insightsData';
import { isPublicSampleReportLink } from './publicSampleReportLinks';

/** GuardedReportLink, ReportPasswordGate와 동일한 값 유지 */
export const REPORT_ACCESS_PASSWORD = '4514';
export const REPORT_ACCESS_SESSION_KEY = 'ls_reports_pw_ok_v1';

const guardedPathsFromInsights = new Set(
  insightsData.map((i) => i.link).filter((link) => !isPublicSampleReportLink(link)),
);

export function normalizeReportPath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/** Insights 목록 기준: 공개 샘플이 아닌 리포트·동적 /insights/report/:id (공개 ID 제외) */
export function isReportPathRequiringPassword(pathname: string): boolean {
  const path = normalizeReportPath(pathname);
  if (isPublicSampleReportLink(path)) return false;
  if (path.startsWith('/insights/report/')) return true;
  return guardedPathsFromInsights.has(path);
}

export function isReportAccessGranted(): boolean {
  try {
    return sessionStorage.getItem(REPORT_ACCESS_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function grantReportAccess(): void {
  try {
    sessionStorage.setItem(REPORT_ACCESS_SESSION_KEY, '1');
  } catch {
    // ignore
  }
}
