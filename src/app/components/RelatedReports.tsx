import { Link } from 'react-router';
import { ArrowRight, Calendar } from 'lucide-react';
import { insightsData, InsightItem } from '../data/insightsData';
import { GuardedReportLink } from './auth/GuardedReportLink';

interface RelatedReportsProps {
  currentReportLink: string;
  maxItems?: number;
}

export function RelatedReports({ currentReportLink, maxItems = 3 }: RelatedReportsProps) {
  // 현재 리포트를 제외한 다른 리포트들
  const otherReports = insightsData.filter(item => item.link !== currentReportLink);
  
  // 최대 개수만큼만 표시
  const displayReports = otherReports.slice(0, maxItems);

  return (
    <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: 'var(--navy-50)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 
            className="text-3xl lg:text-4xl tracking-tight"
            style={{ color: 'var(--navy-900)' }}
          >
            다른 리포트 보기
          </h2>
          <Link
            to="/insights"
            className="flex items-center space-x-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--navy-900)' }}
          >
            <span>전체 보기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReports.map((report) => (
            <GuardedReportLink
              key={report.link}
              to={report.link}
              className="group block bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: 'var(--navy-900)' }}
                >
                  {report.category}
                </span>
              </div>

              {/* Title */}
              <h3 
                className="text-xl mb-3 leading-tight group-hover:opacity-70 transition-opacity"
                style={{ color: 'var(--navy-900)' }}
              >
                {report.title}
              </h3>

              {/* Excerpt */}
              <p 
                className="text-sm leading-relaxed mb-4 opacity-60 line-clamp-3"
                style={{ color: 'var(--navy-900)' }}
              >
                {report.excerpt}
              </p>

              {/* Date & Read Time */}
              <div className="flex items-center space-x-4 text-xs opacity-50" style={{ color: 'var(--navy-900)' }}>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{report.date}</span>
                </div>
                <span>•</span>
                <span>{report.readTime}</span>
              </div>

              {/* Arrow Icon on Hover */}
              <div className="mt-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm" style={{ color: 'var(--navy-900)' }}>자세히 보기</span>
                <ArrowRight className="w-4 h-4" style={{ color: 'var(--navy-900)' }} />
              </div>
            </GuardedReportLink>
          ))}
        </div>
      </div>
    </section>
  );
}
