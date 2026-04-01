import { Link } from 'react-router';
import { ArrowLeft, AlertTriangle, CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react';
import { OurClients } from '../../components/OurClients';
import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function PatientDischargeTransferStructure() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitMessage('유효한 이메일 주소를 입력해주세요.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/newsletter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitMessage(result.message);
        setSubmitSuccess(true);
        setEmail('');
      } else {
        setSubmitMessage(result.message || '구독 처리 중 오류가 발생했습니다.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('Newsletter 구독 오류:', error);
      setSubmitMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stressFourAxes = [
    {
      title: '① 병원 스트레스',
      items: ['설명 부족', '반복 질문 어려움', '신뢰 흔들림'],
      result: '병원이 안전지대가 아니라 통과 지점이 됩니다.'
    },
    {
      title: '② 치료 스트레스',
      items: ['항암 부작용', '체력 저하', '식사 문제'],
      result: '치료 중단 고민으로 이어집니다.'
    },
    {
      title: '③ 행정 스트레스',
      items: ['예약 대기', '주말 연락 불가', '검사 일정 혼선'],
      result: '운영 불만이 병원 불신으로 전환됩니다.'
    },
    {
      title: '④ 심리 스트레스',
      items: ['재발 공포', '수치 과잉 해석', '보호자 불안'],
      result: '다른 선택지를 탐색하기 시작합니다.'
    }
  ];

  const strategies = [
    {
      title: '① 예측 가능성 제공',
      items: ['주간 회복 계획표', '치료 단계 로드맵', '상태 변화 그래프'],
      goal: '환자가 "지금 어디에 있는지" 알게 합니다.'
    },
    {
      title: '② 체력 회복 체감',
      items: ['근력 프로그램 운영', '피로 점수 기록', '활동 시간 증가 목표 설정'],
      goal: '치료 지속 가능성 강화'
    },
    {
      title: '③ 영양 안정',
      items: ['체중 감소 경고 기준', '단백질 목표 설정', '식사 단계 가이드'],
      goal: '재발 불안 감소'
    },
    {
      title: '④ 보호자 신뢰 확보',
      items: ['주간 브리핑', '치료 요약 리포트', '보호자 전용 상담'],
      goal: '보호자 이탈 방지'
    },
    {
      title: '⑤ 생활 문제 해결',
      items: ['통증 조절', '수면 관리', '배변·배뇨 문제 해결', '소모품 안내 체계'],
      goal: '병원 체류 만족도 향상'
    }
  ];

  const decisionFlow = [
    '불편 경험',
    '설명 부족',
    '불안 증폭',
    '커뮤니티 질문',
    '추천 요청',
    '전원·퇴원 결정'
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
            Healthcare Strategy Notes
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0E1B3D' }}>
            환자는 왜 떠나는가<br />
            그리고 어떻게 머물게 할 것인가
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed" style={{ color: '#0F2B46', opacity: 0.9 }}>
            퇴원과 전원은 치료 실패 때문이 아니라<br />
            관리의 불확실성에서 시작됩니다.
          </p>

          <div className="flex items-center space-x-4 text-sm mb-12" style={{ color: '#0E1B3D', opacity: 0.6 }}>
            <span>March 2026</span>
            <span>•</span>
            <span>Healthcare Strategy Notes</span>
            <span>•</span>
            <span>LS Consulting Research</span>
          </div>
        </div>
      </section>

      {/* Section 1: 문제 제기 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            환자의 퇴원 및 전원은 왜 발생하는가
          </h2>
          
          <div className="p-8 lg:p-12 rounded-2xl bg-white border" style={{ borderColor: '#EAEAEA' }}>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#0E1B3D' }}>
              <p>
                대부분의 질문은 3차병원 치료(수술·항암·방사선)에 집중되어 있습니다.<br />
                그러나 퇴원과 전원 결정은 치료 과정이 아니라<br />
                <span className="font-semibold" style={{ color: '#0F2B46' }}>치료 이후 관리 공백에서 발생합니다.</span>
              </p>
              
              <p className="pt-4">환자는 다음과 같은 영역에서 힘들어합니다.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {['병원 경험', '치료 부담', '행정 스트레스', '심리 불안'].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-lg text-center font-semibold" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                    {item}
                  </div>
                ))}
              </div>
              
              <div className="p-6 rounded-xl mt-6" style={{ backgroundColor: '#0F2B46' }}>
                <p className="text-xl lg:text-2xl font-bold text-white text-center leading-relaxed">
                  이 네 가지가 누적되면<br />
                  환자는 이동을 결심합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 환자가 힘들어하는 4가지 축 */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            환자가 힘들어하는 4가지 축
          </h2>
          
          <div className="space-y-8">
            {stressFourAxes.map((axis, index) => (
              <div key={index} className="p-8 rounded-2xl border-2" style={{ borderColor: '#EAEAEA', backgroundColor: 'white' }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  {axis.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {axis.items.map((item, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-lg border" style={{ borderColor: '#0F2B46', color: '#0E1B3D' }}>
                      {item}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-start space-x-3 p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                  <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
                  <p className="font-semibold" style={{ color: '#0E1B3D' }}>
                    {axis.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 퇴원 결정 흐름 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            퇴원 결정 흐름
          </h2>
          
          <div className="p-8 lg:p-12 rounded-2xl bg-white border" style={{ borderColor: '#EAEAEA' }}>
            <div className="space-y-4">
              {decisionFlow.map((step, index) => (
                <div key={index}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: index === 1 ? '#ef4444' : '#0F2B46' }}>
                      {index + 1}
                    </div>
                    <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: index === 1 ? '#fef2f2' : '#F8F9FA', borderLeft: index === 1 ? '4px solid #ef4444' : 'none' }}>
                      <p className="font-semibold text-lg" style={{ color: '#0E1B3D' }}>
                        {step}
                      </p>
                    </div>
                  </div>
                  {index < decisionFlow.length - 1 && (
                    <div className="ml-5 h-8 border-l-2" style={{ borderColor: '#EAEAEA' }}></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
              <p className="text-xl lg:text-2xl font-bold text-white text-center leading-relaxed">
                개입은 2단계에서 이루어져야 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 2차 암요양·재활 병원의 전략 */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            2차 암요양·재활 병원의 전략
          </h2>
          
          <div className="p-8 lg:p-12 rounded-2xl mb-12" style={{ backgroundColor: '#0F2B46' }}>
            <p className="text-2xl lg:text-3xl font-bold text-white text-center leading-relaxed">
              2차병원은 치료를 대신하는 곳이 아닙니다.<br />
              치료를 버티게 하는 곳입니다.
            </p>
          </div>
          
          <div className="space-y-8">
            {strategies.map((strategy, index) => (
              <div key={index} className="p-8 rounded-2xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  {strategy.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  {strategy.items.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0F2B46' }} />
                      <span style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F8F9FA' }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#0E1B3D', opacity: 0.7 }}>목표</p>
                  <p className="font-semibold text-lg" style={{ color: '#0E1B3D' }}>
                    {strategy.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: 부서별 실행 매뉴얼 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            부서별 실행 매뉴얼
          </h2>
          
          {/* 상담팀 */}
          <div className="mb-8 p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              상담팀
            </h3>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="space-y-2">
                {[
                  '전원 고민 발언 탐지',
                  '치료 만족도 확인',
                  '보호자 불안 점검',
                  '주말 대응 안내'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                    </div>
                    <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 간호팀 */}
          <div className="mb-8 p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              간호팀
            </h3>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="space-y-2">
                {[
                  '증상 악화 기준 명확화',
                  '부작용 단계별 개입',
                  '주말 대응 가이드 제공'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                    </div>
                    <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 영양팀 */}
          <div className="mb-8 p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              영양팀
            </h3>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="space-y-2">
                {[
                  '체중 주간 기록',
                  '근육량 관리',
                  '식사 단계 안내'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                    </div>
                    <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 재활팀 */}
          <div className="mb-8 p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              재활팀
            </h3>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="space-y-2">
                {[
                  '활동 목표 설정',
                  '피로도 관리',
                  '운동 조정 기준 운영'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                    </div>
                    <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 병원 운영팀 */}
          <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              병원 운영팀
            </h3>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="space-y-2">
                {[
                  '이탈 위험 환자 리스트 관리',
                  '주간 상태 회의',
                  '장기 재활 만족도 조사'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                      <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                    </div>
                    <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: 전략적 결론 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
            환자는 치료가 힘들어서 떠나는 것이 아닙니다.<br />
            확신이 없어서 떠납니다.
          </h2>
          
          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {[
              '예측 가능성',
              '체력 회복 체감',
              '영양 안정',
              '보호자 신뢰',
              '생활 문제 해결'
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg text-center font-semibold text-white border-2 border-white">
                {item}
              </div>
            ))}
          </div>

          <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <p className="text-xl lg:text-2xl font-bold text-white text-center leading-relaxed">
              이 다섯 가지를 구조화하면<br />
              퇴원은 줄고 장기 재활 만족도는 상승합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            암 환자 니즈 기반 전략 리포트를<br />
            이메일로 받아보세요
          </h2>
          
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-6 py-4 border-2 focus:outline-none focus:border-opacity-100 rounded-lg"
                  style={{ 
                    borderColor: '#0F2B46',
                    color: '#0E1B3D'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="px-8 py-4 text-white transition-all hover:opacity-90 rounded-lg font-semibold"
                  style={{ backgroundColor: '#0F2B46' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '구독 중...' : '구독하기'}
                </button>
              </div>
              {submitMessage && (
                <p 
                  className="text-sm mt-4"
                  style={{ color: submitSuccess ? '#10b981' : '#ef4444' }}
                >
                  {submitMessage}
                </p>
              )}
            </form>
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
