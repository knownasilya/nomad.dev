---
categories:
  - Announcements
  - Releases
date: "2026-11-06"
description: Rename, recolor, delete or leave a Space, a clearer Sharing page, and calendars that live in a drive.
title: "Nomad 1.45: manage your Spaces, and calendar drives"
---

Everything below is in [Nomad 1.45](https://github.com/knownasilya/nomad/releases/tag/v1.45.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Rename, recolor, delete or leave a Space

Until now the Spaces menu could only switch Spaces and make new ones. Now each Space in the menu has a pen button when you hover over it. It opens a small form where you can rename the Space, pick another of its eight colors, or delete it. A Space shared with other people has **Leave space…** instead. Both ask before they do anything. The phone's Space switcher has the same pen button on each row.

![The Edit space form in the Spaces menu, with the name, eight colors, Cancel and Save, and Delete space… at the bottom](/posts/whats-new-in-1-45/edit-space.webp)

Deleting a Space now reaches your other Devices too, and a deleted Space no longer comes back the next time they sync. Personal can be renamed and recolored, but not deleted. Renaming a shared Space changes your own name for it; the other people in it keep theirs.

## A clearer Sharing page

My Library → Sharing is now split in two. **This Space** is one card in the Space's own color, with everything that acts on it: who it's shared with, invites, join requests and Leave. **Other Spaces** lists your other shared Spaces with your role in each and an **Open** button, so two Spaces named Home read as "You own it" and "You can edit". Set up a home and Join a shared Space sit side by side under it, and Set up a home warns you when the name is already taken. A home Space now shows as a house in its color on the Spaces button and in the menu.

![The Sharing page from the Personal Space: a This Space card, then Other Spaces with two Homes and a Book club, then the Set up another home and Join a shared Space tiles](/posts/whats-new-in-1-45/sharing.webp)

## Calendar drives

A drive can now be a calendar, with one file per event. The family calendar from [Nomad 1.44](/posts/whats-new-in-1-44/) follows one the same way it follows an iCal link: paste its `hyper://` address under **Calendars you follow**, or pick it from **Calendar drives in this Space**. Its events show up beside yours and are read again every five minutes. On desktop, a calendar drive's site info has **Follow in Calendar** too. The phone's Follow sheet takes a drive address and lists the Space's calendar drives.

![The Calendar, with a followed school calendar and two calendar drives, Otters Swim Club and Under-9s football, each with a Follow button](/posts/whats-new-in-1-45/calendar-drives.webp)

The format is in [walled.garden schemas](/docs/api/developers/walled-garden-schemas/#calendar).

## Everything else

- Right-click in the AI sidebar now opens the browser's own Copy and Paste menu.
- The new tab notice shows the version you're actually running.
- Settings' **How to run a Peer** link now points to nomad.pages.dev.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
