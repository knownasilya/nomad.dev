---
title: Profile Drives
description: How to create and use walled.garden/person drives for public social identity.
---

A **Profile Drive** is a regular Hyperdrive with `type: "walled.garden/person"` in its `/index.json`. It represents a user's public social identity — their name, avatar, bio, and links. It is distinct from the Root Drive (which is private).

Nomad recognises Profile Drives automatically: the browser toolbar shows a person icon, and the drive is labelled "This is your profile site."

---

## The person schema

A Profile Drive's `/index.json` must include at minimum a `type` and `title`:

```json
{
  "type": "walled.garden/person",
  "title": "Jane Doe",
  "description": "Designer and developer working on P2P software.",
  "thumb": "thumb.png",
  "links": [
    { "label": "Mastodon", "href": "https://mastodon.social/@jane" },
    { "label": "GitHub", "href": "https://github.com/janedoe" }
  ]
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"walled.garden/person"` | ✓ | Identifies this as a Profile Drive |
| `title` | String (max 280) | ✓ | Display name |
| `description` | String (max 1000) | | Short bio |
| `thumb` | String | | Path to avatar image (e.g. `"thumb.png"`) |
| `links` | Array of `{ label, href }` | | Social links |

---

## Reading another user's profile

```javascript
// If you have someone's profile URL:
var profile = await nomad.fs.drive('hyper://abc123.../').getInfo()
console.log(profile.title, profile.description)

// Or read the full index.json for links:
var manifest = await nomad.fs.drive('hyper://abc123../')
  .readFile('/index.json')
  .then(JSON.parse)

for (const link of manifest.links || []) {
  console.log(link.label, link.href)
}
```

---

## Multi-device identity: writer-keys.json

When you use a Collaborative Drive from multiple devices, each device has its own writer key. Publish your writer keys in your Profile Drive so other apps can confirm that multiple keys belong to you:

**`/.data/walled.garden/writer-keys.json`**

```json
{
  "type": "walled.garden/writer-keys",
  "keys": [
    "device1writerkeyhex...",
    "device2writerkeyhex..."
  ]
}
```

Update this file whenever you add a new device to a Collaborative Drive:

```javascript
var myProfile = nomad.fs.drive('hyper://my-profile/')
var existing = await myProfile.readFile('/.data/walled.garden/writer-keys.json')
  .then(JSON.parse).catch(() => ({ type: 'walled.garden/writer-keys', keys: [] }))

existing.keys.push(newWriterKey)

var valid = nomad.schemas.validate('walled.garden/writer-keys', existing)
if (!valid.success) throw new Error(valid.error)

await myProfile.writeFile(
  '/.data/walled.garden/writer-keys.json',
  JSON.stringify(valid.data, null, 2)
)
```

---

## Resolving author identity from a Collaborative Drive

Collaborative Drive writers are listed via `nomad.fs`. Each entry includes a `profileUrl`:

```javascript
var writers = await nomad.fs.drive(driveUrl).listWriters()

for (const { writerKey, profileUrl } of writers) {
  if (!profileUrl) continue
  var profile = await nomad.fs.drive(profileUrl).getInfo()
  console.log(`${profile.title} writes with key ${writerKey}`)
}
```

---

## Followers are private by design

If you publish a Profile Drive (or a Blog) and people follow it, **who follows you is not exposed** — because there is no follower list anywhere to expose. Following is *subscriber-side*: a follower adds your URL to their own [`walled.garden/follows`](/docs/api/developers/walled-garden-schemas/#follows) record in *their* private Root Drive, and their [Reader](/docs/templates/blog/) aggregates it. Your Drive is never written to and never learns about it. The follow relationship is scattered across each follower's private drive and collected nowhere.

This is a property of P2P Drives in general, not of the Profile template — any public readable Drive (including a custom one with its own schema and reader app) inherits the same un-enumerability. What's template-specific is only the *rendering*: the built-in Reader understands `walled.garden/feed`; a custom convention needs its own reader.

Two things to keep in mind:

- **Don't build the thing that breaks it.** A public "followers" list or subscriber count *is* the aggregate you were getting privacy from not having. There is deliberately no `walled.garden/followers` schema. If you genuinely need a private-to-you follower count, that requires a separate encrypted follow-inbox — not a published record.
- **The network layer is a separate question.** Replicating a Drive announces the peer on that Drive's DHT discovery topic, so a third party with your URL can observe *connections* (by IP), independent of Drive type. The privacy claim above is that no follower list exists — it is not a claim that replication itself is unobservable.

See ADR-0013 for the full decision and scope.

---

See also: [walled.garden schemas](/docs/api/developers/walled-garden-schemas/)
