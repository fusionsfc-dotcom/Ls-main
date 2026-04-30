import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Anthropic from 'https://esm.sh/@anthropic-ai/sdk@0.27.0';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const industryKoreanMap: Record<string, string> = {
  healthcare: '의료',
  service: '서비스',
  education: '교육',
  manufacturing: '제조',
  public: '관공',
};

const categoryLabels: Record<string, string> = {
  customerData: '고객 데이터 관리',
  marketing: '마케팅·고객 유입',
  operations: '운영·인력 시스템',
  dataAnalytics: '데이터·분석 활용',
  aiReadiness: 'AI 도입 의지·자원',
};

function answersToText(answers: { questionId: number; score: number; value?: string }[]): string {
  return answers
    .filter(a => a.value)
    .map(a => `Q${a.questionId}: ${a.value} (${a.score}점)`)
    .join('\n');
}

function parseXml(text: string, tag: string): string {
  const m = text.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : '';
}

function parseItems(text: string, parentTag: string): string[] {
  const parent = parseXml(text, parentTag);
  return [...parent.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1].trim());
}

function parseRoadmap(text: string): { phase: string; title: string; content: string }[] {
  const phases = [...text.matchAll(/<phase title="([^"]+)">([\s\S]*?)<\/phase>/g)];
  return phases.map(m => {
    const title = m[1].trim();
    const content = m[2].trim();
    const periodMatch = title.match(/\(([^)]+)\)/);
    return { phase: periodMatch ? periodMatch[1] : title, title, content };
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { industry, industryKo, answers, totalScore, categoryScores, level } = await req.json();

    const anthropic = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });

    const systemPrompt = `당신은 LS컨설팅의 AI 전략 컨설턴트입니다.
LS컨설팅은 의료에서 검증된 AI 실행력으로 병원·기업·기관의 디지털 전환을 돕는 회사입니다.
주력 솔루션 5가지: AI 시장 진단, AI 업무 자동화, AI 최적화 웹·앱 구축, 맞춤 SaaS·시스템 개발, AI 전략 컨설팅.

응답 원칙:
- 사실과 구체적 수치로 신뢰를 만드세요.
- "최고", "혁신적", "최첨단" 같은 표현은 사용하지 마세요.
- 직접적이고 명확한 톤. 모호한 표현 피하세요.
- 한국 시장 현실을 반영한 구체적 인사이트를 포함하세요.
- "도메인" 표현 금지. "업계" 또는 "현장"으로 대체.

추천 솔루션 선택 가이드(총점 0~110):
- 0~30점: AI 시장 진단
- 30~50점: AI 시장 진단 + AI 업무 자동화(Quick Win 성격) 중, 추천 솔루션은 둘 중 1개를 선택
- 50~70점: AI 업무 자동화 또는 AI 전략 컨설팅
- 70~90점: AI 최적화 웹·앱 구축 또는 맞춤 SaaS·시스템 개발(필요 시 자동화 언급)
- 90점+: 맞춤 SaaS·시스템 개발 또는 AI 전략 컨설팅

반드시 다음 XML 구조로만 응답하세요:

<level>초급|중급|고급</level>
<summary>회사의 AI 도입 현재 단계 진단 (3-4문장, 구체적으로)</summary>
<strengths>
  <item>강점 1 (구체적으로)</item>
  <item>강점 2</item>
  <item>강점 3</item>
</strengths>
<weaknesses>
  <item>개선 영역 1 (구체적으로)</item>
  <item>개선 영역 2</item>
  <item>개선 영역 3</item>
</weaknesses>
<roadmap>
  <phase title="단기 (1-3개월)">실행 추천 1-2개, 구체적으로</phase>
  <phase title="중기 (3-6개월)">실행 추천 1-2개</phase>
  <phase title="장기 (6-12개월)">실행 추천 1-2개</phase>
</roadmap>
<recommended_solution>
  <name>5대 솔루션 중 1개: AI 시장 진단 / AI 업무 자동화 / AI 최적화 웹·앱 구축 / 맞춤 SaaS·시스템 개발 / AI 전략 컨설팅</name>
  <reason>왜 이 솔루션이 이 회사에 맞는지 (2-3문장, 점수 기반으로)</reason>
  <next_step>구체적 다음 행동 1가지</next_step>
</recommended_solution>
<closing_message>방문자에게 보내는 진심 어린 마무리 메시지 (2문장)</closing_message>`;

    const catScoreText = Object.entries(categoryScores as Record<string, number>)
      .map(([k, v]) => `- ${categoryLabels[k] ?? k}: ${v}점`)
      .join('\n');

    const userPrompt = `다음은 ${industryKo ?? industryKoreanMap[industry] ?? industry} 분야 회사의 AI 진단 응답입니다.

총점: ${totalScore}/110
레벨: ${level}

영역별 점수:
${catScoreText}

세부 응답:
${answersToText(answers)}

이 회사의 AI 도입 단계를 진단하고, 가장 빨리 성과를 낼 수 있는 영역을 우선 추천하는 맞춤 컨설팅 리포트를 작성해주세요.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

    const report = {
      level: parseXml(responseText, 'level') as '초급' | '중급' | '고급',
      summary: parseXml(responseText, 'summary'),
      strengths: parseItems(responseText, 'strengths'),
      weaknesses: parseItems(responseText, 'weaknesses'),
      roadmap: parseRoadmap(responseText),
      recommendedSolution: {
        name: parseXml(responseText, 'name'),
        reason: parseXml(responseText, 'reason'),
        nextStep: parseXml(responseText, 'next_step'),
      },
      closingMessage: parseXml(responseText, 'closing_message'),
    };

    return new Response(JSON.stringify(report), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
