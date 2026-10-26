import { ReportCover } from './EditorialVisuals';
import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, LockKeyhole } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { insightsData } from '../../data/insightsData';
import { GuardedReportLink } from '../auth/GuardedReportLink';
import { isPublicSampleReportLink } from '../../constants/publicSampleReportLinks';
const labels: Record<string, string> = {
  'Monthly Cancer Voice Report': '월간 암 환자 리포트',
  'Weekly LS Cancer Report': '주간 암 케어 리포트',
  'Healthcare Strategy Research': '의료 전략 리서치',
  'Disease Insight Report': '질환 인사이트',
  'Healthcare Strategy Notes': '전략 노트'
};
export function ReportArchive({
  industry = false
}: {
  industry?: boolean;
}) {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);
  const activeDomain = ['business', 'architecture'].includes(params.get('domain') || '') ? params.get('domain')! : 'all';
  const reports = useMemo(() => insightsData.filter(r => industry ? r.domain === 'business' || r.domain === 'architecture' : !r.domain || r.domain === 'healthcare'), [industry]);
  const categories = Array.from(new Set(reports.map(r => r.category)));
  const filtered = reports.filter(r => industry ? activeDomain === 'all' || r.domain === activeDomain : category === 'all' || r.category === category);
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * 6, safePage * 6);
  const filters = industry ? [['all', '전체'], ['business', '기업 AX'], ['architecture', '건축']] : [['all', '전체'], ...categories.map(c => [c, labels[c] || c])];
  const go = (n: number) => {
    setPage(n);
    top.current?.scrollIntoView({
      block: 'start',
      behavior: 'auto'
    });
  };
  return <div ref={top} id={industry ? 'business-insights' : 'medical-reports'}><div className="med-filters" aria-label={industry ? '산업 리포트 분류' : '의료 리포트 분류'}>{filters.map(([key, label]) => <button key={key} aria-pressed={(industry ? activeDomain : category) === key} onClick={() => {
        if (industry) {
          const next = new URLSearchParams(params);
          key === 'all' ? next.delete('domain') : next.set('domain', key);
          setParams(next, {
            replace: true
          });
        } else setCategory(key);
        setPage(1);
      }}>{label}</button>)}</div><div className="med-report-grid">{visible.map(r => <GuardedReportLink key={r.link} to={r.link} className="med-report-card"><ReportCover industry={industry}/><div className="med-report-access"><span className="med-pill">{labels[r.category] || r.category}</span><span>{isPublicSampleReportLink(r.link) ? '공개 리포트' : <><LockKeyhole size={12} style={{
                display: 'inline',
                marginRight: 5
              }} aria-hidden="true" />비밀번호 필요</>}</span></div><h3>{r.title}</h3><p>{r.excerpt}</p><div className="med-report-meta"><span>{r.date} · {r.readTime}</span><ArrowUpRight size={18} aria-hidden="true" /></div></GuardedReportLink>)}</div>{visible.length === 0 && <p role="status">해당 조건의 공개 보고서가 없습니다. 다른 분류를 선택해 보세요.</p>}{pages > 1 && <nav className="med-pagination" aria-label="리포트 페이지"><button disabled={safePage === 1} onClick={() => go(safePage - 1)} aria-label="이전 페이지"><ChevronLeft size={17} /></button>{Array.from({
        length: pages
      }, (_, i) => i + 1).map(n => <button key={n} aria-label={`${n}페이지`} aria-current={safePage === n ? 'page' : undefined} onClick={() => go(n)}>{n}</button>)}<button disabled={safePage === pages} onClick={() => go(safePage + 1)} aria-label="다음 페이지"><ChevronRight size={17} /></button></nav>}<p className="med-note" role="status">{filtered.length === 0 ? 0 : (safePage - 1) * 6 + 1}–{Math.min(safePage * 6, filtered.length)} / {filtered.length}개 리포트</p></div>;
}
