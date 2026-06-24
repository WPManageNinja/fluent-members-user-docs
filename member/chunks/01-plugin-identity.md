---
chunk: 01
category: Foundation
subcategory: Plugin Identity
query-triggers: [plugin name, version, constants, namespace, framework, entry point, boot, autoload, ZIPs]
related-chunks: [02]
source-files: [fluent-members.php, boot/app.php, fluent-members-pro/fluent-members-pro.php]
doc-files: [guide/introduction.md, guide/installation.md]
---

# Plugin Identity

## Free plugin

| Field | Value |
|---|---|
| Plugin name | Fluent Members |
| Slug | fluent-members |
| Author | WPManageNinja |
| Author URL | https://wpmanageninja.com/ |
| Version | 1.0.0 |
| Text domain | `fluent-members` |
| Domain path | `/language` |
| License | GPLv2 or later |
| ZIP filename | `fluent-members (3).zip` |
| ZIP size | ~1.5 MB, 435 files |

### PHP constants (free)

| Constant | Value |
|---|---|
| `FLUENT_MEMBERS_PLUGIN_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PLUGIN_DIR` | `plugin_dir_path(__FILE__)` |
| `FLUENT_MEMBERS_PLUGIN_URL` | `plugin_dir_url(__FILE__)` |
| `FLUENT_MEMBERS_DIR_FILE` | `__FILE__` |

### Namespaces (free)

| Namespace prefix | Area |
|---|---|
| `FluentMembers\App\Http\Controllers\` | HTTP controllers |
| `FluentMembers\App\Http\Policies\` | Route policies (auth gates) |
| `FluentMembers\App\Http\Requests\` | Form request validators |
| `FluentMembers\App\Hooks\Handlers\` | WordPress hook handlers |
| `FluentMembers\App\Models\` | Database models |
| `FluentMembers\App\Services\` | Business logic services |
| `FluentMembers\App\Modules\Integrations\` | Third-party integration modules |
| `FluentMembers\App\Modules\Gutenberg\` | Gutenberg block registration |
| `FluentMembers\App\Functions\` | Standalone helpers (Utility, CurrencyHelper) |
| `FluentMembers\Framework\` | WPFluent framework (vendor) |

### Boot sequence (free)

```
fluent-members.php
  → vendor/autoload.php      (Composer PSR-4 autoloading)
  → boot/app.php             (Application bootstrap)
      → WPFluent Foundation\Application
      → register routes (app/Http/Routes/api.php, routes.php)
      → register hooks (app/Hooks/actions.php, filters.php, includes.php)
      → register DB migrations
```

---

## Pro add-on

| Field | Value |
|---|---|
| Plugin name | Fluent Members Pro |
| Slug | fluent-members-pro |
| Version | 1.0.0 |
| Text domain | `fluent-members-pro` |
| ZIP filename | `fluent-members-pro.zip` |
| ZIP size | ~418 KB, 136 files |

### PHP constants (Pro)

| Constant | Value |
|---|---|
| `FLUENT_MEMBERS_PRO_PLUGIN_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PRO_DB_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PRO_PLUGIN_DIR` | `plugin_dir_path(__FILE__)` |
| `FLUENT_MEMBERS_PRO_PLUGIN_URL` | `plugin_dir_url(__FILE__)` |
| `FLUENT_MEMBERS_PRO_DIR_FILE` | `__FILE__` |

### Namespace (Pro)

| Namespace prefix | Area |
|---|---|
| `FluentMembersPro\App\Http\Controllers\` | Pro HTTP controllers |
| `FluentMembersPro\App\Services\` | Pro services (Stripe, subscriptions, etc.) |
| `FluentMembersPro\App\Models\` | Pro models (subscription, order, transaction) |
| `FluentMembersPro\App\Modules\Integrations\` | Pro integration modules (WooCommerce) |

---

## Framework

- **Name**: WPFluent
- **Location**: `vendor/wpfluent/framework/`
- **Style**: Laravel-like (IoC container, router, ORM, events, validation)
- **Key components used**: Router, Request, Response, Model (ORM), Container, Validator, View
- **Config files**: `config/app.php`, `config/middleware.php`, `boot/bindings.php`

---

## Detection constants (used in conditionals throughout codebase)

| Constant | Means |
|---|---|
| `FLUENT_MEMBERS_PLUGIN_VERSION` | Free plugin is active |
| `FLUENT_MEMBERS_PRO_PLUGIN_VERSION` | Pro add-on is active |
| `FLUENTCART_VERSION` | FluentCart is active |
| `FLUENTFORM_VERSION` | Fluent Forms is active |
| `WPPAYFORM_VERSION` | Paymattic is active |
| `WC_PLUGIN_FILE` | WooCommerce is active |
