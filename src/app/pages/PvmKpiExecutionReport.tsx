import { Download, ArrowRight, ChevronDown, CheckSquare } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { RelatedReports } from '../components/RelatedReports';
import { generatePDF } from '../utils/pdfGenerator';

export function PvmKpiExecutionReport() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleDownloadPDF = () => {
    alert('고객사전용 서비스 입니다');
  };

  // 병원 전체 KPI 데이터
  const hospitalKpis = [
    {
      category: '확신 설계 지표',
      color: '#0F2B46',
      items: [
        '상담 이해도 평균 점수 (4.5 이상 목표)',
        '개인화 요약지 제공률 90% 이상',
        '치료 로드맵 제공률 95% 이상',
        '상담 후 7일 내 재문의율 20% 이하'
      ]
    },
    {
      category: '부작용 관리 지표',
      color: '#C41E3A',
      items: [
        '부작용 대응 프로토콜 제공률 95% 이상',
        '부작용 응답 평균 시간 24시간 이내',
        '증상 악화 전 사전 상담률 70% 이상'
      ]
    },
    {
      category: '회복 설계 지표',
      color: '#2E7D32',
      items: [
        '체중 유지율 80% 이상',
        '근육량 유지 또는 증가율 60% 이상',
        '피로도 개선 점수 20% 이상 향상'
      ]
    },
    {
      category: '보호자 안정 지표',
      color: '#F57C00',
      items: [
        '보험 안내 제공률 95% 이상',
        '서류 발급 24시간 이내 처리',
        '보호자 만족도 4.5점 이상'
      ]
    },
    {
      category: '재발 불안 관리 지표',
      color: '#5E35B1',
      items: [
        '검사 결과 설명 제공률 100%',
        '수치 정상 범위 사전 안내율 90% 이상'
      ]
    }
  ];

  // 부서별 KPI 및 체크리스트
  const departments = [
    {
      id: 'consulting',
      icon: '💬',
      title: '상담팀 실행 매뉴얼',
      kpis: [
        '치료 로드맵 설명 완료율 95% 이상',
        '개인화 요약지 제공률 90% 이상',
        '상담 후 7일 내 재문의율 20% 이하'
      ],
      checklists: [
        {
          phase: '상담 전',
          items: [
            '환자 암종 및 치료 단계 확인',
            '예상 질문 3개 사전 준비',
            '보호자 동반 여부 확인'
          ]
        },
        {
          phase: '상담 중',
          items: [
            '치료 전체 일정 시각 자료로 설명',
            '종료 기준 명확히 안내',
            '예상 부작용 정상 범위 설명',
            '다음 방문 일정 명확히 고지',
            '보호자 이해도 확인 질문 진행'
          ]
        },
        {
          phase: '상담 후',
          items: [
            '개인화 요약지 발행',
            '부작용 대응 문서 제공',
            '연락 기준 안내',
            'CRM 기록 완료'
          ]
        }
      ]
    },
    {
      id: 'nursing',
      icon: '⚕️',
      title: '간호팀 실행 매뉴얼',
      kpis: [
        '부작용 체크리스트 배포율 95% 이상',
        '응답 평균 시간 24시간 이내',
        '증상 단계별 안내 설명률 90% 이상'
      ],
      checklists: [
        {
          phase: '입원 시',
          items: [
            '암종별 부작용 안내서 제공',
            '응급 기준 설명',
            '자가 관리 가이드 제공'
          ]
        },
        {
          phase: '입원 중',
          items: [
            '일일 증상 체크 기록',
            '피부·영양·배변 상태 점검',
            '불안 점수 기록'
          ]
        },
        {
          phase: '퇴원 전',
          items: [
            '가정 내 관리 가이드 재설명',
            '응급 연락 기준 재확인',
            '재발 모니터링 일정 안내'
          ]
        }
      ]
    },
    {
      id: 'nutrition',
      icon: '🍎',
      title: '영양·재활팀 실행 매뉴얼',
      kpis: [
        '체중 유지율 80% 이상',
        '근육량 유지 또는 증가율 60% 이상',
        '식이 교육 참여율 70% 이상'
      ],
      checklists: [
        {
          phase: '초기 평가',
          items: [
            '체중·근육량 측정',
            '식이 습관 조사',
            '활동 가능 범위 평가'
          ]
        },
        {
          phase: '주간 점검',
          items: [
            '식단 피드백',
            '운동 참여 확인',
            '배변 상태 확인'
          ]
        },
        {
          phase: '월간 평가',
          items: [
            '체중 변화 분석',
            '근육량 비교',
            '회복 목표 재설정'
          ]
        }
      ]
    },
    {
      id: 'admin',
      icon: '📋',
      title: '원무·행정팀 실행 매뉴얼',
      kpis: [
        '보험 안내 제공률 95% 이상',
        '서류 발급 24시간 이내',
        '원스톱 처리율 85% 이상'
      ],
      checklists: [
        {
          phase: '접수 시',
          items: [
            '보험 청구 절차 설명',
            '예상 비용 안내',
            '필요 서류 체크리스트 제공'
          ]
        },
        {
          phase: '퇴원 시',
          items: [
            '보험 서류 안내',
            '추가 문의 채널 안내',
            '보호자 이해도 확인'
          ]
        }
      ]
    },
    {
      id: 'marketing',
      icon: '📢',
      title: '마케팅팀 실행 매뉴얼',
      kpis: [
        '페르소나 기반 콘텐츠 월 8건 이상',
        'FAQ 클릭 후 상담 전환율 10% 이상'
      ],
      checklists: [
        {
          phase: '월간 기획',
          items: [
            '확인형 콘텐츠 제작',
            '부작용 대응 콘텐츠 제작',
            '검사·재발 설명 콘텐츠 제작'
          ]
        },
        {
          phase: '성과 분석',
          items: [
            '클릭률 분석',
            '전환율 분석',
            '질문 유형 변화 분석'
          ]
        }
      ]
    },
    {
      id: 'executive',
      icon: '🎯',
      title: '경영진 실행 매뉴얼',
      kpis: [
        '암종별 회복 프로그램 4개 이상',
        '월 1회 KPI 리뷰',
        '3개월 유지율 85% 이상'
      ],
      checklists: [
        {
          phase: '실행 체크리스트',
          items: [
            '월간 KPI 회의 실시',
            '부서별 데이터 공유',
            '이탈 원인 분석',
            '신규 프로그램 기획',
            '데이터 기반 의사결정 기록'
          ]
        }
      ]
    }
  ];

  return (
    <div id="report-content" className="min-h-screen bg-white pt-20">
      {/* HERO SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Healthcare Strategy Research
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          암요양 및 재활 병원을 위한<br />
          PVM 기반 KPI 실행 설계 보고서
        </h1>
        
        <p className="text-2xl mb-8" style={{ color: '#666666' }}>
          환자 니즈 기반 운영 고도화 전략
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>PVM 1,190건 분석 기반</span>
          <span>•</span>
          <span>2026년 2월</span>
          <span>•</span>
          <span>20 min read</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          Executive Summary
        </h2>
        
        <div className="p-8 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
          <p className="text-lg leading-relaxed" style={{ color: '#222222' }}>
            PVM 전체 데이터 분석 결과, 암환자와 보호자는 치료 자체보다 <strong>상태 해석, 시간 구조, 부작용 관리, 생활 회복, 행정 안정성</strong>을 반복적으로 질문하고 있습니다.
          </p>
          <div className="my-6 h-px bg-gray-300"></div>
          <p className="text-lg leading-relaxed" style={{ color: '#222222' }}>
            따라서 암요양·재활 병원의 KPI는 <strong className="underline">치료 기술이 아니라 확신 제공 능력과 회복 설계 능력</strong>을 측정해야 합니다.
          </p>
        </div>
      </section>

      {/* 병원 전체 KPI 구조 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          병원 전체 KPI 구조
        </h2>
        
        <div className="space-y-6">
          {hospitalKpis.map((kpi, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 font-bold text-white text-lg" style={{ backgroundColor: kpi.color }}>
                {kpi.category}
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  {kpi.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckSquare className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: kpi.color }} />
                      <span className="text-base" style={{ color: '#222222' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 부서별 KPI 실행 매뉴얼 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          부서별 KPI 실행 매뉴얼
        </h2>
        
        <p className="text-lg mb-8" style={{ color: '#666666' }}>
          각 부서가 즉시 실행할 수 있는 KPI와 단계별 체크리스트를 제공합니다.
        </p>

        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(dept.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{dept.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-bold" style={{ color: '#0F2B46' }}>
                      {dept.title}
                    </h3>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 transition-transform ${openAccordion === dept.id ? 'rotate-180' : ''}`}
                  style={{ color: '#0F2B46' }}
                />
              </button>
              
              {openAccordion === dept.id && (
                <div className="p-6 pt-0 space-y-6">
                  {/* KPI */}
                  <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#EBF4FF', borderColor: '#0F2B46' }}>
                    <h4 className="font-bold mb-3 text-lg" style={{ color: '#0F2B46' }}>
                      📊 KPI
                    </h4>
                    <ul className="space-y-2">
                      {dept.kpis.map((kpi, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-sm font-medium" style={{ color: '#0F2B46' }}>•</span>
                          <span className="text-sm" style={{ color: '#222222' }}>{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 체크리스트 */}
                  <div>
                    <h4 className="font-bold mb-4 text-lg" style={{ color: '#0F2B46' }}>
                      ✓ 실행 체크리스트
                    </h4>
                    <div className="space-y-4">
                      {dept.checklists.map((checklist, idx) => (
                        <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
                          <h5 className="font-bold mb-3" style={{ color: '#0F2B46' }}>
                            {checklist.phase}
                          </h5>
                          <ul className="space-y-2">
                            {checklist.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start space-x-2">
                                <span className="text-base" style={{ color: '#0F2B46' }}>☐</span>
                                <span className="text-sm" style={{ color: '#666666' }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 전략 결론 블록 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="rounded-xl p-8 lg:p-12" style={{ backgroundColor: '#0F2B46' }}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            전략 결론
          </h2>
          
          <p className="text-2xl lg:text-3xl leading-relaxed font-bold text-white">
            암요양·재활 병원의 경쟁력은<br />
            치료 성공률이 아니라<br />
            <span className="underline">확신 설계 능력, 부작용 관리 체계,<br />회복 프로그램 구조</span>에 달려 있습니다
          </p>
        </div>
      </section>

      {/* 핵심 통계 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          핵심 데이터 인사이트
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>5개</div>
            <div className="text-sm" style={{ color: '#666666' }}>병원 전체 KPI 영역</div>
          </div>
          
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>6개 부서</div>
            <div className="text-sm" style={{ color: '#666666' }}>실행 매뉴얼 제공</div>
          </div>
          
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>1,190건</div>
            <div className="text-sm" style={{ color: '#666666' }}>PVM 데이터 분석</div>
          </div>
        </div>
      </section>

      {/* CTA 영역 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#222222' }}>
          병원 맞춤 KPI 설계가 필요하다면
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/consultation" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>병원 맞춤 KPI 설계 상담</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button onClick={handleDownloadPDF} className="px-8 py-4 rounded-lg border-2 transition-all hover:bg-opacity-5 flex items-center justify-center space-x-2" style={{ borderColor: '#0F2B46', color: '#0F2B46' }}>
            <Download className="w-5 h-5" />
            <span>PDF 리포트 다운로드</span>
          </button>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/research/pvm-kpi-execution-report" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#222222' }}>
            최신 리서치를 이메일로 받아보세요
          </h3>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <button className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0F2B46' }}>
              구독
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200 mt-16">
        <div className="text-center space-y-2">
          <h4 className="font-bold text-lg" style={{ color: '#0F2B46' }}>LS Consulting</h4>
          <p className="text-sm" style={{ color: '#666666' }}>암 환자 니즈 분석 기반 의료 전략 컨설팅</p>
          <p className="text-sm" style={{ color: '#666666' }}>Research / Strategy / Execution</p>
          <p className="text-sm" style={{ color: '#666666' }}>이메일: fusionsfc@gmail.com</p>
          <p className="text-sm" style={{ color: '#666666' }}>전화: 010-9297-0940</p>
          <p className="text-sm" style={{ color: '#666666' }}>서울특별시, 제주특별자치도</p>
        </div>
      </footer>
    </div>
  );
}