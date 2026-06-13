---
title: Index.json Manifest
---

Every hyperdrive contains a manifest file at `/index.json` that stores metadata about the drive.

## Fields

**title** String. A human-readable name for the drive.

**description** String. A short description of the drive's contents.

**type** String. A type identifier that applications can use to interpret the drive's purpose. Common values:
- `"unwalled.garden/person"` — a personal profile drive
- `"unwalled.garden/website"` — a general website

**thumb** String. Path (within the drive) to the thumbnail image. Supports any image format. Defaults to `/thumb` if not set.

```json
{
  "thumb": "thumb.png"
}
```

The explorer sidebar and drive view use this image to represent the drive. If omitted, the browser looks for a file named `/thumb` at the drive root.

**author** Object. Information about the drive's author.
- **url** String. The hyper:// URL of the author's profile drive.

```json
{
  "author": { "url": "hyper://abc123.../" }
}
```

**forkOf** String. The hyper:// URL of the drive this one was forked from.

**links** Object. A map of named link arrays, used for associating related resources.

```json
{
  "links": {
    "license": [{ "href": "https://creativecommons.org/licenses/by/4.0/" }]
  }
}
```

**csp** String. A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header value applied to all pages served from the drive.

## Full example

```json
{
  "title": "My Hyper Website",
  "description": "A personal site and blog",
  "type": "unwalled.garden/website",
  "thumb": "thumb.png",
  "author": { "url": "hyper://abc123...ef/" },
  "links": {
    "license": [{ "href": "https://creativecommons.org/licenses/by/4.0/" }]
  },
  "csp": "default-src 'self'"
}
```
