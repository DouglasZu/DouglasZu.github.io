/* ============================================
   ANIMATIONS — Scroll Reveal via
   IntersectionObserver
   ============================================ */

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupReveal();
  }

  setupReveal() {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    );

    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
}

window.ScrollAnimations = ScrollAnimations;
