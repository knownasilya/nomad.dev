---
title: nomad.ai
description: Local AI API for Drives — streaming chat powered by an OpenAI-compatible runtime
---

`nomad.ai` gives any Drive page access to a local AI agent. The model runs in whichever runtime is active in Nomad settings: Claude or Cursor when those apps are installed, or a named OpenAI-compatible server (Ollama, LM Studio, or any other `/v1` API).

## Configuration

**Global settings** (Nomad → Settings → AI):

One runtime is active at a time. Claude and Cursor are detected when those apps are installed on the computer. Several named OpenAI-compatible servers can be saved (Ollama, LM Studio, or any `/v1` API); you choose which one is active, and which model it uses.

- `ai_default_model` — model for the active runtime
- `nomad.ai.listRuntimes()` — `{ active, model, runtimes }`, where each runtime is `{ id, name, kind, detected, available, baseUrl, hasToken }` and `kind` is `"openai"`, `"claude"`, or `"cursor"`
- `nomad.ai.listModels()` — `{ models, current, labels }` for the active runtime. `labels` maps a model to a readable name when the runtime gives one: the Claude CLI reports names such as "Opus 5.5". It is empty for other runtimes.

**Per-Drive system prompt** — add an `ai` key to your Drive's `/index.json`. It sets the system prompt only; the model is always the user's choice.

```json
{ "ai": true }
```

Or delegate to another Drive's AI Config:

```json
{ "ai": "hyper://abc123..." }
```

**AI Config** — a Drive can include `/ai/system.md`, the system prompt.

**Resolution order**: Drive's `/index.json` → Space default → global fallback (bare inference, no system prompt).

---

### nomad.ai.chat(messages)

Send a conversation to the AI and stream the response back as text chunks.

* **messages** Array of `{ role, content, images? }`. `role` is `"user"`, `"assistant"`, or `"system"`. `content` is a string, or an array of `{ type: "text", text }` and `{ type: "image_url", image_url: { url } }` parts. `images` is one or more image URLs for that message (at most 8), appended after `content`. Each URL is a `data:image` URL (`png`, `jpeg`, `webp`, or `gif`) or an `http`/`https` URL. A data URL larger than about 4.5 MB is rejected — resize first.
* Returns **AsyncIterator&lt;string&gt;**. Yields text chunks as they arrive. The system prompt from the Drive's AI Config is prepended automatically.

```js
const messages = [{
  role: 'user',
  content: 'What food is in these photos?',
  images: [jpegDataUrl, pngDataUrl] // optional; at most 8
}]

for await (const chunk of nomad.ai.chat(messages, {
  think: false,     // skip the reasoning phase
  tools: false,     // plain completion: no search/execute, and no standing tool prompt
  maxTokens: 1600   // cap the completion
})) {
  process.stdout.write(chunk)
}
```

The model gets two tools, `search` and `execute`. With them it finds and runs capabilities such as these (the page only receives text output):

| Capability | Description |
|------|-------------|
| `readDriveFile(path)` | Read a file from the current Drive |
| `listDriveFiles(path)` | List a directory in the current Drive |
| `fetchUrl(url)` | Fetch an http/https URL |
| `writeDriveFile(path, content)` | Write a file (prompts user for permission on first use) |
