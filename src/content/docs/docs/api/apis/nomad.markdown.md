---
title: nomad.markdown
description: This API renders Markdown into HTML
slug: docs/api/apis/nomad.markdown
---

## nomad.markdown.toHTML(md)

Renders Markdown into HTML.

* **md** String. The Markdown to render.
* Returns **String**.

```javascript
var html = nomad.markdown.toHTML('# hello!')
console.log(html) // => '<h1>Hello!</h1>'
```
