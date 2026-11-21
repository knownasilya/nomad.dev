---
categories:
  - Announcements
  - Releases
date: "2026-11-06"
description: A calendar your household shares, a photo album you fill from your phone, notes your family edits together live, and a Peer that keeps it all online while your computers sleep.
title: "Nomad 1.44: a family calendar, a family album, and an always-on Peer"
---

Everything below is in [Nomad 1.44](https://github.com/knownasilya/nomad/releases/tag/v1.44.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

This release is about the people you live with. Share a Space with your household (My Library → Sharing on desktop, or **Join a shared space** on the phone), and it gets a calendar and a photo album everyone in it can use.

## A family calendar

Open **Calendar** from the menu (`nomad://calendar`), or from the menu on your phone. In a shared Space, everyone sees the same calendar and can add to it, and each event says who added it. In your Personal Space, it's yours alone.

![A November calendar for the Home Space, with swimming, bins night and a dentist appointment, and a school calendar followed on the left](/posts/whats-new-in-1-44/calendar.webp)

Events can repeat every day, week, month or year. Paste the iCal link of a school, club or team calendar under **Calendars you follow**, and its events show up next to yours and stay current. Tick **Everyone in Home sees it** to share a followed calendar with the Space.

![Editing an event: a title, all day or a start and end time, how it repeats, where, notes, and who added it](/posts/whats-new-in-1-44/calendar-event.webp)

Your AI can read the calendar too. Ask it "what's on this week?", or give a Job like a Sunday-evening summary permission to read the calendar. It asks first, and it can't change any events.

## A family album

**Photos** (`nomad://photos`, and Photos on the phone) is an album for a shared Space. Add photos from your phone's gallery or camera, or drop them onto the page on desktop. Everyone in the Space sees them, grouped by month, with who added each one.

![The Home album, with photos grouped by month](/posts/whats-new-in-1-44/photos.webp)

Click a photo to see it full size, add a caption, download it, or step to the next one. Nomad shrinks photos to 2560 pixels before adding them, so a phone full of pictures doesn't fill everyone's disk. Only the person who added a photo, or the Space's owner, can remove it.

## Notes your household edits together

[Nomad 1.41](/posts/whats-new-in-1-41/) made a note live between your own devices. Now a note in a shared Space is live between everyone in it. When two of you have the grocery list open, you see each other's edits and cursors as you type, on desktop and on the phone.

## Keep it online with an always-on Peer

Nomad has no servers, so your Spaces are only reachable while one of your devices is on. An **always-on Peer** is a Nomad without windows that you run on a machine that stays on, such as a NAS, a home server or a small VPS. It keeps a copy of your Spaces and serves them, so your phone syncs with your laptop even when they're never online at the same time. The people you share a Space with can reach the album and the calendar any time.

![Settings, Devices, Always-on Peers: a Home NAS that's online, 7 of 8 synced, 3.2 GB, with Keep online boxes for Personal, Home and Work](/posts/whats-new-in-1-44/peers.webp)

Add one in **Settings → Devices → Add an always-on Peer**. A Peer can read what it keeps, but it can't change anything: it isn't a writer of your Vault or of any drive. Choose which Spaces it keeps online, and remove it there or on your phone, and it deletes its copies. [Keep your drives online](/docs/api/help/always-on-peer/) walks through setting one up.

## Everything else

Right-click in the AI Sidebar now shows a Copy and Paste menu.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
