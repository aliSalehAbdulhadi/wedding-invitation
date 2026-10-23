import test from 'node:test';
import assert from 'node:assert/strict';
import {drawBirdWake} from '../public/assets/js/bird-wake.js';

test('the wake draws inside a bounded tile, caps resolution, fades, and hides when empty',()=>{
  const strokes=[], transforms=[];
  const ctx={save(){},restore(){},translate(){},rotate(){},scale(){},beginPath(){},moveTo(){},lineTo(){},quadraticCurveTo(){},clearRect(...args){assert.deepEqual(args,[0,0,512,512]);},setTransform(...args){transforms.push(args);},stroke(){strokes.push(this.globalAlpha);}};
  const canvas={width:512,height:512,hidden:true,style:{},getContext:()=>ctx};
  const particle={x:100,y:200,born:0,life:1000,angle:0,size:8};
  drawBirdWake(canvas,[particle,{...particle,glint:true}],500,'#b6a37c',3);
  assert.equal(canvas.width,768); assert.equal(canvas.height,768);
  assert.equal(canvas.hidden,false);
  assert.deepEqual(transforms[0],[1.5,0,0,1.5,0,0]);
  assert.match(canvas.style.transform,/^translate3d\(/);
  assert.equal(strokes.length,2);
  assert.ok(strokes.every(alpha=>alpha>0&&alpha<.5));
  drawBirdWake(canvas,[],1200,'#b6a37c',3);
  assert.equal(canvas.hidden,true);
  assert.equal(strokes.length,2);
});
