---
categories:
  - Announcements
  - Releases
date: "2026-11-21"
description: Websites can now make and use passkeys in Nomad. Nomad keeps them on your computer, asks you before a site uses one, and lists them in My Library.
title: "Nomad 1.54: sign in to websites with passkeys"
---

Everything below is in [Nomad 1.54](https://github.com/knownasilya/nomad/releases/tag/v1.54.0). Your app updates itself, or you can download it from the release page.

## Passkeys for websites

A passkey signs you in to a website without a password. Until now, a site that offered one got an error in Nomad. Now Nomad keeps your passkeys itself, the way a password manager does.

When a site offers to make a passkey, Nomad asks first. It shows the site, the account the passkey is for, and where it will be kept. On a Mac with Touch ID, you confirm with your finger.

![The "Save a passkey" prompt in light and dark, for login.trailhead.example and the account Ada Lovelace, with Cancel and "Save with Touch ID" buttons](/posts/whats-new-in-1-54/passkey-save.webp)

When you sign in, Nomad asks again. If you have more than one account on the site, pick the one to use.

![The "Sign in with a passkey" prompt in light and dark, with two accounts to pick from: Ada Lovelace, last used 2 days ago, and Lovelace Lab, saved 3 hours ago](/posts/whats-new-in-1-54/passkey-sign-in.webp)

Your passkeys stay on this computer, encrypted with its keychain. They don't sync to your other devices or go into shared Spaces. A site never gets the key itself, and no page can draw or press the prompt for you.

If you keep a passkey somewhere else, such as on your phone or a security key, pick **Use a phone or security key instead** in the prompt.

**My Library → Passkeys** lists your passkeys by site, with when each one was saved and last used. You can delete one there.

![My Library's Passkeys page in light and dark: passkeys for github.com, pastel.example and trailhead.example, each with when it was saved and last used and a delete button](/posts/whats-new-in-1-54/passkeys-library.webp)

Passkeys work on desktop for https sites and for `http://localhost`, so you can test your own sign-in page. They aren't on the phone yet.

## Your AI stops when it goes in circles

Sometimes the AI repeated the same step without getting anywhere, for example reading a saved value again and again while it waited for it to change. A Job could do this for as long as it ran. Now Nomad notices when a step gives the same result again. After the third time it tells the AI that calling again won't change anything. After the sixth, it tells the AI to answer now, and it ends the turn if the AI keeps going. Code the AI runs is stopped too when it makes the same call ten times.

## Also in 1.54

The built-in Blog and Forum templates now find your profile with the drive picker. They ask once, then remember it.

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
