---
title: Devices & the Vault
description: Link multiple devices to one identity so they all read and edit your spaces and drives.
---

Nomad lets you link several **Devices** (computers, phones) to one identity, so every Device can read and edit all of your Spaces and Drives. This page explains the model and how linking works.

## The Vault

A **Vault** is a private, identity-level store that indexes your Spaces (by their Root Drive key) and your trusted Devices (by their writer key). It is the root of trust for multi-device: every Device you own is a Writer of the Vault.

The Vault is itself a [Collaborative Drive](/docs/api/advanced/collaborative-drives/) (Autobase), so it replicates between your Devices like any other multi-writer Drive — no central server.

## Setting up multi-device

The first time you link a Device, Nomad:

1. Creates your Vault.
2. Converts each Space's single-writer Root Drive into a Collaborative Drive so more than one Device can write to it. This is a one-time migration and changes those drives' internal keys (your public **Profile Drive** keeps its URL — see below).

Open **Settings → Devices** to begin.

## Adding a device

Linking uses an encrypted, approval-gated handshake (built on Holepunch's `blind-pairing`):

1. On a Device that's already set up, open **Settings → Devices → Add a device** to generate an invite code.
2. On the new Device, enter that code (Nomad mobile offers the same flow under its **Devices** screen).
3. The new Device appears as a **pending request** on the first Device. You approve it there — possessing the invite is not enough on its own.
4. Once approved, the new Device becomes a Writer of your Vault and every Space, and starts syncing.

## Removing a device

Each linked Device has a **Remove** action. Removing a Device stops it from making further accepted changes. Because Nomad is peer-to-peer, removal **cannot** retroactively un-share data the Device already synced, and that Device keeps its local copies. For a truly sensitive leak, treat the affected drives as compromised rather than relying on removal alone.

## Profile Drives and `writer-keys`

Your public **Profile Drive** is special: its `hyper://` URL is what your followers point at, so Nomad does **not** convert it to a Collaborative Drive (that would change the URL). Instead, multi-device authorship works by aggregation:

- The canonical Profile Drive publishes `/.data/walled.garden/writer-keys.json` — a `walled.garden/writer-keys` record listing all your Device keys.
- Each Device publishes posts under its own key, tagged with `author.writerKey`.
- Readers gather posts across every key in `writer-keys.json` and merge them as one identity.

If you build a social app that reads profiles, aggregate across the keys in `writer-keys.json` rather than assuming a single author key. See [Profile Drives](/docs/api/developers/profile-drives/) and [walled.garden Schemas](/docs/api/developers/walled-garden-schemas/).
