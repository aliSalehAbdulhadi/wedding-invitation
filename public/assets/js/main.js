import { createMusicCompanion } from './music-companion.js?v=20261028-4';
import { drawBirdWake } from './bird-wake.js?v=20261028-4';
import { makeBirdVisit, sampleBirdVisit } from './bird-scenes.js?v=20261023-17';
import { validateContent, calendarLinks, mapLinks, preferredApps, cleanGuestName, cubicPoint, advanceSpring, advanceBirdWake, activeFlightStop } from './invitation.js?v=20261024-2';

import { initializeThemePreview, renderThemePreview, getActiveTheme } from './theme-preview.js?v=20261028-4';

const words = {
  ar: {
    storyWhisper: 'ومن هذا اللقاء، أضاءت ليلة.', nightWhisper: 'ولكل ليلةٍ مضيئة، وعد.', promiseWhisper: 'حتى تزهر الحكاية، ونلتقي.', gardenWhisper: 'وبقي في الرسالة مكانٌ لاسمك.',
    skip: 'انتقل إلى الدعوة', demo: 'دعوة تجريبية · جميع التفاصيل للمعاينة', brand: 'تبدأ الحكاية', navigation: 'التنقل', navDetails: 'تفاصيل الليلة', navLocation: 'المكان', navKeepsake: 'دعوتك الخاصة',
    heroEyebrow: 'بكل الحب، ندعوكم لحفل زفاف', heroTagline: 'حكاية واحدة. وعمرٌ من الحب.', scroll: 'والحكاية تبدأ هنا', heroNote: 'معكم، تصبح أجمل',
    storyEyebrow: 'الفصل الأول · حين التقينا', storyTitle: 'ومن بين كل الحكايات، اخترنا أن نكون معًا.', storySceneKicker: 'من حكايتين', storySceneClosing: 'إلى حكاية واحدة', together: 'معًا', promiseChapter: 'وعدٌ نكتبه معًا', letterForYou: 'وهذا الفصل، لك أنت.', celebrationEyebrow: 'الفصل الثاني · يومٌ نصنعه ذكرى', celebrationTitle: 'ليلةٌ تشبه الحلم.', timeZone: 'بتوقيت مكان الحفل', addCalendar: 'أضف إلى التقويم', otherCalendars:'خيارات تقويم أخرى', downloadCalendar:'احفظ ملف الموعد', planEyebrow: 'كل لحظة، ذكرى',
    quoteLabel: 'كلمات من القلب', quoteFootnote: 'معًا، تبدأ أجمل الأيام', arrivalLine:'هنا، يتحوّل الموعد إلى لقاء.', locationEyebrow: 'الفصل الثالث · كل الطرق تجمعنا', openMaps: 'افتح الموقع على الخريطة', mapArtLabel: 'رسم فني لحديقة، وليس خريطة للموقع',
    keepsakeEyebrow: 'الفصل الأخير · وأنت جزءٌ منه', keepsakeTitle: 'دعوة تحمل اسمك.', keepsakeCopy: 'لأنك جزء من الحكاية، صمّمنا لك دعوة خاصة. أضف اسمك، واحتفظ بقطعة من هذه الليلة.', personalize: 'اصنع دعوتك الخاصة', privacy: 'اسمك يبقى على جهازك. لا نجمعه ولا نرسله.',
    miniEyebrow: 'دعوة من القلب', dearGuest: 'إلى ضيفنا العزيز', yourName: 'اسمك الجميل هنا', footer: 'صُنعت بحب، لتُحفظ في القلب.', backTop: 'إلى البداية', music: 'الموسيقى', off: 'متوقفة', on: 'تعمل', musicPlay: 'تشغيل الموسيقى الهادئة', musicMute: 'كتم الموسيقى',
    openingBrand: 'بعض الدعوات، تُفتح بالقلب.', openingEyebrow: 'إلى من يجعلون فرحتنا أجمل', openingTitle: 'هذه الدعوة، لك.', openingLetter: 'بكل الحب', openInvitation: 'افتح الدعوة', openWithMusic: 'افتح الدعوة مع موسيقى هادئة', openingHint: 'افتح الرسالة، واتبع طائرنا في الحكاية. الموسيقى اختيارية.', openSilent: 'افتح بدون موسيقى', openingFooter: 'بدايتنا الأجمل، بوجودكم',
    close: 'إغلاق', calendarEyebrow: 'احتفظ بالموعد', calendarTitle: 'نلتقي في هذا اليوم.', calendarDescription: 'اختر تقويمك، واحتفظ بموعد ليلتنا.', googleHint: 'تطبيق Google أو المتصفح', outlookHint: 'Windows · الويب', appleCalendar: 'تقويم الجهاز', appleHint: 'افتح الموعد في تطبيق التقويم', calendarNote: 'يمكنك اختيار تقويم آخر أو حفظ ملف الموعد.',
    modalKeepsakeTitle: 'لنكتب اسمك في الحكاية.', modalKeepsakeCopy: 'دعوة باسمك، وذكرى من ليلتنا تبقى معك.', guestLabel: 'اسم الضيف', guestPlaceholder: 'اكتب اسمك هنا', guestHelp: 'اسمك يكمّل الحكاية.', downloadPng: 'احفظ دعوتك', preparing: 'نكتبها لك بكل الحب…', previewAlt: 'معاينة دعوتك الشخصية', saveAgain: 'حفظ الصورة مجددًا', saveHint: 'على iPhone، يمكنك فتح الصورة ثم الضغط مطولًا لحفظها في الصور.', invalidGuest: 'اكتب اسمًا من حرف واحد إلى ٦٠ حرفًا.', exportError: 'تعذّر إنشاء الصورة. تحقق من الاتصال بالخطوط المحلية وحاول مجددًا.', imageReady: 'دعوتك جاهزة. يمكنك حفظها أيضًا من المعاينة.', audioError: 'لم يبدأ الصوت. يمكنك تشغيله من زر الموسيقى.', configError: 'تعذّر تحميل تفاصيل الدعوة. حدّث الصفحة أو تحقق من ملف content.json.',
  },
  en: {
    storyWhisper: 'And from that meeting, an evening began to glow.', nightWhisper: 'Every luminous evening holds a promise.', promiseWhisper: 'Until the story blooms, and we meet.', gardenWhisper: 'There is still a place in the letter for your name.',
    skip: 'Skip to invitation', demo: 'Demo invitation · all details are for preview', brand: 'Our story begins', navigation: 'Navigation', navDetails: 'The evening', navLocation: 'The setting', navKeepsake: 'Your keepsake',
    heroEyebrow: 'Together with love, we invite you to the wedding of', heroTagline: 'One story. A lifetime of love.', scroll: 'A little more of our story', heroNote: 'Sweeter with you here',
    storyEyebrow: 'Chapter one · A beautiful encounter', storyTitle: 'Of all the stories, we chose a life together.', storySceneKicker: 'Two lives', storySceneClosing: 'One beautiful story', together: 'together', promiseChapter: 'A promise, written together', letterForYou: 'And this chapter is yours.', celebrationEyebrow: 'Chapter two · A date becomes a promise', celebrationTitle: 'An evening to remember.', timeZone: 'Local time at the venue', addCalendar: 'Add to calendar', otherCalendars:'Other calendars', downloadCalendar:'Download calendar file', planEyebrow: 'Every moment, a memory',
    quoteLabel: 'A note from the heart', quoteFootnote: 'The loveliest days begin together', arrivalLine:'Here, a date becomes a gathering.', locationEyebrow: 'Chapter three · All paths lead here', openMaps: 'Find the celebration', mapArtLabel: 'An artistic garden illustration, not a geographical map',
    keepsakeEyebrow: 'The final chapter · You are part of it', keepsakeTitle: 'Your name. Our invitation.', keepsakeCopy: "You're part of this story. Make a little keepsake of the evening, with your name and a whole lot of love.", personalize: 'Make your invitation', privacy: 'Your name stays on your device. It is never collected or sent.',
    miniEyebrow: 'An invitation from the heart', dearGuest: 'Especially for', yourName: 'Your lovely name', footer: 'Made with love. Kept close to the heart.', backTop: 'Back to the beginning', music: 'Music', off: 'Off', on: 'On', musicPlay: 'Play soft background music', musicMute: 'Mute background music',
    openingBrand: 'Some invitations open the heart.', openingEyebrow: 'For the people who make our joy brighter', openingTitle: 'A little love letter. For you.', openingLetter: 'With love', openInvitation: 'Open the invitation', openWithMusic: 'Open the invitation with soft music', openingHint: 'Open the letter, and follow a little paper bird through our story. Music is optional.', openSilent: 'Open without music', openingFooter: 'Our beginning is brighter with you',
    close: 'Close', calendarEyebrow: 'Keep a little space for us', calendarTitle: "It's a date.", calendarDescription: 'Choose your calendar and keep a little space for our evening.', googleHint: 'Google app or browser', outlookHint: 'Windows · Web', appleCalendar: 'Device calendar', appleHint: 'Open the date in your calendar app', calendarNote: 'Choose another calendar, or keep the calendar file.',
    modalKeepsakeTitle: "Let's put your name in the story.", modalKeepsakeCopy: 'An invitation with your name, and a little memory of our evening.', guestLabel: 'Guest name', guestPlaceholder: 'Your name', guestHelp: 'A place for you in our story.', downloadPng: 'Save your invitation', preparing: 'Making a little magic…', previewAlt: 'Preview of your personalized invitation', saveAgain: 'Save the image again', saveHint: 'On iPhone, open the image and touch and hold to save it to Photos.', invalidGuest: 'Please enter a name with 1 to 60 characters.', exportError: 'The image could not be created. Check that local fonts loaded, then try again.', imageReady: 'Your invitation is ready. You can also save it from the preview.', audioError: 'Sound could not start. Try the music button.', configError: 'The invitation details could not load. Refresh the page or check content.json.',
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let content;
let language = 'ar';
let activeImageUrl;
let toastTimer;
let openingStarted = false;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const locale = () => language === 'ar' ? 'ar-IQ' : 'en-GB';
const text = (key) => words[language][key] || key;

function notify(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('is-visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('is-visible'), 4500);
}

function eventFormat(options) {
  return new Intl.DateTimeFormat(locale(), { calendar: 'gregory', timeZone: content.event.timeZone, ...options }).format(new Date(content.event.start));
}

// An empty field follows the page (placeholder and caret on the reading side); typed text picks its own direction.
function syncGuestDirection() {
  const input = $('#guest-name');
  input.dir = input.value ? 'auto' : document.documentElement.dir;
}
function renderLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  syncGuestDirection();
  for (const element of $$('[data-i18n]')) element.textContent = text(element.dataset.i18n);
  for (const [attribute, dataset] of [['aria-label', 'i18nAria'], ['placeholder', 'i18nPlaceholder'], ['alt', 'i18nAlt']]) {
    for (const element of $$(`[data-${attribute === 'aria-label' ? 'i18n-aria' : 'i18n-' + attribute}]`)) element.setAttribute(attribute, text(element.dataset[dataset]));
  }
  $('.joining-ring--one .orbit-name').dataset.name = language === 'ar' ? 'second' : 'first';
  $('.joining-ring--two .orbit-name').dataset.name = language === 'ar' ? 'first' : 'second';
  for (const element of $$('[data-name]')) element.textContent = content.couple[element.dataset.name][language];
  if ($('#guest-name').value.trim()) $('.mini-guest').textContent = $('#guest-name').value.trim();
  for (const element of $$('[data-copy]')) element.textContent = content.copy[element.dataset.copy][language];
  for (const element of $$('[data-venue]')) element.textContent = content.venue[element.dataset.venue][language];
  for (const element of $$('[data-venue-city]')) element.textContent = content.venue.address[language];
  const formats = {
    'data-event-date': { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' },
    'data-event-weekday': { weekday: 'long' }, 'data-event-day': { day: 'numeric' },
    'data-event-month': { month: '2-digit', year: 'numeric' }, 'data-event-time': { hour: 'numeric', minute: '2-digit' },
  };
  for (const [attribute, options] of Object.entries(formats)) for (const element of $$(`[${attribute}]`)) element.textContent = eventFormat(options);
  for (const button of $$('[data-language-toggle]')) {
    button.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    const label = button.querySelector('[data-language-label]');
    label.textContent = language === 'ar' ? 'English' : 'العربية';
    label.lang = language === 'ar' ? 'en' : 'ar';
    label.dir = language === 'ar' ? 'ltr' : 'rtl';
  }
  $('#demo-banner').hidden = !content.demo;
  $('#open-invitation').setAttribute('aria-label', text(content.music?.startOnOpen ? 'openWithMusic' : 'openInvitation'));
  $('#open-alternative').textContent = text(content.music?.startOnOpen ? 'openSilent' : 'openWithMusic');
  const apps = preferredApps(navigator);
  const maps = mapLinks(content, language);
  const otherMap = apps.maps === 'apple' ? 'google' : 'apple';
  $('#maps-link').href = maps[apps.maps];
  $('#maps-alternative').href = maps[otherMap];
  $('#maps-alternative').textContent = language === 'ar' ? `أو افتح في خرائط ${otherMap === 'apple' ? 'Apple' : 'Google'}` : `Or open in ${otherMap === 'apple' ? 'Apple' : 'Google'} Maps`;
  const brand = `${content.couple.first[language]} ${language === 'ar' ? 'و' : '& '}${content.couple.second[language]}`;
  $('#brand-link').setAttribute('aria-label', brand);
  $('#invitation-title').setAttribute('aria-label', brand);
  document.title = `${brand}${content.demo ? (language === 'ar' ? ' — تجريبي' : ' — Demo') : ''}`;
  $('meta[name="description"]').content = `${eventFormat({ day: '2-digit', month: '2-digit', year: 'numeric' })} · ${content.venue.name[language]}`;
  const offset = new Intl.DateTimeFormat('en', { timeZone: content.event.timeZone, timeZoneName: 'shortOffset' }).formatToParts(new Date(content.event.start)).find((part) => part.type === 'timeZoneName').value;
  $('[data-i18n="timeZone"]').textContent = `${text('timeZone')} (${offset.replace('GMT', 'UTC')})`;
  const links = calendarLinks(content, language);
  $('#google-calendar').href = links.google;
  $('#outlook-calendar').href = links.outlook;
  const calendarFile = `./assets/calendar/wedding-${language}.ics`;
  $('#device-calendar').href = calendarFile;
  $('#download-calendar').href = calendarFile;
  $('#calendar-link').href = apps.calendar === 'device' ? calendarFile : links.google;
  // Keep the invitation's document loader alive when WebKit hands a file to Calendar.
  $('#calendar-link').target = apps.calendar === 'device' ? '_blank' : '_self';
  $('#schedule-list').classList.remove('is-tracing');
  $('#schedule-list').replaceChildren(...content.schedule.map((item, index) => {
    const li = document.createElement('li');
    li.style.setProperty('--n', index);
    const time = document.createElement('span');
    time.className = 'timeline-time';
    time.textContent = new Intl.DateTimeFormat(locale(), { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(new Date(`2000-01-01T${item.time}:00Z`));
    const details = document.createElement('div');
    const title = document.createElement('h3'); title.textContent = item.title[language];
    const note = document.createElement('p'); note.textContent = item.note[language];
    details.append(title, note); li.append(time, details);
    return li;
  }));
  requestAnimationFrame(() => requestAnimationFrame(syncTimelineLight));
  $('#export-error').textContent = '';
  updateMusicButton();
  enhanceTypography();
  renderThemePreview(language);
  requestSceneFrame();
}

// The selected song is the invitation's only audio.
let playing = false;
let musicIntent = false;
let musicRequest = 0;
const backgroundMusic = $('#background-music');
const musicCompanion = createMusicCompanion(backgroundMusic);
async function startMusic() {
  const request=++musicRequest;
  if (!musicIntent || document.hidden) return;
  try {
    // Retry a failed request without leaving the guest stuck until a reload.
    if (backgroundMusic.error) backgroundMusic.load();
    // Play immediately within the guest's gesture, including on iPhone.
    musicCompanion.prepare();
    await backgroundMusic.play();
    if (request!==musicRequest) return;
    if (!musicIntent || document.hidden) { backgroundMusic.pause(); return; }
    playing = true;
    updateMusicButton();
  } catch {
    // A newer pause/play action owns the player; ignore superseded promises.
    if (request!==musicRequest) return;
    playing = false; musicIntent = false; updateMusicButton(); notify(text('audioError'));
  }
}
function stopMusic() {
  ++musicRequest;
  backgroundMusic.pause();
  playing = false;
  updateMusicButton();
}
function updateMusicButton() {
  $('#music-toggle').setAttribute('aria-pressed', String(playing));
  $('#music-toggle').setAttribute('aria-label', text(playing ? 'musicMute' : 'musicPlay'));
  $('#music-state').textContent = text(playing ? 'on' : 'off');
}

function startInvitation(withMusic) {
  if (openingStarted) return;
  openingStarted = true;
  if (withMusic) { musicIntent = true; void startMusic(); }
  window.scrollTo({ top: 0, behavior: 'instant' });
  const opening = $('#opening-dialog');
  opening.classList.add('is-unsealing');
  setTimeout(beginStoryFlight, motion.matches ? 0 : 330);
  setTimeout(() => {
    if (opening.open) opening.close();
    document.body.classList.add('invitation-open');
    $('#main').focus({ preventScroll: true });
  }, motion.matches ? 0 : 1250);
}

function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  if (dialog.id==='keepsake-dialog') keepsakeExportController?.abort();
  dialog.classList.add('is-closing');
  setTimeout(() => { dialog.close(); dialog.classList.remove('is-closing'); }, motion.matches ? 0 : 200);
}
function showDialog(dialog) {
  if (dialog.id!=='keepsake-dialog') keepsakeExportController?.abort();
  dialog.classList.remove('is-closing');
  dialog.showModal();
  syncDialogState();
  visitBirdDialog(dialog);
}
function syncDialogState() {
  document.documentElement.classList.toggle('dialog-open',Boolean($('dialog[open]')));
  document.body.classList.toggle('scene-covered',Boolean($('.modal[open]')));
}

function downloadBlob(blob, filename, keepUrl = false) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  if (!keepUrl) setTimeout(() => URL.revokeObjectURL(url), 60000);
  return url;
}


function drawPaperBird(ctx, x, y, palette) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.18); ctx.scale(1.25, 1.25); ctx.translate(-36, -32);
  const pieces = [
    ['M29 35 6 44 23 27Z', palette['gold']], ['M26 34 16 4 49 32Z', palette['glow']],
    ['M21 36 53 15 66 25 54 29 38 48Z', palette['soft']], ['M28 35 35 4 50 33 38 48Z', palette['white']],
  ];
  for (const [shape, color] of pieces) { const path = new Path2D(shape); ctx.fillStyle = color; ctx.strokeStyle = palette['gold']; ctx.lineWidth = .65; ctx.fill(path); ctx.stroke(path); }
  ctx.restore();
}

function fittedText(ctx, value, y, size, font, color, maxWidth = 960) {
  let actualSize = size;
  ctx.font = `${actualSize}px "${font}"`;
  while (ctx.measureText(value).width > maxWidth && actualSize > 14) {
    actualSize -= 1; ctx.font = `${actualSize}px "${font}"`;
  }
  if (ctx.measureText(value).width > maxWidth) throw new Error('Text cannot fit');
  ctx.fillStyle = color; ctx.fillText(value, 600, y);
}
async function createKeepsake(name, exportLanguage) {
  const palette = getActiveTheme().colors;
  const isArabic = exportLanguage === 'ar';
  const ui = words[exportLanguage];
  const font = isArabic ? 'Amiri' : 'Cormorant Garamond';
  const guestFont = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(name) ? 'Amiri' : font;
  const eventLocale = isArabic ? 'ar-IQ' : 'en-GB';
  const date = new Intl.DateTimeFormat(eventLocale, { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric', calendar: 'gregory', timeZone: content.event.timeZone }).format(new Date(content.event.start));
  const time = new Intl.DateTimeFormat(eventLocale, { hour: 'numeric', minute: '2-digit', timeZone: content.event.timeZone }).format(new Date(content.event.start));
  await Promise.all([
    document.fonts.load('120px "Amiri"', `${content.couple.first.ar} ${content.couple.second.ar} ${name}`),
    document.fonts.load('120px "Cormorant Garamond"', `${content.couple.first.en} ${content.couple.second.en} ${name}`),
    document.fonts.load('28px "Noto Sans Arabic"', 'دعوة من القلب'),
  ]);
  if (!document.fonts.check('120px "Amiri"', `${content.couple.first.ar} ${content.couple.second.ar}`) || !document.fonts.check('120px "Cormorant Garamond"', `${content.couple.first.en} ${content.couple.second.en}`)) throw new Error('Invitation fonts are unavailable');
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = palette['paper']; ctx.fillRect(0, 0, 1200, 1600);
  ctx.strokeStyle = palette['gold']; ctx.lineWidth = 1.5; ctx.strokeRect(49, 49, 1102, 1502);
  ctx.strokeStyle = palette['line']; ctx.strokeRect(62, 62, 1076, 1476);
  ctx.strokeStyle = palette['line']; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(160, 1390); ctx.lineTo(160, 590); ctx.bezierCurveTo(160, 100, 1040, 100, 1040, 590); ctx.lineTo(1040, 1390); ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = isArabic ? 'rtl' : 'ltr';
  fittedText(ctx, ui.miniEyebrow, 185, isArabic ? 32 : 27, isArabic ? 'Noto Sans Arabic' : 'Cormorant Garamond', palette['muted'], 800);
  drawPaperBird(ctx, 600, 335, palette);
  fittedText(ctx, content.couple.first[exportLanguage], 510, isArabic ? 154 : 132, font, palette['ink'], 820);
  fittedText(ctx, '&', 645, 76, 'Cormorant Garamond', palette['gold-ink'], 300);
  fittedText(ctx, content.couple.second[exportLanguage], 775, isArabic ? 154 : 132, font, palette['ink'], 820);
  ctx.strokeStyle = palette['gold']; ctx.beginPath(); ctx.moveTo(550, 916); ctx.lineTo(650, 916); ctx.stroke();
  fittedText(ctx, ui.dearGuest, 1000, isArabic ? 32 : 28, font, palette['muted'], 850);
  ctx.direction = /[\u0600-\u06ff]/u.test(name) ? 'rtl' : 'ltr';
  fittedText(ctx, name, 1093, 73, guestFont, palette['ink'], 860);
  ctx.direction = isArabic ? 'rtl' : 'ltr';
  fittedText(ctx, date, 1247, isArabic ? 33 : 30, font, palette['muted'], 840);
  fittedText(ctx, `${content.venue.name[exportLanguage]} · ${time}`, 1308, 30, font, palette['muted'], 840);
  if (content.venue.subtitle) fittedText(ctx, content.venue.subtitle[exportLanguage], 1350, 28, font, palette['muted'], 840);
  fittedText(ctx, content.venue.address[exportLanguage], 1392, 26, font, palette['muted'], 840);
  if (content.demo) fittedText(ctx, isArabic ? 'دعوة تجريبية · ليست مناسبة حقيقية' : 'DEMO INVITATION · NOT A REAL EVENT', 1495, 20, font, palette['muted'], 900);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG export failed')), 'image/png'));
}


// Chapters play by themselves when they arrive; scrolling only decides which one is awake.
let sceneFramePending = false;
const NS = 'http://www.w3.org/2000/svg';
const chapterEl = (tag, className, vars = {}) => {
  const node = document.createElement(tag);
  node.className = className;
  for (const [name, value] of Object.entries(vars)) node.style.setProperty(name, value);
  return node;
};
function enhanceTypography() {
  for (const heading of $$('.split')) {
    const value = heading.textContent.trim();
    heading.setAttribute('aria-label', value);
    heading.replaceChildren(...value.split(/\s+/).flatMap((word, index) => {
      const mask = document.createElement('span'); mask.className = 'word'; mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); inner.textContent = word; inner.style.setProperty('--w', index);
      mask.append(inner);
      return [mask, document.createTextNode(' ')];
    }));
  }
  const quote = $('[data-copy="quote"]');
  quote.replaceChildren(...content.copy.quote[language].split('\n').map((line, index) => {
    const mask = document.createElement('span'); mask.className = 'quote-line';
    const inner = document.createElement('span'); inner.textContent = line; inner.style.setProperty('--line', index);
    mask.append(inner); return mask;
  }));
}
let sceneLayoutDirty = true;
let flightGeometry;
function requestSceneFrame(event) {
  // Scroll changes viewport coordinates, not document geometry. Never remeasure all SVGs per scroll frame.
  if (event?.type !== 'scroll') sceneLayoutDirty = true;
  if (sceneFramePending) return;
  sceneFramePending = true;
  requestAnimationFrame(updateScenes);
}
function updateScenes() {
  sceneFramePending = false;
  const flightReading = readFlightWaypoints();
  measureBirdDialog();
  sceneLayoutDirty = false;
  updateStoryFlight(flightReading);
}
// Measure only on layout changes; CSS owns the continuous light and pause behavior.
function syncTimelineLight() {
  const list = $('#schedule-list'), rows = [...list.children];
  if (!rows.length) return;
  const centers = rows.map(row => {
    const marker = getComputedStyle(row,'::before');
    return row.offsetTop + parseFloat(marker.top) + parseFloat(marker.height)/2;
  });
  const first = centers[0], last = centers.at(-1), distance = last-first || 1;
  list.style.setProperty('--thread-start', `${first-3.5}px`);
  list.style.setProperty('--thread-end', `${last-3.5}px`);
  list.style.setProperty('--thread-distance', `${last-first}px`);
  rows.forEach((row,index) => row.style.setProperty('--stop-delay', `${(centers[index]-first)/distance * 6.5 * .76}s`));
  list.classList.add('is-tracing');
}
function initializeScenes() {
  if ('ResizeObserver' in window) new ResizeObserver(syncTimelineLight).observe($('#schedule-list'));
  else addEventListener('resize',syncTimelineLight,{passive:true});
  addEventListener('scroll', requestSceneFrame, { passive: true });
  addEventListener('resize', requestSceneFrame, { passive: true });
  motion.addEventListener('change', requestSceneFrame);
  window.visualViewport?.addEventListener('resize',requestSceneFrame);
  window.visualViewport?.addEventListener('scroll',requestSceneFrame);
  if ('ResizeObserver' in window) new ResizeObserver(requestSceneFrame).observe($('#main'));
  $('#main').addEventListener('transitionend', event => {
    if (['transform','translate','scale'].includes(event.propertyName)) requestSceneFrame();
  });
  requestSceneFrame();
}

// Chapter atmosphere stays live on screen; each foreground scene waits for its own arrival.
function initializeChapters() {
  const chapters = $$('[data-chapter],.hero');
  const arrivals = $$('.chapter .rise, .chapter .split, .story-art, .ring-universe, .date-card, .timeline, .quote-text, .location-art, .location-copy, .dance-hall, .mini-invitation, .keepsake-copy, .closing-rings, .jasmine-garden');
  const revealAll = () => {
    for (const chapter of chapters) chapter.classList.add('is-awake', 'is-live');
    for (const scene of arrivals) scene.classList.add('has-arrived');
  };
  if (motion.matches || !('IntersectionObserver' in window)) { revealAll(); return; }
  const atmosphere = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-live', entry.isIntersecting);
      if (entry.isIntersecting) entry.target.classList.add('is-awake');
    }
  });
  const entrance = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting || entry.intersectionRatio < (entry.target.matches('.ring-universe,.arrival-portal') ? .35 : .08)) continue;
      entry.target.classList.add('has-arrived');
      entrance.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px 0px 0px', threshold: [.08,.35] });
  // Register after the envelope closes, so a covered scene cannot use up its entrance.
  $('#opening-dialog').addEventListener('close', () => {
    for (const chapter of chapters) atmosphere.observe(chapter);
    for (const scene of arrivals) entrance.observe(scene);
  }, { once: true });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    atmosphere.disconnect(); entrance.disconnect(); revealAll();
  });
  document.body.classList.add('motion-ready');
}

// Stars, fireflies, petals, and blooms are decorative and generated, so the HTML stays readable.
function populateAtmosphere() {
  let seed = 20271;
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  for (const box of $$('[data-stars]')) {
    const host = box.parentElement;
    const count = Math.round(bounded(host.clientWidth * host.clientHeight / 18000, 24, 72));
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < count; index++) {
      const x = random() * 100;
      const bright = random() < .16;
      fragment.append(chapterEl('span', bright ? 'star star--bright' : 'star', {
        '--x': `${x.toFixed(2)}%`, '--y': `${(random() * 100).toFixed(2)}%`, '--s': `${(1 + random() * (bright ? 2.2 : 1.4)).toFixed(1)}px`,
        '--td': `${(3.4 + random() * 4).toFixed(1)}s`, '--tw': `${(-x / 100 * 8).toFixed(2)}s`,
      }));
    }
    box.append(fragment);
  }
  for (const box of $$('[data-motes]')) {
    for (let index = 0; index < Math.ceil(Number(box.dataset.motes) / 2); index++) {
      box.append(chapterEl('span', 'mote', {
        '--x': `${(random() * 100).toFixed(1)}%`, '--y': `${(25 + random() * 75).toFixed(1)}%`, '--s': `${(2 + random() * 3).toFixed(1)}px`,
        '--t': `${(9 + random() * 9).toFixed(1)}s`, '--d': `${(-random() * 16).toFixed(1)}s`,
        '--dx': `${(random() * 90 - 45).toFixed(0)}px`, '--dy': `${(-(40 + random() * 100)).toFixed(0)}px`,
      }));
    }
  }
  for (const box of $$('[data-petals]')) {
    for (let index = 0; index < Number(box.dataset.petals); index++) {
      box.append(chapterEl('span', 'petal', {
        '--x': `${(random() * 100).toFixed(1)}%`, '--s': `${(7 + random() * 6).toFixed(1)}px`,
        '--t': `${(11 + random() * 8).toFixed(1)}s`, '--d': `${(-random() * 18).toFixed(1)}s`, '--dx': `${(random() * 120 - 60).toFixed(0)}px`,
      }));
    }
  }
  for (const box of $$('[data-blooms]')) {
    for (let index = 0; index < Number(box.dataset.blooms); index++) {
      const bloom = document.createElementNS(NS, 'svg');
      bloom.setAttribute('class', 'bloom');
      for (const [name, value] of Object.entries({ '--x': `${(3 + random() * 92).toFixed(1)}%`, '--y': `${(random() * 70).toFixed(1)}%`, '--s': `${(20 + random() * 20).toFixed(0)}px`, '--b': index })) bloom.style.setProperty(name, value);
      const use = document.createElementNS(NS, 'use');
      use.setAttribute('href', '#jasmine-flower');
      bloom.append(use); box.append(bloom);
    }
  }
}

// Interactions answer the guest's hand, not the scroll bar.
function initializeInteractions() {
  for (const target of $$('[data-tilt]')) {
    let point;
    let frame = 0;
    target.addEventListener('pointermove', (event) => {
      if (motion.matches || event.pointerType === 'touch') return;
      point = event;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = target.getBoundingClientRect();
        target.style.setProperty('--mx', bounded((point.clientX - box.left) / box.width * 2 - 1, -1, 1).toFixed(3));
        target.style.setProperty('--my', bounded((point.clientY - box.top) / box.height * 2 - 1, -1, 1).toFixed(3));
      });
    }, { passive: true });
    target.addEventListener('pointerleave', () => { target.style.setProperty('--mx', '0'); target.style.setProperty('--my', '0'); });
  }
  // Native actions stay immediate. The light responds without intercepting clicks or map links.
  for (const control of $$('.button, .text-button, .calendar-option, .language-button, .dev-theme-trigger, .close-button')) {
    control.classList.add('magic-control');
    const edge=document.createElement('span');
    edge.className='magic-border'; edge.setAttribute('aria-hidden','true'); control.append(edge);
    const enchant = (event) => {
      if (motion.matches) return;
      if (!control.contains(edge)) control.append(edge);
      const box = control.getBoundingClientRect();
      control.style.setProperty('--touch-x', `${event.clientX ? event.clientX-box.left : box.width/2}px`);
      control.style.setProperty('--touch-y', `${event.clientY ? event.clientY-box.top : box.height/2}px`);
      control.classList.remove('is-enchanted'); void control.offsetWidth; control.classList.add('is-enchanted');
    };
    control.addEventListener('pointerdown',enchant,{passive:true});
    control.addEventListener('keydown',event => { if (event.key==='Enter'||event.key===' ') enchant(event); });
    control.addEventListener('animationend',event => { if (event.animationName==='magic-touch') control.classList.remove('is-enchanted'); });
  }
  for (const section of $$('[data-starlight]')) {
    const layer = section.querySelector('.starlight-layer');
    let lastAt = 0;
    let lastX = -99;
    let lastY = -99;
    let meteorAt = 0;
    const spawn = (event, size, spread) => {
      if (layer.childElementCount > 40) return;
      const box = section.getBoundingClientRect();
      const glint = chapterEl('span', 'glint', {
        '--x': `${event.clientX - box.left + (Math.random() - .5) * spread * 2}px`, '--y': `${event.clientY - box.top + (Math.random() - .5) * spread * 2}px`,
        '--s': `${size}px`, '--gx': `${(Math.random() - .5) * 40}px`, '--gy': `${12 + Math.random() * 34}px`,
      });
      glint.addEventListener('animationend', () => glint.remove(), { once: true });
      layer.append(glint);
    };
    section.addEventListener('pointermove', (event) => {
      if (motion.matches || event.pointerType === 'touch') return;
      const now = performance.now();
      if (now - lastAt < 70 || Math.hypot(event.clientX - lastX, event.clientY - lastY) < 22) return;
      lastAt = now; lastX = event.clientX; lastY = event.clientY;
      spawn(event, 5 + Math.random() * 7, 8);
    }, { passive: true });
    section.addEventListener('pointerdown', (event) => {
      if (motion.matches || event.target.closest('button, a, input, dialog')) return;
      for (let index = 0; index < 7; index++) spawn(event, 7 + Math.random() * 9, 44);
      const now = performance.now();
      // A tap leaves a little light for the companion to investigate.
      if (birdBody && !birdDialog && !entranceFlight) {
        clearBirdReaction(); birdVisit=null; birdSwoop=null;
        birdAction={began:now,duration:1050,from:{x:birdBody.x,y:birdBody.y},to:{x:bounded(event.clientX,35,innerWidth-35),y:bounded(event.clientY-22,65,innerHeight-75)},radius:22,direction:event.clientX>birdBody.x?1:-1,kind:'spark'};
        $('#story-bird').classList.add('is-curious');
        startBirdHeartbeat();
      }
      if (now - meteorAt < 2400) return;
      meteorAt = now;
      const box = section.getBoundingClientRect();
      const meteor = chapterEl('span', 'meteor meteor--tap', { '--x': `${box.width * (.55 + Math.random() * .4)}px`, '--y': `${Math.min(box.height * .5, event.clientY - box.top - 40 + Math.random() * 60)}px` });
      meteor.addEventListener('animationend', () => meteor.remove(), { once: true });
      layer.append(meteor);
    });
  }
}

// A single paper bird leaves the physical envelope and visits the story's ornaments.
let flightHasStarted = false;
let entranceFlight = false;
const birdWake = { previous: null, emittedAt: 0, particles: [] };
let wakePaintedAt = 0;
const wakeCanvas = $('#flight-canvas');
const flightStops = ['.hero-divider svg', '.ring-universe', '.date-card', '.quote-star', '.location-art', '.dance-hall', '.keepsake-stage .mini-star', '.closing-rings'];
// Where the bird likes to hover beside each stop, in pixels from its centre (smaller on phones).
const flightPerches = [[30, -12], [190, -150], [200, -190], [70, -46], [170, -230], [150, -105], [62, -40], [95, -60]];

function readFlightWaypoints() {
  if (!flightHasStarted) return null;
  if (flightGeometry && !sceneLayoutDirty) return { ...flightGeometry, scroll:scrollY, width:innerWidth, height:innerHeight };
  const positions = flightStops.map((selector) => {
    const element = $(selector);
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + scrollY + rect.height / 2, width: rect.width, height: rect.height, element };
  });
  const visits = $$('[data-bird-visit]').map(element => {
    const space=element.closest('[data-bird-space]') || element;
    const rect=space.getBoundingClientRect();
    return {element,kind:element.dataset.birdVisit,space,left:rect.left,top:rect.top+scrollY,width:rect.width,height:rect.height};
  });
  flightGeometry = { positions, visits };
  return { ...flightGeometry, scroll: scrollY, width: innerWidth, height: innerHeight };
}
function placeBird(x, y, rotation = 0, scale = 1, facing = 1) {
  const layer = $('#story-flight');
  if (birdDialog && layer.classList.contains('flight-fallback-open')) {
    const origin = layer.getBoundingClientRect();
    x -= origin.left; y -= origin.top;
  }
  $('#story-bird').style.transform = `translate3d(${x - 36}px, ${y - 32}px, 0) rotate(${rotation}deg) scale(${scale * facing}, ${scale})`;
  $('#flight-light').style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
  paintBirdWake(x, y);
}
function paintBirdWake(x, y) {
  const now = performance.now();
  // The bird stays smooth; its short-lived ink trail only needs 30 updates per second.
  if (now - wakePaintedAt < 32) return;
  wakePaintedAt = now;
  const particles = advanceBirdWake(birdWake, { x, y }, now);
  drawBirdWake(wakeCanvas,particles,now,getActiveTheme().colors.gold,devicePixelRatio,musicCompanion.energy);
}
function updateStoryFlight(reading) {
  if (!reading || entranceFlight || motion.matches) return;
  const { positions, scroll, width, height } = reading;
  const active = activeFlightStop(positions.map((stop) => stop.y), scroll, height);
  const stop = positions[active];
  const perch = flightPerches[active];
  const scale = width < 600 ? .6 : 1;
  positions.forEach((anchor, index) => anchor.element.classList.toggle('flight-near', index === active && Math.abs(anchor.y - scroll - height / 2) < height * .5));
  reading.active = active;
  setBirdDestination({ x: bounded(stop.x + perch[0] * scale, 35, width - 35), y: stop.y + perch[1] * scale }, 0, reading);
  $('#story-flight').classList.toggle('flight-complete', active === positions.length - 1);
}
function beginStoryFlight() {
  const bird = $('#story-bird');
  const layer = $('#story-flight');
  if (motion.matches) { bird.hidden = true; return; }
  const startRect = bird.getBoundingClientRect();
  const start = { x: startRect.left + startRect.width / 2, y: startRect.top + startRect.height / 2 };
  const targetRect = $('.hero-divider svg').getBoundingClientRect();
  const target = { x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 };
  layer.append(bird);
  if (typeof layer.showPopover === 'function') layer.showPopover();
  else layer.classList.add('flight-fallback-open');
  flightHasStarted = true; entranceFlight = true;
  const control1 = { x: start.x + Math.min(200, innerWidth * .25), y: Math.max(55, start.y - 220) };
  const control2 = { x: target.x - Math.min(180, innerWidth * .22), y: Math.max(80, target.y - 170) };
  const began = performance.now();
  const duration = 1800;
  function fly(now) {
    const raw = Math.min(1, (now - began) / duration);
    const t = 1 - Math.pow(1 - raw, 3);
    const position = cubicPoint(start, control1, control2, target, t);
    const next = cubicPoint(start, control1, control2, target, Math.min(1, t + .01));
    const previous = cubicPoint(start, control1, control2, target, Math.max(0, t - .01));
    const angle = Math.atan2(next.y - previous.y, next.x - previous.x) * 180 / Math.PI - 25;
    placeBird(position.x, position.y, angle, innerWidth < 600 ? .7 : .88);
    if (raw < 1 && !motion.matches) requestAnimationFrame(fly);
    else {
      entranceFlight = false;
      birdBody = { x: position.x, y: position.y, vx: 0, vy: 0, angle: angle, facing: 1 };
      birdLastScrollAt = performance.now();
      requestSceneFrame();
    }
  }
  requestAnimationFrame(fly);
}


// Scroll supplies an intention. Spring flight, curiosity, and rests supply the life.
let birdBody = null;
let birdDestination = null;
let birdRaf = 0;
let birdLastFrame = 0;
const birdFrameInterval = matchMedia('(pointer:coarse)').matches ? 32 : 15;
let birdLastScrollAt = 0;
let birdLastMeasurement = 0;
let birdPreviousScroll = 0;
let birdScrollVelocity = 0;
let birdAction = null;
let birdVisit = null;
const visitedBirdPoints = new WeakMap();
// When each unseen ornament first became visible, so its first visit can follow quickly.
const birdPointSeen = new WeakMap();
let birdPointScan = 0;
const BIRD_FIRST_VISIT_DELAY = 400;
const BIRD_REVISIT_AFTER = 22000;
let lastBirdPoint = null;
let birdReactionTimer;
let birdReactionHost;
let birdRest = null;
let birdNextCuriosity = 0;
let birdBehavior = '';
let birdActive = -1;
let birdSwoop = null;
let birdDialog = null;
let birdDialogTarget = null;
const birdPersonality = Math.random() * 20;
const bounded = (value, low, high) => Math.min(high, Math.max(low, value));
function moveFlightLayer(parent) {
  const layer = $('#story-flight');
  if (typeof layer.hidePopover === 'function' && layer.matches(':popover-open')) layer.hidePopover();
  parent.append(layer);
  if (typeof layer.showPopover === 'function') layer.showPopover();
  else layer.classList.add('flight-fallback-open');
}
// One invisible text node keeps shaping and bidi layout intact; no span splits Arabic letters.
let caretMirror;
let writingBeat={at:0,kind:'stroke',value:'',heartAt:0};
function reactToWriting(event) {
  const value=$('#guest-name').value;
  const kind=event.inputType?.startsWith('delete') || value.length<writingBeat.value.length ? 'correction' : /\s$/u.test(value) ? 'word' : 'stroke';
  writingBeat.value=value;
  if (motion.matches || !value) return;
  const now=performance.now();
  if (now-writingBeat.at<100 && kind===writingBeat.kind) return;
  writingBeat.at=now; writingBeat.kind=kind;
  const bird=$('#story-bird');
  delete bird.dataset.writingGesture; void bird.offsetWidth; bird.dataset.writingGesture=kind;
  if (kind==='word' && now-writingBeat.heartAt>1000 && birdBody) {
    writingBeat.heartAt=now; birdHearts(birdBody.x,birdBody.y-12);
  }
}
function measureGuestCaret(input) {
  const box=input.getBoundingClientRect(), style=getComputedStyle(input);
  if (!caretMirror) {
    caretMirror=document.createElement('div');
    caretMirror.className='caret-mirror'; caretMirror.setAttribute('aria-hidden','true');
    caretMirror.inert=true; document.body.append(caretMirror);
  }
  for (const key of ['fontFamily','fontSize','fontWeight','fontStyle','fontStretch','fontVariant','letterSpacing','wordSpacing','textTransform','textIndent','textAlign','direction','paddingTop','paddingRight','paddingBottom','paddingLeft','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth']) caretMirror.style[key]=style[key];
  Object.assign(caretMirror.style,{left:`${box.left}px`,top:`${box.top}px`,width:`${box.width}px`,height:`${box.height}px`,lineHeight:`${input.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)}px`});
  caretMirror.textContent=input.value || '\u200b';
  caretMirror.scrollLeft=input.scrollLeft;
  const range=document.createRange();
  range.setStart(caretMirror.firstChild,Math.min(input.selectionEnd ?? input.value.length,input.value.length));
  range.collapse(true);
  const caret=range.getBoundingClientRect();
  const left=box.left+parseFloat(style.paddingLeft)+1, right=box.right-parseFloat(style.paddingRight)-1;
  return {x:bounded(caret.left || (style.direction==='rtl'?right:left),left,right),y:box.top+box.height*.68,direction:style.direction,box};
}
function measureBirdDialog() {
  const glint=$('#writing-glint');
  glint.hidden=true;
  if (!birdDialog?.open) return;
  const panel=birdDialog.getBoundingClientRect();
  let perch=birdDialog.querySelector('.modal-perch').getBoundingClientRect();
  if (birdDialog.id==='keepsake-dialog' && birdDialog.classList.contains('is-conjuring')) {
    perch=$('.ritual-perch').getBoundingClientRect();
    birdDialog.dataset.birdMode='sealing';
  } else if (birdDialog.id==='keepsake-dialog' && document.activeElement===$('#guest-name') && $('#guest-name').value) {
    const caret=measureGuestCaret($('#guest-name'));
    birdDialogTarget={x:bounded(caret.x+(caret.direction==='rtl'?-14:14),30,innerWidth-30),y:bounded(caret.box.top-13,Math.max(48,panel.top+35),Math.min(innerHeight-45,panel.bottom-30)),typing:true,facing:caret.direction==='rtl'?1:-1};
    birdDialog.dataset.birdMode='writing';
    glint.style.left=`${caret.x}px`; glint.style.top=`${caret.y}px`; glint.hidden=false;
    return;
  } else delete birdDialog.dataset.birdMode;
  birdDialogTarget={x:perch.left+perch.width/2,y:bounded(perch.top+perch.height/2-5,Math.max(45,panel.top+34),Math.min(innerHeight-45,panel.bottom-34))};
}
function visitBirdDialog(dialog) {
  if (!flightHasStarted || motion.matches) return;
  birdDialog = dialog;
  birdAction = null; birdRest = null; birdVisit = null; clearBirdReaction();
  moveFlightLayer(dialog);
  measureBirdDialog();
  startBirdHeartbeat();
  // Re-measure once the native dialog's opening transform has settled.
  setTimeout(requestSceneFrame, 480);
}
function leaveBirdDialog(dialog) {
  if (birdDialog !== dialog) return;
  birdDialog = null; birdDialogTarget = null;
  $('#writing-glint').hidden=true; delete dialog.dataset.birdMode;
  birdAction = null; birdRest = null; birdVisit = null; clearBirdReaction();
  birdLastScrollAt = performance.now();
  birdNextCuriosity = birdLastScrollAt + 1100;
  const remaining = $$('.modal[open]').at(-1);
  if (remaining) visitBirdDialog(remaining);
  else moveFlightLayer(document.body);
  requestSceneFrame();
}
function setBirdDestination(point, angle, reading) {
  const now = performance.now();
  const elapsed = Math.max(.016, (now - birdLastMeasurement) / 1000);
  const delta = reading.scroll - birdPreviousScroll;
  const previousX = birdDestination?.x ?? point.x;
  const velocityX = bounded((point.x - previousX) / elapsed, -350, 350);
  // A visit in progress is never cancelled by scrolling; it follows its artwork until it finishes.
  const visiting = Boolean(birdVisit);
  if (birdLastMeasurement && Math.abs(delta) > .5) {
    birdLastScrollAt = now;
    birdScrollVelocity = bounded(delta / elapsed, -1600, 1600);
    if (!visiting) { birdAction = null; birdRest = null; clearBirdReaction(true); }
    birdNextCuriosity = Math.max(birdNextCuriosity, now + 350);
  }
  if (reading.active !== undefined && reading.active !== birdActive) {
    if (birdActive !== -1 && !motion.matches && !visiting) birdSwoop = { began: now, amp: (reading.active % 2 ? -1 : 1) * Math.min(150, reading.width * .22), duration: 1700 };
    birdActive = reading.active;
    if (!visiting) { birdAction = null; birdRest = null; clearBirdReaction(true); }
    birdNextCuriosity = Math.max(birdNextCuriosity, now + 400);
  }
  birdDestination = { x: point.x, y: point.y - reading.scroll, angle, vx: velocityX, reading };
  birdLastMeasurement = now; birdPreviousScroll = reading.scroll;
  if (!birdBody) birdBody = { x: point.x, y: point.y - reading.scroll, vx: 0, vy: 0, angle: -12, facing: 1 };
  startBirdHeartbeat();
}
function chooseBirdPerch() {
  if (!birdDestination) return null;
  const { positions, scroll, width, height } = birdDestination.reading;
  const candidates = positions.map((anchor, index) => {
    const offset = flightPerches[index];
    const scale = width < 600 ? .6 : 1;
    return { x: bounded(anchor.x + offset[0] * scale, 35, width - 35), y: anchor.y - scroll + offset[1] * scale, index };
  }).filter((point) => point.y > 75 && point.y < height - 75 && Math.hypot(point.x - birdBody.x, point.y - birdBody.y) > 70);
  candidates.sort((a,b) => Math.hypot(a.x-birdBody.x,a.y-birdBody.y) - Math.hypot(b.x-birdBody.x,b.y-birdBody.y));
  return candidates[0] || null;
}
// keepScene lets a started scene moment (gateway, letter…) finish on its own timer, e.g. while the guest scrolls.
function clearBirdReaction(keepScene=false) {
  if (!keepScene) {
    clearTimeout(birdReactionTimer);
    if (birdReactionHost) { delete birdReactionHost.dataset.birdMoment; birdReactionHost=null; }
  }
  $('#story-bird')?.classList.remove('is-bowing','is-sneezing','is-delighted','is-curious');
}
function birdHearts(x,y) {
  const layer=$('#story-flight');
  if (layer.querySelectorAll('.bird-kiss').length>5) return;
  for (let i=0;i<3;i++) {
    const heart=chapterEl('span','bird-kiss',{'--hx':`${x}px`,'--hy':`${y}px`,'--drift':`${(i-1)*22}px`,'--wait':`${i*100}ms`});
    heart.textContent='♡';
    heart.addEventListener('animationend',()=>heart.remove(),{once:true});
    layer.append(heart);
    setTimeout(()=>heart.remove(),2200);
  }
}
function reactToBird(visit) {
  clearBirdReaction();
  visit.element.classList.add('has-met-bird');
  const host=visit.element.closest('.chapter') || $('#invitation');
  birdReactionHost=host;
  host.dataset.birdMoment=visit.kind;
  $('#story-bird').classList.add('is-delighted');
  if (visit.kind==='blossom') $('#story-bird').classList.add('is-sneezing');
  if (visit.kind==='letter'||visit.kind==='closing') $('#story-bird').classList.add('is-bowing');
  if (['blossom','letter','closing'].includes(visit.kind)) birdHearts(birdBody.x,birdBody.y-15);
  birdReactionTimer=setTimeout(clearBirdReaction,3200);
}
function beginBirdVisit(visit,now) {
  clearBirdReaction();
  const reading=birdDestination.reading;
  const rect={left:visit.left,top:visit.top-reading.scroll,width:visit.width,height:visit.height};
  const route=makeBirdVisit(visit.kind,rect,reading,{x:birdBody.x,y:birdBody.y});
  birdVisit={...route,began:now,visit,reacted:false,scroll0:reading.scroll};
  $('#story-bird').classList.add('is-curious');
  birdAction=null; birdRest=null; birdSwoop=null;
  birdLastScrollAt=now-1000;
  visitedBirdPoints.set(visit.element,now); lastBirdPoint=visit.element;
  startBirdHeartbeat();
}
function visibleBirdVisits(reading) {
  return reading.visits.filter(visit => {
    const top=visit.top-reading.scroll;
    const entered=visit.space.closest('.chapter')?.classList.contains('is-live') || visit.kind==='hero';
    const foreground=visit.space.closest('.ring-universe,.story-art,.date-card,.location-art,.dance-hall,.mini-invitation');
    return entered && (!foreground || foreground.classList.contains('has-arrived')) && top+visit.height*.65>70 && top+visit.height*.25<reading.height-35;
  });
}
// Random pick among ornaments in view: unseen ones first, then old favourites after a long pause.
function chooseBirdVisit(now) {
  const candidates=visibleBirdVisits(birdDestination.reading).filter(visit => {
    const seen=visitedBirdPoints.get(visit.element);
    return seen===undefined || now-seen>BIRD_REVISIT_AFTER;
  });
  const fresh=candidates.filter(visit=>visit.element!==lastBirdPoint);
  const choices=fresh.length?fresh:candidates;
  return choices[Math.floor(Math.random()*choices.length)];
}
// An ornament the bird has never met gets its first visit soon after it settles into view.
function firstBirdVisit(now) {
  if (now-birdPointScan<120) return null;
  birdPointScan=now;
  const unseen=visibleBirdVisits(birdDestination.reading).filter(visit=>!visitedBirdPoints.has(visit.element));
  for (const visit of unseen) if (!birdPointSeen.has(visit.element)) birdPointSeen.set(visit.element,now);
  for (const visit of $$('[data-bird-visit]')) if (!unseen.some(item=>item.element===visit)) birdPointSeen.delete(visit);
  return unseen.find(visit=>now-birdPointSeen.get(visit.element)>=BIRD_FIRST_VISIT_DELAY) || null;
}
motion.addEventListener('change',()=>{
  if (!motion.matches) return;
  birdVisit=null; clearBirdReaction();
  for (const heart of $$('.bird-kiss')) heart.remove();
});
function beginBirdCuriosity(now) {
  const visit=chooseBirdVisit(now);
  if (visit) { beginBirdVisit(visit,now); return; }
  const perch = chooseBirdPerch();
  if (!perch) { birdNextCuriosity = now + 350; return; }
  birdAction = {
    began: now, duration: 1900 + Math.random() * 1000,
    from: {x:birdBody.x,y:birdBody.y}, to: perch,
    radius: (birdDestination.reading.width < 600 ? 21 : 34) * (.8 + Math.random() * .5),
    direction: Math.random() > .5 ? 1 : -1,
  };
  birdRest = null;
}
function startBirdHeartbeat() {
  if (birdRaf || entranceFlight || motion.matches || document.hidden) return;
  birdLastFrame = performance.now();
  birdRaf = requestAnimationFrame(animateLivingBird);
}
function animateLivingBird(now) {
  birdRaf = 0;
  if (!birdDestination || !birdBody || motion.matches || document.hidden) return;
  if (now-birdLastFrame < birdFrameInterval) {
    birdRaf=requestAnimationFrame(animateLivingBird);
    return;
  }
  const dt = bounded((now - birdLastFrame) / 1000, .001, .033);
  birdLastFrame = now;
  const idle = now - birdLastScrollAt;
  const time = now / 1000 + birdPersonality;
  birdScrollVelocity *= Math.exp(-dt * 4);
  birdDestination.vx *= Math.exp(-dt * 5);
  let target = {
    x: birdDestination.x + birdDestination.vx * .12 + Math.sin(time * 1.7) * 5,
    y: birdDestination.y + bounded(birdScrollVelocity * .055, -78, 78) + Math.sin(time * 2.3) * 5,
  };
  let behavior = idle < 450 ? 'following' : 'hovering';
  if (birdSwoop) {
    const t = (now - birdSwoop.began) / birdSwoop.duration;
    if (t >= 1) birdSwoop = null;
    else {
      const arc = Math.sin(Math.PI * t);
      target.x += arc * birdSwoop.amp; target.y -= arc * 70;
      behavior = 'exploring';
    }
  }
  if (!birdDialog && !birdVisit && idle > 150) {
    const first=firstBirdVisit(now);
    if (first) beginBirdVisit(first,now);
  }
  if (!birdDialog && idle > 240 && !birdAction && !birdVisit && now > birdNextCuriosity) beginBirdCuriosity(now);
  if (birdAction) {
    const t = bounded((now - birdAction.began) / birdAction.duration, 0, 1);
    const easing = 1 - Math.pow(1-t, 3);
    const arc = Math.sin(Math.PI * t);
    target = {
      x: birdAction.from.x + (birdAction.to.x-birdAction.from.x)*easing + Math.sin(t*Math.PI*2)*arc*birdAction.radius*birdAction.direction,
      y: birdAction.from.y + (birdAction.to.y-birdAction.from.y)*easing - arc*birdAction.radius*1.5,
    };
    behavior = 'exploring';
    if (t === 1) {
      if (birdAction.kind==='spark') {
        $('#story-bird').classList.remove('is-curious'); $('#story-bird').classList.add('is-delighted');
        birdReactionTimer=setTimeout(clearBirdReaction,1100);
      }
      birdRest = birdAction.to; birdAction = null;
      birdNextCuriosity = now + 2800 + Math.random() * 3300;
    }
  } else if (birdRest && idle > 850) {
    target = {x: birdRest.x + Math.sin(time * .8) * 1.2, y: birdRest.y + Math.sin(time * 1.6) * 1.6};
    behavior = 'perched';
  }
  if (birdVisit) {
    const visit=birdVisit;
    const t=bounded((now-visit.began)/visit.duration,0,1);
    // The route was drawn in viewport space; shift it with the page so it stays on the artwork while scrolling.
    const drift=birdDestination.reading.scroll-visit.scroll0;
    target=sampleBirdVisit(visit.points,t);
    target.y-=drift;
    behavior='exploring';
    if (t>=.24 && !visit.reacted) { visit.reacted=true; reactToBird(visit.visit); }
    if (t===1) {
      const end=visit.points.at(-1), restY=end.y-drift;
      birdRest=restY>75 && restY<birdDestination.reading.height-75 ? {x:end.x,y:restY} : null;
      birdVisit=null;
      birdNextCuriosity=now+6000+Math.random()*4000;
      birdPointScan=now+1100; // a breath before another unseen ornament gets its first visit
    }
  }
  if (birdDialogTarget) {
    const beat=bounded((now-writingBeat.at)/680,0,1);
    const hop=birdDialogTarget.typing ? Math.sin(beat*Math.PI)*(writingBeat.kind==='word'?12:writingBeat.kind==='correction'?-4:6) : 0;
    target = {x: birdDialogTarget.x + Math.sin(time * .8), y: birdDialogTarget.y + Math.sin(time * 1.6)-hop};
    behavior = Math.hypot(target.x - birdBody.x, target.y - birdBody.y) < 12 ? 'perched' : 'visiting';
  }
  const {width,height} = birdDestination.reading;
  if (!birdDialogTarget) target.y -= musicCompanion.energy * (behavior === 'perched' ? 3 : 5);
  target.x = bounded(target.x, 26, width - 26);
  target.y = bounded(target.y, 55, height - 55);
  advanceSpring(birdBody, target, dt);
  const speed = Math.hypot(birdBody.vx, birdBody.vy);
  const desiredFacing = birdDialogTarget?.typing ? birdDialogTarget.facing : speed > 18 ? (birdBody.vx < -8 ? -1 : birdBody.vx > 8 ? 1 : birdBody.facing < 0 ? -1 : 1) : target.x > width/2 ? -1 : 1;
  birdBody.facing += (desiredFacing-birdBody.facing) * Math.min(1, dt*7);
  let pitch = behavior === 'perched' ? Math.sin(time*.6)*4-8 : bounded(Math.atan2(birdBody.vy, Math.abs(birdBody.vx)+60)*180/Math.PI*desiredFacing, -42, 42);
  if (!birdDialogTarget) pitch += musicCompanion.energy * 4;
  birdBody.angle += (pitch-birdBody.angle) * Math.min(1, dt*7);
  const bird = $('#story-bird');
  bird.classList.toggle('is-writing',Boolean(birdDialogTarget?.typing));
  if (behavior !== birdBehavior) {
    birdBehavior = behavior;
    bird.dataset.behavior = behavior;
    bird.classList.toggle('is-perched', behavior === 'perched');
    bird.classList.toggle('is-exploring', behavior === 'exploring');
    bird.classList.toggle('is-visiting', behavior === 'visiting');
  }
  const scale = (width < 600 ? .7 : .88) * (1 + Math.sin(time*2.1)*.018);
  placeBird(birdBody.x, birdBody.y, birdBody.angle, scale, birdBody.facing);
  birdRaf = requestAnimationFrame(animateLivingBird);
}
addEventListener('visibilitychange', () => {
  document.documentElement.classList.toggle('is-page-hidden',document.hidden);
  if (!document.hidden && flightHasStarted) requestSceneFrame();
});

let keepsakeExportController;
function clearKeepsakeRitual() {
  $('#keepsake-dialog').classList.remove('is-conjuring');
  $('#keepsake-ritual').hidden=true;
  requestSceneFrame();
}
function playKeepsakeRitual(name,signal) {
  if (motion.matches) return Promise.resolve();
  $('#ritual-guest').textContent=name;
  $('#keepsake-ritual').hidden=false;
  $('#keepsake-dialog').classList.add('is-conjuring');
  $('#keepsake-form').inert=true;
  $('#keepsake-dialog [data-close-dialog]').focus({preventScroll:true});
  requestSceneFrame();
  for (const delay of [650,1300,1900]) setTimeout(()=>{ if (!signal.aborted) requestSceneFrame(); },delay);
  return new Promise((resolve,reject)=>{
    const paper=$('.ritual-paper');
    let timeout;
    const done=(error)=>{
      clearTimeout(timeout); paper.removeEventListener('animationend',ended); signal.removeEventListener('abort',aborted); motion.removeEventListener('change',reduced);
      if (error) reject(error); else resolve();
    };
    const ended=event=>{ if (event.target===paper && event.animationName==='keepsake-unfold') done(); };
    const aborted=()=>done(new DOMException('The reveal was canceled','AbortError'));
    const reduced=()=>{ if (motion.matches) done(); };
    paper.addEventListener('animationend',ended); signal.addEventListener('abort',aborted,{once:true});
    motion.addEventListener('change',reduced);
    timeout=setTimeout(()=>done(),2900);
    if (signal.aborted) aborted();
  });
}
function initialize() {
  document.documentElement.classList.toggle('is-page-hidden',document.hidden);
  initializeThemePreview(content, showDialog);
  document.documentElement.classList.replace('no-js', 'js');
  renderLanguage('ar');
  for (const button of $$('[data-language-toggle]')) button.addEventListener('click', () => renderLanguage(language === 'ar' ? 'en' : 'ar'));
  const opening = $('#opening-dialog');
  opening.addEventListener('close',syncDialogState);
  let pointer;
  let pointerFrame = 0;
  opening.addEventListener('pointermove', (event) => {
    pointer = event;
    if (pointerFrame || motion.matches) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      opening.style.setProperty('--px', (pointer.clientX / innerWidth * 2 - 1).toFixed(3));
      opening.style.setProperty('--py', (pointer.clientY / innerHeight * 2 - 1).toFixed(3));
    });
  }, { passive: true });
  opening.addEventListener('cancel', (event) => { event.preventDefault(); startInvitation(false); });
  $('#open-invitation').addEventListener('click', () => startInvitation(Boolean(content.music?.startOnOpen)));
  $('#open-alternative').addEventListener('click', () => startInvitation(!content.music?.startOnOpen));
  $('#music-toggle').addEventListener('click', () => {
    musicIntent = !musicIntent;
    if (musicIntent) void startMusic(); else stopMusic();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopMusic();
    else if (musicIntent) void startMusic();
  });
  backgroundMusic.addEventListener('pause', () => {
    if (!backgroundMusic.paused) return;
    playing=false;
    if (!document.hidden) musicIntent=false;
    updateMusicButton();
  });
  backgroundMusic.addEventListener('error', () => {
    if (!musicIntent) return;
    musicIntent=false; stopMusic(); notify(text('audioError'));
  });
  for (const dialog of $$('.modal')) {
    dialog.addEventListener('close', () => { syncDialogState(); if(dialog.id==='keepsake-dialog') keepsakeExportController?.abort(); leaveBirdDialog(dialog); });
    dialog.addEventListener('scroll', requestSceneFrame, { passive: true });
    dialog.querySelector('[data-close-dialog]').addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
  }
  for (const button of $$('[data-open-calendar]')) button.addEventListener('click', () => showDialog($('#calendar-dialog')));
  $('#open-keepsake').addEventListener('click', () => {
    $('#export-error').textContent = '';
    showDialog($('#keepsake-dialog'));
    $('#guest-name').focus();
  });
  for (const event of ['focus','blur','keyup','pointerup','select','scroll','compositionend']) $('#guest-name').addEventListener(event,requestSceneFrame);
  document.addEventListener('selectionchange',()=>{ if (document.activeElement===$('#guest-name')) requestSceneFrame(); });
  $('#guest-name').addEventListener('input', (event) => {
    syncGuestDirection();
    reactToWriting(event);
    $('#export-error').textContent = ''; $('#download-result').hidden = true;
    $('.mini-guest').textContent = $('#guest-name').value.trim() || text('yourName');
    requestSceneFrame();
  });
  $('#keepsake-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let name;
    try { name = cleanGuestName($('#guest-name').value); }
    catch { $('#export-error').textContent = text('invalidGuest'); $('#guest-name').focus(); return; }
    const button = $('#download-png');
    if (button.disabled) return;
    const exportLanguage = language;
    const controller=new AbortController(); keepsakeExportController=controller;
    $('#guest-name').readOnly=true; $('#keepsake-form').setAttribute('aria-busy','true'); $('#download-result').hidden=true;
    button.disabled = true; $('#download-png-label').textContent = text('preparing'); $('#export-error').textContent = '';
    try {
      const [blob]=await Promise.all([createKeepsake(name,exportLanguage),playKeepsakeRitual(name,controller.signal)]);
      if (controller.signal.aborted || !$('#keepsake-dialog').open) return;
      if (activeImageUrl) URL.revokeObjectURL(activeImageUrl);
      activeImageUrl = downloadBlob(blob, 'wedding-invitation.png', true);
      $('#download-preview').src = activeImageUrl;
      $('#save-png-link').href = activeImageUrl;
      $('#download-result').hidden = false;
      requestSceneFrame();
      notify(text('imageReady'));
    } catch {
      if (!controller.signal.aborted) $('#export-error').textContent=text('exportError');
    } finally {
      if (keepsakeExportController===controller) {
        keepsakeExportController=null; clearKeepsakeRitual();
        $('#guest-name').readOnly=false; $('#keepsake-form').inert=false; $('#keepsake-form').removeAttribute('aria-busy');
        button.disabled=false; $('#download-png-label').textContent=text('downloadPng');
      }
    }
  });
  populateAtmosphere();
  initializeChapters();
  initializeInteractions();
  initializeScenes();
  document.fonts.ready.then(requestSceneFrame);
  if (!opening.open) opening.showModal();
  syncDialogState();
  $('#open-invitation').disabled = false;
  $('#open-alternative').disabled = false;
  opening.querySelector('[data-language-toggle]').disabled = false;
  opening.removeAttribute('aria-busy');
  window.invitationStartup?.release();
  $('#open-invitation').focus({ preventScroll: true });
}

try {
  const response = await fetch(new URL('./content.json', document.baseURI), { cache: 'no-cache', signal:AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error('Content unavailable');
  content = validateContent(await response.json());
  if (window.invitationStartup?.failed) throw new Error('Invitation startup timed out');
  initialize();
} catch (error) {
  // The semantic Arabic invitation remains readable if configuration cannot load.
  document.documentElement.classList.replace('js', 'no-js');
  document.body.classList.remove('motion-ready');
  window.invitationStartup?.fail();
  for (const dialog of $$('dialog[open]')) dialog.close();
  notify(text('configError'));
  console.error('Invitation initialization failed:', error.message);
}

