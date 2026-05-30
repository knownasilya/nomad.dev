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
