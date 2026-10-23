// Shared, browser-independent event validation and calendar generation.
export function validateContent(data) {
  const bilingual = (value) => value && ['ar', 'en'].every((key) => typeof value[key] === 'string' && value[key].trim() && value[key].length <= 2000);
  if (!data || typeof data.demo !== 'boolean' || !bilingual(data.couple?.first) || !bilingual(data.couple?.second)) throw new Error('Invalid couple details');
  if (data.music && typeof data.music.startOnOpen !== 'boolean') throw new Error('Music startOnOpen must be a boolean');
  const event = data.event;
  if (!event || !/^[a-zA-Z0-9_-]{1,100}$/.test(event.id) || !bilingual(event.title) || !bilingual(event.description)) throw new Error('Invalid event');
  for (const key of ['start', 'end']) {
    if (typeof event[key] !== 'string' || !/(Z|[+-]\d{2}:\d{2})$/.test(event[key]) || !Number.isFinite(Date.parse(event[key]))) throw new Error('Event needs an ISO date with an explicit offset');
  }
  if (Date.parse(event.end) <= Date.parse(event.start)) throw new Error('Event must end after it starts');
  if (typeof event.timeZone !== 'string' || !event.timeZone.trim()) throw new Error('Event needs an IANA time zone');
  new Intl.DateTimeFormat('en', { timeZone: event.timeZone }).format(new Date(event.start));
  if (!['name', 'address', 'note', 'mapLabel'].every((key) => bilingual(data.venue?.[key]))) throw new Error('Invalid venue');
  if (data.venue.subtitle !== undefined && !bilingual(data.venue.subtitle)) throw new Error('Invalid venue subtitle');
  const map = new URL(data.venue.mapsUrl);
  if (map.protocol !== 'https:' || !['www.google.com', 'maps.google.com', 'maps.app.goo.gl', 'maps.apple.com', 'goo.gl'].includes(map.hostname) || map.username || map.password) throw new Error('Use a secure Google Maps or Apple Maps link');
  if (data.venue.coordinates !== undefined) {
    const { latitude, longitude } = data.venue.coordinates || {};
    if (!Number.isFinite(latitude) || Math.abs(latitude) > 90 || !Number.isFinite(longitude) || Math.abs(longitude) > 180) throw new Error('Invalid venue coordinates');
  }
  if (!Array.isArray(data.schedule) || data.schedule.length > 12 || !data.schedule.every((item) => /^([01]\d|2[0-3]):[0-5]\d$/.test(item.time) && bilingual(item.title) && bilingual(item.note))) throw new Error('Invalid schedule');
  if (!['invitation', 'quote', 'closing'].every((key) => bilingual(data.copy?.[key]))) throw new Error('Invalid invitation copy');
  return data;
}

export function eventTitle(data, language) {
  return `${data.demo ? (language === 'ar' ? '[تجريبي] ' : '[DEMO] ') : ''}${data.event.title[language]}`;
}

export function escapeIcsText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

export function foldIcsLine(line) {
  const encoder = new TextEncoder();
  const parts = [];
  let part = '';
  let length = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (length + size > 75) {
      parts.push(part);
      part = ' ';
      length = 1;
    }
    part += character;
    length += size;
  }
  parts.push(part);
  return parts.join('\r\n');
}

export function utcCalendarDate(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function buildCalendar(data, language = 'ar', now = new Date()) {
  const location = [data.venue.name[language], data.venue.subtitle?.[language], data.venue.address[language]].filter(Boolean).join(', ');
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Our Story//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${data.event.id}@wedding-invitation.local`, `DTSTAMP:${utcCalendarDate(now)}`,
    `DTSTART:${utcCalendarDate(data.event.start)}`, `DTEND:${utcCalendarDate(data.event.end)}`,
    `SUMMARY:${escapeIcsText(eventTitle(data, language))}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(`${data.event.description[language]}\n${data.venue.mapsUrl}`)}`,
    'STATUS:CONFIRMED', 'TRANSP:OPAQUE', 'END:VEVENT', 'END:VCALENDAR',
  ];
  return lines.map(foldIcsLine).join('\r\n') + '\r\n';
}

export function calendarLinks(data, language = 'ar') {
  const title = eventTitle(data, language);
  const location = [data.venue.name[language], data.venue.subtitle?.[language], data.venue.address[language]].filter(Boolean).join(', ');
  const description = `${data.event.description[language]}\n${data.venue.mapsUrl}`;
  const google = new URL('https://calendar.google.com/calendar/r/eventedit');
  google.search = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${utcCalendarDate(data.event.start)}/${utcCalendarDate(data.event.end)}`, details: description, location, ctz: data.event.timeZone, stz: data.event.timeZone, etz: data.event.timeZone }).toString();
  const outlook = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  outlook.search = new URLSearchParams({ path: '/calendar/action/compose', rru: 'addevent', subject: title, startdt: new Date(data.event.start).toISOString(), enddt: new Date(data.event.end).toISOString(), body: description, location }).toString();
  return { google: google.href, outlook: outlook.href };
}

// Platform hints choose a useful default; websites cannot enumerate unrelated installed apps.
export function preferredApps(device = {}) {
  const apple = /iPhone|iPad|iPod|Mac/i.test(`${device.userAgentData?.platform || ''} ${device.platform || ''} ${device.userAgent || ''}`);
  return { maps: apple ? 'apple' : 'google', calendar: apple ? 'device' : 'google' };
}

export function mapLinks(data, language = 'ar') {
  const apple = new URL('https://maps.apple.com/');
  const label = [data.venue.name[language], data.venue.subtitle?.[language]].filter(Boolean).join(' · ');
  const point = data.venue.coordinates;
  apple.searchParams.set('q', point ? label : `${label}, ${data.venue.address[language]}`);
  if (point) apple.searchParams.set('ll', `${point.latitude},${point.longitude}`);
  return { apple: apple.href, google: data.venue.mapsUrl };
}

export function cleanGuestName(value) {
  const name = String(value).normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, '').replace(/\s+/g, ' ').trim();
  const count = typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(name)].length : Array.from(name).length;
  if (!name || count > 60) throw new Error('Enter a name with 1 to 60 characters');
  return name;
}

export function cubicPoint(a, c1, c2, b, t) {
  const u = 1 - t;
  return { x: u*u*u*a.x + 3*u*u*t*c1.x + 3*u*t*t*c2.x + t*t*t*b.x, y: u*u*u*a.y + 3*u*u*t*c1.y + 3*u*t*t*c2.y + t*t*t*b.y };
}

export function advanceSpring(body, target, elapsed) {
  const dt = Math.min(.033, Math.max(0, elapsed));
  body.vx += ((target.x-body.x)*28 - body.vx*8.2)*dt;
  body.vy += ((target.y-body.y)*28 - body.vy*8.2)*dt;
  body.x += body.vx*dt;
  body.y += body.vy*dt;
  return body;
}

// The paper bird keeps company with the last chapter whose anchor has risen into the lower viewport.
// Scrolling only chooses the destination; the flight itself is time-based and springy.
export function activeFlightStop(anchorYs, scroll, viewportHeight) {
  let active = 0;
  anchorYs.forEach((y, index) => { if (y - scroll < viewportHeight * .86) active = index; });
  return active;
}

// A small, time-lived wake follows actual flight, independently of scroll progress.
export function advanceBirdWake(wake, point, now) {
  const previous = wake.previous;
  wake.previous = { ...point, time: now };
  if (!previous || now - previous.time > 200) {
    wake.particles.length = 0;
    wake.emittedAt = now;
    return wake.particles;
  }
  const dt = Math.max(0, (now - previous.time) / 1000);
  const dx = point.x - previous.x, dy = point.y - previous.y;
  const speed = dt ? Math.hypot(dx, dy) / dt : 0;
  wake.particles = wake.particles.filter((p) => now - p.born < p.life);
  for (const p of wake.particles) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= Math.exp(-dt * 1.4);
    p.vy *= Math.exp(-dt * 1.4);
  }
  if (speed > 18 && now - wake.emittedAt >= 65 && wake.particles.length < 20) {
    const angle = Math.atan2(dy, dx);
    const side = (Math.random() - .5) * 12;
    wake.particles.push({
      x: point.x - Math.cos(angle) * 16 - Math.sin(angle) * side,
      y: point.y - Math.sin(angle) * 16 + Math.cos(angle) * side,
      vx: -dx / dt * .045 + (Math.random() - .5) * 14,
      vy: -dy / dt * .045 - 5 - Math.random() * 7,
      born: now, life: 950 + Math.random() * 650,
      angle: angle * 180 / Math.PI, size: 5 + Math.random() * 9,
      glint: Math.random() < .22,
    });
    wake.emittedAt = now;
  }
  return wake.particles;
}
