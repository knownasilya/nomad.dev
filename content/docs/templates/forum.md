---
title: Forum Template
description: A multi-writer discussion board template demonstrating beaker.autobase.
---

The forum template is a ready-to-use discussion board that demonstrates [Collaborative Drives]({{< relref "/docs/api/advanced/collaborative-drives" >}}), [Profile Drives]({{< relref "/docs/api/developers/profile-drives" >}}), and [walled.garden schemas]({{< relref "/docs/api/developers/walled-garden-schemas" >}}). It is the best starting point for any multi-writer app.

**Location:** `nomad://template/forum`

---

## What it demonstrates

- Creating and loading a Collaborative Drive
- Writer invitation and access request flow
- Reading and writing `walled.garden/post` and `walled.garden/comment` records
- Author identity resolution from writerKey → Profile Drive
- Validating data with `beaker.schemas.validate()` before writing

---

## File structure

```
index.json              ← { type: "walled.garden/forum", title: "..." }
ui/
  ui.html               ← app entry point (loads app.js as ES module)
  app.js                ← full app logic (vanilla JS, no framework)
```

Data created by writers at runtime:

```
posts/{timestamp}-{slug}.json       ← walled.garden/post
comments/{postPath}/{uuid}.json     ← walled.garden/comment
```

---

## Views

**Post list** — the default view. Lists all files under `/posts/`, sorted newest-first. Shows title, category, author name, and date.

**Thread view** — shows a post's body and all comments under `/comments/{path}/`. Writers can add comments.

**New post form** — writers fill in title, body, and an optional category. Data is validated with `beaker.schemas.validate('walled.garden/post', ...)` before writing.

**Writers panel** — shows approved writers with their profile cards. Owners see pending requests here and can approve, deny, or create new invite links.

---

## Permissions at a glance

| Action | Who can do it |
|--------|--------------|
| Read posts and comments | Anyone with the drive URL |
| Create posts, comments | Approved Writers |
| Approve or deny requests | Owner only |
| Generate invite links | Owner only |
| Remove writers | Owner only |

To become a writer, either:

1. **Receive an invite link** from the owner (`createInvite`) and open it in Nomad.
2. **Request access** via `beaker.autobase.requestAccess(driveUrl)` — the owner sees the request in the Writers panel.

---

## Creating a forum

Open the New Drive dialog, pick "Forum" from the templates list. Nomad:

1. Calls `beaker.autobase.createCollaborativeDrive({ title: 'My Forum', type: 'walled.garden/forum' })`.
2. Writes the `index.json` with your chosen title.
3. Opens the drive — you land on an empty post list as the owner.

Share the `hyper://…` URL with readers. Use "Create Invite" in the Writers panel to give someone write access.

---

## Extending the template

The forum is intentionally minimal — copy the `ui/` folder into your own Collaborative Drive and adapt freely.

Common extensions:

- **Categories** — the `walled.garden/post` schema has an optional `category` field; add a sidebar filter.
- **Reactions** — write `walled.garden/reaction` records keyed to the post URL; aggregate them in the thread view.
- **Voting** — write `walled.garden/vote` records (value `1` or `-1`) and sort posts by score.
- **Feeds** — expose `beaker.hyperdrive.watch('/posts/')` to push new posts to subscribers.
