import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Pause, Play, ArrowUpRight } from 'lucide-react';
import { useExperience } from './ExperienceProvider';
import { SectionNavigator } from './SectionNavigator';
import './experience.css';

const marketingPages = new Set(['/', '/services', '/healthcare', '/business', '/projects', '/about', '/insights']);
export function SiteExperience() {
  const { pathname } = useLocation();
  const { paused, toggle } = useExperience();
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.classList.add('ax-immersive');
    const header = document.querySelector('#root > div > header');
    header?.classList.add('ax-site-header');
    const scroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      header?.classList.toggle('ax-header-scrolled', scrollY > 28);
    };
    window.addEventListener('scroll', scroll, { passive: true }); scroll();
    return () => { window.removeEventListener('scroll', scroll); document.body.classList.remove('ax-immersive'); header?.classList.remove('ax-site-header', 'ax-header-scrolled'); };
  }, []);

  useEffect(() => {
    const main = document.querySelector('#root main');
    if (!main) return;
    let found: HTMLElement | null = null;
    const decorated = new Set<HTMLElement>();
    const scan = () => {
      if (found && (!found.isConnected || !main.contains(found))) {
        found = null;
      }
      if (marketingPages.has(pathname) && !found) {
        const heading = main.querySelector('h1');
        const section = heading?.closest('section');
        if (section instanceof HTMLElement) {
          found = section;
          section.classList.add('ax-hero');
          section.dataset.experience = pathname === '/' ? 'home' : pathname.slice(1);
          // Preserve the content tree; only add typography and layout hooks.
          const content = Array.from(section.children).find(child => child.contains(heading!));
          if (content instanceof HTMLElement) content.classList.add('ax-hero-content');
          const copy = section.querySelector<HTMLElement>('.max-w-4xl, .max-w-3xl');
          copy?.classList.add('ax-hero-copy');
        }
      }
      if (!pathname.startsWith('/reports') && !pathname.startsWith('/report') && !pathname.startsWith('/admin')) {
        main.querySelectorAll<HTMLElement>('a.rounded-2xl, div.rounded-2xl.border, article.rounded-2xl, div.rounded-2xl.p-7, div.rounded-2xl.p-8').forEach(card => {
          if (!card.closest('.ax-hero') && !card.closest('.ax-depth-card')) { card.classList.add('ax-depth-card'); decorated.add(card); }
        });
      }
    };
    const observer = new MutationObserver(scan); observer.observe(main, { childList: true, subtree: true }); scan();
    return () => { observer.disconnect(); found?.classList.remove('ax-hero'); found?.querySelector('.ax-hero-content')?.classList.remove('ax-hero-content'); found?.querySelector('.ax-hero-copy')?.classList.remove('ax-hero-copy'); decorated.forEach(card => card.classList.remove('ax-depth-card')); };
  }, [pathname]);

  useEffect(() => {
    const main = document.querySelector('#root main');
    if (!main || paused || !matchMedia('(pointer: fine)').matches) return;
    let active: HTMLElement | null = null;
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('.ax-depth-card') : null;
      if (active && active !== target) { active.style.removeProperty('--ax-rx'); active.style.removeProperty('--ax-ry'); }
      active = target;
      if (!target) return;
      const rect = target.getBoundingClientRect(), x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
      target.style.setProperty('--ax-rx', `${(0.5 - y) * 5}deg`); target.style.setProperty('--ax-ry', `${(x - 0.5) * 5}deg`);
      target.style.setProperty('--ax-px', `${x * 100}%`); target.style.setProperty('--ax-py', `${y * 100}%`);
    };
    main.addEventListener('pointermove', move as EventListener, { passive: true });
    return () => { main.removeEventListener('pointermove', move as EventListener); active?.style.removeProperty('--ax-rx'); active?.style.removeProperty('--ax-ry'); };
  }, [pathname, paused]);

  return <>
    <SectionNavigator />
    <div className="ax-reading-progress" ref={progress} aria-hidden="true" />
    <div className="ax-route-curtain" key={pathname} aria-hidden="true"><span>LS AX</span><ArrowUpRight /></div>
    <button className="ax-motion-control" onClick={toggle} aria-label={paused ? '모션 재생' : '모션 일시정지'} aria-pressed={paused} title={paused ? '모션 재생' : '모션 일시정지'}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? '모션 재생' : '모션 정지'}</span></button>
  </>;
}
