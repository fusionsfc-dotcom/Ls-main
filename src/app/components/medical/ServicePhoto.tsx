const descriptions: Record<string,string> = {
  opening: '개원 계획을 구상하는 공간 스케치와 펜',
  'service-design': '서비스 흐름을 정리한 스케치북과 메모',
  consultation: '상담을 준비하는 질문 노트와 필기구',
  training: '병원 직원교육에서 화이트보드로 강의하는 현장',
  communication: '콘텐츠 제작을 위한 카메라와 사진 인쇄물',
  digital: '병원 실무자가 연결된 업무 흐름을 보며 AI 전환을 기획하는 현장'
};
export function ServicePhoto({kind}: {kind:string}) {
  const description=descriptions[kind];
  if(!description)return null;
  const dimensions=kind==='training'?{width:1200,height:400}:kind==='digital'?{width:1200,height:403}:{width:1672,height:941};
  return <figure className="med-service-photo"><img src={`/images/service-symbolic-v2/${kind}-768.webp`} srcSet={`/images/service-symbolic-v2/${kind}-480.webp 480w, /images/service-symbolic-v2/${kind}-768.webp 768w, /images/service-symbolic-v2/${kind}-1200.webp 1200w`} sizes="(max-width:767px) calc(100vw - 40px), (max-width:1023px) 44vw, 380px" width={dimensions.width} height={dimensions.height} alt={description} loading="lazy" decoding="async" fetchPriority="low"/></figure>;
}
