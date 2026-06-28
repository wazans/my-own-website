/**
 * Game-style progress tracker (shared across pages).
 *
 * Enable on a page by:
 *   1. data-progress-key="qa-hub-<page>-progress-v1" on <body>
 *   2. Mark each section: <section class="progress-item" id="..."> with an h2/h3 inside
 *   3. Drop the panel into your sidebar:
 *        <div class="progress-panel">
 *          <div class="progress-header">
 *            <span class="level-pill" id="progress-level">Lv 1</span>
 *            <span class="progress-counts" id="progress-counts">0 / 0</span>
 *          </div>
 *          <div class="xp-bar"><i class="xp-fill" id="progress-fill"></i></div>
 *          <div class="xp-meta">
 *            <span id="progress-pct">0%</span>
 *            <span id="progress-next">5 XP to Lv 2</span>
 *          </div>
 *        </div>
 *   4. Include the script:  <script src="progress.js"></script>
 *
 * Level rule: every 5 completed sections = 1 level up.
 */
(function () {
  var XP_PER_LEVEL = 5;

  function init() {
    var keyHolder = document.querySelector('[data-progress-key]') || document.body;
    var KEY = keyHolder.getAttribute('data-progress-key');
    if (!KEY) return;

    var items = Array.prototype.slice.call(document.querySelectorAll('.progress-item'));
    if (!items.length) return;

    // For each progress-item: take its first heading, replace its text content with
    // a "[checkbox] [number] heading-text" layout. The checkbox now sits IN FRONT of the topic.
    items.forEach(function (sec, index) {
      var id = sec.id || sec.getAttribute('data-progress-id');
      if (!id) return;

      // Skip if already transformed
      if (sec.querySelector(':scope > .topic-line, :scope > * > .topic-line')) return;

      var heading = sec.querySelector(':scope > h1, :scope > h2, :scope > h3, :scope > h4');
      if (!heading) return;

      // Save original text (innerHTML for any inline tags like <code>)
      var originalHtml = heading.innerHTML;

      // Build: <label class="topic-line"><input class="topic-cb"><span class="topic-num">N</span><span>original</span></label>
      var label = document.createElement('label');
      label.className = 'topic-line';

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'topic-cb';
      cb.setAttribute('data-progress-id', id);
      label.appendChild(cb);

      var num = document.createElement('span');
      num.className = 'topic-num';
      num.textContent = String(index + 1);
      label.appendChild(num);

      var text = document.createElement('span');
      text.className = 'topic-text';
      text.innerHTML = originalHtml;
      label.appendChild(text);

      // Replace heading content
      heading.innerHTML = '';
      heading.appendChild(label);
    });

    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }

    // Best level reached so far - so level-up toast only fires on new milestones
    var bestLevel = parseInt(saved.__best_level__ || '1', 10);
    if (isNaN(bestLevel) || bestLevel < 1) bestLevel = 1;

    function levelFor(done) {
      return Math.floor(done / XP_PER_LEVEL) + 1;
    }

    function render(skipToast) {
      var total = items.length;
      var done = 0;
      items.forEach(function (sec) {
        var cb = sec.querySelector('input.topic-cb[data-progress-id]');
        if (!cb) return;
        var id = cb.getAttribute('data-progress-id');
        var line = cb.closest('.topic-line');
        var isDone = !!saved[id];
        cb.checked = isDone;
        if (line) line.classList.toggle('done', isDone);
        if (isDone) done++;
      });
      var pct = total === 0 ? 0 : Math.round((done / total) * 100);
      var level = levelFor(done);
      var xpInLevel = done % XP_PER_LEVEL;
      var xpToNext = XP_PER_LEVEL - xpInLevel;
      var fillPct;
      if (done >= total) {
        fillPct = 100;
      } else {
        fillPct = Math.round((xpInLevel / XP_PER_LEVEL) * 100);
      }

      var lvlEl = document.getElementById('progress-level');
      if (lvlEl) lvlEl.textContent = 'Lv ' + level;

      var cntEl = document.getElementById('progress-counts');
      if (cntEl) cntEl.textContent = done + ' / ' + total;

      var fillEl = document.getElementById('progress-fill');
      if (fillEl) fillEl.style.width = fillPct + '%';

      var pctEl = document.getElementById('progress-pct');
      if (pctEl) pctEl.textContent = pct + '%';

      var nextEl = document.getElementById('progress-next');
      if (nextEl) {
        if (done >= total) nextEl.textContent = '🏆 All done!';
        else nextEl.textContent = xpToNext + ' XP to Lv ' + (level + 1);
      }

      // Legacy elements (in case any page kept old IDs)
      var oldText = document.getElementById('progress-text');
      if (oldText) oldText.textContent = done + ' / ' + total + ' · ' + pct + '%';

      // Level up?
      if (!skipToast && level > bestLevel) {
        bestLevel = level;
        saved.__best_level__ = bestLevel;
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
        showLevelToast(level);
        burstConfetti({ heavy: true });
      }
    }

    function showLevelToast(level) {
      var t = document.createElement('div');
      t.className = 'level-toast';
      t.textContent = '🎉 Level Up! You reached Lv ' + level;
      document.body.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('show'); });
      setTimeout(function () {
        t.classList.remove('show');
        setTimeout(function () { t.remove(); }, 350);
      }, 2400);
    }

    // ---- Minimal CSS-only confetti (no external dep, ~3KB) ----
    function burstConfetti(opts) {
      opts = opts || {};
      var count = opts.heavy ? 90 : 36;
      var colors = ['#fbbf24', '#ec4899', '#7c3aed', '#10b981', '#3b82f6', '#ef4444'];
      var box = document.createElement('div');
      box.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
      document.body.appendChild(box);
      for (var i = 0; i < count; i++) {
        var p = document.createElement('span');
        var size = 6 + Math.random() * 8;
        var startX = 50 + (Math.random() * 60 - 30); // start near top center
        var endX = startX + (Math.random() * 80 - 40);
        var fall = 60 + Math.random() * 30;
        var rot = (Math.random() * 720 - 360);
        var dur = 1400 + Math.random() * 1300;
        p.style.cssText = [
          'position:absolute',
          'left:' + startX + '%',
          'top:-5%',
          'width:' + size + 'px',
          'height:' + (size * 0.55) + 'px',
          'background:' + colors[i % colors.length],
          'border-radius:1px',
          'opacity:0.95',
          'transform:rotate(' + (Math.random() * 360) + 'deg)',
          'transition:transform ' + dur + 'ms cubic-bezier(.2,.7,.2,1), top ' + dur + 'ms cubic-bezier(.2,.7,.2,1), opacity ' + dur + 'ms ease',
        ].join(';');
        box.appendChild(p);
        // animate
        (function (el, ex, fy, r) {
          requestAnimationFrame(function () {
            el.style.top = fy + 'vh';
            el.style.left = ex + '%';
            el.style.transform = 'rotate(' + r + 'deg)';
            el.style.opacity = '0';
          });
        })(p, endX, fall, rot);
      }
      setTimeout(function () { box.remove(); }, 2800);
    }

    // wire up checkbox events (delegated for safety)
    items.forEach(function (sec) {
      var cb = sec.querySelector('input.topic-cb[data-progress-id]');
      if (!cb) return;
      cb.addEventListener('click', function (ev) { ev.stopPropagation(); });
      cb.addEventListener('change', function () {
        var id = cb.getAttribute('data-progress-id');
        if (cb.checked) {
          saved[id] = 1;
          burstConfetti();
        } else {
          delete saved[id];
        }
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
        render();
      });
    });

    render(true); // initial render, no toast
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
