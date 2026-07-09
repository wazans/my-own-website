const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const KNOWLEDGE_DIR = path.join(process.cwd(), 'content', 'course-knowledge');
const CACHE_FILE = path.join(KNOWLEDGE_DIR, 'ollama-embeddings-cache.json');
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const EMBEDDING_MODEL = process.env.OLLAMA_EMBEDDING_MODEL || 'nomic-embed-text';
const CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || 'llama3.1';
const FALLBACK_REPLY = 'I could not find this in TestNova course content yet.';
const MAX_CHUNK_CHARS = 1200;
const TOP_K = 3;

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
    // Local runs persist this cache. Some hosted environments may expose project files as read-only.
  }
}

function ollamaErrorMessage(error) {
  if (
    error &&
    (error.code === 'ECONNREFUSED' ||
      error.code === 'ENOTFOUND' ||
      (error.cause && error.cause.code === 'ECONNREFUSED'))
  ) {
    return 'Ollama is not running. Start Ollama locally and make sure http://localhost:11434 is reachable.';
  }

  return error && error.message ? error.message : 'Ollama request failed.';
}

async function ollamaRequest(endpoint, payload) {
  let response;

  try {
    response = await fetch(`${OLLAMA_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    throw new Error(ollamaErrorMessage(error));
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Ollama returned HTTP ${response.status}.`);
  }

  return data;
}

async function createEmbedding(input) {
  const data = await ollamaRequest('/api/embeddings', {
    model: EMBEDDING_MODEL,
    prompt: input
  });

  if (!Array.isArray(data.embedding)) {
    throw new Error(`Ollama embedding model "${EMBEDDING_MODEL}" did not return an embedding.`);
  }

  return data.embedding;
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

  const embeddedChunks = [];
  for (const chunk of chunks) {
    const embeddingText = [
      `Source: ${chunk.source}`,
      `Topic: ${chunk.heading}`,
      chunk.text
    ].join('\n');

    embeddedChunks.push({
      ...chunk,
      embedding: await createEmbedding(embeddingText)
    });
  }

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
  const questionEmbedding = await createEmbedding(question);

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
  const prompt = [
    'You are TestNova AI Assistant.',
    'Answer only from the provided TestNova course context.',
    `If the context does not contain the answer, reply exactly: ${FALLBACK_REPLY}`,
    'Keep the answer short, beginner-friendly, and practical.',
    'Use this exact structure when content is available:',
    'Simple explanation:',
    'Practical steps:',
    'Mini assignment:',
    'Expected output:',
    '',
    `Question: ${question}`,
    '',
    'TestNova course context:',
    buildContext(chunks)
  ].join('\n');

  const data = await ollamaRequest('/api/generate', {
    model: CHAT_MODEL,
    prompt,
    stream: false,
    options: {
      temperature: 0.2
    }
  });

  return data.response ? data.response.trim() : FALLBACK_REPLY;
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
    return jsonError(res, 500, ollamaErrorMessage(error));
  }
};
