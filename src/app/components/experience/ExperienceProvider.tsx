import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

const ExperienceContext = createContext({ paused: false, toggle: () => {} });
export const useExperience = () => useContext(ExperienceContext);
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(() => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setPaused(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('ax-motion-paused', paused); return () => document.documentElement.classList.remove('ax-motion-paused'); }, [paused]);
  return <ExperienceContext.Provider value={{ paused, toggle: () => setPaused(value => !value) }}><MotionConfig reducedMotion={paused ? 'always' : 'user'}>{children}</MotionConfig></ExperienceContext.Provider>;
}
