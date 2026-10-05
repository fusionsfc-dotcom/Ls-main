import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { List, X, ArrowDownRight } from 'lucide-react';
import { useExperience } from './ExperienceProvider';

type PageSection = { element: HTMLElement; title: string };
export function SectionNavigator() {
  const { pathname } = useLocation(), { paused } = useExperience();
  const [sections, setSections] = useState<PageSection[]>([]), [active, setActive] = useState(0), [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
    const main = document.querySelector('main'); if (!main) return;
    let frame = 0, items: PageSection[] = [];
    const scan = () => {
      items = [...main.querySelectorAll<HTMLElement>('section')].map(element => ({ element, title: element.querySelector('h1,h2')?.textContent?.trim() ?? '' })).filter(item => item.title).slice(0, 12);
      setSections(items); update();
    };
    const update = () => { frame = 0; let index = 0; items.forEach((item, i) => { if (item.element.getBoundingClientRect().top <= innerHeight * 0.38) index = i; }); setActive(index); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new MutationObserver(scan); observer.observe(main, { childList: true, subtree: true }); scan();
    window.addEventListener('scroll', scroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, [pathname]);
  if (sections.length < 2 || pathname.startsWith('/report') || pathname.startsWith('/admin')) return null;
  const jump = (index: number) => { sections[index].element.scrollIntoView({ behavior: paused ? 'auto' : 'smooth', block: 'start' }); setOpen(false); };
  return <>
    <nav className="ax-section-rail" aria-label="페이지 섹션 탐색">{sections.map((section, index) => <button key={index} onClick={() => jump(index)} aria-label={section.title} aria-current={active === index ? 'location' : undefined}><i /><span>{section.title}</span></button>)}</nav>
    <button className="ax-section-toggle" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="ax-section-menu" aria-label={open ? '페이지 탐색 닫기' : '페이지 섹션 탐색 열기'}>{open ? <X size={13} /> : <List size={13} />}<span>페이지 탐색</span></button>
    {open && <nav className="ax-section-menu" id="ax-section-menu" aria-label="페이지 목차"><span>EXPLORE THIS PAGE</span>{sections.map((section, index) => <button key={index} onClick={() => jump(index)} aria-current={active === index ? 'location' : undefined}><small>{String(index + 1).padStart(2, '0')}</small><span>{section.title}</span><ArrowDownRight size={13} /></button>)}</nav>}
  </>;
}
