---
categories:
  - Announcements
  - Releases
date: "2026-11-14"
description: Every drive keeps its history, so you can see an old version or restore one. Search the text inside your drives, start one as a Blog or Photo album, invite people to edit it, and use a new drive terminal where your AI can run commands.
title: "Nomad 1.52: version history and search for your drives"
---

Everything below is in [Nomad 1.52](https://github.com/knownasilya/nomad/releases/tag/v1.52.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Version history

Open a drive's **Version history** from site info's Tools menu or from the drive's menu in My Library. It lists the drive's changes, newest first and grouped by day. You can see any version of a file, restore one file, bring back a file you deleted, or take the whole drive back to an earlier point after you preview it. A restore is a new change, so it syncs to your other devices and you can undo it.

![Version history for the drive "Trip to Lisbon" in light and dark: today's changes to itinerary.md, an added photo, a deleted packing list and index.html, then yesterday's and Wednesday's, each with buttons to view, restore and see its history](/posts/whats-new-in-1-52/version-history.webp)

The phone has it too. Open it from My Library's drive menu, or from the file explorer for the whole drive or one file. If the phone can't write to a drive, you can still look through its history.

![Version history on the phone in light and dark, for the drive "Family recipes": changes to soups and desserts today and yesterday](/posts/whats-new-in-1-52/phone-version-history.webp)

## Search inside your drives

Search now has an **In your drives** section. It looks through the text files in the drives in your Space's library and finds every word you typed, in any order, ignoring case and accents. On the phone, there's a search field on My Library's Drives page.

![Search for "lisbon" in light and dark: under In your drives, the Lisbon itinerary, restaurants.csv and a family blog post, with the word marked in each](/posts/whats-new-in-1-52/drive-search.webp)

Your AI can search your drives and read their history too. When it finds a change you might want to undo, it links you to Version history so you can do it yourself.

## Start a drive as a Blog, Website, Photo album or Forum

Create Drive now offers four of the [template gallery](/docs/templates/)'s drives next to Blank and Document: a [Blog](/docs/templates/blog/), a [Website](/docs/templates/simple-cms/), a [Photo album](/docs/templates/photo-album/) and a [Forum](/docs/templates/forum/). They're built into Nomad, so the phone's New drive form has them too, and so does your AI when it makes a drive for you.

![The Create Collaborative Drive dialog with Blank, Document, Blog, Website, Photo album and Forum, Blog selected](/posts/whats-new-in-1-52/create-drive.webp)

## Invite someone to edit a drive

Site info has a new **Editors** tab. Copy an invite link and send it to the person you want to edit with. A link works once, for 7 days. When they open it, Nomad shows **Invited to edit** in the location bar, and any of your devices adds them right away. The tab also lists your open links, people asking to edit (with Allow and Deny), and everyone who can edit, so you can remove someone. Anyone can ask to edit a collaborative drive from the same tab.

![Site info's Editors tab in light and dark: Copy an invite link, one open link, Sam Okafor asking to edit with Allow and Deny, and This device, Pixel 8 and Maria Lopez under Can edit](/posts/whats-new-in-1-52/editors.webp)

## See what keeps a drive online

The new **Online** tab says whether your drive stays reachable while your computer is off. It lists each always-on Peer and whether it keeps the drive, and you can switch one on to keep just this drive, even if it doesn't keep the rest of the Space. The phone's drive actions in My Library show the same thing.

![Site info's Online tab in light and dark: Online when this computer is off, because Basement NAS keeps a full copy; This computer, Basement NAS switched on and Office mini PC switched off](/posts/whats-new-in-1-52/online.webp)

## Add photos and files to a drive from the phone

The phone's file explorer has an **Add files** button. Pick photos and videos, take a photo, or choose any file. Big videos work fine, and a name that's already taken gets a number.

![The phone's file explorer for "Trip to Lisbon" in light and dark, with the Add files sheet open: Photos and videos, Take a photo and Files](/posts/whats-new-in-1-52/phone-add-files.webp)

## A new drive terminal

Press `~` or ``Ctrl+` `` to open the terminal for the drive you're on. It has a new look in light and dark, and it works more like the terminal you're used to:

- **Tab** completes commands, options and file names from a menu. Up and Down look through your history, and `Ctrl+R` searches it.
- `;`, `&&`, `>` and `>>` work on one line, and `Ctrl+C` stops a command.
- New commands: `ls -l`, `tree`, `head`, `tail`, `wc`, `stat`, `find`, `grep`, `search`, `write` and `touch`. `rm` asks first and tells you how to undo it.
- `versions`, `diff` and `restore` use the drive's version history.
- A mistyped command gets a "did you mean" and a next step.

![The drive terminal in light and dark for "Field Notes": ls -l, tree posts, and cat with its file menu open](/posts/whats-new-in-1-52/terminal.webp)

## Ask your AI in the terminal

Type `?` and a question, or `ai`, to ask your AI about the drive you're in. It can run terminal commands to answer you, and they show up in its answer. Commands that only look, like `ls`, `grep` or `diff`, run right away. Commands that change the drive, like `write`, `rm` or `restore`, wait for you to press **Run it** or **Don't** (or `y` or `n`).

![The AI answering "collect the TODOs into todo.md" in light and dark: it ran grep TODO, and now asks to run grep TODO > todo.md with Run it and Don't](/posts/whats-new-in-1-52/terminal-ai-ask.webp)

## Thumbnails for PDFs, books and videos

In Assets, a PDF now shows its first page and an e-book shows its cover. Videos you add from the phone get a picture from the video. Files that came in without a thumbnail get one the first time you see them.

![Assets in light and dark: a lease and a soccer schedule show their first page, two e-books show their covers, and a video shows a frame](/posts/whats-new-in-1-52/thumbnails.webp)

## Fixes

- **One Blank card in New drive.** The phone's New drive form showed Blank twice.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
