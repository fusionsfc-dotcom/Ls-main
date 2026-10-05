import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  HeartPulse,
  Database,
  MessageCircle,
  Boxes,
  Globe,
  Megaphone,
  FileText,
  Search,
  Users,
  Building2,
  Stethoscope,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { homeImages, axImages, medImages } from '../data/homeImages';
import { fadeIn, staggerContainer, staggerItem, MotionLink } from '../lib/motion';

/* ── 핵심 지표 ─────────────────────────────────────── */
const stats = [
  { value: '3종', label: '자체 개발 플랫폼' },
  { value: '165개', label: 'HappyLifeCare 연동 병원' },
  { value: '100,000건+', label: '구조화한 환자 데이터' },
  { value: '15년+', label: '의료·기업 현장 경험' },
] as const;

/* ── 대표 프로젝트 (심층) ──────────────────────────── */
const featured = [
  {
    no: '01',
    Icon: HeartPulse,
    tag: 'Healthcare · Platform',
    title: 'HappyLifeCare',
    subtitle: '암 요양병원 AI 통합 케어 플랫폼',
    problem:
      '퇴원하는 순간 환자와 병원의 연결이 끊깁니다. 병원은 환자의 상태를 알 수 없고, 환자는 물어볼 곳이 없습니다. 재내원도, 신뢰도 여기서 끊깁니다.',
    approach: [
      '환자·보호자 앱(HappyLife)과 병원 관리 시스템(HappyCare)을 각각 개발',
      '두 시스템을 24개 포인트(S1–S24)로 실시간 양방향 연동',
      '환자 기록은 병원 대시보드로, 병원 응답은 환자 앱으로 자동 전달',
      '축적된 데이터로 선제 케어와 자연스러운 환자 유입 구조 설계',
    ],
    results: [
      { v: '+30%', l: '신규 환자 유입' },
      { v: '+45%', l: '외래 출석률' },
      { v: '-60%', l: '노쇼율' },
      { v: '+200%', l: '자연 검색 노출' },
    ],
    meta: '전국 165개 병원 연동 · 7년+ 자체 개발·운영',
    image: medImages.hospitalSys,
    to: '/healthcare',
    cta: '의료 AX 자세히 보기',
  },
  {
    no: '02',
    Icon: Database,
    tag: 'AI · Data',
    title: 'PVM 환자 데이터 분석 시스템',
    subtitle: '암 환자의 실제 목소리를 구조화한 데이터 자산',
    problem:
      '병원 마케팅은 대부분 감에 의존합니다. 환자가 실제로 무엇을 검색하고, 무엇을 두려워하며, 왜 병원을 옮기는지 — 데이터가 없었습니다.',
    approach: [
      '암 환자 실제 후기·경험 데이터 100,000건+ 지속 수집',
      '13개 분석 축으로 구조화한 독자 데이터베이스 구축',
      '자체 AI 분석 엔진으로 월간 리포트 자동 발행 체계 구성',
      '항암제 효과·부작용 매핑 등 임상 외 환자 경험 영역까지 확장',
    ],
    results: [
      { v: '100,000건+', l: '수집한 환자 후기' },
      { v: '13개 축', l: '분석 프레임워크' },
      { v: '15,000건+', l: '누적 AI 분석' },
      { v: '월 1회', l: '리포트 자동 발행' },
    ],
    meta: '의료 컨설팅 차별점의 근거가 되는 핵심 자산',
    image: homeImages.trust,
    to: '/insights',
    cta: '발행 리포트 보기',
  },
  {
    no: '03',
    Icon: MessageCircle,
    tag: 'Healthcare · AI',
    title: 'AI 암상담 시스템',
    subtitle: '24시간 작동하는 의료 상담 AI',
    problem:
      '환자와 보호자의 질문은 밤낮을 가리지 않습니다. 그러나 대부분의 병원은 진료시간 외에 답할 창구가 없습니다.',
    approach: [
      'Claude API 기반 RAG(검색 증강 생성) 아키텍처 설계',
      '한국 의료체계와 암 치료 과정을 반영한 지식 베이스 구축',
      '일반 챗봇이 아닌, 근거 문서를 참조해 답하는 구조로 구현',
      '의료광고법을 고려한 응답 범위 설계',
    ],
    results: [
      { v: '24시간', l: '상시 응대' },
      { v: 'RAG', l: '근거 기반 응답' },
      { v: '한국 특화', l: '의료체계 반영' },
      { v: '운영 중', l: '현재 작동 상태' },
    ],
    meta: '본 사이트에서 실제로 작동 중입니다',
    image: axImages.aiConsult,
    to: '/services',
    cta: 'AX 솔루션 보기',
  },
  {
    no: '04',
    Icon: Boxes,
    tag: 'Business · Automation',
    title: 'Space AX Platform',
    subtitle: '말로 설명하면 시스템이 대신 일합니다',
    problem:
      '중소기업의 반복 사무 업무는 여전히 수작업입니다. 자동화 도구는 있지만, 노드를 그릴 줄 아는 사람이 회사에 없습니다.',
    approach: [
      '읽기 → 가공 → 내보내기 사이클을 표준화한 자동화 엔진 설계',
      '카카오 알림톡·네이버웍스·한글·배민·더존 등 한국형 도구 연동',
      '업무를 말로 설명하면 자동화를 대신 설계해 주는 운영 방식 채택',
      '보고·요약·정리·응대 등 사무 영역 중심으로 적용',
    ],
    results: [
      { v: '한국형', l: '업무 도구 연동' },
      { v: '설계 대행', l: '노드 작업 불필요' },
      { v: '사무 전반', l: '적용 범위' },
      { v: '운영 중', l: '현재 상태' },
    ],
    meta: '기업 AX의 기반이 되는 자체 플랫폼',
    image: homeImages.spaceAx,
    to: '/business',
    cta: '기업 AX 자세히 보기',
  },
] as const;

/* ── 분야별 수행 영역 ──────────────────────────────── */
const areas = [
  {
    Icon: Search,
    tag: 'Web',
    title: 'AI 검색 최적화 웹사이트',
    body: 'Schema.org 구조화 데이터·FAQ·llms.txt까지 적용해, AI가 읽고 인용하는 구조로 홈페이지를 설계·구축합니다.',
  },
  {
    Icon: Globe,
    tag: 'Healthcare · Web',
    title: '암 요양병원 홈페이지',
    body: '의료광고심의를 통과한 병원 홈페이지를 다수 구축·운영하며 의료 콘텐츠 제작 기준을 축적했습니다.',
  },
  {
    Icon: Megaphone,
    tag: 'Marketing',
    title: '병원 온라인 홍보 대행',
    body: '블로그·플레이스·영상 콘텐츠를 의료광고법 검토와 함께 제작·운영합니다. 기획부터 발행까지 전 과정을 담당합니다.',
  },
  {
    Icon: FileText,
    tag: 'Report',
    title: '의료·기업 AI 리포트',
    body: '자체 분석 시스템으로 암종별 월간 의료 데이터 리포트와 기업 AX 산업 리포트를 발행합니다.',
  },
  {
    Icon: Code2,
    tag: 'SaaS',
    title: '맞춤 SaaS·플랫폼 개발',
    body: '업종별 요구에 맞춘 SaaS와 운영 플랫폼을 설계·개발합니다. 외주가 아닌 자체 개발 조직이 수행합니다.',
  },
  {
    Icon: Users,
    tag: 'Community',
    title: '제주 AI 개발 커뮤니티',
    body: '제주에서 AI 개발 커뮤니티를 운영하며 지역 인재·협업 네트워크를 만들어가고 있습니다.',
  },
] as const;

/* ── 기술 기반 ─────────────────────────────────────── */
const stack = [
  { label: 'Claude API', desc: 'AI 상담·분석 엔진' },
  { label: 'RAG 아키텍처', desc: '근거 기반 응답 구조' },
  { label: 'React · TypeScript', desc: '웹·앱 프런트엔드' },
  { label: 'Supabase', desc: '데이터베이스 · 인증 · 서버리스' },
  { label: 'Schema.org · llms.txt', desc: 'AI 검색 최적화(GEO/AEO)' },
  { label: '자체 분석 프레임워크', desc: '13개 축 데이터 구조화' },
] as const;

/* ── 병원 프로젝트 수행 이력 ───────────────────────
   수행한 용역의 '연도 + 수행 내용'만 기록한다.
   각 병원의 개원 여부·현재 운영 상태는 확인되지 않았으므로 표기하지 않는다. */
const hospitalProjects = [
  {
    name: '가평산속요양병원',
    meta: '암특화 요양병원 · 120병상 · 가평',
    cats: ['병원 기획', '홍보·경영지원'],
    works: [
      { year: '2011', body: '암특화 의학·한의학 통합 암요양병원 기획' },
      { year: '2018', body: '온라인 홍보 및 홈페이지 리뉴얼' },
    ],
  },
  {
    name: '목토한방병원',
    meta: '암특화 한방병원',
    cats: ['개원기획'],
    works: [{ year: '2017', body: '암특화 한방병원 개원기획' }],
  },
  {
    name: '감인의료재단 백세요양병원',
    meta: '암특화 요양병원 · 3개 병원',
    cats: ['홍보·경영지원'],
    works: [{ year: '2018', body: '암특화 요양병원 홍보대행 및 경영지원' }],
  },
  {
    name: '서울힐링요양병원',
    meta: '암특화 요양병원 · 113병상 · 서울 송파',
    cats: ['개원기획', '홍보·경영지원'],
    works: [{ year: '2019', body: '암특화 요양병원 개원기획 및 홍보·경영지원' }],
  },
  {
    name: '태동의료법인',
    meta: '암특화 의료법인 · 춘천',
    cats: ['개설컨설팅'],
    works: [{ year: '2019', body: '암특화 의료법인 개설컨설팅' }],
  },
  {
    name: '이채한방병원',
    meta: '암특화 한방병원 · 3천평 · 일산',
    cats: ['개설컨설팅'],
    works: [{ year: '2019', body: '암특화 한방병원 개원컨설팅' }],
  },
  {
    name: '러스크서울병원',
    meta: '재활 + 암진료 접목',
    cats: ['홍보·경영지원'],
    works: [{ year: '2020', body: '병원 이전 이후 컨설팅' }],
  },
  {
    name: '아미나요양병원',
    meta: '암특화 · 1천평 · 서울 종로',
    cats: ['개설컨설팅'],
    works: [{ year: '2021', body: '암특화 한방병원 개원컨설팅' }],
  },
  {
    name: '위비앙병원',
    meta: '비만외과(수술) + 암진료 · 서울 마포',
    cats: ['개설컨설팅'],
    works: [{ year: '2021', body: '암특화 병원 개원컨설팅' }],
  },
] as const;

/* ── 병원 프로젝트 요약 지표 (원문에서 셀 수 있는 값) ── */
const hospitalRecord = [
  { v: '9곳', l: '병원·의료법인 프로젝트' },
  { v: '6곳', l: '개원기획·개설컨설팅 수행' },
  { v: '10건', l: '연도별 수행 이력' },
  { v: '2011–2021', l: '수행 기간' },
] as const;

export function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="프로젝트 · 개발 사례 | LS AX 컨설팅"
        description="LS AX 컨설팅이 직접 개발하고 운영 중인 플랫폼과 프로젝트. HappyLifeCare(전국 165개 병원 연동), PVM 환자 데이터 분석, AI 암상담 시스템, Space AX Platform과 15년+ 의료·기업 현장 이력."
        keywords="LS AX 프로젝트, AI 개발 사례, HappyLifeCare, Cancer Hospital Platform, PVM 분석, AI 암상담 시스템, Space AX Platform, 의료 AI 개발, 병원 플랫폼 개발, 제주 AI 개발"
        url="https://www.lsconsulting.co.kr/projects"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
              { '@type': 'ListItem', position: 2, name: '프로젝트', item: 'https://www.lsconsulting.co.kr/projects' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: '프로젝트 · 개발 사례 — LS AX 컨설팅',
            url: 'https://www.lsconsulting.co.kr/projects',
            about: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: featured.map((f, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: f.title,
                description: f.subtitle,
              })),
            },
          },
        ]}
      />

      {/* ── SECTION 1 · HERO ───────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.86) 50%, rgba(10,22,40,0.97) 100%), url(${axImages.platform})`,
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
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-44 pb-28" {...fadeIn}>
          <div className="max-w-4xl">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}
            >
              Projects · 프로젝트와 이력
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              말이 아니라
              <br />
              <span style={{ color: 'var(--navy-300)' }}>만든 것</span>으로 증명합니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              AI를 소개하는 회사는 많습니다. LS AX 컨설팅은 직접 개발해 운영합니다.
              아래는 실제로 만들어 지금도 돌아가고 있는 것들입니다.
            </p>
          </div>

          {/* 지표 스트립 */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-12 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.14)' }}
            {...staggerContainer}
          >
            {stats.map(({ value, label }) => (
              <motion.div key={label} variants={staggerItem}>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1.5">{value}</div>
                <div className="text-sm" style={{ color: 'var(--navy-300)' }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2 · 대표 프로젝트 ──────────────────── */}
      <section className="py-28 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <motion.div className="max-w-3xl mb-20" {...fadeIn}>
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              FEATURED WORK
            </span>
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5"
              style={{ color: 'var(--navy-900)' }}
            >
              대표 프로젝트
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              어떤 문제를 보았고, 어떻게 접근했으며, 무엇이 달라졌는지를 그대로 적었습니다.
            </p>
          </motion.div>

          <div className="space-y-28">
            {featured.map(({ no, Icon, tag, title, subtitle, problem, approach, results, meta, image, to, cta }, i) => (
              <motion.article key={title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center" {...fadeIn}>
                {/* 이미지 — 짝수 인덱스는 좌, 홀수는 우 */}
                <div className={`relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                    style={{ backgroundColor: 'var(--navy-100)' }}
                  >
                    <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0) 45%, rgba(10,22,40,0.8) 100%)' }}
                    />
                    <span
                      className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur"
                      style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                      {tag}
                    </span>
                  </div>

                  {/* 결과 지표 */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    {results.map(({ v, l }) => (
                      <div key={l} className="rounded-xl px-4 py-3.5" style={{ backgroundColor: 'var(--navy-50)' }}>
                        <div className="text-lg font-bold tabular-nums" style={{ color: 'var(--navy-900)' }}>
                          {v}
                        </div>
                        <div className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--navy-600)' }}>
                          {l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 본문 */}
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-4xl font-bold tabular-nums" style={{ color: 'var(--navy-200)' }}>
                      {no}
                    </span>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: 'var(--navy-900)' }}>
                        {title}
                      </h3>
                      <p className="text-base mt-1" style={{ color: 'var(--navy-600)' }}>
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mb-7">
                    <div className="text-xs font-bold tracking-wide mb-2" style={{ color: 'var(--navy-600)' }}>
                      PROBLEM · 문제
                    </div>
                    <p className="text-base lg:text-lg leading-relaxed font-medium" style={{ color: 'var(--navy-900)' }}>
                      {problem}
                    </p>
                  </div>

                  <div className="text-xs font-bold tracking-wide mb-3" style={{ color: 'var(--navy-600)' }}>
                    APPROACH · 접근
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {approach.map((a) => (
                      <li key={a} className="flex gap-3">
                        <CheckCircle2
                          className="w-5 h-5 shrink-0 mt-0.5"
                          style={{ color: 'var(--navy-600)' }}
                          strokeWidth={1.75}
                        />
                        <span className="text-base leading-relaxed" style={{ color: 'var(--navy-700)' }}>
                          {a}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm mb-7 pb-7 border-b" style={{ color: 'var(--navy-500)', borderColor: 'var(--navy-100)' }}>
                    {meta}
                  </p>

                  <Link
                    to={to}
                    className="inline-flex items-center gap-2 text-base font-semibold transition-all hover:gap-3"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 · 분야별 수행 영역 ───────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
              WHAT WE BUILD
            </span>
            <h2
              className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5"
              style={{ color: 'var(--navy-900)' }}
            >
              그 외 수행 영역
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              플랫폼 개발 외에도 웹·콘텐츠·데이터 영역에서 실제 작업을 수행하고 있습니다.
            </p>
          </div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerContainer}>
            {areas.map(({ Icon, tag, title, body }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="bg-white rounded-2xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'var(--navy-50)' }}
                >
                  <Icon className="w-6 h-6" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                </div>
                <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--navy-500)' }}>
                  {tag}
                </span>
                <h3 className="text-lg font-bold mt-1.5 mb-3" style={{ color: 'var(--navy-900)' }}>
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

      {/* ── SECTION 4 · 기술 기반 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">
            <div>
              <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
                TECH BASE
              </span>
              <h2
                className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5"
                style={{ color: 'var(--navy-900)' }}
              >
                무엇으로 만드는가
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                외부 서비스를 연결하는 데 그치지 않습니다. 분석 프레임워크부터 응답 구조까지
                직접 설계하고 운영합니다.
              </p>
            </div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1" {...staggerContainer}>
              {stack.map(({ label, desc }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  className="flex items-baseline justify-between gap-4 py-4 border-b"
                  style={{ borderColor: 'var(--navy-100)' }}
                >
                  <span className="text-base font-bold" style={{ color: 'var(--navy-900)' }}>
                    {label}
                  </span>
                  <span className="text-sm text-right shrink-0" style={{ color: 'var(--navy-600)' }}>
                    {desc}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── SECTION 5 · 병원 프로젝트 수행 이력 ────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto" {...fadeIn}>
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-300)' }}>
              HOSPITAL PROJECTS
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5 text-white">
              병원 프로젝트 수행 이력
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              2011년부터 암특화 요양병원·한방병원·의료법인의 개원기획, 개설컨설팅, 홍보·경영지원을
              수행했습니다. 플랫폼 개발의 출발점은 이 현장입니다.
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" {...staggerContainer}>
            {hospitalProjects.map(({ name, meta, cats, works }) => (
              <motion.div
                key={name}
                variants={staggerItem}
                className="rounded-2xl p-7 flex flex-col"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cats.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] font-bold rounded-full px-2.5 py-1"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold text-white">{name}</h3>
                <div className="text-xs mt-1" style={{ color: 'var(--navy-300)' }}>
                  {meta}
                </div>
                <ol className="mt-5 pt-5 space-y-2.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  {works.map(({ year, body }) => (
                    <li key={year} className="grid grid-cols-[48px_1fr] gap-3">
                      <span className="text-sm font-bold tabular-nums text-white">{year}</span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-200)' }}>
                        {body}
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </motion.div>

          {/* 요약 지표 */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 pt-12 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.14)' }}
            {...staggerContainer}
          >
            {hospitalRecord.map(({ v, l }) => (
              <motion.div key={l} variants={staggerItem}>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1.5 tabular-nums">{v}</div>
                <div className="text-sm" style={{ color: 'var(--navy-300)' }}>
                  {l}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10">
            <p className="text-xs leading-relaxed" style={{ color: 'var(--navy-400)' }}>
              수행 연도와 내용 기준. 가평산속요양병원은 2011·2018년 두 차례 수행,
              감인의료재단 백세요양병원(3개 병원)은 1개 프로젝트로 집계했습니다.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white shrink-0 transition-all hover:gap-3"
            >
              대표 이력 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 6 · 다음 단계 ──────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MotionLink
              to="/healthcare"
              variants={staggerItem}
              className="group bg-white rounded-2xl p-10 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--navy-50)' }}
              >
                <Stethoscope className="w-6 h-6" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                의료 AX 보기
              </h3>
              <p className="text-base leading-relaxed mb-7 flex-1" style={{ color: 'var(--navy-600)' }}>
                병원 AI 검색 최적화와 HappyLifeCare 플랫폼이 실제로 어떻게 작동하는지 확인하세요.
              </p>
              <span
                className="inline-flex items-center gap-2 text-base font-semibold transition-all group-hover:gap-3"
                style={{ color: 'var(--navy-900)' }}
              >
                의료 분야 <ArrowRight className="w-4 h-4" />
              </span>
            </MotionLink>

            <MotionLink
              to="/business"
              variants={staggerItem}
              className="group bg-white rounded-2xl p-10 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: 'var(--navy-50)' }}
              >
                <Building2 className="w-6 h-6" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                기업 AX 보기
              </h3>
              <p className="text-base leading-relaxed mb-7 flex-1" style={{ color: 'var(--navy-600)' }}>
                반복 업무를 자동화 시스템으로 전환한 방식과 한국형 도구 연동 사례를 확인하세요.
              </p>
              <span
                className="inline-flex items-center gap-2 text-base font-semibold transition-all group-hover:gap-3"
                style={{ color: 'var(--navy-900)' }}
              >
                기업 분야 <ArrowRight className="w-4 h-4" />
              </span>
            </MotionLink>
          </div>

          <div className="text-center mt-16">
            <p className="text-lg mb-7" style={{ color: 'var(--navy-600)' }}>
              비슷한 프로젝트를 검토 중이시라면, 먼저 이야기부터 들려주세요.
            </p>
            <a
              href="mailto:fusionsfc@gmail.com"
              className="inline-flex items-center gap-2 px-10 py-5 text-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span className="font-semibold">이메일로 문의하기</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
