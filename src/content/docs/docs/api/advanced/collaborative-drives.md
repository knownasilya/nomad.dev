---
title: Collaborative Drives
description: Multi-writer drives — how they work, how to invite writers, and how to build collaborative apps with nomad.fs.
---

Every Drive in Nomad is an [Autobase](https://github.com/holepunchto/autobase): multi-writer-capable,
with a URL that stays the same for the drive's entire life. Multiple Writers can append; reads are
linearised across all writers into an eventually-consistent view.

"Collaborative" is a **policy flag**, not a separate kind of drive. A drive is **locked (single-writer)
by default** and can be **unlocked without changing its URL** — so a drive can start private and open
up to collaborators later. All of this goes through the single [`nomad.fs`](/docs/api/apis/nomad.fs/) API.

---

## Creating a drive

```javascript
// Locked / single-writer (the default)
var drive = await nomad.fs.createDrive({ title: 'My Notes' })

// …or collaborative from the start (accepts writer requests)
var drive = await nomad.fs.createCollaborativeDrive({
  title: 'My Forum',
  type: 'walled.garden/forum'
})
console.log(drive.url) // hyper://abc123.../ — permanent

// Unlock an existing drive later — SAME URL
await nomad.fs.configure(drive.url, { collaborative: true })
```

Anyone with the URL can read. Write access must be explicitly granted (below).

---

## Reading and writing

```javascript
// Write a file (only Writers can do this)
await drive.put('/posts/hello.json', JSON.stringify({
  type: 'walled.garden/post',
  title: 'Hello world',
  body: 'My first post!',
  createdAt: new Date().toISOString()
}))

// Read it back (get(path, 'json') parses for you)
var post = await drive.get('/posts/hello.json', 'json')

// List files
var entries = await drive.list('/posts/')
```

Validate data before writing with `nomad.schemas`:

```javascript
var result = nomad.schemas.validate('walled.garden/post', postData)
if (!result.success) throw new Error(result.error)
await drive.put('/posts/my-post.json', JSON.stringify(result.data))
```

---

## Inviting Writers

There are two ways to grant write access: **invite links** (owner-initiated) and **access requests**
(stranger-initiated). Both go through the same approval flow, and either one unlocks the drive.

### Owner-initiated: invite link

```javascript
// Owner creates a reusable invite link (this unlocks the drive so requests are accepted)
var inviteUrl = await drive.createInvite({ multiUse: true })
// Share inviteUrl with whoever you want to invite
```

The recipient opens the invite URL in Nomad, which triggers:

```javascript
var { writerKey } = await nomad.fs.claimInvite(inviteUrl, {
  profileUrl: 'hyper://my-profile/'
})
```

That creates a **pending request** on the owner's side. The owner approves it:

```javascript
var requests = await drive.listRequests()
// [{ writerKey: '...', profileUrl: 'hyper://...', requestedAt: '...' }]

await drive.approveRequest(requests[0].writerKey)
```

### Stranger-initiated: access request

```javascript
// Anyone can request write access to a collaborative (unlocked) drive
var { writerKey } = await nomad.fs.requestAccess(driveUrl, {
  profileUrl: 'hyper://my-profile/'
})
// The owner sees this in listRequests()
```

Requests are **never auto-accepted** — the owner is always the gate. A **locked** drive ignores
requests entirely (it doesn't even advertise the request channel), so check
`(await nomad.fs.getInfo(url)).collaborative` if you need to know whether a drive is open.

---

## Resolving author identity

Each write can carry the author's `writerKey`. To show a name and avatar, resolve their Profile Drive:

```javascript
var writers = await drive.listWriters()
// [{ writerKey: '...', profileUrl: 'hyper://...' }]

for (const w of writers) {
  var profile = await nomad.fs.getInfo(w.profileUrl)
  console.log(profile.title, profile.description)
}
```

---

## Revoking access

```javascript
// Remove a writer (owner only)
await drive.removeWriter(writerKey)
```

---

## Full example: a forum post

```javascript
const drive = nomad.fs.drive(location.href)

async function createPost(title, body, category) {
  var myProfileUrl = await getMyProfileUrl() // read from address book
  var writers = await drive.listWriters()
  var myWriter = writers.find(w => w.profileUrl === myProfileUrl)

  var post = {
    type: 'walled.garden/post',
    title,
    body,
    category,
    createdAt: new Date().toISOString(),
    author: { url: myProfileUrl, writerKey: myWriter?.writerKey }
  }

  var valid = nomad.schemas.validate('walled.garden/post', post)
  if (!valid.success) throw new Error(valid.error)

  var slug = `${Date.now()}-${title.toLowerCase().replace(/\s+/g, '-')}`
  await drive.put(`/posts/${slug}.json`, JSON.stringify(valid.data, null, 2))
}
```
