---
title: Messages
description: Send direct messages as one of your Personas, choose who can write to you, and know what is and isn't private.
---

**Messages** are direct messages between Personas. Each of your Personas has its own inbox, so the people who know you as *Work* never write to *Personal* by mistake, and nobody can tell the two are the same person.

Open **Messages** from the browser menu (`nomad://messages`) on your computer, or from the menu on your phone.

## Write to someone

- On someone's profile drive, open the site info panel and choose **Message**. The message comes from the Persona of the Space you're in.
- In Messages, choose **New message** and paste their profile address (`hyper://…`) or a message link they gave you.

Messages are plain text, up to 8,000 characters. Links show as links, but nothing in a message loads by itself: no pictures, no attachments, no read receipts. To share a file, send a `hyper://` link to it.

Writing to someone makes them a contact of that Persona, so their answer goes straight to your inbox.

## Choose who can write to you

Each Persona's inbox is off until you write to someone. Change it in **My Library → Personas** on your computer, or on the phone in **Personas**, under the Persona.

| Setting | Who can write |
|---|---|
| **Only people I write to** (the default) | People you've written to can answer. Nobody else. |
| **People I give a link to** | Anyone you give your **message link** to. Copy it from the same place and share it however you like. |
| **Anyone, as requests** | Anyone who has your profile address. |

A message from someone who isn't a contact waits in **Requests**. It doesn't notify you. Choose:

- **Accept** to make them a contact. The conversation moves to your inbox.
- **Ignore** to delete the request. They can write once more.
- **Block** to drop everything they send from now on.

They're never told which one you chose. Each stranger gets one request until you answer it.

**Change inbox address** gives the Persona new keys. Your contacts keep working. Message links you gave out stop working after two weeks.

## Your devices

Every one of your devices that has your Vault answers your inbox: your computer while Nomad runs, and your phone while the app is open and for five minutes after you leave it. Whichever one receives a message saves it to your Vault, so all of them show it. You can write from any of them.

There's no server in between. When none of your devices is online, a message waits on the sender's device, which keeps trying for 30 days and then shows **Not delivered**.

Your computer shows a notification for each new message from a contact. Turn it off under the Persona in My Library → Personas. On the phone it's **Settings → Notifications → Messages**.

## What is and isn't private

Messages are encrypted from the sender's device to yours, and signed by the sender's Persona. Here is who can learn what:

| Who | What they can learn |
|---|---|
| Someone watching the network | That two addresses exchanged a few kilobytes. Not what was said, or which Personas. |
| The person you write to | Your Persona, your device's internet address, and when you sent it. |
| The person who writes to you | That one of your devices was online when the message arrived. Never whether you read it, ignored it or blocked them. |
| A site you're logged in to | Nothing about your messages. No site can read or send them. |
| Anyone with your profile address, when you allow **Anyone** | Where your devices are on the network. Never who writes to you. |
| Your own devices | Everything. Messages are stored in your Vault in plain text, like your Notes. |

What Messages **don't** give you:

- **No forward secrecy.** If someone copies your Vault, they can open messages they captured earlier. **Change inbox address** stops that for new messages.
- **No deniability.** Every message is signed, so whoever receives it can show it came from your Persona.
- **No hidden addresses.** The person you write to sees your device's internet address, as with any direct connection.

Your AI assistant doesn't read your messages.

## Deleting a Persona

Deleting a Persona deletes its messages, contacts and inbox keys on all your devices, and takes the inbox off its profile drive.

## For developers

Messages use two [walled.garden schemas](/docs/api/developers/walled-garden-schemas/): [`message`](/docs/api/developers/walled-garden-schemas/#message), and the `inbox` field of [`person`](/docs/api/developers/walled-garden-schemas/#person). There is no page API for messages.
