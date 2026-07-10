---
title: Frontends (SPA fallback)
aliases:
  - /docs/api/developers/frontends-.ui-folder/
---

The standard `hyper://` behavior serves referenced files directly, but struggles with two scenarios: sites needing consistent theming and applications using Single Page Application patterns. A **Frontend** is an HTML app shell that owns the drive's whole URL space and renders routes client-side.

There are two ways to declare one. The **manifest `fallback`** is the current, recommended way; the older `/.ui/ui.html` convention keeps working and is documented below as legacy.

## The `fallback` manifest key (recommended)

Add one line to your drive's `/index.json` and make `/index.html` your app:

```json
{
  "title": "My App",
  "fallback": "/index.html"
}
```

This works exactly like SPA hosting on Netlify, Cloudflare Pages, or an IPFS gateway:

- **Real files always win.** A request for a path that exists — any type, including HTML — serves that file. The fallback never shadows anything.
- **Misses rewrite to the shell.** When a page navigation asks for a path with no file (or a folder with no index file), Nomad serves the `fallback` file's HTML **as the response body for the originally-requested URL** — `HTTP 200`, address bar unchanged. Your app reads `window.location.pathname` and renders the route.
- **Only page navigations fall back.** A `fetch()` for a missing `.json`, an `<img>`, a `<script>` — all return an honest 404, so your app can detect its own missing data. (Detection uses `Sec-Fetch-Dest` when available, `Accept: text/html` otherwise.)

So for a drive with `/index.html`, `/app.js`, and posts under `/posts/…/post.json`:

| Request | Result |
|---|---|
| `hyper://site/` | `/index.html` served (it's a real file) |
| `hyper://site/posts/hello/` (navigation) | no file there → `/index.html` served, URL stays put, your router renders the post |
| `fetch('/posts/hello/post.json')` | the real JSON file |
| `fetch('/posts/typo.json')` | 404 |

**Graceful degradation is free.** Because the shell *is* `/index.html`, any runtime that can serve static files renders your app at the drive root — no stub or redirect page needed. Only deep links depend on a fallback-aware runtime.

The value must be an absolute in-drive path to a file. If you prefer keeping the app out of the root, point it anywhere — `"fallback": "/app/index.html"` — at the cost of the free degradation above. A malformed manifest, an invalid value, or a missing target simply disables the feature. If a drive declares `fallback`, any `/.ui/ui.html` present is ignored.

Reference assets with **absolute drive paths** (`/app.js`, `/thumb`) — the shell is served for arbitrary paths like `/posts/x/`, so relative URLs would break.

Example shell:

```html
<!-- /index.html -->
<main id="main"></main>
<script type="module">
  async function render () {
    var pathname = window.location.pathname
    if (pathname === '/') {
      main.innerHTML = '<h1>Home</h1>'
    } else if (pathname.startsWith('/posts/')) {
      const post = await nomad.fs.readFile(pathname.replace(/\/$/, '') + '/post.json', 'json')
      main.innerHTML = `<h1>${post.title}</h1>`
    }
  }
  render()
</script>
```

## Platform support

- **Nomad desktop** implements `fallback` on both drive backends (single-writer and Collaborative).
- **Nomad mobile** (the Bare/React-Native companion) implements the same semantics in its gateway. **Caveat:** the mobile WebView currently has **no `nomad` global**, so shells that call `nomad.*` (most app templates) render blank there. Plain static shells work; `nomad.*` apps remain desktop-only until a mobile `nomad` bridge exists.

## Legacy: the `.ui` folder

The original convention (inherited from Beaker): an HTML file at `/.ui/ui.html` is served for **every** in-drive HTML navigation when no `fallback` is declared — the root, folders, missing paths, *and paths where a real HTML file exists*.

That last part is the key difference, and the part that surprises people: a `.ui` Frontend **shadows real files for page navigations**. If you have both `/index.html` and `/.ui/ui.html`, visiting `/` serves `/.ui/ui.html`. The raw files are still there — non-HTML requests and `nomad.fs.readFile()` read them — but top-level HTML navigations are taken over. This is why `.ui` drives ship a stub `/index.html` (a `<meta http-equiv="refresh">` to `/.ui/ui.html` plus a plain link) purely as a fallback for runtimes that don't implement the convention.

`.ui` remains supported indefinitely. It is also the only way to get deliberate takeover — a consistent theme wrapped around real content pages — since `fallback` never shadows an existing file.

**Migrating a `.ui` drive:** move `/.ui/ui.html` to `/index.html` (and its assets out of `/.ui/`), delete the old stub, add `"fallback": "/index.html"` to `/index.json`, and switch any `/.ui/…` asset references to their new absolute paths.

### Mounted Frontends (not in v11)

Earlier (Dat/Hyperdrive v10) builds let a Frontend be a *separate* Hyperdrive mounted at `/.ui`, so a frontend could be published once and shared across sites. **Hyperdrive v11 removed mounts**, so this no longer applies — a Frontend must live in the drive itself. To reuse one across drives, copy its files in (this is what the drive templates do).
