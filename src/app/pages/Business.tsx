import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  LineChart, Workflow, Globe, Code2, Compass, Briefcase, Check, ChevronDown, ArrowRight,
  Shield, Sparkles, GraduationCap, ShoppingBag, Building, Wrench, Star, Trophy,
} from 'lucide-react';
import { SEO } from '../components/SEO';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const medicalToBusinessBridges = [
  {
    Icon: Shield,
    medicalContext: '환자 데이터·생사와 직결된 의사결정',
    businessContext: '고객 이탈·매출 예측·운영 자동화',
    insight: '정확도 기준이 가장 높은 의료에서 검증된 AI가 일반 비즈니스에서 더 안정적으로 작동합니다.',
  },
  {
    Icon: Trophy,
    medicalContext: '수십 명 규모 병원 이해관계자 조율',
    businessContext: '경영진·현장팀·IT 사이의 AI 도입 조율',
    insight: '의료 현장의 복잡한 이해관계를 다뤄온 경험이 기업 내부 조율을 더 매끄럽게 만듭니다.',
  },
  {
    Icon: Star,
    medicalContext: '암 환자 여정 데이터 분석·세그먼트',
    businessContext: '고객 구매 여정 분석·타깃 세그먼트',
    insight: '환자를 이해하는 방법론이 고객을 이해하는 방법론과 구조적으로 동일합니다.',
  },
  {
    Icon: Sparkles,
    medicalContext: '진료 프로세스 자동화·AI 알림 시스템',
    businessContext: '반복 업무 자동화·AI 기반 운영 시스템',
    insight: '의료 수준의 프로세스 설계가 일반 기업 운영 효율화에 즉시 적용됩니다.',
  },
] as const;

const businessSolutions = [
  {
    Icon: LineChart,
    en: 'AI Market Diagnosis',
    ko: 'AI 시장 진단',
    description: '귀사의 업종·규모에 맞춘 AI 도입 가능성 진단. 어디서 시작해야 할지 모르는 기업에게 가장 먼저 권장합니다.',
    outcome: '도입 우선순위 로드맵 + ROI 예상 범위',
    price: '₩5,000,000부터',
    duration: '1회 프로젝트',
  },
  {
    Icon: Workflow,
    en: 'AI Workflow Automation',
    ko: 'AI 업무 자동화 (기업)',
    description: '회사의 반복 업무를 AI 자동화 시스템으로 전환합니다. 엑셀·카톡·이메일로 굴러가던 운영을 자동화 도구 + Claude AI 결합으로 시스템화합니다.',
    outcome: '반복 업무 자동화 + 운영 모니터링',
    price: '₩8,000,000부터 + ₩500,000/월부터',
    duration: '구축 4–6주 + 운영',
  },
  {
    Icon: Globe,
    en: 'AI-Optimized Web & App',
    ko: 'AI 최적화 웹·앱 구축',
    description: 'AI 기능이 내재된 비즈니스 웹·앱 개발. 단순 사이트가 아닌, 데이터를 수집하고 자동화가 가능한 구조로 설계합니다.',
    outcome: '운영 가능한 AI 통합 웹·앱 서비스',
    price: '₩15,000,000부터',
    duration: '4–8주',
    highlight: true,
  },
  {
    Icon: Code2,
    en: 'Custom SaaS & System',
    ko: '맞춤 SaaS · 시스템 개발',
    description: '반복 업무를 자동화하는 내부 시스템 또는 외부에 판매 가능한 SaaS 제품 개발. 의료 SaaS 개발 경험을 일반 산업에 적용합니다.',
    outcome: '운영 가능한 SaaS 또는 내부 자동화 시스템',
    price: '₩50,000,000부터',
    duration: '8–16주',
  },
  {
    Icon: Compass,
    en: 'AI Strategy Consulting',
    ko: 'AI 전략 컨설팅',
    description: '월 단위 AI 전략 파트너. 단발 프로젝트가 아닌 지속적인 AI 내재화를 원하는 기업을 위한 장기 파트너십입니다.',
    outcome: '월별 전략 보고 + 실행 지원',
    price: '₩5,000,000 / 월',
    duration: '6개월~',
  },
] as const;

const industryScenarios = [
  {
    Icon: ShoppingBag,
    industry: '이커머스 · 리테일',
    scenario: '구매 데이터를 분석해 재구매율을 높이고 싶은데, 어디서 시작해야 할지 모릅니다.',
    solution: 'AI 시장 진단 → AI 업무 자동화 → 고객 세그먼트 분석 시스템 구축',
  },
  {
    Icon: Building,
    industry: '부동산 · 건설',
    scenario: '분양 문의 고객 데이터가 쌓이고 있는데, 이를 영업에 활용할 AI 시스템이 필요합니다.',
    solution: '고객 여정 분석 + AI 리드 스코어링 SaaS 개발',
  },
  {
    Icon: GraduationCap,
    industry: '교육 · 에듀테크',
    scenario: '수강생 이탈률이 높습니다. 이탈 예측 모델과 개인화 학습 경로 추천이 필요합니다.',
    solution: '학습 데이터 분석 + AI 이탈 예측 및 추천 시스템',
  },
  {
    Icon: Wrench,
    industry: '제조 · B2B',
    scenario: '영업 사원 없이도 B2B 고객이 필요한 정보를 얻고 견적을 받을 수 있는 플랫폼이 필요합니다.',
    solution: 'AI 기반 B2B 셀프서비스 웹 플랫폼 구축 + 업무 자동화',
  },
  {
    Icon: Briefcase,
    industry: '전문직 · 서비스업',
    scenario: '반복 상담 업무의 70%를 자동화하고, 고부가 업무에만 집중하고 싶습니다.',
    solution: 'AI 상담 자동화 시스템 + 업무 자동화 + 내부 지식 베이스 구축',
  },
  {
    Icon: Globe,
    industry: '스타트업 · 초기 기업',
    scenario: 'MVP는 있지만 AI로 차별화된 제품을 만들고 싶고, 투자자에게 보여줄 수 있는 결과가 필요합니다.',
    solution: 'AI 기능 통합 MVP 고도화 + 성과 지표 설계',
  },
] as const;

const workSteps = [
  {
    n: '01',
    label: 'Diagnose',
    title: '진단',
    desc: '현재 업무 프로세스와 데이터 현황을 파악합니다. AI가 실제로 효과를 낼 수 있는 지점을 식별합니다.',
  },
  {
    n: '02',
    label: 'Design',
    title: '설계',
    desc: '진단 결과를 바탕으로 구체적인 AI 솔루션 구조와 예상 ROI를 설계합니다. 실행 로드맵을 함께 확정합니다.',
  },
  {
    n: '03',
    label: 'Build',
    title: '구축',
    desc: '설계된 시스템을 실제로 개발하고 운영 환경에 배포합니다. 내부 팀이 쓸 수 있도록 온보딩까지 지원합니다.',
  },
  {
    n: '04',
    label: 'Optimize',
    title: '고도화',
    desc: '운영 데이터를 기반으로 지속적으로 개선합니다. 필요에 따라 전략 컨설팅으로 전환해 장기 파트너십을 이어갑니다.',
  },
] as const;

const earlyPartnerPromises = [
  '의료 분야에서 축적한 AI 실행 방법론을 귀사 업종에 직접 적용',
  '성과 사례 공동 개발 — 결과물이 양측의 레퍼런스가 됩니다',
  '초기 파트너 우선 가격 및 지속 파트너십 조건 협의 가능',
  '프로젝트 종료 후에도 3개월 운영 모니터링 지원',
] as const;

const faqs = [
  {
    q: '의료 전문 컨설팅 회사 아닌가요? 일반 기업도 지원하나요?',
    a: '네, LS컨설팅은 의료에서 출발했지만 현재는 기업·서비스업 대상 AI 솔루션을 적극 확장하고 있습니다. 의료에서 검증한 AI 방법론은 업종을 가리지 않고 적용됩니다.',
  },
  {
    q: '우리 업종에 맞는 레퍼런스가 없으면 믿기 어렵지 않나요?',
    a: '맞습니다. 그래서 지금 초기 파트너를 모집합니다. 귀사와 함께 성과를 만들고, 그것이 레퍼런스가 됩니다. 초기 파트너에게는 그에 맞는 조건을 드립니다.',
  },
  {
    q: 'AI 도입에 예산이 얼마나 필요한가요?',
    a: '₩1,000,000 짜리 1회 진단부터 시작할 수 있습니다. 진단 결과를 보고 다음 단계를 결정하시면 됩니다. 처음부터 큰 예산이 필요하지 않습니다.',
  },
  {
    q: '내부에 개발자가 없어도 진행 가능한가요?',
    a: '가능합니다. 기획부터 개발, 운영 온보딩까지 전부 LS컨설팅이 담당합니다. 내부에서 필요한 것은 담당자 한 명과 업무 프로세스에 대한 이해뿐입니다.',
  },
  {
    q: '얼마나 빨리 결과를 볼 수 있나요?',
    a: '진단은 1–2주, 웹·앱 구축은 4–8주면 운영 가능한 결과물이 나옵니다. 복잡한 SaaS는 8–16주입니다. 단계별로 중간 결과물을 확인할 수 있습니다.',
  },
  {
    q: '프로젝트 이후 운영 지원은 어떻게 되나요?',
    a: '초기 파트너의 경우 3개월 운영 모니터링을 기본 지원합니다. 이후에는 AI 전략 컨설팅(월 정액)으로 전환해 장기 파트너십을 이어갈 수 있습니다.',
  },
] as const;

export function Business() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO
        title="기업분야 AI 솔루션 | LS컨설팅"
        description="의료에서 검증된 AI 실행력을 귀사의 비즈니스에 적용합니다. 이커머스, 제조, 교육, 스타트업 등 업종별 맞춤 AI 솔루션."
      />

      {/* S1: Hero */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="max-w-3xl"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--navy-500)' }}>
              For Business
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight" style={{ color: 'var(--navy-900)' }}>
              의료에서 만든 AI,
              <br />
              이제 귀사에 적용합니다
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-12" style={{ color: 'var(--navy-600)' }}>
              가장 엄격한 환경에서 검증된 AI 실행력입니다.
              <br />
              업종이 달라도 방법론은 동일하게 작동합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-500)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all border hover:bg-white/10"
                style={{ color: 'var(--navy-700)', borderColor: 'var(--navy-200)' }}
              >
                솔루션 전체 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S2: Medical → Business Bridge */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Why Medical Background Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              의료 경험이 왜 기업에 유리한가
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              의료에서 해결한 문제와 귀사의 문제는 구조적으로 같습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicalToBusinessBridges.map(({ Icon, medicalContext, businessContext, insight }, i) => (
              <motion.div
                key={i}
                className="p-8 border"
                style={{ borderColor: 'var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--navy-50)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} />
                </div>
                <div className="flex gap-3 mb-5 text-sm">
                  <span
                    className="px-3 py-1 font-medium"
                    style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-700)' }}
                  >
                    의료: {medicalContext}
                  </span>
                </div>
                <div className="flex gap-3 mb-5 text-sm">
                  <span
                    className="px-3 py-1 font-medium"
                    style={{ backgroundColor: 'var(--navy-900)', color: 'white' }}
                  >
                    비즈니스: {businessContext}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                  {insight}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S3: Solutions (Business Perspective) */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-25)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Solutions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              기업·기관에 적용되는 5가지 솔루션
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              진단부터 장기 파트너십까지, 귀사의 AI 성숙도에 맞게 시작하세요.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessSolutions.map(({ Icon, en, ko, description, outcome, price, duration, highlight }, i) => (
              <motion.div
                key={i}
                className="p-8 flex flex-col"
                style={{
                  backgroundColor: highlight ? 'var(--navy-900)' : 'white',
                  border: highlight ? 'none' : '1px solid var(--navy-100)',
                }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: highlight ? 'rgba(255,255,255,0.1)' : 'var(--navy-50)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: highlight ? 'white' : 'var(--navy-700)' }} />
                  </div>
                  {highlight && (
                    <span className="text-xs font-semibold px-3 py-1" style={{ backgroundColor: 'var(--navy-500)', color: 'white' }}>
                      Most Selected
                    </span>
                  )}
                </div>

                <p className="text-xs font-medium mb-1" style={{ color: highlight ? 'var(--navy-300)' : 'var(--navy-500)' }}>
                  {en}
                </p>
                <h3 className="text-xl font-bold mb-4" style={{ color: highlight ? 'white' : 'var(--navy-900)' }}>
                  {ko}
                </h3>
                <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: highlight ? 'var(--navy-300)' : 'var(--navy-600)' }}>
                  {description}
                </p>

                <div
                  className="pt-5 mt-auto border-t"
                  style={{ borderColor: highlight ? 'rgba(255,255,255,0.1)' : 'var(--navy-100)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: highlight ? 'var(--navy-300)' : 'var(--navy-500)' }}>
                      {duration}
                    </span>
                    <span className="text-lg font-bold" style={{ color: highlight ? 'white' : 'var(--navy-900)' }}>
                      {price}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: highlight ? 'var(--navy-400)' : 'var(--navy-400)' }}>
                    결과물: {outcome}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
              style={{ color: 'var(--navy-700)' }}
            >
              솔루션 상세 안내 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* S4: Industry Scenarios */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              Industry Scenarios
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              어떤 상황에서 오셨나요?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              업종별로 자주 받는 질문과 그에 맞는 솔루션입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryScenarios.map(({ Icon, industry, scenario, solution }, i) => (
              <motion.div
                key={i}
                className="p-7 border flex flex-col"
                style={{ borderColor: 'var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-50)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--navy-700)' }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--navy-700)' }}>
                    {industry}
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: 'var(--navy-600)' }}>
                  "{scenario}"
                </p>

                <div
                  className="pt-4 border-t"
                  style={{ borderColor: 'var(--navy-100)' }}
                >
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--navy-400)' }}>추천 솔루션</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>{solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S5: How We Work */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-500)' }}>
              How We Work
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              4단계 실행 프로세스
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              의료에서 만든 엄격한 프로세스를 동일하게 적용합니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map(({ n, label, title, desc }, i) => (
              <motion.div
                key={i}
                className="p-7"
                style={{ backgroundColor: 'var(--navy-50)', border: '1px solid var(--navy-100)' }}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold mb-1" style={{ color: 'rgba(10, 22, 40, 0.10)' }}>{n}</p>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--navy-500)' }}>
                  {label}
                </p>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S6: Early Partner Program */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="text-center mb-12"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-300)' }}>
                Early Partner Program
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                초기 파트너를 모집합니다
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--navy-300)' }}>
                솔직히 말씀드립니다. LS컨설팅은 의료 분야에서는 충분한 레퍼런스가 있지만,
                기업 레퍼런스는 아직 쌓는 중입니다.
                <br /><br />
                그래서 지금 초기 파트너와 함께 성과를 만들고 싶습니다.
                귀사의 결과물이 저희의 첫 번째 업종 레퍼런스가 됩니다.
              </p>
            </motion.div>

            <motion.div
              className="p-8 mb-8"
              style={{ backgroundColor: 'white', border: '1px solid var(--navy-100)' }}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
                초기 파트너에게 드리는 것
              </h3>
              <ul className="space-y-4">
                {earlyPartnerPromises.map((promise, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--navy-700)' }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>
                      {promise}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="text-center">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>초기 파트너 신청하기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* S7: FAQ */}
      <section className="py-24 md:py-32 bg-white">
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
                  className="border"
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

      {/* S8: Final CTA */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            className="text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
              어디서 시작해야 할지 모르겠다면
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--navy-600)' }}>
              AI 시장 진단부터 시작하세요.
              <br />
              방향이 잡히면 그 다음 단계를 함께 설계합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold transition-all border"
                style={{ color: 'var(--navy-900)', borderColor: 'var(--navy-200)' }}
              >
                솔루션 전체 보기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
