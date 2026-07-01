/**
 * Shared site helpers:
 * - mobile navigation toggle
 * - sticky mobile register button
 * - floating WhatsApp button
 * - footer year sync
 */
(function () {
  function injectRegisterButton() {
    if (
      document.querySelector('.floating-register') ||
      document.body.classList.contains('hide-floating-register')
    ) {
      return;
    }

    var href = document.body.getAttribute('data-register-href') || 'register.html';
    var link = document.createElement('a');
    link.className = 'floating-register';
    link.href = href;
    link.textContent = 'Register Now';
    link.setAttribute('data-testid', 'floating-register-btn');
    document.body.appendChild(link);
  }

  function injectWhatsAppButton() {
    if (document.querySelector('.floating-whatsapp')) return;

    var number = document.body.getAttribute('data-whatsapp-number');
    if (!number) return;

    var message = document.body.getAttribute('data-whatsapp-message') || 'Hi TestNova';
    var href = 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(number) + '&text=' + encodeURIComponent(message);
    var link = document.createElement('a');
    link.className = 'floating-whatsapp';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Chat on WhatsApp');
    link.innerHTML = [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
      '<path d="M20.5 3.5A11 11 0 0 0 3.36 16.8L2 22l5.35-1.33A11 11 0 1 0 20.5 3.5zm-8.54 16a9 9 0 0 1-4.58-1.25l-.33-.19-3.17.79.84-3.09-.21-.32a9 9 0 1 1 7.45 4.06zm4.93-6.72c-.27-.13-1.62-.8-1.87-.89-.25-.09-.43-.13-.61.14-.18.27-.7.89-.85 1.07-.16.18-.31.2-.58.07-.27-.13-1.14-.42-2.16-1.35-.8-.71-1.33-1.6-1.49-1.87-.16-.27-.02-.41.11-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.61-1.47-.83-2.01-.22-.54-.45-.47-.61-.48h-.52c-.18 0-.47.07-.72.34s-.94.92-.94 2.25.96 2.62 1.09 2.8c.13.18 1.88 2.87 4.55 4.02.64.28 1.14.45 1.53.57.64.2 1.22.17 1.68.11.51-.08 1.62-.66 1.85-1.3.22-.64.22-1.19.16-1.3-.07-.11-.25-.18-.52-.31z"></path>',
      '</svg>'
    ].join('');
    document.body.appendChild(link);
  }

  function setupMobileNav() {
    var navContainer = document.querySelector('.nav-container');
    var siteNav = document.querySelector('.site-nav');
    if (!navContainer || !siteNav) return;

    var existing = navContainer.querySelector('.nav-toggle');
    if (existing) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('data-testid', 'nav-toggle');
    btn.innerHTML = '<span></span>';
    navContainer.insertBefore(btn, siteNav);

    btn.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    siteNav.addEventListener('click', function (event) {
      var target = event.target;
      if (target && target.tagName === 'A' && siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.classList.contains('open')) return;
      if (navContainer.contains(event.target)) return;

      siteNav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  function syncFooterYear() {
    var yearNodes = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    yearNodes.forEach(function (node) {
      node.textContent = year;
    });
  }

  function init() {
    injectRegisterButton();
    injectWhatsAppButton();
    setupMobileNav();
    syncFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
