export interface InsightItem {
  category: 'Monthly Cancer Voice Report' | 'Healthcare Strategy Research' | 'Disease Insight Report' | 'Healthcare Strategy Notes';
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  highlights?: string[];
  isFeatured?: boolean;
  link: string;
}

export const insightsData: InsightItem[] = [
  {
    category: 'Monthly Cancer Voice Report',
    title: '간암 환자 온라인 니즈 분석 및\n요양·한방병원 의료서비스 강화 전략',
    date: 'March 2026',
    excerpt:
      '2026년 3월 온라인 커뮤니티 DB 264건 분석. 이식·수술, 통증·영양, 보호자 정서까지 요양·한방병원 실행 우선순위와 블로그 토픽을 제시합니다.',
    readTime: '26 min read',
    highlights: ['264건 분석', '부서별 전략 6파트', '우선순위 매트릭스', '콘텐츠 토픽 6선'],
    isFeatured: true,
    link: '/reports/liver-cancer-2026-03',
  },
  {
    category: 'Monthly Cancer Voice Report',
    title: '폐암 환자 온라인 니즈 분석 및\n2차 요양·재활병원 의료서비스 강화 전략',
    date: 'April 2026',
    excerpt:
      '2026년 3월 폐암 커뮤니티 PVM 160건 분석. 수술·항암 이슈, 보호자 목소리, 부서별 실행 전략과 우선순위 매트릭스·블로그 토픽을 정리합니다.',
    readTime: '24 min read',
    highlights: ['160건 분석', '파트별 전략 7부', '우선순위 매트릭스', '콘텐츠 토픽 8선'],
    isFeatured: true,
    link: '/reports/lung-cancer-2026-03',
  },
  {
    category: 'Healthcare Strategy Research',
    title: '유방암 환자 니즈 기반\n치료 단계별 케어 전략 리포트\n– PVM 데이터 기반 병원 운영 혁신 가이드 –',
    date: 'April 2026',
    excerpt: '2026년 3월 620건의 데이터 분석 결과. 환자는 치료보다 “치료를 버티는 방법”을 더 많이 묻고 있습니다. 이 리포트는 환자 질문 데이터를 기반으로 병원의 실제 운영 전략을 재정의합니다.',
    readTime: '24 min read',
    highlights: ['Executive Summary', '데이터 시각화', '부서별 실행 초점', '병원 실행 가이드'],
    isFeatured: true,
    link: '/report/breast-cancer-stage-care-strategy'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암종별 방사선치료 환자 질문 분석 리포트',
    date: 'March 2026',
    excerpt: 'PVM 기반 2차 암요양·재활병원 부서별 대응 체크리스트 & KPI 가이드. 방사선치료 중 환자와 보호자가 실제로 반복하는 질문을 분석하여 부서별 실행 체크리스트와 KPI를 제시합니다.',
    readTime: '22 min read',
    highlights: ['부서별 체크리스트', 'KPI 가이드', '암종별 환자 보이스', '운영 시스템 설계'],
    isFeatured: true,
    link: '/report/radiotherapy-patient-analysis'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암치료 형태별 암요양·재활 맞춤 케어 전략',
    date: 'February 2026',
    excerpt: 'PVM DB 기반 2차 암병원 실행 가이드. 수술·항암·방사선 치료 단계별 환자의 실제 질문 데이터(총 125개)를 5개 암종별로 분석하여 2차 암병원의 역할과 KPI 실행 전략을 제시합니다.',
    readTime: '25 min read',
    highlights: ['치료 단계별 전략', '125개 환자 보이스', '5개 암종별 분석', '실행 가이드'],
    isFeatured: true,
    link: '/report/cancer-treatment-type-care-strategy'
  },
  {
    category: 'Healthcare Strategy Notes',
    title: '환자 퇴원·전원 결정 구조 분석 리포트',
    date: 'March 2026',
    excerpt: '환자는 치료가 아니라 관리 공백 때문에 떠납니다. 퇴원과 전원은 치료 실패가 아니라 관리의 불확실성에서 시작됩니다.',
    readTime: '20 min read',
    highlights: ['퇴원 결정 흐름', '4가지 스트레스 축', '5가지 전략', '부서별 매뉴얼'],
    isFeatured: false,
    link: '/report/patient-discharge-transfer-structure'
  },
  {
    category: 'Monthly Cancer Voice Report',
    title: '2026년 2월간 위암 환자 질문 유형 분석 보고서',
    date: 'February 2026',
    excerpt: '위암 환자는 치료보다 "관리의 확실성"을 원합니다. PVM 분석으로 검증된 회복 과정의 불확실성과 실행 가능한 케어 시스템.',
    readTime: '18 min read',
    highlights: ['신체 변화 구조', '케어 프로토콜', '영양·체중 추적', '생활 문제 해결'],
    isFeatured: false,
    link: '/report/stomach-cancer-pvm-analysis'
  },
  {
    category: 'Monthly Cancer Voice Report',
    title: '2026년 2월 폐암 환자 니즈 분석 보고서',
    date: 'February 2026',
    excerpt: '검사 결과 해석, 표적·면역 치료 선택, 재발 공포까지 폐암 환자의 질문 구조와 병원의 실행 전략을 분석합니다.',
    readTime: '15 min read',
    highlights: ['Lung Cancer Insight', 'Patient Voice Analysis', '불안 관리 전략', '2차병원 실행 매뉴얼'],
    isFeatured: false,
    link: '/report/lung-cancer-insight-202602'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암환자 요양·재활 2차병원을 위한\n환자여정 기반 이상적 의료서비스 실행 매뉴얼',
    date: 'March 2026',
    excerpt: 'PVM 데이터 기반으로 암환자의 검색, 상담, 입원, 회복, 퇴원 이후까지 실제 병원이 적용할 수 있는 실행 전략을 제시합니다.',
    readTime: '20 min read',
    highlights: ['Patient Journey Model', '실행 체크리스트 포함', '부서별 운영 가이드', '복 설계 전략'],
    isFeatured: true,
    link: '/report/cancer-journey-execution-manual'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암환자 불안 점수 변화 추적 분석 보고서\n— 환자보이스 기반 실행 전략',
    date: 'March 2026',
    excerpt: '진단부터 추적 검사 전까지 환자의 불안 구조를 분석하고 상담, 간호, 재활, 사후관리 부서의 실행 매뉴얼을 제시합니다.',
    readTime: '20 min read',
    highlights: ['Patient Voice Insight', 'Anxiety Curve Model', 'Department Action Plan', '이탈 방지 전략'],
    isFeatured: false,
    link: '/report/cancer-anxiety-voice-execution'
  },
  {
    category: 'Monthly Cancer Voice Report',
    title: '2026년 2월 폐암 환자\n온라인 니즈 분석 보고서',
    date: 'February 20, 2026',
    excerpt: '2026년 2월, 312건의 폐암 환자 온라인 보이스를 분석하여 표적치료, 면역항암, 부작용 관리 등 치료 단계별 고민과 정보 탐색 패턴을 정리했습니다. 데이터 기반으로 폐암 환자 맞춤 의료서비스의 전략 방향을 제시합니다.',
    readTime: '15 min read',
    isFeatured: false,
    link: '/insights/report/202602'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암요양 및 재활 병원을 위한\nPVM 기반 KPI 실행 설계 보고서',
    date: 'February 22, 2026',
    excerpt: '환자·보호자 질문 1,190건 분석을 기반으로 병원 전체 및 부서별 KPI와 실행 체크리스트를 제시합니다.',
    readTime: '20 min read',
    highlights: ['확신 설계 KPI', '부작용 관리 지표', '회복 프로그램 성과 관리', '부서별 실행 매뉴얼 포함'],
    isFeatured: false,
    link: '/research/pvm-kpi-execution-report'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암환자 및 보호자 질문 유형 기반\n병원 운영 고도화 실행 보고서',
    date: 'February 22, 2026',
    excerpt: 'PVM 1,190건 데이터 분석. 6대 페르소나 구조를 기반으로 병원 부서별 실행 매뉴얼을 제시합니다.',
    readTime: '18 min read',
    highlights: ['6대 환자 페르소나', '상담·간호·행정·마케팅 실행 매뉴얼', '확신 구조 설계 전략'],
    isFeatured: false,
    link: '/research/patient-persona-execution'
  },
  {
    category: 'Healthcare Strategy Research',
    title: '암 환자는 언제 병원을 바꾸는가\n— 치료가 아니라 "관리 경험"에서 결정이 갈린다',
    date: 'February 20, 2026',
    excerpt: '2026년 2월 PVM 데이터 531건 분석. 부작용, 관리 불안, 상담 로드맵 부재가 병원 이탈의 핵심 요인임을 확인했습니다.',
    readTime: '12 min read',
    highlights: ['부작용 언급 16.6%', '폐암 비중 59.9%', '"확인 행동" 반복 패턴 발견'],
    isFeatured: false,
    link: '/research/pvm-hospital-switch'
  },
  {
    category: 'Disease Insight Report',
    title: '유방암 환자 장기 치료 단계의\n니즈 구조 분석 보고서',
    date: 'February 2026',
    excerpt: '2026년 2월 PVM 데이터 140건 분석. 호르몬 치료, 수술 후 관리, 장기 복용 불안이 유방암 환자의 핵심 고민임을 확인했습니다.',
    readTime: '12 min read',
    highlights: ['유방암 140건 (26.9%)', '타목시펜 복용 다수 언급', '감정 1위: 궁금'],
    isFeatured: false,
    link: '/disease/breast-cancer-report'
  },
  {
    category: 'Disease Insight Report',
    title: '위암 수술 이후\n환자 생활 적응 니즈 분석 보고서',
    date: 'February 2026',
    excerpt: '2026년 2월 PVM 데이터 분석. 위암 환자의 핵심 고민은 치료가 아니라 식이 관리와 체력 회복 문제에 집중되어 있습니다.',
    readTime: '10 min read',
    highlights: ['수술 후 관리 질문 다수', '식이·영양 관련 니즈 집중', '감정: 걱정/불안 중심'],
    isFeatured: false,
    link: '/disease/stomach-cancer-report'
  },
  {
    category: 'Disease Insight Report',
    title: '대장암 수술 이후\n장 기능 회복 니즈 분석 보고서',
    date: 'February 2026',
    excerpt: '2026년 2월 PVM 데이터 분석. 대장암 환자의 핵심 고민은 배변 변화, 장루 관리, 재발 불안에 집중되어 있습니다.',
    readTime: '10 min read',
    highlights: ['수술 후 배변 문제 다수', '재발 검사 관련 질문 증가', '감정: 걱정/불안 중심'],
    isFeatured: false,
    link: '/disease/colon-cancer-report'
  }
];