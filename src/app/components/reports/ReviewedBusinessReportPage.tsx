import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { SEO } from '../SEO';
import type { PublishedBusinessReport } from '../../data/reviewedBusinessReports';
import './ReviewedBusinessReportPage.css';

const SITE = 'https://www.lsconsulting.co.kr';

export function ReviewedBusinessReportPage({ report, canonicalPath }: { report: PublishedBusinessReport; canonicalPath: string }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const number = (id: string) => {
      const input = root.querySelector<HTMLInputElement>(`#${id}`);
      if (!input) return 0;
      const parsed = Number(input.value);
      return Math.min(Number(input.max), Math.max(Number(input.min), Number.isFinite(parsed) ? parsed : 0));
    };
    const format = (n: number, digits = 0) => n.toLocaleString('ko-KR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const text = (id: string, value: string) => {
      const node = root.querySelector(`#${id}`);
      if (node) node.textContent = value;
    };
    const update = () => {
      if (report.kind === 'ax') {
        const volume = number('ax-volume'), before = number('ax-before'), after = number('ax-after'), share = number('ax-share') / 100, ops = number('ax-ops');
        const baseline = volume * before / 60;
        const expected = volume * (share * after + (1 - share) * before) / 60 + ops;
        const net = baseline - expected;
        text('ax-baseline', format(baseline, 1));
        text('ax-expected', format(expected, 1));
        text('ax-net', format(Math.abs(net), 1));
        text('ax-net-label', net >= 0 ? '순 확보 시간' : '추가 소요 시간');
        text('ax-model-note', `가정 적용 ${format(volume * share, 1)}건 / 미적용 ${format(volume * (1 - share), 1)}건. 추가 운영 ${format(ops, 1)}시간을 포함했습니다.${net < 0 ? ' 현재 가정에서는 시간이 늘어납니다. 적용 범위와 검토 부담을 다시 점검하세요.' : ''}`);
      } else {
        const stages = [number('realty-visits')];
        for (const id of ['realty-inquiry', 'realty-qualified', 'realty-tour']) stages.push(stages[stages.length - 1] * number(id) / 100);
        stages.forEach((n, i) => text(`realty-n${i + 1}`, format(n, Number.isInteger(n) ? 0 : 1)));
      }
    };
    const normalize = (event: Event) => {
      const input = event.target;
      if (input instanceof HTMLInputElement) input.value = input.value === '' ? input.min : String(number(input.id));
      update();
    };
    const jump = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest<HTMLButtonElement>('[data-jump]');
      const id = button?.dataset.jump;
      if (id) root.querySelector(`#${id}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    };
    root.addEventListener('input', update);
    root.addEventListener('change', normalize);
    root.addEventListener('click', jump);
    update();
    return () => {
      root.removeEventListener('input', update);
      root.removeEventListener('change', normalize);
      root.removeEventListener('click', jump);
    };
  }, [report]);

  const url = `${SITE}${canonicalPath}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: report.title, description: report.description, url, mainEntityOfPage: url,
    datePublished: '2026-06-18', dateModified: '2026-10-05', inLanguage: 'ko-KR',
    author: { '@type': 'Organization', name: 'LS AX 컨설팅' },
    publisher: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': `${SITE}/#org` },
    articleSection: report.category,
  };
  return (
    <div className="ls-report">
      <SEO title={`${report.title} | LS AX 컨설팅`} description={report.description} url={url} jsonLd={jsonLd} />
      <nav className="wrap report-switch" aria-label="리포트 분야">
        <Link to="/insights">리포트 목록</Link>
        <Link to="/reports/business/enterprise-ax-state-2026" aria-current={report.kind === 'ax' ? 'page' : undefined}>기업 AX</Link>
        <Link to="/reports/business/realty-undersold-turnaround-2026-06" aria-current={report.kind === 'realty' ? 'page' : undefined}>건축 리포트</Link>
      </nav>
      {/* This is checked-in, approved editorial HTML, never user-submitted content. */}
      <div ref={container} dangerouslySetInnerHTML={{ __html: report.html }} />
    </div>
  );
}
