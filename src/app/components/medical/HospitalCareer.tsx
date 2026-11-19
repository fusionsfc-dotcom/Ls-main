import { Link } from 'react-router';
import { hospitalProjects } from '../../data/hospitalProjects';
import { SectionHeading, TextLink } from './MedicalUI';

export function HospitalCareer() {
  const photographs=hospitalProjects.filter(project=>project.image);
  return <section id="hospital-career" className="med-section med-paper hospital-career">
    <div className="med-wrap">
      <SectionHeading eyebrow="HOSPITAL PROJECT EXPERIENCE" title="함께해 온 병원프로젝트" text="개원 기획부터 직원교육, 홍보와 운영지원까지. 병원별 수행 이력을 소개합니다.">
        <TextLink to="/projects">병원프로젝트 자세히 보기</TextLink>
      </SectionHeading>
      <div className="hospital-career-photos">{photographs.map(project=><figure key={project.id}>
        <Link to={`/projects#${project.id}`} aria-label={`${project.name} 수행 이력 보기`}>
          <div className="hospital-career-photo"><img src={project.image!.src} srcSet={project.image!.srcSet} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1180px) 46vw, 584px" width="720" height="405" loading="lazy" decoding="async" alt={project.image!.alt}/></div>
          <figcaption><span><strong>{project.name}</strong><small>{project.category}</small></span><span aria-hidden="true">↗</span></figcaption>
        </Link>
      </figure>)}</div>
      <div className="hospital-career-records">
        <div className="hospital-career-list-heading"><h3>기관별 주요 수행 이력</h3><span>{hospitalProjects.length}개 기관</span></div>
        <ol>{hospitalProjects.map(project=><li key={project.id}>
          <h4><Link to={`/projects#${project.id}`}>{project.name}<span aria-hidden="true">↗</span></Link></h4>
          <ul>{project.records.map(record=><li key={record.scope}><span>{record.year??'수행 과업'}</span><p>{record.scope}</p></li>)}</ul>
        </li>)}</ol>
      </div>
      <p className="med-note">공개된 주요 수행 사례입니다. 수행 당시의 기관명·연도·과업 기준이며, 대표의 전체 수행 이력과는 집계 범위가 다릅니다.</p>
    </div>
  </section>;
}
