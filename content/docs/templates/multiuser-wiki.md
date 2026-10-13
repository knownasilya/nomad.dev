---
title: Multi-user Wiki Template
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/multiuser-wiki.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/multiuser-wiki'
  const TEMPLATE_TITLE = 'My Wiki'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/ui.js',
    '/util.js'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

This wiki is a minimal collaborative website. It maintains a list of authors (selected by the wiki owner) who set the content of the wiki.

## Technical design

This wiki uses a [frontend](/docs/api/developers/frontends) to virtually construct pages: `/index.html` is the app shell, declared as the manifest `fallback`, so every page path (which has no real file in this drive) serves the shell. When you visit a page, you are viewing a constructed result rather than a file that lives on this drive.

Each author keeps their pages in **their own drive**, in a folder named `/nomad-wiki/{wiki-drive-key}/`. The wiki drive holds only the list of authors, in `/authors.json`:

```json
{ "authors": [{ "name": "alice", "url": "hyper://…/" }] }
```

Only the wiki's owner can change that list. When you visit a page, the frontend looks for the path in every author's folder:

```
{author-url}/nomad-wiki/{wiki-drive-key}/{path}
```

It shows the matching file with the newest mtime. When you save a page, it goes into your own drive. Each author owns their copy of their work, and removing an author takes their pages out of the wiki without touching their drive.

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/multiuser-wiki/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/multiuser-wiki/index.json" "json" >}}
{{< /tab >}}
{{< tab "/ui.js" >}}
{{< readcode "/static/templates/multiuser-wiki/ui.js" "js" >}}
{{< /tab >}}
{{< tab "/util.js" >}}
{{< readcode "/static/templates/multiuser-wiki/util.js" "js" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}