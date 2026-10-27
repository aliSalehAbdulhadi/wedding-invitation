import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { preferredApps, mapLinks, buildCalendar, calendarLinks, validateContent } from '../public/assets/js/invitation.js';

const data = JSON.parse(readFileSync(new URL('../public/content.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
test('Apple devices including desktop-mode iPad prefer device calendar and Apple Maps; others keep web-capable Google links', () => {
  for (const platform of ['iPhone', 'iPad', 'MacIntel']) assert.deepEqual(preferredApps({platform}), {maps:'apple',calendar:'device'});
  assert.equal(preferredApps({userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) CriOS/150'}).maps,'apple');
  for (const platform of ['Android','Windows','Linux','']) assert.deepEqual(preferredApps({userAgentData:{platform}}), {maps:'google',calendar:'google'});
});
test('Apple pins use verified venue coordinates and Google retains the supplied exact listing', () => {
  for (const language of ['ar','en']) {
    const links=mapLinks(data,language), apple=new URL(links.apple);
    assert.equal(apple.protocol,'https:'); assert.equal(apple.hostname,'maps.apple.com');
    assert.equal(apple.searchParams.get('ll'),'33.3376782,44.4264857');
    assert.ok(apple.searchParams.get('q').includes(data.venue.name[language]));
    assert.equal(links.google,data.venue.mapsUrl);
  }
  const copy=structuredClone(data); delete copy.venue.coordinates;
  assert.ok(new URL(mapLinks(copy).apple).searchParams.get('q').includes(data.venue.address.ar));
  for (const coordinates of [null,{latitude:91,longitude:44},{latitude:33,longitude:-181},{latitude:'33',longitude:44}]) {
    copy.venue.coordinates=coordinates; assert.throws(()=>validateContent(copy));
  }
});
test('both hosted files match the current confirmed event and Google uses the supported compose route', () => {
  for (const language of ['ar','en']) {
    const file=readFileSync(new URL(`../public/assets/calendar/wedding-${language}.ics`,import.meta.url),'utf8');
    const withoutStamp=ics=>ics.replace(/^DTSTAMP:.*\r\n/m,'');
    assert.equal(withoutStamp(file),withoutStamp(buildCalendar(data,language)));
    assert.ok(file.includes('DTSTART:20261120T120000Z\r\n'));
    assert.ok(file.includes('DTEND:20261120T180000Z\r\n'));
    const google=new URL(calendarLinks(data,language).google);
    assert.equal(google.pathname,'/calendar/r/eventedit');
    assert.equal(google.searchParams.get('stz'),'Asia/Baghdad');
    assert.equal(google.searchParams.get('etz'),'Asia/Baghdad');
  }
});
