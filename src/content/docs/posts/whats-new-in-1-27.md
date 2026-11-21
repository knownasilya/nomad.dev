---
categories:
  - Announcements
  - Releases
date: "2026-10-31"
description: AI Jobs that notify your phone, shared Spaces, charts and maps in the AI Sidebar, an assistant that can use the page, live Document drives, and a phone app that feels native.
title: "Nomad 1.27: AI Jobs, shared Spaces, and an assistant that uses the page"
---

A lot has landed in Nomad since 1.22. This post walks through the biggest pieces, from the AI that now runs on a schedule to Spaces you can share with other people. Everything below is in [Nomad 1.27](https://github.com/knownasilya/nomad/releases/tag/v1.27.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## AI Jobs

A **Job** is a prompt your AI runs by itself, by hand or on a schedule. "Every weekday at 8:00, sum up my unread Reader posts." "Every two hours, tell me if Ada posted." Each run is saved, so you can read back what it found, and a run can send a notification to your phone.

![My Library → Jobs, with a Morning digest Job, its prompt and its last runs](/posts/whats-new-in-1-27/jobs-desktop.webp)

Make a Job in **My Library → Jobs**, or just ask the AI Sidebar to make one for you. A Job can read your Notes, Reader, drives and the web, and it changes nothing. It runs on the computer that made it, while that computer is awake, using that computer's AI runtime.

The phone lists your Jobs and their runs, can run one now, and can turn one on or off. When a run finishes, it shows up as a notification.

![AI Jobs on the phone, in light and dark](/posts/whats-new-in-1-27/jobs-phone.webp)

For developers: a Job can come from a drive. Put the prompt in `job.md`, and optionally a `job.js` module that runs first to gather data. If the drive is yours, the Job follows it live. If it's someone else's, Nomad copies it in, and a newer version waits in My Library for you to accept.

## Share a Space

Spaces have kept your work and personal browsing apart for a while. Now a Space can have its own library, and you can **share it with other people**. Each person either **can view** or **can edit**.

A shared Space's drives, contacts, bookmarks, Reader feeds, and the Notes and Names you keep only in that Space move into a Space Library that everyone in it syncs. Your private drive, your AI chats and your Vault stay yours.

![Names in My Library, with Work-only names above the names for every Space](/posts/whats-new-in-1-27/space-names.webp)

Share a Space from **My Library → Sharing**. You make a single-use invite code, the other person enters it, and you approve them. Someone who can only view can **Ask to edit** a drive from its site info, and anyone who writes it can say yes. On the phone, join a shared Space from the Space switcher. Read [Sharing a Space](/docs/api/advanced/sharing-a-space/) for the details.

## Charts, maps and cards in the AI Sidebar

The AI Sidebar's answers aren't only text anymore. When a chart, a map or a table says it better, the assistant draws one right in the conversation: stats, line, bar, pie and scatter charts, tables, tabs, steps, and buttons that only do something when you click them.

![The AI Sidebar answering "How did my blog do this week?" with stat tiles, a line chart and a bar chart, in light and dark](/posts/whats-new-in-1-27/genui-dashboard.webp)

Ask it to plan a walk and you get a map with numbered stops on OpenStreetMap. Ask about a product, an event or a person, and you get a card made for it, with links that open in a new tab when you click them.

![A two-day walk through Lisbon on a map, in light and dark](/posts/whats-new-in-1-27/genui-map.webp)

All of it follows light and dark mode.

## The AI Sidebar can use the page

Ask the AI Sidebar to fill in a form, find something on a page, or click through a few screens, and it does it in your tab with real clicks and keys while you watch. A cursor shows where it's working, and a Stop bar is there the whole time. Press Esc or click in the page to take over at any point.

The first time the AI acts on a site, Nomad asks you, and a yes lasts 30 days for that site. It can't type into password, payment or file fields, and a click that buys, sends, posts or deletes asks you first. If a site gives the assistant its own [WebMCP](/docs/api/developers/webmcp/) tools, the assistant uses those instead.

## Steer the AI while it works

You no longer have to wait for the assistant to finish before you add something. The input stays open while it works. Send a message and it goes into the running turn at the assistant's next step, so you can correct course ("keep the old class names") without stopping and starting over.

![A message queued for the assistant's next step, then read into the conversation, in light and dark](/posts/whats-new-in-1-27/steer-sidebar.webp)

A queued message shows under the answer until the assistant reads it, and you can take it back before then. Steering works in the AI Sidebar and in the phone's AI panel.

## Update your computer from your phone

When the phone updates itself, it can ask your computers to update too. Tap **Update** on the banner, or **Update and restart** under a computer in Devices. The computer downloads the new version, shows its progress on the phone, and restarts with your tabs right where they were.

![Devices and Settings on the phone, with Update and restart under a computer running an older version](/posts/whats-new-in-1-27/update-from-phone.webp)

Devices also shows which version each device runs, and warns you when they don't match. Turn remote updates off in **Settings → Auto Updater** on the computer.

## Document drives

**New Drive → Document** makes a page several people can edit at the same time, like a Notion page. Everyone who can write the drive sees the others' text and cursors as they type, and edits made offline merge in when the device reconnects, with nothing lost.

![The Create Collaborative Drive dialog with Document selected](/posts/whats-new-in-1-27/document-drive.webp)

Developers can make one with `nomad.fs.createDrive({ template: 'document' })`. [Document drives](/docs/api/developers/document-drives/) explains how they store text and share edits live.

## A canvas for your Notes

Notes has a **Canvas** view next to List. Every note is a dot and every link between notes is a line, so you can see how your notes connect. Drag to pan, scroll to zoom, hover a note to light up its links, and click one to open it. The search box dims the notes that don't match.

![The Notes canvas, with Garden plan linked to Compost, Seed order and Watering schedule](/posts/whats-new-in-1-27/notes-canvas.webp)

## Delete history in bulk

Each row in History has a checkbox now. Tick a few, or shift-click to select a range like in Gmail, then delete them together.

![History with four rows selected and a Delete button](/posts/whats-new-in-1-27/history-delete.webp)

## A phone app that feels native

The Android app got a full pass to feel at home on the phone: real icons instead of text glyphs, a top bar with a back arrow on every screen, Material tabs, bottom sheets you can drag closed, a grouped menu with a row of quick actions, and long-press actions that ask before removing anything. Its dark mode now matches desktop's.

![The phone's home screen and menu, in light and dark](/posts/whats-new-in-1-27/mobile-redesign.webp)

Back now goes where you came from, through links, screens and folders. And you can open the tabs that are open on your other devices, grouped by Space, from History on desktop or the tab grid on the phone.

**Coming in 1.28:** the phone moves to a single top bar, pages run all the way to the bottom of the screen, and the top bar takes the site's own theme color.

![The phone's top bar painted in each site's theme color, in light and dark](/posts/whats-new-in-1-27/mobile-theme-color.webp)

## Everything else

The full list of changes, including the smaller fixes, is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
