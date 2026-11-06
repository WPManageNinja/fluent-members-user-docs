import type { MarkdownRenderer } from 'vitepress'

/**
 * Two markdown containers, both split into sections with `== Label` lines. Section bodies are
 * normal markdown (lists, bold, links, images). Do not nest another `:::` block inside them.
 *
 *   ::: tabs
 *   == FooTable
 *   Steps for FooTable…
 *   == DataTables
 *   Steps for DataTables…
 *   :::
 *
 *   ::: faq
 *   == Why can't I see X?
 *   Because…
 *   :::
 *
 * Tabs are pure CSS (radio inputs), so they work without JS and in the SSR output; every tab
 * prints. FAQ items are native <details>. Styles live in theme/doc-tree.css.
 */
const OPEN = /^:::\s+(tabs|faq)\s*$/
const CLOSE = /^:::\s*$/
const SECTION = /^==\s+(.+?)\s*$/

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
/** Labels may use `code` and **bold**. */
const label = (s: string) =>
  esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

export function docBlocksPlugin(md: MarkdownRenderer) {
  md.block.ruler.before(
    'fence',
    'doc_blocks',
    (state, startLine, endLine, silent) => {
      const text = (n: number) => state.src.slice(state.bMarks[n] + state.tShift[n], state.eMarks[n])
      const open = OPEN.exec(text(startLine))
      if (!open) return false

      let close = -1
      for (let n = startLine + 1; n < endLine; n++) {
        if (CLOSE.test(text(n))) { close = n; break }
      }
      if (close < 0) return false
      if (silent) return true

      const kind = open[1] as 'tabs' | 'faq'
      const sections: { title: string; from: number; to: number }[] = []
      for (let n = startLine + 1; n < close; n++) {
        const m = SECTION.exec(text(n))
        if (m) sections.push({ title: m[1], from: n + 1, to: close })
        else if (!sections.length && text(n).trim()) {
          throw new Error(`::: ${kind} (line ${n + 1}): content before the first "== Label" line`)
        }
      }
      if (!sections.length) throw new Error(`::: ${kind} (line ${startLine + 1}): needs at least one "== Label" section`)
      sections.forEach((s, i) => { if (sections[i + 1]) s.to = sections[i + 1].from - 1 })

      const html = (content: string) => {
        const t = state.push('html_block', '', 0)
        t.content = content + '\n'
        t.map = [startLine, close + 1]
      }
      const env = state.env as { __dtBlocks?: number }
      const uid = (env.__dtBlocks = (env.__dtBlocks ?? 0) + 1)
      const oldMax = state.lineMax

      if (kind === 'tabs') {
        const inputs = sections
          .map((_, i) => `<input type="radio" name="dt-tabs-${uid}" id="dt-tabs-${uid}-${i}"${i === 0 ? ' checked' : ''}>`)
          .join('')
        const labels = sections.map((s, i) => `<label for="dt-tabs-${uid}-${i}">${label(s.title)}</label>`).join('')
        html(`<div class="dt-tabs">${inputs}<div class="dt-tablist">${labels}</div><div class="dt-panels">`)
        sections.forEach((s) => {
          html(`<div class="dt-panel" data-label="${esc(s.title.replace(/[`*]/g, ''))}">`)
          state.lineMax = s.to
          state.md.block.tokenize(state, s.from, s.to)
          state.lineMax = oldMax
          html('</div>')
        })
        html('</div></div>')
      } else {
        html('<div class="dt-faq">')
        sections.forEach((s) => {
          html(`<details class="dt-faq-item"><summary><span>${label(s.title)}</span></summary><div class="dt-faq-body">`)
          state.lineMax = s.to
          state.md.block.tokenize(state, s.from, s.to)
          state.lineMax = oldMax
          html('</div></details>')
        })
        html('</div>')
      }

      state.line = close + 1
      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )
}
