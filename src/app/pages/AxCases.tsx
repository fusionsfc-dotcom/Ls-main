import { Navigate, useLocation } from 'react-router';
import { AxNavigation, ContactBand, MedicalSEO, PageHero, SectionHeading } from '../components/medical/MedicalUI';
import { AxCaseSection } from '../components/medical/AxCaseSection';
import { ReportArchive } from '../components/medical/ReportArchive';
import { industryAxCases } from '../data/axCases';
export function AxCases() {
  const {
    hash,
    search
  } = useLocation();
  if (hash === '#how') return <Navigate replace to={'/ax' + search + '#process'} />;
  return <div className="med-site"><MedicalSEO title="모두의공간케어, 스페이스링크, GAAX, 제조·B2B 주문 AX 전환" description="공간 케어, 부동산·건설, 보험설계와 제조업의 업무를 연결하는 플랫폼 개발 사례를 소개합니다." path="/ax/cases" /><PageHero eyebrow="INDUSTRY AX" title={<>서로 다른 산업의 업무를<br />실제 서비스로 연결한 경험</>} text="고객의 요청과 현장 업무, 제품과 주문, 프로젝트와 협업을 연결합니다. 실제 설계·개발 범위와 현재 단계를 중심으로 기술 역량을 소개합니다." /><AxNavigation /><div className="med-wrap"><nav className="med-anchor-nav" aria-label="산업 AX 사례">{industryAxCases.map(c => <a key={c.id} href={`#${c.id}`}>{c.name}</a>)}</nav></div><section className="med-section"><div className="med-wrap">{industryAxCases.map(item => <AxCaseSection key={item.id} item={item} />)}</div></section><section className="med-section med-paper"><div className="med-wrap"><SectionHeading eyebrow="BUSINESS INSIGHTS" title="산업의 변화와 실행을 읽는 리포트" text="기업 AX와 건축·부동산의 변화, 실행 전략을 살펴보세요." /><ReportArchive industry /></div></section><ContactBand ax /></div>;
}
