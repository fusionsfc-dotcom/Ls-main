import { Check, ArrowRight, Code, Globe, Building2 } from 'lucide-react';
import { Link } from 'react-router';

export function PricingSection() {
  return (
    <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 
            className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            Service & Pricing
          </h2>
          <p className="text-xl opacity-70 max-w-3xl mx-auto" style={{ color: 'var(--navy-900)' }}>
            병원의 상황과 목표에 맞는 최적의 플랜을 선택하세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* CARD 1 - BASIC */}
          <div className="bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ borderColor: '#EAEAEA' }}>
            <div className="flex-1">
              <h3 className="text-2xl mb-4" style={{ color: 'var(--navy-900)' }}>
                Basic<br />Execution Plan
              </h3>
              
              <div className="mb-8">
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                  ₩1,500,000
                </div>
                <div className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                  / month (VAT 별도)
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 10건 블로그 포스팅</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 10건 유튜브 쇼츠</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 1회 암 환자 트렌드 리포트</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
                콘텐츠를 시작하려는 병원을 위한<br />
                전략 기반 실행 패키지
              </p>
            </div>

            <Link
              to="/consultation#consultation-form"
              className="inline-block px-6 py-3 text-center transition-all hover:opacity-80"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--navy-900)',
                border: '2px solid var(--navy-900)'
              }}
            >
              상담 신청
            </Link>
          </div>

          {/* CARD 2 - STANDARD (추천) */}
          <div className="bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl flex flex-col relative" style={{ borderColor: 'var(--navy-900)' }}>
            {/* Most Selected Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                Most Selected
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl mb-4" style={{ color: 'var(--navy-900)' }}>
                Strategic<br />Growth Plan
              </h3>
              
              <div className="mb-8">
                <div className="text-3xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                  ₩3,000,000
                </div>
                <div className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                  / month (VAT 별도)
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 20건 블로그 포스팅</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 20건 유튜브 쇼츠</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>월 2회 암 환자 트렌드 리포트</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>주 3회 임직원 Action Plan</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>주 1회 의료서비스 강화 KPI 모델 설계</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
                전략과 실행을 통합해<br />
                병원을 시스템으로 전환하는 플랜
              </p>
            </div>

            <Link
              to="/consultation#consultation-form"
              className="inline-block px-6 py-3 text-center text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              상담 신청
            </Link>
          </div>

          {/* CARD 3 - SYSTEM DEVELOPMENT */}
          <div className="bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ borderColor: '#EAEAEA' }}>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-6 h-6" style={{ color: 'var(--navy-900)' }} />
                <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                  Operational<br />System
                </h3>
              </div>
              
              <div className="mb-8">
                <div className="text-sm opacity-60 mb-2" style={{ color: 'var(--navy-900)' }}>
                  단일 프로그램 개발
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                  ₩1,000,000 ~
                </div>
                <div className="text-xs opacity-60" style={{ color: 'var(--navy-900)' }}>
                  (유지보수 및 호스팅비 월 약 1만원 이하 별도)
                </div>
              </div>

              <div className="mb-4 text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>
                개발 예시:
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>재고관리 시스템</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>치료 스케줄 관리</span>
                </div>
                <div className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-60" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>환자 관리 프로그램</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
                직원의 역량을 키우고<br />
                시스템이 운영을 고도화 합니다
              </p>
            </div>

            <Link
              to="/consultation#consultation-form"
              className="inline-block px-6 py-3 text-center transition-all hover:opacity-80"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--navy-900)',
                border: '2px solid var(--navy-900)'
              }}
            >
              상담 신청
            </Link>
          </div>

          {/* CARD 4 - WEBSITE DEVELOPMENT */}
          <div className="bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ borderColor: '#EAEAEA' }}>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6" style={{ color: 'var(--navy-900)' }} />
                <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                  Website<br />Development
                </h3>
              </div>
              
              <div className="mb-8">
                <div className="text-sm opacity-60 mb-2" style={{ color: 'var(--navy-900)' }}>
                  기획 + 디자인 포함
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                  ₩3,000,000 ~
                </div>
                <div className="text-xs opacity-60" style={{ color: 'var(--navy-900)' }}>
                  (호스팅비 별도)
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>전략 기반 구조 설계</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>포지셔닝 반영 UI</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>환자 여정 중심 콘텐츠 설계</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>상담 전환 구조 설계</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
                홈페이지는 브로셔가 아닙니다<br />
                전략적 자산입니다
              </p>
            </div>

            <Link
              to="/consultation#consultation-form"
              className="inline-block px-6 py-3 text-center transition-all hover:opacity-80"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--navy-900)',
                border: '2px solid var(--navy-900)'
              }}
            >
              상담 신청
            </Link>
          </div>

          {/* CARD 5 - HOSPITAL OPENING CONSULTING */}
          <div className="bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl flex flex-col" style={{ borderColor: '#EAEAEA' }}>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6" style={{ color: 'var(--navy-900)' }} />
                <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                  Hospital<br />Opening
                </h3>
              </div>
              
              <div className="mb-8">
                <div className="text-sm opacity-60 mb-2" style={{ color: 'var(--navy-900)' }}>
                  병원개원 컨설팅
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>
                  ₩30,000,000 ~
                </div>
                <div className="text-xs opacity-60" style={{ color: 'var(--navy-900)' }}>
                  (VAT 별도)
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>입지 및 상권 분석</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>병원 포지셔닝 설계</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>서비스 모델 설계</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>초기 홍보 전략</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                  <span className="text-sm" style={{ color: 'var(--navy-900)' }}>운영 구조 설계</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
                개원부터 성장까지<br />
                병원을 구조적으로 설계합니다
              </p>
            </div>

            <Link
              to="/consultation#consultation-form"
              className="inline-block px-6 py-3 text-center transition-all hover:opacity-80"
              style={{ 
                backgroundColor: 'transparent',
                color: 'var(--navy-900)',
                border: '2px solid var(--navy-900)'
              }}
            >
              상담 신청
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}