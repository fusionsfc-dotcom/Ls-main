import type { ReactNode } from 'react';

type ReportSectionTitleProps = {
  children: ReactNode;
};

export function ReportSectionTitle({ children }: ReportSectionTitleProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-8 h-[3px] rounded-full" style={{ backgroundColor: 'var(--navy-300)' }} />
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--navy-900)' }}>
        {children}
      </h2>
    </div>
  );
}
