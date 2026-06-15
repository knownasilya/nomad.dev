---
title: walled.garden Schemas
description: Social data schemas for Nomad — Zod-backed, Standard Schema compliant.
---

`walled.garden` schemas define the shape of social data stored in Drives. They are [Zod](https://zod.dev)-backed, [Standard Schema](https://standardschema.dev) compliant, and exposed to template apps via [`beaker.schemas`]({{< relref "/docs/api/apis/beaker.schemas" >}}).

These schemas are **content conventions** — apps store `walled.garden` data wherever makes sense (there is no enforced directory path). The type string in each record identifies the schema.

---

## person

Identifies a Drive as a public social profile. Lives in the drive's `/index.json`.

See the [Profile Drives guide]({{< relref "/docs/api/developers/profile-drives" >}}) for full documentation.

```json
{
  "type": "walled.garden/person",
  "title": "Jane Doe",
  "description": "Bio here.",
  "thumb": "thumb.png",
  "links": [{ "label": "GitHub", "href": "https://github.com/janedoe" }]
}
```

---

## post

A titled post — the building block of a forum or blog.

```json
{
  "type": "walled.garden/post",
  "title": "Hello world",
  "body": "This is the full post content.",
  "category": "general",
  "createdAt": "2026-06-15T12:00:00.000Z",
  "author": { "url": "hyper://profile/", "writerKey": "abc..." }
}
```

| Field | Type | Required |
|-------|------|----------|
| `type` | `"walled.garden/post"` | ✓ |
| `title` | String (max 280) | ✓ |
| `body` | String | ✓ |
| `createdAt` | ISO 8601 datetime | ✓ |
| `category` | String (max 100) | |
| `updatedAt` | ISO 8601 datetime | |
| `author.url` | Profile Drive URL | |
| `author.writerKey` | Hex string | |

---

## comment

A reply to a post or any URL-addressable resource.

```json
{
  "type": "walled.garden/comment",
  "topic": "hyper://drive/posts/hello.json",
  "replyTo": "hyper://drive/comments/hello/prev.json",
  "body": "Great post!",
  "createdAt": "2026-06-15T12:05:00.000Z"
}
```

| Field | Type | Required |
|-------|------|----------|
| `type` | `"walled.garden/comment"` | ✓ |
| `topic` | URL of the resource being commented on | ✓ |
| `body` | String | ✓ |
| `createdAt` | ISO 8601 datetime | ✓ |
| `replyTo` | URL of the parent comment | |
| `updatedAt` | ISO 8601 datetime | |

---

## status

A short broadcast, like a social media post.

```json
{
  "type": "walled.garden/status",
  "body": "Just shipped multi-writer support!",
  "createdAt": "2026-06-15T10:00:00.000Z"
}
```

---

## bookmark

A saved or shared link.

```json
{
  "type": "walled.garden/bookmark",
  "href": "https://example.com/article",
  "title": "Great article",
  "description": "An optional note.",
  "tags": ["reading", "tech"],
  "createdAt": "2026-06-15T09:00:00.000Z"
}
```

---

## follows

A list of Drive URLs the user subscribes to.

```json
{
  "type": "walled.garden/follows",
  "urls": ["hyper://abc.../", "hyper://def.../"]
}
```

---

## reaction

An emoji or phrase reaction to a resource.

```json
{
  "type": "walled.garden/reaction",
  "topic": "hyper://drive/posts/hello.json",
  "phrases": ["thumbs up", "heart"]
}
```

---

## vote

An upvote or downvote on a resource.

```json
{
  "type": "walled.garden/vote",
  "topic": "hyper://drive/posts/hello.json",
  "vote": 1,
  "createdAt": "2026-06-15T11:00:00.000Z"
}
```

`vote` must be `1` (upvote) or `-1` (downvote).

---

## writer-keys

A list of Autobase writer keypairs belonging to the same person. Published in a Profile Drive to enable multi-device identity resolution.

```json
{
  "type": "walled.garden/writer-keys",
  "keys": ["device1hex...", "device2hex..."]
}
```

---

## Validating data

Use `beaker.schemas.validate()` to validate before writing:

```javascript
var result = beaker.schemas.validate('walled.garden/post', postData)
if (!result.success) {
  console.error(result.error)
} else {
  await drive.put('/posts/my-post.json', JSON.stringify(result.data, null, 2))
}
```

---

## About the namespace

These schemas are inspired by [unwalled.garden](https://github.com/pfrazee/unwalled.garden) but are independently maintained and not compatible with the original spec. The `walled.garden` namespace signals that this is Nomad's own evolution of those ideas.
