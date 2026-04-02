import { CheckCircle, ArrowRight, Zap, MessageCircle, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { SEO } from '../components/SEO';

export function Consultation() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    contactName: '',
    phone: '',
    email: '',
    specialty: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 항목 검증
    if (!formData.hospitalName || !formData.contactName || !formData.phone || !formData.email) {
      setSubmitMessage('필수 항목을 모두 입력해주세요.');
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/consultation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('상담 신청이 접수되었습니다. 2영업일 내 연락드리겠습니다.');
        setSubmitSuccess(true);
        // 폼 초기화
        setFormData({
          hospitalName: '',
          contactName: '',
          phone: '',
          email: '',
          specialty: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitMessage(result.message || '상담 신청 처리 중 오류가 발생했습니다.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('상담 신청 오류:', error);
      setSubmitMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    '병원개원 컨설팅',
    '브랜딩과 홍보대행',
    '병원진단과 경영지원',
    '임직원 교육',
    '관리프로그램 개발',
    '홈페이지 제작',
    '기타'
  ];

  const suitableFor = [
    '암 환자 진료를 주력으로 하는 병원',
    '단순 홍보가 아닌 서비스 구조부터 개선하고 싶은 병원',
    '개인 역량 의존에서 시스템 중심으로 전환하려는 병원',
    '데이터 기반 전략 수립을 원하는 병원',
    '장기적 관점에서 브랜드를 구축하고자 하는 병원',
    '실행까지 함께할 전략 파트너가 필요한 병원'
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <SEO 
        title="컨설팅 상담 신청 - LS컨설팅"
        description="암 환자 니즈 기반 의료 전략 컨설팅. 병원 개원, 브랜딩, 홍보, 경영 지원 서비스 제공."
        url="https://www.lsconsulting.co.kr/consultation"
      />
      {/* HERO */}
      <section className="pt-32 pb-20 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-sm tracking-widest opacity-60" style={{ color: 'var(--navy-900)' }}>
            CONSULTATION
          </div>
          <h1 
            className="text-5xl lg:text-7xl leading-tight tracking-tight max-w-4xl mb-8"
            style={{ color: 'var(--navy-900)' }}
          >
            환자 중심<br />
            의료서비스 전략이<br />
            필요하십니까?
          </h1>
          <p className="text-2xl leading-relaxed opacity-70 max-w-3xl" style={{ color: 'var(--navy-900)' }}>
            LS컨설팅과 함께 병원을 시스템으로 전환하세요.
          </p>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-16 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            Our Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                병원개원 컨설팅
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원 개원을 위한 전반적인 컨설팅 서비스 제공
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                브랜딩과 홍보대행
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원 브랜드 구축 및 홍보 전략 수립
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                병원진단과 경영지원
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원 현황 진단 및 경영 전략 수립
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                임직원 교육
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                임직원 교육 프로그램 개발 및 실시
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                관리프로그램 개발
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원 관리 프로그램 개발 및 구축
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                홈페이지 제작
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원 홈페이지 제작 및 유지보수
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-1" style={{ backgroundColor: 'var(--navy-900)' }}></div>
              <h3 className="text-xl" style={{ color: 'var(--navy-900)' }}>
                기타
              </h3>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: 'var(--navy-900)' }}>
                병원의 다양한 요구사항에 맞춘 컨설팅 서비스 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LS컨설팅이 적합한 병원 */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-16 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            LS컨설팅이 적합한 병원
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {suitableFor.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--navy-900)' }} />
                <span className="text-lg" style={{ color: 'var(--navy-900)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section id="consultation-form" className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* 좌측 정보 */}
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl mb-8 tracking-tight">
                컨설팅 상담 신청
              </h2>
              
              <p className="text-lg mb-12 opacity-70 leading-relaxed">
                귀원의 상황과 니즈를 공유해주세요.<br />
                맞춤형 전략 방향을 제안드립니다.
              </p>
              
              <div className="space-y-6 mb-12">
                <div>
                  <div className="text-sm opacity-60 mb-2">이메일</div>
                  <div className="text-lg">fusionsfc@gmail.com</div>
                </div>
                <div>
                  <div className="text-sm opacity-60 mb-2">전화</div>
                  <div className="text-lg">010-9297-0940</div>
                </div>
              </div>
              
              <div className="p-6 rounded-lg border border-white border-opacity-20">
                <p className="text-sm opacity-70 leading-relaxed">
                  상담 신청 후 2영업일 내 연락드립니다.<br />
                  초기 상담은 무료로 진행됩니다.
                </p>
              </div>
            </div>

            {/* 우측 폼 */}
            <div className="bg-white rounded-2xl p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="hospitalName"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    병원명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="hospitalName"
                    name="hospitalName"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="contactName"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    담당자명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="phone"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label 
                    htmlFor="specialty"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    주요 진료 분야
                  </label>
                  <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    placeholder="예: 폐암, 유방암, 대장암"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.specialty}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="service"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    관심 서비스
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">선택해주세요</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm mb-2"
                    style={{ color: 'var(--navy-900)' }}
                  >
                    상담 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="현재 고민하고 계신 사항이나 개선하고 싶은 부분을 자유롭게 작성해주세요."
                    className="w-full px-4 py-3 border-2 focus:outline-none focus:border-opacity-100 resize-none"
                    style={{ 
                      borderColor: 'var(--navy-900)',
                      color: 'var(--navy-900)'
                    }}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                {submitMessage && (
                  <div 
                    className="p-4 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: submitSuccess ? '#D1FAE5' : '#FEE2E2',
                      color: submitSuccess ? '#065F46' : '#991B1B'
                    }}
                  >
                    {submitMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-8 py-4 text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? '제출 중...' : '상담 신청하기'}</span>
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-xs opacity-60 text-center" style={{ color: 'var(--navy-900)' }}>
                  제출하신 정보는 상담 목적으로만 사용되며, 철저히 보호됩니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 
            className="text-4xl lg:text-5xl leading-tight mb-8 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            병원의 미래는<br />
            전략에서 시작됩니다.
          </h2>
          
          <p className="text-xl opacity-70 max-w-3xl mx-auto" style={{ color: 'var(--navy-900)' }}>
            LS컨설팅과 함께<br />
            데이터 기반 환자 중심 의료서비스를 설계하세요.
          </p>
        </div>
      </section>
    </div>
  );
}