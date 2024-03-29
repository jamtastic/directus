# Directus Code Standard <sup>ish</sup>

Shareable linting configuration for Directus extension projects. Designed to follow standards used in the official project with some potentially controversial caveats (ergo, "-ish"):

1. No semi-colons 🫰[^dyslexic]
2. <del>Tabs</del> <ins>Spaces</ins> 😄
3. The following `@typescript/*` rules are re-enabled or changed[^typescript]:

   - `no-explicit-any`
   - `no-var-require`
   - `no-non-null-assertion` is set to `"warn"` (planned to set to error)
   - `ban-ts-comment`

4. Prettier print width is set to `100` since eslint will handle the absolute max width (lines of code _really_ should not go past 100 characters for best readability, and especially not 120)
5. Vue files have their `<script>` and `<style>` tags indented to match the `<template>` tags[^dyslexic]
6. Markdown prose no longer forcibly wraps (uses default value of `"preserve"`) - use your editors wrap features as forced wrapping can be error prone when editing existing blocks of content
7. Addition of some more rules that are currently `undefined`. These are subject to change if the Directus project sets any of these rules

[^typescript]: The Directus project already has these marked as for review and may eventually be the same as in this project anyway. Hopefully this is just getting ahead.
[^dyslexic]: The primary contributor to this project is slightly dyslexic and these settings help readability greatly.

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Installation

Install the package in your Directus project:

```shell
$ npm install -D @jamtastic/directus
```

**Configure your editor**

> **Note**: These instructions are VSCode specific.

Install the following extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- Vetur <!-- Need to update docs to Volar instead -->
- (optional) Vue
- (optional) VueDX

Add the following to your `.vscode/settings.json` file in your project:

```json
{
  "stylelint.validate": ["css", "less", "postcss", "vue"],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  }
}
```

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Usage

> **Note**: This process is done automatically when using the `bunny new` CLI command to create an extension in [**@jamtastic/directus**](https://github.com/jamtastic/directus).

Add the following to your projects `package.json` file:

```jsonc
{
  "scripts": {
    "fix": "npm run lint -- --fix",
    "format": "prettier **/*.{vue,ts} --write",
    "lint": "eslint **/*.{vue,ts}",
    "style": "stylelint \"**/*.{vue,css,scss,sass}\"",
    "prebuild": "npm run lint",
    "prelint": "npm run format && npm run style"
  },

  // ...

  "eslintConfig": {
    "extends": "@jamtastic/eslint-config-directus"
  },
  "prettier": "@jamtastic/directus/prettier",
  "stylelint": {
    "extends": "@jamtastic/directus/stylelint"
  }
}
```

### Extending config options

Using the `package.json` file and sticking to the provided config options is the recommended way to use these config files, however you may also extend the configuration if needed. Follow the docs for each linting tool for more information.

- [ESLint](https://eslint.org/docs/latest/developer-guide/shareable-configs)
- [Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations)

**Stylelint** (in a `.stylelintrc` file):

```yaml
extends:
  - 'jamtastic/directus/stylelint'
rules: // your overrides here
```
