import { Link } from 'react-router';
import { CancerInsightIndex } from './CancerInsightIndex';
import { PricingSection } from './PricingSection';

interface FooterProps {
  hidePricing?: boolean;
}

export function Footer({ hidePricing = false }: FooterProps) {
  return (
    <>
      {/* 암 환자 체감지수 섹션 */}
      <CancerInsightIndex />
      
      {/* Pricing Section - 환자전용 페이지에서는 숨김 */}
      {!hidePricing && <PricingSection />}
      
      {/* 기존 Footer */}
      <footer className="border-t" style={{ backgroundColor: 'var(--navy-900)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Left Section - Brand */}
            <div>
              <h3 className="text-xl mb-4 text-white">
                LS Consulting
              </h3>
              <p className="text-sm leading-relaxed text-white opacity-60">
                암 환자 니즈 분석을 기반으로<br />
                의료서비스 설계와 전략적 실행을<br />
                통합 제공하는 전문 컨설팅 회사
              </p>
            </div>
            
            {/* Middle Section - Services */}
            <div>
              <h4 className="text-sm mb-4 text-white opacity-60">
                메뉴
              </h4>
              <nav className="space-y-2">
                <Link 
                  to="/experience" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  소개
                </Link>
                <Link 
                  to="/strategy" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  노하우
                </Link>
                <Link 
                  to="/execution" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  서비스
                </Link>
                <Link 
                  to="/insights" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  리포트
                </Link>
                <Link 
                  to="/patients" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  환자전용
                </Link>
                <Link 
                  to="/consultation" 
                  className="block text-sm text-white opacity-60 hover:opacity-100 transition-opacity"
                >
                  의뢰하기
                </Link>
              </nav>
            </div>
            
            {/* Right Section - Contact */}
            <div>
              <h4 className="text-sm mb-4 text-white opacity-60">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-white opacity-60">
                <p>이메일: fusionsfc@gmail.com</p>
                <p>전화: 010-9297-0940</p>
                <p>서울특별시, 제주특별자치도</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright */}
          <div className="pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <p className="text-xs text-white opacity-40">
              © 2017 LS Consulting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}