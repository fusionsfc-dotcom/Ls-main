import { Building2, Heart, Award, TrendingUp } from 'lucide-react';
import { OurClients } from '../components/OurClients';

export function Experience() {
  const topImageUrl =
    'https://srlyxadncjladllbwmdk.supabase.co/storage/v1/object/public/img/top_1.jpeg';

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-sm tracking-widest opacity-60" style={{ color: 'var(--navy-900)' }}>
            EXPERIENCE
          </div>
          <h1 
            className="text-5xl lg:text-7xl leading-tight tracking-tight max-w-4xl"
            style={{ color: 'var(--navy-900)' }}
          >
            프로젝트의 성공을 위해<br />
            깊은 경험에 AI 기술까지
          </h1>
        </div>
      </section>

      {/* Image Section */}
      <section className="px-8 lg:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative h-[500px] w-full">
            <img
              src={topImageUrl}
              alt="Professional team presenting data analysis"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 - CORPORATE & GOVERNMENT STRATEGY */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <Building2 className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              </div>
              <h2 
                className="text-4xl lg:text-5xl leading-tight mb-8 tracking-tight"
                style={{ color: 'var(--navy-900)' }}
              >
                대기업·정부<br />
                전략 기획 경험
              </h2>
              <p className="text-xl leading-relaxed opacity-70 mb-12" style={{ color: 'var(--navy-900)' }}>
                우리는 구조를 설계하는 법을<br />
                배웠습니다.
              </p>
              
              {/* 주요 프로젝트 */}
              <div className="mb-12 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                <h3 className="text-lg mb-4 opacity-60" style={{ color: 'var(--navy-900)' }}>주요 프로젝트</h3>
                <ul className="space-y-2 text-base" style={{ color: 'var(--navy-900)' }}>
                  <li>• 삼성, LG, KT, 사우디아람코</li>
                  <li>• 청와대·행정안전부·보건복지부</li>
                  <li>• 대국민 캠페인 기획</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>전략 컨설팅 방법론</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  대기업과 정부기관에서 배운 체계적인 전략 수립 프레임워크를 의료 분야에 적용합니다.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>데이터 기반 의사결정</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  직관이 아닌 데이터와 분석을 통해 전략을 수립하고 실행하는 방식을 이해합니다.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>조직 정렬 및 실행</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  전략이 실제로 조직 내에서 실행되기 위한 프로세스와 커뮤니케이션 구조를 설계합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - 15 YEARS IN CANCER CARE */}
      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>개원 기획부터 운영까지</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  암 환자 요양·재활 병원을 직접 기획하고 개원하며 의료서비스의 전 과정을 경험했습니다.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>환자와 보호자의 실제 니즈</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  15년간 수천 명의 암 환자와 보호자를 만나며 그들의 진짜 고민과 필요를 이해했습니다.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>의료 마케팅의 현실</h3>
                <p className="text-lg leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                  병원 홍보와 마케팅을 직접 수행하며 무엇이 효과적이고 무엇이 낭비인지 체득했습니다.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center space-x-4 mb-8">
                <Heart className="w-12 h-12" style={{ color: 'var(--navy-900)' }} />
              </div>
              <h2 
                className="text-4xl lg:text-5xl leading-tight mb-8 tracking-tight"
                style={{ color: 'var(--navy-900)' }}
              >
                암 환자 요양·재활<br />
                병원 경험 15년
              </h2>
              <p className="text-xl leading-relaxed opacity-70" style={{ color: 'var(--navy-900)' }}>
                Founder의 경험은<br />
                LS컨설팅의 방법론이 되었습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl leading-tight mb-12 text-white max-w-4xl mx-auto">
            전략 컨설팅의 방법론과<br />
            암 환자 케어의 현장 경험이<br />
            하나로 통합되었습니다.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12 mt-20 max-w-5xl mx-auto">
            <div className="space-y-4">
              <Award className="w-12 h-12 text-white mx-auto opacity-60" />
              <h3 className="text-xl text-white">체계적 방법론</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                대기업 전략 컨설팅 프레임워크
              </p>
            </div>
            
            <div className="space-y-4">
              <Heart className="w-12 h-12 text-white mx-auto opacity-60" />
              <h3 className="text-xl text-white">현장 이해</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                15년간의 암 환자 케어 경험
              </p>
            </div>
            
            <div className="space-y-4">
              <TrendingUp className="w-12 h-12 text-white mx-auto opacity-60" />
              <h3 className="text-xl text-white">데이터 인사이트</h3>
              <p className="text-sm text-white opacity-60 leading-relaxed">
                국내 최대 암 환자 니즈 분석
              </p>
            </div>
          </div>
        </div>
      </section>

      <OurClients />
    </div>
  );
}