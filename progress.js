/**
 * Generic progress tracker.
 *
 * How to enable on a page:
 *   1. Add to <body> (or any ancestor): data-progress-key="qa-hub-<page>-progress-v1"
 *   2. Mark each section you want tracked. Two ways:
 *        (a) <section class="progress-item" id="some-id"> ... </section>
 *            The script auto-injects a "Mark as done" checkbox at the top.
 *        (b) Manually place this anywhere inside a .progress-item:
 *            <label class="progress-tag"><input type="checkbox" data-progress-id="..."> Mark as done</label>
 *   3. Drop this badge somewhere visible (typically top of the sidebar):
 *        <div class="progress-badge" id="progress-badge">
 *          <span id="progress-text">0 / 0 · 0%</span>
 *          <span class="bar"><i id="progress-fill"></i></span>
 *        </div>
 *   4. Include this script:
 *        <script src="progress.js"></script>
 */
(function () {
  function init() {
    var keyHolder = document.querySelector('[data-progress-key]') || document.body;
    var KEY = keyHolder.getAttribute('data-progress-key');
    if (!KEY) return; // page hasn't opted in

    var items = Array.prototype.slice.call(document.querySelectorAll('.progress-item'));
    if (!items.length) return;

    // Auto-inject a "Mark as done" tag for any progress-item that doesn't already have one
    items.forEach(function (sec) {
      if (sec.querySelector('.progress-tag')) return;
      var id = sec.id || sec.getAttribute('data-progress-id');
      if (!id) return;
      var label = document.createElement('label');
      label.className = 'progress-tag';
      label.innerHTML =
        '<input type="checkbox" data-progress-id="' + id + '"> Mark as done';

      // Place the pill right after the section's heading (h1-h4) so it's
      // unambiguously associated with the topic above it. Fall back to the
      // top of the block if no heading is present.
      var heading = sec.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4');
      if (heading) {
        heading.insertAdjacentElement('afterend', label);
        return;
      }
      var firstChild = sec.firstElementChild;
      if (firstChild && firstChild.classList.contains('part-banner')) {
        firstChild.insertAdjacentElement('afterend', label);
      } else {
        sec.insertBefore(label, sec.firstChild);
      }
    });

    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }

    function render() {
      var total = items.length;
      var done = 0;
      items.forEach(function (sec) {
        var cb = sec.querySelector('input[type="checkbox"][data-progress-id]');
        if (!cb) return;
        var id = cb.getAttribute('data-progress-id');
        var tag = sec.querySelector('.progress-tag');
        var isDone = !!saved[id];
        cb.checked = isDone;
        if (tag) tag.classList.toggle('done', isDone);
        if (isDone) done++;
      });
      var pct = total === 0 ? 0 : Math.round((done / total) * 100);
      var text = document.getElementById('progress-text');
      var fill = document.getElementById('progress-fill');
      if (text) text.textContent = done + ' / ' + total + ' · ' + pct + '%';
      if (fill) fill.style.width = pct + '%';
    }

    items.forEach(function (sec) {
      var cb = sec.querySelector('input[type="checkbox"][data-progress-id]');
      if (!cb) return;
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-progress-id');
        if (cb.checked) saved[id] = 1; else delete saved[id];
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
