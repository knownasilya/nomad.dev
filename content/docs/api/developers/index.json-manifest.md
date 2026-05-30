---
title: Index.json Manifest
---

Every hyperdrive contains a manifest file at `/index.json` that stores metadata like title and description.

## Key Fields

**title** String. A string identifying the drive's name.

**description** String. A string describing the drive's contents.

**forkOf** String. The URL of a drive that this one has forked from.

**csp** String. The Content-Security Policy header to apply across all drive resources.

## Example

```json
{
  "title": "My Hyper Website",
  "description": "An example hyperdrive"
}
```

The schema remains under development and subject to change.
