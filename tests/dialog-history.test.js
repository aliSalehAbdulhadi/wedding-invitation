import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';

const main=readFileSync(new URL('../public/assets/js/main.js',import.meta.url),'utf8');
const source=main.slice(main.indexOf("const dialogHistoryKey="),main.indexOf('// A native mobile keyboard'));
function setup(initial={source:'invitation'}) {
  const entries=[initial],events=new Map(),timers=new Map(),navigation=[];let index=0,nextTimer=0,backCalls=0;
  const dialogs=['keepsake-dialog','calendar-dialog'].map(id=>{const classes=new Set();return {id,open:false,classList:{contains:v=>classes.has(v),add:v=>classes.add(v),remove:v=>classes.delete(v)},showModal(){this.open=true},close(){this.open=false}}});
  const history={get state(){return entries[index]},pushState(state){entries.splice(index+1);entries.push(state);index++},replaceState(state){entries[index]=state},back(){backCalls++;navigation.push(()=>{index--;events.get('popstate')({state:entries[index]})})},forward(){navigation.push(()=>{index++;events.get('popstate')({state:entries[index]})})}};
  const context={history,WeakMap,motion:{matches:false},keepsakeExportController:null,
    $$:selector=>selector==='.modal'?dialogs:dialogs.filter(d=>d.open),
    addEventListener:(name,fn)=>events.set(name,fn),syncKeepsakeViewport(){},syncDialogState(){},visitBirdDialog(){},
    setTimeout:fn=>{timers.set(++nextTimer,fn);return nextTimer},clearTimeout:id=>timers.delete(id)};
  runInNewContext(source,context);context.initializeDialogHistory();
  return {context,dialogs,history,entries,timers,navigate:()=>navigation.shift()(),flush:()=>{for(const [id,fn] of [...timers]){timers.delete(id);fn()}},get backCalls(){return backCalls}};
}

test('one modal opening adds one Back step and repeated close requests consume it only once',()=>{
  const s=setup(),dialog=s.dialogs[0];s.context.showDialog(dialog);s.context.showDialog(dialog);
  assert.equal(s.entries.length,2);assert.equal(s.history.state.weddingInvitationDialog,dialog.id);
  assert.equal(s.history.state.source,'invitation');
  s.context.closeDialog(dialog);s.context.closeDialog(dialog);assert.equal(s.backCalls,1);
  s.navigate();s.flush();assert.equal(dialog.open,false);assert.equal(s.history.state.weddingInvitationDialog,undefined);
});

test('Back closes without another Back; quick Forward cancels a stale close timer',()=>{
  const s=setup(),dialog=s.dialogs[0];s.context.showDialog(dialog);
  s.history.back();s.navigate();assert.equal(s.timers.size,1);assert.equal(s.backCalls,1);
  s.history.forward();s.navigate();assert.equal(s.timers.size,0);s.flush();assert.equal(dialog.open,true);
  assert.equal(s.entries.length,2,'Forward must not add another entry');
  s.history.back();s.navigate();s.flush();assert.equal(dialog.open,false);
});

test('reload clears only stale modal state and navigating modal entries restores the right dialog',()=>{
  const s=setup({source:'invitation',weddingInvitationDialog:'keepsake-dialog'});
  assert.equal(s.history.state.source,'invitation');assert.equal(s.history.state.weddingInvitationDialog,undefined);
  s.context.showDialog(s.dialogs[0]);s.context.showDialog(s.dialogs[1]);
  s.history.back();s.navigate();s.flush();assert.equal(s.dialogs[0].open,true);assert.equal(s.dialogs[1].open,false);
});
