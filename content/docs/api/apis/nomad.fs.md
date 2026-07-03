---
title: nomad.fs
description: The single filesystem API for reading, writing, and managing hyper:// drives.
---

`nomad.fs` is **the** API for `hyper://` drives — reading and writing files, drive lifecycle
(create/fork/configure), and multi-writer collaboration, all through one surface. Every drive is an
[Autobase](/docs/api/advanced/collaborative-drives/) (multi-writer-capable, with a stable URL for life).

`stat()` returns real `mtime`, `ctime`, and `size`, and `get(path, 'json')`
parses JSON for you.

## API

### nomad.fs.drive(url)

Create a scoped drive handle. Its methods accept paths relative to the drive rather than full URLs.

```javascript
var drive = nomad.fs.drive('hyper://abc123../')
await drive.list('/')
```

Returns an **FsDrive** instance with all the methods below (scoped to the drive).

Every method also exists as a top-level, URL-first helper — e.g. `nomad.fs.readFile('hyper://abc123../index.html')`.

---

### Reading

* **getInfo(\[opts\])** — Drive info: `{ key, url, writable, title, description, type, collaborative }`. `collaborative` is whether the drive currently accepts writer-access requests (see [Collaboration](#collaboration)).
* **stat(path\[, opts\])** — `{ isFile(), isDirectory(), size, mtime, ctime, metadata }`. Real timestamps.
* **entry(path\[, opts\])** — The raw view entry `{ key, value: { blob, metadata } }`.
* **get(path\[, opts\])** — Read a file. `opts.encoding` is one of `utf8` (default), `binary`, `base64`, `hex`, or `json` (parses and returns the object).
* **readFile(path\[, opts\])** — Alias of `get`.
* **list(path\[, opts\])** — Entries under `path` (a flat, recursive key listing).
* **readdir(path\[, opts\])** — Immediate children. Pass `{ includeStats: true }` for `{ name, stat }`.
* **query(path\[, opts\])** — Backend-agnostic listing under a path/prefix.
* **diff(other\[, opts\])** — Changes vs another version (Hyperdrive only; empty on Autobase for now).

```javascript
var drive = nomad.fs.drive('hyper://abc123../')
var manifest = await drive.get('/index.json', 'json')   // parsed object
var st = await drive.stat('/index.json')                // st.mtime, st.ctime, st.size
var html = await drive.readFile('/index.html')
var posts = await drive.query('/posts/')
```

### Writing

* **put(path, data\[, opts\])** — Write a file. `data` may be a string, Buffer, or (with `encoding:'json'`) an object.
* **writeFile(path, data\[, opts\])** — Alias of `put`.
* **del(path\[, opts\])** / **unlink(path\[, opts\])** — Delete a file.
* **mkdir(path\[, opts\])** / **rmdir(path\[, opts\])** — Create / remove a directory.
* **copy(src, dst\[, opts\])** / **rename(src, dst\[, opts\])** — Works within and across drives.

```javascript
var drive = nomad.fs.drive('hyper://abc123../')
await drive.writeFile('/notes.txt', 'hello')
await drive.put('/data.json', { hi: true }, { encoding: 'json' })
await drive.rename('/notes.txt', '/notes-2.txt')
await drive.del('/data.json')
```

Writes require the drive to be writable — a Hyperdrive you own, or an Autobase drive you are a writer of.

### Watching

### nomad.fs.watch(url\[, pathSpec\]\[, onChanged\])

Watch a drive (or a path prefix) for changes. Returns an `EventTarget` that emits `changed`.

```javascript
var drive = nomad.fs.drive('hyper://abc123../')
drive.watch('/posts/', () => rerender())
// or url-first:
nomad.fs.watch('hyper://abc123../', () => rerender())
```

### Drive lifecycle

These are top-level `nomad.fs` methods. `createDrive`/`createCollaborativeDrive`/`forkDrive` return a scoped **FsDrive**.

* **nomad.fs.createDrive(\[opts\])** — Create a new drive. `opts`: `{ title, description, collaborative }`. Locked / single-writer unless `collaborative: true`.
* **nomad.fs.createCollaborativeDrive(\[opts\])** — Same as `createDrive` but defaults to accepting writers; equivalent to `createDrive({ ..., collaborative: true })`.
* **nomad.fs.forkDrive(url\[, opts\])** — Fork an existing drive into a new one.
* **nomad.fs.configure(url, settings\[, opts\])** — Update the drive manifest (`title`, `description`, `type`, `thumb`, `links`) and/or `collaborative` (see below). Also on the scoped handle as `drive.configure(settings)`.
* **nomad.fs.isCollaborativeDrive(url)** — Boolean.

```javascript
// Every new drive is a multi-writer-capable Autobase, but "collaborative" is a policy flag.
var drive = await nomad.fs.createDrive({ title: 'Notes' })          // locked (single-writer)
await nomad.fs.configure(drive.url, { collaborative: true })        // unlock later — SAME URL
```

### Collaboration {#collaboration}

Every drive is an Autobase and can gain writers **without its URL ever changing**. Whether it *accepts*
writers is a policy flag, `collaborative`, **locked by default**:

* A **locked** drive ignores writer-access requests entirely (it doesn't advertise the request channel).
* **Unlock** it any time via `configure(url, { collaborative: true })` — or automatically by inviting/approving a writer. The URL is unchanged, so a drive can start private and open up later.
* The owner is always the sole gate on who becomes a writer; `collaborative` just controls whether *unsolicited* requests are accepted.

**Writer management** (owner-side unless noted; also available on the scoped `drive` handle):

* **createInvite(url\[, opts\])** — Returns an invite URL to share. Unlocks the drive.
* **claimInvite(inviteUrl\[, opts\])** — Recipient redeems an invite to request write access.
* **requestAccess(url\[, opts\])** — Ask an already-collaborative drive for write access.
* **listRequests(url)** — Pending requests `[{ writerKey, profileUrl }]`.
* **watchRequests(url\[, onChanged\])** — `EventTarget` emitting `changed` when a request arrives.
* **approveRequest(url, writerKey\[, opts\])** / **denyRequest(url, writerKey)** — Owner accepts/rejects.
* **removeWriter(url, writerKey)** — Revoke a writer.
* **listWriters(url)** — `[{ writerKey, profileUrl }]`.

```javascript
var drive = nomad.fs.drive('hyper://abc123../')
var invite = await drive.createInvite()          // share this; drive is now collaborative
// …recipient: await nomad.fs.claimInvite(invite)
await drive.approveRequest(writerKey)
```

### Import / export

* **importFromFilesystem(opts)** / **exportToFilesystem(opts)** / **exportToDrive(opts)** — Bulk copy between a drive and the local filesystem (or another drive).

## Notes

* **Nomad `hyper://` is a Nomad dialect.** Nomad drives are Autobase-backed and are not readable by
  generic `hyper://` clients.
