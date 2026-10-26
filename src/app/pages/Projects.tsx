
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { ContactBand, MedicalSEO, PageHero, SectionHeading, TextLink } from '../components/medical/MedicalUI';
import { hospitalProjects } from '../data/hospitalProjects';
export function Projects() {
  const [filter, setFilter] = useState('전체');
  const {
    hash
  } = useLocation();
  useEffect(() => {
    if (hash) setFilter('전체');
  }, [hash]);
  const projects = hospitalProjects.filter(p => filter === '전체' || p.tags.includes(filter)).sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  return <div className="med-site"><MedicalSEO title="병원 개원과 운영 프로젝트" description="암요양병원·한방병원·재활병원과 의료법인의 개원기획, 홍보·경영지원 등 주요 수행 이력을 소개합니다." path="/projects" />
    <PageHero eyebrow="HOSPITAL PROJECTS" title={<>개원과 운영 현장에서 쌓아온<br />병원 프로젝트</>} text="암요양병원·한방병원·재활병원과 의료법인의 기획, 개원, 홍보·경영지원 경험을 소개합니다." />
    <section className="med-section med-portfolio-section"><div className="med-wrap"><SectionHeading eyebrow="HOSPITAL PORTFOLIO" title={<>병원의 시작부터,<br />매일의 운영까지.</>} text="기관별 수행 시기와 과업을 살펴보세요. 개원·기획, 홍보·경영지원, 재활 연계 분야로 나누어 볼 수 있습니다." /><div className="med-filters" aria-label="프로젝트 분야">{['전체', '개원·기획', '홍보·경영지원', '재활 연계'].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}</div><p className="med-caption" role="status" style={{
          marginBottom: 22
        }}>{projects.length}개의 주요 수행 사례</p><div className="med-project-grid">{projects.map((p, index) => <article id={p.id} className="med-project" key={p.id}>{p.image && <figure className="med-project-image"><img src={p.image.src} srcSet={p.image.srcSet} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1180px) 46vw, 560px" decoding="async" fetchPriority="low" alt={p.image.alt} loading="lazy" width="720" height="405" /></figure>}<div className="med-project-content"><div className="med-project-kicker"><span className="med-caption">{p.category}</span><span className="med-project-index">{String(index+1).padStart(2, '0')}</span></div><h2>{p.name}</h2>{p.records.map(r => <div className="med-project-record" key={r.year ?? r.scope}><span>{r.year ?? '과업'}</span><p>{r.scope}</p></div>)}<div className="med-mini-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>{p.website && <a className="med-text-link med-project-website" href={p.website} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} 홈페이지 새 창으로 보기`}>병원 홈페이지 ↗</a>}</div></article>)}</div><p className="med-note">공개된 주요 수행 사례입니다. 수행 당시의 기관명·연도·과업 기준이며, 대표의 전체 수행 이력과는 집계 범위가 다릅니다.</p><div className="med-actions"><TextLink to="/about">대표의 전체 경력 보기</TextLink></div></div></section>
    <section className="med-section med-paper"><div className="med-wrap med-inline-banner"><div><h3>앱과 업무 플랫폼의 개발 경험도 살펴보세요.</h3><p>의료 AX와 타 산업의 기술사례는 AX 메뉴에서 소개합니다.</p></div><TextLink to="/ax">AX 개발 사례</TextLink></div></section><ContactBand /></div>;
}
