(() => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const toast = document.createElement('div');
  toast.className = 'site-toast';
  document.body.appendChild(toast);

  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  document.querySelectorAll('.navbar').forEach((navbar) => {
    const menu = navbar.querySelector('.nav-links');
    if (!menu) return;
    const toggle = document.createElement('button');
    toggle.className = 'site-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    navbar.insertBefore(toggle, menu);
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      toggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }));
  });

  document.querySelectorAll('.btn-header, .btn-main, .banner-btn, .btn-pill-book, .btn-dark-book, .btn-banner-book').forEach((button) => {
    button.addEventListener('click', () => { window.location.href = 'contact.html'; });
  });

  document.querySelectorAll('.btn-outline').forEach((button) => {
    button.addEventListener('click', () => { window.location.href = 'service.html'; });
  });

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });

  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
      showToast('Thanks for reaching out. We will get back to you shortly.');
    });
  });

  const filters = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (filters.length && galleryCards.length) {
    filters.forEach((filter) => filter.addEventListener('click', () => {
      filters.forEach((item) => item.classList.remove('active'));
      filter.classList.add('active');
      const category = filter.textContent.trim().toLowerCase().split(' ')[0];
      galleryCards.forEach((card) => {
        const text = card.textContent.trim().toLowerCase();
        card.hidden = category !== 'all' && !text.includes(category);
      });
    }));
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });
})();
