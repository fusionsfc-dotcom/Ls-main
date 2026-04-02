import type { ReactNode } from 'react';

type ReportSectionTitleProps = {
  children: ReactNode;
};

export function ReportSectionTitle({ children }: ReportSectionTitleProps) {
  return (
    <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 pb-2 border-b border-gray-100 mb-5">
      {children}
    </h2>
  );
}
