import React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Award,
  ShieldCheck,
  FileText,
  Activity,
  Users,
  LineChart,
  Workflow,
  Globe,
  Code2,
  Compass,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

const analysisAxes = [
  { n: '01', name: '시점', desc: '고객이 정보를 찾는 시기' },
  { n: '02', name: '분야', desc: '업종·서비스·관심 영역' },
  { n: '03', name: '성별', desc: '성별에 따른 니즈 차이' },
  { n: '04', name: '연령', desc: '연령대별 관심사와 행동 패턴' },
  { n: '05', name: '단계', desc: '의사결정·구매·치료 단계별 변화' },
  { n: '06', name: '정보원', desc: '고객이 신뢰하는 정보 출처' },
  { n: '07', name: '지역', desc: '거주지·활동 지역별 니즈' },
  { n: '08', name: '방법', desc: '선택한 해결 방법·치료법별 니즈' },
  { n: '09', name: '핵심 니즈', desc: '고객이 가장 원하는 것' },
  { n: '10', name: '관심 서비스', desc: '구체적으로 찾는 프로그램·서비스' },
  { n: '11', name: '감정', desc: '불안, 기대, 신뢰 등 심리 상태' },
  { n: '12', name: '행동', desc: '실제 취하는 행동 패턴' },
  { n: '13', name: '선택 기준', desc: '업체·병원·서비스 선택과 이탈 기준' },
] as const;

const medicalRationale = [
  {
    Icon: ShieldCheck,
    title: '데이터 민감성',
    body: '환자 정보는 가장 보호되어야 할 데이터입니다. 이곳에서 AI를 다뤄본 회사는 어떤 산업의 데이터든 신중하게 다룰 수 있습니다.',
  },
  {
    Icon: FileText,
    title: '규제와 법적 책임',
    body: '의료법, 개인정보보호법, 의료광고심의까지 — 가장 엄격한 규제 환경에서 AI를 운영해 본 경험이 있습니다.',
  },
  {
    Icon: Activity,
    title: '실시간 의사결정',
    body: '환자의 상태와 치료 결정에 AI가 잘못된 정보를 제공해선 안 됩니다. 정확성에 대한 기준을 가장 높은 곳에 맞춰 두었습니다.',
  },
  {
    Icon: Users,
    title: '다양한 사용자',
    body: '의사, 간호사, 환자, 보호자 — 디지털 친숙도가 다른 사용자가 모두 써야 합니다. UX의 난이도가 가장 높은 환경입니다.',
  },
] as const;

const provenWorks = [
  {
    label: '지금 이 사이트에서 작동 중',
    title: 'AI 암상담 시스템',
    body: 'Claude 기반 RAG 아키텍처로 구축한 의료 상담 AI입니다. 자체 분석 데이터를 토대로 환자와 보호자의 질문에 24시간 답변합니다. 한국 의료체계(산정특례, 건강보험, 요양급여)까지 현실적으로 반영합니다.',
    cta: { label: '직접 체험하기', to: '/consult' },
  },
  {
    label: '7년 자체 개발 · 2026년 6월 런칭',
    title: '헬스케어 통합 SaaS',
    body: '병원 운영자용 시스템(해피케어)과 환자·보호자 앱(해피라이프)이 연동되는 통합 플랫폼. AI 식단 추천, 12개 카테고리 건강 모니터링, KPI 자동 산출까지. 자체 SaaS를 7년간 직접 개발·운영한 회사는 흔치 않습니다.',
    cta: { label: '자세히 보기', to: '/insights' },
  },
  {
    label: '매월 자동 발행',
    title: '13개 축 환자 데이터 분석',
    body: '누적 15,000건 이상의 실제 환자 데이터를 13개 축으로 분류하는 자체 시스템. Claude API와 자체 분류 파이프라인으로 매월 분석 리포트를 자동 생성합니다. 간암·폐암 분석 리포트가 현재 발행 중입니다.',
    cta: { label: '리포트 보기', to: '/insights' },
  },
] as const;

const solutionsBrief = [
  { Icon: LineChart, title: 'AI 시장 진단', body: '자체 AI 시스템으로 시장·고객·경쟁사를 13개 축으로 분석합니다.' },
  { Icon: Workflow, title: 'AI 업무 자동화', body: 'n8n + Claude API로 회사 워크플로우를 시스템으로 전환합니다.' },
  { Icon: Globe, title: 'AI 최적화 웹·앱', body: 'AI 검색 노출 + AI 챗봇 통합한 차세대 웹사이트·앱을 구축합니다.' },
  { Icon: Code2, title: '맞춤 SaaS 개발', body: '회사 고유 워크플로우에 맞춘 SaaS·내부 시스템을 직접 구축합니다.' },
  { Icon: Compass, title: 'AI 전략 컨설팅', body: '사내 AI 인력 두기 전 외부 전문가 정기 자문으로 전략을 설계합니다.' },
] as const;

const quoteEntries = [
  {
    Icon: Sparkles,
    label: '7–10분 소요',
    title: 'AI 진단으로 맞춤 견적 받기',
    body: 'Claude AI가 회사 AI 준비도를 진단하고 맞춤 솔루션과 예산 범위를 즉시 제안합니다.',
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

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="LS컨설팅 - 의료에서 검증된 AI 실행력"
        description="가장 난이도가 높은 의료분야에서 AI 솔루션을 개발하고 7년간 운영해 온 회사. 그 실행력으로 병원·기업·기관의 AI 전환을 진단부터 실행까지 함께합니다."
        url="https://www.lsconsulting.co.kr"
      />

      {/* SECTION 1 — 히어로 */}
      <motion.section
        className="pt-40 pb-32 px-8 lg:px-16"
        style={{ backgroundColor: 'white' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{
                backgroundColor: 'var(--navy-100)',
                color: 'var(--navy-700)',
                fontSize: '12px',
              }}
            >
              의료 현장에서 검증된 AI 실행력
            </span>
            <h1
              className="text-5xl lg:text-7xl tracking-tight leading-tight mt-8"
              style={{ color: 'var(--navy-900)' }}
            >
              가장 난이도가 높은 의료분야
              <br className="hidden sm:block" />
              AI 솔루션을 개발했습니다
            </h1>
            <p
              className="text-xl mt-8 max-w-4xl mx-auto leading-relaxed"
              style={{ color: 'var(--navy-700)' }}
            >
              데이터가 민감하고, 규제가 엄격하고, 생명과 직결되는 의료 현장.
              <br className="hidden sm:block" />
              LS컨설팅은 그곳에서 AI를 직접 설계하고, 만들고, 7년간 운영해 왔습니다.
              <br className="hidden sm:block" />
              그 실행력으로 이제 병원·기업·기관의 AI 전환을 함께합니다.
            </p>
            <p
              className="text-sm mt-4"
              style={{ color: 'var(--navy-500)' }}
            >
              자체 AI 개발·운영 · 15,000건+ 누적 분석 · 15년 업계 경험
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white transition-all hover:opacity-90 w-full sm:w-auto"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>상담/견적 신청</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <Link
                to="/consult"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90 w-full sm:w-auto border-2"
                style={{
                  backgroundColor: 'var(--navy-50)',
                  color: 'var(--navy-900)',
                  borderColor: 'var(--navy-900)',
                }}
              >
                <span>작동 중인 AI 직접 보기</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 — 왜 의료에서 시작했는가 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-50)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              의료에서 AI를 만든다는 것
            </h2>
            <p className="text-lg leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
              의료는 AI를 도입하기 가장 어려운 분야 중 하나입니다.
              <br className="hidden sm:block" />
              LS컨설팅이 이곳에서 시작한 이유, 그리고 다른 산업이 우리를 신뢰할 수 있는 이유입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medicalRationale.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-white p-6 border-l-4"
                style={{ borderLeftColor: 'var(--navy-700)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: 'var(--navy-100)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-2xl lg:text-3xl text-center mt-16 leading-snug font-medium"
            style={{ color: 'var(--navy-900)' }}
          >
            가장 난이도가 높은 의료분야에서 작동하는 AI 솔루션을 개발할 수 있다면,
            <br />
            다른 곳에서는 더 빠르고 안전하게 만들 수 있습니다.
          </p>
        </div>
      </motion.section>

      {/* SECTION 3 — 자체 AI 개발·운영 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-900)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-8">
              AI를 사용하는 회사가 아닌
              <br className="hidden sm:block" />
              AI를 개발하는 회사입니다
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--navy-300)' }}>
              LS컨설팅은 외부 AI 서비스를 단순 연결하는 회사가 아닙니다.
              <br className="hidden sm:block" />
              자체 AI 분석 시스템을 직접 설계하고 운영합니다.
              <br className="hidden sm:block" />
              15,000건이 넘는 실제 환자 데이터를 13개 축으로 구조화하여,
              <br className="hidden sm:block" />
              추정이 아닌 데이터로 답하는 의사결정을 만듭니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {analysisAxes.map((axis) => (
              <div
                key={axis.n}
                className="rounded-xl p-5 border border-white/10"
                style={{ backgroundColor: 'var(--navy-800)' }}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-sm font-bold tabular-nums opacity-60 text-white">{axis.n}</span>
                  <h3 className="text-base font-bold text-white">{axis.name}</h3>
                </div>
                <p className="text-sm leading-relaxed opacity-80 text-white">{axis.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">15,000건+</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                누적 분석 데이터
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">13개 축</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                다차원 분석 프레임
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">매월</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                자동 리포트 발행
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/insights"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border-2 transition-all hover:bg-white/10"
              style={{ borderColor: 'white' }}
            >
              <span>최신 분석 리포트 보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 — 검증된 결과물 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-25)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              개발 및 운영 중인 솔루션
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              AI에 대한 이론과 가능성은 어디에서나 들을 수 있습니다.
              <br className="hidden sm:block" />
              LS컨설팅은 이미 만들어 운영 중인 결과물로 이야기합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {provenWorks.map((work) => (
              <div
                key={work.title}
                className="bg-white rounded-xl p-8 flex flex-col"
              >
                <span
                  className="text-xs font-semibold tracking-wide mb-4 inline-block"
                  style={{ color: 'var(--navy-700)' }}
                >
                  {work.label}
                </span>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {work.title}
                </h3>
                <p
                  className="text-sm leading-relaxed opacity-80 flex-1 mb-8"
                  style={{ color: 'var(--navy-900)' }}
                >
                  {work.body}
                </p>
                <Link
                  to={work.cta.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: 'var(--navy-900)' }}
                >
                  <span>{work.cta.label}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 — 5대 솔루션 + 견적 진입 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'white' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* A — 5대 솔루션 브리프 */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              진단부터 실행까지
              <br className="hidden sm:block" />
              한 회사가 끝까지 책임집니다
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              분석 따로, 전략 따로, 개발 따로가 아닙니다.
              <br className="hidden sm:block" />
              한 팀이 한 호흡으로 진행합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
            {solutionsBrief.map(({ Icon, title, body }) => (
              <div key={title} className="p-6 rounded-xl flex flex-col" style={{ backgroundColor: 'var(--navy-50)' }}>
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg mb-4"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* B — 견적 진입 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quoteEntries.map(({ Icon, label, title, body, ctaLabel, ctaTo, primary }) => (
              <div
                key={title}
                className="p-10 rounded-2xl flex flex-col"
                style={{
                  backgroundColor: primary ? 'var(--navy-900)' : 'var(--navy-50)',
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: primary ? 'rgba(255,255,255,0.15)' : 'var(--navy-200)',
                    }}
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
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ color: primary ? 'white' : 'var(--navy-900)' }}
                >
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
                  style={
                    primary
                      ? { backgroundColor: 'white', color: 'var(--navy-900)' }
                      : { backgroundColor: 'var(--navy-900)', color: 'white' }
                  }
                >
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — 15년의 트랙레코드 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-50)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="text-3xl lg:text-5xl tracking-tight leading-tight text-center mb-16"
            style={{ color: 'var(--navy-900)' }}
          >
            15년의 현장이 만든 신뢰
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                15년+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                업계 경험
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                10개+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                개원·구축 컨설팅
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                7년+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                자체 SaaS 개발
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                15,000건+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                자체 AI 분석 데이터
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="text-center p-8 rounded-xl border border-gray-100"
              style={{ backgroundColor: 'var(--navy-50)' }}
            >
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                광고기획·전략 10년
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                종합광고대행사 광고기획자(AE) 경력. 전략 수립과 캠페인 기획, 메시지 설계의 기초가 컨설팅의 출발점입니다.
              </p>
            </div>
            <div
              className="text-center p-8 rounded-xl border border-gray-100"
              style={{ backgroundColor: 'var(--navy-50)' }}
            >
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                의료 현장 15년
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                암 요양·한방병원에서 환자 상담부터 운영까지 직접 경험. 업계의 실제 워크플로우를 가장 깊이 아는 강점입니다.
              </p>
            </div>
            <div
              className="text-center p-8 rounded-xl border border-gray-100"
              style={{ backgroundColor: 'var(--navy-50)' }}
            >
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                자체 SaaS 7년 개발
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                헬스케어 SaaS &apos;해피라이프케어&apos;를 7년간 직접 개발·운영. 컨설팅사 중 자체 제품을 보유한 회사는 흔치 않습니다.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7 — 최종 CTA */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-900)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-8">
            다음 단계를 함께 설계합니다
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--navy-300)' }}>
            데이터 분석부터 전략 수립, 시스템 구축, 운영까지.
            <br />
            대표님이 본업에 집중할 수 있도록 나머지는 저희가 만들겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90 w-full sm:w-auto"
              style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
            >
              <span>상담/견적 신청하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/consult"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg border-2 transition-all hover:bg-white/10 w-full sm:w-auto text-white"
              style={{ borderColor: 'white' }}
            >
              <span>작동 중인 AI 먼저 체험하기</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
