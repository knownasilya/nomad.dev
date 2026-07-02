---
title: Frontends (.ui folder)
---

The standard `hyper://` behavior serves referenced files directly, but struggles with two scenarios: sites needing consistent theming and applications using Single Page Application patterns.

## What is a Frontend?

A Frontend is "an html file found at `/.ui/ui.html`" that provides consistent interface across a site. It gets served instead of the target file when:
- No file exists at the target URL
- The target is a folder
- The "Accept" header includes text/html

## How it's served

This is the part that surprises people. When a Frontend is present, Nomad does **not** redirect to `/.ui/ui.html` — it returns that file's HTML **as the response body for the originally-requested URL**, with `HTTP 200` and no `Location` change. So `hyper://site/`, `hyper://site/posts/hello/`, and even paths that don't exist all return the *same* `ui.html` document, while the address bar keeps the requested path. That's what lets the Frontend own the entire URL space and do client-side routing off `window.location.pathname`.

A consequence worth internalizing: a Frontend **shadows real files for page (HTML) navigations**. If you have both `/index.html` and `/.ui/ui.html`, visiting `/` serves `/.ui/ui.html`, not `/index.html`. The raw files are still there — non-HTML requests (e.g. `fetch()` for a `.json`, an `<img>`) get the real file, and `beaker.fs.readFile('/index.html')` still reads it. Only top-level HTML navigations are taken over.

## The `index.html` fallback

Most templates ship a tiny `/index.html` like this:

```html
<!doctype html>
<meta http-equiv="refresh" content="0; url=/.ui/ui.html">
<a href="/.ui/ui.html">Open</a>
```

On a browser that implements the `.ui` convention this file is **never served** — it's shadowed by the Frontend (see above). It exists purely as a **graceful-degradation fallback** for runtimes that *don't* implement the convention: they serve the real `/index.html`, which then points the visitor at the Frontend. If you don't care about non-Nomad viewers you can omit it.

## Platform support

- **Nomad desktop** implements the full convention: `/.ui/ui.html` is served for every in-drive HTML navigation (root, folders, missing paths) when the `Accept` header includes `text/html`.
- **Nomad mobile** (the Bare/React-Native companion) honors `/.ui/ui.html` at the **drive root** for now; deeper paths resolve to their own files, so content drives degrade to static rendering. **Caveat:** the mobile WebView renders a static, inlined snapshot and currently has **no `beaker` global**, so Frontends that call `beaker.*` (most app templates) render blank there. Plain static Frontends work; `beaker.*` apps remain desktop-only until a mobile `beaker` bridge exists.

## Functionality

The Frontend can override all page-serving, allowing developers to use JavaScript to read files referenced by `window.location.pathname` and render them dynamically in the UI.

Example implementation showing how to handle different file types (.html, .jpg) within the Frontend's main element using async file reading:

```html
<!-- /.ui/ui.html -->
<main id="main"></main>
<script>
  async function main() {
    var pathname = window.location.pathname
    if (pathname.endsWith('.html')) {
      main.innerHTML = await beaker.fs.readFile(pathname)
    } else if (pathname.endsWith('.jpg')) {
      main.innerHTML = `<img src="${pathname}">`
    }
  }
  main()
</script>
```

## Mounted Frontends (not in v11)

Earlier (Dat/Hyperdrive v10) builds let a Frontend be a *separate* Hyperdrive mounted at `/.ui`, so a frontend could be published once and shared across sites. **Hyperdrive v11 removed mounts**, so this no longer applies — a Frontend must live in the drive itself at `/.ui/ui.html`. To reuse one across drives, copy its files in (this is what the drive templates do).
