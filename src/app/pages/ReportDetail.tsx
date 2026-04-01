import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RelatedReports } from '../components/RelatedReports';

export function ReportDetail() {
  // 치료 키워드 데이터
  const treatmentData = [
    { name: '항암', value: 35.6 },
    { name: '수술', value: 31.1 },
    { name: '방사선', value: 18.2 },
    { name: '면역', value: 15.1 }
  ];

  // 감정 분포 데이터
  const emotionData = [
    { name: '궁금', value: 38, color: '#0F2B46' },
    { name: '불안', value: 28, color: '#2C5282' },
    { name: '희망', value: 20, color: '#5B8FC9' },
    { name: '걱정', value: 14, color: '#A6C8E8' }
  ];

  // 제품/약 언급 TOP
  const productMentions = [
    { rank: 1, name: '표적항암제', count: 89 },
    { rank: 2, name: '면역항암제', count: 67 },
    { rank: 3, name: '통증완화제', count: 54 },
    { rank: 4, name: '영양보충제', count: 42 },
    { rank: 5, name: '항구토제', count: 38 }
  ];

  // Representative Voices 데이터
  const voices = [
    {
      tag: '폐암',
      need: '표적항암 효과',
      emotion: '궁금',
      quote: '"3세대 표적항암제가 1세대보다 정말 효과가 좋은가요? 부작용은 어떤가요?"',
      action: '표적항암제 세대별 비교표 + 실제 치료 사례 공유'
    },
    {
      tag: '유방암',
      need: '항암 부작용',
      emotion: '불안',
      quote: '"머리카락이 다 빠진다고 하는데, 언제부터 빠지나요? 다시 자라나요?"',
      action: '항암 부작용 타임라인 + 관리 방법 상담 프로그램'
    },
    {
      tag: '대장암',
      need: '수술 후 회복',
      emotion: '걱정',
      quote: '"수술 후 식사는 언제부터 가능한가요? 일상 복귀는 얼마나 걸리나요?"',
      action: '수술 후 회복 단계별 가이드 + 영양 상담'
    },
    {
      tag: '폐암',
      need: '치료 선택',
      emotion: '혼란',
      quote: '"항암을 먼저 할지 수술을 먼저 할지 모르겠어요. 어떤 게 나은가요?"',
      action: '치료 순서 의사결정 상담 + 케이스별 설명'
    },
    {
      tag: '유방암',
      need: '재발 걱정',
      emotion: '불안',
      quote: '"치료가 끝났는데 재발할까봐 너무 무서워요. 어떻게 관리해야 하나요?"',
      action: '재발 예방 관리 프로그램 + 정기 검진 안내'
    },
    {
      tag: '위암',
      need: '식사 관리',
      emotion: '답답함',
      quote: '"위 절제 후 먹을 수 있는 게 거의 없어요. 어떻게 영양을 챙기나요?"',
      action: '위절제 환자 맞춤 영양 가이드 + 식단 상담'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>2026년 2월 폐암 환자 온라인 니즈 분석 보고서 | LS Consulting</title>
        <meta name="description" content="312건의 폐암 환자 보이스 분석. 표적치료와 면역항암에 대한 질문이 전체의 50.7%를 차지하며, 치료 선택에 대한 혼란과 부작용 관리에 대한 불안이 두드러졌습니다." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="2026년 2월 폐암 환자 온라인 니즈 분석 보고서" />
        <meta property="og:description" content="312건의 폐암 환자 보이스 분석 - 암 환자 니즈 기반 의료 전략 컨설팅" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzcxNzcyMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080" />
        <meta property="og:url" content={`${window.location.origin}/insights/report/202602`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="2026년 2월 폐암 환자 온라인 니즈 분석 보고서" />
        <meta name="twitter:description" content="312건의 폐암 환자 보이스 분석 - 암 환자 니즈 기반 의료 전략 컨설팅" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1766297248160-87aca6fa59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBkYXRhJTIwYW5hbHlzaXN8ZW58MXx8fHwxNzcxNzcyMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080" />
      </Helmet>

      {/* 리포트 헤더 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="inline-block px-4 py-2 rounded-full text-white text-sm mb-6" style={{ backgroundColor: '#0F2B46' }}>
          Monthly Cancer Voice Report
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{ color: '#222222' }}>
          2026년 2월 폐암 환자<br />
          온라인 니즈 분석 보고서
        </h1>
        
        <p className="text-xl mb-8" style={{ color: '#666666' }}>
          312건의 폐암 환자 보이스 분석
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm pb-8 border-b" style={{ color: '#666666' }}>
          <span>PVM 데이터 기반</span>
          <span>•</span>
          <span>2026년 2월 분석</span>
          <span>•</span>
          <span>15 min read</span>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#0F2B46' }}>
          Executive Summary
        </h2>
        <div className="p-8 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
          <p className="text-lg leading-relaxed mb-4" style={{ color: '#222222' }}>
            2026년 2월, 312건의 폐암 환자 온라인 보이스를 분석한 결과, 
            <strong> 표적치료와 면역항암에 대한 질문이 전체의 50.7%</strong>를 차지했으며, 
            치료 선택에 대한 혼란과 부작용 관리에 대한 불안이 두드러졌습니다.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: '#222222' }}>
            환자들은 단순한 치료 정보보다 <strong>'내 상황에 맞는 구체적 가이드'</strong>를 원하고 있으며, 
            이는 병원의 상담 전략과 콘텐츠 방향에 중요한 시사점을 제공합니다.
          </p>
        </div>
      </section>

      {/* 데이터 개요 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          데이터 개요
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 데이터</div>
            <div className="text-3xl font-bold" style={{ color: '#0F2B46' }}>312건</div>
            <div className="text-sm mt-2" style={{ color: '#666666' }}>폐암 환자 온라인 보이스</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 기간</div>
            <div className="text-2xl font-bold" style={{ color: '#0F2B46' }}>2026년 2월</div>
            <div className="text-sm mt-2" style={{ color: '#666666' }}>1개월간 수집</div>
          </div>
          
          <div className="p-6 rounded-lg" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="text-sm mb-2" style={{ color: '#666666' }}>분석 항목</div>
            <div className="text-lg font-bold" style={{ color: '#0F2B46' }}>치료/감정/제품/탐색</div>
            <div className="text-sm mt-2" style={{ color: '#666666' }}>다차원 분석</div>
          </div>
        </div>
      </section>

      {/* 치료 키워드 분석 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          치료 키워드 분포
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
            항암치료 관련 질문이 가장 많으며, 특히 표적항암과 면역항암 치료법에 대한 관심이 높음
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
            '궁금'(38%)과 '불안'(28%)이 전체의 66%를 차지. 정보 탐색과 심리적 안정 모두 필요
          </p>
        </div>
      </section>

      {/* 제품/약 언급 TOP 5 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          제품/약 언급 TOP 5
        </h2>
        
        <div className="space-y-4">
          {productMentions.map((item) => (
            <div key={item.rank} className="flex items-center p-4 rounded-lg border border-gray-200">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold mr-4" style={{ backgroundColor: '#0F2B46' }}>
                {item.rank}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg" style={{ color: '#222222' }}>{item.name}</div>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#0F2B46' }}>{item.count}건</div>
            </div>
          ))}
        </div>
      </section>

      {/* Representative Voices */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <h2 className="text-3xl font-bold mb-8" style={{ color: '#0F2B46' }}>
          Representative Voices
        </h2>
        <p className="text-lg mb-8" style={{ color: '#666666' }}>
          실제 환자 질문과 병원이 제공해야 할 Action
        </p>
        
        <div className="space-y-6">
          {voices.map((voice, index) => (
            <div key={index} className="p-6 rounded-lg border-l-4" style={{ borderColor: '#0F2B46', backgroundColor: '#F7F7F7' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs text-white" style={{ backgroundColor: '#0F2B46' }}>
                  {voice.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#FFE5E5', color: '#C41E3A' }}>
                  감정: {voice.emotion}
                </span>
              </div>
              <div className="mb-2 font-bold" style={{ color: '#0F2B46' }}>니즈: {voice.need}</div>
              <div className="text-lg italic mb-4" style={{ color: '#222222' }}>{voice.quote}</div>
              <div className="text-sm p-3 rounded" style={{ backgroundColor: '#E8F4F8', color: '#0F2B46' }}>
                <strong>병원 Action:</strong> {voice.action}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Implications */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto">
        <div className="rounded-xl p-8 lg:p-12" style={{ backgroundColor: '#0F2B46' }}>
          <h2 className="text-3xl font-bold mb-8 text-white">
            Strategic Implications
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">치료 선택 가이드 제공</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  표적항암 vs 면역항암 비교표, 환자 상태별 치료법 추천 기준을 명확히 제시. 
                  초기 상담에서 치료 로드맵을 시각화하여 불확실성 해소.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">부작용 관리 시스템 강화</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  항암 부작용 타임라인, 증상별 대처법, 24시간 상담 체계 구축. 
                  환자가 '혼자가 아니다'는 느낌을 받을 수 있도록 지속적 케어 제공.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0" style={{ color: '#0F2B46' }}>
                <span className="font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">단계별 맞춤 콘텐츠</h3>
                <p className="text-white opacity-80 text-sm leading-relaxed">
                  진단 초기, 치료 중, 회복기 등 단계별로 필요한 정보를 선제적으로 제공. 
                  블로그, 유튜브 쇼츠 등 다양한 채널로 환자 접점 확대.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 영역 */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#222222' }}>
          이 데이터를 병원 전략에 적용하고 싶다면
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button className="px-8 py-4 rounded-lg border-2 transition-all hover:bg-opacity-5 flex items-center justify-center space-x-2" style={{ borderColor: '#0F2B46', color: '#0F2B46' }}>
            <Download className="w-5 h-5" />
            <span>PDF 다운로드</span>
          </button>
          <Link to="/consultation" className="px-8 py-4 rounded-lg text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2" style={{ backgroundColor: '#0F2B46' }}>
            <span>컨설팅 문의하기</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Related Reports */}
      <RelatedReports currentReportLink="/insights/report/202602" />

      {/* Newsletter */}
      <section className="py-16 px-6 lg:px-8 max-w-[960px] mx-auto border-t border-gray-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#222222' }}>
            최신 인사이트를 이메일로 받아보세요
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