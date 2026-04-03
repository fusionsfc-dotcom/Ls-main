import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageCircle, DollarSign, UtensilsCrossed, HeartPulse, X } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface ChatBlock {
  type: 'text' | 'data' | 'checklist' | 'tip';
  content?: string;
  stat?: string;
  label?: string;
  title?: string;
  items?: { check: string; detail: string }[];
}

interface AiResponse {
  thinking: string;
  blocks: ChatBlock[];
  related: { title: string; type: string }[];
  followUp: string[];
  warning?: string;
  limited?: boolean;
}

interface ChatMessage {
  role: 'user' | 'ai';
  content?: string;
  thinking?: string;
  blocks?: ChatBlock[];
  related?: { title: string; type: string }[];
  followUp?: string[];
  warning?: string;
}

const quickQuestions = [
  { icon: <MessageCircle className="w-5 h-5" />, label: '요양병원', text: '항암 끝나고 요양병원 가야 하나요?' },
  { icon: <DollarSign className="w-5 h-5" />, label: '비용/보험', text: '요양병원 비용이 얼마나 드나요?' },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: '식단/영양', text: '항암 중 뭘 먹어야 하나요?' },
  { icon: <HeartPulse className="w-5 h-5" />, label: '재발불안', text: '치료 끝났는데 재발이 걱정돼요' },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
           style={{ backgroundColor: 'var(--navy-900)' }}>LS</div>
      <div className="bg-white border rounded-2xl rounded-tl-sm px-4 py-3" style={{ borderColor: 'var(--navy-200)' }}>
        <p className="text-xs mb-2" style={{ color: 'var(--navy-500)' }}>LS AI가 데이터를 분석하고 있어요...</p>
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                 style={{ backgroundColor: 'var(--navy-400)', animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DataCard({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="rounded-xl p-4 my-2" style={{ backgroundColor: 'var(--navy-50)', borderLeft: '4px solid var(--navy-500)' }}>
      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--navy-900)' }}>{stat}</div>
      <div className="text-xs leading-relaxed" style={{ color: 'var(--navy-600)' }}>{label}</div>
    </div>
  );
}

function ChecklistCard({ title, items }: { title: string; items: { check: string; detail: string }[] }) {
  return (
    <div className="rounded-xl overflow-hidden my-2 border" style={{ borderColor: 'var(--navy-200)' }}>
      <div className="px-4 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: 'var(--navy-900)' }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} className="px-4 py-3" style={{ borderBottom: i < items.length - 1 ? '1px solid var(--navy-100)' : 'none' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: '#E6F5EE', color: '#2D8F6F' }}>{i + 1}</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--navy-900)' }}>{item.check}</span>
          </div>
          <p className="text-xs leading-relaxed ml-7" style={{ color: 'var(--navy-600)' }}>{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

function TipCard({ content }: { content: string }) {
  return (
    <div className="rounded-xl p-3.5 my-2 flex gap-2.5 items-start" style={{ backgroundColor: '#FDF0DC', border: '1px solid rgba(232,164,74,0.25)' }}>
      <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#B07517' }} />
      <p className="text-xs leading-relaxed" style={{ color: '#7A5A1F' }}>{content}</p>
    </div>
  );
}

export function AiConsult() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Listen for custom event from Header
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-ai-consult', handleToggle);
    return () => window.removeEventListener('toggle-ai-consult', handleToggle);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendToAI = async (message: string): Promise<AiResponse> => {
    try {
      const history = messages
        .filter(m => m.role === 'user' || (m.role === 'ai' && m.blocks))
        .map(m => ({
          role: m.role === 'user' ? 'user' as const : 'assistant' as const,
          content: m.role === 'user' ? m.content! : m.blocks!.filter(b => b.type === 'text').map(b => b.content).join('\n'),
        }));

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-aba9341d/ai-consult`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ message, history }),
        }
      );
      if (!response.ok) throw new Error('API 오류');
      return await response.json();
    } catch (err) {
      console.error('AI 상담 오류:', err);
      return {
        thinking: '답변 생성',
        blocks: [{ type: 'text', content: '죄송합니다. 일시적인 오류가 발생했어요. 잠시 후 다시 질문해 주세요.' }],
        related: [],
        followUp: [],
      };
    }
  };

  const handleSend = async (text?: string) => {
    const question = text || input.trim();
    if (!question || isTyping) return;
    setShowWelcome(false);
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setIsTyping(true);
    const aiResponse = await sendToAI(question);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'ai',
      thinking: aiResponse.thinking,
      blocks: aiResponse.blocks,
      related: aiResponse.related,
      followUp: aiResponse.limited ? [] : aiResponse.followUp,
      warning: aiResponse.warning,
    }]);
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'var(--navy-900)' }}
          aria-label="AI 암상담 열기"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div
            className="relative z-10 w-full h-full md:w-[680px] md:h-[85vh] md:max-h-[900px] md:rounded-2xl flex flex-col overflow-hidden shadow-2xl"
            style={{ backgroundColor: '#FDFBF7' }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: 'var(--navy-900)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                     style={{ background: 'linear-gradient(135deg, var(--navy-500), var(--navy-700))' }}>LS</div>
                <div>
                  <h2 className="text-white text-sm font-semibold tracking-tight">LS 암상담</h2>
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--navy-300)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs">환자 데이터 기반 AI 상담</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1" aria-label="닫기">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {showWelcome && (
                <div className="pb-6">
                  {/* AI 인사 메시지 */}
                  <div className="flex items-start gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                         style={{ backgroundColor: 'var(--navy-900)' }}>LS</div>
                    <div className="bg-white border rounded-2xl rounded-tl-sm p-4" style={{ borderColor: 'var(--navy-200)' }}>
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--navy-900)' }}>
                        {'안녕하세요 LS AI 입니다!\n저는 여러분께 암을 이겨내는 길을 안내합니다\n궁금한 것을 편안하게 물어보세요(답변이 5초 이상 걸릴 수 있어요)'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 flex-wrap mb-6">
                    {['PVM 환자 데이터 기반', '10년 현장 경험', '건강보험 실무 반영'].map(badge => (
                      <span key={badge} className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-700)' }}>{badge}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {quickQuestions.map(q => (
                      <button key={q.label} onClick={() => handleSend(q.text)}
                        className="bg-white border rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm"
                        style={{ borderColor: 'var(--navy-200)' }}>
                        <div className="mb-2" style={{ color: 'var(--navy-500)' }}>{q.icon}</div>
                        <div className="text-sm font-semibold mb-1" style={{ color: 'var(--navy-900)' }}>{q.label}</div>
                        <div className="text-xs leading-relaxed" style={{ color: 'var(--navy-500)' }}>{q.text}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 px-4 py-2.5 rounded-xl text-center text-xs leading-relaxed"
                       style={{ backgroundColor: 'var(--navy-50)', color: 'var(--navy-500)' }}>
                    LS 암상담은 의료 진단을 대체하지 않습니다. 실제 환자 데이터와 현장 경험을 기반으로 의사결정에 도움을 드립니다.
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div key={idx} className="mb-4">
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="text-white text-sm leading-relaxed px-4 py-3 rounded-2xl rounded-br-sm max-w-[80%]"
                           style={{ backgroundColor: 'var(--navy-900)' }}>{msg.content}</div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                           style={{ backgroundColor: 'var(--navy-900)' }}>LS</div>
                      <div className="flex-1 min-w-0">
                        {msg.thinking && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-2"
                               style={{ backgroundColor: 'var(--navy-100)', color: 'var(--navy-600)' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#2D8F6F' }} />
                            분석 완료: {msg.thinking}
                          </div>
                        )}
                        {msg.warning && (
                          <div className="rounded-xl px-3.5 py-2.5 mb-2 text-xs leading-relaxed"
                               style={{ backgroundColor: '#FDF0DC', color: '#7A5A1F', border: '1px solid rgba(232,164,74,0.25)' }}>
                            {msg.warning}
                          </div>
                        )}
                        <div className="bg-white border rounded-2xl rounded-tl-sm p-4 max-w-full" style={{ borderColor: 'var(--navy-200)' }}>
                          {msg.blocks?.map((block, bi) => {
                            switch (block.type) {
                              case 'text': return <div key={bi} className="text-sm leading-relaxed whitespace-pre-line mb-2" style={{ color: 'var(--navy-900)' }}>{block.content}</div>;
                              case 'data': return <DataCard key={bi} stat={block.stat!} label={block.label!} />;
                              case 'checklist': return <ChecklistCard key={bi} title={block.title!} items={block.items!} />;
                              case 'tip': return <TipCard key={bi} content={block.content!} />;
                              default: return null;
                            }
                          })}
                          {msg.related && msg.related.length > 0 && (
                            <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--navy-100)' }}>
                              <p className="text-xs font-medium mb-2" style={{ color: 'var(--navy-500)' }}>관련 자료</p>
                              <div className="flex gap-1.5 flex-wrap">
                                {msg.related.map((r, ri) => (
                                  <a key={ri} href="/insights" className="text-xs px-3 py-1.5 rounded-lg border inline-flex items-center gap-1 hover:bg-gray-50 transition-colors"
                                     style={{ borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}>📄 {r.title}</a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        {msg.followUp && msg.followUp.length > 0 && (
                          <div className="flex gap-1.5 flex-wrap mt-2.5">
                            {msg.followUp.map((f, fi) => (
                              <button key={fi} onClick={() => handleSend(f)}
                                className="text-xs px-3.5 py-1.5 rounded-full border transition-all hover:bg-white"
                                style={{ backgroundColor: 'var(--navy-50)', borderColor: 'var(--navy-200)', color: 'var(--navy-700)' }}>{f}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div className="bg-white border-t py-3 px-4" style={{ borderColor: 'var(--navy-100)' }}>
              <div className="flex gap-2 items-center">
                <input type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
                  placeholder="암 치료에 대해 무엇이든 물어보세요..." disabled={isTyping}
                  className="flex-1 px-5 py-3 rounded-full text-sm outline-none transition-colors disabled:opacity-50"
                  style={{ backgroundColor: 'var(--navy-50)', border: '1.5px solid var(--navy-200)', color: 'var(--navy-900)' }} />
                <button onClick={() => handleSend()} disabled={isTyping || !input.trim()}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-opacity hover:opacity-85 disabled:opacity-40"
                  style={{ backgroundColor: 'var(--navy-900)' }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
