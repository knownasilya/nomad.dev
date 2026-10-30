---
title: WebMCP (document.modelContext)
description: Let a page expose its own tools to Nomad's AI assistant with the WebMCP standard — how to register tools, what the assistant sees, and the one-time permission.
---

Nomad ships the [WebMCP](https://webmachinelearning.github.io/webmcp/) standard so a page can hand
its own **tools** to the built-in AI assistant. A tool is a named function with a JSON Schema for its
arguments and an `execute` callback that runs **in your page** — it can touch the page's state, the
signed-in session, and any client-side logic you already have.

This is a web-platform API on `document.modelContext`, not part of the `nomad.*` surface. Pages
written for Chrome's WebMCP work in Nomad unchanged.

## Register a tool

```js
const registration = new AbortController();

await document.modelContext.registerTool(
  {
    name: 'add_todo',
    description: "Add an item to the user's todo list",
    inputSchema: {
      type: 'object',
      properties: { text: { type: 'string', description: 'The item text' } },
      required: ['text'],
    },
    async execute({ text }) {
      addTodoItem(text);
      return { content: [{ type: 'text', text: `Added "${text}"` }] };
    },
  },
  { signal: registration.signal }
);

// later — remove it
registration.abort();
```

`navigator.modelContext` is a deprecated alias for the same object. Listen for `toolchange` on
`document.modelContext` if you register tools dynamically.

### Return value

Return `{ content: [{ type: 'text', text }] }`, or a bare string (Nomad wraps it), or any
JSON-serialisable value (Nomad stringifies it). Only text is passed back to the model — DOM nodes,
class instances and functions do not survive.

## What the assistant sees

When the current page has registered tools, the model finds them with its `search` tool, in the
`page` domain (a tool named `add_todo` is the entity `page:add_todo`). It runs one inside its
`execute` tool as `nomad.page.add_todo(params)`; the result comes back from your `execute`.

The tools reach the AI Sidebar while the page is the tab you are on, the page's own
`nomad.ai.chat()`, and programs that use Nomad's local MCP. They are **not** sent over the AI Bridge
to a remote device — page tools resolve only when inference runs on the same device as the page.

## Permission

The first time the assistant is about to use a page's tools, Nomad asks the user once per origin
("Let the AI assistant use tools this page provides"). Allow is remembered; a denial is re-asked on
the next turn. Trusted `nomad://` interfaces are not prompted.

## Requirements & limits

- Secure context only (`hyper://`, `https://`, `nomad://`, or `http://localhost`).
- Main frame only — tools registered in a sub-frame are ignored in this release.
- A page may publish at most 32 tools; tool names must match `[A-Za-z0-9_.-]{1,64}`; descriptions are
  truncated to 1 KB and input schemas to 16 KB.
- Cross-document discovery (`getTools({ fromOrigins })`) and `exposedTo` are not supported.

## Debugging

### The Inspector

**`nomad://webmcp`** (menu → WebMCP Inspector) lists every open page's registered tools with
their schemas, lets you run a tool by hand and see the result, shows a live log of every tool
call (both the AI assistant's and your own), and has an Allow / Deny / Ask control per page for
the assistant's access. `nomad://webmcp?origin=<origin>` opens it scoped to a single page (the
chat assistant's **Tools** panel links here for the current page); a "Show all" link clears the
filter.

### Lower-level

WebMCP also has a diagnostic surface on both sides of the bridge.

### In the page (DevTools console)

`window.__nomadWebmcp` is present on every eligible page:

```js
window.__nomadWebmcp.status        // what the injector found in this page
                                   //   { hasCore, hasTesting, coreGetTools, secureContext,
                                   //     originAgentCluster, polyfillGlobal, … }
await window.__nomadWebmcp.tools()             // the tools the bridge currently sees
await window.__nomadWebmcp.call('add_item', { text: 'x' })   // run one directly, no model
```

For a running trace of every publish / invoke / toolchange, turn on verbose logging and reload:

```js
localStorage.setItem('nomad-webmcp-debug', '1');  // then reload
```

All lines are prefixed `[webmcp]`. Failures (`publish failed`, `invoke failed`,
`main-world injection failed`) always log as warnings regardless of the flag.

### In the browser process (terminal / log file)

Every bridge event is written to the Nomad log under the `webmcp` category — read it in
`nomad://library/logs` or via `nomad.logger.query({ filter: { category: 'webmcp' } })`.

To mirror those lines to the terminal, start the app with:

```sh
NOMAD_WEBMCP_DEBUG=1 npm start
```

You will see `publishTools` (renderer → bg tool list), `resolvePageTools` (what a chat turn
picked up), `webmcpTools permission` (the per-origin decision), `invokePageTool`, and `cleanupWc`.

### Common failures

| Symptom | Cause |
|---|---|
| `registerTool` throws `SecurityError` | page is not origin-keyed (`originAgentCluster` false) — Nomad shims this for `hyper://`; on other origins serve `Origin-Agent-Cluster: ?1` |
| `status.hasCore` false | the polyfill did not install — check the page is a secure context and the main frame |
| `publishTools … tools=[]` but the page called `registerTool` | the call threw (see the page console) or `toolchange` did not fire |
| `resolvePageTools skipped` in the log | the chat passed a `driveUrl`, or ran over the AI Bridge — page tools work only on the device that shows the page |
| model calls `writeDriveFile` instead of the page's tool | the page tools never reached the turn — check `resolvePageTools` shows them |
