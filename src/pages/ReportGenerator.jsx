import { useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchPvmCount, fetchPvmData } from '../lib/pvmClient';
import { lsSupabase } from '../lib/lsSupabase';

const CATEGORIES = [
  'Monthly Cancer Voice Report',
  'Disease Insight Report',
  'Healthcare Strategy Research',
  'Healthcare Strategy Notes',
];

const CANCER_TYPES = [
  { value: 'all', label: '전체' },
  { value: '유방암', label: '유방암' },
  { value: '대장암', label: '대장암' },
  { value: '폐암', label: '폐암' },
  { value: '위암', label: '위암' },
  { value: '자궁암', label: '자궁암' },
  { value: '간암', label: '간암' },
  { value: '췌장암', label: '췌장암' },
  { value: '혈액암', label: '혈액암' },
  { value: '기타', label: '기타' },
];

const STAGES = [
  { value: 'all', label: '전체' },
  { value: '1기', label: '1기' },
  { value: '2기', label: '2기' },
  { value: '3기', label: '3기' },
  { value: '4기', label: '4기' },
  { value: '말기', label: '말기' },
];

const AUTHOR_TYPES = [
  { value: 'all', label: '전체' },
  { value: '환자 본인', label: '환자 본인' },
  { value: '보호자', label: '보호자' },
];

const SYSTEM_PROMPT = `당신은 암환자 니즈 분석 전문가입니다. 주어진 데이터를 바탕으로 전문적인 인사이트 리포트를 한국어로 작성하세요. 니즈 TOP5, 주요 감정 패턴, 핵심 인사이트 3가지, 병원 컨설팅 시사점을 포함하세요.
반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.`;

const inputCls = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F2B46]';
const selectCls = `${inputCls} bg-white`;

export function ReportGenerator() {
  const navigate = useNavigate();

  // 인증
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // 폼
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    cancerType: 'all',
    stage: 'all',
    authorType: 'all',
    dateFrom: '',
    dateTo: '',
    imageUrl: '',
    direction: '',
  });

  // 상태
  const [previewCount, setPreviewCount] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');

  // 초안
  const [draft, setDraft] = useState(null);
  const [pvmMeta, setPvmMeta] = useState(null); // { count, filter, period }
  const [isPublishing, setIsPublishing] = useState(false);

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === 'ls2025') {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDraftChange = (e) => {
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    setPreviewCount(null);
    setError('');
    try {
      const count = await fetchPvmCount(form);
      setPreviewCount(count);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPreviewing(false);
    }
  };

  const handleDraftGenerate = async () => {
    if (!form.title.trim()) {
      setError('리포트 제목을 입력해주세요.');
      return;
    }
    setError('');
    setDraft(null);

    try {
      // 1. 데이터 조회
      setLoadingStep('데이터 조회 중');
      const pvmData = await fetchPvmData(form);
      if (!pvmData.length) {
        setError('조건에 맞는 데이터가 없습니다.');
        setLoadingStep('');
        return;
      }

      // 2. Claude API 호출
      setLoadingStep('리포트 생성 중');
      const sample = pvmData
        .slice(0, 100)
        .map((row, i) => `[${i + 1}] ${JSON.stringify(row)}`)
        .join('\n');

      const cancerLabel = CANCER_TYPES.find((c) => c.value === form.cancerType)?.label ?? '전체';
      const userPrompt = `암종: ${cancerLabel} | 병기: ${form.stage} | 작성자: ${form.authorType}
총 데이터: ${pvmData.length}건 (샘플 ${Math.min(pvmData.length, 100)}건 분석)
${form.direction ? `\n리포트 방향 / 요청사항: ${form.direction}\n` : ''}
데이터:
${sample}

아래 JSON 형식으로 리포트를 작성하세요:
{
  "excerpt": "리포트 요약 (2~3문장)",
  "highlights": ["핵심 포인트1", "핵심 포인트2", "핵심 포인트3"],
  "content": "전체 본문 (마크다운 형식, 니즈 TOP5 / 감정 패턴 / 인사이트 / 컨설팅 시사점 포함)",
  "needs_top5": ["니즈1", "니즈2", "니즈3", "니즈4", "니즈5"],
  "emotion_patterns": ["감정1", "감정2", "감정3"],
  "insights": ["인사이트1", "인사이트2", "인사이트3"],
  "consulting_implications": ["시사점1", "시사점2", "시사점3"],
  "read_time": "예상 읽기 시간 (예: 10 min read)"
}`;

      const edgeFunctionUrl = `${import.meta.env.VITE_LSCONSULTING_SUPABASE_URL}/functions/v1/generate-report`;

      console.log('Edge URL:', import.meta.env.VITE_LSCONSULTING_SUPABASE_URL);
      console.log('LS KEY:', import.meta.env.VITE_LSCONSULTING_SUPABASE_ANON_KEY?.slice(0, 30));

      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_LSCONSULTING_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          model: 'claude-opus-4-6',
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userPrompt }],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Claude API 오류 (${response.status}): ${text}`);
      }

      const claudeResult = await response.json();
      console.log('Claude 응답 전체:', claudeResult);

      const claudeText = Array.isArray(claudeResult.content)
        ? (claudeResult.content[0]?.text ?? '')
        : (claudeResult.content ?? '');

      console.log('Claude 텍스트:', claudeText);

      const parseClaudeResponse = (text) => {
        const extract = (tag) => {
          const match = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
          return match ? match[1].trim() : '';
        };
        return {
          excerpt: extract('EXCERPT'),
          highlights: extract('HIGHLIGHTS').split('\n').filter((l) => l.trim()),
          content: extract('CONTENT'),
        };
      };

      const parsed = parseClaudeResponse(claudeText);
      console.log('파싱 결과:', parsed);

      setDraft({
        title: form.title,
        excerpt: parsed.excerpt,
        highlights: parsed.highlights.join('\n'),
        content: parsed.content || claudeText,
      });

      setPvmMeta({
        count: pvmData.length,
        filter: `${cancerLabel} / ${form.stage} / ${form.authorType}`,
        period: form.dateFrom && form.dateTo ? `${form.dateFrom} ~ ${form.dateTo}` : '전체 기간',
      });
    } catch (err) {
      console.error(err);
      setError(err.message || '리포트 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingStep('');
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setError('');
    try {
      const clean = (text) =>
        (text ?? '').replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      const dateLabel = new Date().toISOString().split('T')[0];
      const highlightsArray = clean(draft.highlights)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const { data: inserted, error: insertError } = await lsSupabase
        .from('insights')
        .insert({
          category: form.category,
          title: draft.title,
          date: dateLabel,
          excerpt: clean(draft.excerpt),
          read_time: '5 min read',
          content: clean(draft.content),
          highlights: highlightsArray,
          pvm_filter: pvmMeta?.filter ?? null,
          pvm_data_count: pvmMeta?.count ?? null,
          pvm_period: pvmMeta?.period ?? null,
          is_featured: false,
          is_published: true,
        })
        .select('id')
        .single();

      if (insertError) throw new Error(`저장 오류: ${insertError.message}`);
      navigate(`/insights/report/${inserted.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || '발행 중 오류가 발생했습니다.');
    } finally {
      setIsPublishing(false);
    }
  };

  const isLoading = loadingStep !== '';

  // 인증 화면
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">관리자 인증</h1>
          <p className="text-sm text-gray-500 mb-6">리포트 생성 페이지는 관리자만 접근할 수 있습니다.</p>
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white text-sm font-semibold"
              style={{ backgroundColor: '#0F2B46' }}
            >
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium mb-4"
            style={{ backgroundColor: '#0F2B46' }}
          >
            관리자
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">리포트 생성기</h1>
          <p className="text-gray-500 text-sm">HappyLifeCare PVM 데이터를 분석하여 LS컨설팅 인사이트 리포트를 생성합니다.</p>
        </div>

        {/* ── 1단계: 분석 조건 폼 ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">1단계 — 분석 조건</p>

          {/* 리포트 제목 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">리포트 제목 *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="예: 2026년 3월 유방암 환자 니즈 분석 보고서"
              className={inputCls}
            />
          </div>

          {/* 카테고리 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">카테고리</label>
            <select name="category" value={form.category} onChange={handleChange} className={selectCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* 암종 / 병기 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">암종</label>
              <select name="cancerType" value={form.cancerType} onChange={handleChange} className={selectCls}>
                {CANCER_TYPES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">병기</label>
              <select name="stage" value={form.stage} onChange={handleChange} className={selectCls}>
                {STAGES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* 작성자 유형 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">작성자 유형</label>
            <div className="flex gap-3">
              {AUTHOR_TYPES.map((a) => (
                <label
                  key={a.value}
                  className={`flex-1 flex items-center justify-center py-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                    form.authorType === a.value
                      ? 'border-[#0F2B46] bg-[#0F2B46] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="authorType"
                    value={a.value}
                    checked={form.authorType === a.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {a.label}
                </label>
              ))}
            </div>
          </div>

          {/* 분석 기간 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">분석 시작일</label>
              <input type="date" name="dateFrom" value={form.dateFrom} onChange={handleChange} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">분석 종료일</label>
              <input type="date" name="dateTo" value={form.dateTo} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          {/* 대표 이미지 URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">대표 이미지 URL <span className="text-gray-400 font-normal">(선택)</span></label>
            <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." className={inputCls} />
          </div>

          {/* 리포트 방향 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">리포트 방향 / 요청사항</label>
            <textarea
              name="direction"
              value={form.direction}
              onChange={handleChange}
              rows={3}
              placeholder="예) 병원 마케팅 관점에서 분석해줘, 보호자 니즈에 집중해줘, 요양병원 전환 시점 환자 특성 중심으로..."
              className={inputCls}
            />
          </div>

          {/* 에러 */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* 미리보기 / 초안 생성 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePreview}
              disabled={isPreviewing || isLoading}
              className="flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-colors disabled:opacity-40"
              style={{ borderColor: '#0F2B46', color: '#0F2B46' }}
            >
              {isPreviewing ? '조회 중...' : previewCount !== null ? `데이터 ${previewCount.toLocaleString()}건 확인됨` : '미리보기'}
            </button>
            <button
              onClick={handleDraftGenerate}
              disabled={isLoading || isPreviewing}
              className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ backgroundColor: '#0F2B46' }}
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {loadingStep}
                </>
              ) : (
                '초안 생성'
              )}
            </button>
          </div>
        </div>

        {/* ── 2단계: 초안 검토 및 발행 ── */}
        {draft && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">2단계 — 초안 검토 및 발행</p>
              {pvmMeta && (
                <span className="text-xs text-gray-400">
                  {pvmMeta.filter} · {pvmMeta.count.toLocaleString()}건 · {pvmMeta.period}
                </span>
              )}
            </div>

            {/* 제목 수정 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">제목</label>
              <input
                type="text"
                name="title"
                value={draft.title}
                onChange={handleDraftChange}
                className={inputCls}
              />
            </div>

            {/* 요약 수정 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">요약 (excerpt)</label>
              <textarea
                name="excerpt"
                value={draft.excerpt}
                onChange={handleDraftChange}
                rows={3}
                className={inputCls}
              />
            </div>

            {/* 하이라이트 수정 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">하이라이트 <span className="text-gray-400 font-normal">(줄바꿈으로 구분)</span></label>
              <textarea
                name="highlights"
                value={draft.highlights}
                onChange={handleDraftChange}
                rows={4}
                className={inputCls}
              />
            </div>

            {/* 본문 수정 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">본문 (content)</label>
              <textarea
                name="content"
                value={draft.content}
                onChange={handleDraftChange}
                rows={16}
                className={`${inputCls} font-mono text-xs`}
              />
            </div>

            {/* 에러 */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {/* 다시 생성 / 발행 버튼 */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => { setDraft(null); setPvmMeta(null); }}
                disabled={isPublishing}
                className="flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-colors disabled:opacity-40"
                style={{ borderColor: '#0F2B46', color: '#0F2B46' }}
              >
                다시 생성
              </button>
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex-1 py-3 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
                style={{ backgroundColor: '#0F2B46' }}
              >
                {isPublishing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    저장 중...
                  </>
                ) : (
                  '발행하기'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
