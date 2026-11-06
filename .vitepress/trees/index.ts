import type { DocTree, TreeNode } from './types'
import levels from './levels.json'
import access from './access.json'
import product from './product.json'



/**
 * Every tree on the site. Add a new `<id>.json` here to cover another sidebar group.
 * Order matters: TreeStrip uses the first tree that contains a page, so panel trees
 * (appearance) stay before the site-wide hub (product, `strip: false`), whose nodes
 * overlap with them.
 */
export const trees: DocTree[] = [levels as DocTree, access as DocTree, product as DocTree]

export function treeById(id: string): DocTree | undefined {
  return trees.find((t) => t.id === id)
}

/** Sidebar leaf for a node: label (with `&` escaped for the sidebar) plus the Pro badge. */
function sidebarLeaf(node: TreeNode) {
  const label = (node.sidebar ?? node.label).replace(/&/g, '&amp;')
  const badge = node.pro === true ? ' <span class="fm-pro">Pro</span>' : ''
  return { text: label + badge, link: node.link }
}

/**
 * Sidebar group built from a tree: the overview first, then either the tree's `sidebarSections`
 * (nested, in reader-journey order) or, when absent, each unique in-group page in branch order.
 */
export function treeSidebarGroup(tree: DocTree) {
  if (tree.strip === false) throw new Error(`tree "${tree.id}" has strip:false and does not build a sidebar group`)
  const overview = { text: tree.sidebarOverviewText, link: tree.overview }
  if (tree.sidebarSections?.length) {
    const byId = new Map(tree.branches.flatMap((b) => b.nodes).map((n) => [n.id, n]))
    const seen = new Set<string>([tree.overview])
    const sections = tree.sidebarSections.map((section) => {
      const items = section.nodes.flatMap((id) => {
        const node = byId.get(id)
        if (!node) throw new Error(`tree "${tree.id}": sidebar section "${section.text}" lists unknown node "${id}"`)
        if (seen.has(node.link)) return []
        seen.add(node.link)
        return [sidebarLeaf(node)]
      })
      return { text: section.text.replace(/&/g, '&amp;'), collapsed: section.collapsed ?? false, items }
    })
    return { text: tree.title, collapsed: true, items: [overview, ...sections] }
  }
  const seen = new Set<string>([tree.overview])
  const items = [overview]
  for (const node of tree.branches.filter((b) => !b.mapOnly).flatMap((b) => b.nodes)) {
    if (node.inGroup === false || seen.has(node.link)) continue
    seen.add(node.link)
    items.push(sidebarLeaf(node))
  }
  return { text: tree.title, collapsed: true, items }
}

export function findNodeByLink(tree: DocTree, path: string): { branch: DocTree['branches'][number]; node: TreeNode } | undefined {
  for (const branch of tree.branches) {
    if (branch.mapOnly) continue
    const node = branch.nodes.find((n) => n.link === path)
    if (node) return { branch, node }
  }
}
