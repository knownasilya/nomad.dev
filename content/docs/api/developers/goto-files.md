---
title: Goto Files
---

A `.goto` file serves as a shortcut mechanism within Beaker. These files contain no actual content; instead, they rely on two metadata attributes:

1. **`title`** — The title of the resource being pointed to by the .goto file.
2. **`href`** — The URL of the resource being pointed to by the .goto file.

## Key Functionality

When users access a `.goto` file through the `hyper://` protocol, Beaker automatically redirects to the URL specified in the `href` attribute. Bookmarks are commonly stored as `.goto` files on users' system drives.

## Creation

Users can generate these shortcut files using Webterm's `mkgoto` command.
