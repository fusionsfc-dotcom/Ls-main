import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';
import reportBody from '../../../data/reports/breastCancerCommunity202604Html';

const NAVY_900 = '#0F2B46';

const title = "유방암 환자의 88%는 '불안'하지만 경험공유로 서로를 치료한다";
const description =
  '2026년 4월 1주 유방암 커뮤니티 200건 심층분석. 네이버 카페 암 환자 커뮤니티 기반 PVM 인사이트 리포트(Executive Summary, 데이터 시각화, 부서별 실행 초점, 니즈 TOP5).';

export function BreastCancerCommunityReport202604() {
  const canonical = 'https://www.lsconsulting.co.kr/reports/breast-cancer-community-2026-04-w1';
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (el && reportBody) {
      el.innerHTML = reportBody;
    }
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <SEO title={`${title} | LS컨설팅`} description={description} url={canonical} />

      <header
        className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b"
        style={{ borderColor: '#EAEAEA' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70"
            style={{ color: NAVY_900 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto overflow-x-auto pb-16 px-0 sm:px-4">
        <div
          ref={containerRef}
          className="shadow-sm border border-gray-100 sm:rounded-lg min-w-0 w-full bg-white"
          aria-label="리포트 본문"
        />
      </div>
    </div>
  );
}
