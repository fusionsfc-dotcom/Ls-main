const descriptions: Record<string,string> = {
  opening: '병원 개원 계획을 함께 검토하는 장면',
  'service-design': '환자의 병원 생활을 안내하는 장면',
  consultation: '환자와 보호자의 이야기를 듣는 상담 장면',
  training: '현장 사례를 함께 논의하는 병원 직원교육 장면',
  communication: '병원 사진과 온라인 콘텐츠를 검토하는 장면',
  digital: '일정과 기록을 확인하는 병원 운영 업무 장면'
};
export function ServicePhoto({kind}: {kind:string}) {
  const description=descriptions[kind];
  if(!description)return null;
  return <figure className="med-service-photo"><img src={`/images/service-photos-v1/${kind}-768.webp`} srcSet={`/images/service-photos-v1/${kind}-480.webp 480w, /images/service-photos-v1/${kind}-768.webp 768w, /images/service-photos-v1/${kind}-1200.webp 1200w`} sizes="(max-width:767px) calc(100vw - 40px), (max-width:1023px) 44vw, 380px" width="1672" height="941" alt={`${description} · AI 연출 이미지`} loading="lazy" decoding="async" fetchPriority="low"/><figcaption>AI 연출 이미지</figcaption></figure>;
}
