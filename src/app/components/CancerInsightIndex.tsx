import { Link } from 'react-router';
import { TrendingUp, TrendingDown, Minus, ArrowRight, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

interface IndexCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  index: number;
}

function IndexCard({ title, value, trend, description, index }: IndexCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-blue-400" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-gray-400" />;
    return <Minus className="w-5 h-5 text-white" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-blue-400';
    if (trend === 'down') return 'text-gray-400';
    return 'text-white';
  };

  // 강한 상승인지 여부 판단 (value가 80 이상이면 강한 상승)
  const isStrongRise = value >= 80 && trend === 'up';
  
  // 최고 위험 강조 (value가 88 이상)
  const isHighRisk = value >= 88;

  // 미니 스파크라인 데이터 (지난 4주 추이)
  const sparklineData = trend === 'up' 
    ? isStrongRise 
      ? [value - 20, value - 12, value - 6, value] // 급격한 상승
      : [value - 15, value - 10, value - 7, value] // 완만한 상승
    : trend === 'down'
    ? [value + 15, value + 10, value + 7, value]
    : [value - 2, value + 1, value - 1, value];

  const maxValue = Math.max(...sparklineData);
  const minValue = Math.min(...sparklineData);
  const range = maxValue - minValue || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-[#0A1428] rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105 border cursor-pointer ${
        isHighRisk 
          ? 'border-red-500/50 hover:border-red-500 shadow-lg shadow-red-500/10' 
          : 'border-gray-800 hover:border-blue-500/30 hover:shadow-blue-500/20'
      }`}
    >
      <div className="text-gray-400 text-sm mb-3 font-medium">{title}</div>
      <div className="flex items-baseline gap-3 mb-4">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2, type: 'spring' }}
          className="text-6xl font-bold"
          style={{ color: isHighRisk ? '#ef4444' : '#3A6FF8' }}
        >
          {value}
        </motion.span>
        <span className={getTrendColor()}>
          {getTrendIcon()}
        </span>
      </div>
      
      {/* 미니 스파크라인 */}
      <div className="h-8 mb-3 flex items-end gap-1">
        {sparklineData.map((val, i) => {
          const height = ((val - minValue) / range) * 100;
          return (
            <div
              key={i}
              className="flex-1 rounded-t transition-all"
              style={{
                height: `${Math.max(height, 10)}%`,
                backgroundColor: i === sparklineData.length - 1 
                  ? (isHighRisk ? '#ef4444' : '#3A6FF8') 
                  : '#1E3A5F'
              }}
            />
          );
        })}
      </div>
      
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function CancerInsightIndex() {
  const indexData = [
    {
      title: '치료 불안 지수',
      value: 81,
      trend: 'up' as const,
      description: '전이·재발 관련 질문 증가\n항암 지속 여부 및 내성 우려 발언 확대'
    },
    {
      title: '요양 전환 관심',
      value: 69,
      trend: 'up' as const,
      description: '수술 후 회복기 요양병원 문의 증가\n3차병원 이후 연계 치료 탐색 확대'
    },
    {
      title: '부작용 체감 질문',
      value: 84,
      trend: 'up' as const,
      description: '호중구 감소, 복수·흉수, 통증 관리 문의 급증\n항암 중 감염·응급 상황 판단 질문 증가'
    },
    {
      title: '보호자 부담 체감',
      value: 88,
      trend: 'up' as const,
      description: '호스피스·임종 대비 질문 증가\n치료 방향 결정 압박 심화'
    }
  ];

  return (
    <section className="w-full py-16 px-6 lg:px-8" style={{ backgroundColor: '#0E1B3D' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* 타이틀 영역 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">
            WEEKLY PVM INDEX
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            이번 주 암 환자 체감지수
          </h2>
          <p className="text-gray-400 text-lg">
            PVM™ 환자 니즈 분석 DB 기반 주간 인사이트 요약
          </p>
        </motion.div>

        {/* 지수 카드 4개 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {indexData.map((data, index) => (
            <IndexCard key={index} {...data} index={index} />
          ))}
        </div>

        {/* 이번 주 요약 인사이트 */}
        <div className="bg-[#0A1428] rounded-2xl p-8 mb-8 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">이번 주 주요 변화</h3>
          <div className="text-gray-300 leading-relaxed space-y-3">
            <p>
              이번 주는 항암 지속 여부에 대한 불안과<br />
              부작용 관리 공백에 대한 질문이 크게 증가했습니다.
            </p>
            <p>
              특히 보호자의 의사결정 부담과<br />
              요양·완화 전환 고민이 동시에 확대되는 흐름입니다.
            </p>
            <p className="pt-2" style={{ color: '#3A6FF8' }}>
              2차 암병원의 역할은<br />
              치료가 아닌 "관리 안정화"에 집중되어야 하는 구간입니다.
            </p>
            <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-800">
              Last Updated: 2026.02.27
            </p>
          </div>
        </div>

        {/* CTA 버튼 영역 */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Link
            to="/insights"
            className="group inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-sm font-medium transition-all hover:bg-blue-500 border-2 border-white"
            style={{ color: '#0E1B3D' }}
          >
            <span className="group-hover:text-white transition-colors">자세한 리포트 보기</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:text-white transition-colors" />
          </Link>
          <Link
            to="/consultation"
            className="group inline-flex items-center justify-center px-6 py-3 rounded-lg text-white text-sm font-medium transition-all hover:bg-white hover:scale-105 border-2 border-white"
            style={{ backgroundColor: '#3A6FF8' }}
          >
            <span className="group-hover:text-[#0E1B3D] transition-colors">우리 병원 데이터 분석 신청</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:text-[#0E1B3D] transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}