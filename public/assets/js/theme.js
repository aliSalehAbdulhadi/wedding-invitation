import { getTheme } from './themes.js?v=20261028-8';

let activeTheme = getTheme('champagne');
export const getActiveTheme = () => activeTheme;

// The couple selected one palette for every guest; old device preferences no longer apply.
export function initializeTheme(content) {
  activeTheme = getTheme(content.design?.theme);
  document.documentElement.dataset.theme = activeTheme.id;
  for (const [key, value] of Object.entries(activeTheme.colors)) document.documentElement.style.setProperty(`--${key}`,value);
  document.documentElement.style.setProperty('--mist',activeTheme.colors.soft);
  document.querySelector('meta[name="theme-color"]').content = activeTheme.colors.paper;
}
