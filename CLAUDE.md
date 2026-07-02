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
  index.json      drive manifest: { "title": "...", "type": "walled.garden/forum" }
  index.html      a <meta http-equiv="refresh"> to /.ui/ui.html (+ a plain link fallback)
  ui/ui.html      the SPA shell: a custom element + <script type="module" src="/.ui/app.js"> + <style>
  ui/app.js       the app logic, using the global beaker.* APIs
```

Key rules:
- **`/ui/` → `/.ui/` on copy.** Hugo will not serve dot-folders, so template sources keep the frontend in
  `ui/`, and the create script rewrites the path to `/.ui/` when writing into the drive (see the HACK in
  `static/templates/index.js`). In the drive the frontend lives at `/.ui/ui.html`, which the Nomad protocol
  handler serves as the drive's custom frontend (SPA) for every HTML navigation.
- **Reference assets with absolute drive paths** (`/.ui/app.js`, `/thumb`) — the SPA is served for arbitrary
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
    '/index.html', '/index.json', '/ui/ui.html', '/ui/app.js'
  ]
</script>
<script src="/templates/index.js"></script>     // shared create-drive logic
```

`static/templates/index.js` creates the drive via `beaker.fs` (ADR-0010: `beaker.hyperdrive`/`beaker.autobase`
are gone) — `beaker.fs.createCollaborativeDrive({ collaborative: true })` when `TEMPLATE_DRIVE_TYPE ===
'autobase'`, else `beaker.fs.createDrive(...)` (locked/single-writer) — fetches each `TEMPLATE_FILES` entry, rewrites
`/ui/`→`/.ui/`, writes them in, and opens the drive. Only files listed in `TEMPLATE_FILES` are copied, so
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
