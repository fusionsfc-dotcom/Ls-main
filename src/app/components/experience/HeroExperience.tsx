import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, Plus, Minus, RotateCcw, Play, Square, Zap } from 'lucide-react';
import { useExperience } from './ExperienceProvider';

type Section = 'input' | 'analysis' | 'output';
type SceneController = {
  select: (mode: number) => void; pause: (value: boolean) => void; dispose: () => void;
  focus: (section: Section | null) => void; speed: (value: number) => void; zoom: (delta: number) => void;
  turn: (dx: number, dy: number) => void; pulse: () => void; auto: (value: boolean) => void; reset: () => void;
};
const chapters = ['진단', '설계', '구축', '운영'];
const sections: Section[] = ['input', 'analysis', 'output'];
const stages = [
  { input: ['데이터', '시장·고객·업무 자료를 연결합니다.'], analysis: ['분석', '자료 사이의 관계와 업무 문제를 살펴봅니다.'], output: ['진단', '실행 방향을 정리한 진단 리포트로 이어집니다.'] },
  { input: ['요건', '현장의 업무 요건과 필요한 데이터를 모읍니다.'], analysis: ['설계', '전략·업무·운영을 하나의 구조로 설계합니다.'], output: ['전략', '실행 가능한 AX 전략과 구조로 연결됩니다.'] },
  { input: ['설계', '설계한 업무 흐름과 데이터를 연결합니다.'], analysis: ['구축', '웹·앱·자동화를 직접 만드는 단계입니다.'], output: ['시스템', '업무에 사용할 수 있는 시스템으로 이어집니다.'] },
  { input: ['기록', '운영 중 쌓이는 기록을 다시 살펴봅니다.'], analysis: ['개선', '데이터로 측정하고 개선할 지점을 찾습니다.'], output: ['운영', '개선 내용을 다음 운영에 반영하는 순환입니다.'] },
];
export function HeroExperience({ hero, initialMode }: { hero: HTMLElement; initialMode: number }) {
  const canvas = useRef<HTMLCanvasElement>(null), controller = useRef<SceneController>();
  const hotspotRefs = useRef<Record<string, HTMLButtonElement | null>>({}), expandRef = useRef<HTMLButtonElement>(null), dialogRef = useRef<HTMLDivElement>(null);
  const { paused } = useExperience();
  const [mode, setMode] = useState(initialMode), [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Section | null>(null), [speed, setSpeed] = useState(1);
  const [guided, setGuided] = useState(false), [expanded, setExpanded] = useState(false), [injected, setInjected] = useState(false);
  const settings = useRef({ paused, mode, selected, speed, guided }); settings.current = { paused, mode, selected, speed, guided };
  useEffect(() => {
    let cancelled = false; setReady(false);
    import('./createAXScene').then(({ createAXScene }) => {
      if (cancelled || !canvas.current) return;
      try {
        controller.current = createAXScene(canvas.current, hero, settings.current.mode, settings.current.paused, {
          onMode: (next: number) => setMode(next), onSelect: (section: Section) => setSelected(section),
          onProject: (locations: Record<string, { x: number; y: number }>) => {
            for (const [name, position] of Object.entries(locations)) { const element = hotspotRefs.current[name]; if (element) { element.style.left = `${position.x}px`; element.style.top = `${position.y}px`; } }
          },
        });
        controller.current?.speed(settings.current.speed); controller.current?.focus(settings.current.selected); controller.current?.auto(settings.current.guided); setReady(true);
      } catch { if (canvas.current) canvas.current.dataset.state = 'fallback'; }
    }).catch(() => { if (canvas.current) canvas.current.dataset.state = 'fallback'; });
    return () => { cancelled = true; controller.current?.dispose(); controller.current = undefined; };
  }, [hero, initialMode, expanded]);
  useEffect(() => { controller.current?.pause(paused); }, [paused, ready]);
  useEffect(() => { controller.current?.select(mode); }, [mode, ready]);
  useEffect(() => { controller.current?.focus(selected); }, [selected, ready]);
  useEffect(() => { controller.current?.speed(speed); }, [speed, ready]);
  useEffect(() => { controller.current?.auto(guided); }, [guided, ready]);
  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('.ax-expand')?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setExpanded(false); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button,input,[tabindex="0"]') ?? [])].filter(element => !element.hasAttribute('disabled'));
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keydown); requestAnimationFrame(() => expandRef.current?.focus({ preventScroll: true })); };
  }, [expanded]);
  const manualMode = (next: number) => { setGuided(false); setMode(next); setSelected(null); setInjected(false); };
  const reset = () => { controller.current?.reset(); setSelected(null); setSpeed(1); setGuided(false); setInjected(false); };
  const visual = <div ref={dialogRef} className={`ax-visual ax-explorer ${ready ? 'ax-visual-ready' : ''} ${expanded ? 'ax-expanded' : ''}`} role={expanded ? 'dialog' : undefined} aria-modal={expanded || undefined} aria-label={expanded ? 'AX 데이터 흐름 탐색' : undefined}>
    <div className="ax-visual-glow" aria-hidden="true" />
    <div className="ax-fallback" aria-hidden="true"><i /><i /><i /><b>AX</b></div>
    <div className="ax-visual-caption"><span>LS / AX · FLOW EXPLORER</span></div>
    <button ref={expandRef} className="ax-expand" onClick={() => setExpanded(value => !value)} aria-label={expanded ? '탐색 모드 닫기' : '전체 화면으로 3D 탐색'} title={expanded ? '닫기 · Esc' : '전체 화면으로 탐색'}>{expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
    <div className="ax-scene-surface">
      <canvas ref={canvas} className="ax-webgl" role="img" aria-label="드래그와 방향키로 회전하는 AI 데이터 흐름" aria-describedby="ax-explorer-hint" tabIndex={0} onKeyDown={event => {
        const actions: Record<string, () => void> = { ArrowLeft: () => controller.current?.turn(-0.12, 0), ArrowRight: () => controller.current?.turn(0.12, 0), ArrowUp: () => controller.current?.turn(0, -0.1), ArrowDown: () => controller.current?.turn(0, 0.1), '+': () => controller.current?.zoom(0.15), '-': () => controller.current?.zoom(-0.15), Home: reset };
        if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
      }} />
      <div className="ax-hotspots">{sections.map(section => <button ref={element => { hotspotRefs.current[section] = element; }} key={section} aria-label={`${section === 'input' ? '입력' : section === 'analysis' ? '분석' : '결과'} 노드 탐색`} aria-pressed={selected === section} onClick={() => setSelected(value => value === section ? null : section)}><i />{stages[mode][section][0]}</button>)}</div>
    </div>
    <div className="ax-explorer-panel">
      <div className={`ax-node-insight ${selected ? 'ax-node-selected' : ''}`} aria-live="polite">
        <span>{selected ? stages[mode][selected][0] : '데이터가 전략이 되는 흐름'}</span>
        <p>{selected ? stages[mode][selected][1] : '노드를 선택하거나 장면을 드래그해 흐름을 탐색하세요.'}</p>
      </div>
      <div className="ax-flow-tools">
        <button className={injected ? 'ax-injected' : ''} disabled={!ready} onClick={() => { controller.current?.pulse(); setInjected(true); }} aria-label="시각화에 데이터 펄스 투입"><Zap size={12} />{injected ? '다시 투입' : '데이터 투입'}</button>
        <button disabled={!ready || paused} aria-pressed={guided} onClick={() => setGuided(value => !value)} aria-label={guided ? '자동 흐름 정지' : '4단계 흐름 자동 재생'}>{guided ? <Square size={11} /> : <Play size={11} />}{guided ? '흐름 정지' : '흐름 재생'}</button>
        <div className="ax-zoom-tools"><button disabled={!ready} onClick={() => controller.current?.zoom(-0.15)} aria-label="3D 축소"><Minus size={13} /></button><button disabled={!ready} onClick={() => controller.current?.zoom(0.15)} aria-label="3D 확대"><Plus size={13} /></button><button disabled={!ready} onClick={reset} aria-label="3D 탐색 초기화"><RotateCcw size={12} /></button></div>
      </div>
      <label className="ax-flow-speed"><span>흐름 속도</span><input type="range" min="0.3" max="2.5" step="0.1" value={speed} onChange={event => setSpeed(Number(event.target.value))} aria-label="데이터 흐름 속도" /><output>{speed.toFixed(1)}×</output></label>
      <p id="ax-explorer-hint" className="ax-explorer-hint">드래그로 회전 · 노드 선택 · + / − 확대</p>
    </div>
    <div className="ax-chapters" aria-label="3D 장면 선택">{chapters.map((chapter, index) => <button key={chapter} onClick={() => manualMode(index)} aria-pressed={mode === index} aria-label={`${chapter} 3D 장면 보기`}><span>0{index + 1}</span>{chapter}<i /></button>)}</div>
  </div>;
  return expanded ? createPortal(visual, document.body) : visual;
}
