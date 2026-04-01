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

Deno.serve(app.fetch);