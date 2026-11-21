---
title: nomad.capabilities
description: This API creates temporary URLs for securely sharing hyperdrive access between applications
slug: docs/api/apis/nomad.capabilities
---

"Capabilities" are opaque URLs which map to hyperdrives while hiding the URL. The name comes from the [capabilities security model](https://en.wikipedia.org/wiki/Capability-based_security).

The purpose of capability URLs is to provide security primitives for constrained access to a hyperdrive. The default security model of a hyperdrive is that the pubkey URL provides read access locally and over the network. Because the pubkey is unchangeable, it's impossible to revoke access to a pubkey once it's acquired. The "capability URLs" are local mappings from random IDs to the hyperdrive pubkeys, and therefore can provide read access without giving away the pubkey.

Applications can share capability URLs with other applications (e.g. in an `<iframe>`) to provide temporary and constrained access.

A hyperdrive capability URL uses a special `.cap` pseudo-TLD. They are formed as `hyper://{random-base32-id}.cap/`.

Capability URLs are local to this computer. They are not networked and therefore cannot be shared with other users. The ones a page makes with `create()` are stored in-memory and will be "destroyed" when the browser restarts; they map to a key and a drive-version, not to subfolders or files.

A capability can also cover **one file or folder** instead of a whole drive. A web page gets one of those whenever the user picks something in [`nomad.shell.selectFileDialog`](/docs/api/apis/nomad.shell/#what-a-page-gets), and a whole-drive one when the user chooses "Share read-only instead" in [`selectDriveDialog`](/docs/api/apis/nomad.shell/#nomadshellselectdrivedialogopts). A picked capability keeps the item's own path in its URL (`hyper://<token>.cap/notes/a.md`), reads outside what it covers are refused, and it can reach the user's private drive. Unlike the ones a page makes, picked capabilities are kept across restarts, until the user removes them in the site's Permissions or the page deletes them.

A capability URL gives **read access only**. Through [`nomad.fs`](/docs/api/apis/nomad.fs/) you can read with it (`getInfo`, `stat`, `get`, `readFile`, `list`, `readdir`, plus `diff` and `watch` for a whole-drive one) on any drive, single-writer or collaborative. Writes, writer management, Drafts and other whole-drive calls through a capability are refused. `getInfo` on a capability reports the capability URL as its `key` and `url`, and `writable: false`, so the drive's real key stays hidden.

Only the page (origin) that created a capability can modify or delete it.

## API

### nomad.capabilities.create(targetUrl)

Create a new capability mapping to the target URL.

* **targetUrl** String. The URL which the capability will represent.
* Returns **Promise&lt;String&gt;**. The capability URL.

```javascript
var capUrl = await nomad.capabilities.create('hyper://12345..af')
await nomad.fs.drive(capUrl).readdir('/')
```

### nomad.capabilities.modify(capUrl, targetUrl)

Modify an existing capability's mapping. A capability the user picked can't be modified.

* **capUrl** String. The URL of the capability to modify.
* **targetUrl** String. The URL which the capability will represent.
* Returns **Promise&lt;Void&gt;**.

```javascript
await nomad.capabilities.modify(capUrl, 'hyper://fedcb..21')
await nomad.fs.drive(capUrl).readdir('/')
```

### nomad.capabilities.delete(capUrl)

Delete a capability, one the page made or one the user picked for it. Future operations against the URL will fail.

* **capUrl** String. The URL of the capability to modify.
* Returns **Promise&lt;Void&gt;**.

```javascript
await nomad.capabilities.delete(capUrl)
```

### nomad.capabilities.list()

List this page's capabilities: the ones it made and the files and folders the user picked for it. The drive's key is never included.

* Returns **Promise&lt;Array&lt;Object&gt;&gt;**
  * **url** String. The capability URL.
  * **path** String. What it covers: `/` for a whole drive, `/dir/` for a folder, `/file` for one file.
  * **picked** Boolean. True when the user shared it (the file picker, or the drive dialog's read-only share).
  * **title** String. The picked item's name.
  * **createdAt** Number. When it was made (ms).

```javascript
var caps = await nomad.capabilities.list()
var picked = caps.filter(c => c.picked)
```
