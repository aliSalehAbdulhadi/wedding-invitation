import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const main=readFileSync(new URL('../public/assets/js/main.js',import.meta.url),'utf8');
const heartbeat=main.slice(main.indexOf('function startBirdHeartbeat()'),main.indexOf("addEventListener('visibilitychange'",main.indexOf('function startBirdHeartbeat()')));

test('bird visits cannot fork the heartbeat; hidden and reduced-motion frames stop and can resume',()=>{
  const queued=new Map();let next=0,now=0,wakes=0;
  const state={
    birdRaf:0,entranceFlight:false,motion:{matches:false},document:{hidden:false},
    performance:{now:()=>now},requestAnimationFrame:fn=>{queued.set(++next,fn);return next},
    birdLastFrame:0,birdFrameInterval:32,birdLastScrollAt:0,birdPersonality:0,birdScrollVelocity:0,
    birdDestination:{x:100,y:120,vx:0,reading:{width:390,height:844}},
    birdBody:{x:100,y:120,vx:0,vy:0,angle:0,facing:1},
    birdSwoop:null,birdDialog:null,birdVisit:null,birdAction:null,birdRest:null,
    birdNextCuriosity:Infinity,birdDialogTarget:null,birdBehavior:'',
    musicCompanion:{energy:.2,swell:.1},bounded:(v,min,max)=>Math.max(min,Math.min(max,v)),
    advanceSpring(){},placeBird(){},$(){return {classList:{toggle(){}},dataset:{}}},
    // A visit starts from inside the frame and wakes the same heartbeat.
    firstBirdVisit(){wakes++;runInNewContext('startBirdHeartbeat()',state);return null},
  };
  runInNewContext(heartbeat,state);
  const frame=time=>{now=time;const [id,fn]=queued.entries().next().value;queued.delete(id);fn(time)};
  state.startBirdHeartbeat();assert.equal(queued.size,1);
  frame(1000);assert.equal(wakes,1);assert.equal(queued.size,1,'a visit must reuse the active loop');
  assert.equal(state.birdLastFrame,1000,'a nested wake must not reset the animation clock');
  frame(1010);assert.equal(queued.size,1,'a throttled frame keeps one continuation');
  frame(1050);assert.equal(queued.size,1);
  state.document.hidden=true;frame(1100);assert.equal(queued.size,0);assert.equal(state.birdRaf,0);
  state.document.hidden=false;state.startBirdHeartbeat();assert.equal(queued.size,1);
  state.motion.matches=true;frame(1200);assert.equal(queued.size,0);assert.equal(state.birdRaf,0);
  state.motion.matches=false;state.startBirdHeartbeat();assert.equal(queued.size,1);
});
