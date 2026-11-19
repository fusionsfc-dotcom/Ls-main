import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { Pause, Play } from 'lucide-react';
import { medicalMarketingPaths } from '../../data/siteNavigation';
import { useExperience } from '../experience/ExperienceProvider';
import './medical-motion.css';

const entrances = [
  '.hospital-career-photos figure', '.hospital-career-records>ol>li', '.med-section-heading', '.med-service-card', '.med-featured-card', '.med-project',
  '.med-report-card', '.med-service-detail', '.med-ax-panel', '.ax-hub-case',
  '.ax-hub-group-heading', '.med-timeline article', '.med-values article',
  '.ax-method-steps li', '.med-price', '.med-credentials .med-stats>div',
  '.pvm-practice-tabs', '.pvm-practice-story', '.pvm-practice-detail', '.med-lab-toolbar', '.ed-lab-overview', '.med-lab-flow article',
  '.med-contact-card', '.med-newsletter', '.med-inline-banner', '.med-question-list a',
  '.med-founder>div', '.med-split>div:not(.med-question-list):not(.med-faq)',
  '.med-ax-case-top>div', '.med-contact-band>.med-wrap>div', '.med-contact-band .med-button',
  '.med-faq details', '.med-contact-grid>div:first-child',
  '.med-hero-grid>div:first-child', '.med-mapped-hero>.med-wrap',
  '.med-portrait', '.med-patients section>div>h2', '.patient-guide-entry', '.patient-reading-panel'
].join(',');
const photos = '.hospital-career-photo img,.med-featured-image img,.med-service-photo img,.med-project-image img,.med-portrait img,.ed-hospital-photo img';

/** Web Animations enhance visible HTML; no CSS hides content or changes the scroll position. */
export function MedicalMotion() {
  const { pathname } = useLocation();
  const { paused, toggle } = useExperience();
  const reading = useRef<HTMLDivElement>(null);
  const history = useRef({ pathname, seen: new WeakSet<Element>() });
  const marketing = medicalMarketingPaths.includes(pathname) || pathname === '/patients';
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const main = document.querySelector('main');
    if (!main) return;
    if (history.current.pathname !== pathname) history.current = { pathname, seen: new WeakSet() };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width:767px), (pointer:coarse)');
    if (paused || reduced.matches || !('IntersectionObserver' in window)) return;
    const seen = history.current.seen;
    const tracked = new Set<HTMLElement>();
    const animations = new Map<Animation, HTMLElement>();
    const photoSet = new Set<HTMLElement>();
    const activePhotos = new Set<HTMLElement>();
    let raf = 0;
    let scanFrame = 0;
    const allowed = () => !reduced.matches && !document.hidden;
    const reveal = (element: HTMLElement, order: number) => {
      if (seen.has(element) || !allowed()) return;
      seen.add(element);
      if (!element.animate) return;
      const compact = small.matches || !marketing;
      const isHeading = element.matches('.med-section-heading,.ax-hub-group-heading,.med-hero-grid>div:first-child,.med-mapped-hero>.med-wrap');
      const isStep = element.matches('.ax-method-steps li,.med-timeline article');
      const duration = compact ? 640 : isHeading ? 1150 : 950;
      const start = isStep && !compact
        ? 'translate3d(46px,24px,0)'
        : `translate3d(0,${compact ? 24 : isHeading ? 64 : 52}px,0) scale(${compact ? 1 : .975})`;
      const animation = element.animate([
        { opacity: .08, transform: start },
        { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' }
      ], { duration, delay: Math.min(order, 3) * (compact ? 55 : 100), easing:'cubic-bezier(.16,1,.3,1)', fill:'backwards' });
      animations.set(animation, element);
      const finish = () => animations.delete(animation);
      animation.onfinish = finish; animation.oncancel = finish;
    };
    const entranceObserver = new IntersectionObserver(entries => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting || !allowed()) continue;
        const element = entry.target as HTMLElement;
        entranceObserver.unobserve(element);
        reveal(element, order++);
      }
    }, { threshold:0, rootMargin:'0px 0px -48px 0px' });
    const paint = () => {
      raf = 0;
      if (!allowed()) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (reading.current) reading.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      // Read all geometry before writing, and never maintain an idle animation loop.
      const positions = [...activePhotos].map(el => {
        const rect = el.parentElement!.getBoundingClientRect();
        return [el, Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight))] as const;
      });
      positions.forEach(([el, position]) => el.style.setProperty('--ls-photo-y', `${position * (small.matches ? -1.5 : -3)}%`));
    };
    const schedule = () => { if (!raf && allowed()) raf = requestAnimationFrame(paint); };
    const photoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { const el = entry.target as HTMLElement; entry.isIntersecting ? activePhotos.add(el) : activePhotos.delete(el); });
      schedule();
    });
    const scan = () => {
      scanFrame = 0;
      const candidates = [...main.querySelectorAll<HTMLElement>(marketing ? entrances : 'section>h2,section>div>h2')];
      const candidateSet = new Set(candidates);
      for (const el of candidates) {
        if (tracked.has(el) || seen.has(el) || el.closest('dialog,[role="dialog"]')) continue;
        // A component enters as one unit: avoid compounded parent/child movement.
        let parent = el.parentElement, nested = false;
        while (parent && parent !== main) { if (candidateSet.has(parent)) { nested = true; break; } parent = parent.parentElement; }
        if (nested) continue;
        tracked.add(el); entranceObserver.observe(el);
      }
      if (marketing) main.querySelectorAll<HTMLElement>(photos).forEach(el => {
        if (photoSet.has(el)) return;
        photoSet.add(el); el.classList.add('ls-scroll-photo'); photoObserver.observe(el);
      });
      for (const el of tracked) if (!el.isConnected) { entranceObserver.unobserve(el); tracked.delete(el); }
      for (const el of photoSet) if (!el.isConnected) { photoObserver.unobserve(el); photoSet.delete(el); activePhotos.delete(el); }
    };
    const mutation = new MutationObserver(() => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); });
    mutation.observe(main, { childList:true, subtree:true });
    const cancel = () => { animations.forEach((_el, animation) => animation.cancel()); animations.clear(); };
    const preference = () => {
      if (reduced.matches) { cancel(); photoSet.forEach(el => el.style.removeProperty('--ls-photo-y')); }
    };
    const visibility = () => {
      if (document.hidden) { cancel(); cancelAnimationFrame(raf); raf = 0; }
      else {
        tracked.forEach(el => { if (!seen.has(el)) { entranceObserver.unobserve(el); entranceObserver.observe(el); } });
        schedule();
      }
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      animations.forEach((element, animation) => { if (element.contains(event.target as Node)) animation.cancel(); });
    };
    const printing = () => cancel();
    scan(); schedule();
    window.addEventListener('scroll', schedule, { passive:true });
    window.addEventListener('resize', schedule);
    window.addEventListener('beforeprint', printing);
    document.addEventListener('visibilitychange', visibility);
    main.addEventListener('focusin', focus);
    reduced.addEventListener('change', preference);
    return () => {
      entranceObserver.disconnect(); photoObserver.disconnect(); mutation.disconnect(); cancel();
      cancelAnimationFrame(raf); cancelAnimationFrame(scanFrame);
      photoSet.forEach(el => { el.classList.remove('ls-scroll-photo'); el.style.removeProperty('--ls-photo-y'); });
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
      window.removeEventListener('beforeprint', printing); document.removeEventListener('visibilitychange', visibility);
      main.removeEventListener('focusin', focus); reduced.removeEventListener('change', preference);
    };
  }, [pathname, paused, marketing]);
  if (!medicalMarketingPaths.includes(pathname)) return null;
  return <>
    <div className="ls-scroll-progress" ref={reading} aria-hidden="true" />
    <button type="button" className="ls-motion-toggle" onClick={toggle} aria-pressed={paused} aria-label={paused ? '페이지 모션 재생' : '페이지 모션 일시정지'}>
      {paused ? <Play size={15} aria-hidden="true"/> : <Pause size={15} aria-hidden="true"/>}<span>{paused ? '모션 재생' : '모션 정지'}</span>
    </button>
  </>;
}
