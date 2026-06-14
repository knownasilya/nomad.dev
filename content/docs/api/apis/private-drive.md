---
title: Private Drive
description: The private drive is your personal local Hyperdrive, accessible at hyper://private/.
---

Every Nomad user has a **private drive** — a [Hyperdrive](/docs/api/apis/beaker.hyperdrive/) that is stored locally and never replicated to the network. It is your personal on-device storage for data that should only ever live on your machine.

The private drive is accessible at the well-known URL `hyper://private/` and is created automatically on first launch. It persists across sessions.

## Accessing the private drive

Navigate to it directly in the address bar:

```
hyper://private/
```

Or access it from JavaScript using the `beaker.hyperdrive` API:

```javascript
var privateDrive = beaker.hyperdrive.drive('hyper://private/')

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
| Networked | No — never announced or replicated to peers |
| Persisted | Yes — survives browser restarts |

## Common uses

The private drive is a good place to store:

- Personal notes and drafts
- Bookmarks and pins (`/bookmarks/`, `/beaker/pins.json`)
- App configuration and preferences
- Data created by `beaker://` pages that needs to persist across sessions

## Relationship to Hyperdrives

The private drive is a standard Hyperdrive v11 instance. All methods on [`beaker.hyperdrive`](/docs/api/apis/beaker.hyperdrive/) work with it. The only thing that makes it special is that Nomad does not join the Hyperswarm for it — it exists only on your device.

```javascript
// check that hyper://private/ is writable
var info = await beaker.hyperdrive.drive('hyper://private/').getInfo()
console.log(info.writable) // true
```
