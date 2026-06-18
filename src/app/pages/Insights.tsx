import { Calendar, ArrowRight, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { insightsData, type InsightItem, type InsightDomain } from '../data/insightsData';
import { SEO } from '../components/SEO';
import { GuardedReportLink } from '../components/auth/GuardedReportLink';
import { fadeIn } from '../lib/motion';

const SITE = 'https://www.lsconsulting.co.kr';

/* 상위 도메인 탭 */
const DOMAIN_TABS: { key: InsightDomain; label: string }[] = [
  { key: 'healthcare', label: '건강의료' },
  { key: 'business', label: '기업' },
];

/* 카테고리 한글 라벨 (없으면 원문 표시) */
const CATEGORY_LABEL: Record<string, string> = {
  'Monthly Cancer Voice Report': '월간 암 환자 리포트',
  'Weekly LS Cancer Report': '주간 LS 암 리포트',
  'Healthcare Strategy Research': '의료 전략 리서치',
  'Disease Insight Report': '질환 인사이트',
  'Healthcare Strategy Notes': '전략 노트',
};
const catLabel = (c: string) => CATEGORY_LABEL[c] ?? c;

const ITEMS_PER_PAGE = 6;

export function Insights() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDomain, setActiveDomain] = useState<InsightDomain>('healthcare');
  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const reportsListRef = useRef<HTMLElement>(null);

  const domainOf = (i: InsightItem): InsightDomain => i.domain ?? 'healthcare';

  /* 도메인별 리포트 수 */
  const domainCounts = useMemo(
    () => ({
      healthcare: insightsData.filter((i) => domainOf(i) === 'healthcare').length,
      business: insightsData.filter((i) => domainOf(i) === 'business').length,
    }),
    [],
  );

  /* 활성 도메인의 리포트 */
  const domainReports = useMemo(() => insightsData.filter((i) => domainOf(i) === activeDomain), [activeDomain]);

  /* 활성 도메인의 카테고리 목록 */
  const categories = useMemo(() => Array.from(new Set(domainReports.map((i) => i.category))), [domainReports]);

  /* 필터링된 리포트 (도메인 + 카테고리) */
  const filtered = useMemo(
    () => (activeCategory === 'all' ? domainReports : domainReports.filter((i) => i.category === activeCategory)),
    [domainReports, activeCategory],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInsights = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const scrollToList = () => reportsListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const goToPage = (page: number) => { setCurrentPage(page); scrollToList(); };
  const selectCategory = (c: 'all' | string) => { setActiveCategory(c); setCurrentPage(1); };
  const selectDomain = (d: InsightDomain) => { setActiveDomain(d); setActiveCategory('all'); setCurrentPage(1); };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitMessage('유효한 이메일 주소를 입력해주세요.');
      setSubmitSuccess(false);
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/newsletter`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ email }),
        },
      );
      const result = await response.json();
      if (result.success) {
        setSubmitMessage(result.message);
        setSubmitSuccess(true);
        setEmail('');
      } else {
        setSubmitMessage(result.message || '구독 처리 중 오류가 발생했습니다.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('Newsletter 구독 오류:', error);
      setSubmitMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* 구조화 데이터 — Blog + Breadcrumb */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: '리포트', item: `${SITE}/insights` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE}/insights#blog`,
      name: 'LS AX 컨설팅 리포트',
      description: '암 환자 데이터(PVM)를 기반으로 한 의료 전략·니즈 분석 리포트 아카이브.',
      url: `${SITE}/insights`,
      inLanguage: 'ko-KR',
      publisher: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': `${SITE}/#org` },
      blogPost: insightsData.map((i) => ({
        '@type': 'BlogPosting',
        headline: i.title.replace(/\n/g, ' '),
        url: `${SITE}${i.link}`,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="리포트 · 인사이트 - LS AX 컨설팅"
        description="암 환자 온라인 니즈 분석(PVM) 기반의 월간 리포트와 의료 전략 리서치 아카이브. 데이터로 보는 의료 인사이트를 정기 발행합니다."
        url="https://www.lsconsulting.co.kr/insights"
        jsonLd={jsonLd}
      />

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-44 pb-28" {...fadeIn}>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <FileText className="w-3.5 h-3.5" />
              리포트 · Insights
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              데이터로 보는
              <br />
              <span style={{ color: 'var(--navy-300)' }}>의료 인사이트</span>
            </h1>
            <p className="text-lg lg:text-xl mt-8 leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              암 환자 온라인 니즈를 자체 AI(PVM)로 분석한 월간 리포트와 의료 전략 리서치.
              추정이 아닌 데이터로, 병원 운영과 전략의 방향을 제시합니다.
            </p>
            <p className="text-sm mt-6" style={{ color: 'var(--navy-400)' }}>
              총 {insightsData.length}개 리포트 · 매월 발행
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 리포트 목록 ────────────────────────────────── */}
      <section ref={reportsListRef} className="py-24 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          {/* 상위 도메인 탭 (건강의료 / 기업) */}
          <div className="flex gap-1 mb-8 border-b" style={{ borderColor: 'var(--navy-100)' }}>
            {DOMAIN_TABS.map((t) => {
              const active = activeDomain === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => selectDomain(t.key)}
                  className="relative px-5 sm:px-7 pb-4 text-base sm:text-lg font-bold transition-colors"
                  style={{ color: active ? 'var(--navy-900)' : 'var(--navy-400)' }}
                >
                  {t.label}
                  <span className="ml-1.5 text-xs font-semibold align-top" style={{ color: active ? 'var(--navy-500)' : 'var(--navy-300)' }}>
                    {domainCounts[t.key]}
                  </span>
                  {active && (
                    <span className="absolute left-0 right-0 -bottom-px h-[3px] rounded-full" style={{ backgroundColor: 'var(--navy-900)' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* 카테고리 필터 (해당 도메인에 리포트가 있을 때) */}
          {domainReports.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-12">
              <button
                onClick={() => selectCategory('all')}
                className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                style={
                  activeCategory === 'all'
                    ? { backgroundColor: 'var(--navy-900)', color: 'white' }
                    : { backgroundColor: 'white', color: 'var(--navy-700)', border: '1px solid var(--navy-100)' }
                }
              >
                전체 {domainReports.length}
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => selectCategory(c)}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                  style={
                    activeCategory === c
                      ? { backgroundColor: 'var(--navy-900)', color: 'white' }
                      : { backgroundColor: 'white', color: 'var(--navy-700)', border: '1px solid var(--navy-100)' }
                  }
                >
                  {catLabel(c)}
                </button>
              ))}
            </div>
          )}

          {/* 카드 그리드 */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" {...fadeIn}>
            {currentInsights.map((insight) => (
              <GuardedReportLink key={insight.link} to={insight.link} className="group block h-full">
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'var(--navy-100)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                      {CATEGORY_LABEL[insight.category]}
                    </span>
                    {insight.isFeatured && (
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-700)' }}>
                        주요 리포트
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold mb-3 leading-snug whitespace-pre-line group-hover:opacity-80 transition-opacity" style={{ color: 'var(--navy-900)' }}>
                    {insight.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--navy-600)' }}>
                    {insight.excerpt}
                  </p>

                  {insight.highlights && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {insight.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}>
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--navy-500)' }} />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex items-center justify-between border-t" style={{ borderColor: 'var(--navy-100)' }}>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--navy-500)' }}>
                      <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{insight.date}</span>
                      <span>·</span>
                      <span>{insight.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5" style={{ color: 'var(--navy-900)' }}>
                      리포트 보기 <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </GuardedReportLink>
            ))}
          </motion.div>

          {currentInsights.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-semibold" style={{ color: 'var(--navy-700)' }}>
                {activeDomain === 'business' ? '기업 AI 리포트는 곧 공개됩니다' : '해당 카테고리의 리포트가 없습니다'}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--navy-500)' }}>
                {activeDomain === 'business'
                  ? '기업 업무 자동화·AX 관련 데이터 리포트를 준비 중입니다.'
                  : '다른 카테고리를 선택해 보세요.'}
              </p>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-14">
              <button
                onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}
                aria-label="이전 페이지"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className="w-10 h-10 rounded-lg border transition-all font-semibold"
                  style={
                    currentPage === page
                      ? { backgroundColor: 'var(--navy-900)', borderColor: 'var(--navy-900)', color: 'white' }
                      : { backgroundColor: 'white', borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }
                  }
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-lg border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}
                aria-label="다음 페이지"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          <p className="text-center mt-6 text-sm" style={{ color: 'var(--navy-500)' }}>
            {filtered.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} / {filtered.length} 리포트
          </p>
        </div>
      </section>

      {/* ── 뉴스레터 ───────────────────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
            새 리포트를 이메일로 받아보세요
          </h2>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--navy-600)' }}>
            월 1–2회, 엄선된 의료 데이터 인사이트만 전달합니다.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-6 py-4 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: 'var(--navy-100)', color: 'var(--navy-900)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: 'var(--navy-900)' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? '구독 중...' : '구독하기'}
            </button>
          </form>
          {submitMessage && (
            <p className="text-sm mt-4" style={{ color: submitSuccess ? '#16a34a' : '#dc2626' }}>
              {submitMessage}
            </p>
          )}
        </div>
      </motion.section>
    </div>
  );
}
