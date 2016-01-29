# eslint-plugin-protractor

[![Build Status][travis-image]][travis-url]
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Coverage Status](https://coveralls.io/repos/github/alecxe/eslint-plugin-protractor/badge.svg?branch=master)](https://coveralls.io/github/alecxe/eslint-plugin-protractor?branch=master)

[travis-url]: https://travis-ci.org/alecxe/eslint-plugin-protractor
[travis-image]: https://img.shields.io/travis/alecxe/eslint-plugin-protractor.svg

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
[configuring rules]: http://eslint.org/docs/user-guide/configuring#configuring-rules

## Author

© 2016 Alexander Afanasyev

## License

Licensed under the [MIT license](LICENSE).
