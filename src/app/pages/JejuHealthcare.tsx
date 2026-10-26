import { HospitalPhoto, PrincipleIcon } from '../components/medical/EditorialVisuals';
import { ArrowUpRight } from 'lucide-react';
import { AxNavigation, ContactBand, MedicalSEO, PageHero, SectionHeading, TextLink } from '../components/medical/MedicalUI';
import { brand } from '../data/medicalPositioning';
const tiers = [{
  name: '스타트',
  price: '50',
  who: '온라인 홍보를 시작하는 의원·치과',
  items: ['제주닥터 페이지 관리 대행', '블로그·인스타그램 콘텐츠', '온라인 예약 연계 검토', '월간 리포트']
}, {
  name: '스탠다드',
  price: '80',
  who: '콘텐츠와 안내 접점을 확장하는 의원',
  items: ['스타트 제공 범위', '유튜브 쇼츠 제작·업로드', 'AI 안내 상담 도입 검토', '후속 연락·리콜 업무 설계']
}, {
  name: '프리미엄',
  price: '150',
  who: '웹사이트와 프로그램이 필요한 병원',
  items: ['스탠다드 제공 범위', 'AI 최적화 홈페이지 제작·운영', '병원 맞춤 오피스 개발 범위 협의', '진료과별 페이지·담당자 방문 협의']
}];
const websites = [['서울힐링요양병원', 'https://www.seoulhealinghospital.co.kr/'], ['흥덕우리요양병원', 'http://hdwoori.com/'], ['러스크서울병원', 'https://ruskseoul.co.kr/'], ['춘천태동요양병원', 'https://www.taedonghp.co.kr/'], ['뷰티풀한방병원', 'https://www.btful.co.kr/'], ['네이처요양병원', 'https://www.naturehospital.co.kr/']];
export function JejuHealthcare() {
  return <div className="med-site"><MedicalSEO title="제주 병의원 홍보와 오피스 서비스" description="제주닥터, 병의원 콘텐츠와 홈페이지, 병원 오피스의 도입 범위를 함께 검토하는 제주 병의원 서비스입니다." path="/ax/medical/jeju" /><PageHero eyebrow="JEJU · LOCAL HEALTHCARE" title={<>제주 병의원의 온라인 접점과<br />일상의 운영을 연결합니다.</>} text="병원 정보와 콘텐츠, 홈페이지, 예약과 후속 연락의 업무까지. 제주닥터와 병원 오피스를 기반으로 필요한 범위를 함께 검토합니다." /><AxNavigation />
    <section className="med-section"><div className="med-wrap"><SectionHeading eyebrow="INFORMATION · COMMUNICATION · OPERATION" title="환자가 찾고, 병원이 안내하는 흐름" /><div className="med-values">{[['01', '병원 정보 정리', '제주닥터의 병원 페이지에서 진료시간, 휴진, 위치와 서비스 정보를 정확하게 안내합니다.'], ['02', '콘텐츠와 홈페이지', '블로그, 인스타그램, 유튜브와 홈페이지의 정보를 병원의 실제 서비스에 맞춰 정리합니다.'], ['03', '병원 오피스', '예약·일정·후속 연락의 업무를 살펴 도입하거나 개발할 범위를 정합니다.']].map(([n, t, p]) => <article key={n}><PrincipleIcon index={Number(n)-1}/><span className="med-caption">{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div><div className="med-actions"><TextLink to="/contact?type=ax&topic=%EC%9D%98%EB%A3%8C%20AX">제주닥터 도입 상담</TextLink><TextLink to="/ax/medical#hospital-office">병원 오피스 소개</TextLink></div></div></section>
    <section id="package" className="med-section med-paper"><div className="med-wrap"><SectionHeading eyebrow="JEJU SERVICE PACKAGES" title="필요한 범위에 맞춘 운영 패키지" text="기존 제주 병의원 상품의 제안가입니다. 콘텐츠 수량, 기능 연결, 맞춤 개발과 계약 조건은 상담에서 확인합니다." /><div className="med-pricing-grid">{tiers.map(t => <article className="med-price" key={t.name}><span className="med-caption">{t.who}</span><h3 style={{
              marginTop: 18
            }}>{t.name}</h3><strong>{t.price}<span>만 원 / 월부터</span></strong><ul>{t.items.map(i => <li key={i}>{i}</li>)}</ul><a className="med-button" href={brand.dial}>패키지 전화 상담<ArrowUpRight size={17} /></a></article>)}</div><p className="med-note">암요양·암재활 전문 컨설팅의 공통 가격이 아닙니다. 콘텐츠 검토와 개발 범위, 부가세 및 별도 비용은 계약 전에 확인합니다. 진료·처방·청구를 수행하는 EMR의 대체 제품으로 안내하지 않습니다.</p></div></section>
    <section id="happylifecare" className="med-section"><div className="med-wrap med-inline-banner"><div><h3>환자 앱과 병원 프로그램</h3><p>해피라이프와 해피케어의 서비스 구조와 개발 사례를 확인해 보세요.</p></div><TextLink to="/ax/medical#happy-life">의료 AX 보기</TextLink></div></section>
    <section className="med-section med-paper"><div className="med-wrap"><SectionHeading eyebrow="WEBSITE EXPERIENCE" title="병원 웹사이트 관련 사례" text="기존에 소개한 병원 웹사이트 링크입니다. 개원·운영 컨설팅의 수행 연도와 범위는 병원 프로젝트에서 확인할 수 있습니다." /><div className="ed-history-layout"><HospitalPhoto id="taedong" caption="춘천태동요양병원 · 기존 홈페이지 관련 소개 사진" /><div className="med-question-list">{websites.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={20} /></a>)}</div></div></div></section><ContactBand ax /></div>;
}
