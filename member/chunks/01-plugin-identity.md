---
chunk: 01
category: Foundation
subcategory: Plugin Identity
query-triggers: [plugin name, version, constants, namespace, framework, entry point, boot, autoload, ZIPs]
related-chunks: [02]
source-files: [fluent-members.php, boot/app.php, composer.json, fluent-members-pro/fluent-members-pro.php]
doc-files: [guide/getting-started/introduction.md, guide/getting-started/installation.md]
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
| ZIP filename (as handed over) | `fluent-members.zip` |
| ZIP size | ~1.9 MB, 611 files |

### PHP constants (free)

| Constant | Value |
|---|---|
| `FLUENT_MEMBERS_PLUGIN_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PLUGIN_DIR` | `plugin_dir_path(__FILE__)` |
| `FLUENT_MEMBERS_PLUGIN_URL` | `plugin_dir_url(__FILE__)` |
| `FLUENT_MEMBERS_DIR_FILE` | `__FILE__` |

### Namespaces (free)

Composer PSR-4 root: `FluentMembers\App\` → `app/` (see `composer.json`).

| Namespace prefix | Area |
|---|---|
| `FluentMembers\App\Http\Controllers\` | HTTP controllers |
| `FluentMembers\App\Http\Policies\` | Route policies (auth gates) |
| `FluentMembers\App\Http\Requests\` | Form request validators |
| `FluentMembers\App\Hooks\Handlers\` | WordPress hook handlers |
| `FluentMembers\App\Models\` | Database models — **including** `MembershipOrder`, `MembershipSubscription`, `MembershipTransaction`, and `Activity` (all free-plugin code; see chunk 02) |
| `FluentMembers\App\Services\` | Business logic services |
| `FluentMembers\App\Modules\Integrations\` | Third-party integration modules |
| `FluentMembers\App\Modules\Gutenberg\` | Gutenberg block registration |
| `FluentMembers\App\Functions\` | Standalone helpers (Utility, CurrencyHelper) |
| `FluentMembers\Database\Migrations\` | Table migrators |
| `FluentMembers\Framework\` | WPFluent framework (vendor) |

### Boot sequence (free)

```
fluent-members.php
  → defines FLUENT_MEMBERS_* constants
  → vendor/autoload.php      (Composer PSR-4 autoloading)
  → boot/app.php             (returns a bootstrap closure)
      → new FluentMembers\Framework\Foundation\Application($file)
      → register_activation_hook()   → ActivationHandler
      → register_deactivation_hook() → DeactivationHandler
      → add_action('plugins_loaded') → do_action('fluent-members/loaded', $app)
      → Application wiring registers routes (app/Http/Routes/api.php, routes.php),
        hooks (app/Hooks/actions.php, filters.php, includes.php), and DB migrations
```

---

## Pro add-on

| Field | Value |
|---|---|
| Plugin name | Fluent Members Pro |
| Slug | fluent-members-pro |
| Version | 1.0.0 |
| Text domain | `fluent-members-pro` |
| ZIP filename (as handed over) | `fluent-members-pro.zip` |
| ZIP size | ~285 KB, 182 files |

### PHP constants (Pro)

| Constant | Value |
|---|---|
| `FLUENT_MEMBERS_PRO_PLUGIN_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PRO_DB_VERSION` | `'1.0.0'` |
| `FLUENT_MEMBERS_PRO_PLUGIN_DIR` | `plugin_dir_path(__FILE__)` |
| `FLUENT_MEMBERS_PRO_PLUGIN_URL` | `plugin_dir_url(__FILE__)` |
| `FLUENT_MEMBERS_PRO_DIR_FILE` | `__FILE__` |

### Namespaces (Pro)

Pro ships **no `app/Models/` directory** — it has no models of its own. It reads/writes the
free plugin's `FluentMembers\App\Models\*` classes (Order/Subscription/Transaction included).

| Namespace prefix | Area |
|---|---|
| `FluentMembersPro\App\Core\` | Pro core/bootstrap glue |
| `FluentMembersPro\App\Http\Controllers\` | Pro HTTP controllers |
| `FluentMembersPro\App\Http\Policies\` | Pro route policies |
| `FluentMembersPro\App\Http\Requests\` | Pro form request validators |
| `FluentMembersPro\App\Hooks\Handlers\` | Pro hook handlers |
| `FluentMembersPro\App\Services\` | Pro services |
| `FluentMembersPro\App\Services\Payments\Stripe\` (+ `API\`, `Webhook\`) | Native Stripe checkout/webhooks |
| `FluentMembersPro\App\Services\Payments\PayPal\` (+ `API\`, `Webhook\`, `Ipn\`) | Native PayPal checkout/webhooks/IPN |
| `FluentMembersPro\App\Services\Email\` (+ `Blocks\`) | Block email editor |
| `FluentMembersPro\App\Modules\Integrations\Woocommerce\` (+ `Http\Controllers\`, `Services\`) | WooCommerce paywall integration |

Boot sequence mirrors free: `fluent-members-pro.php` defines constants → `vendor/autoload.php`
→ `boot/app.php` returns a bootstrap closure that builds the Pro `Application`.

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
