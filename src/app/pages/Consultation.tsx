import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router';
import {
  Clock, Sparkles, FileText, ArrowRight, ArrowLeft, CheckCircle, CheckCircle2,
  Heart, GraduationCap, Wrench, Building, AlertCircle, Mail, Phone, BookOpen,
  Loader2, LineChart, Workflow, Globe, Code2, Compass, Megaphone, Building2, Check,
} from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { SEO } from '../components/SEO';

// ─── Types ────────────────────────────────────────────────────────────────────

type Industry = 'healthcare' | 'service' | 'education' | 'manufacturing' | 'public';
type Category = 'customerData' | 'marketing' | 'operations' | 'dataAnalytics' | 'aiReadiness';

type Question = {
  id: number;
  category: Category;
  question: string;
  description?: string;
  options: { score: number; text: string }[];
  isMultiSelect?: boolean;
};

type Answer = {
  questionId: number;
  score: number;
  value?: string;
};

type CategoryScores = Record<Category, number>;

type DiagnosisReport = {
  level: '초급' | '중급' | '고급';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  roadmap: { phase: string; title: string; content: string }[];
  recommendedSolution: { name: string; reason: string; nextStep: string };
  closingMessage: string;
};

type ContactInfo = {
  name: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  companySize: string;
  message: string;
  wantConsultation: boolean;
  wantNewsletter: boolean;
  agreePrivacy: boolean;
};

// ─── Industry Definitions ─────────────────────────────────────────────────────

const industries = [
  { id: 'healthcare' as Industry, Icon: Heart, name: '의료', target: '병원·의원·요양시설·헬스케어 스타트업' },
  { id: 'service' as Industry, Icon: Sparkles, name: '서비스', target: '청소·세무·법무·상담·미용 등 인력 운영형 서비스업' },
  { id: 'education' as Industry, Icon: GraduationCap, name: '교육', target: '학원·연수원·온라인 교육·평생교육' },
  { id: 'manufacturing' as Industry, Icon: Wrench, name: '제조', target: '제조업·B2B 산업·유통' },
  { id: 'public' as Industry, Icon: Building, name: '관공', target: '공공기관·협회·재단·NGO' },
] as const;

const industrySubtitles: Record<Industry, string> = {
  healthcare: '의료기관의 AI 도입 준비 정도를 진단합니다. 솔직하게 답해주실수록 정확한 결과가 나옵니다.',
  service: '서비스업의 AI 활용 가능성을 진단합니다. 솔직하게 답해주실수록 정확한 결과가 나옵니다.',
  education: '교육기관의 AI 적용 단계를 진단합니다. 솔직하게 답해주실수록 정확한 결과가 나옵니다.',
  manufacturing: '제조·B2B 산업의 AI 전환 준비도를 진단합니다. 솔직하게 답해주실수록 정확한 결과가 나옵니다.',
  public: '공공기관·협회의 AI 도입 가능성을 진단합니다. 솔직하게 답해주실수록 정확한 결과가 나옵니다.',
};

const industryKorean: Record<Industry, string> = {
  healthcare: '의료',
  service: '서비스',
  education: '교육',
  manufacturing: '제조',
  public: '관공',
};

// ─── Question Data ────────────────────────────────────────────────────────────

const Q = (id: number, category: Category, question: string, options: { score: number; text: string }[], description?: string, isMultiSelect?: boolean): Question =>
  ({ id, category, question, options, description, isMultiSelect });

const OPT = (score: number, text: string) => ({ score, text });

const LAST_Q_OPTIONS = [
  OPT(0, '고객 응대 자동화'),
  OPT(0, '마케팅·콘텐츠'),
  OPT(0, '데이터 분석'),
  OPT(0, '시스템 통합'),
  OPT(0, '기타'),
];

const AI_COMMON = (base: number): Question[] => [
  Q(base, 'aiReadiness', 'AI 관련 학습·활용 정도는 어느 수준인가요?', [
    OPT(1, '거의 모름'),
    OPT(2, '뉴스·기사로만 접함'),
    OPT(3, 'ChatGPT 정도 사용'),
    OPT(4, '적극 학습 중'),
    OPT(5, '사내에 AI 활용 전문가 있음'),
  ]),
  Q(base + 1, 'aiReadiness', 'AI 도입 예산 의향은 어느 정도인가요?', [
    OPT(1, '전혀 없음'),
    OPT(2, '매우 적음 (월 50만 원 이하)'),
    OPT(3, '적당함 (월 100-300만 원)'),
    OPT(4, '충분함 (월 500만 원 이상)'),
    OPT(5, '전사 디지털 전환 예산 보유'),
  ]),
  Q(base + 2, 'aiReadiness', '사내 AI 전담 인력이 있나요?', [
    OPT(1, '없음'),
    OPT(2, '일부 직원이 관심'),
    OPT(3, '한 명이 일부 시간 투입'),
    OPT(4, '전담 인력 1명 이상'),
    OPT(5, 'AI 팀 운영'),
  ]),
  Q(base + 3, 'aiReadiness', '임원진의 AI 도입 의지는 어느 수준인가요?', [
    OPT(1, '부정적'),
    OPT(2, '무관심'),
    OPT(3, '관심은 있음'),
    OPT(4, '적극 추진'),
    OPT(5, '명확한 비전 + 투자 결정'),
  ]),
];

const checklists: Record<Industry, Question[]> = {
  healthcare: [
    // 영역 1: 환자·고객 데이터 관리
    Q(1, 'customerData', '환자/고객 정보는 현재 어떻게 통합 관리되고 있나요?', [
      OPT(1, '종이 차트와 엑셀로 분산'),
      OPT(2, '부분 디지털화 (전자차트만)'),
      OPT(3, '전자차트 + 환자관리 시스템'),
      OPT(4, '시스템 + 자동 분석 리포트 정기 발행'),
      OPT(5, 'AI가 환자 데이터로 예측·추천 자동화'),
    ]),
    Q(2, 'customerData', '환자 상담·문의 응대는 주로 어떻게 이루어지나요?', [
      OPT(1, '전화·카톡으로 일일이 응대'),
      OPT(2, '전화·카톡 + 일부 자동 응답'),
      OPT(3, '챗봇 1차 응대 + 직원 2차'),
      OPT(4, 'AI 챗봇이 의료 컨텍스트 응대'),
      OPT(5, 'AI가 자체 의료 데이터 기반 24시간 상담'),
    ]),
    Q(3, 'customerData', '환자 이탈·재진 현황은 어떻게 추적하고 있나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '매월 수동으로 확인'),
      OPT(3, '시스템에서 정기 알림'),
      OPT(4, '이탈 패턴 자동 분석'),
      OPT(5, 'AI가 이탈 위험 환자 예측 + 사전 대응'),
    ]),
    Q(4, 'customerData', '환자 만족도·피드백은 어떻게 수집·활용하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '가끔 설문조사'),
      OPT(3, '정기 설문 + 분석'),
      OPT(4, '실시간 피드백 + 개선 시스템'),
      OPT(5, 'AI가 피드백 분석 + 개선 액션 자동 생성'),
    ]),
    Q(5, 'customerData', '개인정보·의료법 준수 체계는 어느 수준인가요?', [
      OPT(1, '잘 모르겠음'),
      OPT(2, '기본 동의서만'),
      OPT(3, '정기 점검 + 직원 교육'),
      OPT(4, '전담자 + 시스템 보안'),
      OPT(5, '보안 인증 보유 + 자동 감사 시스템'),
    ]),
    // 영역 2: 마케팅·환자 유입
    Q(6, 'marketing', '신환 유입 채널별 효과를 어떻게 파악하고 있나요?', [
      OPT(1, '어떤 채널이 효과적인지 모름'),
      OPT(2, '대략적인 추정'),
      OPT(3, '채널별 환자 수 측정'),
      OPT(4, '채널별 ROI + 전환율 추적'),
      OPT(5, 'AI가 채널별 성과 자동 분석 + 최적화'),
    ]),
    Q(7, 'marketing', '블로그·SNS는 어떻게 운영하고 있나요?', [
      OPT(1, '운영 안 함'),
      OPT(2, '가끔 직원이 작성'),
      OPT(3, '정기적으로 콘텐츠 발행'),
      OPT(4, '데이터 기반 콘텐츠 전략'),
      OPT(5, 'AI가 환자 트렌드 분석 → 콘텐츠 자동 생성'),
    ]),
    Q(8, 'marketing', '홈페이지의 AI 검색·온라인 노출 상태는 어떤가요?', [
      OPT(1, '홈페이지 없음 또는 매우 오래됨'),
      OPT(2, '홈페이지 있으나 검색 노출 안 됨'),
      OPT(3, '네이버·구글 SEO 적용'),
      OPT(4, 'AI 검색(ChatGPT 등) 노출 최적화'),
      OPT(5, 'AI 검색 + 실시간 분석 + 자동 개선'),
    ]),
    Q(9, 'marketing', '광고비 ROI는 어떻게 측정하고 있나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '매월 수기로 정리'),
      OPT(3, '채널별 ROI 측정'),
      OPT(4, '환자 LTV 기반 ROI 분석'),
      OPT(5, 'AI가 광고 효과 예측 + 자동 최적화'),
    ]),
    Q(10, 'marketing', '의료광고심의 대응 체계는 어느 수준인가요?', [
      OPT(1, '매번 반려되거나 우회'),
      OPT(2, '심의 의식하며 작성'),
      OPT(3, '심의 통과 패턴 정립'),
      OPT(4, '자동화된 심의 사전 검수 시스템'),
      OPT(5, 'AI가 심의 통과 가능성 사전 예측'),
    ]),
    // 영역 3: 운영·인력 시스템
    Q(11, 'operations', '임직원 업무는 어떻게 관리하고 있나요?', [
      OPT(1, '카톡과 메모로 관리'),
      OPT(2, '엑셀 또는 단순 도구'),
      OPT(3, '협업 도구 (노션·슬랙) 사용'),
      OPT(4, '자체 시스템 또는 통합 도구'),
      OPT(5, 'AI 어시스턴트가 업무 흐름 지원'),
    ]),
    Q(12, 'operations', '진료·상담 일정은 어떻게 관리하나요?', [
      OPT(1, '종이 또는 엑셀'),
      OPT(2, '단순 예약 시스템'),
      OPT(3, '환자별 자동 알림 시스템'),
      OPT(4, '시스템 + 데이터 분석'),
      OPT(5, 'AI가 일정 최적화 + 노쇼 예측'),
    ]),
    Q(13, 'operations', '재고·식이·약품 관리는 어떻게 하고 있나요?', [
      OPT(1, '수기 관리'),
      OPT(2, '엑셀 관리'),
      OPT(3, '시스템 관리'),
      OPT(4, '자동 재주문 + 알림'),
      OPT(5, 'AI가 수요 예측 + 자동 발주'),
    ]),
    Q(14, 'operations', '임직원 교육·온보딩은 어떻게 이루어지나요?', [
      OPT(1, '일대일 구두 교육'),
      OPT(2, '매뉴얼 문서로'),
      OPT(3, '디지털 매뉴얼 + 영상'),
      OPT(4, '시스템화된 교육 + KPI'),
      OPT(5, 'AI 챗봇이 직원 질문 24시간 응답'),
    ]),
    // 영역 4: 데이터·분석 활용
    Q(15, 'dataAnalytics', '회사 KPI는 어떻게 모니터링하고 있나요?', [
      OPT(1, '매출 정도만 봄'),
      OPT(2, '매월 엑셀 정리'),
      OPT(3, '자동 대시보드'),
      OPT(4, '실시간 KPI + 알림'),
      OPT(5, 'AI가 KPI 분석 + 액션 추천'),
    ]),
    Q(16, 'dataAnalytics', '경쟁 병원 현황 분석은 어떻게 하나요?', [
      OPT(1, '가끔 검색해봄'),
      OPT(2, '대략적인 비교'),
      OPT(3, '정기 모니터링'),
      OPT(4, '데이터 기반 분석'),
      OPT(5, 'AI가 경쟁 동향 자동 분석 + 알림'),
    ]),
    Q(17, 'dataAnalytics', '환자 트렌드·니즈 변화는 어떻게 파악하나요?', [
      OPT(1, '감으로 판단'),
      OPT(2, '진료 결과로 추정'),
      OPT(3, '데이터 분석'),
      OPT(4, '외부 데이터 결합 분석'),
      OPT(5, 'AI가 트렌드 예측 + 대응 추천'),
    ]),
    Q(18, 'dataAnalytics', '진료·치료 결과 분석은 어떻게 이루어지나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '부분적 측정'),
      OPT(3, '정기 측정 + 보고'),
      OPT(4, '환자별 추적 분석'),
      OPT(5, 'AI가 치료 효과 분석 + 개선 추천'),
    ]),
    // 영역 5: AI 도입 의지·자원
    ...AI_COMMON(19),
    Q(23, 'aiReadiness', '가장 먼저 AI를 적용하고 싶은 영역은 어디인가요? (복수 선택 가능)', [
      OPT(0, '환자 응대 자동화'),
      OPT(0, '마케팅·콘텐츠'),
      OPT(0, '데이터 분석'),
      OPT(0, '시스템 통합'),
      OPT(0, '기타'),
    ], '점수와 무관하게 정보 수집 목적으로 활용됩니다.', true),
  ],

  service: [
    Q(1, 'customerData', '고객 정보는 현재 어떻게 통합 관리되고 있나요?', [
      OPT(1, '메모나 종이로 분산 관리'),
      OPT(2, '고객별 엑셀 파일로 관리'),
      OPT(3, '단일 고객관리 시스템(CRM/예약)'),
      OPT(4, '시스템 + 자동 분석·리포트'),
      OPT(5, 'AI가 고객 데이터로 예측·추천'),
    ]),
    Q(2, 'customerData', '예약·일정 관리는 어떻게 이루어지나요?', [
      OPT(1, '전화·카톡으로 일일이 확인'),
      OPT(2, '단순 캘린더 또는 수기 예약대장'),
      OPT(3, '고객 자동 확인·알림 시스템'),
      OPT(4, '예약 패턴 분석 + 수요 예측'),
      OPT(5, 'AI가 스케줄 최적화 + 노쇼 예측'),
    ]),
    Q(3, 'customerData', '고객 재방문·이탈 현황을 어떻게 추적하나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '매월 수동으로 확인'),
      OPT(3, '시스템에서 재방문 알림'),
      OPT(4, '이탈 패턴 분석 + 재유치 활동'),
      OPT(5, 'AI가 이탈 위험 고객 자동 감지·대응'),
    ]),
    Q(4, 'customerData', '서비스 품질·후기 관리는 어떻게 하나요?', [
      OPT(1, '거의 관리 안 함'),
      OPT(2, '가끔 플랫폼 후기 확인'),
      OPT(3, '정기 모니터링 + 담당자 대응'),
      OPT(4, '후기 분석 → 서비스 개선 반영'),
      OPT(5, 'AI가 후기 분석 + 개선 액션 자동 추천'),
    ]),
    Q(5, 'customerData', '결제·정산 관리는 어느 수준인가요?', [
      OPT(1, '수기 또는 엑셀 정산'),
      OPT(2, '카드 단말기만 사용'),
      OPT(3, '통합 POS·결제 시스템'),
      OPT(4, '자동 정산 + 세금계산서 발행'),
      OPT(5, 'AI가 매출 예측 + 자동 정산·보고'),
    ]),
    Q(6, 'marketing', '신규 고객 유입 채널별 효과를 어떻게 파악하나요?', [
      OPT(1, '어떤 채널이 효과적인지 모름'),
      OPT(2, '대략적인 추정'),
      OPT(3, '채널별 고객 수 측정'),
      OPT(4, '채널별 ROI + 전환율 추적'),
      OPT(5, 'AI가 채널별 성과 자동 분석·최적화'),
    ]),
    Q(7, 'marketing', '블로그·SNS·지역 마케팅은 어떻게 운영하나요?', [
      OPT(1, '운영 안 함'),
      OPT(2, '가끔 직원이 작성·게시'),
      OPT(3, '정기적으로 콘텐츠 발행'),
      OPT(4, '데이터 기반 콘텐츠 전략'),
      OPT(5, 'AI가 고객 트렌드 분석 → 콘텐츠 자동 생성'),
    ]),
    Q(8, 'marketing', '홈페이지·플랫폼 검색 노출 상태는 어떤가요?', [
      OPT(1, '홈페이지 없음 또는 오래됨'),
      OPT(2, '홈페이지 있으나 검색 노출 낮음'),
      OPT(3, '네이버·구글 SEO 적용'),
      OPT(4, 'AI 검색(ChatGPT 등) 노출 최적화'),
      OPT(5, 'AI 검색 + 플랫폼 리뷰 통합 관리'),
    ]),
    Q(9, 'marketing', '광고비 ROI는 어떻게 측정하고 있나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '매월 수기로 정리'),
      OPT(3, '채널별 ROI 측정'),
      OPT(4, '고객 LTV 기반 ROI 분석'),
      OPT(5, 'AI가 광고 효과 예측 + 자동 최적화'),
    ]),
    Q(10, 'marketing', '고객 추천·리뷰 활용은 어느 수준인가요?', [
      OPT(1, '거의 활용 안 함'),
      OPT(2, '좋은 후기를 가끔 SNS에 공유'),
      OPT(3, '리뷰 관리 + 추천 유도 프로그램'),
      OPT(4, '데이터 기반 추천 마케팅'),
      OPT(5, 'AI가 고객 추천 패턴 분석 + 자동화'),
    ]),
    Q(11, 'operations', '직원 일정·배치 관리는 어떻게 하나요?', [
      OPT(1, '카톡과 구두로 공유'),
      OPT(2, '엑셀 또는 간단한 앱'),
      OPT(3, '협업 도구(노션·슬랙 등)'),
      OPT(4, '자동 스케줄링 + 인력 최적화'),
      OPT(5, 'AI가 수요 예측 + 인력 배치 자동화'),
    ]),
    Q(12, 'operations', '업무 매뉴얼·교육·온보딩은 어떻게 이루어지나요?', [
      OPT(1, '구두 교육만'),
      OPT(2, '간단한 종이 매뉴얼'),
      OPT(3, '디지털 매뉴얼 + 영상'),
      OPT(4, '시스템화된 교육 + 평가'),
      OPT(5, 'AI 챗봇이 직원 질문 24시간 응답'),
    ]),
    Q(13, 'operations', '소모품·재고 관리는 어떻게 하나요?', [
      OPT(1, '수기 관리'),
      OPT(2, '엑셀 관리'),
      OPT(3, '시스템 관리 + 알림'),
      OPT(4, '자동 재주문 + 비용 분석'),
      OPT(5, 'AI가 수요 예측 + 자동 발주'),
    ]),
    Q(14, 'operations', '세금·회계·법무 처리는 어느 수준인가요?', [
      OPT(1, '모두 수기 또는 외부 아웃소싱'),
      OPT(2, '회계 프로그램 사용'),
      OPT(3, '세무사 + 시스템 연동'),
      OPT(4, '자동 세금계산서 + 장부 관리'),
      OPT(5, 'AI가 재무 분석 + 절세 기회 추천'),
    ]),
    Q(15, 'dataAnalytics', '매출·KPI는 어떻게 모니터링하나요?', [
      OPT(1, '매출 정도만 파악'),
      OPT(2, '매월 엑셀로 정리'),
      OPT(3, '자동 매출·KPI 대시보드'),
      OPT(4, '실시간 KPI + 알림'),
      OPT(5, 'AI가 KPI 분석 + 액션 추천'),
    ]),
    Q(16, 'dataAnalytics', '서비스별 수익성 분석은 어떻게 하나요?', [
      OPT(1, '어떤 서비스가 수익성 높은지 모름'),
      OPT(2, '대략 파악'),
      OPT(3, '서비스별 수익 측정'),
      OPT(4, '고객별·서비스별 상세 분석'),
      OPT(5, 'AI가 수익성 예측 + 가격 최적화 추천'),
    ]),
    Q(17, 'dataAnalytics', '고객 트렌드 변화는 어떻게 파악하나요?', [
      OPT(1, '감으로 판단'),
      OPT(2, '주변 경험으로 추정'),
      OPT(3, '데이터 기반 트렌드 분석'),
      OPT(4, '외부 데이터 + 내부 데이터 결합'),
      OPT(5, 'AI가 고객 니즈 변화 예측'),
    ]),
    Q(18, 'dataAnalytics', '경쟁 업체 현황 모니터링은 어떻게 하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '가끔 검색해봄'),
      OPT(3, '정기 모니터링'),
      OPT(4, '데이터 기반 비교 분석'),
      OPT(5, 'AI가 경쟁 동향 자동 모니터링·알림'),
    ]),
    ...AI_COMMON(19),
    Q(23, 'aiReadiness', '가장 먼저 AI를 적용하고 싶은 영역은 어디인가요? (복수 선택 가능)', [
      OPT(0, '고객 응대 자동화'),
      OPT(0, '마케팅·콘텐츠'),
      OPT(0, '데이터 분석'),
      OPT(0, '예약·결제 자동화'),
      OPT(0, '기타'),
    ], '점수와 무관하게 정보 수집 목적으로 활용됩니다.', true),
  ],

  education: [
    Q(1, 'customerData', '학생·수강생 정보는 어떻게 통합 관리하나요?', [
      OPT(1, '종이 서류와 엑셀로 분산'),
      OPT(2, '부분 디지털화 (출결 앱만)'),
      OPT(3, '통합 학생관리 시스템'),
      OPT(4, '시스템 + 자동 분석 리포트'),
      OPT(5, 'AI가 학습 데이터로 개인화 추천'),
    ]),
    Q(2, 'customerData', '학생 학습 이력·성과를 어떻게 추적하나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '성적표 정도만'),
      OPT(3, '시스템에서 이력 관리'),
      OPT(4, '개인별 성과 분석 + 피드백'),
      OPT(5, 'AI가 학습 패턴 분석 + 맞춤 커리큘럼 추천'),
    ]),
    Q(3, 'customerData', '학부모 응대·소통은 어떻게 이루어지나요?', [
      OPT(1, '전화·카톡으로 일일이 응대'),
      OPT(2, '정기 알림장·문자 발송'),
      OPT(3, '앱 또는 포털로 소통'),
      OPT(4, '자동 학습 리포트 + 응대'),
      OPT(5, 'AI가 학부모 질문 자동 응답 + 리포트 생성'),
    ]),
    Q(4, 'customerData', '수강 등록·이탈 현황을 어떻게 관리하나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '매월 수동으로 확인'),
      OPT(3, '시스템에서 이탈 알림'),
      OPT(4, '이탈 패턴 분석 + 재등록 유도'),
      OPT(5, 'AI가 이탈 위험 학생 예측 + 사전 대응'),
    ]),
    Q(5, 'customerData', '개인정보·동의서 관리는 어느 수준인가요?', [
      OPT(1, '잘 모르겠음'),
      OPT(2, '기본 동의서만'),
      OPT(3, '정기 점검 + 직원 교육'),
      OPT(4, '전담자 + 보안 시스템'),
      OPT(5, '보안 인증 + 자동 감사 시스템'),
    ]),
    Q(6, 'marketing', '신규 수강생 유입 채널별 효과를 어떻게 파악하나요?', [
      OPT(1, '어떤 채널이 효과적인지 모름'),
      OPT(2, '대략적인 추정'),
      OPT(3, '채널별 등록자 수 측정'),
      OPT(4, '채널별 ROI + 전환율 추적'),
      OPT(5, 'AI가 채널별 성과 자동 분석·최적화'),
    ]),
    Q(7, 'marketing', 'SNS·블로그·교육 플랫폼은 어떻게 운영하나요?', [
      OPT(1, '운영 안 함'),
      OPT(2, '가끔 직원이 작성'),
      OPT(3, '정기적으로 콘텐츠 발행'),
      OPT(4, '데이터 기반 콘텐츠 전략'),
      OPT(5, 'AI가 교육 트렌드 분석 → 콘텐츠 자동 생성'),
    ]),
    Q(8, 'marketing', '검색 노출·온라인 플랫폼 활용 현황은 어떤가요?', [
      OPT(1, '홈페이지 없음 또는 오래됨'),
      OPT(2, '홈페이지 있으나 검색 노출 낮음'),
      OPT(3, '네이버·구글 SEO 적용'),
      OPT(4, 'AI 검색 노출 + 교육 플랫폼 최적화'),
      OPT(5, 'AI 검색 + 리뷰 통합 관리 + 자동 개선'),
    ]),
    Q(9, 'marketing', '광고·홍보비 ROI는 어떻게 측정하나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '매월 수기로 정리'),
      OPT(3, '채널별 ROI 측정'),
      OPT(4, '수강생 LTV 기반 ROI 분석'),
      OPT(5, 'AI가 광고 효과 예측 + 자동 최적화'),
    ]),
    Q(10, 'marketing', '재등록·지인 추천 유도 활동은 어느 수준인가요?', [
      OPT(1, '거의 없음'),
      OPT(2, '가끔 연락'),
      OPT(3, '정기 재등록 캠페인'),
      OPT(4, '데이터 기반 개인화 재등록 유도'),
      OPT(5, 'AI가 재등록 예측 + 자동 맞춤 캠페인'),
    ]),
    Q(11, 'operations', '강사·직원 일정 관리는 어떻게 하나요?', [
      OPT(1, '카톡과 구두로 공유'),
      OPT(2, '엑셀 또는 간단한 앱'),
      OPT(3, '협업 도구 사용'),
      OPT(4, '자동 스케줄링 + 알림'),
      OPT(5, 'AI가 수요 예측 + 강사 배치 최적화'),
    ]),
    Q(12, 'operations', '커리큘럼·교재 관리는 어떻게 이루어지나요?', [
      OPT(1, '종이 교재 + 구두 설명'),
      OPT(2, '디지털 문서로 관리'),
      OPT(3, '시스템화된 교재 관리'),
      OPT(4, '학습 성과 연동 커리큘럼 업데이트'),
      OPT(5, 'AI가 학생 데이터로 커리큘럼 자동 개선'),
    ]),
    Q(13, 'operations', '강의실·시설 운영 관리는 어느 수준인가요?', [
      OPT(1, '수기 관리'),
      OPT(2, '엑셀 관리'),
      OPT(3, '시스템 관리 + 알림'),
      OPT(4, '자동 예약 + 이용 분석'),
      OPT(5, 'AI가 시설 수요 예측 + 자동 배정'),
    ]),
    Q(14, 'operations', '강사·직원 교육·온보딩은 어떻게 이루어지나요?', [
      OPT(1, '구두 교육만'),
      OPT(2, '간단한 종이 매뉴얼'),
      OPT(3, '디지털 매뉴얼 + 영상'),
      OPT(4, '시스템화된 교육 + KPI 평가'),
      OPT(5, 'AI 챗봇이 강사 질문 24시간 응답'),
    ]),
    Q(15, 'dataAnalytics', '학습 성과·KPI는 어떻게 측정하나요?', [
      OPT(1, '매출 정도만 파악'),
      OPT(2, '매월 엑셀로 정리'),
      OPT(3, '자동 성과 대시보드'),
      OPT(4, '실시간 KPI + 알림'),
      OPT(5, 'AI가 학습 성과 분석 + 액션 추천'),
    ]),
    Q(16, 'dataAnalytics', '수강생 만족도는 어떻게 측정하나요?', [
      OPT(1, '거의 측정 안 함'),
      OPT(2, '가끔 설문'),
      OPT(3, '정기 설문 + 분석'),
      OPT(4, '실시간 피드백 + 개선 시스템'),
      OPT(5, 'AI가 만족도 예측 + 자동 개선 제안'),
    ]),
    Q(17, 'dataAnalytics', '교육 트렌드·시장 변화는 어떻게 파악하나요?', [
      OPT(1, '감으로 판단'),
      OPT(2, '업계 뉴스 정도'),
      OPT(3, '데이터 기반 트렌드 분석'),
      OPT(4, '외부·내부 데이터 결합 분석'),
      OPT(5, 'AI가 교육 트렌드 예측 + 대응 추천'),
    ]),
    Q(18, 'dataAnalytics', '경쟁 기관 현황은 어떻게 파악하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '가끔 검색'),
      OPT(3, '정기 모니터링'),
      OPT(4, '데이터 기반 비교 분석'),
      OPT(5, 'AI가 경쟁 동향 자동 분석·알림'),
    ]),
    ...AI_COMMON(19),
    Q(23, 'aiReadiness', '가장 먼저 AI를 적용하고 싶은 영역은? (복수 선택 가능)', [
      OPT(0, '학습 관리·개인화'),
      OPT(0, '학부모 응대 자동화'),
      OPT(0, '마케팅·콘텐츠'),
      OPT(0, '데이터 분석'),
      OPT(0, '기타'),
    ], '점수와 무관하게 정보 수집 목적으로 활용됩니다.', true),
  ],

  manufacturing: [
    Q(1, 'customerData', '거래처·고객 정보는 어떻게 통합 관리하나요?', [
      OPT(1, '담당자 개인 메모나 엑셀로 분산'),
      OPT(2, '거래처별 엑셀 파일로 관리'),
      OPT(3, '단일 CRM 또는 영업 관리 시스템'),
      OPT(4, '시스템 + 자동 분석·리포트'),
      OPT(5, 'AI가 거래처 데이터로 예측·추천'),
    ]),
    Q(2, 'customerData', '고객 문의·클레임 응대는 어떻게 이루어지나요?', [
      OPT(1, '전화·이메일로 일일이 응대'),
      OPT(2, '담당자가 수기로 기록·처리'),
      OPT(3, '클레임 관리 시스템'),
      OPT(4, '자동 접수 + 처리 현황 추적'),
      OPT(5, 'AI가 클레임 분류·우선순위 자동 처리'),
    ]),
    Q(3, 'customerData', '거래처 이탈·재거래 현황을 어떻게 추적하나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '매월 수동으로 확인'),
      OPT(3, '시스템에서 정기 알림'),
      OPT(4, '이탈 패턴 분석 + 재거래 유도'),
      OPT(5, 'AI가 이탈 위험 거래처 예측 + 사전 대응'),
    ]),
    Q(4, 'customerData', '납품 이력·계약 관리는 어느 수준인가요?', [
      OPT(1, '종이 서류와 엑셀로 분산'),
      OPT(2, '엑셀로 통합 관리'),
      OPT(3, '계약 관리 시스템'),
      OPT(4, '자동 알림 + 계약 분석'),
      OPT(5, 'AI가 계약 리스크 분석 + 갱신 예측'),
    ]),
    Q(5, 'customerData', '거래 데이터 보안 체계는 어느 수준인가요?', [
      OPT(1, '잘 모르겠음'),
      OPT(2, '기본 비밀번호 관리만'),
      OPT(3, '정기 보안 점검'),
      OPT(4, '전담자 + 보안 시스템'),
      OPT(5, '보안 인증 + 자동 감사 시스템'),
    ]),
    Q(6, 'marketing', '신규 거래처 발굴 채널을 어떻게 관리하나요?', [
      OPT(1, '개인 인맥에만 의존'),
      OPT(2, '전시회·소개 정도'),
      OPT(3, '다양한 채널로 체계적 발굴'),
      OPT(4, '채널별 성과 추적 + 최적화'),
      OPT(5, 'AI가 잠재 거래처 자동 발굴·분석'),
    ]),
    Q(7, 'marketing', '기술 자료·카탈로그 관리는 어떻게 하나요?', [
      OPT(1, '최신 자료가 없거나 분산'),
      OPT(2, '담당자가 수동 관리'),
      OPT(3, '시스템화된 자료 관리'),
      OPT(4, '자동 업데이트 + 버전 관리'),
      OPT(5, 'AI가 기술 자료 분석 + 제안서 자동 생성'),
    ]),
    Q(8, 'marketing', '온라인 검색·B2B 플랫폼 노출 상태는 어떤가요?', [
      OPT(1, '온라인 존재감 거의 없음'),
      OPT(2, '기본 홈페이지 보유'),
      OPT(3, 'B2B 플랫폼 + SEO 적용'),
      OPT(4, 'AI 검색 최적화 + 플랫폼 관리'),
      OPT(5, 'AI 검색 + 자동 노출 관리'),
    ]),
    Q(9, 'marketing', '영업비용 대비 성과 측정은 어떻게 하나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '매월 수기로 정리'),
      OPT(3, '영업 채널별 성과 측정'),
      OPT(4, '거래처 LTV 기반 영업 분석'),
      OPT(5, 'AI가 영업 성과 예측 + 자동 최적화'),
    ]),
    Q(10, 'marketing', '제품·기술 인증·특허 활용은 어느 수준인가요?', [
      OPT(1, '인증·특허 없음'),
      OPT(2, '보유하나 마케팅에 미활용'),
      OPT(3, '홍보 자료에 반영'),
      OPT(4, '영업 전략에 적극 활용'),
      OPT(5, 'AI가 인증·특허 가치 분석 + 영업 전략 추천'),
    ]),
    Q(11, 'operations', '생산 일정·공정 관리는 어떻게 하나요?', [
      OPT(1, '수기 또는 구두로 관리'),
      OPT(2, '엑셀로 관리'),
      OPT(3, '생산 관리 시스템 사용'),
      OPT(4, '자동 스케줄링 + 이상 알림'),
      OPT(5, 'AI가 생산 최적화 + 수요 예측'),
    ]),
    Q(12, 'operations', '재고·원자재 관리는 어떻게 이루어지나요?', [
      OPT(1, '수기 관리'),
      OPT(2, '엑셀 관리'),
      OPT(3, '재고 관리 시스템'),
      OPT(4, '자동 재주문 + 재고 분석'),
      OPT(5, 'AI가 수요 예측 + 재고 자동 최적화'),
    ]),
    Q(13, 'operations', '품질 관리·불량 추적은 어느 수준인가요?', [
      OPT(1, '수기 기록만'),
      OPT(2, '엑셀로 불량 기록'),
      OPT(3, '품질 관리 시스템'),
      OPT(4, '자동 불량 감지 + 원인 분석'),
      OPT(5, 'AI가 불량 예측 + 자동 공정 개선'),
    ]),
    Q(14, 'operations', '직원 교육·기술 전수는 어떻게 이루어지나요?', [
      OPT(1, '구두 전수만'),
      OPT(2, '간단한 문서 매뉴얼'),
      OPT(3, '디지털 매뉴얼 + 영상'),
      OPT(4, '시스템화된 교육 + 역량 평가'),
      OPT(5, 'AI가 작업 지침 자동 제공 + 이상 감지'),
    ]),
    Q(15, 'dataAnalytics', '생산·매출 KPI는 어떻게 모니터링하나요?', [
      OPT(1, '매출 정도만 파악'),
      OPT(2, '매월 엑셀로 정리'),
      OPT(3, '자동 KPI 대시보드'),
      OPT(4, '실시간 KPI + 이상 알림'),
      OPT(5, 'AI가 KPI 분석 + 개선 액션 추천'),
    ]),
    Q(16, 'dataAnalytics', '제품별·거래처별 원가·수익성 분석은 어떻게 하나요?', [
      OPT(1, '어떤 제품이 수익성 높은지 모름'),
      OPT(2, '대략 파악'),
      OPT(3, '제품별 수익 측정'),
      OPT(4, '거래처별 상세 수익성 분석'),
      OPT(5, 'AI가 수익성 예측 + 가격 최적화 추천'),
    ]),
    Q(17, 'dataAnalytics', '시장·기술 트렌드 변화는 어떻게 파악하나요?', [
      OPT(1, '감으로 판단'),
      OPT(2, '업계 뉴스 정도'),
      OPT(3, '데이터 기반 트렌드 분석'),
      OPT(4, '외부·내부 데이터 결합 분석'),
      OPT(5, 'AI가 시장 트렌드 예측 + 대응 추천'),
    ]),
    Q(18, 'dataAnalytics', '경쟁사 현황·기술 동향은 어떻게 모니터링하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '가끔 검색'),
      OPT(3, '정기 모니터링'),
      OPT(4, '데이터 기반 경쟁사 분석'),
      OPT(5, 'AI가 경쟁 동향 자동 모니터링·알림'),
    ]),
    ...AI_COMMON(19),
    Q(23, 'aiReadiness', '가장 먼저 AI를 적용하고 싶은 영역은? (복수 선택 가능)', [
      OPT(0, '생산·품질 관리'),
      OPT(0, '영업·마케팅'),
      OPT(0, '재고·물류'),
      OPT(0, '데이터 분석'),
      OPT(0, '기타'),
    ], '점수와 무관하게 정보 수집 목적으로 활용됩니다.', true),
  ],

  public: [
    Q(1, 'customerData', '민원·서비스 신청 데이터는 어떻게 관리하나요?', [
      OPT(1, '종이 서류와 엑셀로 분산'),
      OPT(2, '일부 디지털화'),
      OPT(3, '통합 민원 관리 시스템'),
      OPT(4, '시스템 + 자동 분석 리포트'),
      OPT(5, 'AI가 민원 데이터로 패턴 예측·자동 분류'),
    ]),
    Q(2, 'customerData', '민원 응대는 어떻게 이루어지나요?', [
      OPT(1, '전화·방문으로만 응대'),
      OPT(2, '전화 + 이메일·온라인 신청'),
      OPT(3, '챗봇 1차 응대 + 담당자 2차'),
      OPT(4, 'AI 챗봇이 분야별 민원 응대'),
      OPT(5, 'AI가 기관 데이터 기반 24시간 민원 처리'),
    ]),
    Q(3, 'customerData', '반복 민원·서비스 이용 패턴을 어떻게 추적하나요?', [
      OPT(1, '추적 안 함'),
      OPT(2, '연 1회 수동 집계'),
      OPT(3, '분기별 민원 분석 리포트'),
      OPT(4, '민원 유형별 자동 분석'),
      OPT(5, 'AI가 민원 증가 예측 + 선제 대응'),
    ]),
    Q(4, 'customerData', '이용자 만족도·피드백은 어떻게 수집하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '연 1-2회 설문'),
      OPT(3, '정기 설문 + 분석'),
      OPT(4, '실시간 피드백 + 개선 연계'),
      OPT(5, 'AI가 피드백 분석 + 서비스 개선 자동 추천'),
    ]),
    Q(5, 'customerData', '개인정보 처리·보안 체계는 어느 수준인가요?', [
      OPT(1, '기본 수준만'),
      OPT(2, '내부 지침 보유'),
      OPT(3, '정기 교육 + 시스템 보안'),
      OPT(4, '전담 부서 + 인증 보유'),
      OPT(5, '자동 감사 + 보안 인증 + AI 이상 감지'),
    ]),
    Q(6, 'marketing', '주요 사업·정책 홍보 채널을 어떻게 운영하나요?', [
      OPT(1, '공문·공보지에만 의존'),
      OPT(2, '홈페이지 + 공문'),
      OPT(3, 'SNS + 홈페이지 + 공문 통합'),
      OPT(4, '채널별 효과 분석 + 최적화'),
      OPT(5, 'AI가 채널별 도달률 분석 + 자동 최적화'),
    ]),
    Q(7, 'marketing', 'SNS·웹사이트 운영은 어떻게 이루어지나요?', [
      OPT(1, '운영 안 하거나 매우 낮은 수준'),
      OPT(2, '가끔 담당자가 게시'),
      OPT(3, '정기적으로 콘텐츠 발행'),
      OPT(4, '데이터 기반 콘텐츠 전략'),
      OPT(5, 'AI가 시민 관심사 분석 → 콘텐츠 자동 생성'),
    ]),
    Q(8, 'marketing', '검색 노출·디지털 접근성은 어느 수준인가요?', [
      OPT(1, '홈페이지 없음 또는 오래됨'),
      OPT(2, '홈페이지 있으나 검색 노출 낮음'),
      OPT(3, '검색 최적화 적용'),
      OPT(4, 'AI 검색(ChatGPT 등) 노출 대응'),
      OPT(5, 'AI 검색 + 접근성 자동 개선'),
    ]),
    Q(9, 'marketing', '홍보 예산 대비 효과는 어떻게 측정하나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '건수 정도만 집계'),
      OPT(3, '채널별 도달률 측정'),
      OPT(4, '사업 목표 연계 효과 분석'),
      OPT(5, 'AI가 홍보 효과 예측 + 예산 최적화'),
    ]),
    Q(10, 'marketing', '정책·사업 홍보 소재 관리는 어떻게 하나요?', [
      OPT(1, '담당자 개인 폴더에 분산'),
      OPT(2, '공유 드라이브로 관리'),
      OPT(3, '통합 자료 관리 시스템'),
      OPT(4, '자동 업데이트 + 버전 관리'),
      OPT(5, 'AI가 소재 분류·검색·재활용 자동화'),
    ]),
    Q(11, 'operations', '임직원 업무·협업 시스템은 어느 수준인가요?', [
      OPT(1, '이메일과 메모로만 협업'),
      OPT(2, '엑셀·공유 파일로 협업'),
      OPT(3, '협업 도구(노션·슬랙 등) 활용'),
      OPT(4, '통합 업무 관리 시스템'),
      OPT(5, 'AI 어시스턴트가 업무 흐름 지원'),
    ]),
    Q(12, 'operations', '내부 문서·정보 관리는 어떻게 이루어지나요?', [
      OPT(1, '종이 문서 + 개인 폴더로 분산'),
      OPT(2, '공유 드라이브'),
      OPT(3, '문서 관리 시스템'),
      OPT(4, '자동 분류 + 검색'),
      OPT(5, 'AI가 문서 분류·요약·검색 자동화'),
    ]),
    Q(13, 'operations', '예산·결산·성과 관리는 어느 수준인가요?', [
      OPT(1, '수기 또는 기본 엑셀'),
      OPT(2, '회계 프로그램 사용'),
      OPT(3, '예산 관리 시스템'),
      OPT(4, '실시간 예산 모니터링 + 알림'),
      OPT(5, 'AI가 예산 집행 분석 + 이상 감지'),
    ]),
    Q(14, 'operations', '직원 교육·온보딩은 어떻게 이루어지나요?', [
      OPT(1, '구두 인수인계만'),
      OPT(2, '간단한 매뉴얼 제공'),
      OPT(3, '디지털 매뉴얼 + 교육 영상'),
      OPT(4, '시스템화된 교육 + 평가'),
      OPT(5, 'AI 챗봇이 직원 질문 24시간 응답'),
    ]),
    Q(15, 'dataAnalytics', '사업 성과 KPI는 어떻게 가시화하나요?', [
      OPT(1, '결산 시에만 파악'),
      OPT(2, '매월 엑셀로 정리'),
      OPT(3, '자동 KPI 대시보드'),
      OPT(4, '실시간 KPI + 보고 자동화'),
      OPT(5, 'AI가 KPI 분석 + 성과 개선 추천'),
    ]),
    Q(16, 'dataAnalytics', '정책·사업 효과는 어떻게 분석하나요?', [
      OPT(1, '측정 안 함'),
      OPT(2, '결과 수치만 집계'),
      OPT(3, '정기 효과 분석 보고'),
      OPT(4, '데이터 기반 정책 평가'),
      OPT(5, 'AI가 정책 효과 예측 + 개선 방향 추천'),
    ]),
    Q(17, 'dataAnalytics', '시민·이용자 요구 변화는 어떻게 파악하나요?', [
      OPT(1, '감으로 판단'),
      OPT(2, '민원 건수 정도만'),
      OPT(3, '데이터 기반 분석'),
      OPT(4, '외부 데이터 + 민원 데이터 결합'),
      OPT(5, 'AI가 시민 니즈 변화 예측 + 대응 추천'),
    ]),
    Q(18, 'dataAnalytics', '유사 기관 벤치마킹은 어떻게 하나요?', [
      OPT(1, '거의 안 함'),
      OPT(2, '가끔 타 기관 자료 수집'),
      OPT(3, '정기 벤치마킹 보고'),
      OPT(4, '데이터 기반 비교 분석'),
      OPT(5, 'AI가 유사 기관 사례 자동 분석·추천'),
    ]),
    ...AI_COMMON(19),
    Q(23, 'aiReadiness', '가장 먼저 AI를 적용하고 싶은 영역은? (복수 선택 가능)', [
      OPT(0, '민원 응대 자동화'),
      OPT(0, '문서·정보 관리'),
      OPT(0, '홍보·소통'),
      OPT(0, '데이터 분석'),
      OPT(0, '기타'),
    ], '점수와 무관하게 정보 수집 목적으로 활용됩니다.', true),
  ],
};

// ─── Score Calculation ────────────────────────────────────────────────────────

function calculateScores(answers: Answer[]): { totalScore: number; categoryScores: CategoryScores; level: string } {
  const categoryScores: CategoryScores = {
    customerData: 0,
    marketing: 0,
    operations: 0,
    dataAnalytics: 0,
    aiReadiness: 0,
  };
  answers.forEach((a) => {
    if (a.questionId <= 5) categoryScores.customerData += a.score;
    else if (a.questionId <= 10) categoryScores.marketing += a.score;
    else if (a.questionId <= 14) categoryScores.operations += a.score;
    else if (a.questionId <= 18) categoryScores.dataAnalytics += a.score;
    else if (a.questionId <= 22) categoryScores.aiReadiness += a.score;
  });
  const totalScore = Object.values(categoryScores).reduce((s, v) => s + v, 0);
  const level = totalScore >= 70 ? '고급' : totalScore >= 45 ? '중급' : '초급';
  return { totalScore, categoryScores, level };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUPABASE_URL = `https://${projectId}.supabase.co`;
const AUTH_HEADER = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` };

const categoryLabels: Record<Category, string> = {
  customerData: '고객 데이터 관리',
  marketing: '마케팅·고객 유입',
  operations: '운영·인력 시스템',
  dataAnalytics: '데이터·분석 활용',
  aiReadiness: 'AI 도입 의지·자원',
};

const categoryMax: Record<Category, number> = {
  customerData: 25,
  marketing: 25,
  operations: 20,
  dataAnalytics: 20,
  aiReadiness: 20,
};

const SS = {
  get: (k: string) => { try { return JSON.parse(sessionStorage.getItem(k) || 'null'); } catch { return null; } },
  set: (k: string, v: unknown) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} },
  clear: () => { ['ls-step','ls-industry','ls-answers','ls-cq','ls-report'].forEach(k => sessionStorage.removeItem(k)); },
};

// ─── Main Component ────────────────────────────────────────────────────────────

export function Consultation() {
  const [searchParams] = useSearchParams();
  const simpleMode = searchParams.get('simple') === 'true';
  const packageParam = searchParams.get('package') ?? '';

  const [step, setStep] = useState<number>(() => simpleMode ? 5 : (SS.get('ls-step') ?? 0));
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(() => SS.get('ls-industry'));
  const [answers, setAnswers] = useState<Answer[]>(() => SS.get('ls-answers') ?? []);
  const [currentQ, setCurrentQ] = useState<number>(() => SS.get('ls-cq') ?? 0);
  const [aiReport, setAiReport] = useState<DiagnosisReport | null>(() => SS.get('ls-report'));
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [apiError, setApiError] = useState('');
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [wantConsultation, setWantConsultation] = useState(
    simpleMode ? true : searchParams.get('package') ? true : true
  );
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '', company: '', email: '', phone: '',
    position: '', companySize: '', message: packageParam ? `패키지 문의: ${packageParam}` : '',
    wantConsultation: true, wantNewsletter: false, agreePrivacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

  // Persist state to sessionStorage
  useEffect(() => { SS.set('ls-step', step); }, [step]);
  useEffect(() => { SS.set('ls-industry', selectedIndustry); }, [selectedIndustry]);
  useEffect(() => { SS.set('ls-answers', answers); }, [answers]);
  useEffect(() => { SS.set('ls-cq', currentQ); }, [currentQ]);
  useEffect(() => { SS.set('ls-report', aiReport); }, [aiReport]);

  const questions = selectedIndustry ? checklists[selectedIndustry] : [];
  const totalQ = questions.length;

  const goTo = useCallback((s: number) => setStep(s), []);

  // ── Progress bar calculation ──────────────────────────────────────────────
  function progressPercent() {
    if (step === 0) return 0;
    if (step === 1) return 10;
    if (step === 2) return 20 + Math.round((currentQ / totalQ) * 20);
    if (step === 3) return 42;
    if (step === 4) return 70;
    if (step === 5) return 90;
    return 100;
  }

  // ── Loading animation ─────────────────────────────────────────────────────
  useEffect(() => {
    if (step !== 3) return;
    const msgs = ['응답 데이터 분석 중...', '회사 상황에 맞는 솔루션 매칭 중...', '맞춤 컨설팅 리포트 생성 중...'];
    let i = 0;
    setLoadingMsg(0);
    const id = setInterval(() => { i = (i + 1) % msgs.length; setLoadingMsg(i); }, 5000);
    return () => clearInterval(id);
  }, [step]);

  // ── Answer helpers ────────────────────────────────────────────────────────
  function getAnswer(qId: number) {
    return answers.find(a => a.questionId === qId);
  }

  function setAnswer(qId: number, score: number, value?: string) {
    setAnswers(prev => {
      const next = prev.filter(a => a.questionId !== qId);
      return [...next, { questionId: qId, score, value }];
    });
  }

  function handleOptionSelect(q: Question, score: number, text: string) {
    if (q.isMultiSelect) return; // handled separately
    setAnswer(q.id, score, text);
    setTimeout(() => {
      if (currentQ < totalQ - 1) {
        setCurrentQ(currentQ + 1);
      }
    }, 320);
  }

  function handleMultiToggle(text: string) {
    setMultiSelected(prev =>
      prev.includes(text) ? prev.filter(t => t !== text) : [...prev, text]
    );
  }

  function handleMultiConfirm(q: Question) {
    setAnswer(q.id, 0, multiSelected.join(', '));
  }

  // ── API: generate report ──────────────────────────────────────────────────
  async function generateReport() {
    if (!selectedIndustry) return;
    setIsLoading(true);
    setApiError('');
    goTo(3);

    const { totalScore, categoryScores, level } = calculateScores(answers);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-diagnosis-report`, {
        method: 'POST',
        headers: AUTH_HEADER,
        body: JSON.stringify({
          industry: selectedIndustry,
          industryKo: industryKorean[selectedIndustry],
          answers,
          totalScore,
          categoryScores,
          level,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const report: DiagnosisReport = await res.json();
      SS.set('ls-report', report);
      setAiReport(report);
      setIsLoading(false);
      goTo(4);
    } catch (e) {
      console.error(e);
      setApiError('AI 리포트 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
      goTo(2);
    }
  }

  // ── API: submit contact ───────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!contactInfo.agreePrivacy) {
      setSubmitError('개인정보 수집·이용에 동의해주세요.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    const { totalScore, categoryScores, level } = selectedIndustry
      ? calculateScores(answers)
      : { totalScore: 0, categoryScores: {} as CategoryScores, level: '' };

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-diagnosis-report`, {
        method: 'POST',
        headers: AUTH_HEADER,
        body: JSON.stringify({
          ...contactInfo,
          wantConsultation,
          industry: selectedIndustry ?? 'direct',
          industryKo: selectedIndustry ? industryKorean[selectedIndustry] : '직접 신청',
          answers,
          totalScore,
          level,
          categoryScores,
          aiReport,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      SS.clear();
      goTo(6);
    } catch (e) {
      console.error(e);
      setSubmitError('제출 중 오류가 발생했습니다. 다시 시도하거나 이메일로 직접 연락해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // Step Renders
  // ─────────────────────────────────────────────────────────────────────────

  function renderStep0() {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-10 md:p-14">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-8"
            style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-700)' }}>
            AI Readiness Check · 무료
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--navy-900)' }}>
            회사의 AI 준비도를<br />7분 만에 진단합니다
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--navy-600)' }}>
            LS AX 컨설팅의 자체 AI 진단 시스템이 회사의 AI 도입 현재 단계와
            우선순위를 분석해 맞춤 컨설팅 리포트를 즉시 제공합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { Icon: Clock, label: '7-10분 소요', body: '5개 분야 중 1개 선택 후 20-25문항 응답' },
              { Icon: Sparkles, label: 'AI 즉시 분석', body: 'Claude AI가 회사 상황에 맞춘 리포트 생성' },
              { Icon: FileText, label: '리포트 제공', body: '결과 즉시 확인 + 이메일로 PDF 발송' },
            ].map(({ Icon, label, body }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--navy-700)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>{label}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-500)' }}>{body}</p>
              </div>
            ))}
          </div>

          <p className="text-xs mb-8 leading-relaxed" style={{ color: 'var(--navy-400)' }}>
            진단 시작에는 개인정보가 필요하지 않습니다.
            결과를 받으실 때 이메일·연락처를 입력하시면 PDF 리포트를 보내드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => goTo(1)}
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              진단 시작하기
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setWantConsultation(true); goTo(5); }}
              className="px-6 py-4 text-sm font-medium transition-colors hover:underline"
              style={{ color: 'var(--navy-500)' }}
            >
              상담만 신청하고 싶어요
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderStep1() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center" style={{ color: 'var(--navy-900)' }}>
          회사가 속한 분야를 선택해주세요
        </h2>
        <p className="text-base text-center mb-10" style={{ color: 'var(--navy-500)' }}>
          분야별로 다른 진단 문항이 제공됩니다. 회사 활동에 가장 가까운 1개를 선택하세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {industries.map(({ id, Icon, name, target }) => {
            const isSelected = selectedIndustry === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedIndustry(id)}
                className="relative text-left p-6 rounded-2xl border-2 transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: isSelected ? 'var(--navy-50)' : 'white',
                  borderColor: isSelected ? 'var(--navy-900)' : 'var(--navy-100)',
                }}
              >
                {isSelected && (
                  <CheckCircle className="absolute top-3 right-3 w-5 h-5" style={{ color: 'var(--navy-900)' }} />
                )}
                <Icon className="w-8 h-8 mb-4" style={{ color: isSelected ? 'var(--navy-900)' : 'var(--navy-400)' }} />
                <p className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>{name}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--navy-500)' }}>{target}</p>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-center mb-8" style={{ color: 'var(--navy-400)' }}>
          어느 분야에도 해당하지 않으신가요?{' '}
          <button onClick={() => { setSelectedIndustry('service'); goTo(2); setCurrentQ(0); }}
            className="underline" style={{ color: 'var(--navy-600)' }}>
            서비스 분야 공통 문항으로 진행하기
          </button>
        </p>

        <div className="flex justify-between">
          <button onClick={() => goTo(0)} className="flex items-center gap-2 text-sm font-medium px-4 py-2 transition-colors"
            style={{ color: 'var(--navy-500)' }}>
            <ArrowLeft className="w-4 h-4" /> 이전
          </button>
          <button
            onClick={() => { if (selectedIndustry) { setCurrentQ(0); goTo(2); } }}
            disabled={!selectedIndustry}
            className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: 'var(--navy-900)' }}
          >
            다음 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  function renderStep2() {
    if (!selectedIndustry) return null;
    const q = questions[currentQ];
    if (!q) return null;
    const existingAnswer = getAnswer(q.id);
    const answeredCount = answers.filter(a => !questions.find(qq => qq.id === a.questionId && qq.isMultiSelect)).length;

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="text-sm font-medium text-center mb-2" style={{ color: 'var(--navy-500)' }}>
          {industryKorean[selectedIndustry]} 분야 AI 진단
        </p>
        <p className="text-sm text-center mb-8" style={{ color: 'var(--navy-400)' }}>
          진단 진행 {currentQ + 1} / {totalQ} 문항
        </p>

        {apiError && (
          <div className="mb-6 p-4 rounded-xl text-sm" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>
            {apiError}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 md:p-10 mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
            Q{currentQ + 1} / {totalQ}
          </p>
          <h3 className="text-xl md:text-2xl font-semibold leading-relaxed mb-2" style={{ color: 'var(--navy-900)' }}>
            {q.question}
          </h3>
          {q.description && (
            <p className="text-sm mb-6" style={{ color: 'var(--navy-500)' }}>{q.description}</p>
          )}
          {!q.description && <div className="mb-6" />}

          {q.isMultiSelect ? (
            <div className="space-y-3">
              {q.options.map(({ text }) => {
                const isChk = multiSelected.includes(text);
                return (
                  <button key={text} onClick={() => handleMultiToggle(text)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3"
                    style={{ borderColor: isChk ? 'var(--navy-900)' : 'var(--navy-100)', backgroundColor: isChk ? 'var(--navy-50)' : 'white' }}>
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: isChk ? 'var(--navy-900)' : 'var(--navy-300)', backgroundColor: isChk ? 'var(--navy-900)' : 'white' }}>
                      {isChk && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm" style={{ color: 'var(--navy-800)' }}>{text}</span>
                  </button>
                );
              })}
              <button
                onClick={() => { handleMultiConfirm(q); }}
                className="w-full mt-4 px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}>
                선택 완료
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {q.options.map(({ score, text }) => {
                const isSel = existingAnswer?.value === text;
                return (
                  <button key={score} onClick={() => handleOptionSelect(q, score, text)}
                    className="w-full text-left px-5 py-4 rounded-xl border-2 transition-all hover:border-current"
                    style={{
                      borderColor: isSel ? 'var(--navy-900)' : 'var(--navy-100)',
                      backgroundColor: isSel ? 'var(--navy-50)' : 'white',
                    }}>
                    <span className="text-sm font-medium mr-3" style={{ color: 'var(--navy-400)' }}>{score}점</span>
                    <span className="text-sm" style={{ color: 'var(--navy-800)' }}>{text}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => { if (currentQ > 0) setCurrentQ(currentQ - 1); else goTo(1); }}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2"
            style={{ color: 'var(--navy-500)' }}>
            <ArrowLeft className="w-4 h-4" /> 이전
          </button>
          <div className="flex gap-3">
            {currentQ < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                disabled={!existingAnswer && !q.isMultiSelect}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white disabled:opacity-40"
                style={{ backgroundColor: 'var(--navy-900)' }}>
                다음 <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={generateReport}
                disabled={answeredCount < totalQ - 1}
                className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}>
                AI 분석 시작 <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  function renderStep3() {
    const msgs = ['응답 데이터 분석 중...', '회사 상황에 맞는 솔루션 매칭 중...', '맞춤 컨설팅 리포트 생성 중...'];
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="text-center max-w-md">
          <Loader2 className="w-16 h-16 mx-auto mb-8 animate-spin" style={{ color: 'var(--navy-900)' }} />
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>AI가 분석 중입니다</h2>
          <p className="text-base font-medium mb-2" style={{ color: 'var(--navy-700)' }}>{msgs[loadingMsg]}</p>
          <p className="text-sm" style={{ color: 'var(--navy-400)' }}>
            Claude AI가 회사 상황에 맞춘 리포트를 생성하고 있습니다.<br />
            약 10-20초 소요됩니다.
          </p>
        </div>
      </div>
    );
  }

  function renderStep4() {
    if (!aiReport || !selectedIndustry) return null;
    const { totalScore, categoryScores, level } = calculateScores(answers);
    const levelColors = { 초급: 'var(--navy-400)', 중급: 'var(--navy-700)', 고급: 'var(--navy-900)' };
    const levelBg = { 초급: 'var(--navy-50)', 중급: 'var(--navy-100)', 고급: 'var(--navy-900)' };
    const levelText = { 초급: 'var(--navy-700)', 중급: 'var(--navy-900)', 고급: 'white' };

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* S1: Score */}
        <div className="text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
            AI Readiness Diagnosis Report
          </p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy-900)' }}>
            {industryKorean[selectedIndustry]} 분야 AI 진단 결과
          </h2>
          <div className="inline-flex flex-col items-center gap-4 bg-white rounded-3xl px-16 py-10 shadow-sm">
            <span className="text-8xl font-bold leading-none" style={{ color: 'var(--navy-900)' }}>{totalScore}</span>
            <span className="text-lg" style={{ color: 'var(--navy-400)' }}>/ 110점</span>
            <div className="w-48 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${(totalScore / 110) * 100}%`, backgroundColor: 'var(--navy-900)' }} />
            </div>
            <span className="text-sm font-bold px-4 py-1.5 rounded-full"
              style={{ backgroundColor: levelBg[level as '초급' | '중급' | '고급'], color: levelText[level as '초급' | '중급' | '고급'] }}>
              {level} 단계
            </span>
          </div>
        </div>

        {/* S2: Summary */}
        <div className="bg-white rounded-2xl p-8 border-l-4" style={{ borderColor: 'var(--navy-900)' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
            Diagnosis Summary
          </p>
          <p className="text-base leading-relaxed" style={{ color: 'var(--navy-800)' }}>{aiReport.summary}</p>
        </div>

        {/* S3: Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
              Strengths · 강점
            </p>
            <ul className="space-y-3">
              {aiReport.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-700)' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-800)' }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--navy-400)' }}>
              Improvement Areas · 개선 영역
            </p>
            <ul className="space-y-3">
              {aiReport.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-500)' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-800)' }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* S4: Category scores */}
        <div className="bg-white rounded-2xl p-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--navy-400)' }}>
            Category Scores
          </p>
          <div className="space-y-4">
            {(Object.entries(categoryScores) as [Category, number][]).map(([cat, score]) => {
              const max = categoryMax[cat];
              const pct = Math.round((score / max) * 100);
              return (
                <div key={cat} className="flex items-center gap-4">
                  <span className="text-sm w-36 flex-shrink-0" style={{ color: 'var(--navy-700)' }}>{categoryLabels[cat]}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: 'var(--navy-900)' }} />
                  </div>
                  <span className="text-sm w-20 text-right" style={{ color: 'var(--navy-500)' }}>{score}/{max} · {pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* S5: Roadmap */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: 'var(--navy-400)' }}>
            Implementation Roadmap
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {aiReport.roadmap.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <span className="text-3xl font-bold block mb-2" style={{ color: 'var(--navy-100)' }}>0{i + 1}</span>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--navy-900)' }}>{r.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--navy-500)' }}>{r.phase}</p>
                <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--navy-700)' }}>{r.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* S6: Recommended solution */}
        <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: 'var(--navy-900)' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Recommended Next Step
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">{aiReport.recommendedSolution.name}</h3>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {aiReport.recommendedSolution.reason}
          </p>
          <div className="border rounded-xl px-5 py-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <p className="text-sm text-white">{aiReport.recommendedSolution.nextStep}</p>
          </div>
        </div>

        {/* S7: Closing */}
        {aiReport.closingMessage && (
          <div className="text-center px-6 py-8">
            <p className="text-xl italic leading-relaxed" style={{ color: 'var(--navy-700)' }}>
              "{aiReport.closingMessage}"
            </p>
          </div>
        )}

        {/* S8: CTA */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
            이 리포트를 PDF로 받으시거나<br />60분 무료 상담을 신청하세요
          </h3>
          <p className="text-base mb-8 leading-relaxed" style={{ color: 'var(--navy-500)' }}>
            이메일·연락처를 입력하시면 상세 분석 PDF 리포트를 즉시 발송하고,
            원하시는 경우 60분 무료 상담을 진행합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setWantConsultation(true); goTo(5); }}
              className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}>
              리포트 받고 상담 신청하기 <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => { setWantConsultation(false); goTo(5); }}
              className="px-8 py-4 text-base font-medium border-2 hover:bg-gray-50"
              style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}>
              리포트만 받기
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderStep5() {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center" style={{ color: 'var(--navy-900)' }}>
          마지막 단계입니다
        </h2>
        <p className="text-base text-center mb-10" style={{ color: 'var(--navy-500)' }}>
          입력하신 정보로 PDF 리포트를 즉시 발송하며, LS AX 컨설팅이 24시간 내 답변드립니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-800)' }}>
                이름 <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="text" required value={contactInfo.name}
                onChange={e => setContactInfo(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none focus:border-current rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-800)' }}>
                회사명 <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="text" required value={contactInfo.company}
                onChange={e => setContactInfo(p => ({ ...p, company: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-800)' }}>
                이메일 <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="email" required value={contactInfo.email}
                onChange={e => setContactInfo(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-800)' }}>
                전화번호 <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input type="tel" required value={contactInfo.phone}
                onChange={e => setContactInfo(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-600)' }}>직책</label>
              <input type="text" value={contactInfo.position}
                onChange={e => setContactInfo(p => ({ ...p, position: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-600)' }}>회사 규모</label>
              <select value={contactInfo.companySize}
                onChange={e => setContactInfo(p => ({ ...p, companySize: e.target.value }))}
                className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}>
                <option value="">선택</option>
                <option>1-10명</option>
                <option>11-50명</option>
                <option>51-200명</option>
                <option>200명+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--navy-600)' }}>
              상담 시 추가로 듣고 싶은 내용
            </label>
            <textarea rows={4} value={contactInfo.message}
              onChange={e => setContactInfo(p => ({ ...p, message: e.target.value }))}
              className="w-full px-4 py-3 border-2 focus:outline-none rounded-lg text-sm resize-none"
              style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }} />
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={wantConsultation}
                onChange={e => setWantConsultation(e.target.checked)}
                className="mt-0.5 w-4 h-4 flex-shrink-0" />
              <span className="text-sm" style={{ color: 'var(--navy-700)' }}>60분 무료 상담을 신청합니다</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={contactInfo.wantNewsletter}
                onChange={e => setContactInfo(p => ({ ...p, wantNewsletter: e.target.checked }))}
                className="mt-0.5 w-4 h-4 flex-shrink-0" />
              <span className="text-sm" style={{ color: 'var(--navy-700)' }}>LS AX 컨설팅 인사이트 뉴스레터 수신 동의 (월 1-2회)</span>
            </label>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" required checked={contactInfo.agreePrivacy}
                  onChange={e => setContactInfo(p => ({ ...p, agreePrivacy: e.target.checked }))}
                  className="mt-0.5 w-4 h-4 flex-shrink-0" />
                <span className="text-sm" style={{ color: 'var(--navy-700)' }}>
                  개인정보 수집·이용에 동의합니다{' '}
                  <button type="button" onClick={() => setShowPrivacyDetail(p => !p)}
                    className="underline text-xs" style={{ color: 'var(--navy-500)' }}>
                    {showPrivacyDetail ? '접기' : '상세 보기'}
                  </button>
                </span>
              </label>
              {showPrivacyDetail && (
                <div className="mt-3 ml-7 p-4 rounded-xl text-xs space-y-1 leading-relaxed"
                  style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-600)' }}>
                  <p>수집 항목: 이름, 회사명, 이메일, 전화번호, 직책(선택), 회사 규모(선택), 상담 요청사항(선택)</p>
                  <p>수집 목적: AI 진단 리포트 발송 + 상담 진행</p>
                  <p>보관 기간: 2년 / 보관 위치: Supabase (한국 리전)</p>
                  <p>제3자 제공: 없음 / 보관 기간 만료 시 자동 삭제</p>
                </div>
              )}
            </div>
          </div>

          {submitError && (
            <div className="p-4 rounded-xl text-sm" style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}>{submitError}</div>
          )}

          <button type="submit" disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 text-base font-semibold text-white hover:opacity-90 disabled:opacity-50 mt-4"
            style={{ backgroundColor: 'var(--navy-900)' }}>
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {isSubmitting ? '제출 중...' : (wantConsultation ? '리포트 받고 상담 신청하기' : '리포트 받기')}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>

          {!simpleMode && aiReport && (
            <button type="button" onClick={() => goTo(4)}
              className="w-full text-sm py-2 text-center"
              style={{ color: 'var(--navy-400)' }}>
              ← 진단 결과 다시 보기
            </button>
          )}
        </form>
      </div>
    );
  }

  function renderStep6() {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm p-10 md:p-14 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--navy-900)' }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--navy-900)' }}>진단이 완료되었습니다</h2>
          <p className="text-base leading-relaxed mb-3" style={{ color: 'var(--navy-600)' }}>
            입력하신 이메일로 PDF 리포트를 발송했습니다.<br />
            메일함을 확인해주세요. (스팸함도 함께 확인 부탁드립니다)
          </p>
          {wantConsultation && (
            <p className="text-sm font-medium mb-8 px-4 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-700)' }}>
              60분 무료 상담을 신청하셨습니다. LS AX 컨설팅에서 24시간 내 직접 연락드립니다.
            </p>
          )}

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { Icon: Mail, title: '이메일 확인', body: '발송된 진단 리포트 확인' },
              { Icon: Phone, title: '24시간 내 연락', body: 'LS AX 컨설팅이 직접 연락 (상담 신청 시)' },
              { Icon: BookOpen, title: '다른 자료 보기', body: '자체 AI 분석 리포트 등' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex flex-col items-center gap-2 p-4 rounded-xl"
                style={{ backgroundColor: 'var(--navy-50)' }}>
                <Icon className="w-5 h-5" style={{ color: 'var(--navy-700)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--navy-900)' }}>{title}</p>
                <p className="text-xs leading-relaxed text-center" style={{ color: 'var(--navy-500)' }}>{body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"
              className="px-8 py-3 text-sm font-semibold text-white text-center hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}>
              홈으로
            </Link>
            <Link to="/insights"
              className="px-8 py-3 text-sm font-medium border-2 text-center hover:bg-gray-50"
              style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}>
              다른 자료 보기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main Render ──────────────────────────────────────────────────────────

  const showProgress = step >= 1 && step <= 5;
  const pct = progressPercent();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="AI 진단 · 상담 신청 - LS AX 컨설팅"
        description="회사의 AI 도입 준비도를 7-10분 만에 진단합니다. Claude AI가 회사 상황에 맞춘 컨설팅 리포트를 즉시 제공하며, 무료 상담을 신청할 수 있습니다."
        url="https://www.lsconsulting.co.kr/consultation"
      />

      {showProgress && (
        <div className="sticky top-20 z-40 bg-white border-b" style={{ borderColor: 'var(--navy-100)' }}>
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--navy-100)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: 'var(--navy-900)' }}
              />
            </div>
            <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--navy-500)' }}>
              {step === 2 && selectedIndustry
                ? `${currentQ + 1} / ${totalQ} 문항`
                : `${pct}% 완료`}
            </span>
          </div>
        </div>
      )}

      {step === 0 && renderStep0()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
      {step === 6 && renderStep6()}

      {/* 참고 가격표 — step 0에서만 노출 */}
      {step === 0 && (
        <section className="py-24 px-8 lg:px-16 border-t" style={{ borderColor: 'var(--navy-100)' }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--navy-900)' }}>
                솔루션별 참고 가격
              </h2>
              <p className="text-sm" style={{ color: 'var(--navy-500)' }}>
                모든 금액은 시작 가격이며, 프로젝트 범위에 따라 조정됩니다. VAT 별도.
              </p>
            </div>

            {/* 5대 솔루션 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
              {([
                { Icon: LineChart, name: 'AI 시장 진단', price: '₩1,000,000', unit: '/ 프로젝트' },
                { Icon: Workflow, name: 'AI 업무 자동화', price: '₩8,000,000~', unit: '/ 구축' },
                { Icon: Globe, name: 'AI 최적화 웹·앱', price: '₩15,000,000~', unit: '/ 프로젝트' },
                { Icon: Code2, name: '맞춤 SaaS 개발', price: '₩20,000,000~', unit: '/ 프로젝트' },
                { Icon: Compass, name: 'AI 전략 컨설팅', price: '₩5,000,000', unit: '/ 월' },
              ] as const).map(({ Icon, name, price, unit }) => (
                <div
                  key={name}
                  className="p-5 rounded-xl border"
                  style={{ borderColor: 'var(--navy-100)', backgroundColor: 'var(--navy-25)' }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-lg mb-3"
                    style={{ backgroundColor: 'var(--navy-900)' }}
                  >
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-semibold mb-2" style={{ color: 'var(--navy-700)' }}>{name}</p>
                  <p className="text-base font-bold" style={{ color: 'var(--navy-900)' }}>{price}</p>
                  <p className="text-xs" style={{ color: 'var(--navy-500)' }}>{unit}</p>
                </div>
              ))}
            </div>

            {/* 의료 패키지 */}
            <div className="rounded-xl p-6 mb-10" style={{ backgroundColor: 'var(--navy-50)' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'var(--navy-600)' }}>
                Healthcare-Specialized Packages
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--navy-100)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone className="w-4 h-4" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                    <p className="text-sm font-bold" style={{ color: 'var(--navy-900)' }}>병원 PR &amp; 콘텐츠 운영</p>
                  </div>
                  <p className="text-lg font-bold mb-0.5" style={{ color: 'var(--navy-900)' }}>₩1,500,000~</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--navy-500)' }}>/ 월 (Basic부터, VAT 별도)</p>
                  <ul className="space-y-1">
                    {['월 20건 블로그 포스팅', '월 10건 유튜브 쇼츠', '월 1회 환자 트렌드 리포트'].map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--navy-600)' }} />
                        <span className="text-xs" style={{ color: 'var(--navy-700)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-5 border" style={{ borderColor: 'var(--navy-100)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4" style={{ color: 'var(--navy-700)' }} strokeWidth={1.75} />
                    <p className="text-sm font-bold" style={{ color: 'var(--navy-900)' }}>병원 개원 컨설팅</p>
                  </div>
                  <p className="text-lg font-bold mb-0.5" style={{ color: 'var(--navy-900)' }}>₩30,000,000~</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--navy-500)' }}>/ 프로젝트 (VAT 별도)</p>
                  <ul className="space-y-1">
                    {['입지 및 상권 분석', '병원 포지셔닝 설계', '초기 홍보 전략', '운영 구조 설계'].map((f) => (
                      <li key={f} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--navy-600)' }} />
                        <span className="text-xs" style={{ color: 'var(--navy-700)' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 면책 고지 */}
            <div className="rounded-xl px-6 py-4 mb-12" style={{ backgroundColor: 'var(--navy-50)' }}>
              <ul className="space-y-1">
                {[
                  '표기된 가격은 시작 가격입니다. 프로젝트 범위·기간·복잡도에 따라 조정됩니다.',
                  '모든 패키지는 무료 상담 후 맞춤 제안서로 정식 견적을 드립니다.',
                  '헬스케어 외 업종(서비스업·기관·기업)은 상담을 통해 산업 특화 견적을 별도 산정합니다.',
                ].map((note) => (
                  <li key={note} className="text-xs" style={{ color: 'var(--navy-500)' }}>
                    ※ {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* 최종 CTA 3-버튼 */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                어떻게 시작하시겠어요?
              </h3>
              <p className="text-sm mb-8" style={{ color: 'var(--navy-500)' }}>
                7분 AI 진단으로 맞춤 견적 · 60분 무료 상담 · 이메일 문의 중 편한 방법을 선택하세요
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => setStep(1), 300);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  <Sparkles className="w-4 h-4" />
                  AI 진단 시작
                </button>
                <a
                  href="tel:01092970940"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all border-2 hover:bg-navy-50"
                  style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
                >
                  <Phone className="w-4 h-4" />
                  무료상담
                </a>
                <a
                  href="mailto:fusionsfc@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all border"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}
                >
                  <Mail className="w-4 h-4" />
                  이메일 문의
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
