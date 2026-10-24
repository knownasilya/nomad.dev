---
title: Introduction to Hyperdrive
---

Hyperdrive is a peer-to-peer network similar to BitTorrent with distinct differences.

## Similarities to BitTorrent

- Hyperdrives can be hosted from any user's device
- All data uses cryptographic authentication
- Peers discovered via DHT
- Peers can co-host to share bandwidth

## Key Differences

- Drives are addressed by public-key URLs, e.g. `hyper://12345..af`
- Files are signed for authenticity
- Files can be modified
- Change history is logged
- Only those knowing the public-key URL can connect

## Core Mechanics

A hyperdrive functions as a networked folder containing files, folders, symlinks, and mounts. Nomad's implementation supports executing web content.

**Public-key URLs** identify each drive using a 64-character hex string as the domain, with standard HTTPS-style paths, queries, and hash segments.

**Authorship** requires possessing the drive's private key for modifications. "Currently the private key cannot be shared between devices or users," limiting collaboration.

**Co-hosting** involves devices announcing themselves on the DHT Swarm to provide content.

**Caching** automatically stores accessed content locally for faster subsequent retrieval.

**Versioning** maintains linear history with an incrementable counter, allowing previous version access without Git-style branching.

**Mounts** function as symlinks between hyperdrives, similar to Git submodules.

**File K/V metadata** stores additional information like the `href` key for resource references.

**Querying** enables scanning multiple folders with filtering, sorting, and pagination capabilities.
