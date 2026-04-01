import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Database, TrendingUp, Target, Users, FileText, BarChart3, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export function PvmIntroSection() {
  // 카운터 애니메이션을 위한 커스텀 훅
  const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [isVisible]);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return { count, ref };
  };

  // 데이터 시각화 샘플 데이터
  const emotionData = [
    { stage: '진단', anxiety: 85, hope: 30 },
    { stage: '수술', anxiety: 75, hope: 45 },
    { stage: '항암1', anxiety: 80, hope: 40 },
    { stage: '항암2', anxiety: 70, hope: 50 },
    { stage: '항암3', anxiety: 65, hope: 55 },
    { stage: '회복', anxiety: 50, hope: 70 },
  ];

  const questionFrequency = [
    { category: '부작용', count: 342 },
    { category: '치료기간', count: 298 },
    { category: '비용', count: 256 },
    { category: '식이', count: 234 },
    { category: '재발', count: 189 },
  ];

  const stat1 = useCountUp(128542);
  const stat2 = useCountUp(1000);
  const stat3 = useCountUp(15);
  const stat4 = useCountUp(52);

  return (
    <div className="bg-white">
      {/* 1️⃣ HERO 영역 */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 text-sm tracking-widest" style={{ color: '#0E1B3D', opacity: 0.6 }}>
              INSIGHTS
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 tracking-tight" style={{ color: '#0E1B3D' }}>
              PVM™
            </h1>
            
            <h2 className="text-3xl lg:text-4xl mb-4" style={{ color: '#3A6FF8' }}>
              Patient Voice Matrix
            </h2>
            
            <p className="text-xl mb-8" style={{ color: '#0E1B3D', opacity: 0.7 }}>
              암 환자 니즈 분석 데이터베이스
            </p>
            
            <div className="max-w-4xl space-y-6 text-lg leading-relaxed" style={{ color: '#0E1B3D', opacity: 0.8 }}>
              <p>
                암 환자의 목소리는 병원 안이 아니라 병원 밖에서 가장 솔직하게 드러납니다.<br />
                LS컨설팅은 온라인 커뮤니티, 검색 데이터, 후기, 상담 기록 등에서 수집된 암 환자의 실제 질문과 감정, 선택 기준을 구조화하여 분석합니다.
              </p>
              
              <p className="font-bold">
                PVM™은 단순 설문조사가 아닌<br />
                질환별·치료단계별·증상별·감정패턴별로 매핑된 국내 최대 규모의 암 환자 니즈 분석 DB입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ 데이터 신뢰 수치 영역 */}
      <section className="py-16 px-8 lg:px-16" style={{ backgroundColor: '#0E1B3D' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              ref={stat1.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#3A6FF8' }}>
                {stat1.count.toLocaleString()}+
              </div>
              <div className="text-white opacity-80">
                누적 환자 발화 데이터
              </div>
            </motion.div>

            <motion.div
              ref={stat2.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#3A6FF8' }}>
                {stat2.count.toLocaleString()}+
              </div>
              <div className="text-white opacity-80">
                주간 신규 데이터 분석
              </div>
            </motion.div>

            <motion.div
              ref={stat3.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#3A6FF8' }}>
                {stat3.count}+
              </div>
              <div className="text-white opacity-80">
                다차원 분류 항목
              </div>
            </motion.div>

            <motion.div
              ref={stat4.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl lg:text-6xl font-bold mb-3" style={{ color: '#3A6FF8' }}>
                {stat4.count} Weeks
              </div>
              <div className="text-white opacity-80">
                연간 리서치 아카이브
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ PVM 작동 구조 설명 영역 */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* 왼쪽: 설명 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ color: '#0E1B3D' }}>
                PVM은 어떻게 작동하는가
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: Database, title: '환자 발화 수집', desc: '온라인 커뮤니티, 검색, 후기, 상담 등 다양한 채널에서 실제 환자 목소리 수집' },
                  { icon: BarChart3, title: '텍스트 마이닝 및 감정 분석', desc: 'AI 기반 텍스트 분석으로 질문 의도와 감정 패턴 파악' },
                  { icon: Target, title: '질환·치료·증상 기준 다차원 분류', desc: '15개 이상의 분류 기준으로 환자 니즈를 구조화' },
                  { icon: TrendingUp, title: '반복 질문 및 결핍 구간 도출', desc: '가장 자주 묻는 질문과 정보 공백 영역 식별' },
                  { icon: FileText, title: '병원 전략·콘텐츠·운영 개선안 제시', desc: '데이터 기반 실행 가능한 병원 운영 전략 수립' }
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3A6FF8' }}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: '#0E1B3D' }}>
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-sm opacity-70" style={{ color: '#0E1B3D' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 오른쪽: 시각화 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* 감정 변화 라인 차트 */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-sm font-bold mb-4" style={{ color: '#0E1B3D' }}>
                  치료 단계별 감정 변화 패턴
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={emotionData}>
                    <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="anxiety" stroke="#C41E3A" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="hope" stroke="#3A6FF8" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C41E3A' }}></div>
                    <span>불안도</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3A6FF8' }}></div>
                    <span>희망도</span>
                  </div>
                </div>
              </div>

              {/* 질문 빈도 바 차트 */}
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <h4 className="text-sm font-bold mb-4" style={{ color: '#0E1B3D' }}>
                  카테고리별 질문 빈도
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={questionFrequency} layout="vertical">
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="category" tick={{ fontSize: 12 }} width={70} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {questionFrequency.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="#3A6FF8" opacity={1 - index * 0.15} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4️⃣ 왜 PVM이 병원에 중요한가 */}
      <section className="py-20 px-8 lg:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ color: '#0E1B3D' }}>
            왜 PVM이 병원에 중요한가
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: '환자가 실제 검색하는 질문 파악',
                desc: '병원이 추측하는 것이 아니라, 환자가 진짜 궁금해하는 내용을 데이터로 확인'
              },
              {
                icon: TrendingUp,
                title: '항암 회차별 불안 패턴 분석',
                desc: '치료 단계마다 달라지는 환자의 심리 상태와 정보 니즈 파악'
              },
              {
                icon: Target,
                title: '치료 단계별 서비스 결핍 도출',
                desc: '환자가 가장 많이 질문하는데 병원이 설명하지 못하는 영역 발견'
              },
              {
                icon: BarChart3,
                title: '경쟁 병원 대비 관심 키워드 비교',
                desc: '타 병원 대비 우리 병원이 강조해야 할 차별화 포인트 도출'
              },
              {
                icon: FileText,
                title: '의료서비스 개선 아이디어 데이터화',
                desc: '추상적인 개선 의견이 아닌, 환자 데이터 기반 구체적 액션 플랜 수립'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#EBF4FF' }}>
                  <item.icon className="w-7 h-7" style={{ color: '#3A6FF8' }} />
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#0E1B3D' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-70" style={{ color: '#0E1B3D' }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ 접근 권한 구조 */}
      <section className="py-20 px-8 lg:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 공개 샘플 리포트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0E1B3D' }}>
                공개 샘플 리포트
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: '2026년 2월 폐암 환자 온라인 니즈 분석', link: '/insights/report/202602' },
                  { title: '암 환자는 언제 병원을 바꾸는가', link: '/research/pvm-hospital-switch' },
                  { title: '암환자 질문 유형 기반 병원 운영 실행 보고서', link: '/research/patient-persona-execution' }
                ].map((report, index) => (
                  <Link
                    key={index}
                    to={report.link}
                    className="block p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}>
                          Preview Available
                        </div>
                        <h4 className="font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#0E1B3D' }}>
                          {report.title}
                        </h4>
                      </div>
                      <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: '#0E1B3D' }} />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* 고객 전용 리포트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-full p-8 rounded-xl text-white" style={{ backgroundColor: '#0E1B3D' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Client Access Only</h3>
                </div>
                
                <p className="text-lg leading-relaxed opacity-90 mb-8">
                  고객 병원은 로그인 후 자사 환자 VoC 심층 분석 리포트에 접근할 수 있습니다.
                </p>
                
                <div className="space-y-4 mb-8 opacity-80 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span>병원별 맞춤 환자 니즈 분석</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span>월간 업데이트 트렌드 리포트</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span>경쟁 병원 키워드 비교 분석</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                    <span>실행 가능한 전략 제안</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Link
                    to="/consultation"
                    className="block px-6 py-4 rounded-lg text-center font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#3A6FF8' }}
                  >
                    AI 병원진단 신청하기
                  </Link>
                  <button className="px-6 py-4 rounded-lg border-2 border-white/30 text-center font-bold hover:bg-white/10 transition-all">
                    로그인
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ 하단 강조 메시지 */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0E1B3D' }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-3xl lg:text-4xl leading-relaxed text-white font-bold">
              "환자 니즈를 모르면<br className="md:hidden" /> 의료서비스는 완성될 수 없습니다.<br />
              <span style={{ color: '#3A6FF8' }}>PVM™은 병원의 전략을<br className="md:hidden" /> 환자의 언어로 재설계합니다.</span>"
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
