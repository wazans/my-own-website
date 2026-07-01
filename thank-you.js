/**
 * Populate the thank-you page with the last submitted registration.
 */
(function () {
  function fillSummary() {
    var raw = sessionStorage.getItem('testnova-last-registration');
    if (!raw) return;

    try {
      var payload = JSON.parse(raw);
      var fields = ['name', 'email', 'role', 'plan'];
      fields.forEach(function (field) {
        var node = document.querySelector('[data-summary="' + field + '"]');
        if (!node) return;
        node.textContent = payload[field] || '-';
      });
    } catch (error) {
      // Ignore malformed session state.
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillSummary);
  } else {
    fillSummary();
  }
})();
