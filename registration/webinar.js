(function () {
  'use strict';

  var form = document.getElementById('qa-webinar-form');
  if (!form) return;

  var success = document.getElementById('registration-success');
  var submitButton = form.querySelector('[type="submit"]');
  var messageBox = form.querySelector('.form-message');
  var submitting = false;
  var started = false;
  var whatsappNumber = document.body.getAttribute('data-whatsapp-number') || '';
  var whatsappMessage = 'Hi TestNova, I have registered for the free QA Career Webinar on 15 August 2026 at 3:00 PM. Please share the joining details and reminders.';

  function track(name) {
    if (typeof window.gtag === 'function') window.gtag('event', name);
    else if (window.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name });
  }

  function errorFor(id, text, errorId) {
    var input = document.getElementById(id);
    var error = document.getElementById(errorId || (id + '-error'));
    if (input) input.setAttribute('aria-invalid', text ? 'true' : 'false');
    if (error) error.textContent = text || '';
  }

  function clearErrors() {
    form.querySelectorAll('[aria-invalid]').forEach(function (field) { field.setAttribute('aria-invalid', 'false'); });
    form.querySelectorAll('.field-error').forEach(function (node) { node.textContent = ''; });
    messageBox.textContent = '';
    messageBox.className = 'form-message';
  }

  function validate() {
    clearErrors();
    var valid = true;
    var name = form.elements.fullName.value.replace(/\s+/g, ' ').trim();
    var phone = form.elements.whatsappNumber.value.replace(/\s+/g, '');
    var email = form.elements.emailAddress.value.trim();
    var attendance = form.querySelector('input[name="attendance"]:checked');

    if (name.length < 3 || !/[A-Za-z\u00C0-\u024F\u0900-\u097F]/.test(name) || /^\d+$/.test(name)) {
      errorFor('full-name', 'Please enter a valid full name of at least three characters.');
      valid = false;
    }
    if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(phone)) {
      errorFor('whatsapp-number', 'Please enter a valid WhatsApp number.', 'whatsapp-error');
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errorFor('email-address', 'Please enter a valid email address.', 'email-error');
      valid = false;
    }
    if (!form.elements.currentStatus.value) {
      errorFor('current-status', 'Please select your current status.', 'status-error');
      valid = false;
    }
    if (!form.elements.totalExperience.value) {
      errorFor('total-experience', 'Please select your total experience.', 'experience-error');
      valid = false;
    }
    if (!attendance) {
      document.getElementById('attendance-error').textContent = 'Please select one attendance response.';
      valid = false;
    }
    if (!form.elements.consent.checked) {
      errorFor('consent', 'Please provide consent to receive webinar details.');
      valid = false;
    }
    if (!valid) {
      var first = form.querySelector('[aria-invalid="true"]') || form.querySelector('input[name="attendance"]');
      if (first) first.focus();
    }
    return valid;
  }

  function payload() {
    return {
      fullName: form.elements.fullName.value.replace(/\s+/g, ' ').trim(),
      whatsappNumber: form.elements.whatsappNumber.value.replace(/\s+/g, ''),
      emailAddress: form.elements.emailAddress.value.trim().toLowerCase(),
      currentStatus: form.elements.currentStatus.value,
      totalExperience: form.elements.totalExperience.value,
      interests: Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(function (item) { return item.value; }),
      biggestChallenge: form.elements.biggestChallenge.value.trim(),
      attendance: form.querySelector('input[name="attendance"]:checked').value,
      consent: form.elements.consent.checked,
      company_website: form.elements.company_website.value,
      sourcePageUrl: window.location.href
    };
  }

  function setLoading(value) {
    submitting = value;
    submitButton.disabled = value;
    submitButton.querySelector('span').textContent = value ? 'Submitting your registration…' : 'Register for the Free Webinar 🚀';
  }

  async function submitAdminEmailFallback(data) {
    var submittedAt = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'long',
      timeStyle: 'medium'
    }).format(new Date());
    var emailData = new URLSearchParams();
    emailData.append('_subject', 'New Webinar Registration – ' + data.fullName + ' – 15 August 2026');
    emailData.append('_template', 'table');
    emailData.append('_captcha', 'false');
    emailData.append('_url', data.sourcePageUrl);
    emailData.append('_replyto', data.emailAddress);
    emailData.append('email', data.emailAddress);
    emailData.append('Full name', data.fullName);
    emailData.append('WhatsApp number', data.whatsappNumber);
    emailData.append('Current status', data.currentStatus);
    emailData.append('Total experience', data.totalExperience);
    emailData.append('Selected interests', data.interests.join(', ') || 'Not specified');
    emailData.append('Biggest challenge', data.biggestChallenge || 'Not provided');
    emailData.append('Webinar attendance response', data.attendance);
    emailData.append('Consent status', 'Agreed');
    emailData.append('Submission date and time', submittedAt);
    emailData.append('Timezone', 'Asia/Kolkata (IST)');
    emailData.append('Source page URL', data.sourcePageUrl);

    var response = await fetch('https://formsubmit.co/ajax/admin@testnova.in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: emailData
    });
    var result = await response.json().catch(function () { return {}; });
    if (!response.ok || result.success === false || result.success === 'false') {
      throw new Error('');
    }
  }

  function showFailure(text) {
    messageBox.className = 'form-message error';
    messageBox.textContent = text || 'Your registration could not be submitted right now. Please check your internet connection and try again, or contact TestNova through WhatsApp.';
    track('webinar_registration_failed');
  }

  form.addEventListener('input', function () {
    if (!started) {
      started = true;
      track('webinar_registration_started');
    }
  }, { once: true });

  form.elements.whatsappNumber.addEventListener('input', function () {
    var leadingPlus = this.value.trim().charAt(0) === '+';
    var digits = this.value.replace(/\D/g, '').slice(0, 12);
    this.value = leadingPlus ? '+' + digits : digits;
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (submitting || !validate()) return;

    var lastAttempt = Number(sessionStorage.getItem('testnova-webinar-submit-at') || 0);
    if (Date.now() - lastAttempt < 10000) {
      showFailure('Please wait a few seconds before trying again.');
      return;
    }

    setLoading(true);
    sessionStorage.setItem('testnova-webinar-submit-at', String(Date.now()));
    try {
      var registrationData = payload();
      var response = await fetch('/api/webinar-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(registrationData)
      });
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok) {
        if (response.status === 409) throw new Error('It looks like you may have already registered with this email address or WhatsApp number. Please contact TestNova if you need help.');
        if (response.status >= 500) {
          await submitAdminEmailFallback(registrationData);
        } else {
          throw new Error(result.error || '');
        }
      }
      track('webinar_registration_submitted');
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      showFailure(error.message);
      setLoading(false);
    }
  });

  function calendarFile() {
    var lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TestNova//QA Career Webinar//EN', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT', 'UID:testnova-qa-webinar-20260815@testnova.in',
      'DTSTAMP:20260727T120000Z', 'DTSTART;TZID=Asia/Kolkata:20260815T150000',
      'DTEND;TZID=Asia/Kolkata:20260815T163000', 'SUMMARY:TestNova Free QA Career Webinar',
      'DESCRIPTION:Free QA career\\, automation\\, interview preparation and career-support webinar by TestNova.',
      'LOCATION:Online', 'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var blob = new Blob([lines], { type: 'text/calendar;charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'testnova-free-qa-career-webinar.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
  }

  document.querySelectorAll('[data-webinar-whatsapp]').forEach(function (link) {
    link.href = 'https://api.whatsapp.com/send?phone=' + encodeURIComponent(whatsappNumber) + '&text=' + encodeURIComponent(whatsappMessage);
    link.addEventListener('click', function () { track('webinar_whatsapp_clicked'); });
  });
  document.querySelectorAll('[data-add-calendar]').forEach(function (button) {
    button.addEventListener('click', function () { track('webinar_calendar_clicked'); calendarFile(); });
  });
  track('webinar_registration_page_view');
})();
