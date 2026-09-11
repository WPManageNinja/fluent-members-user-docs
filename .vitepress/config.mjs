import { defineConfig } from 'vitepress'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { zoomablePlugin } from './theme/plugin-zoomable'

const guideSidebar = [
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/guide/getting-started/introduction' },
      { text: 'Installation', link: '/guide/getting-started/installation' },
      { text: 'Pro Installation', link: '/guide/getting-started/installation-pro' },
      { text: 'Quick Start', link: '/guide/getting-started/quick-start' },
      { text: 'Glossary', link: '/guide/getting-started/glossary' }
    ]
  },
  {
    text: 'Dashboard',
    collapsed: false,
    items: [
      { text: 'Dashboard Overview', link: '/guide/dashboard/dashboard' }
    ]
  },
  {
    text: 'Levels',
    collapsed: false,
    items: [
      { text: 'Levels Overview', link: '/guide/levels/' },
      { text: 'Creating a Level', link: '/guide/levels/creating' },
      { text: 'Pricing: Native Payment', link: '/guide/levels/pricing-native' },
      { text: 'Pricing: Paywalls', link: '/guide/levels/pricing-paywalls' },
      { text: 'Attaching Access Groups', link: '/guide/levels/attaching-access-groups' },
      { text: 'Content Drip', link: '/guide/levels/content-drip' },
      { text: 'Members on a Level', link: '/guide/levels/members-on-a-level' },
      { text: 'Corporate Memberships (Pro)', link: '/guide/levels/corporate-memberships' }
    ]
  },
  {
    text: 'Access Groups',
    collapsed: true,
    items: [
      { text: 'Overview', link: '/guide/access-groups/' },
      { text: 'Protected Content: Restriction Types', link: '/guide/access-groups/protected-content' },
      { text: 'Setting Up Unauthorized Access Rules', link: '/guide/access-groups/unauthorized-access' },
      { text: 'Gutenberg Block: Inserting', link: '/guide/access-groups/gutenberg-block/inserting' },
      { text: 'Gutenberg Block: Configuring', link: '/guide/access-groups/gutenberg-block/configuring' },
      { text: 'Gutenberg Block: Nesting & Limits', link: '/guide/access-groups/gutenberg-block/nesting-and-limits' }
    ]
  },
  {
    text: 'Members',
    collapsed: true,
    items: [
      { text: 'Members List', link: '/guide/members/' },
      { text: 'Member Detail', link: '/guide/members/detail' },
      { text: 'Adding a Membership Manually', link: '/guide/members/adding-manually' },
      { text: 'Status Reference', link: '/guide/members/statuses' },
      { text: 'Suspending & Cancelling', link: '/guide/members/suspending-and-cancelling' },
      { text: 'Portal: Setup', link: '/guide/members/portal/setup' },
      { text: 'Portal: What Members See', link: '/guide/members/portal/what-members-see' },
      { text: 'Portal: Cancelling a Membership', link: '/guide/members/portal/cancelling' },
      { text: 'Portal: Updating Payment Method (Pro)', link: '/guide/members/portal/updating-payment-method' },
      { text: 'Portal: Renewing a Failed Subscription(Pro)', link: '/guide/members/portal/renewing-a-failed-subscription' },
      { text: 'Portal: Corporate Seat Invites (Pro)', link: '/guide/members/portal/corporate-seat-invites' }
    ]
  },
  {
    text: 'Orders (Pro)',
    collapsed: true,
    items: [
      { text: 'Orders Overview', link: '/guide/transactions/' },
      { text: 'Subscriptions', link: '/guide/transactions/subscriptions' },
      { text: 'One-Time Purchases', link: '/guide/transactions/one-time' },
      { text: 'Filters & Search', link: '/guide/transactions/filters-and-search' },
      { text: 'Refunds', link: '/guide/transactions/refunds' },
      { text: 'Subscription Cancellation Modes', link: '/guide/transactions/cancellation-modes' }
    ]
  },
  {
    text: 'Settings',
    collapsed: true,
    items: [
      { text: 'General Settings', link: '/guide/settings/general' },
      { text: 'Partial Content Lock', link: '/guide/settings/partial-content-lock' },
      { text: 'Login Popup', link: '/guide/settings/login-popup' },
      { text: 'Payment Settings', link: '/guide/settings/payment-settings/' },
      { text: 'Stripe Setup (Pro)', link: '/guide/settings/payment-settings/stripe-setup' },
      { text: 'PayPal Setup (Pro)', link: '/guide/settings/payment-settings/paypal-setup' },
      { text: 'Migration: Overview', link: '/guide/settings/migration/' },
      { text: 'Migration: From Paid Memberships Pro', link: '/guide/settings/migration/from-paid-memberships-pro' },
      { text: 'Migration: From MemberPress', link: '/guide/settings/migration/from-memberpress' },
      { text: 'Migration: From Kadence Memberships', link: '/guide/settings/migration/from-kadence-memberships' },
      { text: 'Email Configuration: Mailing Settings', link: '/guide/settings/email-configuration/mailing-settings' },
      { text: 'Email Configuration: Email Notifications', link: '/guide/settings/email-configuration/email-notifications' }
    ]
  },
  {
    text: 'Help & Support',
    collapsed: true,
    items: [
      { text: 'FAQ', link: '/guide/help-support/faq' },
      { text: 'Get Support', link: '/guide/help-support/get-support' },
      { text: 'Changelog', link: '/changelog' }
    ]
  }
]

// Canonical origin for this site — reused by the canonical links and the absolute
// og:/twitter: URLs below. Changing the host should only ever mean editing this line.
const SITE_URL = 'https://docs.fluentmembers.com'

/**
 * Per-page link-preview cards.
 *
 * `scripts/generate-featured-images.mjs` renders a branded 1200x630 PNG carrying each
 * page's own title into `public/images/featured/`, served at `/images/featured/`.
 *
 * NAMING RULE — kept in sync with that script's cardNameFor(): the card is the page's
 * served path (i.e. `pageData.relativePath`, which VitePress has already passed through
 * any `rewrites`) minus `.md`, with every `/` replaced by `--`, plus `.png`. The home
 * page's `index.md` uses `index.png`.
 *
 * Anything without a generated card falls back to `default.png`, which the generator
 * also emits — so a shared link is never left with no preview at all. The URL must be
 * absolute: relative paths are ignored by Slack/X/LinkedIn/Facebook scrapers.
 */
const FEATURED_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'featured')

function featuredImageFor(relativePath) {
  const name = `${relativePath.replace(/\.md$/, '').replace(/\//g, '--')}.png`
  const file = existsSync(join(FEATURED_DIR, name)) ? name : 'default.png'
  return `${SITE_URL}/images/featured/${encodeURIComponent(file)}`
}

export default defineConfig({
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
      md.use(zoomablePlugin)
    }
  },

  title: 'Fluent Members',
  description: 'The official knowledge base for the Fluent Members WordPress plugin.',
  cleanUrls: true,

  // Internal working material (KB chunks + audit reports), not published pages.
  // Excluded from the build so their raw {{ }} examples don't hit the Vue compiler.
  srcExclude: ['member/**', 'README.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#6B35E8' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

    // Open Graph / Twitter values that never vary per page. Every generated card is
    // 1200x630, so the dimensions live here; the image URL itself is per page and
    // is set in transformPageData() below.
    ['meta', { property: 'og:site_name', content: 'Fluent Members' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  // Per-page SEO tags: canonical URL plus the Open Graph / Twitter values that differ
  // per page, including the page's own featured image (see featuredImageFor above).
  transformPageData(pageData, { siteConfig }) {
    // `relativePath` is the path AFTER `rewrites`, so it matches the public URL.
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const url = path ? `${SITE_URL}/${path}` : `${SITE_URL}/`
    const title = pageData.frontmatter.title || pageData.title || siteConfig.site.title
    const description =
      pageData.frontmatter.description || pageData.description || siteConfig.site.description
    const image = featuredImageFor(pageData.relativePath)

    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:image', content: image }],
      ['meta', { property: 'og:image:alt', content: title }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: image }]
    )
  },
  themeConfig: {
    logo: {
      light: '/images/logo/logo-light.webp',
      dark: '/images/logo/logo-dark.webp',
      alt: 'Fluent Members'
    },
    siteTitle: false,

    nav: [
      { text: 'User Docs', link: '/' },
      { text: 'Changelog', link: '/changelog' },
      { text: 'Dev Docs', link: 'https://developers.fluentmembers.com/' },
      { text: 'Website', link: 'https://fluentmembers.com' }
    ],

    sidebar: {
      '/guide/': guideSidebar,
      '/changelog': guideSidebar
    },

    footer: {
      copyright: 'Copyright © WPManageNinja'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    docFooter: {
      prev: 'Previous',
      next: 'Next'
    }
  }
})
