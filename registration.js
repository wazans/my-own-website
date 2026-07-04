/**
 * TestNova contextual lead forms.
 * Uses FormSubmit's static-site endpoint so every submission emails admin@testnova.in.
 */
(function () {
  var ADMIN_EMAIL = 'admin@testnova.in';
  var FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/' + ADMIN_EMAIL;
  var THANK_YOU_TEXT = 'Thank you for your interest.\nOur team will contact you soon.';
  var FREE_KIT_TEXT = 'Thank you for your interest.\nYour Free AI Kit access request has been sent.';

  var COURSE_CATEGORY_MAP = {
    'Selenium Basics': 'QA Engineering',
    'Playwright with TypeScript': 'QA Engineering',
    'API Basics': 'QA Engineering',
    'REST Assured': 'QA Engineering',
    'Cucumber BDD': 'QA Engineering',
    'Cucumber Basics': 'QA Engineering',
    'UI Hybrid Framework': 'QA Engineering',
    'Jenkins Automation': 'QA Engineering',
    'Master Doc Notes (Java)': 'QA Engineering',
    'Java Programming': 'Development Technologies',
    'Python for Automation': 'Development Technologies',
    'JavaScript & Frontend': 'Development Technologies',
    'TypeScript Deep Dive': 'Development Technologies',
    'DevOps Fundamentals': 'Development Technologies',
    'Cloud Platforms': 'Development Technologies',
    'SQL & Database Management': 'Development Technologies',
    'Git & GitHub Essentials': 'Development Technologies',
    'AI for Beginners': 'AI & Emerging Technologies',
    'Prompt Engineering': 'AI & Emerging Technologies',
    'AI Agents & Automation': 'AI & Emerging Technologies',
    'Machine Learning Fundamentals': 'AI & Emerging Technologies',
    'Blockchain & Web3 Basics': 'AI & Emerging Technologies',
    'IoT Essentials': 'AI & Emerging Technologies'
  };

  var FORM_DEFS = {
    register: {
      title: 'Register Your Interest',
      subject: 'New TestNova Lead - Register Your Interest',
      cta: 'Register Your Interest',
      fields: [
        field('Full Name', 'full_name', 'text', true, 'Your full name'),
        field('Email Address', 'email', 'email', true, 'you@example.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Current Role', 'current_role', 'text', true, 'Student, QA Engineer, Developer...'),
        selectField('Experience Level', 'experience_level', true, ['Fresher', '0 - 2 years', '2 - 5 years', '5+ years']),
        selectField('Interested Category', 'interested_category', true, ['QA Engineering', 'Development Technologies', 'AI & Emerging Technologies', 'Career Services', 'Corporate Training']),
        selectField('Preferred Contact Method', 'preferred_contact_method', true, ['Phone', 'WhatsApp', 'Email']),
        textareaField('Message', 'message', false, 'Tell us what you want to learn or discuss.')
      ]
    },
    learning: {
      title: 'Learning Hub Access',
      subject: 'New TestNova Lead - Learning Hub Access',
      cta: 'Get Access',
      fields: [
        field('Full Name', 'full_name', 'text', true, 'Your full name'),
        field('Email', 'email', 'email', true, 'you@example.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Current Role', 'current_role', 'text', true, 'Student, QA Engineer, Developer...'),
        selectField('Experience Level', 'experience_level', true, ['Fresher', '0 - 2 years', '2 - 5 years', '5+ years']),
        selectField('Interested Track', 'interested_track', true, ['QA Engineering', 'Development Technologies', 'AI & Emerging Technologies']),
        hiddenField('Selected Course / Topic', 'selected_course_topic'),
        consentField('I consent to TestNova contacting me about learning access, cohorts, and course updates.')
      ]
    },
    free_ai_kit: {
      title: 'Free AI Kit',
      subject: 'New TestNova Lead - Free AI Kit',
      cta: 'Download Free AI Kit',
      success: FREE_KIT_TEXT,
      fields: [
        field('Full Name', 'full_name', 'text', true, 'Your full name'),
        field('Email Address', 'email', 'email', true, 'you@example.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Current Role', 'current_role', 'text', true, 'Student, QA Engineer, Business Owner...'),
        selectField('Interested In', 'interested_in', true, ['AI for Beginners', 'AI for Students', 'AI for Professionals', 'AI for QA', 'AI for Business']),
        consentField('I consent to TestNova contacting me about AI resources and learning updates.')
      ]
    },
    career: {
      title: 'Career Services',
      subject: 'New TestNova Lead - Career Services',
      cta: 'Book Consultation',
      fields: [
        field('Full Name', 'full_name', 'text', true, 'Your full name'),
        field('Email Address', 'email', 'email', true, 'you@example.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Current Role', 'current_role', 'text', true, 'Your current role'),
        field('Years of Experience', 'years_of_experience', 'text', true, 'e.g., 3 years'),
        selectField('Service Required', 'service_required', true, ['Resume Review', 'LinkedIn Optimization', 'Mock Interview', 'Career Guidance', 'Job Assistance']),
        field('Target Role', 'target_role', 'text', true, 'QA Automation Engineer, SDET...'),
        textareaField('Message', 'message', false, 'Share your career goal or current challenge.')
      ]
    },
    corporate: {
      title: 'Corporate Training',
      subject: 'New TestNova Lead - Corporate Training',
      cta: 'Request Corporate Training',
      fields: [
        field('Company Name', 'company_name', 'text', true, 'Company name'),
        field('Contact Person Name', 'contact_person_name', 'text', true, 'Your name'),
        field('Work Email', 'work_email', 'email', true, 'name@company.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Company Website', 'company_website', 'url', false, 'https://company.com'),
        field('Team Size', 'team_size', 'number', true, '25'),
        selectField('Training Category', 'training_category', true, ['QA Engineering', 'Development Technologies', 'AI & Emerging Technologies']),
        field('Preferred Course', 'preferred_course', 'text', false, 'Course or topic'),
        selectField('Training Mode', 'training_mode', true, ['Online', 'Offline', 'Hybrid']),
        field('Preferred Date', 'preferred_date', 'date', false, ''),
        field('Location', 'location', 'text', false, 'City or office location'),
        textareaField('Requirements', 'requirements', true, 'Tell us about your team goals and requirements.')
      ]
    },
    contact: {
      title: 'Contact TestNova',
      subject: 'New TestNova Lead - Contact',
      cta: 'Send Message',
      fields: [
        field('Full Name', 'full_name', 'text', true, 'Your full name'),
        field('Email Address', 'email', 'email', true, 'you@example.com'),
        field('Phone Number', 'phone', 'tel', true, '+91 98765 43210'),
        field('Subject', 'subject', 'text', true, 'How can we help?'),
        selectField('Enquiry Type', 'enquiry_type', true, ['Course Enquiry', 'Career Services', 'Corporate Training', 'Partnership', 'Support', 'Other']),
        textareaField('Message', 'message', true, 'Write your message.')
      ]
    }
  };

  function field(label, name, type, required, placeholder) {
    return { kind: 'input', label: label, name: name, type: type, required: required, placeholder: placeholder || '' };
  }

  function selectField(label, name, required, options) {
    return { kind: 'select', label: label, name: name, required: required, options: options };
  }

  function textareaField(label, name, required, placeholder) {
    return { kind: 'textarea', label: label, name: name, required: required, placeholder: placeholder || '' };
  }

  function hiddenField(label, name) {
    return { kind: 'hidden', label: label, name: name, required: false };
  }

  function consentField(label) {
    return { kind: 'consent', label: label, name: 'consent', required: true };
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function pageTitle() {
    var h1 = document.querySelector('h1');
    return h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : document.title;
  }

  function inferCategory(value, fallback) {
    if (fallback) return fallback;
    return COURSE_CATEGORY_MAP[value] || '';
  }

  function buildTracking(context, def) {
    var selected = context.selectedCourse || context.courseInterest || '';
    return {
      source_page: window.location.pathname.split('/').pop() || 'index.html',
      source_button: context.sourceButton || '',
      selected_category: context.selectedCategory || inferCategory(selected, ''),
      selected_course: context.selectedCourse || selected,
      selected_topic: context.selectedTopic || selected,
      utm_source: getQueryParam('utm_source'),
      utm_medium: getQueryParam('utm_medium'),
      utm_campaign: getQueryParam('utm_campaign'),
      utm_content: getQueryParam('utm_content'),
      timestamp: new Date().toISOString(),
      form_type: def.title,
      form_source: context.formSource || 'website'
    };
  }

  function hiddenInputs(tracking, def) {
    var inputs = [
      ['_subject', def.subject],
      ['_template', 'table'],
      ['_captcha', 'false']
    ];

    Object.keys(tracking).forEach(function (key) {
      inputs.push([key, tracking[key]]);
    });

    return inputs.map(function (pair) {
      return '<input type="hidden" name="' + escapeHtml(pair[0]) + '" value="' + escapeHtml(pair[1]) + '" />';
    }).join('');
  }

  function defaultValue(name, context) {
    var selected = context.selectedCourse || context.courseInterest || '';
    var category = context.selectedCategory || inferCategory(selected, '');
    var service = context.serviceRequired || context.courseInterest || '';
    var values = {
      interested_category: category || context.courseInterest || '',
      interested_track: category || '',
      selected_course_topic: selected || pageTitle(),
      service_required: service,
      preferred_course: selected,
      training_category: category === 'Corporate Training' ? '' : category,
      subject: context.sourceButton || pageTitle(),
      enquiry_type: context.enquiryType || ''
    };
    return values[name] || '';
  }

  function renderField(item, context, index) {
    var id = 'tn-lead-' + item.name + '-' + index;
    var required = item.required ? ' required' : '';
    var requiredMark = item.required ? ' *' : '';
    var value = defaultValue(item.name, context);

    if (item.kind === 'consent') {
      return '<label class="consent-row"><input type="checkbox" name="' + item.name + '" value="Yes"' + required + ' /><span>' + escapeHtml(item.label) + '</span></label><small class="field-error" data-error-for="' + item.name + '"></small>';
    }

    if (item.kind === 'hidden') {
      return '<input type="hidden" name="' + escapeHtml(item.name) + '" value="' + escapeHtml(value) + '" />';
    }

    if (item.kind === 'select') {
      return [
        '<div class="form-field">',
        '<label for="' + id + '">' + escapeHtml(item.label + requiredMark) + '</label>',
        '<select id="' + id + '" name="' + escapeHtml(item.name) + '"' + required + '>',
        '<option value="">Select</option>',
        item.options.map(function (option) {
          return '<option' + (option === value ? ' selected' : '') + '>' + escapeHtml(option) + '</option>';
        }).join(''),
        '</select>',
        '<small class="field-error" data-error-for="' + item.name + '"></small>',
        '</div>'
      ].join('');
    }

    if (item.kind === 'textarea') {
      return '<div class="form-field full"><label for="' + id + '">' + escapeHtml(item.label + requiredMark) + '</label><textarea id="' + id + '" name="' + escapeHtml(item.name) + '" rows="4" placeholder="' + escapeHtml(item.placeholder) + '"' + required + '>' + escapeHtml(value) + '</textarea><small class="field-error" data-error-for="' + item.name + '"></small></div>';
    }

    return '<div class="form-field"><label for="' + id + '">' + escapeHtml(item.label + requiredMark) + '</label><input id="' + id + '" name="' + escapeHtml(item.name) + '" type="' + escapeHtml(item.type) + '" placeholder="' + escapeHtml(item.placeholder) + '" value="' + escapeHtml(value) + '"' + required + ' /><small class="field-error" data-error-for="' + item.name + '"></small></div>';
  }

  function renderRows(fields, context) {
    var html = '';
    var row = [];
    fields.forEach(function (item, index) {
      var rendered = renderField(item, context, index);
      if (item.kind === 'hidden') {
        html += rendered;
        return;
      }

      if (item.kind === 'consent' || item.kind === 'textarea') {
        if (row.length) {
          html += '<div class="form-row">' + row.join('') + '</div>';
          row = [];
        }
        html += item.kind === 'consent' ? rendered : '<div class="form-row">' + rendered + '</div>';
        return;
      }
      row.push(rendered);
      if (row.length === 2) {
        html += '<div class="form-row">' + row.join('') + '</div>';
        row = [];
      }
    });
    if (row.length) html += '<div class="form-row">' + row.join('') + '</div>';
    return html;
  }

  function renderLeadForm(container, context) {
    var formType = context.formType || 'register';
    var def = FORM_DEFS[formType] || FORM_DEFS.register;
    var tracking = buildTracking(context, def);

    container.innerHTML = [
      '<form class="lead-form access-form contextual-lead-form" data-registration-form data-form-type="' + escapeHtml(formType) + '" novalidate>',
      hiddenInputs(tracking, def),
      renderRows(def.fields, context),
      '<button class="form-submit" type="submit"><span>' + escapeHtml(def.cta) + '</span></button>',
      '<div class="form-message" role="status" aria-live="polite"></div>',
      '</form>'
    ].join('');

    initRegistrationForm(container);
    return def;
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
    form.querySelectorAll('.field-error').forEach(function (node) {
      node.textContent = '';
    });
  }

  function fieldLabel(field) {
    var label = field.closest('.form-field') ? field.closest('.form-field').querySelector('label') : null;
    return label ? label.textContent.replace('*', '').trim() : 'This field';
  }

  function validate(form) {
    clearErrors(form);
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var value = field.type === 'checkbox' ? field.checked : String(field.value || '').trim();
      if (!value) {
        setFieldError(form, field.name, field.type === 'checkbox' ? 'Please confirm consent.' : fieldLabel(field) + ' is required.');
        valid = false;
        return;
      }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        setFieldError(form, field.name, 'Enter a valid email address.');
        valid = false;
      }
      if (field.type === 'tel' && field.value.replace(/[^\d]/g, '').length < 7) {
        setFieldError(form, field.name, 'Enter a valid phone number.');
        valid = false;
      }
    });
    return valid;
  }

  function setLoading(form, loading) {
    var button = form.querySelector('.form-submit');
    if (!button) return;
    if (loading) {
      button.disabled = true;
      button.dataset.originalLabel = button.textContent;
      button.textContent = 'Submitting...';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || button.textContent || 'Submit';
    }
  }

  function formToObject(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });
    return data;
  }

  function grantLearningAccess(form) {
    if (form.dataset.formType !== 'learning') return;
    sessionStorage.setItem('testnova-learning-access', 'granted');
    sessionStorage.setItem('testnova-learning-access-at', new Date().toISOString());
  }

  function continueToSelectedContent() {
    var targetUrl = sessionStorage.getItem('testnova-pending-access-url') || window.testnovaPendingAccessUrl || '';
    sessionStorage.removeItem('testnova-pending-access-url');
    window.testnovaPendingAccessUrl = '';
    if (targetUrl) {
      window.location.href = targetUrl;
    } else if (document.body.classList.contains('content-locked')) {
      window.location.reload();
    }
  }

  function showSuccess(form) {
    var formType = form.dataset.formType || 'register';
    var def = FORM_DEFS[formType] || FORM_DEFS.register;
    var message = def.success || THANK_YOU_TEXT;
    form.innerHTML = '<div class="lead-success" tabindex="-1"><h3>' + escapeHtml(message.split('\n')[0]) + '</h3><p>' + escapeHtml(message.split('\n').slice(1).join(' ')) + '</p></div>';
    var success = form.querySelector('.lead-success');
    if (success) success.focus();
    if (formType === 'learning') window.setTimeout(continueToSelectedContent, 1100);
  }

  async function submitForm(event) {
    event.preventDefault();
    var form = event.currentTarget;
    setMessage(form, '', '');
    if (!validate(form)) return;
    setLoading(form, true);

    try {
      var payload = formToObject(form);
      if ((form.dataset.formType || '') === 'learning') {
        payload.submission_mode = 'local_learning_access';
        sessionStorage.setItem('testnova-last-lead', JSON.stringify(payload));
        grantLearningAccess(form);
        showSuccess(form);
        return;
      }

      var response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Submission failed. Please try again.');

      sessionStorage.setItem('testnova-last-lead', JSON.stringify(payload));
      grantLearningAccess(form);
      showSuccess(form);
    } catch (error) {
      if ((form.dataset.formType || '') === 'learning') {
        var fallbackPayload = formToObject(form);
        fallbackPayload.submission_mode = 'local_learning_access_fallback';
        sessionStorage.setItem('testnova-last-lead', JSON.stringify(fallbackPayload));
        grantLearningAccess(form);
        showSuccess(form);
        return;
      }

      setMessage(form, 'error', error.message || 'Something went wrong. Please try again.');
      setLoading(form, false);
    }
  }

  function initRegistrationForm(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-registration-form]').forEach(function (form) {
      if (!form.classList.contains('contextual-lead-form') && !form.querySelector('input[name="_subject"]')) {
        var host = form.parentElement;
        if (host && !host.dataset.formUpgraded) {
          host.dataset.formUpgraded = 'true';
          renderLeadForm(host, {
            formType: form.dataset.formType || 'register',
            formSource: 'legacy-form',
            sourceButton: 'Dedicated form',
            selectedCourse: pageTitle(),
            selectedTopic: pageTitle(),
            selectedCategory: inferCategory(pageTitle(), '')
          });
        }
        return;
      }

      form.removeEventListener('submit', submitForm);
      form.addEventListener('submit', submitForm);
    });
  }

  window.testNovaLeadForms = {
    render: renderLeadForm,
    definitions: FORM_DEFS
  };
  window.initRegistrationForm = initRegistrationForm;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initRegistrationForm(document); });
  } else {
    initRegistrationForm(document);
  }
})();
