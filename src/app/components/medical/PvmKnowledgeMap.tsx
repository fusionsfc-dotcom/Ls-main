import { Link } from 'react-router';
import evidence from '../../data/pvmEvidence.json';

const topics = [
  { title: '암종과 치료', detail: '유방암 · 위암 · 폐암', x: 24, y: 16, color: 'blue' },
  { title: '환자의 목소리', detail: '질문 · 경험 · 걱정', x: 73, y: 28, color: 'mint' },
  { title: '증상과 회복', detail: '항암 · 부작용 · 회복', x: 22, y: 49, color: 'violet' },
  { title: '영양과 재활', detail: '식사 · 운동 · 일상', x: 77, y: 63, color: 'warm' },
  { title: '병원과 돌봄', detail: '병원 선택 · 상담 · 서비스', x: 30, y: 83, color: 'mint' },
  { title: '인사이트', detail: '분석 · 리포트 · 현장 적용', x: 70, y: 92, color: 'coral' },
];

/** Topic-level editorial map. It does not label individual private source records. */
export function PvmKnowledgeMap() {
  return <aside className="pvm-knowledge" aria-label="PVM 서버의 자료와 주제 연결">
    <p className="pvm-knowledge-kicker"><span />PVM SERVER · CONNECTED KNOWLEDGE</p>
    <h2>암을 이해하는 정보,<br /><em>환자를 이해하는 연결.</em></h2>
    <p className="pvm-hope-line">경험을 지식으로, 연결을 더 나은 내일로.</p>
    <div className="pvm-constellation" aria-label="암 정보와 환자 경험이 연결되는 여섯 가지 주제">
      {topics.map(t=><div key={t.title} className={`pvm-constellation-topic pvm-map-${t.color}`} style={{left:`${t.x}%`,top:`${t.y}%`}}><i className="pvm-constellation-anchor" aria-hidden="true"/><strong>{t.title}</strong><span>{t.detail}</span></div>)}
    </div>
    <div className="pvm-evidence" aria-label="PVM 자료 규모">
      <div><strong>{evidence.documents.toLocaleString('en-US')}</strong><span>축적된 자료 문서</span></div>
      <div><strong>{evidence.resolvedConnections.toLocaleString('en-US')}</strong><span>문서 사이의 연결</span></div>
      <div><strong>{evidence.patientVoiceDocuments.toLocaleString('en-US')}</strong><span>환자 목소리 자료</span></div>
    </div>
    <div className="pvm-evidence-footer"><span>2026.10.26 자료 집계 · 주제 연결은 개념적 표현</span><Link to="/insights">인사이트 살펴보기 ↗</Link></div>
  </aside>;
}
