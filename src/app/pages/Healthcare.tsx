import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeftRight,
  Search,
  MessageSquareOff,
  Unplug,
  Smartphone,
  LayoutDashboard,
  Route,
  FlaskConical,
  Accessibility,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Stethoscope,
  AlertTriangle,
  Gauge,
  Megaphone,
  Bot,
  Database,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { medImages, homeImages } from '../data/homeImages';
import { fadeIn, staggerContainer, staggerItem } from '../lib/motion';

/* ── 현실 문제 ─────────────────────────────────────── */
const problems = [
  {
    Icon: Search,
    title: 'AI 검색에 잡히지 않습니다',
    body: '환자는 이제 네이버·구글을 넘어 AI에게 병원을 묻습니다. 기존 홈페이지는 AI 검색에 노출되도록 설계되지 않아, 보이지 않습니다.',
  },
  {
    Icon: MessageSquareOff,
    title: '일방적인 정보만 전달합니다',
    body: '치료 소개와 시설 사진뿐. 환자가 묻고 병원이 답하는 양방향 소통이 없습니다. 방문자는 정보만 보고 떠납니다.',
  },
  {
    Icon: Unplug,
    title: '환자와의 연결이 끊깁니다',
    body: '치료가 끝나면 관계도 끝납니다. 재내원도, 후기도, 추천도 일어나지 않아 매달 광고비만 빠져나갑니다.',
  },
] as const;

/* ── AI 검색 준비도 진단 (실제 진단 사례·익명) ─────── */
const auditAreas = [
  { area: '구조화 데이터 (Schema.org)', score: 5, comment: 'JSON-LD 전무 — AI가 병원·의료진을 엔티티로 인식 불가' },
  { area: 'FAQ / 질의응답 콘텐츠', score: 10, comment: 'FAQ 페이지가 빈 껍데기 — AI 인용의 최대 기회 방치' },
  { area: '콘텐츠 신선도 / 권위', score: 20, comment: '작성일·출처 표기 없음 — 외부 인용 자산 부족' },
  { area: '콘텐츠 추출 가능성', score: 25, comment: '핵심 수치·강점이 이미지에 매몰, alt 텍스트 공백' },
  { area: 'E-E-A-T 신뢰 신호', score: 45, comment: '의료진 약력은 텍스트로 존재. 단 마크업·근거 부재' },
  { area: '로컬 엔티티 / NAP', score: 50, comment: '주소·전화는 노출. 지오·운영정보 구조화 없음' },
  { area: '크롤링 / 인덱싱', score: 55, comment: '본문은 읽히나 도메인 이원화로 권위 분산' },
  { area: '메타데이터 / OG', score: 60, comment: 'title·description 양호. og:url 도메인 불일치' },
] as const;

const criticalDefects = [
  { title: '구조화 데이터 전무', body: 'Schema.org 마크업이 없어 AI가 "이곳이 어떤 병원인지"를 구조적으로 이해하지 못합니다.' },
  { title: '핵심 정보가 이미지에 매몰', body: '상급병원까지 거리·병상 규모·치료 실적 같은 강점이 이미지로만 박혀 있어 AI는 읽지 못합니다.' },
  { title: 'FAQ 콘텐츠 공백', body: '질문-답변이 비어 있어, 질문에 답하는 AI 검색에 인용될 자산이 없습니다.' },
  { title: '도메인 정합성 충돌', body: '같은 콘텐츠가 두 도메인에 흩어져 신뢰·권위 점수가 분산됩니다.' },
] as const;

function bandColor(score: number) {
  if (score < 30) return '#dc2626'; // 치명적
  if (score < 60) return '#ea8a3e'; // 미흡
  if (score < 80) return '#2C5282'; // 보통
  return '#16a34a'; // 우수
}
function bandLabel(score: number) {
  if (score < 30) return '치명적';
  if (score < 60) return '미흡';
  if (score < 80) return '보통';
  return '우수';
}

/* ── 병원 AX 개발 서비스 ───────────────────────────── */
const axServices = [
  { Icon: Search, title: 'AI 검색 최적화 웹사이트', body: 'Schema.org 구조화 데이터·FAQ·핵심정보 텍스트화·llms.txt까지. AI가 병원을 읽고 인용하도록 GEO/AEO 기준으로 새로 만듭니다.' },
  { Icon: Megaphone, title: '온라인 홍보 전략 및 대행', body: '네이버·구글·AI 검색 노출을 위한 콘텐츠와 채널 운영을 전략부터 실행까지 대행합니다.' },
  { Icon: Bot, title: '의료 AI 챗봇·상담', body: 'Claude 기반 RAG 챗봇으로 환자·보호자 질문에 24시간 응대합니다. 한국 의료체계까지 반영합니다.' },
  { Icon: LayoutDashboard, title: '데이터·운영 시스템', body: 'KPI 자동화와 HappyLifeCare 연동으로 병원 운영을 데이터 기반으로 전환합니다.' },
] as const;

/* ── AI Cancer Server (Patient Voice Matrix™) ──────── */
const cancerServerStats = [
  { value: '100,000건+', label: '암 환자 실제 후기' },
  { value: '13개 축', label: '구조화 데이터 프레임' },
  { value: '매월', label: '지속 수집·갱신' },
] as const;
const cancerServerHas = [
  '암 환자 실제 후기 100,000건+ 지속 수집',
  '13개 축으로 구조화된 환자 경험 데이터',
  '항암제 효과 + 부작용 매핑',
  '병원 평판·만족 요인 분석',
] as const;
const cancerServerPowers = [
  'AI 챗봇 답변의 근거 데이터',
  '병원 콘텐츠 자동 큐레이션',
  '환자별 맞춤 정보 제공',
  '병원 마케팅 인사이트 도출',
] as const;

/* ── 병원이 얻는 변화 (고민 → 해결 → 수치) ─────────── */
const concerns = [
  { q: '환자가 떠나가요', solution: '퇴원 후에도 앱으로 병원과 연결해 재방문을 유도합니다.', metric: '재내원율 +35%' },
  { q: '신규 환자가 안 늘어요', solution: '환자 후기가 SNS·검색 콘텐츠로 자동 확산됩니다.', metric: '광고비 -40%' },
  { q: '의료진 업무가 많아요', solution: '환자 데이터를 AI가 모니터링하고 위험을 알립니다.', metric: '간호 기록 -50%' },
] as const;

/* ── 핵심 지표 ─────────────────────────────────────── */
const platformStats = [
  { value: '165개', label: '전국 연동 병원' },
  { value: '407편', label: '건강정보 콘텐츠' },
  { value: '311개', label: '근거 기반 추천 루틴' },
  { value: '24개', label: '실시간 병원-환자 연동' },
] as const;

/* ── 2개 핵심 제품 (실제 화면) ─────────────────────── */
const products = [
  {
    Icon: Smartphone,
    image: medImages.patientApp,
    name: 'HappyLife',
    role: '환자·보호자 앱',
    desc: '진단받은 그 날부터 회복까지, 환자의 하루에 함께하는 모바일 앱. 맞춤 홈·건강 루틴·3채널 Q&A(모두·전문가·내병원)·건강정보 백과를 한 앱에서.',
  },
  {
    Icon: LayoutDashboard,
    image: medImages.hospitalSys,
    name: 'HappyCare',
    role: '병원 관리 대시보드',
    desc: '의료진을 위한 케어 운영 시스템. 환자 관리·단계별 상담·성장 대시보드·Q&A 응대·프로그램/배차/일정을 하나로 운영.',
  },
] as const;

/* ── 왜 다른가 (혁신 포인트) ───────────────────────── */
const innovations = [
  { Icon: ArrowLeftRight, title: '업계 최초 양방향 연동', body: '환자 기록은 병원 대시보드로, 병원 응답은 환자 앱으로. 24개 포인트(S1~S24)로 표준화한 실시간 연결.' },
  { Icon: Route, title: '끊김 없는 동행', body: '진단 직후 → 치료 중 → 퇴원 후까지. 암종·치료 단계에 맞춰 모든 콘텐츠가 개인화됩니다.' },
  { Icon: FlaskConical, title: '근거 기반 케어', body: '미국생활습관의학회(ACLM) 6대 기둥, 국가암정보센터·ASCO 근거로 설계한 의학적 가이드.' },
  { Icon: Accessibility, title: '45세+ 접근성 우선', body: '큰 글씨·큰 터치 영역·직관적 픽토그램. 실제 중장년 암 환자를 1순위로 둔 모바일 퍼스트 디자인.' },
] as const;

/* ── 24개 양방향 연동 (대표 항목) ──────────────────── */
const syncPatientToHospital = [
  '건강 기록 입력 → 실시간 모니터링',
  '치료 확인·부작용 보고 → 선제적 케어',
  '일정 변경 요청 → 노쇼 방지',
  '만족도 입력 → NPS 자동 집계',
  '병원 리뷰 → 마케팅 자산화',
  '배차 신청 → 운영 효율화',
] as const;

const syncHospitalToPatient = [
  '치료 알림 자동 생성 → 노쇼 -60%',
  'Q&A 답변 → 환자 신뢰도 ↑',
  '의료진 기록 열람 → 투명성 ↑',
  'HappyScore 대시보드 공유 → 데이터 기반 결정',
  '퇴원·경과 리포트 → 재내원 유도',
  '담당 의료진 정보 → 인간적 관계',
] as const;

/* ── 도입 효과 (핵심 4개) ──────────────────────────── */
const effectHighlights = [
  { v: '+30%', l: '신규 환자 유입' },
  { v: '+45%', l: '외래 출석률' },
  { v: '-60%', l: '노쇼율' },
  { v: '+200%', l: '자연 검색 노출' },
] as const;

/* ── 도입 절차 ─────────────────────────────────────── */
const steps = [
  { n: '01', period: '1주', title: '무료 진단', body: '병원 운영 현황 진단 + 도입 효과 시뮬레이션' },
  { n: '02', period: '1개월', title: '시범 운영', body: '환자 10–20명 파일럿으로 실제 데이터 효과 검증' },
  { n: '03', period: '1–2주', title: '정식 도입', body: '의료진 교육 + 데이터 이관 + 병원 브랜딩 커스터마이징' },
  { n: '04', period: '상시', title: '운영 지원', body: '월간 데이터 리포트 + 분기 컨설팅 + 24/7 기술 지원' },
] as const;

/* ── 현재 함께하는 병원 ────────────────────────────── */
const clients = [
  { name: '서울힐링요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/heal.jpeg', projects: '개원컨설팅 · 상담 · 교육 · 홍보 · 홈페이지', website: 'https://www.seoulhealinghospital.co.kr/' },
  { name: '흥덕우리요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/hd.jpeg', projects: '홍보 · 홈페이지', website: 'http://hdwoori.com/' },
  { name: '러스크서울병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/rh.jpeg', projects: '암분야 도입 컨설팅 · 교육 · 홍보 · 홈페이지', website: 'https://ruskseoul.co.kr/' },
  { name: '태동의료재단 춘천태동요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/tae.jpeg', projects: '법인개설 · 개원컨설팅 · 경영지원 · 홍보 · 홈페이지', website: 'https://www.taedonghp.co.kr/' },
  { name: '뷰티풀한방병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/bt.jpeg', projects: '컨설팅 · 교육 · 홍보 · 홈페이지', website: 'https://www.btful.co.kr/' },
  { name: '네이처요양병원', image: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/nat.jpeg', projects: '홈페이지', website: 'https://www.naturehospital.co.kr/' },
] as const;

export function Healthcare() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="의료 AX - 병원 홈페이지를 AI 전환합니다 | LS AX 컨설팅"
        description="기존 병원 홈페이지는 AI 검색에 노출되지 않고 일방적인 정보만 전달합니다. LS AX 컨설팅은 HappyLifeCare 플랫폼으로 환자와 병원을 실시간 연동해, 병원 홈페이지를 AX로 전환합니다."
        url="https://www.lsconsulting.co.kr/healthcare"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
            { '@type': 'ListItem', position: 2, name: '의료', item: 'https://www.lsconsulting.co.kr/healthcare' },
          ] },
          { '@context': 'https://schema.org', '@type': 'Service', name: '의료 AX · 병원 AI 전환', serviceType: ['AI 검색 최적화 웹사이트', '온라인 홍보 전략·대행', '의료 AI 챗봇·상담', 'HappyLifeCare 플랫폼'], areaServed: 'KR', audience: { '@type': 'Audience', audienceType: '병원·의료기관' }, url: 'https://www.lsconsulting.co.kr/healthcare', provider: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' } },
        ]}
      />

      {/* ── SECTION 1 · HERO (위기감) ──────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.82) 0%, rgba(10,22,40,0.66) 45%, rgba(10,22,40,0.94) 100%), url(${medImages.hero})`,
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
              <Stethoscope className="w-3.5 h-3.5" />
              의료 AX · Hospital Transformation
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              지금 병원 홈페이지,
              <br />
              <span style={{ color: 'var(--navy-300)' }}>AI 검색에 보이지</span> 않습니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              환자는 이미 AI에게 병원을 묻습니다. 일방적인 치료 소개와 시설 사진만으로는
              더 이상 환자를 모으지 못합니다. 병원 홈페이지를 AX로 전환해야 할 때입니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
              >
                <span className="font-semibold">병원 무료 진단 신청</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
              <a
                href="#happylifecare"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              >
                <span>HappyLifeCare 보기</span>
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
              대부분의 병원이 겪는 3가지 문제
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              홈페이지와 광고에 비용을 쓰고 있지만, 환자는 줄어듭니다. 이유는 분명합니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {problems.map(({ Icon, title, body }, i) => (
              <motion.div
                variants={staggerItem}
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
                  <div className="inline-flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#d4183d' }} />
                    <span className="text-xs font-bold tracking-widest" style={{ color: '#d4183d' }}>PROBLEM</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2.5" style={{ color: 'var(--navy-900)' }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-xl lg:text-2xl text-center mt-16 leading-snug font-medium" style={{ color: 'var(--navy-900)' }}>
            그렇다면 지금 우리 병원은, AI 검색에 얼마나 준비되어 있을까요?
          </p>
        </div>
      </motion.section>

      {/* ── SECTION 2.5 · AI 검색 준비도 진단 (실제 사례) ── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <motion.div className="relative max-w-[1400px] mx-auto" {...fadeIn}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <Gauge className="w-3.5 h-3.5" />
              AI 검색 최적화 진단 · GEO / AEO Audit
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mt-6 mb-5">
              실제로 진단해보면, 대부분 이렇습니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              기존 SEO가 '클릭'을 위한 것이라면, AI 검색 최적화(GEO·AEO)는
              AI가 내 병원을 읽고·신뢰하고·답변에 인용하게 만드는 것입니다.
            </p>
          </div>

          {/* 진단 리포트 카드 */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 lg:p-10 shadow-xl">
            <div className="flex flex-wrap items-end justify-between gap-4 pb-6 mb-7 border-b" style={{ borderColor: 'var(--navy-100)' }}>
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--navy-600)' }}>
                  <Gauge className="w-4 h-4" /> 종합 AI 검색 준비도
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--navy-400)' }}>
                  생성형 AI(ChatGPT·Perplexity·Gemini·Claude) 인용 적합성 기준
                </p>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold leading-none" style={{ color: '#dc2626' }}>34</span>
                <span className="text-xl font-medium pb-0.5" style={{ color: 'var(--navy-400)' }}>/ 100</span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mb-1" style={{ backgroundColor: 'rgba(220,38,38,0.1)', color: '#dc2626' }}>
                  D · 미흡
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {auditAreas.map(({ area, score, comment }) => (
                <div key={area}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>{area}</span>
                    <span className="text-sm font-bold tabular-nums inline-flex items-center gap-2" style={{ color: bandColor(score) }}>
                      <span className="text-[11px] font-semibold rounded px-1.5 py-0.5" style={{ backgroundColor: bandColor(score) + '1A', color: bandColor(score) }}>{bandLabel(score)}</span>
                      {score}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                    <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: bandColor(score) }} />
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--navy-500)' }}>{comment}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-7 pt-5 border-t" style={{ color: 'var(--navy-400)', borderColor: 'var(--navy-100)' }}>
              ※ 국내 한 암요양병원 홈페이지의 실제 진단 결과(익명). 점수 기준: 0–30 치명적 / 30–60 미흡 / 60–80 보통 / 80–100 우수
            </p>
          </div>

          {/* 치명적 결함 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {criticalDefects.map(({ title, body }) => (
              <div key={title} className="rounded-xl p-5" style={{ backgroundColor: 'var(--navy-800)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <AlertTriangle className="w-5 h-5 mb-3" style={{ color: '#f87171' }} />
                <h4 className="text-sm font-bold text-white mb-1.5">{title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--navy-300)' }}>{body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <p className="text-base mb-6" style={{ color: 'var(--navy-200)' }}>
              대부분의 병원이 <span className="text-white font-bold">30–40점대</span>에 머뭅니다. 우리 병원의 실제 점수가 궁금하시다면—
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:opacity-90"
              style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
            >
              <span className="font-semibold">내 병원 AI 검색 점수 무료로 받기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-xl lg:text-2xl text-center mt-20 leading-snug font-medium text-white">
            진단에서 끝나지 않습니다.
            <br className="hidden sm:block" />
            발견한 문제를 개발로 해결합니다.
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 2.6 · 병원 AX 개발 서비스 ───────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              HOSPITAL AX
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              병원 AX 개발 서비스
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              진단에서 드러난 문제를 실제 개발로 해결합니다. 병원 홈페이지를 AI가 읽고 인용하는 자산으로 바꿉니다.
            </p>
          </div>

          {/* AX 전환 변화 쇼케이스 */}
          <div className="mb-16">
            <div className="rounded-2xl overflow-hidden border shadow-lg" style={{ borderColor: 'var(--navy-100)' }}>
              <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ backgroundColor: 'var(--navy-50)', borderColor: 'var(--navy-100)' }}>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e5484d' }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e8902b' }} />
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#16a34a' }} />
                <span className="ml-3 text-xs font-medium" style={{ color: 'var(--navy-500)' }}>AX로 전환한 병원 홈페이지</span>
              </div>
              <a
                href="https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/top_2.jpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <ImageWithFallback
                  src="https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/top_2.jpeg"
                  alt="AX로 전환한 병원 홈페이지 예시"
                  className="w-full block"
                />
              </a>
            </div>
            <p className="text-center text-sm mt-4" style={{ color: 'var(--navy-500)' }}>
              AI 검색에 잡히고, 환자와 연결되는 홈페이지로 — <span className="font-semibold" style={{ color: 'var(--navy-700)' }}>AX 전환이 만드는 변화</span>입니다.
            </p>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6" {...staggerContainer}>
            {axServices.map(({ Icon, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="rounded-2xl p-8 flex gap-5" style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}>
                <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 2.7 · AI Cancer Server ──────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <motion.div className="relative max-w-[1400px] mx-auto" {...fadeIn}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <Database className="w-3.5 h-3.5" />
              AI Cancer Server · Patient Voice Matrix™
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mt-6 mb-5">
              암 데이터를 읽는 자체 AI 서버
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              암 환자 실제 후기 100,000건+를 13개 축으로 구조화한 독자 데이터 자산.
              병원 웹사이트·콘텐츠·상담 AI가 추정이 아닌 데이터로 답하게 만드는 근거입니다.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            {cancerServerStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm" style={{ color: 'var(--navy-300)' }}>{label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-800)' }}>
              <h3 className="text-lg font-bold text-white mb-5">무엇을 담는가</h3>
              <ul className="space-y-3">
                {cancerServerHas.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-300)' }} />
                    <span className="text-sm leading-relaxed text-white/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-800)' }}>
              <h3 className="text-lg font-bold text-white mb-5">무엇을 만드는가</h3>
              <ul className="space-y-3">
                {cancerServerPowers.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-300)' }} />
                    <span className="text-sm leading-relaxed text-white/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 3 · HappyLifeCare 핵심 ──────────────── */}
      <motion.section id="happylifecare" className="py-28 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              OUR PLATFORM · HappyLifeCare
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-[1.15] mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              병원과 환자를 하나로 잇는
              <br />
              암 환자 통합 케어 플랫폼
            </h2>
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              병원 관리 시스템(HappyCare)과 환자·보호자 앱(HappyLife), 그리고 둘을 실시간으로 잇는 24개 연동 엔진을
              하나로 묶은 국내 유일의 암 환자 통합 케어 플랫폼입니다. 환자가 퇴원하는 순간 끊기던 케어를, 하나의 흐름으로 잇습니다.
            </p>
          </div>

          {/* 핵심 지표 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {platformStats.map(({ value, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>{value}</div>
                <div className="text-sm leading-snug" style={{ color: 'var(--navy-600)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* 실제 제품 화면 2 */}
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20" {...staggerContainer}>
            {products.map(({ Icon, image, name, role, desc }) => (
              <motion.div variants={staggerItem} key={name} className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur" style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}>
                    <Icon className="w-3.5 h-3.5" />
                    {role}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 왜 다른가 */}
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: 'var(--navy-900)' }}>왜 다른가</h3>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {innovations.map(({ Icon, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="bg-white rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h4 className="text-base font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 4 · 연동 엔진 (24개 양방향 연동) ────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <motion.div className="relative max-w-[1400px] mx-auto" {...fadeIn}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <ArrowLeftRight className="w-3.5 h-3.5" />
              연동 엔진 · S1–S24
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mt-6 mb-5">
              환자와 병원이 실시간으로 이어집니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              환자가 입력하면 병원이 즉시 보고, 병원이 응답하면 환자에게 바로 닿습니다.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-800)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">환자 → 병원</h3>
                <span className="text-3xl font-bold" style={{ color: 'var(--navy-300)' }}>12</span>
              </div>
              <ul className="space-y-3">
                {syncPatientToHospital.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-300)' }} />
                    <span className="text-sm leading-relaxed text-white/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-800)' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">병원 → 환자</h3>
                <span className="text-3xl font-bold" style={{ color: 'var(--navy-300)' }}>12</span>
              </div>
              <ul className="space-y-3">
                {syncHospitalToPatient.map((s) => (
                  <li key={s} className="flex items-start gap-2.5">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5 rotate-180" style={{ color: 'var(--navy-300)' }} />
                    <span className="text-sm leading-relaxed text-white/90">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-sm mt-8" style={{ color: 'var(--navy-300)' }}>
            대표 기능만 표시 · 총 24개(S1–S24) 기능이 실시간 연동됩니다
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 5 · 병원이 얻는 변화 (압축) ─────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              FOR HOSPITALS
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              병원이 얻는 3가지 변화
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              환자 이탈 · 유입 정체 · 업무 과다를 한 번에 해결합니다.
            </p>
          </div>

          {/* 고민 → 해결 → 수치 (압축 카드) */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {concerns.map(({ q, solution, metric }) => (
              <motion.div variants={staggerItem} key={q} className="bg-white rounded-2xl p-8 flex flex-col">
                <span className="text-xs font-semibold tracking-wide mb-2" style={{ color: '#d4183d' }}>고민</span>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{q}</h3>
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--navy-600)' }}>{solution}</p>
                <div className="rounded-xl px-4 py-3 text-center font-bold" style={{ backgroundColor: 'var(--navy-900)', color: 'white' }}>
                  {metric}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 도입 효과 — 슬림 스트립 */}
          <div className="mt-12 bg-white rounded-2xl p-8 lg:p-10">
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 text-center" {...staggerContainer}>
              {effectHighlights.map(({ v, l }) => (
                <motion.div variants={staggerItem} key={l}>
                  <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>{v}</div>
                  <div className="text-sm" style={{ color: 'var(--navy-600)' }}>{l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--navy-500)' }}>
            ※ LS AX 컨설팅 운영 병원 기준 예상치이며, 병원 규모와 환자 특성에 따라 달라질 수 있습니다.
          </p>
        </div>
      </motion.section>

      {/* ── SECTION 7 · 도입 절차 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mb-5" style={{ color: 'var(--navy-900)' }}>
              도입은 4단계로
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              무료 진단부터 시작합니다. 효과를 먼저 확인하고 결정하셔도 됩니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerContainer}>
            {steps.map(({ n, period, title, body }) => (
              <motion.div
                variants={staggerItem}
                key={n}
                className="rounded-2xl p-7 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ background: 'linear-gradient(155deg, var(--navy-100) 0%, var(--navy-50) 60%)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-bold tabular-nums" style={{ color: 'var(--navy-600)' }}>{n}</span>
                  <span className="text-xs font-semibold rounded-full px-3 py-1 bg-white shadow-sm" style={{ color: 'var(--navy-700)' }}>{period}</span>
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* 보안 배지 */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-14 text-sm" style={{ color: 'var(--navy-500)' }}>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 의료법·개인정보보호법 준수</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> ISO 27001 표준 · 데이터 암호화</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 99.9% 가용성 · 24/7 모니터링</span>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 8 · 현재 함께하는 병원 ─────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              CLIENTS
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              현재 함께하는 병원
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              개원 컨설팅부터 홍보·홈페이지까지, 의료 현장에서 검증된 파트너십입니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {clients.map((c) => (
              <motion.div variants={staggerItem} key={c.name} className="bg-white rounded-2xl overflow-hidden flex flex-col border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={c.image} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{c.name}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--navy-600)' }}>{c.projects}</p>
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold mt-4 self-start transition-all hover:gap-3"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    <ExternalLink className="w-4 h-4" /> 홈페이지 바로가기
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── SECTION 9 · 최종 CTA ───────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${homeImages.trust})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.85)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
            병원 홈페이지, 지금 진단받으세요
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-4" style={{ color: 'var(--navy-200)' }}>
            현재 병원의 AI 검색 노출과 환자 연결 구조를 무료로 진단하고,
            HappyLifeCare 도입 시 예상 효과를 시뮬레이션해 드립니다.
          </p>
          <p className="text-sm mb-10" style={{ color: 'var(--navy-300)' }}>
            진단 1주 · 비용 없음 · 도입 의무 없음
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg transition-all hover:opacity-90 w-full sm:w-auto"
              style={{ backgroundColor: 'white', color: 'var(--navy-900)' }}
            >
              <span className="font-semibold">병원 무료 진단 신청</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg border-2 text-white transition-all hover:bg-white/10 w-full sm:w-auto"
              style={{ borderColor: 'rgba(255,255,255,0.35)' }}
            >
              <span>작동 중인 AI 보기</span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
