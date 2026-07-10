---
title: Forum Template
description: A multi-writer discussion board template demonstrating nomad.fs.
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/forum.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/forum'
  const TEMPLATE_TITLE = 'My Forum'
  window.TEMPLATE_DRIVE_TYPE = 'autobase'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/app.js'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

A multi-writer discussion board built on [nomad.fs](/docs/api/apis/nomad.fs/). Writers post and comment; the owner invites people via a shareable link or approves access requests. Author names and avatars are resolved from [Profile Drives](/docs/api/developers/profile-drives/).

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/forum/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/forum/index.json" "json" >}}
{{< /tab >}}
{{< tab "/app.js" >}}
{{< readcode "/static/templates/forum/app.js" "js" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}
