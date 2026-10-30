---
title: Discovery & Search
description: How a Drive opts into public discovery — the indexable switch, Topics, and Keywords — and how the manifest-only search index works.
---

Nomad addresses every Drive by a 32-byte public key, and a Drive announces on the swarm under its
**discovery key** = `hash(publicKey)` — a "prove you know the key" gate, not a directory. That is
great for privacy but means a Drive you were never handed the key to is **undiscoverable by design**.

Discovery is the deliberate, **opt-in** escape hatch: a Drive can choose to appear on a public
noticeboard so search engines can find it. Nothing is listed unless its author asks for it.

See ADR-0014 (the announce topic) and ADR-0016 (this vocabulary) for the full rationale.

---

## The three manifest fields

All three live in a Drive's `/index.json` and work on **any** Drive type (a blog, an app, a profile —
not just feeds). They are managed for you by the **Site Info panel** ("List this drive publicly for
search"), or you can set them directly with [`nomad.fs.configure`](/docs/api/apis/nomad.fs/).

```json
{
  "title": "Permaculture Weekly",
  "description": "Notes on raised beds and composting",
  "indexable": true,
  "topics": ["gardening", "permaculture"],
  "keywords": ["raised beds", "compost", "no-dig"]
}
```

### `indexable` — the listing switch

A boolean. **This, and only this, opts the Drive into discovery.** When `true`, the Drive announces
itself on the well-known index topic so crawlers can find it. Absent or `false` means it is never
listed — exactly as unfindable as a Drive with no discovery vocabulary at all.

- Declaring Topics or Keywords **does not** list a Drive; only `indexable: true` does.
- A listed Drive with **no** Topics is still searchable by its title, description, and Keywords.
- Never set on private, Vault, or Root drives — the Site Info UI only offers it for writable,
  non-system drives.
- Un-listing (`indexable: false`) removes the Drive from indexes, but its bytes still replicate to
  anyone holding the key. **This is a listing layer, never deletion.**

### `topics` vs `keywords` — a deliberate split

These look similar but do different jobs. The one-line distinction: **Topics scope the search;
Keywords match within it.**

| | **Topics** | **Keywords** |
|---|---|---|
| Question they answer | "What category is this?" | "What words should surface this?" |
| Role in search | Exact-match facet — a **shelf** you browse or scope by | Search text — matched alongside title & description |
| Compared as | **Identities** (equality across the network) | **Text** (case-insensitively matched) |
| Normalization | Lowercase hyphenated **slug**, any script (`raised-beds`) | Free text, spaces allowed, wording preserved |
| Limit | **5** per Drive | **12** per Drive |

Why the split matters:

- **Topics are canonicalized because there is no registry.** Independent indexers must agree that two
  Drives declaring `gardening` sit on the *same* shelf, without a central authority folding
  `Gardening`, `gardening`, and `Raised Beds` together. So Topics are slugified (`Raised Beds` →
  `raised-beds`) and you get at most five — they describe *what the Drive is*, not everything it
  mentions.
- **Keywords are just search text.** They widen the net of queries that hit your Drive (`permaculture`,
  `no-dig`) but place it on no shelf. They are matched, never compared, so they keep your wording and
  aren't slugified. The 12-cap is an anti-spam limit enforced by the indexer — stuffing more buys
  nothing.

The tell for which field to use: if you want your Drive to appear in a **browsable directory of like
things**, that's a **Topic**. If you want it to **turn up for a phrase someone might type**, that's a
**Keyword**.

Values you write are normalized on save (topics slugified & de-duped, capped at 5; keywords trimmed &
de-duped, capped at 12), and a well-behaved indexer re-enforces those caps on its side.

---

## How search finds a Drive

Search is a plain aggregation layer *beside* the protocol — no central registry owns the namespace,
and any number of indexers can run.

1. A listed Drive announces on a single well-known topic derived from a public constant
   (`hash('walled.garden/index/v1')`) — the same 32 bytes for everyone, computable without holding
   any Drive key.
2. A **crawler** joins that topic and, over a small `nomad/listing` handshake, receives each listed
   Drive's key plus its manifest-only fields (title, description, topics, keywords).
3. The crawler builds an inverted index and serves a search API. **The unit of search is the Drive,
   described by its own manifest** — v1 does not crawl post bodies, so a good `title`/`description` is
   what makes your Drive findable.
4. The built-in **`nomad://search`** app asks every index the user added, each under a name they
   choose, alongside the browser's own crawler, so no indexer is privileged. Results from all of them
   are merged into one list, and each result notes which index found it.

Two consequences worth knowing as an author:

- **Your metadata is both your visibility and the spam defense.** A lazy description means a nearly
  invisible Drive, no matter how good the content is.
- **Follows are never crawled.** Who follows a Drive is stored only on the follower's side and never
  announced (ADR-0013). Discovery advertises the *Drive*, never its audience.

---

## Running an indexer

The reference crawler is a standalone, ownerless peer at `app/tools/crawler.mjs` in the Nomad repo:

```
node app/tools/crawler.mjs --port 8787
# GET /search?q=<terms>&topic=<slug>   ·   /topics   ·   /stats
```

It holds no privileged position — it only reads what listed Drives volunteer. Run your own and add it
to `nomad://search` as a source: open the sliders button next to the search box, give it a name and
its address. Sources are kept on all your devices.
