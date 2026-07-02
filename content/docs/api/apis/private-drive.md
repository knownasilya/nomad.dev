---
title: Private Drive
description: Your personal on-device drive, accessible at hyper://private/.
---

Every Nomad user has a **private drive** — your personal on-device storage, created automatically on
first launch and persisted across sessions. It holds data that should live on your machine, like
bookmarks and app preferences.

Like every drive in Nomad it is an [Autobase](/docs/api/advanced/collaborative-drives/), reached
through the single [`beaker.fs`](/docs/api/apis/beaker.fs/) API. What makes it special is only that it
is addressed by the well-known URL `hyper://private/` and is not published to the public network.

## Accessing the private drive

Navigate to it directly in the address bar:

```
hyper://private/
```

Or from JavaScript with `beaker.fs`:

```javascript
var privateDrive = beaker.fs.drive('hyper://private/')

// read a file
var data = await privateDrive.readFile('/my-notes.txt')

// write a file
await privateDrive.writeFile('/my-notes.txt', 'Hello, private world!')

// list files
var entries = await privateDrive.readdir('/')
```

## Properties

| Property | Value |
|---|---|
| URL | `hyper://private/` |
| Writable | Always — it is your drive |
| Networked | Not published to the public swarm |
| Persisted | Yes — survives browser restarts |

## Common uses

The private drive is a good place to store:

- Personal notes and drafts
- Bookmarks and pins (`/bookmarks/`, `/beaker/pins.json`)
- App configuration and preferences
- Data created by `beaker://` pages that needs to persist across sessions

```javascript
// check that hyper://private/ is writable
var info = await beaker.fs.getInfo('hyper://private/')
console.log(info.writable) // true
```
