import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Cpu,
  ShieldCheck,
  Layers,
  Hammer,
  LineChart,
  Workflow,
  Globe,
  Code2,
  Compass,
  Boxes,
} from 'lucide-react';
import { motion } from 'motion/react';
import { fadeIn, staggerContainer, staggerItem, MotionLink } from '../lib/motion';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { homeImages, axImages } from '../data/homeImages';

/* ── AX 강점 ───────────────────────────────────────── */
const strengths = [
  {
    Icon: Cpu,
    title: 'AI를 직접 만드는 회사',
    body: '외부 API를 연결하는 데 그치지 않고, 자체 AI 시스템을 설계하고 운영합니다.',
  },
  {
    Icon: ShieldCheck,
    title: '가장 어려운 의료에서 검증',
    body: '규제와 민감 데이터가 얽힌 의료 현장에서 작동하는 AI를 만들어 왔습니다.',
  },
  {
    Icon: Layers,
    title: '진단부터 운영까지 원스톱',
    body: '한 팀이 분석·설계·개발·운영을 이어갑니다. 단계 사이 정보 손실이 없습니다.',
  },
  {
    Icon: Hammer,
    title: '외주 없는 직접 개발',
    body: '기획한 사람이 직접 만듭니다. 의도가 그대로 결과물에 반영됩니다.',
  },
] as const;

/* ── AX 솔루션 ─────────────────────────────────────── */
const solutions = [
  {
    Icon: LineChart,
    image: axImages.diagnosis,
    tag: 'Diagnosis',
    title: 'AI 시장 진단',
    body: '시장·고객·경쟁사를 자체 AI로 13개 축으로 분석합니다. AI 도입의 가장 가벼운 첫걸음.',
  },
  {
    Icon: Workflow,
    image: axImages.automation,
    tag: 'Automation',
    title: 'AI 업무 자동화',
    body: '엑셀·메신저로 굴러가던 반복 업무를 Claude API와 자동화 도구로 시스템화합니다.',
  },
  {
    Icon: Globe,
    image: axImages.webapp,
    tag: 'Web & App',
    title: 'AI 최적화 웹·앱',
    body: 'AI 검색 노출 + 24시간 AI 챗봇 + 국내 시장 특화를 한 번에 구축합니다.',
  },
  {
    Icon: Code2,
    image: axImages.saas,
    tag: 'Custom SaaS',
    title: '맞춤 SaaS 개발',
    body: '기성 솔루션이 회사 방식을 못 따라올 때, 전용 시스템을 자체 구축해 운영합니다.',
  },
  {
    Icon: Boxes,
    image: axImages.platform,
    tag: 'Platform',
    title: 'AX 플랫폼 개발',
    body: '회사의 핵심 업무를 담는 전용 플랫폼을 설계·개발합니다. 이미 3종의 플랫폼을 자체 개발해 운영 중입니다.',
  },
  {
    Icon: Compass,
    image: axImages.strategy,
    tag: 'Consulting',
    title: 'AI 전략 컨설팅',
    body: '사내 AI 인력을 두기 전, 외부 전문가가 함께 설계하는 정기 자문.',
  },
] as const;

/* ── 케이스(사례) ──────────────────────────────────── */
const cases = [
  {
    image: homeImages.cancerPlatform,
    tag: 'Healthcare · Platform',
    title: 'Cancer Hospital Platform',
    problem: '암 병원의 진료·입원·KPI가 흩어져 관리되던 문제',
    result: '운영 데이터를 하나로 묶어 자동 KPI 산출까지 연결한 통합 플랫폼',
    to: '/healthcare',
  },
  {
    image: homeImages.rehabApp,
    tag: 'Healthcare · Mobile',
    title: '환자재활 애플리케이션',
    problem: '퇴원 후 환자·보호자의 재활 관리가 단절되던 문제',
    result: '건강 모니터링과 맞춤 가이드를 일상에서 제공하는 케어 앱',
    to: '/patients',
  },
  {
    image: homeImages.spaceAx,
    tag: 'Business · Automation',
    title: 'Space AX Platform',
    problem: '공간·현장의 반복 업무가 수작업에 묶여 있던 문제',
    result: '운영 데이터를 시스템으로 전환해 반복 업무를 자동화',
    to: '/business',
  },
  {
    image: axImages.aiConsult,
    tag: 'Healthcare · AI',
    title: 'AI 암상담 시스템',
    problem: '환자·보호자의 질문에 24시간 정확히 답할 창구가 없던 문제',
    result: 'RAG 기반 의료 상담 AI — 한국 의료체계까지 반영해 응대',
    to: '/consultation',
  },
] as const;

/* ── 진행 방식 ─────────────────────────────────────── */
const steps = [
  { n: '01', title: '진단', body: '자체 AI로 시장·고객·업무를 분석합니다.' },
  { n: '02', title: '설계', body: '실행 가능한 AX 전략과 구조를 설계합니다.' },
  { n: '03', title: '구축', body: '웹·앱·자동화를 외주 없이 직접 만듭니다.' },
  { n: '04', title: '운영', body: 'KPI로 측정하고 지속 고도화합니다.' },
] as const;

export function Services() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AX - LS AX 컨설팅"
        description="LS AX 컨설팅의 AX(AI 전환) 강점과 실제 케이스. AI 시장 진단, 업무 자동화, AI 최적화 웹·앱, 맞춤 SaaS, AI 전략 컨설팅을 한 팀이 진단부터 운영까지 책임집니다."
        url="https://www.lsconsulting.co.kr/services"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
            { '@type': 'ListItem', position: 2, name: 'AX', item: 'https://www.lsconsulting.co.kr/services' },
          ] },
          { '@context': 'https://schema.org', '@type': 'Service', name: 'AX · AI 전환', serviceType: ['AI 시장 진단', 'AI 업무 자동화', 'AI 최적화 웹·앱 구축', '맞춤 SaaS 개발', 'AX 플랫폼 개발', 'AI 전략 컨설팅'], areaServed: 'KR', url: 'https://www.lsconsulting.co.kr/services', provider: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' } },
        ]}
      />

      {/* ── SECTION 1 · HERO ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.84) 50%, rgba(10,22,40,0.97) 100%), url(${axImages.hero})`,
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
              <Cpu className="w-3.5 h-3.5" />
              AX · AI Transformation
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              AI 전환을 미루는 사이
              <br />
              <span style={{ color: 'var(--navy-300)' }}>경쟁사는 이미</span> 앞서갑니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              진단 · 자동화 · 웹앱 · SaaS · 컨설팅, 그리고 자체 개발한 <span className="font-semibold text-white">AX 플랫폼</span>.
              한 팀이 분석부터 운영까지 이어갑니다.
              말이 아니라 이미 운영 중인 플랫폼과 결과물로 증명합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span className="font-semibold">컨설팅의뢰</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <a
                href="#cases"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              >
                <span>케이스 먼저 보기</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2 · AX 강점 ─────────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              WHY LS AX
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              AX, LS AX 컨설팅이 다른 이유
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              AI를 소개하는 회사는 많지만, 자체 개발해 운영하는 회사는 드뭅니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {strengths.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="rounded-2xl p-7"
                style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
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

      {/* ── SECTION 3 · 케이스(사례) ────────────────────── */}
      <motion.section id="cases" className="py-28 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              CASES
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              자체 개발한 AX 사례
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              문제를 어떻게 AX로 풀었는지, 결과물로 보여드립니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-6" {...staggerContainer}>
            {cases.map(({ image, tag, title, problem, result, to }) => (
              <MotionLink
                key={title}
                variants={staggerItem}
                to={to}
                className="group bg-white rounded-2xl overflow-hidden flex flex-col sm:flex-row transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden shrink-0" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-xs font-semibold tracking-wide mb-2" style={{ color: 'var(--navy-500)' }}>
                    {tag}
                  </span>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                    {title}
                  </h3>
                  <div className="space-y-2.5 flex-1">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                      <span className="font-semibold" style={{ color: 'var(--navy-900)' }}>문제 </span>
                      {problem}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                      <span className="font-semibold" style={{ color: 'var(--navy-900)' }}>AX </span>
                      {result}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold mt-5 transition-all group-hover:gap-3"
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

      {/* ── SECTION 4 · AX 솔루션 ───────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              SOLUTIONS
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              6가지 AX 솔루션
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              단계별로 도입하거나, 한 번에 통합할 수 있습니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {solutions.map(({ Icon, image, tag, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="rounded-2xl overflow-hidden border flex flex-col" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="relative aspect-[16/9] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
                  <span
                    className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                    style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tag}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 5 · 진행 방식 ───────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
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
            {steps.map(({ n, title, body }) => (
              <motion.div variants={staggerItem} key={n} className="rounded-xl p-7 bg-white border" style={{ borderColor: 'var(--navy-100)' }}>
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

      {/* ── SECTION 6 · 최종 CTA ────────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${homeImages.trust})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.85)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
            어떤 AX가 맞는지
            <br className="hidden sm:block" />
            60분 무료 상담으로 확인하세요
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--navy-200)' }}>
            솔루션이 명확하지 않으셔도 됩니다. 회사 상황을 듣고 가장 적합한 방향을 제안합니다.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
          >
            <span className="font-semibold">컨설팅의뢰</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
