import type { LungStrategy } from '../../../../data/reports/lung-2026-03';
import { StrategyBlock } from './StrategyBlock';

type StrategySectionProps = {
  strategy: LungStrategy;
};

export function StrategySection({ strategy }: StrategySectionProps) {
  return (
    <section
      className="rounded-xl border p-5 sm:p-6 shadow-none"
      style={{
        backgroundColor: strategy.bgColor,
        borderColor: strategy.borderColor,
      }}
    >
      <div className="flex flex-wrap items-start gap-3 mb-4">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border"
          style={{ color: strategy.labelColor, borderColor: strategy.borderColor, backgroundColor: 'rgba(255,255,255,0.7)' }}
        >
          {strategy.part}
        </span>
        <span className="text-lg sm:text-xl font-bold text-gray-900">
          <span className="mr-2" aria-hidden>
            {strategy.icon}
          </span>
          {strategy.department}
        </span>
      </div>
      <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">{strategy.summary}</p>
      <div className="space-y-5">
        {strategy.items.map((item, i) => (
          <StrategyBlock
            key={`${item.title}-${i}`}
            type={item.type}
            title={item.title}
            body={item.body}
            voice={item.voice}
            borderColor={strategy.borderColor}
            labelColor={strategy.labelColor}
          />
        ))}
      </div>
    </section>
  );
}
