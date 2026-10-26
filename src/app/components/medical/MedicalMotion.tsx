import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { medicalMarketingPaths } from '../../data/siteNavigation';

/** Progressive enhancement: content is readable before JS and never hidden by CSS. */
export function MedicalMotion() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!medicalMarketingPaths.includes(pathname)) return;
    const main = document.querySelector('main');
    if (!main) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse)');
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (reduced.matches) continue;
        const animation = entry.target.animate([
          { opacity: mobile.matches ? .85 : .45, transform: `translateY(${mobile.matches ? 8 : 22}px)` },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: mobile.matches ? 320 : 650, easing: 'cubic-bezier(.2,.7,.25,1)' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    const scan = () => {
      main.querySelectorAll('.med-site .med-section-heading, .med-site .med-service-card, .med-site .med-featured-card, .med-site .med-project, .med-site .med-report-card, .med-site .med-service-detail, .med-site .med-ax-panel, .med-site .med-timeline article, .med-site .med-lab-toolbar').forEach(el => {
        if (seen.has(el)) return;seen.add(el);observer.observe(el);
      });
    };
    const stop = () => {if (reduced.matches) animations.forEach(a=>a.cancel());};
    const mutation = new MutationObserver(scan);mutation.observe(main,{childList:true,subtree:true});scan();
    reduced.addEventListener('change',stop);
    return () => {observer.disconnect();mutation.disconnect();animations.forEach(a=>a.cancel());reduced.removeEventListener('change',stop);};
  }, [pathname]);
  return null;
}
