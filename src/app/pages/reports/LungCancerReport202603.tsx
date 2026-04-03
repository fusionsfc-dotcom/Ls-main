import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ReportHero } from '../../components/reports/lung/ReportHero';
import { SectionTitle } from '../../components/reports/lung/SectionTitle';
import { KpiGrid } from '../../components/reports/lung/KpiGrid';
import { HorizontalBarChart } from '../../components/reports/lung/HorizontalBarChart';
import { VoiceCarousel } from '../../components/reports/lung/VoiceCarousel';
import type { PatientVoice } from '../../components/reports/lung/PatientVoiceCard';
import { PainPointSection } from '../../components/reports/lung/PainPointSection';
import { StrategySection } from '../../components/reports/lung/StrategySection';
import { PriorityTable } from '../../components/reports/lung/PriorityTable';
import { BlogTopicList } from '../../components/reports/lung/BlogTopicList';
import { EmotionSummary } from '../../components/reports/lung/EmotionSummary';
import {
  reportMeta,
  kpiData,
  categoryData,
  emotionData,
  patientVoices,
  surgeryIssues,
  chemoIssues,
  strategies,
  priorityMatrix,
  blogTopics,
} from '../../../data/reports/lung-2026-03';

const NAVY_900 = '#0F2540';

const carouselVoices: PatientVoice[] = patientVoices.map((v) => ({
  id: v.id,
  text: v.text,
  category: v.category,
  tags: v.tags,
  emotion: v.emotion,
}));

export function LungCancerReport202603() {
  const canonical = 'https://www.lsconsulting.co.kr/reports/lung-cancer-2026-03';

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&family=Noto+Serif+KR:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <SEO
        title={`${reportMeta.title.replace(/\n/g, ' ')} | LS컨설팅`}
        description={reportMeta.subtitle}
        url={canonical}
      />

      <ReportHero
        title={reportMeta.title}
        subtitle={reportMeta.subtitle}
        period={reportMeta.period}
        totalCases={reportMeta.totalCases}
        publishedBy={reportMeta.publishedBy}
        publishedAt={reportMeta.publishedAt}
        disease={reportMeta.disease}
      />

      <header
        className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b"
        style={{ borderColor: '#EAEAEA' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70"
            style={{ color: NAVY_900 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </header>

      <div
        className="max-w-4xl mx-auto px-4 py-10 space-y-12 pb-16"
        style={{ fontFamily: '"Noto Sans KR", system-ui, sans-serif' }}
      >
        <section>
          <SectionTitle>핵심 지표 요약</SectionTitle>
          <KpiGrid items={[...kpiData]} />
        </section>

        <section>
          <SectionTitle>환자 목소리 — 이달의 주요 PVM</SectionTitle>
          <VoiceCarousel voices={carouselVoices} />
        </section>

        <section>
          <SectionTitle>주요 관심 카테고리 분포</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HorizontalBarChart title="의료 행위별 질문 빈도" data={[...categoryData]} />
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-4">감정 분포</h3>
              <EmotionSummary emotionData={[...emotionData]} />
            </div>
          </div>
        </section>

        <section>
          <SectionTitle>수술·항암별 세부 이슈 분포</SectionTitle>
          <PainPointSection surgeryIssues={[...surgeryIssues]} chemoIssues={[...chemoIssues]} />
        </section>

        <section className="space-y-10">
          <SectionTitle>파트별 의료서비스 강화 전략</SectionTitle>
          {strategies.map((s, i) => (
            <div key={s.part}>
              {i > 0 ? <hr className="border-gray-100 my-10" /> : null}
              <StrategySection strategy={s} />
            </div>
          ))}
        </section>

        <section>
          <SectionTitle>서비스 강화 우선순위 매트릭스</SectionTitle>
          <PriorityTable rows={[...priorityMatrix]} />
        </section>

        <section>
          <SectionTitle>블로그 마케팅 콘텐츠 제언</SectionTitle>
          <BlogTopicList topics={[...blogTopics]} />
        </section>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-none">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {`이달 데이터의 검색 주체 특성: 수술 전후 환자 본인 비중이 높고, 4기는 보호자 비중 높음.
'흉강경 수술 후 + 증상/관리법' 형식의 롱테일 키워드가 검색량 높음.
요양병원 선택 기준으로 '식단·재활·통증관리' 3가지가 반복 언급되므로 이 3가지를 병원 강점으로 콘텐츠화 권장.`}
          </p>
        </div>

        <footer className="pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          LS컨설팅 | 2026년 3월 PVM 분석 | 폐암 환자 커뮤니티 160건
        </footer>
      </div>
    </div>
  );
}
