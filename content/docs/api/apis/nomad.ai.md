---
title: nomad.ai
description: Local AI API for Drives — streaming chat powered by an OpenAI-compatible runtime
---

`nomad.ai` gives any Drive page access to a local AI agent. The underlying model runs in an external OpenAI-compatible server (Ollama, LM Studio, etc.) configured in Nomad settings.

## Configuration

**Global settings** (Nomad → Settings → AI Settings):

- `ai_base_url` — base URL of your OpenAI-compatible runtime, e.g. `http://localhost:11434/v1`
- `ai_default_model` — fallback model name when a Drive does not specify one, e.g. `llama3.2:3b`

**Per-Drive opt-in** — add an `ai` key to your Drive's `/index.json`:

```json
{ "ai": { "model": "llama3.2:3b" } }
```

Or delegate to another Drive's AI Config:

```json
{ "ai": "hyper://abc123..." }
```

**AI Config** — a Drive can include `/ai/system.md` (system prompt) and `/ai/tools/` (tool definitions) to customise behaviour.

**Resolution order**: Drive's `/index.json` → Space default → global fallback (bare inference, no system prompt).

---

### nomad.ai.chat(messages)

Send a conversation to the AI and stream the response back as text chunks.

* **messages** Array&lt;{role: string, content: string}&gt;. Conversation history in OpenAI message format (`"user"`, `"assistant"` roles).
* Returns **AsyncIterator&lt;string&gt;**. Yields text chunks as they arrive. The system prompt from the Drive's AI Config is prepended automatically.

```js
const messages = [{ role: 'user', content: 'Summarise this Drive.' }]

for await (const chunk of nomad.ai.chat(messages)) {
  process.stdout.write(chunk)
}
```

Built-in tools available to the model (called opaquely — the page only receives text output):

| Tool | Description |
|------|-------------|
| `readDriveFile(path)` | Read a file from the current Drive |
| `listDriveFiles(path)` | List a directory in the current Drive |
| `fetchUrl(url)` | Fetch an http/https URL |
| `writeDriveFile(path, content)` | Write a file (prompts user for permission on first use) |
