// Only expose a Supabase publishable key. Secret and legacy JWT keys are rejected.
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const url = process.env.SUPABASE_URL || '';
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || '';
  if (!/^https:\/\/[a-z0-9]+\.supabase\.co\/?$/.test(url) || !/^sb_publishable_[\w-]+$/.test(key)) {
    return res.status(503).json({ error: 'Student accounts are not configured.' });
  }
  return res.status(200).json({ url, key, google: process.env.SUPABASE_GOOGLE_ENABLED === 'true' });
};
