export const reportMeta = {
  title: '간암 환자 온라인 니즈 분석 및 요양·한방병원 의료서비스 강화 전략',
  subtitle: '2026년 3월 온라인 커뮤니티 DB 264건 분석 기반 월간 리포트',
  period: '2026년 3월',
  totalCases: 264,
  publishedBy: 'LS컨설팅',
  disease: '간암 · 간경화 · 간염 · 담도질환',
} as const;

export const kpiData = [
  { num: '264건', label: '총 온라인 질문·공유 건수', color: 'blue' as const },
  { num: '78%', label: '질문 유형 비율 (정보 요청)', color: 'teal' as const },
  { num: '41%', label: '이식·수술 관련 상담 비중', color: 'amber' as const },
  { num: '68%', label: '보호자가 대리 질문한 비율', color: 'coral' as const },
];

export const categoryBarData = [
  { label: '이식·수술 관련', count: 41, color: '#185FA5' },
  { label: '통증·합병증 관리', count: 34, color: '#A32D2D' },
  { label: '영양·식이', count: 29, color: '#0F6E56' },
  { label: '보험·복지 행정', count: 22, color: '#854F0B' },
  { label: '검사·진단', count: 20, color: '#534AB7' },
  { label: '항암제 부작용', count: 18, color: '#993C1D' },
  { label: '심리·정서 지지', count: 15, color: '#3B6D11' },
  { label: '이식 후 관리', count: 14, color: '#639922' },
];

export const emotionBarData = [
  { label: '걱정·불안', count: 38, color: '#E24B4A' },
  { label: '답답·막막', count: 24, color: '#BA7517' },
  { label: '힘들다', count: 20, color: '#7F77DD' },
  { label: '감사·안도', count: 16, color: '#1D9E75' },
  { label: '무섭·두렵', count: 15, color: '#993C1D' },
  { label: '절망·슬픔', count: 12, color: '#D4537E' },
  { label: '절실·긴박', count: 10, color: '#888780' },
];

export const emotionGridData = [
  { pct: '38%', title: '걱정·불안·무서움', keywords: '걱정·무섭·불안·두렵', colorBg: '#FCEBEB', colorText: '#A32D2D', colorSub: '#791F1F' },
  { pct: '24%', title: '답답함·막막함', keywords: '답답·막막·힘들다', colorBg: '#FAEEDA', colorText: '#854F0B', colorSub: '#633806' },
  { pct: '16%', title: '감사·안도', keywords: '감사·다행·기쁨', colorBg: '#E1F5EE', colorText: '#0F6E56', colorSub: '#085041' },
  { pct: '12%', title: '절망·슬픔', keywords: '절망·슬픔·포기', colorBg: '#FCEBEB', colorText: '#A32D2D', colorSub: '#791F1F' },
  { pct: '10%', title: '절실·긴박함', keywords: '절실·급함·빨리', colorBg: '#F3F4F6', colorText: '#4B5563', colorSub: '#6B7280' },
  { pct: '—', title: '순수 정보 탐색', keywords: '사실 확인·비교', colorBg: '#E1F5EE', colorText: '#0F6E56', colorSub: '#085041' },
];

export const painPoints = [
  {
    id: 'pain01',
    icon: '🔴',
    iconBg: '#FCEBEB',
    count: '34건',
    title: '통증·증상 조절 정보 결핍',
    subtitle: '가장 높은 고통 감정 동반',
    body: "색전술·수술 후 조절되지 않는 복통, 발열, 배액관 통증에 대한 구체적 대처 정보가 부족한 상황. 말기 환자의 경우 마약성 패치로도 조절이 안 되는 암성 통증 사례가 다수 확인됨. '비명 지른다', '밤에 잠을 못 잔다', '무섭다'는 표현이 반복적으로 등장하며 24시간 통증 대응 체계 및 완화의학적 접근에 대한 수요가 매우 높음.",
    tags: [
      { label: '암성 통증', color: 'red' as const },
      { label: '마약성 진통제 한계', color: 'red' as const },
      { label: '시술 후 발열', color: 'red' as const },
      { label: '복수 복통', color: 'red' as const },
    ],
  },
  {
    id: 'pain02',
    icon: '🟡',
    iconBg: '#FAEEDA',
    count: '52건',
    title: '이식·수술 후 회복기 케어 정보 공백',
    subtitle: '전체에서 가장 높은 빈도 카테고리',
    body: "이식·절제 수술 후 자택 vs 요양병원 선택, 식단, 배액관 관리, 복대 착용, 운동 시작 시점에 대한 구체적 가이드 요청이 집중됨. '방귀가 났는데 밥 먹어도 되나', '배액관 양이 20cc인데 뺄 수 있나' 같은 실생활 단위 질문이 많아, 퇴원 후 홈케어 프로토콜 부재가 명확히 드러남. 요양병원 선택 기준으로는 식단과 꼼꼼한 관리가 반복 언급됨.",
    tags: [
      { label: '퇴원 후 홈케어', color: 'amber' as const },
      { label: '배액관 자가관리', color: 'amber' as const },
      { label: '식단 구성', color: 'amber' as const },
      { label: '운동 복귀 시점', color: 'amber' as const },
      { label: '요양병원 추천', color: 'amber' as const },
    ],
  },
  {
    id: 'pain03',
    icon: '🔵',
    iconBg: '#E6F1FB',
    count: '29건',
    title: '영양·식이 관리 정보 수요 급증',
    subtitle: '4기·말기 비중 높음',
    body: "항암 중 식사 불가, 체중 감소, 단백질 보충, 복수 천자 후 영양 보충 등 치료 단계별 맞춤 영양 전략에 대한 질문이 급증. '뉴케어 먹여도 되나', '꿀마늘은 간에 무리가 없나', '항암 중 상황버섯 달인 물은 어떤가' 등 민간요법 안전성 확인 욕구도 높음. 4기 환자 보호자들이 암환자 식단 배달 서비스를 구체적으로 탐색하는 경향이 뚜렷함.",
    tags: [
      { label: '항암 중 영양', color: 'blue' as const },
      { label: '복수 천자 후 단백질', color: 'blue' as const },
      { label: '민간요법 안전성', color: 'blue' as const },
      { label: '암환자 식단 서비스', color: 'blue' as const },
    ],
  },
  {
    id: 'pain04',
    icon: '🟢',
    iconBg: '#E1F5EE',
    count: '21건',
    title: '심리·정서 지지 욕구 — 보호자 번아웃',
    subtitle: "'힘들다'·'슬프다'·'답답하다' 집중",
    body: "'딸이 공여자인데 수술 사고가 생길까 무섭다', '8년 전 딸이 기증했는데 아버지 재악화로 가족이 무너지고 있다', '이식 후 성격이 예민해진 아버지 때문에 가족 모두 힘들다' 등 환자 가족 전체의 심리적 붕괴 신호가 감지됨. 감정 토로·위로 목적의 게시물이 전체의 약 22%를 차지하며, 보호자 대상 심리·소진 케어 프로그램에 대한 수요가 숨어 있음.",
    tags: [
      { label: '보호자 소진', color: 'teal' as const },
      { label: '공여자 가족 불안', color: 'teal' as const },
      { label: '정서 지지', color: 'teal' as const },
      { label: '말기 수용 과정', color: 'teal' as const },
    ],
  },
];

export const strategies = [
  {
    part: 'PART 1',
    partLabel: '완화의학·통증 관리팀',
    partColor: 'coral' as const,
    items: [
      {
        type: '핵심 과제',
        title: '암성 통증 다단계 프로토콜 수립',
        body: '마약성 패치·진통제로 조절 안 되는 환자 비중이 높음. WHO 3단계 진통 사다리 기반으로 내원 환자의 통증 단계를 초기 평가하고, 오피오이드 전환·증량 프로토콜을 표준화할 것. 색전술·수술 후 발열(38도 이상) 대응 매뉴얼을 보호자용으로 제작하여 퇴원 시 배포하면 재입원 불안을 줄일 수 있음.',
      },
      {
        type: '서비스 강화',
        title: '24시간 통증 모니터링 원격 상담 라인 운영',
        body: "퇴원 후 환자가 '응급실 가야 하나, 지켜봐도 되나'를 판단하지 못해 밤중에 공포에 빠지는 사례 다수. 평일 야간·주말 전화 상담(간호사 또는 PA)으로도 대부분 해소 가능. 병원 차별화 포인트로 즉시 활용 가능하며 요양병원 특성상 입원 환자 대상으로는 24시간 간호사 순회 체크인 강화가 필요함.",
      },
    ],
  },
  {
    part: 'PART 2',
    partLabel: '영양팀·임상영양사',
    partColor: 'teal' as const,
    items: [
      {
        type: '핵심 과제',
        title: '치료 단계별 암환자 맞춤 영양 프로토콜 표준화',
        body: '항암 중 식욕부진, 복수 천자 후 알부민 보충, 이식 후 지방간 예방 식단, 황달 수치 조절 식단 등 치료 단계·합병증 유형별로 세분화된 식단 가이드가 필요함. 병원 전문가 답변 자료집(리플릿·QR) 형태로 선제 제공하면 신뢰도 제고 효과가 큼.',
      },
      {
        type: '서비스 강화',
        title: '민간요법 안전성 상담 창구 운영',
        body: '상황버섯·영지버섯·꿀마늘·비타민C·글루타치온 등 환자들이 섭취를 고민하는 보조제에 대해, 임상영양사가 명확히 설명해주는 면담 프로그램은 환자 신뢰와 순응도를 높이는 핵심 서비스. 상담 1회 당 20분 내외로도 충분한 효과를 기대할 수 있음.',
      },
    ],
  },
  {
    part: 'PART 3',
    partLabel: '재활의학팀',
    partColor: 'blue' as const,
    items: [
      {
        type: '핵심 과제',
        title: '수술 단계별 운동 복귀 프로그램 체계화',
        body: "간절제·이식 수술 후 '만보 걷기 무리인가', '등산 언제부터 가능한가' 등 질문이 반복적. 수술 후 1주·2주·1개월·3개월·6개월·1년 단위 단계별 허용 운동 강도를 시각화한 재활 로드맵 카드를 제작, 퇴원 시 배포하고 외래 방문 시 점검하는 체계를 갖출 것.",
      },
      {
        type: '서비스 강화',
        title: '연하(삼킴) 재활 전문 프로그램 도입',
        body: '간이식 후 연하장애 재활을 위해 지역 병원을 탐색하는 사례가 직접 확인됨. 전문 언어치료사 1인 확보만으로도 지역 내 수술 후 재활 거점 병원으로 포지셔닝이 가능함.',
      },
    ],
  },
  {
    part: 'PART 4',
    partLabel: '한방팀·통합의학',
    partColor: 'amber' as const,
    items: [
      {
        type: '핵심 과제',
        title: '항암 병행 한방 치료의 안전성 근거 자료 제작',
        body: '항암 중 침 맞아도 되는지, 버섯 달인 물 섭취해도 되는지 등 환자들이 한방 보완치료 안전성에 대해 강한 욕구를 가지고 있으나 의사·한의사 간 정보 불일치로 혼선을 겪음. 병원 내 한방 치료 적용 기준을 내·외과와 협의하여 표준화하고 환자용 자료로 제공할 것.',
      },
      {
        type: '서비스 강화',
        title: '간 기능 개선 한방 프로그램 패키지화',
        body: '간섬유화 초기·간경화 초기 환자군을 위한 한방 디톡스 처방 + 침구 + 생활 습관 코칭을 3~4주 단기 패키지로 구성하면, 입원 수요 창출과 함께 블로그 마케팅 콘텐츠로 활용 가능.',
      },
    ],
  },
  {
    part: 'PART 5',
    partLabel: '심리상담·사회복지팀',
    partColor: 'purple' as const,
    items: [
      {
        type: '핵심 과제',
        title: '보호자 대상 심리 지원 프로그램 신설',
        body: '전체 게시물의 68%가 보호자 대리 질문이며, 상당수가 극심한 정서적 소진 상태. 환자 보호자 대상 주 1회 소그룹 정서 지지 프로그램(심리사 또는 사회복지사 진행)은 입원 환자 가족의 병원 만족도를 높이고 장기 입원을 유도하는 핵심 장치.',
      },
      {
        type: '서비스 강화',
        title: '호스피스 전환 결정 동행 상담 서비스',
        body: '항암 중단·호스피스 전환 시점에서 환자·가족이 극도로 혼란스러운 상황. 사회복지사가 전환 결정 과정 전담 상담자 역할을 담당하면, 호스피스 연계와 함께 병원의 인본주의적 이미지를 구축하는 데 기여.',
      },
    ],
  },
  {
    part: 'PART 6',
    partLabel: '원무·행정·의료사회복지',
    partColor: 'green' as const,
    items: [
      {
        type: '핵심 과제',
        title: '보험·산정특례·복지제도 원스톱 안내 창구 운영',
        body: '색전술의 보험 수술비 인정 여부, 산정특례 연장 조건, 공여자 검사비 실비 청구, 재난적 의료비 지원 등 보험·복지 관련 질문이 전체의 약 15%를 차지. 원무팀 내 암환자 복지 코디네이터 1인이 입원 초기 상담을 담당하면 환자 불안 감소와 병원 충성도 향상에 직결됨.',
      },
    ],
  },
];

export const priorityMatrix = [
  { part: '영양팀', service: '민간요법 안전성 상담 창구', demand: '매우 높음', difficulty: '낮음', priority: '즉시 실행', priorityColor: '#A32D2D' },
  { part: '원무팀', service: '보험·복지 원스톱 코디네이터', demand: '높음', difficulty: '낮음', priority: '즉시 실행', priorityColor: '#A32D2D' },
  { part: '완화의학팀', service: '퇴원 후 24시간 통증 상담 라인', demand: '매우 높음', difficulty: '중간', priority: '1~2개월 내', priorityColor: '#854F0B' },
  { part: '재활팀', service: '수술 후 단계별 운동 로드맵', demand: '높음', difficulty: '낮음', priority: '1~2개월 내', priorityColor: '#854F0B' },
  { part: '심리상담팀', service: '보호자 소그룹 정서 지지 프로그램', demand: '높음', difficulty: '중간', priority: '1~2개월 내', priorityColor: '#854F0B' },
  { part: '한방팀', service: '간 기능 개선 한방 패키지', demand: '중간', difficulty: '낮음', priority: '2~3개월 내', priorityColor: '#0F6E56' },
  { part: '재활팀', service: '연하장애 재활 전문 언어치료사', demand: '중간', difficulty: '높음', priority: '중장기 검토', priorityColor: '#0F6E56' },
];

export const blogTopics = [
  '간이식 후 요양병원 선택 기준 5가지',
  '간절제 수술 후 운동은 언제부터 가능한가',
  '항암 중 먹어도 되는 보조제·먹으면 안 되는 보조제',
  '색전술 후 발열, 응급실 가야 하나 지켜봐야 하나',
  '간암 4기 식단 배달 서비스 실제 사용 후기',
  '간경화 초기 진단 후 요양병원 입원이 필요한 경우',
];
