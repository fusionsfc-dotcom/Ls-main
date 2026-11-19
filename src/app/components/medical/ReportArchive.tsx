import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { insightsData } from '../../data/insightsData';
import { GuardedReportLink } from '../auth/GuardedReportLink';
import { publicationSortTime } from '../../data/publication';
const labels: Record<string, string> = {
  'Monthly Cancer Voice Report': '월간 암 환자 리포트',
  'Weekly LS Cancer Report': '주간 암 케어 리포트',
  'Healthcare Strategy Research': '의료 전략 리서치',
  'Disease Insight Report': '질환 인사이트',
  'Healthcare Strategy Notes': '전략 노트'
};

const specificCancerName = /(간암|폐암|유방암|대장암|직장암|위암|췌장암|담도암|담낭암|전립선암|갑상선암|신장암|신우암|방광암|난소암|자궁경부암|자궁내막암|혈액암|백혈병|림프종|다발골수종|뇌종양|구강암|후두암|식도암|피부암|흑색종|골육종|연부조직육종|소아암)/;
const medicalCategory = (title: string, board?: 'patient-research' | 'cancer-report') => board || (specificCancerName.test(title.replace(/\s/g, '')) ? 'patient-research' : 'cancer-report');
const medicalCategoryLabels: Record<string, string> = {
  'patient-research': '환자 리포트',
  'cancer-report': '암 리포트'
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
  const reports = useMemo(() => insightsData.filter(r => industry ? r.domain === 'business' || r.domain === 'architecture' : !r.domain || r.domain === 'healthcare').sort((a,b)=>publicationSortTime(b)-publicationSortTime(a)), [industry]);
  const filtered = reports.filter(r => industry ? activeDomain === 'all' || r.domain === activeDomain : category === 'all' || medicalCategory(r.title, r.medicalBoard) === category);
  const pageSize = industry ? 6 : 10;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const visible = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const filters = industry ? [['all', '전체'], ['business', '기업 AX'], ['architecture', '건축']] : [['all', '전체'], ['patient-research', '환자 리포트'], ['cancer-report', '암 리포트']];
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
      }}>{label}</button>)}</div><div className="med-report-grid med-report-list">{visible.map(r => <GuardedReportLink key={r.link} to={r.link} className="med-report-card"><div className="med-report-access"><span className="med-pill">{industry ? labels[r.category] || r.category : medicalCategoryLabels[medicalCategory(r.title, r.medicalBoard)]}</span></div><h3>{r.title}</h3><p>{r.excerpt}</p><div className="med-report-meta"><span>{r.date} · {r.readTime}</span><ArrowUpRight size={18} aria-hidden="true" /></div></GuardedReportLink>)}</div>{visible.length === 0 && <p role="status">해당 주제의 리포트가 없습니다. 다른 분류를 선택해 보세요.</p>}{pages > 1 && <nav className="med-pagination" aria-label="리포트 페이지"><button disabled={safePage === 1} onClick={() => go(safePage - 1)} aria-label="이전 페이지"><ChevronLeft size={17} /></button>{Array.from({
        length: pages
      }, (_, i) => i + 1).map(n => <button key={n} aria-label={`${n}페이지`} aria-current={safePage === n ? 'page' : undefined} onClick={() => go(n)}>{n}</button>)}<button disabled={safePage === pages} onClick={() => go(safePage + 1)} aria-label="다음 페이지"><ChevronRight size={17} /></button></nav>}<p className="med-note" role="status">{filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} / {filtered.length}개 리포트</p><details className="med-all-reports"><summary>전체 리포트 목록 ({reports.length})</summary><ul>{reports.map(report=><li key={report.link}><GuardedReportLink to={report.link}>{report.title.replace(/\n/g,' ')}</GuardedReportLink><span>{report.date}</span></li>)}</ul></details><a className="med-text-link med-rss-link" href="/rss.xml">인사이트 RSS 구독 <ArrowUpRight size={16} aria-hidden="true"/></a></div>;
}
