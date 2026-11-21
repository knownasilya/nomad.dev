---
categories:
  - Announcements
  - Releases
date: "2026-11-10"
description: Notes, files and drives remember the AI chat that made them, past chats on the phone's AI panel, notifications only where you are, a time limit for each Job, and a choice of how long a site keeps your private files.
title: "Nomad 1.48: see which AI chat made it, and your chats on the phone"
---

Everything below is in [Nomad 1.48](https://github.com/knownasilya/nomad/releases/tag/v1.48.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## See which AI chat made something

When your AI writes a Note, saves a file to Assets, makes a drive or writes a page in one, the thing it made now remembers which chat did it. Open the Note and **AI chats**, under Linked mentions, lists each one: "Made in the AI chat 'Plan the vegetable garden'", or "Updated by the AI Job 'Weekly seed deals'". Click one to open that chat in the AI Sidebar and pick up where you left off. A chat you've since deleted shows as "Made with AI".

![The Note Vegetable garden plan, with AI chats · 3 open under Linked mentions: Made in the AI chat Plan the vegetable garden, Updated by the AI Job Weekly seed deals, and Updated with AI](/posts/whats-new-in-1-48/notes-ai-chats.webp)

Files in Assets show the same line under the caption, and site info shows it for a drive your AI made.

![Planting calendar.md open in Assets, saved by your AI, with Made in the AI chat Plan the vegetable garden at the bottom](/posts/whats-new-in-1-48/asset-ai-chat.webp)

On the phone, a Note shows it as a chip in the topics bar, and tapping a chat opens it to read, or opens the Job.

## Your chats on the phone, and a roomier AI panel

The phone's AI panel now keeps your chats. Each one is saved in the Space, in the same place as the AI Sidebar's on your computer, so a chat you start on one can be opened and carried on from the other. The history button lists them by day, with search, rename and delete, and the empty panel shows your three newest.

![The phone's Chats list in light and dark: In this Space, on all your devices, a search box, and chats grouped under Today, Previous 7 days and Previous 30 days, one marked Job](/posts/whats-new-in-1-48/phone-chats.webp)

The panel itself has more room. Answers run the full width instead of sitting in a bubble. The text box holds the photo button, the tab the AI can see and Send. An empty panel suggests what to ask, a turn that fails has **Try again**, and the chat only scrolls with new text while you're at the bottom.

![A chat in the phone's AI panel in light and dark: planning a weekend in Lisbon, then saving it to Notes as Lisbon weekend](/posts/whats-new-in-1-48/phone-chat.webp)

## Notifications where you are

If you have Nomad on your phone and a computer, a Job's result, a notice in a shared Space, a new Message or a calendar reminder now shows only on the device you're using, not on all of them at once. When you haven't used any of them for a couple of minutes, they all notify as before. Questions that need your answer, like someone asking to join, still show everywhere.

On the home page, each notification has a button to dismiss it, and **Clear all** clears the lot. What you clear stays cleared on all your devices.

![The home page's Notifications card in light and dark, with Clear all, and a dismiss button on Photo backup](/posts/whats-new-in-1-48/notifications.webp)

## A time limit for each Job

A Job used to stop after 10 minutes. Now each Job has its own time limit, 30 minutes unless you pick another, from 10 minutes up to 8 hours, in the Job's settings in **My Library → Jobs**. The limit only counts while nobody's watching: when you follow a run in the AI Sidebar, with **Run with me** or **Watch**, it keeps going as long as you do. A run that hits its limit says so, and how to give it more time.

## Choose how long a site keeps your private files

When a page asks to read a file in your [private drive](/docs/api/apis/private-drive/), you now choose how long it can: 1 hour, 1 day, 1 week, 1 month or 3 months. The page can't pick for you.

![The prompt for a site to read hyper://private/address-book.json, with Allow for set to 1 week, in light and dark](/posts/whats-new-in-1-48/private-prompt.webp)

What you allow is kept until it ends, even if you restart. Site info's **Permissions** lists each one under **Your private drive**, with when it ends and a button to end it now.

![Site info's Permissions, with Your private drive listing /address-book.json, read until Nov 16, and /notes/, read and change until Nov 10, each with a button to end it](/posts/whats-new-in-1-48/private-grants.webp)

## Everything else

- **Videos and PDFs open on the phone again.** Big files, and files still coming from your computer, show how much has arrived instead of giving up, and a video whose name has a space plays. If the phone can't show a file, it offers to open it in another app. Adding a big file from the phone has more time too.
- AI chat links in site info are easier to tell apart in dark mode.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
