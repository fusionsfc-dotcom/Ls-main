const SYSTEM_PROMPT = `당신은 암환자 니즈 분석 전문가입니다.
환자들의 온라인 커뮤니티 데이터(PVM, Patient Voice Mining)를 분석하여
핵심 니즈, 감정 패턴, 전략적 인사이트를 도출합니다.
반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.`;

/**
 * pvm_data 배열을 받아 Claude API에 분석 요청
 * @param {object[]} pvmData - Supabase pvm_data 테이블 레코드 배열
 * @param {string} cancerType - 암종 레이블 (표시용)
 * @param {string[]} analysisItems - 요청 분석 항목 배열
 * @returns {Promise<{needs: string[], emotions: string[], insights: string[]}>}
 */
export async function analyzePvmData(pvmData, cancerType = '전체', analysisItems = []) {
  const sample = pvmData.slice(0, 50).map((row, i) => `[${i + 1}] ${JSON.stringify(row)}`).join('\n');

  const userPrompt = `암종: ${cancerType}
총 데이터: ${pvmData.length}건 (샘플 ${Math.min(pvmData.length, 50)}건 분석)
요청 분석 항목: ${analysisItems.length > 0 ? analysisItems.join(', ') : '전체'}

데이터:
${sample}

위 데이터를 분석하여 다음 JSON 형식으로 결과를 반환하세요:
{
  "needs": ["니즈1", "니즈2", "니즈3", "니즈4", "니즈5"],
  "emotions": ["주요 감정1", "주요 감정2", "주요 감정3"],
  "insights": ["인사이트 1줄 요약", "인사이트 2줄 요약", "인사이트 3줄 요약"]
}`;

  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API 오류 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const raw = data.content?.[0]?.text ?? '';

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Claude 응답에서 JSON을 파싱할 수 없습니다.');
  }

  return JSON.parse(jsonMatch[0]);
}
