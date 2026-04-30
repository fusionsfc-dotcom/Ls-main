import React from 'react';
import { Link, useLocation } from 'react-router';
import { CancerInsightIndex } from './CancerInsightIndex';
import { PricingSection } from './PricingSection';

interface FooterProps {
  hidePricing?: boolean;
}

const footerSections = [
  {
    title: '서비스',
    links: [
      { label: 'AI 시장 진단', path: '/services#diagnosis' },
      { label: 'AI 업무 자동화', path: '/services#automation' },
      { label: 'AI 웹·앱 구축', path: '/services#webapp' },
      { label: '맞춤 SaaS 개발', path: '/services#saas' },
      { label: 'AI 전략 컨설팅', path: '/services#consulting' },
    ],
  },
  {
    title: '대상별 안내',
    links: [
      { label: '의료분야', path: '/healthcare' },
      { label: '기업분야', path: '/business' },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '회사 소개', path: '/about' },
      { label: '연혁', path: '/about#history' },
      { label: '찾아오시는 길', path: '/about#location' },
      { label: '상담/견적 신청', path: '/consultation' },
    ],
  },
] as const;

const contactInfo = {
  email: 'fusionsfc@gmail.com',
  phone: '010-9297-0940',
  location: '제주 / 서울',
};

export function Footer({ hidePricing = false }: FooterProps) {
  const { pathname } = useLocation();
  const showCancerInsightIndex =
    pathname !== '/' &&
    pathname !== '/services' &&
    pathname !== '/business' &&
    pathname !== '/about' &&
    pathname !== '/consultation';

  return (
    <>
      {showCancerInsightIndex && <CancerInsightIndex />}
      {!hidePricing && <PricingSection />}

      <footer style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-20">

          {/* 상단: 브랜드 */}
          <div className="mb-14">
            <p className="text-2xl font-bold text-white mb-3">LS컨설팅</p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--navy-300)' }}>
              의료에서 검증된 AI 실행력으로
              <br />
              병원·기업·기관의 디지털 전환을 함께합니다
            </p>
          </div>

          {/* 구분선 */}
          <div className="border-t mb-14" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* 4컬럼 링크 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--navy-300)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 연락처 컬럼 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">연락처</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'var(--navy-300)' }}
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactInfo.phone.replace(/-/g, '')}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: 'var(--navy-300)' }}
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="text-sm" style={{ color: 'var(--navy-300)' }}>{contactInfo.location}</li>
              </ul>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © LS Consulting
              </p>
              <div className="flex gap-5">
                <Link
                  to="/terms"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  이용약관
                </Link>
                <Link
                  to="/privacy"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
