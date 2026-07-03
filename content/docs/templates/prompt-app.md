---
title: Prompt App Template
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/prompt-app.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/prompt-app'
  const TEMPLATE_TITLE = 'My Prompt App'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/ai/system.md'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

A minimal AI chat interface powered by [`nomad.ai`](/docs/api/apis/nomad.ai/). Type a message and get a streaming response from your local AI runtime. Edit `ai/system.md` to give the assistant a persona, and update `index.json` to set the model.

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/prompt-app/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/prompt-app/index.json" "json" >}}
{{< /tab >}}
{{< tab "/ai/system.md" >}}
{{< readcode "/static/templates/prompt-app/ai/system.md" "md" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}
