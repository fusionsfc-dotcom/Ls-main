import { Navigate, useSearchParams } from 'react-router';
import { ContactBand, Eyebrow, MedicalSEO } from '../components/medical/MedicalUI';
import { Newsletter } from '../components/medical/Newsletter';
import { ReportArchive } from '../components/medical/ReportArchive';
import { insightsData } from '../data/insightsData';
import { brand } from '../data/medicalPositioning';
export function Insights() {
  const [params] = useSearchParams();
  const domain = params.get('domain');
  if (domain === 'business' || domain === 'architecture') return <Navigate replace to={`/ax/cases?domain=${domain}#business-insights`} />;
  const reports = insightsData.filter(r => !r.domain || r.domain === 'healthcare');
  return <div className="med-site"><MedicalSEO title="PVM 환자 인사이트와 의료서비스 연구" description="환자의 질문과 경험을 구조화한 PVM과 의료 보고서로 상담, 직원교육, 콘텐츠와 서비스 개선 과제를 살펴봅니다." path="/insights" jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'PVM 환자 인사이트',
      url: brand.origin + '/insights',
      blogPost: reports.map(r => ({
        '@type': 'BlogPosting',
        headline: r.title.replace(/\n/g, ' '),
        url: brand.origin + r.link
      }))
    }} />
    <section className="med-section med-paper med-research-section med-insights-direct"><div className="med-wrap"><div className="med-section-heading"><div><Eyebrow>PVM · RESEARCH ARCHIVE</Eyebrow><h1>환자와 병원을 위한 인사이트</h1><p className="med-lead">의료 보고서와 연구를 주제별로 살펴보세요. 각 보고서의 공개 범위와 자료 기준을 함께 확인할 수 있습니다.</p></div></div><ReportArchive /></div></section><Newsletter /><ContactBand /></div>;
}
