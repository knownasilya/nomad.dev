---
title: Private Drive
description: Your personal on-device drive, accessible at hyper://private/.
---

Every Nomad user has a **private drive** — your personal on-device storage, created automatically on
first launch and persisted across sessions. It holds data that should live on your machine, like
bookmarks and your address book.

Like every drive in Nomad it is an [Autobase](/docs/api/advanced/collaborative-drives/), reached
through the single [`nomad.fs`](/docs/api/apis/nomad.fs/) API. What makes it special is only that it
is addressed by the well-known URL `hyper://private/` and is not published to the public network.

## Who can open it

The private drive holds your address book, your AI chat sessions and your list of drives. So it is
**closed to pages by default**. Each Space has its own private drive, and the same rules apply to
all of them.

- **You** can open `hyper://private/` in the address bar.
- **Nomad's own pages** (`nomad://`) and **pages served from the private drive itself** can read
  and write all of it.
- **Any other page** (a drive app, a website) gets an error when it tries to read or write it,
  unless you allow it one file or one folder:
  - The first `nomad.fs` read or write of a path shows a prompt that names the path, for example
    *Read `hyper://private/address-book.json` in your private drive*.
  - **Allow for** picks how long the page keeps it: 1 hour (the default), 1 day, 1 week, 1 month or
    3 months. The page can't choose the length, and a grant belongs to that one site.
  - A read never lets the page write. A write grant also allows reads. A folder (a path that ends
    in `/`) covers everything inside it.
  - A page can never get the whole drive. Nomad never allows the root `/`, or a call that acts on
    the whole drive: `getInfo`, `watch`, `readdir('/')`, `forkDrive`, `configure`, writer
    management and Draft Mode.
  - The site's **Permissions** in site info lists what it can use under **Your private drive**, with
    when each ends. The × ends one now; the page's next call asks again.

```javascript
// From a drive app: Nomad asks the user before this read, and it can fail
try {
  var text = await nomad.fs.readFile('hyper://private/notes/today.md')
} catch (e) {
  // The user said no, or the page asked for something it can never get
}
```

## Store your app's data somewhere else

Do not build an app on top of the private drive. Every grant ends, and the user can end one at any
time. Use one of these instead:

- **The user's profile:** ask for it with
  [`nomad.shell.selectDriveDialog`](/docs/api/apis/nomad.shell/)
  (`{ tag: 'contact', writable: true }`), then keep the URL in `localStorage`. Do not read
  `/address-book.json`.
- **Data the user owns:** let the user pick or create a drive with `nomad.shell.selectDriveDialog`,
  then write to it with `nomad.fs`. The user approves writes to that drive once.
- **Small settings for one device:** `localStorage`.

## Properties

| Property | Value |
|---|---|
| URL | `hyper://private/` (one per Space) |
| Writable | By you, and by Nomad's own pages |
| Open to other pages | No. One path at a time, for as long as you allow it |
| Networked | Not published to the public swarm |
| Persisted | Yes — survives browser restarts |

## Common uses

Nomad keeps these in the private drive:

- Bookmarks and pins (`/bookmarks/`, `/nomad/pins.json`)
- The address book (`/address-book.json`)
- AI Sidebar chat sessions (`/.ai-chat/`)
- Data that `nomad://` pages keep across sessions
