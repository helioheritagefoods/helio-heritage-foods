(() => {
  const toggle = document.querySelector('.language-toggle');
  const langLabel = toggle.querySelector('.lang-label');
  const langIcon = toggle.querySelector('span:first-child');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  let language = 'en';

  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next === 'mr' ? 'mr' : 'en';
    document.body.classList.toggle('lang-mr', next === 'mr');
    document.querySelectorAll('[data-en][data-mr]').forEach((el) => {
      const value = el.dataset[next];
      if (value !== undefined) el.innerHTML = value;
    });
    langLabel.textContent = next === 'en' ? 'मराठी' : 'English';
    langIcon.textContent = next === 'en' ? 'अ' : 'En';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Marathi' : 'Switch to English');
  }

  toggle.addEventListener('click', () => setLanguage(language === 'en' ? 'mr' : 'en'));
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !expanded);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
