---
categories:
  - Announcements
  - Releases
date: "2026-11-08"
description: Invite someone to a shared Space with a link that works before they have Nomad, keep the household's contacts together, and calendar reminders for everyone in the house.
title: "Nomad 1.46: invite links, household contacts, and reminders"
---

Everything below is in Nomad 1.46, on desktop and Android. Your app updates itself, or you can download it from the [releases page](https://github.com/knownasilya/nomad/releases/latest).

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
