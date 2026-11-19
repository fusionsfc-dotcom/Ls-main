import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { CaseScreenshot, caseScreens } from '../components/medical/CaseScreenshot';
import { medicalAxCases, industryAxCases } from '../data/axCases';

import { Navigate, useLocation } from 'react-router';
import { AxNavigation, ContactBand, Eyebrow, MedicalSEO, PageHero, SectionHeading, TextLink } from '../components/medical/MedicalUI';
export function Ax() {
  const {
    hash,
    search
  } = useLocation();
  if (hash === '#cases') return <Navigate replace to={'/ax/cases' + search} />;
  return <div className="med-site med-ax-hub"><MedicalSEO title="의료와 산업의 AX 개발 사례" description="환자 앱과 병원 프로그램, 웹사이트, 공간 관리·건설·보험설계·제조업 플랫폼의 개발 경험을 소개합니다." path="/ax" /><PageHero eyebrow="AX CASES" title="의료와 기업의 AX 사례" text="환자와 병원을 연결하는 서비스부터 산업별 업무 플랫폼까지, 실제 개발 사례를 살펴보세요." /><AxNavigation />
    <div className="med-wrap ax-hub-jumps"><a href="#medical-ax-cases">의료 AX · {medicalAxCases.length}개 사례</a><a href="#industry-ax-cases">기업 AX · {industryAxCases.length}개 사례</a></div>
    <section className="ax-hub-cases med-wrap" aria-label="의료와 기업 AX 사례">
      {[{id:'medical-ax-cases',title:'의료 AX',label:'MEDICAL',items:medicalAxCases,path:'/ax/medical'}, {id:'industry-ax-cases',title:'기업 AX',label:'BUSINESS',items:industryAxCases,path:'/ax/cases'}].map(group => <div key={group.id} id={group.id} className="ax-hub-group"><div className="ax-hub-group-heading"><Eyebrow>{group.label}</Eyebrow><h2>{group.title}</h2></div><div className="ax-hub-list">{group.items.map(item => <article key={item.id} className={`ax-hub-case ${caseScreens[item.id] ? 'ax-hub-case-with-screen' : ''}`}>
        <div className="ax-hub-case-heading"><span className="ax-hub-status">{item.status}</span><h3>{item.name}</h3></div>
        {caseScreens[item.id] && <CaseScreenshot id={item.id} name={item.name}/>}
        <div className="ax-hub-case-info"><p>{item.scope.slice(0,2).join(' · ')}</p><Link to={`${group.path}#${item.id}`} className="med-text-link">사례 자세히 보기<ArrowUpRight size={18} aria-hidden="true"/></Link></div>
      </article>) }</div><TextLink to={group.path}>{group.title} 전체 보기</TextLink></div>)}
    </section>
    <section id="process" className="med-section ax-method"><div className="med-wrap"><SectionHeading eyebrow="DESIGN · BUILD · IMPROVE" title="업무를 이해하는 것부터 시작합니다." text="AI 적용, 업무 자동화, 웹·앱 구축의 범위는 해결할 과제에서 정합니다. 사용자 화면과 데이터, 담당자의 검토 지점을 함께 설계합니다." /><ol className="ax-method-steps">{[['업무 이해', '누가 어떤 일을 하는지, 어디에서 정보가 끊기는지 확인합니다.'], ['화면과 데이터 설계', '사용자의 역할과 필요한 정보를 구체적인 흐름으로 만듭니다.'], ['구현과 연동', '기능을 구현하고 서비스와 담당자의 업무를 연결합니다.'], ['검증과 개선', '실제 사용 흐름을 검토하고 적용 범위를 다듬습니다.']].map(([t, p], i) => <li key={t}><span className="ax-method-number" aria-hidden="true">0{i + 1}</span><h3>{t}</h3><p>{p}</p></li>)}</ol></div></section><ContactBand ax /></div>;
}
