// 공용 모션 프리셋 — 전 페이지 공통 다이나믹 애니메이션
// (framer-motion / motion/react 와 함께 사용)
import { motion } from 'motion/react';
import { Link } from 'react-router';

/* react-router Link에 모션 적용 (stagger 카드가 링크일 때 사용) */
export const MotionLink = motion.create(Link);

export const viewportOnce = { once: true, margin: '-80px' } as const;

const easeOut = [0.16, 1, 0.3, 1] as const;

/* 섹션 진입 — 아래에서 천천히 떠오르는 리빌 */
export const fadeIn = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: 1.1, ease: easeOut },
};

/* 컨테이너 — 자식 요소를 순차(stagger)로 등장시킴 */
export const staggerContainer = {
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: viewportOnce,
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
  },
};

/* 자식 카드 — 천천히 떠오르며 살짝 확대 */
export const staggerItem = {
  hidden: { opacity: 0, y: 46, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease: easeOut } },
};

/* 좌/우에서 슬라이드 인 (좌우 2단 레이아웃용) */
export const slideLeft = {
  initial: { opacity: 0, x: -56 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportOnce,
  transition: { duration: 1.1, ease: easeOut },
};
export const slideRight = {
  initial: { opacity: 0, x: 56 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportOnce,
  transition: { duration: 1.1, ease: easeOut },
};
