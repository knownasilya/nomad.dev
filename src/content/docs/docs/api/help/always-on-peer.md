---
title: Keep your drives online
description: Run an always-on Peer on a NAS, a home server or a small VPS, so your Spaces stay reachable while your computers sleep.
---

Nomad has no servers. Your drives, your Vault and your shared Spaces are served by your own devices,
so when your laptop sleeps and your phone is in your pocket, nobody can reach them, and two of your
devices that are never online at the same time never sync.

An **always-on Peer** fixes that. It's a Nomad with no windows that you run on a machine that stays
on: a NAS, a home server, a Raspberry Pi, or a small VPS. It keeps a full copy of your Spaces and
serves it, so your devices sync through it and the people you share a Space with can reach your
Assets, calendar and notes at any hour.

## What a Peer can and can't do

- **It can read what it keeps.** It has your Vault's key, the way your devices do, and your Vault
  isn't encrypted. Treat the machine like one of your devices, and turn on disk encryption there.
- **It can't change anything.** It isn't a writer of your Vault or of any drive. It can't edit a
  note, publish a drive, add a device or act as you.
- **It never holds your secrets.** API keys stay on the computer that saved them, and AI settings
  and local databases aren't in the Vault, so a Peer never sees them.
- **Removing it** tells it to stop and delete its copies. A Peer that has been stolen keeps
  whatever it had already copied.

## Set one up

You need Node 20 or newer on the machine that stays on, and a checkout of the Nomad repository.

```sh
git clone https://github.com/knownasilya/nomad.git
cd nomad/mobile && npm install && cd ..
```

1. On a computer with Nomad, open **Settings → Devices** and choose **Add an always-on Peer**. It
   shows a `nomad-peer join` command with an invite code.
2. On the Peer's machine, run it from the `nomad` folder:

   ```sh
   node peer/index.mjs join <invite-code> --name "Home NAS"
   ```

3. Back in **Settings → Devices**, approve the request. It's labelled as an always-on Peer.
4. Start the Peer and keep it running:

   ```sh
   node peer/index.mjs run
   ```

Run it as a service so it starts again after a reboot, with systemd, a Docker restart policy, or
whatever your NAS uses. `node peer/index.mjs status` shows what it holds and how far it has synced.
Every command takes `--dir <folder>` for where the copies live (the default is `~/.nomad-peer`).

## Choose what it keeps

By default a Peer keeps your Vault, every Space with its Space Library and the drives listed in it,
and your Personas' profiles. The Peer's row in **Settings → Devices** (or **Devices** on the phone)
shows whether it's online, how much it has synced and how much space it uses, with a **Keep online**
switch for each Space. Turn one off and the Peer stops serving it on its next sync.

## At home or on a VPS

A Peer at home costs nothing extra and keeps your data in your house. Some home routers and mobile
networks make it hard for devices to reach each other directly; if your phone often can't reach the
Peer while you're out, see [Hole-punchability](/docs/api/help/hole-punchability/). A small VPS is
easier to reach from anywhere, and it means a hosting company runs the machine that holds a copy of
your data.

## Remove a Peer

Choose **Remove** on its row in **Settings → Devices** or on the phone. The Peer sees that within a
minute, stops, and deletes its folder. To stop one by hand, run
`node peer/index.mjs leave --yes` on it, then remove it in Settings → Devices too.
