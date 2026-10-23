import test from 'node:test';
import assert from 'node:assert/strict';
import { themes, getTheme, isDevelopmentHost, resolveThemeId } from '../public/assets/js/themes.js';

function luminance(hex) {
  const rgb=hex.match(/[a-f0-9]{2}/gi).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);

test('eleven complete bilingual palettes retain readable body, secondary, accent, and night text',()=>{
  assert.equal(themes.length,11);
  assert.equal(new Set(themes.map(t=>t.id)).size,11);
  for (const theme of themes) {
    assert.ok(theme.name.ar&&theme.name.en&&theme.note.ar&&theme.note.en);
    assert.deepEqual(Object.keys(theme.colors).sort(),Object.keys(themes[0].colors).sort());
    for (const color of Object.values(theme.colors)) assert.match(color,/^#[a-f0-9]{6}$/i);
    const c=theme.colors;
    for (const role of ['ink','muted','gold-ink']) assert.ok(contrast(c[role],c.paper)>=4.5,`${theme.id} ${role} contrast`);
    assert.ok(contrast(c.cream,c.night)>=7,`${theme.id} night text contrast`);
    assert.ok(contrast(c.white,c.ink)>=7,`${theme.id} primary button contrast`);
  }
});

test('developer palette preference never overrides the configured theme on a public host',()=>{
  for (const host of ['localhost','127.0.0.1','::1','[::1]']) assert.equal(isDevelopmentHost(host),true);
  for (const host of ['wedding.example.com','localhost.example.com','192.168.1.4','example.com']) assert.equal(isDevelopmentHost(host),false);
  assert.equal(resolveThemeId('midnight','sage','localhost'),'sage');
  assert.equal(resolveThemeId('midnight','sage','wedding.example.com'),'midnight');
  assert.equal(resolveThemeId('pearl','invalid','localhost'),'pearl');
  assert.equal(resolveThemeId('invalid',undefined,'example.com'),'olive');
  assert.equal(getTheme('unknown').id,'olive');
});
