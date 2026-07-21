document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new Navigation();
  new ScrollAnimations();
  new Filters();
  window.i18nInstance = new I18n();

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new ParticleSystem('hero-particles');
  }
});
