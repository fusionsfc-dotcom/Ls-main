import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { RelatedReports } from '../components/RelatedReports';
import { usePdfDownload } from '../hooks/usePdfDownload';

export function HospitalSwitchResearch() {
  const handleDownloadPDF = usePdfDownload(
    'LS컨설팅_암환자는언제병원을바꾸는가.pdf',
    '암 환자는 언제 병원을 바꾸는가 - 치료가 아니라 관리 경험에서 결정이 갈린다'
  );

  return (
    <div id="report-content" className="min-h-screen bg-white pt-20">
      {/* HERO SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Healthcare Strategy Research
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          암 환자는 언제 병원을 바꾸는가
        </h1>
        
        <p className="text-2xl mb-8" style={{ color: '#666666' }}>
          치료가 아니라 '관리 경험'에서 결정이 갈린다
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>PVM 데이터 기반 전략 연구</span>
          <span>•</span>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>12 min read</span>
        </div>
      </section>

      {/* 연구 개요 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          연구 개요
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 데이터</div>
            <div className="text-2xl font-bold" style={{ color: '#0F2B46' }}>2026년 2월 PVM 531건</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 항목</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>니즈 / 감정 / 탐색 행동 / 치료 단계</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>목적</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>병원 이탈 시점 구조 분석</div>
          </div>
        </div>
      </section>

      {/* 핵심 발견 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          핵심 발견
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>
              관리 불안이 이탈을 만든다
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
              부작용 언급 16.6% 증가. 치료 자체보다 '관리되지 않는 느낌'이 병원 전환의 핵심 요인
            </p>
          </div>
          
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>
              상담 초기 '확신 부족'이 위험 구간
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
              초기 상담에서 로드맵을 제시받지 못한 환자는 반복적으로 다른 병원 검색
            </p>
          </div>
          
          <div className="p-6 rounded-xl" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>
              치료 지속 가능성에 대한 불안 반복
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#666666' }}>
              '확인 행동' 반복 패턴 발견. 환자는 계속해서 재확인을 원함
            </p>
          </div>
        </div>
      </section>

      {/* 환자 여정 재구성 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          실제 환자 여정 구조
        </h2>
        
        <div className="space-y-8">
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#E5E7EB' }}>
            <div className="text-sm mb-3 font-bold" style={{ color: '#666666' }}>기존 이해</div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-gray-100" style={{ color: '#666666' }}>증상</div>
              <ArrowRight className="w-4 h-4" style={{ color: '#666666' }} />
              <div className="px-4 py-2 rounded-lg bg-gray-100" style={{ color: '#666666' }}>진단</div>
              <ArrowRight className="w-4 h-4" style={{ color: '#666666' }} />
              <div className="px-4 py-2 rounded-lg bg-gray-100" style={{ color: '#666666' }}>치료</div>
              <ArrowRight className="w-4 h-4" style={{ color: '#666666' }} />
              <div className="px-4 py-2 rounded-lg bg-gray-100" style={{ color: '#666666' }}>종료</div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#EBF4FF' }}>
            <div className="text-sm mb-3 font-bold" style={{ color: '#0F2B46' }}>실제 발견된 구조</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>증상</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>검색</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>확인</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>비교</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>치료</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>부작용</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center" style={{ backgroundColor: '#0F2B46', color: 'white' }}>재확인</div>
              <div className="px-4 py-3 rounded-lg text-sm text-center bg-red-600 text-white">병원 비교</div>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#0F2B46' }}>
              <strong>위험 구간:</strong> 부작용 발생 후 재확인 단계에서 병원 비교 행동이 급증
            </p>
          </div>
        </div>
      </section>

      {/* 전략 시사점 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="rounded-xl p-8 lg:p-12" style={{ backgroundColor: '#0F2B46' }}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            병원이 당장 바꿔야 할 3가지
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">부작용 대응 체계 가시화</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  "부작용이 생기면 어떻게 하나요?"라는 질문에 즉시 답할 수 있는 프로토콜 공개. 
                  부작용 관리 팀, 연락처, 대응 시간을 명확히 안내.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">검사→치료 로드맵 시각화</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  초기 상담에서 "앞으로 무슨 일이 일어나는지" 시각적으로 제시. 
                  단계별 예상 일정, 비용, 증상 변화를 포함한 전체 로드맵 공유.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">관리 경험의 브랜드화</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  치료 성적보다 "우리 병원은 환자를 관리한다"는 메시지 강화. 
                  정기 체크인, 사후 관리, 재활 프로그램을 브랜드 정체성으로 전환.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 결론 강조 박스 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="text-center p-12 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
          <p className="text-2xl lg:text-3xl leading-relaxed font-medium" style={{ color: '#0F2B46' }}>
            "환자는 치료가 마음에 안 들어서<br />병원을 바꾸지 않는다.<br /><br />
            <strong>혼자라고 느낄 때 바꾼다.</strong>"
          </p>
        </div>
      </section>

      {/* CTA 영역 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#222222' }}>
          이 연구 결과를 병원 전략에 적용하고 싶다면
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/consultation" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>전략 상담 문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button onClick={handleDownloadPDF} className="px-8 py-4 rounded-lg border-2 transition-all hover:bg-opacity-5 flex items-center justify-center space-x-2" style={{ borderColor: '#0F2B46', color: '#0F2B46' }}>
            <Download className="w-5 h-5" />
            <span>PDF 다운로드</span>
          </button>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/research/pvm-hospital-switch" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          LS Consulting 뉴스레터 구독하기
        </h2>
        
        <p className="text-lg mb-4" style={{ color: '#666666' }}>
          최신 연구 결과와 전략 컨설팅 정보를 받아보세요.
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input type="email" placeholder="이메일 주소 입력" className="px-4 py-3 rounded-lg border-2" style={{ borderColor: '#E5E7EB' }} />
          <button className="px-8 py-4 rounded-lg bg-gray-100 transition-all hover:bg-gray-200 flex items-center justify-center space-x-2" style={{ color: '#0F2B46' }}>
            <span>구독하기</span>
          </button>
        </form>
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