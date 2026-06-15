---
title: Content-Type Negotiation
---

Beaker's hyper:// server supports content-type negotiation, allowing files to be served without specifying file extensions in URLs.

Instead of including extensions like `.png` in image paths, you can reference files without them. The server will automatically detect and serve the correct format based on content-type negotiation.

## Supported Content Types

The system matches three main categories:

- **HTML content**: Recognizes `.html` and `.md` files as "text/html"
- **Stylesheets**: Identifies `.css` files as "text/css"
- **Images**: Serves `.png`, `.jpg`, `.jpeg`, or `.gif` formats as "image/*" types

This approach proves useful when you're uncertain which file format a website employs, as the server determines the appropriate version automatically.

## Index File Resolution

When a URL points to a directory (i.e. ends with `/`, or has no file extension), the server looks for an index file in the following priority order:

1. `index.html` — checked first; wins if it exists
2. `index.md`
3. `index.txt`

The first match is served. If none exist but the directory contains other entries, the browser shows a directory listing.

**Example:** navigating to `hyper://abc.../` will serve `/index.html` if present, otherwise `/index.md`, otherwise `/index.txt`.

Paths without a trailing slash that resolve to a directory trigger a redirect to the trailing-slash form before index lookup occurs.
