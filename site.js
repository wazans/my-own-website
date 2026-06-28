/**
 * Site-wide helpers:
 *  - Inject a floating "Register Now" button on every page that doesn't already have one
 *  - Inject a hamburger menu toggle for the top nav on mobile
 */
(function () {
  function init() {
    // -------- Floating Register button --------
    if (!document.querySelector('.floating-register') && !document.body.classList.contains('hide-floating-register')) {
      var a = document.createElement('a');
      a.className = 'floating-register';
      a.href = 'register.html';
      a.textContent = 'Register Now';
      a.setAttribute('data-testid', 'floating-register-btn');
      document.body.appendChild(a);
    }

    // -------- Hamburger toggle --------
    var navContainer = document.querySelector('.nav-container');
    var siteNav = document.querySelector('.site-nav');
    if (navContainer && siteNav && !navContainer.querySelector('.nav-toggle')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'nav-toggle';
      btn.setAttribute('aria-label', 'Toggle navigation');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('data-testid', 'nav-toggle');
      btn.innerHTML = '<span></span>';
      // place toggle after brand, before nav
      navContainer.insertBefore(btn, siteNav);
      btn.addEventListener('click', function () {
        var open = siteNav.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // close on link tap
      siteNav.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.tagName === 'A' && siteNav.classList.contains('open')) {
          siteNav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
