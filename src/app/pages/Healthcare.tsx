import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Building2, Activity, Cpu, LineChart, Workflow, Globe, Code2, Compass,
  ArrowRight, Check, ChevronDown,
} from 'lucide-react';
import { SEO } from '../components/SEO';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const visitorTypes = [
  {
    Icon: Building2,
    stage: 'Stage 01',
    title: '개원 준비 중입니다',
    body: '입지 분석부터 인허가, 인력, 초기 홍보, 1년 안정화까지 개원의 모든 단계가 막막한 시점입니다. 10개+ 암 요양·한방병원 개원을 자문해 온 풀 사이클 컨설팅을 제공합니다.',
    keywords: ['입지 분석', '인허가·인력', '초기 홍보', '1년 안정화'],
    cta: '개원 컨설팅 보기',
    anchor: '#opening',
    isPrimary: false,
  },
  {
    Icon: Activity,
    stage: 'Stage 02 · 가장 많은 문의',
    title: '운영 중인데 환자 유입이 줄고 있습니다',
    body: '블로그·광고비는 늘어나는데 신환은 줄어들고, 콘텐츠를 올려도 어떤 키워드가 환자를 데려오는지 모르는 시점입니다. 자체 AI 분석 시스템 기반의 데이터 중심 PR·콘텐츠 운영을 제공합니다.',
    keywords: ['환자 트렌드 분석', '블로그·쇼츠 운영', 'KPI 모델 설계', '임직원 Action Plan'],
    cta: 'PR & 콘텐츠 패키지 보기',
    anchor: '#pr',
    isPrimary: true,
  },
  {
    Icon: Cpu,
    stage: 'Stage 03',
    title: 'AI·디지털 시스템을 구축하고 싶습니다',
    body: '환자 관리·진료 기록·식이 관리가 엑셀과 종이로 굴러가거나, 홈페이지·앱이 너무 오래되어 AI 시대에 맞춰 전환이 필요한 시점입니다. 7년 자체 SaaS 개발 노하우로 의료기관 맞춤 시스템을 구축합니다.',
    keywords: ['병원 SaaS 개발', 'AI 챗봇 통합', '환자 앱 구축', 'AI 검색 최적화'],
    cta: '4대 AI 솔루션 보기',
    anchor: '#solutions',
    isPrimary: false,
  },
] as const;

const medicalAssets = [
  {
    label: 'Live Now · 지금 작동 중',
    title: 'AI 암상담 시스템',
    body: 'Claude 기반 RAG 아키텍처로 구축한 의료 상담 AI입니다. 자체 분석 데이터를 토대로 환자와 보호자의 질문에 24시간 답변합니다. 한국 의료체계(산정특례·건강보험·요양급여)까지 현실적으로 반영합니다.',
    meta: [
      '적용 기술: Claude API · RAG · pgvector',
      '서비스 위치: lsconsulting.co.kr',
      '구축 기간: 2025',
    ],
    cta: { label: '직접 체험하기', to: '/consult' },
  },
  {
    label: '7년 자체 개발 · 2026년 6월 런칭',
    title: '헬스케어 통합 SaaS',
    body: '병원 운영자용 시스템(해피케어)과 환자·보호자 앱(해피라이프)이 연동되는 통합 플랫폼. AI 식단 추천, 12개 카테고리 건강 모니터링, KPI 자동 산출까지 한 시스템에서 작동합니다.',
    meta: [
      '구성: 해피케어 (병원용) + 해피라이프 (환자용)',
      '적용 기술: React/Vite/TS · Supabase · Vercel',
      '개발 기간: 2019 - 현재',
    ],
    cta: { label: '자세히 보기', to: '#happylifecare' },
  },
  {
    label: '매월 자동 발행 · 누적 15,000건+',
    title: '13개 축 환자 데이터 분석',
    body: '누적 15,000건 이상의 실제 환자 데이터를 13개 축으로 분류하는 자체 시스템. Claude API와 자체 분류 파이프라인으로 매월 분석 리포트를 자동 생성합니다.',
    meta: [
      '분석 축: 시점·암종·성별·연령·병기 등 13개',
      '발행 리포트: 간암·폐암 (확장 중)',
      '데이터 누적: 15,000건 이상',
    ],
    cta: { label: '최신 리포트 보기', to: '/insights' },
  },
] as const;

const healthcareSolutions = [
  {
    Icon: LineChart,
    typeLabel: '프로젝트 · 4-6주',
    titleKo: 'AI 시장 진단 (의료)',
    body: '자체 AI 시스템으로 환자·시장·경쟁 병원을 13개 축으로 분석합니다. 추정이 아닌 15,000건+ 누적 데이터로 진단합니다.',
    examples: [
      '신환 유입 채널 분석 (네이버·구글·추천)',
      '경쟁 병원 포지셔닝 진단',
      '환자 이탈 패턴·재진 가능성 분석',
    ],
    meta: '시작 가격 ₩5,000,000부터 (VAT 별도)',
  },
  {
    Icon: Workflow,
    typeLabel: '구축 + 운영 · 4-6주 + 지속',
    titleKo: 'AI 업무 자동화 (의료)',
    body: '환자 응대·내부 보고·콘텐츠 발행 등의 반복 업무를 AI 자동화 시스템으로 전환합니다. 의료광고심의·환자 데이터 보호 환경에 맞춰 설계합니다.',
    examples: [
      '환자 문의 자동 분류 + 상담사 자동 배정',
      '매일 환자 KPI 자동 집계 → 원장 카톡 자동 보고',
      '의료광고심의 신청 자동화 (사전 검수 + 자동 제출)',
    ],
    meta: '구축 4-6주 · ₩8,000,000부터 + 월 ₩500,000부터 (VAT 별도)',
  },
  {
    Icon: Globe,
    typeLabel: '프로젝트 · 4-8주',
    titleKo: 'AI 최적화 웹·앱 구축',
    body: '병원 홈페이지가 단순 회사 소개 자료에 머물면 안 됩니다. AI 검색에 노출되고, AI가 1차 상담을 응대하며, 한국 의료광고심의를 통과한 자산이 되어야 합니다.',
    examples: [
      '의료광고심의 통과 가능한 사이트 구축',
      'AI 환자 상담 챗봇 통합 (의료 컨텍스트)',
      '네이버 의료 SEO + AI 검색 최적화',
    ],
    meta: '시작 가격 ₩15,000,000부터 (VAT 별도)',
  },
  {
    Icon: Code2,
    typeLabel: '프로젝트 · 8-16주',
    titleKo: '의료기관 맞춤 시스템',
    body: '7년간 헬스케어 SaaS를 직접 개발·운영해 온 노하우로, 병원 고유 워크플로우에 맞춘 시스템을 만듭니다. 의료법·개인정보보호법 환경에 맞춰 설계합니다.',
    examples: [
      '환자 관리·진료 기록·식이 관리 통합',
      '입원 환자 추적·KPI 자동 산출',
      '한방·양방 통합 관리 시스템',
    ],
    meta: '시작 가격 ₩50,000,000부터 (VAT 별도)',
  },
  {
    Icon: Compass,
    typeLabel: '월 정액 · 6개월~',
    titleKo: '의료 AI 전략 컨설팅',
    body: '사내 AI 전담 인력을 두기 전, 의료 현장을 가장 깊이 아는 외부 전문가가 함께 설계합니다. 매월 정기 미팅, 자체 AI 분석 리포트, AI 도구 도입 가이드를 제공합니다.',
    examples: [
      '병원 AI 도입 단계별 로드맵',
      '의료 AI 도구(왓슨·뷰노 등) 도입 자문',
      '의료 데이터 활용 전략 설계',
    ],
    meta: '월 정액 ₩5,000,000부터 (VAT 별도)',
  },
] as const;

const prTiers = [
  {
    label: 'Basic',
    price: '₩1,500,000',
    priceUnit: '/ 월',
    description: '콘텐츠를 시작하려는 병원을 위한 전략 기반 실행 패키지',
    items: [
      '월 20건 블로그 포스팅',
      '월 10건 유튜브 쇼츠',
      '월 1회 환자 트렌드 리포트',
    ],
    isPrimary: false,
  },
  {
    label: 'Strategic · Most Selected',
    price: '₩3,000,000',
    priceUnit: '/ 월',
    description: '전략과 실행을 통합해 병원을 시스템으로 전환하는 플랜',
    items: [
      '월 60건 블로그 포스팅',
      '월 20건 유튜브 쇼츠',
      '월 2회 환자 트렌드 리포트',
      '주 3회 임직원 Action Plan',
      '주 1회 의료서비스 강화 KPI 모델 설계',
    ],
    isPrimary: true,
  },
] as const;

const healthcareWebBundle = {
  categoryLabel: 'Healthcare Bundle · 의료기관 한정 패키지',
  categorySubLabel: 'PR 패키지와 함께 자주 진행되는 패키지입니다',
  topLabel: 'Most Requested by Hospitals',
  title: 'AI 최적화 의료 웹사이트',
  subtitle: '의료광고심의 통과 + AI 챗봇 + 네이버 의료 SEO를 한 번에',
  pricing: {
    original: '₩15,000,000',
    discounted: '₩10,000,000',
    discountLabel: '의료기관 한정 33% 할인',
    discountBadge: '33% OFF',
    note: '(VAT 별도)',
  },
  rationale: {
    question: '왜 의료기관만 할인되나요?',
    answer: '5개+ 의료기관 사이트 구축 경험으로 의료광고심의 통과 패턴이 표준화되어 있습니다. 일반 산업 사이트 대비 작업 효율이 30% 높아, 그 효율을 의료기관 클라이언트에게 돌려드립니다.',
  },
  items: [
    '의료광고심의 통과 가능 사이트 구조',
    'AI 환자 상담 챗봇 통합 (Claude API 기반)',
    '네이버 의료 SEO + AI 검색 최적화',
    '모바일 반응형 + 접근성 가이드 준수',
    '6개월 운영 모니터링 포함',
  ],
  meta: {
    duration: '4-8주',
    type: '1회 프로젝트',
    limit: '월 2건 한정',
    program: '2026 의료 파트너 프로그램',
  },
  cta: {
    primary: '이 패키지 상담하기',
    primaryTo: '/consultation?package=healthcare-web',
    note: '상담 시 의료기관 인증 확인 후 할인가 적용됩니다',
  },
} as const;

const openingSteps = [
  { title: '입지 및 상권 분석', body: '자체 AI 시스템으로 잠재 환자 분포·경쟁 병원 진단' },
  { title: '병원 포지셔닝 설계', body: '차별점 도출 + 콘셉트 + 디자인 가이드라인' },
  { title: '서비스 모델 설계', body: '입원·외래·식이·한방 등 운영 시나리오' },
  { title: '인허가·인력·장비 자문', body: '의료법인 설립부터 채용까지' },
  { title: '초기 홍보 전략', body: '오픈 전 3개월 + 오픈 후 6개월 콘텐츠 계획' },
  { title: '운영 구조 설계 + KPI 시스템', body: '환자 입원·퇴원·재진 KPI 자동화' },
] as const;

const workSteps = [
  { n: '01', label: 'Diagnose', title: '진단', body: '자체 AI 시스템으로 병원·환자·시장을 13개 축으로 분석합니다. 추정이 아닌 15,000건+ 데이터로 시작합니다.' },
  { n: '02', label: 'Design', title: '설계', body: '진단 결과를 토대로 병원 운영·콘텐츠·시스템 구조를 설계합니다. 동작하는 프로토타입으로 보여드립니다.' },
  { n: '03', label: 'Build', title: '구축', body: '직접 만듭니다. 외주 단계가 없으니 의료 컨텍스트가 그대로 결과물에 반영됩니다.' },
  { n: '04', label: 'Operate', title: '운영', body: 'KPI를 측정하고 개선합니다. 환자 입원·퇴원·재진 사이클을 끝까지 함께합니다.' },
] as const;

const faqs = [
  {
    q: '다른 광고대행사와 무엇이 다른가요?',
    a: '일반 광고대행사는 콘텐츠 양과 광고비 집행으로 답합니다. LS컨설팅은 매월 자체 AI 시스템으로 환자 트렌드를 분석하고, 그 결과를 토대로 콘텐츠를 설계합니다. 콘텐츠 양이 같아도 환자 유입 효율이 다른 이유입니다.',
  },
  {
    q: '의료광고심의는 어떻게 처리하나요?',
    a: '모든 콘텐츠와 사이트는 의료광고심의를 통과 가능한 형태로 작성합니다. 직접 심의 신청·통과까지 자문해 드리고, 통과 이력이 있는 회사라 반려 위험이 낮습니다.',
  },
  {
    q: '우리 병원 환자 데이터를 안전하게 다루실 수 있나요?',
    a: '7년간 의료 데이터를 다뤄왔습니다. 의료법·개인정보보호법 환경에서 운영해 온 노하우가 있고, 자체 SaaS(해피라이프케어)도 같은 규제 환경에서 개발됐습니다. 데이터 처리·보관·삭제 전 과정의 보안 정책을 별도 협약서로 명문화합니다.',
  },
  {
    q: '개원 전인데 PR 패키지부터 시작 가능한가요?',
    a: '개원 컨설팅 안에 초기 홍보 전략이 포함되어 있어, 개원 컨설팅으로 시작해 자연스럽게 PR 패키지로 연결되는 게 일반적입니다. 단, 개원만 단독으로 의뢰하시는 경우도 가능합니다.',
  },
  {
    q: '우리 병원에 맞춤 시스템을 만들고 싶은데, 가능한가요?',
    a: '가능합니다. 7년간 자체 SaaS(해피라이프케어)를 개발·운영해 왔습니다. 환자 관리, 진료 기록, 식이 관리, KPI 산출 등 병원 워크플로우에 맞춘 시스템 구축이 주력 영역입니다.',
  },
  {
    q: '결제는 어떻게 진행되나요?',
    a: '월 정액 패키지(PR·컨설팅)는 매월 정기 결제, 프로젝트(개원·시스템 개발)는 계약금(30%) + 중간(40%) + 잔금(30%) 분할 결제입니다. 6개월 단위 약정 또는 별도 약정 모두 가능합니다.',
  },
] as const;

export function Healthcare() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="의료분야 - LS컨설팅"
        description="암 요양·한방병원 15년 현장 경험과 7년 자체 헬스케어 SaaS 개발 노하우로, 의료기관의 디지털 전환·PR·개원 컨설팅을 제공합니다. AI 암상담·해피라이프케어·자체 분석 시스템 운영 중."
        url="https://www.lsconsulting.co.kr/healthcare"
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
              For Healthcare
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: 'var(--navy-900)' }}>
              의료 현장을 가장 깊이 아는
              <br />
              AI 솔루션 파트너
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: 'var(--navy-600)' }}>
              암 요양·한방병원 15년 현장 경험,
              <br />
              7년간 자체 개발한 헬스케어 SaaS,
              <br />
              누적 15,000건+의 환자 데이터를 분석하는 자체 AI 시스템.
              <br />
              의료기관에 필요한 모든 것을 한 회사가 만듭니다.
            </p>
            <p className="text-sm mb-10" style={{ color: 'var(--navy-400)' }}>
              암 요양병원 · 한방병원 · 의원 · 헬스케어 스타트업 대상
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all border-2"
                style={{ color: 'var(--navy-900)', borderColor: 'var(--navy-900)', backgroundColor: 'var(--navy-50)' }}
              >
                AI 암상담 직접 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S2: 방문자 유형 분기 */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
              어떤 단계의 의료기관이신가요
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              개원 준비, 운영 중, 디지털 전환 — 단계마다 필요한 도움이 다릅니다.
              <br />
              현재 단계에 맞는 영역을 먼저 살펴보시면 됩니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {visitorTypes.map(({ Icon, stage, title, body, keywords, cta, anchor, isPrimary }, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white flex flex-col"
                style={{
                  border: isPrimary ? '2px solid var(--navy-900)' : '1px solid var(--navy-100)',
                }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: isPrimary ? 'var(--navy-900)' : 'var(--navy-50)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: isPrimary ? 'white' : 'var(--navy-700)' }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: isPrimary ? 'var(--navy-900)' : 'var(--navy-500)' }}>
                    {stage}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--navy-600)' }}>
                  {body}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-xs px-2.5 py-1 font-medium"
                      style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <a
                  href={anchor}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: 'var(--navy-900)' }}
                >
                  {cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S3: 현재 운영 중인 솔루션 */}
      <section className="py-24 md:py-32 bg-white" style={{ backgroundColor: 'var(--navy-25)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              What We've Built
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              현재 운영 중인 솔루션
            </h2>
            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              AI에 대한 가능성과 이론은 어디에서나 들을 수 있습니다.
              <br />
              LS컨설팅은 이미 만들어 의료 현장에서 작동시키고 있는 자산으로 이야기합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {medicalAssets.map(({ label, title, body, meta, cta }, i) => (
              <motion.div
                key={i}
                className="p-8 flex flex-col border"
                style={{ borderColor: 'var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span
                  className="inline-block text-xs font-semibold mb-5 px-2.5 py-1 self-start"
                  style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}
                >
                  {label}
                </span>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--navy-600)' }}>
                  {body}
                </p>
                <ul
                  className="space-y-1.5 mb-6 pt-5 border-t"
                  style={{ borderColor: 'var(--navy-100)' }}
                >
                  {meta.map((m) => (
                    <li key={m} className="text-xs" style={{ color: 'var(--navy-500)' }}>
                      {m}
                    </li>
                  ))}
                </ul>
                <Link
                  to={cta.to}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline"
                  style={{ color: 'var(--navy-900)' }}
                >
                  {cta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S4: 4대 AI 솔루션 (의료 컨텍스트) */}
      <section id="solutions" className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              AI Solutions for Healthcare
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              의료기관에 적용되는 5가지 AI 솔루션
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              5대 솔루션은 산업과 무관한 본질이지만, 의료기관에서는 다음과 같이 적용됩니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthcareSolutions.map(({ Icon, typeLabel, titleKo, body, examples, meta }, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white flex flex-col border"
                style={{ borderColor: 'var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-50)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--navy-500)' }}>
                    {typeLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                  {titleKo}
                </h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--navy-600)' }}>
                  {body}
                </p>

                <div className="mb-5">
                  <p className="text-xs font-semibold mb-3" style={{ color: 'var(--navy-500)' }}>
                    의료 적용 예시
                  </p>
                  <ul className="space-y-2">
                    {examples.map((ex: string) => (
                      <li key={ex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-600)' }} />
                        <span className="text-sm" style={{ color: 'var(--navy-700)' }}>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p
                  className="text-xs pt-4 border-t"
                  style={{ color: 'var(--navy-400)', borderColor: 'var(--navy-100)' }}
                >
                  {meta}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
              style={{ color: 'var(--navy-700)' }}
            >
              솔루션 전체 안내 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* S5: 병원 PR & 콘텐츠 운영 */}
      <section id="pr" className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--navy-500)' }}>
              Healthcare-Specialized Package 01
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              데이터 중심 병원 PR & 콘텐츠 운영
            </h2>
            <p className="text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              일반적인 콘텐츠 대행은 콘텐츠 양으로 답합니다.
              LS컨설팅은 매월 자체 AI 시스템으로 환자 트렌드를 분석하고,
              그 결과를 토대로 콘텐츠와 운영을 함께 설계합니다.
              데이터 없는 콘텐츠 대행이 아닌, 분석에서 출발하는 통합 운영입니다.
            </p>
          </motion.div>

          {/* PR 패키지 2-tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {prTiers.map(({ label, price, priceUnit, description, items, isPrimary }, i) => (
              <motion.div
                key={i}
                className="p-8 flex flex-col relative"
                style={{
                  border: isPrimary ? '2px solid var(--navy-900)' : '1px solid var(--navy-100)',
                  backgroundColor: 'white',
                }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {isPrimary && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div
                      className="px-4 py-1 text-xs font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: 'var(--navy-900)' }}
                    >
                      Most Selected
                    </div>
                  </div>
                )}

                <p className="text-sm font-semibold mb-4" style={{ color: 'var(--navy-700)' }}>
                  {label}
                </p>
                <div className="mb-2">
                  <span className="text-3xl font-bold" style={{ color: 'var(--navy-900)' }}>
                    {price}
                  </span>
                  {priceUnit && (
                    <span className="text-sm ml-1" style={{ color: 'var(--navy-500)' }}>
                      {priceUnit}
                    </span>
                  )}
                </div>
                <p className="text-xs mb-1" style={{ color: 'var(--navy-400)' }}>
                  VAT 별도
                </p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--navy-600)' }}>
                  {description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {items.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-700)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
                  style={
                    isPrimary
                      ? { backgroundColor: 'var(--navy-900)', color: 'white' }
                      : { backgroundColor: 'var(--navy-50)', color: 'var(--navy-900)', border: '1px solid var(--navy-200)' }
                  }
                >
                  상담/견적 신청
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Healthcare Bundle 카드 */}
          <motion.div
            className="mb-4"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--navy-700)' }}>
              {healthcareWebBundle.categoryLabel}
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--navy-500)' }}>
              {healthcareWebBundle.categorySubLabel}
            </p>
          </motion.div>

          <motion.div
            className="p-8 md:p-12"
            style={{ backgroundColor: 'var(--navy-900)' }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* 좌측: 아이콘 + 메타 */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-300)' }}>
                    Healthcare Bundle
                  </p>
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <Globe className="w-7 h-7" style={{ color: 'var(--navy-300)' }} />
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'var(--navy-300)' }}>
                    {healthcareWebBundle.meta.program}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--navy-400)' }}>
                    {healthcareWebBundle.meta.limit}
                  </p>
                </div>

                <div
                  className="mt-8 pt-6 border-t flex gap-6"
                  style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  {[
                    { label: '기간', value: healthcareWebBundle.meta.duration },
                    { label: '형태', value: healthcareWebBundle.meta.type },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--navy-400)' }}>{label}</p>
                      <p className="text-sm font-semibold" style={{ color: 'var(--navy-200)' }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 우측: 콘텐츠 */}
              <div className="lg:col-span-3">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p className="text-xs font-semibold" style={{ color: 'var(--navy-300)' }}>
                    {healthcareWebBundle.topLabel}
                  </p>
                  <span
                    className="text-xs font-bold px-3 py-1 whitespace-nowrap"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
                  >
                    {healthcareWebBundle.pricing.discountBadge}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {healthcareWebBundle.title}
                </h3>
                <p className="text-base mb-6" style={{ color: 'var(--navy-200)' }}>
                  {healthcareWebBundle.subtitle}
                </p>

                {/* 가격 */}
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl line-through" style={{ color: 'var(--navy-400)' }}>
                    {healthcareWebBundle.pricing.original}
                  </span>
                  <ArrowRight className="w-4 h-4" style={{ color: 'var(--navy-400)' }} />
                  <span className="text-4xl font-bold text-white">
                    {healthcareWebBundle.pricing.discounted}
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: 'var(--navy-400)' }}>
                  {healthcareWebBundle.pricing.note}
                </p>
                <p className="text-sm font-semibold mb-7" style={{ color: 'var(--navy-300)' }}>
                  {healthcareWebBundle.pricing.discountLabel}
                </p>

                {/* 할인 사유 */}
                <div
                  className="pl-4 mb-7"
                  style={{ borderLeft: '2px solid var(--navy-500)' }}
                >
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--navy-300)' }}>
                    {healthcareWebBundle.rationale.question}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-300)' }}>
                    {healthcareWebBundle.rationale.answer}
                  </p>
                </div>

                {/* 포함 항목 */}
                <ul className="space-y-2.5 mb-8">
                  {healthcareWebBundle.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-white" />
                      <span className="text-sm" style={{ color: 'var(--navy-200)' }}>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={healthcareWebBundle.cta.primaryTo}
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold transition-all hover:opacity-90"
                  style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
                >
                  <span>{healthcareWebBundle.cta.primary}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-xs mt-3" style={{ color: 'var(--navy-400)' }}>
                  {healthcareWebBundle.cta.note}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S6: 병원 개원 컨설팅 */}
      <section id="opening" className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-14"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--navy-500)' }}>
              Healthcare-Specialized Package 02
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              병원 개원 컨설팅
            </h2>
            <p className="text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              10개+ 암 요양·한방병원 개원 자문 경험.
              입지 분석부터 1년 안정화까지 풀 사이클을 동반합니다.
              개원 후 자연스럽게 PR 패키지로 연결되는 통합 모델입니다.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-8 md:p-12"
            style={{ border: '1px solid var(--navy-100)' }}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {/* 좌측 */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'var(--navy-50)' }}
                  >
                    <Building2 className="w-7 h-7" style={{ color: 'var(--navy-700)' }} />
                  </div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--navy-500)' }}>
                    프로젝트 · 6개월~
                  </p>
                  <div className="text-3xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                    ₩30,000,000
                  </div>
                  <p className="text-sm" style={{ color: 'var(--navy-400)' }}>
                    부터 (VAT 별도)
                  </p>
                </div>

                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: 'var(--navy-100)' }}
                >
                  <p className="text-xs leading-relaxed mb-1" style={{ color: 'var(--navy-500)' }}>
                    오픈 전 3개월 (입지·포지셔닝·인허가)
                  </p>
                  <p className="text-xs leading-relaxed mb-1" style={{ color: 'var(--navy-500)' }}>
                    오픈 후 3개월 (안정화·KPI 측정)
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--navy-500)' }}>
                    이후 PR 패키지로 자연 연결 가능
                  </p>
                </div>
              </div>

              {/* 우측 */}
              <div className="md:col-span-3">
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                  개원부터 안정화까지
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--navy-600)' }}>
                  개원은 한 번의 결정이 1-2년의 결과를 만듭니다.
                  입지·인허가·인력·운영·홍보가 한 줄로 연결되어야
                  첫 1년이 안정적으로 굴러갑니다.
                </p>

                <ul className="space-y-4 mb-8">
                  {openingSteps.map(({ title, body }, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-700)' }} />
                      <div>
                        <span className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>
                          {title}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--navy-500)' }}>
                          {' '}— {body}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <span>개원 상담/견적 신청</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S7: 한 팀이 한 호흡으로 */}
      <section className="py-24 md:py-32 bg-white" style={{ backgroundColor: 'var(--navy-25)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              How We Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              한 팀이 한 호흡으로 갑니다
            </h2>
            <p className="text-lg max-w-3xl leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              진단 회사 따로, 컨설팅 회사 따로, 개발사 따로가 아닙니다.
              <br />
              첫 미팅의 사람이 마지막 결과물까지 함께합니다.
              <br />
              의료는 정보 손실이 클수록 위험이 큰 분야입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map(({ n, label, title, body }, i) => (
              <motion.div
                key={i}
                className="p-7 border"
                style={{ borderColor: 'var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold mb-1" style={{ color: 'var(--navy-100)' }}>{n}</p>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--navy-400)' }}>
                  {label}
                </p>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S8: FAQ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-14"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--navy-900)' }}>
                자주 묻는 질문
              </h2>
            </motion.div>

            <div className="space-y-2">
              {faqs.map(({ q, a }, i) => (
                <motion.div
                  key={i}
                  className="bg-white border"
                  style={{ borderColor: 'var(--navy-100)' }}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-base font-semibold pr-4" style={{ color: 'var(--navy-900)' }}>
                      {q}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 transition-transform"
                      style={{
                        color: 'var(--navy-500)',
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-7 pb-6">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                        {a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
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
              병원의 단계와 상황에 맞는
              <br />
              가장 적합한 옵션을 함께 찾습니다
            </h2>
            <p className="text-lg mb-4 max-w-2xl mx-auto" style={{ color: 'var(--navy-300)' }}>
              개원 준비, 운영 중 PR, 디지털 전환 — 어느 단계든 60분 무료 상담으로 시작합니다.
              <br />
              병원 상황을 듣고 가장 적합한 옵션과 시작 시점을 함께 정합니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-sm" style={{ color: 'var(--navy-400)' }}>
              <span>60분 화상 또는 대면 미팅</span>
              <span className="hidden sm:block">·</span>
              <span>사전 자료 제출 불필요</span>
              <span className="hidden sm:block">·</span>
              <span>상담 후 24시간 내 맞춤 제안서</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all border"
                style={{ color: 'var(--navy-200)', borderColor: 'var(--navy-600)' }}
              >
                AI 암상담 먼저 체험하기
              </Link>
            </div>

            <p className="text-sm" style={{ color: 'var(--navy-400)' }}>
              의료기관이 아니신가요?{' '}
              <Link
                to="/business"
                className="transition-colors hover:text-white underline"
                style={{ color: 'var(--navy-300)' }}
              >
                기업분야 페이지에서 같은 솔루션을 기업 관점으로 보실 수 있습니다
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
