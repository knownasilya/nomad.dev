# nomad.dev — Claude guidelines

This is the Astro Starlight site for Nomad (docs + the drive-template gallery). The Nomad app itself lives in the
sibling `nomad` repo (see `nomad/CLAUDE.md`).

## Site layout

- Pages are Markdown in `src/content/docs/`. The folder path is the URL: `src/content/docs/docs/api/faq.md`
  is `/docs/api/faq/`. Use `.mdx` only when a page needs a component.
- A file name with a dot (`nomad.fs.md`) needs `slug:` in its front matter, or Astro drops the dot from the URL.
- `static/` is the public dir (`publicDir` in `astro.config.mjs`): template files, thumbnails, images.
- The sidebar is set in `astro.config.mjs`. Most groups `autogenerate` from a folder, so a new page in an
  existing folder appears on its own; a new folder needs a group there.
- Search is Starlight's built-in Pagefind index, built by `npm run build`. Run `npm run dev` to preview.
- Write links as absolute site paths (`/docs/api/apis/nomad.fs/`), not relative `.md` paths.

## Drive templates

A **template** is a starter drive a user clones with the "Create Drive From This Template" button. Each
template has two halves: the **files** that get copied into the new drive (`static/templates/<name>/`) and a
**docs page** that renders the create button + source (`src/content/docs/docs/templates/<name>.mdx`).

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
  docs at `src/content/docs/docs/api/developers/frontends.md`). The protocol handler serves it — 200 rewrite, URL
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

### The docs page (`src/content/docs/docs/templates/<name>.mdx`)

Front-matter (`title`, `description`), then the `CreateDrive` component, which renders the thumbnail and the
create button and loads the shared create script:

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components'
import ReadCode from '~/components/ReadCode.astro'
import CreateDrive from '~/components/CreateDrive.astro'

<CreateDrive
  root="/templates/forum"     // where the files are served (static/templates/forum)
  title="My Forum"            // initial drive title
  collaborative               // Collaborative Drive (Autobase); omit for a plain single-writer drive
  files={[                    // EXPLICIT list of files to copy (paths under root)
    '/index.html', '/index.json', '/app.js'
  ]}
/>
```

`src/components/CreateDrive.astro` sets the `TEMPLATE_*` globals and loads `static/templates/index.js`, which
creates the drive via `nomad.fs` (ADR-0010: `nomad.hyperdrive`/`nomad.autobase` are gone):
`nomad.fs.createCollaborativeDrive({ collaborative: true })` for a collaborative template, else
`nomad.fs.createDrive(...)` (locked/single-writer). It fetches each `files` entry, writes them in, and opens
the drive. Only listed files are copied, so extra files in the template dir are safe (and won't ship into
user drives).

Below the create block, add prose and a **Source** section: a `<Tabs>` with one
`<TabItem label="/app.js"><ReadCode path="/templates/<name>/app.js" lang="js" /></TabItem>` per file. `ReadCode`
paths are relative to `static/` (copy forum.mdx's structure).

### Listing a template (two places — one manual, one automatic)

- **Gallery (manual):** add an `<ImgCard href="/docs/templates/<name>/" img="/templates/<name>.png" />` card
  to `src/content/docs/docs/templates.mdx`. This is hand-curated — new pages do NOT appear here automatically.
- **Sidebar nav (automatic):** the Templates group in `astro.config.mjs` autogenerates from
  `src/content/docs/docs/templates/`, so a new page shows up on its own.

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

1. `static/templates/<name>/` — `index.json`, `index.html`, `app.js`.
2. `src/content/docs/docs/templates/<name>.mdx` — copy `forum.mdx`; set the `CreateDrive` props and the
   `ReadCode` source tabs.
3. Add the `ImgCard` to `src/content/docs/docs/templates.mdx`.
4. `npm run build` and check the page.
5. `scripts/template-thumbs/<name>.svg` → `node scripts/gen-template-thumb.mjs <name>`.
