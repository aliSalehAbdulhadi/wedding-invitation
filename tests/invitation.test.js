import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateContent, buildCalendar, calendarLinks, escapeIcsText, foldIcsLine, cleanGuestName, cubicPoint, advanceSpring, advanceBirdWake, activeFlightStop } from '../public/assets/js/invitation.js';

const data = JSON.parse(readFileSync(new URL('../public/content.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

test('the bird follows the latest chapter that has risen into view, and returns when scrolling back', () => {
  const stops = [100, 1000, 2000, 3000];
  assert.equal(activeFlightStop(stops, 0, 900), 0);
  assert.equal(activeFlightStop(stops, 400, 900), 1);
  assert.equal(activeFlightStop(stops, 1500, 900), 2);
  assert.equal(activeFlightStop(stops, 9000, 900), 3);
  assert.equal(activeFlightStop(stops, 0, 900), 0);
  assert.equal(activeFlightStop([], 0, 900), 0);
});
test('the wake follows real movement, drifts and expires at rest, and stays bounded', () => {
  const wake = {previous:null, emittedAt:0, particles:[]};
  advanceBirdWake(wake, {x:0,y:0}, 0);
  for (let time=50;time<=2000;time+=50) advanceBirdWake(wake, {x:time/10,y:time/20}, time);
  assert.ok(wake.particles.length>0 && wake.particles.length<=32);
  const p = wake.particles.at(-1), before = p.y, born = p.born;
  advanceBirdWake(wake, {x:200,y:100}, 2050);
  assert.notEqual(p.y, before);
  assert.equal(p.born, born);
  for (let time=2100;time<=4000;time+=50) advanceBirdWake(wake, {x:200,y:100}, time);
  assert.equal(wake.particles.length, 0);
  advanceBirdWake(wake, {x:210,y:110}, 4050);
  assert.ok(wake.particles.length>0);
  advanceBirdWake(wake, {x:220,y:120}, 9000);
  assert.equal(wake.particles.length, 0);
});

test('configured content validates and event dates are explicit and ordered', () => {
  assert.equal(validateContent(data), data);
  assert.equal(data.music.startOnOpen, false);
  for (const change of [
    (copy) => { copy.event.start = '2027-05-21T19:00:00'; },
    (copy) => { copy.event.end = copy.event.start; },
    (copy) => { copy.event.timeZone = 'Invalid/City'; },
    (copy) => { delete copy.event.timeZone; },
    (copy) => { copy.venue.mapsUrl = 'javascript:alert(1)'; },
    (copy) => { copy.schedule[0].time = '25:00'; },
    (copy) => { copy.music.startOnOpen = 'false'; },
  ]) {
    const copy = structuredClone(data); change(copy);
    assert.throws(() => validateContent(copy));
  }
});

const calendarData=structuredClone(data);
calendarData.demo=true; calendarData.event.start='2027-05-21T19:00:00+03:00'; calendarData.event.end='2027-05-21T23:30:00+03:00';

test('calendar preserves the Baghdad instant in UTC and labels demo events', () => {
  const ics = buildCalendar(calendarData, 'ar', new Date('2026-10-22T12:00:00Z'));
  assert.match(ics, /DTSTART:20270521T160000Z\r\n/);
  assert.match(ics, /DTEND:20270521T203000Z\r\n/);
  assert.match(ics, /DTSTAMP:20261022T120000Z/);
  assert.match(ics, /SUMMARY:\[تجريبي\]/);
  assert.ok(ics.endsWith('END:VCALENDAR\r\n'));
  assert.ok(!/(?<!\r)\n/.test(ics));
  const production = structuredClone(calendarData); production.demo = false;
  assert.doesNotMatch(buildCalendar(production, 'en'), /\[DEMO\]/);
});

test('calendar text cannot inject a new property and UTF-8 folding respects 75 octets', () => {
  assert.equal(escapeIcsText('a,b;c\\d\r\nATTENDEE:bad'), 'a\\,b\\;c\\\\d\\nATTENDEE:bad');
  const source = 'SUMMARY:' + 'أهلًا وسهلًا بكم معنا في هذه الليلة الجميلة '.repeat(12);
  const folded = foldIcsLine(source);
  assert.equal(folded.replace(/\r\n /g, ''), source);
  for (const line of folded.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
});

test('Google and Outlook links contain the same correct instants and localized details', () => {
  const links = calendarLinks(calendarData, 'en');
  const google = new URL(links.google);
  const outlook = new URL(links.outlook);
  assert.equal(google.searchParams.get('dates'), '20270521T160000Z/20270521T203000Z');
  assert.equal(google.searchParams.get('ctz'), 'Asia/Baghdad');
  assert.match(google.searchParams.get('text'), /^\[DEMO\]/);
  assert.equal(outlook.searchParams.get('startdt'), '2027-05-21T16:00:00.000Z');
  assert.equal(outlook.searchParams.get('enddt'), '2027-05-21T20:30:00.000Z');
});

test('guest names retain Arabic shaping, normalize whitespace, and reject invalid lengths', () => {
  assert.equal(cleanGuestName('  سارة   أحمد  '), 'سارة أحمد');
  assert.equal(cleanGuestName('e\u0301'), 'é');
  assert.equal(cleanGuestName('Ali\u202e'), 'Ali');
  assert.throws(() => cleanGuestName('   '));
  assert.throws(() => cleanGuestName('A'.repeat(61)));
  assert.equal(cleanGuestName('<script>alert(1)</script>'), '<script>alert(1)</script>');
});

test('the continuous flight meets both anchors and keeps steady vertical scroll progress', () => {
  const a = {x: 100, y: 0};
  const c1 = {x: 180, y: 100};
  const c2 = {x: 280, y: 200};
  const b = {x: 200, y: 300};
  assert.deepEqual(cubicPoint(a, c1, c2, b, 0), a);
  assert.deepEqual(cubicPoint(a, c1, c2, b, 1), b);
  for (const t of [0, .1, .25, .5, .75, 1]) {
    const point = cubicPoint(a, c1, c2, b, t);
    assert.ok(Math.abs(point.y - 300 * t) < 1e-9);
    assert.ok(Number.isFinite(point.x));
  }
});

test('the bird follows with inertia, settles, and does not teleport to a new destination', () => {
  const bird = {x:0,y:0,vx:0,vy:0};
  const target = {x:200,y:100};
  advanceSpring(bird,target,1/60);
  assert.ok(bird.x>0 && bird.x<20);
  assert.ok(bird.vx>0);
  for (let frame=0;frame<240;frame++) advanceSpring(bird,target,1/60);
  assert.ok(Math.abs(bird.x-200)<.1 && Math.abs(bird.y-100)<.1);
  const before=bird.x;
  advanceSpring(bird,{x:20,y:40},1/60);
  assert.ok(Math.abs(bird.x-before)<10);
  const a={x:0,y:0,vx:0,vy:0},b={...a};
  advanceSpring(a,target,10); advanceSpring(b,target,.033);
  assert.deepEqual(a,b);
});


test('the venue subtitle reaches both calendar formats and validates in both languages',()=>{
  const venueData=structuredClone(data);
  venueData.venue.subtitle={ar:'نادي الضباط',en:'Officers’ Club'};
  assert.equal(validateContent(venueData),venueData);
  for (const language of ['ar','en']) {
    assert.ok(buildCalendar(venueData,language).replace(/\r\n /g,'').includes(venueData.venue.subtitle[language]));
    for (const link of Object.values(calendarLinks(venueData,language))) assert.ok(new URL(link).searchParams.get('location').includes(venueData.venue.subtitle[language]));
  }
  venueData.venue.subtitle={ar:'نادي الضباط'};
  assert.throws(()=>validateContent(venueData));
});
