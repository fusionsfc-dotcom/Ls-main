import { ServicePhoto } from '../components/medical/ServicePhoto';
import { HospitalPhoto } from '../components/medical/EditorialVisuals';
import { useLocation, Navigate } from 'react-router';
import { ActionLink, ContactBand, Eyebrow, FaqList, MedicalSEO, PageHero, SectionHeading, TextLink } from '../components/medical/MedicalUI';
import { medicalFaqs, medicalServices, processSteps } from '../data/medicalPositioning';
export function Healthcare() {
  const {
    hash
  } = useLocation();
  if (hash === '#package') return <Navigate replace to="/ax/medical/jeju#package" />;
  if (hash === '#happylifecare') return <Navigate replace to="/ax/medical#happy-life" />;
  return <div className="med-site">
    <MedicalSEO title="암요양·암재활 병원 개원과 운영 컨설팅" description="개원 기획, 의료서비스 설계, 상담 체계, 직원교육, 홍보와 디지털 운영을 병원의 단계와 과제에 맞춰 함께 검토합니다." path="/healthcare" jsonLd={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: medicalFaqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer
        }
      }))
    }} />
    <PageHero eyebrow="MEDICAL CONSULTING" title={<>암요양·암재활 병원의<br />개원과 운영을 함께 설계합니다.</>} text="환자에게 필요한 서비스와 병원이 실행할 수 있는 운영을 연결합니다. 병원의 단계와 과제에 맞춰 기획, 상담, 직원교육, 홍보와 디지털 운영을 함께 검토합니다."><div className="med-actions"><ActionLink to="/contact?type=hospital">병원 컨설팅 상담</ActionLink></div></PageHero>
    <div className="med-wrap"><nav className="med-anchor-nav" aria-label="컨설팅 분야">{medicalServices.map(s => <a key={s.id} href={`#${s.id}`}>{s.title}</a>)}</nav></div>
    <section className="med-section"><div className="med-wrap"><SectionHeading eyebrow="SCOPE & DELIVERABLES" title="병원의 과제에 맞춰 함께 만드는 것" text="필요한 업무를 조합해 범위를 정합니다. 아래 산출물은 상담 후 병원의 상황에 맞춰 구체화할 수 있는 제안 범위입니다." />{medicalServices.map(s => <article className="med-service-detail" id={s.id} key={s.id}><div className="ed-service-art"><ServicePhoto kind={s.id}/><span className="med-number">{s.number}</span></div><div><h2>{s.title}</h2><p>{s.description}</p>{s.id === 'digital' && <TextLink to="/ax/medical">의료 AX 개발 사례</TextLink>}</div><div className="med-deliverables"><span className="med-caption">함께 만드는 산출물</span><ul>{s.output.split(' · ').map(x => <li key={x}>{x}</li>)}</ul></div></article>)}</div></section>
    <section className="med-section med-paper"><div className="med-wrap"><SectionHeading eyebrow="HOW WE WORK" title="과제를 듣고, 실행과 점검까지" text="병원의 현재 단계와 담당자의 실행 여건에 맞춰 진행 범위와 일정을 정합니다." /><div className="med-process">{processSteps.map(([title, text], i) => <article key={title}><span className="med-caption">0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="med-section"><div className="med-wrap med-split"><div><Eyebrow>CARE IN CONTEXT</Eyebrow><h2>암요양과 암재활,<br />각 현장의 맥락을 살핍니다.</h2><p className="med-lead">입원 전 안내와 생활, 환자·보호자 상담부터 일상 복귀를 돕는 서비스 접점까지. 병원의 역할과 환자의 상황에 맞는 운영 과제를 검토합니다.</p><HospitalPhoto id="seoul-healing" caption="서울힐링요양병원 · 기존 프로젝트 소개 사진" /></div><div className="med-question-list"><a href="#service-design">암요양 · 입원과 생활의 서비스 접점<span>01</span></a><a href="#training">암재활 · 일상 복귀와 안내의 연결<span>02</span></a><a href="#consultation">공통 · 상담, 교육, 부서 간 협업<span>03</span></a></div></div></section>
    <section className="med-section med-paper"><div className="med-wrap med-split"><div><Eyebrow>QUESTIONS & ANSWERS</Eyebrow><h2>상담 전에<br />궁금한 점</h2></div><FaqList items={medicalFaqs} /></div></section><ContactBand />
  </div>;
}
