import test from 'node:test';
import assert from 'node:assert/strict';
import {makeBirdVisit,sampleBirdVisit} from '../public/assets/js/bird-scenes.js';

test('artwork visits keep their destinations inside small and wide viewports and meet both ends',()=>{
  for (const width of [320,551,1280]) for (const kind of ['hero','rings','date','blossom','lantern','couple','letter','closing']) {
    const from={x:60,y:90};
    const visit=makeBirdVisit(kind,{left:-20,top:130,width:460,height:420},{width,height:800},from,.4);
    assert.ok(visit.duration<=2600, "encounters should respond within a short visit");
    assert.deepEqual(sampleBirdVisit(visit.points,0),from);
    const end=sampleBirdVisit(visit.points,1), expected=visit.points.at(-1);
    assert.ok(Math.hypot(end.x-expected.x,end.y-expected.y)<1e-9);
    for (const p of visit.points) assert.ok(p.x>=30&&p.x<=width-30&&p.y>=58&&p.y<=735);
    for(let t=0;t<=1;t+=.025) {
      const point=sampleBirdVisit(visit.points,t);
      assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.y));
    }
  }
  const rect={left:0,top:100,width:300,height:300},vp={width:551,height:884},from={x:80,y:80};
  assert.notDeepEqual(makeBirdVisit('couple',rect,vp,from,0),makeBirdVisit('couple',rect,vp,from,1));
});
