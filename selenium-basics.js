(function () {
  var LEVEL_TOPICS = {
    beginner: [
      'architecture', 'locators', 'dropdowns', 'actions', 'screenshots',
      'sel-sec-1', 'sel-sec-2', 'sel-sec-3', 'sel-sec-4', 'sel-sec-5'
    ],
    intermediate: [
      'sync', 'calendar', 'javascript-executor', 'tables',
      'sel-sec-6', 'sel-sec-7', 'sel-sec-8', 'sel-sec-9', 'sel-sec-10',
      'sel-sec-11', 'sel-sec-12', 'sel-sec-13', 'sel-sec-14', 'sel-sec-15',
      'sel-sec-16', 'sel-sec-17'
    ],
    advanced: [
      'shadow-dom', 'advanced-strategy',
      'sel-sec-18', 'sel-sec-19', 'sel-sec-20', 'sel-sec-21', 'sel-sec-22',
      'sel-sec-23', 'sel-sec-24', 'sel-sec-25', 'sel-sec-26', 'sel-sec-27',
      'sel-sec-28', 'sel-sec-29', 'sel-sec-30'
    ]
  };

  function init() {
    if (!document.body.classList.contains('selenium-page')) return;

    var levels = Array.prototype.slice.call(document.querySelectorAll('.selenium-level'));
    var topicToLevel = {};

    Object.keys(LEVEL_TOPICS).forEach(function (levelName) {
      LEVEL_TOPICS[levelName].forEach(function (topicId) {
        topicToLevel[topicId] = levelName;
      });
    });

    function setExpanded(level, expanded) {
      var button = level.querySelector('.selenium-level-toggle');
      var topics = level.querySelector('.selenium-level-topics');
      if (!button || !topics) return;
      button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      topics.hidden = !expanded;
      level.classList.toggle('is-expanded', expanded);
    }

    function expandLevel(levelName) {
      levels.forEach(function (level) {
        setExpanded(level, level.getAttribute('data-selenium-level') === levelName);
      });
    }

    levels.forEach(function (level) {
      var button = level.querySelector('.selenium-level-toggle');
      if (!button) return;
      setExpanded(level, button.getAttribute('aria-expanded') === 'true');
      button.addEventListener('click', function () {
        setExpanded(level, button.getAttribute('aria-expanded') !== 'true');
      });
    });

    var checkboxes = Array.prototype.slice.call(
      document.querySelectorAll('.selenium-page .progress-item input.topic-cb[data-progress-id]')
    );

    checkboxes.forEach(function (checkbox) {
      var topicId = checkbox.getAttribute('data-progress-id');
      var section = document.getElementById(topicId);
      var heading = section && section.querySelector('h2, h3, h4');
      var headingText = heading ? heading.textContent.replace(/^\s*\d+\s*/, '').trim() : topicId;
      checkbox.id = 'selenium-topic-' + topicId + '-completed';
      checkbox.setAttribute('aria-label', 'Mark ' + headingText + ' as completed');
    });

    function updateLevelProgress() {
      Object.keys(LEVEL_TOPICS).forEach(function (levelName) {
        var ids = LEVEL_TOPICS[levelName];
        var completed = ids.reduce(function (count, topicId) {
          var checkbox = document.querySelector(
            '.topic-cb[data-progress-id="' + topicId + '"]'
          );
          return count + (checkbox && checkbox.checked ? 1 : 0);
        }, 0);
        var count = document.querySelector('[data-level-count="' + levelName + '"]');
        if (count) count.textContent = completed + ' of ' + ids.length + ' completed';
      });
    }

    document.addEventListener('change', function (event) {
      if (event.target.matches('.selenium-page .topic-cb[data-progress-id]')) {
        updateLevelProgress();
      }
    });

    document.querySelectorAll('.selenium-level .sidebar-link').forEach(function (link) {
      link.addEventListener('click', function () {
        var level = link.closest('.selenium-level');
        if (level) expandLevel(level.getAttribute('data-selenium-level'));
      });
    });

    var activeObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        var link = mutation.target;
        if (!link.classList.contains('active')) return;
        var topicId = link.getAttribute('href').slice(1);
        if (topicToLevel[topicId]) expandLevel(topicToLevel[topicId]);
      });
    });

    document.querySelectorAll('.selenium-level .sidebar-link').forEach(function (link) {
      activeObserver.observe(link, { attributes: true, attributeFilter: ['class'] });
    });

    var initialTopic = window.location.hash.slice(1) || 'architecture';
    expandLevel(topicToLevel[initialTopic] || 'beginner');
    updateLevelProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
