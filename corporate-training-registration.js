(function () {
  function initCorporateTrainingForm() {
    var panel = document.querySelector('.corporate-register-panel');
    if (!panel || !window.testNovaLeadForms || typeof window.testNovaLeadForms.render !== 'function') return;
    if (panel.querySelector('[data-corporate-training-form]')) return;

    panel.innerHTML = '';
    window.testNovaLeadForms.render(panel, {
      formType: 'corporate',
      formSource: 'corporate-training-registration',
      sourceButton: 'Dedicated corporate registration page',
      selectedCourse: 'Corporate Training',
      selectedTopic: 'Corporate Training',
      selectedCategory: 'Corporate Training'
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCorporateTrainingForm);
  } else {
    initCorporateTrainingForm();
  }
})();
