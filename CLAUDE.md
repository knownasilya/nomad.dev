# nomad.dev — Claude guidelines

This is the Hugo site for Nomad (docs + the drive-template gallery). The Nomad app itself lives in the
sibling `nomad` repo (see `nomad/CLAUDE.md`).

## Drive templates

A **template** is a starter drive a user clones with the "Create Drive From This Template" button. Each
template has two halves: the **files** that get copied into the new drive (`static/templates/<name>/`) and a
**docs page** that renders the create button + source (`content/docs/templates/<name>.md`).

Use the **forum** template as the canonical reference — it's the fullest example (an Autobase / multi-writer
drive with a custom frontend). The **blog** template is the reference for a `walled.garden/feed`.

### Anatomy (worked example: `forum`)

```
static/templates/forum/
  index.json      drive manifest: { "title": "...", "type": "walled.garden/forum",
                                    "fallback": "/index.html", "collaborative": true }
  index.html      the SPA shell: a custom element + <script type="module" src="/app.js"> + <style>
  app.js          the app logic, using the global nomad.* APIs
```

Key rules:
- **`/index.html` is the app shell, declared via the manifest `fallback`** (ADR-0015 in the nomad repo;
  docs at `content/docs/api/developers/frontends.md`). The protocol handler serves it — 200 rewrite, URL
  unchanged — for any page navigation that misses; real files always win, so app routes must be paths
  with no real file (and no `index.*` directory index) behind them. That's why the blog's post body is
  `post.md`, not `index.md` (ADR-0009 amendment): `/posts/<slug>/` stays a natural miss, so the shell
  serves the themed post at the canonical URL. The legacy `/.ui/ui.html` takeover (and the old
  `/ui/`→`/.ui/` copy HACK in `static/templates/index.js`) is gone from all templates.
- **Autobase templates must put `"collaborative": true` in their `index.json`** — the template's manifest
  overwrites the one `createCollaborativeDrive` wrote, so omitting it silently re-locks the drive.
- **Reference assets with absolute drive paths** (`/app.js`, `/thumb`) — the shell is served for arbitrary
  paths (e.g. `/posts/x/`), so relative URLs would break.
- **`index.json` `type`** identifies the drive (e.g. `walled.garden/feed` for a blog). Nomad recognises some
  types (person, feed) and surfaces chrome for them.

### The docs page (`content/docs/templates/<name>.md`)

Front-matter (`title`, `description`) + a `{{< rawhtml >}}` block that wires up the shared create script:

```html
<button class="create-drive">Create Drive From This Template</button>
<script>
  const TEMPLATE_ROOT = '/templates/forum'      // where the files are served
  const TEMPLATE_TITLE = 'My Forum'             // initial drive title
  window.TEMPLATE_DRIVE_TYPE = 'autobase'       // 'autobase' = Collaborative Drive; omit for a plain Hyperdrive
  window.TEMPLATE_FILES = [                      // EXPLICIT list of files to copy (paths under TEMPLATE_ROOT)
    '/index.html', '/index.json', '/app.js'
  ]
</script>
<script src="/templates/index.js"></script>     // shared create-drive logic
```

`static/templates/index.js` creates the drive via `nomad.fs` (ADR-0010: `nomad.hyperdrive`/`nomad.autobase`
are gone) — `nomad.fs.createCollaborativeDrive({ collaborative: true })` when `TEMPLATE_DRIVE_TYPE ===
'autobase'`, else `nomad.fs.createDrive(...)` (locked/single-writer) — fetches each `TEMPLATE_FILES` entry,
writes them in, and opens the drive. Only files listed in `TEMPLATE_FILES` are copied, so
extra files in the template dir are safe (and won't ship into user drives).

Below the create block, add prose and a **Source** section using `{{< tabsraw >}}` + `{{< readcode "/static/templates/<name>/<file>" "<lang>" >}}` tabs (copy forum.md's structure).

### Listing a template (two places — one manual, one automatic)

- **Gallery (manual):** add an `{{< imgcard relref="./templates/<name>" img="/templates/<name>.png" >}}` card
  to `content/docs/templates.md`. This is hand-curated — new pages do NOT appear here automatically.
- **Sidebar nav (automatic):** the Hugo Book theme builds the sidebar from the content tree (there is no
  `content/menu` bundle), so a new `content/docs/templates/<name>.md` shows up on its own.

### Thumbnail (`static/templates/<name>.png`, 800×400)

Both the gallery card and the page's `template-thumb` image use `static/templates/<name>.png`. Generate it
from an SVG source with the helper script:

```
# source:  scripts/template-thumbs/<name>.svg   (800x400 viewBox)
# output:  static/templates/<name>.png
node scripts/gen-template-thumb.mjs <name>        # or no args to render all sources
```

The script shells out to `rsvg-convert` (`brew install librsvg`). `scripts/template-thumbs/blog.svg` is a
worked example you can copy.

### Checklist to add a template

1. `static/templates/<name>/` — `index.json`, `index.html`, `ui/ui.html`, `ui/app.js`.
2. `content/docs/templates/<name>.md` — copy `forum.md`; set `TEMPLATE_*` and the `readcode` source tabs.
3. Add the `imgcard` to `content/docs/templates.md`.
4. `scripts/template-thumbs/<name>.svg` → `node scripts/gen-template-thumb.mjs <name>`.
