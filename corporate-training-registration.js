(function () {
  var COURSE_MAP = {
    'QA Engineering': [
      'Selenium Automation',
      'Playwright with TypeScript',
      'API Testing with REST Assured',
      'BDD with Cucumber',
      'Jenkins CI/CD for QA',
      'Hybrid Automation Framework'
    ],
    'Development Technologies': [
      'Java Programming',
      'Python Automation',
      'JavaScript Frontend Development',
      'TypeScript Deep Dive',
      'SQL Database Management',
      'DevOps Fundamentals',
      'Cloud Platforms'
    ],
    'AI & Emerging Technologies': [
      'AI for Beginners',
      'Prompt Engineering',
      'AI Agents & Automation',
      'Machine Learning Fundamentals',
      'Blockchain & Web3 Basics',
      'IoT Essentials'
    ]
  };

  function replaceCourseOptions(courseSelect, category) {
    var courses = COURSE_MAP[category] || [];
    courseSelect.innerHTML = '';

    var placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = courses.length ? 'Select course' : 'Select a category first';
    courseSelect.appendChild(placeholder);

    courses.forEach(function (course) {
      var option = document.createElement('option');
      option.value = course;
      option.textContent = course;
      courseSelect.appendChild(option);
    });

    courseSelect.disabled = courses.length === 0;
  }

  function storeCorporateSubmission(form) {
    var formData = new FormData(form);
    var payload = {
      name: (formData.get('Contact Person') || '').toString(),
      email: (formData.get('Work Email') || '').toString(),
      phone: (formData.get('Phone Number') || '').toString(),
      company: (formData.get('Company Name') || '').toString(),
      course: (formData.get('Preferred Course') || '').toString(),
      questions: (formData.get('Requirements') || '').toString(),
      team_size: (formData.get('Team Size') || '').toString(),
      training_category: (formData.get('Training Category') || '').toString(),
      training_mode: (formData.get('Training Mode') || '').toString(),
      submitted_at: new Date().toISOString(),
      submission_mode: 'corporate_formsubmit_email',
      form_source: 'corporate-training-registration'
    };

    sessionStorage.setItem('testnova-last-registration', JSON.stringify(payload));
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function setHidden(form, name, value) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (input) input.value = value || '';
  }

  function syncTrackingFields(form) {
    var formData = new FormData(form);
    var category = (formData.get('Training Category') || '').toString();
    var course = (formData.get('Preferred Course') || '').toString();

    setHidden(form, 'source_page', 'corporate-training-registration.html');
    setHidden(form, 'source_button', 'Request Corporate Training');
    setHidden(form, 'selected_category', category);
    setHidden(form, 'selected_course', course);
    setHidden(form, 'selected_topic', course);
    setHidden(form, 'utm_source', getQueryParam('utm_source'));
    setHidden(form, 'utm_medium', getQueryParam('utm_medium'));
    setHidden(form, 'utm_campaign', getQueryParam('utm_campaign'));
    setHidden(form, 'utm_content', getQueryParam('utm_content'));
    setHidden(form, 'timestamp', new Date().toISOString());
  }

  function showThankYou(form) {
    var panel = form.closest('.corporate-register-panel');
    var thankYou = panel ? panel.querySelector('[data-corporate-thankyou]') : null;

    form.hidden = true;
    if (thankYou) {
      thankYou.hidden = false;
      thankYou.focus();
    }
  }

  function initCorporateTrainingForm() {
    var form = document.querySelector('[data-corporate-training-form]');
    if (!form) return;

    var categorySelect = form.querySelector('[data-training-category]');
    var courseSelect = form.querySelector('[data-preferred-course]');
    var message = form.querySelector('.form-message');

    if (categorySelect && courseSelect) {
      categorySelect.addEventListener('change', function () {
        replaceCourseOptions(courseSelect, categorySelect.value);
      });
    }

    form.addEventListener('submit', function () {
      if (!form.checkValidity()) return;

      syncTrackingFields(form);
      storeCorporateSubmission(form);
      if (message) {
        message.className = 'form-message success';
        message.textContent = 'Thank you. Sending your details to admin@testnova.in...';
      }

      window.setTimeout(function () {
        showThankYou(form);
      }, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCorporateTrainingForm);
  } else {
    initCorporateTrainingForm();
  }
})();
