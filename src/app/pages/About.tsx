import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Compass, Zap, LineChart, Layers, Brain, Smartphone, MessageCircle,
  Globe, Database, Users, MapPin, Mail, Phone, MessageSquare, ArrowRight, Check,
} from 'lucide-react';
import { SEO } from '../components/SEO';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const capabilities = [
  {
    label: 'Strategy',
    period: '광고 기획·전략 10년+ 누적',
    title: '전략 수립과 실행 기획',
    body: 'LS컨설팅은 종합광고대행사 광고기획자(AE) 경력에서 출발한 전략 수립 역량을 보유하고 있습니다. 클라이언트의 비즈니스 문제를 구조화하고, 메시지를 시장 언어로 번역하고, 매체별 전환을 설계하는 능력은 일반 IT 컨설팅사가 갖추기 어려운 영역입니다.',
    skills: [
      '비즈니스 문제 구조화 (페인포인트 인터뷰·관찰)',
      '메시지 시장 번역 (카피·기획·콘텐츠 설계)',
      '매체별 전환 설계 (디지털 마케팅 기초)',
      '캠페인 운영·KPI 측정',
    ],
    connection: 'AI 시장 진단·전략 컨설팅 영역의 기반이 되는 역량입니다.',
  },
  {
    label: 'Insight',
    period: '의료 현장 15년+ 누적',
    title: '업계 워크플로우 깊이 이해',
    body: 'LS컨설팅은 암 요양·한방병원 현장에서 환자 입원·생활 상담을 직접 수행하고, 10개 이상의 병원 개원 자문과 5개 이상의 병원 상시 PR 운영을 통해 의료 업계의 비의료 워크플로우를 깊이 학습한 회사입니다. 이 통찰은 자체 AI 분석 시스템의 13개 축 분석 프레임의 기반이 됐습니다.',
    skills: [
      '환자·고객 의사결정 패턴 학습',
      '의료기관 운영의 비의료 병목 이해 (입지·인력·홍보·환자 관리)',
      '한국 의료체계 현실 (산정특례·건강보험·요양급여·의료광고심의)',
      '의료법·개인정보보호법 준수 운영 노하우',
    ],
    connection: '자체 AI 분석 시스템과 의료 전문 패키지의 차별점을 만드는 역량입니다. 의료가 아닌 업계 클라이언트에게도 "가장 까다로운 곳에서 검증됐다"는 신뢰를 제공합니다.',
  },
  {
    label: 'Execution',
    period: '자체 SaaS 개발 7년+ 누적',
    title: 'AI·소프트웨어 직접 개발',
    body: "LS컨설팅은 자체 헬스케어 SaaS '해피라이프케어'를 7년간 개발·운영해 온 풀스택 실행 역량을 보유합니다. Claude Code, Cursor 등 AI 도구 본격 활용 단계로 진입하여, 외부 외주 의존 없이 진단·설계·개발·운영을 한 회사가 완결합니다.",
    skills: [
      'React/Next.js, Supabase, Claude API 풀스택 개발',
      '자체 SaaS 운영의 실제 사이클 (설계·개발·온보딩·이탈관리)',
      'AI 시스템 설계·운영 (RAG, pgvector, Edge Functions)',
      '외주 의존도 0의 직접 실행 구조',
    ],
    connection: 'AI 최적화 웹·앱 구축, 맞춤 SaaS 개발 영역의 기반이 되는 역량입니다. "보고서로 끝나지 않고 시스템으로 살아 움직이는 결과물"의 약속이 가능한 이유입니다.',
  },
] as const;

const missions = [
  { n: '01', title: '데이터로 증명되는 의사결정', body: '감과 경험에 의존하던 조직 운영을 객관적 지표(KPI) 기반으로 전환합니다.' },
  { n: '02', title: 'AI를 도구가 아닌 인프라로', body: '일회성 자동화가 아닌, 조직의 분석·실행 체계 자체에 AI를 내장합니다.' },
  { n: '03', title: '전략과 실행 사이의 거리를 0으로', body: '보고서로 끝나는 컨설팅이 아닌, 시스템으로 살아 움직이는 결과물을 만듭니다.' },
  { n: '04', title: '업계 깊이를 잃지 않는다', body: '범용 AI 회사가 흉내낼 수 없는 업계 통찰을 솔루션의 기본값으로 둡니다.' },
] as const;

const coreValues = [
  { Icon: Compass, title: '업계 우선 (Domain First)', body: '산업을 모르면 AI도 못 씁니다. 클라이언트 산업의 실제 워크플로우를 먼저 이해합니다.' },
  { Icon: Zap, title: '실행 가능성 (Execution Bias)', body: 'PPT보다 동작하는 프로토타입을 먼저 만듭니다. 추측이 아닌 실물로 의사결정합니다.' },
  { Icon: LineChart, title: '지표 중심 (Measurable)', body: '"좋아진 것 같다"가 아니라 "20% 개선됐다"로 말합니다. 데이터로만 검증합니다.' },
  { Icon: Layers, title: '자산화 (Build to Asset)', body: '프로젝트마다 재사용 가능한 컴포넌트·모듈을 남깁니다. 다음 프로젝트는 더 빨라집니다.' },
] as const;

const assets = [
  { Icon: Brain, title: '자체 AI 분석 시스템', body: '13개 축 분석 프레임워크, 누적 1,900건+ 데이터, 매월 자동 리포트 발행' },
  { Icon: Smartphone, title: '해피라이프케어 SaaS', body: '7년 자체 개발한 헬스케어 통합 플랫폼. 병원용·환자용 듀얼 앱 구조. 2026년 6월 런칭' },
  { Icon: MessageCircle, title: 'AI 암상담 시스템', body: 'Claude API 기반 RAG 아키텍처. lsconsulting.co.kr에서 24시간 작동 중' },
  { Icon: Globe, title: 'AI 최적화 웹사이트', body: '의료광고심의 통과 가능 사이트 5개+ 보유 운영. AI 검색 노출 노하우 축적' },
  { Icon: Database, title: '환자 분석 데이터베이스', body: '한국 암 환자 13개 축 분석 데이터 누적 1,900건+. 의료 컨설팅의 차별점 근거' },
  { Icon: Users, title: '바이브코딩 제주 커뮤니티', body: '제주 AI 개발 커뮤니티 운영. 인재·협업 네트워크의 시드' },
] as const;

const locations = [
  {
    label: 'Headquarters',
    title: '제주 거점',
    body: '제주는 LS컨설팅의 본 거점입니다. 자체 SaaS 개발과 자체 AI 시스템 운영의 베이스이자, 바이브코딩 제주 커뮤니티의 활동 중심지입니다.',
    roles: ['제품 개발·R&D 본부', '원격 개발·운영의 거점', '제주 클라이언트 대면 미팅'],
  },
  {
    label: 'Healthcare Hub',
    title: '서울 거점',
    body: '서울은 의료기관 클라이언트와의 접점입니다. 수도권 의료기관 대면 미팅, 의료 콘텐츠 작업, 의료광고심의 등 의료 행정 업무의 거점입니다.',
    roles: ['수도권 의료 클라이언트 대면 미팅', '의료 콘텐츠 촬영·제작', '국립암센터 인근 의료 네트워크 활용'],
  },
] as const;

const contacts = [
  {
    Icon: Mail,
    label: 'Email',
    main: 'fusionsfc@gmail.com',
    sub: '24시간 내 답변',
    href: 'mailto:fusionsfc@gmail.com',
    isInternal: false,
  },
  {
    Icon: Phone,
    label: 'Phone',
    main: '010-9297-0940',
    sub: '평일 10:00 - 18:00',
    href: 'tel:01092970940',
    isInternal: false,
  },
  {
    Icon: MessageSquare,
    label: 'Consultation',
    main: '60분 무료 상담',
    sub: '화상 또는 대면 미팅',
    href: '/consultation',
    isInternal: true,
  },
] as const;

const leadership = {
  nameKo: '석현이',
  nameEn: 'Lee Seok Hyun',
  role: '대표 컨설턴트',
  oneLineIntro: '광고기획·헬스케어·AI 개발 경력을 결합한 LS컨설팅의 사업·전략 책임자.',
  keywords: ['광고기획 10년+', '의료 현장 15년+', '개원 컨설팅 10개+', '자체 SaaS 7년+ 개발'],
  closingNote: '협력 파트너·외부 자문진과의 협업 구조로 운영됩니다.',
} as const;

export function About() {
  return (
    <>
      <SEO
        title="회사소개 - LS컨설팅"
        description="LS컨설팅은 전략·업계 통찰·실행이라는 세 가지 역량을 한 회사가 모두 갖춘 AI 솔루션 회사입니다. 광고기획 10년+, 의료 현장 15년+, 자체 SaaS 7년+ 개발의 누적 역량을 보유하며, 자체 AI 분석 시스템과 헬스케어 SaaS를 직접 운영합니다."
        url="https://www.lsconsulting.co.kr/about"
      />

      {/* S1: Hero */}
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="max-w-3xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--navy-500)' }}>
              About LS Consulting
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: 'var(--navy-900)' }}>
              귀사 만을 위한 AI를 만듭니다
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: 'var(--navy-600)' }}>
              범용 AI를 단순 연결하는 회사가 아닙니다.
              <br />
              LS컨설팅은 회사의 데이터·워크플로우·고객을 학습한
              <br />
              전용 AI 시스템을 직접 설계하고 만듭니다.
              <br />
              전략·업계 통찰·실행 역량을 모두 갖춘 AI 컨설팅&솔루션개발 회사입니다.
            </p>
            <p className="text-sm" style={{ color: 'var(--navy-400)' }}>
              광고기획 10년+ · 의료 현장 15년+ · 자체 SaaS 개발 7년+ · AI 솔루션 운영
            </p>
          </motion.div>
        </div>
      </section>

      {/* S2: 3대 역량 */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Core Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              한 회사가 모두 갖추기 어려운
              <br />
              세 가지 역량
            </h2>
            <p className="text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              컨설팅·통찰·실행은 보통 따로 존재합니다.
              컨설팅사는 전략을 짜고, 외주 개발사는 만들고, 업계 전문가는 의견만 제공합니다.
              <br />
              LS컨설팅은 이 세 가지가 한 회사 안에서 한 호흡으로 작동합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {capabilities.map(({ label, period, title, body, skills, connection }, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white flex flex-col"
                style={{ border: '1px solid var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <span
                    className="inline-block text-xs font-semibold tracking-widest uppercase px-2.5 py-1 mb-3"
                    style={{ backgroundColor: 'var(--navy-900)', color: 'white' }}
                  >
                    {label}
                  </span>
                  <p className="text-sm" style={{ color: 'var(--navy-500)' }}>{period}</p>
                </div>

                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-700)' }}>{body}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {skills.map((skill: string) => (
                    <li key={skill} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-600)' }} />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{skill}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="pl-4 pt-5 mt-auto border-t"
                  style={{ borderLeft: '4px solid var(--navy-900)', borderTop: 'none' }}
                >
                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--navy-800)' }}>
                    {connection}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S3: 비전·미션 */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
              Vision
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              무엇을 만드는 회사인가
            </h2>
            <div
              className="max-w-2xl mx-auto p-8 mb-8"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
                "병원·기업·기관의 데이터를
                <br />
                실행 가능한 시스템으로 바꾸는 회사"
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--navy-300)' }}>
                LS컨설팅은 AI 분석으로 문제를 진단하고, 컨설팅으로 전략을 설계하고,
                자체 개발 역량으로 시스템을 만듭니다.
                한 회사가 진단·전략·실행을 끝까지 책임지는 모델 — 이것이 LS컨설팅이 만드는 차별점입니다.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {missions.map(({ n, title, body }, i) => (
              <motion.div
                key={i}
                className="p-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-3xl font-bold mb-3" style={{ color: 'rgba(255,255,255,0.12)' }}>{n}</p>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-200)' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S4: 핵심 가치 */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Core Values
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy-900)' }}>
              목표달성을 위한 4가지 원칙
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                className="p-8"
                style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S5: 보유 자산 */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              IP & Systems
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              회사 보유 자산
            </h2>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              컨설팅사가 자체 IP와 운영 시스템을 보유한 경우는 흔치 않습니다.
              <br />
              LS컨설팅은 다음을 자체 보유·운영하고 있으며, 이 자산들이 솔루션의 기반이 됩니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assets.map(({ Icon, title, body }, i) => (
              <motion.div
                key={i}
                className="p-7 bg-white"
                style={{ border: '1px solid var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Icon className="w-6 h-6 mb-4" style={{ color: 'var(--navy-700)' }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S6: 거점·운영 */}
      <section id="location" className="py-24 md:py-32 bg-white" style={{ backgroundColor: 'var(--navy-25)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Locations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              거점과 운영 방식
            </h2>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              LS컨설팅은 제주와 서울 두 거점에서 운영됩니다.
              <br />
              미팅은 화상·대면 모두 가능하며, 클라이언트 위치에 따라 유연하게 진행합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map(({ label, title, body, roles }, i) => (
              <motion.div
                key={i}
                className="p-8 md:p-10"
                style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>
                    {label}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-700)' }}>{body}</p>
                <ul className="space-y-2">
                  {roles.map((role: string) => (
                    <li key={role} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-600)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-700)' }}>{role}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S7: 연락처 */}
      <section id="contact" className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Contact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy-900)' }}>
              연락처
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contacts.map(({ Icon, label, main, sub, href, isInternal }, i) => {
              const inner = (
                <motion.div
                  className="p-8 bg-white cursor-pointer transition-all hover:shadow-md"
                  style={{ border: '1px solid var(--navy-100)' }}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} />
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{main}</p>
                  <p className="text-sm flex items-center gap-1" style={{ color: 'var(--navy-500)' }}>
                    {sub}
                    {isInternal && <ArrowRight className="w-3.5 h-3.5" />}
                  </p>
                </motion.div>
              );
              return isInternal
                ? <Link key={i} to={href}>{inner}</Link>
                : <a key={i} href={href}>{inner}</a>;
            })}
          </div>
        </div>
      </section>

      {/* S8: 리더십 (작은 영역) */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-8"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--navy-500)' }}>
              Leadership
            </p>
            <p className="text-lg font-bold" style={{ color: 'var(--navy-900)' }}>대표</p>
          </motion.div>

          <motion.div
            className="max-w-2xl p-6 flex items-center gap-6"
            style={{ border: '1px solid var(--navy-100)' }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* 이니셜 */}
            <div
              className="w-16 h-16 flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--navy-100)' }}
            >
              <span className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>이</span>
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold mb-0.5" style={{ color: 'var(--navy-900)' }}>
                {leadership.nameKo}
                <span className="text-sm font-normal ml-2" style={{ color: 'var(--navy-500)' }}>
                  {leadership.nameEn}
                </span>
                <span className="text-sm font-normal ml-2" style={{ color: 'var(--navy-500)' }}>
                  · {leadership.role}
                </span>
              </p>
              <p className="text-sm mb-3" style={{ color: 'var(--navy-600)' }}>
                {leadership.oneLineIntro}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {leadership.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="text-xs px-2 py-0.5 font-medium"
                    style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-600)', border: '1px solid var(--navy-100)' }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mt-4 text-sm max-w-2xl"
            style={{ color: 'var(--navy-500)' }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {leadership.closingNote}
          </motion.p>
        </div>
      </section>

      {/* S9: 최종 CTA */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              회사를 알았다면
              <br />
              이제 함께 만드는 단계입니다
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--navy-300)' }}>
              30년 누적 역량으로 만들어진 회사가
              <br />
              회사의 다음 단계를 함께 설계합니다.
              <br />
              60분 무료 상담으로 시작하세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all border"
                style={{ color: 'var(--navy-200)', borderColor: 'var(--navy-600)' }}
              >
                5대 솔루션 보기
              </Link>
            </div>

            <p className="text-sm" style={{ color: 'var(--navy-400)' }}>
              의료기관{' '}
              <Link to="/healthcare" className="underline transition-colors hover:text-white" style={{ color: 'var(--navy-300)' }}>
                /healthcare
              </Link>
              {' '}|{' '}
              기업분야{' '}
              <Link to="/business" className="underline transition-colors hover:text-white" style={{ color: 'var(--navy-300)' }}>
                /business
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
