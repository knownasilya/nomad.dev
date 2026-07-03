---
title: walled.garden Schemas
description: Social data schemas for Nomad — Zod-backed, Standard Schema compliant.
---

`walled.garden` schemas define the shape of social data stored in Drives. They are [Zod](https://zod.dev)-backed, [Standard Schema](https://standardschema.dev) compliant, and exposed to template apps via [`nomad.schemas`](/docs/api/apis/nomad.schemas/).

These schemas are **content conventions** — apps store `walled.garden` data wherever makes sense (there is no enforced directory path). The type string in each record identifies the schema.

---

## person

Identifies a Drive as a public social profile. Lives in the drive's `/index.json`.

See the [Profile Drives guide](/docs/api/developers/profile-drives/) for full documentation.

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
  "summary": "A short teaser shown in feed lists.",
  "body": "This is the full post content.",
  "category": "general",
  "tags": ["p2p", "hypercore"],
  "createdAt": "2026-06-15T12:00:00.000Z",
  "author": { "url": "hyper://profile/", "writerKey": "abc..." }
}
```

| Field | Type | Required |
|-------|------|----------|
| `type` | `"walled.garden/post"` | ✓ |
| `title` | String (max 280) | ✓ |
| `createdAt` | ISO 8601 datetime | ✓ |
| `summary` | String (max 560) | |
| `body` | String | |
| `category` | String (max 100) | |
| `tags` | Array of strings | |
| `draft` | Boolean | |
| `updatedAt` | ISO 8601 datetime | |
| `author.url` | Profile Drive URL | |
| `author.writerKey` | Hex string | |

`body` is optional. When a post is stored as its own directory (`/posts/<slug>/post.json`), the body can instead live alongside it as `index.md`, `index.html`, or `index.txt` — the file extension determines how it renders, and the post stays readable even without a custom frontend. `draft: true` hides a post from feeds and readers.

---

## feed

Declares a drive as a **feed** — a blog or other stream of items that a [Reader](/docs/templates/blog/) can subscribe to. Lives in the drive's `/index.json`.

```json
{
  "type": "walled.garden/feed",
  "title": "Ilya's Blog",
  "description": "Notes on peer-to-peer software.",
  "author": { "url": "hyper://my-profile/" },
  "itemsPath": "/posts/",
  "itemType": "walled.garden/post",
  "language": "en",
  "icon": "icon.png"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `"walled.garden/feed"` | ✓ | Identifies this drive as a feed |
| `title` | String (max 280) | ✓ | Channel title |
| `description` | String (max 1000) | | Channel description |
| `author.url` | Profile Drive URL | | Identity behind the feed |
| `itemsPath` | String | | Directory holding items (default `/posts/`) |
| `itemType` | String | | Schema type of items (default `walled.garden/post`) |
| `language` | String | | BCP-47 language tag, e.g. `en` |
| `icon` | String | | Path within the drive to a feed icon |

A **blog** is a feed whose items are posts: each post is a directory under `itemsPath` (e.g. `/posts/2026-06-15-hello/`) holding a `post.json` plus an `index.md` (or `index.html`/`index.txt`) body. See the [Blog template](/docs/templates/blog/).

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

Use `nomad.schemas.validate()` to validate before writing:

```javascript
var result = nomad.schemas.validate('walled.garden/post', postData)
if (!result.success) {
  console.error(result.error)
} else {
  await drive.put('/posts/my-post.json', JSON.stringify(result.data, null, 2))
}
```

---

## About the namespace

These schemas are inspired by [unwalled.garden](https://github.com/pfrazee/unwalled.garden) but are independently maintained and not compatible with the original spec. The `walled.garden` namespace signals that this is Nomad's own evolution of those ideas.
