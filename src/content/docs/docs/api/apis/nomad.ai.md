---
title: nomad.ai
description: Local AI API for Drives — streaming chat powered by an OpenAI-compatible runtime
slug: docs/api/apis/nomad.ai
---

`nomad.ai` gives any Drive page access to a local AI agent. The model runs in whichever runtime is active on Nomad's AI page (`nomad://ai/setup`): Claude or Cursor when those apps are installed, or a named OpenAI-compatible server (Ollama, LM Studio, or any other `/v1` API).

## Configuration

**Global settings** (the AI page, `nomad://ai/setup`, in the browser menu under **AI**; it used to be Settings → AI):

One runtime is active at a time. Claude and Cursor are detected when those apps are installed on the computer. Several named OpenAI-compatible servers can be saved (Ollama, LM Studio, or any `/v1` API); you choose which one is active, and which model it uses.

- `ai_default_model` — model for the active runtime
- `nomad.ai.listRuntimes()` — `{ active, model, runtimes }`, where each runtime is `{ id, name, kind, detected, available, baseUrl, hasToken }` and `kind` is `"openai"`, `"claude"`, or `"cursor"`
- `nomad.ai.listModels()` — `{ models, current, labels }` for the active runtime. `labels` maps a model to a readable name when the runtime gives one: the Claude CLI reports names such as "Opus 5.5". It is empty for other runtimes.

The AI page also lists the AI sidebar's past chats (search, rename, delete, or reopen one in the sidebar) and what the user's assistant remembers about them. Those memories go only to the user's own assistant: the AI sidebar, the phone's AI panel and AI Jobs. A page's `nomad.ai.chat()` never sees them.

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

### Built-in tools

During `nomad.ai.chat()` the model can use Nomad's built-in tools. The model finds a tool and calls it itself, and your page only sees the reply text. Pass `tools: false` to turn them off. Use [`onToolEvent`](#following-tool-calls) to follow tool calls and writes.

A page's chat stays on its own Drive: the one it is served from, or `driveUrl`. These are the tools it gets:

| Tool | What it does | Available when |
|------|--------------|----------------|
| `readDriveFile({ path })` | Read a text file from the Drive | Always |
| `listDriveFiles({ path })` | List a directory in the Drive | Always |
| `fetchUrl({ url })` | Fetch the text of an `http`/`https` URL | Always |
| `writeDriveFile({ path, content })` | Write a text file to the Drive. Asks the user for permission to change the Drive | Unless `allowWrite: false` |
| `readCurrentPage()` | Read the visible text of the page that called `chat()` | On this device (not over the AI Bridge) |
| `screenshotCurrentPage()` | Take a screenshot of that page and show it to the model | The model accepts images (`allowVision: true`), on this device |

When the drive is in [Draft Mode](/docs/api/apis/nomad.fs/#draft-mode), or the chat runs over the AI Bridge (the phone's AI panel, or a page on another device), `writeDriveFile` stages the file in the drive's Draft instead of writing it live, and `readDriveFile` and `listDriveFiles` read the Draft, so the model sees its own edits. The user publishes or discards the Draft.

The model can also call **your page's own tools**, the ones it registers with `document.modelContext` ([WebMCP](/docs/api/developers/webmcp)), after the user allows them once for your site.

#### Tools for the user's own assistant

Some tools work with the user's own data, so only the user's own assistant gets them: the AI Sidebar, the phone's AI panel, and programs on this computer that use Nomad's local MCP server. A page's `nomad.ai.chat()` never gets them.

| Tool | What it does |
|------|--------------|
| `currentTab()` | The tab the user is on: `{ url, title, drive, writable, draft }`. `draft` is `true` when writes to that drive stage in its Draft |
| `openTab({ url?, background?, group? })` | Open a new tab, optionally in a tab group. The group is made if it doesn't exist. Not on the phone |
| `listNotes`, `readNote`, `writeNote` | Find, read and write the user's Notes and their topics. `listNotes` takes a `topic`; `writeNote` takes `topics` |
| `highlightText({ text, note? })` | Highlight text on the page in the user's tab, optionally with a Note. Not on the phone |
| `listReaderPosts`, `readReaderPost` | Read posts from the feeds the user follows in Reader |
| `followFeed`, `unfollowFeed`, `markPostsRead` | Change what the user follows and has read in Reader |

The AI Sidebar also gets tools that **use the page** in the user's tab, with real clicks and keys the user watches: `snapshotPage()` lists the page's controls with a `ref` each, and `clickElement({ ref })`, `typeText({ ref, text, clear?, submit? })`, `pressKey({ key })`, `selectOption({ ref, value })` and `scrollPage({ direction?, ref? })` act on them. `clickAt({ x, y })` clicks a point in a screenshot, for a model that sees images. The first action on a site asks the user, and a yes lasts 30 days for that site. The AI can't type into password, payment or file fields, and a click that buys, sends, posts or deletes asks the user first. Before several of those, the assistant can show a plan with `planPageActions({ goal, steps: [{ ref, note }] })`, and one approval covers the clicks it lists. The user can press Stop or Esc, or just click in the page, to take over. The phone's AI panel and programs on this computer don't get these tools. If your page registers [WebMCP](/docs/api/developers/webmcp) tools, the assistant uses those instead.

The user's own assistant can also pass a `drive` to `readDriveFile`, `listDriveFiles` and `writeDriveFile`. A `drive` is one of the user's names for a drive, or a `hyper://` URL. The Notes and Reader tools ask the user for permission to read or change that data.

#### Following tool calls

`onToolEvent(e)` fires for each tool call the model makes, so your page can show what the assistant is doing. Each call sends a `start` event and then an `end` event with the same `id`. A call that a running `execute` makes names that call as `parentId`, so it starts and ends inside it. The shape follows [AG-UI](https://docs.ag-ui.com/concepts/events)'s `TOOL_CALL_START` and `TOOL_CALL_END`.

| `e.phase` | Fields | When |
|-----------|--------|------|
| `start` | `id`, `parentId?`, `name`, `summary` | A tool call starts. `summary` says what it does in plain words |
| `end` | `id`, `error?` | That call finished. `error` is set when it failed |
| `write` | `drive`, `path`, `priorContent`, `draft` | `writeDriveFile` changed a file. `priorContent` is `null` for a new file |
| `screenshot` | `imageDataUrl` | `screenshotCurrentPage` took a picture of the page |
| `note` | `summary` | Something the user should know, such as page tools that were not allowed |

```js
const running = new Map()
for await (const chunk of nomad.ai.chat(messages, {
  onToolEvent (e) {
    if (e.phase === 'start') running.set(e.id, e.summary)
    if (e.phase === 'end') running.delete(e.id)
  }
})) {
  output.textContent += chunk
}
```

`nomad.ai.listTools()` returns what a page's chat can reach right now. `capabilities` lists the tools above that this page gets. `page` lists your WebMCP tools.
