import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceLightWash} from '../public/assets/js/music-companion.js';

test('light reflections fade away before changing edge, leave quiet gaps, and stay dimmer on night scenes',()=>{
  let seed=1763;
  const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  const state={active:null,nextAt:0,lastSide:-1,id:0};
  let now=0,previousSide=-1;const sides=new Set();
  assert.equal(advanceLightWash(state,now,.6,false,random),null);
  for(let i=0;i<7;i++){
    now=state.nextAt+1;
    const entering=advanceLightWash(state,now,.6,false,random);
    assert.equal(entering.opacity,0,'new placement begins invisible');
    assert.notEqual(entering.side,previousSide);sides.add(entering.side);previousSide=entering.side;
    const middle=entering.born+entering.duration/2;
    const paper=advanceLightWash(state,middle,.6,false,random);
    const night=advanceLightWash(state,middle,.6,true,random);
    assert.ok(paper.opacity>0&&paper.opacity<=.15);
    assert.ok(night.opacity>0&&night.opacity<=.065&&night.opacity<paper.opacity/2);
    assert.equal(night.x,entering.x);assert.equal(night.y,entering.y,'a reflection does not orbit the screen');
    assert.ok(Math.abs(night.dx)<=28&&Math.abs(night.dy)<=28,'local drift stays small');
    const finished=entering.born+entering.duration+1;
    assert.equal(advanceLightWash(state,finished,.6,true,random),null);
    assert.equal(state.active,null);assert.ok(state.nextAt-finished>=1600);
    assert.equal(advanceLightWash(state,state.nextAt-1,.6,false,random),null);
  }
  assert.ok(sides.size>=3,'successive appearances are not confined to two opposite sides');
});
