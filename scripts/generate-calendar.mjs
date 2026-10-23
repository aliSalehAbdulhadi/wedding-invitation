// Regenerate both hosted files whenever the confirmed event details change.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { validateContent, buildCalendar } from '../public/assets/js/invitation.js';

const content = validateContent(JSON.parse((await readFile(new URL('../public/content.json', import.meta.url), 'utf8')).replace(/^\uFEFF/, '')));
const folder = new URL('../public/assets/calendar/', import.meta.url);
await mkdir(folder, { recursive: true });
const now = new Date();
for (const language of ['ar', 'en']) {
  await writeFile(new URL(`wedding-${language}.ics`, folder), buildCalendar(content, language, now));
}
console.log('Generated Arabic and English calendar files.');
