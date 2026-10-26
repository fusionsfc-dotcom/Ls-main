import { useEffect } from 'react';
import { useLocation } from 'react-router';
export function ScrollToTop() {
  const {
    pathname,
    hash
  } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let frame = 0;
    const scroll = () => {
      const element = document.getElementById(id);
      if (!element) return false;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => element.scrollIntoView({
        block: 'start',
        behavior: 'auto'
      }));
      return true;
    };
    if (scroll()) return () => cancelAnimationFrame(frame);
    // Lazy report pages may mount after the router has updated the URL.
    const observer = new MutationObserver(() => {
      if (scroll()) observer.disconnect();
    });
    observer.observe(document.getElementById('main-content') || document.body, {
      childList: true,
      subtree: true
    });
    const timeout = window.setTimeout(() => observer.disconnect(), 5000);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);
  return null;
}
