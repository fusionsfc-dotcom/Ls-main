'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PatientVoiceCard, type PatientVoice } from './PatientVoiceCard';

type VoiceCarouselProps = {
  voices: PatientVoice[];
};

export function VoiceCarousel({ voices }: VoiceCarouselProps) {
  const [index, setIndex] = useState(0);
  const n = voices.length;
  const prev = () => setIndex((i) => (i - 1 + n) % n);
  const next = () => setIndex((i) => (i + 1) % n);

  if (n === 0) return null;

  return (
    <div>
      <div className="hidden sm:block relative">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="shrink-0 rounded-full border border-gray-200 p-2 hover:bg-gray-50 text-gray-700"
            aria-label="이전 목소리"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <PatientVoiceCard voice={voices[index]} />
          </div>
          <button
            type="button"
            onClick={next}
            className="shrink-0 rounded-full border border-gray-200 p-2 hover:bg-gray-50 text-gray-700"
            aria-label="다음 목소리"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-center gap-1.5 mt-4">
          {voices.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#185FA5]' : 'w-1.5 bg-gray-300'}`}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="sm:hidden flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scroll-smooth">
        {voices.map((v, i) => (
          <div key={v.id ?? `v-${i}`} className="min-w-[min(100%,320px)] snap-center shrink-0">
            <PatientVoiceCard voice={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
