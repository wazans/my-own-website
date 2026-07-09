const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.join(process.cwd(), 'content', 'course-knowledge');
const CACHE_FILE = path.join(KNOWLEDGE_DIR, 'embeddings-cache.json');
const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';
const OPENAI_API_URL = 'https://api.openai.com/v1';
const FALLBACK_REPLY = 'I could not find this in TestNova course content yet.';
const MAX_CHUNK_CHARS = 1200;
const TOP_K = 3;

function loadLocalEnv() {
  if (process.env.OPENAI_API_KEY) return;

  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const separator = trimmed.indexOf('=');
      if (separator === -1) return;

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) {
        process.env[key] = value;
      }
    });
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'object') return body;

  try {
    return JSON.parse(body);
  } catch (error) {
    return null;
  }
}

function jsonError(res, status, message) {
  return res.status(status).json({ error: message });
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function listMarkdownFiles() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) return [];

  return fs.readdirSync(KNOWLEDGE_DIR)
    .filter((file) => file.toLowerCase().endsWith('.md'))
    .sort()
    .map((file) => path.join(KNOWLEDGE_DIR, file));
}

function extractHeading(line, currentHeading) {
  const match = line.match(/^(#{1,6})\s+(.+)$/);
  return match ? match[2].trim() : currentHeading;
}

function pushChunk(chunks, fileName, heading, lines) {
  const text = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!text) return;

  chunks.push({
    id: sha256([fileName, heading || '', text].join('\n')),
    source: fileName,
    heading: heading || 'Course notes',
    text
  });
}

function splitMarkdownFile(filePath) {
  const fileName = path.basename(filePath);
  const markdown = fs.readFileSync(filePath, 'utf8');
  const lines = markdown.split(/\r?\n/);
  const chunks = [];
  let heading = 'Course notes';
  let buffer = [];
  let size = 0;

  lines.forEach((line) => {
    const nextHeading = extractHeading(line, heading);
    const isHeading = nextHeading !== heading;

    if (isHeading && buffer.length) {
      pushChunk(chunks, fileName, heading, buffer);
      buffer = [];
      size = 0;
    }

    heading = nextHeading;
    if (!line.trim() && !buffer.length) return;

    if (size + line.length > MAX_CHUNK_CHARS && buffer.length) {
      pushChunk(chunks, fileName, heading, buffer);
      buffer = [];
      size = 0;
    }

    buffer.push(line);
    size += line.length + 1;
  });

  pushChunk(chunks, fileName, heading, buffer);
  return chunks;
}

function loadKnowledgeChunks() {
  const files = listMarkdownFiles();
  const chunks = files.flatMap(splitMarkdownFile);
  const contentHash = sha256(chunks.map((chunk) => [
    chunk.source,
    chunk.heading,
    chunk.text
  ].join('\n')).join('\n\n---\n\n'));

  return { chunks, contentHash };
}

function readCache() {
  if (!fs.existsSync(CACHE_FILE)) return null;

  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (error) {
    return null;
  }
}

function writeCache(cache) {
  fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    // Some serverless hosts expose the project as read-only. Local development still persists this cache.
  }
}

async function openAiRequest(endpoint, payload) {
  loadLocalEnv();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is missing. Add it to your environment before using the course assistant.');
  }

  const response = await fetch(`${OPENAI_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error && data.error.message ? data.error.message : 'OpenAI request failed.';
    throw new Error(message);
  }

  return data;
}

async function createEmbeddings(inputs) {
  const data = await openAiRequest('/embeddings', {
    model: EMBEDDING_MODEL,
    input: inputs
  });

  return data.data.map((item) => item.embedding);
}

async function getEmbeddedKnowledge() {
  const { chunks, contentHash } = loadKnowledgeChunks();
  if (!chunks.length) {
    throw new Error('No TestNova course knowledge found. Add markdown files to /content/course-knowledge.');
  }

  const cache = readCache();
  if (
    cache &&
    cache.contentHash === contentHash &&
    cache.embeddingModel === EMBEDDING_MODEL &&
    Array.isArray(cache.chunks) &&
    cache.chunks.length === chunks.length
  ) {
    return cache.chunks;
  }

  const embeddings = await createEmbeddings(chunks.map((chunk) => [
    `Source: ${chunk.source}`,
    `Topic: ${chunk.heading}`,
    chunk.text
  ].join('\n')));

  const embeddedChunks = chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index]
  }));

  writeCache({
    version: 1,
    contentHash,
    embeddingModel: EMBEDDING_MODEL,
    generatedAt: new Date().toISOString(),
    chunks: embeddedChunks
  });

  return embeddedChunks;
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function retrieveRelevantChunks(question) {
  const chunks = await getEmbeddedKnowledge();
  const [questionEmbedding] = await createEmbeddings([question]);

  return chunks
    .map((chunk) => ({
      ...chunk,
      score: cosineSimilarity(questionEmbedding, chunk.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);
}

function buildContext(chunks) {
  return chunks.map((chunk, index) => [
    `Context ${index + 1}`,
    `Source: ${chunk.source}`,
    `Topic: ${chunk.heading}`,
    chunk.text
  ].join('\n')).join('\n\n---\n\n');
}

async function answerFromContext(question, chunks) {
  const context = buildContext(chunks);
  const data = await openAiRequest('/chat/completions', {
    model: CHAT_MODEL,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: [
          'You are TestNova AI Assistant.',
          'Answer only from the provided TestNova course context.',
          `If the context does not contain the answer, reply exactly: ${FALLBACK_REPLY}`,
          'Keep language beginner-friendly and practical.',
          'Use this exact answer structure when content is available:',
          'Simple explanation:',
          'Practical steps:',
          'Mini assignment:',
          'Expected output:'
        ].join('\n')
      },
      {
        role: 'user',
        content: [
          `Question: ${question}`,
          '',
          'TestNova course context:',
          context
        ].join('\n')
      }
    ]
  });

  return data.choices &&
    data.choices[0] &&
    data.choices[0].message &&
    data.choices[0].message.content
    ? data.choices[0].message.content.trim()
    : FALLBACK_REPLY;
}

function uniqueSources(chunks) {
  return Array.from(new Set(chunks.map((chunk) => chunk.source))).sort();
}

function isFallbackReply(reply) {
  return reply.trim().replace(/^["']|["']$/g, '') === FALLBACK_REPLY;
}

module.exports = async function courseAssistantHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return jsonError(res, 405, 'Method not allowed. Use POST.');
  }

  try {
    const body = parseBody(req.body);
    if (!body) {
      return jsonError(res, 400, 'Invalid JSON body.');
    }

    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return jsonError(res, 400, 'Message is required.');
    }

    const relevantChunks = await retrieveRelevantChunks(message);
    const reply = await answerFromContext(message, relevantChunks);
    const hasAnswer = !isFallbackReply(reply);

    return res.status(200).json({
      reply,
      sources: hasAnswer ? uniqueSources(relevantChunks) : ['Not available in course content']
    });
  } catch (error) {
    return jsonError(res, 500, error.message || 'Assistant service failed. Please try again later.');
  }
};
