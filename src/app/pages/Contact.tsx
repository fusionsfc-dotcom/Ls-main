
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { ArrowUpRight, Copy, Mail, Phone } from 'lucide-react';
import { brand } from '../data/medicalPositioning';
import { MedicalSEO, PageHero } from '../components/medical/MedicalUI';
const options = ['개원·서비스 기획', '상담·직원교육', '홍보·콘텐츠', '의료 AX', '기업 AX', '기타'];
export function Contact() {
  const [params, setParams] = useSearchParams();
  const selected = options.includes(params.get('topic') || '') ? params.get('topic')! : params.get('type') === 'ax' ? '기업 AX' : '개원·서비스 기획';
  const [copyMessage, setCopyMessage] = useState('');
  const isAx = selected === '기업 AX' || selected === '의료 AX';
  const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(`[${isAx ? 'AX' : '병원 컨설팅'} 문의] ${selected}`)}&body=${encodeURIComponent('기관·회사명: \n담당 역할: \n현재 상황: \n검토하고 싶은 과제: \n')}`;
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopyMessage('이메일 주소를 복사했습니다.');
    } catch {
      setCopyMessage('위 이메일 주소를 선택해 복사해 주세요.');
    }
  }
  return <div className="med-site"><MedicalSEO title="병원 컨설팅과 AX 상담" description="개원, 서비스 운영, 상담·교육, 홍보, 의료 및 기업 AX 과제를 전화와 이메일로 문의하세요." path="/contact" /><PageHero eyebrow="LET’S TALK" title={<>병원의 현재 과제부터<br />함께 살펴보겠습니다.</>} text="개원 준비, 서비스 운영, 상담과 교육, 디지털 업무까지. 현재 상황을 듣고 함께 검토할 과제를 정리하겠습니다." />
    <section className="med-section"><div className="med-wrap med-contact-grid"><div><span className="med-caption">01 / 상담 주제</span><h2 style={{
            fontSize: 28,
            marginTop: 18
          }}>어떤 과제를 검토하고 계신가요?</h2><div className="med-contact-options" aria-label="상담 주제">{options.map(o => <button key={o} aria-pressed={selected === o} onClick={() => {
              setParams({
                type: o.includes('AX') ? 'ax' : 'hospital',
                topic: o
              }, {
                replace: true
              });
              setCopyMessage('');
            }}>{o}</button>)}</div><span className="med-caption">02 / 함께 알려주시면 좋습니다</span><ul className="med-contact-list"><li>기관 또는 회사명과 담당 역할</li><li>현재 준비 중이거나 개선하고 싶은 상황</li><li>검토하고 싶은 과제와 범위</li></ul><p className="med-note">병원·기업의 사업 과제를 위한 상담입니다. 환자명이나 의무기록은 보내지 않으셔도 됩니다.</p></div>
    <div className="med-contact-card"><div className="ed-contact-person"><img src="/images/optimized-v1/consultant-480.webp" width="480" height="646" loading="lazy" decoding="async" alt="석현이 대표 컨설턴트"/><div><strong>석현이</strong><span>대표 컨설턴트</span><p>현장의 과제부터 듣겠습니다.</p></div></div><span className="med-caption">CONTACT LS AX</span><h2>{selected} 상담</h2><a className="med-button" href={brand.dial}><Phone size={17} aria-hidden="true" />{brand.phone}<ArrowUpRight size={17} aria-hidden="true" /></a><a className="med-button med-button-secondary" href={mailto}><Mail size={17} aria-hidden="true" />메일 앱 열기<ArrowUpRight size={17} aria-hidden="true" /></a><address>{brand.email}</address><button className="med-copy" onClick={copyEmail}><Copy size={14} aria-hidden="true" />이메일 주소 복사</button><p className="med-note" role="status">{copyMessage || '메일 앱에서 내용을 작성하고 직접 보내 주세요.'}</p></div></div></section>
    <section className="med-section med-paper"><div className="med-wrap med-inline-banner"><div><h3>환자·보호자를 위한 정보를 찾으시나요?</h3><p>해피라이프케어에서 건강정보와 병원 안내를 살펴보실 수 있습니다.</p></div><a className="med-text-link" href="https://happylifecare.kr/" target="_blank" rel="noopener noreferrer">해피라이프케어<ArrowUpRight size={18} aria-hidden="true" /></a></div></section></div>;
}
