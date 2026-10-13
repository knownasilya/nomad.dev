# Nomad.dev

Uses [Hugo 0.142.0](https://gohugo.io/) to build. Keep `HUGO_VERSION` in the Cloudflare Pages settings at the same version.

The compiled theme CSS is cached in `resources/_gen/`. When you change the SCSS, build with Hugo extended and commit the new cache file with `git add -f`.
