import { Link } from 'react-router';
import { ArrowLeft, Download, ArrowRight, TrendingUp } from 'lucide-react';
import { OurClients } from '../../components/OurClients';
import { SEO } from '../../components/SEO';

type SummaryCard = {
  title: string;
  statLine1: string;
  statLine2: string;
  implication: string;
};

type NeedItem = {
  rank: number;
  title: string;
  percent: number;
  bullets: string[];
  emphasis?: string;
};

type InsightBlock = {
  title: string;
  core: string;
  strategy: string;
};

type StrategyBlock = {
  title: string;
  구성: string[];
  KPI: string[];
};

const NAVY_950 = '#0E1B3D';
const NAVY_900 = '#0F2B46';
const BLUE = '#3A6FF8';

export function BreastCancerStageCareStrategyReport() {
  const summaryCards: SummaryCard[] = [
    {
      title: '항암 부작용 관리가 핵심 전장',
      statLine1: '전체의 35%가',
      statLine2: '자가관리 질문',
      implication: '→ 병원 외부에서 관리 발생',
    },
    {
      title: '타목시펜 = 제2의 치료 단계',
      statLine1: '15% 비중',
      statLine2: '장기 관리 체계 없음',
      implication: '→ 외래 시스템 한계',
    },
    {
      title: '수술 이후가 더 큰 문제',
      statLine1: '재건·림프·외형 문제 집중',
      statLine2: '→ 병원 내 협진 단절',
      implication: '',
    },
  ];

  const needsTop5: NeedItem[] = [
    {
      rank: 1,
      title: '항암 부작용 자가관리',
      percent: 35,
      bullets: ['탈모', '구내염', '손발톱', '미각 이상', '심장 두근거림'],
      emphasis:
        '“이게 정상인지 모르겠습니다”가 가장 반복되는 질문입니다',
    },
    {
      rank: 2,
      title: '타목시펜 장기 복용',
      percent: 15,
      bullets: ['우울', '관절통', '질건조', '탈모'],
      emphasis: '병원 관리 공백이 가장 긴 구간',
    },
    {
      rank: 3,
      title: '수술 후 재활/외형',
      percent: 18,
      bullets: ['림프부종', '장액종', '구형구축', '보정속옷'],
    },
    {
      rank: 4,
      title: '치료 의사결정',
      percent: 12,
      bullets: ['온코타입', '약 선택', '수술 범위'],
    },
    {
      rank: 5,
      title: '경제/접근성',
      percent: 10,
      bullets: ['비용', '보험', '거리'],
    },
  ];

  const insights: InsightBlock[] = [
    {
      title: '퇴원 후 정보 공백',
      core: '병원 → 설명 종료 / 환자 → 질문 시작',
      strategy: '디지털 교육 시스템 필요',
    },
    {
      title: '타목시펜 장기 방치',
      core: '5~10년 관리 없음',
      strategy: '전담 케어 체계 필요',
    },
    {
      title: '수술-재건-재활 단절',
      core: '환자가 직접 연결',
      strategy: '통합 프로그램 필요',
    },
  ];

  const hospitalStrategies: StrategyBlock[] = [
    {
      title: '디지털 환자 교육 시스템',
      구성: ['치료 단계별 콘텐츠', '응급 기준 안내', '챗봇 FAQ'],
      KPI: ['응급실 방문 20% 감소', '환자 문의 30% 감소'],
    },
    {
      title: '타목시펜 전용 케어 클리닉',
      구성: ['월 1회 모니터링', '부작용 관리', '정신건강 협진'],
      KPI: ['복약 지속률 90% 이상'],
    },
    {
      title: '수술 후 통합 재활 프로그램',
      구성: ['림프부종 관리', '외형 회복', '재활 운동'],
      KPI: ['합병증 30% 감소'],
    },
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="유방암 환자 니즈 기반 치료 단계별 케어 전략 리포트 – PVM 데이터 기반 병원 운영 혁신 가이드 –"
        description="300건 중 100건 환자 질문 데이터 분석. 환자는 치료보다 “치료를 버티는 방법”을 묻고 있습니다. 병원의 실제 운영 전략을 재정의합니다."
        url="https://www.lsconsulting.co.kr/report/breast-cancer-stage-care-strategy"
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b no-print" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <Link to="/insights" className="flex items-center space-x-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5" style={{ color: NAVY_900 }} />
            <span style={{ color: NAVY_900 }}>Reports</span>
          </Link>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: BLUE, color: 'white' }}
          >
            <Download className="w-4 h-4" />
            리포트 다운로드
          </button>
        </div>
      </header>

      <div id="pdf-content">
        <section className="pt-32 pb-20 px-8 lg:px-16" style={{ background: 'linear-gradient(135deg, #0E1B3D 0%, #0F2B46 100%)' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="inline-block px-4 py-2 rounded-full text-sm mb-6 border" style={{ borderColor: BLUE, color: BLUE }}>
              PVM INSIGHT REPORT
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              유방암 환자 니즈 기반
              <br />
              치료 단계별 케어 전략
            </h1>
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-gray-300">
              300건 중 100건 데이터 분석 결과
              <br />
              환자는 치료보다 “치료를 버티는 방법”을 더 많이 묻고 있습니다.
              <br />
              <br />
              이 리포트는 환자 질문 데이터를 기반으로
              <br />
              병원의 실제 운영 전략을 재정의합니다.
            </p>
            <div className="flex items-center space-x-4 text-sm mb-12 text-gray-400">
              <span>Last Updated: 2026.04</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleDownload} className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90" style={{ backgroundColor: BLUE, color: 'white' }}>
                리포트 다운로드
              </button>
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-white hover:text-[#0F2B46] border-2"
                style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
              >
                병원 맞춤 컨설팅 문의
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: NAVY_950 }}>
              핵심 요약 (Executive Summary)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {summaryCards.map((card, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: NAVY_900 }}>
                  <div className="inline-block px-3 py-1 rounded-full text-xs text-white mb-5" style={{ backgroundColor: NAVY_900 }}>
                    SUMMARY {idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: NAVY_900 }}>
                    {card.title}
                  </h3>
                  <div className="text-lg font-semibold text-gray-700 leading-relaxed">
                    <div>{card.statLine1}</div>
                    <div>{card.statLine2}</div>
                  </div>
                  <div className="mt-5 text-base font-bold" style={{ color: BLUE }}>
                    {card.implication || '→ 병원 운영 시스템 재설계 필요'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY_950 }}>
                환자는 정보를 찾는 것이 아니라
                <br />
                생존 전략을 찾고 있습니다
              </h2>
              <p className="text-xl text-gray-600">질문 비율 92% — 병원 설명의 ‘시점’과 환자 관리의 ‘기간’ 사이에 공백이 존재합니다</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                  데이터 포인트
                </div>
                <div className="text-6xl font-bold mb-3" style={{ color: BLUE }}>
                  92%
                </div>
                <p className="text-gray-700 leading-relaxed">
                  환자의 질문은 의학 정보가 아니라
                  <br />
                  <span className="font-bold" style={{ color: NAVY_900 }}>
                    ‘버티는 기준’
                  </span>
                  을 요구합니다.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white border-2 lg:col-span-2" style={{ borderColor: '#EAEAEA' }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl" style={{ backgroundColor: '#F8F9FA' }}>
                    <div className="text-xs font-semibold mb-2" style={{ color: NAVY_900 }}>
                      병원
                    </div>
                    <div className="text-2xl font-bold mb-3" style={{ color: NAVY_900 }}>
                      설명 부족
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      설명은 치료 ‘시점’에 집중되고,
                      <br />
                      관리 ‘기간’의 운영 기준은 비어 있습니다.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl" style={{ backgroundColor: '#F8F9FA' }}>
                    <div className="text-xs font-semibold mb-2" style={{ color: NAVY_900 }}>
                      환자
                    </div>
                    <div className="text-2xl font-bold mb-3" style={{ color: NAVY_900 }}>
                      커뮤니티 의존
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      병원 밖에서 표준이 만들어지고,
                      <br />
                      불안은 정보량이 아니라 확실성의 부재에서 증폭됩니다.
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-6 rounded-xl border-2" style={{ borderColor: NAVY_900 }}>
                  <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                    한줄 정리
                  </div>
                  <div className="text-2xl font-bold" style={{ color: NAVY_950 }}>
                    “환자는 치료가 아니라 관리 공백에서 무너진다”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: NAVY_950 }}>
              니즈 TOP 5 (데이터 섹션)
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {needsTop5.map((item) => (
                <div key={item.rank} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                        {String(item.rank).padStart(2, '0')} / 05
                      </div>
                      <h3 className="text-2xl font-bold leading-snug" style={{ color: NAVY_900 }}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold" style={{ color: NAVY_900 }}>
                        비중
                      </div>
                      <div className="text-4xl font-extrabold" style={{ color: BLUE }}>
                        {item.percent}%
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#EAEAEA' }}>
                    <div className="h-full" style={{ width: `${Math.min(100, item.percent)}%`, backgroundColor: BLUE }} />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {item.bullets.map((b) => (
                      <div key={b} className="px-3 py-2 rounded-lg border text-sm font-semibold" style={{ borderColor: '#EAEAEA', color: NAVY_900 }}>
                        {b}
                      </div>
                    ))}
                  </div>
                  {item.emphasis && (
                    <div className="mt-6 p-6 rounded-xl border-2" style={{ borderColor: NAVY_900, backgroundColor: '#F8F9FA' }}>
                      <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                        환자 발화
                      </div>
                      <div className="text-xl font-bold leading-relaxed" style={{ color: NAVY_950 }}>
                        {item.emphasis}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: NAVY_950 }}>
              감정 데이터 분석
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <div className="text-sm font-semibold mb-6" style={{ color: NAVY_900 }}>
                  감정 키워드 비중 (그래프)
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2" style={{ color: NAVY_900 }}>
                      <span className="font-semibold">불안 + 걱정</span>
                      <span className="font-bold" style={{ color: BLUE }}>
                        35%
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#EAEAEA' }}>
                      <div className="h-full" style={{ width: '35%', backgroundColor: BLUE }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2" style={{ color: NAVY_900 }}>
                      <span className="font-semibold">힘듦 + 답답</span>
                      <span className="font-bold" style={{ color: BLUE }}>
                        38%
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: '#EAEAEA' }}>
                      <div className="h-full" style={{ width: '38%', backgroundColor: BLUE }} />
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-xl border-2" style={{ borderColor: NAVY_900, backgroundColor: '#F8F9FA' }}>
                  <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                    결론
                  </div>
                  <div className="text-2xl font-bold leading-relaxed" style={{ color: NAVY_950 }}>
                    환자는 의학적 치료보다
                    <br />
                    심리적 생존 상태에 있음
                  </div>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: '#EAEAEA' }}>
                <div className="text-sm font-semibold mb-6" style={{ color: NAVY_900 }}>
                  환자 발화 (인용)
                </div>
                <div className="space-y-4">
                  {[
                    '“병원에서 설명은 들었는데, 집에 오니 시작입니다.”',
                    '“정상인지 아닌지를 누가 기준으로 말해주나요?”',
                    '“치료를 받는 게 아니라 버티는 방법이 필요해요.”',
                  ].map((q) => (
                    <div key={q} className="p-6 rounded-xl border-2" style={{ borderColor: '#EAEAEA', backgroundColor: '#F8F9FA' }}>
                      <div className="text-lg font-semibold leading-relaxed" style={{ color: NAVY_900 }}>
                        {q}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: NAVY_950 }}>
              핵심 인사이트
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {insights.map((it, idx) => (
                <div key={it.title} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: NAVY_900 }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: BLUE }}>
                    INSIGHT {idx + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 leading-snug" style={{ color: NAVY_900 }}>
                    {it.title}
                  </h3>
                  <div className="text-base font-semibold mb-6 text-gray-700">{it.core}</div>
                  <div className="p-6 rounded-xl border-2" style={{ borderColor: '#EAEAEA', backgroundColor: '#F8F9FA' }}>
                    <div className="text-sm font-semibold mb-2" style={{ color: NAVY_900 }}>
                      실행 전략
                    </div>
                    <div className="text-xl font-bold" style={{ color: NAVY_950 }}>
                      {it.strategy}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY_950 }}>
                병원 실행 전략
              </h2>
              <p className="text-xl text-gray-600">운영 시스템을 “치료 이후”로 확장하는 3가지 설계안</p>
            </div>
            <div className="space-y-8">
              {hospitalStrategies.map((s, idx) => (
                <div key={s.title} className="p-8 rounded-2xl bg-white border-2" style={{ borderColor: NAVY_900 }}>
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div>
                      <div className="text-sm font-semibold mb-2" style={{ color: BLUE }}>
                        STRATEGY {idx + 1}
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold leading-snug" style={{ color: NAVY_900 }}>
                        {s.title}
                      </h3>
                    </div>
                    <Link
                      to="/consultation"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                      style={{ backgroundColor: BLUE, color: 'white' }}
                    >
                      병원 맞춤 컨설팅 문의
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-xl border-2" style={{ borderColor: '#EAEAEA', backgroundColor: '#F8F9FA' }}>
                      <div className="text-sm font-semibold mb-3" style={{ color: NAVY_900 }}>
                        구성
                      </div>
                      <ul className="space-y-2">
                        {s.구성.map((x) => (
                          <li key={x} className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
                            <span className="text-base font-semibold" style={{ color: NAVY_900 }}>
                              {x}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 rounded-xl border-2" style={{ borderColor: '#EAEAEA', backgroundColor: '#F8F9FA' }}>
                      <div className="text-sm font-semibold mb-3" style={{ color: NAVY_900 }}>
                        KPI
                      </div>
                      <ul className="space-y-2">
                        {s.KPI.map((x) => (
                          <li key={x} className="flex items-start gap-3">
                            <span className="mt-2 w-2 h-2 rounded-full" style={{ backgroundColor: BLUE }} />
                            <span className="text-base font-semibold" style={{ color: NAVY_900 }}>
                              {x}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: NAVY_950 }}>
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
              환자는 완치를 묻지만
              <br />
              실제로는
              <br />
              “이 과정을 견딜 수 있는가”를 묻고 있습니다
            </h2>
            <p className="text-2xl font-bold text-gray-300 leading-relaxed">
              2차 병원의 경쟁력은
              <br />
              치료가 아니라 치료 지속 시스템입니다
            </p>
          </div>
        </section>

        <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: NAVY_950 }}>
              우리 병원은
              <br />
              환자의 ‘치료 이후’를 관리하고 있습니까?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: BLUE }}
              >
                병원 맞춤 KPI 진단
              </Link>
              <Link
                to="/consultation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-[#0F2B46] hover:text-white border-2"
                style={{ borderColor: NAVY_900, color: NAVY_900 }}
              >
                PVM 기반 컨설팅 문의
              </Link>
            </div>
          </div>
        </section>
      </div>

      <OurClients />
      <SEO />
    </div>
  );
}
