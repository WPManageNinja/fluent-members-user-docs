import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import Layout from './Layout.vue'
import Feedback from './components/Feedback.vue'
import ZoomableImage from './components/ZoomableImage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
    app.component('Feedback', Feedback)
    // Register ZoomableImage component globally
    // This ensures it's available for markdown rendering
    if (!app.component('ZoomableImage')) {
      app.component('ZoomableImage', ZoomableImage)
    }
  }
}
