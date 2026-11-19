/** Public reports no longer require a password. Admin authentication is separate. */
export function normalizeReportPath(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
export function isReportPathRequiringPassword(_pathname: string): boolean { return false; }
