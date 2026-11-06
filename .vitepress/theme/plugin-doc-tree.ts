import type { MarkdownRenderer } from 'vitepress'
import { treeById } from '../trees'
import type { DocTree, TreeNode } from '../trees/types'

/**
 * `::: doc-tree <id> <part>` on its own line renders part of a doc tree as static HTML
 * at build time (no JS, so it is searchable, printable and present in the SSR output).
 * Parts: `hero`, `tasks`, `journey` (numbered quick-start steps), `map` (mind map with leaf facts),
 * `panel` (replica of the plugin's tabbed settings panel). The data lives in `.vitepress/trees/<id>.json`.
 * A node with `ref` points at another tree: its map facts are generated from that tree's branches.
 *
 * Raw HTML here must never contain a blank line: a blank line ends the HTML block.
 */
const MARKER = /^::: doc-tree\s+(\S+)\s+(hero|tasks|journey|map|panel)\s*$/

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Escape, then allow **bold** only. */
const inline = (s: string) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

function proBadge(node: TreeNode): string {
  if (node.pro === true) return ' <span class="fm-pro">Pro</span>'
  if (node.pro === 'partial' && node.proNote) return ` <small>${esc(node.proNote)}</small>`
  return ''
}

const proLabel = (n: TreeNode) => (n.pro === true ? ' (Pro)' : '')

/** Facts for a node: its own, or (for a `ref` node) one line per branch of the referenced tree. */
function factsOf(n: TreeNode): string[] {
  if (n.facts?.length || !n.ref) return n.facts ?? []
  const ref = treeById(n.ref)
  if (!ref) throw new Error(`doc-tree: node "${n.id}" refs unknown tree "${n.ref}"`)
  return ref.branches
    .filter((b) => !b.mapOnly)
    .map((b) => `${b.label}: ${b.nodes.map((x) => x.label + proLabel(x)).join(', ')}`)
}

/** Node lookup for `tasks` / `journey`: own nodes first, then the nodes of any referenced tree. */
function nodeIndex(t: DocTree): Map<string, TreeNode> {
  const own = t.branches.flatMap((b) => b.nodes)
  const map = new Map<string, TreeNode>()
  for (const n of own) {
    if (!n.ref) continue
    for (const x of treeById(n.ref)?.branches.flatMap((b) => b.nodes) ?? []) map.set(x.id, x)
  }
  for (const n of own) map.set(n.id, n)
  return map
}

function renderHero(t: DocTree): string {
  const path = t.hero.path?.length
    ? `<p class="dt-path">${t.hero.path.map((p) => `<span>${esc(p)}</span>`).join('<i>›</i>')}</p>`
    : ''
  const actions = t.hero.actions
    .map((a) => `<a class="dt-btn${a.primary ? ' primary' : ''}" href="${esc(a.link)}">${esc(a.text)}</a>`)
    .join('\n')
  return `<div class="dt-hero">
<span class="dt-eyebrow">${esc(t.hero.eyebrow)}</span>
<p class="dt-title">${esc(t.hero.title)}</p>
<p class="dt-lead">${esc(t.hero.lead)}</p>
${path}
<div class="dt-actions">
${actions}
</div>
</div>`
}

function renderTasks(t: DocTree): string {
  const nodes = nodeIndex(t)
  // Hub trees badge Pro tiles; panel trees keep their original output.
  const badge = (n: TreeNode) => (t.kind === 'hub' && n.pro === true ? ' <span class="fm-pro">Pro</span>' : '')
  const tiles = t.tasks
    .map((task) => {
      const node = nodes.get(task.to)
      if (!node) throw new Error(`doc-tree "${t.id}": task "${task.text}" points to unknown node "${task.to}"`)
      return `<a class="dt-task" href="${esc(node.link)}">${esc(task.text)}${badge(node)}<small>${esc(task.sub)}</small></a>`
    })
    .join('\n')
  return `<div class="dt-grid">
${tiles}
</div>`
}

/** Numbered quick start: a real <ol>, one linked step per item. */
function renderJourney(t: DocTree): string {
  if (!t.journey?.length) throw new Error(`doc-tree "${t.id}": no "journey" steps defined`)
  const nodes = nodeIndex(t)
  const steps = t.journey
    .map((step, i) => {
      const node = nodes.get(step.to)
      if (!node) throw new Error(`doc-tree "${t.id}": journey step "${step.text}" points to unknown node "${step.to}"`)
      return `<li class="dt-step"><a href="${esc(node.link)}"><span class="dt-step-n" aria-hidden="true">${i + 1}</span><span class="dt-step-t">${esc(step.text)}${proBadge(node)}</span><small>${esc(step.sub)}</small></a></li>`
    })
    .join('\n')
  return `<ol class="dt-journey">
${steps}
</ol>`
}

function stateBadge(n: TreeNode): string {
  if (!n.state) return ''
  return `<span class="dt-state ${n.state}">${n.state === 'on' ? 'On' : 'Off'} by default</span>`
}

/** One setting as an accordion row, like a section in the plugin's settings panel. */
function renderRow(n: TreeNode, branchId: string): string {
  const facts = (n.facts ?? []).map((f) => `<li>${esc(f)}</li>`).join('\n')
  return `<details class="dt-row" name="dt-acc-${esc(branchId)}">
<summary><span class="dt-row-main"><span class="dt-row-name">${esc(n.label)}${proBadge(n)}</span><span class="dt-row-ux">${esc(n.ux)}</span></span>${stateBadge(n)}</summary>
<div class="dt-row-body">
<div class="dt-cols">
<p><span class="dt-k">What changes</span>${inline(n.changes ?? '')}</p>
<p><span class="dt-k">Visitors see</span>${inline(n.visitors ?? '')}</p>
</div>
${facts ? `<p class="dt-k">What is inside</p>\n<ul class="dt-facts">\n${facts}\n</ul>` : ''}
<a class="dt-open" href="${esc(n.link)}">Read the full guide <span aria-hidden="true">→</span></a>
</div>
</details>`
}

/** Tabbed replica of the plugin's settings panel: one tab per branch, one accordion row per setting. */
function renderPanel(t: DocTree): string {
  const branches = t.branches.filter((b) => !b.mapOnly)
  const uid = `dt-pui-${esc(t.id)}`
  const inputs = branches
    .map((_, i) => `<input type="radio" name="${uid}" id="${uid}-${i}"${i === 0 ? ' checked' : ''}>`)
    .join('')
  const labels = branches.map((b, i) => `<label for="${uid}-${i}">${esc(b.label)}</label>`).join('')
  const panels = branches
    .map((b) => {
      let lastGroup: string | undefined
      const rows = b.nodes
        .map((n) => {
          const heading = n.group && n.group !== lastGroup ? `<p class="dt-group">${esc(n.group)}</p>\n` : ''
          lastGroup = n.group
          return heading + renderRow(n, b.id)
        })
        .join('\n')
      return `<div class="dt-panel" data-label="${esc(b.label)}">
<p class="dt-panel-intro"><span class="dt-where">${esc(b.where)}</span>${esc(b.goal)}</p>
${rows}
</div>`
    })
    .join('\n')
  return `<div class="dt-tabs dt-panelui">${inputs}<div class="dt-tablist">${labels}</div><div class="dt-panels">
${panels}
</div></div>`
}

/**
 * Mind map: root > branch card (tab) > setting > leaf facts, hung off a centre spine.
 * Cards are balanced over two sides by weight; on narrow screens CSS `order` restores tab order.
 * Nested lists inside each card, so it still reads fine without CSS.
 */
function renderMap(t: DocTree): string {
  const weight = (b: DocTree['branches'][number]) =>
    2 + b.nodes.reduce((sum, n) => sum + 1.4 + factsOf(n).length * 0.8, 0)

  const cards = t.branches.map((b, i) => {
    const settings = b.nodes
      .map((n) => {
        const facts = factsOf(n).map((f) => `<li>${esc(f)}</li>`).join('\n')
        return `<li class="dt-map-s">
<a class="dt-map-n" href="${esc(n.link)}">${esc(n.label)}${proBadge(n)}</a>
${facts ? `<ul class="dt-map-facts">\n${facts}\n</ul>` : ''}
</li>`
      })
      .join('\n')
    return {
      weight: weight(b),
      html: `<section class="dt-map-card acc-${(i % 6) + 1}" style="order:${i}">
<header class="dt-map-head"><span class="dt-map-dot" aria-hidden="true"></span><span class="dt-map-title">${esc(b.label)}</span><span class="dt-map-where">${esc(b.where)}</span></header>
<ul class="dt-map-settings">
${settings}
</ul>
</section>`,
    }
  })

  // Greedy balance: each card goes to the lighter side, keeping reading order inside a side.
  const sides: { w: number; html: string[] }[] = [{ w: 0, html: [] }, { w: 0, html: [] }]
  for (const c of cards) {
    const side = sides[0].w <= sides[1].w ? sides[0] : sides[1]
    side.w += c.weight
    side.html.push(c.html)
  }

  return `<div class="dt-map">
<p class="dt-map-root">${esc(t.mapRoot ?? 'Fluent Members ' + t.title)}</p>
<div class="dt-map-cols">
<div class="dt-map-col">
${sides[0].html.join('\n')}
</div>
<div class="dt-map-col right">
${sides[1].html.join('\n')}
</div>
</div>
</div>`
}

const RENDERERS = { hero: renderHero, tasks: renderTasks, journey: renderJourney, map: renderMap, panel: renderPanel }

export function docTreePlugin(md: MarkdownRenderer) {
  md.block.ruler.before(
    'fence',
    'doc_tree',
    (state, startLine, _endLine, silent) => {
      const pos = state.bMarks[startLine] + state.tShift[startLine]
      const line = state.src.slice(pos, state.eMarks[startLine])
      const m = MARKER.exec(line)
      if (!m) return false
      if (silent) return true

      const tree = treeById(m[1])
      if (!tree) throw new Error(`doc-tree: unknown tree "${m[1]}" (add it to .vitepress/trees/index.ts)`)

      const token = state.push('html_block', '', 0)
      token.content = RENDERERS[m[2] as keyof typeof RENDERERS](tree) + '\n'
      token.map = [startLine, startLine + 1]
      state.line = startLine + 1
      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )
}
