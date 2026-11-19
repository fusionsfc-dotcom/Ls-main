import { Link } from 'react-router';
import type { ReactNode } from 'react';

/** Published insight documents are public; keep this wrapper for existing links. */
export function GuardedReportLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  return <Link to={to} className={className} reloadDocument={to.endsWith('.html')}>{children}</Link>;
}
