import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { insightsData } from '../data/insightsData';
import { PvmIntroSection } from '../components/PvmIntroSection';
import { SEO } from '../components/SEO';
import { GuardedReportLink } from '../components/auth/GuardedReportLink';

export function Insights() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const reportsListRef = useRef<HTMLElement>(null);

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
        setEmail(''); // 폼 초기화
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

  const insights = insightsData;

  // 페이지네이션 계산
  const totalPages = Math.ceil(insights.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInsights = insights.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    if (reportsListRef.current) {
      reportsListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* PVM Introduction Section */}
      <PvmIntroSection />

      {/* Insights List */}
      <section ref={reportsListRef} className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            Latest Reports & Insights
          </h2>
          <div className="grid gap-6">
            {currentInsights.map((insight) => {
              const isFeaturedPost = insight.isFeatured;
              
              return (
                <GuardedReportLink
                  key={insight.link}
                  to={insight.link}
                  className="group cursor-pointer block"
                >
                  <div 
                    className={`p-7 rounded-xl border transition-all duration-300 ${
                      isFeaturedPost 
                        ? 'bg-white border-2 hover:shadow-lg' 
                        : 'bg-white border hover:shadow-md'
                    }`}
                    style={{ 
                      borderColor: isFeaturedPost ? '#0F2B46' : '#EAEAEA' 
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs text-white"
                        style={{ backgroundColor: '#0F2B46' }}
                      >
                        {insight.category}
                      </div>
                      {isFeaturedPost && (
                        <div 
                          className="inline-block px-3 py-1 rounded-full text-xs"
                          style={{ backgroundColor: '#FFF3CD', color: '#856404' }}
                        >
                          FEATURED
                        </div>
                      )}
                    </div>
                    
                    <h3 
                      className="text-2xl lg:text-3xl mb-4 group-hover:opacity-70 transition-opacity leading-tight whitespace-pre-line"
                      style={{ color: 'var(--navy-900)' }}
                    >
                      {insight.title}
                    </h3>
                    
                    <p 
                      className="text-base leading-relaxed opacity-60 mb-6"
                      style={{ color: 'var(--navy-900)' }}
                    >
                      {insight.excerpt}
                    </p>
                    
                    {insight.highlights && (
                      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
                        <div className="grid grid-cols-1 gap-2">
                          {insight.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm" style={{ color: 'var(--navy-900)' }}>
                              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div 
                      className="flex items-center space-x-4 text-sm opacity-50"
                      style={{ color: 'var(--navy-900)' }}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{insight.date}</span>
                      </div>
                      <span>•</span>
                      <span>{insight.readTime}</span>
                    </div>
                  </div>
                </GuardedReportLink>
              );
            })}
          </div>

          {/* 페이지네이션 */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {/* 이전 버튼 */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-10"
              style={{ 
                borderColor: '#0F2B46',
                color: '#0F2B46',
                backgroundColor: currentPage === 1 ? 'transparent' : 'transparent'
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 페이지 번호 버튼들 */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className="w-10 h-10 rounded-lg border-2 transition-all font-semibold"
                  style={{
                    borderColor: currentPage === page ? '#0F2B46' : '#E5E7EB',
                    backgroundColor: currentPage === page ? '#0F2B46' : 'white',
                    color: currentPage === page ? 'white' : '#0F2B46'
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* 다음 버튼 */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-10"
              style={{ 
                borderColor: '#0F2B46',
                color: '#0F2B46',
                backgroundColor: currentPage === totalPages ? 'transparent' : 'transparent'
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 페이지 정보 */}
          <p className="text-center mt-6 text-sm" style={{ color: '#0F2B46', opacity: 0.6 }}>
            {startIndex + 1}-{Math.min(endIndex, insights.length)} of {insights.length} reports
          </p>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 
            className="text-3xl lg:text-5xl leading-tight mb-8 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            최신 인사이트를<br />
            이메일로 받아보세요
          </h2>
          
          <div className="max-w-xl mx-auto mt-12">
            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="이메일 주소"
                  className="flex-1 px-6 py-4 border-2 focus:outline-none focus:border-opacity-100"
                  style={{ 
                    borderColor: 'var(--navy-900)',
                    color: 'var(--navy-900)'
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="px-8 py-4 text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--navy-900)' }}
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
            <p className="text-sm opacity-60 mt-4" style={{ color: 'var(--navy-900)' }}>
              월 1-2회, 엄선된 인사이트만 전달합니다.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <SEO />
    </div>
  );
}