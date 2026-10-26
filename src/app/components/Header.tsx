import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { mainNavigation } from '../data/siteNavigation';
export function BrandLogo() {
  return <Link to="/" className="med-logo" aria-label="LS AX 컨설팅 홈"><span className="med-logo-mark" aria-hidden="true">LS</span><span className="med-logo-text"><strong>LS AX 컨설팅</strong><small>HEALTHCARE CONSULTING & AX</small></span></Link>;
}
export function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const active = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');
  useEffect(() => setOpen(false), [location.pathname, location.search, location.hash]);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = Array.from(dialog.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') || []);
      const first = focusable[0],
        last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    document.addEventListener('keydown', key);
    window.addEventListener('resize', resize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', key);
      window.removeEventListener('resize', resize);
      trigger.current?.focus();
    };
  }, [open]);
  return <><a className="med-skip" href="#main-content">본문으로 바로가기</a><header className="med-header"><div className="med-wrap med-header-inner"><BrandLogo /><nav className="med-desktop-nav" aria-label="주 메뉴">{mainNavigation.map(n => <Link key={n.path} to={n.path} aria-current={active(n.path) ? 'page' : undefined}>{n.label}</Link>)}</nav><Link to="/contact" className="med-header-cta">병원 컨설팅 상담 ↗</Link><button ref={trigger} className="med-menu-button" aria-label="메뉴 열기" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}><Menu size={25} /></button></div></header>{open && <div className="med-header med-mobile-menu" id="mobile-navigation" ref={dialog} role="dialog" aria-modal="true" aria-label="사이트 메뉴"><div className="med-mobile-menu-top"><BrandLogo /><button ref={close} className="med-menu-button" aria-label="메뉴 닫기" onClick={() => setOpen(false)}><X size={26} /></button></div><nav aria-label="모바일 주 메뉴">{mainNavigation.map(n => <Link key={n.path} to={n.path} onClick={() => setOpen(false)} aria-current={active(n.path) ? 'page' : undefined}>{n.label}</Link>)}</nav><Link to="/contact" className="med-button" onClick={() => setOpen(false)}>병원 컨설팅 상담<ArrowUpRight size={18} /></Link></div>}</>;
}
