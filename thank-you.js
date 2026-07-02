/**
 * Populate the thank-you page with the last submitted registration.
 */
(function () {
  function fillSummary() {
    var raw = sessionStorage.getItem('testnova-last-registration');
    if (!raw) return;

    try {
      var payload = JSON.parse(raw);
      // Updated fields to match the comprehensive registration form
      var fields = [
        'name', 'email', 'phone', 'city', 'experience',
        'company', 'role', 'profession', 'course', 'batch', 'questions' // Added 'profession'
      ];
      fields.forEach(function (field) {
        var node = document.querySelector('[data-summary="' + field + '"]');
        if (!node) return;
        node.textContent = payload[field] || '-';
      });
    } catch (error) {
      console.error("Error parsing last registration data from session storage:", error);
      // Optionally, display a generic message or hide the summary section
      var summarySection = document.getElementById('submission-summary');
      if (summarySection) {
        summarySection.innerHTML = '<p>Unable to retrieve submission details.</p>';
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillSummary);
  } else {
    fillSummary();
  }
})();