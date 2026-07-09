# TestNova Tutorial Website

## Local Ollama RAG Assistant Setup

The TestNova AI Course Assistant uses local RAG with Ollama. It does not require an OpenAI API key.

### 1. Install Ollama

Download and install Ollama:

```powershell
https://ollama.com/download
```

### 2. Pull the local LLM

Use `llama3.1`:

```powershell
ollama pull llama3.1
```

You can also use `mistral` by changing `OLLAMA_CHAT_MODEL` in `.env.example` or your environment:

```powershell
ollama pull mistral
```

### 3. Pull the embeddings model

```powershell
ollama pull nomic-embed-text
```

### 4. Start Ollama

Ollama usually starts automatically after installation. If needed:

```powershell
ollama serve
```

The backend expects Ollama at:

```text
http://localhost:11434
```

### 5. Run the website

Serve the website with your existing static/serverless setup. The assistant backend route is:

```text
/api/course-assistant
```

Ask test questions such as:

```text
Explain Playwright locators
Give me API testing practical steps
How can AI help QA?
```

## Course Knowledge

Add or update TestNova course markdown files here:

```text
content/course-knowledge/
```

Each `.md` file is treated as TestNova course knowledge.

## Refreshing The Ollama Embeddings Cache

The assistant stores local embeddings in:

```text
content/course-knowledge/ollama-embeddings-cache.json
```

To refresh embeddings after editing course content, delete that cache file. The next assistant question will regenerate it using `nomic-embed-text`.
