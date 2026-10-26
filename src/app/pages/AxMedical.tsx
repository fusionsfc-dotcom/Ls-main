import { AxNavigation, ContactBand, MedicalSEO, PageHero, TextLink } from '../components/medical/MedicalUI';
import { AxCaseSection } from '../components/medical/AxCaseSection';
import { medicalAxCases } from '../data/axCases';
export function AxMedical() {
  return <div className="med-site"><MedicalSEO title="환자 앱과 병원 프로그램 개발" description="해피라이프 앱, 해피케어 병원 프로그램, AI 최적화 웹사이트, 병원 오피스의 설계와 개발 사례를 소개합니다." path="/ax/medical" /><PageHero eyebrow="MEDICAL AX" title={<>환자와 병원의 접점을<br />연결하는 의료 AX</>} text="환자의 일상, 병원의 상담과 일정, 서비스 안내와 업무 도구. 현장에서 필요한 연결을 앱과 프로그램으로 구체화합니다." /><AxNavigation /><div className="med-wrap"><nav className="med-anchor-nav" aria-label="의료 AX 사례">{medicalAxCases.map(c => <a key={c.id} href={`#${c.id}`}>{c.name}</a>)}</nav></div><section className="med-section"><div className="med-wrap">{medicalAxCases.map(item => <AxCaseSection key={item.id} item={item} />)}</div></section><section className="med-section med-paper"><div className="med-wrap med-inline-banner"><div><h3>제주 병의원 홍보와 오피스 서비스</h3><p>제주닥터와 병의원 콘텐츠·온라인 운영 패키지를 살펴보세요.</p></div><TextLink to="/ax/medical/jeju">제주 서비스 보기</TextLink></div></section><ContactBand ax /></div>;
}
