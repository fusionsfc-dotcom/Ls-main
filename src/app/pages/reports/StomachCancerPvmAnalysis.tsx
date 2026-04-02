import { Link } from 'react-router';
import { ArrowLeft, AlertCircle, CheckCircle2, Activity } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function StomachCancerPvmAnalysis() {
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

  const physicalChanges = [
    '위 절제 후 섭취량 감소',
    '항암 치료 중 설사·급박변',
    '체중 감소',
    '체력 저하',
    '생활 기능 문제'
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
            2026년 2월간 위암 환자 질문 유형 분석 보고서
          </h1>
          
          <p className="text-xl lg:text-2xl mb-4 leading-relaxed font-semibold" style={{ color: '#0F2B46' }}>
            위암 환자는 치료보다 "관리의 확실성"을 원합니다
          </p>

          <p className="text-lg lg:text-xl mb-8 leading-relaxed" style={{ color: '#0E1B3D', opacity: 0.7 }}>
            최근 1개월 PVM 분석 결과,<br />
            위암 환자의 질문은 치료 자체보다<br />
            회복 과정의 불확실성에서 집중되었습니다.
          </p>

          <div className="flex items-center space-x-4 text-sm" style={{ color: '#0E1B3D', opacity: 0.6 }}>
            <span>February 2026</span>
            <span>•</span>
            <span>Monthly Cancer Voice Report</span>
            <span>•</span>
            <span>LS Consulting Research</span>
          </div>
        </div>
      </section>

      {/* SECTION 1 – 위암 환자의 실제 상태 변화 구조 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            위암 환자의 불안은 이렇게 시작됩니다
          </h2>
          
          <div className="p-8 lg:p-12 rounded-2xl bg-white border" style={{ borderColor: '#EAEAEA' }}>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: '#0E1B3D' }}>
              위암 환자의 질문은 단순한 정보 요청이 아닙니다.<br />
              그 배경에는 다음과 같은 신체적 변화가 있습니다.
            </p>
            
            <div className="grid gap-4 mb-8">
              {physicalChanges.map((change, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F8F9FA' }}>
                  <Activity className="w-6 h-6 flex-shrink-0" style={{ color: '#0F2B46' }} />
                  <span className="text-lg font-semibold" style={{ color: '#0E1B3D' }}>{change}</span>
                </div>
              ))}
            </div>
            
            <div className="p-8 rounded-xl text-center" style={{ backgroundColor: '#0F2B46' }}>
              <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed">
                이 변화가 지속되면<br />
                환자는 "재발"을 먼저 의심합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 – 질문 유형별 케어 방향 */}
      <section className="py-16 px-8 lg:px-16">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            질문 유형별 케어 방향
          </h2>
          
          {/* ① 검사·복약 일정 충돌 */}
          <div className="mb-20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              ① 검사·복약 일정 충돌
            </h3>
            
            {/* 환자 보이스 */}
            <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0F2B46' }} />
                <p className="text-sm font-semibold" style={{ color: '#0E1B3D', opacity: 0.7 }}>환자 보이스</p>
              </div>
              <p className="text-lg italic leading-relaxed" style={{ color: '#0E1B3D' }}>
                "위내시경 전날 금식이면 항암약을 먹어도 되는지 모르겠습니다."
              </p>
            </div>
            
            {/* 환자 상태 해석 */}
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4" style={{ color: '#0E1B3D' }}>환자 상태 해석</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#0E1B3D' }}>
                    금식 → 공복 상태 →<br />저혈당·탈수 위험
                  </p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#0E1B3D' }}>
                    복약 여부 불확실 →<br />심리 불안 상승
                  </p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm leading-relaxed" style={{ color: '#0E1B3D' }}>
                    보호자가 일정 관리 중<br />과부하 상태
                  </p>
                </div>
              </div>
            </div>
            
            {/* 상담팀 실행 매뉴얼 */}
            <div className="p-8 rounded-xl border-2 mb-4" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
              <h4 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>상담팀 실행 매뉴얼</h4>
              
              <div className="mb-6">
                <p className="text-base font-semibold mb-3" style={{ color: '#0E1B3D' }}>검사 3일 전 자동 문자 발송</p>
                <div className="pl-4 space-y-2">
                  {['금식 시간', '복약 원칙', '응급 시 연락처'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F2B46' }}></div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0F2B46' }} />
                  <span style={{ color: '#0E1B3D' }}>검사 전날 재확인 콜 운영</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>체크리스트</p>
                <div className="space-y-2">
                  {['검사 일정 재확인', '금식 시간 설명', '항암 복약 여부 명확 안내', '보호자 이해도 확인'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 검사 전 복약 문의 감소율</span>
                </div>
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 일정 관련 재문의율 감소</span>
                </div>
              </div>
            </div>
          </div>

          {/* ② 항암 부작용 – 설사/급박변 */}
          <div className="mb-20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              ② 항암 부작용 – 설사/급박변
            </h3>
            
            <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0F2B46' }} />
                <p className="text-sm font-semibold" style={{ color: '#0E1B3D', opacity: 0.7 }}>환자 보이스</p>
              </div>
              <p className="text-lg italic leading-relaxed" style={{ color: '#0E1B3D' }}>
                "주말인데 병원 연결이 안 됩니다. 응급실 가야 하나요?"
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4" style={{ color: '#0E1B3D' }}>환자 상태 해석</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>설사 3회 이상 →<br />탈수 위험</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>전해질 불균형 가능성</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>공황 상태 동반 가능</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
              <h4 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>간호팀 케어 프로토콜</h4>
              
              {/* 1단계 */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="font-semibold mb-3" style={{ color: '#0E1B3D' }}>1단계 – 상태 분류</p>
                <div className="pl-4 space-y-2">
                  {['설사 횟수', '혈변 여부', '어지럼/탈수 증상'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F2B46' }}></div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2단계 */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="font-semibold mb-3" style={{ color: '#0E1B3D' }}>2단계 – 즉시 행동 지침</p>
                <div className="pl-4 space-y-2">
                  {['ORS 수분 섭취', '자극 음식 중단', '휴식'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F2B46' }}></div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3단계 */}
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="font-semibold mb-3" style={{ color: '#0E1B3D' }}>3단계 – 응급 기준 명확화</p>
                <div className="pl-4 space-y-2">
                  {['38도 이상 발열', '혈변', '의식 저하'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
                      <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>체크리스트</p>
                <div className="space-y-2">
                  {['설사 횟수 기록', '수분 섭취 안내', '응급 기준 설명', '다음 진료 시 보고 항목 전달'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 불필요 응급실 방문 감소율</span>
                </div>
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 부작용 관리 만족도</span>
                </div>
              </div>
            </div>
          </div>

          {/* ③ 체중 감소·식이 문제 */}
          <div className="mb-20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              ③ 체중 감소·식이 문제
            </h3>
            
            <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0F2B46' }} />
                <p className="text-sm font-semibold" style={{ color: '#0E1B3D', opacity: 0.7 }}>환자 보이스</p>
              </div>
              <div className="space-y-3">
                <p className="text-lg italic" style={{ color: '#0E1B3D' }}>"체중이 계속 빠집니다."</p>
                <p className="text-lg italic" style={{ color: '#0E1B3D' }}>"먹으면 바로 설사합니다."</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4" style={{ color: '#0E1B3D' }}>환자 상태 해석</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>단백질 섭취 부족</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>근육 감소 시작</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>재발 불안 증가</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
              <h4 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>영양팀 실행 매뉴얼</h4>
              
              <div className="space-y-3 mb-6">
                {[
                  '체중 주간 측정',
                  '단백질 최소 섭취량 설정',
                  '식사 단계표 제공',
                  '설사 시 대체 식단 안내'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0F2B46' }} />
                    <span style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>구체적 케어 기준</p>
                <div className="space-y-2">
                  {[
                    '체중 1주 1kg 이상 감소 → 영양 집중 관리',
                    'BMI 18.5 이하 → 고단백 식단 개입',
                    '알부민 수치 추적'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0F2B46' }}></div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>체크리스트</p>
                <div className="space-y-2">
                  {['최근 3일 섭취량 기록', '체중 변화 기록', '대체 식단 안내', '영양 상담 예약'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 체중 유지율</span>
                </div>
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 재입원율 감소</span>
                </div>
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 근육량 유지율</span>
                </div>
              </div>
            </div>
          </div>

          {/* ④ 생활 기능 문제 */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              ④ 생활 기능 문제
            </h3>
            
            <div className="p-6 rounded-xl mb-6" style={{ backgroundColor: '#F8F9FA' }}>
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#0F2B46' }} />
                <p className="text-sm font-semibold" style={{ color: '#0E1B3D', opacity: 0.7 }}>환자 보이스</p>
              </div>
              <p className="text-lg italic" style={{ color: '#0E1B3D' }}>
                "카테터 제품 추천 부탁드립니다."
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-4" style={{ color: '#0E1B3D' }}>환자 상태 해석</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>배뇨 기능 장애</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>자가 관리 스트레스</p>
                </div>
                <div className="p-4 border-l-4 rounded" style={{ borderColor: '#0F2B46', backgroundColor: 'white', border: '1px solid #EAEAEA' }}>
                  <p className="text-sm" style={{ color: '#0E1B3D' }}>보호자 피로 증가</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}>
              <h4 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>케어코디네이터 실행 매뉴얼</h4>
              
              <div className="space-y-3 mb-6">
                {[
                  '제품 규격 확인',
                  '급여 여부 안내',
                  '교체 주기 교육',
                  '간호 교육 연결'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#0F2B46' }} />
                    <span style={{ color: '#0E1B3D' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>추가 케어</p>
                <div className="space-y-2">
                  {['보호자 실습 교육', '영상 매뉴얼 제공'].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0F2B46' }}></div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#F8F9FA' }}>
                <p className="text-sm font-semibold mb-3" style={{ color: '#0E1B3D' }}>체크리스트</p>
                <div className="space-y-2">
                  {['제품 규격 확인', '구매처 안내', '보호자 교육 완료', '간호 연계'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded border-2 flex items-center justify-center" style={{ borderColor: '#0F2B46' }}>
                        <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: '#0F2B46' }}></div>
                      </div>
                      <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 생활 문의 병원 내 해결률</span>
                </div>
                <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#0F2B46', color: 'white' }}>
                  <span className="text-sm font-semibold">KPI: 보호자 만족도 상승</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 – 통합 관리 시스템 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-white">
            위암 환자 케어는 시스템입니다
          </h2>
          
          <p className="text-xl mb-12 text-white opacity-90 leading-relaxed">
            2차 암요양·재활 병원은<br />
            다음 4가지 구조를 갖춰야 합니다.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {[
              '검사·복약 자동 안내 시스템',
              '부작용 대응 단계별 프로토콜',
              '영양·체중 추적 시스템',
              '생활 문제 해결 가이드'
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                    {idx + 1}
                  </div>
                  <p className="text-base lg:text-lg font-semibold text-white">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <p className="text-xl lg:text-2xl font-bold text-white text-center leading-relaxed">
              환자는 치료 결과가 아니라<br />
              관리의 안정성을 보고 병원을 평가합니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            암 환자 니즈 기반 의료 운영 전략을<br />
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

      {/* SEO */}
      <SEO />
    </div>
  );
}