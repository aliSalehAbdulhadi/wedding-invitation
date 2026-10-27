import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceMusicStroke} from '../public/assets/js/music-companion.js';

test('engraved passages start promptly, react to audio, and disappear before moving to another edge',()=>{
  let seed=1763;
  const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
  const state={active:null,nextAt:0,lastSide:-1,id:0};
  assert.equal(advanceMusicStroke(state,1,.6,random),null);
  assert.ok(state.nextAt<=601,'first passage starts within 600ms');
  assert.equal(advanceMusicStroke(state,state.nextAt,0,random),null,'silence does not start a new passage');
  let previousSide=-1;const sides=new Set();
  for(let i=0;i<7;i++){
    const entering=advanceMusicStroke(state,state.nextAt+1,.6,random);
    assert.equal(entering.opacity,0,'a new edge starts invisible');
    assert.notEqual(entering.side,previousSide);sides.add(entering.side);previousSide=entering.side;
    const middle=entering.born+entering.duration/2;
    const quiet=advanceMusicStroke(state,middle,.2,random);
    const louder=advanceMusicStroke(state,middle,.8,random);
    assert.ok(quiet.opacity>.45&&louder.opacity>quiet.opacity&&louder.opacity<.75);
    assert.ok(louder.offset<entering.offset,'the ink travels along a short local path');
    assert.equal(louder.side,entering.side);assert.equal(louder.along,entering.along,'placement is fixed for one passage');
    const finished=entering.born+entering.duration+1;
    assert.equal(advanceMusicStroke(state,finished,.6,random),null);
    assert.equal(state.active,null);assert.ok(state.nextAt-finished>=900);
    assert.equal(advanceMusicStroke(state,state.nextAt-1,.6,random),null);
  }
  assert.ok(sides.size>=3,'passages use more than two opposite edges');
});
