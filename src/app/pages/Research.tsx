import { Lock, Download, Database, TrendingUp, Search, BarChart3 } from 'lucide-react';
export function Research() {
  const dataCategories = [
    {
      number: '150,000+',
      label: '월평균 분석 데이터 포인트'
    },
    {
      number: '20+',
      label: '암종별 세분화 분석'
    },
    {
      number: '주간',
      label: '리서치 업데이트 주기'
    },
    {
      number: '5년+',
      label: '누적 데이터 기간'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-sm tracking-widest opacity-60" style={{ color: 'var(--navy-900)' }}>
            RESEARCH CENTER
          </div>
          <h1 
            className="text-5xl lg:text-7xl leading-tight mb-8 tracking-tight max-w-4xl"
            style={{ color: 'var(--navy-900)' }}
          >
            의료 서비스의 완성은<br />
            환자의 니즈 분석에서 시작
          </h1>
          <p className="text-2xl leading-relaxed opacity-70 max-w-3xl" style={{ color: 'var(--navy-900)' }}>
            온라인 환자 니즈를 체계적으로 수집·분석하여<br />
            전략의 기반 데이터를 제공합니다.
          </p>
        </div>
      </section>

      {/* Data Scale */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {dataCategories.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl mb-4" style={{ color: 'var(--navy-900)' }}>
                  {item.number}
                </div>
                <p className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1 - WHAT WE ANALYZE */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-16 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            분석 영역
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                암종별<br />검색 패턴
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                폐암, 유방암, 대장암 등 각 암 종류별 환자의 정보 탐색 행동 분석
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                치료 단계별<br />관심사 변화
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                진단, 수술, 항암, 회복 단계별 환자 질문 및 우려사항 추적
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                증상 및<br />부작용 패턴
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                환자들이 가장 자주 호소하는 증상과 부작용의 시간대별 분포
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                병원 선택<br />의사결정 요인
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                환자가 병원을 선택할 때 중요하게 고려하는 요소의 우선순위
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-20 tracking-tight text-white">
            분석 방법론
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <Database className="w-10 h-10 text-white opacity-60" />
              <h3 className="text-xl text-white">데이터 수집</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                온라인 커뮤니티, 검색 데이터, 환자 포럼 등 다양한 채널에서 체계적 수집
              </p>
            </div>
            
            <div className="space-y-4">
              <Search className="w-10 h-10 text-white opacity-60" />
              <h3 className="text-xl text-white">AI 자연어 분석</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                자연어 처리 기술로 환자 질문과 감정, 의도를 자동 분류 및 분석
              </p>
            </div>
            
            <div className="space-y-4">
              <TrendingUp className="w-10 h-10 text-white opacity-60" />
              <h3 className="text-xl text-white">트렌드 추적</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                시간대별, 계절별 환자 니즈 변화 패턴을 모니터링하고 예측
              </p>
            </div>
            
            <div className="space-y-4">
              <BarChart3 className="w-10 h-10 text-white opacity-60" />
              <h3 className="text-xl text-white">인사이트 도출</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                데이터를 전략적 실행 가능한 인사이트로 전환하여 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Insights */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-8 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            분석 사례
          </h2>
          <p className="text-lg opacity-60 mb-16 max-w-3xl" style={{ color: 'var(--navy-900)' }}>
            실제 리서치 데이터를 통해 발견한 환자 니즈 패턴의 예시입니다.
          </p>
          
          <div className="space-y-8">
            <div className="p-8 border-l-4" style={{ borderColor: 'var(--navy-900)', backgroundColor: 'var(--navy-50)' }}>
              <h3 className="text-xl mb-3" style={{ color: 'var(--navy-900)' }}>
                항암 3회차 시점의 불안 급증
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                항암치료 3회차 전후로 "계속해야 하나", "효과가 있는 건가" 등의 질문이 284% 증가. 
                이 시점에 환자 안심 프로그램과 치료 효과 모니터링 커뮤니케이션이 필요함을 발견.
              </p>
            </div>
            
            <div className="p-8 border-l-4" style={{ borderColor: 'var(--navy-900)', backgroundColor: 'var(--navy-50)' }}>
              <h3 className="text-xl mb-3" style={{ color: 'var(--navy-900)' }}>
                병원 선택 시 '재활 프로그램'의 중요도 상승
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                2023년 대비 2026년 병원 선택 기준에서 '재활 및 회복 프로그램' 언급이 156% 증가. 
                단순 치료를 넘어 전체 회복 여정을 지원하는 병원에 대한 니즈 확인.
              </p>
            </div>
            
            <div className="p-8 border-l-4" style={{ borderColor: 'var(--navy-900)', backgroundColor: 'var(--navy-50)' }}>
              <h3 className="text-xl mb-3" style={{ color: 'var(--navy-900)' }}>
                보호자 대상 정보 탐색의 분리
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                환자 본인과 보호자가 찾는 정보의 내용과 타이밍이 다름을 발견. 
                보호자는 경제적 부담과 장기 케어 방법에 더 집중. 타겟별 맞춤 콘텐츠 전략 필요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - CLIENT ACCESS */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Lock className="w-16 h-16 text-white opacity-30" />
          </div>
          
          <h2 className="text-3xl lg:text-5xl leading-tight mb-8 tracking-tight text-white max-w-3xl mx-auto">
            정기 리서치 리포트는<br />
            고객사 전용으로 제공됩니다.
          </h2>
          
          <p className="text-lg text-white opacity-60 mb-12 max-w-2xl mx-auto">
            월간 트렌드 리포트, 암종별 세분화 분석, 맞춤형 데이터 대시보드 등<br />
            귀원의 전략 수립에 필요한 모든 리서치 자료를 제공합니다.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <button 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white transition-all hover:opacity-90"
              style={{ color: 'var(--navy-900)' }}
            >
              <Lock className="w-4 h-4" />
              <span>고객사 로그인</span>
            </button>
            <button 
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white text-white transition-all hover:bg-white hover:bg-opacity-10"
            >
              <Download className="w-4 h-4" />
              <span>샘플 리포트 다운로드</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}