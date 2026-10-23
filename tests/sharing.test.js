import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

test('sharing metadata and a real lightweight image use the confirmed public hostname',()=>{
  const root=new URL('../public/',import.meta.url);
  const html=readFileSync(new URL('index.html',root),'utf8');
  const tags=new Map([...html.matchAll(/<meta\s+(?:property|name)="([^"]+)"\s+content="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  const origin='https://wedding-invitation-20-11.vercel.app';
  assert.equal(tags.get('og:url'),origin+'/');
  assert.ok(tags.get('og:title').includes('علي وتبارك'));
  assert.ok(tags.get('og:description').includes('قاعة خيال'));
  assert.equal(tags.get('twitter:card'),'summary_large_image');
  assert.ok(html.includes(`<link rel="canonical" href="${origin}/">`));
  assert.equal(tags.get('robots'),'noindex, nofollow');
  const imageURL=new URL(tags.get('og:image'));
  assert.equal(imageURL.origin,origin);
  const file=new URL('.'+imageURL.pathname,root),png=readFileSync(file);
  assert.equal(png.subarray(1,4).toString(),'PNG');
  assert.equal(png.readUInt32BE(16),1200); assert.equal(png.readUInt32BE(20),630);
  assert.ok(statSync(file).size<300000);
  const robots=readFileSync(new URL('robots.txt',root),'utf8');
  assert.match(robots,/User-agent: WhatsApp\s+Allow: \//);
  assert.match(robots,/User-agent: \*\s+Disallow: \//);
});
