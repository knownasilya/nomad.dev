---
title: Codesnip Template
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/codesnip.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/codesnip'
  const TEMPLATE_TITLE = 'Codesnip'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/ui.js',
    '/ui.css',
    '/ace/ace.js',
    '/ace/mode-css.js',
    '/ace/mode-html.js',
    '/ace/mode-javascript.js'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

A codesnippet which you can use to demonstrate APIs, patterns, bugs, or other techniques.
(Note that the code is run in an iframe and will have reduced permissions, including only readonly access to the nomad.fs API.)

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/codesnip/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/codesnip/index.json" "json" >}}
{{< /tab >}}
{{< tab "/ui.js" >}}
{{< readcode "/static/templates/codesnip/ui.js" "js" >}}
{{< /tab >}}
{{< tab "/ui.css" >}}
{{< readcode "/static/templates/codesnip/ui.css" "css" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}