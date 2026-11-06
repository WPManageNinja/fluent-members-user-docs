#!/usr/bin/env node
// Drift guard for the doc trees in .vitepress/trees/*.json.
// Fails (exit 1) when a tree disagrees with the docs. Warnings print but do not fail.
// Run: node scripts/qa/check-trees.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const treesDir = join(root, '.vitepress', 'trees')
const docsDir = join(root, 'docs')
const config = readFileSync(join(root, '.vitepress', 'config.mjs'), 'utf8')

// The page whose quick start is built from a tree's `journey` (see CLAUDE.md, Doc trees).
const INTRO = '/docs/getting-started/introduction'

// served URL (/docs/<category>/.../<slug>, /reference/<slug>) -> file path; index.md serves the folder URL
const pages = new Map()
function walk(dir, base) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name), `${base}/${e.name}`)
    else if (e.name === 'index.md') pages.set(`${base}/`, join(dir, e.name))
    else if (e.name.endsWith('.md')) pages.set(`${base}/${e.name.slice(0, -3)}`, join(dir, e.name))
  }
}
walk(docsDir, '/docs')
walk(join(root, 'reference'), '/reference')

const errors = []
const warnings = []
const err = (tree, msg) => errors.push(`[${tree}] ${msg}`)
const warn = (tree, msg) => warnings.push(`[${tree}] ${msg}`)

const trees = readdirSync(treesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(treesDir, f), 'utf8')))
const treeById = new Map(trees.map((t) => [t.id, t]))

// Links a reader can reach from the sidebar: hand-written `link: '/x'` in config.mjs, plus
// the pages each tree-built sidebar group adds (trees whose group is swapped in via treeSidebarGroup).
const sidebarLinks = new Set([...config.matchAll(/link:\s*'([^']+)'/g)].map((m) => m[1]))
for (const t of trees) {
  if (t.strip === false || !config.includes(`treeById('${t.id}')`)) continue
  sidebarLinks.add(t.overview)
  for (const b of t.branches) if (!b.mapOnly) for (const n of b.nodes) if (n.inGroup !== false) sidebarLinks.add(n.link)
  const byId = new Map(t.branches.flatMap((b) => b.nodes).map((n) => [n.id, n]))
  for (const s of t.sidebarSections ?? []) for (const nid of s.nodes) if (byId.has(nid)) sidebarLinks.add(byId.get(nid).link)
}

for (const tree of trees) {
  const id = tree.id
  const hub = tree.kind === 'hub'
  const nodes = tree.branches.flatMap((b) => b.nodes)
  const ids = new Set()
  const links = new Map()

  if (tree.kind && !['panel', 'hub'].includes(tree.kind)) err(id, `invalid kind "${tree.kind}"`)

  // Nested sidebar sections: ids must exist, each page once, and every in-group page must be listed.
  if (tree.sidebarSections) {
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const listed = new Set()
    for (const sec of tree.sidebarSections) {
      if (!sec.text?.trim() || !Array.isArray(sec.nodes) || !sec.nodes.length) err(id, `sidebar section "${sec.text}" needs text and nodes`)
      for (const nid of sec.nodes ?? []) {
        const node = byId.get(nid)
        if (!node) { err(id, `sidebar section "${sec.text}" lists unknown node "${nid}"`); continue }
        if (listed.has(node.link)) err(id, `sidebar lists ${node.link} more than once`)
        listed.add(node.link)
      }
    }
    for (const b of tree.branches) if (!b.mapOnly) for (const n of b.nodes)
      if (n.inGroup !== false && !listed.has(n.link)) err(id, `node "${n.id}" (${n.link}) is in the group but missing from sidebarSections`)
  }

  const overview = pages.get(tree.overview)
  if (!overview) err(id, `overview page ${tree.overview} not found`)
  else {
    const text = readFileSync(overview, 'utf8')
    if (!hub && !text.includes(`::: doc-tree ${id} panel`))
      err(id, `overview ${tree.overview} has no "::: doc-tree ${id} panel" line`)
    if (hub && !new RegExp(`^::: doc-tree ${id} (panel|map)\\s*$`, 'm').test(text))
      err(id, `overview ${tree.overview} has no "::: doc-tree ${id} map" (or panel) line`)
    if (tree.journey?.length && !text.includes(`::: doc-tree ${id} journey`))
      err(id, `tree has journey steps but ${tree.overview} has no "::: doc-tree ${id} journey" line`)
  }

  for (const n of nodes) {
    if (ids.has(n.id)) err(id, `duplicate node id "${n.id}"`)
    ids.add(n.id)
    // Panel trees often document two settings on one page (e.g. preset and custom colors), so only hubs warn.
    if (hub && links.has(n.link)) warn(id, `nodes "${links.get(n.link)}" and "${n.id}" both link to ${n.link}`)
    else links.set(n.link, n.id)
    if (n.facts && (!Array.isArray(n.facts) || n.facts.some((x) => !x?.trim()))) err(id, `node "${n.id}" has an empty fact`)
    if (!n.ux?.trim()) err(id, `node "${n.id}" needs a one-line "ux" description`)
    if (n.state && !['on', 'off'].includes(n.state)) err(id, `node "${n.id}" has an invalid state`)
    if (!hub && (!n.changes?.trim() || !n.visitors?.trim())) err(id, `node "${n.id}" needs both "changes" and "visitors" copy`)
    if (n.pro === 'partial' && !n.proNote?.trim()) err(id, `node "${n.id}" is pro: "partial" but has no "proNote"`)
    if (n.ref !== undefined) {
      const ref = treeById.get(n.ref)
      if (!ref) err(id, `node "${n.id}" refs unknown tree "${n.ref}"`)
      else if (ref.id === id) err(id, `node "${n.id}" refs its own tree`)
      else if (ref.overview !== n.link) err(id, `node "${n.id}" refs tree "${n.ref}" but links to ${n.link}, not its overview ${ref.overview}`)
    }
    const page = pages.get(n.link.split('#')[0])
    if (!page) { err(id, `node "${n.id}" links to ${n.link}, which is not a doc page`); continue }
    if (hub && !sidebarLinks.has(n.link.split('#')[0]))
      err(id, `node "${n.id}" links to ${n.link}, which is not in the sidebar (hidden pointer page?)`)
    const text = readFileSync(page, 'utf8')
    if (n.pro === true && !/\(Pro\)|Pro only|a Pro feature/i.test(text))
      err(id, `node "${n.id}" is marked Pro but ${n.link} never says "(Pro)"`)
    if (!n.pro && /^#\s.*\(Pro\)/m.test(text))
      err(id, `${n.link} has (Pro) in its H1 but node "${n.id}" is not marked pro`)
  }

  // tasks / journey may point at own nodes, or at nodes of a tree this one refs.
  const reachable = new Set(ids)
  for (const n of nodes) if (n.ref) for (const x of treeById.get(n.ref)?.branches.flatMap((b) => b.nodes) ?? []) reachable.add(x.id)
  for (const t of tree.tasks ?? []) if (!reachable.has(t.to)) err(id, `task "${t.text}" points to unknown node "${t.to}"`)
  for (const s of tree.journey ?? []) if (!reachable.has(s.to)) err(id, `journey step "${s.text}" points to unknown node "${s.to}"`)

  for (const a of tree.hero?.actions ?? []) {
    if (a.link.startsWith('#')) continue
    if (!pages.has(a.link)) err(id, `hero button "${a.text}" links to ${a.link}, which is neither a doc page nor a #anchor`)
  }
}

// The introduction hosts the site-wide quick start.
const intro = pages.get(INTRO)
if (intro && trees.some((t) => t.overview === INTRO) && !/^::: doc-tree \S+ journey\s*$/m.test(readFileSync(intro, 'utf8')))
  errors.push(`[intro] ${INTRO} has no "::: doc-tree <id> journey" line`)

if (warnings.length) console.warn(warnings.map((w) => '! ' + w).join('\n'))
if (errors.length) {
  console.error(errors.map((e) => '✗ ' + e).join('\n'))
  process.exit(1)
}
console.log('✓ doc trees match the docs')
