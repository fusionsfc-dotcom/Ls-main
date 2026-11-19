import { Link } from 'react-router';
import { BrandLogo } from './Header';
import { brand } from '../data/medicalPositioning';
import { mainNavigation } from '../data/siteNavigation';
export function Footer(_props: {
  hidePricing?: boolean;
}) {
  return <footer className="med-footer"><div className="med-wrap"><div className="med-footer-grid"><div><BrandLogo /><p className="med-footer-intro">암요양·암재활 의료서비스 컨설팅<br />현장의 경험과 환자의 목소리로<br />병원에 필요한 변화를 함께 설계합니다.</p></div><div><h2>EXPLORE</h2><ul>{mainNavigation.map(n => <li key={n.path}><Link to={n.path}>{n.label}</Link></li>)}<li><Link to="/ax/medical/jeju">제주 병의원 서비스</Link></li></ul></div><div><h2>CONTACT</h2><ul><li><a href={brand.dial}>{brand.phone}</a></li><li><a href={`mailto:${brand.email}`}>{brand.email}</a></li><li><Link to="/contact">컨설팅 상담 안내 ↗</Link></li><li><Link to="/patients">환자·보호자 안내</Link></li><li><a href="https://happylifecare.kr/" target="_blank" rel="noopener noreferrer">해피라이프케어 ↗</a></li></ul></div></div><div className="med-footer-bottom"><span>© LS AX Consulting. 병원 안의 경험으로, 현장에 맞는 답을 만듭니다.</span><span>Healthcare consulting · Research · AX</span></div></div></footer>;
}
