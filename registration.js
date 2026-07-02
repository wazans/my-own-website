/**
 * Shared registration handler for TestNova forms.
 *
 * Credentials are intentionally placeholders:
 * - Replace EMAILJS_* values with your EmailJS configuration.
 * - Replace GOOGLE_SHEETS_WEB_APP_URL with a deployed Apps Script endpoint.
 */
(function () {
  var CONFIG = {
    // IMPORTANT: Replace with your actual EmailJS configuration
    EMAILJS_SERVICE_ID: 'service_YOUR_SERVICE_ID', // e.g., 'service_testnova'
    EMAILJS_TEMPLATE_ID: 'template_YOUR_ADMIN_TEMPLATE_ID', // e.g., 'template_registration_admin'
    EMAILJS_CONFIRMATION_TEMPLATE_ID: 'template_YOUR_CONFIRMATION_TEMPLATE_ID', // e.g., 'template_registration_confirmation'
    EMAILJS_PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // e.g., 'YOUR_USER_ID'
    
    // IMPORTANT: Replace with your actual Google Apps Script Web App URL
    GOOGLE_SHEETS_WEB_APP_URL: 'https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec', // e.g., 'https://script.google.com/macros/s/AKfycbz_YOUR_ID_HERE/exec'
    
    THANK_YOU_URL: 'thank-you.html'
  };

  // Map of course interest to placeholder download URLs for free resources
  const DOWNLOAD_MAP = {
    "FREE AI Starter Kit": "https://example.com/downloads/free-ai-starter-kit.zip", // New main CTA download
    "FREE AI Guide": "https://example.com/downloads/free-ai-guide.pdf",
    "FREE Prompt Library": "https://example.com/downloads/free-prompt-library.pdf",
    "FREE Automation Roadmap": "https://example.com/downloads/free-automation-roadmap.pdf",
    "FREE QA Resume Template": "https://example.com/downloads/free-qa-resume-template.pdf",
    "FREE API Cheat Sheet": "https://example.com/downloads/free-api-cheat-sheet.pdf",
    "FREE Mock Interview PDF": "https://example.com/downloads/free-mock-interview.pdf",
    "FREE CI/CD Checklist": "https://example.com/downloads/free-cicd-checklist.pdf",
    "FREE Java Interview Questions": "https://example.com/downloads/free-java-interview-questions.pdf",
    "FREE Playwright Roadmap": "https://example.com/downloads/free-playwright-roadmap.pdf",
    "FREE AI Toolkit": "https://example.com/downloads/free-ai-toolkit.zip",
    "FREE Java Cheat Sheet": "https://example.com/downloads/free-java-cheat-sheet.pdf",
    "FREE Python Quick Guide": "https://example.com/downloads/free-python-quick-guide.pdf",
    "FREE Web Dev Roadmap": "https://example.com/downloads/free-web-dev-roadmap.pdf"
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
      city: (formData.get('city') || '').toString().trim(),
      experience: (formData.get('experience') || '').toString().trim(),
      company: (formData.get('company') || '').toString().trim(),
      role: (formData.get('role') || '').toString().trim(),
      profession: (formData.get('profession') || '').toString().trim(), // Added profession
      course: (formData.get('course') || '').toString().trim(),
      batch: (formData.get('batch') || '').toString().trim(),
      questions: (formData.get('questions') || '').toString().trim(),
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

    if (!payload.profession || payload.profession.length < 2) { // Added validation for profession
      setFieldError(form, 'profession', 'Enter your profession.');
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
      isPlaceholder(CONFIG.EMAILJS_PUBLIC_KEY)
    ) {
      console.warn("EmailJS service or public key not configured. Skipping email sending.");
      return { skipped: true };
    }

    const emailJsParams = {
      from_name: payload.name,
      from_email: payload.email,
      phone_number: payload.phone,
      city: payload.city,
      experience_level: payload.experience,
      current_company: payload.company,
      current_role: payload.role,
      profession: payload.profession, // Added profession to email params
      interested_course: payload.course,
      preferred_batch: payload.batch,
      questions_goals: payload.questions,
      form_source: payload.form_source,
      consent_given: payload.consent ? 'Yes' : 'No'
    };

    let adminEmailSent = false;
    let confirmationEmailSent = false;

    // Send email to admin
    if (!isPlaceholder(CONFIG.EMAILJS_TEMPLATE_ID)) {
      try {
        const adminResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: CONFIG.EMAILJS_SERVICE_ID,
            template_id: CONFIG.EMAILJS_TEMPLATE_ID, // Admin template
            user_id: CONFIG.EMAILJS_PUBLIC_KEY,
            template_params: emailJsParams
          })
        });
        if (!adminResponse.ok) {
          const errorText = await adminResponse.text();
          console.error('EmailJS admin email failed:', errorText);
        } else {
          adminEmailSent = true;
        }
      } catch (e) {
        console.error('Error sending EmailJS admin email:', e);
      }
    } else {
      console.warn("EmailJS admin template ID not configured. Skipping admin email.");
    }

    // Send confirmation email to student
    if (!isPlaceholder(CONFIG.EMAILJS_CONFIRMATION_TEMPLATE_ID)) {
      try {
        // Add recipient_email to params for the confirmation template
        const confirmationParams = { ...emailJsParams, recipient_email: payload.email };
        const confirmationResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: CONFIG.EMAILJS_SERVICE_ID,
            template_id: CONFIG.EMAILJS_CONFIRMATION_TEMPLATE_ID, // Confirmation template
            user_id: CONFIG.EMAILJS_PUBLIC_KEY,
            template_params: confirmationParams
          })
        });
        if (!confirmationResponse.ok) {
          const errorText = await confirmationResponse.text();
          console.error('EmailJS confirmation email failed:', errorText);
        } else {
          confirmationEmailSent = true;
        }
      } catch (e) {
        console.error('Error sending EmailJS confirmation email:', e);
      }
    } else {
      console.warn("EmailJS confirmation template ID not configured. Skipping confirmation email.");
    }

    if (!adminEmailSent && !confirmationEmailSent) {
      if (!isPlaceholder(CONFIG.EMAILJS_TEMPLATE_ID) || !isPlaceholder(CONFIG.EMAILJS_CONFIRMATION_TEMPLATE_ID)) {
        throw new Error('Email sending failed for all configured templates.');
      }
      return { skipped: true };
    }
    return { skipped: false };
  }

  async function sendToGoogleSheets(payload) {
    if (isPlaceholder(CONFIG.GOOGLE_SHEETS_WEB_APP_URL)) {
      console.warn("Google Sheets Web App URL is not configured. Skipping Google Sheets sync.");
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
      const errorText = await response.text();
      throw new Error('Google Sheets sync failed: ' + errorText);
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
      // Attempt to send via EmailJS
      const emailJsResult = await sendViaEmailJS(payload);
      if (!emailJsResult.skipped) {
        configuredTargets++;
        successTargets++; // Assume success if no error was thrown
      }

      // Attempt to send to Google Sheets
      const googleSheetsResult = await sendToGoogleSheets(payload);
      if (!googleSheetsResult.skipped) {
        configuredTargets++;
        successTargets++; // Assume success if no error was thrown
      }

      if (configuredTargets === 0) {
        // If no external services were configured, still store locally
        storeSubmission(payload, 'demo_local_only');
      } else if (successTargets > 0) {
        // If at least one external service succeeded
        storeSubmission(payload, 'live_external_success');
      } else {
        // If external services were configured but all failed
        throw new Error(errors.length > 0 ? errors.join(', ') : 'Submission could not be completed via external services.');
      }

      // --- Handle Free Downloads vs. General Registrations ---
      const downloadUrl = DOWNLOAD_MAP[payload.course];
      if (downloadUrl) {
        // It's a free download request
        setMessage(form, 'success', 'Thank you! Your download will start shortly.');
        form.reset();
        if (typeof window.closeRegistrationModal === 'function') {
          window.closeRegistrationModal();
        }
        window.open(downloadUrl, '_blank'); // Trigger download
        setLoadingState(form, false); // Ensure button is re-enabled
      } else if (payload.form_source === 'newsletter-signup') {
        // It's a newsletter signup
        setMessage(form, 'success', 'Thank you for subscribing to our newsletter!');
        form.reset();
        if (typeof window.closeRegistrationModal === 'function') {
          window.closeRegistrationModal();
        }
        setLoadingState(form, false); // Ensure button is re-enabled
      } else {
        // General registration, redirect to thank-you page
        setMessage(form, 'success', 'Registration submitted. Redirecting...');
        form.reset();
        if (typeof window.closeRegistrationModal === 'function') {
          window.closeRegistrationModal();
        }
        window.setTimeout(redirectToThankYou, 700);
      }
    } catch (error) {
      setMessage(form, 'error', error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoadingState(form, false);
    }
  }

  // Expose initRegistrationForm globally for site.js to call
  window.initRegistrationForm = function() {
    var forms = document.querySelectorAll('[data-registration-form]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      // Remove any existing listeners to prevent duplicates if called multiple times
      form.removeEventListener('submit', handleSubmit);
      form.addEventListener('submit', handleSubmit);
    });
  };

  // Initial binding for forms present on page load (e.g., register.html)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initRegistrationForm);
  } else {
    window.initRegistrationForm();
  }
})();