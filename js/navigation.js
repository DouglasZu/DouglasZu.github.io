/* ============================================
   NAVIGATION — Smooth Scroll, Active State,
   Mobile Menu, Scroll Effects
   ============================================ */

class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.nav-links');
    this.mobileOverlay = document.querySelector('.mobile-overlay');
    this.scrollTopBtn = document.querySelector('.scroll-top');
    this.sections = document.querySelectorAll('section[id]');

    this.init();
  }

  init() {
    this.bindScrollEvents();
    this.bindNavClicks();
    this.bindMobileMenu();
    this.bindScrollTop();
    this.setupActiveObserver();
  }

  /* ---- Navbar scroll background ---- */
  bindScrollEvents() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  onScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (this.navbar) {
      this.navbar.classList.toggle('scrolled', scrollY > 50);
    }

    // Scroll to top button
    if (this.scrollTopBtn) {
      this.scrollTopBtn.classList.toggle('visible', scrollY > 500);
    }
  }

  /* ---- Smooth scroll on nav click ---- */
  bindNavClicks() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
          this.closeMobileMenu();
        }
      });
    });
  }

  /* ---- Active section highlighting ---- */
  setupActiveObserver() {
    const options = {
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) + 20}px 0px -40% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.setActive(id);
        }
      });
    }, options);

    this.sections.forEach(section => observer.observe(section));
  }

  setActive(id) {
    this.navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  /* ---- Mobile Menu ---- */
  bindMobileMenu() {
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.mobileMenu.classList.contains('open')) {
        this.closeMobileMenu();
        this.mobileToggle.focus();
      }
    });
    document.addEventListener('languagechange', () => this.updateMobileLabel());
  }

  toggleMobileMenu() {
    const isOpen = this.mobileMenu.classList.toggle('open');
    this.mobileToggle.classList.toggle('active', isOpen);
    this.mobileToggle.setAttribute('aria-expanded', String(isOpen));
    this.updateMobileLabel();
    if (this.mobileOverlay) {
      this.mobileOverlay.classList.toggle('visible', isOpen);
      this.mobileOverlay.setAttribute('aria-hidden', String(!isOpen));
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileMenu.classList.remove('open');
    this.mobileToggle.classList.remove('active');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.updateMobileLabel();
    if (this.mobileOverlay) {
      this.mobileOverlay.classList.remove('visible');
      this.mobileOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  updateMobileLabel() {
    if (!this.mobileToggle) return;
    const isOpen = this.mobileMenu?.classList.contains('open');
    const i18n = window.i18nInstance;
    const key = isOpen ? 'accessibility.closeMenu' : 'accessibility.openMenu';
    const fallback = isOpen ? 'Close navigation menu' : 'Open navigation menu';
    this.mobileToggle.setAttribute('aria-label', i18n?.getTranslation(key) || fallback);
  }

  /* ---- Scroll to Top ---- */
  bindScrollTop() {
    if (this.scrollTopBtn) {
      this.scrollTopBtn.addEventListener('click', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
  }
}

window.Navigation = Navigation;
