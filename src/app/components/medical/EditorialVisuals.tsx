import { CaseScreenshot } from './CaseScreenshot';
import { Building2, Check, FileText, MessagesSquare, Workflow as WorkflowIcon } from 'lucide-react';
import { hospitalProjects } from '../../data/hospitalProjects';

export function HospitalPhoto({id='seoul-healing',caption}: {id?:string;caption?:string}) {
  const project=hospitalProjects.find(p=>p.id===id)!;
  if(!project.image)return null;
  return <figure className="ed-hospital-photo"><img src={project.image.src} srcSet={project.image.srcSet} sizes="(max-width: 767px) calc(100vw - 40px), 560px" width="720" height="480" alt={project.image.alt} loading="lazy" decoding="async" fetchPriority="low"/><figcaption><span>{project.name}</span>{caption||'기존 병원 프로젝트 소개 사진'}</figcaption></figure>;
}

export function PvmAtlas() {
  return <figure className="ed-pvm-atlas" aria-label="PVM 자료와 현장 활용을 연결한 개념도"><img src="/images/optimized-v1/pvm-network.svg" width="1200" height="700" alt="PVM 실제 문서 연결망의 정적 시각화" loading="lazy" decoding="async" fetchPriority="low"/><div className="ed-atlas-title"><span>PVM KNOWLEDGE NETWORK</span><strong>한 사람의 질문에서,<br/>연결된 맥락으로.</strong></div><div className="ed-atlas-labels"><span>병원 선택</span><span>치료와 생활</span><span>퇴원과 이동</span></div><figcaption>실제 문서 연결 구조 · 주제 표시는 활용 범위를 설명한 개념도</figcaption></figure>;
}

export function CaseVisual({id,name}: {id:string;name:string}) {
  return <CaseScreenshot id={id} name={name}/>;
}

export function PrincipleIcon({index}: {index:number}) {const Icon=[MessagesSquare,Building2,WorkflowIcon][index%3];return <div className="ed-principle-icon" aria-hidden="true"><Icon size={36} strokeWidth={1.3}/><Check size={16}/></div>;}

export function ReportCover({industry=false}: {industry?:boolean}) {
 return <div className={`ed-report-cover ${industry?'ed-report-cover-industry':''}`} aria-hidden="true"><span>{industry?'INDUSTRY / RESEARCH':'PVM / PATIENT VOICE'}</span>{industry?<svg viewBox="0 0 280 100"><path d="M25 80V35L70 12 115 35V80M70 12V60L115 80M70 60L25 80M145 80V45L190 22 235 45V80M190 22V65L235 80M190 65L145 80" fill="none" stroke="currentColor" strokeWidth="1"/><path d="M-10 95L130 20 280 95" fill="none" stroke="currentColor" opacity=".35"/></svg>:<img src="/images/optimized-v1/pvm-network.svg" width="1200" height="700" alt="" loading="lazy" decoding="async" fetchPriority="low"/>}<FileText size={32} strokeWidth={1}/></div>;
}
