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

Each author maintains a folder under `/nomad-wiki/{wiki-drive-key}/`. When a page is visited at some path, the wiki's frontend runs the following query:

```
/users/*/nomad-wiki/{wiki-drive-key}/{path}
```

The matching file with the highest mtime is then chosen for rendering.

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