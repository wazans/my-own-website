/**
 * Shared registration handler for TestNova forms.
 *
 * Credentials are intentionally placeholders:
 * - Replace EMAILJS_* values with your EmailJS configuration.
 * - Replace GOOGLE_SHEETS_WEB_APP_URL with a deployed Apps Script endpoint.
 */
(function () {
  var CONFIG = {
    EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
    EMAILJS_TEMPLATE_ID: 'YOUR_EMAILJS_TEMPLATE_ID',
    EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
    GOOGLE_SHEETS_WEB_APP_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL',
    THANK_YOU_URL: 'thank-you.html'
  };

  function isPlaceholder(value) {
    return !value || /^YOUR_/i.test(value);
  }

  function collectPayload(form) {
    var formData = new FormData(form);
    return {
      name: (formData.get('name') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim(),
      role: (formData.get('role') || '').toString().trim(),
      experience: (formData.get('experience') || '').toString().trim(),
      plan: (formData.get('plan') || '').toString().trim(),
      goals: (formData.get('goals') || '').toString().trim(),
      consent: formData.get('consent') === 'on',
      form_source: (formData.get('form_source') || '').toString().trim()
    };
  }

  function setFieldError(form, field, message) {
    var node = form.querySelector('[data-error-for="' + field + '"]');
    if (node) node.textContent = message || '';
  }

  function clearErrors(form) {
    var errors = form.querySelectorAll('.field-error');
    errors.forEach(function (error) {
      error.textContent = '';
    });
  }

  function validatePayload(form, payload) {
    clearErrors(form);

    var valid = true;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneDigits = payload.phone.replace(/[^\d]/g, '');

    if (!payload.name || payload.name.length < 2) {
      setFieldError(form, 'name', 'Enter your full name.');
      valid = false;
    }

    if (!payload.email || !emailPattern.test(payload.email)) {
      setFieldError(form, 'email', 'Enter a valid email address.');
      valid = false;
    }

    if (!payload.phone || phoneDigits.length < 7) {
      setFieldError(form, 'phone', 'Enter a valid phone number.');
      valid = false;
    }

    if (!payload.role) {
      setFieldError(form, 'role', 'Select your primary role.');
      valid = false;
    }

    if (!payload.consent) {
      setFieldError(form, 'consent', 'You must agree before submitting.');
      valid = false;
    }

    return valid;
  }

  async function sendViaEmailJS(payload) {
    if (
      isPlaceholder(CONFIG.EMAILJS_SERVICE_ID) ||
      isPlaceholder(CONFIG.EMAILJS_TEMPLATE_ID) ||
      isPlaceholder(CONFIG.EMAILJS_PUBLIC_KEY)
    ) {
      return { skipped: true };
    }

    var response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: CONFIG.EMAILJS_SERVICE_ID,
        template_id: CONFIG.EMAILJS_TEMPLATE_ID,
        user_id: CONFIG.EMAILJS_PUBLIC_KEY,
        template_params: payload
      })
    });

    if (!response.ok) {
      throw new Error('EmailJS submission failed.');
    }

    return { skipped: false };
  }

  async function sendToGoogleSheets(payload) {
    if (isPlaceholder(CONFIG.GOOGLE_SHEETS_WEB_APP_URL)) {
      return { skipped: true };
    }

    var response = await fetch(CONFIG.GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Google Sheets sync failed.');
    }

    return { skipped: false };
  }

  function storeSubmission(payload, mode) {
    var record = Object.assign({}, payload, {
      submitted_at: new Date().toISOString(),
      submission_mode: mode
    });
    sessionStorage.setItem('testnova-last-registration', JSON.stringify(record));
  }

  function redirectToThankYou() {
    window.location.href = CONFIG.THANK_YOU_URL;
  }

  function setMessage(form, type, message) {
    var box = form.querySelector('.form-message');
    if (!box) return;

    box.className = 'form-message ' + type;
    box.textContent = message;
  }

  function setLoadingState(form, isLoading) {
    var button = form.querySelector('.form-submit');
    if (!button) return;

    if (isLoading) {
      button.disabled = true;
      button.dataset.originalLabel = button.textContent;
      button.textContent = 'Submitting...';
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalLabel || 'Submit Registration';
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var payload = collectPayload(form);
    var configuredTargets = 0;
    var successTargets = 0;
    var errors = [];

    setMessage(form, '', '');
    if (!validatePayload(form, payload)) return;

    setLoadingState(form, true);

    try {
      if (
        !isPlaceholder(CONFIG.EMAILJS_SERVICE_ID) &&
        !isPlaceholder(CONFIG.EMAILJS_TEMPLATE_ID) &&
        !isPlaceholder(CONFIG.EMAILJS_PUBLIC_KEY)
      ) {
        configuredTargets++;
        try {
          await sendViaEmailJS(payload);
          successTargets++;
        } catch (error) {
          errors.push(error.message || 'EmailJS submission failed.');
        }
      }

      if (!isPlaceholder(CONFIG.GOOGLE_SHEETS_WEB_APP_URL)) {
        configuredTargets++;
        try {
          await sendToGoogleSheets(payload);
          successTargets++;
        } catch (error) {
          errors.push(error.message || 'Google Sheets sync failed.');
        }
      }

      if (configuredTargets === 0) {
        storeSubmission(payload, 'demo');
      } else if (successTargets > 0) {
        storeSubmission(payload, 'live');
      } else {
        throw new Error(errors[0] || 'Submission could not be completed.');
      }

      setMessage(form, 'success', 'Registration submitted. Redirecting...');
      form.reset();
      window.setTimeout(redirectToThankYou, 700);
    } catch (error) {
      setMessage(form, 'error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoadingState(form, false);
    }
  }

  function bindForms() {
    var forms = document.querySelectorAll('[data-registration-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener('submit', handleSubmit);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindForms);
  } else {
    bindForms();
  }
})();
