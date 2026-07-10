---
title: Blog Template
description: A multi-device, URL-addressable blog built on nomad.fs and walled.garden/feed.
---

{{< rawhtml >}}
<img class="template-thumb" src="/templates/blog.png">

<button class="create-drive">Create Drive From This Template</button>

<script>
  const TEMPLATE_ROOT = '/templates/blog'
  const TEMPLATE_TITLE = 'My Blog'
  window.TEMPLATE_DRIVE_TYPE = 'autobase'
  window.TEMPLATE_FILES = [
    '/index.html',
    '/index.json',
    '/app.js'
  ]
</script>
<script src="/templates/index.js"></script>
{{< /rawhtml >}}

A personal blog you can write from any of your devices. The drive is an [Autobase Collaborative Drive](/docs/api/apis/nomad.fs/), so each Device you add is a Writer of the **same** drive under one stable `hyper://` URL — no follower-breaking key changes. The drive declares itself a [`walled.garden/feed`](/docs/api/developers/walled-garden-schemas/#feed) so the in-browser Reader can subscribe to it.

## How it works

- **`/index.json`** declares `type: "walled.garden/feed"` with `itemsPath: "/posts/"`.
- **Each post is a directory** — `/posts/<YYYY-MM-DD-slug>/` containing a `post.json` ([`walled.garden/post`](/docs/api/developers/walled-garden-schemas/#post)) and an `index.md` body. Co-locate images in the same folder and reference them with **absolute** paths (`/posts/<slug>/photo.jpg`) — the themed permalink renders at `/p/<slug>`, so relative paths would resolve against the wrong base.
- **The app shell is `/index.html`**, declared as the manifest [`fallback`](/docs/api/developers/frontends/): a page navigation with no real file serves the shell, which routes off the URL.
- **Posts are URL-addressable**: `hyper://<blog>/p/<slug>` is the themed permalink (a virtual route rendered by the shell), and `hyper://<blog>/posts/<slug>/` opens the post's raw `index.md` directly — the storage is plain files, readable on any runtime.
- **Drafts**: tick "Save as draft" to set `draft: true`. Drafts sync to your devices and stay out of feeds and readers — but note the drive is public, so a draft is hidden, not secret.
- **Multi-device**: open **Devices → Create invite link**, open the link on another device, and approve the request. That device can then publish too.

## Source

{{< tabsraw >}}
{{< tab "/index.html" >}}
{{< readcode "/static/templates/blog/index.html" "html" >}}
{{< /tab >}}
{{< tab "/index.json" >}}
{{< readcode "/static/templates/blog/index.json" "json" >}}
{{< /tab >}}
{{< tab "/app.js" >}}
{{< readcode "/static/templates/blog/app.js" "js" >}}
{{< /tab >}}
{{< tab "LICENSE" >}}
{{< readcode "/static/templates/LICENSE" "txt" >}}
{{< /tab >}}
{{< /tabsraw >}}
