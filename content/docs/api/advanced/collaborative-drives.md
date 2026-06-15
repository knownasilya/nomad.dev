---
title: Collaborative Drives
description: Multi-writer drives backed by Autobase — how to create them, invite writers, and build collaborative apps.
---

A **Collaborative Drive** is a multi-writer Drive backed by [Autobase](https://github.com/holepunchto/autobase). Multiple Writers can append to it; reads are linearised across all writers into an eventually-consistent view. The API mirrors `beaker.hyperdrive` so building a collaborative app is a near-drop-in rewrite of a single-writer one.

See the [beaker.autobase API reference](/docs/api/apis/beaker.autobase/) for the full method list.

---

## Creating a Collaborative Drive

```javascript
var drive = await beaker.autobase.createCollaborativeDrive({
  title: 'My Forum',
  type: 'walled.garden/forum'
})
console.log(drive.url) // hyper://abc123.../
```

Share `drive.url` with others — anyone with the URL can read. Write access must be explicitly granted.

---

## Reading and Writing

The read/write API is identical to `beaker.hyperdrive`:

```javascript
// Write a file (only Writers can do this)
await drive.put('/posts/hello.json', JSON.stringify({
  type: 'walled.garden/post',
  title: 'Hello world',
  body: 'My first post!',
  createdAt: new Date().toISOString()
}))

// Read it back
var raw = await drive.get('/posts/hello.json')
var post = JSON.parse(raw)

// List files
var entries = await drive.list('/posts/')
```

Validate data before writing using `beaker.schemas`:

```javascript
var result = beaker.schemas.validate('walled.garden/post', postData)
if (!result.success) throw new Error(result.error)
await drive.put('/posts/my-post.json', JSON.stringify(result.data))
```

---

## Inviting Writers

There are two ways to grant write access: **invite links** (owner-initiated) and **access requests** (stranger-initiated). Both go through the same approval flow.

### Owner-initiated: invite link

```javascript
// Owner creates a reusable invite link
var inviteUrl = await drive.createInvite({ multiUse: true })
// Share inviteUrl with whoever you want to invite
```

The recipient opens the invite URL in Nomad, which triggers:

```javascript
// Called automatically when the invite URL is opened, or manually:
var { writerKey } = await beaker.autobase.claimInvite(inviteUrl, {
  profileUrl: 'hyper://my-profile/'
})
```

This creates a **pending request** on the owner's side. The owner approves it:

```javascript
var requests = await drive.listRequests()
// [{ writerKey: '...', profileUrl: 'hyper://...', requestedAt: '...' }]

await drive.approveRequest(requests[0].writerKey)
```

### Stranger-initiated: access request

```javascript
// Anyone can request write access
var { writerKey } = await beaker.autobase.requestAccess(driveUrl, {
  profileUrl: 'hyper://my-profile/'
})
// The owner will see this in listRequests()
```

---

## Your Own Devices

Device-linking uses the same flow. On your second device, open the invite URL from your first device and claim it. The second device's writer key gets added to the drive — both devices can now write, and their authorship is linked via the shared `profileUrl`.

To verify that two writer keys belong to the same person, check the Profile Drive's `/.data/walled.garden/writer-keys.json`:

```javascript
var writerKeys = await beaker.hyperdrive.drive(profileUrl).readFile(
  '/.data/walled.garden/writer-keys.json'
).then(JSON.parse)
// { type: 'walled.garden/writer-keys', keys: ['abc...', 'def...'] }
```

---

## Resolving Author Identity

Each write includes the author's `writerKey`. To show their name and avatar, resolve their Profile Drive:

```javascript
var writers = await drive.listWriters()
// [{ writerKey: '...', profileUrl: 'hyper://...' }]

for (const w of writers) {
  var profile = await beaker.hyperdrive.drive(w.profileUrl).getInfo()
  console.log(profile.title, profile.description)
}
```

---

## Revoking Access

```javascript
// Remove a writer (owner only)
await drive.removeWriter(writerKey)
```

---

## Full Example: Forum Post

```javascript
const drive = beaker.autobase.collaborativeDrive(location.href)

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

  var valid = beaker.schemas.validate('walled.garden/post', post)
  if (!valid.success) throw new Error(valid.error)

  var slug = `${Date.now()}-${title.toLowerCase().replace(/\s+/g, '-')}`
  await drive.put(`/posts/${slug}.json`, JSON.stringify(valid.data, null, 2))
}
```
