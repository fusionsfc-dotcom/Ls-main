import { useEffect, useRef, useState } from 'react';
import graph from '../../data/pvmGraph.json';
import { useExperience } from '../experience/ExperienceProvider';

const colors = ['115,239,207', '118,206,255', '255,205,133', '215,174,255'];
const signalColors = [...colors, '255,169,189'];
type Props = { variant?: 'hero' | 'compact'; tone?: 'care' | 'technology' | 'practice' };

/** The numeric graph contains actual, anonymized document links. Camera and orbits are illustrative. */
export function PvmNetwork({ variant = 'hero', tone = 'care' }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const { paused } = useExperience();
  const [ready, setReady] = useState(false);
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
    let anchors: {x:number;y:number;color:string;neighbors:number[]}[] = [];
    const measureAnchors = () => {
      const base = element.getBoundingClientRect();
      anchors = [...host.querySelectorAll<HTMLElement>('.pvm-constellation-anchor')].map(el => {
        const r=el.getBoundingClientRect();
        return {x:r.left+r.width/2-base.left,y:r.top+r.height/2-base.top,color:getComputedStyle(el).backgroundColor,neighbors:[]};
      });
    };
    const project = (x:number, y:number, z:number, scale = 1, target = {x:0,y:0,z:0,perspective:1}) => {
      const px = x*cosAngle+z*sinAngle, pz = z*cosAngle-x*sinAngle;
      const py = y*cosTilt-pz*sinTilt, depth = y*sinTilt+pz*cosTilt;
      const perspective = 2.7 / (2.7-depth*.65);

      target.x=width*.56+px*radiusX*perspective*scale*breath+pointerX*18;
      target.y=height*.49+py*radiusY*perspective*scale*breath+pointerY*12;
      target.z=depth;target.perspective=perspective;return target;
    };
    const draw = () => {
      const angle=.32+time*.025+pointerX*.16, tilt=-.22+Math.sin(time*.17)*.16+pointerY*.12;
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
      graph.nodes.forEach(([x,y,z],i)=>project(x,y,z,1,points[i]));
      for(const [edgeIndex,[a,b]] of graph.edges.entries()){
        const p=points[a],q=points[b]; const depth=(p.z+q.z+2)/4;
        // Soft waves reveal connected edges without switching the whole field on/off.
        const wave=Math.pow((Math.sin(time*.65-edgeIndex*.071)+1)/2,8);
        ctx.strokeStyle=`rgba(${tone==='technology'?'113,175,235':'117,196,198'},${.025+depth*.09+wave*.16})`;
        ctx.lineWidth=.45+depth*.35;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
      }
      // Bright travelling signals are constrained to real edges, with short trails.
      for(let i=0;i<((width<768||touch.matches)?24:44);i++){
        const [a,b]=graph.edges[(i*59)%graph.edges.length],p=points[a],q=points[b];
        const t=(time*(.12+i%3*.025)+i*.137)%1;
        const head={x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t};
        const tail=Math.max(0,t-.045);
        const signalColor=signalColors[i%signalColors.length];
        ctx.strokeStyle=`rgba(${signalColor},.62)`;ctx.lineWidth=1.2;ctx.beginPath();
        ctx.moveTo(p.x+(q.x-p.x)*tail,p.y+(q.y-p.y)*tail);ctx.lineTo(head.x,head.y);ctx.stroke();
        ctx.fillStyle=`rgba(${signalColor},.95)`;ctx.beginPath();ctx.arc(head.x,head.y,1.7,0,Math.PI*2);ctx.fill();
      }
      // Topic annotations join the same moving background points. These are conceptual
      // associations, not claims about classification of individual private records.
      anchors.forEach((anchor,index) => {
        if(!anchor.neighbors.length) anchor.neighbors=points.map((p,i)=>({i,d:(p.x-anchor.x)**2+(p.y-anchor.y)**2})).sort((a,b)=>a.d-b.d).slice(2,12).map(p=>p.i);
        anchor.neighbors.forEach((id,j)=>{
          const p=points[id];
          const wave=(Math.sin(time*.7+j*.7+index)+1)/2;
          ctx.strokeStyle=anchor.color;ctx.globalAlpha=.12+wave*.18;ctx.lineWidth=.6;
          ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(anchor.x,anchor.y);ctx.stroke();
          if(j%3===0){
            const t=(time*.11+j*.21+index*.16)%1;
            const x=p.x+(anchor.x-p.x)*t,y=p.y+(anchor.y-p.y)*t;
            ctx.globalAlpha=Math.sin(t*Math.PI)*.85;ctx.fillStyle=anchor.color;
            ctx.beginPath();ctx.arc(x,y,1.35,0,Math.PI*2);ctx.fill();
          }
        });
        ctx.globalAlpha=1;
        const glow=ctx.createRadialGradient(anchor.x,anchor.y,0,anchor.x,anchor.y,42);
        glow.addColorStop(0,anchor.color);glow.addColorStop(1,'transparent');
        ctx.globalAlpha=.13;ctx.fillStyle=glow;ctx.fillRect(anchor.x-42,anchor.y-42,84,84);ctx.globalAlpha=1;
      });
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
      ctx.setTransform(dpr,0,0,dpr,0,0);measureAnchors();draw();setReady(true);
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
    const observer=new ResizeObserver(resize);observer.observe(element);const map=host.querySelector('.pvm-constellation');const layoutObserver=new ResizeObserver(()=>{measureAnchors();draw();});if(map)layoutObserver.observe(map);
    const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(raf);raf=0;}});intersection.observe(host);
    host.addEventListener('pointermove',move,{passive:true});host.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);resize();
    return ()=>{elapsed.current=time;cancelAnimationFrame(raf);observer.disconnect();layoutObserver.disconnect();intersection.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);};
  },[paused,variant,tone]);
  return <figure className={`pvm-network pvm-network-${variant}`} data-paused={paused} ref={frame} aria-label="PVM 실제 문서 연결 구조를 입체적으로 재구성한 배경">
    <div className="pvm-network-stage">
      <img className={`pvm-network-fallback ${ready?'is-ready':''}`} src="/images/optimized-v1/pvm-network.svg" width="1200" height="700" alt="" aria-hidden="true" decoding="async" fetchPriority="low" /><canvas ref={canvas} aria-hidden="true"/>
    </div>
    <figcaption><div><strong>PVM KNOWLEDGE NETWORK</strong><span>실제 문서 연결 구조 · 시각적 재구성</span></div></figcaption>
  </figure>;
}
