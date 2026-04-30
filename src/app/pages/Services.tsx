import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Check,
  LineChart,
  Workflow,
  Globe,
  Code2,
  Compass,
  Heart,
  Briefcase,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

const workSteps = [
  { n: '01', label: 'Diagnose', title: '진단', body: '자체 AI 시스템으로 시장과 고객 데이터를 13개 축으로 분석합니다. 추정이 아닌 데이터로 시작합니다.' },
  { n: '02', label: 'Design', title: '설계', body: '진단 결과를 토대로 전략과 시스템 구조를 설계합니다. PPT가 아닌 동작하는 프로토타입으로 보여드립니다.' },
  { n: '03', label: 'Build', title: '구축', body: 'Claude/Cursor 기반으로 직접 개발합니다. 외주 단계가 없으니 의도가 그대로 결과물에 반영됩니다.' },
  { n: '04', label: 'Operate', title: '운영', body: '만든 시스템이 실제로 작동하는지 끝까지 책임집니다. KPI 측정, 개선, 확장까지.' },
] as const;

const solutions = [
  {
    id: 'diagnosis',
    Icon: LineChart,
    labelEn: 'AI Market Diagnosis',
    titleKo: 'AI 시장 진단',
    body: '시장과 고객, 경쟁사를 자체 AI 시스템으로 분석합니다. AI 도입을 검토 중인 회사를 위한 가장 가벼운 진입 옵션입니다. 4-6주 안에 의사결정에 필요한 종합 리포트를 받으실 수 있습니다.',
    deliverables: [
      '시장 구조·경쟁 포지셔닝 진단',
      '고객 니즈·이탈 패턴 분석',
      'AI 도입 가능 영역과 우선순위 로드맵',
    ],
    meta: '프로젝트 · 4-6주 · ₩5,000,000부터 (VAT 별도)',
  },
  {
    id: 'automation',
    Icon: Workflow,
    labelEn: 'AI Workflow Automation',
    titleKo: 'AI 업무 자동화',
    body: '회사 워크플로우 자동화 시스템을 직접 구축하고 운영합니다. n8n, Make, Zapier 같은 자동화 도구와 Claude API를 결합하여 엑셀과 카톡으로 굴러가던 반복 업무를 시스템으로 전환합니다.',
    deliverables: [
      '회사 워크플로우 분석 + 자동화 가능 영역 진단',
      '자동화 도구 + Claude API 결합 시스템 구축',
      '6개월 운영 모니터링 포함',
    ],
    meta: '구축 + 운영 · 4-6주 · ₩8,000,000부터 + 월 ₩500,000부터 (VAT 별도)',
  },
  {
    id: 'webapp',
    Icon: Globe,
    labelEn: 'AI-Optimized Web & App',
    titleKo: 'AI 최적화 웹·앱 구축',
    body: '홈페이지가 회사 소개 자료에 머물러 있다면, AI 시대에는 살아남기 어렵습니다. AI 검색 노출에 최적화되고, AI 챗봇이 24시간 응대하며, 한국 시장(네이버·카카오)에 특화된 자산을 만듭니다.',
    deliverables: [
      'AI 검색 노출 최적화 (구글·네이버·AI 검색)',
      'Claude API 기반 AI 챗봇·상담 통합',
      'React/Next.js + Supabase 풀스택 구축',
    ],
    meta: '프로젝트 · 4-8주 · ₩15,000,000부터 (VAT 별도)',
  },
  {
    id: 'saas',
    Icon: Code2,
    labelEn: 'Custom SaaS Development',
    titleKo: '맞춤 SaaS·시스템',
    body: '기성 솔루션이 회사 방식을 못 따라올 때, 직접 만들어 운영합니다. 7년간 자체 SaaS를 개발·운영해 온 노하우로, 시장에서 작동하는 시스템을 6개월 안에 만듭니다.',
    deliverables: [
      '업계 특화 SaaS·내부 시스템 설계·구축',
      '자체 AI 분석 모듈 통합 (선택)',
      '운영 대시보드·KPI 자동 산출',
    ],
    meta: '프로젝트 · 8-16주 · ₩50,000,000부터 (VAT 별도)',
  },
  {
    id: 'consulting',
    Icon: Compass,
    labelEn: 'AI Strategy Consulting',
    titleKo: 'AI 전략 컨설팅',
    body: '사내에 AI 전담 인력을 두기 전, 외부 전문가가 함께 설계하는 정기 자문입니다. 매월 전략 미팅과 자체 AI 분석 리포트, AI 도구 도입 가이드를 제공합니다. 사내 AI 인력 채용 비용 대비 1/3 수준의 투자입니다.',
    deliverables: [
      '월 2회 정기 전략 미팅',
      'AI 도입 로드맵 설계·실행 자문',
      '외부 AI 도구 도입·운영 가이드',
    ],
    meta: '월 정액 · 6개월~ · ₩5,000,000/월 (VAT 별도)',
  },
] as const;

const combinations = [
  {
    label: 'Recommended for Beginners',
    title: '진단 + 컨설팅',
    body: 'AI를 처음 도입하는 회사에 가장 자주 권하는 조합입니다. 4-6주 진단 리포트로 방향을 잡고, 이어 6개월 정기 자문으로 실행을 함께합니다.',
    components: ['AI 시장 진단 (1회)', 'AI 전략 컨설팅 (월 정액)'],
    startPrice: '₩5,000,000 (진단) + ₩5,000,000/월 (컨설팅)',
    isPrimary: false,
  },
  {
    label: 'Most Popular',
    title: '진단 + 웹·앱 구축',
    body: '진단 결과가 곧 웹·앱 설계의 기반이 됩니다. 별도로 진행할 때보다 시간과 비용이 모두 절감되며, 결과물의 일관성이 높습니다.',
    components: ['AI 시장 진단 (1회)', 'AI 최적화 웹·앱 구축 (1회)'],
    startPrice: '₩20,000,000부터 (통합 패키지 할인 적용)',
    isPrimary: true,
  },
  {
    label: 'Quick Win Bundle',
    title: '진단 + 자동화',
    body: 'AI 도입의 효과를 가장 빨리 체감하고 싶은 회사를 위한 조합입니다. 4-6주 진단으로 자동화 가능 영역을 도출한 후, 가장 임팩트 큰 영역부터 4-6주 안에 자동화 시스템을 구축합니다.',
    components: ['AI 시장 진단 (1회)', 'AI 업무 자동화 (구축 + 운영)'],
    startPrice: '₩5,000,000 (진단) + ₩8,000,000 (자동화 구축) + ₩500,000/월부터 (운영)',
    isPrimary: false,
  },
  {
    label: 'Enterprise',
    title: '진단 + SaaS + 컨설팅',
    body: 'AI를 회사의 인프라로 만들고 싶은 회사를 위한 풀 패키지입니다. 진단으로 시작해 자체 SaaS를 구축하고, 운영을 정기 자문으로 이어갑니다.',
    components: ['AI 시장 진단 (1회)', '맞춤 SaaS 개발 (1회)', 'AI 전략 컨설팅 (월 정액)'],
    startPrice: '별도 산정 (회사 규모·범위에 따라 조정)',
    isPrimary: false,
  },
] as const;

const industryBranches = [
  {
    Icon: Heart,
    labelEn: 'For Healthcare',
    titleKo: '의료분야',
    body: '암 요양·한방병원, 의원, 헬스케어 스타트업이 대상입니다. 15년 의료 현장 경험과 자체 AI 분석 시스템으로, 5대 솔루션을 의료기관 환경에 맞춰 적용합니다.',
    points: [
      '의료법·개인정보보호법 준수 시스템',
      '환자 데이터 13개 축 분석 누적 15,000건+',
      '병원 PR·개원 컨설팅 통합 패키지 제공',
    ],
    cta: '의료분야 자세히 보기',
    to: '/healthcare',
  },
  {
    Icon: Briefcase,
    labelEn: 'For Business',
    titleKo: '기업분야',
    body: '서비스업, 기관, 중소·중견기업이 대상입니다. 가장 까다로운 의료에서 검증된 AI 실행력을, 회사 산업의 워크플로우에 맞춰 적용합니다.',
    points: [
      '산업별 특화 AI 시스템 설계',
      '한국 시장 특화 (네이버·카카오·국내 결제)',
      '외주 단계 없는 직접 개발',
    ],
    cta: '기업분야 자세히 보기',
    to: '/business',
  },
] as const;

const anchorChips = [
  { label: '우리의 작업 방식', href: '#how' },
  { label: '5대 솔루션', href: '#solutions' },
  { label: '어느 산업입니까?', href: '#choose' },
] as const;

export function Services() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI 솔루션 - LS컨설팅"
        description="AI 시장 진단, AI 업무 자동화, AI 최적화 웹·앱 구축, 맞춤 SaaS·시스템, AI 전략 컨설팅. 5가지 솔루션을 한 팀이 한 호흡으로 진행합니다. 진단부터 운영까지 한 회사가 책임집니다."
        url="https://www.lsconsulting.co.kr/services"
      />

      {/* SECTION 1 — 히어로 */}
      <motion.section
        className="pt-40 pb-24 px-8 lg:px-16"
        style={{ backgroundColor: 'white' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-8"
              style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-700)', fontSize: '12px' }}
            >
              AI Solutions
            </span>
            <h1
              className="text-5xl lg:text-7xl tracking-tight leading-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              분석·전략·개발·운영
              <br className="hidden sm:block" />
              한 팀이 한 호흡으로
            </h1>
            <p
              className="text-xl mt-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--navy-700)' }}
            >
              LS컨설팅은 AI 시장 진단, AI 업무 자동화, AI 최적화 웹·앱 구축,
              <br className="hidden sm:block" />
              맞춤 SaaS 개발, AI 전략 컨설팅의 5가지 솔루션을 제공합니다.
              <br className="hidden sm:block" />
              분석한 사람이 전략을 짜고, 같은 사람이 직접 개발합니다.
              <br className="hidden sm:block" />
              단계마다 발생하는 정보 손실이 없는 구조입니다.
            </p>
            <p className="text-sm mt-4" style={{ color: 'var(--navy-500)' }}>
              진단 → 설계 → 구축 → 운영. 한 회사가 끝까지 책임집니다.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {anchorChips.map((chip) => (
                <a
                  key={chip.href}
                  href={chip.href}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-all"
                  style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-50)')}
                >
                  {chip.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 — 작업 방식 */}
      <motion.section
        id="how"
        className="py-24 px-8 lg:px-16 scroll-mt-20"
        style={{ backgroundColor: 'var(--navy-50)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              한 팀이 한 호흡으로 갑니다
            </h2>
            <p className="text-lg leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
              진단 회사 따로, 설계 회사 따로, 개발사 따로가 아닙니다.
              <br className="hidden sm:block" />
              진단한 사람이 전략을 짜고, 같은 사람이 직접 만듭니다.
              <br className="hidden sm:block" />
              단계마다 발생하는 정보 손실이 없습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((step) => (
              <div
                key={step.n}
                className="bg-white rounded-xl p-7 border-l-4"
                style={{ borderLeftColor: 'var(--navy-900)' }}
              >
                <div
                  className="text-6xl font-bold leading-none mb-4 select-none"
                  style={{ color: 'var(--navy-100)' }}
                >
                  {step.n}
                </div>
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-1"
                  style={{ color: 'var(--navy-500)' }}
                >
                  {step.label}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)', opacity: 0.8 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-2xl lg:text-3xl text-center mt-16 leading-snug font-medium"
            style={{ color: 'var(--navy-900)' }}
          >
            외주 회사가 아닙니다. 파트너입니다.
            <br />
            첫 미팅의 사람이 마지막 결과물까지 함께합니다.
          </p>
        </div>
      </motion.section>

      {/* SECTION 3 — 5대 솔루션 */}
      <motion.section
        id="solutions"
        className="py-24 px-8 lg:px-16 scroll-mt-20"
        style={{ backgroundColor: 'var(--navy-25)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: 'var(--navy-900)' }}
            >
              5가지 솔루션
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              단계별로 도입할 수도, 한 번에 통합할 수도 있습니다.
              <br className="hidden sm:block" />
              어떤 옵션이 적합한지는 회사 상황에 따라 다릅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {solutions.map(({ id, Icon, labelEn, titleKo, body, deliverables, meta }) => (
              <div
                key={titleKo}
                id={id}
                className="rounded-2xl p-10 flex flex-col scroll-mt-24"
                style={{ backgroundColor: 'var(--navy-50)' }}
              >
                <div className="flex items-start gap-5 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--navy-500)' }}>
                      {labelEn}
                    </p>
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                      {titleKo}
                    </h3>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--navy-700)', opacity: 0.9 }}>
                  {body}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {deliverables.map((d: string) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{d}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm font-medium" style={{ color: 'var(--navy-500)' }}>
                  {meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 — 솔루션 조합 가이드 */}
      <motion.section
        className="py-24 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-50)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5"
              style={{ color: 'var(--navy-900)' }}
            >
              단독으로도, 조합으로도
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              5가지 솔루션은 독립적으로 제공되지만, 두세 개를 조합하면 시너지가 큽니다.
              <br className="hidden sm:block" />
              자주 권하는 조합을 소개합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {combinations.map(({ label, title, body, components, startPrice, isPrimary }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 flex flex-col border-2"
                style={{ borderColor: isPrimary ? 'var(--navy-900)' : '#EAEAEA' }}
              >
                <span
                  className="text-xs font-bold tracking-wide uppercase mb-4 self-start"
                  style={{ color: 'var(--navy-700)' }}
                >
                  {label}
                </span>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-base leading-relaxed mb-6 flex-1" style={{ color: 'var(--navy-700)' }}>
                  {body}
                </p>
                <ul className="space-y-2 mb-6">
                  {components.map((c: string) => (
                    <li key={c} className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm" style={{ color: 'var(--navy-500)' }}>
                  {startPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 — 산업 분기 */}
      <motion.section
        id="choose"
        className="py-24 px-8 lg:px-16 scroll-mt-20"
        style={{ backgroundColor: 'var(--navy-900)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
              솔루션은 같지만,
              <br className="hidden sm:block" />
              적용은 산업마다 다릅니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-300)' }}>
              의료기관과 기업은 의사결정 구조, 규제, 사용자, KPI가 모두 다릅니다.
              <br className="hidden sm:block" />
              LS컨설팅은 두 트랙을 분리해 운영합니다.
              <br className="hidden sm:block" />
              회사가 속한 산업을 선택하시면 더 자세한 사례와 적용 방식을 보실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {industryBranches.map(({ Icon, labelEn, titleKo, body, points, cta, to }) => (
              <Link
                key={to}
                to={to}
                className="rounded-2xl p-12 flex flex-col transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{ backgroundColor: 'white' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--navy-100)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--navy-900)' }} strokeWidth={1.75} />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--navy-500)' }}>
                    {labelEn}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {titleKo}
                </h3>
                <p className="text-base leading-relaxed mb-6 opacity-80" style={{ color: 'var(--navy-900)' }}>
                  {body}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {points.map((pt: string) => (
                    <li key={pt} className="flex items-start gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                      <span className="text-sm" style={{ color: 'var(--navy-900)' }}>{pt}</span>
                    </li>
                  ))}
                </ul>

                <span
                  className="inline-flex items-center gap-2 text-base font-semibold"
                  style={{ color: 'var(--navy-900)' }}
                >
                  {cta}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — 최종 CTA */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'white' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2
            className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
            style={{ color: 'var(--navy-900)' }}
          >
            어느 솔루션이 맞는지
            <br className="hidden sm:block" />
            60분 무료 상담으로 확인하세요
          </h2>
          <p
            className="text-lg max-w-xl mx-auto leading-relaxed mb-5"
            style={{ color: 'var(--navy-700)' }}
          >
            산업도, 솔루션도 명확하지 않으셔도 됩니다.
            <br />
            회사 상황을 듣고 가장 적합한 옵션과 단계를 제안해드립니다.
          </p>
          <div
            className="flex flex-wrap justify-center gap-6 mb-12 text-sm"
            style={{ color: 'var(--navy-500)' }}
          >
            <span>60분 화상 또는 대면 미팅</span>
            <span>·</span>
            <span>사전 자료 제출 불필요</span>
            <span>·</span>
            <span>상담 후 24시간 내 맞춤 제안서 발송</span>
          </div>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--navy-900)' }}
          >
            <span>상담/견적 신청</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
