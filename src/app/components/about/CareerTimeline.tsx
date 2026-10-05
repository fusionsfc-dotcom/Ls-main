// 대표 이력 — 스크롤 연동 타임라인
// 좌: 스크롤 위치에 따라 바뀌는 대형 연도(스티키), 우: 스크롤만큼 채워지는 진행선 + 점등 노드
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Award, CheckCircle2, type LucideIcon } from 'lucide-react';
import { EASE, SectionHeading } from './MotionKit';

export type CareerItem = {
  readonly years: string;
  readonly Icon: LucideIcon;
  readonly org: string;
  readonly role: string;
  readonly highlight: string | null;
  readonly points: readonly string[];
};

const NAVY_900 = '#0A1628';
const NAVY_100 = '#C7DCFB';

function TimelineItem({
  item,
  index,
  reached,
  onActive,
}: {
  item: CareerItem;
  index: number;
  reached: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // 화면 세로 중앙 띠에 들어오면 활성
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  const { years, Icon, org, role, highlight, points } = item;
  return (
    <li ref={ref} className="relative pl-16 sm:pl-20 pb-16 last:pb-0">
      {/* 노드 */}
      <motion.div
        className="absolute left-0 top-0 w-11 h-11 rounded-2xl flex items-center justify-center z-10"
        style={{ borderWidth: 2, borderStyle: 'solid' }}
        initial={false}
        animate={{
          backgroundColor: reached ? NAVY_900 : '#FFFFFF',
          borderColor: reached ? NAVY_900 : NAVY_100,
          scale: reached ? 1 : 0.9,
          boxShadow: reached
            ? '0 12px 28px -8px rgba(10,22,40,0.55), 0 0 0 7px rgba(127,174,221,0.2)'
            : '0 0 0 0px rgba(127,174,221,0)',
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Icon
          className="w-5 h-5"
          style={{ color: reached ? '#FFFFFF' : '#7FAEDD', transition: 'color .4s' }}
          strokeWidth={1.75}
        />
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: 48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.95, ease: EASE }}
      >
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tabular-nums tracking-wide"
          style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}
        >
          {years}
        </span>
        <div className="text-xl lg:text-2xl font-bold mt-3 tracking-tight" style={{ color: 'var(--navy-900)' }}>
          {org}
        </div>
        <div className="text-sm mt-1" style={{ color: 'var(--navy-500)' }}>
          {role}
        </div>
        {highlight && (
          <div className="flex items-start gap-2.5 mt-5">
            <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} strokeWidth={2} />
            <span className="text-base lg:text-lg font-bold leading-snug" style={{ color: 'var(--navy-900)' }}>
              {highlight}
            </span>
          </div>
        )}
        <ul className="space-y-2 mt-3">
          {points.map((p, i) => (
            <motion.li
              key={p}
              className="flex gap-2.5"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.08 }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--navy-500)' }} strokeWidth={1.75} />
              <span className="text-base leading-relaxed" style={{ color: 'var(--navy-700)' }}>
                {p}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

export function CareerTimeline({ items, lead }: { items: readonly CareerItem[]; lead: string }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 62%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const cur = items[active];
  const startYear = cur.years.split('–')[0];
  const onActive = React.useCallback((i: number) => setActive(i), []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20">
      {/* 좌: 스티키 연도 패널 */}
      <div className="lg:sticky lg:top-28 self-start">
        <SectionHeading kicker="CAREER · 2005 — NOW" title="대표 이력" lead={lead} />

        <div className="hidden lg:block mt-12" aria-hidden>
          <div className="relative h-[136px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={startYear}
                className="absolute inset-0 text-[128px] leading-none font-bold tracking-tighter tabular-nums"
                style={{ color: 'var(--navy-900)' }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {startYear}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative h-14 mt-3 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="text-lg font-bold truncate" style={{ color: 'var(--navy-800)' }}>
                  {cur.org}
                </div>
                <div className="text-sm" style={{ color: 'var(--navy-500)' }}>
                  {cur.years} · {cur.role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--navy-900)' }}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <div className="relative h-[2px] w-56 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: 'var(--navy-900)' }}
                animate={{ width: `${((active + 1) / items.length) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
            <span className="text-sm tabular-nums" style={{ color: 'var(--navy-300)' }}>
              {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* 우: 타임라인 */}
      <ol ref={listRef} className="relative">
        <span
          aria-hidden
          className="absolute left-[21px] top-3 bottom-3 w-[2px] rounded-full"
          style={{ backgroundColor: 'var(--navy-100)' }}
        />
        <motion.span
          aria-hidden
          className="absolute left-[21px] top-3 bottom-3 w-[2px] rounded-full origin-top"
          style={{ scaleY: reduce ? 1 : fill, background: 'linear-gradient(180deg, #5B8FC9, #0A1628)' }}
        />
        {items.map((it, i) => (
          <TimelineItem key={it.years} item={it} index={i} reached={i <= active} onActive={onActive} />
        ))}
      </ol>
    </div>
  );
}
