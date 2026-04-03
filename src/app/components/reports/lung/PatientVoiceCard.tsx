export type PatientVoice = {
  id?: string;
  text: string;
  category: string;
  tags: string[];
  emotion: string;
};

type PatientVoiceCardProps = {
  voice: PatientVoice;
};

export function PatientVoiceCard({ voice }: PatientVoiceCardProps) {
  return (
    <blockquote
      className="rounded-r-xl border border-blue-100 border-l-4 border-l-[#185FA5] bg-blue-50 p-4 shadow-none"
      style={{ backgroundColor: '#EFF6FF' }}
    >
      <div className="text-3xl leading-none text-[#185FA5]/40 font-serif mb-2" aria-hidden>
        &ldquo;
      </div>
      <p className="text-sm sm:text-[15px] text-gray-800 leading-relaxed italic mb-4">{voice.text}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#185FA5] bg-white/80 border border-blue-100 rounded-full px-2.5 py-0.5">
          {voice.category}
        </span>
        {voice.emotion ? (
          <span className="text-[11px] font-medium text-gray-600 bg-white/60 rounded-full px-2.5 py-0.5 border border-gray-100">
            {voice.emotion}
          </span>
        ) : null}
        {voice.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] text-gray-500 bg-gray-50 rounded-full px-2 py-0.5 border border-gray-100"
          >
            {t}
          </span>
        ))}
      </div>
    </blockquote>
  );
}
