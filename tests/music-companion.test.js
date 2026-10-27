import test from 'node:test';
import assert from 'node:assert/strict';
import {createMusicCompanion} from '../public/assets/js/music-companion.js';

test('song reactions use one audio route, settle on pause, and respect reduced motion and visibility',async()=>{
  const keys=['window','document','matchMedia','requestAnimationFrame','cancelAnimationFrame'];
  const previous=new Map(keys.map(key=>[key,Object.getOwnPropertyDescriptor(globalThis,key)]));
  const queued=new Map(),classes=new Set(),nodes=new Map();let next=0,contexts=0,routes=0,resumes=0;
  const reduced=Object.assign(new EventTarget(),{matches:false});
  const audio=Object.assign(new EventTarget(),{paused:true});
  const doc=Object.assign(new EventTarget(),{hidden:false,body:{classList:{add:v=>classes.add(v),remove:v=>classes.delete(v)}},querySelector(selector){if(!nodes.has(selector))nodes.set(selector,{style:{values:new Map(),setProperty(k,v){this.values.set(k,v)}}});return nodes.get(selector)}});
  class Context extends EventTarget {
    constructor(){super();contexts++;this.state='suspended';this.destination={};}
    createAnalyser(){return{fftSize:1024,connect(){routes++},getByteTimeDomainData(a){a.forEach((_,i)=>a[i]=i%2?132:124)}};}
    createMediaElementSource(element){assert.equal(element,audio);return{connect(){routes++},disconnect(){}};}
    resume(){resumes++;this.state='running';this.dispatchEvent(new Event('statechange'));return Promise.resolve();}
    suspend(){this.state='suspended';this.dispatchEvent(new Event('statechange'));return Promise.resolve();}
  }
  try {
    globalThis.window={AudioContext:Context};globalThis.document=doc;globalThis.matchMedia=()=>reduced;
    globalThis.requestAnimationFrame=fn=>{queued.set(++next,fn);return next};globalThis.cancelAnimationFrame=id=>queued.delete(id);
    const reaction=createMusicCompanion(audio);
    assert.equal(contexts,0,'no audio context before a music gesture');
    reaction.prepare();assert.equal(routes,0,'native audio is not rerouted before context permission resolves');audio.paused=false;audio.dispatchEvent(new Event('playing'));await Promise.resolve();
    const [id,tick]=queued.entries().next().value;queued.delete(id);tick(100);
    assert.ok(reaction.energy>0&&reaction.energy<1);assert.equal(classes.has('music-listening'),true);
    assert.equal(nodes.get('.music-ambience').style.values.get('--music-energy'),nodes.get('#story-bird').style.values.get('--music-energy'));
    reaction.prepare();assert.equal(contexts,1);assert.equal(routes,2,'one source-to-analyser-to-output path');
    audio.paused=true;audio.dispatchEvent(new Event('pause'));assert.equal(reaction.energy,0);assert.equal(queued.size,0);assert.equal(classes.size,0);
    reduced.matches=true;reduced.dispatchEvent(new Event('change'));audio.paused=false;const before=resumes;reaction.prepare();audio.dispatchEvent(new Event('playing'));assert.equal(resumes,before);assert.equal(queued.size,0);
    reduced.matches=false;reduced.dispatchEvent(new Event('change'));await Promise.resolve();assert.ok(queued.size>0);
    doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(queued.size,0);assert.equal(reaction.energy,0);
  } finally { for(const [key,descriptor] of previous)descriptor?Object.defineProperty(globalThis,key,descriptor):delete globalThis[key]; }
});
