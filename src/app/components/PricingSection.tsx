import React from 'react';
import { Check, ArrowRight, LineChart, Workflow, Globe, Code2, Compass, Megaphone, Building2 } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const },
};

const aiSolutions = [
  {
    Icon: LineChart,
    typeLabel: '프로젝트 · 1회',
    titleEn: 'AI Market Diagnosis',
    titleKo: 'AI 시장 진단 리포트',
    price: '₩1,000,000(AI분석과 리포트)',
    priceUnit: '/ 프로젝트 (VAT 별도)',
    features: [
      '자체 AI 시스템으로 13개 축 시장 분석',
      '경쟁사 포지셔닝 진단',
      '고객 니즈·이탈 패턴 분석',
      '의사결정용 종합 리포트 (PDF + 발표)',
    ],
    description: 'AI 도입을 검토 중인 회사를 위한\n가장 가벼운 진입 옵션입니다',
    isPrimary: false,
    badge: null,
  },
  {
    Icon: Workflow,
    typeLabel: '구축 + 운영 · 4–6주 + 지속',
    titleEn: 'AI Workflow Automation',
    titleKo: 'AI 업무 자동화',
    price: '₩8,000,000 ~',
    priceUnit: '/ 구축 + 운영 (VAT 별도)',
    features: [
      '회사 워크플로우 분석 + 자동화 영역 진단',
      'n8n/Make/Zapier + Claude API 결합 구축',
      '슬랙·이메일·구글 워크스페이스·국내 SaaS 연동',
      '자동화 운영 대시보드 + 모니터링',
      '6개월 운영 모니터링 포함',
    ],
    description: '반복 업무를 시스템으로 전환합니다\n구축 후 운영까지 포함됩니다',
    isPrimary: false,
    badge: null,
  },
  {
    Icon: Globe,
    typeLabel: '프로젝트 · 4–8주',
    titleEn: 'AI-Optimized Web & App',
    titleKo: 'AI 최적화 웹·앱 구축',
    price: '₩15,000,000 ~',
    priceUnit: '/ 프로젝트 (VAT 별도)',
    features: [
      'AI 검색 노출(SEO/GEO) 최적화 설계',
      'Claude API 기반 AI 챗봇·상담 통합',
      'React/Next.js + Supabase 기반 구축',
      '한국 시장 특화 (네이버·카카오 연동)',
      '모바일 앱·PWA 옵션 추가 가능',
    ],
    description: '홈페이지가 자산이 되는 회사,\nAI가 24시간 영업하는 시스템을 만듭니다',
    isPrimary: true,
    badge: 'Most Selected',
  },
  {
    Icon: Code2,
    typeLabel: '프로젝트 · 8–16주',
    titleEn: 'Custom SaaS · System',
    titleKo: '맞춤 SaaS·시스템 개발',
    price: '₩20,000,000 ~',
    priceUnit: '/ 프로젝트 (VAT 별도)',
    features: [
      '업계 특화 SaaS 설계·구축',
      '자체 AI 분석 모듈 통합',
      '운영 대시보드·KPI 자동 산출',
      '7년 자체 SaaS 개발 노하우 적용',
    ],
    description: '기성 솔루션이 우리 회사를 못 따라올 때,\n전용 시스템을 구축해 운영합니다',
    isPrimary: false,
    badge: null,
  },
  {
    Icon: Compass,
    typeLabel: '월 정액 · 6개월~',
    titleEn: 'AI Strategy Consulting',
    titleKo: 'AI 전략 컨설팅',
    price: '₩5,000,000',
    priceUnit: '/ 월 (VAT 별도)',
    features: [
      '월 2회 정기 전략 미팅',
      'AI 도입 로드맵 설계·실행 자문',
      '자체 AI 분석 리포트 정기 제공',
      '외부 AI 도구 도입·운영 가이드',
    ],
    description: '사내 AI 전담 인력을 두기 전,\n외부 전문가가 함께 설계합니다',
    isPrimary: false,
    badge: null,
  },
] as const;

export function PricingSection() {
  return (
    <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* 헤더 */}
        <motion.div className="text-center mb-20" {...fadeIn}>
          <h2
            className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            Service & Pricing
          </h2>
          <p className="text-xl opacity-70 max-w-3xl mx-auto mb-2" style={{ color: 'var(--navy-900)' }}>
            상황과 목표에 맞는 최적의 플랜을 제안합니다
          </p>
          <p className="text-base opacity-50 max-w-2xl mx-auto" style={{ color: 'var(--navy-900)' }}>
            의료·서비스·기관별 맞춤 패키지부터 단발성 진단 리포트까지
          </p>
        </motion.div>

        {/* 상단 영역: AI Solutions */}
        <motion.div {...fadeIn}>
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: 'var(--navy-700)' }}
              >
                AI Solutions for All Industries
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--navy-100)' }} />
            </div>
            <p className="text-sm" style={{ color: 'var(--navy-500)' }}>
              AI 분석·웹·앱·SaaS — 모든 업계 대상
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
            {aiSolutions.map(({ Icon, typeLabel, titleEn, titleKo, price, priceUnit, features, description, isPrimary, badge }) => (
              <div
                key={titleEn}
                className="rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl flex flex-col relative"
                style={{
                  borderColor: isPrimary ? 'var(--navy-900)' : '#EAEAEA',
                  backgroundColor: 'white',
                }}
              >
                {badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div
                      className="px-4 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: 'var(--navy-900)' }}
                    >
                      {badge}
                    </div>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: isPrimary ? 'var(--navy-900)' : 'var(--navy-50)' }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: isPrimary ? 'white' : 'var(--navy-700)' }}
                        strokeWidth={1.75}
                      />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--navy-500)' }}>
                      {typeLabel}
                    </span>
                  </div>

                  <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--navy-500)' }}>
                    {titleEn}
                  </div>
                  <h3 className="text-xl font-bold mb-5 leading-snug" style={{ color: 'var(--navy-900)' }}>
                    {titleKo}
                  </h3>

                  <div className="mb-6">
                    <div className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                      {price}
                    </div>
                    <div className="text-sm opacity-60 mt-0.5" style={{ color: 'var(--navy-900)' }}>
                      {priceUnit}
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: 'var(--navy-700)' }}
                        />
                        <span className="text-sm leading-snug" style={{ color: 'var(--navy-900)' }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p
                    className="text-xs leading-relaxed mb-6 whitespace-pre-line"
                    style={{ color: 'var(--navy-500)' }}
                  >
                    {description}
                  </p>
                </div>

                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:opacity-90"
                  style={
                    isPrimary
                      ? { backgroundColor: 'var(--navy-900)', color: 'white' }
                      : { backgroundColor: 'transparent', color: 'var(--navy-900)', border: '2px solid var(--navy-900)' }
                  }
                >
                  상담 신청
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 하단 영역: Healthcare Packages */}
        <motion.div {...fadeIn}>
          <div
            className="rounded-2xl px-10 py-10"
            style={{ backgroundColor: 'var(--navy-50)' }}
          >
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: 'var(--navy-700)' }}
                >
                  Healthcare-Specialized Packages
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--navy-100)' }} />
              </div>
              <p className="text-sm" style={{ color: 'var(--navy-500)' }}>
                헬스케어 전문 패키지 — 의료기관 전용 · 15년 의료 현장 경험을 토대로 한 병원 전문 서비스입니다
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* 카드 5: 병원 PR & 콘텐츠 운영 */}
              <div className="bg-white rounded-2xl p-8 border-2 flex flex-col" style={{ borderColor: '#EAEAEA' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--navy-50)' }}
                    >
                      <Megaphone className="w-5 h-5" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--navy-500)' }}>
                      월 정액 · 6개월~
                    </span>
                  </div>

                  <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--navy-500)' }}>
                    Hospital PR & Content
                  </div>
                  <h3 className="text-xl font-bold mb-6 leading-snug" style={{ color: 'var(--navy-900)' }}>
                    병원 PR & 콘텐츠 운영
                  </h3>

                  {/* 3-tier 가격표 */}
                  <div className="mb-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold w-24" style={{ color: 'var(--navy-700)' }}>Basic</span>
                      <span className="text-base font-bold" style={{ color: 'var(--navy-900)' }}>₩1,500,000</span>
                      <span className="text-xs" style={{ color: 'var(--navy-500)' }}>/ 월</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold w-24" style={{ color: 'var(--navy-700)' }}>Strategic</span>
                      <span className="text-base font-bold" style={{ color: 'var(--navy-900)' }}>₩3,000,000</span>
                      <span className="text-xs" style={{ color: 'var(--navy-500)' }}>/ 월</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold w-24" style={{ color: 'var(--navy-700)' }}>Premium</span>
                      <span className="text-base font-bold" style={{ color: 'var(--navy-900)' }}>별도 산정</span>
                      <span className="text-xs opacity-0" style={{ color: 'var(--navy-500)' }}>/ 월</span>
                    </div>
                    <p className="text-xs pt-1" style={{ color: 'var(--navy-500)' }}>(VAT 별도)</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--navy-700)' }}>
                        Basic
                      </p>
                      <ul className="space-y-1.5">
                        {['월 20건 블로그 포스팅', '월 10건 유튜브 쇼츠', '월 1회 환자 트렌드 리포트'].map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                            <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--navy-700)' }}>
                        Strategic
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          '월 60건 블로그 포스팅',
                          '월 20건 유튜브 쇼츠',
                          '월 2회 환자 트렌드 리포트',
                          '주 3회 임직원 Action Plan',
                          '주 1회 의료서비스 강화 KPI 모델 설계',
                        ].map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                            <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--navy-500)' }}>
                    자체 AI 분석 시스템 기반의<br />
                    데이터 중심 콘텐츠·운영 패키지
                  </p>
                </div>

                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{ backgroundColor: 'transparent', color: 'var(--navy-900)', border: '2px solid var(--navy-900)' }}
                >
                  상담 신청
                </Link>
              </div>

              {/* 카드 6: 병원 개원 컨설팅 */}
              <div className="bg-white rounded-2xl p-8 border-2 flex flex-col" style={{ borderColor: '#EAEAEA' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--navy-50)' }}
                    >
                      <Building2 className="w-5 h-5" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--navy-500)' }}>
                      프로젝트 · 6개월~
                    </span>
                  </div>

                  <div className="mb-1 text-sm font-semibold" style={{ color: 'var(--navy-500)' }}>
                    Hospital Opening Consulting
                  </div>
                  <h3 className="text-xl font-bold mb-6 leading-snug" style={{ color: 'var(--navy-900)' }}>
                    병원 개원 컨설팅
                  </h3>

                  <div className="mb-6">
                    <div className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                      ₩30,000,000 ~
                    </div>
                    <div className="text-sm opacity-60 mt-0.5" style={{ color: 'var(--navy-900)' }}>
                      / 프로젝트 (VAT 별도)
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {[
                      '입지 및 상권 분석',
                      '병원 포지셔닝 설계',
                      '서비스 모델 설계',
                      '초기 홍보 전략',
                      '운영 구조 설계',
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                        <span className="text-sm leading-snug" style={{ color: 'var(--navy-900)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--navy-500)' }}>
                    10개 이상 암 요양·한방병원 개원 자문 경험.<br />
                    개원부터 안정화까지 풀 사이클 동반
                  </p>
                </div>

                <Link
                  to="/consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all hover:opacity-80"
                  style={{ backgroundColor: 'transparent', color: 'var(--navy-900)', border: '2px solid var(--navy-900)' }}
                >
                  상담 신청
                </Link>
              </div>

            </div>
          </div>
        </motion.div>

        {/* 섹션 하단 안내 */}
        <motion.div className="mt-16 space-y-8" {...fadeIn}>
          <div className="rounded-xl px-8 py-6" style={{ backgroundColor: 'var(--navy-50)' }}>
            <ul className="space-y-1.5">
              {[
                '표기된 가격은 시작 가격입니다. 프로젝트 범위·기간·복잡도에 따라 조정됩니다.',
                '모든 패키지는 무료 상담 후 맞춤 제안서로 정식 견적을 드립니다.',
                '헬스케어 외 업종(서비스업·기관·기업)은 카드 1~4 기준, 상담을 통해 산업 특화 견적을 별도 산정합니다.',
              ].map((note) => (
                <li key={note} className="flex items-start gap-2">
                  <span className="text-xs leading-relaxed" style={{ color: 'var(--navy-500)' }}>
                    ※ {note}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl px-10 py-12 text-center"
            style={{ backgroundColor: 'var(--navy-50)' }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
              적합한 패키지가 보이지 않으시나요?
            </h3>
            <p className="text-base leading-relaxed mb-8 opacity-80 max-w-xl mx-auto" style={{ color: 'var(--navy-900)' }}>
              15년 업계 경험과 자체 AI 시스템 기반으로,
              <br />
              회사 상황에 맞는 맞춤 솔루션을 설계합니다.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 px-8 py-4 text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span>무료 전략 상담 신청</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
