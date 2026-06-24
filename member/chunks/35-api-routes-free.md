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

All routes require admin authentication unless noted.

---

## Access Groups

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/access-groups` | `AccessGroupController@index` | Admin |
| POST | `/access-groups` | `AccessGroupController@store` | Admin |
| GET | `/access-groups/{id}` | `AccessGroupController@find` | Admin |
| PUT | `/access-groups/{id}` | `AccessGroupController@update` | Admin |
| DELETE | `/access-groups/{id}` | `AccessGroupController@delete` | Admin |
| POST | `/access-groups/{id}/sync-levels` | `AccessGroupController@syncLevels` | Admin |
| GET | `/access-groups/{id}/contents` | `AccessGroupController@getContents` | Admin |
| POST | `/access-groups/{id}/sync-contents` | `AccessGroupController@syncContents` | Admin |

---

## Membership Levels

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/levels` | `MembershipLevelController@index` | Admin |
| POST | `/levels` | `MembershipLevelController@store` | Admin |
| GET | `/levels/{id}` | `MembershipLevelController@find` | Admin |
| PUT | `/levels/{id}` | `MembershipLevelController@update` | Admin |
| DELETE | `/levels/{id}` | `MembershipLevelController@delete` | Admin |
| GET | `/levels/{id}/members` | `MembershipLevelController@getMembers` | Admin |

---

## Members

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/members` | `MembersController@get` | Admin |
| GET | `/members/{id}` | `MembersController@find` | Admin |
| GET | `/members/upgrade-plan` | `MembersController@upgradePlan` | Admin |

---

## Membership Users

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/membership-users` | `MembershipUserController@store` | Admin |
| PUT | `/membership-users/{id}/update-status` | `MembershipUserController@updateStatus` | Admin |
| DELETE | `/membership-users` | `MembershipUserController@remove` | Admin |

---

## Dashboard

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/dashboard` | `DashboardController@getDashboard` | Admin |

---

## Email Notifications

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/email-notification` | `EmailNotificationController@index` | Admin |
| GET | `/email-notification/get-short-codes` | `EmailNotificationController@getShortCodes` | Admin |
| POST | `/email-notification/enable-notification/{name}` | `EmailNotificationController@enableNotification` | Admin |
| POST | `/email-notification/preview-default-template` | `EmailNotificationController@previewDefaultTemplate` | Admin |
| GET | `/email-notification/{notification}` | `EmailNotificationController@find` | Admin |
| PUT | `/email-notification/{notification}` | `EmailNotificationController@update` | Admin |

---

## Settings

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/settings/general` | `SettingsController@getGeneralSettings` | Admin |
| POST | `/settings/general` | `SettingsController@updateGeneralSettings` | Admin |
| POST | `/settings/general/create-portal-page` | `SettingsController@createPortalPage` | Admin |
| GET | `/settings/login-popup` | `SettingsController@getLoginPopupSettings` | Admin |
| POST | `/settings/login-popup` | `SettingsController@updateLoginPopupSettings` | Admin |
| GET | `/settings/mailing` | `SettingsController@getMailingSettings` | Admin |
| POST | `/settings/mailing` | `SettingsController@updateMailingSettings` | Admin |
| GET | `/settings/email-notifications` | `SettingsController@getEmailNotifications` | Admin |
| POST | `/settings/email-notifications` | `SettingsController@updateEmailNotifications` | Admin |
| GET | `/settings/partial-content` | `SettingsController@getPartialContentSettings` | Admin |
| POST | `/settings/partial-content` | `SettingsController@updatePartialContentSettings` | Admin |
| GET | `/settings/public-contents` | `SettingsController@getPublicContents` | Admin |
| POST | `/settings/public-contents` | `SettingsController@updatePublicContents` | Admin |
| POST | `/settings/install-plugin` | `SettingsController@installPlugin` | Admin |
| POST | `/settings/onboarding-completed` | `SettingsController@onboardingCompleted` | Admin |

---

## Migration

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| POST | `/migration/pmpro/detect` | `PmproMigrationController@detect` | Admin |
| POST | `/migration/pmpro/analyze` | `PmproMigrationController@analyze` | Admin |
| POST | `/migration/pmpro/import-members` | `PmproMigrationController@importMembers` | Admin |
| POST | `/migration/pmpro/import-subscriptions` | `PmproMigrationController@importSubscriptions` | Admin |
| POST | `/migration/pmpro/import-orders` | `PmproMigrationController@importOrders` | Admin |
| POST | `/migration/pmpro/cleanup` | `PmproMigrationController@cleanup` | Admin |
| POST | `/migration/memberpress/detect` | `MemberPressMigrationController@detect` | Admin |
| POST | `/migration/memberpress/analyze` | `MemberPressMigrationController@analyze` | Admin |
| POST | `/migration/memberpress/import-members` | `MemberPressMigrationController@importMembers` | Admin |
| POST | `/migration/memberpress/import-subscriptions` | `MemberPressMigrationController@importSubscriptions` | Admin |
| POST | `/migration/memberpress/import-orders` | `MemberPressMigrationController@importOrders` | Admin |
| POST | `/migration/memberpress/cleanup` | `MemberPressMigrationController@cleanup` | Admin |
| POST | `/migration/rcp/detect` | `RcpMigrationController@detect` | Admin |
| POST | `/migration/rcp/analyze` | `RcpMigrationController@analyze` | Admin |
| POST | `/migration/rcp/run-step` | `RcpMigrationController@runStep` | Admin |
| POST | `/migration/rcp/cleanup` | `RcpMigrationController@cleanup` | Admin |

---

## Member Portal (Free)

| Method | Path | Controller@method | Auth |
|---|---|---|---|
| GET | `/member-portal` | `MemberPortalController@getMemberships` | Logged-in user |
| GET | `/member-portal/{id}` | `MemberPortalController@getMembership` | Logged-in user |
| POST | `/member-portal/{id}/cancel` | `MemberPortalController@cancelMembership` | Logged-in user |

---

## Total free routes: ~50
