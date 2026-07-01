/**
 * Landing interactions:
 * - page loader
 * - scroll reveal
 * - countdown timer
 * - FAQ accordion
 */
(function () {
  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;

    requestAnimationFrame(function () {
      loader.classList.add('is-hidden');
      window.setTimeout(function () {
        loader.remove();
      }, 400);
    });
  }

  function setupReveal() {
    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function updateCountdown(container, targetDate) {
    var diff = targetDate.getTime() - Date.now();
    var units = {
      days: container.querySelector('[data-unit="days"]'),
      hours: container.querySelector('[data-unit="hours"]'),
      minutes: container.querySelector('[data-unit="minutes"]'),
      seconds: container.querySelector('[data-unit="seconds"]')
    };

    if (diff <= 0) {
      Object.keys(units).forEach(function (key) {
        if (units[key]) units[key].textContent = '00';
      });
      return;
    }

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    if (units.days) units.days.textContent = String(days).padStart(2, '0');
    if (units.hours) units.hours.textContent = String(hours).padStart(2, '0');
    if (units.minutes) units.minutes.textContent = String(minutes).padStart(2, '0');
    if (units.seconds) units.seconds.textContent = String(seconds).padStart(2, '0');
  }

  function setupCountdowns() {
    var timers = document.querySelectorAll('[data-countdown]');
    if (!timers.length) return;

    timers.forEach(function (timer) {
      var rawDate = timer.getAttribute('data-countdown');
      var targetDate = new Date(rawDate);
      if (Number.isNaN(targetDate.getTime())) return;

      updateCountdown(timer, targetDate);
      window.setInterval(function () {
        updateCountdown(timer, targetDate);
      }, 1000);
    });
  }

  function setupAccordion() {
    var groups = document.querySelectorAll('[data-accordion]');
    if (!groups.length) return;

    groups.forEach(function (group) {
      var items = group.querySelectorAll('.faq-item');
      items.forEach(function (item) {
        var trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');
          items.forEach(function (peer) {
            peer.classList.remove('is-open');
            var peerTrigger = peer.querySelector('.faq-trigger');
            if (peerTrigger) peerTrigger.setAttribute('aria-expanded', 'false');
          });

          if (!isOpen) {
            item.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  function init() {
    setupReveal();
    setupCountdowns();
    setupAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    window.addEventListener('load', hideLoader);
  } else {
    init();
    window.addEventListener('load', hideLoader);
  }
})();
