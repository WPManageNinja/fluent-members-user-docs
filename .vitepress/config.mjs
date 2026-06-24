import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Fluent Members',
  description: 'The official knowledge base for the Fluent Members WordPress plugin.',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#0073aa' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],

  themeConfig: {
    logo: undefined,
    siteTitle: 'Fluent Members',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Reference', link: '/reference/chain-map' },
      { text: 'Website', link: 'https://fluentmembers.com' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'What is Fluent Members?', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Glossary', link: '/guide/glossary' }
          ]
        },
        {
          text: 'Dashboard',
          collapsed: false,
          items: [
            { text: 'Reading the Dashboard', link: '/guide/dashboard' }
          ]
        },
        {
          text: 'Levels',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/guide/levels/' },
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
            { text: 'Unauthorized Access', link: '/guide/access-groups/unauthorized-access' },
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
            { text: 'Portal: Cancelling', link: '/guide/members/portal/cancelling' },
            { text: 'Portal: Updating Payment Method (Pro)', link: '/guide/members/portal/updating-payment-method' },
            { text: 'Portal: Renewing a Failed Subscription(Pro)', link: '/guide/members/portal/renewing-a-failed-subscription' },
            { text: 'Portal: Corporate Seat Invites (Pro)', link: '/guide/members/portal/corporate-seat-invites' }
          ]
        },
        {
          text: 'Transactions (Pro)',
          collapsed: true,
          items: [
            { text: 'Transactions List', link: '/guide/transactions/' },
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
            { text: 'Migration: Overview', link: '/guide/settings/migration/' },
            { text: 'Migration: From Paid Memberships Pro', link: '/guide/settings/migration/from-paid-memberships-pro' },
            { text: 'Migration: From MemberPress', link: '/guide/settings/migration/from-memberpress' },
            { text: 'Migration: From Content Restriction Pro', link: '/guide/settings/migration/from-content-restriction-pro' },
            { text: 'Email Configuration: Mailing Settings', link: '/guide/settings/email-configuration/mailing-settings' },
            { text: 'Email Configuration: Email Notifications', link: '/guide/settings/email-configuration/email-notifications' }
          ]
        }
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Chain Map', link: '/reference/chain-map' },
            { text: 'Membership Statuses', link: '/reference/membership-statuses' },
            { text: 'Shortcode Reference', link: '/reference/shortcode-reference' },
            { text: 'Email Merge Tags', link: '/reference/email-merge-tags' },
            { text: 'FAQ', link: '/reference/faq' },
            { text: 'Troubleshooting', link: '/reference/troubleshooting' },
            { text: 'Developer Hooks', link: '/reference/developer-hooks' },
            { text: 'Changelog', link: '/reference/changelog' }
          ]
        }
      ]
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
