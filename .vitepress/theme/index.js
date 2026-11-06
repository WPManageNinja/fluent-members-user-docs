import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import Feedback from './components/Feedback.vue'
import ZoomableImage from './components/ZoomableImage.vue'
import TreeStrip from './components/TreeStrip.vue'
import './custom.css'
import './doc-tree.css'
import './motion.css'
import './aurora.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Feedback', Feedback)
    app.component('TreeStrip', TreeStrip)

    // Closed <details> do not print: open every doc-tree row and FAQ item before printing.
    // Rows share a `name` (exclusive accordion), so drop it first or each open closes the previous one.
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeprint', () => {
        document.querySelectorAll('details.dt-row, details.dt-faq-item').forEach((d) => {
          d.removeAttribute('name')
          d.open = true
        })
      })
    }

    // Register ZoomableImage component globally
    // This ensures it's available for markdown rendering
    if (!app.component('ZoomableImage')) {
      app.component('ZoomableImage', ZoomableImage)
    }
  }
}
