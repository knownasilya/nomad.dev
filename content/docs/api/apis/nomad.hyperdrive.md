---
title: nomad.hyperdrive (removed)
description: nomad.hyperdrive has been replaced by the unified nomad.fs API.
---

`nomad.hyperdrive` has been **removed**. Every drive in Nomad is now an
[Autobase](/docs/api/advanced/collaborative-drives/), and all reading, writing, and drive management
goes through the single [`nomad.fs`](/docs/api/apis/nomad.fs/) API.

Migration is a near drop-in rename — the method names are the same:

```javascript
// before
nomad.hyperdrive.drive(url).readFile('/index.json')
// after
nomad.fs.drive(url).readFile('/index.json')
```

`nomad.hyperdrive.X(...)` → `nomad.fs.X(...)` for `drive`, `readFile`, `writeFile`, `readdir`, `stat`,
`query`, `watch`, `createDrive`, `forkDrive`, `configure`, and the rest.

See **[nomad.fs](/docs/api/apis/nomad.fs/)**.
