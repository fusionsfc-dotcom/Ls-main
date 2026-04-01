import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, Database, BarChart2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { lsSupabase } from '../lib/lsSupabase';

export function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true);
      const { data, error } = await lsSupabase
        .from('insights')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setError('리포트를 찾을 수 없습니다.');
      } else {
        setReport(data);
      }
      setIsLoading(false);
    };

    fetchReport();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-[#0F2B46] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">리포트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-6">{error || '리포트를 찾을 수 없습니다.'}</p>
          <Link to="/insights" className="text-[#0F2B46] font-semibold underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const cleanContent = (text) => {
    if (!text) return '';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    try {
      const parsed = JSON.parse(cleaned);
      return parsed.content || parsed.excerpt || cleaned;
    } catch {
      return cleaned;
    }
  };

  const highlights = (() => {
    if (Array.isArray(report.highlights)) return report.highlights;
    if (typeof report.highlights === 'string') {
      try { return JSON.parse(report.highlights); } catch { return []; }
    }
    return [];
  })();

  const displayExcerpt = cleanContent(report.excerpt);
  const displayContent = cleanContent(report.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b" style={{ borderColor: '#EAEAEA' }}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-6 flex items-center justify-between">
          <Link
            to="/insights"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: '#0F2B46' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Reports</span>
          </Link>
          <Link
            to="/consultation"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0F2B46' }}
          >
            맞춤 분석 신청
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 px-8 lg:px-16"
        style={{ background: 'linear-gradient(135deg, #0E1B3D 0%, #0F2B46 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div
            className="inline-block px-4 py-2 rounded-full text-sm mb-6 border"
            style={{ borderColor: '#3A6FF8', color: '#3A6FF8' }}
          >
            {report.category ?? 'PVM INSIGHT REPORT'}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white whitespace-pre-line">
            {report.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-400 mb-10">
            {report.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {report.date}
              </span>
            )}
            {report.read_time && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {report.read_time}
              </span>
            )}
          </div>

          <Link
            to="/consultation"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold transition-all hover:bg-white border-2 border-white text-white hover:text-[#0E1B3D]"
          >
            우리 병원 맞춤 분석 신청
          </Link>
        </div>
      </section>

      {/* Summary & Highlights */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="max-w-[1200px] mx-auto">

          {/* Excerpt */}
          {displayExcerpt && (
            <div
              className="p-8 rounded-2xl border-2 mb-10"
              style={{ borderColor: '#0F2B46', backgroundColor: 'white' }}
            >
              <p className="text-lg lg:text-xl leading-relaxed" style={{ color: '#0E1B3D' }}>
                {displayExcerpt}
              </p>
            </div>
          )}

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E1B3D' }}>
                핵심 포인트
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-xl bg-white border"
                    style={{ borderColor: '#EAEAEA' }}
                  >
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                      style={{ backgroundColor: '#0F2B46' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: '#0E1B3D' }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PVM 메타 정보 */}
          {(report.pvm_data_count || report.pvm_period) && (
            <div
              className="flex flex-wrap items-center gap-6 p-6 rounded-xl border text-sm"
              style={{ borderColor: '#3A6FF8', backgroundColor: 'white', color: '#0E1B3D' }}
            >
              {report.pvm_data_count && (
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                  분석 데이터: <strong>{Number(report.pvm_data_count).toLocaleString()}건</strong>
                </span>
              )}
              {report.pvm_period && (
                <span className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" style={{ color: '#3A6FF8' }} />
                  분석 기간: <strong>{report.pvm_period}</strong>
                </span>
              )}
              {report.pvm_filter && (
                <span className="text-gray-400">
                  필터: {report.pvm_filter}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      {displayContent && (
        <section className="py-20 px-8 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="prose prose-lg max-w-none" style={{ color: '#0E1B3D' }}>
              <ReactMarkdown>{displayContent}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* CTA Bottom */}
      <section className="py-20 px-8 lg:px-16" style={{ backgroundColor: '#0F2B46' }}>
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            우리 병원에 맞는 분석이 필요하신가요?
          </h2>
          <p className="text-gray-300 mb-8">
            PVM 데이터 기반 맞춤 컨설팅을 신청하세요.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center justify-center px-10 py-4 rounded-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-[#0E1B3D] transition-all"
          >
            맞춤 분석 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
}
