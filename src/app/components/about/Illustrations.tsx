// 소개 페이지 콘텐츠 일러스트 — 스톡 사진 대신 각 서비스의 실제 내용을 그린 브랜드 비주얼.
// 모든 그림은 viewBox 640×400 SVG(16:10 기준), 16:9 컨테이너에서는 위아래가 살짝 잘린다(xMidYMid slice).
// 가짜 수치는 넣지 않는다 — 표기한 숫자는 사이트에 이미 있는 사실(13개 축, 24개 연동, 100,000건+)뿐이다.
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { EASE } from './MotionKit';

const N900 = '#0A1628';
const N800 = '#162540';
const N700 = '#1E3A5F';
const N600 = '#2C5282';
const N500 = '#3A6EA5';
const N400 = '#5B8FC9';
const N300 = '#7FAEDD';
const N200 = '#A3C4ED';
const N100 = '#C7DCFB';
const N50 = '#EBF4FF';

const FONT = "'Pretendard','Apple SD Gothic Neo','Malgun Gothic',sans-serif";

/* 공통 프레임 — 컨테이너를 가득 채우는 SVG + 진입 감지 */
function Art({
  children,
  label,
  dark = false,
}: {
  children: (on: boolean, reduce: boolean) => React.ReactNode;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = !!useReducedMotion();
  const on = inView || reduce;
  return (
    <div ref={ref} className="absolute inset-0" role="img" aria-label={label}>
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        style={{ fontFamily: FONT }}
      >
        <defs>
          <linearGradient id="ls-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={N900} />
            <stop offset="1" stopColor={N700} />
          </linearGradient>
          <linearGradient id="ls-light" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={N50} />
            <stop offset="1" stopColor={N100} />
          </linearGradient>
          <linearGradient id="ls-accent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={N500} />
            <stop offset="1" stopColor={N200} />
          </linearGradient>
          <radialGradient id="ls-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={N400} stopOpacity="0.55" />
            <stop offset="1" stopColor={N400} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill={dark ? 'url(#ls-dark)' : 'url(#ls-light)'} />
        {children(on, reduce)}
      </svg>
    </div>
  );
}

/* 등장 헬퍼 */
const pop = (on: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: on ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
  transition: { duration: 0.8, ease: EASE, delay },
});

/* ── 1. Cancer Hospital Platform — 병원 운영 대시보드 ── */
export function HospitalDashboardArt() {
  const bars = [0.45, 0.62, 0.55, 0.78, 0.7, 0.88, 0.8];
  return (
    <Art label="암 병원 운영 대시보드 일러스트" dark>
      {(on) => (
        <g>
          <motion.g {...pop(on)}>
            <rect x="40" y="36" width="560" height="328" rx="14" fill="#0F1F38" stroke="rgba(255,255,255,0.08)" />
            <circle cx="62" cy="56" r="4" fill="#5B8FC9" opacity="0.6" />
            <circle cx="76" cy="56" r="4" fill="#5B8FC9" opacity="0.4" />
            <circle cx="90" cy="56" r="4" fill="#5B8FC9" opacity="0.25" />
            <text x="112" y="60" fontSize="11" fill={N200} fontWeight="600">Cancer Hospital Platform · 운영 대시보드</text>
            {/* 사이드바 */}
            <rect x="40" y="76" width="112" height="288" fill="rgba(255,255,255,0.03)" />
            {['대시보드', '환자', '입원', '진료', 'KPI'].map((m, i) => (
              <g key={m}>
                <rect x="52" y={92 + i * 34} width="88" height="24" rx="6" fill={i === 0 ? N600 : 'transparent'} />
                <text x="64" y={108 + i * 34} fontSize="11" fill={i === 0 ? '#fff' : N300}>{m}</text>
              </g>
            ))}
          </motion.g>
          {/* KPI 타일 */}
          {['병상 현황', '외래 일정', '재원 관리'].map((t, i) => (
            <motion.g key={t} {...pop(on, 0.2 + i * 0.1)}>
              <rect x={168 + i * 140} y="92" width="128" height="70" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.07)" />
              <text x={182 + i * 140} y="114" fontSize="10.5" fill={N300}>{t}</text>
              <motion.path
                d={`M${182 + i * 140} 146 l18 -8 l18 4 l18 -12 l18 6 l18 -14 l16 4`}
                fill="none"
                stroke={i === 1 ? N200 : N400}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: on ? 1 : 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.5 + i * 0.1 }}
              />
            </motion.g>
          ))}
          {/* 막대 차트 */}
          <motion.g {...pop(on, 0.3)}>
            <rect x="168" y="176" width="268" height="172" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" />
            <text x="182" y="198" fontSize="10.5" fill={N300}>주간 입원 · 외래 추이</text>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="182" x2="422" y1={222 + i * 30} y2={222 + i * 30} stroke="rgba(255,255,255,0.05)" />
            ))}
          </motion.g>
          {bars.map((h, i) => (
            <motion.rect
              key={i}
              x={192 + i * 33}
              y={330 - 100 * h}
              width="18"
              height={100 * h}
              rx="4"
              fill={i === 5 ? N200 : N500}
              style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: on ? 1 : 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.07 }}
            />
          ))}
          {/* 환자 목록 */}
          <motion.g {...pop(on, 0.45)}>
            <rect x="448" y="176" width="140" height="172" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" />
            <text x="462" y="198" fontSize="10.5" fill={N300}>환자 현황</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <circle cx="470" cy={224 + i * 30} r="8" fill={N700} />
                <rect x="484" y={218 + i * 30} width={56 - i * 6} height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
                <rect x="484" y={227 + i * 30} width={36} height="4" rx="2" fill="rgba(255,255,255,0.12)" />
                <rect x="550" y={218 + i * 30} width="28" height="12" rx="6" fill={i === 1 ? N200 : 'rgba(127,174,221,0.25)'} />
              </g>
            ))}
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 2. 환자재활 애플리케이션 — 환자 앱 + 의료진 연동 ── */
export function PatientAppArt() {
  const items = [
    { t: '복약 체크', done: true },
    { t: '걷기 20분', done: true },
    { t: '식단 기록', done: true },
    { t: '컨디션 기록', done: false },
  ];
  const C = 2 * Math.PI * 26;
  return (
    <Art label="환자 케어 앱과 의료진 연동 일러스트">
      {(on, reduce) => (
        <g>
          <circle cx="250" cy="200" r="170" fill="url(#ls-glow)" opacity="0.5" />
          {/* 폰 */}
          <motion.g {...pop(on)}>
            <rect x="160" y="26" width="180" height="348" rx="30" fill={N900} />
            <rect x="170" y="36" width="160" height="328" rx="22" fill="#fff" />
            <rect x="226" y="44" width="48" height="8" rx="4" fill={N900} />
            <text x="186" y="80" fontSize="10" fill={N400} fontWeight="700">HappyLife</text>
            <text x="186" y="98" fontSize="14" fill={N900} fontWeight="800">오늘의 케어</text>
            {/* 진행 링 */}
            <circle cx="250" cy="146" r="26" fill="none" stroke={N50} strokeWidth="8" />
            <motion.circle
              cx="250"
              cy="146"
              r="26"
              fill="none"
              stroke={N500}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={C}
              transform="rotate(-90 250 146)"
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: on ? C * 0.25 : C }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
            />
            <text x="250" y="151" fontSize="13" fill={N900} fontWeight="800" textAnchor="middle">3/4</text>
          </motion.g>
          {items.map((it, i) => (
            <motion.g key={it.t} {...pop(on, 0.35 + i * 0.12)}>
              <rect x="182" y={190 + i * 40} width="136" height="32" rx="9" fill={N50} />
              <circle cx="200" cy={206 + i * 40} r="8" fill={it.done ? N500 : '#fff'} stroke={it.done ? N500 : N200} strokeWidth="1.5" />
              {it.done && (
                <path d={`M196 ${206 + i * 40} l3 3 l5 -6`} fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              )}
              <text x="216" y={210 + i * 40} fontSize="11" fill={N900} fontWeight="600">{it.t}</text>
            </motion.g>
          ))}
          {/* 연동선 */}
          <path d="M340 210 C 380 210, 380 150, 420 150" fill="none" stroke={N200} strokeWidth="2" strokeDasharray="4 5" />
          <path
            d="M340 210 C 380 210, 380 150, 420 150"
            fill="none"
            stroke={N500}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.18 0.82"
            className={reduce ? '' : 'ls-travel'}
          />
          {/* 의료진 카드 */}
          <motion.g {...pop(on, 0.8)}>
            <rect x="420" y="96" width="190" height="122" rx="16" fill="#fff" stroke={N100} />
            <circle cx="446" cy="124" r="13" fill={N900} />
            <path d="M440 124 h12 M446 118 v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <text x="466" y="121" fontSize="10" fill={N400} fontWeight="700">HappyCare</text>
            <text x="466" y="135" fontSize="12" fill={N900} fontWeight="800">담당 의료진</text>
            <rect x="436" y="152" width="158" height="46" rx="12" fill={N50} />
            <text x="448" y="171" fontSize="11" fill={N900} fontWeight="600">오늘 기록 확인했어요.</text>
            <text x="448" y="187" fontSize="11" fill={N600}>다음 외래 때 뵐게요.</text>
          </motion.g>
          <motion.g {...pop(on, 1)}>
            <rect x="420" y="236" width="150" height="30" rx="15" fill={N900} />
            <circle cx="438" cy="251" r="4" fill={N200} />
            <text x="450" y="255" fontSize="11" fill="#fff" fontWeight="700">병원과 실시간 연동</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 3. Space AX Platform — 업무 자동화 흐름 ── */
export function AutomationFlowArt() {
  const ins = ['메일', '카카오 알림톡', '한글 문서'];
  const outs = ['보고서 자동 작성', '네이버웍스 전송', '알림톡 응대'];
  return (
    <Art label="업무 자동화 흐름 일러스트" dark>
      {(on, reduce) => (
        <g>
          <circle cx="320" cy="200" r="150" fill="url(#ls-glow)" />
          <text x="40" y="44" fontSize="11" fill={N300} fontWeight="700" letterSpacing="2">READ</text>
          <text x="306" y="44" fontSize="11" fill={N300} fontWeight="700" letterSpacing="2">AI</text>
          <text x="520" y="44" fontSize="11" fill={N300} fontWeight="700" letterSpacing="2">EXPORT</text>
          {ins.map((t, i) => {
            const y = 110 + i * 90;
            const d = `M150 ${y} C 220 ${y}, 230 200, 280 200`;
            return (
              <g key={t}>
                <path d={d} fill="none" stroke="rgba(163,196,237,0.25)" strokeWidth="2" />
                <path d={d} fill="none" stroke={N200} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="0.16 0.84"
                  className={reduce ? '' : 'ls-travel'} style={{ animationDelay: `${i * 0.5}s` }} />
                <motion.g {...pop(on, 0.1 + i * 0.1)}>
                  <rect x="36" y={y - 18} width="114" height="36" rx="18" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" />
                  <text x="93" y={y + 4} fontSize="12" fill="#fff" fontWeight="600" textAnchor="middle">{t}</text>
                </motion.g>
              </g>
            );
          })}
          {outs.map((t, i) => {
            const y = 110 + i * 90;
            const d = `M360 200 C 410 200, 420 ${y}, 490 ${y}`;
            return (
              <g key={t}>
                <path d={d} fill="none" stroke="rgba(163,196,237,0.25)" strokeWidth="2" />
                <path d={d} fill="none" stroke={N200} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="0.16 0.84"
                  className={reduce ? '' : 'ls-travel'} style={{ animationDelay: `${1.4 + i * 0.5}s` }} />
                <motion.g {...pop(on, 0.5 + i * 0.1)}>
                  <rect x="490" y={y - 18} width="124" height="36" rx="18" fill="#fff" />
                  <text x="552" y={y + 4} fontSize="12" fill={N900} fontWeight="700" textAnchor="middle">{t}</text>
                </motion.g>
              </g>
            );
          })}
          <motion.g {...pop(on, 0.3)}>
            <circle cx="320" cy="200" r="52" fill={N500} className={reduce ? '' : 'ls-ping'} opacity="0.35" />
            <circle cx="320" cy="200" r="46" fill="url(#ls-accent)" />
            <text x="320" y="196" fontSize="15" fill="#fff" fontWeight="800" textAnchor="middle">AI</text>
            <text x="320" y="215" fontSize="10.5" fill="#fff" textAnchor="middle">요약 · 분류</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 4. 자체 AI 분석 시스템 — 13개 축 레이더 ── */
export function RadarArt() {
  const N = 13;
  const cx = 300;
  const cy = 200;
  const R = 140;
  const vals = [0.82, 0.64, 0.9, 0.55, 0.74, 0.6, 0.86, 0.5, 0.7, 0.92, 0.58, 0.78, 0.66];
  const pt = (i: number, r: number) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const ring = (k: number) => Array.from({ length: N }, (_, i) => pt(i, R * k).join(',')).join(' ');
  const data = vals.map((v, i) => pt(i, R * v).join(',')).join(' ');
  return (
    <Art label="13개 축 분석 레이더 차트 일러스트">
      {(on) => (
        <g>
          <circle cx={cx} cy={cy} r="180" fill="url(#ls-glow)" opacity="0.6" />
          {[0.33, 0.66, 1].map((k) => (
            <polygon key={k} points={ring(k)} fill="none" stroke={N100} strokeWidth="1.2" />
          ))}
          {Array.from({ length: N }, (_, i) => {
            const [x, y] = pt(i, R);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={N100} strokeWidth="1" />;
          })}
          <motion.polygon
            points={data}
            fill="rgba(58,110,165,0.28)"
            stroke={N500}
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={on ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
          />
          {vals.map((v, i) => {
            const [x, y] = pt(i, R * v);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="4.5"
                fill="#fff"
                stroke={N600}
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              />
            );
          })}
          <motion.g {...pop(on, 0.6)}>
            <rect x="468" y="120" width="138" height="56" rx="14" fill={N900} />
            <text x="484" y="143" fontSize="10.5" fill={N300} fontWeight="700">PVM ANALYSIS</text>
            <text x="484" y="163" fontSize="15" fill="#fff" fontWeight="800">13개 분석 축</text>
          </motion.g>
          <motion.g {...pop(on, 0.8)}>
            <rect x="468" y="190" width="138" height="56" rx="14" fill="#fff" stroke={N100} />
            <text x="484" y="213" fontSize="10.5" fill={N400} fontWeight="700">MONTHLY</text>
            <text x="484" y="233" fontSize="13" fill={N900} fontWeight="800">리포트 자동 발행</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 5. HappyLifeCare SaaS — 병원용·환자용 듀얼 + 24개 연동 ── */
export function DualAppArt() {
  return (
    <Art label="병원용 대시보드와 환자 앱 실시간 연동 일러스트" dark>
      {(on, reduce) => (
        <g>
          <circle cx="320" cy="200" r="160" fill="url(#ls-glow)" opacity="0.7" />
          {/* 병원용 */}
          <motion.g {...pop(on)}>
            <rect x="34" y="78" width="250" height="176" rx="12" fill="#0F1F38" stroke="rgba(255,255,255,0.1)" />
            <rect x="34" y="78" width="250" height="24" rx="12" fill="rgba(255,255,255,0.05)" />
            <text x="50" y="95" fontSize="10.5" fill={N200} fontWeight="700">HappyCare · 병원용</text>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={50 + i * 76} y="114" width="68" height="44" rx="8" fill="rgba(255,255,255,0.05)" />
            ))}
            {[0.5, 0.75, 0.6, 0.9, 0.7, 0.82].map((h, i) => (
              <rect key={i} x={54 + i * 36} y={238 - 60 * h} width="20" height={60 * h} rx="3" fill={i === 3 ? N200 : N500} />
            ))}
            <rect x="140" y="254" width="38" height="16" fill="#0F1F38" />
            <rect x="110" y="270" width="98" height="6" rx="3" fill="rgba(255,255,255,0.12)" />
          </motion.g>
          {/* 환자용 */}
          <motion.g {...pop(on, 0.2)}>
            <rect x="462" y="44" width="140" height="280" rx="24" fill="#05101F" stroke="rgba(255,255,255,0.14)" />
            <rect x="472" y="54" width="120" height="260" rx="17" fill="#fff" />
            <text x="484" y="82" fontSize="10" fill={N400} fontWeight="700">HappyLife · 환자용</text>
            <text x="484" y="100" fontSize="13" fill={N900} fontWeight="800">나의 케어</text>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x="482" y={114 + i * 44} width="100" height="34" rx="9" fill={N50} />
                <circle cx="497" cy={131 + i * 44} r="6" fill={i < 3 ? N500 : N100} />
                <rect x="510" y={126 + i * 44} width={52 - i * 4} height="5" rx="2.5" fill={N300} />
                <rect x="510" y={135 + i * 44} width="34" height="4" rx="2" fill={N100} />
              </g>
            ))}
          </motion.g>
          {/* 연동선 */}
          {[120, 170, 220].map((y, i) => {
            const d = `M284 ${y} C 360 ${y - 30}, 390 ${y + 30}, 462 ${y}`;
            return (
              <g key={y}>
                <path d={d} fill="none" stroke="rgba(163,196,237,0.22)" strokeWidth="2" />
                <path d={d} fill="none" stroke={i === 1 ? '#fff' : N200} strokeWidth="3" strokeLinecap="round" pathLength={1}
                  strokeDasharray="0.12 0.88" className={reduce ? '' : 'ls-travel'}
                  style={{ animationDelay: `${i * 0.7}s`, animationDirection: i === 1 ? 'reverse' : 'normal' }} />
              </g>
            );
          })}
          <motion.g {...pop(on, 0.6)}>
            <rect x="300" y="290" width="148" height="34" rx="17" fill="#fff" />
            <circle cx="320" cy="307" r="5" fill={N500} className={reduce ? '' : 'ls-ping'} />
            <circle cx="320" cy="307" r="4" fill={N500} />
            <text x="334" y="311" fontSize="12" fill={N900} fontWeight="800">24개 실시간 연동</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 6. AI 암상담 시스템 — 근거 기반 채팅 ── */
export function ChatArt() {
  return (
    <Art label="근거 문서를 참조해 답하는 AI 상담 채팅 일러스트">
      {(on, reduce) => (
        <g>
          <circle cx="320" cy="200" r="190" fill="url(#ls-glow)" opacity="0.45" />
          <motion.g {...pop(on)}>
            <rect x="110" y="28" width="420" height="344" rx="20" fill="#fff" stroke={N100} />
            <rect x="110" y="28" width="420" height="50" rx="20" fill={N900} />
            <rect x="110" y="60" width="420" height="18" fill={N900} />
            <circle cx="138" cy="53" r="12" fill="url(#ls-accent)" />
            <text x="132" y="57" fontSize="10" fill="#fff" fontWeight="800">AI</text>
            <text x="160" y="51" fontSize="12.5" fill="#fff" fontWeight="800">AI 암상담</text>
            <text x="160" y="66" fontSize="10" fill={N300}>24시간 응대 · RAG</text>
          </motion.g>
          {/* 질문 */}
          <motion.g {...pop(on, 0.35)}>
            <rect x="268" y="96" width="240" height="40" rx="14" fill={N500} />
            <text x="282" y="121" fontSize="12" fill="#fff" fontWeight="600">항암 치료 중 식사는 어떻게 하나요?</text>
          </motion.g>
          {/* 답변 */}
          <motion.g {...pop(on, 0.75)}>
            <rect x="132" y="152" width="300" height="104" rx="14" fill={N50} />
            <rect x="148" y="170" width="250" height="7" rx="3.5" fill={N200} />
            <rect x="148" y="186" width="268" height="7" rx="3.5" fill={N200} />
            <rect x="148" y="202" width="214" height="7" rx="3.5" fill={N200} />
            <rect x="148" y="226" width="108" height="20" rx="10" fill="#fff" stroke={N200} />
            <path d="M158 231 h8 v10 h-8 z M160 234 h4 M160 237 h4" fill="none" stroke={N500} strokeWidth="1.2" />
            <text x="172" y="240" fontSize="10" fill={N600} fontWeight="700">근거 문서 2건</text>
          </motion.g>
          {/* 입력 중 */}
          <motion.g {...pop(on, 1.1)}>
            <rect x="132" y="272" width="74" height="34" rx="14" fill={N50} />
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={154 + i * 15}
                cy="289"
                r="4"
                fill={N400}
                animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.g>
          <rect x="132" y="322" width="376" height="34" rx="17" fill="#fff" stroke={N100} />
          <text x="150" y="343" fontSize="11" fill={N300}>궁금한 점을 물어보세요</text>
          <circle cx="490" cy="339" r="12" fill={N900} />
          <path d="M485 339 h9 m-4 -4 l4 4 l-4 4" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </Art>
  );
}

/* ── 7. AI 최적화 웹사이트 — 웹페이지 + 구조화 데이터 ── */
export function SchemaArt() {
  const code: [string, string, string][] = [
    ['{', '', ''],
    ['  "@type"', ': ', '"MedicalClinic"'],
    ['  "name"', ': ', '"○○병원"'],
    ['  "medicalSpecialty"', ': ', '[…]'],
    ['  "availableService"', ': ', '[…]'],
    ['  "faq"', ': ', '[…]'],
    ['}', '', ''],
  ];
  return (
    <Art label="웹페이지와 AI가 읽는 구조화 데이터 일러스트">
      {(on, reduce) => (
        <g>
          {/* 브라우저 */}
          <motion.g {...pop(on)}>
            <rect x="40" y="40" width="340" height="300" rx="14" fill="#fff" stroke={N100} />
            <rect x="40" y="40" width="340" height="30" rx="14" fill={N50} />
            <rect x="40" y="58" width="340" height="12" fill={N50} />
            <circle cx="58" cy="55" r="4" fill={N200} />
            <circle cx="72" cy="55" r="4" fill={N200} />
            <rect x="90" y="48" width="200" height="14" rx="7" fill="#fff" />
            <rect x="56" y="86" width="308" height="86" rx="10" fill={N900} />
            <rect x="72" y="106" width="150" height="10" rx="5" fill="#fff" />
            <rect x="72" y="124" width="110" height="10" rx="5" fill={N300} />
            <rect x="72" y="146" width="62" height="14" rx="7" fill={N500} />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={56 + i * 106} y="186" width="96" height="62" rx="9" fill={N50} />
            ))}
            {[0, 1, 2].map((i) => (
              <rect key={i} x="56" y={262 + i * 22} width={300 - i * 50} height="9" rx="4.5" fill={N100} />
            ))}
          </motion.g>
          {/* AI가 읽는 스캔 라인 */}
          {!reduce && (
            <motion.rect
              x="40"
              width="340"
              height="40"
              fill="url(#ls-accent)"
              opacity="0.16"
              initial={{ y: 70 }}
              animate={on ? { y: [70, 300, 70] } : { y: 70 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {/* 코드 카드 */}
          <motion.g {...pop(on, 0.4)}>
            <rect x="330" y="96" width="276" height="196" rx="14" fill={N900} />
            <text x="348" y="122" fontSize="10" fill={N300} fontWeight="700" letterSpacing="1.5">JSON-LD · Schema.org</text>
            {code.map(([k, s, v], i) => (
              <text key={i} x="348" y={150 + i * 19} fontSize="11.5" fontFamily="'SF Mono',Consolas,monospace">
                <tspan fill="#8FB8F0">{k}</tspan>
                <tspan fill="#6B7B93">{s}</tspan>
                <tspan fill="#9BE3B4">{v}</tspan>
              </text>
            ))}
          </motion.g>
          <motion.g {...pop(on, 0.8)}>
            <rect x="452" y="308" width="154" height="34" rx="17" fill="#fff" stroke={N100} />
            <path d="M472 316 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill={N500} />
            <text x="488" y="330" fontSize="12" fill={N900} fontWeight="800">AI 검색 인용</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 8. 환자 분석 데이터베이스 — 후기 → 구조화 ── */
export function DataGridArt() {
  const cols = 5;
  const rows = 6;
  return (
    <Art label="환자 후기가 데이터로 구조화되는 일러스트" dark>
      {(on, reduce) => (
        <g>
          <circle cx="420" cy="200" r="170" fill="url(#ls-glow)" opacity="0.6" />
          {/* 흘러드는 후기 카드 */}
          {[0, 1, 2].map((i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={
                reduce || !on
                  ? { opacity: on ? 1 : 0, x: 0 }
                  : { opacity: [0, 1, 1, 0], x: [-30, 0, 40, 80] }
              }
              transition={reduce ? { duration: 0.6 } : { duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }}
            >
              <rect x="40" y={110 + i * 64} width="150" height="48" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" />
              <circle cx="60" cy={134 + i * 64} r="9" fill={N600} />
              <rect x="76" y={126 + i * 64} width="96" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
              <rect x="76" y={137 + i * 64} width="70" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
            </motion.g>
          ))}
          <text x="40" y="92" fontSize="11" fill={N300} fontWeight="700" letterSpacing="1.5">환자 후기</text>
          {/* 그리드 */}
          <motion.g {...pop(on, 0.2)}>
            <rect x="262" y="70" width="340" height="270" rx="14" fill="#0F1F38" stroke="rgba(255,255,255,0.1)" />
            {Array.from({ length: cols }, (_, c) => (
              <rect key={c} x={280 + c * 62} y="88" width="50" height="16" rx="8" fill={N600} />
            ))}
          </motion.g>
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              const hot = (r * 3 + c * 2) % 7 === 0;
              return (
                <motion.rect
                  key={`${r}-${c}`}
                  x={280 + c * 62}
                  y={118 + r * 34}
                  width="50"
                  height="22"
                  rx="5"
                  fill={hot ? N300 : 'rgba(127,174,221,0.16)'}
                  initial={{ opacity: 0 }}
                  animate={
                    reduce || !on
                      ? { opacity: on ? 1 : 0 }
                      : hot
                        ? { opacity: [0.4, 1, 0.4] }
                        : { opacity: 1 }
                  }
                  transition={
                    hot && !reduce
                      ? { duration: 2.4, repeat: Infinity, delay: (r + c) * 0.15 }
                      : { duration: 0.5, delay: 0.4 + (r + c) * 0.04 }
                  }
                />
              );
            }),
          )}
          <motion.g {...pop(on, 0.7)}>
            <rect x="40" y="312" width="190" height="38" rx="19" fill="#fff" />
            <text x="135" y="336" fontSize="13" fill={N900} fontWeight="800" textAnchor="middle">100,000건+ 구조화</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}

/* ── 9. 제주 AI 개발 커뮤니티 — 제주 섬 위 네트워크 ── */
export function JejuNetworkArt() {
  const nodes: [number, number][] = [
    [170, 205], [228, 168], [262, 236], [318, 190], [360, 150], [384, 238],
    [436, 196], [474, 160], [500, 232], [292, 276], [420, 286], [212, 260],
  ];
  const links: [number, number][] = [
    [0, 1], [1, 3], [0, 11], [11, 2], [2, 3], [3, 4], [4, 7], [3, 5], [5, 6],
    [6, 7], [6, 8], [2, 9], [9, 5], [5, 10], [10, 8], [1, 2],
  ];
  return (
    <Art label="제주 AI 개발 커뮤니티 네트워크 일러스트" dark>
      {(on, reduce) => (
        <g>
          <circle cx="330" cy="215" r="200" fill="url(#ls-glow)" opacity="0.6" />
          {/* 섬 */}
          <motion.path
            d="M110 220 C 120 170, 190 132, 270 122 C 350 112, 450 120, 520 150 C 572 172, 584 214, 556 248 C 520 290, 430 312, 330 314 C 230 316, 140 296, 116 258 C 108 246, 108 232, 110 220 Z"
            fill="rgba(127,174,221,0.12)"
            stroke={N400}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
          {/* 한라산 */}
          <path d="M318 214 l14 -22 l14 22 z" fill={N700} stroke={N300} strokeWidth="1" opacity="0.9" />
          {links.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke={N200}
              strokeWidth="1.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={on ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.6 + i * 0.05 }}
            />
          ))}
          {nodes.map(([x, y], i) => (
            <g key={i}>
              {i % 3 === 0 && (
                <circle cx={x} cy={y} r="7" fill={N300} className={reduce ? '' : 'ls-ping'} style={{ animationDelay: `${i * 0.3}s` }} />
              )}
              <motion.circle
                cx={x}
                cy={y}
                r={i % 3 === 0 ? 7 : 5}
                fill={i % 3 === 0 ? '#fff' : N300}
                initial={{ scale: 0 }}
                animate={{ scale: on ? 1 : 0 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.9 + i * 0.05 }}
              />
            </g>
          ))}
          <motion.g {...pop(on, 1.2)}>
            <rect x="40" y="36" width="186" height="34" rx="17" fill="#fff" />
            <text x="133" y="58" fontSize="12" fill={N900} fontWeight="800" textAnchor="middle">Jeju AI Dev Community</text>
          </motion.g>
        </g>
      )}
    </Art>
  );
}
