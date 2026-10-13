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
[WebMCP](/docs/api/developers/webmcp). The same functions that back the buttons also back the
tools, so the AI's edits show up live.

## Where your tasks live

The app is a player, and your tasks can live in a drive you insert, like a cassette:

- **Use a drive** opens the drive picker. Pick a drive, or make a new one. The list is then saved in
  that drive's `/todos.json`, so it goes wherever the drive goes, to your other devices too. The
  first save asks once for permission to write to the drive.
- **Eject** takes the drive out. The list goes back to the one saved in this browser
  (`localStorage`), which is also where it lives if you never insert a drive.
- A blank drive starts with the list you have now. A drive whose `/todos.json` is not a todo list
  is refused, so the app never writes over it.
- When `/todos.json` changes on another device, or in another app, the list updates.

The file format is a loose convention made up for this demo (any list of items with a `name` and a
`status`). It is described at the top of the script in `index.html`.

## What's in the drive

| File | Purpose |
|---|---|
| `index.json` | the drive's title and description |
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

The assistant finds them with `search` and runs them as `nomad.page.add_task(...)`. The first time it uses one,
Nomad asks once per drive for permission ("Let the AI assistant use tools this page provides").

## Try it

1. Create a drive from this template and open it.
2. Add a couple of tasks by hand.
3. Open the AI Sidebar (the robot icon in the address bar) and try: *"add milk and eggs, then mark milk done"* or *"what's left on my list?"*

Requires a local AI model that supports tool calling (set it in **nomad://settings → AI**).

## Make it yours

- Everything is in `index.html` — no build step, no dependencies. Fork it and change the tools.
- The drive slot works for any app: ask for a drive with `nomad.shell.selectDriveDialog`, keep its
  URL, and read and write it with `nomad.fs`. A `tag` in the picker gives your app its own shelf of
  drives.

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
