import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ReportCover } from '../../components/reports/ReportCover';
import { ReportSectionTitle } from '../../components/reports/ReportSectionTitle';
import { KpiGrid } from '../../components/reports/KpiGrid';
import { HorizontalBar } from '../../components/reports/HorizontalBar';
import { EmotionGrid } from '../../components/reports/EmotionGrid';
import { PainPointCard } from '../../components/reports/PainPointCard';
import { StrategyBlock, type StrategyAccent } from '../../components/reports/StrategyBlock';
import { PriorityTable } from '../../components/reports/PriorityTable';
import { BlogTopics } from '../../components/reports/BlogTopics';
import {
  reportMeta,
  kpiData,
  categoryBarData,
  emotionBarData,
  emotionGridData,
  painPoints,
  strategies,
  priorityMatrix,
  blogTopics,
} from '../../../data/reports/liver-2026-03';

const NAVY_900 = '#0F2B46';

const partAccent: Record<StrategyAccent, string> = {
  coral: '#E24B4A',
  teal: '#0F6E56',
  blue: '#185FA5',
  amber: '#B45309',
  purple: '#6B21A8',
  green: '#166534',
};

export function LiverCancerReport202603() {
  const canonical = 'https://www.lsconsulting.co.kr/reports/liver-cancer-2026-03';

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <SEO
        title={`${reportMeta.title} | LS컨설팅`}
        description={reportMeta.subtitle}
        url={canonical}
      />

      <header className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70" style={{ color: NAVY_900 }}>
            <ArrowLeft className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </header>

      <div
        className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-16"
        style={{ fontFamily: '"Noto Sans KR", system-ui, sans-serif' }}
      >
        <ReportCover
          title={reportMeta.title}
          subtitle={reportMeta.subtitle}
          period={reportMeta.period}
          totalCases={reportMeta.totalCases}
          publishedBy={reportMeta.publishedBy}
          disease={reportMeta.disease}
        />

        <section className="mt-12">
          <ReportSectionTitle>Key metrics</ReportSectionTitle>
          <KpiGrid items={[...kpiData]} />
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Data distribution</ReportSectionTitle>
          <div className="grid lg:grid-cols-2 gap-6">
            <HorizontalBar title="질문 카테고리별 건수" data={[...categoryBarData]} />
            <HorizontalBar title="감정 키워드별 건수" data={[...emotionBarData]} />
          </div>
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Pain points</ReportSectionTitle>
          <div className="space-y-6">
            {painPoints.map((p) => (
              <PainPointCard
                key={p.id}
                icon={p.icon}
                iconBg={p.iconBg}
                count={p.count}
                title={p.title}
                subtitle={p.subtitle}
                body={p.body}
                tags={p.tags}
              />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Emotion clusters</ReportSectionTitle>
          <EmotionGrid items={[...emotionGridData]} />
          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            ※ 비율은 표본 내 감정 키워드 공출 현황을 요약한 지표이며, 임상 통계와는 다를 수 있습니다.
          </p>
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Department strategies</ReportSectionTitle>
          <div className="space-y-10">
            {strategies.map((block) => (
              <div key={block.part}>
                <div className="mb-4 flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{block.part}</span>
                  <h3 className="text-lg font-bold" style={{ color: partAccent[block.partColor] }}>
                    {block.partLabel}
                  </h3>
                </div>
                <div className="space-y-4">
                  {block.items.map((item) => (
                    <StrategyBlock
                      key={item.title}
                      type={item.type}
                      title={item.title}
                      body={item.body}
                      color={block.partColor}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Execution priority</ReportSectionTitle>
          <PriorityTable rows={[...priorityMatrix]} />
        </section>

        <section className="mt-12">
          <ReportSectionTitle>Content &amp; blog</ReportSectionTitle>
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <BlogTopics topics={[...blogTopics]} />
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-none h-full">
              <h3 className="text-sm font-bold text-gray-900 mb-3">콘텐츠 전략 방향</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                환자·보호자가 실제로 반복 질문하는 ‘응급 vs 지켜봄’, ‘식이·보조제 안전’, ‘이식 후 일상 복귀’
                축을 중심으로 블로그·SNS·퇴원 교육 자료를 일관되게 설계하면 검색 유입과 내원 신뢰도를 동시에
                높일 수 있습니다. 위 제안 토픽은 PVM 성격의 질문을 기준으로 한 콘텐츠 우선순위 예시입니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
