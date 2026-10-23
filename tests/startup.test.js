import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../public/index.html', import.meta.url),'utf8');
const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function start(protocol='https:') {
  const classes = new Set(['no-js']);
  let timeout, cleared=false, closed=0;
  const root = {classList:{add:v=>classes.add(v),remove:v=>classes.delete(v),replace:(a,b)=>{if(classes.delete(a)) classes.add(b);}}};
  const history={scrollRestoration:'auto'};
  const context={history,location:{protocol},window:{HTMLDialogElement:class{}},document:{documentElement:root,body:{classList:{remove(){}}},getElementById:()=>({close(){closed++;}})},setTimeout:fn=>(timeout=fn,1),clearTimeout:()=>{cleared=true;}};
  runInNewContext(bootstrap,context);
  return {classes,history,startup:context.window.invitationStartup,expire:()=>timeout(),cleared:()=>cleared,closed:()=>closed};
}

test('startup shields the first paint, releases on success, and cannot trap readers on failure',()=>{
  const success=start();
  assert.ok(success.classes.has('opening-pending'));
  assert.equal(success.history.scrollRestoration,'manual');
  success.startup.release();
  assert.equal(success.classes.has('opening-pending'),false);
  assert.equal(success.cleared(),true);
  assert.equal(success.startup.failed,false);

  const timeout=start();
  timeout.classes.delete('no-js'); timeout.classes.add('js');
  timeout.expire();
  assert.equal(timeout.startup.failed,true);
  assert.equal(timeout.classes.has('opening-pending'),false);
  assert.ok(timeout.classes.has('no-js'));
  assert.equal(timeout.closed(),1);
  assert.equal(start('file:').startup,undefined);
});
