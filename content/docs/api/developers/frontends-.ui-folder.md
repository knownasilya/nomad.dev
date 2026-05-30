---
title: Frontends (.ui folder)
---

The standard `hyper://` behavior serves referenced files directly, but struggles with two scenarios: sites needing consistent theming and applications using Single Page Application patterns.

## What is a Frontend?

A Frontend is "an html file found at `/.ui/ui.html`" that provides consistent interface across a site. It gets served instead of the target file when:
- No file exists at the target URL
- The target is a folder
- The "Accept" header includes text/html

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
      main.innerHTML = await beaker.hyperdrive.readFile(pathname)
    } else if (pathname.endsWith('.jpg')) {
      main.innerHTML = `<img src="${pathname}">`
    }
  }
  main()
</script>
```

## Mounted Frontends

Frontends can be stored in subfolders and exist as separate Hyperdrive sites mounted to `/.ui`. This enables frontends to be created, published, and shared across multiple sites as independent Hyperdrive installations.
