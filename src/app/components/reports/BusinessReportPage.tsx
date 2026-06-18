import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, TrendingUp, CheckCircle2 } from 'lucide-react';
import { SEO } from '../SEO';
import { ReportSectionTitle } from './ReportSectionTitle';
import type { BusinessReportData } from '../../../data/reports/business/types';

const NAVY_900 = '#0F2B46';

type BusinessReportPageProps = {
  data: BusinessReportData;
  canonicalPath: string;
};

export function BusinessReportPage({ data, canonicalPath }: BusinessReportPageProps) {
  const { meta, sections } = data;
  const canonical = `https://www.lsconsulting.co.kr${canonicalPath}`;

  const datePublished = (meta.issue.match(/(\d{4}-\d{2}-\d{2})/) || [])[1];
  const reportJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
        { '@type': 'ListItem', position: 2, name: '리포트', item: 'https://www.lsconsulting.co.kr/insights' },
        { '@type': 'ListItem', position: 3, name: meta.title, item: canonical },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: meta.title,
      description: meta.intro,
      ...(datePublished ? { datePublished } : {}),
      inLanguage: 'ko-KR',
      url: canonical,
      mainEntityOfPage: canonical,
      author: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' },
      publisher: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' },
      isPartOf: { '@type': 'Blog', '@id': 'https://www.lsconsulting.co.kr/insights#blog' },
      about: meta.field,
    },
  ];

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

      <SEO title={`${meta.title} | LS AX 컨설팅`} description={meta.intro} url={canonical} jsonLd={reportJsonLd} />

      <header className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
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
        className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-16"
        style={{ fontFamily: '"Noto Sans KR", system-ui, sans-serif' }}
      >
        {/* 커버 */}
        <div className="rounded-xl p-8 lg:p-10 text-white border border-gray-100" style={{ backgroundColor: '#0F2540' }}>
          <div className="mb-8">
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wide opacity-90 border border-white/30 rounded-full px-3 py-1">
              LS AX Consulting · Business Report
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">{meta.title}</h1>
          <p className="text-sm sm:text-base opacity-85 leading-relaxed max-w-3xl">{meta.subtitle}</p>

          <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4 text-sm">
            <div>
              <div className="opacity-60 text-xs mb-1">발행</div>
              <div className="font-semibold">{meta.issue}</div>
            </div>
            <div>
              <div className="opacity-60 text-xs mb-1">분야</div>
              <div className="font-semibold leading-snug">{meta.field}</div>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <div className="opacity-60 text-xs mb-1">발행처</div>
              <div className="font-semibold">LS AX 컨설팅</div>
            </div>
          </div>
        </div>

        {/* 도입부 */}
        <section className="mt-10">
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--navy-700)' }}>{meta.intro}</p>
        </section>

        {/* 데이터 근거 */}
        <section className="mt-8">
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--navy-500)' }}>
              데이터 근거
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{meta.dataBasis}</p>
          </div>
        </section>

        {/* 본문 섹션 */}
        <section className="mt-14">
          <ReportSectionTitle>전략 설계 축</ReportSectionTitle>
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={section.title}>
                <div className="mb-4 flex items-baseline gap-3">
                  <span
                    className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: NAVY_900 }}
                  >
                    {idx + 1}
                  </span>
                  <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--navy-900)' }}>
                    {section.title}
                  </h3>
                </div>

                {section.summary && (
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--navy-700)' }}>{section.summary}</p>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {/* 핵심 신호 / 데이터 */}
                  <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--navy-600)' }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--navy-600)' }}>
                        핵심 신호 · 데이터
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {section.signals.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--navy-400)' }} />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 시사점 · 실행안 */}
                  <div
                    className="rounded-2xl p-5"
                    style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)', border: '1px solid var(--navy-100)' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--navy-700)' }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--navy-700)' }}>
                        시사점 · 실행안
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {section.actions.map((a, i) => (
                        <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--navy-800)' }}>
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--navy-600)' }} />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {section.note && (
                  <div className="mt-4 rounded-2xl p-4" style={{ backgroundColor: '#FFF8EC', border: '1px solid #F1E2C4' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#7A5B16' }}>
                      <span className="font-bold">참고 · </span>
                      {section.note}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-16 pt-8 text-xs leading-relaxed" style={{ borderTop: '1px solid var(--navy-100)', color: 'var(--navy-400)' }}>
          본 리포트는 LS AX 컨설팅이 수행한 프로젝트의 방법론·패턴·교훈을 익명화·일반화하여 재구성한 자료입니다. 특정
          단지·시행 주체·실거래 수치는 포함하지 않습니다. LS AX 컨설팅 / lsconsulting.co.kr
        </footer>
      </div>
    </div>
  );
}
