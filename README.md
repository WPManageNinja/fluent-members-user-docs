# Fluent Members – User Documentation

Official user documentation for [Fluent Members](https://fluentmembers.com), a WordPress membership plugin. Built with [VitePress](https://vitepress.dev/).

## Topics Covered

- **Getting Started** – Introduction, installation, quick start, and dashboard overview
- **Core Concepts** – Access Groups, Membership Levels, pricing, and corporate memberships
- **Content Protection** – Restrict posts, pages, categories, and sections
- **Members & Portal** – Member management, statuses, upgrades, and self-service portal
- **Integrations** – FluentCart, WooCommerce, Fluent Forms, Paymattic, FluentCRM, Fluent Support
- **Reference** – Glossary, shortcodes, merge tags, troubleshooting, FAQ

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Screenshots

```bash
# Generate screenshot plan
npm run docs:screenshots:plan

# Capture screenshots
npm run docs:screenshots
```

## Tech Stack

- [VitePress](https://vitepress.dev/) – Static site generator
- [Vue 3](https://vuejs.org/) – Framework
- [Playwright](https://playwright.dev/) – Screenshot automation

## License

ISC

## Featured (social-share) images

Every page has its own link-preview card — the image Slack, X, LinkedIn and Facebook show when a docs URL is shared. Cards are **generated, not designed by hand**: `scripts/generate-featured-images.mjs` renders a branded 1200×630 PNG carrying the page's title and section into `public/images/featured/`, and the VitePress config (`featuredImageFor()`) points each page's `og:image` / `twitter:image` at it. A page with no card falls back to `default.png`.

```bash
npm run featured:generate     # render cards for pages that don't have one yet (idempotent)
npm run featured:regenerate   # re-render every card (after changing the generator's design)
```

- Run `npm run featured:generate` after adding a page and commit the PNG alongside it.
- If you rename or retitle a page, delete its old card first and run the generator again — it skips existing files and only *reports* orphans, it never deletes them.
- Card naming rule: the page's served path (after `rewrites`) minus `.md`, with `/` replaced by `--`, plus `.png`. It lives in both the script (`cardNameFor()`) and the config (`featuredImageFor()`) — change one, change the other.
