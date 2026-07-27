const recentByIp = new Map();
const recentRegistrations = new Map();
const allowedStatuses = new Set(['Student', 'Fresher', 'Working Professional', 'Career Break', 'Looking for a Job', 'Other']);
const allowedExperience = new Set(['No Experience', 'Less than 1 Year', '1–3 Years', '3–5 Years', '5–8 Years', '8+ Years']);
const allowedAttendance = new Set(['Yes, I will attend', 'Most likely, but I need a reminder', 'I am interested but need more information']);

function clean(value, max = 500) {
  return String(value == null ? '' : value).replace(/[<>{}\u0000-\u001F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function fail(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return fail(res, 405, 'Method not allowed.');
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch (error) {
    return fail(res, 400, 'Invalid request.');
  }
  if (clean(body.company_website, 100)) return res.status(200).json({ ok: true });

  const ip = clean((req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0], 80);
  const now = Date.now();
  if (recentByIp.has(ip) && now - recentByIp.get(ip) < 10000) return fail(res, 429, 'Please wait a few seconds before trying again.');

  const registration = {
    fullName: clean(body.fullName, 100),
    whatsappNumber: clean(body.whatsappNumber, 14).replace(/\s/g, ''),
    emailAddress: clean(body.emailAddress, 160).toLowerCase(),
    currentStatus: clean(body.currentStatus, 40),
    totalExperience: clean(body.totalExperience, 30),
    interests: Array.isArray(body.interests) ? body.interests.map((item) => clean(item, 80)).filter(Boolean).slice(0, 10) : [],
    biggestChallenge: clean(body.biggestChallenge, 1200),
    attendance: clean(body.attendance, 80),
    consent: body.consent === true,
    sourcePageUrl: clean(body.sourcePageUrl, 300)
  };

  if (registration.fullName.length < 3 || !/[A-Za-z\u00C0-\u024F\u0900-\u097F]/.test(registration.fullName)) return fail(res, 400, 'Please enter a valid full name.');
  if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(registration.whatsappNumber)) return fail(res, 400, 'Please enter a valid WhatsApp number.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(registration.emailAddress)) return fail(res, 400, 'Please enter a valid email address.');
  if (!allowedStatuses.has(registration.currentStatus) || !allowedExperience.has(registration.totalExperience)) return fail(res, 400, 'Please check the selected status and experience.');
  if (!allowedAttendance.has(registration.attendance) || !registration.consent) return fail(res, 400, 'Please confirm attendance and consent.');

  const duplicateKey = registration.emailAddress + '|' + registration.whatsappNumber.replace(/^(?:\+?91)/, '');
  if (recentRegistrations.has(duplicateKey) && now - recentRegistrations.get(duplicateKey) < 86400000) {
    return fail(res, 409, 'It looks like you may have already registered.');
  }

  const submittedAt = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'medium'
  }).format(new Date());
  const interests = registration.interests.join(', ') || 'Not specified';
  const sourceUrl = registration.sourcePageUrl || 'https://www.testnova.in/registration/';
  const emailData = new URLSearchParams();
  emailData.append('_subject', `New Webinar Registration – ${registration.fullName} – 15 August 2026`);
  emailData.append('_template', 'table');
  emailData.append('_captcha', 'false');
  emailData.append('_url', sourceUrl);
  emailData.append('_replyto', registration.emailAddress);
  emailData.append('email', registration.emailAddress);
  emailData.append('Full name', registration.fullName);
  emailData.append('WhatsApp number', registration.whatsappNumber);
  emailData.append('Current status', registration.currentStatus);
  emailData.append('Total experience', registration.totalExperience);
  emailData.append('Selected interests', interests);
  emailData.append('Biggest challenge', registration.biggestChallenge || 'Not provided');
  emailData.append('Webinar attendance response', registration.attendance);
  emailData.append('Consent status', 'Agreed');
  emailData.append('Submission date and time', submittedAt);
  emailData.append('Timezone', 'Asia/Kolkata (IST)');
  emailData.append('Source page URL', sourceUrl);

  try {
    const notification = await fetch('https://formsubmit.co/ajax/admin@testnova.in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'https://www.testnova.in',
        Referer: 'https://www.testnova.in/registration/'
      },
      body: emailData
    });
    const notificationResult = await notification.json().catch(() => ({}));
    if (!notification.ok || notificationResult.success === 'false' || notificationResult.success === false) {
      throw new Error('notification failed');
    }

    if (process.env.WEBINAR_STORAGE_WEBHOOK_URL) {
      const stored = await fetch(process.env.WEBINAR_STORAGE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.WEBINAR_STORAGE_WEBHOOK_TOKEN || ''}` },
        body: JSON.stringify({ ...registration, submittedAt, timezone: 'Asia/Kolkata' })
      });
      if (!stored.ok) throw new Error('storage failed');
    }

    recentByIp.set(ip, now);
    recentRegistrations.set(duplicateKey, now);
    return res.status(200).json({ ok: true });
  } catch (error) {
    return fail(res, 502, 'Your registration could not be submitted right now. Please try again or contact TestNova through WhatsApp.');
  }
};
