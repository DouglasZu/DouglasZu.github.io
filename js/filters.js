/* ============================================
   FILTERS — Project Filter + Artifact Tabs
   ============================================ */

class Filters {
  constructor() {
    this.initProjectFilters();
    this.initArtifactTabs();
  }

  /* ---- Project Filters ---- */
  initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        projectCards.forEach(card => {
          const category = card.dataset.category;
          const show = filter === 'all' || category === filter;

          if (show) {
            card.classList.remove('hidden');
            card.style.position = '';
          } else {
            card.classList.add('hidden');
            // Delay position change for animation
            setTimeout(() => {
              if (card.classList.contains('hidden')) {
                card.style.position = 'absolute';
              }
            }, 400);
          }
        });
      });
    });
  }

  /* ---- Artifact Tabs ---- */
  initArtifactTabs() {
    const tabBtns = document.querySelectorAll('.artifact-tab-btn');
    const tabContents = document.querySelectorAll('.artifact-tab-content');

    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show target content
        tabContents.forEach(content => {
          content.classList.toggle('active', content.id === target);
        });
      });
    });
  }
}

window.Filters = Filters;
