import { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';


const CANCER_TYPES = [
  { value: 'all', label: '전체' },
  { value: '유방암', label: '유방암' },
  { value: '대장암', label: '대장암' },
  { value: '폐암', label: '폐암' },
  { value: '위암', label: '위암' },
  { value: '자궁암', label: '자궁암' },
];

const ANALYSIS_ITEMS = [
  { value: '주요 니즈', label: '주요 니즈' },
  { value: '감정 패턴', label: '감정 패턴' },
  { value: '치료별 분포', label: '치료별 분포' },
  { value: '언급 병원', label: '언급 병원' },
];

export function PvmReport() {
  const [cancerType, setCancerType] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  const handleAnalysisChange = (event) => {
    const value = event.target.value;
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
  };

  const fetchPvmData = async () => {
    let query = supabase.from('pvm_data').select('*');
    if (cancerType !== 'all') {
      query = query.eq('cancer_type', cancerType);
    }
    const { data, error } = await query.limit(200);
    if (error) throw new Error(`Supabase 조회 오류: ${error.message}`);
    return data;
  };

  const buildPrompt = (data, items) => {
    const summary = data
      .slice(0, 50)
      .map((row, i) => `[${i + 1}] ${JSON.stringify(row)}`)
      .join('\n');

    const cancerLabel =
      CANCER_TYPES.find((c) => c.value === cancerType)?.label ?? '전체';

    return `당신은 의료 데이터 분석 전문가입니다. 아래는 ${cancerLabel} 환자 PVM(Patient Voice Mining) 데이터입니다 (총 ${data.length}건, 샘플 50건 표시).

데이터:
${summary}

다음 항목에 대해 각각 분석해주세요: ${items.join(', ')}

각 항목별로 구체적인 인사이트와 핵심 키워드를 포함하여 분석해주세요. 분석 결과는 아래 JSON 형식으로만 응답하세요:
{
  "results": [
    {
      "title": "분석 항목명",
      "summary": "핵심 요약 (2~3문장)",
      "insights": ["인사이트1", "인사이트2", "인사이트3"],
      "keywords": ["키워드1", "키워드2", "키워드3"]
    }
  ]
}`;
  };

  const handleGenerate = async () => {
    if (selectedItems.length === 0) {
      setError('분석 항목을 하나 이상 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await fetchPvmData();

      if (!data || data.length === 0) {
        setError('조회된 데이터가 없습니다. 암종 선택을 확인해주세요.');
        return;
      }

      const prompt = buildPrompt(data, selectedItems);

      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-opus-4-6',
          max_tokens: 2048,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Claude API 오류 (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      const raw = result.content?.[0]?.text ?? '';
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Claude 응답에서 JSON을 파싱할 수 없습니다.');

      const parsed = JSON.parse(jsonMatch[0]);
      setResults(parsed.results ?? []);
    } catch (err) {
      console.error(err);
      setError(err.message || '리포트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-white text-sm font-medium mb-4" style={{ backgroundColor: '#0F2B46' }}>
            AI 리포트
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PVM 데이터 분석 리포트</h1>
          <p className="text-gray-500">Supabase에서 실시간 PVM 데이터를 조회하고 Claude AI로 분석합니다.</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 암종 선택 */}
            <FormControl fullWidth size="small">
              <InputLabel>암종 선택</InputLabel>
              <Select
                value={cancerType}
                label="암종 선택"
                onChange={(e) => setCancerType(e.target.value)}
              >
                {CANCER_TYPES.map((ct) => (
                  <MenuItem key={ct.value} value={ct.value}>
                    {ct.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* 분석 항목 선택 */}
            <FormControl fullWidth size="small">
              <InputLabel>분석 항목 선택</InputLabel>
              <Select
                multiple
                value={selectedItems}
                onChange={handleAnalysisChange}
                input={<OutlinedInput label="분석 항목 선택" />}
                renderValue={(selected) => (
                  <div className="flex flex-wrap gap-1">
                    {selected.map((val) => (
                      <Chip key={val} label={val} size="small" />
                    ))}
                  </div>
                )}
              >
                {ANALYSIS_ITEMS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    <Checkbox checked={selectedItems.includes(item.value)} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#0F2B46' }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={16} color="inherit" />
                리포트 생성 중...
              </>
            ) : (
              '리포트 생성'
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">{result.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{result.summary}</p>
                </div>

                {result.insights?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">인사이트</h3>
                    <ul className="space-y-1.5">
                      {result.insights.map((ins, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#0F2B46' }} />
                          {ins}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.keywords?.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">키워드</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: '#2C5282' }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
