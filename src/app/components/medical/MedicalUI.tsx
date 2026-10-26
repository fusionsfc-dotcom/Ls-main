import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { SEO } from '../SEO';
import { brand, credentials } from '../../data/medicalPositioning';
import { axNavigation } from '../../data/siteNavigation';
import { PvmNetwork } from './PvmNetwork';
export function MedicalSEO({
  title,
  description,
  path,
  jsonLd
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: object | object[];
}) {
  return <SEO title={`${title} | LS AX 컨설팅`} description={description} url={`${brand.origin}${path}`} jsonLd={jsonLd} />;
}
export function Eyebrow({
  children
}: {
  children: ReactNode;
}) {
  return <p className="med-eyebrow"><span />{children}</p>;
}
export function ActionLink({
  to,
  children,
  secondary = false
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return <Link to={to} className={`med-button ${secondary ? 'med-button-secondary' : ''}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function TextLink({
  to,
  children
}: {
  to: string;
  children: ReactNode;
}) {
  return <Link className="med-text-link" to={to}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  children
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  children?: ReactNode;
}) {
  return <div className="med-section-heading"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p className="med-lead">{text}</p>}</div>{children}</div>;
}
export function PageHero({
  eyebrow,
  title,
  text,
  children
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  const { pathname } = useLocation();
  const tone = pathname.startsWith('/ax') ? 'technology' : pathname === '/projects' ? 'practice' : 'care';
  return <section className={`med-page-hero med-mapped-hero med-mapped-${tone}`}><PvmNetwork variant="compact" tone={tone} /><div className="med-wrap"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p className="med-lead">{text}</p>{children}</div></section>;
}
export function Credentials() {
  return <div className="med-credentials"><div className="med-wrap"><div className="med-stats">{credentials.map(c => <div key={c.number}><p className="med-stat-value">{c.number}<span>{c.unit}</span></p><h3>{c.title}</h3><p>{c.detail}</p></div>)}</div><p className="med-note">대표 수행 이력 기준 · 2026년 10월</p></div></div>;
}
export function ContactBand({
  ax = false
}: {
  ax?: boolean;
}) {
  return <section className="med-contact-band"><div className="med-wrap"><div><Eyebrow>LET’S WORK TOGETHER</Eyebrow><h2>{ax ? <>실제 업무에서 시작하는<br />AX를 이야기해 보세요.</> : <>지금 병원에 필요한 변화부터<br />이야기해 보세요.</>}</h2><p>{ax ? '현재 업무와 만들고 싶은 서비스를 듣고, 구현할 범위를 함께 정리합니다.' : '개원 준비, 상담과 교육, 서비스 정비, 홍보와 디지털 운영을 함께 검토합니다.'}</p></div><ActionLink to={`/contact?type=${ax ? 'ax' : 'hospital'}`}>{ax ? 'AX 상담하기' : '병원 컨설팅 상담'}</ActionLink></div></section>;
}
export function AxNavigation() {
  const {
    pathname
  } = useLocation();
  return <nav className="med-ax-nav med-wrap" aria-label="AX 분야">{axNavigation.map(n => <Link key={n.path} to={n.path} aria-current={pathname === n.path || n.path === '/ax/medical' && pathname.startsWith('/ax/medical/') ? 'page' : undefined}>{n.label}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</nav>;
}
export function Workflow({
  steps,
  label = '서비스 구조'
}: {
  steps: string[];
  label?: string;
}) {
  return <div className="med-workflow"><span className="med-caption">{label}</span><ol>{steps.map((step, i) => <li key={step}><span className="med-step-number">{String(i + 1).padStart(2, '0')}</span><strong>{step}</strong>{i < steps.length - 1 && <ArrowRight size={18} aria-hidden="true" />}</li>)}</ol></div>;
}
export function FaqList({
  items
}: {
  items: {
    question: string;
    answer: string;
  }[];
}) {
  return <div className="med-faq">{items.map(item => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>;
}
