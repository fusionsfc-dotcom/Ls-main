import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
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
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { homeImages, axImages, medImages } from '../data/homeImages';
import { fadeIn, staggerContainer, staggerItem, MotionLink } from '../lib/motion';

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
    image: homeImages.cancerPlatform,
    to: '/healthcare',
  },
  {
    Icon: HeartPulse,
    tag: 'Mobile App',
    title: '환자재활 애플리케이션',
    body: '환자·보호자를 위한 케어 앱(HappyLife). 전국 165개 병원과 실시간 양방향 연동됩니다.',
    image: homeImages.rehabApp,
    to: '/healthcare',
  },
  {
    Icon: Boxes,
    tag: 'Automation',
    title: 'Space AX Platform',
    body: '기업의 반복 업무를 자동화하는 AX 플랫폼. 말로 설명하면 시스템이 대신 일합니다.',
    image: homeImages.spaceAx,
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
  { image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=80', title: '자체 AI 분석 시스템', body: '13개 축 분석 프레임워크와 누적 데이터로 매월 자동 리포트를 발행합니다.' },
  { image: medImages.hospitalSys, title: 'HappyLifeCare SaaS', body: '7년 자체 개발한 헬스케어 통합 플랫폼. 병원용·환자용 듀얼 앱 구조.' },
  { image: axImages.aiConsult, title: 'AI 암상담 시스템', body: 'Claude API 기반 RAG 아키텍처. 사이트에서 24시간 작동 중입니다.' },
  { image: axImages.webapp, title: 'AI 최적화 웹사이트', body: '의료광고심의 통과 사이트를 다수 운영하며 AI 검색 노출 노하우를 축적했습니다.' },
  { image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80', title: '환자 분석 데이터베이스', body: '암 환자 후기·경험 데이터를 구조화한 PVM 자산. 의료 컨설팅의 차별점 근거입니다.' },
  { image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80', title: '제주 AI 개발 커뮤니티', body: '제주에서 AI 개발 커뮤니티를 운영합니다. 인재·협업 네트워크의 시드입니다.' },
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

/* ── 연락처 ────────────────────────────────────────── */
const contacts = [
  { Icon: Mail, label: 'Email', main: 'fusionsfc@gmail.com', sub: '24시간 내 답변', href: 'mailto:fusionsfc@gmail.com', internal: false },
  { Icon: Phone, label: 'Phone', main: '+82.10.9297.0940', sub: '평일 10:00 – 18:00', href: 'tel:+821092970940', internal: false },
  { Icon: MessageSquare, label: 'Consultation', main: '60분 무료 상담', sub: '화상 또는 대면 미팅', href: '/consultation', internal: true },
] as const;

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="회사소개 - LS AX 컨설팅"
        description="LS AX 컨설팅은 의료와 기업의 업무를 AI로 전환(AX)하는 전문 기업입니다. Cancer Hospital Platform, 환자재활 애플리케이션, Space AX Platform을 직접 개발해 운영하며, 자체 AI 분석 시스템과 헬스케어 SaaS를 보유합니다."
        url="https://www.lsconsulting.co.kr/about"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
            { '@type': 'ListItem', position: 2, name: '소개', item: 'https://www.lsconsulting.co.kr/about' },
          ] },
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: '회사소개 · LS AX 컨설팅', url: 'https://www.lsconsulting.co.kr/about', about: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' } },
        ]}
      />

      {/* ── SECTION 1 · HERO ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.86) 50%, rgba(10,22,40,0.97) 100%), url(${homeImages.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-44 pb-32" {...fadeIn}>
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              About · 회사소개
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              AI를 쓰는 회사가 아니라
              <br />
              <span style={{ color: 'var(--navy-300)' }}>AI를 만드는</span> 회사입니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              LS AX 컨설팅은 의료와 기업 현장의 업무를 AI로 전환(AX)하는 전문 기업입니다.
              이론이 아니라, 이미 만들어 운영 중인 플랫폼으로 증명합니다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2 · 핵심 지표 ──────────────────────── */}
      <motion.section className="py-20 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {stats.map(({ value, label }) => (
              <motion.div key={label} variants={staggerItem} className="rounded-2xl p-7 text-center" style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}>
                <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>{value}</div>
                <div className="text-sm" style={{ color: 'var(--navy-600)' }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 3 · 3대 자체 플랫폼 ─────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>WHAT WE BUILT</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              자체개발 운영 AX 플랫폼 서비스
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              가능성을 말하는 회사는 많습니다. 우리는 결과물로 이야기합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {platforms.map(({ Icon, tag, title, body, image, to }) => (
              <MotionLink variants={staggerItem} key={title} to={to} className="group bg-white rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur" style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}>
                    <Icon className="w-3.5 h-3.5" />{tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4 · 두 개의 전문 분야 ──────────────── */}
      <motion.section className="py-24 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              두 개의 분야, 하나의 실행력
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              의료와 기업, 가장 까다로운 두 현장에서 AX를 직접 만듭니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...staggerContainer}>
            {domains.map(({ Icon, eyebrow, title, body, to, cta }) => (
              <motion.div variants={staggerItem} key={title} className="rounded-2xl p-8 flex flex-col" style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs font-semibold tracking-wide mb-1" style={{ color: 'var(--navy-500)' }}>{eyebrow}</span>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed mb-6 flex-1" style={{ color: 'var(--navy-600)' }}>{body}</p>
                <Link to={to} className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3 self-start" style={{ color: 'var(--navy-900)' }}>
                  {cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 5 · 일하는 방식 ────────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>HOW WE WORK</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              일하는 방식
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              범용 AI 회사가 흉내낼 수 없는 업계 깊이를, 실행과 지표로 증명합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {values.map(({ Icon, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="bg-white rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 6 · 보유 역량·자산 ─────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>OUR ASSETS</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              보유한 역량과 자산
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              컨설팅사 중 자체 제품·데이터·운영 노하우를 모두 가진 회사는 드뭅니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {assets.map(({ image, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="rounded-2xl overflow-hidden border flex flex-col" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="aspect-[16/9] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 7 · 거점 ───────────────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>LOCATIONS</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              거점과 운영 방식
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              제주와 서울 두 거점에서 운영하며, 미팅은 화상·대면 모두 가능합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...staggerContainer}>
            {locations.map(({ label, title, body, roles }) => (
              <motion.div variants={staggerItem} key={title} className="bg-white rounded-2xl p-8 border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>{label}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-600)' }}>{body}</p>
                <ul className="space-y-2">
                  {roles.map((role) => (
                    <li key={role} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--navy-600)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-700)' }}>{role}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 8 · 리더십 ─────────────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-8 lg:p-14"
            style={{
              background: 'linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 55%, var(--navy-700) 100%)',
              boxShadow: '0 30px 60px -22px rgba(10,22,40,0.5)',
            }}
          >
            {/* 그리드 패턴 */}
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '46px 46px' }} />
            {/* 글로우 */}
            <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,143,201,0.35) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(44,82,130,0.4) 0%, transparent 70%)' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-32 h-32 rounded-3xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--navy-500), var(--navy-800))', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 14px 34px -10px rgba(0,0,0,0.55)' }}
                >
                  <span className="text-4xl font-bold text-white tracking-tight">LS</span>
                </div>
                <div className="text-2xl font-bold text-white mt-5">{leadership.nameKo}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--navy-300)' }}>{leadership.nameEn} · {leadership.role}</div>
              </div>
              <div className="lg:col-span-2">
                <span className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.2em]" style={{ color: 'var(--navy-300)' }}>
                  <span className="w-7 h-px" style={{ backgroundColor: 'var(--navy-400)' }} />
                  LEADERSHIP
                </span>
                <p className="text-2xl lg:text-3xl font-semibold leading-snug mt-4 mb-7 text-white">{leadership.oneLine}</p>
                <div className="flex flex-wrap gap-2.5 mb-7">
                  {leadership.keywords.map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.14)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--navy-300)' }} />
                      {k}
                    </span>
                  ))}
                </div>
                <p className="text-sm" style={{ color: 'var(--navy-400)' }}>{leadership.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 9 · 연락처 ─────────────────────────── */}
      <motion.section className="py-24 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>CONTACT</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              AX(AI 전환)을 시작하세요!
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              어떤 분야든, 어떤 단계든 — 먼저 가볍게 이야기 나눠보세요.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {contacts.map(({ Icon, label, main, sub, href, internal }) => {
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>{label}</span>
                  <div className="text-lg font-bold mt-1" style={{ color: 'var(--navy-900)' }}>{main}</div>
                  <div className="text-sm mt-1" style={{ color: 'var(--navy-500)' }}>{sub}</div>
                </>
              );
              const cls = 'bg-white rounded-2xl p-8 border transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col';
              return internal ? (
                <MotionLink variants={staggerItem} key={label} to={href} className={cls} style={{ borderColor: 'var(--navy-100)' }}>{inner}</MotionLink>
              ) : (
                <motion.a variants={staggerItem} key={label} href={href} className={cls} style={{ borderColor: 'var(--navy-100)' }}>{inner}</motion.a>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 10 · 최종 CTA ──────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${homeImages.trust})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.85)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
            다음 단계를 함께 설계합니다
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--navy-200)' }}>
            진단부터 전략, 구축, 운영까지. 대표님이 본업에 집중하도록 나머지는 저희가 만들겠습니다.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
          >
            <span className="font-semibold">상담 / 견적 신청</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
