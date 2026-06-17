import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Stethoscope,
  Building2,
  Workflow,
  Globe,
  Megaphone,
  Code2,
  Sparkles,
  MessageCircle,
  HeartPulse,
  LayoutDashboard,
  Boxes,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { homeImages } from '../data/homeImages';
import { fadeIn, staggerContainer, staggerItem, MotionLink } from '../lib/motion';
import { FaqSection } from '../components/FaqSection';

/* ── 자주 묻는 질문 (FAQPage 구조화 데이터) ────────── */
const homeFaqs = [
  { q: 'AX(AI 전환)가 정확히 무엇인가요?', a: 'AX는 AI Transformation의 약자로, 기업·기관의 실제 업무를 AI로 전환해 자동화·효율화하는 것을 말합니다. 단순히 AI 도구를 도입하는 게 아니라 업무 방식 자체를 AI 기반으로 바꿉니다.' },
  { q: 'LS AX 컨설팅은 어떤 일을 하나요?', a: '의료와 기업 현장의 업무를 AI로 전환합니다. AI 시장 진단, 업무 자동화, AI 최적화 웹·앱 구축, 맞춤 SaaS·플랫폼 개발, AI 전략 컨설팅을 진단부터 운영까지 한 팀이 수행합니다.' },
  { q: '일반 AI 도입 업체와 무엇이 다른가요?', a: '외부 AI 서비스를 연결만 하는 게 아니라, 자체 AI 시스템과 플랫폼(Cancer Hospital Platform·HappyLifeCare·Space AX)을 직접 개발해 운영합니다. 가장 까다로운 의료 현장에서 검증된 실행력이 차별점입니다.' },
  { q: '의료(병원) 분야에서는 무엇을 도와주나요?', a: '병원 홈페이지의 AI 검색 최적화(GEO/AEO), 온라인 홍보 전략·대행, 의료 AI 챗봇, 그리고 환자-병원을 실시간 연동하는 HappyLifeCare 플랫폼 도입까지 지원합니다.' },
  { q: '병원 홈페이지를 AX로 바꾸면 무엇이 달라지나요?', a: '환자가 AI(ChatGPT·Perplexity 등)에게 병원을 물었을 때 인용되도록 구조화하고, 일방적 정보 전달을 환자와의 양방향 연결로 바꿔 재내원·신규 유입·후기 자산을 늘립니다.' },
  { q: 'HappyLifeCare는 무엇인가요?', a: '암 요양병원 전용 AI 통합 케어 플랫폼입니다. 환자 앱(HappyLife)과 병원 관리 시스템(HappyCare)이 24개 포인트로 실시간 연동되어, 환자 데이터 기반의 선제 케어와 자연스러운 환자 유입을 만듭니다.' },
  { q: '기업 분야에서는 어떤 업무를 자동화하나요?', a: '보고·요약·정리·응대 같은 반복 사무 업무를 자동화합니다. 메일·파일·메시지를 읽고 → AI가 요약·분류·작성하고 → 전송·저장·보고하는 사이클을 시스템으로 전환합니다.' },
  { q: 'IT를 몰라도 업무 자동화를 쓸 수 있나요?', a: '네. 노드를 그릴 줄 몰라도 됩니다. 말로 업무를 설명하면 자동화를 대신 설계해 드리며, 카카오 알림톡·네이버웍스·한글·배민·더존 등 한국에서 실제 쓰는 도구에 연결합니다.' },
  { q: '비용은 어떻게 되나요?', a: '프로젝트 범위와 규모에 따라 다릅니다. AI 진단·상담을 통해 맞춤 솔루션과 예산 범위를 먼저 제안드리며, 무료 진단으로 시작할 수 있습니다.' },
  { q: '진행 절차와 기간은 어떻게 되나요?', a: '진단 → 설계 → 구축 → 운영의 4단계로 진행합니다. 무료 진단으로 시작해 범위에 따라 수 주~수 개월이 걸리며, 구축 후 운영·고도화까지 함께합니다.' },
  { q: '어느 지역에서 일하나요?', a: '제주와 서울 두 거점에서 운영하며, 미팅은 화상·대면 모두 가능합니다. 클라이언트 위치에 따라 유연하게 진행합니다.' },
  { q: '상담은 어떻게 신청하나요?', a: "홈페이지의 '상담/견적 신청'에서 AI 진단(7~10분) 또는 60분 무료 상담을 신청할 수 있습니다. 이메일 fusionsfc@gmail.com, 전화 +82.10.9297.0940으로도 문의 가능합니다." },
] as const;

/* ── 3대 자체 플랫폼 ───────────────────────────────── */
const platforms = [
  {
    Icon: LayoutDashboard,
    tag: 'Healthcare',
    title: 'Cancer Hospital Platform',
    body: '암 병원 운영과 환자 관리를 하나로 묶은 통합 플랫폼. 진료·입원·KPI를 데이터로 연결합니다.',
    image: homeImages.cancerPlatform,
    to: '/healthcare',
  },
  {
    Icon: HeartPulse,
    tag: 'Mobile App',
    title: '환자재활 애플리케이션',
    body: '환자와 보호자를 위한 재활·케어 앱. 건강 모니터링과 맞춤 가이드를 일상에서 제공합니다.',
    image: homeImages.rehabApp,
    to: '/patients',
  },
  {
    Icon: Boxes,
    tag: 'Automation',
    title: 'Space AX Platform',
    body: '공간·현장의 반복 업무를 자동화하는 AX 플랫폼. 운영 데이터를 시스템으로 전환합니다.',
    image: homeImages.spaceAx,
    to: '/business',
  },
] as const;

/* ── 두 개의 전문 분야 ─────────────────────────────── */
const domains = [
  {
    Icon: Stethoscope,
    eyebrow: '의료분야 AX',
    title: '병원과 환자의 건강관리를 AI로 전환',
    body: '병원이 디지털과 AI로 도약하도록 끝까지 함께합니다.',
    image: homeImages.medical,
    points: [
      { Icon: Globe, label: 'AI 최적화 웹사이트 구축' },
      { Icon: Megaphone, label: '온라인 홍보 전략 및 대행' },
      { Icon: Code2, label: '의료 AI 솔루션 구축' },
    ],
    to: '/healthcare',
    cta: '의료분야 보기',
  },
  {
    Icon: Building2,
    eyebrow: '기업분야 AX',
    title: '업무 자동화와 컨설팅',
    body: '기업의 반복 업무를 AI로 전환하고, 산업에 관계없이 맞춤 전략을 설계합니다.',
    image: homeImages.corporate,
    points: [
      { Icon: Workflow, label: '업무 자동화 AX' },
      { Icon: Boxes, label: '운영 프로세스 컨설팅' },
      { Icon: Building2, label: '산업별 맞춤 AX 전략' },
    ],
    to: '/business',
    cta: '기업분야 보기',
  },
] as const;

/* ── 진행 방식 ─────────────────────────────────────── */
const process = [
  { n: '01', title: '진단', body: '자체 AI로 시장·고객·업무를 분석합니다.' },
  { n: '02', title: '설계', body: '실행 가능한 AX 전략과 구조를 설계합니다.' },
  { n: '03', title: '구축', body: '웹·앱·자동화를 직접 만듭니다.' },
  { n: '04', title: '운영', body: '데이터로 측정하고 지속 고도화합니다.' },
] as const;

/* ── 신뢰 지표 ─────────────────────────────────────── */
const stats = [
  { value: '3종', label: '자체 개발 플랫폼' },
  { value: '15,000건+', label: '누적 AI 분석 데이터' },
  { value: '15년+', label: '의료·기업 현장 경험' },
  { value: '7년+', label: '자체 SaaS 개발·운영' },
] as const;

const quoteEntries = [
  {
    Icon: Sparkles,
    label: '7–10분 소요',
    title: 'AI 진단으로 맞춤 견적 받기',
    body: 'Claude AI가 준비도를 진단하고 맞춤 솔루션과 예산 범위를 즉시 제안합니다.',
    ctaLabel: '지금 진단 시작',
    ctaTo: '/consultation',
    primary: true,
  },
  {
    Icon: MessageCircle,
    label: '60분 무료 미팅',
    title: '60분 무료 상담 신청',
    body: '진단 없이 바로 대화로 시작하고 싶다면 — 60분 무료 미팅으로 방향을 잡습니다.',
    ctaLabel: '상담 신청',
    ctaTo: '/consultation?simple=true',
    primary: false,
  },
] as const;

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="LS AX 컨설팅 - 의료와 기업의 업무를 AI로 전환합니다"
        description="LS AX 컨설팅은 의료와 기업 현장의 업무를 AI로 전환(AX)하는 전문 기업입니다. Cancer Hospital Platform, 환자재활 애플리케이션, Space AX Platform을 직접 개발해 운영합니다."
        url="https://www.lsconsulting.co.kr"
      />

      {/* ── SECTION 1 · HERO ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        {/* 배경 이미지 + 네이비 오버레이 (이미지 실패해도 그라데이션 유지) */}
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
          style={{
            backgroundImage:
              'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-44 pb-32" {...fadeIn}>
          <div className="max-w-4xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              의료 · 기업 AX 전문 기업
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              의료와 기업의 업무를
              <br />
              <span style={{ color: 'var(--navy-300)' }}>AI로 전환</span>합니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              LS AX 컨설팅은 의료와 기업 현장의 업무를 AI로 전환(AX)하는 전문 기업입니다.
              이론이 아니라, 이미 만들어 운영 중인 플랫폼으로 증명합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span className="font-semibold">상담 / 견적 신청</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              >
                <span>작동 중인 AI 직접 보기</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2 · 3대 자체 플랫폼 ─────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              ALREADY BUILT
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              운영 중인 AX 플랫폼 서비스
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              가능성을 말하는 회사는 많습니다. LS AX 컨설팅은 결과물로 이야기합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {platforms.map(({ Icon, tag, title, body, image, to }) => (
              <MotionLink
                key={title}
                variants={staggerItem}
                to={to}
                className="group rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: 'var(--navy-100)' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                    style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--navy-600)' }}>
                    {body}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    자세히 보기 <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 3 · 두 개의 전문 분야 ───────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              두 개의 분야, 하나의 실행력
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              의료와 기업, 가장 까다로운 두 현장에서 AX를 직접 만듭니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" {...staggerContainer}>
            {domains.map(({ Icon, eyebrow, title, body, image, points, to, cta }) => (
              <motion.div key={title} variants={staggerItem} className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="relative h-56 overflow-hidden" style={{ backgroundColor: 'var(--navy-200)' }}>
                  <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0) 30%, rgba(10,22,40,0.85) 100%)' }}
                  />
                  <div className="absolute bottom-5 left-6 right-6">
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white/80">
                      <Icon className="w-4 h-4" />
                      {eyebrow}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-600)' }}>
                    {body}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {points.map(({ Icon: PIcon, label }) => (
                      <li key={label} className="flex items-center gap-3">
                        <span
                          className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'var(--navy-50)' }}
                        >
                          <PIcon className="w-4 h-4" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                        </span>
                        <span className="text-sm font-medium" style={{ color: 'var(--navy-900)' }}>
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={to}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white transition-all hover:opacity-90 self-start"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <span className="font-semibold">{cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4 · 신뢰 지표 (이미지 배경) ─────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${homeImages.trust})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.82)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto" {...fadeIn}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-5">
              AI를 쓰는 회사가 아니라
              <br className="hidden sm:block" />
              AI를 만드는 회사입니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              외부 서비스를 연결하는 데 그치지 않고, 자체 AI 시스템을 설계하고 운영합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto" {...staggerContainer}>
            {stats.map(({ value, label }) => (
              <motion.div key={label} variants={staggerItem} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{value}</div>
                <div className="text-sm" style={{ color: 'var(--navy-300)' }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 5 · 진행 방식 ───────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              진단부터 운영까지, 한 팀이
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              분석 따로, 개발 따로가 아닙니다. 한 호흡으로 끝까지 책임집니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {process.map(({ n, title, body }) => (
              <motion.div key={n} variants={staggerItem} className="rounded-xl p-7" style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}>
                <div className="text-3xl font-bold tabular-nums mb-4" style={{ color: 'var(--navy-300)' }}>
                  {n}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ (FAQPage 구조화 데이터) ─────────────────── */}
      <FaqSection
        items={homeFaqs}
        title="자주 묻는 질문"
        lead="AX·의료·기업·비용·진행까지, 자주 묻는 것들을 모았습니다."
      />

      {/* ── SECTION 6 · 견적 진입 + 최종 CTA ────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" {...staggerContainer}>
            {quoteEntries.map(({ Icon, label, title, body, ctaLabel, ctaTo, primary }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="p-10 rounded-2xl flex flex-col"
                style={{ backgroundColor: primary ? 'var(--navy-900)' : 'white' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: primary ? 'rgba(255,255,255,0.15)' : 'var(--navy-100)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: primary ? 'white' : 'var(--navy-700)' }} strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-xs font-semibold tracking-wide"
                    style={{ color: primary ? 'rgba(255,255,255,0.6)' : 'var(--navy-500)' }}
                  >
                    {label}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: primary ? 'white' : 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p
                  className="text-base leading-relaxed mb-8 flex-1"
                  style={{ color: primary ? 'rgba(255,255,255,0.7)' : 'var(--navy-600)' }}
                >
                  {body}
                </p>
                <Link
                  to={ctaTo}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold transition-all hover:opacity-90 self-start"
                  style={primary ? { backgroundColor: 'white', color: 'var(--navy-900)' } : { backgroundColor: 'var(--navy-900)', color: 'white' }}
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
