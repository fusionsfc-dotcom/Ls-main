import { Link } from 'react-router';
import { ArrowRight, Lightbulb, Zap, Settings, Users, Building, Target, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { OurClients } from '../components/OurClients';
import { SEO } from '../components/SEO';
import integratedModelImage from "figma:asset/eb688a884e7ee868dcb2c81b420a009ed9f29c6e.png";

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="LS컨설팅 - 병원을 전략적 조직으로 만드는 통합 파트너"
        description="Strategy + Execution + System. 개원부터 성장까지, 병원을 구조적으로 설계합니다."
        url="https://www.lsconsulting.co.kr"
      />
      
      {/* SECTION 1 - HERO */}
      <section className="pt-40 pb-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h1 
              className="text-5xl lg:text-7xl leading-tight mb-12 tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              최고의 의료서비스를 만드는 것은<br />
              환자의 니즈 분석에서 시작합니다
            </h1>
            
            <div className="flex justify-center">
              <Link
                to="/consultation"
                className="inline-flex items-center space-x-2 px-8 py-4 text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                <span>병원 전략 진단 받기</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - 병원장의 현실 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-4xl lg:text-5xl leading-tight mb-16 tracking-tight text-center"
              style={{ color: 'var(--navy-900)' }}
            >
              많은 병원이 이런 상태에 놓여 있습니다
            </h2>
            
            <div className="space-y-6 text-xl leading-relaxed mb-12" style={{ color: 'var(--navy-900)' }}>
              <div className="p-6 bg-white border-l-4" style={{ borderColor: 'var(--navy-900)' }}>
                <p className="opacity-70">입원 환자가 줄고 있다</p>
              </div>
              <div className="p-6 bg-white border-l-4" style={{ borderColor: 'var(--navy-900)' }}>
                <p className="opacity-70">직원이 늘었지만 조직은 강해지지 않았다</p>
              </div>
              <div className="p-6 bg-white border-l-4" style={{ borderColor: 'var(--navy-900)' }}>
                <p className="opacity-70">블로그와 영상은 있지만 방향이 없다</p>
              </div>
              <div className="p-6 bg-white border-l-4" style={{ borderColor: 'var(--navy-900)' }}>
                <p className="opacity-70">병원의 철학이 내부에서 공유되지 않는다</p>
              </div>
            </div>
            
            <p className="text-3xl tracking-tight text-center mt-16" style={{ color: 'var(--navy-900)' }}>
              문제는 광고가 아니라<br />
              <strong>병원의 조직문화와 시스템입니다</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - LS컨설팅의 역할 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              병원의 발전과 환자의 회복을 만듭니다
            </h2>
            <p className="text-xl opacity-60" style={{ color: 'var(--navy-900)' }}>
              단순히 노출만을 위한 광고는 하지 않습니다
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Strategy */}
            <div className="text-center space-y-6 p-8">
              <div className="w-20 h-20 mx-auto flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold" style={{ color: 'var(--navy-900)' }}>
                Strategy
              </h3>
              <p className="text-lg opacity-70" style={{ color: 'var(--navy-900)' }}>
                병원의 포지션과 비전을<br />정의합니다.
              </p>
            </div>
            
            {/* Execution */}
            <div className="text-center space-y-6 p-8">
              <div className="w-20 h-20 mx-auto flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold" style={{ color: 'var(--navy-900)' }}>
                Execution
              </h3>
              <p className="text-lg opacity-70" style={{ color: 'var(--navy-900)' }}>
                블로그·유튜브·트렌드리포트·<br />ActionPlan을 실행합니다.
              </p>
            </div>
            
            {/* System */}
            <div className="text-center space-y-6 p-8">
              <div className="w-20 h-20 mx-auto flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold" style={{ color: 'var(--navy-900)' }}>
                System
              </h3>
              <p className="text-lg opacity-70" style={{ color: 'var(--navy-900)' }}>
                병원을 개인 역량이 아닌<br />구조로 운영하도록 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - PVM (경영 의사결정 도구) */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl leading-tight mb-12 tracking-tight text-white">
              환자를 이해하는 것이<br />의료서비스의 시작입니다
            </h2>
            
            <div className="text-xl leading-relaxed text-white opacity-80 mb-12 text-left max-w-3xl mx-auto">
              <p className="mb-6">
                PVM은 암환자의 질문과 행동 패턴을 분석하여<br />
                병원이 준비해야 할 서비스 방향을 제시합니다.
              </p>
              <p>
                이것은 단순한 환자 데이터가 아닙니다.<br />
                <strong className="text-white">경영 의사결정 도구입니다.</strong>
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-white">15년+</div>
                <div className="text-lg text-white opacity-70">누적 데이터 기간</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-white">8,000건+</div>
                <div className="text-lg text-white opacity-70">월 평균 분석 데이터</div>
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-white">10개+</div>
                <div className="text-lg text-white opacity-70">주요 암종 분석</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - 개원 준비 의사를 위한 섹션 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              개원을 준비하고 계십니까?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-white p-8 space-y-4">
              <Building className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>입지 분석</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                데이터 기반 상권 및 경쟁 환경 분석
              </p>
            </div>
            
            <div className="bg-white p-8 space-y-4">
              <Target className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>병원 포지셔닝 설계</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                차별화된 병원 아이덴티티 구축
              </p>
            </div>
            
            <div className="bg-white p-8 space-y-4">
              <Users className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>서비스 모델 설계</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                환자 니즈 기반 서비스 프로세스 정립
              </p>
            </div>
            
            <div className="bg-white p-8 space-y-4">
              <TrendingUp className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>초기 홍보 전략</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                개원 전후 통합 마케팅 전략 수립
              </p>
            </div>
            
            <div className="bg-white p-8 space-y-4">
              <Settings className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>운영 구조 설계</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                시스템 기반 병원 운영 체계 구축
              </p>
            </div>
            
            <div className="bg-white p-8 space-y-4">
              <CheckCircle className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>1년 생존 전략</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                개원 후 안정화를 위한 실행 로드맵
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - 운영 병원장을 위한 섹션 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              이미 운영 중이라면
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>병원 현황 진단</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                데이터 기반 현재 위치 파악 및 문제점 도출
              </p>
            </div>
            
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>환자 이탈 원인 분석</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                입원율 감소 원인 규명 및 개선 방향 제시
              </p>
            </div>
            
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>서비스 차별화 전략</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                경쟁 병원과 차별화된 포지셔닝 재정립
              </p>
            </div>
            
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>홍보 구조 재설계</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                소모적 홍보에서 전략적 브랜딩으로 전환
              </p>
            </div>
            
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>조직 시스템화</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                개인 역량 의존에서 구조 기반 운영으로
              </p>
            </div>
            
            <div className="border-2 p-8 space-y-4" style={{ borderColor: 'var(--navy-900)' }}>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>방향 재정립</h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                병원의 철학과 비전을 내부에 공유
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - 경험과 신뢰 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl leading-tight mb-6 tracking-tight"
              style={{ color: 'var(--navy-900)' }}
            >
              정부기관 및 대기업의 홍보기획과<br />
              2차 암병원의 1세대 모델을 기획했습니다
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <Award className="w-16 h-16 mx-auto" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                대기업 광고기획
              </h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                전략적 브랜딩과 캠페인 실행 경험
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <Award className="w-16 h-16 mx-auto" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                정부 정책 기획
              </h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                공공 영역 전략 수립 및 실행
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <Award className="w-16 h-16 mx-auto" style={{ color: 'var(--navy-900)' }} />
              <h3 className="text-2xl font-bold" style={{ color: 'var(--navy-900)' }}>
                15년 암요양·재활<br />병원 컨설팅
              </h3>
              <p className="opacity-70" style={{ color: 'var(--navy-900)' }}>
                의료 현장에 대한 깊은 이해
              </p>
            </div>
          </div>
          
          <div className="text-center mt-20">
            <Link
              to="/consultation"
              className="inline-flex items-center space-x-2 px-10 py-5 text-lg text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              <span>전략 상담 신청하기</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <OurClients />
    </div>
  );
}