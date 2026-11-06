import { defineConfig } from 'vitepress'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { zoomablePlugin } from './theme/plugin-zoomable'
import { docTreePlugin } from './theme/plugin-doc-tree'
import { docBlocksPlugin } from './theme/plugin-doc-blocks'

const docsSidebar = [
  {
    text: "Get Started",
    collapsed: true,
    items: [
      { text: "Introduction", link: '/docs/getting-started/introduction' },
      { text: "Free vs Pro", link: '/docs/getting-started/free-vs-pro' },
      { text: "Install", link: '/docs/getting-started/installation' },
      { text: "Activate Pro", link: '/docs/getting-started/installation-pro' },
      { text: "Quick start", link: '/docs/getting-started/quick-start' },
      { text: "Admin tour", link: '/docs/getting-started/admin-navigation' },
      { text: "Glossary", link: '/docs/getting-started/glossary' }
    ]
  },
  {
    text: "Levels",
    collapsed: true,
    items: [
      { text: "Overview", link: '/docs/levels/' },
      { text: "Create a level", link: '/docs/levels/creating' },
      { text: "Native payments <span class=\"fm-pro\">Pro</span>", link: '/docs/levels/pricing-native' },
      { text: "Paywalls", link: '/docs/levels/pricing-paywalls' },
      { text: "Access groups", link: '/docs/levels/attaching-access-groups' },
      { text: "Upgrade paths <span class=\"fm-pro\">Pro</span>", link: '/docs/levels/upgrade-paths' },
      { text: "Corporate <span class=\"fm-pro\">Pro</span>", link: '/docs/levels/corporate-memberships' }
    ]
  },
  {
    text: "Protect Content",
    collapsed: true,
    items: [
      { text: "Overview", link: '/docs/access-groups/' },
      { text: "How protection works", link: '/docs/access-groups/how-protection-works' },
      { text: "Restriction types", link: '/docs/access-groups/protected-content' },
      { text: "Blocked visitors", link: '/docs/access-groups/unauthorized-access' },
      { text: "Drip content", link: '/docs/access-groups/content-drip' },
      { text: "Single post", link: '/docs/access-groups/per-post-restrictions' },
      { text: "Partial lock", link: '/docs/settings/partial-content-lock' },
      {
        text: 'Blocks',
        collapsed: true,
        items: [
          { text: 'Access Groups block', link: '/docs/access-groups/gutenberg-block/inserting' },
          { text: 'Nesting', link: '/docs/access-groups/gutenberg-block/nesting-and-limits' },
          { text: 'Levels block', link: '/docs/access-groups/gutenberg-block/membership-levels-block' }
        ]
      }
    ]
  },
  {
    text: "Sell",
    collapsed: true,
    items: [
      { text: "Pricing page", link: '/docs/selling/pricing-page' },
      { text: "Checkout", link: '/docs/selling/checkout' },
      { text: "Payments", link: '/docs/settings/payment-settings/' },
      { text: "Set up Stripe <span class=\"fm-pro\">Pro</span>", link: '/docs/settings/payment-settings/stripe-setup' },
      { text: "Set up PayPal <span class=\"fm-pro\">Pro</span>", link: '/docs/settings/payment-settings/paypal-setup' },
      { text: "Login popup", link: '/docs/settings/login-popup' }
    ]
  },
  {
    text: "Members",
    collapsed: true,
    items: [
      { text: "Dashboard", link: '/docs/dashboard/dashboard' },
      { text: "Members list", link: '/docs/members/' },
      { text: "Member details", link: '/docs/members/detail' },
      { text: "Add manually", link: '/docs/members/adding-manually' },
      { text: "Members on a level", link: '/docs/levels/members-on-a-level' },
      { text: "Suspend or cancel", link: '/docs/members/suspending-and-cancelling' },
      { text: "Corporate <span class=\"fm-pro\">Pro</span>", link: '/docs/members/corporate-members' }
    ]
  },
  {
    text: "Member Portal",
    collapsed: true,
    items: [
      { text: "Portal setup", link: '/docs/members/portal/setup' },
      { text: "What members see", link: '/docs/members/portal/what-members-see' },
      { text: "Membership details", link: '/docs/members/portal/membership-details' },
      { text: "Cancel", link: '/docs/members/portal/cancelling' },
      { text: "Payment method <span class=\"fm-pro\">Pro</span>", link: '/docs/members/portal/updating-payment-method' },
      { text: "Renewals <span class=\"fm-pro\">Pro</span>", link: '/docs/members/portal/renewing-a-membership' },
      { text: "Seat invites <span class=\"fm-pro\">Pro</span>", link: '/docs/members/portal/corporate-seat-invites' }
    ]
  },
  {
    text: "Billing <span class=\"fm-pro\">Pro</span>",
    collapsed: true,
    items: [
      { text: "Overview", link: '/docs/billing/' },
      { text: "Subscriptions", link: '/docs/billing/subscriptions' },
      { text: "Other plugins", link: '/docs/billing/provider-subscriptions' },
      { text: "One-time", link: '/docs/billing/one-time' },
      { text: "Filter & search", link: '/docs/billing/filters-and-search' },
      { text: "Refunds", link: '/docs/billing/refunds' },
      { text: "Cancel", link: '/docs/billing/cancelling-a-subscription' }
    ]
  },
  {
    text: "Emails",
    collapsed: true,
    items: [
      { text: "Mailing", link: '/docs/settings/email-configuration/mailing-settings' },
      { text: "Notifications", link: '/docs/settings/email-configuration/email-notifications' },
      { text: "Email editor <span class=\"fm-pro\">Pro</span>", link: '/docs/settings/email-configuration/custom-email-editor' }
    ]
  },
  {
    text: "Integrations",
    collapsed: true,
    items: [
      { text: "Overview", link: '/docs/integrations/' },
      { text: "Per level", link: '/docs/levels/integrations' },
      { text: "FluentCart", link: '/docs/integrations/fluentcart' },
      { text: "Fluent Forms", link: '/docs/integrations/fluent-forms' },
      { text: "Paymattic", link: '/docs/integrations/paymattic' },
      { text: "WooCommerce <span class=\"fm-pro\">Pro</span>", link: '/docs/integrations/woocommerce' },
      { text: "FluentCRM", link: '/docs/integrations/fluentcrm' },
      { text: "Fluent Support", link: '/docs/integrations/fluent-support' },
      { text: "FluentCommunity", link: '/docs/integrations/fluent-community' }
    ]
  },
  {
    text: "Migration",
    collapsed: true,
    items: [
      { text: "Overview", link: '/docs/settings/migration/' },
      { text: "From PMPro", link: '/docs/settings/migration/from-paid-memberships-pro' },
      { text: "From MemberPress", link: '/docs/settings/migration/from-memberpress' },
      { text: "From Kadence / RCP", link: '/docs/settings/migration/from-kadence-memberships' }
    ]
  },
  {
    text: "Settings",
    collapsed: true,
    items: [
      { text: "General", link: '/docs/settings/general' },
      { text: "Default blocked view", link: '/docs/settings/unauthorized-access' },
      { text: "Permissions", link: '/docs/settings/permissions' },
      { text: "Privacy", link: '/docs/settings/privacy' }
    ]
  },
  {
    text: "Developers",
    collapsed: true,
    items: [
      { text: "Shortcodes", link: '/reference/shortcodes' },
      { text: "Email smartcodes", link: '/reference/email-smartcodes' },
      { text: "Hooks", link: '/reference/developer-hooks' },
      { text: "Chain map", link: '/reference/chain-map' }
    ]
  },
  {
    text: "Help",
    collapsed: true,
    items: [
      { text: "Statuses", link: '/reference/membership-statuses' },
      { text: "Troubleshooting", link: '/reference/troubleshooting' },
      { text: "FAQ", link: '/docs/help-support/faq' },
      { text: "Get help", link: '/docs/help-support/get-support' },
      { text: "Changelog", link: '/changelog' }
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
      md.use(zoomablePlugin)
      md.use(docTreePlugin)
      md.use(docBlocksPlugin)
    }
  },

  title: 'Fluent Members',
  description: 'The official knowledge base for the Fluent Members WordPress plugin.',
  cleanUrls: true,

  // Internal working material (KB chunks + audit reports), not published pages.
  // Excluded from the build so their raw {{ }} examples don't hit the Vue compiler.
  srcExclude: ['member/**', 'README.md', 'CLAUDE.md', '.claude/**'],

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
      '/docs/': docsSidebar,
      '/reference/': docsSidebar,
      '/changelog': docsSidebar
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
