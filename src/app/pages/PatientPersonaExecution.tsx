import { Download, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { RelatedReports } from '../components/RelatedReports';
import { generatePDF } from '../utils/pdfGenerator';

export function PatientPersonaExecution() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleDownloadPDF = () => {
    generatePDF('report-content', {
      filename: 'LS컨설팅_암환자질문유형기반병원운영실행보고서.pdf',
      title: '암환자 및 보호자 질문 유형 기반 병원 운영 고도화 실행 보고서',
      excludeSelectors: ['header', 'footer', '.no-pdf']
    });
  };

  // 6대 페르소나 데이터
  const personas = [
    {
      icon: '🔍',
      title: '확인형',
      question: '"정상인가요?"',
      emotion: '궁금',
      strategy: '개인화 해석'
    },
    {
      icon: '⚖️',
      title: '갈등형',
      question: '"계속해야 하나요?"',
      emotion: '불안',
      strategy: '로드맵 시각화'
    },
    {
      icon: '⚠️',
      title: '부작용형',
      question: '"어떻게 관리하나요?"',
      emotion: '걱정',
      strategy: '대응 프로토콜'
    },
    {
      icon: '🏠',
      title: '생활형',
      question: '"어떻게 살아야 하나요?"',
      emotion: '피로',
      strategy: '회복 설계'
    },
    {
      icon: '👨‍👩‍👧',
      title: '보호자형',
      question: '"절차가 맞나요?"',
      emotion: '책임감',
      strategy: '행정 단순화'
    },
    {
      icon: '🔄',
      title: '재발형',
      question: '"다시 생긴 건가요?"',
      emotion: '공포',
      strategy: '검사 해석 구조'
    }
  ];

  // 부서별 실행 매뉴얼
  const departments = [
    {
      id: 'consulting',
      icon: '💬',
      title: '상담팀 실행 매뉴얼',
      goal: '상담 단계에서 "확인 루프"를 줄이는 구조를 설계합니다',
      items: [
        {
          title: '5분 확신 구조 도입',
          content: '상담 초기에 반드시 설명해야 할 3가지:\n• 치료 전체 일정\n• 예상 가능한 부작용 범위\n• 다음 방문 시점 및 검사 계획'
        },
        {
          title: '개인화 요약지 제공',
          content: '상담 종료 시:\n• 현재 상태 요약\n• 다음 단계\n• 주의해야 할 증상\n• 연락 기준\n을 1장으로 제공합니다'
        },
        {
          title: '보호자 전용 설명 구간 운영',
          content: '보호자는 의료 판단보다 행정·재정 구조를 중요하게 봅니다.\n별도 5분 설명 구간이 필요합니다'
        }
      ]
    },
    {
      id: 'nursing',
      icon: '⚕️',
      title: '간호팀 실행 매뉴얼',
      goal: '부작용 대응을 시스템화합니다',
      items: [
        {
          title: '부작용 대응 프로토콜 공개',
          content: '• 단계별 증상\n• 병원 방문 기준\n• 자가 관리 방법\n을 문서화하여 제공합니다'
        },
        {
          title: '증상 체크표 배포',
          content: '환자가 집에서 확인할 수 있도록 체크리스트를 제공합니다'
        },
        {
          title: '회복 프로그램 연계',
          content: '• 식이 관리\n• 체력 관리\n• 피부 관리\n• 배변 관리\n암종별 맞춤 안내가 필요합니다'
        }
      ]
    },
    {
      id: 'admin',
      icon: '📋',
      title: '원무/행정팀 실행 매뉴얼',
      goal: '보호자 스트레스를 줄입니다',
      items: [
        {
          title: '보험·서류 안내 표준화',
          content: '• 청구 시점\n• 면책 기간\n• 필요 서류\n를 한 장으로 제공합니다'
        },
        {
          title: '원스톱 창구 운영',
          content: '보호자가 여러 부서를 이동하지 않도록 단일 창구 시스템이 필요합니다'
        }
      ]
    },
    {
      id: 'marketing',
      icon: '📢',
      title: '마케팅/브랜딩팀 실행 매뉴얼',
      goal: '환자 질문을 콘텐츠로 선제 대응합니다',
      items: [
        {
          title: 'FAQ를 구조화합니다',
          content: '단순 FAQ가 아니라 "페르소나별 질문 페이지"를 만듭니다'
        },
        {
          title: '부작용 대응 콘텐츠 제작',
          content: '• 영상\n• 카드뉴스\n• 리포트\n로 가시화합니다'
        },
        {
          title: '치료 로드맵 시각 콘텐츠 제작',
          content: '환자는 "시간 구조"를 보고 싶어 합니다'
        }
      ]
    },
    {
      id: 'executive',
      icon: '🎯',
      title: '원장/경영진 전략',
      goal: '병원의 전략적 방향을 전환합니다',
      items: [
        {
          title: '치료 중심에서 관리 중심으로 전환',
          content: '병원 포지셔닝을 바꿉니다'
        },
        {
          title: '암종별 회복 클리닉 도입',
          content: '• 유방암 장기 관리\n• 위암 영양 회복\n• 대장암 장 기능 회복\n• 폐암 부작용 관리'
        },
        {
          title: '데이터 기반 상담 프로토콜 구축',
          content: 'PVM 데이터 활용이 필요합니다'
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
          암환자 및 보호자 질문 유형 기반<br />
          병원 운영 고도화 실행 보고서
        </h1>
        
        <p className="text-2xl mb-8" style={{ color: '#666666' }}>
          환자는 정보를 요구하지 않았고, 확신 구조를 원했습니다
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>PVM 전체 데이터 기반</span>
          <span>•</span>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>18 min read</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          Executive Summary
        </h2>
        
        <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: '#F7F7F7' }}>
          <p className="text-lg leading-relaxed mb-4" style={{ color: '#222222' }}>
            PVM 전체 <strong>1,190건 분석 결과</strong>, 암환자와 보호자의 질문은 치료 정보 중심이 아니었습니다.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#222222' }}>
            그들은 다음을 반복적으로 확인하고 있습니다:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✓</span>
              <h3 className="text-lg font-bold" style={{ color: '#0F2B46' }}>내 상태가 정상인지</h3>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✓</span>
              <h3 className="text-lg font-bold" style={{ color: '#0F2B46' }}>이 치료를 계속해도 되는지</h3>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✓</span>
              <h3 className="text-lg font-bold" style={{ color: '#0F2B46' }}>부작용은 어떻게 관리해야 하는지</h3>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✓</span>
              <h3 className="text-lg font-bold" style={{ color: '#0F2B46' }}>앞으로의 시간 구조가 어떻게 되는지</h3>
            </div>
          </div>

          <div className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">✓</span>
              <h3 className="text-lg font-bold" style={{ color: '#0F2B46' }}>행정 절차가 안전한지</h3>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg text-center" style={{ backgroundColor: '#EBF4FF' }}>
          <p className="text-2xl font-bold" style={{ color: '#0F2B46' }}>
            즉, 병원은 <span className="underline">치료기관이 아니라 '확신 설계 기관'</span>이 되어야 합니다
          </p>
        </div>
      </section>

      {/* 6대 페르소나 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          질문 유형 6대 페르소나
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{persona.icon}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0F2B46' }}>
                {persona.title}
              </h3>
              <p className="text-lg mb-2" style={{ color: '#222222' }}>
                {persona.question}
              </p>
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: '#FFE5E5', color: '#C41E3A' }}>
                  감정: {persona.emotion}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-sm font-bold" style={{ color: '#0F2B46' }}>
                  전략: {persona.strategy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 부서별 실행 매뉴얼 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          부서별 실행 매뉴얼
        </h2>
        
        <p className="text-lg mb-8" style={{ color: '#666666' }}>
          이제부터가 핵심입니다. 각 부서별로 즉시 실행 가능한 구체적 액션 플랜을 제시합니다.
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
                    <p className="text-sm mt-1" style={{ color: '#666666' }}>
                      🎯 {dept.goal}
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 transition-transform ${openAccordion === dept.id ? 'rotate-180' : ''}`}
                  style={{ color: '#0F2B46' }}
                />
              </button>
              
              {openAccordion === dept.id && (
                <div className="p-6 pt-0 space-y-6">
                  {dept.items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
                      <h4 className="font-bold mb-2" style={{ color: '#0F2B46' }}>
                        {idx + 1}. {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#666666' }}>
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 전략 결론 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="rounded-xl p-8 lg:p-12" style={{ backgroundColor: '#0F2B46' }}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            최종 전략 결론
          </h2>
          
          <div className="space-y-6 text-white">
            <p className="text-xl leading-relaxed opacity-90">
              암환자는 즉시 결정을 하지 않습니다.<br />
              확신이 생길 때까지 확인을 반복합니다.
            </p>
            
            <div className="my-8 h-px bg-white opacity-20"></div>
            
            <p className="text-2xl lg:text-3xl leading-relaxed font-bold">
              병원의 역할은<br />
              치료 제공이 아니라<br />
              <span className="underline">확신 구조 설계</span>입니다
            </p>
          </div>
        </div>
      </section>

      {/* 데이터 기반 인사이트 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          핵심 데이터 인사이트
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>1,190건</div>
            <div className="text-sm" style={{ color: '#666666' }}>PVM 전체 데이터</div>
          </div>
          
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>6대</div>
            <div className="text-sm" style={{ color: '#666666' }}>환자 페르소나 유형</div>
          </div>
          
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl font-bold mb-2" style={{ color: '#0F2B46' }}>5개 부서</div>
            <div className="text-sm" style={{ color: '#666666' }}>실행 매뉴얼 제공</div>
          </div>
        </div>
      </section>

      {/* CTA 영역 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#222222' }}>
          이 실행 매뉴얼을 병원에 적용하고 싶다면
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/consultation" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>실행 컨설팅 문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-lg border-2 transition-all hover:bg-opacity-5 flex items-center justify-center space-x-2" style={{ borderColor: '#0F2B46', color: '#0F2B46' }} onClick={handleDownloadPDF}>
            <Download className="w-5 h-5" />
            <span>PDF 다운로드</span>
          </button>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/research/patient-persona-execution" />

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