---
title: Document drives
description: A Document drive is a page several people edit at the same time, like a Notion page. How it stores its text, shares edits live, and what other apps can read from it.
---

A **Document drive** is a page that several people can edit at the same time, like a Notion page or
a Slack canvas. Everyone with write access sees the others' text and cursors as they type. An edit
made offline merges in when the device reconnects, with nothing lost.

Create one from **New Drive → Document** in Nomad, or from code:

```javascript
var doc = await nomad.fs.createDrive({ title: 'Team plan', template: 'document' })
```

A Document drive starts [collaborative](/docs/api/apis/nomad.fs/#collaboration): invite people as
writers the way you would for any drive. Anyone else with the link can read it and watch it change.

## What's in the drive

```
/index.json            { "type": "walled.garden/document", "fallback": "/index.html", ... }
/index.html            the editor's page
/app.js                the editor (Markdown with Live Preview, built on Yjs)
/doc/doc.json          { "type": "walled.garden/live-doc", "format": "yjs/1", "schema": "text", ... }
/doc/updates/<writerKey>/<time>-<id>.yupdate
/doc/snapshots/<writerKey>-<time>.ystate
/doc/content.md        the text as Markdown
```

The document is a [Yjs](https://yjs.dev) document. Its text is the merge of every snapshot and
update file under `/doc/`. Each writer writes only under its own writer key, so two people editing
at once never write the same file and nothing is overwritten. The merge comes out the same in any
order.

- **Saving.** The editor saves your edits as one small update file after two seconds without typing,
  and at least every ten seconds while you keep typing (inline files, `{ inline: true }`).
- **Live.** Edits and cursors also travel over a [peersockets](/docs/api/apis/nomad.peersockets/)
  topic, `live-doc:/doc`, so others see them as you type. That topic stores nothing. A device
  accepts document changes from it only from peers that proved they are writers (the "writer"
  event).
- **Compaction.** When the document has more than 256 update files, the next writer to open it
  folds them into one snapshot and deletes the files it folded in.
- **`/doc/content.md`.** A writer rewrites it a few seconds after editing stops. Read it to get
  the text without Yjs, for example from search, a feed reader or the AI.

Draft Mode doesn't apply to a Document drive's edits. The editor saves them live.

The design and the measurements behind it are in ADR-0025 in the Nomad repository.
