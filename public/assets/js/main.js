import { validateContent, buildCalendar, calendarLinks, cleanGuestName, cubicPoint, advanceSpring, advanceBirdWake, chapterProgress } from './invitation.js';

const words = {
  ar: {
    storyWhisper: 'ومن هذا اللقاء، أضاءت ليلة.', nightWhisper: 'ولكل ليلةٍ مضيئة، وعد.', promiseWhisper: 'حتى تزهر الحكاية، ونلتقي.', gardenWhisper: 'وبقي في الرسالة مكانٌ لاسمك.',
    skip: 'انتقل إلى الدعوة', demo: 'دعوة تجريبية · جميع التفاصيل للمعاينة', brand: 'تبدأ الحكاية', navigation: 'التنقل', navDetails: 'تفاصيل الليلة', navLocation: 'المكان', navKeepsake: 'دعوتك الخاصة',
    heroEyebrow: 'بكل الحب، ندعوكم لحفل زفاف', heroTagline: 'حكاية واحدة. وعمرٌ من الحب.', discover: 'اكتشف تفاصيل الليلة', scroll: 'والحكاية تبدأ هنا', heroNote: 'معكم، تصبح أجمل',
    storyEyebrow: 'الفصل الأول · حين التقينا', storyTitle: 'ومن بين كل الحكايات، اخترنا أن نكون معًا.', storySceneKicker: 'من حكايتين', storySceneClosing: 'إلى حكاية واحدة', together: 'معًا', promiseChapter: 'وعدٌ نكتبه معًا', letterForYou: 'وهذا الفصل، لك أنت.', celebrationEyebrow: 'الفصل الثاني · يومٌ نصنعه ذكرى', celebrationTitle: 'ليلةٌ تشبه الحلم.', timeZone: 'بتوقيت مكان الحفل', addCalendar: 'أضف إلى التقويم', planEyebrow: 'كل لحظة، ذكرى',
    quoteLabel: 'كلمات من القلب', quoteFootnote: 'معًا، تبدأ أجمل الأيام', locationEyebrow: 'الفصل الثالث · كل الطرق تجمعنا', openMaps: 'افتح الموقع على الخريطة', mapHint: 'يفتح في خرائط Google', mapArtLabel: 'رسم فني لحديقة، وليس خريطة للموقع',
    keepsakeEyebrow: 'الفصل الأخير · وأنت جزءٌ منه', keepsakeTitle: 'دعوة تحمل اسمك.', keepsakeCopy: 'لأنك جزء من الحكاية، صمّمنا لك دعوة خاصة. أضف اسمك، واحتفظ بقطعة من هذه الليلة.', personalize: 'اصنع دعوتك الخاصة', privacy: 'اسمك يبقى على جهازك. لا نجمعه ولا نرسله.',
    miniEyebrow: 'دعوة من القلب', dearGuest: 'إلى ضيفنا العزيز', yourName: 'اسمك الجميل هنا', footer: 'صُنعت بحب، لتُحفظ في القلب.', backTop: 'إلى البداية', music: 'الموسيقى', off: 'متوقفة', on: 'تعمل', musicPlay: 'تشغيل الموسيقى الهادئة', musicMute: 'كتم الموسيقى',
    openingBrand: 'بعض الدعوات، تُفتح بالقلب.', openingEyebrow: 'إلى من يجعلون فرحتنا أجمل', openingTitle: 'هذه الدعوة، لك.', openingLetter: 'بكل الحب', openInvitation: 'افتح الدعوة', openWithMusic: 'افتح الدعوة مع موسيقى هادئة', openingHint: 'افتح الرسالة، واتبع طائرنا في الحكاية. الموسيقى اختيارية.', openSilent: 'افتح بدون موسيقى', openingFooter: 'بدايتنا الأجمل، بوجودكم',
    close: 'إغلاق', calendarEyebrow: 'احتفظ بالموعد', calendarTitle: 'نلتقي في هذا اليوم.', calendarDescription: 'اختر التقويم الذي تستخدمه. جميع الخيارات تحفظ التوقيت الصحيح أينما كنت.', googleHint: 'Android · iPhone · الويب', outlookHint: 'Windows · الويب', appleCalendar: 'Apple Calendar / ملف تقويم', appleHint: 'iPhone · Mac · أي تطبيق يدعم ‎.ics', calendarNote: 'قد يحتاج المتصفح إلى تنزيل ملف التقويم ثم فتحه في تطبيق التقويم.',
    modalKeepsakeTitle: 'لنكتب اسمك في الحكاية.', modalKeepsakeCopy: 'بطاقة أنيقة بحجم ١٢٠٠ × ١٦٠٠ بكسل، باسمك وبكل الحب.', guestLabel: 'اسم الضيف', guestPlaceholder: 'الاسم الذي تحب أن نناديك به', guestHelp: 'حتى ٦٠ حرفًا. الاسم لن يُرسل إلى أي جهة.', downloadPng: 'حمّل دعوتك PNG', preparing: 'نكتبها لك بكل الحب…', previewAlt: 'معاينة دعوتك الشخصية', saveAgain: 'حفظ الصورة مجددًا', saveHint: 'على iPhone، يمكنك فتح الصورة ثم الضغط مطولًا لحفظها في الصور.', invalidGuest: 'اكتب اسمًا من حرف واحد إلى ٦٠ حرفًا.', exportError: 'تعذّر إنشاء الصورة. تحقق من الاتصال بالخطوط المحلية وحاول مجددًا.', imageReady: 'دعوتك جاهزة. يمكنك حفظها أيضًا من المعاينة.', audioError: 'لم يبدأ الصوت. يمكنك تشغيله من زر الموسيقى.', configError: 'تعذّر تحميل تفاصيل الدعوة. حدّث الصفحة أو تحقق من ملف content.json.',
  },
  en: {
    storyWhisper: 'And from that meeting, an evening began to glow.', nightWhisper: 'Every luminous evening holds a promise.', promiseWhisper: 'Until the story blooms, and we meet.', gardenWhisper: 'There is still a place in the letter for your name.',
    skip: 'Skip to invitation', demo: 'Demo invitation · all details are for preview', brand: 'Our story begins', navigation: 'Navigation', navDetails: 'The evening', navLocation: 'The setting', navKeepsake: 'Your keepsake',
    heroEyebrow: 'Together with love, we invite you to the wedding of', heroTagline: 'One story. A lifetime of love.', discover: 'Discover the evening', scroll: 'A little more of our story', heroNote: 'Sweeter with you here',
    storyEyebrow: 'Chapter one · A beautiful encounter', storyTitle: 'Of all the stories, we chose a life together.', storySceneKicker: 'Two lives', storySceneClosing: 'One beautiful story', together: 'together', promiseChapter: 'A promise, written together', letterForYou: 'And this chapter is yours.', celebrationEyebrow: 'Chapter two · A date becomes a promise', celebrationTitle: 'An evening to remember.', timeZone: 'Local time at the venue', addCalendar: 'Add to calendar', planEyebrow: 'Every moment, a memory',
    quoteLabel: 'A note from the heart', quoteFootnote: 'The loveliest days begin together', locationEyebrow: 'Chapter three · All paths lead here', openMaps: 'Find the celebration', mapHint: 'Opens in Google Maps', mapArtLabel: 'An artistic garden illustration, not a geographical map',
    keepsakeEyebrow: 'The final chapter · You are part of it', keepsakeTitle: 'Your name. Our invitation.', keepsakeCopy: "You're part of this story. Make a little keepsake of the evening, with your name and a whole lot of love.", personalize: 'Make your invitation', privacy: 'Your name stays on your device. It is never collected or sent.',
    miniEyebrow: 'An invitation from the heart', dearGuest: 'Especially for', yourName: 'Your lovely name', footer: 'Made with love. Kept close to the heart.', backTop: 'Back to the beginning', music: 'Music', off: 'Off', on: 'On', musicPlay: 'Play soft background music', musicMute: 'Mute background music',
    openingBrand: 'Some invitations open the heart.', openingEyebrow: 'For the people who make our joy brighter', openingTitle: 'A little love letter. For you.', openingLetter: 'With love', openInvitation: 'Open the invitation', openWithMusic: 'Open the invitation with soft music', openingHint: 'Open the letter, and follow a little paper bird through our story. Music is optional.', openSilent: 'Open without music', openingFooter: 'Our beginning is brighter with you',
    close: 'Close', calendarEyebrow: 'Keep a little space for us', calendarTitle: "It's a date.", calendarDescription: 'Choose your calendar. Each option keeps the event at the right time, wherever you are.', googleHint: 'Android · iPhone · Web', outlookHint: 'Windows · Web', appleCalendar: 'Apple Calendar / Calendar file', appleHint: 'iPhone · Mac · Any app that opens .ics', calendarNote: 'Your browser may download a calendar file. Open it in your calendar app to add the event.',
    modalKeepsakeTitle: "Let's put your name in the story.", modalKeepsakeCopy: 'A beautifully personal 1200 × 1600 PNG invitation. Yours to keep.', guestLabel: 'Guest name', guestPlaceholder: 'The name you love to go by', guestHelp: 'Up to 60 characters. Your name is never sent anywhere.', downloadPng: 'Download your invitation', preparing: 'Making a little magic…', previewAlt: 'Preview of your personalized invitation', saveAgain: 'Save the image again', saveHint: 'On iPhone, open the image and touch and hold to save it to Photos.', invalidGuest: 'Please enter a name with 1 to 60 characters.', exportError: 'The image could not be created. Check that local fonts loaded, then try again.', imageReady: 'Your invitation is ready. You can also save it from the preview.', audioError: 'Sound could not start. Try the music button.', configError: 'The invitation details could not load. Refresh the page or check content.json.',
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

function renderLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  for (const element of $$('[data-i18n]')) element.textContent = text(element.dataset.i18n);
  for (const [attribute, dataset] of [['aria-label', 'i18nAria'], ['placeholder', 'i18nPlaceholder'], ['alt', 'i18nAlt']]) {
    for (const element of $$(`[data-${attribute === 'aria-label' ? 'i18n-aria' : 'i18n-' + attribute}]`)) element.setAttribute(attribute, text(element.dataset[dataset]));
  }
  for (const element of $$('[data-name]')) element.textContent = content.couple[element.dataset.name][language];
  if ($('#guest-name').value.trim()) $('.mini-guest').textContent = $('#guest-name').value.trim();
  for (const element of $$('[data-copy]')) element.textContent = content.copy[element.dataset.copy][language];
  for (const element of $$('[data-venue]')) element.textContent = content.venue[element.dataset.venue][language];
  for (const element of $$('[data-venue-city]')) element.textContent = content.venue.address[language];
  const formats = {
    'data-event-date': { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    'data-event-weekday': { weekday: 'long' }, 'data-event-day': { day: 'numeric' },
    'data-event-month': { month: 'long', year: 'numeric' }, 'data-event-time': { hour: 'numeric', minute: '2-digit' },
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
  $('#maps-link').href = content.venue.mapsUrl;
  $('[data-i18n="mapHint"]').textContent = `${text('mapHint')}${content.demo ? ' · ' + content.venue.mapLabel[language] : ''}`;
  const brand = `${content.couple.first[language]} ${language === 'ar' ? 'و' : '& '}${content.couple.second[language]}`;
  $('#brand-link').setAttribute('aria-label', brand);
  $('#invitation-title').setAttribute('aria-label', brand);
  document.title = `${brand} | ${text('brand')}${content.demo ? (language === 'ar' ? ' — تجريبي' : ' — Demo') : ''}`;
  $('meta[name="description"]').content = content.event.description[language];
  const offset = new Intl.DateTimeFormat('en', { timeZone: content.event.timeZone, timeZoneName: 'shortOffset' }).formatToParts(new Date(content.event.start)).find((part) => part.type === 'timeZoneName').value;
  $('[data-i18n="timeZone"]').textContent = `${text('timeZone')} (${offset.replace('GMT', 'UTC')})`;
  const links = calendarLinks(content, language);
  $('#google-calendar').href = links.google;
  $('#outlook-calendar').href = links.outlook;
  $('#schedule-list').replaceChildren(...content.schedule.map((item) => {
    const li = document.createElement('li');
    const time = document.createElement('span');
    time.className = 'timeline-time';
    time.textContent = new Intl.DateTimeFormat(locale(), { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(new Date(`2000-01-01T${item.time}:00Z`));
    const details = document.createElement('div');
    const title = document.createElement('h3'); title.textContent = item.title[language];
    const note = document.createElement('p'); note.textContent = item.note[language];
    details.append(title, note); li.append(time, details);
    return li;
  }));
  $('#export-error').textContent = '';
  updateMusicButton();
  enhanceTypography();
  requestSceneFrame();
}

// An original, quiet pentatonic music bed; no audio files, trackers, or remote requests.
let audioContext;
let master;
let musicTimer;
let playing = false;
let sequence = 0;
let nextNote = 0;
let musicIntent = false;
const melody = [60, 67, 72, 76, 74, 67, 64, 72, 69, 67, 64, 62, 60, 64, 67, 72];
function playNote(midi, at, length, volume) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(volume, at + .025);
  gain.gain.exponentialRampToValueAtTime(.0001, at + length);
  oscillator.connect(gain); gain.connect(master);
  oscillator.start(at); oscillator.stop(at + length + .05);
  oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
}
function scheduleMusic() {
  if (!playing) return;
  while (nextNote < audioContext.currentTime + 1.5) {
    playNote(melody[sequence % melody.length], nextNote, 3.4, .2);
    if (sequence % 4 === 0) {
      const root = [48, 45, 53, 48][Math.floor(sequence / 4) % 4];
      playNote(root, nextNote, 6.8, .13);
      playNote(root + 7, nextNote + .12, 6.5, .055);
    }
    sequence += 1; nextNote += 1.55;
  }
}
async function startMusic() {
  try {
    const Context = window.AudioContext || window.webkitAudioContext;
    if (!Context) throw new Error('Web Audio unavailable');
    if (!audioContext) {
      audioContext = new Context();
      master = audioContext.createGain();
      master.gain.value = 0;
      master.connect(audioContext.destination);
    }
    await audioContext.resume();
    if (audioContext.state !== 'running') throw new Error('Audio was blocked');
    if (!musicIntent || document.hidden) return;
    playing = true;
    nextNote = audioContext.currentTime + .1;
    master.gain.cancelScheduledValues(audioContext.currentTime);
    master.gain.setValueAtTime(master.gain.value, audioContext.currentTime);
    master.gain.linearRampToValueAtTime(.23, audioContext.currentTime + 1.8);
    clearInterval(musicTimer);
    scheduleMusic(); musicTimer = setInterval(scheduleMusic, 650);
    updateMusicButton();
  } catch {
    playing = false; musicIntent = false; updateMusicButton(); notify(text('audioError'));
  }
}
function stopMusic() {
  playing = false; clearInterval(musicTimer);
  if (audioContext && master) {
    master.gain.cancelScheduledValues(audioContext.currentTime);
    master.gain.setTargetAtTime(0, audioContext.currentTime, .15);
  }
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
  }, motion.matches ? 0 : 1150);
}

function closeDialog(dialog) {
  if (!dialog.open || dialog.classList.contains('is-closing')) return;
  dialog.classList.add('is-closing');
  setTimeout(() => { dialog.close(); dialog.classList.remove('is-closing'); }, motion.matches ? 0 : 200);
}
function showDialog(dialog) {
  dialog.classList.remove('is-closing');
  dialog.showModal();
  visitBirdDialog(dialog);
}

function downloadBlob(blob, filename, keepUrl = false) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  if (!keepUrl) setTimeout(() => URL.revokeObjectURL(url), 60000);
  return url;
}


function drawPaperBird(ctx, x, y) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.18); ctx.scale(1.25, 1.25); ctx.translate(-36, -32);
  const pieces = [
    ['M29 35 6 44 23 27Z', '#bba67a'], ['M26 34 16 4 49 32Z', '#d8c69d'],
    ['M21 36 53 15 66 25 54 29 38 48Z', '#ebe2c9'], ['M28 35 35 4 50 33 38 48Z', '#f7f1df'],
  ];
  for (const [shape, color] of pieces) { const path = new Path2D(shape); ctx.fillStyle = color; ctx.strokeStyle = '#a08a5c'; ctx.lineWidth = .65; ctx.fill(path); ctx.stroke(path); }
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
  const isArabic = exportLanguage === 'ar';
  const ui = words[exportLanguage];
  const font = isArabic ? 'Amiri' : 'Cormorant Garamond';
  const guestFont = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(name) ? 'Amiri' : font;
  const eventLocale = isArabic ? 'ar-IQ' : 'en-GB';
  const date = new Intl.DateTimeFormat(eventLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', calendar: 'gregory', timeZone: content.event.timeZone }).format(new Date(content.event.start));
  const time = new Intl.DateTimeFormat(eventLocale, { hour: 'numeric', minute: '2-digit', timeZone: content.event.timeZone }).format(new Date(content.event.start));
  await Promise.all([
    document.fonts.load('120px "Amiri"', 'عمر ليان ' + name),
    document.fonts.load('120px "Cormorant Garamond"', 'Omar Layan ' + name),
    document.fonts.load('28px "Noto Sans Arabic"', 'دعوة من القلب'),
  ]);
  if (!document.fonts.check('120px "Amiri"', 'عمر ليان') || !document.fonts.check('120px "Cormorant Garamond"', 'Omar Layan')) throw new Error('Invitation fonts are unavailable');
  const canvas = document.createElement('canvas');
  canvas.width = 1200; canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f7f5ee'; ctx.fillRect(0, 0, 1200, 1600);
  ctx.strokeStyle = '#b5ba9f'; ctx.lineWidth = 1.5; ctx.strokeRect(49, 49, 1102, 1502);
  ctx.strokeStyle = '#d9dacb'; ctx.strokeRect(62, 62, 1076, 1476);
  ctx.strokeStyle = '#d4d7c3'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(160, 1390); ctx.lineTo(160, 590); ctx.bezierCurveTo(160, 100, 1040, 100, 1040, 590); ctx.lineTo(1040, 1390); ctx.stroke();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.direction = isArabic ? 'rtl' : 'ltr';
  fittedText(ctx, ui.miniEyebrow, 185, isArabic ? 32 : 27, isArabic ? 'Noto Sans Arabic' : 'Cormorant Garamond', '#67715c', 800);
  drawPaperBird(ctx, 600, 335);
  fittedText(ctx, content.couple.first[exportLanguage], 510, isArabic ? 154 : 132, font, '#293e32', 820);
  fittedText(ctx, '&', 645, 76, 'Cormorant Garamond', '#a48d63', 300);
  fittedText(ctx, content.couple.second[exportLanguage], 775, isArabic ? 154 : 132, font, '#293e32', 820);
  ctx.strokeStyle = '#ad966b'; ctx.beginPath(); ctx.moveTo(550, 916); ctx.lineTo(650, 916); ctx.stroke();
  fittedText(ctx, ui.dearGuest, 1000, isArabic ? 32 : 28, font, '#67715c', 850);
  ctx.direction = /[\u0600-\u06ff]/u.test(name) ? 'rtl' : 'ltr';
  fittedText(ctx, name, 1093, 73, guestFont, '#293e32', 860);
  ctx.direction = isArabic ? 'rtl' : 'ltr';
  fittedText(ctx, date, 1247, isArabic ? 33 : 30, font, '#5e6c55', 840);
  fittedText(ctx, `${content.venue.name[exportLanguage]} · ${time}`, 1315, 30, font, '#5e6c55', 840);
  fittedText(ctx, content.venue.address[exportLanguage], 1368, 26, font, '#6b7265', 840);
  if (content.demo) fittedText(ctx, isArabic ? 'دعوة تجريبية · ليست مناسبة حقيقية' : 'DEMO INVITATION · NOT A REAL EVENT', 1495, 20, font, '#727862', 900);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('PNG export failed')), 'image/png'));
}


// One scroll reading per frame; each chapter transforms a different physical motif.
let sceneFramePending = false;
let sceneEntries = [];
function enhanceTypography() {
  for (const heading of $$('.word-reveal')) {
    const value = heading.textContent;
    heading.setAttribute('aria-label', value);
    heading.replaceChildren(...value.split(/\s+/).flatMap((word, index) => {
      const mask = document.createElement('span'); mask.className = 'word-mask'; mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span'); inner.textContent = word; inner.style.setProperty('--word', index);
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
function requestSceneFrame() {
  if (sceneFramePending) return;
  sceneFramePending = true;
  requestAnimationFrame(updateScenes);
}
function updateScenes() {
  sceneFramePending = false;
  const height = innerHeight;
  const readings = sceneEntries.map((entry) => ({ entry, rect: entry.element.getBoundingClientRect() }));
  const flightReading = readFlightWaypoints();
  for (const { entry, rect } of readings) {
    const progress = chapterProgress(rect.top, rect.height, height, motion.matches);
    entry.element.style.setProperty('--journey', progress.arrival.toFixed(4));
    entry.element.style.setProperty('--scene', progress.scene.toFixed(4));
    entry.element.classList.toggle('chapter-arrived', rect.top < height * .8 && rect.bottom > height * .12);
    if (entry.element.dataset.scene === 'location' && entry.path) {
      const point = entry.path.getPointAtLength(entry.length * progress.arrival);
      entry.dot.setAttribute('cx', point.x); entry.dot.setAttribute('cy', point.y);
    }
  }
  measureBirdDialog();
  updateStoryFlight(flightReading);
}
function initializeScenes() {
  sceneEntries = $$('[data-scene]').map((element) => {
    const path = element.querySelector('.garden-route');
    return { element, path, dot: element.querySelector('.garden-route-dot'), length: path ? path.getTotalLength() : 0 };
  });
  document.body.classList.add('story-motion');
  addEventListener('scroll', requestSceneFrame, { passive: true });
  addEventListener('resize', requestSceneFrame, { passive: true });
  motion.addEventListener('change', requestSceneFrame);
  requestSceneFrame();
}


// A single paper bird leaves the physical envelope and visits the story's ornaments.
let flightHasStarted = false;
let entranceFlight = false;
const birdWake = { previous: null, emittedAt: 0, particles: [] };
let wakeMarks = [];
const flightStops = ['.hero-divider svg', '.story-visual', '.date-card [data-event-day]', '.quote-star', '.garden-marker', '.keepsake-stage .mini-star', '.closing-section .rings'];

function readFlightWaypoints() {
  if (!flightHasStarted) return null;
  const positions = flightStops.map((selector) => {
    const element = $(selector);
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + scrollY + rect.height / 2, width: rect.width, height: rect.height, element };
  });
  // The sticky promise stays a real waypoint as it moves through document space.
  for (let index = 1; index < positions.length; index++) positions[index].y = Math.max(positions[index].y, positions[index - 1].y + 80);
  return { positions, scroll: scrollY, width: innerWidth, height: innerHeight };
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
  const particles = advanceBirdWake(birdWake, { x, y }, now);
  $('#flight-canvas').setAttribute('viewBox', `0 0 ${innerWidth} ${innerHeight}`);
  wakeMarks.forEach((mark, index) => {
    const p = particles[index];
    if (!p) { mark.style.opacity = '0'; return; }
    const age = (now - p.born) / p.life;
    const opacity = Math.min(1, age / .12) * Math.pow(1 - age, 1.7);
    mark.setAttribute('d', p.glint ? 'M -2 0 L 2 0 M 0 -2 L 0 2' : `M ${-p.size / 2} 0 Q 0 -2 ${p.size / 2} 0`);
    mark.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.glint ? 45 : p.angle}) scale(${1 + age * .45})`);
    mark.style.opacity = String(opacity * (p.glint ? .65 : .48));
  });
}
function updateStoryFlight(reading) {
  if (!reading || entranceFlight || motion.matches) return;
  const { positions, scroll, width, height } = reading;
  const focus = scroll + positions[0].y;
  let birdPosition = positions[0];
  let birdAngle = -12;
  for (let index = 0; index < positions.length - 1; index++) {
    const a = positions[index];
    const b = positions[index + 1];
    const gap = b.y - a.y;
    const bend = Math.min(180, width * .2) * (index % 2 ? -1 : 1);
    const c1 = { x: Math.min(width - 35, Math.max(35, a.x + bend)), y: a.y + gap / 3 };
    const c2 = { x: Math.min(width - 35, Math.max(35, b.x + bend)), y: b.y - gap / 3 };
    const t = Math.min(1, Math.max(0, (focus - a.y) / gap));
    if (focus >= a.y) {
      birdPosition = cubicPoint(a, c1, c2, b, t);
      const ahead = cubicPoint(a, c1, c2, b, Math.min(1, t + .01));
      const behind = cubicPoint(a, c1, c2, b, Math.max(0, t - .01));
      birdAngle = Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180 / Math.PI - 25;
    }
    a.element.classList.toggle('flight-near', Math.abs(focus - a.y) < 95);
  }
  const end = positions.at(-1);
  end.element.classList.toggle('flight-near', Math.abs(focus - end.y) < 95);
  setBirdDestination(birdPosition, birdAngle, reading);
  $('#story-flight').classList.toggle('flight-complete', focus >= end.y);
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
  wakeMarks = Array.from({ length: 32 }, () => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.classList.add('flight-wisp'); path.style.opacity = '0';
    $('#flight-wake').append(path); return path;
  });
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
let birdLastScrollAt = 0;
let birdLastMeasurement = 0;
let birdPreviousScroll = 0;
let birdScrollVelocity = 0;
let birdAction = null;
let birdRest = null;
let birdNextCuriosity = 0;
let birdBehavior = '';
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
function measureBirdDialog() {
  if (!birdDialog?.open) return;
  const perch = birdDialog.querySelector('.modal-perch').getBoundingClientRect();
  const panel = birdDialog.getBoundingClientRect();
  birdDialogTarget = {
    x: perch.left + perch.width / 2,
    y: bounded(perch.top + perch.height / 2 - 5, Math.max(45, panel.top + 34), Math.min(innerHeight - 45, panel.bottom - 34)),
  };
}
function visitBirdDialog(dialog) {
  if (!flightHasStarted || motion.matches) return;
  birdDialog = dialog;
  birdAction = null; birdRest = null;
  moveFlightLayer(dialog);
  measureBirdDialog();
  startBirdHeartbeat();
  // Re-measure once the native dialog's opening transform has settled.
  setTimeout(requestSceneFrame, 480);
}
function leaveBirdDialog(dialog) {
  if (birdDialog !== dialog) return;
  birdDialog = null; birdDialogTarget = null;
  birdAction = null; birdRest = null;
  birdLastScrollAt = performance.now();
  birdNextCuriosity = birdLastScrollAt + 1100;
  moveFlightLayer(document.body);
  requestSceneFrame();
}
function setBirdDestination(point, angle, reading) {
  const now = performance.now();
  const elapsed = Math.max(.016, (now - birdLastMeasurement) / 1000);
  const delta = reading.scroll - birdPreviousScroll;
  const previousX = birdDestination?.x ?? point.x;
  const velocityX = bounded((point.x - previousX) / elapsed, -350, 350);
  if (birdLastMeasurement && Math.abs(delta) > .5) {
    birdLastScrollAt = now;
    birdScrollVelocity = bounded(delta / elapsed, -1600, 1600);
    birdAction = null; birdRest = null;
    birdNextCuriosity = now + 900;
  }
  birdDestination = { x: point.x, y: point.y - reading.scroll, angle, vx: velocityX, reading };
  birdLastMeasurement = now; birdPreviousScroll = reading.scroll;
  if (!birdBody) birdBody = { x: point.x, y: point.y - reading.scroll, vx: 0, vy: 0, angle: -12, facing: 1 };
  startBirdHeartbeat();
}
function chooseBirdPerch() {
  if (!birdDestination) return null;
  const { positions, scroll, width, height } = birdDestination.reading;
  const offsets = [[30,-12],[65,-75],[55,-60],[32,-13],[32,-38],[68,-9],[35,-9]];
  const candidates = positions.map((anchor, index) => {
    const offset = offsets[index];
    return { x: bounded(anchor.x + offset[0] * (width < 600 ? .6 : 1), 35, width - 35), y: anchor.y - scroll + offset[1], index };
  }).filter((point) => point.y > 75 && point.y < height - 75);
  candidates.sort((a,b) => Math.hypot(a.x-birdBody.x,a.y-birdBody.y) - Math.hypot(b.x-birdBody.x,b.y-birdBody.y));
  return candidates[0] || null;
}
function beginBirdCuriosity(now) {
  const perch = chooseBirdPerch();
  if (!perch) { birdNextCuriosity = now + 900; return; }
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
  if (!birdDialog && idle > 850 && !birdAction && now > birdNextCuriosity) beginBirdCuriosity(now);
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
      birdRest = birdAction.to; birdAction = null;
      birdNextCuriosity = now + 2800 + Math.random() * 3300;
    }
  } else if (birdRest && idle > 850) {
    target = {x: birdRest.x + Math.sin(time * .8) * 1.2, y: birdRest.y + Math.sin(time * 1.6) * 1.6};
    behavior = 'perched';
  }
  if (birdDialogTarget) {
    target = {x: birdDialogTarget.x + Math.sin(time * .8), y: birdDialogTarget.y + Math.sin(time * 1.6)};
    behavior = Math.hypot(target.x - birdBody.x, target.y - birdBody.y) < 12 ? 'perched' : 'visiting';
  }
  const {width,height} = birdDestination.reading;
  target.x = bounded(target.x, 26, width - 26);
  target.y = bounded(target.y, 55, height - 55);
  advanceSpring(birdBody, target, dt);
  const speed = Math.hypot(birdBody.vx, birdBody.vy);
  const desiredFacing = speed > 18 ? (birdBody.vx < -8 ? -1 : birdBody.vx > 8 ? 1 : birdBody.facing < 0 ? -1 : 1) : target.x > width/2 ? -1 : 1;
  birdBody.facing += (desiredFacing-birdBody.facing) * Math.min(1, dt*7);
  const pitch = behavior === 'perched' ? Math.sin(time*.6)*4-8 : bounded(Math.atan2(birdBody.vy, Math.abs(birdBody.vx)+60)*180/Math.PI*desiredFacing, -42, 42);
  birdBody.angle += (pitch-birdBody.angle) * Math.min(1, dt*7);
  const bird = $('#story-bird');
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
addEventListener('visibilitychange', () => { if (!document.hidden && flightHasStarted) requestSceneFrame(); });

function initialize() {
  document.documentElement.classList.replace('no-js', 'js');
  renderLanguage('ar');
  for (const button of $$('[data-language-toggle]')) button.addEventListener('click', () => renderLanguage(language === 'ar' ? 'en' : 'ar'));
  $('#open-invitation').addEventListener('click', () => startInvitation(Boolean(content.music?.startOnOpen)));
  $('#open-alternative').addEventListener('click', () => startInvitation(!content.music?.startOnOpen));
  $('#opening-dialog').addEventListener('cancel', (event) => { event.preventDefault(); startInvitation(false); });
  $('#music-toggle').addEventListener('click', () => {
    musicIntent = !playing;
    if (musicIntent) void startMusic(); else stopMusic();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopMusic();
    else if (musicIntent) void startMusic();
  });
  for (const dialog of $$('.modal')) {
    dialog.addEventListener('close', () => leaveBirdDialog(dialog));
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
  $('#download-calendar').addEventListener('click', () => downloadBlob(new Blob([buildCalendar(content, language)], { type: 'text/calendar;charset=utf-8' }), 'wedding-invitation.ics'));
  $('#open-keepsake').addEventListener('click', () => {
    $('#export-error').textContent = '';
    showDialog($('#keepsake-dialog'));
    $('#guest-name').focus();
  });
  $('#guest-name').addEventListener('input', () => {
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
    button.disabled = true; $('#download-png-label').textContent = text('preparing'); $('#export-error').textContent = '';
    try {
      const blob = await createKeepsake(name, exportLanguage);
      if (activeImageUrl) URL.revokeObjectURL(activeImageUrl);
      activeImageUrl = downloadBlob(blob, 'wedding-invitation.png', true);
      $('#download-preview').src = activeImageUrl;
      $('#save-png-link').href = activeImageUrl;
      $('#download-result').hidden = false;
      requestSceneFrame();
      notify(text('imageReady'));
    } catch {
      $('#export-error').textContent = text('exportError');
    } finally { button.disabled = false; $('#download-png-label').textContent = text('downloadPng'); }
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }, { threshold: 0, rootMargin: '0px 0px -28px 0px' });
    for (const element of $$('.reveal')) observer.observe(element);
    document.body.classList.add('motion-ready');
  }
  initializeScenes();
  document.fonts.ready.then(requestSceneFrame);
  $('#opening-dialog').showModal();
  $('#open-invitation').focus({ preventScroll: true });
}

try {
  const response = await fetch(new URL('./content.json', document.baseURI));
  if (!response.ok) throw new Error('Content unavailable');
  content = validateContent(await response.json());
  initialize();
} catch (error) {
  // The semantic Arabic invitation remains readable if configuration cannot load.
  document.documentElement.classList.replace('js', 'no-js');
  for (const dialog of $$('dialog[open]')) dialog.close();
  notify(text('configError'));
  console.error('Invitation initialization failed:', error.message);
}

