// Static first paint from the same anonymous graph. No document titles or paths.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const graph=JSON.parse(readFileSync(new URL('../src/app/data/pvmGraph.json',import.meta.url)));
const colors=['148,229,211','126,195,244','235,201,143','202,223,230'];const f=n=>Number(n.toFixed(3));
const lines=graph.edges.filter((_,i)=>i%4===0).map(([a,b])=>`<path d="M${f(670+graph.nodes[a][0]*690)} ${f(340+graph.nodes[a][1]*500)}L${f(670+graph.nodes[b][0]*690)} ${f(340+graph.nodes[b][1]*500)}"/>`).join('');
const dots=graph.nodes.map(([x,y,z,d,g])=>`<circle cx="${f(670+x*690)}" cy="${f(340+y*500)}" r="${d>45?2.5:1.2}" fill="rgb(${colors[g]})" opacity="${f(.35+(z+1)*.25)}"/>`).join('');
mkdirSync(new URL('../public/images/optimized-v1/',import.meta.url),{recursive:true});writeFileSync(new URL('../public/images/optimized-v1/pvm-network.svg',import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" preserveAspectRatio="none"><g stroke="#89b7c7" stroke-opacity=".2" stroke-width=".7">${lines}</g>${dots}</svg>`);
