---
title: nomad.autobase (removed)
description: nomad.autobase has been replaced by the unified nomad.fs API.
---

`nomad.autobase` has been **removed**. Every drive in Nomad is now an Autobase, so its read/write and
writer-management methods all live on the single [`nomad.fs`](/docs/api/apis/nomad.fs/) API.

```javascript
// before
var drive = nomad.autobase.collaborativeDrive(url)
// after
var drive = nomad.fs.drive(url)
```

- `nomad.autobase.collaborativeDrive(url)` → `nomad.fs.drive(url)`
- `nomad.autobase.createCollaborativeDrive(...)` → `nomad.fs.createCollaborativeDrive(...)`
- writer management (`createInvite`, `claimInvite`, `requestAccess`, `listRequests`, `approveRequest`,
  `denyRequest`, `removeWriter`, `listWriters`) → the same methods on `nomad.fs`

See **[nomad.fs](/docs/api/apis/nomad.fs/)** and the
[Collaborative Drives guide](/docs/api/advanced/collaborative-drives/).
