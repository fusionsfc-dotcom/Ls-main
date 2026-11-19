import { caseScreens } from './CaseScreenshot';
import { CaseVisual } from './EditorialVisuals';
import { ArrowUpRight } from 'lucide-react';
import { type AxCase } from '../../data/axCases';
import { TextLink, Workflow } from './MedicalUI';
export function AxCaseSection({
  item
}: {
  item: AxCase;
}) {
  return <article className="med-ax-case" id={item.id}><div className={`med-ax-case-top ${Boolean(caseScreens[item.id])?"":"ed-case-no-screen"}`}><div><span className="med-caption">{item.eyebrow}</span><h2>{item.name}</h2><span className="med-pill" style={{
          marginBottom: 20
        }}>{item.status}</span><p>{item.summary}</p><div className="med-mini-tags">{item.scope.map(s => <span key={s}>{s}</span>)}</div><p className="med-note">{item.note}</p><div className="med-actions"><TextLink to="/contact?type=ax">관련 과제 상담</TextLink>{item.publicUrl && <a className="med-text-link" href={item.publicUrl} target="_blank" rel="noopener noreferrer">{item.id === 'happy-life' ? '앱 열기' : item.id === 'happylifecare-platform' ? '정보 플랫폼 보기' : '공개 사이트 보기'}<ArrowUpRight size={17} aria-hidden="true" /></a>}{item.tourUrl && <a className="med-text-link" href={item.tourUrl} target="_blank" rel="noopener noreferrer">서비스 둘러보기<ArrowUpRight size={17} aria-hidden="true" /></a>}</div></div><div className="ed-case-media"><CaseVisual id={item.id} name={item.name}/><details className="ed-case-details"><summary>업무 흐름 자세히 보기<ArrowUpRight size={16} aria-hidden="true"/></summary><Workflow steps={item.workflow} /></details></div></div></article>;
}
