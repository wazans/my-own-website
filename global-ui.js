(function () {
  'use strict';

  var SEARCH_ITEMS = [
    ['Courses', 'Learning Hub', '/learning-hub.html', 'Browse every TestNova learning path'],
    ['Courses', 'QA & Automation', '/qa-engineering.html', 'Selenium, Playwright, API, BDD and frameworks'],
    ['Courses', 'AI Learning', '/ai-emerging-technologies.html', 'AI fundamentals, prompting and agents'],
    ['Courses', 'Development & Tech', '/development-technologies.html', 'JavaScript, TypeScript, Java, Python and Git'],
    ['Playwright', 'Introduction to Playwright', '/playwright-reader.html?topic=playwright-notes-01', 'Getting started'],
    ['Playwright', 'Locators', '/playwright-reader.html?topic=playwright-notes-08', 'Stable element selection'],
    ['Playwright', 'Assertions', '/playwright-reader.html?topic=playwright-notes-19', 'Web-first checks'],
    ['Playwright', 'Browser Context', '/playwright-reader.html?topic=playwright-notes-17', 'Browser isolation'],
    ['JavaScript & TypeScript', 'Arrays', '/js-typescript.html?topic=arrays', 'Collections and array methods'],
    ['JavaScript & TypeScript', 'Promises and Async/Await', '/js-typescript.html?topic=promises', 'Asynchronous workflows'],
    ['QA', 'Selenium', '/selenium.html', 'WebDriver automation tutorial'],
    ['QA', 'API Testing', '/api.html', 'REST and API testing concepts'],
    ['Development', 'Git & GitHub', '/git-github-essentials.html', 'Version control essentials']
  ];

  function icon(path) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"></path></svg>';
  }

  function preferredTheme() {
    var saved = localStorage.getItem('testnova-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Use light theme' : 'Use dark theme');
      button.setAttribute('title', theme === 'dark' ? 'Use light theme' : 'Use dark theme');
    });
  }

  function initAdminMode() {
    var params = new URLSearchParams(window.location.search);
    var enabled = params.get('admin') === '1' || params.get('edit') === '1' || localStorage.getItem('testnova-admin') === 'true';
    document.body.classList.toggle('is-admin-mode', enabled);
    if (!enabled) {
      document.querySelectorAll('[contenteditable="true"]').forEach(function (node) { node.setAttribute('contenteditable', 'false'); });
    }
  }

  function renderResults(value) {
    var results = document.querySelector('[data-tn-search-results]');
    var query = String(value || '').trim().toLowerCase();
    var matches = SEARCH_ITEMS.filter(function (item) { return !query || item.join(' ').toLowerCase().indexOf(query) !== -1; });
    if (!matches.length) {
      results.innerHTML = '<p class="tn-search-empty">No matching lessons or courses. Try a broader term.</p>';
      return;
    }
    var groups = {};
    matches.forEach(function (item) { (groups[item[0]] = groups[item[0]] || []).push(item); });
    results.innerHTML = Object.keys(groups).map(function (group) {
      return '<section class="tn-search-group"><h3>' + group + '</h3>' + groups[group].map(function (item) {
        return '<a class="tn-search-result" href="' + item[2] + '"><strong>' + item[1] + '</strong><small>' + item[3] + '</small></a>';
      }).join('') + '</section>';
    }).join('');
  }

  function initGlobalTools() {
    var navContainer = document.querySelector('.nav-container');
    var nav = document.querySelector('.site-nav');
    if (!navContainer || !nav || navContainer.querySelector('.tn-nav-tools')) return;

    var tools = document.createElement('div');
    tools.className = 'tn-nav-tools';
    tools.innerHTML = '<button class="tn-icon-button tn-search-trigger" type="button" data-search-open aria-label="Search TestNova" title="Search (Ctrl or Cmd + K)">' + icon('m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z') + '</button>' +
      '<button class="tn-icon-button" type="button" data-theme-toggle aria-label="Toggle theme">' + icon('M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z') + '</button>';
    navContainer.appendChild(tools);

    var dialog = document.createElement('div');
    dialog.className = 'tn-search-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Search TestNova');
    dialog.innerHTML = '<div class="tn-search-panel"><div class="tn-search-head">' + icon('m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z') + '<input type="search" data-tn-search-input aria-label="Search courses and lessons" placeholder="Search TestNova..."><button class="tn-icon-button" type="button" data-search-close aria-label="Close search">×</button></div><div class="tn-search-results" data-tn-search-results></div></div>';
    document.body.appendChild(dialog);
    var input = dialog.querySelector('[data-tn-search-input]');
    var previouslyFocused;

    function openSearch() {
      previouslyFocused = document.activeElement;
      dialog.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      renderResults(input.value);
      setTimeout(function () { input.focus(); }, 0);
    }
    function closeSearch() {
      dialog.classList.remove('is-open');
      document.body.style.overflow = '';
      if (previouslyFocused) previouslyFocused.focus();
    }
    tools.querySelector('[data-search-open]').addEventListener('click', openSearch);
    dialog.querySelector('[data-search-close]').addEventListener('click', closeSearch);
    dialog.addEventListener('click', function (event) { if (event.target === dialog) closeSearch(); });
    input.addEventListener('input', function () { renderResults(input.value); });
    tools.querySelector('[data-theme-toggle]').addEventListener('click', function () {
      var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('testnova-theme', theme);
      applyTheme(theme);
    });
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
      if (event.key === 'Escape') { closeSearch(); nav.classList.remove('open'); }
    });
  }

  function initGlobalFooter() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;
    footer.classList.add('premium-footer');
    footer.innerHTML = '<div class="container footer-layout">' +
      '<div class="footer-brand"><a class="brand footer-logo" href="/index.html">TestNova</a><p>Practical learning for QA, automation, AI and modern technology.</p></div>' +
      '<div class="footer-links">' +
      '<div><h3>Learning</h3><a href="/qa-engineering.html">QA &amp; Automation</a><a href="/ai-emerging-technologies.html">AI</a><a href="/development-technologies.html">Tech</a></div>' +
      '<div><h3>Popular</h3><a href="/playwright-reader.html">Playwright</a><a href="/selenium.html">Selenium</a><a href="/api.html">API Testing</a><a href="/js-typescript.html">JavaScript</a></div>' +
      '<div><h3>Company</h3><a href="/about.html">About</a><a href="/career-services.html">Career Services</a><a href="/contact.html">Contact</a></div>' +
      '<div><h3>Get started</h3><a href="/registration/">Register</a><a href="mailto:admin@testnova.in">admin@testnova.in</a></div>' +
      '</div></div><div class="container footer-bottom"><p>&copy; <span data-year></span> TestNova. All rights reserved.</p></div>';
    var year = footer.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  function buildReaderToc() {
    var shell = document.querySelector('.learning-reader-modern .ai-reader-shell');
    var content = document.querySelector('[data-reader-content]');
    if (!shell || !content) return;
    var old = shell.querySelector('.tn-reader-toc');
    if (old) old.remove();
    var headings = Array.prototype.slice.call(content.querySelectorAll('h2, h3')).filter(function (heading) { return heading.textContent.trim(); });
    if (headings.length < 2) return;
    var toc = document.createElement('aside');
    toc.className = 'tn-reader-toc';
    toc.setAttribute('aria-label', 'On this page');
    toc.innerHTML = '<h2>On this page</h2>';
    headings.slice(0, 12).forEach(function (heading, index) {
      if (!heading.id) heading.id = 'lesson-section-' + index;
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      toc.appendChild(link);
    });
    shell.appendChild(toc);
    if ('IntersectionObserver' in window) {
      var links = toc.querySelectorAll('a');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) { link.classList.toggle('is-active', link.hash === '#' + entry.target.id); });
        });
      }, { rootMargin: '-20% 0px -68% 0px' });
      headings.forEach(function (heading) { observer.observe(heading); });
    }
  }

  applyTheme(preferredTheme());
  function init() {
    initAdminMode();
    initGlobalFooter();
    setTimeout(initGlobalTools, 0);
    buildReaderToc();
    var reader = document.querySelector('[data-reader-content]');
    if (reader && window.MutationObserver) new MutationObserver(function () { window.clearTimeout(reader._tocTimer); reader._tocTimer = window.setTimeout(buildReaderToc, 80); }).observe(reader, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
