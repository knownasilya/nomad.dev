---
title: beaker.hyperdrive (removed)
description: beaker.hyperdrive has been replaced by the unified beaker.fs API.
---

`beaker.hyperdrive` has been **removed**. Every drive in Nomad is now an
[Autobase](/docs/api/advanced/collaborative-drives/), and all reading, writing, and drive management
goes through the single [`beaker.fs`](/docs/api/apis/beaker.fs/) API.

Migration is a near drop-in rename — the method names are the same:

```javascript
// before
beaker.hyperdrive.drive(url).readFile('/index.json')
// after
beaker.fs.drive(url).readFile('/index.json')
```

`beaker.hyperdrive.X(...)` → `beaker.fs.X(...)` for `drive`, `readFile`, `writeFile`, `readdir`, `stat`,
`query`, `watch`, `createDrive`, `forkDrive`, `configure`, and the rest.

See **[beaker.fs](/docs/api/apis/beaker.fs/)**.
