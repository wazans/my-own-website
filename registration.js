/**
 * TestNova universal lead form.
 * Uses FormSubmit's static-site AJAX endpoint so submissions email admin@testnova.in.
 */
(function () {
  var ADMIN_EMAIL = 'admin@testnova.in';
  var FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/' + ADMIN_EMAIL;
  var WHATSAPP_URL = 'https://wa.me/919641782691';

  var INTEREST_OPTIONS = [
    'QA Engineering',
    'Development Technologies',
    'AI & Emerging Technologies',
    'Career Guidance',
    'Resume Review',
    'Corporate Training',
    'Free AI Kit',
    'Other'
  ];

  var SUBJECTS = {
    register: 'New TestNova Lead - Register Interest',
    learning: 'New TestNova Lead - Learning Hub Access',
    free_ai_kit: 'New TestNova Lead - Free AI Kit',
    career: 'New TestNova Lead - Career Services',
    corporate: 'New TestNova Lead - Corporate Training',
    contact: 'New TestNova Lead - Contact'
  };

  var TITLES = {
    register: 'Register Interest',
    learning: 'Learning Hub Access',
    free_ai_kit: 'Free AI Kit',
    career: 'Career Services',
    corporate: 'Corporate Training',
    contact: 'Contact TestNova'
  };

  var CTAS = {
    register: 'Submit Request',
    learning: 'Request Access',
    free_ai_kit: 'Get Free AI Kit',
    career: 'Request Career Guidance',
    corporate: 'Request Corporate Training',
    contact: 'Send Message'
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normalizedText(node) {
    return (node && node.textContent ? node.textContent : '').replace(/\s+/g, ' ').trim();
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function currentPageName() {
    return (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function pageTitle() {
    var h1 = document.querySelector('h1');
    return h1 ? normalizedText(h1) : document.title;
  }

  function inferInterest(context) {
    var formType = context.formType || 'register';
    var selected = [
      context.selectedCategory,
      context.courseInterest,
      context.selectedCourse,
      context.selectedTopic,
      context.sourceButton,
      pageTitle()
    ].join(' ').toLowerCase();

    if (formType === 'free_ai_kit' || /free ai kit|starter kit|cheat sheet|guide|roadmap|template/.test(selected)) {
      return 'Free AI Kit';
    }
    if (formType === 'corporate' || /corporate|team training|company/.test(selected)) {
      return 'Corporate Training';
    }
    if (/resume/.test(selected)) return 'Resume Review';
    if (formType === 'career' || /career|mock interview|linkedin|job|consultation/.test(selected)) {
      return 'Career Guidance';
    }
    if (/selenium|playwright|api|rest|cucumber|hybrid|jenkins|qa/.test(selected)) {
      return 'QA Engineering';
    }
    if (/java|python|javascript|typescript|devops|cloud|sql|git|development/.test(selected)) {
      return 'Development Technologies';
    }
    if (/ai|prompt|machine learning|blockchain|web3|iot|emerging/.test(selected)) {
      return 'AI & Emerging Technologies';
    }
    return '';
  }

  function subjectFor(context) {
    return SUBJECTS[context.formType] || SUBJECTS.register;
  }

  function titleFor(context) {
    return TITLES[context.formType] || TITLES.register;
  }

  function ctaFor(context) {
    return CTAS[context.formType] || CTAS.register;
  }

  function buildTracking(context) {
    var selected = context.selectedCourse || context.selectedTopic || context.courseInterest || '';
    return {
      'Source Page': currentPageName(),
      'Source Button': context.sourceButton || 'Register Interest',
      'Selected Course/Topic': selected || pageTitle(),
      'UTM Source': getQueryParam('utm_source'),
      'UTM Medium': getQueryParam('utm_medium'),
      'UTM Campaign': getQueryParam('utm_campaign'),
      'UTM Content': getQueryParam('utm_content'),
      'Timestamp': new Date().toISOString(),
      'Form Context': titleFor(context),
      'Form Source': context.formSource || 'website'
    };
  }

  function hiddenInputs(context) {
    var tracking = buildTracking(context);
    var fields = [
      ['_subject', subjectFor(context)],
      ['_template', 'table'],
      ['_captcha', 'false']
    ];

    Object.keys(tracking).forEach(function(key) {
      fields.push([key, tracking[key]]);
    });

    return fields.map(function(pair) {
      return '<input type="hidden" name="' + escapeHtml(pair[0]) + '" value="' + escapeHtml(pair[1]) + '" />';
    }).join('');
  }

  function renderInterestOptions(selected) {
    return '<option value="">Select an option</option>' + INTEREST_OPTIONS.map(function(option) {
      return '<option value="' + escapeHtml(option) + '"' + (option === selected ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
    }).join('');
  }

  function renderLeadForm(container, rawContext) {
    var context = rawContext || {};
    context.formType = context.formType || 'register';
    var selectedInterest = inferInterest(context);

    container.innerHTML = [
      '<form class="lead-form access-form contextual-lead-form universal-lead-form" data-registration-form data-form-type="' + escapeHtml(context.formType) + '" novalidate>',
      hiddenInputs(context),
      '<div class="form-row">',
      '<div class="form-field">',
      '<label for="tn-full-name">Full Name</label>',
      '<input id="tn-full-name" name="Full Name" type="text" autocomplete="name" placeholder="Your full name" />',
      '<small class="field-error" data-error-for="full_name"></small>',
      '</div>',
      '<div class="form-field">',
      '<label for="tn-phone">Phone Number *</label>',
      '<input id="tn-phone" name="Phone Number" type="tel" inputmode="tel" autocomplete="tel" placeholder="+91 98765 43210" data-lead-field="phone" required />',
      '<small class="field-error" data-error-for="phone"></small>',
      '</div>',
      '</div>',
      '<div class="form-row">',
      '<div class="form-field">',
      '<label for="tn-email">Email Address</label>',
      '<input id="tn-email" name="Email Address" type="email" autocomplete="email" placeholder="you@example.com" data-lead-field="email" />',
      '<small class="field-error" data-error-for="email"></small>',
      '</div>',
      '<div class="form-field">',
      '<label for="tn-interested-in">Interested In *</label>',
      '<select id="tn-interested-in" name="Interested In" data-lead-field="interested" required>',
      renderInterestOptions(selectedInterest),
      '</select>',
      '<small class="field-error" data-error-for="interested"></small>',
      '</div>',
      '</div>',
      '<div class="form-row">',
      '<div class="form-field full">',
      '<label for="tn-message">Message</label>',
      '<textarea id="tn-message" name="Message" rows="4" placeholder="Tell us what you need help with."></textarea>',
      '<small class="field-error" data-error-for="message"></small>',
      '</div>',
      '</div>',
      '<button class="form-submit" type="submit"><span>' + escapeHtml(ctaFor(context)) + '</span></button>',
      '<div class="form-message" role="status" aria-live="polite"></div>',
      '</form>'
    ].join('');

    initRegistrationForm(container);
    return {
      title: titleFor(context),
      subject: subjectFor(context),
      cta: ctaFor(context)
    };
  }

  function setFieldError(form, name, message) {
    var node = form.querySelector('[data-error-for="' + name + '"]');
    if (node) node.textContent = message || '';
  }

  function setMessage(form, type, message) {
    var box = form.querySelector('.form-message');
    if (!box) return;
    box.className = type ? 'form-message ' + type : 'form-message';
    box.textContent = message || '';
  }

  function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach(function(node) {
      node.textContent = '';
    });
  }

  function validate(form) {
    clearErrors(form);
    var valid = true;
    var phone = form.querySelector('[data-lead-field="phone"]');
    var email = form.querySelector('[data-lead-field="email"]');
    var interested = form.querySelector('[data-lead-field="interested"]');

    if (!phone || !phone.value.trim()) {
      setFieldError(form, 'phone', 'Phone Number is required.');
      valid = false;
    } else if (phone.value.replace(/[^\d]/g, '').length < 7) {
      setFieldError(form, 'phone', 'Enter a valid phone number.');
      valid = false;
    }

    if (!interested || !interested.value.trim()) {
      setFieldError(form, 'interested', 'Interested In is required.');
      valid = false;
    }

    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setFieldError(form, 'email', 'Enter a valid email address.');
      valid = false;
    }

    return valid;
  }

  function setLoading(form, loading) {
    var button = form.querySelector('.form-submit');
    if (!button) return;

    if (loading) {
      button.disabled = true;
      button.dataset.originalLabel = normalizedText(button);
      button.textContent = 'Submitting...';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || 'Submit Request';
    }
  }

  function formToObject(form) {
    var data = {};
    new FormData(form).forEach(function(value, key) {
      data[key] = value;
    });
    return data;
  }

  function grantLearningAccess(form) {
    if (form.dataset.formType !== 'learning') return;
    sessionStorage.setItem('testnova-learning-access', 'granted');
    sessionStorage.setItem('testnova-learning-access-at', new Date().toISOString());
  }

  function closeContainingModal(node) {
    var modal = node.closest('.modal');
    if (!modal) return false;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (document.body.classList.contains('content-locked') && sessionStorage.getItem('testnova-learning-access') === 'granted') {
      window.location.reload();
    }

    return true;
  }

  function continueBrowsing(node) {
    closeContainingModal(node);
  }

  function showSuccess(form) {
    form.innerHTML = [
      '<div class="lead-success premium-success" tabindex="-1">',
      '<h3>🎉 Thank you!</h3>',
      '<p>Your request has been received successfully.<br />Our team will contact you shortly.</p>',
      '<div class="success-actions">',
      '<button class="secondary-btn success-continue" type="button">Continue Browsing</button>',
      '<a class="primary-btn" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>',
      '<a class="secondary-btn" href="index.html">Back to Home</a>',
      '</div>',
      '</div>'
    ].join('');

    var success = form.querySelector('.lead-success');
    var continueButton = form.querySelector('.success-continue');

    if (continueButton) {
      continueButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        continueBrowsing(form);
      });
    }

    if (success) success.focus();
  }

  async function submitForm(event) {
    event.preventDefault();
    event.stopPropagation();

    var form = event.currentTarget;
    setMessage(form, '', '');
    if (!validate(form)) return;

    setLoading(form, true);

    try {
      var formData = new FormData(form);
      var response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again.');
      }

      var payload = formToObject(form);
      sessionStorage.setItem('testnova-last-lead', JSON.stringify(payload));
      sessionStorage.setItem('testnova-last-registration', JSON.stringify(payload));
      grantLearningAccess(form);
      showSuccess(form);
    } catch (error) {
      setMessage(form, 'error', error.message || 'Something went wrong. Please try again.');
      setLoading(form, false);
    }
  }

  function containFormEvents(form) {
    if (form.dataset.eventsContained) return;
    form.dataset.eventsContained = 'true';

    [
      'click',
      'mousedown',
      'mouseup',
      'pointerdown',
      'pointerup',
      'touchstart',
      'touchend',
      'input',
      'change',
      'focusin',
      'focusout'
    ].forEach(function(eventName) {
      form.addEventListener(eventName, function(event) {
        event.stopPropagation();
      });
    });

    form.addEventListener('keydown', function(event) {
      if (event.key !== 'Escape') {
        event.stopPropagation();
      }
    });
  }

  function initRegistrationForm(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-registration-form]').forEach(function(form) {
      if (!form.classList.contains('universal-lead-form')) {
        var host = form.parentElement;
        if (host && !host.dataset.formUpgraded) {
          host.dataset.formUpgraded = 'true';
          renderLeadForm(host, {
            formType: form.dataset.formType || 'register',
            formSource: form.querySelector('input[name="form_source"]') ? form.querySelector('input[name="form_source"]').value : 'legacy-form',
            sourceButton: 'Dedicated form',
            selectedCourse: pageTitle(),
            selectedTopic: pageTitle()
          });
        }
        return;
      }

      containFormEvents(form);
      form.removeEventListener('submit', submitForm);
      form.addEventListener('submit', submitForm);
    });
  }

  window.testNovaLeadForms = {
    render: renderLeadForm,
    options: INTEREST_OPTIONS,
    subjects: SUBJECTS
  };
  window.initRegistrationForm = initRegistrationForm;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initRegistrationForm(document);
    });
  } else {
    initRegistrationForm(document);
  }
})();
