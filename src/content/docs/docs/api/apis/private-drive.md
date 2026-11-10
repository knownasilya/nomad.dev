---
title: Private Drive
description: Your personal on-device drive, accessible at hyper://private/.
---

Every Nomad user has a **private drive** — your personal on-device storage, created automatically on
first launch and persisted across sessions. It holds data that should live on your machine, like
bookmarks and app preferences.

Like every drive in Nomad it is an [Autobase](/docs/api/advanced/collaborative-drives/), reached
through the single [`nomad.fs`](/docs/api/apis/nomad.fs/) API. What makes it special is only that it
is addressed by the well-known URL `hyper://private/` and is not published to the public network.

## Accessing the private drive

Navigate to it directly in the address bar:

```
hyper://private/
```

Or from JavaScript with `nomad.fs`:

```javascript
var privateDrive = nomad.fs.drive('hyper://private/')

// read a file
var data = await privateDrive.readFile('/my-notes.txt')

// write a file
await privateDrive.writeFile('/my-notes.txt', 'Hello, private world!')

// list files
var entries = await privateDrive.readdir('/')
```

## When a page asks

The private drive holds your address book, your AI chats and your drive list, so it is closed to web
pages. Nomad's own `nomad://` pages, and pages served from `hyper://private/` itself, get in freely.
Any other page gets an error, unless you allow it one file or one folder:

- The first `nomad.fs` read or write of a path shows a prompt that names the path, for example
  *Read `hyper://private/address-book.json` in your private drive*.
- **Allow for** picks how long the page keeps it: 1 hour (the default), 1 day, 1 week, 1 month or
  3 months. The page can't choose the length.
- A read never lets the page write. A folder covers everything inside it. The root `/` and calls on
  the whole drive (`getInfo`, `watch`, `readdir('/')`, …) are never allowed.
- The site's **Permissions** in site info lists what it can use under **Your private drive**, with
  when each ends. The × ends one now; the page's next call asks again.

An app that needs the user's profile or contacts should ask for them with
`nomad.shell.selectDriveDialog` instead, and keep its own data in its own drive.

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
- Bookmarks and pins (`/bookmarks/`, `/nomad/pins.json`)
- App configuration and preferences
- Data created by `nomad://` pages that needs to persist across sessions

```javascript
// check that hyper://private/ is writable
var info = await nomad.fs.getInfo('hyper://private/')
console.log(info.writable) // true
```
