<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { trees, findNodeByLink } from '../../trees'

/**
 * "You are here" strip for child pages of a doc tree: Group › Branch › Page, plus the
 * sibling pages of the same branch. Rendered in SSR (plain links), so it works without JS.
 * Hidden on the tree's own overview page, on pages that are not in any tree, and for
 * trees with `strip: false`.
 */
const route = useRoute()

const here = computed(() => {
  const path = route.path.replace(/\.html$/, '').replace(/\/$/, '') || '/'
  for (const tree of trees) {
    // Hub trees (e.g. product) never show a strip: it would only repeat the sidebar.
    if (tree.strip === false) continue
    if (path === tree.overview) return null
    const hit = findNodeByLink(tree, path)
    if (hit) {
      const seen = new Set<string>([path])
      const siblings = hit.branch.nodes.filter((n) => !seen.has(n.link) && seen.add(n.link))
      return { tree, branch: hit.branch, node: hit.node, siblings }
    }
  }
  return null
})
</script>

<template>
  <nav v-if="here" class="dt-strip" aria-label="Where you are in the guide">
    <div class="dt-strip-path">
      <a :href="here.tree.overview">{{ here.tree.title }}</a>
      <span class="sep">›</span>
      <span>{{ here.branch.label }}</span>
      <span class="sep">›</span>
      <strong>{{ here.node.label }}</strong>
      <span v-if="here.node.pro === true" class="fm-pro">Pro</span>
    </div>
    <div v-if="here.siblings.length" class="dt-strip-sibs">
      <a v-for="s in here.siblings" :key="s.id" :href="s.link">{{ s.label }}</a>
    </div>
  </nav>
</template>
