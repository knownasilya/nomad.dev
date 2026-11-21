---
categories:
  - Announcements
  - Releases
date: "2026-11-09"
description: A home page that shows what needs you, folders and tags in Assets, files up to 500 MB with movies, PDFs and e-books, a search widget for Android, and phone AI answers that last.
title: "Nomad 1.47: a home dashboard, and Assets for movies and books"
---

Everything below is in [Nomad 1.47](https://github.com/knownasilya/nomad/releases/tag/v1.47.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## A home page that shows what needs you

The **Home** button and every new tab now open a dashboard for the Space you're in. At the top, **Needs you** lists what's waiting on your answer: a site or your AI asking something in a tab you're not looking at, someone asking to write to a drive or join a shared Space, a new device, the first Message from someone new, and a Job that wanted a site it wasn't given. Answer asks right there, or press **Answer** to jump to the tab that's asking.

![The home page in light and dark: Good afternoon, pinned sites, a Needs you box with a Job to run, a write ask, a join ask and the AI waiting for an answer, then Notifications, Coming up from the calendar, Latest notes, Jobs running and up next, and Latest files](/posts/whats-new-in-1-47/home-desktop.webp)

Below it are your notifications (Job results, notices from people in a shared Space, unread Messages), the Jobs running now and up next, what's coming up on the calendar, and your newest Notes and files. You can watch, stop or run a Job from the page.

The phone's home tab shows the same things under your shortcuts, and leaves out any section with nothing in it.

![The phone's home tab in light and dark, with shortcuts, Needs you, and Notifications](/posts/whats-new-in-1-47/home-phone.webp)

## Folders and tags in Assets

[Assets](/posts/whats-new-in-1-46/) can now be sorted into folders, like Recipes or Taxes, and given tags, like `#family` or `#trip`. Tap a tag to see everything with it. Select as many files as you like to move, tag or remove them at once, and rename, move or remove a folder with everything in it.

![Assets in the Home Space: All, Photos & videos, Documents and Audio filters, tags #family, #baking, #money, #trip and #school, the folders House, Recipes and Taxes, and five files selected with Move to, Tags and Remove](/posts/whats-new-in-1-47/assets-select.webp)

A Note can link to a file, a folder or a tag: type `[[` and pick one, or `[[#` for a tag. **Copy link** on a file gives you the same link to paste anywhere.

![A Note called Bake sale, typing [[bake to pick Bake sale menu.pdf from Files in Assets, under a link to Brownies.jpg](/posts/whats-new-in-1-47/notes-link.webp)

All of it works on the phone too.

## Movies, PDFs and e-books, up to 500 MB

Assets now holds files up to 500 MB, so the whole birthday video fits. Big files come in a piece at a time, with progress as they load.

![Grandpa's 80th, full video.mp4, 412 MB, loading with 136 MB of 412 MB, in light and dark](/posts/whats-new-in-1-47/video.webp)

EPUB and MOBI books open in a reader built into Nomad, with a table of contents and text size, and it remembers your place. Books show in a frame that runs no scripts and loads nothing from the internet. A book with DRM says so.

![Gull Point.epub open with its contents beside chapter 2, A Letter from the Mainland, in light and dark](/posts/whats-new-in-1-47/book.webp)

The phone now plays movies and shows PDFs and books too. Pinch the list to zoom, from a compact list up to one big picture across.

![Assets on the phone in light and dark, as a list, and pinched to one file across with an EPUB, a MOBI and a video](/posts/whats-new-in-1-47/phone-zoom.webp)

## A search widget for your Android home screen

Add Nomad's search bar to your home screen. Tap it and Nomad opens a new tab, ready to type. The chip names the Space your search opens in, and tapping it switches Spaces. The robot opens the AI. Make the widget two rows tall and you get a chip for each Space, so one tap searches right in that Space. It follows your phone's light or dark setting. **Settings → Add the search widget** places one for you.

![Nomad's search widget on an Android home screen, in light and dark: Search or enter address with the AI robot, and chips for the Personal, Home and Work Spaces](/posts/whats-new-in-1-47/search-widget.webp)

## Your AI on the phone remembers your answers

When your AI asks for something on the phone, the prompt can now last longer than one answer, as it does on your computer. Tick **Don't ask again on** a site, and it won't ask again there. When your AI wants to send something to a site after reading your private data, **Allow for 3 months** works on the phone too. These choices are kept with the rest of your settings: change them in site info or on `nomad://ai/sites` on your computer. A Deny you keep there holds on the phone as well.

![The phone's AI asking to read your Notes, with Don't ask again on example.com ticked, in light and dark](/posts/whats-new-in-1-47/phone-prompt.webp)

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
