type ReportHeroProps = {
  title: string;
  subtitle: string;
  period: string;
  totalCases: number;
  publishedBy: string;
  publishedAt: string;
  disease: string;
};

export function ReportHero({
  title,
  subtitle,
  period,
  totalCases,
  publishedBy,
  publishedAt,
  disease,
}: ReportHeroProps) {
  return (
    <section
      className="w-full text-white"
      style={{ backgroundColor: '#0F2540' }}
    >
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-12">
        <div className="mb-6">
          <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wide border border-white/35 rounded-full px-3 py-1">
            {disease} PVM 리포트
          </span>
        </div>
        <h1
          className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-snug whitespace-pre-line mb-4"
          style={{ fontFamily: '"Noto Serif KR", "Noto Sans KR", serif' }}
        >
          {title}
        </h1>
        <p className="text-sm sm:text-base opacity-90 leading-relaxed max-w-3xl">{subtitle}</p>

        <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="opacity-60 text-xs mb-1">기간</div>
            <div className="font-semibold">{period}</div>
          </div>
          <div>
            <div className="opacity-60 text-xs mb-1">분석 건수</div>
            <div className="font-semibold tabular-nums">{totalCases.toLocaleString()}건</div>
          </div>
          <div>
            <div className="opacity-60 text-xs mb-1">발행</div>
            <div className="font-semibold">{publishedBy}</div>
          </div>
          <div>
            <div className="opacity-60 text-xs mb-1">발행일</div>
            <div className="font-semibold tabular-nums">{publishedAt}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
