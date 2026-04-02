export type PainTag = { label: string; color: 'red' | 'amber' | 'blue' | 'teal' };

const tagStyles: Record<
  PainTag['color'],
  { bg: string; text: string }
> = {
  red: { bg: '#FCEBEB', text: '#A32D2D' },
  amber: { bg: '#FAEEDA', text: '#854F0B' },
  blue: { bg: '#E6F1FB', text: '#185FA5' },
  teal: { bg: '#E1F5EE', text: '#0F6E56' },
};

type PainPointCardProps = {
  icon: string;
  iconBg: string;
  count: string;
  title: string;
  subtitle: string;
  body: string;
  tags: PainTag[];
};

export function PainPointCard({ icon, iconBg, count, title, subtitle, body, tags }: PainPointCardProps) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-none">
      <div className="flex flex-wrap items-start gap-4 mb-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{ backgroundColor: iconBg }}
        >
          <span aria-hidden>{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-xs font-bold tabular-nums text-gray-500">{count}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 leading-snug">{title}</h3>
          <p className="text-sm font-semibold mt-1" style={{ color: '#185FA5' }}>
            {subtitle}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-5">{body}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const s = tagStyles[tag.color];
          return (
            <span
              key={tag.label}
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              style={{ backgroundColor: s.bg, color: s.text }}
            >
              {tag.label}
            </span>
          );
        })}
      </div>
    </article>
  );
}
