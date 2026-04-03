import { useState, useCallback, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import {
  REPORT_ACCESS_PASSWORD,
  grantReportAccess,
  isReportAccessGranted,
} from '../../constants/reportAccess';

type ReportPasswordGateProps = {
  children: ReactNode;
};

export function ReportPasswordGate({ children }: ReportPasswordGateProps) {
  const [unlocked, setUnlocked] = useState(() =>
    typeof window !== 'undefined' ? isReportAccessGranted() : false,
  );
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (value.trim() === REPORT_ACCESS_PASSWORD) {
        grantReportAccess();
        setUnlocked(true);
        setError(false);
        return;
      }
      setError(true);
    },
    [value],
  );

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white pt-20 flex flex-col items-center justify-center px-4 pb-20">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900 mb-1">리포트 접근</h1>
        <p className="text-sm text-gray-500 mb-6">비밀번호를 입력해 주세요.</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0F2B46]/20 focus:border-[#0F2B46]"
            placeholder="비밀번호"
            aria-invalid={error}
          />
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              비밀번호가 올바르지 않습니다.
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0F2B46] text-white text-sm font-semibold py-2.5 hover:opacity-90"
          >
            확인
          </button>
        </form>
        <Link
          to="/insights"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Insights로 돌아가기
        </Link>
      </div>
    </div>
  );
}
