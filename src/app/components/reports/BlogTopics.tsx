type BlogTopicsProps = {
  topics: string[];
};

export function BlogTopics({ topics }: BlogTopicsProps) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-none">
      <ul className="space-y-3">
        {topics.map((topic) => (
          <li key={topic} className="flex gap-3 text-sm text-gray-800 leading-relaxed">
            <span className="shrink-0" aria-hidden>
              🔎
            </span>
            <span className="font-medium">{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
