import { Link } from 'react-router';
import { ArrowLeft, CheckCircle2, Target, ChevronDown } from 'lucide-react';
import { OurClients } from '../../components/OurClients';
import { SEO } from '../../components/SEO';
import * as Accordion from '@radix-ui/react-accordion';

export function CancerTreatmentTypeCareStrategy() {
  const pvmDiagnostics = [
    {
      title: '치료 불안 증가',
      description: '전이·재발·항암 지속 여부에 대한 질문 급증'
    },
    {
      title: '부작용 관리 공백',
      description: '호중구 감소, 복수, 통증, 탈모, 감염 관련 문의 증가'
    },
    {
      title: '보호자 의사결정 압박',
      description: '호스피스·전원·임종 대비 질문 확대'
    }
  ];

  const pvmDataStats = [
    { label: '수술 후 관리 질문 비중', value: '28%' },
    { label: '항암 중 부작용 질문', value: '34%' },
    { label: '전원/요양병원 탐색', value: '17%' },
    { label: '보호자 의사결정 압박 질문', value: '21%' }
  ];

  // 섹션 1: 암 수술 후 회복·재활 전략
  const surgeryVoices = {
    유방암: [
      '"수술 후 팔이 계속 저리고 부어요."',
      '"림프부종이 평생 가나요?"',
      '"가슴 재건은 언제 가능하죠?"',
      '"항암 전에 체력을 올려야 하나요?"',
      '"수술 후 통증이 계속 정상인가요?"'
    ],
    대장암: [
      '"배변 횟수가 하루 10번이에요."',
      '"장루 냄새 때문에 외출이 무서워요."',
      '"가스가 너무 많이 차요."',
      '"수술 후 피가 조금 보이는데 괜찮나요?"',
      '"언제 직장 복귀 가능할까요?"'
    ],
    폐암: [
      '"폐 일부 절제 후 숨이 너무 찹니다."',
      '"계단을 못 오르겠어요."',
      '"기침이 계속되는데 괜찮은가요?"',
      '"산소포화도 떨어지면 응급인가요?"',
      '"재활운동을 언제 시작해야 하나요?"'
    ],
    위암: [
      '"덤핑증후군이 너무 힘듭니다."',
      '"조금만 먹어도 토할 것 같아요."',
      '"체중이 계속 줄어요."',
      '"외식은 언제 가능하죠?"',
      '"철분 부족은 언제 회복되나요?"'
    ],
    간암: [
      '"수술 후 복수가 다시 찹니다."',
      '"피로가 너무 심해요."',
      '"황달 수치가 오르면 위험한가요?"',
      '"식욕이 거의 없습니다."',
      '"간 기능 회복까지 얼마나 걸리나요?"'
    ]
  };

  // 섹션 2: 항암치료 전 준비 전략
  const preTreatmentVoices = {
    유방암: [
      '"항암 전 탈모 대비는?"',
      '"냉각캡 효과 있나요?"',
      '"체력 얼마나 필요하죠?"',
      '"일은 병행 가능할까요?"',
      '"면역력 올려야 하나요?"'
    ],
    대장암: [
      '"포트 삽입이 무섭습니다."',
      '"항암 몇 번까지 가야 하나요?"',
      '"설사 대비는 어떻게 하나요?"',
      '"미리 수액 맞아야 하나요?"',
      '"직장 복귀는 언제?"'
    ],
    폐암: [
      '"면역항암 부작용 심한가요?"',
      '"간질성 폐렴 걱정됩니다."',
      '"체중이 줄어 시작해도 되나요?"',
      '"기침 심해지면 중단인가요?"',
      '"산소포화도 관리해야 하나요?"'
    ],
    위암: [
      '"선항암 꼭 해야 하나요?"',
      '"구토 심할까 걱정입니다."',
      '"체력 부족인데 시작해도 되나요?"',
      '"식사는 어떻게 준비하죠?"',
      '"면역주사 병행 가능한가요?"'
    ],
    간암: [
      '"색전술 후 항암 바로 하나요?"',
      '"간수치 올라가면 중단인가요?"',
      '"빌리루빈 높으면 위험한가요?"',
      '"항암 말고 수술은 불가인가요?"',
      '"간 기능 회복 후 시작해야 하나요?"'
    ]
  };

  // 섹션 3: 항암치료 중 관리 전략
  const duringTreatmentVoices = {
    유방암: [
      '"손발 저림 심해요."',
      '"탈모 시작됐어요."',
      '"피부가 갈색으로 변해요."',
      '"면역항암 발진 심해요."',
      '"체중이 너무 빠져요."'
    ],
    대장암: [
      '"호중구 500인데 괜찮나요?"',
      '"설사가 멈추질 않아요."',
      '"복통이 심해요."',
      '"암수치가 올라요."',
      '"항암을 멈춰야 하나요?"'
    ],
    폐암: [
      '"기침이 더 심해졌어요."',
      '"숨이 더 차요."',
      '"CT상 그림자가 커졌대요."',
      '"피로가 너무 심해요."',
      '"열이 나는데 응급인가요?"'
    ],
    위암: [
      '"입맛이 완전히 사라졌어요."',
      '"구토가 멈추지 않아요."',
      '"체중이 5kg 빠졌어요."',
      '"복수가 찼어요."',
      '"암표지자가 올랐어요."'
    ],
    간암: [
      '"황달이 다시 와요."',
      '"복수가 찹니다."',
      '"간수치가 3배 올랐어요."',
      '"피로가 극심합니다."',
      '"항암을 계속해야 할까요?"'
    ]
  };

  // 섹션 4: 항암치료 후 회복 전략
  const postTreatmentVoices = {
    유방암: [
      '"탈모 언제 회복되나요?"',
      '"림프부종 관리법은?"',
      '"손발 저림 계속되는데요."',
      '"재발 공포가 너무 커요."',
      '"직장 복귀 가능할까요?"'
    ],
    대장암: [
      '"장루 영구인가요?"',
      '"배변 패턴 회복될까요?"',
      '"무기력이 계속돼요."',
      '"외식이 가능할까요?"',
      '"재발 검사는 언제 하나요?"'
    ],
    폐암: [
      '"숨찬 증상 계속됩니다."',
      '"기침이 멈추지 않아요."',
      '"체력 회복 가능할까요?"',
      '"재발 두려움이 커요."',
      '"정기 검사 주기는?"'
    ],
    위암: [
      '"덤핑 평생 가나요?"',
      '"체중 회복 가능한가요?"',
      '"철분제 계속 먹어야 하나요?"',
      '"외식이 가능할까요?"',
      '"재발률이 궁금해요."'
    ],
    간암: [
      '"간 기능 회복될까요?"',
      '"복수 재발 가능성은?"',
      '"피로가 지속됩니다."',
      '"재발 신호는 뭔가요?"',
      '"정기 CT 주기는?"'
    ]
  };

  // 섹션 5: 방사선 치료
  const radiationVoices = {
    유방암: [
      '"방사선 피부 화상 관리법은?"',
      '"가슴 붓기 정상인가요?"',
      '"통증이 심해요."',
      '"피부 변색 회복되나요?"',
      '"일상 생활 가능할까요?"'
    ],
    대장암: [
      '"방사선 설사 계속돼요."',
      '"항문 통증 심합니다."',
      '"혈변이 나와요."',
      '"피부염 치료는?"',
      '"치료 중단해야 하나요?"'
    ],
    폐암: [
      '"방사선 폐렴 걱정돼요."',
      '"숨이 더 차요."',
      '"기침 심해졌어요."',
      '"흉통이 있어요."',
      '"산소 필요한가요?"'
    ],
    위암: [
      '"방사선 구토 심해요."',
      '"식욕이 없어요."',
      '"체중이 빠져요."',
      '"위경련 있어요."',
      '"언제 회복되나요?"'
    ],
    간암: [
      '"간수치 올라요."',
      '"복수 찼어요."',
      '"피로가 극심해요."',
      '"황달 있어요."',
      '"간 기능 괜찮을까요?"'
    ]
  };

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
            암치료 형태별<br />
            암요양·재활 맞춤 케어 전략
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-300">
            수술·항암·방사선 치료 단계별<br />
            환자의 실제 질문 데이터를 기반으로<br />
            2차 암병원의 역할과 KPI 실행 전략을 제시합니다.
          </p>

          <div className="flex items-center space-x-4 text-sm mb-12 text-gray-400">
            <span>Last Updated: 2026.02</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-white border-2 border-white text-white hover:text-[#0E1B3D]"
            >
              우리 병원 맞춤 분석 신청
            </Link>
          </div>
        </div>
      </section>

      {/* PVM 핵심 진단 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: '#0E1B3D' }}>
            PVM 데이터가 보여준 현실
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

          {/* 데이터 블록 추가 */}
          <div className="mb-12 p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#3A6FF8' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
              최근 PVM DB 2월 분석 기준
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {pvmDataStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#3A6FF8' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-12 rounded-2xl text-center" style={{ backgroundColor: '#0F2B46' }}>
            <p className="text-2xl lg:text-3xl font-bold text-white leading-relaxed">
              치료는 3차병원에서 이루어지지만<br />
              지속 가능성은 2차병원이 결정합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 1: 암 수술 후 회복·재활 전략 */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            암 수술 후 회복·재활 전략
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 암종별 환자 보이스 (아코디언) */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                암종별 환자 보이스 (총 25개)
              </h3>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {Object.entries(surgeryVoices).map(([cancer, voices], idx) => (
                  <Accordion.Item key={idx} value={`surgery-${idx}`} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#EAEAEA' }}>
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <span className="font-bold" style={{ color: '#0F2B46' }}>📌 {cancer}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{ color: '#3A6FF8' }} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {voices.map((voice, vIdx) => (
                          <p key={vIdx} className="text-gray-700 italic pl-4 border-l-2" style={{ borderColor: '#3A6FF8' }}>
                            {voice}
                          </p>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* 2차병원 전략 + KPI */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  🎯 2차병원 전략
                </h3>
                <div className="space-y-3">
                  {[
                    '장·호흡·림프·간 기능별 맞춤 재활',
                    '수술 후 4주 기능 회복 지표화',
                    '체중·근육량·알부민 추적 관리',
                    '암종별 특화 재활 클리닉 운영'
                  ].map((role, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span style={{ color: '#0E1B3D' }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">📈 핵심 KPI</h4>
                <div className="space-y-2">
                  {[
                    '4주 체중 회복률 70%',
                    '기능 점수 개선 30%',
                    '재입원율 15% 이하',
                    '장루 피부 합병증 10% 이하'
                  ].map((kpi, idx) => (
                    <div key={idx} className="text-white font-semibold flex items-center space-x-2">
                      <Target className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 2: 항암치료 전 준비 전략 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            항암치료 전 준비 전략
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 암종별 환자 보이스 */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                암종별 환자 보이스 (총 25개)
              </h3>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {Object.entries(preTreatmentVoices).map(([cancer, voices], idx) => (
                  <Accordion.Item key={idx} value={`pre-${idx}`} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#EAEAEA' }}>
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <span className="font-bold" style={{ color: '#0F2B46' }}>📌 {cancer}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{ color: '#3A6FF8' }} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {voices.map((voice, vIdx) => (
                          <p key={vIdx} className="text-gray-700 italic pl-4 border-l-2" style={{ borderColor: '#3A6FF8' }}>
                            {voice}
                          </p>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* 2차병원 전략 + KPI */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  🎯 2차병원 전략
                </h3>
                <div className="space-y-3">
                  {[
                    '근육량 측정 기반 체력 강화',
                    '영양 보충 프로그램',
                    '항암 사전 교육 세션',
                    '암종별 맞춤 준비 프로그램'
                  ].map((role, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span style={{ color: '#0E1B3D' }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">📈 핵심 KPI</h4>
                <div className="space-y-2">
                  {[
                    '항암 1차 완료율 95%',
                    '항암 지연률 10% 이하',
                    '체중 유지율 80%'
                  ].map((kpi, idx) => (
                    <div key={idx} className="text-white font-semibold flex items-center space-x-2">
                      <Target className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 3: 항암치료 중 관리 전략 */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            항암치료 중 관리 전략
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 암종별 환자 보이스 */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                암종별 환자 보이스 (총 25개)
              </h3>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {Object.entries(duringTreatmentVoices).map(([cancer, voices], idx) => (
                  <Accordion.Item key={idx} value={`during-${idx}`} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#EAEAEA' }}>
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <span className="font-bold" style={{ color: '#0F2B46' }}>📌 {cancer}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{ color: '#3A6FF8' }} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {voices.map((voice, vIdx) => (
                          <p key={vIdx} className="text-gray-700 italic pl-4 border-l-2" style={{ borderColor: '#3A6FF8' }}>
                            {voice}
                          </p>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* 2차병원 전략 + KPI */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  🎯 2차병원 전략
                </h3>
                <div className="space-y-3">
                  {[
                    '주간 혈액 수치 모니터링',
                    '24시간 감염 대응 시스템',
                    '체중·알부민 추적 관리',
                    '보호자 주간 리포트 제공',
                    '암종별 부작용 집중 관리'
                  ].map((role, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span style={{ color: '#0E1B3D' }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">📈 핵심 KPI</h4>
                <div className="space-y-2">
                  {[
                    '항암 중단률 15% 이하',
                    '체중 5% 이상 감소 환자 20% 이하',
                    '응급실 방문률 10% 이하',
                    '보호자 상담 참여율 70%'
                  ].map((kpi, idx) => (
                    <div key={idx} className="text-white font-semibold flex items-center space-x-2">
                      <Target className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 4: 항암치료 후 회복 전략 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            항암치료 후 회복 전략
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 암종별 환자 보이스 */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                암종별 환자 보이스 (총 25개)
              </h3>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {Object.entries(postTreatmentVoices).map(([cancer, voices], idx) => (
                  <Accordion.Item key={idx} value={`post-${idx}`} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#EAEAEA' }}>
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <span className="font-bold" style={{ color: '#0F2B46' }}>📌 {cancer}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{ color: '#3A6FF8' }} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {voices.map((voice, vIdx) => (
                          <p key={vIdx} className="text-gray-700 italic pl-4 border-l-2" style={{ borderColor: '#3A6FF8' }}>
                            {voice}
                          </p>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* 2차병원 전략 + KPI */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  🎯 2차병원 전략
                </h3>
                <div className="space-y-3">
                  {[
                    '피로 회복 클리닉',
                    '말초신경 재활 프로그램',
                    '심리 상담 및 재발 공포 관리',
                    '직장 복귀 단계별 코칭',
                    '암종별 후유증 집중 관리'
                  ].map((role, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                      <span style={{ color: '#0E1B3D' }}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">📈 핵심 KPI</h4>
                <div className="space-y-2">
                  {[
                    '3개월 내 일상 복귀율 60%',
                    '피로 점수 개선 40%',
                    '우울 점수 감소 30%'
                  ].map((kpi, idx) => (
                    <div key={idx} className="text-white font-semibold flex items-center space-x-2">
                      <Target className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 5: 방사선치료 전·중·후 전략 */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12" style={{ color: '#0E1B3D' }}>
            방사선치료 전·중·후 전략
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 암종별 환자 보이스 */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                암종별 환자 보이스 (총 25개)
              </h3>
              
              <Accordion.Root type="single" collapsible className="space-y-4">
                {Object.entries(radiationVoices).map(([cancer, voices], idx) => (
                  <Accordion.Item key={idx} value={`rad-${idx}`} className="border-2 rounded-xl overflow-hidden" style={{ borderColor: '#EAEAEA' }}>
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                        <span className="font-bold" style={{ color: '#0F2B46' }}>📌 {cancer}</span>
                        <ChevronDown className="w-5 h-5 transition-transform duration-200" style={{ color: '#3A6FF8' }} />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-6 py-4 bg-gray-50">
                      <div className="space-y-3">
                        {voices.map((voice, vIdx) => (
                          <p key={vIdx} className="text-gray-700 italic pl-4 border-l-2" style={{ borderColor: '#3A6FF8' }}>
                            {voice}
                          </p>
                        ))}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* 2차병원 전략 + KPI */}
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0F2B46' }}>
                  🎯 2차병원 전략
                </h3>
                
                <div className="grid gap-6">
                  {/* 전 */}
                  <div>
                    <h4 className="font-bold mb-3" style={{ color: '#3A6FF8' }}>전</h4>
                    <div className="space-y-2">
                      {['피부 보호 교육', '체중 유지 전략'].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                          <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 중 */}
                  <div>
                    <h4 className="font-bold mb-3" style={{ color: '#3A6FF8' }}>중</h4>
                    <div className="space-y-2">
                      {['방사선 피부 전담 관리', '통증 집중 관리', '암종별 합병증 모니터링'].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                          <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 후 */}
                  <div>
                    <h4 className="font-bold mb-3" style={{ color: '#3A6FF8' }}>후</h4>
                    <div className="space-y-2">
                      {['장 점막 회복 식단', '신경 재활 프로그램', '피부 재생 관리'].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#3A6FF8' }} />
                          <span className="text-sm" style={{ color: '#0E1B3D' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: '#0F2B46' }}>
                <h4 className="text-sm font-semibold mb-4 text-gray-300">📈 핵심 KPI</h4>
                <div className="space-y-2">
                  {[
                    '방사선 중단률 5% 이하',
                    '피부 3등급 이상 10% 이하',
                    '체중 감소 5% 초과 20% 이하'
                  ].map((kpi, idx) => (
                    <div key={idx} className="text-white font-semibold flex items-center space-x-2">
                      <Target className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 전략적 결론 섹션 (강화형) */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0E1B3D' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
            2차 암병원의 경쟁력은<br />
            환자를 더 많이 받는 것이 아니라<br />
            치료를 끝까지 완주하게 하는 것입니다.
          </h2>
          
          <div className="max-w-[800px] mx-auto space-y-8 text-xl text-gray-300 leading-relaxed">
            <p className="text-2xl font-bold" style={{ color: '#3A6FF8' }}>
              암요양병원은<br />
              '대기 병원'이 아니라<br />
              '지속 설계 병원'이 되어야 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 하단 CTA 섹션 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
            우리 병원의 치료 단계별<br />
            케어 전략은 준비되어 있습니까?
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/consultation"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: '#3A6FF8' }}
            >
              병원 맞춤 KPI 진단 받기
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

      {/* Our Clients */}
      <OurClients />

      {/* SEO */}
      <SEO />
      </div>
    </div>
  );
}