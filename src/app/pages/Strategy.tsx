import { Target, Users, MessageSquare, BarChart3, ArrowRight, Search, UserCheck, Activity, RefreshCw, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { OurClients } from '../components/OurClients';
import { Link } from 'react-router';

const topImageUrl =
  'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/top_2.jpeg';

export function Strategy() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-sm tracking-widest opacity-60" style={{ color: 'var(--navy-900)' }}>
            STRATEGY
          </div>
          <h1 
            className="text-5xl lg:text-7xl leading-tight tracking-tight max-w-4xl"
            style={{ color: 'var(--navy-900)' }}
          >
            완벽한 의료서비스는<br />
            환자 데이터에서 시작하는 시스템입니다
          </h1>
          <p className="text-xl lg:text-2xl mt-8 max-w-3xl leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
            LS컨설팅은 국내 최대 암 환자 니즈 분석 DB(PVM™)를 기반으로<br />
            병원의 의료서비스·조직·운영 구조를 재설계합니다.
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-8 lg:px-16 pb-32" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[500px] w-full">
            <img
              src={topImageUrl}
              alt="Healthcare team strategy meeting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 - SERVICE ARCHITECTURE */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-4xl lg:text-5xl mb-20 tracking-tight max-w-3xl"
            style={{ color: 'var(--navy-900)' }}
          >
            Service Architecture
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                    환자 기대 분석
                  </h3>
                </div>
                <p className="text-lg leading-relaxed opacity-70 pl-16" style={{ color: 'var(--navy-900)' }}>
                  PVM™ 환자 니즈 DB를 기반으로<br />
                  질환·치료 단계·증상별 환자 결핍을 도출합니다.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                    프로그램 구조 설계
                  </h3>
                </div>
                <p className="text-lg leading-relaxed opacity-70 pl-16" style={{ color: 'var(--navy-900)' }}>
                  데이터로 검증된 환자 요구를 기반으로<br />
                  진료·상담·교육·재활 프로그램을 표준화합니다.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                    상담 전환 구조 설계
                  </h3>
                </div>
                <p className="text-lg leading-relaxed opacity-70 pl-16" style={{ color: 'var(--navy-900)' }}>
                  환자가 실제 검색하고 질문하는 키워드를 반영해<br />
                  온라인 → 상담 → 입원 전환 구조를 설계합니다.
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--navy-900)' }}>
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                    KPI 기반 운영 구조
                  </h3>
                </div>
                <p className="text-lg leading-relaxed opacity-70 pl-16" style={{ color: 'var(--navy-900)' }}>
                  감이 아닌 데이터로 핵심 지표를 정의하고<br />
                  월 단위 개선 구조(Action Plan + 리포트)를 설계합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Execution 연결 버튼 영역 */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl mb-8" style={{ color: 'var(--navy-900)' }}>
              적용 서비스 보기
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/execution" 
                className="px-6 py-3 rounded-lg border-2 transition-all hover:bg-opacity-10 text-base"
                style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
              >
                블로그 전략
              </Link>
              <Link 
                to="/execution" 
                className="px-6 py-3 rounded-lg border-2 transition-all hover:bg-opacity-10 text-base"
                style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
              >
                유튜브 쇼츠
              </Link>
              <Link 
                to="/execution" 
                className="px-6 py-3 rounded-lg border-2 transition-all hover:bg-opacity-10 text-base"
                style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
              >
                월간 암환자 트렌드 리포트
              </Link>
              <Link 
                to="/execution" 
                className="px-6 py-3 rounded-lg border-2 transition-all hover:bg-opacity-10 text-base"
                style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
              >
                임직원 ActionPlan
              </Link>
              <Link 
                to="/execution" 
                className="px-6 py-3 rounded-lg border-2 transition-all hover:bg-opacity-10 text-base"
                style={{ borderColor: 'var(--navy-900)', color: 'var(--navy-900)' }}
              >
                KPI 모델 설계
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey Section - PVM 기반 환자 여정 재설계 모델 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-12 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            PVM 기반 환자 여정 재설계 모델
          </h2>
          
          <p className="text-lg mb-20 opacity-70 max-w-3xl" style={{ color: 'var(--navy-900)' }}>
            각 단계마다 환자 실제 행동 → PVM 분석 결과 → 병원 적용 전략으로 구성됩니다
          </p>

          {/* Step 1: 정보 탐색 */}
          <div className="mb-16 pb-16 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-2xl lg:text-3xl" style={{ color: 'var(--navy-900)' }}>
                1. 정보 탐색
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pl-16">
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>환자 행동</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  항암 부작용, 재활, 요양병원 비용 검색
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>PVM 분석</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  3~4회차 항암 환자 불안 키워드 급증<br />
                  "요양병원 선택 기준" 반복 질문
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>병원 적용</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  리서치 기반 블로그 월 20건 제작<br />
                  유튜브 쇼츠 Q&A 제작<br />
                  트렌드 리포트 반영
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: 첫 상담 */}
          <div className="mb-16 pb-16 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl lg:text-3xl" style={{ color: 'var(--navy-900)' }}>
                2. 첫 상담
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pl-16">
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>환자 니즈</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  의료 정보보다 "안심"을 원함
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>PVM 분석</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  상담 후 '설명 부족' 리뷰 빈도 분석
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>병원 적용</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  상담 스크립트 표준화<br />
                  상담 KPI 설계<br />
                  주 3회 임직원 Action Plan
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: 치료 진행 */}
          <div className="mb-16 pb-16 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl lg:text-3xl" style={{ color: 'var(--navy-900)' }}>
                3. 치료 진행
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pl-16">
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>환자 심리</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  중도 이탈 위험 구간 존재
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>PVM 분석</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  식단·운동·심리 불안 질문 증가
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>병원 적용</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  맞춤 프로그램 설계<br />
                  콘텐츠 자동 발송<br />
                  운영 리포트 기반 개선
                </p>
              </div>
            </div>
          </div>

          {/* Step 4: 반복 상담 */}
          <div className="mb-16 pb-16 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-2xl lg:text-3xl" style={{ color: 'var(--navy-900)' }}>
                4. 반복 상담
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pl-16">
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>환자 감정 변화</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  불안 → 확인 행동 반복
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>PVM 분석</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  감정 변화 패턴 추적
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>병원 적용</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  데이터 기반 신뢰 유지 구조 설계
                </p>
              </div>
            </div>
          </div>

          {/* Step 5: 재방문 */}
          <div className="mb-16">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl lg:text-3xl" style={{ color: 'var(--navy-900)' }}>
                5. 재방문
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pl-16">
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>경험 데이터</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  누적된 환자 경험 구조화
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>PVM 분석</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  브랜드 신뢰 요인 분석
                </p>
              </div>
              <div>
                <div className="text-sm mb-2 font-bold opacity-60" style={{ color: 'var(--navy-900)' }}>병원 적용</div>
                <p className="text-base leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                  경험 데이터 기반 브랜드 구축<br />
                  콘텐츠·서비스 일관성 강화
                </p>
              </div>
            </div>
          </div>

          {/* 하단 강조 문구 */}
          <div className="mt-20 p-12 rounded-xl text-center" style={{ backgroundColor: 'var(--navy-50)' }}>
            <p className="text-2xl lg:text-3xl leading-relaxed font-medium" style={{ color: 'var(--navy-900)' }}>
              우리는 환자 여정을 설명하지 않습니다.<br />
              <strong>환자 니즈 데이터로 병원 운영 구조를 재설계합니다.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 - ORGANIZATIONAL ALIGNMENT */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-4xl lg:text-5xl mb-16 tracking-tight max-w-4xl"
            style={{ color: 'var(--navy-900)' }}
          >
            조직이 하나의 방향으로<br />
            움직이도록 설계합니다.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 mt-20">
            <div className="space-y-6">
              <div className="w-16 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                포지셔닝 정의
              </h3>
              <p className="text-lg leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                병원만의 차별화된 가치와 시장 내 위치를 명확하게 설정합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                메시지 통합
              </h3>
              <p className="text-lg leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                모든 접점에서 일관된 브랜드 경험을 제공할 수 있도록 메시지를 통합합니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="w-16 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-2xl" style={{ color: 'var(--navy-900)' }}>
                서비스 표준화
              </h3>
              <p className="text-lg leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                개인 역량에 의존하지 않는 체계적인 서비스 프로세스를 구축합니다.
              </p>
            </div>
          </div>

          {/* 실행 연결 섹션 */}
          <div className="mt-20 p-10 rounded-xl" style={{ backgroundColor: 'white' }}>
            <p className="text-xl lg:text-2xl mb-8 font-medium text-center" style={{ color: 'var(--navy-900)' }}>
              이 구조는 단순한 전략 문서가 아니라<br />
              <strong>월 단위 실행 시스템으로 연결됩니다</strong>
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--navy-50)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--navy-900)' }}>월 1~2회</h4>
                <p className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>암환자 트렌드 리포트</p>
              </div>
              
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--navy-50)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--navy-900)' }}>주 3회</h4>
                <p className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>임직원 Action Plan</p>
              </div>
              
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--navy-50)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--navy-900)' }}>상시 운영</h4>
                <p className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>KPI 모델 운영 구조</p>
              </div>
              
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--navy-50)' }}>
                <h4 className="font-bold mb-2" style={{ color: 'var(--navy-900)' }}>자동화</h4>
                <p className="text-sm opacity-70" style={{ color: 'var(--navy-900)' }}>콘텐츠 전략 자동화</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-3xl lg:text-5xl leading-tight text-white max-w-4xl mx-auto">
            "데이터 없는 전략은 추측일 뿐입니다.<br />
            데이터 기반 전략만이 성장을 만듭니다."
          </p>
        </div>
      </section>

      {/* Our Clients Section */}
      <OurClients />
    </div>
  );
}