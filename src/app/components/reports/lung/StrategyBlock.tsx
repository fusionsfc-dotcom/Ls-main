import { PatientVoiceCard, type PatientVoice } from './PatientVoiceCard';

type StrategyBlockProps = {
  type: string;
  title: string;
  body: string;
  voice?: string;
  borderColor: string;
  labelColor: string;
};

function voiceToCard(voice: string): PatientVoice {
  let t = voice.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    t = t.slice(1, -1);
  }
  return {
    text: t,
    category: 'PVM 인용',
    tags: [],
    emotion: '',
  };
}

export function StrategyBlock({ type, title, body, voice, borderColor, labelColor }: StrategyBlockProps) {
  return (
    <div
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-none pl-4"
      style={{ borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: borderColor }}
    >
      <div
        className="text-[11px] font-bold uppercase tracking-wide mb-2"
        style={{ color: labelColor }}
      >
        {type}
      </div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">{title}</h4>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{body}</p>
      {voice ? (
        <div className="mt-3">
          <PatientVoiceCard voice={voiceToCard(voice)} />
        </div>
      ) : null}
    </div>
  );
}
