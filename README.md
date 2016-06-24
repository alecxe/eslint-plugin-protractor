# eslint-plugin-protractor

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-protractor.svg)](https://www.npmjs.com/package/eslint-plugin-protractor)
[![Build Status](https://img.shields.io/travis/alecxe/eslint-plugin-protractor.svg)](https://travis-ci.org/alecxe/eslint-plugin-protractor)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Code Climate](https://codeclimate.com/github/alecxe/eslint-plugin-protractor/badges/gpa.svg)](https://codeclimate.com/github/alecxe/eslint-plugin-protractor)
[![Package Quality](http://npm.packagequality.com/shield/eslint-plugin-protractor.svg)](http://packagequality.com/#?package=eslint-plugin-protractor)
[![Coverage Status](https://coveralls.io/repos/github/alecxe/eslint-plugin-protractor/badge.svg?branch=master)](https://coveralls.io/github/alecxe/eslint-plugin-protractor?branch=master)
[![devDependency Status](https://david-dm.org/alecxe/eslint-plugin-protractor/master/dev-status.svg)](https://david-dm.org/alecxe/eslint-plugin-protractor/master#info=devDependencies)

> ESLint rules for Protractor

## Usage

1. Install `eslint-plugin-protractor` as a dev-dependency:

    ```shell
    npm install --save-dev eslint-plugin-protractor
    ```

2. Enable the plugin by adding it to your `.eslintrc`:

    ```yaml
    plugins:
      - protractor
    ```

## Configuration

This plugin ships with a default configuration for each rule:

Rule                         | Default       | Options
----                         | -------       | -------
[missing-perform][]          | 2             |
[no-browser-pause][]         | 2             |
[missing-wait-message][]     | 1             |
[no-browser-sleep][]         | 1             |
[no-by-xpath][]              | 1             |
[no-describe-selectors][]    | 1             |
[no-angular-classes][]       | 1             |
[use-angular-locators][]     | 1             |
[use-simple-repeaters][]     | 1             |
[no-shadowing][]             | 1             |
[use-first-last][]           | 1             |
[by-css-shortcut][]          | 0             |

For example, the `missing-perform` rule is enabled by default and will cause
ESLint to throw an error (with an exit code of `1`) when triggered.

You may customise each rule by adding a value in your `.eslintrc` `rules`
property:

```yaml
plugins:
  - protractor
rules:
  protractor/missing-perform: 0
```

See [configuring rules][] for more information.

[missing-perform]: docs/rules/missing-perform.md
[no-browser-pause]: docs/rules/no-browser-pause.md
[missing-wait-message]: docs/rules/missing-wait-message.md
[no-browser-sleep]: docs/rules/no-browser-sleep.md
[no-by-xpath]: docs/rules/no-by-xpath.md
[no-describe-selectors]: docs/rules/no-describe-selectors.md
[no-angular-classes]: docs/rules/no-angular-classes.md
[use-angular-locators]: docs/rules/use-angular-locators.md
[use-simple-repeaters]: docs/rules/use-simple-repeaters.md
[no-shadowing]: docs/rules/no-shadowing.md
[use-first-last]: docs/rules/use-first-last.md
[by-css-shortcut]: docs/rules/by-css-shortcut.md
[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Recommended configuration

This plugin export a `recommended` configuration that enforce good practices.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "plugins": [
    "protractor"
  ],
  "extends": "plugin:protractor/recommended"
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

## Author

© 2016 Alexander Afanasyev

## License

Licensed under the [MIT license](LICENSE).
