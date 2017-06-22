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

This plugin would not only help catch common Protractor-specific errors early, follow the best practices for writing Protractor tests,
but would also help maintaining good and reliable element locators.

The plugin would be of the most help if configured to run in your IDE of choice on the fly.

![Example](https://raw.githubusercontent.com/alecxe/eslint-plugin-protractor/master/docs/media/ws_demo.gif)

*This gif shows integration of ESLint with eslint-plugin-protractor into WebStorm IDE. Find out more at [WebStorm ESLint configuration](https://www.jetbrains.com/help/webstorm/eslint.html).*

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) and this plugin either locally or globally.

```sh
$ npm install eslint --save-dev
$ npm install eslint-plugin-protractor --save-dev
```

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

## Rules

There are various types of rules implemented in the plugin. Here is a rough categorization.

#### Correct Protractor API usage and Common Errors

* [missing-perform][]: Enforce valid `browser.actions()` usage
* [correct-chaining][]: Prohibit incorrect chaining of `element` and `element.all`
* [no-array-finder-methods][]: Disallow using `ElementArrayFinder` methods on `ElementFinder`
* [array-callback-return][]: Enforce `return` statements in callbacks of `ElementArrayFinder` methods
* [no-get-inner-outer-html][]: Warn about using deprecated `getInnerHtml()` and `getOuterHtml()` methods
* [no-get-raw-id][]: Warn about using removed `getRawId()` method
* [no-get-location-abs-url][]: Warn about using deprecated `getLocationAbsUrl()` method
* [no-promise-in-if][]: Warn if promise is checked for truthiness inside an `if` condition

#### Locating Elements

* [no-invalid-selectors][]: Prohibit creating invalid CSS selectors
* [valid-locator-type][]: Ensure correct locator argument type for `element()`, `element.all()`, `$()` and `$$()`
* [no-compound-classes][]: Do not allow compound class names in the `by.className()` locator
* [no-angular-classes][]: Discourage using Angular CSS classes inside CSS selectors
* [use-angular-locators][]: Recommend using built-in Angular-specific locators
* [no-angular-attributes][]: Discourage using Angular attributes inside CSS selectors
* [no-bootstrap-classes][]: Discourage using Bootstrap layout-oriented CSS classes inside CSS selectors
* [use-simple-repeaters][]: Discourage using extended `ng-repeat` syntax in `by.repeater()` locators
* [no-repetitive-locators][]: Discourage repeating locators
* [no-repetitive-selectors][]: Discourage repeating parts of CSS selectors
* [valid-by-id][]: Prohibit use of invalid ID value when using `by.id()` locator
* [valid-by-tagname][]: Prohibit use of invalid Html Tag Name value when using `by.tagName()` locator

#### Style Guide Recommendations and Best Practices

* [missing-wait-message][]: Missing wait timeout message in `browser.wait()`
* [no-by-xpath][]: Discourage the use of `by.xpath()` locator
* [no-get-in-it][]: Recommend against having `browser.get()` or `browser.driver.get()` inside `it()`
* [no-execute-script][]: Recommend against executing scripts in specs and page objects
* [no-expect-in-po][]: Recommend against making assertions inside Page Objects
* [no-absolute-url][]: Recommend against navigating to absolute URLs inside `browser.get()` or `browser.driver.get()`
* [use-first-last][]: Recommend using `first()` instead of `get(0)` and `last()` instead of `get(-1)`
* [no-shadowing][]: Don't allow to shadow the built-in Protractor globals
* [use-count-method][]: Recommend using `count()` instead of `then()` and `length`
* [use-promise-all][]: Recommend using `protractor.promise.all()` to resolve multiple promises 
* [by-css-shortcut][]: Recommend using `$` and `$$` shortcuts
* [no-describe-selectors][]: Discourage nested selectors within describe blocks
* [no-browser-pause][]: Discourage the use of `browser.pause()`
* [no-browser-sleep][]: Discourage the use of `browser.sleep()`
* [no-browser-driver][]: Discourage the use of `browser.driver` instead of `browser` directly

Here is a table with all the available rules sorted by the default error level:

Rule                         | Default Error Level | Auto-fixable | Options
----                         | -------             | -----        | -----
[missing-perform][]          | 2 (Error)           |              |
[no-browser-pause][]         | 2                   |              |
[correct-chaining][]         | 2                   | Yes          |
[no-invalid-selectors][]     | 2                   |              |
[no-array-finder-methods][]  | 2                   |              |
[valid-locator-type][]       | 2                   |              |
[no-compound-classes][]      | 2                   |              |
[no-get-inner-outer-html][]  | 2                   |              |
[no-get-raw-id][]            | 2                   |              |
[missing-wait-message][]     | 1 (Warning)         |              |
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
[no-get-location-abs-url][]  | 1                   |              |
[no-expect-in-po][]          | 1                   |              | requires plugin "settings"
[no-promise-in-if][]         | 1                   |              | 
[no-execute-script][]        | 1                   |              | requires plugin "settings"
[no-repetitive-locators][]   | 1                   |              |
[no-repetitive-selectors][]  | 1                   |              |
[use-count-method][]         | 1                   |              |
[valid-by-id][]              | 1                   |              |
[valid-by-tagname][]         | 1                   |              |
[use-promise-all][]          | 0 (Turned off)      |              |
[by-css-shortcut][]          | 0                   |              |
[no-browser-driver][]        | 0                   |              |

For example, the `missing-perform` rule is enabled by default and will cause
ESLint to throw an error (with an exit code of `1`) when triggered.

The `requires plugin "settings"` note indicates that a rule needs the plugin to have configured settings in your ESLint config.
For example, `no-execute-script` rule expects configured paths to either spec, or page object files, or both. 

You may customise each rule by adding a value in your `.eslintrc` `rules` property:

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
[no-array-finder-methods]: docs/rules/no-array-finder-methods.md
[valid-locator-type]: docs/rules/valid-locator-type.md
[no-compound-classes]: docs/rules/no-compound-classes.md
[use-count-method]: docs/rules/use-count-method.md
[no-browser-driver]: docs/rules/no-browser-driver.md
[valid-by-id]: docs/rules/valid-by-id.md
[valid-by-tagname]: docs/rules/valid-by-tagname.md
[no-get-raw-id]: docs/rules/no-get-raw-id.md
[no-get-location-abs-url]: docs/rules/no-get-location-abs-url.md
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
