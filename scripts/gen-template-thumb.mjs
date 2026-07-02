#!/usr/bin/env node
// Generate template gallery thumbnails (800x400 PNG) from SVG sources.
//
//   source:  scripts/template-thumbs/<name>.svg   (use an 800x400 viewBox)
//   output:  static/templates/<name>.png          (referenced by content/docs/templates.md
//                                                   and each content/docs/templates/<name>.md)
//
// Usage:
//   node scripts/gen-template-thumb.mjs              # render every source SVG
//   node scripts/gen-template-thumb.mjs blog forum   # render specific ones
//
// Requires `rsvg-convert` (macOS: `brew install librsvg`).

import { execFileSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, 'template-thumbs')
const OUT_DIR = path.join(__dirname, '..', 'static', 'templates')
const WIDTH = 800
const HEIGHT = 400

function hasRsvg() {
  try {
    execFileSync('rsvg-convert', ['--version'], { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function render(name) {
  const src = path.join(SRC_DIR, `${name}.svg`)
  if (!fs.existsSync(src)) {
    throw new Error(`no source SVG at ${path.relative(process.cwd(), src)}`)
  }
  const out = path.join(OUT_DIR, `${name}.png`)
  execFileSync(
    'rsvg-convert',
    ['-w', String(WIDTH), '-h', String(HEIGHT), src, '-o', out],
    { stdio: 'inherit' }
  )
  console.log(`wrote ${path.relative(process.cwd(), out)} (${WIDTH}x${HEIGHT})`)
}

if (!hasRsvg()) {
  console.error('rsvg-convert not found. Install it with:  brew install librsvg')
  process.exit(1)
}

let names = process.argv.slice(2)
if (!names.length) {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(`no source directory: ${path.relative(process.cwd(), SRC_DIR)}`)
    process.exit(1)
  }
  names = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.replace(/\.svg$/, ''))
}

if (!names.length) {
  console.log('no SVG sources to render')
  process.exit(0)
}

let failed = 0
for (const name of names) {
  try {
    render(name)
  } catch (e) {
    console.error(`FAIL ${name}: ${e.message}`)
    failed++
  }
}
process.exit(failed ? 1 : 0)
