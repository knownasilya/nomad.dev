---
title: nomad.page
description: This page's own URL identity, plus a pure hyper:// URL parser
---

`nomad.page` tells a page which drive it lives in and which route it was loaded at. It is the
**authoritative** way for a drive frontend (a `/.ui` SPA) to learn its own URL — always prefer it
over parsing `location`. On desktop the two agree (tabs have a real `hyper://` origin), but on
mobile the page renders inside a WebView where `location.host` and `location.pathname` are not
reliable; `nomad.page` is provided directly by the host on both platforms, so the same frontend
code works everywhere.

## nomad.page

An object describing the current page, or `null` on non-hyper pages (e.g. `nomad://` or `https://`).

* **url** String. The full URL, e.g. `'hyper://1234…af/posts/2026-07-10-hello/'`.
* **origin** String. The drive root, e.g. `'hyper://1234…af/'`.
* **key** String. The drive key as it appears in the URL (64-char hex or 52-char z-base-32).
* **version** String or null. The `+version` suffix if the URL pinned one.
* **path** String. The route within the drive, e.g. `'/posts/2026-07-10-hello/'`.
* **search** String. The query string including the leading `?`, or `''`.

```javascript
// A drive frontend bootstrapping itself — identical on desktop and mobile:
const drive = nomad.fs.drive(nomad.page.origin)
const route = nomad.page.path        // e.g. '/posts/2026-07-10-hello/'
```

## nomad.parseUrl(url)

Parses any `hyper://` URL into the same shape as `nomad.page`. A pure, synchronous helper — no
network, no drive loading.

* **url** String. The URL to parse.
* Returns **Object** (same fields as `nomad.page`), or **null** if the URL is not a `hyper://` URL.

```javascript
nomad.parseUrl('hyper://1234…af/posts/hello/?draft=1')
// => { url, origin: 'hyper://1234…af/', key: '1234…af', version: null,
//      path: '/posts/hello/', search: '?draft=1' }

nomad.parseUrl('https://example.com') // => null
```

Note: `key` is returned as written — `parseUrl` does not convert between hex and z-base-32.
