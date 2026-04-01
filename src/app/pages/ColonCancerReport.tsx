import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SEO } from '../components/SEO';
import { RelatedReports } from '../components/RelatedReports';

export function ColonCancerReport() {
  // 치료 패턴 데이터
  const treatmentData = [
    { name: '수술 후 배변 변화', value: 48 },
    { name: '장루 관리', value: 35 },
    { name: '재발 검사', value: 32 },
    { name: '항암 병행', value: 28 }
  ];

  // 감정 패턴 데이터
  const emotionData = [
    { name: '걱정', value: 38, color: '#0F2B46' },
    { name: '불안', value: 30, color: '#2C5282' },
    { name: '궁금', value: 22, color: '#5B8FC9' },
    { name: '민감', value: 10, color: '#A6C8E8' }
  ];

  // 핵심 니즈
  const coreNeeds = [
    {
      title: '배변 변화 적응',
      items: ['하루 5~10회 배변 정상인가?', '설사 지속 시 문제인가?', '항문 통증 관리 방법', '배변 리듬 회복 기간']
    },
    {
      title: '장루 관리',
      items: ['장루 사용 적응', '피부 관리 방법', '교체 주기', '일상생활 제약 사항']
    },
    {
      title: '재발 검사 로드맵',
      items: ['검사 간격', 'CEA 수치 해석', 'CT 주기', '재발 가능성 평가']
    },
    {
      title: '식이 관리',
      items: ['섬유질 섭취 여부', '고기/유제품 제한', '장 자극 음식', '영양 보충제 선택']
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <SEO 
        title="대장암 환자 니즈 분석 리포트 - LS컨설팅"
        description="대장암 환자들의 치료 패턴, 감정 패턴 및 장루 관리, 배변 패턴 변화 등 핵심 니즈 분석."
        url="https://www.lsconsulting.co.kr/disease/colon-cancer-report"
      />
      {/* HERO SECTION */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Disease Insight Report
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          2026년 2월 대장암 환자 니즈 분석 리포트
        </h1>
        
        <p className="text-xl mb-8" style={{ color: '#666666' }}>
          PVM 데이터 기반 장 기능 회복 전략
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>대장암 환자 데이터</span>
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
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 항목</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>치료 / 감정 / 제품 / 탐색</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>특징</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>배변 변화와 장 기능 적응</div>
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
            치료 성공 이후 "정상적인 생활 가능 여부"에 대한 질문이 많음. 생활 리듬 붕괴 스트레스가 큼
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
            배변 문제는 말하기 어려운 주제라 온라인에서 질문 비중이 높음. 재발 불안 지속적
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
        
        <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: '#FFF8E1' }}>
          <h3 className="text-lg font-bold mb-3" style={{ color: '#0F2B46' }}>제품/보조요법 언급</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm" style={{ color: '#666666' }}>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
              <span>유산균</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
              <span>장 건강 보조제</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
              <span>소화 관련 제품</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
              <span>장루 관련 제품</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#0F2B46' }}></span>
              <span>단백질 보충식</span>
            </div>
          </div>
          <p className="text-sm mt-4" style={{ color: '#666666' }}>
            병원에서 명확한 가이드가 없으면 환자는 인터넷 후기 기반으로 선택
          </p>
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
                <h3 className="text-xl font-bold text-white mb-2">장 기능 회복 프로그램</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  배변 안정화 프로그램. 정상 범위 기준 제시. 
                  배변 횟수와 리듬 모니터링 시스템 구축.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">장루 전문 관리</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  장루 전문 상담 시스템. 피부 관리 및 교체 가이드 제공. 
                  일상생활 적응 교육 프로그램.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">재발 모니터링 가이드</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  검사 로드맵 제공. CEA 수치 해석 가이드. 
                  재발 불안 관리를 위한 정기 상담 시스템.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">식이 코칭 시스템</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  섬유질 조절 가이드. 장 자극 음식 관리. 
                  유산균 등 보조제 선택 기준 제시.
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
            "대장암 전략의 핵심은 치료가 아니라<br />장 기능 안정화와 일상 복귀다."
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
      <RelatedReports currentReportLink="/disease/colon-cancer-report" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#222222' }}>
            최신 리서치를 이메일로 받아보세요
          </h3>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <button className="px-6 py-3 rounded-lg text-white transition-all hover:opacity-90" style={{ backgroundColor: '#0F2B46' }}>
              구독
            </button>
          </div>
        </div>
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