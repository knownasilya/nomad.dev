---
categories:
  - Announcements
  - Releases
date: "2026-11-08"
description: Invite links, household contacts and reminders, Assets for any file in a Space, a command palette, vouches, and Jobs you can stop.
title: "Nomad 1.46: invite links, household contacts, and reminders"
---

Everything below is in [Nomad 1.46](https://github.com/knownasilya/nomad/releases/tag/v1.46.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Invite someone with a link

Inviting someone to a shared Space used to mean sending a code, which only meant something to a person who already had Nomad. Now **My Library → Sharing** makes an **invite link**. Pick whether they can view or edit, and how long the link works, from one day to a month. Send it any way you like: a text, an email, a chat.

![My Library, Sharing: Invite someone to Home, with Can view, 14 days and Make an invite link, the link with a Copy button, and a list of invite links, one used by Gran and one waiting, with Revoke](/posts/whats-new-in-1-46/invite-link.webp)

The link opens on any phone or computer. If they don't have Nomad yet, the page says who invited them and what the Space is, and points them to the download for their computer or phone. Everything in the invite is after the `#` in the link, which browsers never send to a server, so the page can't see it, and it loads nothing from anywhere else.

![The invite page on nomad.pages.dev on a phone, in light and dark: Ilya invited you to join Home, what Nomad is, Open the invite in Nomad, and download buttons for Linux, macOS and Android](/posts/whats-new-in-1-46/invite-page.webp)

With Nomad installed, **Open the invite in Nomad** takes them straight to the join screen with the invite filled in. If you have a Persona, the link is signed by it, and Nomad checks the signature before they join, so they know it really came from you.

![Ilya invited you to join Home. Signed by Ilya, a name field, and Not now or Join Home](/posts/whats-new-in-1-46/invite-accept.webp)

Having the link still isn't enough: you approve each person before they get in. Your computer shows a notification when someone asks, and any of your devices that manages the Space can approve them, not only the one that made the link. A link works once, and **Revoke** turns off one nobody has used. **Make a code instead** still gives a short code for people who already have Nomad.

**From your phone:** in the Space switcher, tap the pen next to a shared Space, then **Invite people**. Make a link and Android's share sheet opens. People waiting to join show up there with **Approve** and **Deny**, and as a notification. Tapping an invite link on the phone opens the join form.

## The household's contacts

Every Space now has its own contacts: the people the household calls who aren't on Nomad. The doctor, the school office, the babysitter, the plumber, the vet. Each has a name, who they are, a phone number, an email, an address and notes. They're at the top of **My Library → Contacts**, above your contacts on Nomad.

![My Library, Contacts: Home's contacts, with Dr. Patel, the Oakfield Primary office, Priya the babysitter, Rapid Plumbing and Riverside Vets, each with a phone number and who added it](/posts/whats-new-in-1-46/contacts.webp)

In a shared Space, everyone sees the same list, and each contact says who added it. Anyone who can edit can add and change them. When you share a Space, its contacts move with it.

On the phone, **Contacts** is in the menu. Tap someone to call, text or email them, or copy their number.

Your AI can read them too. Ask "what's the plumber's number?" or have a Job text the babysitter's details along with tonight's plans. It asks before it reads them the first time in a chat.

## Calendar reminders for the whole house

An event on the [family calendar](/posts/whats-new-in-1-44/) can now remind you: at the start, 5 to 30 minutes before, an hour or two before, or a day, two days or a week before. An all-day event reminds at 9 AM.

![Editing the Dentist: Maya event, with Remind set to 1 day before](/posts/whats-new-in-1-46/reminder.webp)

The reminder is part of the event, so in a shared Space everyone in it is reminded, on their phone and their computers. Put "Bins out" on the Home calendar with a reminder an hour before, and the whole house hears about it. The phone schedules the week's reminders ahead, so they show even when Nomad isn't open. Each device can turn them off under **Settings → Notifications → Calendar reminders**.

[Sharing a Space](/docs/api/advanced/sharing-a-space/) has the details on invites, contacts and reminders.

## Assets: any file, in any Space

The family album is now **Assets** (`nomad://assets`, and Assets on the phone), a place for any file in a Space, not only photos. Keep videos, voice memos, PDFs, Markdown notes, spreadsheets and code there, up to 25 MB each, sorted by month, with a search box and filters for each kind. On desktop you can read a PDF, a Markdown file, a CSV table or code right in Nomad; the phone shows pictures, video, audio, Markdown and text, and opens anything else in another app.

![Assets in the Home Space: 12 files by month, with All, Photos & videos, Documents and Audio filters, and photos, a video, a Markdown packing list, a PDF form, a budget CSV and a voice memo](/posts/whats-new-in-1-46/assets.webp)

In a shared Space everyone sees the same files. In a Space you haven't shared, they're yours, and they move with it when you share it. The album's photos are already there. Your AI can save a file to Assets too, and it asks first.

## A command palette

Press **Cmd+K** (Ctrl+K on Windows and Linux) for one box that does it all: type an address, jump to an open tab, reopen a page you visited, or open one of Nomad's own pages, all from the Space you're in. Your names come first, so typing a name and pressing Enter opens it. Start with `#` to search only your names. Enter opens a new tab, and Shift+Enter opens it in the tab you're on.

![The command palette over the Calendar, searching "lisbon": the name lisbon first, then an open tab, the name lisbon-trip, a recent page, and Search Startpage](/posts/whats-new-in-1-46/command-palette.webp)

## Vouch for the people you know

A Persona can now **vouch** for someone: a few words, like "Came for dinner and fixed our bike". It arrives in their Messages, and shows nowhere until they accept it. They decide who sees it: only them, a site they log in to, or anyone who reads their profile. When you look at a person's profile in site info, **Who vouched for them** shows who has. Vouches from people you don't know are tucked away under a link.

![Site info for Sam Patel, with Message and Vouch for them buttons, and two vouches under Who vouched for them](/posts/whats-new-in-1-46/vouches.webp)

A vouch says someone said so; it isn't proof. Weigh it by whether you know who said it. Your vouches are in **My Library → Personas → Vouches**, on desktop and the phone.

## Stop a Job, and watch it work

While a Job runs, its play button on **My Library → Jobs** turns into **Stop**, and opening it shows what it's doing, step by step, as it goes. A Job waiting in line can be dropped the same way. A run you stop is saved as stopped and notifies no one.

![The Jobs page with Check my bank balance running: its steps so far, live, a Stop button and Watch, and a stopped run in its history](/posts/whats-new-in-1-46/job-running.webp)

## Notifications on your computer

Your computer now shows a notification when a Job finishes with something to say, when someone in a shared Space posts a notice, and when a site or your AI is waiting for an answer in a tab you're not looking at. Click it to go straight there. **Settings → Notifications** has a switch for each.

## Everything else

- **Files you pick stay private.** When a site asks you to pick a file or folder, it now gets read-only access to just that, never the whole drive's address. Site info lists what each site can read under **Shared with this site**, and you can take any of it back.
- **Time pickers on the calendar.** Type a time like `930` or `3:30pm`, or pick one from the list. Moving the start moves the end, so the event keeps its length. On the phone, tapping a time opens an hour and minute grid.
- **The calendar shows times on a 12-hour clock**, like 3:30 PM.
- **Personas:** each site you're logged in to has an open button next to **Log out**.
- The Sharing page's This Space card is plainer, and the invite link reads well in dark mode.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
