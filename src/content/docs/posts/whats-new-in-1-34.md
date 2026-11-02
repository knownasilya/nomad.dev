---
categories:
  - Announcements
  - Releases
date: "2026-11-02"
description: Personas let you log in to sites as one of your own identities. A site sees nothing about you until you say yes, and then only what you left checked.
title: "Nomad 1.34: log in with a Persona"
---

Everything below is in [Nomad 1.34](https://github.com/knownasilya/nomad/releases/tag/v1.34.0), on desktop and Android. Your app updates itself, or you can download it from the release page.

## Personas

A Persona is who you are when a site asks you to log in. Each one is a profile drive of your own, with a name, a picture and a few words. You can have several: one for yourself, one for work, one for an old blog. Make and edit them in My Library → **Personas**.

![My Library → Personas, with three Personas, the Persona for each Space, and the sites you're logged in to](/posts/whats-new-in-1-34/library-personas.webp)

One Persona is your default. A Space can use a different one, so your Work Space logs you in as your work self without you having to pick each time. The Spaces button shows which Persona the Space uses.

## Logging in

When a site asks who you are, Nomad shows a prompt. Pick a Persona and choose what the site gets. A site sees nothing about you until you say yes. Even then it gets only a random ID made for that site, plus your name, picture and profile drive if you leave that box checked.

![The login prompt for forum.example.org, with a choice of three Personas and what the site will see](/posts/whats-new-in-1-34/login-prompt.webp)

A site can also ask for an email address. You set a Persona's email in My Library. It stays on your devices, never in the public profile drive, and a site gets it only if you leave that box checked.

![The login prompt with the email box checked](/posts/whats-new-in-1-34/login-email.webp)

A site stays logged in across reloads. The Persona icon in the location bar shows you're logged in. To see what a site can do, or to log out, open the site-info panel's **Logged in** tab. My Library lists every site you're logged in to.

![The site-info panel's Logged in tab, showing the Persona and what the site can do](/posts/whats-new-in-1-34/site-info.webp)

A Persona only logs in while its profile drive is written by your own devices. If someone else can write to it, Nomad won't use it to log in, and warns you before you add a writer.

## On the phone

The phone has a Personas screen. Pick your default and the Persona for the Space you're in, and log out of sites. Personas sync between your devices like the rest of your Vault.

![The phone's Personas screen](/posts/whats-new-in-1-34/phone-personas.webp)

## For developers

Sites and drive apps ask through [`nomad.session`](/docs/api/apis/nomad.session/). Call `requestLogin()` from a button, and you get back the Session the user agreed to. `getCurrent()` returns it on later visits, and a `change` event tells you when the user logs out or switches Persona.

## Everything else

The full list of changes is in the [changelog](https://github.com/knownasilya/nomad/blob/main/CHANGELOG.md). If something doesn't work the way you expect, [open an issue](https://github.com/knownasilya/nomad/issues).
