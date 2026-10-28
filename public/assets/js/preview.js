if (location.protocol === 'file:') {
  const note = document.createElement('aside');
  note.className = 'local-preview-notice';
  note.setAttribute('aria-label', 'Local preview / المعاينة المحلية');
  const copy = document.createElement('p');
  copy.textContent = 'لمشاهدة الحركة والألوان، افتح المعاينة المحلية. / Open the local preview for the animated invitation.';
  const link = document.createElement('a');
  link.href = 'http://127.0.0.1:8082/';
  link.textContent = 'افتح المعاينة · Open preview';
  note.append(copy, link);
  document.body.prepend(note);
} else {
  // Show the real envelope before fetching the module graph or event configuration.
  const opening = document.getElementById('opening-dialog');
  const startup = window.invitationStartup;
  if (!startup?.failed) {
    try {
      document.documentElement.classList.replace('no-js','js');
      document.getElementById('open-invitation').disabled = true;
      opening.setAttribute('aria-busy','true');
      opening.querySelector('[data-language-toggle]').disabled = true;
      opening.addEventListener('cancel', event => {
        if (document.getElementById('open-invitation').disabled) event.preventDefault();
      });
      scrollTo({top:0,behavior:'instant'});
      document.documentElement.classList.add('dialog-open');
      opening.showModal();
      document.documentElement.classList.remove('opening-pending');
      import('./main.js?v=20261029-5').catch(() => startup?.fail());
    } catch { startup?.fail(); }
  }
}
