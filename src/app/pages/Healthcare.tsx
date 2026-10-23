import React from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeftRight,
  Phone,
  Mail,
  CheckCircle2,
  Ban,
  Globe,
  Bot,
  CalendarCheck,
  LayoutDashboard,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  ClipboardList,
  Search,
  MessageSquare,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { medImages, homeImages } from '../data/homeImages';
import { fadeIn, staggerContainer, staggerItem } from '../lib/motion';

const PHONE = '010-9297-0940';
const PHONE_DIAL = 'tel:+821092970940';
const EMAIL = 'fusionsfc@gmail.com';

/* ── 왜 지금인가 — 검색이 바뀌었다 ─────────────────── */
const whyNow = [
  {
    Icon: Search,
    title: '예전엔 목록 안에만 있으면 됐습니다',
    body: '네이버에서 "노형동 내과"를 치면 10곳이 쭉 나왔고, 우리 병원도 그 안에 있었습니다. 플레이스 등록만으로 충분했던 이유입니다.',
  },
  {
    Icon: Bot,
    title: '지금은 AI가 몇 곳만 골라 답합니다',
    body: '네이버·구글 검색이 AI 답변으로 바뀌고 있습니다. 답변은 목록이 아니라 문장이고, 문장에는 몇 곳만 들어갑니다. 거기 없으면 환자는 우리 병원을 보지 못합니다.',
  },
  {
    Icon: Globe,
    title: 'AI는 홈페이지의 문장을 읽습니다',
    body: '플레이스에는 위치와 전화번호뿐, AI가 읽을 문장이 없습니다. 진료 범위·원장님 경력·자주 묻는 질문이 AI가 읽을 수 있는 형식으로 있어야 답변에 들어갑니다.',
  },
] as const;

/* ── 원장님이 하실 수 있는 것 3단계 ────────────────── */
const threeSteps = [
  {
    n: '1',
    tag: '무료',
    title: '내 병원 페이지부터 고치세요',
    body: '제주닥터에는 제주 987곳 병의원 페이지가 전부 있습니다. 원장님 병원도요. 지금은 공개 정보만 있어 진료시간이 비어 있습니다. 무료로 관리 신청하면 진료시간·휴진·사진·의료진을 직접 고치고, 대기실 QR로 환자가 바로 찾게 할 수 있습니다.',
    points: ['진료시간 · 휴진 · 사진 · 의료진 직접 관리', '대기실 QR 포스터', '순서는 이름·거리뿐 — 돈 내는 병원이 앞에 서지 않습니다'],
  },
  {
    n: '2',
    tag: '운영에 AI',
    title: '전화 받으며 10초 예약, 확인콜은 자동으로',
    body: '병원 오피스는 의원 데스크의 하루를 위한 프로그램입니다. 온라인 예약 요청이 예약 장부로 들어오고, 확인콜·노쇼·리콜이 자동으로 잡히고, 환자와 소통함으로 이어집니다. 밤에는 AI 상담이 진료시간·위치·준비물을 대신 답합니다.',
    points: ['온라인 예약 → 예약 장부 (전화·현장 접수와 병행)', 'AI 상담 — 안내 수준, 진료 상담은 하지 않습니다', '"이번 달 우리 페이지가 몇 번 열리고 전화가 몇 건 왔는지" 숫자로 봅니다'],
  },
  {
    n: '3',
    tag: '맡기기',
    title: '홍보까지 맡기면, 원장님은 월 1회 검수만',
    body: '블로그·인스타그램·유튜브 콘텐츠 제작과 발행, AI가 읽는 홈페이지, 병원 맞춤 온라인 프로그램 개발까지 한 패키지로. 모든 원고는 의료광고법 검토를 거칩니다.',
    points: ['월 50만 원부터, 세 단계', '건당 수수료 없음 · 정액', '기획 · 원고 · 촬영 · 편집 · 업로드까지 저희가'],
  },
] as const;

/* ── EMR이 못 하는 것 ─────────────────────────────── */
const emrRows = [
  { need: '환자가 우리 병원을 찾는다', emr: '—', us: '제주닥터 페이지 관리 · 블로그 · 인스타그램 · 유튜브 쇼츠' },
  { need: '온라인으로 예약이 들어온다', emr: '전화·현장만', us: '제주닥터 예약 요청 → 오피스 예약 장부 (전화·현장과 병행)' },
  { need: '밤에도 질문에 답한다', emr: '—', us: 'AI 상담 — 진료시간·위치·준비물 안내 (진료 상담은 하지 않음)' },
  { need: 'AI 검색에 읽히는 홈페이지', emr: '—', us: 'AI가 읽을 수 있는 형식의 홈페이지 제작·운영' },
  { need: '확인콜 · 노쇼 · 리콜', emr: '일부', us: '오피스에서 자동 생성, 원버튼 기록' },
  { need: '우리 병원만의 온라인 프로그램', emr: '—', us: '예약 · 안내 · 검진 신청 등 병원 맞춤 프로그램 개발' },
  { need: '진료 · 처방 · 청구', emr: '○', us: '— 하지 않습니다. EMR과 경쟁하지 않습니다' },
] as const;

/* ── 패키지 3단계 ──────────────────────────────────── */
const tiers = [
  {
    name: '스타트',
    price: '50',
    who: '처음 시작하는 의원 · 치과',
    items: ['제주닥터 페이지 관리 대행', '블로그 · 인스타그램 콘텐츠', '온라인 예약 연계 (오피스 기본)', '월간 리포트'],
    featured: false,
  },
  {
    name: '스탠다드',
    price: '80',
    who: '신규 환자가 필요한 의원',
    items: ['스타트 전부', '유튜브 쇼츠 제작·업로드', 'AI 상담 (안내 수준)', '확인콜 · 노쇼 · 리콜 자동화'],
    featured: true,
  },
  {
    name: '프리미엄',
    price: '150',
    who: '병원 · 요양병원',
    items: ['스탠다드 전부', 'AI 홈페이지 제작 · 운영', '병원 맞춤 오피스 프로그램 개발', '진료과별 페이지 · 전담 담당자 월 방문'],
    featured: false,
  },
] as const;

const tierNotes = [
  '원장님이 하실 일은 월 1회 검수뿐입니다.',
  '예약·내원 건당 수수료는 어떤 단계에도 없습니다. 정액만 받습니다.',
  '온라인 예약은 전화·현장 접수와 함께 운영합니다.',
  '모든 콘텐츠는 의료광고법 검토 후 발행합니다. 규모가 큰 맞춤 개발은 별도 견적입니다.',
] as const;

/* ── 제주닥터 — 하지 않는 것 ───────────────────────── */
const jejudoctorNo = [
  '예약 · 내원 건당 수수료를 받지 않습니다',
  '순위를 팔지 않습니다 — 순서는 이름 · 거리뿐',
  '별점 · 후기 순위를 만들지 않습니다',
  '광고는 "광고"라고 표시합니다',
] as const;

/* ── 병원급 · HappyLifeCare (압축) ──────────────────── */
const platformStats = [
  { value: '165개', label: '전국 연동 병원' },
  { value: '24가지', label: '병원 ↔ 환자 앱 실시간 주고받기' },
  { value: '407편', label: '건강정보 콘텐츠' },
  { value: '311개', label: '근거 기반 추천 루틴' },
] as const;

const products = [
  {
    Icon: Smartphone,
    image: medImages.patientApp,
    name: 'HappyLife',
    role: '환자 · 보호자 앱',
    desc: '진단받은 날부터 회복까지, 환자의 하루에 함께하는 앱. 맞춤 홈 · 건강 루틴 · 질문과 답 · 건강정보를 한곳에서.',
  },
  {
    Icon: LayoutDashboard,
    image: medImages.hospitalSys,
    name: 'HappyCare',
    role: '병원 관리 화면',
    desc: '의료진을 위한 케어 운영 화면. 환자 관리 · 단계별 상담 · 질문 응대 · 일정 · 배차를 하나로.',
  },
] as const;

const syncPairs = [
  ['환자가 건강 기록을 입력하면', '병원 화면에 바로 보입니다'],
  ['치료 알림이 자동으로 나가면', '노쇼가 줄어듭니다'],
  ['환자가 일정 변경을 요청하면', '병원이 바로 확인합니다'],
  ['병원이 답하면', '환자 앱에 바로 닿습니다'],
] as const;

const effectHighlights = [
  { v: '+30%', l: '신규 환자 유입' },
  { v: '+45%', l: '외래 출석률' },
  { v: '-60%', l: '노쇼율' },
  { v: '+200%', l: '자연 검색 노출' },
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

/* ── 전화 버튼 (공통) ──────────────────────────────── */
function CallButton({ light = false, big = false }: { light?: boolean; big?: boolean }) {
  return (
    <a
      href={PHONE_DIAL}
      className={`inline-flex items-center justify-center gap-2.5 ${big ? 'px-10 py-5 text-lg' : 'px-8 py-4'} font-semibold transition-all hover:opacity-90 w-full sm:w-auto`}
      style={light ? { backgroundColor: 'white', color: 'var(--navy-900)' } : { backgroundColor: 'var(--navy-900)', color: 'white' }}
    >
      <Phone className={big ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>전화 한 통이면 됩니다 · {PHONE}</span>
    </a>
  );
}

export function Healthcare() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="제주 병의원 온라인 홍보 · AI 상담 · 병원 오피스 | 월 50만 원부터 - LS AX 컨설팅"
        description="제주 987곳 병의원 포털 '제주닥터'에 원장님 병원 페이지가 이미 있습니다. 블로그·인스타그램·유튜브 홍보대행, EMR이 못 하는 온라인 예약·AI 상담·병원 오피스 프로그램, AI가 읽는 홈페이지를 월 50만~150만 원 패키지로."
        keywords="제주 병원 홍보, 제주 의원 마케팅, 병원 블로그 대행, 병원 인스타그램, 병원 유튜브 쇼츠, 병원 AI 상담, 병원 온라인 예약, 병원 오피스 프로그램, 제주닥터, AI 최적화 홈페이지, 의료 AI 컨설팅, HappyLifeCare"
        url="https://www.lsconsulting.co.kr/healthcare"
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.lsconsulting.co.kr/' },
            { '@type': 'ListItem', position: 2, name: '의료', item: 'https://www.lsconsulting.co.kr/healthcare' },
          ] },
          { '@context': 'https://schema.org', '@type': 'Service', name: '제주 병의원 온라인 홍보 · AI 상담 · 병원 오피스 패키지', serviceType: ['병원 온라인 홍보대행', '병원 AI 상담', '병원 오피스 프로그램 개발', 'AI 최적화 홈페이지 제작', 'HappyLifeCare 플랫폼'], areaServed: ['제주특별자치도', 'KR'], audience: { '@type': 'Audience', audienceType: '제주 의원 · 치과 · 병원 · 요양병원' }, url: 'https://www.lsconsulting.co.kr/healthcare', provider: { '@type': 'Organization', name: 'LS AX 컨설팅', '@id': 'https://www.lsconsulting.co.kr/#org' },
            offers: tiers.map((t) => ({ '@type': 'Offer', name: `${t.name} 패키지`, price: `${t.price}0000`, priceCurrency: 'KRW', description: t.items.join(' · ') })) },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: '제주닥터는 무엇인가요?', acceptedAnswer: { '@type': 'Answer', text: '제주 987곳 병의원이 빠짐없이 같은 기준으로 등록된 의료기관 포털입니다. 밤·주말·연휴에 문 연 곳을 한 화면에 모으고, 병원은 무료로 자기 페이지의 진료시간·휴진·사진을 직접 관리할 수 있습니다. 예약·내원 건당 수수료를 받지 않고 순위를 팔지 않습니다. LS AX 컨설팅이 직접 만들어 운영합니다.' } },
              { '@type': 'Question', name: '기존 EMR과 무엇이 다른가요?', acceptedAnswer: { '@type': 'Answer', text: 'EMR은 진료와 청구를 합니다. 환자가 오기 전(찾기·예약)과 다녀간 뒤(소통·재방문)는 비어 있습니다. LS AX 패키지는 그 빈자리만 채웁니다 — 온라인 홍보, 온라인 예약 연계, AI 상담, 병원 오피스 프로그램, AI가 읽는 홈페이지. 진료·처방·청구는 하지 않습니다.' } },
              { '@type': 'Question', name: '비용은 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '월 50만 원(스타트), 80만 원(스탠다드), 150만 원(프리미엄) 세 단계입니다. 정액이며 예약·내원 건당 수수료는 없습니다. 규모가 큰 맞춤 개발은 별도 견적입니다.' } },
              { '@type': 'Question', name: 'AI 상담은 진료 상담도 하나요?', acceptedAnswer: { '@type': 'Answer', text: '아니요. 진료시간·위치·주차·준비물·예약 방법 같은 안내만 답합니다. 증상이나 치료에 대한 상담은 하지 않습니다.' } },
              { '@type': 'Question', name: '왜 지금 AI가 읽는 홈페이지가 필요한가요?', acceptedAnswer: { '@type': 'Answer', text: '네이버·구글 검색이 목록에서 AI 답변으로 바뀌고 있습니다. AI는 홈페이지의 문장을 읽고 몇 곳만 골라 답합니다. 플레이스에는 위치와 전화번호만 있어 AI가 읽을 문장이 없습니다. 진료 범위·의료진·자주 묻는 질문을 AI가 읽을 수 있는 형식으로 담아야 답변에 들어갈 수 있습니다.' } },
            ],
          },
        ]}
      />

      {/* ── 1 · HERO ────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,22,40,0.86) 0%, rgba(10,22,40,0.72) 45%, rgba(10,22,40,0.95) 100%), url(${medImages.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        />
        <motion.div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 pt-40 pb-28" {...fadeIn}>
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              제주 병의원 원장님께
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.15] mt-8 text-white font-bold">
              원장님 병원,
              <br />
              <span style={{ color: 'var(--navy-300)' }}>제주닥터</span>에 이미 올라가 있습니다
            </h1>
            <p className="text-lg lg:text-xl mt-8 max-w-2xl leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              제주 987곳 병의원이 빠짐없이 등록된 포털입니다. 진료시간과 휴진만 직접 고쳐도 환자가 찾기 쉬워집니다. 무료입니다.
              홍보와 운영까지 맡기시면 <span className="text-white font-semibold">월 50만~150만 원</span>입니다.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-12">
              <CallButton light />
              <a
                href="#package"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              >
                <span>패키지와 가격 보기</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 2 · 왜 지금 ─────────────────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>왜 지금인가</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              이제 환자분들이 네이버·구글에서
              <br className="hidden sm:block" />
              AI로 병원을 찾습니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              플레이스가 틀린 건 아닙니다. 그때는 맞았고, 지금 조건이 바뀐 것입니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {whyNow.map(({ Icon, title, body }) => (
              <motion.div variants={staggerItem} key={title} className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-50)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── 3 · 원장님이 하실 수 있는 것 3단계 ─────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>세 단계</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              무료로 시작해서, 필요한 만큼만
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              내 병원 페이지 고치기 → 운영에 AI 붙이기 → 홍보까지 맡기기. 어디서 멈추셔도 됩니다.
            </p>
          </div>
          <div className="space-y-6">
            {threeSteps.map(({ n, tag, title, body, points }) => (
              <motion.div key={n} className="bg-white rounded-2xl p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-[72px_1fr_1fr] gap-6 lg:gap-10" {...fadeIn}>
                <div className="flex lg:flex-col items-center lg:items-start gap-3">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: 'var(--navy-900)' }}>{n}</span>
                  <span className="text-xs font-bold rounded-full px-3 py-1" style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}>{tag}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight" style={{ color: 'var(--navy-900)' }}>{title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--navy-700)' }}>{body}</p>
                </div>
                <ul className="space-y-2.5 lg:pt-1">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--navy-600)' }} strokeWidth={1.75} />
                      <span className="text-base leading-relaxed" style={{ color: 'var(--navy-800)' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── 4 · EMR이 못 하는 것 ─────────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16 bg-white" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>EMR이 못 하는 것, 저희가 만듭니다</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              EMR은 진료와 청구를 합니다.
              <br />
              환자가 오기 전과 다녀간 뒤는 비어 있습니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              그 빈자리만 채웁니다. 진료·처방·청구는 하지 않습니다.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--navy-100)' }}>
            <table className="w-full text-left" style={{ minWidth: 720 }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--navy-50)' }}>
                  <th className="px-6 py-4 text-sm font-bold" style={{ color: 'var(--navy-600)' }}>원장님이 필요한 것</th>
                  <th className="px-6 py-4 text-sm font-bold w-32" style={{ color: 'var(--navy-600)' }}>기존 EMR</th>
                  <th className="px-6 py-4 text-sm font-bold" style={{ color: 'var(--navy-600)' }}>LS AX 패키지</th>
                </tr>
              </thead>
              <tbody>
                {emrRows.map((r, i) => (
                  <tr key={r.need} className="border-t" style={{ borderColor: 'var(--navy-100)' }}>
                    <td className="px-6 py-4 text-base font-semibold" style={{ color: 'var(--navy-900)' }}>{r.need}</td>
                    <td className="px-6 py-4 text-base" style={{ color: 'var(--navy-500)' }}>{r.emr}</td>
                    <td className="px-6 py-4 text-base" style={{ color: i === emrRows.length - 1 ? 'var(--navy-500)' : 'var(--navy-800)' }}>{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* ── 5 · 패키지와 가격 ────────────────────────────── */}
      <motion.section id="package" className="py-28 px-8 lg:px-16 scroll-mt-20" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>패키지와 가격</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              월 50만~150만 원, 세 가지 중 고르세요
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              정액입니다. 건당 수수료는 없습니다. 원장님은 월 1회 검수만 하시면 됩니다.
            </p>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerContainer}>
            {tiers.map(({ name, price, who, items, featured }) => (
              <motion.div
                variants={staggerItem}
                key={name}
                className="rounded-2xl p-8 flex flex-col"
                style={featured ? { backgroundColor: 'var(--navy-900)', color: 'white' } : { backgroundColor: 'white' }}
              >
                <div className="text-sm font-bold tracking-wide" style={{ color: featured ? 'var(--navy-300)' : 'var(--navy-600)' }}>{name}</div>
                <div className="flex items-baseline gap-1 mt-3 mb-1">
                  <span className="text-sm" style={{ color: featured ? 'var(--navy-200)' : 'var(--navy-600)' }}>월</span>
                  <span className="text-5xl font-bold tracking-tight tabular-nums">{price}</span>
                  <span className="text-xl font-bold">만 원</span>
                </div>
                <div className="text-sm mb-7" style={{ color: featured ? 'var(--navy-200)' : 'var(--navy-500)' }}>{who}</div>
                <ul className="space-y-3 flex-1">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: featured ? 'var(--navy-300)' : 'var(--navy-600)' }} strokeWidth={1.75} />
                      <span className="text-base leading-relaxed" style={{ color: featured ? 'white' : 'var(--navy-800)' }}>{it}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={PHONE_DIAL}
                  className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold transition-all hover:opacity-90"
                  style={featured ? { backgroundColor: 'white', color: 'var(--navy-900)' } : { backgroundColor: 'var(--navy-900)', color: 'white' }}
                >
                  <Phone className="w-4 h-4" /> 전화로 상담하기
                </a>
              </motion.div>
            ))}
          </motion.div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 mt-10 max-w-4xl mx-auto">
            {tierNotes.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--navy-700)' }}>
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--navy-600)' }} />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* ── 6 · 제주닥터란 ───────────────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(var(--navy-300) 1px, transparent 1px), linear-gradient(90deg, var(--navy-300) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />
        <motion.div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start" {...fadeIn}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--navy-200)' }}>
              <ClipboardList className="w-3.5 h-3.5" /> 제주닥터 · jejudoctor.com
            </span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mt-6 mb-5">
              제주에서 아플 때,
              <br />
              지금 갈 수 있는 곳부터
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-200)' }}>
              제주 987곳 병의원이 빠짐없이 같은 기준으로 올라가 있고, 밤·주말·연휴에 문 연 곳과 심평원 지정 소아 야간 진료기관을 한 화면에 모읍니다.
              병원은 무료로 자기 페이지를 직접 관리하고, 환자 문의와 예약 요청을 오피스로 받습니다. LS AX 컨설팅이 직접 만들어 운영합니다.
            </p>
          </div>
          <div className="rounded-2xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <h3 className="text-lg font-bold text-white mb-5">제주닥터가 하지 않는 것</h3>
            <ul className="space-y-4">
              {jejudoctorNo.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Ban className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--navy-300)' }} strokeWidth={1.75} />
                  <span className="text-base leading-relaxed text-white/90">{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-6 pt-6 border-t" style={{ color: 'var(--navy-300)', borderColor: 'rgba(255,255,255,0.12)' }}>
              병원이 믿고 들어올 수 있어야 환자도 믿습니다. 그래서 중립이 먼저입니다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── 7 · 병원급 · 암 전문 병원이라면 ─────────────── */}
      <motion.section id="happylifecare" className="py-28 px-8 lg:px-16 bg-white scroll-mt-20" {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>병원급 · 암 전문 병원이라면 — HappyLifeCare</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              퇴원해도 환자와 병원이
              <br className="hidden sm:block" />
              끊기지 않습니다
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              환자 앱(HappyLife)과 병원 관리 화면(HappyCare)이 실시간으로 주고받는 암 환자 통합 케어 플랫폼입니다.
              7년 넘게 직접 개발해 운영하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {platformStats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: 'var(--navy-50)' }}>
                <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>{value}</div>
                <div className="text-sm leading-snug" style={{ color: 'var(--navy-600)' }}>{label}</div>
              </div>
            ))}
          </div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14" {...staggerContainer}>
            {products.map(({ Icon, image, name, role, desc }) => (
              <motion.div variants={staggerItem} key={name} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--navy-100)' }}>
                <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                  <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur" style={{ backgroundColor: 'rgba(10,22,40,0.7)' }}>
                    <Icon className="w-3.5 h-3.5" />
                    {role}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{name}</h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--navy-600)' }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-50)' }}>
              <div className="flex items-center gap-2 mb-5">
                <ArrowLeftRight className="w-5 h-5" style={{ color: 'var(--navy-600)' }} />
                <h3 className="text-lg font-bold" style={{ color: 'var(--navy-900)' }}>병원과 환자 앱이 실시간으로 주고받는 24가지 중</h3>
              </div>
              <ul className="space-y-3">
                {syncPairs.map(([a, b]) => (
                  <li key={a} className="flex items-start gap-2.5 text-base leading-relaxed" style={{ color: 'var(--navy-800)' }}>
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1.5" style={{ color: 'var(--navy-500)' }} />
                    <span>{a} <b>{b}</b></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--navy-900)' }}>
              <h3 className="text-lg font-bold text-white mb-6">도입 병원에서 확인한 변화</h3>
              <div className="grid grid-cols-2 gap-6">
                {effectHighlights.map(({ v, l }) => (
                  <div key={l}>
                    <div className="text-3xl lg:text-4xl font-bold text-white tabular-nums">{v}</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--navy-300)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-6 pt-5 border-t" style={{ color: 'var(--navy-300)', borderColor: 'rgba(255,255,255,0.12)' }}>
                HappyLifeCare 도입 병원 기준. 병원 규모와 환자 특성에 따라 다를 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── 8 · 현재 함께하는 병원 ───────────────────────── */}
      <motion.section className="py-28 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }} {...fadeIn}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>함께하는 병원</span>
            <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
              개원 컨설팅부터 홈페이지까지, 함께 해온 병원
            </h2>
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
                  <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold mt-4 self-start transition-all hover:gap-3" style={{ color: 'var(--navy-900)' }}>
                    <ExternalLink className="w-4 h-4" /> 홈페이지 바로가기
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/projects" className="inline-flex items-center gap-2 text-base font-semibold transition-all hover:gap-3" style={{ color: 'var(--navy-900)' }}>
              병원 프로젝트 9곳 전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── 9 · 연락 ─────────────────────────────────────── */}
      <section className="relative py-28 px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${homeImages.trust})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(10,22,40,0.85)' }} />
        <motion.div className="relative max-w-[1400px] mx-auto text-center" {...fadeIn}>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight text-white mb-6">
            우리 병원 페이지, 지금 어떻게 보이는지 알려드립니다
          </h2>
          <p className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: 'var(--navy-200)' }}>
            전화 주시면 원장님 병원이 제주닥터와 AI 검색에 지금 어떻게 나오는지 바로 확인해 드립니다. 비용 없고, 도입 의무 없습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <CallButton light big />
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg border-2 text-white transition-all hover:bg-white/10 w-full sm:w-auto"
              style={{ borderColor: 'rgba(255,255,255,0.35)' }}
            >
              <Mail className="w-5 h-5" />
              <span>이메일로 문의</span>
            </a>
          </div>
          <p className="text-sm mt-8" style={{ color: 'var(--navy-300)' }}>
            평일 10:00 – 18:00 · {EMAIL} · 제주 서귀포시 안덕면 · 언제든 찾아뵙습니다
          </p>
        </motion.div>
      </section>
    </div>
  );
}
