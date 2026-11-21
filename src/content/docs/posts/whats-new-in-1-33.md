---
categories:
  - Announcements
  - Releases
date: "2026-11-02"
description: Search Reader and Notes by every word, in any order. Your AI links what it makes, canvas titles stay readable as you zoom, and the phone's Reader can add feeds.
title: "Nomad 1.33: better search, links from your AI, and a calmer canvas"
---

Everything below is in [Nomad 1.33](https://github.com/knownasilya/nomad/releases/tag/v1.33.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Search Reader and Notes

Search in Reader and Notes now finds every word you type, in any order, ignoring case and accents. "garden tomato" finds a note that says "Tomatoes in the garden". The lines that match are marked in the results. In Reader, press **/** to jump to the search box.

![Reader's search, with the matching words marked in each result](/posts/whats-new-in-1-33/reader-search.webp)

Search works on the canvas too. The matches light up and everything else fades. Press **Fit** or **Enter** to zoom to them.

![The Notes canvas while searching, with the matching notes lit up and the rest faded](/posts/whats-new-in-1-33/canvas-search.webp)

The phone's Notes and Reader search the same way.

## Links to what your AI makes

When your AI makes or changes something for you, its answer links to it: a Note, a Job, a Mod, a file it wrote to a drive, a feed it followed, or something it remembered. Click a link in the AI Sidebar and it opens in a new tab. On the phone, a link opens Notes, Jobs or Reader on their own screens.

![An answer in the AI Sidebar with links to the note and the Job it made](/posts/whats-new-in-1-33/ai-links.webp)

## Canvas titles stay readable

Titles on the canvas used to grow as fast as you zoomed, so close up they covered each other. Now they grow more slowly than the zoom, and you can zoom in up to 8x.

![The canvas zoomed in, before and after: titles that overlap, then titles that fit](/posts/whats-new-in-1-33/canvas-labels.webp)

## Add feeds on the phone

The phone's Reader has a **+** in its header. It opens a sheet where you paste a site or feed address to follow it. Long lists show 25 posts at a time, with **Load more** at the bottom.

![The phone's Reader with the Add a feed sheet open](/posts/whats-new-in-1-33/phone-add-feed.webp)

## Everything else

Picking a feed on the phone shows its posts again. The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
