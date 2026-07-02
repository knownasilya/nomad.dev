---
title: beaker.autobase (removed)
description: beaker.autobase has been replaced by the unified beaker.fs API.
---

`beaker.autobase` has been **removed**. Every drive in Nomad is now an Autobase, so its read/write and
writer-management methods all live on the single [`beaker.fs`](/docs/api/apis/beaker.fs/) API.

```javascript
// before
var drive = beaker.autobase.collaborativeDrive(url)
// after
var drive = beaker.fs.drive(url)
```

- `beaker.autobase.collaborativeDrive(url)` → `beaker.fs.drive(url)`
- `beaker.autobase.createCollaborativeDrive(...)` → `beaker.fs.createCollaborativeDrive(...)`
- writer management (`createInvite`, `claimInvite`, `requestAccess`, `listRequests`, `approveRequest`,
  `denyRequest`, `removeWriter`, `listWriters`) → the same methods on `beaker.fs`

See **[beaker.fs](/docs/api/apis/beaker.fs/)** and the
[Collaborative Drives guide](/docs/api/advanced/collaborative-drives/).
