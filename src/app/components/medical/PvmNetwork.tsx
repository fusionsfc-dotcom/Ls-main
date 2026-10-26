import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import graph from '../../data/pvmGraph.json';

const colors = ['148,229,211', '126,195,244', '235,201,143', '202,223,230'];
type Props = { variant?: 'hero' | 'compact'; tone?: 'care' | 'technology' | 'practice' };

/** The numeric graph contains actual, anonymized document links. Camera and orbits are illustrative. */
export function PvmNetwork({ variant = 'hero', tone = 'care' }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(motion.matches);
    update(); motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const element = canvas.current, host = frame.current?.parentElement;
    const ctx = element?.getContext('2d');
    if (!element || !host || !ctx) return;
    const touch = matchMedia('(pointer: coarse)');
    let raf = 0, last = 0, visible = false, width = 0, height = 0;
    let time = elapsed.current, pointerX = 0, pointerY = 0, aimX = 0, aimY = 0;
    let sinAngle=0, cosAngle=1, sinTilt=0, cosTilt=1, radiusX=0, radiusY=0, breath=1;
    const points=graph.nodes.map(([, , ,degree,group])=>({x:0,y:0,z:0,perspective:1,degree,group}));
    const depthOrder=[...points];
    const project = (x:number, y:number, z:number, scale = 1, target = {x:0,y:0,z:0,perspective:1}) => {
      const px = x*cosAngle+z*sinAngle, pz = z*cosAngle-x*sinAngle;
      const py = y*cosTilt-pz*sinTilt, depth = y*sinTilt+pz*cosTilt;
      const perspective = 2.7 / (2.7-depth*.65);

      target.x=width*.56+px*radiusX*perspective*scale*breath+pointerX*18;
      target.y=height*.49+py*radiusY*perspective*scale*breath+pointerY*12;
      target.z=depth;target.perspective=perspective;return target;
    };
    const draw = () => {
      const angle=.32+time*.13+pointerX*.16, tilt=-.22+Math.sin(time*.17)*.16+pointerY*.12;
      sinAngle=Math.sin(angle);cosAngle=Math.cos(angle);sinTilt=Math.sin(tilt);cosTilt=Math.cos(tilt);
      radiusX=width<768?width*.94:width*.60;radiusY=height*(variant==='compact'?.94:.77);breath=1+Math.sin(time*.28)*.035;
      ctx.clearRect(0,0,width,height);
      // A sparse, deep field extends beyond the central graph across the full hero.
      for (let i=0;i<90;i++) {
        const x=((i*173.17+time*(i%3+1)*1.8)%(width+60))-30;
        const y=((i*97.31)%(height+40))-20;
        ctx.fillStyle=`rgba(149,200,218,${.12+(i%4)*.055})`;
        ctx.beginPath();ctx.arc(x,y,i%9===0?1.7:.7,0,Math.PI*2);ctx.fill();
      }
      // Three perspective orbits add depth, rather than a flat circular frame.
      for (let orbit=0;orbit<3;orbit++) {
        ctx.beginPath();
        for(let i=0;i<=150;i++){
          const a=i/150*Math.PI*2 + time*(orbit%2 ? -.055 : .075);
          const x=Math.cos(a)*1.12, y=Math.sin(a)*(.27+orbit*.28), z=Math.sin(a)*(.93-orbit*.31);
          const p=project(x,y,z,1.03);
          if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);
        }
        ctx.strokeStyle=orbit===1?'rgba(222,194,143,.17)':'rgba(119,204,215,.18)';
        ctx.lineWidth=orbit===1?.9:.65;ctx.stroke();
        const a=time*(.3+orbit*.08)+orbit*2;
        const p=project(Math.cos(a)*1.12,Math.sin(a)*(.27+orbit*.28),Math.sin(a)*(.93-orbit*.31),1.03);
        const glow=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,20);
        glow.addColorStop(0,'rgba(175,235,226,.7)');glow.addColorStop(1,'rgba(175,235,226,0)');
        ctx.fillStyle=glow;ctx.fillRect(p.x-20,p.y-20,40,40);
      }
      graph.nodes.forEach(([x,y,z],i)=>project(x,y,z,1,points[i]));
      for(const [a,b] of graph.edges){
        const p=points[a],q=points[b]; const depth=(p.z+q.z+2)/4;
        ctx.strokeStyle=`rgba(${tone==='technology'?'113,175,235':'117,196,198'},${.035+depth*.15})`;
        ctx.lineWidth=.45+depth*.35;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
      }
      // Bright travelling signals are constrained to real edges, with short trails.
      for(let i=0;i<((width<768||touch.matches)?18:32);i++){
        const [a,b]=graph.edges[(i*59)%graph.edges.length],p=points[a],q=points[b];
        const t=(time*(.12+i%3*.025)+i*.137)%1;
        const head={x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t};
        const tail=Math.max(0,t-.045);
        ctx.strokeStyle='rgba(188,236,227,.45)';ctx.lineWidth=1.1;ctx.beginPath();
        ctx.moveTo(p.x+(q.x-p.x)*tail,p.y+(q.y-p.y)*tail);ctx.lineTo(head.x,head.y);ctx.stroke();
        ctx.fillStyle='rgba(218,247,236,.9)';ctx.beginPath();ctx.arc(head.x,head.y,1.5,0,Math.PI*2);ctx.fill();
      }
      for(const p of depthOrder.sort((a,b)=>a.z-b.z)){
        const opacity=.28+(p.z+1)*.32;
        const size=(p.degree>45?2.6:p.degree>18?1.65:.85)*p.perspective;
        const rgb=colors[p.group];
        if(p.degree>45&&p.z>-.2){
          const halo=size*(5.5+Math.sin(time*1.2+p.x*.02)*1.2);
          const glow=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,halo);
          glow.addColorStop(0,`rgba(${rgb},.32)`);glow.addColorStop(1,`rgba(${rgb},0)`);
          ctx.fillStyle=glow;ctx.fillRect(p.x-halo,p.y-halo,halo*2,halo*2);
        }
        ctx.fillStyle=`rgba(${rgb},${opacity})`;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill();
      }
    };
    const resize = () => {
      const box=element.getBoundingClientRect();if(width===box.width&&height===box.height)return;
      width=box.width;height=box.height;
      const dpr=Math.min(window.devicePixelRatio||1,(width<768||touch.matches)?1.25:1.75);
      element.width=Math.round(width*dpr);element.height=Math.round(height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);draw();setReady(true);
    };
    const tick = (now:number) => {
      raf=0;
      if(!visible||document.hidden||paused)return;
      const delta=Math.min((now-last)/1000,.05);
      if(now-last>=32){time+=delta*((width<768||touch.matches)?.65:1);last=now;pointerX+=(aimX-pointerX)*.06;pointerY+=(aimY-pointerY)*.06;draw();}
      raf=requestAnimationFrame(tick);
    };
    const schedule = () => {if(!raf&&visible&&!document.hidden&&!paused){last=performance.now();raf=requestAnimationFrame(tick);}};
    const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse'||paused)return;const r=host.getBoundingClientRect();aimX=(event.clientX-r.left)/r.width-.5;aimY=(event.clientY-r.top)/r.height-.5;};
    const leave=()=>{aimX=0;aimY=0;};
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();};
    const observer=new ResizeObserver(resize);observer.observe(element);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(raf);raf=0;}});intersection.observe(host);
    host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);resize();
    return ()=>{elapsed.current=time;cancelAnimationFrame(raf);observer.disconnect();intersection.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);};
  },[paused,variant,tone]);
  return <figure className={`pvm-network pvm-network-${variant}`} data-paused={paused} ref={frame} aria-label="PVM 실제 문서 연결 구조를 입체적으로 재구성한 배경">
    <div className="pvm-network-stage">
      <img className={`pvm-network-fallback ${ready?'is-ready':''}`} src="/images/optimized-v1/pvm-network.svg" width="1200" height="700" alt="" aria-hidden="true" decoding="async" fetchPriority="low" /><canvas ref={canvas} aria-hidden="true"/>
    </div>
    <figcaption><div><strong>PVM KNOWLEDGE NETWORK</strong><span>실제 문서 연결 구조 · 시각적 재구성</span></div><button type="button" onClick={()=>setPaused(v=>!v)} aria-label={paused?'네트워크 움직임 재생':'네트워크 움직임 일시정지'} aria-pressed={paused}>{paused?<Play size={15}/>:<Pause size={15}/>}</button></figcaption>
  </figure>;
}
