(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const phone = '919405118424';
  const getLanguage = () => document.body.classList.contains('lang-mr') ? 'mr' : 'en';

  // Put the enquiry flow between the audience section and wholesale/contact details.
  const enquiry = $('.quick-enquiry');
  const contact = $('#contact');
  if (enquiry && contact) {
    const section = document.createElement('section');
    section.id = 'enquiry';
    section.className = 'enquiry-section section-pad';
    section.setAttribute('aria-label', 'Quick Enquiry Builder');
    enquiry.parentNode.removeChild(enquiry);
    section.appendChild(enquiry);
    const anchor = $('#wholesale') || $('#customer-trust') || $('#faq') || contact;
    anchor.parentNode.insertBefore(section, anchor);
  }

  // Step labels are visual only; the original form labels and copy remain unchanged.
  const form = $('#quick-enquiry-form');
  if (form) {
    const buyer = $('.enquiry-field', form);
    const spices = $('.enquiry-spices', form);
    const city = $$('.enquiry-field', form).find((field) => $('#enquiry-city', field));
    if (buyer) buyer.classList.add('enquiry-step');
    if (buyer) buyer.dataset.step = '1';
    if (spices) { spices.classList.add('enquiry-step'); spices.dataset.step = '2'; }
    if (city) { city.classList.add('enquiry-step'); city.dataset.step = '3'; }
    if (spices) spices.setAttribute('tabindex', '-1');

    const preview = document.createElement('div');
    preview.className = 'enquiry-preview';
    preview.setAttribute('aria-live', 'polite');
    preview.setAttribute('aria-label', 'WhatsApp message preview');
    const previewText = document.createElement('pre');
    preview.appendChild(previewText);
    const submit = $('#send-enquiry', form);
    if (submit) form.insertBefore(preview, submit);

    const makeMessage = () => {
      const lang = getLanguage();
      const selected = $$('.enquiry-spice-check:checked', form);
      const buyerSelect = $('#enquiry-buyer', form);
      const buyerText = buyerSelect ? buyerSelect.options[buyerSelect.selectedIndex].dataset[lang] : '';
      const cityValue = ($('#enquiry-city', form)?.value || '').trim();
      const lines = selected.map((checkbox) => {
        const row = checkbox.closest('.enquiry-spice-row');
        const size = $('.enquiry-size', row);
        const name = lang === 'mr' ? checkbox.dataset.nameMr : checkbox.value;
        const sizeText = size.options[size.selectedIndex].dataset[lang] || size.value;
        return '- ' + name + ' — ' + sizeText;
      });
      return lang === 'mr'
        ? ['नमस्कार हेलिओ हेरिटेज फूड्स!', '', 'मला खालील मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे:', ...(lines.length ? lines : ['- मसाले निवडायचे आहेत']), '', 'ग्राहक प्रकार: ' + buyerText, 'माल पाठवायचे ठिकाण: ' + (cityValue || 'नमूद केलेले नाही'), '', 'कृपया किंमत आणि उपलब्ध पॅकची माहिती कळवा.'].join('\n')
        : ['Hello Helio Heritage Foods,', '', 'I would like to enquire about:', ...(lines.length ? lines : ['- Spices to be selected']), '', 'Buyer type: ' + buyerText, 'Delivery location: ' + (cityValue || 'Not specified'), '', 'Please share the prices and availability.'].join('\n');
    };
    const refreshPreview = () => { previewText.textContent = makeMessage(); };
    form.addEventListener('input', refreshPreview);
    form.addEventListener('change', refreshPreview);
    document.addEventListener('hhf:languagechange', refreshPreview);
    refreshPreview();
  }

  // Consistent pack-size chips that personalise the existing WhatsApp order message.
  $$('.product-card').forEach((card) => {
    const order = $('.product-order-button', card);
    const sizes = $('.product-pack-sizes span', card);
    if (!order || !sizes) return;
    const chips = document.createElement('div');
    chips.className = 'product-size-chips';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', 'Choose pack size');
    ['100g', '250g', '500g', '1kg'].forEach((size) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'product-size-chip';
      chip.textContent = size;
      chip.setAttribute('aria-pressed', 'false');
      chip.addEventListener('click', () => {
        $$('.product-size-chip', chips).forEach((item) => item.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        order.dataset.selectedSize = size;
        updateProductLink(order);
      });
      chips.appendChild(chip);
    });
    const details = $('.product-order-details', card);
    if (details) details.insertBefore(chips, order);
    updateProductLink(order);
  });

  function updateProductLink(link) {
    const lang = getLanguage();
    const base = lang === 'mr' ? link.dataset.waMr : link.dataset.waEn;
    const size = link.dataset.selectedSize;
    const suffix = size ? (lang === 'mr' ? ' पॅकचे वजन: ' : ' Pack size: ') + size + '.' : '';
    const message = (base || '') + suffix;
    link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  }
  document.addEventListener('hhf:languagechange', () => {
    $$('.product-order-button').forEach(updateProductLink);
    const heroOrder = $('.hero-order');
    if (heroOrder) heroOrder.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(getLanguage() === 'mr'
      ? 'नमस्कार! मला तुमच्या मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे.'
      : 'Hello Helio Heritage Foods, I would like to place an order.');
  });

  // Sticky header, active section indicator and mobile order actions.
  const header = $('.site-header');
  const onScroll = () => { if (header) header.classList.toggle('is-compact', window.scrollY > 24); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const navLinks = $$('.primary-nav a[href^="#"]');
  const observed = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
    observed.forEach((section) => observer.observe(section));
  }

  const orderUrl = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(getLanguage() === 'mr'
    ? 'नमस्कार! मला तुमच्या मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे.'
    : 'Hello Helio Heritage Foods, I would like to place an order.');
  const floating = document.createElement('a');
  floating.className = 'floating-whatsapp';
  floating.href = orderUrl;
  floating.target = '_blank';
  floating.rel = 'noopener noreferrer';
  floating.setAttribute('aria-label', 'Order on WhatsApp');
  floating.textContent = 'Order on WhatsApp';
  document.body.appendChild(floating);
  const bar = document.createElement('div');
  bar.className = 'mobile-order-bar';
  const barLink = document.createElement('a');
  barLink.href = orderUrl;
  barLink.target = '_blank';
  barLink.rel = 'noopener noreferrer';
  barLink.textContent = 'Order on WhatsApp ↗';
  bar.appendChild(barLink);
  document.body.appendChild(bar);
  document.addEventListener('hhf:languagechange', () => {
    const message = getLanguage() === 'mr'
      ? 'नमस्कार! मला तुमच्या मसाल्यांची किंमत आणि उपलब्धता जाणून घ्यायची आहे.'
      : 'Hello Helio Heritage Foods, I would like to place an order.';
    const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
    floating.href = url;
    barLink.href = url;
    barLink.textContent = getLanguage() === 'mr' ? 'व्हॉट्सॲपवर ऑर्डर करा ↗' : 'Order on WhatsApp ↗';
  });

  // Embedded map uses the existing published business address and leaves its text/link intact.
  const address = $('.contact address');
  if (address && !$('.map-embed')) {
    const map = document.createElement('iframe');
    map.className = 'map-embed';
    map.loading = 'lazy';
    map.referrerPolicy = 'no-referrer-when-downgrade';
    map.title = 'Helio Heritage Foods location map';
    map.src = 'https://www.google.com/maps?q=' + encodeURIComponent('House No. 1405, Gat No. 103/4, Turambe, Radhanagari, Kolhapur, Maharashtra 416208, India') + '&output=embed';
    address.parentNode.appendChild(map);
  }

  // Keep a visible validation message and move focus to the missing selection.
  const enquiryHint = $('#enquiry-hint');
  if (form && enquiryHint) {
    form.addEventListener('submit', (event) => {
      if (!$('.enquiry-spice-check:checked', form)) {
        event.preventDefault();
        enquiryHint.textContent = getLanguage() === 'mr'
          ? 'कृपया चौकशीसाठी किमान एक मसाला निवडा.'
          : 'Please select at least one spice to continue.';
        if ($('#enquiry-city', form)?.value.trim()) return;
        spicesFocus();
      }
    });
    function spicesFocus() { $('#quick-enquiry-form .enquiry-spices')?.focus(); }
  }
})();
