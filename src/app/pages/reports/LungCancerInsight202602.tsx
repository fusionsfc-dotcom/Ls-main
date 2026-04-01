import { Link } from 'react-router';
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { OurClients } from '../../components/OurClients';
import { SEO } from '../../components/SEO';

export function LungCancerInsight202602() {
  const questionTypes = [
    {
      title: '검사 결과 해석 불안',
      voice: '"결절이 커졌다고 합니다." "재발인가요?"',
      strategies: [
        '영상 판독 용어 해설 자료 제작',
        '검사 결과 설명 표준 스크립트 도입',
        '정상 범위 변동 가이드 제공'
      ]
    },
    {
      title: '표적·면역 치료 선택 고민',
      voice: '"어떤 치료가 더 효과적인가요?"',
      strategies: [
        '치료 옵션 비교표 제공',
        '예상 부작용 단계별 설명',
        '실제 치료 경과 예시 제공'
      ]
    },
    {
      title: '부작용 장기화 공포',
      voice: '"기침이 계속됩니다."',
      strategies: [
        '호흡 증상 정상 범위 가이드',
        '응급 기준 명확화',
        '폐 기능 재활 프로그램 운영'
      ]
    },
    {
      title: '요양·전원 탐색',
      voice: '"요양병원 가야 하나요?"',
      strategies: [
        '재활 프로그램 구조 설명',
        '전원 가이드 제공'
      ]
    },
    {
      title: '재발 공포',
      voice: '"수치가 조금 올랐습니다."',
      strategies: [
        '검사 전 불안 상담',
        '정상 수치 변동 교육',
        '정기 모니터링 체계 설명'
      ]
    }
  ];

  const departments = [
    {
      name: '상담팀',
      tasks: [
        '검사 결과 요약지 제공',
        '수치 정상 범위 설명',
        '보호자 이해도 확인'
      ]
    },
    {
      name: '간호팀',
      tasks: [
        '호흡 증상 단계별 가이드',
        '응급 기준 안내',
        '증상 기록 시스템'
      ]
    },
    {
      name: '재활·영양팀',
      tasks: [
        '폐 기능 재활 프로그램',
        '체력 유지 프로그램',
        '영양 관리'
      ]
    },
    {
      name: '사후관리팀',
      tasks: [
        '월간 상태 점검',
        '검사 전 안내',
        '재내원 기준 설명'
      ]
    }
  ];

  const timeline = [
    { stage: '진단', anxiety: 85 },
    { stage: '검사', anxiety: 90 },
    { stage: '치료 선택', anxiety: 75 },
    { stage: '부작용', anxiety: 80 },
    { stage: '추적 검사', anxiety: 85 }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <Link to="/insights" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5" style={{ color: '#0F2B46' }} />
            <span style={{ color: '#0F2B46' }}>Reports</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <div className="inline-block px-4 py-2 rounded-full text-sm mb-6" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            Monthly Cancer Voice Report
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0E1B3D' }}>
            2026년 2월 폐암 환자 니즈 분석 보고서
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ color: '#0F2B46', opacity: 0.8 }}>
            치료 단계별 질문 패턴과<br />
            2차병원의 실행 전략
          </p>

          <div className="flex items-center space-x-4 text-sm" style={{ color: '#0E1B3D', opacity: 0.6 }}>
            <span>February 2026</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6" style={{ color: '#0F2B46' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#0E1B3D' }}>Executive Summary</h2>
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed" style={{ color: '#0E1B3D' }}>
              <p>
                2026년 2월 폐암 관련 환자 보이스 분석 결과,<br />
                질문은 정보 탐색이 아니라 불안 관리 행동으로 나타났습니다.
              </p>
              
              <p>
                특히 검사 결과 해석, 표적·면역 치료 선택,<br />
                호흡 증상 악화, 재발 가능성에 대한 질문이 집중되었습니다.
              </p>
              
              <p className="font-semibold" style={{ color: '#0F2B46' }}>
                폐암 환자는 치료 정보보다<br />
                "지금 위험한지 아닌지"에 대한 확신을 원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 질문 유형 분석 */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            주요 질문 유형 분석
          </h2>
          
          <div className="grid gap-6">
            {questionTypes.map((item, index) => (
              <div key={index} className="p-8 rounded-xl border-2 transition-all hover:shadow-lg" style={{ borderColor: '#EAEAEA', backgroundColor: 'white' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0E1B3D' }}>
                  {index + 1}. {item.title}
                </h3>
                
                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                  <p className="text-lg italic" style={{ color: '#0F2B46' }}>
                    환자보이스: {item.voice}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D', opacity: 0.7 }}>
                    병원 대응 전략:
                  </p>
                  <div className="space-y-2">
                    {item.strategies.map((strategy, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0F2B46' }} />
                        <span style={{ color: '#0E1B3D' }}>{strategy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 폐암 환자 불안 구조 시각화 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            폐암 환자 불안 구조 시각화
          </h2>
          
          <div className="bg-white p-8 lg:p-12 rounded-2xl border" style={{ borderColor: '#EAEAEA' }}>
            {/* 타임라인 그래프 */}
            <div className="mb-8">
              {/* Y축과 그래프 영역 */}
              <div className="relative">
                {/* Y축 라인 */}
                <div 
                  className="absolute left-0 top-0 bottom-12 w-0.5"
                  style={{ backgroundColor: '#0F2B46' }}
                ></div>
                
                {/* 막대 그래프 영역 */}
                <div className="ml-8 border-b-2 pb-4" style={{ borderColor: '#0F2B46' }}>
                  <div className="flex items-end justify-between h-72 gap-4">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                        {/* 불안 지수 숫자 */}
                        <div className="mb-3">
                          <span className="text-xl font-bold" style={{ color: '#0F2B46' }}>
                            {item.anxiety}
                          </span>
                        </div>
                        
                        {/* 막대 */}
                        <div 
                          className="w-full rounded-t-lg transition-all duration-500"
                          style={{ 
                            backgroundColor: '#0F2B46',
                            height: `${(item.anxiety / 100) * 100}%`,
                            maxHeight: '240px'
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* X축 레이블 */}
                <div className="ml-8 mt-4 flex items-center justify-between gap-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex-1 text-center">
                      <p className="text-sm lg:text-base font-semibold" style={{ color: '#0E1B3D' }}>
                        {item.stage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 범례 */}
              <div className="mt-6 text-right">
                <span className="text-sm" style={{ color: '#0E1B3D', opacity: 0.5 }}>
                  불안 지수 (0-100)
                </span>
              </div>
            </div>
            
            <p className="text-base lg:text-lg leading-relaxed" style={{ color: '#0E1B3D' }}>
              폐암 환자의 불안은 검사 전후와 호흡 증상 발생 시 급증합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2차병원 부서별 실행 매뉴얼 */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            2차병원 부서별 실행 매뉴얼
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="p-6 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>
                  {dept.name}
                </h3>
                
                <div className="space-y-3">
                  {dept.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: '#0F2B46' }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 전략 결론 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-3xl lg:text-4xl font-bold leading-tight text-white mb-6">
            폐암 환자의 신뢰는<br />
            설명력과 예측 가능성에서 형성됩니다.
          </p>
          
          <p className="text-xl lg:text-2xl text-white opacity-90">
            불안을 구조적으로 관리하는 병원이<br />
            환자를 유지합니다.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            우리 병원의 폐암 환자 상담 구조를<br />
            점검해보시겠습니까?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="px-8 py-4 text-white font-semibold rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#0F2B46' }}
            >
              의료서비스 구조 진단 요청
            </Link>
            
            <Link 
              to="/contact"
              className="px-8 py-4 font-semibold rounded-lg border-2 transition-all hover:bg-opacity-5"
              style={{ borderColor: '#0F2B46', color: '#0F2B46', backgroundColor: 'transparent' }}
            >
              PVM 기반 전략 상담 신청
            </Link>
          </div>
        </div>
      </section>

      {/* Our Clients */}
      <OurClients />

      {/* SEO */}
      <SEO />
    </div>
  );
}