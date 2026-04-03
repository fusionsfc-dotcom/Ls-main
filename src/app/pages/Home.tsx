import { Link } from 'react-router';
import {
  ArrowRight,
  Search,
  Megaphone,
  GraduationCap,
  Building2,
  Award,
  Database,
  Shield,
  Heart,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

const pvmAxes = [
  { n: '01', name: '시점', desc: '환자가 정보를 찾는 시기' },
  { n: '02', name: '암종', desc: '위암, 유방암, 폐암, 대장암, 간암 등' },
  { n: '03', name: '성별', desc: '성별에 따른 니즈 차이' },
  { n: '04', name: '연령', desc: '연령대별 관심사와 행동 패턴' },
  { n: '05', name: '병기', desc: '1기~4기, 재발/전이별 고민 변화' },
  { n: '06', name: '정보원', desc: '환자가 신뢰하는 정보 출처' },
  { n: '07', name: '지역', desc: '거주지·치료지역별 니즈' },
  { n: '08', name: '치료법', desc: '수술/항암/방사선/면역 등 치료별 니즈' },
  { n: '09', name: '핵심 니즈', desc: '환자가 가장 원하는 것' },
  { n: '10', name: '관심 서비스', desc: '구체적으로 찾는 프로그램' },
  { n: '11', name: '감정', desc: '불안, 공포, 희망 등 심리 상태' },
  { n: '12', name: '행동', desc: '실제 취하는 행동 패턴' },
  { n: '13', name: '병원', desc: '병원 선택·이탈 기준' },
] as const;

const painCards = [
  {
    title: '입원 환자가 줄고 있다',
    body: '블로그 광고비는 늘었는데 문의는 줄고, 경쟁 병원은 계속 생기고 있습니다',
  },
  {
    title: '직원은 늘었지만 서비스는 그대로',
    body: '인건비는 올랐는데 환자 만족도는 변하지 않고, 이직률만 높아집니다',
  },
  {
    title: '블로그·영상을 하는데 효과를 모르겠다',
    body: '매달 콘텐츠를 올리지만 어떤 키워드가 환자를 데려오는지 모릅니다',
  },
  {
    title: '경쟁 병원과 차별점이 없다',
    body: '우리 병원만의 강점이 있는데 환자에게 전달되지 않습니다',
  },
  {
    title: '개원을 준비하는데 막막하다',
    body: '입지, 인허가, 인력, 장비... 어디서부터 시작해야 할지 모르겠습니다',
  },
  {
    title: '시스템 없이 원장 혼자 다 하고 있다',
    body: '진료 외에 경영, 마케팅, 인사까지 모두 원장 한 사람에게 달려있습니다',
  },
] as const;

const services = [
  {
    Icon: Search,
    title: '전략 분석',
    body: 'PVM 데이터 분석, 경쟁 병원 벤치마킹, 환자 이탈 원인 분석, 서비스 갭 진단. 감이 아닌 데이터로 병원의 현재 위치를 정확히 파악합니다.',
    tags: ['PVM 분석', '경쟁분석', '이탈분석'],
  },
  {
    Icon: Megaphone,
    title: '브랜딩 & 홍보',
    body: '병원 포지셔닝 설계, 네이버 블로그 전략, 유튜브 쇼츠, 카드뉴스 자동화. 환자가 검색하는 키워드에 병원이 노출되도록 설계합니다.',
    tags: ['블로그 대행', '영상 제작', '카드뉴스'],
  },
  {
    Icon: GraduationCap,
    title: '교육 & 조직',
    body: '직원 서비스 교육, 조직문화 설계, 운영 매뉴얼 구축. 원장 한 사람이 아닌 시스템이 병원을 운영하도록 만듭니다.',
    tags: ['직원교육', '조직문화', '매뉴얼'],
  },
  {
    Icon: Building2,
    title: '개원 컨설팅',
    body: '입지 분석, 인허가, 포지셔닝, 서비스 모델 설계, 초기 홍보, 1년 생존 전략. 개원부터 안정화까지 전 과정을 함께합니다.',
    tags: ['입지분석', '개원준비', '생존전략'],
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
        title="LS컨설팅 - 데이터 기반 암병원 전략 컨설팅"
        description="수천 건의 환자 데이터 분석(PVM)과 15년 현장 경험으로 암요양병원·한방병원의 전략, 브랜딩, 홍보, 교육을 설계합니다."
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
              환자 데이터 기반 전략 컨설팅
            </span>
            <h1
              className="text-5xl lg:text-7xl tracking-tight leading-tight mt-8"
              style={{ color: 'var(--navy-900)' }}
            >
              병원장님,
              <br />
              환자가 진짜 원하는 것을
              <br />
              알고 계십니까?
            </h1>
            <p
              className="text-xl mt-8 max-w-3xl mx-auto leading-relaxed"
              style={{ color: 'var(--navy-600)' }}
            >
              광고비를 늘려도 입원환자가 늘지 않는 이유,
              <br className="hidden sm:block" />
              직원을 늘려도 서비스가 나아지지 않는 이유.
              <br />
              그 답은 환자 데이터 안에 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white transition-all hover:opacity-90 w-full sm:w-auto"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>무료 전략 진단 받기</span>
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
                <span>AI 암상담 체험하기</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 — 병원장의 현실 */}
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
            지금, 이런 고민을 하고 계시지 않습니까?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painCards.map((card) => (
              <div
                key={card.title}
                className="bg-white p-6 border-l-4 shadow-none"
                style={{ borderLeftColor: 'var(--navy-900)' }}
              >
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-2xl lg:text-3xl text-center mt-16 leading-snug font-medium"
            style={{ color: 'var(--navy-900)' }}
          >
            이 문제들의 공통 원인은 하나입니다.
            <br />
            환자의 니즈를 구조적으로 파악하지 못하고 있기 때문입니다.
          </p>
        </div>
      </motion.section>

      {/* SECTION 3 — PVM */}
      <motion.section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-8">
              수천 건의 환자 데이터가 답을 알고 있습니다
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--navy-300)' }}>
              PVM(Patient Voice Matrix)은 LS컨설팅이 독자 개발한 암환자 니즈 분석 시스템입니다. 환자의 검색
              행동, 질문 패턴, 감정 변화를 13개 축으로 분석하여 병원이 무엇을 준비해야 하는지 알려줍니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {pvmAxes.map((axis) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">15년+</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                누적 데이터 기간
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">수천 건+</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                분석된 환자 데이터
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl lg:text-5xl font-bold text-white">10개+</div>
              <div className="text-base" style={{ color: 'var(--navy-300)' }}>
                주요 암종 커버리지
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              to="/insights"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white border-2 transition-all hover:bg-white/10"
              style={{ borderColor: 'white' }}
            >
              <span>PVM 분석 리포트 보기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SECTION 4 — 서비스 영역 */}
      <motion.section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              병원의 모든 문제를 구조적으로 해결합니다
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              분석에서 시작해서 실행까지. 단편적 마케팅이 아닌 통합 전략을 설계합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ Icon, title, body, tags }) => (
              <div key={title} className="p-8 rounded-xl" style={{ backgroundColor: 'var(--navy-50)' }}>
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-lg mb-6"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>
                  {title}
                </h3>
                <p className="text-base leading-relaxed opacity-80 mb-6" style={{ color: 'var(--navy-900)' }}>
                  {body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium rounded-full px-3 py-1"
                      style={{
                        backgroundColor: 'var(--navy-100)',
                        color: 'var(--navy-700)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5 — AI 암상담 */}
      <motion.section
        className="py-32 px-8 lg:px-16"
        style={{ backgroundColor: 'var(--navy-50)' }}
        {...fadeIn}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mb-6"
              style={{ color: 'var(--navy-900)' }}
            >
              AI가 환자의 질문에 24시간 답합니다
            </h2>
            <p className="text-lg opacity-80" style={{ color: 'var(--navy-900)' }}>
              ChatGPT와는 다릅니다. 수천 건의 실제 환자 데이터와 15년 현장 경험이 답하는 AI입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                      PVM 실제 환자 데이터 기반
                    </p>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                      추정이 아닌 통계로 답합니다
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                      한국 의료체계 반영
                    </p>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                      산정특례, 건강보험, 간병비까지 현실적으로
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div
                    className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                      15년 현장 상담 경험
                    </p>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                      교과서가 아닌 실제 환자가 겪는 상황을 압니다
                    </p>
                  </div>
                </li>
              </ul>
              <Link
                to="/consult"
                className="inline-flex items-center gap-2 px-8 py-4 text-white mt-10 transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>AI 암상담 체험하기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div
              className="rounded-2xl p-6 lg:p-8 shadow-lg"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div
                    className="max-w-[90%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed"
                    style={{ backgroundColor: 'var(--navy-700)', color: 'white' }}
                  >
                    위암 3기인데 요양병원 가야 하나요?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="max-w-[95%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed border border-white/15"
                    style={{ backgroundColor: 'var(--navy-800)', color: 'rgba(255,255,255,0.95)' }}
                  >
                    항암 치료를 마치셨군요. 정말 고생 많으셨습니다.
                    <br />
                    PVM 데이터상 위암 3기 환자의 67%가 같은 고민을 하십니다.
                    <br />
                    판단 기준 3가지를 알려드릴게요...
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span
                  className="text-xs rounded-full px-3 py-1.5 border border-white/25 text-white/90"
                >
                  비용이 얼마나 드나요?
                </span>
                <span
                  className="text-xs rounded-full px-3 py-1.5 border border-white/25 text-white/90"
                >
                  서울 근처 추천은?
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 6 — 실적과 신뢰 */}
      <motion.section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="text-3xl lg:text-5xl tracking-tight leading-tight text-center mb-16"
            style={{ color: 'var(--navy-900)' }}
          >
            15년간, 현장에서 증명해 왔습니다
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                10개+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                개원 컨설팅 병원
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                5개
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                월간 홍보대행 병원
              </div>
            </div>
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
                수천 건+
              </div>
              <div className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>
                PVM 분석 데이터
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-gray-100" style={{ backgroundColor: 'var(--navy-50)' }}>
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                대기업 광고기획 경험
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                종합광고대행사에서 전략적 브랜딩과 캠페인을 기획한 경험이 병원 마케팅의 기초입니다
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border border-gray-100" style={{ backgroundColor: 'var(--navy-50)' }}>
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                암병원 현장 15년
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                암요양병원과 암한방병원에서 직접 환자를 상담하고, 입원부터 퇴원까지 함께한 경험입니다
              </p>
            </div>
            <div className="text-center p-8 rounded-xl border border-gray-100" style={{ backgroundColor: 'var(--navy-50)' }}>
              <Award className="w-14 h-14 mx-auto mb-4" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                10개 병원 개원 컨설팅
              </h3>
              <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                암요양병원, 암한방병원, 암의원까지 다양한 형태의 병원 개원을 설계하고 실행했습니다
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7 — 최종 CTA */}
      <motion.section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-8">
            병원의 다음 단계를 함께 설계합니다
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--navy-300)' }}>
            환자 데이터 분석부터 전략 수립, 실행, 시스템 구축까지.
            <br />
            병원장님이 진료에 집중할 수 있도록 나머지는 저희가 하겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90 w-full sm:w-auto"
              style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
            >
              <span>전략 상담 신청하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/consult"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg border-2 transition-all hover:bg-white/10 w-full sm:w-auto text-white"
              style={{ borderColor: 'white' }}
            >
              <span>AI 암상담 먼저 체험하기</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
