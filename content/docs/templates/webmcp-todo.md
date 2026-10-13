---
title: Todo (WebMCP)
description: A todo list a page's own AI assistant can read and edit, built on the WebMCP standard.
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/webmcp-todo.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/webmcp-todo'
  const TEMPLATE_TITLE = 'My Todo List'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

A single-file todo app that exposes its list to the built-in AI assistant with
[WebMCP](/docs/api/developers/webmcp). Tasks are stored in the browser (`localStorage`), and the
same functions that back the buttons also back the tools, so the AI's edits show up live.

## What's in the drive

| File | Purpose |
|---|---|
| `index.json` | `chatBubble: true` — puts the assistant on the page so the tools have a consumer |
| `index.html` | the whole app: markup, styles, list logic, and the `document.modelContext.registerTool(...)` calls |

## Tools it registers

| Tool | Does |
|---|---|
| `add_task({ text })` | add a task |
| `list_tasks({ status })` | list tasks — `all` (default), `active`, or `done` |
| `complete_task({ task })` | mark a task done (matches by text or id) |
| `reopen_task({ task })` | mark a completed task active again |
| `remove_task({ task })` | delete a task |
| `clear_completed()` | delete every completed task |

The assistant sees them prefixed `page_` (e.g. `page_add_task`). The first time it uses one,
Nomad asks once per drive for permission ("Let the AI assistant use tools this page provides").

## Try it

1. Create a drive from this template and open it.
2. Add a couple of tasks by hand.
3. Open the chat bubble and try: *"add milk and eggs, then mark milk done"* or *"what's left on my list?"*

Requires a local AI model that supports tool calling (set it in **nomad://settings → AI**).

## Make it yours

- Everything is in `index.html` — no build step, no dependencies. Fork it and change the tools.
- To persist across devices instead of per-browser, swap the `localStorage` load/save for
  `nomad.fs` writes to a file in the drive (e.g. `/tasks.json`).

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/webmcp-todo/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/webmcp-todo/index.json" "json" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}
