---
title: nomad.schemas
description: Validate data against walled.garden schemas.
---

The schemas API exposes [walled.garden schema](/docs/api/developers/walled-garden-schemas/) validation to template apps. Schemas are [Zod](https://zod.dev)-backed and [Standard Schema](https://standardschema.dev) compliant. Templates running in sandboxed Drive contexts can't import npm modules directly — this API bridges that gap.

## API

### nomad.schemas.validate(type, data)

Validate an object against a named schema.

* **type** String. A `walled.garden/*` type string.
* **data** Object. The data to validate.
* Returns **{ success: true, data }** or **{ success: false, error }** (synchronous).

```javascript
var result = nomad.schemas.validate('walled.garden/post', {
  type: 'walled.garden/post',
  title: 'Hello world',
  body: 'This is my first post.',
  createdAt: new Date().toISOString()
})

if (!result.success) {
  console.error('Invalid:', result.error)
} else {
  await drive.put('/posts/hello.json', JSON.stringify(result.data, null, 2))
}
```

### nomad.schemas.list()

List all known schema type strings.

* Returns **String[]** (synchronous).

```javascript
nomad.schemas.list()
// [
//   'walled.garden/person',
//   'walled.garden/post',
//   'walled.garden/comment',
//   'walled.garden/status',
//   'walled.garden/bookmark',
//   'walled.garden/follows',
//   'walled.garden/reaction',
//   'walled.garden/vote',
//   'walled.garden/writer-keys'
// ]
```
