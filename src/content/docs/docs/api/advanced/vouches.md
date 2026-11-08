---
title: Vouches
description: Say you've had someone over at your home, accept the vouches people give you, and choose who sees them.
---

A **vouch** is how people say "I know this person" offline: *I've had them over at my house.* In Nomad, one of your Personas can give another person's Persona a vouch. They decide whether to keep it and who sees it, you can take it back at any time, and whoever looks at it decides how much it's worth by whether they know you.

## What a vouch is, and what it isn't

A vouch says one thing: the person who gave it has had this person over at home. It can carry a short note.

It **isn't** proof that an account belongs to a real person. A group of made-up accounts can vouch for each other as much as they like, and one person can run two Personas. What a vouch does prove is narrower and honest: *someone you already trust says so.* That's why Nomad shows a vouch by who gave it, and never adds vouches up into a score, a badge or "verified".

A vouch has no place, no dates of visits and no count, so it can never help anyone find where someone lives. There are no ratings and no bad vouches: if you don't want someone near you, block them in [Messages](/docs/api/advanced/messages/).

## Give a vouch

1. Open the other person's profile drive, open the site info panel and choose **Vouch for them**. Or go to **My Library → Personas → Vouches** and choose **Give a vouch**, then paste their profile address or the message link they gave you.
2. Pick the Persona it comes from and add a note if you like.
3. Choose **Send vouch**.

The form says what giving means: *they can show this to sites and on their profile, with your name on it.* So only vouch for someone you're happy to be named next to.

The vouch travels as a [message](/docs/api/advanced/messages/), so it follows the same rules: if you aren't one of their contacts it waits in their Requests, and if they aren't taking messages the form tells you to ask them for a message link first.

Each vouch lasts **a year**. In its last month, **Renew** appears next to it in My Library, and renewing sends them the new one without asking them again.

To take a vouch back, choose **Withdraw**. It's quiet: nothing is sent. It simply stops checking out wherever it's shown.

## Accept a vouch

A vouch someone gives you waits as **New** in **My Library → Personas → Vouches**, or in **Personas** on your phone. It shows the giver's name, picture and drive key, and nobody sees it until you accept.

- **Accept** keeps it.
- **Decline** deletes it.

Neither is sent to the person who gave it.

## Choose who sees it

An accepted vouch is private until you say otherwise. For each one, choose:

| Setting | Who sees it |
|---|---|
| **Only me** (the default) | Your own devices. |
| **Sites I log into** | A site that asks for vouches when you log in. Every vouch starts unticked in the login prompt, so you pick it for each site. |
| **On my profile** | Anyone with your profile drive's address. Like anything published, copies may stay after you take it off. |

Showing a vouch shows who gave it. You can remove one at any time; if it was on your profile, it comes off.

## Seeing someone's vouches

On a profile drive's site info panel, **Who vouched for them** lists the vouches that profile shows:

- Vouches from people **you know** (your contacts, your names for drives, and drives you follow in Reader) are shown by name: *Maya vouched for Sam.*
- The rest fold into one line, like *2 more from people you don't know*. Open it to see their names, pictures and drive keys.

Withdrawn and expired vouches aren't shown at all. One whose giver's drive can't be reached right now says *couldn't check*.

## Privacy

- Who has been in whose home is private by default. A vouch you accept stays on your devices until you choose to show it.
- Your profile drive lists a fingerprint (a hash) of each vouch you've given, so anyone can check them. The list doesn't say who they're for, but it does show **how many** vouches you've given.
- If a fingerprint shows up in your profile drive that none of your devices wrote, Nomad warns you: someone else may be able to change that drive.
- Deleting a Persona withdraws every vouch it gave and deletes every vouch it holds.

Sites and drive apps get vouches only through the login prompt, when you tick them. See [`nomad.session`](/docs/api/apis/nomad.session/#asking-for-vouches) and the [`walled.garden/vouch`](/docs/api/developers/walled-garden-schemas/#vouch) schema.
