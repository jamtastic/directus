> **Note**: This is not the greatest Open Data Platform in the world, no. This is just a tribute. Looking for the official Directus project instead? [**Check it out here.**](https://github.com/directus/directus)

<br /><br /><div align="center">

<img alt="Directus Logo" src="https://user-images.githubusercontent.com/522079/158864859-0fbeae62-9d7a-4619-b35e-f8fa5f68e0c8.png">

<br /><br />

![ISC License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge) &nbsp; ![Project Status](https://img.shields.io/badge/status-🚧%20WIP-yellow?style=for-the-badge)

<strong>A collection of [Directus](https://directus.io/) plugins and tools maintained by the _Jamtastic!_&nbsp; team</strong><br />
<sub>Help us expand the Directus ecosystem by contributing to this collection of unofficial, professional grade extensions.</sub>

<br /></div>

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🐰 &nbsp; Directus?

Directus is an open-source data management system. To quote the source:

> **Directus is an Open Data Platform built to democratize the database.**
>
> This platform provides everyone on your team, regardless of technical skill, equal access to data and digital file asset management, for any data model or project. First, link Directus to your desired SQL database and file storage adapter. After that, Directus enables you to perform CRUD operations, create users, assign roles with fully configurable permissions, build complex and granular queries, configure event-driven webhooks and task automation... the list goes on!

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🧩 &nbsp; Extensions

Extensions maintained by _Jamtastic!_ are categorised into two main categories: integration and standalone extensions.

### Integration bundles

Integrations use the bundle extension type and package a number of standalone extensions that work together to either add new experiences, or to integrate other tools into the Directus installation.

- **Access** - advanced role based permissions with support for groups and resource owner based permissions
- **Diagrams** - based on [Diagrams.net](https://www.diagrams.net/)
- **Editor** - advanced editorial workflow for prose based on EditorJS
- **Mailer** - Send and trigger emails using the internal mailer and manage templates using an MJML editor
- **Notifier** - Integrations with communication platforms (e.g. Slack) to receive system notifications and to trigger events remotely

<!-- * Bookings -->
<!-- * Inventory -->

### Standalone extensions

These extensions are either [app extensions](https://docs.directus.io/extensions/introduction.html#app-extensions) or [API extensions](https://docs.directus.io/extensions/introduction.html#api-extensions) that work by themselves. Some may have recommended counterparts - for example, an interface might work well with another display extension.

**App**

- Modules
  - _None planned yet_ 😢
- Layouts
  - **Nested** &nbsp; <img src="https://img.shields.io/badge/-🚧%20%20WIP-grey" height="18px"/>
- Interfaces
  - **Embedded** &nbsp; <img src="https://img.shields.io/badge/-🚧%20%20WIP-grey" height="18px"/>
  - **Header** &nbsp; <img src="https://img.shields.io/badge/-🚧%20%20WIP-grey" height="18px"/>
  - **Monaco** &nbsp; <img src="https://img.shields.io/badge/-🚧%20%20WIP-grey" height="18px"/>
  - **Permalink** &nbsp; <a href="//www.npmjs.com/package/@jamtastic/directus-extension-permalink" target="_blank"><img src="https://img.shields.io/npm/v/@jamtastic/directus-extension-permalink?logo=npm&label=Permalink" height="18px"/></a>
  - **Sentiment** &nbsp; <a href="//www.npmjs.com/package/@jamtastic/directus-extension-sentiment" target="_blank"><img src="https://img.shields.io/npm/v/@jamtastic/directus-extension-sentiment?logo=npm&label=Sentiment" height="18px"/></a>
- Display
  - Icon
- Panels
  - _None planned yet_ 😢

**API**

- Endpoints
- Hooks
- Models (migrations)

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

<!--
### App

<details><summary><strong>View the app extensions we manage</strong></summary><br />

<details><summary><strong>Modules</strong><div align="right"><a href="./source/modules/README.me">More information</a></div></summary><br />

> Modules are completely open-ended components that provide new experiences within the Directus platform. [Learn more about Modules](https://docs.directus.io/extensions/modules.html).

> **Note**
>
> *Jamtastic!* does NOT currently maintain any custom standalone modules, however some are provided as part of the integration packages.

</details>
<details><summary><strong>Layouts</strong></summary><br />

* **Nested** — Similar to the table view, except can be organised into nested groups


</details>
<details><summary><strong>Interfaces</strong></summary><br />

* **Embedded** — embed music, video, gifs, social media and more from external services
* **Monaco** — alternative code editor to built in option; based on Monaco
* **Sentiment** — Rating feedback on a Likert scale

</details>
<details><summary><strong>Displays</strong></summary><br />

> Displays are small inline components that provide new ways of viewing field values throughout a Directus App. [Learn more about Displays](https://docs.directus.io/extensions/displays.html).

* **Sentiment** — Rating feedback on a Likert scale
* **Shields** — Badges powered by shields.io

</details>
<details><summary><strong>Panels</strong></summary><br />

> Panels are modular units of data visualization that exist within the [Insights module](https://docs.directus.io/app/insights.html). Each panel exists within a Dashboard and can be positioned and resized as needed. [Learn more about Panels](https://docs.directus.io/extensions/panels.html).

> **Note**
>
> *Jamtastic!* does NOT currently maintain any custom panels.

</details>

</details>

### API

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png) -->

## 🛠 &nbsp; Tools

This project includes some tools and utilities to help maintain Directus extensions.

### Bunny CLI

To develop Directus extensions with `bunny`:

```shell
$ npm install -g @jamtastic/bunny
$ bunny start
```

To develop `bunny`:

```shell
$ git clone https://github.com/jamtastic/directus
$ cd directus
$ npm i && npm link
$ bunny help
```

### Helpers

Install the helpers into your Directus project:

```shell
$ npm i @jamtastic/directus
```

Inside of a migration file in the project:

```typescript
import { knex } from "knex";
import Directus from "@jamtastic/directus";

export const up = async (knex: Knex) => {
  const directus = new Directus.SchemaBuilder(knex);
  directus.createCollection({
    // ...
  });
};
```

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🔍 &nbsp; Resources

### References

- [Official Documentation](https://docs.directus.io/)
- [Unofficial documentation](https://github.com/directus/directus/wiki/app-components)[^unofficial]

[^unofficial]: This is the documentation for internal app components which are reused in our own extensions as well. However, according to the team: [they] do not consider internal-API changes in the components as a breaking change of Directus.

### Third-party extensions

The Directus ecosystem is supported by a growing list of fantastic contributors. For an up to date list of contributions, check out the official [Awesome Directus List](https://github.com/directus-community/awesome-directus).

Some of the extensions we either use or have been inspired by are listed below.

- **Adrian Dimitrov** — [GitHub](https://github.com/dimitrov-adrian)
  - [M2M Tags](https://github.com/dimitrov-adrian/directus-extension-tags-m2m-interface)
  - [WP Slug](https://github.com/dimitrov-adrian/directus-extension-wpslug-interface) — alternative to our permalink interface
  - [Search Sync](https://github.com/dimitrov-adrian/directus-extension-searchsync)
  - [Group Modal](https://github.com/dimitrov-adrian/directus-extension-group-modal-interface)
  - [EditorJS](https://github.com/dimitrov-adrian/directus-extension-editorjs-interface) — partial inspiration for our editorial workflow
- **Gerard Lamusse** — [GitHub](https://github.com/u12206050)
  - [API Viewer](https://github.com/u12206050/directus-extension-api-viewer-module)
  - [Role Selector](https://github.com/u12206050/directus-extension-role-chooser)
  - [Global Search](https://github.com/u12206050/directus-extension-global-search)
  - [Date Picker](https://github.com/u12206050/directus-9-date-picker-interface)
- **Others**
  - [Display Link](https://github.com/jacoborus/directus-extension-display-link) by [@jacobus](https://github.com/jacoborus/) — recommended counterpart to our permalink interface.
  - [Mailer](https://github.com/ryntab/Directus-Mailer) by [@ryntab](https://github.com/ryntab) — partial inspiration for our own mailer workflow
