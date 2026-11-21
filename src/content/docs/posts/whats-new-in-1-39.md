---
categories:
  - Announcements
  - Releases
date: "2026-11-03"
description: Send direct messages as one of your Personas, on desktop and your phone, with no server in between. And watch a Job's run live in the AI Sidebar.
title: "Nomad 1.39: Messages between Personas, and Jobs you can watch"
---

Everything below is in [Nomad 1.39](https://github.com/knownasilya/nomad/releases/tag/v1.39.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Messages

Your [Personas](/posts/whats-new-in-1-34/) can now send each other direct messages. Each Persona has its own inbox, so the people who know you as *Work* never write to *Personal* by mistake, and nobody can tell the two are the same person. Open **Messages** from the browser menu, or from the menu on your phone.

![Messages, with a conversation between your Work Persona and Maya](/posts/whats-new-in-1-39/messages.webp)

To write to someone, open the site info panel on their profile drive and choose **Message**, or choose **New message** and paste their profile address or a message link they gave you. Messages are plain text. Nothing in a message loads by itself: no pictures, no attachments, no read receipts.

There's no server in between. Messages go straight from the sender's device to yours, encrypted and signed by the sender's Persona. Your computer and your phone both answer your inbox and save what arrives to your Vault, so every device shows every conversation. If none of your devices is online, the message waits on the sender's device and keeps trying.

You choose who can write to each Persona: only people you've written to, anyone you give your message link, or anyone with your profile address. A message from someone who isn't a contact waits in **Requests**, without a notification, until you **Accept**, **Ignore** or **Block** it. They're never told which one you chose.

![A message request from someone who isn't a contact, with Accept, Ignore and Block](/posts/whats-new-in-1-39/message-request.webp)

On the phone, Messages has the same Inbox and Requests, and a new message from a contact shows a notification. The [Messages guide](/docs/api/advanced/messages/) has the details, including what is and isn't private.

## Watch a Job as it runs

**Run with me** on an [AI Job](/posts/whats-new-in-1-36/) now opens the AI Sidebar to the run's chat. You see the Job's steps and its answer as they happen, and **Stop** ends the run. You can type a question while it runs, and it's sent when the Job is done.

![The AI Sidebar showing a Job's steps as it runs, with a question waiting until the Job is done](/posts/whats-new-in-1-39/job-in-sidebar.webp)

In My Library → Jobs, a Job that's running shows a **Running** badge and a **Watch** button, which opens its chat in the sidebar and brings its page forward. A run you watched has an **Open its chat** link in the Job's history, and the sidebar's history and the AI page mark these chats as a Job's.

![My Library → Jobs with a running Job, its Watch button, and Open its chat on a past run](/posts/whats-new-in-1-39/job-running.webp)

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
