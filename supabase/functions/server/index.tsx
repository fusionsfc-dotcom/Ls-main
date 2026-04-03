import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-aba9341d/health", (c) => {
  return c.json({ status: "ok" });
});

// 상담 신청 저장 엔드포인트
app.post("/make-server-aba9341d/consultation", async (c) => {
  try {
    const data = await c.req.json();
    
    // 현재 시간 추가
    const timestamp = new Date().toISOString();
    const consultationId = `consultation_${Date.now()}`;
    
    // 상담 신청 데이터를 KV 스토어에 저장
    await kv.set(consultationId, {
      ...data,
      timestamp,
      status: 'pending'
    });
    
    console.log('상담 신청 저장 완료:', consultationId, data);
    
    // Resend를 사용해 이메일 발송
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'LS Consulting <onboarding@resend.dev>',
            to: ['fusionsfc@gmail.com'],
            subject: `[LS Consulting] 새로운 상담 신청 - ${data.hospitalName}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F2B46;">새로운 상담 신청이 접수되었습니다</h2>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 8px 0;"><strong>병원명:</strong> ${data.hospitalName}</p>
                  <p style="margin: 8px 0;"><strong>담당자명:</strong> ${data.contactName}</p>
                  <p style="margin: 8px 0;"><strong>연락처:</strong> ${data.phone}</p>
                  <p style="margin: 8px 0;"><strong>이메일:</strong> ${data.email}</p>
                  ${data.specialty ? `<p style="margin: 8px 0;"><strong>주요 진료 분야:</strong> ${data.specialty}</p>` : ''}
                  ${data.service ? `<p style="margin: 8px 0;"><strong>관심 서비스:</strong> ${data.service}</p>` : ''}
                </div>
                
                ${data.message ? `
                  <div style="margin: 20px 0;">
                    <h3 style="color: #0F2B46;">상담 내용</h3>
                    <p style="white-space: pre-wrap;">${data.message}</p>
                  </div>
                ` : ''}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="font-size: 12px; color: #666;">
                    <strong>신청 시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}<br>
                    <strong>신청 ID:</strong> ${consultationId}
                  </p>
                </div>
              </div>
            `
          })
        });
        
        if (emailResponse.ok) {
          console.log('이메일 발송 성공');
        } else {
          const errorData = await emailResponse.text();
          console.error('이메일 발송 실패:', errorData);
        }
      } else {
        console.warn('RESEND_API_KEY가 설정되지 않았습니다.');
      }
    } catch (emailError) {
      console.error('이메일 발송 중 오류:', emailError);
      // 이메일 발송 실패해도 상담 신청은 저장되었으므로 계속 진행
    }
    
    return c.json({ 
      success: true, 
      message: '상담 신청이 접수되었습니다.',
      consultationId 
    });
  } catch (error) {
    console.error('상담 신청 저장 오류:', error);
    return c.json({ 
      success: false, 
      message: '상담 신청 처리 중 오류가 발생했습니다.' 
    }, 500);
  }
});

// 상담 신청 목록 조회 엔드포인트
app.get("/make-server-aba9341d/consultations", async (c) => {
  try {
    const consultations = await kv.getByPrefix('consultation_');
    
    return c.json({ 
      success: true, 
      data: consultations 
    });
  } catch (error) {
    console.error('상담 신청 목록 조회 오류:', error);
    return c.json({ 
      success: false, 
      message: '목록 조회 중 오류가 발생했습니다.' 
    }, 500);
  }
});

// Newsletter 구독 엔드포인트
app.post("/make-server-aba9341d/newsletter", async (c) => {
  try {
    const data = await c.req.json();
    const { email } = data;
    
    // 이메일 유효성 검사
    if (!email || !email.includes('@')) {
      return c.json({ 
        success: false, 
        message: '유효한 이메일 주소를 입력해주세요.' 
      }, 400);
    }
    
    // 현재 시간 추가
    const timestamp = new Date().toISOString();
    const subscriberId = `newsletter_${email.replace(/[@.]/g, '_')}_${Date.now()}`;
    
    // 이미 구독했는지 확인
    const existingSubscribers = await kv.getByPrefix('newsletter_');
    const alreadySubscribed = existingSubscribers.some(
      (sub: any) => sub.email === email
    );
    
    if (alreadySubscribed) {
      return c.json({ 
        success: false, 
        message: '이미 구독하신 이메일입니다.' 
      }, 400);
    }
    
    // Newsletter 구독 정보를 KV 스토어에 저장
    await kv.set(subscriberId, {
      email,
      timestamp,
      status: 'active'
    });
    
    console.log('Newsletter 구독 저장 완료:', subscriberId, email);
    
    // Resend를 사용해 구독 확인 이메일 발송
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        // 1. 관리자에게 알림 이메일
        const adminEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'LS Consulting <onboarding@resend.dev>',
            to: ['fusionsfc@gmail.com'],
            subject: `[LS Consulting] 새로운 Newsletter 구독 - ${email}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F2B46;">새로운 Newsletter 구독자</h2>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 8px 0;"><strong>이메일:</strong> ${email}</p>
                  <p style="margin: 8px 0;"><strong>구독 시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</p>
                  <p style="margin: 8px 0;"><strong>구독 ID:</strong> ${subscriberId}</p>
                </div>
              </div>
            `
          })
        });
        
        if (adminEmailResponse.ok) {
          console.log('관리자 알림 이메일 발송 성공');
        } else {
          const errorData = await adminEmailResponse.text();
          console.error('관리자 알림 이메일 발송 실패:', errorData);
        }
        
        // 2. 구독자에게 환영 이메일 (선택사항)
        const welcomeEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'LS Consulting <onboarding@resend.dev>',
            to: [email],
            subject: '[LS Consulting] Newsletter 구독을 환영합니다',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F2B46;">LS Consulting Newsletter 구독 완료</h2>
                
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  안녕하세요,<br><br>
                  LS Consulting의 Newsletter 구독을 환영합니다.
                </p>
                
                <div style="background-color: #EBF4FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #0F2B46;">
                    <strong>앞으로 받으실 내용:</strong><br>
                    • 월간 암 환자 니즈 분석 리포트<br>
                    • 의료 전략 인사이트<br>
                    • 최신 연구 사례 및 전략 노트
                  </p>
                </div>
                
                <p style="font-size: 14px; color: #666;">
                  월 1-2회, 엄선된 인사이트만 전달드립니다.
                </p>
                
                <p style="font-size: 14px; color: #666; margin-top: 30px;">
                  감사합니다.<br>
                  <strong>LS Consulting</strong>
                </p>
              </div>
            `
          })
        });
        
        if (welcomeEmailResponse.ok) {
          console.log('구독 확인 이메일 발송 성공');
        } else {
          const errorData = await welcomeEmailResponse.text();
          console.error('구독 확인 이메일 발송 실패:', errorData);
        }
      } else {
        console.warn('RESEND_API_KEY가 설정되지 않았습니다.');
      }
    } catch (emailError) {
      console.error('이메일 발송 중 오류:', emailError);
      // 이메일 발송 실패해도 구독은 저장되었으므로 계속 진행
    }
    
    return c.json({ 
      success: true, 
      message: '구독이 완료되었습니다. 감사합니다!' 
    });
  } catch (error) {
    console.error('Newsletter 구독 처리 오류:', error);
    return c.json({ 
      success: false, 
      message: '구독 처리 중 오류가 발생했습니다.' 
    }, 500);
  }
});

// 환자 질문 저장 엔드포인트
app.post("/make-server-aba9341d/patient-questions", async (c) => {
  try {
    const data = await c.req.json();
    
    // 필수 필드 검증
    if (!data.role || !data.cancerType || !data.stage || !data.question || !data.email) {
      return c.json({ 
        success: false, 
        message: '필수 항목을 모두 입력해주세요.' 
      }, 400);
    }
    
    // 현재 시간 추가
    const timestamp = new Date().toISOString();
    const questionId = `patient_question_${Date.now()}`;
    
    // 질문 데이터를 KV 스토어에 저장
    await kv.set(questionId, {
      ...data,
      timestamp,
      status: 'pending'
    });
    
    console.log('환자 질문 저장 완료:', questionId, data);
    
    // Resend를 사용해 이메일 발송
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'LS Consulting <onboarding@resend.dev>',
            to: ['fusionsfc@gmail.com'],
            subject: `[환자전용] 새로운 질문 - ${data.cancerType} ${data.role}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F2B46;">환자전용 플랫폼 새로운 질문</h2>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 8px 0;"><strong>구분:</strong> ${data.role}</p>
                  <p style="margin: 8px 0;"><strong>암 종류:</strong> ${data.cancerType}</p>
                  <p style="margin: 8px 0;"><strong>치료 단계:</strong> ${data.stage}</p>
                  ${data.region ? `<p style="margin: 8px 0;"><strong>지역:</strong> ${data.region}</p>` : ''}
                  ${data.phone ? `<p style="margin: 8px 0;"><strong>연락처:</strong> ${data.phone}</p>` : ''}
                  <p style="margin: 8px 0;"><strong>이메일:</strong> ${data.email}</p>
                </div>
                
                <div style="margin: 20px 0;">
                  <h3 style="color: #0F2B46;">질문 내용</h3>
                  <p style="white-space: pre-wrap; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0F2B46;">${data.question}</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="font-size: 12px; color: #666;">
                    <strong>접수 시간:</strong> ${new Date(timestamp).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}<br>
                    <strong>질문 ID:</strong> ${questionId}
                  </p>
                </div>
              </div>
            `
          })
        });
        
        if (emailResponse.ok) {
          console.log('질문 알림 이메일 발송 성공');
        } else {
          const errorData = await emailResponse.text();
          console.error('질문 알림 이메일 발송 실패:', errorData);
        }
      } else {
        console.warn('RESEND_API_KEY가 설정되지 않았습니다.');
      }
    } catch (emailError) {
      console.error('이메일 발송 중 오류:', emailError);
      // 이메일 발송 실패해도 질문은 저장되었으므로 계속 진행
    }
    
    return c.json({ 
      success: true, 
      message: '질문이 접수되었습니다. 검토 후 이메일로 답변드리겠습니다.',
      questionId 
    });
  } catch (error) {
    console.error('환자 질문 저장 오류:', error);
    return c.json({ 
      success: false, 
      message: '질문 제출 중 오류가 발생했습니다.' 
    }, 500);
  }
});

// --- Rate-limit helpers ---
const KST_OFFSET = 9 * 60 * 60_000;
function todayKST() {
  return new Date(Date.now() + KST_OFFSET).toISOString().slice(0, 10);
}

const IP_DAILY_LIMIT = 5;
const IP_WARN_AFTER = 3;
const GLOBAL_DAILY_REQUESTS = 200;
const GLOBAL_DAILY_COST_KRW = 1000;
const USD_TO_KRW = 1400;

function calcCostKRW(inputTokens: number, outputTokens: number): number {
  const usd = (inputTokens * 3 + outputTokens * 15) / 1_000_000;
  return usd * USD_TO_KRW;
}

app.post("/make-server-aba9341d/ai-consult", async (c) => {
  try {
    const { message, history } = await c.req.json();
    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      return c.json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' }, 500);
    }

    // --- Rate-limit check ---
    const clientIp = c.req.header('x-forwarded-for')?.split(',')[0]?.trim()
      || c.req.header('cf-connecting-ip')
      || 'unknown';
    const dateKey = todayKST();
    const ipKey = `ratelimit_ip_${clientIp}_${dateKey}`;
    const globalKey = `ratelimit_global_${dateKey}`;

    const [ipData, globalData] = await Promise.all([
      kv.get(ipKey).catch(() => null),
      kv.get(globalKey).catch(() => null),
    ]);

    const ipCount = ipData?.count ?? 0;
    const globalCount = globalData?.count ?? 0;
    const globalCost = globalData?.costKRW ?? 0;

    // Global limit check
    if (globalCount >= GLOBAL_DAILY_REQUESTS || globalCost >= GLOBAL_DAILY_COST_KRW) {
      return c.json({
        limited: true,
        thinking: '',
        blocks: [{ type: 'text', content: '오늘 AI 상담 서비스가 마감되었습니다. 내일 다시 이용해 주세요.' }],
        related: [],
        followUp: [],
      });
    }

    // Per-IP limit check
    if (ipCount >= IP_DAILY_LIMIT) {
      return c.json({
        limited: true,
        thinking: '',
        blocks: [{ type: 'text', content: '오늘 질문 횟수를 모두 사용하셨습니다. 내일 다시 이용해 주세요.' }],
        related: [],
        followUp: [],
      });
    }

    // --- Call Claude API ---
    const SYSTEM_PROMPT = `당신은 "LS 암상담"입니다. 10년간 암요양병원과 암한방병원에서 환자 상담을 해온 전문 컨설턴트의 지식을 기반으로 답변합니다.

## 당신의 정체성
- 이름: LS 암상담
- 역할: 암환자와 보호자의 현실적 문제 해결 도우미
- 기반: PVM(Patient Voice Matrix) 환자 데이터 + 10년 현장 상담 경험
- 톤: 따뜻하지만 구체적, 공감하지만 실용적

## 핵심 원칙
1. 데이터 기반: 가능하면 "PVM 데이터상 ~%의 환자가..." 형태로 구체적 수치를 제시
2. 한국 의료체계 반영: 산정특례, 건강보험, 요양병원/한방병원 차이, 간병비 구조 등 실제 한국 의료 현실 반영
3. 행동 가능한 조언: "담당의와 상의하세요" 같은 일반론이 아닌, 구체적 판단 기준과 체크리스트 제공
4. 단계적 안내: 환자의 치료 단계(진단직후/수술전후/항암중/치료종료후)에 맞는 맞춤 조언

## 응답 형식
반드시 아래 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요:
{
  "thinking": "분석 키워드 (예: 위암 3기 · 항암 종료 · 요양병원 고려)",
  "blocks": [
    {"type": "text", "content": "공감 문장으로 시작. 핵심 답변을 이어서 작성."},
    {"type": "data", "stat": "73%", "label": "PVM 데이터 기반 통계 설명"},
    {"type": "checklist", "title": "판단 기준 제목", "items": [
      {"check": "체크 항목", "detail": "상세 설명"}
    ]},
    {"type": "tip", "content": "현장에서 얻은 실용적 팁"}
  ],
  "related": [
    {"title": "관련 리포트 제목", "type": "PVM 리포트"}
  ],
  "followUp": ["후속 질문 1", "후속 질문 2", "후속 질문 3"]
}

## 블록 사용 가이드
- text: 항상 첫 블록. 공감 + 핵심 답변. 2~3문단.
- data: 관련 통계가 있을 때. 수치는 현실적으로 추정.
- checklist: 판단 기준이나 단계별 안내가 필요할 때. 3~5개 항목.
- tip: 병원 현장에서만 알 수 있는 실용적 조언. 1개.
- 모든 블록을 매번 쓸 필요 없음. 질문에 맞게 선택.

## 주의사항
- 의료 진단이나 처방을 하지 않습니다
- "~할 수 있습니다" 대신 "~하세요" 형태의 구체적 조언
- 특정 병원 이름을 추천하지 않되, 선택 기준은 구체적으로 제시
- 비용 질문에는 산정특례, 본인부담금 등 실제 금액 범위를 안내
- 재발 불안 등 심리적 질문에는 공감을 충분히 하되, 구체적 대처법도 제시`;

    const messages: Array<{role: string; content: string}> = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        messages.push({ role: h.role, content: h.content });
      }
    }
    messages.push({ role: "user", content: message });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await response.json();

    // --- Parse AI response ---
    let aiResponse;
    try {
      const text = data.content?.[0]?.text || '';
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) ||
                        text.match(/(\{[\s\S]*\})/);
      aiResponse = JSON.parse(jsonMatch?.[1] || text);
    } catch {
      aiResponse = {
        thinking: "답변 생성 완료",
        blocks: [{ type: "text", content: data.content?.[0]?.text || '죄송합니다. 다시 질문해 주세요.' }],
        related: [],
        followUp: []
      };
    }

    // --- Update rate-limit counters ---
    const inputTokens = data.usage?.input_tokens ?? 0;
    const outputTokens = data.usage?.output_tokens ?? 0;
    const requestCostKRW = calcCostKRW(inputTokens, outputTokens);
    const newIpCount = ipCount + 1;

    await Promise.all([
      kv.set(ipKey, { count: newIpCount }),
      kv.set(globalKey, {
        count: globalCount + 1,
        costKRW: Math.round((globalCost + requestCostKRW) * 100) / 100,
      }),
    ]);

    // --- Log ---
    const logId = `consult_${Date.now()}`;
    kv.set(logId, {
      message,
      response: aiResponse,
      ip: clientIp,
      tokens: { input: inputTokens, output: outputTokens },
      costKRW: requestCostKRW,
      timestamp: new Date().toISOString(),
    }).catch(err => console.error('상담 로그 저장 실패:', err));

    // --- Add warning if over threshold ---
    if (newIpCount > IP_WARN_AFTER) {
      aiResponse.warning = `하루 질문 수는 ${IP_DAILY_LIMIT}회까지 입니다 (오늘 ${newIpCount}/${IP_DAILY_LIMIT}회 사용)`;
    }

    return c.json(aiResponse);
  } catch (err) {
    console.error('AI Consult Error:', err);
    return c.json({
      thinking: "오류 발생",
      blocks: [{ type: "text", content: "죄송합니다. 일시적인 오류가 발생했어요. 잠시 후 다시 질문해 주세요." }],
      related: [],
      followUp: []
    }, 500);
  }
});

Deno.serve(app.fetch);