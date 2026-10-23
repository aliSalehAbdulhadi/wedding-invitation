import { themes, getTheme, resolveThemeId } from './themes.js?v=20261024-3';

let activeTheme = themes[0];
let ui;
let language = 'ar';
const preferenceKey = 'wedding-dev-palette-v1';
const labels = {
  ar: { trigger:'الألوان', title:'اختر ألوان الحكاية', note:'لوحات زفاف هادئة للدعوة والرسومات والبطاقة المحمّلة.', local:'يُحفظ اختيار الألوان على هذا الجهاز.', close:'إغلاق', legend:'لوحة ألوان الدعوة' },
  en: { trigger:'Colors', title:'Color the whole story', note:'Soft wedding palettes for the invitation, artwork, and downloaded keepsake.', local:'Your color choice is remembered on this device.', close:'Close', legend:'Invitation color palette' },
};
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

export const getActiveTheme = () => activeTheme;

function applyTheme(id) {
  activeTheme = getTheme(id);
  document.documentElement.dataset.theme = activeTheme.id;
  for (const [key, value] of Object.entries(activeTheme.colors)) document.documentElement.style.setProperty(`--${key}`,value);
  document.documentElement.style.setProperty('--mist', activeTheme.colors.soft);
  document.querySelector('meta[name="theme-color"]').content = activeTheme.colors.paper;
  const result = document.querySelector('#download-result');
  if (result) result.hidden = true;
  if (ui) for (const input of ui.dialog.querySelectorAll('input')) input.checked = input.value === activeTheme.id;
}

export function renderThemePreview(nextLanguage) {
  language = nextLanguage;
  if (!ui) return;
  const copy = labels[language];
  ui.trigger.textContent = copy.trigger;
  ui.title.textContent = copy.title;
  ui.note.textContent = copy.note;
  ui.local.textContent = copy.local;
  ui.close.setAttribute('aria-label',copy.close);
  ui.legend.textContent = copy.legend;
  for (const theme of themes) {
    ui.dialog.querySelector(`[data-theme-name="${theme.id}"]`).textContent = theme.name[language];
    ui.dialog.querySelector(`[data-theme-note="${theme.id}"]`).textContent = theme.note[language];
  }
}

export function initializeThemePreview(content, openDialog) {
  let saved;
  try { saved = localStorage.getItem(preferenceKey); } catch { /* The preview works without storage. */ }
  applyTheme(resolveThemeId(content.design?.theme, saved));

  const dock = element('div','dev-theme-dock');
  const trigger = element('button','dev-theme-trigger');
  trigger.type = 'button'; trigger.id = 'dev-theme-trigger';
  trigger.setAttribute('aria-haspopup','dialog'); trigger.setAttribute('aria-controls','theme-dialog');
  dock.append(trigger);
  const dialog = element('dialog','modal theme-modal'); dialog.id = 'theme-dialog'; dialog.setAttribute('aria-labelledby','theme-title');
  const header = element('div','modal-header');
  const perch = element('span','modal-perch'); perch.setAttribute('aria-hidden','true');
  const mark = element('span','theme-dialog-mark','✧'); mark.setAttribute('aria-hidden','true');
  const close = element('button','close-button','×'); close.type='button'; close.dataset.closeDialog='';
  header.append(perch,mark,close);
  const title=element('h2'); title.id='theme-title';
  const note=element('p','modal-description');
  const fieldset=element('fieldset','theme-options');
  const legend=element('legend','visually-hidden'); fieldset.append(legend);
  for (const theme of themes) {
    const label=element('label','theme-option');
    const input=element('input'); input.type='radio'; input.name='dev-palette'; input.value=theme.id; input.checked=theme.id===activeTheme.id;
    const swatch=element('span','theme-swatch'); swatch.setAttribute('aria-hidden','true');
    for (const role of ['paper','ink','gold','night']) swatch.style.setProperty(`--swatch-${role}`,theme.colors[role]);
    swatch.append(element('i'),element('i'),element('i'));
    const text=element('span','theme-option-copy');
    const name=element('strong'); name.dataset.themeName=theme.id;
    const detail=element('small'); detail.dataset.themeNote=theme.id;
    text.append(name,detail); label.append(input,swatch,text); fieldset.append(label);
    input.addEventListener('change',()=>{
      if (!input.checked) return;
      applyTheme(theme.id);
      try { localStorage.setItem(preferenceKey,theme.id); } catch { /* Optional local preference. */ }
    });
  }
  const local=element('p','modal-footnote');
  dialog.append(header,title,note,fieldset,local);
  document.body.append(dock,dialog);
  ui={dock,dialog,trigger,title,note,local,close,legend};
  trigger.addEventListener('click',()=>openDialog(dialog));
  // Keep the color control clickable while a native modal makes the page inert.
  const syncDock=()=>{
    const host=[...document.querySelectorAll('dialog[open]')].filter(d=>d!==dialog).at(-1)||document.body;
    if (dock.parentElement!==host) host.append(dock);
  };
  new MutationObserver(syncDock).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  syncDock();
  renderThemePreview(language);
}
