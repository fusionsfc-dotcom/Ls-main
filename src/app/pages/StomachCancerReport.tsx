import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { RelatedReports } from '../components/RelatedReports';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from '../components/SEO';

export function StomachCancerReport() {
  // 치료 패턴 데이터
  const treatmentData = [
    { name: '수술 후 관리', value: 45 },
    { name: '식이 관련 질문', value: 38 },
    { name: '체중 감소', value: 32 },
    { name: '항암 병행', value: 25 }
  ];

  // 감정 패턴 데이터
  const emotionData = [
    { name: '걱정', value: 35, color: '#0F2B46' },
    { name: '궁금', value: 30, color: '#2C5282' },
    { name: '불안', value: 25, color: '#5B8FC9' },
    { name: '불편', value: 10, color: '#A6C8E8' }
  ];

  // 핵심 니즈
  const coreNeeds = [
    {
      title: '식이 관리',
      items: ['무엇을 먹어야 하는가?', '식사량은?', '영양제 복용 가능 여부', '체중이 계속 빠지는 게 정상인가?']
    },
    {
      title: '체중 감소 및 근력 저하',
      items: ['수술 후 체력 저하', '어지러움', '근육 감소', '피로']
    },
    {
      title: '덤핑 증후군',
      items: ['식후 어지러움', '심박수 증가', '복부 팽만감', '설사']
    },
    {
      title: '체력 회복',
      items: ['일상 활동 가능 범위', '운동 시작 시기', '직장 복귀 시점', '장기 관리 방법']
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>위암 환자 니즈 분석 리포트 | LS Consulting</title>
        <meta name="description" content="2026년 2월 위암 환자 PVM 데이터 기반 수술 후 식이 관리, 체중 감소, 덤핑 증후군 등 회복 과정 니즈 분석." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="2026년 2월 위암 환자 니즈 분석 리포트" />
        <meta property="og:description" content="수술 후 식이 관리와 회복 전략 - 암 환자 니즈 기반 의료 전략 컨설팅" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1715111641899-b0118be16660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RvbWFjaCUyMGdhc3RyaWMlMjBoZWFsdGh8ZW58MXx8fHwxNzcxNzcyMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:url" content={`${window.location.origin}/disease/stomach-cancer-report`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2026년 2월 위암 환자 니즈 분석 리포트" />
        <meta name="twitter:description" content="수술 후 식이 관리와 회복 전략 - 암 환자 니즈 기반 의료 전략 컨설팅" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1715111641899-b0118be16660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3RvbWFjaCUyMGdhc3RyaWMlMjBoZWFsdGh8ZW58MXx8fHwxNzcxNzcyMzE2fDA&ixlib=rb-4.1.0&q=80&w=1080" />
      </Helmet>

      <SEO 
        title="위암 환자 니즈 분석 리포트 - LS컨설팅"
        description="위암 환자들의 수술 후 식이 관리, 체중 감소, 덤핑 증후군 등 회복 과정 니즈 분석."
        url="https://www.lsconsulting.co.kr/disease/stomach-cancer-report"
      />
      {/* HERO SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Disease Insight Report
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          2026년 2월 위암 환자 니즈 분석 리포트
        </h1>
        
        <p className="text-xl mb-8" style={{ color: '#666666' }}>
          PVM 데이터 기반 회복 전략 인사이트
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>위암 환자 데이터</span>
          <span>•</span>
          <span>10 min read</span>
        </div>
      </section>

      {/* 데이터 개요 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          데이터 개요
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>전체 데이터</div>
            <div className="text-3xl font-bold" style={{ color: '#0F2B46' }}>531건</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 기준</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>치료 / 감정 / 제품 / 탐색 행동</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>특징</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>수술 이후 질문 비중 높음</div>
          </div>
        </div>
      </section>

      {/* 치료 패턴 차트 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          치료 패턴 구조
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
            위암은 다른 암종 대비 수술 이후의 생활 적응 문제가 핵심. 치료보다 "먹는 문제"가 일상 스트레스 1순위
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
            급성 공포보다 생활 적응 스트레스가 큼. 환자는 "이게 정상인가?"를 반복 확인
          </p>
        </div>
      </section>

      {/* 핵심 니즈 분석 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          핵심 니즈 분석
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {coreNeeds.map((need, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0F2B46' }}>
                {need.title}
              </h3>
              <ul className="space-y-2">
                {need.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm" style={{ color: '#666666' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#0F2B46' }}></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                <h3 className="text-xl font-bold text-white mb-2">영양 회복 프로그램</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  위 절제 후 영양 회복 프로그램. 소량 다회 식사 코칭 시스템 구축. 
                  뉴케어 등 영양 보충식 활용 가이드 제공.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">식사 코칭 시스템</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  식이 구조 개선 및 단백질 보충 전략. 체중·근육 모니터링 프로그램. 
                  덤핑 증후군 관리 가이드 제공.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">체력 모니터링</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  활동 가능 범위 평가 및 체력 회복 단계별 프로그램. 
                  직장 복귀 지원 시스템 및 장기 관리 방법 제시.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">덤핑 관리 가이드</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  식후 증상 관리 방법. 심박수 변화 대응 전략. 
                  "이게 정상인가?" 질문에 대한 명확한 기준 제시.
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
            "위암 전략의 핵심은 수술이 아니라<br />회복 이후의 삶을 설계하는 것이다."
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
      <RelatedReports currentReportLink="/disease/stomach-cancer-report" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          LS Consulting 뉴스레터 구독하기
        </h2>
        
        <p className="text-xl mb-8" style={{ color: '#666666' }}>
          암 환자 니즈 분석 및 전략 컨설팅 최신 정보를 받아보세요.
        </p>
        
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input type="email" placeholder="이메일 주소 입력" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          <button type="submit" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            구독하기
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