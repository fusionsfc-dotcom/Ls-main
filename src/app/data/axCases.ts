export interface AxCase {
  id: string;
  name: string;
  eyebrow: string;
  summary: string;
  status: string;
  scope: string[];
  workflow: string[];
  note: string;
  publicUrl?: string;
  tourUrl?: string;
}
export const medicalAxCases: AxCase[] = [{
  id: 'happy-life',
  name: '해피라이프 앱',
  eyebrow: 'HappyLife · 환자와 보호자',
  status: '개발 사례',
  summary: '환자와 보호자가 건강정보를 찾고 일상의 기록과 병원 소통을 이어갈 수 있도록 설계한 서비스입니다.',
  scope: ['환자 홈과 건강정보', '일상의 루틴과 기록', '병원과의 소통 접점'],
  workflow: ['환자 홈', '루틴·정보', '병원 연결'],
  note: 'HappyLifeCare의 환자·보호자 서비스입니다.',
  publicUrl: 'https://happylifecare.kr/'
}, {
  id: 'happy-care',
  name: '해피케어 병원 프로그램',
  eyebrow: 'HappyCare · 병원 운영',
  status: '개발 사례',
  summary: '병원의 환자 관리, 상담, 프로그램과 일정을 한 흐름에서 다루도록 설계한 병원용 서비스입니다.',
  scope: ['환자와 상담 현황', '프로그램과 일정 관리', '질문과 안내의 연결'],
  workflow: ['병원 현황', '상담·프로그램', '일정·응대'],
  note: '환자 앱과 병원용 시스템을 아우르는 HappyLifeCare의 병원 서비스입니다.'
}, {
  id: 'ai-website',
  name: 'AI 최적화 웹사이트',
  eyebrow: 'Web · 정보와 상담의 연결',
  status: '개발 사례',
  summary: '병원의 서비스와 정보를 이해하기 쉬운 콘텐츠와 구조로 정리하고, 검색과 모바일 이용을 고려해 웹사이트를 구축합니다.',
  scope: ['서비스 정보와 콘텐츠 설계', '검색이 이해하는 정보 구조', '모바일과 상담 동선'],
  workflow: ['서비스 정보', '관련 FAQ', '상담 연결'],
  note: '명확한 정보 구조와 접근성을 설계합니다. 검색 순위나 AI 인용을 보장하지 않습니다.'
}, {
  id: 'hospital-office',
  name: '병원 오피스 프로그램',
  eyebrow: 'Office · 반복 업무의 정리',
  status: '기획·개발 사례',
  summary: '예약과 일정, 후속 연락 같은 반복 업무를 연결하기 위한 병원 오피스 서비스입니다.',
  scope: ['예약과 일정의 업무 설계', '후속 연락과 처리 기록', '담당자별 운영 흐름'],
  workflow: ['예약·일정', '후속 연락', '처리 기록'],
  note: '병원별 도입 범위와 기능 연결은 현재 업무를 검토한 뒤 정합니다.'
}];
export const industryAxCases: AxCase[] = [{
  id: 'spacecare',
  name: '모두의 공간케어',
  eyebrow: 'Hospitality AX · 제주 호텔·펜션 객실 운영',
  status: '개발 사례',
  summary: '제주 호텔·펜션의 객실 케어와 인력 운영을 연결하는 플랫폼입니다. 호텔 담당자는 객실 진행을 확인하고, 현장 파트너는 배정된 업무와 고객 요청을 처리하며, 완료 기록은 검수와 정산으로 이어집니다.',
  scope: ['객실 진행·인력 배정', '결원 대응·대기 인력', '사진·영상 기록과 검수', '객실 QR 요청·다국어 번역', '완료 내역 기반 정산'],
  workflow: ['객실·업무 배정', '파트너 수행·결원 대응', '사진·영상 기록·검수', '고객 요청·후속 처리', '완료 내역·정산'],
  note: '지배인·오너·도급업체·위탁운영사의 업무를 역할별 화면으로 연결합니다. 공개 홈페이지와 서비스 둘러보기에 소개된 내용을 반영했습니다.',
  publicUrl: 'https://www.mdspacecare.com/',
  tourUrl: 'https://www.mdspacecare.com/tour'
}, {
  id: 'spacelink',
  name: '스페이스링크',
  eyebrow: 'Property & construction · 프로젝트 협업',
  status: '개발 진행 중',
  summary: '부동산 탐색과 건설 프로젝트의 사업 검토, 문서, 소통, 건축주 공유를 하나의 흐름으로 연결하는 플랫폼 개발 프로젝트입니다.',
  scope: ['사업 검토와 프로젝트 구조', '역할별 정보 접근', '문서·소통·건축주 공유'],
  workflow: ['사업 검토', '프로젝트·문서', '담당자 협업', '건축주 공유'],
  note: '현재 개발 중인 프로젝트로, 기획과 구현 범위를 소개합니다.'
}, {
  id: 'gaax',
  name: 'GAAX · 보험설계플랫폼',
  eyebrow: 'Insurance AX · 설계사와 고객의 연결',
  status: '개발·검증 중',
  summary: '보험정보 탐색과 설계사 연결, 고객·계약·만기·상담 관리를 이어주는 보험설계 플랫폼입니다. 설계사의 업무공간과 고객의 내 보험·서류·대화 화면을 연결하도록 설계했습니다.',
  scope: ['고객·계약·갱신 관리', '일정·상담·관계 관리', '고객 보험함·서류 공유', '조직·역할별 접근 관리'],
  workflow: ['자료 등록·정리', '고객·계약 확인', '만기·일정·상담', '선택한 정보 공유'],
  note: '공개 체험은 가상 데이터 기반 UI 데모입니다. 고객 연결·본인확인과 OCR·PDF·통화·AI 기능의 실제 연동은 운영 검증 또는 준비 단계입니다.',
  publicUrl: 'https://gaax-dev.vercel.app/',
  tourUrl: 'https://gaax-dev.vercel.app/demo/advisor'
}, {
  id: 'namsung-chemical',
  name: '남성케미칼',
  eyebrow: 'Manufacturing · 제품과 주문',
  status: '구축 사례',
  summary: '제조업의 회사·제품 정보와 디지털 카탈로그, 고객 주문 및 담당자 관리를 연결한 웹서비스 구축 사례입니다.',
  scope: ['제품 탐색과 디지털 카탈로그', '고객 주문과 담당자 관리', '한국어·영어 인터페이스'],
  workflow: ['제품 탐색', '고객 주문', '견적·진행 관리', '고객 소통'],
  note: '제품 정보부터 주문·처리 이력까지 연결하는 업무 구조를 구현했습니다.',
  publicUrl: 'https://www.nschemical.co.kr/'
}];
