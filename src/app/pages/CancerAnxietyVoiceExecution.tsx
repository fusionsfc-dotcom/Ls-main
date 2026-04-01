import { Link } from 'react-router';
import { ArrowLeft, CheckSquare, Users, Phone, Heart, Activity, MessageCircle, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from '../components/SEO';
import { RelatedReports } from '../components/RelatedReports';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function CancerAnxietyVoiceExecution() {
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

  // 불안 곡선 데이터
  const anxietyData = [
    { stage: '진단 직후', anxiety: 95, label: '진단\n직후' },
    { stage: '항암 초기', anxiety: 85, label: '항암\n초기' },
    { stage: '항암 중반', anxiety: 75, label: '항암\n중반' },
    { stage: '퇴원 직전', anxiety: 70, label: '퇴원\n직전' },
    { stage: '퇴원 직후', anxiety: 80, label: '퇴원\n직후' },
    { stage: '검사 전', anxiety: 90, label: '검사\n전' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="암환자 불안 점수 변화 및 실행 전략 리포트 | LS컨설팅"
        description="환자보이스 기반 암요양·재활 2차병원 부서별 실행 매뉴얼 전략 보고서"
        url="https://www.lsconsulting.co.kr/report/cancer-anxiety-voice-execution"
      />

      {/* Back Navigation */}
      <div className="py-8 px-6 lg:px-8 max-w-[960px] mx-auto">
        <Link 
          to="/insights" 
          className="inline-flex items-center space-x-2 text-sm hover:opacity-70 transition-opacity"
          style={{ color: '#0F2B46' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>
      </div>

      {/* HERO SECTION */}
      <header className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6" 
             style={{ backgroundColor: '#0F2B46', color: 'white' }}>
          Healthcare Strategy Report
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0F2B46' }}>
          암환자 불안 점수 변화 추적 분석 보고서
        </h1>
        
        <p className="text-xl mb-8 leading-relaxed" style={{ color: '#0F2B46', opacity: 0.7 }}>
          환자보이스를 기반으로<br />
          2차병원 각 부서의 실행 전략을 제시합니다.
        </p>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#0F2B46', opacity: 0.6 }}>
          <span>March 2026</span>
          <span>•</span>
          <span>20 min read</span>
        </div>
      </header>

      {/* EXECUTIVE SUMMARY */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0F2B46' }}>
          Executive Summary
        </h2>
        <p className="text-lg leading-relaxed mb-4" style={{ color: '#0F2B46', opacity: 0.8 }}>
          암환자의 질문은 정보 탐색이 아니라 불안 관리 행동입니다.
        </p>
        <p className="text-lg leading-relaxed mb-4" style={{ color: '#0F2B46', opacity: 0.8 }}>
          불안은 치료 단계에 따라 반복적으로 상승합니다.
        </p>
        <p className="text-lg leading-relaxed" style={{ color: '#0F2B46', opacity: 0.8 }}>
          본 리포트는 환자 여정 단계별 실제 질문을 기반으로 각 부서의 개입 전략과 실행 체크리스트를 제시합니다.
        </p>
      </section>

      {/* SECTION 1 - 불안 곡선 구조 시각화 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            불안 곡선 구조 시각화
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#0F2B46' }}>
            치료 여정 단계별 불안 점수 변화
          </h3>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={anxietyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="label" 
                stroke="#0F2B46"
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#0F2B46"
                style={{ fontSize: '12px' }}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #0F2B46',
                  borderRadius: '8px',
                  padding: '8px 12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="anxiety" 
                stroke="#0F2B46" 
                strokeWidth={3}
                dot={{ fill: '#0F2B46', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <p className="text-sm text-center mt-6" style={{ color: '#0F2B46', opacity: 0.6 }}>
            불안은 진단 직후 최고점에 도달하며, 항암 치료 중 점차 감소하다가 퇴원 후와 검사 전 다시 상승합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h4 className="font-bold mb-3" style={{ color: '#0F2B46' }}>핵심 패턴</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#0F2B46', opacity: 0.8 }}>
              <li>• 진단 직후: 정보 과부하로 인한 불안</li>
              <li>• 항암 중: 부작용 관리 불안</li>
              <li>• 퇴원 후: 자가 관리 불안</li>
              <li>• 검사 전: 재발 불안</li>
            </ul>
          </div>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h4 className="font-bold mb-3" style={{ color: '#0F2B46' }}>전략적 시사점</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#0F2B46', opacity: 0.8 }}>
              <li>• 단계별 맞춤 개입 필요</li>
              <li>• 불안 상승 시점 사전 대응</li>
              <li>• 부서간 협업 구조 구축</li>
              <li>• 지속적 모니터링 시스템</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2 - 진단 직후 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            진단 직후 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "이게 말기인가요?"<br />
            "설명을 들었는데 머리에 남지 않습니다."
          </blockquote>
        </div>

        {/* 보이스 해석 */}
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#FAFBFC' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>보이스 해석</h3>
          <div className="space-y-2">
            <p style={{ color: '#0F2B46', opacity: 0.8 }}>• <strong>정보 과부하:</strong> 한 번에 너무 많은 정보를 받아 처리 불가</p>
            <p style={{ color: '#0F2B46', opacity: 0.8 }}>• <strong>방향성 부재:</strong> 다음에 무엇을 해야 할지 모름</p>
          </div>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 상담팀
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>치료 로드맵 1장 제공 (A4 1페이지, 시각화)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>지금 해야 할 행동 3가지 안내 (우선순위 명확화)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>이해도 확인 질문 진행 (환자 자신의 말로 설명하게 함)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>현재 치료 단계 설명</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>종료 기준 설명</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>다음 일정 안내</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 이해도 확인</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 3 - 항암 초기 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            항암 초기 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "이렇게 토하는 게 정상인가요?"<br />
            "탈모가 너무 빠릅니다."
          </blockquote>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 간호팀
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>부작용 정상 범위 카드 제공 (언제 연락해야 하는지 명확히)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>3단계 행동 기준 안내 (경증-중등도-즉시연락)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>일일 불안 점수 기록 (간단한 1-10 스케일)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>부작용 카드 발행</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>행동 기준 설명</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>불안 점수 기록지 제공</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>연락 가능 시간 안내</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 4 - 항암 중반 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            항암 중반 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "계속해야 하나요?"<br />
            "너무 힘들어서 포기하고 싶습니다."
          </blockquote>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 재활·영양팀
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>체력 회복 프로그램 강화 (개인 맞춤 운동 계획)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>주간 피로 점수 기록 (회복 추이 시각화)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>체중·근육량 모니터링 (작은 변화도 긍정 강화)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>개인 운동 계획 작성</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>피로 점수 추적 시작</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>체중 모니터링</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>주간 회복 리뷰</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 5 - 퇴원 직전 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            퇴원 직전 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "집에 가면 잘할 수 있을까요?"
          </blockquote>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 상담팀 + 퇴원교육팀
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>퇴원 준비 교육 (체크리스트 형태로 제공)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>재발 모니터링 안내 (어떤 증상을 관찰해야 하는지)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>응급 기준 재설명 (언제 병원에 연락할지)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>퇴원 교육 자료 제공</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>재발 모니터링 가이드 발행</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>응급 연락처 카드 제공</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 교육 완료 확인</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 6 - 퇴원 직후 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Phone className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            퇴원 직후 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "이 통증이 재발인가요?"<br />
            "이 음식 먹어도 되나요?"
          </blockquote>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 사후관리팀
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>월 1회 상태 점검 전화 (구조화된 질문 스크립트 사용)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>식이·운동 가이드 재교육 (실제 생활 적용 사례 중심)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>불안 점수 추적 지속 (장기 추이 모니터링)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>월간 점검 일정 등록</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>식이·운동 가이드 발송</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>불안 점수 기록 확인</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>질문 응답 로그 기록</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 7 - 추적 검사 전 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            추적 검사 전 단계
          </h2>
        </div>

        {/* 환자보이스 인용 */}
        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-sm font-semibold mb-3 opacity-60" style={{ color: '#0F2B46' }}>환자보이스</h3>
          <blockquote className="text-xl italic leading-relaxed" style={{ color: '#0F2B46' }}>
            "수치가 조금 올랐습니다."<br />
            "검사 전에 잠이 안 옵니다."
          </blockquote>
        </div>

        {/* 담당 부서 */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" 
               style={{ backgroundColor: '#0F2B46', color: 'white' }}>
            담당 부서: 상담팀 + 심리 프로그램
          </div>
        </div>

        {/* 액션플랜 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>액션플랜</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>정상 범위 사전 교육 (수치 변동은 자연스럽다는 점 강조)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>검사 전 심리 상담 (불안 관리 기법 제공)</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>검사 후 설명 예약 (결과 확인 후 바로 상담)</span>
            </li>
          </ul>
        </div>

        {/* 체크리스트 */}
        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>정상 범위 교육 자료 발송</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>심리 상담 예약</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>검사 후 상담 일정 확정</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>불안 관리 기법 안내</span>
            </label>
          </div>
        </div>
      </section>

      {/* 전략 결론 강조 블록 */}
      <section className="py-16 px-6 lg:px-8 my-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-bold leading-relaxed text-white">
            불안을 관리하는 병원이 유지율을 관리합니다.<br />
            2차병원의 경쟁력은 치료가 아니라 안정 구조에 있습니다.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          우리 병원의 불안 관리 구조를 점검해보시겠습니까?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/consultation#consultation-form"
            className="inline-block px-8 py-4 text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#0F2B46' }}
          >
            의료서비스 구조 진단 요청
          </Link>
          <Link
            to="/consultation#consultation-form"
            className="inline-block px-8 py-4 font-semibold transition-all hover:opacity-80"
            style={{ 
              backgroundColor: 'transparent',
              color: '#0F2B46',
              border: '2px solid #0F2B46'
            }}
          >
            PVM 기반 전략 상담 신청
          </Link>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/report/cancer-anxiety-voice-execution" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F2B46' }}>
            최신 인사이트를 이메일로 받아보세요
          </h3>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="이메일 주소"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90" 
                style={{ backgroundColor: '#0F2B46' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? '구독 중...' : '구독'}
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
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200 mt-16">
        <div className="text-center space-y-2">
          <h4 className="font-bold text-lg" style={{ color: '#0F2B46' }}>LS Consulting</h4>
          <p className="text-sm opacity-60" style={{ color: '#0F2B46' }}>
            암 환자 니즈 분석 기반 의료 전략 컨설팅
          </p>
          <div className="text-xs opacity-40 pt-4" style={{ color: '#0F2B46' }}>
            © 2017 LS Consulting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
