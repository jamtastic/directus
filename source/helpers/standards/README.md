# Directus Code Standard <sup>ish</sup>

Shareable linting configuration for Directus extension projects. Designed to follow standards used in the official project with some potentially controversial caveats (ergo, "-ish"):

1. No semi-colons 🫰[^dyslexic]
2. <del>Tabs</del> <ins>Spaces</ins> 😄[^dyslexic]
3. The following `@typescript/*` rules are re-enabled or changed[^typescript]:

   - `no-explicit-any`
   - `no-var-require`
   - `no-non-null-assertion` is set to `"warn"` (planned to set to error)
   - `ban-ts-comment`

4. Prettier print width is set to `100` since eslint will handle the absolute max width (lines of code _really_ should not go past 100 characters, and especially not 120)
5. Vue files have their `<script>` and `<style>` tags indented to match the `<template>` tags[^dyslexic]
6. Markdown prose no longer forcibly wraps (uses default value of `"preserve"`) - use your editors wrap features as forced wrapping is error prone
7. Addition of more rules that are currently `undefined`. They will be changed if the Directus project sets any of these rules.

[^typescript]: The Directus project already has these marked as for review and may eventually be the same as in this project anyway. Hopefully this is just getting ahead.
[^dyslexic]: The primary contributor to this project is slightly dyslexic and these settings help them greatly.

![Divider](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## Installation

Install the package in your Directus project:

```shell
$ npm install -D @jamtastic/directus-standardish
```

**Configure your editor**

> **Note**: These instructions are VSCode specific.

Install the following extensions:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- Vetur
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

> **Note**: This process is done automatically for new extensions in [**@jamtastic/directus**](https://github.com/jamtastic/directus) when using the `bunny new` CLI command.

Add the following to your projects `package.json` file:

```json
{
  "scripts": {
    "fix": "npm run fix:code && npm run fix:code && npm run fix:style",
    "fix:code": "eslint",
    "fix:format": "prettier",
    "fix:style": "stylelint **/*.{vue,css,scss,sass}",
    "lint": "npm run lint:code && npm run lint:code && npm run lint:style",
    "lint:code": "eslint",
    "lint:format": "prettier",
    "lint:style": "stylelint **/*.{vue,css,scss,sass}"
  },

  // ...

  "eslintConfig": {
    "extends": "@jamtastic/eslint-config-directus"
  },
  "prettier": "@jamtastic/directus-standardish/prettier",
  "stylelint": {
    "extends": "@jamtastic/directus-standardish/stylelint"
  }
}
```

### Other options

Using `package.json` is the recommended way to use these config files however you may also extend the configuration by following the docs for each linting tool.

- [ESLint](https://eslint.org/docs/latest/developer-guide/shareable-configs)
- [Prettier](https://prettier.io/docs/en/configuration.html#sharing-configurations)

**Stylelint** (in a `.stylelintrc` file):

```yaml
extends:
  - 'jamtastic/directus-standardish/stylelint'
rules: // your overrides here
```
