import test from 'node:test';
import assert from 'node:assert/strict';
import {playOpeningChime} from '../public/assets/js/opening-sound.js';

test('the opening sound is quiet, finite, ascending, and releases all voices',()=>{
  const voices=[], gains=[];
  const context={currentTime:10,destination:{},createGain(){
    const node={gain:{value:0,setValueAtTime(){},linearRampToValueAtTime(v,t){assert.ok(v<=.3&&t>=10);},exponentialRampToValueAtTime(v,t){assert.equal(v,.0001);assert.ok(t<12);}},connect(){},disconnect(){this.disconnected=true;}};
    gains.push(node); return node;
  },createOscillator(){
    const node={frequency:{value:0},connect(){},start(t){this.startAt=t;},stop(t){this.stopAt=t;},disconnect(){this.disconnected=true;}};
    voices.push(node); return node;
  }};
  assert.equal(voices.length,0);
  playOpeningChime(context);
  assert.equal(voices.length,8); assert.ok(gains[0].gain.value<=.06);
  for (let i=0;i<voices.length;i++) {
    assert.ok(voices[i].stopAt>voices[i].startAt&&voices[i].stopAt<12);
    if (i>1) assert.ok(voices[i].frequency.value>voices[i-2].frequency.value);
    voices[i].onended();
  }
  assert.ok([...voices,...gains].every(n=>n.disconnected));
});
