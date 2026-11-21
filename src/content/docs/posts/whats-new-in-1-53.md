---
categories:
  - Announcements
  - Releases
date: "2026-11-15"
description: Press ~ on a page of a drive you can edit, and the drive terminal opens under it.
title: "Nomad 1.53: press ~ to open the terminal"
---

Everything below is in [Nomad 1.53](https://github.com/knownasilya/nomad/releases/tag/v1.53.0). Your app updates itself, or you can download it from the release page.

## Press ~ to open the terminal

On a page of a drive you can edit, press `~` and the [drive terminal](/docs/api/advanced/webterm/) opens under the page, in that drive. Press it again to close it. If you're typing in a text field, `~` types as usual.

Before, only ``Ctrl+` `` or **Developer → Toggle Terminal** opened it, and that still works everywhere. The terminal's welcome now lists both keys.

![The drive terminal for "Field Notes" in light and dark: the welcome ends with "Ctrl+` or ~ on the page toggles this", above an ls -l of the drive](/posts/whats-new-in-1-53/terminal-tilde.webp)

## Also since 1.52

1.52.1 fixed the Android app closing as soon as it started in 1.52.0.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
