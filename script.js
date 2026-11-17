(() => {
  const toggle = document.querySelector('.language-toggle');
  const langLabel = toggle.querySelector('.lang-label');
  const langIcon = toggle.querySelector('span:first-child');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  let language = 'en';
  try {
    const savedLanguage = localStorage.getItem('hhf-language');
    if (savedLanguage === 'mr') language = 'mr';
  } catch (_) {
    // Storage may be unavailable; keep English as the safe default.
  }

  function updateMenuButtonLabel(state) {
    const labels = language === 'mr'
      ? { open: 'नेव्हिगेशन उघडा', close: 'नेव्हिगेशन बंद करा' }
      : { open: 'Open navigation', close: 'Close navigation' };
    menuButton.setAttribute('aria-label', labels[state]);
  }

  function setLanguage(next) {
    language = next;
    try {
      localStorage.setItem('hhf-language', next);
    } catch (_) {
      // Language switching still works for the current page session.
    }
    document.documentElement.lang = next === 'mr' ? 'mr' : 'en';
    document.body.classList.toggle('lang-mr', next === 'mr');
    document.querySelectorAll('[data-en][data-mr]').forEach((el) => {
      const value = el.dataset[next];
      if (value !== undefined) el.innerHTML = value;
    });
    langLabel.textContent = next === 'en' ? 'मराठी' : 'English';
    langIcon.textContent = next === 'en' ? 'अ' : 'En';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Marathi' : 'Switch to English');
    updateMenuButtonLabel('open');
    nav.setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'मुख्य नेव्हिगेशन');
  }

  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'mr' : 'en'));
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    updateMenuButtonLabel(expanded ? 'open' : 'close');
    nav.classList.toggle('open', !expanded);
  });
  function closeMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    updateMenuButtonLabel('open');
  }

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (nav.classList.contains('open') && !nav.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  setLanguage(language);
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
