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
| `readCurrentPage({ offset? })` | Read the visible text of the page that called `chat()`. A long page comes in parts (see below) | On this device (not over the AI Bridge) |
| `screenshotCurrentPage()` | Take a screenshot of that page and show it to the model | The model accepts images (`allowVision: true`), on this device |
| `saveScratch({ key, value, note? })`, `readScratch({ key })`, `listScratch()`, `deleteScratch({ key })` | Keep what the model looked up (text or any JSON value) to use again later in the turn, without fetching it again (see below) | Always |

When the drive is in [Draft Mode](/docs/api/apis/nomad.fs/#draft-mode), or the chat runs over the AI Bridge (the phone's AI panel, or a page on another device), `writeDriveFile` stages the file in the drive's Draft instead of writing it live, and `readDriveFile` and `listDriveFiles` read the Draft, so the model sees its own edits. The user publishes or discards the Draft.

**Long text comes in parts.** `readCurrentPage`, `readNote`, `readReaderPost` and a Job's `openPage` give at most 20,000 characters at a time, so one long page or Note can't fill the model's context. A part that isn't the whole text says which characters it holds and where the next one starts: `readNote`, `readReaderPost` and `openPage` add `offset`, `length`, `nextOffset` (until the last part) and a `part` note to their result, and `readCurrentPage` puts the note after the text. The model reads on by calling the same tool again with `offset` set to that number. Before it rewrites a long Note with `writeNote`, which replaces the whole Note, it reads every part.

**The scratch space** keeps what the model looked up, so its code can use it again without fetching it again or passing all of it through the model. A long read saves its whole text there and names its `scratch` key (`note:<id>`, `post:<url>`, `page:<url>`), and `readScratch({ key })` gives all of it to the model's code. Later parts of a long page come from that saved copy, so they line up with the first even if the page changes. The model can save its own finds with `saveScratch` (up to 1,000,000 characters each, about 4,000,000 in all, dropping the oldest past that). A page's `nomad.ai.chat()` keeps one for the turn; the AI Sidebar keeps one for the whole chat, until it has been idle for three hours; an AI Job keeps one for its run. It lives in memory on the user's computer and is never written to disk. What the model saved after reading the user's private data counts as private when it reads it back, so a request to a site the user didn't name still asks first.

The model can also call **your page's own tools**, the ones it registers with `document.modelContext` ([WebMCP](/docs/api/developers/webmcp)), after the user allows them once for your site.

#### Tools for the user's own assistant

Some tools work with the user's own data, so only the user's own assistant gets them: the AI Sidebar, the phone's AI panel, and programs on this computer that use Nomad's local MCP server. A page's `nomad.ai.chat()` never gets them.

| Tool | What it does |
|------|--------------|
| `currentTab()` | The tab the user is on: `{ url, title, drive, writable, draft }`. `draft` is `true` when writes to that drive stage in its Draft |
| `openTab({ url?, background?, group? })` | Open a new tab, optionally in a tab group. The group is made if it doesn't exist. Not on the phone |
| `createDrive({ title, description?, template?, collaborative? })` | Make a new drive in the user's library, as the Create Drive dialog does. `template` is `"blank"` (the default) or `"document"`. Asks the user once a turn. The assistant can then write the drive's files without asking again. An AI Job can make drives only when the user ticks "Make new drives" for it |
| `listNotes`, `readNote`, `writeNote` | Find, read and write the user's Notes and their topics. `listNotes` takes a `topic`; `readNote` takes an `offset` for a long Note (see below); `writeNote` takes `topics` |
| `highlightText({ text, note? })` | Highlight text on the page in the user's tab, optionally with a Note. Not on the phone |
| `listReaderPosts`, `readReaderPost` | Read posts from the feeds the user follows in Reader. `readReaderPost` takes an `offset` for a long post |
| `followFeed`, `unfollowFeed`, `markPostsRead` | Change what the user follows and has read in Reader |
| `saveAsset({ name?, text?, url?, base64?, mime?, caption? })` | Save a file to the Assets of the user's current Space (`nomad://assets`): text the assistant wrote (a Markdown note, a CSV, code), a file on the web or in a drive to keep (`url`), or bytes its code made (`base64`). Up to 100 MB. In a shared Space everyone in it sees the file. Asks the user once a turn, and says when the Space is shared |
| `getDashboard({ space? })`, `pinDashboardCard({ id?, title?, openui?, wide?, space? })`, `removeDashboardCard({ id, space? })`, `setDashboard({ openui, space? } \| { reset: true, space? })`, `previewLiveData({ source, args? })` | Read and change a Space's home page (`nomad://desktop`). The page has a layout and pinned cards, and each is a small program drawn with the AI Sidebar's components. `pinDashboardCard` pins a new card or changes one; `setDashboard` replaces the layout, and the page keeps the one before it so the user can restore it from Customize. Each Space has its own home page: the tools use the current tab's Space, or the one `space` names (`getDashboard` lists them in `spaces`), so a program on this computer can reach any of them too. A shared Space has one home page for everyone in it, and only the people who can edit it change it; `getDashboard`'s `space` says which it is. A layout made for a Space can place its checklist Notes (`HomeList("Chores")`, ticked right on the page), its photos (`HomePhotos()`) and the people in it (`HomeMembers()`). A card can be **live**: a `Query("events", { days: 1 })` in its program reads the user's calendar, Jobs, a Job's runs, Notes, or a file or folder in a drive each time the page draws it and again on a schedule, and every viewer sees their own data. `previewLiveData({ source, args? })` shows the model what such a Query returns now. Reading and changing ask for separate permissions. Jobs don't get these |

The AI Sidebar also gets tools that **use the page** in the user's tab, with real clicks and keys the user watches: `snapshotPage()` lists the page's controls with a `ref` each, and `clickElement({ ref })`, `typeText({ ref, text, clear?, submit? })`, `pressKey({ key })`, `selectOption({ ref, value })` and `scrollPage({ direction?, ref? })` act on them. `clickAt({ x, y })` clicks a point in a screenshot, for a model that sees images. The first action on a site asks the user, and a yes lasts 30 days for that site. The AI can't type into password, payment or file fields, and a click that buys, sends, posts or deletes asks the user first. Before several of those, the assistant can show a plan with `planPageActions({ goal, steps: [{ ref, note }] })`, and one approval covers the clicks it lists. The user can press Stop or Esc, or just click in the page, to take over. The phone's AI panel and programs on this computer don't get these tools. If your page registers [WebMCP](/docs/api/developers/webmcp) tools, the assistant uses those instead.

An **AI Job** can use pages too, on the sites the user allowed it. It opens one with `openPage({ url })`, which loads the page signed in as the user and returns its text, then uses the same page tools (`readCurrentPage`, `snapshotPage`, `clickElement`, `typeText`, `pressKey`, `selectOption`, `scrollPage`). A Job runs with nobody watching, so the page opens in a hidden window and nothing asks: a site the Job wasn't allowed, or a click that buys, sends, posts or deletes, is refused, and the run notes what it wanted. The user allows those by running the Job with them once (**Run with me** in My Library → Jobs). That run opens the page in a tab they watch, and asks for each site (to open it, then to click and type on it) and for each such click, with a box to allow clicks like it on the Job's later runs. Each yes is saved on the Job, where the user can see and take it back. A page's own `nomad.ai.chat()` never gets `openPage`.

The user's own assistant can also pass a `drive` to `readDriveFile`, `listDriveFiles` and `writeDriveFile`. A `drive` is one of the user's names for a drive, or a `hyper://` URL. The Notes and Reader tools ask the user for permission to read or change that data.

#### Page text is data, and private data stays put

Every chat, a page's own included, tells the model that what its tools read (web pages, fetched URLs, drive files, feed posts, page tools, HTTP responses) is data, not instructions. Only the user's own messages ask it to do things. So text on your page can inform the assistant but can't tell it what to do.

The user's own assistant goes further. Once a chat has read the user's private data (Notes, Reader posts, Mods, Jobs, files in their drives, or the page in their tab), the first `fetchUrl`, `httpRequest` or `openTab` to each new site asks the user first, because the request could carry that data there. It doesn't ask for a site the user named in their messages (a URL or a bare domain), for one of the user's names, or for a request whose secrets cover its host. One answer holds for the rest of the turn, and the check lasts for the rest of the chat. An AI Job has nobody to ask: after it reads private data, it reaches only the sites its prompt names, the hosts of the secrets it may use, and the sites it may open.

When the assistant makes or changes something, it links to it in its answer. Notes, Jobs and Mods come back from their tools with a `url` (`nomad://notes/<id>`, `nomad://library/jobs?id=<id>`, `nomad://library/mods?id=<id>`), a new drive with its `hyper://` URL, a file write ends with the file's `hyper://` URL, a Highlight gives its `link`, and a file saved to Assets gives `nomad://assets/?id=<id>`. In the AI Sidebar a click opens the link in a new tab. On the phone a Note, a Job, a file in Assets or Reader opens on its own screen, a page opens in a new tab, and for a Mod or a memory the phone says where it is on the computer. A `nomad://` link opens only when it is one of these pages, and without any other query, so a link the model was talked into writing can't change anything when it opens.

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
