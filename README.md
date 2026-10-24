# Nomad.dev

The Nomad developer portal: docs, tutorials, and the drive-template gallery. Built with
[Astro Starlight](https://starlight.astro.build/), which gives the site full-text search
(Pagefind), dark mode, and a generated sidebar.

Pages are Markdown in `src/content/docs/`. A page that needs a component (tabs, cards, the
template create button) is `.mdx`. Template files, thumbnails, and other static assets live in
`static/` and are served from the site root.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

Node 22.23.4 or later is required (`.nvmrc` pins 24).

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node comes from `.nvmrc`. `HUGO_VERSION` is no longer used.
