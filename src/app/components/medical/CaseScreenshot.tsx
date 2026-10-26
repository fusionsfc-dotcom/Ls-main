import { useEffect, useId, useRef, useState } from 'react';
import { Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';

type Screen = { base: string; widths: number[]; width: number; height: number; caption: string; alt: string };
export const caseScreens: Record<string, Screen> = {
  'happy-life': { base: '/images/editorial-v1/happylife', widths: [480, 960], width: 960, height: 675, caption: '해피라이프케어 · 공개 홈페이지', alt: '해피라이프케어 공개 홈페이지 화면' },
  'happy-care': { base: '/images/happycare-v1/nutrition', widths: [480, 900, 1129], width: 1129, height: 656, caption: '해피케어 병원 프로그램 · 영양관리', alt: '해피케어 병원 프로그램의 영양관리 화면: 부서 워크리스트, 식수 인원과 상담 현황' },
  'spacecare': { base: '/images/spacecare-v2/hotel-dashboard', widths: [480, 900, 1315], width: 1315, height: 856, caption: '모두의 공간케어 · 호텔 운영 데모', alt: '모두의 공간케어 호텔 운영 데모: 객실 현황과 완료 기록' },
  'spacelink': { base: '/images/spacelink-v1/project-dashboard', widths: [480, 750], width: 750, height: 667, caption: '스페이스링크 · 내 프로젝트 샘플', alt: '스페이스링크 내 프로젝트 샘플: 프로젝트 개요와 작업 진행 현황' },
  'gaax': { base: '/images/gaax-v1/advisor', widths: [480, 900, 1440], width: 1440, height: 1000, caption: 'GAAX · 설계사 체험 · 가상 데이터', alt: 'GAAX 설계사 체험 화면: 고객, 만기, 일정과 보험 포트폴리오. 가상 데이터 예시' },
  'namsung-chemical': { base: '/images/editorial-v1/namsung', widths: [480, 960], width: 960, height: 675, caption: '남성케미칼 · 공개 홈페이지', alt: '남성케미칼 공개 홈페이지 화면' },
};

export function CaseScreenshot({ id, name }: { id: string; name: string }) {
  const screen = caseScreens[id];
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const hintId = useId();
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    closeButton.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [open]);
  if (!screen) return null;
  const full = `${screen.base}-${screen.width}.webp`;
  const show = (target: HTMLElement) => { opener.current = target; setZoomed(window.matchMedia('(max-width:767px)').matches); setOpen(true); };
  const close = () => setOpen(false);
  return <>
    <figure className="ed-screen ax-screen">
      <button type="button" className="ax-screen-trigger" aria-label={`${name} 화면 확대 보기`} aria-haspopup="dialog" onClick={event => show(event.currentTarget)}>
        <img src={full} srcSet={screen.widths.map(width => `${screen.base}-${width}.webp ${width}w`).join(', ')} sizes="(max-width:767px) calc(100vw - 40px), (max-width:999px) 44vw, 570px" width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" decoding="async" fetchPriority="low" />
        <span className="ax-screen-badge" aria-hidden="true"><Maximize2 size={16} /> 화면 확대</span>
      </button>
      <figcaption><span>{screen.caption}</span><button type="button" aria-haspopup="dialog" onClick={event => show(event.currentTarget)}>크게 보기 <Maximize2 size={15} aria-hidden="true" /></button></figcaption>
    </figure>
    {open && <dialog ref={dialog} className="ax-image-dialog" aria-labelledby={titleId} aria-describedby={hintId} onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const elements = event.currentTarget.querySelectorAll<HTMLElement>('button, [tabindex="0"]');
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }}>
      <div className="ax-image-toolbar"><h2 id={titleId}>{name} 화면</h2><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(value => !value)}>{zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}<span>{zoomed ? '화면 맞춤' : '원본 크기'}</span></button><button ref={closeButton} type="button" onClick={close} aria-label="확대 화면 닫기"><X size={22} /></button></div>
      <p id={hintId} className="ax-image-hint">{screen.caption} · 원본 크기에서는 화면을 밀어 자세히 볼 수 있습니다.</p>
      <div className={`ax-image-viewport ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="확대 이미지 스크롤 영역"><img src={full} width={screen.width} height={screen.height} alt={screen.alt} style={zoomed ? { width: screen.width, maxWidth: 'none' } : undefined} /></div>
    </dialog>}
  </>;
}
