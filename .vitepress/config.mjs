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
      { text: 'Website', link: 'https://fluentmembers.com' },
      { text: 'Changelog', link: '/reference/changelog' },
      { text: 'FAQ', link: '/reference/faq' }
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
            { text: 'The Dashboard', link: '/guide/dashboard' }
          ]
        },
        {
          text: 'Core Concepts',
          collapsed: false,
          items: [
            { text: 'How It Fits Together', link: '/guide/core-concepts/' },
            { text: 'Access Groups', link: '/guide/core-concepts/access-groups' },
            { text: 'Membership Levels', link: '/guide/core-concepts/membership-levels' },
            { text: 'Pricing', link: '/guide/core-concepts/pricing' },
            { text: 'Corporate Memberships', link: '/guide/core-concepts/corporate-memberships' }
          ]
        },
        {
          text: 'Content Protection',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/content-protection/' },
            { text: 'Pages & Posts', link: '/guide/content-protection/restricting-pages-posts' },
            { text: 'Categories & Post Types', link: '/guide/content-protection/restricting-categories-post-types' },
            { text: 'Entire Website', link: '/guide/content-protection/restricting-entire-website' },
            { text: 'Partial Content Preview', link: '/guide/content-protection/partial-content-preview' },
            { text: 'Content Dripping', link: '/guide/content-protection/content-dripping' },
            { text: 'Gutenberg Block', link: '/guide/content-protection/gutenberg-block' },
            { text: 'REST API Protection', link: '/guide/content-protection/rest-api-protection' }
          ]
        },
        {
          text: 'Members',
          collapsed: true,
          items: [
            { text: 'Managing Members', link: '/guide/members/managing-members' },
            { text: 'Adding a Member Manually', link: '/guide/members/adding-a-member-manually' },
            { text: 'Member Statuses Explained', link: '/guide/members/member-statuses-explained' },
            { text: 'Upgrading Plans', link: '/guide/members/upgrading-plans' }
          ]
        },
        {
          text: 'Member Portal',
          collapsed: true,
          items: [
            { text: 'Setup', link: '/guide/member-portal/setup' },
            { text: 'What Members See', link: '/guide/member-portal/what-members-see' },
            { text: 'Cancelling Membership', link: '/guide/member-portal/cancelling-membership' }
          ]
        },
        {
          text: 'Settings',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/settings/general' },
            { text: 'Public Contents', link: '/guide/settings/public-contents' },
            { text: 'Login Popup', link: '/guide/settings/login-popup' },
            { text: 'Mailing', link: '/guide/settings/mailing' },
            { text: 'Email Notifications', link: '/guide/settings/email-notifications' },
            { text: 'Partial Content Defaults', link: '/guide/settings/partial-content-defaults' }
          ]
        },
        {
          text: 'Integrations',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/guide/integrations/' },
            { text: 'FluentCart', link: '/guide/integrations/fluent-cart' },
            { text: 'WooCommerce', link: '/guide/integrations/woocommerce' },
            { text: 'Fluent Forms', link: '/guide/integrations/fluent-forms' },
            { text: 'Paymattic', link: '/guide/integrations/paymattic' },
            { text: 'FluentCRM', link: '/guide/integrations/fluent-crm' },
            { text: 'FluentSupport', link: '/guide/integrations/fluent-support' }
          ]
        },
        {
          text: 'Shortcodes & Blocks',
          collapsed: true,
          items: [
            { text: 'Cheat Sheet', link: '/guide/shortcodes-and-blocks' }
          ]
        }
      ],

      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Glossary', link: '/reference/glossary' },
            { text: 'Membership Statuses', link: '/reference/membership-statuses' },
            { text: 'Shortcode Reference', link: '/reference/shortcode-reference' },
            { text: 'Email Merge Tags', link: '/reference/email-merge-tags' },
            { text: 'FAQ', link: '/reference/faq' },
            { text: 'Troubleshooting', link: '/reference/troubleshooting' },
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
