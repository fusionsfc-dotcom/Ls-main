import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { RelatedReports } from '../components/RelatedReports';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from '../components/SEO';

export function BreastCancerReport() {
  // 치료 패턴 데이터
  const treatmentData = [
    { name: '타목시펜 복용', value: 42 },
    { name: '수술 후 관리', value: 35 },
    { name: '방사선 관리', value: 28 },
    { name: '항암치료 중', value: 22 }
  ];

  // 감정 패턴 데이터
  const emotionData = [
    { name: '궁금', value: 40, color: '#0F2B46' },
    { name: '걱정', value: 30, color: '#2C5282' },
    { name: '불안', value: 20, color: '#5B8FC9' },
    { name: '불편', value: 10, color: '#A6C8E8' }
  ];

  // 제품/약 언급
  const products = [
    { rank: 1, name: '타목시펜', desc: '호르몬 치료제 장기 복용 관련' },
    { rank: 2, name: '졸라덱스', desc: '주사 치료 관련 질문 다수' },
    { rank: 3, name: '뉴케어', desc: '영양 보충 관련' },
    { rank: 4, name: '탈모 관련 제품', desc: '항암 부작용 관리' }
  ];

  return (
    <div className="min-h-screen bg-white py-32 px-8 lg:px-16">
      <Helmet>
        <title>유방암 환자 니즈 분석 리포트 | LS Consulting</title>
        <meta name="description" content="2026년 2월 유방암 환자 140건 PVM 데이터 기반 니즈 분석. 호르몬 치료 장기 관리, 회복 프로그램 전략 인사이트 제공." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="2026년 2월 유방암 환자 니즈 분석 리포트" />
        <meta property="og:description" content="140건 데이터 기반 유방암 환자 치료 패턴 및 감정 분석 - 의료 전략 컨설팅" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1769029259587-6821e9648570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhc3QlMjBjYW5jZXIlMjBhd2FyZW5lc3MlMjBtZWRpY2FsfGVufDF8fHx8MTc3MTc3MjMxNXww&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:url" content={`${window.location.origin}/disease/breast-cancer-report`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2026년 2월 유방암 환자 니즈 분석 리포트" />
        <meta name="twitter:description" content="140건 데이터 기반 유방암 환자 치료 패턴 및 감정 분석 - 의료 전략 컨설팅" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1769029259587-6821e9648570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhc3QlMjBjYW5jZXIlMjBhd2FyZW5lc3MlMjBtZWRpY2FsfGVufDF8fHx8MTc3MTc3MjMxNXww&ixlib=rb-4.1.0&q=80&w=1080" />
      </Helmet>

      <SEO 
        title="유방암 환자 니즈 분석 리포트 - LS컨설팅"
        description="유방암 환자들의 온라인 커뮤니티 데이터 기반 니즈 분석. 치료 패턴, 감정 패턴, 주요 질문 키워드 분석."
        url="https://www.lsconsulting.co.kr/disease/breast-cancer-report"
      />
      {/* HERO SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Disease Insight Report
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          2026년 2월 유방암 환자 니즈 분석 리포트
        </h1>
        
        <p className="text-xl mb-8" style={{ color: '#666666' }}>
          PVM 데이터 140건 기반 전략 인사이트
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>140건 데이터</span>
          <span>•</span>
          <span>12 min read</span>
        </div>
      </section>

      {/* 데이터 개요 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          데이터 개요
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>전체 데이터</div>
            <div className="text-3xl font-bold" style={{ color: '#0F2B46' }}>전체 531건 중 140건</div>
            <div className="text-sm mt-2" style={{ color: '#666666' }}>전체 데이터의 26.9%</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 항목</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>치료 / 감정 / 제품 / 탐색 행동</div>
          </div>
        </div>
      </section>

      {/* 치료 패턴 차트 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          치료 패턴 분석
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={treatmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip />
              <Bar dataKey="value" fill="#0F2B46" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#EBF4FF' }}>
          <p className="text-sm" style={{ color: '#0F2B46' }}>
            타목시펜 등 호르몬 치료 장기 복용이 가장 높은 비중. 5-10년 장기 관리에 대한 불안감이 두드러짐
          </p>
        </div>
      </section>

      {/* 감정 패턴 차트 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          감정 패턴 분석
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={emotionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#EBF4FF' }}>
          <p className="text-sm" style={{ color: '#0F2B46' }}>
            "궁금"이 1위. 치료 방법보다 "이후 삶"에 대한 정보 탐색이 주를 이룸
          </p>
        </div>
      </section>

      {/* 제품/약 언급 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          제품/약 언급 분석
        </h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {products.map((item) => (
            <div key={item.rank} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#0F2B46' }}>
                  {item.rank}
                </div>
                <span className="text-lg font-bold" style={{ color: '#222222' }}>{item.name}</span>
              </div>
              <p className="text-sm ml-12" style={{ color: '#666666' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 전략 시사점 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="rounded-xl p-8 lg:p-12" style={{ backgroundColor: '#0F2B46' }}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            요양·재활 병원의 전략 기회
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">호르몬 치료 장기 관리 클리닉</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  5-10년 타목시펜 복용 환자를 위한 정기 상담 및 부작용 모니터링 시스템 구축. 
                  장기 복용에 대한 심리적 지지 프로그램 운영.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">여성 특화 회복 프로그램</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  수술 후 신체 변화에 대한 적응 지원. 탈모, 피부 변화, 체중 관리 등 
                  여성 환자 특화 회복 케어 패키지 제공.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">직장 복귀 지원 시스템</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  치료 후 사회 복귀를 위한 단계별 가이드. 체력 회복 프로그램, 
                  직장 복귀 상담, 경력 연속성 유지 지원.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 결론 강조 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="text-center p-12 rounded-xl border-2" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
          <p className="text-3xl lg:text-4xl leading-relaxed font-bold" style={{ color: '#0F2B46' }}>
            "유방암 전략의 핵심은<br />완치가 아니라 회복 설계다."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#222222' }}>
          이 인사이트를 병원 전략에 적용하고 싶다면
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link to="/consultation" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>전략 상담 문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 rounded-lg border-2 transition-all hover:bg-opacity-5 flex items-center justify-center space-x-2" style={{ borderColor: '#0F2B46', color: '#0F2B46' }}>
            <Download className="w-5 h-5" />
            <span>PDF 다운로드</span>
          </button>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/disease/breast-cancer-report" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          LS 컨설팅 뉴스레터 구독하기
        </h2>
        
        <p className="text-lg mb-4" style={{ color: '#666666' }}>
          유방암 환자 니즈 분석 리포트와 같은 최신 의료 전략 정보를 받아보세요.
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input type="email" placeholder="이메일 주소 입력" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          <button type="submit" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>구독하기</span>
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200 mt-16">
        <div className="text-center space-y-2">
          <h4 className="font-bold text-lg" style={{ color: '#0F2B46' }}>LS Consulting</h4>
          <p className="text-sm" style={{ color: '#666666' }}>암 환자 니즈 분석 기반 의료 전략 컨설팅</p>
          <p className="text-sm" style={{ color: '#666666' }}>Research / Strategy / Execution</p>
          <p className="text-sm" style={{ color: '#666666' }}>이메일: fusionsfc@gmail.com</p>
          <p className="text-sm" style={{ color: '#666666' }}>전화: 010-9297-0940</p>
          <p className="text-sm" style={{ color: '#666666' }}>서울특별시, 제주특별자치도</p>
        </div>
      </footer>
    </div>
  );
}