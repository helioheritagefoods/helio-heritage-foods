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
      ? { open: 'मेन्यू उघडा', close: 'मेन्यू बंद करा' }
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
      // data-wa-en / data-wa-mr map to dataset.waEn / dataset.waMr.
      const message = next === 'mr' ? link.dataset.waMr : link.dataset.waEn;
      const safeMessage = message || (next === 'mr'
        ? 'नमस्कार! मला तुमच्या मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे.'
        : 'Hello Helio Heritage Foods, please share your product prices and availability.');
      link.href = 'https://wa.me/919405118424?text=' + encodeURIComponent(safeMessage);
    });
    document.querySelectorAll('[data-placeholder-en][data-placeholder-mr]').forEach((input) => {
      input.placeholder = input.dataset[next];
    });
    langLabel.textContent = next === 'en' ? 'मराठी' : 'English';
    langIcon.textContent = next === 'en' ? 'अ' : 'En';
    toggle.setAttribute('aria-label', next === 'en' ? 'Switch to Marathi' : 'Switch to English');
    updateMenuButtonLabel('open');
    nav.setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'मुख्य मेन्यू');
    document.dispatchEvent(new CustomEvent('hhf:languagechange', { detail: { language: next } }));
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

  const enquiryForm = document.querySelector('#quick-enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('change', (event) => {
      const checkbox = event.target.closest('.enquiry-spice-check');
      if (!checkbox || !enquiryForm.contains(checkbox)) return;
      const row = checkbox.closest('.enquiry-spice-row');
      const size = row && row.querySelector('.enquiry-size');
      if (size) size.disabled = !checkbox.checked;
    });

    enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = Array.from(enquiryForm.querySelectorAll('.enquiry-spice-check:checked'));
    const hint = enquiryForm.querySelector('#enquiry-hint');
    if (!selected.length) {
      hint.textContent = language === 'mr'
        ? 'कृपया चौकशीसाठी किमान एक मसाला निवडा.'
        : 'Please select at least one spice.';
      enquiryForm.querySelector('.enquiry-spices').focus();
      return;
    }
    const buyer = enquiryForm.querySelector('#enquiry-buyer');
    const buyerText = buyer.options[buyer.selectedIndex].dataset[language];
    const city = enquiryForm.querySelector('#enquiry-city').value.trim();
    const lines = selected.map((checkbox) => {
      const row = checkbox.closest('.enquiry-spice-row');
      const name = language === 'mr' ? checkbox.dataset.nameMr : checkbox.value;
      const sizeSelect = row.querySelector('.enquiry-size');
      const sizeText = sizeSelect.options[sizeSelect.selectedIndex].dataset[language] || sizeSelect.value;
      return '- ' + name + ' — ' + sizeText;
    });
    const message = language === 'mr'
      ? ['नमस्कार हेलिओ हेरिटेज फूड्स!', '', 'मला खालील मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे:', ...lines, '', 'ग्राहक प्रकार: ' + buyerText, 'माल पाठवायचे ठिकाण: ' + (city || 'नमूद केलेले नाही'), '', 'कृपया किंमत आणि उपलब्ध पॅकची माहिती कळवा.'].join('\n')
      : ['Hello Helio Heritage Foods,', '', 'I would like to enquire about:', ...lines, '', 'Buyer type: ' + buyerText, 'Delivery location: ' + (city || 'Not specified'), '', 'Please share the prices and availability.'].join('\n');
    const url = 'https://wa.me/919405118424?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  setLanguage(language);
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
