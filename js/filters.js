/* ============================================
   FILTERS — Project Filter + Artifact Tabs
   ============================================ */

class Filters {
  constructor() {
    this.initProjectFilters();
    this.initArtifactDialogs();
  }

  /* ---- Project Filters ---- */
  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Filter cards
        projectCards.forEach(card => {
          const category = card.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            card.hidden = false;
            card.setAttribute('aria-hidden', 'false');
            card.classList.remove('hidden');
            card.style.position = '';
          } else {
            card.setAttribute('aria-hidden', 'true');
            card.classList.add('hidden');
            // Delay position change for animation
            setTimeout(() => {
              if (card.classList.contains('hidden')) {
                card.hidden = true;
                card.style.position = 'absolute';
              }
            }, 400);
          }
        });
      });
    });
  }

  initArtifactDialogs() {
    const openButtons = document.querySelectorAll('.dialog-open');
    const dialogs = document.querySelectorAll('.artifact-dialog');

    openButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = document.getElementById(button.dataset.dialog);
        if (dialog?.showModal) dialog.showModal();
      });
    });

    dialogs.forEach((dialog) => {
      dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
    });
  }
}

window.Filters = Filters;
