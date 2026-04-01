import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Search, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import React from 'react';

export function Patients() {
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, string>>({});
  const [patientType, setPatientType] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqCategory, setFaqCategory] = useState('전체');
  const [questionForm, setQuestionForm] = useState({
    role: '',
    cancerType: '',
    stage: '',
    region: '',
    question: '',
    phone: '',
    email: '',
    consent: false
  });

  // 설문 문항
  const surveyQuestions = [
    {
      id: 'stage',
      question: '현재 치료 단계는?',
      options: ['진단 직후', '수술 전후', '항암 중', '치료 종료 후']
    },
    {
      id: 'concern',
      question: '가장 큰 고민은?',
      options: ['병원 선택', '요양병원 여부', '비용', '재발 불안', '부작용']
    },
    {
      id: 'caregiver',
      question: '보호자 동반 여부',
      options: ['보호자 있음', '보호자 없음', '부분 동반']
    },
    {
      id: 'purpose',
      question: '입원 목적',
      options: ['회복', '면역관리', '통증관리', '장기요양']
    }
  ];

  // 환자 유형 분류 로직
  const determinePatientType = (answers: Record<string, string>) => {
    if (answers.concern === '병원 선택' || answers.stage === '진단 직후') {
      return 'A';
    } else if (answers.concern === '요양병원 여부' || answers.purpose === '장기요양') {
      return 'B';
    } else if (answers.purpose === '회복' || answers.purpose === '면역관리') {
      return 'C';
    } else {
      return 'D';
    }
  };

  const handleSurveyAnswer = (questionId: string, answer: string) => {
    const newAnswers = { ...surveyAnswers, [questionId]: answer };
    setSurveyAnswers(newAnswers);
    
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      const type = determinePatientType(newAnswers);
      setPatientType(type);
    }
  };

  const resetSurvey = () => {
    setSurveyStep(0);
    setSurveyAnswers({});
    setPatientType(null);
  };

  // FAQ 데이터
  const faqs = [
    {
      category: '병원 선택',
      question: '대학병원과 요양병원의 차이는 무엇인가요?',
      answer: '대학병원은 암 치료(수술, 항암, 방사선)를 전문으로 하며, 요양병원은 치료 후 회복과 증상 관리를 중심으로 합니다. 치료가 필요한 경우 대학병원, 회복과 관리가 목적이라면 요양병원을 고려하세요.'
    },
    {
      category: '병원 선택',
      question: '암 전문 요양병원은 어떻게 확인하나요?',
      answer: '병원 방문 시 ① 암 환자 전담 병동 운영 여부 ② 암 관련 의료진 구성 ③ 영양 및 통증 관리 프로그램 ④ 응급 상황 대응 체계를 반드시 확인하세요.'
    },
    {
      category: '요양병원',
      question: '요양병원은 언제 가는 것이 좋나요?',
      answer: '항암 치료 후 체력 회복이 필요할 때, 통증 관리가 지속적으로 필요할 때, 집에서 돌봄이 어려울 때 요양병원을 고려합니다. 치료 자체가 필요한 경우는 대학병원이 적합합니다.'
    },
    {
      category: '요양병원',
      question: '요양병원에서도 항암 치료를 받을 수 있나요?',
      answer: '대부분의 요양병원은 항암 치료를 직접 시행하지 않습니다. 다만 대학병원과 협력하여 외래 항암 치료 후 회복을 지원하는 곳도 있습니다.'
    },
    {
      category: '비용',
      question: '요양병원 비용은 어느 정도인가요?',
      answer: '건강보험 적용 시 1일 본인부담금은 평균 2~5만원 수준입니다. 병원 등급, 1인실/다인실 여부, 추가 프로그램에 따라 차이가 있으니 입원 전 반드시 확인하세요.'
    },
    {
      category: '비용',
      question: '암 치료 비용 지원 제도가 있나요?',
      answer: '암 산정특례 제도를 통해 본인부담률이 5~10%로 경감됩니다. 또한 국가암검진, 의료급여, 재난적 의료비 지원 등 다양한 제도가 있으니 사회복지사와 상담하세요.'
    },
    {
      category: '치료 부작용',
      question: '항암 치료 후 가장 힘든 부작용은 무엇인가요?',
      answer: '환자마다 다르지만 통증, 피로, 식욕부진, 구토, 면역력 저하가 흔합니다. 증상이 심할 경우 반드시 의료진에게 알리고, 필요 시 약물 조절이나 입원 치료를 받으세요.'
    },
    {
      category: '치료 부작용',
      question: '면역력 관리는 어떻게 하나요?',
      answer: '규칙적인 식사, 충분한 휴식, 감염 예방(손 씻기, 사람 많은 곳 피하기)이 기본입니다. 무리한 운동이나 검증되지 않은 면역 식품은 오히려 위험할 수 있습니다.'
    },
    {
      category: '보호자 역할',
      question: '보호자는 무엇을 준비해야 하나요?',
      answer: '① 환자의 치료 일정과 약물 정보 정리 ② 의료진과의 소통 준비 ③ 환자의 증상 변화 관찰 ④ 심리적 지지와 경청이 중요합니다. 보호자 본인의 건강 관리도 잊지 마세요.'
    },
    {
      category: '보호자 역할',
      question: '환자가 우울해할 때 어떻게 해야 하나요?',
      answer: '무조건적인 격려보다는 환자의 감정을 인정하고 경청하는 것이 중요합니다. 필요 시 정신건강의학과 상담이나 암 환자 심리 지원 프로그램을 활용하세요.'
    },
    {
      category: '재발 불안',
      question: '재발 확률은 어떻게 되나요?',
      answer: '암 종류, 병기, 치료 반응에 따라 다릅니다. 주치의와 정기 검진 일정을 정하고, 이상 증상 발생 시 즉시 상담하세요. 과도한 불안은 삶의 질을 떨어뜨립니다.'
    },
    {
      category: '재발 불안',
      question: '재발 방지를 위해 무엇을 해야 하나요?',
      answer: '정기 검진 준수, 금연, 절주, 균형잡힌 식사, 적절한 운동이 기본입니다. 검증되지 않은 민간요법이나 건강식품은 오히려 해로울 수 있으니 주의하세요.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = faqCategory === '전체' || faq.category === faqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqCategories = ['전체', '병원 선택', '요양병원', '비용', '치료 부작용', '보호자 역할', '재발 불안'];

  // 유형별 가이드 데이터
  const typeGuides = {
    A: {
      title: '치료 결정형',
      description: '지금은 정확한 정보를 바탕으로 치료 방향을 결정하는 단계입니다.',
      decisions: [
        '주치의와의 충분한 상담을 통해 치료 계획 이해하기',
        '병원의 암 치료 경험과 전문성 확인하기',
        '치료 비용과 지원 제도 미리 파악하기'
      ],
      mistakes: [
        '인터넷 정보만으로 치료법 결정하기',
        '검증되지 않은 대체의학에 의존하기',
        '비용 걱정으로 치료 시기 늦추기'
      ],
      checklist: [
        '주치의의 전문 분야와 경력 확인',
        '병원의 암센터 인증 및 장비 보유 현황',
        '응급 상황 대응 체계',
        '환자 후기 및 평판 (신뢰도 있는 출처)',
        '보험 적용 범위 및 예상 비용'
      ],
      questions: [
        '이 치료법의 성공률과 부작용은 어느 정도인가요?',
        '다른 치료 옵션도 있나요?',
        '치료 기간과 입원 일수는 어떻게 되나요?',
        '비용은 총 얼마나 예상되나요?',
        '응급 상황 시 대응 절차는 어떻게 되나요?'
      ]
    },
    B: {
      title: '요양 전환 고민형',
      description: '치료 후 회복과 관리를 위한 최적의 환경을 찾는 단계입니다.',
      decisions: [
        '대학병원 치료 종료 후 회복 기간이 필요한지 판단하기',
        '집에서 돌봄이 가능한지, 전문 관리가 필요한지 확인하기',
        '암 전문 요양병원의 프로그램과 의료진 구성 점검하기'
      ],
      mistakes: [
        '요양병원에서 항암 치료가 가능하다고 오해하기',
        '비용만 보고 시설을 선택하기',
        '재활 프로그램 없는 곳 선택하기'
      ],
      checklist: [
        '암 환자 전담 병동 및 프로그램 운영 여부',
        '영양 관리 및 통증 관리 시스템',
        '응급 상황 시 대학병원 연계 체계',
        '물리치료 및 재활 프로그램 제공',
        '환자 대 간호사 비율 (케어 밀도)'
      ],
      questions: [
        '암 환자를 위한 특화 프로그램이 있나요?',
        '응급 상황 발생 시 어떻게 대응하나요?',
        '영양사와 물리치료사가 상주하나요?',
        '대학병원과의 협력 시스템이 있나요?',
        '통증 관리는 어떤 방식으로 하나요?'
      ]
    },
    C: {
      title: '회복 관리형',
      description: '체계적인 회복과 면역 관리가 필요한 단계입니다.',
      decisions: [
        '정기 검진 일정을 정하고 철저히 지키기',
        '영양 관리와 적절한 운동으로 체력 회복하기',
        '증상 변화를 기록하고 의료진과 공유하기'
      ],
      mistakes: [
        '검증되지 않은 건강식품에 과도한 의존',
        '무리한 운동으로 체력 소진',
        '정기 검진 소홀히 하기'
      ],
      checklist: [
        '정기 검진 일정 (혈액검사, 영상검사)',
        '영양 상담 및 식단 관리 계획',
        '운동 강도와 빈도 조절',
        '수면 패턴 및 스트레스 관리',
        '이상 증상 발생 시 연락처'
      ],
      questions: [
        '어떤 음식을 먹고 피해야 하나요?',
        '운동은 언제부터 어느 정도 해야 하나요?',
        '피로가 계속될 때는 어떻게 해야 하나요?',
        '정기 검진은 얼마나 자주 받아야 하나요?',
        '건강식품을 먹어도 되나요?'
      ]
    },
    D: {
      title: '재발 불안 관리형',
      description: '불안을 관리하면서 일상을 회복하는 단계입니다.',
      decisions: [
        '정기 검진을 통해 객관적 확인하기',
        '심리 상담이나 환자 모임 참여 고려하기',
        '일상 복귀를 위한 단계적 계획 세우기'
      ],
      mistakes: [
        '사소한 증상에 과도하게 불안해하기',
        '검진을 피하거나 너무 자주 받기',
        '사회 활동을 완전히 중단하기'
      ],
      checklist: [
        '정기 검진 일정과 다음 검진 예약',
        '이상 증상 체크리스트 (주치의 제공)',
        '심리 지원 프로그램 정보',
        '환자 모임 또는 온라인 커뮤니티',
        '가족과의 소통 시간 확보'
      ],
      questions: [
        '이런 증상이 재발 신호일까요?',
        '불안할 때는 어떻게 해야 하나요?',
        '언제 병원에 연락해야 하나요?',
        '심리 상담은 어디서 받을 수 있나요?',
        '일상 복귀는 언제쯤 가능한가요?'
      ]
    }
  };

  const currentGuide = patientType ? typeGuides[patientType as keyof typeof typeGuides] : null;

  // Patient Journey 단계
  const journeyStages = [
    {
      stage: '진단',
      key: '지금 가장 중요한 것',
      value: '정확한 진단과 치료 계획 수립',
      duration: '평균 입원 기간',
      durationValue: '검사 기간 1~2주',
      cost: '현실적 비용 범위',
      costValue: '검사비 50~200만원대',
      anxiety: '불안 관리 포인트',
      anxietyValue: '충분한 정보 수집과 주치의 신뢰 구축'
    },
    {
      stage: '수술',
      key: '지금 가장 중요한 것',
      value: '수술 후 회복과 합병증 예방',
      duration: '평균 입원 기간',
      durationValue: '수술 후 1~2주',
      cost: '현실적 비용 범위',
      costValue: '본인부담 200~500만원대',
      anxiety: '불안 관리 포인트',
      anxietyValue: '통증 관리와 조기 회복 활동'
    },
    {
      stage: '항암',
      key: '지금 가장 중요한 것',
      value: '부작용 관리와 영양 유지',
      duration: '평균 치료 기간',
      durationValue: '3~6개월 (주기적)',
      cost: '현실적 비용 범위',
      costValue: '주기당 50~150만원대',
      anxiety: '불안 관리 포인트',
      anxietyValue: '부작용 대응과 심리적 지지'
    },
    {
      stage: '요양',
      key: '지금 가장 중요한 것',
      value: '체력 회복과 면역 관리',
      duration: '평균 입원 기간',
      durationValue: '1~3개월',
      cost: '현실적 비용 범위',
      costValue: '1일 본인부담 2~5만원',
      anxiety: '불안 관리 포인트',
      anxietyValue: '규칙적 생활과 증상 모니터링'
    },
    {
      stage: '회복',
      key: '지금 가장 중요한 것',
      value: '정기 검진과 일상 복귀',
      duration: '관리 기간',
      durationValue: '평생 (정기 검진)',
      cost: '현실적 비용 범위',
      costValue: '검진당 10~30만원',
      anxiety: '불안 관리 포인트',
      anxietyValue: '재발 불안 관리와 삶의 질 회복'
    }
  ];

  const [selectedJourney, setSelectedJourney] = useState(0);

  // 질문하기 폼 제출
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!questionForm.consent) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/patient-questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            role: questionForm.role,
            cancerType: questionForm.cancerType,
            stage: questionForm.stage,
            region: questionForm.region,
            question: questionForm.question,
            phone: questionForm.phone,
            email: questionForm.email,
            timestamp: new Date().toISOString()
          })
        }
      );

      const result = await response.json();
      
      if (response.ok && result.success) {
        alert('질문이 접수되었습니다. 검토 후 이메일로 답변드리겠습니다.');
        setQuestionForm({
          role: '',
          cancerType: '',
          stage: '',
          region: '',
          question: '',
          phone: '',
          email: '',
          consent: false
        });
      } else {
        alert(result.message || '질문 제출 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('질문 제출 오류:', error);
      alert('질문 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 lg:px-16">
        <div className="max-w-[1000px] mx-auto text-center">
          <h1 
            className="text-4xl lg:text-6xl leading-tight tracking-tight mb-6"
            style={{ color: 'var(--navy-900)' }}
          >
            암 치료, 무엇을 먼저<br />결정해야 할까요?
          </h1>
          <p className="text-lg opacity-60 mb-12 leading-relaxed" style={{ color: 'var(--navy-900)' }}>
            국내 최대 암 환자 니즈 분석 DB(PVM™)를 기반으로 정리한<br />
            환자 의사결정 플랫폼입니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#survey"
              className="px-8 py-4 text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--navy-900)' }}
            >
              내 상황 진단하기
            </a>
            <a
              href="#question"
              className="px-8 py-4 transition-all hover:opacity-90"
              style={{ 
                backgroundColor: 'white',
                color: 'var(--navy-900)',
                border: '1px solid var(--navy-900)'
              }}
            >
              질문하기
            </a>
          </div>

          <p className="text-sm opacity-40" style={{ color: 'var(--navy-900)' }}>
            상업적 치료 유도 없이, 데이터 기반 정보만 제공합니다.
          </p>
        </div>
      </section>

      {/* Survey Section */}
      <section id="survey" className="py-20 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[800px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-12 text-center tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            현재 상황을 선택해주세요
          </h2>

          {!patientType ? (
            <div className="bg-white p-8 lg:p-12">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-60" style={{ color: 'var(--navy-900)' }}>
                    {surveyStep + 1} / {surveyQuestions.length}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      backgroundColor: 'var(--navy-900)',
                      width: `${((surveyStep + 1) / surveyQuestions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="mb-8">
                <h3 className="text-xl mb-6" style={{ color: 'var(--navy-900)' }}>
                  {surveyQuestions[surveyStep].question}
                </h3>
                <div className="space-y-3">
                  {surveyQuestions[surveyStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSurveyAnswer(surveyQuestions[surveyStep].id, option)}
                      className="w-full p-4 text-left transition-all border hover:border-current"
                      style={{ 
                        borderColor: surveyAnswers[surveyQuestions[surveyStep].id] === option 
                          ? 'var(--navy-900)' 
                          : '#e5e7eb',
                        backgroundColor: surveyAnswers[surveyQuestions[surveyStep].id] === option
                          ? 'var(--navy-50)'
                          : 'white',
                        color: 'var(--navy-900)'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {surveyAnswers[surveyQuestions[surveyStep].id] === option && (
                          <Check className="w-5 h-5" style={{ color: 'var(--navy-900)' }} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Previous Button */}
              {surveyStep > 0 && (
                <button
                  onClick={() => setSurveyStep(surveyStep - 1)}
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--navy-900)' }}
                >
                  ← 이전 질문
                </button>
              )}
            </div>
          ) : (
            /* Survey Result */
            <div className="bg-white p-8 lg:p-12">
              <div className="text-center mb-12">
                <div 
                  className="inline-block px-6 py-2 mb-4 text-sm text-white"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  진단 결과
                </div>
                <h3 className="text-2xl lg:text-3xl mb-4" style={{ color: 'var(--navy-900)' }}>
                  {currentGuide?.title}
                </h3>
                <p className="text-lg opacity-60" style={{ color: 'var(--navy-900)' }}>
                  {currentGuide?.description}
                </p>
              </div>

              {/* Guide Content */}
              <div className="space-y-12">
                {/* Key Decisions */}
                <div>
                  <h4 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--navy-900)' }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: 'var(--navy-900)' }}>1</span>
                    지금 가장 중요한 결정 3가지
                  </h4>
                  <div className="space-y-3">
                    {currentGuide?.decisions.map((decision, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4" style={{ backgroundColor: 'var(--navy-50)' }}>
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--navy-900)' }} />
                        <span style={{ color: 'var(--navy-900)' }}>{decision}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Mistakes */}
                <div>
                  <h4 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--navy-900)' }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: 'var(--navy-900)' }}>2</span>
                    환자가 가장 많이 실수하는 부분
                  </h4>
                  <div className="space-y-3">
                    {currentGuide?.mistakes.map((mistake, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 border-l-4" style={{ borderColor: '#ef4444', backgroundColor: '#fef2f2' }}>
                        <span className="text-red-500">⚠</span>
                        <span style={{ color: 'var(--navy-900)' }}>{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist */}
                <div>
                  <h4 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--navy-900)' }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: 'var(--navy-900)' }}>3</span>
                    보호자가 꼭 확인해야 할 체크리스트
                  </h4>
                  <div className="space-y-2">
                    {currentGuide?.checklist.map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-5 h-5" style={{ accentColor: 'var(--navy-900)' }} />
                        <span style={{ color: 'var(--navy-900)' }}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Questions to Ask */}
                <div>
                  <h4 className="text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--navy-900)' }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{ backgroundColor: 'var(--navy-900)' }}>4</span>
                    병원 선택 시 반드시 질문해야 할 5가지
                  </h4>
                  <div className="space-y-3">
                    {currentGuide?.questions.map((question, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 border" style={{ borderColor: 'var(--navy-200)' }}>
                        <span className="flex-shrink-0 font-semibold" style={{ color: 'var(--navy-900)' }}>Q{idx + 1}</span>
                        <span style={{ color: 'var(--navy-900)' }}>{question}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="text-center mt-12">
                <button
                  onClick={resetSurvey}
                  className="px-8 py-3 text-sm border transition-all hover:opacity-70"
                  style={{ 
                    borderColor: 'var(--navy-900)',
                    color: 'var(--navy-900)'
                  }}
                >
                  다시 진단하기
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Patient Journey Section */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-12 text-center tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            치료 단계별 핵심 안내
          </h2>

          {/* Journey Stages */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex items-center gap-0 min-w-max pb-4">
              {journeyStages.map((journey, idx) => (
                <React.Fragment key={idx}>
                  <button
                    onClick={() => setSelectedJourney(idx)}
                    className="px-8 py-4 transition-all min-w-[140px]"
                    style={{
                      backgroundColor: selectedJourney === idx ? 'var(--navy-900)' : 'white',
                      color: selectedJourney === idx ? 'white' : 'var(--navy-900)',
                      border: selectedJourney === idx ? 'none' : '1px solid var(--navy-200)'
                    }}
                  >
                    <div className="text-lg font-medium">{journey.stage}</div>
                  </button>
                  {idx < journeyStages.length - 1 && (
                    <ChevronRight className="w-6 h-6 mx-2 flex-shrink-0" style={{ color: 'var(--navy-300)' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Journey Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 border" style={{ borderColor: 'var(--navy-200)' }}>
              <h4 className="text-sm font-semibold mb-2 opacity-60" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].key}
              </h4>
              <p className="text-lg" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].value}
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: 'var(--navy-200)' }}>
              <h4 className="text-sm font-semibold mb-2 opacity-60" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].duration}
              </h4>
              <p className="text-lg" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].durationValue}
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: 'var(--navy-200)' }}>
              <h4 className="text-sm font-semibold mb-2 opacity-60" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].cost}
              </h4>
              <p className="text-lg" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].costValue}
              </p>
            </div>
            <div className="p-8 border" style={{ borderColor: 'var(--navy-200)' }}>
              <h4 className="text-sm font-semibold mb-2 opacity-60" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].anxiety}
              </h4>
              <p className="text-lg" style={{ color: 'var(--navy-900)' }}>
                {journeyStages[selectedJourney].anxietyValue}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[1000px] mx-auto">
          <h2 
            className="text-3xl lg:text-4xl mb-12 text-center tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            환자들이 가장 많이 묻는 질문
          </h2>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" style={{ color: 'var(--navy-900)' }} />
              <input
                type="text"
                placeholder="궁금한 내용을 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border focus:outline-none focus:border-current"
                style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {faqCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFaqCategory(category)}
                className="px-4 py-2 text-sm whitespace-nowrap transition-all"
                style={{
                  backgroundColor: faqCategory === category ? 'var(--navy-900)' : 'white',
                  color: faqCategory === category ? 'white' : 'var(--navy-900)',
                  border: faqCategory === category ? 'none' : '1px solid var(--navy-200)'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white border" style={{ borderColor: 'var(--navy-200)' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="text-xs font-semibold mb-2 opacity-60" style={{ color: 'var(--navy-900)' }}>
                      {faq.category}
                    </div>
                    <div className="text-lg" style={{ color: 'var(--navy-900)' }}>
                      {faq.question}
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 flex-shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                    style={{ color: 'var(--navy-900)' }}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t" style={{ borderColor: 'var(--navy-100)' }}>
                    <p className="leading-relaxed opacity-80" style={{ color: 'var(--navy-900)' }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 opacity-60" style={{ color: 'var(--navy-900)' }}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* Question Form Section */}
      <section id="question" className="py-20 px-8 lg:px-16 text-white" style={{ backgroundColor: 'var(--navy-900)' }}>
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-3xl lg:text-4xl mb-4 text-center tracking-tight">
            직접 질문하기
          </h2>
          <p className="text-center opacity-80 mb-12">
            남겨주신 질문은 익명으로 처리되며,<br />
            PVM 데이터 분석에 반영됩니다.
          </p>

          <form onSubmit={handleQuestionSubmit} className="bg-white p-8 lg:p-12 text-gray-900">
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  구분 *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="환자"
                        checked={questionForm.role === '환자'}
                        onChange={(e) => setQuestionForm({ ...questionForm, role: e.target.value })}
                        required
                        className="sr-only"
                      />
                      <div 
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{ 
                          borderColor: 'var(--navy-900)',
                          backgroundColor: questionForm.role === '환자' ? 'var(--navy-900)' : 'white'
                        }}
                      >
                        {questionForm.role === '환자' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                    <span style={{ color: 'var(--navy-900)' }}>환자</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="radio"
                        name="role"
                        value="보호자"
                        checked={questionForm.role === '보호자'}
                        onChange={(e) => setQuestionForm({ ...questionForm, role: e.target.value })}
                        required
                        className="sr-only"
                      />
                      <div 
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                        style={{ 
                          borderColor: 'var(--navy-900)',
                          backgroundColor: questionForm.role === '보호자' ? 'var(--navy-900)' : 'white'
                        }}
                      >
                        {questionForm.role === '보호자' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </div>
                    <span style={{ color: 'var(--navy-900)' }}>보호자</span>
                  </label>
                </div>
              </div>

              {/* Cancer Type */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  암 종류 *
                </label>
                <select
                  value={questionForm.cancerType}
                  onChange={(e) => setQuestionForm({ ...questionForm, cancerType: e.target.value })}
                  required
                  className="w-full p-3 border focus:outline-none focus:border-current"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                >
                  <option value="">선택해주세요</option>
                  <option value="위암">위암</option>
                  <option value="대장암">대장암</option>
                  <option value="폐암">폐암</option>
                  <option value="간암">간암</option>
                  <option value="유방암">유방암</option>
                  <option value="갑상선암">갑상선암</option>
                  <option value="전립선암">전립선암</option>
                  <option value="췌장암">췌장암</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              {/* Treatment Stage */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  현재 치료 단계 *
                </label>
                <select
                  value={questionForm.stage}
                  onChange={(e) => setQuestionForm({ ...questionForm, stage: e.target.value })}
                  required
                  className="w-full p-3 border focus:outline-none focus:border-current"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                >
                  <option value="">선택해주세요</option>
                  <option value="진단 직후">진단 직후</option>
                  <option value="수술 전후">수술 전후</option>
                  <option value="항암 중">항암 중</option>
                  <option value="치료 종료 후">치료 종료 후</option>
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  지역 (선택)
                </label>
                <input
                  type="text"
                  value={questionForm.region}
                  onChange={(e) => setQuestionForm({ ...questionForm, region: e.target.value })}
                  placeholder="예: 서울, 경기, 부산 등"
                  className="w-full p-3 border focus:outline-none focus:border-current"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                />
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  질문 내용 *
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                  required
                  rows={6}
                  placeholder="궁금하신 내용을 자유롭게 작성해주세요"
                  className="w-full p-3 border focus:outline-none focus:border-current resize-none"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  연락처 (선택)
                </label>
                <input
                  type="tel"
                  value={questionForm.phone}
                  onChange={(e) => setQuestionForm({ ...questionForm, phone: e.target.value })}
                  placeholder="답변 받으실 연락처"
                  className="w-full p-3 border focus:outline-none focus:border-current"
                  style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--navy-900)' }}>
                  이메일 *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" style={{ color: 'var(--navy-900)' }} />
                  <input
                    type="email"
                    value={questionForm.email}
                    onChange={(e) => setQuestionForm({ ...questionForm, email: e.target.value })}
                    required
                    placeholder="답변 받으실 이메일"
                    className="w-full pl-11 pr-3 py-3 border focus:outline-none focus:border-current"
                    style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-900)' }}
                  />
                </div>
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={questionForm.consent}
                      onChange={(e) => setQuestionForm({ ...questionForm, consent: e.target.checked })}
                      required
                      className="sr-only"
                    />
                    <div 
                      className="w-5 h-5 border-2 flex items-center justify-center"
                      style={{ 
                        borderColor: 'var(--navy-900)',
                        backgroundColor: questionForm.consent ? 'var(--navy-900)' : 'white'
                      }}
                    >
                      {questionForm.consent && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--navy-900)' }}>
                    개인정보 수집 및 이용에 동의합니다. (수집 항목: 이메일, 암 종류, 치료 단계, 지역 / 목적: 질문 답변 및 PVM 데이터 분석 / 보관 기간: 3년)
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 text-white transition-all hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                질문 보내기
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <h2 
            className="text-2xl lg:text-3xl mb-4 tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            병원 관계자이신가요?
          </h2>
          <p className="text-lg opacity-60 mb-8" style={{ color: 'var(--navy-900)' }}>
            환자 데이터를 기반으로 의료 전략을 설계합니다.
          </p>
          <Link
            to="/consultation"
            className="inline-block px-8 py-4 text-white transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--navy-900)' }}
          >
            전략 컨설팅 문의
          </Link>
        </div>
      </section>
    </div>
  );
}