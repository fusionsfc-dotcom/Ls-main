export type BusinessReportSection = {
  /** 섹션 제목 (앞 번호는 자동 부여하므로 본문만) */
  title: string;
  /** 섹션 요약 2~4줄 */
  summary: string;
  /** 핵심 신호/데이터 (불릿) */
  signals: string[];
  /** 시사점·실행안 (불릿) */
  actions: string[];
  /** 참고 메모 (선택) */
  note?: string;
};

export type BusinessReportMeta = {
  slug: string;
  /** 한 줄 제목 */
  title: string;
  /** 부제 */
  subtitle: string;
  /** 발행 정보 (예: 제1호 · 기업편 · 2026-06) */
  issue: string;
  /** 분야 라벨 (예: 부동산 AX 인사이트) */
  field: string;
  /** 데이터 근거 (익명화·일반화 유지) */
  dataBasis: string;
  /** 도입부 */
  intro: string;
};

export type BusinessReportData = {
  meta: BusinessReportMeta;
  sections: BusinessReportSection[];
};

/* ------------------------------------------------------------------ *
 * 블록 기반 분석 리포트 (산업 분석 등 차트·통계 중심 리포트용)
 * inline 강조는 <b>...</b> 만 허용 (신뢰된 자체 콘텐츠)
 * ------------------------------------------------------------------ */

export type AnalysisStat = {
  value: string;
  label: string;
  source?: string;
  /** 경고/부정 지표 강조 (로즈 컬러) */
  warn?: boolean;
};

export type AnalysisBar = {
  label: string;
  /** 0~100 채움 비율 */
  pct: number;
  /** 우측에 표기할 값 텍스트 (예: 80%+, 5%) */
  valueText: string;
  /** 막대 색상 직접 지정 (미지정 시 기본 네이비) */
  color?: string;
  /** 깔때기에서 부정 지표(로즈)로 표시 */
  red?: boolean;
};

export type AnalysisCompareCard = {
  title: string;
  rows: { label: string; value: string }[];
};

export type AnalysisTakeaway = {
  /** 좌측 배지 (숫자·알파벳 등) */
  marker: string;
  html: string;
};

export type AnalysisBlock =
  | { kind: 'p'; html: string }
  | { kind: 'stats'; items: AnalysisStat[] }
  | { kind: 'funnel'; title: string; subtitle?: string; bars: AnalysisBar[] }
  | { kind: 'hbars'; title: string; subtitle?: string; bars: AnalysisBar[] }
  | { kind: 'compare'; cards: AnalysisCompareCard[] }
  | { kind: 'callout'; html: string; variant?: 'default' | 'warn' }
  | { kind: 'takeaways'; items: AnalysisTakeaway[] }
  | { kind: 'srcNote'; html: string };

export type AnalysisSection = {
  /** 섹션 라벨 (예: 01 · 현황) */
  snum?: string;
  title: string;
  blocks: AnalysisBlock[];
};

export type BusinessAnalysisReportMeta = {
  slug: string;
  /** 리포트 제목 */
  title: string;
  /** 부제 / 데크 */
  subtitle: string;
  /** 상단 키커 라벨 */
  kicker: string;
  /** 분야 라벨 (예: 산업 분석) */
  field: string;
  /** 발행 정보 (예: 제2호 · 기업편 · 2026-06) */
  issue: string;
  /** 데이터 기준 (예: 2025–2026 공개 조사 종합) */
  basis: string;
};

export type BusinessAnalysisReportData = {
  meta: BusinessAnalysisReportMeta;
  /** 핵심 요약 박스 단락들 (<b> 허용) */
  summary: string[];
  sections: AnalysisSection[];
  sources: string[];
  disclaimer: string;
};
