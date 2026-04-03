export type BlogTopic = {
  title: string;
  tag: string;
};

type BlogTopicListProps = {
  topics: BlogTopic[];
};

export function BlogTopicList({ topics }: BlogTopicListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {topics.map((t) => (
        <div
          key={t.title}
          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-none transition-colors hover:bg-gray-50"
        >
          <span className="text-lg shrink-0" aria-hidden>
            🔎
          </span>
          <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm font-medium text-gray-900 leading-snug">{t.title}</p>
            <span className="shrink-0 text-[11px] font-semibold text-gray-600 bg-gray-100 rounded-full px-2.5 py-1 self-start sm:self-center">
              {t.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
