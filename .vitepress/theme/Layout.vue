<script setup>
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, onBeforeUnmount, watch } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()

/**
 * Sidebar accordion. The default theme keeps every category you opened open for the whole visit.
 * Here only the category that holds the current page stays open (so moving to another page or category
 * closes the rest), and opening one category or nested section closes its siblings.
 */
let busy = false
const sidebar = () => document.querySelector('.VPSidebar')
const toggleOf = (group) => group.querySelector(':scope > .item')
const isOpen = (group) => !group.classList.contains('collapsed')

/** Re-trigger the content enter animation (CSS in motion.css) on first load and on each page change. */
function playEnter() {
  const el = document.querySelector('.VPContent')
  if (!el) return
  el.classList.remove('fm-enter')
  void el.offsetWidth
  el.classList.add('fm-enter')
}

function closeOthersOnNavigate() {
  const root = sidebar()
  if (!root) return
  busy = true
  // Innermost first, so a closed parent never hides a toggle we still need to click.
  const groups = [...root.querySelectorAll('.VPSidebarItem.collapsible')].reverse()
  for (const group of groups) {
    if (isOpen(group) && !group.classList.contains('has-active')) toggleOf(group)?.click()
  }
  busy = false
}

function onSidebarClick(event) {
  if (busy) return
  const item = event.target.closest?.('.VPSidebarItem.collapsible > .item')
  if (!item) return
  const group = item.parentElement
  // The default theme flips the state on this same click, so read it a tick later.
  setTimeout(() => {
    if (!isOpen(group)) return
    const level = [...group.classList].find((c) => /^level-\d+$/.test(c))
    const parent = group.closest('.items')
    busy = true
    for (const other of sidebar()?.querySelectorAll(`.VPSidebarItem.collapsible.${level}`) ?? []) {
      if (other !== group && other.closest('.items') === parent && isOpen(other)) toggleOf(other)?.click()
    }
    busy = false
  }, 0)
}

onMounted(() => {
  sidebar()?.addEventListener('click', onSidebarClick)
  playEnter()
  nextTick(() => setTimeout(closeOthersOnNavigate, 60))
})
onBeforeUnmount(() => sidebar()?.removeEventListener('click', onSidebarClick))
watch(
  () => route.path,
  () => {
    playEnter()
    nextTick(() => setTimeout(closeOthersOnNavigate, 60))
  },
)
</script>

<template>
  <Layout>
    <template #layout-top>
      <!-- Decorative aurora background (aurora.css) -->
      <div class="fm-aurora" aria-hidden="true">
        <span class="fm-aurora__blob b1"></span>
        <span class="fm-aurora__blob b2"></span>
        <span class="fm-aurora__blob b3"></span>
        <span class="fm-aurora__blob b4"></span>
      </div>
    </template>
    <template #doc-before>
      <TreeStrip />
    </template>
    <!-- doc-footer-before renders above the Previous/Next pager (see screenshots).
         The default theme's #doc-after slot sits *below* the pager. -->
    <template #doc-footer-before>
      <Feedback />
    </template>
  </Layout>
</template>
