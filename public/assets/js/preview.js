if (location.protocol === 'file:') {
  const note = document.createElement('aside');
  note.className = 'local-preview-notice';
  note.setAttribute('aria-label', 'Local preview / المعاينة المحلية');
  const copy = document.createElement('p');
  copy.textContent = 'لمشاهدة الحركة والألوان، افتح المعاينة المحلية. / Open the local preview for animations and the theme studio.';
  const link = document.createElement('a');
  link.href = 'http://127.0.0.1:8082/';
  link.textContent = 'افتح المعاينة · Open preview';
  note.append(copy, link);
  document.body.prepend(note);
} else {
  import('./main.js?v=20261023-5');
}
