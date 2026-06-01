/* ============================================
   MAIN — App Initialization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Preloader ----
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add('loaded');
    }, 300);
  });

  // Fallback: hide preloader after 3s even if load event fires early
  setTimeout(() => {
    if (preloader) preloader.classList.add('loaded');
  }, 3000);

  // ---- Initialize Modules ----
  new ThemeManager();
  new Navigation();
  new ScrollAnimations();
  new Filters();
  new ParticleSystem('hero-particles');

  // ---- Typewriter Effect ----
  initTypewriter();

  // ---- Stats Counter ----
  initStatsCounter();

  // ---- i18n (must be after DOM is populated) ----
  window.i18nInstance = new I18n();
});

/* ============================================
   TYPEWRITER EFFECT
   ============================================ */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  // Get initial language from localStorage or default to 'en'
  const currentLang = localStorage.getItem('lang') || 'en';
  let roles = (window.typewriterRoles && window.typewriterRoles[currentLang]) || [
    'QA Engineer',
    'Test Automation Engineer',
    'Quality Advocate',
    'SDET',
    'Bug Hunter',
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let timeoutId = null;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    timeoutId = setTimeout(type, typingSpeed);
  }

  // Expose method to update roles on language switch
  window.typewriterInstance = {
    updateRoles: function(lang) {
      if (window.typewriterRoles && window.typewriterRoles[lang]) {
        roles = window.typewriterRoles[lang];
        // Reset to start cleanly
        if (timeoutId) clearTimeout(timeoutId);
        roleIndex = 0;
        charIndex = 0;
        isDeleting = false;
        element.textContent = '';
        timeoutId = setTimeout(type, 400);
      }
    }
  };

  // Start after a short delay
  setTimeout(type, 1000);
}

/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */
function initStatsCounter() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}
