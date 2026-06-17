// LS AX 컨설팅 홈 — 이미지 자산
// 제품 스크린샷(cancerPlatform / rehabApp / spaceAx)은 임시 스톡 이미지입니다.
// 실제 제품 캡처가 준비되면 아래 URL만 교체하면 됩니다.
// (ImageWithFallback 사용으로 로드 실패 시에도 레이아웃이 깨지지 않습니다.)

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const homeImages = {
  // 히어로 — AI/데이터 추상 (네이비 그라데이션 위에 은은하게 깔림)
  hero: u('photo-1620712943543-bcc4688e7485', 2000),

  // 3대 자체 플랫폼 (※ 임시 placeholder — 실제 제품 스크린샷으로 교체 예정)
  cancerPlatform: u('photo-1551288049-bebda4e38f71'), // 대시보드/분석
  rehabApp: u('photo-1576678927484-cc907957088c'), // 재활/케어
  spaceAx: u('photo-1497366216548-37526070297c'), // 공간/오피스 자동화

  // 두 개의 전문 분야
  medical: 'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/top_2.jpeg', // 병원
  corporate: u('photo-1486406146926-c627a92ad1ab'), // 기업/빌딩

  // 산업별 컨설팅
  construction: u('photo-1503387762-592deb58ef4e'), // 건설
  hospitality: u('photo-1566073771259-6a8506099945'), // 숙박업

  // 신뢰/트랙레코드 배경
  trust: u('photo-1454165804606-c3d57bc86b40', 2000), // 데이터/협업
} as const;

export type HomeImageKey = keyof typeof homeImages;

// AX(서비스) 페이지 — 솔루션/강점 이미지
export const axImages = {
  hero: u('photo-1639762681485-074b7f938ba0', 2000), // AI 추상
  diagnosis: u('photo-1460925895917-afdab827c52f'), // 데이터 분석/리포트
  automation: u('photo-1518186285589-2f7649de83e0'), // 워크플로우/네트워크
  webapp: u('photo-1461749280684-dccba630e2f6'), // 코드/웹
  saas: u('photo-1551288049-bebda4e38f71'), // 대시보드
  strategy: u('photo-1542744173-8e7e53415bb0'), // 전략 미팅
  aiConsult: u('photo-1677442136019-21780ecad995'), // AI 챗봇
  platform: u('photo-1531297484001-80022131f5a1'), // 플랫폼/아키텍처
} as const;

// 기업(Business) 페이지 — 업무 자동화 이미지
export const bizImages = {
  hero: u('photo-1497366811353-6870744d04b2', 2000), // 오피스 워크스페이스
  system: u('photo-1531403009284-440f080d1e12', 1600), // 협업/운영
  cta: u('photo-1454165804606-c3d57bc86b40', 2000), // 데이터/협업
} as const;

// 의료(Healthcare) 페이지 — HappyLifeCare 플랫폼 이미지
export const medImages = {
  hero: u('photo-1518152006812-edab29b069ac', 2000), // 첨단의료 수술/시술
  intro: u('photo-1576765608535-5f04d1e3f289', 1600), // 환자 케어/태블릿
  patientApp: u('photo-1551650975-87deedd944c3'), // 건강 어플 화면(사람 없음)
  hospitalSys: u('photo-1551288049-bebda4e38f71'), // 관리자 대시보드
  pvm: u('photo-1551434678-e076c223a692'), // 데이터/협업
  care: u('photo-1631815589968-fdb09a223b1e'), // 의료진 케어
} as const;
