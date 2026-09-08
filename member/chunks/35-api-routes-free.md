---
chunk: 35
category: Developer Reference
subcategory: API Routes — Free Plugin
query-triggers: [REST API routes, API endpoints, free API, wp-json, fluent-members v2, route map, route reference, REST endpoint list]
related-chunks: [36, 37]
source-files: [fluent-members/app/Http/Routes/api.php]
doc-files: [reference/developer-hooks.md]
---

# API Routes — Free Plugin

Base path: `/wp-json/fluent-members/v2`

All routes require admin authentication (`UserPolicy`) unless noted.

---

## Access Groups (prefix `/access-groups`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `AccessGroupController@get` |
| POST | `/` | `AccessGroupController@store` |
| GET | `/contents` | `AccessGroupController@getAllContents` |
| GET | `/link-suggestions` | `AccessGroupController@getLinkSuggestions` |
| GET | `/{id}` | `AccessGroupController@find` |
| PUT | `/{id}` | `AccessGroupController@update` |
| DELETE | `/{id}` | `AccessGroupController@delete` |
| POST | `/{id}/duplicate` | `AccessGroupController@duplicate` |

There is no `sync-levels` or `sync-contents` route — level linking happens via the Levels routes below (`POST /levels/{id}/access-groups`), and content assignment happens via the Access Group's own `settings.restriction_rules` on create/update.

---

## Membership Levels (prefix `/levels`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `MembershipLevelController@get` |
| GET | `/pricing` | `MembershipLevelController@getPricing` |
| POST | `/` | `MembershipLevelController@store` |
| GET | `/{id}` | `MembershipLevelController@find` |
| PUT | `/{id}` | `MembershipLevelController@update` |
| DELETE | `/{id}` | `MembershipLevelController@delete` |
| GET | `/{id}/setup-status` | `MembershipLevelController@setupStatus` |
| POST | `/{id}/pricing-order` | `MembershipLevelController@updatePricingOrder` |
| GET | `/{id}/access-groups` | `AccessGroupController@getLevelAccessGroups` |
| POST | `/{id}/access-groups` | `AccessGroupController@assignAccessGroups` |
| POST | `/{id}/duplicate` | `MembershipLevelController@duplicate` |

There is no `GET /levels/{id}/members` route in this version.

---

## Members (prefix `/members`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `MembersController@get` |
| GET | `/{id}` | `MembersController@find` |

There is no `/members/upgrade-plan` route registered.

---

## Membership Users (prefix `/membership-users`)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/` | `MembershipUserController@store` |
| PUT | `/{id}/update-status` | `MembershipUserController@updateStatus` |
| DELETE | `/` | `MembershipUserController@remove` |

---

## Dashboard (prefix `/dashboard`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `DashboardController@get` |
| GET | `/membership-activity` | `DashboardController@membershipActivity` |
| GET | `/business-trends` | `DashboardController@businessTrends` |

---

## Activities (prefix `/activities`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `ActivityController@index` |

---

## Email Notifications (prefix `/email-notification`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `EmailNotificationController@index` |
| POST | `/enable-notification/{name}` | `EmailNotificationController@enableNotification` |
| POST | `/preview-default-template` | `EmailNotificationController@previewDefaultTemplate` |
| GET | `/{notification}` | `EmailNotificationController@find` |
| PUT | `/{notification}` | `EmailNotificationController@update` |

There is no `/email-notification/get-short-codes` route in this version.

---

## Settings (prefix `/settings`)

| Method | Path | Controller@method |
|---|---|---|
| POST | `/onboarding-completed` | `SettingsController@onBoardingCompleted` |
| GET | `/general` | `SettingsController@getGeneralSettings` |
| GET | `/general/search-pages` | `SettingsController@searchPortalPages` |
| POST | `/general` | `SettingsController@updateGeneralSettings` |
| POST | `/general/create-portal-page` | `SettingsController@createPortalPage` |
| POST | `/general/create-pricing-page` | `SettingsController@createPricingPage` |
| GET | `/login-popup` | `SettingsController@getLoginPopupSettings` |
| POST | `/login-popup` | `SettingsController@updateLoginPopupSettings` |
| GET | `/mailing` | `SettingsController@getMailingSettings` |
| POST | `/mailing` | `SettingsController@updateMailingSettings` |
| GET | `/partial-content` | `SettingsController@getPartialContentSettings` |
| POST | `/partial-content` | `SettingsController@updatePartialContentSettings` |
| GET | `/unauthorized-access` | `SettingsController@getUnauthorizedAccessSettings` |
| POST | `/unauthorized-access` | `SettingsController@updateUnauthorizedAccessSettings` |
| GET | `/payment-methods/all` | `PaymentMethodController@index` |
| GET | `/integrations` | `IntegrationController@index` |
| POST | `/install-plugin` | `SettingsController@installPlugin` |

`/settings/public-contents` and `/settings/email-notifications` (as their own GET/POST pair) are not separate routes in this version — public-contents behavior lives under general settings, and email notification list/detail is served by the `/email-notification` routes above.

---

## Migration (prefix `/migration`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/sources` | `MigrationController@getSources` |

### PMPro (prefix `/migration/pmpro`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/stats` | `PmproMigrationController@getStats` |
| GET | `/status` | `PmproMigrationController@getStatus` |
| POST | `/analyze` | `PmproMigrationController@analyze` |
| POST | `/reset` | `PmproMigrationController@resetState` |
| POST | `/migrate/levels` | `PmproMigrationController@migrateLevels` |
| POST | `/migrate/access-groups` | `PmproMigrationController@migrateAccessGroups` |
| POST | `/migrate/members` | `PmproMigrationController@migrateMembers` |
| POST | `/migrate/corporate` | `PmproMigrationController@migrateCorporate` |
| POST | `/migrate/drip-content` | `PmproMigrationController@migrateDripContent` |
| POST | `/migrate/subscriptions` | `PmproMigrationController@migrateSubscriptions` |
| POST | `/migrate/orders` | `PmproMigrationController@migrateOrders` |
| POST | `/migrate/transactions` | `PmproMigrationController@migrateTransactions` |
| POST | `/migrate/cleanup` | `PmproMigrationController@migrateCleanup` |
| GET | `/logs` | `PmproMigrationController@getLogs` |
| GET | `/summary` | `PmproMigrationController@getSummary` |

### MemberPress (prefix `/migration/memberpress`)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/stats` | `MemberPressMigrationController@getStats` |
| GET | `/status` | `MemberPressMigrationController@getStatus` |
| POST | `/analyze` | `MemberPressMigrationController@analyze` |
| POST | `/migrate/access-groups` | `MemberPressMigrationController@migrateAccessGroups` |
| POST | `/migrate/levels` | `MemberPressMigrationController@migrateLevels` |
| POST | `/migrate/memberships` | `MemberPressMigrationController@migrateMemberships` |
| POST | `/migrate/orders` | `MemberPressMigrationController@migrateOrders` |
| POST | `/migrate/transactions` | `MemberPressMigrationController@migrateTransactions` |
| POST | `/migrate/subscriptions` | `MemberPressMigrationController@migrateSubscriptions` |
| POST | `/migrate/corporate` | `MemberPressMigrationController@migrateCorporate` |
| POST | `/migrate/cleanup` | `MemberPressMigrationController@migrateCleanup` |
| GET | `/logs` | `MemberPressMigrationController@getLogs` |
| GET | `/summary` | `MemberPressMigrationController@getSummary` |
| POST | `/reset` | `MemberPressMigrationController@resetState` |

### Kadence Memberships (prefix `/migration/kadence`)

Renamed from "Restrict Content Pro" in v1.1.0; uses a different, simpler shape than PMPro/MemberPress (no per-entity `migrate/*` endpoints — a single `run-step` loop drives it):

| Method | Path | Controller@method |
|---|---|---|
| POST | `/analyze` | `KadenceMigrationController@analyze` |
| POST | `/run-step` | `KadenceMigrationController@runStep` |
| GET | `/status` | `KadenceMigrationController@getStatus` |
| GET | `/summary` | `KadenceMigrationController@getSummary` |
| GET | `/logs` | `KadenceMigrationController@getLogs` |
| POST | `/reset` | `KadenceMigrationController@reset` |

There is no `/migration/pmpro/detect`, `/migration/memberpress/detect`, `/migration/rcp/*`, or generic `import-members` / `import-subscriptions` / `import-orders` route naming in this version — those endpoint names are obsolete.

---

## Member Portal (prefix `/member-portal`, policy `PortalPolicy` — any logged-in user)

| Method | Path | Controller@method |
|---|---|---|
| GET | `/` | `MemberPortalController@getMemberships` |
| GET | `/{id}` | `MemberPortalController@getMembership` |
| POST | `/{id}/cancel` | `MemberPortalController@cancelMembership` |
