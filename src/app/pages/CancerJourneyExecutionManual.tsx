import { Link } from 'react-router';
import { ArrowLeft, CheckSquare, Users, Calendar, Activity, Heart, FileText, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { RelatedReports } from '../components/RelatedReports';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function CancerJourneyExecutionManual() {
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

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="암요양 재활 2차병원 환자여정 실행 매뉴얼 | LS컨설팅"
        description="PVM 데이터 기반 암환자 요양·재활 의료서비스 설계 및 실행 전략 리포트"
        url="https://www.lsconsulting.co.kr/report/cancer-journey-execution-manual"
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
          암환자 요양·재활 2차병원을 위한<br />
          환자여정 기반 이상적 의료서비스 실행 매뉴얼
        </h1>
        
        <p className="text-xl mb-8 leading-relaxed" style={{ color: '#0F2B46', opacity: 0.7 }}>
          PVM 1,190건 데이터 분석을 기반으로<br />
          암환자의 전체 여정을 재설계한 실행 전략 보고서
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
        <p className="text-lg leading-relaxed" style={{ color: '#0F2B46', opacity: 0.8 }}>
          암환자는 치료 자체보다 상태 해석, 부작용 관리, 회복 설계, 퇴원 이후 삶에 대한 안내를 반복적으로 질문합니다.
          따라서 2차병원의 의료서비스는 기능 중심이 아니라 환자여정 중심으로 재설계되어야 합니다.
        </p>
      </section>

      {/* SECTION 1 - 검색·노출 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            검색·노출 단계 실행 매뉴얼
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>목표</h3>
          <p className="text-lg" style={{ color: '#0F2B46', opacity: 0.8 }}>
            환자가 "이 병원은 나를 이해한다"고 느끼도록 합니다.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>실행 액션</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>페르소나 기반 콘텐츠 구조 제작</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>암종별 FAQ 20개 이상 제작</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>부작용 대응 페이지 제작</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>치료 로드맵 다이어그램 제작</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>단계별 정상 범위 설명 콘텐츠 제작</span>
            </li>
          </ul>
        </div>

        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>페르소나 6유형 콘텐츠 제작 완료</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>로드맵 PDF 제작</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 안내 페이지 제작</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 2 - 전화 상담 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Phone className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            전화 상담 단계 실행 매뉴얼
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>목표</h3>
          <p className="text-lg" style={{ color: '#0F2B46', opacity: 0.8 }}>
            불확실성을 줄이고 방문 결정을 돕습니다.
          </p>
        </div>

        <div className="mb-8 p-6 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>3분 구조 상담 구성</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" 
                   style={{ backgroundColor: '#0F2B46' }}>1</div>
              <div>
                <p className="font-semibold" style={{ color: '#0F2B46' }}>1분 현재 상태 확인</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" 
                   style={{ backgroundColor: '#0F2B46' }}>2</div>
              <div>
                <p className="font-semibold" style={{ color: '#0F2B46' }}>1분 병원 역할 설명</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" 
                   style={{ backgroundColor: '#0F2B46' }}>3</div>
              <div>
                <p className="font-semibold" style={{ color: '#0F2B46' }}>1분 방문 목적 정리</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>실행 체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보험 안내 정리</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 질문 기록</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>방문 준비물 안내</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 3 - 내원 상담 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            내원 상담 단계 실행 매뉴얼
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>목표</h3>
          <p className="text-lg" style={{ color: '#0F2B46', opacity: 0.8 }}>
            확신을 제공합니다.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>실행 항목</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>개인화 요약지 제공</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>치료 로드맵 설명</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>부작용 정상 범위 안내</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>다음 방문 일정 명확화</span>
            </li>
          </ul>
        </div>

        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>요약지 발행</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>정상 범위 설명</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>연락 기준 안내</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 4 - 입원 단계 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            입원 단계 실행 매뉴얼
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>목표</h3>
          <p className="text-lg" style={{ color: '#0F2B46', opacity: 0.8 }}>
            회복 구조를 시작합니다.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>실행 항목</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>암종별 회복 가이드 제공</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>일일 증상 체크 시스템 운영</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>불안 점수 기록</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 주 1회 브리핑</span>
            </li>
          </ul>
        </div>

        <div className="p-6 border-2 rounded-lg" style={{ borderColor: '#0F2B46', backgroundColor: '#FAFBFC' }}>
          <h4 className="font-bold mb-4" style={{ color: '#0F2B46' }}>체크리스트</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>증상 체크표 배포</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>주간 회복 평가 진행</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5" style={{ accentColor: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>보호자 브리핑 기록</span>
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 5 - 간호 및 생활 관리 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Heart className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            간호 및 생활 관리 실행 매뉴얼
          </h2>
        </div>

        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: '#F8F9FA' }}>
          <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>목표</h3>
          <p className="text-lg" style={{ color: '#0F2B46', opacity: 0.8 }}>
            관리 가능한 상태를 만듭니다.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>실행 항목</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>부작용 단계별 행동 기준 카드 제작</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>암종별 식이 가이드 제공</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>활동 가능 범위 명확화</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckSquare className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#0F2B46' }} />
              <span style={{ color: '#0F2B46', opacity: 0.8 }}>운동 참여 기록 관리</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 6 - 치료 병행 및 회복 프로그램 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Activity className="w-8 h-8" style={{ color: '#0F2B46' }} />
          <h2 className="text-3xl font-bold" style={{ color: '#0F2B46' }}>
            치료 병행 및 회복 프로그램
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>암종별 회복 클리닉</h3>
            <p style={{ color: '#0F2B46', opacity: 0.7 }}>
              암종별 특성에 맞춘 맞춤형 회복 프로그램 운영
            </p>
          </div>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>영양 재건 프로그램</h3>
            <p style={{ color: '#0F2B46', opacity: 0.7 }}>
              체중 회복 및 영양 균형 관리 시스템
            </p>
          </div>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>근력 회복 프로그램</h3>
            <p style={{ color: '#0F2B46', opacity: 0.7 }}>
              단계별 운동 재활 프로그램 제공
            </p>
          </div>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: '#0F2B46' }}>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2B46' }}>정서 안정 프로그램</h3>
            <p style={{ color: '#0F2B46', opacity: 0.7 }}>
              불안 관리 및 심리 상담 제공
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 - 퇴원 준비 교육 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
          퇴원 준비 교육
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>증상 관리 교육</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              퇴원 후 발생 가능한 증상 관리 방법
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>검사 일정 안내</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              정기 검사 및 추적 관찰 일정 제공
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>보호자 응급 대응 교육</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              응급 상황 판단 기준 및 대처 방법
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>보험 절차 안내</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              보험 청구 및 행정 절차 가이드
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8 - 퇴원 후 관리 시스템 */}
      <section className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
          퇴원 후 관리 시스템
        </h2>

        <div className="space-y-4">
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>월간 전화 점검</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              정기적인 상태 확인 및 상담 제공
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>3개월 회복 리뷰</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              회복 단계별 평가 및 피드백
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>재발 불안 상담</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              심리적 불안 관리 및 전문 상담 연결
            </p>
          </div>
          <div className="p-5 rounded-lg border-l-4" style={{ backgroundColor: '#F8F9FA', borderColor: '#0F2B46' }}>
            <h3 className="font-bold mb-2" style={{ color: '#0F2B46' }}>건강 유지 프로그램 안내</h3>
            <p className="text-sm" style={{ color: '#0F2B46', opacity: 0.7 }}>
              장기적 건강 관리 프로그램 연결
            </p>
          </div>
        </div>
      </section>

      {/* 전략 결론 강조 블록 */}
      <section className="py-16 px-6 lg:px-8 my-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[960px] mx-auto text-center">
          <p className="text-2xl lg:text-3xl font-bold leading-relaxed text-white">
            암환자는 치료 기술을 선택하지 않습니다.<br />
            삶의 건강을 설계해주는 병원을 선택합니다.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          우리 병원의 환자여정을 재설계하고 싶으십니까?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/consultation#consultation-form"
            className="inline-block px-8 py-4 text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#0F2B46' }}
          >
            의료서비스 진단 요청
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
      <RelatedReports currentReportLink="/report/cancer-journey-execution-manual" />

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
