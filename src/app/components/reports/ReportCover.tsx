type ReportCoverProps = {
  title: string;
  subtitle: string;
  period: string;
  totalCases: number;
  publishedBy: string;
  disease: string;
};

export function ReportCover({ title, subtitle, period, totalCases, publishedBy, disease }: ReportCoverProps) {
  return (
    <div
      className="rounded-xl p-8 lg:p-10 text-white shadow-none border border-gray-100"
      style={{ backgroundColor: '#0F2540' }}
    >
      <div className="mb-8">
        <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wide opacity-90 border border-white/30 rounded-full px-3 py-1">
          LS Consulting · Cancer Hospital Strategy Report
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">{title}</h1>
      <p className="text-sm sm:text-base opacity-85 leading-relaxed max-w-3xl">{subtitle}</p>

      <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 text-sm">
        <div>
          <div className="opacity-60 text-xs mb-1">기간</div>
          <div className="font-semibold">{period}</div>
        </div>
        <div>
          <div className="opacity-60 text-xs mb-1">분석 건수</div>
          <div className="font-semibold tabular-nums">{totalCases.toLocaleString()}건</div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="opacity-60 text-xs mb-1">질환 범위</div>
          <div className="font-semibold leading-snug">{disease}</div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="opacity-60 text-xs mb-1">발행</div>
          <div className="font-semibold">{publishedBy}</div>
        </div>
      </div>
    </div>
  );
}
