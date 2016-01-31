# eslint-plugin-protractor

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/eslint-plugin-protractor.svg)](https://badge.fury.io/js/eslint-plugin-protractor)
[![Build Status][https://img.shields.io/travis/alecxe/eslint-plugin-protractor.svg]][https://travis-ci.org/alecxe/eslint-plugin-protractor]

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
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
[missing-wait-message][]     | 1             |

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
[missing-wait-message]: docs/rules/missing-wait-message.md
[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2016 Alexander Afanasyev

## License

Licensed under the [MIT license](LICENSE).
