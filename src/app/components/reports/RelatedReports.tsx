import { insightsData } from '../../data/insightsData';
import { publicationSortTime } from '../../data/publication';
import './related-reports.css';

const categoryLabels: Record<string,string> = {
  'Monthly Cancer Voice Report':'월간 암 환자 리포트',
  'Weekly LS Cancer Report':'주간 암 케어 리포트',
  'Healthcare Strategy Research':'의료 전략 리서치',
  'Disease Insight Report':'질환 인사이트',
  'Healthcare Strategy Notes':'전략 노트'
};

/** Shared by React report pages and build-time standalone HTML reports. */
export function RelatedReports({ pathname }: { pathname:string }) {
  const path=pathname.replace(/\/$/,'');
  const current=insightsData.find(report=>report.link===path);
  const domain=current?.domain||'healthcare';
  const reports=insightsData.filter(report=>report.link!==path).sort((a,b)=>
    Number((b.domain||'healthcare')===domain)-Number((a.domain||'healthcare')===domain)
    || publicationSortTime(b)-publicationSortTime(a)
  ).slice(0,6);
  if(!reports.length)return null;
  return <nav className="ls-related-reports" aria-labelledby="ls-related-heading">
    <div className="ls-related-inner">
      <div className="ls-related-heading"><div><p>CONTINUE READING</p><h2 id="ls-related-heading">다른 리포트도 살펴보세요</h2></div><a className="ls-related-all" href={domain==='healthcare'?'/insights#medical-reports':'/ax/cases#business-insights'}>전체 리포트 보기 <span aria-hidden="true">↗</span></a></div>
      <ul className="ls-related-list">{reports.map(report=><li key={report.link}><a href={report.link}>
        <span className="ls-related-category">{categoryLabels[report.category]||report.category}</span>
        <h3>{report.title.replace(/\n/g,' ')}</h3>
        <p>{report.excerpt}</p>
        <span className="ls-related-meta">{report.date}<span aria-hidden="true">↗</span></span>
      </a></li>)}</ul>
    </div>
  </nav>;
}
