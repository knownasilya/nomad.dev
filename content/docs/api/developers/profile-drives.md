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

See also: [walled.garden schemas](/docs/api/developers/walled-garden-schemas/)
