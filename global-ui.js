(function () {
  'use strict';

  var SEARCH_ITEMS = [
    ['Playwright', 'Introduction to Playwright', '/playwright-reader.html?topic=playwright-notes-01', 'Getting started'],
    ['Playwright', 'Locators', '/playwright-reader.html?topic=playwright-notes-08', 'Stable element selection'],
    ['Playwright', 'Assertions', '/playwright-reader.html?topic=playwright-notes-19', 'Web-first checks'],
    ['Playwright', 'Browser Context', '/playwright-reader.html?topic=playwright-notes-17', 'Browser isolation'],
    ['JavaScript & TypeScript', 'Arrays', '/js-typescript.html?topic=playwright-js-ts-level-2-working-with-data-arrays', 'Collections and array methods'],
    ['JavaScript & TypeScript', 'Promises', '/js-typescript.html?topic=playwright-js-ts-level-5-asynchronous-javascript-promises', 'Asynchronous workflows'],
    ['QA', 'Selenium', '/selenium.html', 'WebDriver automation tutorial'],
    ['REST Assured', 'API Testing Basics', '/rest.html', 'HTTP, Postman and Java automation'],
    ['REST Assured', 'Automate your first API check', '/rest.html#automate-your-first-api-check', 'Given, when, then and response validation'],
    ['Development', 'Git & GitHub', '/git-github-essentials.html', 'Version control essentials']
  ];

  function icon(path) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"></path></svg>';
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
    var courses = Array.from(document.querySelectorAll('.course-menu-list a')).map(function(link) {
      return ['Courses', link.textContent.replace(/&/g, '&amp;'), link.pathname, 'Open course'];
    });
    var lessonIndex = (window.TestNovaCourseIndex || []).flatMap(function(course) {
      function safe(value) {
        return value.replace(/[&<>"']/g, function(char) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
        });
      }
      return course.lessons.flatMap(function(lesson) {
        var links = [[safe(course.title), safe(lesson.title), safe(lesson.url), 'Lesson']];
        (lesson.sections || []).forEach(function(section, index) {
          var url = new URL(lesson.url, location.origin);
          url.searchParams.set('section', index + 1);
          links.push([safe(course.title), safe(section), safe(url.pathname + url.search + url.hash), safe(lesson.title)]);
        });
        return links;
      });
    });
    var matches = courses.concat(query && lessonIndex.length ? lessonIndex : SEARCH_ITEMS).filter(function (item) { return !query || item.join(' ').toLowerCase().indexOf(query) !== -1; }).slice(0, 60);
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
    tools.innerHTML = '<button class="tn-icon-button tn-search-trigger" type="button" data-search-open aria-label="Search TestNova" title="Search (Ctrl or Cmd + K)">' + icon('m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z') + '</button>';
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
    document.addEventListener('keydown', function (event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
      if (event.key === 'Escape' && dialog.classList.contains('is-open')) closeSearch();
    });
  }

  function initGlobalFooter() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;
    footer.classList.add('tutorial-footer');
    var services = document.body.matches('.learning-page, .tutorial-home') ? '' :
      '<a href="/career-services.html">Career services</a><a href="/corporate-training.html">Corporate training</a><a href="/registration/">Register</a>';
    footer.innerHTML = '<div class="container tutorial-footer-inner">' +
      '<div><a class="brand" href="/">TestNova</a><p>Free, practical tutorials for QA automation, programming and AI.</p></div>' +
      '<nav aria-label="Footer"><a href="/#tutorials">Courses</a><a href="/about.html">About</a><a href="/contact.html">Contact</a>' + services + '</nav>' +
      '<p>&copy; <span data-year></span> TestNova</p></div>';
    var year = footer.querySelector('[data-year]');
    if (year) year.textContent = new Date().getFullYear();
  }

  function ensureReaderLoaded() {
    var content = document.querySelector('[data-reader-content]');
    if (!content || content.querySelector('[data-topic-title]')) return;
    content.innerHTML = '<section class="reader-load-error" role="alert"><p class="reader-kicker">COURSE READER</p><h2>The lesson could not be loaded</h2><p>Refresh the page to try again. If the problem continues, return to the course catalog and reopen the lesson.</p><div class="hero-actions"><button class="primary-btn" type="button" data-reader-retry>Refresh lesson</button><a class="secondary-btn" href="/#tutorials">Browse tutorials</a></div></section>';
    var retry = content.querySelector('[data-reader-retry]');
    if (retry) retry.addEventListener('click', function () { window.location.reload(); });
  }

  function init() {
    if (!document.querySelector('link[rel="manifest"]')) {
      var manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = '/site.webmanifest';
      document.head.appendChild(manifest);
    }
    initAdminMode();
    initGlobalFooter();
    setTimeout(initGlobalTools, 0);
    var reader = document.querySelector('[data-reader-content]');
    if (reader) window.setTimeout(ensureReaderLoaded, 2500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
