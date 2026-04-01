import { Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Target } from 'lucide-react';
import { OurClients } from '../../components/OurClients';
import { SEO } from '../../components/SEO';
import { useState } from 'react';

export function RadiotherapyPatientAnalysis() {
  const [activeTab, setActiveTab] = useState('유방암');

  const pvmDiagnostics = [
    {
      title: '치료 지속성 위기',
      description: '방사선치료 자체보다 부작용 관리 공백 때문에 환자가 치료를 포기하는 경우가 발생합니다.'
    },
    {
      title: '생활 관리 공백',
      description: '피부, 통증, 장 기능, 호흡 일상 관리 기준이 없을 때 환자의 불안이 크게 증가합니다.'
    },
    {
      title: '주말 대응 공백',
      description: '주말과 야간에 환자와 보호자가 가장 큰 불안을 느낍니다.'
    }
  ];

  const patientVoicesByType: { [key: string]: string[] } = {
    유방암: [
      '"방사선 피부 화상이 너무 아파요."',
      '"가슴이 계속 붓는데 정상인가요?"',
      '"피부 변색이 평생 가나요?"',
      '"방사선 중 운동해도 되나요?"',
      '"통증 관리는 어떻게 하나요?"'
    ],
    폐암: [
      '"방사선 폐렴이 올까봐 걱정됩니다."',
      '"숨이 더 차는 것 같아요."',
      '"기침이 심해졌는데 괜찮나요?"',
      '"흉통이 있는데 응급인가요?"',
      '"산소 치료가 필요한가요?"'
    ],
    대장암: [
      '"방사선 설사가 계속됩니다."',
      '"항문 통증이 너무 심해요."',
      '"혈변이 나오는데 괜찮나요?"',
      '"피부염 치료는 어떻게 하나요?"',
      '"치료를 중단해야 할까요?"'
    ],
    간암: [
      '"간수치가 올라가요."',
      '"복수가 다시 찼어요."',
      '"피로가 극심합니다."',
      '"황달이 있는데 괜찮나요?"',
      '"간 기능이 회복될까요?"'
    ],
    위암: [
      '"방사선 구토가 심해요."',
      '"식욕이 완전히 없어요."',
      '"체중이 계속 빠져요."',
      '"위경련이 있어요."',
      '"언제 회복되나요?"'
    ]
  };

  const departments = [
    {
      name: '상담센터',
      checklist: [
        '방사선치료 환자 문의 시 증상 4가지(통증, 발열, 피부, 호흡)를 확인합니다.',
        '주말 문의 대응 스크립트를 운영합니다.',
        '응급실 방문 기준을 안내합니다.',
        '방사선치료 일정 확인을 돕습니다.',
        '부작용 발생 시 간호팀 연결 프로토콜을 운영합니다.',
        '환자 상태를 기록합니다.',
        '보호자 문의를 별도 기록합니다.',
        '재문의 환자를 관리합니다.',
        '위험 증상 발생 시 의료진 전달을 즉시 합니다.',
        '야간 대응 연락망을 안내합니다.'
      ]
    },
    {
      name: '간호팀',
      checklist: [
        '피부 반응을 매일 확인합니다.',
        '피부 등급 변화 기록을 합니다.',
        '보습 관리 교육을 합니다.',
        '통증 점수를 매일 체크합니다.',
        '발열 여부를 확인합니다.',
        '식사 섭취량을 확인합니다.',
        '체중 변화를 기록합니다.',
        '배변 상태를 확인합니다.',
        '수면 상태를 체크합니다.',
        '환자 교육 내용을 기록합니다.',
        '보호자에게 관리 방법을 설명합니다.',
        '증상 악화 시 의료진에게 보고합니다.'
      ]
    },
    {
      name: '재활치료팀',
      checklist: [
        '환자의 활동 능력을 평가합니다.',
        '피로도를 평가합니다.',
        '호흡 운동을 지도합니다.',
        '림프부종 예방 운동을 교육합니다.',
        '근력 유지 운동을 제공합니다.',
        '통증 완화 운동을 제공합니다.',
        '운동 강도를 조절합니다.',
        '운동 기록을 관리합니다.',
        '환자의 일상 활동 복귀를 돕습니다.',
        '운동 중 위험 증상을 확인합니다.'
      ]
    },
    {
      name: '영양팀',
      checklist: [
        '식욕 상태를 확인합니다.',
        '체중 변화를 확인합니다.',
        '단백질 섭취를 안내합니다.',
        '수분 섭취를 교육합니다.',
        '설사 시 식단을 조정합니다.',
        '구토 시 식단을 조정합니다.',
        '소량 고열량 식사를 권장합니다.',
        '영양 상담을 제공합니다.',
        '보호자에게 식단을 교육합니다.',
        '영양 기록을 관리합니다.'
      ]
    },
    {
      name: '진료 협진',
      checklist: [
        '통증 원인을 평가합니다.',
        '방사선 부작용을 확인합니다.',
        '감염 여부를 확인합니다.',
        '폐렴 가능성을 확인합니다.',
        '혈액검사를 확인합니다.',
        '치료 지속 여부를 평가합니다.',
        '전원 필요 여부를 판단합니다.',
        '완화치료 개입 시점을 판단합니다.',
        '추가 검사 필요 여부를 확인합니다.',
        '환자 상태 변화를 기록합니다.'
      ]
    },
    {
      name: '원무팀',
      checklist: [
        '진료 일정 안내를 합니다.',
        '검사 일정 안내를 합니다.',
        '입원 가능 여부를 안내합니다.',
        '보험 적용을 안내합니다.',
        '산정특례 정보를 제공합니다.',
        '환자 동선을 안내합니다.',
        '지방 환자의 숙박 정보를 안내합니다.',
        '보호자 문의를 응대합니다.',
        '예약 변경을 관리합니다.',
        '행정 문의를 기록합니다.'
      ]
    },
    {
      name: '심리상담팀',
      checklist: [
        '환자의 불안 정도를 평가합니다.',
        '치료 지속 불안을 상담합니다.',
        '수면 문제를 상담합니다.',
        '우울감을 평가합니다.',
        '보호자 스트레스를 상담합니다.',
        '치료 포기 고민을 상담합니다.',
        '정서 안정 프로그램을 제공합니다.',
        '집단 상담을 제공합니다.',
        '재발 불안을 상담합니다.',
        '심리 상태 변화를 기록합니다.'
      ]
    }
  ];

  const kpiCategories = [
    {
      title: 'Process KPI',
      kpis: ['환자 교육 제공률', '증상 체크 수행률', '부서 연결 리드타임']
    },
    {
      title: 'Outcome KPI',
      kpis: ['치료 중단 감소', '응급실 방문 감소', '체중 감소 예방']
    },
    {
      title: 'Experience KPI',
      kpis: ['환자 만족도', '보호자 만족도', '재문의 감소']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b no-print" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <Link to="/insights" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5" style={{ color: '#0F2B46' }} />
            <span style={{ color: '#0F2B46' }}>Reports</span>
          </Link>
        </div>
      </header>

      <div id="pdf-content">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 lg:px-16" style={{ background: 'linear-gradient(135deg, #0E1B3D 0%, #0F2B46 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-block px-4 py-2 rounded-full text-sm mb-6 border" style={{ borderColor: '#3A6FF8', color: '#3A6FF8' }}>
            PVM INSIGHT REPORT
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            암종별 방사선치료<br />
            환자 질문 분석 리포트
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-300">
            방사선치료 중 환자와 보호자가 실제로 반복하는 질문을<br />
            PVM 데이터 기반으로 분석했습니다.<br />
            <br />
            2차 암요양·재활병원이<br />
            부서별로 어떻게 대응해야 하는지<br />
            실행 체크리스트와 KPI 가이드를 제시합니다.
          </p>

          <div className="flex items-center space-x-4 text-sm mb-12 text-gray-400">
            <span>Last Updated: 2026.03</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-white hover:text-[#0F2B46] border-2"
              style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
            >
              PVM 데이터 기반 컨설팅 문의
            </Link>
          </div>
        </div>
      </section>

      {/* PVM 핵심 진단 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: '#0E1B3D' }}>
            PVM 핵심 진단
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pvmDiagnostics.map((item, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#ef4444' }}>
                  <span className="text-white text-2xl font-bold">!</span>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F2B46' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 암종별 환자 보이스 섹션 (탭 UI) */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            암종별 환자 보이스
          </h2>

          {/* 탭 버튼 */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {Object.keys(patientVoicesByType).map((cancerType) => (
              <button
                key={cancerType}
                onClick={() => setActiveTab(cancerType)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === cancerType
                    ? 'text-white'
                    : 'bg-white text-gray-700 border-2 hover:bg-gray-50'
                }`}
                style={
                  activeTab === cancerType
                    ? { backgroundColor: '#3A6FF8', borderColor: '#3A6FF8' }
                    : { borderColor: '#EAEAEA' }
                }
              >
                {cancerType}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              📌 {activeTab} 환자 보이스
            </h3>
            <div className="space-y-4">
              {patientVoicesByType[activeTab].map((voice, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#3A6FF8' }}></div>
                  <p className="text-gray-700 italic text-lg">{voice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 부서별 실행 체크리스트 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: '#0E1B3D' }}>
              부서별 실행 체크리스트
            </h2>
            <p className="text-xl text-gray-600">
              이 섹션이 리포트의 핵심입니다
            </p>
          </div>

          <div className="space-y-8">
            {departments.map((dept, index) => (
              <div key={index} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#0F2B46' }}>
                <h3 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#0F2B46' }}>
                  <span className="w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white font-bold" style={{ backgroundColor: '#3A6FF8' }}>
                    {index + 1}
                  </span>
                  {dept.name} 체크리스트
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {dept.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI 가이드 섹션 */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: '#0E1B3D' }}>
            KPI 가이드
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {kpiCategories.map((category, index) => (
              <div key={index} className="p-8 rounded-2xl" style={{ backgroundColor: '#0F2B46' }}>
                <h3 className="text-xl font-bold mb-6 text-white">
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <Target className="w-5 h-5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span className="text-white font-semibold">{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 결론 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0E1B3D' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
            방사선치료는<br />
            치료 기술이 아니라<br />
            치료를 끝까지 지속하게 만드는<br />
            운영 시스템이 중요합니다.
          </h2>
          
          <div className="max-w-[800px] mx-auto mt-8">
            <p className="text-2xl font-bold text-gray-300 leading-relaxed">
              2차 암요양·재활병원은<br />
              치료 사이의 을 관리하는 병원이 되어야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 하단 CTA 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            우리 병원의 방사선치료 환자 관리 시스템은<br />
            준비되어 있습니까?
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#3A6FF8' }}
            >
              병원 맞춤 KPI 진단
            </Link>
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-[#0F2B46] hover:text-white border-2"
              style={{ borderColor: '#0F2B46', color: '#0F2B46' }}
            >
              PVM 데이터 기반 컨설팅 문의
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* Our Clients */}
      <OurClients />

      {/* SEO */}
      <SEO />
    </div>
  );
}