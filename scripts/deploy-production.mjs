import {spawnSync} from 'node:child_process';
for(const [command,args] of [['npm',['run','build']],['vercel',['deploy','--prod','--yes','--scope','happylifecares-projects']],['node',['scripts/notify-search.mjs']]]){
 const result=spawnSync(command,args,{stdio:'inherit'});
 if(result.status!==0)process.exit(result.status||1);
}
