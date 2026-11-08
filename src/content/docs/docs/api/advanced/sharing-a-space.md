---
title: Sharing a Space
description: Share a Space's drives, contacts, feeds, notes and names with other people, invite them with a link, and keep the household's contacts and reminders together.
---

A **Space** can have its own library: its own drives, contacts, bookmarks, Reader feeds, notes and names, next to the ones that are yours in every Space. You can share a Space with other people. Each person **can view** everything in it, or **can edit** everything in it. Someone who can only view can ask to edit one drive.

## What gets shared

When you share a Space, its library moves into a **Space Library** that everyone in the Space syncs:

- The drives and contacts listed in the Space.
- Its bookmarks and Reader feeds.
- The notes and names you kept **only in this Space**.

What stays yours:

- Your private drive (`hyper://private/`), your AI chats and your Vault.
- Your notes and names for every Space.
- What you've read in Reader.

Everyone you invite can read every drive the Space lists. If a drive should stay private, keep it in another Space.

Your **Personal** Space holds your own things, so it can't be shared. Make another Space, or switch to one, to share it.

## Share a Space

1. Switch to the Space you want to share.
2. Open **My Library → Sharing**. It shows what will be shared, for example "4 drives, 1 contact, 12 notes".
3. Enter the name the others will see, then choose **Share this Space**.

Your other linked Devices see the Space as shared too.

## Invite someone

1. In **My Library → Sharing**, under **Invite someone**, choose **Can view** or **Can edit** and how long the link works (1, 7, 14 or 30 days), then **Make an invite link**.
2. Send the link to one person, by text, email or anything else. It works once.
3. When they open it, their request appears under **Waiting to join**, and your computer shows a notification. Choose **Approve** or **Deny**. Having the link isn't enough on its own.

The link opens on any phone or computer, even one without Nomad. The page says who invited them and helps them download Nomad, then hands the invite over. Everything in the invite is after the `#` in the link, so the page's server never sees it. If one of your Personas has a profile, the link is signed by it, and Nomad checks the signature before they join.

Any of your Devices that manages the Space can approve the request, so it doesn't matter which one made the link. Your open links are listed under **Invite links**, with **Revoke**.

**Make a code instead** gives a short code for someone who already has Nomad. Only the Device that made a code can approve it.

**From your phone:** open the Space switcher, tap the pen next to a shared Space, then **Invite people**. Pick what they can do and how long the link works, and **Make an invite link** opens Android's share sheet. Requests to join show up there and as a notification.

Once you approve them, the Space appears on their Devices with the same name and color.

## Join a shared Space

- **From a link:** open it. With Nomad installed, **Open the invite in Nomad** takes you to **My Library → Sharing** on a computer, or the Space switcher on your phone, with the invite filled in. It says who sent it and whether Nomad could check that. Enter your name and choose **Join**.
- **On a computer:** you can also paste the link or a code under **Join a shared Space** in **My Library → Sharing**.
- **On your phone:** open the Space switcher, choose **Join a shared space**, and paste the link or the code. The phone needs to be [linked to your computer](/docs/api/advanced/devices-and-the-vault/) first.

Nomad waits until an owner approves you, then switches to the new Space. Your other Devices get it too.

## The household's contacts

Every Space has its own list of people who aren't on Nomad: the doctor, the school office, the babysitter, the plumber. Find it at the top of **My Library → Contacts**, or under **Contacts** in the phone's menu. Each one has a name, who they are, a phone number, an email, an address and notes. On the phone, tap one to call, text or email them.

In a shared Space, everyone sees the same list, and each contact says who added it. Anyone who can edit can add and change them. When you share a Space, its contacts move with it.

Your AI can read them when you ask, for example "what's the plumber's number?". It asks first.

## Reminders for the household

An event on the [calendar](/posts/whats-new-in-1-44/) can remind everyone who sees it: at the start, minutes or hours before, or a day or a week before. An all-day event reminds at 9 AM. In a shared Space, everyone in it gets the reminder on their phone and computers. Turn them off in **Settings → Notifications → Calendar reminders**, on each Device.

## Roles

| Role | Can do |
| --- | --- |
| **Owner** | Everything an editor can, plus invite people, change roles and remove people. |
| **Can edit** | Read and change everything in the Space: its drives, contacts, bookmarks, feeds, notes and names. |
| **Can view** | Read everything in the Space. Can ask to edit one drive. |

An owner changes someone's role, or removes them, from the **People** list in **My Library → Sharing**. A Space always has at least one owner.

## Ask to edit a drive

If you can only view a Space, open one of its drives and click the site-info button in the address bar, then **Ask to edit**. You can add a note saying why.

Anyone who can edit that drive sees the request in **My Library → Sharing**, under **Asking to edit a drive**, and can **Approve** or **Deny** it. Approving lets you edit that one drive, only in that Space. You still can only view the rest.

Someone who can edit the Space doesn't need to ask: their Devices are added to its drives on their own when they open them.

## Leave or remove someone

- **Leave:** choose **Leave** at the bottom of **My Library → Sharing**, or **Leave space** in the Space's edit form in the Spaces menu or the phone's Space switcher ([Managing Your Spaces](/docs/api/beginner/managing-your-spaces/)). The Space goes from all your Devices. If you're the only owner, make someone else an owner first.
- **Remove someone:** an owner chooses the × next to their name.

Removing someone stops their changes. It can't take back what they already synced: they keep what they have, and can still read the drives the Space listed. If that matters, move those drives to a new Space and invite the others again.
