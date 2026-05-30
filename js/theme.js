/* ============================================
   THEME — Dark/Light Mode Toggle
   ============================================ */

class ThemeManager {
  constructor() {
    this.toggleBtn = document.getElementById('theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    this.apply(this.currentTheme);
    this.bindEvents();
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  getStoredTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    this.currentTheme = theme;
  }

  toggle() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.apply(newTheme);
  }

  bindEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
  }
}

window.ThemeManager = ThemeManager;
