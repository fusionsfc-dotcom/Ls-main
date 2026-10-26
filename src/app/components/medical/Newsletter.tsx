import { MailOpen } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubmitMessage('유효한 이메일 주소를 입력해주세요.');
      setSubmitSuccess(false);
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email
        })
      });
      const result = await response.json();
      if (result.success) {
        setSubmitMessage(result.message);
        setSubmitSuccess(true);
        setEmail('');
      } else {
        setSubmitMessage(result.message || '구독 처리 중 오류가 발생했습니다.');
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error('Newsletter 구독 오류:', error);
      setSubmitMessage('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="med-section med-paper"><div className="med-wrap"><div className="med-newsletter"><div className="ed-newsletter-icon" aria-hidden="true"><MailOpen size={42} strokeWidth={1.25}/></div><span className="med-caption">PVM NEWSLETTER</span><h2>새 리포트를 이메일로 받아보세요.</h2><p>의료 데이터와 현장의 질문을 담은 인사이트를 전합니다.</p><label htmlFor="newsletter-email">이메일 주소</label><form onSubmit={handleNewsletterSubmit}><input id="newsletter-email" type="email" autoComplete="email" required placeholder="이메일 주소를 입력해 주세요" value={email} onChange={e => setEmail(e.target.value)} /><button className="med-button" type="submit" disabled={isSubmitting}>{isSubmitting ? '구독 처리 중…' : '구독하기'}</button></form>{submitMessage && <p role="status" style={{
          color: submitSuccess ? '#365e52' : '#9f3333'
        }}>{submitMessage}</p>}</div></div></section>;
}
