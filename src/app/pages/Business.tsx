import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Repeat,
  Workflow,
  Unplug,
  Inbox,
  Wand2,
  Send,
  Files,
  GitBranch,
  Sparkles,
  User,
  Building2,
  Briefcase,
  Gauge,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  MessageSquareText,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { bizImages } from '../data/homeImages';

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/* ── 현실 문제 ─────────────────────────────────────── */
const problems = [
  {
    Icon: Repeat,
    title: '반복 업무가 하루를 잠식합니다',
    body: '보고·요약·정리·응대 같은 사무 노동이 매일 반복됩니다. 정작 중요한 일에 쓸 시간이 남지 않습니다.',
  },
  {
    Icon: Workflow,
    title: '자동화 도구는 "IT 아는 사람"만 씁니다',
    body: '노드를 연결하고 워크플로우를 그릴 줄 알아야 합니다. 대부분의 실무자에게는 그 자체가 진입장벽입니다.',
  },
  {
    Icon: Unplug,
    title: '해외 도구는 한국 업무와 안 맞습니다',
    body: '카카오·네이버·한글·배민·더존… 우리가 매일 쓰는 도구와 연동되지 않으면 무용지물입니다.',
  },
] as const;

/* ── 읽기 → 가공 → 내보내기 ───────────────────────── */
const cycle = [
  { Icon: Inbox, step: '읽기', body: '메일·파일·메시지를 받아 읽습니다.' },
  { Icon: Wand2, step: '가공', body: 'AI가 요약·분류·작성합니다.' },
  { Icon: Send, step: '내보내기', body: '전송·저장·보고로 마무리합니다.' },
] as const;

/* ── 운영되는 시스템 (4 기둥) ──────────────────────── */
const pillars = [
  { Icon: Files, title: '산출물', body: '단계마다 결과물이 자동 생성되고 버전으로 관리됩니다.' },
  { Icon: Workflow, title: '자동화', body: '트리거 → AI 처리 → 액션. 정해진 시각에 알아서 실행됩니다.' },
  { Icon: Sparkles, title: '고도화', body: '데이터가 쌓일수록 시스템이 더 정교해집니다.' },
  { Icon: GitBranch, title: '버전 관리', body: '입력 하나만 바꿔도 연결된 모든 산출물에 자동 반영됩니다.' },
] as const;

/* ── 무엇을 자동화하나 (시나리오) ──────────────────── */
const scenarios = [
  {
    Icon: User,
    persona: '1인 사업자',
    items: ['스마트스토어·배민 리뷰 답변 초안', '견적서·세금계산서 정리', '고객 카톡 1차 응대', '홍보 콘텐츠 자동 생성'],
  },
  {
    Icon: Building2,
    persona: '중소기업 실무자',
    items: ['거래처별 응대 메일 초안', '정기 정산 리포트 작성', '파일 업로드 시 자동 분류·정리', '반복 문서 자동 작성'],
  },
  {
    Icon: Briefcase,
    persona: '관리자급 직장인',
    items: ['주간 보고 자동 작성', '단톡방·메일 일일 요약', '회의록에서 할 일·일정 추출', 'KPI 리포트 자동 집계'],
  },
] as const;

/* ── 한국형 커넥터 ─────────────────────────────────── */
const connectors = [
  'Gmail', 'Outlook', '구글시트', '엑셀', '한글(HWP)', '네이버웍스', '잔디', '슬랙',
  '카카오 알림톡', '스마트스토어', '배민', '쿠팡', '더존', '이카운트', '토스페이먼츠', '네이버 블로그',
] as const;

/* ── 안심 운영 ─────────────────────────────────────── */
const safeguards = [
  { Icon: Gauge, title: '처리 건수 실시간 집계', body: '이번 달 몇 건을 처리했는지 한눈에 확인합니다.' },
  { Icon: Wallet, title: '예상 요금 미리 표시', body: '쓰기 전에 비용을 알 수 있어 요금 폭탄이 없습니다.' },
  { Icon: ShieldCheck, title: '한도 도달 시 자동 정지', body: '설정한 한도에 닿으면 시스템이 스스로 멈춥니다.' },
] as const;

/* ── 진행 방식 ─────────────────────────────────────── */
const steps = [
  { n: '01', title: '진단', body: '반복 업무를 찾아 자동화 가능 영역을 도출합니다.' },
  { n: '02', title: '설계', body: '읽기-가공-내보내기 흐름을 자동화로 설계합니다.' },
  { n: '03', title: '구축', body: '한국 도구에 연결해 동작하는 시스템을 만듭니다.' },
  { n: '04', title: '운영', body: '측정하고, 데이터로 지속 고도화합니다.' },
] as const;

export function Business() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="기업 AX - 반복 업무를 자동화 시스템으로 | LS AX 컨설팅"
        description="보고·요약·정리·응대 같은 반복 업무를 AI 자동화로 전환합니다. 노드를 그릴 줄 몰라도, 말로 설명하면 시스템이 대신 일합니다. 카카오·네이버·한글·배민 등 한국 업무 환경에 맞춘 자동화."
        url="https://www.lsconsulting.co.kr/business"
      />

      {/* ── SECTION 1 · HERO ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.86) 50%, rgba(10,22,40,0.97) 100%), url(${bizImages.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-44 pb-32" {...fadeIn}>
          <div className="max-w-4xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}
            >
              <Workflow className="w-3.5 h-3.5" />
              기업 AX · Work Automation
            </span>
            <h1 className="text-5xl lg:text-7xl tracking-tight leading-[1.08] mt-8 text-white font-bold">
              반복 업무, 사람이
              <br />
              <span style={{ color: 'var(--navy-300)' }}>하지 않습니다</span>
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              노드를 그릴 줄 몰라도 됩니다. 말로 업무를 설명하면, 시스템이 대신 일합니다.
              보고·요약·정리·응대 같은 반복 업무를 AI 자동화로 전환합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span className="font-semibold">업무 자동화 무료 진단</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              >
                <span>작동 방식 보기</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2 · 현실 문제 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              THE PROBLEM
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              자동화가 필요한 건 알지만
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              막상 시작하려면 벽에 부딪힙니다. 대부분의 기업이 멈추는 지점은 비슷합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl p-8 bg-white border overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: 'var(--navy-100)' }}
              >
                <span className="absolute top-6 right-7 text-6xl font-bold leading-none select-none tabular-nums" style={{ color: 'var(--navy-50)' }}>
                  0{i + 1}
                </span>
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 3 · 읽기 → 가공 → 내보내기 ──────────── */}
      <motion.section id="how" className="py-28 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              HOW IT WORKS
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              모든 반복 업무는 같은 모양입니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              받은 것을 읽고, 가공하고, 내보낸다. 이 사이클을 통째로 자동화합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {cycle.map(({ Icon, step, body }, i) => (
              <div key={step} className="relative bg-white rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{step}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                {i < cycle.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 -translate-y-1/2 z-10" style={{ color: 'var(--navy-300)' }} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl p-8 lg:p-10 text-center" style={{ backgroundColor: 'var(--navy-900)' }}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <MessageSquareText className="w-3.5 h-3.5" /> 자연어로 시작
            </div>
            <p className="text-xl lg:text-2xl font-medium text-white leading-snug max-w-3xl mx-auto">
              "매일 아침 9시에 어제 받은 문의 메일을 요약해서 카톡으로 보내줘"
            </p>
            <p className="text-base mt-4" style={{ color: 'var(--navy-300)' }}>
              이렇게 말로 설명하면, 자동화를 <span className="text-white font-semibold">대신 만들어</span> 드립니다.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 4 · 운영되는 시스템 ────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
                AS A SYSTEM
              </span>
              <h2 className="text-3xl lg:text-5xl tracking-tight leading-[1.15] mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
                한 번 만들고 끝이 아닙니다
                <br />
                계속 운영되는 시스템입니다
              </h2>
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                업무를 일회성 외주가 아니라 살아 있는 시스템으로 운영합니다.
                입력 하나를 바꾸면 연결된 산출물이 자동으로 다시 계산되고, 데이터가 쌓일수록 더 정교해집니다.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl" style={{ backgroundColor: 'var(--navy-200)' }}>
              <ImageWithFallback src={bizImages.system} alt="운영되는 시스템" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl p-7 border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 5 · 무엇을 자동화하나 ──────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              USE CASES
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              무엇을 자동화할 수 있나
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              업종·직무를 가리지 않습니다. 반복되는 일이라면 모두 대상입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map(({ Icon, persona, items }) => (
              <div key={persona} className="bg-white rounded-2xl p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--navy-100)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--navy-900)' }}>{persona}</h3>
                </div>
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-600)' }} />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 6 · 한국형 커넥터 ──────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
            한국형 커넥터
          </span>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mt-6 mb-5">
            한국에서 실제로 쓰는 도구에 연결합니다
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12" style={{ color: 'var(--navy-200)' }}>
            해외 SaaS가 아니라, 우리가 매일 쓰는 도구. 그것이 진짜 자동화의 시작입니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {connectors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--navy-800)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 7 · 안심 운영 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              PEACE OF MIND
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              요금 폭탄 걱정 없이
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              자동화가 무서운 이유는 통제 불능입니다. 처음부터 보이게, 멈출 수 있게 설계합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safeguards.map(({ Icon, title, body }) => (
              <div key={title} className="rounded-2xl p-8 border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-50)' }}>
                  <Icon className="w-6 h-6" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 8 · 진행 방식 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              진단부터 운영까지, 한 팀이
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              어떤 업무를 자동화할지부터 함께 찾습니다. 무료 진단으로 시작하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ n, title, body }) => (
              <div key={n} className="rounded-xl p-7 bg-white border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="text-3xl font-bold tabular-nums mb-4" style={{ color: 'var(--navy-300)' }}>{n}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 9 · 최종 CTA ───────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${bizImages.cta})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.85)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
            어떤 업무를 자동화할지, 같이 찾아드립니다
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--navy-200)' }}>
            반복 업무를 진단하고, 가장 효과 큰 자동화부터 설계해 드립니다. 비용 없이 시작합니다.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
          >
            <span className="font-semibold">업무 자동화 무료 진단</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
