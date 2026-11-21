---
categories:
  - Announcements
  - Releases
date: "2026-11-04"
description: See exactly what your AI wants to send before you allow it, allow a site for 3 months, filter Notes by several topics at once, and an AI that reads long Notes and pages to the end.
title: "Nomad 1.40: see what your AI sends, and sites you trust for 3 months"
---

Everything below is in [Nomad 1.40](https://github.com/knownasilya/nomad/releases/tag/v1.40.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## See what your AI wants to send

Since [Nomad 1.36](/posts/whats-new-in-1-36/), your AI asks before it sends a request to a site you didn't name once a chat has read something private. That prompt now shows the request itself: the method and address on one line, and under **Details** the full URL, the headers, the body, and any of your [secrets](/posts/whats-new-in-1-30/) it would use.

![The send prompt with Details open, showing the URL, headers, JSON body and the secret it uses](/posts/whats-new-in-1-40/request-details.webp)

A request that would send one of your secrets gets a warning line under the address, and Details says where each secret goes. The secret's value is still added by Nomad, so the AI never sees it. On the phone, the prompt names the same method, address, headers and secrets.

## Allow a site for 3 months

If you send to the same site all the time, tick **Allow for 3 months** in the prompt. Your AI then sends to that site without asking, in every chat and in your Jobs, until the 3 months are up.

![The send prompt with the Allow for 3 months box](/posts/whats-new-in-1-40/allow-3-months.webp)

The AI page has a new **Sites** view that lists the sites you've allowed and when each one ends. You can extend one by another 3 months or remove it. These are kept on this computer only.

![nomad://ai/sites with three allowed sites, each with Extend 3 months and a delete button](/posts/whats-new-in-1-40/ai-sites.webp)

## Filter Notes by several topics

The row of topic chips above the Notes list is now a **Topics** dropdown. Tick as many topics as you like, and the list shows the notes that have any of them. The × beside it goes back to all notes. On the phone, the button opens a sheet with the same checklist.

![The Topics dropdown in Notes with Garden and Reading ticked](/posts/whats-new-in-1-40/notes-topics.webp)

## Your AI reads long things to the end

Your AI used to stop reading a long Note, Reader post or page after about 20,000 characters. Now it reads them in parts, one after another, so it can work with the whole thing. Before it changes a long Note, it reads every part first.

It also has a scratch space for the chat. When it reads something long, it keeps the whole text there, so it can search it without reading it all again. The scratch space is in memory only and is cleared a few hours after the chat goes quiet. Anything saved there after a private read still counts as private, so the AI still asks before sending it anywhere.

## Everything else

Notes, Reader, Messages and History now name what's open in the tab title, so you can tell your tabs apart. The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
