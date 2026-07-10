---
title: Simple CMS Template
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/simple-cms.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/simple-cms'
  const TEMPLATE_TITLE = 'My Website'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/ui.js',
    '/ui.css'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

This template is a minimal content management system for building a site. [Read the tutorial "Building a CMS Frontend"]({{< relref "/docs/tutorials/cms-frontend" >}}) to learn how it works.

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/simple-cms/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/simple-cms/index.json" "json" >}}
{{< /tab >}}
{{< tab "/ui.js" >}}
{{< readcode "/static/templates/simple-cms/ui.js" "js" >}}
{{< /tab >}}
{{< tab "/ui.css" >}}
{{< readcode "/static/templates/simple-cms/ui.css" "css" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}