# eslint-plugin-protractor

[![npm version](https://img.shields.io/npm/v/eslint-plugin-protractor.svg)](https://www.npmjs.com/package/eslint-plugin-protractor)
[![Build Status](https://img.shields.io/travis/alecxe/eslint-plugin-protractor.svg)](https://travis-ci.org/alecxe/eslint-plugin-protractor)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Join the chat at https://gitter.im/alecxe/eslint-plugin-protractor](https://badges.gitter.im/alecxe/eslint-plugin-protractor.svg)](https://gitter.im/alecxe/eslint-plugin-protractor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Code Climate](https://codeclimate.com/github/alecxe/eslint-plugin-protractor/badges/gpa.svg)](https://codeclimate.com/github/alecxe/eslint-plugin-protractor)
[![Package Quality](http://npm.packagequality.com/shield/eslint-plugin-protractor.svg)](http://packagequality.com/#?package=eslint-plugin-protractor)
[![Coverage Status](https://coveralls.io/repos/github/alecxe/eslint-plugin-protractor/badge.svg?branch=master)](https://coveralls.io/github/alecxe/eslint-plugin-protractor?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Dependency Status](https://dependencyci.com/github/alecxe/eslint-plugin-protractor/badge)](https://dependencyci.com/github/alecxe/eslint-plugin-protractor)

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

Rule                         | Default Error Level | Auto-fixable | Options
----                         | -------             | -----        | -----
[missing-perform][]          | 2                   |              |
[no-browser-pause][]         | 2                   |              |
[correct-chaining][]         | 2                   | Yes          |
[no-invalid-selectors][]     | 2                   |              |
[missing-wait-message][]     | 1                   |              |
[no-browser-sleep][]         | 1                   |              |
[no-by-xpath][]              | 1                   |              |
[no-describe-selectors][]    | 1                   |              |
[no-angular-classes][]       | 1                   |              |
[use-angular-locators][]     | 1                   |              |
[no-angular-attributes][]    | 1                   |              |
[no-bootstrap-classes][]     | 1                   |              |
[use-simple-repeaters][]     | 1                   |              |
[no-shadowing][]             | 1                   |              |
[use-first-last][]           | 1                   | Yes          |
[no-get-in-it][]             | 1                   |              |
[array-callback-return][]    | 1                   |              |
[no-absolute-url][]          | 1                   |              |
[no-expect-in-po][]          | 1                   |              | requires plugin "settings"
[no-promise-in-if][]         | 1                   |              | 
[no-execute-script][]        | 1                   |              | requires plugin "settings"
[no-repetitive-locators][]   | 1                   |              |
[no-repetitive-selectors][]  | 1                   |              |
[no-get-inner-outer-html][]  | 1                   |              |
[use-promise-all][]          | 0                   |              |
[by-css-shortcut][]          | 0                   |              |

For example, the `missing-perform` rule is enabled by default and will cause
ESLint to throw an error (with an exit code of `1`) when triggered.

The `requires plugin "settings"` note indicates that a rule needs the plugin to have configured settings in your eslint config.
For example, `no-execute-script` rule expects configured paths to either spec, or page object files, or both. 

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
[no-bootstrap-classes]: docs/rules/no-bootstrap-classes.md
[use-angular-locators]: docs/rules/use-angular-locators.md
[use-simple-repeaters]: docs/rules/use-simple-repeaters.md
[no-shadowing]: docs/rules/no-shadowing.md
[use-first-last]: docs/rules/use-first-last.md
[no-get-in-it]: docs/rules/no-get-in-it.md
[array-callback-return]: docs/rules/array-callback-return.md
[no-absolute-url]: docs/rules/no-absolute-url.md
[by-css-shortcut]: docs/rules/by-css-shortcut.md
[no-expect-in-po]: docs/rules/no-expect-in-po.md
[no-promise-in-if]: docs/rules/no-promise-in-if.md
[no-execute-script]: docs/rules/no-execute-script.md
[correct-chaining]: docs/rules/correct-chaining.md
[no-repetitive-locators]: docs/rules/no-repetitive-locators.md
[no-get-inner-outer-html]: docs/rules/no-get-inner-outer-html.md
[no-repetitive-selectors]: docs/rules/no-repetitive-selectors.md
[no-angular-attributes]: docs/rules/no-angular-attributes.md
[no-invalid-selectors]: docs/rules/no-invalid-selectors.md
[use-promise-all]: docs/rules/use-promise-all.md
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
