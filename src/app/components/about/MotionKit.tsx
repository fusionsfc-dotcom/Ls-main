// 소개 페이지 모션 그래픽 키트
// 모든 컴포넌트는 prefers-reduced-motion을 존중한다(움직임 없이 최종 상태로 렌더).
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── 상단 스크롤 진행 바 ───────────────────────────── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #3A6EA5, #A3C4ED)' }}
    />
  );
}

/* ── 신경망 파티클 필드 (마우스 반응) ──────────────── */
export function NeuralField({
  className = '',
  density = 15000,
  color = '163,196,237',
}: {
  className?: string;
  density?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const LINK = 130;
    const MOUSE = 190;

    const seed = () => {
      const n = Math.max(24, Math.min(110, Math.round((w * h) / density)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.4 + 0.7,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const frame = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (move) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE && d > 0.1) {
            const f = (1 - d / MOUSE) * 0.6;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
      }
      ctx.lineWidth = 0.7;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(${color},${(1 - Math.sqrt(d2) / LINK) * 0.32})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE) {
          ctx.strokeStyle = `rgba(${color},${(1 - md / MOUSE) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${color},0.85)`;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) frame(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) frame(false);
    else raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(false);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce, density, color]);

  return <canvas ref={canvasRef} aria-hidden className={`absolute inset-0 w-full h-full ${className}`} />;
}

/* ── 오로라(움직이는 빛 덩어리) 배경 ───────────────── */
export function Aurora({ className = '', opacity = 1 }: { className?: string; opacity?: number }) {
  const reduce = useReducedMotion();
  const blobs = [
    { c: 'rgba(58,110,165,0.55)', s: '46vw', t: '-14%', l: '-10%', x: [0, 60, -30, 0], y: [0, 40, -20, 0], d: 22 },
    { c: 'rgba(91,143,201,0.36)', s: '38vw', t: '18%', l: '58%', x: [0, -70, 30, 0], y: [0, -30, 50, 0], d: 26 },
    { c: 'rgba(30,58,95,0.75)', s: '52vw', t: '52%', l: '12%', x: [0, 40, -50, 0], y: [0, -40, 10, 0], d: 30 },
  ];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.s,
            height: b.s,
            top: b.t,
            left: b.l,
            background: `radial-gradient(circle, ${b.c} 0%, transparent 65%)`,
          }}
          animate={reduce ? undefined : { x: b.x, y: b.y, scale: [1, 1.12, 0.95, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── 단어 단위 마스크 리빌 ─────────────────────────── */
export function SplitWords({
  text,
  className = '',
  wordClassName = '',
  wordStyle,
  delay = 0,
  stagger = 0.07,
  trigger = 'view',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  wordStyle?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  trigger?: 'view' | 'mount';
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className={wordClassName} style={wordStyle}>{w}</span>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>
    );
  }
  const container = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  const child = { hidden: { y: '115%' }, show: { y: '0%', transition: { duration: 1.05, ease: EASE } } };
  const trig =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } };
  return (
    <motion.span className={className} variants={container} {...trig}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-top" style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
            <motion.span className={`inline-block ${wordClassName}`} style={wordStyle} variants={child}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

/* ── 범용 리빌 ─────────────────────────────────────── */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 36,
  x = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── 섹션 헤딩 (선이 그어지는 키커 + 단어 리빌 제목) ── */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = 'left',
  dark = false,
  className = '',
}: {
  kicker: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const accent = dark ? '#7FAEDD' : '#2C5282';
  const lines = title.split('\n');
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <motion.span
          aria-hidden
          className="h-px"
          style={{ backgroundColor: accent }}
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: 28 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        />
        <motion.span
          className="text-sm font-bold tracking-[0.18em]"
          style={{ color: accent }}
          initial={reduce ? false : { opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        >
          {kicker}
        </motion.span>
      </div>
      <h2
        className={`text-3xl lg:text-5xl tracking-tight leading-tight mt-4 mb-5 ${dark ? 'text-white' : ''}`}
        style={dark ? undefined : { color: 'var(--navy-900)' }}
      >
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <SplitWords text={line} delay={i * 0.12} />
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      {lead && (
        <Reveal delay={0.2} y={20}>
          <p className="text-lg leading-relaxed" style={{ color: dark ? 'var(--navy-200)' : 'var(--navy-600)' }}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ── 값 애니메이션: 숫자는 카운트업, 문자는 글자 단위 블러인 ── */
export function AnimatedValue({
  value,
  className = '',
  style,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const m = value.match(/^([\d,]+)(.*)$/);
  const target = m ? Number(m[1].replace(/,/g, '')) : 0;
  const suffix = m ? m[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m || !inView) return;
    if (reduce) {
      setN(target);
      return;
    }
    const controls = animate(0, target, {
      duration: target > 100 ? 2.2 : 1.6,
      ease: EASE,
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, target]);

  if (!m) {
    const chars = Array.from(value);
    return (
      <span ref={ref} className={className} style={style}>
        <span className="sr-only">{value}</span>
        <span aria-hidden>
          {chars.map((c, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: '0.35em', filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
              transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
            >
              {c === ' ' ? ' ' : c}
            </motion.span>
          ))}
        </span>
      </span>
    );
  }

  return (
    <span ref={ref} className={className} style={style}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">
        {Math.round(n).toLocaleString('ko-KR')}
        {suffix}
      </span>
    </span>
  );
}

/* ── 3D 틸트 + 커서 스포트라이트 카드 ─────────────── */
export function TiltCard({
  children,
  className = '',
  style,
  max = 7,
  glare = 'rgba(127,174,221,0.18)',
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  max?: number;
  glare?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 140, damping: 18 });
  const glow = useSpring(0, { stiffness: 120, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const bg = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, ${glare}, transparent 50%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    glow.set(1);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    glow.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative ${className}`}
      style={{
        ...style,
        rotateX: reduce || max === 0 ? 0 : rx,
        rotateY: reduce || max === 0 ? 0 : ry,
        transformPerspective: 1200,
      }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: bg, opacity: glow, borderRadius: 'inherit' }}
      />
    </motion.div>
  );
}

/* ── 마그네틱(커서에 끌려오는) 래퍼 ───────────────── */
export function Magnetic({
  children,
  strength = 0.25,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/* ── 무한 흐름 띠 ──────────────────────────────────── */
export function Marquee({
  items,
  duration = 45,
  className = '',
  itemClassName = '',
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();
  const row = (key: string, hidden: boolean) => (
    <div key={key} aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {t}
          <span aria-hidden className="mx-8 w-1.5 h-1.5 rotate-45" style={{ backgroundColor: '#5B8FC9' }} />
        </span>
      ))}
    </div>
  );
  const fade = 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)';
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {row('a', false)}
        {row('b', true)}
      </motion.div>
    </div>
  );
}

/* ── 와이프(위→아래) 리빌 컨테이너 ──────────────────
   진입 감지는 클립이 걸리지 않은 바깥 요소가 받는다.
   (클립으로 완전히 가려진 요소에 whileInView를 걸면 일부 배치에서 감지가 안 돼
    가려진 상태로 멈추는 문제가 있었다 — 2열 배치 왼쪽 열 공백 버그) */
export function ClipReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={inView || reduce ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
        transition={{ duration: 1.25, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── 이미지 와이프 리빌 + 스크롤 패럴랙스 ──────────── */
export function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);
  return (
    <div ref={ref} className={className}>
      <ClipReveal className="w-full h-full" delay={delay}>
        <motion.div className="absolute -inset-[8%]" style={{ y }}>
          <ImageWithFallback src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
        </motion.div>
      </ClipReveal>
    </div>
  );
}
