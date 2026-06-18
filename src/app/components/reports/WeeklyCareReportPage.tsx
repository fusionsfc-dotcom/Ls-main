import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../SEO';
import { ReportCover } from './ReportCover';
import { ReportSectionTitle } from './ReportSectionTitle';
import { KpiGrid } from './KpiGrid';
import { EmotionGrid } from './EmotionGrid';
import { StrategyBlock } from './StrategyBlock';
import { WeeklyCareDonutChart } from './WeeklyCareDonutChart';
import type { WeeklyCareReportData } from '../../../data/reports/weekly-care/types';
import {
  buildKpiItems,
  getSectionAccent,
  getSectionEmotionGrid,
  getSectionPartLabel,
  isHospitalStrategyReport,
  parseStageBreakdown,
} from '../../lib/weeklyCareVisuals';

const NAVY_900 = '#0F2B46';

const partAccent: Record<ReturnType<typeof getSectionAccent>, string> = {
  coral: '#E24B4A',
  teal: '#0F6E56',
  blue: '#185FA5',
  amber: '#B45309',
  purple: '#6B21A8',
  green: '#166534',
};

type WeeklyCareReportPageProps = {
  data: WeeklyCareReportData;
  canonicalPath: string;
  deptLabel?: string;
  voicesLabel?: string;
};

export function WeeklyCareReportPage({
  data,
  canonicalPath,
  deptLabel = '부서별 케어 연결 정보',
  voicesLabel = '현장의 목소리 (환자 PVM)',
}: WeeklyCareReportPageProps) {
  const { meta, sections } = data;
  const canonical = `https://www.lsconsulting.co.kr${canonicalPath}`;
  const isStrategy = isHospitalStrategyReport(meta.slug);
  const kpiItems = buildKpiItems(data);
  const stageBreakdown = parseStageBreakdown(meta.dataBasis);
  const sectionGrid = getSectionEmotionGrid(sections);

  const overviewChartData = isStrategy
    ? sectionGrid.map((s, i) => ({
        label: s.title,
        count: sections[i]?.voices.length ?? 0,
        color: partAccent[getSectionAccent(i)],
        pct: s.pct,
      }))
    : stageBreakdown;

  const coverSubtitle = [meta.subtitle, meta.dataBasis].filter(Boolean).join(' · ');

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

      <SEO title={`${meta.title} | LS AX 컨설팅`} description={meta.intro} url={canonical} />

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
        <ReportCover
          title={meta.title}
          subtitle={coverSubtitle}
          period={meta.issue}
          totalCases={meta.totalCases}
          publishedBy="LS AX 컨설팅"
          disease={isStrategy ? '병원 경영·운영전략' : meta.title.replace(/ 환자 케어 리포트$/, '')}
          badgeLabel="LS AX Consulting · Weekly Cancer Care Report"
        />

        <section className="mt-10">
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--navy-700)' }}>{meta.intro}</p>
        </section>

        <section className="mt-14">
          <ReportSectionTitle>핵심 지표</ReportSectionTitle>
          <KpiGrid items={kpiItems} />
        </section>

        {overviewChartData.length > 0 && (
          <section className="mt-14">
            <ReportSectionTitle>데이터 분포</ReportSectionTitle>
            <WeeklyCareDonutChart
              title={isStrategy ? '접점별 환자 니즈 사례 분포' : '치료 단계별 PVM 분포'}
              data={overviewChartData}
            />
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              {isStrategy
                ? '※ 접점별 건수는 본 리포트에 인용된 PVM 사례 수입니다. 5대 암종 전체 1,300여 건 DB와는 집계 기준이 다릅니다.'
                : '※ 단계별 건수는 PVM 데이터셋 전체 분포이며, 아래 인용문은 이번 주 대표 사례입니다.'}
            </p>
          </section>
        )}

        <section className="mt-12">
          <ReportSectionTitle>{isStrategy ? '접점 개요' : '치료 단계 개요'}</ReportSectionTitle>
          <EmotionGrid items={sectionGrid} />
          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            ※ 비율은 본 리포트에 인용된 PVM 목소리 건수 기준이며, 전체 데이터셋 분포와는 다를 수 있습니다.
          </p>
        </section>

        <section className="mt-12">
          <ReportSectionTitle>{isStrategy ? '접점별 상세' : '단계별 상세'}</ReportSectionTitle>
          <div className="space-y-12">
            {sections.map((section, sectionIndex) => {
              const accent = getSectionAccent(sectionIndex);
              return (
                <div key={section.title}>
                  <div className="mb-4 flex flex-wrap items-baseline gap-2">
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--navy-400)' }}>
                      {getSectionPartLabel(sectionIndex)}
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: partAccent[accent] }}>
                      {section.title.replace(/^\d+\.\s*/, '')}
                    </h3>
                  </div>
                  {section.summary && (
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--navy-700)' }}>{section.summary}</p>
                  )}

                  {section.voices.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
                        {voicesLabel}
                      </h4>
                      <div className="space-y-4">
                        {section.voices.map((voice) => {
                          const needLabel = voice.need.replace(/^니즈:\s*/, '').trim();
                          return (
                            <StrategyBlock
                              key={`${voice.ref}-${voice.quote.slice(0, 24)}`}
                              type={voice.ref}
                              title={needLabel || '환자 PVM'}
                              body={voice.quote}
                              color={accent}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {section.departments.filter((row) => row.content.trim()).length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
                        {deptLabel}
                      </h4>
                      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--navy-100)' }}>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr style={{ backgroundColor: 'var(--navy-50)' }}>
                                <th className="px-4 py-3 font-bold w-[28%] min-w-[100px]" style={{ color: 'var(--navy-800)' }}>
                                  {isStrategy ? '준비 포인트' : '부서'}
                                </th>
                                <th className="px-4 py-3 font-bold" style={{ color: 'var(--navy-800)' }}>
                                  {isStrategy ? '내용' : '현장 연결 정보'}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.departments
                                .filter((row) => row.content.trim())
                                .map((row) => (
                                <tr
                                  key={`${section.title}-${row.dept}`}
                                  className="align-top"
                                  style={{ borderTop: '1px solid var(--navy-100)' }}
                                >
                                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--navy-900)' }}>
                                    {row.dept}
                                  </td>
                                  <td className="px-4 py-3 leading-relaxed" style={{ color: 'var(--navy-700)' }}>{row.content}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.note && (
                    <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{section.note}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-16 pt-8 text-xs leading-relaxed" style={{ borderTop: '1px solid var(--navy-100)', color: 'var(--navy-400)' }}>
          본 리포트는 환자 실제 목소리(PVM)를 단계별로 정리한 정보 자료입니다. LS AX 컨설팅 · 암환자 케어 콘텐츠 /
          lsconsulting.co.kr
        </footer>
      </div>
    </div>
  );
}
