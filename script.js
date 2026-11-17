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
    document.querySelectorAll('[data-wa-en][data-wa-mr]').forEach((link) => {
      const message = link.dataset[next];
      link.href = 'https://wa.me/919405118424?text=' + encodeURIComponent(message);
    });
    document.querySelectorAll('[data-placeholder-en][data-placeholder-mr]').forEach((input) => {
      input.placeholder = input.dataset[next];
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

  document.querySelectorAll('.enquiry-spice-check').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const row = checkbox.closest('.enquiry-spice-row');
      const size = row.querySelector('.enquiry-size');
      size.disabled = !checkbox.checked;
      if (checkbox.checked) size.focus({ preventScroll: true });
    });
  });

  document.querySelector('#send-enquiry').addEventListener('click', () => {
    const selected = Array.from(document.querySelectorAll('.enquiry-spice-check:checked'));
    const hint = document.querySelector('#enquiry-hint');
    if (!selected.length) {
      hint.textContent = language === 'mr'
        ? 'कृपया किमान एक मसाला निवडा.'
        : 'Please select at least one spice.';
      document.querySelector('.enquiry-spices').focus();
      return;
    }
    const buyer = document.querySelector('#enquiry-buyer');
    const buyerText = buyer.options[buyer.selectedIndex].dataset[language];
    const city = document.querySelector('#enquiry-city').value.trim();
    const lines = selected.map((checkbox) => {
      const row = checkbox.closest('.enquiry-spice-row');
      const name = language === 'mr' ? checkbox.dataset.nameMr : checkbox.value;
      return '- ' + name + ' — ' + row.querySelector('.enquiry-size').value;
    });
    const message = language === 'mr'
      ? ['नमस्कार हेलिओ हेरिटेज फूड्स,', '', 'मला खालील मसाल्यांबाबत चौकशी करायची आहे:', ...lines, '', 'ग्राहक प्रकार: ' + buyerText, 'डिलिव्हरीचे ठिकाण: ' + (city || 'नमूद केलेले नाही'), '', 'कृपया किंमत आणि उपलब्धतेची माहिती द्या.'].join('\\n')
      : ['Hello Helio Heritage Foods,', '', 'I would like to enquire about:', ...lines, '', 'Buyer type: ' + buyerText, 'Delivery location: ' + (city || 'Not specified'), '', 'Please share the prices and availability.'].join('\\n');
    const url = 'https://wa.me/919405118424?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  setLanguage(language);
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
