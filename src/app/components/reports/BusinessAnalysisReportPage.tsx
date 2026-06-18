import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../SEO';
import type {
  AnalysisBlock,
  BusinessAnalysisReportData,
} from '../../../data/reports/business/types';

const NAVY_900 = '#0F2B46';

type Props = {
  data: BusinessAnalysisReportData;
  canonicalPath: string;
};

/** 신뢰된 자체 콘텐츠의 <b> 강조를 렌더링 */
function RichText({ html, className, style }: { html: string; className?: string; style?: React.CSSProperties }) {
  return <span className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Block({ block }: { block: AnalysisBlock }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-[15.5px] sm:text-base leading-[1.75] mb-4" style={{ color: 'var(--navy-700)' }}>
          <RichText html={block.html} />
        </p>
      );

    case 'srcNote':
      return (
        <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--navy-400)' }}>
          <RichText html={block.html} />
        </p>
      );

    case 'stats':
      return (
        <div className="grid sm:grid-cols-3 gap-3.5 my-6">
          {block.items.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 bg-white"
              style={{ border: '1px solid var(--navy-100)', boxShadow: '0 6px 18px -12px rgba(15,43,70,.25)' }}
            >
              <div className="text-[32px] font-extrabold leading-none tracking-tight" style={{ color: s.warn ? '#E5484D' : 'var(--navy-700)' }}>
                {s.value}
              </div>
              <div className="text-[13.5px] font-semibold mt-2 leading-snug" style={{ color: 'var(--navy-800)' }}>{s.label}</div>
              {s.source && <div className="text-[11.5px] mt-2" style={{ color: 'var(--navy-400)' }}>{s.source}</div>}
            </div>
          ))}
        </div>
      );

    case 'funnel':
      return (
        <div className="rounded-2xl p-6 my-6 bg-white" style={{ border: '1px solid var(--navy-100)', boxShadow: '0 6px 18px -12px rgba(15,43,70,.25)' }}>
          <div className="text-sm font-extrabold" style={{ color: 'var(--navy-900)' }}>{block.title}</div>
          {block.subtitle && <div className="text-xs mt-1 mb-5" style={{ color: 'var(--navy-400)' }}>{block.subtitle}</div>}
          <div className="space-y-3">
            {block.bars.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-[13.5px] mb-1.5">
                  <span className="font-semibold" style={{ color: 'var(--navy-800)' }}>{b.label}</span>
                  <span className="font-extrabold" style={{ color: b.red ? '#E5484D' : 'var(--navy-700)' }}>{b.valueText}</span>
                </div>
                <div className="h-[30px] rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}>
                  <div
                    className="h-full rounded-lg"
                    style={{
                      width: `${b.pct}%`,
                      background: b.red
                        ? 'linear-gradient(90deg,#F0787C,#E5484D)'
                        : 'linear-gradient(90deg,var(--navy-600),var(--navy-900))',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'hbars':
      return (
        <div className="rounded-2xl p-6 my-6 bg-white" style={{ border: '1px solid var(--navy-100)', boxShadow: '0 6px 18px -12px rgba(15,43,70,.25)' }}>
          <div className="text-sm font-extrabold" style={{ color: 'var(--navy-900)' }}>{block.title}</div>
          {block.subtitle && <div className="text-xs mt-1 mb-5" style={{ color: 'var(--navy-400)' }}>{block.subtitle}</div>}
          <div className="space-y-3.5">
            {block.bars.map((b, i) => (
              <div key={i}>
                <div className="flex justify-between text-[13.5px] mb-1.5">
                  <span className="font-semibold" style={{ color: 'var(--navy-800)' }}>{b.label}</span>
                  <span className="font-extrabold" style={{ color: b.color || 'var(--navy-700)' }}>{b.valueText}</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}>
                  <div className="h-full rounded-full" style={{ width: `${b.pct}%`, backgroundColor: b.color || 'var(--navy-600)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'compare':
      return (
        <div className="grid sm:grid-cols-2 gap-3.5 my-6">
          {block.cards.map((c, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white" style={{ border: '1px solid var(--navy-100)' }}>
              <h4 className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: 'var(--navy-500)' }}>{c.title}</h4>
              {c.rows.map((r, j) => (
                <div
                  key={j}
                  className="flex justify-between text-sm py-[7px]"
                  style={{ borderBottom: j === c.rows.length - 1 ? 'none' : '1px dashed var(--navy-100)' }}
                >
                  <span style={{ color: 'var(--navy-700)' }}>{r.label}</span>
                  <span className="font-extrabold" style={{ color: 'var(--navy-900)' }}>{r.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case 'callout':
      return (
        <div
          className="my-5 rounded-r-xl py-4 px-5 text-[15px] leading-relaxed bg-white"
          style={{ borderLeft: `3px solid ${block.variant === 'warn' ? '#E8902B' : 'var(--navy-600)'}`, color: 'var(--navy-700)' }}
        >
          <RichText html={block.html} />
        </div>
      );

    case 'takeaways':
      return (
        <div className="flex flex-col gap-3 my-4">
          {block.items.map((t, i) => (
            <div
              key={i}
              className="flex gap-3.5 rounded-2xl p-4 bg-white"
              style={{ border: '1px solid var(--navy-100)', boxShadow: '0 6px 18px -12px rgba(15,43,70,.25)' }}
            >
              <span
                className="flex-shrink-0 grid place-items-center w-[30px] h-[30px] rounded-[9px] text-sm font-extrabold"
                style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}
              >
                {t.marker}
              </span>
              <span className="text-[14.5px] leading-relaxed" style={{ color: 'var(--navy-700)' }}>
                <RichText html={t.html} />
              </span>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function BusinessAnalysisReportPage({ data, canonicalPath }: Props) {
  const { meta, summary, sections, sources, disclaimer } = data;
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
      description: meta.subtitle,
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
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <SEO title={`${meta.title} | LS AX 컨설팅`} description={meta.subtitle} url={canonical} jsonLd={reportJsonLd} />

      <header className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[840px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70" style={{ color: NAVY_900 }}>
            <ArrowLeft className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </header>

      <div className="max-w-[840px] mx-auto px-4 sm:px-7 py-10 sm:py-14 pb-16" style={{ fontFamily: '"Noto Sans KR", system-ui, sans-serif' }}>
        {/* 히어로 */}
        <header className="pb-2">
          <span className="inline-block text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--navy-600)' }}>
            {meta.kicker}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.15] tracking-tight mb-4" style={{ color: 'var(--navy-900)' }}>
            {meta.title}
          </h1>
          <p className="text-base sm:text-[18px] leading-[1.65] max-w-[680px]" style={{ color: 'var(--navy-700)' }}>{meta.subtitle}</p>
          <div
            className="mt-6 pt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]"
            style={{ borderTop: '1px solid var(--navy-100)', color: 'var(--navy-400)' }}
          >
            <span>발행 · <b style={{ color: 'var(--navy-800)' }}>LS AX 컨설팅</b></span>
            <span>분류 · <b style={{ color: 'var(--navy-800)' }}>{meta.field}</b></span>
            <span>발행호 · <b style={{ color: 'var(--navy-800)' }}>{meta.issue}</b></span>
            <span>기준 · <b style={{ color: 'var(--navy-800)' }}>{meta.basis}</b></span>
          </div>
        </header>

        {/* 핵심 요약 */}
        <div className="rounded-2xl p-6 sm:p-7 mt-8" style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)', border: '1px solid var(--navy-100)' }}>
          <h2 className="text-[14px] font-extrabold uppercase tracking-wide mb-3" style={{ color: 'var(--navy-700)' }}>핵심 요약</h2>
          {summary.map((s, i) => (
            <p key={i} className="text-[15.5px] leading-relaxed mb-2.5 last:mb-0" style={{ color: 'var(--navy-700)' }}>
              <RichText html={s} />
            </p>
          ))}
        </div>

        {/* 섹션 */}
        {sections.map((sec, i) => (
          <section key={i} className="pt-10 mt-10" style={{ borderTop: i === 0 ? 'none' : '1px solid var(--navy-100)' }}>
            {sec.snum && (
              <div className="text-[13px] font-extrabold tracking-wide mb-2" style={{ color: 'var(--navy-500)' }}>{sec.snum}</div>
            )}
            <h2 className="text-2xl sm:text-[28px] font-extrabold tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              {sec.title}
            </h2>
            {sec.blocks.map((b, j) => (
              <Block key={j} block={b} />
            ))}
          </section>
        ))}

        {/* 출처 */}
        <section className="pt-10 mt-10" style={{ borderTop: '1px solid var(--navy-100)' }}>
          <h2 className="text-lg font-extrabold mb-4" style={{ color: 'var(--navy-900)' }}>출처</h2>
          <ul className="text-[13px] leading-[1.9] space-y-1" style={{ color: 'var(--navy-500)' }}>
            {sources.map((s, i) => (
              <li key={i} className="relative pl-4">
                <span className="absolute left-1 font-extrabold" style={{ color: 'var(--navy-400)' }}>·</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 pt-6 text-xs leading-relaxed" style={{ borderTop: '1px solid var(--navy-100)', color: 'var(--navy-400)' }}>
          <div className="font-bold" style={{ color: 'var(--navy-700)' }}>LS AX 컨설팅 · AX 인사이트 리포트</div>
          <p className="mt-2">{disclaimer}</p>
        </footer>
      </div>
    </div>
  );
}
