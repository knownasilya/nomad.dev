---
categories:
  - Announcements
  - Releases
date: "2026-10-31"
description: A Reader that saves any page and reads it clean, RSS feeds, canvases for Reader and for Notes on the phone, a page of its own for the AI, and secrets your AI uses without seeing them.
title: "Nomad 1.30: a Reader that saves anything, an AI page, and secrets"
---

Everything below is in [Nomad 1.30](https://github.com/knownasilya/nomad/releases/tag/v1.30.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Reader saves pages and reads them clean

Reader used to follow drive blogs. Now it saves any web page too. Save an article and Reader keeps a clean copy and, if you've set up an AI, sorts it into a topic for you. Saved pages sit in a reading log, grouped by topic.

![The reading log in Reader, with saved articles grouped by topic](/posts/whats-new-in-1-30/reading-log.webp)

Open one and it shows in a minimal reading view: just the text and its pictures, in light, sepia or dark.

![An article in Reader's reading view](/posts/whats-new-in-1-30/reading-view.webp)

## RSS and Atom feeds

Reader follows ordinary RSS and Atom feeds now, not only drives. Paste a site's address or its feed, and new posts land in Reader next to everything else, sorted into topics the same way.

![RSS posts sorted into a topic in Reader](/posts/whats-new-in-1-30/rss-topic.webp)

## Canvases for Reader, and for Notes on the phone

Reader has the same List / Canvas switch as Notes. The canvas draws your saved articles around their topics and each feed's posts around the feed, and joins a post to a topic its tags name.

![Reader's canvas, with articles around topic hubs and posts around their feeds](/posts/whats-new-in-1-30/reader-canvas.webp)

The phone's Notes has the canvas too, with pan, pinch zoom and tap to open.

![The Notes canvas on the phone](/posts/whats-new-in-1-30/phone-notes-canvas.webp)

Links on every canvas now end in an arrowhead, so you can tell which way a link points.

![Canvas links with arrowheads](/posts/whats-new-in-1-30/canvas-arrows.webp)

## A page for the AI: chats and memory

The AI has a page of its own at `nomad://ai`, in the browser menu. **Chats** lists every AI Sidebar conversation. Search them, rename them, delete them, or open one back in the sidebar to keep going.

![nomad://ai/chats, listing past sidebar conversations](/posts/whats-new-in-1-30/ai-chats.webp)

**Memory** is new. Your AI can remember things you tell it, such as how you like answers written or what you're working on, and it brings them to every chat. The Memory page shows each one, and you can edit, delete or clear them, or turn memory off. A page's own `nomad.ai.chat()` never sees them.

![nomad://ai/memory, listing what the AI remembers](/posts/whats-new-in-1-30/ai-memory.webp)

The old Settings → AI moved here too, as **Setup**.

## Secrets

Give your AI an API key or token by name, and it can call that service without ever seeing the value. Add one in My Library → Secrets, say which hosts it's for and where it goes (a header, the query or the body). The key stays encrypted on that computer, never in your Vault, a drive or a Space, and it's only sent to the hosts you named. If it ever shows up in a reply, the AI sees `[secret NAME]` instead.

![My Library → Secrets](/posts/whats-new-in-1-30/secrets.webp)

The AI asks before it uses a secret, once per chat turn. A Job can use only the secrets you've ticked for it.

## Jobs that make changes

[Jobs](/posts/whats-new-in-1-27/) could already read and notify your phone. Now you can let a Job write: to drives you pick, live or staged in their Draft, to your Notes, or to Reader. You choose that when you make the Job, and each run records what it changed.

## New notes stay in your Space

A note you make now starts in the Space you're in, instead of in Personal.

## Everything else

The phone's top bar keeps still while you scroll, and bottom sheets stay above the keyboard. The full list of changes, including the smaller fixes, is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
