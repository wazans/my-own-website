const PLACEHOLDER_REPLY = 'I can help with TestNova course topics. RAG integration will be added next.';

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'object') return body;

  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}

module.exports = async function courseAssistantHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = parseBody(req.body);
    if (!body) {
      return res.status(400).json({ error: 'Invalid JSON body.' });
    }

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Future OpenAI/RAG integration belongs here on the backend only.
    // Keep OPENAI_API_KEY and retrieval logic server-side so secrets are never exposed to the frontend.
    return res.status(200).json({
      reply: PLACEHOLDER_REPLY
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Assistant service failed. Please try again later.'
    });
  }
};
