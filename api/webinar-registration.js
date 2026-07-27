const recentByIp = new Map();
const recentRegistrations = new Map();
const crypto = require('crypto');
const allowedStatuses = new Set(['Student', 'Fresher', 'Working Professional', 'Career Break', 'Looking for a Job', 'Other']);
const allowedExperience = new Set(['No Experience', 'Less than 1 Year', '1–3 Years', '3–5 Years', '5–8 Years', '8+ Years']);
const allowedAttendance = new Set(['Yes, I will attend', 'Most likely, but I need a reminder', 'I am interested but need more information']);

function clean(value, max = 500) {
  return String(value == null ? '' : value).replace(/[<>{}\u0000-\u001F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function fail(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

async function sendEmail({ apiKey, from, to, subject, text, replyTo, idempotencyKey }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
      'User-Agent': 'TestNova-Webinar-Registration/1.0'
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: replyTo
    })
  });
  if (!response.ok) throw new Error('email delivery failed');
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
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.WEBINAR_EMAIL_FROM;
  const adminEmail = process.env.WEBINAR_ADMIN_EMAIL || 'admin@testnova.in';
  if (!resendApiKey || !emailFrom) {
    return fail(res, 503, 'Email service is temporarily unavailable. Please contact TestNova through WhatsApp.');
  }

  const interests = registration.interests.join(', ') || 'Not specified';
  const sourceUrl = registration.sourcePageUrl || 'https://www.testnova.in/registration/';
  const adminText = [
    'New TestNova webinar registration',
    '',
    `Full name: ${registration.fullName}`,
    `WhatsApp number: ${registration.whatsappNumber}`,
    `Email address: ${registration.emailAddress}`,
    `Current status: ${registration.currentStatus}`,
    `Total experience: ${registration.totalExperience}`,
    `Selected interests: ${interests}`,
    `Biggest challenge: ${registration.biggestChallenge || 'Not provided'}`,
    `Webinar attendance response: ${registration.attendance}`,
    'Consent status: Agreed',
    `Submission date and time: ${submittedAt}`,
    'Timezone: Asia/Kolkata (IST)',
    `Source page URL: ${sourceUrl}`
  ].join('\n');
  const candidateText = [
    `Hi ${registration.fullName},`,
    '',
    'Your registration for the TestNova Free QA Career Webinar is confirmed.',
    '',
    'Date: 15 August 2026',
    'Time: 3:00 PM IST',
    'Mode: Live Online',
    '',
    'The webinar joining details and reminders will be shared through WhatsApp or email.',
    'Please save the TestNova WhatsApp number so you do not miss important updates.',
    '',
    'Regards,',
    'Team TestNova'
  ].join('\n');
  const emailToken = crypto.createHash('sha256').update(`${duplicateKey}|2026-08-15`).digest('hex').slice(0, 32);

  try {
    await Promise.all([
      sendEmail({
        apiKey: resendApiKey,
        from: emailFrom,
        to: adminEmail,
        subject: `New Webinar Registration – ${registration.fullName} – 15 August 2026`,
        text: adminText,
        replyTo: registration.emailAddress,
        idempotencyKey: `webinar-admin-${emailToken}`
      }),
      sendEmail({
        apiKey: resendApiKey,
        from: emailFrom,
        to: registration.emailAddress,
        subject: 'Registration Confirmed – TestNova Free QA Career Webinar',
        text: candidateText,
        replyTo: adminEmail,
        idempotencyKey: `webinar-candidate-${emailToken}`
      })
    ]);

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
