import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { fadeIn } from '../lib/motion';

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: readonly FaqItem[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  /** 배경 톤 — 흰색 섹션 위/네이비-50 위 */
  tone?: 'white' | 'navy-50';
}

/**
 * 재사용 FAQ 섹션.
 * - 시각적 Q&A(아코디언) + FAQPage 구조화 데이터(JSON-LD)를 함께 출력
 * - 답변 텍스트는 항상 DOM에 존재(details/summary)하여 검색·AI 크롤러가 읽을 수 있음
 */
export function FaqSection({
  items,
  eyebrow = 'FAQ',
  title = '자주 묻는 질문',
  lead,
  tone = 'navy-50',
}: FaqSectionProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <motion.section
      className="py-28 px-8 lg:px-16"
      style={{ backgroundColor: tone === 'white' ? 'white' : 'var(--navy-50)' }}
      {...fadeIn}
    >
      {/* FAQPage 구조화 데이터 — 검색·AI 인용용 (ld+json은 body 내에 있어도 유효) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-[860px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-wide" style={{ color: 'var(--navy-600)' }}>
            {eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl tracking-tight leading-tight mt-3 mb-5" style={{ color: 'var(--navy-900)' }}>
            {title}
          </h2>
          {lead && (
            <p className="text-lg leading-relaxed" style={{ color: 'var(--navy-600)' }}>
              {lead}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--navy-100)' }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-base font-bold"
                style={{ color: 'var(--navy-900)' }}
              >
                <span>{q}</span>
                <ChevronDown
                  className="w-5 h-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                  style={{ color: 'var(--navy-500)' }}
                />
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy-600)' }}>
                  {a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
