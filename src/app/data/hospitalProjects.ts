export interface HospitalProject {
  id: string;
  name: string;
  category: string;
  tags: string[];
  image?: { src: string; srcSet: string; alt: string };
  website?: string;
  records: {
    year?: number;
    scope: string;
  }[];
}
export const hospitalProjects: HospitalProject[] = [{
  id: 'gapyeong-sansok',
  name: '가평산속요양병원',
  category: '암요양',
  tags: ['개원·기획', '홍보·경영지원'],
  records: [{
    year: 2011,
    scope: '암특화 통합 암요양병원 기획'
  }, {
    year: 2018,
    scope: '온라인 홍보 및 홈페이지 리뉴얼'
  }]
}, {
  id: 'mokto',
  name: '목토한방병원',
  category: '암특화 한방',
  tags: ['개원·기획'],
  records: [{
    year: 2017,
    scope: '암특화 한방병원 개원기획'
  }]
}, {
  id: 'baekse',
  name: '감인의료재단 백세요양병원',
  category: '암요양',
  tags: ['홍보·경영지원'],
  records: [{
    year: 2018,
    scope: '암특화 요양병원 홍보대행 및 경영지원'
  }]
}, {
  id: 'seoul-healing',
  image: { src: '/images/optimized-v1/heal-960.webp', srcSet: '/images/optimized-v1/heal-480.webp 480w, /images/optimized-v1/heal-768.webp 768w, /images/optimized-v1/heal-960.webp 960w, /images/optimized-v1/heal-1280.webp 1280w', alt: '서울힐링요양병원 기존 소개 사진' },
  website: 'https://www.seoulhealinghospital.co.kr/',
  name: '서울힐링요양병원',
  category: '암요양',
  tags: ['개원·기획', '홍보·경영지원'],
  records: [{
    year: 2019,
    scope: '암특화 요양병원 개원기획 및 홍보·경영지원'
  }]
}, {
  id: 'taedong',
  image: { src: '/images/optimized-v1/tae-614.webp', srcSet: '/images/optimized-v1/tae-480.webp 480w, /images/optimized-v1/tae-614.webp 614w', alt: '태동의료법인 관련 기관 춘천태동요양병원 기존 소개 사진' },
  website: 'https://www.taedonghp.co.kr/',
  name: '태동의료법인',
  category: '의료법인',
  tags: ['개원·기획'],
  records: [{
    year: 2019,
    scope: '암특화 의료법인 개설컨설팅'
  }]
}, {
  id: 'ichae',
  name: '이채한방병원',
  category: '암특화 한방',
  tags: ['개원·기획'],
  records: [{
    year: 2019,
    scope: '암특화 한방병원 개원컨설팅'
  }]
}, {
  id: 'rusk-seoul',
  image: { src: '/images/optimized-v1/rh-960.webp', srcSet: '/images/optimized-v1/rh-480.webp 480w, /images/optimized-v1/rh-768.webp 768w, /images/optimized-v1/rh-960.webp 960w, /images/optimized-v1/rh-1280.webp 1280w', alt: '러스크서울병원 기존 소개 사진' },
  website: 'https://ruskseoul.co.kr/',
  name: '러스크서울병원',
  category: '재활·암진료 연계',
  tags: ['홍보·경영지원', '재활 연계'],
  records: [{
    year: 2020,
    scope: '병원 이전 이후 컨설팅'
  }]
}, {
  id: 'amina',
  name: '아미나요양병원',
  category: '암특화 병원',
  tags: ['개원·기획'],
  records: [{
    year: 2021,
    scope: '암특화 병원 개원컨설팅'
  }]
}, {
  id: 'webiang',
  name: '위비앙병원',
  category: '암특화 병원',
  tags: ['개원·기획'],
  records: [{
    year: 2021,
    scope: '암특화 병원 개원컨설팅'
  }]
}, {
  id: 'beautiful',
  name: '뷰티풀한방병원',
  category: '한방병원',
  tags: ['홍보·경영지원'],
  image: { src: '/images/optimized-v1/bt-960.webp', srcSet: '/images/optimized-v1/bt-480.webp 480w, /images/optimized-v1/bt-768.webp 768w, /images/optimized-v1/bt-960.webp 960w, /images/optimized-v1/bt-1280.webp 1280w', alt: '뷰티풀한방병원 기존 소개 사진' },
  website: 'https://www.btful.co.kr/',
  records: [{ scope: '병원 컨설팅 · 직원교육 · 홍보 · 홈페이지 구축' }]
}];
