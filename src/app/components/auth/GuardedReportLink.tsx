import { Link, useNavigate } from 'react-router';
import type { ReactNode, MouseEvent } from 'react';
import { isPublicSampleReportLink } from '../../constants/publicSampleReportLinks';
import {
  REPORT_ACCESS_PASSWORD,
  REPORT_ACCESS_SESSION_KEY,
} from '../../constants/reportAccess';

type GuardedReportLinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
};

function shouldBypassGuard(e: MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented) return true;
  if (typeof e.button === 'number' && e.button !== 0) return true; // not left click
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return true;
  return false;
}

export function GuardedReportLink({ to, className, children }: GuardedReportLinkProps) {
  const navigate = useNavigate();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (shouldBypassGuard(e)) return;
    if (isPublicSampleReportLink(to)) return;

    e.preventDefault();

    try {
      const ok = sessionStorage.getItem(REPORT_ACCESS_SESSION_KEY) === '1';
      if (ok) {
        navigate(to);
        return;
      }
    } catch {
      // If storage is blocked (some privacy modes), fall through to prompt.
    }

    const input = window.prompt('비밀번호를 입력하세요.');
    if (input === null) return;

    if (input.trim() === REPORT_ACCESS_PASSWORD) {
      try {
        sessionStorage.setItem(REPORT_ACCESS_SESSION_KEY, '1');
      } catch {
        // ignore
      }
      navigate(to);
      return;
    }

    window.alert('비밀번호가 올바르지 않습니다.');
  };

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
