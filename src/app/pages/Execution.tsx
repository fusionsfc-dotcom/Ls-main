import { FileText, Video, MessageCircle, BookOpen, TrendingUp, Users, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router';

export function Execution() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-sm tracking-widest opacity-60" style={{ color: 'var(--navy-900)' }}>
            EXECUTION
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            단순한 홍보 대행업체가 아닙니다.<br />
            전략, 리서치, 실행, 운영, 홍보를 하나의 시스템으로 제공합니다
          </h1>
          <p className="text-2xl leading-relaxed opacity-70 max-w-3xl" style={{ color: 'var(--navy-900)' }}>
            데이터 기반 전략을 현실로 만들어냅니다
          </p>
        </div>
      </section>

      {/* 실행 영역 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-16 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            실행 영역
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                01
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                리서치 기반 블로그 콘텐츠
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  환자가 실제로 검색하는 질문을 분석해<br />
                  월 10~20건의 전략형 블로그 콘텐츠를 제작합니다.
                </p>
                <p>
                  단순 노출이 아닌<br />
                  신뢰를 쌓는 구조로 설계합니다.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                02
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                환자 질문형 유튜브 쇼츠
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  암 환자가 가장 궁금해하는 질문을 짧고 명확하게 전달합니다.
                </p>
                <p>
                  월 10~20건 제작<br />
                  의료진의 전문성과 신뢰를 자연스럽게 전달합니다.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                03
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                월간 암 환자 트렌드 리포트
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  질환별, 치료형태별, 증상별<br />
                  온라인 니즈 변화 리포트를 제공합니다.
                </p>
                <p>
                  병원 내부 전략 회의에 활용 가능한 형태로 제공합니다.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                04
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                임직원 Action Plan 제공
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  주 3회<br />
                  실제 실행 가능한 운영 개선 Action Plan을 제시합니다.
                </p>
                <p>
                  조직이 같은 방향으로 움직이도록 설계합니다.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                05
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                의료서비스 강화 KPI 모델 설계
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  주 1회<br />
                  운영 데이터를 기반으로 KPI 모델을 설계하고 점검합니다.
                </p>
                <p>
                  감이 아닌 구조로 관리합니다.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-4xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                06
              </div>
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--navy-900)' }}>
                병의원 개원 컨설팅
              </h3>
              <div className="space-y-4 text-base leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                <p>
                  입지분석부터 설계, 인허가, 공간디자인,<br />
                  인테리어 공사, 오픈 준비 구매 및 임직원 교육
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS 섹션 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-20 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            실행 프로세스
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-5xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                01
              </div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                Audit & Planning
              </h3>
              <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                <li>• 현재 상태 진단</li>
                <li>• 실행 우선순위 설정</li>
                <li>• 타임라인 수립</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-5xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                02
              </div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                Design & Build
              </h3>
              <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                <li>• 콘텐츠 제작</li>
                <li>• 시스템 구축</li>
                <li>• 가이드라인 개발</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-5xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                03
              </div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                Launch & Optimize
              </h3>
              <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                <li>• 실행 시작</li>
                <li>• 초기 반응 모니터링</li>
                <li>• 빠른 조정</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-5xl font-bold opacity-10" style={{ color: 'var(--navy-900)' }}>
                04
              </div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                Monitor & Improve
              </h3>
              <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                <li>• 성과 측정</li>
                <li>• 지속적 개선</li>
                <li>• 전략 업데이트</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-20 tracking-tight text-white">
            What You Get
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-1 bg-white opacity-30"></div>
              <h3 className="text-2xl text-white">실행 가능한 자산</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                콘텐츠, 가이드라인, 템플릿 등 즉시 활용 가능한 실물 자산
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-1 bg-white opacity-30"></div>
              <h3 className="text-2xl text-white">운영 시스템</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                지속 가능한 운영을 위한 프로세스와 도구
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-1 bg-white opacity-30"></div>
              <h3 className="text-2xl text-white">성과 측정 체계</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                명확한 KPI와 데이터 기반 의사결정 구조
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-16 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            Execution Case
          </h2>
          
          <div className="p-12 rounded-2xl" style={{ backgroundColor: 'var(--navy-50)' }}>
            <h3 className="text-2xl mb-4" style={{ color: 'var(--navy-900)' }}>
              폐암 전문 병원 콘텐츠 전략
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg mb-3 font-semibold" style={{ color: 'var(--navy-900)' }}>배경</h4>
                <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                  <li>• 기존 블로그 운영했으나 환자 전환 미흡</li>
                  <li>• 의학 정보 중심, 환자 니즈와 불일치</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg mb-3 font-semibold" style={{ color: 'var(--navy-900)' }}>전략 & 실행</h4>
                <ul className="space-y-2 text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                  <li>• 환자 니즈 분석 기반 콘텐츠 주제 재설계</li>
                  <li>• "항암 3회차 불안" 등 실제 검색 키워드 타겟팅</li>
                  <li>• 단계별 환자 여정에 맞춘 콘텐츠 맵 구축</li>
                  <li>• 주 2회 발행 체계 구축</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg mb-3 font-semibold" style={{ color: 'var(--navy-900)' }}>성과</h4>
                <div className="grid md:grid-cols-3 gap-6 mt-4">
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                      287%
                    </div>
                    <div className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                      3개월 내 블로그 유입 증가
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                      4.2%
                    </div>
                    <div className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                      상담 신청 전환율 달성
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--navy-900)' }}>
                      +32점
                    </div>
                    <div className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                      환자 만족도 NPS 상승
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl leading-tight mb-8 tracking-tight text-white max-w-3xl mx-auto">
            병원의 현재 상태를<br />
            정밀하게 진단 받아보세요!
          </h2>
          
          <Link
            to="/consultation"
            className="inline-flex items-center space-x-2 px-10 py-5 text-lg bg-white transition-all hover:opacity-90"
            style={{ color: 'var(--navy-900)' }}
          >
            <span>실행 컨설팅 문의하기</span>
          </Link>
        </div>
      </section>
    </div>
  );
}