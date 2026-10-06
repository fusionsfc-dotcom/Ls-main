import React, { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  Stethoscope,
  Building2,
  LayoutDashboard,
  HeartPulse,
  Boxes,
  Compass,
  Zap,
  LineChart,
  Layers,
  MapPin,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  Award,
  Landmark,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { homeImages } from '../data/homeImages';
import {
  EASE,
  Aurora,
  AnimatedValue,
  Magnetic,
  Marquee,
  NeuralField,
  ClipReveal,
  Reveal,
  ScrollProgressBar,
  SectionHeading,
  SplitWords,
  TiltCard,
} from '../components/about/MotionKit';
import { CareerTimeline } from '../components/about/CareerTimeline';
import {
  HospitalDashboardArt,
  PatientAppArt,
  AutomationFlowArt,
  RadarArt,
  DualAppArt,
  ChatArt,
  SchemaArt,
  DataGridArt,
  JejuNetworkArt,
} from '../components/about/Illustrations';

/* ── 핵심 지표 ─────────────────────────────────────── */
const stats = [
  { value: '3종', label: '자체 개발 플랫폼' },
  { value: '15,000건+', label: '누적 AI 분석 데이터' },
  { value: '15년+', label: '의료·기업 현장 경험' },
  { value: '7년+', label: '자체 SaaS 개발·운영' },
] as const;

/* ── 3대 자체 플랫폼 ───────────────────────────────── */
const platforms = [
  {
    Icon: LayoutDashboard,
    tag: 'Healthcare',
    title: 'Cancer Hospital Platform',
    body: '암 병원 운영과 환자 관리를 통합한 플랫폼(HappyCare). 진료·입원·KPI를 데이터로 연결합니다.',
    Art: HospitalDashboardArt,
    to: '/healthcare',
  },
  {
    Icon: HeartPulse,
    tag: 'Mobile App',
    title: '환자재활 애플리케이션',
    body: '환자·보호자를 위한 케어 앱(HappyLife). 전국 165개 병원과 실시간 양방향 연동됩니다.',
    Art: PatientAppArt,
    to: '/healthcare',
  },
  {
    Icon: Boxes,
    tag: 'Automation',
    title: 'Space AX Platform',
    body: '기업의 반복 업무를 자동화하는 AX 플랫폼. 말로 설명하면 시스템이 대신 일합니다.',
    Art: AutomationFlowArt,
    to: '/business',
  },
] as const;

/* ── 두 개의 전문 분야 ─────────────────────────────── */
const domains = [
  { Icon: Stethoscope, eyebrow: '의료 AX', title: '병원과 환자의 건강관리를 AI로 전환', body: 'AI 검색 최적화 웹·온라인 홍보·HappyLifeCare 플랫폼으로 병원을 전환합니다.', to: '/healthcare', cta: '의료 보기' },
  { Icon: Building2, eyebrow: '기업 AX', title: '업무 자동화', body: '보고·요약·정리·응대 같은 반복 업무를 한국 도구에 맞춘 자동화로 전환합니다.', to: '/business', cta: '기업 보기' },
] as const;

/* ── 일하는 방식 (핵심 가치) ───────────────────────── */
const values = [
  { Icon: Compass, title: '업계 우선 (Domain First)', body: '산업을 모르면 AI도 못 씁니다. 클라이언트 산업의 실제 워크플로우를 먼저 이해합니다.' },
  { Icon: Zap, title: '실행 가능성 (Execution Bias)', body: 'PPT보다 동작하는 프로토타입을 먼저 만듭니다. 추측이 아닌 실물로 의사결정합니다.' },
  { Icon: LineChart, title: '지표 중심 (Measurable)', body: '"좋아진 것 같다"가 아니라 "20% 개선됐다"로 말합니다. 데이터로만 검증합니다.' },
  { Icon: Layers, title: '자산화 (Build to Asset)', body: '프로젝트마다 재사용 가능한 모듈을 남깁니다. 다음 프로젝트는 더 빨라집니다.' },
] as const;

/* ── 보유 역량·자산 ────────────────────────────────── */
const assets = [
  { Art: RadarArt, title: '자체 AI 분석 시스템', body: '13개 축 분석 프레임워크와 누적 데이터로 매월 자동 리포트를 발행합니다.' },
  { Art: DualAppArt, title: 'HappyLifeCare SaaS', body: '7년 자체 개발한 헬스케어 통합 플랫폼. 병원용·환자용 듀얼 앱 구조.' },
  { Art: ChatArt, title: 'AI 암상담 시스템', body: 'Claude API 기반 RAG 아키텍처. 사이트에서 24시간 작동 중입니다.' },
  { Art: SchemaArt, title: 'AI 최적화 웹사이트', body: '의료광고심의 통과 사이트를 다수 운영하며 AI 검색 노출 노하우를 축적했습니다.' },
  { Art: DataGridArt, title: '환자 분석 데이터베이스', body: '암 환자 후기·경험 데이터를 구조화한 PVM 자산. 의료 컨설팅의 차별점 근거입니다.' },
  { Art: JejuNetworkArt, title: '제주 AI 개발 커뮤니티', body: '제주에서 AI 개발 커뮤니티를 운영합니다. 인재·협업 네트워크의 시드입니다.' },
] as const;

/* ── 거점 ──────────────────────────────────────────── */
const locations = [
  { label: 'Headquarters', title: '제주 거점', body: '자체 SaaS 개발과 AI 시스템 운영의 베이스이자, 제주 AI 개발 커뮤니티의 활동 중심지입니다.', roles: ['제품 개발·R&D 본부', '원격 개발·운영의 거점', '제주 클라이언트 대면 미팅'] },
  { label: 'Healthcare Hub', title: '서울 거점', body: '의료기관 클라이언트와의 접점. 수도권 대면 미팅과 의료 콘텐츠·의료광고심의 등 의료 행정의 거점입니다.', roles: ['수도권 의료 클라이언트 대면 미팅', '의료 콘텐츠 촬영·제작', '의료 네트워크 활용'] },
] as const;

/* ── 리더십 ────────────────────────────────────────── */
const leadership = {
  nameKo: '석현이',
  nameEn: 'Seok Hyeoni',
  role: '대표 컨설턴트',
  oneLine: '광고기획·헬스케어·AI 개발에 정부기관·기업 컨설팅 경력을 결합한 LS AX 컨설팅의 사업·전략 책임자.',
  keywords: ['광고기획 10년+', '의료 현장 15년+', '정부기관 프로젝트 300개+', '기업 컨설팅 (건설·금융 등)', '개원 컨설팅 10개+', '자체 SaaS 7년+ 개발'],
  closing: '협력 파트너·외부 자문진과의 협업 구조로 운영됩니다.',
} as const;

/* ── 핵심 스펙 (대표 이력 요약) ────────────────────── */
const credentials = [
  { v: '20년+', l: '광고기획 · 의료 현장 경력', sub: '2005년부터' },
  { v: '대통령상 PT', l: '대통령BP 경진대회 수상 PT 기획', sub: 'CJI-Communication 재직 시' },
  { v: '보건복지부', l: "대국민 캠페인 '30초의 기적' 총괄 기획", sub: 'CJI-Communication 재직 시' },
  { v: '9곳', l: '암특화 병원·의료법인 프로젝트', sub: '기획 · 개설컨설팅 · 홍보' },
] as const;

/* ── 대표 연혁 (실제 연도) ─────────────────────────── */
const career = [
  {
    years: '2005–2009',
    Icon: Award,
    org: 'CJI-Communication',
    role: '기획팀장 / AE',
    highlight: '정부기관 대통령BP 경진대회 대통령상 수상 PT 기획',
    points: [
      '삼성·LG 등 대기업 국내·외 신제품 발표회 PT 및 홍보물 기획',
      '지자체 홍보영상 및 TV CF 기획',
    ],
  },
  {
    years: '2009–2011',
    Icon: Stethoscope,
    org: '암특화 의료기관 · (주)NK면역식품',
    role: '기획팀장',
    highlight: null,
    points: ['암특화 의료기관 기획팀장 재직', '암특화 요양병원 기획'],
  },
  {
    years: '2011–2013',
    Icon: Landmark,
    org: 'CJI-Communication',
    role: '기획실장 / AE',
    highlight: "보건복지부 대국민 캠페인 '손씻기, 30초의 기적' 총괄 기획",
    points: [
      "국민권익위원회 고위공직자 대상 '청렴교육' 코스웨어 기획",
      '정부기관 및 지자체 SNS 강의',
      '대기업 홍보물 기획 및 정부기관 대통령 보고서 기획',
    ],
  },
  {
    years: '2013–2016',
    Icon: Building2,
    org: '암요양병원 · 한방병원',
    role: '운영기획',
    highlight: null,
    points: ['가평 암특화 요양병원 기획팀장', '제천 암특화 한방병원 운영실장'],
  },
  {
    years: '2017–2019',
    Icon: Briefcase,
    org: 'LSconsulting',
    role: 'CEO',
    highlight: null,
    points: ['암특화 요양병원·한방병원 개설컨설팅 및 홍보', '의료법인 개설컨설팅'],
  },
  {
    years: '2020–현재',
    Icon: Sparkles,
    org: 'LS AX 컨설팅',
    role: '대표 컨설턴트',
    highlight: null,
    points: [
      '암특화 병원 개원컨설팅 (2020–2021, 서울 종로·마포 등)',
      'HappyLifeCare 플랫폼 자체 개발·운영 — 전국 165개 병원 연동',
      '의료·기업 현장 업무의 AI 전환(AX)',
    ],
  },
] as const;

/* ── 연락처 ────────────────────────────────────────── */
const contacts = [
  { Icon: Mail, label: 'Email', main: 'fusionsfc@gmail.com', sub: '24시간 내 답변', href: 'mailto:fusionsfc@gmail.com', internal: false },
  { Icon: Phone, label: 'Phone', main: '+82.10.9297.0940', sub: '평일 10:00 – 18:00', href: 'tel:+821092970940', internal: false },
  { Icon: MessageSquare, label: 'Insights', main: 'AI 리포트', sub: '무료 인사이트 제공', href: '/insights', internal: true },
] as const;

/* ── 히어로 하단 흐름 띠 (원문 근거 있는 실적만) ──── */
const heroMarquee = [
  '대통령BP 경진대회 대통령상 수상 PT 기획',
  "보건복지부 대국민 캠페인 '손씻기, 30초의 기적' 총괄 기획",
  "국민권익위원회 '청렴교육' 코스웨어 기획",
  '삼성·LG 신제품 발표회 PT 기획',
  '암특화 병원·의료법인 프로젝트 9곳',
  'HappyLifeCare 전국 165개 병원 연동',
  '암 환자 후기 100,000건+ 구조화',
  '자체 개발 플랫폼 3종',
] as const;

const GRID_BG =
  'linear-gradient(#7FAEDD 1px, transparent 1px), linear-gradient(90deg, #7FAEDD 1px, transparent 1px)';

/* ── 제주 ⇄ 서울 연결 그래픽 ───────────────────────── */
function LocationConnector() {
  const reduce = useReducedMotion();
  const d = 'M8 64 C 44 4, 96 4, 132 64';
  return (
    <div className="hidden md:flex flex-col items-center justify-center" aria-hidden>
      <svg viewBox="0 0 140 80" className="w-full h-auto overflow-visible">
        <motion.path
          d={d}
          fill="none"
          stroke="#C7DCFB"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <path
          d={d}
          fill="none"
          stroke="#3A6EA5"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="0.14 0.86"
          className="ls-travel"
        />
        {[8, 132].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={64} r={6} fill="#3A6EA5" className="ls-ping" />
            <circle cx={cx} cy={64} r={5} fill="#0A1628" />
          </g>
        ))}
      </svg>
      <span className="text-xs font-semibold tracking-widest mt-2" style={{ color: 'var(--navy-400)' }}>
        화상 · 대면
      </span>
    </div>
  );
}

export function About() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroP, [0, 1], [0, reduce ? 0 : 180]);
  const heroFade = useTransform(heroP, [0, 0.75], [1, reduce ? 1 : 0]);
  const bgScale = useTransform(heroP, [0, 1], [1, reduce ? 1 : 1.15]);

  const goCareer = () =>
    document.getElementById('career')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

  const chipList = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
  };
  const chip = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 18 } },
  };

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgressBar />
      <SEO
        title="회사 소개 | AI 전환 전문 기업 - LS AX 컨설팅"
        description="LS AX 컨설팅은 AI를 만드는 회사입니다. Cancer Hospital Platform·HappyLifeCare·Space AX 등 자체 플랫폼 3종을 개발·운영하며, 15년+ 의료·기업 현장 경험과 15,000건+ AI 분석 데이터를 보유합니다."
        keywords="LS AX 컨설팅 소개, AI 전환 전문 기업, AX 전문 회사, 의료 AI 기업, 기업 AI 기업, HappyLifeCare 개발사, Cancer Hospital Platform"
        url="https://www.lsconsulting.co.kr/about"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
            { '@type': 'ListItem', position: 2, name: '회사 소개', item: 'https://www.lsconsulting.co.kr/about' },
          ] },
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: '회사 소개 · LS AX 컨설팅', url: 'https://www.lsconsulting.co.kr/about', about: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' } },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': 'https://www.lsconsulting.co.kr/#local',
            name: 'LS AX 컨설팅',
            description: '의료와 기업의 업무를 AI로 전환(AX)하는 전문 컨설팅 기업',
            url: 'https://www.lsconsulting.co.kr/',
            telephone: '+82-10-9297-0940',
            email: 'fusionsfc@gmail.com',
            address: { '@type': 'PostalAddress', addressCountry: 'KR', addressRegion: '제주특별자치도', addressLocality: '서귀포시 안덕면' },
            areaServed: { '@type': 'Country', name: '대한민국' },
            priceRange: '문의',
            openingHours: 'Mo-Fr 10:00-18:00',
            sameAs: ['https://www.lsconsulting.co.kr/'],
          },
        ]}
      />

      {/* ── SECTION 1 · HERO (신경망 필드 + 단어 리빌 + 패럴랙스) ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col"
        style={{ backgroundColor: 'var(--navy-900)' }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            scale: bgScale,
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.94) 0%, rgba(10,22,40,0.86) 50%, rgba(10,22,40,0.98) 100%), url(${homeImages.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: GRID_BG,
            backgroundSize: '52px 52px',
            maskImage: 'radial-gradient(ellipse at 40% 45%, #000 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 40% 45%, #000 25%, transparent 75%)',
          }}
        />

        <motion.div className="relative flex-1 flex items-center" style={{ y: heroY, opacity: heroFade }}>
          <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-28">
            <div className="max-w-4xl">
              <motion.span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)', border: '1px solid rgba(255,255,255,0.12)' }}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-70 animate-ping" style={{ backgroundColor: '#7FAEDD' }} />
                  <span className="relative inline-flex w-2 h-2 rounded-full" style={{ backgroundColor: '#A3C4ED' }} />
                </span>
                About · 회사소개
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[84px] tracking-tight leading-[1.12] mt-8 text-white font-bold">
                <SplitWords trigger="mount" delay={0.25} text="AI를 쓰는 회사가 아니라" />
                <br />
                <SplitWords trigger="mount" delay={0.6} text="AI를 만드는" wordClassName="ls-shimmer" />{' '}
                <SplitWords trigger="mount" delay={0.8} text="회사입니다" />
              </h1>
              <motion.p
                className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed"
                style={{ color: 'var(--navy-200)' }}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 }}
              >
                LS AX 컨설팅은 의료와 기업 현장의 업무를 AI로 전환(AX)하는 전문 기업입니다.
                이론이 아니라, 이미 만들어 운영 중인 플랫폼으로 증명합니다.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-12"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 1.3 }}
              >
                <Magnetic className="w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={goCareer}
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-colors hover:bg-[#EBF4FF]"
                    style={{ backgroundColor: '#fff', color: 'var(--navy-900)' }}
                  >
                    대표 이력 보기
                    <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                  </button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    to="/projects"
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-colors hover:bg-white/10"
                    style={{ borderColor: 'rgba(255,255,255,0.35)' }}
                  >
                    프로젝트 보기
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 스크롤 큐 */}
        <motion.div
          aria-hidden
          className="relative hidden md:flex justify-center pb-6"
          style={{ opacity: heroFade }}
        >
          <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
            <motion.span
              className="w-1 h-2 rounded-full bg-white/70"
              animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* 실적 흐름 띠 */}
        <div className="relative border-t py-5 backdrop-blur" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(10,22,40,0.55)' }}>
          <Marquee items={heroMarquee} itemClassName="text-sm lg:text-base font-medium text-[#C7DCFB]" />
        </div>
      </section>

      {/* ── SECTION 2 · 대표 소개 + 핵심 스펙 + 연혁 ─────── */}
      <section id="career" className="relative py-12 md:py-16 px-8 lg:px-16 bg-white scroll-mt-20 overflow-x-clip">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[520px] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#C7DCFB 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'linear-gradient(180deg, #000, transparent)',
            WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
          }}
        />
        <div className="relative max-w-[1400px] mx-auto">
          {/* 대표 카드 */}
          <Reveal y={60}>
            <TiltCard
              max={3}
              glare="rgba(163,196,237,0.2)"
              className="rounded-3xl overflow-hidden p-8 lg:p-14"
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #162540 55%, #1E3A5F 100%)',
                boxShadow: '0 40px 80px -30px rgba(10,22,40,0.6)',
              }}
            >
              <Aurora opacity={0.65} />
              <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRID_BG, backgroundSize: '46px 46px' }} />

              <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="group relative w-full max-w-[260px] aspect-[720/864] rounded-[28px] overflow-hidden"
                    style={{ boxShadow: '0 22px 48px -14px rgba(0,0,0,0.65)' }}
                  >
                    <motion.div
                      aria-hidden
                      className="absolute -inset-1/2"
                      style={{
                        background:
                          'conic-gradient(from 0deg, transparent 0deg, #A3C4ED 60deg, transparent 120deg, transparent 180deg, #5B8FC9 240deg, transparent 300deg)',
                      }}
                      animate={reduce ? undefined : { rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-[3px] rounded-[25px] overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
                      <img
                        src="/images/about/leader-seok.webp?v=4"
                        alt={`${leadership.nameKo} ${leadership.role}`}
                        width={720}
                        height={864}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mt-6">{leadership.nameKo}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--navy-300)' }}>
                    {leadership.nameEn} · {leadership.role}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em]" style={{ color: 'var(--navy-300)' }}>
                    <motion.span
                      className="h-px"
                      style={{ backgroundColor: 'var(--navy-400)' }}
                      initial={reduce ? false : { width: 0 }}
                      whileInView={{ width: 28 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                    LEADERSHIP
                  </span>
                  <p className="text-2xl lg:text-[32px] font-semibold leading-snug mt-4 mb-7 text-white">
                    <SplitWords text={leadership.oneLine} stagger={0.035} delay={0.15} />
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2.5 mb-7"
                    variants={chipList}
                    initial={reduce ? false : 'hidden'}
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                  >
                    {leadership.keywords.map((k) => (
                      <motion.span
                        key={k}
                        variants={chip}
                        whileHover={reduce ? undefined : { y: -3 }}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white cursor-default transition-colors hover:bg-white/20"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--navy-300)' }} />
                        {k}
                      </motion.span>
                    ))}
                  </motion.div>
                  <p className="text-sm" style={{ color: 'var(--navy-400)' }}>{leadership.closing}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* 핵심 스펙 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
            {credentials.map(({ v, l, sub }, i) => (
              <Reveal key={l} delay={i * 0.1} y={40} className="h-full">
                <TiltCard
                  max={6}
                  glare="rgba(58,110,165,0.12)"
                  className="h-full rounded-2xl p-6 lg:p-7 border bg-white overflow-hidden"
                  style={{ borderColor: 'var(--navy-100)' }}
                >
                  <div className="text-[11px] font-bold tabular-nums tracking-widest" style={{ color: 'var(--navy-300)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <AnimatedValue
                    value={v}
                    className="block text-2xl lg:text-[34px] font-bold tracking-tight mt-3 leading-tight"
                    style={{ color: 'var(--navy-900)' }}
                  />
                  <div className="text-sm lg:text-base font-semibold mt-2 leading-snug" style={{ color: 'var(--navy-800)' }}>{l}</div>
                  <div className="text-xs lg:text-sm mt-1" style={{ color: 'var(--navy-500)' }}>{sub}</div>
                  <motion.span
                    aria-hidden
                    className="absolute left-0 bottom-0 h-[3px]"
                    style={{ background: 'linear-gradient(90deg, #3A6EA5, #A3C4ED)' }}
                    initial={reduce ? false : { width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.4 + i * 0.12 }}
                  />
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {/* 연혁 타임라인 */}
          <div className="mt-32">
            <CareerTimeline
              items={career}
              lead="광고기획에서 시작해 정부기관 캠페인, 암 요양·한방병원 운영기획과 개원컨설팅을 거쳐 지금은 자체 플랫폼을 개발·운영합니다."
            />
          </div>

          <Reveal className="mt-16">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-base font-semibold"
              style={{ color: 'var(--navy-900)' }}
            >
              병원 프로젝트 수행 이력 보기
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3 · 숫자로 보는 LS AX ──────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <Aurora opacity={0.55} />
        <div className="relative max-w-[1400px] mx-auto">
          <SectionHeading kicker="BY THE NUMBERS" title="숫자로 보는 LS AX" align="center" dark className="mb-16" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
            {stats.map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 0.1} className="text-center px-4">
                <AnimatedValue value={value} className="block text-4xl lg:text-6xl font-bold text-white tracking-tight" />
                <div className="text-sm lg:text-base mt-3" style={{ color: 'var(--navy-300)' }}>{label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 · 3대 자체 플랫폼 ─────────────────── */}
      <section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="WHAT WE BUILT"
            title="자체개발 운영 AX 플랫폼 서비스"
            lead="가능성을 말하는 회사는 많습니다. 우리는 결과물로 이야기합니다."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map(({ Icon, tag, title, body, Art, to }, i) => (
              <Reveal key={title} delay={i * 0.12} y={50} className="h-full">
                <Link to={to} className="group block h-full">
                  <TiltCard
                    max={5}
                    className="h-full bg-white rounded-2xl overflow-hidden border transition-shadow duration-500 group-hover:shadow-2xl"
                    style={{ borderColor: 'var(--navy-100)' }}
                  >
                    <div className="relative">
                      <ClipReveal delay={i * 0.12} className="aspect-[16/10]">
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                          <Art />
                        </div>
                      </ClipReveal>
                      <span
                        className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                        style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {tag}
                      </span>
                    </div>
                    <div className="p-7">
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold mt-5" style={{ color: 'var(--navy-900)' }}>
                        자세히 보기
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </TiltCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 · 두 개의 전문 분야 ──────────────── */}
      <section className="py-28 px-8 lg:px-16 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="TWO FIELDS"
            title="두 개의 분야, 하나의 실행력"
            lead="의료와 기업, 가장 까다로운 두 현장에서 AX를 직접 만듭니다."
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domains.map(({ Icon, eyebrow, title, body, to, cta }, i) => (
              <Reveal key={title} x={i === 0 ? -50 : 50} y={0} className="h-full">
                <TiltCard
                  max={4}
                  glare="rgba(58,110,165,0.14)"
                  className="group h-full rounded-3xl p-10 flex flex-col overflow-hidden"
                  style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}
                >
                  <Icon
                    aria-hidden
                    className="absolute -right-8 -bottom-8 w-56 h-56 opacity-[0.06] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ color: 'var(--navy-900)' }}
                    strokeWidth={1}
                  />
                  <motion.div
                    whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </motion.div>
                  <span className="relative text-xs font-semibold tracking-wide mb-1" style={{ color: 'var(--navy-500)' }}>{eyebrow}</span>
                  <h3 className="relative text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="relative text-base leading-relaxed mb-7 flex-1" style={{ color: 'var(--navy-600)' }}>{body}</p>
                  <Link to={to} className="relative inline-flex items-center gap-2 text-sm font-semibold self-start" style={{ color: 'var(--navy-900)' }}>
                    {cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6 · 일하는 방식 ────────────────────── */}
      <section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="HOW WE WORK"
            title="일하는 방식"
            lead="범용 AI 회사가 흉내낼 수 없는 업계 깊이를, 실행과 지표로 증명합니다."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.1} y={50} className="h-full">
                <motion.div
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative h-full bg-white rounded-2xl p-7 overflow-hidden transition-shadow duration-500 hover:shadow-xl"
                >
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 text-6xl font-bold tabular-nums leading-none"
                    style={{ color: 'transparent', WebkitTextStroke: '1px #C7DCFB' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-700 group-hover:rotate-[360deg]"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="relative text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="relative text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7 · 보유 역량·자산 ─────────────────── */}
      <section className="py-28 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="OUR ASSETS"
            title="보유한 역량과 자산"
            lead="컨설팅사 중 자체 제품·데이터·운영 노하우를 모두 가진 회사는 드뭅니다."
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assets.map(({ Art, title, body }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.1} y={50} className="h-full">
                <div className="group h-full rounded-2xl overflow-hidden border flex flex-col transition-all duration-500 hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'var(--navy-100)' }}>
                  <ClipReveal delay={(i % 3) * 0.1} className="aspect-[16/9]">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Art />
                    </div>
                  </ClipReveal>
                  <div className="p-7">
                    <h3 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8 · 거점 (제주 ⇄ 서울) ────────────────── */}
      <section className="py-28 px-8 lg:px-16 overflow-x-clip" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="LOCATIONS"
            title="거점과 운영 방식"
            lead="제주와 서울 두 거점에서 운영하며, 미팅은 화상·대면 모두 가능합니다."
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_1fr] gap-6 md:gap-4 items-center">
            {[locations[0], null, locations[1]].map((loc, i) =>
              loc === null ? (
                <LocationConnector key="connector" />
              ) : (
                <Reveal key={loc.title} x={i === 0 ? -40 : 40} y={0} className="h-full">
                  <TiltCard max={4} glare="rgba(58,110,165,0.12)" className="h-full bg-white rounded-2xl p-8 border" style={{ borderColor: 'var(--navy-100)' }}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>{loc.label}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{loc.title}</h3>
                    <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-600)' }}>{loc.body}</p>
                    <ul className="space-y-2">
                      {loc.roles.map((role) => (
                        <li key={role} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--navy-600)' }} />
                          <span className="text-sm" style={{ color: 'var(--navy-700)' }}>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 9 · 연락처 ─────────────────────────── */}
      <section className="py-28 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeading
            kicker="CONTACT"
            title="AX(AI 전환)을 시작하세요!"
            lead="어떤 분야든, 어떤 단계든 — 먼저 가볍게 이야기 나눠보세요."
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map(({ Icon, label, main, sub, href, internal }, i) => {
              const inner = (
                <TiltCard
                  max={6}
                  glare="rgba(58,110,165,0.12)"
                  className="h-full rounded-2xl p-8 border flex flex-col transition-shadow duration-500 group-hover:shadow-xl"
                  style={{ borderColor: 'var(--navy-100)', backgroundColor: 'var(--navy-25)' }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>{label}</span>
                  <div className="text-lg font-bold mt-1" style={{ color: 'var(--navy-900)' }}>{main}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--navy-500)' }}>{sub}</div>
                </TiltCard>
              );
              return (
                <Reveal key={label} delay={i * 0.1} y={40} className="h-full">
                  {internal ? (
                    <Link to={href} className="group block h-full">{inner}</Link>
                  ) : (
                    <a href={href} className="group block h-full">{inner}</a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 10 · 최종 CTA ──────────────────────── */}
      <section className="relative py-32 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <Aurora opacity={0.85} />
        <NeuralField density={26000} color="127,174,221" />
        <div className="relative max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl lg:text-6xl tracking-tight leading-tight text-white mb-6 font-bold">
            <SplitWords text="다음 단계를 함께 설계합니다" />
          </h2>
          <Reveal delay={0.25} y={20}>
            <p className="text-lg max-w-xl mx-auto leading-relaxed mb-12" style={{ color: 'var(--navy-200)' }}>
              진단부터 전략, 구축, 운영까지. 대표님이 본업에 집중하도록 나머지는 저희가 만들겠습니다.
            </p>
          </Reveal>
          <Reveal delay={0.4} y={20}>
            <Magnetic strength={0.35}>
              <a
                href="mailto:fusionsfc@gmail.com"
                className="group inline-flex items-center gap-2 px-10 py-5 text-lg transition-colors hover:bg-[#EBF4FF]"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span className="font-semibold">이메일로 문의하기</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
