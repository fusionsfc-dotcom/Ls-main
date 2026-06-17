import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categoryLabels: Record<string, string> = {
  customerData: '고객 데이터 관리',
  marketing: '마케팅·고객 유입',
  operations: '운영·인력 시스템',
  dataAnalytics: '데이터·분석 활용',
  aiReadiness: 'AI 도입 의지·자원',
};

const categoryMax: Record<string, number> = {
  customerData: 25, marketing: 25, operations: 20, dataAnalytics: 20, aiReadiness: 20,
};

function levelBadge(level: string) {
  const colors: Record<string, string> = { 초급: '#6B7280', 중급: '#1E3A5F', 고급: '#0A1628' };
  return `<span style="background:${colors[level] ?? '#333'};color:white;padding:2px 10px;border-radius:20px;font-size:12px;">${level} 단계</span>`;
}

function categoryScoresHtml(scores: Record<string, number>): string {
  return Object.entries(scores).map(([k, v]) => {
    const max = categoryMax[k] ?? 25;
    const pct = Math.round((v / max) * 100);
    return `<tr><td style="padding:8px 0;color:#374151;">${categoryLabels[k] ?? k}</td><td style="padding:8px 12px;"><div style="background:#E5E7EB;height:8px;border-radius:4px;width:160px;"><div style="background:#0A1628;height:8px;border-radius:4px;width:${pct}%;"></div></div></td><td style="padding:8px 0;color:#6B7280;font-size:13px;">${v}/${max} (${pct}%)</td></tr>`;
  }).join('');
}

function generateAdminEmail(data: Record<string, unknown>): string {
  const { name, company, email, phone, position, companySize, message, wantConsultation,
    wantNewsletter, industryKo, totalScore, level, categoryScores, aiReport, answers } = data as {
    name: string; company: string; email: string; phone: string; position?: string;
    companySize?: string; message?: string; wantConsultation: boolean; wantNewsletter: boolean;
    industryKo: string; totalScore: number; level: string;
    categoryScores: Record<string, number>;
    aiReport?: { summary?: string; recommendedSolution?: { name?: string; reason?: string; nextStep?: string } };
    answers?: { questionId: number; score: number; value?: string }[];
  };

  const answersHtml = (answers ?? []).filter(a => a.value).map(a =>
    `<tr><td style="padding:4px 0;color:#6B7280;font-size:12px;">Q${a.questionId}</td><td style="padding:4px 8px;font-size:12px;color:#374151;">${a.value}</td><td style="padding:4px 0;font-size:12px;color:#9CA3AF;">${a.score}점</td></tr>`
  ).join('');

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:680px;margin:0 auto;padding:24px;color:#111;">
<h2 style="color:#0A1628;margin-bottom:4px;">[AI 진단 신청] ${company} · ${name}</h2>
<p style="color:#6B7280;margin-bottom:24px;">${new Date().toLocaleString('ko-KR')}</p>

<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
  <tr><td style="padding:8px 0;color:#6B7280;width:100px;">이름</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
  <tr><td style="padding:8px 0;color:#6B7280;">회사명</td><td style="padding:8px 0;">${company}</td></tr>
  <tr><td style="padding:8px 0;color:#6B7280;">이메일</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
  <tr><td style="padding:8px 0;color:#6B7280;">전화</td><td style="padding:8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
  ${position ? `<tr><td style="padding:8px 0;color:#6B7280;">직책</td><td>${position}</td></tr>` : ''}
  ${companySize ? `<tr><td style="padding:8px 0;color:#6B7280;">규모</td><td>${companySize}</td></tr>` : ''}
  <tr><td style="padding:8px 0;color:#6B7280;">상담 신청</td><td style="padding:8px 0;font-weight:600;color:${wantConsultation ? '#059669' : '#6B7280'};">${wantConsultation ? '예 — 24시간 내 연락 필요' : '아니오'}</td></tr>
  <tr><td style="padding:8px 0;color:#6B7280;">뉴스레터</td><td>${wantNewsletter ? '동의' : '미동의'}</td></tr>
</table>

${message ? `<div style="background:#F9FAFB;padding:16px;border-radius:8px;margin-bottom:24px;"><p style="color:#6B7280;font-size:13px;margin:0 0 8px;">추가 요청사항</p><p style="margin:0;">${message}</p></div>` : ''}

<hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
<h3 style="color:#0A1628;">진단 결과 요약</h3>
<p>분야: ${industryKo} &nbsp;|&nbsp; 총점: <strong>${totalScore}/110</strong> &nbsp;|&nbsp; ${levelBadge(level)}</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">${categoryScoresHtml(categoryScores)}</table>

${aiReport?.summary ? `<div style="border-left:4px solid #0A1628;padding:12px 16px;margin:16px 0;background:#F9FAFB;"><p style="margin:0;font-size:14px;">${aiReport.summary}</p></div>` : ''}

${aiReport?.recommendedSolution?.name ? `<p style="margin:8px 0;"><strong>추천 솔루션:</strong> ${aiReport.recommendedSolution.name}</p><p style="color:#6B7280;font-size:13px;">${aiReport.recommendedSolution.reason ?? ''}</p>` : ''}

<hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0;">
<h3 style="color:#0A1628;">세부 응답</h3>
<table style="width:100%;border-collapse:collapse;">${answersHtml}</table>
</body></html>`;
}

function generateUserEmail(data: Record<string, unknown>): string {
  const { name, company, industryKo, totalScore, level, aiReport } = data as {
    name: string; company: string; industryKo: string; totalScore: number; level: string;
    aiReport?: {
      summary?: string;
      strengths?: string[];
      weaknesses?: string[];
      roadmap?: { title: string; content: string }[];
      recommendedSolution?: { name?: string; reason?: string; nextStep?: string };
      closingMessage?: string;
    };
  };

  const roadmapHtml = (aiReport?.roadmap ?? []).map((r, i) =>
    `<div style="flex:1;min-width:180px;background:#F9FAFB;border-radius:12px;padding:16px;"><p style="color:#9CA3AF;font-size:24px;font-weight:700;margin:0 0 8px;">0${i + 1}</p><p style="font-weight:600;margin:0 0 4px;font-size:14px;">${r.title}</p><p style="color:#6B7280;font-size:13px;margin:0;">${r.content}</p></div>`
  ).join('');

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;">
<h1 style="color:#0A1628;font-size:22px;margin-bottom:4px;">AI 진단 리포트</h1>
<p style="color:#6B7280;">${name}님 · ${company}</p>

<div style="background:#0A1628;color:white;border-radius:16px;padding:28px;margin:24px 0;text-align:center;">
  <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:0 0 8px;">${industryKo} 분야 AI 진단 결과</p>
  <p style="font-size:64px;font-weight:700;margin:0;line-height:1;">${totalScore}</p>
  <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:4px 0 12px;">/ 110점</p>
  <span style="background:rgba(255,255,255,0.2);color:white;padding:4px 16px;border-radius:20px;font-size:13px;">${level} 단계</span>
</div>

${aiReport?.summary ? `<div style="border-left:4px solid #0A1628;padding:12px 16px;margin:24px 0;background:#F9FAFB;"><p style="margin:0;font-size:14px;line-height:1.6;">${aiReport.summary}</p></div>` : ''}

${(aiReport?.strengths ?? []).length > 0 ? `
<h3 style="color:#0A1628;margin-top:28px;">강점</h3>
<ul style="padding-left:20px;color:#374151;">${(aiReport?.strengths ?? []).map(s => `<li style="margin-bottom:8px;font-size:14px;">${s}</li>`).join('')}</ul>` : ''}

${(aiReport?.weaknesses ?? []).length > 0 ? `
<h3 style="color:#0A1628;margin-top:24px;">개선 영역</h3>
<ul style="padding-left:20px;color:#374151;">${(aiReport?.weaknesses ?? []).map(w => `<li style="margin-bottom:8px;font-size:14px;">${w}</li>`).join('')}</ul>` : ''}

${roadmapHtml ? `<h3 style="color:#0A1628;margin-top:28px;">실행 로드맵</h3><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;">${roadmapHtml}</div>` : ''}

${aiReport?.recommendedSolution?.name ? `
<div style="background:#0A1628;color:white;border-radius:12px;padding:20px;margin-top:28px;">
  <p style="font-size:11px;color:rgba(255,255,255,0.5);margin:0 0 8px;">추천 솔루션</p>
  <p style="font-size:18px;font-weight:700;margin:0 0 8px;">${aiReport.recommendedSolution.name}</p>
  <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0 0 12px;">${aiReport.recommendedSolution.reason ?? ''}</p>
  ${aiReport.recommendedSolution.nextStep ? `<div style="border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:10px 14px;font-size:13px;">${aiReport.recommendedSolution.nextStep}</div>` : ''}
</div>` : ''}

${aiReport?.closingMessage ? `<p style="text-align:center;font-style:italic;color:#374151;font-size:16px;margin:32px 0;">"${aiReport.closingMessage}"</p>` : ''}

<hr style="border:none;border-top:1px solid #E5E7EB;margin:32px 0;">
<p style="color:#9CA3AF;font-size:12px;text-align:center;">LS AX 컨설팅 · fusionsfc@gmail.com · 010-9297-0940</p>
</body></html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Save to DB
    await supabase.from('consultations').insert({
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      position: body.position ?? null,
      company_size: body.companySize ?? null,
      message: body.message ?? null,
      want_consultation: body.wantConsultation ?? false,
      want_newsletter: body.wantNewsletter ?? false,
      industry: body.industry ?? 'direct',
      total_score: body.totalScore ?? 0,
      level: body.level ?? '',
      category_scores: body.categoryScores ?? {},
      ai_report: body.aiReport ?? {},
      answers: body.answers ?? [],
    });

    const RESEND_KEY = Deno.env.get('RESEND_API_KEY');
    const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') ?? 'fusionsfc@gmail.com';
    const FROM_ADMIN = 'LS AX 컨설팅 진단시스템 <noreply@lsconsulting.co.kr>';
    const FROM_USER = 'LS AX 컨설팅 <contact@lsconsulting.co.kr>';

    const sendEmail = async (to: string, from: string, subject: string, html: string) => {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, subject, html }),
      });
      if (!r.ok) console.error('Resend error', await r.text());
    };

    // Admin email
    await sendEmail(
      ADMIN_EMAIL,
      FROM_ADMIN,
      `[AI 진단 신청] ${body.company} (${body.name}) - ${body.level ?? ''}`,
      generateAdminEmail(body),
    );

    // User email
    await sendEmail(
      body.email,
      FROM_USER,
      `[LS AX 컨설팅] ${body.name}님의 AI 진단 리포트입니다`,
      generateUserEmail(body),
    );

    return new Response(JSON.stringify({ success: true }), {
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
