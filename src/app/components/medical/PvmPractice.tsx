import { PvmAtlas } from './EditorialVisuals';
import { useId, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Layers3, MessagesSquare, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router';
import { Eyebrow } from './MedicalUI';

const scenarios = [
  { label: '입원 전 상담', question: '입원 전에 무엇을 준비해야 할까요?', context: ['치료 일정과 생활의 연결', '정보가 부족한 준비 과정', '환자와 보호자의 서로 다른 질문'], action: '첫 상담의 안내 체계', outputs: ['입원 전 확인 체크리스트', '환자·보호자 안내 콘텐츠', '상담 담당자 공통 설명 기준'] },
  { label: '병원 생활', question: '병원에서의 하루는 어떻게 달라지나요?', context: ['식사와 활동에 대한 궁금증', '생활 안내의 일관성', '부서 사이에서 반복되는 질문'], action: '일상의 서비스 접점', outputs: ['병원 생활 안내서', '부서별 응대·인계 체크리스트', '직원교육용 사례와 FAQ'] },
  { label: '퇴원·이동', question: '퇴원 후에는 누구에게 무엇을 물어보나요?', context: ['퇴원 전후 정보의 공백', '다음 기관과의 연결', '지속적인 안내에 대한 필요'], action: '다음 단계로 이어지는 안내', outputs: ['퇴원·이동 안내 체크리스트', '후속 연락 업무 흐름', '기관 안내와 문의 경로 정리'] }
];
export function PvmPractice() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = scenarios[active];
  return <section className="med-section med-pvm-lab">
    <div className="med-wrap">
      <div className="med-section-heading"><div><Eyebrow>PVM / FROM VOICE TO PRACTICE</Eyebrow><h2>질문을 읽는 깊이가,<br />서비스의 차이를 만듭니다.</h2></div></div>
      <div className="ed-lab-overview"><PvmAtlas /><p><span>VOICE → CONTEXT → ACTION</span>질문 하나를 읽고,<br/><strong>서비스의 다음 장면을 설계합니다.</strong><small>아래에서 환자 여정별 적용 예시를 선택해 보세요.</small></p></div><div className="med-lab-toolbar"><span className="med-lab-caption">서비스 설계 예시</span><div role="tablist" aria-label="PVM 서비스 설계 사례">{scenarios.map((s,i)=><button key={s.label} ref={el=>{tabs.current[i]=el;}} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={active===i} aria-controls={`${id}-panel`} tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{
        let next=i;
        if(e.key==='ArrowRight')next=(i+1)%scenarios.length;
        else if(e.key==='ArrowLeft')next=(i+scenarios.length-1)%scenarios.length;
        else if(e.key==='Home')next=0;
        else if(e.key==='End')next=scenarios.length-1;
        else return;
        e.preventDefault();setActive(next);tabs.current[next]?.focus();
      }}><span>0{i+1}</span>{s.label}</button>)}</div></div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} tabIndex={0} className="med-lab-panel">
        <div key={active} className="med-lab-flow">
          <article className="med-lab-voice"><div className="med-lab-step"><span>01 / VOICE</span><MessagesSquare size={20}/></div><span className="med-lab-label">질문 예시</span><h3>{selected.question}</h3><p>환자·보호자가 궁금해하는 상황을<br />서비스 검토의 출발점으로 삼습니다.</p><span className="med-lab-node" aria-hidden="true"/></article>
          <article className="med-lab-context"><div className="med-lab-step"><span>02 / CONTEXT</span><Layers3 size={20}/></div><span className="med-lab-label">함께 살펴볼 맥락</span><ul>{selected.context.map(t=><li key={t}>{t}</li>)}</ul><p>반복되는 주제와 정보의 빈틈을 정리하고<br />병원의 실제 업무와 대조합니다.</p><ArrowDown className="med-lab-mobile-arrow" aria-hidden="true" size={18}/></article>
          <article className="med-lab-action"><div className="med-lab-step"><span>03 / ACTION</span><ClipboardCheck size={20}/></div><span className="med-lab-label">현장 적용 제안</span><h3>{selected.action}</h3><ul>{selected.outputs.map(t=><li key={t}>{t}</li>)}</ul></article>
        </div>
      </div>
      <div className="med-lab-foot"><p>이해를 돕기 위한 설계 예시입니다. 실제 과업과 산출물은 병원의 상황에 맞춰 검토합니다.</p><Link to="/insights#medical-reports">PVM 보고서 살펴보기<ArrowUpRight size={17}/></Link></div>
    </div>
  </section>;
}
